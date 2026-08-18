/* Добор «Найди баг»: время и TZ, потеря исключений, dual-write, деньги, валидация, кэш, кодировки. */
window.BUGS=(window.BUGS||[]).concat([
 {
  "id": "bug-tz1",
  "t": "Java",
  "correct": 1,
  "code": "@Entity\nclass Trade {\n    @Column(name = \"executed_at\")   // в БД timestamp WITHOUT time zone\n    LocalDateTime executedAt;\n}\n\n@Transactional\npublic void execute(Trade t) {\n    t.setExecutedAt(LocalDateTime.now());   // <-- ?\n    repo.save(t);\n}\n// прод: инстанс №1 в Asia/Almaty, инстанс №2 в UTC",
  "options": [
   "Всё нормально: LocalDateTime внутри всегда хранит UTC",
   "LocalDateTime.now() берёт TZ конкретной JVM и пишет метку без смещения — два инстанса запишут одно событие с разницей в 5 часов; нужен Instant/OffsetDateTime + timestamptz",
   "Не хватает @Temporal(TemporalType.TIMESTAMP) — Hibernate сохранит только дату",
   "Проблема лишь в производительности: LocalDateTime дороже сериализуется, чем Date"
  ],
  "why": "LocalDateTime — «время на стене» без зоны: now() читает таймзону процесса (контейнер, user.timezone). Asia/Almaty это UTC+5, поэтому одно и то же событие получает метки с разницей в 5 часов, и сортировка по executed_at перемешивает сделки разных инстансов. Момент времени храни как Instant/OffsetDateTime в колонке timestamptz, LocalDateTime оставь для отображения."
 },
 {
  "id": "bug-tz2",
  "t": "Java",
  "correct": 2,
  "code": "// напоминание клиенту на следующий торговый день, 09:00 по бирже\nZoneId exchange = ZoneId.of(\"Europe/Berlin\");\nZonedDateTime start = ZonedDateTime.of(2026, 3, 28, 9, 0, 0, 0, exchange);\n\nZonedDateTime next = start.plus(Duration.ofDays(1));   // <-- ?\n\nscheduler.scheduleAt(next.toInstant());\n// в логе 10:00 вместо 09:00, но только пару раз в год",
  "options": [
   "Будет 09:00 — для суток Duration.ofDays(1) и plusDays(1) эквивалентны",
   "Бросит DateTimeException: Duration нельзя прибавлять к ZonedDateTime",
   "Будет 10:00: Duration — ровно 24 часа физического времени, а в ночь на 29 марта Берлин перешёл на летнее время; календарные сутки даёт plusDays(1)",
   "Будет 08:00 — при переходе часы всегда сдвигаются назад"
  ],
  "why": "Duration — машинное время: ZonedDateTime прибавляет его к моменту, игнорируя смену смещения, и 2026-03-28T09:00+01:00 превращается в 2026-03-29T10:00+02:00. plusDays/Period работают по календарю и дают 09:00. Смещение ловится только в дни перехода: в марте напоминания уезжают на час вперёд, в октябре — назад."
 },
 {
  "id": "bug-tz3",
  "t": "Java",
  "correct": 2,
  "code": "static final DateTimeFormatter KEY =\n        DateTimeFormatter.ofPattern(\"YYYY-MM-dd\");   // <-- ?\n\nString reportKey(LocalDate d) {\n    return \"report-\" + KEY.format(d);\n}\n\n// reportKey(LocalDate.of(2024, 6, 10))  -> \"report-2024-06-10\"\n// reportKey(LocalDate.of(2024, 12, 31)) -> ?",
  "options": [
   "«report-2024-12-31» — YYYY и yyyy расходятся только на датах до 1582 года",
   "Бросит UnsupportedTemporalTypeException: LocalDate не поддерживает YYYY",
   "«report-2025-12-31»: заглавная YYYY — это week-based year, и 31.12.2024 попадает в первую неделю 2025; нужна yyyy",
   "Форматтер не потокобезопасен, поэтому ключ иногда получается битым"
  ],
  "why": "YYYY — год недели, а не год даты: неделя целиком относится к одному году (по ISO — к тому, где лежит её четверг), поэтому 30.12.2024–05.01.2025 считается неделей 2025-го. Декабрьский отчёт уезжает в папку следующего года, но всего на несколько дней в году, и тест на 10 июня остаётся зелёным. Правила недели вдобавок зависят от локали форматтера — ещё одна причина не использовать Y для дат."
 },
 {
  "id": "bug-exc1",
  "t": "Java",
  "correct": 0,
  "code": "public Quote load(String isin) {\n    try {\n        return pricingClient.get(isin);\n    } catch (Exception e) {\n        log.error(\"Не удалось получить котировку \" + isin);\n        throw new PricingException(e.getMessage());   // <-- ?\n    }\n}\n// в проде в логе: PricingException: null",
  "options": [
   "Исходное исключение потеряно: cause не передан, стектрейса причины нет, а если у неё message == null — в логе остаётся «PricingException: null»",
   "Всё в порядке: getMessage() несёт всю нужную информацию",
   "catch (Exception e) не поймает RuntimeException из HTTP-клиента",
   "log.error нужно звать после throw, иначе строка не попадёт в лог"
  ],
  "why": "Без new PricingException(msg, e) причина не прицепляется, и стек исходной ошибки (SocketTimeoutException, падение парсера, 500 от контрагента) исчезает — остаётся только верхний уровень. У многих исключений getMessage() возвращает null: явно брошенный NPE, EOFException, обёртки без текста; отсюда буквальное «null» в логе. На JDK 17 подсказку несёт только NPE, сгенерированный JVM."
 },
 {
  "id": "bug-exc2",
  "t": "Concurrency",
  "correct": 3,
  "code": "while (running) {\n    Task t = queue.poll();\n    if (t == null) {\n        try {\n            Thread.sleep(200);\n        } catch (InterruptedException e) {\n            log.warn(\"сон прерван\");   // <-- ?\n        }\n        continue;\n    }\n    process(t);\n}",
  "options": [
   "Ничего страшного: цикл всё равно выйдет, когда running станет false",
   "sleep(200) в цикле — busy-wait, других проблем тут нет",
   "InterruptedException не покрывает прерывание пула, надо ловить Exception",
   "Проглочен сигнал остановки: sleep сбрасывает флаг прерывания, поток крутится дальше и shutdownNow()/graceful shutdown не работает; нужен Thread.currentThread().interrupt() или выход из цикла"
  ],
  "why": "Бросая InterruptedException, sleep/wait/take снимают флаг прерывания (после catch isInterrupted() == false), поэтому проглоченный catch стирает единственный признак того, что поток просили остановиться. При деплое awaitTermination висит до таймаута, и контейнер добивают SIGKILL с недообработанными задачами."
 },
 {
  "id": "bug-exc3",
  "t": "Concurrency",
  "correct": 2,
  "code": "@Scheduled(fixedDelay = 60_000)\npublic void syncAll() {\n    for (Account a : repo.findActive()) {\n        pool.submit(() -> sync(a));      // <-- ?\n    }\n    log.info(\"синхронизация запущена\");\n}\n// в логах только «синхронизация запущена», а остатки не обновляются",
  "options": [
   "submit() бросит RejectedExecutionException, когда задач больше, чем потоков",
   "@Scheduled и собственный пул конфликтуют — задачи выполнятся дважды",
   "Исключение из sync() упаковывается в Future, а get() никто не зовёт — ошибка исчезает бесследно; с execute() она дошла бы до UncaughtExceptionHandler",
   "Лямбда захватывает a — переменная не final, будет ошибка компиляции"
  ],
  "why": "submit() оборачивает задачу в FutureTask, который ловит любой Throwable и кладёт внутрь Future — без get() его не увидят ни лог, ни UncaughtExceptionHandler. Сервис «работает» и пишет бодрые строки в лог, хотя каждая задача падает на первой строке. Переменная цикла в for-each effectively final, так что вариант с компиляцией мимо."
 },
 {
  "id": "bug-dw1",
  "t": "Spring",
  "correct": 1,
  "code": "@Transactional\npublic void createOrder(OrderDto dto) {\n    Order o = repo.save(Order.from(dto));\n    kafka.send(\"spo-pf-orders\", o.getId().toString());   // <-- ?\n    limits.reserve(o);   // иногда бросает LimitExceededException\n}",
  "options": [
   "Kafka-продьюсер участвует в транзакции Spring, поэтому send откатится вместе с БД",
   "Дуальная запись: сообщение уходит вне транзакции БД — при откате на limits.reserve консьюмер получит событие о заказе, которого в БД нет; нужен outbox или публикация в AFTER_COMMIT",
   "Ошибка в том, что id ещё null: save() не проставляет идентификатор до flush",
   "Нужен REQUIRES_NEW, иначе send заблокирует соединение с БД"
  ],
  "why": "Kafka и Postgres — два независимых ресурса: send уходит сразу, коммит БД случится (или не случится) позже, атомарности между ними нет ни в какую сторону. Лечение — transactional outbox: событие пишется таблицей в ту же транзакцию, а отправляет его отдельный релей."
 },
 {
  "id": "bug-dw2",
  "t": "Spring",
  "correct": 3,
  "code": "@Service\nclass ClientService {\n    @Transactional\n    public void register(ClientDto dto) {\n        Client c = repo.save(Client.from(dto));\n        welcome.sendAsync(c.getId());   // welcome — отдельный бин, прокси работает   // <-- ?\n        scoring.check(c);               // ещё ~2 секунды\n    }   // коммит здесь\n}\n\n@Service\nclass WelcomeService {\n    @Async\n    public void sendAsync(Long id) {\n        Client c = repo.findById(id).orElseThrow();   // иногда NoSuchElementException\n        mail.send(c.getEmail());\n    }\n}",
  "options": [
   "Ошибка в том, что @Async-метод не может быть одновременно @Transactional",
   "findById надо заменить на getReferenceById — тогда сущность найдётся",
   "Async-поток наследует транзакцию через ThreadLocal, но теряет её на коммите",
   "Асинхронный поток работает в своём соединении и не видит незакоммиченных изменений: он стартует до коммита внешней транзакции, которая ещё может откатиться; публикуй событие в @TransactionalEventListener(AFTER_COMMIT)"
  ],
  "why": "Транзакция привязана к потоку через ThreadLocal и в @Async-поток не передаётся, поэтому фоновая задача читает БД раньше коммита — гонка, которая под нагрузкой даёт NoSuchElementException, а при откате scoring.check ещё и письмо несуществующему клиенту. Триггер должен стоять после коммита."
 },
 {
  "id": "bug-money1",
  "t": "Java",
  "correct": 1,
  "code": "BigDecimal price = new BigDecimal(19.99);   // <-- ?\n\nBigDecimal total = price.multiply(BigDecimal.valueOf(1000))\n                        .setScale(2, RoundingMode.DOWN);   // усечение, как в биллинге\n\n// ожидали 19990.00, в отчёте 19989.99",
  "options": [
   "Ошибки нет: BigDecimal точен по определению, расхождению взяться неоткуда",
   "new BigDecimal(double) сохраняет ТОЧНОЕ двоичное значение (19.98999999999999843680…), хвост доезжает до умножения (19989.99999999999843…), и усечение даёт 19989.99; нужен new BigDecimal(\"19.99\") или BigDecimal.valueOf",
   "BigDecimal.valueOf(1000) внутри идёт через double, отсюда и погрешность",
   "multiply не умеет работать с разными scale — сначала приведи оба числа к одному масштабу"
  ],
  "why": "Конструктор от double не «читает» 19.99, а сохраняет точное значение ближайшего double со всем двоичным хвостом, и BigDecimal честно тащит его в умножение. Коварство в том, что HALF_UP этот хвост маскирует (даёт ровно 19990.00) — расхождение вылезает при усечении, при сравнении и при большем scale, то есть позже и не в тестах. BigDecimal.valueOf идёт через Double.toString и даёт ровно 19.99; строковый конструктор надёжнее всего."
 },
 {
  "id": "bug-money2",
  "t": "Java",
  "correct": 0,
  "code": "BigDecimal paid     = new BigDecimal(\"100.00\");\nBigDecimal expected = invoice.getAmount();   // из NUMERIC(19,4) -> 100.0000\n\nif (paid.equals(expected)) {                 // <-- ?\n    invoice.markPaid();\n}\n// оплата прошла, счёт остался в статусе UNPAID",
  "options": [
   "equals у BigDecimal сравнивает и значение, и scale: 100.00 != 100.0000, счёт молча не закроется; нужно compareTo(...) == 0",
   "equals работает, но сравнивать надо через ==, иначе будет NPE",
   "Всё верно: scale на equals не влияет, значения численно равны",
   "Из БД приходит Double, поэтому equals всегда false из-за несовпадения типов"
  ],
  "why": "BigDecimal.equals требует совпадения unscaled value И scale, а масштаб приезжает из типа колонки, из парсинга строки или из setScale — и легко расходится. Та же мина в HashSet/HashMap: hashCode у 100.00 и 100.0000 разный (310002 против 31000004), поэтому contains вернёт false."
 },
 {
  "id": "bug-money3",
  "t": "Java",
  "correct": 1,
  "code": "public BigDecimal perShare(BigDecimal total, int shares) {\n    return total.divide(BigDecimal.valueOf(shares));   // <-- ?\n}\n\n// perShare(new BigDecimal(\"100.00\"), 4) -> 25.00, тесты зелёные\n// perShare(new BigDecimal(\"100.00\"), 3) -> ?",
  "options": [
   "Вернёт 33.33 — divide по умолчанию округляет до scale делимого",
   "ArithmeticException: Non-terminating decimal expansion — без scale и RoundingMode BigDecimal отказывается округлять; на «круглых» тестовых данных баг не виден",
   "Вернёт 33 — целочисленное деление, потому что shares это int",
   "Потеря точности: получится 33.333333333333336, так как valueOf внутри использует double"
  ],
  "why": "divide(BigDecimal) обязан дать точный результат, а 100.00/3 — периодическая дробь, поэтому вместо округления летит ArithmeticException. Падение зависит от данных: делители 2, 4, 5, 10 проходят, так что баг доживает до первого клиента с тремя бумагами в заявке. Лечится divide(x, 2, RoundingMode.HALF_UP)."
 },
 {
  "id": "bug-val1",
  "t": "Spring",
  "correct": 1,
  "code": "@Entity @Data\nclass Client {\n    @Id Long id;\n    String name;\n    Role role;              // USER / ADMIN\n    BigDecimal balance;\n}\n\n@PutMapping(\"/api/clients/{id}\")\npublic Client update(@PathVariable Long id,\n                     @RequestBody Client client) {   // <-- ?\n    client.setId(id);\n    return repo.save(client);\n}",
  "options": [
   "Не хватает @Valid — без неё Jackson не соберёт сущность из тела",
   "Mass assignment: Jackson заполнит ЛЮБОЕ поле сущности из тела — клиент пришлёт role=ADMIN или свой balance, и save это сохранит; вдобавок непереданные поля затрутся null. Нужен DTO с явным набором полей",
   "setId делает сущность detached, поэтому save создаст дубликат",
   "@RequestBody и @PathVariable нельзя использовать в одном методе"
  ],
  "why": "Биндинг идёт по всем сеттерам класса, а не по тем полям, что задумал автор эндпоинта: граница API совпала с моделью БД — это и есть mass assignment. Плюс PUT с частичным телом молча обнуляет всё, чего не было в JSON, потому что merge пишет сущность целиком. Лечится входным DTO или явным маппингом с @JsonIgnore на чувствительных полях."
 },
 {
  "id": "bug-val2",
  "t": "Spring",
  "correct": 2,
  "code": "record OrderRequest(\n        @NotBlank String isin,\n        @NotEmpty List<LegRequest> legs) {}   // <-- ?\n\nrecord LegRequest(@Positive int qty,\n                  @NotNull BigDecimal price) {}\n\n@PostMapping(\"/orders\")\npublic Resp create(@RequestBody @Valid OrderRequest req) {\n    return service.create(req);   // в прод прилетело qty = -100\n}",
  "options": [
   "@Positive не работает с int — нужен Integer, иначе ограничение игнорируется",
   "record валидировать нельзя: аннотации на компонентах не переносятся",
   "Валидация не каскадируется: без @Valid на элементах legs ограничения внутри LegRequest не проверяются, @NotEmpty смотрит только на размер списка",
   "Нужен @Validated на классе контроллера, иначе @Valid у @RequestBody не срабатывает"
  ],
  "why": "Bean Validation спускается во вложенный объект только там, где явно стоит @Valid: пиши List<@Valid LegRequest> legs. Внешний @Valid у аргумента контроллера проверяет только верхний уровень, поэтому отрицательное количество спокойно доезжает до биржи. @Positive с примитивным int работает, дело не в типе."
 },
 {
  "id": "bug-cache1",
  "t": "Spring",
  "correct": 3,
  "code": "@Cacheable(value = \"clients\", key = \"#id\")\npublic Client byId(Long id) {\n    return repo.findById(id).orElseThrow();\n}\n\n@CacheEvict(value = \"clients\")   // <-- ?\n@Transactional\npublic void update(Client c) {\n    repo.save(c);\n}\n// после смены телефона старое значение отдаётся ещё час",
  "options": [
   "@CacheEvict без allEntries=true вообще ничего не делает — это no-op",
   "Порядок аннотаций: @CacheEvict должен стоять после @Transactional",
   "Всё корректно: Spring сам сопоставит ключи по типу параметра",
   "Ключ по умолчанию строится из аргументов метода: при единственном аргументе SimpleKeyGenerator возвращает сам объект Client, а запись лежит под ключом id — evict промахивается, и читатели получают устаревшее"
  ],
  "why": "SimpleKeyGenerator берёт аргументы как есть: один ненулевой аргумент становится ключом сам по себе (SimpleKey собирается только для нуля или двух с лишним), поэтому evict ищет запись по объекту Client — с его equals/hashCode, у JPA-сущности обычно дефолтными по ссылке. Промах молчаливый: ни ошибки, ни лога, данные протухают до истечения TTL. Нужно key = \"#c.id\"."
 },
 {
  "id": "bug-cache2",
  "t": "Spring",
  "correct": 1,
  "code": "@Transactional\npublic void rename(Long id, String name) {\n    cache.evict(id);                              // <-- ?\n    Client c = repo.findById(id).orElseThrow();\n    c.setName(name);\n    audit.log(id);                                // ещё ~300 мс\n}   // коммит здесь",
  "options": [
   "Порядок верный: evict до чтения — код корректен",
   "Инвалидация до коммита: параллельный запрос между evict и коммитом прочитает из БД СТАРОЕ значение и снова положит его в кэш — после коммита там навсегда устаревшие данные; вытеснять надо в AFTER_COMMIT",
   "cache.evict внутри активной транзакции бросит IllegalStateException",
   "Нужен @CacheEvict вместо ручного вызова, только тогда ключ попадёт в нужный регион"
  ],
  "why": "Между evict и коммитом есть окно в сотни миллисекунд, и любой конкурентный читатель заполняет кэш ещё не изменёнными данными — запись залипает до TTL, хотя в БД уже новое имя. Инвалидацию вешают на TransactionSynchronization/AFTER_COMMIT; заодно чинится случай отката, когда кэш сбросили зря."
 },
 {
  "id": "bug-enc1",
  "t": "Java",
  "correct": 2,
  "code": "public boolean isIdDocument(DocRequest req) {\n    String code = req.getType().toUpperCase();   // <-- ?\n    return \"ID\".equals(code);\n}\n// в контейнере LANG=tr_TR, приходит type = \"id\"",
  "options": [
   "Надо просто использовать equalsIgnoreCase — ошибки по сути нет",
   "Возможен NPE, если type == null; других проблем нет",
   "toUpperCase() без Locale берёт Locale.getDefault(): в турецкой локали «i» превращается в «İ», и сравнение с «ID» перестаёт совпадать; для протокольных строк нужен Locale.ROOT",
   "Кириллицу и латиницу нельзя привести к верхнему регистру без ICU4J"
  ],
  "why": "Регистр в Java зависит от локали: \"id\".toUpperCase(tr) даёт «İD» с точкой над I, а \"I\".toLowerCase(tr) — «ı» без точки. Локаль подтягивается из окружения JVM, поэтому на dev-машине всё зелёное, а после смены базового образа или LANG эндпоинт молча перестаёт распознавать тип документа. Для машинных строк всегда toUpperCase(Locale.ROOT)."
 },
 {
  "id": "bug-enc2",
  "t": "Java",
  "correct": 0,
  "code": "public String toJson(BigDecimal amount) {\n    return \"{\\\"amount\\\":\" + String.format(\"%.2f\", amount) + \"}\";   // <-- ?\n}\n// dev-машина: en_US, тесты зелёные\n// прод-контейнер: LANG=ru_RU.UTF-8, контрагент отвечает 400 Bad Request",
  "options": [
   "String.format без Locale использует Locale.getDefault(): в ru-локали разделитель — запятая, получится {\"amount\":1234,50} — невалидный JSON; нужен Locale.ROOT",
   "%.2f не работает с BigDecimal — нужен %s или doubleValue()",
   "Проблема в округлении: %.2f округляет HALF_UP, а для денег нужен HALF_EVEN",
   "Конкатенация строк — O(n²), надо собирать через StringBuilder"
  ],
  "why": "Перегрузка String.format(String, Object...) молча подставляет Locale.getDefault(), а DecimalFormatSymbols для ru даёт запятую как десятичный разделитель (для de — ещё и точку как разделитель тысяч: 1.234,50). Для протоколов используй String.format(Locale.ROOT, …), а лучше — сериализуй число самим Jackson, а не строкой."
 },
 {
  "id": "bug-enc3",
  "t": "Web",
  "correct": 3,
  "code": "@GetMapping(\"/report/{id}\")\npublic ResponseEntity<byte[]> download(@PathVariable Long id) {\n    Report r = service.build(id);   // r.name() = \"Отчёт клиента.pdf\"\n    return ResponseEntity.ok()\n        .header(\"Content-Disposition\",\n                \"attachment; filename=\" + r.name())   // <-- ?\n        .body(r.bytes());\n}",
  "options": [
   "Достаточно добавить кавычки: кодировка в HTTP-заголовках всегда UTF-8",
   "Ошибка в типе: PDF нельзя отдавать как byte[], нужен StreamingResponseBody",
   "Браузер сам возьмёт имя из URL, заголовок здесь избыточен",
   "Заголовки HTTP латинские (ISO-8859-1): кириллица приедет крякозябрами, без кавычек имя обрежется по первому пробелу, а имя из пользовательских данных даёт header injection; нужен filename*=UTF-8''… по RFC 5987"
  ],
  "why": "Значения заголовков — байты, интерпретируемые как ISO-8859-1 (RFC 7230), поэтому UTF-8-строку контейнер отдаст как «ÐžÑ‚Ñ‡Ñ‘Ñ‚» или заменит символы на «?». Правильно: ASCII-фолбэк в filename плюс filename*=UTF-8''%D0%9E… (RFC 6266/5987) и чистка имени от кавычек, ';' и CR/LF. В Spring это делает ContentDisposition.attachment().filename(name, UTF_8)."
 }
]);

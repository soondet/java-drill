/* Добор «Найди баг»: время и TZ, потеря исключений, dual-write, деньги, валидация, кэш, кодировки. */
window.BUGS=(window.BUGS||[]).concat([
 {
  "id": "bug-tz1",
  "t": "Java",
  "correct": 1,
  "code": "@Entity\nclass Trade {\n    @Column(name = \"executed_at\")   // в БД timestamp WITHOUT time zone\n    LocalDateTime executedAt;\n}\n\n@Transactional\npublic void execute(Trade t) {\n    t.setExecutedAt(LocalDateTime.now());   // <-- ?\n    repo.save(t);\n}\n// прод: инстанс №1 в Asia/Almaty, инстанс №2 в UTC",
  "options": [
   "Всё нормально: LocalDateTime внутри всегда хранит UTC",
   "LocalDateTime.now() берёт зону JVM: два инстанса запишут разное время",
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
   "Будет 10:00: Duration — это 24 часа, а ночью был перевод часов",
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
   "Проглочен сигнал остановки: sleep сбросил флаг прерывания"
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
   "Дуальная запись: сообщение ушло, а транзакция БД ещё может откатиться",
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
   "equals у BigDecimal сравнивает и scale: 100.00 ≠ 100.0000; нужен compareTo",
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
   "ArithmeticException: без scale и RoundingMode BigDecimal не станет округлять 100/3",
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
   "Инвалидация до коммита: читатель вернёт в кэш старое значение",
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
   "toUpperCase() без Locale: в турецкой локали «i» станет «İ»",
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

/* ───── Третья волна: Kafka, Kubernetes, Docker, миграции, Quarkus, Spring — кластеры, которых в
   игре не было. Место верного по длине разложено заранее на обоих языках; индекс верного
   варианта гуляет по всем четырём позициям. Перевод — I18N.bugs по id. ───── */
window.BUGS=(window.BUGS||[]).concat([
 {
  "id": "bug3-kafka-autocommit",
  "t": "Distributed",
  "correct": 2,
  "code": "props.put(ENABLE_AUTO_COMMIT_CONFIG, \"true\");\nprops.put(AUTO_COMMIT_INTERVAL_MS_CONFIG, \"5000\");\n\nwhile (true) {\n  var records = consumer.poll(Duration.ofMillis(200));\n  for (var r : records) {\n    payouts.execute(r.value());   // может упасть\n  }\n}",
  "options": [
   "Всё нормально: автокоммит подтверждает только то, что уже вернулось из poll, значит обработанное",
   "poll с таймаутом 200 мс слишком частый: брокер забанит потребителя за флуд запросов",
   "Автокоммит подтвердит оффсет до конца обработки: упадём в execute — выплата потеряна навсегда",
   "Интервал 5000 мс слишком большой: при падении повторятся 5 секунд сообщений, нужен 100 мс"
  ],
  "why": "Автокоммит срабатывает по таймеру внутри poll и подтверждает всё, что вернул предыдущий poll — независимо от того, обработано оно или нет. Упал в execute на последней записи, рестартовал — оффсет уже сдвинут, сообщение никто не перечитает. Для выплат это потерянные деньги.\n\nЛечится ручным подтверждением после обработки: enable.auto.commit=false и commitSync после батча. Повторы при этом возможны — от них защищает идемпотентность обработчика. Частота poll и длина интервала здесь ни при чём."
 },
 {
  "id": "bug3-kafka-no-flush",
  "t": "Distributed",
  "correct": 0,
  "code": "public static void main(String[] a) {\n  var producer = new KafkaProducer<String, String>(props);\n  for (var ev : loadEvents()) {\n    producer.send(new ProducerRecord<>(\"events\", ev));\n  }\n  System.exit(0);\n}",
  "options": [
   "send асинхронный: без flush или close перед выходом буфер не уйдёт",
   "Без ключа у ProducerRecord Kafka откажет в записи: ключ обязателен для любого топика",
   "Продюсер создан без try-with-resources, и после exit останутся незакрытые сокеты, брокер их будет ждать",
   "System.exit(0) в main — плохой тон, нужно просто вернуться из метода, тогда всё отправится"
  ],
  "why": "send кладёт запись в буфер и возвращается сразу; отправкой занимается фоновый поток, пакетами по linger.ms. System.exit убивает процесс вместе с буфером — последние записи, а при быстром цикле и все, никуда не уйдут. Ни исключения, ни лога: с точки зрения кода всё отправлено.\n\nПеред выходом нужен producer.flush() или close(), который сам делает flush и ждёт подтверждений. Ключ не обязателен. Обычный return из main не спасёт: процесс завершится, когда закончатся не-демон потоки, а поток отправки у продюсера как раз не-демон — так что это сработало бы случайно, а не по контракту."
 },
 {
  "id": "bug3-kafka-retries-reorder",
  "t": "Distributed",
  "correct": 1,
  "code": "props.put(ACKS_CONFIG, \"all\");\nprops.put(RETRIES_CONFIG, 10);\nprops.put(MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 5);\nprops.put(ENABLE_IDEMPOTENCE_CONFIG, false);\n// ключ — id заявки, порядок событий важен",
  "options": [
   "acks=all с десятью повторами замедлит продюсер в разы: ждать всех реплик при каждом повторе слишком дорого",
   "При повторе с пятью запросами в полёте и без идемпотентности пакеты могут поменяться местами",
   "retries=10 бессмысленно: Kafka сама повторяет бесконечно, и значение игнорируется",
   "Идемпотентность нельзя выключить при acks=all: продюсер упадёт на старте"
  ],
  "why": "Пять пакетов ушли один за другим, второй не дошёл и ушёл на повтор — а третий, четвёртый и пятый уже записаны. Второй ляжет после них: события одной заявки меняют порядок при сохранённом ключе. Идемпотентный продюсер как раз это и чинит: нумерует пакеты, и брокер отбрасывает повторы и держит порядок.\n\nПравильная связка: enable.idempotence=true, тогда acks=all подразумевается, а in-flight до пяти допустим без потери порядка. Выключать её ради «скорости» — обменять порядок на ничего. Остальные варианты неверны: acks=all не умножается на повторы, retries конечное число, конфигурация с выключенной идемпотентностью валидна."
 },
 {
  "id": "bug3-kafka-consumer-threads",
  "t": "Distributed",
  "correct": 3,
  "code": "var consumer = new KafkaConsumer<String, String>(props);\nconsumer.subscribe(List.of(\"orders\"));\n\nexecutor.submit(() -> loop(consumer));   // поток 1\nexecutor.submit(() -> loop(consumer));   // поток 2",
  "options": [
   "Два потока на одного потребителя удвоят пропускную способность, но партиции нужно назначить руками через assign",
   "subscribe на один топик из двух потоков создаст две группы, и каждая прочитает весь топик",
   "Всё нормально: KafkaConsumer синхронизирован внутри, вызовы из потоков выстроятся в очередь",
   "KafkaConsumer не потокобезопасен: второй поток получит ConcurrentModificationException"
  ],
  "why": "Это написано в javadoc первой строкой: экземпляр потребителя принадлежит одному потоку. Внутри стоит проверка владельца, и второй поток падает с ConcurrentModificationException «KafkaConsumer is not safe for multi-threaded access». Иногда не падает, а молча портит состояние — хуже.\n\nМасштабируют иначе: по потребителю на поток, все в одной группе — партиции разделятся сами. Либо один потребитель читает, а обработку раздаёт пулу, подтверждая оффсеты только после завершения. Две группы subscribe не создаёт; группа задаётся group.id."
 },
 {
  "id": "bug3-kafka-random-group",
  "t": "Distributed",
  "correct": 0,
  "code": "props.put(GROUP_ID_CONFIG,\n    \"orders-\" + UUID.randomUUID());\nprops.put(AUTO_OFFSET_RESET_CONFIG, \"earliest\");\n// сервис в трёх репликах, обрабатывает заказы",
  "options": [
   "Случайная группа на каждом старте: каждая реплика читает весь топик с начала",
   "earliest при пустом оффсете опасен: лучше latest, иначе при первом запуске прочитается история",
   "UUID в group.id недопустим: имя группы ограничено буквами и дефисами, брокер отклонит подключение",
   "Группа должна совпадать с именем топика, иначе брокер не найдёт оффсеты"
  ],
  "why": "Группа — это и разделение партиций между экземплярами, и память об оффсетах. Случайное имя ломает обе: три реплики образуют три группы, каждая получает все партиции, и с earliest каждая начинает с начала топика. Каждый заказ обработан трижды, а после рестарта — ещё раз с нуля.\n\ngroup.id должен быть постоянным и общим для всех экземпляров сервиса. earliest сам по себе уместен: первый запуск нового сервиса должен увидеть историю. Имя с UUID синтаксически допустимо, с топиком совпадать не обязано."
 },
 {
  "id": "bug3-k8s-no-resources",
  "t": "Infra",
  "correct": 2,
  "code": "containers:\n  - name: orders\n    image: registry/orders:1.4.2\n    ports:\n      - containerPort: 8080\n    # resources не заданы",
  "options": [
   "Без resources под не запустится: Kubernetes требует хотя бы requests для любого контейнера, иначе манифест отклонят",
   "Порт 8080 надо объявить ещё и в Service, иначе containerPort не имеет смысла",
   "Без requests планировщик кладёт под куда угодно, без limits он может съесть узел и уронить соседей",
   "Без limits JVM не увидит лимит памяти и возьмёт кучу по умолчанию, четверть памяти узла"
  ],
  "why": "requests — обещание планировщику: «мне нужно столько». Без них под в классе BestEffort: его ставят на любой узел, а при нехватке памяти убивают первым. Без limits контейнер не ограничен ничем, и утечка в одном сервисе давит соседей по узлу. HPA по CPU без requests тоже не работает — ему не от чего считать проценты.\n\nЗадавать нужно оба, обычно requests по реальному потреблению и limits памяти с запасом. Без resources под запускается — в этом и беда. Четвёртый вариант наполовину прав про кучу, но описывает не главную проблему."
 },
 {
  "id": "bug3-k8s-liveness-kills-startup",
  "t": "Infra",
  "correct": 1,
  "code": "livenessProbe:\n  httpGet:\n    path: /actuator/health\n    port: 8080\n  initialDelaySeconds: 0\n  periodSeconds: 5\n  failureThreshold: 1\n# приложение стартует около 40 секунд",
  "options": [
   "Путь /actuator/health закрыт Spring Security по умолчанию, проба всегда получит 401",
   "Проба без задержки и с порогом в один сбой убьёт под раньше, чем он стартует",
   "Для живости нужен tcpSocket, а не httpGet: HTTP-проба считается пробой готовности",
   "periodSeconds 5 слишком часто: проба сама создаст нагрузку и под будет деградировать"
  ],
  "why": "Первая проба через ноль секунд, ответа нет — порог в один сбой исчерпан, под перезапущен. Снова ноль секунд, снова нет ответа. Сервис, которому нужно сорок секунд, не стартует никогда: бесконечный CrashLoopBackOff с совершенно здоровым кодом.\n\nЛечится startupProbe с большим запасом, после которой живость начинает проверяться, либо initialDelaySeconds больше времени старта и failureThreshold в три. И общее правило: живость не должна зависеть от базы и внешних сервисов — это дело готовности. HTTP-проба для живости допустима, период в пять секунд нормален."
 },
 {
  "id": "bug3-k8s-latest-tag",
  "t": "DevOps",
  "correct": 3,
  "code": "containers:\n  - name: orders\n    image: registry/orders:latest\n    imagePullPolicy: IfNotPresent",
  "options": [
   "Всё нормально: latest всегда последняя сборка, а IfNotPresent экономит трафик",
   "Тег latest запрещён в проде политикой Kubernetes, манифест не пройдёт валидацию",
   "IfNotPresent не работает с приватным registry, нужен Always",
   "latest с IfNotPresent: узлы бегут разные версии, а выкат ничего не меняет — манифест тот же"
  ],
  "why": "Два дефекта в двух строках. latest — не версия, а движущаяся метка: на одном узле образ скачан неделю назад, на другом вчера, и под одним тегом работает разный код. IfNotPresent добивает: раз образ с таким тегом на узле есть, новый не скачается. А kubectl apply с тем же манифестом не делает rollout — ничего не изменилось.\n\nОбразы помечают неизменяемой версией или digest, и каждый релиз меняет манифест. Запрета на latest в Kubernetes нет, приватный registry с IfNotPresent совместим."
 },
 {
  "id": "bug3-k8s-secret-in-configmap",
  "t": "DevOps",
  "correct": 0,
  "code": "kind: ConfigMap\nmetadata:\n  name: orders-config\ndata:\n  DB_URL: jdbc:postgresql://db:5432/orders\n  DB_PASSWORD: Qw3rty!2024",
  "options": [
   "Пароль в ConfigMap виден всем с чтением неймспейса и лежит в git: место ему в Secret",
   "ConfigMap не умеет значения со спецсимволами: восклицательный знак сломает разбор YAML при деплое",
   "Secret ничего не меняет: он тоже лежит в base64, что эквивалентно открытому тексту для любого читателя",
   "Ключи ConfigMap должны быть в нижнем регистре через точку, иначе они не станут переменными окружения"
  ],
  "why": "ConfigMap — публичная часть конфигурации: его читает любой, кому выдали get на неймспейс, он попадает в git и в логи kubectl describe. Пароль туда класть — раздать его всем. Secret отличается не только base64: на него отдельные права RBAC, он шифруется в etcd при включённом encryption at rest и не светится в describe.\n\nСекреты заводят через внешнее хранилище вроде Vault или sealed-secrets, а в манифестах держат только ссылку. Спецсимволы в значениях ConfigMap допустимы, регистр ключей любой."
 },
 {
  "id": "bug3-k8s-single-replica-rollout",
  "t": "DevOps",
  "correct": 2,
  "code": "spec:\n  replicas: 1\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxUnavailable: 1\n      maxSurge: 0",
  "options": [
   "maxSurge: 0 запрещён вместе с maxUnavailable: 1 — Kubernetes отклонит манифест",
   "Всё нормально: RollingUpdate по определению выкатывает без простоя, значения по умолчанию можно не трогать",
   "Единственный под гасится до старта нового: каждый релиз — простой на время запуска",
   "Нужна стратегия Recreate: для одной реплики RollingUpdate не имеет смысла и работает медленнее"
  ],
  "why": "maxUnavailable: 1 при одной реплике разрешает выкату убить единственный под, а maxSurge: 0 запрещает поднять новый рядом заранее. Получается Recreate под именем RollingUpdate: старый остановлен, новый стартует сорок секунд, всё это время сервис недоступен.\n\nБез простоя — это maxSurge: 1 и maxUnavailable: 0: новый под поднимается рядом, проходит готовность, и только потом старый уходит. А лучше две реплики: одна — не отказоустойчивость. Комбинация в манифесте валидна, Recreate не решает, а узаконивает простой."
 },
 {
  "id": "bug3-docker-shell-entrypoint",
  "t": "DevOps",
  "correct": 1,
  "code": "FROM eclipse-temurin:21-jre\nCOPY target/app.jar /app/app.jar\nENTRYPOINT java -jar /app/app.jar",
  "options": [
   "Образ jre не содержит компилятора, и Spring Boot не сможет собрать прокси на старте: нужен jdk-образ",
   "ENTRYPOINT в shell-форме: PID 1 — sh, SIGTERM до Java не доходит, graceful shutdown не будет",
   "COPY из target тянет в образ весь каталог сборки вместе с классами и тестами, образ раздувается вдвое",
   "Нужен WORKDIR /app, иначе java не найдёт jar по абсолютному пути"
  ],
  "why": "Shell-форма ENTRYPOINT запускает /bin/sh -c \"java …\": первым процессом становится sh, а Java — его потомком. При остановке пода Kubernetes шлёт SIGTERM первому процессу; sh сигнал не пробрасывает. Java живёт до истечения terminationGracePeriodSeconds и получает SIGKILL: запросы в полёте обрываются, соединения не закрываются, Spring не успевает завершиться штатно.\n\nПишут exec-форму: ENTRYPOINT [\"java\", \"-jar\", \"/app/app.jar\"] — тогда Java и есть PID 1. Прокси Spring строятся без компилятора, COPY копирует только указанный файл, абсолютный путь не требует WORKDIR."
 },
 {
  "id": "bug3-docker-javaopts-ignored",
  "t": "DevOps",
  "correct": 3,
  "code": "FROM eclipse-temurin:21-jre\nENV JAVA_OPTS=\"-Xmx512m -XX:+UseG1GC\"\nCOPY app.jar /app.jar\nENTRYPOINT [\"java\", \"-jar\", \"/app.jar\"]",
  "options": [
   "Переменная задана до COPY, а должна после: порядок инструкций в Dockerfile важен",
   "JAVA_OPTS применится, но -Xmx512m слишком мало для Spring Boot, нужно хотя бы 2g",
   "G1 включён по умолчанию, флаг лишний, а дублирование флагов GC даёт ошибку запуска",
   "JAVA_OPTS никто не читает: exec-форма не подставляет переменные, Java стартует без этих флагов"
  ],
  "why": "JAVA_OPTS — просто соглашение скриптов запуска, сама JVM эту переменную не знает. В exec-форме ENTRYPOINT нет оболочки, подстановки $JAVA_OPTS тоже нет, и даже если бы была — её здесь никто не написал. Флаги молча пропадают, куча берётся по умолчанию, и на лимите контейнера это становится OOMKilled.\n\nДва честных пути: переменная JAVA_TOOL_OPTIONS, которую JVM читает сама, или флаги прямо в ENTRYPOINT. Порядок ENV относительно COPY значения не имеет, размер кучи обсуждается после того, как флаг вообще применится."
 },
 {
  "id": "bug3-docker-secret-layer",
  "t": "DevOps",
  "correct": 2,
  "code": "COPY .env /app/.env\nRUN ./build.sh --env /app/.env\nRUN rm /app/.env     # секреты удалены",
  "options": [
   "rm в отдельном RUN создаёт лишний слой и раздувает образ, команды надо объединить через &&",
   "Всё нормально: после rm файла в образе нет, docker history его не покажет",
   "Файл остался в слое COPY: удаление в следующем слое его не стирает",
   ".env нельзя копировать как файл, его надо передавать через ENV, иначе build.sh его не прочитает"
  ],
  "why": "Образ — это стопка слоёв, и каждый слой хранится целиком. COPY положил .env в свой слой навсегда; RUN rm добавил сверху пометку «файла нет». Кто скачает образ, тот распакует слои и прочитает секреты — это умеют делать обычные утилиты за минуту.\n\nСекреты в сборке передают через BuildKit: RUN --mount=type=secret, который монтирует файл только на время команды и не оставляет следа в слоях. Или многоступенчатая сборка, где в финальный образ копируется только результат. Объединение RUN через && не поможет: COPY уже отдельный слой."
 },
 {
  "id": "bug3-liquibase-edited-changeset",
  "t": "DB",
  "correct": 0,
  "code": "-- changeset almat:3\nCREATE TABLE client (\n  id   bigint PRIMARY KEY,\n  iin  varchar(100)   -- было varchar(50), поправили здесь\n);",
  "options": [
   "Применённый changeset менять нельзя: контрольная сумма не сойдётся, и на проде миграция упадёт",
   "Всё нормально: Liquibase сравнит схему с описанием и сам расширит колонку до 100",
   "varchar(100) для ИИН избыточен: нужен char(12), иначе индекс по колонке раздуется",
   "Автор в id changeset должен совпадать с пользователем базы, иначе Liquibase не найдёт запись в журнале"
  ],
  "why": "Liquibase хранит в databasechangelog контрольную сумму каждого применённого changeset. Правка текста меняет сумму, и при следующем запуске миграция падает с «checksum validation failed» — на проде, где changeset уже применён. На пустой базе разработчика всё пройдёт, поэтому ошибку увидят последними.\n\nПрименённое не трогают: пишут новый changeset с modifyDataType. Liquibase не сравнивает схему с описанием, это не декларативный инструмент. Тип колонки и автор в id — не про эту ошибку."
 },
 {
  "id": "bug3-liquibase-notnull-no-default",
  "t": "DB",
  "correct": 3,
  "code": "<changeSet id=\"12\" author=\"aika\">\n  <addNotNullConstraint\n      tableName=\"client\"\n      columnName=\"segment\"/>\n</changeSet>\n<!-- прод: 2 млн строк, segment пуст у трети -->",
  "options": [
   "addNotNullConstraint на большой таблице блокирует её на часы, нужен NOT VALID с последующей валидацией",
   "Для колонки нужно указать columnDataType, без него Liquibase не сгенерирует ALTER",
   "Всё нормально: пустые значения автоматически станут пустой строкой при наложении ограничения",
   "У трети строк NULL: ограничение не наложится, миграция упадёт на проде"
  ],
  "why": "NOT NULL проверяется на существующих данных в момент наложения. Два миллиона строк, у семисот тысяч segment пуст — ALTER падает, миграция откатывается, релиз стоит. На dev-базе без данных та же миграция проходит, и это классическая ловушка: тест на пустой базе ничего не проверяет.\n\nПорядок правильный: сначала заполнить — defaultNullValue в этом же changeSet или отдельный UPDATE, — потом ограничение. На Postgres ALTER TABLE SET NOT NULL делает полный скан под блокировкой, на таком объёме это секунды-минуты, не часы. columnDataType нужен не всем базам."
 },
 {
  "id": "bug3-flyway-out-of-order",
  "t": "DB",
  "correct": 1,
  "code": "db/migration/\n  V3__orders.sql          -- применена\n  V5__payouts.sql         -- применена вчера\n  V4__orders_index.sql    -- влита сегодня из старой ветки\n\nspring.flyway.out-of-order=false",
  "options": [
   "Три файла с пропуском номера: Flyway требует непрерывную нумерацию и остановится на V4",
   "V4 ниже уже применённой V5: Flyway её молча проигнорирует, индекс на прод не доедет",
   "Flyway применит V4 после V5, и индекс создастся: порядок файлов внутри каталога не важен",
   "Нужно переименовать V5 в V6, тогда V4 встанет на своё место перед ней"
  ],
  "why": "Flyway применяет версии строго по возрастанию и помнит максимальную применённую. Файл с номером ниже неё при out-of-order=false считается «опоздавшим» и пропускается без ошибки; в логе лишь предупреждение, которое никто не читает. На проде индекса не будет, а приложение, которое его ждёт, замедлится в разы.\n\nЧестный путь — переименовать V4 в V6 и влить как новую миграцию, либо включить out-of-order осознанно, понимая, что порядок больше не гарантирован. Переименовывать применённую V5 нельзя: её запись в истории уже есть. Пропуски в нумерации допустимы."
 },
 {
  "id": "bug3-quarkus-static-config",
  "t": "Quarkus",
  "correct": 2,
  "code": "@ApplicationScoped\npublic class RateClient {\n  @ConfigProperty(name = \"rates.url\")\n  static String url;\n\n  public String fetch() {\n    return http.get(url);\n  }\n}",
  "options": [
   "Поле с @ConfigProperty должно быть final, иначе Quarkus не сможет гарантировать неизменность значения",
   "Свойство rates.url надо объявить с префиксом quarkus., иначе оно не читается из application.properties",
   "Инъекция в static-поле не работает: CDI заполняет только поля экземпляра, url останется null",
   "Для строк @ConfigProperty требует defaultValue: без него сборка упадёт на валидации конфигурации"
  ],
  "why": "CDI инжектирует в экземпляр бина при его создании; статическое поле принадлежит классу, а не экземпляру, и контейнер его не трогает. url остаётся null, и первый же fetch падает с NullPointerException, причём в сообщении об ошибке про конфигурацию не будет ни слова. Quarkus при сборке предупреждает, но предупреждения тонут.\n\nПоле делают обычным полем экземпляра, обычно final с инъекцией через конструктор. Префикс quarkus. нужен только настройкам самого фреймворка, defaultValue необязателен, final в сочетании с инъекцией в поле как раз не работает."
 },
 {
  "id": "bug3-quarkus-panache-no-tx",
  "t": "Quarkus",
  "correct": 0,
  "code": "@ApplicationScoped\npublic class OrderService {\n  public void markPaid(long id) {\n    Order o = Order.findById(id);\n    o.status = Status.PAID;\n    // save() не нужен, сущность управляемая\n  }\n}",
  "options": [
   "Без @Transactional изменение не сохранится: сущность управляема только внутри транзакции",
   "Нужно вызвать o.persist(): Panache не отслеживает изменения полей, только явные вызовы persist и flush",
   "findById возвращает Optional, присваивать его в Order нельзя — не скомпилируется",
   "Прямой доступ к полю status минует сеттер, и Hibernate не заметит изменения"
  ],
  "why": "Комментарий верен наполовину: управляемая сущность действительно сохраняется без save — но управляемой она бывает только внутри транзакции. Без @Transactional findById работает в короткой автотранзакции чтения, после которой сущность отсоединена; изменение статуса остаётся в памяти и исчезает вместе с объектом. Ошибки нет, лога нет, заказ не оплачен.\n\n@Transactional на методе — и грязная проверка при коммите запишет UPDATE. persist нужен только новым сущностям. findById в Panache возвращает сущность, а Hibernate с байткод-улучшением Quarkus видит доступ к полям напрямую."
 },
 {
  "id": "bug3-spring-cache-null",
  "t": "Spring",
  "correct": 1,
  "code": "@Cacheable(\"clients\")\npublic Client find(String iin) {\n  return repo.findByIin(iin).orElse(null);\n}\n// регистрация: сначала find(iin) — null,\n// потом save(client), потом снова find(iin)",
  "options": [
   "Optional нельзя разворачивать в null внутри кэшируемого метода: кэш не умеет хранить Optional и бросит исключение",
   "null тоже кэшируется: клиент, которого не было при первом вызове, останется «отсутствующим»",
   "Ключ кэша по умолчанию — все аргументы, а ИИН как строка даёт коллизии в ConcurrentMapCache при большом объёме",
   "Всё нормально: save автоматически инвалидирует кэш clients, потому что сущность та же"
  ],
  "why": "Кэш Spring по умолчанию сохраняет и null: это допустимый результат, и для ConcurrentMapCache allowNullValues включён. Регистрация: find вернул null и положил его в кэш, save создал клиента, второй find достал из кэша null. Клиент есть в базе и «отсутствует» для приложения, пока запись не истечёт — а в кэше без TTL никогда.\n\nЛечится unless = \"#result == null\" на @Cacheable, либо @CachePut на save, либо @CacheEvict. Save ничего не инвалидирует сам: кэш и репозиторий друг о друге не знают. Optional и строковый ключ здесь ни при чём."
 },
 {
  "id": "bug3-spring-event-before-commit",
  "t": "Spring",
  "correct": 3,
  "code": "@Transactional\npublic Order create(OrderDto dto) {\n  Order o = repo.save(Order.from(dto));\n  events.publishEvent(new OrderCreated(o.getId()));\n  limits.reserve(o);   // может бросить и откатить\n  return o;\n}\n\n@EventListener\nvoid onCreated(OrderCreated e) {\n  mail.sendConfirmation(e.id());\n}",
  "options": [
   "publishEvent внутри @Transactional запрещён: Spring бросит IllegalTransactionStateException при публикации",
   "Слушатель выполняется в другом потоке, и письмо уйдёт раньше, чем save дойдёт до базы, — классическая гонка",
   "Всё нормально: события в Spring доставляются после завершения метода, когда транзакция уже закрыта",
   "Слушатель сработает синхронно до коммита: письмо уйдёт, даже если reserve откатит транзакцию"
  ],
  "why": "@EventListener вызывается прямо из publishEvent, в том же потоке, посреди транзакции. Письмо «ваш заказ создан» уходит, потом reserve бросает исключение, транзакция откатывается — заказа нет, а письмо есть. Клиент звонит в поддержку с номером заказа, которого не существует.\n\nДля побочных эффектов есть @TransactionalEventListener с фазой AFTER_COMMIT: слушатель вызовется только если транзакция зафиксирована. Публиковать события внутри транзакции можно, в другой поток они не уходят без @Async, после завершения метода сами по себе не откладываются."
 }
]);

/* Режим «Найди баг»: сниппет Java с подсаженной ошибкой. window.BUGS. */
window.BUGS = [
 {
  "id": "bug-self-tx",
  "t": "Spring",
  "correct": 0,
  "code": "@Service\nclass OrderService {\n    public void place(Order o) {\n        this.save(o);          // <-- ?\n    }\n    @Transactional\n    public void save(Order o) {\n        repo.save(o);\n    }\n}",
  "options": [
   "save() выполнится БЕЗ транзакции: вызов через this идёт мимо прокси",
   "Всё корректно — транзакция откроется в save()",
   "Будет двойная транзакция: на place() и на save()",
   "Не скомпилируется без @Transactional на place()"
  ],
  "why": "Прокси перехватывает только ВНЕШНИЕ вызовы. this.save() — внутренний, мимо прокси, поэтому @Transactional не срабатывает. Вынеси save() в другой бин."
 },
 {
  "id": "bug-eq-nohash",
  "t": "Java",
  "correct": 0,
  "code": "class Point {\n    int x, y;\n    @Override public boolean equals(Object o) {\n        return o instanceof Point p && p.x == x && p.y == y;\n    }\n}\n// set.add(new Point(1,2));\n// set.contains(new Point(1,2)) -> ?",
  "options": [
   "Нет hashCode() — в HashSet/HashMap объект «потеряется», contains вернёт false",
   "Всё ок, для HashSet достаточно equals()",
   "equals должен возвращать int, а не boolean",
   "instanceof с pattern не компилируется"
  ],
  "why": "Переопределил equals — обязан и hashCode. Иначе разные hashCode → разные бакеты, и contains даже не дойдёт до equals()."
 },
 {
  "id": "bug-integer-eq",
  "t": "Java",
  "correct": 0,
  "code": "Integer a = 1000;\nInteger b = 1000;\nif (a == b) {              // <-- ?\n    System.out.println(\"равны\");\n}",
  "options": [
   "== сравнивает ССЫЛКИ: 1000 вне кеша -128..127 → false; нужен equals()",
   "Выведет «равны» — Integer сравнивается по значению",
   "Не скомпилируется — Integer нельзя сравнивать через ==",
   "Бросит NullPointerException"
  ],
  "why": "Автобоксинг кеширует только -128..127. 1000 — два новых объекта, == по ссылкам = false. Обёртки сравнивай через equals()."
 },
 {
  "id": "bug-cme",
  "t": "Java",
  "correct": 0,
  "code": "List<String> list = new ArrayList<>(List.of(\"a\",\"b\",\"c\"));\nfor (String s : list) {\n    if (s.equals(\"b\")) list.remove(s);   // <-- ?\n}",
  "options": [
   "ConcurrentModificationException — изменение коллекции мимо итератора",
   "Всё ок, спокойно удалит «b»",
   "Удалит все элементы списка",
   "NullPointerException на remove()"
  ],
  "why": "for-each идёт через итератор, который ловит изменение modCount. Удаляй через iterator.remove() или list.removeIf()."
 },
 {
  "id": "bug-rollback",
  "t": "Spring",
  "correct": 0,
  "code": "@Transactional\npublic void transfer() throws IOException {\n    repo.debit();\n    throw new IOException(\"fail\");   // <-- ?\n}",
  "options": [
   "Транзакция НЕ откатится: на checked-исключение по умолчанию commit",
   "Откатится — @Transactional ловит любые исключения",
   "Не скомпилируется — @Transactional нельзя с throws",
   "Откатится только debit(), остальное закоммитится"
  ],
  "why": "По умолчанию откат только на RuntimeException/Error. На checked (IOException) — COMMIT. Лечение: @Transactional(rollbackFor = Exception.class)."
 },
 {
  "id": "bug-string-loop",
  "t": "Algorithms",
  "correct": 0,
  "code": "String csv = \"\";\nfor (String item : items) {\n    csv += item + \",\";       // <-- ?\n}",
  "options": [
   "O(n²): каждый += создаёт новую строку и копирует старую; нужен StringBuilder",
   "Всё ок, += для String эффективен",
   "Не скомпилируется — нельзя += для String",
   "Утечка памяти из-за String pool"
  ],
  "why": "String неизменяем — каждый += копирует всю строку. На большом списке это O(n²). Используй StringBuilder."
 },
 {
  "id": "bug-float-money",
  "t": "DB",
  "correct": 0,
  "code": "double total = 0;\nfor (int i = 0; i < 10; i++) {\n    total += 0.1;\n}\n// total == 1.0 ?",
  "options": [
   "Нет: double копит ошибку (0.999…); для денег BigDecimal / NUMERIC",
   "Да, total будет ровно 1.0",
   "Будет 0.0 — double обнуляется",
   "ArithmeticException при сложении"
  ],
  "why": "0.1 в двоичном double неточна, ошибка накапливается → 0.9999999999999999. Для денег BigDecimal или целые копейки."
 },
 {
  "id": "bug-catch-order",
  "t": "Java",
  "correct": 0,
  "code": "try {\n    read();\n} catch (Exception e) {        // <-- ?\n    log(e);\n} catch (IOException e) {\n    retry();\n}",
  "options": [
   "Не скомпилируется: общий Exception раньше частного IOException — второй блок недостижим",
   "Всё ок, IOException обработается во втором блоке",
   "Оба блока выполнятся по очереди",
   "IOException надо объявить в throws"
  ],
  "why": "catch идёт от ЧАСТНОГО к общему. Exception раньше IOException делает второй catch недостижимым — ошибка компиляции."
 },
 {
  "id": "bug-resource",
  "t": "Java",
  "correct": 0,
  "code": "public String read(String path) throws IOException {\n    BufferedReader r = new BufferedReader(new FileReader(path));\n    return r.readLine();       // <-- ?\n}",
  "options": [
   "Ресурс не закрыт (нет close) — утечка дескриптора; нужен try-with-resources",
   "Всё ок, GC закроет файл сам",
   "readLine() закрывает поток автоматически",
   "Нужно объявить r как static"
  ],
  "why": "FileReader держит файловый дескриптор. Без close() — утечка. Оберни в try (var r = …) — закроется само."
 },
 {
  "id": "bug-nplus1",
  "t": "Spring",
  "correct": 0,
  "code": "List<Order> orders = orderRepo.findAll();\nfor (Order o : orders) {\n    total += o.getClient().getBalance();   // client — LAZY\n}",
  "options": [
   "N+1 запросов: на каждый заказ отдельный SELECT клиента",
   "Один запрос — Hibernate грузит всё сразу",
   "Всегда LazyInitializationException",
   "Deadlock на чтении"
  ],
  "why": "findAll — 1 запрос, но обращение к ленивому client в цикле даёт ещё N запросов. Лечи через JOIN FETCH / @EntityGraph."
 },
 {
  "id": "bug-volatile",
  "t": "Concurrency",
  "correct": 0,
  "code": "volatile int count = 0;\n\n// 10 потоков параллельно:\ncount++;                       // <-- ?",
  "options": [
   "volatile не даёт атомарность: count++ потеряет инкременты; нужен AtomicInteger",
   "volatile делает count++ потокобезопасным",
   "Будет ровно столько, сколько инкрементов",
   "Не скомпилируется — volatile только для ссылок"
  ],
  "why": "count++ это read-modify-write (3 шага). volatile даёт видимость, но не атомарность — потоки затрут друг друга. AtomicInteger.incrementAndGet()."
 },
 {
  "id": "bug-sdf",
  "t": "Concurrency",
  "correct": 0,
  "code": "static final SimpleDateFormat FMT =\n    new SimpleDateFormat(\"yyyy-MM-dd\");\n\n// вызывается из многих потоков:\nString s = FMT.format(date);   // <-- ?",
  "options": [
   "SimpleDateFormat НЕ потокобезопасен — общий статик выдаёт мусор/исключения",
   "Всё ок, format() потокобезопасен",
   "static делает его потокобезопасным",
   "Достаточно пометить поле volatile"
  ],
  "why": "SimpleDateFormat хранит изменяемое состояние внутри. Общий экземпляр из многих потоков = гонка. Используй DateTimeFormatter (immutable)."
 },
 {
  "id": "bug-optional-get",
  "t": "Java",
  "correct": 0,
  "code": "Optional<User> u = repo.findById(id);\nreturn u.get().getName();      // <-- ?",
  "options": [
   "get() без проверки → NoSuchElementException, если пусто",
   "Всё ок, get() вернёт null если пусто",
   "Не скомпилируется без isPresent()",
   "Вернёт пустую строку при отсутствии"
  ],
  "why": "Optional.get() на пустом значении кидает NoSuchElementException. Используй map(...).orElse(...) или orElseThrow с понятной ошибкой."
 },
 {
  "id": "bug-lazyinit",
  "t": "Spring",
  "correct": 0,
  "code": "@GetMapping(\"/{id}\")\npublic Order get(@PathVariable Long id) {\n    Order o = repo.findById(id).orElseThrow();\n    return o;   // o.items — LAZY, сериализуется вне транзакции\n}",
  "options": [
   "LazyInitializationException: ленивые связи читаются после закрытия сессии",
   "Всё ок, Hibernate догрузит при сериализации",
   "Вернёт null вместо items",
   "Двойной запрос к БД"
  ],
  "why": "Метод не транзакционный — persistence context закрыт к моменту сериализации lazy-поля. Отдавай DTO или грузи через fetch в транзакции."
 },
 {
  "id": "bug2-visibility-flag",
  "t": "Concurrency",
  "correct": 0,
  "code": "public class Worker implements Runnable {\n    private boolean running = true; // <-- ?\n\n    public void stop() {\n        running = false;\n    }\n\n    @Override\n    public void run() {\n        while (running) {\n            doWork();\n        }\n    }\n}",
  "options": [
   "Поле running должно быть volatile: без него фоновый поток может вечно крутиться в цикле, не увидев записи running=false из другого потока (нет гарантии видимости).",
   "Метод stop() обязан быть synchronized, иначе будет race condition при записи boolean, и значение запишется некорректно.",
   "boolean нельзя писать атомарно в Java без AtomicBoolean — запись running=false может оставить поле в промежуточном состоянии.",
   "Всё корректно: запись простого boolean из одного потока всегда немедленно видна другим потокам в Java."
  ],
  "why": "Без volatile JMM не гарантирует видимость записи running=false другому потоку — он может читать закэшированное true бесконечно. Делаем поле volatile (запись/чтение boolean и так атомарны)."
 },
 {
  "id": "bug2-check-then-act",
  "t": "Concurrency",
  "correct": 1,
  "code": "private final Map<String, User> cache = new ConcurrentHashMap<>();\n\npublic User getOrCreate(String id) {\n    if (!cache.containsKey(id)) { // <-- ?\n        cache.put(id, loadUser(id));\n    }\n    return cache.get(id);\n}",
  "options": [
   "ConcurrentHashMap не потокобезопасен для метода get(), нужно обернуть весь блок в synchronized по cache.",
   "Здесь check-then-act race: между containsKey и put два потока могут одновременно увидеть отсутствие ключа и оба вызвать loadUser, перезаписав значение. Нужен computeIfAbsent.",
   "containsKey на ConcurrentHashMap может бросить ConcurrentModificationException при параллельном put из другого потока.",
   "Всё корректно: ConcurrentHashMap делает последовательность containsKey/put атомарной за счёт внутренней сегментации."
  ],
  "why": "Каждая операция атомарна, но последовательность containsKey→put — нет: два потока пройдут проверку и оба загрузят/перезапишут User. Заменить на cache.computeIfAbsent(id, this::loadUser)."
 },
 {
  "id": "bug2-different-monitors",
  "t": "Concurrency",
  "correct": 3,
  "code": "private int balance = 0;\n\npublic void deposit(int amount) {\n    synchronized (this) {\n        balance += amount;\n    }\n}\n\npublic synchronized static void reset() { // <-- ?\n    // ... сбрасывает общий balance через instance\n}\n\npublic int getBalance() {\n    synchronized (this) { return balance; }\n}",
  "options": [
   "getBalance() не должен быть synchronized: чтение int атомарно, лишняя блокировка вызывает deadlock с deposit().",
   "synchronized(this) в deposit() лишний — инкремент int и так атомарен, блокировка только замедляет код.",
   "Всё корректно: static synchronized и synchronized(this) защищают одно и то же поле, гонок нет.",
   "static synchronized метод reset() блокируется по монитору класса (Account.class), а deposit/getBalance — по монитору экземпляра (this); это разные мониторы, поэтому reset не взаимоисключается с deposit и balance гонится."
  ],
  "why": "static synchronized захватывает монитор Class-объекта, а нестатические — монитор this: это разные локи, взаимного исключения между reset и deposit нет. Нужно синхронизировать reset по тому же монитору экземпляра/общему объекту."
 },
 {
  "id": "bug2-dcl-no-volatile",
  "t": "Concurrency",
  "correct": 2,
  "code": "public class Registry {\n    private static Config instance; // <-- ?\n\n    public static Config getInstance() {\n        if (instance == null) {\n            synchronized (Registry.class) {\n                if (instance == null) {\n                    instance = new Config();\n                }\n            }\n        }\n        return instance;\n    }\n}",
  "options": [
   "Внешняя проверка instance == null вне synchronized — лишняя; её надо убрать, иначе создадутся два экземпляра.",
   "Double-checked locking в Java не работает в принципе с любой версией JMM — нужно убрать оба if и всегда входить в synchronized.",
   "Поле instance должно быть volatile: без него другой поток из-за переупорядочивания записей может увидеть ненулевую, но ещё не до конца сконструированную ссылку на Config.",
   "Всё корректно: synchronized-блок гарантирует, что instance будет полностью сконструирован до выхода, volatile не нужен."
  ],
  "why": "Без volatile запись instance может стать видимой до завершения конструктора (reordering), и поток на внешней проверке получит частично инициализированный объект. Поле должно быть volatile."
 },
 {
  "id": "bug2-nonatomic-increment",
  "t": "Concurrency",
  "correct": 3,
  "code": "private volatile long counter = 0; // <-- ?\n\npublic void hit() {\n    counter++;\n}\n\npublic long total() {\n    return counter;\n}",
  "options": [
   "long нельзя объявлять volatile — на 32-битных JVM это вызовет ошибку компиляции, нужен AtomicLong.",
   "volatile здесь избыточен: при многопоточном hit() он гарантирует и видимость, и атомарность инкремента, можно убрать.",
   "Всё корректно: volatile делает counter++ атомарным, потеря инкрементов при параллельных hit() невозможна.",
   "volatile даёт только видимость, но counter++ — это read-modify-write из трёх шагов; при параллельных hit() инкременты теряются. Нужен AtomicLong/LongAdder или synchronized."
  ],
  "why": "volatile гарантирует видимость, но не атомарность составной операции counter++ (чтение-инкремент-запись), поэтому при гонке инкременты теряются. Использовать AtomicLong.incrementAndGet() или LongAdder."
 },
 {
  "id": "bug2-lock-ordering-deadlock",
  "t": "Concurrency",
  "correct": 1,
  "code": "void transfer(Account from, Account to, int amount) {\n    synchronized (from) {       // <-- ?\n        synchronized (to) {\n            from.debit(amount);\n            to.credit(amount);\n        }\n    }\n}",
  "options": [
   "Захват двух мониторов из одного потока всегда приводит к deadlock — нельзя держать два synchronized одновременно.",
   "Два потока, делающие transfer(A,B) и transfer(B,A) одновременно, захватят локи в обратном порядке и получат deadlock; нужно упорядочить захват локов по стабильному ключу (например, по id аккаунта).",
   "Всё корректно: вложенные synchronized гарантируют атомарность перевода и deadlock здесь невозможен.",
   "Проблема в том, что from.debit и to.credit вызываются внутри двух локов — это вызывает livelock из-за повторного входа в монитор."
  ],
  "why": "transfer(A,B) берёт A→B, а параллельный transfer(B,A) берёт B→A — классический deadlock из-за обратного порядка локов. Захватывать мониторы в детерминированном порядке (например, по System.identityHashCode или id)."
 },
 {
  "id": "bug2-lost-update",
  "t": "DB",
  "correct": 1,
  "code": "@Transactional\npublic void withdraw(Long accountId, BigDecimal amount) {\n    Account acc = em.find(Account.class, accountId);\n    if (acc.getBalance().compareTo(amount) >= 0) {\n        acc.setBalance(acc.getBalance().subtract(amount));\n    }\n    // JPA flush на коммите\n}\n// Два параллельных вызова withdraw(1, 100) при балансе 150",
  "options": [
   "find() надо заменить на getReference(), иначе грузится вся сущность и это медленно",
   "Read-modify-write без блокировки: оба читают 150, оба проходят проверку и списывают — баланс уходит в минус (lost update). Нужен @Lock(PESSIMISTIC_WRITE) или @Version",
   "Нельзя сравнивать BigDecimal через compareTo, надо equals — иначе проверка баланса неверна",
   "Всё корректно: @Transactional при READ_COMMITTED гарантирует, что второй вызов увидит уже списанный баланс"
  ],
  "why": "Классический lost update: при READ_COMMITTED обе транзакции читают исходные 150 до коммита друг друга, оба апдейта проходят. Нужен пессимистичный @Lock(LockModeType.PESSIMISTIC_WRITE) или оптимистичный @Version."
 },
 {
  "id": "bug2-func-index",
  "t": "DB",
  "correct": 2,
  "code": "// есть индекс: CREATE INDEX idx_users_email ON users(email);\n@Query(value = \"SELECT * FROM users WHERE LOWER(email) = LOWER(:email)\",\n       nativeQuery = true)\nList<User> findByEmail(@Param(\"email\") String email);\n// в проде на таблице 5M строк запрос делает seq scan",
  "options": [
   "nativeQuery несовместим с :param-плейсхолдерами, нужно ?1 — поэтому индекс игнорируется",
   "LOWER(:email) на параметре не вычисляется заранее, из-за чего планировщик не может использовать индекс",
   "LOWER(email) — функция над колонкой, поэтому обычный индекс по email не применяется; нужен функциональный индекс на LOWER(email) либо хранить email уже в нижнем регистре",
   "SELECT * мешает использовать индекс — надо перечислить колонки, тогда сработает index-only scan"
  ],
  "why": "Индекс построен по email, а условие фильтрует по LOWER(email) — это другое выражение, B-tree индекс не подходит и идёт seq scan. Нужен индекс на LOWER(email) (functional index) или нормализация email при записи."
 },
 {
  "id": "bug2-offset-pagination",
  "t": "DB",
  "correct": 0,
  "code": "// постранично выгружаем активные заказы, новые приходят постоянно\nString sql = \"SELECT * FROM orders WHERE status='ACTIVE' \" +\n             \"ORDER BY created_at DESC LIMIT 50 OFFSET :offset\";\nfor (int page = 0; ; page++) {\n    List<Order> batch = jdbc.query(sql, Map.of(\"offset\", page * 50));\n    if (batch.isEmpty()) break;\n    process(batch);\n}",
  "options": [
   "OFFSET-пагинация по часто меняющемуся набору: при вставке/удалении строк между страницами часть заказов дублируется или пропускается. Нужна keyset-пагинация (WHERE created_at < :lastSeen)",
   "LIMIT должен идти после OFFSET в SQL — порядок ключевых слов нарушен, запрос упадёт",
   "Цикл бесконечный: условие выхода break при empty недостижимо, потому что batch всегда содержит хотя бы одну строку",
   "ORDER BY created_at не уникален — без этого результаты вернутся в случайном порядке и process() обработает мусор"
  ],
  "why": "При вставке новых ACTIVE-заказов в начало (DESC) между запросами страниц OFFSET смещается, и строки дублируются/теряются между батчами. Решение — keyset (seek) пагинация по created_at последней обработанной строки."
 },
 {
  "id": "bug2-n-plus-one",
  "t": "DB",
  "correct": 2,
  "code": "@Entity class Order {\n    @ManyToOne(fetch = FetchType.LAZY) Client client;\n}\nList<Order> orders = em.createQuery(\n    \"SELECT o FROM Order o WHERE o.status = :s\", Order.class)\n    .setParameter(\"s\", Status.NEW).getResultList();\nfor (Order o : orders) {\n    report.add(o.getClient().getName()); // <-- ?\n}",
  "options": [
   "LAZY на @ManyToOne не работает без bytecode enhancement, поэтому client всегда null и будет NPE",
   "getClient().getName() вне транзакции бросит LazyInitializationException — это единственная проблема",
   "N+1: на каждый заказ в цикле выполняется отдельный SELECT клиента. Нужен JOIN FETCH или @EntityGraph, чтобы подгрузить клиентов одним запросом",
   "Всё корректно: Hibernate автоматически батчит ленивые загрузки по умолчанию, лишних запросов не будет"
  ],
  "why": "Запрос грузит только заказы, а обращение к ленивому client в цикле инициирует по одному SELECT на заказ — N+1. Чинится JOIN FETCH o.client или @EntityGraph/@BatchSize."
 },
 {
  "id": "bug2-phantom-isolation",
  "t": "DB",
  "correct": 0,
  "code": "@Transactional(isolation = Isolation.READ_COMMITTED)\npublic void reserveSeat(Long eventId) {\n    long taken = repo.countByEvent(eventId);   // SELECT count(*)\n    if (taken < CAPACITY) {\n        repo.save(new Seat(eventId));           // INSERT\n    } else {\n        throw new SoldOutException();\n    }\n}\n// продаётся больше мест, чем CAPACITY",
  "options": [
   "READ_COMMITTED не защищает от phantom: два потока одновременно читают count < CAPACITY и оба вставляют — мест продаётся больше. Нужен SERIALIZABLE/SELECT FOR UPDATE на родителе или уникальное ограничение",
   "count(*) медленный на больших таблицах, поэтому проверка иногда не успевает и пропускает вставку",
   "save() надо вызывать в отдельной транзакции с REQUIRES_NEW, иначе INSERT не виден следующему вызову",
   "Всё корректно: @Transactional сериализует доступ к методу, поэтому два потока не могут одновременно пройти проверку"
  ],
  "why": "Это write-skew/phantom: при READ_COMMITTED оба потока видят count ниже лимита и оба вставляют, превышая CAPACITY. Нужен SERIALIZABLE, блокировка строки-события (SELECT ... FOR UPDATE) или ограничение на число мест в БД."
 },
 {
  "id": "bug2-autocommit-lost",
  "t": "Distributed",
  "correct": 1,
  "code": "@KafkaListener(topics = \"orders\")\npublic void onMessage(ConsumerRecord<String, Order> rec) {\n    // props: enable.auto.commit=true, auto.commit.interval.ms=5000\n    Order order = rec.value();\n    CompletableFuture.runAsync(() -> {   // <-- ?\n        paymentService.charge(order);     // тяжёлая операция, ~10s\n        repo.markProcessed(order.getId());\n    }, executor);\n    // метод сразу возвращается, poll() идёт дальше\n}",
  "options": [
   "CompletableFuture.runAsync создаёт новый поток на каждое сообщение — утечка потоков и OOM",
   "При enable.auto.commit=true оффсет коммитится по таймеру независимо от async-обработки: poll() вернулся — оффсет уйдёт вперёд, а при падении/рестарте до завершения charge() сообщение будет потеряно (не переобработано)",
   "Всё корректно: auto-commit гарантирует at-least-once, сообщение переобработается после сбоя",
   "paymentService.charge нельзя вызывать вне @Transactional — данные не сохранятся"
  ],
  "why": "Auto-commit коммитит оффсет по интервалу для уже опрошенных записей, не дожидаясь завершения async-обработки; если приложение упадёт после коммита, но до markProcessed — сообщение потеряно. Нужно ручной commit (enable.auto.commit=false) после успешной синхронной обработки."
 },
 {
  "id": "bug2-no-dedup",
  "t": "Distributed",
  "correct": 3,
  "code": "// at-least-once consumer, ручной ack после обработки\n@KafkaListener(topics = \"payments\")\npublic void handle(PaymentEvent e, Acknowledgment ack) {\n    account.balance += e.getAmount();        // <-- ?\n    repo.save(account);\n    ack.acknowledge();\n}\n// при rebalance/ретрае брокер может доставить то же событие повторно",
  "options": [
   "account.balance не volatile — другой поток не увидит изменение",
   "ack.acknowledge() надо звать до save(), иначе двойной коммит оффсета",
   "Kafka гарантирует exactly-once по умолчанию, дедуп не нужен — код корректен",
   "At-least-once допускает повторную доставку (rebalance, таймаут ack, ретрай), а операция неидемпотентна: повторное событие второй раз прибавит сумму. Нужна дедупликация по eventId (обработанные id в БД) или идемпотентный upsert"
  ],
  "why": "В at-least-once одно и то же событие может прийти дважды; неидемпотентное +=amount задвоит баланс. Чинится дедупом по уникальному eventId (таблица processed_events с PK) или идемпотентной операцией."
 },
 {
  "id": "bug2-retry-post",
  "t": "Distributed",
  "correct": 1,
  "code": "@Retryable(maxAttempts = 3, value = IOException.class)\npublic String createPayment(PaymentReq req) {\n    // POST без ключа идемпотентности\n    return restClient.post()\n        .uri(\"/v1/payments\")          // <-- ?\n        .body(req)\n        .retrieve()\n        .body(String.class);\n    // таймаут ответа => IOException => повтор\n}",
  "options": [
   "@Retryable не работает на public-методах — нужен protected",
   "POST неидемпотентен: при таймауте ответа платёж мог уже создаться на сервере, а ретрай создаст ещё один (двойное списание). Нужен Idempotency-Key в заголовке, чтобы сервер дедуплицировал",
   "maxAttempts=3 слишком мало, нужно экспоненциальный backoff — иначе DDoS сервера",
   "Всё корректно: ретрай только на IOException, бизнес-ошибки (4xx/5xx) не ретраятся"
  ],
  "why": "Таймаут не значит, что запрос не дошёл — POST мог успешно создать платёж, а ретрай создаст дубль. Нужно передавать стабильный Idempotency-Key, по которому сервер вернёт тот же результат вместо повторного создания."
 },
 {
  "id": "bug2-partition-key",
  "t": "Distributed",
  "correct": 2,
  "code": "// нужно сохранить порядок событий по одному счёту\npublic void publish(AccountEvent e) {\n    ProducerRecord<String, AccountEvent> r =\n        new ProducerRecord<>(\"account-events\", e);  // <-- ?\n    producer.send(r);\n}\n// топик: 6 партиций, потребители читают параллельно",
  "options": [
   "producer.send асинхронный — без .get() сообщение не отправится",
   "AccountEvent должен быть Serializable, иначе сериализатор упадёт",
   "Конструктор без ключа партиции => события одного счёта рассыпаются по разным партициям round-robin'ом и читаются параллельно: порядок (open->deposit->close) нарушается. Ключом должен быть accountId",
   "Всё корректно: Kafka сохраняет глобальный порядок внутри топика"
  ],
  "why": "Без ключа партиции записи распределяются по всем 6 партициям, и события одного счёта теряют порядок при параллельном чтении. Нужно new ProducerRecord<>(topic, e.getAccountId(), e) — тогда все события счёта попадут в одну партицию."
 },
 {
  "id": "bug2-no-timeout",
  "t": "Distributed",
  "correct": 2,
  "code": "@Bean\npublic RestClient pricingClient() {\n    return RestClient.builder()\n        .baseUrl(\"http://pricing-svc\")   // <-- ?\n        .build();\n    // вызывается синхронно из обработчика HTTP-запросов в общем пуле\n}\n// pricing-svc иногда зависает и не закрывает соединение",
  "options": [
   "baseUrl должен быть https, иначе соединение не зашифровано — это и есть баг",
   "RestClient не потокобезопасен — нужен new экземпляр на запрос",
   "Не задан connect/read timeout: при зависании pricing-svc вызовы висят бесконечно, потоки пула исчерпываются и сервис каскадно падает (resource exhaustion). Нужно сконфигурировать таймауты на ClientHttpRequestFactory",
   "Всё корректно: HTTP-клиент по умолчанию имеет разумный таймаут 30с"
  ],
  "why": "По умолчанию у клиента нет read timeout — зависший downstream держит потоки бесконечно, пул исчерпывается и падает весь сервис. Нужно явно задать connectTimeout/readTimeout (например через ClientHttpRequestFactorySettings) плюс circuit breaker."
 },
 {
  "id": "bug2-threadlocal-pool",
  "t": "JVM",
  "correct": 1,
  "code": "@Component\npublic class RequestContextHolder {\n    private static final ThreadLocal<UserContext> CTX = new ThreadLocal<>();\n\n    public void bind(UserContext ctx) { CTX.set(ctx); }\n    public UserContext get() { return CTX.get(); }\n\n    // вызывается фильтром в начале обработки запроса\n    public void onRequest(HttpServletRequest req) {\n        CTX.set(new UserContext(req.getHeader(\"X-User-Id\")));  // <-- ?\n        // ... обработка ...\n    }\n}",
  "options": [
   "ThreadLocal должен быть нестатическим, иначе все потоки делят один объект UserContext и видят чужой контекст",
   "В пуле потоков (Tomcat) поток переиспользуется, а CTX никогда не очищается через remove() — это утечка памяти и протечка чужого контекста в следующий запрос",
   "ThreadLocal не потокобезопасен, нужно обернуть set/get в synchronized",
   "Код корректен: ThreadLocal сам очищается при возврате потока в пул"
  ],
  "why": "В пуле потоков поток живёт долго и переиспользуется между запросами; без CTX.remove() (обычно в finally фильтра) старое значение остаётся, давая утечку памяти и риск отдать данные предыдущего пользователя. static у ThreadLocal как раз правильно — у каждого потока своя копия."
 },
 {
  "id": "bug2-finalize-resource",
  "t": "JVM",
  "correct": 2,
  "code": "public class NativeBuffer {\n    private final long handle;\n    public NativeBuffer(int size) { this.handle = alloc(size); }\n\n    @Override\n    protected void finalize() throws Throwable {  // <-- ?\n        free(handle);\n        super.finalize();\n    }\n    private static native long alloc(int size);\n    private static native void free(long handle);\n}",
  "options": [
   "finalize() должен быть public, иначе GC не сможет его вызвать и нативная память никогда не освободится",
   "Нужно вызывать super.finalize() в начале метода, а не в конце, иначе ресурс утечёт",
   "Освобождение через finalize() ненадёжно: вызов не гарантирован, откладывает сбор объектов на лишний GC-цикл и под нагрузкой ведёт к OOM нативной памяти — нужен Cleaner/AutoCloseable",
   "Код корректен: finalize() гарантированно освободит нативный handle при сборке мусора"
  ],
  "why": "finalize() устарел и ненадёжен: момент и сам факт вызова не гарантированы, финализируемые объекты переживают лишний GC-цикл и копятся в очереди финализации, что под нагрузкой приводит к OOM нативной памяти. Замена — java.lang.ref.Cleaner или реализация AutoCloseable с try-with-resources."
 },
 {
  "id": "bug2-unbounded-cache",
  "t": "JVM",
  "correct": 1,
  "code": "@Service\npublic class PriceCache {\n    private final Map<String, BigDecimal> cache = new ConcurrentHashMap<>();\n\n    public BigDecimal price(String isin) {\n        return cache.computeIfAbsent(isin, this::loadFromDb);  // <-- ?\n    }\n    private BigDecimal loadFromDb(String isin) {\n        return repo.findPrice(isin);\n    }\n}",
  "options": [
   "computeIfAbsent не атомарен в ConcurrentHashMap — два потока могут загрузить цену дважды",
   "Кэш ничем не ограничен и из него ничего не вытесняется: при большом числе уникальных isin (или ключах от пользователя) Map растёт неограниченно вплоть до OOM — нужен лимит/TTL (Caffeine)",
   "BigDecimal нельзя использовать как значение в ConcurrentHashMap из-за mutable-состояния",
   "Код корректен: GC сам удалит редко используемые записи из обычного HashMap"
  ],
  "why": "Обычный ConcurrentHashMap как кэш не имеет ни лимита размера, ни TTL, ни eviction; при потоке уникальных ключей он растёт до исчерпания хипа и OOM. Решение — кэш с ограничением (Caffeine с maximumSize/expireAfter) или явное вытеснение."
 },
 {
  "id": "bug2-stringbuilder-loop",
  "t": "JVM",
  "correct": 2,
  "code": "public String join(List<String> parts) {\n    String result = \"\";\n    for (String p : parts) {\n        StringBuilder sb = new StringBuilder();  // <-- ?\n        sb.append(result);\n        sb.append(p);\n        result = sb.toString();\n    }\n    return result;\n}",
  "options": [
   "StringBuilder не потокобезопасен, нужно использовать StringBuffer",
   "result = \"\" вызывает NPE при первой итерации из-за автобоксинга",
   "StringBuilder создаётся внутри цикла и каждый раз копирует весь накопленный result — это та же квадратичная сложность O(n²), что и при конкатенации +; нужно вынести один StringBuilder за цикл",
   "Код корректен и оптимален: использование StringBuilder убирает создание лишних String"
  ],
  "why": "StringBuilder вынесли внутрь цикла и на каждой итерации заново копируют весь result через append(result)+toString() — это O(n²) по объёму, ровно как наивная конкатенация строк. Чинится выносом единственного StringBuilder за пределы цикла и append только p внутри."
 },
 {
  "id": "bug2-equals-no-hashcode",
  "t": "Java",
  "correct": 1,
  "code": "public class Money {\n    private final long cents;\n    public Money(long cents) { this.cents = cents; }\n    @Override\n    public boolean equals(Object o) {\n        if (!(o instanceof Money)) return false;\n        return ((Money) o).cents == this.cents;\n    }\n}\n// ...\nSet<Money> seen = new HashSet<>();\nseen.add(new Money(100));\nboolean has = seen.contains(new Money(100)); // <-- ?",
  "options": [
   "equals написан неверно: нужно сравнивать через getClass(), а instanceof ломает контракт",
   "Переопределён equals, но не переопределён hashCode — у двух равных Money разные хеши, и contains в HashSet вернёт false",
   "Всё корректно: HashSet использует equals для поиска, contains вернёт true",
   "cents должен быть Long (объект), иначе == сравнивает значения некорректно при больших числах"
  ],
  "why": "Нарушен контракт equals/hashCode: при переопределённом equals не переопределён hashCode, поэтому равные объекты попадают в разные бакеты и contains вернёт false. Нужно добавить hashCode на основе cents."
 },
 {
  "id": "bug2-mutable-key",
  "t": "Java",
  "correct": 2,
  "code": "Map<List<String>, Integer> counts = new HashMap<>();\nList<String> key = new ArrayList<>(List.of(\"a\", \"b\"));\ncounts.put(key, 1);\n\nkey.add(\"c\"); // <-- ?\n\nInteger v = counts.get(key);\nSystem.out.println(v);",
  "options": [
   "ArrayList нельзя использовать как ключ HashMap — это вызовет ClassCastException при put",
   "get вернёт 1, потому что это та же ссылка на объект key",
   "После мутации ключа hashCode списка изменился, бакет больше не совпадает — get вернёт null (запись стала недостижимой)",
   "v будет равно 1, так как HashMap кэширует исходный hashCode при put"
  ],
  "why": "List как ключ HashMap изменяемый: после key.add(\"c\") его hashCode меняется, и запись попадает в \"неправильный\" бакет — get вернёт null. Ключи в HashMap должны быть неизменяемыми."
 },
 {
  "id": "bug2-autoboxing-npe",
  "t": "Java",
  "correct": 0,
  "code": "Map<String, Integer> retries = new HashMap<>();\n// retries для известных ключей заполняется отдельно\npublic boolean shouldRetry(String op) {\n    int count = retries.get(op); // <-- ?\n    return count < MAX_RETRIES;\n}",
  "options": [
   "get(op) для отсутствующего ключа вернёт null, а распаковка в int даст NullPointerException",
   "Сравнение count < MAX_RETRIES всегда false из-за автобоксинга Integer",
   "Метод вернёт false для неизвестного op, потому что get вернёт 0",
   "Всё корректно: для отсутствующего ключа count будет 0 по умолчанию"
  ],
  "why": "Для отсутствующего ключа get вернёт null, а присваивание int count = null вызывает авто-анбоксинг → NPE. Нужно retries.getOrDefault(op, 0)."
 },
 {
  "id": "bug2-integer-cache-eq",
  "t": "Java",
  "correct": 2,
  "code": "public boolean sameId(Integer a, Integer b) {\n    return a == b; // <-- ?\n}\n// ...\nLong total = ordersRepo.count(); // 200\nint a = total.intValue();\nboolean r1 = sameId(a, 100);   // в кэше\nboolean r2 = sameId(a, total.intValue()); // 200, вне кэша",
  "options": [
   "intValue() у Long теряет точность, поэтому sameId всегда вернёт false",
   "Автобоксинг int→Integer не происходит, сравниваются примитивы — всё корректно",
   "== сравнивает ссылки Integer: для значений в кэше (-128..127) работает, но для 200 даст false даже при равных значениях — нужен equals/intValue",
   "r1 и r2 оба вернут true, потому что компилятор оптимизирует автобоксинг одинаковых значений"
  ],
  "why": "Параметры Integer сравниваются через == по ссылке. Для значений из кэша Integer (-128..127) ссылки совпадают, но для 200 создаются разные объекты и == даёт false. Нужно equals или сравнивать как int."
 },
 {
  "id": "bug2-cme-iterator",
  "t": "Java",
  "correct": 1,
  "code": "List<Order> orders = new ArrayList<>(loadOrders());\nfor (Order o : orders) {\n    if (o.isExpired()) {\n        orders.remove(o); // <-- ?\n    }\n}\nprocess(orders);",
  "options": [
   "remove(o) удалит неверный элемент, потому что List.remove(Object) трактует Order как индекс",
   "Изменение списка во время for-each через сам список нарушает modCount и бросит ConcurrentModificationException на следующей итерации",
   "Всё корректно для одного потока: for-each безопасно удаляет элементы из ArrayList",
   "Будет утечка памяти, так как удалённые Order остаются в итераторе"
  ],
  "why": "For-each использует итератор, а orders.remove(o) меняет modCount списка напрямую — на следующем next() итератор бросит ConcurrentModificationException. Нужен Iterator.remove() или removeIf."
 },
 {
  "id": "bug2-try-with-resources-order",
  "t": "Java",
  "correct": 2,
  "code": "Connection conn = dataSource.getConnection();\ntry (Statement st = conn.createStatement(); // <-- ?\n     ResultSet rs = st.executeQuery(\"SELECT * FROM accounts\")) {\n    while (rs.next()) {\n        handle(rs.getLong(\"id\"));\n    }\n}",
  "options": [
   "ResultSet нельзя объявлять в try-with-resources — он не реализует AutoCloseable",
   "st.executeQuery вызовется до открытия Statement, что даст NullPointerException",
   "Connection не объявлен в try-with-resources и не закрывается — при каждом вызове утечка соединения из пула",
   "Всё корректно: закрытие Statement каскадно закроет и Connection"
  ],
  "why": "В try-with-resources объявлены только Statement и ResultSet, а Connection получен снаружи и нигде не закрывается — соединение не возвращается в пул (утечка). Connection нужно тоже включить в try-with-resources."
 },
 {
  "id": "bug2-blocking-eventloop",
  "t": "Quarkus",
  "correct": 0,
  "code": "@Path(\"/reports\")\npublic class ReportResource {\n\n    @Inject\n    ReportService service;\n\n    @GET\n    @Produces(MediaType.APPLICATION_JSON)\n    public Uni<Report> get(@QueryParam(\"id\") long id) {\n        // service.loadFromDb — обычный блокирующий JDBC-вызов\n        Report r = service.loadFromDb(id); // <-- ?\n        return Uni.createFrom().item(r);\n    }\n}",
  "options": [
   "Метод возвращает Uni, но Quarkus вызывает реактивные методы на event-loop потоке, а блокирующий JDBC внутри loadFromDb заблокирует loop — нужен @Blocking или вынос на worker-пул",
   "Нельзя инжектить ReportService без @ApplicationScoped — будет NullPointerException при вызове",
   "@QueryParam не работает с примитивом long, нужен Long, иначе при отсутствии параметра упадёт парсинг",
   "Uni.createFrom().item(r) нельзя использовать с уже вычисленным значением — нужен deferred, иначе утечка подписки"
  ],
  "why": "Метод с возвращаемым типом Uni считается non-blocking и исполняется на I/O event-loop; синхронный JDBC-вызов блокирует loop и душит весь сервер. Чинится аннотацией @Blocking (или RunOnVirtualThread / асинхронным репозиторием)."
 },
 {
  "id": "bug2-transactional-self",
  "t": "Quarkus",
  "correct": 1,
  "code": "@ApplicationScoped\npublic class OrderService {\n\n    public void importAll(List<OrderDto> dtos) {\n        for (OrderDto d : dtos) {\n            saveOne(d); // <-- ?\n        }\n    }\n\n    @Transactional(Transactional.TxType.REQUIRES_NEW)\n    void saveOne(OrderDto d) {\n        Order o = new Order(d);\n        o.persist();\n    }\n}",
  "options": [
   "REQUIRES_NEW нельзя применять к void-методу — транзакция не закоммитится без явного flush",
   "Внутренний вызов saveOne() идёт мимо CDI-прокси (self-invocation), поэтому @Transactional игнорируется и каждый persist выполняется без своей транзакции",
   "o.persist() требует, чтобы importAll сам был @Transactional, иначе PersistenceException — а REQUIRES_NEW тут лишний",
   "Всё корректно: каждый saveOne открывает новую транзакцию и коммитит свою сущность независимо"
  ],
  "why": "saveOne вызывается напрямую через this, минуя CDI/interceptor-прокси, поэтому @Transactional не срабатывает вовсе. Нужно вызывать метод через инжектированный бин-прокси (self-inject) или вынести saveOne в отдельный бин."
 },
 {
  "id": "bug2-buildtime-env",
  "t": "Quarkus",
  "correct": 1,
  "code": "@ApplicationScoped\npublic class FeatureGate {\n\n    // application.properties: quarkus.hibernate-orm.database.generation=${DB_GEN:none}\n\n    @ConfigProperty(name = \"quarkus.hibernate-orm.database.generation\")\n    String dbGen; // <-- ?\n\n    public boolean isDropCreate() {\n        return \"drop-and-create\".equals(dbGen);\n    }\n}",
  "options": [
   "@ConfigProperty нельзя инжектить String без Optional — при отсутствии значения будет DeploymentException на старте",
   "quarkus.hibernate-orm.database.generation — build-time свойство: оно фиксируется при сборке, и переопределение через env-переменную DB_GEN в рантайме не подействует",
   "Дефолт ${DB_GEN:none} синтаксически неверен — Quarkus не поддерживает дефолты в property-ссылках",
   "FeatureGate должен быть @Singleton, иначе значение dbGen перечитывается на каждый запрос и тормозит"
  ],
  "why": "quarkus.hibernate-orm.database.generation — build-time property, его значение зашивается в момент сборки нативного/JVM-артефакта; задавать его через runtime env-переменную бесполезно. Менять такое свойство нужно на этапе сборки, иначе использовать runtime-конфигурируемый параметр."
 },
 {
  "id": "bug2-appscoped-mutable",
  "t": "Quarkus",
  "correct": 2,
  "code": "@ApplicationScoped\npublic class QuoteAccumulator {\n\n    private final List<BigDecimal> buffer = new ArrayList<>(); // <-- ?\n\n    @Incoming(\"quotes\")\n    public void onQuote(BigDecimal price) {\n        buffer.add(price);\n        if (buffer.size() >= 100) {\n            flush(new ArrayList<>(buffer));\n            buffer.clear();\n        }\n    }\n\n    void flush(List<BigDecimal> batch) { /* ... */ }\n}",
  "options": [
   "@Incoming требует возвращать CompletionStage или Uni, иначе сообщения не подтверждаются и канал зависнет",
   "BigDecimal нельзя складывать в ArrayList без компаратора — будет ClassCastException при сравнении в size()",
   "@ApplicationScoped-бин один на приложение, а его mutable-поле buffer изменяется конкурентно из нескольких потоков-консьюмеров без синхронизации — гонка и потеря/порча данных",
   "Всё корректно: Quarkus гарантирует, что @Incoming-методы одного бина исполняются строго в одном потоке, гонки нет"
  ],
  "why": "@ApplicationScoped — это синглтон, а небезопасный ArrayList мутируется из конкурентных вызовов onQuote: размер, add и clear не атомарны, что даёт гонку и потерю элементов. Нужно синхронизировать доступ, использовать потокобезопасную структуру или ограничить параллелизм канала."
 },
 {
  "id": "bug2-self-invocation-tx",
  "t": "Spring",
  "correct": 1,
  "code": "@Service\npublic class OrderService {\n    public void process(List<Order> orders) {\n        for (Order o : orders) {\n            saveOne(o); // <-- ?\n        }\n    }\n\n    @Transactional\n    public void saveOne(Order o) {\n        repository.save(o);\n        publishEvent(o);\n    }\n}",
  "options": [
   "Цикл вызывает saveOne для каждого ордера — нужно одну @Transactional на process, иначе будет N коммитов вместо одного",
   "@Transactional на saveOne не работает: внутренний вызов saveOne() идёт напрямую, минуя прокси, поэтому транзакция вообще не открывается",
   "publishEvent внутри @Transactional опубликует событие до коммита — нужен @TransactionalEventListener",
   "repository.save уже транзакционен сам по себе, аннотация на saveOne избыточна и ничего не ломает"
  ],
  "why": "Self-invocation (this.saveOne) идёт мимо Spring-прокси, поэтому @Transactional игнорируется и транзакция не создаётся. Нужно вынести saveOne в отдельный бин или вызывать через self-инъекцию прокси."
 },
 {
  "id": "bug2-transactional-private",
  "t": "Spring",
  "correct": 2,
  "code": "@Service\npublic class PaymentService {\n    private final Repo repo;\n\n    @Transactional\n    private void debit(Account a, BigDecimal sum) { // <-- ?\n        a.setBalance(a.getBalance().subtract(sum));\n        repo.save(a);\n    }\n\n    public void pay(Account a, BigDecimal sum) {\n        debit(a, sum);\n    }\n}",
  "options": [
   "BigDecimal.subtract не мутирует — баланс не изменится, save запишет старое значение",
   "pay не помечен @Transactional, поэтому save вне транзакции выбросит TransactionRequiredException",
   "@Transactional на private-методе игнорируется (CGLIB-прокси не может его переопределить), транзакция не применяется",
   "Всё корректно: Spring проксирует private-методы внутри бина, транзакция отрабатывает штатно"
  ],
  "why": "Spring AOP-прокси работают только с public-методами (CGLIB не может переопределить private), поэтому @Transactional на private-методе молча игнорируется. Метод нужно сделать public и вызывать снаружи."
 },
 {
  "id": "bug2-readonly-write",
  "t": "Spring",
  "correct": 0,
  "code": "@Service\npublic class ProfileService {\n    @Transactional(readOnly = true)\n    public Profile loadAndTouch(Long id) {\n        Profile p = repo.findById(id).orElseThrow();\n        p.setLastSeen(Instant.now()); // <-- ?\n        return p;\n    }\n}",
  "options": [
   "readOnly=true оптимизирует чтение, но изменение managed-сущности молча не сохранится при flush — изменения lastSeen потеряются",
   "findById вне отдельной транзакции вернёт detached-сущность, setLastSeen бросит LazyInitializationException",
   "readOnly=true откатит транзакцию при попытке изменить сущность — будет UnsupportedOperationException",
   "Всё корректно: readOnly влияет только на уровень изоляции, запись lastSeen пройдёт нормально"
  ],
  "why": "При readOnly=true Hibernate ставит FlushMode.MANUAL, поэтому грязные изменения managed-сущности не флашатся и UPDATE не выполняется — изменения теряются без ошибки. Для записи нужна обычная (не readOnly) транзакция."
 },
 {
  "id": "bug2-prototype-in-singleton",
  "t": "Spring",
  "correct": 1,
  "code": "@Component @Scope(\"prototype\")\npublic class RequestContext { /* per-request state */ }\n\n@Service\npublic class Handler {\n    @Autowired\n    private RequestContext ctx; // <-- ?\n\n    public void handle() {\n        ctx.reset();\n        // ... use ctx\n    }\n}",
  "options": [
   "prototype-бин нельзя автовайрить — Spring бросит NoUniqueBeanDefinitionException на старте",
   "Handler — singleton, поэтому prototype-зависимость инжектится один раз при создании: все запросы делят один и тот же экземпляр ctx",
   "@Scope(\"prototype\") требует proxyMode=TARGET_CLASS, иначе бин вообще не создастся",
   "Всё корректно: при каждом обращении к ctx Spring подставляет новый prototype-экземпляр"
  ],
  "why": "Prototype-зависимость в singleton резолвится один раз при инъекции, поэтому фактически становится синглтоном и шарится между потоками. Нужен scoped-proxy (proxyMode=TARGET_CLASS), ObjectProvider или lookup-method."
 },
 {
  "id": "bug2-catch-swallows-rollback",
  "t": "Spring",
  "correct": 0,
  "code": "@Service\npublic class TransferService {\n    @Transactional\n    public void transfer(Account from, Account to, BigDecimal sum) {\n        debit(from, sum);\n        try {\n            creditExternal(to, sum); // может бросить\n        } catch (Exception e) {\n            log.warn(\"credit failed, continue\", e); // <-- ?\n        }\n    }\n}",
  "options": [
   "Ловля исключения и продолжение оставит дебет без кредита, но транзакция всё равно закоммитится — деньги списаны, а зачисление не выполнено",
   "После пойманного RuntimeException транзакция уже помечена rollback-only, поэтому коммит на выходе бросит UnexpectedRollbackException",
   "debit и creditExternal в одной транзакции автоматически откатятся вместе при любом исключении внутри метода",
   "Всё корректно: catch обрабатывает ошибку, транзакция коммитится с консистентным состоянием"
  ],
  "why": "Проглатывание исключения отменяет откат: дебет коммитится, а кредит — нет, состояние неконсистентно. Либо пробрасывать исключение, либо явно TransactionAspectSupport.currentTransactionStatus().setRollbackOnly()."
 },
 {
  "id": "bug2-mockito-verify-no-interactions",
  "t": "Testing",
  "correct": 0,
  "code": "@Test\nvoid shouldNotSendEmailWhenUserOptedOut() {\n    User user = new User(\"a@b.kz\", /*emailOptIn*/ false);\n    when(repo.findById(1L)).thenReturn(Optional.of(user));\n\n    service.notifyUser(1L);\n\n    verify(emailSender); // <-- ?\n}",
  "options": [
   "verify(emailSender) без последующего вызова метода ничего не проверяет — тест зелёный, даже если письмо отправлено. Нужно verify(emailSender, never()).send(any())",
   "when(repo.findById(1L)) не сработает, потому что Mockito требует eq(1L) для примитивов в long",
   "Тест упадёт с UnnecessaryStubbingException из-за неиспользованного when(...)",
   "Optional.of(user) бросит NPE, нужно Optional.ofNullable"
  ],
  "why": "verify(mock) без вызова метода — это незавершённый verify, он не проверяет отсутствие взаимодействий и проходит всегда. Корректно: verify(emailSender, never()).send(any())."
 },
 {
  "id": "bug2-float-equals-assert",
  "t": "Testing",
  "correct": 1,
  "code": "@Test\nvoid commissionIsCalculatedCorrectly() {\n    double amount = 0.1 + 0.2;\n    double commission = priceService.calcCommission(amount); // returns amount * 1.0\n\n    assertEquals(0.3, commission); // <-- ?\n}",
  "options": [
   "calcCommission должен возвращать BigDecimal, иначе тест не компилируется",
   "assertEquals(0.3, commission) сравнивает double точно: 0.1+0.2 == 0.30000000000000004, тест падает. Нужна перегрузка с delta или BigDecimal",
   "Тест корректен: JUnit 5 по умолчанию сравнивает double с дельтой 1e-9",
   "Литерал 0.3 интерпретируется как float, нужно 0.3d"
  ],
  "why": "0.1+0.2 в double даёт 0.30000000000000004, а assertEquals(double,double) без delta сравнивает точно и падает. Нужно assertEquals(0.3, commission, 1e-9) либо сравнивать BigDecimal через compareTo."
 },
 {
  "id": "bug2-shared-static-state-order",
  "t": "Testing",
  "correct": 2,
  "code": "class CounterTest {\n    static List<String> log = new ArrayList<>(); // <-- ?\n\n    @Test void a() { log.add(\"x\"); assertEquals(1, log.size()); }\n    @Test void b() { log.add(\"y\"); assertEquals(1, log.size()); }\n}",
  "options": [
   "static List не потокобезопасен, тесты упадут из-за гонки при параллельном запуске",
   "Поле должно быть помечено @BeforeEach, иначе не инициализируется",
   "static-поле разделяется между тестами и не сбрасывается: второй выполненный тест видит size()==2 и падает. Состояние зависит от порядка запуска; нужно нестатичное поле или @BeforeEach с пересозданием",
   "JUnit 5 создаёт новый экземпляр класса на каждый тест, поэтому log всегда пуст — оба теста зелёные"
  ],
  "why": "static-поле живёт между тестами и накапливает состояние: какой бы тест ни выполнился вторым, size() станет 2 и assert упадёт — результат зависит от порядка. Чинится нестатичным полем (JUnit5 создаёт новый инстанс на тест) или сбросом в @BeforeEach."
 },
 {
  "id": "bug2-jwt-none-alg",
  "t": "Web",
  "correct": 1,
  "code": "public Claims verify(String token) {\n    return Jwts.parser()\n        .setSigningKey(secretKey)\n        .parseClaimsJws(token)\n        .getBody();\n}\n\npublic String getUserId(String token) {\n    String[] parts = token.split(\"\\\\.\");\n    String payload = new String(Base64.getDecoder().decode(parts[1])); // <-- ?\n    return new ObjectMapper().readValue(payload, Map.class).get(\"sub\").toString();\n}",
  "options": [
   "verify() использует setSigningKey без указания требуемого алгоритма — но это не главная проблема здесь",
   "getUserId() читает sub напрямую из незаверенного payload, минуя verify() — подпись и exp не проверяются, sub можно подделать",
   "Base64.getDecoder() упадёт на JWT, так как JWT использует только стандартный Base64, и это и есть баг",
   "Всё корректно: parts[1] — это payload, а подпись проверяется отдельным вызовом verify() выше"
  ],
  "why": "getUserId парсит payload в обход проверки подписи — атакующий меняет sub и не вызывает verify(). Идентичность нужно брать только из Claims, возвращённых verify(), а не из ручного декода токена."
 },
 {
  "id": "bug2-open-redirect",
  "t": "Web",
  "correct": 2,
  "code": "@GetMapping(\"/login/success\")\npublic void afterLogin(@RequestParam String returnUrl,\n                       HttpServletResponse resp) throws IOException {\n    if (returnUrl != null && returnUrl.startsWith(\"/\")) { // <-- ?\n        resp.sendRedirect(returnUrl);\n    } else {\n        resp.sendRedirect(\"/dashboard\");\n    }\n}",
  "options": [
   "sendRedirect нужно вызывать только после resp.setStatus(302), иначе редирект не сработает",
   "returnUrl не URL-декодируется, поэтому относительный путь сломается на спецсимволах",
   "Проверка startsWith(\"/\") пропускает значения вида //evil.com и /\\evil.com — браузер трактует их как протокол-относительный URL и уходит на чужой домен (open redirect)",
   "Всё корректно: startsWith(\"/\") гарантирует, что редирект всегда останется внутри текущего хоста"
  ],
  "why": "//evil.com и /\\evil.com проходят startsWith(\"/\"), но браузер воспринимает их как абсолютный URL на чужой хост. Нужно валидировать через белый список путей или отвергать значения, начинающиеся с // и /\\."
 },
 {
  "id": "bug2-cors-wildcard-creds",
  "t": "Web",
  "correct": 1,
  "code": "@Override\npublic void addCorsMappings(CorsRegistry registry) {\n    registry.addMapping(\"/api/**\")\n        .allowedOriginPatterns(\"*\") // <-- ?\n        .allowedMethods(\"GET\", \"POST\")\n        .allowedHeaders(\"*\")\n        .allowCredentials(true);\n}",
  "options": [
   "allowedMethods не содержит OPTIONS, поэтому preflight-запросы будут отклонены и CORS не заработает вовсе",
   "allowedOriginPatterns(\"*\") вместе с allowCredentials(true) отражает любой Origin в заголовок и разрешает слать куки — фактически открывает API любому сайту с авторизацией пользователя",
   "allowedHeaders(\"*\") не имеет эффекта при allowCredentials(true) и должен вызывать исключение на старте",
   "Всё корректно: allowedOriginPatterns(\"*\") безопаснее allowedOrigins(\"*\") и полностью совместим с credentials"
  ],
  "why": "allowedOriginPatterns(\"*\") обходит запрет Spring на allowedOrigins(\"*\")+credentials и отражает любой Origin, разрешая кросс-доменные запросы с куками. Нужен явный список доверенных origin-ов."
 },
 {
  "id": "bug2-stacktrace-leak",
  "t": "Web",
  "correct": 2,
  "code": "@ExceptionHandler(Exception.class)\npublic ResponseEntity<Map<String,Object>> handle(Exception ex) {\n    Map<String,Object> body = new HashMap<>();\n    body.put(\"error\", \"INTERNAL\");\n    body.put(\"message\", ex.getMessage()); // <-- ?\n    body.put(\"trace\", Arrays.toString(ex.getStackTrace()));\n    log.error(\"Unhandled\", ex);\n    return ResponseEntity.status(500).body(body);\n}",
  "options": [
   "log.error(\"Unhandled\", ex) логирует исключение дважды и переполнит лог при нагрузке",
   "ResponseEntity.status(500) нужно заменить на HttpStatus.INTERNAL_SERVER_ERROR, иначе код ответа будет 200",
   "Тело ответа отдаёт клиенту ex.getMessage() и полный stacktrace — это раскрывает внутренние классы, SQL и пути, помогая атакующему; наружу должен уходить только generic-текст и trace-id",
   "Всё корректно: отдавать stacktrace в JSON — стандартная практика для отладки в проде"
  ],
  "why": "Возврат getMessage() и stackTrace в HTTP-ответе раскрывает внутренности системы (структуру БД, классы, пути). Клиенту нужно отдавать обезличенное сообщение с correlation-id, а детали писать только в лог."
 },
 {
  "id": "bug2-csrf-disabled-cookie",
  "t": "Web",
  "correct": 2,
  "code": "@Bean\nSecurityFilterChain chain(HttpSecurity http) throws Exception {\n    http.authorizeHttpRequests(a -> a.anyRequest().authenticated())\n        .csrf(csrf -> csrf.disable()) // <-- ?\n        .oauth2Login(Customizer.withDefaults())\n        .sessionManagement(s -> s.sessionCreationPolicy(\n             SessionCreationPolicy.IF_REQUIRED));\n    return http.build();\n}",
  "options": [
   "sessionCreationPolicy.IF_REQUIRED не создаёт сессию заранее, поэтому oauth2Login не сможет сохранить состояние и логин сломается",
   "oauth2Login требует явного указания loginPage, иначе бин не поднимется",
   "csrf().disable() при сессионной cookie-аутентификации (oauth2Login создаёт сессию с JSESSIONID) открывает CSRF: чужой сайт сможет слать аутентифицированные POST от имени юзера",
   "Всё корректно: при использовании OAuth2 CSRF-защита не нужна, так как токены передаются в заголовке Authorization"
  ],
  "why": "oauth2Login работает через сессионную cookie (JSESSIONID), которую браузер шлёт автоматически, поэтому отключённый CSRF делает state-changing запросы уязвимыми. CSRF отключают только для stateless API на Bearer-токенах, а здесь его надо оставить включённым."
 }
];

/* Доп. карточки. window.CARDS_EXTRA. */
window.CARDS_EXTRA = [
 {
  "id": "x-java-pecs-wildcards",
  "t": "Java",
  "s": "collections",
  "q": "Зачем нужны ? extends T и ? super T (PECS)? Почему в List<? extends Number> нельзя добавить элемент?",
  "a": "PECS: Producer Extends, Consumer Super. extends — читаешь из коллекции (отдаёшь), super — кладёшь в неё. В List<? extends Number> компилятор не знает точный тип (List<Integer>? List<Double>?), поэтому add запрещён — кроме null. Читать как Number можно.",
  "d": "<? extends T> — верхняя граница: тип неизвестен, но точно подтип T → безопасно читать как T, нельзя писать. <? super T> — нижняя граница: можно класть T и его подтипы, читать только как Object. Пример: Collections.copy(dest, src) — dest это super, src это extends.",
  "code": "void copy(List<? super Integer> dst, List<? extends Integer> src){\n  for (Integer i : src)   // extends → читаем\n    dst.add(i);           // super   → пишем\n}\n// List<? extends Number> n = List.of(1,2);\n// n.add(3);  // НЕ компилируется"
 },
 {
  "id": "x-java-comparable-comparator",
  "t": "Java",
  "s": "core",
  "q": "Comparable vs Comparator — в чём разница и когда что? Чем опасен compareTo через вычитание (a - b)?",
  "a": "Comparable — «естественный» порядок внутри класса (один compareTo). Comparator — внешний порядок, можно много разных, не трогая класс. a-b опасно: при больших int переполнение даёт неверный знак → ломается сортировка. Используй Integer.compare(a,b).",
  "d": "Класс реализует Comparable, чтобы сортироваться «по умолчанию» (TreeSet, Collections.sort). Comparator передаётся снаружи: comparing(...).thenComparing(...).reversed(). Контракт: compareTo должен быть консистентен с equals, иначе TreeMap/TreeSet «теряют» элементы.",
  "code": "// плохо: int overflow\nreturn a.age - b.age;\n// хорошо\nreturn Integer.compare(a.age, b.age);\n\nlist.sort(Comparator.comparing(User::name)\n          .thenComparingInt(User::age).reversed());"
 },
 {
  "id": "x-java-string-immutable-builder",
  "t": "Java",
  "s": "core",
  "q": "Почему String неизменяемый и зачем тогда StringBuilder? Что плохого в склейке строк в цикле через +?",
  "a": "String immutable: пул, потокобезопасность, безопасный ключ HashMap, кэш hashCode. Но s + x в цикле каждый раз создаёт новый объект → O(n²) и мусор. StringBuilder копит в одном изменяемом буфере → O(n). Один s+x вне цикла компилятор сам оптимизирует.",
  "d": "Каждая «модификация» String возвращает новый объект, старый — мусор. В цикле это квадрат по копированию символов. StringBuilder — изменяемый char[] с амортизированным ростом (не потокобезопасен; StringBuffer — synchronized, медленнее, почти не нужен).",
  "code": "// O(n^2): n новых String\nString r = \"\";\nfor (String w : words) r += w;\n\n// O(n): один буфер\nStringBuilder sb = new StringBuilder();\nfor (String w : words) sb.append(w);\nString r = sb.toString();"
 },
 {
  "id": "x-java-stream-collectors-vs-reduce",
  "t": "Java",
  "s": "streams",
  "q": "Почему toList()/collect — мутабельная редукция, а reduce должен быть «чистым»? Почему reduce с new ArrayList опасен в parallel?",
  "a": "collect делает мутабельную редукцию: у каждого потока свой контейнер, потом combiner их сливает — безопасно. reduce требует ассоциативную функцию без побочек на общем состоянии. Если в reduce мутировать общий ArrayList — гонка в parallelStream и потеря данных.",
  "d": "Identity в reduce должен быть нейтральным (x op identity == x), а аккумулятор — ассоциативным, иначе parallel даст разный результат. Для сборки в коллекцию всегда collect(Collectors.toList()/toMap()), а не reduce: collect спроектирован под потокобезопасное слияние частей.",
  "code": "// ОПАСНО в parallel: общий список\nstream.reduce(new ArrayList<>(),\n  (l,e)->{ l.add(e); return l; }, (a,b)->a);\n\n// верно\nList<E> r = stream.collect(Collectors.toList());"
 },
 {
  "id": "x-jvm-generations",
  "t": "JVM",
  "s": "gc",
  "q": "Что такое поколения в heap (Young/Old) и почему сборка работает быстрее благодаря им?",
  "a": "Heap делят на Young (Eden+2 Survivor) и Old. Почти все объекты умирают молодыми («weak generational hypothesis»). Minor GC чистит только Young — быстро. Выжившие копятся, после N переживаний переходят в Old. Old чистит редкий и дорогой Major/Full GC.",
  "d": "Объект рождается в Eden. Minor GC копирует живых в Survivor (S0/S1, схема copying — выжившие переезжают, мёртвые просто не копируются, фрагментации нет). Счётчик возраста растёт; при достижении MaxTenuringThreshold (по умолч. до 15) объект «промотируется» (tenuring) в Old. Идея: разделять по возрасту, чтобы не сканировать весь heap каждый раз. Большие объекты (humongous в G1) могут идти в Old сразу. У G1 поколения логические — это наборы регионов, а не сплошные зоны.",
  "code": "// объект -> Eden\nbyte[] tmp = new byte[1024];\n// переживёт несколько Minor GC -> Survivor -> Old\nstatic final byte[] LONG_LIVED = new byte[1<<20];"
 },
 {
  "id": "x-jvm-references",
  "t": "JVM",
  "s": "memory",
  "q": "Strong / Soft / Weak / Phantom references — в чём разница и зачем нужны не-strong ссылки?",
  "a": "Strong (обычная) — пока есть, объект жив. Soft — GC соберёт только при нехватке памяти (кэш). Weak — соберёт при первом же GC, если нет strong (WeakHashMap). Phantom — для контроля момента финализации/очистки ресурсов вместо finalize().",
  "d": "Достижимость по сильнейшей ссылке решает судьбу объекта. SoftReference хорош для memory-sensitive кэшей: JVM держит, пока хватает heap, и сбрасывает перед OOM. WeakReference — для канонизирующих мапов и метаданных, привязанных к объекту (WeakHashMap чистит entry, когда ключ умер). PhantomReference нельзя get() (всегда null) — её ставят в ReferenceQueue ПОСЛЕ того как объект уже недостижим, чтобы безопасно освободить нативные ресурсы (замена ненадёжному finalize/Cleaner). Все три не-strong можно регистрировать в ReferenceQueue.",
  "code": "ReferenceQueue<Conn> q = new ReferenceQueue<>();\nWeakReference<Conn> w = new WeakReference<>(conn, q);\n// conn недостижим -> w.get()==null, w попадёт в q"
 },
 {
  "id": "x-jvm-tlab-escape",
  "t": "JVM",
  "s": "memory",
  "q": "Что такое TLAB и escape analysis — как JIT может вообще не выделять объект в heap?",
  "a": "TLAB — кусок Eden, личный для потока: аллокация = сдвиг указателя, без блокировок. Escape analysis — JIT смотрит, «убегает» ли объект из метода; если нет, может разложить его на поля в регистрах/стеке (scalar replacement) и new вовсе не попадёт в heap.",
  "d": "TLAB (Thread-Local Allocation Buffer) убирает contention: каждый поток льёт новые объекты в свой буфер указателем bump-the-pointer, синхронизация нужна лишь когда буфер кончился. Escape analysis — анализ времени компиляции C2/JIT: NoEscape → объект локален → scalar replacement (поля живут как обычные локальные переменные, GC о нём не знает); также включает lock elision (снятие ненужной синхронизации). Важная оговорка: это оптимизация JIT, она не гарантирована и работает после прогрева; в интерпретаторе объект всё равно в heap. Поэтому «объект на стеке» — следствие scalar replacement, а не отдельная сущность языка.",
  "code": "int len() {\n  StringBuilder sb = new StringBuilder(); // не убегает\n  sb.append(\"hi\");\n  return sb.length(); // JIT: new может исчезнуть\n}"
 },
 {
  "id": "x-jvm-oom-types",
  "t": "JVM",
  "s": "memory",
  "q": "Какие бывают OutOfMemoryError и как их различать (Java heap space, Metaspace, GC overhead, direct buffer)?",
  "a": "«Java heap space» — не хватило heap (мало -Xmx или утечка). «Metaspace» — слишком много загруженных классов. «GC overhead limit exceeded» — GC крутится >98% времени, освобождая <2%. «Direct buffer memory» — исчерпан off-heap под ByteBuffer/Netty.",
  "d": "OOME — это Error, не Exception: ловить и продолжать обычно нельзя. Различать по тексту в сообщении: heap space → снять heap dump (-XX:+HeapDumpOnOutOfMemoryError) и смотреть в Eclipse MAT доминаторы/retained size; Metaspace → утечка класслоадеров (частый redeploy, динамическая генерация прокси/классов); GC overhead → симптом близкого heap-OOM, heap почти полон; «unable to create native thread» → лимит ОС/слишком много потоков, не heap; direct buffer memory → off-heap (-XX:MaxDirectMemorySize), DirectByteBuffer освобождается только при GC своей обёртки. Лечение: сначала найти причину дампом, а не просто поднимать -Xmx.",
  "code": "// включить дамп при падении\n// -XX:+HeapDumpOnOutOfMemoryError\n// -XX:HeapDumpPath=/tmp/dump.hprof\nList<byte[]> leak = new ArrayList<>();\nwhile (true) leak.add(new byte[10_000_000]);"
 },
 {
  "id": "x-co-pinning-vthreads",
  "t": "Concurrency",
  "s": "vthreads",
  "q": "Что такое pinning виртуального потока и почему synchronized его ломает?",
  "a": "Виртуальный поток обычно отцепляется от платформенного (carrier), когда блокируется на IO. Но внутри synchronized он застревает (pinned): не может отцепиться и держит carrier занятым. Много таких — и пул несущих потоков голодает, выгода vthreads исчезает.",
  "d": "В Java 21 pinning случался на synchronized и в native-вызовах. С JDK 24 (JEP 491) synchronized больше не пиннит — vthread отцепляется и внутри монитора. Но до JDK 24 фикс: меняй synchronized на ReentrantLock вокруг blocking-IO. Диагностика: -Djdk.tracePinnedThreads=full.",
  "code": "// плохо до JDK 24: pinning на время IO\nsynchronized (lock) {\n    httpClient.send(req);   // carrier занят, vthread не отцепится\n}\n// лучше: ReentrantLock не пиннит\nlock.lock();\ntry { httpClient.send(req); }\nfinally { lock.unlock(); }"
 },
 {
  "id": "x-co-double-checked-locking",
  "t": "Concurrency",
  "s": "memory",
  "q": "Почему double-checked locking без volatile сломан, а с volatile работает?",
  "a": "Без volatile другой поток может увидеть НЕ-null ссылку на объект, который ещё не дописан (конструктор переупорядочен). Получит полу-собранный объект. volatile добавляет happens-before: запись полей конструктора видна раньше, чем публикация ссылки.",
  "d": "JIT/CPU вправе переставить 'выделить память' и 'записать поля' местами относительно публикации ссылки. volatile-запись ставит барьер: всё, что до неё, видно тому, кто прочитал volatile. На практике проще: holder-idiom (static nested class) или enum-синглтон — оба потокобезопасны без явного volatile.",
  "code": "class Lazy {\n  private static volatile Config c;   // volatile обязателен!\n  static Config get() {\n    if (c == null) {                  // 1-я проверка без лока\n      synchronized (Lazy.class) {\n        if (c == null) c = new Config(); // 2-я под локом\n      }\n    }\n    return c;\n  }\n}"
 },
 {
  "id": "x-co-false-sharing",
  "t": "Concurrency",
  "s": "memory",
  "q": "Что такое false sharing и почему два независимых счётчика тормозят?",
  "a": "CPU тащит память в кэш строками по ~64 байта. Если два потока пишут в РАЗНЫЕ переменные, но лежащие в одной кэш-строке, ядра постоянно инвалидируют кэш друг другу. Логически конфликта нет, а скорость падает в разы — 'ложное' разделение.",
  "d": "Лечится паддингом, чтобы горячие поля жили в разных строках. В Java 8+ есть @Contended (jdk.internal.vm.annotation, нужен -XX:-RestrictContended). Классический пример — LongAdder специально разносит ячейки по строкам, поэтому масштабируется лучше AtomicLong при высокой контеншн-записи.",
  "code": "@jdk.internal.vm.annotation.Contended // разнести по кэш-строкам\nstatic class Cell { volatile long value; }\n\n// без паддинга два Cell в одной 64-байт строке\n// → ядра дерутся за строку (ping-pong кэша)"
 },
 {
  "id": "x-co-completablefuture-compose",
  "t": "Concurrency",
  "s": "basics",
  "q": "Зачем CompletableFuture и чем thenCompose отличается от thenApply?",
  "a": "CompletableFuture связывает асинхронные шаги без блокировки потока. thenApply берёт результат и трансформирует (T→U). thenCompose берёт результат и возвращает НОВЫЙ future (T→CF<U>) — для цепочки асинхронных вызовов, иначе получишь вложенный CF<CF<U>>.",
  "d": "thenApply = map, thenCompose = flatMap. По умолчанию then* выполняются в том же потоке, что завершил предыдущий шаг (или ForkJoinPool.commonPool для *Async). Под нагрузкой давай свой executor в thenApplyAsync(fn, pool). Ошибки лови через exceptionally/handle, иначе они проглотятся.",
  "code": "// thenApply: синхронная трансформация\nCompletableFuture<Long> id = findUser(name).thenApply(User::id);\n\n// thenCompose: следующий шаг тоже асинхронный\nCompletableFuture<Order> o =\n    findUser(name)                 // CF<User>\n      .thenCompose(u -> loadOrder(u))  // CF<Order>, не CF<CF<Order>>\n      .exceptionally(e -> Order.empty());"
 },
 {
  "id": "x-sp-bean-lifecycle",
  "t": "Spring",
  "s": "di",
  "q": "Что происходит с бином между «new» и «готов к работе»? Зачем нужны BeanPostProcessor'ы?",
  "a": "Spring создаёт объект, впрыскивает зависимости, потом гоняет его через цепочку BeanPostProcessor'ов: до init и после. Именно «после» подменяет бин на прокси (@Transactional, @Async). Затем @PostConstruct/init. Без BPP не было бы AOP-магии.",
  "d": "Полный порядок: instantiate → populate (DI) → Aware-интерфейсы → postProcessBeforeInitialization → @PostConstruct/afterPropertiesSet/init-method → postProcessAfterInitialization (тут AutoProxyCreator оборачивает в прокси) → бин в контейнере. На shutdown: @PreDestroy/destroy. Важно: внутри @PostConstruct бин — это ещё ОРИГИНАЛ, а наружу контейнер отдаёт уже ПРОКСИ, поэтому self-invocation в @PostConstruct тоже не проксируется.",
  "code": "class TxBPP implements BeanPostProcessor {\n  public Object postProcessAfterInitialization(Object bean, String name){\n    if (hasTx(bean)) return wrapInProxy(bean); // <- здесь рождается прокси\n    return bean;\n  }\n}\n// @PostConstruct видит сырой объект, контейнер хранит прокси"
 },
 {
  "id": "x-sp-qualifier-primary",
  "t": "Spring",
  "s": "di",
  "q": "Два бина одного типа — Spring падает с NoUniqueBeanDefinition. Как разрулить: @Primary, @Qualifier, имя параметра?",
  "a": "@Primary — «бери этого по умолчанию». @Qualifier(\"name\") — «бери именно этого, явно». Имя параметра тоже работает как qualifier. Приоритет: @Qualifier > @Primary > имя параметра. Если ничего — NoUniqueBeanDefinitionException на старте.",
  "d": "@Primary глобален и опасен: легко забыть, что где-то он молча перехватил инъекцию. @Qualifier локален и явен — предпочтительнее в больших проектах. Можно сделать свою аннотацию-квалификатор через @Qualifier-мета. Для коллекций (List<Payment>) Spring впрыснет ВСЕ бины типа — это легальный способ собрать стратегии. Map<String,Payment> даст имя-бина → бин.",
  "code": "@Primary @Component class CardPayment implements Payment {}\n@Component(\"cash\") class CashPayment implements Payment {}\n\n// по умолчанию прилетит CardPayment:\n@Autowired Payment p;\n// явно cash:\n@Autowired @Qualifier(\"cash\") Payment cash;\n// все стратегии разом:\n@Autowired List<Payment> all;"
 },
 {
  "id": "x-sp-isolation",
  "t": "Spring",
  "s": "tx",
  "q": "Уровни изоляции транзакции: что такое dirty read, non-repeatable, phantom — и при чём тут READ_COMMITTED?",
  "a": "Изоляция = насколько твоя транзакция видит грязь соседей. READ_UNCOMMITTED видит даже неподтверждённое (dirty). READ_COMMITTED — только закоммиченное. REPEATABLE_READ — строка не меняется в рамках tx. SERIALIZABLE — как будто транзакции по очереди.",
  "d": "Три аномалии по нарастающей: dirty read (видишь чужой откатываемый апдейт) → non-repeatable read (перечитал строку — а она изменилась) → phantom read (повторил тот же SELECT — появились новые строки). Каждый уровень глушит свою порцию: READ_COMMITTED убирает dirty, REPEATABLE_READ — non-repeatable, SERIALIZABLE — phantom. Цена — больше блокировок и меньше параллелизма. Дефолт Postgres = READ_COMMITTED, Oracle тоже; MySQL InnoDB = REPEATABLE_READ. @Transactional(isolation=...) переопределяет.",
  "code": "@Transactional(isolation = Isolation.REPEATABLE_READ)\npublic void transfer(Long from, Long to, BigDecimal sum) {\n  var a = repo.findById(from); // прочитали баланс\n  // ... соседняя tx меняет from ...\n  var aAgain = repo.findById(from); // тот же баланс — non-repeatable read закрыт\n}"
 },
 {
  "id": "x-sp-optimistic-lock",
  "t": "Spring",
  "s": "data",
  "q": "Два юзера одновременно правят одну запись. Как @Version защищает от потери апдейта (lost update)?",
  "a": "@Version-поле растёт при каждом UPDATE. Hibernate шлёт UPDATE ... WHERE id=? AND version=?. Если кто-то успел сохранить раньше — version не совпала, обновилось 0 строк → OptimisticLockException. Никаких блокировок в БД, конфликт ловим по факту.",
  "d": "Оптимистичная блокировка = «верим, что конфликтов мало, проверим на коммите». Дёшево, не держит локи, идеальна для веба с долгими «думами» юзера. Пессимистичная (SELECT ... FOR UPDATE / @Lock(PESSIMISTIC_WRITE)) — наоборот, лочит строку сразу, дороже, но без ретраев. На OptimisticLockException обычно делают retry или показывают «данные устарели, обновите». @Version бывает int/long или timestamp.",
  "code": "@Entity class Account {\n  @Id Long id;\n  @Version Long version; // Hibernate ведёт сам\n  BigDecimal balance;\n}\n// UPDATE account SET balance=?, version=version+1\n//   WHERE id=? AND version=?   -- 0 строк => конфликт"
 },
 {
  "id": "x-db-deadlock",
  "t": "DB",
  "s": "tx",
  "q": "Что такое deadlock в БД и почему два UPDATE могут «повиснуть» навсегда?",
  "a": "Транзакция A залочила строку 1 и ждёт строку 2. Транзакция B залочила строку 2 и ждёт строку 1. Оба ждут друг друга вечно. Postgres это замечает и убивает одну транзакцию с ошибкой deadlock detected. Лечится: всегда бери блокировки в ОДНОМ порядке (например по возрастанию id).",
  "d": "Deadlock — это цикл ожидания: A→B и B→A. Postgres периодически (deadlock_timeout, дефолт 1с) запускает детектор, находит цикл и откатывает одну «жертву». Это не баг БД, а логическая ошибка приложения: разный порядок блокировок. Профилактика — детерминированный порядок захвата строк/таблиц и короткие транзакции. Ретрай откаченной транзакции тоже норм.",
  "code": "// ПЛОХО: разный порядок → deadlock\n// tx A: UPDATE acc WHERE id=1; UPDATE acc WHERE id=2;\n// tx B: UPDATE acc WHERE id=2; UPDATE acc WHERE id=1;\n\n// ХОРОШО: всегда по возрастанию id\nlong lo = Math.min(from, to), hi = Math.max(from, to);\n// лочим сначала lo, потом hi — в обеих транзакциях\n// SELECT ... WHERE id=? FOR UPDATE  (lo), затем (hi)"
 },
 {
  "id": "x-db-n-plus-one",
  "t": "DB",
  "s": "antipattern",
  "q": "Что такое проблема N+1 запросов и откуда она берётся в ORM?",
  "a": "Достал список из 100 заказов одним запросом, а потом в цикле для каждого дёргаешь клиента отдельным запросом — это 1+100 = 101 поход в БД вместо 2. Каждый запрос = сетевой round-trip, поэтому жутко медленно. Лечится JOIN-ом / fetch join / батч-загрузкой по списку id.",
  "d": "Классика ленивой загрузки (lazy) в JPA/Hibernate: коллекция или @ManyToOne подгружается отдельным SELECT при первом обращении. В цикле это превращается в шторм мелких запросов. Чинят: JOIN FETCH, EntityGraph, @BatchSize, либо ручной запрос с IN (...). Симптом в логах — сотни почти одинаковых SELECT, отличающихся только id.",
  "code": "// N+1: для каждого order — отдельный SELECT client\nfor (Order o : orders) {\n  System.out.println(o.getClient().getName()); // лишний запрос!\n}\n\n// FIX: одним запросом с JOIN FETCH\nem.createQuery(\n  \"select o from Order o join fetch o.client\", Order.class)\n  .getResultList();"
 },
 {
  "id": "x-db-for-update",
  "t": "DB",
  "s": "tx",
  "q": "Зачем нужен SELECT ... FOR UPDATE и чем он отличается от обычного SELECT?",
  "a": "Обычный SELECT ничего не блокирует — двое могут прочитать остаток 100 и оба списать. FOR UPDATE ставит блокировку на прочитанные строки: второй ждёт, пока первый закоммитит. Так делают «прочитал → проверил → списал» атомарно (пессимистичная блокировка). Только внутри транзакции.",
  "d": "FOR UPDATE — это явная row-level блокировка на чтении. Пока транзакция держит её, другие FOR UPDATE/UPDATE этой строки ждут (обычные SELECT — нет, MVCC). Варианты: FOR UPDATE SKIP LOCKED (для очередей — пропустить занятые), FOR UPDATE NOWAIT (упасть сразу, не ждать). Защищает от lost update без версии-колонки, ценой сериализации горячих строк.",
  "code": "// Атомарное списание остатка\nem.getTransaction().begin();\nAccount a = em.createQuery(\n  \"select a from Account a where a.id=:id\", Account.class)\n  .setParameter(\"id\", id)\n  .setLockMode(LockModeType.PESSIMISTIC_WRITE) // FOR UPDATE\n  .getSingleResult();\nif (a.getBalance() >= sum) a.debit(sum);\nem.getTransaction().commit(); // блокировка снимается тут"
 },
 {
  "id": "x-db-sql-injection",
  "t": "DB",
  "s": "access",
  "q": "Что такое SQL-инъекция и почему PreparedStatement её убивает?",
  "a": "Если склеить SQL строкой с пользовательским вводом, злоумышленник подсунет ' OR '1'='1 и достанет/снесёт чужие данные. PreparedStatement шлёт текст запроса и параметры ОТДЕЛЬНО — драйвер никогда не путает данные с кодом. Никогда не конкатенируй ввод в SQL.",
  "d": "Корень дыры — смешивание кода и данных в одной строке. Параметризованный запрос (PreparedStatement / :named-параметры) передаёт ? как плейсхолдеры, а значения — по протоколу отдельно; они не парсятся как SQL. Бонус: план запроса кешируется. Ввод нельзя «экранировать руками» — это ненадёжно; параметризация — единственный правильный способ.",
  "code": "// ДЫРА: ввод склеен в SQL\nStatement st = conn.createStatement();\nst.execute(\"SELECT * FROM users WHERE name='\" + name + \"'\");\n// name = \"x' OR '1'='1\"  → выдаст всех\n\n// БЕЗОПАСНО: параметр отдельно\nPreparedStatement ps = conn.prepareStatement(\n  \"SELECT * FROM users WHERE name = ?\");\nps.setString(1, name); // драйвер не спутает с кодом\nps.executeQuery();"
 },
 {
  "id": "x-ds-consumer-lag",
  "t": "Distributed",
  "s": "kafka",
  "q": "Что такое consumer lag и почему за ним надо следить?",
  "a": "Lag = разница между последним offset в партиции и offset, который консьюмер уже обработал. Растущий lag значит: консьюмеры не успевают за продюсерами, очередь копится, данные «опаздывают». Это главная метрика здоровья пайплайна.",
  "d": "Lag растёт по причинам: медленный обработчик, мало консьюмеров в группе (партиций больше, чем инстансов), застрявший консьюмер (poll() не вызывается > max.poll.interval.ms → ребаланс). Лечат: больше партиций+инстансов, батч-обработка, вынос тяжёлой работы из цикла poll. Мониторят через kafka-consumer-groups --describe или Burrow/Prometheus (kafka_consumergroup_lag). Важно: lag сам по себе не баг — спайки норма, опасен устойчиво растущий тренд.",
  "code": "// kafka-consumer-groups.sh --bootstrap-server host:9092 \\\n//   --describe --group my-group\n// TOPIC  PART  CURRENT-OFFSET  LOG-END-OFFSET  LAG\n// orders 0     1500            1820            320  <-- отстаём на 320"
 },
 {
  "id": "x-ds-rebalance",
  "t": "Distributed",
  "s": "kafka",
  "q": "Что такое ребаланс в consumer group и чем он опасен?",
  "a": "Ребаланс — пересдача партиций между консьюмерами группы, когда инстанс пришёл/упал/завис. Во время него вся группа на паузе (stop-the-world), обработка стоит. Частые ребалансы = пайплайн постоянно замирает.",
  "d": "Триггеры: добавление/удаление инстанса, превышение max.poll.interval.ms (тяжёлая работа в цикле), потеря heartbeat (session.timeout.ms). Боль: при classic стратегии — eager rebalance, все отдают все партиции (полный стоп). Лечение: CooperativeStickyAssignor (incremental, отдают только часть), static membership (group.instance.id — рестарт пода не вызывает ребаланс), вынос тяжёлой обработки из poll-цикла, корректный commit перед отдачей партиции через ConsumerRebalanceListener.",
  "code": "props.put(PARTITION_ASSIGNMENT_STRATEGY_CONFIG,\n    CooperativeStickyAssignor.class.getName());\nprops.put(GROUP_INSTANCE_ID_CONFIG, \"worker-1\"); // static membership"
 },
 {
  "id": "x-ds-saga",
  "t": "Distributed",
  "s": "pattern",
  "q": "Зачем нужна Saga вместо распределённой транзакции между сервисами?",
  "a": "У микросервисов нет общей БД, значит нет единого ACID-коммита на всех. Saga — цепочка локальных транзакций: каждый сервис коммитит у себя, а откат делается компенсирующими действиями (не rollback, а «обратное» действие), а не двухфазным коммитом.",
  "d": "2PC (XA) плох в распределёнке: блокирует ресурсы, координатор — single point of failure, плохо масштабируется. Saga даёт eventual consistency. Два стиля: choreography (сервисы реагируют на события друг друга — просто, но логика размазана) и orchestration (центральный оркестратор/Zeebe рулит шагами — виднее, но появляется координатор). Компенсация ≠ undo: деньги уже ушли → компенсация это «возврат», а не «как будто не было». Промежуточные состояния видимы — нужны semantic locks или статусы PENDING.",
  "code": "// orchestration: оркестратор ведёт шаги\nreserveStock();        // ok\ntry { charisePayment(); }\ncatch (Exception e) {\n    releaseStock();    // компенсация предыдущего шага\n}"
 },
 {
  "id": "x-ds-idempotency-key",
  "t": "Distributed",
  "s": "pattern",
  "q": "Как сделать REST-эндпоинт безопасным к повторам (idempotency key)?",
  "a": "Клиент шлёт уникальный Idempotency-Key в заголовке. Сервер на первом запросе выполняет и сохраняет результат под этим ключом. На повторе с тем же ключом — отдаёт сохранённый ответ, не выполняя действие второй раз. Защита от ретраев и двойных кликов.",
  "d": "Зачем: сеть ненадёжна, клиент ретраит, при at-least-once можно дважды списать деньги/создать заказ. Ключ генерит клиент (UUID на «операцию», не на ретрай). Сервер: UNIQUE constraint на idempotency_key + сохранение тела ответа. Гонку двух одновременных запросов с одним ключом ловят через INSERT с уникальным индексом (второй падает на конфликте) или SELECT FOR UPDATE. Это уровень приложения — отличается от Kafka idempotent producer (тот про дубли внутри брокера).",
  "code": "@POST\npublic Response create(@HeaderParam(\"Idempotency-Key\") String key, Body b) {\n    var saved = repo.findByKey(key);\n    if (saved != null) return Response.ok(saved.response).build();\n    var res = process(b);\n    repo.save(key, res); // UNIQUE(key) ловит гонку\n    return Response.ok(res).build();\n}"
 },
 {
  "id": "x-de-observer",
  "t": "Design",
  "s": "patterns",
  "q": "Паттерн Observer — что решает и где в Java он уже встроен?",
  "a": "Один объект (Subject) держит список подписчиков и при изменении сам всех уведомляет — им не надо опрашивать его в цикле. Слабая связь: Subject не знает, кто слушает, только интерфейс. Это основа event-driven и pub/sub.",
  "d": "В Java: java.util.Observer устарел (deprecated с 9), вместо него — слушатели (Listener), PropertyChangeListener, Flow.Publisher/Subscriber (Reactive Streams, JDK 9+), Spring ApplicationEvent. Минусы: утечки памяти если не отписался, неочевидный порядок и каскад уведомлений, сложность отладки.",
  "code": "interface Observer { void update(String e); }\nclass Subject {\n  private final List<Observer> obs = new ArrayList<>();\n  public void subscribe(Observer o){ obs.add(o); }\n  public void fire(String e){ obs.forEach(o -> o.update(e)); }\n}"
 },
 {
  "id": "x-de-decorator",
  "t": "Design",
  "s": "patterns",
  "q": "Паттерн Decorator — зачем, чем отличается от наследования?",
  "a": "Оборачиваешь объект в другой объект того же интерфейса и добавляешь поведение, не трогая исходный класс. Можно навешивать слои динамически в любом порядке — вместо взрыва подклассов на каждую комбинацию фич.",
  "d": "Decorator реализует тот же интерфейс, что и обёртываемый объект, и делегирует ему вызовы, добавляя своё до/после. Классика в JDK — java.io: new BufferedReader(new InputStreamReader(new FileInputStream(f))). В отличие от наследования (фиксируется при компиляции) — комбинируется в рантайме.",
  "code": "interface Coffee { int cost(); }\nclass Base implements Coffee { public int cost(){ return 100; } }\nclass Milk implements Coffee {\n  private final Coffee c;\n  Milk(Coffee c){ this.c = c; }\n  public int cost(){ return c.cost() + 30; }\n}\n// new Milk(new Milk(new Base())) = 160"
 },
 {
  "id": "x-de-dip-vs-di",
  "t": "Design",
  "s": "patterns",
  "q": "Dependency Injection vs Inversion of Control — это одно и то же?",
  "a": "Нет. IoC — общий принцип: управление потоком отдаёшь фреймворку («не ты зовёшь его, а он тебя»). DI — частный приём IoC: зависимости не создаёшь сам внутри класса, а получаешь снаружи (через конструктор). Так класс не привязан к конкретным реализациям.",
  "d": "DI ≠ DIP. DIP (буква D в SOLID) — про зависимость от абстракций, это правило дизайна. DI — техника доставки этих зависимостей. Виды: constructor (предпочтительно — обязательные deps, immutable, легко тестировать), setter, field (@Inject/@Autowired в поле — плохо для тестов). Контейнер (Spring/CDI/Quarkus) — лишь удобный способ DI, можно и руками.",
  "code": "// Плохо: жёсткая зависимость\nclass Order { private final Repo r = new MysqlRepo(); }\n// Хорошо: DI через конструктор\nclass Order {\n  private final Repo r;\n  Order(Repo r){ this.r = r; } // подставим любой Repo\n}"
 },
 {
  "id": "x-de-law-of-demeter",
  "t": "Design",
  "s": "oop",
  "q": "Закон Деметры (Law of Demeter) — что это и зачем?",
  "a": "Правило «не разговаривай с незнакомцами»: метод должен звать только методы своего объекта, его полей, аргументов и того, что сам создал — но не лезть вглубь чужих объектов через цепочки a.getB().getC().doX(). Это снижает связанность.",
  "d": "Длинные цепочки геттеров (train wreck) делают код хрупким: меняется внутренняя структура B или C — ломается вызывающий. Лечение: добавить методы на верхнем объекте (Tell, Don't Ask). Важно: fluent-builders и Stream API — НЕ нарушение, там цепочка возвращает тот же/однотипный объект, а не раскрывает чужие внутренности.",
  "code": "// Нарушение: лезем сквозь объекты\nint zip = order.getCustomer().getAddress().getZip();\n// Лучше: спрашиваем у ближайшего соседа\nint zip = order.getCustomerZip();"
 },
 {
  "id": "x-inf-kafka-consumer-group",
  "t": "Infra",
  "s": "messaging",
  "q": "Что такое consumer group в Kafka и как делятся партиции между консьюмерами?",
  "a": "Группа консьюмеров с общим group.id делит партиции топика между собой: каждую партицию читает РОВНО один консьюмер в группе. Так масштабируешь чтение. Если консьюмеров больше, чем партиций — лишние простаивают. Каждая группа независимо хранит свой offset.",
  "d": "Партиция — единица параллелизма: max полезных консьюмеров = число партиций. При падении/добавлении консьюмера происходит rebalance — партиции переназначаются, чтение коротко замирает. Порядок гарантируется только внутри партиции, а не во всём топике. Несколько групп на один топик = независимые читатели (pub/sub поверх лога).",
  "code": "// 3 партиции, 2 консьюмера одной группы\nprops.put(\"group.id\", \"orders-svc\");\nconsumer.subscribe(List.of(\"spo-pf-orders\"));\n// C1 читает p0,p1; C2 читает p2 — каждую читает один\nwhile (true) {\n  var recs = consumer.poll(Duration.ofMillis(200));\n  for (var r : recs) handle(r); // порядок гарантирован в рамках партиции\n  consumer.commitSync(); // двигаем offset группы\n}"
 },
 {
  "id": "x-inf-es-text-vs-keyword",
  "t": "Infra",
  "s": "search",
  "q": "В чём разница text и keyword в Elasticsearch и почему точный поиск/сортировка ломаются?",
  "a": "text проходит через анализатор: режется на токены, опускается регистр — для полнотекстового поиска. keyword хранится как одна целая строка — для точного match, фильтров, сортировки и агрегаций. Если поле только text — фильтр по точному значению и сортировка работать не будут.",
  "d": "Частая практика — multi-field: одно поле и как text (поиск), и как text.keyword (фильтр/сортировка). Анализатор у text разбивает 'Acme Bank' на ['acme','bank'], поэтому term-запрос по целой строке не найдёт. keyword не анализируется, занимает doc_values для агрегаций. У keyword есть лимит ignore_above для длинных строк.",
  "code": "// маппинг multi-field\n{\n  \"name\": {\n    \"type\": \"text\",            // для full-text search\n    \"fields\": {\n      \"raw\": { \"type\": \"keyword\" } // для term-фильтра, sort, agg\n    }\n  }\n}\n// поиск:   match  -> name\n// фильтр:  term   -> name.raw\n// сортировка по name.raw, не по name"
 },
 {
  "id": "x-inf-redis-persistence",
  "t": "Infra",
  "s": "cache",
  "q": "Redis это in-memory — что будет с данными при перезапуске и как их не потерять (RDB vs AOF)?",
  "a": "По умолчанию Redis держит всё в RAM, при рестарте без persistence данные теряются. RDB — периодические снапшоты (быстрый рестарт, но теряешь последние секунды). AOF — журнал каждой записи (надёжнее, но файл больше и медленнее). Часто включают оба.",
  "d": "RDB форкает процесс и пишет дамп раз в N секунд/изменений — компактно, идеально для бэкапа, но между снапшотами данные не защищены. AOF дописывает команды в лог (fsync настраивается: always/everysec/no), при старте проигрывает их заново. everysec — баланс. Для чистого кэша persistence можно вообще отключить — потеря не страшна."
 },
 {
  "id": "x-inf-container-vs-vm",
  "t": "Infra",
  "s": "containers",
  "q": "Чем контейнер отличается от виртуальной машины и почему он легче?",
  "a": "VM поднимает свою гостевую ОС поверх гипервизора — тяжёлый, грузится минутами. Контейнер шарит ядро хоста и изолируется через namespaces/cgroups — это просто изолированный процесс. Поэтому он весит мегабайты, стартует за секунды, но даёт изоляцию слабее, чем VM.",
  "d": "namespaces дают каждому контейнеру свой вид на PID, сеть, mounts, hostname — кажется, что он один в системе. cgroups лимитируют CPU/RAM. Общее ядро = меньше накладных расходов, но и меньше изоляция: уязвимость ядра общая для всех. VM изолирует на уровне железа (отдельное ядро) — безопаснее, но дороже по ресурсам."
 },
 {
  "id": "x-te-param-tests",
  "t": "Testing",
  "s": "basics",
  "q": "Что такое @ParameterizedTest и зачем он нужен?",
  "a": "Это один тест, который запускается много раз с разными входными данными. Вместо 5 копий метода — один метод и список значений. Каждый набор данных = отдельный запуск со своим результатом (pass/fail).",
  "d": "Источники данных: @ValueSource (примитивы/строки), @CsvSource (несколько колонок прямо в аннотации), @MethodSource (значения из метода — для сложных объектов), @EnumSource. Каждый кейс репортится отдельно, поэтому видно, какой именно вход упал, а не «тест красный». Уменьшает дублирование и заставляет покрыть граничные случаи.",
  "code": "@ParameterizedTest\n@CsvSource({\"2,3,5\", \"0,0,0\", \"-1,1,0\"})\nvoid sum(int a, int b, int exp) {\n    assertEquals(exp, calc.sum(a, b));\n}\n\n@ParameterizedTest\n@MethodSource(\"users\")\nvoid validate(User u, boolean ok) { ... }\nstatic Stream<Arguments> users() {\n    return Stream.of(Arguments.of(new User(\"a\"), true));\n}"
 },
 {
  "id": "x-te-verify-behavior",
  "t": "Testing",
  "s": "basics",
  "q": "Зачем verify(), times(), never() в Mockito — чем это отличается от assert?",
  "a": "assert проверяет РЕЗУЛЬТАТ (что вернулось/изменилось — state). verify проверяет ПОВЕДЕНИЕ — что метод мока вызвали и сколько раз. Нужно, когда у действия нет видимого результата: «письмо отправили», «в Kafka запушили».",
  "d": "Это behavior verification против state verification. verify(repo, times(1)).save(x) — вызвали ровно раз; never() — не вызвали вообще; verifyNoInteractions() — мок не трогали. Опасность: перебор с verify делает тест хрупким (привязка к реализации, а не к контракту). Используй там, где сайд-эффект и есть смысл теста (отправка, запись, публикация события).",
  "code": "service.placeOrder(order);\n\nverify(kafka, times(1)).publish(eq(\"orders\"), any());\nverify(repo).save(order);          // times(1) по умолчанию\nverify(notifier, never()).sendSms(any());\nverifyNoMoreInteractions(kafka);"
 },
 {
  "id": "x-te-spring-slices",
  "t": "Testing",
  "s": "integration",
  "q": "@SpringBootTest vs срезы (@WebMvcTest, @DataJpaTest) — когда что?",
  "a": "@SpringBootTest поднимает ВЕСЬ контекст — медленно, но всё по-настоящему. Срез поднимает только нужный слой: @WebMvcTest — только контроллеры (без БД), @DataJpaTest — только репозитории (+ embedded/Testcontainers БД). Бери срез, если хватает.",
  "d": "Срезы быстрее, т.к. грузят узкий набор бинов; остальное мокаешь через @MockBean. @WebMvcTest идёт с MockMvc и не поднимает сервер. @DataJpaTest по умолчанию откатывает транзакцию после теста и подменяет datasource. @SpringBootTest(webEnvironment=RANDOM_PORT) — для полного e2e через TestRestTemplate/WebTestClient. Правило: чем уже срез, тем быстрее и стабильнее набор тестов.",
  "code": "@WebMvcTest(OrderController.class)\nclass OrderControllerTest {\n  @Autowired MockMvc mvc;\n  @MockBean OrderService service; // слой ниже — мок\n\n  @Test void returns200() throws Exception {\n    mvc.perform(get(\"/orders/1\"))\n       .andExpect(status().isOk());\n  }\n}"
 },
 {
  "id": "x-te-test-fixtures",
  "t": "Testing",
  "s": "basics",
  "q": "Жизненный цикл теста: @BeforeEach/@AfterEach vs @BeforeAll/@AfterAll?",
  "a": "@BeforeEach/@AfterEach бегут ПЕРЕД/ПОСЛЕ каждого теста — свежее состояние, изоляция. @BeforeAll/@AfterAll — один раз на весь класс (метод static), для дорогого общего ресурса. Each — за чистоту, All — за скорость.",
  "d": "По умолчанию JUnit5 создаёт НОВЫЙ экземпляр класса на каждый тест — поля сбрасываются, тесты не делят состояние. Поэтому @BeforeAll обязан быть static (instance ещё нет) — если только не @TestInstance(PER_CLASS). Дорогое (контейнер, пул) — в @BeforeAll; общий мутабельный state между тестами — это путь к flaky. Чистку (закрыть ресурс, откатить) — в @AfterEach/@AfterAll.",
  "code": "@BeforeAll\nstatic void startDb() { container.start(); } // 1 раз\n\n@BeforeEach\nvoid setUp() { repo.deleteAll(); }            // перед каждым\n\n@Test void a() { ... }\n@Test void b() { ... }   // видит чистую БД, не следы a()"
 },
 {
  "id": "x-web-cors-preflight",
  "t": "Web",
  "s": "security",
  "q": "Что такое CORS и зачем браузер шлёт preflight-запрос (OPTIONS)?",
  "a": "CORS — правило браузера: скрипт с сайта A не может читать ответ с домена B, если B сам не разрешил. Перед «непростым» запросом (PUT, кастомные заголовки) браузер шлёт пробный OPTIONS — спрашивает «можно?». Сервер отвечает Access-Control-Allow-* — и только тогда летит настоящий запрос.",
  "d": "CORS защищает не сервер, а пользователя в браузере — curl/Postman его игнорируют. Заголовки ставит СЕРВЕР: Access-Control-Allow-Origin (нельзя * вместе с credentials), -Allow-Methods, -Allow-Headers, -Max-Age (кэш preflight). Простые запросы (GET/POST с form-content-type) идут без preflight. Ошибка CORS ≠ ошибка сервера: запрос дошёл и отработал, браузер просто скрыл ответ от JS.",
  "code": "// Quarkus: application.properties\nquarkus.http.cors=true\nquarkus.http.cors.origins=https://app.acme.com\nquarkus.http.cors.methods=GET,POST,PUT\nquarkus.http.cors.headers=Authorization,Content-Type\n// браузер сам шлёт OPTIONS перед PUT — сервер отвечает Allow-*"
 },
 {
  "id": "x-web-idempotency-key",
  "t": "Web",
  "s": "rest",
  "q": "POST не идемпотентен — как защититься от двойного платежа при ретрае?",
  "a": "Клиент кладёт в запрос уникальный Idempotency-Key (UUID). Сервер при первом запросе выполняет операцию и сохраняет результат под этим ключом. Если тот же ключ прилетел снова (клиент ретраил из-за таймаута) — сервер не делает второй платёж, а возвращает сохранённый ответ.",
  "d": "Это про exactly-once на уровне приложения: сам метод POST остаётся неидемпотентным, идемпотентность даёт КЛЮЧ. Ключ хранят с TTL (например 24ч) в БД/Redis с UNIQUE-констрейнтом. Тонкости: первый запрос ещё в полёте, второй пришёл — нужен лок или статус IN_PROGRESS (вернуть 409). Так делают Stripe, PayPal. Не путать с дедупликацией Kafka — там свой механизм.",
  "code": "@POST @Path(\"/payments\")\nResponse pay(@HeaderParam(\"Idempotency-Key\") String key, PayReq r) {\n  var saved = store.find(key);\n  if (saved != null) return saved.response(); // повтор — отдаём старое\n  var resp = charge(r);                       // делаем платёж 1 раз\n  store.save(key, resp);                       // UNIQUE(key)\n  return resp;\n}"
 },
 {
  "id": "x-web-rate-limit-429",
  "t": "Web",
  "s": "http",
  "q": "Как работает rate limiting и что вернуть, когда лимит превышен?",
  "a": "Сервер считает запросы клиента за окно времени. Превысил — отвечает 429 Too Many Requests и заголовком Retry-After: через сколько секунд можно снова. Популярный алгоритм — token bucket: ведро с токенами пополняется со скоростью N/сек, каждый запрос забирает токен; нет токенов — отказ.",
  "d": "Зачем: защита от DDoS, abuse, справедливое деление ресурса. Token bucket разрешает короткие всплески (накопленные токены), sliding window — точнее, но дороже. Возвращают и X-RateLimit-Limit/Remaining/Reset, чтобы клиент сам притормозил. Лимитят по API-ключу/IP/user. В микросервисах ставят на API-gateway, а не в каждом сервисе. Клиент на 429 должен ретраить с backoff, а не долбить.",
  "code": "// Bucket4j + Quarkus\nBucket bucket = Bucket.builder()\n  .addLimit(Bandwidth.simple(100, Duration.ofMinutes(1)))\n  .build();\nif (!bucket.tryConsume(1))\n  return Response.status(429)\n    .header(\"Retry-After\", \"30\").build();"
 },
 {
  "id": "x-web-etag-caching",
  "t": "Web",
  "s": "http",
  "q": "Как ETag и Cache-Control экономят трафик и зачем нужен 304?",
  "a": "Сервер отдаёт ресурс с ETag — отпечатком версии (хеш). Клиент в следующий раз шлёт If-None-Match: <etag>. Если ничего не изменилось, сервер отвечает 304 Not Modified БЕЗ тела — клиент берёт из кэша. Cache-Control (max-age, no-cache, private) задаёт, сколько и где можно кэшировать.",
  "d": "Два механизма: max-age — кэш свежий N секунд, без запроса вообще; ETag/Last-Modified — условная валидация, запрос идёт, но тело не качается если совпало. ETag ещё даёт optimistic locking на запись: PUT с If-Match: <etag> упадёт 412 Precondition Failed, если кто-то изменил ресурс раньше — защита от потери обновлений. no-store — не кэшировать вообще (платёжки), no-cache — кэшируй, но всегда перепроверяй.",
  "code": "@GET @Path(\"/doc/{id}\")\nResponse get(@PathParam String id,\n    @HeaderParam(\"If-None-Match\") String inm) {\n  String etag = doc.version(id);     // хеш/версия\n  if (etag.equals(inm))\n    return Response.notModified().build(); // 304\n  return Response.ok(doc).tag(etag).build();\n}"
 },
 {
  "id": "x-alg-amortized-arraylist",
  "t": "Algorithms",
  "s": "complexity",
  "q": "Почему add() в ArrayList — это O(1), хотя внутри иногда копируется весь массив?",
  "a": "Обычно add() кладёт элемент в конец за O(1). Но когда массив заполнен — он создаёт новый в 1.5x больше и копирует всё (O(n)). Такие дорогие моменты редкие: чем больше массив, тем реже. Если размазать стоимость всех вставок — в среднем выходит O(1) на вставку. Это и есть амортизированная сложность.",
  "d": "Amortized vs average: амортизированная — это гарантия на ЛЮБУЮ последовательность n операций (суммарно O(n)), а не вероятность. Рост в 1.5x (Java ArrayList) даёт геометрическую прогрессию копирований: n + n/1.5 + n/2.25 +... = O(n) суммарно. Поэтому отдельная вставка может быть O(n), но n вставок = O(n), значит O(1) на штуку. Если бы рост был +1 (фиксированный), вышло бы O(n²) суммарно — антипаттерн.",
  "code": "// Рост: 10 -> 15 -> 22 -> 33 ...\n// каждое удвоение-1.5 окупает прошлые копии\nList<Integer> list = new ArrayList<>();\nfor (int i = 0; i < 1_000_000; i++)\n    list.add(i); // амортизированно O(1)\n\n// оптимизация — задать размер заранее (без ресайзов/копий):\nList<Integer> fast = new ArrayList<>(1_000_000);"
 },
 {
  "id": "x-alg-space-complexity",
  "t": "Algorithms",
  "s": "complexity",
  "q": "Что такое space complexity и почему рекурсия может съесть память даже без коллекций?",
  "a": "Space complexity — сколько ДОПОЛНИТЕЛЬНОЙ памяти растёт вместе с входом n. Даже без списков рекурсия ест память: каждый вложенный вызов держит свой фрейм в стеке (параметры, локалки, адрес возврата). Глубина рекурсии n → O(n) памяти на стеке. Итеративный цикл по тем же данным — O(1).",
  "d": "Считаем ТОЛЬКО доп. память, вход не входит. Recursion: O(глубина) стека. Mergesort — O(n) на временные массивы + O(log n) стек. Quicksort in-place — O(log n) стек. Часто есть tradeoff время↔память: HashSet даёт O(1) поиск ценой O(n) памяти. Tail-call в Java НЕ оптимизируется JVM, поэтому хвостовая рекурсия всё равно растит стек — переписывай в цикл.",
  "code": "// O(n) памяти на стеке — n фреймов\nint sumRec(int n){\n    if (n == 0) return 0;\n    return n + sumRec(n - 1);\n}\n// O(1) памяти — один фрейм\nint sumIter(int n){\n    int s = 0;\n    for (int i = 1; i <= n; i++) s += i;\n    return s;\n}"
 },
 {
  "id": "x-alg-avg-vs-worst",
  "t": "Algorithms",
  "s": "complexity",
  "q": "HashMap.get() — это O(1) или O(n)? В чём разница между average и worst case?",
  "a": "В среднем (average) HashMap.get() — O(1): хеш ведёт прямо в нужную корзину. Но в худшем случае (worst) все ключи попали в одну корзину (коллизии или плохой hashCode) — поиск превращается в обход списка, O(n). С Java 8 длинные цепочки превращаются в дерево, и worst падает до O(log n). На собесе важно: O(1) — это амортизированно-средний, не гарантия.",
  "d": "Big-O скрывает константы и говорит про рост, поэтому отдельно различают: best / average / worst / amortized. HashMap: average O(1) при хорошем распределении и нормальном load factor (0.75). Worst O(n) при деградации в список, O(log n) после treeify (порог 8 элементов в корзине + capacity >= 64). Атака hash-flooding — намеренные коллизии, чтобы загнать сервер в O(n). Для безопасности ключей — иммутабельные с хорошим hashCode.",
  "code": "// плохой hashCode -> все в одной корзине -> O(n)\nclass Bad {\n    @Override public int hashCode(){ return 1; }\n}\nMap<Bad,Integer> m = new HashMap<>();\n// get() деградирует к обходу/дереву\n\n// хороший ключ: String, Long, record — равномерный хеш"
 },
 {
  "id": "x-alg-stream-overhead",
  "t": "Algorithms",
  "s": "complexity",
  "q": "Java Stream и цикл for имеют одинаковую O(n) — почему стрим бывает заметно медленнее?",
  "a": "Big-O у обоих O(n) — растут одинаково. Но Big-O прячет КОНСТАНТУ. Стрим на каждом элементе создаёт лямбды, боксит примитивы (int→Integer), строит цепочку объектов-операций. Эти накладные расходы умножаются на n. На горячем пути или больших n обычный for по примитивам с теми же O(n) реально быстрее в разы. O() равны — константа разная.",
  "d": "Big-O — про асимптотику, не про абсолютную скорость. Источники константы в стримах: автобоксинг (используй IntStream/mapToInt), мегаморфизм лямбд, аллокация промежуточных объектов. parallelStream меняет не O, а делит работу на ядра — выгоден только на больших n и тяжёлой операции, иначе overhead на разбиение/слияние съедает выигрыш. Правило: читаемость по умолчанию стримами, цикл — на доказанно горячем участке после профилирования.",
  "code": "// O(n), но боксинг Integer на каждом шаге\nint s1 = list.stream()\n    .filter(x -> x > 0)\n    .mapToInt(Integer::intValue).sum();\n\n// O(n), без боксинга — меньше константа\nint s2 = 0;\nfor (int x : arr) if (x > 0) s2 += x;"
 },
 {
  "id": "x-git-reflog",
  "t": "Git",
  "s": "debug",
  "q": "Зачем git reflog? Как вернуть «потерянный» коммит после неудачного reset --hard или rebase?",
  "a": "reflog — это журнал, куда Git пишет КАЖДОЕ движение HEAD (commit, reset, rebase, checkout). Даже если ветка «потеряла» коммит, он живёт по своему хэшу. Находишь строку в reflog, берёшь хэш и git reset --hard <hash> или git checkout -b spasenie <hash> — и коммит снова твой.",
  "d": "Коммиты не удаляются сразу: они становятся «недостижимыми» (unreachable) и физически живут ~90 дней (gc.reflogExpire), пока их не вычистит git gc. reflog локален и не пушится. Это ваша персональная страховка: пока коммит был в HEAD хоть раз — его почти всегда можно достать.",
  "code": "// потеряли коммит после reset --hard\n$ git reflog\n// a1b2c3d HEAD@{0}: reset: moving to HEAD~3\n// 9f8e7d6 HEAD@{1}: commit: важная фича  <-- вот он\n$ git reset --hard 9f8e7d6   // вернули ветку на коммит\n// или безопаснее, в новую ветку:\n$ git checkout -b rescue 9f8e7d6"
 },
 {
  "id": "x-git-rebase-i",
  "t": "Git",
  "s": "history",
  "q": "Что делает interactive rebase (git rebase -i)? Зачем squash/fixup перед merge в main?",
  "a": "rebase -i открывает список коммитов, где ты их переписываешь: pick (оставить), squash/fixup (склеить в один), reword (переименовать), drop (выкинуть), переставить местами. Перед вливанием в main схлопываешь 10 грязных коммитов «wip», «fix typo», «опять fix» в 1-2 осмысленных — история чистая.",
  "d": "squash сохраняет сообщения всех коммитов (даёт отредактировать), fixup молча выкидывает сообщение «прицепленного» коммита. Важно: rebase ПЕРЕПИСЫВАЕТ хэши, поэтому только на своей ветке до пуша (или один владелец). После — push --force-with-lease, не просто --force.",
  "code": "$ git rebase -i HEAD~4\n// в редакторе:\n// pick   a1b2  add OrderService\n// fixup  c3d4  fix typo        <- молча вольётся в a1b2\n// squash e5f6  wip validation  <- вольётся, спросит текст\n// reword 7890  refactor        <- даст переименовать\n$ git push --force-with-lease"
 },
 {
  "id": "x-git-merge-conflict",
  "t": "Git",
  "s": "basics",
  "q": "Что такое merge conflict? Как его читать (<<<<<<< ======= >>>>>>>) и грамотно разрулить?",
  "a": "Конфликт — когда две ветки поменяли ОДНУ строку по-разному, и Git не знает, чью версию брать. Он вставляет маркеры: между <<<<<<< HEAD и ======= — твоё (текущая ветка), между ======= и >>>>>>> — чужое (вливаемое). Руками оставляешь нужное, удаляешь все маркеры, git add, git commit (или rebase --continue).",
  "d": "Git мержит автоматически, пока правки в разных местах файла. Конфликт = пересечение. Инструменты: git mergetool, git checkout --ours/--theirs (взять целиком одну сторону), git merge --abort (откатить всё). Профилактика: мелкие частые мержи main в ветку, чтобы не копить расхождения.",
  "code": "public int calc() {\n<<<<<<< HEAD        // твоя версия\n    return a + b;\n=======\n    return a + b + tax;   // версия из feature\n>>>>>>> feature\n}\n// разрулил руками, убрал маркеры:\n$ git add Calc.java\n$ git commit   // или: git rebase --continue"
 },
 {
  "id": "x-git-fetch-pull",
  "t": "Git",
  "s": "basics",
  "q": "В чём разница git fetch и git pull? Что такое fast-forward и зачем pull --rebase?",
  "a": "fetch только СКАЧИВАЕТ изменения с remote в origin/main, но твою ветку не трогает — смотришь спокойно. pull = fetch + сразу merge (или rebase) в текущую ветку. fast-forward — когда твоя ветка не разошлась, и Git просто двигает указатель вперёд без merge-коммита. pull --rebase накатывает твои коммиты поверх чужих — история линейная, без лишних merge-узлов.",
  "d": "git pull (по умолчанию merge) на разошедшихся ветках плодит «Merge branch main» коммиты-паразиты. Команды: pull --ff-only (упасть, если не fast-forward — безопасно для CI), config pull.rebase true. fetch перед работой = увидеть, что наделали другие, до того как мержить.",
  "code": "$ git fetch origin          // скачали, ветку не трогаем\n$ git log HEAD..origin/main // что прилетело нового\n$ git pull --rebase origin main  // мои коммиты поверх чужих\n// настроить раз и навсегда:\n$ git config --global pull.rebase true\n$ git config --global pull.ff only"
 },
 {
  "id": "x-ops-container-vs-vm",
  "t": "DevOps",
  "s": "cloud",
  "q": "Контейнер (Docker) vs виртуальная машина — в чём разница?",
  "a": "ВМ тащит целую гостевую ОС поверх гипервизора — тяжёлая, грузится минуты. Контейнер делит ядро хоста и упаковывает только приложение + библиотеки — лёгкий (МБ), стартует за секунды. Изоляция у ВМ сильнее, у контейнера слабее.",
  "d": "Контейнер = процесс хоста, изолированный через namespaces (видимость) и cgroups (лимиты CPU/RAM). Образ — слоистый (layers), кэшируется. Все контейнеры на хосте делят одно ядро Linux, поэтому нельзя запустить Windows-контейнер на Linux-ядре. ВМ виртуализирует железо целиком — полная изоляция, но overhead на каждую гостевую ОС. На практике: dev-окружение, CI-агенты, микросервисы — контейнеры; жёсткая security-изоляция multi-tenant — ВМ.",
  "code": "# Dockerfile: слой за слоем\nFROM eclipse-temurin:21-jre\nWORKDIR /app\nCOPY target/app.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\",\"-jar\",\"app.jar\"]"
 },
 {
  "id": "x-ops-k8s-basics",
  "t": "DevOps",
  "s": "architecture",
  "q": "Kubernetes: что такое Pod, Deployment и Service?",
  "a": "Pod — минимальная единица, 1+ контейнеров с общим IP, эфемерный (умер — заменён новым). Deployment держит N реплик Pod'ов и катит обновления. Service — стабильный адрес + балансировка на живые Pod'ы (их IP меняются, Service — нет).",
  "d": "Pod'ы смертны: при рестарте получают новый IP, поэтому обращаться к ним напрямую нельзя. Deployment через ReplicaSet гарантирует желаемое число реплик (self-healing) и делает rolling update. Service по label-селектору находит здоровые Pod'ы и даёт им один DNS-имя/ClusterIP. Снаружи кластера — через Ingress (L7-роутинг по host/path) или LoadBalancer. K8s — это control loop: контроллеры постоянно сводят actual state к desired state из манифестов.",
  "code": "apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: orders }\nspec:\n  replicas: 3\n  selector: { matchLabels: { app: orders } }\n  template:\n    metadata: { labels: { app: orders } }\n    spec:\n      containers:\n        - name: orders\n          image: orders:1.4"
 },
 {
  "id": "x-ops-observability-pillars",
  "t": "DevOps",
  "s": "os",
  "q": "Три столпа observability: логи, метрики, трейсы — чем отличаются?",
  "a": "Логи — текстовые события «что случилось» (ошибка, строка). Метрики — числа во времени (RPS, latency, CPU) для алертов и графиков. Трейсы — путь одного запроса через все микросервисы, видно где затык. Логи дороги, метрики дёшевы, трейсы показывают связи.",
  "d": "Метрики (Prometheus): агрегированные числа, дёшево хранить, идеальны для дашбордов и алертов, но не объясняют конкретный сбой. Логи (ELK/Loki): детально, но объёмно и дорого — нужен sampling. Распределённый трейсинг (OpenTelemetry, Jaeger): request получает trace_id, каждый сервис добавляет span; видно полную цепочку и где потеряны миллисекунды. Ключ — correlation: один trace_id протаскивается через логи, метрики и трейсы. Это диагностика «почему медленно», а не просто «всё упало».",
  "code": "// прокидываем trace_id в MDC для логов\nMDC.put(\"traceId\", span.getSpanContext().getTraceId());\nlog.info(\"order placed id={}\", orderId);\n// → лог, метрика и трейс связаны одним traceId"
 },
 {
  "id": "x-ops-horizontal-scaling-lb",
  "t": "DevOps",
  "s": "cloud",
  "q": "Горизонтальное vs вертикальное масштабирование и роль балансировщика?",
  "a": "Вертикально — даём одной машине больше CPU/RAM (просто, но есть потолок и единая точка отказа). Горизонтально — добавляем больше инстансов, перед ними балансировщик раскидывает запросы. Горизонталь требует stateless-приложения (сессию — наружу, в Redis).",
  "d": "Scale up (вертикаль) упирается в физику железа и не даёт отказоустойчивости — один сервер упал, всё легло. Scale out (горизонталь) почти линеен и устойчив, но приложение должно быть stateless: никакого состояния в памяти инстанса, сессии в Redis/JWT. Балансировщик (Nginx, HAProxy, L4/L7): алгоритмы round-robin, least-connections; health-check выкидывает мёртвые ноды; sticky sessions если уж нужна привязка. В облаке autoscaling сам добавляет/убирает инстансы по метрике CPU/RPS.",
  "code": "# nginx: round-robin + health-aware upstream\nupstream orders {\n  least_conn;\n  server app1:8080 max_fails=2 fail_timeout=10s;\n  server app2:8080 max_fails=2 fail_timeout=10s;\n}\nserver { location / { proxy_pass http://orders; } }"
 },
 {
  "id": "p-ddd-one-agg-per-tx",
  "t": "Design",
  "s": "DDD · Aggregate",
  "q": "Правило «одна транзакция = один аггрегат». Почему его нарушают и чем это бьёт?",
  "a": "В одной транзакции меняй только ОДИН аггрегат. Хочешь поменять второй — делай это отдельной транзакцией, через домен-событие (eventual consistency). Иначе раздуваешь границу консистентности, ловишь блокировки и контеншн.",
  "d": "Аггрегат — граница консистентности: его инварианты должны держаться к концу транзакции. Если правишь два аггрегата сразу, ты по сути требуешь сильной консистентности там, где её не нужно: растут локи, версии конфликтуют чаще. Vernon: внутри границы — true invariants и одна транзакция; всё, что снаружи, — через Domain Event + saga/outbox. Outbox-запись кладётся в ТУ ЖЕ транзакцию, что и аггрегат, — это не нарушение, это часть одного коммита.",
  "code": "// тх1: меняем Order, в той же тх пишем outbox-событие\norder.confirm();\norderRepo.save(order);          // 1 аггрегат\noutbox.add(new OrderConfirmed(order.id())); // тот же commit\n// инвентарь обновится ОТДЕЛЬНОЙ тх по событию (eventual)"
 },
 {
  "id": "p-ddd-ref-by-id",
  "t": "Design",
  "s": "DDD · Aggregate",
  "q": "Почему аггрегат ссылается на другой аггрегат по ID (clientId), а не по объекту (client)?",
  "a": "Держишь поле clientId, а не client. Объектная ссылка тащит за собой загрузку чужого аггрегата, разбухание графа, лишние локи и соблазн менять чужие инварианты. ID — слабая связь: маленький аггрегат, грузится независимо.",
  "d": "Object pointer (`order.client.address`) провоцирует: огромные ленивые графы, N+1, и редактирование Client из транзакции Order (нарушение «1 тх = 1 аггрегат»). По ID аггрегаты остаются маленькими и независимо загружаемыми; чтобы показать имя клиента в UI — это задача read-модели/CQRS, а не доменного графа. В JPA: вместо `@ManyToOne Client` храни просто `UUID clientId`.",
  "code": "class Order {            // ROOT\n  private ClientId clientId;       // ✅ по ID\n  // private Client client;        // ❌ чужой аггрегат пойнтером\n}\n// нужно имя клиента? -> отдельный запрос/read-model, не граф"
 },
 {
  "id": "p-hex-domain-vs-jpa",
  "t": "Spring",
  "s": "Hexagon · Mapping",
  "q": "Зачем отдельная domain-модель Order, если уже есть JPA-@Entity Order? Это не дублирование?",
  "a": "@Entity завязан на БД (аннотации, lazy-прокси, пустой конструктор, сеттеры) — он не может быть всегда-валидным с инвариантами. Domain-модель — чистая Java без БД. Платишь boilerplate-маппером, получаешь домен, тестируемый без БД.",
  "d": "JPA-сущность вынуждает компромиссы: no-args конструктор, мутабельные поля, ленивые прокси (LazyInitializationException), геттеры/сеттеры — это путь к анемичной модели. Domain-модель не знает про JPA/Panache, инкапсулирует инварианты, immutable VO. Outbound-адаптер (репозиторий) маппит domain ↔ entity. Да, маппер — boilerplate (минус гексагона), но он окупается изоляцией и unit-тестами домена без Spring/БД. Не пихай @Entity в use case.",
  "code": "// domain (pure)        // infra adapter\nrecord Order(...) {}     class OrderJpa { @Id ...; }\n// repo-адаптер: OrderJpa <-> Order маппится тут, домен про JPA не знает"
 },
 {
  "id": "p-hex-api-vs-spi",
  "t": "Design",
  "s": "Hexagon · Ports",
  "q": "Inbound Port (API) и Outbound Port (SPI) — в чём разница и кто кого реализует?",
  "a": "API — порт ВХОДА: его вызывает адаптер (REST/Kafka), реализует use case. SPI — порт ВЫХОДА: его вызывает домен, реализует адаптер (Minio/JDBC). Оба интерфейса, но стрелки зависимостей всегда внутрь, к домену.",
  "d": "Inbound (API): контроллер → интерфейс GenerateDocumentAPI → реализован use case'ом. Outbound (SPI): use case → интерфейс StorageSPI → реализован MinioStorageAdapter. Ключ — direction of control: для SPI домен ОБЪЯВЛЯЕТ нужный ему контракт, а инфра под него подстраивается (Dependency Inversion). Поэтому замена Postgres→MinIO = новый адаптер, домен не трогаем. Имена из эталона audit: *API для inbound, *SPI/*Port для outbound.",
  "code": "interface GenerateDocumentAPI { Doc generate(Cmd c); } // inbound, юзкейс реализует\ninterface StorageSPI { void put(byte[] pdf); }        // outbound, адаптер реализует\nclass GenerateDocUseCase implements GenerateDocumentAPI {\n  GenerateDocUseCase(StorageSPI storage) {...} // зовёт SPI\n}"
 },
 {
  "id": "p-ddd-domain-vs-app-service",
  "t": "Design",
  "s": "DDD · Services",
  "q": "Domain Service vs Application Service — где бизнес-логика, а где оркестрация?",
  "a": "Domain Service — чистая доменная логика, что не влезла в один аггрегат (TaxCalculator), про инфру НЕ знает. Application Service (use case) — тонкий дирижёр: открыл тх, загрузил аггрегат, позвал метод, сохранил, опубликовал событие. Правил бизнеса в нём НЕТ.",
  "d": "Частая путаница на собесе. Domain Service — это глагол, не принадлежащий ни одной сущности, но это всё ещё домен (stateless, без БД/Kafka). Application Service = твой use case: load → call → save → publish, одна транзакция, один аггрегат. Если в Application Service появились if'ы с бизнес-правилами — они утекли из домена (анемичная модель). Инфра-сервис (письма, платёжка) — за портом, это уже не доменный сервис.",
  "code": "// domain service — логика через аггрегаты, без инфры\nMoney tax = taxCalculator.calc(order, rate);\n// application service (use case) — только оркестрация\nvar o = repo.byId(id); o.applyTax(tax); repo.save(o); events.publish(...);"
 },
 {
  "id": "p-hex-inject-clock",
  "t": "Testing",
  "s": "Hexagon · Determinism",
  "q": "Почему LocalDate.now() прямо в сервисе — нарушение гексагона, и как тестировать «вчера/конец месяца»?",
  "a": "now()/random()/UUID.randomUUID() в домене — скрытая зависимость от внешнего мира: тест недетерминирован, «конец месяца» не воспроизвести. Инжекть Clock через порт — в тесте подсунешь фиксированную дату.",
  "d": "Время — это инфраструктура. Захардкоженный `LocalDate.now()` делает домен непроверяемым и флэки (тест у границы суток падает). Решение: `Clock` (или CalendarPort) в конструкторе; прод даёт `Clock.systemUTC()`, тест — `Clock.fixed(...)`. Тот же приём для генерации ID/случайностей — за портом. На практике CalendarPort именно для этого. Бонус: бизнес-календарь (выходные биржи) тоже за портом, а не зашит в домен.",
  "code": "class TaxReportUseCase {\n  private final Clock clock;\n  TaxReportUseCase(Clock clock){ this.clock = clock; }\n  LocalDate today(){ return LocalDate.now(clock); } // подменяемо\n}\n// test: new TaxReportUseCase(Clock.fixed(Instant.parse(\"2026-01-31T...\"),UTC))"
 },
 {
  "id": "p-deep-shallow-module",
  "t": "Design",
  "s": "Deep vs Shallow модуль",
  "q": "Что такое «глубокий» и «мелкий» модуль по Ousterhout и почему God Class — это мелкий модуль, хотя в нём 1000 строк?",
  "a": "Стоимость модуля = его интерфейс (что надо знать снаружи), польза = функционал. Глубокий = много пользы за узким интерфейсом (Unix open/read/close прячут диски, права). Мелкий = широкий/сложный интерфейс ради малого. God Class наружу торчит десятками методов и полей — интерфейс огромный, прятать сложность не даёт. Много мелких классов («classitis») = сумма мелких интерфейсов, сложности больше, а не меньше.",
  "d": "Интерфейс — это не только сигнатура: side effects, порядок вызовов, что читается из глобалов — всё, что обязан знать вызывающий. Чинить God Class надо в deep-модули с узким публичным API, а не дробить на пачку pass-through классов.",
  "code": "// shallow: интерфейс ≈ реализации, пользы ноль\nclass Wrapper { String get(K k){ return map.get(k);} }\n// deep: узкий вход, богатая реализация внутри\ninterface DocStore { Doc save(DocCmd c); } // прячет MinIO+outbox+метаданные"
 },
 {
  "id": "p-info-leakage-temporal",
  "t": "Design",
  "s": "Info leakage / temporal decomposition",
  "q": "Что такое information leakage и почему разбивать код по порядку выполнения (read→modify→write на 3 класса) — это антипаттерн?",
  "a": "Leakage — когда одно решение (формат файла, протокол) знают сразу 2+ модуля: меняешь в одном — чини везде, даже если в интерфейсах это не торчит (back-door связь). Temporal decomposition — структура по времени (сначала прочитали, потом изменили, потом записали) вместо по знанию. Операции, делящие одно знание (формат), оказываются в разных классах и протекают друг в друга. Структурируй вокруг ЗНАНИЯ, а не вокруг порядка шагов.",
  "d": "Лечение: спрятать секрет в одном месте, либо слить протекающие модули. Сюда же — выставлять config-параметры наружу «на всякий»: это утечка ответственности, считай хорошие дефолты сам."
 },
 {
  "id": "p-define-errors-out",
  "t": "Design",
  "s": "Define errors out of existence",
  "q": "Что значит «определить ошибку так, чтобы её не существовало», и почему это снижает сложность сильнее, чем аккуратный try/catch?",
  "a": "Каждый throw — новая ветка в интерфейсе, о которой обязан знать вызывающий. Лучшая стратегия — спроектировать API так, чтобы ошибка просто НЕ возникала. Пример: delete(start,end) на уже пустом диапазоне = no-op, не исключение. Unix unlink открытого файла не падает — откладывает удаление. Так число мест, которые вообще думают об ошибках, стремится к нулю.",
  "d": "Порядок предпочтений: 1) убрать ошибку дизайном; 2) замаскировать низко (TCP прячет потерю пакетов); 3) агрегировать обработку в один высокий handler; 4) для truly-unrecoverable — просто crash, не писать никогда-не-тестируемый recovery.",
  "code": "// плохо: спецслучай-исключение\nif(idx<0||idx>=len) throw new RangeException();\n// хорошо: no-op, ошибки нет\nint a=Math.max(start,0), b=Math.min(end,len);\nfor(int i=a;i<b;i++) delete(i); // пусто? просто ничего"
 },
 {
  "id": "p-domain-vs-jpa-entity",
  "t": "Spring",
  "s": "Domain model ≠ JPA entity",
  "q": "Почему один класс @Entity с бизнес-логикой внутри — это проблема, и что даёт разделение domain model и JPA-сущности?",
  "a": "Когда @Entity Order и есть domain-объект — домен зависит от JPA: его нельзя протестировать без БД (new Order не хватит — нужен персист-контекст), схема БД диктует структуру домена, lazy @OneToMany стреляет LazyInitializationException в неожиданном месте. Решение: чистый domain (Java record, ноль аннотаций) + отдельный JpaEntity + mapper. Домен тестируется как new TaxReport(...), схема меняется независимо.",
  "d": "Цена — больше кода (entity + model + mapper), для тупого CRUD это overkill. Брать, где есть реальная бизнес-логика. Records (Java 21) идеальны: immutable, лаконично. На практике эталон — audit-service держит домен на records.",
  "code": "public record TaxReport(UUID id, LocalDate date,\n  List<TaxLine> lines){ BigDecimal fifo(){...} } // чистый\n@Entity class TaxReportJpa{ @Id UUID id; /* без логики */ }\nclass Mapper{ TaxReport toDomain(TaxReportJpa e){...} }"
 },
 {
  "id": "p-architecture-quantum",
  "t": "Distributed",
  "s": "Architecture quantum / shared DB",
  "q": "Что такое «архитектурный квант» и почему два сервиса, делящие одну БД, — это один квант, а не два независимых сервиса?",
  "a": "Квант — независимо разворачиваемый кусок с высокой связностью И собственными данными. Если два сервиса пишут в одну БД — у них общая статическая связанность через схему: меняешь таблицу — чини обоих, падает БД — падают оба. Это ОДИН квант (распределённый монолит), хоть и два процесса. Распилил сервисы, но не данные — получил худшее: сетевые вызовы плюс общая точка отказа.",
  "d": "Владение = единственный ПИСАТЕЛЬ таблицы (читать можно многим через API/реплику). Single ownership — дефолт. Common (многие пишут, напр. audit) — спрятать за один write-сервис. Joint (несколько пишут) — самый тяжёлый: table-split / data-domain / delegate / слить сервисы назад."
 },
 {
  "id": "p-saga-three-axes",
  "t": "Distributed",
  "s": "8 саг = 3 оси",
  "q": "По каким трём осям различаются 8 паттернов саг и почему «async + atomic» — это почти всегда плохой выбор?",
  "a": "Три оси: связь (sync/async) × согласованность (atomic/eventual) × координация (orchestrated/choreographed) → 2×2×2 = 8 саг. Atomic между сервисами означает «всё или ничего» через двухфазную атомарность — а async по природе ломает синхронную атомарность (ответы приходят потом, нет момента «commit всех сразу»). Поэтому Fantasy Fiction и Horror Story (async+atomic) — wishful thinking, их избегают.",
  "d": "Sweet spots: Fairy Tale (sync+eventual+orchestrated) — баланс; Parallel (async+eventual+orchestrated) — скорость с центральным контролем; Anthology (async+eventual+choreographed) — max throughput, но дебажить ад. Если нужна atomic через сервисы — ты, скорее всего, распилил слишком глубоко. Компенсация ≠ откат: письма/списания уже случились, шаги делай идемпотентными."
 },
 {
  "id": "p-legacy-code-no-tests",
  "t": "Design",
  "s": "legacy = no tests",
  "q": "Что по Feathers'у такое legacy-код, и почему его «страшно» менять?",
  "a": "Legacy = код БЕЗ тестов, и неважно, новый он или старый, красивый или нет. Раз тестов нет — ты не можешь убедиться, что правка сохранила поведение. Меняешь вслепую: «Edit and Pray». Лечение — сначала накрыть тестами («Cover and Modify»), потом править.",
  "d": "Алгоритм правки legacy (порядок строгий): 1) найти change points, 2) найти test points (где можно наблюдать и изолировать), 3) разорвать зависимости, чтобы класс встал в тест-харнесс, 4) написать characterization-тесты, 5) только теперь менять и рефакторить. Основной труд — шаг 3."
 },
 {
  "id": "p-seam-enabling-point",
  "t": "Design",
  "s": "seam",
  "q": "Что такое seam (шов) и enabling point — как подменить поведение, НЕ редактируя само место?",
  "a": "Seam — место, где можно изменить поведение программы, не правя код В ЭТОМ месте. У каждого шва есть enabling point — точка, где ты выбираешь, какое поведение подставить. Лучший шов — объектный: depend on interface, а в тесте инжектишь фейк. Меняешь поведение НА enabling point, а не в теле класса.",
  "d": "Типы швов: object seam (полиморфизм/DI — выбор реализации при конструировании; лучший), link seam (подмена библиотеки на этапе сборки/classpath), preprocessor seam (#ifdef, только C/C++). Object seam переживает рефакторинг и не требует трюков со сборкой.",
  "code": "// шов: зависим от интерфейса\nclass Pay { Pay(Clock c){...} }      // enabling point = аргумент ctor\nnew Pay(new FakeClock(FIXED));        // в тесте подставили поведение"
 },
 {
  "id": "p-characterization-test",
  "t": "Testing",
  "s": "characterization",
  "q": "Что такое characterization-тест и почему первая ассерция должна заведомо ПРОВАЛИТЬСЯ?",
  "a": "Это тест, фиксирующий РЕАЛЬНОЕ текущее поведение (что код делает), а не желаемое (что должен). Пишешь ассерт, который точно упадёт (assert == \"SENTINEL\"), запускаешь — падение покажет фактическое значение, вставляешь его. Теперь тест зелёный и держит поведение, пока рефакторишь.",
  "d": "Главный нюанс: ты фиксируешь поведение ВМЕСТЕ с багами — намеренно. Сначала запинить «как есть», и только отдельным видимым шагом чинить баг. Характеризуй не весь класс, а только зону вокруг будущей правки — точечной сетки достаточно.",
  "code": "@Test void pin() {\n  var r = legacy.calc(input);\n  assertEquals(\"SENTINEL\", r); // упадёт → покажет реальное \"42.50\"\n  // потом: assertEquals(\"42.50\", r);\n}"
 },
 {
  "id": "p-sprout-wrap",
  "t": "Design",
  "s": "sprout & wrap",
  "q": "Надо добавить логику в God-класс, который нельзя протестировать. Как — Sprout и Wrap?",
  "a": "Не вписывай новый код в болото. Sprout Method: новую логику в ОТДЕЛЬНЫЙ новый метод, покрытый тестами, и зовёшь его из старого. Wrap Method: переименуй оригинал, заведи обёртку со старым именем, которая зовёт и старое, и новое. Старый код не трогаешь, новый — чистый и протестирован.",
  "d": "Sprout Class — если новому коду нужны другие зависимости или старый класс вообще не инстанцируется: кладёшь в новый класс, шов = этот класс. Wrap Class (Decorator) — оборачиваешь весь класс тем же интерфейсом, добавляя поведение широко. Trade-off: старый код остаётся без тестов, но гниение остановлено — долг гасишь позже.",
  "code": "// Wrap Method\nvoid payDay() { dispatchPay(); recordAudit(); } // обёртка\nvoid dispatchPay() { /* оригинал, нетронут */ }"
 },
 {
  "id": "p-lean-on-compiler",
  "t": "Java",
  "s": "mechanical refactor",
  "q": "Надо рефакторить, а тестов ещё нет. Как «опереться на компилятор» и не сломать?",
  "a": "Делай только механические, обратимые микрошаги: Extract Method, Rename, Introduce Variable, Move — по ОДНОМУ, перекомпилируя после каждого. «Lean on the Compiler»: намеренно сломай сигнатуру — компилятор перечислит ВСЕ места вызова, которые надо поправить. Не смешивай извлечение с изменением логики.",
  "d": "Preserve Signatures — копируй список параметров дословно при извлечении метода, чтобы не ошибиться вручную. Цель этих шажков — дойти до точки, где появляется seam, затем написать characterization-тест, и только потом рефакторить «по-настоящему». IDE-рефакторинги доверенные, ручные правки — нет."
 },
 {
  "id": "p-strangler-cutover",
  "t": "DevOps",
  "s": "strangler fig",
  "q": "Зачем Strangler Fig вместо переписать сервис «с нуля и разом» (big-bang rewrite)?",
  "a": "Big-bang — долго, дорого, огромный шанс регрессий и долгий feature-freeze. Strangler: новый сервис поднимаешь ПАРАЛЛЕЛЬНО за теми же точками входа (URL, та же consumer-group, тот же Zeebe job type), данные синхронишь заранее, трафик переключаешь прокси. Старый стоит как rollback target.",
  "d": "Условия: одинаковые точки входа, данные синхронизированы до cutover (bulk copy + delta poll по modified_date), старый стек нетронут. Минусы: период двойного содержания инфраструктуры + переливашка данных + in-flight запросы при переключении требуют идемпотентности консьюмера. Откат = вернуть NGINX upstream за минуты, пока старый Postgres жив."
 },
 {
  "id": "p-outbox-relay-race",
  "t": "Distributed",
  "s": "outbox relay",
  "q": "Relay отправил сообщение в Kafka/ЦЭА, но упал ДО UPDATE sent_at. Что произойдёт при рестарте и как с этим жить?",
  "a": "Строка всё ещё sent_at IS NULL → relay отправит её повторно. Outbox даёт at-least-once, а не exactly-once. Лечится не на стороне relay, а идемпотентным получателем: дедуп по document_id/ключу. Поэтому в outbox без идемпотентного консьюмера нельзя.",
  "d": "Атомарны только save(doc)+save(outbox) в одной транзакции. Сама отправка + UPDATE sent_at — вне исходной транзакции, поэтому окно «отправлено, но не отмечено» неустранимо. Вариант: UPDATE sent_at в той же транзакции что и сетевой вызов невозможен (нельзя откатить уже ушедший пакет). Отсюда правило: relay best-effort once, дубли ловит приёмник.",
  "code": "// приёмник (ЦЭА / consumer):\nif (processed.contains(msg.documentId())) return; // дедуп\nprocess(msg);\nprocessed.add(msg.documentId());"
 },
 {
  "id": "p-outbox-skip-locked",
  "t": "DB",
  "s": "конкурентный relay",
  "q": "Два инстанса relay одновременно делают SELECT ... WHERE sent_at IS NULL. Почему получится двойная отправка и как это убрать одним SQL?",
  "a": "Оба прочитают одни и те же строки и оба отправят. Нужен FOR UPDATE SKIP LOCKED: первый relay блокирует пачку строк, второй их пропускает и берёт следующие. Так несколько relay'ев параллельно разбирают очередь без пересечений и без блокировки друг друга.",
  "d": "Просто FOR UPDATE заставил бы второй relay ждать освобождения строк — теряем параллелизм. SKIP LOCKED пропускает уже залоченные и сразу берёт свободные. Это штатный способ сделать «очередь поверх таблицы» в Postgres. LIMIT обязателен, чтобы один relay не выгреб всё (вспомни ~103k строк при накате).",
  "code": "SELECT * FROM archive_outbox\nWHERE sent_at IS NULL\nORDER BY created_at\nFOR UPDATE SKIP LOCKED\nLIMIT 50;"
 },
 {
  "id": "p-outbox-polling-vs-cdc",
  "t": "Distributed",
  "s": "polling vs CDC",
  "q": "Relay делает SELECT WHERE sent_at IS NULL по таймеру. В чём минус этого polling и что предлагает CDC (Debezium)?",
  "a": "Polling = постоянные запросы к горячей таблице + лаг доставки на интервал опроса, плюс таблица пухнет и нужен индекс/чистка. CDC (Debezium) читает не таблицу, а WAL-лог БД: вставка в outbox сразу превращается в событие в Kafka, без опроса и почти без лага.",
  "d": "Polling-relay прост и не требует инфраструктуры — для умеренного потока (как в document-service) его достаточно. CDC выигрывает на высоком потоке: нет нагрузки опросом, ниже latency, но добавляет Debezium + Kafka Connect в стек (сложнее эксплуатация). Выбор по объёму, а не «модно/немодно». В обоих случаях нужен partial index по sent_at IS NULL, иначе SELECT сканит всё.",
  "code": "-- чтобы polling не сканировал всю таблицу:\nCREATE INDEX ix_outbox_unsent\n  ON archive_outbox (created_at)\n  WHERE sent_at IS NULL; -- partial index"
 },
 {
  "id": "p-api-composition-latency",
  "t": "Distributed",
  "s": "fan-out latency",
  "q": "Composer для «деталей документа» дёргает order-service, agreement-service, tax. Почему вызывать параллельно мало — и что обязательно добавить?",
  "a": "Параллельно latency = max(вызовов), последовательно = sum(). Но фан-аут хрупок: один медленный/упавший сервис тянет за собой весь ответ. Обязательны таймаут на каждый вызов + circuit breaker + стратегия деградации (частичный ответ или фейл), иначе composer виснет на самом тормозном.",
  "d": "Параллель экономит время (max вместо sum), но не спасает от хвостов: P99 одного источника = P99 всего запроса. CB размыкает цепь к упавшему сервису, чтобы не копить зависшие потоки и не каскадить отказ. Решаешь продуктово: «документ без tax-блока лучше, чем 500» (degrade) или «всё или ничего» (fail). Без таймаута поток ждёт вечно — connection pool исчерпывается.",
  "code": "var order = CompletableFuture.supplyAsync(() -> orderClient.get(id))\n    .orTimeout(800, MILLISECONDS);\nvar client = CompletableFuture.supplyAsync(() -> agreementClient.get(id))\n    .orTimeout(800, MILLISECONDS);\nreturn order.thenCombine(client, this::compose).join();"
 },
 {
  "id": "p-api-composition-vs-cqrs",
  "t": "Design",
  "s": "composition→CQRS",
  "q": "Composer склеивает данные in-memory. Когда это перестаёт работать и пора на CQRS с read-model?",
  "a": "In-memory join не масштабируется: чтобы соединить заказы с клиентами, приходится тянуть из сервисов большие списки и джойнить в памяти — память и сеть взрываются. Когда запрос частый и датасет большой — заводят денормализованную read-model (CQRS), которая обновляется событиями и читается одним запросом.",
  "d": "Правило: начинать с API Composition (просто, без event sourcing). Боль появляется на «list/search по многим сущностям» — это N вызовов + джойн в куче на каждый запрос. CQRS убирает рантайм-джойн: read-model уже денормализована, цена — eventual consistency и сложность поддержки проекции. Для редких запросов composition дешевле; не вводи CQRS «на будущее»."
 },
 {
  "id": "p-acl-not-just-mapper",
  "t": "Design",
  "s": "ACL ≠ DTO-маппер",
  "q": "Чем Anti-Corruption Layer отличается от обычного DTO→Entity маппера, и где он обязан жить?",
  "a": "Маппер перекладывает поля одинаковой по смыслу модели. ACL переводит ЧУЖУЮ семантику (кривые enum'ы legacy CBS, legacy-id, денормализованные поля) в твой домен — и наоборот. Живёт в адаптере на границе контекста; домен видит только свои VO и не знает, что снаружи legacy SP или JDBC-строки.",
  "d": "Смысл ACL — локализовать боль чужой системы в одном месте. Если чужая модель просочилась в домен (домен оперирует легаси-кодами), ACL не сделал работу: заменить источник без переписывания домена уже нельзя. Поэтому в document-service DocNumberPort/OrderDataPort — это ACL: трансляция в DocumentNumber/VO внутри адаптера. Замена JDBC→REST меняет только реализацию порта, домен не трогаем.",
  "code": "// адаптер (ACL), НЕ домен:\nDocumentNumber toDomain(legacy CBSNumberResponse r) {\n  // чужой формат \"KZ-00-123/X\" → свой VO\n  return DocumentNumber.parse(r.rawNumber());\n}"
 },
 {
  "id": "p-kafka-eos-side-effects",
  "t": "Distributed",
  "s": "exactly-once / side effects",
  "q": "У тебя exactly-once в Kafka (транзакции + read_committed). Безопасно ли внутри консьюмера писать в Postgres и дёргать HTTP?",
  "a": "Нет. EOS-транзакция Kafka атомарна только для Kafka→process→Kafka (запись в топики + коммит оффсета). Запись в Postgres и HTTP-вызов НЕ входят в неё — при ретрае повторятся. Для них всё равно нужна идемпотентность или outbox.",
  "d": "Kafka-транзакция оборачивает только продьюс в топики и sendOffsetsToTransaction. Внешние сайд-эффекты (БД, REST, отправка письма) брокер откатить не может. Поэтому 'у меня же exactly-once' — ложное чувство безопасности: consume-transform-produce защищён, а consume→write-to-DB нет. Лечим: ключ идемпотентности в БД (UNIQUE) или transactional outbox, где запись в БД и 'намерение опубликовать' в одной локальной транзакции.",
  "code": "// EOS защищает ТОЛЬКО это:\nproducer.beginTransaction();\nproducer.send(outTopicRecord);          // в Kafka — атомарно\nproducer.sendOffsetsToTransaction(...); // оффсет — атомарно\nproducer.commitTransaction();\n\n// А это НЕ откатится при ретрае:\njdbc.insert(order);   // нужен UNIQUE/idempotency\nhttp.post(colvir);    // повторится → дубль"
 },
 {
  "id": "p-kafka-poison-hol",
  "t": "Distributed",
  "s": "poison / head-of-line",
  "q": "Одно 'ядовитое' сообщение в партиции падает на обработке бесконечно. Почему стоит вся партиция и как разрулить без потери порядка?",
  "a": "Партиция читается строго по порядку: пока не закоммитишь оффсет 'отравленного' сообщения, следующие за ним не обрабатываются — head-of-line blocking. Решение: после N ретраев увести сообщение в retry-топик с задержкой, а безнадёжное — в DLQ, и идти дальше.",
  "d": "Внутри партиции оффсеты монотонны и обрабатываются по очереди, поэтому застрявшее сообщение блокирует ВСЁ за ним (не только себя). Просто DLQ убирает blocker. Но мгновенный сброс в DLQ теряет шанс на восстановление от transient-ошибки. Зрелый паттерн — tiered retry topics: orders-retry-5s → orders-retry-1m → … → orders.DLT. Задержанный ретрай не держит главную партицию. В сообщение-кандидат кладём заголовки: original topic/partition/offset, exception, attempt count. На DLT обязателен алерт по размеру/lag, иначе тихая свалка.",
  "code": "# SmallRye (Quarkus)\nmp.messaging.incoming.orders.failure-strategy=dead-letter-queue\nmp.messaging.incoming.orders.dead-letter-queue.topic=orders.DLT\n# headers: dead-letter-reason, dead-letter-cause + original offset"
 },
 {
  "id": "p-kafka-inflight-order",
  "t": "Distributed",
  "s": "producer / ordering",
  "q": "Включил retries у продьюсера ради надёжности — и сообщения внутри партиции вдруг поменялись местами. Почему и как чинить?",
  "a": "Без идемпотентности повторно отправленный батч может прилететь ПОЗЖЕ следующего за ним (несколько in-flight запросов) → переупорядочивание. Лечат enable.idempotence=true (нумерует батчи, брокер восстанавливает порядок) при max.in.flight ≤ 5.",
  "d": "max.in.flight.requests.per.connection > 1 означает: батч N мог зафейлиться и ретраиться, пока батч N+1 уже ушёл и осел. Брокер запишет N+1 раньше N → порядок сломан, хотя ничего не потеряно. enable.idempotence=true присваивает (Producer ID, sequence) и брокер дедуплицирует И поддерживает порядок ретраев при in-flight ≤ 5. Это та же машинерия, что даёт 'exactly-once per partition для ретраев продьюсера'. Без идемпотентности единственный способ сохранить порядок — max.in.flight=1 (медленно).",
  "code": "// современный дефолт — лучше не выключать\nprops.put(\"enable.idempotence\", true); // требует acks=all,\nprops.put(\"acks\", \"all\");             // retries>0,\nprops.put(\"max.in.flight.requests.per.connection\", 5); // ≤5"
 },
 {
  "id": "p-kafka-minisr",
  "t": "Distributed",
  "s": "durability / ISR",
  "q": "RF=3, acks=all. Сколько брокеров можно потерять без потери данных и без остановки записи? И почему min.insync.replicas=3 — плохо?",
  "a": "min.insync.replicas=2 + RF=3 + acks=all → переживаешь падение 1 брокера: данные целы и топик пишется. Если min.insync=RF=3, то потеря любого одного брокера сразу < min → запись блокируется (NotEnoughReplicas). Слишком строго.",
  "d": "acks=all означает 'подтвердить, когда запись дошла до всех ISR, но не меньше min.insync.replicas'. При RF=3/min.insync=2 после падения одного брокера в ISR остаётся 2 ≥ 2 → пишем дальше, данных не теряем. При min.insync=3 любой выпавший брокер делает ISR=2 < 3 → продьюсер получает ошибку, записи стоят. Ещё инвариант: unclean.leader.election.enable=false — иначе лидером может стать отставшая реплика и молча потерять хвост данных. Прод-набор: RF=3, min.insync=2, acks=all, enable.idempotence=true.",
  "code": "# topic config (prod)\nreplication.factor=3\nmin.insync.replicas=2     # НЕ 3 — иначе 1 потеря блокирует запись\n# producer\nacks=all\nunclean.leader.election.enable=false"
 },
 {
  "id": "p-kafka-schema-compat",
  "t": "Distributed",
  "s": "Schema Registry / evolution",
  "q": "Меняешь Avro-схему события. При BACKWARD-совместимости кого катить первым — продьюсеров или консьюмеров? И что вообще нельзя менять?",
  "a": "BACKWARD (дефолт): новая схема читает СТАРЫЕ данные → сначала катишь консьюмеров, потом продьюсеров. FORWARD — наоборот, сначала продьюсеры. Безопасно: добавлять поля с default. Нельзя: удалять/переименовывать required-поле и менять тип.",
  "d": "Schema Registry хранит схемы, в сообщении едет только schema ID → маленький payload и единый контракт, деплои продьюсера/консьюмера расцеплены. BACKWARD = новый consumer понимает и новые, и старые сообщения, поэтому его выкатывают раньше, чтобы он пережил поток старых событий. FORWARD = старый consumer понимает новые сообщения → раньше катят продьюсера. FULL = можно в любом порядке. Практика: add field with default — безопасно везде; remove field — только FORWARD; add required field — ломает BACKWARD; смена типа поля — ломает всё.",
  "code": "// BACKWARD-safe: добавили поле с дефолтом\n{ \"name\":\"currency\", \"type\":\"string\", \"default\":\"KZT\" }\n// СЛОМАЕТ BACKWARD: новое required-поле без default\n{ \"name\":\"taxId\", \"type\":\"string\" }"
 },
 {
  "id": "p-idempotent-sametx",
  "t": "Distributed",
  "s": "idempotent consumer",
  "q": "Как сделать Kafka-консьюмер идемпотентным надёжно? Почему 'сначала проверю SELECT-ом, потом обработаю' — недостаточно?",
  "a": "Check-then-act ловит гонку: два дубля проходят SELECT 'нет такого' одновременно → оба обрабатываются. Правильно: в ОДНОЙ транзакции INSERT message_id в processed_messages (UNIQUE PK) + бизнес-запись. Дубль ловит конфликт уникальности → откат, сообщение игнорим.",
  "d": "Kafka at-least-once → дубли неизбежны (ретрай, ребаланс до коммита оффсета). Отдельный SELECT и последующая обработка — это TOCTOU-гонка: между проверкой и вставкой влезает второй дубль. Атомарность даёт сама БД: PK/UNIQUE на (consumer_id, message_id). Вставку идентификатора, бизнес-изменение и запись в outbox кладём в одну транзакцию — либо всё, либо ничего. Повторный message_id → нарушение уникальности → ON CONFLICT DO NOTHING / откат, сообщение тихо отбрасываем. Альтернатива без отдельной таблицы — UNIQUE на бизнес-ключ самой записи (как tax_report_hst_usd в проде).",
  "code": "BEGIN;\nINSERT INTO processed_messages(consumer_id, message_id)\nVALUES ('doc-svc', :msgId)\nON CONFLICT DO NOTHING;          -- дубль → 0 строк\n-- if 0 rows affected → ROLLBACK, skip\nINSERT INTO document(...) VALUES (...);   -- бизнес\nINSERT INTO archive_outbox(...) VALUES (...);\nCOMMIT;"
 },
 {
  "id": "p-kafka-ack-after-dbwrite",
  "t": "Distributed",
  "s": "at-least-once · порядок ack",
  "q": "Консьюмер: сначала ack сообщения, потом запись в БД — или наоборот? Почему порядок критичен?",
  "a": "Сначала пиши в БД, потом ack. Если ack первым и запись в БД упала — сообщение помечено обработанным, но его эффекта нет → событие потеряно навсегда. БД-первым: в худшем случае дубль, а его лечит идемпотентность.",
  "d": "Атомарно закоммитить и БД-транзакцию, и Kafka-оффсет нельзя (это две системы без общей транзакции). Прагматика DDIA: write-then-ack. Окно сбоя между ними даёт максимум повторную обработку (at-least-once), а не потерю. ack() внутри @Transactional callback — баг: если транзакция откатится, оффсет уже сдвинут и его не вернуть.",
  "code": "// порядок важен!\ntxManager.run(() -> {\n  insertIdempotencyKey(msg.id()); // 1\n  orderRepo.updateStatus(id, CONFIRMED); // 2 — БД сначала\n});\nreturn msg.ack(); // 3 — оффсет ТОЛЬКО после коммита БД"
 },
 {
  "id": "p-kafka-autocommit-loses",
  "t": "Distributed",
  "s": "offset · auto-commit",
  "q": "Чем опасен enable.auto.commit=true у Kafka-консьюмера?",
  "a": "Авто-коммит сдвигает оффсет по таймеру, не глядя на успех обработки. Упал в середине работы после авто-коммита — записи помечены прочитанными, но не обработаны → потеря. Выключай авто-коммит, коммить вручную после успеха.",
  "d": "At-least-once гарантия держится только если оффсет коммитится ПОСЛЕ успешной обработки. Авто-коммит ломает это: таймер не знает про твою бизнес-логику. В SmallRye — commit-strategy=throttled и ack() только после того, как бизнес-транзакция + outbox прошли. Poison-message (всегда падает) после N ретраев уходит в dead-letter, иначе застрянет на нём навсегда.",
  "code": "# плохо — оффсет двигается по часам\nenable.auto.commit=true\n\n# хорошо (SmallRye)\nmp.messaging.incoming.spo-pf-orders.commit-strategy=throttled"
 },
 {
  "id": "p-stream-event-vs-proc-time",
  "t": "Distributed",
  "s": "event time vs processing time",
  "q": "Почему ставить таймстемпы через time.Now()/new Date() в сервисе — мина, и что брать вместо?",
  "a": "Processing-time (когда получил) врёт при лаге, повторной доставке и replay. Часы разных инстансов расходятся на десятки мс. Для сравнений в БД бери единые часы — DEFAULT now() сервера БД, или event-time из payload, а не client-таймстемп.",
  "d": "Event time = когда событие реально произошло (в payload); processing time = когда консьюмер его принял. При реплее бэклога processing-time окна посчитаются неверно, event-time — верно. Клиентский таймстемп с устройства особенно ненадёжен (clock skew, NTP-дрейф). Дедлайны и счётчики, которые потом сравниваются в БД, всегда от одного источника времени — серверных часов Postgres.",
  "code": "-- надёжно: единые часы сервера БД\ncreated_at TIMESTAMPTZ DEFAULT now()\npayment_deadline := created_at + interval '24 hours'\n-- DeadlineChecker сравнивает с тем же now()"
 },
 {
  "id": "p-tx-repeatable-read-name-trap",
  "t": "DB",
  "s": "snapshot isolation · ловушка имени",
  "q": "В Postgres REPEATABLE READ — это «почти SERIALIZABLE»? От чего он НЕ спасает?",
  "a": "Нет. REPEATABLE READ в Postgres = snapshot isolation: даёт стабильный снимок, ловит lost update на одной строке. Но НЕ спасает от write skew — две транзакции читают одно, пишут в РАЗНЫЕ строки, конфликта строк нет, инвариант нарушен. От этого — только SERIALIZABLE.",
  "d": "Snapshot isolation убирает фантомы в read-only запросах, но не в read-write, где write добавляет строки под условие read. Многие думают «repeatable read ≈ serializable» и ловят баг. Подвох имени: SQL-стандарт зовёт это REPEATABLE READ, но фактически это Snapshot Isolation. Для write skew нужен SERIALIZABLE (SSI), либо SELECT FOR UPDATE на читаемых строках, либо UNIQUE-ограничение.",
  "code": "-- write skew: оба видят по 1 PENDING, оба «отменяют»\n-- T1 и T2: SELECT ... WHERE status='PENDING' AND order_id=X\n-- пишут в разные строки → row-конфликта нет → инвариант сломан\n-- лечит: ISOLATION LEVEL SERIALIZABLE"
 },
 {
  "id": "p-tx-ssi-retry-40001",
  "t": "DB",
  "s": "SERIALIZABLE · retry",
  "q": "Поставил SERIALIZABLE и забыл про ошибки. Что сломается под нагрузкой?",
  "a": "SSI оптимистичен: при конфликте он ОТКАТИТ одну транзакцию с ошибкой 40001 (serialization failure). Если не ловить её и не делать retry — операции молча теряются под контеншеном. Нужен цикл повтора вокруг каждой SERIALIZABLE-транзакции.",
  "d": "Postgres с 9.1 реализует SERIALIZABLE как Serializable Snapshot Isolation: отслеживает опасные циклы зависимостей чтения-записи и на коммите рвёт одну из транзакций. Накладные малы (легче, чем 2PL). Но код, считающий любую ошибку БД фатальной, под нагрузкой будет ронять валидные операции. Ловим SQLSTATE 40001 и повторяем (с backoff, ограничением попыток).",
  "code": "for (int i=0; i<3; i++) {\n  try { runSerializable(tx); break; }\n  catch (SQLException e) {\n    if (\"40001\".equals(e.getSQLState())) continue; // retry\n    throw e;\n  }\n}"
 },
 {
  "id": "p-db-find-save-race",
  "t": "DB",
  "s": "lost update · read-modify-write",
  "q": "Почему ORM-паттерн find() + setX() + save() — это гонка, и как писать правильно?",
  "a": "find→change→save делает скрытый read-modify-write. Две параллельные транзакции читают старое значение, считают, и поздний save затирает ранний — потерянное обновление. Правильно: атомарный UPDATE с проверкой условия прямо в WHERE.",
  "d": "READ COMMITTED не защищает от lost update. Вместо чтения-в-коде-записи: UPDATE ... SET x=x-1 (атомарно в БД) или UPDATE ... WHERE status=$expected (проверка предусловия в WHERE, проверяй rows affected==1). Альтернативы: SELECT FOR UPDATE, оптимистичная блокировка через version, либо SERIALIZABLE. Postgres REPEATABLE READ сам ловит lost update и откатывает; MySQL REPEATABLE READ — нет (важно при смене стека).",
  "code": "-- плохо: read в коде, потом save\nvar o = repo.find(id); o.setStatus(CANCELLED); repo.save(o);\n\n-- хорошо: предусловие в WHERE, атомарно\nUPDATE orders SET status='CANCELLED'\nWHERE id=$1 AND status='PENDING'; -- rows==1?"
 },
 {
  "id": "p-cb-timeout",
  "t": "Distributed",
  "s": "Circuit Breaker",
  "q": "Поставил @CircuitBreaker на вызов медленного сервиса, а потоки всё равно висят и сервис падает. Почему CB не спас?",
  "a": "Потому что нет таймаута. CB считает ОШИБКИ, а зависший вызов — не ошибка, он просто висит. Без @Timeout поток ждёт ответа вечно, пул потоков забивается, CB даже не успевает открыться. Timeout превращает «вис» в ошибку, которую CB может посчитать.",
  "d": "Правило из Release It!: Circuit Breaker всегда в паре с Timeout. Timeout даёт быстрый fail (вис → exception), CB на основе этих ошибок открывается и перестаёт долбить мёртвый downstream. Без таймаута оба бесполезны — каскадный отказ через исчерпание потоков. Плюс нужен fallback на состояние Open.",
  "code": "@CircuitBreaker(requestVolumeThreshold=10, failureRatio=0.5,\n               delay=30, delayUnit=ChronoUnit.SECONDS)\n@Timeout(5000)            // без этого CB не видит «висы»\n@Fallback(fallbackMethod=\"queueToOutbox\")\npublic void sendToArchive(ArchiveRequest r){ cea.upload(r); }"
 },
 {
  "id": "p-cb-halfopen",
  "t": "Distributed",
  "s": "Circuit Breaker",
  "q": "CB открылся (Open). Как он узнаёт, что downstream ожил, не пропуская при этом весь трафик в мёртвый сервис?",
  "a": "Через состояние Half-Open. После delay CB пропускает НЕСКОЛЬКО пробных запросов. Успех → закрывается (Closed), снова трафик. Ошибка → опять Open и ждёт ещё delay. Так downstream получает «передышку» и не захлёбывается всем трафиком сразу при попытке восстановления.",
  "d": "Три состояния: Closed (считаем ошибки) → при N ошибок Open (мгновенный fail без вызова) → через delay Half-Open (пробники). Тонкость: если в Half-Open пустить ВЕСЬ трафик и сервис ещё хрупкий — снова уроним. Поэтому пробуем малой порцией. Подбор порогов (requestVolumeThreshold, failureRatio, delay) — главная боль: чувствительный = false positive, мягкий = не защищает."
 },
 {
  "id": "p-edm-notification",
  "t": "Distributed",
  "s": "Event-driven",
  "q": "Шлёшь «тонкое» событие (только id: «заказ изменился»), консьюмер дёргает producer за деталями. Что ты молча вернул в систему?",
  "a": "Временную связанность (temporal coupling). Тонкое уведомление заставляет консьюмера синхронно сходить к producer за данными — значит producer ДОЛЖЕН быть жив в момент обработки. Падает producer → встаёт консьюмер. Это ровно то, от чего уходили событиями.",
  "d": "Два стиля: Notification (id + «что случилось», нужен callback/RPC) vs Event-Carried State Transfer — событие несёт полное состояние, консьюмеру никто не нужен. ECST — дефолтный backbone декаплинга: убирает рантайм-зависимость от producer, консьюмер строит локальный read-model. Notification оправдан, когда payload огромный/чувствительный или событие редкое."
 },
 {
  "id": "p-edm-compaction",
  "t": "Distributed",
  "s": "Event-driven",
  "q": "Новый сервис подключается через 2 года. Как он получает АКТУАЛЬНОЕ состояние всех сущностей, не читая миллиарды старых событий?",
  "a": "Через log-compacted entity-стрим. Это поток, ключёванный по id сущности, где брокер хранит только ПОСЛЕДНЕЕ значение на ключ (старые подчищаются). Новый консьюмер реплеит его с offset 0 → быстро строит снимок «таблицы», потом тейлит живое. Удаление = tombstone (key→null).",
  "d": "Два вида стримов. Event-стрим: каждое событие, retention по времени → аудит/аналитика/саги. Entity-стрим: latest-per-key, compacted → перестраиваемая «таблица»/материализованный снимок, это read-side CQRS. Compaction не хранит историю, только текущее на ключ — поэтому bootstrap дешёвый. Так система «джойнится» спустя годы без обращения к источнику."
 },
 {
  "id": "p-edm-schema",
  "t": "Distributed",
  "s": "Schema evolution",
  "q": "Добавляешь поле в событие. Как НЕ сломать консьюмеров, которые ещё не обновились (и наоборот)?",
  "a": "Соблюдать совместимость. Backward (новый код читает старые данные) — новые поля только опциональные с дефолтом, ничего не удаляй/не переименовывай required. Forward (старый код читает новые данные) — старый просто игнорит незнакомые поля. Полная = обе сразу, нужна для общего backbone, где producer и консьюмеры катятся вразнобой.",
  "d": "Событие — это контракт («data on the outside»), не приватная JSON-структура. Schema registry + Avro/Protobuf/JSON-Schema, id схемы в записи для детерминированной десериализации. Breaking change (убрал/переименовал required поле, сменил тип) ⇒ новая версия события/новый топик, dual-publish, миграция консьюмеров, ретайр старого. Молча ломать провод нельзя — катятся независимо."
 },
 {
  "id": "p-cqrs-staleness",
  "t": "Distributed",
  "s": "CQRS",
  "q": "После записи команды юзер сразу делает GET — и не видит своих изменений. Это баг CQRS или ожидаемо?",
  "a": "Ожидаемо. В CQRS read-model — отдельная модель, наполняемая асинхронно из событий write-стороны. Есть replication lag: write прошёл, а проекция read-side ещё не догнала. Это eventual consistency, а не баг. «Read your own writes» CQRS из коробки НЕ гарантирует.",
  "d": "Write-модель хранит инварианты, read-модель — денормализованная под запросы, обновляется через подписку на domain events → между ними окно рассинхрона. Лечат: вернуть результат прямо из команды (не ходить в read-model сразу), читать свежее из write-side для критичных кейсов, версии/ETag для «дождись версии N», или просто принять lag в UI. Именно поэтому Fowler: «be very cautious about CQRS» — команда без опыта eventual consistency на этом обожжётся."
 },
 {
  "id": "p-stab-slow-vs-fail",
  "t": "Distributed",
  "s": "Slow Responses / Fail Fast",
  "q": "Почему медленный ответ опаснее, чем явная ошибка?",
  "a": "Ошибка освобождает поток сразу. А медленный ответ держит твой поток занятым всё время ожидания. Под нагрузкой все потоки виснут на тормозящей зависимости -> пул пуст -> сервис мёртв, хотя CPU простаивает. Лучше упасть быстро (fail fast), чем тормозить.",
  "d": "Slow Responses распространяются вверх по стеку: тормозит зависимость -> твои потоки блокируются (Blocked Threads) -> твой вызыватель тоже виснет (Cascading Failure). Юзер жмёт refresh -> ещё больше нагрузки. Лечение: таймаут на КАЖДЫЙ блокирующий вызов; \"слишком медленно\" считать ошибкой; SLA на latency, а не только на availability. Fail Fast = проверить здоровье/брейкер/ресурсы ДО дорогой работы и отказать сразу."
 },
 {
  "id": "p-stab-dogpile-jitter",
  "t": "Distributed",
  "s": "Dogpile / Jitter",
  "q": "Почему cron в :00 на всех нодах и одинаковый TTL кэша — это самострел, и при чём тут jitter?",
  "a": "Когда куча акторов делает одно и то же В ОДИН момент — рождается пик нагрузки (dogpile). Cron ровно в :00, все TTL истекают вместе, все клиенты переподключаются после сбоя. Решение: jitter — добавить каждому случайный сдвиг, чтобы размазать действия во времени.",
  "d": "Dogpile = синхронный самонаведённый спайк. Типичные источники: периодика по расписанию, массовый reconnect после outage, одновременный config-reload. Лечение: jitter (random offset) на каждое периодическое действие; staggered/рандомизированные TTL; exponential backoff ОБЯЗАТЕЛЬНО с jitter (иначе ретраи синхронизируются заново); request coalescing / single-flight на заполнение кэша (одна нода греет, остальные ждут результат), чтобы не было cache stampede.",
  "code": "// backoff С jitter, иначе ретраи снова совпадут\nlong base = Math.min(MAX, 100L << attempt);\nlong delay = ThreadLocalRandom.current().nextLong(base);\nThread.sleep(delay);"
 },
 {
  "id": "p-stab-backpressure-bounded",
  "t": "Distributed",
  "s": "Back Pressure / bounded queue",
  "q": "Почему любая очередь обязана быть ограниченной и что такое back pressure?",
  "a": "Безразмерная очередь при перегрузе растёт, жрёт память и в итоге OOM — ты просто отложил падение. Bounded queue, когда заполнена, ЗАМЕДЛЯЕТ/блокирует продюсера — это и есть back pressure: сигнал \"тормози\" идёт вверх по конвейеру, а не копится бесконечно.",
  "d": "Полная очередь -> один из трёх выборов: block (back pressure), shed (отбросить), reject (503). Через сетевую границу back pressure нужен протокол: Handshaking, HTTP 503 + Retry-After, flow control. Связка: bounded queue + Shed Load на эдже + Handshaking. Антипод — Unbounded Result Set: SELECT без LIMIT, ORM, лениво грузящий 10M строк, батч без границы. Всегда ставь LIMIT на сервере, не доверяй клиенту."
 },
 {
  "id": "p-saga-compensation",
  "t": "Distributed",
  "s": "Saga / компенсация",
  "q": "Почему компенсирующая транзакция в саге — это НЕ откат (rollback)?",
  "a": "В БД rollback стирает изменения, будто их не было. В саге каждый шаг уже закоммичен в своём сервисе — \"отменить\" нельзя. Компенсация — это НОВОЕ бизнес-действие, которое логически нейтрализует прошлое (не \"разгенерить\" PDF, а пометить \"аннулирован\" / выпустить storno).",
  "d": "Saga = цепочка локальных транзакций, каждая коммитится сразу. Нет 2PC, значит и нет атомарного отката. Свойства компенсаций: семантические (storno-проводка, отмена брони), часто НЕ полностью обратимые (письмо уже ушло), должны быть идемпотентны и сами могут падать -> ret-rability обязательна. Saga не изолирована: между шагами другие видят промежуточное состояние (dirty reads на уровне бизнеса) -> нужны семафоры/статусы PENDING. На практике оркестрация на Zeebe: BPMN описывает шаги и компенсации, Zeebe хранит состояние процесса."
 },
 {
  "id": "p-db-composite-order",
  "t": "DB",
  "s": "Composite index: = первым, range последним",
  "q": "Запрос WHERE created_at >= ? AND status = ?. Почему индекс (created_at, status) хуже, чем (status, created_at)?",
  "a": "В составном индексе после первой же колонки с диапазоном (>, <, BETWEEN) остальные перестают сужать поиск по дереву — становятся фильтром. (created_at, status): сначала диапазон по дате -> status уже только просеивает строки. (status, created_at): сначала точное равенство, потом диапазон по упорядоченным листьям -> узкий скан.",
  "d": "Правило: равенства слева, ОДИН диапазон — последним среди индексных предикатов. Access predicate (ходит по дереву и ограничивает скан листьев) vs filter predicate (просеивает уже прочитанные строки и выбрасывает). В EXPLAIN маркер беды — \"Rows Removed by Filter\". Бонус (status, created_at): WHERE status=$1 ORDER BY created_at LIMIT 20 берёт листья уже в нужном порядке -> без отдельного Sort, pipelined, быстрый LIMIT. Порядок колонок выбирают под самые важные запросы (включая их ORDER BY), а не по \"селективности\".",
  "code": "-- хорошо: = потом range, плюс ORDER BY бесплатно\nCREATE INDEX ix ON orders(status, created_at);\nSELECT * FROM orders\n WHERE status='NEW' AND created_at >= $1\n ORDER BY created_at LIMIT 20;   -- без Sort"
 },
 {
  "id": "p-db-unindexed-fk",
  "t": "DB",
  "s": "Unindexed FK / DELETE stall",
  "q": "FK у тебя есть, а индекса на нём нет. Почему DELETE родительской строки вдруг встаёт колом?",
  "a": "Postgres сам FK не индексирует. При DELETE/UPDATE родителя он обязан проверить, нет ли ссылающихся детей — и без индекса на дочерней FK-колонке делает ПОЛНЫЙ скан дочерней таблицы на каждую удаляемую строку. Большая таблица детей -> классический прод-затык.",
  "d": "PK enforce-ится индексом родителя автоматически, а вот дочернюю сторону FK ты должен проиндексировать сам. Зачем индекс на FK: (1) джойны parent->child идут по FK (Nested Loop -> один lookup на строку); (2) каскад/проверка ON DELETE/ON UPDATE сканирует детей. Правило: каждая FK на большой таблице — под индексом. Заодно почисти неиспользуемые индексы (pg_stat_user_indexes, idx_scan=0): каждый лишний — это write tax на INSERT/UPDATE/DELETE.",
  "code": "-- дочерняя FK без индекса = full scan детей на каждый parent DELETE\nCREATE INDEX ix_order_items_order_id\n  ON order_items(order_id);  -- order_id REFERENCES orders(id)"
 },
 {
  "id": "p-pg-hot-fillfactor",
  "t": "DB",
  "s": "HOT / fillfactor",
  "q": "Что такое HOT-update в Postgres и почему индексирование часто меняющейся колонки (status) — вредно?",
  "a": "UPDATE = новый tuple + старый помечен мёртвым. HOT (Heap-Only Tuple): если новый tuple влез на ТУ ЖЕ страницу И ни одна индексируемая колонка не менялась — Postgres НЕ трогает индексы, дёшево, меньше bloat. Индекс на status (меняется каждый раз) ломает HOT → каждый апдейт пишет во все индексы. Лечение: fillfactor=80 (запас на странице) + не индексировать колонки, что меняются всегда.",
  "d": "HOT-цепочка живёт внутри страницы: индекс указывает на старый ctid, а внутри страницы Postgres проходит по цепочке к актуальной версии. Условие HOT: (1) новый кортеж помещается на той же heap-странице (нужен fillfactor < 100, чтобы был запас), (2) НЕ изменилась ни одна колонка, входящая в любой индекс. Поэтому update-heavy таблицы: оставь fillfactor headroom и не вешай индекс на счётчики/status, если он не нужен запросам. Это снижает write-amplification и bloat индексов.",
  "code": "ALTER TABLE orders SET (fillfactor=80);\n-- НЕ создавай этот индекс, если status меняется каждый апдейт:\n-- CREATE INDEX ON orders(status);  -- убьёт HOT"
 },
 {
  "id": "p-pg-cic-invalid",
  "t": "DB",
  "s": "CREATE INDEX CONCURRENTLY",
  "q": "Почему обычный CREATE INDEX на проде — стоп-мир, и чем опасен CONCURRENTLY, если он упадёт?",
  "a": "Обычный CREATE INDEX берёт блокировку на запись (SHARE) — апдейты ждут, пока строится индекс. На горячей таблице это даунтайм. CREATE INDEX CONCURRENTLY строит без блокировки записи (2 прохода по таблице, дольше, больше I/O), но: НЕ работает внутри транзакции, а если упадёт — оставит НЕВАЛИДНЫЙ (indisvalid=false) индекс. Его надо DROP INDEX CONCURRENTLY и пересоздать, иначе он не используется, но тормозит апдейты.",
  "d": "Liquibase: changeSet помечают runInTransaction:false (иначе ошибка 'cannot run inside a transaction block'). Flyway: отдельная non-transactional миграция. После падения CIC: SELECT * FROM pg_index WHERE NOT indisvalid; — найти инвалидные, DROP INDEX CONCURRENTLY, повторить. Для перестроения распухшего индекса онлайн — REINDEX INDEX CONCURRENTLY.",
  "code": "-- вне транзакции (Liquibase runInTransaction:false)\nCREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_deadline\n  ON orders (payment_deadline) WHERE status='NEW';\n-- проверка инвалидных после падения:\nSELECT indexrelid::regclass FROM pg_index WHERE NOT indisvalid;"
 },
 {
  "id": "p-pg-skip-locked",
  "t": "DB",
  "s": "FOR UPDATE SKIP LOCKED",
  "q": "Десять воркеров разбирают очередь задач из таблицы. Почему обычный FOR UPDATE их выстроит в пробку, а SKIP LOCKED — нет?",
  "a": "Обычный SELECT ... FOR UPDATE на одних и тех же строках: воркер 2 ЖДЁТ, пока воркер 1 отпустит строку — все стоят в очереди за первой пачкой. SKIP LOCKED: пропускает уже залоченные строки и берёт следующие свободные → каждый воркер хватает СВОЮ пачку, никто не блокируется. Это каноничный паттерн очереди/outbox-relay на одной БД без отдельного брокера.",
  "d": "NOWAIT — кинуть ошибку вместо ожидания. SKIP LOCKED — тихо пропустить. Связка UPDATE ... RETURNING (или SELECT FOR UPDATE SKIP LOCKED + UPDATE) атомарно 'забирает' пачку. Минус: порядок обработки не строго FIFO (пропуски), и нельзя гарантировать, что строка обработается ровно раз без идемпотентности на стороне обработчика. Идеально для outbox-relay: WHERE sent_at IS NULL ... FOR UPDATE SKIP LOCKED LIMIT 100.",
  "code": "SELECT * FROM archive_outbox\nWHERE sent_at IS NULL\nORDER BY created_at\nFOR UPDATE SKIP LOCKED\nLIMIT 100;"
 },
 {
  "id": "p-pg-pgbouncer-txn",
  "t": "DB",
  "s": "PgBouncer transaction mode",
  "q": "Почему в PgBouncer transaction mode внезапно ломаются prepared statements, SET и temp-таблицы?",
  "a": "Каждый бэкенд Postgres — это процесс (5–10+ МБ). Тысяча клиентов = тысяча процессов = трэш по памяти и переключениям. PgBouncer в transaction mode выдаёт серверное соединение только на время ТРАНЗАКЦИИ — сотни клиентов делят маленький пул. Но между транзакциями соединение уходит другому клиенту → всё, что живёт в СЕССИИ (server-side prepared statements, SET, temp tables, advisory session-локи, LISTEN/NOTIFY), не переживает границу транзакции и ломается.",
  "d": "Лечение: SET LOCAL (живёт в рамках транзакции), protocol-level prepared statements (драйвер договаривается с pgbouncer), либо session mode для таких фич (но session mode пинит соединение на клиента — теряется смысл пула). Сайзинг: считают не клиентов, а активные запросы: Σ(pool_size × реплик) + резерв < max_connections. В Quarkus/Agroal держи jdbc.max-size маленьким на под (5–10), а не 100 — иначе при автоскейле подов суммарно упрёшься в max_connections."
 },
 {
  "id": "p-sql-null-not-in",
  "t": "DB",
  "s": "NULL в NOT IN",
  "q": "Почему запрос с NOT IN (подзапрос, где затесался NULL) внезапно возвращает ПУСТО, хотя данные есть?",
  "a": "NULL — это 'неизвестно', а не значение. x NOT IN (1,2,NULL) = x<>1 AND x<>2 AND x<>NULL, а x<>NULL даёт НЕ false, а UNKNOWN → всё условие никогда не true → 0 строк. То есть один NULL в подзапросе обнуляет весь результат. Это классическая ловушка 'Fear of the Unknown'. Лечение: NOT EXISTS вместо NOT IN, либо отфильтровать NULL в подзапросе (WHERE col IS NOT NULL).",
  "d": "Связанные грабли: col = NULL никогда не true (нужно IS NULL); col <> 'x' молча выкидывает строки с NULL; COUNT(col) не считает NULL. NOT EXISTS работает корректно с NULL и обычно ещё и оптимальнее. Не подменяй NULL магической заглушкой (-1, 'N/A') — она ломает агрегаты и типы. NULL — валидное намеренное состояние 'неизвестно/неприменимо'.",
  "code": "-- ловушка: вернёт пусто, если в clients есть NULL в client_id\nSELECT * FROM orders\nWHERE client_id NOT IN (SELECT client_id FROM clients);\n-- надёжно:\nSELECT * FROM orders o\nWHERE NOT EXISTS (SELECT 1 FROM clients c WHERE c.client_id = o.client_id);"
 },
 {
  "id": "p-obs-metric-cardinality",
  "t": "DevOps",
  "s": "Кардинальность метрик",
  "q": "Почему добавить user_id или order_id в label метрики Prometheus — способ положить мониторинг?",
  "a": "Каждая уникальная комбинация label'ов = отдельный временной ряд в памяти Prometheus. Поставил label=order_id → миллион заказов = миллион рядов на ОДНУ метрику → взрыв кардинальности, OOM мониторинга. Label — только для НИЗКОкардинальных измерений (статус, тип, endpoint, метод). Высококардинальное (user_id, trace_id, document_id) — место в логах и трейсах, не в метриках.",
  "d": "Правило: число рядов ≈ произведение мощностей всех label'ов. status(5)×method(4)×endpoint(20)=400 рядов — ок. Добавил user_id(1e6) → ×1e6 = катастрофа. Если нужна разбивка по конкретной сущности — это работа structured logs (фильтр по полю) или distributed tracing (поиск по trace_id), а не метрик. Для метрик на высоком трафике ещё помни про sampling трейсов (например 10%), чтобы не утопить бэкенд.",
  "code": "// ПЛОХО: взрыв рядов\nmeter.counter(\"docs\", \"orderId\", orderId).increment();\n// ХОРОШО: низкокардинальные label\nmeter.counter(\"docs\", \"type\", docType, \"status\", status).increment();"
 },
 {
  "id": "p-obs-cardinality-labels",
  "t": "DevOps",
  "s": "Prometheus / cardinality",
  "q": "Почему добавить client_id или order_id меткой (label) в метрику Prometheus — это бомба замедленного действия?",
  "a": "Каждая уникальная комбинация меток = отдельный временной ряд в памяти. client_id/order_id дают миллионы значений → миллионы рядов → Prometheus съедает RAM и падает (OOM). Метки только для ограниченных наборов: route, status, doc_type. А ID — в логи и в span трейса.",
  "d": "Кардинальность — число уникальных значений поля. Высокая кардинальность (user_id, trace_id) бесценна для дебага, но в metrics-системе каждый новый набор меток порождает новую time series, и память растёт линейно. Правило: метрики = низкая кардинальность (агрегаты), логи/спаны = высокая (контекст конкретного запроса). counter с route+status — ок; с client_id — взрыв.",
  "code": "// WRONG: миллионы рядов\nregistry.counter(\"requests\", \"client_id\", clientId).increment();\n// RIGHT: метки ограничены, ID — на span\nregistry.counter(\"requests\", \"route\", route, \"status\", status).increment();\nSpan.current().setAttribute(\"client_id\", clientId);"
 },
 {
  "id": "p-k8s-liveness-cheap",
  "t": "DevOps",
  "s": "k8s / liveness probe",
  "q": "Почему liveness-проба должна быть «дешёвой» и проверять только сам процесс, а не БД и соседние сервисы?",
  "a": "Liveness при провале РЕСТАРТИТ контейнер. Если в неё засунуть проверку БД — и БД моргнула, k8s одновременно перезапустит ВСЕ поды (restart-storm), хотя приложение было живо. Усиление аварии вместо лечения. Зависимости проверяй в readiness — она лишь убирает под из балансировки, без рестарта.",
  "d": "Liveness отвечает на вопрос «не завис ли процесс/дедлок?» → fail = restart container. Readiness — «могу ли я сейчас обслуживать трафик?» → fail = убрать из endpoints Service (без рестарта). Поэтому зависимости (БД, downstream) — место readiness. Liveness, дёргающая общую БД, превращает локальный сбой БД в каскадный рестарт всего флота = outage amplifier."
 },
 {
  "id": "p-obs-burn-rate",
  "t": "DevOps",
  "s": "SLO / error budget",
  "q": "Что такое burn rate и почему ждать «пробития SLO в конце месяца» — поздно?",
  "a": "Error budget = разрешённая доля плохого (1 − SLO). Burn rate — насколько быстро ты его тратишь относительно плана. Burn rate >1× = бюджет кончится раньше срока. Алерт ставят на быстрый burn (например >14.4× за час = 2% месячного бюджета за час), а не на сам факт пробития SLO — иначе узнаёшь, когда бюджет уже сгорел.",
  "d": "SLO — целевой уровень надёжности (99.5% запросов успешны и быстры за окно). Сигналом к действию служит СКОРОСТЬ выгорания бюджета, замеренная на коротком окне, а не нарушение SLO постфактум. <1× — здоровы, разработка пилит фичи; 1–14× — разбор в рабочее время, фриз рискованных деплоев; >14× — будим on-call, откатываем релиз. Классический пример: утечка памяти выжгла бюджет до −566%, традиционный мониторинг так и не сработал — нужен был burn rate за часы до."
 },
 {
  "id": "p-k8s-cpu-mem-qos",
  "t": "DevOps",
  "s": "k8s / requests-limits",
  "q": "Чем CPU отличается от памяти при превышении limit, и как QoS-класс решает, какой под убьют первым?",
  "a": "CPU сжимаем (compressible): превысил limit — тебя троттлят, замедляют, но не убивают. Память несжимаема: превысил limit — OOM-kill, под умирает. QoS по req/limit: BestEffort (нет req/lim) убивают первым → Burstable (req<lim) → Guaranteed (req==lim) убивают последним. Поэтому критичным сервисам ставь req==lim.",
  "d": "requests — гарантированная бронь под планировщик и QoS-пол; limits — жёсткий потолок. CPU при потолке дросселируется (можно «отнять» и вернуть), память отнять нельзя — поэтому единственный выход ядра при нехватке RAM это убить процесс. При node pressure kubelet вытесняет в порядке QoS. Не задал requests → планировщик переуплотняет ноду и вытесняет под нагрузкой; не задал limits → один шумный под голодит всю ноду. Для JVM держи heap ≤ memory limit, иначе OOM-kill вместо OutOfMemoryError.",
  "code": "resources:\n  requests: {cpu: 100m, memory: 256Mi}  # бронь + QoS-пол\n  limits:   {cpu: 500m, memory: 256Mi}  # mem==req → Guaranteed"
 },
 {
  "id": "p-k8s-sigterm-drain",
  "t": "DevOps",
  "s": "k8s / graceful shutdown",
  "q": "Что происходит между «pod удаляют» и SIGKILL, и почему рвутся запросы без preStop и обработки SIGTERM?",
  "a": "При остановке: под убирают из endpoints → preStop hook → SIGTERM → grace period (по умолч. 30с) → SIGKILL. Удаление из балансировки и SIGTERM НЕ атомарны: трафик ещё долетает к уже выключающемуся поду. preStop (sleep 5) даёт LB обновиться. А приложение ОБЯЗАНО ловить SIGTERM: перестать брать новое, дослать in-flight, закрыть коннекты, exit 0. Иначе — оборванные запросы.",
  "d": "Большинство «k8s-флакости» — это незакрытый дренаж: либо нет health-проб, либо проигнорирован SIGTERM. Гонка в том, что endpoint-removal распространяется по кластеру асинхронно, а SIGTERM прилетает сразу — короткий preStop sleep перекрывает окно, пока балансировщик ещё шлёт трафик. PID 1 получит SIGTERM, только если это сам процесс (shell-обёртка проглотит сигнал — нужен exec-форма или dumb-init). Не успел уложиться в terminationGracePeriodSeconds — прилетит SIGKILL и оборвёт незавершённое. Для Kafka-консьюмеров: на SIGTERM остановить poll, докоммитить оффсеты."
 },
 {
  "id": "p-trace-propagation-islands",
  "t": "Distributed",
  "s": "tracing / context propagation",
  "q": "Почему trace_id, сгенерированный в сервисе, но не проброшенный в исходящие вызовы, превращает трейс в «острова»?",
  "a": "Trace связывается общим trace_id, который течёт в заголовках (W3C traceparent в HTTP, headers в Kafka). Если сгенерил ID локально и не положил в исходящий REST/Kafka — каждый следующий сервис стартует НОВЫЙ корневой span, не связанный с твоим. Вместо одной waterfall-цепочки получаешь набор разрозненных островов, и где тормозит — не видно.",
  "d": "Span — единица работы одного сервиса; spans связаны parent-child через trace_id + span_id, образуя дерево одного запроса. Обязательные поля span: trace_id, span_id, parent_id, timestamp, duration. Quarkus OpenTelemetry автоинструментирует JAX-RS/JDBC/Kafka и сам прокидывает traceparent. Но через Zeebe/Camunda контекст автоматически НЕ пропагируется — trace_id кладут вручную в переменные процесса, иначе цепочка рвётся на оркестраторе. Локальный random-UUID, который никуда не отправляется, бесполезен для распределённого трейса.",
  "code": "// Kafka: контекст должен уехать в headers сообщения\n// (quarkus-opentelemetry делает это сам для JAX-RS/Kafka)\n// Zeebe: вручную\njobClient.newCompleteCommand(job)\n  .variables(Map.of(\"traceparent\", Span.current()...));"
 },
 {
  "id": "alg-binsearch",
  "t": "Algorithms",
  "s": "complexity",
  "q": "Как работает бинарный поиск и его сложность?",
  "a": "Массив должен быть ОТСОРТИРОВАН. Берём элемент в середине. Если искомое меньше — выкидываем правую половину, если больше — левую. Так каждый шаг режет диапазон пополам. Из 1000 элементов хватит ~10 шагов.",
  "d": "Сложность O(log n): на каждом шаге остаётся половина. 1024 → 512 → 256 → ... → 1 = 10 делений, потому что log2(1024)=10. Линейный поиск (без сортировки) дал бы до 1024 проверок — O(n). Цена: массив должен быть отсортирован заранее. Память O(1) для итеративной версии.",
  "code": "// массив отсортирован по возрастанию\nint binarySearch(int[] a, int key) {\n    int lo = 0, hi = a.length - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2; // середина без переполнения\n        if (a[mid] == key) return mid;     // нашли\n        if (a[mid] < key)  lo = mid + 1;   // отбросили левую половину\n        else               hi = mid - 1;   // отбросили правую половину\n    }\n    return -1; // не найдено\n}"
 },
 {
  "id": "alg-bst",
  "t": "Algorithms",
  "s": "structures",
  "q": "Бинарное дерево поиска (BST) — как устроено?",
  "a": "BST — это дерево, где у каждого узла слева числа меньше, справа больше. Ищешь число — на каждом шаге идёшь влево или вправо, отбрасывая половину. Поэтому поиск быстрый: O(log n). Но если вставлять уже отсортированные данные подряд, дерево вытягивается в цепочку (список) и становится медленным: O(n).",
  "d": "Свойство BST: для ЛЮБОГО узла все ключи в левом поддереве < узла < все ключи в правом. Поиск/вставка идут по высоте дерева. У сбалансированного дерева высота ~log n → O(log n). Но balance не гарантирован: вставка 1,2,3,4,5 даёт правую «лесенку» высотой n → O(n), то есть обычный список. Лечится самобалансирующимися деревьями (AVL, красно-чёрное), которые держат высоту ~log n автоматически.",
  "code": "// Поиск в BST: O(h), h — высота\nNode search(Node n, int key) {\n    while (n != null) {\n        if (key == n.val) return n;       // нашли\n        n = key < n.val ? n.left : n.right; // влево или вправо\n    }\n    return null; // нет такого ключа\n}\n// insert(1),insert(2),insert(3)... → дерево вырождается в список → O(n)"
 },
 {
  "id": "alg-balanced",
  "t": "Algorithms",
  "s": "structures",
  "q": "Зачем сбалансированные деревья (AVL, red-black)?",
  "a": "Если вставлять в обычный BST уже отсортированные числа, он превращается в «список» — поиск становится O(n), медленно. AVL и red-black после вставки делают повороты и держат высоту ~log n. Поэтому поиск/вставка всегда O(log n). В Java на red-black работают TreeMap и «озеленённые» бакеты HashMap.",
  "d": "Обычный BST не знает о балансе: вставляешь 1,2,3,4,5 — каждый новый узел уходит вправо, дерево вытягивается в цепочку высотой n, и поиск деградирует с O(log n) до O(n). Самобалансирующиеся деревья при каждой вставке/удалении проверяют инвариант и чинят его поворотами (rotation) — локальной перестройкой 2-3 узлов за O(1). AVL держит строгий баланс (разница высот поддеревьев ≤ 1) — быстрее ищет, но чаще вращает. Red-black слабее балансирует (через раскраску узлов), зато реже перестраивается — выгоднее при частых записях. Высота гарантированно O(log n), значит все операции O(log n). В JDK: TreeMap/TreeSet — это red-black дерево; а в HashMap, когда в одном бакете накапливается ≥8 коллизий, связный список «озеленяется» (treeify) в red-black дерево, чтобы худший случай поиска по бакету был O(log n), а не O(n).",
  "code": "// Вырождение обычного BST: вставляем по возрастанию\n// 1 -> 2 -> 3 -> 4 -> 5  (фактически связный список, поиск O(n))\n\n// JDK: эти структуры держат O(log n) сами (red-black внутри)\nTreeMap<Integer, String> map = new TreeMap<>();  // red-black tree\nmap.put(1, \"a\"); map.put(2, \"b\"); map.put(3, \"c\");\nmap.get(2);  // гарантированно O(log n), без вырождения\n\n// HashMap: бакет с >=8 коллизиями превращается из списка в дерево\nHashMap<Key, Val> h = new HashMap<>();  // treeify -> red-black bucket"
 },
 {
  "id": "alg-btree-ds",
  "t": "Algorithms",
  "s": "structures",
  "q": "B-tree — почему его используют БД и файловые системы?",
  "a": "B-дерево складывает в один узел сразу МНОГО ключей. Поэтому дерево не высокое, а широкое: чтобы найти нужный ключ среди миллионов, хватает 3-4 шага вниз. Каждый шаг — это чтение с диска, а диск медленный. Мало шагов = мало чтений = быстро. Так устроены индексы в БД.",
  "d": "Диск читает не по байту, а блоками (страницами ~8-16 КБ). B-дерево делает узел размером в одну страницу, поэтому за одно чтение тянет сотни ключей. Высота h ≈ log_B(N): при ветвлении B=100 и 1 млн ключей высота ~3. Бинарное дерево (B=2) дало бы высоту ~20 — в разы больше обращений к диску. B+tree (вариант для БД) хранит данные только в листьях, а листья связаны в список → быстрые range-сканы (BETWEEN, ORDER BY). Балансировка идёт через split/merge узлов, поэтому высота остаётся ровной у всех веток.",
  "code": "-- индекс в БД = B+tree под капотом\nCREATE INDEX idx_orders_client ON orders(client_id);\n-- поиск по индексу: ~3-4 чтения вместо полного скана таблицы\nSELECT * FROM orders WHERE client_id = 42;\n-- range-скан тоже быстрый: листья B+tree связаны в список\nSELECT * FROM orders WHERE client_id BETWEEN 10 AND 50;"
 },
 {
  "id": "alg-hashtable",
  "t": "Algorithms",
  "s": "structures",
  "q": "Хеш-таблица — за счёт чего O(1)?",
  "a": "Ключ прогоняешь через hash-функцию — получаешь число, оно сразу указывает на номер ячейки (бакета). Не ищешь по всем, а прыгаешь прямо в нужную — потому в среднем O(1). Если два ключа дали один номер — там цепочка, проверяешь её.",
  "d": "hash(key) → число, потом `число % размер_массива` = индекс бакета. Доступ к массиву по индексу = O(1), поэтому поиск/вставка/удаление в среднем O(1).\n\nКоллизии (разные ключи → один бакет) решают:\n- цепочкой (linked list в бакете) — обходишь короткий список;\n- деревом (в Java HashMap при ≥8 элементах в бакете список превращается в red-black tree → O(log n) вместо O(n)).\n\nДеградация: плохой hash (все ключи в один бакет) → длинная цепочка → O(n). Переполнение (много элементов на бакет, высокий load factor ~0.75) → resize: создаётся массив побольше и все элементы перераскладываются (rehash), это дорогая O(n) операция, но редкая → амортизированно остаётся O(1).",
  "code": "Map<String,Integer> m = new HashMap<>();\nm.put(\"Алия\", 100);   // hash(\"Алия\") -> индекс бакета -> кладём\nint v = m.get(\"Алия\"); // hash снова -> тот же бакет -> O(1)\n// плохой случай: все ключи в один бакет -> обход цепочки -> O(n)"
 },
 {
  "id": "alg-bfs",
  "t": "Algorithms",
  "s": "graphs",
  "q": "BFS (обход в ширину) — как и когда?",
  "a": "BFS идёт по графу «кругами» от старта: сначала соседи, потом соседи соседей. Берём вершину из ОЧЕРЕДИ, ставим её непосещённых соседей в хвост, помечаем посещённые. В невзвешенном графе так находишь КРАТЧАЙШИЙ путь (по числу рёбер).",
  "d": "Очередь (FIFO) держит «фронт» — текущий слой. Поскольку соседи обрабатываются строго по порядку добавления, вершины открываются по возрастанию расстояния от старта: уровень 0, 1, 2… Поэтому первое достижение вершины = кратчайший путь в рёбрах (для взвешенных рёбер нужен Дейкстра). Сложность O(V+E). Память O(V) — в худшем случае в очереди лежит самый широкий слой графа (ширина), поэтому на «широких» графах память больше, чем у DFS.",
  "code": "// BFS: кратчайший путь в рёбрах от start\nQueue<Integer> q = new ArrayDeque<>();\nint[] dist = new int[n];\nArrays.fill(dist, -1);        // -1 = не посещена\ndist[start] = 0;\nq.add(start);\nwhile (!q.isEmpty()) {\n    int v = q.poll();          // берём из головы\n    for (int u : adj[v]) {\n        if (dist[u] == -1) {   // ещё не открыта\n            dist[u] = dist[v] + 1;\n            q.add(u);          // в хвост — следующий слой\n        }\n    }\n}"
 },
 {
  "id": "alg-dfs",
  "t": "Algorithms",
  "s": "graphs",
  "q": "DFS (обход в глубину) — как и когда?",
  "a": "Идёшь по лабиринту: ныряешь в первый коридор до тупика, упёрся — пятишься назад к развилке и пробуешь следующий. Это DFS: вглубь до упора, потом откат. Стек (или рекурсия) помнит, куда вернуться. Память — примерно длина текущего пути (глубина).",
  "d": "DFS = depth-first search. Двигатель — стек: рекурсия использует стек вызовов, итеративный вариант — явный Stack. Помечаем посещённые узлы (visited), чтобы не зациклиться. Память O(глубины) для пути плюс O(V) на visited — это плюс против BFS, где очередь хранит весь «фронт» (может быть O(ширины)). Где применяют: поиск циклов (узел в текущем пути = цикл), топологическая сортировка (порядок после выхода из узла), перебор всех путей/комбинаций (backtracking), обход дерева. Важно: DFS НЕ даёт кратчайший путь в невзвешенном графе — для этого BFS. Сложность обхода O(V+E).",
  "code": "// DFS рекурсией: обход графа (список смежности)\nvoid dfs(int v, List<List<Integer>> adj, boolean[] seen) {\n    seen[v] = true;\n    System.out.println(\"посетили \" + v);\n    for (int next : adj.get(v)) {\n        if (!seen[next]) dfs(next, adj, seen); // уходим вглубь\n    }\n    // вернулись назад — пробуем следующего соседа\n}\n\n// Итеративно через явный стек:\nvoid dfsIter(int start, List<List<Integer>> adj, boolean[] seen) {\n    Deque<Integer> stack = new ArrayDeque<>();\n    stack.push(start);\n    while (!stack.isEmpty()) {\n        int v = stack.pop();\n        if (seen[v]) continue;\n        seen[v] = true;\n        for (int next : adj.get(v)) stack.push(next);\n    }\n}"
 },
 {
  "id": "alg-dp",
  "t": "Algorithms",
  "s": "techniques",
  "q": "Динамическое программирование — суть?",
  "a": "ДП — это «не считай дважды». Большая задача дробится на мелкие, и одни и те же мелкие повторяются. Решил один раз — записал ответ, потом просто берёшь готовое. Так перебор-экспонента превращается в быстрый проход.",
  "d": "ДП работает, когда есть 2 свойства: (1) оптимальная подструктура — ответ к большой задаче собирается из ответов к подзадачам; (2) перекрывающиеся подзадачи — одни и те же подзадачи встречаются много раз. Два способа: мемоизация (top-down) — обычная рекурсия + кеш, считаем лениво по требованию; таблица (bottom-up) — заполняем массив от базы вверх, без рекурсии. Фибоначчи наивно: fib(n)=fib(n-1)+fib(n-2) пересчитывает одно и то же → дерево вызовов ~2^n. С кешем каждое значение считается ровно раз → O(n) времени, O(n) или даже O(1) памяти.",
  "code": "// bottom-up: O(n) время, O(1) память\nlong fib(int n) {\n    if (n < 2) return n;\n    long a = 0, b = 1;\n    for (int i = 2; i <= n; i++) {\n        long next = a + b; // используем готовые подзадачи\n        a = b;\n        b = next;\n    }\n    return b;\n}"
 },
 {
  "id": "alg-two-ptr",
  "t": "Algorithms",
  "s": "techniques",
  "q": "Приём «два указателя» — для чего?",
  "a": "Два пальца идут по отсортированному ряду: один слева, другой справа. Сумма больше нужной — двигаем правый влево, меньше — левый вправо. Так за один проход (O(n)) находим пару, без перебора всех пар.",
  "d": "Работает потому, что массив отсортирован: сдвиг указателя гарантированно меняет сумму в нужную сторону, поэтому ни одну валидную пару не пропустим. Варианты: два конца навстречу (пара с заданной суммой, проверка палиндрома) или «быстрый/медленный» — один догоняет другой (удаление дубликатов, скользящее окно/подмассив). Замена вложенного цикла O(n^2) на один проход O(n). Память O(1).",
  "code": "// отсортированный массив, ищем пару с суммой = target\nint l = 0, r = a.length - 1;\nwhile (l < r) {\n    int sum = a[l] + a[r];\n    if (sum == target) return new int[]{l, r};\n    if (sum < target) l++;   // мало — двигаем левый вправо\n    else               r--;  // много — двигаем правый влево\n}\nreturn null; // O(n), без вложенного цикла"
 },
 {
  "id": "alg-sliding",
  "t": "Algorithms",
  "s": "techniques",
  "q": "Скользящее окно (sliding window) — когда применять?",
  "a": "Окно [l,r] — кусок массива/строки. Двигаешь правый край вперёд и добавляешь элемент. Если условие сломалось (например, сумма > k или буква повторилась) — двигаешь левый край, пока не починится. Каждый элемент входит и выходит один раз → O(n), а не O(n²).",
  "d": "Применяй, когда ищешь подстроку/подмассив подряд (contiguous) с условием: самый длинный/короткий, сумма = k, без повторов. Два указателя l и r. Внутри окна держишь состояние (сумма, счётчик символов, set). r всегда едет вперёд; l догоняет только при нарушении и никогда не откатывается назад — отсюда суммарно 2n шагов. НЕ подходит, если порядок не важен или элементы можно брать не подряд.",
  "code": "// Самый длинный подмассив с суммой <= k (числа >= 0)\nint l = 0, sum = 0, best = 0;\nfor (int r = 0; r < a.length; r++) {\n    sum += a[r];               // расширяем правую границу\n    while (sum > k) {          // условие нарушено\n        sum -= a[l++];         // подтягиваем левую\n    }\n    best = Math.max(best, r - l + 1);\n}\nreturn best;                   // O(n): каждый i входит и выходит 1 раз"
 },
 {
  "id": "alg-greedy",
  "t": "Algorithms",
  "s": "techniques",
  "q": "Жадный алгоритм — идея и риск?",
  "a": "Жадный алгоритм на каждом шаге хватает то, что выглядит лучшим прямо сейчас, не думая о будущем. Это быстро и просто. Но локально лучшее не всегда даёт лучший итог: жадность работает только если у задачи есть «свойство жадного выбора».",
  "d": "Жадность даёт ГАРАНТИРОВАННО верный ответ только когда задача обладает двумя свойствами: (1) свойство жадного выбора — глобальный оптимум можно собрать из локально оптимальных шагов; (2) оптимальная подструктура — оптимум задачи содержит оптимумы подзадач. Примеры, где жадность работает: код Хаффмана, MST (Краскал/Прим), Дейкстра (без отрицательных рёбер), размен монетами в «канонической» системе. Где ломается: размен монетами {1,3,4} на сумму 6 — жадность даёт 4+1+1=3 монеты, а оптимум 3+3=2 монеты; задача о рюкзаке 0/1. Если свойства нет — берут динамическое программирование или backtracking.",
  "code": "// Размен суммы 6, монеты {1,3,4}\n// Жадный: берём самую крупную\nint[] coins = {4, 3, 1};\nint sum = 6, cnt = 0;\nfor (int c : coins)\n    while (sum >= c) { sum -= c; cnt++; }\n// Жадность: 4+1+1 -> 3 монеты (НЕ оптимум!)\n// Оптимум (через ДП): 3+3 -> 2 монеты"
 },
 {
  "id": "alg-heap-pq",
  "t": "Algorithms",
  "s": "structures",
  "q": "Куча (priority queue) — зачем?",
  "a": "Куча — это «полка», где всегда сверху самый главный (min или max). Кинул элемент — он сам всплывёт/утонет на своё место. Взять верхнего — мгновенно. Не сортирует всё подряд, держит «лучшего» наготове. Вставка/удаление — O(log n), глянуть верх — O(1).",
  "d": "Бинарная куча — почти полное двоичное дерево, хранится в массиве: у элемента i дети 2i+1 и 2i+2. Инвариант: родитель ≤ детей (min-heap) или ≥ (max-heap). Вставка кладёт элемент в конец и «всплывает» (sift-up); извлечение корня ставит на его место последний элемент и «топит» (sift-down) — оба за O(log n), т.к. высота дерева log n. Пик (peek) корня — O(1). Зачем: топ-K за O(n log k), очередь с приоритетом, Дейкстра (достаём ближайшую вершину). Куча не даёт полного порядка — только быстрый доступ к экстремуму, поэтому дешевле полной сортировки, когда нужен лишь «лучший».",
  "code": "// min-heap по умолчанию: сверху наименьший\nPriorityQueue<Integer> pq = new PriorityQueue<>();\npq.add(5); pq.add(1); pq.add(3);\npq.peek();   // 1  — O(1), не удаляет\npq.poll();   // 1  — O(log n), удаляет верх\n\n// max-heap: сверху наибольший\nPriorityQueue<Integer> max = new PriorityQueue<>(Comparator.reverseOrder());"
 },
 {
  "id": "jc-transient",
  "t": "Java",
  "s": "core",
  "q": "transient и сериализация — что делает transient?",
  "a": "Поле с `transient` НЕ сохраняется при сериализации — Java его пропускает. Когда объект восстанавливают из потока, это поле получает значение по умолчанию: null (для объектов), 0 (для чисел), false (для boolean). Используют для паролей, кешей и ссылок на несериализуемые объекты.",
  "d": "Сериализация (`Serializable`) превращает объект в байты для записи на диск или отправки по сети. По умолчанию пишутся ВСЕ поля. `transient` помечает поле как «пропустить». Зачем: 1) безопасность — не лить пароль/токен в файл; 2) производные данные — кеш можно пересчитать, нет смысла хранить; 3) технически — поле ссылается на объект, который сам не Serializable (иначе будет NotSerializableException). При десериализации конструктор НЕ вызывается, поэтому transient-поле остаётся дефолтным; восстановить его можно вручную в `readObject()`. Аналог `transient` в JPA/Hibernate — другая тема (исключение из маппинга в БД), не путать.",
  "code": "class User implements Serializable {\n    String login;              // сохранится\n    transient String password; // пропустится\n\n}\n// после записи и чтения из потока:\n// user.login    -> \"ivan\"\n// user.password -> null   (значение по умолчанию)"
 },
 {
  "id": "jvm-jre-jdk",
  "t": "JVM",
  "s": "memory",
  "q": "JVM vs JRE vs JDK — в чём разница?",
  "a": "JVM — мотор, который крутит твой Java-код (байткод). JRE = мотор + готовые запчасти (библиотеки), чтобы программу ЗАПУСКАТЬ. JDK = JRE + станок javac и инструменты, чтобы программу СОБИРАТЬ и РАЗРАБАТЫВАТЬ. Пишешь код → нужен JDK. Только запускаешь → хватит JRE.",
  "d": "Вложенность: JDK ⊃ JRE ⊃ JVM. JVM исполняет платформо-независимый байткод (.class), поэтому \"написал раз — запускай везде\". javac (в JDK) превращает .java → .class; java (в JRE) запускает JVM и грузит .class. Прочие инструменты JDK: jar, javadoc, jdb, jshell. С Java 11 отдельный публичный JRE убрали — обычно ставят полный JDK.",
  "code": "// Hello.java\njavac Hello.java   // JDK: компилируем .java -> Hello.class (байткод)\njava Hello         // JRE/JVM: запускаем байткод"
 },
 {
  "id": "sp-stereotypes",
  "t": "Spring",
  "s": "di",
  "q": "@Component / @Repository / @Service / @Controller — разница?",
  "a": "Все четыре — это бины (@Component при сканировании). Spring их находит и кладёт в контейнер одинаково. Разница — смысловая метка слоя: @Repository = работа с БД, @Service = бизнес-логика, @Controller = веб (HTTP/MVC). @Component — когда слой не подходит ни под один.",
  "d": "Технически важное отличие даёт только @Repository: к нему применяется PersistenceExceptionTranslationPostProcessor — нативные исключения БД/JPA транслируются в иерархию Spring DataAccessException (unchecked). @Service и @Controller на сегодня семантические маркеры без особого поведения (читаются человеком и инструментами). @RestController = @Controller + @ResponseBody (возвращает тело, а не имя view). @Controller сканируется Spring MVC для маршрутизации запросов. Все аннотации мета-аннотированы @Component, поэтому подхватываются @ComponentScan. Можно везде поставить @Component и приложение заработает — но потеряешь читаемость слоёв и трансляцию исключений в репозиториях.",
  "code": "@Repository          // + трансляция исключений БД → DataAccessException\nclass UserRepo { /* SQL/JPA */ }\n\n@Service             // бизнес-логика\nclass UserService { UserService(UserRepo r){} }\n\n@Controller          // веб-слой MVC (@RestController = + @ResponseBody)\nclass UserController { UserController(UserService s){} }\n\n@Component           // всё остальное (хелпер, конфиг-объект)\nclass Mapper {}"
 },
 {
  "id": "sp-mapping-anno",
  "t": "Spring",
  "s": "boot",
  "q": "@GetMapping vs @RequestMapping?",
  "a": "@RequestMapping — общий: вешается на класс/метод, метод задаёшь руками: method=GET. @GetMapping — это просто короткая запись @RequestMapping(method=GET), читается яснее. Для остальных глаголов есть @Post/@Put/@Delete/@PatchMapping.",
  "d": "@RequestMapping универсален: на классе задаёт общий префикс пути (например /api), на методе — конкретный путь и HTTP-метод через method=RequestMethod.GET. Если method не указать, метод ловит ВСЕ глаголы — это частая ошибка. @GetMapping и компания (@PostMapping, @PutMapping, @DeleteMapping, @PatchMapping) появились в Spring 4.3 как готовые сокращения: один глагол, меньше шума, сложнее ошибиться. Префикс класса всё равно обычно задают через @RequestMapping. Практика: класс — @RequestMapping(\"/path\"), методы — @GetMapping/@PostMapping и т.д.",
  "code": "@RestController\n@RequestMapping(\"/users\")   // общий префикс на класс\nclass UserController {\n\n    // длинно\n    @RequestMapping(value = \"/{id}\", method = RequestMethod.GET)\n    User getOld(@PathVariable Long id) { ... }\n\n    // то же самое, короче и читаемее\n    @GetMapping(\"/{id}\")\n    User get(@PathVariable Long id) { ... }\n\n    @PostMapping\n    User create(@RequestBody User u) { ... }\n}"
 },
 {
  "id": "sp-criteria",
  "t": "Spring",
  "s": "data",
  "q": "Criteria API / JPA Specification — зачем?",
  "a": "Фильтры у юзера разные: то по имени, то по цене, то по всему сразу — заранее не знаешь. Вместо склейки строк JPQL руками собираешь запрос объектами (cb.equal, cb.like). Компилятор проверяет типы. Spring Data заворачивает это в Specification — кидаешь её в репозиторий, и фильтры комбинируются как кубики.",
  "d": "Criteria API — это построение JPQL-запроса через Java-объекты (CriteriaBuilder, Root, Predicate) вместо текста. Плюсы: типобезопасность (опечатку в имени поля ловит компилятор, особенно с metamodel), нет ручной конкатенации и SQL-инъекций, легко добавлять условия по if. Минус: многословно и менее читаемо, чем JPQL. Spring Data JPA даёт интерфейс Specification<T> — одна спека = один Predicate; репозиторий наследует JpaSpecificationExecutor, и спеки комбинируются через .and()/.or(). Идеально для динамических фильтров (поиск с кучей опциональных полей). Для статических запросов проще @Query или derived-методы — Criteria туда не тащи.",
  "code": "// Каждое поле опционально → собираем условия в рантайме\nSpecification<User> spec = Specification.where(null);\nif (name != null)\n    spec = spec.and((root, q, cb) -> cb.like(root.get(\"name\"), \"%\"+name+\"%\"));\nif (minAge != null)\n    spec = spec.and((root, q, cb) -> cb.ge(root.get(\"age\"), minAge));\n\nuserRepo.findAll(spec); // repo extends JpaSpecificationExecutor&lt;User&gt;"
 },
 {
  "id": "sp-di-types",
  "t": "Spring",
  "s": "di",
  "q": "Constructor / setter / field инъекция — что лучше?",
  "a": "Бери constructor (через конструктор). Зависимости делаешь final — их не подменишь, объект сразу рабочий, без них не создашь. Тестируешь без Spring: new Service(mockRepo). @Autowired на поле короче, но прячет зависимости и ломает тесты. setter — только для необязательных.",
  "d": "Почему constructor — дефолт:\n- final + обязательность: компилятор гарантирует, что поле задано, объект всегда в валидном состоянии (нет «полусобранного» бина с null).\n- Тест без контейнера: просто new MyService(mock) — не нужен @SpringBootTest или рефлексия.\n- Честность зависимостей: длинный конструктор = сигнал «слишком много обязанностей» (намёк на god class). Field-инъекция этот запах прячет.\n- Spring 4.3+: если конструктор один, @Autowired над ним писать не нужно.\n\nField (@Autowired на поле): короче, но зависимости не final, бин можно создать в невалидном состоянии, для теста нужна рефлексия/контейнер, легко получить циклические зависимости незаметно.\n\nSetter: для опциональных или переопределяемых зависимостей; поле не может быть final.\n\nЦиклы: при constructor-инъекции круговая зависимость падает на старте (это хорошо — видно сразу). При field — Spring её «проглатывает», проблема всплывает позже.",
  "code": "// РЕКОМЕНДУЕТСЯ: constructor\n@Service\nclass OrderService {\n    private final OrderRepo repo;      // final — обязательна\n    OrderService(OrderRepo repo) {     // 1 конструктор -> @Autowired не нужен\n        this.repo = repo;\n    }\n}\n// тест без Spring:\nnew OrderService(mock(OrderRepo.class));\n\n// FIELD: короче, но прячет зависимость, не final, тест требует рефлексии\n@Service\nclass OrderService {\n    @Autowired private OrderRepo repo;\n}\n\n// SETTER: только для опциональных\n@Autowired(required = false)\nvoid setCache(Cache c) { this.cache = c; }"
 },
 {
  "id": "web-http-versions",
  "t": "Web",
  "s": "http",
  "q": "HTTP/1.1 vs HTTP/2 vs HTTP/3 — что ускоряли?",
  "a": "HTTP/1.1: один запрос в соединении ждёт другого (очередь). HTTP/2: много запросов разом в одном TCP, бинарь, сжатые заголовки. HTTP/3: тот же мультиплекс, но на QUIC (UDP) — потеря пакета не тормозит остальные потоки и соединение встаёт быстрее.",
  "d": "Главная боль — head-of-line blocking (HOL): «голова очереди тормозит хвост».\n\nHTTP/1.1: одно соединение = одна очередь запросов. Браузер обходил это, открывая 6 TCP-соединений на хост — дорого. Заголовки текстовые, без сжатия.\n\nHTTP/2: один TCP, но логически делится на потоки (streams) — много запросов/ответов параллельно, чередуются кадрами (frames). Бинарный формат + HPACK (сжатие заголовков). НО HOL остался на уровне TCP: потерялся один пакет — TCP держит ВСЕ потоки, пока его не переотправят.\n\nHTTP/3: переезжает с TCP на QUIC поверх UDP. У QUIC потоки независимы на транспорте — потеря пакета бьёт только по своему потоку, остальные едут. Плюс рукопожатие быстрее: TLS встроен в QUIC, соединение ставится за 1 RTT (или 0-RTT при повторе) вместо TCP+TLS отдельно. Бонус — connection migration: смена Wi-Fi→LTE не рвёт соединение.",
  "code": "// HTTP-клиент в Java: выбираем версию протокола\nHttpClient client = HttpClient.newBuilder()\n    .version(HttpClient.Version.HTTP_2)   // дефолт, с фолбэком на 1.1\n    .build();\n// JDK пока не умеет HTTP/3 из коробки —\n// нужен внешний клиент (напр. на Netty) либо ожидание поддержки."
 },
 {
  "id": "web-cors",
  "t": "Web",
  "s": "security",
  "q": "Что такое CORS и зачем?",
  "a": "Браузер сам по себе НЕ даёт твоему JS читать ответ с чужого сайта (другой домен, порт или http/https). Это правило \"same-origin\". CORS — это когда чужой сервер отвечает заголовком \"ему можно\" и пускает именно тебя. Защита для пользователя браузера, не для сервера.",
  "d": "Origin = схема + домен + порт (https://a.com:443). Если хоть одно отличается — origin чужой. Браузер всё равно ОТПРАВЛЯЕТ запрос, но без CORS-разрешения прячет ответ от JS (видишь ошибку в консоли). Сервер заголовками говорит, кому можно: Access-Control-Allow-Origin (какие origin), -Methods (GET/POST/...), -Headers. Для \"непростых\" запросов (PUT, кастомные заголовки) браузер сначала шлёт preflight OPTIONS и спрашивает разрешения. Важно: CORS не защищает сервер — curl/Postman/бэкенд игнорируют его. Это политика именно браузера, чтобы вредный сайт не дёргал чужие API от твоего имени.",
  "code": "// Сервер разрешает запросы только с этого origin\n@ServerExceptionMapper // (пример заголовков ответа)\nResponse resp = Response.ok(data)\n    .header(\"Access-Control-Allow-Origin\", \"https://app.acme.com\")\n    .header(\"Access-Control-Allow-Methods\", \"GET, POST\")\n    .header(\"Access-Control-Allow-Headers\", \"Authorization\")\n    .build();\n// Нет этого заголовка -> браузер скроет ответ от JS"
 },
 {
  "id": "web-authn-authz",
  "t": "Web",
  "s": "security",
  "q": "Authentication vs Authorization?",
  "a": "Аутентификация — «КТО ты?»: показываешь логин/пароль или токен, система убеждается, что ты — это ты. Авторизация — «что тебе МОЖНО?»: уже узнав тебя, проверяет твои права/роли. Сначала вход, потом доступ. 401 — не вошёл, 403 — вошёл, но нельзя.",
  "d": "Порядок строгий: нельзя проверить права у того, кого ещё не опознали. AuthN даёт identity (кто), AuthZ принимает решение по этой identity (роли, scopes, owner-of-resource). HTTP-коды: 401 Unauthorized = на самом деле «не аутентифицирован» (нет/просрочен/невалиден токен) → клиенту имеет смысл залогиниться заново. 403 Forbidden = личность известна и валидна, но прав на ресурс нет → повторный логин не поможет. Частая путаница: имя 401 историческое, по смыслу это про authentication, а не authorization.",
  "code": "// AuthN: кто ты — валидируем токен\nUser user = auth.verify(token);   // нет/невалиден -> 401\n\n// AuthZ: что тебе можно — проверяем роль\nif (!user.hasRole(\"ADMIN\")) {     // вошёл, но прав нет -> 403\n    throw new ForbiddenException();\n}\nreturn adminPanel();"
 },
 {
  "id": "web-tcp-udp",
  "t": "Web",
  "s": "network",
  "q": "TCP vs UDP — когда что?",
  "a": "TCP — звонок: сначала «алло?», говорите по очереди, переспрашиваете непонятое, в конце «пока». Надёжно, но дольше. UDP — крикнул в толпу и пошёл: быстро, но не факт что услышали и в каком порядке. TCP — HTTP, БД. UDP — видео, игры, DNS.",
  "d": "TCP устанавливает соединение (handshake), нумерует байты, подтверждает приём (ACK), переотправляет потерянное и собирает порядок — поверх ненадёжного IP получаем надёжный поток. Цена: задержки на установку, ACK и переотправки. UDP — просто датаграммы поверх IP: ни рукопожатия, ни ACK, пакеты могут потеряться/прийти не по порядку/задвоиться. Зато минимум накладных расходов и задержки — для realtime «свежий кадр важнее потерянного». QUIC (основа HTTP/3) строится на UDP, но сам добирает надёжность и порядок в user space — гибкость без минусов TCP.",
  "code": "// TCP — поток с гарантией: пишешь — дойдёт и по порядку\nSocket s = new Socket(\"host\", 443);         // handshake под капотом\ns.getOutputStream().write(data);            // ACK + retransmit — забота ОС\n\n// UDP — выстрелил датаграммой, ACK нет, порядок не гарантирован\nDatagramSocket u = new DatagramSocket();\nu.send(new DatagramPacket(buf, buf.length, addr, 53)); // напр. DNS"
 },
 {
  "id": "db-sql-nosql",
  "t": "DB",
  "s": "access",
  "q": "SQL vs NoSQL — когда что выбрать?",
  "a": "SQL — это таблицы со строгой схемой и связями: бери, когда данные структурированы и важна целостность (деньги, заказы) — есть JOIN и ACID. NoSQL — гибкая схема без жёстких связей: бери под огромный объём, скорость и лёгкое масштабирование вширь.",
  "d": "SQL (PostgreSQL, MySQL): данные разложены по таблицам, связи через внешние ключи, запросы соединяют их JOIN-ом. Гарантии ACID: транзакция либо целиком прошла, либо целиком откатилась — никаких полусписаний денег. Минус: масштабировать вширь (шардить) тяжело.\n\nNoSQL — это семейство:\n- документные (MongoDB): JSON-документы, схема гибкая;\n- key-value (Redis): ключ → значение, очень быстро;\n- колоночные (Cassandra): под огромные объёмы и запись;\n- графовые (Neo4j): связи как первый класс (соцсети, рекомендации).\nМногие NoSQL дают BASE вместо ACID: данные согласуются «в итоге» (eventual consistency) — ради скорости и доступности жертвуют мгновенной строгой целостностью. Часто данные денормализуют (дублируют), чтобы читать одним запросом без JOIN.\n\nПравило выбора: целостность и сложные связи → SQL; экстремальный объём/скорость/гибкая схема → NoSQL. На практике их часто комбинируют.",
  "code": "-- SQL: связи + JOIN, целостность гарантирована\nSELECT o.id, c.name\nFROM orders o\nJOIN clients c ON c.id = o.client_id   -- связь по ключу\nWHERE o.status = 'PAID';\n\n// NoSQL (документ): всё вложено, JOIN не нужен\n{ \"orderId\": 1, \"status\": \"PAID\",\n  \"client\": { \"name\": \"Иван\" } }       // денормализация"
 },
 {
  "id": "ops-maven",
  "t": "DevOps",
  "s": "ci-cd",
  "q": "Maven build lifecycle — основные фазы?",
  "a": "Maven собирает проект по шагам-фазам в фиксированном порядке: validate → compile → test → package → verify → install → deploy. Запускаешь любую фазу — выполняются все до неё. `mvn package` прогонит всё вплоть до сборки jar/war включительно.",
  "d": "Это default-жизненный цикл. Ключевые фазы: validate (проверка проекта), compile (компиляция в target/classes), test (unit-тесты), package (упаковка в jar/war), verify (интеграционные проверки), install (копия артефакта в локальный кэш ~/.m2/repository — доступен другим твоим проектам), deploy (заливка в удалённый репозиторий, например Nexus/Artifactory, для команды/CI). Нельзя запустить фазу \"в обход\" предыдущих: `mvn install` сам прогонит test и package. Пропустить тесты можно флагом -DskipTests, но фаза test формально всё равно \"проходит\".",
  "code": "mvn clean package      # очистить + всё до jar/war включительно\nmvn install            # + положить артефакт в ~/.m2 (локально)\nmvn deploy -DskipTests # + в удалённый репозиторий, без тестов"
 },
 {
  "id": "de-principles",
  "t": "Design",
  "s": "oop",
  "q": "YAGNI, DRY, KISS — что это?",
  "a": "YAGNI — не пиши код «на будущее», только под то, что нужно сейчас. DRY — одно знание живёт в одном месте, не копируй логику. KISS — выбирай самое простое, что работает. Все три бьют по одному врагу — оверинжинирингу.",
  "d": "Тонкости, чтобы не перегнуть:\n\n• YAGNI ≠ «не думай об архитектуре». Это про фичи/абстракции, которых пока никто не просил. Расширяемость закладывают через простые границы, а не через заранее написанный «движок на все случаи».\n\n• DRY — про дублирование ЗНАНИЯ, а не про похожий текст. Два куска кода, которые случайно выглядят одинаково, но меняются по разным причинам, объединять НЕ надо — иначе получишь ложную связанность. Правило WET/«rule of three»: терпи дубль до 2-3 раз, потом выноси.\n\n• KISS — простое для ЧИТАТЕЛЯ (особенно junior'а), а не «коротко любой ценой». Хитрый однострочник — это не KISS.\n\nКонфликты: иногда DRY (вынести общее) спорит с KISS (оставить просто) и YAGNI (не плодить абстракцию). Разрешается контекстом: если абстракция нужна прямо сейчас и убирает реальный дубль знания — выноси; если «на всякий» — нет.",
  "code": "// DRY: знание о ставке НДС в одном месте\nstatic final BigDecimal VAT = new BigDecimal(\"0.12\");\nBigDecimal withVat(BigDecimal x){ return x.multiply(VAT.add(BigDecimal.ONE)); }\n\n// YAGNI: нужен один способ оплаты — не делаем фабрику стратегий \"на будущее\"\nvoid pay(Order o){ card.charge(o.total()); }   // достаточно\n\n// KISS: понятно с первого взгляда\nboolean adult(int age){ return age >= 18; }\n// а НЕ: return ((age - 18) >> 31) == 0;  // \"умно\", но нечитаемо"
 },
 {
  "id": "jc-var",
  "t": "Java",
  "s": "core",
  "q": "var — что это и где можно?",
  "a": "var — это «компилятор, угадай тип сам». Пишешь `var x = ...`, и Java смотрит на правую часть и подставляет тип. Только для локальных переменных и только с присвоением сразу. Тип потом не меняется — Java всё ещё строгая.",
  "d": "`var` (Java 10+) — это синтаксический сахар: вывод типа локальной переменной (LVTI). Тип вычисляется по инициализатору в момент компиляции и навсегда фиксируется — это НЕ динамическая типизация как в JS/Python. В байткоде остаётся реальный тип (String, ArrayList и т.д.). Нельзя: поля класса, параметры/возврат методов, `var x;` без инициализации, `var x = null`, lambda без явного типа. Можно: в for/for-each, в обычном присвоении.",
  "code": "// OK — тип выводится из правой части\nvar name = \"Алия\";          // String\nvar count = 42;             // int\nvar list = new ArrayList<String>(); // ArrayList<String>\nfor (var i = 0; i < 10; i++) {}\n\n// Ошибка компиляции:\n// var x;          // нет инициализации\n// var y = null;   // тип не вывести\n// var f = (a) -> a; // lambda без цели\n\n// Поля/параметры/возврат — НЕЛЬЗЯ:\n// private var field = 1;            // нет\n// void m(var p) {}                  // нет\n// var getName() { return name; }    // нет"
 },
 {
  "id": "jc-switch-expr",
  "t": "Java",
  "s": "core",
  "q": "switch как выражение (Java 14+) — чем лучше?",
  "a": "Старый switch — это «забыл break — провалился дальше». Новый switch (Java 14+) — это выражение: пишешь case L -> результат, оно возвращает значение, без break и без проваливания. Короче, читается сверху вниз, ошибиться труднее.",
  "d": "case A, B -> ... — одна стрелка на несколько меток. Для нескольких строк нужен блок { ... yield value; } — yield отдаёт результат из блока. Главное: switch теперь даёт значение, которое можно присвоить переменной или вернуть из метода. Для enum и sealed-типов компилятор требует полноту (исчерпать все варианты), иначе либо нужен default, либо ошибка компиляции — это ловит забытые случаи ещё до запуска.",
  "code": "// Старый: легко забыть break -> fall-through\n// Новый switch как выражение:\nint days = switch (month) {\n    case JAN, MAR, MAY, JUL, AUG, OCT, DEC -> 31;\n    case APR, JUN, SEP, NOV -> 30;\n    case FEB -> {                 // блок -> yield\n        int d = isLeap ? 29 : 28;\n        yield d;\n    }\n}; // enum исчерпан -> default не нужен, компилятор доволен"
 },
 {
  "id": "jc-text-block",
  "t": "Java",
  "s": "core",
  "q": "Текстовый блок — зачем?",
  "a": "Текстовый блок — это строка в трёх кавычках \"\"\"...\"\"\". Пишешь текст в несколько строк прямо в коде: переносы и отступы сохраняются сами. Не нужно лепить \\n и склеивать строки через +. Удобно для JSON, SQL, HTML.",
  "d": "Появился в Java 15. Открывающие \"\"\" должны стоять на отдельной строке, текст идёт ниже. Компилятор сам убирает «лишний» общий отступ слева (по позиции закрывающих \"\"\"), так что можно красиво выравнивать код. Внутри не надо экранировать обычные кавычки \". Если перенос в конце строки не нужен — ставят \\ в конце. Результат — обычная String, никакой новой структуры.",
  "code": "// Старый способ\nString j1 = \"{\\n\" +\n            \"  \\\"id\\\": 7\\n\" +\n            \"}\";\n\n// Текстовый блок (Java 15+)\nString j2 = \"\"\"\n        {\n          \"id\": 7\n        }\n        \"\"\";"
 },
 {
  "id": "jc-sealed",
  "t": "Java",
  "s": "oop",
  "q": "sealed классы/интерфейсы — что дают?",
  "a": "sealed-классу/интерфейсу ты ЯВНО пишешь список «кто может наследоваться» (permits). Все остальные — мимо, компилятор не даст. Иерархия закрыта и ты ей хозяин.",
  "d": "Каждый наследник обязан выбрать модификатор: final (дальше не наследуют), sealed (продолжает контролируемый список) или non-sealed (открывает иерархию обратно). Если permits-типы лежат в том же файле — permits можно опустить. Главный профит — exhaustive switch: компилятор знает ВСЕ варианты, поэтому в switch по sealed-типу не нужен default, а при добавлении нового наследника компилятор подсветит непокрытые switch как ошибку. Идеально ложится на pattern matching (Java 21).",
  "code": "sealed interface Shape permits Circle, Square {}\n\nfinal class Circle implements Shape { double r; }\nfinal class Square implements Shape { double a; }\n\n// компилятор знает все варианты -> default не нужен\ndouble area(Shape s) {\n    return switch (s) {\n        case Circle c -> Math.PI * c.r * c.r;\n        case Square q -> q.a * q.a;\n    };\n}"
 },
 {
  "id": "jc-pattern-match",
  "t": "Java",
  "s": "core",
  "q": "Pattern matching — что упрощает?",
  "a": "Раньше: проверь `instanceof`, потом руками приведи тип, потом запиши в переменную — три шага. Pattern matching делает всё одной строкой: `if (o instanceof String s)` — уже проверено, приведено и лежит в `s`. В switch (Java 21) можно ветвиться по типам, а компилятор проверит, что разобраны все случаи.",
  "d": "`instanceof Type t` вводит binding-переменную `t` в той области, где проверка истинна (flow scoping) — её видно в then-ветке, в `&&` справа и т.д. В `switch` по типам: case-метки вида `case Integer i ->`, плюс record patterns `case Point(int x, int y) ->` для деструктуризации. Для sealed-иерархий компилятор требует исчерпывающности (exhaustiveness) — если покрыты не все подтипы, код не скомпилируется без `default`. Это ловит пропущенные случаи на этапе сборки, а не в проде.",
  "code": "// Было: бойлерплейт\nif (obj instanceof String) {\n    String s = (String) obj;       // явный каст\n    System.out.println(s.length());\n}\n\n// Стало (instanceof pattern):\nif (obj instanceof String s) {     // проверка + каст + переменная\n    System.out.println(s.length());\n}\n\n// switch по типам + record pattern (Java 21):\nsealed interface Shape permits Circle, Box {}\nrecord Circle(double r) {}\nrecord Box(double w, double h) {}\n\ndouble area = switch (shape) {                 // компилятор проверит полноту\n    case Circle(double r)        -> Math.PI * r * r;\n    case Box(double w, double h) -> w * h;\n    // default не нужен: все подтипы sealed покрыты\n};"
 },
 {
  "id": "jc-nested-classes",
  "t": "Java",
  "s": "oop",
  "q": "Виды вложенных классов — в чём разница?",
  "a": "4 вида вложенных классов: static nested — не держит внешний объект, как отдельная утилита. inner (нестатич.) — держит ссылку на внешний, видит его поля, мешает GC внешнего. local — объявлен внутри метода. anonymous — реализация интерфейса «на лету». Лямбда часто короче anonymous.",
  "d": "static nested: new Outer.Nested() без внешнего экземпляра. inner: только outer.new Inner() — скрытая ссылка Outer.this удерживает внешний объект в памяти (типичная утечка в листенерах/Runnable). local и anonymous захватывают только effectively final переменные. Лямбда заменяет anonymous лишь для функциональных интерфейсов (один метод) и НЕ создаёт свой this — this указывает на внешний класс.",
  "code": "class Outer {\n  int x = 1;\n  static class Nested {}        // не видит x, без Outer\n  class Inner { int get(){return x;} } // видит x, держит Outer.this\n  void m() {\n    class Local {}              // только внутри m()\n    Runnable r = new Runnable(){ public void run(){} }; // anonymous\n    Runnable l = () -> {};       // лямбда вместо anonymous\n  }\n}"
 },
 {
  "id": "jc-enum-adv",
  "t": "Java",
  "s": "oop",
  "q": "enum под капотом — это что?",
  "a": "enum — это обычный класс, но с заранее зафиксированным списком готовых объектов. JVM сама создаёт каждую константу один раз. У них могут быть поля, конструктор и методы — как у любого класса.",
  "d": "Каждая константа — это единственный экземпляр (синглтон по своей сути). Поэтому enum-синглтон потокобезопасен: JVM гарантирует создание один раз при загрузке класса, защита от reflection и сериализации встроена. constant-specific body: после константы пишешь {...} и переопределяешь абстрактный метод по-своему — каждая константа ведёт себя индивидуально.",
  "code": "enum Op {\n    PLUS  { int apply(int a, int b){ return a + b; } },\n    TIMES { int apply(int a, int b){ return a * b; } };\n    abstract int apply(int a, int b); // constant-specific body\n}\n// Потокобезопасный синглтон:\nenum Config { INSTANCE; String url = \"db://...\"; }\n// Config.INSTANCE — один на всю JVM, без synchronized"
 },
 {
  "id": "jc-method-ref",
  "t": "Java",
  "s": "lambda",
  "q": "Ссылки на методы — какие бывают?",
  "a": "Ссылка на метод — это короткая лямбда, которая просто зовёт один готовый метод. Вместо x -> x.foo() пишешь Obj::foo. 4 вида: Class::staticM, obj::instanceM, Class::instanceM, Class::new. Глаза не устают — сразу видно, какой метод зовётся.",
  "d": "4 формы:\n1) Class::staticM — статический метод: Integer::parseInt вместо s -> Integer.parseInt(s).\n2) obj::instanceM — метод КОНКРЕТНОГО объекта: System.out::println вместо x -> System.out.println(x).\n3) Class::instanceM — метод по ПЕРВОМУ аргументу: String::toUpperCase вместо s -> s.toUpperCase(). Первый параметр становится получателем (this).\n4) Class::new — конструктор: ArrayList::new вместо () -> new ArrayList().\nРаботает только когда лямбда зовёт РОВНО один метод и ничего больше не делает.",
  "code": "// было лямбдой -> стало ссылкой на метод\nlist.forEach(x -> System.out.println(x));   list.forEach(System.out::println);   // obj::instanceM\nnums.stream().map(s -> Integer.parseInt(s));  nums.stream().map(Integer::parseInt); // Class::staticM\nnames.stream().map(s -> s.toUpperCase());     names.stream().map(String::toUpperCase); // Class::instanceM\nSupplier<List<String>> f = () -> new ArrayList<>();  Supplier<List<String>> g = ArrayList::new; // Class::new"
 },
 {
  "id": "jc-func-interfaces",
  "t": "Java",
  "s": "lambda",
  "q": "Встроенные функциональные интерфейсы — какие основные?",
  "a": "Чтобы не писать каждый раз свой интерфейс под лямбду, в Java уже есть готовые в java.util.function: Supplier даёт значение, Consumer берёт и ничего не возвращает, Function превращает одно в другое, Predicate отвечает да/нет, BiFunction берёт два, UnaryOperator возвращает тот же тип.",
  "d": "Все они в пакете java.util.function. Главный метод вызывается по-разному: Supplier.get(), Consumer.accept(t), Function.apply(t), Predicate.test(t), BiFunction.apply(t,u), UnaryOperator.apply(t). UnaryOperator<T> — это частный случай Function<T,T>, а BinaryOperator<T> — частный случай BiFunction<T,T,T>. Есть примитивные версии без автобоксинга: IntFunction, ToIntFunction, IntPredicate, IntSupplier и т.п. — их берут в горячем коде, чтобы не оборачивать int в Integer.",
  "code": "Supplier<String> s   = () -> \"hi\";              // ()  -> T\nConsumer<String> c   = x -> System.out.println(x); // T -> void\nFunction<String,Integer> f = String::length;    // T -> R\nPredicate<String> p  = x -> x.isEmpty();        // T -> boolean\nBiFunction<Integer,Integer,Integer> add = (a,b) -> a + b; // T,U -> R\nUnaryOperator<String> up = String::toUpperCase; // T -> T\n\nSystem.out.println(f.apply(\"hello\")); // 5\nSystem.out.println(add.apply(2, 3));  // 5"
 },
 {
  "id": "jc-flatmap",
  "t": "Java",
  "s": "streams",
  "q": "flatMap vs map в стримах?",
  "a": "map меняет каждый элемент по правилу 1→1. Если в map вернуть поток, получишь Stream из потоков — вложенно. flatMap делает то же, но потом «вскрывает» каждый внутренний поток и сваливает всё в ОДИН плоский поток. List<List> → поток T: только flatMap.",
  "d": "map(fn): Stream<A>→Stream<B>, ровно по одному элементу на выход. Если fn возвращает Stream<B>, итог — Stream<Stream<B>>. flatMap(fn): fn обязан вернуть Stream (или иной поток), а flatMap соединяет их конкатенацией в Stream<B>; элементов может стать больше, меньше (пустой поток отбрасывает) или столько же. Поэтому для разворачивания List<List<T>>, разбиения строки на слова, Optional→значения (.stream() на Optional, Java 9+) используют именно flatMap.",
  "code": "// List<List<Integer>> -> плоский поток\nList<List<Integer>> data = List.of(List.of(1,2), List.of(3,4));\n\ndata.stream().map(List::stream);        // Stream<Stream<Integer>>  ← вложено!\ndata.stream().flatMap(List::stream)     // Stream<Integer>: 1,2,3,4 ← плоско\n    .toList();\n\n// Optional -> значения (Java 9+)\nList<Optional<String>> opts = List.of(Optional.of(\"a\"), Optional.empty());\nopts.stream().flatMap(Optional::stream).toList(); // [a]"
 },
 {
  "id": "jc-primitive-streams",
  "t": "Java",
  "s": "streams",
  "q": "Зачем IntStream / примитивные стримы?",
  "a": "IntStream/LongStream/DoubleStream хранят примитивы (int/long/double) напрямую, без обёртки Integer. Поэтому нет автобоксинга — меньше объектов в куче, меньше мусора, быстрее. И сразу дают sum(), average(), range() — для чисел удобно. Stream<Integer> на каждое число делает new Integer.",
  "d": "Stream<Integer> хранит ссылки на объекты Integer: каждый int оборачивается (autoboxing) → объект в heap, при суммировании — распаковка (unboxing). Это лишние аллокации и нагрузка на GC. IntStream работает с примитивами int напрямую — данные лежат «плоско», без обёрток. Бонус: терминальные операции sum()/average()/max()/summaryStatistics() и фабрики range()/rangeClosed()/iterate() уже встроены. Переход туда-обратно: stream.mapToInt(x -> x) / intStream.boxed().",
  "code": "// Медленно: боксинг каждого числа в Integer\nint s1 = Stream.of(1, 2, 3, 4)\n    .reduce(0, Integer::sum);          // box/unbox\n\n// Быстро: примитивы, без боксинга\nint s2 = IntStream.rangeClosed(1, 4)  // 1..4\n    .sum();                            // = 10\n\ndouble avg = IntStream.of(2, 4, 6)\n    .average().orElse(0);             // = 4.0"
 },
 {
  "id": "jc-collectors",
  "t": "Java",
  "s": "streams",
  "q": "Collectors — что собирают?",
  "a": "Поток (Stream) — это конвейер данных. `collect` — финальный шаг, который сворачивает поток в готовую структуру. Collectors — это рецепты «куда сложить»: в список, множество, словарь, в одну строку, сгруппировать или посчитать. Один вызов — и поток превращается в нужный объект.",
  "d": "Все они — статические методы класса java.util.stream.Collectors, передаются в терминальную операцию stream.collect(...). Базовые: toList()/toSet()/toMap(keyFn, valFn). joining(sep) склеивает строки. groupingBy(keyFn) -> Map<K, List<V>>, можно с downstream-коллектором: groupingBy(k, counting()) или groupingBy(k, mapping(f, toList())). partitioningBy(predicate) -> Map<Boolean, List<V>> ровно с двумя ключами true/false. counting() -> Long. mapping(f, downstream) трансформирует элементы перед сбором. Терминальная = поток после неё закрыт.",
  "code": "List<String> names = List.of(\"Аня\", \"Иван\", \"Олег\", \"Аня\");\n\n// toList / toSet\nList<String> list = names.stream().collect(Collectors.toList());\nSet<String>  set  = names.stream().collect(Collectors.toSet());\n\n// joining — склейка в строку\nString csv = names.stream().collect(Collectors.joining(\", \"));   // \"Аня, Иван, Олег, Аня\"\n\n// groupingBy — Map по ключу (длина имени -> список)\nMap<Integer, List<String>> byLen =\n    names.stream().collect(Collectors.groupingBy(String::length));\n\n// partitioningBy — на true/false\nMap<Boolean, List<String>> part =\n    names.stream().collect(Collectors.partitioningBy(s -> s.length() > 3));\n\n// counting + groupingBy (downstream)\nMap<String, Long> freq =\n    names.stream().collect(Collectors.groupingBy(s -> s, Collectors.counting()));\n\n// mapping — преобразовать перед сбором\nMap<Integer, List<Character>> firstChars =\n    names.stream().collect(Collectors.groupingBy(\n        String::length, Collectors.mapping(s -> s.charAt(0), Collectors.toList())));"
 },
 {
  "id": "jc-assert",
  "t": "Java",
  "s": "core",
  "q": "assert — что делает и подвох?",
  "a": "assert условие : сообщение — это проверка «такого не бывает». Если условие false — AssertionError. НО по умолчанию assert ВЫКЛЮЧЕН, включается флагом -ea при запуске. Поэтому им НЕЛЬЗЯ проверять ввод юзера (его просто пропустит) — только свои внутренние догадки в коде и тестах.",
  "d": "assert — для инвариантов: «здесь age уже точно > 0», «сюда поток не дойдёт». В проде запускают без -ea, и все assert исчезают (нулевая стоимость). Валидацию входных данных делай через if + throw (IllegalArgumentException / Objects.requireNonNull) — они работают всегда. Правило: assert = ловить баги программиста, исключения = реагировать на плохие данные.",
  "code": "// Плохо: проверка ВВОДА через assert\nvoid pay(int sum) {\n    assert sum > 0;            // без -ea не сработает!\n}\n\n// Хорошо: ввод -> исключение, инвариант -> assert\nvoid pay(int sum) {\n    if (sum <= 0)             // всегда работает\n        throw new IllegalArgumentException(\"sum<=0\");\n    int left = balance - sum;\n    assert left >= 0 : \"balance ушёл в минус: \" + left; // догадка\n}\n// java App        -> assert спит\n// java -ea App     -> assert ловит баг"
 },
 {
  "id": "jc-multicatch",
  "t": "Java",
  "s": "core",
  "q": "Multi-catch — что это?",
  "a": "Один блок catch ловит сразу несколько типов ошибок через `|`. Пишешь обработку один раз вместо копипасты. Переменная e тут «как final» — переприсвоить нельзя. И типы не могут быть родственниками (родитель/потомок).",
  "d": "Если бы ловили IOException и SQLException по отдельности, код обработки дублировался бы. Multi-catch объединяет ветки. Запрет на родственные типы (например IOException и FileNotFoundException) — потому что один уже покрывает другой, второй лишний — компилятор это запретит. Переменная e неявно final: компилятор не даёт ей присвоить новое значение, потому что её реальный тип — общий супертип пойманных, и переприсвоение было бы небезопасно.",
  "code": "try {\n    risky();\n} catch (IOException | SQLException e) {  // один блок — два типа\n    log.error(\"Сбой\", e);                 // e фактически final\n    // e = new IOException(); // ОШИБКА компиляции\n}\n// IOException | FileNotFoundException — НЕЛЬЗЯ (наследники)"
 },
 {
  "id": "jc-private-iface",
  "t": "Java",
  "s": "oop",
  "q": "private-методы в интерфейсе — зачем (Java 9)?",
  "a": "private-метод в интерфейсе (Java 9) — это скрытый помощник внутри интерфейса. Если у тебя два-три default-метода делают одно и то же, общий кусок выносишь в private-метод. Снаружи его не видно, дублирования нет.",
  "d": "До Java 9 общий код default-методов либо дублировался, либо выносился в отдельный класс-утилиту. Java 9 разрешила private (и private static) методы прямо в интерфейсе. Они не часть контракта: их нельзя вызвать через реализующий класс или override. Так интерфейс получил скрытую реализацию для повторного использования внутри своих default/static методов.",
  "code": "interface Logger {\n    default void info(String m)  { log(\"INFO\", m); }\n    default void error(String m) { log(\"ERROR\", m); }\n\n    // скрытый помощник — наружу не виден\n    private void log(String level, String m) {\n        System.out.println(\"[\" + level + \"] \" + m);\n    }\n}"
 },
 {
  "id": "jc-modules",
  "t": "Java",
  "s": "core",
  "q": "JPMS — модули Java (Java 9)?",
  "a": "JPMS (Java 9) — модули. В module-info.java пишешь requires (какие модули тебе нужны) и exports (какие пакеты отдаёшь наружу). Не-exported пакеты скрыты полностью — даже рефлексия их не достанет. Граф зависимостей явный, jlink собирает мини-рантайм только из нужных модулей.",
  "d": "До Java 9 был «classpath ад»: любой класс видел любой public-класс из любого jar. JPMS добавил слой над пакетами — модуль. Правила: requires X — нужен модуль X; exports pkg — пакет виден всем; exports pkg to mod — только указанным модулям; opens pkg — разрешает рефлексию (для Spring/Hibernate). Без opens даже setAccessible(true) не пробьёт инкапсуляцию не-exported пакета. Граф модулей строится при запуске: пропущенный requires = ошибка сразу, а не ClassNotFoundException в рантайме. jlink проходит по графу от твоего модуля и собирает образ JRE только из реально нужных модулей (можно урезать с ~300MB до ~40MB) — удобно для контейнеров.",
  "code": "// src/com.shop/module-info.java\nmodule com.shop {\n    requires com.payment;        // что нужно мне\n    requires java.sql;\n\n    exports com.shop.api;        // отдаю наружу всем\n    exports com.shop.spi to com.shop.plugin; // только этому модулю\n\n    opens com.shop.entity;       // разрешаю рефлексию (ORM/DI)\n    // com.shop.internal НЕ exported — недоступен снаружи даже через reflection\n}"
 },
 {
  "id": "jc-nio2",
  "t": "Java",
  "s": "core",
  "q": "NIO.2: Path и Files — чем лучше старого File?",
  "a": "File старый и тупой: спрашиваешь \"удалился?\" — он молча врёт true/false. NIO.2 умнее: Path — это просто адрес (его не трогаешь), а Files делает дела: читай, копируй, перемещай, гуляй по дереву. Что-то сломалось — кинет исключение с причиной, а не глухое false.",
  "d": "Path неизменяем (immutable) — операции возвращают новый Path, безопасен в многопотоке. Files — статические методы: readAllLines, copy, move, exists, walk (Stream<Path> по дереву). Поддержка символьных ссылок (LinkOption), атрибутов (BasicFileAttributes за один системный вызов), и нормальные исключения (IOException с деталями вместо boolean). Files.walk возвращает ленивый Stream — закрывай через try-with-resources.",
  "code": "Path p = Path.of(\"/data/app.log\");\n\nif (Files.exists(p)) {\n    List<String> lines = Files.readAllLines(p);      // вместо ручного BufferedReader\n    Files.copy(p, Path.of(\"/backup/app.log\"),\n               StandardCopyOption.REPLACE_EXISTING);  // одна строка вместо потоков\n    Files.move(p, p.resolveSibling(\"app.old.log\"));   // атомарное переименование\n}\n\n// прогулка по дереву каталогов — ленивый Stream<Path>\ntry (Stream<Path> tree = Files.walk(Path.of(\"/data\"))) {\n    tree.filter(f -> f.toString().endsWith(\".log\"))\n        .forEach(System.out::println);\n}\n// Ошибка? Прилетит IOException с причиной, а не глухой false."
 },
 {
  "id": "jc-datetime",
  "t": "Java",
  "s": "core",
  "q": "java.time: Period vs Duration и почему не Date?",
  "a": "Date/Calendar — старьё: меняются на месте и ломаются в потоках. java.time (Java 8) — неизменяемый и потокобезопасный. Период между ДАТАМИ (дни/месяцы/годы) = Period. Промежуток ВРЕМЕНИ (часы/сек/нано) = Duration. Не путай.",
  "d": "LocalDate — только дата, LocalDateTime — дата+время без зоны, ZonedDateTime — с часовым поясом. Все объекты immutable: метод вроде plusDays() возвращает НОВЫЙ объект, старый не трогает — отсюда потокобезопасность. Period измеряет в календарных единицах (учитывает разную длину месяцев), Duration — в физическом времени (секунды/наносекунды). Поэтому Period для дней рождения/сроков, Duration для таймаутов/замеров.",
  "code": "LocalDate d1 = LocalDate.of(2024, 1, 31);\nLocalDate d2 = LocalDate.of(2024, 3, 1);\nPeriod p = Period.between(d1, d2);   // 1 месяц 1 день (даты)\n\nInstant t1 = Instant.now();\nInstant t2 = t1.plusSeconds(90);\nDuration dur = Duration.between(t1, t2); // PT1M30S (время)\nSystem.out.println(dur.toMinutes());     // 1"
 },
 {
  "id": "jc-i18n",
  "t": "Java",
  "s": "core",
  "q": "Локализация: Locale и ResourceBundle?",
  "a": "Locale — это «язык + страна» (например ru_RU). ResourceBundle — словарик: ключ → текст, отдельный файл на каждый язык. Берёшь нужный Locale — получаешь свои тексты и правильный формат чисел, дат, валют. Строки и форматы в коде НЕ пиши руками.",
  "d": "Locale задаёт правила: разделитель тысяч (1 000 vs 1,000), формат даты (дд.ММ.гггг vs MM/dd/yyyy), символ валюты (₸, $, €). ResourceBundle ищет файл messages_ru_RU → messages_ru → messages (fallback по цепочке). Форматтеры (NumberFormat, DateTimeFormatter, NumberFormat.getCurrencyInstance) принимают Locale и сами применяют локальные правила — ты не хардкодишь ни тексты, ни маски. Меняешь язык приложения = меняешь один Locale, код не трогаешь.",
  "code": "Locale ru = new Locale(\"ru\", \"RU\");\n\n// тексты по ключам (messages_ru_RU.properties)\nResourceBundle b = ResourceBundle.getBundle(\"messages\", ru);\nString hi = b.getString(\"greeting\"); // \"Привет\"\n\n// форматы берут правила из Locale\nNumberFormat money = NumberFormat.getCurrencyInstance(ru);\nmoney.format(1234.5); // \"1 234,50 ₸\"\n\nNumberFormat.getInstance(Locale.US).format(1234.5); // \"1,234.5\""
 },
 {
  "id": "co-executor",
  "t": "Concurrency",
  "s": "basics",
  "q": "ExecutorService, Runnable vs Callable, Future?",
  "a": "ExecutorService — это бригада рабочих (пул потоков). Ты кидаешь ему задачу через submit() и получаешь талончик Future. Позже зовёшь future.get() — он ждёт, пока работа готова, и отдаёт результат. Runnable работает молча (ничего не возвращает), Callable возвращает ответ и может бросить исключение. Закончил — обязательно shutdown(), иначе бригада не расходится и программа висит.",
  "d": "submit(Callable) сразу возвращает Future, не блокируясь — задача исполняется в фоне. Блокировка наступает только на future.get(). Runnable.run() возвращает void и не объявляет checked-исключений; Callable.call() возвращает значение типа T и может бросить checked-исключение (внутри Future оно завернётся в ExecutionException, выбрасываемое при get()). shutdown() запрещает приём новых задач и даёт доделать текущие; shutdownNow() пытается прервать. Без shutdown() ненастроенные (non-daemon) потоки пула держат JVM живой.",
  "code": "ExecutorService pool = Executors.newFixedThreadPool(2);\n// Callable — есть результат + checked exception\nFuture<Integer> f = pool.submit(() -> {\n    Thread.sleep(100);\n    return 2 + 2;            // вернётся через Future\n});\n// Runnable — без результата\npool.submit(() -> System.out.println(\"работаю молча\"));\n\nSystem.out.println(f.get()); // блокирует до готовности -> 4\npool.shutdown();             // обязательно: иначе JVM не завершится"
 },
 {
  "id": "co-sync-tools",
  "t": "Concurrency",
  "s": "basics",
  "q": "CountDownLatch / CyclicBarrier / Semaphore — что когда?",
  "a": "Три инструмента «подождать/пустить/ограничить»:\n- CountDownLatch — ждёшь, пока случится N событий, потом идёшь дальше. Одноразовый.\n- CyclicBarrier — собираешь N потоков в одной точке и пускаешь всех вместе. Можно переиспользовать.\n- Semaphore — выдаёшь N «пропусков»: одновременно к ресурсу пускаешь только N, остальные ждут.",
  "d": "CountDownLatch: счётчик от N к 0, countDown() уменьшает, await() блокирует до нуля. Назад НЕ сбрасывается — нужен новый объект. Один ждёт многих ИЛИ многие ждут старта.\n\nCyclicBarrier: N потоков зовут await(); когда добрался последний — барьер открывается для всех сразу и автоматически сбрасывается на следующий цикл. Опционально barrierAction выполняется один раз при срабатывании. Потоки ждут ДРУГ ДРУГА.\n\nSemaphore: N разрешений. acquire() берёт разрешение (блокирует, если их 0), release() возвращает. Классика — пул из N соединений / N парковочных мест. fairness-флаг даёт FIFO-очередь.\n\nКлючевое отличие: Latch и Barrier синхронизируют МОМЕНТ, Semaphore ограничивает КОЛИЧЕСТВО.",
  "code": "// CountDownLatch — главный ждёт 3 воркеров (одноразово)\nCountDownLatch latch = new CountDownLatch(3);\n// в каждом воркере: ...работа...; latch.countDown();\nlatch.await(); // проснётся, когда счётчик дойдёт до 0\n\n// CyclicBarrier — 3 потока стартуют вместе (переиспользуемый)\nCyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println(\"поехали!\"));\n// в каждом потоке:\nbarrier.await(); // ждёт, пока соберутся все 3, потом все идут дальше\n\n// Semaphore — максимум 2 одновременно у ресурса\nSemaphore sem = new Semaphore(2);\nsem.acquire();      // взять пропуск (ждёт, если их 0)\ntry { useResource(); }\nfinally { sem.release(); } // вернуть пропуск"
 },
 {
  "id": "co-cow",
  "t": "Concurrency",
  "s": "basics",
  "q": "CopyOnWriteArrayList — когда брать?",
  "a": "CopyOnWriteArrayList — список для «читаем часто, пишем редко». При любой записи (add/set/remove) он КОПИРУЕТ весь массив целиком и меняет ссылку. Зато чтение — без блокировок, очень быстрое. Итератор работает на «снимке» массива и никогда не кидает ConcurrentModificationException. Классика: списки слушателей/подписчиков.",
  "d": "Запись держит общий lock и делает Arrays.copyOf всего массива — O(n) памяти и времени на каждую вставку, потому при частой записи он не подходит (бери ConcurrentHashMap-основанные структуры или обычный список с синхронизацией). Чтение читает volatile-ссылку на иммутабельный массив, поэтому не блокируется. Итератор фиксирует массив в момент создания: новые записи он не увидит, а remove() у итератора бросает UnsupportedOperationException. Идеально, когда подписчиков мало и список меняется редко, а обходят его часто (event listeners, observers).",
  "code": "// часто читаем (рассылка), редко пишем (подписка)\nList<Listener> listeners = new CopyOnWriteArrayList<>();\n\nlisteners.add(l);            // дорого: копирует весь массив\n// обход без ConcurrentModificationException,\n// даже если кто-то добавит подписчика прямо сейчас:\nfor (Listener l : listeners) l.onEvent(e);"
 },
 {
  "id": "arch-layered-hex",
  "t": "Архитектура",
  "s": "стили",
  "q": "Слоистая vs гексагональная/Clean — разница?",
  "a": "Слоистая: UI → сервис → данные, всё валится сверху вниз, и домен ЗАВИСИТ от БД. Гексагональная/Clean: домен в центре, наружу не лезет — общается через порты-интерфейсы, а БД/API подключают снаружи (зависимости внутрь). Hex проще тестировать и менять инфру.",
  "d": "Ключевое слово — направление зависимостей. В n-tier стрелка идёт UI→Service→DAO→БД, поэтому смена БД задевает домен. В Clean домен объявляет порт (например `OrderRepository` как интерфейс), а адаптер (JDBC/REST) его реализует снаружи — это Dependency Inversion. Домен не знает про Postgres/Kafka, поэтому в тестах порт подменяют фейком, без поднятия инфры. Цена — больше интерфейсов и маппинга, оправдано при долгоживущем сложном домене."
 },
 {
  "id": "arch-mono-micro",
  "t": "Архитектура",
  "s": "стили",
  "q": "Монолит vs модульный монолит vs микросервисы?",
  "a": "Монолит — весь код в одном приложении, один деплой. Просто на старте, но со временем тяжелеет и всё переплетается. Модульный монолит — тот же один деплой, но внутри чёткие модули с границами (часто лучший старт). Микросервисы — много отдельных сервисов, у каждого своя БД: команды независимы и можно масштабировать по частям, но появляется боль распределённой системы (сеть, согласованность).",
  "d": "Граница = стоимость связи. Монолит: вызовы внутри процесса — дёшево, но границы легко размываются, рефакторинг тормозит. Модульный монолит: те же дешёвые вызовы, но дисциплина модулей (отдельные пакеты/схемы, общение через интерфейсы) держит порядок и даёт лёгкий путь к выделению сервисов позже. Микросервисы: граница = сеть → нужны устойчивость к отказам, eventual consistency, распределённые транзакции/сага, observability, версионирование API. Бери микросервисы под реальную потребность (независимый деплой/масштаб команд), а не «на будущее»."
 },
 {
  "id": "arch-event-driven",
  "t": "Архитектура",
  "s": "стили",
  "q": "Событийная архитектура — когда и зачем?",
  "a": "Сервисы не дёргают друг друга напрямую, а кидают «событие» в брокер (типа Kafka): «заказ создан!». Кто хочет — тот слушает и реагирует. Продюсер не знает, кто его читает. Хочешь нового слушателя — просто подписал его, продюсера не трогаешь.",
  "d": "Связь идёт через факт «что произошло», а не через адрес «кому позвонить». Это даёт слабую связанность и асинхронность: продюсер не ждёт ответа и не падает, если подписчик лежит. Минусы реальны: сквозной поток размазан по сервисам — трудно отлаживать (нужны correlation-id, трейсинг) и держать консистентность (вместо транзакций — eventual consistency, идемпотентность, обработка дублей и порядка). Берём, когда подписчиков много и они меняются; для строгой синхронной транзакции «запрос-ответ» прямой вызов проще.",
  "code": "// Прямой вызов: продюсер ЗНАЕТ всех получателей\norderService.create(o);\nemailService.send(o);      // правишь продюсера\nanalyticsService.track(o); // при каждом новом потребителе\n\n// События: продюсер просто публикует факт\nbroker.publish(\"order.created\", o);\n// email, analytics, склад — подписываются сами,\n// продюсер не меняется"
 },
 {
  "id": "arch-12factor",
  "t": "Архитектура",
  "s": "стили",
  "q": "12-factor app — ключевые принципы?",
  "a": "12 правил, чтобы приложение жило в облаке без боли. Главное: настройки — в переменных окружения (не в коде), приложение ничего не помнит между запросами (stateless), логи льёт в stdout потоком. Тогда его легко копировать, масштабировать и переносить.",
  "d": "Ключевые из 12: 1) один кодбейс на много деплоев; 2) явно объявленные зависимости (pom/package.json, не «оно стоит на машине»); 3) конфиг в env, а не в коде — один и тот же образ едет в dev/stage/prod, меняются только переменные; 4) бэкенды (БД, очередь, кэш) — подключаемые ресурсы по URL; 5) stateless-процессы: состояние в БД/Redis, не в памяти инстанса → можно убить и поднять новый; 6) логи как поток событий в stdout, агрегацией занимается окружение; 7) dev/prod паритет — минимум различий между средами. Это и даёт горизонтальное масштабирование: запустил N одинаковых копий за балансировщиком.",
  "code": "// ПЛОХО — конфиг зашит в коде\nString db = \"jdbc:postgresql://prod-db:5432/app\";\nString key = \"sk_live_abc123\"; // секрет в git 😱\n\n// ХОРОШО — конфиг из окружения (12-factor)\nString db  = System.getenv(\"DATABASE_URL\");\nString key = System.getenv(\"API_KEY\");\n\n// stateless: НЕ храним сессию в памяти процесса\n// session.put(user) ❌  ->  redis.set(token, user) ✅\n\n// логи — просто в stdout, без файлов\nSystem.out.println(\"{\\\"event\\\":\\\"order_paid\\\",\\\"id\\\":42}\");"
 },
 {
  "id": "arch-api-gateway",
  "t": "Архитектура",
  "s": "микросервисы",
  "q": "API Gateway — зачем?",
  "a": "API Gateway — это одна дверь перед кучей микросервисов. Клиент стучится только в неё, а она сама решает: проверить вход (авторизация), не слишком ли часто стучат (rate limit), куда передать запрос (маршрутизация) и иногда собирает ответ из нескольких сервисов сразу. Клиент не знает адресов внутренних сервисов. Минус: если дверь сломается — встанет всё.",
  "d": "Что обычно делает шлюз: 1) маршрутизация (/orders → order-service); 2) аутентификация/авторизация в одном месте (проверка JWT/OIDC), сервисы доверяют шлюзу; 3) rate limiting и throttling; 4) агрегация — собрать ответ из 2-3 сервисов в один (BFF-паттерн); 5) версионирование API (/v1, /v2) без правок клиента; 6) TLS-терминация, логи, метрики. Главный риск — single point of failure и узкое место: лечится горизонтальным масштабированием шлюза (он stateless) + healthchecks. Не превращай шлюз в монолит: бизнес-логика живёт в сервисах, шлюз только про cross-cutting concerns. Примеры: Kong, Spring Cloud Gateway, Nginx, AWS API Gateway."
 },
 {
  "id": "arch-bff",
  "t": "Архитектура",
  "s": "микросервисы",
  "q": "Backend for Frontend (BFF) — идея?",
  "a": "BFF — это отдельный бэкенд под каждый тип клиента. Веб-экранам нужны одни данные, мобилке — другие. Вместо одного API «на всех» делаем свой слой под web и под mobile: каждый собирает ровно то, что нужно его экранам. Клиент не тянет лишнее и не делает 10 запросов.",
  "d": "Один общий API всегда компромисс: либо отдаёт лишние поля (over-fetch), либо клиент дёргает несколько эндпоинтов и склеивает сам (under-fetch). BFF разворачивает зависимость: бэкенд знает экраны клиента и подгоняет ответ под них, агрегируя вызовы к нижестоящим сервисам. Минус — дублирование логики между BFF и рост числа сервисов; BFF владеет команда фронта. Альтернатива тому же — GraphQL, где клиент сам выбирает поля."
 },
 {
  "id": "arch-service-discovery",
  "t": "Архитектура",
  "s": "микросервисы",
  "q": "Service discovery — зачем?",
  "a": "Сервисы при старте сами записываются в общий «телефонный справочник» (реестр). Клиент спрашивает: «где payment-service?» — реестр выдаёт живые адреса. IP менять не надо: инстансы гаснут и поднимаются с новыми адресами, а имя остаётся прежним.",
  "d": "Eureka/Consul хранят список инстансов и шлют heartbeat: умер инстанс — выпал из выдачи. Discovery бывает client-side (клиент сам выбирает инстанс) и server-side (выбор делает балансировщик/прокси). В Kubernetes роль реестра играет встроенный DNS + Service: обращаешься по имени сервиса, kube-proxy/endpoints разруливают живые поды.",
  "code": "// Жёсткий IP — ломается при рестарте/скейле:\nGET http://10.0.3.7:8080/pay\n\n// По имени через реестр — адрес найдётся сам:\nGET http://payment-service/pay\n// реестр -> [10.0.3.7, 10.0.3.9, ...] (только живые)"
 },
 {
  "id": "arch-service-mesh",
  "t": "Архитектура",
  "s": "микросервисы",
  "q": "Service mesh / sidecar — что решает?",
  "a": "Рядом с каждым сервисом ставят маленький прокси-«помощник» (sidecar). Весь сетевой трафик идёт через него: он сам шифрует (mTLS), повторяет при сбое, ставит таймауты, делит нагрузку и собирает трассировки. Код сервиса трогать не надо — сеть теперь забота прокси.",
  "d": "Sidecar — отдельный контейнер в том же поде, что и сервис (паттерн «прицеп»). Все sidecar'ы вместе = data plane; ими управляет control plane (Istio Pilot/istiod), раздавая конфиг и сертификаты. Сервис обращается к localhost — Envoy перехватывает трафик и решает, куда и как его слать. Плюсы: единая политика безопасности и наблюдаемости, ноль изменений в коде, разные языки. Минусы: +задержка на хоп, рост потребления CPU/RAM (по прокси на каждый под), сложность эксплуатации. Тренд 2024+ — ambient mesh (Istio) без sidecar'ов, чтобы убрать накладные расходы."
 },
 {
  "id": "arch-db-per-service",
  "t": "Архитектура",
  "s": "микросервисы",
  "q": "База на сервис vs общая база?",
  "a": "В микросервисах у каждого сервиса своя БД. Чужой сервис лезет к данным только через его API, а не напрямую в таблицы. Это даёт автономию: можно менять схему и деплоить независимо, никого не ломая. Общая БД на всех — это скрытая связанность: поменял колонку — упали соседи. Для микросервисов это антипаттерн.",
  "d": "Паттерн называется Database per Service. Чужой сервис не знает таблиц соседа — только его контракт (REST/gRPC/события). Плюсы: независимый деплой, своя технология БД под задачу, изоляция отказов и нагрузки, чёткие границы владения данными. Минус: данные размазаны, поэтому нет распределённых транзакций и JOIN между сервисами — согласованность достигается через Saga/события (eventual consistency), а сводные выборки — через API-композицию или CQRS read-модель. Общая БД (Shared Database) допустима лишь как временный шаг при распиле монолита, но это уже не настоящая микросервисная автономия."
 },
 {
  "id": "arch-saga-orch-choreo",
  "t": "Архитектура",
  "s": "микросервисы",
  "q": "Сага: оркестрация vs хореография?",
  "a": "Сага — это длинная транзакция из шагов, у каждого есть «откат» (компенсация). Оркестрация: один дирижёр командует, кому что делать и что откатывать — поток весь виден, но он единая точка отказа и всё к нему привязано. Хореография: сервисы сами реагируют на события друг друга — центра нет, связь слабая, но общий поток размазан и тяжелее отследить.",
  "d": "Сага решает проблему распределённой транзакции без 2PC: вместо одного ACID-коммита — цепочка локальных транзакций, и при сбое на шаге N выполняются компенсации шагов N-1…1 (семантический откад, не rollback).\n\nОркестрация: отдельный сервис-оркестратор (часто на BPMN-движке — Camunda/Zeebe, как в orders-service) хранит состояние саги и явно вызывает участников (команды) и их компенсации. Плюсы: логика потока в одном месте, легко добавить шаг, ясные таймауты/ретраи. Минусы: оркестратор знает про всех (связанность), это ещё один сервис для эксплуатации.\n\nХореография: участники общаются через события в брокере (Kafka). Сервис A публикует «OrderCreated» → B реагирует, делает своё, публикует «PaymentDone» → C и т.д. Плюсы: нулевая связанность, нет центра. Минусы: нет одного места, где виден весь сценарий; риск циклов событий; отладку спасают только correlation-id и трейсинг.\n\nПрактика: короткие саги 2-3 шага — хореография; сложный многошаговый бизнес-процесс с ветвлениями — оркестрация."
 },
 {
  "id": "arch-event-sourcing",
  "t": "Архитектура",
  "s": "микросервисы",
  "q": "Event sourcing — что и зачем?",
  "a": "Не храним «сколько сейчас на счёте». Храним список фактов: +100, -30, +50. Текущий баланс = сложить все факты с начала. Плюс — видно всю историю и можно «отмотать» назад. Минус — сложнее и медленнее, поэтому иногда сохраняют чекпойнт.",
  "d": "Источник правды — append-only лог событий (OrderCreated, ItemAdded, OrderPaid), их нельзя менять/удалять. Состояние — производная: replay событий через reducer. Скорость: периодический snapshot (состояние на версии N) + проигрываем только хвост после него. Боль — эволюция схемы: старые события в логе остаются навсегда, поэтому версионируют события и пишут upcaster'ы (миграция старого формата в новый на лету). Часто идёт в паре с CQRS: пишем события, а читаем из отдельных проекций (read-model). Не путать event sourcing (состояние ИЗ событий) с обычным publish событий в Kafka (события как side-эффект поверх state). Подходит там, где важны аудит и история (финансы, заказы), избыточно для простого CRUD.",
  "code": "// Состояние = свёртка (replay) событий с нуля\nevents = [\n  Deposited(100),\n  Withdrawn(30),\n  Deposited(50),\n]\nbalance = 0\nfor e in events:        // проигрываем по порядку\n  if e is Deposited: balance += e.amount\n  if e is Withdrawn: balance -= e.amount\n// balance == 120\n\n// Снапшот ускоряет: не с нуля, а с чекпойнта\nsnapshot = { version: 2, balance: 70 }      // итог после 2 событий\nbalance = snapshot.balance\nfor e in events[snapshot.version:]:          // только хвост: Deposited(50)\n  apply(e)\n// balance == 120"
 },
 {
  "id": "arch-replication",
  "t": "Архитектура",
  "s": "данные",
  "q": "Репликация: синхронная vs асинхронная?",
  "a": "У данных есть копии на других серверах (репликах). Синхронная: мастер ждёт «записал!» от реплики — надёжно, но медленнее. Асинхронная: мастер не ждёт — быстро, но реплика чуть отстаёт, и оттуда можно прочитать старое. Реплики берут на себя чтения, разгружая мастер.",
  "d": "Полусинхронная (semi-sync) — компромисс: мастер ждёт подтверждения хотя бы одной реплики, а не всех. При синхронной репликации, если реплика тормозит или упала, может зависнуть и сам мастер. При асинхронной — риск потери последних транзакций, если мастер умрёт до того, как они доехали до реплики. Чтение с реплики = «eventual consistency»: данные сойдутся, но не сию секунду (replication lag)."
 },
 {
  "id": "arch-sharding",
  "t": "Архитектура",
  "s": "данные",
  "q": "Шардинг — как и зачем?",
  "a": "Когда данных слишком много для одного сервера, ты режешь таблицу по ключу (например, по client_id) на куски — шарды. Каждый шард — отдельный сервер со своей частью данных. Записи и объём делятся между ними → можно расти вширь, добавляя серверы, а не один огромный.",
  "d": "Ключ шардирования критичен: по нему вычисляют, на каком шарде лежит строка (хеш ключа или диапазон). Плохой ключ → перекос (один шард забит, другие пусты) и горячие точки. Боль: ребалансировка при добавлении шарда (consistent hashing смягчает), и кросс-шард запросы/JOIN — данные на разных узлах, поэтому либо денормализуют, либо собирают результат на уровне приложения. Шардинг масштабирует ЗАПИСЬ и объём; для масштабирования ЧТЕНИЯ обычно хватает реплик."
 },
 {
  "id": "arch-read-write-split",
  "t": "Архитектура",
  "s": "данные",
  "q": "Разделение чтения и записи?",
  "a": "Писать можно только в мастер. А читать — с его копий (реплик). Так мастер не тонет в запросах на чтение. Но копии обновляются чуть позже: записал — и сразу на реплике можешь увидеть ещё старые данные.",
  "d": "Мастер копирует изменения на реплики асинхронно (репликация), отсюда лаг — это eventual consistency. Чтения масштабируются горизонтально: добавил реплику — вырос объём чтений. Записи не масштабируются так, мастер один. Если нужно прочитать ровно то, что только что записал, — читай с мастера (read-your-writes) или жди синхронизации."
 },
 {
  "id": "arch-caching-strategies",
  "t": "Архитектура",
  "s": "данные",
  "q": "Стратегии кэширования — какие бывают?",
  "a": "Кэш — это быстрый ящик перед БД. 4 способа держать его актуальным: cache-aside (приложение само кладёт при промахе), read-through (кэш сам тянет из БД), write-through (пишем в кэш и БД сразу — свежо, но медленно), write-behind (в кэш сразу, в БД потом — быстро, но риск потери).",
  "d": "Чтение: cache-aside и read-through. В cache-aside логику «при промахе сходи в БД и положи в кэш» пишет само приложение — кэш ничего не знает о БД. В read-through кэш сам умеет подгружать (через провайдер/loader), приложение всегда спрашивает только кэш. Запись: write-through держит кэш и БД синхронными (consistency), но платишь латентностью на каждой записи. Write-behind (он же write-back) подтверждает запись сразу, а в БД сбрасывает пачкой/по таймеру — высокая скорость записи, но при падении до сброса данные теряются, плюс окно несогласованности. Часто комбинируют: read-through + write-behind."
 },
 {
  "id": "arch-cdn",
  "t": "Архитектура",
  "s": "данные",
  "q": "CDN — зачем?",
  "a": "CDN — это сеть серверов по всему миру. Картинки, js, css, видео лежат не только на твоём главном сервере (origin), а копируются на узлы рядом с юзером. Человек из Алматы качает с сервера в Алматы, а не из США. Итог: грузится быстрее и нагрузка на origin падает.",
  "d": "Edge-узел кэширует ответ origin на TTL и сам отдаёт его повторным запросам — origin трогается только при cache miss или протухании. Профит: меньше задержка (короче путь до юзера), разгрузка origin и канала, устойчивость к всплескам трафика. Хорошо для статики/иммутабельных ассетов (versioned файлы, hash в имени); динамику и приватные данные обычно не кэшируют либо настраивают Cache-Control аккуратно."
 },
 {
  "id": "arch-load-balancing",
  "t": "Архитектура",
  "s": "масштаб",
  "q": "Балансировка нагрузки — как распределяет?",
  "a": "Балансировщик стоит перед группой одинаковых серверов и решает, кому отдать каждый запрос. Round-robin — по очереди, по кругу. Least-connections — тому, кто сейчас меньше всех занят. Хеш/sticky — один и тот же клиент всегда к своему серверу (чтобы сессия не потерялась). А health-check постоянно пингует серверы и упавшие убирает из списка.",
  "d": "Round-robin прост и хорош, когда запросы примерно равны по весу. Least-connections точнее при разной длительности запросов (одни быстрые, другие висят). Sticky/хеш-балансировка нужна, когда состояние сессии лежит на конкретном инстансе; идеал — сделать инстансы stateless (сессии в Redis), тогда привязка не нужна и любой запрос идёт куда угодно. Health-check бывает passive (смотрит на ошибки реального трафика) и active (отдельно пингует /health); упавший инстанс выводят из ротации и возвращают после нескольких успешных проверок.",
  "code": "upstream backend {\n  least_conn;                  # стратегия: к наименее занятому\n  server app1:8080 max_fails=3 fail_timeout=10s;  # health-check\n  server app2:8080 max_fails=3 fail_timeout=10s;\n  server app3:8080 max_fails=3 fail_timeout=10s;\n}\n# round-robin — по умолчанию (убрать least_conn)\n# sticky:  ip_hash;  — клиент всегда на один и тот же сервер"
 },
 {
  "id": "arch-rate-limiting",
  "t": "Архитектура",
  "s": "масштаб",
  "q": "Rate limiting: token bucket vs leaky bucket?",
  "a": "Оба ограничивают частоту запросов, защищая сервер от перегруза и abuse. Token bucket: токены копятся — короткий ВСПЛЕСК пропускаем, пока есть токены. Leaky bucket: запросы вытекают РОВНО с фиксированной скоростью — всплески сглаживаются в равномерный поток.",
  "d": "Token bucket: ёмкость B токенов, пополнение R токенов/сек. Запрос берёт токен; нет токенов — отказ (429). Допускает burst до B сразу. Leaky bucket: очередь фиксированного размера, обработка строго R/сек; переполнение очереди — отказ. TB важна СРЕДНЯЯ скорость + допустимый всплеск (популярнее в API: nginx, Stripe). LB важна РОВНАЯ выходная скорость (трафик-шейпинг, защита downstream от спайков). По сути TB — лимит на вход с буфером всплеска, LB — стабилизация на выходе.",
  "code": "// Token bucket (псевдокод)\nallow():\n  now = time()\n  tokens = min(B, tokens + (now - last) * R)  // капаем токены\n  last = now\n  if tokens >= 1:\n    tokens -= 1; return ALLOW\n  return DENY  // 429 Too Many Requests\n\n// Leaky bucket: очередь + утечка ровно R/сек\n//   входит всплеск → выходит равномерно"
 },
 {
  "id": "arch-consistency-models",
  "t": "Архитектура",
  "s": "масштаб",
  "q": "Сильная vs eventual консистентность?",
  "a": "Сильная: записал — и все тут же читают новое значение, но система ждёт, пока все согласуются (медленнее, дороже). Eventual: записал — кто-то ещё пару мгновений видит старое, зато быстро и работает даже при сбоях. Выбираешь по тому, что критичнее: точность или скорость/доступность.",
  "d": "Связь с CAP/PACELC: при сетевом разрыве сильная консистентность жертвует доступностью (CP), eventual — выбирает доступность (AP). Даже без сбоев (Else) сильная платит латентностью на координацию (кворумы, консенсус Raft/Paxos), eventual — отдаёт ответ из ближайшей реплики. Деньги/остатки на счёте → strong. Лайки, счётчики просмотров, лента → eventual норм."
 },
 {
  "id": "arch-consensus",
  "t": "Архитектура",
  "s": "масштаб",
  "q": "Консенсус (Raft) — как договариваются узлы?",
  "a": "Узлы выбирают одного главного — ЛИДЕРА. Он записывает изменения и рассылает их остальным. Изменение «принято», только когда его записало БОЛЬШИНСТВО узлов (кворум). Поэтому даже если часть узлов упадёт, все видят одну и ту же правду.",
  "d": "Кворум = больше половины. Из 5 узлов нужно 3 — переживём падение 2. Замолчал лидер — узлы по таймауту начинают выборы и голосуют за нового (голос даёт лишь тот, чей лог не старее). Большинство не даёт появиться двум лидерам и не теряет подтверждённую запись. Узлов берут нечётное (3,5,7): 4 терпит те же отказы, что и 3, но требует больше согласований."
 },
 {
  "id": "arch-distributed-lock",
  "t": "Архитектура",
  "s": "масштаб",
  "q": "Распределённая блокировка — грабли?",
  "a": "Один из многих процессов берёт «ключ» в Redis/ZooKeeper, чтобы трогать ресурс в одиночку. Ставят TTL, чтоб ключ сам отпустился, если процесс умер. Но если работа длится дольше TTL — ключ протух, второй процесс тоже зашёл, и теперь их двое. Часто проще сделать саму операцию идемпотентной: повтор не ломает.",
  "d": "Грабли: (1) TTL истёк, пока процесс ещё работает (GC-пауза, медленный I/O) → лок «увели», двое пишут одновременно. (2) Split-brain: сеть разорвалась, Redis-нода думает, что лок свободен, выдаёт его другому. Лекарства: fencing token (монотонный номер, ресурс отвергает «старый» лок), Redlock с оговорками, но честнее — идемпотентность: dedup-ключ/INSERT ... ON CONFLICT/UPSERT, чтобы повтор был безопасен и гонка не портила данные. Лок снижает вероятность, идемпотентность убирает последствия.",
  "code": "// Лок может «протухнуть» — не гарантия. Лучше сделать саму запись идемпотентной:\nINSERT INTO payments(op_id, amount)\nVALUES ('op-42', 100)\nON CONFLICT (op_id) DO NOTHING;  // повтор/двойной заход = безопасно\n\n// Если лок нужен — добавь fencing token:\n// ресурс хранит max_token и отвергает запросы со старым (token <= max_token)"
 },
 {
  "id": "arch-2pc-vs-saga",
  "t": "Архитектура",
  "s": "масштаб",
  "q": "2PC vs Saga — для распределённой транзакции?",
  "a": "2PC: один начальник спрашивает всех «готовы?», все замирают и ждут — атомарно, но если начальник упал, все стоят с заблокированными ресурсами. Saga: делаешь шаги по одному, каждый сразу фиксируется; если что-то сломалось — откатываешь руками (компенсации). Не блокирует, но другие видят полпути.",
  "d": "2PC (two-phase commit): фаза 1 prepare — координатор просит всех участников зарезервировать и сказать «готов»; фаза 2 commit/abort — если все «да», команда зафиксировать. Пока идёт голосование, строки/локи держатся → плохо масштабируется, и сбой координатора между фазами оставляет ресурсы заблокированными (in-doubt). Saga: бизнес-транзакция = последовательность локальных транзакций T1..Tn, каждая коммитит сразу; на ошибку шага k запускаются компенсации C(k-1)..C1. Изоляции нет — нужны защиты от dirty read/lost update (семантические локи, версии, идемпотентность). Координация: оркестрация (центральный сага-оркестратор) или хореография (события). В микросервисах обычно выбирают Saga именно из-за отсутствия блокировок между сервисами.",
  "code": "// SAGA (оркестрация): шаги + компенсации\nsaga.step(reserveStock,   undo: releaseStock)\n    .step(chargePayment,  undo: refundPayment)\n    .step(createShipment, undo: cancelShipment);\n// упал на createShipment → refundPayment(), releaseStock()\n\n// 2PC: координатор держит всех в ожидании\nprepare()  -> участники: lock + \"ready\"   // ресурсы заблокированы\ncommit()   -> участники: apply + unlock    // если координатор упал тут — beda"
 },
 {
  "id": "g-java-finalize-clone",
  "t": "Java",
  "s": "Object/clone",
  "q": "Почему clone() считается «сломанным» и что делает Cloneable?",
  "a": "Cloneable — маркер без методов: без него Object.clone() кидает CloneNotSupportedException. Сам clone() делает поверхностную копию: ссылочные поля общие. Глубокую копию пиши руками. Часто проще копирующий конструктор или copy-фабрика.",
  "d": "clone() обходит конструкторы, плохо дружит с final-полями и наследованием. Эффективный Java советует: вместо clone() — копирующий конструктор/статическую фабрику. Для record есть готовый паттерн через новый экземпляр.",
  "code": "// shallow: list общий!\nclass Box implements Cloneable {\n  List<String> items;\n  public Box clone() throws CloneNotSupportedException {\n    Box b = (Box) super.clone();\n    b.items = new ArrayList<>(items); // глубоко руками\n    return b;\n  }\n}\n// Лучше — copy-конструктор:\nBox(Box o){ this.items = new ArrayList<>(o.items); }"
 },
 {
  "id": "g-java-comparator-nulls",
  "t": "Java",
  "s": "Comparator",
  "q": "comparing/thenComparing — как сортировать по нескольким полям и не упасть на null?",
  "a": "Comparator.comparing(A::field).thenComparing(A::field2) строит цепочку: второй ключ работает при равенстве первого. Для null-полей оборачивай nullsFirst/nullsLast, иначе NPE при сравнении. reversed() переворачивает.",
  "d": "comparing берёт key-extractor и вызывает compareTo ключа. Для примитивов есть comparingInt/Long/Double — без autoboxing. Важно: reversed() переворачивает ВСЮ цепочку до него, следи за порядком вызовов.",
  "code": "list.sort(\n  Comparator.comparing(User::lastName)\n    .thenComparing(User::firstName)\n    .thenComparing(User::age,\n        Comparator.nullsLast(Integer::compareTo)));"
 },
 {
  "id": "g-java-varargs-trap",
  "t": "Java",
  "s": "varargs",
  "q": "Varargs: почему передача null или массива иногда «не то» и при чём heap pollution?",
  "a": "varargs — это сахар над массивом. method(null) трактуется как null-массив (NPE/неоднозначность), а не как один элемент. С дженериками-вараргами компилятор ругается heap pollution: внутри тип стирается, можно положить чужой тип. @SafeVarargs глушит предупреждение.",
  "d": "foo(T...) создаёт T[] = Object[] из-за стирания; запись чужого типа = ClassCastException позже. @SafeVarargs ставь только если реально не пишешь в массив и не отдаёшь его наружу.",
  "code": "static <T> List<T> of(T... a){ return Arrays.asList(a); }\nString[] s = {\"a\"};\nof(s);        // List<String> — массив как varargs\nof((Object)s);// List<Object> с одним элементом-массивом\nfoo(null);    // foo(String...) -> null array, не {null}"
 },
 {
  "id": "g-java-enummap-weakhashmap",
  "t": "Java",
  "s": "collections",
  "q": "EnumMap, WeakHashMap, IdentityHashMap — когда брать вместо HashMap?",
  "a": "EnumMap — ключи-enum: внутри массив по ordinal, быстрее и компактнее HashMap. WeakHashMap — ключи держатся слабо, GC выкинет запись если ключ больше нигде не нужен (кэши). IdentityHashMap сравнивает ключи по ==, а не equals.",
  "d": "EnumMap сохраняет порядок объявления enum. WeakHashMap полезен для метаданных по объектам без утечек. IdentityHashMap нужен сериализаторам/графам объектов где важна идентичность, а не равенство (две равные строки = два ключа).",
  "code": "var m = new EnumMap<Day, String>(Day.class);\nm.put(Day.MON, \"work\"); // массив[ordinal]\n\nMap<Key,Meta> cache = new WeakHashMap<>(); // ключ ушёл -> запись чистится\n\nvar id = new IdentityHashMap<String,Integer>();\nid.put(new String(\"a\"),1); id.put(new String(\"a\"),2); // 2 записи!"
 },
 {
  "id": "g-java-navigablemap",
  "t": "Java",
  "s": "collections",
  "q": "NavigableMap/TreeMap и Deque — зачем floor/ceiling и двусторонняя очередь?",
  "a": "TreeMap (NavigableMap) держит ключи отсортированными и даёт floorKey/ceilingKey/higher/lower — «ближайший снизу/сверху», headMap/tailMap, subMap. Deque — очередь с двух концов: addFirst/addLast/pollFirst; заменяет Stack и работает как стек или очередь.",
  "d": "NavigableMap идеален для диапазонных запросов: тарифы по порогу, ближайшая дата. ArrayDeque быстрее LinkedList как стек/очередь и без потокобезопасности (значит без её оверхеда). Stack устарел (synchronized, наследует Vector).",
  "code": "NavigableMap<Integer,String> tariff = new TreeMap<>();\ntariff.put(0,\"free\"); tariff.put(100,\"pro\");\ntariff.floorEntry(50); // 0=free (ближайший <=)\n\nDeque<Integer> st = new ArrayDeque<>();\nst.push(1); st.push(2); st.pop(); // 2 (LIFO)"
 },
 {
  "id": "g-java-generics-capture",
  "t": "Java",
  "s": "Generics",
  "q": "Capture: почему List<?> не даёт писать, а helper-метод спасает?",
  "a": "List<?> — «список чего-то неизвестного»: компилятор не знает тип, поэтому add запрещён (кроме null). Capture — он внутренне даёт этому неизвестному имя CAP#1. Трюк: приватный generic-метод <T> «ловит» тип в T и работает с ним типобезопасно.",
  "d": "Wildcard capture — основа swap/перестановок на List<?>. Без helper-а компилятор не может доказать, что get и set оперируют одним типом. Это частый вопрос на синьора про границы вывода типов.",
  "code": "void swap(List<?> l, int i, int j){ swapHelper(l,i,j); }\nprivate <T> void swapHelper(List<T> l,int i,int j){\n  T t = l.get(i);          // T захвачен из ?\n  l.set(i, l.get(j));\n  l.set(j, t);             // теперь set разрешён\n}"
 },
 {
  "id": "g-java-final-vars",
  "t": "Java",
  "s": "Keywords",
  "q": "final у переменной, метода и класса — три разных смысла. И что такое effectively final?",
  "a": "final var — присвоить один раз (не делает объект immutable, только ссылку). final метод — нельзя переопределить. final class — нельзя наследовать (String). Effectively final — переменную не меняешь после присвоения; лямбды и анонимы захватывают только такие.",
  "d": "final-поле гарантирует видимость после конструктора (safe publication в JMM) — основа immutable-классов. Лямбда не может захватить меняющуюся локальную переменную из-за модели захвата по значению.",
  "code": "final List<Integer> l = new ArrayList<>();\nl.add(1);          // OK: меняем содержимое\n// l = new ArrayList<>(); // ошибка: ссылка final\n\nint x = 5;         // effectively final\nRunnable r = () -> System.out.println(x);\n// x = 6;          // сломает: x уже не eff. final"
 },
 {
  "id": "g-java-object-methods",
  "t": "Java",
  "s": "Object",
  "q": "hashCode/equals контракт и зачем переопределять toString — что требует JVM?",
  "a": "Контракт: equals рефлексивен, симметричен, транзитивен, консистентен; равные объекты дают равный hashCode (обратное не обязано). Нарушишь — HashMap/HashSet ломаются. toString для логов/дебага; getClass и instanceof по-разному ведут себя с наследниками.",
  "d": "equals через getClass() ломает симметрию с подклассами; через instanceof — рискует асимметрией. Для record equals/hashCode/toString даны автоматически по компонентам. hashCode должен быть стабилен пока объект в коллекции.",
  "code": "@Override public boolean equals(Object o){\n  if (this == o) return true;\n  if (!(o instanceof User u)) return false; // pattern\n  return id == u.id && name.equals(u.name);\n}\n@Override public int hashCode(){ return Objects.hash(id,name); }"
 },
 {
  "id": "g-java-checked-streams",
  "t": "Java",
  "s": "Streams/Exceptions",
  "q": "Почему в stream().map(...) нельзя бросить checked-исключение и как это обходят?",
  "a": "Функциональные интерфейсы (Function и пр.) не объявляют throws checked, поэтому лямбда внутри map не может бросить, например, IOException. Обходы: обернуть в RuntimeException, вынести в try внутри лямбды, или сделать обёртку-функцию throwing wrapper.",
  "d": "Это следствие сигнатур JDK-интерфейсов. Лучшая практика — не тащить I/O в стримы; если надо, заведи свой @FunctionalInterface с throws или собирай ошибки через partition/Result-объект, а не глуши их.",
  "code": "// не компилится:\n// files.stream().map(f -> Files.readString(f)) // IOException\n\nfiles.stream().map(f -> {\n  try { return Files.readString(f); }\n  catch (IOException e){ throw new UncheckedIOException(e); }\n}).toList();"
 },
 {
  "id": "g-java-compact-intern",
  "t": "Java",
  "s": "Strings",
  "q": "Compact Strings и intern() — как String хранится и чем опасен intern в проде?",
  "a": "С Java 9 String внутри — byte[] (Latin-1 = 1 байт/символ), а не char[]: экономит память на ASCII. intern() кладёт строку в пул и возвращает канонический экземпляр — но забивает пул и может тормозить; для дедупликации лучше -XX:+UseStringDeduplication у G1.",
  "d": "Литералы и константы автоматически в пуле. Ручной intern() оправдан редко (массовые одинаковые ключи), иначе рост метаданных пула и contention. Compact Strings включены по умолчанию, отключаются -XX:-CompactStrings.",
  "code": "String a = new String(\"hi\");\nString b = a.intern();      // канонический из пула\nb == \"hi\";                 // true\na == \"hi\";                 // false (a — отдельный объект)"
 },
 {
  "id": "g-jvm-jit-tiers",
  "t": "JVM",
  "s": "JIT C1/C2",
  "q": "Зачем в HotSpot два компилятора C1 и C2, и что такое «прогрев»?",
  "a": "Сначала код идёт через интерпретатор (медленно, но сразу). Часто вызываемые методы JIT компилирует: C1 — быстро и грубо, C2 — долго, но очень оптимально. Прогрев = пока счётчики не накопят статистику, код не оптимизирован, первые запросы тормозят.",
  "d": "Tiered compilation: уровни 0 (интерпретатор) → 1-3 (C1 с профилированием) → 4 (C2). Пороги: -XX:CompileThreshold, -XX:TierStopAtLevel. Поэтому бенчмарки без прогрева врут — нужен JMH. C2 использует профиль из C1 для спекулятивных оптимизаций.",
  "code": "// прогрев перед замером\nfor (int i = 0; i < 20_000; i++) hot(i);\n// флаги\n-XX:+TieredCompilation -XX:TierStopAtLevel=1 // только C1\n-Xint  // чистый интерпретатор\n-Xcomp // компилировать сразу (без профиля)"
 },
 {
  "id": "g-jvm-deopt",
  "t": "JVM",
  "s": "Deoptimization",
  "q": "Что такое deoptimization и почему уже скомпилированный метод вдруг откатывается в интерпретатор?",
  "a": "C2 делает спекулятивные ставки: «этот тип всегда такой», «эта ветка не выполняется». Если ставка не сбылась (загрузили новый класс, пошли в редкую ветку) — JVM выбрасывает скомпилированный код и возвращается в интерпретатор, потом перекомпилирует.",
  "d": "Триггеры: uncommon trap (редкая ветка), class loading ломает CHA-инлайн моно-морфного вызова, неверный type-profile. На графиках видно временное падение perf после deopt. Слишком частые deopt = JIT не может стабилизироваться (мегаморфные call-site).",
  "code": "-XX:+PrintCompilation        // видеть made not entrant / zombie\n-XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining\n// 'made not entrant' = метод деоптимизирован"
 },
 {
  "id": "g-jvm-inlining",
  "t": "JVM",
  "s": "Inlining",
  "q": "Что такое инлайнинг и почему это «мать всех оптимизаций» в JIT?",
  "a": "JIT вставляет тело вызываемого метода прямо в место вызова — убирает накладные расходы на call и открывает другие оптимизации (escape analysis, свёртка констант) через границу метода. Без инлайна большинство остальных оптимизаций не работают.",
  "d": "Лимиты: -XX:MaxInlineSize (по умолч. 35 байт), FreqInlineSize (325). Мегаморфные вызовы (>2 реализаций на call-site) не инлайнятся — поэтому длинные цепочки virtual вызовов медленны. Маленькие геттеры инлайнятся почти всегда.",
  "code": "-XX:+PrintInlining   // 'too large', 'hot method too big', 'inline (hot)'\n-XX:MaxInlineSize=35\n-XX:FreqInlineSize=325"
 },
 {
  "id": "g-jvm-zgc-shenandoah",
  "t": "JVM",
  "s": "Low-pause GC",
  "q": "Чем ZGC и Shenandoah принципиально отличаются от G1 и зачем они?",
  "a": "G1 всё ещё делает заметные STW-паузы на больших heap. ZGC и Shenandoah переносят (evacuation) объекты и чинят ссылки конкурентно — с приложением. Паузы — субмиллисекунды почти независимо от размера heap (хоть терабайты).",
  "d": "Достигается через load/store barriers и colored pointers (ZGC) / Brooks-forwarding (старый Shenandoah). Цена: чуть выше throughput-оверхед и память. Generational ZGC — опция с JDK 21 (-XX:+ZGenerational), дефолт с JDK 23. Выбор: нужна предсказуемая низкая latency на big heap → ZGC; throughput-батч → Parallel.",
  "code": "-XX:+UseZGC -XX:+ZGenerational   // gen: опция c JDK 21, дефолт c JDK 23\n-XX:+UseShenandoahGC\n-XX:+UseParallelGC               // max throughput, большие паузы\n-XX:+UseG1GC                     // default, баланс"
 },
 {
  "id": "g-jvm-classloader-delegation",
  "t": "JVM",
  "s": "ClassLoaders",
  "q": "Как работает parent-delegation у class loader'ов и зачем это нужно?",
  "a": "Прежде чем грузить класс сам, loader спрашивает родителя (вверх: app → platform → bootstrap). Класс грузит первый, кто смог. Это не даёт подменить java.lang.String своей версией и гарантирует один экземпляр core-классов.",
  "d": "Иерархия (JDK 9+): Bootstrap → Platform → Application. Identity класса = (имя + загрузивший loader): один класс, загруженный двумя loader'ами, — два разных типа, ClassCastException. Tomcat/OSGi ломают делегирование (child-first) для изоляции приложений.",
  "code": "// два loader'а → разные типы\nClass<?> a = loaderA.loadClass(\"X\");\nClass<?> b = loaderB.loadClass(\"X\");\na == b;            // false!\n// ClassCastException при касте между ними"
 },
 {
  "id": "g-jvm-happens-before",
  "t": "JVM",
  "s": "JMM",
  "q": "Что такое happens-before в JMM и почему без него один поток не видит запись другого?",
  "a": "Без синхронизации JVM/CPU могут переупорядочивать и кэшировать записи — поток может вечно видеть старое значение. happens-before — гарантия видимости: если A hb B, то всё записанное до A видно после B. Дают её volatile, synchronized, final, join/start.",
  "d": "Классика: volatile-запись hb volatile-чтение того же поля; unlock hb lock; Thread.start() hb тело потока; конец потока hb join. volatile НЕ даёт атомарность compound (i++), только видимость + запрет реордеринга вокруг. Для счётчиков — AtomicInteger.",
  "code": "// без volatile поток может крутиться вечно\nvolatile boolean stop;\n// writer\nstop = true;           // hb\n// reader\nwhile (!stop) { ... }  // увидит true"
 },
 {
  "id": "g-jvm-string-intern-dedup",
  "t": "JVM",
  "s": "Strings",
  "q": "Чем String interning отличается от G1 String Deduplication?",
  "a": "intern() — ваш явный вызов: кладёт строку в общий пул, возвращает канонический объект, == работает. String dedup — фоновая работа G1: находит разные String-объекты с одинаковым содержимым и делает так, чтобы они делили один char[]/byte[]. Объекты остаются разными, экономится только массив.",
  "d": "intern: пул в native памяти (не PermGen с JDK 7+), злоупотребление = рост и contention. Dedup: -XX:+UseStringDeduplication (только G1/некоторые), прозрачен, не меняет identity, помогает когда много дублей строк (JSON, БД). Не путать: dedup не даёт == true.",
  "code": "-XX:+UseStringDeduplication      // G1 фоном делит backing-массивы\n-XX:+PrintStringDeduplicationStatistics\n// intern — вручную:\nString s = raw.intern();         // канонический из пула"
 },
 {
  "id": "g-jvm-heap-flags-ergonomics",
  "t": "JVM",
  "s": "Flags/metrics",
  "q": "Какие ключевые флаги heap и почему -Xmx==-Xms часто ставят в проде?",
  "a": "-Xms — стартовый размер heap, -Xmx — максимум. Если они разные, JVM растит heap постепенно и делает паузы на ресайз/коммит памяти. Ставят -Xms == -Xmx, чтобы зафиксировать heap сразу, убрать ресайзы и нестабильность latency.",
  "d": "В контейнерах: JVM 10+ читает cgroup-лимиты; вместо -Xmx часто -XX:MaxRAMPercentage=75. Метрики GC: -Xlog:gc* (JDK 9+), -verbose:gc (старое). Полезно: -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=... Не забывают, что heap != весь процесс (Metaspace, потоки, direct, code cache сверху).",
  "code": "-Xms4g -Xmx4g                    // фикс heap\n-XX:MaxRAMPercentage=75.0         // контейнеры\n-Xlog:gc*:file=gc.log:time,uptime // лог GC (JDK9+)\n-XX:+HeapDumpOnOutOfMemoryError"
 },
 {
  "id": "g-jvm-safepoint",
  "t": "JVM",
  "s": "Safepoints",
  "q": "Что такое safepoint и почему длинный цикл без вызовов может «заморозить» всю JVM?",
  "a": "Чтобы сделать STW (GC, deopt, dump), JVM должна остановить все потоки в безопасных точках — safepoint'ах. Поток в горячем счётном цикле без safepoint-проверки не останавливается, и все остальные потоки ждут его — это «time to safepoint».",
  "d": "Safepoint-поллы JIT вставляет на бэк-граней методов и в обычных циклах, но C2 может убрать их из «counted loop» (int-счётчик). Долгий такой цикл → высокий TTSP, паузы выглядят как GC, хотя GC ни при чём. Диагностика: -Xlog:safepoint. Лечение: long-счётчик, разбить цикл.",
  "code": "-Xlog:safepoint            // время до safepoint и причина\n-XX:+PrintSafepointStatistics  // (старые JDK)\n// counted loop с int может НЕ иметь safepoint-полла:\nfor (int i = 0; i < N; i++) { /* no call */ }"
 },
 {
  "id": "g-co-forkjoin-steal",
  "t": "Concurrency",
  "s": "ForkJoinPool",
  "q": "Что такое work-stealing в ForkJoinPool и зачем он?",
  "a": "У каждого потока своя двусторонняя очередь задач. Свои задачи берёт с одного конца, а если очередь пуста — крадёт чужую с другого конца. Так никто не простаивает, нагрузка сама выравнивается между ядрами без общего узкого места.",
  "d": "fork() кладёт подзадачу в локальную deque (LIFO для своих — горячий кэш), кража идёт FIFO (старые крупные задачи — меньше конфликтов). common pool используется parallelStream() и CompletableFuture по умолчанию: не блокируй его (особенно blocking IO), иначе встанут все стримы приложения.",
  "code": "class Sum extends RecursiveTask<Long> {\n  int lo, hi; long[] a;\n  protected Long compute() {\n    if (hi - lo <= 1000) { long s=0; for(int i=lo;i<hi;i++) s+=a[i]; return s; }\n    int mid=(lo+hi)>>>1;\n    Sum l=new Sum(a,lo,mid); l.fork();   // в свою deque\n    Sum r=new Sum(a,mid,hi);\n    return r.compute() + l.join();        // правую считаем сами\n  }\n}"
 },
 {
  "id": "g-co-cf-combine-exc",
  "t": "Concurrency",
  "s": "CompletableFuture",
  "q": "thenCombine vs exceptionally vs handle в CompletableFuture?",
  "a": "thenCombine — ждёт ДВА независимых future и склеивает их результаты. exceptionally — ловит ошибку и подставляет запасной результат (на успехе не зовётся). handle — вызывается ВСЕГДА: получает (результат, ошибку) и сам решает, что вернуть.",
  "d": "exceptionally видит только успех→пропуск, ошибка→fallback. handle/whenComplete срабатывают на обоих исходах (whenComplete не меняет результат, только сайд-эффект). Частая гоча: исключение внутри thenApply заворачивается в CompletionException — разворачивай getCause(). thenCompose для зависимых цепочек, thenCombine — для параллельных.",
  "code": "CompletableFuture<Integer> a = price();\nCompletableFuture<Integer> b = qty();\na.thenCombine(b, (p, q) -> p * q)      // ждём оба\n .exceptionally(ex -> 0)               // упало → 0\n .thenAccept(System.out::println);\n// handle ловит ОБА исхода:\na.handle((res, ex) -> ex != null ? -1 : res);"
 },
 {
  "id": "g-co-stampedlock",
  "t": "Concurrency",
  "s": "StampedLock",
  "q": "Чем StampedLock мощнее ReadWriteLock?",
  "a": "Добавляет оптимистичное чтение: берёшь «штамп», читаешь БЕЗ блокировки, потом validate(stamp) проверяет — не писал ли кто. Если нет — данные валидны почти бесплатно. ReadWriteLock на каждое чтение ставит реальную блокировку.",
  "d": "Три режима: write, read (пессимистичный), tryOptimisticRead. Оптимистичное чтение почти не тормозит писателей. Минусы: НЕ реентерабельный (повторный захват = deadlock), нет condition; при провале validate надо откатиться на честный readLock. После optimistic read обязательно копируй поля в локальные переменные ДО validate.",
  "code": "long stamp = sl.tryOptimisticRead();\ndouble cx = x, cy = y;          // читаем в локали\nif (!sl.validate(stamp)) {       // кто-то писал?\n  stamp = sl.readLock();         // честный read-lock\n  try { cx = x; cy = y; }\n  finally { sl.unlockRead(stamp); }\n}\nreturn Math.hypot(cx, cy);"
 },
 {
  "id": "g-co-aba",
  "t": "Concurrency",
  "s": "ABA / CAS",
  "q": "Проблема ABA в CAS и как её лечат?",
  "a": "Поток читает значение A, отвлёкся; другой меняет A→B→A. Первый делает CAS(A→…) — он проходит, ведь значение «снова A», хотя на деле всё успело измениться. Лечат версией/стампом: сравнивают не только значение, но и счётчик изменений.",
  "d": "Опасно в lock-free стеках/очередях на ссылках: вершина «та же», но узел уже переиспользован. AtomicStampedReference добавляет int-штамп, AtomicMarkableReference — boolean-метку. Каждое изменение крутит штамп, поэтому ABA не пройдёт CAS. Для примитивных счётчиков ABA обычно безвреден — важен для указателей/освобождения памяти.",
  "code": "AtomicStampedReference<Node> top =\n    new AtomicStampedReference<>(head, 0);\nint[] st = new int[1];\nNode cur = top.get(st);\n// CAS пройдёт только если И ссылка, И штамп совпали:\ntop.compareAndSet(cur, cur.next, st[0], st[0] + 1);"
 },
 {
  "id": "g-co-blockingqueue-types",
  "t": "Concurrency",
  "s": "BlockingQueue",
  "q": "ArrayBlockingQueue vs LinkedBlockingQueue vs SynchronousQueue?",
  "a": "Array — кольцевой массив фиксированного размера, один лок. Linked — на узлах, опционально безграничная (бэкпрешер теряется!), два лока (быстрее под нагрузкой). Synchronous — ёмкость 0: передача из рук в руки, put ждёт пока кто-то заберёт.",
  "d": "Выбор очереди в ThreadPoolExecutor определяет поведение: unbounded LinkedBlockingQueue → maxPoolSize игнорируется, риск OOM. SynchronousQueue + большой max = создаём поток под каждую задачу (как cachedThreadPool). PriorityBlockingQueue — по приоритету, unbounded. DelayQueue — элементы выходят по таймеру. Всегда ограничивай очередь под нагрузкой.",
  "code": "// ОПАСНО: очередь без границ → OOM, max игнорится\nnew ThreadPoolExecutor(4, 4, 0L, MILLISECONDS,\n    new LinkedBlockingQueue<>());        // ∞\n// Бэкпрешер: ограниченная + отклонение\nnew ThreadPoolExecutor(4, 8, 60L, SECONDS,\n    new ArrayBlockingQueue<>(100),\n    new ThreadPoolExecutor.CallerRunsPolicy());"
 },
 {
  "id": "g-co-sleep-vs-wait",
  "t": "Concurrency",
  "s": "wait/sleep",
  "q": "Thread.sleep vs Object.wait — в чём разница для лока?",
  "a": "sleep НЕ отпускает монитор: спишь с захваченным локом, никто к данным не подойдёт. wait отпускает монитор и встаёт в очередь, пока его не разбудят notify. sleep — про время, wait — про условие/координацию между потоками.",
  "d": "wait/notify зовутся только внутри synchronized на том же объекте (иначе IllegalMonitorStateException). wait ВСЕГДА в цикле while(условие) — защита от spurious wakeup и от того, что условие изменилось между notify и захватом лока. sleep можно звать где угодно, прерывается interrupt → InterruptedException. notifyAll безопаснее notify (нет потери сигнала).",
  "code": "synchronized (lock) {\n  while (!ready) {        // не if! spurious wakeup\n    lock.wait();          // отпустил монитор, ждёт\n  }\n  consume();\n}\n// producer:\nsynchronized (lock) { ready = true; lock.notifyAll(); }"
 },
 {
  "id": "g-co-livelock-starvation",
  "t": "Concurrency",
  "s": "Liveness",
  "q": "Livelock vs starvation vs deadlock — чем отличаются?",
  "a": "Deadlock — все застыли, ждут друг друга, 0% CPU. Livelock — потоки активно дёргаются и уступают друг другу, но прогресса нет (CPU 100%, толку 0). Starvation — поток жив, но ему вечно не дают ресурс: его обходят более жадные/приоритетные.",
  "d": "Livelock: двое в коридоре шагают в одну сторону, чтобы разойтись, и снова синхронно — классика наивных retry с одинаковым backoff. Лечат рандомизированной задержкой (как Ethernet CSMA/CD). Starvation: unfair-локи, низкий приоритет, тяжёлый писатель в ReadWriteLock без fairness. Lock(true) = честная очередь, но медленнее.",
  "code": "// livelock-фикс: рандомный backoff\nwhile (!tryAcquireBoth()) {\n  releaseAll();\n  Thread.sleep(ThreadLocalRandom.current()\n      .nextInt(1, 50));   // разный для каждого\n}\n// starvation-фикс: честный лок\nnew ReentrantLock(true);"
 },
 {
  "id": "g-co-tlrandom",
  "t": "Concurrency",
  "s": "ThreadLocalRandom",
  "q": "Почему ThreadLocalRandom быстрее Math.random под нагрузкой?",
  "a": "Math.random и общий Random держат один seed в AtomicLong — все потоки на каждый вызов дерутся за CAS этого seed (contention). ThreadLocalRandom даёт каждому потоку свой seed: 0 конкуренции, число генерится локально и быстро.",
  "d": "Не создавай new Random на поток вручную — TLR сделан правильно (избегает false sharing через padding, ленив). Вызывай через current(): ThreadLocalRandom.current().nextInt(). Для криптографии НЕ годится (предсказуем) — там SecureRandom. В Java 17+ есть RandomGenerator/RandomGeneratorFactory как обобщённый API.",
  "code": "// плохо: общий seed = CAS-война\nint x = ThreadLocalRandom.current().nextInt(100);\n// в Stream:\nint y = ThreadLocalRandom.current()\n    .ints(0, 100).limit(5).sum();\n// НЕ: new Random() в каждом потоке вручную"
 },
 {
  "id": "g-co-phaser",
  "t": "Concurrency",
  "s": "Phaser",
  "q": "Зачем Phaser, если есть CyclicBarrier и CountDownLatch?",
  "a": "Phaser — барьер для многофазных задач с динамическим числом участников. В отличие от CyclicBarrier (число фиксировано) и Latch (одноразовый), тут можно регистрировать/снимать стороны на лету и проходить много фаз подряд одним объектом.",
  "d": "register()/arriveAndAwaitAdvance() — приходишь и ждёшь конца фазы; arriveAndDeregister() — ушёл и уменьшил счётчик (для динамики/завершения). onAdvance(phase, parties) переопределяешь, чтобы остановить циклы. Удобен для итеративных алгоритмов (волны вычислений), где на каждой фазе число воркеров меняется. Сложнее в API — бери только когда реально нужна динамика/многофазность.",
  "code": "Phaser ph = new Phaser(1);          // сам = 1 сторона\nfor (Task t : tasks) {\n  ph.register();                    // +1 на лету\n  exec.submit(() -> {\n    work(t);\n    ph.arriveAndDeregister();       // -1 по готовности\n  });\n}\nph.arriveAndAwaitAdvance();          // ждём всех"
 },
 {
  "id": "g-co-condition-lostwakeup",
  "t": "Concurrency",
  "s": "Condition / Lock",
  "q": "Зачем Condition вместо wait/notify и в чём гоча с двумя условиями?",
  "a": "ReentrantLock даёт несколько Condition на один лок: отдельная очередь «не пусто» и «не полно». Можно будить именно нужных (signal на нужном condition), а не всех подряд. С wait/notify очередь одна — приходится notifyAll и будить лишних.",
  "d": "await/signal зовутся под lock() (иначе IllegalMonitorStateException), как и wait под synchronized. Главная гоча: путаница signal/signalAll при двух условиях ведёт к lost wakeup и зависанию — будишь не ту очередь. await в while(условие) обязателен. signalAll безопаснее, но менее эффективен. Это ровно паттерн bounded buffer.",
  "code": "Lock lk = new ReentrantLock();\nCondition notFull = lk.newCondition();\nCondition notEmpty = lk.newCondition();\nvoid put(E x) throws InterruptedException {\n  lk.lock();\n  try {\n    while (count == cap) notFull.await();\n    enqueue(x); count++;\n    notEmpty.signal();   // будим именно потребителя\n  } finally { lk.unlock(); }\n}"
 },
 {
  "id": "g-sp-postconstruct",
  "t": "Spring",
  "s": "lifecycle",
  "q": "@PostConstruct отрабатывает, а @Async/@Transactional внутри него почему-то не работают. Почему?",
  "a": "@PostConstruct зовётся на «сыром» бине ДО того, как BeanPostProcessor обернул его в прокси. Аннотации-аспекты (@Async, @Transactional, @Cacheable) живут на прокси — а в @PostConstruct ты сидишь внутри настоящего объекта, мимо прокси. Поэтому аспекты молчат.",
  "d": "Порядок: создать инстанс → заинжектить зависимости → @PostConstruct (через InitDestroyAnnotationBeanPostProcessor) → потом другие BPP оборачивают в прокси. Лечение: вынести логику в отдельный бин и вызвать его метод, либо слушать ApplicationReadyEvent / SmartInitializingSingleton, где прокси уже готовы.",
  "code": "@PostConstruct\nvoid init() {\n  loadCache(); // @Cacheable тут НЕ сработает — это self-invocation на raw-бине\n}"
 },
 {
  "id": "g-sp-factorybean",
  "t": "Spring",
  "s": "factorybean",
  "q": "Зарегистрировал бин типа MyFactoryBean, а @Autowired MyFactoryBean падает «нет такого типа», зато инжектится совсем другой объект. Что за магия?",
  "a": "FactoryBean — это фабрика бинов. Когда просишь бин по имени, Spring отдаёт НЕ саму фабрику, а результат её getObject(). Чтобы достать саму фабрику, проси с префиксом '&': context.getBean(\"&myFb\"). Без '&' получаешь продукт, а не станок.",
  "d": "Так устроены SqlSessionFactoryBean (MyBatis), LocalContainerEntityManagerFactoryBean и т.п. getObjectType() говорит Spring'у, какой тип будет у продукта — по нему и идёт автовайринг. В Spring Boot чаще пишут @Bean-метод, возвращающий готовый объект — это проще, чем FactoryBean.",
  "code": "context.getBean(\"myFb\");   // -> Connection (продукт)\ncontext.getBean(\"&myFb\");  // -> MyFactoryBean (сама фабрика)"
 },
 {
  "id": "g-sp-lookup",
  "t": "Spring",
  "s": "lookup",
  "q": "Singleton-бину на каждый вызов нужен СВЕЖИЙ prototype-бин. Инжектить через поле бесполезно. Чем чинить помимо ObjectProvider?",
  "a": "@Lookup. Помечаешь абстрактный (или обычный) метод — Spring через CGLIB переопределяет его и на каждый вызов лезет в контекст за новым экземпляром prototype-бина. Поле инжектится один раз при старте, а @Lookup-метод — каждый раз заново.",
  "d": "Альтернативы: ObjectProvider<T>.getObject() / Provider<T> (JSR-330) — чище и без CGLIB-ограничений. @Lookup требует, чтобы бин сам был проксируемым (не final-класс/метод). Это классическое лечение «prototype внутри singleton».",
  "code": "@Component\nabstract class Handler {\n  @Lookup\n  protected abstract Task newTask(); // каждый вызов = новый prototype\n}"
 },
 {
  "id": "g-sp-async-self",
  "t": "Spring",
  "s": "async",
  "q": "Повесил @Async, но метод выполняется в том же потоке синхронно. Самые частые две причины?",
  "a": "1) Забыл @EnableAsync — без него аспект не включён. 2) Self-invocation: зовёшь @Async-метод из соседнего метода того же класса через this — мимо прокси, аспекта нет. Плюс грабли: @Async-метод должен возвращать void или CompletableFuture, иначе результат не дождёшься.",
  "d": "По умолчанию @Async берёт SimpleAsyncTaskExecutor — он плодит поток на каждый вызов, без пула. В проде задавай свой ThreadPoolTaskExecutor. Исключения из void-@Async теряются (ловит AsyncUncaughtExceptionHandler); из Future — приходят при .get().",
  "code": "@EnableAsync          // 1) обязателен\n@Async\nCompletableFuture<Report> build() { ... }\n// other.build() из этого же класса -> синхронно (self-invocation)"
 },
 {
  "id": "g-sp-eventlistener",
  "t": "Spring",
  "s": "events",
  "q": "@EventListener сработал, но изменения в БД, сделанные слушателем после коммита публикатора, не видны / откатились. Что использовать?",
  "a": "@TransactionalEventListener с фазой AFTER_COMMIT. Обычный @EventListener синхронный и выполняется ВНУТРИ транзакции публикатора — если её откатят, твоя работа тоже пропадёт. AFTER_COMMIT гарантирует: слушатель бежит только после успешного коммита.",
  "d": "Фазы: BEFORE_COMMIT, AFTER_COMMIT (дефолт), AFTER_ROLLBACK, AFTER_COMPLETION. Важно: в AFTER_COMMIT исходная транзакция уже закрыта — если нужна запись в БД, открывай НОВУЮ (REQUIRES_NEW), иначе работа пройдёт вне транзакции. Для фоновой обработки добавь @Async.",
  "code": "@TransactionalEventListener(phase = AFTER_COMMIT)\n@Transactional(propagation = REQUIRES_NEW)\nvoid onOrderPaid(OrderPaid e) { sendReceipt(e); }"
 },
 {
  "id": "g-sp-scheduled",
  "t": "Spring",
  "s": "scheduled",
  "q": "@Scheduled с fixedRate=5000 запускается каждые 5с, но задача иногда длится 8с — задачи начинают наезжать? И почему две инстанса делают одно и то же?",
  "a": "По умолчанию у @Scheduled ОДИН поток на все задачи — они не наезжают, а выстраиваются в очередь (следующая ждёт). fixedRate меряет от старта, fixedDelay — от конца. А в кластере @Scheduled крутится на КАЖДОМ инстансе независимо — нужен ShedLock/распределённый лок.",
  "d": "fixedRate — старт-к-старту (риск накопления очереди при долгих задачах); fixedDelay — конец-к-старту (безопаснее). Один поток-планировщик сериализует всё: одна долгая задача задерживает остальные — задай свой TaskScheduler с пулом. Для кластера: ShedLock, Quartz с JDBC store, или DB-advisory-lock.",
  "code": "@Scheduled(fixedDelay = 5000)   // от конца предыдущего\n@SchedulerLock(name = \"reindex\") // ShedLock: один инстанс в кластере\nvoid reindex() { ... }"
 },
 {
  "id": "g-sp-conditional",
  "t": "Spring",
  "s": "conditional",
  "q": "Хочешь свой бин вместо автонастроенного Boot'ом. Поставил @Component — а грузятся оба / падает конфликт. Как правильно «победить» автоконфиг?",
  "a": "Автоконфиги Boot обвешаны @ConditionalOnMissingBean — они отступают, если ТВОЙ бин уже есть. Ключ — порядок: автоконфиги обрабатываются ПОСЛЕ пользовательских (@AutoConfiguration After). Объяви свой @Bean того же типа — Boot увидит его и не создаст дефолтный. @ConditionalOnProperty включает/выключает бины по конфигу.",
  "d": "Иерархия условий: @ConditionalOnClass (есть в classpath), @ConditionalOnMissingBean (юзер не определил), @ConditionalOnProperty (флаг в yml), @Profile (профиль активен). Свой @Conditional — реализуешь Condition.matches(). Отладка: запусти с --debug — Boot напечатает ConditionEvaluationReport (что matched/не matched и почему).",
  "code": "@Bean\nObjectMapper objectMapper() { ... } // Boot увидит и отступит\n// его автоконфиг: @ConditionalOnMissingBean ObjectMapper"
 },
 {
  "id": "g-sp-value-spel",
  "t": "Spring",
  "s": "value",
  "q": "@Value(\"${app.timeout}\") в одном бине = 30, а в другом null. И ещё: @Value на static-поле молчит. Почему?",
  "a": "@Value читается ПОСЛЕ создания бина (при инъекции), поэтому в конструкторе/@PostConstruct другого, более раннего бина значение может быть ещё не подставлено. На static-поля инъекция не работает — Spring инжектит в экземпляры, не в класс. ${} — это property placeholder, #{} — SpEL (выражение).",
  "d": "${prop:default} даёт дефолт, если проперти нет — без него и без проперти будет ошибка старта. #{...} — Spring Expression Language: #{systemProperties['x']}, #{T(Math).PI}, #{otherBean.field}. Грабли: @Value не биндит сложные объекты/списки красиво — для конфигов бери @ConfigurationProperties (type-safe, валидация, релаксированный биндинг).",
  "code": "@Value(\"${app.timeout:30}\")  int t;     // placeholder + дефолт\n@Value(\"#{T(java.time.Duration).ofSeconds(30)}\") Duration d; // SpEL"
 },
 {
  "id": "g-sp-requestscope",
  "t": "Spring",
  "s": "scopes",
  "q": "Заинжектил request-scoped бин в singleton-сервис прямо полем — на старте падает или всегда отдаёт одно и то же. Как чинят?",
  "a": "Singleton создаётся один раз при старте, а request-бин живёт только во время HTTP-запроса — на старте запроса нет. Лечение: scoped proxy. Spring инжектит лёгкий прокси, который на каждое обращение лезет за «правильным» инстансом текущего запроса. Без proxyMode — облом.",
  "d": "@Scope(\"request\", proxyMode = TARGET_CLASS) или @RequestScope (мета-аннотация уже с прокси). Прокси хранит ссылку на текущий запрос через RequestContextHolder (ThreadLocal). Поэтому вне HTTP-потока (фоновый @Async/@Scheduled) обращение к request-бину упадёт. Альтернатива инъекции — ObjectProvider.",
  "code": "@RequestScope                  // = @Scope request + proxy\n@Component\nclass UserCtx { String userId; }\n// инжектится в singleton без проблем — внутри прокси"
 },
 {
  "id": "g-sp-controlleradvice",
  "t": "Spring",
  "s": "errors",
  "q": "@ExceptionHandler в @ControllerAdvice не ловит исключения из фильтра Spring Security (401/403) и из @Async-метода. Почему?",
  "a": "@ControllerAdvice ловит только то, что прилетело внутри DispatcherServlet (контроллеры). Security-фильтры стоят РАНЬШЕ диспетчера в цепочке фильтров — их ошибки advice не видит. А @Async-метод бежит в другом потоке без request-контекста — его исключение тоже мимо.",
  "d": "401/403 от Security настраивай через AuthenticationEntryPoint / AccessDeniedHandler. Для фильтров — отдельный фильтр-обёртка. Грабли точности: @ExceptionHandler выбирает самый специфичный тип; @ResponseStatus на ехcepton vs ResponseEntity; @RestControllerAdvice = @ControllerAdvice + @ResponseBody. Современный путь — ProblemDetail (RFC 7807) в Spring 6.",
  "code": "@RestControllerAdvice\nclass ApiErrors {\n  @ExceptionHandler(NotFound.class)\n  ProblemDetail handle(NotFound e){ return ProblemDetail.forStatus(404); }\n}"
 },
 {
  "id": "g-db-gin-jsonb",
  "t": "DB",
  "s": "index/jsonb",
  "q": "У тебя JSONB-колонка, ищешь WHERE data @> '{\"status\":\"paid\"}'. B-tree не помогает. Какой индекс нужен и почему?",
  "a": "B-tree индексирует значение целиком, а тебе нужно искать ВНУТРИ документа. GIN раскладывает JSONB на пары ключ-значение и индексирует каждую. Тогда @> (содержит) и ?| (есть ключ) летают.",
  "d": "GIN = Generalized Inverted Index, инвертированный индекс (как у поисковиков: слово → список документов). Для JSONB есть два класса операторов: jsonb_ops (по умолчанию, индексирует ключи И значения) и jsonb_path_ops (только пути, меньше и быстрее для @>, но не умеет проверку наличия ключа ?). GIN дороже на запись и больше по размеру, чем B-tree.",
  "code": "CREATE INDEX idx_doc ON orders USING GIN (data jsonb_path_ops);\n-- быстро: WHERE data @> '{\"status\":\"paid\"}'\n-- НЕ ускорит: WHERE data->>'status' = 'paid'  -- нужен expression-индекс"
 },
 {
  "id": "g-db-brin",
  "t": "DB",
  "s": "index/brin",
  "q": "Таблица сделок 500 млн строк, пишется по порядку по времени. B-tree по created_at — гигантский. Что компактнее в 1000 раз?",
  "a": "BRIN. Он не хранит указатель на каждую строку, а на каждый блок запоминает мин/макс. Если данные физически идут по порядку (как тикеты по времени), запрос по диапазону отбрасывает блоки целиком. Индекс — копейки по размеру.",
  "d": "BRIN = Block Range Index. Эффективен ТОЛЬКО когда физический порядок строк коррелирует со значением колонки (append-only по времени, автоинкрементный id). Если данные перемешаны — BRIN бесполезен (мин/макс каждого блока покрывают весь диапазон). Не подходит для точечного поиска одной строки — там B-tree.",
  "code": "CREATE INDEX idx_ts ON trades USING BRIN (created_at);\n-- размер: мегабайты вместо гигабайтов\n-- работает: WHERE created_at BETWEEN ? AND ?  (диапазон)"
 },
 {
  "id": "g-db-partial-index",
  "t": "DB",
  "s": "index/partial",
  "q": "В таблице 10 млн заказов, но обрабатываешь только WHERE status='NEW' (их 200 штук). Индекс по всем 10 млн жирный. Что сделать?",
  "a": "Partial index — индексируешь только нужное подмножество с условием WHERE. Индекс будет крошечный (200 строк), быстрый, и обновляется только когда строка попадает/выходит из условия. Идеально для очередей и «активных» записей.",
  "d": "Условие partial-индекса должно совпадать (или быть покрыто) условием запроса, иначе планировщик его не возьмёт. Бонус: можно сделать частичный UNIQUE — например, «только один активный договор на клиента»: CREATE UNIQUE INDEX ... WHERE active. Это нельзя выразить обычным UNIQUE-ограничением.",
  "code": "CREATE INDEX idx_new ON orders (created_at)\n  WHERE status = 'NEW';\n-- частичный UNIQUE: один активный на клиента\nCREATE UNIQUE INDEX ON contracts (client_id)\n  WHERE status = 'ACTIVE';"
 },
 {
  "id": "g-db-expression-index",
  "t": "DB",
  "s": "index/expression",
  "q": "Логинишь по WHERE lower(email)=?. Индекс на email есть, но не используется. Почему и как починить?",
  "a": "Индекс хранит email как есть, а ты ищешь по lower(email) — это другое выражение, индекс не подходит. Нужен expression-индекс прямо по lower(email). Тогда планировщик увидит совпадение выражения и применит его.",
  "d": "Правило: индекс работает, только если левая часть условия ТЕКСТУАЛЬНО совпадает с выражением в индексе. Любая функция-обёртка над колонкой (lower(), date_trunc(), col+0, col::text) убивает обычный индекс. Решение — либо expression-индекс с той же функцией, либо переписать запрос без обёртки над колонкой.",
  "code": "CREATE INDEX idx_email ON users (lower(email));\n-- теперь использует: WHERE lower(email) = lower(?)\n-- НЕ работает обычный idx по email при lower(email)"
 },
 {
  "id": "g-db-explain-cost-rows",
  "t": "DB",
  "s": "explain/buffers",
  "q": "В EXPLAIN видишь cost=0.00..431 и rows=1, а реально вернулось 5000 строк. О чём это говорит?",
  "a": "cost — это попугаи планировщика (оценка, не миллисекунды), а rows в плане — его ПРОГНОЗ. Если прогноз 1, а факт 5000 — статистика устарела, планировщик ошибся и мог выбрать плохой план (nested loop вместо hash join). Лечится ANALYZE.",
  "d": "EXPLAIN (без ANALYZE) — только оценки, запрос не выполняется. EXPLAIN ANALYZE — реально гоняет и показывает actual rows. Сравнивай estimated vs actual: расхождение в разы = кривая статистика или коррелированные колонки. EXPLAIN (ANALYZE, BUFFERS) показывает shared hit (из кэша) vs read (с диска) — так видно, упёрся ли запрос в I/O.",
  "code": "EXPLAIN (ANALYZE, BUFFERS)\nSELECT ... ;\n-- ищи: rows=1 (est) vs actual rows=5000\n-- Buffers: shared hit=900 read=42000  <- много read = диск"
 },
 {
  "id": "g-db-pool-size",
  "t": "DB",
  "s": "pool/sizing",
  "q": "40 потоков приложения, ставишь пул HikariCP на 100 соединений «с запасом». Под нагрузкой всё медленнее. Почему меньше — лучше?",
  "a": "Соединение = процесс/бэкенд в Postgres, и их выполняет ограниченное число ядер. 100 коннектов на 8 ядер — это толкотня за CPU и диск, переключение контекста. Маленький пул (формула ~ ядра×2 + диски) даёт меньше параллелизма, но БОЛЬШУЮ пропускную способность.",
  "d": "Классическая формула PostgreSQL wiki: connections = (core_count * 2) + effective_spindle_count. Очередь внутри пула лучше, чем очередь внутри БД: ждущий поток держит транзакцию открытой, блокировки, память work_mem ×N. Также maxLifetime в Hikari должен быть меньше серверного таймаута, иначе ловишь «connection reset».",
  "code": "# HikariCP\nmaximumPoolSize=20      # не 100\nminimumIdle=20\nmaxLifetime=1740000     # < server idle timeout\nconnectionTimeout=3000  # fail fast, не виси"
 },
 {
  "id": "g-db-fk-cascade-storm",
  "t": "DB",
  "s": "fk/cascade",
  "q": "Поставил ON DELETE CASCADE везде «чтоб удобно». Удалил одного клиента — БД повисла на минуты и залочила пол-системы. Что произошло?",
  "a": "CASCADE — это рекурсивное удаление по всем дочерним таблицам в ОДНОЙ транзакции. Удаление клиента потянуло заказы → позиции → логи: миллионы строк, куча блокировок, разросшийся WAL. Плюс если на FK нет индекса — каждый каскад делает seq scan.",
  "d": "Опасности CASCADE: (1) непредсказуемый объём удаления и длинная транзакция держит блокировки; (2) без индекса на FK-колонке каждый шаг каскада сканирует дочернюю таблицу целиком; (3) триггеры на дочерних таблицах срабатывают молча. Альтернативы: ON DELETE RESTRICT (явный запрет), soft-delete (флаг deleted_at), или удаление пачками в фоне.",
  "code": "-- опасно при больших объёмах:\nFOREIGN KEY (client_id) REFERENCES clients\n  ON DELETE CASCADE;\n-- обязательно индекс на FK:\nCREATE INDEX ON orders (client_id);\n-- безопаснее: ON DELETE RESTRICT + батч-удаление"
 },
 {
  "id": "g-db-window-vs-groupby",
  "t": "DB",
  "s": "sql/window",
  "q": "Нужно к каждой сделке клиента приписать его суммарный оборот, но НЕ схлопывать строки. GROUP BY ломает детализацию. Что взять?",
  "a": "Window-функцию: SUM(amount) OVER (PARTITION BY client_id). Она считает агрегат по группе, но оставляет ВСЕ строки на месте, дописывая результат в каждую. GROUP BY свернул бы клиента в одну строку — а тут детали остаются.",
  "d": "Ключевая разница: GROUP BY уменьшает число строк, оконная функция — нет (агрегат в дополнительной колонке). Окна дают ROW_NUMBER/RANK/DENSE_RANK (нумерация, «топ-N на группу»), LAG/LEAD (предыдущая/следующая строка — дельта по времени), running totals через ORDER BY внутри OVER. Частый собес: «последняя сделка на клиента» = ROW_NUMBER() OVER(PARTITION BY client ORDER BY ts DESC) и фильтр =1.",
  "code": "SELECT *,\n  SUM(amount) OVER (PARTITION BY client_id) AS total,\n  ROW_NUMBER() OVER (PARTITION BY client_id\n                     ORDER BY ts DESC) AS rn\nFROM trades;  -- rn=1 => последняя сделка клиента"
 },
 {
  "id": "g-db-recursive-cte",
  "t": "DB",
  "s": "sql/cte",
  "q": "В таблице (id, parent_id) лежит дерево категорий. Нужны все потомки узла. Один SELECT не умеет рекурсию. Чем взять?",
  "a": "Рекурсивным CTE: WITH RECURSIVE. Якорь — стартовый узел, рекурсивная часть джойнит таблицу саму на себя по parent_id, повторяя, пока находятся новые строки. Так разворачивается дерево любой глубины одним запросом.",
  "d": "Структура: WITH RECURSIVE t AS (anchor UNION ALL recursive_part) SELECT FROM t. Грабли: (1) при циклах в данных (a→b→a) рекурсия зациклится — нужна защита (накапливать путь и проверять, или UNION вместо UNION ALL); (2) обычный CTE в Postgres ≥12 НЕ материализуется барьером по умолчанию (инлайнится), но можно форсить MATERIALIZED/NOT MATERIALIZED. CTE — не «таблица в памяти», это просто именованный подзапрос.",
  "code": "WITH RECURSIVE sub AS (\n  SELECT id, parent_id FROM cat WHERE id = :root\n  UNION ALL\n  SELECT c.id, c.parent_id FROM cat c\n  JOIN sub s ON c.parent_id = s.id\n)\nSELECT * FROM sub;"
 },
 {
  "id": "g-db-prepared-plan-cache",
  "t": "DB",
  "s": "prepared/plancache",
  "q": "Параметризованный запрос работал быстро, а на 6-й раз вдруг стал тормозить на тех же данных. При чём тут кэш плана?",
  "a": "Postgres после 5 выполнений prepared statement может перейти с custom-плана (под конкретные параметры) на generic-план (один на все значения). Если данные перекошены (status='NEW' — 200 строк, 'DONE' — 10М), generic-план выберет seq scan и убьёт быстрый случай.",
  "d": "Механизм: для prepared statements PG сначала строит custom-планы (учитывая значения), после ~5 раз сравнивает со стоимостью generic-плана и может закрепить generic (не зависит от параметров → дешевле планировать, но игнорирует перекос данных). Управление: plan_cache_mode = force_custom_plan / force_generic_plan / auto. В JDBC это всплывает при prepareThreshold и server-side prepared statements; в PgBouncer transaction-mode серверные prepared вообще ломаются.",
  "code": "-- форсить пересчёт плана под параметры:\nSET plan_cache_mode = force_custom_plan;\n-- JDBC: prepareThreshold=0 отключает server-side prepare\n-- jdbc:postgresql://...?prepareThreshold=0"
 },
 {
  "id": "g-ds-compaction",
  "t": "Distributed",
  "s": "log-compaction",
  "q": "Чем log compaction отличается от retention, и зачем нужен tombstone (value=null)?",
  "a": "Retention режет по времени/размеру и удаляет ВСЁ старое. Compaction оставляет последнее значение для каждого key — топик становится как таблица «текущее состояние». Чтобы удалить key, шлёшь сообщение с value=null (tombstone): compaction затрёт все старые и сам tombstone по delete.retention.ms.",
  "d": "Compaction даёт «бесконечный snapshot по ключу» — основа для Kafka Streams KTable и для подключения нового сервиса, который читает топик с начала и получает актуальное состояние, а не миллиарды дельт. Compaction НЕ гарантирует, что промежуточных версий не было — только что финальная сохранится.",
  "code": "cleanup.policy=compact\ndelete.retention.ms=86400000\n# удалить ключ:\nproducer.send(new ProducerRecord<>(topic, key, null)); // tombstone"
 },
 {
  "id": "g-ds-maxpoll",
  "t": "Distributed",
  "s": "poll-timeout",
  "q": "Обработка батча заняла 6 минут, и консьюмера выкинуло из группы хотя heartbeat-поток жив. Почему?",
  "a": "session.timeout.ms ловит мёртвый процесс через heartbeat (фоновый поток). А max.poll.interval.ms (по умолч. 5 мин) ловит «живой, но завис в обработке»: если между poll() прошло больше — брокер считает тебя зависшим, исключает и запускает ребаланс. Твой commit потом упадёт, батч переобработают.",
  "d": "Лечится: уменьшить max.poll.records (бери меньше за раз), вынести тяжёлую работу в отдельный пул и продолжать poll(), либо поднять max.poll.interval.ms. Поднимать session.timeout тут бесполезно — это другой таймер.",
  "code": "max.poll.interval.ms=300000  # лимит на обработку батча\nmax.poll.records=100         # уменьшить, если обработка долгая\nsession.timeout.ms=45000     # это про heartbeat, не про обработку"
 },
 {
  "id": "g-ds-idempotent-producer",
  "t": "Distributed",
  "s": "idempotent-producer",
  "q": "Как enable.idempotence=true чинит дубли и перестановку при ретраях продьюсера, на каком уровне?",
  "a": "Продьюсер получает PID, и каждое сообщение в партиции нумеруется sequence number. Брокер помнит последний seq и отбрасывает дубль (тот же PID+seq) при ретрае, а также отвергает «дырку» в нумерации — поэтому порядок не ломается даже при max.in.flight=5. Это устраняет дубли от ретраев, но НЕ от перезапуска приложения.",
  "d": "Без идемпотентности безопасный порядок держался только при max.in.flight=1 (медленно). С idempotence можно держать 5 и сохранять порядок. Это фундамент Kafka-транзакций (EOS). Дедуп работает в пределах сессии PID на конкретной партиции, не сквозь рестарты бизнес-логики.",
  "code": "enable.idempotence=true   # включает acks=all, retries=MAX,\n# max.in.flight<=5 — порядок и no-dup гарантированы брокером"
 },
 {
  "id": "g-ds-cooperative",
  "t": "Distributed",
  "s": "rebalance-strategy",
  "q": "Eager (range/round-robin) vs cooperative-sticky ребаланс — в чём практическая разница?",
  "a": "Eager — stop-the-world: на ребалансе ВСЕ консьюмеры отдают все партиции, потом всё переназначается. На время паузы группа стоит. Cooperative-sticky отдаёт только те партиции, что реально мигрируют; остальные продолжают работать. Меньше простой, плавный деплой. Дефолт в новых клиентах — cooperative.",
  "d": "Cooperative делает ребаланс в 2 фазы (revoke только нужное, потом assign). Для rolling-рестарта это критично: иначе каждый перезапуск инстанса замораживает всю группу. Sticky ещё и старается вернуть те же партиции тому же инстансу (тёплый кэш/state).",
  "code": "partition.assignment.strategy=\\\n  org.apache.kafka.clients.consumer.CooperativeStickyAssignor"
 },
 {
  "id": "g-ds-static",
  "t": "Distributed",
  "s": "static-membership",
  "q": "Каждый rolling-рестарт пода вызывает полный ребаланс группы. Как погасить «ребаланс-штормы»?",
  "a": "Дай консьюмеру стабильный group.instance.id (static membership). При коротком рестарте (в пределах session.timeout) брокер НЕ исключает участника и НЕ запускает ребаланс — ждёт, что тот же instance вернётся со своими партициями. Идеально для k8s, где под перезапускается с тем же ordinal.",
  "d": "Без static membership каждый рестарт = leave group = ребаланс + ещё один при возврате. Со static id и поднятым session.timeout кратковременные рестарты «невидимы» для группы. Минус: если инстанс реально умер надолго, его партиции простаивают до истечения таймаута.",
  "code": "group.instance.id=consumer-${POD_ORDINAL}\nsession.timeout.ms=120000  # переждать рестарт без ребаланса"
 },
 {
  "id": "g-ds-retry-topics",
  "t": "Distributed",
  "s": "dlq-retry",
  "q": "Как построить ретраи с задержкой и DLQ, не блокируя основную партицию ядовитым сообщением?",
  "a": "Не ретраить in-place. Сразу коммить и перекладывай сбойное сообщение в отдельный retry-топик с возрастающей задержкой (retry-5s, retry-1m, retry-10m). Консьюмеры этих топиков ждут и пробуют снова. После N попыток — в DLQ на ручной разбор. Основной поток не стоит, порядок основной партиции не страдает.",
  "d": "In-place блокирующий ретрай останавливает всю партицию. Tiered retry-топики разводят «быстрый» и «медленный» трафик. Важно тащить trace_id и счётчик попыток в хедерах. Минус — теряется глобальный порядок для сбойного ключа, поэтому подходит, когда порядок не критичен или восстанавливается идемпотентностью.",
  "code": "// header: x-retry-count, x-original-topic, x-trace-id\nif (attempt >= MAX) producer.send(toDlq(record));\nelse producer.send(toRetryTopic(nextDelayTier, record));\nconsumer.commitSync(); // основную партицию не держим"
 },
 {
  "id": "g-ds-quorum",
  "t": "Distributed",
  "s": "quorum-rw",
  "q": "Что значит R+W>N в кворумных хранилищах и почему это даёт согласованность чтения?",
  "a": "N — число реплик, W — сколько должны подтвердить запись, R — сколько опросить при чтении. Если R+W>N, множества записи и чтения ГАРАНТИРОВАННО пересекаются хотя бы на одной реплике — значит чтение увидит последнюю запись. Крутишь R и W: меньше W — быстрее запись, но медленнее/слабее чтение.",
  "d": "Это Dynamo-style настраиваемая согласованность (Cassandra QUORUM). N=3,W=2,R=2 → 2+2>3, strong read. W=1,R=1 → быстро, но можешь прочитать устаревшее. Версии разруливаются по timestamp/vector clock, конфликт — на стороне read-repair.",
  "code": "// Cassandra: N=3\n// W=QUORUM(2) + R=QUORUM(2) => 2+2>3 => strong\nwrite.setConsistencyLevel(QUORUM);\nread.setConsistencyLevel(QUORUM);"
 },
 {
  "id": "g-ds-vector-clock",
  "t": "Distributed",
  "s": "vector-clocks",
  "q": "Зачем vector clock, если есть wall-clock timestamp? Что он умеет, чего не умеет timestamp?",
  "a": "Wall-clock врёт: часы на нодах рассинхронены, нельзя по timestamp понять, кто реально был раньше. Vector clock — массив счётчиков [A:2,B:1,...], по одному на ноду. Сравнивая векторы, ты ТОЧНО видишь: одно событие предшествует другому (purely <) или они конкурентны (ни один не ≤ другого) — и тогда это конфликт для разрешения.",
  "d": "Lamport clock даёт только полный порядок «возможной причинности», но не отличает конкурентность. Vector clock отличает causal-before от concurrent — нужно для Dynamo/Riak, CRDT, обнаружения write-write конфликтов. Цена: размер вектора растёт с числом нод.",
  "code": "// inc своей позиции при событии; при receive — поэлементный max\nVC compare: a<b если ∀i a[i]<=b[i] и ∃ a[i]<b[i]\n// иначе несравнимы => CONCURRENT => конфликт"
 },
 {
  "id": "g-ds-2pc",
  "t": "Distributed",
  "s": "two-phase-commit",
  "q": "Почему 2PC (two-phase commit) избегают в микросервисах и берут сагу?",
  "a": "2PC: координатор шлёт prepare всем, ждёт «готов», потом commit. Беда — блокирующий: если координатор упал между фазами, участники сидят с залоченными ресурсами в неопределённости, пока он не вернётся. Это снижает доступность и не масштабируется. Сага же делает локальные коммиты + компенсации, без глобального лока.",
  "d": "2PC даёт атомарность, но ценой CP-поведения и single point of failure (координатор). В сети с разделами участник застревает. Сага жертвует изоляцией (видны промежуточные состояния) ради доступности и независимости сервисов — обычно правильный размен в распределёнке.",
  "code": "// 2PC: PREPARE -> (всё locked) -> coordinator dies -> participants HANG\n// Saga: local commit T1; on fail -> compensate C1 (без глобального лока)"
 },
 {
  "id": "g-ds-gossip",
  "t": "Distributed",
  "s": "gossip",
  "q": "Как ноды узнают, кто жив и кто упал, без центрального реестра? Что такое gossip?",
  "a": "Gossip (epidemic): каждая нода периодически выбирает случайных соседей и обменивается своим взглядом на состояние кластера (кто жив, версии, метаданные). Слух расходится экспоненциально — за O(log N) раундов все сходятся. Нет мастера, нет SPOF, отказоустойчиво и масштабируемо.",
  "d": "Используется в Cassandra, Consul, Serf для membership и failure detection (часто с φ-accrual детектором). Минус — eventually consistent: момент, когда «все узнали», не мгновенный. Подходит для метаданных кластера, не для строгой согласованности данных.",
  "code": "// каждый раунд: pick K случайных peers, обменяться digest состояния\n// сходимость ~ O(log N) раундов, без координатора"
 },
 {
  "id": "g-web-oauth-flows",
  "t": "Web",
  "s": "oauth2",
  "q": "Какой OAuth2 флоу выбрать: authorization code+PKCE, client credentials или (не дай бог) password?",
  "a": "Юзер в браузере/SPA/мобайле → authorization code + PKCE. Сервис-к-сервису без юзера → client credentials. Implicit и password grant мертвы — не используй. PKCE защищает от перехвата кода.",
  "d": "Authorization code: клиент шлёт юзера в Keycloak, получает короткоживущий `code`, меняет его на бэке на access+refresh токены. PKCE (code_verifier/code_challenge) добавляет одноразовый секрет, чтобы перехваченный код был бесполезен — обязателен для публичных клиентов (SPA, mobile) без client_secret. Client credentials: бэкенд логинится сам по client_id+secret, юзера нет. Password grant (ROPC) и implicit flow удалены из OAuth 2.1 — токены текут, нет refresh ротации.",
  "code": "// client credentials в Quarkus (machine-to-machine)\nquarkus.oidc-client.auth-server-url=https://kc/realms/acme\nquarkus.oidc-client.client-id=doc-service\nquarkus.oidc-client.credentials.secret=${SECRET}\nquarkus.oidc-client.grant.type=client"
 },
 {
  "id": "g-web-csp",
  "t": "Web",
  "s": "csp",
  "q": "Что такое Content-Security-Policy и почему это твоя главная защита от XSS?",
  "a": "CSP — заголовок-белый-список: говорит браузеру, откуда можно грузить скрипты/стили/картинки. Чужой `<script>` от инъекции просто не выполнится. Без `unsafe-inline` инлайн-скрипты блокируются — это и ловит XSS.",
  "d": "XSS-фильтрация ввода ненадёжна; CSP — второй рубеж на стороне браузера. `default-src 'self'` запрещает всё чужое. Опасности: `script-src 'unsafe-inline'` и `'unsafe-eval'` фактически отключают защиту — используй nonce (`'nonce-abc'`) или hash для нужных инлайнов. `Content-Security-Policy-Report-Only` + `report-uri` позволяют выкатить политику без поломки прода и собрать нарушения.",
  "code": "Content-Security-Policy: default-src 'self';\n  script-src 'self' 'nonce-r4nd0m';\n  object-src 'none'; frame-ancestors 'none'"
 },
 {
  "id": "g-web-hsts",
  "t": "Web",
  "s": "hsts",
  "q": "Зачем HSTS, если у меня уже редирект с http на https?",
  "a": "Первый http-запрос до редиректа можно перехватить (SSL-stripping). HSTS говорит браузеру: «к этому домену ходи ТОЛЬКО по https, навсегда» — он даже не делает http-запрос, апгрейдит сам.",
  "d": "`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. Браузер запоминает домен на max-age секунд и сам подменяет http→https ещё до отправки. `preload` вшивает домен в браузеры на этапе сборки (список hstspreload.org) — но это почти необратимо, сначала проверь все сабдомены. Гоча: HSTS отдавай только по https (по http браузер игнорирует), и осторожно с includeSubDomains если есть http-only сабдомены.",
  "code": "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload"
 },
 {
  "id": "g-web-samesite",
  "t": "Web",
  "s": "cookies",
  "q": "SameSite=Lax vs Strict vs None — и при чём тут CSRF?",
  "a": "SameSite решает, шлёт ли браузер cookie на кросс-сайтовые запросы. `Lax` (дефолт) — не шлёт на чужие POST, гасит классический CSRF. `Strict` — вообще не шлёт извне. `None` — шлёт всегда, но обязателен `Secure`.",
  "d": "Cookie-флаги: `HttpOnly` — JS не читает (защита от кражи XSS'ом), `Secure` — только по https, `SameSite` — кросс-сайтовая отправка. Современные браузеры по умолчанию `Lax`, поэтому простой CSRF на POST уже не проходит — но GET-сайд-эффекты и встроенные iframe (`None`) всё ещё уязвимы, нужен CSRF-токен. `SameSite=None` без `Secure` браузер отклонит.",
  "code": "Set-Cookie: SESSION=abc; HttpOnly; Secure; SameSite=Lax; Path=/\n// для виджета в чужом iframe нужен:\nSet-Cookie: SESSION=abc; Secure; SameSite=None"
 },
 {
  "id": "g-web-idempotency-key",
  "t": "Web",
  "s": "idempotency",
  "q": "Как реально реализовать Idempotency-Key на сервере, а не просто принять заголовок?",
  "a": "Клиент шлёт `Idempotency-Key: uuid`. Сервер в транзакции вставляет ключ в таблицу с UNIQUE. Первый раз — выполняет и сохраняет ответ. Повтор того же ключа — отдаёт СОХРАНЁННЫЙ ответ, не выполняя операцию снова.",
  "d": "Ключ генерит клиент (UUID), один на одну логическую операцию, и переиспользует при ретраях. UNIQUE-констрейнт + INSERT — атомарная защита от гонки двух параллельных ретраев: второй упадёт на дубле и подождёт/прочитает результат. Храни не только факт, но и тело+статус ответа, чтобы отдать идентично. TTL на ключи (сутки). Это поверх «POST не идемпотентен» — конкретная реализация.",
  "code": "INSERT INTO idem_keys(key, status) VALUES (:k, 'PENDING');\n-- если упало на UNIQUE -> читаем сохранённый ответ\n-- успех -> UPDATE idem_keys SET resp=:json, http=201 WHERE key=:k"
 },
 {
  "id": "g-web-sse-vs-ws",
  "t": "Web",
  "s": "realtime",
  "q": "SSE или WebSocket — что выбрать для пушей с сервера?",
  "a": "Нужен только поток server→client (нотификации, прогресс, котировки) → SSE: обычный HTTP, автореконнект, проще. Нужен двусторонний реалтайм (чат, игра) → WebSocket. Не тащи WS там, где хватает SSE.",
  "d": "SSE (`text/event-stream`) — однонаправленный поверх обычного HTTP/2: браузерный `EventSource` сам реконнектится и шлёт `Last-Event-ID` для докачки. Минусы: только текст, лимит ~6 соединений на домен в HTTP/1.1 (в HTTP/2 не проблема). WebSocket — полнодуплекс, свой протокол после Upgrade, нужен отдельный инфра-тюнинг (прокси, таймауты, бэкпрешер). Для «сервер дотолкал событие» SSE почти всегда дешевле.",
  "code": "@GET @Produces(MediaType.SERVER_SENT_EVENTS)\npublic Multi<String> stream() {\n  return ticks.map(t -> t.toJson()); // Quarkus reactive SSE\n}"
 },
 {
  "id": "g-web-content-negotiation",
  "t": "Web",
  "s": "negotiation",
  "q": "Как работает content negotiation и почему сервер может вернуть 406?",
  "a": "Клиент в `Accept` говорит, что готов принять (`application/json`), сервер выбирает подходящий формат и ставит `Content-Type`. Если сервер не умеет ничего из `Accept` — отдаёт `406 Not Acceptable`.",
  "d": "Согласуются: тип (`Accept`/`Content-Type`), язык (`Accept-Language`/`Content-Language`), кодировка (`Accept-Encoding`→`Content-Encoding: gzip`). q-факторы задают приоритет: `Accept: application/json;q=0.9, text/html;q=0.5`. Критичная гоча для кэша: если ответ зависит от заголовка запроса — обязателен `Vary: Accept-Encoding`, иначе CDN отдаст gzip-тело клиенту, который его не понимает.",
  "code": "// запрос\nAccept: application/json, */*;q=0.1\nAccept-Encoding: gzip, br\n// ответ\nContent-Type: application/json\nContent-Encoding: gzip\nVary: Accept-Encoding"
 },
 {
  "id": "g-web-3xx-statuses",
  "t": "Web",
  "s": "redirects",
  "q": "301 vs 302 vs 307/308 — почему путаница ломает POST?",
  "a": "301/308 — постоянный редирект, 302/307 — временный. Ключевое: 301/302 браузер часто меняет на GET, а 307/308 СОХРАНЯЮТ метод и тело. Редиректишь POST — бери 307/308, иначе платёж превратится в GET.",
  "d": "301 Moved Permanently (кэшируется, для SEO), 302 Found, 303 See Other (явно «иди GET'ом» — паттерн POST-Redirect-Get после формы), 307 Temporary / 308 Permanent — строго сохраняют метод. Историческая каша: по RFC 301/302 нельзя менять метод, но браузеры это делают, поэтому ввели 307/308. Ещё 304 Not Modified — это не «переход», а ответ на условный запрос с ETag.",
  "code": "// после POST формы — PRG-паттерн\nHTTP/1.1 303 See Other\nLocation: /orders/42   // браузер сходит GET'ом"
 },
 {
  "id": "g-web-keepalive",
  "t": "Web",
  "s": "connections",
  "q": "Что такое keep-alive и почему пул HTTP-клиента важнее, чем кажется?",
  "a": "Keep-alive держит TCP-соединение открытым для нескольких запросов вместо рукопожатия на каждый. Без переиспользования (свой `HttpClient` на запрос) ты платишь TCP+TLS handshake каждый раз и упираешься в порты под нагрузкой.",
  "d": "HTTP/1.1 keep-alive по умолчанию; экономит ~1-2 RTT на TLS-хендшейке на каждый последующий запрос. Практическая гоча в Java: создавать новый `HttpClient`/`RestClient` на вызов — это утечка соединений и `TIME_WAIT`-портов. Держи один переиспользуемый клиент с пулом. Балансировщик может закрывать idle-соединения по таймауту — `keepAliveTimeout` сервера должен быть БОЛЬШЕ, чем у клиента/LB, иначе ловишь гонку и случайные 502.",
  "code": "// один клиент на приложение, пул переиспользуется\nHttpClient client = HttpClient.newBuilder()\n  .version(Version.HTTP_2)\n  .connectTimeout(Duration.ofSeconds(2)).build();"
 },
 {
  "id": "g-web-csrf-token",
  "t": "Web",
  "s": "csrf",
  "q": "Если SameSite=Lax уже стоит, зачем ещё CSRF-токен?",
  "a": "Lax не полная гарантия: GET с сайд-эффектом, top-level POST-навигация, старые браузеры, виджеты с SameSite=None — мимо. CSRF-токен (synchronizer/double-submit) — независимый секрет, которого у атакующего нет.",
  "d": "Double-submit cookie: сервер кладёт случайный токен в cookie И требует тот же токен в заголовке/поле формы. Чужой сайт не может прочитать твою cookie (Same-Origin Policy) и подставить заголовок, значит не воспроизведёт пару. Для stateless-API на Bearer-токенах в `Authorization`-заголовке CSRF не актуален (браузер не добавляет заголовок автоматически) — проблема именно с cookie-сессиями.",
  "code": "Set-Cookie: XSRF-TOKEN=r4nd; SameSite=Lax\n// JS читает cookie и дублирует в заголовок:\nX-XSRF-TOKEN: r4nd   // сервер сверяет cookie == header"
 },
 {
  "id": "g-te-assertj-fluent",
  "t": "Testing",
  "s": "AssertJ",
  "q": "Зачем AssertJ вместо обычного assertEquals, и что даёт assertThat(...).extracting()?",
  "a": "AssertJ — текучие проверки: assertThat(x).isEqualTo(...). Читается как фраза, сообщения об ошибке понятнее (показывает что было/ожидалось). extracting() достаёт поля из объекта/коллекции и проверяет их без циклов.",
  "d": "Для коллекций: containsExactly (порядок важен), containsExactlyInAnyOrder (порядок неважен), extracting(\"name\") для проверки одного поля у всех элементов. assertThatThrownBy(...) проверяет исключение и его message/cause одной цепочкой. usingRecursiveComparison() сравнивает объекты по полям, а не по equals — спасает от DTO без equals.",
  "code": "assertThat(orders)\n  .hasSize(2)\n  .extracting(Order::status)\n  .containsExactly(NEW, PAID);\n\nassertThatThrownBy(() -> svc.pay(null))\n  .isInstanceOf(IllegalArgumentException.class)\n  .hasMessageContaining(\"id\");"
 },
 {
  "id": "g-te-spy-vs-mock",
  "t": "Testing",
  "s": "spy",
  "q": "spy vs mock в Mockito — в чём принципиальная разница и где spy опасен?",
  "a": "mock — пустышка: все методы возвращают null/0, реального кода нет. spy — обёртка вокруг РЕАЛЬНОГО объекта: по умолчанию вызывает настоящие методы, а ты переопределяешь только нужные. Spy — для частичной подмены легаси.",
  "d": "Гоча spy: when(spy.foo()).thenReturn(x) РЕАЛЬНО вызовет foo() при настройке (может упасть/сходить в БД). Поэтому для spy используют doReturn(x).when(spy).foo() — он не вызывает реальный метод. Spy — признак плохого дизайна: класс делает слишком много. В чистом гексагоне spy почти не нужен.",
  "code": "List<String> real = new ArrayList<>();\nList<String> spy = Mockito.spy(real);\n// ОПАСНО: реально вызовет get(0) -> IndexOutOfBounds\n// when(spy.get(0)).thenReturn(\"x\");\n// ВЕРНО:\ndoReturn(\"x\").when(spy).get(0);\nspy.add(\"a\"); // реально добавит"
 },
 {
  "id": "g-te-pact-cdc",
  "t": "Testing",
  "s": "Pact",
  "q": "Что такое контрактный тест (Pact) и зачем он, если есть интеграционные тесты?",
  "a": "Consumer-Driven Contract: потребитель API описывает, какие запросы шлёт и какие ответы ждёт → генерит контракт (JSON). Провайдер прогоняет контракт у себя и ловит несовместимость ДО деплоя, без поднятия обоих сервисов вместе.",
  "d": "Проблема микросервисов: end-to-end тесты медленные и хрупкие. Pact заменяет их: consumer тестит против стаба по контракту, provider верифицирует контракт против реального кода. Контракты хранятся в Pact Broker. Если provider меняет поле — его CI краснеет, потому что нарушил контракт consumer'а. Это про совместимость интерфейса, не про бизнес-логику.",
  "code": "// Consumer задаёт ожидание\nbuilder.given(\"order 1 exists\")\n  .uponReceiving(\"get order\")\n  .path(\"/orders/1\").method(\"GET\")\n  .willRespondWith().status(200)\n  .body(new PactDslJsonBody()\n    .stringType(\"status\", \"PAID\"));\n// -> контракт.json -> Provider его верифицирует"
 },
 {
  "id": "g-te-mutation",
  "t": "Testing",
  "s": "mutation",
  "q": "Что такое мутационное тестирование (PIT) и почему 100% покрытия — это ложь?",
  "a": "Инструмент (PITest) портит код: меняет > на >=, true на false, удаляет строки. Если тесты после порчи всё ещё ЗЕЛЁНЫЕ — мутант выжил, значит тест ничего реально не проверяет. Покрытие 100% ≠ тесты ловят баги.",
  "d": "Метрика — mutation score: % убитых мутантов. Покрытие говорит «строка выполнилась», мутации — «была ли проверка результата». Можно прогнать строку без единого assert и получить 100% line coverage, но 0% killed mutants. PIT медленный (гоняет тесты на каждую мутацию), поэтому его запускают на критичной бизнес-логике, не на всём проекте.",
  "code": "// Код: if (amount > limit) reject();\n// Мутант: if (amount >= limit) reject();\n// Если ни один тест не падает на границе amount==limit\n// -> мутант ВЫЖИЛ -> дыра в тестах\n// pitest-maven: mvn org.pitest:pitest-maven:mutationCoverage"
 },
 {
  "id": "g-te-test-data-builder",
  "t": "Testing",
  "s": "fixtures",
  "q": "Object Mother vs Test Data Builder — как готовить тестовые объекты, чтобы тесты не ломались пачкой?",
  "a": "Не лепи объект руками в каждом тесте (10 полей) — иначе при смене конструктора правишь 50 тестов. Builder задаёт валидные дефолты, тест меняет лишь нужное поле через .withX(). Object Mother — фабрика готовых типовых объектов (anActiveClient()).",
  "d": "Test Data Builder: aClient().withName(\"X\").build() — fluent, гибко, видно ИМЕННО то поле, что важно для теста. Object Mother: ClientMother.vip() — меньше шума, но плодит методы под каждый случай. На практике комбинируют: Mother возвращает преднастроенный Builder. Главное — централизовать создание, чтобы изменение модели = правка в одном месте.",
  "code": "Client c = aClient()        // дефолты валидны\n   .withStatus(BLOCKED)     // меняем ТОЛЬКО важное\n   .build();\n// vs Object Mother\nClient vip = ClientMother.vip();\n// тест читается: \"берём заблокированного клиента\""
 },
 {
  "id": "g-te-awaitility",
  "t": "Testing",
  "s": "Awaitility",
  "q": "Зачем Awaitility и почему Thread.sleep(2000) в тесте — зло?",
  "a": "Асинхронщину (Kafka, @Async, outbox) нельзя проверять через sleep: на быстрой машине рано, на CI поздно → flaky. Awaitility опрашивает условие до таймаута: await().until(() -> repo.count()==1). Прошло — идём дальше сразу, не прошло за таймаут — падаем.",
  "d": "sleep либо тратит время впустую (поставил 5с, а готово за 0.1с), либо мигает (поставил 1с, а CI тормозит). Awaitility: atMost(5, SECONDS).pollInterval(100, MS).untilAsserted(() -> assertThat(...)). untilAsserted ловит AssertionError как «ещё не готово». Полезно с ignoreExceptions(), если по дороге может прилететь временная ошибка.",
  "code": "await()\n  .atMost(5, SECONDS)\n  .pollInterval(100, MILLISECONDS)\n  .untilAsserted(() ->\n    assertThat(outboxRepo.findSent()).hasSize(1));\n// vs Thread.sleep(5000); // flaky + медленно"
 },
 {
  "id": "g-te-line-vs-branch",
  "t": "Testing",
  "s": "coverage",
  "q": "Line coverage vs branch coverage — почему 100% строк может пропустить баг в if?",
  "a": "Line — выполнилась ли строка. Branch — прошли ли ОБЕ ветки условия (и true, и false). Один тест на if(a && b) покроет строку на 100%, но проверит лишь одну комбинацию. Branch coverage требует пройти каждую развилку в обе стороны.",
  "d": "if(a || b) return x; — один тест с a=true даёт 100% line, но ветка b так и не проверена. JaCoCo считает оба: COVEREDRATIO по LINE и BRANCH. Для составных условий (a && b) полное branch-покрытие требует MC/DC, которое JaCoCo не даёт напрямую. Вывод: гонись за branch на критичной логике, line — обманчивая зелёнка.",
  "code": "boolean canPay(boolean active, boolean funded) {\n  if (active && funded) return true; // 1 строка\n  return false;\n}\n// тест active=true,funded=true -> line 100%\n// но false-ветка и комбинации не покрыты -> branch < 100%"
 },
 {
  "id": "g-te-test-isolation",
  "t": "Testing",
  "s": "isolation",
  "q": "Почему тесты иногда падают только при определённом порядке, и как лечить test pollution?",
  "a": "Тесты делят состояние: static-поле, синглтон, @MockBean в контексте, запись в общую БД без отката. Тест A портит состояние — тест B падает. Лечение: никакого статика, сброс в @BeforeEach, @DirtiesContext / транзакционный откат, независимость от порядка.",
  "d": "JUnit5 по умолчанию НЕ гарантирует порядок (можно задать @TestMethodOrder, но это запах). Mockito @Mock через @ExtendWith сбрасывается между методами — а вот руками созданный static mock нет. В Spring @MockBean переиспользует контекст: настройка when() из одного теста течёт в другой без reset(). @Transactional на тесте откатывает БД после каждого метода.",
  "code": "@BeforeEach\nvoid reset() {\n  Mockito.reset(sharedMock); // если он не per-test\n  counter = 0;               // обнуляем static\n}\n// Spring: @Transactional -> rollback после теста\n// или @DirtiesContext при порче контекста"
 },
 {
  "id": "g-te-methodsource",
  "t": "Testing",
  "s": "param",
  "q": "@MethodSource и Arguments — как параметризовать тест несколькими аргументами и объектами?",
  "a": "@ValueSource даёт один примитив на запуск. Когда нужно несколько параметров (вход + ожидаемый результат + объект) — @MethodSource ссылается на статический метод, возвращающий Stream<Arguments>. Каждый Arguments.of(...) — один прогон теста.",
  "d": "@ValueSource — только примитивы/String/Class. @CsvSource — таблица, но строки парсятся в типы (удобно, но хрупко на сложных объектах). @EnumSource — все значения enum. @MethodSource — самый мощный: возвращает любые объекты, билдеры, edge-кейсы. Имя метода-источника по умолчанию = имя теста; источник должен быть static (или @TestInstance(PER_CLASS)).",
  "code": "@ParameterizedTest\n@MethodSource(\"cases\")\nvoid tax(BigDecimal in, BigDecimal expected) {\n  assertThat(calc.tax(in)).isEqualByComparingTo(expected);\n}\nstatic Stream<Arguments> cases() {\n  return Stream.of(\n    arguments(new BigDecimal(\"100\"), new BigDecimal(\"10\")),\n    arguments(BigDecimal.ZERO, BigDecimal.ZERO));\n}"
 },
 {
  "id": "g-te-strict-stubs",
  "t": "Testing",
  "s": "Mockito",
  "q": "UnnecessaryStubbingException и verifyNoMoreInteractions — что за strict-режим Mockito и зачем он?",
  "a": "Mockito 3+ строгий: если ты настроил when(...).thenReturn(...), но мок так и не вызвали — тест падает с UnnecessaryStubbingException. Это ловит мёртвые стабы и опечатки в аргументах. verifyNoMoreInteractions проверяет, что мок не дёргали лишний раз.",
  "d": "Strictness.STRICT_STUBS (дефолт с @ExtendWith(MockitoExtension)) ловит: лишний стаб, argument mismatch (настроил на id=1, вызвали id=2 → вернул null, тест молча падает позже). Если стаб реально опционален — lenient() на конкретном стабе. verifyNoMoreInteractions — палка о двух концах: делает тест хрупким к любому новому вызову; используй точечно, не на каждом моке.",
  "code": "@ExtendWith(MockitoExtension.class) // STRICT_STUBS\nclass T {\n  @Mock Repo repo;\n  @Test void t() {\n    lenient().when(repo.find(1)).thenReturn(x); // опц.\n    // если find(1) не вызван и нет lenient -> падёж\n  }\n}"
 },
 {
  "id": "g-de-value-object",
  "t": "Design",
  "s": "value-object",
  "q": "Что такое Value Object и чем он отличается от Entity? Почему он immutable и без id?",
  "a": "Value Object — объект, который определяется СВОИМИ значениями, а не id. Money(100,'KZT') равен любому другому Money(100,'KZT'). У Entity есть личность (id), у VO — нет. Делаем immutable: меняешь — создаёшь новый. equals/hashCode по полям.",
  "d": "Entity: два клиента с одинаковым именем — РАЗНЫЕ (разный id). VO: две суммы 100 KZT — ОДНА И ТА ЖЕ, взаимозаменяемы. VO ловит инварианты в конструкторе (валюта не null, сумма >= 0), убирает «primitive obsession» (передавать BigDecimal+String везде). В Java 17 — record идеален: автоматом immutable, equals/hashCode по полям. Не путать с DTO: DTO — транспорт без логики, VO — с инвариантами и поведением (add, convert).",
  "code": "public record Money(BigDecimal amount, Currency ccy) {\n  public Money {\n    if (amount.signum() < 0) throw new IllegalArgumentException(\"negative\");\n    Objects.requireNonNull(ccy);\n  }\n  public Money add(Money o) {\n    if (!ccy.equals(o.ccy)) throw new IllegalArgumentException(\"ccy mismatch\");\n    return new Money(amount.add(o.amount), ccy);\n  }\n}"
 },
 {
  "id": "g-de-anemic-vs-rich",
  "t": "Design",
  "s": "anemic-model",
  "q": "Анемичная модель vs богатая (rich) — в чём разница и почему «анемичная» считается антипаттерном в DDD?",
  "a": "Анемичная: классы — голые геттеры/сеттеры (мешок данных), вся логика в сервисах. Богатая: данные + правила живут вместе, объект сам охраняет инварианты. Анемичная плоха: логика размазана, инвариант легко обойти через setter, нет инкапсуляции.",
  "d": "Анемичная модель — это процедурный код, переодетый в ООП: account.setBalance(x) можно вызвать откуда угодно с любым значением. В богатой модели нет setBalance — есть account.withdraw(money), который проверит «хватает ли средств» ВНУТРИ. Инвариант защищён в одном месте. ВАЖНЫЙ нюанс: анемичная модель не всегда зло — для CRUD/тонких сервисов и Transaction Script она нормальна. Зло — когда есть сложная доменная логика, а её насильно вынесли в God-сервис (см. OrderServiceImpl 1361 LOC).",
  "code": "// Анемичная — инвариант не защищён\nclass Account { @Setter BigDecimal balance; }\nservice.withdraw(acc, sum){ if(acc.getBalance()<sum)... acc.setBalance(...);}\n\n// Богатая — правило внутри\nclass Account {\n  private Money balance;\n  void withdraw(Money sum){\n    if (balance.lessThan(sum)) throw new InsufficientFunds();\n    this.balance = balance.minus(sum);\n  }\n}"
 },
 {
  "id": "g-de-adapter-vs-facade",
  "t": "Design",
  "s": "adapter-facade",
  "q": "Adapter vs Facade — оба «оборачивают» чужой код. В чём принципиальная разница?",
  "a": "Adapter — меняет ИНТЕРФЕЙС под нужный (несовместимое → совместимое), 1:1, ты не выбирал API. Facade — УПРОЩАЕТ доступ к сложной подсистеме (много классов → один удобный метод), ты прячешь сложность. Adapter про совместимость, Facade про упрощение.",
  "d": "Adapter: у тебя порт PaymentPort, а у вендора SDK с другим именем метода — пишешь VendorPaymentAdapter implements PaymentPort. Цель — впихнуть несовместимое. Facade: десяток классов legacy SDK (connect, auth, call, parse) → один LegacyFacade.getDocNumber(). Цель — спрятать оркестрацию. В гексагоне outbound-adapter часто = Adapter + кусочек Facade. Не путать с ACL: ACL — это Facade+Adapter+перевод модели чужого домена в твой (защита от «протечки» чужих понятий)."
 },
 {
  "id": "g-de-proxy",
  "t": "Design",
  "s": "proxy",
  "q": "Паттерн Proxy — что решает? Где в Spring/Quarkus ты пользуешься им, даже не зная?",
  "a": "Proxy — заместитель с тем же интерфейсом, что и реальный объект, но добавляет поведение ДО/ПОСЛЕ вызова (кэш, lazy-загрузка, права, транзакция, логирование). Клиент думает, что зовёт настоящий объект. @Transactional, @Cacheable, lazy-связи Hibernate — это прокси.",
  "d": "Ключевая идея: тот же интерфейс — поэтому подмена прозрачна. Виды: virtual (lazy-init дорогого объекта), protection (проверка прав), remote (вызов по сети как локальный), caching. В Spring AOP @Transactional оборачивает бин в прокси, который открывает/коммитит транзакцию вокруг метода. ГОЧА: самовызов (this.method() внутри бина) НЕ проходит через прокси — аннотация молча не сработает. Hibernate lazy: вернёт прокси, а при доступе вне сессии — LazyInitializationException.",
  "code": "@Service class OrderService {\n  @Transactional\n  public void place(Order o){ save(o); this.audit(o); } // self-call!\n  @Transactional(REQUIRES_NEW)\n  public void audit(Order o){...} // НЕ в новой транзакции — прокси обойдён\n}"
 },
 {
  "id": "g-de-template-vs-strategy",
  "t": "Design",
  "s": "template-method",
  "q": "Template Method vs Strategy — оба «варьируют шаг алгоритма». Чем отличаются и какой ценой?",
  "a": "Template Method — скелет алгоритма в базовом классе, подклассы переопределяют шаги (наследование, фиксируется в compile-time). Strategy — алгоритм целиком в отдельном объекте, подменяется в runtime (композиция). TM проще, но связывает иерархией; Strategy гибче и тестируемее.",
  "d": "Template Method: abstract class ReportGenerator с final generate() = шаги fetch()→format()→save(), а format() — abstract под подкласс. Минусы: жёсткое наследование, нельзя сменить шаг в рантайме, легко получить хрупкую иерархию. Strategy: интерфейс Formatter передаётся в конструктор — меняешь без новых классов-наследников, мокаешь в тестах. Правило: если варьируется ОДИН-ДВА шага и иерархия мелкая — TM ок; если поведение надо менять динамически или комбинировать — Strategy. Современный тренд — предпочитать Strategy (композиция > наследование).",
  "code": "abstract class ReportGen {\n  public final byte[] generate(){\n    var d = fetch(); var f = format(d); return save(f); // скелет\n  }\n  protected abstract byte[] format(Data d); // варьируемый шаг\n}\nclass PdfReport extends ReportGen { byte[] format(Data d){...} }"
 },
 {
  "id": "g-de-command",
  "t": "Design",
  "s": "command",
  "q": "Паттерн Command — что решает? Зачем «заворачивать вызов метода в объект»?",
  "a": "Command превращает запрос (что сделать + с какими данными) в объект. Это даёт: очередь/отложенный запуск, undo/redo, логирование операций, повтор при сбое, передачу по сети. Вызывающий не знает, ЧТО внутри — просто execute().",
  "d": "Без Command: вызвал метод — и всё, операция эфемерна. С Command: операция — данные, которые можно сохранить, поставить в Kafka, повторить, откатить (undo()). Где встречается реально: задачи в очереди (Runnable — это де-факто Command), Zeebe external task = команда на выполнение, event-sourcing команды, CQRS write-side. ВАЖНО не путать Command с Event: Command — императив («спиши деньги», может быть отклонён), Event — факт в прошлом («деньги списаны», неоспорим). Гоча на собесе любят именно это различие.",
  "code": "interface Command { void execute(); }\nrecord WithdrawCmd(AccountId acc, Money sum, AccountRepo repo) implements Command {\n  public void execute(){ repo.find(acc).withdraw(sum); }\n}\n// складываем в очередь, логируем, ретраим\nqueue.add(new WithdrawCmd(id, money, repo));"
 },
 {
  "id": "g-de-state-machine",
  "t": "Design",
  "s": "state",
  "q": "Паттерн State — что решает и почему он лучше чем «куча if-ов по полю status»?",
  "a": "State выносит поведение каждого состояния в свой класс, и объект делегирует ему. Вместо if(status==NEW)... else if(status==PAID)... по всему коду — переходы и правила лежат рядом с состоянием. Невалидный переход (cancel у SHIPPED) ловится в одном месте.",
  "d": "Симптом «нужен State»: один и тот же switch(status) повторяется в 10 методах, добавление статуса = правки везде (нарушение OCP). State делает каждое состояние объектом с методами-действиями, которые либо выполняют переход, либо кидают «нельзя». ПРАГМАТИЗМ (anti-overengineering): для 3 статусов полноценный State — оверкилл, хватит enum с методом canTransitionTo() или таблицы переходов. Полный паттерн оправдан, когда состояний много и у каждого богатое поведение. На практике в Java часто берут enum-state-machine или библиотеку (Spring StateMachine) вместо ручных классов.",
  "code": "enum OrderState {\n  NEW { OrderState pay(){ return PAID; } OrderState cancel(){ return CANCELLED; } },\n  PAID { OrderState ship(){ return SHIPPED; } },\n  SHIPPED, CANCELLED;\n  OrderState pay(){ throw new IllegalState(this+\" can't pay\"); }\n  OrderState cancel(){ throw new IllegalState(this+\" can't cancel\"); }\n  OrderState ship(){ throw new IllegalState(this+\" can't ship\"); }\n}"
 },
 {
  "id": "g-de-composite",
  "t": "Design",
  "s": "composite",
  "q": "Паттерн Composite — что решает? Почему дерево «папок и файлов» обрабатывают единообразно?",
  "a": "Composite даёт общий интерфейс листу и контейнеру, чтобы клиент работал с одиночным объектом и с группой ОДИНАКОВО, не различая их. Дерево (папка содержит папки и файлы) обходится рекурсивно через один метод. Меньше if «это лист или ветка?».",
  "d": "Структура: Component (интерфейс с size()/render()), Leaf (файл), Composite (папка со списком детей, делегирует операцию детям). Клиент зовёт component.size() — не зная, лист это или поддерево. Реальные примеры: DOM/UI-компоненты, AST, меню с подменю, организационная структура, скидка на корзину из вложенных наборов. ГОЧА собеса: безопасность типов vs прозрачность — если методы add/remove вынести в общий интерфейс (прозрачно), то у листа они бессмысленны; если только в Composite (безопасно) — теряешь единообразие. GoF выбирает прозрачность.",
  "code": "interface Node { long size(); }\nrecord File(long bytes) implements Node { public long size(){ return bytes; } }\nrecord Folder(List<Node> children) implements Node {\n  public long size(){ return children.stream().mapToLong(Node::size).sum(); }\n}\n// клиент не различает файл и папку:\nlong total = root.size();"
 },
 {
  "id": "g-de-cohesion-coupling",
  "t": "Design",
  "s": "cohesion-coupling",
  "q": "Cohesion (связность) и Coupling (зацепление) — что это и почему цель «high cohesion, low coupling»?",
  "a": "Cohesion — насколько элементы ВНУТРИ модуля относятся к одной задаче (хочешь высокую: модуль про одно). Coupling — насколько модуль зависит от ДРУГИХ (хочешь низкое: меньше связей). Цель: модуль цельный внутри и слабо связан снаружи — тогда меняешь локально, не ломая соседей.",
  "d": "Низкая cohesion = God Class: в одном классе и парсинг, и БД, и нотификации — менять страшно, тестировать тяжело. Высокий coupling = тронул один класс, посыпались пять. Метрики на собесе: типы coupling (content > common > control > stamp > data — от худшего к лучшему) и cohesion (functional — лучшая, coincidental — худшая). Связь с SRP: SRP про high cohesion. Связь с DIP: программирование на интерфейсы снижает coupling (зависишь от абстракции, а не от реализации). Это фундамент, на котором стоят ВСЕ паттерны GoF — они продают low coupling."
 },
 {
  "id": "g-de-dip-example",
  "t": "Design",
  "s": "dip-example",
  "q": "DIP на конкретном примере: что значит «и верхний, и нижний уровень зависят от абстракции», и куда смотрит стрелка?",
  "a": "Бизнес-логика (high-level) НЕ должна импортировать конкретную БД/HTTP (low-level). Вместо этого core объявляет интерфейс-порт, а адаптер БД его реализует. Стрелка зависимости разворачивается: адаптер зависит от core, а не core от адаптера. Это и есть «инверсия».",
  "d": "Наивно: OrderService → JdbcOrderRepo (core зависит от инфраструктуры — нельзя поменять БД без правки логики, нельзя протестировать без БД). По DIP: core объявляет interface OrderRepository (порт, owned by core), а JdbcOrderRepository implements его в адаптере. Теперь core не знает про JDBC вообще. Ключ: порт ПРИНАДЛЕЖИТ домену, а не инфраструктуре (иначе инверсии нет — просто интерфейс ради интерфейса). Это сердце гексагона: outbound-порты объявлены в core, реализованы снаружи. DI-контейнер (Spring/Quarkus) лишь подставляет реализацию — он механизм, а DIP — принцип.",
  "code": "// core (домен) — владеет портом\npackage core; interface OrderRepository { Order find(Id id); }\nclass PlaceOrder { final OrderRepository repo; /* зависит от АБСТРАКЦИИ */ }\n\n// adapter (инфра) — зависит от core, реализует порт\npackage infra; class JdbcOrderRepository implements core.OrderRepository {...}"
 },
 {
  "id": "g-inf-redis-sortedset",
  "t": "Infra",
  "s": "Redis / ZSET",
  "q": "Redis Sorted Set (ZSET): что это и зачем, когда обычный Set не подходит?",
  "a": "ZSET — это Set, где у каждого элемента есть score (число). Хранит уникальные элементы ОТСОРТИРОВАННЫМИ по score. Идеален для рейтингов, leaderboard, очередей по приоритету, окон по времени (score = timestamp). Достаёшь топ-N или диапазон за O(log N).",
  "d": "Внутри — skip list + hash. ZADD добавляет, ZRANGE/ZREVRANGE берут по позиции, ZRANGEBYSCORE по диапазону score. Частый кейс у бэкендера: rate limiter (sliding window) — score=timestamp, ZREMRANGEBYSCORE чистит старое, ZCARD считает запросы в окне. Или отложенные задачи: score=время запуска, ZRANGEBYSCORE now достаёт готовые.",
  "code": "ZADD board 100 alice 250 bob 175 carol\nZREVRANGE board 0 2 WITHSCORES  # топ-3: bob 250, carol 175, alice 100\nZRANGEBYSCORE board 150 300       # alice вне диапазона"
 },
 {
  "id": "g-inf-redis-hll",
  "t": "Infra",
  "s": "Redis / HyperLogLog",
  "q": "Зачем HyperLogLog в Redis, если можно просто SET и считать уникальные?",
  "a": "HLL считает приблизительное число УНИКАЛЬНЫХ элементов (cardinality) за фиксированные ~12 KB на любой объём — хоть миллиард значений. Погрешность ~0.81%. SET честный, но на миллион уникальных съест десятки МБ. HLL — когда нужно «сколько уников», а не «кто именно».",
  "d": "Команды: PFADD добавить, PFCOUNT оценить, PFMERGE объединить несколько HLL. Классика: уникальные посетители страницы в день, уникальные IP. Нельзя достать сами элементы и нельзя удалить один — только оценка количества. Это вероятностная структура: память в обмен на точность.",
  "code": "PFADD visitors:2026-06-19 user1 user2 user3\nPFADD visitors:2026-06-19 user1     # дубль не увеличит\nPFCOUNT visitors:2026-06-19          # ~3 (приблизительно)"
 },
 {
  "id": "g-inf-redis-streams-vs-pubsub",
  "t": "Infra",
  "s": "Redis / Streams vs Pub/Sub",
  "q": "Redis Pub/Sub vs Streams: почему Pub/Sub теряет сообщения, а Streams нет?",
  "a": "Pub/Sub — fire-and-forget: кто не подписан в момент публикации, тот сообщение НЕ получит, оно нигде не хранится. Streams — append-only лог: сообщения сохраняются, есть consumer groups, offset, ACK и повторная доставка непрочитанного. Streams — для надёжной очереди, Pub/Sub — для мгновенных уведомлений без гарантий.",
  "d": "Pub/Sub: PUBLISH/SUBSCRIBE, нет персистентности, нет истории. Streams: XADD пишет, XREADGROUP читает в группе (как Kafka consumer group), XACK подтверждает, XPENDING показывает необработанное (упавший консьюмер → XCLAIM перехватывает). Если нужна доставка хотя бы раз и переживание рестарта — Streams. Если нужна минимальная задержка и потеря допустима (live-тикер) — Pub/Sub.",
  "code": "# надёжно (Streams)\nXADD orders * id 42 amount 100\nXREADGROUP GROUP g1 c1 COUNT 1 STREAMS orders >\nXACK orders g1 1700000000-0\n# best-effort (Pub/Sub) — оффлайн-подписчик потеряет\nPUBLISH price:btc 65000"
 },
 {
  "id": "g-inf-redis-rdb-aof-tradeoff",
  "t": "Infra",
  "s": "Redis / persistence",
  "q": "RDB и AOF выбраны оба — зачем, и что реально восстанавливается при падении?",
  "a": "RDB — периодический снапшот (быстрый рестарт, но теряешь данные с момента последнего снапшота). AOF — лог всех команд записи (теряешь максимум ~1 сек при fsync everysec, но файл больше и рестарт медленнее). Вместе: AOF для минимальной потери данных, RDB как быстрый бэкап. При старте Redis грузит AOF (он свежее).",
  "d": "appendfsync: always (надёжно, медленно), everysec (баланс, дефолт), no (отдаём ОС). AOF растёт → BGREWRITEAOF компактит. С Redis 7 — Multi-Part AOF (base RDB + incremental). Гоча: RDB BGSAVE форкает процесс, copy-on-write может удвоить память на пике записи. Чистый кэш без ценных данных — можно вообще выключить persistence.",
  "code": "save 900 1            # RDB: снапшот если >=1 изменение за 900с\nappendonly yes        # AOF включён\nappendfsync everysec  # fsync раз в секунду (баланс)"
 },
 {
  "id": "g-inf-es-refresh-near-realtime",
  "t": "Infra",
  "s": "Elasticsearch / refresh",
  "q": "Записал документ в Elasticsearch, ответ 201 — но поиск его не находит. Почему?",
  "a": "ES — near real-time, не real-time. Индексированный документ попадает в in-memory буфер и становится искомым только после refresh (по умолчанию раз в 1 секунду создаётся новый сегмент). 201 = документ принят и в транслоге (durable), но ещё не в открытом для поиска сегменте. GET по id найдёт сразу, а search — нет.",
  "d": "refresh ≠ flush. refresh открывает сегмент для поиска (дёшево, in-memory). flush сбрасывает на диск и обрезает translog (дорого). Не зови refresh=true на каждый write в проде — убьёшь throughput множеством мелких сегментов. Для тестов/строгой консистентности: ?refresh=wait_for ждёт ближайший refresh, не форсируя свой.",
  "code": "PUT /orders/_doc/42 {\"sum\": 100}      // 201, но search пока пусто\nPUT /orders/_doc/42?refresh=wait_for   // дождаться видимости в поиске\nPUT /orders/_settings {\"index.refresh_interval\": \"30s\"} // throughput++"
 },
 {
  "id": "g-inf-es-shards-replicas",
  "t": "Infra",
  "s": "Elasticsearch / shards",
  "q": "Primary shards нельзя менять после создания индекса, а replicas можно. Почему и как это бьёт в проде?",
  "a": "Число primary shards фиксируется при создании индекса: документ маршрутизируется по hash(id) % number_of_primaries — изменить = пересчитать всё, поэтому нужен reindex в новый индекс. Replicas (копии) меняются на лету: дают отказоустойчивость и масштаб чтения. Ошибся с primaries — переезд через reindex.",
  "d": "Anti-pattern: 1000 shards на маленький индекс (over-sharding) — каждый shard это люсеновский индекс с накладными расходами, кластер тонет в метаданных. Ориентир: shard 10–50 GB. replica=0 нельзя терять данные при падении ноды. Реплика не может жить на той же ноде, что и её primary. Для смены primaries — Shrink/Split API или reindex.",
  "code": "PUT /orders {\"settings\":{\n  \"number_of_shards\": 3,     // НЕЛЬЗЯ изменить потом\n  \"number_of_replicas\": 1    // можно менять в рантайме\n}}\nPUT /orders/_settings {\"number_of_replicas\": 2}"
 },
 {
  "id": "g-inf-docker-layer-cache-order",
  "t": "Infra",
  "s": "Docker / layer cache",
  "q": "Почему COPY всего проекта перед mvn install ломает кэш и каждая сборка тянет зависимости заново?",
  "a": "Каждая инструкция Dockerfile — слой, кэшируется по содержимому. Если COPY . . идёт ДО скачивания зависимостей, любая правка кода инвалидирует слой и всё ниже — Maven качает интернет каждый раз. Правильно: сначала COPY pom.xml + mvn dependency go-offline (редко меняется, кэш живёт), потом COPY src.",
  "d": "Порядок слоёв = от редко меняющегося к часто меняющемуся. Зависимости меняются раз в месяц, код — каждый коммит. Также .dockerignore (target, .git, node_modules) чтобы build context не раздувался и случайная правка лога не сбивала кэш COPY. Для Java хорошо ложится в multistage: build-стадия с .m2, runtime-стадия только с jar.",
  "code": "COPY pom.xml .\nRUN mvn -B dependency:go-offline   # слой кэшируется, пока pom не менялся\nCOPY src ./src                     # правка кода бьёт только сюда и ниже\nRUN mvn -B package -DskipTests"
 },
 {
  "id": "g-inf-k8s-configmap-no-reload",
  "t": "Infra",
  "s": "K8s / ConfigMap",
  "q": "Поменял ConfigMap, а приложение работает по-старому. В чём подвох?",
  "a": "ConfigMap, проброшенный как ENV-переменные, фиксируется при старте пода — изменение НЕ долетит до запущенного контейнера, нужен рестарт (rollout restart). ConfigMap, смонтированный как файл (volume), обновляется в файловой системе сам (с задержкой ~1 мин), НО приложение должно само перечитать файл. ENV → нужен рестарт; volume → нужно перечитывание.",
  "d": "Частая боль: думают, что ConfigMap «горячий», а под держит старые ENV. Решение: kubectl rollout restart deployment, либо checksum/config аннотация в pod template (хэш конфига меняется → под пересоздаётся автоматически при apply). Secret ведёт себя так же. Для Quarkus/Spring c volume — нужен механизм reload конфигурации в самом приложении.",
  "code": "spec:\n  template:\n    metadata:\n      annotations:\n        checksum/config: {{ sha256 .configmap }}  # меняется → rollout\n    spec:\n      containers:\n        - envFrom: [{configMapRef: {name: app-cfg}}]  # ENV = нужен рестарт"
 },
 {
  "id": "g-inf-k8s-hpa-needs-requests",
  "t": "Infra",
  "s": "K8s / HPA",
  "q": "HPA по CPU настроен, но не масштабирует поды. Чего почти всегда не хватает?",
  "a": "HPA по CPU считает загрузку в ПРОЦЕНТАХ от resources.requests.cpu. Если у контейнера не задан requests.cpu — HPA не знает базу, метрика utilization не вычисляется, масштабирования нет. Плюс нужен metrics-server в кластере. Нет requests → нет процента → HPA молчит.",
  "d": "HPA смотрит targetAverageUtilization vs (текущее CPU / requests). Без metrics-server kubectl top тоже пустой — первый чек. Гочи: HPA и фиксированное replicas в Deployment конфликтуют (HPA выиграет, но не ставь replicas руками). Cooldown/stabilizationWindow сглаживает дёрганье. Для не-CPU метрик (RPS, длина очереди) — custom/external metrics через адаптер.",
  "code": "resources:\n  requests: { cpu: \"250m\" }   # без этого HPA по CPU не работает\n---\nkind: HorizontalPodAutoscaler\nspec:\n  metrics:\n    - type: Resource\n      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 }}"
 },
 {
  "id": "g-inf-nginx-upstream-lb",
  "t": "Infra",
  "s": "nginx / upstream",
  "q": "Зачем nginx upstream и почему дефолтный round-robin ломает залогиненных юзеров?",
  "a": "upstream — пул бэкендов, между которыми nginx балансирует как reverse proxy. Дефолт — round-robin (по очереди). Проблема: если сессия хранится в памяти конкретного инстанса, юзера на следующем запросе кидает на ДРУГОЙ бэкенд — сессия теряется. Лечится sticky-сессией (ip_hash) или, правильнее, вынести сессию в Redis (stateless бэкенд).",
  "d": "Стратегии: round-robin (дефолт), least_conn (на наименее загруженный), ip_hash (один клиент → один бэкенд, sticky). weight= для разных по мощности нод. Пассивные health-check через max_fails/fail_timeout (OSS), активные — в Plus. Правильный путь для масштаба: stateless приложение + сессия/кэш в Redis, тогда любая нода обслужит любой запрос и round-robin безопасен.",
  "code": "upstream backend {\n  least_conn;\n  server app1:8080 weight=2;\n  server app2:8080 max_fails=3 fail_timeout=30s;\n}\nserver { location / { proxy_pass http://backend; } }"
 },
 {
  "id": "g-alg-open-vs-chain",
  "t": "Algorithms",
  "s": "hashing",
  "q": "Открытая адресация vs цепочки — в чём разница и где какой ловит проблемы?",
  "a": "Цепочки: каждая ячейка — список коллизий (как Java HashMap). Открытая адресация: коллизию кладём в СЛЕДУЮЩУЮ свободную ячейку самого массива, списков нет. Открытая быстрее по кэшу, но деградирует при заполнении >0.7 и страдает от кластеризации и удалений (нужны tombstone-метки).",
  "d": "Java HashMap — цепочки (с Java 8 превращает длинный бакет в дерево). Открытая адресация (linear/quadratic probing, double hashing) экономит память на указателях и дружит с CPU-кэшем, но требует низкого load factor и аккуратного удаления через tombstone, иначе поиск ломается.",
  "code": "// chaining (HashMap-style)\nbucket[h] -> [k1,k2,k3]\n// open addressing (linear probe)\nint i = h;\nwhile (slot[i] != null && slot[i].key != key) i = (i+1) % n;"
 },
 {
  "id": "g-alg-union-find",
  "t": "Algorithms",
  "s": "union-find",
  "q": "Union-Find (DSU) — что решает и почему почти O(1)?",
  "a": "Структура «множества с быстрым объединением»: отвечает на «в одной ли группе a и b?» и «объедини группы a и b». Каждый элемент указывает на родителя, корень — id множества. С path compression + union by rank амортизированно почти O(1) (обратный Аккерман α(n)≤5).",
  "d": "Классика: компоненты связности графа, цикл в графе (Kruskal MST), динамическая эквивалентность, «друзья друзей». Без двух оптимизаций деревья вырождаются в цепочки и find становится O(n). Обе оптимизации вместе дают α(n) — практически константу.",
  "code": "int find(int x){\n  while (p[x]!=x){ p[x]=p[p[x]]; x=p[x]; } // path halving\n  return x;\n}\nvoid union(int a,int b){ p[find(a)]=find(b); }"
 },
 {
  "id": "g-alg-trie",
  "t": "Algorithms",
  "s": "trie",
  "q": "Trie (префиксное дерево) — зачем, если есть HashMap<String,V>?",
  "a": "Trie хранит строки по символам: общий префикс — общий путь. Поиск/вставка за O(длины слова), НЕ зависит от числа слов. Даёт то, чего HashMap не умеет: автодополнение по префиксу, «все слова на abc-», сортировку по алфавиту обходом.",
  "d": "HashMap даёт точный get за O(L) на хеш строки, но не умеет префиксные запросы. Trie платит памятью (узел на символ), зато даёт prefix-search, longest-prefix-match (роутинг IP, словари T9, спелчекеры). Сжатый вариант — radix/PATRICIA trie.",
  "code": "class Node { Node[] kids = new Node[26]; boolean end; }\n// insert: идём по символам, создаём узлы\n// startsWith(\"app\"): дошли до узла — префикс есть"
 },
 {
  "id": "g-alg-heapsort",
  "t": "Algorithms",
  "s": "heap",
  "q": "Heap-sort — как куча сортирует и почему он in-place, но не стабильный?",
  "a": "Строим max-heap из массива (O(n)), затем n раз: берём корень (максимум), меняем с последним, уменьшаем кучу, просеиваем вниз. Гарантированно O(n log n), без доп. массива (in-place). Но порядок равных элементов рушится при свопах — нестабилен.",
  "d": "Build-heap снизу вверх — O(n), а не O(n log n). Heap-sort выигрывает у quicksort гарантией worst-case O(n log n) (нет деградации до O(n²)), но проигрывает по кэш-локальности (прыжки по индексам i, 2i+1). Поэтому в проде чаще quicksort/introsort.",
  "code": "void heapify(int[] a,int n,int i){\n  int l=2*i+1,r=2*i+2,big=i;\n  if(l<n&&a[l]>a[big])big=l;\n  if(r<n&&a[r]>a[big])big=r;\n  if(big!=i){swap(a,i,big);heapify(a,n,big);}\n}"
 },
 {
  "id": "g-alg-dijkstra",
  "t": "Algorithms",
  "s": "graph",
  "q": "Дейкстра — как находит кратчайший путь и где ломается?",
  "a": "Из стартовой вершины жадно тянем ближайшую непосещённую (через min-heap), релаксируем рёбра соседей. С PriorityQueue — O((V+E) log V). Ломается на ОТРИЦАТЕЛЬНЫХ рёбрах: жадный «зафиксировал минимум» допущение неверно — там нужен Bellman-Ford.",
  "d": "Дейкстра = BFS, взвешенный по стоимости, на priority queue. Допущение: раз вершина извлечена из кучи с минимальной dist — это финал. Отрицательное ребро может позже удешевить уже «закрытую» вершину, и допущение рушится. Bellman-Ford — O(V·E), ловит и отрицательные циклы.",
  "code": "pq.add(new int[]{0, src});\nwhile(!pq.isEmpty()){\n  var cur=pq.poll(); int d=cur[0],u=cur[1];\n  if(d>dist[u])continue; // устаревшая запись\n  for(var e:adj[u]) if(d+e.w<dist[e.to]){dist[e.to]=d+e.w; pq.add(...);}\n}"
 },
 {
  "id": "g-alg-toposort",
  "t": "Algorithms",
  "s": "graph",
  "q": "Топологическая сортировка — что это и как ловит циклы?",
  "a": "Линейный порядок вершин DAG, где каждое ребро u→v идёт «слева направо» (зависимость раньше зависимого). Алгоритм Кана: берём вершины с in-degree 0 в очередь, убираем, уменьшаем степени соседей. Если в конце обработаны не все — есть ЦИКЛ.",
  "d": "Применения: порядок сборки модулей (Maven/Gradle), расписание задач с зависимостями, разрешение импортов, миграции БД. Два способа: Kahn (BFS по in-degree) или DFS с post-order разворотом. Цикл = невозможность топосорта = ошибка «циклическая зависимость».",
  "code": "Queue<Integer> q=new ArrayDeque<>();\nfor(int v=0;v<n;v++) if(indeg[v]==0) q.add(v);\nwhile(!q.isEmpty()){int u=q.poll(); order.add(u);\n  for(int w:adj[u]) if(--indeg[w]==0) q.add(w);}\nif(order.size()<n) throw new IllegalStateException(\"cycle\");"
 },
 {
  "id": "g-alg-binsearch-answer",
  "t": "Algorithms",
  "s": "binary-search",
  "q": "Бинпоиск по ответу — как искать там, где нет отсортированного массива?",
  "a": "Если ответ — число в диапазоне [lo,hi], а на него есть МОНОТОННЫЙ предикат check(x) (если x подходит — подходит и всё больше/меньше), бинарим по самому ответу: O(log(range)·cost(check)). Классика: «минимальная скорость/мощность, чтобы успеть за K».",
  "d": "Признак задачи: «минимизируй максимум» / «максимизируй минимум» / «минимальное X, при котором возможно». Не сортируем данные — сортирована сама ось ответа по предикату. Применяют: capacity to ship, Koko eating bananas, split array largest sum.",
  "code": "int lo=1, hi=max;\nwhile(lo<hi){\n  int mid=lo+(hi-lo)/2;        // защита от overflow\n  if(feasible(mid)) hi=mid;    // годится — пробуем меньше\n  else lo=mid+1;\n}\nreturn lo;"
 },
 {
  "id": "g-alg-lru",
  "t": "Algorithms",
  "s": "lru-cache",
  "q": "LRU-кэш — как сделать get/put за O(1) и при чём тут LinkedHashMap?",
  "a": "Нужна структура, где быстро: найти по ключу (HashMap) И двигать «недавно использованный» в начало (двусвязный список). Связка HashMap+doubly-linked list даёт O(1) на всё. В Java готовое — LinkedHashMap с accessOrder=true и переопределённым removeEldestEntry.",
  "d": "Сам HashMap не помнит порядок доступа, сам список — не ищет за O(1). Поэтому именно дуэт. LinkedHashMap внутри хранит цепочку узлов; accessOrder=true перевешивает узел в хвост при get. removeEldestEntry автоматически выкидывает голову при превышении ёмкости.",
  "code": "new LinkedHashMap<K,V>(16, .75f, true){\n  protected boolean removeEldestEntry(Map.Entry<K,V> e){\n    return size() > CAPACITY;\n  }\n};"
 },
 {
  "id": "g-alg-amortized",
  "t": "Algorithms",
  "s": "complexity",
  "q": "Амортизированная сложность — почему ArrayList.add это «O(1)», хотя бывает O(n)?",
  "a": "Амортизация усредняет дорогие операции по всей серии. ArrayList иногда копирует весь массив (O(n)) при росте, но удвоение ёмкости делает это РЕДКО: на n добавлений суммарно O(n) копирований → O(1) на операцию амортизированно. Это НЕ «average case» — это гарантия по серии.",
  "d": "Ключ — удвоение (×2, а не +1): копирований 1+2+4+…+n = 2n−1 ≈ O(n) на всю серию. Если бы росли на +1 каждый раз — было бы O(n²). Амортизированный анализ (aggregate/banker's/potential method) даёт честную границу для последовательности, не зависящую от распределения входа.",
  "code": "// рост: при заполнении\nnewCap = oldCap + (oldCap >> 1); // ×1.5 в Java\nelementData = Arrays.copyOf(elementData, newCap); // редкое O(n)"
 },
 {
  "id": "g-alg-bit-tricks",
  "t": "Algorithms",
  "s": "bit-tricks",
  "q": "Битовые трюки — какие реально пригождаются в Java-проде?",
  "a": "Проверка чётности x&1, умножение/деление на 2 через x<<1 / x>>1, степень двойки (x&(x-1))==0, флаги-маски (битовые наборы вместо EnumSet вручную), быстрый mod на 2^k через x&(n-1), снять младший бит x&=x-1. Дают скорость и компактность, но читаемость страдает — комментируй.",
  "d": "Важная гоча: в Java >> — арифметический сдвиг (тянет знак), >>> — логический (нулём). Для хешей/беззнаковых нужен >>>. n%2 для отрицательных даёт −1, а &1 даёт 1 — не взаимозаменяемы. Integer.bitCount / Long.numberOfTrailingZeros — встроенные, без своих циклов.",
  "code": "boolean pow2 = n>0 && (n & (n-1))==0;\nint mod = x & (1024 - 1);     // x % 1024, если 1024=2^k\nint avgNoOverflow = (a & b) + ((a ^ b) >> 1);\n// >> тянет знак, >>> — нет!"
 },
 {
  "id": "g-git-worktree",
  "t": "Git",
  "s": "worktree",
  "q": "Что такое git worktree и зачем он, когда хватает branch?",
  "a": "worktree даёт второй рабочий каталог на тот же .git, но с ДРУГОЙ веткой. Можешь чинить hotfix в одной папке, не трогая свою недоделанную фичу в другой — без stash и без второго clone. Один репозиторий, несколько чекаутов одновременно.",
  "d": "Каждый worktree держит свой HEAD и индекс, но шарит объекты и .git/. Одну ветку нельзя зачекаутить в двух worktree сразу. `git worktree list` показывает все, `git worktree remove` убирает. Удобно для параллельной сборки/тестов на разных ветках без переключения и перекомпиляции.",
  "code": "git worktree add ../hotfix-dir hotfix/PROD-123\n# работаешь там, потом:\ngit worktree remove ../hotfix-dir"
 },
 {
  "id": "g-git-submodule",
  "t": "Git",
  "s": "submodule",
  "q": "Что такое git submodule и почему он коварен?",
  "a": "submodule — это другой git-репозиторий, вложенный в твой по ФИКСИРОВАННОМУ коммиту (gitlink), а не по ветке. Родитель помнит конкретный SHA. После clone папка пустая, пока не сделаешь submodule update. Забыл — и собрал не ту версию.",
  "d": "`clone --recurse-submodules` или потом `submodule update --init --recursive`. Родитель коммитит указатель на SHA сабмодуля; обновление зависимости = новый коммит в родителе. Грабли: detached HEAD внутри сабмодуля, забытый push сабмодуля, рассинхрон у коллег. Альтернативы: монорепо, пакетный менеджер.",
  "code": "git submodule add https://git/lib libs/lib\ngit clone --recurse-submodules <url>\ngit submodule update --init --recursive"
 },
 {
  "id": "g-git-tag-annotated",
  "t": "Git",
  "s": "tags",
  "q": "Lightweight vs annotated tag — в чём разница и какой для релиза?",
  "a": "Lightweight — просто ярлык-указатель на коммит, без метаданных. Annotated — полноценный объект: автор, дата, сообщение, можно подписать GPG. Для релизов бери annotated (-a), его видно в describe и он несёт инфу. Lightweight — для локальных временных меток.",
  "d": "Annotated хранится как отдельный tag-объект в БД git; lightweight — это просто ref. `git describe` по умолчанию учитывает только annotated. Теги НЕ пушатся автоматически: `git push origin v1.2.0` или `--tags`. Удаление: `git tag -d` локально + `git push origin :refs/tags/v1.2.0` на сервере.",
  "code": "git tag -a v1.2.0 -m \"Release 1.2.0\"   # annotated\ngit tag v1.2.0-tmp                       # lightweight\ngit push origin v1.2.0"
 },
 {
  "id": "g-git-detached-head",
  "t": "Git",
  "s": "detached-HEAD",
  "q": "Что такое detached HEAD и почему коммиты тут можно потерять?",
  "a": "Обычно HEAD указывает на ветку. После `checkout <SHA>` или тега HEAD «отцеплён» — смотрит прямо на коммит, без ветки. Коммитишь — коммиты ничьи: переключишься, и на них нет ссылки, GC их съест. Спасает reflog или новая ветка ВОВРЕМЯ.",
  "d": "Частые причины: checkout по SHA/тегу, во время rebase, в detached worktree, в CI. Чтобы сохранить работу: `git switch -c new-branch` пока ты на нужном коммите. Если уже ушёл — `git reflog` найдёт оборванный SHA. `git switch -` вернёт на прошлую ветку.",
  "code": "git checkout 9f3a2c1        # detached\n# наработал коммитов — сохрани:\ngit switch -c rescue-branch"
 },
 {
  "id": "g-git-revert-merge",
  "t": "Git",
  "s": "revert-merge",
  "q": "Как откатить уже влитый merge-коммит и почему нужен -m?",
  "a": "У merge-коммита ДВА родителя, git не знает какую сторону считать «нормой». `revert -m 1` означает: вернись к первому родителю (обычно main), отменив влитую ветку. Без -m git ругается. Грабли: повторно влить ту же ветку потом не выйдет без хитростей.",
  "d": "`-m 1` — mainline (ветка, в которую мёржили), `-m 2` — влитая. После revert-merge ветка считается уже учтённой; чтобы влить её снова, придётся реверт-реверта или rebase. Поэтому в важных случаях иногда лучше `--no-ff` отдельной фичей, а не revert.",
  "code": "git log --oneline   # нашли merge SHA\ngit revert -m 1 <merge-sha>"
 },
 {
  "id": "g-git-no-ff-merge",
  "t": "Git",
  "s": "merge-strategy",
  "q": "Fast-forward vs --no-ff merge — когда какой и зачем?",
  "a": "Если main не уехал, git просто двигает указатель вперёд (fast-forward) — merge-коммита нет, история линейная, но факт «была фича» теряется. `--no-ff` всегда создаёт merge-коммит — видно границы фичи и легко откатить ветку целиком одним revert.",
  "d": "Многие командные политики ставят `--no-ff` для feature→develop, чтобы PR оставлял узел слияния. `--ff-only` наоборот запрещает merge-коммиты (защита от мусора в pull). Squash-merge — третий вариант: один коммит без узла. Выбор = баланс читаемости и трассируемости.",
  "code": "git merge --no-ff feature/x   # всегда merge-commit\ngit merge --ff-only feature/x # только если можно перемотать"
 },
 {
  "id": "g-git-blame",
  "t": "Git",
  "s": "blame",
  "q": "git blame: зачем и как не упереться в косметический коммит?",
  "a": "blame показывает, кто и в каком коммите менял КАЖДУЮ строку файла — чтобы понять «почему так написано» и найти контекст. Грабли: форматирование/переименование портят картину. Флаги -w (игнор пробелов) и -C (следить за перемещением кода) спасают.",
  "d": "`blame -L 40,60 file` — только нужные строки. Чтобы пробить сквозь «причёсывающий» коммит: `git log -L` или `git blame <SHA>^ -- file`. `git config blame.ignoreRevsFile` + `.git-blame-ignore-revs` исключает массовые реформат-коммиты из выдачи навсегда.",
  "code": "git blame -w -C -L 40,60 src/Order.java\n# игнор реформат-коммитов:\ngit blame --ignore-revs-file .git-blame-ignore-revs file"
 },
 {
  "id": "g-git-hooks",
  "t": "Git",
  "s": "hooks",
  "q": "Git hooks: что это и почему pre-commit нельзя считать защитой?",
  "a": "Хуки — скрипты, которые git сам запускает на событиях (pre-commit, commit-msg, pre-push). Удобно гонять линт/тесты локально. НО они лежат в .git/hooks, в репозиторий НЕ коммитятся и легко обходятся `--no-verify`. Реальный заслон — CI на сервере.",
  "d": "Чтобы хуки шарились в команде: `core.hooksPath` на папку в репо или инструменты вроде pre-commit/husky. Серверные хуки (pre-receive) — единственные, что нельзя обойти клиентом. Принцип: хуки = удобство разработчику, gate = CI/branch protection.",
  "code": "git config core.hooksPath .githooks\ngit commit --no-verify   # обходит pre-commit ⚠"
 },
 {
  "id": "g-git-gitignore-tracked",
  "t": "Git",
  "s": "gitignore",
  "q": ".gitignore не работает на уже отслеживаемом файле — почему и как чинить?",
  "a": ".gitignore влияет ТОЛЬКО на неотслеживаемые файлы. Если файл уже закоммичен, добавить его в ignore мало — git продолжит видеть изменения. Надо убрать из индекса: `git rm --cached`, оставив файл на диске, и закоммитить удаление из трекинга.",
  "d": "Нюансы: правила с `/` в начале якорятся к корню; `!pattern` снимает игнор, но не вытащит файл из уже-игнорируемой папки; `**` — рекурсивно. Глобальный ignore: `core.excludesFile`. Для секретов: ignore не удаляет историю — нужен filter-repo/BFG, если файл уже в истории.",
  "code": "echo \"application-local.properties\" >> .gitignore\ngit rm --cached application-local.properties\ngit commit -m \"stop tracking local config\""
 },
 {
  "id": "g-git-cherry-pick-conflict",
  "t": "Git",
  "s": "cherry-pick",
  "q": "Конфликт при cherry-pick: как продолжить, отменить и не насажать дублей?",
  "a": "При конфликте cherry-pick встаёт на паузе. Правишь файлы, `git add`, затем `git cherry-pick --continue` (НЕ commit заново). Передумал — `--abort` вернёт как было, `--skip` пропустит этот коммит. Грабли: перенос коммита создаёт НОВЫЙ SHA — потом легко получить дубли при merge.",
  "d": "Конфликты обычны, если контекст изменился. `-x` дописывает «(cherry picked from ...)» — помогает трассировать. Перенос целого диапазона `A..B`. Поскольку SHA новые, последующее слияние тех же изменений даёт дубль-коммиты; для серий лучше rebase/merge, чем массовый cherry-pick.",
  "code": "git cherry-pick a1b2c3d\n# конфликт → правим, затем:\ngit add .\ngit cherry-pick --continue   # или --abort / --skip"
 },
 {
  "id": "g-ops-docker-layer-cache",
  "t": "DevOps",
  "s": "docker-cache",
  "q": "Почему COPY всего проекта ПЕРЕД mvn dependency убивает кэш слоёв, и как чинят порядком в Dockerfile?",
  "a": "Docker кэширует слои по порядку: если слой изменился — он и все следующие пересобираются. Если СНАЧАЛА COPY весь код, то любая правка кода инвалидирует слой и зависимости качаются заново каждый билд. Решение: сначала COPY pom.xml + скачать зависимости (редко меняются), ПОТОМ COPY код. Тогда кэш зависимостей живёт между билдами.",
  "d": "Кэш слоя жив, пока неизменны: инструкция, контент копируемых файлов и все предыдущие слои. mvn dependency:go-offline в отдельном слое = зависимости качаются только при смене pom.xml. Это режет время билда с минут до секунд. Тот же приём — package.json перед COPY . в Node.",
  "code": "# ПЛОХО: код меняется -> deps качаются заново\nCOPY . .\nRUN mvn package\n\n# ХОРОШО: deps кэшируются отдельно\nCOPY pom.xml .\nRUN mvn dependency:go-offline\nCOPY src ./src\nRUN mvn package -o"
 },
 {
  "id": "g-ops-latest-tag",
  "t": "DevOps",
  "s": "image-tags",
  "q": "Почему деплой образа по тегу :latest — мина, и чем заменяют в проде?",
  "a": ":latest — это не версия, а просто «последний запушенный». Два узла могут вытянуть РАЗНЫЕ образы под одним :latest, rollback невозможен (на что откатывать?), и imagePullPolicy может взять старый из кэша. В проде тегуют неизменяемым (immutable) тегом: git-sha или semver — app:1.4.2 / app:a1b2c3d.",
  "d": "Проблема в том, что :latest — мутабельная ссылка: сегодня указывает на одно, завтра на другое. Воспроизводимость теряется. Лучшая практика: тег = commit SHA (точная трассируемость билд↔код) или semver для релизов. В k8s ставь imagePullPolicy: IfNotPresent с immutable-тегом — экономит pull и гарантирует тот же образ.",
  "code": "# ПЛОХО\nimage: registry/app:latest\n\n# ХОРОШО: неизменяемый тег\nimage: registry/app:1.4.2\n# или по git sha\nimage: registry/app:sha-a1b2c3d"
 },
 {
  "id": "g-ops-semver-breaking",
  "t": "DevOps",
  "s": "semver",
  "q": "В MAJOR.MINOR.PATCH что бампают при breaking change в API, и почему 1.0.0 — особый рубеж?",
  "a": "Breaking change (несовместимое изменение публичного API) = бамп MAJOR: 1.4.2 → 2.0.0, и MINOR/PATCH сбрасываются в 0. MINOR — новая фича без поломки совместимости (1.4.2→1.5.0). PATCH — багфикс (1.4.2→1.4.3). До 1.0.0 (zero-версии) правило не действует: там всё может ломаться в любой момент.",
  "d": "Контракт SemVer: по версии потребитель понимает, безопасно ли обновляться. ^1.4.2 в зависимостях = «бери любой 1.x» (доверяешь, что MINOR не сломает). Главная ошибка: тихо сломать API в MINOR/PATCH — у всех потребителей упадёт сборка/рантайм при «безопасном» апдейте. 0.x.y — публичный сигнал «API ещё не стабилен».",
  "code": "// breaking: удалили/переименовали публичный метод -> MAJOR\n1.4.2 -> 2.0.0\n// добавили новый метод, старые работают -> MINOR\n1.4.2 -> 1.5.0\n// поправили баг внутри -> PATCH\n1.4.2 -> 1.4.3"
 },
 {
  "id": "g-ops-ci-secrets",
  "t": "DevOps",
  "s": "ci-secrets",
  "q": "Почему секрет, попавший в `echo $TOKEN` или в Docker ARG, считается утёкшим, даже если pipeline зелёный?",
  "a": "Секреты в CI нельзя печатать и нельзя класть в слои образа. echo выводит токен в лог job (виден всем с доступом). Docker ARG/ENV запекаются в историю образа — docker history достанет даже после «удаления». Правильно: маскированные secret-переменные хранилища (Vault/CI secrets), --secret mount при билде, ротация при подозрении на утечку.",
  "d": "Маскирование в логах — не панацея: токен в URL, в ENV дочернего процесса или в артефакте всё равно утечёт. BuildKit --mount=type=secret даёт файл только на время RUN, не сохраняя в слой. Главный принцип: секрет, который МОГ быть виден — уже скомпрометирован, его ротируют, а не «надеются что не заметили».",
  "code": "# ПЛОХО: токен в истории образа\nARG NPM_TOKEN\nRUN npm install\n\n# ХОРОШО: BuildKit secret, не попадает в слой\nRUN --mount=type=secret,id=npm_token \\\n  NPM_TOKEN=$(cat /run/secrets/npm_token) npm install"
 },
 {
  "id": "g-ops-terraform-state",
  "t": "DevOps",
  "s": "terraform",
  "q": "Зачем Terraform нужен remote state с локами, и что ломается при локальном terraform.tfstate в команде?",
  "a": "tfstate — это карта «что Terraform создал в облаке». Локальный файл = у каждого своя версия реальности: двое применяют одновременно — затирают чужие ресурсы, дрейф, дубли. Remote backend (S3+DynamoDB lock, или Terraform Cloud) хранит единый state и блокирует параллельный apply. Без него команда быстро разносит инфраструктуру.",
  "d": "State — источник истины для diff: Terraform сравнивает state ↔ конфиг ↔ реальное облако. Лок (state locking) не даёт двум apply работать разом. Ещё: state содержит секреты в открытом виде (пароли БД) — поэтому S3 шифруют и не коммитят tfstate в git. Дрейф ловят terraform plan/refresh.",
  "code": "terraform {\n  backend \"s3\" {\n    bucket         = \"acme-tfstate\"\n    key            = \"prod/terraform.tfstate\"\n    dynamodb_table = \"tf-locks\"  # блокировка\n    encrypt        = true\n  }\n}"
 },
 {
  "id": "g-ops-feature-flag-debt",
  "t": "DevOps",
  "s": "feature-flags",
  "q": "Чем feature flag лучше отдельной long-lived ветки, и почему «забытый» флаг — техдолг и риск?",
  "a": "Feature flag — это if(flags.on(\"x\")) в коде: фичу мержат в main выключенной и включают рантайм-конфигом, без редеплоя. Это убирает ад мержа долгих веток и отделяет деплой от релиза. Но каждый флаг — это ветвление кода. Забытый включённый флаг = мёртвый else-путь, который никто не тестирует, и однажды кто-то его дёрнет.",
  "d": "Флаги бывают: release (постепенный rollout), ops (kill-switch), experiment (A/B), permission. Главная дисциплина — TTL: у release-флага есть срок жизни, после полного выката его удаляют вместе со старой веткой кода. Накопление флагов = комбинаторный взрыв состояний, которые невозможно протестировать. Это не фича, а долг с процентами.",
  "code": "if (featureFlags.isEnabled(\"new-pricing\", userId)) {\n    return newPricing.calc(order);\n} else {\n    return legacyPricing.calc(order); // удалить после 100% rollout!\n}"
 },
 {
  "id": "g-ops-rollback-migration",
  "t": "DevOps",
  "s": "rollback",
  "q": "Почему «просто откатить образ на прошлую версию» не всегда спасает, если был ALTER TABLE DROP COLUMN?",
  "a": "Откат кода ≠ откат БД. Если новая версия выкатила миграцию DROP COLUMN, а ты откатил образ — старый код ждёт колонку, которой больше нет → падение. Схема БД «вперёд во времени», код — назад. Поэтому миграции делают обратно-совместимыми (expand/contract): сначала добавляешь, деплоишь, и только потом отдельно удаляешь старое.",
  "d": "Паттерн expand-and-contract: (1) expand — добавить новую колонку, код пишет в обе; (2) деплой и backfill; (3) contract — удалить старую колонку отдельным релизом, когда старый код уже не нужен. Так на каждом шаге N и N±1 версии кода совместимы со схемой. Roll-forward (фикс вперёд) часто безопаснее отката, если БД уже изменилась.",
  "code": "-- РЕЛИЗ 1 (expand): безопасно для старого кода\nALTER TABLE orders ADD COLUMN amount_v2 numeric;\n-- код пишет в amount и amount_v2, backfill\n\n-- РЕЛИЗ 2 (contract): только когда старый код мёртв\nALTER TABLE orders DROP COLUMN amount;"
 },
 {
  "id": "g-ops-prometheus-pull",
  "t": "DevOps",
  "s": "prometheus",
  "q": "Prometheus сам ходит за метриками (pull), а не сервис их шлёт (push) — почему так и что делать с короткоживущими job?",
  "a": "Prometheus периодически скрейпит /metrics у целей (pull-модель). Плюсы: Prometheus знает список целей (service discovery), легко понять «жив ли target» (up=0 если не ответил), нет завала от лавины push. Минус: короткие batch-задачи умирают между скрейпами и метрики теряются. Для них есть Pushgateway — буфер, куда job толкает метрики перед смертью.",
  "d": "Pull даёт «health as a side effect»: если scrape не прошёл — таргет down, алерт сам собой. Service discovery (k8s, Consul) даёт Prometheus актуальный список подов. Pushgateway — исключение, не правило: его НЕ используют для долгоживущих сервисов (метрики там «залипают» и не отражают, что job уже умер). Для них только pull со /metrics.",
  "code": "scrape_configs:\n  - job_name: 'orders-service'\n    metrics_path: /q/metrics   # Quarkus Micrometer\n    kubernetes_sd_configs:\n      - role: pod              # авто-обнаружение подов\n    scrape_interval: 15s"
 },
 {
  "id": "g-ops-structured-logs",
  "t": "DevOps",
  "s": "log-aggregation",
  "q": "Почему в проде логи пишут JSON-строками с trace_id, а не «красивым» многострочным текстом со стектрейсом?",
  "a": "В ELK/Loki логи всех подов сливаются в один поток. Многострочный человекочитаемый лог рвётся на куски (каждая строка стектрейса = отдельная запись), теряется контекст, по нему нельзя фильтровать. Структурный JSON-лог = одна запись с полями (level, trace_id, order_id) — Elasticsearch индексирует и ищет по полю, а trace_id сшивает запрос через все сервисы.",
  "d": "Ключи: (1) одно событие = одна JSON-строка (multiline стектрейс склеивают в поле message); (2) trace_id из MDC связывает логи одного запроса в разных сервисах с трейсами; (3) уровни и поля вместо парсинга текста регэкспами. stdout/stderr — единственный «транспорт» (12-factor), агент (Filebeat/Fluentd) собирает их сам. Не пиши секреты/PII в лог.",
  "code": "// MDC проставляет trace_id во все логи запроса\nMDC.put(\"trace_id\", traceId);\nlog.info(\"order created\");  // logback JSON encoder ->\n// {\"ts\":\"...\",\"level\":\"INFO\",\"trace_id\":\"a1b2\",\n//  \"order_id\":42,\"msg\":\"order created\"}"
 },
 {
  "id": "g-ops-gradle-vs-maven-incremental",
  "t": "DevOps",
  "s": "gradle-maven",
  "q": "За счёт чего Gradle обычно быстрее Maven на повторных билдах, и в чём за это платят?",
  "a": "Gradle держит incremental build + build cache + демон в памяти: пересобирает только изменившиеся таски и переиспользует выходы (даже между ветками/машинами). Maven по умолчанию гоняет фазы линейно каждый раз. Цена Gradle: билд — это императивный Groovy/Kotlin-скрипт (гибко, но сложнее, «магия»), у Maven — декларативный жёсткий XML-lifecycle (предсказуемо, скучно, легко читать).",
  "d": "Tradeoff для команды с junior'ами: Maven выигрывает прозрачностью — фазы фиксированы, pom декларативен, меньше способов выстрелить в ногу. Gradle выигрывает скоростью на больших мульти-модульных проектах и гибкостью кастомных тасок. Выбор по контексту: не «Gradle новее = лучше», а что важнее — скорость/гибкость или предсказуемость/низкий порог входа.",
  "code": "// Gradle: incremental + кэш тасок\ntasks.compileJava {\n    options.incremental = true\n}\n// build cache переиспользует output между билдами\n// org.gradle.caching=true в gradle.properties"
 },
 {
  "id": "g-arch-bounded-context",
  "t": "Архитектура",
  "s": "DDD/bounded-context",
  "q": "Bounded Context в DDD — что это и зачем граница?",
  "a": "Граница, внутри которой термин значит ОДНО. «Клиент» в биллинге и в поддержке — разные модели. Внутри контекста — своя единая модель и язык (ubiquitous language). Снаружи — переводишь через контракты. Не делишь по таблицам — делишь по смыслу.",
  "d": "Bounded Context часто = граница микросервиса/модуля. Context Map показывает связи между ними: Shared Kernel, Customer/Supplier, Conformist, Anti-Corruption Layer, Published Language. Главная ошибка — одна анемичная God-модель «Клиент» на всю компанию: она тащит конфликтующие требования и ломается при любом изменении.",
  "code": "// Биллинг: Customer = плательщик\nclass Customer { CustomerId id; BillingAddress addr; Money balance; }\n\n// Поддержка: Customer = обращающийся\nclass Customer { CustomerId id; String email; List<Ticket> tickets; }\n// Один id — две независимые модели в двух контекстах"
 },
 {
  "id": "g-arch-aggregate",
  "t": "Архитектура",
  "s": "DDD/aggregate",
  "q": "Aggregate и Aggregate Root — зачем и какие правила?",
  "a": "Aggregate — кластер объектов, который меняется как одно целое и держит инварианты. Снаружи трогаешь только корень (Root) по id. Транзакция = один агрегат. Между агрегатами ссылаешься по id, а не объектом, и связь — через eventual consistency.",
  "d": "Правила Вернона: 1) защищай настоящие инварианты в границе; 2) делай агрегаты маленькими; 3) ссылайся на другие агрегаты по identity; 4) обновляй другие агрегаты асинхронно (события). Большой агрегат = блокировки и конфликты optimistic lock. Пример инварианта: сумма позиций заказа = total заказа.",
  "code": "class Order { // Aggregate Root\n private final List<OrderLine> lines;\n void addLine(ProductId p, int qty) {\n if (status != DRAFT) throw new IllegalState();\n lines.add(new OrderLine(p, qty)); // инвариант внутри границы\n }\n // ссылка на Customer — по id, не объектом:\n private final CustomerId customerId;\n}"
 },
 {
  "id": "g-arch-value-object",
  "t": "Архитектура",
  "s": "DDD/value-object",
  "q": "Value Object vs Entity — в чём разница и зачем VO?",
  "a": "Entity имеет identity (id), живёт во времени, два с равными полями — разные. Value Object не имеет id, равенство — по значению, неизменяемый (immutable). Money(100,KZT) == Money(100,KZT). VO ловит правила прямо в типе: нет «голого» BigDecimal без валюты.",
  "d": "VO даёт: самовалидацию в конструкторе, отсутствие багов с мутацией (можно шарить), осмысленные equals/hashCode, борьбу с Primitive Obsession. В Java 17+ — record идеален для VO. Замена email:String на Email-VO убирает класс багов «невалидный email просочился в домен».",
  "code": "record Money(BigDecimal amount, Currency ccy) {\n Money { // compact ctor — валидация\n if (amount.signum() < 0) throw new IllegalArgumentException();\n }\n Money plus(Money o) {\n if (!ccy.equals(o.ccy)) throw new IllegalArgumentException();\n return new Money(amount.add(o.amount), ccy);\n }\n}"
 },
 {
  "id": "g-arch-domain-event",
  "t": "Архитектура",
  "s": "DDD/domain-event",
  "q": "Domain Event — что это и чем отличается от integration event?",
  "a": "Domain Event — факт «что-то значимое случилось в домене» в прошедшем времени: OrderPlaced, PaymentReceived. Внутри сервиса — синхронные обработчики. Integration Event — то же наружу для других сервисов, через брокер. Не путай команду (просьба) и событие (свершившийся факт).",
  "d": "Domain event живёт внутри bounded context, часто публикуется после коммита транзакции агрегата (или через outbox). Integration event — публичный контракт, версионируется, не должен тащить внутреннюю модель. Типичная ошибка — слать наружу domain event с внутренними полями, привязывая чужие сервисы к своей схеме.",
  "code": "// прошедшее время — факт\nrecord OrderPlaced(OrderId id, CustomerId c, Money total, Instant at) {}\n\norder.place();\nevents.raise(new OrderPlaced(order.id(), ...)); // внутри\n// после коммита → mapper → publicEvent на Kafka (integration)"
 },
 {
  "id": "g-arch-cqrs-readmodel",
  "t": "Архитектура",
  "s": "CQRS/read-model",
  "q": "CQRS read-model — зачем отдельная модель для чтения?",
  "a": "Запись и чтение имеют разные потребности: запись хранит инварианты (нормализовано), чтение хочет быстро отдать готовый экран (денормализовано). CQRS разделяет: write-модель (агрегаты) и read-модель (плоские проекции под запросы), обновляемые из событий.",
  "d": "Read-model — это проекция, заточенная под конкретный экран/отчёт: никаких JOIN на 5 таблиц в рантайме. Платишь eventual consistency (проекция отстаёт на доли секунды). Не вводи CQRS везде — это сложность; бери там, где модели чтения и записи реально расходятся или чтений сильно больше.",
  "code": "@KafkaListener\nvoid on(OrderPlaced e) {\n // обновляем плоскую проекцию под список заказов\n jdbc.update(\"\"\"\n INSERT INTO order_summary(id, customer_name, total, status)\n VALUES (?,?,?, 'PLACED')\n ON CONFLICT (id) DO UPDATE SET status='PLACED'\"\"\",\n e.id(), nameOf(e.c()), e.total());\n}"
 },
 {
  "id": "g-arch-idempotent-consumer",
  "t": "Архитектура",
  "s": "messaging/idempotency",
  "q": "Idempotent consumer — зачем и как сделать?",
  "a": "Брокеры дают at-least-once: одно сообщение может прийти дважды (ретрай, ребаланс). Consumer должен дать тот же результат при повторе. Решение: храни обработанные messageId в таблице и проверяй перед обработкой в одной транзакции с бизнес-логикой.",
  "d": "Варианты: 1) inbox-таблица (processed_messages с PK = messageId) — атомарно «отметил + сделал»; 2) естественная идемпотентность (UPSERT по бизнес-ключу); 3) условный апдейт (WHERE status='NEW'). Просто «проверить потом записать» без транзакции/PK — гонка. Дедуп по messageId надёжнее, чем по содержимому.",
  "code": "@Transactional\nvoid handle(Message m) {\n int ins = jdbc.update(\n \"INSERT INTO inbox(msg_id) VALUES(?) ON CONFLICT DO NOTHING\",\n m.id());\n if (ins == 0) return; // уже обработано — выходим\n process(m); // бизнес-логика в той же транзакции\n}"
 },
 {
  "id": "g-arch-outbox-vs-cdc",
  "t": "Архитектура",
  "s": "integration/outbox-cdc",
  "q": "Transactional Outbox vs CDC — как надёжно слать события?",
  "a": "Проблема dual-write: записать в БД И отправить в Kafka атомарно нельзя. Outbox: пишешь событие в таблицу outbox в той же транзакции, отдельный процесс читает её и шлёт в брокер. CDC (Debezium) читает WAL/binlog БД и сам публикует изменения — без таблицы outbox.",
  "d": "Outbox: явный контроль над тем, ЧТО и в каком формате публикуется; нужен relay/poller. CDC: ноль кода в приложении, но публикует структуру таблиц (надо мапить в события, схема течёт наружу). Часто комбо: пишем в outbox-таблицу, а CDC её стримит (Outbox+Debezium) — лучшее из двух.",
  "code": "@Transactional\nvoid placeOrder(Order o) {\n orderRepo.save(o); // 1) бизнес-данные\n outbox.insert( // 2) событие — ТА ЖЕ транзакция\n new OutboxRow(uuid(), \"OrderPlaced\", toJson(o)));\n} // commit атомарен; relay/CDC отправит позже"
 },
 {
  "id": "g-arch-acl",
  "t": "Архитектура",
  "s": "integration/anti-corruption",
  "q": "Anti-Corruption Layer (ACL) — зачем слой-переводчик?",
  "a": "ACL — прослойка, которая переводит чужую/легаси модель в твою, чтобы их понятия не «протекли» в твой домен. Все вызовы к легаси идут через адаптер-транслятор. Твоя модель остаётся чистой; меняется внешний API — правишь только ACL.",
  "d": "Без ACL чужие DTO, кривые enum и баги расползаются по коду. ACL = адаптер + маппер + (опц.) фасад. Классика при Strangler Fig: новый сервис общается с легаси только через ACL. На практике это порты вроде TaxReportPort/OrderDataPort — порт + адаптер, прячущий JDBC/legacy SP.",
  "code": "interface OrderDataPort { OrderInfo byId(OrderId id); } // ТВОЯ модель\n\nclass LegacyOrderAdapter implements OrderDataPort { // ACL\n public OrderInfo byId(OrderId id) {\n var raw = legacyJdbc.query(...); // чужая схема\n return new OrderInfo(map(raw.STAT), money(raw.AMT)); // перевод\n }\n}"
 },
 {
  "id": "g-arch-strangler",
  "t": "Архитектура",
  "s": "migration/strangler",
  "q": "Strangler Fig — как безопасно заменить легаси?",
  "a": "Не переписывать всё разом (big-bang рискован), а постепенно: ставишь фасад/роутер перед легаси и по кускам выносишь функции в новый сервис, перенаправляя на него трафик. Легаси «удушается» по частям, пока не останется ничего, и тогда его удаляешь.",
  "d": "Шаги: 1) фасад перед легаси; 2) выносим один кусок функциональности в новое; 3) роутим этот путь на новое, остальное — на старое; 4) повторяем; 5) гасим легаси. Нужны: ACL к старой БД, фиче-флаги/роутинг, параллельный прогон (shadow) для сверки. Типичный переезд: легаси печатных форм на print-service → document-service.",
  "code": "// роутер/фасад решает, кто обработает\nif (featureFlags.on(\"newPrintforms\", clientId)) {\n return investmentDocService.generate(req); // новое\n} else {\n return legacyPrintforms.generate(req); // старое\n}"
 },
 {
  "id": "g-arch-multitenancy",
  "t": "Архитектура",
  "s": "multi-tenancy",
  "q": "Мульти-тенантность — какие модели изоляции данных?",
  "a": "Один инстанс обслуживает много клиентов (тенантов). Три модели: 1) общая БД, общая схема + tenant_id в каждой строке (дёшево, но риск утечки); 2) схема на тенанта; 3) БД на тенанта (макс. изоляция, дорого). Выбор — баланс цены, изоляции и числа тенантов.",
  "d": "Shared schema: обязателен tenant_id во ВСЕХ запросах — иначе утечка чужих данных; помогает Postgres RLS (Row-Level Security). Schema-per-tenant: чище, но миграции на сотнях схем больно. DB-per-tenant: для регуляторики/крупных клиентов. Главная гоча — забыть фильтр tenant_id хоть в одном запросе.",
  "code": "-- Postgres RLS защищает от забытого фильтра\nALTER TABLE orders ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_iso ON orders\n USING (tenant_id = current_setting('app.tenant')::uuid);\n-- приложение перед запросами: SET app.tenant = '...';"
 },
 {
  "id": "web-http-anatomy",
  "t": "Web",
  "s": "http",
  "q": "Из чего состоит HTTP-запрос и ответ?",
  "a": "HTTP-запрос: первая строка (МЕТОД + путь + версия), потом заголовки, пустая строка и тело. Ответ: строка статуса (код + текст), заголовки, тело. Сервер тупой — каждый запрос с нуля, прошлое не помнит. Чтобы узнал тебя — шлёшь куки/токен.",
  "d": "Версии: HTTP/1.1 — текст, одно соединение последовательно; HTTP/2 — бинарные фреймы и мультиплексирование (много запросов в одном соединении); HTTP/3 — поверх QUIC/UDP. Идемпотентность: GET/PUT/DELETE можно повторять без побочных эффектов, POST — нет. Куки — это просто заголовок `Cookie:`, который браузер сам прикладывает к каждому запросу на тот же домен; сервер задаёт их через `Set-Cookie`.",
  "code": "--- Запрос ---\nPOST /login HTTP/1.1     ← метод + путь + версия\nHost: api.acme.com        ← заголовки\nContent-Type: application/json\n                         ← пустая строка\n{\"user\":\"ali\"}          ← тело\n\n--- Ответ ---\nHTTP/1.1 200 OK          ← версия + код + причина\nSet-Cookie: sid=abc123   ← заголовки\nContent-Type: application/json\n\n{\"ok\":true}              ← тело"
 },
 {
  "id": "web-https-what",
  "t": "Web",
  "s": "http",
  "q": "Что именно даёт HTTPS (а не просто «замочек»)?",
  "a": "HTTPS — это HTTP в бронированном конверте. Даёт три вещи: 1) шифрует (никто не подсмотрит), 2) защищает от подмены по пути, 3) доказывает, что сервер настоящий (по сертификату). Без HTTPS твой пароль летит открытым текстом — любой по дороге его прочитает.",
  "d": "TLS-рукопожатие: клиент и сервер согласуют версию и шифрсьюты, сервер присылает сертификат (цепочку до корневого CA), стороны через асимметрию (RSA/ECDHE) договариваются об общем сеансовом ключе, дальше весь трафик шифруется быстрым симметричным шифром (AES/ChaCha20). Целостность каждого сообщения проверяется через AEAD/MAC. Сертификат браузер проверяет по списку доверенных корневых CA в ОС/браузере и по сроку/домену.",
  "code": "$ curl -v https://example.com\n* SSL connection using TLSv1.3 / AES_256_GCM\n* Server certificate:\n*  subject: CN=example.com\n*  issuer: C=US, O=DigiCert Inc   # подписал доверенный CA\n*  SSL certificate verify ok."
 },
 {
  "id": "web-soap",
  "t": "Web",
  "s": "protocols",
  "q": "SOAP — что это и почему «тяжёлый»?",
  "a": "SOAP — это строгий способ обмена сообщениями. Каждое сообщение кладут в XML-конверт: сверху служебная подпись (header), внутри сами данные (body). Договор о полях жёстко описан в WSDL. «Тяжёлый», потому что много XML-обёртки и правил.",
  "d": "SOAP ≠ HTTP-only: транспорт может быть HTTP, JMS, SMTP — конверт один и тот же. WSDL генерирует клиентские заглушки (codegen), поэтому строгая типизация «из коробки», но любое изменение схемы ломает контракт. WS-Security даёт безопасность на уровне самого сообщения (подпись/шифрование части body), а не только канала (в отличие от TLS), что важно при прохождении через посредников. Стиль кодирования: document/literal (сейчас стандарт) vs rpc/encoded (устаревший).",
  "code": "<?xml version=\"1.0\"?>\n<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Header>\n    <!-- WS-Security, маршрутизация и т.п. -->\n  </soap:Header>\n  <soap:Body>\n    <GetBalance>\n      <account>KZ123</account>\n    </GetBalance>\n  </soap:Body>\n</soap:Envelope>"
 },
 {
  "id": "web-grpc",
  "t": "Web",
  "s": "protocols",
  "q": "gRPC — как устроен и когда брать?",
  "a": "Ишак, gRPC — это звонок чужой программе как своей функции. Описываешь в .proto «какие методы и поля», генератор сам пишет клиент и сервер. Данные летят сжатым бинарём по HTTP/2 — быстро. Берут для связи СЕРВИСОВ, не для браузера напрямую.",
  "d": "protobuf кодирует поля по их номеру (tag), а не по имени — поэтому номера в .proto менять нельзя, это и даёт обратную совместимость: старый код просто игнорирует незнакомые поля. HTTP/2 даёт мультиплексирование (нет head-of-line блокировки на уровне запросов) и серверный push потоков. Сравнение с альтернативами: REST/JSON — человекочитаемый, дружит с браузером и кэшами, но медленнее и без строгого контракта; GraphQL — гибкая выборка полей для фронта; gRPC — скорость и строгий контракт для внутренней связи сервисов.",
  "code": "// greeter.proto\nsyntax = \"proto3\";\n\nmessage HelloReq  { string name = 1; }\nmessage HelloResp { string text = 1; }\n\nservice Greeter {\n  rpc SayHello (HelloReq) returns (HelloResp);              // unary\n  rpc Updates  (HelloReq) returns (stream HelloResp);       // server-streaming\n}\n// protoc генерит клиент+сервер; вызов: stub.sayHello(req)"
 },
 {
  "id": "web-websocket-proto",
  "t": "Web",
  "s": "protocols",
  "q": "WebSocket под капотом — как работает?",
  "a": "Сначала клиент звонит как обычный HTTP и говорит: «Давай перейдём на WebSocket». Сервер: «Ок!». И всё — теперь у них открытая труба. Оба могут орать в неё в любой момент, не дожидаясь очереди. Не надо каждый раз заново стучаться.",
  "d": "Фрейм WebSocket — не «голый» текст: есть opcode (text/binary/ping/pong/close), маскирование данных от клиента (защита от кэш-отравления прокси) и длина. Поверх можно строить под-протоколы (STOMP, GraphQL-WS). При обрыве TCP соединение надо переустанавливать с нуля — авто-reconnect пишут руками или берут библиотеку (Socket.IO).",
  "code": "// Браузер\nconst ws = new WebSocket(\"wss://chat.app/room\");\nws.onopen  = () => ws.send(\"привет\");      // шлём когда хотим\nws.onmessage = e => console.log(e.data);   // ловим в любой момент\n// Под капотом первый запрос:\n// GET /room HTTP/1.1\n// Upgrade: websocket\n// Connection: Upgrade\n// → 101 Switching Protocols"
 },
 {
  "id": "web-webhook",
  "t": "Web",
  "s": "rest",
  "q": "Вебхук — что это и зачем?",
  "a": "Ишак ждёт письма? Не бегай к ящику каждую минуту (polling). Дай адрес — почтальон сам прибежит и постучит (webhook), когда письмо пришло. Сервер сам шлёт тебе POST, ты не опрашиваешь.",
  "d": "Принимающий эндпоинт должен отвечать 2xx максимально быстро (тяжёлую работу — в очередь/фон), иначе провайдер посчитает доставку неудачной и начнёт ретраить. Хранят обработанные event-id (дедупликация). Подпись обычно HMAC-SHA256 от тела запроса с общим секретом — сравнивать constant-time. Для локальной разработки нужен публичный URL (ngrok/туннель).",
  "code": "// Приёмник вебхука (псевдо-Java)\n@POST @Path(\"/webhook\")\nResponse receive(@HeaderParam(\"X-Signature\") String sig, String body) {\n  if (!hmacSha256(secret, body).equals(sig)) return Response.status(401).build();\n  String id = parse(body).eventId();\n  if (seen.contains(id)) return Response.ok().build(); // идемпотентность\n  seen.add(id);\n  enqueue(body);            // тяжёлое — в фон\n  return Response.ok().build(); // быстрый 200, иначе ретрай\n}"
 },
 {
  "id": "web-graphql-deep",
  "t": "Web",
  "s": "rest",
  "q": "GraphQL — плюсы и подводные камни?",
  "a": "Один URL вместо кучи ручек. В запросе сам пишешь, какие поля нужны — сервер вернёт ровно их, за один поход. Минус: кэшировать и ограничивать тяжело, и легко словить лишние походы в БД.",
  "d": "REST: ресурс = URL, форму ответа диктует сервер, кэш и rate-limit из коробки по URL/методу. GraphQL: форму диктует клиент через схему с типами, поэтому контроль смещается в query-валидацию: ограничение глубины/сложности запроса, persisted queries (заранее одобренные запросы по хешу — заодно чинят кэш и режут атаки). DataLoader группирует обращения внутри одного тика event loop в один батч-запрос, устраняя N+1.",
  "code": "query {\n  user(id: \"1\") {     # одна ходка\n    name              # клиент сам\n    orders { id sum } # выбирает поля\n  }\n}\n# сервер вернёт JSON ровно такой формы"
 },
 {
  "id": "web-rest-maturity",
  "t": "Web",
  "s": "rest",
  "q": "Уровни зрелости REST (модель Ричардсона)?",
  "a": "Лестница «настоящести» REST в 4 ступени: L0 — всё в одну дырку (RPC); L1 — у каждой штуки свой адрес; L2 — пользуемся глаголами HTTP (GET/POST) и кодами (200/404); L3 — в ответе сами лежат ссылки «куда дальше». Большинство API живут на L2, до L3 доходят редко.",
  "d": "Модель предложил Леонард Ричардсон (2008), популяризировал Мартин Фаулер. Сам Рой Филдинг (автор диссертации о REST) считал HATEOAS обязательным признаком REST — без него API формально «не REST». На L3 форматы гипермедиа: HAL, JSON:API, Siren. На практике L3 оправдан там, где клиентов много и они должны слабо зависеть от хардкода URL (публичные платформенные API), но для внутренних микросервисов это обычно избыточно — поэтому индустрия в основном стоит на L2.",
  "code": "// L0 — туннель (RPC):\nPOST /api      { \"action\": \"getOrder\", \"id\": 42 }\n\n// L2 — глаголы + коды:\nGET  /orders/42        -> 200 { \"id\": 42, \"status\": \"PAID\" }\nDELETE /orders/42      -> 204\n\n// L3 — HATEOAS (ссылки в ответе):\nGET /orders/42 -> 200 {\n  \"id\": 42, \"status\": \"PAID\",\n  \"_links\": {\n    \"self\":   { \"href\": \"/orders/42\" },\n    \"cancel\": { \"href\": \"/orders/42/cancel\" }\n  }\n}"
 },
 {
  "id": "web-openapi",
  "t": "Web",
  "s": "rest",
  "q": "OpenAPI / Swagger — зачем?",
  "a": "OpenAPI — это «техпаспорт» твоего REST API в YAML/JSON: какие есть ручки, что им слать, что вернётся. По нему машина сама делает доку (Swagger UI), клиентов и заглушки. Не надо объяснять руками — все читают один файл и не спорят.",
  "d": "OpenAPI 3.x — это сама спецификация формата; Swagger — набор инструментов вокруг неё (Swagger UI, Codegen, Editor). `$ref` позволяет переиспользовать схемы и не дублировать. В contract-first спеку держат в репозитории как источник истины и валидируют контракт-тестами (например, через Schemathesis / Spectral в CI), чтобы бэкенд не «уехал» от договора.",
  "code": "openapi: 3.0.3\ninfo: { title: Orders API, version: 1.0.0 }\npaths:\n  /orders/{id}:\n    get:\n      parameters:\n        - { name: id, in: path, required: true, schema: { type: integer } }\n      responses:\n        '200':\n          description: OK\n          content:\n            application/json:\n              schema: { $ref: '#/components/schemas/Order' }\n        '404': { description: Not found }\ncomponents:\n  schemas:\n    Order:\n      type: object\n      properties:\n        id: { type: integer }\n        status: { type: string, enum: [NEW, PAID] }"
 },
 {
  "id": "web-oauth-tokens",
  "t": "Web",
  "s": "auth",
  "q": "OAuth2: роли и виды токенов?",
  "a": "Юзер — хозяин данных. Приложение (client) просит доступ. Сервер авторизации даёт ему \"пропуск\" (access token). С пропуском приложение идёт в API (resource server) и берёт данные. Refresh-токен — обновить пропуск без перелогина. ID-токен — кто ты (OIDC). Scope — что можно трогать.",
  "d": "Access-токен часто JWT (самодостаточный, API проверяет подпись локально) или opaque (API спрашивает auth server через introspection). ID-токен — всегда JWT с claims (sub, email, exp). Поток для веб-приложений сегодня — Authorization Code + PKCE: client получает короткий code, обменивает его на токены на бэкенде; PKCE защищает от перехвата code. Implicit flow устарел.",
  "code": "// access-токен в запросе к API\nGET /api/profile\nAuthorization: Bearer eyJhbGci...   // access, не id!\n\n// обновить протухший access\nPOST /oauth/token\ngrant_type=refresh_token&refresh_token=def456...\nscope=profile.read   // ограничивает права"
 },
 {
  "id": "web-oidc-keycloak",
  "t": "Web",
  "s": "auth",
  "q": "OIDC и Keycloak — что это и связь с OAuth2?",
  "a": "OAuth2 решает «что тебе можно» (доступ к API). OIDC сверху добавляет «а кто ты вообще» — выдаёт id_token (JWT с инфой о юзере). Keycloak — это готовая будка с вахтёром: логинит людей, держит SSO и соц-вход, раздаёт токены. Твой сервис не проверяет пароли — он только смотрит подпись токена: настоящий или нет.",
  "d": "Под капотом чаще всего Authorization Code Flow + PKCE: браузер идёт в Keycloak (`/auth`), юзер логинится, обратно прилетает короткий code, бэкенд меняет его на токены (`/token`). Endpoint'ы IdP описаны в discovery-документе `/.well-known/openid-configuration`, а публичные ключи для проверки подписи JWT — в JWKS. Quarkus-сервису достаточно указать `quarkus.oidc.auth-server-url` и `audience` — он сам подтянет ключи и проверит токен; ручная криптография не нужна.",
  "code": "# application.properties (Quarkus resource server)\nquarkus.oidc.auth-server-url=https://auth.example.com/realms/invest\nquarkus.oidc.client-id=orders-service\nquarkus.oidc.token.audience=orders-service\n# сервис сам берёт JWKS и проверяет подпись/exp/iss/aud\n# в коде:\n@RolesAllowed(\"trader\")\n@GET @Path(\"/orders\")\npublic List<Order> my(@Context SecurityContext ctx){ ... }"
 },
 {
  "id": "web-mtls",
  "t": "Web",
  "s": "auth",
  "q": "mTLS (взаимный TLS) — для чего?",
  "a": "Обычный TLS: «покажи паспорт» просит только сервер. mTLS: паспорт показывают ОБА — и сервер, и клиент. Каждый проверяет другого по сертификату. Сервисы доверяют друг другу по сертификатам, а не по паролям/токенам.",
  "d": "mTLS даёт только аутентификацию (кто ты) + шифрование канала, но НЕ авторизацию (что тебе можно) — её решают политики поверх (например AuthorizationPolicy в Istio). В service mesh mTLS обычно прозрачен: его делают sidecar-прокси (Envoy), сам код сервиса о нём не знает. Идентичность сервиса часто зашита в сертификат как SPIFFE-ID (spiffe://домен/ns/.../sa/...).",
  "code": "# nginx: требовать клиентский сертификат\nssl_client_certificate /etc/ssl/ca.crt;  # CA, которым доверяем\nssl_verify_client on;                     # клиент ОБЯЗАН показать серт\n\n# curl-клиент предъявляет свой серт + ключ\ncurl --cert client.crt --key client.key \\\n     --cacert ca.crt https://api.internal"
 },
 {
  "id": "web-saml-oidc",
  "t": "Web",
  "s": "auth",
  "q": "SAML vs OIDC — в чём разница?",
  "a": "Оба — для единого входа (SSO). SAML — старый «энтерпрайз» язык: XML + редиректы в браузере. OIDC — современный, лёгкий: JSON/JWT, удобен для сайтов, мобилок, API. Новое строй на OIDC, SAML встречаешь в старых корп-системах.",
  "d": "SAML несёт identity внутри подписанного XML (assertion), отправляемого обычно через POST-binding на ACS-эндпоинт приложения. OIDC разделяет: ID Token (JWT, для аутентификации) и Access Token (для доступа к API), плюс UserInfo endpoint. OIDC переиспользует инфраструктуру OAuth2 (scopes, refresh tokens), поэтому удобен там, где нужен и вход, и доступ к ресурсам. Мост между мирами часто строят через Keycloak: SAML/OIDC IdP с трансляцией протоколов.",
  "code": "// OIDC: ID Token — это JWT (JSON внутри)\n{\n  \"iss\": \"https://idp.example.com\",  // кто выдал\n  \"sub\": \"user-42\",                  // кто ты\n  \"aud\": \"my-app\",                   // кому\n  \"exp\": 1718800000                  // когда протухнет\n}\n\n<!-- SAML: то же, но XML-ассершн -->\n<saml:Assertion>\n  <saml:Subject>user-42</saml:Subject>\n</saml:Assertion>"
 },
 {
  "id": "ws-camunda",
  "t": "Distributed",
  "s": "workflow",
  "q": "Camunda — что это и зачем?",
  "a": "**Camunda** — это движок бизнес-процессов (workflow engine). Ты описываешь процесс в нотации **BPMN** — рисуешь задачи, шлюзы (условия), события — а движок исполняет эту схему шаг за шагом: вызывает сервисы, ждёт ответы, ветвится по условиям, хранит текущее состояние каждого процесса. Главная ценность: бизнес-логика становится видимой диаграммой, а не размазана по коду, и ты всегда знаешь, на каком шаге застрял конкретный экземпляр.",
  "d": "Camunda не заменяет твой код — она его оркеструет. Бизнес-логика шага живёт в сервисе/воркере, а движок отвечает за порядок шагов, состояние и надёжность (retry, история, ожидание событий)."
 },
 {
  "id": "ws-zeebe",
  "t": "Distributed",
  "s": "workflow",
  "q": "Zeebe — чем отличается от Camunda 7?",
  "a": "**Zeebe** — это движок процессов в основе **Camunda 8**, спроектированный для микросервисов и облака. Ключевое отличие от **Camunda 7**: Zeebe не хранит состояние в общей реляционной БД. Он использует собственный распределённый event-log (как Kafka внутри) и партиционирование, поэтому масштабируется горизонтально — добавил ноды, вырос throughput. Camunda 7 — встраиваемая библиотека: запускается внутри твоего Java-приложения и пишет состояние в одну SQL-базу, которая становится узким местом под нагрузкой.\n\nВторое отличие — модель работы с воркерами. В Zeebe задачи раздаются по **PULL**: job-воркеры сами опрашивают брокер и забирают работу, когда готовы. В Camunda 7 логика чаще исполняется внутри того же процесса (PUSH/встроенные делегаты). PULL даёт развязку сервисов, backpressure и устойчивость.",
  "d": "**Job-воркер (PULL)** — внешний сервис, который сам опрашивает брокер Zeebe и забирает задачу, когда готов её обработать, а не получает её принудительно (PUSH). Даёт развязку и backpressure."
 },
 {
  "id": "ws-bpmn",
  "t": "Distributed",
  "s": "workflow",
  "q": "BPMN — что за нотация?",
  "a": "BPMN (Business Process Model and Notation) — это стандарт графического описания бизнес-процессов. Процесс рисуется диаграммой из понятных фигур: задачи (прямоугольники), шлюзы (ромбы — ветвление и слияние по условию), события (круги — старт, таймер, сообщение, ошибка), а стрелки задают порядок шагов. Главная идея: одна диаграмма понятна и бизнесу, и разработчику. А движок (Camunda, Zeebe) не просто рисует, а ИСПОЛНЯЕТ эту диаграмму как код процесса.",
  "d": "Не путай BPMN с UML или с блок-схемой. UML описывает структуру и поведение ПО (классы, последовательности), а BPMN — именно бизнес-процесс end-to-end. От обычной блок-схемы BPMN отличается тем, что он стандартизирован (ISO 19510) и, главное, исполняем движком, а не просто картинка для презентации.",
  "code": "&lt;!-- Фрагмент .bpmn (XML), который движок ИСПОЛНЯЕТ --&gt;\n&lt;bpmn:process id=\"orderFlow\" isExecutable=\"true\"&gt;\n  &lt;bpmn:startEvent id=\"start\"/&gt;\n  &lt;bpmn:serviceTask id=\"createOrder\" name=\"Создать ордер\"/&gt;\n  &lt;bpmn:exclusiveGateway id=\"check\" name=\"Сумма &gt; лимит?\"/&gt;\n  &lt;bpmn:userTask id=\"approve\" name=\"Одобрить вручную\"/&gt;\n  &lt;bpmn:serviceTask id=\"genPdf\"  name=\"Сгенерировать PDF\"/&gt;\n  &lt;bpmn:endEvent id=\"done\"/&gt;\n&lt;/bpmn:process&gt;\n&lt;!-- ромб check решает: большая сумма -&gt; approve, иначе сразу -&gt; genPdf --&gt;"
 },
 {
  "id": "ws-job-worker",
  "t": "Distributed",
  "s": "workflow",
  "q": "Job worker / external task — как сервис участвует в процессе?",
  "a": "Сервис **сам подхватывает** задачу из движка процесса (pull/poll), а не движок дёргает сервис. Воркер берёт job → выполняет бизнес-логику → репортит результат и переменные обратно в движок. Так бизнес-логика живёт в сервисах, а оркестрация шагов — в движке (Zeebe/Camunda). Если воркер упал, не завершив задачу, она по таймауту вернётся в пул и её подхватит другой воркер.",
  "d": "Push (движок → HTTP сервиса): связность выше, движок отвечает за доступность и ретраи сервиса, легко завалить перегруженный сервис. Pull (воркер сам опрашивает): развязка, backpressure из коробки, простое горизонтальное масштабирование. Цена pull — нужна идемпотентность (job может прийти дважды после падения) и аккуратные lock-таймауты.",
  "code": "// Zeebe job worker: подхватил → сделал → отчитался\n@JobWorker(type = \"generate-pdf\")\npublic void handle(JobClient client, ActivatedJob job) {\n    var orderId = (String) job.getVariablesAsMap().get(\"orderId\");\n\n    // бизнес-логика живёт здесь, в сервисе\n    String docUrl = pdfService.generate(orderId); // должна быть идемпотентной\n\n    // репортим результат + переменные обратно в движок\n    client.newCompleteCommand(job.getKey())\n          .variables(Map.of(\"documentUrl\", docUrl))\n          .send().join();\n    // упали до complete? lock истечёт → job заберёт другой воркер\n}"
 },
 {
  "id": "web-grpc-vs-rest",
  "t": "Web",
  "s": "protocols",
  "q": "gRPC vs REST — детальное сравнение?",
  "a": "**gRPC vs REST** — два подхода к API.\n\n**REST** — текст (JSON) поверх **HTTP/1.1**. Человекочитаемо, легко отлаживать через curl/Postman, ответы кэшируются HTTP-механизмами, работает прямо в браузере. Идеален для публичных и браузерных API.\n\n**gRPC** — бинарный формат (**Protobuf**) поверх **HTTP/2**. Строгий контракт в `.proto` + автогенерация кода (кодоген) на 10+ языков, двунаправленный стриминг, мультиплексирование. Заметно быстрее и компактнее по трафику — идеален для ВНУТРЕННЕГО межсервисного общения с высокой нагрузкой.\n\nГлавное ограничение: браузер напрямую gRPC не умеет — нужен прокси-слой **grpc-web**.",
  "d": "**REST** (REpresentational State Transfer) — архитектурный стиль: ресурсы (`/users/42`) + HTTP-методы (GET/POST/PUT/DELETE), обычно JSON. **gRPC** (gRPC Remote Procedure Calls, Google) — RPC-фреймворк: вызываешь удалённый метод как локальную функцию, контракт описан в Protobuf-схеме `.proto`.",
  "code": "// REST — ресурс + HTTP-метод, тело JSON (текст)\nGET /api/users/42  HTTP/1.1\n{ \"id\": 42, \"name\": \"Aibek\", \"balance\": 1500 }\n\n// gRPC — .proto контракт, вызов как функции, тело protobuf (бинарь)\nservice UserService {\n  rpc GetUser (UserRequest) returns (User);        // unary\n  rpc WatchPrices (Symbol) returns (stream Price);  // server-stream\n}\nmessage User { int64 id = 1; string name = 2; }"
 },
 {
  "id": "qk2-buildtime-di",
  "t": "Quarkus",
  "s": "Старт и DI",
  "q": "Почему Quarkus стартует за миллисекунды, а Spring Boot за секунды? Что принципиально другое в DI?",
  "a": "Spring собирает граф бинов в рантайме: на старте сканирует classpath рефлексией, читает аннотации, строит контекст — это и есть основная стоимость старта. Quarkus (движок ARC) делает всю эту работу на этапе СБОРКИ: генерирует готовый байткод проводки бинов. В рантайме почти ничего не сканируется — отсюда мс-старт и меньше RAM (нет метаданных рефлексии в куче).",
  "d": "ARC = Quarkus CDI-контейнер. Он не «находит» бины при запуске, а уже знает их — код их создания сгенерирован заранее.",
  "code": "@ApplicationScoped\npublic class OrderService {\n    @Inject OrderRepository repo; // проводка решена в build-time\n}"
 },
 {
  "id": "qk2-cdi-scopes",
  "t": "Quarkus",
  "s": "Старт и DI",
  "q": "Разница между @ApplicationScoped, @Singleton, @RequestScoped и @Dependent в CDI/Quarkus?",
  "a": "@ApplicationScoped — один экземпляр на приложение, но через ленивый клиентский прокси (создаётся при первом обращении). @Singleton — тоже один на приложение, но БЕЗ прокси, создаётся жадно/напрямую. @RequestScoped — свой экземпляр на каждый HTTP-запрос. @Dependent — без своего скоупа: новый экземпляр на каждую точку инъекции, живёт сколько живёт владелец.",
  "d": "По умолчанию для бина без явного скоупа в CDI берётся @Dependent.",
  "code": "@ApplicationScoped // прокси, ленивый\nclass A {}\n\n@Singleton // без прокси, прямой\nclass B {}\n\n@RequestScoped // на запрос\nclass C {}"
 },
 {
  "id": "qk2-client-proxy",
  "t": "Quarkus",
  "s": "Старт и DI",
  "q": "Что значит «@ApplicationScoped инжектится через клиентский прокси» и зачем он нужен?",
  "a": "При инъекции @ApplicationScoped-бина в поле кладётся не сам объект, а сгенерированный прокси-наследник. Прокси при каждом вызове метода делегирует на реальный контекстуальный экземпляр. Это даёт лень (объект создаётся при первом обращении) и развязывает жизненные циклы: бин с долгим скоупом может держать ссылку на бин с коротким, не «замораживая» устаревший экземпляр.",
  "d": "Поэтому @ApplicationScoped-класс не может быть final и должен иметь конструктор без аргументов (или прокси не сгенерировать).",
  "code": "@ApplicationScoped\npublic class Cache { // ARC генерит Cache_ClientProxy\n    public String get(String k) { ... }\n}\n// @Inject Cache cache; — это прокси"
 },
 {
  "id": "qk2-inject-vs-autowired",
  "t": "Quarkus",
  "s": "Старт и DI",
  "q": "Чем @Inject в Quarkus отличается от @Autowired в Spring? Как ARC резолвит бин на этапе сборки?",
  "a": "@Inject — это стандарт CDI/Jakarta (не самопальная Spring-аннотация @Autowired). Главная разница в МОМЕНТЕ резолва: Spring подбирает кандидата по типу/квалификатору в рантайме рефлексией. ARC делает это на этапе СБОРКИ — анализирует типы и квалификаторы, выбирает единственный подходящий бин и генерирует прямой вызов конструктора/сеттера. Неоднозначность или отсутствие бина — ошибка компиляции, а не рантайма.",
  "d": "Разрешение неоднозначности — через @Named или кастомный квалификатор, как и в CDI; @Primary-аналог в CDI — @io.quarkus.arc.DefaultBean / альтернативы.",
  "code": "@Inject\n@Named(\"primary\")\nDataSource ds; // тип + квалификатор → 1 кандидат в build-time"
 },
 {
  "id": "qk2-extension",
  "t": "Quarkus",
  "s": "Старт и DI",
  "q": "Что такое Quarkus extension и почему его работа разбита на deployment- и runtime-модули?",
  "a": "Extension — это способ интегрировать библиотеку в Quarkus так, чтобы максимум работы ушло в build-time. Он делится на два модуля: deployment (запускается при СБОРКЕ — регистрирует бины, классы для рефлексии, генерирует байткод) и runtime (тонкий код, работающий в проде). Build-processor через @BuildStep производит BuildItem'ы, из которых Quarkus собирает оптимизированное приложение.",
  "d": "Именно deployment-модуль решает за вас рефлексию/проксирование заранее, поэтому рантайм остаётся лёгким и native-friendly.",
  "code": "public class MyProcessor {\n  @BuildStep\n  ReflectiveClassBuildItem reg() {\n    return new ReflectiveClassBuildItem(true,true, MyDto.class);\n  }\n}"
 },
 {
  "id": "qk2-reflection-enemy",
  "t": "Quarkus",
  "s": "Старт и DI",
  "q": "Почему рефлексия — враг быстрого старта и native-image, и как ARC её устраняет?",
  "a": "Рефлексия в рантайме медленна (поиск классов/методов, проверки доступа) и непрозрачна для GraalVM: при сборке native-image статический анализ не видит, что вызовется через рефлексию, и без явной регистрации код просто вырезается (closed-world). ARC устраняет это, заменяя рантайм-рефлексию сгенерированным прямым байткодом проводки бинов — вызовы конструкторов и сеттеров известны статически.",
  "d": "Где рефлексия всё же нужна (Jackson, JPA-сущности), extension'ы регистрируют классы через ReflectiveClassBuildItem на этапе сборки.",
  "code": "// вместо runtime:\n// clazz.getDeclaredConstructor().newInstance()\n// ARC генерит прямой:\nnew OrderService(new OrderRepository());"
 },
 {
  "id": "qk2-jvm-vs-native",
  "t": "Quarkus",
  "s": "Native (GraalVM)",
  "q": "JVM-режим против native-режима в Quarkus — в чём ключевой tradeoff?",
  "a": "Native (GraalVM) даёт мгновенный старт (десятки мс) и низкий RAM, потому что всё уже скомпилировано в машинный код и нет JIT/прогрева. JVM-режим стартует медленнее и ест больше памяти, но JIT со временем разогревается и выдаёт более высокий пиковый throughput на долгой нагрузке. Грубо: native выигрывает по старту и RAM, JVM — по пиковой производительности.",
  "d": "↳ В native нет JIT-оптимизаций по профилю горячего кода, поэтому установившаяся пропускная способность часто ниже, чем у разогретой JVM.",
  "code": "# JVM-режим (обычный)\n./mvnw package\njava -jar target/quarkus-app/quarkus-run.jar\n\n# Native-режим (GraalVM/Mandrel)\n./mvnw package -Dnative\n./target/app-runner"
 },
 {
  "id": "qk2-closed-world",
  "t": "Quarkus",
  "s": "Native (GraalVM)",
  "q": "Что такое closed-world assumption в GraalVM native и почему из-за неё ломается рефлексия?",
  "a": "Closed-world assumption — допущение, что во время AOT-компиляции виден ВЕСЬ код, который вообще может выполниться. Native-image делает статический анализ достижимости и выбрасывает всё, что не вызывается явно. Рефлексия, динамическая загрузка классов и dynamic proxy обращаются к классам по строковым именам в рантайме — анализатор их не видит, считает мёртвыми и вырезает, поэтому в native они падают.",
  "d": "↳ Поэтому в native нет ленивой подгрузки классов «по требованию»: то, чего нет в образе на момент сборки, в рантайме взять неоткуда."
 },
 {
  "id": "qk2-register-for-reflection",
  "t": "Quarkus",
  "s": "Native (GraalVM)",
  "q": "Зачем нужны @RegisterForReflection и reflection-config.json в native-сборке?",
  "a": "Они говорят native-image: «эти классы используются через рефлексию — не вырезай их и сохрани метаданные о полях/методах/конструкторах». Без этого статический анализ посчитает класс недостижимым (или вырежет его члены), и рантайм-рефлексия упадёт с ClassNotFound/NoSuchMethod. `@RegisterForReflection` — аннотация Quarkus, `reflect-config.json` — низкоуровневый файл GraalVM с тем же эффектом.",
  "d": "↳ `@RegisterForReflection(targets = {...})` позволяет зарегистрировать чужие классы (из библиотек), которые ты не можешь аннотировать напрямую.",
  "code": "@RegisterForReflection\npublic class OrderDto {\n  public String id;\n  public BigDecimal amount;\n}\n\n// для чужих классов, без правки их кода:\n@RegisterForReflection(targets = {ThirdPartyDto.class, Foo.class})\npublic class ReflectionConfig {}"
 },
 {
  "id": "qk2-when-not-native",
  "t": "Quarkus",
  "s": "Native (GraalVM)",
  "q": "Когда НЕ стоит брать native и оставить обычный JVM-режим?",
  "a": "Когда сервис долгоживущий и работает под стабильной высокой нагрузкой — там разогретый JIT даёт пиковый throughput выше, чем у native, а медленный старт амортизируется (стартанул раз в неделю — неважно). Также не стоит, если код активно использует рефлексию/динамику, которую дорого закрывать, или если долгая native-сборка ломает CI. Cold start там не важен, а потеря пиковой производительности — важна.",
  "d": "↳ JIT (C2) оптимизирует по реальному профилю: инлайнит горячие методы, спекулятивно девиртуализирует — native такой рантайм-оптимизации лишён."
 },
 {
  "id": "qk2-aot-vs-jit",
  "t": "Quarkus",
  "s": "Native (GraalVM)",
  "q": "AOT-компиляция native-image против JIT — что когда быстрее?",
  "a": "AOT (native-image) компилирует ВСЁ заранее, поэтому код быстр с первой же миллисекунды — выигрывает на старте и на короткой жизни процесса. JIT компилирует лениво в рантайме и сначала интерпретирует/прогревается, зато потом оптимизирует горячий код по реальному профилю и обгоняет AOT на длинной дистанции. Коротко: AOT быстрее в начале, JIT — после прогрева.",
  "d": "↳ JIT может то, чего не может AOT: спекулятивные оптимизации с деоптимизацией, инлайнинг по факту вызовов, профиль-гайдед решения — потому что видит реальное поведение."
 },
 {
  "id": "qk2-uni-vs-multi",
  "t": "Quarkus",
  "s": "Reactive / Mutiny",
  "q": "В Mutiny есть Uni и Multi. В чём разница и когда что брать?",
  "a": "Uni — асинхронный результат, который придёт ровно один раз (0 или 1 элемент) и завершится: ответ из БД, REST-вызов, запись файла. Multi — поток из 0..N элементов во времени: события из Kafka, строки из стрима, server-sent events. Грубо: Uni ≈ async-однократный CompletableFuture, Multi ≈ async-Publisher (поток).",
  "d": "Оба ленивые: пока на них не подписались (subscribe), ничего не выполняется. В Quarkus подписку обычно делает сам фреймворк, когда возвращаешь Uni/Multi из endpoint.",
  "code": "Uni<User> findById(Long id);          // одно значение\nMulti<Trade> streamTrades();           // поток значений\n\n// преобразования\nUni<String> name = findById(1L)\n    .onItem().transform(u -> u.name);"
 },
 {
  "id": "qk2-imperative-vs-reactive",
  "t": "Quarkus",
  "s": "Reactive / Mutiny",
  "q": "RESTEasy Reactive: чем императивный endpoint отличается от реактивного по работе с потоками?",
  "a": "Реактивный endpoint (возвращает Uni/Multi) выполняется прямо на event-loop (I/O) потоке — их всего несколько (≈ по числу ядер). Императивный endpoint (возвращает обычный объект) Quarkus автоматически уводит на worker-пул, чтобы блокирующий код не застопорил event-loop. Реактивный путь даёт максимум throughput при условии, что код нигде не блокирует.",
  "d": "RESTEasy Reactive решает по сигнатуре метода: Uni/Multi → event-loop; обычный тип → worker-thread. Это отличает его от старого RESTEasy Classic.",
  "code": "// реактивный — на event-loop, НЕ блокировать!\n@GET\nUni<User> get(Long id) { return repo.findById(id); }\n\n// императивный — Quarkus сам уведёт на worker-пул\n@GET\nUser get(Long id) { return repo.findByIdBlocking(id); }"
 },
 {
  "id": "qk2-blocking-annotation",
  "t": "Quarkus",
  "s": "Reactive / Mutiny",
  "q": "Зачем нужна @Blocking на реактивном роуте, если метод возвращает Uni/Multi?",
  "a": "Потому что по сигнатуре Uni/Multi Quarkus считает метод неблокирующим и сажает его на event-loop. Если внутри ты делаешь блокирующую операцию (JDBC, легаси-вызов, тяжёлый CPU), @Blocking явно говорит: «уведи меня на worker-пул, не запускай на event-loop». Это спасает event-loop от заморозки.",
  "d": "Обратная аннотация — @NonBlocking: заставить выполнить на event-loop метод, который по типу возврата ушёл бы на worker-пул.",
  "code": "@GET\n@Blocking                       // уведи на worker-пул\nUni<Report> heavy() {\n    var data = legacyJdbcCall(); // блокирующий!\n    return Uni.createFrom().item(data);\n}"
 },
 {
  "id": "qk2-reactive-messaging-kafka",
  "t": "Quarkus",
  "s": "Reactive / Mutiny",
  "q": "Как в Quarkus читать/писать Kafka через SmallRye Reactive Messaging? Что делают @Incoming и @Outgoing?",
  "a": "@Incoming(\"channel\") помечает метод как потребителя сообщений из канала, @Outgoing(\"channel\") — как продюсера. Канал маппится на Kafka-топик в application.properties. Метод с обеими аннотациями — это процессор (читает из одного канала, пишет в другой). Сериализацию, оффсеты и коннект к брокеру SmallRye берёт на себя.",
  "d": "Канал — это абстракция; в конфиге задаёшь connector=smallrye-kafka и topic. Можно работать с payload напрямую или с Message<T> для доступа к метаданным и ручного ack.",
  "code": "@Incoming(\"orders-in\")\n@Outgoing(\"orders-out\")\npublic Order process(Order in) {   // топик→топик\n    return enrich(in);\n}\n\n# application.properties\nmp.messaging.incoming.orders-in.connector=smallrye-kafka\nmp.messaging.incoming.orders-in.topic=spo-pf-orders"
 },
 {
  "id": "qk2-virtual-threads",
  "t": "Quarkus",
  "s": "Reactive / Mutiny",
  "q": "@RunOnVirtualThread — как это альтернатива реактивному стилю? В чём выигрыш?",
  "a": "Виртуальные потоки (Java 21, Project Loom) дают писать обычный блокирующий код, который читается линейно, но масштабируется почти как реактивный. @RunOnVirtualThread запускает endpoint/метод на виртуальном потоке: блокирующий вызов не держит дорогой ОС-поток, а паркует дешёвый виртуальный. Получаешь high-throughput без callback-цепочек Mutiny.",
  "d": "Под капотом JVM при блокирующем I/O откладывает виртуальный поток и освобождает несущий platform-поток. Требует Java 21 и неблокирующих по-настоящему точек (не synchronized/JNI-pinning).",
  "code": "@GET\n@RunOnVirtualThread\npublic User get(Long id) {\n    return repo.findByIdBlocking(id); // блокирующе, но дёшево\n}"
 },
 {
  "id": "qk2-backpressure-multi",
  "t": "Quarkus",
  "s": "Reactive / Mutiny",
  "q": "Что такое backpressure в Multi и какой нюанс с перегрузкой потребителя?",
  "a": "Backpressure — механизм, где потребитель сам сообщает, сколько элементов он готов принять (request(n)), а продюсер не шлёт больше. Это защищает медленного консьюмера от затопления быстрым продюсером. Нюанс: если источник «горячий» и не умеет тормозить (таймер, Kafka-поток без паузы), а потребитель не успевает — Mutiny применит стратегию overflow: буфер, drop или ошибка MissingBackpressureException.",
  "d": "Multi реализует Reactive Streams Publisher, где Subscription.request(n) и есть backpressure-канал. Управляешь через onOverflow(): buffer(n), drop(), dropPrevious(), error().",
  "code": "Multi<Tick> ticks = source\n    .onOverflow().buffer(1000)   // буфер на 1000\n    // .onOverflow().drop()      // или дропать лишнее\n    ;"
 },
 {
  "id": "qk2-panache-ar-vs-repo",
  "t": "Quarkus",
  "s": "Данные",
  "q": "Panache active record (entity extends PanacheEntity) vs repository — в чём разница и какой риск для чистой архитектуры?",
  "a": "Active record: сущность сама умеет себя сохранять и искать — методы persist(), listAll(), find() висят прямо на классе entity. Repository: те же методы в отдельном классе-репозитории, а entity остаётся обычным POJO. Риск active record — персистентность протекает в домен: твой бизнес-объект намертво завязан на Hibernate и БД, его нельзя протащить в чистый core гексагона.",
  "d": "В эталонном audit-service домен — pure Java без аннотаций JPA, поэтому там active record недопустим, только репозиторий за портом.",
  "code": "// Active Record\nclass Order extends PanacheEntity { String isin; }\nOrder.find(\"isin\", x).firstResult();\n\n// Repository\n@ApplicationScoped\nclass OrderRepo implements PanacheRepository<Order> {}\nrepo.find(\"isin\", x).firstResult();"
 },
 {
  "id": "qk2-hibernate-reactive-vs-blocking",
  "t": "Quarkus",
  "s": "Данные",
  "q": "Hibernate Reactive vs классический blocking Hibernate ORM — когда что и в чём принципиальная разница?",
  "a": "Blocking ORM: поток виснет на JDBC-вызове и ждёт ответа БД, заняв worker-тред. Reactive: запрос неблокирующий, методы возвращают Uni/Mutiny, поток освобождается и работает над другими запросами пока БД думает. Reactive масштабируется на тысячи соединений малым числом тредов, но весь стек должен быть реактивным — одна блокирующая операция всё ломает.",
  "d": "Reactive использует Vert.x-драйвер БД (например vertx-pg-client), а не JDBC — JDBC по своей природе блокирующий.",
  "code": "// Blocking\n@Transactional\npublic Order get(Long id){ return Order.findById(id); }\n\n// Reactive\npublic Uni<Order> get(Long id){\n  return Order.findById(id); // -> Uni<Order>\n}"
 },
 {
  "id": "qk2-transactional-narayana",
  "t": "Quarkus",
  "s": "Данные",
  "q": "Как работает @Transactional в Quarkus и в чём подвох с reactive/Uni?",
  "a": "@Transactional (JTA, менеджер Narayana) оборачивает метод в транзакцию: открыл при входе, коммит при успехе, rollback при RuntimeException. Подвох: в reactive-коде @Transactional на методе, возвращающем Uni, не работает корректно — транзакция привязана к треду, а Uni выполняется асинхронно на другом треде. Для reactive используют Panache.withTransaction(() -> ...) или @WithTransaction.",
  "d": "По умолчанию JTA откатывает только на unchecked-исключениях; для checked нужно @Transactional(rollbackOn = ...).",
  "code": "// blocking — ок\n@Transactional\npublic void save(Order o){ o.persist(); }\n\n// reactive — НЕ @Transactional, а:\npublic Uni<Void> save(Order o){\n  return Panache.withTransaction(o::persist);\n}"
 },
 {
  "id": "qk2-dev-services",
  "t": "Quarkus",
  "s": "Данные",
  "q": "Что такое Dev Services в Quarkus и почему они убирают необходимость поднимать БД руками?",
  "a": "Dev Services — Quarkus в режиме dev и test сам поднимает зависимости (PostgreSQL, Kafka, Redis, Keycloak) в Docker через Testcontainers, если ты не задал их URL в конфиге. Видит datasource без URL — стартует контейнер БД и подставляет адрес автоматически. Тесты и локальный запуск работают из коробки без docker-compose и без ручной настройки.",
  "d": "Контейнер переиспользуется между запусками если включить quarkus.devservices.reuse и метку testcontainers reuse в ~/.testcontainers.properties.",
  "code": "# application.properties\nquarkus.datasource.db-kind=postgresql\n# НЕТ jdbc.url -> Dev Services поднимет\n# postgres в Docker автоматически в dev/test"
 },
 {
  "id": "qk2-flyway-liquibase",
  "t": "Quarkus",
  "s": "Данные",
  "q": "Flyway vs Liquibase в Quarkus — как заводятся миграции и в чём разница подхода?",
  "a": "Quarkus имеет extension'ы quarkus-flyway и quarkus-liquibase, которые при старте приложения прогоняют миграции схемы. Flyway: версионные SQL-скрипты вида V1__init.sql, простой линейный порядок. Liquibase: changelog (XML/YAML/JSON/SQL) с changeSet'ами, абстрагирован от диалекта БД и умеет откаты (rollback). Включаются флагом migrate-at-start=true.",
  "d": "В отличие от hibernate.hbm2ddl.auto=update, миграции — версионируемый, воспроизводимый и безопасный для prod способ менять схему.",
  "code": "# Flyway\nquarkus.flyway.migrate-at-start=true\n# src/main/resources/db/migration/V1__init.sql\n\n# Liquibase\nquarkus.liquibase.migrate-at-start=true\n# db/changeLog.xml"
 },
 {
  "id": "qk2-mpconfig-sources",
  "t": "Quarkus",
  "s": "Конфиг и Dev",
  "q": "Откуда Quarkus берёт значение для @ConfigProperty и кто кого перебивает?",
  "a": "Quarkus реализует MicroProfile Config: одно свойство может прийти из нескольких источников, и побеждает источник с большим ordinal (приоритетом). По умолчанию: системные свойства (-D, ordinal 400) > переменные окружения (300) > .env (295) > application.properties (250/100). То есть env-переменная переопределит то, что лежит в application.properties, не трогая код.",
  "d": "↳ Имя свойства маппится на ENV по правилу: точки и дефисы → подчёркивания, верхний регистр (quarkus.http.port → QUARKUS_HTTP_PORT).",
  "code": "@ConfigProperty(name = \"app.greeting\", defaultValue = \"hi\")\nString greeting;\n\n// или императивно:\nString v = ConfigProvider.getConfig()\n    .getValue(\"app.greeting\", String.class);"
 },
 {
  "id": "qk2-profiles",
  "t": "Quarkus",
  "s": "Конфиг и Dev",
  "q": "Как работают профили %dev/%test/%prod и какой активен по умолчанию?",
  "a": "Профиль — префикс перед ключом: `%dev.quarkus.http.port=8081`. Quarkus сам выбирает профиль: `dev` при `quarkus:dev`, `test` при тестах, `prod` во всех остальных случаях (собранный jar/native). Свойство с префиксом активного профиля перебивает то же свойство без префикса.",
  "d": "↳ Сменить профиль вручную: `-Dquarkus.profile=staging` или env `QUARKUS_PROFILE`. Можно делать и свои профили, не только три встроенных.",
  "code": "# application.properties\nquarkus.datasource.jdbc.url=jdbc:postgresql://prod-db/app\n%dev.quarkus.datasource.jdbc.url=jdbc:postgresql://localhost/app\n%test.quarkus.datasource.db-kind=h2"
 },
 {
  "id": "qk2-buildtime-runtime",
  "t": "Quarkus",
  "s": "Конфиг и Dev",
  "q": "Чем build-time свойства отличаются от runtime и почему часть конфига нельзя поменять после сборки?",
  "a": "Quarkus делает максимум работы во время сборки: часть свойств «вшивается» в артефакт и менять их без пересборки нельзя (build-time fixed). Runtime-свойства читаются при старте — их можно переопределять env/sys props. Это плата за быстрый старт и за native, где рефлексия и динамика недоступны: всё, что можно решить заранее, решается на сборке.",
  "d": "↳ Если выставить build-time свойство через env на проде — Quarkus залогирует предупреждение и проигнорирует, оставив значение, зафиксированное при сборке.",
  "code": "# BUILD-TIME (зашьётся в артефакт):\nquarkus.datasource.db-kind=postgresql\nquarkus.http.root-path=/api\n\n# RUNTIME (меняем без пересборки):\nquarkus.datasource.jdbc.url=jdbc:postgresql://...\nquarkus.http.port=8080"
 },
 {
  "id": "qk2-devmode-livereload",
  "t": "Quarkus",
  "s": "Конфиг и Dev",
  "q": "Как устроен dev mode и live reload — когда именно происходит перекомпиляция?",
  "a": "`quarkus dev` (или `mvn quarkus:dev`) поднимает приложение с горячей перезагрузкой. Перекомпиляция ленивая: код пересобирается не при сохранении файла, а при следующем HTTP-запросе. Quarkus сравнивает хеши изменённых файлов, дозагружает только их и обслуживает запрос уже новым кодом — рестарт JVM не нужен.",
  "d": "↳ Под капотом работает Dev UI (`/q/dev`), а ещё доступен удалённый dev-режим (remote dev) для запущенного в контейнере приложения.",
  "code": "./mvnw quarkus:dev\n# меняешь Resource.java, жмёшь refresh в браузере\n# → Quarkus перекомпилит класс и ответит новой версией\n# Dev UI: http://localhost:8080/q/dev"
 },
 {
  "id": "qk2-continuous-testing",
  "t": "Quarkus",
  "s": "Конфиг и Dev",
  "q": "Что такое continuous testing в Quarkus и чем отличается от обычного прогона тестов?",
  "a": "Continuous testing — режим, где тесты гоняются автоматически в фоне сразу после изменения кода, пока ты работаешь. Quarkus запускает только тесты, затронутые правкой (impacted tests), и показывает результат прямо в dev-консоли/Dev UI. Не нужно отдельно дёргать `mvn test` — обратная связь почти мгновенная.",
  "d": "↳ Включается в dev mode по клавише `r` в терминале; `o` переключает test-output, `v` открывает результаты в Dev UI.",
  "code": "./mvnw quarkus:dev\n# в консоли:\n#   r — запустить/перезапустить continuous testing\n#   r снова — пауза\n#   f — перегнать только упавшие тесты\n#   o — показать вывод тестов"
 },
 {
  "id": "qk2-packaging",
  "t": "Quarkus",
  "s": "Конфиг и Dev",
  "q": "fast-jar, uber-jar, native — в чём разница и что выбрать?",
  "a": "fast-jar (дефолт) — приложение разложено по слоям (`quarkus-app/`: lib, app, quarkus): быстрый старт и удобное Docker-кеширование слоёв. uber-jar — всё в одном self-contained jar, удобно отдать одним файлом, но толще и хуже кешируется. native — GraalVM AOT-бинарь под ОС: старт в миллисекундах и минимум RAM, но долгая сборка и нет JIT.",
  "d": "↳ Тип задаётся `quarkus.package.jar.type=fast-jar|uber-jar` (раньше `quarkus.package.type`); native — `-Dnative` / `quarkus.native.enabled=true`.",
  "code": "# fast-jar (по умолчанию)\njava -jar target/quarkus-app/quarkus-run.jar\n\n# native\n./mvnw package -Dnative\n./target/app-1.0-runner"
 },
 {
  "id": "qk2-fault-tolerance",
  "t": "Quarkus",
  "s": "Cloud-native и наблюдаемость",
  "q": "Что делают аннотации SmallRye Fault Tolerance: @Retry, @CircuitBreaker, @Timeout, @Bulkhead, @Fallback?",
  "a": "Это декларативные защиты вызова. @Retry повторяет упавший вызов N раз. @Timeout прерывает зависший вызов по таймауту. @CircuitBreaker «размыкает цепь» после серии ошибок и быстро отбивает запросы, не дёргая мёртвый сервис. @Bulkhead ограничивает число одновременных вызовов (изоляция как переборки в корабле). @Fallback даёт запасной ответ, когда всё провалилось.",
  "d": "↳ Это реализация MicroProfile Fault Tolerance поверх библиотеки SmallRye; аннотации можно комбинировать на одном методе, порядок их срабатывания строго определён спецификацией.",
  "code": "@ApplicationScoped\npublic class PriceClient {\n  @Retry(maxRetries = 3)\n  @Timeout(2000)\n  @CircuitBreaker(requestVolumeThreshold = 4, failureRatio = 0.5, delay = 5000)\n  @Fallback(fallbackMethod = \"cachedPrice\")\n  public BigDecimal getPrice(String ticker) { /* REST-вызов */ }\n\n  BigDecimal cachedPrice(String ticker) { return lastKnown.get(ticker); }\n}"
 },
 {
  "id": "qk2-health-probes",
  "t": "Quarkus",
  "s": "Cloud-native и наблюдаемость",
  "q": "В чём разница @Liveness и @Readiness в SmallRye Health и как они связаны с пробами Kubernetes?",
  "a": "@Liveness отвечает на вопрос «приложение живо или зависло?» — если проба падает, Kubernetes перезапускает под. @Readiness отвечает «готов принимать трафик?» — если падает, под убирают из балансировки, но НЕ перезапускают. Liveness мапится на livenessProbe, Readiness — на readinessProbe.",
  "d": "↳ Эндпоинты Quarkus: /q/health/live и /q/health/ready (общий /q/health). В Quarkus 3 расширение smallrye-health отдаёт их автоматически.",
  "code": "@Readiness\n@ApplicationScoped\npublic class DbReadyCheck implements HealthCheck {\n  @Inject AgroalDataSource ds;            // io.agroal.api.AgroalDataSource\n  public HealthCheckResponse call() {\n    try (var c = ds.getConnection()) {\n      return c.isValid(2)\n        ? HealthCheckResponse.up(\"db\")\n        : HealthCheckResponse.down(\"db\");\n    } catch (Exception e) {\n      return HealthCheckResponse.down(\"db\");\n    }\n  }\n}"
 },
 {
  "id": "qk2-micrometer-otel",
  "t": "Quarkus",
  "s": "Cloud-native и наблюдаемость",
  "q": "Как в Quarkus устроены метрики (Micrometer) и распределённый трейсинг (OpenTelemetry), и чем метрика отличается от трейса?",
  "a": "Метрика — это число во времени (RPS, latency, размер пула): дёшево, агрегировано, отвечает «что и сколько». Трейс — путь ОДНОГО запроса через все сервисы как дерево спанов: отвечает «где именно затык». В Quarkus 3 метрики дают через quarkus-micrometer (обычно с registry Prometheus), а трейсинг — через quarkus-opentelemetry (экспорт по OTLP).",
  "d": "↳ Контекст трейса (traceId/spanId) пробрасывается между сервисами через заголовки W3C traceparent; Quarkus инструментирует REST, gRPC, JDBC, Kafka автоматически.",
  "code": "# application.properties\nquarkus.micrometer.export.prometheus.enabled=true\n# метрики на /q/metrics\n\nquarkus.otel.exporter.otlp.traces.endpoint=http://otel-collector:4317\nquarkus.otel.service.name=document-service"
 },
 {
  "id": "qk2-openapi-swagger",
  "t": "Quarkus",
  "s": "Cloud-native и наблюдаемость",
  "q": "Зачем SmallRye OpenAPI и Swagger UI в Quarkus, и откуда берётся спецификация?",
  "a": "SmallRye OpenAPI сам генерирует OpenAPI-спеку (контракт API в YAML/JSON) из твоих JAX-RS/REST-эндпоинтов на этапе сборки — её отдают на /q/openapi. Swagger UI — это интерактивная веб-страница поверх этой спеки на /q/swagger-ui, где можно посмотреть эндпоинты и подёргать их прямо из браузера.",
  "d": "↳ Спеку можно обогащать аннотациями @Operation, @Schema, @APIResponse; Swagger UI в Quarkus по умолчанию доступен только в dev-режиме, на проде включается отдельным свойством.",
  "code": "@GET\n@Path(\"/orders/{id}\")\n@Operation(summary = \"Получить заявку по id\")\n@APIResponse(responseCode = \"404\", description = \"Заявка не найдена\")\npublic Order get(@PathParam(\"id\") String id) { ... }"
 },
 {
  "id": "qk2-vs-springboot",
  "t": "Quarkus",
  "s": "Cloud-native и наблюдаемость",
  "q": "Quarkus vs Spring Boot — когда что выбирать? (учитывай не только скорость старта)",
  "a": "Quarkus сильнее там, где важны быстрый старт и низкая память: serverless, частое масштабирование, native-образы (GraalVM). Spring Boot выигрывает зрелостью и широтой экосистемы, огромным комьюнити и тем, что почти любой Java-разработчик его уже знает. Выбор — это не бенчмарк старта, а баланс: команда, экосистема нужных интеграций, риск и сроки поддержки.",
  "d": "↳ Quarkus двигает работу на build-time (build-time DI и индексация), отсюда быстрый старт и native; Spring исторически делает больше в рантайме через рефлексию, хотя Spring Boot 3 + AOT/native сократил этот разрыв."
 },
 {
  "id": "qk2-oidc-keycloak",
  "t": "Quarkus",
  "s": "Cloud-native и наблюдаемость",
  "q": "Как Quarkus Security работает с OIDC/Keycloak и что такое bearer-режим в стеке вроде брокерского?",
  "a": "Quarkus через расширение quarkus-oidc интегрируется с Keycloak как OIDC-провайдером. В микросервисной архитектуре сервисы работают в режиме service (bearer): клиент уже получил JWT access-token, кладёт его в заголовок Authorization: Bearer, а сервис валидирует подпись токена по публичным ключам Keycloak (JWKS) и достаёт роли. Никаких сессий и редиректов на логин — сервис только проверяет токен.",
  "d": "↳ Роли из токена мапятся на @RolesAllowed; для UI-приложений есть режим web-app с code flow и редиректом на Keycloak, для API-сервисов — bearer-only.",
  "code": "# application.properties\nquarkus.oidc.auth-server-url=https://keycloak.acme.com/realms/invest\nquarkus.oidc.client-id=document-service\nquarkus.oidc.application-type=service  # bearer-only\n\n@GET @Path(\"/reports\")\n@RolesAllowed(\"broker\")\npublic List<Report> reports() { ... }"
 },
 {
  "id": "ap-ambassador",
  "t": "Архитектура",
  "s": "Интеграция и обмен",
  "q": "Что такое Ambassador и чем он отличается от Sidecar?",
  "a": "Ambassador — это вынесенный out-of-process прокси-помощник, который ставят рядом с сервисом, чтобы он брал на себя сетевую возню исходящих вызовов: ретраи, таймауты, TLS, circuit breaker, метрики. Сервис обращается к localhost, а посол уже идёт во внешний мир и страдает за сеть. Решает боль «не хочу зашивать сетевую устойчивость в код каждого сервиса на каждом языке». Цена — лишний сетевой хоп и ещё один процесс, который надо деплоить и мониторить.",
  "d": "Sidecar — это общий зонтик: любой вспомогательный процесс рядом с приложением (логи, конфиг, метрики). Ambassador — частный случай sidecar, заточенный именно под прокси исходящих/входящих сетевых вызовов. То есть «всякий ambassador — это sidecar, но не всякий sidecar — ambassador»."
 },
 {
  "id": "ap-claim-check",
  "t": "Архитектура",
  "s": "Интеграция и обмен",
  "q": "Что за паттерн Claim Check и когда он нужен?",
  "a": "Claim Check решает проблему больших payload в сообщениях: вместо того чтобы гнать через брокер мегабайтный файл, кладём его в хранилище (S3/MinIO/БД), а в сообщение пишем только ссылку-«квитанцию» (claim check). Получатель по квитанции сам забирает тело из стора. Боль — брокеры (Kafka/RabbitMQ) не любят жирные сообщения: лимиты, забитая память, медленная репликация. Цена — лишний раунд-трип за телом и забота о времени жизни/чистке объектов в сторе.",
  "d": "Название — от багажной квитанции: ты сдаёшь чемодан в камеру хранения и носишь с собой только бумажку с номером, а не сам чемодан. По бумажке чемодан выдают.",
  "code": "// продьюсер\nString key = minio.put(bucket, pdfBytes); // 5 МБ в стор\nkafka.send(\"docs\", new Msg(docId, \"minio://bucket/\" + key)); // в топик — ссылка\n\n// консьюмер\nMsg m = receive();\nbyte[] pdf = minio.get(m.ref()); // забрал тело по квитанции"
 },
 {
  "id": "ap-scatter-gather",
  "t": "Архитектура",
  "s": "Интеграция и обмен",
  "q": "Объясни Scatter-Gather и зачем там таймаут.",
  "a": "Scatter-Gather — это «разослать и собрать»: один запрос веером уходит к N исполнителям (scatter), потом их ответы агрегируются/мержатся в один результат (gather). Классика — мета-поиск: спросить 5 поставщиков цен и показать лучшую. Боль, которую решает: параллельно опросить много источников вместо последовательного перебора. Цена — нужен таймаут на отстающих, иначе самый медленный исполнитель тормозит весь ответ (tail latency).",
  "d": "Стратегии gather: ждать всех (all), ждать первого валидного (first wins), ждать кворум, или взять то что успело прийти к дедлайну. Выбор зависит от того, нужна полнота или скорость.",
  "code": "var futures = providers.stream()\n    .map(p -> CompletableFuture.supplyAsync(() -> p.quote(req)))\n    .toList();\n// gather с общим дедлайном на отстающих\nvar results = futures.stream()\n    .map(f -> { try { return f.get(300, MILLIS); }\n               catch (Exception e) { return null; } }) // отвалившихся пропускаем\n    .filter(Objects::nonNull)\n    .toList();\nreturn merge(results); // мерж: лучшая цена / объединение"
 },
 {
  "id": "ap-competing-consumers",
  "t": "Архитектура",
  "s": "Интеграция и обмен",
  "q": "Что такое Competing Consumers и какой ценой даётся масштабирование?",
  "a": "Competing Consumers — на одной очереди сидят несколько потребителей, и каждое сообщение достаётся ровно одному из них (они «конкурируют» за сообщения). Это горизонтальное масштабирование обработки: растёт нагрузка — добавил консьюмеров, разобрали быстрее. Боль — один потребитель не успевает выгребать очередь. Цена — теряется глобальный порядок: сообщения обрабатываются параллельно и могут завершиться не в том порядке, в каком пришли.",
  "d": "В Kafka это решается партициями: внутри партиции порядок сохранён, а competing-эффект даёт consumer group — один партишн читает только один консьюмер группы. Параллелизм ограничен числом партиций, зато порядок по ключу держится.",
  "code": "# RabbitMQ: N воркеров на одной очереди -> round-robin между ними\n# prefetch ограничивает, сколько сообщений воркер берёт до ack\nchannel.basic_qos(prefetch_count=1)\nchannel.basic_consume(queue=\"tasks\", on_message=handle)\n\n# Kafka: параллелизм = число партиций в топике\n# порядок гарантирован ТОЛЬКО внутри партиции (по ключу)"
 },
 {
  "id": "ap-event-carried-state",
  "t": "Архитектура",
  "s": "Интеграция и обмен",
  "q": "Что такое Event-Carried State Transfer и какую боль он лечит?",
  "a": "Event-Carried State Transfer — это когда событие несёт в себе нужные данные («клиент изменён» + сам новый адрес, имя, статус), а не только факт «клиент изменён, иди спроси у источника». Потребитель кладёт эти данные в свою локальную read-копию и работает без синхронных дёрганий источника. Боль — убрать runtime-связность и каскад синхронных вызовов между сервисами. Цена — дублирование данных по сервисам и eventual consistency.",
  "d": "Противоположность — «тонкое» событие-нотификация (только ID), после которого консьюмер делает синхронный callback в источник за деталями. Это проще по хранению, но возвращает временную связность: источник лежит — потребитель тоже стоит.",
  "code": "// тонкое событие (notification): связность остаётся\n{ \"type\": \"CustomerChanged\", \"id\": 42 }  // -> consumer зовёт GET /customers/42\n\n// event-carried state transfer: данные внутри\n{ \"type\": \"CustomerChanged\", \"id\": 42,\n  \"name\": \"Иван\", \"address\": \"Алматы\", \"tier\": \"VIP\" } // consumer обновляет свою копию"
 },
 {
  "id": "ap-p2p-vs-pubsub",
  "t": "Архитектура",
  "s": "Интеграция и обмен",
  "q": "В чём разница Point-to-point очереди и Pub/Sub топика?",
  "a": "Point-to-point (очередь) — сообщение доставляется ровно одному потребителю: положил задачу, кто-то один её взял и обработал. Pub/Sub (топик) — сообщение получают ВСЕ подписчики: одно событие, N независимых реакций. Разные боли: очередь — про распределение работы (1 задача = 1 исполнитель), топик — про оповещение многих (1 факт → много заинтересованных). Цена pub/sub — слабая связность хороша, но труднее отследить, кто и как обработал событие.",
  "d": "В Kafka граница тоньше: топик+одна consumer group ведёт себя как очередь (competing consumers, msg одному в группе), а несколько разных групп на том же топике дают pub/sub (каждая группа получает все сообщения). То есть «p2p vs pub/sub» — это про модель доставки, а не всегда про отдельный продукт."
 },
 {
  "id": "ap-bulkhead",
  "t": "Архитектура",
  "s": "Устойчивость",
  "q": "Один медленный downstream подвесил весь сервис — все потоки висят на нём. Как изолировать?",
  "a": "Bulkhead (переборка) — каждой зависимости свой отдельный пул потоков/соединений с лимитом. Если payment-service завис, забьётся только его пул, а вызовы к другим сервисам и health-check продолжат работать. Цена: больше потоков/памяти и тюнинг размеров пулов под каждую зависимость.",
  "d": "Откуда название: на корабле корпус делят на отсеки-переборки (bulkheads). Пробоина в одном отсеке его затопит, но не утопит весь корабль.",
  "code": "// Resilience4j: отдельный bulkhead на каждый downstream\n@Bulkhead(name = \"paymentService\", type = THREADPOOL)\npublic Receipt charge(Order o) { ... }\n\n// resilience4j.thread-pool-bulkhead.instances:\n//   paymentService:  { maxThreadPoolSize: 10, queueCapacity: 20 }\n//   inventoryService:{ maxThreadPoolSize: 10, queueCapacity: 20 }\n// payment лёг -> забит только его пул из 10, inventory жив"
 },
 {
  "id": "ap-resilience-stack",
  "t": "Архитектура",
  "s": "Устойчивость",
  "q": "Timeout, Retry, Circuit Breaker, Bulkhead, Fallback — в каком ПОРЯДКЕ они оборачивают вызов и почему порядок важен?",
  "a": "Это слои-обёртки вокруг одного вызова, порядок снаружи внутрь: Fallback → Retry → CircuitBreaker → Bulkhead → Timeout → сам вызов. Каждый слой своё: таймаут не даёт висеть, bulkhead изолирует ресурс, CB отрубает мёртвый downstream, retry повторяет, fallback отдаёт запасной ответ. Цена ошибки в порядке — retry ВНУТРИ CB (под цепью) бьёт по мёртвому downstream пачкой повторов и мешает цепи вовремя открыться, поэтому retry ставят НАД CB.",
  "d": "В Resilience4j порядок задаётся декораторами; рекомендованный: Bulkhead( Retry( CircuitBreaker( TimeLimiter( call )))) , а Fallback вешается на самый внешний результат.",
  "code": "// Resilience4j: внешний слой применяется ПОСЛЕДНИМ\nSupplier<Resp> decorated = Decorators.ofSupplier(call)\n  .withBulkhead(bulkhead)            // 2. ограничить параллелизм\n  .withTimeLimiter(timeLimiter, ex)  // 1. срезать долгий вызов (внутри)\n  .withCircuitBreaker(circuitBreaker)// 3. цепь видит результат таймаута\n  .withRetry(retry)                  // 4. повтор — НАД цепью\n  .withFallback(ex -> cachedResp())  // 5. запасной ответ снаружи\n  .decorate();\n// Поток: входим через Bulkhead -> Retry -> CB -> Timeout -> вызов"
 },
 {
  "id": "ap-failfast-vs-degrade",
  "t": "Архитектура",
  "s": "Устойчивость",
  "q": "Fail-fast или graceful degradation — когда лучше упасть мгновенно, а когда выдать урезанный ответ?",
  "a": "Fail-fast — мгновенно вернуть ошибку, не тратя ресурсы на заведомо обречённый вызов (CB открыт, очередь переполнена, нет обязательных данных). Graceful degradation — отдать частичный/устаревший результат вместо полного отказа, когда необязательная функция недоступна. Правило: падай быстро, если данные критичны для корректности; деградируй, если функция второстепенна и есть приемлемый запасной вариант. Цена деградации — риск отдать неточный/устаревший ответ.",
  "d": "Fail-fast — это про ресурсы (не держи поток на мёртвом вызове), graceful degradation — про UX (покажи ленту без блока «рекомендации», если рекомендатор лёг)."
 },
 {
  "id": "ap-load-shedding",
  "t": "Архитектура",
  "s": "Устойчивость",
  "q": "Нагрузка превысила ёмкость, latency растёт, сервис вот-вот ляжет. Что делать на ВХОДЕ?",
  "a": "Load shedding — на входе отбрасывать лишние запросы (сразу 429/503), пока система не перегрузилась, обслуживая столько, сколько реально можешь. Дёшево отказать рано лучше, чем принять всё, деградировать по latency и упасть целиком (метастабильный отказ). Цена: часть клиентов получает отказ — но осознанно и быстро, а не все получают таймаут.",
  "d": "Отличие от rate limiting: rate limit — про справедливость/квоты конкретного клиента (заранее заданный лимит), load shedding — про самосохранение сервиса по факту реальной перегрузки (адаптивно к нагрузке/latency/глубине очереди).",
  "code": "// Простейший load shedding по глубине очереди / занятости пула\nif (inFlight.get() >= maxConcurrent) {\n    metrics.shed();\n    throw new ServiceOverloadedException(); // 503 + Retry-After\n}\n// Адаптивно: сбрасывать дешёвые/низкоприоритетные первыми,\n// здоровьесберегающие (health, платежи) пропускать всегда"
 },
 {
  "id": "ap-retry-budget",
  "t": "Архитектура",
  "s": "Устойчивость",
  "q": "Downstream начал тормозить, все клиенты дружно ретраят — и добивают его окончательно. Как ограничить ретраи глобально?",
  "a": "Retry budget — глобальный лимит на ДОЛЮ ретраев от основного трафика (через token-bucket): ретрай разрешён, только если в бакете есть токен. Каждый запрос пополняет бакет, каждый ретрай тратит токен; при всплеске ошибок токены кончаются и ретраи отключаются. Решает retry-storm: ретраи не превысят, скажем, 10% нагрузки и не устроят downstream лавину. Цена: при массовых сбоях ретраи перестают помогать единичным жертвам.",
  "d": "Это лучше, чем фиксированные «3 попытки на запрос»: при общем сбое 3×N запросов утраивают нагрузку именно тогда, когда downstream и так умирает. Бюджет смотрит на агрегат, а не на каждый запрос отдельно.",
  "code": "// gRPC/Envoy-стиль: retry budget вместо фикс. числа попыток\nretryBudget:\n  budgetRatio: 0.1   # ретраи <= 10% от обычных запросов\n  minRetriesPerSecond: 10  # пол, чтобы при низком RPS ретраи не глохли\n\n// token-bucket вручную:\n// на каждый успешный запрос -> +1 токен (cap)\n// перед ретраем: if (!bucket.tryAcquire()) skipRetry();\n// поток ошибок -> бакет пуст -> ретраи сами выключаются"
 },
 {
  "id": "ap-sidecar-ambassador-adapter",
  "t": "Архитектура",
  "s": "Топология",
  "q": "Sidecar, Ambassador, Adapter — в чём разница между этими тремя паттернами «контейнера-помощника»?",
  "a": "Все трое — это вспомогательный контейнер рядом с основным приложением (в одном поде), решающий инфраструктурную заботу за него. Sidecar — общий случай: что-то полезное рядом (логи, метрики, конфиг). Ambassador — частный случай: прокси для ИСХОДЯЩИХ вызовов (retry, TLS, service discovery за приложение). Adapter — частный случай: нормализует ВХОДЯЩИЙ/исходящий интерфейс к стандартному виду (например, превращает кастомный формат метрик в Prometheus). Цена — лишний контейнер, сетевой хоп и сложность отладки.",
  "d": "Ambassador и Adapter — это специализации Sidecar. Service mesh (Envoy в Istio) — это по сути Ambassador-sidecar, поднятый до уровня платформы.",
  "code": "# Pod: app + sidecar рядом, общий network namespace\ncontainers:\n  - name: app          # бизнес-логика, ходит на localhost:9000\n  - name: ambassador   # Envoy: ловит исходящие, делает retry+TLS+LB\n    # app -> localhost:9000 -> ambassador -> внешний сервис\n  # Adapter был бы: app пишет свои метрики -> adapter -> /metrics в формате Prometheus"
 },
 {
  "id": "ap-service-discovery",
  "t": "Архитектура",
  "s": "Топология",
  "q": "Service discovery: client-side vs server-side — кто и где резолвит адрес нужного инстанса?",
  "a": "Сервисы в облаке постоянно меняют IP и количество инстансов, поэтому хардкодить адрес нельзя — нужен механизм поиска. Client-side: клиент сам идёт в реестр (Eureka/Consul), получает список живых инстансов и сам выбирает один (балансировка на стороне клиента). Server-side: клиент бьёт по одному стабильному адресу (балансировщик/прокси, например AWS ELB или k8s Service), а тот уже резолвит и распределяет. Цена client-side — логика discovery протекает в каждый клиент; цена server-side — лишний хоп и сам балансировщик как точка отказа.",
  "d": "k8s Service — это server-side discovery (kube-proxy/iptables). Service mesh смещает client-side balancing в sidecar, убирая код из приложения.",
  "code": "// CLIENT-SIDE (Eureka): клиент знает про реестр и сам балансит\nList<Instance> live = registry.lookup(\"order-service\");\nInstance i = loadBalancer.choose(live);   // выбор на клиенте\nhttp.get(i.host + \":\" + i.port + \"/orders\");\n\n// SERVER-SIDE (k8s): клиент знает только стабильное имя\nhttp.get(\"http://order-service/orders\");\n// k8s Service -> kube-proxy резолвит и балансит за тебя"
 },
 {
  "id": "ap-saga-orchestration-vs-choreography",
  "t": "Архитектура",
  "s": "Топология",
  "q": "Saga: оркестрация vs хореография — чем централизованный дирижёр отличается от событийной цепочки и когда что брать?",
  "a": "Saga — способ держать консистентность в распределённой транзакции без 2PC: бизнес-операция разбита на локальные транзакции, у каждой есть компенсация (откат-действие). Оркестрация — есть центральный координатор (saga orchestrator), который явно командует шагами и при сбое запускает компенсации; логика в одном месте, легко наблюдать, но координатор — узкое место. Хореография — координатора нет: каждый сервис слушает события и реагирует своим шагом, выпуская новое событие; нет единой точки отказа, но логика размазана и сложно понять весь поток. Цена saga в целом — нет изоляции (видны промежуточные состояния) и сложные компенсации.",
  "d": "Компенсация — не идеальный rollback: ты не «отменяешь» списание денег, а делаешь обратную операцию (возврат), которая может иметь свои сайд-эффекты.",
  "code": "// ОРКЕСТРАЦИЯ: координатор явно ведёт шаги\nsaga.step(order.create())\n    .step(payment.charge(),  compensate: payment.refund())\n    .step(stock.reserve(),   compensate: stock.release());\n// при падении reserve -> orchestrator вызывает refund, потом отменяет order\n\n// ХОРЕОГРАФИЯ: никто не дирижирует, реагируют на события\n// OrderCreated -> [payment слушает] -> PaymentCharged\n//             -> [stock слушает]   -> StockReserved | StockFailed\n// StockFailed -> [payment слушает] -> делает refund сам"
 },
 {
  "id": "sd-interview-flow",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "Тебе говорят «спроектируй TinyURL». С чего начинаешь и в каком порядке идёшь?",
  "a": "Не кидаешься рисовать. Сначала собираешь требования (функциональные + нелимиты: QPS, latency, объём), потом back-of-envelope оценки, затем высокоуровневая схема (клиент→LB→сервис→БД/кэш), и только потом ищешь узкие места и углубляешь их. Порядок: уточнить → прикинуть → нарисовать крупно → пробить bottleneck.",
  "d": "Главная ошибка джунов — сразу лезть в детали (какой индекс в Postgres), не договорившись о масштабе. Без числа QPS ты не знаешь, нужен ли вообще кэш и шардинг."
 },
 {
  "id": "sd-back-of-envelope",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "Что такое back-of-envelope estimation и зачем округлять до степеней 10?",
  "a": "Это грубая прикидка «на салфетке»: порядок величины, а не точное число. Округляешь до 10^n, чтобы быстро в уме перемножать и понять — это тысячи RPS или миллионы. Цель не точность, а понять масштаб задачи: нужен ли кэш, шардинг, CDN.",
  "d": "Полезные константы держи в голове: в сутках ~86400 ≈ 10^5 секунд; 1M записей по 1KB = 1GB; чтение из памяти ~100ns, из SSD ~100µs, сеть в датацентре ~0.5ms, межрегион ~50-150ms."
 },
 {
  "id": "sd-qps-readwrite",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "Как из «100M активных пользователей» получить QPS и зачем тебе соотношение read/write?",
  "a": "Берёшь действия на юзера в день, умножаешь на юзеров, делишь на ~10^5 секунд = среднее QPS. Пик = среднее ×2-3. Соотношение read/write говорит, где боль: при 100:1 чтения боль в чтении → кэш и реплики; при write-heavy боль в записи → шардинг и буферизация через очередь.",
  "code": "// 100M юзеров × 5 чтений/день\n// reads = 500M/день ÷ 86400 ≈ 5800 RPS (avg)\n// peak ≈ 5800 × 3 ≈ 17400 RPS\n// write 10× реже → 50M/день ≈ 580 WPS\n// read:write = 10:1 → кэш окупается"
 },
 {
  "id": "sd-latency-budget",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "Тебе дали SLA: p99 ответа API ≤ 200ms. Как распределить этот бюджет по слоям?",
  "a": "Делишь 200ms между участниками цепочки: сеть туда-обратно, балансировщик, бизнес-логика, обращения к БД/кэшу, сериализация. Каждый слой получает свою долю, и сумма должна влезть в бюджет с запасом. Если БД-запрос ест 150ms — на остальное остаётся 50ms, значит БД и есть узкое место.",
  "d": "Считай по p99, не по среднему: при 3 последовательных вызовах к БД хвосты складываются. Если каждый вызов p99=20ms, три подряд легко дадут 60ms+ на хвосте. Меньше последовательных хопов — стабильнее хвост."
 },
 {
  "id": "sd-availability-nines",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "Что значит «четыре девятки» доступности и почему каждая следующая девятка дороже в разы?",
  "a": "99.99% = не более ~52 минут простоя в год. Каждая девятка делит допустимый простой на 10: три девятки ~8.7ч/год, четыре ~52мин, пять ~5мин. Дороже потому, что убрать последние минуты требует мульти-AZ, авто-failover, репликацию, отказ от единых точек отказа — резко растёт сложность и стоимость.",
  "code": "// downtime в год:\n// 99%     → 3.65 дня\n// 99.9%   → 8.76 часа\n// 99.99%  → 52.6 минуты\n// 99.999% → 5.26 минуты\n// availability системы = произведение\n// доступностей последовательных звеньев"
 },
 {
  "id": "sd-cap-theorem",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "CAP-теорема: что реально приходится выбирать, и почему «выбери 2 из 3» — упрощение?",
  "a": "В распределённой системе сеть рано или поздно рвётся (P неизбежно), поэтому выбор реально между C и A только в момент сетевого разрыва. CP: при разрыве отказываем в ответе, лишь бы не отдать устаревшее (банк, баланс). AP: отвечаем всегда, но возможно неактуально (лента, корзина). Вне разрыва система может быть и консистентной, и доступной.",
  "d": "P (partition tolerance) не опционален в распределёнке — сеть всегда может порваться. Поэтому честнее формулировка: «при разрыве сети выбирай C или A». Реальные БД настраиваются по спектру, а не строго в один угол."
 },
 {
  "id": "sd-sql-vs-nosql",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "SQL или NoSQL под конкретный кейс — по каким признакам решаешь, а не по моде?",
  "a": "SQL берёшь, когда нужны ACID-транзакции, связи и сложные запросы/джойны, а схема стабильна (деньги, заказы, учёт). NoSQL — когда нужен горизонтальный масштаб на запись, гибкая/меняющаяся схема, простой доступ по ключу и можно жить с eventual consistency (лента, сессии, метрики, каталог). Решает паттерн доступа к данным, а не хайп.",
  "d": "NoSQL не «быстрее вообще» — он быстрее на своём паттерне (доступ по ключу, без джойнов). Современный Postgres с JSONB и партиционированием закрывает многие «NoSQL-кейсы», оставаясь транзакционным. По умолчанию начинай с SQL."
 },
 {
  "id": "sd-sharding-key",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "Когда пора шардировать и как выбрать ключ шардирования, чтобы не выстрелить себе в ногу?",
  "a": "Шардируешь, когда одна нода физически не тянет: данные не влезают на диск/в RAM, или запись упирается в потолок одного мастера. Ключ выбирай так, чтобы нагрузка равномерно размазалась и частые запросы били в один шард. Плохой ключ → горячие шарды и кросс-шард джойны, которые убивают всю выгоду.",
  "d": "Хэш-шардинг ровно распределяет, но убивает range-запросы. Range-шардинг хорош для диапазонов, но создаёт горячие точки (свежие данные по времени льются в один шард). Consistent hashing уменьшает решардинг при добавлении нод."
 },
 {
  "id": "sd-replication",
  "t": "System Design",
  "s": "Оценка и основы",
  "q": "Синхронная и асинхронная репликация — чем платишь в каждом случае и при чём тут согласованность?",
  "a": "Sync: мастер ждёт подтверждения реплик перед ответом клиенту — нет потери данных при падении мастера, но выше латентность записи и риск зависнуть, если реплика тормозит. Async: мастер отвечает сразу, реплики догоняют потом — быстро, но при падении мастера теряешь последние незареплицированные коммиты (replication lag).",
  "d": "Чтение с async-реплики даёт «read-your-writes» проблему: записал и тут же не увидел свою запись, потому что реплика отстала. Лечат маршрутизацией свежих чтений на мастер или semi-sync (ждём хотя бы 1 реплику)."
 },
 {
  "id": "sd-rate-limiter",
  "t": "System Design",
  "s": "Кейсы I",
  "q": "Спроектируй распределённый rate limiter. Чем token bucket в Redis отличается от sliding window и что выбрать?",
  "a": "Token bucket: на ключ храним токены и время; каждый запрос отнимает токен, токены доливаются с фиксированной скоростью — допускает burst до размера ведра. Sliding window log/counter точнее ограничивает «не больше N за окно», но дороже по памяти. В распределёнке считаем централизованно в Redis (общий счётчик для всех инстансов), а саму проверку делаем атомарно через Lua-скрипт, иначе race между GET и SET.",
  "d": "Sliding window counter — компромисс: два соседних фиксированных окна с весовой интерполяцией. Дёшево (2 счётчика) и почти без всплесков на стыке окон, в отличие от fixed window, где на границе можно пропустить 2×N.",
  "code": "-- token bucket, атомарно в Redis\nlocal tokens = tonumber(redis.call('HGET', KEYS[1], 'tokens')) or capacity\nlocal last = tonumber(redis.call('HGET', KEYS[1], 'ts')) or now\ntokens = math.min(capacity, tokens + (now-last)*refillRate)\nif tokens < 1 then return 0 end\nredis.call('HSET', KEYS[1], 'tokens', tokens-1, 'ts', now)\nreturn 1"
 },
 {
  "id": "sd-url-shortener-id",
  "t": "System Design",
  "s": "Кейсы I",
  "q": "Сокращатель ссылок: как генерировать короткий id, чтобы не было коллизий и не угадывался следующий?",
  "a": "Два пути. (1) Counter + base62: автоинкремент-id кодируем в base62 (a-zA-Z0-9) — гарантированно уникально, коротко, но последователен и угадывается. (2) Случайный 7-символьный base62 (~3.5 трлн вариантов) с проверкой уникальности при вставке. На масштабе раздают диапазоны id сервисам через range-аллокатор (как Twitter Snowflake/Zookeeper), чтобы не ходить в общий счётчик на каждый запрос.",
  "d": "Хеш URL (MD5/SHA → первые 7 base62) соблазнителен, но даёт коллизии при разных длинных URL и одинаковый short для одинаковых — что иногда не нужно (приватность). Counter+base62 предсказуемее по поведению и проще дебажить.",
  "code": "// base62 от автоинкремент id\nString encode(long id){\n  String A=\"0..9a..zA..Z\"; // 62 символа\n  var sb=new StringBuilder();\n  while(id>0){ sb.append(A.charAt((int)(id%62))); id/=62; }\n  return sb.reverse().toString();\n}\n// 62^7 ≈ 3.5 * 10^12 коротких ссылок"
 },
 {
  "id": "sd-url-shortener-redirect",
  "t": "System Design",
  "s": "Кейсы I",
  "q": "Редирект в сокращателе: 301 или 302? И как закэшировать горячие ссылки?",
  "a": "302 (или 307) — временный: браузер каждый раз спрашивает сервер, ты видишь клики (аналитика) и можешь сменить target. 301 — постоянный: браузер кэширует навсегда, клики после первого раза до тебя не доходят, зато быстрее и меньше нагрузка. Горячие ссылки кладём в Redis/in-memory LRU перед БД: short-код читается на каждый клик, а распределение кликов — Zipf (немного ссылок дают почти весь трафик).",
  "d": "Если бизнес-метрика — клики и нужна возможность отозвать/переназначить ссылку, бери 302. Если ссылка вечная и аналитика не критична — 301 экономит инфраструктуру. На практике большинство сокращателей берут 302 ради аналитики.",
  "code": "@GET @Path(\"/{code}\")\npublic Response go(String code){\n  String url = cache.get(code);        // L1 Redis\n  if(url==null){ url = repo.find(code); // L2 БД\n                 cache.set(code,url,1h); }\n  if(url==null) return Response.status(404).build();\n  return Response.status(302)\n     .header(\"Location\", url).build();\n}"
 },
 {
  "id": "sd-feed-fanout",
  "t": "System Design",
  "s": "Кейсы I",
  "q": "Лента новостей: fan-out on write или on read? Объясни tradeoff и где ломается.",
  "a": "Fan-out on write (push): при публикации поста копию кладём в ленту каждого подписчика заранее — чтение ленты мгновенное (читаем готовый список), но запись дорогая, особенно у звёзд с миллионами фолловеров. Fan-out on read (pull): лента собирается в момент запроса из постов тех, на кого подписан — запись дешёвая, но чтение медленное (merge многих источников). Выбор — по соотношению read/write и распределению подписчиков.",
  "d": "Проблема push — «звезда» с 50M фолловеров: один пост = 50M записей (fan-out storm). Проблема pull — у активного юзера 5000 подписок, каждое открытие ленты — merge 5000 timeline'ов. Поэтому реально берут гибрид.",
  "code": "// Гибрид\nvoid onPost(Post p){\n  if(author.followers < STAR_THRESHOLD)\n     fanoutToFollowers(p);   // push обычным\n  // звёзд НЕ пушим — их подтянут на чтении\n}\nList<Post> feed(User u){\n  var pushed = readPrecomputed(u);      // готовая часть\n  var stars  = pullFromStars(u.starFollows()); // pull звёзд\n  return merge(pushed, stars);          // слияние по времени\n}"
 },
 {
  "id": "sd-notifications",
  "t": "System Design",
  "s": "Кейсы I",
  "q": "Система нотификаций: как обеспечить надёжную доставку — ретраи, дедуп, шаблоны?",
  "a": "Приём события кладём в очередь (Kafka/SQS), воркеры разбирают и шлют в каналы (push/email/SMS). Падает провайдер — ретрай с экспоненциальным backoff и dead-letter queue после N попыток. Дедуп — по idempotency-key (event_id): храним «уже отправлено» в Redis/БД, повтор отбрасываем. Контент не хардкодим — шаблоны (Mustache/Handlebars) с подстановкой данных, отдельно от кода доставки.",
  "d": "At-least-once доставка из очереди означает дубли — поэтому дедуп обязателен на стороне отправки, иначе юзер получит 3 одинаковых пуша. Idempotency-key делает повторную обработку безопасной.",
  "code": "void handle(Event e){\n  String key = e.id();                 // idempotency-key\n  if(!dedup.firstSeen(key)) return;    // SETNX в Redis, дубль -> skip\n  String body = templates.render(e.type(), e.data());\n  try { provider.send(e.channel(), body); }\n  catch(Transient ex){ retry(e); }     // backoff, потом DLQ\n}"
 },
 {
  "id": "sd-counter-leaderboard",
  "t": "System Design",
  "s": "Кейсы I",
  "q": "Распределённый счётчик и лидерборд: как избежать hot-key и получить топ-N за миллисекунды?",
  "a": "Один общий счётчик на популярный объект = hot key, все инкременты дерутся за одну строку/ключ. Решение — sharded counters: дробим на K подсчётчиков (counter:id:0..K-1), пишем в случайный шард, читаем суммой. Для лидерборда берём Redis Sorted Set (ZSET): ZADD пишет score, ZREVRANGE даёт топ-N за O(log N), ZREVRANK — позицию игрока без полного скана.",
  "d": "Точная глобальная сумма по шардам читается чуть дороже (K чтений), но запись масштабируется линейно. Если точность не критична (просмотры) — sharded counters идеальны; если нужен ранг — ZSET сам поддерживает порядок.",
  "code": "// hot counter -> шардируем запись\nINCR  counter:post42:{random 0..15}\n// чтение = сумма шардов\nMGET  counter:post42:0 ... :15  -> sum\n\n// лидерборд на ZSET\nZADD     leaderboard 9500 \"player:7\"\nZREVRANGE leaderboard 0 9 WITHSCORES   // топ-10\nZREVRANK  leaderboard \"player:7\"        // мой ранг, O(log N)"
 },
 {
  "id": "sd-payment-ledger",
  "t": "System Design",
  "s": "Кейсы II",
  "q": "Спроектируй платёжный леджер: почему double-entry, как гарантировать exactly-once списание и аудит?",
  "a": "Леджер — immutable журнал проводок (append-only), а не таблица с изменяемым балансом. Каждая транзакция — две записи (debit одного счёта, credit другого), их сумма всегда = 0 — это инвариант, который ловит баги. Списание делаем атомарно в одной БД-транзакции вместе с insert проводок; идемпотентность — по client-supplied request_id (UNIQUE), чтобы ретрай не списал дважды.",
  "d": "Баланс счёта = сумма всех проводок (можно материализовать в snapshot-таблицу для скорости, но source of truth — журнал). Изменять прошлые проводки нельзя — ошибку правят компенсирующей (reversal) проводкой, чтобы аудит видел всю историю.",
  "code": "-- идемпотентность на уровне БД\nCREATE TABLE entries (\n  id BIGSERIAL PRIMARY KEY,\n  request_id UUID UNIQUE NOT NULL, -- дубль ретрая словит конфликт\n  account_id BIGINT NOT NULL,\n  amount NUMERIC(20,4) NOT NULL,  -- + credit / - debit\n  tx_id UUID NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT now()\n);\n-- инвариант: SUM(amount) по одному tx_id = 0"
 },
 {
  "id": "sd-chat-delivery",
  "t": "System Design",
  "s": "Кейсы II",
  "q": "Спроектируй мессенджер: как гарантировать доставку и порядок сообщений, если получатель оффлайн?",
  "a": "Сообщение сначала персистится на сервере (write-ahead), потом раздаётся. Онлайн-клиенты получают пуш через WebSocket; оффлайн — забирают из mailbox/inbox при реконнекте по last_seen_seq. Порядок гарантируется монотонным per-conversation seq_id, который присваивает сервер, а не временем клиента (часы рассинхронены).",
  "d": "Доставка — at-least-once: клиент шлёт ACK, сервер ретраит до ACK; на клиенте дедуп по message_id. Двойные галочки = sent (на сервере), delivered (ACK устройства), read (read-receipt).",
  "code": "// порядок в рамках чата задаёт сервер\nlong seq = redis.incr(\"conv:\" + convId + \":seq\");\nmsg.setSeq(seq);\ndb.persist(msg);            // 1. сначала durable\nfanout.push(convId, msg);   // 2. потом раздача онлайн-клиентам\n// оффлайн-клиент при реконнекте:\n// GET /sync?conv=X&afterSeq=lastSeenSeq"
 },
 {
  "id": "sd-chat-presence",
  "t": "System Design",
  "s": "Кейсы II",
  "q": "Как сделать presence (онлайн/оффлайн, печатает…) в мессенджере на миллионы юзеров?",
  "a": "Presence — эфемерное состояние, его НЕ хранят в основной БД. Клиент шлёт heartbeat раз в ~30с, сервер кладёт ключ в Redis с TTL чуть больше интервала. Нет heartbeat → ключ протух → юзер offline. «Печатает…» — fire-and-forget событие без персиста, с коротким TTL на клиенте.",
  "d": "Фан-аут presence только подписчикам (друзья/участники чата), а не всем — иначе O(N²) трафика. На дисконнекте WS можно слать explicit offline, но TTL — страховка от пропавших соединений.",
  "code": "// heartbeat: TTL > интервала, иначе ложный offline\nredis.setex(\"presence:\" + userId, 45, \"online\"); // ttl 45s, beat 30s\n// читатель статуса:\nboolean online = redis.exists(\"presence:\" + userId);\n// typing — без персиста, отдельный канал\nfanout.publish(\"typing:\" + convId, userId);"
 },
 {
  "id": "sd-object-storage-upload",
  "t": "System Design",
  "s": "Кейсы II",
  "q": "Спроектируй загрузку больших файлов в объектное хранилище: зачем pre-signed URL и chunking?",
  "a": "Клиент НЕ грузит файл через ваш бэкенд — это убьёт пропускную способность. Бэкенд выдаёт pre-signed URL (временную подпись на PUT в S3/MinIO), и клиент льёт байты напрямую в хранилище. Большие файлы режут на chunks (multipart upload): части грузятся параллельно, упавшую перезаливают отдельно, в конце CompleteMultipartUpload собирает их в объект.",
  "d": "Раздача наоборот: pre-signed GET или публичный объект за CDN — статика кэшируется на edge, origin не нагружается. Метаданные (owner, размер, статус) — в вашей БД, сами байты — в хранилище.",
  "code": "// бэкенд только подписывает, байты идут мимо него\nPresignedPutObjectArgs args = PresignedPutObjectArgs.builder()\n  .bucket(\"uploads\").object(key)\n  .expiry(15, TimeUnit.MINUTES)   // короткоживущая ссылка\n  .build();\nString url = minio.getPresignedObjectUrl(args);\n// клиент: PUT <url> с телом файла напрямую в MinIO"
 },
 {
  "id": "sd-autocomplete-search",
  "t": "System Design",
  "s": "Кейсы II",
  "q": "Спроектируй автодополнение и поиск: где trie, где инвертированный индекс, в чём разница?",
  "a": "Это разные задачи. Автодополнение — префиксное: «как продолжить начатое слово» — тут trie (префиксное дерево), где в узлах хранят top-K популярных продолжений. Полнотекстовый поиск — «найди документы со словами» — тут инвертированный индекс: слово → список документов, где оно встречается. Префиксы быстрые, потому что они precomputed, а не считаются на лету.",
  "d": "Часто trie заменяют на готовый движок (Elasticsearch completion suggester / edge n-grams) — он же даёт ранжирование и опечатки. Голый trie хорош для понимания, в проде редко пишут руками.",
  "code": "// инвертированный индекс: терм -> постинг-лист\n// \"акция\"  -> [doc1, doc7, doc12]\n// \"облигация\" -> [doc3, doc7]\n// поиск \"акция облигация\" = пересечение листов -> [doc7]\n\n// trie для префикса: каждый узел хранит top-K\n// 'a'->'ак'->'акц'  node.top = [\"акция\", \"акции\", \"акционер\"]"
 },
 {
  "id": "sd-distributed-cache",
  "t": "System Design",
  "s": "Кейсы II",
  "q": "Спроектируй распределённый кэш: зачем консистентное хеширование, как бороться с cache stampede и инвалидацией?",
  "a": "Ключи раскладывают по узлам консистентным хешированием: при добавлении/удалении узла перераспределяется лишь ~1/N ключей, а не весь кэш (как при mod N). Инвалидация — обычно TTL + явное удаление при записи в БД (или write-through). Cache stampede (тысячи промахов по горячему ключу одновременно бьют в БД) лечат блокировкой пересчёта (single-flight) и/или ранним рефрешем до истечения TTL.",
  "d": "Виртуальные узлы (vnodes) выравнивают нагрузку на кольце, иначе один узел получит непропорционально много ключей. Согласованность кэш↔БД всегда eventual — выбирай стратегию (cache-aside / write-through) под допустимый stale.",
  "code": "// single-flight против stampede: только один поток считает\nValue v = cache.get(key);\nif (v == null) {\n  if (lock.tryLock(key)) {        // остальные ждут\n    try { v = db.load(key); cache.set(key, v, ttl); }\n    finally { lock.unlock(key); }\n  } else { v = cache.awaitOrStale(key); }\n}"
 },
 {
  "id": "bld-lifecycle-phases",
  "t": "Build",
  "s": "Maven",
  "q": "Что такое фазы lifecycle в Maven и почему `mvn package` запускает ещё и compile с test?",
  "a": "Lifecycle — это упорядоченная цепочка фаз: validate → compile → test → package → verify → install → deploy. Когда ты вызываешь любую фазу, Maven выполняет ВСЕ предыдущие по порядку, а не только названную. Поэтому `mvn package` сначала compile и test, и лишь потом собирает артефакт.",
  "d": "Фаз технически больше (process-resources, prepare-package и т.д.), но эти 7 — основные опорные точки. К каждой фазе привязаны goal'ы плагинов, которые и делают реальную работу.",
  "code": "validate → compile → test → package → verify → install → deploy\n\nmvn install   # пройдёт validate,compile,test,package,verify,install\nmvn test -DskipTests=false  # дойдёт только до test"
 },
 {
  "id": "bld-dependency-scopes",
  "t": "Build",
  "s": "Maven",
  "q": "Чем отличаются scope'ы compile, provided, runtime и test? Где провайдится provided?",
  "a": "Scope управляет тем, на каких этапах (compile/test/runtime) зависимость доступна и попадёт ли в финальный артефакт. `compile` — везде и в пакете. `provided` — на компиляции есть, но в рантайме его даёт контейнер/сервер. `runtime` — нет на компиляции, есть в рантайме (драйверы). `test` — только в тестах.",
  "d": "По умолчанию scope = compile. `provided` и `test` НЕ транзитивны и НЕ попадают в fat-jar. Классика provided — Servlet API: его даёт сервлет-контейнер (Tomcat).",
  "code": "<dependency>\n  <groupId>org.postgresql</groupId>\n  <artifactId>postgresql</artifactId>\n  <scope>runtime</scope> <!-- драйвер не нужен на компиляции -->\n</dependency>"
 },
 {
  "id": "bld-version-mediation",
  "t": "Build",
  "s": "Maven",
  "q": "Две транзитивные зависимости тянут разные версии одной библиотеки. Какую возьмёт Maven?",
  "a": "Maven использует правило «nearest wins» — побеждает версия, которая ближе к корню дерева зависимостей (меньше уровней транзитивности). При равной глубине выигрывает та, что объявлена раньше в pom. Проигравшая помечается «omitted for conflict».",
  "d": "Это НЕ «highest version wins» (как у Gradle по умолчанию). Maven смотрит на расстояние в дереве, а не на номер версии. Поэтому ближняя 1.0 победит дальнюю 2.0.",
  "code": "mvn dependency:tree -Dverbose\n# (lib:2.0:compile - omitted for conflict with 1.0)\n#  ← 1.0 ближе к корню, поэтому победила"
 },
 {
  "id": "bld-dependency-management-bom",
  "t": "Build",
  "s": "Maven",
  "q": "Зачем dependencyManagement, если версию можно указать прямо в dependency? Что такое BOM?",
  "a": "`dependencyManagement` централизованно ФИКСИРУЕТ версии (и scope/exclusions), но сам зависимость не подключает — модули объявляют её без версии и берут зафиксированную. BOM (Bill of Materials) — это специальный pom, который через `<scope>import</scope>` подтягивает целый набор согласованных версий (например, Quarkus BOM).",
  "d": "dependencyManagement переопределяет nearest-wins: версия оттуда применяется к ЛЮБОЙ транзитивной зависимости, независимо от глубины. BOM импортируется в секцию dependencyManagement.",
  "code": "<dependencyManagement>\n  <dependencies>\n    <dependency>\n      <groupId>io.quarkus.platform</groupId>\n      <artifactId>quarkus-bom</artifactId>\n      <version>3.23.3</version>\n      <type>pom</type>\n      <scope>import</scope>\n    </dependency>\n  </dependencies>\n</dependencyManagement>"
 },
 {
  "id": "bld-multimodule-reactor",
  "t": "Build",
  "s": "Maven",
  "q": "Что такое reactor в multi-module сборке и как он понимает порядок сборки модулей?",
  "a": "Reactor — это механизм Maven, который собирает все модули multi-module проекта за один запуск. Он строит граф зависимостей между модулями и топологически сортирует их: сначала собираются те, от кого зависят другие. Порядок в `<modules>` — лишь исходный, реальный определяет граф.",
  "d": "Если module-app зависит от module-core, reactor соберёт core раньше app, даже если в `<modules>` они перечислены наоборот. Флаги `-pl` (project list), `-am` (also make) управляют частичной сборкой.",
  "code": "mvn -pl app -am install\n# -pl app  : собрать модуль app\n# -am      : + собрать модули, от которых app зависит (core)\n\nmvn -pl core -amd install  # core + всё, что зависит ОТ core"
 },
 {
  "id": "bld-plugin-goal",
  "t": "Build",
  "s": "Maven",
  "q": "В чём разница между плагином и goal'ом, и как goal связан с фазой lifecycle?",
  "a": "Плагин — это набор связанных задач (например, maven-surefire-plugin). Goal — конкретная задача внутри плагина (например, surefire:test). Реальную работу делают именно goal'ы: фаза lifecycle сама ничего не делает, к ней лишь ПРИВЯЗАНЫ goal'ы плагинов, которые и выполняются.",
  "d": "Можно звать goal напрямую `mvn compiler:compile` (плагин:goal) или через фазу `mvn compile`, к которой этот goal привязан по умолчанию. Привязка задаётся в `<executions>` или дефолтами packaging.",
  "code": "mvn surefire:test          # goal напрямую: плагин:goal\nmvn test                   # фаза → к ней привязан goal surefire:test\n\n<execution>\n  <phase>package</phase>\n  <goals><goal>shade</goal></goals>\n</execution>"
 },
 {
  "id": "bld-profiles",
  "t": "Build",
  "s": "Maven",
  "q": "Что такое профили Maven и чем активация по `-P` отличается от `activeByDefault`?",
  "a": "Профиль — это именованный набор переопределений (зависимости, плагины, свойства, properties), включаемый по условию: явно через `-Pname`, по property, по JDK, по OS или по отсутствию файла. Он позволяет менять сборку под окружение (dev/prod) без правки основного pom.",
  "d": "Грабли: `activeByDefault` отключается, как только активирован ЛЮБОЙ другой профиль из этого pom через `-P` — это неинтуитивно и ломает сборки.",
  "code": "<profile>\n  <id>prod</id>\n  <activation>\n    <property><name>env</name><value>prod</value></property>\n  </activation>\n  <properties><db.url>jdbc:postgresql://prod</db.url></properties>\n</profile>\n\nmvn package -Pprod        # явно\nmvn package -Denv=prod    # по property"
 },
 {
  "id": "bld-fatjar-shade-relocation",
  "t": "Build",
  "s": "Maven",
  "q": "Чем shade отличается от assembly при сборке fat-jar и зачем нужен relocation?",
  "a": "И shade, и assembly собирают fat-jar (uber-jar) — один jar со всеми зависимостями внутри. assembly просто распаковывает классы зависимостей рядом. shade умнее: корректно мержит файлы из META-INF/services (SPI) и умеет relocation — переименование пакетов зависимости, чтобы избежать конфликта версий. Relocation спасает от «dependency hell», когда две либы тянут разные версии общей.",
  "d": "Без мержа SPI-дескрипторов fat-jar часто ломается (теряются ServiceLoader-провайдеры). Поэтому для shadow-jar предпочитают shade, а не assembly.",
  "code": "<configuration>\n  <relocations>\n    <relocation>\n      <pattern>com.google.guava</pattern>\n      <shadedPattern>myapp.shaded.guava</shadedPattern>\n    </relocation>\n  </relocations>\n</configuration>"
 },
 {
  "id": "bld-impl-vs-api",
  "t": "Build",
  "s": "Gradle и зависимости",
  "q": "В Gradle: чем `implementation` отличается от `api` и почему `api` «протекает»?",
  "a": "`implementation` — зависимость видна только внутри модуля: потребители твоего модуля её НЕ видят в своём compile classpath. `api` — зависимость утекает дальше: она попадает в compile classpath всех, кто зависит от тебя. `api` «протекает», потому что транзитивно навязывает свою библиотеку (и её версию) всем выше по цепочке.",
  "d": "Правило: ставь `api` только если тип из этой зависимости реально торчит в твоём публичном API (в сигнатуре public-метода, возвращаемом типе, параметре). Всё остальное — `implementation`. Это режет classpath потребителей и ускоряет инкрементальную пересборку: меняешь internal-зависимость — пересобирается только твой модуль, а не полмира.",
  "code": "// build.gradle модуля :service\ndependencies {\n    // утечёт всем, кто зависит от :service\n    api 'com.google.guava:guava:33.0.0-jre'\n    // видно только внутри :service\n    implementation 'org.apache.commons:commons-lang3:3.14.0'\n}"
 },
 {
  "id": "bld-version-resolution",
  "t": "Build",
  "s": "Gradle и зависимости",
  "q": "Две транзитивки тянут разные версии одной либы. Какую возьмёт Gradle и как это зафиксировать?",
  "a": "По умолчанию Gradle выбирает САМУЮ ВЫСОКУЮ из запрошенных версий (highest-version-wins), а не первую найденную. Зафиксировать жёстко можно через `constraints` или `dependency` со `strictly`. Это отличается от Maven, который берёт «ближайшую в дереве» (nearest-wins).",
  "d": "`constraints` объявляют политику версий, не добавляя саму зависимость в classpath: версия применится, только если эта либа реально кем-то притянута транзитивно. `strictly` — это уже жёсткое требование: если кто-то просит несовместимую версию, сборка падает с конфликтом, а не молча «сглаживает».",
  "code": "dependencies {\n    constraints {\n        // если jackson притянут транзитивно — будет ровно эта версия\n        implementation('com.fasterxml.jackson.core:jackson-databind:2.17.1')\n    }\n    implementation('org.example:lib') {\n        version { strictly '1.4.0' } // жёстко, иначе конфликт-фейл\n    }\n}"
 },
 {
  "id": "bld-build-cache",
  "t": "Build",
  "s": "Gradle и зависимости",
  "q": "Что такое build cache и инкрементальность в Gradle? Почему «чистая сборка каждый раз» — антипаттерн?",
  "a": "Gradle кэширует РЕЗУЛЬТАТЫ тасков по хэшу их входов (исходники, classpath, флаги). Если входы не менялись — таск помечается UP-TO-DATE и не запускается (инкрементальность). Build cache идёт дальше: переиспользует результат даже после `clean` или на другой машине/CI по тому же ключу. `clean build` каждый раз выкидывает всю эту экономию.",
  "d": "Локальный кэш живёт в `~/.gradle/caches`, удалённый (shared) — общий на команду/CI, чтобы один сборщик закэшировал, а остальные скачали готовое. Для корректности таск должен быть «правильно объявлен»: все входы/выходы декларированы, иначе кэш отдаст устаревший или неверный результат.",
  "code": "# gradle.properties\norg.gradle.caching=true\norg.gradle.configuration-cache=true\n\n# увидеть, что пересобиралось и почему\n./gradlew build --info | grep -i 'UP-TO-DATE\\|FROM-CACHE'"
 },
 {
  "id": "bld-gradle-vs-maven",
  "t": "Build",
  "s": "Gradle и зависимости",
  "q": "Gradle vs Maven — когда что выбрать, и в чём принципиальная разница модели?",
  "a": "Maven — декларативный XML с жёстким фиксированным жизненным циклом (фазы compile→test→package), предсказуемый и единообразный. Gradle — программируемый граф тасков (Groovy/Kotlin DSL) с инкрементальностью и build cache, быстрее на больших мультимодульных и кастомных сборках. Бери Maven за простоту и конвенции; Gradle — за скорость, гибкость и сложные пайплайны.",
  "d": "Ключевая разница в разрешении версий: Maven — nearest-wins (ближайшая в дереве), Gradle — highest-wins (наибольшая) плюс rich versions и constraints. Maven понятнее junior'у и его XML тривиально читается тулзами; Gradle мощнее, но скрипт легко превратить в нечитаемый код."
 },
 {
  "id": "bld-dependency-tree",
  "t": "Build",
  "s": "Gradle и зависимости",
  "q": "`NoSuchMethodError` в рантайме. Как найти, кто и какую версию транзитивно притащил?",
  "a": "Строишь дерево зависимостей: `mvn dependency:tree` или `./gradlew :module:dependencies`. Ищешь, откуда приходит конфликтная либа и какая версия победила (Maven помечает `omitted for conflict`, Gradle показывает стрелку `2.15 -> 2.17`). Точечно — `mvn dependency:tree -Dincludes=group:artifact` или `./gradlew dependencyInsight --dependency artifact`.",
  "d": "`NoSuchMethodError`/`NoSuchMethodError`/`ClassNotFoundException` почти всегда = в classpath одна версия, а компилировалось против другой (метод появился/исчез между версиями). Лечится фиксацией версии (constraints/dependencyManagement) или исключением транзитивки через `exclude`.",
  "code": "# Maven: кто тянет jackson и какая версия выиграла\nmvn dependency:tree -Dincludes=com.fasterxml.jackson.core:jackson-databind\n\n# Gradle: почему именно эта версия\n./gradlew :app:dependencyInsight --dependency jackson-databind"
 },
 {
  "id": "bld-semver-classpath",
  "t": "Build",
  "s": "Gradle и зависимости",
  "q": "Что такое semver, какие версии ломают совместимость, и почему «работает у меня» из-за classpath?",
  "a": "Semver = MAJOR.MINOR.PATCH: MAJOR ломает обратную совместимость (breaking), MINOR добавляет фичи без поломок, PATCH — багфиксы. «Работает у меня» возникает, когда на двух машинах в classpath оказались разные эффективные версии транзитивки (разный lock, кэш, порядок разрешения) — код тот же, а байткод-зависимость разная.",
  "d": "Защита от дрейфа версий — lock-файлы: Maven через явный `dependencyManagement`/`maven-enforcer`, Gradle через `dependency locking` (`gradle.lockfile`). Они фиксируют ТОЧНЫЕ версии всего графа, чтобы CI, прод и локалка собирали идентичный classpath, а не «что разрешилось сегодня».",
  "code": "# Gradle: включить и записать lock\n./gradlew dependencies --write-locks\n# dependency locking в build.gradle\ndependencyLocking { lockAllConfigurations() }"
 },
 {
  "id": "rx-streams-api",
  "t": "Reactive",
  "s": "Основы",
  "q": "Из чего состоит Reactive Streams? Назови 4 интерфейса и их контракт.",
  "a": "Стандарт из 4 интерфейсов: Publisher (источник), Subscriber (потребитель), Subscription (связь между ними с request/cancel) и Processor (Subscriber+Publisher одновременно). Контракт жёсткий: Subscriber получает onSubscribe → 0..N onNext → ровно один onComplete ИЛИ onError, и больше ничего. Без вызова subscription.request(n) Publisher не имеет права слать onNext — это и есть backpressure.",
  "d": "В Java стандарт живёт как java.util.concurrent.Flow (Java 9+) — те же 4 интерфейса, байт-в-байт совместимы с Reactive Streams. Reactor (Mono/Flux) и RxJava — реализации поверх этого контракта.",
  "code": "public interface Subscriber<T> {\n  void onSubscribe(Subscription s);\n  void onNext(T item);\n  void onError(Throwable t);\n  void onComplete();\n}\n// Subscription:\n//   void request(long n);  // запросить n элементов\n//   void cancel();"
 },
 {
  "id": "rx-backpressure",
  "t": "Reactive",
  "s": "Основы",
  "q": "Что такое backpressure и зачем он нужен? Что будет без него?",
  "a": "Backpressure — механизм, которым медленный потребитель говорит быстрому источнику «притормози, я не успеваю». Без него быстрый Publisher переполнит буфер/память медленного Subscriber → OutOfMemory или растущая очередь и латенси. В Reactive Streams это встроено: source не шлёт больше, чем Subscriber запросил через request(n).",
  "d": "Backpressure нужен только когда источник в принципе можно затормозить (pull-источник: БД, файл). Если источник push-only (клики мыши, котировки биржи в реальном времени) — затормозить нельзя, и тогда применяют стратегии: buffer/drop/latest/error."
 },
 {
  "id": "rx-overflow-strategies",
  "t": "Reactive",
  "s": "Основы",
  "q": "Источник нельзя затормозить (push-only). Какие стратегии overflow и когда что?",
  "a": "Четыре базовых: BUFFER (копим в очередь — рискуем памятью), DROP (новые элементы выкидываем, когда нет спроса), LATEST (храним только последний, остальные затираем), ERROR (сразу падаем с MissingBackpressureException). Выбор зависит от того, что важнее: полнота данных, свежесть или защита памяти.",
  "code": "// Reactor\nFlux.create(sink -> ...,\n    FluxSink.OverflowStrategy.LATEST)\n// или операторы:\nflux.onBackpressureBuffer(1000)\n    .onBackpressureDrop()\n    .onBackpressureLatest();"
 },
 {
  "id": "rx-push-pull",
  "t": "Reactive",
  "s": "Основы",
  "q": "Чем reactive отличается от обычного pull (Iterator) и от чистого push? Что даёт request(n)?",
  "a": "Iterator — чистый pull: потребитель сам тянет next(), источник пассивен, но всё синхронно и блокирующе. Чистый push — источник сам шлёт, потребитель не управляет темпом (риск перегрузки). Reactive Streams — гибрид «push с разрешения»: данные приходят асинхронно (push), но только в объёме request(n) (pull-управление спросом).",
  "d": "Поэтому модель называют dynamic push-pull. Когда Subscriber быстрый и запрашивает много — это эффективно как push. Когда медленный и запрашивает по чуть-чуть — деградирует до безопасного pull. Один контракт покрывает оба случая."
 },
 {
  "id": "rx-hot-cold",
  "t": "Reactive",
  "s": "Основы",
  "q": "Hot vs cold publisher — в чём разница? Приведи примеры каждого.",
  "a": "Cold publisher стартует работу заново под каждого подписчика и проигрывает ему весь поток с начала (HTTP-запрос, чтение файла, БД-запрос). Hot publisher эмитит независимо от подписчиков, и новый подписчик видит только то, что идёт сейчас, пропустив прошлое (котировки биржи, клики мыши, Kafka-топик в реальном времени). Cold = «свой сеанс каждому», hot = «общая трансляция».",
  "d": "В Reactor холодный Flux можно сделать горячим через .share()/.publish().refCount() или ConnectableFlux. Sinks.many().multicast() — типичный горячий источник.",
  "code": "// COLD: каждый subscribe → новый HTTP-вызов\nFlux<User> cold = webClient.get()...retrieve()...;\n\n// HOT: общий источник, share()\nFlux<Tick> hot = priceFeed.share();\n// поздний подписчик пропустит ранние тики"
 },
 {
  "id": "rx-vs-imperative-loom",
  "t": "Reactive",
  "s": "Основы",
  "q": "Reactive vs императив и vs виртуальные потоки (Loom) — что реально даёт и когда что выбрать?",
  "a": "Reactive (vs блокирующий императив) даёт высокую конкурентность на немногих потоках без блокировок + встроенный backpressure и богатую композицию async-операторов. Но ценой сложного нелинейного кода и тяжёлой отладки. Виртуальные потоки (Java 21) дают ту же дешёвую конкурентность, оставляя код простым синхронным — но без backpressure и без операторного конвейера из коробки.",
  "d": "Практика 2024+: для большинства IO-bound сервисов на Java 21 виртуальные потоки проще и достаточны. Reactive оправдан, когда реально нужны backpressure, потоковая обработка событий, сложная async-композиция (merge/zip/retry/window) или уже есть reactive-стек (WebFlux/Reactor).",
  "code": "// Императив на virtual threads (Java 21) — просто:\ntry (var ex = Executors.newVirtualThreadPerTaskExecutor()) {\n  ex.submit(() -> { var u = http.get();   // блокирует\n                    var o = db.find(u); });// поток дешёвый\n}\n// Reactive — async-композиция, но нелинейно:\nMono.fromCallable(...).flatMap(u -> db.find(u))\n   .retry(3).timeout(Duration.ofSeconds(2));"
 },
 {
  "id": "rx-mono-flux-uni-multi",
  "t": "Reactive",
  "s": "Reactor / Mutiny",
  "q": "В чём разница Mono и Flux в Reactor? А Uni и Multi в Mutiny — это про то же самое?",
  "a": "Mono — это поток на 0 или 1 элемент (как Optional, но асинхронный и ленивый), Flux — на 0..N элементов (как асинхронный Stream). В Mutiny ровно та же дихотомия: Uni — 0..1, Multi — 0..N. Mono ⇄ Uni, Flux ⇄ Multi.",
  "d": "Mono используют для запросов с одним ответом (find by id, save, count), Flux — для стримов (список, server-sent events, постраничная выгрузка). Uni из Mutiny по семантике ближе к CompletionStage: один результат или ошибка.",
  "code": "Mono<User> u = repo.findById(id);      // 0..1\nFlux<User> all = repo.findAll();       // 0..N\n// Mutiny:\nUni<User> u2 = repo.findById(id);      // 0..1\nMulti<User> all2 = repo.streamAll();   // 0..N"
 },
 {
  "id": "rx-map-flatmap-concatmap",
  "t": "Reactive",
  "s": "Reactor / Mutiny",
  "q": "map vs flatMap vs concatMap — когда что? Чем flatMap опасен по порядку?",
  "a": "map — синхронное преобразование значения 1→1 (T→R). flatMap — на каждый элемент создаёт внутренний паблишер и подписывается на много сразу: конкурентно, порядок НЕ гарантирован. concatMap — то же, но строго по одному, последовательно: порядок сохранён, но без параллелизма.",
  "d": "Если внутренняя операция асинхронная (вызов сервиса, запрос в БД) — нужен flat/concat, потому что результат сам обёрнут в Mono/Flux и map оставил бы Flux<Mono<R>>. Между ними выбор: важен порядок и ограничение нагрузки → concatMap; важна скорость и порядок безразличен → flatMap.",
  "code": "// map: 1->1, синхронно\nflux.map(x -> x * 2);\n// flatMap: подписка на N внутренних сразу, порядок не гарантирован\nflux.flatMap(id -> webClient.get(id));\n// concatMap: по одному, порядок сохранён\nflux.concatMap(id -> webClient.get(id));"
 },
 {
  "id": "rx-zip-merge-combine",
  "t": "Reactive",
  "s": "Reactor / Mutiny",
  "q": "zip, merge и combineLatest — чем отличаются при объединении потоков?",
  "a": "merge — сливает несколько потоков в один по мере прихода элементов, без пар, порядок межпоточный не гарантирован. zip — ждёт по одному элементу из КАЖДОГО источника и собирает кортеж (попарно, по индексу). combineLatest — на каждый новый элемент любого источника выдаёт комбинацию последних значений всех.",
  "d": "zip удобен для «дождись и А, и Б, потом собери ответ» (как параллельные вызовы двух сервисов). merge — для слияния однородных событий из разных источников. combineLatest — для реактивных форм/состояний, где важно «последнее известное» каждого входа.",
  "code": "// zip: ждёт по элементу из обоих, собирает пару\nMono.zip(userMono, balanceMono)\n    .map(t -> new Dto(t.getT1(), t.getT2()));\n// merge: чередует по готовности\nFlux.merge(fluxA, fluxB);\n// combineLatest: последние значения каждого\nFlux.combineLatest(a, b, (x, y) -> x + y);"
 },
 {
  "id": "rx-error-handling",
  "t": "Reactive",
  "s": "Reactor / Mutiny",
  "q": "onErrorReturn vs onErrorResume vs retry vs retryWhen — когда какой?",
  "a": "onErrorReturn — подменить ошибку статичным fallback-значением. onErrorResume — переключиться на другой паблишер (например, запасной источник). retry(n) — переподписаться на источник заново n раз сразу. retryWhen — гибкий ретрай с управлением задержками/бэкоффом/условием через companion-поток.",
  "d": "Важно: в reactive ошибка — это терминальный сигнал, он гасит поток. try/catch вокруг цепочки не ловит асинхронную ошибку — её обрабатывают только операторами. retry именно ПЕРЕПОДПИСЫВАЕТСЯ (повторяет всё с начала источника), а не продолжает с места падения.",
  "code": "webClient.get()\n  .retryWhen(Retry.backoff(3, Duration.ofMillis(200)))\n  .onErrorResume(TimeoutException.class,\n        e -> fallbackService.get())   // запасной поток\n  .onErrorReturn(Defaults.EMPTY);     // последний рубеж"
 },
 {
  "id": "rx-cold-nothing-without-subscribe",
  "t": "Reactive",
  "s": "Reactor / Mutiny",
  "q": "«Ничего не происходит, пока нет subscribe» — что это значит и почему cold?",
  "a": "Publisher (Mono/Flux/Uni/Multi) — это рецепт, а не результат. Пока кто-то не вызовет subscribe(), цепочка операторов НЕ выполняется: ни map, ни запрос в БД, ни HTTP-вызов не стартуют. Поэтому такие потоки называют cold — каждый подписчик запускает выполнение заново, с нуля.",
  "d": "Это лень (lazy). Cold-поток на каждого подписчика заново «проигрывает» данные (новый HTTP-запрос на каждый subscribe). Hot-поток (например, через .share()/Sink) вещает один источник на всех и не перезапускается. Забыть subscribe = тихо ничего не сделать — частая ошибка.",
  "code": "Mono<Void> save = repo.save(entity); // ещё НИЧЕГО не сохранено!\n// без subscribe — операция не выполнится\nsave.subscribe();                    // вот теперь стартовало\n// в Quarkus/Spring WebFlux subscribe делает фреймворк, вернув поток из контроллера"
 },
 {
  "id": "rx-schedulers-blocking",
  "t": "Reactive",
  "s": "Reactor / Mutiny",
  "q": "subscribeOn vs publishOn — на каком потоке бежит код? И почему блокирующий вызов в цепочке роняет сервис?",
  "a": "По умолчанию вся цепочка бежит на потоке, вызвавшем subscribe(). subscribeOn задаёт поток ИСТОЧНИКА (влияет вверх по цепочке), publishOn переключает поток для операторов НИЖЕ себя. Это критично из-за блокировок: event-loop держит ≈ число ядер потоков, и блокирующий вызов (JDBC, Thread.sleep, .block()) на нём замораживает весь сервис. Блокирующее уносим на boundedElastic.",
  "d": "subscribeOn — один на цепочку, обычно ближе к источнику (несколько = баг, побеждает первый). publishOn можно ставить много раз — каждый новая граница потока. Блокирующий код оборачиваем в Mono.fromCallable(...).subscribeOn(boundedElastic()). BlockHound в тестах ловит блокировку на non-blocking планировщике; в Quarkus есть @Blocking.",
  "code": "// publishOn переключает поток ниже себя; subscribeOn — поток источника\nflux.subscribeOn(Schedulers.boundedElastic()) // источник на эластике\n    .publishOn(Schedulers.parallel())          // дальше — parallel\n    .map(x -> x + 1);\n// ПЛОХО: jdbcCall() блокирует event-loop\nflux.flatMap(id -> Mono.fromCallable(() -> jdbcCall(id)));\n// ХОРОШО: блокирующее уносим на эластичный пул\nflux.flatMap(id -> Mono.fromCallable(() -> jdbcCall(id))\n        .subscribeOn(Schedulers.boundedElastic()));"
 },
 {
  "id": "grpc-codegen-idl",
  "t": "Web",
  "s": "gRPC / Protobuf",
  "q": "Что такое .proto и почему gRPC называют contract-first?",
  "a": "`.proto` — это IDL (язык описания интерфейса): ты в одном файле декларативно описываешь сообщения и сервисы, а компилятор `protoc` генерирует код клиента и сервера для любого языка. Контракт первичен: сначала схема, потом реализация — поэтому contract-first. Сервер и клиент на разных языках гарантированно совместимы, потому что оба родились из одного файла.",
  "d": "В REST контракт чаще описывают постфактум (OpenAPI по уже написанному коду), и легко разъехаться. В gRPC `.proto` — единственный источник правды, расхождение невозможно на уровне типов.",
  "code": "syntax = \"proto3\";\npackage trade;\n\nmessage Order { string id = 1; int64 qty = 2; }\nmessage OrderResp { string status = 1; }\n\nservice OrderService {\n  rpc Place(Order) returns (OrderResp);\n}\n// protoc --java_out=. --grpc-java_out=. order.proto"
 },
 {
  "id": "grpc-http2",
  "t": "Web",
  "s": "gRPC / Protobuf",
  "q": "Почему gRPC построен поверх HTTP/2, а не HTTP/1.1?",
  "a": "HTTP/2 даёт мультиплексирование: десятки RPC летят параллельно по одному TCP-соединению без head-of-line блокировки на уровне приложения. Плюс бинарный фрейминг (а не текст) и сжатие заголовков HPACK — это дёшево и быстро. А ещё HTTP/2 умеет потоки в обе стороны, что и делает возможным streaming-вызовы gRPC.",
  "d": "В HTTP/1.1 на одно соединение — один запрос в момент времени; параллелизм достигается пулом соединений. HTTP/2 же гоняет много логических stream'ов в одном соединении, каждый RPC = один stream."
 },
 {
  "id": "grpc-call-types",
  "t": "Web",
  "s": "gRPC / Protobuf",
  "q": "Какие 4 типа вызовов есть в gRPC и чем они отличаются?",
  "a": "Unary — обычный запрос-ответ (один к одному). Server-streaming — один запрос, поток ответов (подписка, выгрузка списка). Client-streaming — поток запросов, один ответ (загрузка чанками, агрегация). Bidirectional — оба шлют потоки независимо по одному соединению (чат, realtime). Всё это возможно благодаря двунаправленным stream'ам HTTP/2.",
  "code": "service Quotes {\n  rpc Get(Sym) returns (Quote);                    // unary\n  rpc Watch(Sym) returns (stream Quote);            // server-stream\n  rpc Upload(stream Tick) returns (Summary);        // client-stream\n  rpc Chat(stream Msg) returns (stream Msg);        // bidi\n}"
 },
 {
  "id": "grpc-proto-fields",
  "t": "Web",
  "s": "gRPC / Protobuf",
  "q": "Зачем в Protobuf поля нумеруются, и почему номер важнее имени?",
  "a": "В бинарном формате на провод пишется не имя поля, а его номер (field tag) + тип. Поэтому совместимость держится на номерах: имя можно переименовать — ничего не сломается, а вот сменить номер = сломать формат. Номера 1–15 кодируются одним байтом, поэтому их берегут для частых полей.",
  "d": "Декодер по номеру понимает, в какое поле класть значение. Незнакомый номер он просто пропускает (unknown field) — это и есть фундамент forward-compatibility.",
  "code": "message Order {\n  string id    = 1;   // tag 1 — 1 байт\n  int64  qty   = 2;\n  string note  = 16;  // tag 16 — уже 2 байта\n}"
 },
 {
  "id": "grpc-schema-evolution",
  "t": "Web",
  "s": "gRPC / Protobuf",
  "q": "Как безопасно эволюционировать .proto и зачем нужен reserved?",
  "a": "Правило: добавляй новые поля с новыми номерами — старые клиенты их просто проигнорируют (forward-compat), новые увидят (backward-compat). Никогда не переиспользуй номер удалённого поля: помечай его `reserved`, чтобы компилятор не дал случайно занять старый тег и считать чужие данные своими. Удалять поля можно, менять их тип/номер — нельзя.",
  "code": "message User {\n  reserved 2, 4;            // номера выведенных полей\n  reserved \"email_old\";     // и их имена\n  string id   = 1;\n  string name = 3;\n  string mail = 5;          // новое поле — новый номер\n}"
 },
 {
  "id": "grpc-vs-rest",
  "t": "Web",
  "s": "gRPC / Protobuf",
  "q": "gRPC vs REST: где gRPC реально выигрывает, а где проигрывает?",
  "a": "gRPC выигрывает в перфомансе (бинарь + HTTP/2 + мультиплекс), в строгом контракте (codegen из .proto, типобезопасность) и в streaming. Проигрывает в дебаге (бинарь не прочитать глазами как JSON) и в браузере (нужен gRPC-Web + прокси). Грубо: внутренний service-to-service — gRPC, публичное API для браузеров/партнёров — REST/JSON."
 },
 {
  "id": "grpc-deadlines-status",
  "t": "Web",
  "s": "gRPC / Protobuf",
  "q": "Как работают deadlines, cancellation, interceptors и коды ошибок в gRPC?",
  "a": "Deadline — это абсолютное время «не позже», которое клиент кладёт в вызов; оно распространяется вниз по цепочке вызовов через контекст, и каждый сервис урезает свой бюджет. Отмена (cancel клиента или истёкший deadline) распространяется на сервер и дальше — все бросают `CANCELLED`/`DEADLINE_EXCEEDED`. Interceptors — middleware вокруг RPC (auth, логи, метрики). Ошибки — не HTTP-коды, а status codes gRPC (`OK`, `NOT_FOUND`, `UNAVAILABLE`...).",
  "d": "Важно: клиент задаёт именно deadline (момент времени), а не timeout-длительность — поэтому при пробросе через 5 сервисов дедлайн один на всю цепочку, а не сбрасывается на каждом хопе.",
  "code": "// Java client — deadline, не timeout\nstub.withDeadlineAfter(2, TimeUnit.SECONDS).place(order);\n\n// сервер ловит коды\nthrow Status.NOT_FOUND\n    .withDescription(\"order 42\")\n    .asRuntimeException();"
 },
 {
  "id": "crypto-aes-modes",
  "t": "Crypto",
  "s": "Симметрия и хеши",
  "q": "Симметричное шифрование: что такое AES, зачем режим (GCM/CBC) и при чём тут IV/nonce?",
  "a": "AES — блочный шифр: одним и тем же ключом и шифруешь, и расшифровываешь. Сам по себе он умеет шифровать ровно один блок 16 байт, поэтому нужен режим, который объединяет блоки в поток. IV/nonce — это случайное начальное значение на каждое сообщение, чтобы один и тот же текст под одним ключом давал каждый раз разный шифротекст.",
  "d": "↳ GCM (AEAD) = шифрование + встроенный тег целостности: получатель сразу видит, если шифротекст подменили. CBC даёт только конфиденциальность — целостность нужно докручивать отдельным MAC. Поэтому дефолт сегодня — AES-GCM или ChaCha20-Poly1305.",
  "code": "// AES-256-GCM, nonce 12 байт, генерим случайно на КАЖДОЕ сообщение\nbyte[] nonce = new byte[12];\nSecureRandom.getInstanceStrong().nextBytes(nonce);\nGCMParameterSpec spec = new GCMParameterSpec(128, nonce); // 128-битный тег\nCipher c = Cipher.getInstance(\"AES/GCM/NoPadding\");\nc.init(Cipher.ENCRYPT_MODE, key, spec);\nbyte[] ct = c.doFinal(plaintext); // nonce хранят рядом с ct, он не секретный"
 },
 {
  "id": "crypto-hash-properties",
  "t": "Crypto",
  "s": "Симметрия и хеши",
  "q": "Что такое криптографическая хеш-функция, какие у неё свойства и что значит «коллизия»?",
  "a": "Хеш-функция берёт любой объём данных и выдаёт строку фиксированной длины (например, SHA-256 → 32 байта). Это односторонняя операция: по хешу нельзя восстановить вход. Коллизия — это когда два разных входа дают один и тот же хеш; для стойкой функции найти её должно быть практически невозможно.",
  "d": "↳ Три свойства: preimage resistance (по хешу не найти вход), second-preimage (под заданный вход не найти второй с тем же хешем) и collision resistance (вообще не найти любую пару). Лавинный эффект: смена одного бита входа меняет ~половину битов хеша."
 },
 {
  "id": "crypto-password-hashing",
  "t": "Crypto",
  "s": "Симметрия и хеши",
  "q": "Как правильно хранить пароли: зачем соль и почему bcrypt/argon2/scrypt, а не SHA-256?",
  "a": "Пароль никогда не хранят в открытом виде и не шифруют — его хешируют специальным медленным алгоритмом для паролей. Соль — это случайное уникальное значение на каждого пользователя, которое подмешивается перед хешированием. SHA-256 не годится, потому что он спроектирован быть быстрым, а значит перебор паролей на GPU идёт миллиардами в секунду.",
  "d": "↳ Соль убивает rainbow tables и делает одинаковые пароли разными хешами в базе. bcrypt/scrypt/argon2 имеют work factor — настраиваемую 'стоимость', которую поднимают по мере роста железа. argon2 ещё и memory-hard: жрёт память, что обесценивает GPU/ASIC-фермы.",
  "code": "// Spring Security: argon2 или bcrypt из коробки\nPasswordEncoder enc = new Argon2PasswordEncoder(16, 32, 1, 1 << 16, 3);\n//                      saltLen, hashLen, parallelism, memoryKB, iterations\nString stored = enc.encode(rawPassword); // соль внутри строки, генерится сама\n// проверка:\nboolean ok = enc.matches(rawPassword, stored); // никогда не сравнивай хеши вручную"
 },
 {
  "id": "crypto-hmac",
  "t": "Crypto",
  "s": "Симметрия и хеши",
  "q": "Что такое HMAC и почему нельзя просто склеить ключ с данными и взять SHA-256?",
  "a": "HMAC — это MAC (код аутентификации сообщения) на базе хеша: берёт данные плюс секретный ключ и выдаёт тег, который доказывает и целостность (не подменили), и аутентичность (отправитель знает ключ). Наивное hash(key + message) уязвимо к length-extension атаке на SHA-2: зная хеш, можно дописать данные в конец и пересчитать тег без знания ключа. HMAC устроен с двойным хешированием специально, чтобы это закрыть.",
  "d": "↳ HMAC(K, m) = H((K⊕opad) ‖ H((K⊕ipad) ‖ m)). Внешний хеш над внутренним убивает length-extension. Проверять тег надо constant-time сравнением, иначе утечёт через тайминг.",
  "code": "Mac mac = Mac.getInstance(\"HmacSHA256\");\nmac.init(new SecretKeySpec(key, \"HmacSHA256\"));\nbyte[] tag = mac.doFinal(message);\n// проверка БЕЗ утечки по времени:\nboolean ok = MessageDigest.isEqual(tag, receivedTag); // constant-time"
 },
 {
  "id": "crypto-at-rest-in-transit",
  "t": "Crypto",
  "s": "Симметрия и хеши",
  "q": "Шифрование at-rest vs in-transit: в чём разница и зачем нужны оба?",
  "a": "In-transit — шифрование данных, пока они летят по сети (TLS/HTTPS между сервисами, клиентом и сервером). At-rest — шифрование данных, лежащих на диске (БД, бэкапы, файлы в S3/MinIO). Это защита от разных угроз: in-transit спасает от перехвата на проводе, at-rest — от того, что кто-то унесёт диск, дамп или получит доступ к storage.",
  "d": "↳ Они ортогональны и не заменяют друг друга. TLS не поможет, если злоумышленник читает файлы БД напрямую; disk encryption не поможет против man-in-the-middle в сети. Плюс есть третье — in-use (шифрование в памяти/enclave), но это уже нишевое."
 },
 {
  "id": "crypto-encrypt-vs-hash-passwords",
  "t": "Crypto",
  "s": "Симметрия и хеши",
  "q": "Частая ошибка: «давай зашифруем пароли». Почему пароли НЕ шифруют, а хешируют?",
  "a": "Шифрование обратимо: есть ключ — есть открытый текст. Значит, если у тебя есть ключ для расшифровки паролей, то и у атакующего, утащившего базу вместе с ключом (а ключ обычно рядом — в конфиге, KMS, коде), будут все пароли в открытом виде. Хеширование необратимо: при логине ты хешируешь введённый пароль и сравниваешь с хранимым — оригинал тебе вообще не нужен, поэтому и хранить его нечем.",
  "d": "↳ Тебе никогда не нужно 'узнать' пароль пользователя — только проверить совпадение. Поэтому правильный инструмент — односторонний хеш для паролей (argon2/bcrypt). Шифрование уместно для данных, которые надо потом ПРОЧИТАТЬ обратно (номер карты, паспорт), а не для паролей.",
  "code": "// ❌ НЕПРАВИЛЬНО — обратимо, ключ утечёт вместе с базой\nString enc = aesEncrypt(password, secretKey); // потом можно расшифровать = плохо\n\n// ✅ ПРАВИЛЬНО — необратимо\nString hash = passwordEncoder.encode(password);          // при регистрации\nboolean ok = passwordEncoder.matches(input, storedHash); // при логине"
 },
 {
  "id": "crypto-asymmetric",
  "t": "Crypto",
  "s": "Асимметрия и PKI",
  "q": "Зачем нужны два разных ключа, если симметричный AES быстрее и проще?",
  "a": "В симметрии один и тот же ключ шифрует и расшифровывает — значит обе стороны должны как-то заранее обменяться им по защищённому каналу, а его-то и нет. Асимметрия даёт пару: публичный ключ можно раздавать всем, а приватный держишь у себя. Что зашифровано публичным — расшифруется только приватным, и наоборот. Это решает проблему первичного обмена без секретного канала.",
  "d": "↳ Асимметрия медленная (RSA в сотни раз медленнее AES), поэтому на практике ею шифруют не данные, а только маленький симметричный сеансовый ключ — дальше всё гонится через AES. Это называется гибридное шифрование, именно так работает TLS.",
  "code": "// RSA: шифруем публичным, расшифровываем приватным\nCipher c = Cipher.getInstance(\"RSA/ECB/OAEPWithSHA-256AndMGF1Padding\");\nc.init(Cipher.ENCRYPT_MODE, publicKey);   // любой может зашифровать\nbyte[] enc = c.doFinal(sessionKey);\n\nc.init(Cipher.DECRYPT_MODE, privateKey);  // только владелец расшифрует\nbyte[] sessionKey = c.doFinal(enc);"
 },
 {
  "id": "crypto-signature",
  "t": "Crypto",
  "s": "Асимметрия и PKI",
  "q": "Цифровая подпись — это шифрование? И что именно она гарантирует?",
  "a": "Нет, это отдельная операция. Ты считаешь хэш сообщения и преобразуешь его своим приватным ключом — получается подпись. Любой, у кого есть твой публичный ключ, проверяет: пересчитывает хэш сообщения и сверяет с тем, что зашита в подписи. Совпало — значит подписал именно владелец приватного ключа (аутентичность) и сообщение не меняли (целостность).",
  "d": "↳ Подписывают хэш, а не само сообщение, по двум причинам: асимметричная операция дорогая (хэш короткий и фиксированный), и так работает с данными любого размера. Поэтому стойкость подписи зависит и от хэш-функции — MD5/SHA-1 уже сломаны для подписей, нужен минимум SHA-256.",
  "code": "// Подпись приватным, проверка публичным\nSignature s = Signature.getInstance(\"SHA256withRSA\");\ns.initSign(privateKey);\ns.update(message);\nbyte[] sig = s.sign();          // подписал отправитель\n\ns.initVerify(publicKey);\ns.update(message);\nboolean ok = s.verify(sig);     // проверил получатель"
 },
 {
  "id": "crypto-dh-fs",
  "t": "Crypto",
  "s": "Асимметрия и PKI",
  "q": "Как две стороны договариваются об общем секрете по открытому каналу, где всё подслушивают?",
  "a": "Диффи-Хеллман: каждая сторона генерирует свой секрет, посылает другой публичную производную от него, и обе независимо вычисляют один и тот же общий ключ. Хитрость в математике — по перехваченным публичным значениям восстановить секрет вычислительно невозможно (дискретный логарифм). Сам секретный ключ по каналу никогда не передаётся — он рождается одновременно у обоих.",
  "d": "↳ Forward secrecy получается, если для каждой сессии генерировать новую эфемерную DH-пару (ECDHE) и выбрасывать её после. Тогда даже если потом украдут долговременный приватный ключ сервера — записанный ранее трафик не расшифровать, потому что эфемерных секретов уже нет. Без эфемерности (старый RSA key exchange) утечка ключа вскрывает весь архив перехвата.",
  "code": "// ECDH key agreement в Java\nKeyPairGenerator kpg = KeyPairGenerator.getInstance(\"EC\");\nkpg.initialize(new ECGenParameterSpec(\"secp256r1\"));\nKeyPair my = kpg.generateKeyPair();     // эфемерная пара на сессию\n\nKeyAgreement ka = KeyAgreement.getInstance(\"ECDH\");\nka.init(my.getPrivate());\nka.doPhase(peerPublicKey, true);        // публичный ключ собеседника\nbyte[] shared = ka.generateSecret();    // одинаков у обоих, не передавался"
 },
 {
  "id": "crypto-pki-chain",
  "t": "Crypto",
  "s": "Асимметрия и PKI",
  "q": "Я получил публичный ключ сервера. Откуда я знаю, что он настоящий, а не подсунут злоумышленником?",
  "a": "Сам по себе публичный ключ ничего не доказывает — его мог сгенерировать кто угодно. Доверие строится через PKI: ключ упакован в сертификат, подписанный удостоверяющим центром (CA), которому ты уже доверяешь. Браузер проверяет цепочку подписей от сертификата сервера к промежуточному CA и далее к корневому, который лежит в доверенном хранилище ОС. Если цепочка валидна и упирается в известный корень — ключу можно верить.",
  "d": "↳ Корневые CA самоподписаны и предустановлены в ОС/браузере — это якорь доверия. Промежуточные CA нужны, чтобы корневой приватный ключ держать в офлайне (бункер, HSM): им подписывают редко, а текущие сертификаты выпускают промежуточные. Если корень скомпрометирован — рушится всё, поэтому его берегут максимально.",
  "code": "# Посмотреть цепочку сертификатов сервера\nopenssl s_client -connect bank.kz:443 -showcerts\n\n# В выводе: \n#  0 s:CN=bank.kz        i:CN=Intermediate CA   <- лист\n#  1 s:CN=Intermediate   i:CN=Root CA           <- промежуточный\n# Корневой берётся из локального truststore, по сети не шлётся"
 },
 {
  "id": "crypto-tls-handshake",
  "t": "Crypto",
  "s": "Асимметрия и PKI",
  "q": "Проведи по шагам TLS-хендшейк: что в какой момент чем шифруется?",
  "a": "Сначала ClientHello/ServerHello — стороны согласуют версию и шифры, обмениваются random и эфемерными ECDHE-публичными ключами (всё открытым текстом). Сервер шлёт сертификат и подписывает свой DH-вклад приватным ключом — клиент проверяет подпись и цепочку CA. Дальше оба независимо выводят общий секрет через ECDHE и из него — симметричные сеансовые ключи. С этого момента весь трафик (application data) шифруется быстрым AES.",
  "d": "↳ Ключевой момент: асимметрия (сертификат+подпись) используется только для аутентификации сервера и согласования ключа, а реальные данные шифрует симметричный AES-GCM. В TLS 1.3 хендшейк сократили до 1-RTT: клиент шлёт ECDHE-вклад уже в ClientHello, и часть хендшейка после ServerHello тоже шифруется. RSA key exchange выпилен — только эфемерный, ради forward secrecy.",
  "code": "# TLS 1.3, упрощённо:\n# 1. Client -> ClientHello {versions, ciphers, key_share=g^c}   (открыто)\n# 2. Server -> ServerHello {key_share=g^s}                      (открыто)\n#    -> {Certificate, CertVerify=sign(privKey), Finished}       (уже шифр.)\n# 3. обе стороны: shared = ECDHE(g^c,g^s) -> AES-ключи\n# 4. Client -> Finished                                          (шифр.)\n# 5. Application Data <-> всё через AES-GCM"
 },
 {
  "id": "crypto-jwt-sign",
  "t": "Crypto",
  "s": "Асимметрия и PKI",
  "q": "Чем HS256 отличается от RS256 в JWT и почему критично проверять подпись на сервере?",
  "a": "HS256 — симметричная подпись на HMAC: один общий секрет и подписывает, и проверяет. RS256 — асимметричная: подписывают приватным ключом (только у эмитента), а проверяют публичным, который можно безопасно раздать всем сервисам. Подпись защищает payload от подмены: тело JWT всего лишь base64, не шифрование — его видно и можно отредактировать. Без проверки подписи злоумышленник просто впишет себе role=admin и пройдёт.",
  "d": "↳ HS256 хорош, когда подписывает и проверяет один и тот же сервис (общий секрет не покидает периметр). RS256 нужен, когда токены выпускает один (auth-сервер), а проверяет много независимых сервисов — им раздаёшь только публичный ключ, приватный не светишь. В микросервисах почти всегда RS256/ES256 через JWKS endpoint.",
  "code": "// Проверка RS256 публичным ключом (jjwt)\nJwts.parser()\n    .verifyWith(publicKey)        // приватный остался у auth-сервера\n    .build()\n    .parseSignedClaims(token);    // бросит исключение, если подпись битая\n\n// Заголовок JWT:\n// { \"alg\": \"RS256\", \"typ\": \"JWT\" }\n// payload — это base64, НЕ шифр: декодируется кем угодно"
 },
 {
  "id": "api-richardson-maturity",
  "t": "Web",
  "s": "API design",
  "q": "Чем «настоящий REST» отличается от «JSON по HTTP», и что меряет модель зрелости Ричардсона?",
  "a": "Большинство «REST API» — это RPC в обёртке HTTP. Модель Ричардсона раскладывает зрелость на 4 уровня: L0 — один endpoint, всё через POST (туннель); L1 — есть ресурсы (/orders/42), но глагол один; L2 — используешь HTTP-глаголы по смыслу (GET/POST/PUT/DELETE) и статус-коды; L3 — HATEOAS, ответ несёт ссылки на следующие действия. Реальный продакшен почти весь живёт на L2 — и это нормально.",
  "d": "↳ L2 — это «золотая середина»: ресурсы как существительные, глаголы как действия, коды как результат. L3 даёт самоописываемость, но цена клиентской сложности редко окупается вне гипермедийных API (типа PayPal, GitHub частично).",
  "code": "GET    /orders/42        -> 200 {...}\nPOST   /orders           -> 201 Location: /orders/43\nDELETE /orders/42        -> 204\n# L0/RPC антипаттерн:\nPOST   /api?action=getOrder&id=42"
 },
 {
  "id": "api-status-codes",
  "t": "Web",
  "s": "API design",
  "q": "Когда отдавать 201 vs 202 vs 204, и в чём принципиальная разница между 409, 422 и 400?",
  "a": "Семейство кода — это контракт: 2xx «получилось», 4xx «ты накосячил», 5xx «я накосячил». 201 Created — ресурс создан синхронно (отдай Location). 202 Accepted — приняли, но обработаем асинхронно (ещё нет результата). 204 No Content — успех без тела (типичен для DELETE/PUT-обновления). 400 — синтаксически кривой запрос; 422 — синтаксис ок, но семантика невалидна (бизнес-правило); 409 — конфликт с текущим состоянием ресурса (дубль, гонка версий).",
  "code": "POST /orders         201 + Location: /orders/43   # создано\nPOST /reports        202 + Location: /jobs/9        # в очередь\nDELETE /orders/42    204                            # без тела\nPOST /orders {qty:-5} 422 problem+json              # бизнес-невалидно\nPUT /orders/42 (If-Match устарел) 409              # конфликт версий"
 },
 {
  "id": "api-idempotency",
  "t": "Web",
  "s": "API design",
  "q": "Почему PUT и DELETE идемпотентны, POST — нет, и как сделать POST безопасным при ретраях (idempotency-key)?",
  "a": "Идемпотентность = повторить запрос N раз = эффект как от одного. PUT кладёт ресурс в конкретное состояние (повтор не меняет результат), DELETE один раз удаляет, последующие — «уже удалено» (тот же конечный эффект). POST «создай новый» по природе не идемпотентен: два POST = два заказа. Чтобы защитить POST от двойного списания при ретраях/таймаутах, клиент шлёт уникальный Idempotency-Key, сервер запоминает ключ→результат и на повтор отдаёт сохранённый ответ, не выполняя операцию заново.",
  "code": "POST /payments\nIdempotency-Key: 8f3c-a91e-...   # UUID на одну логич. операцию\n{ \"amount\": 5000 }\n\n# 1-й запрос -> 201, сервер пишет key -> response\n# ретрай с тем же key -> отдаёт сохранённый 201, БЕЗ повторного списания"
 },
 {
  "id": "api-versioning",
  "t": "Web",
  "s": "API design",
  "q": "Три способа версионировать API (URI / заголовок / content-type) — плюсы, минусы и что выбрать?",
  "a": "URI-версия (/v1/orders) — самая простая и видимая: легко тестить из браузера/curl, явно в логах, но «загрязняет» URL и формально нарушает идею «URI = ресурс». Header-версия (Api-Version: 2) — URL чистый, но невидима, тяжелее дебажить и кэшировать. Content-type / media-type версия (Accept: application/vnd.acme.order.v2+json) — самый «правильный» по REST (версионируем представление, не ресурс), но сложен для клиентов и команд. На практике для внутренних/корп-API почти всегда выигрывает URI — за прозрачность и дешевизну поддержки.",
  "code": "# 1) URI  (прагматичный дефолт)\nGET /v2/orders/42\n# 2) Header\nGET /orders/42\nApi-Version: 2\n# 3) Media-type (vendor content negotiation)\nGET /orders/42\nAccept: application/vnd.acme.order.v2+json"
 },
 {
  "id": "api-problem-json",
  "t": "Web",
  "s": "API design",
  "q": "Что такое RFC 7807 problem+json и почему «{ \"error\": \"...\" }» в каждом сервисе — это боль?",
  "a": "RFC 7807 (обновлён RFC 9457) — стандартный формат тела ошибки для HTTP API, чтобы все сервисы отвечали на ошибки одинаково. Content-Type: application/problem+json, и поля: type (URI типа ошибки), title (краткое человекочитаемое), status (дублирует HTTP-код), detail (конкретика этого случая), instance (URI этого происшествия). Можно расширять своими полями (например errors[] для валидации). Без стандарта каждый микросервис лепит свою структуру — и клиент/фронт парсит десять разных форматов.",
  "code": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/problem+json\n\n{\n  \"type\": \"https://acme.com/errors/validation\",\n  \"title\": \"Validation failed\",\n  \"status\": 422,\n  \"detail\": \"Quantity must be positive\",\n  \"instance\": \"/orders/42\",\n  \"errors\": [{\"field\":\"qty\",\"msg\":\"> 0\"}]\n}"
 },
 {
  "id": "api-resources-verbs",
  "t": "Web",
  "s": "API design",
  "q": "Как правильно проектировать ресурсы и URI: существительные vs глаголы, вложенность, действия-«не-CRUD»?",
  "a": "Ресурс — это существительное (сущность), а действие выражает HTTP-глагол, не URL. Плохо: POST /createOrder, GET /getOrders. Хорошо: POST /orders, GET /orders. Коллекции — множественное число (/orders, /orders/42/items). Вложенность показывает принадлежность, но не углубляйся дальше 1-2 уровней — потом лучше плоский ресурс с фильтром. Для действий, не ложащихся в CRUD (отменить, подтвердить), либо моделируй под-ресурс состояния, либо прагматично делай POST /orders/42/cancel — это допустимый компромисс.",
  "code": "# хорошо\nGET    /orders?status=open&clientId=7\nGET    /orders/42/items\nPOST   /orders/42/cancel        # не-CRUD действие как под-ресурс\n# плохо (глаголы в URI, RPC-стиль)\nPOST   /getOrdersByClient\nGET    /order/deleteOrder?id=42"
 },
 {
  "id": "api-pagination-cursor",
  "t": "Web",
  "s": "API эволюция",
  "q": "Почему offset-пагинация (?page=5000) разваливается на больших таблицах, а cursor/keyset — нет?",
  "a": "OFFSET N заставляет БД физически просканировать и выбросить N строк, прежде чем вернуть нужную страницу — на странице 5000 это миллионы выброшенных строк на каждый запрос. Keyset вместо «пропусти N» говорит «дай строки ПОСЛЕ вот этого значения» (WHERE id > :last_id), и индекс прыгает прямо в нужную точку за O(log n). Бонус: при вставках/удалениях offset «съезжает» и показывает дубли или пропуски, а курсор привязан к конкретной строке и стабилен.",
  "d": "Курсор обычно кодируют в base64 (например, последний (created_at,id)), чтобы клиент не зависел от внутренней схемы и не мог подделать сортировку. Минус keyset: нельзя прыгнуть на произвольную «страницу 100» — только вперёд/назад от текущей позиции.",
  "code": "-- offset: сканирует и выбрасывает 100000 строк\nSELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 100000;\n\n-- keyset: индекс прыгает сразу в точку, всегда быстро\nSELECT * FROM orders\nWHERE id > :last_seen_id\nORDER BY id\nLIMIT 20;\n-- ответ: { items:[...], next_cursor: \"b3JkOjk4NzY1\" }"
 },
 {
  "id": "api-rate-limit-headers",
  "t": "Web",
  "s": "API эволюция",
  "q": "Клиент получил 429. Какие заголовки скажут ему, когда и как повторять, и чем Retry-After отличается от X-RateLimit-*?",
  "a": "429 Too Many Requests означает «ты превысил лимит». Retry-After говорит конкретно «не дёргайся N секунд» (или до даты) — это команда, как долго ждать перед ретраем. X-RateLimit-Limit/Remaining/Reset — это информационная панель: сколько всего разрешено в окне, сколько осталось, и когда окно обнулится (обычно Unix-таймстамп). Хороший клиент читает Remaining заранее и тормозит сам, не доводя до 429.",
  "d": "Стандарт IETF движется к RateLimit-Limit/RateLimit-Remaining/RateLimit-Reset (без X-), но в проде до сих пор доминируют X-RateLimit-*. Retry-After работает не только с 429, но и с 503 (Service Unavailable) и 3xx redirect.",
  "code": "HTTP/1.1 429 Too Many Requests\nRetry-After: 30\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 0\nX-RateLimit-Reset: 1718800800\n\n# клиент: подождать Retry-After, потом\n# exponential backoff + jitter при повторных 429"
 },
 {
  "id": "api-content-negotiation",
  "t": "Web",
  "s": "API эволюция",
  "q": "Что такое content negotiation, и почему версию API иногда суют в заголовок Accept, а не в URL?",
  "a": "Content negotiation — это когда клиент через заголовки (Accept, Accept-Language, Accept-Encoding) говорит «я хочу вот такой формат», а сервер отдаёт лучший доступный вариант того же ресурса. Accept: application/json vs application/xml — один URL, разное представление. Версию в Accept (`application/vnd.api.v2+json`) кладут, чтобы URL оставался чистым указателем на ресурс, а версия была деталью представления — но это спорная практика, многие предпочитают /v2/ в пути за простоту и кэшируемость.",
  "d": "Сервер по Accept выбирает представление и ОБЯЗАН вернуть Content-Type с тем, что реально отдал, плюс заголовок Vary: Accept — иначе кэши и CDN перепутают версии между клиентами. Если ни один вариант не подходит — 406 Not Acceptable.",
  "code": "GET /orders/42\nAccept: application/vnd.acme.v2+json\nAccept-Language: kk, ru;q=0.8\n\n# ответ\n200 OK\nContent-Type: application/vnd.acme.v2+json\nVary: Accept, Accept-Language"
 },
 {
  "id": "api-backward-compat",
  "t": "Web",
  "s": "API эволюция",
  "q": "Что можно менять в API не ломая клиентов, а что — ломающее изменение? И что за expand-contract?",
  "a": "Безопасно (additive): добавить новый необязательный параметр, новое поле в ответе, новый эндпоинт. Клиент, который их не знает, просто игнорирует. Ломающее: удалить/переименовать поле, сделать опциональное обязательным, поменять тип или семантику, ужесточить валидацию. Expand-contract (parallel change) — это как мигрировать без даунтайма: сначала ДОБАВЛЯЕШЬ новое рядом со старым (expand), даёшь клиентам переехать, и только потом УДАЛЯЕШЬ старое (contract).",
  "d": "Ключевой принцип — Robustness Principle (Postel): «будь строг в том, что отдаёшь, и терпим к тому, что принимаешь». Клиенты должны игнорировать незнакомые поля (tolerant reader), тогда добавление полей не ломает их. Сервер не должен полагаться на то, что клиент пришлёт ровно ожидаемый набор.",
  "code": "// expand: новое поле рядом со старым, оба заполнены\n{\n  \"amount\": 1000,            // старое (deprecated)\n  \"amount_minor\": 100000,    // новое: в тиынах\n  \"_deprecated\": [\"amount\"]\n}\n// ...клиенты мигрируют на amount_minor...\n// contract (в следующей мажорной версии): удалить amount"
 },
 {
  "id": "api-rest-rpc-grpc-graphql",
  "t": "Web",
  "s": "API эволюция",
  "q": "REST, RPC, gRPC, GraphQL — в чём суть каждого и когда что выбирать на практике?",
  "a": "REST — ресурсо-ориентированный: ты оперируешь сущностями (/orders/42) глаголами HTTP; прост, кэшируется, всем знаком. RPC — вызываешь удалённую процедуру как функцию (createOrder(...)); мышление «действия», а не «ресурсы». gRPC — это RPC поверх HTTP/2 с Protobuf: бинарный, быстрый, типизированный контракт, стриминг — идеален для internal service-to-service. GraphQL — клиент сам описывает, какие именно поля и связи ему нужны, одним запросом без over/under-fetching — силён для гибких фронтов с разнородными экранами.",
  "d": "Грубое правило: REST — публичные/CRUD API и всё, где важна кэшируемость и простота; gRPC — внутренняя коммуникация микросервисов с упором на скорость и строгий контракт; GraphQL — когда фронтов много и им нужны разные срезы данных, а ты устал плодить эндпоинты. RPC «вообще» — это семейство, gRPC — его конкретная популярная реализация.",
  "code": "# REST: ресурс + HTTP-глагол\nGET    /orders/42\nPOST   /orders\n\n# gRPC: процедура + типизированный контракт (proto)\nrpc CreateOrder(CreateOrderRequest) returns (Order);\n\n# GraphQL: клиент выбирает поля\nquery { order(id:42){ id status items{ sku qty } } }"
 },
 {
  "id": "ds-trie",
  "t": "Algorithms",
  "s": "Деревья и поиск",
  "q": "Зачем Trie, если есть HashMap<String, Value>? Где он реально выигрывает?",
  "a": "Trie (префиксное дерево) хранит строки по символам: общий префикс — это один общий путь от корня. HashMap отвечает только на «есть ли ровно этот ключ», а Trie дёшево отвечает на «какие ключи начинаются на cat» — это автодополнение, словари, поиск по началу слова. Поиск/вставка одного слова — O(L), где L — длина строки, независимо от размера словаря.",
  "d": "↳ Каждый узел — это переход по одному символу (массив/мапа children). Слово заканчивается там, где стоит флаг isEnd. Префиксный обход = спуститься по префиксу, потом DFS вниз и собрать все isEnd.",
  "code": "class Trie {\n  Node root = new Node();\n  static class Node {\n    Map<Character, Node> kids = new HashMap<>();\n    boolean isEnd;\n  }\n  void insert(String w) {\n    Node n = root;\n    for (char c : w.toCharArray())\n      n = n.kids.computeIfAbsent(c, k -> new Node());\n    n.isEnd = true;\n  }\n  boolean startsWith(String p) {\n    Node n = root;\n    for (char c : p.toCharArray()) {\n      n = n.kids.get(c);\n      if (n == null) return false;\n    }\n    return true; // дальше DFS соберёт все слова\n  }\n}"
 },
 {
  "id": "ds-balanced-bst",
  "t": "Algorithms",
  "s": "Деревья и поиск",
  "q": "Зачем балансировать BST? Что плохого в обычном дереве поиска?",
  "a": "Обычный BST вырождается: если вставлять отсортированные данные (1,2,3,4...), дерево превращается в связный список, и поиск падает с O(log n) до O(n). Балансировка (красно-чёрное дерево, AVL) гарантирует, что высота остаётся O(log n) при любом порядке вставок за счёт поворотов и перекраски узлов. Красно-чёрное — самобалансирующееся BST, на нём построен TreeMap/TreeSet в Java.",
  "d": "↳ Красно-чёрное держит 5 инвариантов (корень чёрный, у красного узла дети чёрные, на всех путях от узла до листьев одинаковое число чёрных узлов и т.д.). Эти правила гарантируют: самый длинный путь не более чем вдвое длиннее самого короткого → высота O(log n).",
  "code": "// Java: TreeMap — это красно-чёрное дерево\nTreeMap<Integer, String> m = new TreeMap<>();\nm.put(5, \"e\"); m.put(1, \"a\"); m.put(9, \"i\");\n// упорядоченные операции, которых нет у HashMap:\nm.firstKey();          // 1  — O(log n)\nm.ceilingKey(6);       // 9  — ближайший >= 6\nm.subMap(1, 6);        // {1, 5} — диапазон\n// HashMap всё это не умеет: он неупорядочен"
 },
 {
  "id": "ds-union-find",
  "t": "Algorithms",
  "s": "Деревья и поиск",
  "q": "Union-Find / DSU: как два узла «в одной группе» проверяются почти за O(1)?",
  "a": "DSU (Disjoint Set Union) хранит элементы как лес деревьев: у каждого узла — указатель на родителя, а корень дерева — это «представитель» группы. find(x) поднимается до корня; два элемента в одной группе, если у них один корень. union(a,b) подвешивает один корень под другой. С оптимизациями find/union идут за почти константу — обратную функцию Аккермана α(n), которая на практике <= 4.",
  "d": "↳ Две оптимизации обязательны. Union by rank: подвешиваем меньшее дерево под большее, чтобы не росла высота. Path compression: при find переподвешиваем все пройденные узлы прямо к корню, «выпрямляя» путь на будущее.",
  "code": "class DSU {\n  int[] parent, rank;\n  DSU(int n) {\n    parent = new int[n]; rank = new int[n];\n    for (int i = 0; i < n; i++) parent[i] = i;\n  }\n  int find(int x) {                 // path compression\n    if (parent[x] != x)\n      parent[x] = find(parent[x]);  // переподвесили к корню\n    return parent[x];\n  }\n  void union(int a, int b) {        // union by rank\n    int ra = find(a), rb = find(b);\n    if (ra == rb) return;\n    if (rank[ra] < rank[rb]) { int t = ra; ra = rb; rb = t; }\n    parent[rb] = ra;\n    if (rank[ra] == rank[rb]) rank[ra]++;\n  }\n}"
 },
 {
  "id": "ds-fenwick-segtree",
  "t": "Algorithms",
  "s": "Деревья и поиск",
  "q": "Нужна сумма на отрезке [l, r] с частыми обновлениями. Почему не префиксный массив?",
  "a": "Префиксный массив даёт сумму отрезка за O(1), но любое обновление элемента ломает все префиксы после него — O(n) на апдейт. Если данные часто меняются, это убийственно. Fenwick (BIT) и segment tree дают и запрос диапазона, и обновление за O(log n) каждый. BIT компактнее и проще для сумм; segment tree гибче — умеет min/max/gcd и обновления на отрезке.",
  "d": "↳ Fenwick хранит частичные суммы хитро по битам: индекс i отвечает за блок длиной (i & -i) — младший установленный бит. Поэтому проход вверх/вниз по дереву — это прыжки i += i & -i и i -= i & -i, всего O(log n) шагов.",
  "code": "class Fenwick {        // BIT, 1-индексация\n  long[] t;\n  Fenwick(int n) { t = new long[n + 1]; }\n  void add(int i, long delta) {       // обновить элемент\n    for (; i < t.length; i += i & -i)\n      t[i] += delta;\n  }\n  long prefix(int i) {                // сумма [1..i]\n    long s = 0;\n    for (; i > 0; i -= i & -i)\n      s += t[i];\n    return s;\n  }\n  long range(int l, int r) {          // сумма [l..r]\n    return prefix(r) - prefix(l - 1);\n  }\n}"
 },
 {
  "id": "ds-lru-cache",
  "t": "Algorithms",
  "s": "Деревья и поиск",
  "q": "Спроектируй LRU-кэш с get и put за O(1). Почему одного HashMap мало?",
  "a": "HashMap даёт O(1) на доступ, но не помнит порядок использования — а LRU должен выбрасывать давно не используемый элемент, и это надо знать за O(1). Решение: HashMap (ключ → узел) плюс двусвязный список, где голова — самый свежий, хвост — кандидат на вытеснение. get/put перемещают узел в голову; при переполнении удаляем хвост. Обе структуры вместе дают O(1) на всё.",
  "d": "↳ Двусвязный список нужен именно двусвязным: чтобы удалить узел из середины за O(1), надо знать его соседей слева и справа. HashMap хранит ссылку прямо на узел списка, поэтому «найти и вырезать» — константа.",
  "code": "// В Java готовый LRU делается на LinkedHashMap:\nclass LruCache<K, V> extends LinkedHashMap<K, V> {\n  private final int cap;\n  LruCache(int cap) {\n    super(16, 0.75f, true);   // accessOrder = true!\n    this.cap = cap;\n  }\n  @Override\n  protected boolean removeEldestEntry(Map.Entry<K, V> e) {\n    return size() > cap;      // авто-вытеснение хвоста\n  }\n}\n// new LruCache<>(2): put(1),put(2),get(1),put(3) -> выкинет 2"
 },
 {
  "id": "ds-bloom-filter",
  "t": "Algorithms",
  "s": "Вероятностные и спец",
  "q": "Что такое Bloom filter и почему он может соврать «да», но никогда не врёт «нет»?",
  "a": "Bloom filter — это битовый массив + k хэш-функций. При add(x) ставим k бит в 1; при contains(x) проверяем те же k бит. Если хоть один бит = 0 — элемента точно нет (нет false negative). Если все k бит = 1 — элемент «возможно есть», но биты могли проставить другие элементы (false positive).",
  "d": "↳ Вероятность FP растёт с заполнением: p ≈ (1 - e^(-kn/m))^k, где m — биты, n — элементы, k — хэши. Оптимум k = (m/n)·ln2. Удалить элемент нельзя (сбросишь бит — поломаешь чужие), для этого нужен Counting Bloom (счётчики вместо бит).",
  "code": "// Guava\nBloomFilter<String> bf = BloomFilter.create(\n    Funnels.stringFunnel(UTF_8),\n    1_000_000,   // expectedInsertions\n    0.01);       // желаемый FP rate = 1%\nbf.put(\"user:42\");\nbf.mightContain(\"user:42\"); // true (или редкий FP)\nbf.mightContain(\"user:99\"); // почти всегда false"
 },
 {
  "id": "ds-skip-list",
  "t": "Algorithms",
  "s": "Вероятностные и спец",
  "q": "Skip list — как отсортированный связный список даёт O(log n) поиск без балансировки дерева?",
  "a": "Поверх обычного отсортированного списка надстраиваются «express-уровни» — разреженные ссылки, перепрыгивающие через узлы. Поиск идёт сверху вниз: бежим по верхнему уровню, пока следующий узел не перескочит цель, потом спускаемся на уровень ниже. Высоту узла выбирают случайно (монетка: с вероятностью 1/2 поднять ещё на уровень), поэтому в среднем уровней ~log n и поиск O(log n).",
  "d": "↳ Балансировки как у AVL/RB-tree нет — структура держится вероятностно, а не за счёт вращений. Это сильно упрощает конкурентную реализацию: вставка трогает локальные ссылки, легко делается lock-free. Худший случай O(n), но вероятность исчезающе мала.",
  "code": "// java.util.concurrent\nConcurrentSkipListMap<Integer,String> m =\n    new ConcurrentSkipListMap<>();\nm.put(10, \"a\"); m.put(20, \"b\"); m.put(30, \"c\");\nm.floorKey(25);   // 20  — ближайший <=\nm.ceilingKey(25); // 30  — ближайший >=\nm.subMap(10, 25); // диапазонный запрос, отсортирован"
 },
 {
  "id": "ds-heap-priority-queue",
  "t": "Algorithms",
  "s": "Вероятностные и спец",
  "q": "Что такое binary heap, какие у него операции и за сколько они работают?",
  "a": "Binary heap — почти полное бинарное дерево, хранимое в массиве, с инвариантом: в min-heap родитель ≤ детей (в max-heap — наоборот). peek (минимум/максимум) — O(1), это корень. insert и extractMin/poll — O(log n): элемент «всплывает» вверх (sift-up) или «тонет» вниз (sift-down) до восстановления инварианта. Построить кучу из массива целиком — O(n).",
  "d": "↳ Хранение в массиве без указателей: для индекса i дети — 2i+1 и 2i+2, родитель — (i-1)/2. Это и даёт компактность и кэш-локальность. Важно: heap НЕ отсортирован целиком — гарантируется только корень. Перебор кучи не даёт отсортированной последовательности.",
  "code": "// min-heap по умолчанию\nPriorityQueue<Task> pq = new PriorityQueue<>(\n    Comparator.comparingInt(Task::priority));\npq.offer(t1);       // insert — O(log n)\npq.peek();          // минимум — O(1)\npq.poll();          // извлечь минимум — O(log n)\n// max-heap: Comparator.reverseOrder()"
 },
 {
  "id": "ds-consistent-hashing",
  "t": "Algorithms",
  "s": "Вероятностные и спец",
  "q": "Зачем нужен consistent hashing и чем он лучше обычного hash(key) % N?",
  "a": "При шардировании через hash(key) % N добавление/удаление одного узла меняет N, и почти все ключи переезжают — катастрофа для кэшей и распределённых хранилищ. Consistent hashing кладёт и узлы, и ключи на воображаемое кольцо (хэш-пространство 0..2^32). Ключ принадлежит первому узлу по часовой стрелке. При уходе узла переезжают только его ключи (к следующему узлу), остальные на месте — в среднем ~1/N ключей.",
  "d": "↳ Проблема: при малом N узлы ложатся на кольцо неравномерно → перекос нагрузки. Лечится виртуальными узлами (vnodes): каждый физический узел представлен сотнями точек на кольце (hash(node + \"#0\"), hash(node + \"#1\"), ...). Чем больше vnodes, тем ровнее распределение и тем плавнее переезд при изменении состава.",
  "code": "// упрощённо: TreeMap как кольцо\nTreeMap<Long,String> ring = new TreeMap<>();\nfor (String node : nodes)\n  for (int v = 0; v < 200; v++)        // vnodes\n    ring.put(hash(node + \"#\" + v), node);\n\nString nodeFor(String key) {\n  Long k = ring.ceilingKey(hash(key));  // по часовой\n  if (k == null) k = ring.firstKey();   // замыкаем кольцо\n  return ring.get(k);\n}"
 },
 {
  "id": "ds-cardinality-sketches",
  "t": "Algorithms",
  "s": "Вероятностные и спец",
  "q": "Чем HyperLogLog и Count-Min Sketch отличаются и что каждый приближённо считает?",
  "a": "Оба — вероятностные структуры с фиксированной маленькой памятью. HyperLogLog оценивает кардинальность — число уникальных элементов (сколько разных user_id видели). Count-Min Sketch оценивает частоту — сколько раз встретился конкретный элемент (top-K, heavy hitters). HLL отвечает «сколько всего разных», CMS — «сколько раз именно этот».",
  "d": "↳ HLL: ловит максимальную длину серии нулей в хэшах элементов — много уникальных значений → встретится длинная серия нулей; усреднение по регистрам даёт оценку. ~12-16 КБ дают оценку миллиардов уникумов с ошибкой ~1-2%. CMS: матрица счётчиков d×w + d хэшей; count(x) = минимум по d ячейкам. Может только переоценить частоту (коллизии добавляют), никогда не занизить.",
  "code": "// Redis HyperLogLog — кардинальность\nPFADD visitors:2026-06 user:1 user:2 user:1\nPFCOUNT visitors:2026-06        // ~2 уникальных, ошибка ~0.81%\nPFMERGE total visitors:a visitors:b  // объединение множеств\n\n// Count-Min: count(x) = min по d рядам (только переоценка)"
 },
 {
  "id": "mq-exchanges",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "В RabbitMQ продюсер шлёт не в очередь, а в exchange. Зачем эта прослойка и какие 4 типа?",
  "a": "Продюсер вообще не знает про очереди — он публикует в exchange с routing key, а exchange по правилам (binding) раскидывает копии в очереди. Это развязывает отправителя и получателей. Типы: direct (точное совпадение routing key), topic (совпадение по маске с *.# ), fanout (всем привязанным, ключ игнорируется), headers (матч по заголовкам вместо ключа).",
  "d": "↳ Binding key задаётся при queue.bind, routing key — при publish. Для direct они должны совпасть точно; для topic routing key вида `order.eu.created` матчится против binding `order.*.created` (* = одно слово, # = ноль и больше слов).",
  "code": "// direct: точное совпадение\nchannel.queueBind(\"q.eu\", \"orders\", \"order.eu\");\nchannel.basicPublish(\"orders\", \"order.eu\", null, body);\n\n// topic: маска\nchannel.queueBind(\"q.all\", \"orders\", \"order.#\");\nchannel.queueBind(\"q.created\", \"orders\", \"*.created\");"
 },
 {
  "id": "mq-ack-prefetch",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "Чем ack отличается от nack/reject и зачем prefetch (QoS)? Что будет с autoAck=true при падении консьюмера?",
  "a": "ack — «обработал, удаляй из очереди». nack/reject — «не смог»; с requeue=true сообщение вернётся в очередь, с false — дропнется или уйдёт в DLX. При autoAck=true RabbitMQ считает доставленным сразу при отправке — если консьюмер упал в середине обработки, сообщение потеряно. prefetch (basicQos) ограничивает число неподтверждённых сообщений «в полёте» на консьюмера — иначе быстрый брокер закидает медленного, память распухнет и балансировка сломается.",
  "d": "↳ reject обрабатывает ровно одно сообщение; nack умеет multiple=true (подтвердить/отклонить пачку до этого deliveryTag). requeue возвращает сообщение в ГОЛОВУ очереди — отравленное (poison) сообщение зациклится, если не ограничить retry или не увести в DLX.",
  "code": "channel.basicQos(20); // prefetch: не больше 20 неподтверждённых\nchannel.basicConsume(\"q\", false /*autoAck OFF*/, (tag, msg) -> {\n  try {\n    handle(msg);\n    channel.basicAck(msg.getEnvelope().getDeliveryTag(), false);\n  } catch (Exception e) {\n    // requeue=false → в DLX, чтобы не зациклить poison\n    channel.basicNack(msg.getEnvelope().getDeliveryTag(), false, false);\n  }\n});"
 },
 {
  "id": "mq-rabbit-vs-kafka",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "RabbitMQ vs Kafka в одну фразу: чем модель «очередь» отличается от «лога» и когда что брать?",
  "a": "RabbitMQ — умная очередь: брокер push'ит сообщение консьюмеру, после ack оно УДАЛЯЕТСЯ, перечитать нельзя. Kafka — append-only лог: консьюмер сам pull'ит по оффсету, сообщение лежит до retention независимо от чтения, можно перемотать оффсет и переиграть историю. Бери RabbitMQ для task/RPC-распределения и сложной маршрутизации; Kafka — для потоков событий, многих независимых читателей и реплея.",
  "d": "↳ В Kafka параллелизм = число партиций (один партишн читает один консьюмер в группе), порядок гарантирован внутри партиции. В RabbitMQ параллелизм = число консьюмеров на очереди, и они конкурируют за сообщения (competing consumers), общего порядка между ними нет."
 },
 {
  "id": "mq-dlx",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "Что такое dead-letter exchange/queue и какие 3 события отправляют сообщение в DLX?",
  "a": "DLX — обычный exchange, куда RabbitMQ автоматически переотправляет «мёртвые» сообщения, и привязанная к нему DLQ их копит для разбора/повторов. Сообщение становится dead-lettered, когда: его reject/nack с requeue=false; истёк TTL сообщения или очереди; превышена max-length очереди (overflow). Это спасает от потери и от poison-loop.",
  "d": "↳ DLX настраивается на очереди-источнике через аргументы x-dead-letter-exchange (и опц. x-dead-letter-routing-key). RabbitMQ добавляет в заголовок x-death историю: счётчик, причину (rejected/expired/maxlen), исходную очередь — по нему строят retry с backoff.",
  "code": "Map<String,Object> args = Map.of(\n  \"x-dead-letter-exchange\", \"dlx\",\n  \"x-dead-letter-routing-key\", \"failed\",\n  \"x-message-ttl\", 30000,        // TTL → в DLX через 30с\n  \"x-max-length\", 10000          // overflow → в DLX\n);\nchannel.queueDeclare(\"orders\", true, false, false, args);\n// связываем DLQ\nchannel.queueBind(\"orders.dlq\", \"dlx\", \"failed\");"
 },
 {
  "id": "mq-sqs",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "AWS SQS: что такое visibility timeout, почему at-least-once, и чем FIFO отличается от standard?",
  "a": "Получив сообщение, консьюмер не удаляет его, а делает невидимым на visibility timeout — другие его не видят, пока ты обрабатываешь. Успел — шлёшь DeleteMessage; не успел/упал — таймаут истёк, сообщение снова видно и придёт другому. Отсюда at-least-once: один и тот же месседж может прийти дважды (упал после обработки, но до delete), поэтому консьюмер обязан быть идемпотентным. Standard — почти-неограниченный throughput, best-effort порядок и возможные дубли; FIFO — строгий порядок и exactly-once-обработка в пределах MessageGroupId, но лимит ~3000 msg/s с батчингом.",
  "d": "↳ Если обработка длиннее visibility timeout — сообщение «всплывёт» и его подхватит второй консьюмер, получишь двойную обработку. Лечится ChangeMessageVisibility (продлить heartbeat-ом) или подбором таймаута. FIFO дедуплицирует по MessageDeduplicationId в окне 5 минут.",
  "code": "// long polling + ручное удаление\nReceiveMessageRequest req = ReceiveMessageRequest.builder()\n    .queueUrl(url).maxNumberOfMessages(10)\n    .waitTimeSeconds(20)            // long poll, меньше пустых ответов\n    .visibilityTimeout(60).build();\nfor (Message m : sqs.receiveMessage(req).messages()) {\n  handleIdempotent(m);            // дубль возможен!\n  sqs.deleteMessage(b -> b.queueUrl(url).receiptHandle(m.receiptHandle()));\n}"
 },
 {
  "id": "mq-ordering",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "Почему порядок сообщений ломается, как только консьюмеров становится больше одного? Как сохранить порядок там, где он нужен?",
  "a": "Очередь FIFO только на выдаче. Как только два консьюмера тянут параллельно, m1 и m2 уходят разным воркерам, и какой обработается первым — зависит от скорости, сети, ретраев. Плюс nack-requeue возвращает сообщение в очередь позже его соседей. Порядок сохраняют, направляя связанные сообщения в ОДИН поток обработки: ключ партиционирования (Kafka partition по ключу, SQS MessageGroupId) либо отдельная очередь на сущность, либо один консьюмер с prefetch=1.",
  "d": "↳ Глобальный порядок и горизонтальное масштабирование — взаимоисключающие. Реально нужен лишь порядок ПО КЛЮЧУ (все события одного заказа/клиента подряд). Шардируешь по ключу: один ключ → одна партиция/группа → один обработчик в момент времени. Между ключами параллелизм свободный."
 },
 {
  "id": "mq-competing-consumers",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "Паттерн competing consumers: что это, как масштабирует, и что важно учесть, чтобы он не выстрелил в ногу?",
  "a": "Несколько консьюмеров слушают ОДНУ очередь и конкурируют за сообщения — брокер отдаёт каждое ровно одному из них. Добавил воркеров — выросла пропускная способность и появилась отказоустойчивость (упал один — остальные разгребают). Цена: теряется порядок между сообщениями, обработка должна быть идемпотентной (возможна повторная доставка), а нагрузка балансируется через prefetch.",
  "d": "↳ В RabbitMQ это естественно: N консьюмеров на очереди, prefetch регулирует, кому сколько «в полёте». В Kafka аналог — consumer group: партиции делятся между членами группы, но консьюмеров в группе не больше числа партиций (лишние простаивают). Это competing consumers на уровне партиций, а не отдельных сообщений."
 },
 {
  "id": "mq-queue-vs-stream",
  "t": "Distributed",
  "s": "Брокеры",
  "q": "Решающий вопрос на дизайне: когда брать очередь (queue), а когда лог-стрим (stream)? Дай критерий, а не «зависит».",
  "a": "Очередь — когда сообщение это ЗАДАЧА, у неё один исполнитель, после выполнения она не нужна, и важна развязка нагрузки/ретраи (отправить письмо, сгенерить PDF, обработать платёж). Лог-стрим — когда сообщение это ФАКТ/событие, его независимо читают несколько потребителей по-своему, нужен реплей, аудит или восстановление состояния (заказ создан → его слушают биллинг, аналитика, нотификации, поиск). Критерий: «один потребитель, потом выбросить» → queue; «много читателей и/или нужна история» → stream.",
  "d": "↳ Очередь оптимизирована под competing consumers и удаление после ack; реплей не предусмотрен. Лог хранит данные по retention независимо от чтения, оффсеты позволяют новым/упавшим потребителям догнать историю — ценой того, что чистка по времени, а не по факту обработки. Гибрид: command-и (do X) → queue, event-ы (X happened) → stream."
 },
 {
  "id": "gap-sc-structured-task-scope",
  "t": "Concurrency",
  "s": "Structured Concurrency & ScopedValue",
  "q": "Запустил 3 параллельные задачи через ExecutorService, одна упала — две других продолжают молотить впустую. Как Structured Concurrency решает этот «утечный» сценарий?",
  "a": "StructuredTaskScope связывает дочерние задачи в одно дерево: они стартуют внутри одного scope и живут не дольше него. Если одна падает — scope отменяет остальные через interrupt. join() блокирует родителя, пока все дети не завершатся, поэтому осиротевших задач не остаётся. Политику задаёт Joiner: по умолчанию (open() без аргументов) ждём всех и падаем на первой ошибке, а anySuccessfulResultOrThrow() возвращает первый успешный результат и гасит остальных.",
  "d": "↳ Под капотом это просто пул виртуальных потоков + дерево отмены. fork() создаёт vthread, join() ждёт всех, scope.close() гарантирует, что ни один ребёнок не переживёт родителя (как try-with-resources для конкуренции).\n\n↳ Осторожно на собесе: API переписали. В Java 21 это был класс с наследниками — `new StructuredTaskScope.ShutdownOnFailure()` и `join().throwIfFailed()`. По этому образцу написана половина статей в интернете, но на JDK 25 он не компилируется вообще: `ShutdownOnFailure` больше нет, `StructuredTaskScope` стал интерфейсом, scope открывают через `open()`, а политику передают объектом `Joiner` (allSuccessfulOrThrow, anySuccessfulResultOrThrow, awaitAll, allUntil). Фича всё ещё preview — просят `--enable-preview`.",
  "code": "try (var scope = StructuredTaskScope.open()) {   // preview, нужен --enable-preview\n    Subtask<User> user   = scope.fork(() -> findUser(id));\n    Subtask<Order> order = scope.fork(() -> fetchOrder(id));\n    scope.join();            // ждём всех; кто-то упал — join() бросит, остальных уже отменили\n    return new Response(user.get(), order.get());\n}   // close() гарантированно отменит/дождётся всех"
 },
 {
  "id": "gap-jwt-alg-none",
  "t": "Web",
  "s": "JWT / Auth",
  "q": "Клиент прислал JWT с заголовком alg=\"none\" и без подписи. Почему наивный сервер может его принять и пустить под чужим user_id?",
  "a": "Если сервер при верификации берёт алгоритм из самого токена (из его header), то атакующий просто пишет alg=\"none\", выкидывает подпись — и сервер «верифицирует» по правилам none, то есть не проверяет ничего. Вторая версия атаки: header меняют с RS256 на HS256 и подписывают HMAC'ом, где секрет = публичный RSA-ключ (он же не секретный, лежит в открытом доступе). Сервер думает «RS256→проверю публичным ключом», а библиотека по header'у решает «HS256→возьму этот же ключ как HMAC-секрет» — подпись сходится. Корень в обоих случаях один: сервер доверяет полю alg, которое контролирует злоумышленник.",
  "d": "↳ Глубже: это частный случай confused deputy — «запутанный заместитель». Доверенный код (валидатор JWT) выполняет действие (выбор алгоритма/ключа) по указке недоверенной стороны (header токена), не имея права это делать. Фикс — убрать у атакующего рычаг: ожидаемый алгоритм задаётся на сервере конфигом, а не читается из токена.",
  "code": "// ПЛОХО: алгоритм берётся из токена (header), атакующий им управляет\nJwt.require(Algorithm.none()); // или библиотека сама читает alg из header\n\n// ХОРОШО (java-jwt / auth0): фиксируем алгоритм И тип ключа явно\nAlgorithm alg = Algorithm.RSA256(publicKey, null); // только RS256, только RSA-ключ\nJWTVerifier verifier = JWT.require(alg)\n        .withIssuer(\"acme-auth\")\n        .build();          // alg=none и HS256 будут отвергнуты на этапе verify\nDecodedJWT jwt = verifier.verify(token);"
 },
 {
  "id": "gap-alg-floyd-cycle",
  "t": "Algorithms",
  "s": "Cycle Detection",
  "q": "Как найти цикл в связном списке (или в последовательности x→f(x)), потратив O(1) памяти, без HashSet посещённых?",
  "a": "Запускаешь два указателя: медленный шагает на 1, быстрый на 2. Если цикл есть — быстрый рано или поздно догонит медленного изнутри петли (они встретятся). Если цикла нет — быстрый просто упрётся в null. Памяти O(1), времени O(n).",
  "d": "↳ Чтобы найти НАЧАЛО цикла: после встречи ставишь один указатель в head, второй оставляешь в точке встречи, и двигаешь оба по 1 шагу — они встретятся ровно во входе в цикл. Это следствие того, что расстояние от head до входа равно расстоянию от точки встречи до входа (по модулю длины цикла).",
  "code": "boolean hasCycle(Node head) {\n    Node slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;        // черепаха: +1\n        fast = fast.next.next;   // заяц: +2\n        if (slow == fast) return true;\n    }\n    return false;\n}"
 },
 {
  "id": "gap-alg-quickselect",
  "t": "Algorithms",
  "s": "Selection",
  "q": "Надо найти k-й по порядку элемент (например медиану) в неотсортированном массиве. Зачем городить quickselect, если можно отсортировать за O(n log n) и взять nums[k]?",
  "a": "Сортировка делает лишнюю работу — упорядочивает весь массив, хотя тебе нужна одна позиция. Quickselect использует partition как в quicksort, но рекурсирует ТОЛЬКО в ту половину, где лежит k. Это даёт среднее O(n) вместо O(n log n), потому что размер обрабатываемой части падает геометрически: n + n/2 + n/4 + ... ≈ 2n.",
  "d": "↳ После partition опорный элемент встаёт на свою финальную позицию `p`. Если `p == k` — нашли. Если `k < p` — ответ слева, идём только влево. Если `k > p` — только вправо. Одну из двух половин ты выбрасываешь целиком, в отличие от quicksort, который сортирует обе.",
  "code": "int quickselect(int[] a, int k) {\n    int lo = 0, hi = a.length - 1;\n    while (lo < hi) {\n        int p = partition(a, lo, hi); // pivot на финальном месте\n        if      (p == k) return a[p];\n        else if (p < k)  lo = p + 1;  // выбрасываем левую часть\n        else             hi = p - 1;  // выбрасываем правую часть\n    }\n    return a[lo];\n}"
 },
 {
  "id": "gap-rx-context",
  "t": "Reactive",
  "s": "Reactor Context",
  "q": "В реактивной цепочке поток прыгает между операторами. Как тогда пробросить trace_id или security от subscribe() до самого источника, если ThreadLocal тут не работает?",
  "a": "Через Reactor Context — immutable key-value хранилище, привязанное не к потоку, а к самой подписке (Subscription). Оно течёт СНИЗУ ВВЕРХ: от subscribe() к источнику. Ты кладёшь значение через .contextWrite(...), а читаешь выше по цепочке через Mono.deferContextual / Flux.deferContextual. ThreadLocal не годится, потому что оператор может выполниться на другом потоке, и значение из ThreadLocal там просто не будет видно.",
  "d": "↳ «Снизу вверх» — потому что в Reactor сборка цепочки идёт сверху вниз, а реальная подписка распространяется снизу (от финального subscribe) вверх к источнику. Context — это часть Subscription, поэтому он виден операторам ВЫШЕ той точки, где сделан contextWrite, и не виден ниже неё.",
  "code": "Mono<String> mono = Mono.deferContextual(ctx ->\n        Mono.just(\"trace=\" + ctx.get(\"trace_id\")))\n    .map(s -> s.toUpperCase())\n    // contextWrite ниже по коду, но влияет на операторы ВЫШЕ\n    .contextWrite(ctx -> ctx.put(\"trace_id\", \"abc-123\"));\n\nmono.subscribe(System.out::println); // TRACE=ABC-123"
 },
 {
  "id": "gap-ap-apt-rounds",
  "t": "Build",
  "s": "Annotation processing",
  "q": "Lombok, MapStruct, Dagger «генерируют код». На каком этапе и как именно javac позволяет им вписаться в компиляцию?",
  "a": "Это annotation processors (APT). Перед тем как javac превратит код в байткод, он запускает раунды обработки: парсит исходники в дерево (AST), отдаёт процессорам аннотации, которые те «заявили», а процессоры в ответ через Filer пишут НОВЫЕ .java-файлы. Сгенерированные файлы запускают следующий раунд — пока никто ничего нового не родит. Только потом идёт реальная компиляция всего вместе. Поэтому MapStruct отдаёт готовый MapperImpl, а не магию в рантайме.",
  "d": "Контракт процессора: класс реализует javax.annotation.processing.Processor (обычно через AbstractProcessor), помечается @SupportedAnnotationTypes и регистрируется в META-INF/services/javax.annotation.processing.Processor (или через @AutoService). javac находит его по ServiceLoader на classpath/processorpath.",
  "code": "// MapStruct: ты пишешь интерфейс\n@Mapper\npublic interface UserMapper {\n    UserDto toDto(User u);\n}\n\n// APT в раунде обработки сгенерирует ИСХОДНИК UserMapperImpl.java:\n// public class UserMapperImpl implements UserMapper {\n//   public UserDto toDto(User u) {\n//     if (u == null) return null;\n//     UserDto d = new UserDto();\n//     d.setName(u.getName());   // обычные геттеры/сеттеры, без рефлексии\n//     return d;\n//   }\n// }\n// javac компилит его вместе с твоим кодом → 0 оверхеда в рантайме"
 },
 {
  "id": "gap-oh-direct-memory",
  "t": "JVM",
  "s": "Off-heap / Direct Memory",
  "q": "Где живёт память, выделенная ByteBuffer.allocateDirect, и почему её освобождение — не мгновенное?",
  "a": "allocateDirect берёт память напрямую у ОС, ВНЕ Java-кучи: GC её не двигает и не сканирует. Сам ByteBuffer-объект (маленькая обёртка) лежит в куче, а большой native-буфер за ним. Освобождение откладывается: native-память отдаётся ОС только когда обёртку соберёт GC и сработает её Cleaner/PhantomReference. Нет ссылок на обёртку и нет GC — память висит.",
  "d": "↳ Зачем вообще off-heap? Zero-copy: для read/write через сокет или файл ядру нужен буфер по фиксированному адресу. Heap-буфер GC может подвинуть, поэтому JDK сначала копирует его в скрытый direct-буфер. allocateDirect убирает это лишнее копирование — данные сразу там, где их ждёт native-вызов. Поэтому NIO, Netty, Kafka гоняют именно direct.",
  "code": "// Heap: данные в Java-куче, под управлением GC\nByteBuffer heap = ByteBuffer.allocate(1024);\n\n// Direct: native-память вне кучи, не двигается GC\nByteBuffer direct = ByteBuffer.allocateDirect(1024);\nSystem.out.println(direct.isDirect()); // true\n\n// При записи в канал heap-буфер JDK сначала\n// СКОПИРУЕТ во временный direct, direct — нет.\nchannel.write(direct); // zero-copy, без лишней копии"
 },
 {
  "id": "gap-oom-oomkilled-vs-javaoom",
  "t": "DevOps",
  "s": "Containers / JVM",
  "q": "Под в Kubernetes падает с кодом 137 и статусом OOMKilled, но в логах приложения нет ни одного OutOfMemoryError. Кто кого убил и почему JVM «не заметила»?",
  "a": "Контейнер убило ядро ОС (cgroup memory limit), а не JVM. Ядро увидело, что процесс вышел за memory.limit заданный в cgroup, и прислало SIGKILL (kill -9) — отсюда exit code 128+9=137 и статус OOMKilled. Java-OOM тут ни при чём: это смерть снаружи процесса, у JVM не было шанса бросить исключение или записать лог.",
  "d": "↳ До Java 10 JVM вообще не читала cgroup-лимит: Runtime.maxMemory() и эргономика брали ОЗУ всего хоста (например 64 GB), а не лимит контейнера (например 512 MB). JVM спокойно растила heap до «своей» границы, выходила за cgroup-limit — и ловила kill -9 ещё до любого Java-OOM.",
  "code": "# exit 137 = 128 + 9 (SIGKILL)\nkubectl describe pod app | grep -A2 'Last State'\n#   Reason:    OOMKilled\n#   Exit Code: 137\n\n# Java 10+: JVM читает cgroup-лимит автоматически\njava -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -jar app.jar"
 },
 {
  "id": "gap-kms-envelope-encryption",
  "t": "Crypto",
  "s": "Хранение и ротация ключей",
  "q": "У тебя гигабайты зашифрованных данных. Завтра нужно сменить мастер-ключ. Неужели придётся расшифровать всё и зашифровать заново?",
  "a": "Нет, и именно поэтому существует envelope encryption. Данные шифруются быстрым data-key, а сам data-key шифруется мастер-ключом в KMS. При ротации мастера ты перешифровываешь только крошечный data-key, а гигабайты данных не трогаешь. Сами секреты и мастер-ключ живут в KMS/Vault/HSM, а не в коде и не в гите.",
  "d": "↳ Зашифрованный data-key хранят рядом с данными (в той же записи/файле). Чтобы расшифровать данные, приложение шлёт зашифрованный data-key в KMS, KMS отдаёт расшифрованный data-key в памяти — он сразу используется и выбрасывается, на диск не пишется. Это паттерн «зашифрованный конверт»: внутри письмо (data-key), снаружи замок KMS.",
  "code": "// AWS KMS: получаем пару (plaintext data-key + его зашифрованную версию)\nGenerateDataKeyResponse dk = kms.generateDataKey(b -> b\n    .keyId(\"alias/master-key\")          // мастер-ключ живёт ВНУТРИ KMS\n    .keySpec(DataKeySpec.AES_256));\n\nSecretKey plainKey = new SecretKeySpec(\n    dk.plaintext().asByteArray(), \"AES\"); // шифруем им данные локально\nbyte[] encryptedDataKey = dk.ciphertextBlob().asByteArray();\n// храним encryptedDataKey РЯДОМ с зашифрованными данными\n\n// расшифровка: возвращаем data-key к жизни через KMS\nbyte[] plain = kms.decrypt(b -> b\n    .ciphertextBlob(SdkBytes.fromByteArray(encryptedDataKey)))\n    .plaintext().asByteArray();"
 },
 {
  "id": "de-server-lifecycle",
  "t": "Design",
  "s": "что такое сервер",
  "q": "Что физически происходит на сервере, когда приходит HTTP-запрос?",
  "a": "Запрос принимается на listening-сокете (accept), его подхватывает поток из пула (thread-per-request) или event-loop, парсится, выполняется бизнес-логика, ответ сериализуется и пишется обратно в сокет. Сервер = процесс, слушающий порт; «масштабировать сервер» = добавить процессы/машины за балансировщиком.",
  "d": "Stateless-сервер (состояние во внешнем сторадже/токене) масштабируется горизонтально без липких сессий."
 },
 {
  "id": "inf-autoscale-mechanics",
  "t": "Infra",
  "s": "autoscaling",
  "q": "Как работает автомасштабирование (autoscaling) и по какой метрике?",
  "a": "Контроллер (например K8s HPA) периодически сравнивает наблюдаемую метрику с целевой и считает желаемое число реплик: desired = ceil(replicas × current/target). Метрика — CPU, RPS или прикладная (длина очереди). Превысили — добавляет поды; упало — убирает (медленнее, с окном стабилизации против флаппинга).",
  "d": "Реактивный autoscaling всегда отстаёт на лаг «метрика→решение→старт пода»; для предсказуемых пиков берут scheduled/predictive."
 },
 {
  "id": "inf-autoscale-coldstart",
  "t": "Infra",
  "s": "autoscaling",
  "q": "Почему scale-up под нагрузкой может сделать хуже (cold start, thundering herd)?",
  "a": "Новый инстанс не готов мгновенно: запуск контейнера + прогрев JVM/JIT + наполнение кэшей + установка пулов коннектов. Пока он «холодный», его p99 высок, а трафик от LB уже льётся. Плюс залп новых подов разом бьёт по БД/кэшу (thundering herd) и может уронить downstream.",
  "d": "Лечат readiness-пробой + warmup-трафиком + лимитом скорости масштабирования + прогретым baseline реплик."
 },
 {
  "id": "de-estimate-latency",
  "t": "Design",
  "s": "оценка на коленке",
  "q": "Порядки задержек, которые надо помнить для оценки на коленке?",
  "a": "L1 ~1нс, RAM ~100нс, SSD random read ~100мкс, round-trip внутри ДЦ ~0.5мс, чтение 1МБ с SSD ~1мс, HDD seek ~10мс, round-trip между континентами ~100-150мс. Главное — относительные масштабы: RAM в ~1000× быстрее SSD, межрегиональная сеть в ~1000× медленнее, чем внутри ДЦ.",
  "d": "Не зубри точные числа — держи порядки и соотношения, этого хватает для прикидки."
 },
 {
  "id": "de-estimate-qps",
  "t": "Design",
  "s": "оценка на коленке",
  "q": "Как на коленке прикинуть QPS и объём хранилища сервиса?",
  "a": "QPS ≈ DAU × действий_на_юзера / 86400 (секунд в сутках). Пик ×2–5 от среднего. Storage = число_объектов × размер_объекта × срок_хранения (+ репликация ×3, +индексы). Считай в степенях двойки/десятки и округляй — нужна верность порядка, а не точность.",
  "d": "86400 ≈ 10⁵ — удобно: 1 млн действий в сутки ≈ 12 QPS среднего."
 },
 {
  "id": "di-leader-raft",
  "t": "Distributed",
  "s": "leader-election",
  "q": "Как происходит выбор лидера в Raft?",
  "a": "Время разбито на term'ы. Follower, не получив heartbeat от лидера за randomized election timeout, становится candidate, увеличивает term и шлёт RequestVote. Кто собрал большинство (quorum N/2+1) — лидер и рассылает heartbeats. Рандомный таймаут разводит кандидатов во времени, чтобы не было вечного split-vote.",
  "d": "Большинство гарантирует уникальность лидера в term'е: два кандидата не наберут кворум одновременно."
 },
 {
  "id": "di-split-brain-fencing",
  "t": "Distributed",
  "s": "leader-election",
  "q": "Что такое split-brain и как fencing token защищает от старого лидера?",
  "a": "Split-brain — сетевой раскол, при котором две части кластера считают себя лидером и обе пишут → расхождение данных. Лечится кворумом (писать может только большинство) + fencing token: лидер получает монотонно растущий номер, а сторадж отвергает запись с токеном меньше уже виденного. «Воскресший» старый лидер с устаревшим токеном отбрасывается.",
  "d": "Lease по времени без fencing не спасает: GC-пауза/заморозка VM может пережить срок аренды незаметно для самого лидера."
 },
 {
  "id": "di-batch-vs-stream",
  "t": "Distributed",
  "s": "big-data",
  "q": "Batch vs stream обработка больших данных — в чём разница и что такое Lambda/Kappa?",
  "a": "Batch (MapReduce/Spark) — копим данные и считаем большими пачками: высокий throughput, латенси минуты/часы, легко пересчитать. Stream (Flink/Kafka Streams) — обрабатываем событие за событием почти в реальном времени: низкая латенси, но сложнее состояние/точность. Lambda-архитектура держит оба слоя (batch для точности + stream для свежести), Kappa — только stream с переигрыванием лога.",
  "d": "Kappa проще в эксплуатации (один код-путь), но требует возможности переиграть весь нужный объём из лога."
 },
 {
  "id": "di-oltp-vs-olap",
  "t": "Distributed",
  "s": "big-data",
  "q": "OLTP vs OLAP, data lake vs warehouse, зачем колоночное хранение?",
  "a": "OLTP — много мелких транзакций (вставь заказ, обнови баланс), строковое хранение, нормализация, низкая латенси на запись/точечное чтение. OLAP — аналитика по миллионам строк (sum/group по колонкам), колоночное хранение (читаем только нужные колонки и жмём их). Warehouse — очищенные структурированные данные (schema-on-write); lake — сырые данные любого формата (schema-on-read).",
  "d": "Колоночный формат (Parquet/ORC) для аналитики читает на порядок меньше с диска: только запрошенные колонки."
 },
 {
  "id": "de-sysdesign-framework",
  "t": "Design",
  "s": "подход к задаче",
  "q": "Как подойти к любой задаче System Design на собесе (фреймворк)?",
  "a": "1) Уточни требования: функциональные + нефункциональные (масштаб, latency, consistency, доступность). 2) Прикинь на коленке (DAU→QPS, storage). 3) Опиши API. 4) Модель данных и выбор хранилища. 5) High-level схема (клиенты→LB→сервисы→БД/кэш/очередь). 6) Углубись в 1–2 узких места. 7) Проговори tradeoff'ы и точки отказа. Не прыгай в детали, не уточнив scope.",
  "d": "Сигнал сениора — сначала требования и оценка, потом решение; и явные tradeoff'ы, а не «серебряная пуля»."
 },
 {
  "id": "jc-pass-by-value",
  "t": "Java",
  "s": "semantics",
  "q": "Java — pass-by-value или pass-by-reference? Почему метод, переприсвоивший аргумент-объект, не меняет переменную снаружи, а вызвавший setter — меняет?",
  "a": "Java всегда строго pass-by-value, без исключений. Для ссылочных типов копируется значение ссылки (адрес-указатель на объект в куче), а не сам объект. Переприсвоение `arg = new X()` внутри метода меняет только локальную копию ссылки — внешняя переменная по-прежнему указывает на старый объект. А `arg.setField(...)` идёт по копии ссылки к тому же объекту в куче и мутирует его состояние — поэтому изменение видно снаружи.",
  "d": "Примитивы передаются копией значения напрямую; «объект» вообще никогда не передаётся — передаётся только копия 32/64-битной ссылки на него."
 },
 {
  "id": "jc-mutable-key",
  "t": "Java",
  "s": "equals-hashcode",
  "q": "Положил объект в HashMap как ключ, потом изменил поле, участвующее в hashCode/equals. Почему get() теперь возвращает null, хотя equals и hashCode переопределены правильно?",
  "a": "При put() HashMap вычисляет hashCode ключа и кладёт Node в бакет с индексом `(n-1) & hash`. После мутации поля hashCode меняется, и get() ищет уже в ДРУГОМ бакете — до старой Node он не доходит, equals даже не вызывается. Запись «осиротела»: она физически в таблице, но недостижима по новому ключу, при этом и по старому значению hashCode её тоже не найти (старого объекта с прежним хешем уже нет). Контракт HashMap требует, чтобы ключ был эффективно иммутабельным по полям, входящим в hashCode/equals.",
  "d": "Хеш не пересчитывается на лету: HashMap кеширует поле `hash` в самой Node при вставке, поэтому даже исходный бакет помнит старый хеш ключа, а индекс бакета берётся от нового — рассинхрон гарантирован."
 },
 {
  "id": "jc-chm-internals",
  "t": "Java",
  "s": "collections",
  "q": "Как ConcurrentHashMap устроен внутри в Java 8+ (без сегментов)? Почему запись блокирует только один бакет, почему запрещены null-ключи/значения и почему size() — приблизительный?",
  "a": "В Java 8+ сегменты (ReentrantLock-сегменты из Java 7) убраны: структура — это один массив бакетов `Node[] table`, и блокировка делается на уровне отдельного бакета через `synchronized` на головном `Node` этого бакета. Если бакет пуст, вставка идёт вообще без блокировки — через CAS (`tabAt`/`casTabAt` на Unsafe/VarHandle); коллизии хранятся либо списком, либо красно-чёрным деревом (`TreeBin`) при ≥8 элементах и таблице ≥64. `null`-ключи/значения запрещены, потому что в конкурентной среде `get`, вернувший `null`, был бы неотличим от «ключа нет» vs «значение есть, но это null» — а без блокировки нельзя сделать атомарный `containsKey`+`get`, чтобы это разрешить. `size()` приблизителен, потому что счётчик распределён по массиву `CounterCell[]` (как `LongAdder`) и суммируется без глобального лока, так что параллельные модификации дают слегка неточный результат.",
  "d": "При записи в непустой бакет поток держит `synchronized` только на головном Node, поэтому записи в разные бакеты идут параллельно; resize кооперативный — несколько потоков переносят бакеты одновременно, а наткнувшийся на переносимый бакет видит `ForwardingNode` (hash = MOVED = -1) и помогает переносу."
 },
 {
  "id": "jc-iterator-removal",
  "t": "Java",
  "s": "collections",
  "q": "Как безопасно удалять элементы во время обхода коллекции? Чем Iterator отличается от ListIterator, и почему iterator.remove()/removeIf не кидают ConcurrentModificationException, а list.remove() в for-each кидает?",
  "a": "Безопасно удалять можно через сам итератор: iterator.remove() или collection.removeIf(predicate). У ArrayList есть поле modCount (число структурных изменений); итератор при создании запоминает его в expectedModCount и сверяет на каждом next()/hasNext(). list.remove() меняет modCount напрямую, а итератор (который под капотом у for-each) свой expectedModCount не обновляет — на следующем next() видит расхождение и бросает ConcurrentModificationException (fail-fast). iterator.remove() удаляет и тут же синхронизирует expectedModCount = modCount, поэтому исключения нет. ListIterator — расширение Iterator только для List: умеет идти в обе стороны (hasPrevious/previous), знает индекс (nextIndex/previousIndex) и дополнительно к remove() имеет set(e) и add(e).",
  "d": "CME — это эвристика fail-fast, а не гарантия: на null-полях или из-за race её можно «проскочить», полагаться на ловлю CME для логики нельзя. Для конкурентного обхода без CME — CopyOnWriteArrayList (снапшот, remove() итератора бросает UnsupportedOperationException) или ConcurrentHashMap (weakly consistent итератор)."
 },
 {
  "id": "gap-co-sync-vs-reentrantlock",
  "t": "Concurrency",
  "s": "locks",
  "q": "synchronized vs ReentrantLock vs ReadWriteLock — что даёт ReentrantLock, чего нет у synchronized (tryLock, fairness, прерываемость), и когда вообще нужен ReadWriteLock?",
  "a": "synchronized — это JVM-встроенный монитор: блокирующий, нечестный, неразрывный захват, блок строго в рамках метода/блока (lock/unlock неявны). ReentrantLock даёт то, чего у монитора нет: tryLock() (захват без вечного ожидания + tryLock с таймаутом), lockInterruptibly() (поток можно прервать в ожидании), опциональный fairness через new ReentrantLock(true) (FIFO-очередь, защита от starvation), и Condition вместо одного wait/notify. ReentrantReadWriteLock нужен при паттерне read-heavy: много параллельных читателей, редкие писатели — readLock держится несколькими потоками одновременно, writeLock эксклюзивен; на write-heavy он проигрывает обычному lock из-за overhead.",
  "d": "С Java 8+ для счётчиков/аккумуляторов часто лучше LongAdder/Atomic, а вместо ReadWriteLock — StampedLock с оптимистичным чтением (tryOptimisticRead), который не блокирует писателей вовсе."
 },
 {
  "id": "gap-co-interruption-cancellation",
  "t": "Concurrency",
  "s": "cancellation",
  "q": "Как корректно отменить выполняющуюся задачу/поток через interrupt()? Что значит флаг прерывания, почему нельзя глотать InterruptedException и почему Thread.stop() выпилили?",
  "a": "interrupt() не «убивает» поток — он лишь выставляет внутренний флаг прерывания (boolean) и используется как кооперативный сигнал «пора останавливаться». Блокирующие методы (Thread.sleep, Object.wait, BlockingQueue.take, Future.get) при этом бросают InterruptedException и при выбросе СБРАСЫВАЮТ флаг; поэтому в catch нужно либо восстановить флаг через Thread.currentThread().interrupt(), либо пробросить исключение выше — иначе вышестоящий код (пул, while(!isInterrupted())) не узнает об отмене и зависнет. Долгие вычисления без блокировок должны сами опрашивать Thread.currentThread().isInterrupted() в цикле. Thread.stop() устарел и выпилен (помечен deprecated с 1.2, в Java 20 бросает UnsupportedOperationException), потому что он асинхронно бросал ThreadDeath в произвольной точке, освобождая мониторы и оставляя объекты в полуобновлённом, повреждённом состоянии — без шансов на корректную очистку.",
  "d": "isInterrupted() только читает флаг, а статический Thread.interrupted() читает И сбрасывает его — на этом ловят при ручной проверке статуса."
 },
 {
  "id": "gap-co-safe-publication-final",
  "t": "Concurrency",
  "s": "memory",
  "q": "Что такое безопасная публикация (safe publication) объекта между потоками и какие гарантии даёт final-поле в immutable-классе? Почему объект может «протечь» наполовину сконструированным?",
  "a": "Безопасная публикация — это публикация ссылки на объект так, чтобы поток-читатель гарантированно увидел все его поля в состоянии, актуальном на момент публикации (а не до-конструированном). JMM не гарантирует, что запись ссылки и запись полей объекта станут видны другому потоку атомарно и в порядке программы: без happens-before компилятор/процессор могут переупорядочить присваивания, и читатель увидит ненулевую ссылку, но поля ещё в default-значениях (0/null) — это и есть «протечка» полусконструированного объекта. Корректные способы публикации дают happens-before: запись в volatile/AtomicReference, под одним lock, через final-поле (JLS §17.5: после возврата конструктора все final-поля видны корректно без синхронизации, при условии что this не «убежал» из конструктора), а также static-инициализатор и потокобезопасные коллекции.",
  "d": "Гарантия final распространяется и на объекты, достижимые через цепочку final-полей (например, элементы final-массива или поля во вложенном immutable-объекте) — это «freeze action» в конце конструктора, формирующая happens-before к чтениям этих полей."
 },
 {
  "id": "gap-co-wait-notify-spurious",
  "t": "Concurrency",
  "s": "monitor",
  "q": "Почему wait() всегда вызывают в цикле while, а не в if? Что такое spurious wakeup и в чём разница notify() vs notifyAll()?",
  "a": "wait() оборачивают в while, потому что условие нужно перепроверять после пробуждения: поток мог проснуться, но условие уже снова ложно. Причин три: spurious wakeup (ложное пробуждение без notify, разрешённое JLS и реальное на POSIX-системах из-за прерванных futex/condvar-ожиданий); конкуренция — между notify и захватом монитора другой поток успел изменить состояние; и notifyAll, будящий несколько ожидающих на одно событие. notify() будит ровно один произвольный поток из wait-set, notifyAll() — все; notify() безопасен только когда все ждут одного и того же условия и одно событие нужно отдать одному потоку, иначе используют notifyAll, чтобы не потерять сигнал (lost wakeup).",
  "d": "Все три метода (wait/notify/notifyAll) требуют удержания монитора объекта, иначе IllegalMonitorStateException; wait() атомарно отпускает монитор и засыпает, а при пробуждении заново его захватывает."
 },
 {
  "id": "gap-jvm-gc-roots",
  "t": "JVM",
  "s": "gc-roots/reachability",
  "q": "Что такое GC roots и как сборщик решает, что объект «мусор»? Почему два объекта, ссылающиеся друг на друга, всё равно соберутся?",
  "a": "GC roots — это набор «корневых» ссылок, заведомо живых: ссылки в стеках потоков (локальные переменные, параметры), static-поля загруженных классов, JNI-ссылки (local/global), активные мониторы (synchronized), а также внутренние ссылки JVM (например, объекты в процессе finalize). Современные сборщики (G1, ZGC, Parallel) используют tracing/mark-and-sweep, а НЕ подсчёт ссылок: они стартуют от GC roots и проходят граф достижимости, помечая всё, до чего можно дойти; всё непомеченное считается мусором. Поэтому два объекта A&harr;B, ссылающиеся друг на друга, но недостижимые ни от одного root, образуют изолированный «островок» и собираются — взаимные ссылки не делают их живыми, важна именно достижимость от корней, а не наличие входящих ссылок.",
  "d": "Это ключевое отличие tracing GC (HotSpot) от reference counting (как в CPython): RC ломается на циклах, а tracing их обрабатывает естественно, так как считает живым только достижимое от roots."
 },
 {
  "id": "gap-jvm-write-barrier-cardtable",
  "t": "JVM",
  "s": "write-barrier/card-table",
  "q": "При minor GC сканируется только young generation, но на молодой объект может ссылаться объект из old gen. Как сборщик находит такие old→young ссылки, не сканируя весь old целиком?",
  "a": "При каждой записи ссылки в поле объекта JIT вставляет write barrier — короткий кусок кода, который помечает «грязной» соответствующую карту в card table. Card table — это байтовый массив, где один байт покрывает регион кучи (в HotSpot — 512 байт). Во время minor GC сборщик сканирует только грязные карты old gen (плюс корни), находит в них старые объекты, ссылающиеся на young, и добавляет эти ссылки в GC roots для young. Так стоимость поиска old→young пропорциональна числу изменённых карт, а не размеру всего old gen.",
  "d": "В Serial/Parallel/CMS используется именно card table; G1 поверх card table добавляет remembered set (RSet) на каждый регион, потому что регионы собираются по отдельности и нужно знать input-ссылки для каждого конкретного региона, а не только old→young."
 },
 {
  "id": "gap-jvm-object-header-coops",
  "t": "JVM",
  "s": "object-layout/compressed-oops",
  "q": "Сколько байт «весит» пустой объект и из чего состоит его заголовок (mark word, klass pointer)? Что делает -XX:+UseCompressedOops и почему на heap чуть больше 32 ГБ расход памяти внезапно растёт?",
  "a": "На 64-bit HotSpot заголовок объекта = mark word (8 байт: hash, биты GC age, lock bits / указатель на monitor) + klass pointer (4 байта при сжатых указателях, иначе 8). Пустой `Object` весит 16 байт: 12 байт заголовка + 4 байта паддинга до выравнивания в 8 байт; у массива добавляется ещё 4 байта длины. `-XX:+UseCompressedOops` (по умолчанию при heap &lt; 32 ГБ) хранит ссылки в 4 байтах вместо 8, кодируя 35-битный диапазон через сдвиг на 3 бита (опираясь на 8-байтовое выравнивание объектов).",
  "d": "Чуть выше 32 ГБ JVM не может адресовать кучу 32-битными oops даже со сдвигом, отключает CompressedOops (и CompressedClassPointers) — все ссылки и klass-указатели снова по 8 байт, поэтому ~33-гигабайтная куча реально вмещает меньше объектов, чем 31-гигабайтная."
 },
 {
  "id": "gap-jvm-classloader-leak",
  "t": "JVM",
  "s": "classloader-leak",
  "q": "После нескольких hot-redeploy приложения в Tomcat/WildFly падает Metaspace, хотя приложение каждый раз «выгружается». Что удерживает старый ClassLoader и почему утекает целая иерархия классов?",
  "a": "ClassLoader выгружается из Metaspace только если становится недостижим он сам — а для этого недостижимыми должны стать ВСЕ загруженные им классы и ВСЕ их экземпляры (каждый объект достаёт свой загрузчик через getClass().getClassLoader()). Одна живая strong-ссылка из долгоживущего кода ВНЕ webapp на любой класс/экземпляр приложения удерживает всю иерархию по цепочке `instance → Class → defining ClassLoader → все остальные классы`. Классика: ThreadLocal с value-классом из webapp на потоке из общего пула (без remove()), статика JDK/контейнера (java.sql.DriverManager, java.beans.Introspector), не остановленный поток, запущенный приложением, JNDI/MBean/shutdown-hook, зарегистрированные на уровне JVM. Старый загрузчик не собирается GC → его регион Metaspace не освобождается → после N редеплоев получаем OutOfMemoryError: Metaspace.",
  "d": "Найти держателя: heap dump → Eclipse MAT → «Path to GC Roots» для объекта WebappClassLoader с исключением weak/soft/phantom — увидишь точную strong-цепочку до GC root."
 },
 {
  "id": "gap-jvm-invokedynamic-lambda",
  "t": "JVM",
  "s": "invokedynamic/lambda-bytecode",
  "q": "Во что компилируется лямбда на уровне байткода? Почему это invokedynamic + LambdaMetafactory, а не сгенерированный анонимный класс, и что это даёт?",
  "a": "Тело лямбды javac кладёт в приватный синтетический static-метод того же класса (напр. lambda$main$0), а в точке использования генерирует инструкцию invokedynamic с bootstrap-методом LambdaMetafactory.metafactory(...). При первом исполнении этого indy-сайта bootstrap вызывается один раз, через CallSite возвращает реализацию функционального интерфейса (класс генерируется в рантайме внутренним фреймворком InnerClassLambdaMetafactory как hidden class), и результат намертво линкуется в constant CallSite — последующие вызовы это просто прямой инвок без повторной генерации. Класс-носитель лямбды НЕ создаётся компилятором: решение, КАК материализовать лямбду, отложено на рантайм.",
  "d": "Stateless-лямбды без захвата (не используют this и локальные переменные) LambdaMetafactory кэширует как singleton, поэтому такая лямбда не аллоцирует объект на каждом вызове — в отличие от анонимного класса, где new всегда создаёт инстанс."
 },
 {
  "id": "jc-optional-misuse",
  "t": "Java",
  "s": "optional",
  "q": "Как НЕ надо пользоваться Optional? Почему opt.get() без проверки, isPresent()+get() вместо map/orElse, и Optional как поле/параметр/элемент коллекции — это анти-паттерны?",
  "a": "Optional задумана Брайаном Гетцем строго как тип возвращаемого значения метода, чтобы явно сигнализировать «результата может не быть». opt.get() без проверки бросает NoSuchElementException и ничем не лучше NPE — он лишь маскирует ту же проблему. Связка if(isPresent()) get() — это императивный пересказ того, что декларативно делают map/filter/orElse/orElseGet/ifPresent, только многословнее и с риском забыть ветку else. Optional как поле/параметр/элемент коллекции — анти-паттерн: класс не Serializable (лишний оверхед памяти и сборка мусора), три состояния у параметра (значение / empty / null) вместо двух, а в коллекциях вместо Optional нужен пустой список или отсутствие ключа.",
  "d": "С Java 10 есть opt.orElseThrow() без аргументов — читается яснее, чем get(); а get() в новых ревью часто помечают как «запрещён, используй orElseThrow»."
 },
 {
  "id": "jc-optional-orelse",
  "t": "Java",
  "s": "optional",
  "q": "orElse vs orElseGet vs orElseThrow — в чём разница? Почему orElse(expensiveCall()) вычисляется ВСЕГДА, даже когда значение есть?",
  "a": "orElse(T other) принимает уже готовое значение, поэтому аргумент вычисляется ДО вызова метода — Java вычисляет аргументы перед передачей (eager evaluation), и expensiveCall() отрабатывает всегда, даже если Optional не пуст и результат отбрасывается. orElseGet(Supplier) принимает лямбду и зовёт её ЛЕНИВО — только когда значение реально отсутствует (isPresent() == false). orElseThrow(Supplier) тоже ленив: бросает указанное исключение лишь при пустом Optional, а без аргумента (Java 10+) кидает NoSuchElementException.",
  "d": "Правило: orElse — для дешёвых констант/литералов; orElseGet — когда фоллбэк дорогой (запрос в БД, new объект, обращение к сети) или имеет side-effects."
 },
 {
  "id": "gap-serial-version-uid",
  "t": "Java",
  "s": "serialization",
  "q": "Что такое serialVersionUID и что произойдёт при десериализации, если ты добавил поле в класс, но не тронул UID — а если изменил его?",
  "a": "serialVersionUID — это long-идентификатор версии Serializable-класса, который ObjectInputStream сравнивает у десериализуемого потока и текущего класса. Если ты добавил поле, но оставил тот же UID — десериализация проходит успешно: новое поле получает значение по умолчанию (null/0/false), это compatible-изменение по правилам JVM Serialization Spec. Если же ты изменил UID — JVM считает классы несовместимыми и бросает java.io.InvalidClassException (\"local class incompatible: stream classdesc serialVersionUID = ... ; local class serialVersionUID = ...\"), даже если структура полей идентична.",
  "d": "Если UID не объявлен явно, компилятор/рантайм вычисляет его автоматически по сигнатуре класса (имя, поля, методы, интерфейсы) через SHA-1, поэтому даже добавление private-метода или смена модификатора может молча сломать совместимость между сборками."
 },
 {
  "id": "gap-serial-deser-security",
  "t": "Java",
  "s": "serialization",
  "q": "Почему нативная Java-сериализация считается опасной и как из десериализации недоверенного потока получают RCE (gadget chains)?",
  "a": "Опасность в том, что `ObjectInputStream.readObject()` восстанавливает граф объектов ДО какой-либо валидации типов на уровне приложения: атакующий контролирует байты, а значит — какие классы инстанцируются и какие их магические методы (`readObject`, `readResolve`, `readExternal`, а для прокси/мапов — `hashCode`/`equals`/`compareTo`) выполнятся в процессе восстановления. Gadget chain — это цепочка из уже присутствующих на classpath «безобидных» классов (gadgets), где один такой колбэк по reflection вызывает следующий, и финальное звено доходит до `Runtime.exec()` / `Method.invoke()` / создания шаблона TemplatesImpl с байткодом. Классические source-gadget'ы: `AnnotationInvocationHandler` + `LazyMap`/`TransformerChain` из commons-collections 3.1, `BadAttributeValueExpException`, JDK7/8 `Templates`-цепочки — все они срабатывают сами на этапе `readObject`, без вызова прикладного кода.",
  "d": "Ключевой нюанс: уязвим сам факт `readObject` над чужими байтами — не нужны ни «опасные» прикладные классы, ни вызов десериализованного объекта; достаточно нужных gadget'ов на classpath, поэтому ysoserial и генерирует payload'ы под конкретные библиотеки."
 },
 {
  "id": "gap-exc-interrupted",
  "t": "Java",
  "s": "exceptions",
  "q": "Прилетел InterruptedException — почему его нельзя просто проглотить, и что значит «восстановить флаг прерывания» (Thread.currentThread().interrupt())?",
  "a": "Когда блокирующий метод (sleep, wait, join, Lock.lockInterruptibly, BlockingQueue.take) бросает InterruptedException, JVM СБРАСЫВАЕТ статус прерывания потока в false. Если в catch проглотить исключение, вы теряете сигнал отмены: вышестоящий код (пул, цикл воркера) больше не узнает, что поток просили остановить, и продолжит работать. Поэтому в catch либо пробрасываете исключение выше, либо — если пробросить нельзя — вызываете Thread.currentThread().interrupt(), чтобы заново выставить флаг и дать верхним уровням шанс корректно завершиться.",
  "d": "Прерывание в Java кооперативное: interrupt() не убивает поток, а лишь ставит флаг/будит блокировку — отреагировать на него обязан сам код, иначе сигнал просто потеряется."
 },
 {
  "id": "sp-tx-rollback-only",
  "t": "Spring",
  "s": "tx",
  "q": "Внешний @Transactional (REQUIRED) вызвал внутренний метод, тот бросил и поймал исключение — а на коммите внешнего прилетает UnexpectedRollbackException. Почему транзакция «помечена rollback-only» и как это правильно лечить?",
  "a": "Внутренний метод тоже @Transactional с REQUIRED, поэтому он не создал новую физическую транзакцию, а присоединился к существующей. Когда из него вылетело RuntimeException, перехватчик Spring (TransactionInterceptor/TransactionAspectSupport) пометил единственную общую физическую транзакцию через setRollbackOnly() — это глобальный флаг rollbackOnly в resource holder. Внешний try/catch проглотил исключение, но флаг уже выставлен, поэтому при коммите внешней транзакции AbstractPlatformTransactionManager видит rollbackOnly=true, делает rollback вместо commit и бросает UnexpectedRollbackException. Правильное лечение: не глотать молча — либо дать исключению пробросить наружу, либо изолировать внутренний метод как Propagation.REQUIRES_NEW (отдельная физическая транзакция, чей откат не пачкает родителя), либо если откат внутреннего недопустим — не помечать его @Transactional / поймать исключение ВНУТРИ него до выхода из proxy.",
  "d": "Флаг rollbackOnly «прилипает» к физической транзакции, а логические вложенные REQUIRED-транзакции его лишь разделяют — поэтому пометка из любого участника обрекает на откат весь набор («participating transaction failed»)."
 },
 {
  "id": "sp-aspect-order",
  "t": "Spring",
  "s": "aop",
  "q": "На одном методе висят @Transactional, @Cacheable, @Retryable и свой @Aspect. В каком порядке они применяются и как этим управлять? Почему ретрай «внутри» транзакции и кэш «снаружи» — это про @Order?",
  "a": "Порядок задаёт цепочка advisor'ов, отсортированных по `Ordered.getOrder()` / `@Order`: чем МЕНЬШЕ значение, тем БЛИЖЕ к снаружи (раньше входит в proxy, позже отдаёт результат). Дефолты: `@Cacheable` (CacheInterceptor) = `Ordered.LOWEST_PRECEDENCE`, `@Transactional` тоже `LOWEST_PRECEDENCE`, `@Retryable` (RetryInterceptor) = `LOWEST_PRECEDENCE - 1`, то есть ретрай чуть «внутреннее». При одинаковом order реальный порядок недетерминирован, поэтому управляют явно: ставят `@EnableTransactionManagement(order = ...)`, `@EnableCaching(order = ...)`, `@Order` на своём аспекте. Кэш хотят СНАРУЖИ (cache hit вообще не открывает транзакцию и не делает ретрай), а ретрай — ВНУТРИ транзакции опасен: повтор переоткрывает уже rolled-back/marked-rollback транзакцию.",
  "d": "На самом деле для «retry с новой транзакцией на каждой попытке» нужно наоборот — @Retryable СНАРУЖИ @Transactional, чтобы каждая попытка получала свежий `REQUIRES_NEW`-контекст, иначе после первого отката transaction marked rollback-only ломает все повторы."
 },
 {
  "id": "sp-config-props",
  "t": "Spring",
  "s": "boot",
  "q": "@ConfigurationProperties vs @Value: чем биндинг целого префикса лучше точечного инжекта, что такое relaxed binding и как навесить валидацию (@Validated) на конфиг?",
  "a": "@ConfigurationProperties биндит целый префикс на типизированный POJO одним объектом: type-safe, поддерживает вложенные структуры, List/Map/Duration/DataSize, IDE-метаданные и, главное, relaxed binding. @Value('${...}') инжектит одно свойство строкой через SpEL — без relaxed binding, без вложенности, требует точного имени ключа. Relaxed binding — это сопоставление имени поля разным форматам ключа: server.port мапится на serverPort, server-port, SERVER_PORT (env), server.PORT — Spring нормализует через ConfigurationPropertyName. Валидация: вешаешь @Validated на класс @ConfigurationProperties и JSR-380 аннотации (@NotNull, @Min, @Email) на поля — ошибки ловятся на старте контекста (BindValidationException), а не в рантайме.",
  "d": "Регистрируется POJO через @EnableConfigurationProperties(MyProps.class) или @ConfigurationPropertiesScan; с конструкторным биндингом (@ConstructorBinding / record) поля становятся immutable и не требуют @Component."
 },
 {
  "id": "h-l1-persistence-context",
  "t": "Spring",
  "s": "persistence-context",
  "q": "Что такое контекст персистентности (first-level cache) и почему два find() по одному id в одной транзакции возвращают ТОТ ЖЕ объект и делают всего один SELECT?",
  "a": "Контекст персистентности — это набор управляемых (managed) сущностей, привязанный к жизненному циклу EntityManager (в Spring при @Transactional он один на транзакцию). Внутри него действует first-level cache: Map с ключом EntityKey (тип сущности + id), значение — единственный экземпляр объекта. Первый find() делает SELECT и кладёт сущность в эту Map; второй find() по тому же id находит её в Map и возвращает ту же ссылку без обращения к БД. Это гарантирует identity guarantee: для одного id в пределах персистентного контекста существует ровно один объект (==, не только equals).",
  "d": "L1-кэш нельзя выключить — он встроен в сам EntityManager; «обойти» его можно только через em.clear()/detach() или нативный SQL-запрос, который при выполнении флашит, но возвращённые managed-сущности всё равно берутся из L1 по их id."
 },
 {
  "id": "h-l2-cache-query-cache",
  "t": "Spring",
  "s": "second-level-cache",
  "q": "Чем second-level cache (L2) отличается от L1, почему он живёт на уровне SessionFactory, и когда он реально помогает, а когда только вредит (плюс что такое query cache)?",
  "a": "L1-кэш (persistence context) живёт в рамках одной Session/EntityManager и существует всегда: он гарантирует identity и dirty checking, умирает вместе с транзакцией. L2 живёт на уровне SessionFactory и шарится между всеми сессиями приложения, поэтому хранит данные сущности (разобранное состояние в виде CacheEntry, а не managed-объекты) и переживает закрытие транзакций — его надо явно включать (hibernate.cache.use_second_level_cache + @Cacheable/@Cache с провайдером типа Ehcache/Infinispan/Caffeine). Реально помогает на read-mostly справочниках с высоким read/write-ratio, по доступу через PK или @OneToOne/@ManyToOne; вредит на часто меняющихся данных (постоянные инвалидации), в кластере без распределённого кэша (расхождение узлов) и при NONSTRICT_READ_WRITE, где возможны грязные чтения. Query cache (hibernate.cache.use_query_cache + setCacheable(true)) кэширует только список идентификаторов результата запроса, а сами сущности тянет из L2, поэтому без включённого L2 на сущности он почти бесполезен и легко даёт N+1 и лавину инвалидаций.",
  "d": "Query cache инвалидируется по UpdateTimestampsCache: любая запись в таблицу, участвующую в запросе, помечает её timestamp и обесценивает ВСЕ закэшированные запросы по этой таблице — поэтому на часто пишущихся таблицах он работает в минус."
 },
 {
  "id": "h-entity-equals-hashcode",
  "t": "Spring",
  "s": "entity-equals",
  "q": "Как правильно писать equals()/hashCode() для JPA-сущности и почему генерируемый @Id ломает HashSet, если положить в него ещё не сохранённую сущность?",
  "a": "До flush у transient-сущности id == null, а после INSERT БД присваивает значение. HashSet кладёт объект в бакет по hashCode() в момент add(); если hashCode зависит от id, то после flush он меняется, объект остаётся в старом бакете — и contains()/remove() его уже не находят. Правильно: hashCode() возвращает КОНСТАНТУ (обычно по getClass()), а equals() сравнивает по бизнес-ключу или по id с учётом null; на «голый id» полагаться нельзя.",
  "d": "Канон Vlad Mihalcea: equals/hashCode по натуральному (бизнес) ключу; если его нет — equals по id, а hashCode = константа (например getClass().hashCode()), чтобы он был стабилен через весь жизненный цикл entity."
 },
 {
  "id": "g-db-normalization-forms",
  "t": "DB",
  "s": "normalization",
  "q": "Объясни 1NF / 2NF / 3NF на одном примере таблицы заказов. Что конкретно нарушено на каждом шаге и зачем вообще нормализовать схему?",
  "a": "Возьмём «плоскую» таблицу Orders(order_id, product_id, product_list, qty, customer_id, customer_city, city_region) с PK (order_id, product_id). **1NF** требует атомарных значений: колонка product_list со списком товаров через запятую нарушает 1NF — выносим каждый товар в отдельную строку. **2NF** запрещает частичную зависимость неключевого атрибута от ЧАСТИ составного ключа: customer_id зависит только от order_id (части ключа), а не от всего (order_id, product_id) — это 2NF-нарушение, выносим в Orders. **3NF** запрещает транзитивные зависимости неключевых атрибутов: city_region зависит от customer_city, а не напрямую от ключа (order_id → customer_city → city_region) — выносим в справочник City. Нормализуем, чтобы убрать аномалии вставки/обновления/удаления и дублирование, а не «ради красоты».",
  "d": "Каждая последующая форма строго включает предыдущую: схема в 3NF автоматически в 2NF и 1NF; 2NF и 3NF имеют смысл только при СОСТАВНОМ ключе или транзитивной цепочке — при простом одноколоночном PK частичных зависимостей быть не может, и таблица сразу как минимум в 2NF."
 },
 {
  "id": "g-db-denormalization",
  "t": "DB",
  "s": "normalization",
  "q": "Схема нормализована до 3NF, но read-запросы с кучей JOIN тормозят. Когда осознанно денормализуют, чем за это платят и как держат данные согласованными?",
  "a": "Денормализуют, когда read-нагрузка доминирует и JOIN'ы по большим таблицам стали узким местом, которое уже не лечится индексами/покрывающими индексами и переписыванием запросов. Платят за это write-аномалиями: одни и те же данные лежат в нескольких местах, поэтому каждая запись должна обновлять все копии атомарно, иначе расходятся (update/insert/delete anomalies, ради устранения которых и вводили 3NF). Согласованность держат либо синхронно в той же транзакции (триггеры, обновление дублей в одном UPDATE), либо асинхронно через materialized view с REFRESH, CDC/outbox или пересчёт по расписанию — в обмен на eventual consistency. Ключевой принцип: денормализация — это осознанный трейд read-скорости за write-сложность, а не «забыли нормализовать».",
  "d": "Прежде чем дублировать колонки, исчерпай дешёвые средства: covering/partial индексы, переписывание запроса, materialized view (в Postgres он не auto-refresh — нужен REFRESH MATERIALIZED VIEW CONCURRENTLY), и денормализацию агрегатов (счётчики, суммы), а не сырых строк."
 },
 {
  "id": "g-db-clustered-index",
  "t": "DB",
  "s": "index/clustered",
  "q": "Кластерный vs некластерный индекс — в чём разница, и почему в Postgres «кластерного индекса как в MySQL/SQL Server» по сути нет (PK не упорядочивает heap)?",
  "a": "Кластерный индекс задаёт физический порядок строк на диске: в нём листья B-tree содержат сами строки (InnoDB всегда кластеризует по PK, поэтому таблица = и есть PK-индекс). Некластерный (вторичный) индекс хранит ключ + указатель на строку, что добавляет лишний доступ. В Postgres все таблицы — heap (неупорядоченная куча), а любой индекс, включая PRIMARY KEY, всегда вторичный: лист B-tree хранит ключ + физический адрес ctid (page, offset). Команда CLUSTER лишь однократно физически пересортирует heap по индексу и не поддерживает порядок при последующих INSERT/UPDATE.",
  "d": "Следствие: в InnoDB вторичный индекс хранит значение PK (а не указатель), поэтому поиск по нему делает двойной обход — secondary B-tree, затем PK B-tree (bookmark lookup); в Postgres все индексы симметричны и ведут к ctid."
 },
 {
  "id": "g-db-ranking-functions",
  "t": "DB",
  "s": "sql/window",
  "q": "ROW_NUMBER() vs RANK() vs DENSE_RANK() — в чём разница при равных значениях, и как с их помощью взять «топ-1 сделку на клиента» или дедуплицировать строки?",
  "a": "Все три — ранжирующие оконные функции, считающие позицию строки внутри секции `PARTITION BY` по порядку `ORDER BY`. ROW_NUMBER() всегда даёт уникальный последовательный номер (1,2,3,4), произвольно разрывая ничьи; RANK() присваивает одинаковый ранг равным значениям и оставляет «дыры» (1,1,3,4); DENSE_RANK() тоже даёт равным одинаковый ранг, но без дыр (1,1,2,3). Для «топ-1 сделку на клиента» берут `ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY amount DESC)` и фильтруют `= 1` во внешнем запросе. Для дедупликации — тот же ROW_NUMBER() по бизнес-ключу в PARTITION BY и удаляют/оставляют строки с номером > 1.",
  "d": "Оконная функция не может стоять в WHERE/HAVING той же выборки (она вычисляется после них), поэтому фильтрацию `rn = 1` оборачивают в подзапрос/CTE или используют `QUALIFY` (BigQuery, Snowflake, ClickHouse)."
 },
 {
  "id": "g-db-gap-next-key-locks",
  "t": "DB",
  "s": "tx/locks",
  "q": "Каким именно механизмом БД предотвращает фантомные чтения на Repeatable Read / Serializable — что такое gap lock и next-key lock (InnoDB) и предикатные блокировки (PG SSI)?",
  "a": "InnoDB блокирует не только существующие строки, но и «промежутки» между значениями индекса. Gap lock запирает открытый интервал между двумя соседними индексными ключами (например, (10,20)), запрещая вставку в него; next-key lock = record lock на саму строку ПЛЮС gap lock на промежуток перед ней — это режим по умолчанию на REPEATABLE READ, который и убивает фантомы. PostgreSQL идёт другим путём: на SERIALIZABLE он использует SSI (Serializable Snapshot Isolation) с предикатными блокировками (SIREAD-локи) — это не блокирующие, а «отслеживающие» маркеры на прочитанных строках/страницах/индексных диапазонах; СУБД детектит опасные циклы зависимостей rw-конфликтов и откатывает одну из транзакций с serialization_failure (SQLSTATE 40001).",
  "d": "Ключевое отличие: InnoDB предотвращает фантом пессимистично (блокирует промежуток, вставка ждёт), а PG SSI — оптимистично (никого не блокирует на чтении, но может откатить на коммите)."
 },
 {
  "id": "de-dynamic-dispatch",
  "t": "Design",
  "s": "oop",
  "q": "Статическое vs динамическое связывание: почему перегрузка (overload) выбирается на компиляции, а переопределение (override) — в рантайме? Что выведет вызов перегруженного метода, если аргумент объявлен как Object, а реально это String?",
  "a": "Перегрузка разрешается на этапе компиляции по СТАТИЧЕСКОМУ (объявленному) типу аргумента — компилятор фиксирует конкретную сигнатуру и зашивает символическую ссылку через invokevirtual/invokestatic. Переопределение разрешается в рантайме по РЕАЛЬНОМУ типу объекта через виртуальную диспетчеризацию (vtable): invokevirtual ищет фактическую реализацию в классе объекта. Поэтому при Object x = \"hello\"; p(x) выберется перегрузка p(Object) — выведет \"Object: hello\", потому что статический тип x — это Object, а не String.",
  "d": "Чтобы попасть в p(String), нужно изменить статический тип: либо объявить String x, либо явно скастить — p((String) x); каст меняет то, что видит компилятор при выборе сигнатуры."
 },
 {
  "id": "de-chain-of-responsibility",
  "t": "Design",
  "s": "patterns",
  "q": "Паттерн Chain of Responsibility — что решает? Чем цепочка хендлеров лучше большого if/else, и где ты с ней работаешь, даже не называя её так (Servlet/OncePerRequestFilter, Netty pipeline, interceptors)?",
  "a": "Chain of Responsibility разрывает жёсткую связь «отправитель → конкретный обработчик»: запрос идёт по цепочке независимых хендлеров, каждый решает обработать его сам, делегировать дальше или остановить. В отличие от монолитного if/else, цепочка — это Open/Closed: новый шаг добавляется отдельным классом без правки существующих, порядок задаётся декларативно (через конфиг/`@Order`), а каждый хендлер тестируется и переиспользуется изолированно. На практике это `javax.servlet.Filter`/`FilterChain` и Spring `OncePerRequestFilter`, Netty `ChannelPipeline` с `ChannelHandler`-ами, Spring MVC `HandlerInterceptor`, OkHttp/Spring `ClientHttpRequestInterceptor` и Spring Security `SecurityFilterChain`.",
  "d": "Ключевое отличие реализаций: «чистый» GoF-вариант передаёт запрос только следующему (`next.handle()`), а pipeline-варианты (Filter, Netty, interceptors) дают двусторонний обход — код до `chain.doFilter()` это «спуск» (pre-processing), после — «подъём» (post-processing), что и позволяет одному фильтру и измерять latency, и менять response."
 },
 {
  "id": "de-service-locator",
  "t": "Design",
  "s": "oop",
  "q": "Service Locator vs Dependency Injection — оба «достают» зависимость извне. Почему Service Locator считают антипаттерном и предпочитают DI? В чём он прячет зависимости и ломает тестируемость?",
  "a": "При DI зависимости приходят через конструктор — они явны в сигнатуре, компилятор гарантирует, что без них объект не создать, а в тесте ты просто передаёшь моки. Service Locator же сам тянет зависимость изнутри метода (`locator.get(Foo.class)`), поэтому она невидима в публичном API класса: по конструктору нельзя понять, что классу реально нужно. Это и есть «спрятанная зависимость» — она всплывает только в рантайме как `NPE`/исключение «not registered», а не на этапе компиляции. Тестируемость ломается, потому что для теста надо настроить глобальный/статический локатор (часто синглтон), а это общее изменяемое состояние, которое течёт между тестами и требует teardown.",
  "d": "Ключевой нюанс: Service Locator перекладывает связь с «класс → конкретная зависимость» на «класс → сам локатор», то есть КАЖДЫЙ потребитель связан с инфраструктурой локатора — это глобальная coupling-точка, которую нельзя выпилить локально."
 },
 {
  "id": "de-tell-dont-ask",
  "t": "Design",
  "s": "oop",
  "q": "Принципы Tell-Don't-Ask и Command-Query Separation (CQS): почему «вытащить данные геттерами и решить снаружи» — пахнущий код, и чем отличается команда (меняет состояние, ничего не возвращает) от запроса (возвращает, ничего не меняет)?",
  "a": "Tell-Don't-Ask: не вытаскивай состояние объекта геттерами, чтобы принять решение снаружи, — отдай решение объекту, который этими данными владеет (`account.withdraw(sum)` вместо `if (account.getBalance() >= sum) account.setBalance(...)`). «Спросить-и-решить» снаружи — это feature envy и анемичная модель: логика и инварианты расползаются по вызывающим, объект превращается в мешок данных без защиты. CQS (Бертран Мейер): команда меняет состояние и возвращает `void`, запрос возвращает значение и не имеет побочных эффектов — так запрос можно вызывать сколько угодно раз и в любом порядке, рассуждая о коде без страха скрытых мутаций. Это разные оси: Tell-Don't-Ask про то, ГДЕ живёт решение, а CQS про то, чтобы один метод не делал и то и другое.",
  "d": "Tell-Don't-Ask не абсолютен: для DTO, value-объектов на чтение и репортинга геттеры законны — принцип бьёт по объектам с инвариантами, а не по носителям данных."
 },
 {
  "id": "gap-ds-kafka-transactional-producer",
  "t": "Distributed",
  "s": "kafka-transactions",
  "q": "enable.idempotence у тебя уже включён. Зачем тогда ещё transactional.id, initTransactions() и commitTransaction()? Что даёт транзакционный продьюсер, чего не даёт идемпотентный, и при чём тут consume-process-produce и fencing зомби-продьюсера?",
  "a": "Идемпотентность гарантирует exactly-once только в рамках одной сессии продьюсера к одной партиции (брокер дедуплицирует по PID + sequence number). Транзакции добавляют атомарность через несколько партиций и топиков плюс атомарную фиксацию consumer-офсетов вместе с produce — это и есть паттерн consume-process-produce (read-process-write): через sendOffsetsToTransaction() офсеты входных сообщений коммитятся в той же транзакции, что и выходные записи, поэтому либо всё видно, либо ничего. transactional.id даёт стабильную идентичность поверх рестартов: при initTransactions() координатор транзакций бампит producer epoch, и старый «зомби»-инстанс с тем же transactional.id, но меньшим epoch, получает ProducerFencedException — это и есть zombie fencing. Консьюмеры читают результат только с isolation.level=read_committed.",
  "d": "Идемпотентность — это PID + monotonic sequence на (продьюсер, партиция); транзакции — это поверх ещё и transaction coordinator, transaction log (__transaction_state), маркеры COMMIT/ABORT в партициях и эпоха для fencing."
 },
 {
  "id": "gap-ds-auto-offset-reset",
  "t": "Distributed",
  "s": "offset-reset",
  "q": "Подключаешь НОВУЮ consumer group к топику с историей за месяц — и она либо читает всё с нуля, либо молча игнорирует старое. Что решает auto.offset.reset (earliest vs latest), когда он вообще срабатывает, и почему 'пропавший' закоммиченный офсет (offsets.retention) внезапно проигрывает тот же сценарий на проде?",
  "a": "auto.offset.reset управляет ТОЛЬКО ситуацией, когда у группы НЕТ валидного закоммиченного офсета для партиции (новая группа) ИЛИ когда сохранённый офсет вышел за пределы текущего диапазона (OffsetOutOfRangeException, например офсет старше retention.ms лога). earliest → читать с начала доступного лога (log-start-offset), latest → читать только новые сообщения после момента подключения (high watermark); default — latest. Когда офсет ЕСТЬ и он валиден — параметр не срабатывает вообще, потребитель продолжает с закоммиченной позиции. Подвох на проде: __consumer_offsets имеет свой собственный retention (offsets.retention.minutes, по умолчанию 7 дней с Kafka 2.0; раньше было 24 часа) — если группа простаивала дольше этого срока, брокер удаляет её закоммиченный офсет, и при следующем подключении группа выглядит как 'новая' → срабатывает auto.offset.reset, и earliest внезапно переигрывает весь топик.",
  "d": "none (отдельное значение) запрещает оба сценария: при отсутствии/невалидности офсета бросается исключение вместо тихого ресета — полезно, чтобы поймать проблему явно, а не молча перечитать или потерять данные."
 },
 {
  "id": "gap-ds-kafka-streams-ktable",
  "t": "Distributed",
  "s": "kafka-streams",
  "q": "Kafka Streams: чем KStream отличается от KTable (stream-table duality), где живёт состояние при агрегации/join и зачем changelog-топик и RocksDB? Чем это принципиально лучше, чем «сам читаю consumer'ом и складываю в Postgres»?",
  "a": "KStream — это неограниченный поток независимых событий (insert-семантика, каждая запись — факт), а KTable — это материализованное представление «последнего значения по ключу» (upsert/changelog-семантика, null = tombstone/delete). Stream-table duality: любой changelog-поток можно «свернуть» в таблицу (по последнему значению ключа), а изменения таблицы развернуть обратно в поток дельт. При aggregate/join/reduce состояние живёт локально в инстансе приложения в state store (по умолчанию RocksDB на диске, вне JVM-heap), а для отказоустойчивости каждое изменение store пишется в compacted changelog-топик в Kafka — при падении/ребалансе store восстанавливается из него (или из standby-реплики). Это лучше «consumer + Postgres», потому что состояние шардировано вместе с партициями (co-partitioning, локальные lookup'ы без сетевого round-trip к БД), агрегация и БД обновляются в одной exactly-once транзакции Kafka (consume-process-produce + offset коммитятся атомарно), а не «прочитал → упал до записи в Postgres → дубль/потеря».",
  "d": "GlobalKTable — это полная (нешардированная) копия топика на каждом инстансе: позволяет join по неключевому полю без co-partitioning, но ценой полного дублирования данных и eventual-consistency (обновляется асинхронно, без выравнивания по времени событий с основным потоком)."
 },
 {
  "id": "gap-ds-clock-skew-ordering",
  "t": "Distributed",
  "s": "clock-skew",
  "q": "Почему нельзя упорядочивать события или строить таймауты/лизы по System.currentTimeMillis() (wall-clock) между узлами? Что такое clock skew и дрейф NTP, чем помогут монотонные/логические часы, и почему время — худший способ выбрать «кто был последним»?",
  "a": "System.currentTimeMillis() возвращает wall-clock каждого узла, а часы узлов расходятся: clock skew — мгновенная разница между двумя узлами (десятки мс при NTP, секунды без него), а дрейф — скорость ухода кварца (~10–100 ppm). NTP вдобавок прыгает: после step-коррекции часы могут уйти назад, поэтому «t2 > t1» на разных узлах ничего не доказывает про порядок, а интервал (t2 − t1) на одном узле может стать отрицательным или скакнуть. Для таймаутов/лизов и измерения длительностей берут монотонные часы (System.nanoTime() / CLOCK_MONOTONIC) — они только растут и не корректируются NTP; для причинного порядка событий между узлами — логические часы (Lamport timestamps, векторные часы). «Кто был последним» по времени — худший критерий: LWW (last-write-wins) по wall-clock молча теряет данные при skew, поэтому используют версии/CRDT/кворумы, а не таймстемпы.",
  "d": "Google Spanner вообще не делает вид, что время точное: TrueTime отдаёт интервал [earliest, latest] с границей неопределённости ε и делает commit-wait — ждёт, пока ε пройдёт, чтобы гарантировать внешнюю согласованность; это честное признание, что абсолютного «сейчас» между узлами не существует."
 },
 {
  "id": "gap-ds-group-coordinator-offsets",
  "t": "Distributed",
  "s": "group-coordinator",
  "q": "Где Kafka физически хранит закоммиченные офсеты consumer group и кто дирижирует распределением партиций? Что такое group coordinator и топик __consumer_offsets, и почему офсеты больше НЕ лежат в ZooKeeper?",
  "a": "Закоммиченные офсеты с версии 0.9 хранятся не в ZooKeeper, а в служебном компактируемом топике __consumer_offsets (по умолчанию 50 партиций, RF=3). Коммит офсета — это просто produce-запись с ключом (group.id, topic, partition) и значением (offset, metadata); log compaction оставляет только последнее значение по ключу. Group coordinator — это конкретный брокер, который является лидером той партиции __consumer_offsets, куда мапится группа по формуле abs(hash(group.id)) % offsets.topic.num.partitions; он же ведёт протокол JoinGroup/SyncGroup, отслеживает heartbeat и запускает ребаланс. ZooKeeper выкинули, потому что он не держал нагрузку частых коммитов и был bottleneck'ом; в KRaft (KIP-500) ZK убран полностью.",
  "d": "Важно: сам coordinator НЕ раздаёт партиции — он лишь выбирает одного консьюмера группы лидером (group leader), и уже тот клиент по выбранному assignor'у (RangeAssignor/CooperativeStickyAssignor) считает назначение и возвращает его координатору в SyncGroup."
 },
 {
  "id": "g-te-classicist-mockist",
  "t": "Testing",
  "s": "philosophy",
  "q": "Классическая (Chicago/Detroit) vs мокистская (London) школа TDD — в чём принципиальная разница, и почему чрезмерное мокирование делает тесты хрупкими и привязанными к реализации?",
  "a": "Классическая (Chicago, она же state-based) школа тестирует поведение через состояние: реальные объекты, дублёры только для медленных/недетерминированных коллабораторов (БД, сеть), проверяется результат через assertEquals. Мокистская (London, interaction-based) изолирует каждый класс полностью, заменяя всех коллабораторов на mock'и и проверяя взаимодействия через verify(mock).method() — это outside-in дизайн, управляемый ролями. Чрезмерное мокирование привязывает тест к конкретной последовательности и сигнатурам вызовов (verify(repo).save(x); verify(notifier).send(...)), поэтому любой рефакторинг внутренней реализации (поменяли порядок, объединили вызовы, добавили кэш) ломает зелёные тесты, хотя наблюдаемое поведение не изменилось — тест проверяет «как», а не «что».",
  "d": "Классику обвиняют в больших «обвалах» (один баг в общем объекте красит десятки тестов), мокистов — в over-specification и пропуске интеграционных багов (моки лгут о реальных контрактах — отсюда нужны contract/integration-тесты поверх)."
 },
 {
  "id": "g-te-fake-vs-stub",
  "t": "Testing",
  "s": "doubles",
  "q": "Полная таксономия тестовых дублёров: dummy / stub / fake / mock / spy — чем fake (in-memory реализация порта/репозитория) отличается от stub и когда он лучше мока?",
  "a": "Таксономия Мезароша: **dummy** — заглушка, передаётся, но не используется (заполнить параметр); **stub** — отдаёт заранее заданные ответы на вызовы (state-based, кормит SUT данными); **spy** — записывает факты вызовов для последующей проверки; **mock** — заранее запрограммирован ожиданиями и сам падает при их нарушении (behavior verification); **fake** — рабочая, но упрощённая реализация (in-memory Map вместо JDBC-репозитория). Ключевое отличие fake от stub: stub возвращает захардкоженные ответы и не хранит состояние между вызовами, а fake — это полноценная **поведенческая** реализация контракта порта (save→findById вернёт сохранённое). Fake лучше мока, когда тестируешь несколько взаимодействий через один порт или хочешь проверять результат по состоянию, а не по факту вызовов — мок-цепочки `when().thenReturn()` хрупки и переусложняются, fake же реалистичен и переиспользуется.",
  "d": "Fowler делит дублёры на две философии верификации: stub/fake → **state verification** (проверяем результат), mock → **behavior verification** (проверяем, что нужный метод был вызван с нужными аргументами); spy — это «mock на пост-проверке» (Mockito spy оборачивает реальный объект)."
 },
 {
  "id": "g-te-mockstatic-smell",
  "t": "Testing",
  "s": "mockito",
  "q": "Как мокать статические и final-методы в Mockito (mockStatic, inline mock-maker) и почему необходимость это делать — обычно сигнал плохого дизайна?",
  "a": "Начиная с Mockito 2 нужен `mockito-inline` mock-maker (с 5.x он дефолтный — `mock-maker-inline` через ByteBuddy + Instrumentation API, без PowerMock). `Mockito.mockStatic(Foo.class)` возвращает `MockedStatic<Foo>` — это AutoCloseable, и его ОБЯЗАТЕЛЬНО надо закрывать в try-with-resources, иначе мок статика течёт между тестами и ломает соседние. final-классы и final-методы мокаются inline-maker'ом прозрачно. Необходимость мокать статику — обычно смелл, потому что статический вызов (`LocalDateTime.now()`, `Utils.calc()`) — это жёсткая, скрытая зависимость, которую нельзя подменить через конструктор; это нарушение DIP и признак того, что тип не тестируется в изоляции.",
  "d": "Правильное лечение смелла: вынести статику за порт/интерфейс (например `Clock` вместо `LocalDateTime.now()`, фабрика/провайдер вместо `new`/static factory) и инжектить зависимость, тогда обычный `mock()` достаточен."
 },
 {
  "id": "g-te-doreturn-void",
  "t": "Testing",
  "s": "mockito",
  "q": "when().thenReturn() vs doReturn()/doThrow()/doNothing() — почему void-методы и spy нельзя застабить через when(...), и когда обязателен do*-синтаксис?",
  "a": "when(mock.method()) сначала РЕАЛЬНО вызывает method(): Mockito перехватывает вызов через свой proxy и кладёт invocation в OngoingStubbing. Для void это синтаксически невозможно (when() ожидает аргумент-значение), а на spy реальный метод выполнится с побочными эффектами/исключением ещё до того, как успеете задать стаб. do*-синтаксис (doReturn/doThrow/doNothing/doAnswer/doCallRealMethod) задаёт поведение ДО вызова — when(mock).method() передаёт mock, а не результат вызова, поэтому реальный код не исполняется.",
  "d": "Платой за обход реального вызова является потеря type-safety: doReturn(Object) не проверяется компилятором против возвращаемого типа метода, поэтому ClassCastException вылетит только в рантайме при стабе."
 },
 {
  "id": "g-te-mockbean-context",
  "t": "Testing",
  "s": "integration",
  "q": "@MockBean / @SpyBean в Spring Boot — как они подменяют бин в контексте и почему злоупотребление ими убивает кэш TestContext и замедляет весь набор тестов?",
  "a": "@MockBean/@SpyBean обрабатываются MockitoContextCustomizer, который через MockitoPostProcessor (BeanFactoryPostProcessor + BeanPostProcessor) либо подменяет существующее BeanDefinition мок-объектом, либо регистрирует новое, либо оборачивает реальный бин в Mockito spy. Ключевое: набор этих полей попадает в MergedContextConfiguration через ContextCustomizer.equals()/hashCode(), поэтому каждая уникальная комбинация моков порождает НОВЫЙ ключ кэша TestContext — контекст не переиспользуется, а поднимается заново. На большом наборе это десятки лишних refresh ApplicationContext плюс переполнение default-кэша (32 контекста) с вытеснением и пересозданием — отсюда кратное замедление прогонов.",
  "d": "Тот же эффект даёт @TestPropertySource с inline-значениями и динамические customizer'ы: любая деталь, влияющая на equals() MergedContextConfiguration, фрагментирует кэш так же, как уникальный @MockBean."
 },
 {
  "id": "g-web-session-vs-jwt-revocation",
  "t": "Web",
  "s": "auth",
  "q": "Stateful session (cookie + server store) vs stateless JWT — что выбрать, и как отозвать выданный JWT при логауте/бане, если он валиден до expiry?",
  "a": "Session — это revoke «из коробки»: токен — это просто opaque ID, удалил запись в Redis/БД → сессия мертва мгновенно; цена — round-trip к стору на каждый запрос и stateful-сервер. JWT stateless и хорошо горизонтально масштабируется, но фундаментально неотзываем до exp, потому что валидируется по подписи без обращения к серверу. Чистого способа отозвать JWT нет — нужно вернуть состояние: либо короткий TTL access-токена (5–15 мин) + долгий refresh-токен, который хранится и реально отзывается на сервере, либо denylist (jti конкретного токена в Redis с TTL = остаток до exp), либо version/epoch-проверка пользователя. На практике для большинства веб-приложений с логаутом и баном правильнее брать session или гибрид (короткий JWT + серверный refresh), а не «чистый» долгоживущий JWT.",
  "d": "Логаут «чистого» JWT на клиенте (удаление токена из localStorage) — это иллюзия безопасности: копия токена остаётся валидной до exp, сервер её примет."
 },
 {
  "id": "g-web-refresh-token-rotation",
  "t": "Web",
  "s": "auth",
  "q": "Зачем нужна пара access + refresh токен, как работает refresh token rotation и детекция повторного использования (reuse detection)?",
  "a": "Access-токен делают короткоживущим (5–15 мин) и stateless (обычно JWT), чтобы ресурс-сервер проверял его локально по подписи без обращения к БД; refresh-токен живёт долго (дни/недели), хранится защищённо (HttpOnly Secure cookie) и обменивается на новую пару только на auth-сервере. Rotation означает, что при каждом обмене старый refresh инвалидируется и выдаётся новый — токены становятся одноразовыми. Reuse detection: если приходит уже использованный (отозванный) refresh-токен, сервер считает это признаком кражи и аннулирует всю цепочку/семью токенов (token family), форсируя повторный логин. Этот механизм описан в OAuth 2.0 Security BCP (RFC 9700) как обязательная защита для публичных клиентов (SPA, mobile).",
  "d": "Связь токенов в family отслеживают через общий family_id и счётчик/предыдущий jti в БД auth-сервера — без серверного состояния по refresh rotation и reuse detection корректно не сделать."
 },
 {
  "id": "g-web-put-vs-patch",
  "t": "Web",
  "s": "rest",
  "q": "PUT vs PATCH vs POST для обновления ресурса — чем отличаются по семантике, какой идемпотентен, и почему PATCH обычно НЕ идемпотентен?",
  "a": "PUT — полная замена ресурса по известному URI: клиент шлёт полное новое представление, и сервер делает его текущим состоянием. PUT идемпотентен по определению из RFC 7231 — повторная отправка того же тела даёт то же конечное состояние. PATCH (RFC 5789) — частичное изменение: тело описывает не результат, а набор инструкций/дельту, и метод НЕ обязан быть идемпотентным и НЕ safe. POST — небезопасный и неидемпотентный по контракту, обычно создаёт подчинённый ресурс (сервер выбирает URI) или запускает нечётко определённую обработку; повтор POST создаёт дубликат.",
  "d": "Идемпотентность — свойство протокольного контракта метода, а не гарантия конкретной реализации: даже PUT можно реализовать неидемпотентно (например, инкремент), но это нарушение семантики HTTP, на которое полагаются ретраи прокси/клиентов."
 },
 {
  "id": "g-web-tcp-handshake-lifecycle",
  "t": "Web",
  "s": "network",
  "q": "Что происходит при установке TCP-соединения (3-way handshake), почему его установка «дорогая» и при чём тут head-of-line blocking и keep-alive?",
  "a": "3-way handshake: клиент шлёт SYN (со своим начальным ISN и опциями — MSS, window scale, SACK-permitted), сервер отвечает SYN-ACK (свой ISN + ACK на клиентский), клиент шлёт ACK — только после этого соединение в состоянии ESTABLISHED. «Дорого» оно из-за минимум 1 полного RTT задержки до отправки данных (а с TLS — ещё 1–2 RTT поверх), плюс сервер держит запись в SYN-очереди и тратит память/ресурсы на каждое соединение. Keep-alive (HTTP persistent connection / Connection: keep-alive) переиспользует уже установленное TCP-соединение для нескольких запросов, амортизируя стоимость handshake и TLS. Head-of-line blocking возникает потому, что TCP гарантирует строгий порядок байтов: потеря одного сегмента блокирует доставку всех последующих в приложение, пока пакет не будет ретранслирован — на этом же одном соединении страдают все мультиплексированные HTTP/2-стримы.",
  "d": "QUIC/HTTP3 решает TCP-HOL, перенося порядок и потери на уровень независимых стримов поверх UDP, и совмещает транспортный + TLS-handshake в 1 RTT (0-RTT при resumption)."
 },
 {
  "id": "g-web-token-storage-cookie-vs-header",
  "t": "Web",
  "s": "auth",
  "q": "Где хранить токен на клиенте: httpOnly-cookie vs заголовок Authorization (localStorage) — как выбор влияет на XSS, CSRF и логику сервера?",
  "a": "httpOnly+Secure+SameSite cookie недоступна из JS, поэтому XSS не может украсть токен — но браузер шлёт её автоматически на каждый запрос к домену, что открывает CSRF (нужен SameSite=Lax/Strict + анти-CSRF токен или double-submit). Токен в localStorage/Authorization-заголовке иммунен к классическому CSRF (его прикрепляет ваш JS, а не браузер), но любой XSS читает его и эксфильтрует, плюс он не уходит в подзапросы автоматически. На сервере cookie-подход обычно опирается на сессию/stateful-логику и CSRF-фильтр (Spring Security CsrfFilter), а header-подход — на stateless Bearer-валидацию JWT (OncePerRequestFilter / Quarkus SmallRye JWT), без CSRF-защиты, но с обязательной CORS-политикой.",
  "d": "Гибрид-best-practice сегодня: короткоживущий access-token в памяти JS (не в localStorage) + долгоживущий refresh-token в httpOnly+SameSite=Strict cookie на узком пути /auth/refresh — так XSS не достаёт refresh, а CSRF не страшен в силу SameSite."
 },
 {
  "id": "web-owasp-top10",
  "t": "Web",
  "s": "appsec",
  "q": "Что такое OWASP Top-10 и какие категории must-know для backend-разработчика?",
  "a": "OWASP Top-10 — это консенсусный чек-лист самых критичных рисков веб-безопасности (редакция 2021), а не список конкретных CVE-уязвимостей. Это рейтинг категорий рисков, который используют в threat modeling, security-review и как baseline для требований. Для бэкендера ядро: A01 Broken Access Control (#1 — горизонтальная/вертикальная эскалация, IDOR), A03 Injection (SQL/NoSQL/OS — лечится параметризацией), A02 Cryptographic Failures (хранение/передача чувствительных данных), A07 Identification & Auth Failures и A08 Software/Data Integrity (небезопасная десериализация, supply-chain в CI/CD). Также A04 Insecure Design, A05 Misconfiguration, A06 Vulnerable Components, A09 Logging Failures, A10 SSRF.",
  "d": "OWASP Top-10 пересматривается раз в ~4 года. В 2021 произошёл сдвиг: Broken Access Control поднялся с #5 на #1 (присутствовал в 94% протестированных приложений), Injection упал с #1 на #3, появились новые категории Insecure Design (A04) и Software & Data Integrity Failures (A08, поглотила Insecure Deserialization). 8 из 10 категорий ранжируются по данным (частота, эксплуатируемость, impact), а 2 — по опросу сообщества. Важно: это не стандарт сертификации (для верификации есть OWASP ASVS), а awareness-документ. Каждая категория агрегирует множество CWE."
 },
 {
  "id": "web-supply-chain",
  "t": "Web",
  "s": "appsec",
  "q": "Атака на цепочку поставок: уязвимость не в твоём коде, а в транзитивной зависимости (Log4Shell, CVE-2021-44228). Как от неё защищаться на уровне процесса разработки?",
  "a": "Log4Shell — это RCE в log4j2: при логировании строки с подстрокой ${jndi:ldap://...} библиотека делала JNDI-lookup и подгружала удалённый класс, выполняя код атакующего. Защита строится не на одном патче, а на процессе: SBOM (полный список всех зависимостей, включая транзитивные), автоматические CVE-сканеры (OWASP Dependency-Check / Snyk / Trivy) в CI, пиннинг и проверка подписей артефактов, и отлаженный быстрый патч-процесс, чтобы выкатить фикс за часы, а не за недели. Ключевая боль — уязвимость приходит транзитивно, ты её даже не объявлял в pom.xml.",
  "d": "Senior должен понимать: невозможно защититься от 0-day в чужой библиотеке заранее, но можно сократить MTTR (mean time to remediate). Это достигается видимостью (SBOM знает, что log4j вообще есть в системе и где), автоматизацией обнаружения (сканер падает в CI на known-CVE) и готовностью быстро катить. Log4Shell показал, что главная проблема была не «как пропатчить», а «в каких из 500 сервисов вообще есть уязвимый log4j и какой версии» — без SBOM компании искали это руками неделями."
 },
 {
  "id": "web-idor",
  "t": "Web",
  "s": "appsec",
  "q": "Broken Access Control / IDOR: эндпоинт `/api/orders/123` принимает id из URL и отдаёт ресурс. Атакующий меняет 123 на 124 и читает чужой заказ. Почему это случается и как чинить правильно?",
  "a": "IDOR — это отсутствие проверки прав на КОНКРЕТНЫЙ объект: код проверяет «пользователь залогинен» (аутентификация), но не «этот заказ принадлежит этому пользователю» (object-level авторизация). Правильный фикс — на сервере при каждом запросе проверять владение/доступ к объекту, например `WHERE id = :id AND owner_id = :currentUser`, и работать по принципу deny-by-default. Нельзя доверять никаким идентификаторам и флагам, пришедшим от клиента; UUID вместо инкрементного id лишь усложняет угадывание (security by obscurity), но не заменяет проверку доступа.",
  "d": "IDOR — #1 в OWASP Top 10 2021 (Broken Access Control). Ключевое отличие: 401/аутентификация ≠ 403/авторизация. Аутентификация говорит «кто ты», авторизация — «что тебе можно». IDOR — провал именно второго, на уровне отдельного объекта. Защита ставится централизованно (фильтр/интерсептор/policy-слой), а не разбросанным `if`-ом в каждом контроллере, иначе один забытый эндпоинт = дыра."
 },
 {
  "id": "web-secrets",
  "t": "Web",
  "s": "appsec",
  "q": "Где НЕ хранить секреты и как организовать правильно?",
  "a": "Секреты нельзя класть в код, git-историю, Docker-образ (слои навсегда) и plain-env/конфиги без шифрования. Правильно: централизованный secret manager (HashiCorp Vault, AWS Secrets Manager) как единственный источник истины, доступ по least privilege (политики на конкретный путь), автоматическая ротация и short-lived креды (dynamic secrets / STS вместо вечных паролей). Git-историю обязательно сканировать gitleaks/trufflehog в CI и в pre-commit — утёкший секрет считается скомпрометированным навсегда и подлежит ротации, а не удалению из истории.",
  "d": "Senior должен различать «откуда приложение читает секрет» и «где секрет хранится». Plain env-переменная сама по себе не зло — зло в том, что её значение лежит в git/образе/CI-логах. Vault даёт три вещи, которых нет у статичного хранилища: dynamic secrets (БД-пароль живёт 1 час и привязан к конкретному инстансу), аудит каждого доступа и ротацию без редеплоя. Ключевой сдвиг мышления — от «секрет как константа» к «секрету как короткоживущему токену»."
 },
 {
  "id": "web-security-headers",
  "t": "Web",
  "s": "appsec",
  "q": "Перечисли ключевые security-заголовки и объясни, чем опасен CORS-мисконфиг.",
  "a": "Базовый набор: CSP (whitelist источников скриптов/стилей — главный барьер против XSS), HSTS (форсирует HTTPS, защита от downgrade/SSL-strip), X-Content-Type-Options: nosniff (запрет MIME-sniffing), X-Frame-Options или CSP frame-ancestors (анти-clickjacking). CORS-мисконфиг опасен, когда сервер отдаёт Access-Control-Allow-Origin: * вместе с Allow-Credentials: true (браузер это блокирует, но эхо-Origin без проверки whitelist — нет), либо рефлектит присланный Origin без валидации — тогда злоумышленный сайт читает приватные ответы с куками жертвы. Важно: CORS не защищает ресурс, а наоборот ослабляет Same-Origin Policy, разрешая чужим источникам читать ответ.",
  "d": "CSP — заголовок ответа, перечисляющий разрешённые источники (default-src/script-src и т.д.); блокирует inline-скрипты без nonce/hash, это и есть основная XSS-митигация. HSTS (Strict-Transport-Security) с max-age заставляет браузер ходить только по HTTPS, includeSubDomains и preload усиливают. nosniff не даёт браузеру угадывать Content-Type и исполнять текст как скрипт. frame-ancestors современнее X-Frame-Options и поддерживает несколько источников. CORS работает на уровне браузера: SOP запрещает JS читать кросс-доменный ответ, а CORS-заголовки выборочно это разрешают — поэтому ошибка в их настройке = дыра на чтение чувствительных данных, а не защита."
 },
 {
  "id": "web-rate-limit",
  "t": "Web",
  "s": "appsec",
  "q": "Как защитить аутентификацию от brute-force и перечисления аккаунтов (user enumeration)? Какие уровни лимитирования применять и где компромисс между lockout и DoS?",
  "a": "Лимитируй на нескольких осях одновременно: по IP, по username/аккаунту и по эндпоинту — алгоритмами token bucket (допускает всплески) или sliding window (точный счёт за окно). На неудачные логины — экспоненциальный backoff и captcha при подозрительной активности. Против enumeration отдавай ОДИНАКОВЫЙ ответ и время на «нет пользователя» и «неверный пароль» (single generic error, constant-time). Жёсткий account lockout по username превращается в DoS-вектор: атакующий блокирует чужие аккаунты — поэтому предпочитают throttle + captcha, а лимит по IP комбинируют с лимитом по аккаунту.",
  "d": "Senior-уровень: знать, что чистый rate limit по IP обходится ботнетом/прокси (distributed slow brute-force), а чистый lockout по username — это готовый DoS. Поэтому нужна многоосевая защита (IP + аккаунт + глобальный) и мягкие меры (backoff, captcha) вместо жёсткой блокировки. User enumeration течёт не только через текст ошибки, но и через тайминги (bcrypt считается только при существующем юзере), HTTP-коды, поведение reset-password и signup-формы."
 },
 {
  "id": "jvm-thread-dump",
  "t": "JVM",
  "s": "prod-diagnostics",
  "q": "Как по thread dump найти deadlock и contention в проде?",
  "a": "Снимаешь дамп: `jstack <pid>` или `kill -3 <pid>` (вывод идёт в stdout процесса). Deadlock JVM детектит сама и пишет блок «Found one Java-level deadlock» с циклом потоков, где каждый держит монитор, нужный соседу. Contention видно как пачка потоков в состоянии BLOCKED, ждущих один и тот же лок (`- waiting to lock <0x...>`), пока им владеет один RUNNABLE-поток. Много RUNNABLE-потоков на одном и том же стек-фрейме = hot path / CPU-bottleneck.",
  "d": "Состояния потока в дампе: RUNNABLE (исполняется или ждёт I/O — JVM не различает), BLOCKED (ждёт вход в synchronized-монитор), WAITING (Object.wait/park без таймаута), TIMED_WAITING (с таймаутом). Ключ к contention — группировать BLOCKED-потоки по адресу лока: одинаковый `<0x...>` у многих = горячая точка. Чтобы увидеть тренд, снимай 3-5 дампов с интервалом ~1-2 сек: если те же потоки застряли на том же фрейме — это реальная блокировка, а не моментальный снимок. ReentrantLock и java.util.concurrent НЕ детектятся встроенным deadlock-детектором JVM (только intrinsic-мониторы и owned Lock через ThreadMXBean)."
 },
 {
  "id": "jvm-heap-dump",
  "t": "JVM",
  "s": "prod-diagnostics",
  "q": "Прод-сервис на Java постепенно съедает память и ловит OutOfMemoryError. Как по heap dump найти утечку через Eclipse MAT и dominator tree? Объясни роль retained heap и GC-root.",
  "a": "Снимаешь дамп: либо заранее флагом -XX:+HeapDumpOnOutOfMemoryError (.hprof пишется в момент OOM), либо вручную jmap -dump:live,format=b,file=heap.hprof <pid>. Открываешь .hprof в Eclipse MAT, смотришь Leak Suspects и dominator tree, отсортированный по retained heap — это сколько байт реально освободится, если объект собрать (его эксклюзивное поддерево в графе доминаторов). Находишь объект с аномально большим retained (обычно коллекция/кэш) и через \"Path to GC Roots\" (исключая weak/soft) смотришь, какой живой GC-root его держит — это и есть источник утечки.",
  "d": "Утечка в Java = объекты, которые логически уже не нужны, но достижимы от GC-root (статика, поток, стек, JNI), поэтому GC их не собирает. Shallow heap — размер самого объекта; retained heap — размер всего, что станет недостижимым при его удалении; именно retained показывает реальную \"цену\" утечки. Dominator tree: A доминирует B, если любой путь от GC-root к B проходит через A — поэтому retained(A) = сумма поддерева. Классика: статический Map/кэш без eviction, ThreadLocal без remove(), незакрытые ресурсы, listener'ы без отписки, растущий ArrayList. jmap -dump:live триггерит full GC и оставляет только живые объекты — мусор не маскирует картину."
 },
 {
  "id": "jvm-profiling",
  "t": "JVM",
  "s": "prod-diagnostics",
  "q": "JFR vs async-profiler — как профилировать CPU и аллокации в проде и в чём фундаментальная разница в качестве сэмплов?",
  "a": "JFR (JDK Flight Recorder) встроен в JVM, имеет крайне низкий overhead (~1%), работает на event-based модели и официально безопасен для прода; включается флагом или `jcmd JFR.start`, пишет .jfr-поток. async-profiler сэмплирует через perf_events / AsyncGetCallTrace, поэтому НЕ страдает от safepoint-bias (стек снимается в любой точке, а не только на safepoint, в отличие от jstack-loop / большинства Java-профайлеров), даёт честные flame graphs и умеет CPU, alloc, lock, wall-clock, cache-misses. Практика: JFR — постоянно включён как «чёрный ящик» с непрерывной записью; async-profiler — точечный flame graph, когда нужна max-точность по горячим методам и нативу.",
  "d": "Safepoint-bias — ключевая мысль для senior. Safepoint-based профайлеры (jstack в цикле, многие коммерческие agent'ы на JVMTI GetAllStackTraces) могут снять стек потока ТОЛЬКО когда поток доехал до safepoint. Горячий tight-loop без вызовов методов и без аллокаций может вообще не иметь safepoint внутри — JIT его выкидывает, — поэтому такой код «невидим» или искажён: профайлер припишет время не тому методу. async-profiler через AsyncGetCallTrace + сигнал (SIGPROF от perf) прерывает поток в произвольной точке, минуя safepoint-механизм, поэтому распределение сэмплов отражает реальное время CPU. JFR для CPU-method-sampling тоже исторически был привязан к safepoint-сэмплингу нативным образом, но overhead/safety у него лучше, а для alloc-профилирования JFR пишет TLAB-события напрямую — это не sampling стека, а реальные события выделения, дающие точную картину что и где аллоцируется. Вывод: для «кто жрёт CPU честно» → async-profiler flame graph; для «всегда включённый дешёвый аудит + GC/alloc/IO/locks/JIT events в одном потоке» → JFR. На современных JDK (17/21) их часто комбинируют: async-profiler умеет писать в .jfr-формат и его можно смотреть в том же JMC."
 },
 {
  "id": "sp-jpa-projection",
  "t": "Spring",
  "s": "jpa-perf",
  "q": "DTO / constructor-проекции — зачем, если уже есть entity?",
  "a": "Загрузка полной @Entity ради чтения тащит ВСЕ колонки (включая @Lob, ленивые ассоциации при доступе) и кладёт объект в persistence context: он становится managed и dirty-tracked — на flush Hibernate сравнивает снапшот каждого поля. Проекция (JPQL constructor expression `new Dto(...)`, Spring Data interface- или class-projection) выбирает только нужные столбцы, отдаёт detached read-only объект и не платит за грязное отслеживание и снапшоты. Для списков, отчётов и API-ответов это кратно дешевле по памяти, CPU и трафику с БД. Правило: команда → entity, запрос/чтение → projection.",
  "d": "Тут две разные оси выигрыша. Первая — БД: `SELECT u.id, u.name FROM User u` вместо `SELECT *` уменьшает прочитанные страницы и сетевой трафик, особенно если в таблице есть толстые TEXT/JSONB/BLOB поля. Вторая — persistence context: managed-entity хранит снапшот всех полей для dirty checking, занимает память L1-кэша сессии и участвует в flush'е; projection-результат detached, поэтому ничего из этого не происходит. Spring Data умеет три вида проекций: interface-based (closed — геттеры мапятся на колонки, open — @Value SpEL, но он уже грузит entity целиком и теряет смысл оптимизации), class-based (DTO с конструктором) и dynamic (`<T> T findBy...(..., Class<T> type)`). JPQL constructor expression — самый явный и предсказуемый: `SELECT new com.app.UserDto(u.id, u.name) FROM User u`. Главный риск — N+1 и неполные данные: если в проекцию попадает геттер вложенной ассоциации, Hibernate может либо подгрузить её отдельным запросом, либо вернуть прокси."
 },
 {
  "id": "ops-correlation-id",
  "t": "DevOps",
  "s": "observability",
  "q": "Correlation/trace-id propagation и структурное логирование?",
  "a": "Сквозной trace-id рождается на входе (или принимается из W3C-заголовка `traceparent`) и пробрасывается через все сервисы — по HTTP/Kafka в заголовках, внутри JVM через MDC (а на границах потоков/реактивных цепочек его надо переносить руками или через context-propagation). В Java это даёт Micrometer Tracing / OpenTelemetry, который кладёт traceId/spanId в MDC. Логи пишутся в структурном JSON (поля traceId, service, level), а не текстом — чтобы агрегатор (ELK/Loki) парсил и сшивал логи одного запроса из разных сервисов и коррелировал их с трейсами по одному id. В логи нельзя писать PII и секреты.",
  "d": "Trace-id — это «нить Ариадны» сквозь распределённую систему: без него логи 10 микросервисов превращаются в несвязанный шум, и инцидент невозможно расследовать. W3C Trace Context (`traceparent: 00-{trace-id}-{span-id}-{flags}`) — стандарт, на котором сходятся OTel, Micrometer, прокси и облака, поэтому propagation работает кросс-вендорно. Структурный JSON-лог нужен, чтобы поиск был по полю (`traceId=abc`), а не grep по строкам; корреляция логи↔трейсы строится на общем traceId. Главная боль — потеря контекста на async-границах (новый поток, @Async, reactive, Kafka consumer): MDC привязан к ThreadLocal и не «переезжает» сам."
 },
 {
  "id": "jc-init-order",
  "t": "Java",
  "s": "init",
  "q": "В каком порядке инициализируется объект Java (статика, поля, instance-блоки, super-цепочка), и почему виртуальный вызов из конструктора предка видит поле наследника как null?",
  "a": "Порядок при первом обращении к классу: статические блоки/поля родителя, затем ребёнка — один раз на класс, в текстовом порядке. При new: сначала весь super() (цепочка конструкторов снизу до Object), и только ПОСЛЕ возврата super() — инициализаторы полей и instance-блоки ребёнка в текстовом порядке, затем тело его конструктора. Поэтому если конструктор предка вызывает виртуальный метод, переопределённый в наследнике, и тот читает поле наследника — поле ещё в дефолте (null/0), потому что его инициализатор не отработал. ВАЖНО: ловушка срабатывает только если поле читается реально. Если это «constant variable» (final, инициализированный константным выражением, напр. `final String x = \"x\"`), компилятор инлайнит литерал прямо в байткод (ldc), поле не читается — и виден литерал, а не null.",
  "d": "super() всегда выполняется первым в теле конструктора (явно или неявно), до инициализаторов полей наследника. final-поле, присвоенное в ТЕЛЕ конструктора (blank final) или через вызов метода (`final String n = compute()`), — НЕ constant variable, читается из памяти и в момент super() ещё дефолтное. Это Effective Java Item 19: не вызывай переопределяемые методы из конструктора."
 },
 {
  "id": "jc-final-finally-finalize",
  "t": "Java",
  "s": "keywords",
  "q": "final vs finally vs finalize() — три разные сущности с похожими именами. За что отвечает каждая, и в каком состоянии finalize() в современной JVM?",
  "a": "Это три НЕ связанных вещи. **final** — модификатор: переменная/поле = присвоить ровно один раз (для final-полей ещё и safe publication по JMM, JLS 17.5); метод = нельзя override; класс = нельзя наследовать (records неявно final). **finally** — блок try/finally: выполняется почти всегда (даже при return/throw в try), НО НЕ выполняется при System.exit()/Runtime.halt(), краше JVM, kill -9 или если поток-демон убит при выходе JVM. **finalize()** — protected-метод Object, вызывался GC перед сбором объекта. Object.finalize() помечен @Deprecated(forRemoval=true, since=\"9\"); JEP 421 (Java 18) объявил весь механизм финализации deprecated for removal и добавил флаг --finalization=disabled. ВАЖНО: по умолчанию финализация ЕЩЁ ВКЛЮЧЕНА — отключается только этим флагом, удаление лишь запланировано. Замена: try-with-resources / Cleaner / PhantomReference.",
  "d": "Тонкость с finally: если в finally стоит return или throw — он \"проглатывает\" return/исключение из try (антипаттерн). finalize() опасен ещё и finalizer-атакой: если конструктор бросил исключение, GC всё равно вызовет finalize() на частично сконструированном объекте — поэтому валидирующие классы делают final или объявляют пустой final finalize(). Cleaner/PhantomReference безопаснее: не воскрешают объект и не блокируют его сбор."
 },
 {
  "id": "jc-override-overload",
  "t": "Java",
  "s": "oop",
  "q": "Override vs overload: чем отличаются по правилам диспетчеризации и в какой момент (compile-time / runtime) выбирается метод?",
  "a": "Override (переопределение) — один и тот же дескриптор (имя + параметры + return) в подклассе; выбор метода идёт в РАНТАЙМЕ по фактическому типу объекта через invokevirtual (виртуальная таблица). Overload (перегрузка) — несколько методов с одним именем, но разными списками параметров; нужный выбирает КОМПИЛЯТОР (javac) в compile-time по статическим типам аргументов, выбирая самый специфичный применимый, и зашивает фиксированный дескриптор прямо в инструкцию вызова. static-методы НЕ переопределяются, а скрываются (hiding): резолвятся по типу ссылки, а не объекта.",
  "d": "Перегрузка НЕ различает методы по типу возврата: нельзя объявить два метода с одинаковой сигнатурой параметров, но разным return — javac выбирает overload только по числу и типам аргументов. Тип возврата входит в дескриптор JVM, но в выборе перегрузки не участвует. Override же требует совместимый return: для ссылок допустим ковариантный (Number → Integer), для примитивов любая смена (int → long) ломает override."
 },
 {
  "id": "jc-hashmap-treeify",
  "t": "Java",
  "s": "hashmap",
  "q": "Когда бин HashMap превращается в красно-чёрное дерево, как find() ищет ключ при равных хэшах, и почему дерево всё равно может выродиться в O(n)?",
  "a": "Бин «деревенеет» при TREEIFY_THRESHOLD=8 узлах И capacity≥MIN_TREEIFY_CAPACITY=64 (иначе сначала resize). В TreeNode.find(h, k, kc) спуск идёт по сравнению хэшей; на РАВНОМ хэше порядок такой: (1) проверка equals() — при совпадении возврат; (2) если ключи реализуют Comparable — направление выбирается через compareComparables (compareTo), O(log n); (3) если ключи НЕ Comparable — детерминированного направления нет, и find рекурсивно обходит ОБА поддерева (pr.find(...), затем спуск по pl). Поэтому при множестве ключей с одинаковым полным hashCode и без Comparable дерево деградирует в сторону O(n). Важно: System.identityHashCode/tieBreakOrder в lookup НЕ участвуют — они работают только при ВСТАВКЕ (treeify/putTreeVal), задавая стабильный порядок размещения.",
  "d": "Откат к списку — при UNTREEIFY_THRESHOLD=6 во время resize (гистерезис 8 vs 6 гасит дребезг). treeifyBin при capacity<64 делает resize(), а не дерево. Вероятность 8 коллизий в бине ~ Poisson(λ=0.5): P(8)≈6·10⁻⁸ при нормальном hashCode — деревья нужны как защита от атаки на коллизии, а не как обычный режим."
 },
 {
  "id": "jc-immutable-collections",
  "t": "Java",
  "s": "collections",
  "q": "Чем отличаются List.of(), Collections.unmodifiableList() и Arrays.asList()? Какая из них действительно неизменяемая, какая — «живое представление», а какая — фиксированного размера и пишет насквозь в массив?",
  "a": "Три разные вещи, которые путают. List.of() (Set.of/Map.of, Java 9) — по-настоящему immutable: запрещает null уже при создании (NPE), любая мутация → UnsupportedOperationException, под капотом ImmutableCollections (List12 для 1–2 элементов, ListN для 0 и 3+). Collections.unmodifiableList() — это только обёртка-ВЬЮ над исходным списком: мутации через обёртку → UOE, но изменения исходного backing-списка видны сквозь обёртку (это не копия). Arrays.asList() — список ФИКСИРОВАННОГО размера поверх массива: set() пишет насквозь в массив (и наоборот), add()/remove() → UOE, null разрешён. Для настоящей защитной копии — List.copyOf(src): он делает immutable-копию мутабельного источника, но short-circuit'ит (возвращает тот же объект) если источник уже List.of-immutable.",
  "d": "List.of/Set.of/Map.of строго отвергают null при создании и при contains(null) (NPE); Set.of с дублем и Map.of с дублирующимся ключом → IllegalArgumentException. Размерные классы: List12 (java.util.ImmutableCollections$List12) держит 1–2 элемента, ListN — пустой и 3+. unmodifiableList даёт обёртку (UnmodifiableList), которая делегирует чтения в backing и блокирует записи. Arrays.asList → java.util.Arrays$ArrayList, фиксированного размера, двусторонне связан с массивом."
 },
 {
  "id": "gap-co-cf-default-executor",
  "t": "Concurrency",
  "s": "executor",
  "q": "На каком потоке выполняется коллбэк CompletableFuture (thenApply vs thenApplyAsync), какой Executor берётся по умолчанию, и почему блокирующий код на нём опасен — особенно в контейнере с 1 vCPU?",
  "a": "Без -Async коллбэк (thenApply/thenAccept) исполняется на том потоке, который ЗАВЕРШИЛ предыдущую стадию, либо синхронно на вызывающем потоке, если стадия уже была завершена к моменту привязки. thenApplyAsync(fn) без явного Executor уходит в общий ForkJoinPool.commonPool() (parallelism = ядра-1, потоки daemon). Опасность: commonPool — общий на всю JVM (его делят parallel streams, другие CompletableFuture). Заблокируешь его воркеры I/O — и работы встанут в очередь. Под 1 vCPU воркеров всего 1-2, поэтому такие задачи просто сериализуются и копятся, рискуя таймаутами. Лечится передачей своего sized-Executor под блокирующий I/O.",
  "d": "commonPool никогда не вырождается в «поток-на-задачу» или синхронное исполнение: при parallelism=0 он принудительно поднимается до минимума 2 воркеров (asyncCommonPool «ensures minimal parallelism»), при parallelism=1 — все задачи бегут на ОДНОМ воркере по очереди. Это всегда ограниченный пул ForkJoinPool, а не ThreadPerTaskExecutor. ForkJoinPool заточен под CPU-bound work-stealing; под блокировки в нём есть ManagedBlocker (временно расширяет параллелизм). Для блокирующего I/O правильнее свой Executor с понятным размером."
 },
 {
  "id": "jc-stream-infinite",
  "t": "Java",
  "s": "streams",
  "q": "Бесконечный стрим: какие операции его «вешают», а какие нет? Чем sorted() отличается от distinct()?",
  "a": "Бесконечный источник (Stream.iterate/generate) завершится, только если что-то ниже по конвейеру коротко замыкает вытягивание элементов: limit, takeWhile, findFirst, anyMatch/allMatch/noneMatch. sorted() — настоящий полный барьер: он обязан собрать ВЕСЬ вход перед выдачей, поэтому повиснет навсегда даже с limit ниже него. А distinct() — stateful, но НЕ барьер: он отдаёт элементы по одному, и стоящий после него limit(5) остановит вытягивание на 5-м (вернёт [1,2,3,4,5]). Опасность distinct() в другом: на бесконечном источнике БЕЗ нижнего short-circuit его seen-множество растёт без границ.",
  "d": "sorted()/count() (на не-SIZED источнике) — обходят весь вход, на бесконечном висят. distinct()/limit()/takeWhile() — pull-based, элемент за элементом."
 },
 {
  "id": "jc-groupingby-downstream",
  "t": "Java",
  "s": "streams",
  "q": "Что делает downstream-коллектор в groupingBy, какой тип значения у counting(), и чем toMap отличается при дубликатах ключей?",
  "a": "groupingBy(classifier) кладёт элементы в List по ключу; второй аргумент — downstream-коллектор, который сворачивает каждую группу (counting() → Long, summingInt → Integer, mapping(fn, toSet()) → Set, reducing/averagingDouble и т.д.). Есть и 3-арг overload с mapFactory (TreeMap::new, EnumMap::new) для выбора типа Map. Ключевая ловушка: counting() возвращает Long, не int — поэтому int n = map.get(k) не компилируется (Long → int неявно нельзя). toMap(key, value) без merge-функции при дубликате ключа бросает IllegalStateException \"Duplicate key…\"; 3-арг overload с mergeFunction (a,b)->a / Integer::sum разруливает конфликт. Ещё toMap кидает NPE на null-значении (внутри Map.merge), даже если ключи уникальны — а groupingBy так не делает.",
  "d": "downstream — это вложенный Collector внутри groupingBy: groupingBy(classifier, downstream) и groupingBy(classifier, mapFactory, downstream). Стандартные downstream: counting()→Long, summingInt/summingLong→Integer/Long, averagingDouble→Double, mapping(f, dc), filtering(p, dc), reducing(...), toSet(). toMap — отдельный коллектор: 2-арг бросает IllegalStateException при коллизии ключей (через Map.merge внутри), 3-арг принимает BinaryOperator-merge, 4-арг ещё и Supplier&lt;Map&gt; (LinkedHashMap::new). В отличие от HashMap.put, Map.merge при null-значении бросает NPE — поэтому toMap не переносит null-значения."
 },
 {
  "id": "gap-serial-externalizable",
  "t": "Java",
  "s": "serialization",
  "q": "Чем Externalizable отличается от Serializable, и что именно НЕ попадает в поток при Externalizable? Плюс: как восстанавливаются объекты при десериализации в каждом случае?",
  "a": "Serializable — маркер: JVM сама пишет поля рефлексией, а при десериализации НЕ вызывает конструктор сериализуемого класса (выполняется только no-arg конструктор первого несериализуемого предка), поля восстанавливаются нативно/через Unsafe. Externalizable extends Serializable, но ты сам пишешь/читаешь состояние в writeExternal/readExternal. В потоке Externalizable дескриптор класса (имя класса + serialVersionUID) ВСЁ РАВНО присутствует; не пишутся метаданные ПОЛЕЙ (имена/типы) и сами поля автоматически — отсюда более компактный и быстрый формат. При десериализации Externalizable JVM вызывает публичный no-arg конструктор, затем readExternal; нет конструктора — InvalidClassException (\"no valid constructor\").",
  "d": "Externalizable игнорирует transient (ты управляешь всем вручную). writeReplace/readResolve работают в обоих случаях — для подмены объекта (например, сохранение identity синглтона через readResolve). serialVersionUID пишется и проверяется в обоих случаях."
 },
 {
  "id": "gap-exc-chaining-cause",
  "t": "Java",
  "s": "core",
  "q": "Как правильно «обернуть» исключение, сохранив исходную причину, и где причина теряется (в коде и в логах SLF4J)?",
  "a": "Цепочку причин задают через cause: либо конструктором `new RuntimeException(\"wrap\", e)`, либо `initCause(e)` (можно вызвать только один раз — повторный бросит `IllegalStateException: Can't overwrite cause`). `getCause()` возвращает причину, а `printStackTrace()` рекурсивно печатает её под `Caused by:`. Причина ТЕРЯЕТСЯ, если обернуть только текст — `new RuntimeException(\"re: \" + e.getMessage())`: тогда `getCause()==null`, исходный тип и stacktrace пропадают. В логах правило другое: SLF4J печатает stacktrace, если Throwable — ПОСЛЕДНИЙ аргумент (даже при наличии `{}`); trace теряется только когда Throwable стоит НЕ последним и его «съедает» плейсхолдер через `toString()`.",
  "d": "`initCause` возвращает `Throwable`, поэтому удобен паттерн `throw (RuntimeException) new RuntimeException(\"wrap\").initCause(e);`. Сообщение исходного исключения МОЖЕТ быть null — например у созданного через no-arg конструктор `new IllegalStateException()` или `new RuntimeException((String) null)`; тогда конкатенация `\"\" + e.getMessage()` даст строку `\"null\"`. Важно: для NPE при разыменовании это уже не пример — с JDK 14 (JEP 358, включён по умолчанию с JDK 15) такой NPE несёт helpful-сообщение вроде «Cannot invoke ... because ... is null», то есть не null."
 },
 {
  "id": "gap-io-byte-char-charset",
  "t": "Java",
  "s": "io",
  "q": "Чем байтовый поток (InputStream/OutputStream) отличается от символьного (Reader/Writer), и почему `new String(bytes)`, `getBytes()`, `FileReader`, `InputStreamReader`, `Scanner` без явной кодировки — это бомба замедленного действия?",
  "a": "Байтовые потоки (InputStream/OutputStream) работают с сырыми `byte`, символьные (Reader/Writer) — с `char` (UTF-16 code unit'ами), и мост между ними — это всегда charset. Перечисленные API без явного charset берут «дефолтную кодировку», и текст молча декодируется/кодируется не теми байтами → mojibake. До Java 18 дефолт = `file.encoding` платформы (windows-1251 на Windows-RU, UTF-8 на Linux, MacRoman исторически) — то есть результат зависел от того, где запущен код. JEP 400 (Java 18) сделал UTF-8 дефолтом для `java.io`/`java.nio` независимо от платформы, но `System.console()`, логи и сторонние процессы по-прежнему могут жить в native-кодировке. Правильно — всегда передавать `StandardCharsets.UTF_8` явно (`new String(b, UTF_8)`, `getBytes(UTF_8)`, `new InputStreamReader(in, UTF_8)`, `new FileReader(f, UTF_8)` доступен с Java 11).",
  "d": "Дефолтный декодер по умолчанию использует `CodingErrorAction.REPLACE`: невалидные байты не бросают исключение, а заменяются на U+FFFD (�) — порча данных тихая, без падения. Поэтому баг всплывает не в dev (UTF-8 локаль), а в проде/Docker с другой локалью."
 },
 {
  "id": "sp-tx-nested-savepoint",
  "t": "Spring",
  "s": "tx",
  "q": "Propagation.NESTED ставит SAVEPOINT, а REQUIRES_NEW — новую транзакцию. В чём разница и при каких transaction manager'ах NESTED вообще работает?",
  "a": "REQUIRES_NEW приостанавливает внешнюю транзакцию и открывает физически НОВУЮ (отдельный коммит, отдельное соединение в общем случае) — её откат не трогает внешнюю. NESTED работает ВНУТРИ той же физической транзакции и того же соединения: Spring ставит JDBC Savepoint в начале вложенного блока, и при ошибке откатывает только до savepoint, оставляя внешнюю транзакцию живой; но если откатится внешняя — откатится и всё вложенное. Условие работы NESTED: PlatformTransactionManager должен поддерживать savepoints И иметь nestedTransactionAllowed=true. У DataSourceTransactionManager флаг true по умолчанию. JpaTransactionManager тоже поддерживает savepoints, но nestedTransactionAllowed=false по умолчанию — флаг можно включить вручную, и тогда savepoint ставится на JDBC-уровне. А JtaTransactionManager NESTED не поддерживает вовсе и кидает NestedTransactionNotSupportedException.",
  "d": "NESTED — это не вторая транзакция, а точка отката (savepoint) внутри первой; REQUIRES_NEW — это полноценная вторая физическая транзакция с suspend внешней."
 },
 {
  "id": "sp-tx-readonly",
  "t": "Spring",
  "s": "tx",
  "q": "Что на самом деле делает @Transactional(readOnly=true) в Spring + Hibernate — и какую «оптимизацию» оно НЕ даёт?",
  "a": "Главное и единственное, что Spring делает на стороне Hibernate: HibernateJpaDialect.beginTransaction() переводит Session в FlushMode.MANUAL (в старых версиях — NEVER). Это убирает авто-flush и проход dirty-checking перед запросами и коммитом → экономия CPU, а не памяти. Spring при этом НЕ вызывает session.setDefaultReadOnly(true), поэтому загруженные сущности всё равно получают полноценный EntityEntry с loadedState (hydrated snapshot) — snapshot-копии в памяти остаются. Чтобы реально не держать snapshot (loadedState=null), нужен org.hibernate.readOnly: Query.setReadOnly(true), session.setDefaultReadOnly(true) или @QueryHint, чего флаг Spring не включает. Дополнительно readOnly может прокинуться в Connection.setReadOnly(true) (через DataSourceUtils, зависит от драйвера/пула) и используется для роутинга на read-replica.",
  "d": "readOnly=true ≠ «сущности read-only». Это только подсказка транзакции: MANUAL flush (нет dirty-check → меньше CPU) + флаг isCurrentTransactionReadOnly(), по которому роутят на реплику и который можно прокинуть в JDBC Connection.setReadOnly. Память на snapshot-копиях НЕ экономится — для этого нужен hint org.hibernate.readOnly."
 },
 {
  "id": "h-entity-states-merge-persist",
  "t": "Spring",
  "s": "jpa",
  "q": "JPA entity lifecycle: чем отличаются transient / persistent / detached / removed, и почему persist() vs merge() ведут себя по-разному с detached-сущностью из REST-payload?",
  "a": "4 состояния: transient (new, без id, вне persistence context), persistent/managed (в PC, dirty checking работает), detached (был managed, но PC закрыт/очищен), removed (помечен к удалению). persist(detached) бросает EntityExistsException (на persist или позже при flush/commit) — нельзя «оживить» отсоединённую сущность. merge(detached) НЕ меняет переданный аргумент: он остаётся detached, а метод ВОЗВРАЩАЕТ новую managed-копию. merge с id==null ведёт себя как persist (INSERT); merge с id!=null, которого нет в PC, делает SELECT, копирует поля и возвращает managed-инстанс. Поэтому DTO из REST почти всегда merge, а его результат — то, что надо использовать дальше.",
  "d": "remove() допустим ТОЛЬКО над persistent-сущностью (managed). em.remove(detached) бросает IllegalArgumentException по JPA 3.2.2. Так что removed достижим только из persistent, а не «дальше по цепочке» после detached. Spring Data SimpleJpaRepository.save() для не-нового entity вызывает em.merge() и возвращает managed-результат — игнорировать его значит работать с detached-копией."
 },
 {
  "id": "h-flush-vs-commit",
  "t": "Spring",
  "s": "flush",
  "q": "flush() vs commit() в Hibernate — в чём разница и почему flush опасен до коммита?",
  "a": "flush() лишь синхронизирует L1-кэш с БД: шлёт накопленные INSERT/UPDATE/DELETE по уже открытому JDBC-соединению внутри той же транзакции — без COMMIT. Изменения НЕ durable и другим транзакциям не видны (кроме READ UNCOMMITTED). commit() = сначала auto-flush, затем COMMIT: только теперь данные зафиксированы и видны. Главная засада: констрейнты, триггеры и генерация IDENTITY-ключа срабатывают уже на flush — то есть ДО коммита.",
  "d": "FlushModeType.AUTO (дефолт JPA) триггерит auto-flush перед JPQL/Criteria/native-запросом и перед коммитом. FlushModeType.COMMIT флашит только на коммите — тогда JPQL-SELECT может вернуть устаревшие данные, а find()-по-id всё равно отдаст «грязную» сущность из L1-кэша. setHibernateFlushMode(MANUAL) выключает auto-flush полностью."
 },
 {
  "id": "h-lazy-proxy-getreference",
  "t": "Spring",
  "s": "jpa",
  "q": "em.getReference() / repository.getReferenceById() возвращает ленивый Hibernate-прокси. Чем он отличается от find(), и какой оператор сравнения типа на нём ломается — instanceof или getClass()?",
  "a": "getReference() (Hibernate load()) возвращает неинициализированный прокси — подкласс сущности, сгенерированный ByteBuddy, в котором заполнен только PK; реальный SELECT откладывается до первого обращения к не-id полю. find()/get() делает SELECT сразу и возвращает либо объект, либо null. На прокси ломается getClass(): proxy.getClass() — это Order$HibernateProxy$xxxx, поэтому getClass() == Order.class даёт false. А вот proxy instanceof Order — это TRUE, потому что прокси наследуется от Order: instanceof — безопасный оператор. Правильно: для сравнения типа использовать instanceof, для получения настоящего класса — Hibernate.getClass(entity), которое разворачивает прокси.",
  "d": "getReference() на несуществующей строке не падает сразу: прокси создаётся, но при первом доступе к не-id полю кидает EntityNotFoundException (или LazyInitializationException, если сессия уже закрыта). Прямой доступ к private-полю прокси возвращает null — подкласс переопределяет только геттеры, а не сами поля."
 },
 {
  "id": "sp-jpa-batch",
  "t": "Spring",
  "s": "jpa",
  "q": "Сохраняешь 10 000 сущностей в цикле через JPA-репозиторий с `@GeneratedValue(strategy = IDENTITY)`, выставил `hibernate.jdbc.batch_size=50` — а в логах всё равно 10 000 отдельных INSERT. Почему batch не работает и как починить?",
  "a": "`IDENTITY` тихо отключает JDBC-batch: Hibernate обязан выполнить каждый INSERT немедленно, чтобы получить сгенерированный БД ключ обратно — батчить нечего. Лечится сменой генератора на `SEQUENCE` с pooled-оптимизатором (`allocationSize` > 1): тогда Hibernate выдаёт id из предвыделенного диапазона без round-trip на каждую строку и может копить INSERT'ы в один JDBC-батч. Плюс `order_inserts`/`order_updates`, периодический `flush()`+`clear()` и (на Postgres) `reWriteBatchedInserts=true`.",
  "d": "**Почему IDENTITY ломает батч.** При `IDENTITY` ключ генерирует сама БД в момент INSERT (auto_increment/serial). Hibernate должен сразу узнать этот id (он — часть identity сущности в persistence context), поэтому выполняет INSERT поштучно и читает `getGeneratedKeys()`. JDBC batch API так не умеет надёжно вернуть ключ на строку, и Hibernate просто отключает батчинг для IDENTITY — молча, без ошибки. Любой `batch_size` игнорируется.\n\n**Фикс через SEQUENCE + pooled.** `@GeneratedValue(strategy = SEQUENCE, generator = \"g\")` + `@SequenceGenerator(name=\"g\", sequenceName=\"my_seq\", allocationSize=50)`. Pooled-оптимизатор берёт из sequence одно значение и раздаёт `allocationSize` id локально → нет round-trip на строку → Hibernate копит INSERT'ы и шлёт их батчем.\n\n**Что ещё включить:**\n- `hibernate.jdbc.batch_size=50` — размер батча.\n- `hibernate.order_inserts=true`, `hibernate.order_updates=true` — группируют statements по таблице, чтобы драйвер реально собрал их в один батч (без сортировки чередующиеся INSERT в разные таблицы рвут батч).\n- Периодический `flush()` + `clear()` каждые N сущностей — иначе persistence context растёт, dirty-checking становится O(n), память течёт.\n\n**Postgres:** `reWriteBatchedInserts=true` в JDBC URL — pgjdbc склеит батч из N INSERT в один многострочный `INSERT ... VALUES (..),(..),...`, это реальное ускорение на проводе."
 },
 {
  "id": "sp-jpa-flush",
  "t": "Spring",
  "s": "flush",
  "q": "Внутри @Transactional(readOnly=true) код вызвал repo.save(entity) и поменял managed-сущность. Что из этого реально уйдёт в БД на коммите — и что молча пропадёт?",
  "a": "readOnly=true переводит Hibernate-Session в FlushMode.MANUAL (Spring делает это в HibernateJpaDialect при старте транзакции). MANUAL отключает авто-flush ПЕРЕД запросами и НА коммите — остаётся только ручной flush. Поэтому: dirty-изменение managed-сущности и repo.save()/em.merge() лишь ставят INSERT/UPDATE в action queue, но flush не происходит → на коммите изменения МОЛЧА отбрасываются, в БД ничего не уходит (Spring Data save() не флашит; флашит только saveAndFlush()). А вот то, что НЕ зависит от авто-flush, проходит мимо MANUAL и реально пишет: явный entityManager.flush() и JPQL/native DML (UPDATE/DELETE через Query.executeUpdate(), он шлёт SQL напрямую). Итог: MANUAL — это не запрет записи на уровне БД, а отключение авто-flush; «обычные» ORM-записи через save/merge/dirty-checking тихо теряются, а явный flush и DML — нет.",
  "d": "readOnly=true → FlushMode.MANUAL: save()/merge()/dirty-UPDATE планируются, но без авто-flush на коммите молча отбрасываются. Реально пишут только явный em.flush() и JPQL/native DML — они не зависят от авто-flush."
 },
 {
  "id": "ops-three-pillars",
  "t": "DevOps",
  "s": "percentiles",
  "q": "Дашборд показывает avg latency = 50ms, всё «зелёное», но клиенты жалуются. Почему среднее врёт, и почему нельзя усреднить p99 двух инстансов?",
  "a": "Среднее размывает хвост: 99 быстрых ответов прячут 1 ответ на 2 секунды. Мерить надо перцентили (p95/p99/p99.9) — они показывают, что чувствует худший N% пользователей. Главный senior-капкан: перцентиль — НЕ аддитивная величина, его нельзя усреднять или суммировать между инстансами. avg(p99_A, p99_B) ≠ p99 объединённого потока. Поэтому в Prometheus тип Summary (квантиль считается на клиенте) непригоден для агрегации по подам; нужен Histogram: складываешь кумулятивные _bucket{le} через sum by(le)(rate(..._bucket[5m])) и считаешь histogram_quantile уже в запросе — поверх всех инстансов.",
  "d": "Среднее (mean) и перцентили отвечают на разные вопросы. Mean = «сколько в среднем», его утягивают и большие, и малые значения, а длинный хвост латентности теряется. Перцентиль pX = «значение, ниже которого лежит X% запросов»: p99=1s значит, что 1 из 100 пользователей ждёт ≥ 1s. Перцентиль — порядковая статистика, она нелинейна: усреднять или складывать готовые pX по инстансам/по времени математически неверно. Prometheus Histogram хранит кумулятивные счётчики по корзинам (_bucket{le}, плюс _sum/_count); квантиль вычисляется в момент запроса (histogram_quantile) и потому корректно агрегируется по всем подам через sum by(le). Summary считает квантиль на стороне приложения — такие числа уже нельзя пересчитать на пул."
 },
 {
  "id": "jc-stream-peek",
  "t": "Java",
  "s": "streams",
  "q": "Почему `Stream.of(\"a\",\"b\",\"c\",\"d\",\"e\").peek(System.out::println).count()` в Java 9+ ничего не печатает — и какие операции «возвращают» peek к жизни?",
  "a": "`count()` на SIZED-источнике с Java 9 берёт размер напрямую через `getExactSizeIfKnown()` и НЕ обходит элементы — `peek` (как и любой `Consumer`) не вызывается. Размер «известен», пока конвейер сохраняет характеристику SIZED. `peek` снова выполнится, только если какая-то промежуточная операция СТИРАЕТ точный размер: `filter`, `distinct`, `flatMap`. А `map`, `limit`, `skip`, `sorted`, `boxed` размер СОХРАНЯЮТ — после них `count()` всё так же короткозамкнётся и `peek` промолчит.",
  "d": "Это оптимизация библиотеки `java.util.stream` (не JIT): терминальная `count()` спрашивает у пайплайна точный размер и, если он SIZED, возвращает его, минуя обход. Ключевая ловушка senior-уровня: люди думают, что `.limit(3)` «динамичен» и вернёт peek — нет. `limit`/`skip` над SIZED-источником дают вычислимый точный размер (SLICE его сохраняет), поэтому `count()` снова короткозамыкается, peek молчит. Размер теряется только если он УЖЕ потерян выше: `filter(...).limit(3)` — peek сработает, потому что `filter` уже стёр SIZED, а не из-за `limit`. Эмпирически (OpenJDK 25): peek+count→0, peek+map+count→0, peek+limit(3)+count→0, peek+skip(2)+count→0, peek+filter+count→5, peek+distinct+count→5, peek+flatMap+count→5, peek+filter+limit+count→3."
 },
 {
  "id": "g-te-dont-mock-dont-own",
  "t": "Testing",
  "s": "mockito",
  "q": "Почему «don't mock what you don't own» — и что Mockito возвращает по умолчанию, если всё-таки замокать чужой value-object/коллекцию?",
  "a": "«Don't mock what you don't own» (GOOS, Freeman & Pryce): мокай только свои интерфейсы-абстракции, а не чужие классы — value-объекты, DTO, JDK-коллекции, библиотечные типы. Их надо строить реально (`new`, билдеры, фабрики), а не подменять. Мок чужого типа фиксирует ваши догадки о его контракте; обновится либа — мок врёт, а тесты зелёные. Для коллекций/DTO мок ещё и бессмысленнее реального объекта. Если всё же замокать, Mockito по умолчанию (`RETURNS_DEFAULTS` = `ReturnsEmptyValues`) отдаёт: пустые `List`/`Set`/`Map`, `Optional.empty()`, пустой `Stream`, `0`/`0.0`/`false` для примитивов и `null` для любого ссылочного типа.",
  "d": "Принцип очерчивает границу мока: подменяй роли/порты, которыми ты владеешь и контракт которых сам определяешь, а чужие конкретные типы используй настоящими. Mockito-дефолты тут не подарок: мок `Repository`, забывший застабить метод, тихо вернёт пустой список или `Optional.empty()` — тест пройдёт по ложной причине, а не упадёт на NPE. Эти значения задаёт `ReturnsEmptyValues` (он же `RETURNS_DEFAULTS`), а коллекции и `Optional` приходят пустыми, не `null`."
 },
 {
  "id": "web-ssrf",
  "t": "Web",
  "s": "appsec",
  "q": "Что такое SSRF и почему он особенно опасен в облаке? Как защищаться?",
  "a": "SSRF (Server-Side Request Forgery) — атакующий через подконтрольный URL заставляет сервер сделать HTTP-запрос от своего имени. В облаке это критично: запросом на metadata-эндпоинт 169.254.169.254 можно украсть временные IAM-креды инстанса. Защита: allowlist хостов и схем, блок internal/link-local диапазонов, контроль редиректов и IMDSv2 (требует session-токен).",
  "d": "Главная тонкость — редиректы: проверка только исходного URL обходится 302-редиректом на внутренний адрес. Проверять надо КОНЕЧНЫЙ URL после каждого редиректа (или запретить их)."
 },
 {
  "id": "sp-autoconfig-imports",
  "t": "Spring",
  "s": "boot",
  "q": "Что изменилось в регистрации автоконфигураций в Spring Boot 2.7 / 3 (spring.factories → AutoConfiguration.imports)?",
  "a": "До Boot 2.7 автоконфигурации регистрировались в `META-INF/spring.factories` под ключом `EnableAutoConfiguration`. С 2.7 это объявлено устаревшим, а каноничное место — файл `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` (по одному FQN класса на строку). В Boot 3 поддержка `spring.factories` именно для автоконфигов УБРАНА — стартер обязан использовать новый файл, иначе его автоконфиг молча не подхватится.",
  "d": "Сам класс помечается аннотацией `@AutoConfiguration` (вместо `@Configuration`), а порядок задаётся её атрибутами `before`/`after` вместо отдельных `@AutoConfigureBefore/After`."
 },
 {
  "id": "kc-realm-client-roles",
  "t": "Web",
  "s": "keycloak",
  "q": "Keycloak: realm, client, роли (realm vs client) и группы — как устроена модель доступа?",
  "a": "Realm — изолированный «арендатор»: свои пользователи, клиенты, ключи подписи, токен-настройки; один Keycloak держит много realm. Client — приложение, зарегистрированное в realm (public / confidential / bearer-only). Роли бывают realm roles (глобальные в realm) и client roles (привязаны к конкретному client); назначаются юзеру напрямую или через groups (бандл ролей + атрибуты). Composite role включает другие роли. В токене realm roles лежат в realm_access.roles, а client roles — в resource_access.<clientId>.roles.",
  "d": "Модель «realm → client → role/group» — это RBAC-ядро Keycloak. Realm даёт жёсткую изоляцию (prod/dev, разные арендаторы) вплоть до отдельных ключей подписи, поэтому токен одного realm не валиден в другом. Client описывает, КАК приложение получает токены: public (SPA, без секрета, обязателен PKCE), confidential (бэкенд с client_secret), bearer-only (только валидирует входящие токены, сам логин не инициирует). Разделение realm/client roles нужно, чтобы одна роль 'admin' не «протекала» между приложениями: client roles изолируют права по приложению, realm roles — кросс-аппликейшн. Groups — удобный способ навесить пачку ролей и атрибутов на множество юзеров без ручного назначения каждому."
 },
 {
  "id": "kc-public-confidential",
  "t": "Web",
  "s": "keycloak",
  "q": "Public vs confidential vs bearer-only client в Keycloak — что когда использовать?",
  "a": "**Confidential** — есть client secret, для backend'ов, которым доверяем хранение тайны: authorization code flow обменивает код на токены, обращаясь к token endpoint с секретом. **Public** — БЕЗ секрета (SPA/мобайл, где секрет всё равно виден в браузере/бинаре), поэтому ОБЯЗАН использовать PKCE, чтобы перехваченный authorization code нельзя было обменять. **Bearer-only** — чистый resource server: только валидирует входящие Bearer access token'ы, сам никакого redirect-логина не инициирует и в token endpoint не ходит. Главное правило: тип = «кому можно доверить секрет».",
  "d": "Это про OAuth2/OIDC client authentication, а не про роли. Ось выбора: (1) хранит ли клиент секрет надёжно → confidential vs public; (2) инициирует ли вообще login-flow → если только проверяет токены, это bearer-only. SPA исторически делали public+implicit flow, сейчас стандарт — public + authorization code + PKCE (implicit deprecated). Confidential поддерживает дополнительные методы аутентификации клиента (client_secret_basic/post, private_key_jwt, mTLS). В новом Keycloak вместо галки «bearer-only» включают «Client authentication: ON» + выключают все Authentication flows (Standard/Direct) — клиент остаётся валидатором токенов."
 },
 {
  "id": "kc-roles-to-authorities",
  "t": "Spring",
  "s": "security",
  "q": "Роли из Keycloak-токена не срабатывают в @PreAuthorize(\"hasRole('ADMIN')\") — почему и как замапить их в Spring authorities?",
  "a": "Keycloak кладёт роли в claim realm_access.roles (realm-роли) и resource_access.{clientId}.roles (client-роли), а НЕ в scope. Дефолтный JwtGrantedAuthoritiesConverter в Spring читает только scope/scp и вешает префикс SCOPE_, поэтому ролей он там не находит — hasRole падает. Фикс: написать свой Converter, который достаёт realm_access.roles (и/или client-роли), оборачивает каждую в SimpleGrantedAuthority с префиксом ROLE_. Префикс обязателен, потому что hasRole сам дописывает ROLE_, и сравнение идёт по полной строке authority.",
  "d": "Resource Server на Spring Security 6: bean JwtAuthenticationConverter с подменённым setJwtGrantedAuthoritiesConverter. hasRole('ADMIN') внутри проверяет наличие authority ROLE_ADMIN; hasAuthority('ADMIN') проверяет ровно ADMIN без префикса. Realm-роли общие для всего realm, client-роли изолированы под конкретный clientId — выбирай источник осознанно."
 },
 {
  "id": "kc-token-types",
  "t": "Web",
  "s": "keycloak",
  "q": "Access token vs ID token vs refresh token в Keycloak — какой куда слать и что такое offline-токен?",
  "a": "Access token — для АВТОРИЗАЦИИ: его шлёшь в ресурс-API заголовком `Authorization: Bearer ...`; внутри роли (`realm_access.roles`, `resource_access.<client>.roles`), `scope`, `aud`; короткоживущий (минуты). ID token — артефакт OIDC для АУТЕНТИФИКАЦИИ: его потребляет КЛИЕНТ, чтобы понять кто залогинен (`sub`, `email`, `name`); его НЕ нужно слать в ресурс-API. Refresh token — не для API вообще: им на token endpoint меняешь истёкший access на новый. Offline token — это особый долгоживущий refresh (запрашивается со `scope=offline_access`), не умирает при разлогине/закрытии SSO-сессии и нужен для фоновых демонов/батчей без живой браузерной сессии.",
  "d": "Три токена решают три разные задачи, и senior-грабля — путать слой аутентификации (кто ты, ID token у клиента) со слоем авторизации (что тебе можно, access token в API). Resource server валидирует именно access token (подпись по JWKS, `iss`, `exp`, `aud`), а ID token в API смысла не имеет — у него другая аудитория и набор claim'ов. Offline-токен — отдельная история про «работать без пользователя за рулём»."
 },
 {
  "id": "kc-audience-issuer",
  "t": "Web",
  "s": "keycloak",
  "q": "Почему resource server обязан проверять iss и aud токена, а не только подпись?",
  "a": "Валидная подпись доказывает лишь, что токен выпустил какой-то IdP, чьим ключом ты доверяешь, — но не то, что он предназначен ИМЕННО тебе. Проверка iss гарантирует, что токен выписан ожидаемым realm (иначе токен из другого realm/IdP с легитимной для него подписью пройдёт). Проверка aud отсекает confused-deputy: токен, выписанный для клиента А, нельзя предъявлять сервису Б. Дополнительно валидируешь exp/nbf с допуском на clock skew.",
  "d": "В мультитенантной/мульти-realm среде один JWKS-кэш или общий trust может покрывать несколько эмитентов — без iss-pin любой их токен с валидной подписью «проходит». aud защищает от пересылки access-токена с одного микросервиса на другой (token replay across services). В Keycloak по умолчанию aud access-токена может НЕ содержать твой client_id — нужен audience-mapper или scope с audience, иначе строгая проверка aud сломает интеграцию."
 },
 {
  "id": "ops-red-use-golden",
  "t": "DevOps",
  "s": "observability",
  "q": "RED, USE и Four Golden Signals — три метода мониторинга: что и когда мерить?",
  "a": "RED (для сервисов/запросов): Rate — RPS, Errors — доля ошибок, Duration — латенси (p50/p95/p99). USE (для ресурсов/железа): Utilization — загрузка, Saturation — очередь/насыщение, Errors — сбои. Four Golden Signals (Google SRE): Latency, Traffic, Errors, Saturation. RED меряешь на границе сервиса, USE — на ресурсах (CPU/диск/пул).",
  "d": "RED отвечает «плохо ли пользователю», USE — «почему» (какой ресурс упёрся). Комбинируют: RED алертит по симптому, USE локализует причину."
 },
 {
  "id": "db-tsdb-compression",
  "t": "DB",
  "s": "time-series",
  "q": "Как time-series БД (Prometheus, VictoriaMetrics) сжимают метрики так плотно — delta-of-delta и Gorilla?",
  "a": "Метрика — это (timestamp, float) с регулярным шагом и медленно меняющимся значением, поэтому сжимается экстремально. Таймстемпы: delta-of-delta — хранят не время, а разницу разниц (при ровном шаге почти всегда 0 → пара бит). Значения: Gorilla-сжатие (Facebook) — XOR соседних float64; близкие значения дают много общих битов, хранится только меняющийся кусок. Итог — часто ~1-2 байта на точку вместо 16.",
  "d": "Работает именно на регулярных рядах; хаотичные значения (высокая энтропия) сжимаются плохо."
 },
 {
  "id": "db-tsdb-downsampling",
  "t": "DB",
  "s": "time-series",
  "q": "Downsampling и retention-tiers в метриках — зачем прореживать историю?",
  "a": "Свежие данные нужны в полном разрешении (посекундно — для разбора инцидента), а годовалые — нет: хватит точки в 5 минут/час. Downsampling = агрегировать старые точки в грубые (min/max/avg/sum за окно), retention-tiers = разные сроки хранения для разных разрешений (raw 15д → 5m-rollup 90д → 1h-rollup 2 года). График за год строится по готовым rollup'ам, а не по миллиардам сырых точек.",
  "d": "Без downsampling запрос «за год» тащит сырьё → медленно и дорого; с ним читает грубый tier."
 },
 {
  "id": "ops-recording-alerting-rules",
  "t": "DevOps",
  "s": "observability",
  "q": "Recording rules vs alerting rules в Prometheus — зачем нужны и чем отличаются?",
  "a": "Recording rule периодически считает дорогое PromQL-выражение и СОХРАНЯЕТ результат как новую метрику; дашборд потом читает готовое, а не пересчитывает по сырью на каждый рефреш. Alerting rule вычисляет условие (напр. error-rate > 5% в течение 5 минут) и при срабатывании шлёт алерт в Alertmanager. Первое — про ускорение запросов, второе — про уведомления.",
  "d": "Recording rules материализуют агрегаты (как materialized view для метрик); alerting rules — триггеры на пороги."
 },
 {
  "id": "sd-metrics-tsdb-scale",
  "t": "System Design",
  "s": "Кейсы II",
  "q": "Как масштабируют метрик-хранилище (VictoriaMetrics/Thanos): разделение ingest/store/query и remote_write?",
  "a": "Один Prometheus упирается в диск/память при росте числа series. Решение — разнести роли: приёмник (vminsert) шардит входящие серии по хэшу на storage-узлы; storage (vmstorage) хранит и мёрджит части, жмёт; query (vmselect) параллельно читает шарды и дедуплицирует. Prometheus шлёт данные наружу через remote_write в такое кластерное long-term хранилище. Так write, storage и read масштабируются независимо.",
  "d": "Разделение по ролям = независимое масштабирование: пик записи → добавь insert-узлов; тяжёлые запросы → select-узлов."
 },
 {
  "id": "tr-finally-return",
  "t": "Java",
  "s": "exceptions",
  "q": "Что вернёт метод, если в try стоит return 1, а в finally — return 2? И куда денется исключение из try?",
  "a": "Вернётся 2. return (и даже брошенное исключение) из finally ПЕРЕКРЫВАЕТ return/исключение из try — try-результат просто теряется. Поэтому return и throw внутри finally — почти всегда баг: они молча глотают и нормальный ответ, и ошибку.",
  "d": "finally выполняется всегда (кроме System.exit / убийства JVM), поэтому его return — последнее слово.",
  "code": "int f(){\n  try { return 1; }\n  finally { return 2; }   // ← перекрывает return 1\n}\n// f() == 2\n\nint g(){\n  try { throw new RuntimeException(); }\n  finally { return 2; }   // ← исключение ПРОГЛОЧЕНО, вернёт 2\n}"
 },
 {
  "id": "tr-list-remove-overload",
  "t": "Java",
  "s": "collections",
  "q": "list.remove(1) для List<Integer> — удалит элемент 1 или элемент с индексом 1?",
  "a": "По ИНДЕКСУ 1 — не значение! Есть две перегрузки: remove(int index) и remove(Object o). Литерал 1 — это int, поэтому вызывается remove по индексу. Чтобы удалить по значению, передай объект: remove(Integer.valueOf(1)) или remove((Integer)1).",
  "d": "Для List<String> проблемы нет — там только remove(Object). Ловушка именно у List<Integer>.",
  "code": "List<Integer> l = new ArrayList<>(List.of(10,20,30));\nl.remove(1);                    // удалит ИНДЕКС 1 → [10,30]\nl.remove(Integer.valueOf(20));  // удалит ЗНАЧЕНИЕ 20 → [10,30]\n// remove(int) vs remove(Object) — выбирает компилятор по типу"
 },
 {
  "id": "tr-incr-atomic",
  "t": "Concurrency",
  "s": "atomicity",
  "q": "Почему count++ из нескольких потоков теряет инкременты, хотя это «одна строчка»?",
  "a": "count++ — это ТРИ операции: прочитать, прибавить, записать (read-modify-write). Между ними другой поток успевает вклиниться, оба читают одно и то же старое значение и затирают инкремент друг друга. Нужен AtomicInteger.incrementAndGet() или synchronized — «одна строка» кода ≠ атомарность.",
  "d": "volatile тут НЕ спасает: он даёт видимость, но не атомарность read-modify-write.",
  "code": "count++;   // на деле:\nint tmp = count; // read\ntmp = tmp + 1;   // modify\ncount = tmp;     // write  ← гонка между потоками\n\n// правильно:\nAtomicInteger c = new AtomicInteger();\nc.incrementAndGet();   // атомарно (CAS)"
 },
 {
  "id": "tr-hashmap-mt",
  "t": "Concurrency",
  "s": "collections",
  "q": "Что будет, если писать в обычный HashMap из нескольких потоков?",
  "a": "Порча данных: потерянные записи, «внезапные» null, а на старых JVM (до 8) при resize мог возникнуть бесконечный цикл в бакете — поток зависал на 100% CPU. HashMap НЕ потокобезопасен. Для конкурентного доступа — ConcurrentHashMap (а не Collections.synchronizedMap, который лочит всё целиком).",
  "d": "ConcurrentHashMap лочит по сегментам/бинам — параллельные записи в разные бакеты не мешают друг другу."
 },
 {
  "id": "tr-float-money",
  "t": "Java",
  "s": "numbers",
  "q": "Почему 0.1 + 0.2 != 0.3 и чем считать деньги?",
  "a": "double/float — двоичная плавающая точка, и 0.1, 0.2, 0.3 в ней представляются НЕточно. Сумма даёт 0.30000000000000004. Для денег и точных сумм используй BigDecimal (созданный из СТРОКИ, не из double!) или считай в минимальных единицах — копейках/центах — целыми long.",
  "d": "new BigDecimal(0.1) тоже неточен — бери new BigDecimal(\"0.1\").",
  "code": "System.out.println(0.1 + 0.2);   // 0.30000000000000004\nSystem.out.println(0.1 + 0.2 == 0.3); // false\n\nBigDecimal a = new BigDecimal(\"0.1\");   // из строки!\nBigDecimal b = new BigDecimal(\"0.2\");\nSystem.out.println(a.add(b));    // 0.3 (точно)"
 },
 {
  "id": "tr-fixed-pool-oom",
  "t": "Concurrency",
  "s": "thread-pool",
  "q": "Чем коварен Executors.newFixedThreadPool при всплеске задач?",
  "a": "У него НЕограниченная очередь (LinkedBlockingQueue без лимита). Если задачи приходят быстрее, чем выполняются, очередь растёт бесконечно → OutOfMemoryError, а не отказ. Правильно — создавать ThreadPoolExecutor вручную с ОГРАНИЧЕННой очередью и осознанной политикой отклонения (RejectedExecutionHandler).",
  "d": "newCachedThreadPool наоборот — плодит потоки без ограничения. Оба фабричных метода опасны в проде.",
  "code": "// ловушка: очередь без предела\nExecutorService p = Executors.newFixedThreadPool(10);\n\n// правильно: ограниченная очередь + политика отказа\nnew ThreadPoolExecutor(10, 10, 0L, TimeUnit.MILLISECONDS,\n    new ArrayBlockingQueue<>(1000),\n    new ThreadPoolExecutor.CallerRunsPolicy());"
 },
 {
  "id": "tr-static-hiding",
  "t": "Java",
  "s": "oop",
  "q": "static-метод переопределяется в наследнике? Что вызовется через ссылку родителя?",
  "a": "НЕ переопределяется — static-методы не полиморфны, они «скрываются» (method hiding). Какой вызовется, решается на этапе компиляции по ТИПУ ССЫЛКИ, а не по реальному объекту. Parent p = new Child(); p.stat() вызовет метод Parent, а не Child.",
  "d": "Для экземплярных методов было бы наоборот — динамическая диспетчеризация по объекту.",
  "code": "class Parent { static String who(){ return \"Parent\"; } }\nclass Child extends Parent { static String who(){ return \"Child\"; } }\n\nParent p = new Child();\np.who();        // \"Parent\"  ← по типу ссылки (hiding)\n// у обычного (не static) метода было бы \"Child\""
 },
 {
  "id": "tr-ternary-promotion",
  "t": "Java",
  "s": "boxing",
  "q": "Что напечатает System.out.println(true ? Integer.valueOf(1) : Double.valueOf(2))?",
  "a": "1.0, а не 1! Тернарный оператор приводит обе ветки к ОБЩЕМУ числовому типу. Integer и Double → оба к double, поэтому 1 становится 1.0. А если одна ветка — обёртка со значением null и идёт авто-анбоксинг, тернарник может внезапно бросить NullPointerException.",
  "d": "Классика: cond ? intValue : (Integer)null — при false пытается анбоксить null → NPE.",
  "code": "System.out.println(true ? Integer.valueOf(1) : Double.valueOf(2));\n// 1.0  ← обе ветки приведены к double\n\nInteger x = null;\nint y = flag ? 0 : x;   // если flag=false → анбоксинг null → NPE"
 }
];

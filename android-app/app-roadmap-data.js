/* Дерево роадмапа: 22 этапа + бонус. Только данные, разбирает и рисует их app-roadmap.js.
 *
 * Строка = узел, глубина = отступ по 2 пробела: этап → тема → ветка → подветка → лист.
 *   Название | English :: метки
 *   ~Группа С нуля      — группа из ZERO у родительской темы (шаги становятся листьями сами)
 * Метки через пробел:
 *   id карточки         — карточка лежит ровно в одном узле (проверяет check-native.js)
 *   f:id   разбор «На пальцах»      p:id   схема «Принцип»
 *   m:режим  экран приложения       g:mИгра  режим из «Игры»
 *   T:кластер  термины кластера; он же — куда попадут новые карточки этого кластера, пока их не разложили по веткам
 *   B:начало  группа «Для чайника» (по началу названия)
 * Название без «| English» — и есть английское (ACID, Redis, Kafka…). */
window.JD_ROADMAP = String.raw`
Как работает компьютер | How a computer works
  Железо | Hardware
    ~Железо
  Процессор | CPU
    ~Процессор
  Программа | Program
    ~Программа
  Память | Memory
    ~Память
  Операционная система | Operating system
    ~ОС
  Скорость | Speed
    ~Скорость
  Вся цепочка | The whole chain
    ~Итог

Java Core :: T:Java B:Код
  Первая программа | First program
    ~Java: первая строка
  Типы и значения | Types and values
    ~Java: типы
    Примитивы и обёртки | Primitives and wrappers :: jc-prim-wrap jc-intcache njava-boxing tr-ternary-promotion f:integer-cache p:pr-integer-cache
    Числа | Numbers :: tr-float-money njava-numbers f:float-precision
    Сравнение == и equals | == vs equals :: jc-eqeq
    Строки | Strings
      Пул и неизменяемость | Pool and immutability :: jc-strpool x-java-string-immutable-builder g-java-compact-intern f:string-pool p:string-pool
      Разбор и регулярки | Parsing and regex :: njava-strings gp2-regex-backtracking
    Массивы и varargs | Arrays and varargs :: njava-arrays g-java-varargs-trap
    Ключевые слова | Keywords :: g-java-final-vars jc-final-finally-finalize jc-assert
    Передача аргументов | Passing arguments :: jc-pass-by-value
  Объекты и ООП | Objects and OOP
    ~Java: объекты
    Устройство класса | Class anatomy
      Инициализация | Initialization :: jc-init-order jc-identity-state
      static :: jc-static tr-static-hiding
      Вложенные классы | Nested classes :: jc-nested-classes
      enum :: jc-enum-adv
    Наследование и интерфейсы | Inheritance and interfaces
      Абстрактный класс и интерфейс | Abstract class vs interface :: jc-abstract-iface jc-marker-iface
      Методы интерфейса | Interface methods :: jc-default-methods jc-private-iface
      Override и overload :: jc-override-overload
      sealed :: jc-sealed
    Контракт Object | Object contract
      equals и hashCode | equals and hashCode :: jc-eqhash jc-mutable-key njava-equals-hashcod f:equals-hashcode p:pr-equals-hashcode
      toString и clone | toString and clone :: g-java-object-methods g-java-finalize-clone
    Неизменяемость | Immutability :: jc-immutable-howto njava-core f:record-immutable
  Коллекции | Collections
    ~Java: коллекции
    List :: jc-arr-linked tr-list-remove-overload jc-immutable-collections f:arraylist-linkedlist p:arraylist-resize
    Map
      HashMap внутри | HashMap internals
        put и рост | put and resize :: jc-hashmap-resize f:hashmap-internals p:hashmap-put
        Дерево в бакете | Tree in a bucket :: jc-hashmap-treeify
      Другие реализации | Other implementations :: jc-map-impls g-java-enummap-weakhashmap g-java-navigablemap jc-map-notcoll
      Потокобезопасные | Thread-safe :: jc-hashtable-chm jc-chm-internals f:fp-chm-internals
    Set :: jc-hashset
    Обход и удаление | Iteration and removal :: jc-failfast jc-iterator-removal f:failfast-iter
    Сортировка | Sorting :: x-java-comparable-comparator g-java-comparator-nulls f:comparable-comparator
  Дженерики | Generics
    Стирание типов | Type erasure :: jc-erasure f:type-erasure p:pr-erasure
    Wildcards и PECS :: x-java-pecs-wildcards g-java-generics-capture f:generics-pecs f:bounded-type
    Массивы и ковариантность | Arrays and covariance :: njava-generics
  Исключения | Exceptions
    ~Java: исключения
    Иерархия | Hierarchy :: jc-error-exc jc-checked f:checked-unchecked
    catch и finally | catch and finally :: jc-catch-order jc-multicatch tr-finally-return
    try-with-resources :: jc-twr f:try-with-resources p:pr-try-with-resources
    Причина и обёртка | Cause and wrapping :: gap-exc-chaining-cause
    InterruptedException :: gap-exc-interrupted
  Лямбды и стримы | Lambdas and streams
    ~Java: современное
    Лямбды | Lambdas :: jc-funciface jc-lambda-anon jc-method-ref jc-func-interfaces
    Стримы | Streams
      Ленивость | Laziness :: jc-stream-lazy jc-stream-infinite jc-stream-peek p:pr-stream-lazy
      Операции | Operations :: jc-stream-reduce jc-flatmap jc-primitive-streams g-java-checked-streams
      Коллекторы | Collectors :: jc-stream-collectors jc-collectors jc-groupingby-downstream x-java-stream-collectors-vs-reduce
      parallelStream :: jc-parallel-stream
    Optional :: jc-optional-misuse jc-optional-orelse jc-optional-chain f:optional-usage f:fp-optional-orelse
  Новая Java | Modern Java
    ~Java 17 → 21
    ~Java 22 → 25
    Java 17–21
      var и switch | var and switch :: jc-var jc-switch-expr jc-text-block
      Pattern matching :: jc-pattern-match gp2-record-patterns gp2-switch-exhaustive
    Java 22–25
      Что нового и LTS | What's new and LTS :: j25-lts j25-small
      Язык и API | Language and API :: j25-main j25-gatherers j25-scoped
      FFM и скорость JVM | FFM and JVM speed :: j25-ffm j25-jvm
  Рефлексия и аннотации | Reflection and annotations
    ~Рефлексия и аннотации
    Рефлексия | Reflection :: jc-reflection
    Аннотации | Annotations :: jc-annotations
  Стандартная библиотека | Standard library
    Дата и время | Date and time :: jc-datetime gp2-time-types gp2-time-utc-trap njava-core-2
    Ввод-вывод | I/O :: gap-io-byte-char-charset jc-nio2
    Сериализация | Serialization :: jc-transient gap-serial-version-uid gap-serial-deser-security gap-serial-externalizable
    Модули и локаль | Modules and locale :: jc-modules jc-i18n

JVM :: T:JVM
  Как исполняется | How it runs
    ~Java: как исполняется
    JVM, JRE, JDK :: jvm-jre-jdk
    Запуск приложения | App startup :: f:fp-app-boot
    Загрузка классов | Class loading :: g-jvm-classloader-delegation gap-jvm-classloader-leak f:fp-classloader-leak p:class-loading
    Байткод и лямбды | Bytecode and lambdas :: gap-jvm-invokedynamic-lambda f:fp-invokedynamic
  Память JVM | JVM memory
    Стек и куча | Stack and heap :: jvm-stackheap f:stack-heap p:jvm-memory
    Metaspace :: jvm-metaspace f:metaspace
    Объект в памяти | Object layout :: gap-jvm-object-header-coops
    Виды ссылок | Reference types :: x-jvm-references f:reference-types
    Вне кучи | Off-heap :: gap-oh-direct-memory
    Строки в памяти | Strings in memory :: g-jvm-string-intern-dedup f:string-intern
    Флаги памяти | Memory flags :: g-jvm-heap-flags-ergonomics
    OutOfMemory и утечки | OutOfMemory and leaks :: x-jvm-oom-types jvm-leak f:mem-leak
    JVM в контейнере | JVM in a container :: njvm-containers
  Сборка мусора | Garbage collection
    ~Сборка мусора
    Что считается мусором | What counts as garbage :: gap-jvm-gc-roots f:gc-roots f:fp-gc-roots p:gc p:pr-gc-roots
    Поколения | Generations :: x-jvm-generations f:gc-generational
    Write barrier :: gap-jvm-write-barrier-cardtable f:fp-write-barrier p:pr-write-barrier
    Паузы | Pauses :: jvm-stw g-jvm-safepoint f:gc-stw
    Сборщики | Collectors
      G1 :: jvm-g1 f:g1-regions
      ZGC и Shenandoah :: g-jvm-zgc-shenandoah
  JIT
    Уровни C1 и C2 | C1 and C2 tiers :: g-jvm-jit-tiers p:jit
    Инлайнинг | Inlining :: g-jvm-inlining
    Деоптимизация | Deoptimization :: g-jvm-deopt
    Escape analysis :: x-jvm-tlab-escape p:pr-escape-analysis
  Диагностика | Diagnostics
    ~Профилирование
    Thread dump :: jvm-thread-dump
    Heap dump :: jvm-heap-dump
    Профилировщики | Profilers :: jvm-profiling

ООП и паттерны | OOP and patterns :: T:Design
  SOLID
    ~SOLID
    SRP :: de-srp f:srp-godclass
    OCP :: de-ocp f:ocp-switch
    LSP :: de-lsp f:lsp-rect
    ISP и DIP :: de-isp-dip g-de-dip-example x-de-dip-vs-di f:dip-hexagon
  Паттерны | Patterns
    ~Паттерны
    Порождающие | Creational
      Factory :: de-factory f:factory
      Builder :: de-builder f:builder
      Singleton :: de-singleton f:singleton-enum
    Структурные | Structural
      Decorator :: x-de-decorator f:dsf-decorator p:prd-decorator
      Adapter и Facade :: g-de-adapter-vs-facade
      Proxy :: g-de-proxy
      Composite :: g-de-composite
    Поведенческие | Behavioral
      Strategy :: de-strategy g-de-template-vs-strategy f:strategy p:pr-strategy
      Observer :: x-de-observer f:dsf-observer p:prd-observer
      Chain of Responsibility :: de-chain-of-responsibility f:fp-chain-responsibility p:pr-chain
      Command :: g-de-command
      State :: g-de-state-machine f:dsf-state
  Принципы дизайна | Design principles
    Связность и зацепление | Cohesion and coupling :: g-de-cohesion-coupling de-comp-inherit
    DRY, KISS, YAGNI :: de-principles craft-dry-real
    Объекты и сообщения | Objects and messages :: x-de-law-of-demeter de-tell-dont-ask p:pr-tell-dont-ask
    Модель и зависимости | Model and dependencies :: g-de-anemic-vs-rich de-service-locator de-dynamic-dispatch
    Глубокие модули | Deep modules :: p-deep-shallow-module p-info-leakage-temporal p-define-errors-out
  Чистый код | Clean code
    Читаемость | Readability :: craft-naming craft-comments craft-function-size craft-flag-param
    Техдолг | Tech debt :: craft-broken-windows craft-debt-argue
  Легаси | Legacy code
    Что такое легаси | What legacy means :: p-legacy-code-no-tests
    Как менять без тестов | Changing without tests :: p-seam-enabling-point p-sprout-wrap p-lean-on-compiler

Алгоритмы | Algorithms :: T:Algorithms
  Сложность | Complexity
    ~Сложность
    O-нотация | Big O :: alg-bigo alg-structure x-alg-avg-vs-worst
    Амортизация | Amortized cost :: x-alg-amortized-arraylist g-alg-amortized
    Скрытая цена | Hidden cost :: alg-hidden-n2 x-alg-stream-overhead
    Память и рекурсия | Memory and recursion :: x-alg-space-complexity alg-recursion
  Структуры данных | Data structures
    Хеш-таблицы | Hash tables :: alg-hashtable g-alg-open-vs-chain nalgo-hashing f:alf-hash-collision p:pr-hash-collision
    Деревья | Trees
      BST и баланс | BST and balancing :: alg-bst alg-balanced ds-balanced-bst
      B-tree :: alg-btree-ds
      Trie :: g-alg-trie ds-trie
      Деревья отрезков | Segment trees :: ds-fenwick-segtree
    Куча | Heap :: alg-heap-pq ds-heap-priority-queue p:pra-heap-siftdown
    LRU-кэш | LRU cache :: g-alg-lru ds-lru-cache f:alf-lru-cache
    Union-Find :: g-alg-union-find ds-union-find
    Вероятностные | Probabilistic :: ds-bloom-filter ds-skip-list ds-cardinality-sketches ds-consistent-hashing
  Сортировка и поиск | Sorting and search
    Сортировки | Sorting :: alg-sort g-alg-heapsort nalgo-sorting nalgo-sorting-2 p:pra-quicksort-partition
    k-й элемент | k-th element :: gap-alg-quickselect
    Бинарный поиск | Binary search :: alg-binsearch g-alg-binsearch-answer f:alf-binary-search p:binary-search
  Графы | Graphs
    Обходы | Traversal :: alg-bfs alg-dfs f:alf-bfs f:alf-dfs p:bfs
    Кратчайший путь | Shortest path :: g-alg-dijkstra f:alf-dijkstra
    Топологическая сортировка | Topological sort :: g-alg-toposort
  Приёмы | Techniques
    Два указателя | Two pointers :: alg-two-ptr f:alf-two-pointers
    Скользящее окно | Sliding window :: alg-sliding f:alf-sliding-window
    Динамика и жадность | DP and greedy :: alg-dp alg-greedy
    Цикл в списке | Cycle detection :: gap-alg-floyd-cycle
    Битовые трюки | Bit tricks :: g-alg-bit-tricks

Многопоточность | Concurrency :: T:Concurrency T:Reactive B:Параллелизм
  Основы потоков | Thread basics
    ~Многопоточность
    Поток | A thread :: p:thread
    Гонки и атомарность | Races and atomicity :: co-race tr-incr-atomic f:race f:atomicity-visibility
    Дедлок и голодание | Deadlock and starvation :: co-deadlock g-co-livelock-starvation f:deadlock
    wait и notify | wait and notify :: gap-co-wait-notify-spurious g-co-sleep-vs-wait
    Отмена | Cancellation :: gap-co-interruption-cancellation
  Модель памяти | Memory model
    volatile :: co-volatile co-sva f:volatile
    happens-before :: co-hb g-jvm-happens-before f:happens-before
    Безопасная публикация | Safe publication :: gap-co-safe-publication-final x-co-double-checked-locking f:fp-safe-publication f:double-checked-locking p:pr-safe-publication
    False sharing :: x-co-false-sharing p:pr-false-sharing
  Блокировки | Locks
    synchronized и Lock | synchronized and Lock :: gap-co-sync-vs-reentrantlock g-co-condition-lostwakeup f:synchronized-monitor p:lock-mutex
    StampedLock :: g-co-stampedlock
    CAS и атомики | CAS and atomics :: co-atomic g-co-aba g-co-tlrandom p:cas p:pr-longadder
  java.util.concurrent
    ~java.util.concurrent
    Пулы потоков | Thread pools
      Executor :: co-pool co-executor co-pool-reject tr-fixed-pool-oom f:thread-pool p:thread-pool p:pr-executor-lifecycle
      ForkJoinPool :: g-co-forkjoin-steal p:pr-work-stealing
    CompletableFuture :: x-co-completablefuture-compose g-co-cf-combine-exc gap-co-cf-default-executor p:pr-completablefuture
    Конкурентные коллекции | Concurrent collections :: co-chm co-cow tr-hashmap-mt f:concurrenthashmap
    Очереди и producer-consumer | Queues and producer-consumer :: g-co-blockingqueue-types p:producer-consumer
    Синхронизаторы | Synchronizers :: co-sync-tools g-co-phaser
    ThreadLocal :: co-tl f:threadlocal-leak
  Виртуальные потоки | Virtual threads
    ~Virtual threads
    Как устроены | How they work :: co-vt f:vthreads p:pr-vthreads
    Pinning :: x-co-pinning-vthreads
    Лимиты и грабли | Limits and traps :: nconc-vthreads ndist-virtual-thread nspri-virtual-thread
    ScopedValue :: gp2-scoped-value
    Structured concurrency :: gap-sc-structured-task-scope co-sc-scope co-sc-cancel co-sc-vs-allof
  Реактивность | Reactive
    ~Реактивность
    Основы | Basics :: rx-streams-api rx-push-pull rx-hot-cold f:rxf-hot-vs-cold
    Backpressure :: rx-backpressure rx-overflow-strategies f:rxf-request-backpressure p:prrx-backpressure
    Reactor и Mutiny | Reactor and Mutiny
      Mono и Flux | Mono and Flux :: rx-mono-flux-uni-multi rx-cold-nothing-without-subscribe f:rxf-nothing-without-subscribe
      Операторы | Operators :: rx-map-flatmap-concatmap rx-zip-merge-combine f:rxf-map-vs-flatmap p:prrx-flatmap
      Ошибки | Errors :: rx-error-handling f:rxf-onerrorresume
      Потоки и контекст | Threads and context :: rx-schedulers-blocking gap-rx-context f:rxf-subscribeon-publishon
    Когда она нужна | When you need it :: rx-vs-imperative-loom gp2-reactive-when

Инструменты | Tools :: T:Git T:Build
  Git
    ~Git
    Основы | Basics
      Как устроен | How it works :: ngit-internals f:gitf-three-areas p:pr-git-three-areas
      fetch, pull, stash :: x-git-fetch-pull git-stash f:gitf-fetch-pull
    Ветки и слияние | Branches and merging
      merge и конфликты | merge and conflicts :: g-git-no-ff-merge x-git-merge-conflict f:gitf-merge-conflict p:prg-merge
      rebase :: git-rebase x-git-rebase-i ngit-force-push f:git-rebase p:prg-rebase
      cherry-pick :: git-cherrypick g-git-cherry-pick-conflict f:git-cherrypick
      Git flow :: git-flow
    Откаты | Undoing
      reset и revert :: git-reset-revert g-git-revert-merge f:gitf-reset-revert
      reflog и detached HEAD :: x-git-reflog g-git-detached-head f:gitf-detached-reflog
    Поиск причин | Finding causes :: git-bisect g-git-blame f:git-bisect
    Настройка и детали | Setup and details :: g-git-gitignore-tracked g-git-hooks g-git-submodule g-git-tag-annotated g-git-worktree
  Maven
    Жизненный цикл | Lifecycle :: bld-lifecycle-phases ops-maven bld-plugin-goal nbuil-maven f:bldf-mvn-lifecycle p:prbld-lifecycle-conveyor
    Зависимости | Dependencies :: bld-dependency-scopes bld-version-mediation bld-dependency-management-bom f:bldf-nearest-wins f:bldf-bom-align p:prbld-version-mediation
    Многомодульность | Multi-module :: bld-multimodule-reactor f:bldf-multi-module-reactor
    Упаковка и профили | Packaging and profiles :: bld-fatjar-shade-relocation bld-profiles
  Gradle
    Зависимости | Dependencies :: bld-impl-vs-api bld-version-resolution bld-dependency-tree f:bldf-impl-vs-api f:bldf-deptree-diag
    Скорость сборки | Build speed :: bld-build-cache g-ops-gradle-vs-maven-incremental
    Gradle или Maven | Gradle or Maven :: bld-gradle-vs-maven
  Версии и сборка | Versions and builds
    Semver :: bld-semver-classpath g-ops-semver-breaking
    Воспроизводимость | Reproducibility :: nbuil-vosproizvodimo
    Annotation processing :: gap-ap-apt-rounds
  Linux
    ~Linux для бэкендера
    Диагностика сервиса | Service diagnostics :: devops-linux
  Что ещё встретишь | What else you'll meet
    ~Что ещё встретишь

Базы данных | Databases :: T:DB B:Данные
  SQL
    ~Базы данных
    Схема | Schema
      Нормализация | Normalization :: g-db-normalization-forms g-db-denormalization
      Ключи | Keys :: ndb-pkuuid g-db-fk-cascade-storm p-db-unindexed-fk
      Антипаттерны | Antipatterns :: db-selectstar db-eav db-polymorphic f:select-star f:eav
    Запросы | Queries
      JOIN :: ndb-sqljoin p:pr-join-types
      Оконные функции | Window functions :: g-db-window-vs-groupby g-db-ranking-functions gp2-sql-window-rank gp2-sql-window-frame f:fp-window-ranking
      Рекурсивный CTE | Recursive CTE :: g-db-recursive-cte
      NULL :: p-sql-null-not-in
    Доступ из Java | Access from Java :: db-jdbc x-db-sql-injection
    Какую базу взять | Which database :: db-sql-nosql sd-sql-vs-nosql
  Индексы | Indexes
    B-tree :: db-leftmost p-db-composite-order db-covering f:btree-leftmost f:covering-index p:btree-lookup
    Почему не работает | Why it isn't used :: db-notused f:index-not-used
    Особые индексы | Special indexes
      Частичный и по выражению | Partial and expression :: g-db-partial-index g-db-expression-index
      GIN и BRIN :: g-db-gin-jsonb g-db-brin
      Кластерный | Clustered :: g-db-clustered-index
    Keyset-пагинация | Keyset pagination :: db-keyset f:keyset-pagination
    Индексы на проде | Indexes in production :: p-pg-cic-invalid db-idxbloat p-pg-hot-fillfactor
  Транзакции | Transactions
    Коммит и журнал | Commit and WAL :: p:transaction-commit p:pr-wal-durability
    Изоляция | Isolation
      Аномалии чтения | Read anomalies :: db-read-phenom x-sp-isolation
      Уровни изоляции | Isolation levels :: db-isolation f:isolation-levels p:pr-isolation-levels
      Snapshot isolation :: p-tx-repeatable-read-name-trap
      SERIALIZABLE и повтор | SERIALIZABLE and retry :: p-tx-ssi-retry-40001
      Write skew :: db-writeskew f:write-skew
      Lost update :: db-lostupdate p-db-find-save-race f:lost-update
    Блокировки | Locks
      Какую выбрать | Which to choose :: db-optpess f:optimistic-pessimistic
      Оптимистичная | Optimistic :: x-sp-optimistic-lock
      Пессимистичная | Pessimistic
        FOR UPDATE :: x-db-for-update
        SKIP LOCKED :: p-pg-skip-locked p-outbox-skip-locked
      Дедлок в базе | Database deadlock :: x-db-deadlock p:pr-deadlock-db
      Gap-блокировки | Gap locks :: g-db-gap-next-key-locks f:fp-gap-locks
      DDL и блокировки | DDL and locks :: ndb-ddllocks
  PostgreSQL
    ~PostgreSQL
    MVCC :: db-mvcc f:mvcc p:mvcc
    VACUUM :: db-vacuum ndb-vacuumxmin-hor f:vacuum-bloat
    Хранение и типы | Storage and types :: db-pg-storage db-numeric f:numeric-money
    План запроса | Query plan :: db-explain g-db-explain-cost-rows g-db-prepared-plan-cache f:fp-sql-path p:pr-explain-read
    Пул соединений | Connection pool :: db-hikari g-db-pool-size p-pg-pgbouncer-txn p:connection-pool
    Большие выборки | Large result sets :: p:pr-cursor-streaming
  Hibernate и JPA
    ~Hibernate и JPA
    Сущность | Entity
      Жизненный цикл | Lifecycle :: h-entity-states-merge-persist h-lazy-proxy-getreference
      equals и record | equals and records :: h-entity-equals-hashcode nspri-jpa
    Контекст персистентности | Persistence context
      Кэш первого уровня | First-level cache :: h-l1-persistence-context
      Dirty checking :: sp-dirty f:dirty-checking p:pr-dirty-checking
      flush :: h-flush-vs-commit sp-jpa-flush f:fp-persistence-flush
    Кэш второго уровня | Second-level cache :: h-l2-cache-query-cache
    N+1 :: sp-nplus1 x-db-n-plus-one f:n-plus-1 p:pr-n-plus-one
    Ленивая загрузка | Lazy loading :: sp-lazyinit sp-osiv f:lazy-init f:osiv
    Производительность | Performance :: sp-jpa-batch sp-jpa-projection nspri-data sp-criteria
  Данные под нагрузкой | Data under load
    ~Данные под нагрузкой
    Репликация | Replication :: arch-replication sd-replication arch-read-write-split f:sdf-replication-sync-async p:replication p:pr-replica-lag
    Шардинг | Sharding :: arch-sharding sd-sharding-key ndist-consistent-has f:apf-sharding f:sdf-sharding-by-key f:sdf-consistent-hashing-cache p:sharding
    Аналитика | Analytics :: di-oltp-vs-olap di-batch-vs-stream
    Временные ряды | Time series :: db-tsdb-compression db-tsdb-downsampling

Кэш и поиск | Cache and search
  Кэш | Cache
    ~Кэш
    Стратегии | Strategies :: inf-cacheaside arch-caching-strategies f:cacheaside p:cache-aside p:pri-cache-aside-hitmiss
    Вытеснение | Eviction :: inf-eviction f:cache-eviction
    Лавина промахов | Cache stampede :: inf-stampede p-stab-dogpile-jitter f:cache-stampede
    CDN :: arch-cdn
  Redis
    ~Redis
    Что это | What it is :: inf-redis
    Один поток | Single thread :: ninfr-redis--single- p:pr-redis-single
    Структуры | Structures :: g-inf-redis-sortedset g-inf-redis-hll
    Сохранность | Persistence :: x-inf-redis-persistence g-inf-redis-rdb-aof-tradeoff
    Pub/Sub и Streams :: g-inf-redis-streams-vs-pubsub
  Elasticsearch
    ~Elasticsearch
    Инвертированный индекс | Inverted index :: inf-es f:inverted-index
    text и keyword :: x-inf-es-text-vs-keyword
    Почти реальное время | Near real time :: g-inf-es-refresh-near-realtime
    Шарды и реплики | Shards and replicas :: g-inf-es-shards-replicas

Сеть и API | Network and API :: T:Web B:Связь
  Сеть | Network
    ~Сеть
    DNS и прокси | DNS and proxies :: web-dns-lb f:reverse-proxy-lb
    TCP и UDP | TCP and UDP :: web-tcp-udp g-web-tcp-handshake-lifecycle g-web-keepalive f:fp-tcp-handshake p:pr-tcp-handshake
    Путь запроса | Request path :: de-server-lifecycle f:fp-request-path
  HTTP
    Устройство | Anatomy :: web-http-anatomy p:http
    Методы и коды | Methods and status codes :: web-idempotent web-status g-web-3xx-statuses api-status-codes
    Версии HTTP | HTTP versions :: web-http-versions
    Кэширование | Caching :: x-web-etag-caching f:wbf-http-caching-etag
    Content negotiation :: g-web-content-negotiation api-content-negotiation
    Реальное время | Real time :: web-websocket-proto g-web-sse-vs-ws f:wbf-websocket-upgrade
  REST
    ~API и REST
    Проектирование | Design :: api-resources-verbs api-richardson-maturity web-rest-maturity g-web-put-vs-patch web-post-201 api-problem-json
    Пагинация | Pagination :: web-pagination api-pagination-cursor
    Совместимость | Compatibility :: web-versioning api-versioning api-backward-compat gp2-contract-compat
    Идемпотентность | Idempotency :: api-idempotency x-web-idempotency-key g-web-idempotency-key x-ds-idempotency-key f:wbf-idempotency-key f:idempotency-key
    Ограничение частоты | Rate limiting :: x-web-rate-limit-429 api-rate-limit-headers
    OpenAPI :: web-openapi
    Вебхуки | Webhooks :: web-webhook nweb-webhooks
  Другие протоколы | Other protocols
    Что когда брать | What to use when :: web-nonrest api-rest-rpc-grpc-graphql f:rest-soap-graphql-grpc
    gRPC
      Контракт и Protobuf | Contract and Protobuf :: grpc-codegen-idl grpc-proto-fields grpc-schema-evolution f:grpcf-field-numbers
      Вызовы и дедлайны | Calls and deadlines :: grpc-call-types grpc-deadlines-status f:grpcf-call-types f:grpcf-deadline-propagation p:prgrpc-bidi-stream
      HTTP/2 :: grpc-http2 f:grpcf-http2-mux
      gRPC или REST | gRPC or REST :: grpc-vs-rest web-grpc web-grpc-vs-rest
    GraphQL :: web-graphql-deep
    SOAP :: web-soap

Spring :: T:Spring
  DI и контейнер | DI and container
    ~Spring: зачем
    Инъекция | Injection :: sp-di-types sp-stereotypes x-sp-qualifier-primary p:di-wiring
    Скоупы | Scopes :: sp-scope g-sp-requestscope g-sp-lookup f:bean-scopes
    Жизненный цикл бина | Bean lifecycle :: x-sp-bean-lifecycle sp-bpp g-sp-postconstruct g-sp-factorybean f:di-lifecycle p:pr-bean-lifecycle
    Циклические зависимости | Circular dependencies :: sp-circular f:circular-dep
    @Configuration и @Value :: sp-cfgproxy g-sp-value-spel f:cglib-config
  AOP и прокси | AOP and proxies
    Как устроен прокси | How proxies work :: sp-proxytype sp-aopcommon f:jdk-vs-cglib f:aop-common
    Вызов через this | Self-invocation :: sp-self g-sp-async-self f:proxy-self
    Порядок аспектов | Aspect order :: sp-aspect-order
  Spring Boot
    ~Spring Boot
    Автоконфигурация | Auto-configuration :: sp-sba sp-autoconfig sp-autoconfig-imports g-sp-conditional f:autoconfig
    Настройки | Properties :: sp-propord sp-config-props
  Транзакции Spring | Spring transactions
    ~Транзакции Spring
    Откат | Rollback :: sp-rollback sp-tx-rollback-only f:tx-rollback f:fp-tx-rollback-only p:pr-rollback-only
    Propagation :: sp-prop sp-tx-nested-savepoint f:requires-new
    Как устроена | How it works :: sp-txconn sp-txprivate f:tx-threadlocal p:transactional-proxy
    readOnly :: sp-tx-readonly
    Долгие транзакции | Long transactions :: nspri-tx
  Spring в работе | Spring at work
    ~Spring в работе
    Web MVC :: sp-mapping-anno nspri-validation g-sp-controlleradvice p:request-flow
    События | Events :: g-sp-eventlistener
    Планировщик | Scheduler :: g-sp-scheduled
  Spring Security
    Цепочка фильтров | Filter chain :: sp-filterchain f:filter-chain p:pr-security-chain
    JWT и роли | JWT and roles :: sp-jwt kc-roles-to-authorities f:jwt-validate
    Контекст в @Async | Context in @Async :: nspri-security

Quarkus :: T:Quarkus
  Старт и DI | Startup and DI
    ~Quarkus
    Работа на сборке | Build-time work :: qk2-buildtime-di qk2-reflection-enemy f:qkf-build-time-di p:prq-buildtime-di
    CDI :: qk2-cdi-scopes qk2-client-proxy qk2-inject-vs-autowired f:qkf-client-proxy
    Расширения | Extensions :: qk2-extension
  Конфиг и Dev | Config and Dev
    Конфигурация | Configuration :: qk2-mpconfig-sources qk2-profiles qk2-buildtime-runtime f:qkf-config-ordering
    Dev mode :: qk2-devmode-livereload qk2-continuous-testing qk2-dev-services f:qkf-dev-live-reload
    Упаковка | Packaging :: qk2-packaging
  Native (GraalVM)
    JVM или native | JVM or native :: qk2-jvm-vs-native qk2-when-not-native qk2-aot-vs-jit p:prq-aot-native
    Closed world :: qk2-closed-world qk2-register-for-reflection f:qkf-native-closed-world
  Reactive и Mutiny | Reactive and Mutiny
    Uni и Multi :: qk2-uni-vs-multi qk2-backpressure-multi f:qkf-mutiny-uni-multi
    Event loop :: qk2-imperative-vs-reactive qk2-blocking-annotation qk2-virtual-threads f:qkf-event-loop-blocking p:prq-event-loop
    Kafka в Quarkus | Kafka in Quarkus :: qk2-reactive-messaging-kafka f:qkf-kafka-incoming-outgoing
  Данные | Data
    Panache :: qk2-panache-ar-vs-repo
    Транзакции и реактивность | Transactions and reactive :: qk2-hibernate-reactive-vs-blocking qk2-transactional-narayana
    Миграции | Migrations :: qk2-flyway-liquibase
  Cloud-native
    Отказоустойчивость | Fault tolerance :: qk2-fault-tolerance
    Health и метрики | Health and metrics :: qk2-health-probes qk2-micrometer-otel
    API и клиенты | API and clients :: qk2-openapi-swagger nquar-rest-client
    OIDC и Keycloak :: qk2-oidc-keycloak
  Тесты и выбор | Tests and choice
    @QuarkusTest :: nquar-testy
    Quarkus или Spring Boot | Quarkus or Spring Boot :: qk2-vs-springboot

Тесты и отладка | Testing and debugging :: T:Testing
  Основы тестирования | Testing basics
    ~Тестирование
    Пирамида | Pyramid :: te-pyramid f:tef-test-pyramid p:prt-test-pyramid-fill
    TDD :: te-tdd g-te-classicist-mockist f:tef-tdd-cycle
    Читаемые тесты | Readable tests :: craft-readable-test g-te-test-data-builder x-te-test-fixtures
    Качество тестов | Test quality
      Покрытие | Coverage :: g-te-line-vs-branch
      Мутационное тестирование | Mutation testing :: g-te-mutation ts-mut-why ts-mut-kill ts-mut-ci f:tef-mutation-testing
  JUnit и AssertJ | JUnit and AssertJ
    JUnit и Mockito | JUnit and Mockito :: te-junit-mockito
    Параметризация | Parameterized tests :: x-te-param-tests g-te-methodsource
    AssertJ :: g-te-assertj-fluent
  Mockito
    Дублёры | Test doubles :: te-mock-stub g-te-fake-vs-stub g-te-spy-vs-mock p:pr-test-doubles
    Настройка ответов | Stubbing :: g-te-doreturn-void g-te-strict-stubs g-te-mockstatic-smell
    Проверка вызовов | Verifying calls :: x-te-verify-behavior te-captor f:tef-verify-vs-assert p:prt-mock-intercept
    Что не мокать | What not to mock :: g-te-dont-mock-dont-own
  Интеграционные | Integration
    Testcontainers :: te-testcontainers ntest-testcontainers f:tef-testcontainers
    Тесты в Spring | Tests in Spring :: x-te-spring-slices g-te-mockbean-context ntest-integrationtx
    Контрактные | Contract tests :: g-te-pact-cdc
    Гексагон и время | Hexagon and time :: te-hexagon-test p-hex-inject-clock f:tef-clock-injection
  Надёжность тестов | Reliable tests
    Плавающие тесты | Flaky tests :: te-flaky g-te-test-isolation f:tef-test-pollution
    Асинхронность | Async code :: g-te-awaitility
    Характеризационные | Characterization :: p-characterization-test
  Нагрузочные | Load testing
    Что мерить | What to measure :: gp2-load-what-to-measure
    Типичные ошибки | Common mistakes :: gp2-load-mistakes
  Отладка | Debugging
    ~Отладка

Безопасность | Security :: T:Crypto B:Веб
  Защита приложения | Application security
    ~Безопасность
    OWASP Top-10 :: web-owasp-top10
    Доступ и SSRF | Access and SSRF :: web-idor web-ssrf
    Цепочка поставок | Supply chain :: web-supply-chain
    Секреты | Secrets :: web-secrets g-ops-ci-secrets
    Перебор паролей | Brute force :: web-rate-limit
  Браузер | Browser
    CORS :: x-web-cors-preflight web-cors f:wbf-cors-preflight p:pr-cors-preflight
    CSRF и cookie | CSRF and cookies :: g-web-csrf-token g-web-samesite
    Заголовки | Headers :: web-security-headers g-web-csp g-web-hsts
  Вход и токены | Login and tokens
    ~Keycloak и OAuth2
    Основы | Basics :: web-authn-authz web-auth-schemes g-web-session-vs-jwt-revocation
    OAuth2 :: web-oauth-tokens g-web-oauth-flows f:wbf-oauth-pkce p:oauth-flow
    OIDC и SAML :: web-oidc-keycloak web-saml-oidc
    Токены | Tokens
      Refresh :: g-web-refresh-token-rotation f:fp-refresh-rotation p:pr-refresh-rotation
      Где хранить | Where to store :: g-web-token-storage-cookie-vs-header
      Подпись JWT | JWT signature :: gap-jwt-alg-none crypto-jwt-sign
    Keycloak :: kc-realm-client-roles kc-public-confidential kc-token-types kc-audience-issuer
    mTLS :: web-mtls
  Криптография | Cryptography
    Симметричное шифрование | Symmetric encryption :: crypto-aes-modes crypto-at-rest-in-transit f:cryptof-aes-symmetric
    Хеши и HMAC | Hashes and HMAC :: crypto-hash-properties crypto-hmac ncryp-ataki-na-reali
    Пароли | Passwords :: crypto-password-hashing crypto-encrypt-vs-hash-passwords f:cryptof-hash-salt-password p:pr-password-salt
    Асимметрия | Asymmetric :: crypto-asymmetric crypto-dh-fs f:cryptof-asymmetric-keys
    Цифровая подпись | Digital signature :: crypto-signature f:cryptof-digital-signature p:prcrypto-digital-signature
    TLS и PKI
      Рукопожатие | Handshake :: crypto-tls-handshake web-tls f:cryptof-tls-handshake f:tls-handshake p:prcrypto-tls-handshake p:tls-handshake
      Сертификаты и HTTPS | Certificates and HTTPS :: crypto-pki-chain web-https-what f:cryptof-pki-cert-chain
    Ключи и случайность | Keys and randomness :: gap-kms-envelope-encryption ncryp-sluchaynost-i-

Очереди и события | Queues and events
  Основы очередей | Queue basics
    ~Очереди
    Зачем очередь | Why a queue :: ds-queue-vs-svc
    Очередь или лог | Queue or log :: mq-queue-vs-stream mq-rabbit-vs-kafka inf-rabbit-kafka f:rabbit-vs-kafka
    Модели доставки | Delivery models :: ap-p2p-vs-pubsub
    Несколько консьюмеров | Multiple consumers :: mq-competing-consumers ap-competing-consumers mq-ordering
  RabbitMQ и SQS
    RabbitMQ :: mq-exchanges mq-ack-prefetch
    Dead letter :: mq-dlx f:dead-letter
    SQS :: mq-sqs
  Kafka
    ~Kafka
    Как идёт сообщение | Message path :: f:fp-kafka-path p:kafka-flow
    Продюсер | Producer
      acks :: ds-acks f:acks
      Ключ и партиции | Key and partitions :: ds-partkey ndist-kafka--partiti f:kpart
      Идемпотентность | Idempotence :: g-ds-idempotent-producer p-kafka-inflight-order
      Транзакции | Transactions :: gap-ds-kafka-transactional-producer
    Брокер | Broker
      ISR :: p-kafka-minisr
      Log compaction :: g-ds-compaction p-edm-compaction f:log-compaction
    Консьюмер | Consumer
      Группы | Groups :: ds-consumer-groups x-inf-kafka-consumer-group gap-ds-group-coordinator-offsets f:inf2f-kafka-consumer-group p:consumer-group
      Ребаланс | Rebalance
        Что происходит | What happens :: ds-rebalance x-ds-rebalance f:rebalance
        Как смягчить | How to soften it :: g-ds-cooperative g-ds-static
        max.poll :: g-ds-maxpoll
      Offset
        Коммит | Commit :: p-kafka-autocommit-loses p-kafka-ack-after-dbwrite f:consumer-offset
        Откуда читать | Where to start reading :: gap-ds-auto-offset-reset
        Лаг | Lag :: x-ds-consumer-lag
    Сбои обработки | Processing failures
      Идемпотентный консьюмер | Idempotent consumer :: ds-idempotent p-idempotent-sametx g-arch-idempotent-consumer f:idempotent-receiver
      Exactly-once :: ds-eos p-kafka-eos-side-effects f:exactly-once
      Ядовитые сообщения | Poison messages :: p-kafka-poison-hol g-ds-retry-topics
    Kafka Streams :: gap-ds-kafka-streams-ktable f:fp-kstream-ktable
  Надёжная отправка | Reliable publishing
    ~События и интеграция
    Outbox :: ds-outbox p-outbox-relay-race f:outbox f:apf-outbox p:outbox
    CDC :: p-outbox-polling-vs-cdc g-arch-outbox-vs-cdc
  Событийный дизайн | Event-driven design
    Какое событие слать | Which event to send :: p-edm-notification ap-event-carried-state arch-event-driven
    Схемы событий | Event schemas :: p-edm-schema p-kafka-schema-compat
    Время события | Event time :: p-stream-event-vs-proc-time
    Event Sourcing :: arch-event-sourcing f:apf-event-sourcing

Распределённые системы | Distributed systems :: T:Distributed
  Теория | Theory
    CAP :: ds-cap sd-cap-theorem f:cap
    Согласованность | Consistency :: arch-consistency-models f:eventual-consistency
    Кворум | Quorum :: g-ds-quorum p:pr-quorum
    Время и порядок | Time and order :: gap-ds-clock-skew-ordering g-ds-vector-clock
    Консенсус | Consensus :: arch-consensus di-leader-raft di-split-brain-fencing
    Gossip :: g-ds-gossip
    Распределённая блокировка | Distributed lock :: arch-distributed-lock
  Транзакции между сервисами | Transactions across services
    2PC :: g-ds-2pc arch-2pc-vs-saga
    Саги | Sagas
      Зачем сага | Why a saga :: x-ds-saga p:pr-saga
      Компенсация | Compensation :: p-saga-compensation f:apf-saga-orch
      Оркестрация и хореография | Orchestration and choreography :: arch-saga-orch-choreo ap-saga-orchestration-vs-choreography
      8 саг = 3 оси | 8 sagas = 3 axes :: p-saga-three-axes
    Camunda и Zeebe :: ws-camunda ws-zeebe ws-bpmn ws-job-worker
  Отказоустойчивость | Resilience
    ~Отказоустойчивость
    Порядок защит | Order of defences :: ap-resilience-stack
    Таймауты и ретраи | Timeouts and retries
      Медленный ответ | Slow responses :: p-stab-slow-vs-fail
      Лавина ретраев | Retry storms :: ndist-retry--amplifi ap-retry-budget
    Circuit Breaker :: p-cb-timeout p-cb-halfopen f:apf-circuit-breaker p:circuit-breaker
    Bulkhead :: ap-bulkhead f:apf-bulkhead
    Перегрузка | Overload
      Backpressure :: p-stab-backpressure-bounded
      Сброс нагрузки | Load shedding :: ap-load-shedding
      Деградация | Degradation :: ap-failfast-vs-degrade
    Chaos engineering :: gp2-chaos
  Масштабирование | Scaling
    Балансировка | Load balancing :: arch-load-balancing x-ops-horizontal-scaling-lb g-inf-nginx-upstream-lb f:inf2f-nginx-sticky-session p:load-balancer p:pri-load-balancer-rr
    Автомасштабирование | Autoscaling :: inf-autoscale-mechanics inf-autoscale-coldstart
    Rate limiting :: arch-rate-limiting f:apf-token-bucket

Архитектура | Architecture :: T:Архитектура T:System_Design
  Стили | Styles
    ~Архитектура
    Монолит и микросервисы | Monolith and microservices :: arch-mono-micro devops-soa-msa f:soa-msa
    Слои и гексагон | Layers and hexagon
      Порты и адаптеры | Ports and adapters :: arch-layered-hex p-hex-api-vs-spi p:pr-hexagon
      Модель отдельно от JPA | Model apart from JPA :: p-domain-vs-jpa-entity p-hex-domain-vs-jpa
      Контроль границ | Enforcing boundaries :: narhi-granicy-i-kont
    12-factor :: arch-12factor
  Микросервисы | Microservices
    Границы и данные | Boundaries and data :: arch-db-per-service p-architecture-quantum g-arch-multitenancy
    Вход в систему | Entry point :: arch-api-gateway arch-bff p:api-gateway
    Обнаружение сервисов | Service discovery :: arch-service-discovery ap-service-discovery
    Mesh и sidecar | Mesh and sidecar :: arch-service-mesh ap-sidecar-ambassador-adapter ap-ambassador
    Склейка данных | Combining data
      API Composition :: p-api-composition-latency p-api-composition-vs-cqrs
      Scatter-Gather :: ap-scatter-gather f:apf-scatter-gather
      Claim Check :: ap-claim-check
    Замена легаси | Replacing legacy :: g-arch-strangler p-strangler-cutover f:apf-strangler
  DDD
    Bounded Context :: g-arch-bounded-context
    Aggregate :: g-arch-aggregate p-ddd-one-agg-per-tx p-ddd-ref-by-id f:dsf-aggregate-by-id
    Value Object :: g-arch-value-object g-de-value-object
    Domain Event :: g-arch-domain-event
    Сервисы домена | Domain services :: p-ddd-domain-vs-app-service
    Anti-Corruption Layer :: g-arch-acl p-acl-not-just-mapper
  CQRS
    Модель для чтения | Read model :: g-arch-cqrs-readmodel f:apf-cqrs
    Устаревшие данные | Stale reads :: p-cqrs-staleness
  System Design
    Подход к задаче | How to approach it :: sd-interview-flow de-sysdesign-framework
    Оценка на коленке | Back-of-envelope
      Нагрузка | Load :: sd-back-of-envelope sd-qps-readwrite de-estimate-qps f:sdf-capacity-estimation
      Задержка | Latency :: de-estimate-latency sd-latency-budget
      Доступность | Availability :: sd-availability-nines
    Кейсы | Cases
      Запросы и лимиты | Requests and limits
        Rate limiter :: sd-rate-limiter f:sdf-rate-limiter-token-bucket p:prsd-token-bucket
        Сокращатель ссылок | URL shortener :: sd-url-shortener-id sd-url-shortener-redirect f:sdf-url-shortener
        Автодополнение | Autocomplete :: sd-autocomplete-search
      Доставка | Delivery
        Лента новостей | News feed :: sd-feed-fanout f:sdf-feed-fanout p:prsd-fanout-feed
        Нотификации | Notifications :: sd-notifications
        Мессенджер | Messenger :: sd-chat-delivery sd-chat-presence
      Данные | Data
        Платёжный леджер | Payment ledger :: sd-payment-ledger f:sdf-payment-ledger-double-entry
        Счётчик и лидерборд | Counter and leaderboard :: sd-counter-leaderboard
        Загрузка файлов | File upload :: sd-object-storage-upload
        Распределённый кэш | Distributed cache :: sd-distributed-cache
        Хранилище метрик | Metrics storage :: sd-metrics-tsdb-scale
    Миграция без простоя | Zero-downtime migration :: nsyst-ekspluataciya
  Оценка и решения | Estimates and decisions
    ~Оценка и решения

Контейнеры | Containers :: T:Infra B:Инфраструктура
  Docker
    ~Docker
    Образ и контейнер | Image and container :: inf-docker x-inf-container-vs-vm x-ops-container-vs-vm f:docker-image-container f:dof-container-vs-vm
    Слои и кэш | Layers and cache :: g-ops-docker-layer-cache g-inf-docker-layer-cache-order f:inf2f-docker-layer-cache f:dof-docker-layer-cache p:pr-docker-layers
    Теги образов | Image tags :: g-ops-latest-tag
  Kubernetes
    ~Kubernetes
    Объекты | Objects :: x-ops-k8s-basics inf-k8s-pod g-inf-k8s-configmap-no-reload f:k8s-pod f:dof-k8s-pod-deploy-svc
    Пробы | Probes :: inf-k8s-probes p-k8s-liveness-cheap f:k8s-probes p:pr-probes
    Ресурсы | Resources
      Requests и limits :: p-k8s-cpu-mem-qos
      OOMKilled :: gap-oom-oomkilled-vs-javaoom ninfr-k8s--limits--j
      HPA :: g-inf-k8s-hpa-needs-requests f:inf2f-hpa-autoscale
    Выкат в кластер | Rollout :: f:fp-deploy-k8s p:prv-rolling-update
    Остановка пода | Pod shutdown :: p-k8s-sigterm-drain ninfr-k8s--graceful- f:dof-graceful-shutdown

Облако и выкатка | Cloud and delivery :: T:DevOps
  Облако | Cloud
    ~Облако
    Serverless :: devops-serverless f:serverless
    Terraform :: g-ops-terraform-state
  AWS
    ~AWS
  CI/CD
    ~Выкатка
    Пайплайн | Pipeline :: devops-cicd devops-protected ndevo-ci-cd f:cicd-pipeline p:prv-cicd-pipeline
    Стратегии выката | Deployment strategies :: devops-deploy f:deploy-strategies
    Feature flags :: gp2-feature-flags g-ops-feature-flag-debt
    Откат и миграции | Rollback and migrations :: g-ops-rollback-migration

Наблюдаемость | Observability
  Логи и трейсы | Logs and traces
    ~Наблюдаемость
    Три столпа | Three pillars :: x-ops-observability-pillars
    Логи | Logs :: g-ops-structured-logs gp2-log-levels gp2-log-mdc
    Трейсы | Traces :: ops-correlation-id p-trace-propagation-islands
  Метрики | Metrics
    ~Prometheus и Grafana
    Prometheus :: g-ops-prometheus-pull ops-recording-alerting-rules f:dof-prometheus-pull
    Кардинальность | Cardinality :: p-obs-cardinality-labels p-obs-metric-cardinality ninfr-metrics--cardi
    Что мерить | What to measure :: ops-red-use-golden ops-three-pillars
  SLO
    Бюджет ошибок | Error budget :: p-obs-burn-rate

AI в разработке | AI in development :: T:AI
  Нейрон и обучение | Neuron and training
    ~AI: нейрон и обучение
  Слова в числа | Words into numbers
    ~AI: слова в числа
    Токены и эмбеддинги | Tokens and embeddings :: ai-tokens-cost ai-embedding
  Трансформер | Transformer
    ~AI: трансформер
    Внимание | Attention :: ai-attention
  Языковая модель | Language model
    ~AI: языковая модель
    Как отвечает | How it answers :: ai-next-token ai-training-stages
    Настройка ответа | Tuning the output :: ai-temperature ai-structured-output
    Контекст и галлюцинации | Context and hallucinations :: ai-context-window ai-hallucination
  RAG и агенты | RAG and agents
    ~AI: RAG и агенты
    RAG
      Когда нужен | When you need it :: ai-rag-vs-finetune ai-vector-db
      Качество поиска | Search quality :: ai-chunking ai-hybrid-search
    Агенты | Agents :: ai-tool-calling ai-mcp ai-agent-limits
  AI в проде на Java | AI in production on Java
    ~AI: в проде на Java
    Безопасность | Security :: ai-prompt-injection ai-pii
    Надёжность и цена | Reliability and cost :: ai-streaming ai-cost-control ai-resilience
    Качество | Quality :: ai-evals
    Библиотеки | Libraries :: ai-java-libs
    Где не нужен | Where it isn't needed :: ai-when-not

Собеседование | Interview
  Как устроен собес | How interviews work
    ~Как устроен собес
  Ответы на собесе | Answering questions
    ~На собесе
  Поведенческий | Behavioral :: m:beh
  Резюме и оффер | Resume and offer
    ~Резюме и оффер
  Английский | English :: m:eng
  Практика | Practice
    Mock-интервью | Mock interview :: g:mMock
    Что напечатает? | What does it print? :: g:mWp
    Найди баг | Find the bug :: g:mBugs
    Код-ревью | Code review :: g:mRev
    Диагностика | Diagnostics :: g:mDiag
    Проектирование систем | System design :: g:mDesign
    Песочница | Sandbox :: m:sand
    3D-мир | 3D world :: m:viz

Бонус | Bonus
  Деньги | Money :: m:money
  Музыка | Music :: m:mus
`;

/* Откуда знание. Канон выверен отдельным прогоном, привязка — по паре тема/подтема
   с откатом на тему целиком (ключ «* / Тема»). Пустая привязка означает «в каноне
   такого нет» (Git, Maven, Gradle, криптография, виртуальные потоки) и намеренно
   не подменяется книгой всей темы. */
window.BOOKS={
 "books": [
  {
   "id": "effective-java",
   "title": "Effective Java",
   "author": "Joshua Bloch",
   "about": "Как писать Java, к которой не будет претензий: equals/hashCode, неизменяемость, дженерики, билдеры. Третье издание учитывает лямбды и стримы.",
   "level": "середина",
   "must": true
  },
  {
   "id": "jcip",
   "title": "Java Concurrency in Practice",
   "author": "Brian Goetz",
   "about": "Модель памяти Java: happens-before, volatile, безопасная публикация объектов, пулы потоков. Написана до Java 8, но фундамент с тех пор не изменился.",
   "level": "продвинутым",
   "must": true
  },
  {
   "id": "modern-java-in-action",
   "title": "Modern Java in Action",
   "author": "Raoul-Gabriel Urma, Mario Fusco, Alan Mycroft",
   "about": "Стримы, лямбды, Optional, CompletableFuture — не как синтаксис, а где они помогают и где проигрывают по производительности.",
   "level": "середина",
   "must": false
  },
  {
   "id": "java-performance",
   "title": "Java Performance",
   "author": "Scott Oaks",
   "about": "Что в JVM имеет смысл настраивать: GC, heap, JIT, — чтобы перестать подбирать флаги наугад. Учтите, что есть одноимённая книга другого автора (Charlie Hunt), это разные тексты.",
   "level": "продвинутым",
   "must": false
  },
  {
   "id": "optimizing-java",
   "title": "Optimizing Java",
   "author": "Benjamin J. Evans, James Gough, Chris Newland",
   "about": "Методика измерения вместо догадок: JMH, ловушки микробенчмарков, что JIT реально делает с кодом.",
   "level": "продвинутым",
   "must": false
  },
  {
   "id": "ddia",
   "title": "Designing Data-Intensive Applications",
   "author": "Martin Kleppmann",
   "about": "Репликация, консенсус, уровни изоляции, стриминг — с разбором компромиссов и ограничений каждого подхода. Один из основных источников для системного дизайна.",
   "level": "середина",
   "must": true
  },
  {
   "id": "sql-performance-explained",
   "title": "SQL Performance Explained",
   "author": "Markus Winand",
   "about": "Почему индекс не сработал: порядок колонок в композитном индексе, LIKE, JOIN, пагинация. Тонкая, читается за вечер. Тот же материал частично доступен на сайте автора use-the-index-luke.",
   "level": "середина",
   "must": false
  },
  {
   "id": "database-internals",
   "title": "Database Internals",
   "author": "Alex Petrov",
   "about": "Что внутри БД: B-tree против LSM, WAL, буферный пул, распределённые транзакции. Вторая половина книги — про распределённые системы, она заметно тяжелее первой.",
   "level": "продвинутым",
   "must": false
  },
  {
   "id": "postgres-internals",
   "title": "PostgreSQL 14 изнутри",
   "author": "Егор Рогов",
   "about": "MVCC, vacuum, блокировки и планировщик Postgres, на русском. Выходят издания под новые версии — берите то, что ближе к вашей.",
   "level": "продвинутым",
   "must": false
  },
  {
   "id": "kafka-definitive-guide",
   "title": "Kafka: The Definitive Guide",
   "author": "Neha Narkhede, Gwen Shapira, Todd Palino",
   "about": "Партиции, оффсеты, consumer-группы, семантика доставки. Есть более новое издание — первое местами отстаёт от текущих версий Kafka.",
   "level": "середина",
   "must": false
  },
  {
   "id": "ddd-evans",
   "title": "Domain-Driven Design: Tackling Complexity in the Heart of Software",
   "author": "Eric Evans",
   "about": "Откуда взялись Bounded Context, агрегаты и единый язык. Читается тяжело и многословно, но словарь архитектурных разговоров — отсюда.",
   "level": "продвинутым",
   "must": true
  },
  {
   "id": "iddd",
   "title": "Implementing Domain-Driven Design",
   "author": "Vaughn Vernon",
   "about": "Практическое продолжение Эванса: как резать агрегаты, где проходят границы транзакций, как выглядят доменные события в коде.",
   "level": "продвинутым",
   "must": false
  },
  {
   "id": "clean-architecture",
   "title": "Clean Architecture",
   "author": "Robert C. Martin",
   "about": "Короткое обоснование правила зависимостей и портов/адаптеров — то, что можно внятно пересказать на вопрос «зачем вам гексагон». Много повторов и мало конкретики по реализации.",
   "level": "середина",
   "must": false
  },
  {
   "id": "gof",
   "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
   "author": "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
   "about": "Словарь, на котором интервьюер задаёт вопросы. Читать выборочно; часть паттернов — обходы ограничений языков без лямбд и функций первого класса.",
   "level": "середина",
   "must": false
  },
  {
   "id": "refactoring",
   "title": "Refactoring: Improving the Design of Existing Code",
   "author": "Martin Fowler",
   "about": "Каталог безопасных преобразований: как разбирать God Class маленькими шагами вместо переписывания с нуля. Первое издание — с примерами на Java, второе — на JavaScript.",
   "level": "середина",
   "must": false
  },
  {
   "id": "legacy-code",
   "title": "Working Effectively with Legacy Code",
   "author": "Michael Feathers",
   "about": "Как протестировать то, что не тестируется: швы, характеризующие тесты, разрыв зависимостей. Примеры на C++/Java местами устарели, техники — нет.",
   "level": "середина",
   "must": false
  },
  {
   "id": "clean-code",
   "title": "Clean Code",
   "author": "Robert C. Martin",
   "about": "База про именование, размер функций и границы. Читать критически: часть советов спорна, а примеры кода местами вредны.",
   "level": "новичку",
   "must": false
  },
  {
   "id": "pragmatic-programmer",
   "title": "The Pragmatic Programmer",
   "author": "Andrew Hunt, David Thomas",
   "about": "Про инженерные привычки и ответственность за результат. Есть юбилейное издание с обновлёнными примерами.",
   "level": "новичку",
   "must": false
  },
  {
   "id": "building-microservices",
   "title": "Building Microservices",
   "author": "Sam Newman",
   "about": "Когда микросервисы оправданы и когда нет: границы, контракты и их версионирование, независимый деплой, проблемы с распределёнными данными. Есть второе издание, оно заметно переработано.",
   "level": "середина",
   "must": true
  },
  {
   "id": "microservices-patterns",
   "title": "Microservices Patterns",
   "author": "Chris Richardson",
   "about": "Saga, transactional outbox, API composition, CQRS на конкретных Java-примерах. Прикладнее Ньюмана, если надо не рассуждать, а сделать.",
   "level": "середина",
   "must": false
  },
  {
   "id": "release-it",
   "title": "Release It!",
   "author": "Michael Nygard",
   "about": "Таймауты, circuit breaker, bulkhead и разборы реальных отказов в проде. Базовый набор понятий про отказоустойчивость. Второе издание дополнено облаком и CI/CD.",
   "level": "середина",
   "must": true
  },
  {
   "id": "sre",
   "title": "Site Reliability Engineering",
   "author": "Betsy Beyer, Chris Jones, Jennifer Petoff, Niall Richard Murphy",
   "about": "SLO, error budget, дежурства, безобвинительные постмортемы. Сборник статей Google: часть практик рассчитана на их масштаб и в небольшой компании неприменима.",
   "level": "середина",
   "must": false
  },
  {
   "id": "kubernetes-patterns",
   "title": "Kubernetes Patterns",
   "author": "Bilgin Ibryam, Roland Huß",
   "about": "Probes, лимиты и реквесты, sidecar, init-контейнеры — минимум, который бэкендер должен понимать про жизнь своего пода.",
   "level": "середина",
   "must": false
  },
  {
   "id": "unit-testing-khorikov",
   "title": "Unit Testing Principles, Practices, and Patterns",
   "author": "Vladimir Khorikov",
   "about": "Лондонская и классическая школы, когда мок оправдан, почему тесты становятся хрупкими. Примеры на C#, идеи переносятся на Java без потерь.",
   "level": "середина",
   "must": false
  },
  {
   "id": "goos",
   "title": "Growing Object-Oriented Software, Guided by Tests",
   "author": "Steve Freeman, Nat Pryce",
   "about": "TDD как инструмент проектирования: тесты давят на дизайн и вытаскивают плохие зависимости наружу. Сильный уклон в мок-ориентированный стиль — это позиция авторов, а не единственный вариант.",
   "level": "продвинутым",
   "must": false
  },
  {
   "id": "algorithms-sedgewick",
   "title": "Algorithms",
   "author": "Robert Sedgewick, Kevin Wayne",
   "about": "Структуры данных и алгоритмы с работающими реализациями на Java. Не про решение задач на скорость — про то, как всё устроено внутри.",
   "level": "новичку",
   "must": false
  },
  {
   "id": "spring-in-action",
   "title": "Spring in Action",
   "author": "Craig Walls",
   "about": "Основная книга по Spring и Spring Boot: внедрение зависимостей, веб-слой, данные, безопасность. Издания привязаны к версиям — бери свежее.",
   "level": "середина",
   "must": false
  },
  {
   "id": "pro-git",
   "title": "Pro Git",
   "author": "Scott Chacon, Ben Straub",
   "about": "Официальная книга проекта, бесплатная. Git не как набор команд, а как модель: объекты, ссылки, снимки вместо диффов, reflog. Главы 7 и 10 — то, ради чего её и открывают.",
   "level": "с нуля",
   "must": true
  },
  {
   "id": "philosophy-sd",
   "title": "A Philosophy of Software Design",
   "author": "John Ousterhout",
   "about": "Сложность как то, что копится по чуть-чуть. Глубокие модули против тонких обёрток, утечка информации, «ошибки, которых не существует». Тонкая, читается за вечер.",
   "level": "середина",
   "must": true
  },
  {
   "id": "serious-crypto",
   "title": "Serious Cryptography",
   "author": "Jean-Philippe Aumasson",
   "about": "Криптография для тех, кто её применяет, а не изобретает: режимы шифрования, хеши, ключи, TLS и PKI. Математики ровно столько, чтобы понимать, почему так нельзя.",
   "level": "середина",
   "must": false
  },
  {
   "id": "sql-antipatterns",
   "title": "SQL Antipatterns",
   "author": "Bill Karwin",
   "about": "Схема БД через типовые ошибки: EAV, деревья в SQL, суррогатные ключи, NULL, «ещё одна колонка вместо таблицы». Каждая глава — как выглядит беда и чем лечится.",
   "level": "середина",
   "must": false
  }
 ],
 "map": {
  "Algorithms / Cycle Detection": {
   "book": "algorithms-sedgewick",
   "why": "поиск циклов в орграфе, DFS"
  },
  "Algorithms / Selection": {
   "book": "algorithms-sedgewick",
   "why": "quickselect на разбиении быстрой сортировки"
  },
  "Algorithms / binary-search": {
   "book": "algorithms-sedgewick",
   "why": "бинарный поиск, инвариант и границы"
  },
  "Algorithms / bit-tricks": {
   "book": "",
   "why": "битовые трюки — Hacker's Delight, вне канона"
  },
  "Algorithms / complexity": {
   "book": "algorithms-sedgewick",
   "why": "порядок роста и анализ времени"
  },
  "Algorithms / graph": {
   "book": "algorithms-sedgewick",
   "why": "кратчайшие пути, Дейкстра, отрицательные веса"
  },
  "Algorithms / graphs": {
   "book": "algorithms-sedgewick",
   "why": "обход в ширину и глубину"
  },
  "Algorithms / hashing": {
   "book": "algorithms-sedgewick",
   "why": "линейное пробирование против раздельных цепочек"
  },
  "Algorithms / heap": {
   "book": "algorithms-sedgewick",
   "why": "приоритетные очереди и пирамидальная сортировка"
  },
  "Algorithms / lru-cache": {
   "book": "",
   "why": "LinkedHashMap/removeEldestEntry — в EJ лишь упоминание"
  },
  "Algorithms / structures": {
   "book": "algorithms-sedgewick",
   "why": "BST, сбалансированные деревья, символьные таблицы"
  },
  "Algorithms / techniques": {
   "book": "algorithms-sedgewick",
   "why": "приёмы разработки и анализа алгоритмов"
  },
  "Algorithms / trie": {
   "book": "algorithms-sedgewick",
   "why": "tries и TST для строк"
  },
  "Algorithms / union-find": {
   "book": "algorithms-sedgewick",
   "why": "динамическая связность, ранги, сжатие путей"
  },
  "Algorithms / Вероятностные и спец": {
   "book": "database-internals",
   "why": "фильтры Блума и скип-листы"
  },
  "Algorithms / Деревья и поиск": {
   "book": "algorithms-sedgewick",
   "why": "префиксные деревья против хеш-таблиц"
  },
  "Build / Annotation processing": {
   "book": "",
   "why": "javac annotation processing каноном не покрыт"
  },
  "Build / Gradle и зависимости": {
   "book": "",
   "why": "Gradle и разрешение конфликтов версий вне канона"
  },
  "Build / Maven": {
   "book": "",
   "why": "Ни одна книга канона не разбирает Maven"
  },
  "Concurrency / ABA / CAS": {
   "book": "jcip",
   "why": "CAS, атомарные переменные, проблема ABA"
  },
  "Concurrency / BlockingQueue": {
   "book": "jcip",
   "why": "производитель-потребитель, ограниченные очереди, блокировка"
  },
  "Concurrency / CompletableFuture": {
   "book": "modern-java-in-action",
   "why": "композиция future и обработка ошибок"
  },
  "Concurrency / Condition / Lock": {
   "book": "jcip",
   "why": "явные локи и условные очереди"
  },
  "Concurrency / ForkJoinPool": {
   "book": "modern-java-in-action",
   "why": "fork/join и work-stealing"
  },
  "Concurrency / Liveness": {
   "book": "jcip",
   "why": "дедлок, голодание, ливлок и профилактика"
  },
  "Concurrency / Phaser": {
   "book": "jcip",
   "why": "защёлки и барьеры как синхронизаторы"
  },
  "Concurrency / StampedLock": {
   "book": "jcip",
   "why": "ReadWriteLock и цена блокировки чтений"
  },
  "Concurrency / Structured Concurrency & ScopedValue": {
   "book": "",
   "why": "StructuredTaskScope Java 21; в JCiP лишь ручная отмена"
  },
  "Concurrency / ThreadLocalRandom": {
   "book": "jcip",
   "why": "общий Random не масштабируется, ThreadLocal"
  },
  "Concurrency / atomicity": {
   "book": "jcip",
   "why": "атомарность составных read-modify-write операций"
  },
  "Concurrency / basics": {
   "book": "jcip",
   "why": "гонки и разделяемое изменяемое состояние"
  },
  "Concurrency / cancellation": {
   "book": "jcip",
   "why": "прерывание, политика отмены, корректное завершение"
  },
  "Concurrency / collections": {
   "book": "jcip",
   "why": "потокобезопасные коллекции против обычного HashMap"
  },
  "Concurrency / executor": {
   "book": "jcip",
   "why": "Executor: задачи отделены от потоков"
  },
  "Concurrency / locks": {
   "book": "jcip",
   "why": "tryLock, прерываемость, справедливость явных локов"
  },
  "Concurrency / memory": {
   "book": "jcip",
   "why": "модель памяти, happens-before, видимость, публикация"
  },
  "Concurrency / monitor": {
   "book": "jcip",
   "why": "wait/notify, предикат условия, ложные пробуждения"
  },
  "Concurrency / thread-pool": {
   "book": "jcip",
   "why": "размер пула, очередь, политика насыщения"
  },
  "Concurrency / vthreads": {
   "book": "",
   "why": "vthreads/pinning новее канона; JCiP — про платформенные"
  },
  "Concurrency / wait/sleep": {
   "book": "jcip",
   "why": "sleep держит лок, wait отпускает"
  },
  "Crypto / Асимметрия и PKI": {
   "book": "serious-crypto",
   "why": "гл. 10-13: RSA, DH, подписи, сертификаты, TLS"
  },
  "Crypto / Симметрия и хеши": {
   "book": "serious-crypto",
   "why": "гл. 4 AES/режимы, 8 GCM и nonce, 6 хеши/коллизии"
  },
  "Crypto / Хранение и ротация ключей": {
   "book": "",
   "why": "конвертное шифрование KEK/DEK — только доки KMS"
  },
  "DB / CREATE INDEX CONCURRENTLY": {
   "book": "postgres-internals",
   "why": "построение индексов и блокировки Postgres"
  },
  "DB / Composite index: = первым, range последним": {
   "book": "sql-performance-explained",
   "why": "порядок колонок в составном индексе"
  },
  "DB / FOR UPDATE SKIP LOCKED": {
   "book": "postgres-internals",
   "why": "блокировки строк, очередь в таблице"
  },
  "DB / HOT / fillfactor": {
   "book": "postgres-internals",
   "why": "версии строк, HOT-обновления, fillfactor"
  },
  "DB / NULL в NOT IN": {
   "book": "sql-antipatterns",
   "why": "Гл. Fear of the Unknown: NULL, NOT IN, 3-знач. логика"
  },
  "DB / PgBouncer transaction mode": {
   "book": "",
   "why": "PgBouncer и режимы пулинга: нет ни у Рогова, ни в каноне"
  },
  "DB / SERIALIZABLE · retry": {
   "book": "ddia",
   "why": "сериализуемость, откаты и повтор транзакций"
  },
  "DB / Unindexed FK / DELETE stall": {
   "book": "sql-performance-explained",
   "why": "индексы на внешние ключи"
  },
  "DB / access": {
   "book": "java-performance",
   "why": "Гл. 11: JDBC-драйверы, пул соединений, ResultSet"
  },
  "DB / antipattern": {
   "book": "sql-performance-explained",
   "why": "SELECT *, offset-пагинация, построчные запросы"
  },
  "DB / explain/buffers": {
   "book": "postgres-internals",
   "why": "планировщик, статистика, буферный кэш"
  },
  "DB / fk/cascade": {
   "book": "sql-performance-explained",
   "why": "Гл. 8 Delete: индекс на FK; про локи там ничего"
  },
  "DB / index": {
   "book": "sql-performance-explained",
   "why": "левый префикс составного индекса"
  },
  "DB / index/brin": {
   "book": "postgres-internals",
   "why": "типы индексов Postgres, включая BRIN"
  },
  "DB / index/clustered": {
   "book": "database-internals",
   "why": "index-organized против heap-organized таблиц"
  },
  "DB / index/expression": {
   "book": "sql-performance-explained",
   "why": "индексы по функциям и выражениям"
  },
  "DB / index/jsonb": {
   "book": "postgres-internals",
   "why": "GIN-индексы и поиск по jsonb"
  },
  "DB / index/partial": {
   "book": "sql-performance-explained",
   "why": "частичные индексы под узкую выборку"
  },
  "DB / lost update · read-modify-write": {
   "book": "ddia",
   "why": "потерянное обновление, атомарные операции, CAS"
  },
  "DB / normalization": {
   "book": "sql-antipatterns",
   "why": "Прил. A Rules of Normalization: 1NF–3NF; денорм. нет"
  },
  "DB / pool/sizing": {
   "book": "release-it",
   "why": "пулы ресурсов, заблокированные потоки, таймауты"
  },
  "DB / postgres": {
   "book": "postgres-internals",
   "why": "MVCC, снимки, vacuum, раздувание"
  },
  "DB / prepared/plancache": {
   "book": "postgres-internals",
   "why": "кэш планов, generic против custom"
  },
  "DB / snapshot isolation · ловушка имени": {
   "book": "ddia",
   "why": "snapshot isolation, write skew, фантомы"
  },
  "DB / sql/cte": {
   "book": "sql-antipatterns",
   "why": "Гл. Naive Trees: parent_id, WITH RECURSIVE, closure"
  },
  "DB / sql/window": {
   "book": "",
   "why": "окна: у Winand лишь ради пагинации, семантики нет"
  },
  "DB / time-series": {
   "book": "ddia",
   "why": "колоночное хранение и сжатие"
  },
  "DB / tx": {
   "book": "ddia",
   "why": "уровни изоляции и их аномалии"
  },
  "DB / tx/locks": {
   "book": "postgres-internals",
   "why": "режимы блокировок и взаимоблокировки"
  },
  "DB / конкурентный relay": {
   "book": "microservices-patterns",
   "why": "transactional outbox и polling publisher"
  },
  "Design / ACL ≠ DTO-маппер": {
   "book": "ddd-evans",
   "why": "anti-corruption layer в карте контекстов"
  },
  "Design / DDD · Aggregate": {
   "book": "iddd",
   "why": "правила нарезки агрегатов, границы транзакции"
  },
  "Design / DDD · Services": {
   "book": "iddd",
   "why": "доменные сервисы против прикладного слоя"
  },
  "Design / Deep vs Shallow модуль": {
   "book": "philosophy-sd",
   "why": "гл. 4 «Modules Should Be Deep», классит"
  },
  "Design / Define errors out of existence": {
   "book": "philosophy-sd",
   "why": "гл. 10 «Define Errors Out Of Existence» целиком"
  },
  "Design / Hexagon · Ports": {
   "book": "clean-architecture",
   "why": "правило зависимостей, порты и адаптеры"
  },
  "Design / Info leakage / temporal decomposition": {
   "book": "philosophy-sd",
   "why": "гл. 5: leakage и temporal decomposition"
  },
  "Design / adapter-facade": {
   "book": "gof",
   "why": "Adapter и Facade: разные намерения"
  },
  "Design / anemic-model": {
   "book": "iddd",
   "why": "поведение в сущностях, анемичная модель"
  },
  "Design / cohesion-coupling": {
   "book": "clean-architecture",
   "why": "принципы связности и зацепления компонентов"
  },
  "Design / command": {
   "book": "gof",
   "why": "Command: вызов как объект"
  },
  "Design / composite": {
   "book": "gof",
   "why": "Composite: лист и узел единообразно"
  },
  "Design / composition→CQRS": {
   "book": "microservices-patterns",
   "why": "API composition против CQRS-проекций"
  },
  "Design / dip-example": {
   "book": "clean-architecture",
   "why": "правило зависимостей, инверсия через порты"
  },
  "Design / legacy = no tests": {
   "book": "legacy-code",
   "why": "легаси — это код без тестов"
  },
  "Design / oop": {
   "book": "effective-java",
   "why": "композиция вместо наследования, хрупкость подклассов"
  },
  "Design / patterns": {
   "book": "gof",
   "why": "Strategy: семейство взаимозаменяемых алгоритмов"
  },
  "Design / proxy": {
   "book": "gof",
   "why": "заместитель объекта, контроль доступа"
  },
  "Design / seam": {
   "book": "legacy-code",
   "why": "швы и точки подмены поведения"
  },
  "Design / solid": {
   "book": "clean-architecture",
   "why": "SOLID и границы ответственности модулей"
  },
  "Design / sprout & wrap": {
   "book": "legacy-code",
   "why": "sprout и wrap method вокруг непокрытого"
  },
  "Design / state": {
   "book": "gof",
   "why": "State: поведение зависит от состояния"
  },
  "Design / template-method": {
   "book": "gof",
   "why": "наследование против делегирования шага"
  },
  "Design / value-object": {
   "book": "ddd-evans",
   "why": "Value Object против Entity, идентичность"
  },
  "Design / читаемость": {
   "book": "clean-code",
   "why": "главы про имена, функции и комментарии — с них пошла мода на «чистый код»"
  },
  "Design / DRY и связность": {
   "book": "pragmatic-programmer",
   "why": "DRY в оригинале — про знание, а не про повторённый текст; там же ортогональность"
  },
  "Design / энтропия и техдолг": {
   "book": "pragmatic-programmer",
   "why": "разбитые окна и «достаточно хорошая» программа — как код гниёт и когда это норма"
  },
  "Testing / читаемость": {
   "book": "clean-code",
   "why": "глава про юнит-тесты: тест читают чаще, чем правят, и обычно не автор"
  },
  "Design / оценка на коленке": {
   "book": "",
   "why": "таблицы latency и прикидки QPS в каноне нет"
  },
  "Design / подход к задаче": {
   "book": "",
   "why": "фреймворка System Design-собеса в каноне нет"
  },
  "Design / что такое сервер": {
   "book": "",
   "why": "путь сокет→тред→хендлер не разобран в каноне"
  },
  "DevOps / Containers / JVM": {
   "book": "kubernetes-patterns",
   "why": "лимиты памяти контейнера против heap"
  },
  "DevOps / Prometheus / cardinality": {
   "book": "",
   "why": "Взрыв кардинальности в каноне не разобран"
  },
  "DevOps / SLO / error budget": {
   "book": "sre",
   "why": "SLO, бюджет ошибок, скорость сжигания"
  },
  "DevOps / architecture": {
   "book": "building-microservices",
   "why": "границы сервисов, отличия от SOA"
  },
  "DevOps / ci-cd": {
   "book": "building-microservices",
   "why": "непрерывная поставка, независимый деплой сервисов"
  },
  "DevOps / ci-secrets": {
   "book": "",
   "why": "Секреты в CI вне канона; SC — только примитивы"
  },
  "DevOps / cloud": {
   "book": "building-microservices",
   "why": "варианты деплоя, FaaS и её ограничения"
  },
  "DevOps / docker-cache": {
   "book": "",
   "why": "Порядок слоёв Dockerfile — доки Docker, не канон"
  },
  "DevOps / feature-flags": {
   "book": "building-microservices",
   "why": "тогглы вместо долгих веток, постепенный выкат"
  },
  "DevOps / gradle-maven": {
   "book": "",
   "why": "Инкрементальная сборка Gradle vs Maven вне канона"
  },
  "DevOps / image-tags": {
   "book": "",
   "why": "Иммутабельные теги образов вне канона"
  },
  "DevOps / k8s / graceful shutdown": {
   "book": "kubernetes-patterns",
   "why": "жизненный цикл пода, SIGTERM и preStop"
  },
  "DevOps / k8s / liveness probe": {
   "book": "kubernetes-patterns",
   "why": "health probe: liveness против readiness"
  },
  "DevOps / k8s / requests-limits": {
   "book": "kubernetes-patterns",
   "why": "requests, limits и классы QoS"
  },
  "DevOps / log-aggregation": {
   "book": "building-microservices",
   "why": "агрегация логов, корреляционный идентификатор"
  },
  "DevOps / observability": {
   "book": "building-microservices",
   "why": "сквозная трассировка запроса между сервисами"
  },
  "DevOps / os": {
   "book": "optimizing-java",
   "why": "ОС под JVM: CPU, память, io"
  },
  "DevOps / percentiles": {
   "book": "ddia",
   "why": "перцентили и хвостовые задержки вместо среднего"
  },
  "DevOps / prometheus": {
   "book": "sre",
   "why": "сбор метрик опросом целей (Borgmon)"
  },
  "DevOps / rollback": {
   "book": "building-microservices",
   "why": "миграции схемы, обратная совместимость данных"
  },
  "DevOps / semver": {
   "book": "building-microservices",
   "why": "версионирование контрактов и ломающие изменения"
  },
  "DevOps / strangler fig": {
   "book": "building-microservices",
   "why": "постепенное вытеснение монолита, перехват вызовов"
  },
  "DevOps / terraform": {
   "book": "",
   "why": "Terraform и remote state в каноне отсутствуют"
  },
  "DevOps / Кардинальность метрик": {
   "book": "",
   "why": "Кардинальность лейблов — только в доках Prometheus"
  },
  "Distributed / 8 саг = 3 оси": {
   "book": "",
   "why": "таксономия 8 саг — Hard Parts, её в каноне нет"
  },
  "Distributed / Architecture quantum / shared DB": {
   "book": "building-microservices",
   "why": "общая БД ломает независимый деплой"
  },
  "Distributed / Back Pressure / bounded queue": {
   "book": "release-it",
   "why": "паттерн back pressure, ограниченные очереди"
  },
  "Distributed / CQRS": {
   "book": "microservices-patterns",
   "why": "CQRS, лаг обновления читающей модели"
  },
  "Distributed / Circuit Breaker": {
   "book": "release-it",
   "why": "размыкатель, таймауты, bulkhead пулов"
  },
  "Distributed / Dogpile / Jitter": {
   "book": "release-it",
   "why": "антипаттерн dogpile, разброс по времени"
  },
  "Distributed / Event-driven": {
   "book": "building-microservices",
   "why": "event-carried state transfer против тонких событий"
  },
  "Distributed / Saga / компенсация": {
   "book": "microservices-patterns",
   "why": "саги, компенсации, отсутствие изоляции"
  },
  "Distributed / Schema Registry / evolution": {
   "book": "kafka-definitive-guide",
   "why": "Avro, реестр схем, режимы совместимости"
  },
  "Distributed / Schema evolution": {
   "book": "ddia",
   "why": "кодирование данных, прямая и обратная совместимость"
  },
  "Distributed / Slow Responses / Fail Fast": {
   "book": "release-it",
   "why": "медленные ответы, fail fast, каскад отказов"
  },
  "Distributed / at-least-once · порядок ack": {
   "book": "kafka-definitive-guide",
   "why": "момент коммита офсета, потеря против дублей"
  },
  "Distributed / big-data": {
   "book": "ddia",
   "why": "пакетная и потоковая обработка, Lambda"
  },
  "Distributed / clock-skew": {
   "book": "ddia",
   "why": "ненадёжные часы, монотонные против настенных, лизы"
  },
  "Distributed / dlq-retry": {
   "book": "kafka-definitive-guide",
   "why": "ретраи консьюмера через отдельные топики"
  },
  "Distributed / durability / ISR": {
   "book": "kafka-definitive-guide",
   "why": "репликация, ISR, min.insync.replicas"
  },
  "Distributed / event time vs processing time": {
   "book": "ddia",
   "why": "время события против времени обработки"
  },
  "Distributed / exactly-once / side effects": {
   "book": "kafka-definitive-guide",
   "why": "границы транзакций Kafka, внешние эффекты"
  },
  "Distributed / fan-out latency": {
   "book": "microservices-patterns",
   "why": "API composition, латентность и доступность fan-out"
  },
  "Distributed / gossip": {
   "book": "database-internals",
   "why": "детекторы отказов, gossip-распространение, анти-энтропия"
  },
  "Distributed / group-coordinator": {
   "book": "kafka-definitive-guide",
   "why": "координатор группы, топик __consumer_offsets"
  },
  "Distributed / idempotent consumer": {
   "book": "microservices-patterns",
   "why": "идемпотентный обработчик, дедупликация по message id"
  },
  "Distributed / idempotent-producer": {
   "book": "kafka-definitive-guide",
   "why": "идемпотентный продюсер, producer id и sequence"
  },
  "Distributed / kafka": {
   "book": "kafka-definitive-guide",
   "why": "настройки продюсера и гарантии записи"
  },
  "Distributed / kafka-streams": {
   "book": "kafka-definitive-guide",
   "why": "потоковая обработка, дуальность потока и таблицы"
  },
  "Distributed / kafka-transactions": {
   "book": "kafka-definitive-guide",
   "why": "транзакции, атомарная запись в несколько партиций"
  },
  "Distributed / leader-election": {
   "book": "database-internals",
   "why": "Raft, термы, выборы и репликация лога"
  },
  "Distributed / log-compaction": {
   "book": "kafka-definitive-guide",
   "why": "компактирование лога, tombstone-записи, хранение состояния"
  },
  "Distributed / offset · auto-commit": {
   "book": "kafka-definitive-guide",
   "why": "авто-коммит офсетов, потеря необработанных сообщений"
  },
  "Distributed / offset-reset": {
   "book": "kafka-definitive-guide",
   "why": "auto.offset.reset, старт группы без офсетов"
  },
  "Distributed / outbox relay": {
   "book": "microservices-patterns",
   "why": "outbox-релей даёт at-least-once, дубли неизбежны"
  },
  "Distributed / pattern": {
   "book": "microservices-patterns",
   "why": "transactional outbox против dual write"
  },
  "Distributed / poison / head-of-line": {
   "book": "kafka-definitive-guide",
   "why": "порядок внутри партиции, застрявший офсет"
  },
  "Distributed / poll-timeout": {
   "book": "kafka-definitive-guide",
   "why": "max.poll.interval против heartbeat, живость консьюмера"
  },
  "Distributed / polling vs CDC": {
   "book": "microservices-patterns",
   "why": "polling publisher против чтения лога транзакций"
  },
  "Distributed / producer / ordering": {
   "book": "kafka-definitive-guide",
   "why": "ретраи, max.in.flight, порядок в партиции"
  },
  "Distributed / quorum-rw": {
   "book": "ddia",
   "why": "кворумы чтения и записи, leaderless-репликация"
  },
  "Distributed / rebalance-strategy": {
   "book": "kafka-definitive-guide",
   "why": "назначение партиций, кооперативный ребаланс без stop-the-wor"
  },
  "Distributed / static-membership": {
   "book": "kafka-definitive-guide",
   "why": "статическое членство, group.instance.id, session.timeout"
  },
  "Distributed / theory": {
   "book": "ddia",
   "why": "разделение сети, согласованность против доступности"
  },
  "Distributed / tracing / context propagation": {
   "book": "building-microservices",
   "why": "корреляционные id, сквозная распределённая трассировка"
  },
  "Distributed / two-phase-commit": {
   "book": "microservices-patterns",
   "why": "2PC против саги, блокировки и координатор"
  },
  "Distributed / vector-clocks": {
   "book": "ddia",
   "why": "версионные векторы, обнаружение конкурентных записей"
  },
  "Distributed / workflow": {
   "book": "microservices-patterns",
   "why": "оркестрация саги, машина состояний процесса"
  },
  "Distributed / Брокеры": {
   "book": "ddia",
   "why": "очереди против лог-ориентированных брокеров"
  },
  "Git / basics": {
   "book": "pro-git",
   "why": "7.3 stash; 3.4 workflows (gitflow не по имени)"
  },
  "Git / blame": {
   "book": "pro-git",
   "why": "7.10 File Annotation: blame -L/-C; --ignore-rev нет"
  },
  "Git / cherry-pick": {
   "book": "pro-git",
   "why": "5.3 cherry-pick, дубли в 3.6; --continue только man"
  },
  "Git / debug": {
   "book": "pro-git",
   "why": "7.10 bisect; 10.7 — возврат коммита через reflog"
  },
  "Git / detached-HEAD": {
   "book": "pro-git",
   "why": "2.6 «Checking out Tags»: коммит вне ветки теряется"
  },
  "Git / gitignore": {
   "book": "pro-git",
   "why": "2.2 .gitignore + 2.4 git rm --cached для tracked"
  },
  "Git / history": {
   "book": "pro-git",
   "why": "гл. 3.6 «Rebase vs. Merge»; cherry-pick в 5.3"
  },
  "Git / hooks": {
   "book": "pro-git",
   "why": "8.3: клиентские хуки не копируются при clone; 8.4"
  },
  "Git / merge-strategy": {
   "book": "pro-git",
   "why": "3.2 ff vs merge-коммит; сам --no-ff разобран слабо"
  },
  "Git / revert-merge": {
   "book": "pro-git",
   "why": "7.8 «Undoing Merges»: revert -m 1 и что дальше"
  },
  "Git / submodule": {
   "book": "pro-git",
   "why": "7.11, включая раздел «Issues with Submodules»"
  },
  "Git / tags": {
   "book": "pro-git",
   "why": "гл. 2.6 Tagging: annotated vs lightweight"
  },
  "Git / worktree": {
   "book": "",
   "why": "worktree нет в Pro Git, только man git-worktree"
  },
  "Infra / Docker / layer cache": {
   "book": "",
   "why": "Кэш слоёв Docker книгами канона не покрыт"
  },
  "Infra / Elasticsearch / refresh": {
   "book": "",
   "why": "DDIA гл.3 — про Lucene-индекс, но не про refresh"
  },
  "Infra / Elasticsearch / shards": {
   "book": "ddia",
   "why": "партиционирование и ребалансировка данных"
  },
  "Infra / K8s / ConfigMap": {
   "book": "kubernetes-patterns",
   "why": "внешняя конфигурация подов"
  },
  "Infra / K8s / HPA": {
   "book": "kubernetes-patterns",
   "why": "эластичное масштабирование, роль requests"
  },
  "Infra / Redis / HyperLogLog": {
   "book": "",
   "why": "HLL нигде не разобран, максимум упоминание"
  },
  "Infra / Redis / Streams vs Pub/Sub": {
   "book": "ddia",
   "why": "транзиентная доставка против durable лога"
  },
  "Infra / Redis / ZSET": {
   "book": "",
   "why": "Redis-структуры вне канона; Седжвик — про heap/BST"
  },
  "Infra / Redis / persistence": {
   "book": "database-internals",
   "why": "WAL против снапшотов, восстановление"
  },
  "Infra / autoscaling": {
   "book": "kubernetes-patterns",
   "why": "масштабирование по метрикам и лимитам"
  },
  "Infra / cache": {
   "book": "ddia",
   "why": "in-memory хранение, инвалидация, деривация данных"
  },
  "Infra / containers": {
   "book": "kubernetes-patterns",
   "why": "образы, слои, жизненный цикл контейнера"
  },
  "Infra / messaging": {
   "book": "ddia",
   "why": "очереди против лога, семантика доставки"
  },
  "Infra / nginx / upstream": {
   "book": "release-it",
   "why": "балансировка, health-check, липкие сессии"
  },
  "Infra / search": {
   "book": "ddia",
   "why": "устройство полнотекстовых индексов Lucene"
  },
  "JVM / ClassLoaders": {
   "book": "",
   "why": "parent-delegation — JVM spec, книги в каноне нет"
  },
  "JVM / Deoptimization": {
   "book": "optimizing-java",
   "why": "спекулятивные оптимизации JIT и откат"
  },
  "JVM / Flags/metrics": {
   "book": "java-performance",
   "why": "настройка heap и ключевые флаги"
  },
  "JVM / Inlining": {
   "book": "optimizing-java",
   "why": "инлайнинг как база прочих оптимизаций"
  },
  "JVM / JIT C1/C2": {
   "book": "java-performance",
   "why": "многоуровневая компиляция и прогрев"
  },
  "JVM / JMM": {
   "book": "jcip",
   "why": "модель памяти и happens-before"
  },
  "JVM / Low-pause GC": {
   "book": "java-performance",
   "why": "компромисс пауза против пропускной способности"
  },
  "JVM / Off-heap / Direct Memory": {
   "book": "java-performance",
   "why": "нативная память и direct-буферы"
  },
  "JVM / Safepoints": {
   "book": "optimizing-java",
   "why": "safepoint, time-to-safepoint, счётные циклы"
  },
  "JVM / Strings": {
   "book": "java-performance",
   "why": "интернирование и дедупликация строк"
  },
  "JVM / classloader-leak": {
   "book": "java-performance",
   "why": "metaspace и нативная память, утечки"
  },
  "JVM / gc": {
   "book": "java-performance",
   "why": "поколения, stop-the-world паузы, System.gc"
  },
  "JVM / gc-roots/reachability": {
   "book": "optimizing-java",
   "why": "достижимость от корней, mark-and-sweep"
  },
  "JVM / invokedynamic/lambda-bytecode": {
   "book": "optimizing-java",
   "why": "байткод, invokedynamic, работа JIT"
  },
  "JVM / memory": {
   "book": "java-performance",
   "why": "куча, поколения, метаспейс, GC"
  },
  "JVM / object-layout/compressed-oops": {
   "book": "java-performance",
   "why": "размер объекта, заголовок, compressed oops"
  },
  "JVM / prod-diagnostics": {
   "book": "java-performance",
   "why": "JFR, дампы, профилирование в проде"
  },
  "JVM / write-barrier/card-table": {
   "book": "optimizing-java",
   "why": "внутренности GC: барьеры записи, card table"
  },
  "Java / Comparator": {
   "book": "effective-java",
   "why": "контракт compareTo, методы построения компараторов"
  },
  "Java / Generics": {
   "book": "effective-java",
   "why": "PECS, wildcard capture, стирание типов"
  },
  "Java / Keywords": {
   "book": "effective-java",
   "why": "final: неизменяемость и запрет наследования"
  },
  "Java / Object": {
   "book": "effective-java",
   "why": "контракты equals, hashCode, toString"
  },
  "Java / Object/clone": {
   "book": "effective-java",
   "why": "clone сломан, копирующий конструктор"
  },
  "Java / Streams/Exceptions": {
   "book": "modern-java-in-action",
   "why": "checked-исключения внутри лямбд и стримов"
  },
  "Java / Strings": {
   "book": "java-performance",
   "why": "строки в куче, intern, дедупликация"
  },
  "Java / boxing": {
   "book": "effective-java",
   "why": "примитивы против обёрток, скрытый автобоксинг"
  },
  "Java / collections": {
   "book": "algorithms-sedgewick",
   "why": "внутренности списков, хеш-таблиц, деревьев"
  },
  "Java / core": {
   "book": "effective-java",
   "why": "базовые контракты объектов и API"
  },
  "Java / equals-hashcode": {
   "book": "effective-java",
   "why": "контракт hashCode, изменяемые ключи"
  },
  "Java / exceptions": {
   "book": "effective-java",
   "why": "checked против unchecked, трансляция исключений"
  },
  "Java / hashmap": {
   "book": "algorithms-sedgewick",
   "why": "хеш-таблицы, коллизии, красно-чёрные деревья"
  },
  "Java / init": {
   "book": "effective-java",
   "why": "конструкторы, ленивая инициализация, переопределяемые методы"
  },
  "Java / io": {
   "book": "",
   "why": "байтовые/символьные потоки и charset — книги нет"
  },
  "Java / keywords": {
   "book": "effective-java",
   "why": "finalize вреден, cleaner, try-with-resources"
  },
  "Java / lambda": {
   "book": "modern-java-in-action",
   "why": "функциональные интерфейсы, ссылки на методы"
  },
  "Java / mechanical refactor": {
   "book": "refactoring",
   "why": "каталог мелких безопасных преобразований кода"
  },
  "Java / numbers": {
   "book": "effective-java",
   "why": "float/double неточны, деньги в BigDecimal"
  },
  "Java / oop": {
   "book": "effective-java",
   "why": "композиция вместо наследования, интерфейсы"
  },
  "Java / optional": {
   "book": "effective-java",
   "why": "когда возвращать Optional, антипаттерн get"
  },
  "Java / semantics": {
   "book": "",
   "why": "pass-by-value не разобран ни в одной книге канона"
  },
  "Java / serialization": {
   "book": "effective-java",
   "why": "serialVersionUID, риски, альтернативы сериализации"
  },
  "Java / streams": {
   "book": "modern-java-in-action",
   "why": "ленивость, конвейеры, коллекторы, параллельность"
  },
  "Java / varargs": {
   "book": "effective-java",
   "why": "varargs с дженериками, heap pollution"
  },
  "Quarkus / Cloud-native и наблюдаемость": {
   "book": "release-it",
   "why": "таймауты, circuit breaker, прозрачность системы"
  },
  "Quarkus / Native (GraalVM)": {
   "book": "",
   "why": "GraalVM closed-world и рефлексия вне канона"
  },
  "Quarkus / Reactive / Mutiny": {
   "book": "",
   "why": "Uni/Multi нет; MJiA — общая реактивность, не Mutiny"
  },
  "Quarkus / Данные": {
   "book": "",
   "why": "Panache и Hibernate Reactive нигде не разобраны"
  },
  "Quarkus / Конфиг и Dev": {
   "book": "",
   "why": "MicroProfile Config и профили нигде не разобраны"
  },
  "Quarkus / Старт и DI": {
   "book": "",
   "why": "Build-time DI и CDI-скоупы вне канона"
  },
  "Reactive / Reactor / Mutiny": {
   "book": "modern-java-in-action",
   "why": "асинхронная композиция, backpressure, операторы потоков"
  },
  "Reactive / Reactor Context": {
   "book": "",
   "why": "Reactor Context нет; в MJiA только Reactive Streams"
  },
  "Reactive / Основы": {
   "book": "modern-java-in-action",
   "why": "Flow API, четыре интерфейса Reactive Streams"
  },
  "Spring / Domain model ≠ JPA entity": {
   "book": "iddd",
   "why": "анемичная модель против богатых агрегатов"
  },
  "Spring / Hexagon · Mapping": {
   "book": "clean-architecture",
   "why": "правило зависимостей, порты и адаптеры"
  },
  "Spring / aop": {
   "book": "gof",
   "why": "Proxy и Decorator: перехват вызова"
  },
  "Spring / async": {
   "book": "jcip",
   "why": "пулы потоков и их исчерпание"
  },
  "Spring / boot": {
   "book": "spring-in-action",
   "why": ""
  },
  "Spring / conditional": {
   "book": "",
   "why": "автоконфиг и @ConditionalOnMissingBean не покрыты"
  },
  "Spring / data": {
   "book": "spring-in-action",
   "why": ""
  },
  "Spring / entity-equals": {
   "book": "effective-java",
   "why": "контракт equals/hashCode и его ловушки"
  },
  "Spring / errors": {
   "book": "",
   "why": "ControllerAdvice vs фильтры Security — нет в каноне"
  },
  "Spring / events": {
   "book": "",
   "why": "@TransactionalEventListener канон не разбирает"
  },
  "Spring / factorybean": {
   "book": "",
   "why": "FactoryBean: внутренности контейнера, книги нет"
  },
  "Spring / flush": {
   "book": "",
   "why": "flush vs commit: книги по ORM в каноне нет"
  },
  "Spring / jpa": {
   "book": "",
   "why": "нет книги по JPA/Hibernate: persist/merge, прокси"
  },
  "Spring / jpa-perf": {
   "book": "sql-performance-explained",
   "why": "лишние запросы, join, пагинация"
  },
  "Spring / lifecycle": {
   "book": "",
   "why": "прокси и порядок init бинов — вне канона"
  },
  "Spring / lookup": {
   "book": "",
   "why": "@Lookup/method injection нет и в Spring in Action"
  },
  "Spring / persistence-context": {
   "book": "",
   "why": "L1-кэш сессии: нужна книга по Hibernate, её нет"
  },
  "Spring / scheduled": {
   "book": "jcip",
   "why": "пулы задач, ловушки Timer"
  },
  "Spring / scopes": {
   "book": "spring-in-action",
   "why": "SiA 4, §3.4 Scoping beans: proxyMode; в SiA 5/6 нет"
  },
  "Spring / second-level-cache": {
   "book": "",
   "why": "L2 и query cache Hibernate канон не разбирает"
  },
  "Spring / security": {
   "book": "spring-in-action",
   "why": ""
  },
  "Spring / tx": {
   "book": "spring-in-action",
   "why": ""
  },
  "Spring / value": {
   "book": "",
   "why": "@Value, плейсхолдеры, static-поля — вне канона"
  },
  "System Design / Кейсы I": {
   "book": "ddia",
   "why": "репликация, шардирование, компромиссы масштабирования"
  },
  "System Design / Кейсы II": {
   "book": "microservices-patterns",
   "why": "saga, outbox, идемпотентность на Java"
  },
  "System Design / Оценка и основы": {
   "book": "ddia",
   "why": "надёжность, масштабируемость, перцентили задержек"
  },
  "Testing / AssertJ": {
   "book": "",
   "why": "AssertJ — API библиотеки, книги в каноне нет"
  },
  "Testing / Awaitility": {
   "book": "goos",
   "why": "тесты асинхронного кода без sleep"
  },
  "Testing / Hexagon · Determinism": {
   "book": "clean-architecture",
   "why": "правило зависимостей, инфраструктура за портом"
  },
  "Testing / Mockito": {
   "book": "unit-testing-khorikov",
   "why": "переспецифицированные моки ломают тесты"
  },
  "Testing / Pact": {
   "book": "building-microservices",
   "why": "consumer-driven контракты между сервисами"
  },
  "Testing / basics": {
   "book": "unit-testing-khorikov",
   "why": "признаки хорошего теста, пирамида"
  },
  "Testing / characterization": {
   "book": "legacy-code",
   "why": "характеризующие тесты вокруг легаси"
  },
  "Testing / coverage": {
   "book": "unit-testing-khorikov",
   "why": "критика метрик покрытия"
  },
  "Testing / doubles": {
   "book": "unit-testing-khorikov",
   "why": "моки против стабов, таксономия"
  },
  "Testing / fixtures": {
   "book": "goos",
   "why": "Test Data Builder для данных"
  },
  "Testing / integration": {
   "book": "unit-testing-khorikov",
   "why": "реальная БД вместо моков"
  },
  "Testing / isolation": {
   "book": "unit-testing-khorikov",
   "why": "общие зависимости ломают изоляцию"
  },
  "Testing / mockito": {
   "book": "legacy-code",
   "why": "швы и разрыв зависимостей"
  },
  "Testing / mutation": {
   "book": "unit-testing-khorikov",
   "why": "качество тестов важнее покрытия"
  },
  "Testing / param": {
   "book": "",
   "why": "JUnit 5 @MethodSource — только доки фреймворка"
  },
  "Testing / philosophy": {
   "book": "unit-testing-khorikov",
   "why": "лондонская против классической школы"
  },
  "Testing / spy": {
   "book": "unit-testing-khorikov",
   "why": "когда мок оправдан, когда вредит"
  },
  "Web / API design": {
   "book": "building-microservices",
   "why": "контракты и их версионирование"
  },
  "Web / API эволюция": {
   "book": "building-microservices",
   "why": "версионирование контрактов, ломающие изменения"
  },
  "Web / JWT / Auth": {
   "book": "",
   "why": "разбора JWT и атаки alg=none в каноне нет"
  },
  "Web / appsec": {
   "book": "",
   "why": "OWASP Top-10 нет; патчинг зависимостей — пара абзацев"
  },
  "Web / auth": {
   "book": "",
   "why": "OAuth2/OIDC: ролей и типов токенов в каноне нет"
  },
  "Web / connections": {
   "book": "release-it",
   "why": "пулы соединений, таймауты, зависшие потоки"
  },
  "Web / cookies": {
   "book": "",
   "why": "атрибут SameSite в каноне не описан"
  },
  "Web / csp": {
   "book": "",
   "why": "CSP и защита от XSS в каноне не разобраны"
  },
  "Web / csrf": {
   "book": "",
   "why": "CSRF-токен и SameSite нигде не сопоставлены"
  },
  "Web / gRPC / Protobuf": {
   "book": "ddia",
   "why": "кодирование protobuf, номера полей, эволюция"
  },
  "Web / hsts": {
   "book": "",
   "why": "HSTS нет; в каноне только сам TLS"
  },
  "Web / http": {
   "book": "",
   "why": "семантики методов и статус-кодов в каноне нет"
  },
  "Web / idempotency": {
   "book": "microservices-patterns",
   "why": "идемпотентный обработчик через сохранённые id"
  },
  "Web / keycloak": {
   "book": "",
   "why": "модели realm/client/роли Keycloak в каноне нет"
  },
  "Web / negotiation": {
   "book": "",
   "why": "content negotiation и 406 в каноне нет"
  },
  "Web / network": {
   "book": "ddia",
   "why": "ненадёжность сети, TCP против UDP"
  },
  "Web / oauth2": {
   "book": "",
   "why": "выбора grant-флоу и PKCE в каноне нет"
  },
  "Web / protocols": {
   "book": "ddia",
   "why": "SOAP/WSDL, REST, RPC — сравнение"
  },
  "Web / realtime": {
   "book": "",
   "why": "сравнения SSE vs WebSocket в каноне нет"
  },
  "Web / redirects": {
   "book": "",
   "why": "коды 301/302/307/308 — книги по HTTP нет"
  },
  "Web / rest": {
   "book": "building-microservices",
   "why": "REST, зрелость Ричардсона, версионирование"
  },
  "Web / security": {
   "book": "serious-crypto",
   "why": "гл. 13 TLS: рукопожатие, сертификаты, PKI"
  },
  "Архитектура / CQRS/read-model": {
   "book": "microservices-patterns",
   "why": "CQRS и отдельные read-модели"
  },
  "Архитектура / DDD/aggregate": {
   "book": "iddd",
   "why": "правила агрегатов, границы транзакций"
  },
  "Архитектура / DDD/bounded-context": {
   "book": "ddd-evans",
   "why": "откуда взялся контекст и границы"
  },
  "Архитектура / DDD/domain-event": {
   "book": "iddd",
   "why": "доменные события и их публикация"
  },
  "Архитектура / DDD/value-object": {
   "book": "ddd-evans",
   "why": "сущность против value object, идентичность"
  },
  "Архитектура / integration/anti-corruption": {
   "book": "ddd-evans",
   "why": "context map, ACL как перевод"
  },
  "Архитектура / integration/outbox-cdc": {
   "book": "microservices-patterns",
   "why": "transactional outbox и чтение лога"
  },
  "Архитектура / messaging/idempotency": {
   "book": "microservices-patterns",
   "why": "дубли сообщений, дедупликация потребителя"
  },
  "Архитектура / migration/strangler": {
   "book": "building-microservices",
   "why": "постепенное удушение монолита"
  },
  "Архитектура / multi-tenancy": {
   "book": "",
   "why": "моделей изоляции тенантов нет ни в одной книге"
  },
  "Архитектура / Интеграция и обмен": {
   "book": "microservices-patterns",
   "why": "каналы сообщений, pub/sub, конкурирующие потребители"
  },
  "Архитектура / Топология": {
   "book": "microservices-patterns",
   "why": "обнаружение сервисов, сага: оркестрация/хореография"
  },
  "Архитектура / Устойчивость": {
   "book": "release-it",
   "why": "таймауты, circuit breaker, bulkhead"
  },
  "Архитектура / данные": {
   "book": "ddia",
   "why": "репликация и шардирование, их компромиссы"
  },
  "Архитектура / масштаб": {
   "book": "ddia",
   "why": "консенсус, 2PC, распределённые блокировки, консистентность"
  },
  "Архитектура / микросервисы": {
   "book": "microservices-patterns",
   "why": "API gateway, сага, event sourcing"
  },
  "Архитектура / стили": {
   "book": "clean-architecture",
   "why": "правило зависимостей, порты и адаптеры"
  },
  "Spring / di": {
   "book": "spring-in-action",
   "why": ""
  },
  "* / Java": {
   "book": "effective-java",
   "why": ""
  },
  "* / Distributed": {
   "book": "ddia",
   "why": ""
  },
  "* / DB": {
   "book": "sql-performance-explained",
   "why": ""
  },
  "* / Архитектура": {
   "book": "ddd-evans",
   "why": ""
  },
  "* / Design": {
   "book": "gof",
   "why": ""
  },
  "* / Concurrency": {
   "book": "jcip",
   "why": ""
  },
  "* / Testing": {
   "book": "unit-testing-khorikov",
   "why": ""
  },
  "* / JVM": {
   "book": "optimizing-java",
   "why": ""
  },
  "* / System Design": {
   "book": "ddia",
   "why": ""
  },
  "* / Spring": {
   "book": "spring-in-action",
   "why": ""
  },
  "Web / webhooks": {
   "book": "microservices-patterns",
   "why": "гл. 3: дедуп повторов, idempotent consumer"
  },
  "Quarkus / тесты": {
   "book": "",
   "why": "Аннотации Quarkus-тестов вне канона"
  },
  "Quarkus / rest client": {
   "book": "",
   "why": "Декларативный REST Client в каноне отсутствует"
  },
  "Build / Воспроизводимость сборки": {
   "book": "",
   "why": "Плавающие версии и кэш сборки не разобраны"
  },
  "Infra / K8s / limits · JVM": {
   "book": "java-performance",
   "why": "Гл.8 Native Memory: heap — не вся память процесса"
  },
  "Infra / K8s / graceful shutdown": {
   "book": "kubernetes-patterns",
   "why": "Managed Lifecycle: SIGTERM, preStop, grace period"
  },
  "Infra / Redis / single-thread": {
   "book": "ddia",
   "why": "Гл.7 Actual Serial Execution: Redis однопоточный"
  },
  "Infra / metrics / cardinality": {
   "book": "",
   "why": "Взрыв кардинальности метрик каноном не покрыт"
  },
  "Git / force-push": {
   "book": "pro-git",
   "why": "3.6 «The Perils of Rebasing»: чужие коммиты и фикс"
  },
  "Git / internals": {
   "book": "pro-git",
   "why": "1.3 снимки, не diff; 10.2 объекты адресуются SHA"
  },
  "Архитектура / границы и контроль": {
   "book": "",
   "why": "ArchUnit и проверки границ в CI в каноне нет"
  },
  "System Design / Эксплуатация": {
   "book": "",
   "why": "DDIA даёт совместимость, не рецепт expand/contract"
  },
  "Spring / virtual-threads": {
   "book": "",
   "why": "Loom вне канона: JCIP и Oaks старше Java 21"
  },
  "Spring / validation": {
   "book": "",
   "why": "SiA учит @Valid в контроллере; про @Validated нет"
  },
  "DB / sql/join": {
   "book": "postgres-internals",
   "why": "Главы про nested loop, hash join, merge join"
  },
  "DB / ddl/locks": {
   "book": "postgres-internals",
   "why": "Блокировки объектов: ACCESS EXCLUSIVE и очередь"
  },
  "DB / vacuum/xmin horizon": {
   "book": "postgres-internals",
   "why": "Очистка: горизонт БД, idle in transaction, bloat"
  },
  "DB / pk/uuid": {
   "book": "",
   "why": "нет главы про UUID-PK; сплиты B-tree лишь косвенно"
  },
  "Crypto / случайность и секреты": {
   "book": "serious-crypto",
   "why": "гл. 2: CSPRNG против PRNG, предсказуемые сиды"
  },
  "Crypto / атаки на реализацию": {
   "book": "serious-crypto",
   "why": "гл. 7: тайминг-атака на сравнение MAC"
  },
  "Testing / integration/tx": {
   "book": "unit-testing-khorikov",
   "why": "гл. 10: откат вместо чистки данных — антипаттерн"
  },
  "Testing / testcontainers/lifecycle": {
   "book": "",
   "why": "жизненный цикл Testcontainers — только доки"
  },
  "Java / generics": {
   "book": "effective-java",
   "why": "Item 28: ковариантность массивов vs дженерики"
  },
  "Java / strings": {
   "book": "",
   "why": "семантика split/regex — только javadoc"
  },
  "Java / arrays": {
   "book": "",
   "why": "EJ лишь советует Arrays.equals, разбора нет"
  },
  "JVM / containers": {
   "book": "",
   "why": "JVM в cgroups: в K8s-книге лимиты пода, не JVM"
  },
  "Distributed / retry / amplification": {
   "book": "sre",
   "why": "гл.22 Cascading Failures: ретраи ×3 на слой = ×27"
  },
  "Distributed / consistent-hashing": {
   "book": "ddia",
   "why": "гл.6 Rebalancing: «hash mod N» и что берут вместо"
  },
  "Distributed / kafka / partition-count": {
   "book": "kafka-definitive-guide",
   "why": "гл.3 Keys and Partitions: рост N ломает маппинг ключа"
  },
  "Distributed / virtual threads / concurrency limit": {
   "book": "",
   "why": "vthreads вне канона; Release It даёт лишь bulkhead"
  },
  "Algorithms / sorting": {
   "book": "effective-java",
   "why": "Item 14: контракт compareTo; внешней сортировки нет"
  }
 }
};

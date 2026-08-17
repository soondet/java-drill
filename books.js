/* Откуда знание. Канон выверен отдельным прогоном, привязка — по паре тема/подтема
   с откатом на тему целиком (ключ «* / Тема»). Пустая привязка означает «в каноне
   такого нет» (Git, Maven, Gradle, криптография, виртуальные потоки) и намеренно
   не подменяется книгой всей темы. */
window.BOOKS={books:[
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
 }
],
map:{
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
  "why": "битовые трюки нигде не разобраны"
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
  "why": "LinkedHashMap и вытеснение не разобраны"
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
  "why": "кодогенерация при компиляции не покрыта"
 },
 "Build / Gradle и зависимости": {
  "book": "",
  "why": "Gradle ни в одной книге"
 },
 "Build / Maven": {
  "book": "",
  "why": "Maven ни в одной книге"
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
  "why": "Java 21, новее всех книг"
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
  "why": "виртуальные потоки новее всех книг"
 },
 "Concurrency / wait/sleep": {
  "book": "jcip",
  "why": "sleep держит лок, wait отпускает"
 },
 "Crypto / Асимметрия и PKI": {
  "book": "",
  "why": "криптографии в списке нет"
 },
 "Crypto / Симметрия и хеши": {
  "book": "",
  "why": "шифрование и хеш-функции не покрыты"
 },
 "Crypto / Хранение и ротация ключей": {
  "book": "",
  "why": "управление ключами нигде не разобрано"
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
  "book": "",
  "why": "трёхзначная логика SQL не покрыта"
 },
 "DB / PgBouncer transaction mode": {
  "book": "",
  "why": "пулеры соединений вне канона"
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
  "book": "",
  "why": "JDBC и JPA никто не разбирает"
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
  "book": "",
  "why": "каскадные удаления толком не разобраны"
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
  "book": "",
  "why": "нормальные формы нигде не выводятся"
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
  "book": "",
  "why": "рекурсивный SQL нигде не разобран"
 },
 "DB / sql/window": {
  "book": "",
  "why": "семантика оконных функций не покрыта"
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
  "book": "",
  "why": "Ousterhout в списке отсутствует"
 },
 "Design / Define errors out of existence": {
  "book": "",
  "why": "Ousterhout в списке отсутствует"
 },
 "Design / Hexagon · Ports": {
  "book": "clean-architecture",
  "why": "правило зависимостей, порты и адаптеры"
 },
 "Design / Info leakage / temporal decomposition": {
  "book": "",
  "why": "Ousterhout в списке отсутствует"
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
 "Design / оценка на коленке": {
  "book": "",
  "why": ""
 },
 "Design / подход к задаче": {
  "book": "",
  "why": ""
 },
 "Design / что такое сервер": {
  "book": "",
  "why": ""
 },
 "DevOps / Containers / JVM": {
  "book": "kubernetes-patterns",
  "why": "лимиты памяти контейнера против heap"
 },
 "DevOps / Prometheus / cardinality": {
  "book": "",
  "why": ""
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
  "why": ""
 },
 "DevOps / cloud": {
  "book": "building-microservices",
  "why": "варианты деплоя, FaaS и её ограничения"
 },
 "DevOps / docker-cache": {
  "book": "",
  "why": ""
 },
 "DevOps / feature-flags": {
  "book": "building-microservices",
  "why": "тогглы вместо долгих веток, постепенный выкат"
 },
 "DevOps / gradle-maven": {
  "book": "",
  "why": ""
 },
 "DevOps / image-tags": {
  "book": "",
  "why": ""
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
  "why": ""
 },
 "DevOps / Кардинальность метрик": {
  "book": "",
  "why": ""
 },
 "Distributed / 8 саг = 3 оси": {
  "book": "",
  "why": ""
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
  "book": "",
  "why": ""
 },
 "Git / blame": {
  "book": "",
  "why": ""
 },
 "Git / cherry-pick": {
  "book": "",
  "why": ""
 },
 "Git / debug": {
  "book": "",
  "why": ""
 },
 "Git / detached-HEAD": {
  "book": "",
  "why": ""
 },
 "Git / gitignore": {
  "book": "",
  "why": ""
 },
 "Git / history": {
  "book": "",
  "why": ""
 },
 "Git / hooks": {
  "book": "",
  "why": ""
 },
 "Git / merge-strategy": {
  "book": "",
  "why": ""
 },
 "Git / revert-merge": {
  "book": "",
  "why": ""
 },
 "Git / submodule": {
  "book": "",
  "why": ""
 },
 "Git / tags": {
  "book": "",
  "why": ""
 },
 "Git / worktree": {
  "book": "",
  "why": ""
 },
 "Infra / Docker / layer cache": {
  "book": "",
  "why": ""
 },
 "Infra / Elasticsearch / refresh": {
  "book": "",
  "why": ""
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
  "why": ""
 },
 "Infra / Redis / Streams vs Pub/Sub": {
  "book": "ddia",
  "why": "транзиентная доставка против durable лога"
 },
 "Infra / Redis / ZSET": {
  "book": "",
  "why": ""
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
  "why": ""
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
  "why": ""
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
  "why": ""
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
  "why": ""
 },
 "Quarkus / Reactive / Mutiny": {
  "book": "",
  "why": ""
 },
 "Quarkus / Данные": {
  "book": "",
  "why": ""
 },
 "Quarkus / Конфиг и Dev": {
  "book": "",
  "why": ""
 },
 "Quarkus / Старт и DI": {
  "book": "",
  "why": ""
 },
 "Reactive / Reactor / Mutiny": {
  "book": "modern-java-in-action",
  "why": "асинхронная композиция, backpressure, операторы потоков"
 },
 "Reactive / Reactor Context": {
  "book": "",
  "why": ""
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
  "why": "условные бины — специфика Spring"
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
  "why": "обработка ошибок MVC — специфика Spring"
 },
 "Spring / events": {
  "book": "",
  "why": "механика событий Spring вне книг"
 },
 "Spring / factorybean": {
  "book": "",
  "why": "внутренности контейнера Spring"
 },
 "Spring / flush": {
  "book": "",
  "why": "порядок flush в Hibernate не покрыт"
 },
 "Spring / jpa": {
  "book": "",
  "why": "жизненный цикл JPA-сущности вне книг"
 },
 "Spring / jpa-perf": {
  "book": "sql-performance-explained",
  "why": "лишние запросы, join, пагинация"
 },
 "Spring / lifecycle": {
  "book": "",
  "why": "порядок инициализации бинов вне книг"
 },
 "Spring / lookup": {
  "book": "",
  "why": "скоупы и lookup — специфика Spring"
 },
 "Spring / persistence-context": {
  "book": "",
  "why": "кэш первого уровня ORM не покрыт"
 },
 "Spring / scheduled": {
  "book": "jcip",
  "why": "пулы задач, ловушки Timer"
 },
 "Spring / scopes": {
  "book": "",
  "why": "скоупы бинов — специфика Spring"
 },
 "Spring / second-level-cache": {
  "book": "",
  "why": "кэш Hibernate и инвалидация не покрыты"
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
  "why": "плейсхолдеры конфигурации вне книг"
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
  "why": "библиотека ассертов не покрыта"
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
  "why": "механика JUnit 5 не покрыта"
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
  "why": ""
 },
 "Web / appsec": {
  "book": "",
  "why": ""
 },
 "Web / auth": {
  "book": "",
  "why": ""
 },
 "Web / connections": {
  "book": "release-it",
  "why": "пулы соединений, таймауты, зависшие потоки"
 },
 "Web / cookies": {
  "book": "",
  "why": ""
 },
 "Web / csp": {
  "book": "",
  "why": ""
 },
 "Web / csrf": {
  "book": "",
  "why": ""
 },
 "Web / gRPC / Protobuf": {
  "book": "ddia",
  "why": "кодирование protobuf, номера полей, эволюция"
 },
 "Web / hsts": {
  "book": "",
  "why": ""
 },
 "Web / http": {
  "book": "",
  "why": ""
 },
 "Web / idempotency": {
  "book": "microservices-patterns",
  "why": "идемпотентный обработчик через сохранённые id"
 },
 "Web / keycloak": {
  "book": "",
  "why": ""
 },
 "Web / negotiation": {
  "book": "",
  "why": ""
 },
 "Web / network": {
  "book": "ddia",
  "why": "ненадёжность сети, TCP против UDP"
 },
 "Web / oauth2": {
  "book": "",
  "why": ""
 },
 "Web / protocols": {
  "book": "ddia",
  "why": "SOAP/WSDL, REST, RPC — сравнение"
 },
 "Web / realtime": {
  "book": "",
  "why": ""
 },
 "Web / redirects": {
  "book": "",
  "why": ""
 },
 "Web / rest": {
  "book": "building-microservices",
  "why": "REST, зрелость Ричардсона, версионирование"
 },
 "Web / security": {
  "book": "",
  "why": ""
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
  "why": ""
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
 }
}};

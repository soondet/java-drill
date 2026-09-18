/* Правила английского по уровням — для собеседования, не вообще.
 *
 * Отбор тем один: то, по чему русскоговорящего слышно за секунду и что
 * реально звучит на техническом собесе. Примеры — про сервисы, базы и деплой.
 *
 * Схема:
 *   levels: [{id, name, about, topics:[{id, title, rule, examples:[{en,ru}],
 *             traps:[…], ex:[{t:"gap"|"fix", q, o:[3], a, why}]}]}]
 *   gap — вставь пропуск (___), три варианта; fix — предложение с ошибкой,
 *   три исправления, одно верное. a — индекс верного; варианты перемешиваются
 *   при показе, так что позиция ничего не выдаёт.
 */
window.ENGGRAMMAR = { levels: [

{ id:"A2", name:"A2 · базовый", about:"Без этого звучишь как школьник, даже если знаешь Kafka. Пять тем, все — про то, чего в русском нет.",
  topics:[

  { id:"a2-articles", title:"Артикли: a, the, —",
    rule:"*a/an* — один из многих или впервые упомянутый. *the* — конкретный, уже известный слушателю. *Без артикля* — множественное «вообще» и неисчисляемое (data, code, memory).",
    examples:[
      { en:"We need a cache in front of the database.", ru:"Нам нужен кэш перед базой. — кэш любой, база — та самая, наша." },
      { en:"The cache we added last week is full.", ru:"Кэш, который добавили на прошлой неделе, полон. — конкретный." },
      { en:"Caches are hard to invalidate.", ru:"Кэши трудно инвалидировать. — вообще, во множественном, без артикля." }
    ],
    traps:["В русском артиклей нет, и первый рефлекс — не ставить вовсе: «we deployed new version» режет ухо сразу.",
           "«the Java», «the Kafka» — имена технологий без артикля. Но: «the JVM», «the API» — аббревиатуры-существительные с артиклем.",
           "«a data», «a code» — неисчисляемые. «A piece of code», «some data»."],
    ex:[
      { t:"gap", q:"We deployed ___ new version yesterday.", o:["a","the","—"], a:0, why:"Версия одна из многих и впервые упомянута — a." },
      { t:"gap", q:"___ version we deployed yesterday has a memory leak.", o:["The","A","—"], a:0, why:"Уже известно, какая версия — вчерашняя. Конкретная — the." },
      { t:"gap", q:"___ microservices are harder to debug than a monolith.", o:["—","The","A"], a:0, why:"Микросервисы вообще, множественное число — без артикля." },
      { t:"fix", q:"I wrote a code for the payment module.", o:["I wrote the code for the payment module.","I wrote a code for payment module.","I wrote codes for the payment module."], a:0, why:"code — неисчисляемое: the code / some code, но не «a code» (это был бы шифр)." },
      { t:"fix", q:"We use the Kafka for events.", o:["We use Kafka for events.","We use a Kafka for events.","We use Kafka for event."], a:0, why:"Названия технологий — без артикля, ни the, ни a. А «for event» не живёт: исчисляемое в единственном требует артикля." }
    ]},

  { id:"a2-present", title:"Present Simple и Continuous",
    rule:"*Present Simple* — так устроено, так бывает регулярно: the service handles… *Present Continuous* — прямо сейчас или временно: the service is handling a spike. Глаголы состояния (know, need, want, mean) в Continuous не ставят.",
    examples:[
      { en:"The service handles about two thousand requests per second.", ru:"Сервис обрабатывает около двух тысяч запросов в секунду. — так устроено." },
      { en:"Right now it's handling a spike, so latency is up.", ru:"Прямо сейчас он обрабатывает всплеск, поэтому задержка выросла. — сейчас." },
      { en:"I work at a bank. This month I'm working on the payments migration.", ru:"Я работаю в банке. В этом месяце работаю над миграцией платежей. — постоянно / временно." }
    ],
    traps:["«I am work at a bank» — смесь двух форм. Либо I work, либо I am working.",
           "«I am knowing», «I am needing» — глаголы состояния только в Simple: I know, I need.",
           "«He work», «it handle» — в третьем лице -s. Самая частая мелочь на собесе."],
    ex:[
      { t:"gap", q:"Every night the job ___ the old records.", o:["deletes","is deleting","delete"], a:0, why:"Регулярно, каждую ночь — Present Simple, третье лицо с -s." },
      { t:"gap", q:"Don't restart it now — it ___ a migration.", o:["is running","runs","run"], a:0, why:"Прямо сейчас — Continuous." },
      { t:"fix", q:"I am work at a bank as a backend engineer.", o:["I work at a bank as a backend engineer.","I am working at a bank as backend engineer.","I working at a bank as a backend engineer."], a:0, why:"Постоянная работа — Present Simple. Вариант с Continuous тоже возможен, но там пропал артикль «a»." },
      { t:"fix", q:"I am not understanding why the test fails.", o:["I don't understand why the test fails.","I am not understand why the test fails.","I not understand why the test fails."], a:0, why:"understand — глагол состояния, в Continuous не ставится." },
      { t:"gap", q:"The consumer ___ messages from three partitions.", o:["reads","is read","read"], a:0, why:"Так устроено — Simple; третье лицо — reads." }
    ]},

  { id:"a2-past", title:"Past Simple: was, were, -ed и неправильные",
    rule:"Законченное действие в прошлом: *deployed, tested, fixed*. Неправильные надо знать: *wrote, built, ran, broke, went, found, got, took, made*. Вопрос и отрицание — через *did* + начальная форма.",
    examples:[
      { en:"We deployed on Friday and the login broke.", ru:"Мы выкатили в пятницу, и логин сломался." },
      { en:"I wrote the migration, but I didn't run it on staging.", ru:"Я написал миграцию, но не прогнал на стейдже." },
      { en:"Did the rollback work? — It did, in two minutes.", ru:"Откат сработал? — Да, за две минуты." }
    ],
    traps:["«I did wrote» — после did глагол в начальной форме: I did write / I didn't write.",
           "«We was» — was только с I/he/she/it, остальные were.",
           "«The build was fail» — либо the build failed, либо the build was failing. Не смешивать."],
    ex:[
      { t:"gap", q:"The build ___ because of a missing dependency.", o:["failed","was fail","fail"], a:0, why:"Законченное действие — Past Simple: failed." },
      { t:"gap", q:"We ___ the service in Kotlin two years ago.", o:["wrote","writed","have written"], a:0, why:"write — неправильный: wrote. «Two years ago» — законченное время, не Perfect." },
      { t:"fix", q:"I didn't found the bug in the logs.", o:["I didn't find the bug in the logs.","I didn't founded the bug in the logs.","I did not found the bug in the logs."], a:0, why:"После didn't и did not — начальная форма: find. Found — это уже прошедшее, дважды его не ставят." },
      { t:"fix", q:"The tests was green before the merge.", o:["The tests were green before the merge.","The tests be green before the merge.","The test were green before the merge."], a:0, why:"tests — множественное число: were. «Be» без формы и «the test were» — оба не согласованы с подлежащим." }
    ]},

  { id:"a2-questions", title:"Порядок слов в вопросе",
    rule:"Вопрос начинается со вспомогательного глагола: *Do you…? Does it…? Did they…? Is it…? Can we…?* Вопросительное слово — перед ним: *What does it return? Why did it fail?*",
    examples:[
      { en:"Does the endpoint return a list or a single object?", ru:"Эндпоинт возвращает список или один объект?" },
      { en:"Why did the deployment fail?", ru:"Почему деплой упал?" },
      { en:"How many replicas are we running?", ru:"Сколько реплик у нас запущено?" }
    ],
    traps:["«What it returns?» — по-русски порядок сохраняется, по-английски нужен does: What does it return?",
           "«You have tested it?» — с интонацией сойдёт в разговоре, но на собесе звучит небрежно: Have you tested it?",
           "«Why the build failed?» — Why did the build fail?"],
    ex:[
      { t:"fix", q:"What the method returns?", o:["What does the method return?","What does method return?","What returns the method?"], a:0, why:"Вспомогательный does — сразу после вопросительного слова, глагол в начальной форме. И method здесь конкретный — с артиклем." },
      { t:"fix", q:"Why the tests failed on CI?", o:["Why did the tests fail on CI?","Why the tests did fail on CI?","Why did the tests failed on CI?"], a:0, why:"Why did + начальная форма fail." },
      { t:"gap", q:"___ the service support retries?", o:["Does","Do","Is"], a:0, why:"the service — третье лицо: Does." },
      { t:"gap", q:"How long ___ the migration take?", o:["did","does it","was"], a:0, why:"Про прошлое: How long did … take?" }
    ]},

  { id:"a2-quantity", title:"much, many, a lot of, few, little",
    rule:"*many / few* — исчисляемое (requests, bugs, nodes). *much / little* — неисчисляемое (memory, time, data). *A lot of* — и то и другое, в утверждениях звучит естественнее всего.",
    examples:[
      { en:"We have too many open connections and too little memory.", ru:"У нас слишком много открытых соединений и слишком мало памяти." },
      { en:"How much data do we store per user?", ru:"Сколько данных мы храним на пользователя?" },
      { en:"There are a lot of edge cases here.", ru:"Здесь много граничных случаев." }
    ],
    traps:["«many data» — data в обычной речи неисчисляемое: much data, a lot of data.",
           "«much requests» — requests считаются: many requests.",
           "«few» и «a few» — разное: few bugs = почти нет (плохо), a few bugs = несколько (нормально)."],
    ex:[
      { t:"gap", q:"How ___ memory does the JVM need?", o:["much","many","a lot"], a:0, why:"memory — неисчисляемое: much." },
      { t:"gap", q:"Too ___ requests hit the database at once.", o:["many","much","little"], a:0, why:"requests считаются: many." },
      { t:"fix", q:"We don't have many time before the release.", o:["We don't have much time before the release.","We don't have many times before the release.","We don't have a lot time before the release."], a:0, why:"time — неисчисляемое: much time." },
      { t:"gap", q:"There were ___ edge cases we hadn't thought of — three or four.", o:["a few","few","little"], a:0, why:"Несколько штук — a few. «Few» значило бы «почти не было»." }
    ]}
  ]},

{ id:"B1", name:"B1 · рассказ о себе", about:"Уровень, на котором рассказывают про опыт и проект. Главная тема — Present Perfect: по нему видно, учил ли человек английский или только читал документацию.",
  topics:[

  { id:"b1-perfect", title:"Present Perfect и Past Simple",
    rule:"*Present Perfect* (have + done) — результат важен сейчас, опыт вообще, период не закончился: I've worked here for three years. *Past Simple* — законченное время названо или подразумевается: I worked at X from 2018 to 2021.",
    examples:[
      { en:"I've worked at the bank for three years.", ru:"Я работаю в банке три года. — и продолжаю." },
      { en:"I worked at a startup before that, from 2018 to 2021.", ru:"До этого я работал в стартапе, с 2018 по 2021. — закончено." },
      { en:"We've just fixed the leak, so memory should stabilise.", ru:"Мы только что починили утечку, так что память должна стабилизироваться. — результат сейчас." },
      { en:"Have you ever used Quarkus? — Yes, I used it on my last project.", ru:"Пользовался Quarkus? — Да, на прошлом проекте. — опыт вообще → конкретный случай." }
    ],
    traps:["«I work here since 2020» — самая громкая русская ошибка. I've worked here since 2020.",
           "«I have deployed it yesterday» — названо время: I deployed it yesterday.",
           "После «when?» — всегда Past Simple: When did you join? Не «when have you joined»."],
    ex:[
      { t:"fix", q:"I work at this company since 2021.", o:["I've worked at this company since 2021.","I worked at this company since 2021.","I am working at this company since 2021."], a:0, why:"Начал в прошлом, продолжаю — Present Perfect + since." },
      { t:"fix", q:"We have released the fix last Friday.", o:["We released the fix last Friday.","We release the fix last Friday.","We released fix last Friday."], a:0, why:"Названо время — Past Simple: released. «Release» — не то время, «released fix» — потерян артикль." },
      { t:"gap", q:"I ___ Kafka on two projects, so I know its failure modes.", o:["have used","used","am using"], a:0, why:"Опыт, важный сейчас, без конкретного времени — Present Perfect." },
      { t:"gap", q:"When ___ the team ___ to Kubernetes?", o:["did … move","has … moved","was … move"], a:0, why:"После when — Past Simple: When did the team move?" },
      { t:"gap", q:"The migration ___ — you can switch traffic now.", o:["has finished","finished","is finished since"], a:0, why:"Результат сейчас: has finished. Past Simple тоже грамматичен, но «you can switch now» тянет к Perfect." }
    ]},

  { id:"b1-since-for", title:"since, for, ago, during",
    rule:"*since* + точка: since 2020, since Monday. *for* + длительность: for three years. *ago* — назад, только с Past Simple: two years ago. *during* + событие: during the migration.",
    examples:[
      { en:"I've been on this team for two years, since the reorg.", ru:"Я в этой команде два года, с реорганизации." },
      { en:"We migrated to Postgres three years ago.", ru:"Мы перешли на Postgres три года назад." },
      { en:"The outage happened during the deployment.", ru:"Сбой случился во время деплоя." }
    ],
    traps:["«since three years» — since только с точкой: for three years / since 2022.",
           "«before two years» — по-русски «два года назад», по-английски two years ago.",
           "«during three hours» — during с событием, длительность — for: for three hours."],
    ex:[
      { t:"gap", q:"I've been a team lead ___ last spring.", o:["since","for","ago"], a:0, why:"Точка во времени — since." },
      { t:"gap", q:"We've run this in production ___ eighteen months.", o:["for","in","during"], a:0, why:"Длительность — for. «In eighteen months» значило бы «через полтора года»; during — с событием, а не со сроком." },
      { t:"fix", q:"I joined the company before four years.", o:["I joined the company four years ago.","I joined the company four years.","I joined company since four years."], a:0, why:"«Назад» — ago, и с ним Past Simple. Без ago фраза не закончена; since — только с точкой во времени." },
      { t:"gap", q:"The database was locked ___ the backup.", o:["during","for","while"], a:0, why:"Во время события — during. While — с целым предложением: while the backup was running." }
    ]},

  { id:"b1-future", title:"will, going to, Present Continuous о будущем",
    rule:"*will* — решение прямо сейчас, обещание, прогноз: I'll take a look. *going to* — намерение или очевидное по признакам: it's going to fail. *Present Continuous* — договорённость с датой: we're deploying on Friday.",
    examples:[
      { en:"I'll look into it after this call.", ru:"Посмотрю после созвона. — решил сейчас." },
      { en:"We're going to split the monolith next quarter.", ru:"Мы собираемся распилить монолит в следующем квартале. — план." },
      { en:"We're releasing on Thursday.", ru:"Релизимся в четверг. — назначено." },
      { en:"Look at the memory graph — it's going to crash.", ru:"Посмотри на график памяти — сейчас упадёт. — по признакам." }
    ],
    traps:["«I will to check» — после will начальная форма без to.",
           "«When we will deploy…» — в придаточных времени will не ставят: when we deploy, if it fails, after we merge.",
           "«I am going to be check» — going to + начальная форма: going to check."],
    ex:[
      { t:"gap", q:"— The build is red. — Okay, I ___ take a look.", o:["'ll","'m going to","'m taking"], a:0, why:"Решение в момент разговора — will." },
      { t:"gap", q:"We ___ the new version on Tuesday — it's already on the calendar.", o:["are releasing","will release","release"], a:0, why:"Назначено на дату — Present Continuous. Will тоже возможен, но слабее." },
      { t:"fix", q:"When we will migrate, we will need a maintenance window.", o:["When we migrate, we'll need a maintenance window.","When we will migrate, we need a maintenance window.","When we migrating, we will need a maintenance window."], a:0, why:"В придаточном времени — Present Simple: when we migrate." },
      { t:"gap", q:"The disk is at 98% — it ___ run out tonight.", o:["is going to","will be","is"], a:0, why:"Очевидно по признакам — going to." }
    ]},

  { id:"b1-modals", title:"can, could, should, must, have to",
    rule:"*can* — умею/можно; *could* — мягче или в прошлом; *should* — совет; *must* — сильная необходимость от говорящего; *have to* — внешнее требование. После всех — начальная форма без *to*, кроме have to.",
    examples:[
      { en:"You should add an index on user_id.", ru:"Стоит добавить индекс по user_id." },
      { en:"We have to keep the API backward-compatible — clients can't update.", ru:"Мы обязаны держать API обратно совместимым — клиенты не могут обновиться." },
      { en:"It could be a race condition, but I'm not sure yet.", ru:"Может быть гонка, но пока не уверен." }
    ],
    traps:["«must to», «should to», «can to» — без to. Только have to и need to.",
           "«mustn't» — нельзя, «don't have to» — не обязательно. Разница огромная: you mustn't delete prod / you don't have to delete the logs.",
           "«I can to do» — I can do."],
    ex:[
      { t:"fix", q:"We must to restart the pod after the config change.", o:["We must restart the pod after the config change.","We must to restarting the pod after the config change.","We have restart the pod after the config change."], a:0, why:"must + начальная форма без to." },
      { t:"gap", q:"You ___ commit secrets to the repo — that's a policy.", o:["mustn't","must","don't have to"], a:0, why:"Запрет — mustn't. «Must» — наоборот, обязанность; «don't have to» — «не обязательно», а это политика." },
      { t:"gap", q:"We ___ upgrade Java — the old version goes out of support in June.", o:["have to","must to","can"], a:0, why:"Внешнее требование, срок — have to." },
      { t:"gap", q:"It ___ be a network issue rather than a bug.", o:["could","can to","should to"], a:0, why:"Предположение — could." }
    ]},

  { id:"b1-uncountable", title:"Неисчисляемое в техречи",
    rule:"Без множественного числа и без *a*: *advice, feedback, information, research, experience* (как опыт), *software, hardware, code, data, progress, knowledge, work*. Считают через *a piece of / some / a lot of*.",
    examples:[
      { en:"Can I get some feedback on the design?", ru:"Можно получить фидбек по дизайну?" },
      { en:"One piece of advice: don't shard until you have to.", ru:"Один совет: не шардируй, пока не придётся." },
      { en:"I have experience with Kafka, but not with Pulsar.", ru:"У меня есть опыт с Kafka, но не с Pulsar." }
    ],
    traps:["«an advice», «advices» — a piece of advice, some advice.",
           "«softwares», «hardwares» — всегда единственное.",
           "«experiences» есть, но значит «случаи из жизни». Опыт как навык — experience без -s.",
           "«a research» — some research, a study."],
    ex:[
      { t:"fix", q:"He gave me a good advice about indexes.", o:["He gave me some good advice about indexes.","He gave me a good advices about indexes.","He gave me good advices about indexes."], a:0, why:"advice — неисчисляемое: some advice, a piece of advice." },
      { t:"fix", q:"We got a lot of feedbacks after the demo.", o:["We got a lot of feedback after the demo.","We got a lot of feedbackes after the demo.","We got many feedback after the demo."], a:0, why:"feedback без -s; many — только с исчисляемыми." },
      { t:"gap", q:"I have three years of ___ with Spring Boot.", o:["experience","experiences","an experience"], a:0, why:"Опыт как навык — experience без артикля и -s." },
      { t:"gap", q:"How much ___ do we need to store per event?", o:["data","datas","a data"], a:0, why:"data — неисчисляемое в обычной речи: much data." }
    ]},

  { id:"b1-prepositions", title:"Предлоги после глаголов",
    rule:"Запоминаются парами: *depend on, responsible for, interested in, consist of, listen to, wait for, agree with, focus on, apologise for, explain to*. И глаголы без предлога: *discuss, enter, reach, answer*.",
    examples:[
      { en:"The result depends on the cache hit rate.", ru:"Результат зависит от доли попаданий в кэш." },
      { en:"I'm responsible for the order service.", ru:"Я отвечаю за сервис ордеров." },
      { en:"Let's discuss the schema tomorrow.", ru:"Обсудим схему завтра. — без about." }
    ],
    traps:["«depend from» — калька с «зависит от». Depend on.",
           "«discuss about» — discuss без предлога. Talk about, но discuss the plan.",
           "«responsible of» — responsible for.",
           "«explain me» — explain to me / explain it to me."],
    ex:[
      { t:"fix", q:"Latency depends from the region.", o:["Latency depends on the region.","Latency depends of the region.","Latency depends by the region."], a:0, why:"depend on." },
      { t:"fix", q:"We discussed about the migration for an hour.", o:["We discussed the migration for an hour.","We discussed on the migration for an hour.","We were discussing about the migration for an hour."], a:0, why:"discuss — без предлога." },
      { t:"gap", q:"Who is responsible ___ the payment gateway?", o:["for","of","about"], a:0, why:"responsible for. «Of» и «about» — кальки с русского «ответственный о, про»." },
      { t:"fix", q:"Can you explain me how the retry works?", o:["Can you explain to me how the retry works?","Can you explain me how does the retry work?","Can you explain for me how the retry works?"], a:0, why:"explain to someone. Вариант с «how does» ещё и ломает порядок слов в косвенном вопросе." }
    ]}
  ]},

{ id:"B2", name:"B2 · объяснить решение", about:"Уровень, на котором объясняют компромисс, не соглашаются и не звучат резко. Условные предложения и мягкие модальные — половина всех фраз в системном дизайне.",
  topics:[

  { id:"b2-conditionals", title:"Условные: if we add… / if we used… / if we had used…",
    rule:"*1-й тип* — реальный план: if we add a cache, reads *will* be faster. *2-й* — гипотеза сейчас: if we *used* a queue, we *would* decouple the services. *3-й* — что было бы в прошлом: if we *had used* an outbox, we *wouldn't have lost* the events.",
    examples:[
      { en:"If we add a read replica, the write load won't change.", ru:"Если добавим реплику на чтение, нагрузка на запись не изменится." },
      { en:"If we used a queue here, the producer wouldn't block.", ru:"Если бы мы использовали очередь, продюсер не блокировался бы." },
      { en:"If we'd had an outbox, we wouldn't have lost those events.", ru:"Будь у нас outbox, мы бы не потеряли те события." }
    ],
    traps:["«If we will add» — в if-части will не ставят: if we add.",
           "«If we would use» — would только в главной части: if we used…, we would….",
           "«If we would have used» — if we had used."],
    ex:[
      { t:"fix", q:"If we will add caching, the latency will drop.", o:["If we add caching, the latency will drop.","If we add caching, the latency drop.","If we adds caching, latency will drop."], a:0, why:"В if-части — Present Simple, в главной — will + глагол. «The latency drop» — потерян will, «we adds» — не то лицо." },
      { t:"gap", q:"If we ___ Kafka instead of RabbitMQ, we could replay events.", o:["used","would use","will use"], a:0, why:"Гипотеза о настоящем — Past Simple в if-части, could/would в главной." },
      { t:"gap", q:"If the alert ___ on absence of events, we would have caught it in an hour.", o:["had fired","fired","would fire"], a:0, why:"Про прошлое — had + done в if-части." },
      { t:"fix", q:"If I would be you, I would start with the outbox.", o:["If I were you, I would start with the outbox.","If I was be you, I would start with the outbox.","If I would you, I start with the outbox."], a:0, why:"Устойчивое if I were you. Would — только в главной части." }
    ]},

  { id:"b2-passive", title:"Страдательный залог в техречи",
    rule:"*be + done*: the request *is validated*, the bug *was introduced*, the data *has been migrated*. Уместен, когда важен объект, а не кто сделал. Не заменяет активный залог там, где деятель важен: «I introduced the bug» честнее, чем «the bug was introduced».",
    examples:[
      { en:"Each request is validated, then persisted, then acknowledged.", ru:"Каждый запрос валидируется, потом сохраняется, потом подтверждается." },
      { en:"The regression was introduced in last week's release.", ru:"Регрессия появилась в релизе прошлой недели." },
      { en:"The old records have been archived; the table is 40% smaller.", ru:"Старые записи заархивированы; таблица меньше на 40%." }
    ],
    traps:["«It is depends on» — либо it depends on, либо it is dependent on. Не смешивать.",
           "«The service was crashed» — crash непереходный: the service crashed.",
           "«Was happened» — happen непереходный: it happened."],
    ex:[
      { t:"fix", q:"The choice is depends on the workload.", o:["The choice depends on the workload.","The choice is depend on the workload.","The choice is depending of the workload."], a:0, why:"Активный глагол depends, без is." },
      { t:"gap", q:"The events ___ to the dead-letter queue after three failed attempts.", o:["are moved","are move","moved are"], a:0, why:"Пассив: are moved." },
      { t:"fix", q:"The pod was crashed twice last night.", o:["The pod crashed twice last night.","The pod was crashing twice last night.","The pod has crashed twice last night."], a:0, why:"crash — непереходный глагол, без пассива. Perfect не годится: названо время." },
      { t:"gap", q:"The schema ___ since the last audit — here's the diff.", o:["has been changed","was changed","is changed"], a:0, why:"Результат к настоящему моменту, since — Present Perfect Passive." }
    ]},

  { id:"b2-hedging", title:"Мягкие формы: would, might, could, tend to, seem",
    rule:"Категоричное «this is wrong» на собесе звучит как вызов. Смягчают: *I'd argue…, that might be…, it could cause…, it tends to…, it seems that…*. Мягче — не значит неуверенно: мысль та же, тон переговорный.",
    examples:[
      { en:"I'd argue the queue is unnecessary at this scale.", ru:"Я бы сказал, что очередь на этом масштабе не нужна." },
      { en:"That might become a bottleneck under load.", ru:"Это может стать узким местом под нагрузкой." },
      { en:"Distributed transactions tend to cause more problems than they solve.", ru:"Распределённые транзакции обычно создают больше проблем, чем решают." }
    ],
    traps:["«I think it's wrong» — грамматически верно, но резко. I'd say / I'm not sure that…",
           "«may be» и «maybe» — разное: it may be a leak (глагол) / maybe it's a leak (наречие).",
           "«It seems to be like» — it seems like / it seems to be."],
    ex:[
      { t:"gap", q:"I ___ that a single database is enough here.", o:["'d argue","argue strongly","am arguing"], a:0, why:"Мягкое утверждение — I'd argue." },
      { t:"gap", q:"Sharding at this stage ___ premature.", o:["seems","seem","is seeming"], a:0, why:"seems + прилагательное; sharding — единственное число, нужен -s. Seem — глагол состояния, без Continuous." },
      { t:"fix", q:"May be it's a connection pool problem.", o:["Maybe it's a connection pool problem.","May be it is a connection pool problem.","It may be maybe a connection pool problem."], a:0, why:"Наречие «возможно» — maybe одним словом." },
      { t:"gap", q:"Hot keys ___ to concentrate on a single shard.", o:["tend","are tending","tends"], a:0, why:"Обычно так бывает — tend to; keys — множественное, без -s." }
    ]},

  { id:"b2-relative", title:"which, that, who, where, whose",
    rule:"*that/which* — про вещи, *who* — про людей, *where* — про место, *whose* — чей. После них местоимение не повторяется: the service that handles payments — не «that it handles».",
    examples:[
      { en:"The service that handles payments runs on three nodes.", ru:"Сервис, который обрабатывает платежи, работает на трёх узлах." },
      { en:"The engineer who wrote it has left the team.", ru:"Инженер, который это написал, ушёл из команды." },
      { en:"The table whose index we dropped is the slow one.", ru:"Таблица, чей индекс мы удалили, и есть медленная." }
    ],
    traps:["«The service which it handles» — калька с «который он». Местоимение не дублируется.",
           "«The team which built it» — про людей who. Which — только про вещи.",
           "«The place where we store it in» — where уже включает «в»: where we store it."],
    ex:[
      { t:"fix", q:"The consumer which it reads from the topic is slow.", o:["The consumer that reads from the topic is slow.","The consumer which it is reading the topic is slow.","The consumer who reads from the topic is slow."], a:0, why:"Местоимение it лишнее. Who — только про людей." },
      { t:"gap", q:"The colleague ___ reviewed my PR suggested a simpler approach.", o:["who","he","which"], a:0, why:"Про человека — who. Местоимение he связку не заменяет, а which — только про вещи." },
      { t:"gap", q:"This is the bucket ___ we keep the raw exports.", o:["where","which","that"], a:0, why:"Место — where; иначе нужно «in which»." },
      { t:"fix", q:"The team who's code we inherited had no tests.", o:["The team whose code we inherited had no tests.","The team which code we inherited had no tests.","The team who code we inherited had no tests."], a:0, why:"Чей — whose. Who's = who is." }
    ]},

  { id:"b2-linking", title:"Связки: although, whereas, therefore, so that, in order to",
    rule:"*Although / even though* — уступка, с целым предложением. *Despite / in spite of* — то же, но с существительным. *Whereas* — противопоставление. *Therefore / so* — вывод. *So that* — цель с предложением, *in order to* — цель с глаголом.",
    examples:[
      { en:"Although Redis is fast, it's one more system to operate.", ru:"Хотя Redis быстрый, это ещё одна система на поддержке." },
      { en:"Despite the cache, p99 is still above the SLA.", ru:"Несмотря на кэш, p99 всё ещё выше SLA." },
      { en:"We batch the writes so that the database isn't hammered.", ru:"Мы группируем записи, чтобы не долбить базу." }
    ],
    traps:["«despite of» — despite без of. In spite of — с of.",
           "«in spite that» — in spite of the fact that, или просто although.",
           "«however» между частями через запятую — нельзя. Точка или точка с запятой: …is fast. However, ….",
           "«for to» — in order to / to."],
    ex:[
      { t:"fix", q:"Despite of the retries, some messages were lost.", o:["Despite the retries, some messages were lost.","Despite of retries, some message were lost.","In spite the retries, some messages were lost."], a:0, why:"despite без of; in spite of — с of." },
      { t:"gap", q:"Postgres gives us transactions, ___ Cassandra gives us write throughput.", o:["whereas","so","as"], a:0, why:"Противопоставление двух — whereas. «So» — вывод, «as» — причина: логика фразы ломается." },
      { t:"gap", q:"We added the outbox ___ events are never lost.", o:["so that","for that","in order"], a:0, why:"Цель с целым предложением — so that." },
      { t:"fix", q:"The cache is fast, however, it can serve stale data.", o:["The cache is fast; however, it can serve stale data.","The cache is fast however it can serve stale data.","The cache is fast, however it can serve stale data."], a:0, why:"however — не союз; между предложениями нужна точка или точка с запятой." }
    ]},

  { id:"b2-indirect", title:"Косвенный вопрос — вежливый вопрос",
    rule:"После *Could you tell me…, I wonder…, Do you know…* порядок слов прямой, как в утверждении: Could you tell me what the SLA *is*? Не «what is the SLA».",
    examples:[
      { en:"Could you tell me what the expected throughput is?", ru:"Не подскажете, какая ожидается пропускная способность?" },
      { en:"I'm wondering whether we need strong consistency here.", ru:"Интересно, нужна ли здесь строгая согласованность." },
      { en:"Do you know how many consumers are attached?", ru:"Вы знаете, сколько подключено потребителей?" }
    ],
    traps:["«Could you tell me what is the SLA?» — инверсия только в прямом вопросе. What the SLA is.",
           "«I wonder if it works or not» — whether … or not; с if «or not» в конец не ставят.",
           "«Do you know does it retry?» — Do you know whether it retries?"],
    ex:[
      { t:"fix", q:"Could you tell me how does the retry work?", o:["Could you tell me how the retry works?","Could you tell me how the retry does work?","Could you tell me how works the retry?"], a:0, why:"Косвенный вопрос — прямой порядок: how the retry works." },
      { t:"gap", q:"I'm not sure ___ the cache is invalidated on write.", o:["whether","does","if does"], a:0, why:"Косвенный да/нет-вопрос — whether (или if), дальше прямой порядок." },
      { t:"fix", q:"Do you know what time is the deploy?", o:["Do you know what time the deploy is?","Do you know what time the deploy?","Do you know when is the deploy?"], a:0, why:"Косвенный вопрос — прямой порядок: what time the deploy is. Глагол нельзя ни терять, ни переставлять вперёд." }
    ]}
  ]},

{ id:"C1", name:"C1 · звучать как сеньор", about:"Тут не про ошибки, а про точность: слово, которое значит не то, что кажется; ударение на главном; ровно та степень уверенности, какая есть.",
  topics:[

  { id:"c1-false-friends", title:"Ложные друзья",
    rule:"Похоже на русское — значит другое. *actual* = фактический, не «актуальный» (current, relevant). *eventually* = в конце концов, не «возможно» (possibly). *control* = управлять, не «проверять» (check). *accurate* = точный, не «аккуратный» (careful, neat). *decade* = десять лет, не «декада». *data* — уже множественное.",
    examples:[
      { en:"What's the current version in production?", ru:"Какая версия сейчас в проде? «Actual version» значило бы «фактическая» — это другой вопрос." },
      { en:"The job eventually finished — after four hours.", ru:"Задача в конце концов завершилась — через четыре часа. Не «возможно»." },
      { en:"Let me check the logs.", ru:"Дай проверю логи. «Control the logs» — «управлять логами», бессмыслица." }
    ],
    traps:["«actual problem» = реальная проблема. «Актуальная» — current, pressing, relevant.",
           "«magazine» — журнал, а не магазин (shop, store). «Fabric» — ткань, не фабрика (factory).",
           "«pretend» — притворяться, не «претендовать» (apply for, claim).",
           "«sympathetic» — сочувствующий, не «симпатичный» (nice, likeable)."],
    ex:[
      { t:"fix", q:"Is this the actual version of the API?", o:["Is this the current version of the API?","Is this current version of the API?","Is this the actual version of API?"], a:0, why:"«Актуальная» — current; actual значит «фактическая». И артикли на месте: the current version of the API." },
      { t:"fix", q:"I need to control the config before the deploy.", o:["I need to check the config before the deploy.","I need check the config before the deploy.","I need to make a control of the config before the deploy."], a:0, why:"«Проверить» — check; control значит «управлять», и «make a control» этого не спасает. После need — to." },
      { t:"gap", q:"After three retries the request ___ succeeded.", o:["eventually","possibly","actually"], a:0, why:"В конце концов — eventually. Не «возможно»." },
      { t:"fix", q:"The system has been stable for a decade — since 2016.", o:["The system has been stable for ten years — since 2016.","The system has been stable for a decade — since 2022.","The system has been stable for decade — since 2016."], a:0, why:"Decade — десять лет, и цифры должны сходиться. Ловушка на внимательность: первый вариант просто говорит то же честно." },
      { t:"gap", q:"Be ___ with the numbers — the estimate feeds into the budget.", o:["accurate","neat","tidy"], a:0, why:"Точный — accurate. «Neat» и «tidy» — опрятный: это про внешний вид, а не про цифры." }
    ]},

  { id:"c1-emphasis", title:"Ударение на главном: what matters is…, not only…, it's X that…",
    rule:"*What matters here is the write path.* — cleft-предложение, выносит главное. *Not only does it cost more, but it also…* — инверсия после not only. *It's the cache that saves us, not the index.* — контраст. *Only then did we realise…* — инверсия после only.",
    examples:[
      { en:"What matters here is the write path, not the read path.", ru:"Что здесь важно — путь записи, а не чтения." },
      { en:"Not only does it add latency, but it also doubles the cost.", ru:"Мало того что добавляет задержку, так ещё и удваивает стоимость." },
      { en:"It's the outbox that guarantees delivery, not the broker.", ru:"Доставку гарантирует именно outbox, а не брокер." }
    ],
    traps:["«Not only it adds latency» — после not only в начале нужна инверсия: not only does it add.",
           "«What is matters» — what matters, без is перед глаголом.",
           "Три таких конструкции подряд — уже пафос. Одна на ответ."],
    ex:[
      { t:"fix", q:"Not only it costs more, but it's also slower.", o:["Not only does it cost more, but it's also slower.","Not only it does cost more, but it's also slower.","Not only costs it more, but also it's slower."], a:0, why:"Инверсия: not only does it cost." },
      { t:"gap", q:"___ matters is whether the consumer is idempotent.", o:["What","That","Which"], a:0, why:"Cleft-предложение — what matters is…" },
      { t:"gap", q:"It's the retry storm ___ took the database down, not the traffic.", o:["that","what","which it"], a:0, why:"It's X that… — контраст." },
      { t:"gap", q:"Only after the incident ___ we add alerting on missing events.", o:["did","was","we did"], a:0, why:"После only + обстоятельство — инверсия: did we add. «Was» — не тот вспомогательный, «we did» — без инверсии." }
    ]},

  { id:"c1-concise", title:"Сильные глаголы вместо «make a decision»",
    rule:"*We made a decision* → *we decided*. *Perform an analysis* → *analyse*. *Give consideration to* → *consider*. Существительное на месте глагола удлиняет и обезличивает; на собесе ценят прямую речь. Исключение — формальный текст, где «the introduction of the outbox» уместно.",
    examples:[
      { en:"We decided to keep the monolith for another year.", ru:"Мы решили оставить монолит ещё на год. — не «made a decision to keep»." },
      { en:"I analysed the slow queries and found two missing indexes.", ru:"Я разобрал медленные запросы и нашёл два недостающих индекса." },
      { en:"We need to agree on the boundaries first.", ru:"Сначала нужно договориться о границах. — не «reach an agreement»." }
    ],
    traps:["«do a research» — research (глагол) или do some research.",
           "«make a test of» — test.",
           "«have a discussion about» — discuss.",
           "«in the process of doing» — обычно просто doing."],
    ex:[
      { t:"fix", q:"We made an analysis of the traffic and took the decision to shard.", o:["We analysed the traffic and decided to shard.","We made analysis of the traffic and decided to shard.","We did an analysing of the traffic and made decision to shard."], a:0, why:"Два сильных глагола вместо двух конструкций с существительными." },
      { t:"fix", q:"I am in the process of doing a refactoring of the service.", o:["I'm refactoring the service.","I am in process of refactoring the service.","I'm doing a refactor to the service."], a:0, why:"Всё лишнее убрано: I'm refactoring." },
      { t:"gap", q:"Let's ___ the options before we commit to one.", o:["compare","make a comparison of","do the comparing of"], a:0, why:"Глагол compare — короче и прямее." },
      { t:"fix", q:"We had a discussion about the schema and reached an agreement.", o:["We discussed the schema and agreed.","We had discussion about schema and reached agreement.","We discussed about the schema and agreed on."], a:0, why:"discuss (без about) и agree." }
    ]},

  { id:"c1-precision", title:"Точная степень уверенности",
    rule:"У сеньора три регистра. Уверен: *clearly, it's certain that, there's no doubt*. Почти: *arguably, in most cases, as far as I can tell, it's likely that*. Не уверен: *to some extent, it's not entirely clear, I suspect, that said*. Ошибка — говорить всё одним регистром.",
    examples:[
      { en:"As far as I can tell, the leak is in the connection pool.", ru:"Насколько могу судить, утечка в пуле соединений. — почти уверен." },
      { en:"Arguably, a single Postgres would carry this load.", ru:"Можно утверждать, что один Postgres вывез бы эту нагрузку. — мнение, готов спорить." },
      { en:"That said, I haven't measured it under peak.", ru:"При этом под пиком я это не мерил. — оговорка." }
    ],
    traps:["«I am sure» на всё подряд — собеседник перестаёт верить.",
           "«I think» на всё подряд — звучит как неуверенность во всём.",
           "«To be honest» перед каждой фразой — намекает, что остальное было нечестно.",
           "«Actually» как слово-паразит в начале — раздражает, если не противопоставление."],
    ex:[
      { t:"gap", q:"___, the second-level cache is doing more harm than good here.", o:["Arguably","Argue","Definitely and certainly"], a:0, why:"Спорное мнение, готов обсуждать — arguably. «Argue» — глагол, вводным словом не работает; «definitely and certainly» — противоположный регистр." },
      { t:"gap", q:"The fix works, ___ I've only tested it on staging.", o:["that said","however that","but also"], a:0, why:"Оговорка после утверждения — that said." },
      { t:"gap", q:"It's ___ whether the broker or the consumer dropped the message.", o:["not entirely clear","not clear entirely","clearly unclear"], a:0, why:"Честное «не знаю точно» — it's not entirely clear." },
      { t:"fix", q:"To be honest, I think that to be honest it's a race condition.", o:["I suspect it's a race condition.","I suspect its a race condition.","I am suspect a race condition."], a:0, why:"Одна форма неуверенности: I suspect. «Its» без апострофа — притяжательное, а «I am suspect» значило бы «я под подозрением»." }
    ]},

  { id:"c1-phrasal", title:"Фразовые глаголы инженера",
    rule:"Их не переводят по частям. *roll out* — выкатить, *roll back* — откатить, *scale out* — добавить узлов, *scale up* — усилить узел, *spin up* — поднять, *tear down* — снести, *fall back to* — перейти на запасное, *back off* — отступить с задержкой, *narrow down* — сузить, *rule out* — исключить, *figure out* — разобраться, *work around* — обойти.",
    examples:[
      { en:"We rolled out the change to 5% of traffic, then rolled it back.", ru:"Выкатили изменение на 5% трафика, потом откатили." },
      { en:"If Redis is down, we fall back to the database.", ru:"Если Redis лежит, переходим на базу." },
      { en:"I narrowed it down to the serialiser and ruled out the network.", ru:"Сузил до сериализатора и исключил сеть." }
    ],
    traps:["«scale up» и «scale out» — разное: up = мощнее машина, out = больше машин.",
           "«back off» — не «отстань» в техречи, а экспоненциальная задержка между попытками.",
           "«work around» (глагол) и «workaround» (существительное) — раздельно и слитно."],
    ex:[
      { t:"gap", q:"Rather than a bigger box, let's ___ — add two more nodes.", o:["scale out","scale up","spin down"], a:0, why:"Больше узлов — scale out." },
      { t:"gap", q:"The client should ___ exponentially between retries.", o:["back off","fall back","roll back"], a:0, why:"Задержка между попытками — back off." },
      { t:"gap", q:"We ___ the network as a cause — the packets all arrive.", o:["ruled out","figured out","narrowed down"], a:0, why:"Исключить причину — rule out." },
      { t:"fix", q:"We found a work around for the driver bug.", o:["We found a workaround for the driver bug.","We found workaround for the driver bug.","We found a working around for the driver bug."], a:0, why:"Существительное — слитно и с артиклем: a workaround. Формы «a working around» не существует." },
      { t:"gap", q:"Can you ___ a test environment for the demo?", o:["spin up","roll out","tear down"], a:0, why:"Поднять окружение — spin up." }
    ]}
  ]}

]};

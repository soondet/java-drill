/* Раскрытие термина: иконка+аналогия+мини-картинка. */
window.TERM_EXTRA = {
 "Java|equals()": {
  "icon": "⚖️",
  "hook": "Два паспорта: == проверяет, что это одна и та же бумажка, equals() — что данные внутри совпадают.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">a==b</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">ref</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">a.equals(b)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">сути</div></div>"
 },
 "Java|hashCode()": {
  "icon": "🔖",
  "hook": "Номерок в гардеробе: по нему быстро находят ячейку. Сменил equals — обнови и номерок, иначе вещь потеряется.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">obj</div><div class=\"fp-arrow\">→</div><div class=\"fp-val\">7321</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">bucket</div></div>"
 },
 "Java|Дженерики (Generics)": {
  "icon": "📦",
  "hook": "Коробка с этикеткой «только носки»: положить кружку не даст уже на упаковке, а не когда вытащишь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">List</div><div class=\"fp-token\">String</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">\"hi\"</div><div class=\"fp-box bad\">42</div></div>"
 },
 "Java|Type erasure": {
  "icon": "🫥",
  "hook": "Этикетка «носки» отклеивается на выходе из цеха: в коробке уже не видно, что лежало — все коробки на вид одинаковы.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">List&lt;String&gt;</div><div class=\"fp-box acc\">List&lt;Int&gt;</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">List</div></div>"
 },
 "Java|Wildcard ? extends": {
  "icon": "🪣",
  "hook": "Из ведра «фрукты или ниже» только черпаешь (extends), в «фрукты или выше» только доливаешь (super). PECS.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">? extends</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">читать</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">? super</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">писать</div></div>"
 },
 "Java|Stream": {
  "icon": "🏭",
  "hook": "Конвейер: фильтр-станок, покрасочный-станок, упаковка. Лента не двинется, пока не нажмёшь «упаковать».",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">filter</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">map</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">collect</div></div>"
 },
 "Java|Terminal operation": {
  "icon": "🏁",
  "hook": "Кнопка «Пуск» в конце конвейера: пока не нажал collect/count — станки стоят, результата нет.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">…</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">collect</div><div class=\"fp-arrow\">→</div><div class=\"fp-val\">42</div></div>"
 },
 "Java|Optional": {
  "icon": "🎁",
  "hook": "Коробка Шрёдингера: внутри либо подарок, либо честная пустота. Открываешь аккуратно — не порежешься о null.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">Some(x)</div><div class=\"fp-box bad\">empty</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">безNPE</div></div>"
 },
 "Java|Checked exception": {
  "icon": "🚧",
  "hook": "Знак на дороге: «впереди возможна яма» — обязан или объехать (catch), или повесить табличку дальше (throws).",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad\">IOException</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">catch</div><div class=\"fp-box acc\">throws</div></div>"
 },
 "Java|Unchecked exception": {
  "icon": "💥",
  "hook": "Скользкий пол без знака: никто не предупредил — упал в рантайме. Обычно это твой косяк в коде.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">NPE</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">runtime</div><div class=\"fp-token\">bug</div></div>"
 },
 "Java|try-with-resources": {
  "icon": "🚰",
  "hook": "Кран с автодоводчиком: вышел из комнаты — вода сама закрылась. Файл/сокет закроются после блока сами.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">open</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">use</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">close✓</div></div>"
 },
 "Java|finally": {
  "icon": "🧹",
  "hook": "Уборщик в конце смены: пожар или штиль — он всё равно выключит свет и закроет дверь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">ok</div><div class=\"fp-box bad\">throw</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">finally</div></div>"
 },
 "Java|Immutable": {
  "icon": "🧊",
  "hook": "Как фото в рамке под стеклом: снято — и уже не перерисуешь, только новое сделать.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">val</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">✏️🚫</div></div>"
 },
 "Java|final": {
  "icon": "🔒",
  "hook": "Замок на три двери: переменную не переставить, метод не переписать, класс не пристроить.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">var🔒</div><div class=\"fp-box\">метод🔒</div><div class=\"fp-box\">class🔒</div></div>"
 },
 "Java|Autoboxing": {
  "icon": "📦",
  "hook": "Как пакетик для конфетки: int кладут в Integer и достают сами; в цикле — гора мусора.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">int</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">Integer</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">int</div></div>"
 },
 "JVM|Heap": {
  "icon": "🗄️",
  "hook": "Общий склад на всех: туда летят new-объекты, и он первым забивается под завязку.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">obj</div><div class=\"fp-box acc\">obj</div><div class=\"fp-box acc\">obj</div><span class=\"fp-tag\">GC</span></div>"
 },
 "JVM|Stack": {
  "icon": "🥞",
  "hook": "Стопка тарелок у каждого потока: вызвал метод — кладёшь, вышел — снимаешь, сама прибирается.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box\">f3</div><div class=\"fp-box\">f2</div><div class=\"fp-box mut\">f1</div></div>"
 },
 "JVM|Metaspace": {
  "icon": "📐",
  "hook": "Каморка с чертежами классов отдельно от склада; набил классов — и она лопнет.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">class meta</div><div class=\"fp-bar\"><span style=\"width:85%\"></span></div></div>"
 },
 "JVM|GC": {
  "icon": "🧹",
  "hook": "Робот-уборщик: что ниоткуда не доступно — то мусор, выносит и освобождает склад.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad\">🗑️</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">free</div></div>"
 },
 "JVM|Young/Old": {
  "icon": "👶",
  "hook": "Ясли и дом престарелых: новички мрут быстро и часто, старожилы живут и редко тревожатся.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">Young</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">Old</div></div>"
 },
 "JVM|Minor GC": {
  "icon": "⚡",
  "hook": "Быстрый веник по яслям: смёл свежий мусор за миг, никто и не заметил.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-g\">Young</div><span class=\"fp-tag\">fast</span></div>"
 },
 "JVM|Full GC": {
  "icon": "🛑",
  "hook": "Генеральная уборка всего дома с паузой: долго, тяжело, частая — звоночек беды.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">Full heap</div><span class=\"fp-tag\">pause</span></div>"
 },
 "JVM|Stop-the-world": {
  "icon": "⏸️",
  "hook": "Стоп-кадр: всех замораживают, пока уборщик спокойно метёт память.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-ver dead\">t1</div><div class=\"fp-ver dead\">t2</div><div class=\"fp-ver dead\">t3</div><div class=\"fp-box mut\">GC</div></div>"
 },
 "JVM|Strong reference": {
  "icon": "🔗",
  "hook": "Держишь за поводок: пока рука держит ссылку — уборщик объект не тронет.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">ref</div><div class=\"fp-conn\">—</div><div class=\"fp-box good\">obj✅</div></div>"
 },
 "JVM|WeakReference": {
  "icon": "🪢",
  "hook": "Стикер на честном слове: дунул ветер (GC) — и нет его, никто не держит.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">obj</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">GC</div></div>"
 },
 "JVM|SoftReference": {
  "icon": "🧽",
  "hook": "Зонт на балконе: лежит, пока место есть; стало тесно — выкинули первым.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">obj</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">RAM low</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">drop</div></div>"
 },
 "JVM|Memory leak": {
  "icon": "💧",
  "hook": "Кран подтекает: вещь не нужна, но за ниточку держишь — ведро heap переполняется.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-bar\"><span style=\"width:40%\"></span></div><div class=\"fp-bar\"><span style=\"width:90%;background:var(--bad)\"></span></div></div>"
 },
 "JVM|OOM": {
  "icon": "💥",
  "hook": "Чемодан лопнул: вещей больше, чем влезает — молния не застёгивается, всё на пол.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-bar\"><span style=\"width:100%;background:var(--bad)\"></span></div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">OOM</div></div>"
 },
 "JVM|GC root": {
  "icon": "⚓",
  "hook": "Якорь у дерева: что свисает с веток — живёт; упало на землю — на свалку.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">root</div><div class=\"fp-conn\"></div><div class=\"fp-box good\">live</div></div>"
 },
 "JVM|Heap dump": {
  "icon": "📸",
  "hook": "Фото холодильника: щёлкнул разом всё — потом дома спокойно ищешь, что место съело.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">heap</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">📄.hprof</div></div>"
 },
 "JVM|Xmx/Xms": {
  "icon": "📏",
  "hook": "Стакан: Xms — сколько налил сразу, Xmx — до краёв, выше не плеснёшь.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">Xms</span><div class=\"fp-bar\"><span style=\"width:30%\"></span></div></div><div class=\"fp-row\"><span class=\"fp-tag\">Xmx</span><div class=\"fp-bar\"><span style=\"width:100%;background:var(--acc)\"></span></div></div></div>"
 },
 "Concurrency|Thread": {
  "icon": "🛤️",
  "hook": "Отдельная дорожка на стадионе: бегунов много, каждый по своей, иногда по очереди.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box acc fp-travel\">T1</div><div class=\"fp-box acc fp-travel\">T2</div></div>"
 },
 "Concurrency|Race condition": {
  "icon": "🏁",
  "hook": "Двое тянутся к последней печеньке: итог зависит от того, чья рука первой.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">T1</div><div class=\"fp-box bad fp-pulse-r\">x</div><div class=\"fp-box acc\">T2</div></div>"
 },
 "Concurrency|volatile": {
  "icon": "📣",
  "hook": "Громкая доска объявлений: один написал — все сразу видят свежее, без старых копий.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">write</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-blink\">all see</div></div>"
 },
 "Concurrency|happens-before": {
  "icon": "➡️",
  "hook": "Сначала налил, потом выпил: если A раньше B, то B точно увидит, что сделал A.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">B</div></div>"
 },
 "Concurrency|synchronized": {
  "icon": "🚪",
  "hook": "Туалет в самолёте: один зашёл, закрыл — остальные ждут в очереди у двери.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">T1</div><div class=\"fp-box acc\">🔒</div><div class=\"fp-box mut\">T2…</div></div>"
 },
 "Concurrency|Lock": {
  "icon": "🔒",
  "hook": "Ключ от туалета в кафе: взял — пользуешься, вернул — следующий заходит.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">🧵</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">🔒</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓</div></div>"
 },
 "Concurrency|Deadlock": {
  "icon": "🤝",
  "hook": "Двое в дверях: каждый ждёт, чтобы другой прошёл первым — и оба стоят навсегда.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">🧵🔒</div><div class=\"fp-conn\"></div><div class=\"fp-box bad\">⏳</div><div class=\"fp-conn\"></div><div class=\"fp-box\">🔒🧵</div></div>"
 },
 "Concurrency|Atomic": {
  "icon": "⚛️",
  "hook": "Турникет в метро: щёлк — и сразу +1, никто не влезет в середину счёта.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-val\">7</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">+1</div><div class=\"fp-arrow\">→</div><div class=\"fp-val\">8</div></div>"
 },
 "Concurrency|Thread pool": {
  "icon": "👷",
  "hook": "Бригада грузчиков на смене: даёшь коробки — а не нанимаешь людей под каждую.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">📋</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">👷</div><div class=\"fp-box acc\">👷</div><div class=\"fp-box acc\">👷</div></div>"
 },
 "Concurrency|ExecutorService": {
  "icon": "🧑‍💼",
  "hook": "Диспетчер такси: кидаешь заказ — он сам отдаёт его свободному водителю.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">task</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">🧑‍💼</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">👷</div></div>"
 },
 "Concurrency|Future": {
  "icon": "🎫",
  "hook": "Номерок в гардеробе: пальто ещё не готово, но по бумажке заберёшь, когда будет.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">🎫</div><div class=\"fp-arrow\">→</div><div class=\"fp-box fp-blink\">⏳</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📦</div></div>"
 },
 "Concurrency|Virtual threads": {
  "icon": "🪶",
  "hook": "Раскладушки вместо коек: спящих можно сложить миллионы, места почти не жрут.",
  "pic": "<div class=\"fp-grid\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on acc\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div>"
 },
 "Concurrency|ConcurrentHashMap": {
  "icon": "🗃️",
  "hook": "Большой шкаф с ячейками: каждый кладёт в свою — толпа не мешает друг другу.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">🧵</div><div class=\"fp-token\">🧵</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🗃️</div></div>"
 },
 "Concurrency|Starvation": {
  "icon": "🍽️",
  "hook": "Скромный в очереди: всех пропускает вперёд и остаётся голодным до закрытия.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">🧵</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">🍽️</div><div class=\"fp-box bad\">✗</div></div>"
 },
 "Spring|DI": {
  "icon": "🔌",
  "hook": "Розетка в стене: лампе не нужно тянуть провод до ТЭЦ — её просто включают.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">🌱Spring</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">🔌</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🧩</div></div>"
 },
 "Spring|Бин (Bean)": {
  "icon": "🧩",
  "hook": "Деталь в коробке Lego от Spring: достаёт нужную и вставляет, куда просишь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">📦</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">🧩 bean</div></div>"
 },
 "Spring|IoC-контейнер": {
  "icon": "📦",
  "hook": "Камера хранения Spring: все объекты лежат внутри, выдаёт по номеру по запросу.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box acc\">📦 IoC</div><div class=\"fp-row\"><div class=\"fp-token\">🧩</div><div class=\"fp-token\">🧩</div><div class=\"fp-token\">🧩</div></div></div>"
 },
 "Spring|@Component": {
  "icon": "🏷️",
  "hook": "Как наклейка «беру на работу» на коробке — Spring видит её и сам кладёт класс на полку с бинами.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">@Component</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">bean</div></div>"
 },
 "Spring|@Autowired": {
  "icon": "🔌",
  "hook": "Как розетка с надписью «сюда нужен бин» — Spring сам находит вилку и втыкает её за тебя.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">need</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-g\">bean</div></div>"
 },
 "Spring|Прокси (Proxy)": {
  "icon": "🎭",
  "hook": "Как секретарь перед начальником: сперва запишет звонок, потом передаст, потом проводит — а ты думал, что звонишь шефу.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">proxy</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">bean</div></div>"
 },
 "Spring|AOP": {
  "icon": "🪡",
  "hook": "Как ниткой прошить логи/охрану через все двери разом, не переделывая каждую дверь по отдельности.",
  "pic": "<div class=\"fp-grid\"><span class=\"fp-cell on\"></span><span class=\"fp-cell on\"></span><span class=\"fp-cell on\"></span><span class=\"fp-cell on\"></span></div>"
 },
 "Spring|@Transactional": {
  "icon": "🔄",
  "hook": "Как перевод денег: либо ушло целиком, либо вернулось как было — половинки не бывает.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">commit</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">rollback</div></div>"
 },
 "Spring|JPA": {
  "icon": "📜",
  "hook": "Как ГОСТ-договор «как класть вещи в шкаф и доставать» — правила одни, шкафы могут быть разные.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">obj</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">JPA</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">db</div></div>"
 },
 "Spring|Hibernate": {
  "icon": "⚙️",
  "hook": "Как переводчик-синхронист: твои объекты на язык SQL и обратно, по правилам того самого ГОСТа (JPA).",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">obj</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-spin\">⚙</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">SQL</div></div>"
 },
 "Spring|@Entity": {
  "icon": "🧾",
  "hook": "Как бейдж «я — строка в таблице»: класс надевает его и становится записью в БД.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">@Entity</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">row</div></div>"
 },
 "Spring|Repository": {
  "icon": "🗄️",
  "hook": "Как кладовщик по заявке: пишешь «дай/положи», а save и find он делает сам, ты код не пишешь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">find</div><div class=\"fp-box acc\">save</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">db</div></div>"
 },
 "Spring|Spring Boot": {
  "icon": "🚀",
  "hook": "Как готовый автомобиль вместо ящика деталей: сел и поехал, настройка уже сделана за тебя.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good fp-float\">run</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">app</div></div>"
 },
 "Spring|@RestController": {
  "icon": "🌐",
  "hook": "Как окошко выдачи: пришёл HTTP-запрос — отдал коробку с данными (JSON) в руки.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">HTTP</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">ctrl</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">JSON</div></div>"
 },
 "Spring|Lazy loading": {
  "icon": "💤",
  "hook": "Как меню в кафе: блюдо несут только когда заказал, а не выкатывают всю кухню сразу.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">obj</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut fp-blink\">later</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">db</div></div>"
 },
 "DB|Индекс": {
  "icon": "📑",
  "hook": "Указатель в конце книги: открыл нужную страницу сразу, не листая всю книгу.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">📖</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">📑 key</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">row</div></div>"
 },
 "DB|B-tree": {
  "icon": "🌳",
  "hook": "Каталог библиотеки: книги по алфавиту в ветвях — спускаешься к нужной за пару шагов.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">M</div></div><div class=\"fp-row\"><div class=\"fp-node\">A-F</div><div class=\"fp-node\">G-R</div><div class=\"fp-node\">S-Z</div></div></div>"
 },
 "DB|Seq Scan": {
  "icon": "🚶",
  "hook": "Ищешь имя в журнале без оглавления — читаешь подряд каждую строку до конца.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-box\">2</div><div class=\"fp-box\">3</div><div class=\"fp-box bad\">4✓</div></div>"
 },
 "DB|Транзакция": {
  "icon": "🔁",
  "hook": "Перевод денег: либо списалось И зачислилось, либо ничего — половины не бывает.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">A</div><div class=\"fp-box good\">B</div><div class=\"fp-box good\">C</div><span class=\"fp-tag\">all</span></div>"
 },
 "DB|ACID": {
  "icon": "🛡️",
  "hook": "Четыре замка на сейфе банка: целостность денег гарантирована каждым из них.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">A</div><div class=\"fp-box acc\">C</div><div class=\"fp-box acc\">I</div><div class=\"fp-box acc\">D</div></div>"
 },
 "DB|Изоляция": {
  "icon": "🚪",
  "hook": "Кабинки в примерочной: пока ты внутри, твои вещи никто чужой не видит.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">T1</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">T2</div></div>"
 },
 "DB|Read Committed": {
  "icon": "✅",
  "hook": "Видишь сообщение в чате только после того, как собеседник нажал «Отправить».",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">commit</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">👁 see</div></div>"
 },
 "DB|Serializable": {
  "icon": "🚦",
  "hook": "Очередь на кассе строго по одному: будто параллельных вообще нет, конфликтов ноль.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">T1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">T2</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">T3</div></div>"
 },
 "DB|MVCC": {
  "icon": "📸",
  "hook": "Гугл-док с историей: ты правишь, другой читает старую версию — никто никого не ждёт.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-ver dead\">v1</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver\">v2</div></div>"
 },
 "DB|Vacuum": {
  "icon": "🧹",
  "hook": "Вынос мусора после уборки: старые копии выкинули — снова чисто и просторно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad\">🗑</div><div class=\"fp-box bad\">🗑</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">free</div></div>"
 },
 "DB|Dead tuple": {
  "icon": "👻",
  "hook": "Старый черновик в корзине: никому не нужен, ждёт момента, когда его вынесут.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-ver dead\">v1</div><span class=\"fp-tag\">🗑?</span></div>"
 },
 "DB|Блокировка (Lock)": {
  "icon": "🔒",
  "hook": "Занято в туалете самолёта: пока внутри один, дверь заперта для всех остальных.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">🔒 row</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">wait</div></div>"
 },
 "DB|Deadlock": {
  "icon": "🔒",
  "hook": "Двое в дверях: «после вас» — «нет, после вас», и так навечно. Охранник выкидывает одного.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad\">T1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">🔒</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">T2</div></div>"
 },
 "DB|Транзакционный лог (WAL)": {
  "icon": "📓",
  "hook": "Сначала записал в дневник «иду чинить кран», потом пошёл. Память сгорела — дневник всё помнит.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">log</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">data</div></div>"
 },
 "Distributed|Kafka": {
  "icon": "📬",
  "hook": "Общая лента почты: одни кидают письма, другие читают по очереди, кто когда успеет.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">📤</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">log</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📥</div></div>"
 },
 "Distributed|Партиция": {
  "icon": "🚪",
  "hook": "Очередь в одну кассу строго по порядку; между разными кассами порядка нет.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box acc\">P0</div><div class=\"fp-box mut\">P1</div><div class=\"fp-box mut\">P2</div></div>"
 },
 "Distributed|Offset": {
  "icon": "🔖",
  "hook": "Закладка в книге: помнишь, на какой странице остановился, продолжишь оттуда.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">0</div><div class=\"fp-box mut\">1</div><div class=\"fp-box acc\">2</div><div class=\"fp-token\">🔖</div></div>"
 },
 "Distributed|Consumer group": {
  "icon": "👥",
  "hook": "Бригада грузчиков делит склад по проходам: каждый проход — только один человек.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">P0</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">C1</div></div>"
 },
 "Distributed|Broker": {
  "icon": "🗄️",
  "hook": "Почтовое отделение: хранит письма, принимает от отправителей, выдаёт получателям.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">📤</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">🗄️</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📥</div></div>"
 },
 "Distributed|acks": {
  "icon": "✅",
  "hook": "Отправил посылку: 0 — пофиг, 1 — курьер кивнул, all — все склады расписались.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">0</div><div class=\"fp-box acc\">1</div><div class=\"fp-box good\">all</div></div>"
 },
 "Distributed|Replication factor": {
  "icon": "🧬",
  "hook": "Запасные ключи от дома у трёх соседей: один потеряет — войдёшь по другому.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">📦</div><div class=\"fp-box good\">📦</div><div class=\"fp-box good\">📦</div></div>"
 },
 "Distributed|Idempotency": {
  "icon": "♻️",
  "hook": "Жмёшь кнопку лифта 5 раз — он всё равно приедет один раз, не 5.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">×3</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">=1</div></div>"
 },
 "Distributed|Outbox": {
  "icon": "📤",
  "hook": "Письмо в свой ящик «на отправку» вместе с делами; почтальон сам заберёт и отнесёт.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">DB</div><div class=\"fp-box acc\">box</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">log</div></div>"
 },
 "Distributed|At-least-once": {
  "icon": "🔁",
  "hook": "Заказное письмо точно дойдёт, но иногда курьер принесёт две копии — проверь номер.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">✉️</div><div class=\"fp-box good\">✉️</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">≥1</div></div>"
 },
 "Distributed|Exactly-once": {
  "icon": "🎯",
  "hook": "Как одно письмо: не потеряется и не придёт дважды. Дорого — обычно шлют дубль + 'уже видел, пропускаю'.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">msg</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">1×</div></div>"
 },
 "Distributed|CAP": {
  "icon": "⚖️",
  "hook": "Связь оборвалась — выбери: либо все видят одно (C), либо все отвечают (A). И то и то сразу нельзя.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">C</div><div class=\"fp-conn fp-blink\" style=\"color:var(--bad)\">✂</div><div class=\"fp-box acc\">A</div></div>"
 },
 "Distributed|Eventual consistency": {
  "icon": "⏳",
  "hook": "Слух по деревне: не все узнают сразу, но через время знают все одинаково.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">…</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">A=A</div></div>"
 },
 "Distributed|Saga": {
  "icon": "🔙",
  "hook": "Заказ в ресторане: блюдо сгорело — отменяем по цепочке и возвращаем деньги, шаг за шагом.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">T1</div><div class=\"fp-box good\">T2</div><div class=\"fp-box bad\">T3✗</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">←</div></div>"
 },
 "Design|SOLID": {
  "icon": "🧱",
  "hook": "5 правил кладки кирпича: меняешь одну стену — соседние не падают.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">S</div><div class=\"fp-box acc\">O</div><div class=\"fp-box acc\">L</div><div class=\"fp-box acc\">I</div></div>"
 },
 "Design|SRP": {
  "icon": "1️⃣",
  "hook": "Швейцарский нож плох: лучше один нож — одно дело. У класса одна причина меняться.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">класс</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">1 дело</div></div>"
 },
 "Design|OCP": {
  "icon": "🔌",
  "hook": "Розетка: добавляешь новый прибор, саму розетку не вскрываешь. Расширяй, не правь нутро.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">ядро🔒</div><div class=\"fp-arrow\">+</div><div class=\"fp-box good\">new</div></div>"
 },
 "Design|DIP": {
  "icon": "🔃",
  "hook": "Лампа и патрон зовут одну розетку-стандарт, а не друг друга напрямую.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box good\">верх</div><div class=\"fp-box acc\">абстракция</div><div class=\"fp-box good\">низ</div></div>"
 },
 "Design|DI": {
  "icon": "💉",
  "hook": "Тебе приносят инструмент в руки, а не ты бежишь делать его сам.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">dep</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">класс</div></div>"
 },
 "Design|Strategy": {
  "icon": "🔀",
  "hook": "Навигатор: пешком/авто/велик — один экран, маршрут считается по выбранному способу.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">if</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">A</div><div class=\"fp-box acc\">B</div></div>"
 },
 "Design|Factory": {
  "icon": "🏭",
  "hook": "Кофемашина: жмёшь кнопку — получаешь напиток, не зная как он собран внутри.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">make()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">obj</div></div>"
 },
 "Design|Builder": {
  "icon": "🧩",
  "hook": "Бургер на конвейере: булка→котлета→сыр, шаг за шагом, без свалки в конструкторе.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">.a</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">.b</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">obj</div></div>"
 },
 "Design|Гексагон": {
  "icon": "⬡",
  "hook": "Как процессор в розетке: ядро одно, а вилки-переходники под любую страну прикручиваешь снаружи.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">⬡ ядро</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">порт</div><div class=\"fp-conn\"></div><div class=\"fp-box\">🔌</div></div>"
 },
 "Design|Port": {
  "icon": "🔌",
  "hook": "Как розетка в стене: форма дырок задана, а что воткнёшь (лампу, чайник) — её не волнует.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">ядро</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">🔌 порт</div><div class=\"fp-token\">?</div></div>"
 },
 "Design|Adapter (гексагон)": {
  "icon": "🔧",
  "hook": "Как переходник на вилку: один конец в розетку-порт, другой — под конкретную технику (БД, Kafka).",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">🔌</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">🔧</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">БД</div></div>"
 },
 "Design|DDD": {
  "icon": "🗣️",
  "hook": "Строим дом по жизни семьи, а не по форме кирпичей: код вокруг бизнеса и его слов.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">🗣️ бизнес</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">код</div><div class=\"fp-box bad\">🗄️</div></div>"
 },
 "Design|Coupling": {
  "icon": "🔗",
  "hook": "Как наушники в кармане: чем сильнее провода сцеплены, тем больнее распутывать. Меньше — лучше.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-conn\"></div><div class=\"fp-box\">B</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🔗 мало</div></div>"
 },
 "Design|Cohesion": {
  "icon": "🧲",
  "hook": "Как ящик 'только носки': всё внутри про одно дело, ничего лишнего не намешано.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box good\">🧦</div><div class=\"fp-box good\">🧦</div><div class=\"fp-box good\">🧦 одно дело</div></div>"
 },
 "Infra|Redis": {
  "icon": "⚡",
  "hook": "Как блокнот на столе vs архив в подвале: рядом в памяти, отвечает мгновенно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">⚡ RAM</div><div class=\"fp-token\">k→v</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">💾</div></div>"
 },
 "Infra|Кэш": {
  "icon": "🗄️",
  "hook": "Как стикер с ответом на холодильнике: не лезешь в шкаф заново, берёшь готовое под рукой.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">📌 кэш</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">⚡</div><div class=\"fp-box mut\">🗄️ база</div></div>"
 },
 "Infra|TTL": {
  "icon": "⏳",
  "hook": "Как йогурт в холодильнике: вышел срок — сам выбрасывается, место освобождается.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">⏳ 60с</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">пусто</div></div>"
 },
 "Infra|RabbitMQ": {
  "icon": "📮",
  "hook": "Как почта: кидаешь письмо в ящик, почтальон сам донесёт. Отправитель не ждёт у двери.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">📮 broker</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">B</div></div>"
 },
 "Infra|Очередь (Queue)": {
  "icon": "🎟️",
  "hook": "Как очередь в кассу: задачи стоят гуськом, обработчик берёт по одной с начала.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">3</div><div class=\"fp-token\">2</div><div class=\"fp-token\">1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🎟️</div></div>"
 },
 "Infra|Producer/Consumer": {
  "icon": "📥",
  "hook": "Повар кладёт заказ на полку (producer), официант снимает и несёт (consumer).",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">📤 put</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">📋</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📥 take</div></div>"
 },
 "Infra|ACK": {
  "icon": "✅",
  "hook": "Как «дочитал» в мессенджере: нет галочки — отправят снова.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">msg</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">ACK ✅</div></div>"
 },
 "Infra|Elasticsearch": {
  "icon": "🔍",
  "hook": "Гугл внутри твоих данных: ищет по миллионам строк мгновенно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">🔍</div><div class=\"fp-arrow\">→</div><div class=\"fp-grid\"><span class=\"fp-cell on\"></span><span class=\"fp-cell\"></span><span class=\"fp-cell acc\"></span><span class=\"fp-cell\"></span></div></div>"
 },
 "Infra|Index": {
  "icon": "🗂️",
  "hook": "Как папка-ящик для одинаковых карточек — внутри тысячи документов.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box mut\">doc</div><div class=\"fp-box mut\">doc</div><div class=\"fp-box acc\">index</div></div>"
 },
 "Infra|Docker": {
  "icon": "📦",
  "hook": "Коробка с приложением и всем содержимым: где открыл — там работает.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">📦 app</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">run</div></div>"
 },
 "Infra|Image": {
  "icon": "📸",
  "hook": "Чертёж дома: один слепок — сколько угодно одинаковых построек.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">📸 img</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">box</div><div class=\"fp-box\">box</div></div>"
 },
 "Infra|Kubernetes (K8s)": {
  "icon": "🎛️",
  "hook": "Дирижёр оркестра: раздаёт партии, поднимает упавших, добавляет музыкантов.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">🎛️</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">▢</div><div class=\"fp-box good\">▢</div></div>"
 },
 "Infra|Pod": {
  "icon": "🫛",
  "hook": "Стручок гороха: внутри одна или пара горошин-контейнеров вместе.",
  "pic": "<div class=\"fp-box acc\"><div class=\"fp-row\"><div class=\"fp-box mut\">c1</div><div class=\"fp-box mut\">c2</div></div></div>"
 },
 "Infra|Probe": {
  "icon": "🩺",
  "hook": "Врач стучит молоточком: жив? готов работать? — по ответу решает.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">🩺</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">OK</div></div>"
 },
 "Infra|Liveness/Readiness": {
  "icon": "💓",
  "hook": "Liveness — пульс есть? Readiness — открыта ли дверь для гостей.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">live</span><div class=\"fp-box good fp-pulse-g\">💓</div></div><div class=\"fp-row\"><span class=\"fp-tag\">ready</span><div class=\"fp-box acc\">🚪</div></div></div>"
 },
 "Testing|Unit-тест": {
  "icon": "🔬",
  "hook": "Пробуешь одну деталь под микроскопом — без розетки и проводов, мигом.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">fn()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-blink\">✓</div></div>"
 },
 "Testing|Integration-тест": {
  "icon": "🔗",
  "hook": "Проверяешь, как шестерёнки цепляются: с настоящей БД и Kafka, медленнее.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">app</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">DB</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">kafka</div></div>"
 },
 "Testing|TDD": {
  "icon": "🔴",
  "hook": "Сначала красный тест, потом зелёный, потом уборка — и снова по кругу.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad\">red</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">green</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">refac</div></div>"
 },
 "Testing|Mock": {
  "icon": "🎭",
  "hook": "Актёр в гриме: ты сам пишешь ему реплики, а потом проверяешь — сказал ли он их.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">🎭</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓ вызван</div></div>"
 },
 "Testing|Stub": {
  "icon": "🍽️",
  "hook": "Картонная еда в витрине: на тарелке всегда одно и то же, никто не спрашивает «съел ли ты».",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">?</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">42</div></div>"
 },
 "Testing|Fake": {
  "icon": "🧸",
  "hook": "Игрушечная плита: реально греет понарошку, но готовить на ней можно — как БД в памяти.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">💾 real</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🧸 RAM</div></div>"
 },
 "Testing|Spy": {
  "icon": "🕵️",
  "hook": "Шпион ходит рядом с настоящим и записывает в блокнот, кто что и сколько раз сделал.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">📞x3</div><div class=\"fp-box\">arg</div><div class=\"fp-box acc\">🕵️</div></div>"
 },
 "Testing|JUnit": {
  "icon": "🧪",
  "hook": "Спортзал для кода: каждый тест — упражнение, тренажёр гоняет их все по очереди.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">✓</div><div class=\"fp-box good\">✓</div><div class=\"fp-box bad\">✗</div></div>"
 },
 "Testing|Mockito": {
  "icon": "🛠️",
  "hook": "Конструктор-набор для подделок: mock() слепил, when() научил, verify() проверил.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">mock</div><div class=\"fp-token\">when</div><div class=\"fp-token\">verify</div></div>"
 },
 "Testing|Testcontainers": {
  "icon": "🐳",
  "hook": "Аренда настоящего стенда на час: поднял Postgres в Docker, протестил, выключил.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">🐳 up</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">test</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">stop</div></div>"
 },
 "Testing|Assertion": {
  "icon": "⚖️",
  "hook": "Весы на контроле: ждали 5, на чаше 5 — ок; иначе сигнал тревоги.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">5</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">= 5 ✓</div></div>"
 },
 "Testing|AAA": {
  "icon": "🎬",
  "hook": "Сцена в три такта: разложил реквизит, сыграл, проверил аплодисменты.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">A</div></div>"
 },
 "Testing|Покрытие": {
  "icon": "📊",
  "hook": "Уборка по комнатам: сколько комнат зашли — столько и подмели; вся квартира не нужна.",
  "pic": "<div class=\"fp-bar\"><span style=\"width:60%\"></span></div>"
 },
 "Testing|Fixture": {
  "icon": "📦",
  "hook": "Накрытый стол до прихода гостей: данные и декорации готовы заранее на каждый тест.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">@Before</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📦 data</div></div>"
 },
 "Testing|Flaky-тест": {
  "icon": "🎲",
  "hook": "Капризный лифт: тот же код, но иногда едет, иногда стоит — зависит от настроения.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">✓</div><div class=\"fp-box bad fp-blink\">✗</div><div class=\"fp-box good\">✓</div></div>"
 },
 "Testing|@QuarkusTest": {
  "icon": "🧪",
  "hook": "Запустил мини-копию приложения у себя на столе, чтобы потыкать перед сдачей.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">app</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">test ✓</div></div>"
 },
 "Web|HTTP": {
  "icon": "📮",
  "hook": "Почта между браузером и сервером: отправил письмо-запрос — получил письмо-ответ.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">browser</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">server</div></div>"
 },
 "Web|GET/POST": {
  "icon": "📥",
  "hook": "GET — сходить в магазин за хлебом, POST — принести новый товар на склад.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box good\">GET ←</div><div class=\"fp-box acc\">POST →</div></div>"
 },
 "Web|Коды ответа": {
  "icon": "🚦",
  "hook": "Светофор ответа: 2xx зелёный, 3xx поворот, 4xx ты ошибся, 5xx сервер упал.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">2xx</div><div class=\"fp-box mut\">3xx</div><div class=\"fp-box\">4xx</div><div class=\"fp-box bad\">5xx</div></div>"
 },
 "Web|REST": {
  "icon": "🗂️",
  "hook": "Каждая вещь лежит по своему адресу-полке, а метод говорит: взять, положить, выкинуть.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">/users</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">GET</div></div>"
 },
 "Web|JSON": {
  "icon": "📦",
  "hook": "Универсальная коробка для данных: подписанные ящики и списки, понятная и человеку, и машине.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">{</div><div class=\"fp-token\">key:val</div><div class=\"fp-box mut\">}</div></div>"
 },
 "Web|TLS": {
  "icon": "🔒",
  "hook": "Запечатанный конверт: по дороге письмо нельзя ни вскрыть, ни подменить.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">data</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🔒 enc</div></div>"
 },
 "Web|JWT": {
  "icon": "🎫",
  "hook": "Браслет с фестиваля: охрана видит печать и пускает, не звоня в кассу.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">user</div><div class=\"fp-box acc\">.sign</div><div class=\"fp-box good\">✓</div></div>"
 },
 "Web|DNS": {
  "icon": "📖",
  "hook": "Телефонная книга: набрал имя сайта — узнал его номер-адрес.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">site.com</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">1.2.3.4</div></div>"
 },
 "Web|Reverse proxy": {
  "icon": "💂",
  "hook": "Вахтёр на входе: один встречает всех гостей и провожает в нужный кабинет.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box acc\">proxy</div><div class=\"fp-row\"><div class=\"fp-box mut\">A</div><div class=\"fp-box mut\">B</div></div></div>"
 },
 "Web|gRPC": {
  "icon": "⚡",
  "hook": "Прямой служебный звонок между сервисами: коротко, бинарно, без лишних слов.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">svc</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">⚡bin</div></div>"
 },
 "Web|GraphQL": {
  "icon": "🍽️",
  "hook": "Шведский стол с заказом: одна стойка, но в чек пишешь сам, что именно положить.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">1 url</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">name,age</div></div>"
 },
 "Web|SOAP": {
  "icon": "📨",
  "hook": "Как заказное письмо в плотном конверте с печатями: тяжело, формально, но банки до сих пор шлют именно так.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">XML</div><div class=\"fp-token\">конверт</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">🏦</div></div>"
 },
 "Web|CORS": {
  "icon": "🚧",
  "hook": "Охранник на входе: с чужого двора не пускает, пока хозяин дома лично не разрешит этому гостю.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">сайт A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">🚧 B</div></div>"
 },
 "Web|Idempotency": {
  "icon": "🛗",
  "hook": "Кнопка лифта: жми хоть десять раз — приедет один лифт, лишних не вызовешь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">🛗×3</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">1</div></div>"
 },
 "Algorithms|Algorithm": {
  "icon": "📋",
  "hook": "Рецепт борща: шаги по порядку — взял продукты, сделал по пунктам, получил результат.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box\">шаг 1</div><div class=\"fp-box\">шаг 2</div><div class=\"fp-box good\">итог</div></div>"
 },
 "Algorithms|Big-O": {
  "icon": "📈",
  "hook": "Ценник на еду в зависимости от числа гостей: важно не сейчас, а как растёт счёт при толпе.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">N↑</div><div class=\"fp-arrow\">→</div><div class=\"fp-bar\"><span style=\"width:70%\"></span></div></div>"
 },
 "Algorithms|O(1)": {
  "icon": "⚡",
  "hook": "Достать книгу с полки по номеру: хоть тысяча книг — берёшь нужную мгновенно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-val\">N</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">1 шаг</div></div>"
 },
 "Algorithms|O(n)": {
  "icon": "🚶",
  "hook": "Проверить всех гостей по списку по очереди: вдвое больше людей — вдвое дольше идёшь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">▪</div><div class=\"fp-box\">▪</div><div class=\"fp-box\">▪</div><div class=\"fp-box acc\">▪</div></div>"
 },
 "Algorithms|O(log n)": {
  "icon": "🔪",
  "hook": "Ищешь слово в словаре: открыл середину, отбросил половину — и так пока не найдёшь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">½</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">¼</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓</div></div>"
 },
 "Algorithms|O(n^2)": {
  "icon": "🐢",
  "hook": "Знакомить каждого гостя с каждым: 10 человек — 100 рукопожатий, толпа — катастрофа.",
  "pic": "<div class=\"fp-grid\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad\"></div></div>"
 },
 "Algorithms|Time complexity": {
  "icon": "⏱️",
  "hook": "Сколько шагов готовки: не минуты на часах, а сколько действий при росте числа блюд.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">данные↑</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">шаги↑</div></div>"
 },
 "Algorithms|Space complexity": {
  "icon": "🧳",
  "hook": "Сколько чемоданов под вещи: не время, а место — больше данных, больше полок нужно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">данные↑</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">память↑</div></div>"
 },
 "Algorithms|Array": {
  "icon": "🗄️",
  "hook": "Ряд почтовых ячеек подряд: знаешь номер — открываешь сразу нужную, без поиска.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">0</div><div class=\"fp-box\">1</div><div class=\"fp-box good\">2</div><div class=\"fp-box\">3</div></div>"
 },
 "Algorithms|LinkedList": {
  "icon": "⛓️",
  "hook": "Поезд из вагонов: у каждого вагона лишь сцепка с соседним, конца не видишь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">2</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">3</div></div>"
 },
 "Algorithms|HashMap": {
  "icon": "🗄️",
  "hook": "Гардероб: даёшь номерок (ключ) — мгновенно несут твою куртку, не ищут по всем вешалкам.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">key</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">val</div></div>"
 },
 "Algorithms|Stack": {
  "icon": "🥞",
  "hook": "Стопка тарелок: кладёшь и берёшь только сверху — последняя легла, первая ушла.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box acc\">3</div><div class=\"fp-box\">2</div><div class=\"fp-box\">1</div></div>"
 },
 "Algorithms|Queue": {
  "icon": "🚶",
  "hook": "Очередь в кассу: кто встал первым — того и обслужат первым.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">1</div><div class=\"fp-box\">2</div><div class=\"fp-box\">3</div><div class=\"fp-arrow\">→</div></div>"
 },
 "Algorithms|Tree": {
  "icon": "🌳",
  "hook": "Семейное древо: один прародитель сверху, ветви вниз, и никаких петель.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node\">●</div></div><div class=\"fp-row\"><div class=\"fp-node\">●</div><div class=\"fp-node\">●</div></div></div>"
 },
 "Algorithms|Recursion": {
  "icon": "🪆",
  "hook": "Матрёшка: внутри куклы такая же кукла поменьше, пока не дойдёшь до самой крошечной.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">f</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">f</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">f</div></div>"
 },
 "Algorithms|Base case": {
  "icon": "🛑",
  "hook": "Дно матрёшки: самая маленькая кукла не раскрывается — тут рекурсия и тормозит.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">f</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">STOP</div></div>"
 },
 "Git|repository (repo)": {
  "icon": "📦",
  "hook": "Машина времени для папки: хранит каждый шаг проекта в скрытом сундучке .git.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">📁</div><div class=\"fp-box acc\">.git</div></div>"
 },
 "Git|commit": {
  "icon": "📸",
  "hook": "Фото проекта в момент времени: с подписью, автором и личным номером-хэшем.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">●</div><span class=\"fp-tag\">a1b</span></div>"
 },
 "Git|branch": {
  "icon": "🌿",
  "hook": "Развилка дороги: своя тропинка, идёшь по ней, а главная трасса остаётся целой.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">●</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">●</div></div>"
 },
 "Git|HEAD": {
  "icon": "📍",
  "hook": "Метка «ВЫ ЗДЕСЬ» на карте истории: показывает, где ты стоишь прямо сейчас.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">HEAD</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">●</div></div>"
 },
 "Git|merge": {
  "icon": "🔀",
  "hook": "Две реки сливаются в одну: воды смешались, и появляется новая общая точка-узел.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">●</div><div class=\"fp-box acc\">●</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">◆</div></div>"
 },
 "Git|rebase": {
  "icon": "📚",
  "hook": "Как переставить свои книги на новую полку — стопка целиком переезжает поверх чужих.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">B</div><div class=\"fp-token\">c1</div><div class=\"fp-token\">c2</div></div>"
 },
 "Git|cherry-pick": {
  "icon": "🍒",
  "hook": "Сорвал одну вишню с чужого дерева и положил в свою корзину — только один коммит.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">c1</div><div class=\"fp-box acc\">c2</div><div class=\"fp-box mut\">c3</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">c2</div></div>"
 },
 "Git|bisect": {
  "icon": "🔍",
  "hook": "Игра «угадай число»: делим список коммитов пополам, пока не поймаем виновника бага.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">✓</div><div class=\"fp-box good\">✓</div><div class=\"fp-box acc fp-pulse-a\">?</div><div class=\"fp-box bad\">✗</div></div>"
 },
 "Git|stash": {
  "icon": "🗄️",
  "hook": "Смахнул бумаги со стола в ящик, сделал срочное дело — и вернул бумаги обратно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">diff</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">📦</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">diff</div></div>"
 },
 "Git|conflict": {
  "icon": "💥",
  "hook": "Двое вписали разное в одну строку анкеты — Git разводит руками: реши сам, чьё оставить.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">мой</div><div class=\"fp-box bad fp-blink\">✗</div><div class=\"fp-box acc\">чужой</div></div>"
 },
 "Git|remote": {
  "icon": "☁️",
  "hook": "Облачный сейф проекта на сервере — твой локальный репо синхронится с этой копией.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">local</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">☁ origin</div></div>"
 },
 "Git|push / pull": {
  "icon": "🔄",
  "hook": "Почта: push — отправить письмо на сервер, pull — забрать входящие к себе.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">me</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">☁</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">☁</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">me</div></div></div>"
 },
 "Git|tag": {
  "icon": "🏷️",
  "hook": "Стикер-закладка на странице книги: вот тут релиз v1.2.0, всегда найдёшь это место.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">c1</div><div class=\"fp-box acc\">c2</div><span class=\"fp-tag\">v1.2.0</span><div class=\"fp-box mut\">c3</div></div>"
 },
 "Git|reset": {
  "icon": "⏪",
  "hook": "Машина времени для ветки: перематываешь указатель назад на нужный коммит.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">HEAD</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">c1</div><div class=\"fp-box mut\">c2</div><div class=\"fp-box mut\">c3</div></div>"
 },
 "DevOps|CI/CD": {
  "icon": "🏭",
  "hook": "Конвейер на фабрике: бросил деталь — он сам собрал, проверил и упаковал готовый продукт.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">build</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">test</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">ship</div></div>"
 },
 "DevOps|Pipeline": {
  "icon": "🚇",
  "hook": "Поезд по веткам метро: коммит сел на станции — едет по шагам до конечной «деплой».",
  "pic": "<div class=\"fp-row\"><div class=\"fp-node\">●</div><div class=\"fp-conn\"></div><div class=\"fp-node\">●</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-travel\">●</div></div>"
 },
 "DevOps|Артефакт": {
  "icon": "📦",
  "hook": "Готовый пирог из печи: исходники — мука, артефакт — упакованный пирог на полку склада.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">src</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">📦 jar</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🏬</div></div>"
 },
 "DevOps|Docker": {
  "icon": "📦",
  "hook": "Коробка для переезда: кладёшь вещи с упаковкой — на новой квартире всё работает так же.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">app</div><div class=\"fp-box mut\">libs</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📦 image</div></div>"
 },
 "DevOps|Контейнер": {
  "icon": "🐣",
  "hook": "Как пирожок из формы для выпечки: образ — форма, контейнер — горячий пирожок, который съели.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">📦</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">🐣 run</div></div>"
 },
 "DevOps|Образ (Image)": {
  "icon": "🧬",
  "hook": "Как класс и объекты: один слепок-образ, а контейнеров из него лепишь сколько хочешь.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">image</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">c1</div><div class=\"fp-box good\">c2</div></div>"
 },
 "DevOps|Registry": {
  "icon": "🏬",
  "hook": "Склад готовых коробок: пришёл, скачал нужный образ — как магазин приложений для серверов.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">🏬</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">pull</div><div class=\"fp-box acc\">srv</div></div>"
 },
 "DevOps|Kubernetes (K8s)": {
  "icon": "🚢",
  "hook": "Капитан порта: уплыла шлюпка — тут же спускает новую, всегда держит флот в строю.",
  "pic": "<div class=\"fp-grid\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad fp-blink\"></div><div class=\"fp-cell on\"></div></div>"
 },
 "DevOps|Оркестрация": {
  "icon": "🎻",
  "hook": "Дирижёр оркестра: кому играть, сколько скрипок, кого заменить, если кто-то сфальшивил.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-node\">🎻</div><div class=\"fp-conn\"></div><div class=\"fp-box good\">c1</div><div class=\"fp-box good\">c2</div></div>"
 },
 "DevOps|Blue-Green": {
  "icon": "🔵",
  "hook": "Два рубильника: синий рабочий, зелёный новый — щёлкнул тумблер, и трафик уже на новом.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">🔵 old</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">🟢 new</div></div>"
 },
 "DevOps|Canary": {
  "icon": "🐤",
  "hook": "Канарейка в шахте: пускаешь новое на 5% людей — живы, тогда заводишь всех.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-bar\"><span style=\"width:10%;background:var(--good)\"></span></div><div class=\"fp-arrow\">→</div><div class=\"fp-val\">100%</div></div>"
 },
 "DevOps|Rollback": {
  "icon": "↩️",
  "hook": "Ctrl+Z для прода: новое сломалось — мгновенно вернул прошлую рабочую версию.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-ver dead\">v2</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver good\">v1</div></div>"
 },
 "DevOps|Serverless": {
  "icon": "⚡",
  "hook": "Такси вместо своей машины: едешь только когда надо, платишь за поездку, парковки нет.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">fn()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-a\">☁️</div></div>"
 },
 "DevOps|IaC": {
  "icon": "📜",
  "hook": "Чертёж дома вместо стройки на глаз: сервера описаны в файле — собрал заново одной командой.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">📜 .tf</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">srv</div><div class=\"fp-box good\">net</div></div>"
 },
 "Quarkus|ARC": {
  "icon": "🔧",
  "hook": "Spring собирает мебель каждое утро при входе в дом, Quarkus привёз её уже собранной с завода."
 },
 "Quarkus|Псевдоскоуп": {
  "icon": "📦",
  "hook": "ApplicationScoped — общий служебный лифт на весь дом, RequestScoped — одноразовый стаканчик на каждого гостя."
 },
 "Quarkus|Client Proxy": {
  "icon": "🎭",
  "hook": "Прокси — секретарь: вы звоните ему всегда на один номер, а он сам находит, где сейчас сидит начальник."
 },
 "Quarkus|Резолв (resolution)": {
  "icon": "🧩",
  "hook": "Spring ищет нужную деталь в рантайме на ощупь; ARC уже подписал на заводе, какая деталь куда вкручивается."
 },
 "Quarkus|@BuildStep": {
  "icon": "🏭",
  "hook": "Extension — это завод (deployment) и его готовое изделие (runtime): тяжёлая работа на заводе, в руки клиенту едет лёгкая деталь."
 },
 "Quarkus|Closed-world": {
  "icon": "🌍",
  "hook": "Рефлексия — это рыться в ящике на ощупь при каждом вызове; ARC заранее приклеил ярлык и достаёт нужное мгновенно."
 },
 "Quarkus|Native image": {
  "icon": "⚡",
  "hook": "Native — это спринтер со старта, разогретая JVM — марафонец на дистанции."
 },
 "Quarkus|Closed-world assumption": {
  "icon": "🌍",
  "hook": "Native — это упаковщик чемодана: кладёт только то, что ты назвал вслух; шепнул имя в рантайме — вещь не доехала."
 },
 "Quarkus|@RegisterForReflection": {
  "icon": "📝",
  "hook": "@RegisterForReflection — это бронь места в чемодане: явно сказал «эта вещь нужна», и упаковщик её не выкинет."
 },
 "Quarkus|JIT warmup": {
  "icon": "🔥",
  "hook": "Долгоживущий сервис под нагрузкой — марафон: дай JVM разогреться, и она обгонит native на финише."
 },
 "Quarkus|AOT-компиляция": {
  "icon": "🏗️",
  "hook": "AOT — заранее напечатанная книга: открыл и читаешь; JIT — переводчик, что сперва запинается, а потом шпарит свободнее печатной."
 },
 "Quarkus|Mutiny": {
  "icon": "🔀",
  "hook": "Uni — это посылка с одним заказом, Multi — это лента конвейера с потоком посылок."
 },
 "Quarkus|event-loop": {
  "icon": "🔁",
  "hook": "Event-loop — это один официант на весь зал: он никогда не присаживается ждать кухню, иначе зал встанет."
 },
 "Quarkus|@Blocking": {
  "icon": "🚧",
  "hook": "@Blocking — это табличка «я надолго на кухне», чтобы официанта-event-loop увели, а тебя посадили за отдельный стол-worker."
 },
 "Quarkus|канал (channel)": {
  "icon": "📡",
  "hook": "@Incoming/@Outgoing — это трубы «вход» и «выход», а твой метод — фильтр посередине конвейера."
 },
 "Quarkus|virtual thread": {
  "icon": "🧵",
  "hook": "Виртуальный поток — это как нанять тысячу стажёров по цене одного: блокируется стажёр, а дорогой ОС-поток свободен."
 },
 "Quarkus|backpressure": {
  "icon": "🛑",
  "hook": "Backpressure — это кассир, который говорит очереди «по одному», чтобы прилавок не завалили товаром, который некуда складывать."
 },
 "Quarkus|Active Record": {
  "icon": "🗃️",
  "hook": "Active record — это сотрудник, который сам бегает в архив; repository — отдельный архивариус, а сотрудник просто работает."
 },
 "Quarkus|Uni": {
  "icon": "🔀",
  "hook": "Blocking — официант стоит у плиты и ждёт твоё блюдо; reactive — официант принял заказ и пошёл обслуживать ещё десять столов."
 },
 "Quarkus|Narayana": {
  "icon": "🔒",
  "hook": "@Transactional держит транзакцию в кармане текущего треда; Uni перепрыгивает на другой тред — и карман остаётся пустым."
 },
 "Quarkus|Testcontainers": {
  "icon": "🐳",
  "hook": "Dev Services — это автоповар: не задал ресторан — он сам разогреет тебе БД в контейнере, пока ты пишешь код."
 },
 "Quarkus|Schema migration": {
  "icon": "🪜",
  "hook": "Миграции — это git для схемы БД: каждый шаг пронумерован, и сервер знает, до какого коммита он уже накатил."
 },
 "Quarkus|ConfigSource ordinal": {
  "icon": "🔧",
  "hook": "Конфиг как стопка прозрачных плёнок: смотришь сверху, верхняя плёнка перекрывает нижние."
 },
 "Quarkus|Config profile": {
  "icon": "🎚️",
  "hook": "Профиль как режим стиральной машины: один барабан, но программа стирки меняет температуру под ситуацию."
 },
 "Quarkus|Augmentation": {
  "icon": "🏗️",
  "hook": "Build-time как форма для бетона: пока бетон жидкий — лепи что хочешь; застыл (собрался) — форму не переделать без новой отливки."
 },
 "Quarkus|Live reload": {
  "icon": "♻️",
  "hook": "Live reload как официант, который бежит на кухню только когда ты сделал заказ, а не каждый раз, когда повар что-то нарезал."
 },
 "Quarkus|Continuous testing": {
  "icon": "🧪",
  "hook": "Continuous testing как датчик дыма на кухне: не ждёшь, пока решишь проверить — он сам пищит, как только что-то задымило."
 },
 "Quarkus|fast-jar": {
  "icon": "📦",
  "hook": "fast-jar — мебель IKEA по коробкам (удобно довозить), uber-jar — готовый шкаф (один, но тяжёлый), native — встроенный гарнитур (мгновенно, но переделать нельзя)."
 },
 "Quarkus|Circuit Breaker": {
  "icon": "🔌",
  "hook": "Это аптечка для вызова: бинт повторит, жгут перекроет, а запасной парашют — это fallback."
 },
 "Quarkus|Readiness probe": {
  "icon": "🚦",
  "hook": "Liveness — пульс пациента (нет — реанимация), Readiness — табличка «открыто» на двери (закрыта — клиентов не пускаем, но магазин стоит)."
 },
 "Quarkus|Span": {
  "icon": "🧵",
  "hook": "Метрики — это спидометр и тахометр машины, трейс — это видеорегистратор всей поездки от двери до двери."
 },
 "Quarkus|OpenAPI": {
  "icon": "📜",
  "hook": "OpenAPI — это меню ресторана, сгенерированное из самой кухни, а Swagger UI — официант, который даёт это меню потыкать."
 },
 "Quarkus|Build-time DI": {
  "icon": "⚙️",
  "hook": "Quarkus — спорткар: лёгкий и быстрый со старта, но запчастей меньше. Spring Boot — обкатанный универсал: тяжелее, зато сервис на каждом углу."
 },
 "Quarkus|Bearer token": {
  "icon": "🎫",
  "hook": "Keycloak — паспортный стол, который выдал JWT-паспорт; сервис не звонит в стол на каждый запрос, а проверяет водяной знак (подпись) по публичному образцу."
 },
 "Архитектура|Ambassador (Посол)": {
  "icon": "🧩",
  "hook": "Личный посол: ты говоришь со своим послом на родном языке (localhost), а он уже ведёт переговоры с чужой страной — знает их протокол, терпит грубость и пробует снова"
 },
 "Архитектура|Claim Check": {
  "icon": "🎫",
  "hook": "Камера хранения на вокзале: чемодан сдал, носишь с собой только квиток с номером — по нему чемодан и выдадут"
 },
 "Архитектура|Scatter-Gather": {
  "icon": "🕸️",
  "hook": "Тендер с дедлайном: разослал ТЗ пяти подрядчикам, в пятницу собрал оферты и выбрал лучшую — кто не успел, того не ждём"
 },
 "Архитектура|Competing Consumers": {
  "icon": "🏁",
  "hook": "Касса в супермаркете: одна очередь покупателей, несколько касс — кто освободился, тот берёт следующего; общий порядок «кто за кем зашёл в магазин» уже не соблюдается"
 },
 "Архитектура|Event-Carried State Transfer": {
  "icon": "📦",
  "hook": "Письмо с вложением vs письмо-уведомление: вместо «у нас обновился документ, зайди скачай» сразу присылают сам документ — получателю никуда ходить не надо"
 },
 "Архитектура|Pub/Sub vs P2P": {
  "icon": "📡",
  "hook": "Очередь — заявка в техподдержку: тикет берёт один оператор. Топик — корпоративная рассылка: письмо падает в почту всем сотрудникам сразу"
 },
 "Архитектура|Bulkhead (переборка)": {
  "icon": "🚧",
  "hook": "Отсеки на корабле: пробило один — затопит его, но судно на плаву"
 },
 "Архитектура|Стена защиты (resilience stack)": {
  "icon": "🧅",
  "hook": "Луковица защиты: запрос пробивается сквозь слои до ядра-вызова, а ошибка всплывает обратно наружу"
 },
 "Архитектура|Graceful degradation": {
  "icon": "📉",
  "hook": "Двигатель сдох — садись сразу (fail-fast). Кондиционер сдох — лети без него (degrade)"
 },
 "Архитектура|Load shedding (сброс нагрузки)": {
  "icon": "🪣",
  "hook": "Охранник у клуба: пускает столько, сколько влезает, остальным — стоп на входе, а не давка внутри"
 },
 "Архитектура|Retry budget": {
  "icon": "🎟️",
  "hook": "Общий лимит на повторы как касса с фишками: фишки кончились — повторять нельзя, downstream не добьют"
 },
 "Архитектура|Sidecar": {
  "icon": "🏍️",
  "hook": "Sidecar — коляска мотоцикла (просто рядом). Ambassador — посол, который ездит и договаривается ВО ВНЕ за тебя. Adapter — переходник в розетке: чужой штекер делает понятным."
 },
 "Архитектура|Service registry": {
  "icon": "📒",
  "hook": "Client-side — сам звонишь в справочную, узнаёшь все номера и сам решаешь кому набрать. Server-side — звонишь в один колл-центр, а оператор сам переводит на свободного специалиста."
 },
 "Архитектура|Компенсирующая транзакция": {
  "icon": "↩️",
  "hook": "Оркестр с дирижёром — один машет палочкой, все играют по его команде. Хороводный танец — дирижёра нет, каждый видит соседа и вступает по сигналу. Оба дают музыку, но падает по-разному."
 },
 "Concurrency|CAS": {
  "icon": "🔁",
  "hook": "Сравни-и-подмени: меняю только если за моей спиной никто ничего не трогал.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">expect: A</div><div class=\"fp-box acc\">mem: A</div></div><div class=\"fp-arrow fp-pulse-g\">=&gt; swap</div><div class=\"fp-box good\">mem: B ✓</div></div>"
 },
 "Concurrency|ABA": {
  "icon": "🎭",
  "hook": "Вернулся домой — дверь та же, но пока тебя не было, в квартире успели пожить чужие.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">B</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">A</div><div class=\"fp-conn fp-blink\">CAS ✓?!</div></div>"
 },
 "Concurrency|False sharing": {
  "icon": "🧊",
  "hook": "Два соседа по комнате: каждый раз, когда один шевелится, второму приходится переезжать.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-cell acc\">cntA</div><div class=\"fp-cell acc\">cntB</div><div class=\"fp-val\">1 line 64B</div></div><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">core1 write</div><div class=\"fp-box bad fp-pulse-r\">core2 invalid</div></div></div>"
 },
 "Concurrency|Work-stealing": {
  "icon": "🥷",
  "hook": "Свои задачи беру сверху, а заскучав — таскаю чужие снизу, чтобы никто не простаивал.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-lane name\">W1</div><div class=\"fp-token\">t</div><div class=\"fp-token\">t</div></div><div class=\"fp-arrow fp-travel\">steal →</div><div class=\"fp-col\"><div class=\"fp-lane name\">W2</div></div></div>"
 },
 "Concurrency|CompletableFuture": {
  "icon": "⛓️",
  "hook": "Не стою у плиты с таймером — оставляю записку «когда будет готово, сделай дальше вот это».",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">supply</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">thenApply</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">thenCompose</div></div>"
 },
 "Concurrency|Semaphore": {
  "icon": "🎟️",
  "hook": "Вышибала с N браслетами: пускает первых N, остальные ждут, пока кто-то выйдет и вернёт браслет.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">permits: 2</div><div class=\"fp-node acc fp-pulse-g\">in</div><div class=\"fp-node acc fp-pulse-g\">in</div><div class=\"fp-node fp-blink\">wait</div></div>"
 },
 "Concurrency|CountDownLatch": {
  "icon": "🚦",
  "hook": "Старт забега: ждём, пока все N участников отметятся, и только тогда даём общий сигнал.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">N=3</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box\">2</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box\">1</div><div class=\"fp-arrow fp-pulse-g\">↓</div><div class=\"fp-box good\">0 ✓ go</div></div>"
 },
 "Concurrency|BlockingQueue": {
  "icon": "📬",
  "hook": "Конвейер с буфером: упёрся в потолок — стой, пусто на ленте — жди, всё само синхронизируется.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">prod</div><div class=\"fp-arrow\">→</div><div class=\"fp-stack\"><div class=\"fp-slot\">t</div><div class=\"fp-slot\">t</div><div class=\"fp-slot\"></div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">cons</div></div>"
 },
 "Concurrency|Pinning": {
  "icon": "📌",
  "hook": "Лёгкий поток обычно спрыгивает с носильщика при блокировке, но в synchronized он к нему пришпилен.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">virtual</div><div class=\"fp-conn fp-blink\">📌 pinned</div><div class=\"fp-box bad\">carrier busy</div></div>"
 },
 "Concurrency|ThreadLocal": {
  "icon": "🗄️",
  "hook": "Личный ящик у каждого сотрудника: ключ один на всех, но содержимое у каждого своё.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-lane name\">T1</div><div class=\"fp-box acc\">val: A</div></div><div class=\"fp-col\"><div class=\"fp-lane name\">T2</div><div class=\"fp-box good\">val: B</div></div></div>"
 },
 "Concurrency|Livelock": {
  "icon": "🔄",
  "hook": "Два человека в коридоре шагают в одну сторону, потом синхронно в другую — и так бесконечно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut fp-pulse-r\">←→ A</div><div class=\"fp-conn fp-spin\">⟳</div><div class=\"fp-box mut fp-pulse-r\">→← B</div></div>"
 },
 "DB|Covering index": {
  "icon": "📇",
  "hook": "Каталог, в котором сразу написан ответ, а не «иди к полке за книгой».",
  "pic": "<div class=\"fp-row\" style=\"gap:14px;align-items:center\"><div class=\"fp-col\"><div class=\"fp-lane name\">index</div><div class=\"fp-box good fp-pulse-g\">id,name,sum</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">ответ</div><div class=\"fp-box mut\" style=\"opacity:.4\">heap (skip)</div></div>"
 },
 "DB|Keyset pagination": {
  "icon": "🔖",
  "hook": "Закладка в книге вместо «отсчитай заново 100000 страниц от начала».",
  "pic": "<div class=\"fp-row\" style=\"gap:14px;align-items:center\"><div class=\"fp-col\"><div class=\"fp-lane name\">OFFSET 100k</div><div class=\"fp-row\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell on\"></div></div></div><div class=\"fp-col\"><div class=\"fp-lane name\">keyset</div><div class=\"fp-row\"><div class=\"fp-cell on fp-pulse-g\"></div></div></div></div>"
 },
 "DB|Write skew": {
  "icon": "✂️",
  "hook": "Двое смотрят «нас двое, один может уйти» — и оба уходят, оставив смену пустой.",
  "pic": "<div class=\"fp-row\" style=\"gap:10px;align-items:center\"><div class=\"fp-col\"><div class=\"fp-lane name\">T1 read</div><div class=\"fp-box mut\">on=2</div><div class=\"fp-box bad\">leave</div></div><div class=\"fp-col\"><div class=\"fp-lane name\">T2 read</div><div class=\"fp-box mut\">on=2</div><div class=\"fp-box bad\">leave</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">on=0!</div></div>"
 },
 "DB|Оптимистичная блокировка": {
  "icon": "🎫",
  "hook": "Не запираешь дверь — но на выходе проверяешь, не входил ли кто, пока тебя не было.",
  "pic": "<div class=\"fp-row\" style=\"gap:8px;align-items:center\"><div class=\"fp-box mut\">read v=5</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">SET v=6 WHERE v=5</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box good\">1 row → ok</div><div class=\"fp-box bad\">0 rows → retry</div></div></div>"
 },
 "DB|N+1 запросов": {
  "icon": "🔁",
  "hook": "Принёс список из 100 имён, а за телефоном каждого бегаешь к справочнику отдельно — 100 раз.",
  "pic": "<div class=\"fp-row\" style=\"gap:14px;align-items:center\"><div class=\"fp-col\"><div class=\"fp-lane name\">N+1</div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">q</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.3s\">q</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.6s\">q</div></div></div><div class=\"fp-col\"><div class=\"fp-lane name\">JOIN</div><div class=\"fp-box good fp-pulse-g\">1 query</div></div></div>"
 },
 "DB|SKIP LOCKED": {
  "icon": "⏭️",
  "hook": "Берёшь на складе первую свободную коробку, а не стоишь в очереди за той, что уже несут.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px;align-items:center\"><div class=\"fp-lane name\">w1</div><div class=\"fp-cell on fp-pulse-g\">A</div><div class=\"fp-cell bad\">B🔒</div><div class=\"fp-lane name\">w2</div><div class=\"fp-cell on fp-pulse-g\">C</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">без пробки</div></div>"
 },
 "DB|GIN index": {
  "icon": "🔍",
  "hook": "Предметный указатель в конце книги: по слову — список всех страниц, где оно есть.",
  "pic": "<div class=\"fp-row\" style=\"gap:12px;align-items:center\"><div class=\"fp-box acc\">{status:paid}</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-lane name\">GIN</div><div class=\"fp-box good\">paid→[3,7,9]</div><div class=\"fp-box good\">new→[1,4]</div></div></div>"
 },
 "DB|BRIN index": {
  "icon": "🧱",
  "hook": "Не оглавление по каждой странице, а наклейка на каждой полке: «здесь даты с марта по апрель».",
  "pic": "<div class=\"fp-row\" style=\"gap:10px;align-items:center\"><div class=\"fp-stack\"><div class=\"fp-slot\">blk1 1-9</div><div class=\"fp-slot\">blk2 10-19</div><div class=\"fp-slot\">blk3 20-29</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">x=15? → blk2</div></div>"
 },
 "DB|Partial index": {
  "icon": "✂️",
  "hook": "Не каталог на весь склад, а отдельный список только «новых» коробок, которые реально разбирают.",
  "pic": "<div class=\"fp-row\" style=\"gap:12px;align-items:center\"><div class=\"fp-box mut\" style=\"opacity:.4\">10M rows</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-lane name\">WHERE status='NEW'</div><div class=\"fp-box good fp-pulse-g\">200 rows</div></div></div>"
 },
 "DB|Window function": {
  "icon": "🪟",
  "hook": "Каждой строке выписки приписать «итого по клиенту», не сворачивая выписку в одну строку.",
  "pic": "<div class=\"fp-row\" style=\"gap:8px;align-items:center\"><div class=\"fp-col\"><div class=\"fp-box\">A 10</div><div class=\"fp-box\">A 20</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box good\">A 10 | 30</div><div class=\"fp-box good\">A 20 | 30</div></div></div>"
 },
 "DB|Рекурсивный CTE": {
  "icon": "🌳",
  "hook": "Матрёшка-запрос: открыл узел, внутри ссылка на тот же запрос — и так до листьев.",
  "pic": "<div class=\"fp-row\" style=\"gap:10px;align-items:center\"><div class=\"fp-box acc\">anchor: root</div><div class=\"fp-arrow\">↺</div><div class=\"fp-col\"><div class=\"fp-box good\">child</div><div class=\"fp-box good\">grandchild</div></div></div>"
 },
 "DB|PreparedStatement": {
  "icon": "🛡️",
  "hook": "Бланк с пустыми полями: текст бланка фиксирован, в поля ты лишь вписываешь данные, а не дописываешь пункты.",
  "pic": "<div class=\"fp-row\" style=\"gap:10px;align-items:center\"><div class=\"fp-box acc\">WHERE id = ?</div><div class=\"fp-conn\">+</div><div class=\"fp-box good\">[42]</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">safe</div></div>"
 },
 "DB|HikariCP": {
  "icon": "🏊",
  "hook": "Таксопарк машин наготове у подъезда — не покупаешь новое авто на каждую поездку.",
  "pic": "<div class=\"fp-row\" style=\"gap:8px;align-items:center\"><div class=\"fp-col\"><div class=\"fp-lane name\">pool</div><div class=\"fp-row\"><div class=\"fp-node acc\"></div><div class=\"fp-node acc\"></div><div class=\"fp-node\"></div></div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">reuse, no reconnect</div></div>"
 },
 "Distributed|Consumer lag": {
  "icon": "📏",
  "hook": "Стопка непрочитанных писем растёт быстрее, чем ты успеваешь их разбирать.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center;gap:6px\"><div class=\"fp-lane name\">log</div><div class=\"fp-cell on\">0</div><div class=\"fp-cell on\">1</div><div class=\"fp-cell on fp-pulse-a\">2</div><div class=\"fp-cell\">3</div><div class=\"fp-cell\">4</div><div class=\"fp-val\" style=\"margin-left:6px\">lag=2</div></div>"
 },
 "Distributed|Rebalance": {
  "icon": "🔄",
  "hook": "Официантам переназначают столики — пока делят зоны, никто не обслуживает гостей.",
  "pic": "<div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-node acc\">C1</div><div class=\"fp-node acc\">C2</div><div class=\"fp-node fp-blink\">C3 new</div></div><div class=\"fp-row\" style=\"gap:4px\"><div class=\"fp-cell acc\">P0</div><div class=\"fp-cell acc\">P1</div><div class=\"fp-cell fp-pulse-r\">P2</div></div></div>"
 },
 "Distributed|ISR": {
  "icon": "🪞",
  "hook": "Кворум синхронных дублёров, которые держат ту же страницу, что и оригинал.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px;align-items:center\"><div class=\"fp-node acc\">leader</div><div class=\"fp-conn\"></div><div class=\"fp-col\" style=\"gap:3px\"><div class=\"fp-box good\">ISR r1</div><div class=\"fp-box good\">ISR r2</div><div class=\"fp-box bad fp-pulse-r\">lag r3</div></div></div>"
 },
 "Distributed|Backpressure": {
  "icon": "🚰",
  "hook": "Воронка с узким горлом: не вливай быстрее, чем оно успевает пропускать.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center;gap:4px\"><div class=\"fp-box acc\">producer</div><div class=\"fp-arrow\">→</div><div class=\"fp-bar\" style=\"width:60px\"><span style=\"width:95%\"></span></div><div class=\"fp-box bad fp-blink\">FULL</div><div class=\"fp-arrow\">⟸</div></div>"
 },
 "Distributed|Circuit Breaker": {
  "icon": "🔌",
  "hook": "Автомат в щитке: выбивает при коротком замыкании, чтобы не сгорела вся проводка.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px;align-items:center\"><div class=\"fp-box good\">Closed</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">Open</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">Half-Open</div></div>"
 },
 "Distributed|Temporal coupling": {
  "icon": "⏱️",
  "hook": "Звонок вместо письма: если абонент не взял трубку прямо сейчас — дело стоит.",
  "pic": "<div class=\"fp-row\" style=\"gap:4px;align-items:center\"><div class=\"fp-box acc\">A</div><div class=\"fp-arrow fp-blink\">⇄ now</div><div class=\"fp-box bad\">B down</div><div class=\"fp-val\" style=\"margin-left:6px\">A stuck</div></div>"
 },
 "Distributed|DLQ": {
  "icon": "☠️",
  "hook": "Ящик «разобраться потом»: ядовитое письмо убираем со стола, конвейер едет дальше.",
  "pic": "<div class=\"fp-row\" style=\"gap:4px;align-items:center\"><div class=\"fp-cell on\">m1</div><div class=\"fp-cell bad fp-pulse-r\">poison</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">retry</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">DLQ</div></div>"
 },
 "Distributed|CQRS": {
  "icon": "↔️",
  "hook": "Касса принимает заказы, а витрина показывает товар — это две разные стойки.",
  "pic": "<div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-row\" style=\"gap:4px;align-items:center\"><div class=\"fp-box acc\">cmd</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">write DB</div></div><div class=\"fp-row\" style=\"gap:4px;align-items:center\"><div class=\"fp-arrow fp-travel\">⇢</div><div class=\"fp-box mut\">read model</div><div class=\"fp-arrow\">←</div><div class=\"fp-box acc\">query</div></div></div>"
 },
 "Distributed|Quorum (R+W>N)": {
  "icon": "🗳️",
  "hook": "Если кворум писавших и кворум читавших обязаны пересечься — свежий голос не потеряется.",
  "pic": "<div class=\"fp-row\" style=\"gap:8px;align-items:center\"><div class=\"fp-col\"><div class=\"fp-val\">N=3</div><div class=\"fp-row\" style=\"gap:3px\"><div class=\"fp-cell good\">W</div><div class=\"fp-cell good\">W</div><div class=\"fp-cell\">·</div></div></div><div class=\"fp-col\"><div class=\"fp-val\">R=2</div><div class=\"fp-row\" style=\"gap:3px\"><div class=\"fp-cell acc\">R</div><div class=\"fp-cell acc\">R</div><div class=\"fp-cell\">·</div></div></div></div>"
 },
 "Distributed|Vector clock": {
  "icon": "🧭",
  "hook": "Не «во сколько по часам», а «кто что видел до тебя» — порядок по причинности, а не по времени.",
  "pic": "<div class=\"fp-row\" style=\"gap:8px;align-items:center\"><div class=\"fp-box acc\">A:[2,0,1]</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">B:[1,3,0]</div><div class=\"fp-val fp-blink\" style=\"margin-left:4px\">concurrent</div></div>"
 },
 "Distributed|2PC": {
  "icon": "🤝",
  "hook": "Свадебное «согласны?»: все сказали да — расписали; но если ведущий пропал — гости стоят у алтаря.",
  "pic": "<div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-row\" style=\"gap:4px;align-items:center\"><div class=\"fp-node acc\">coord</div><div class=\"fp-arrow\">prepare→</div><div class=\"fp-box good\">ok</div><div class=\"fp-box good\">ok</div></div><div class=\"fp-row\" style=\"gap:4px;align-items:center\"><div class=\"fp-node bad fp-pulse-r\">coord✗</div><div class=\"fp-arrow\">—</div><div class=\"fp-box mut fp-blink\">locked</div></div></div>"
 },
 "Distributed|Gossip": {
  "icon": "🗣️",
  "hook": "Сплетня по деревне: каждый шепнул паре соседей — и к утру знают все.",
  "pic": "<div class=\"fp-row\" style=\"gap:10px;align-items:center\"><div class=\"fp-node acc fp-pulse-a\">n1</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">n2</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\" style=\"animation-delay:0.4s\">n3</div></div>"
 },
 "Distributed|Log compaction": {
  "icon": "🗜️",
  "hook": "Не лента всех правок, а актуальная адресная книга: на ключ — одна свежая запись.",
  "pic": "<div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-row\" style=\"gap:3px\"><div class=\"fp-cell mut\">k1=a</div><div class=\"fp-cell mut\">k1=b</div><div class=\"fp-cell on fp-pulse-g\">k1=c</div></div><div class=\"fp-arrow\">↓ compact</div><div class=\"fp-row\" style=\"gap:3px\"><div class=\"fp-cell on\">k1=c</div><div class=\"fp-cell bad\">k2=∅</div></div></div>"
 },
 "Java|load factor": {
  "icon": "📦",
  "hook": "Полка заполнилась на три четверти — заказываем вдвое больше полок и раскладываем всё заново.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-bar\" style=\"width:120px\"><span class=\"fp-pulse-a\" style=\"width:75%\"></span></div><div class=\"fp-arrow\">⇒</div><div class=\"fp-row\" style=\"gap:2px\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div>"
 },
 "Java|fail-fast": {
  "icon": "💥",
  "hook": "Контролёр запомнил число пассажиров на входе — кто-то вышел в пути, и он тут же останавливает поезд.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box mut\">modCount=3</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">iter: 3</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">≠ → CME</div></div>"
 },
 "Java|ConcurrentHashMap": {
  "icon": "🔀",
  "hook": "Не один турникет на весь стадион, а отдельный замок на каждую дверь — толпа не давится в одну.",
  "pic": "<div class=\"fp-row\" style=\"gap:8px\"><div class=\"fp-box bad\">Hashtable<br>1 lock</div><div class=\"fp-arrow\">vs</div><div class=\"fp-row\" style=\"gap:2px\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div></div></div>"
 },
 "Java|Функциональный интерфейс": {
  "icon": "λ",
  "hook": "Одна-единственная дырка под ключ — поэтому подходит компактная отмычка-лямбда.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box acc\">@FunctionalInterface<br>1 abstract</div><div class=\"fp-arrow\">←</div><div class=\"fp-token fp-float\">x -> x+1</div></div>"
 },
 "Java|default-метод": {
  "icon": "🧩",
  "hook": "Заводская комплектация интерфейса: не переопределил — едешь на стоковой детали.",
  "pic": "<div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-box acc\">interface: default foo()</div><div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box good\">A: ok</div><div class=\"fp-box good\">B: ok</div></div></div>"
 },
 "Java|Маркерный интерфейс": {
  "icon": "🏷️",
  "hook": "Наклейка «хрупкое» на коробке — методов нет, но грузчик ведёт себя иначе.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box mut\">class</div><div class=\"fp-arrow\">+</div><div class=\"fp-box acc\">Serializable<br>(пусто)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">instanceof ✓</div></div>"
 },
 "Java|Рефлексия (Reflection)": {
  "icon": "🪞",
  "hook": "Программа смотрит в зеркало и читает собственное устройство, чтобы дёргать рычаги вслепую.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box\">\"User\"</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">Class.forName</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">invoke()</div></div>"
 },
 "Java|sealed": {
  "icon": "🔒",
  "hook": "Закрытый список приглашённых на входе — кого нет в permits, того не пускают наследоваться.",
  "pic": "<div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-box acc\">sealed Shape permits A,B</div><div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box good\">A ✓</div><div class=\"fp-box good\">B ✓</div><div class=\"fp-box bad\">C ✗</div></div></div>"
 },
 "Java|Pattern matching": {
  "icon": "🎯",
  "hook": "Один взмах: проверил «это строка?» и тут же достал её в коробку с этикеткой — без трёх отдельных шагов.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box bad\">instanceof<br>+cast<br>+assign</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">o instanceof<br>String s</div></div>"
 },
 "Java|record": {
  "icon": "📇",
  "hook": "Заполнил анкету полей — JVM сама дописала всю бухгалтерию (конструктор, equals, toString).",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box acc\">record P(x,y)</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\" style=\"gap:2px\"><div class=\"fp-box good\">equals</div><div class=\"fp-box good\">hashCode</div><div class=\"fp-box good\">toString</div></div></div>"
 },
 "Java|var": {
  "icon": "🔍",
  "hook": "«Компилятор, угадай тип сам по правой части» — но в байткоде тип всё равно жёстко зашит.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box\">var x =</div><div class=\"fp-box acc\">new ArrayList&lt;&gt;()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">ArrayList</div></div>"
 },
 "Java|Ссылка на метод": {
  "icon": "👉",
  "hook": "Не пересказывать рецепт целиком, а просто ткнуть пальцем в готовое блюдо.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box mut\">x -> x.length()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">String::length</div></div>"
 },
 "Java|Comparator": {
  "icon": "⚖️",
  "hook": "Comparable — характер самого человека; Comparator — судья со стороны, который ранжирует как захочет.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box acc\">comparing(age)</div><div class=\"fp-arrow\">.then</div><div class=\"fp-box acc\">comparing(name)</div></div>"
 },
 "Java|intern()": {
  "icon": "🗂️",
  "hook": "Сдал книгу в общую библиотеку — теперь все берут один и тот же экземпляр, а не плодят копии.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box mut\">new String(\"a\")</div><div class=\"fp-arrow\">.intern()</div><div class=\"fp-box good\">pool \"a\"</div></div>"
 },
 "Java|effectively final": {
  "icon": "🧊",
  "hook": "Не написал final, но и пальцем не тронул после присвоения — для лямбды это одно и то же.",
  "pic": "<div class=\"fp-row\" style=\"gap:6px\"><div class=\"fp-box good\">int n = 5;</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">() -> n ✓</div><div class=\"fp-box bad\">n++ → ✗</div></div>"
 },
 "Spring|BeanPostProcessor": {
  "icon": "🪝",
  "hook": "Таможня на конвейере: каждый бин проходит досмотр и его могут обернуть, прежде чем выпустить в приложение.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box mut\">raw bean</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc fp-pulse-a\">BPP</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">proxy</div></div>"
 },
 "Spring|Scope (singleton/prototype)": {
  "icon": "♻️",
  "hook": "Singleton — общий чайник в офисе, prototype — одноразовый стаканчик на каждого.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-lane name\">singleton</div><div class=\"fp-box acc\">#1</div></div><div class=\"fp-col\"><div class=\"fp-lane name\">prototype</div><div class=\"fp-row\"><div class=\"fp-box good\">#1</div><div class=\"fp-box good\">#2</div><div class=\"fp-box good\">#3</div></div></div></div>"
 },
 "Spring|Propagation (REQUIRED/REQUIRES_NEW)": {
  "icon": "🔀",
  "hook": "REQUIRED — подсаживаешься в едущую машину, REQUIRES_NEW — вызываешь себе отдельное такси.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-lane name\">REQUIRED</div><div class=\"fp-box acc\">tx A</div><div class=\"fp-box acc mut\">join A</div></div><div class=\"fp-col\"><div class=\"fp-lane name\">REQUIRES_NEW</div><div class=\"fp-box acc\">tx A</div><div class=\"fp-box good\">tx B</div></div></div>"
 },
 "Spring|Isolation level": {
  "icon": "🔒",
  "hook": "Чем выше уровень — тем толще стена между транзакциями, но тем дороже её строить.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">RU</div><div class=\"fp-box mut\">RC</div><div class=\"fp-box mut\">RR</div><div class=\"fp-box good\">S</div></div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-lane name\">слабее → строже</div></div>"
 },
 "Spring|@Version (оптимистичная блокировка)": {
  "icon": "🔢",
  "hook": "Номерок в гардеробе: пришёл со старым номером, пока ты гулял вещь поменяли — выдачу не дают.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box mut\">v=5</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">UPDATE WHERE v=5</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">v уже 6 ✗</div></div>"
 },
 "Spring|N+1 select": {
  "icon": "🐌",
  "hook": "Принёс список гостей, а за пальто каждого бегаешь в гардероб по очереди.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box acc\">SELECT list</div><div class=\"fp-arrow\">→</div><div class=\"fp-row\"><div class=\"fp-box bad\">q</div><div class=\"fp-box bad\">q</div><div class=\"fp-box bad\">q</div><div class=\"fp-box bad\">…N</div></div></div>"
 },
 "Spring|OSIV (Open Session In View)": {
  "icon": "👁️",
  "hook": "Кран с водой не закрывают до конца ужина — удобно, но он всё это время занят и капает.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box mut\">request</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">service</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">view</div><div class=\"fp-lane name\">session open всё время →</div></div>"
 },
 "Spring|Dirty checking": {
  "icon": "🔍",
  "hook": "Фотограф снял тебя на входе и на выходе — изменения в одежде заметит сам, ты ничего не докладываешь.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box mut\">snapshot</div><div class=\"fp-arrow\">≠</div><div class=\"fp-box acc\">entity now</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">UPDATE</div></div>"
 },
 "Spring|Persistence Context": {
  "icon": "🗂️",
  "hook": "Рабочий стол сессии: пока он открыт, все вынутые из БД объекты лежат на нём и Hibernate следит за их правками.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-lane name\">PC (L1 cache)</div><div class=\"fp-row\"><div class=\"fp-box acc\">User#1</div><div class=\"fp-box acc\">Order#7</div><div class=\"fp-box mut\">…</div></div><div class=\"fp-lane name\">привязан к ThreadLocal сессии</div></div>"
 },
 "Spring|FactoryBean": {
  "icon": "🏭",
  "hook": "Просишь у автомата шоколадку, а не сам автомат — хотя на кнопке написано название автомата.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box acc\">getBean(\"x\")</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">xFactory</div><div class=\"fp-arrow\">.getObject()</div><div class=\"fp-box good\">product</div></div>"
 },
 "Spring|@ConditionalOnMissingBean": {
  "icon": "🚦",
  "hook": "Запасной игрок выходит на поле, только если основного нет в составе.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box good\">your bean?</div><div class=\"fp-arrow\">да→</div><div class=\"fp-box mut fp-ver dead\">auto bean</div><div class=\"fp-arrow\">нет→</div><div class=\"fp-box acc\">auto bean</div></div>"
 },
 "Spring|@TransactionalEventListener": {
  "icon": "📣",
  "hook": "Объявляешь о свадьбе только когда печать в загсе уже стоит, а не пока ещё подписываете.",
  "pic": "<div class=\"fp-row\" style=\"align-items:center\"><div class=\"fp-box acc\">publishEvent</div><div class=\"fp-arrow\">…</div><div class=\"fp-box good\">COMMIT ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">listener</div></div>"
 },
 "Архитектура|CQRS": {
  "icon": "🔀",
  "hook": "Касса принимает деньги, а табло показывает баланс — разные окошки под разные задачи.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">Command</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">Write&nbsp;model</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">Query</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">Read&nbsp;model</div></div>"
 },
 "Архитектура|Event Sourcing": {
  "icon": "📜",
  "hook": "Не «сколько на счёте», а полная выписка по счёту — баланс пересчитываешь, складывая операции.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">+100</div><div class=\"fp-token\">-30</div><div class=\"fp-token\">+50</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">=120</div></div>"
 },
 "Архитектура|Saga": {
  "icon": "🔗",
  "hook": "Цепочка шагов с кнопкой «отменить» на каждом — если упало в середине, откатываешь сделанное в обратном порядке.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">T1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">T2</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">T3✗</div><div class=\"fp-arrow\">⤺</div><div class=\"fp-box mut\">C2</div><div class=\"fp-arrow\">⤺</div><div class=\"fp-box mut\">C1</div></div>"
 },
 "Архитектура|Bounded Context": {
  "icon": "🧩",
  "hook": "«Клиент» в биллинге и «клиент» в поддержке — разные люди на схеме, хоть слово одно.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">Billing:&nbsp;Клиент</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">Support:&nbsp;Клиент</div></div>"
 },
 "Архитектура|Aggregate Root": {
  "icon": "🌳",
  "hook": "Заказ — корень, его строки трогаешь только через заказ, чтобы сумма всегда сходилась.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-node acc\">Order&nbsp;(root)</div><div class=\"fp-row\"><div class=\"fp-node\">Line1</div><div class=\"fp-node\">Line2</div></div></div>"
 },
 "Архитектура|Value Object": {
  "icon": "💎",
  "hook": "100 тенге равны любым другим 100 тенге — важна сумма, а не «какая именно купюра».",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">Money{100,KZT}</div><div class=\"fp-conn\">=</div><div class=\"fp-box good\">Money{100,KZT}</div></div>"
 },
 "Архитектура|Domain Event": {
  "icon": "📣",
  "hook": "Запись в дневнике домена: «случилось вот это» — констатация факта, а не команда.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">Aggregate</div><div class=\"fp-arrow\">→</div><div class=\"fp-token fp-float\">OrderPlaced</div></div>"
 },
 "Архитектура|Transactional Outbox": {
  "icon": "📤",
  "hook": "Письмо кладёшь в исходящий лоток той же ручкой, что подписал документ — потом почтальон заберёт.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">DB&nbsp;tx:&nbsp;data+outbox</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">relay</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">Kafka</div></div>"
 },
 "Архитектура|Idempotent Consumer": {
  "icon": "♻️",
  "hook": "Лифт: жми кнопку этажа десять раз — приедет один раз на тот же этаж.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-token\">msg#42</div><div class=\"fp-token\">msg#42</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">applied&nbsp;once</div></div>"
 },
 "Архитектура|Anti-Corruption Layer": {
  "icon": "🛡️",
  "hook": "Переводчик на переговорах — собеседник говорит на своём языке, а до тебя доходит уже на твоём.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad\">Legacy</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">ACL</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">Your&nbsp;domain</div></div>"
 },
 "Архитектура|Strangler Fig": {
  "icon": "🌿",
  "hook": "Фикус-душитель оплетает дерево и постепенно занимает его место — старое отмирает по частям.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">Router</div><div class=\"fp-col\"><div class=\"fp-box good\">New&nbsp;A</div><div class=\"fp-box mut\">Legacy&nbsp;B</div></div></div>"
 },
 "Архитектура|Шардинг": {
  "icon": "🔪",
  "hook": "Картотека по первой букве фамилии: А-К в одном шкафу, Л-Я в другом — ищешь сразу в нужном.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">key→hash</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">shard0</div><div class=\"fp-box good\">shard1</div><div class=\"fp-box good\">shard2</div></div>"
 },
 "Архитектура|Raft": {
  "icon": "🗳️",
  "hook": "Группа выбирает старосту, он ведёт общий протокол, а запись считается принятой, когда за неё больше половины.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">Leader</div><div class=\"fp-arrow\">→</div><div class=\"fp-node\">F1</div><div class=\"fp-node\">F2</div><div class=\"fp-val\">quorum&nbsp;N/2+1</div></div>"
 },
 "System Design|Non-functional requirements": {
  "icon": "📐",
  "hook": "Сначала спроси «куда едем», потом считай бензин, потом рисуй маршрут — и только потом думай где пробка"
 },
 "System Design|Back-of-the-envelope": {
  "icon": "✉️",
  "hook": "Прикидка на салфетке: не «сколько точно», а «тысячи или миллионы» — этого хватает решить, нужен ли кэш"
 },
 "System Design|QPS / RPS": {
  "icon": "⚡",
  "hook": "QPS = люди × действия ÷ 100k секунд. А отношение чтение/запись — это где у системы болит"
 },
 "System Design|Tail latency (p99)": {
  "icon": "🐢",
  "hook": "Latency-бюджет — это конверт денег: раздал всем слоям, и сумма должна влезть. Кто берёт больше всех — тот и проблема"
 },
 "System Design|SLA / девятки": {
  "icon": "🟢",
  "hook": "Девятки — как ступени: каждая следующая в 10 раз меньше простоя, но в разы дороже железа и нервов"
 },
 "System Design|CAP / PACELC": {
  "icon": "⚖️",
  "hook": "Сеть всё равно порвётся. Вопрос один: при разрыве соврать-но-ответить (AP) или промолчать-но-честно (CP)"
 },
 "System Design|ACID vs BASE": {
  "icon": "🗄️",
  "hook": "SQL — бухгалтерская книга со строгими правилами. NoSQL — гора стикеров: быстро лепишь и достаёшь по ключу, но порядок не гарантирован"
 },
 "System Design|Shard key": {
  "icon": "🔑",
  "hook": "Шард-ключ — как раскладка гостей по столам: рассадишь плохо — один стол ломится, остальные пустые"
 },
 "System Design|Replication lag": {
  "icon": "🔁",
  "hook": "Sync — отправил посылку и ждёшь подпись получателя. Async — бросил в почтовый ящик и пошёл: быстро, но не факт что дойдёт"
 },
 "System Design|Token bucket": {
  "icon": "🪣",
  "hook": "Ведро с водой: капает струйкой (refill), каждый запрос — стакан воды. Пересохло — жди."
 },
 "System Design|base62": {
  "icon": "🔢",
  "hook": "Номерок в гардеробе: дают по порядку (counter), но печатают компактным шрифтом (base62)."
 },
 "System Design|Zipf-распределение": {
  "icon": "📉",
  "hook": "301 — переезд навсегда (почта не пишет), 302 — временно у соседей (каждый раз спрашивают, дома ли ты)."
 },
 "System Design|Fan-out": {
  "icon": "🌬️",
  "hook": "Push — разносчик газет кладёт в каждый ящик заранее. Pull — ты сам обходишь киоски при выходе. Звезду никто не разносит — за ней очередь."
 },
 "System Design|Dead-letter queue (DLQ)": {
  "icon": "📭",
  "hook": "Почтовая сортировка: письма в очереди, на каждом штамп-id (не отправить дважды), бланк-шаблон, недоставленное — в ящик «возвраты» (DLQ)."
 },
 "System Design|Sorted Set (ZSET)": {
  "icon": "🏆",
  "hook": "Sharded counter — несколько касс вместо одной очереди. ZSET — турнирная таблица, всегда отсортирована, видно место мгновенно."
 },
 "System Design|Double-entry ledger": {
  "icon": "📒",
  "hook": "Бухгалтерская книга: каждый рубль откуда-то ушёл и куда-то пришёл — иначе книга не сходится."
 },
 "System Design|Sync cursor (afterSeq)": {
  "icon": "🔖",
  "hook": "Почтовое отделение: письмо сначала ложится в ячейку (durable), а дальше адресат либо дома (push), либо заберёт сам (pull при реконнекте)."
 },
 "System Design|Heartbeat + TTL": {
  "icon": "💓",
  "hook": "Лампочка с таймером: пока жмёшь кнопку раз в 30 сек — горит; перестал — через 45 сек гаснет сама."
 },
 "System Design|Pre-signed URL": {
  "icon": "🔗",
  "hook": "Пропуск на склад: охрана (бэкенд) выдаёт временный пропуск, дальше грузовик едет на склад сам, мимо офиса."
 },
 "System Design|Инвертированный индекс": {
  "icon": "🗂️",
  "hook": "Trie — это оглавление по первым буквам, ведёт к продолжению. Инвертированный индекс — предметный указатель в конце книги: слово → страницы."
 },
 "System Design|Cache stampede": {
  "icon": "🐃",
  "hook": "Гардеробное кольцо: добавил вешалку — переезжает только горстка пальто рядом, а не весь гардероб. И один гонец за пальто, а не толпа разом."
 },
 "Build|Phase": {
  "icon": "🪜",
  "hook": "Эскалатор: встал на любую ступеньку — но доехал от самого низа, перепрыгнуть нельзя"
 },
 "Build|Scope": {
  "icon": "🔭",
  "hook": "provided = «инструмент уже на месте работы»: на сборку он тебе нужен в голове, но в коробку с продуктом класть не надо — на заводе он есть"
 },
 "Build|Nearest-wins": {
  "icon": "📏",
  "hook": "Не «кто старше», а «кто ближе к начальству»: ближний родственник наследует, дальний — мимо"
 },
 "Build|BOM": {
  "icon": "📋",
  "hook": "BOM = прайс-лист на складе: каждый цех заказывает деталь по имени, цену (версию) берёт из единого прайса, не выдумывает свою"
 },
 "Build|Reactor": {
  "icon": "⚛️",
  "hook": "Reactor = прораб на стройке: сначала фундамент (core), потом стены (app) — порядок диктует логика, а не список в смете"
 },
 "Build|Goal (Mojo)": {
  "icon": "🎯",
  "hook": "Плагин = ящик с инструментами, goal = конкретный инструмент. Фаза — это «момент в графике работ», когда инструмент достают"
 },
 "Build|Profile": {
  "icon": "🎚️",
  "hook": "Профиль = переключатель режима на стиральной машине: барабан тот же (pom), но «деликатная/быстрая» меняют программу под ситуацию"
 },
 "Build|Relocation (shading)": {
  "icon": "🏷️",
  "hook": "Relocation = переклеить этикетку: две одинаковые банки (guava) на полке — одну переименовываешь, чтобы повар не схватил не ту"
 },
 "Build|ABI (Application Binary Interface)": {
  "icon": "🔌",
  "hook": "api — это окно наружу (все видят), implementation — внутренняя кухня (заперта дверью)"
 },
 "Build|BOM / platform": {
  "icon": "📋",
  "hook": "Gradle берёт самого «старшего по версии», Maven — самого «близкого по родству»"
 },
 "Build|UP-TO-DATE": {
  "icon": "⏭️",
  "hook": "Кэш — это память «я это уже считал»: тот же вопрос → тот же готовый ответ из ящика"
 },
 "Build|Транзитивная зависимость": {
  "icon": "🔗",
  "hook": "dependency:tree — это рентген classpath: видно все кости и где перелом версий"
 },
 "Build|Dependency locking": {
  "icon": "🔒",
  "hook": "MAJOR — переезд в другой дом (ключи не подходят), MINOR — новая мебель, PATCH — починили кран"
 },
 "Reactive|Reactive Streams": {
  "icon": "🔌",
  "hook": "Publisher — официант, Subscriber — гость. Гость говорит «неси 3 блюда» (request 3), официант не вываливает всё меню сразу."
 },
 "Reactive|Backpressure": {
  "icon": "🚰",
  "hook": "Backpressure — это вентиль на пожарном шланге. Не закроешь — захлебнёшься. request(n) и есть рука на вентиле."
 },
 "Reactive|Overflow strategy": {
  "icon": "🌊",
  "hook": "Очередь в кассу без места: BUFFER — строим всех в коридор, DROP — новых не пускаем, LATEST — пускаем только последнего, ERROR — закрываем магазин."
 },
 "Reactive|Dynamic push-pull": {
  "icon": "🔁",
  "hook": "Pull — ты сам ходишь к колодцу с ведром. Push — на тебя льют без спроса. Reactive — говоришь «налей 3 литра», и тебе наливают ровно 3."
 },
 "Reactive|Hot / Cold publisher": {
  "icon": "🌡️",
  "hook": "Cold — это Netflix: жмёшь play, фильм с начала лично тебе. Hot — это прямой эфир: подключился позже — начало пропустил."
 },
 "Reactive|Virtual threads (Loom)": {
  "icon": "🧵",
  "hook": "Loom — это автомат-коробка: едешь просто. Reactive — спорткар с ручной: быстрее в гонке потоков данных, но переключай передачи сам и легко заглохнуть."
 },
 "Reactive|Cardinality": {
  "icon": "🔢",
  "hook": "Mono = Optional на проводе, Flux = Stream на проводе. Mutiny просто переименовал: Uni и Multi."
 },
 "Reactive|flatMapSequential": {
  "icon": "🔀",
  "hook": "map — переложил в коробке; flatMap — открыл N посылок сразу, кто первый распакован тот и выехал; concatMap — очередь по одному."
 },
 "Reactive|combineLatest": {
  "icon": "🔗",
  "hook": "zip — застёжка-молния: левый зуб + правый зуб = звено. merge — высыпать два пакета в одну корзину. combineLatest — табло «последний курс каждой валюты»."
 },
 "Reactive|retryWhen / Retry.backoff": {
  "icon": "🔁",
  "hook": "retry — «попробуй ещё раз с начала». onErrorResume — «не вышло, иди по запасному маршруту». onErrorReturn — «совсем никак, держи заглушку»."
 },
 "Reactive|Cold publisher": {
  "icon": "❄️",
  "hook": "Publisher — это рецепт в книге, а не готовое блюдо. subscribe() = включить плиту. Нет subscribe — голодный сидишь над книгой."
 },
 "Reactive|boundedElastic / BlockHound": {
  "icon": "🧵",
  "hook": "subscribeOn — где завод (источник). publishOn — где товар пересаживают на другую фуру. Event-loop — один официант на зал: заставил варить кофе (блокировка) — зал голодает, отдай на кухню (boundedElastic)."
 },
 "Web|IDL": {
  "icon": "📜",
  "hook": "Чертёж детали один — токарь на любом станке выточит одинаковое"
 },
 "Web|Мультиплексирование": {
  "icon": "🔀",
  "hook": "HTTP/1.1 — одна касса по очереди, HTTP/2 — много кассиров в одном зале"
 },
 "Web|Streaming RPC": {
  "icon": "🌊",
  "hook": "Один-один, один-много, много-один, много-много — как четыре формы диалога"
 },
 "Web|Field tag": {
  "icon": "🔢",
  "hook": "Номер поля — как номер места в самолёте: пассажир сменит имя, кресло то же"
 },
 "Web|reserved": {
  "icon": "🚧",
  "hook": "reserved — как заваренная дверь в номер отеля: туда новых гостей не селят"
 },
 "Web|gRPC-Web": {
  "icon": "🌐",
  "hook": "gRPC — служебный лифт между этажами, REST — парадный вход для гостей"
 },
 "Web|Deadline propagation": {
  "icon": "⏳",
  "hook": "Deadline — это поезд в 18:00 на всех пересадках, а не «по 10 минут на станцию»"
 },
 "Crypto|AEAD": {
  "icon": "🔐",
  "hook": "AES — это сейф с одним ключом: тем же ключом запер, тем же отпер. Режим — это правило, как сцеплять много маленьких сейфов в цепочку, а nonce — случайная бирка, чтобы две одинаковые посылки выглядели по-разному."
 },
 "Crypto|Лавинный эффект": {
  "icon": "🌊",
  "hook": "Хеш — это мясорубка: фарш из стейка сделаешь мгновенно, а стейк обратно из фарша — никогда. И если поменять в стейке хоть жилку, фарш на вид будет совсем другой."
 },
 "Crypto|Memory-hard": {
  "icon": "🧱",
  "hook": "SHA — это спортивный болид, делает миллион хешей в секунду, и для паролей это плохо: атакующий на нём же гоняет перебор. Алгоритм паролей — это бетономешалка: медленный и тяжёлый специально, чтобы и тебе, и взломщику каждый замес стоил дорого."
 },
 "Crypto|Length-extension": {
  "icon": "➕",
  "hook": "Хеш доказывает, что данные не побились (целостность), но любой может его пересчитать. HMAC — это печать на конверте, которую может поставить только тот, у кого есть секретная печатка: и что не вскрывали видно, и что отправил свой."
 },
 "Crypto|KMS": {
  "icon": "🗝️",
  "hook": "In-transit — это бронированный фургон инкассации, пока деньги едут по городу. At-rest — это сейф в банке, где они лежат. Бессмысленно иметь фургон без сейфа или сейф без фургона — грабят и там, и там."
 },
 "Crypto|Односторонняя функция": {
  "icon": "🔁",
  "hook": "Зашифровать пароль — это запереть его на ключ, который ты же таскаешь рядом. Хешировать — это сжечь оригинал и оставить только пепел-отпечаток: сверить новый пароль с пеплом можешь, а восстановить исходный — никто, включая тебя."
 },
 "Crypto|Гибридное шифрование": {
  "icon": "🔀",
  "hook": "Публичный ключ — это открытый навесной замок, который ты раздал всем желающим. Защёлкнуть его на ящике может любой, а вот ключ от него (приватный) есть только у тебя."
 },
 "Crypto|Неотрекаемость (non-repudiation)": {
  "icon": "✍️",
  "hook": "Подпись — как восковая печать на письме. Сделать оттиск может только тот, у кого твой именной перстень (приватный ключ), а вот узнать твою печать в лицо (публичный ключ) — кто угодно."
 },
 "Crypto|Forward Secrecy": {
  "icon": "🔒",
  "hook": "Диффи-Хеллман — как смешать краски. Каждый берёт свой тайный оттенок, публично обменивается смесью с общей базой, потом домешивает свой тайный — у обоих один цвет. А подслушавший, имея обе смеси, разделить их обратно на оттенки не может."
 },
 "Crypto|Trust anchor (якорь доверия)": {
  "icon": "⚓",
  "hook": "Сертификат — как загранпаспорт. Сам по себе листок ничего не значит, но ему верят, потому что его выдало государство (CA), которому доверяют. А государству доверяют, потому что его признаёт мировое сообщество (корневой стор в твоей ОС)."
 },
 "Crypto|1-RTT / 0-RTT": {
  "icon": "⚡",
  "hook": "Хендшейк — как два человека через стеклянную дверь придумывают общий шифр для записок. Сначала громко (открыто) договариваются о правилах, проверяют паспорт друг друга (сертификат), а потом переходят на тайный язык (AES), который вывели вместе."
 },
 "Crypto|JWKS": {
  "icon": "🔑",
  "hook": "JWT-payload — это не сейф, а конверт из прозрачной плёнки: содержимое видно всем. Подпись — восковая печать на нём: если кто-то вскрыл и переписал, печать не сойдётся. Не проверишь печать — примешь любую подделку за подлинник."
 },
 "Web|HATEOAS": {
  "icon": "🔗",
  "hook": "REST-зрелость — как уровни вождения. L0: толкаешь машину руками. L1: есть руль, но одна передача. L2: полноценная коробка и сигналы — где почти все и ездят. L3: автопилот, который ещё и подсказывает повороты."
 },
 "Web|Location header": {
  "icon": "📍",
  "hook": "Статус-коды — как ответ официанта. 2xx «несу блюдо». 4xx «вы заказали то, чего нет в меню — это вы напутали». 5xx «у нас на кухне пожар — мы напутали». Путать классы — всё равно что винить гостя за пожар на кухне."
 },
 "Web|Idempotency-Key": {
  "icon": "🔑",
  "hook": "Idempotency-Key — как номерок в гардеробе. Дал куртку, получил номерок №7. Подходишь второй раз с тем же №7 — тебе отдают ту же куртку, а не выдают новую. Сервер по ключу узнаёт «это та же операция», и не списывает деньги дважды."
 },
 "Web|Content negotiation": {
  "icon": "🤝",
  "hook": "Версионирование — как адрес магазина. URI: новый филиал по новому адресу — все сразу видят. Header: тот же адрес, но шепчешь охраннику «мне в обновлённый зал». Media-type: тот же адрес, и просишь товар «в упаковке образца 2024». Чем тоньше намёк — тем легче запутаться курьеру."
 },
 "Web|problem+json": {
  "icon": "🧾",
  "hook": "problem+json — как единый бланк рекламации. Раньше каждый отдел писал отказ на своём листочке как попало, и юрист сходил с ума разбирая. Ввели один бланк с графами «тип/заголовок/статус/детали» — и любой отдел заполняет одинаково, клиент читает мгновенно."
 },
 "Web|Resource": {
  "icon": "📦",
  "hook": "URI — как полки склада, глаголы — как операции с ними. Полка называется «заказы», а не «взять-заказ». Ты не делаешь полку «удалить-заказы» — ты берёшь полку «заказы» и применяешь к ней действие DELETE. Глагол в названии полки — это бардак на складе."
 },
 "Web|Keyset pagination": {
  "icon": "🔖",
  "hook": "Offset — это «отсчитай от начала очереди 5000 человек и выкинь их». Keyset — «встань сразу за вон тем рыжим». Чем глубже, тем больнее первому."
 },
 "Web|Retry-After": {
  "icon": "⏳",
  "hook": "X-RateLimit-Remaining — это спидометр и остаток бензина: видишь заранее, что кончается. Retry-After после 429 — это знак «кирпич» с таймером: стой ровно столько."
 },
 "Web|Vary": {
  "icon": "🔀",
  "hook": "Один и тот же шашлык, но Accept — это «мне на лаваше, по-русски, не острый». Кухня (URL) одна, подача разная. Vary: Accept — чтобы официант не принёс чужой заказ из памяти."
 },
 "Web|Expand-contract": {
  "icon": "🪜",
  "hook": "Меняешь рельсы под идущим поездом: сначала кладёшь второй путь рядом (expand), переводишь поезда на него, и только потом снимаешь старый (contract). Срезать старый путь сразу — крушение."
 },
 "Web|Protobuf": {
  "icon": "📦",
  "hook": "REST — меню в кафе: берёшь блюдо целиком. RPC/gRPC — звонок на кухню «сделай вот это действие». GraphQL — шведский стол: сам кладёшь на тарелку ровно те поля, что нужны, ни больше ни меньше."
 },
 "Algorithms|Radix tree": {
  "icon": "🌲",
  "hook": "Это как папки в файловом проводнике: «Documents/» — один общий путь, а внутри уже расходятся Work, Photos, Music. Не дублируешь «Documents» в каждом имени файла."
 },
 "Algorithms|Treeification": {
  "icon": "🔴",
  "hook": "Это как стопка книг против библиотечной полки. Свалил книги в одну колонну — чтобы найти нижнюю, перебираешь все. Расставил вширь по полкам — за пару шагов у любой."
 },
 "Algorithms|α(n) — обратная Аккермана": {
  "icon": "♾️",
  "hook": "Это как вопрос «мы с тобой из одного клана?». Каждый знает своего вождя по цепочке наставников. А path compression — это «давай все запомним вождя напрямую, чтобы в следующий раз не бегать через всю цепочку»."
 },
 "Algorithms|Lazy propagation": {
  "icon": "💤",
  "hook": "Это как счётчики на этажах склада. Хочешь знать «сколько коробок на этажах 1–5» — не пересчитываешь каждую, а складываешь несколько укрупнённых счётчиков. Привезли коробку — поправил лишь те счётчики, что её охватывают."
 },
 "Algorithms|accessOrder": {
  "icon": "🔀",
  "hook": "Это как стопка тарелок на раздаче. Взял тарелку — кладёшь чистую сверху. Места нет — убираешь самую нижнюю, до которой давно никто не дотягивался. Сверху всегда то, чем только что пользовались."
 },
 "Algorithms|False positive": {
  "icon": "🎲",
  "hook": "Вышибала со списком VIP по росту и цвету куртки: «нет такого» — верит точно, «вроде был» — может перепутать с похожим."
 },
 "Algorithms|Skip list": {
  "icon": "🪜",
  "hook": "Метро с экспрессом и местной линией: едешь экспрессом мимо станций, выходишь у нужного района, дальше пересаживаешься на местную — не объезжаешь каждую остановку."
 },
 "Algorithms|Binary heap": {
  "icon": "⛰️",
  "hook": "Приёмное отделение по triage: всегда мгновенно знаешь, кто самый тяжёлый (вершина), но полный отсортированный список всех пациентов не ведёшь — он не нужен."
 },
 "Algorithms|Виртуальные узлы (vnodes)": {
  "icon": "🔵",
  "hook": "Круглый стол официантов: каждый обслуживает сектор по часовой стрелке. Один ушёл — его столики берёт сосед справа, остальные секторы не трогаются. mod N — это пересадить вообще всех."
 },
 "Algorithms|HyperLogLog": {
  "icon": "🔢",
  "hook": "На входе фестиваля: HLL — «сколько разных людей зашло за день» (не запоминая каждого). CMS — «сколько раз приходил именно вот этот завсегдатай». Разные вопросы — разные приборы."
 },
 "Distributed|binding": {
  "icon": "🔗",
  "hook": "Exchange — это почтовый сортировочный узел. Ты бросаешь письмо с индексом (routing key), а сортировщик по таблице (bindings) кладёт копии в нужные ящики (очереди). Отправитель ящиков не видит."
 },
 "Distributed|deliveryTag": {
  "icon": "🏷️",
  "hook": "Официантка (prefetch=2) берёт максимум 2 заказа на руки. Пока не отдала (ack) хоть один, третий не несёт. autoAck — это «считать заказ выполненным в момент, когда взяла со стойки»: уронила поднос — гость голодный, а кухня думает, что накормила."
 },
 "Distributed|offset": {
  "icon": "📍",
  "hook": "RabbitMQ — это касса с лентой выдачи: взял заказ, унёс, заказа на ленте больше нет. Kafka — это видеозапись смены: смотри с любой минуты, перематывай, пять разных людей смотрят свой кусок независимо. Запись стирается по таймеру (retention), а не когда кто-то посмотрел."
 },
 "Distributed|poison message": {
  "icon": "☠️",
  "hook": "DLQ — это корзина «вернувшаяся почта» на сортировке. Письмо не доставили (отказ), оно протухло (TTL) или ящик переполнен — вместо того чтобы выбросить, кладут в особую корзину с пометкой почему. Потом человек разбирает, а не теряет молча."
 },
 "Distributed|receiptHandle": {
  "icon": "🎫",
  "hook": "Visibility timeout — как взять книгу в библиотеке «на руки на час». Пока она у тебя, в каталоге помечена «выдана» — другой не возьмёт. Сдал (delete) — исчезла из выдачи. Час прошёл, не сдал — система решает, что ты потерялся, и снова выставляет книгу. Поэтому двое могут получить копию."
 },
 "Distributed|partition key": {
  "icon": "🗝️",
  "hook": "Очередь в кассу честная, пока касса одна. Открыли вторую — и тот, кто стоял позади, может пробиться первым, если впереди тормозит. Чтобы клиент всегда обслуживался по порядку, направь всех «однофамильцев» к ОДНОЙ кассе (ключ партиции). Разные фамилии — пусть идут параллельно."
 },
 "Distributed|consumer group": {
  "icon": "👥",
  "hook": "Один длинный список заказов и три повара у одной стойки. Кто освободился — хватает следующий тикет. Втрое быстрее, и если повар уронился — двое продолжают. Минус: блюда выходят не строго в порядке заказов, и если тикет вернули — его может взять уже другой повар."
 },
 "Distributed|retention": {
  "icon": "🗄️",
  "hook": "Очередь — список дел на холодильнике: сделал пункт, зачеркнул, забыл. Лог — дневник: записал факт, и его читают разные люди (бухгалтер, врач, ты сам через год), каждый со своей закладкой, и можно перечитать прошлое. Дела выбрасывают, дневник хранят."
 },
 "Concurrency|ScopedValue": {
  "icon": "🔒",
  "hook": "Бригада альпинистов на одной верёвке: связаны в одну связку, идут вместе. Сорвался один — страховка дёргает остальных, и группа не расползается по горе поодиночке. Старший (родитель) не уходит с маршрута, пока вся связка не собрана."
 },
 "Web|Confused deputy": {
  "icon": "🕵️",
  "hook": "Это как охранник, который пускает по пропускам, но способ проверки пропуска ему диктует сам входящий. Гость говорит «мой пропуск проверять не надо» — и охранник послушно не проверяет. Чинится одним правилом: способ проверки решает охрана, а не гость."
 },
 "Algorithms|Floyd's Tortoise and Hare": {
  "icon": "🐢",
  "hook": "Два бегуна на круговом стадионе с разной скоростью: быстрый неизбежно сделает быстрому круг и нагонит медленного сзади."
 },
 "Algorithms|Quickselect": {
  "icon": "🎯",
  "hook": "Ищешь нужную книгу на полке по высоте: берёшь случайную, делишь полку на «ниже» и «выше», и роешься только в той стопке, где может быть твоя — вторую не трогаешь вообще."
 },
 "Reactive|Reactor Context": {
  "icon": "🧭",
  "hook": "Это как эстафета наоборот: финишёр (subscribe) первым берёт палочку-Context и передаёт её назад по дорожке — к стартующему бегуну (источнику). Кто стоит ВЫШЕ по дорожке, палочку получит; кто ниже точки передачи — нет."
 },
 "Build|Filer": {
  "icon": "🗂",
  "hook": "Процессор — это подрядчик, которого прораб (javac) пускает на стройку до заливки бетона: тот дочерчивает недостающие чертежи (исходники), и только когда чертить больше нечего — заливают всё разом."
 },
 "JVM|Cleaner / PhantomReference": {
  "icon": "🧹",
  "hook": "Direct buffer — это камера хранения за пределами твоей квартиры. В квартире (heap) висит только бирка-ключ. Пока ключ валяется в кармане, ячейку никто не освободит — даже если барахло в ней тебе давно не нужно."
 },
 "DevOps|cgroup memory limit": {
  "icon": "🧱",
  "hook": "Это как вышибала в клубе с лимитом по пожарной безопасности: когда людей больше нормы, он не спрашивает и не предупреждает — просто выкидывает за дверь. Внутри клуба никто не объявлял «мест нет» (нет Java-OOM), решение приняли снаружи (ядро)."
 },
 "Crypto|Envelope encryption": {
  "icon": "🔐",
  "hook": "Сейф в банке: внутри — твой ключ от квартиры (data-key), снаружи — замок банка (master в KMS). Сменить замок банка просто, а каждую квартиру перевешивать не надо."
 },
 "Design|Stateless server": {
  "icon": "🍽️",
  "hook": "Официант без памяти: любой обслужит любого гостя, потому что заказ записан на чеке (токен/Redis), а не в голове официанта."
 },
 "Infra|HPA (Horizontal Pod Autoscaler)": {
  "icon": "🌡️",
  "hook": "Термостат для подов: держит «температуру» (загрузку) у целевой отметки, добавляя или убирая кондиционеры."
 },
 "Infra|Cold start": {
  "icon": "🥶",
  "hook": "Спортсмен без разминки: первые рывки рваные, нужен прогрев до рабочей формы."
 },
 "Design|Latency numbers": {
  "icon": "🪜",
  "hook": "Линейка масштабов: каждая ступень ×~1000, и сразу видно, что дорого, а что бесплатно."
 },
 "Design|Back-of-the-envelope estimation": {
  "icon": "✉️",
  "hook": "Расчёт на салфетке: грубо, но сразу ясно — одна коробка или дата-центр."
 },
 "Distributed|Quorum (кворум)": {
  "icon": "🗳️",
  "hook": "Большинство голосов: две группы «больше половины» обязательно пересекутся — второго президента не выбрать."
 },
 "Distributed|Fencing token": {
  "icon": "🎫",
  "hook": "Номерок в очереди: склад принимает только талон с числом больше предыдущего; опоздавший со старым талоном — мимо."
 },
 "Distributed|Lambda-архитектура": {
  "icon": "λ",
  "hook": "Два повара: один готовит идеально, но долго (batch), второй быстрый набросок (stream); подаём вместе."
 },
 "Distributed|Колоночное хранение (columnar)": {
  "icon": "📊",
  "hook": "Картотека по полям, а не по карточкам: нужен «возраст всех» — берёшь один ящик, не перебирая все анкеты целиком."
 },
 "Design|Non-functional requirements": {
  "icon": "📐",
  "hook": "Не «что за дом», а «на сколько жильцов и землетрясений» — от этого и зависит фундамент."
 },
 "Java|Копия ссылки (reference copy)": {
  "icon": "📋",
  "hook": "Ксерокопия ключа: открывает ту же квартиру (мутация видна), но выбросив копию — оригинальный ключ не теряешь (reassign локален)."
 },
 "Java|Иммутабельность ключа (key immutability contract)": {
  "icon": "🔒",
  "hook": "Ключ от сейфа нельзя перепиливать, пока сейф заперт: распилишь — и новый ключ уже не подойдёт, а замок останется закрытым навсегда."
 },
 "Java|ForwardingNode": {
  "icon": "🚧",
  "hook": "Дорожный знак «ремонт, объезд →»: наткнулся на бакет — иди в новую таблицу, а заодно помоги перенести соседние."
 },
 "Java|fail-fast итератор": {
  "icon": "🚨",
  "hook": "Сигнализация в музее: тронул экспонат не по протоколу — сирена воет сразу, а не «потом разберёмся»."
 },
 "Concurrency|Реентрантность (Reentrancy)": {
  "icon": "🔁",
  "hook": "Как ключ-карта от номера отеля: ты уже внутри — заходишь в ту же дверь снова без новой карты, но выйти насовсем надо столько же раз, сколько вошёл."
 },
 "Concurrency|Флаг прерывания (interrupt status)": {
  "icon": "🚩",
  "hook": "Как красный флажок на почтовом ящике: сосед его поднял (interrupt), но забирать письмо и реагировать — твоя обязанность; никто не вытащит тебя из дома силой."
 },
 "Concurrency|Безопасная публикация (safe publication)": {
  "icon": "📦",
  "hook": "Посылку отдают получателю только после того, как её запечатали (freeze) — нельзя забрать полупустую коробку."
 },
 "Concurrency|Spurious wakeup (ложное пробуждение)": {
  "icon": "😵‍💫",
  "hook": "Будильник звякнул сам собой в 3 ночи — встал, а вставать рано. Пока не глянул на часы (re-check условия), не верь пробуждению."
 },
 "JVM|Достижимость (reachability)": {
  "icon": "🌳",
  "hook": "Дерево от корня: жива та ветка, до которой можно дойти от ствола (root). Отрезанная ветка падает, даже если её листья держатся друг за друга."
 },
 "JVM|Card table": {
  "icon": "🗂️",
  "hook": "Доска объявлений по кварталам old gen: красная метка на квартале = «здесь кто-то завёл ссылку, проверь меня», и сборщик идёт только в помеченные кварталы."
 },
 "JVM|Compressed Oops": {
  "icon": "🗜️",
  "hook": "Короткий почтовый индекс вместо полного адреса: экономит место на каждом «конверте»-ссылке, пока «город» (heap) не перерос 32 ГБ."
 },
 "JVM|Утечка ClassLoader (ClassLoader leak)": {
  "icon": "⚓",
  "hook": "Якорь, зацепившийся за дно: корабль (webapp) уплыл, но канат (одна ссылка) держит весь груз классов в Metaspace."
 },
 "JVM|LambdaMetafactory": {
  "icon": "🏭",
  "hook": "Цех-фабрика, который открывается ровно один раз по первому заказу (indy), штампует объект-реализацию и навсегда вешает табличку CallSite — дальше выдаёт без переналадки."
 },
 "Java|Eager vs Lazy evaluation (нетерпеливое и ленивое вычисление)": {
  "icon": "⏳",
  "hook": "Eager — повар готовит блюдо заранее (вдруг закажут). Lazy — повар начинает готовить, только когда официант реально принёс заказ (вызвал supplier.get())."
 },
 "Java|serialVersionUID": {
  "icon": "🔖",
  "hook": "Номер версии в паспорте класса: совпал — пускают, не совпал — разворот на границе (InvalidClassException)."
 },
 "Java|Gadget chain": {
  "icon": "⛓️",
  "hook": "Домино из костяшек, которые УЖЕ стоят на твоём столе (в зависимостях) — атакующий не приносит свои, он лишь толкает первую."
 },
 "Java|Статус прерывания (interrupt flag)": {
  "icon": "🚩",
  "hook": "Записка «пора уходить» на лбу потока: interrupt() её клеит, InterruptedException срывает — а ты должен приклеить обратно."
 },
 "Spring|rollback-only (флаг глобального отката)": {
  "icon": "🚩",
  "hook": "Красный флажок на общей дорожке: кто угодно может его поднять, но опустить нельзя — на финише вся гонка аннулируется."
 },
 "Spring|Precedence (порядок advice)": {
  "icon": "🧅",
  "hook": "Слои луковицы: маленький номер — верхняя кожура, до неё нож (вызов) доходит первым и уходит последним."
 },
 "Spring|Relaxed Binding": {
  "icon": "🔌",
  "hook": "Универсальный переходник для розетки: вилка-ключ может быть любой формы (mail.from / mailFrom / MAIL_FROM) — переходник всё равно воткнёт её в одно гнездо-поле."
 },
 "Spring|Контекст персистентности (Persistence Context)": {
  "icon": "🗄️",
  "hook": "Камера хранения транзакции: один жетон (id) — одна и та же вещь на полке, повторно на склад (в БД) не ходят."
 },
 "Spring|Dehydrated state (CacheEntry)": {
  "icon": "📦",
  "hook": "Как плоская мебель (flat-pack) на складе: хранятся не собранные стулья (объекты), а коробки с деталями (CacheEntry), и каждый покупатель собирает свой стул дома (в своей Session)."
 },
 "Spring|Стабильный hashCode сущности": {
  "icon": "🔑",
  "hook": "Как номер квартиры, выбитый на двери при заселении: даже если потом тебе присвоят почтовый индекс, табличка на подъезде не должна меняться — иначе гости не найдут."
 },
 "DB|Транзитивная зависимость": {
  "icon": "🔗",
  "hook": "Сломанный телефон: ключ шепчет городу, город шепчет региону — региону положено слышать ключ напрямую, а не через посредника."
 },
 "DB|Денормализация": {
  "icon": "🔁",
  "hook": "Кэш внутри схемы БД: быстрее читать, но кто-то обязан его инвалидировать, иначе отдаёшь устаревшее."
 },
 "DB|ctid": {
  "icon": "📍",
  "hook": "Как «полка 7, ячейка 3» на складе: индекс хранит координату, а не сам товар; переставил (UPDATE) — координата поменялась."
 },
 "DB|Оконная функция (window function)": {
  "icon": "🪟",
  "hook": "Как смотреть в окно поезда: видишь соседние вагоны (окно строк), но сам остаёшься на своём месте — строка не исчезает, как при GROUP BY."
 },
 "DB|Next-key lock": {
  "icon": "🔒",
  "hook": "Замок не только на двери (строка), но и на коридоре перед ней (gap) — никто не подкрадётся и не вставит новую дверь."
 },
 "Design|Виртуальная диспетчеризация (dynamic dispatch)": {
  "icon": "🎯",
  "hook": "Звонишь на номер (ссылку) — а трубку берёт тот, кто реально сейчас у телефона (фактический объект), а не тот, чьё имя записано в контактах."
 },
 "Design|FilterChain (цепочка фильтров)": {
  "icon": "⛓️",
  "hook": "Эстафетная палочка: пока ты её не передал следующему бегуну (doFilter), забег стоит на месте — финиша (контроллера) не будет."
 },
 "Design|Спрятанная зависимость (hidden dependency)": {
  "icon": "🫥",
  "hook": "Как тайный ингредиент в рецепте, не указанный в составе: узнаёшь о нём, только когда блюдо уже не получилось."
 },
 "Design|Анемичная модель (Anemic Domain Model)": {
  "icon": "🩸",
  "hook": "Как манекен в витрине: выглядит как человек, но всё за него делают другие — сам не умеет ничего."
 },
 "Distributed|Zombie fencing (огораживание зомби)": {
  "icon": "🧟",
  "hook": "Турникет с обновлённым пропуском: твой старый клон-зомби, застрявший в GC-паузе или сетевом разделе, тычет просроченной картой и его не пускают."
 },
 "Distributed|auto.offset.reset": {
  "icon": "🔖",
  "hook": "Запасная закладка: достаётся, только если основную (закоммиченный офсет) потеряли или она устарела."
 },
 "Distributed|Changelog-топик": {
  "icon": "📒",
  "hook": "Журнал операций банка: локальный кэш баланса можно потерять, но по журналу всегда восстановишь точное последнее состояние каждого счёта."
 },
 "Distributed|Clock skew (рассинхрон часов)": {
  "icon": "⏱️",
  "hook": "Два человека договорились встретиться «в 12:00», но часы у одного спешат, у другого отстают — они придут в разное реальное время, искренне веря, что оба пунктуальны."
 },
 "Distributed|Group coordinator": {
  "icon": "🎛️",
  "hook": "Вахтёр конкретного подъезда: за группой закреплён один подъезд (партиция), и его лидер-брокер ведёт весь учёт по этой группе."
 },
 "Testing|Тест, привязанный к реализации (implementation-coupled test)": {
  "icon": "🔗",
  "hook": "Сигнализация, которая срабатывает не на взлом (поведение), а на то, что хозяин переставил мебель (рефакторинг) — ложная тревога на каждое движение."
 },
 "Testing|Fake (in-memory реализация порта)": {
  "icon": "🧊",
  "hook": "Мини-холодильник для тестов: реально кладёшь и достаёшь, в отличие от автоответчика-стаба, который повторяет одну фразу."
 },
 "Testing|inline mock-maker": {
  "icon": "🛠️",
  "hook": "Отбойный молоток, которым высверливают вмурованный в бетон статический метод — работает, но сам факт, что пришлось сверлить, говорит о кривой постройке."
 },
 "Testing|OngoingStubbing": {
  "icon": "🔗",
  "hook": "Как чек из магазина: его выдают ТОЛЬКО после того, как покупку (вызов метода) уже пробили на кассе."
 },
 "Testing|MergedContextConfiguration": {
  "icon": "🔑",
  "hook": "Это «штрихкод» теста: одинаковый штрихкод — один и тот же контекст с полки; чуть отличается — кассир (TestContextManager) собирает новый контекст с нуля."
 },
 "Web|jti (JWT ID)": {
  "icon": "🎟️",
  "hook": "Серийный номер на билете: сам билет настоящий и подписан, но номер в чёрном списке на входе — и контролёр не пускает."
 },
 "Web|Token family (семья токенов)": {
  "icon": "👨‍👩‍👧",
  "hook": "Как семейная фамилия: поймали одного члена семьи на подделке — под подозрение попадает вся семья, всех 'выписывают' разом."
 },
 "Web|Идемпотентность HTTP-метода": {
  "icon": "🔁",
  "hook": "Как кнопка «этаж 5» в лифте: жми хоть десять раз — приедешь на пятый, а не на пятидесятый."
 },
 "Web|Head-of-line blocking": {
  "icon": "🚧",
  "hook": "Очередь в одну дверь: застрявший первый человек держит всех за собой, хотя им в разные кабинеты"
 },
 "Web|SameSite (атрибут cookie)": {
  "icon": "🍪",
  "hook": "Это «фейс-контроль на входе»: Strict пускает только своих, Lax — своих и гостей по приглашению (top-level GET), None — всех подряд (нужна доп. охрана)."
 },
 "Web|Broken Access Control (A01)": {
  "icon": "🔓",
  "hook": "Билет в самолёт у тебя есть (аутентификация), но он не должен пускать в кабину пилота (авторизация)."
 },
 "Web|SBOM (Software Bill of Materials)": {
  "icon": "📋",
  "hook": "Накладная на все ингредиенты блюда — без неё при отзыве партии соуса не узнаешь, в каких тарелках он оказался."
 },
 "Web|IDOR (Insecure Direct Object Reference)": {
  "icon": "🔓",
  "hook": "Гардероб, где отдают пальто по любому номерку, не сверяя, что номерок именно твой."
 },
 "Web|Dynamic Secret": {
  "icon": "⏱️",
  "hook": "Не выдаём вечный пропуск, а печатаем гостевой бейдж, который сам сгорает через час."
 },
 "Web|CORS-мисконфигурация": {
  "icon": "🔓",
  "hook": "Вахтёр вписывает в журнал имя гостя вместо сверки со списком жильцов — и пускает любого с твоими ключами."
 },
 "Web|User enumeration": {
  "icon": "🔍",
  "hook": "Грабитель не ломает все ячейки подряд — сначала по заминке охранника вычисляет, какие из них реально заняты."
 },
 "JVM|Thread dump": {
  "icon": "🧵",
  "hook": "Стоп-кадр пробки: видно, кто куда встал и кто кого ждёт."
 },
 "JVM|Retained Heap": {
  "icon": "🧮",
  "hook": "Не «сколько весит коробка», а «сколько со склада уедет, если эту коробку убрать»."
 },
 "JVM|Safepoint-bias": {
  "icon": "🎯",
  "hook": "Охранник пишет в журнал только тех, кто прошёл через проходную; кто пролез в окно — в статистике отсутствует."
 },
 "Spring|JPA Projection": {
  "icon": "🔍",
  "hook": "Сфотографировать бирку вместо переезда всем шкафом."
 },
 "DevOps|W3C Trace Context (traceparent)": {
  "icon": "🧵",
  "hook": "Сквозной штрихкод на посылке: любой сортировочный узел читает его одинаково и знает, к какой партии относится."
 },
 "Java|Constant variable": {
  "icon": "🧊",
  "hook": "final + литерал = инлайн, не чтение поля"
 },
 "Java|finalize()": {
  "icon": "🪦",
  "hook": "мёртвый хук GC, который по умолчанию всё ещё дышит"
 },
 "Java|Виртуальная диспетчеризация (override)": {
  "icon": "🎯",
  "hook": "Объект решает в рантайме, а не ссылка и не компилятор."
 },
 "Java|Treeification (HashMap)": {
  "icon": "🌳",
  "hook": "Дерево спасает от O(n) только когда ключи Comparable."
 },
 "Java|List.copyOf() short-circuit": {
  "icon": "📋",
  "hook": "Копирует только если есть что копировать — immutable пропускает насквозь."
 },
 "Concurrency|ForkJoinPool.commonPool()": {
  "icon": "🧵",
  "hook": "Один пул на всех — блокировка в нём бьёт по всем его клиентам сразу."
 },
 "Java|Полный барьер (stateful full-barrier op)": {
  "icon": "⛔",
  "hook": "Турникет, который пропускает толпу только всю сразу: пока не пришёл последний — не пройдёт никто. На бесконечной очереди — не пройдёт никогда."
 },
 "Java|downstream-коллектор": {
  "icon": "🧮",
  "hook": "groupingBy(byKey, counting()) — counting() и есть downstream, и он отдаёт Long, не int"
 },
 "Java|Externalizable": {
  "icon": "📦",
  "hook": "Не «без метаданных класса», а «без метаданных полей» + обязательный no-arg конструктор."
 },
 "Java|Exception chaining (cause)": {
  "icon": "🔗",
  "hook": "Передай причину, а не приклей её текст."
 },
 "Java|Default charset trap": {
  "icon": "🔤",
  "hook": "Байт не знает своей кодировки — кодировку выбирает читатель. Не выбрал явно = выбрал дефолт за тебя."
 },
 "Spring|Propagation.NESTED": {
  "icon": "⎌",
  "hook": "savepoint внутри транзакции, а не новая транзакция"
 },
 "Spring|@Transactional(readOnly=true)": {
  "icon": "📖",
  "hook": "readOnly = MANUAL flush (CPU&darr;), а не read-only сущности; snapshot остаётся."
 },
 "Spring|Detached entity": {
  "icon": "🔗",
  "hook": "managed-призрак: id есть, но изменения уже никто не отслеживает."
 },
 "Spring|flush vs commit": {
  "icon": "💧",
  "hook": "flush = черновик на печатном станке, commit = подпись «в тираж»."
 },
 "Spring|Hibernate proxy (getReference)": {
  "icon": "🦥",
  "hook": "instanceof ок, getClass() врёт"
 },
 "Spring|IDENTITY vs SEQUENCE для JDBC-батчинга": {
  "icon": "📦",
  "hook": "IDENTITY = «ключ сейчас же», батч = «пачкой потом» — взаимоисключающе."
 },
 "Spring|FlushMode.MANUAL": {
  "icon": "🚱",
  "hook": "MANUAL = «сам флашь руками»: save()/dirty молча копятся и пропадают на коммите, а явный flush() и DML — пишут."
 },
 "DevOps|p99 (99-й перцентиль)": {
  "icon": "📊",
  "hook": "Худший из ста. Среднее его прячет, а усреднить два p99 нельзя."
 },
 "Java|SIZED short-circuit в count()": {
  "icon": "🔢",
  "hook": "count() читает размер с этикетки, не открывая коробку — peek внутри молчит."
 },
 "Testing|Don't mock what you don't own": {
  "icon": "🚫",
  "hook": "Чужой контракт мокать — фиксировать догадку, которая протухнет."
 },
 "Web|SSRF (Server-Side Request Forgery)": {
  "icon": "🛰️",
  "hook": "Чужими руками жар загребать: сервер с доступом во внутреннюю сеть ходит по адресу, который ему подсунул злоумышленник."
 },
 "Spring|AutoConfiguration.imports": {
  "icon": "🗂️",
  "hook": "Отдельный список «кого включать автоматически» вместо общей свалки spring.factories."
 },
 "Web|Realm (Keycloak)": {
  "icon": "🏛️",
  "hook": "Многоквартирный дом со своим замком на подъезде: жильцы (users) и квартиры-приложения (clients) одного дома не пускаются в другой по тем же ключам."
 },
 "Web|PKCE (Proof Key for Code Exchange)": {
  "icon": "🔐",
  "hook": "Одноразовая пломба на накладной: перехватил бумажку — обменять всё равно не можешь, оригинал пломбы только у курьера."
 },
 "Spring|JwtGrantedAuthoritiesConverter": {
  "icon": "key",
  "hook": "Турникет, который умеет считывать только один тип пропуска (scope); для пропусков Keycloak (roles) ему нужна другая насадка."
 },
 "Web|Offline token": {
  "icon": "🌙",
  "hook": "Служебный пропуск ночного инкассатора — работает, когда главный вход уже закрыт."
 },
 "Web|Audience (aud)": {
  "icon": "🎯",
  "hook": "Адресная строка на конверте: письмо подлинное, но если там не твой адрес — оно не тебе."
 },
 "DevOps|Saturation (насыщение)": {
  "icon": "🌊",
  "hook": "Не «занята ли касса» (утилизация), а «какая очередь к ней» (насыщение) — очередь предупреждает раньше."
 },
 "DB|Gorilla-сжатие": {
  "icon": "🦍",
  "hook": "Не переписываем число заново — фиксируем только чем оно отличается от соседнего. Похожие соседи = почти ничего писать."
 },
 "DB|Downsampling (прореживание)": {
  "icon": "📉",
  "hook": "Прошлогодний график не нужен посекундно — сжимаем в редкую сетку: место экономим, тренд виден."
 },
 "DevOps|Recording rule": {
  "icon": "📝",
  "hook": "Materialized view для метрик: посчитали тяжёлое один раз по расписанию — все потом читают дёшево."
 },
 "System Design|remote_write": {
  "icon": "📤",
  "hook": "Prometheus собирает, но не копит: сырьё уходит по трубе в большой склад, который масштабируется отдельно."
 },
 "Java|Автобоксинг": {
  "icon": "📦",
  "hook": "Компилятор сам «упаковывает» число в коробку-объект — и иногда отдаёт ту же коробку из кэша."
 },
 "Java|Пул строк (String pool)": {
  "icon": "🎱",
  "hook": "Общая полка одинаковых строк: литералы берут готовую, а new String печатает лишний дубликат."
 },
 "Java|Перегрузка (overloading)": {
  "icon": "🔀",
  "hook": "Одно имя — разные двери; выбор двери делает компилятор по типу того, что ты передал."
 },
 "Concurrency|Атомарность": {
  "icon": "⚛️",
  "hook": "Либо целиком, либо никак: другой поток не может влезть в середину неделимого действия."
 },
 "Java|BigDecimal": {
  "icon": "🎯",
  "hook": "Точный десятичный калькулятор без «хвостиков» double — но кормить его надо строкой, а не double."
 },
 "Java|Fail-fast итератор": {
  "icon": "🚨",
  "hook": "Обходчик с «пломбой»: изменил коллекцию мимо него — пломба сорвана, он сразу кричит, а не врёт молча."
 },
 "Concurrency|RejectedExecutionHandler": {
  "icon": "🚪",
  "hook": "Что делать, когда очередь полна: честно отказать или притормозить того, кто шлёт — но не расти до OOM."
 },
 "Java|Сокрытие метода (hiding)": {
  "icon": "🎭",
  "hook": "static не «перекрывается по-настоящему» — какой вызвать, решает подпись-тип ссылки, а не живой объект."
 },
 "Java|Числовое продвижение (promotion)": {
  "icon": "⬆️",
  "hook": "Обе ветки обязаны быть одного типа: смешал целое и дробное — всё станет дробным; смешал с null — упадёт."
 },
 "DevOps|Code review": {
  "icon": "🔍",
  "hook": "Как корректор перед печатью книги: твой текст читает другой, ловит опечатки.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">код</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">👀 ревью</div></div>"
 },
 "DevOps|MR / PR": {
  "icon": "📨",
  "hook": "Как заявка «впустите мои правки в общий проект» — сначала проверят, потом вольют.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">мои</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">ревью</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">main</div></div>"
 },
 "DevOps|Бэклог": {
  "icon": "📋",
  "hook": "Как список покупок: куча дел в очереди, делаешь сверху вниз по важности.",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box mut\">task</div><div class=\"fp-box mut\">task</div><div class=\"fp-box mut\">task</div></div>"
 },
 "DevOps|Техдолг": {
  "icon": "💳",
  "hook": "Как кредит за быстро: «работает» сейчас, но проценты платишь будущей переделкой.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">быстро</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">долг 💸</div></div>"
 },
 "DevOps|Спринт": {
  "icon": "🏃",
  "hook": "Как забег на 2 недели: старт — пачка задач, финиш — готовый результат.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">2 нед</div><div class=\"fp-bar\"><span style=\"width:60%\"></span></div><div class=\"fp-box good\">✅</div></div>"
 },
 "DevOps|Дейли": {
  "icon": "☕",
  "hook": "Как утренняя планёрка у кофе: вчера, сегодня, что застряло — за 10 минут.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box mut\">было</div><div class=\"fp-box acc\">делаю</div><div class=\"fp-box bad\">🚧</div></div>"
 },
 "DevOps|Ретро": {
  "icon": "🪞",
  "hook": "Как разбор матча после игры: что зашло, что нет — чтобы в след. раз лучше.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box good\">👍 ок</div><div class=\"fp-box bad\">👎 фикс</div></div>"
 },
 "DevOps|Эстимейт": {
  "icon": "⏱️",
  "hook": "Как «сколько ехать до дома» в навигаторе — прикидка времени до плана задачи.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box\">task</div><div class=\"fp-arrow\">→</div><div class=\"fp-val\">3</div><span class=\"fp-tag\">дня</span></div>"
 },
 "DevOps|Дефинишн оф дан (DoD)": {
  "icon": "✅",
  "hook": "Как чек-лист сборки мебели: пока не все галочки — «не готово», даже если «почти».",
  "pic": "<div class=\"fp-col\"><div class=\"fp-box good\">✔ тесты</div><div class=\"fp-box good\">✔ ревью</div><div class=\"fp-box good\">✔ done</div></div>"
 },
 "DevOps|Хотфикс": {
  "icon": "🚒",
  "hook": "Как вызов скорой: что-то горит в проде — мчишь чинить вне очереди прямо сейчас.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">🐞 баг</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">⚡ фикс</div></div>"
 },
 "DevOps|Релиз": {
  "icon": "🚀",
  "hook": "Как выпуск книги в продажу: новая версия едет к реальным пользователям.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">v2</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">🌐 прод</div></div>"
 },
 "DevOps|Мёрдж-конфликт": {
  "icon": "🔀",
  "hook": "Двое пишут в одной строке тетради разное — нельзя оставить оба, выбираешь, чьё слово останется.",
  "pic": "<div class=\"fp-row\"><div class=\"fp-box acc\">твоё</div><div class=\"fp-box bad\">✋</div><div class=\"fp-box mut\">чужое</div></div>"
 }
};

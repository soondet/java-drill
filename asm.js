/* 🎯 Раздел «Ассессмент» — темы плана развития (ИПР) и вопросы по ним. Всё внутри раздела, вводить ничего не надо.
 *
 * Цели и темы зашиты ниже. Личного в них нет: только названия тем и фильтры. Вопросы — карточки тренажёра.
 * Тема ловит карточку, если её слова есть в вопросе, или в ответе — но тогда только у карточек профильных кластеров
 * цели (cl). Без этого условия «get» из ответа про HashMap попадал в REST.
 *
 * Прошлая версия раздела держала личный файл (итоги аттестации, достижения) в jdAsm и jdAsmMy. Теперь он не нужен
 * и стирается с устройства при загрузке и входе в раздел (мог вернуться из бэкапа) — иначе так и ездил бы в бэкапах.
 *
 * Адреса: #asm — темы, #asm/<цель>-<тема> — вопросы темы. В приложении «Назад» телефона зовёт asmBack. */
(function () {
  const ROUTE = /^#asm(\/|$)/;
  const wipe = () => { try { localStorage.removeItem("jdAsm"); localStorage.removeItem("jdAsmMy"); } catch (e) {} };
  wipe();

  /* Цели — из ИПР, темы — что по ним спрашивают. re — без учёта регистра. */
  const GOALS = [
   { id: "web", t: "Веб-технологии", en: "Web technologies", cl: ["Web", "Crypto"], topics: [
    { id: "rest", n: "REST и HTTP", en: "REST and HTTP", re: "\\bREST|HTTP|status code|статус-?код|OpenAPI|версионир\\S* API" },
    { id: "graphql", n: "GraphQL", re: "GraphQL" },
    { id: "grpc", n: "gRPC и RPC", en: "gRPC and RPC", re: "gRPC|protobuf|Protocol Buffers|\\bRPC\\b" },
    { id: "soap", n: "SOAP", re: "SOAP|WSDL" },
    { id: "tls", n: "SSL / TLS", re: "\\bTLS\\b|\\bSSL\\b|HTTPS|mTLS|сертификат|certificate" },
    { id: "oauth", n: "OAuth2 и OIDC", en: "OAuth2 and OIDC", re: "OAuth|OIDC|OpenID|Keycloak|Bearer" },
    { id: "jwt", n: "JWT", re: "\\bJWT\\b" },
    { id: "cors", n: "CORS и CSP", en: "CORS and CSP", re: "\\bCORS\\b|\\bCSP\\b|Content-Security-Policy|same-origin|preflight" },
    { id: "sec", n: "XSS, CSRF и OWASP", en: "XSS, CSRF and OWASP", re: "\\bXSS\\b|CSRF|OWASP|SQL-?инъекц|SQL injection|SameSite|httpOnly" },
    { id: "cache", n: "HTTP-кэш и CDN", en: "HTTP caching and CDN", re: "\\bCDN\\b|Cache-Control|ETag|\\b304\\b|HTTP-кэш|кэш браузер" },
    { id: "gzip", n: "Сжатие", en: "Compression", re: "gzip|brotli|Content-Encoding|сжати\\S* ответ|сжимать ответ|compression|HPACK|сжат\\S* заголовк" },
    { id: "lb", n: "Балансировка", en: "Load balancing", re: "балансировк\\S* нагрузк|балансировщик|load.?balanc|sticky.?session|\\bupstream\\b|\\bL4\\b|\\bL7\\b" },
    { id: "proxy", n: "Nginx, HAProxy, Envoy", re: "nginx|haproxy|envoy|reverse proxy|обратн\\S* прокси" }
   ]},
   { id: "dev", t: "Java и JVM", en: "Java and the JVM", cl: ["JVM", "Concurrency", "Java"], topics: [
    { id: "gc", n: "Сборщик мусора", en: "Garbage collection", re: "\\bGC\\b|\\bG1\\b|ZGC|Shenandoah|сборщик\\S* мусора|сборк\\S* мусора|garbage" },
    { id: "mem", n: "Память и утечки", en: "Memory and leaks", re: "утечк|heap dump|OutOfMemory|\\bOOM|Metaspace|(?<![а-яё])хип|-Xmx|\\bheap\\b(?! ?sort)|memory leak|утекает память" },
    { id: "jit", n: "JIT и прогрев", en: "JIT and warm-up", re: "\\bJIT\\b|прогрев|warm-?up|инлайнинг|inlining|деоптимизац|C2|tiered" },
    { id: "diag", n: "Диагностика JVM", en: "JVM diagnostics", re: "jstack|jcmd|\\bJFR\\b|Flight Recorder|async-profiler|jmap|VisualVM|профилир|thread dump" },
    { id: "cf", n: "CompletableFuture", re: "CompletableFuture|thenApply|thenCompose|supplyAsync" },
    { id: "fjp", n: "ForkJoinPool", re: "ForkJoin|work.?stealing|parallelStream|parallel\\(\\)|common pool" },
    { id: "pool", n: "Пулы потоков", en: "Thread pools", re: "ExecutorService|ThreadPool|пул\\S* поток|thread pool|Executors\\." },
    { id: "vt", n: "Виртуальные потоки", en: "Virtual threads", re: "виртуальн\\S* поток|virtual thread|\\bLoom\\b|pinning" },
    { id: "lock", n: "Блокировки и JMM", en: "Locks and the JMM", re: "synchronized|ReentrantLock|volatile|happens-before|дедлок|deadlock|\\bCAS\\b|Atomic[A-Z]" },
    { id: "lambda", n: "Лямбды и функц. интерфейсы", en: "Lambdas and functional interfaces", re: "лямбд|lambda-?выраж|FunctionalInterface|функциональн\\S* интерфейс|Supplier|Predicate|Function<|ссылк\\S* на метод|method reference" },
    { id: "stream", n: "Stream API", re: "Stream API|\\.stream\\(\\)|Collectors|Java Stream|\\bStream<|parallelStream|Gatherer" }
   ]},
   { id: "spring", t: "Spring и Quarkus", en: "Spring and Quarkus", cl: ["Spring", "Quarkus", "DevOps", "Infra"], topics: [
    { id: "di", n: "DI и бины", en: "DI and beans", re: "@Autowired|\\bDI\\b|внедрени\\S* зависимост|(?<![а-яё])бин(а|ы|ов|ам|у|ом|е)?(?![а-яё])|\\bbean|@Component|@ApplicationScoped|@Configuration|скоуп" },
    { id: "aop", n: "AOP и перехватчики", en: "AOP and interceptors", re: "\\bAOP\\b|аспект|@Around|@Interceptor|@AroundInvoke|interceptor binding|self-invocation|самовызов|«магия»|прокси\\S* (бина|Spring)" },
    { id: "tx", n: "Транзакции", en: "Transactions", re: "@Transactional|propagation|REQUIRES_NEW|уровн\\S* изоляц|isolation|JTA|TransactionManager|транзакци\\S* в (Spring|Quarkus)|rollbackFor|откат\\S* транзакц" },
    { id: "jpa", n: "JPA и Hibernate", en: "JPA and Hibernate", re: "\\bJPA\\b|Hibernate|N\\+1|LazyInitialization|@OneToMany|@ManyToOne|Spring Data|Panache|EntityManager" },
    { id: "boot", n: "Spring Boot", re: "Spring Boot|автоконфиг|auto-?configur|starter|Actuator" },
    { id: "cloud", n: "Spring Cloud", re: "Spring Cloud|Eureka|Config Server|Feign|Resilience4j|circuit breaker|Service Discovery" },
    { id: "quarkus", n: "Quarkus и CDI", en: "Quarkus and CDI", re: "Quarkus|\\bCDI\\b|SmallRye|MicroProfile|Panache" },
    { id: "docker", n: "Docker", re: "Docker|Dockerfile|контейнер\\S* (и|vs|от|в) |\\bcgroup|CPU limit|limits\\.memory|(?<![а-яё])образ" },
    { id: "k8s", n: "Kubernetes", re: "Kubernetes|\\bk8s\\b|\\bpod\\b|(?<![а-яё])под(а|ы|ов|ам|ом)(?![а-яё])|HPA|Helm|Deployment" },
    { id: "probe", n: "Health-пробы", en: "Health probes", re: "liveness|readiness|startup.?probe|health.?check|/health|(?<![а-яё])проб[аыу](?![а-яё])" }
   ]},
   { id: "arch", t: "Архитектура", en: "Architecture", cl: ["Архитектура", "Design", "Distributed", "System Design"], topics: [
    { id: "hex", n: "Гексагон и порты", en: "Hexagonal and ports", re: "гексагон|hexagon|порт\\S* и адаптер|ports and adapters|(?<![а-яё])порт(ы|а)?(?![а-яё])|\\b(Inbound|Outbound) Port" },
    { id: "clean", n: "Clean Architecture", re: "Clean Architecture|чист\\S* архитектур|use case|юзкейс|dependency rule|правило зависимост" },
    { id: "ddd", n: "DDD", re: "\\bDDD\\b|агрегат|bounded context|ограниченн\\S* контекст|value object|ubiquitous|единый язык" },
    { id: "ms", n: "Микросервисы и монолит", en: "Microservices and monolith", re: "микросервис|монолит|microservice|monolith" },
    { id: "resil", n: "Устойчивость: ретраи, Circuit Breaker", en: "Resilience: retries, circuit breaker", re: "circuit.?breaker|\\bretr(y|ies)|ретра|таймаут|bulkhead|fallback|backoff" },
    { id: "cons", n: "Консистентность и CAP", en: "Consistency and CAP", re: "\\bCAP\\b|консистентн|согласованн|eventual|consistency|кворум|quorum|split.?brain" },
    { id: "cqrs", n: "CQRS", re: "CQRS" },
    { id: "saga", n: "Saga", re: "(?<![а-яё])саг[аиу](?![а-яё])|\\bsaga|компенсирующ|compensat" },
    { id: "outbox", n: "Outbox", re: "outbox" },
    { id: "idem", n: "Идемпотентность", en: "Idempotency", re: "идемпотент|idempoten" },
    { id: "strangler", n: "Strangler и легаси", en: "Strangler and legacy", re: "strangler|душител|легаси|legacy" },
    { id: "adr", n: "ADR", re: "\\bADR\\b|Architecture Decision" },
    { id: "gof", n: "Паттерны и SOLID", en: "Patterns and SOLID", re: "(?<!анти)паттерн(?!-?матч)|\\b(Strategy|Factory|Builder|Decorator|Observer|Template Method|Adapter|Proxy|Visitor|Singleton|Chain of Responsibility)\\b|SOLID|Liskov|Open.?Closed|GoF" },
    { id: "sd", n: "System Design", re: "Спроектируй|спроектировать|design a|system design" }
   ]},
   { id: "test", t: "Тестирование", en: "Testing", cl: ["Testing"], topics: [
    { id: "unit", n: "Unit-тесты", en: "Unit tests", re: "юнит|\\bunit|модульн\\S* тест|без БД и Spring|читаем\\S* тест|тест читаем|Object Mother|Data Builder|LocalDate\\.now" },
    { id: "it", n: "Интеграционные и Testcontainers", en: "Integration and Testcontainers", re: "интеграционн\\S* тест|integration test|Testcontainers|@SpringBootTest|@QuarkusTest|@QuarkusIntegrationTest|@MockBean|@WebMvcTest|failsafe" },
    { id: "kinds", n: "Пирамида и виды тестов", en: "Test pyramid and kinds", re: "пирамид|pyramid|\\be2e\\b|end-to-end|контрактн|\\bPact\\b|нагрузочн" },
    { id: "tdd", n: "TDD", re: "\\bTDD\\b|test-driven|red.?green" },
    { id: "junit", n: "JUnit 5", re: "JUnit|@ParameterizedTest|@MethodSource|@BeforeEach|@BeforeAll|AssertJ|assertThrows" },
    { id: "mock", n: "Mockito и дублёры", en: "Mockito and test doubles", re: "Mockito|(?<![а-яё])мок(и|ов|а|ам|ом)?(?![а-яё])|\\bmock|\\bstub|заглушк|\\bspy\\b|дублёр|\\bfake\\b" },
    { id: "testng", n: "TestNG", re: "TestNG" },
    { id: "cov", n: "Покрытие и мутации", en: "Coverage and mutation", re: "покрыти|coverage|JaCoCo|мутац|mutation|\\bPIT\\b|мутант" },
    { id: "flaky", n: "Скорость и стабильность", en: "Speed and stability", re: "flaky|плавающ|40 минут|сорок минут|медленн\\S* тест|pollution|Thread\\.sleep|Awaitility|порядк\\S* тест|определённом порядке", own: true },
    { id: "char", n: "Характеризационные", en: "Characterization tests", re: "характеризац|characterization|golden master" }
   ]}
  ];

  /* ---------- мелочи ---------- */
  const en = () => typeof LANG !== "undefined" && LANG === "en";
  const L = (ru, e) => en() ? e : ru;
  const E = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const pl = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c; };
  const qn = n => n + " " + L(pl(n, "вопрос", "вопроса", "вопросов"), n === 1 ? "question" : "questions");
  const nm = x => (en() && x.en) || x.n || x.t;
  const tx = (c, f) => (typeof T === "function" ? T("cards", c.id, f, c[f]) : c[f]) || "";
  const md = s => typeof fmt === "function" ? fmt(s) : "<p>" + E(s) + "</p>";
  const inl = s => E(s).replace(/`([^`\n]+)`/g, "<code>$1</code>");

  /* ---------- вопросы темы ---------- */
  const allCards = () => typeof CARDS !== "undefined" && Array.isArray(CARDS) ? CARDS.filter(c => !(typeof isHidden === "function" && isHidden(c.id))) : [];
  let CC = null;
  function cache() {
    if (CC) return CC;
    const all = allCards(), by = {}, goalOf = {};
    for (const g of GOALS) for (const t of g.topics) {
      let r; try { r = new RegExp(t.re, "i"); } catch (e) { r = /$^/; }
      const k = g.id + "-" + t.id;
      const own = c => g.cl.indexOf(c.t) >= 0;                              /* own: тема только из кластеров цели */
      by[k] = all.filter(c => t.own ? own(c) && (r.test(c.q) || r.test(c.a)) : r.test(c.q) || (own(c) && r.test(c.a)));
      goalOf[k] = [g, t];
    }
    return (CC = { by, goalOf });
  }
  const P = id => (typeof stR === "function" ? stR(id) : { box: 1, due: 0 });
  const seen = id => typeof prog !== "undefined" && !!prog[id];
  const now = () => (typeof today === "function" ? today() : Math.floor(Date.now() / 86400000));
  const done = c => P(c.id).box >= 5;
  function stat(cs) {
    let m = 0, due = 0; const t = now();
    for (const c of cs) { if (done(c)) m++; else if (seen(c.id) && P(c.id).due <= t) due++; }
    return { n: cs.length, m, due };
  }
  /* порядок занятия: к повтору → начатые → новые → освоенные; не больше 40 за раз */
  function order(cs) {
    const t = now(), rank = c => { const p = P(c.id); return p.box >= 5 ? 3 : !seen(c.id) ? 2 : p.due <= t ? 0 : 1; };
    return cs.slice().sort((a, b) => rank(a) - rank(b) || P(a.id).box - P(b.id).box).slice(0, 40).map(c => c.id);
  }
  function study(ids) {
    if (!ids.length) return;
    try { drillList = ids; drillTokens.clear(); drillWeak = false; drillFav = false; drillTricky = false; drillLeech = false; cramEl.checked = true; feynEl.checked = false; rmExpand = false; } catch (e) {}
    setMode("drill");
  }

  /* ---------- адреса ---------- */
  function parse() {
    const r = (location.hash.match(/^#asm\/?([\w-]*)/) || [, ""])[1];
    if (r && cache().by[r]) return { v: "topic", k: r };
    return { v: "home", bad: !!r };
  }
  function go(to) {
    const h = to === "home" ? "#asm" : "#asm/" + to;
    if (location.hash === h) draw(); else location.hash = h;
  }
  const wrap = () => document.getElementById("asmWrap");

  /* ---------- главная: цели и темы ---------- */
  function home() {
    const C = cache(), uniq = new Set(), ms = new Set();
    let topics = 0;
    const blocks = GOALS.map(g => {
      const gs = new Map();
      const chips = g.topics.map(t => {
        const k = g.id + "-" + t.id, cs = C.by[k]; topics++;
        cs.forEach(c => { gs.set(c.id, c); uniq.add(c.id); if (done(c)) ms.add(c.id); });
        const s = stat(cs);
        return '<button class="asm-tm' + (cs.length <= 2 ? " thin" : "") + '" data-go="' + E(k) + '"' + (cs.length ? "" : " disabled") + "><span>" + E(nm(t)) + "</span><b>"
          + (s.m ? s.m + "/" : "") + cs.length + "</b></button>";
      }).join("");
      const s = stat([...gs.values()]);
      return '<section class="asm-card asm-goal"><div class="asm-goal-h"><h3>' + E(nm(g)) + "</h3><small>" + qn(s.n) + (s.m ? " · " + L("освоено ", "mastered ") + s.m : "") + "</small></div>"
        + '<div class="asm-tms">' + chips + "</div></section>";
    }).join("");
    return '<div class="asm-hero"><span class="asm-kick">' + L("Ассессмент", "Assessment") + "</span><h1>" + L("Темы и вопросы", "Topics and questions") + "</h1>"
      + "<p>" + L("Пять целей плана развития. Тапни тему — вопросы с ответами откроются здесь же.", "Five growth-plan goals. Tap a topic to see its questions with answers right here.") + "</p>"
      + '<div class="asm-nums">' + [[topics, L(pl(topics, "тема", "темы", "тем"), "topics")], [uniq.size, L(pl(uniq.size, "вопрос", "вопроса", "вопросов"), "questions")], [ms.size, L("освоено", "mastered")]]
        .map(x => "<span><b>" + x[0] + "</b>" + E(x[1]) + "</span>").join("") + "</div></div>"
      + '<p class="asm-hint">' + L("Цифра на теме — сколько вопросов; «3/12» — три уже освоены.", "The number is how many questions; “3/12” means three are mastered.") + "</p>"
      + blocks;
  }

  /* ---------- тема: вопросы с ответами ---------- */
  function topic(k) {
    const C = cache(), [g, t] = C.goalOf[k], cs = C.by[k].slice().sort((a, b) => done(a) - done(b)), s = stat(cs);
    const list = cs.map(c => {
      const d = tx(c, "d");
      return '<li><details class="asm-q" data-id="' + E(c.id) + '"><summary><span class="asm-q-t">' + inl(tx(c, "q")) + "</span>"
        + (done(c) ? '<i class="asm-q-m ok" title="' + E(L("освоено", "mastered")) + '">✓</i>' : seen(c.id) ? '<i class="asm-q-m" title="' + E(L("начато", "started")) + '">•</i>' : "") + "</summary>"
        + '<div class="asm-qa">' + md(tx(c, "a")) + (d ? '<div class="asm-qd"><b>' + L("Глубже", "Deeper") + "</b>" + md(d) + "</div>" : "") + "</div></details></li>";
    }).join("");
    return '<div class="asm-top"><button class="asm-back" data-go="home">‹ ' + L("Все темы", "All topics") + "</button></div>"
      + '<div class="asm-gh"><span class="asm-kick">' + E(nm(g)) + "</span><h2>" + E(nm(t)) + "</h2><p>" + qn(s.n)
      + (s.m ? " · " + L("освоено ", "mastered ") + s.m : "") + (s.due ? " · " + L("к повтору ", "due ") + s.due : "") + "</p></div>"
      + (cs.length ? '<button class="btn primary asm-go" data-study="1">' + L("Учить эти вопросы", "Study these questions") + "<small>"
        + Math.min(40, cs.length) + " " + L("за занятие · сначала повторы", "per session · reviews first") + "</small></button>" : "")
      + '<ul class="asm-qs">' + list + "</ul>";
  }

  /* ---------- рисование ---------- */
  function draw() {
    const w = wrap(); if (!w) return;
    const r = parse();
    if (r.bad) { try { history.replaceState(null, "", "#asm"); } catch (e) {} }
    w.innerHTML = r.v === "topic" ? topic(r.k) : home();
    w.dataset.v = r.v; w.scrollTop = 0;
  }
  function click(e) {
    const t = e.target.closest("button"); if (!t || !t.closest("#asmWrap")) return;
    if (t.dataset.go) return go(t.dataset.go);
    if (t.dataset.study) { const r = parse(); if (r.v === "topic") study(order(cache().by[r.k])); }
  }

  /* ---------- связь с сайтом ---------- */
  window.asmUI = function () {
    document.body.classList.add("asm-on");                                  /* плавающая кнопка роадмапа закрывала стрелки строк */
    CC = null; wipe();                                                      /* прогресс и старый файл могли прийти из бэкапа */
    if (!ROUTE.test(location.hash)) { try { history.replaceState(null, "", "#asm"); } catch (e) {} }
    draw();
  };
  window.asmLeave = function () { document.body.classList.remove("asm-on"); if (ROUTE.test(location.hash)) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} } };
  /* «Назад» телефона: тема → все темы; на главной раздела отдаём управление приложению */
  window.asmBack = function () {
    if (typeof mode === "undefined" || mode !== "asm") return false;
    if (parse().v !== "home") { go("home"); return true; }
    return false;
  };
  addEventListener("hashchange", () => {
    if (!ROUTE.test(location.hash) || typeof setMode !== "function") return;
    if (typeof mode !== "undefined" && mode === "asm") draw(); else setMode("asm");
  });
  document.addEventListener("click", click);
  function boot() {
    if (document.documentElement.classList.contains("native-app") || typeof setMode !== "function") return;
    if (!ROUTE.test(location.hash)) return;
    document.querySelectorAll(".onb").forEach(x => x.remove());
    setMode("asm");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else setTimeout(boot, 0);

  /* ---------- стили: токены сайта, в приложении они уже переопределены в тон ---------- */
  const css = document.createElement("style"); css.id = "asmCss";
  css.textContent = `
body.asm-on #rmFab{display:none!important}
#viewAsm .terms-wrap{display:block;overflow-y:auto;overscroll-behavior:contain;padding-bottom:48px;--a1:#7c8cff;--a2:#2fd3c5}
#viewAsm h1,#viewAsm h2,#viewAsm h3{margin:0;letter-spacing:-.3px}
.asm-hero{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:22px;padding:22px 20px 18px;margin-bottom:10px;
  background:radial-gradient(420px 220px at 0% 0%,rgba(124,140,255,.18),transparent 70%),radial-gradient(460px 240px at 100% 100%,rgba(47,211,197,.14),transparent 70%),var(--panel)}
.asm-kick{display:inline-block;font:700 11px var(--sans);letter-spacing:.8px;text-transform:uppercase;color:var(--a1);background:rgba(124,140,255,.12);border:1px solid rgba(124,140,255,.3);border-radius:99px;padding:4px 10px}
.asm-hero h1{margin:12px 0 6px;font-size:clamp(22px,6vw,34px);line-height:1.15}
.asm-hero>p{margin:0 0 12px;color:var(--read);font-size:calc(14.5px * var(--ts));line-height:1.55;max-width:58ch}
.asm-nums{display:flex;flex-wrap:wrap;gap:8px 22px} .asm-nums span{display:flex;flex-direction:column;color:var(--mut);font-size:12px} .asm-nums b{font:800 22px var(--sans);color:var(--txt);font-variant-numeric:tabular-nums}
.asm-hint{color:var(--mut);font-size:12.5px;line-height:1.5;margin:4px 4px 12px}
.asm-card{border:1px solid var(--line);border-radius:16px;padding:14px 14px 12px;background:var(--panel);margin-bottom:10px}
.asm-goal-h{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:2px 10px;margin:0 2px 10px}
.asm-goal-h h3{font-size:16px;color:var(--txt)} .asm-goal-h small{color:var(--mut);font-size:12px}
.asm-tms{display:flex;flex-wrap:wrap;gap:6px}
.asm-tm{display:inline-flex;align-items:center;gap:8px;min-height:44px;max-width:100%;padding:0 12px;font:600 13px var(--sans);color:var(--txt);background:var(--panel-2);border:1px solid var(--line);border-radius:99px;cursor:pointer;text-align:left}
.asm-tm span{min-width:0} .asm-tm:active{transform:scale(.98)}
.asm-tm b{flex:none;font-variant-numeric:tabular-nums;color:var(--mut);font-weight:700} .asm-tm.thin{border-color:rgba(255,196,77,.55);background:rgba(255,196,77,.08)} .asm-tm.thin b{color:var(--warn)}
.asm-tm:disabled{cursor:default;opacity:.6}
.asm-top{display:flex;align-items:center;margin:2px 0 6px} .asm-back{font:650 14px var(--sans);color:var(--acc);background:none;border:0;padding:0 8px 0 2px;min-height:44px;min-width:44px;cursor:pointer}
.asm-gh{margin:0 2px 10px} .asm-gh h2{font-size:clamp(21px,5.5vw,26px);line-height:1.2;margin-top:8px!important} .asm-gh p{margin:6px 0 0;color:var(--mut);font-size:13px}
#viewAsm .asm-go{width:100%;flex-direction:column;align-items:flex-start;gap:2px;padding:12px 16px;text-align:left;min-height:52px;margin:2px 0 12px}
#viewAsm .asm-go small{font:600 12px var(--sans);opacity:.75}
.asm-qs{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.asm-q{border:1px solid var(--line);border-radius:14px;background:var(--panel)}
.asm-q[open]{border-color:rgba(124,140,255,.45)}
.asm-q summary{display:flex;align-items:flex-start;gap:10px;min-height:44px;padding:12px 14px;box-sizing:border-box;cursor:pointer;list-style:none;font-size:calc(14.5px * var(--ts));line-height:1.45;color:var(--txt);font-weight:600}
.asm-q summary::-webkit-details-marker{display:none}
.asm-q summary::before{content:"›";flex:none;color:var(--mut);font-size:18px;line-height:1.1;transition:transform .15s}
.asm-q[open] summary::before{transform:rotate(90deg)}
.asm-q-t{flex:1;min-width:0;overflow-wrap:anywhere} .asm-q-t code,.asm-qa code{font-family:var(--mono);font-size:.92em}
.asm-q-m{flex:none;font-style:normal;color:var(--mut);font-weight:800} .asm-q-m.ok{color:var(--good)}
.asm-qa{padding:0 14px 12px 38px;color:var(--read);font-size:calc(14px * var(--ts));line-height:1.6;overflow-wrap:anywhere}
.asm-qa p{margin:0 0 8px} .asm-qa ul{margin:0 0 8px;padding-left:18px}
.asm-qd{margin-top:8px;padding:10px 12px;border-radius:10px;background:var(--panel-2);color:var(--read)} .asm-qd>b{display:block;font-size:11.5px;letter-spacing:.4px;text-transform:uppercase;color:var(--mut);margin-bottom:4px}
.asm-qd p:last-child{margin-bottom:0}
`;
  document.head.appendChild(css);
})();

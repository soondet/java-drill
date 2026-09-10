#!/usr/bin/env node
/* Проверка сайта перед публикацией. Гоняет собранный java-drill.html в headless Chrome
   по file:// и валит сборку, если что-то из этого сломалось:
     · ошибки JS на любой из вкладок
     · карточка без кадра или без «подробнее»
     · вылезание за края экрана на ширине 390px (айфон)
     · провал покрытия словаря или карточек
   Запуск: node check.js [путь-к-html]   (по умолчанию ./java-drill.html) */
const http = require("http"), { spawn } = require("child_process"), path = require("path"), fs = require("fs");

const FILE = path.resolve(process.argv[2] || "java-drill.html");
const PORT = 9531;
const CHROME = process.env.CHROME_BIN
  || (process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : "google-chrome");

const sleep = ms => new Promise(r => setTimeout(r, ms));
const get = u => new Promise((res, rej) =>
  http.get(u, r => { let d = ""; r.on("data", c => d += c); r.on("end", () => res(d)); }).on("error", rej));

/* Каждый вызов по CDP раньше был обещанием, которое НИКОГДА не отклонялось.
   Потерялся ответ, упал рендерер, закрылся сокет — await висел вечно, скрипт
   стоял на нуле процентов, а headless-Chrome продолжал жечь ядро. Так набежало
   3 часа 38 минут забытого браузера. Теперь у каждого вызова свой срок, а обрыв
   сокета будит всех, кто ждёт ответа. */
const ВЫЗОВ_МС = 90e3;
function conn(url) {
  return new Promise((res, rej) => {
    const ws = new WebSocket(url); let id = 0; const pend = new Map();
    const всех = причина => { for (const [, f] of pend) f(null, причина); pend.clear(); };
    ws.onmessage = e => { const m = JSON.parse(e.data); if (pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
    ws.onerror = () => { rej(new Error("сокет отладчика не открылся")); всех("сокет отладчика оборвался"); };
    ws.onclose = () => всех("сокет отладчика закрылся");
    /* ждать открытия тоже нельзя бесконечно */
    const срок = setTimeout(() => rej(new Error("сокет отладчика не открылся за 30с")), 30e3);
    const зов = (метод, послать) => new Promise((r, j) => {
      const i = ++id;
      const т = setTimeout(() => { pend.delete(i); j(new Error("CDP " + метод + " не ответил за " + (ВЫЗОВ_МС / 1000) + "с")); }, ВЫЗОВ_МС);
      pend.set(i, (m, обрыв) => { clearTimeout(т); if (обрыв) return j(new Error(обрыв + " (ждали " + метод + ")")); r(m); });
      try { ws.send(послать(i)); } catch (e) { clearTimeout(т); pend.delete(i); j(e); }
    });
    ws.onopen = () => { clearTimeout(срок); res({
      ev: x => зов("Runtime.evaluate", i => JSON.stringify({ id: i, method: "Runtime.evaluate",
        params: { expression: x, returnByValue: true, awaitPromise: true } })).then(m => {
        const R = m.result || {};
        if (R.exceptionDetails) return "__ОШИБКА__ " + ((R.exceptionDetails.exception || {}).description || R.exceptionDetails.text).split("\n")[0];
        return R.result && R.result.value;
      }),
      raw: (m, p) => зов(m, i => JSON.stringify({ id: i, method: m, params: p })).then(x => x.result),
      close: () => ws.close()
    }); };
  });
}

const fail = [];
const check = (name, ok, detail) => {
  console.log((ok ? "  ✓ " : "  ✗ ") + name + (detail ? "  " + detail : ""));
  if (!ok) fail.push(name + (detail ? ": " + detail : ""));
};

(async () => {
  if (!fs.existsSync(FILE)) { console.error("нет файла " + FILE); process.exit(1); }
  console.log("проверяю " + FILE + "\n");

  /* ---- service worker пересобран ----
     У обновлений один-единственный механизм: имя кэша меняется вместе с содержимым.
     Если запушить правку .js, забыв про build.js, имя останется старым — и правка не
     доедет ни до кого, кто уже заходил. Раньше это подстраховывалось фоновой
     перепроверкой каждого файла (~47 запросов на загрузку); теперь стережём здесь. */
  {
    const dir = path.dirname(FILE);
    const swPath = path.join(dir, "sw.js");
    if (fs.existsSync(swPath)) {
      const swText = fs.readFileSync(swPath, "utf8");
      const want = require("./swver.js")(fs.readFileSync(FILE), swText, dir);
      const have = (swText.match(/const CACHE="([^"]+)"/) || [, ""])[1];
      check("имя кэша sw.js отвечает содержимому (build.js не забыт)", have === want,
        have === want ? have : have + " ≠ " + want + " — прогони node build.js");
    }
  }
  /* Браузер detached и переживает родителя, а прибивался он только в самом конце.
     Любой ранний выход («страница не поднялась», «не догрузилась») и любое исключение
     оставляли headless-Chrome работать вечно — с портом, профилем и живой вкладкой.
     Вешаем уборку на выход процесса и на сигналы: теперь при любом финале, включая
     Ctrl+C и падение, браузер гасится и временный профиль удаляется. */
  const PROFILE = "/tmp/jd-check-prof";
  /* kill -9 по родителю уборку не запускает — браузер остаётся жить с портом и
     профилем. Гасим хвост прошлого прогона до того, как поднимем свой. */
  try {
    const прошлые = require("child_process").execSync(
      "pgrep -f " + JSON.stringify("user-data-dir=" + PROFILE) + " || true",
      { encoding: "utf8" }).trim().split("\n").filter(Boolean);
    if (прошлые.length) {
      console.log("  · гашу " + прошлые.length + " процессов от прошлого прогона");
      for (const pid of прошлые) { try { process.kill(+pid, "SIGKILL") } catch (e) {} }
    }
  } catch (e) {}
  const proc = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT, "--no-first-run", "--no-sandbox",
    "--disable-gpu", "--disable-dev-shm-usage", "--user-data-dir=" + PROFILE, "file://" + FILE],
    { stdio: "ignore", detached: true });
  let cleaned = false;
  const cleanup = () => { if (cleaned) return; cleaned = true;
    /* Именно SIGKILL: по мягкому сигналу Chrome завершается неспешно и продолжает
       дописывать профиль, так что rmSync ниже сносил каталог наполовину и тот
       оставался в /tmp. Браузер здесь одноразовый, беречь его состояние незачем. */
    try { process.kill(-proc.pid, "SIGKILL") } catch (e) {}
    try { fs.rmSync(PROFILE, { recursive: true, force: true }) } catch (e) {} };
  process.once("exit", cleanup);
  ["SIGINT", "SIGTERM", "SIGHUP"].forEach(sig => process.once(sig, () => { cleanup(); process.exit(1); }));
  process.once("uncaughtException", e => { cleanup(); console.error(e); process.exit(1); });
  process.once("unhandledRejection", e => { cleanup(); console.error(e); process.exit(1); });
  /* Последний рубеж: сколько бы ни было таймаутов на отдельных вызовах, весь прогон
     обязан уложиться в срок. Обычно он занимает две минуты; даём с большим запасом. */
  const ПРОГОН_МИН = 15;
  setTimeout(() => {
    console.error("прогон не уложился в " + ПРОГОН_МИН + " минут — гашу браузер");
    cleanup(); process.exit(1);
  }, ПРОГОН_МИН * 60e3).unref();

  let t;
  for (let i = 0; i < 60; i++) {
    try { const j = JSON.parse(await get(`http://127.0.0.1:${PORT}/json`)); t = j.find(x => x.type === "page" && x.url.includes(path.basename(FILE))); if (t) break; } catch (e) {}
    await sleep(700);
  }
  if (!t) { console.error("страница не поднялась"); process.exit(1); }
  const A = await conn(t.webSocketDebuggerUrl);

  let loaded = false;
  for (let i = 0; i < 180; i++) {
    if (await A.ev("document.readyState==='complete' && typeof CARDS!=='undefined' && CARDS.length>0 && typeof PRIN!=='undefined'")) { loaded = true; break; }
    await sleep(1000);
  }
  if (!loaded) { console.error("страница не догрузилась за 3 минуты"); process.exit(1); }

  await A.ev("window.__err=[];addEventListener('error',e=>__err.push(String(e.message)));"
    + "addEventListener('unhandledrejection',e=>__err.push('promise: '+e.reason));"
    + "document.querySelectorAll('.onb,#onb').forEach(e=>e.remove());");

  /* ---- ленивый словарь не затирает переводы UI ----
     Разделы переводятся через плоский tr(): ключ — русская строка. Значит любой
     раздел может нечаянно переопределить уже существующий перевод интерфейса.
     Так и вышло: «Связь» была названием игрового режима (Match), а раздел «Для
     чайника» превратил её в Communication. Двадцать четыре штуки разом. */
  {
    const dir = path.dirname(FILE);
    const idx = path.join(dir, "index.html"), pack = path.join(dir, "i18n-en.js");
    if (fs.existsSync(idx) && fs.existsSync(pack)) {
      const html = fs.readFileSync(idx, "utf8");
      const at = html.search(/const UITR=\{/);
      let i = html.indexOf("{", at), depth = 0, j = i;
      for (; j < html.length; j++) {
        if (html[j] === "{") depth++;
        else if (html[j] === "}" && --depth === 0) break;
      }
      const uitr = {};
      for (const m of html.slice(i, j + 1).matchAll(/"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"/g))
        uitr[m[1].replace(/\\"/g, '"')] = m[2].replace(/\\"/g, '"');
      const src = fs.readFileSync(pack, "utf8");
      const a2 = src.search(/^window\.I18N\s*=\s*/m), eq2 = src.indexOf("=", a2);
      const ui = (JSON.parse(src.slice(eq2 + 1).trim().replace(/;\s*$/, "")).ui) || {};
      const clash = Object.keys(ui).filter(k => k in uitr && uitr[k] !== ui[k]);
      check("словарь разделов не переопределяет переводы UI", clash.length === 0,
        clash.length ? clash.length + " конфликтов: " + clash.slice(0, 4).map(k => "«" + k + "»").join(", ")
                     : "проверено " + Object.keys(ui).length + " ключей против " + Object.keys(uitr).length);
    }
  }

  /* ---- содержимое ---- */
  const cards = await A.ev("CARDS.length");
  /* ---- скобки в стилях сходятся ----
     Одна лишняя закрывающая скобка в @keyframes оборвала разбор CSS, и браузер
     молча выбросил следующее правило — .topbar. Шапка перестала быть флексом и
     развалилась на шесть строк вместо четырёх. Ни ошибки в консоли, ни падения:
     из 1644 правил пропало ровно одно, так что считать правила бесполезно.
     Считаем скобки в исходнике — это ловит саму причину, а не последствие. */
  {
    const dir = path.dirname(FILE);
    const idx = path.join(dir, "index.html");
    if (fs.existsSync(idx)) {
      const html = fs.readFileSync(idx, "utf8");
      let баланс = 0, строка = 0, где = 0;
      for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
        const начало = html.slice(0, m.index).split("\n").length;
        const css = m[1].replace(/\/\*[\s\S]*?\*\//g, c => c.replace(/[^\n]/g, " "));
        for (let i = 0; i < css.length; i++) {
          if (css[i] === "\n") строка++;
          else if (css[i] === "{") баланс++;
          else if (css[i] === "}" && --баланс < 0 && !где) где = начало + строка;
        }
      }
      check("скобки в стилях сходятся", баланс === 0,
        баланс === 0 ? "баланс ноль"
          : (баланс < 0 ? "лишняя закрывающая скобка" + (где ? " около строки " + где : "")
                        : баланс + " незакрытых блоков — правила ниже браузер выбросит"));
    }
  }

  check("карточек загружено", cards > 700, cards + "");
  check("у всех есть кадр", await A.ev("CARDS.every(c=>PICS[c.id])"), await A.ev("CARDS.filter(c=>!PICS[c.id]).length+' без кадра'"));
  check("у всех есть «подробнее»", await A.ev("CARDS.every(c=>MORE[c.id])"), await A.ev("CARDS.filter(c=>!MORE[c.id]).length+' без текста'"));
  check("словарь раскрыт полностью",
    await A.ev("TERMS.every(t=>{var k=t.t+'|'+t.term;return (window.MORE_TERM&&MORE_TERM[k])||(window.MORE_TERM_NEW&&MORE_TERM_NEW[k])})"),
    await A.ev("TERMS.filter(t=>{var k=t.t+'|'+t.term;return !((window.MORE_TERM&&MORE_TERM[k])||(window.MORE_TERM_NEW&&MORE_TERM_NEW[k]))}).length+' без раскрытия'"));
  check("«найди баг» отвечает верным вариантом",
    await A.ev("BUGS.every(b=>Array.isArray(b.options)&&b.options.length>1&&b.correct>=0&&b.correct<b.options.length&&b.why)"),
    await A.ev("BUGS.length+' карточек'"));
  check("литеральных бэктиков в текстах не осталось",
    await A.ev("!CARDS.some(c=>MORE[c.id]&&/`/.test(fmt(MORE[c.id])))"));

  /* ---- викторину нельзя пройти линейкой ----
     Замер показал: «всегда выбирай самый длинный вариант» давало 89% верных при 25%
     у случайного тыка — то есть игры проходились без знания предмета. Держим планку,
     чтобы новые вопросы не вернули подсказку обратно. */
  const tell = JSON.parse(await A.ev(`(function(){
    var n=0,win=0,wordWin=0;
    var w=function(s){return String(s).trim().split(/\\s+/).length};
    Object.keys(QUIZ).forEach(function(k){ var q=QUIZ[k];
      if(!q||!q.correct||!q.wrong||q.wrong.length<3)return;
      n++;
      var ws=q.wrong.slice(0,3).map(String);
      if(String(q.correct).length>Math.max.apply(null,ws.map(function(x){return x.length})))win++;
      if(w(q.correct)>Math.max.apply(null,ws.map(w)))wordWin++; });
    return JSON.stringify({n:n,pct:Math.round(win/n*100),wpct:Math.round(wordWin/n*100)});})()`));
  check("викторину не пройти «выбирай самый длинный»", tell.pct <= 35,
    "стратегия даёт " + tell.pct + "% из " + tell.n + " вопросов, потолок 35%, случайный тык 25%");
  check("и не пройти «где больше слов»", tell.wpct <= 55,
    "стратегия даёт " + tell.wpct + "%, потолок 55%, случайный тык 25%");

  /* ---- диагностика: то же правило, что и для викторины ---- */
  const dg = JSON.parse(await A.ev(`(function(){
    var D=window.DIAG||[];
    if(!D.length) return JSON.stringify({n:0,pct:0,bad:[]});
    var win=0, bad=[];
    D.forEach(function(d){
      if(!d.correct||!d.wrong||d.wrong.length<3){ bad.push(d.id); return; }
      var mx=Math.max.apply(null,d.wrong.map(function(w){return String(w).length}));
      if(String(d.correct).length>mx) win++;
    });
    return JSON.stringify({n:D.length,pct:Math.round(win/D.length*100),bad:bad});
  })()`));
  check("сценариев диагностики загружено", dg.n >= 20, dg.n + "");
  check("у сценариев по три неверных варианта", dg.bad.length === 0, dg.bad.join(", "));
  check("диагностику не пройти «выбирай самый длинный»", dg.pct <= 40,
    "стратегия даёт " + dg.pct + "%, потолок 40%, случайный тык 25%");

  /* ---- ревью: тот же запрет на подсказку по длине ---- */
  const rv = JSON.parse(await A.ev(`(function(){
    var R=window.REVIEW||[];
    if(!R.length) return JSON.stringify({n:0,pct:0,bad:[],wide:0});
    var win=0, bad=[], wide=0;
    R.forEach(function(r){
      if(!r.correct||!r.wrong||r.wrong.length<3||!r.code){ bad.push(r.id); return; }
      var mx=Math.max.apply(null,r.wrong.map(function(w){return String(w).length}));
      if(String(r.correct).length>mx) win++;
      var lw=Math.max.apply(null,String(r.code).split("\\n").map(function(l){return l.length}));
      if(lw>56) wide++;
    });
    return JSON.stringify({n:R.length,pct:Math.round(win/R.length*100),bad:bad,wide:wide});
  })()`));
  check("разборов ревью загружено", rv.n >= 12, rv.n + "");
  check("у разборов по три варианта и есть код", rv.bad.length === 0, rv.bad.join(", "));
  check("ревью не пройти «выбирай самый длинный»", rv.pct <= 40,
    "стратегия даёт " + rv.pct + "%, потолок 40%, случайный тык 25%");
  check("код в ревью влезает в телефон", rv.wide === 0, rv.wide + " сниппетов со строкой длиннее 56");

  /* ---- «спроектируй»: тот же запрет ---- */
  const ds = JSON.parse(await A.ev(`(function(){
    var T=window.DESIGN||[]; var all=[];
    T.forEach(function(t){ (t.steps||[]).forEach(function(x){ all.push(x); }); });
    if(!all.length) return JSON.stringify({n:0,pct:0,bad:[]});
    var win=0, bad=[];
    T.forEach(function(t){ if(!t.steps||t.steps.length!==5) bad.push(t.id); });
    all.forEach(function(x){
      var mx=Math.max.apply(null,(x.wrong||[]).map(function(w){return String(w).length}));
      if(String(x.correct).length>mx) win++;
    });
    return JSON.stringify({n:all.length,pct:Math.round(win/all.length*100),bad:bad});
  })()`));
  check("этапов проектирования загружено", ds.n >= 15, ds.n + "");
  check("у каждой задачи пять этапов", ds.bad.length === 0, ds.bad.join(", "));
  check("«спроектируй» не пройти «выбирай самый длинный»", ds.pct <= 40,
    "стратегия даёт " + ds.pct + "%, потолок 40%, случайный тык 25%");

  /* ---- у «спроектируй» есть английский ----
     Добавив восемь сценариев, я забыл про словарь: в английском режиме раздел
     показывал бы русский текст вперемешку с переведённым интерфейсом. Общая
     проверка «кириллицы ≤8% на вкладке» этого не поймала — раздел не входит
     в десятку, по которой она ходит. Считаем строки напрямую. */
  /* Пакет перевода грузится асинхронно, поэтому мерить сразу после setLang нельзя:
     словаря ещё нет и «непереведённым» выглядит вообще всё. Ждём загрузку явно. */
  const язык0 = await A.ev(`LANG`);
  await A.ev(`try{ if(LANG!=="en") setLang("en"); }catch(e){}`);
  for (let i = 0; i < 40; i++) {
    if (await A.ev(`LANG==="en" && tr("Сокращатель ссылок")!=="Сокращатель ссылок"`)) break;
    await sleep(300);
  }
  const dsen = JSON.parse(await A.ev(`(function(){
    var всего=0, без=[];
    (window.DESIGN||[]).forEach(function(t){
      var поля=[t.name,t.about];
      (t.steps||[]).forEach(function(x){ поля.push(x.q,x.correct,x.why);
        (x.wrong||[]).forEach(function(w){поля.push(w)}); });
      var свой=0;
      поля.forEach(function(f){ всего++;
        if(/[А-Яа-яЁё]/.test(f) && tr(f)===f) свой++; });
      if(свой) без.push(t.id+"×"+свой);
    });
    return JSON.stringify({всего:всего, без:без, язык:LANG});
  })()`));
  check("у «спроектируй» есть английский перевод", dsen.без.length === 0 && dsen.язык === "en",
    dsen.язык !== "en" ? "язык не переключился, замер недействителен"
      : dsen.без.length ? "без перевода " + dsen.без.length + " сценариев: " + dsen.без.slice(0, 5).join(", ")
                        : "проверено " + dsen.всего + " строк, все переводятся");
  await A.ev(`try{ setLang(${JSON.stringify(язык0)}) }catch(e){}`); await sleep(900);

  /* ---- книга по музыке ----
     Курс страницами живёт поверх клавиатуры и перехватывает нажатия через
     MUS_TAP_HOOK. Ломается тихо: подсветка мимо клавиш, задание, которое нельзя
     выполнить, перехват, забытый после ухода со страницы. Проходим все страницы
     подряд и выполняем по заданию каждого вида. Вход — кликом по вкладке, как
     у пользователя: setMode("mus") раздел не инициализирует. */
  {
    await A.ev(`localStorage.removeItem("jdMusBook");localStorage.removeItem("jdMusBookDone");document.getElementById("tabMus").click()`);
    await sleep(900);
    const bk0 = JSON.parse(await A.ev(`(function(){
      var C=(window.MUSBOOK||{}).chapters||[], bad=[], n=0;
      C.forEach(function(c){ c.pages.forEach(function(p,i){ n++; var id=c.id+"#"+i;
        var l=Array.isArray(p.light)?p.light:[]; if(l.some(function(m){return m<KB_LO||m>KB_HI})) bad.push(id+" подсветка вне клавиатуры");
        if(p.task){ var T=p.task; if(["set","pcs","seq"].indexOf(T.m)<0||!T.hint||!T.ok) bad.push(id+" задание");
          if(T.k&&T.k.some(function(m){return m<KB_LO||m>KB_HI})) bad.push(id+" клавиши задания вне клавиатуры"); }
        (p.plays||[]).forEach(function(x){ if(!x.l||!Array.isArray(x.s)) bad.push(id+" звук"); });
      }); });
      return JSON.stringify({глав:C.length, страниц:n, плохие:bad, режим:MUS_MODE, есть:!!document.getElementById("bkPage")});
    })()`));
    check("книга по музыке открывается первой", bk0.есть && bk0.режим === "book" && bk0.глав >= 7 && bk0.страниц >= 25,
      bk0.глав + " глав · " + bk0.страниц + " страниц · режим " + bk0.режим + (bk0.есть ? "" : " · страницы нет"));
    check("страницы книги ссылаются на настоящие клавиши", bk0.плохие.length === 0,
      bk0.плохие.length ? bk0.плохие.slice(0, 4).join(", ") : bk0.страниц + " страниц проверено");
    let листов = 0;
    for (let i = 0; i < 40; i++) {
      const r = await A.ev(`(function(){var b=document.getElementById("bkNext"); if(!b||b.disabled)return "end"; bkNext(); return "ok";})()`);
      if (r !== "ok") break; листов++; await sleep(1000);   /* поворот 800мс + страховка; раньше bkNext отбросит busy */
    }
    await sleep(400);
    const bk1 = JSON.parse(await A.ev(`(function(){
      var C=MUSBOOK.chapters, всего=C.reduce(function(a,c){return a+c.pages.length},0);
      var анимаций=document.getAnimations().filter(function(a){var e=a.effect&&a.effect.target;return e&&e.closest&&e.closest(".bk")}).length;
      return JSON.stringify({всего:всего, конец:BK.ch===C.length-1&&BK.pg===C[BK.ch].pages.length-1,
        лист:document.getElementById("bkLeaf").classList.contains("off"), анимаций:анимаций, busy:BK.busy});
    })()`));
    check("книга листается до конца и лист не зависает",
      листов === bk1.всего - 1 && bk1.конец && bk1.лист && !bk1.busy && bk1.анимаций === 0,
      "пролистано " + листов + " из " + (bk1.всего - 1) + " · лист скрыт " + bk1.лист + " · анимаций " + bk1.анимаций + " · busy " + bk1.busy);
    await A.ev(`bkGo(0,1)`); await sleep(900);
    await A.ev(`musKeyTap(60); musKeyTap(72);`); await sleep(200);
    const двеДо = await A.ev(`!!document.getElementById("bkTask")&&document.getElementById("bkTask").classList.contains("ok")`);
    await A.ev(`bkGo(2,1)`); await sleep(900);
    await A.ev(`[60,62,64,65,67,69,71,72].forEach(function(m){musKeyTap(m)})`); await sleep(200);
    const гамма = await A.ev(`!!document.getElementById("bkTask")&&document.getElementById("bkTask").classList.contains("ok")&&KB_SEL.length===1`);
    await A.ev(`MUS_MODE="hack"; musUI();`); await sleep(200);
    const снят = await A.ev(`MUS_TAP_HOOK===null`);
    check("задания книги проверяет клавиатура", двеДо === true && гамма === true && снят === true,
      "две до: " + двеДо + " · гамма по порядку: " + гамма + " · перехват снят после ухода: " + снят);
    await A.ev(`document.getElementById("tabDrill").click()`); await sleep(300);
  }

  /* ---- телефон: ничего не распирает страницу ---- */
  await A.raw("Emulation.setDeviceMetricsOverride", { width: 390, height: 900, deviceScaleFactor: 2, mobile: true });
  await sleep(800);
  await A.ev("document.getElementById('tabDrill').click()"); await sleep(700);
  const wide = await A.ev(`(async function(){var D=document.documentElement,bad=[];
    for(var i=0;i<CARDS.length;i++){
      document.querySelectorAll('.onb,#onb').forEach(e=>e.remove());
      cur=CARDS[i];revealed=false;render();reveal();
      var b=[].slice.call(document.querySelectorAll('.card button')).filter(function(x){return /подробнее/i.test(x.innerText||'')})[0];
      if(b)b.click();
      void D.offsetWidth;
      if(D.scrollWidth>D.clientWidth+1)bad.push(CARDS[i].id);
    } return JSON.stringify(bad);})()`);
  const bad = JSON.parse(wide);
  check("на 390px ничего не вылезает вбок", bad.length === 0, bad.length ? bad.slice(0, 5).join(", ") : cards + " карточек");

  /* ---- английский пакет ----
     Перевод — это второй шанс завезти подсказку по длине: русский вариант правилу
     подчиняется, а английский рендер тех же вариантов легко делает верный ответ
     самым длинным. На первой же партии так вышло у четырёх карточек из шести,
     поэтому меряем EN отдельно, а не надеемся на дисциплину. */
  const en = JSON.parse(await A.ev(`(async function(){
    await new Promise(function(r){ loadEN(r) });
    var tr = I18N.cards || {};
    var total = CARDS.length, done = CARDS.filter(function(c){ return tr[c.id] }).length;
    /* Наличие записи ещё не значит перевод: у карточки может быть q и a, но не быть
       разбора или заметки — и экран выйдет двуязычным. Проверено: так было у 51. */
    var mixed = [];
    CARDS.forEach(function(c){
      var e = tr[c.id]; if(!e) return;
      var m = [];
      if(c.d && !e.d) m.push("d");
      if((window.MORE||{})[c.id] && !e.more) m.push("more");
      if(((window.HOOKS||{}).cards||{})[c.id] && !e.hook) m.push("hook");
      if((window.NOTES||{})[c.id] && !e.note) m.push("note");
      if(m.length && mixed.length < 5) mixed.push(c.id + "(" + m.join(",") + ")");
      else if(m.length) mixed.push("");
    });
    var quizzed = 0, tell = 0, bad = [];
    CARDS.forEach(function(c){
      var e = tr[c.id];
      if(!e || !e.quizCorrect || !Array.isArray(e.quizWrong) || e.quizWrong.length < 3) return;
      quizzed++;
      var lc = e.quizCorrect.length;
      var longer = e.quizWrong.filter(function(w){ return w.length > lc }).length;
      if(!longer){ tell++; if(bad.length < 5) bad.push(c.id); }
    });
    /* Карточками пакет не исчерпывается: у терминов, принципов и «найди баг» свои
       словари и свои ключи. Замер нашёл там 31 принцип и 18 багов вообще без
       перевода, плюс 4 термина без «подробнее». */
    var other = [];
    var dt = I18N.terms || {}, MT = window.MORE_TERM || {};
    var tNo = 0, tHole = 0;
    (window.TERMS || []).forEach(function(t){
      var k = t.t + "|" + t.term, e = dt[k];
      if(!e){ tNo++; return; }
      if(MT[k] && (e.more == null || e.more === "")) tHole++;
    });
    if(tNo || tHole) other.push("термины: без записи " + tNo + ", без «подробнее» " + tHole);
    var P = (typeof PRIN !== "undefined") ? PRIN : [], dp = I18N.prin || {};
    var pNo = P.filter(function(x){ return !dp[x.id] }).length;
    if(pNo) other.push("принципы: без записи " + pNo + " из " + P.length);
    var db = I18N.bugs || {};
    var bNo = (window.BUGS || []).filter(function(b){ return !db[b.id] }).length;
    if(bNo) other.push("найди баг: без записи " + bNo);
    var Fp = (typeof FP !== "undefined") ? FP : [], df = I18N.fp || {}, MF = window.MORE_FP || {};
    var fNo = 0, fHole = 0;
    Fp.forEach(function(e){
      var t = df[e.id];
      if(!t){ fNo++; return; }
      if(MF[e.id] && (t.more == null || t.more === "")) fHole++;
    });
    if(fNo || fHole) other.push("на пальцах: без записи " + fNo + ", без «подробнее» " + fHole);
    return JSON.stringify({ total: total, done: done, quizzed: quizzed, tell: tell, bad: bad,
      mixed: mixed.length, mixedEx: mixed.filter(Boolean), other: other });
  })()`));
  check("перевод карточек не потерялся", en.done > 0, en.done + " из " + en.total
    + " (" + Math.round(en.done / en.total * 100) + "%)");
  /* Долг достался по наследству и великоват, чтобы валить им сборку: английский
     текст в среднем короче русского, и там, где русский вариант правилу подчиняется
     с запасом в десяток знаков, перевод того же варианта уходит в минус. Замер:
     644 викторины из 755. Долг выплачен целиком, планка опущена до нуля — теперь
     это обычная проверка, а не храповик. Поднимать её обратно нельзя. */
  check("термины, «на пальцах», принципы и «найди баг» переведены", en.other.length === 0,
    en.other.length ? en.other.join(" · ") : "все четыре словаря заполнены");
  check("карточка не показывает смесь языков", en.mixed === 0,
    en.mixed ? en.mixed + " карточек с непереведёнными полями: " + en.mixedEx.join(", ")
             : "у всех переведённых заполнены разбор, заметка, крючок и подробнее");
  const EN_TELL_MAX = 0;
  check("английская подсказка по длине не растёт", en.tell <= EN_TELL_MAX,
    en.tell + " из " + en.quizzed + " без более длинного неверного (планка " + EN_TELL_MAX + ")"
      + (en.tell < EN_TELL_MAX ? " — опусти планку до " + en.tell : "")
      + (en.bad.length ? " · например " + en.bad.slice(0, 3).join(", ") : ""));

  /* ---- переключение языка ----
     Гейт один раз уже пропустил полный отказ: язык менялся, а вкладка оставалась
     русской, и проверка была зелёная. Причин было три, и каждая ломала свой путь:
       · trDeep падал на слове вроде «valueOf» — UITR отдавал метод из прототипа
         Object, String.replace звал его как функцию-заменитель. Исключение
         обрывало setLang до перерисовки;
       · первый тык по EN шёл в обход общей ветки — не запускались ни наблюдатель,
         ни глубокий проход;
       · refreshView не знал про половину вкладок.
     Поэтому проверяем не «словарь заполнен», а четыре пути, которыми ходит человек,
     и ловим исключение из setLang напрямую: иначе поломка выглядит как «осталось
     51% кириллицы», и на поиск причины уходит час. */
  const HOOK = "window.__err=[];addEventListener(\"error\",e=>__err.push(String(e.message)));"
    + "addEventListener(\"unhandledrejection\",e=>__err.push(\"promise: \"+e.reason));"
    + "document.querySelectorAll(\".onb,#onb\").forEach(e=>e.remove());";
  const RATIO = `(function(){var t=document.body.innerText||"";
    var c=(t.match(/[а-яА-ЯёЁ]/g)||[]).length,l=(t.match(/[a-zA-Z]/g)||[]).length;
    return c+l?Math.round(c/(c+l)*100):0;})()`;
  /* setLang внутри try: возвращаем текст исключения, а не симптом */
  const SETLANG = l => `(function(){ try{ setLang(${JSON.stringify(l)}); return ""; }
    catch(e){ return "исключение из setLang: "+e.message+" | "+String(e.stack||"").split("\\n")[1]; } })()`;
  const reload = async () => {
    await A.ev("location.reload()");
    for (let i = 0; i < 40; i++) { await sleep(500);
      if (await A.ev("document.readyState===\"complete\" && typeof CARDS!==\"undefined\" && CARDS.length>0")) break; }
    await sleep(400); await A.ev(HOOK);
  };

  /* 1. переключение прямо на вкладке — по всем вкладкам */
  const stuck = [], threw = [];
  for (const m of ["drill","terms","fp","zero","beh","money","basics","prin","prog","path"]) {
    await A.ev(`localStorage.removeItem("jdLang")`);
    const e1 = await A.ev(SETLANG("ru"));
    await A.ev(`setMode(${JSON.stringify(m)})`); await sleep(400);
    const e2 = await A.ev(SETLANG("en")); await sleep(900);
    if (e1 || e2) threw.push(m + ": " + (e1 || e2));
    const left = +(await A.ev(RATIO));
    if (left > 8) stuck.push(m + " " + left + "%");
  }
  check("setLang не бросает исключений", threw.length === 0,
    threw.length ? threw[0] : "10 вкладок, оба направления");
  check("переключение на английский работает прямо на вкладке", stuck.length === 0,
    stuck.length ? "осталось русским: " + stuck.join(" · ") : "10 вкладок, кириллицы ≤8% (остаток — имена классов и SQL)");

  /* 2. возврат на русский: trDeep правит текст на месте, восстановить его может
        только перерисовка — если она не случится, останется английский */
  await A.ev(`setMode("basics")`); await A.ev(SETLANG("ru")); await sleep(600);
  const ruBase = +(await A.ev(RATIO));
  await A.ev(SETLANG("en")); await sleep(800);
  await A.ev(SETLANG("ru")); await sleep(800);
  const ruBack = +(await A.ev(RATIO));
  check("возврат на русский восстанавливает текст", Math.abs(ruBack - ruBase) <= 4,
    "было " + ruBase + "% → стало " + ruBack + "% кириллицы");

  /* 3. первый тык по кнопке на свежей странице — путь, которым идёт живой человек.
        Именно он и был сломан: пакет грузится асинхронно, и ветка после загрузки
        шла мимо общей, без наблюдателя и без глубокого прохода. */
  await A.ev(`localStorage.removeItem("jdLang")`);
  await reload();
  await A.ev(`setMode("basics")`); await sleep(500);
  const freshBefore = +(await A.ev(RATIO));
  await A.ev(`var b=document.querySelector("#langTog"); if(b)b.click();`);
  await sleep(3000);
  const freshAfter = +(await A.ev(RATIO));
  check("первый тык по кнопке языка переводит страницу", freshAfter <= 8,
    "свежая страница: " + freshBefore + "% → " + freshAfter + "% кириллицы");

  /* 3б. проверка самого механизма, а не доли кириллицы.
        Подписи внутри схем лежат готовой HTML-строкой и переводятся только
        глубоким проходом trDeep плюс наблюдателем за вставками. Если ветка
        первого переключения пойдёт мимо них, вкладка всё равно нарисуется
        по-английски через T() — и доля кириллицы почти не изменится.
        Поэтому считаем узлы, чей текст ЕСТЬ в словаре, но остался русским:
        у работающего механизма их ноль. */
  const missed = +(await A.ev(`(function(){
    var n=0, w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null), x;
    while((x=w.nextNode())){ var k=x.nodeValue.trim(); if(!k)continue;
      var en=trLook(k); if(en!=null&&en!==k)n++; }
    return n;})()`));
  check("глубокий проход по подписям отработал", missed <= 5,
    missed + " узлов есть в словаре, но остались русскими");

  /* 4. выбор языка пережил перезагрузку */
  await reload();
  const savedLang = await A.ev("LANG");
  const savedRatio = +(await A.ev(RATIO));
  check("сохранённый английский поднимается при старте", savedLang === "en" && savedRatio <= 8,
    "LANG=" + savedLang + " · " + savedRatio + "% кириллицы");
  await A.ev(`localStorage.removeItem("jdLang")`);

  /* ---- длинные полотна не рисуются целиком ----
     «С нуля» (146 000px) и «Для чайника» (21 800px) держат сотни блоков в одном
     слое. Мобильные браузеры такие слои перестают дорисовывать — пользователь
     это и заметил: листаешь вниз, верхние карточки пропадают. Лечится пропуском
     отрисовки за экраном; сторож не даёт снять его молча. */
  const heavy = [];
  for (const [m, sel] of [["zero",".zero-step"],["basics",".bas-card"],["money",".zero-step"]]) {
    await A.ev(`try{setMode(${JSON.stringify(m)})}catch(e){}`); await sleep(500);
    const r = await A.ev(`(function(){
      var el=document.querySelectorAll(${JSON.stringify(sel)});
      if(!el.length) return JSON.stringify({нет:true});
      var sc=[...document.querySelectorAll("#view"+${JSON.stringify(m)}.replace(/^./,function(c){return c.toUpperCase()})+" *")]
        .filter(function(e){var c=getComputedStyle(e);return (c.overflowY==="auto")&&e.scrollHeight>e.clientHeight+40;})[0];
      return JSON.stringify({полотно:sc?sc.scrollHeight:0, пропуск:getComputedStyle(el[0]).contentVisibility, блоков:el.length});
    })()`);
    const d = JSON.parse(r);
    if (d.нет) continue;
    if (d.полотно > 15000 && d.пропуск !== "auto") heavy.push(m + " " + d.полотно + "px без пропуска");
  }
  check("длинные полотна не рисуются целиком", heavy.length === 0,
    heavy.length ? heavy.join(" · ") : "«С нуля», «Для чайника» и «Деньги» — пропуск отрисовки за экраном на месте");

  /* ---- содержимое достижимо целиком ----
     Пользователь нашёл руками: заходишь в игры, а верх меню не виден и не
     долистывается. Причина — display:flex + align-items:center + overflow:auto:
     когда содержимое выше контейнера, центрирование вываливает его поровну вверх
     и вниз, но прокрутка достаёт только низ. Теряло 934px в играх и 190px в
     «На пальцах». Лечится словом safe, а этот сторож не даёт вернуться. */
  const unreachable = [];
  for (const m of ["drill","terms","fp","prin","prog","sand","basics","zero","beh","money","path","game","mus"]) {
    await A.ev(`try{setMode(${JSON.stringify(m)})}catch(e){}`); await sleep(400);
    const r = await A.ev(`(function(){
      var out=[];
      document.querySelectorAll("*").forEach(function(e){
        var cs=getComputedStyle(e);
        if(cs.display.indexOf("flex")<0)return;
        if(cs.overflowY!=="auto"&&cs.overflowY!=="scroll")return;
        if(e.clientHeight<150)return;
        var k=[...e.children].filter(function(c){return c.getBoundingClientRect().height>0})[0];
        if(!k)return;
        var lost=Math.round(e.getBoundingClientRect().top-k.getBoundingClientRect().top);
        if(lost>4) out.push((e.id||e.className||"?").slice(0,18)+" "+lost+"px");
      });
      return JSON.stringify([...new Set(out)]);
    })()`);
    JSON.parse(r).forEach(x => unreachable.push(m + "/" + x));
  }
  check("содержимое не уезжает за верх контейнера", unreachable.length === 0,
    unreachable.length ? "недостижимо: " + unreachable.join(" · ") : "13 вкладок, прокрутка достаёт начало везде");

  /* ---- лист советов ----
     Данные лежат в отдельном tips.js, и если он не доедет или сменит форму,
     кнопка откроет пустой лист, а гейт этого не заметит. */
  const tips = JSON.parse(await A.ev(`(function(){
    try{ openTips(); }catch(e){ return JSON.stringify({ошибка:e.message}); }
    var b=document.getElementById("tipBody");
    var r={день:!!b.querySelector(".tip-day p"), разделов:b.querySelectorAll(".tip-sec").length,
           пунктов:b.querySelectorAll(".tip-item").length,
           длина:(b.querySelector(".tip-day p")||{textContent:""}).textContent.length};
    try{ closeTips(); }catch(e){}
    return JSON.stringify(r);
  })()`));
  check("лист советов открывается и заполнен", !tips.ошибка && tips.день && tips.разделов >= 3 && tips.пунктов >= 8,
    tips.ошибка ? tips.ошибка : "совет дня " + tips.длина + " знаков · разделов " + tips.разделов + " · пунктов " + tips.пунктов);
  /* ---- иконки технологий ----
     Данные в отдельном icons.js: не доедет — иконки молча пропадут, а гейт этого
     не заметит. Плюс сторож на контраст: официальный цвет Java это #000000, и на
     тёмном фоне лого было невидимо, пока не отдали его цвету текста. */
  const ico = JSON.parse(await A.ev(`(function(){
    if(!window.TECH_ICONS) return JSON.stringify({нет:true});
    if(!ICONS_ON) setIcons(true);
    setMode("terms");
    var фон=[7,8,14];
    function Y(c){var v=c.map(function(x){x/=255;return x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4)});
      return 0.2126*v[0]+0.7152*v[1]+0.0722*v[2];}
    var Yф=Y(фон), тусклые=[];
    Object.keys(TECH_ICONS).forEach(function(k){ var c=TECH_ICONS[k].c; if(!c)return;
      var rgb=[0,2,4].map(function(i){return parseInt(c.slice(i,i+2),16)});
      var kk=(Math.max(Y(rgb),Yф)+0.05)/(Math.min(Y(rgb),Yф)+0.05);
      if(kk<2.2) тусклые.push(k); });
    return JSON.stringify({иконок:Object.keys(TECH_ICONS).length,
      кластеров:Object.keys(TECH_BY_CLUSTER||{}).length,
      вразметке:document.querySelectorAll(".tech-ico").length, тусклые:тусклые});
  })()`));
  check("иконки технологий на месте", !ico.нет && ico.иконок >= 30 && ico.кластеров >= 19 && ico.вразметке > 0,
    ico.нет ? "icons.js не доехал" : ico.иконок + " иконок · " + ico.кластеров + " кластеров · в разметке " + ico.вразметке);
  check("иконки видны на тёмном фоне", !ico.нет && (ico.тусклые || []).length === 0,
    (ico.тусклые || []).length ? "сливаются с фоном: " + ico.тусклые.join(", ") : "контраст к фону у всех выше 2.2");

  /* переключатель обязан возвращать прежний вид без иконок */
  const off = JSON.parse(await A.ev(`(function(){
    /* Считаем в АКТИВНОЙ вкладке: refreshView перерисовывает только её, а скрытые
       обновятся при переходе — там застой пользователю не виден. */
    function вВидимой(){ var v=document.getElementById("viewTerms");
      return v?v.querySelectorAll(".tech-ico").length:-1; }
    setIcons(false); setMode("terms");
    var n=вВидимой();
    setIcons(true); setMode("terms");
    return JSON.stringify({выкл:n, вкл:вВидимой()});
  })()`));
  check("переключатель выключает иконки", off.выкл === 0 && off.вкл > 0,
    "выключено " + off.выкл + " · включено " + off.вкл);

  /* ---- дневной бюджет ----
     Раньше норма новых прибавлялась к повторам вслепую: по замеру лестницы
     на сороковой день набегало 144 карточки за раз. Теперь новые уступают
     место долгу. Сторож проверяет то, что важно: при долге больше бюджета
     новых не добавляется ни одной, а при выключенном бюджете поведение прежнее. */
  const bud = JSON.parse(await A.ev(`(function(){
    if(typeof dayBudget!=="function") return JSON.stringify({нет:true});
    var было=localStorage.getItem("javaDrillProgress.v1");
    function прогон(долг,бюджет){
      var P={}; CARDS.slice(0,долг).forEach(function(c){ P[c.id]={box:3,due:today()-1,lapses:0}; });
      localStorage.setItem("javaDrillProgress.v1",JSON.stringify(P));
      localStorage.removeItem("jdNewDay");
      prog=JSON.parse(localStorage.getItem("javaDrillProgress.v1"));
      dayBudget(бюджет); setMode("drill"); rebuild();
      var n=queue.filter(function(c){return !prog[c.id]}).length+((cur&&!prog[cur.id])?1:0);
      return n;
    }
    var r={пусто:прогон(0,60), половина:прогон(50,60), завал:прогон(100,60), безЛимита:прогон(100,0)};
    dayBudget(60);
    if(было!==null) localStorage.setItem("javaDrillProgress.v1",было); else localStorage.removeItem("javaDrillProgress.v1");
    prog=JSON.parse(localStorage.getItem("javaDrillProgress.v1")||"{}");
    rebuild();
    return JSON.stringify(r);
  })()`));
  check("дневной бюджет придерживает новые карточки", !bud.нет && bud.завал === 0 && bud.половина > 0 && bud.половина < bud.пусто && bud.безЛимита > 0,
    bud.нет ? "dayBudget не найден" :
      "долг 0 → " + bud.пусто + " новых · долг 50 → " + bud.половина + " · долг 100 → " + bud.завал + " · без лимита → " + bud.безЛимита);

  /* ---- фон не жжёт процессор ----
     Дважды за неделю страница жгла по половине ядра непрерывно, в том числе
     в фоновой вкладке. Виноват был фон: три круга во весь экран с blur(90px),
     и в движении был scale — масштабирование размытого слоя заставляет
     растеризовать его заново каждый кадр. Профайлер молчал, потому что работа
     идёт не в JS, а в процессе отрисовки. Сторож держит три условия сразу. */
  const bg = JSON.parse(await A.ev(`(function(){
    /* Только анимации фона: в карточках и схемах свои, они живут по другим правилам. */
    function фоновые(){ return document.getAnimations().filter(function(x){
      var t=x.effect&&x.effect.target; if(!t||!t.closest)return false;
      return t.classList.contains("bg")||t.closest(".bg")!==null; }); }
    var a=фоновые();
    var скейл=false; try{ скейл=a.some(function(x){
      return JSON.stringify(x.effect.getKeyframes()).indexOf("scale")>=0; }); }catch(e){}
    var радиус=0;
    [".bg::before",".bg::after"].forEach(function(){});
    var el=document.querySelector(".bg i");
    if(el){ var f=getComputedStyle(el).filter||""; var m=f.match(/blur\\((\\d+)/); if(m) радиус=+m[1]; }
    /* прячем страницу так же, как браузер при уходе на другую вкладку */
    Object.defineProperty(document,"hidden",{get:function(){return true},configurable:true});
    Object.defineProperty(document,"visibilityState",{get:function(){return "hidden"},configurable:true});
    document.dispatchEvent(new Event("visibilitychange"));
    return new Promise(function(готово){
    requestAnimationFrame(function(){ requestAnimationFrame(function(){
    var идутСкрытыми=фоновые().filter(function(x){return x.playState==="running"}).length;
    var живые=document.getAnimations().filter(function(x){
      return x.playState==="running" && !!x.animationName; });
    var всеСкрытые=живые.length;
    var кто=живые.slice(0,4).map(function(x){ var el=x.effect&&x.effect.target;
      return x.animationName+"@"+(el?(el.className||el.tagName).toString().slice(0,14):"?"); }).join(", ");
    Object.defineProperty(document,"hidden",{get:function(){return false},configurable:true});
    Object.defineProperty(document,"visibilityState",{get:function(){return "visible"},configurable:true});
    document.dispatchEvent(new Event("visibilitychange"));
    var идутВидимыми=фоновые().filter(function(x){return x.playState==="running"}).length;
    готово(JSON.stringify({скейл:скейл, радиус:радиус, скрыто:идутСкрытыми, скрытоВсе:всеСкрытые, кто:кто, видно:идутВидимыми}));
    }); }); });
  })()`));
  check("движение замирает, когда вкладку не видно", bg.скрытоВсе === 0 && bg.видно > 0,
    "скрытой идёт " + bg.скрытоВсе + " анимаций (" + (bg.кто||"") + ") · видимой " + bg.видно + " фоновых");
  check("фон не растеризуется каждый кадр", !bg.скейл && bg.радиус <= 40,
    (bg.скейл ? "в кадрах вернулся scale · " : "") + "радиус размытия " + bg.радиус + "px (потолок 40)");

  /* ---- стили разобраны целиком ----
     Одна лишняя закрывающая скобка в @keyframes оборвала разбор, и следующее
     правило .topbar браузер выбросил целиком: шапка перестала быть флексом,
     развалилась на шесть строк и заняла 184px вместо 71. Ошибка была невидимой —
     ни ошибок JS, ни падений, просто съехавшая вёрстка. Ловим двумя способами:
     считаем разобранные правила и проверяем, что ключевые элементы остались
     теми, чем задуманы. */
  const css = JSON.parse(await A.ev(`(function(){
    var правил=0;
    for (var i=0;i<document.styleSheets.length;i++){
      try{ правил+=document.styleSheets[i].cssRules.length; }catch(e){}
    }
    var nav=document.querySelector("nav.topbar");
    var cs=nav?getComputedStyle(nav):null;
    var строк=0;
    if(nav){ var y={}; [].forEach.call(nav.children,function(e){
      var r=e.getBoundingClientRect(); if(r.height>0) y[Math.round(r.top)]=1; });
      строк=Object.keys(y).length; }
    return JSON.stringify({правил:правил, display:cs?cs.display:"—",
      wrap:cs?cs.flexWrap:"—", высота:nav?Math.round(nav.getBoundingClientRect().height):0, строк:строк});
  })()`));
  /* Высоту не проверяем — на узком экране она законно растёт. Поломка узнаётся
     по двум признакам: display стал block и строк стало шесть вместо четырёх. */
  check("шапка осталась флексом", css.display === "flex" && css.wrap === "wrap" && css.строк <= 4,
    "display:" + css.display + " · wrap:" + css.wrap + " · строк " + css.строк + " · высота " + css.высота + "px");

  /* ---- шапка на разных ширинах ----
     Три таблетки — вкладки, счётчики, инструменты — должны стоять одной высотой,
     иначе правый край шапки выглядит рваным. А на телефоне пять вкладок должны
     влезать в одну строку: при переносе «Ещё» уезжала туда одна и шапка съедала
     137px из 700 — пятую часть экрана. И то и другое держится на пикселях,
     так что ломается от любой правки шрифта или отступа. */
  {
    const мерка = `(function(){
      var h=function(s){var e=document.querySelector(s);return e?Math.round(e.getBoundingClientRect().height):0};
      var t=document.querySelector(".tabs");
      var bs=[].slice.call(t.querySelectorAll(":scope > button, :scope > .more-tab"));
      var стр=Object.keys(bs.reduce(function(a,e){a[Math.round(e.getBoundingClientRect().top)]=1;return a},{})).length;
      var nav=document.querySelector("nav.topbar");
      var вылез=[].slice.call(nav.querySelectorAll("*")).some(function(e){
        var r=e.getBoundingClientRect(); return r.width>0 && (r.right>innerWidth+1 || r.left<-1); });
      var влез=function(s){var e=document.querySelector(s);
        return !e || (e.scrollHeight<=e.clientHeight+1 && e.scrollWidth<=e.clientWidth+1)};
      return JSON.stringify({вкладки:h(".tabs"),счётчики:h(".kpis"),инструменты:h(".tools"),
        обрез:[".tabs",".kpis",".tools"].filter(function(s){return !влез(s)}).join(", "),
        шапка:h("nav.topbar"), строк:стр, вылез:вылез, ширина:innerWidth,
        отступ:getComputedStyle(t.querySelector("button")).paddingLeft,
        шрифт:getComputedStyle(t.querySelector("button")).fontFamily.split(",")[0],
        inter:(document.fonts&&document.fonts.check)?document.fonts.check("600 13px Inter"):"?",
        место:Math.round(t.clientWidth-6),
        надо:Math.round(bs.reduce(function(a,e){return a+e.getBoundingClientRect().width},0)),
        кнопки:bs.map(function(e){return Math.round(e.getBoundingClientRect().width)}).join("/")});
    })()`;
    await A.raw("Emulation.setDeviceMetricsOverride", { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
    await sleep(400);
    const ш = JSON.parse(await A.ev(мерка));
    /* Одну высоту трём таблеткам задаёт правило .tabs,.kpis,.tools{height:42px} —
       проверять её бессмысленно, правило её же и держит. Опасность в другом: при
       фиксированной высоте выросший шрифт или отступ не раздвинет таблетку,
       а обрежется внутри неё. Это и ловим. */
    check("содержимое таблеток шапки не обрезано", !ш.обрез && ш.вкладки === ш.инструменты,
      ш.обрез ? "обрезано в " + ш.обрез
              : "вкладки " + ш.вкладки + " · счётчики " + ш.счётчики + " · инструменты " + ш.инструменты + " (1400px)");
    check("на широком экране шапка в одну полосу", ш.шапка <= 80 && !ш.вылез,
      ш.шапка + "px на 1400px" + (ш.вылез ? " · что-то вылезает за экран" : ""));
    await A.raw("Emulation.setDeviceMetricsOverride", { width: 360, height: 780, deviceScaleFactor: 1, mobile: true });
    /* К этому месту страница уже по-английски, а там подписи вкладок вдвое короче
       («Drill» против «Дрил», «Visual» против «На пальцах») — мерить надо худший
       случай, иначе сторож проспит любое раздутие русских вкладок. */
    await A.ev(`setLang("ru")`); await sleep(700);
    const у = JSON.parse(await A.ev(мерка));
    check("на телефоне вкладки влезают в одну строку", у.строк === 1 && у.шапка <= 110 && !у.вылез,
      "окно " + у.ширина + "px · строк " + у.строк + " · шапка " + у.шапка + "px · отступ " + у.отступ
        + " · шрифт " + у.шрифт + " (Inter загружен: " + у.inter + ")"
        + " · место " + у.место + " надо " + у.надо + " [" + у.кнопки + "]");
    await A.ev(`setLang("en")`); await sleep(700);
    await A.raw("Emulation.clearDeviceMetricsOverride");
    await sleep(300);
  }

  /* ---- обход вкладок ---- */
  const tabs = ["tabDrill","tabFp","tabPrin","tabTerms","tabGame","tabBeh","tabBasics","tabZero","tabPath","tabProg","tabMore","tabViz","tabSand","tabMus"];
  for (const tab of tabs) { await A.ev(`var e=document.getElementById('${tab}');if(e)e.click()`); await sleep(500); }
  const errs = JSON.parse(await A.ev("JSON.stringify(__err)"));
  check("ошибок JS на всех вкладках нет", errs.length === 0, errs.slice(0, 3).join(" | "));

  A.close(); cleanup();
  console.log("");
  if (fail.length) { console.error("ПРОВЕРКА НЕ ПРОШЛА (" + fail.length + "):\n  " + fail.join("\n  ")); process.exit(1); }
  console.log("всё чисто");
  process.exit(0);
})().catch(e => { console.error("сбой проверки:", e.message); process.exit(1); });

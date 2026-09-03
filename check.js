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

function conn(url) {
  return new Promise(res => {
    const ws = new WebSocket(url); let id = 0; const pend = new Map();
    ws.onmessage = e => { const m = JSON.parse(e.data); if (pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
    ws.onopen = () => res({
      ev: x => new Promise(r => {
        const i = ++id;
        pend.set(i, m => {
          const R = m.result || {};
          if (R.exceptionDetails) return r("__ОШИБКА__ " + ((R.exceptionDetails.exception || {}).description || R.exceptionDetails.text).split("\n")[0]);
          r(R.result && R.result.value);
        });
        ws.send(JSON.stringify({ id: i, method: "Runtime.evaluate", params: { expression: x, returnByValue: true, awaitPromise: true } }));
      }),
      raw: (m, p) => new Promise(r => { const i = ++id; pend.set(i, x => r(x.result)); ws.send(JSON.stringify({ id: i, method: m, params: p })); }),
      close: () => ws.close()
    });
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
  const proc = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + PORT, "--no-first-run", "--no-sandbox",
    "--disable-gpu", "--disable-dev-shm-usage", "--user-data-dir=/tmp/jd-check-prof", "file://" + FILE],
    { stdio: "ignore", detached: true });

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

  /* ---- обход вкладок ---- */
  const tabs = ["tabDrill","tabFp","tabPrin","tabTerms","tabGame","tabBeh","tabBasics","tabZero","tabPath","tabProg","tabMore","tabViz","tabSand","tabMus"];
  for (const tab of tabs) { await A.ev(`var e=document.getElementById('${tab}');if(e)e.click()`); await sleep(500); }
  const errs = JSON.parse(await A.ev("JSON.stringify(__err)"));
  check("ошибок JS на всех вкладках нет", errs.length === 0, errs.slice(0, 3).join(" | "));

  A.close(); try { process.kill(-proc.pid) } catch (e) {}
  console.log("");
  if (fail.length) { console.error("ПРОВЕРКА НЕ ПРОШЛА (" + fail.length + "):\n  " + fail.join("\n  ")); process.exit(1); }
  console.log("всё чисто");
  process.exit(0);
})().catch(e => { console.error("сбой проверки:", e.message); process.exit(1); });

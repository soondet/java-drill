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

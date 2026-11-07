#!/usr/bin/env node
/* Гейт Android-приложения: www/ (собранный bundle.js) в headless Chrome с подменённым Capacitor — как в APK.
 * Проверяет слой app-native*: экраны, занятие настоящими нажатиями и правила повторения по точным значениям —
 * ступень и срок после «знал / почти / не знал», границы 1 и 7, «проблемная» на четвёртом провале,
 * двойной тап, отмену, продолжение после перезапуска, порядок «сначала повторы», итоги, роадмап, раздел брата, ширины телефона.
 * Запуск: node bundle.js && node check-native.js. Упала проверка — код выхода 1.
 * У каждого вызова CDP таймаут: без него один зависший await держал Chrome вечно. */
const { spawn } = require("child_process"), fs = require("fs"), path = require("path"), os = require("os");
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", PORT = 9611;
const FILE = "file://" + path.join(__dirname, "www", "index.html");
let fails = 0;
const check = (name, ok, detail) => { console.log((ok ? "  ✓ " : "  ✗ ") + name + (detail ? "  " + detail : "")); if (!ok) fails++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
let kill = () => {};                                   /* гасит Chrome при любом выходе, и при ошибке тоже */

(async () => {
  if (!fs.existsSync(path.join(__dirname, "www", "app-native-late.js"))) throw new Error("нет www/ — сначала node bundle.js");
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), "jdn-"));
  const proc = spawn(CH, ["--headless=new", "--remote-debugging-port=" + PORT, "--no-first-run", "--disable-gpu", "--allow-file-access-from-files", "--user-data-dir=" + prof, "about:blank"], { stdio: "ignore" });
  kill = () => { try { proc.kill("SIGKILL"); } catch (e) {} try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) {} };
  const guard = setTimeout(() => { console.error("✗ гейт завис дольше 6 минут"); kill(); process.exit(2); }, 360000);
  let tgt;
  for (let i = 0; i < 60 && !tgt; i++) { try { tgt = (await (await fetch("http://127.0.0.1:" + PORT + "/json")).json()).find(t => t.type === "page"); } catch (e) {} if (!tgt) await sleep(250); }
  const ws = new WebSocket(tgt.webSocketDebuggerUrl); await new Promise((ok, no) => { ws.onopen = ok; ws.onerror = no; });
  let id = 0; const wait = new Map();
  const dialogs = [];
  ws.onmessage = m => { const d = JSON.parse(m.data); if (d.id && wait.has(d.id)) { wait.get(d.id)(d); wait.delete(d.id); }
    /* alert/confirm блокируют страницу — закрываем и запоминаем: в приложении их быть не должно */
    if (d.method === "Debugger.paused") paused = d.params;
    if (d.method === "Page.javascriptDialogOpening") { dialogs.push(d.params.type + ": " + d.params.message.slice(0, 80)); ws.send(JSON.stringify({ id: ++id, method: "Page.handleJavaScriptDialog", params: { accept: false } })); } };
  const raw = (method, params, ms) => new Promise((ok, no) => { const i = ++id; const t = setTimeout(() => { wait.delete(i); no(new Error("CDP " + method + " — нет ответа")); }, ms || 20000);
    wait.set(i, d => { clearTimeout(t); d.error ? no(new Error(d.error.message)) : ok(d.result); }); ws.send(JSON.stringify({ id: i, method, params })); });
  /* зависла страница — ставим её на паузу и печатаем, где крутится код */
  let paused = null;
  const where = async () => { try { await raw("Debugger.enable", {}, 5000); paused = null; ws.send(JSON.stringify({ id: ++id, method: "Debugger.pause" })); for (let i = 0; i < 40 && !paused; i++) await sleep(100);
    return paused ? paused.callFrames.slice(0, 8).map(f => (f.functionName || "(анонимная)") + " @" + f.url.split("/").pop() + ":" + (f.location.lineNumber + 1)).join(" ← ") : "пауза не сработала"; } catch (e) { return "нет отладчика: " + e.message; } };
  const ev = async expr => { let r; try { r = await raw("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }); }
    catch (e) { throw new Error(e.message + "\n    стек: " + await where() + "\n    выражение: " + expr.replace(/\s+/g, " ").slice(0, 140)); }
    if (r.exceptionDetails) throw new Error((r.exceptionDetails.exception || {}).description || r.exceptionDetails.text); return r.result.value; };
  const vp = (w, hh) => raw("Emulation.setDeviceMetricsOverride", { width: w, height: hh, deviceScaleFactor: 2.6, mobile: true });
  await raw("Page.enable", {}); await raw("Runtime.enable", {});
  await raw("Page.addScriptToEvaluateOnNewDocument", { source: 'window.Capacitor={isNativePlatform:()=>true,Plugins:{}};window.__err=[];addEventListener("error",e=>__err.push(e.message+" @"+(e.filename||"").split("/").pop()+":"+e.lineno));' });
  await vp(390, 844);
  const open = async () => { await raw("Page.navigate", { url: FILE }); for (let i = 0; i < 120; i++) { await sleep(250); try { if (await ev(`document.readyState==="complete"&&!!window.jdNative`)) return; } catch (e) {} } throw new Error("приложение не поднялось"); };
  await open();
  /* чистый профиль: 6 начатых карточек со сроком «сегодня» на ступени 3, норма новых 3 и бюджет 10 → занятие 9 */
  await ev(`localStorage.clear(); const ids=CARDS.slice(0,6).map(c=>c.id), p={}; ids.forEach(i=>p[i]={box:3,due:today()-1,reps:2});
    localStorage.setItem("javaDrillProgress.v1",JSON.stringify(p)); localStorage.setItem("jdNewPerDay","3"); localStorage.setItem("jdDayBudget","10"); localStorage.setItem("jdSeen","1"); true`);
  await open();
  const st = id => ev(`JSON.stringify(prog[${JSON.stringify(id)}]||null)`).then(JSON.parse);
  const T = await ev("today()"), BD = await ev("JSON.stringify(BOX_DAYS)").then(JSON.parse);
  const tap = sel => ev(`(function(){const b=document.querySelector(${JSON.stringify(sel)}); if(!b) return false; b.click(); return true})()`);
  const settle = async () => { for (let i = 0; i < 40; i++) { await sleep(60); if (await ev(`!GRADING`)) break; } await sleep(80); };

  console.log("\n— экран «Сегодня»");
  const t0 = JSON.parse(await ev(`JSON.stringify({mode, today:!document.querySelector("#viewToday").hidden, nums:[...document.querySelectorAll(".jt-nums b")].map(b=>+b.textContent), go:(document.querySelector("#jtGo")||{}).textContent, bar:[...document.querySelectorAll(".jd-bb button")].map(b=>b.textContent.trim())})`));
  check("при запуске — «Сегодня»: к повтору 6, новых 3 (норма), одна кнопка «Начать занятие»", t0.mode === "today" && t0.today && t0.nums[0] === 6 && t0.nums[1] === 3 && /Начать занятие/.test(t0.go), JSON.stringify(t0.nums) + " · " + t0.go);
  check("нижняя панель — пять разделов", t0.bar.length === 5 && /Сегодня/.test(t0.bar[0]) && /Прогресс/.test(t0.bar[4]), t0.bar.join(" | "));

  console.log("\n— занятие");
  await tap("#jtGo"); await sleep(300);
  const s0 = JSON.parse(await ev(`JSON.stringify({focus:document.body.classList.contains("jd-focus"), ids:jdNative.session().ids, started:jdNative.session().ids.map(i=>!!prog[i]), reveal:(()=>{const r=document.querySelector("#btnReveal").getBoundingClientRect();return {top:Math.round(r.top),bottom:Math.round(r.bottom),h:Math.round(r.height)}})(), ih:innerHeight, top:!!document.querySelector(".topbar")&&getComputedStyle(document.querySelector(".topbar")).display})`));
  check("фокус: шапка и панель спрятаны, в очереди 9, сначала все 6 повторов, потом новые", s0.focus && s0.top === "none" && s0.ids.length === 9 && s0.started.slice(0, 6).every(Boolean) && s0.started.slice(6).every(x => !x), "начатые по порядку: " + s0.started.map(x => x ? "П" : "Н").join(""));
  check("«Показать ответ» внизу экрана под большим пальцем, не ниже 56 px", s0.reveal.bottom <= s0.ih && s0.reveal.top >= s0.ih - 130 && s0.reveal.h >= 56, JSON.stringify(s0.reveal) + " при высоте " + s0.ih);
  await tap("#btnReveal"); await sleep(150);
  const g0 = JSON.parse(await ev(`JSON.stringify([...document.querySelectorAll("#jdAct .btn")].map(b=>{const r=b.getBoundingClientRect();return {t:b.textContent.trim(),top:Math.round(r.top),bottom:Math.round(r.bottom),h:Math.round(r.height)}}))`));
  check("после ответа — три оценки с последствием и в зоне пальца (ступень 3: почти — 2 дня, знал — 7 дней)", g0.length === 3 && /ещё раз сегодня/.test(g0[0].t) && /через 2 дня/.test(g0[1].t) && /через 7 дней/.test(g0[2].t) && g0.every(b => b.bottom <= 844 && b.h >= 56), g0.map(b => b.t).join(" | "));
  /* «Знал» двойным тапом: засчитан один раз */
  let c1 = await ev("cur.id"); const b1 = await st(c1);
  await ev(`(function(){const b=document.querySelector("#btnGood"); b.click(); b.click(); setTimeout(()=>{ const x=document.querySelector("#btnGood"); x&&x.click(); },40); return true})()`); await settle(); await sleep(200);
  const a1 = await st(c1);
  check("«Знал»: ступень +1, срок через BOX_DAYS; двойной тап засчитан один раз", a1.box === 4 && a1.due === T + BD[4] && a1.reps === b1.reps + 1 && (await ev("cur.id")) !== c1, "ступень " + b1.box + " → " + a1.box + ", срок +" + (a1.due - T) + ", повторов " + b1.reps + " → " + a1.reps);
  /* «Почти» */
  let c2 = await ev("cur.id"); await tap("#btnReveal"); await sleep(60); await tap("#btnMid"); await settle();
  const a2 = await st(c2);
  check("«Почти»: ступень та же, интервал вдвое короче (3 → 2 дня)", a2.box === 3 && a2.due === T + Math.max(1, Math.round(BD[3] / 2)), "ступень " + a2.box + ", срок +" + (a2.due - T));
  /* «Не знал» — минус две ступени, в конец сессии */
  let c3 = await ev("cur.id"); await tap("#btnReveal"); await sleep(60); await tap("#btnBad"); await settle();
  const a3 = await st(c3), q3 = JSON.parse(await ev("JSON.stringify(jdNative.session().ids)"));
  check("«Не знал»: ступень 3 → 1, провал +1, карточка вернётся в конце занятия", a3.box === 1 && a3.lapses === 1 && a3.due === T && q3[q3.length - 1] === c3, "ступень " + a3.box + ", провалов " + a3.lapses + ", последняя в очереди — она: " + (q3[q3.length - 1] === c3));
  /* отмена */
  let c4 = await ev("cur.id"); const b4 = await st(c4), d4 = await ev("jdNative.session().done"), raw4 = await ev(`JSON.stringify(["jdNewDay","javaDrillHist.v1"].map(k=>localStorage.getItem(k)))`);
  await tap("#btnReveal"); await sleep(60); await tap("#btnGood"); await settle();
  await tap("#toastAct"); await sleep(400);
  const u4 = JSON.parse(await ev(`JSON.stringify({cur:cur.id, revealed, done:jdNative.session().done, raw:["jdNewDay","javaDrillHist.v1"].map(k=>localStorage.getItem(k)), grades:document.querySelectorAll("#jdAct .btn.good").length})`));
  check("«Отменить»: карточка, ступень, срок, счёт занятия и история дня — как до оценки, ответ открыт", u4.cur === c4 && JSON.stringify(await st(c4)) === JSON.stringify(b4) && u4.done === d4 && JSON.stringify(u4.raw) === raw4 && u4.revealed && u4.grades === 1, "карточка та же: " + (u4.cur === c4) + " · пройдено " + u4.done);
  /* продолжение после перезапуска */
  const before = JSON.parse(await ev("JSON.stringify(jdNative.session().ids)"));
  await open(); await sleep(200);
  const r1 = JSON.parse(await ev(`JSON.stringify({mode, go:(document.querySelector("#jtGo")||{}).textContent, nums:[...document.querySelectorAll(".jt-nums b")].map(b=>+b.textContent)})`));
  await tap("#jtGo"); await sleep(300);
  const after = JSON.parse(await ev("JSON.stringify(jdNative.session().ids)"));
  check("закрыл приложение посреди занятия — «Продолжить занятие», та же очередь", /Продолжить/.test(r1.go) && JSON.stringify(after) === JSON.stringify(before), r1.go + " · осталось " + after.length);
  /* «Назад» из занятия: сессия не сбрасывается */
  await ev(`setMode("today"); true`); await sleep(200); await tap("#jtGo"); await sleep(250);
  check("выход ✕ / «Назад» и обратно — очередь не перестроилась", JSON.stringify(JSON.parse(await ev("JSON.stringify(jdNative.session().ids)"))) === JSON.stringify(before));
  /* до конца — итоги */
  for (let i = 0; i < 30; i++) { if (await ev(`!!document.querySelector(".jr")`)) break; await tap("#btnReveal"); await sleep(40); await tap("#btnGood"); await settle(); }
  const res = JSON.parse(await ev(`JSON.stringify({jr:!!document.querySelector(".jr"), text:(document.querySelector(".jr")||{}).textContent||"", nums:[...document.querySelectorAll(".jr-grid b")].map(b=>+b.textContent), home:!!document.querySelector("#jrHome")})`));
  check("конец занятия — итоги: знал / почти / не знал, трудная тема, «На главную»", res.jr && res.nums.length === 3 && res.nums[1] >= 1 && res.nums[0] >= 1 && /Самая трудная тема/.test(res.text) && res.home, res.nums.join("/") + " · " + res.text.replace(/\s+/g, " ").slice(0, 90));
  await tap("#jrHome"); await sleep(250);
  check("«На главную» — снова «Сегодня», занятие закрыто", (await ev("mode")) === "today" && !(await ev("!!jdNative.session()")));

  console.log("\n— границы лестницы");
  const one = async (setup, lvl) => {
    const cid = await ev(`(function(){ const c=CARDS[40]; prog[c.id]=${setup}; save(); drillList=[c.id]; drillTokens.clear(); cramEl.checked=false; setMode("drill"); return c.id })()`);
    await sleep(250); await tap("#btnReveal"); await sleep(60); await tap(["#btnBad", "#btnMid", "#btnGood"][lvl]); await settle(); await ev(`setMode("today"); true`);
    return st(cid);
  };
  const k7 = await one(`{box:7,due:today(),reps:9}`, 2);
  check("«Знал» на седьмой ступени — остаётся седьмая, срок +75", k7.box === 7 && k7.due === T + 75, JSON.stringify(k7));
  const k1 = await one(`{box:1,due:today(),reps:1}`, 0);
  check("«Не знал» на первой — ниже не падает", k1.box === 1 && k1.lapses === 1, JSON.stringify(k1));
  const m1 = await one(`{box:1,due:today(),reps:1}`, 1);
  check("«Почти» на первой — не меньше дня", m1.box === 1 && m1.due === T + 1, JSON.stringify(m1));
  const l4 = await one(`{box:2,due:today(),reps:5,lapses:3}`, 0);
  check("четвёртый провал — «проблемная»", l4.lapses === 4 && await ev(`isLeech(CARDS[40].id)`), JSON.stringify(l4));

  console.log("\n— ответ вариантами");
  await ev(`setMode("today"); true`); await sleep(150);
  const QDECK = `(function(){ drillTokens.clear(); cramEl.checked=false; drillList=CARDS.slice(120,124).map(c=>c.id); setMode("drill"); return true })()`;
  await tap("[data-am=quiz]"); await sleep(80); await ev(QDECK); await sleep(350);
  const QV = `JSON.stringify([...document.querySelectorAll("#jdAct .btn")].filter(b=>getComputedStyle(b).display!=="none").map(b=>b.querySelector("span").textContent))`;
  const pickQ = good => ev(`(function(){ const want=T("cards",cur.id,"quizCorrect",QUIZ[cur.id].correct), o=[...document.querySelectorAll(".jd-opt")];
    const b=o.find(x=>(x.querySelector("span:last-child").textContent===want)===${good}); b.click(); return JSON.stringify({n:o.length, right:o.filter(x=>x.querySelector("span:last-child").textContent===want).length}) })()`).then(JSON.parse);
  const q1 = await ev("cur.id"), qb1 = (await st(q1) || { box: 1 }).box || 1, qo = await pickQ(true); await sleep(120);
  const qv1 = JSON.parse(await ev(QV));
  check("4 варианта: под вопросом четыре кнопки, верная ровно одна; угадал — «Знал» или «Угадал»", qo.n === 4 && qo.right === 1 && qv1.join("|") === "Угадал|Знал", JSON.stringify(qo) + " · " + qv1.join(" | "));
  await tap("#btnGood"); await settle();
  const qs1 = await st(q1);
  check("верно → «Знал»: ступень +1 по тем же правилам", qs1 && qs1.box === Math.min(7, qb1 + 1) && qs1.due === T + BD[qs1.box], "ступень " + qb1 + " → " + (qs1 && qs1.box));
  const q2 = await ev("cur.id"); await pickQ(false); await sleep(120);
  const qv2 = JSON.parse(await ev(QV)), marks = JSON.parse(await ev(`JSON.stringify([document.querySelectorAll(".jd-opt.ok").length, document.querySelectorAll(".jd-opt.no").length])`));
  await tap("#btnBad"); await settle();
  const qs2 = await st(q2), lastQ = await ev("queue.length ? queue[queue.length-1].id : ''");
  check("неверно → только «Не знал», верный зелёным, свой красным; карточка вернётся в конце", qv2.join("|") === "Не знал" && marks[0] === 1 && marks[1] === 1 && qs2.lapses >= 1 && lastQ === q2, qv2.join("|") + " · " + JSON.stringify(marks) + " · последняя — она: " + (lastQ === q2));
  await tap("#btnReveal"); await sleep(120);
  const qv3 = JSON.parse(await ev(QV));
  await ev(`setMode("today"); true`); await sleep(150); await tap("[data-am=self]"); await sleep(80); await ev(QDECK); await sleep(300);
  const selfOk = await ev(`!document.querySelector(".jd-opt") && /Показать ответ/.test(document.querySelector("#btnReveal").textContent)`);
  check("«Не знаю — показать ответ» → только «Не знал»; переключатель обратно — обычный режим", qv3.join("|") === "Не знал" && selfOk, qv3.join("|") + " · обычный: " + selfOk);
  await ev(`setMode("today"); true`); await sleep(150);

  console.log("\n— «С нуля» и шапка");
  await ev(`setMode("zero"); true`); await sleep(900);
  await tap(".jd-route"); await sleep(450);
  const zs = JSON.parse(await ev(`JSON.stringify({open:!document.querySelector(".jd-sheet").hidden, topics:document.querySelectorAll(".jd-sheet .zn-item").length, chips:getComputedStyle(document.querySelector("#zeroChips")).display})`));
  await ev(`(function(){ document.querySelector('.jd-sheet .zn-item[data-k="zg2"]').click(); return true })()`); await sleep(250);
  const target = await ev(`(function(){ const b=document.querySelector('.jd-sheet .zn-sub .zn-s[data-s]'); const s=[...document.querySelectorAll('.jd-sheet .zn-item[data-k="zg2"] + .zn-sub .zn-s')][1]; s.click(); return s.dataset.s })()`);
  await sleep(1600);
  const zs2 = JSON.parse(await ev(`JSON.stringify({closed:document.querySelector(".jd-sheet").hidden, top:Math.round(document.getElementById("zs${target}").getBoundingClientRect().top), h:innerHeight, bar:document.querySelector(".jd-route").textContent})`));
  check("«С нуля»: строка «Маршрут» открывает дерево всех тем, тап по шагу — переход к нему, шторка закрыта, строка показывает тему", zs.open && zs.topics >= 60 && zs.chips === "none" && zs2.closed && zs2.top > 0 && zs2.top < zs2.h && / 3 \/ /.test(zs2.bar), JSON.stringify(zs) + " · шаг " + target + " на " + zs2.top + " · " + zs2.bar);
  await ev(`setMode("today"); true`); await sleep(150);
  await raw("Emulation.setSafeAreaInsetsOverride", { insets: { top: 40, bottom: 24 } }); await sleep(250);
  const hdr = JSON.parse(await ev(`JSON.stringify({bar:Math.round(document.querySelector(".topbar").getBoundingClientRect().top), brand:Math.round(document.querySelector(".topbar .brand").getBoundingClientRect().top), h1:Math.round(document.querySelector("#viewToday h1").getBoundingClientRect().top), bb:Math.round(innerHeight-document.querySelector(".jd-bb button").getBoundingClientRect().bottom)})`));
  await raw("Emulation.setSafeAreaInsetsOverride", { insets: {} }); await sleep(150);
  check("шапка под строкой времени и заряда: фон с самого верха, «Java Drill» ниже строки, панель над жестами", hdr.bar === 0 && hdr.brand >= 40 && hdr.h1 > hdr.brand && hdr.bb >= 24, JSON.stringify(hdr));

  console.log("\n— роадмап");
  await ev(`localStorage.removeItem("jdRoadmapUI"); setMode("learn"); document.querySelector('#viewLearn [data-go="roadmap"]').click(); true`); await sleep(250);
  const rc = JSON.parse(await ev(`(function(){
    const entered = mode;
    const cnt = {c:{},f:{},p:{},z:{}}; let nodes=0, deep=0; const modes=[], games=[];
    const up=(o,k)=>{o[k]=(o[k]||0)+1};
    const walk=(n,d)=>{ nodes++; deep=Math.max(deep,d); n.c.forEach(x=>up(cnt.c,x)); n.f.forEach(x=>up(cnt.f,x)); n.p.forEach(x=>up(cnt.p,x)); if(n.z!=null)up(cnt.z,n.z); if(n.m)modes.push(n.m); if(n.g)games.push(n.g); n.kids.forEach(x=>walk(x,d+1)); };
    const R=jdRoadmap.tree(); R.forEach(s=>walk(s,1));
    const bad=(all,o)=>all.filter(k=>o[k]!==1).slice(0,4);
    const ghost=(o,all)=>Object.keys(o).filter(k=>!all.includes(k)).slice(0,4);
    const cards=CARDS.map(c=>c.id), fp=FP.map(e=>e.id), pr=PRIN.map(e=>e.id), z=ZERO.map((x,i)=>String(i));
    return JSON.stringify({mode:entered, title:(setMode("roadmap"),document.querySelector(".topbar .brand").textContent), stages:R.length, topics:R.flatMap(s=>s.kids).length, nodes, deep,
      miss:{cards:bad(cards,cnt.c), fp:bad(fp,cnt.f), prin:bad(pr,cnt.p), zero:bad(z,cnt.z)}, ghost:{cards:ghost(cnt.c,cards), fp:ghost(cnt.f,fp), prin:ghost(cnt.p,pr)},
      terms:[...new Set(TERMS.map(t=>t.t))].filter(cl=>!R.some(s=>s.T.includes(cl))), cards0:[...new Set(CARDS.map(c=>c.t))].filter(cl=>!R.some(s=>s.T.includes(cl))),
      basics:[...new Set(BASICS.map(b=>b.g))].filter(g=>!R.some(s=>s.B.some(x=>g.startsWith(x)))),
      modes:modes.filter(m=>!document.querySelector("#tab"+m[0].toUpperCase()+m.slice(1))), games:(setMode("game"),games.filter(g=>!document.getElementById(g))+""), nGames:games.length,
      linkless:(function f(a){return a.flatMap(n=>n.kids.length?f(n.kids):(n.ids.length||n.steps.length||n.m||n.g||n.fs.length||n.ps.length)?[]:[n.t])})(R).slice(0,4)});
  })()`));
  const none = o => Object.values(o).every(a => !a.length);
  check("роадмап: 22 этапа и бонус, дерево от 5 уровней, вход из «Учить», в шапке название", rc.mode === "roadmap" && rc.title === "Роадмап" && rc.stages === 23 && rc.topics >= 100 && rc.deep >= 5, JSON.stringify({ topics: rc.topics, nodes: rc.nodes, deep: rc.deep }));
  check("каждая карточка, разбор, схема и шаг «С нуля» — ровно в одном узле, лишних id нет", none(rc.miss) && none(rc.ghost), JSON.stringify({ miss: rc.miss, ghost: rc.ghost }));
  check("все кластеры терминов и карточек, группы «Для чайника», режимы и игры привязаны, листьев-пустышек нет", !rc.terms.length && !rc.cards0.length && !rc.basics.length && !rc.modes.length && !rc.games && rc.nGames >= 6 && !rc.linkless.length, JSON.stringify({ t: rc.terms, b: rc.basics, m: rc.modes, g: rc.games, l: rc.linkless }));
  const tx = `jdRoadmap.tree().flatMap(s=>s.kids).find(t=>t.t==="Транзакции")`, iso = `${tx}.kids.find(x=>x.t==="Изоляция")`, leaf = `${iso}.kids.find(x=>x.t==="Lost update")`;
  const progBefore = await ev(`localStorage.getItem("javaDrillProgress.v1")`);
  await ev(`document.querySelector('[data-t="'+${tx}.k+'"]').click(); document.querySelector('[data-n="'+${iso}.k+'"]').click(); true`); await sleep(120);
  const ro = JSON.parse(await ev(`JSON.stringify({trees:document.querySelectorAll(".jm-tree").length, leaf:!!document.querySelector('[data-n="'+${leaf}.k+'"]'), go:!!document.querySelector('.jm-go-s[data-learn="'+${iso}.k+'"]')})`));
  await open();
  await ev(`setMode("roadmap"); true`); await sleep(200);
  const ro2 = await ev(`!!document.querySelector('[data-n="'+${leaf}.k+'"]')`);
  check("тема раскрывается панелью, ветка — подветками, у раскрытой ветки «Учить»; раскрытое переживает перезапуск", ro.trees === 1 && ro.leaf && ro.go && ro2, JSON.stringify(ro));
  /* проценты: одна карточка листа на 5-й ступени = половина листа из двух */
  const lc = JSON.parse(await ev(`JSON.stringify(${leaf}.ids)`));
  await ev(`prog[${JSON.stringify(lc[0])}]={box:5,due:today()+20,reps:5}; setMode("roadmap"); true`); await sleep(150);
  const pc = JSON.parse(await ev(`JSON.stringify({leaf:jdRoadmap.stat(${leaf}), txt:document.querySelector('[data-n="'+${leaf}.k+'"] small').textContent})`));
  check("проценты считаются из ступеней: 1 из 2 освоено → лист 50%", lc.length === 2 && pc.leaf.done === 1 && pc.leaf.total === 2 && pc.txt === "50%", JSON.stringify(pc));
  await ev(`document.querySelector('[data-n="'+${leaf}.k+'"]').click(); true`); await sleep(350);
  const rs = JSON.parse(await ev(`JSON.stringify({open:!document.querySelector(".jm-sheet").hidden, title:document.querySelector(".jm-sh-t b").textContent, q:document.querySelectorAll(".jm-q").length, fp:document.querySelectorAll(".jm-sheet [data-fp]").length})`));
  await ev(`window.jdNative.back(); true`); await sleep(320);
  const backed = await ev(`document.querySelector(".jm-sheet").hidden`);
  await ev(`document.querySelector('[data-n="'+${leaf}.k+'"]').click(); true`); await sleep(350);
  await ev(`window.scrollTo(0,420); document.querySelector('.jm-sh-foot [data-learn]').click(); true`); await sleep(350);
  const rd = JSON.parse(await ev(`JSON.stringify({mode, cur:cur&&cur.id, ids:idsNow2()})`.replace("idsNow2()", `[cur&&cur.id].concat(queue.map(c=>c.id))`)));
  await ev(`document.querySelector(".jd-sbar .jd-x").click(); true`); await sleep(250);
  const rb = JSON.parse(await ev(`JSON.stringify({mode, y:Math.round(scrollY)})`));
  check("лист: шторка с вопросами и разборами, «Назад» её закрывает, «Учить» — только неосвоенные этого листа, крестик — обратно на то же место", rs.open && rs.q === 2 && rs.fp === 1 && backed && rd.mode === "drill" && rd.ids.length === 1 && rd.ids[0] === lc[1] && rb.mode === "roadmap" && rb.y >= 300, JSON.stringify({ rs, rd, rb }));
  const fpId = "lost-update";
  await ev(`document.querySelector('[data-n="'+${leaf}.k+'"]').click(); true`); await sleep(350);
  await ev(`document.querySelector('.jm-sheet [data-fp]').click(); true`); await sleep(350);
  const rf = JSON.parse(await ev(`JSON.stringify({mode, id:FP[fpCur].id, shown:!!document.querySelector("#viewFp:not([hidden])")})`));
  await ev(`document.querySelector(".topbar .jd-up").click(); true`); await sleep(250);
  const rf2 = await ev("mode");
  await ev(`(function(){const t=jdRoadmap.tree()[0].kids[0]; document.querySelector('[data-t="'+t.k+'"]').click(); document.querySelector('[data-n="'+t.kids[1].k+'"]').click(); return true})()`); await sleep(1000);
  const rz = JSON.parse(await ev(`JSON.stringify({mode, top:Math.round(document.getElementById("zs"+jdRoadmap.tree()[0].kids[0].kids[1].z).getBoundingClientRect().top), h:innerHeight})`));
  await ev(`setMode("roadmap"); true`); await sleep(150);
  const beh = `jdRoadmap.tree().flatMap(s=>s.kids).find(t=>t.m==="beh")`, bug = `jdRoadmap.tree().flatMap(s=>s.kids).flatMap(t=>t.kids).find(n=>n.g==="mBugs")`, prc = `jdRoadmap.tree()[21].kids.find(t=>t.kids.some(x=>x.g))`;
  await ev(`document.querySelector('[data-t="'+${beh}.k+'"]').click(); true`); await sleep(250); const rm1 = await ev("mode");
  await ev(`setMode("roadmap"); document.querySelector('[data-t="'+${prc}.k+'"]').click(); document.querySelector('[data-n="'+${bug}.k+'"]').click(); true`); await sleep(350); const rg = await ev(`mode+":"+!!document.querySelector("#gameStage .bug-code, #gameStage pre, #gameStage code")`);
  await ev(`setMode("roadmap"); document.querySelector('#jmS7 .jm-ttl').click(); true`); await sleep(350);
  await ev(`document.querySelector('.jm-sheet [data-terms]').click(); true`); await sleep(350);
  const rt = JSON.parse(await ev(`JSON.stringify({mode, open:document.querySelectorAll("#termList .thead.open").length, ready:document.querySelectorAll("#termList .tbody[data-ready] .term").length})`));
  check("переходы: разбор нужный и «назад» на роадмап, шаг «С нуля» на экране, режим, игра, термины этапа открыты", rf.mode === "fp" && rf.id === fpId && rf.shown && rf2 === "roadmap" && rz.mode === "zero" && rz.top >= 0 && rz.top < rz.h && rm1 === "beh" && /^game/.test(rg) && rt.mode === "terms" && rt.open === 1 && rt.ready > 0, JSON.stringify({ rf, rf2, rz, rm1, rg, rt }));
  await ev(`setMode("today"); true`); await sleep(150);
  await ev(`delete prog[${JSON.stringify(lc[0])}]; save(); true`);
  const progAfter = await ev(`localStorage.getItem("javaDrillProgress.v1")`);
  check("роадмап не меняет прогресс: расписание карточек то же", progAfter === progBefore);
  /* «только не освоенное»: освоенный этап и тема прячутся, состояние не затирает раскрытое */
  await ev(`(function(){jdRoadmap.tree()[3].ids.forEach(id=>{prog[id]={box:5,due:today()+20,reps:5}}); jdRoadmap.tree()[3].steps.forEach(i=>ZDONE.add(zeroKey(ZERO[i]))); setMode("roadmap"); return true})()`); await sleep(150);
  const f0 = await ev(`!!document.querySelector("#jmS3")`);
  await ev(`document.querySelector("#jmOnly").click(); true`); await sleep(150);
  const f1 = await ev(`JSON.stringify({s3:!!document.querySelector("#jmS3"), s4:!!document.querySelector("#jmS4"), fold:(document.querySelector(".jm-fold")||{}).textContent||""})`);
  await ev(`document.querySelector("#jmOnly").click(); (function(){jdRoadmap.tree()[3].ids.forEach(id=>{delete prog[id]}); jdRoadmap.tree()[3].steps.forEach(i=>ZDONE.delete(zeroKey(ZERO[i])));})(); save(); setMode("today"); true`); await sleep(150);
  const fo = JSON.parse(f1);
  check("«Только не освоенное» прячет освоенный этап и говорит об этом", f0 && !fo.s3 && fo.s4 && /1/.test(fo.fold), f1);

  console.log("\n— Python и C++ (раздел брата)");
  /* свой прогресс (jdBro) и свои данные: прогресс Java не трогается, «Назад» ходит урок → курс → оба курса */
  const brJava = await ev(`localStorage.getItem("javaDrillProgress.v1")`);
  await ev(`localStorage.removeItem("jdBro"); localStorage.removeItem("jdBroHome"); setMode("learn"); document.querySelector('#viewLearn .jd-tile[data-mode="bro"]').click(); true`);
  for (let i = 0; i < 50; i++) { await sleep(100); if (await ev(`!!document.querySelector("#broWrap .bro-tc")`)) break; }
  const br0 = JSON.parse(await ev(`JSON.stringify({mode, title:(document.querySelector(".topbar .jd-up span")||{}).textContent, tracks:document.querySelectorAll("#broWrap .bro-tc").length,
    py:(window.BRO_CH||[]).filter(c=>c.track==="py").reduce((a,c)=>a+c.ls.length,0), cpp:(window.BRO_CH||[]).filter(c=>c.track==="cpp").reduce((a,c)=>a+c.ls.length,0)})`));
  check("«Python и C++»: плитка в «Учить», в шапке название, оба курса, уроки подгрузились", br0.mode === "bro" && br0.title === "Python и C++" && br0.tracks === 2 && br0.py >= 30 && br0.cpp >= 25, JSON.stringify(br0));
  await tap("#broWrap .bro-tc.py"); await sleep(200);
  const [brL1, brL2] = JSON.parse(await ev(`JSON.stringify(BRO_CH.find(c=>c.track==="py").ls.slice(0,2).map(l=>l.id))`));
  await tap(`#broWrap .bro-l[data-go="${brL1}"]`); await sleep(200);
  const br1 = JSON.parse(await ev(`(function(){ const run=document.querySelector("#broWrap .bro-run"); run.click(); const out=run.closest(".bro-ex").querySelector(".bro-out");
    const q=document.querySelector("#broWrap .bro-q"); q.querySelector('.bro-o[data-k="1"]').click(); q.querySelector('.bro-o[data-k="0"]').click();
    return JSON.stringify({hash:location.hash, out:!out.hidden&&out.textContent.length>10, ok:!!q.querySelector(".bro-o.ok"), no:!!q.querySelector(".bro-o.no"), ex:!q.querySelector(".bro-qe").hidden,
      first:JSON.parse(localStorage.getItem("jdBro")).q[${JSON.stringify(brL1)}][0]}) })()`));
  check("урок: «Запустить» показывает вывод; неверный — красным, верный — зелёным, пояснение; засчитана первая попытка", br1.hash === "#bro/" + brL1 && br1.out && br1.ok && br1.no && br1.ex && br1.first === 0, JSON.stringify(br1));
  await tap("#broWrap [data-done]"); await sleep(250);
  const br2 = JSON.parse(await ev(`JSON.stringify({hash:location.hash, done:JSON.parse(localStorage.getItem("jdBro")).d[${JSON.stringify(brL1)}]===1})`));
  const brBacks = [];
  for (let i = 0; i < 3; i++) { brBacks.push(await ev("jdNative.back()") + ":" + (await ev("location.hash")) + ":" + (await ev("mode"))); await sleep(200); }
  check("«Урок пройден» — отметка и следующий урок; «Назад»: урок → курс → оба курса → дальше приложение", br2.done && br2.hash === "#bro/" + brL2 && brBacks[0] === "true:#bro/py:bro" && brBacks[1] === "true:#bro:bro" && /^false:/.test(brBacks[2]), JSON.stringify(br2) + " " + brBacks.join(" | "));
  await ev(`setMode("today"); true`); await sleep(150);
  check("уход из раздела убирает #bro из адреса; прогресс Java не тронут", (await ev("location.hash")) === "" && (await ev(`localStorage.getItem("javaDrillProgress.v1")`)) === brJava);
  await ev(`localStorage.setItem("jdBroHome","1"); true`); await open();
  const br3 = JSON.parse(await ev(`JSON.stringify({mode, home:jdNative.home(), tc:document.querySelectorAll("#broWrap .bro-tc").length})`));
  await ev(`localStorage.removeItem("jdBroHome"); true`); await open();
  check("«Открывать сразу здесь» — приложение стартует в разделе, «Назад» ведёт в него; выключил — снова «Сегодня»", br3.mode === "bro" && br3.home === "bro" && (await ev("mode")) === "today", JSON.stringify(br3));
  const BRAUD = `(function(){ const w=document.getElementById("broWrap"), W=innerWidth, out=[];
    if (w.scrollWidth>w.clientWidth+1) out.push("вбок "+w.scrollWidth+">"+w.clientWidth);
    w.querySelectorAll(".bro-o,.bro-run,.bro-l,.bro-cta,.bro-back,.bro-copy,.bro-tc,.bro-pn .btn,.bro-tutor,.bro-undo,.bro-reset,.bro-links a,.bro-ask .btn,.bro-task summary,.bro-pin").forEach(b=>{ if(!b.getClientRects().length) return;
      const r=b.getBoundingClientRect(); if (r.height<44||r.width<44) out.push("мелко "+Math.round(r.width)+"×"+Math.round(r.height)+" "+b.className); if (r.right>W+1||r.left<-1) out.push("за край "+b.className); });
    w.querySelectorAll("pre.bro-code").forEach(p=>{ if(p.getClientRects().length&&p.scrollWidth>p.clientWidth+1) out.push("код шире экрана: "+p.textContent.split("\\n").sort((a,b)=>b.length-a.length)[0]); });
    return JSON.stringify(out.slice(0,5)); })()`;
  const brBad = [];
  for (const [w, hh] of [[360, 780], [390, 844], [844, 390]]) {
    await vp(w, hh); await sleep(150);
    for (const h of ["#bro", "#bro/py", "#bro/" + brL1, "#bro/cpp-vs-python"]) {
      await ev(`location.hash=${JSON.stringify(h)}; setMode("bro"); true`); await sleep(250);
      await ev(`document.querySelectorAll("#broWrap .bro-run").forEach(b=>b.click()); document.querySelectorAll("#broWrap details").forEach(d=>d.open=true); true`); await sleep(80);
      const a = JSON.parse(await ev(BRAUD)); if (a.length) brBad.push(w + " " + h + ": " + a.join("; "));
    }
  }
  await vp(390, 844); await ev(`setMode("today"); true`);
  check("раздел брата на 360 / 390 и боком: без прокрутки вбок, код влезает, цели от 44 px", !brBad.length, brBad.slice(0, 4).join(" | "));

  console.log("\n— разделы и ширины");
  const nav = [];
  for (const m of ["learn", "cards", "prog", "game", "today"]) { await ev(`document.querySelector('.jd-bb [data-m="${m}"]').click(); true`); await sleep(350); nav.push(m + ":" + (await ev("mode"))); }
  const hub = JSON.parse(await ev(`JSON.stringify({tiles:(setMode("learn"),document.querySelectorAll("#viewLearn .jd-tile").length), topics:(setMode("cards"),document.querySelectorAll('#viewCards [data-topic]').length), ladder:(setMode("prog"),document.querySelectorAll(".jl-row").length)})`));
  check("панель ведёт в разделы; «Учить» — 12 разделов, «Карточки» — все темы, «Прогресс» — лестница из 7 ступеней", nav.every(x => x.split(":")[0] === x.split(":")[1]) && hub.tiles === 12 && hub.topics >= 15 && hub.ladder === 7, nav.join(" ") + " · " + JSON.stringify(hub));
  const AUD = `(function(){ const W=innerWidth, out=[];
    if (document.scrollingElement.scrollWidth>W+1) out.push("вбок "+document.scrollingElement.scrollWidth+">"+W);
    document.querySelectorAll(".jd-bb button,#jdAct .btn,.jd-row,.jd-tile,.jd-more,.jd-sbar button,.jl-row,.jd-search,.jd-seg button,.jd-opt,.jd-route,.jm-t,.jm-ttl,.jm-nb,.jm-go-s,.jm-act,.jm-me,.jm-line-b,.jm-q").forEach(b=>{ if(!b.getClientRects().length) return; const r=b.getBoundingClientRect();
      if (r.height<44||r.width<44) out.push("мелко "+Math.round(r.width)+"×"+Math.round(r.height)+" "+(b.className||b.tagName)); if (r.right>W+1||r.left<-1) out.push("за край "+(b.className||b.tagName)); });
    /* длинное слово в названии этапа или темы не вылезает и не рвётся */
    document.querySelectorAll(".jm-ttl b,.jm-t b").forEach(x=>{ if(x.getClientRects().length&&x.scrollWidth>x.clientWidth+1) out.push("слово шире блока: "+x.textContent); });
    return JSON.stringify(out.slice(0,6)); })()`;
  const widths = [[360, 780], [390, 844], [412, 915], [844, 390]], bad = [];
  for (const [w, hh] of widths) {
    await vp(w, hh); await sleep(200);
    for (const m of ["today", "learn", "cards", "prog", "roadmap"]) { await ev(`setMode("${m}"); true`); await sleep(150); const a = JSON.parse(await ev(AUD)); if (a.length) bad.push(w + "×" + hh + " " + m + ": " + a.join("; ")); }
    if (process.env.DEBUG) console.log("    ширина " + w + "×" + hh + " разделы ок");
    await ev(`(function(){ drillTokens.clear(); drillList=CARDS.slice(80,82).map(c=>c.id); setMode("drill"); return true })()`); await sleep(250); await tap("#btnReveal"); await sleep(100);
    const a = JSON.parse(await ev(AUD)), g = JSON.parse(await ev(`JSON.stringify([...document.querySelectorAll("#jdAct .btn")].map(b=>Math.round(b.getBoundingClientRect().bottom)))`));
    if (a.length || !g.length || g.some(y => y > hh)) bad.push(w + "×" + hh + " занятие: " + a.join("; ") + " оценки до " + Math.max(...g));
    await ev(`setMode("today"); true`);
  }
  check("360 / 390 / 412 и телефон боком: без прокрутки вбок, цели от 44 px, оценки на экране", !bad.length, bad.slice(0, 4).join(" | "));
  await vp(390, 844);
  check("ни одного системного окна alert/confirm", !dialogs.length, dialogs.join(" | "));
  const errs = JSON.parse(await ev("JSON.stringify(__err)"));
  check("без ошибок JS", !errs.length, errs.slice(0, 3).join(" | "));

  clearTimeout(guard); ws.close(); kill();
  console.log(fails ? "\n✗ провалено: " + fails : "\n✓ всё зелёное");
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error("✗", e.message); kill(); process.exit(1); });

#!/usr/bin/env node
/* Гейт Android-приложения: www/ (собранный bundle.js) в headless Chrome с подменённым Capacitor — как в APK.
 * Проверяет слой app-native*: экраны, занятие настоящими нажатиями и правила повторения по точным значениям —
 * ступень и срок после «знал / почти / не знал», границы 1 и 7, «проблемная» на четвёртом провале,
 * двойной тап, отмену, продолжение после перезапуска, порядок «сначала повторы», итоги, ширины телефона.
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

  console.log("\n— разделы и ширины");
  const nav = [];
  for (const m of ["learn", "cards", "prog", "game", "today"]) { await ev(`document.querySelector('.jd-bb [data-m="${m}"]').click(); true`); await sleep(350); nav.push(m + ":" + (await ev("mode"))); }
  const hub = JSON.parse(await ev(`JSON.stringify({tiles:(setMode("learn"),document.querySelectorAll("#viewLearn .jd-tile").length), topics:(setMode("cards"),document.querySelectorAll('#viewCards [data-topic]').length), ladder:(setMode("prog"),document.querySelectorAll(".jl-row").length)})`));
  check("панель ведёт в разделы; «Учить» — 11 разделов, «Карточки» — все темы, «Прогресс» — лестница из 7 ступеней", nav.every(x => x.split(":")[0] === x.split(":")[1]) && hub.tiles === 11 && hub.topics >= 15 && hub.ladder === 7, nav.join(" ") + " · " + JSON.stringify(hub));
  const AUD = `(function(){ const W=innerWidth, out=[];
    if (document.scrollingElement.scrollWidth>W+1) out.push("вбок "+document.scrollingElement.scrollWidth+">"+W);
    document.querySelectorAll(".jd-bb button,#jdAct .btn,.jd-row,.jd-tile,.jd-more,.jd-sbar button,.jl-row,.jd-search").forEach(b=>{ if(!b.getClientRects().length) return; const r=b.getBoundingClientRect();
      if (r.height<44||r.width<44) out.push("мелко "+Math.round(r.width)+"×"+Math.round(r.height)+" "+(b.className||b.tagName)); if (r.right>W+1||r.left<-1) out.push("за край "+(b.className||b.tagName)); });
    return JSON.stringify(out.slice(0,6)); })()`;
  const widths = [[360, 780], [390, 844], [412, 915], [844, 390]], bad = [];
  for (const [w, hh] of widths) {
    await vp(w, hh); await sleep(200);
    for (const m of ["today", "learn", "cards", "prog"]) { await ev(`setMode("${m}"); true`); await sleep(150); const a = JSON.parse(await ev(AUD)); if (a.length) bad.push(w + "×" + hh + " " + m + ": " + a.join("; ")); }
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

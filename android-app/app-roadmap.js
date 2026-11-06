/* Роадмап: 22 этапа на одной линии, у этапа темы, у темы ветки — деревом до листьев. Только в APK.
 * Дерево — app-roadmap-data.js. Прогресс здесь не хранится: считается из ступеней карточек (освоено = ступень 5+)
 * и отметок «С нуля», поэтому расписание повторений роадмап не трогает. Своё состояние — только что раскрыто.
 * Экран подключён к циклу setMode через jdNative.ui.addScreen (app-native-late.js). */
(function () {
  "use strict";
  const ui = window.jdNative && window.jdNative.ui;
  if (!ui || !window.JD_ROADMAP) return;
  const { ic, h, L, plural, $q, bar } = ui;
  const UIKEY = "jdRoadmapUI", MAIN = 22, NOW_PCT = 70;
  const HUES = [["#ff8fa3", "255,143,163"], ["#6ea8fe", "110,168,254"], ["#54e6c8", "84,230,200"], ["#ffcf6e", "255,207,110"], ["#ff9f43", "255,159,67"], ["#a98bff", "169,139,255"]];

  const name = n => n.z != null ? tr(n.t) : L(n.t, n.en);
  const count = (n, ru, en) => n + " " + L(plural(n, ...ru), plural(n, ...en));
  const nBranch = n => count(n, ["ветка", "ветки", "веток"], ["branch", "branches"]);
  const nTopic = n => count(n, ["тема", "темы", "тем"], ["topic", "topics"]);
  const nStep = n => count(n, ["шаг", "шага", "шагов"], ["step", "steps"]);
  const nCard = n => count(n, ["карточка", "карточки", "карточек"], ["card", "cards"]);

  /* ---------- дерево: разбор один раз, при первом обращении ---------- */
  let STAGES = null;
  const byKey = new Map();
  function parse() {
    const root = { kids: [] }, path = [root];
    window.JD_ROADMAP.split("\n").forEach(line => {
      const text = line.trim(); if (!text) return;
      const depth = (line.length - line.trimStart().length) / 2;
      if (text[0] === "~") { const up = path[depth]; (up.zg = up.zg || []).push(text.slice(1)); return; }
      const [head, tokens] = text.split(" :: "), [t, en] = head.split(" | ");
      const n = { t, en: en || t.replace(" и ", " and "), kids: [], c: [], f: [], p: [], T: [], B: [] };
      (tokens || "").split(" ").filter(Boolean).forEach(x => {
        const m = /^([fpTBmg]):(.+)$/.exec(x);
        if (!m) n.c.push(x); else if (m[1] === "m" || m[1] === "g") n[m[1]] = m[2]; else n[m[1]].push(m[2].replace(/_/g, " "));
      });
      path[depth].kids.push(n); path[depth + 1] = n;
    });
    return root.kids;
  }
  /* шаги «С нуля» — обычные листья: у темы без своих веток сразу под ней, иначе отдельной первой веткой */
  function addSteps(topic, groups) {
    const steps = (topic.zg || []).flatMap(g => (groups[g] || []).map(i => ({ t: ZERO[i].t, z: i, kids: [], c: [], f: [], p: [], T: [], B: [] })));
    if (!steps.length) return;
    if (topic.kids.length) topic.kids.unshift({ t: "С нуля", en: "From zero", kids: steps, c: [], f: [], p: [], T: [], B: [], zb: true });
    else topic.kids = steps;
  }
  /* карточки, которых нет в дереве (сайт пополняется): в конец этапа их кластера — видно сразу, прогресс честный */
  function addNew(stages) {
    const placed = new Set(), walk = n => { n.c.forEach(id => placed.add(id)); n.kids.forEach(walk); }; stages.forEach(walk);
    const fresh = CARDS.filter(c => !placed.has(c.id)); if (!fresh.length) return;
    stages.forEach(s => {
      const ids = fresh.filter(c => s.T.includes(c.t)).map(c => c.id);
      if (ids.length) s.kids[s.kids.length - 1].kids.push({ t: "Новые карточки", en: "New cards", kids: [], c: ids, f: [], p: [], T: [], B: [] });
    });
  }
  function seal(n, key, stage) {
    n.k = key; n.stage = stage; byKey.set(key, n);
    n.ids = n.c.slice(); n.steps = n.z != null ? [n.z] : []; n.fs = n.f.slice(); n.ps = n.p.slice();
    n.kids.forEach((x, i) => { seal(x, key + "." + i, stage); n.ids.push(...x.ids); n.steps.push(...x.steps); n.fs.push(...x.fs); n.ps.push(...x.ps); });
  }
  function tree() {
    if (STAGES) return STAGES;
    const groups = {}; zeroGroups().forEach(g => { groups[g.g] = (groups[g.g] || []).concat(g.ids); });
    const stages = parse();
    stages.forEach(s => s.kids.forEach(x => addSteps(x, groups)));
    addNew(stages);
    stages.forEach((s, i) => seal(s, String(i), s));
    return (STAGES = stages);
  }

  /* ---------- прогресс ---------- */
  let memo = new Map();
  function stat(n) {
    let s = memo.get(n); if (s) return s;
    let total = 0, done = 0, began = false;
    n.ids.forEach(id => { if (isHidden(id)) return; total++; if (stR(id).box >= 5) done++; if (prog[id]) began = true; });
    n.steps.forEach(i => { total++; if (zDone(i)) { done++; began = true; } });
    s = { total, done, began, pct: total ? Math.floor(done / total * 100) : 0 };
    memo.set(n, s); return s;
  }
  const finished = n => { const s = stat(n); return s.total > 0 && s.done === s.total; };
  /* «ты здесь» — первый неосвоенный этап. Этап только из шагов «С нуля» пропускаем, если человек идёт по карточкам и эти шаги не трогал */
  const current = () => { const main = tree().slice(0, MAIN), cards = Object.keys(prog).length > 0; return main.find(s => stat(s).pct < NOW_PCT && (!cards || s.ids.length || stat(s).began)) || main[MAIN - 1]; };
  const nowTopic = st => st.kids.find(t => stat(t).total && stat(t).pct < NOW_PCT);
  function totals() {
    const main = tree().slice(0, MAIN), topics = main.flatMap(s => s.kids);
    let total = 0, done = 0, mast = 0;
    main.forEach(s => { const x = stat(s); total += x.total; done += x.done; s.ids.forEach(id => { if (!isHidden(id) && stR(id).box >= 5) mast++; }); });
    return { pct: total ? Math.floor(done / total * 100) : 0, mast, topics: topics.length, began: topics.filter(t => stat(t).began).length };
  }

  /* ---------- что раскрыто ---------- */
  const saved = (() => { try { return JSON.parse(localStorage.getItem(UIKEY)) || {}; } catch (e) { return {}; } })();
  const open = new Set(saved.open || []);
  let only = !!saved.only, scrollY0 = 0, fresh = null;
  const keep = () => { try { localStorage.setItem(UIKEY, JSON.stringify({ open: [...open], only })); } catch (e) {} };

  /* ---------- разметка ---------- */
  const dotOf = n => { const s = stat(n); return s.pct >= NOW_PCT ? " g" : s.done ? " y" : ""; };
  const linked = n => n.z != null || n.m || n.g;
  const shown = n => !(only && finished(n));
  function hasWay(n) { return linked(n) || n.ids.length || n.steps.length; }

  function nodeHTML(n, lvl) {
    if (!shown(n)) return "";
    const kids = n.kids.filter(shown), s = stat(n), isOpen = kids.length && open.has(n.k);
    const tail = n.kids.length ? "<small>" + (n.zb ? n.steps.length : kids.length) + "</small>" + ic(isOpen ? "chevD" : "chev")
      : linked(n) ? ic("chev") : s.total ? "<small>" + s.pct + "%</small>" : ic("chev");
    return '<li class="' + (lvl >= 2 ? "l3" : "") + '"><div class="jm-nr' + (isOpen ? " o" : "") + (n.kids.length ? "" : " leaf") + '">'
      + '<button class="jm-nb" data-n="' + n.k + '"' + (n.kids.length ? ' aria-expanded="' + !!isOpen + '"' : "") + '><i class="jm-dot' + dotOf(n) + '"></i><span class="x">' + h(name(n)) + "</span>" + tail + "</button>"
      + (isOpen && hasWay(n) ? '<button class="jm-go-s" data-learn="' + n.k + '">' + ic("play") + h(L("Учить", "Learn")) + "</button>" : "") + "</div>"
      + (isOpen ? "<ul>" + kids.map(x => nodeHTML(x, lvl + 1)).join("") + "</ul>" : "") + "</li>";
  }
  function panelHTML(t, side) {
    const s = stat(t), kids = t.kids.filter(shown), own = t.fs.length + t.ps.length;
    return '<div class="jm-tree ' + side + (fresh === t.k ? " new" : "") + '" data-for="' + t.k + '"><h4>' + h(name(t)) + "<span>" + h(nBranch(kids.length)) + " · " + s.pct + "%</span></h4>"
      + '<ul class="jm-b">' + kids.map(x => nodeHTML(x, 1)).join("") + "</ul>"
      + '<div class="jm-acts">' + (hasWay(t) ? '<button class="btn primary jm-act" data-learn="' + t.k + '"><span>' + h(t.ids.length ? L("Учить тему", "Learn topic") + " · " + t.ids.filter(id => !isHidden(id)).length : L("Открыть в «С нуля»", "Open in “From zero”")) + "</span></button>" : "")
      + (own ? '<button class="btn jm-act" data-sheet="' + t.k + '"><span>' + h(L("Материалы", "Materials") + " · " + own) + "</span></button>" : "") + "</div></div>";
  }
  function topicHTML(t, side, now) {
    const s = stat(t), isOpen = t.kids.length && open.has(t.k), kids = t.kids.filter(shown).length;
    const sub = linked(t) ? L("открыть", "open") : t.kids[0] && t.kids[0].z != null ? nStep(t.kids.length) : nBranch(kids);
    return '<button class="jm-t ' + side + (s.total && s.pct === 100 ? " ok" : !s.done && s.total ? " off" : "") + (isOpen ? " open" : "") + (now ? " now" : "") + '" data-t="' + t.k + '"' + (t.kids.length ? ' aria-expanded="' + !!isOpen + '"' : "") + ">"
      + "<b>" + h(name(t)) + "</b>" + (s.total ? "<em>" + s.pct + '%</em><span class="jm-m"><i style="width:' + s.pct + '%"></i></span>' : "")
      + '<span class="jm-cnt">' + ic(isOpen ? "chevD" : "chev") + h(sub) + "</span></button>";
  }
  function topsHTML(st) {
    const now = st === current() ? nowTopic(st) : null, ts = st.kids.filter(shown), out = [];
    for (let i = 0; i < ts.length; i += 2) {
      const row = ts.slice(i, i + 2);
      row.forEach((t, j) => out.push(topicHTML(t, j ? "r" : "l", t === now)));
      row.forEach((t, j) => { if (t.kids.length && open.has(t.k)) out.push(panelHTML(t, j ? "r" : "l")); });
    }
    return out.join("");
  }
  function stageHTML(st, i) {
    if (!shown(st)) return "";
    const s = stat(st), hue = HUES[i % HUES.length], bonus = i >= MAIN, cur = st === current();
    const facts = [nTopic(st.kids.length)].concat(st.ids.length ? [nCard(st.ids.length)] : st.steps.length ? [nStep(st.steps.length)] : []).concat(s.total ? [s.pct + "%"] : []);
    return '<section class="jm-stage' + (i % 2 ? " r" : "") + (s.total && s.pct >= NOW_PCT ? " done" : "") + (cur ? " cur" : "") + (s.done ? "" : " next") + '" id="jmS' + i + '" style="--jm-c:' + hue[0] + ";--jm-tint:rgba(" + hue[1] + ",.14);--jm-edge:rgba(" + hue[1] + ",.38);--jm-line:rgba(" + hue[1] + ',.55)">'
      + (cur ? '<span class="jm-here">' + h(L("ты здесь", "you are here")) + "</span>" : "")
      + '<div class="jm-head"><button class="jm-ttl" data-sheet="' + st.k + '"><b>' + h(name(st)) + "</b><span>" + h(facts.join(" · ")) + '</span></button><div class="jm-num" style="--p:' + s.pct + '%"><b>' + (bonus ? ic("starOn") : i + 1) + "</b></div></div>"
      + '<div class="jm-tops" data-s="' + st.k + '">' + topsHTML(st) + '</div><div class="jm-end"></div></section>';
  }
  function drawView() {
    memo = new Map();
    const v = $q("#viewRoadmap"), all = tree(), cur = current(), x = totals(), idx = all.indexOf(cur) + 1, hidden = all.filter(s => !shown(s)).length;
    const num = (a, b) => "<div><b>" + a + "</b><span>" + h(b) + "</span></div>";
    v.innerHTML = '<div class="jm-hero"><small>' + h(L("Путь в сеньоры · 22 этапа", "Path to senior · 22 stages")) + "</small><h1>" + h(L("Этап " + idx + " из " + MAIN + ":", "Stage " + idx + " of " + MAIN + ":")) + "<br>" + h(name(cur)) + "</h1>"
      + '<div class="jm-nums">' + num(x.pct + "%", L("всего освоено", "mastered")) + num(x.began + " / " + x.topics, L("темы начаты", "topics started")) + num(x.mast, L("карточек освоено", "cards mastered")) + "</div>" + bar(x.pct)
      + '<button class="btn primary jm-me" id="jmMe"><span>' + h(L("К моему месту", "Go to my place")) + "</span></button></div>"
      + '<label class="jd-switch jm-only"><input type="checkbox" role="switch" id="jmOnly"' + (only ? " checked" : "") + "><span>" + h(L("Только не освоенное", "Only what's not mastered")) + "</span></label>"
      + (hidden ? '<p class="jm-fold">' + h(L("Скрыто освоенных этапов: ", "Mastered stages hidden: ") + hidden) + "</p>" : "")
      + '<div class="jm-map" id="jmMap"><div class="jm-line"><i></i></div>' + all.map(stageHTML).join("") + "</div>";
    if (window.ResizeObserver) { if (!drawView.ro) drawView.ro = new ResizeObserver(syncLine); drawView.ro.disconnect(); drawView.ro.observe($q("#jmMap")); }
  }
  /* заливка линии — до круга текущего этапа */
  function syncLine() {
    const map = $q("#jmMap"), fill = map && map.querySelector(".jm-line i"), head = map && map.querySelector(".jm-stage.cur .jm-num");
    if (!fill) return;
    if (!head) { fill.style.height = "0"; return; }
    const r = head.getBoundingClientRect(); fill.style.height = Math.max(0, r.top + r.height / 2 - map.getBoundingClientRect().top) + "px";
  }
  function refresh(st) {
    memo = new Map();
    const box = $q('.jm-tops[data-s="' + st.k + '"]'); if (box) box.innerHTML = topsHTML(st);
    fresh = null; syncLine();
  }
  function toggle(n) {
    const was = open.has(n.k);
    if (was) open.delete(n.k); else { open.add(n.k); fresh = n.k.split(".").length === 2 ? n.k : null; }
    keep(); refresh(n.stage);
  }

  /* ---------- переходы ---------- */
  function go(fn) { scrollY0 = window.scrollY; closeSheet(); ui.from("roadmap"); fn(); }
  const firstStep = n => { const i = n.steps.find(x => !zDone(x)); return i != null ? i : n.steps[0]; };
  function act(n) {
    if (n.z != null) return go(() => ui.jumpZero(n.z));
    if (n.m) return go(() => setMode(n.m));
    if (n.g) return go(() => gsOpenGame(n.g));
    sheet(n);
  }
  function learn(n) {
    if (n.m || n.g) return act(n);
    const ids = n.ids.filter(id => !isHidden(id)), left = ids.filter(id => stR(id).box < 5);
    if (ids.length) return go(() => ui.startIds(left.length ? left : ids));
    if (n.steps.length) go(() => ui.jumpZero(firstStep(n)));
  }
  function openFp(id) { const i = FP.findIndex(e => e.id === id); if (i >= 0) go(() => { fpCur = i; fpFrame = 0; fpPlaying = true; setMode("fp"); }); }
  function openPrin(id) { const i = PRIN.findIndex(p => p.id === id); if (i >= 0) go(() => { prinCur = i; setMode("prin"); }); }
  function openTerms(cl) {
    go(() => {
      setMode("terms");
      const hd = [...document.querySelectorAll("#termList .thead")].find(x => x.querySelector(".nlabel").textContent.trim().endsWith(clName(cl)));
      if (hd) { if (!hd.classList.contains("open")) hd.click(); hd.scrollIntoView({ block: "start" }); }
    });
  }
  function openBasics(start) {
    go(() => {
      setMode("basics");
      const want = basG(BASICS.map(b => b.g).find(g => g.startsWith(start)));
      const gh = [...document.querySelectorAll("#basList .bas-gh")].find(x => x.textContent.trim() === want);
      if (gh) gh.scrollIntoView({ block: "start" });
    });
  }
  function toMe() {
    const cur = current(), st = $q("#jmS" + tree().indexOf(cur)); if (!st) return;
    const t = nowTopic(cur), el = t && st.querySelector('[data-t="' + t.k + '"]');
    st.scrollIntoView({ block: "start" }); window.scrollBy(0, -(($q(".topbar") || {}).offsetHeight || 0) - 26);
    if (el) { el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); }
  }

  /* ---------- шторка: карточки и материалы узла ---------- */
  const sh = document.createElement("div"); sh.className = "jd-sheet jm-sheet"; sh.hidden = true;
  sh.innerHTML = '<div class="jd-sheet-bg"></div><div class="jd-sheet-panel" role="dialog" aria-modal="true"><div class="jd-sheet-grip"></div><div class="jd-sheet-head"><div class="jm-sh-t"><b></b><span></span></div>'
    + '<button class="jd-sheet-x" aria-label="' + h(L("Закрыть", "Close")) + '">' + ic("x") + '</button></div><div class="jd-sheet-body"></div><div class="jm-sh-foot"></div></div>';
  document.body.appendChild(sh);
  const line = (attrs, title, right, dot) => '<button class="jm-line-b" ' + attrs + ">" + (dot != null ? '<i class="jm-dot' + dot + '"></i>' : "") + "<span>" + h(title) + "</span>" + (right != null ? "<small>" + h(right) + "</small>" : "") + ic("chev") + "</button>";
  const block = (title, rows) => rows.length ? '<h3 class="jd-h3">' + h(title) + '</h3><div class="jm-lines">' + rows.join("") + "</div>" : "";
  const parents = n => { const ks = n.k.split("."), out = []; for (let i = 1; i < ks.length; i++) out.push(byKey.get(ks.slice(0, i).join("."))); return out; };
  function sheet(n) {
    memo = new Map();
    const s = stat(n), ids = n.ids.filter(id => !isHidden(id)), isStage = n === n.stage;
    sh.querySelector(".jm-sh-t b").textContent = name(n);
    sh.querySelector(".jm-sh-t span").textContent = parents(n).map(name).join(" · ");
    const rows = isStage ? n.kids.map(t => line('data-open="' + t.k + '"', name(t), stat(t).total ? stat(t).pct + "%" : null, dotOf(t))) : [];
    const cards = isStage || ids.length > 40 ? [] : ids.map(id => { const c = CARDS.find(x => x.id === id), b = stR(id).box; return '<button class="jm-q" data-q="' + h(id) + '"><i class="jm-dot' + (b >= 5 ? " g" : prog[id] ? " y" : "") + '"></i><span>' + h(T("cards", id, "q", c.q)) + "</span></button>"; });
    const fps = n.fs.map(id => { const e = FP.find(x => x.id === id); return e ? line('data-fp="' + h(id) + '"', T("fp", id, "title", e.title)) : ""; }).filter(Boolean);
    const prs = n.ps.map(id => { const p = PRIN.find(x => x.id === id); return p ? line('data-pr="' + h(id) + '"', T("prin", id, "title", p.title)) : ""; }).filter(Boolean);
    const words = n.T.map(cl => line('data-terms="' + h(cl) + '"', L("Термины: ", "Glossary: ") + clName(cl), TERMS.filter(t => t.t === cl).length));
    const bas = n.B.map(g => { const full = BASICS.map(b => b.g).find(x => x.startsWith(g)); return line('data-bas="' + h(g) + '"', L("Для чайника: ", "Basics: ") + basG(full), BASICS.filter(b => b.g === full).length); });
    const zero = !isStage && n.steps.length ? [line('data-z="' + n.k + '"', L("Продолжить в «С нуля»", "Continue in “From zero”"), nStep(n.steps.length))] : [];
    sh.querySelector(".jd-sheet-body").innerHTML = (s.total ? '<div class="jm-sh-p"><span>' + h(L("освоено", "mastered") + " " + s.done + " " + L("из", "of") + " " + s.total) + "</span><b>" + s.pct + "%</b></div>" + bar(s.pct) : "")
      + block(L("Темы", "Topics"), rows) + block(L("Словарь и основы", "Glossary and basics"), words.concat(bas)) + block(L("Карточки", "Cards"), cards) + block(L("С нуля", "From zero"), zero) + block(L("На пальцах", "Explained"), fps) + block(L("Принцип", "Principles"), prs);
    sh.querySelector(".jm-sh-foot").innerHTML = hasWay(n) ? '<button class="btn primary" data-learn="' + n.k + '"><span>' + h(ids.length ? L("Учить", "Learn") + " · " + ids.length : L("Открыть в «С нуля»", "Open in “From zero”")) + "</span></button>" : "";
    sh.hidden = false; requestAnimationFrame(() => sh.classList.add("on"));
  }
  function closeSheet() { if (sh.hidden) return false; sh.classList.remove("on"); setTimeout(() => { sh.hidden = true; }, 260); return true; }
  ui.addBack(closeSheet);
  sh.addEventListener("click", e => {
    if (e.target.closest(".jd-sheet-x") || e.target.classList.contains("jd-sheet-bg")) return void closeSheet();
    const b = e.target.closest("button"); if (!b) return;
    const d = b.dataset;
    if (d.learn) learn(byKey.get(d.learn));
    else if (d.q) go(() => ui.startIds([d.q]));
    else if (d.fp) openFp(d.fp);
    else if (d.pr) openPrin(d.pr);
    else if (d.terms) openTerms(d.terms);
    else if (d.bas) openBasics(d.bas);
    else if (d.z) learn(byKey.get(d.z));
    else if (d.open) {
      const t = byKey.get(d.open); closeSheet();
      if (linked(t)) return act(t);
      if (!open.has(t.k)) toggle(t);
      const el = $q('[data-t="' + t.k + '"]'); if (el) el.scrollIntoView({ block: "center" });
    }
  });

  /* ---------- нажатия на экране ---------- */
  function onClick(e) {
    const b = e.target.closest("button,input"); if (!b) return;
    if (b.id === "jmOnly") { only = b.checked; keep(); drawView(); syncLine(); return; }
    if (b.id === "jmMe") return toMe();
    const d = b.dataset;
    if (d.learn) return learn(byKey.get(d.learn));
    if (d.sheet) return sheet(byKey.get(d.sheet));
    const n = byKey.get(d.t || d.n); if (!n) return;
    if (n.kids.length) toggle(n); else act(n);
  }
  ui.addScreen("roadmap", "learn", () => L("Роадмап", "Roadmap"), drawView, () => { syncLine(); if (scrollY0) { window.scrollTo(0, scrollY0); scrollY0 = 0; } });
  $q("#viewRoadmap").addEventListener("click", onClick);
  window.jdRoadmap = { tree, stat, summary() { memo = new Map(); const x = totals(); return { pct: x.pct, sub: L(MAIN + " этапа · освоено " + x.pct + "%", MAIN + " stages · " + x.pct + "% mastered") }; } };
})();

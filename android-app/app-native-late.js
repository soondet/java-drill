/* Поздний слой Android-приложения: экраны «Сегодня», «Учить», «Карточки», занятие под большой палец, итоги,
 * лестница ступеней в «Прогрессе», нижняя панель. Только в APK (html.native-app) — сайт этого файла не видит.
 *
 * Правила интервального повторения не меняются: оценку ставит та же grade() из index.html. Слой оборачивает
 * её глобальные функции (grade, next, render, reveal, rebuild, renderEmpty, setMode, buildProg):
 *   — кнопки действий вынесены в нижнюю панель (у карточки transform, внутри неё fixed не держится);
 *   — оценка блокируется до появления следующей карточки (раньше — на 170 мс, второй тап попадал в следующую);
 *   — «Отменить» возвращает карточку, расписание, очередь, норму новых, стрик и историю дня точно как было;
 *   — занятие сохраняется (jdNativeSess) и продолжается после закрытия приложения и «Назад»;
 *   — очередь: сначала повторы, потом новые (на сайте — вперемешку), внутри групп порядок прежний, случайный.
 */
(function () {
  "use strict";
  if (!document.documentElement.classList.contains("native-app")) return;
  if (typeof grade !== "function" || typeof rebuild !== "function" || typeof setMode !== "function") return;

  const EN = () => typeof LANG !== "undefined" && LANG === "en";
  const L = (ru, en) => EN() ? en : ru;
  const $q = s => document.querySelector(s);
  const h = s => esc(String(s == null ? "" : s));
  const NSKEY = "jdNativeSess", LOGKEY = "jdNativeLog";
  const byId = new Map(CARDS.map(c => [c.id, c]));
  const plural = (n, a, b, c) => { if (EN()) return n === 1 ? a : b; const m = n % 10, d = n % 100; return m === 1 && d !== 11 ? a : m >= 2 && m <= 4 && (d < 10 || d >= 20) ? b : c; };
  const inDays = n => n <= 0 ? L("сегодня", "today") : n === 1 ? L("завтра", "tomorrow") : L("через " + n + " " + plural(n, "день", "дня", "дней"), "in " + n + " days");

  /* ---------- состояние занятия ---------- */
  let NS = (() => { try { return JSON.parse(localStorage.getItem(NSKEY)) || null; } catch (e) { return null; } })();
  const nsSave = () => { try { if (NS) localStorage.setItem(NSKEY, JSON.stringify(NS)); else localStorage.removeItem(NSKEY); } catch (e) {} };
  const resumable = () => !!(NS && NS.global && NS.day === today() && NS.ids && NS.ids.length);
  const idsNow = () => (cur ? [cur.id] : []).concat(queue.map(c => c.id));
  const isGlobal = () => !drillList && !drillLeech && !drillWeak && !drillFav && !drillTricky && !drillTokens.size && !cramEl.checked;

  /* план на сегодня — так же, как его считает rebuild(), только без фильтра темы */
  function plan() {
    const due = CARDS.filter(c => !isHidden(c.id) && stR(c.id).due <= today());
    const rep = due.filter(c => prog[c.id]).length, fresh = due.length - rep;
    const byCap = Math.max(0, newPerDay() - newToday()), budget = dayBudget();
    const room = budget ? Math.min(byCap, Math.max(0, budget - rep)) : byCap;
    return { rep, fresh: Math.min(fresh, room) };
  }
  const doneToday = () => histGet()[today()] || 0;
  function logGet() { try { return JSON.parse(localStorage.getItem(LOGKEY)) || {}; } catch (e) { return {}; } }
  function logGrade(lvl) {
    const g = logGet(), t = today(); g[t] = g[t] || [0, 0, 0]; g[t][lvl]++;
    Object.keys(g).forEach(k => { if (+k < t - 60) delete g[k]; });
    try { localStorage.setItem(LOGKEY, JSON.stringify(g)); } catch (e) {}
  }
  /* слабые темы: из начатых — меньше всего освоено, при равенстве — больше провалов */
  function weakTopics(n) {
    const m = {};
    CARDS.forEach(c => { if (isHidden(c.id)) return; const p = prog[c.id], b = m[c.t] || (m[c.t] = { t: c.t, total: 0, started: 0, mast: 0, lapses: 0 });
      b.total++; if (p) { b.started++; if (p.box >= 5) b.mast++; b.lapses += p.lapses || 0; } });
    return Object.values(m).filter(b => b.started >= 3 && b.mast < b.total).map(b => Object.assign(b, { pct: Math.round(b.mast / b.total * 100) }))
      .sort((a, b) => a.pct - b.pct || b.lapses - a.lapses).slice(0, n);
  }
  function topics() {
    const m = {};
    CARDS.forEach(c => { if (isHidden(c.id)) return; const p = stR(c.id), b = m[c.t] || (m[c.t] = { t: c.t, total: 0, mast: 0, due: 0 });
      b.total++; if (p.box >= 5) b.mast++; if (prog[c.id] && p.due <= today()) b.due++; });
    return Object.values(m).sort((a, b) => b.total - a.total);
  }

  /* ---------- экраны слоя ---------- */
  const OWN = { today: "viewToday", learn: "viewLearn", cards: "viewCards" };
  Object.values(OWN).forEach(id => { const s = document.createElement("section"); s.id = id; s.className = "view jd-view"; s.hidden = true; $q("#viewDrill").before(s); });
  const sbar = document.createElement("div"); sbar.className = "jd-sbar";
  sbar.innerHTML = '<button class="jd-x" aria-label="' + h(L("Выйти — занятие сохранится", "Exit — progress is kept")) + '">✕</button><div class="jd-p" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i></i></div><span class="jd-pn"></span>';
  document.body.prepend(sbar);
  const actBar = document.createElement("div"); actBar.id = "jdAct"; document.body.appendChild(actBar);
  sbar.querySelector(".jd-x").onclick = () => setMode("today");

  function drawSbar() {
    if (!NS) { sbar.querySelector(".jd-pn").textContent = ""; return; }
    const left = idsNow().length, done = NS.done, pct = done + left ? Math.round(done / (done + left) * 100) : 100;
    sbar.querySelector(".jd-p i").style.width = pct + "%"; sbar.querySelector(".jd-p").setAttribute("aria-valuenow", pct);
    sbar.querySelector(".jd-pn").textContent = left ? done + " · " + L("ещё", "left") + " " + left : String(done);
  }
  const greet = () => { const hr = new Date().getHours(); return hr < 5 ? L("Доброй ночи", "Good night") : hr < 12 ? L("Доброе утро", "Good morning") : hr < 18 ? L("Добрый день", "Good afternoon") : L("Добрый вечер", "Good evening"); };
  const row = (attrs, ico, title, sub, right) => '<button class="jd-row" ' + attrs + '><span class="jd-ico">' + ico + '</span><span class="jd-rt"><b>' + h(title) + "</b>" + (sub ? "<small>" + h(sub) + "</small>" : "") + "</span>" + (right != null ? '<span class="jd-n">' + right + "</span>" : "") + '<span class="jd-chev">›</span></button>';
  const bar = (pct, cls) => '<span class="jd-bar ' + (cls || "") + '"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></span>';

  const draw = {
    today() {
      const p = plan(), done = doneToday(), res = resumable(), left = res ? NS.ids.length : p.rep + p.fresh;
      const total = done + left, pct = total ? Math.round(done / total * 100) : 100, mins = Math.max(1, Math.round(left * 20 / 60));
      const mast = CARDS.filter(c => stR(c.id).box >= 5).length, streak = streakCount(), weak = weakTopics(3);
      const leech = CARDS.filter(c => isLeech(c.id) && !isHidden(c.id)).length;
      $q("#viewToday").innerHTML =
        '<header class="jt-head"><span>' + h(greet()) + "</span><h1>" + h(L("Сегодня", "Today")) + "</h1></header>"
        + '<div class="jt-main"><div class="jt-nums">'
        + "<div><b>" + (res ? NS.ids.length : p.rep) + "</b><span>" + h(res ? L("осталось", "left") : L("к повтору", "to review")) + "</span></div>"
        + "<div><b>" + (res ? NS.done : p.fresh) + "</b><span>" + h(res ? L("пройдено", "done") : L("новых", "new")) + "</span></div>"
        + "<div><b>" + done + "</b><span>" + h(L("за день", "today")) + "</span></div></div>"
        + bar(pct, "jt-bar")
        + (left
          ? '<button class="btn primary jt-go" id="jtGo"><span>' + h(res ? L("Продолжить занятие", "Continue session") : L("Начать занятие", "Start session")) + "</span><small>" + h((res ? NS.done + " " + L("из", "of") + " " + (NS.done + NS.ids.length) + " · " : "") + "≈ " + mins + " " + L("мин", "min")) + "</small></button>"
          : '<p class="jt-done">' + h(L("На сегодня всё. Интервалы сделают своё — новые повторы придут сами.", "All done for today. New reviews will come on schedule.")) + "</p>"
            + '<button class="btn jt-go" data-go="weak"><span>' + h(L("Подтянуть слабые места", "Practice weak spots")) + "</span><small>" + h(L("до 40 карточек", "up to 40 cards")) + "</small></button>")
        + "</div>"
        + '<div class="jt-chips"><span class="jd-chip">🔥 ' + streak + " " + h(L(plural(streak, "день подряд", "дня подряд", "дней подряд"), plural(streak, "day streak", "days streak"))) + '</span><span class="jd-chip">✅ ' + h(L("освоено", "mastered")) + " " + mast + " / " + CARDS.length + "</span></div>"
        + (weak.length ? '<h3 class="jd-h3">' + h(L("Слабые темы", "Weak topics")) + '</h3><div class="jd-list">' + weak.map(w => row('data-topic="' + h(w.t) + '"', "🩹", clName(w.t), L("освоено", "mastered") + " " + w.pct + "%" + (w.lapses ? " · " + L("провалов", "lapses") + " " + w.lapses : ""), null)).join("") + "</div>" : "")
        + (leech ? '<div class="jd-list" style="margin-top:10px">' + row('data-go="leech"', "🩸", L("Проблемные карточки", "Problem cards"), L("провалены 4 раза и больше — добей их отдельно", "failed 4+ times — drill them separately"), leech) + "</div>" : "");
    },
    learn() {
      const S = [["zero", "🌱", L("С нуля", "From zero"), L("путь от первой программы до сеньора", "from first program to senior")],
        ["fp", "✋", L("На пальцах", "Explained"), L("209 разборов кадр за кадром", "209 frame-by-frame explainers")],
        ["prin", "⚙️", L("Принцип", "Principles"), L("100 живых схем", "100 live diagrams")],
        ["viz", "🧊", L("3D-мир", "3D world"), L("прогулка по концепциям", "walk through concepts")],
        ["basics", "🍼", L("Для чайника", "Basics"), L("основы простыми словами", "fundamentals in plain words")],
        ["sand", "🏗", L("Песочница", "Sandbox"), L("собери систему и дай нагрузку", "build a system, add load")],
        ["path", "🗺", L("Путь в сеньоры", "Path to senior"), L("уровни и что осталось", "levels and what's left")],
        ["beh", "🎤", L("Поведенческий", "Behavioral"), L("о себе, опыт, ситуации", "about you, experience, cases")],
        ["eng", "🇬🇧", L("Английский", "English"), L("грамматика и фразы собеса", "grammar and interview phrases")],
        ["money", "💰", L("Деньги", "Money"), L("экономика и рынки", "economics and markets")],
        ["mus", "🎵", L("Музыка", "Music"), L("бонус", "bonus")]];
      $q("#viewLearn").innerHTML = '<header class="jt-head"><span>' + h(L("Разделы", "Sections")) + "</span><h1>" + h(L("Учить", "Learn")) + '</h1></header><div class="jd-tiles">'
        + S.map(s => '<button class="jd-tile" data-mode="' + s[0] + '"><b>' + s[1] + "</b><span>" + h(s[2]) + "</span><small>" + h(s[3]) + "</small></button>").join("") + "</div>";
    },
    cards() {
      const fav = CARDS.filter(c => isFav(c.id) && !isHidden(c.id)).length, leech = CARDS.filter(c => isLeech(c.id) && !isHidden(c.id)).length;
      const trick = CARDS.filter(c => isTricky(c.id) && !isHidden(c.id)).length;
      $q("#viewCards").innerHTML = '<header class="jt-head"><span>' + CARDS.length + " " + h(L("карточек", "cards")) + "</span><h1>" + h(L("Карточки", "Cards")) + "</h1></header>"
        + '<button class="jd-search" data-go="search">🔍 <span>' + h(L("Поиск по всему", "Search everything")) + "</span></button>"
        + '<div class="jd-list">'
        + row('data-go="fav"', "⭐", L("Избранное", "Favorites"), L("отмеченные звёздочкой", "starred cards"), fav)
        + row('data-go="leech"', "🩸", L("Проблемные", "Problem cards"), L("провалены 4 раза и больше", "failed 4+ times"), leech)
        + row('data-go="weak"', "🩹", L("Слабые места", "Weak spots"), L("ниже пятой ступени, до 40", "below step 5, up to 40"), null)
        + row('data-go="trick"', "🦊", L("Коварные", "Tricky"), L("частые ловушки собеседований", "common interview traps"), trick)
        + row('data-go="terms"', "📖", L("Термины", "Glossary"), L("словарь с аналогиями", "glossary with analogies"), null)
        + row('data-go="map"', "🗺", L("Карта тем", "Topic map"), L("дерево всех тем", "tree of all topics"), null)
        + "</div>"
        + '<label class="jd-switch"><input type="checkbox" id="jdCram"' + (cramEl.checked ? " checked" : "") + "><span>" + h(L("Темы — подряд, без интервалов", "Topics in order, no intervals")) + "</span></label>"
        + '<h3 class="jd-h3">' + h(L("Темы", "Topics")) + '</h3><div class="jd-list">'
        + topics().map(t => '<button class="jd-row" data-topic="' + h(t.t) + '"><span class="jd-rt"><b>' + h(clName(t.t)) + "</b><small>" + h(L("освоено", "mastered") + " " + t.mast + " / " + t.total + (t.due ? " · " + L("к повтору", "due") + " " + t.due : "")) + "</small>" + bar(t.mast / t.total * 100) + '</span><span class="jd-chev">›</span></button>').join("") + "</div>";
    }
  };

  /* ---------- переходы ---------- */
  function resetFilter() { drillList = null; drillTokens.clear(); drillWeak = drillFav = drillTricky = drillLeech = false; feynEl.checked = false; rmExpand = false; }
  function startSession() { resetFilter(); cramEl.checked = false; if (typeof syncFiltBar === "function") syncFiltBar(); setMode("drill"); }
  function startList(kind, topic) {
    const cram = cramEl.checked; resetFilter();
    if (kind === "fav") drillFav = true; else if (kind === "leech") drillLeech = true; else if (kind === "weak") drillWeak = true; else if (kind === "trick") drillTricky = true;
    else if (kind === "topic") drillTokens.add("t:" + topic);
    cramEl.checked = kind === "topic" ? cram : false;
    if (typeof syncFiltBar === "function") syncFiltBar();
    setMode("drill");
  }
  document.addEventListener("click", e => {
    const t = e.target.closest("#jtGo,[data-go],[data-topic],[data-mode],#jdCram"); if (!t || !t.closest(".jd-view")) return;
    if (t.id === "jdCram") { cramEl.checked = t.checked; return; }
    if (t.id === "jtGo") return startSession();
    if (t.dataset.mode) return setMode(t.dataset.mode);
    if (t.dataset.topic) return startList("topic", t.dataset.topic);
    const g = t.dataset.go;
    if (g === "search") { const b = $q("#gsBtn"); if (b) b.click(); return; }
    if (g === "terms") return setMode("terms");
    if (g === "map") { const b = $q("#rmFab"); if (b) b.click(); return; }
    startList(g);
  });

  /* setMode: свои экраны + фокус занятия. Свой экран: исходная setMode с несуществующим режимом
     прячет все разделы и гасит игры, звук и микрофон — уборка та же, что при любом переходе. */
  const origSetMode = window.setMode;
  window.setMode = function (m) {
    closeMenu();
    if (m !== "drill") { if (undo && typeof hideToast === "function") hideToast(); undo = null; if (NS && !resumable() && NS.done) { NS = null; nsSave(); } }
    document.body.classList.toggle("jd-focus", m === "drill");
    Object.values(OWN).forEach(id => { $q("#" + id).hidden = true; });
    if (OWN[m]) {
      origSetMode("__own");
      mode = m;
      const v = $q("#" + OWN[m]); draw[m](); v.hidden = false; v.classList.remove("enter"); void v.offsetWidth; v.classList.add("enter");
    } else origSetMode(m);
    window.scrollTo(0, 0); syncBar();
  };

  /* ---------- занятие ---------- */
  let lock = false, undo = null;
  const origRebuild = window.rebuild;
  window.rebuild = function () {
    const glob = isGlobal();
    if (glob && resumable()) {                       /* продолжить сохранённое занятие */
      if (typeof syncDrillCats === "function") syncDrillCats(); if (typeof syncFiltBar === "function") syncFiltBar();
      queue = NS.ids.map(id => byId.get(id)).filter(c => c && !isHidden(c.id));
      updateKpis(); next(); return;
    }
    NS = null;                                        /* старые итоги не должны всплыть в пустой очереди */
    origRebuild();
    if (glob && cur) {                                /* сначала повторы, потом новые */
      const all = [cur].concat(queue), rep = all.filter(c => prog[c.id]), fresh = all.filter(c => !prog[c.id]);
      if (rep.length && fresh.length && !prog[cur.id]) { queue = rep.concat(fresh); next(); } else queue = rep.concat(fresh).filter(c => c !== cur);
    }
    NS = cur ? { day: today(), global: glob, ids: idsNow(), done: 0, counts: [0, 0, 0], fresh: 0, fails: {}, goods: {}, seen: {} } : null;
    nsSave(); drawSbar();
  };
  const origNext = window.next;
  window.next = function () { origNext(); if (NS) { NS.ids = idsNow(); nsSave(); } drawSbar(); };
  const origRender = window.render;
  window.render = function () {
    const old = actBar.querySelector("#act"); if (old) old.remove();
    origRender(); lock = false;
    const act = $q("#drillStage #act"); if (act) actBar.replaceChildren(act);
    const rb = $q("#btnReveal"); if (rb) rb.innerHTML = "<span>" + h(feynEl.checked ? L("Показать эталон", "Show reference") : L("Показать ответ", "Show answer")) + "</span>";
    const tags = $q("#drillStage .card-tags");
    if (tags && !tags.querySelector(".jd-more")) tags.insertAdjacentHTML("beforeend", '<button class="jd-more" aria-label="' + h(L("Действия с карточкой", "Card actions")) + '" aria-haspopup="menu">⋯</button>');
    window.scrollTo(0, 0);
  };
  const origReveal = window.reveal;
  window.reveal = function () {
    origReveal();
    if (!cur) return;
    const b = stR(cur.id).box, knew = BOX_DAYS[Math.min(b + 1, BOX_MAX)], almost = Math.max(1, Math.round(BOX_DAYS[b] / 2));
    const set = (sel, t, s) => { const e = $q(sel); if (e) { e.innerHTML = "<span>" + h(t) + "</span><small>" + h(s) + "</small>"; e.setAttribute("aria-label", t + ", " + s); } };
    set("#btnBad", L("Не знал", "Didn't know"), cramEl.checked ? L("шаг назад", "step back") : L("ещё раз сегодня", "again today"));
    set("#btnMid", L("Почти", "Almost"), inDays(almost));
    set("#btnGood", L("Знал", "Knew it"), inDays(knew));
  };
  const RAW = () => ["jdNewDay", SKEY, HKEY, LOGKEY];
  const origGrade = window.grade;
  window.grade = function (lvl) {
    if (lock || !cur || !revealed || GRADING) return;
    lock = true;
    actBar.querySelectorAll("button").forEach(b => { b.disabled = true; });
    const c = cur, wasNew = !prog[c.id];
    undo = { id: c.id, prev: prog[c.id] ? JSON.parse(JSON.stringify(prog[c.id])) : null, raw: RAW().map(k => [k, localStorage.getItem(k)]),
      qids: queue.map(x => x.id), card: c, ns: NS ? JSON.parse(JSON.stringify(NS)) : null };
    origGrade(lvl);
    logGrade(lvl);
    if (NS) {
      NS.done++; NS.counts[lvl]++; if (wasNew) NS.fresh++; NS.seen[c.id] = 1;
      if (lvl === 0) NS.fails[c.t] = (NS.fails[c.t] || 0) + 1; if (lvl === 2) NS.goods[c.t] = (NS.goods[c.t] || 0) + 1;
      NS.ids = queue.map(x => x.id); nsSave();
    }
    drawSbar();
    if (window.jdHaptic) jdHaptic(lvl === 2 ? "good" : lvl === 0 ? "bad" : "mid");
    toast([L("Не знал", "Didn't know"), L("Почти", "Almost"), L("Знал", "Knew it")][lvl] + " · " + (lvl === 0 && !cramEl.checked ? L("вернётся в конце", "comes back at the end") : L("сохранено", "saved")), L("Отменить", "Undo"), doUndo);
  };
  function doUndo() {
    const u = undo; if (!u) return; undo = null;
    const apply = () => {
      if (u.prev) prog[u.id] = u.prev; else delete prog[u.id];
      save();
      u.raw.forEach(([k, v]) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} });
      queue = u.qids.map(id => byId.get(id)).filter(Boolean); cur = u.card; revealed = false;
      NS = u.ns; nsSave();
      if (mode !== "drill") { setMode("drill"); return; }   /* через rebuild: продолжит с восстановленного NS */
      window.render(); window.reveal(); updateKpis(); drawSbar();
    };
    if (GRADING) setTimeout(apply, 220); else apply();
  }
  const origEmpty = window.renderEmpty;
  window.renderEmpty = function () {
    lock = false; actBar.replaceChildren();
    if (NS && NS.done) return results();
    origEmpty();
    const b = $q("#drillStage .empty .btn"); if (b) { const a = document.createElement("div"); a.className = "actions"; a.id = "act"; a.appendChild(b); actBar.appendChild(a); }
  };
  function results() {
    const s = NS, p = plan(), seen = Object.keys(s.seen).length;
    const hard = Object.entries(s.fails).sort((a, b) => b[1] - a[1])[0], strong = Object.entries(s.goods).filter(x => !hard || x[0] !== hard[0]).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => clName(x[0]));
    const tomorrow = CARDS.filter(c => prog[c.id] && !isHidden(c.id) && prog[c.id].due === today() + 1).length;
    const leech = Object.keys(s.seen).filter(id => isLeech(id)).length, left = p.rep + p.fresh;
    $q("#drillStage").innerHTML = '<div class="jr">'
      + "<h2>" + h(s.counts[0] ? L("Занятие закончено", "Session complete") : L("Чисто — ни одного «не знал»", "Clean — no misses")) + "</h2>"
      + '<p class="jr-lead">' + h(L("Карточек", "Cards") + ": " + seen + " · " + L("ответов", "answers") + ": " + s.done + (s.fresh ? " · " + L("новых", "new") + ": " + s.fresh : "")) + "</p>"
      + '<div class="jr-grid"><div class="g"><b>' + s.counts[2] + "</b><span>" + h(L("знал", "knew")) + '</span></div><div class="m"><b>' + s.counts[1] + "</b><span>" + h(L("почти", "almost")) + '</span></div><div class="b"><b>' + s.counts[0] + "</b><span>" + h(L("не знал", "missed")) + "</span></div></div>"
      + (hard ? '<p class="jr-p">' + h(L("Самая трудная тема — ", "Hardest topic — ")) + "<b>" + h(clName(hard[0])) + "</b>" + h(L(". Её карточки уже в расписании — повтори завтра.", ". Its cards are scheduled — review tomorrow.")) + "</p>" : "")
      + (strong.length ? '<p class="jr-p">' + h(L("Увереннее всего: ", "Strongest: ")) + "<b>" + h(strong.join(", ")) + "</b></p>" : "")
      + (leech ? '<p class="jr-p">🩸 ' + h(L("Проблемных среди них: ", "Problem cards among them: ") + leech) + "</p>" : "")
      + '<p class="jr-p jr-next">' + h(left ? L("Ещё к повтору сегодня: ", "Still due today: ") + left : L("Завтра к повтору: ", "Due tomorrow: ") + tomorrow) + "</p></div>";
    actBar.innerHTML = '<div class="actions" id="act">' + (left ? '<button class="btn" id="jrHome"><span>' + h(L("На главную", "Home")) + '</span></button><button class="btn primary" id="jrMore"><span>' + h(L("Продолжить", "Continue")) + "</span><small>" + left + "</small></button>" : '<button class="btn primary" id="jrHome"><span>' + h(L("На главную", "Home")) + "</span></button>") + "</div>";
    $q("#jrHome").onclick = () => { NS = null; nsSave(); setMode("today"); };
    const more = $q("#jrMore"); if (more) more.onclick = () => { NS = null; nsSave(); startSession(); };
    drawSbar();
  }

  /* ---------- меню карточки «⋯»: избранное и «больше не показывать» уехали сюда с мелких иконок ---------- */
  function closeMenu() { const m = $q(".jd-pop"); if (m) { m.remove(); return true; } return false; }
  document.addEventListener("click", e => {
    const more = e.target.closest(".jd-more");
    if (more) {
      if (closeMenu()) return;
      const fav = isFav(cur && cur.id), pop = document.createElement("div"); pop.className = "jd-pop"; pop.setAttribute("role", "menu");
      pop.innerHTML = '<button role="menuitem" data-a="fav">' + (fav ? "★ " + h(L("Убрать из избранного", "Remove from favorites")) : "☆ " + h(L("В избранное", "Add to favorites"))) + '</button><button role="menuitem" data-a="hide">🚫 ' + h(L("Больше не показывать", "Don't show again")) + "</button>";
      more.after(pop); return;
    }
    const a = e.target.closest(".jd-pop [data-a]");
    if (a) { const sel = a.dataset.a === "fav" ? "#favBtn" : "#hideBtn", b = $q(sel); closeMenu(); if (b) b.click(); return; }
    if (!e.target.closest(".jd-pop")) closeMenu();
  });

  /* ---------- «Прогресс»: лестница ступеней сверху, тап по ступени — её карточки ---------- */
  const origProg = window.buildProg;
  window.buildProg = function () {
    origProg();
    const stg = $q("#progStage"); if (!stg) return;
    const cnt = [0, 0, 0, 0, 0, 0, 0, 0]; let fresh = 0;
    CARDS.forEach(c => { if (isHidden(c.id)) return; const p = prog[c.id]; if (p) cnt[Math.min(BOX_MAX, Math.max(1, p.box))]++; else fresh++; });
    const max = Math.max(1, ...cnt), lg = logGet()[today()] || [0, 0, 0], tot = lg[0] + lg[1] + lg[2];
    const html = '<div class="jl"><h3 class="jd-h3">' + h(L("Лестница повторения", "Review ladder")) + "</h3>"
      + (tot ? '<p class="jl-acc">' + h(L("Сегодня", "Today") + ": " + L("знал", "knew") + " " + lg[2] + " · " + L("почти", "almost") + " " + lg[1] + " · " + L("не знал", "missed") + " " + lg[0] + " — " + L("точность", "accuracy") + " " + Math.round(lg[2] / tot * 100) + "%") + "</p>" : "")
      + [1, 2, 3, 4, 5, 6, 7].map(b => '<button class="jl-row' + (b >= 5 ? " m" : "") + '" data-box="' + b + '"><span class="jl-b">' + b + '</span><span class="jl-d">' + h(inDays(BOX_DAYS[b])) + "</span>" + bar(cnt[b] / max * 100) + '<span class="jl-n">' + cnt[b] + "</span></button>").join("")
      + '<p class="jl-note">' + h(L("Ступени 5–7 — освоено. Не начатых: ", "Steps 5–7 are mastered. Not started: ") + fresh) + '</p><div class="jl-list" hidden></div></div>';
    (stg.firstElementChild || stg).insertAdjacentHTML("afterbegin", html);   /* внутрь колонки: #progStage — флекс-строка */
  };
  document.addEventListener("click", e => {
    const r = e.target.closest(".jl-row"); if (!r) return;
    const b = +r.dataset.box, list = $q(".jl-list"), ids = CARDS.filter(c => !isHidden(c.id) && prog[c.id] && Math.min(BOX_MAX, prog[c.id].box) === b).map(c => c.id);
    if (!list.hidden && list.dataset.box === String(b)) { list.hidden = true; return; }
    list.dataset.box = b; list.hidden = false;
    list.innerHTML = ids.length ? '<button class="btn primary jl-go"><span>' + h(L("Повторить эти", "Review these") + " · " + ids.length) + "</span></button>"
      + ids.slice(0, 40).map(id => { const c = byId.get(id); return '<div class="jl-q"><small>' + h(clName(c.t)) + "</small>" + h(T("cards", c.id, "q", c.q)) + "</div>"; }).join("") + (ids.length > 40 ? '<p class="jl-note">… ' + (ids.length - 40) + "</p>" : "")
      : '<p class="jl-note">' + h(L("На этой ступени пока пусто.", "Nothing on this step yet.")) + "</p>";
    list.querySelector(".jl-go") && (list.querySelector(".jl-go").onclick = () => { resetFilter(); cramEl.checked = false; drillList = ids; setMode("drill"); });
  });

  /* ---------- нижняя панель: пять разделов под большой палец ---------- */
  const BAR = () => [["today", "🏠", L("Сегодня", "Today")], ["learn", "🧭", L("Учить", "Learn")], ["cards", "🗂", L("Карточки", "Cards")], ["game", "🎮", L("Игра", "Games")], ["prog", "📊", L("Прогресс", "Progress")]];
  const SECTION = { today: "today", learn: "learn", cards: "cards", terms: "cards", game: "game", prog: "prog" };
  const bb = document.createElement("nav"); bb.className = "jd-bb"; bb.setAttribute("aria-label", "Разделы");
  function buildBar() { bb.innerHTML = BAR().map(b => '<button data-m="' + b[0] + '"><b aria-hidden="true">' + b[1] + "</b><span>" + h(b[2]) + "</span></button>").join(""); syncBar(); }
  function syncBar() { const s = SECTION[mode] || (mode === "drill" ? "today" : "learn"); bb.querySelectorAll("button").forEach(b => { const on = b.dataset.m === s; b.classList.toggle("on", on); b.setAttribute("aria-current", on ? "page" : "false"); }); }
  bb.onclick = e => { const b = e.target.closest("button[data-m]"); if (b) setMode(b.dataset.m); };
  document.body.appendChild(bb); buildBar();
  /* язык поменялся — подписи и экраны тоже */
  document.addEventListener("click", e => { if (e.target.closest("#langTog")) setTimeout(() => { buildBar(); if (OWN[mode]) draw[mode](); }, 700); });

  /* «Назад»: меню карточки — первым (вызывает app-native.js) */
  window.jdNative = { back: () => closeMenu(), session: () => NS, plan };

  /* старт: экран «Сегодня» вместо первой карточки; заставку убираем, как только он нарисован
     (раньше она гасла по таймеру через 0.7 с, и до готовности страницы был пустой тёмный экран) */
  setMode("today");
  requestAnimationFrame(() => { try { const SS = window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.SplashScreen; if (SS && SS.hide) SS.hide({ fadeOutDuration: 150 }); } catch (e) {} });
})();

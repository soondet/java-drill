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
  /* Иконки слоя — один линейный набор (24×24, обводка 1.8, currentColor) вместо эмодзи разного стиля */
  const IC = {
    home: '<path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z"/>',
    learn: '<path d="M2.5 5h6a3.5 3.5 0 0 1 3.5 3.5V20a2.5 2.5 0 0 0-2.5-2.5h-7z"/><path d="M21.5 5h-6A3.5 3.5 0 0 0 12 8.5V20a2.5 2.5 0 0 1 2.5-2.5h7z"/>',
    cards: '<rect x="3" y="7" width="13" height="14" rx="2.5"/><path d="M7.5 3.5h11a2 2 0 0 1 2 2V17"/>',
    game: '<rect x="2.5" y="7" width="19" height="11.5" rx="5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle cx="15.5" cy="11.5" r=".9" fill="currentColor"/><circle cx="17.8" cy="14" r=".9" fill="currentColor"/>',
    prog: '<path d="M5 20v-8M12 20V5M19 20v-5"/><path d="M3 20.5h18"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.6 1.3 1.4 1.4 2.2h4.4c.1-.8.6-1.6 1.4-2.2A6 6 0 0 0 12 3z"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    starOn: '<path fill="currentColor" d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    alert: '<path d="M12 3.5 2.5 20h19z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.3" r=".6" fill="currentColor"/>',
    down: '<path d="m3 7 6.5 6.5 4-4L21 17"/><path d="M21 11.5V17h-5.5"/>',
    zap: '<path d="M13 2.5 4.5 13.5h6.5l-1 8 8.5-11h-6.5z"/>',
    book: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
    map: '<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>',
    flame: '<path d="M12 21.5c3.9 0 6.5-2.6 6.5-6.1 0-3.2-2.4-5.4-3.6-8.4-.4 1.9-1.4 3-2.4 3.6-.2-2.6-1.6-4.9-3.6-6.1.3 2.6-.7 4.4-1.9 6.1-1 1.5-1.5 3-1.5 4.8 0 3.5 2.6 6.1 6.5 6.1z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="m8 12.4 2.8 2.8L16.2 9.6"/>',
    done: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    dots: '<circle cx="5.5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.6A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.9 3.7M6.3 6.4A16.5 16.5 0 0 0 2.5 12S6 18.5 12 18.5c1.8 0 3.3-.5 4.6-1.2"/><path d="M9.9 9.9a2.8 2.8 0 0 0 4.2 4.2"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>',
    spark: '<path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7z"/><path d="M19 16.5v4M17 18.5h4"/>',
    cube: '<path d="M12 2.8 20.5 7.5v9L12 21.2 3.5 16.5v-9z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9.2"/>',
    pencil: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    sprout: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 14.5c0-3-2.5-5.5-7-5.5 0 3.5 2.5 5.5 7 5.5z"/>',
    hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5M14 10.5V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M17 9.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.6-2.2L4.6 15.6a1.5 1.5 0 0 1 2.3-1.9L8 15"/>',
    schema: '<rect x="3" y="3" width="7.5" height="6" rx="1.5"/><rect x="13.5" y="15" width="7.5" height="6" rx="1.5"/><path d="M6.8 9v3.5a2 2 0 0 0 2 2h8.4V15"/>',
    blocks: '<rect x="3.5" y="13" width="7" height="7" rx="1.5"/><rect x="13.5" y="13" width="7" height="7" rx="1.5"/><rect x="8.5" y="4" width="7" height="7" rx="1.5"/>',
    server: '<rect x="3.5" y="4" width="17" height="6.5" rx="1.8"/><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.8"/><path d="M7 7.25h.01M7 16.75h.01M11 7.25h2M11 16.75h2"/>',
    route: '<circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="5" r="2.2"/><path d="M8.2 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.8"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
    coins: '<circle cx="9" cy="9" r="5.5"/><path d="M14.4 7.7a5.5 5.5 0 1 1-4.9 7.8"/><path d="M9 7v4"/>',
    note: '<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    ghost: '<path d="M5 20V11a7 7 0 0 1 14 0v9l-2.4-1.8L14.3 20 12 18.2 9.7 20l-2.3-1.8z"/><circle cx="9.5" cy="11" r=".9" fill="currentColor"/><circle cx="14.5" cy="11" r=".9" fill="currentColor"/>',
    joy: '<circle cx="12" cy="6" r="2.8"/><path d="M12 8.8V15"/><rect x="4" y="15" width="16" height="5.5" rx="2"/>',
    columns: '<path d="M3.5 20.5h17M4.5 9h15M12 3.5 4 8h16z"/><path d="M7 10v8M10.3 10v8M13.7 10v8M17 10v8"/>',
    pulse: '<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>',
    printer: '<path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14.5h10v6H7z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M16.5 14.1c2.6.3 4.5 2.6 4.5 5.4"/>',
    cross: '<path d="M5 5l14 14M19 5 5 19"/><path d="M5 9V5h4M19 9V5h-4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    tray: '<path d="M12 3v11M8 10l4 4 4-4"/><path d="M4 14v4.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V14"/>',
    tf: '<path d="m3.5 12.5 3 3 5.5-6"/><path d="m14 9 6 6M20 9l-6 6"/>',
    order: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M4.5 5 6 4v5M4 14.5a1.6 1.6 0 1 1 2.6 1.2L4 18h3"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m20.5 16-5-5L6 19.5"/>',
    keys: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M7.5 14h9"/>',
    type: '<path d="M5 20 11 4h2l6 16M7.6 14h8.8"/>',
    bug: '<rect x="7.5" y="7" width="9" height="13" rx="4.5"/><path d="M12 11v9M9 4.5l1.5 2.5M15 4.5 13.5 7M3.5 13h4M16.5 13h4M4.5 8.5l3 2M19.5 8.5l-3 2M4.5 18.5l3-2M19.5 18.5l-3-2"/>',
    trophy: '<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v3.5M8 20.5h8M9.5 17.5h5"/>',
    download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>',
    upload: '<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4.5 19.5h15"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    tree: '<circle cx="5.5" cy="5" r="1.8"/><path d="M5.5 6.8V16a2.5 2.5 0 0 0 2.5 2.5h3M5.5 10.5H11"/><rect x="12" y="8" width="8.5" height="5" rx="1.6"/><rect x="12" y="16" width="8.5" height="5" rx="1.6"/>',
    choice: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/><path d="m15.5 17 1.5 1.5 3-3.5"/>',
    self: '<path d="M8 12.5 11 15.5 16.5 9"/><circle cx="12" cy="12" r="9"/>',
    heal: '<path d="M10.5 13.5 13.5 10.5"/><rect x="2.8" y="8.3" width="18.4" height="7.4" rx="3.7" transform="rotate(-45 12 12)"/>',
    chev: '<path d="m9 5.5 6.5 6.5L9 18.5"/>',
    chevD: '<path d="m5.5 9 6.5 6.5L18.5 9"/>',
    play: '<path d="M8 5.2v13.6L19 12z"/>',
    code: '<path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5M13.5 5l-3 14"/>'
  };
  /* знак продукта — ступени лестницы повторения, в градиенте сайта */
  /* эмодзи в начале текста — снимаем, когда на его место встаёт иконка набора */
  const EMO = /^[\s‍️⃣\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{1F170}-\u{1F189}]+/u;
  function deEmoji(el) { if (!el) return; const t = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim()); if (t) t.textContent = t.textContent.replace(EMO, ""); }
  function withIcon(el, name, cls) { if (!el || el.dataset.jdi) return; el.dataset.jdi = 1; deEmoji(el); el.insertAdjacentHTML("afterbegin", ic(name, cls)); }
  /* Иконка — маска, а не встроенный SVG: WebView 124 на Android рисует встроенный SVG (и <img> с SVG) в сетке плиток
     с ошибками растра — куски плиток повторялись не на своих местах; маска с currentColor идёт другим путём и чиста.
     Маски — одна таблица стилей: .i-имя { mask-image: url(data:…) }, цвет — color элемента. */
  const maskUrl = (body, fill) => 'url("data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + (fill || "none") + '" stroke="' + (fill ? "none" : "#000") + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + body.replace(/currentColor/g, "#000") + "</svg>") + '")';
  const icCss = document.createElement("style"); icCss.id = "jdIcons";
  icCss.textContent = Object.keys(IC).map(n => ".i-" + n + "{-webkit-mask-image:" + maskUrl(IC[n]) + ";mask-image:" + maskUrl(IC[n]) + "}").join("\n")
    + "\n.jd-mark{-webkit-mask-image:" + maskUrl('<rect x="1.5" y="15" width="4.4" height="7.5" rx="1.6"/><rect x="7.1" y="10.5" width="4.4" height="12" rx="1.6"/><rect x="12.7" y="6" width="4.4" height="16.5" rx="1.6"/><rect x="18.3" y="1.5" width="4.4" height="21" rx="1.6"/>', "#000")
    + ";mask-image:" + maskUrl('<rect x="1.5" y="15" width="4.4" height="7.5" rx="1.6"/><rect x="7.1" y="10.5" width="4.4" height="12" rx="1.6"/><rect x="12.7" y="6" width="4.4" height="16.5" rx="1.6"/><rect x="18.3" y="1.5" width="4.4" height="21" rx="1.6"/>', "#000") + "}";
  document.head.appendChild(icCss);
  /* знак продукта — ступени лестницы повторения, в градиенте сайта */
  const MARK = '<i class="jd-mark" aria-hidden="true"></i>';
  const ic = (n, cls) => '<i class="jd-svg i-' + n + (cls ? " " + cls : "") + '" aria-hidden="true"></i>';
  const inDays = n => n <= 0 ? L("сегодня", "today") : n === 1 ? L("завтра", "tomorrow") : L("через " + n + " " + plural(n, "день", "дня", "дней"), "in " + n + " days");

  /* ---------- режим ответа: сам оцениваю или 4 варианта (готовые варианты сайта из QUIZ, как в «Блице») ---------- */
  const AMKEY = "jdAnswerMode";
  let answerMode = (() => { try { return localStorage.getItem(AMKEY) === "quiz" ? "quiz" : "self"; } catch (e) { return "self"; } })();
  const setAnswerMode = m => { answerMode = m; try { localStorage.setItem(AMKEY, m); } catch (e) {} };
  function quizFor(c) {
    const q = c && window.QUIZ && QUIZ[c.id];
    if (!q || !q.correct || !Array.isArray(q.wrong) || q.wrong.length < 3) return null;
    const tt = typeof T === "function" ? T : (k, id, f, ru) => ru, ta = typeof Ta === "function" ? Ta : (k, id, f, ru) => ru;
    return { ok: tt("cards", c.id, "quizCorrect", q.correct), wrong: ta("cards", c.id, "quizWrong", q.wrong).slice(0, 3) };
  }
  const quizActive = () => answerMode === "quiz" && !feynEl.checked && !!quizFor(cur);
  let QS = null, quizKeep = false;
  let closeSheet = () => false;      /* шторка «Маршрут» в «С нуля» — ставится ниже, когда раздел есть */   /* QS — варианты текущей карточки и выбор: res = "ok" | "no" | "skip" */
  const segAnswer = () => '<div class="jd-seg" role="radiogroup" aria-label="' + h(L("Как отвечать", "Answer mode")) + '">'
    + [["self", "self", L("Сам оцениваю", "Self-grade")], ["quiz", "choice", L("4 варианта", "4 options")]].map(([m, i, t]) =>
      '<button role="radio" data-am="' + m + '" aria-checked="' + (answerMode === m) + '">' + ic(i) + "<span>" + h(t) + "</span></button>").join("") + "</div>";

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
  sbar.innerHTML = '<button class="jd-x" aria-label="' + h(L("Выйти — занятие сохранится", "Exit — progress is kept")) + '">' + ic("x") + '</button><div class="jd-p" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i></i></div><span class="jd-pn"></span>';
  document.body.prepend(sbar);
  /* высота шапки и полосы занятия — в переменные для отступа body (обе fixed, см. app-native.css) */
  const topbarEl = $q(".topbar"), rootStyle = document.documentElement.style;
  const measureBars = () => { if (topbarEl && topbarEl.offsetHeight) rootStyle.setProperty("--jd-top", topbarEl.offsetHeight + "px"); if (sbar.offsetHeight) rootStyle.setProperty("--jd-stop", sbar.offsetHeight + "px"); };
  if (window.ResizeObserver) { const ro = new ResizeObserver(measureBars); if (topbarEl) ro.observe(topbarEl); ro.observe(sbar); }
  const actBar = document.createElement("div"); actBar.id = "jdAct"; document.body.appendChild(actBar);
  sbar.querySelector(".jd-x").onclick = () => setMode(ret || "today");

  function drawSbar() {
    if (!NS) { sbar.querySelector(".jd-pn").textContent = ""; return; }
    const left = idsNow().length, done = NS.done, pct = done + left ? Math.round(done / (done + left) * 100) : 100;
    sbar.querySelector(".jd-p i").style.width = pct + "%"; sbar.querySelector(".jd-p").setAttribute("aria-valuenow", pct);
    sbar.querySelector(".jd-pn").textContent = left ? (done + 1) + " / " + (done + left) : L("Готово", "Done");
  }
  const greet = () => { const hr = new Date().getHours(); return hr < 5 ? L("Доброй ночи", "Good night") : hr < 12 ? L("Доброе утро", "Good morning") : hr < 18 ? L("Добрый день", "Good afternoon") : L("Добрый вечер", "Good evening"); };
  const row = (attrs, ico, title, sub, right, tone) => '<button class="jd-row" ' + attrs + '><span class="jd-ico ' + (tone || "") + '">' + (IC[ico] ? ic(ico) : ico) + '</span><span class="jd-rt"><b>' + h(title) + "</b>" + (sub ? "<small>" + h(sub) + "</small>" : "") + "</span>" + (right != null ? '<span class="jd-n">' + right + "</span>" : "") + '<span class="jd-chev">›</span></button>';
  const bar = (pct, cls) => '<span class="jd-bar ' + (cls || "") + '"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></span>';

  const draw = {
    today() {
      const p = plan(), done = doneToday(), res = resumable(), left = res ? NS.ids.length : p.rep + p.fresh;
      const total = done + left, frac = total ? done / total : 1, mins = Math.max(1, Math.round(left * 20 / 60));
      const mast = CARDS.filter(c => stR(c.id).box >= 5).length, streak = streakCount(), weak = weakTopics(3);
      const leech = CARDS.filter(c => isLeech(c.id) && !isHidden(c.id)).length, hist = histGet(), t = today();
      const week = [6, 5, 4, 3, 2, 1, 0].map(d => '<i class="' + (hist[t - d] ? "on" : "") + (d === 0 ? " t" : "") + '"></i>').join("");
      const num = (cls, n, label) => '<div><i class="' + cls + '"></i><b>' + n + "</b><span>" + h(label) + "</span></div>";
      $q("#viewToday").innerHTML =
        '<header class="jt-head"><span>' + h(greet()) + "</span><h1>" + h(L("Сегодня", "Today")) + "</h1></header>"
        + '<div class="jt-hero"><div class="jt-top"><div class="jt-ring" role="img" aria-label="' + h(L("сделано", "done") + " " + done + " " + L("из", "of") + " " + total) + '">'
        + '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="jtRg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6ea8fe"/><stop offset=".5" stop-color="#a98bff"/><stop offset="1" stop-color="#54e6c8"/></linearGradient></defs>'
        + '<circle class="tr" cx="60" cy="60" r="52"/>' + (frac > 0 ? '<circle class="pr" cx="60" cy="60" r="52" stroke="url(#jtRg)" style="--p:' + frac.toFixed(3) + '"/>' : "") + "</svg>"
        + '<div class="jt-ctr">' + (left ? "<b>" + left + "</b><span>" + h(L("осталось", "left")) + "</span>" : ic("done") + "<span>" + h(L("готово", "done")) + "</span>") + "</div></div>"
        + '<div class="jt-nums">'
        + num("r", res ? NS.ids.filter(id => prog[id]).length : p.rep, L("к повтору", "to review"))   /* в продолженном занятии — разбивка остатка очереди */
        + num("n", res ? NS.ids.filter(id => !prog[id]).length : p.fresh, L("новых", "new"))
        + num("d", done, L("сделано", "done")) + "</div></div>"
        + (left ? segAnswer() : "")
        + (left
          ? '<button class="btn primary jt-go" id="jtGo"><span>' + h(res ? L("Продолжить занятие", "Continue session") : L("Начать занятие", "Start session")) + "</span><small>" + h((res ? NS.done + " " + L("из", "of") + " " + (NS.done + NS.ids.length) + " · " : "") + "≈ " + mins + " " + L("мин", "min")) + "</small></button>"
          : '<p class="jt-done">' + h(L("На сегодня всё. Интервалы сделают своё — новые повторы придут сами.", "All done for today. New reviews will come on schedule.")) + "</p>"
            + '<button class="btn jt-go" data-go="weak"><span>' + h(L("Подтянуть слабые места", "Practice weak spots")) + "</span><small>" + h(L("до 40 карточек", "up to 40 cards")) + "</small></button>")
        + "</div>"
        + '<div class="jt-stats"><div class="jt-stat"><div class="jt-sv">' + ic("flame", "fl") + "<b>" + streak + "</b></div><span>" + h(L(plural(streak, "день подряд", "дня подряд", "дней подряд"), plural(streak, "day streak", "days streak"))) + '</span><div class="jt-week" aria-hidden="true">' + week + "</div></div>"
        + '<div class="jt-stat"><div class="jt-sv">' + ic("check", "ok") + "<b>" + mast + "</b><small>/ " + CARDS.length + "</small></div><span>" + h(L("освоено — ступени 5–\u20607", "mastered — steps 5–\u20607")) + "</span>" + bar(mast / CARDS.length * 100) + "</div></div>"
        + (weak.length ? '<h3 class="jd-h3">' + h(L("Слабые темы", "Weak topics")) + '</h3><div class="jd-list">' + weak.map(w => '<button class="jd-row jd-topic" data-topic="' + h(w.t) + '"><span class="jd-pct">' + w.pct + '<small>%</small></span><span class="jd-rt"><b>' + h(clName(w.t)) + "</b><small>" + h(w.lapses ? L("провалов", "lapses") + ": " + w.lapses : L("освоено мало", "little mastered")) + "</small>" + bar(w.pct) + '</span><span class="jd-chev">›</span></button>').join("") + "</div>" : "")
        + (leech ? '<div class="jd-list" style="margin-top:8px">' + row('data-go="leech"', "alert", L("Проблемные карточки", "Problem cards"), L("провалены 4 раза и больше", "failed 4+ times"), leech, "t-bad") + "</div>" : "");
    },
    learn() {
      const G = [[L("Основа", "Core"), "t-acc", [["zero", "sprout", L("С нуля", "From zero"), L("путь от первой программы до сеньора", "from first program to senior")],
          ["basics", "blocks", L("Для чайника", "Basics"), L("основы простыми словами", "fundamentals in plain words")],
          ["fp", "hand", L("На пальцах", "Explained"), L("209 разборов кадр за кадром", "209 frame-by-frame explainers")],
          ["prin", "schema", L("Принцип", "Principles"), L("100 живых схем", "100 live diagrams")]]],
        [L("Практика", "Practice"), "t-vio", [["viz", "cube", L("3D-мир", "3D world"), L("прогулка по концепциям", "walk through concepts")],
          ["sand", "server", L("Песочница", "Sandbox"), L("собери систему и дай нагрузку", "build a system, add load")]]],
        [L("Карьера", "Career"), "t-cy", [["path", "route", L("Путь в сеньоры", "Path to senior"), L("уровни и что осталось", "levels and what's left")],
          ["beh", "mic", L("Поведенческий", "Behavioral"), L("о себе, опыт, ситуации", "about you, experience, cases")],
          ["eng", "globe", L("Английский", "English"), L("грамматика и фразы собеса", "grammar and interview phrases")],
          ["asm", "target", L("Ассессмент", "Assessment"), L("темы ИПР и вопросы по ним", "plan topics and their questions")]]],
        [L("Бонус", "Bonus"), "t-org", [["money", "coins", L("Деньги", "Money"), L("экономика и рынки", "economics and markets")],
          ["mus", "note", L("Музыка", "Music"), L("пианино и гитара, шпоры со звуком", "piano and guitar, sounding cheat sheets")],
          ["bro", "code", L("Python и C++", "Python & C++"), L("курс с нуля для брата", "from-zero course for my brother")]]]];
      const rm = window.jdRoadmap && jdRoadmap.summary();
      $q("#viewLearn").innerHTML = '<header class="jt-head"><span>' + h(L("Разделы", "Sections")) + "</span><h1>" + h(L("Учить", "Learn")) + "</h1></header>"
        + (rm ? '<button class="jd-row jm-entry" data-go="roadmap"><span class="jd-ico t-cy">' + ic("map") + '</span><span class="jd-rt"><b>' + h(L("Роадмап", "Roadmap")) + "</b><small>" + h(rm.sub) + "</small>" + bar(rm.pct) + '</span><span class="jd-chev">›</span></button>' : "")
        + G.map(g => '<h3 class="jd-h3">' + h(g[0]) + '</h3><div class="jd-tiles">' + g[2].map(s => '<button class="jd-tile" data-mode="' + s[0] + '"><span class="jd-ico ' + g[1] + '" aria-hidden="true">' + ic(s[1]) + "</span><span>" + h(s[2]) + "</span><small>" + h(s[3]) + "</small></button>").join("") + "</div>").join("");
    },
    cards() {
      const fav = CARDS.filter(c => isFav(c.id) && !isHidden(c.id)).length, leech = CARDS.filter(c => isLeech(c.id) && !isHidden(c.id)).length;
      const trick = CARDS.filter(c => isTricky(c.id) && !isHidden(c.id)).length;
      $q("#viewCards").innerHTML = '<header class="jt-head"><span>' + CARDS.length + " " + h(L("карточек", "cards")) + "</span><h1>" + h(L("Карточки", "Cards")) + "</h1></header>"
        + '<button class="jd-search" data-go="search">' + ic("search") + '<span>' + h(L("Поиск по всему", "Search everything")) + "</span></button>"
        + '<div class="jd-list">'
        + row('data-go="fav"', "star", L("Избранное", "Favorites"), L("отмеченные звёздочкой", "starred cards"), fav, "t-warn")
        + row('data-go="leech"', "alert", L("Проблемные", "Problem cards"), L("провалены 4 раза и больше", "failed 4+ times"), leech, "t-bad")
        + row('data-go="weak"', "down", L("Слабые места", "Weak spots"), L("ниже пятой ступени, до 40", "below step 5, up to 40"), null, "t-org")
        + row('data-go="trick"', "zap", L("Коварные", "Tricky"), L("частые ловушки собеседований", "common interview traps"), trick, "t-vio")
        + row('data-go="terms"', "book", L("Термины", "Glossary"), L("словарь с аналогиями", "glossary with analogies"), null, "t-acc")
        + row('data-go="roadmap"', "map", L("Роадмап", "Roadmap"), L("22 этапа, все темы деревом", "22 stages, all topics as a tree"), null, "t-cy")
        + "</div>"
        + '<label class="jd-switch"><input type="checkbox" role="switch" id="jdQuiz"' + (answerMode === "quiz" ? " checked" : "") + "><span>" + h(L("Отвечать вариантами — 4 на выбор", "Answer with 4 options")) + "</span></label>"
        + '<label class="jd-switch" style="margin-top:0"><input type="checkbox" role="switch" id="jdCram"' + (cramEl.checked ? " checked" : "") + "><span>" + h(L("Темы — подряд, без интервалов", "Topics in order, no intervals")) + "</span></label>"
        + '<h3 class="jd-h3">' + h(L("Темы", "Topics")) + '</h3><div class="jd-list">'
        + topics().map(t => '<button class="jd-row" data-topic="' + h(t.t) + '"><span class="jd-rt"><b>' + h(clName(t.t)) + "</b><small>" + h(L("освоено", "mastered") + " " + t.mast + " / " + t.total + (t.due ? " · " + L("к повтору", "due") + " " + t.due : "")) + "</small>" + bar(t.mast / t.total * 100) + '</span><span class="jd-chev">›</span></button>').join("") + "</div>";
    }
  };

  /* ---------- переходы ---------- */
  function resetFilter() { drillList = null; drillTokens.clear(); drillWeak = drillFav = drillTricky = drillLeech = false; feynEl.checked = false; rmExpand = false; }
  function startSession() { ret = null; resetFilter(); cramEl.checked = false; if (typeof syncFiltBar === "function") syncFiltBar(); setMode("drill"); }
  function startList(kind, topic) {
    const cram = cramEl.checked; resetFilter();
    if (kind === "fav") drillFav = true; else if (kind === "leech") drillLeech = true; else if (kind === "weak") drillWeak = true; else if (kind === "trick") drillTricky = true;
    else if (kind === "topic") drillTokens.add("t:" + topic);
    cramEl.checked = kind === "topic" ? cram : false;
    if (typeof syncFiltBar === "function") syncFiltBar();
    setMode("drill");
  }
  document.addEventListener("click", e => {
    const t = e.target.closest("#jtGo,[data-go],[data-topic],[data-mode],#jdCram,#jdQuiz,[data-am]"); if (!t || !t.closest(".jd-view")) return;
    if (t.id === "jdCram") { cramEl.checked = t.checked; return; }
    if (t.id === "jdQuiz") { setAnswerMode(t.checked ? "quiz" : "self"); return; }
    if (t.dataset.am) { setAnswerMode(t.dataset.am); t.parentNode.querySelectorAll("[data-am]").forEach(b => b.setAttribute("aria-checked", String(b === t))); return; }
    if (t.id === "jtGo") return startSession();
    if (t.dataset.mode) return openMode(t.dataset.mode);
    if (t.dataset.topic) return startList("topic", t.dataset.topic);
    const g = t.dataset.go;
    if (g === "search") { const b = $q("#gsBtn"); if (b) b.click(); return; }
    if (g === "terms") return setMode("terms");
    if (g === "roadmap") return setMode("roadmap");
    startList(g);
  });

  function openMode(m) { const tab = $q("#tab" + m.charAt(0).toUpperCase() + m.slice(1)); if (tab) tab.click(); else setMode(m); }

  /* setMode: свои экраны + фокус занятия. Свой экран: исходная setMode с несуществующим режимом
     прячет все разделы и гасит игры, звук и микрофон — уборка та же, что при любом переходе. */
  let ret = null;                    /* экран, откуда пришли не через панель: туда ведут «назад», крестик занятия и «На главную» */
  const AFTER = {}, TITLE = {};
  const origSetMode = window.setMode;
  window.setMode = function (m) {
    closeMenu(); closeSheet();
    if (m !== "drill") { if (undo && typeof hideToast === "function") hideToast(); undo = null; if (NS && !resumable() && NS.done) { NS = null; nsSave(); } }
    document.body.classList.toggle("jd-focus", m === "drill");
    Object.values(OWN).forEach(id => { $q("#" + id).hidden = true; });
    if (OWN[m]) {
      origSetMode("__own");
      mode = m;
      const v = $q("#" + OWN[m]); draw[m](); v.hidden = false; v.classList.remove("enter"); void v.offsetWidth; v.classList.add("enter");
    } else origSetMode(m);
    if (m === ret) ret = null;
    window.scrollTo(0, 0); syncBar();
    if (AFTER[m]) AFTER[m]();
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
    origRender(); lock = false; document.body.classList.remove("jd-revealed"); actBar.classList.remove("jd-picked");
    const act = $q("#drillStage #act"); if (act) actBar.replaceChildren(act);
    const rb = $q("#btnReveal"); if (rb) rb.innerHTML = "<span>" + h(feynEl.checked ? L("Показать эталон", "Show reference") : L("Показать ответ", "Show answer")) + "</span>";
    const tags = $q("#drillStage .card-tags");
    if (tags && !tags.querySelector(".jd-more")) tags.insertAdjacentHTML("beforeend", '<button class="jd-more" aria-label="' + h(L("Действия с карточкой", "Card actions")) + '" aria-haspopup="menu">' + ic("dots") + "</button>");
    /* до ответа под вопросом — тихая подсказка из «Как заниматься»: вспомнить вслух, потом открыть */
    const qq = $q("#drillStage .card .q");
    if (quizActive()) drawQuiz(qq, rb);
    else { QS = null; if (qq && !feynEl.checked) qq.insertAdjacentHTML("afterend", '<p class="jd-hint">' + ic("mic") + h(L("Ответь вслух своими словами — потом открой ответ", "Answer out loud in your own words — then reveal")) + "</p>"); }
    quizKeep = false;
    dress();
    window.scrollTo(0, 0);
  };
  /* четыре варианта под вопросом; «Показать ответ» становится «Не знаю — показать ответ» */
  function drawQuiz(qq, rb) {
    if (!(quizKeep && QS && QS.id === cur.id)) { const q = quizFor(cur); QS = { id: cur.id, res: null, pick: -1, opts: shuffle([{ t: q.ok, ok: 1 }].concat(q.wrong.map(w => ({ t: w, ok: 0 })))) }; }
    if (rb) { rb.classList.add("jd-ghost"); rb.innerHTML = "<span>" + h(L("Не знаю — показать ответ", "Don't know — show answer")) + "</span>"; rb.onclick = () => { if (!QS.res) { QS.res = "skip"; window.reveal(); } }; }
    if (!qq) return;
    const box = document.createElement("div"); box.className = "jd-quiz" + (QS.res ? " done" : ""); box.setAttribute("role", "group");
    box.innerHTML = QS.opts.map((o, i) => '<button class="jd-opt' + (QS.res && o.ok ? " ok" : "") + (QS.res && i === QS.pick && !o.ok ? " no" : "") + '" data-i="' + i + '"' + (QS.res ? " disabled" : "") + '><span class="jd-ol">'
      + (QS.res && o.ok ? ic("done") : QS.res && i === QS.pick ? ic("x") : "ABCD"[i]) + "</span><span>" + h(o.t) + "</span></button>").join("");
    qq.after(box);
    box.onclick = e => {
      const b = e.target.closest(".jd-opt"); if (!b || QS.res) return;
      const i = +b.dataset.i, ok = !!QS.opts[i].ok; QS.res = ok ? "ok" : "no"; QS.pick = i;
      box.classList.add("done"); box.querySelectorAll(".jd-opt").forEach((x, j) => { x.disabled = true; if (QS.opts[j].ok) { x.classList.add("ok"); x.querySelector(".jd-ol").innerHTML = ic("done"); } });
      if (!ok) { b.classList.add("no"); b.querySelector(".jd-ol").innerHTML = ic("x"); }
      box.insertAdjacentHTML("afterend", '<p class="jd-quiz-tag ' + (ok ? "ok" : "no") + '">' + ic(ok ? "check" : "alert") + h(ok ? L("Верно", "Correct") : L("Неверно — правильный отмечен зелёным", "Wrong — the right one is green")) + "</p>");
      if (window.jdHaptic) jdHaptic(ok ? "good" : "bad");
      window.reveal();
    };
  }
  /* карточка в языке приложения: ступени вместо точек, иконки набора вместо эмодзи у аналогии, нюанса, действий и источника */
  function dress() {
    const card = $q("#drillStage .card"); if (!card || !cur) return;
    const bp = card.querySelector(".boxpips");
    if (bp && !bp.classList.contains("jd-steps")) {
      const b = Math.min(BOX_MAX, Math.max(1, stR(cur.id).box || 1));
      bp.classList.add("jd-steps"); bp.dataset.box = b;
      bp.innerHTML = [1, 2, 3, 4, 5, 6, 7].map(i => '<i class="' + (i <= b ? "on" : "") + (i >= 5 ? " m" : "") + '"></i>').join("");
    }
    const ans = card.querySelector(".ans"); if (!ans) return;
    ans.dataset.jdl = feynEl.checked ? L("Эталон", "Reference") : L("Ответ", "Answer");
    const hook = ans.querySelector(".hook"); if (hook && !hook.querySelector(".jd-hk")) { deEmoji(hook); hook.insertAdjacentHTML("afterbegin", '<span class="jd-hk">' + ic("spark") + "</span>"); }
    ans.querySelectorAll(".note .ni").forEach(n => { if (!n.querySelector(".jd-svg")) n.innerHTML = ic("alert"); });
    /* «Нюанс: ⚠️ …» — знак уже стоит иконкой слева, второй в тексте лишний */
    ans.querySelectorAll(".note b").forEach(b => { const t = b.nextSibling; if (t && t.nodeType === 3) t.textContent = t.textContent.replace(EMO, " "); });
    withIcon(ans.querySelector("#vizGo"), "cube"); withIcon(ans.querySelector("#moreBtn"), "book"); withIcon(ans.querySelector("#myNoteBtn"), "pencil");
    const src = ans.querySelector(".src > span:first-child"); if (src && !src.querySelector(".jd-svg")) src.innerHTML = ic("book");
  }
  const origReveal = window.reveal;
  window.reveal = function () {
    origReveal(); document.body.classList.add("jd-revealed");
    if (!cur) return;
    const b = stR(cur.id).box, knew = BOX_DAYS[Math.min(b + 1, BOX_MAX)], almost = Math.max(1, Math.round(BOX_DAYS[b] / 2));
    const nx = $q("#drillStage .jd-steps i:nth-child(" + Math.min(b + 1, BOX_MAX) + ")"); if (nx && b < BOX_MAX && !nx.classList.contains("on")) nx.classList.add("nx");
    const set = (sel, t, s) => { const e = $q(sel); if (e) { e.innerHTML = "<span>" + h(t) + "</span><small>" + h(s) + "</small>"; e.setAttribute("aria-label", t + ", " + s); } };
    set("#btnBad", L("Не знал", "Didn't know"), cramEl.checked ? L("шаг назад", "step back") : L("ещё раз сегодня", "again today"));
    set("#btnMid", L("Почти", "Almost"), inDays(almost));
    set("#btnGood", L("Знал", "Knew it"), inDays(knew));
    /* вариантами: верно — «Знал» или «Угадал» (= «Почти»: узнавание из четырёх слабее воспоминания); неверно или «не знаю» — только «Не знал» */
    if (QS && QS.id === cur.id && QS.res) {
      const off = sel => { const e = $q(sel); if (e) e.classList.add("jd-off"); };
      if (QS.res === "ok") { off("#btnBad"); set("#btnMid", L("Угадал", "Guessed"), inDays(almost)); }
      else { off("#btnMid"); off("#btnGood"); }
    }
  };
  const RAW = () => ["jdNewDay", SKEY, HKEY, LOGKEY];
  const origGrade = window.grade;
  window.grade = function (lvl) {
    if (lock || !cur || !revealed || GRADING) return;
    lock = true;
    actBar.querySelectorAll("button").forEach(b => { b.disabled = true; });
    const pick = actBar.querySelector(["#btnBad", "#btnMid", "#btnGood"][lvl]); if (pick) { pick.classList.add("jd-pick"); actBar.classList.add("jd-picked"); }
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
      quizKeep = true; window.render(); window.reveal(); updateKpis(); drawSbar();
    };
    if (GRADING) setTimeout(apply, 220); else apply();
  }
  const origEmpty = window.renderEmpty;
  window.renderEmpty = function () {
    lock = false; actBar.replaceChildren(); actBar.classList.remove("jd-picked");
    if (NS && NS.done) return results();
    origEmpty();
    const b = $q("#drillStage .empty .btn"); if (b) { const a = document.createElement("div"); a.className = "actions"; a.id = "act"; a.appendChild(b); actBar.appendChild(a); }
    const eh = $q("#drillStage .empty h2"); if (eh) { eh.textContent = eh.textContent.replace(/[\s\u200d\ufe0f\p{Extended_Pictographic}]+$/u, "").replace(EMO, ""); eh.insertAdjacentHTML("beforebegin", '<div class="jd-empty-ico">' + ic("done") + "</div>"); }
  };
  function results() {
    const s = NS, p = plan(), seen = Object.keys(s.seen).length;
    const hard = Object.entries(s.fails).sort((a, b) => b[1] - a[1])[0], strong = Object.entries(s.goods).filter(x => !hard || x[0] !== hard[0]).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => clName(x[0]));
    const tomorrow = CARDS.filter(c => prog[c.id] && !isHidden(c.id) && prog[c.id].due === today() + 1).length;
    const leech = Object.keys(s.seen).filter(id => isLeech(id)).length, left = p.rep + p.fresh;
    const c = s.counts, acc = s.done ? c[2] / s.done : 0, seg = (cls, n) => n ? '<i class="' + cls + '" style="flex:' + n + '"></i>' : "";
    $q("#drillStage").innerHTML = '<div class="jr"><div class="jr-top"><div>'
      + "<h2>" + h(c[0] ? L("Занятие закончено", "Session complete") : L("Чисто — ни одного «не знал»", "Clean — no misses")) + "</h2>"
      + '<p class="jr-lead">' + h(L("Карточек", "Cards") + ": " + seen + " · " + L("ответов", "answers") + ": " + s.done + (s.fresh ? " · " + L("новых", "new") + ": " + s.fresh : "")) + "</p></div>"
      + '<div class="jr-pct" role="img" aria-label="' + h(L("знал", "knew") + " " + Math.round(acc * 100) + "%") + '"><svg viewBox="0 0 88 88" aria-hidden="true"><circle class="tr" cx="44" cy="44" r="36"/>' + (acc > 0 ? '<circle class="pr" cx="44" cy="44" r="36" style="--p:' + acc.toFixed(3) + '"/>' : "") + "</svg>"
      + "<div><b>" + Math.round(acc * 100) + "%</b><span>" + h(L("знал", "knew")) + "</span></div></div></div>"
      + '<div class="jr-seg" aria-hidden="true">' + seg("g", c[2]) + seg("m", c[1]) + seg("b", c[0]) + "</div>"
      + '<div class="jr-grid"><div class="g"><b>' + c[2] + "</b><span>" + h(L("знал", "knew")) + '</span></div><div class="m"><b>' + c[1] + "</b><span>" + h(L("почти", "almost")) + '</span></div><div class="b"><b>' + c[0] + "</b><span>" + h(L("не знал", "missed")) + "</span></div></div>"
      + (hard ? '<p class="jr-p">' + ic("down", "bad") + "<span>" + h(L("Самая трудная тема — ", "Hardest topic — ")) + "<b>" + h(clName(hard[0])) + "</b>" + h(L(". Её карточки уже в расписании — повтори завтра.", ". Its cards are scheduled — review tomorrow.")) + "</span></p>" : "")
      + (strong.length ? '<p class="jr-p">' + ic("check", "ok") + "<span>" + h(L("Увереннее всего: ", "Strongest: ")) + "<b>" + h(strong.join(", ")) + "</b></span></p>" : "")
      + (leech ? '<p class="jr-p">' + ic("alert", "bad") + "<span>" + h(L("Проблемных среди них: ", "Problem cards among them: ") + leech) + "</span></p>" : "")
      + '<p class="jr-p jr-next">' + ic("clock") + "<span>" + h(left ? L("Ещё к повтору сегодня: ", "Still due today: ") + left : L("Завтра к повтору: ", "Due tomorrow: ") + tomorrow) + "</span></p></div>";
    actBar.classList.remove("jd-picked");
    actBar.innerHTML = '<div class="actions" id="act">' + (left ? '<button class="btn" id="jrHome"><span>' + h(ret ? L("Назад", "Back") : L("На главную", "Home")) + '</span></button><button class="btn primary" id="jrMore"><span>' + h(L("Продолжить", "Continue")) + "</span><small>" + h(L("ещё " + left + " к повтору", left + " more due")) + "</small></button>" : '<button class="btn primary" id="jrHome"><span>' + h(ret ? L("Назад", "Back") : L("На главную", "Home")) + "</span></button>") + "</div>";
    $q("#jrHome").onclick = () => { NS = null; nsSave(); setMode(ret || "today"); };
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
      pop.innerHTML = '<button role="menuitem" data-a="fav">' + (fav ? ic("starOn") + h(L("Убрать из избранного", "Remove from favorites")) : ic("star") + h(L("В избранное", "Add to favorites"))) + '</button><button role="menuitem" data-a="hide">' + ic("eyeOff") + h(L("Больше не показывать", "Don't show again")) + "</button>";
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
    const cnt = [0, 0, 0, 0, 0, 0, 0, 0], due = cnt.slice(), lc = cnt.slice(); let fresh = 0;
    CARDS.forEach(c => { if (isHidden(c.id)) return; const p = prog[c.id]; if (!p) { fresh++; return; }
      const b = Math.min(BOX_MAX, Math.max(1, p.box)); cnt[b]++; if (p.due <= today()) due[b]++; if (isLeech(c.id)) lc[b]++; });
    const max = Math.max(1, ...cnt), lg = logGet()[today()] || [0, 0, 0], tot = lg[0] + lg[1] + lg[2];
    const mast = cnt[5] + cnt[6] + cnt[7], learning = cnt[1] + cnt[2] + cnt[3] + cnt[4], all = mast + learning + fresh;
    const seg = (cls, n) => n ? '<i class="' + cls + '" style="flex:' + n + '"></i>' : "";
    const leg = (cls, label, n) => '<span><i class="' + cls + '"></i>' + h(label) + " <b>" + n + "</b></span>";
    const step = b => '<button class="jl-row' + (b >= 5 ? " m" : "") + (cnt[b] ? "" : " e") + (due[b] ? " due" : "") + '" data-box="' + b + '"><span class="jl-b">' + b + '</span><span class="jl-d">' + h(inDays(BOX_DAYS[b]))
      + ((due[b] || lc[b]) ? "<small>" + (due[b] ? '<span class="du">' + h(L("к повтору", "due") + " " + due[b]) + "</span>" : "") + (lc[b] ? '<span class="lc">' + h(L("проблемных", "problem") + " " + lc[b]) + "</span>" : "") + "</small>" : "")
      + "</span>" + bar(cnt[b] / max * 100) + '<span class="jl-n">' + cnt[b] + "</span></button>";
    const html = '<header class="jt-head jl-head"><span>' + h(L("лестница, точность, темы", "ladder, accuracy, topics")) + "</span><h1>" + h(L("Прогресс", "Progress")) + '</h1></header><div class="jl">'
      + '<section class="jl-sum"><div class="jl-big"><b>' + mast + "</b><span>" + h(L("освоено из", "mastered of") + " " + all + " · " + Math.round(mast / Math.max(1, all) * 100) + "%") + "</span></div>"
      + '<div class="jl-dist" aria-hidden="true">' + seg("m", mast) + seg("l", learning) + seg("n", fresh) + "</div>"
      + '<div class="jl-leg">' + leg("m", L("освоено", "mastered"), mast) + leg("l", L("учатся", "learning"), learning) + leg("n", L("не начато", "not started"), fresh) + "</div></section>"
      + (tot ? '<section class="jl-today"><div class="jl-tb"><span>' + h(L("Сегодня · ответов", "Today · answers") + " " + tot) + "</span><b>" + Math.round(lg[2] / tot * 100) + "%<small>" + h(L("точность", "accuracy")) + "</small></b></div>"
        + '<div class="jl-dist" aria-hidden="true">' + seg("g", lg[2]) + seg("y", lg[1]) + seg("b", lg[0]) + "</div>"
        + '<div class="jl-leg">' + leg("g", L("знал", "knew"), lg[2]) + leg("y", L("почти", "almost"), lg[1]) + leg("b", L("не знал", "missed"), lg[0]) + "</div></section>" : "")
      + '<h3 class="jd-h3">' + h(L("Лестница повторения", "Review ladder")) + '</h3><div class="jl-steps">' + [1, 2, 3, 4].map(step).join("")
      + '<div class="jl-zone"><span class="jl-zl">' + h(L("Освоено", "Mastered")) + "</span>" + [5, 6, 7].map(step).join("") + "</div></div>"
      + '<p class="jl-note">' + h(L("Тап по ступени — её карточки. «Знал» поднимает на ступень, «не знал» опускает на две.", "Tap a step to see its cards. “Knew it” moves a card up one step, “missed” — down two.")) + '</p><div class="jl-list" hidden></div></div>';
    (stg.firstElementChild || stg).insertAdjacentHTML("afterbegin", html);   /* внутрь колонки: #progStage — флекс-строка */
    /* разделы сайта ниже — иконки набора вместо эмодзи в заголовках и кнопках */
    stg.querySelectorAll(".prog-sub, .cname, .exam-head, .prog-foot").forEach(deEmoji);
    withIcon($q("#drillWeak"), "heal"); withIcon($q("#expBtn"), "download"); withIcon($q("#impBtn"), "upload"); withIcon($q("#printBtn"), "printer");
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

  /* ---------- «Игра»: иконки набора вместо эмодзи; тон — группа режима (аркады, суждение, вдвоём, быстрые) ---------- */
  const GAME_IC = { mTank: ["shield", "t-vio"], mInv: ["ghost", "t-vio"], mArcade: ["joy", "t-vio"], mDesign: ["columns", "t-acc"], mRev: ["eye", "t-acc"], mDiag: ["pulse", "t-acc"],
    mWp: ["printer", "t-acc"], mMock: ["target", "t-acc"], mDuo: ["users", "t-cy"], mDuel: ["cross", "t-cy"], mBlitz: ["zap", "t-org"], mMatch: ["link", "t-org"], mDrop: ["tray", "t-org"],
    mTF: ["tf", "t-org"], mOrder: ["order", "t-org"], mGuess: ["image", "t-org"], mRecall: ["keys", "t-org"], mAcr: ["type", "t-org"], mBugs: ["bug", "t-org"] };
  function gameIcons() {
    const menu = $q("#gameStage .game-menu"); if (!menu) return;
    const cards = menu.querySelectorAll(".mode-card"); deEmoji(menu.querySelector(".g-cat.all"));
    menu.dataset.k = cards.length + " " + L(plural(cards.length, "режим", "режима", "режимов"), plural(cards.length, "mode", "modes"));
    cards.forEach(c => { const m = GAME_IC[c.id], e = c.querySelector(".mc-emoji"); if (!m || !e || e.dataset.jd) return; e.dataset.jd = 1; e.className = "mc-emoji " + m[1]; e.innerHTML = ic(m[0]); });
  }
  if ($q("#gameStage")) new MutationObserver(gameIcons).observe($q("#gameStage"), { childList: true, subtree: true });

  /* ---------- «С нуля»: маршрут деревом. Дерево — сайтовое #zeroNav (на телефоне сайт его прячет), переезжает в шторку;
     zeroNavUI и подсветка по прокрутке находят его по id и работают как раньше. Строка чипов (69 тем вбок) — вместо неё строка «Маршрут». ---------- */
  let jumpZero = i => setMode("zero");
  const zView = $q("#viewZero"), zNav = $q("#zeroNav"), zChips = $q("#zeroChips");
  if (zView && zNav && zChips) {
    const sheet = document.createElement("div"); sheet.className = "jd-sheet"; sheet.hidden = true;
    sheet.innerHTML = '<div class="jd-sheet-bg"></div><div class="jd-sheet-panel" role="dialog" aria-modal="true"><div class="jd-sheet-grip"></div><div class="jd-sheet-head"><b></b><span></span>'
      + '<button class="jd-sheet-x" aria-label="' + h(L("Закрыть", "Close")) + '">' + ic("x") + '</button></div><div class="jd-sheet-body"></div></div>';
    document.body.appendChild(sheet);
    const body = sheet.querySelector(".jd-sheet-body"); body.appendChild(zNav);
    const zScroll = zView.querySelector(".terms-wrap");
    const bar = document.createElement("button"); bar.className = "jd-route"; bar.setAttribute("aria-haspopup", "dialog");
    zChips.before(bar);
    const routeUI = () => {
      /* текущая тема: сайт после пересборки дерева теряет .on у темы (а у шага — нет), поэтому сначала тема с отмеченным шагом */
      const items = [...zNav.querySelectorAll(".zn-item")], stepOn = zNav.querySelector(".zn-s.on"), stepItem = stepOn && stepOn.closest(".zn-sub") && stepOn.closest(".zn-sub").previousElementSibling;
      const on = zNav.querySelector(".zn-item.on") || stepItem || zNav.querySelector(".zn-item.open") || items[0]; if (!on) return;
      const n = items.indexOf(on) + 1, name = (on.querySelector("span:nth-child(2)") || on).textContent.trim();
      const sub = on.nextElementSibling, steps = sub ? sub.querySelectorAll(".zn-s") : [], si = sub ? [...steps].findIndex(x => x.classList.contains("on")) : -1;
      bar.innerHTML = '<span class="jd-ico t-acc">' + ic("tree") + '</span><span class="jd-rt"><small>' + h(L("Маршрут", "Route") + " · " + n + " / " + items.length) + "</small><b>" + h(name)
        + "</b></span>" + (steps.length ? '<span class="jd-n">' + (si >= 0 ? si + 1 : 1) + "/" + steps.length + "</span>" : "") + '<span class="jd-chev">›</span>';
      bar.setAttribute("aria-label", L("Маршрут: ", "Route: ") + name);
    };
    let raf = 0; const later = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; routeUI(); }); };
    new MutationObserver(later).observe(zNav, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
    /* подсветка темы по прокрутке: сайт слушает прокрутку окна, а на телефоне листается внутренний блок — подсветка стояла на первой теме */
    let sraf = 0;
    if (zScroll && typeof zeroSpy === "function") zScroll.addEventListener("scroll", () => { if (!sraf) sraf = requestAnimationFrame(() => { sraf = 0; if (mode === "zero") zeroSpy(); }); }, { passive: true });
    const openSheet = () => {
      sheet.querySelector(".jd-sheet-head b").textContent = L("Маршрут", "Route");
      sheet.querySelector(".jd-sheet-head span").textContent = zNav.querySelectorAll(".zn-item.full").length + " / " + zNav.querySelectorAll(".zn-item").length + " " + L("тем пройдено", "topics done");
      sheet.hidden = false; requestAnimationFrame(() => { sheet.classList.add("on"); const cur = zNav.querySelector(".zn-s.on") || zNav.querySelector(".zn-item.on"); if (cur) cur.scrollIntoView({ block: "center" }); });
    };
    closeSheet = () => { if (sheet.hidden) return false; sheet.classList.remove("on"); setTimeout(() => { sheet.hidden = true; }, 260); return true; };
    bar.onclick = openSheet;
    /* клики в шторке — на погружении, до обработчиков сайта:
       тема — только раскрыть (сайт ещё и листал страницу под шторкой);
       шаг — свой переход: мгновенно, с поправкой на строку «Маршрут» и двумя досверками. Плавная прокрутка сайта
       через тысячи пикселей не доезжала: по пути догружаются сцены, и цель уезжает. */
    const jump = id => {
      const el = document.getElementById(id); if (!el || !zScroll) return;
      const go = () => { zScroll.scrollTop += el.getBoundingClientRect().top - zScroll.getBoundingClientRect().top - bar.offsetHeight - 12; };
      go(); setTimeout(go, 150); setTimeout(go, 600);
    };
    sheet.addEventListener("click", e => {
      if (e.target.closest(".jd-sheet-x") || e.target.classList.contains("jd-sheet-bg")) { closeSheet(); return; }
      const step = e.target.closest(".zn-s"), topic = !step && e.target.closest(".zn-item");
      if (!step && !topic) return;
      e.stopPropagation(); if (typeof zeroSpy === "function") zeroSpy.manual = Date.now();
      if (topic) { try { V3ZOPEN = V3ZOPEN === topic.dataset.k ? null : topic.dataset.k; zeroNavUI(); } catch (err) {} return; }
      closeSheet(); jump("zs" + step.dataset.s);
    }, true);
    routeUI();
    jumpZero = i => { if (typeof zeroSpy === "function") zeroSpy.manual = Date.now(); setMode("zero"); jump("zs" + i); };
  }

  /* ---------- нижняя панель: пять разделов под большой палец ---------- */
  const BAR = () => [["today", "home", L("Сегодня", "Today")], ["learn", "learn", L("Учить", "Learn")], ["cards", "cards", L("Карточки", "Cards")], ["game", "game", L("Игра", "Games")], ["prog", "prog", L("Прогресс", "Progress")]];
  const SECTION = { today: "today", learn: "learn", cards: "cards", terms: "cards", game: "game", prog: "prog" };
  const bb = document.createElement("nav"); bb.className = "jd-bb"; bb.setAttribute("aria-label", "Разделы");
  function buildBar() { bb.innerHTML = BAR().map(b => '<button data-m="' + b[0] + '"><span class="jd-pi">' + ic(b[1]) + "</span><span>" + h(b[2]) + "</span></button>").join(""); syncBar(); chrome(); }
  /* шапка: поиск и «как заниматься» — те же иконки, что в панели; в полях поиска разделов — без эмодзи */
  /* сайт ставит подсказки полей заново (язык, открытие поиска) — эмодзи-лупу снимаем, когда поле получает фокус */
  document.addEventListener("focusin", e => { const i = e.target; if (i && i.matches && i.matches("#gsInput,#fpSearch,#termSearch,#prinSearch,#basSearch")) i.placeholder = i.placeholder.replace(/^🔍\s*/, ""); });
  function chrome() {
    const gs = $q("#gsBtn"), tp = $q("#tipBtn");
    if (gs) gs.innerHTML = ic("search"); if (tp) tp.innerHTML = ic("bulb");
    ["#fpSearch", "#termSearch", "#prinSearch", "#basSearch", "#gsInput"].forEach(sel => { const i = $q(sel); if (i) i.placeholder = i.placeholder.replace(/^🔍\s*/, ""); });
  }
  function syncBar() { const s = SECTION[mode] || (mode === "drill" ? "today" : "learn"); bb.querySelectorAll("button").forEach(b => { const on = b.dataset.m === s; b.classList.toggle("on", on); b.setAttribute("aria-current", on ? "page" : "false"); }); topTitle(); }
  /* внутренние экраны («На пальцах», «Термины»…): в шапке «‹ название» вместо логотипа — видно, где ты, и есть путь в свой раздел */
  const brand = $q(".topbar .brand"), TOP = ["today", "learn", "cards", "game", "prog", "drill"];
  if (brand) brand.innerHTML = MARK + "Java<span>Drill</span>";
  const brandHTML = brand ? brand.innerHTML : "";
  function topTitle() {
    if (!brand) return;
    if (TOP.includes(mode)) { if (brand.dataset.sub) { brand.innerHTML = brandHTML; delete brand.dataset.sub; } return; }
    const tab = $q("#tab" + mode.charAt(0).toUpperCase() + mode.slice(1));
    const name = TITLE[mode] ? TITLE[mode]() : tab ? tab.textContent.replace(/^[^\p{L}\d]+/u, "").replace(/\s*·.*$/, "").trim() : "";
    brand.dataset.sub = mode;
    brand.innerHTML = '<button class="jd-up" aria-label="' + h(L("Назад", "Back")) + '">' + ic("back") + "<span>" + h(name) + "</span></button>";
    brand.querySelector(".jd-up").onclick = e => { e.stopPropagation(); setMode(ret || SECTION[mode] || "learn"); };
  }
  bb.onclick = e => { const b = e.target.closest("button[data-m]"); if (b) { ret = null; setMode(b.dataset.m); } };
  document.body.appendChild(bb); buildBar();
  /* язык поменялся — подписи и экраны тоже. Не по таймеру после нажатия: первый переход на EN грузит словарь
     (i18n-en.js) дольше 0.7 с, и панель собиралась ещё по-русски — «Сегодня | Учить | Cards | Game | Прогресс».
     setLang по готовности словаря зовёт сама себя через глобальное имя, то есть и эту обёртку. */
  if (typeof window.setLang === "function") {
    const origSetLang = window.setLang;
    window.setLang = function (l) { const r = origSetLang.apply(this, arguments); if (typeof LANG !== "undefined" && LANG === l) { buildBar(); if (OWN[mode]) draw[mode](); } return r; };
  }

  /* брат сделал свой раздел стартовым («Открывать сразу здесь») — приложение открывается в нём, «Назад» ведёт туда же */
  const broStart = () => typeof broPinned === "function" && broPinned();
  /* «Назад»: меню карточки — первым (вызывает app-native.js) */
  const backs = [];
  /* раздел брата (bro.js): урок → курс → оба курса, на главной раздела — дальше по обычным правилам */
  backs.push(() => typeof broBack === "function" && broBack());
  /* ассессмент (asm.js): вопросы темы → все темы */
  backs.push(() => typeof asmBack === "function" && asmBack());
  /* экран из другого файла (app-roadmap.js) живёт в том же цикле setMode, что и свои */
  function addScreen(m, section, title, drawFn, after) {
    const id = "view" + m.charAt(0).toUpperCase() + m.slice(1), s = document.createElement("section");
    s.id = id; s.className = "view jd-view"; s.hidden = true; $q("#viewDrill").before(s);
    OWN[m] = id; draw[m] = drawFn; SECTION[m] = section; TITLE[m] = title; if (after) AFTER[m] = after;
  }
  const startIds = ids => { resetFilter(); cramEl.checked = false; if (typeof syncFiltBar === "function") syncFiltBar(); drillList = ids; setMode("drill"); };
  window.jdNative = { back: () => closeMenu() || closeSheet() || backs.some(f => f()), session: () => NS, plan, home: () => ret || (broStart() ? "bro" : "today"),
    ui: { ic, h, L, plural, $q, bar, addScreen, startIds, jumpZero: i => jumpZero(i), from: m => { ret = m; }, addBack: f => backs.push(f) } };

  /* старт: экран «Сегодня» вместо первой карточки; заставку убираем, как только он нарисован
     (раньше она гасла по таймеру через 0.7 с, и до готовности страницы был пустой тёмный экран) */
  setMode(broStart() ? "bro" : "today");
  requestAnimationFrame(() => { try { const SS = window.Capacitor && Capacitor.Plugins && Capacitor.Plugins.SplashScreen; if (SS && SS.hide) SS.hide({ fadeOutDuration: 150 }); } catch (e) {} });
})();

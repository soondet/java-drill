/* 🎯 Раздел «Ассессмент» — итоги аттестации, индивидуальный план развития (ИПР) и черновик достижений к следующей.
 *
 * Своих данных в репозитории нет: он публичный, а в ассессменте — имена, уровень и внутренние ссылки. Данные приходят
 * файлом JSON (kind: "jd-assessment") — «Загрузить файл» или «Вставить текст» — и живут только в этом браузере или
 * приложении: ключ jdAsm. Отметки, заметки и дата утверждения — jdAsmMy. Оба попадают в бэкап прогресса по префиксу jd.
 *
 * Что раздел добавляет к самому файлу: каждая цель ИПР связана с карточками тренажёра (фильтры cards в файле) —
 * процент освоения считается по тем же ступеням, что и везде (5–7 = освоено), а «Учить» запускает занятие на этих
 * карточках. Термины цели (terms) показывают, сколько карточек в тренажёре вообще про них есть: чип «мало» = дыра.
 *
 * Адреса: #asm — главная, #asm/g-<id> — цель, #asm/ach — достижения. В приложении «Назад» телефона зовёт asmBack. */
(function () {
  const KEY = "jdAsm", MY = "jdAsmMy", ROUTE = /^#asm(\/|$)/;

  /* ---------- мелочи ---------- */
  const en = () => typeof LANG !== "undefined" && LANG === "en";
  const L = (ru, e) => en() ? e : ru;
  const E = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const pl = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c; };
  const hash = s => { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h.toString(36); };
  const re = s => { try { return new RegExp(s, "i"); } catch (e) { return /$^/; } };
  const ld = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v && typeof v === "object" ? v : d; } catch (e) { return d; } };
  const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const day = s => { const m = /^(\d{4})-(\d\d)-(\d\d)/.exec(s || ""); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
  const dmy = d => d ? String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + d.getFullYear() : "";
  const say = m => { if (typeof toast === "function") { try { toast(m); } catch (e) {} } };

  /* ---------- данные ---------- */
  const valid = o => !!o && o.kind === "jd-assessment" && Array.isArray(o.idp) && o.round && typeof o.round === "object";
  let D = null, M = null;
  const loadAll = () => { const d = ld(KEY, null); D = valid(d) ? d : null; M = Object.assign({ ck: {}, act: {}, notes: {}, approved: "" }, ld(MY, {})); };
  const saveM = () => put(MY, M);
  const goal = id => D && D.idp.find(g => g.id === id);
  const ckKey = (g, t) => g.id + ":" + hash(t);

  /* карточки цели: объединение фильтров {t, s[], kw}; скрытые карточки не считаем — как везде в тренажёре */
  const cardText = c => (c.q || "") + " " + (c.a || "") + " " + (c.d || "") + " " + (c.s || "") + " " + (c.code || "");
  const allCards = () => typeof CARDS !== "undefined" && Array.isArray(CARDS) ? CARDS.filter(c => !(typeof isHidden === "function" && isHidden(c.id))) : [];
  let CC = null;
  function cache() {
    if (CC) return CC;
    const all = allCards(), byGoal = {}, byTerm = {};
    for (const g of D.idp) {
      const out = new Map();
      for (const f of g.cards || []) {
        const r = f.kw ? re(f.kw) : null;
        for (const c of all) { if (f.t && c.t !== f.t) continue; if (f.s && f.s.indexOf(c.s) < 0) continue; if (r && !r.test(cardText(c))) continue; out.set(c.id, c); }
      }
      byGoal[g.id] = [...out.values()];
      for (const t of g.terms || []) { const r = re(t.re); byTerm[g.id + "|" + t.n] = all.filter(c => r.test(cardText(c))); }
    }
    return (CC = { byGoal, byTerm });
  }
  const P = id => (typeof stR === "function" ? stR(id) : { box: 1, due: 0 });
  const seen = id => typeof prog !== "undefined" && !!prog[id];
  const now = () => (typeof today === "function" ? today() : Math.floor(Date.now() / 86400000));
  function stat(cs) {
    let m = 0, due = 0, s = 0; const t = now();
    for (const c of cs) { const p = P(c.id); if (p.box >= 5) m++; if (seen(c.id)) { s++; if (p.due <= t) due++; } }
    return { n: cs.length, m, due, s, pct: cs.length ? Math.round(m / cs.length * 100) : 0 };
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
  function goalStat(g) {
    const crit = g.crit || [], ck = crit.filter(t => M.ck[ckKey(g, t)]).length;
    return { crit: crit.length, ck, cards: stat(cache().byGoal[g.id] || []) };
  }

  /* ---------- срок повторного ассессмента ---------- */
  function deadline() {
    const r = D.round, base = day(M.approved) || day(r.approved) || day(r.date);
    if (!base || !r.months) return null;
    const d = new Date(base); d.setMonth(d.getMonth() + (+r.months || 12));
    const left = Math.round((d - new Date(new Date().toDateString())) / 86400000);
    return { d, left, base, guess: !M.approved && !!r.approvedGuess };
  }

  /* ---------- адреса ---------- */
  function parse() {
    const r = (location.hash.match(/^#asm\/?([\w-]*)/) || [, ""])[1];
    if (r === "ach") return { v: "ach" };
    if (/^g-/.test(r) && D && goal(r.slice(2))) return { v: "goal", id: r.slice(2) };
    return { v: "home", bad: !!r };
  }
  function go(to) {
    const h = to === "home" ? "#asm" : "#asm/" + to;
    if (location.hash === h) draw(); else location.hash = h;
  }
  const wrap = () => document.getElementById("asmWrap");

  /* ---------- куски ---------- */
  const bar = (pct, cls) => '<span class="asm-bar' + (cls ? " " + cls : "") + '"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></span>';
  const ST = { prod: ["в проде", "in prod", "ok"], part: ["частично в проде", "partly in prod", "part"], no: ["не в проде", "not in prod", "no"], doc: ["документ", "document", "doc"] };
  const badge = s => ST[s] ? '<span class="asm-st ' + ST[s][2] + '">' + L(ST[s][0], ST[s][1]) + "</span>" : "";
  const jira = sc => { const u = D.round.jira; return sc.map(t => u ? '<a class="asm-sc" href="' + E(u + t) + '" target="_blank" rel="noopener">' + E(t) + "</a>" : '<span class="asm-sc">' + E(t) + "</span>").join(""); };
  const item = x => '<li class="asm-it"><div class="asm-it-h"><b>' + E(x.t) + "</b>" + badge(x.st) + "</div>" + (x.d ? "<p>" + E(x.d) + "</p>" : "") + (x.sc && x.sc.length ? '<div class="asm-scs">' + jira(x.sc) + "</div>" : "") + "</li>";
  const back = to => '<div class="asm-top"><button class="asm-back" data-go="' + to + '">‹ ' + L("Назад", "Back") + "</button></div>";

  /* ---------- пусто: загрузить файл ---------- */
  function empty() {
    return '<div class="asm-hero"><span class="asm-kick">' + L("Карьера", "Career") + "</span><h1>" + L("Ассессмент и ИПР", "Assessment & growth plan") + "</h1>"
      + "<p>" + L("Итоги аттестации, индивидуальный план развития с прогрессом по карточкам тренажёра и черновик достижений к следующему ассессменту.",
        "Assessment results, your growth plan tracked against the trainer's cards, and a draft of achievements for the next review.") + "</p>"
      + '<div class="asm-btns"><button class="btn primary" data-imp="file">⇩ ' + L("Загрузить файл", "Load file") + '</button><button class="btn" data-imp="paste">' + L("Вставить текст", "Paste text") + "</button></div>"
      + '<input type="file" id="asmFile" accept="application/json,.json" hidden>'
      + '<div class="asm-paste" hidden><textarea id="asmTxt" rows="6" placeholder=\'{"kind":"jd-assessment", …}\'></textarea><button class="btn primary" data-imp="go">' + L("Загрузить", "Load") + "</button></div>"
      + '<p class="asm-priv">🔒 ' + L("Данные остаются только на этом устройстве: на сайт и в репозиторий они не уходят. В файл бэкапа прогресса попадают.",
        "Data stays on this device only; it is never uploaded. It is included in your progress backup file.") + "</p></div>";
  }

  /* ---------- главная ---------- */
  function home() {
    const r = D.round, w = D.who || {}, dl = deadline();
    let tot = 0, wsum = 0;
    const rows = D.idp.map(g => {
      const s = goalStat(g), cp = s.crit ? s.ck / s.crit : 0, pct = Math.round((cp * 0.5 + s.cards.pct / 100 * 0.5) * 100);
      tot += pct * (+g.w || 1); wsum += +g.w || 1;
      return '<button class="asm-g" data-go="g-' + E(g.id) + '"><span class="asm-g-t"><b>' + E(g.t) + "</b><small>"
        + L("критерии", "criteria") + " " + s.ck + "/" + s.crit + " · " + L("карточки", "cards") + " " + s.cards.m + "/" + s.cards.n + (s.cards.due ? " · " + L("к повтору", "due") + " " + s.cards.due : "")
        + "</small>" + bar(pct) + '</span><span class="asm-g-w">' + (g.w ? E(g.w) + "%" : "") + '</span><span class="asm-chev">›</span></button>';
    }).join("");
    const ready = wsum ? Math.round(tot / wsum) : 0;
    const due = dl ? (dl.left >= 0 ? L("через", "in") + " " + dl.left + " " + L(pl(dl.left, "день", "дня", "дней"), dl.left === 1 ? "day" : "days") : L("срок прошёл", "overdue by") + " " + (-dl.left) + " " + L(pl(-dl.left, "день", "дня", "дней"), "days")) : "";
    const acts = (r.actions || []).map(a => '<label class="asm-ck"><input type="checkbox" data-act="' + E(a.id) + '"' + (M.act[a.id] ? " checked" : "") + "><span>" + E(a.t) + "</span></label>").join("");
    const nd = D.draft ? D.draft.q.reduce((a, q) => a + q.items.length, 0) : 0;
    return '<div class="asm-hero"><span class="asm-kick">' + L("Ассессмент", "Assessment") + " · " + E(dmy(day(r.date))) + "</span>"
      + '<h1><span class="asm-lv">' + E(r.from) + '</span><i>→</i><span class="asm-lv to">' + E(r.to) + "</span></h1>"
      + "<p>" + E([w.team, w.stack, r.tenure ? L("стаж на должности ", "in role ") + r.tenure : ""].filter(Boolean).join(" · ")) + "</p>"
      + (dl ? '<div class="asm-due' + (dl.left < 0 ? " late" : dl.left < 60 ? " soon" : "") + '"><b>' + L("Повторный ассессмент", "Next assessment") + "</b><span>" + L("до", "by") + " " + dmy(dl.d) + " · " + due + "</span>"
        + '<label class="asm-appr">' + L("утверждено", "approved") + ' <input type="date" id="asmAppr" value="' + E(M.approved || r.approved || r.date) + '"></label>'
        + (dl.guess ? "<small>" + L("Дату утверждения в форме не указали — считаю от даты ассессмента. Поправь, если знаешь точную.", "Approval date unknown — counted from the assessment date.") + "</small>" : "") + "</div>" : "")
      + '<div class="asm-ready"><span>' + L("Готовность по ИПР", "Plan readiness") + "</span><b>" + ready + "%</b>" + bar(ready, "big") + "<small>" + L("половина — закрытые критерии, половина — освоенные карточки по теме", "half closed criteria, half mastered topic cards") + "</small></div></div>"
      + (en() ? '<p class="asm-ru">The imported data itself is in Russian.</p>' : "")
      + '<h3 class="asm-h">' + L("Индивидуальный план развития", "Growth plan") + "</h3><div class=\"asm-list\">" + rows + "</div>"
      + (nd ? '<button class="asm-g asm-ach" data-go="ach"><span class="asm-g-t"><b>🏆 ' + L("Достижения для формы", "Achievements for the form") + "</b><small>"
        + L("черновик с ", "draft since ") + E(dmy(day(D.draft.since))) + " · " + nd + " " + L(pl(nd, "пункт", "пункта", "пунктов"), "items") + " · " + L("прошлые — из PDF", "past ones from the PDF") + '</small></span><span class="asm-chev">›</span></button>' : "")
      + '<h3 class="asm-h">' + L("Решение комиссии", "Committee decision") + '</h3><div class="asm-card"><p class="asm-dec">' + E(r.decision || "") + "</p>" + acts
      + '<dl class="asm-dl">'
      + [[L("Достижение целей", "Goals met"), r.goalsMet], [L("Рейтинговая оценка", "Rating"), r.rating], [L("Тимлид", "Team lead"), w.lead], [L("Product owner", "Product owner"), w.po], [L("Комиссия", "Committee"), (r.commission || []).join(", ")]]
        .filter(x => x[1]).map(x => "<dt>" + E(x[0]) + "</dt><dd>" + E(x[1]) + "</dd>").join("") + "</dl>"
      + (r.norms ? '<a class="asm-link" href="' + E(r.norms) + '" target="_blank" rel="noopener">' + L("Нормы соотношения баллов", "Score norms") + " ↗</a>" : "") + "</div>"
      + '<div class="asm-foot"><p class="asm-priv">🔒 ' + L("Данные только на этом устройстве. Файл от ", "Stored on this device only. File of ") + E(dmy(day(D.made)) || "—") + ".</p>"
      + '<div class="asm-btns"><button class="btn" data-imp="file">⇩ ' + L("Обновить из файла", "Update from file") + '</button><button class="btn ghost asm-del" data-del="1">' + L("Удалить с устройства", "Delete from device") + "</button></div>"
      + '<input type="file" id="asmFile" accept="application/json,.json" hidden></div>';
  }

  /* ---------- цель ИПР ---------- */
  function goalView(id) {
    const g = goal(id), C = cache(), cs = C.byGoal[g.id] || [], s = stat(cs);
    const crit = (g.crit || []).map(t => { const k = ckKey(g, t), v = M.ck[k];
      return '<label class="asm-ck"><input type="checkbox" data-ck="' + E(k) + '"' + (v ? " checked" : "") + "><span>" + E(t) + (v ? '<small>✓ ' + E(dmy(new Date(v))) + "</small>" : "") + "</span></label>"; }).join("");
    const terms = (g.terms || []).map(t => { const n = (C.byTerm[g.id + "|" + t.n] || []).length;
      return '<button class="asm-tm' + (n <= 1 ? " thin" : "") + '" data-term="' + E(t.n) + '"' + (n ? "" : " disabled") + "><span>" + E(t.n) + "</span><b>" + n + "</b></button>"; }).join("");
    const thin = (g.terms || []).filter(t => (C.byTerm[g.id + "|" + t.n] || []).length <= 1).map(t => t.n);
    return back("home")
      + '<div class="asm-gh"><span class="asm-kick">' + L("Цель ИПР", "Plan goal") + (g.w ? " · " + E(g.w) + "%" : "") + "</span><h2>" + E(g.t) + "</h2></div>"
      + '<section class="asm-card"><h4>' + L("Что изучить", "What to learn") + "</h4><ul class=\"asm-ul\">" + (g.desc || []).map(x => "<li>" + E(x) + "</li>").join("") + "</ul>"
      + (g.res && g.res.length ? "<h4>📖 " + L("Ресурсы", "Resources") + '</h4><ul class="asm-ul">' + g.res.map(x => "<li>" + E(x) + "</li>").join("") + "</ul>" : "") + "</section>"
      + '<section class="asm-card"><h4>' + L("Критерии успеха", "Success criteria") + "</h4>" + crit + "</section>"
      + '<section class="asm-card"><h4>' + L("В тренажёре", "In the trainer") + "</h4>"
      + '<div class="asm-tr"><span><b>' + s.m + "</b> / " + s.n + " " + L("освоено", "mastered") + (s.due ? " · " + s.due + " " + L("к повтору", "due") : "") + "</span>" + bar(s.pct) + "</div>"
      + (cs.length ? '<button class="btn primary asm-go" data-study="goal">' + L("Учить карточки цели", "Study this goal's cards") + "<small>" + Math.min(40, cs.length) + " " + L("за занятие · сначала повторы", "per session · reviews first") + "</small></button>" : "")
      + (terms ? '<p class="asm-hint">' + L("Сколько карточек про каждую тему из ИПР. Тапни — учить только их.", "Cards per plan topic. Tap to study just those.") + "</p><div class=\"asm-tms\">" + terms + "</div>" : "")
      + (thin.length ? '<p class="asm-gap">' + L("Мало или нет в тренажёре: ", "Thin or missing in the trainer: ") + E(thin.join(", ")) + L(" — готовься по книгам и документации.", " — use books and docs.") + "</p>" : "") + "</section>"
      + (g.proof && g.proof.length ? '<section class="asm-card"><h4>' + L("Чем подтвердить", "Evidence") + '</h4><ul class="asm-its">' + g.proof.map(item).join("") + "</ul></section>" : "")
      + (g.tips && g.tips.length ? '<section class="asm-card asm-tips"><h4>💡 ' + L("Как закрыть до ассессмента", "How to close it") + '</h4><ul class="asm-ul">' + g.tips.map(x => "<li>" + E(x) + "</li>").join("") + "</ul></section>" : "")
      + '<section class="asm-card"><h4>' + L("Мои заметки", "My notes") + '</h4><textarea class="asm-note" data-note="' + E(g.id) + '" rows="4" placeholder="' + E(L("Что сделал, ссылки, что показать комиссии…", "What you did, links, what to show…")) + '">' + E(M.notes[g.id] || "") + "</textarea></section>";
  }

  /* ---------- достижения ---------- */
  let tab = "draft";
  function ach() {
    const Dr = D.draft, past = D.past || [];
    const seg = '<div class="asm-seg" role="tablist">' + (Dr ? '<button role="tab" data-tab="draft" aria-selected="' + (tab === "draft") + '">' + L("С ", "Since ") + E(dmy(day(Dr.since))) + "</button>" : "")
      + (past.length ? '<button role="tab" data-tab="past" aria-selected="' + (tab === "past" || !Dr) + '">' + L("Прошлый ассессмент", "Previous assessment") + "</button>" : "") + "</div>";
    let body = "";
    if (tab === "draft" && Dr) {
      const n = Dr.q.reduce((a, q) => a + q.items.length, 0), np = Dr.q.reduce((a, q) => a + q.items.filter(x => x.st === "prod").length, 0);
      body = '<div class="asm-card asm-how"><p>' + E(Dr.how || "") + "</p>"
        + '<div class="asm-nums">' + [[Dr.commits, L("коммитов", "commits")], [Dr.tickets, L("тикетов", "tickets")], [np + "/" + n, L("пунктов в проде", "items in prod")]].filter(x => x[0]).map(x => "<span><b>" + E(x[0]) + "</b>" + E(x[1]) + "</span>").join("") + "</div>"
        + '<button class="btn primary asm-go" data-copy="draft">⧉ ' + L("Скопировать текстом для формы", "Copy as text for the form") + "</button></div>"
        + Dr.q.map(q => '<h3 class="asm-h">' + E(q.p) + '</h3><ul class="asm-its">' + q.items.map(item).join("") + "</ul>").join("")
        + (Dr.extra && Dr.extra.length ? '<h3 class="asm-h">' + L("Вне задач и в ветках", "Outside tickets and in branches") + '</h3><ul class="asm-its">' + Dr.extra.map(item).join("") + "</ul>" : "")
        + (Dr.team ? '<div class="asm-card asm-tips"><h4>✍️ ' + L("Допиши сам", "Add yourself") + "</h4><p>" + E(Dr.team) + "</p></div>" : "");
    } else {
      body = past.map(q => '<h3 class="asm-h">' + E(q.p) + "</h3>" + (q.goals && q.goals.length ? '<p class="asm-goals">' + L("Цели команды: ", "Team goals: ") + E(q.goals.join(" · ")) + "</p>" : "")
        + '<ul class="asm-its">' + q.items.map(item).join("") + "</ul>").join("");
    }
    return back("home") + '<div class="asm-gh"><span class="asm-kick">' + L("Для формы ассессмента", "For the assessment form") + "</span><h2>🏆 " + L("Достижения", "Achievements") + "</h2></div>" + seg + body;
  }
  function asText() {
    const Dr = D.draft, u = D.round.jira || "", out = [];
    Dr.q.forEach(q => { out.push(L("Мои достижения: ", "My achievements: ") + q.p); q.items.forEach((x, i) => { out.push((i + 1) + ". " + x.t); if (x.d) out.push(x.d); x.sc.forEach(t => out.push(u ? u + t : t)); }); out.push(""); });
    return out.join("\n").trim();
  }
  function copyText(text, btn) {
    const ok = () => { const o = btn.textContent; btn.textContent = "✓ " + L("Скопировано", "Copied"); setTimeout(() => { if (btn.isConnected) btn.textContent = o; }, 1500); };
    const old = () => { const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} ta.remove(); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, old); else old();
  }

  /* ---------- рисование ---------- */
  function draw() {
    const w = wrap(); if (!w) return;
    if (!D) { w.innerHTML = empty(); w.dataset.v = "empty"; return; }
    const r = parse();
    if (r.bad) { try { history.replaceState(null, "", "#asm"); } catch (e) {} }
    w.innerHTML = r.v === "goal" ? goalView(r.id) : r.v === "ach" ? ach() : home();
    w.dataset.v = r.v; w.scrollTop = 0;
  }

  /* ---------- импорт ---------- */
  function take(text) {
    let o = null; try { o = JSON.parse(text); } catch (e) {}
    if (!valid(o)) { say(L("Это не файл ассессмента", "Not an assessment file")); return false; }
    if (!put(KEY, o)) { say(L("Не удалось сохранить", "Could not save")); return false; }
    CC = null; loadAll(); say("✓ " + L("Ассессмент загружен", "Assessment loaded")); go("home"); return true;
  }

  function click(e) {
    const t = e.target.closest("button,input,a"); if (!t || !t.closest("#asmWrap")) return;
    if (t.tagName === "A") return;
    if (t.dataset.go) return go(t.dataset.go);
    if (t.dataset.imp === "file") { const f = document.getElementById("asmFile"); if (f) f.click(); return; }
    if (t.dataset.imp === "paste") { const p = wrap().querySelector(".asm-paste"); if (p) { p.hidden = false; const ta = p.querySelector("textarea"); if (ta) ta.focus(); } return; }
    if (t.dataset.imp === "go") { const ta = document.getElementById("asmTxt"); if (ta) take(ta.value); return; }
    if (t.dataset.ck) {                                                     /* на месте, без перерисовки: прокрутка не прыгает */
      if (t.checked) M.ck[t.dataset.ck] = Date.now(); else delete M.ck[t.dataset.ck]; saveM();
      const sp = t.nextElementSibling, sm = sp && sp.querySelector("small"); if (sm) sm.remove();
      if (sp && t.checked) sp.insertAdjacentHTML("beforeend", "<small>✓ " + E(dmy(new Date())) + "</small>");
      return;
    }
    if (t.dataset.act) { if (t.checked) M.act[t.dataset.act] = Date.now(); else delete M.act[t.dataset.act]; saveM(); return; }
    if (t.dataset.tab) { tab = t.dataset.tab; return draw(); }
    if (t.dataset.copy) return copyText(asText(), t);
    if (t.dataset.study) { const r = parse(); if (r.v === "goal") study(order(cache().byGoal[r.id] || [])); return; }
    if (t.dataset.term) { const r = parse(); if (r.v === "goal") study(order(cache().byTerm[r.id + "|" + t.dataset.term] || [])); return; }
    if (t.dataset.del) {
      /* подтверждение вторым нажатием: системных окон в приложении нет */
      if (!t.classList.contains("sure")) { t.classList.add("sure"); t.textContent = L("Точно удалить? Нажми ещё раз", "Sure? Tap again"); setTimeout(() => { if (t.isConnected) { t.classList.remove("sure"); t.textContent = L("Удалить с устройства", "Delete from device"); } }, 4000); return; }
      try { localStorage.removeItem(KEY); localStorage.removeItem(MY); } catch (er) {}
      CC = null; loadAll(); say(L("Данные ассессмента удалены", "Assessment data deleted")); return go("home");
    }
  }
  function change(e) {
    const t = e.target; if (!t.closest || !t.closest("#asmWrap")) return;
    if (t.id === "asmFile") { const f = t.files && t.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => take(String(r.result || "")); r.readAsText(f); t.value = ""; return; }
    if (t.id === "asmAppr") { M.approved = t.value || ""; saveM(); return draw(); }
  }
  let noteT = null;
  function input(e) {
    const t = e.target; if (!t.dataset || t.dataset.note == null || !t.closest("#asmWrap")) return;
    clearTimeout(noteT); const id = t.dataset.note, v = t.value;
    noteT = setTimeout(() => { if (v.trim()) M.notes[id] = v; else delete M.notes[id]; saveM(); }, 400);
  }

  /* ---------- связь с сайтом ---------- */
  window.asmUI = function () {
    document.body.classList.add("asm-on");                                  /* плавающая кнопка роадмапа закрывала стрелки строк */
    loadAll(); CC = null;                                                   /* прогресс и данные могли прийти из бэкапа */
    if (!ROUTE.test(location.hash)) { try { history.replaceState(null, "", "#asm"); } catch (e) {} }
    draw();
  };
  window.asmLeave = function () { document.body.classList.remove("asm-on"); if (ROUTE.test(location.hash)) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} } };
  /* «Назад» телефона: цель или достижения → главная раздела; на главной отдаём управление приложению */
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
  document.addEventListener("change", change);
  document.addEventListener("input", input);
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
#viewAsm h1,#viewAsm h2,#viewAsm h3,#viewAsm h4{margin:0;letter-spacing:-.3px}
.asm-hero{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:22px;padding:22px 20px 20px;margin-bottom:14px;
  background:radial-gradient(420px 220px at 0% 0%,rgba(124,140,255,.18),transparent 70%),radial-gradient(460px 240px at 100% 100%,rgba(47,211,197,.14),transparent 70%),var(--panel)}
.asm-kick{display:inline-block;font:700 11px var(--sans);letter-spacing:.8px;text-transform:uppercase;color:var(--a1);background:rgba(124,140,255,.12);border:1px solid rgba(124,140,255,.3);border-radius:99px;padding:4px 10px}
.asm-hero h1{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin:12px 0 6px;font-size:clamp(20px,5.6vw,34px);line-height:1.15}
.asm-hero h1 i{font-style:normal;color:var(--mut);font-size:.8em}
.asm-lv{padding:2px 10px;border-radius:12px;background:rgba(255,255,255,.06);border:1px solid var(--line)} .asm-lv.to{background:linear-gradient(90deg,rgba(124,140,255,.25),rgba(47,211,197,.22));border-color:rgba(124,140,255,.45)}
.asm-hero>p{margin:0 0 14px;color:var(--read);font-size:calc(14.5px * var(--ts));line-height:1.55;max-width:58ch}
.asm-due{display:grid;grid-template-columns:1fr auto;gap:2px 10px;align-items:center;border:1px solid rgba(110,168,254,.35);background:rgba(110,168,254,.08);border-radius:14px;padding:12px 14px;margin-bottom:12px}
.asm-due.soon{border-color:rgba(255,196,77,.5);background:rgba(255,196,77,.09)} .asm-due.late{border-color:rgba(255,107,107,.5);background:rgba(255,107,107,.09)}
.asm-due b{font-size:14px} .asm-due>span{grid-column:1;color:var(--read);font-size:13.5px} .asm-due small{grid-column:1/-1;color:var(--mut);font-size:12px;line-height:1.45;margin-top:4px}
.asm-appr{grid-column:2;grid-row:1/3;display:flex;flex-direction:column;align-items:flex-end;gap:2px;color:var(--mut);font-size:11px}
.asm-appr input{font:600 13px var(--sans);color:var(--txt);background:var(--panel-2);border:1px solid var(--line);border-radius:10px;padding:0 8px;min-height:44px;color-scheme:dark}
.asm-ready{display:grid;grid-template-columns:1fr auto;gap:6px 10px;align-items:baseline}
.asm-ready>span{color:var(--mut);font-size:13px} .asm-ready>b{font:800 22px var(--sans);font-variant-numeric:tabular-nums} .asm-ready .asm-bar,.asm-ready small{grid-column:1/-1} .asm-ready small{color:var(--mut);font-size:11.5px}
.asm-bar{display:block;height:6px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:6px} .asm-bar.big{height:9px}
.asm-bar i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--a1),var(--a2));transition:width .5s var(--ease,ease)}
.asm-ru{margin:0 0 12px;color:var(--warn);font-size:13px}
.asm-h{font-size:15px;margin:18px 4px 8px!important;color:var(--txt)}
.asm-list{display:flex;flex-direction:column;gap:8px}
.asm-g{display:flex;align-items:center;gap:10px;width:100%;text-align:left;font:inherit;color:inherit;cursor:pointer;border:1px solid var(--line);border-radius:16px;padding:12px 14px;background:var(--panel);min-height:64px;box-sizing:border-box;transition:border-color .15s}
.asm-g:hover{border-color:rgba(255,255,255,.22)} .asm-g:active{transform:scale(.99)}
.asm-g-t{flex:1;min-width:0;display:flex;flex-direction:column} .asm-g-t b{font-size:15.5px;line-height:1.3} .asm-g-t small{color:var(--mut);font-size:12px;margin-top:2px}
.asm-g-w{flex:none;font:700 12px var(--sans);color:var(--mut);font-variant-numeric:tabular-nums} .asm-chev{flex:none;font-size:20px;color:var(--mut)}
.asm-ach{margin-top:12px;background:linear-gradient(160deg,rgba(255,196,77,.10),transparent 60%),var(--panel)}
.asm-card{border:1px solid var(--line);border-radius:16px;padding:14px 16px;background:var(--panel);margin-bottom:10px}
.asm-card h4{font-size:14px;margin:2px 0 8px!important;color:var(--txt)} .asm-card h4:not(:first-child){margin-top:14px!important}
.asm-card p{margin:0 0 8px;color:var(--read);font-size:calc(14px * var(--ts));line-height:1.55}
.asm-dec{font-weight:650;color:var(--txt)!important}
.asm-ul{margin:0;padding-left:18px;color:var(--read);font-size:calc(14px * var(--ts));line-height:1.55} .asm-ul li{margin:4px 0}
.asm-ck{display:flex;gap:10px;align-items:flex-start;min-height:44px;padding:8px 2px;cursor:pointer;color:var(--read);font-size:calc(14px * var(--ts));line-height:1.5;box-sizing:border-box}
.asm-ck input{flex:none;width:20px;height:20px;margin:1px 0 0;accent-color:var(--a2)} .asm-ck small{display:block;color:var(--good);font-size:11.5px;margin-top:2px}
.asm-ck input:checked+span{color:var(--txt)}
.asm-dl{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;margin:10px 0 4px;font-size:13px} .asm-dl dt{color:var(--mut)} .asm-dl dd{margin:0;color:var(--read)}
.asm-link{display:inline-flex;align-items:center;min-height:44px;color:var(--acc);text-decoration:none;font-size:13.5px}
.asm-foot{margin-top:16px} .asm-priv{color:var(--mut);font-size:12.5px;line-height:1.5;margin:10px 2px}
.asm-btns{display:flex;flex-wrap:wrap;gap:8px} .asm-btns .btn{min-height:44px;padding:0 16px} .asm-btns .btn.ghost{background:transparent} .asm-del.sure{border-color:var(--bad);color:var(--bad)}
.asm-paste{margin-top:10px;display:flex;flex-direction:column;gap:8px} .asm-paste textarea,.asm-note{width:100%;box-sizing:border-box;font:13px/1.5 var(--mono);color:var(--txt);background:var(--panel-2);border:1px solid var(--line);border-radius:12px;padding:10px 12px;resize:vertical}
.asm-note{font-family:var(--sans);font-size:14px}
.asm-top{display:flex;align-items:center;margin:2px 0 8px} .asm-back{font:650 14px var(--sans);color:var(--acc);background:none;border:0;padding:0 8px 0 2px;min-height:44px;min-width:44px;cursor:pointer}
.asm-gh{margin:0 2px 12px} .asm-gh h2{font-size:clamp(21px,5.5vw,26px);line-height:1.2;margin-top:8px!important}
.asm-tr{display:flex;flex-direction:column;margin-bottom:10px;font-size:13.5px;color:var(--read)} .asm-tr b{font-size:16px;color:var(--txt)}
#viewAsm .asm-go{width:100%;flex-direction:column;align-items:flex-start;gap:2px;padding:12px 16px;text-align:left;min-height:52px;margin:4px 0 6px}
#viewAsm .asm-go small{font:600 12px var(--sans);opacity:.75}
.asm-hint{color:var(--mut)!important;font-size:12.5px!important;margin:10px 0 6px!important}
.asm-tms{display:flex;flex-wrap:wrap;gap:6px}
.asm-tm{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 12px;font:600 13px var(--sans);color:var(--txt);background:var(--panel-2);border:1px solid var(--line);border-radius:99px;cursor:pointer}
.asm-tm b{font-variant-numeric:tabular-nums;color:var(--mut);font-weight:700} .asm-tm.thin{border-color:rgba(255,196,77,.55);background:rgba(255,196,77,.08)} .asm-tm.thin b{color:var(--warn)}
.asm-tm:disabled{cursor:default;opacity:.75}
.asm-gap{margin:10px 0 0!important;color:var(--warn)!important;font-size:13px!important}
.asm-its{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.asm-card .asm-its{gap:10px}
.asm-it{border:1px solid var(--line);border-radius:14px;padding:12px 14px;background:var(--panel)} .asm-card .asm-it{background:var(--panel-2)}
.asm-it-h{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px} .asm-it-h b{font-size:14.5px;line-height:1.35;margin-right:auto}
.asm-it p{margin:6px 0 0;color:var(--read);font-size:calc(13.5px * var(--ts));line-height:1.55}
.asm-st{flex:none;font:700 10.5px var(--sans);letter-spacing:.2px;border-radius:99px;padding:3px 8px;white-space:nowrap}
.asm-st.ok{color:#0a0b12;background:var(--good)} .asm-st.part{color:#0a0b12;background:var(--warn)} .asm-st.no{color:var(--txt);background:rgba(255,255,255,.1)} .asm-st.doc{color:var(--txt);background:rgba(124,140,255,.25)}
.asm-scs{display:flex;flex-wrap:wrap;gap:4px 6px;margin-top:8px}
.asm-sc{display:inline-flex;align-items:center;min-height:36px;padding:0 10px;font:600 12px var(--mono);color:var(--acc);text-decoration:none;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.03)}
.asm-tips{background:linear-gradient(160deg,rgba(47,211,197,.08),transparent 60%),var(--panel)}
.asm-seg{display:flex;gap:4px;padding:4px;border:1px solid var(--line);border-radius:14px;background:var(--panel);margin-bottom:12px}
.asm-seg button{flex:1;min-height:44px;font:650 13px var(--sans);color:var(--mut);background:none;border:0;border-radius:10px;cursor:pointer}
.asm-seg button[aria-selected="true"]{color:var(--txt);background:var(--panel-2)}
.asm-how p{font-size:13px!important;color:var(--mut)!important}
.asm-nums{display:flex;flex-wrap:wrap;gap:8px 18px;margin:4px 0 8px} .asm-nums span{display:flex;flex-direction:column;color:var(--mut);font-size:12px} .asm-nums b{font:800 20px var(--sans);color:var(--txt);font-variant-numeric:tabular-nums}
.asm-goals{color:var(--mut);font-size:12.5px;margin:-4px 4px 8px;line-height:1.5}
`;
  document.head.appendChild(css);
})();

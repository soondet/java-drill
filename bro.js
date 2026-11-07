/* 🐍 Раздел «Python и C++» — курс с нуля для младшего брата.
 *
 * Отдельный от Java по смыслу и по данным: уроки лежат в bro-py.js и bro-cpp.js и грузятся при первом входе
 * (остальным сайт не тяжелеет), прогресс — свой ключ jdBro. Карточки, интервалы, роадмап и статистика тренажёра
 * про этот раздел не знают и знать не должны.
 *
 * Адреса: #bro — оба курса, #bro/py — курс, #bro/py-vars — урок. «Назад» браузера ходит по ним, ссылку на урок
 * можно переслать. В приложении «Назад» телефона зовёт broBack (app-native-late.js).
 *
 * Уроки написаны своими словами по плану двух книг (Сузи «Язык программирования Python» и «C++ Language Tutorial»
 * с cplusplus.com) и переведены на современные версии языков. Самих книг здесь нет: у второй прямой запрет на
 * распространение. Вывод каждого примера проверен настоящим запуском — verify-bro.js. */
(function () {
  const KEY = "jdBro", PIN = "jdBroHome";
  const TRACKS = {
    py: { name: "Python", ico: "🐍", file: "bro-py.js",
      ru: "Самый понятный язык для старта: пишешь меньше, результат видно сразу. На нём делают ботов, сайты, анализ данных и ИИ.",
      en: "The friendliest first language: less code, instant results. Used for bots, websites, data and AI.",
      book: "по курсу Р. Сузи «Язык программирования Python» — на Python 3" },
    cpp: { name: "C++", ico: "⚙️", file: "bro-cpp.js",
      ru: "Язык игр, браузеров и всего, где важна скорость. Строже Python: научит думать о типах и памяти.",
      en: "The language of games, browsers and anything that must be fast. Stricter than Python: teaches types and memory.",
      book: "по «C++ Language Tutorial» с cplusplus.com — на C++20" },
  };
  const ORDER = ["py", "cpp"];
  const ROUTE = /^#bro(\/|$)/;

  /* ---------- мелочи ---------- */
  const native = () => document.documentElement.classList.contains("native-app");
  const en = () => typeof LANG !== "undefined" && LANG === "en";
  const L = (ru, e) => en() ? e : ru;
  const E = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const pl = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 10 || h >= 20) ? b : c; };
  const lessons = n => n + " " + L(pl(n, "урок", "урока", "уроков"), n === 1 ? "lesson" : "lessons");
  const hash = s => { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; };

  /* ---------- прогресс: по id урока, никогда по номеру — порядок уроков может меняться ---------- */
  function load() { try { const p = JSON.parse(localStorage.getItem(KEY)); if (p && typeof p === "object") return Object.assign({ d: {}, q: {}, last: null }, p); } catch (e) {} return { d: {}, q: {}, last: null }; }
  let P = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {} };
  const pinned = () => { try { return localStorage.getItem(PIN) === "1"; } catch (e) { return false; } };
  const setPin = on => { try { on ? localStorage.setItem(PIN, "1") : localStorage.removeItem(PIN); } catch (e) {} };

  /* ---------- данные: грузим при первом входе ---------- */
  let I = null, loading = null, arrived = false;
  const has = t => (window.BRO_CH || []).some(c => c.track === t);
  function need() {
    if (ORDER.every(has)) return Promise.resolve();
    if (!loading) loading = Promise.all(ORDER.filter(t => !has(t)).map(t => new Promise((res, rej) => {
      const s = document.createElement("script"); s.src = TRACKS[t].file; s.async = true;
      s.onload = res; s.onerror = () => rej(new Error(TRACKS[t].file)); document.head.appendChild(s);
    }))).then(() => { I = null; }, e => { loading = null; throw e; });
    return loading;
  }
  function idx() {
    if (I) return I;
    const T = { py: [], cpp: [] }, byId = {}, flat = { py: [], cpp: [] };
    for (const ch of window.BRO_CH || []) {
      if (!T[ch.track]) continue;
      T[ch.track].push(ch);
      for (const l of ch.ls || []) { byId[l.id] = { l, ch, tr: ch.track, n: flat[ch.track].length }; flat[ch.track].push(l.id); }
    }
    return (I = { T, byId, flat });
  }
  function stats(t) {
    const f = idx().flat[t], d = f.filter(id => P.d[id]).length;
    const next = f.find(id => !P.d[id]) || null;
    let qa = 0, qok = 0;
    f.forEach(id => (P.q[id] || []).forEach(v => { if (v != null) { qa++; qok += v; } }));
    return { n: f.length, d, pct: f.length ? Math.round(d / f.length * 100) : 0, next, chs: idx().T[t].length, qa, qok };
  }
  /* куда ведёт «Продолжить»: открытый последним, если не пройден; иначе следующий в том же курсе */
  function resume() {
    const B = idx().byId, last = P.last && B[P.last];
    if (last && !P.d[P.last]) return P.last;
    const t = last ? last.tr : "py";
    return stats(t).next || ORDER.map(x => stats(x).next).find(Boolean) || null;
  }

  /* ---------- подсветка: те же классы, что у Java на сайте (c-k, c-s, c-cm, c-an, c-n) ---------- */
  const PYK = "False|None|True|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|raise|return|try|while|with|yield";
  const PYB = "print|len|range|int|str|float|bool|list|dict|set|tuple|input|type|sum|min|max|abs|sorted|reversed|enumerate|zip|map|filter|open|isinstance|super|round|iter|next|any|all|repr|self|object";
  const CK = "alignas|auto|bool|break|case|catch|char|class|const|constexpr|consteval|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|extern|false|final|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|reinterpret_cast|return|short|signed|sizeof|size_t|static|static_assert|static_cast|struct|switch|template|this|throw|true|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|while";
  const RE = {
    py: new RegExp("(#[^\\n]*)|((?:\\b[rRbBfFuU]{1,2})?(?:\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'))|(^[ ]*@[\\w.]+)|\\b(\\d[\\d_]*\\.?\\d*(?:e[+-]?\\d+)?j?)\\b|\\b(" + PYK + ")\\b|\\b(" + PYB + ")\\b(?=\\s*[(.])", "gm"),
    cpp: new RegExp("(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)|(\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*')|(^[ ]*#[^\\n]*)|\\b(0[xXbB][\\da-fA-F']+|\\d[\\d']*\\.?\\d*(?:e[+-]?\\d+)?[uUlLfF]*)\\b|\\b(" + CK + ")\\b|\\b(std)(?=::)", "gm"),
  };
  /* на вход — уже экранированный текст: так же устроена hl() у Java */
  const hlE = (s, lang) => s.replace(RE[lang] || RE.py, (m, c, st, an, n, k, b) =>
    c ? '<span class="c-cm">' + c + "</span>" : st ? '<span class="c-s">' + st + "</span>" : an ? '<span class="c-an">' + an + "</span>"
      : n ? '<span class="c-n">' + n + "</span>" : k ? '<span class="c-k">' + k + "</span>" : b ? '<span class="c-an">' + b + "</span>" : m);
  /* шрифт кода подгоняется под самую длинную строку блока (--n): короткий код — крупно, 44 знака — влезают в 360px */
  const cols = c => Math.max(30, ...String(c).split("\n").map(x => x.length));
  const hl = (code, lang) => hlE(E(code).replace(/&quot;/g, '"'), lang);

  /* ---------- текст урока: **жирный**, `код`, абзацы, списки «- », блоки ``` ---------- */
  function inline(s) {
    const code = [];
    s = s.replace(/`([^`\n]+)`/g, (m, c) => { code.push("<code>" + c + "</code>"); return "\u0001" + (code.length - 1) + "\u0001"; });
    s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    return s.replace(/\u0001(\d+)\u0001/g, (m, i) => code[+i]);
  }
  function md(t, lang) {
    let s = E(t).replace(/&quot;/g, '"');
    const fence = [];
    s = s.replace(/```[a-z+]*\n?([\s\S]*?)```/g, (m, c) => { fence.push('<div class="bro-fence"><pre class="code bro-code" style="--n:' + cols(c.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")) + '">' + hlE(c.replace(/\n+$/, ""), lang) + "</pre></div>"); return "\n\n\u0000" + (fence.length - 1) + "\u0000\n\n"; });
    return s.split(/\n\s*\n/).map(b => {
      const f = b.trim().match(/^\u0000(\d+)\u0000$/); if (f) return fence[+f[1]];
      if (!b.trim()) return "";
      const ln = b.trim().split("\n");
      if (ln.every(x => /^\s*[-•]\s+/.test(x))) return "<ul>" + ln.map(x => "<li>" + inline(x.replace(/^\s*[-•]\s+/, "")) + "</li>").join("") + "</ul>";
      return "<p>" + inline(b.trim()).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }
  const mdi = t => inline(E(t).replace(/&quot;/g, '"')).replace(/\n/g, "<br>");

  /* C++-фрагмент без main → для копирования дописываем заголовки и main, чтобы вставка в онлайн-компилятор сразу собиралась */
  const HDR = [["iostream", /std::(cout|cin|cerr|endl|getline|ws)\b/], ["string", /std::(string|to_string|stoi|stod|stol)\b/], ["vector", /std::vector\b/],
    ["array", /std::array\b/], ["map", /std::map\b/], ["set", /std::set\b/], ["unordered_map", /std::unordered_map\b/], ["unordered_set", /std::unordered_set\b/],
    ["algorithm", /std::(sort|find|find_if|count|count_if|max_element|min_element|reverse|max|min|swap|transform|for_each|fill)\b/], ["numeric", /std::(accumulate|iota)\b/],
    ["memory", /std::(unique_ptr|shared_ptr|make_unique|make_shared)\b/], ["sstream", /std::(stringstream|istringstream|ostringstream)\b/],
    ["cmath", /std::(sqrt|pow|abs|round|floor|ceil|fabs)\b/], ["iomanip", /std::(setw|setprecision|fixed|setfill)\b/], ["optional", /std::optional\b/],
    ["functional", /std::function\b/], ["cstring", /\b(strlen|strcpy|strcmp|strcat)\b/], ["limits", /std::numeric_limits\b/], ["climits", /\b(INT_MAX|INT_MIN)\b/],
    ["utility", /std::(pair|move|make_pair)\b/], ["stdexcept", /std::(runtime_error|out_of_range|invalid_argument|logic_error)\b/]];
  const isFrag = (c, t) => t === "cpp" && !/\bint\s+main\s*\(/.test(c);
  function asProgram(c, t) {
    if (!isFrag(c, t)) return c;
    const h = HDR.filter(x => x[1].test(c)).map(x => "#include <" + x[0] + ">");
    if (!h.includes("#include <iostream>")) h.unshift("#include <iostream>");
    return h.join("\n") + "\n\nint main() {\n" + c.split("\n").map(x => x ? "    " + x : x).join("\n") + "\n}\n";
  }
  /* Python Tutor показывает выполнение по шагам: переменные, стрелки на объекты. Только для того, что он умеет запустить. */
  const tutorOk = (e, t) => t === "py" && e.run !== false && !/\bimport\s+(numpy|tkinter|threading|asyncio|sqlite3|requests|urllib|concurrent|dis|inspect)|open\(/.test(e.c) && e.c.length < 2500;
  const tutorUrl = e => "https://pythontutor.com/visualize.html#code=" + encodeURIComponent(e.c) + "&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON="
    + encodeURIComponent(JSON.stringify(e.inp ? e.inp.replace(/\n$/, "").split("\n") : [])) + "&textReferences=false";

  /* ---------- маршрут ---------- */
  function parse() {
    const r = (location.hash.match(/^#bro\/?([\w-]*)/) || [, ""])[1];
    if (!r) return { v: "home" };
    if (TRACKS[r]) return { v: "track", tr: r };
    const b = I && I.byId[r];
    return b ? { v: "lesson", tr: b.tr, id: r } : { v: r.startsWith("cpp-") ? "cpp" : "home", tr: null, want: r };
  }
  function go(to) {
    const h = to === "home" ? "#bro" : "#bro/" + to;
    if (location.hash === h) draw(); else location.hash = h;      /* hashchange нарисует */
  }
  const wrap = () => document.getElementById("broWrap");

  /* ---------- главная: оба курса ---------- */
  const ring = (pct, big) => '<svg class="bro-ring' + (big ? " big" : "") + '" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="19" class="bg"/>'
    + (pct ? '<circle cx="22" cy="22" r="19" class="fg" stroke-dasharray="' + (pct * 1.1938).toFixed(1) + ' 119.4"/>' : "") + '</svg><b class="bro-pct">' + pct + "<small>%</small></b>";
  function home() {
    const r = resume(), any = Object.keys(P.d).length > 0 || !!P.last, rl = r && idx().byId[r];
    const go1 = rl ? '<button class="btn primary bro-cta" data-go="' + r + '"><span>' + (any ? L("Продолжить", "Continue") : L("Начать с первого урока", "Start the first lesson")) + "</span><small>"
      + E(TRACKS[rl.tr].name + " · " + rl.l.t) + "</small></button>" : '<p class="bro-all">🎉 ' + L("Оба курса пройдены. Дальше — свой проект: бот, игра, сайт.", "Both courses done. Next: your own project.") + "</p>";
    const ask = arrived && !pinned() && !P.asked
      ? '<div class="bro-ask"><div><b>' + L("Открывать сайт сразу здесь?", "Open the site right here?") + "</b><span>" + L("Тогда при входе ты будешь попадать в свои уроки, а не в тренажёр по Java.", "You'll land in your lessons instead of the Java trainer.") + "</span></div>"
        + '<div class="bro-ask-b"><button class="btn" data-pin="1">' + L("Да", "Yes") + '</button><button class="btn ghost" data-pin="0">' + L("Не надо", "No") + "</button></div></div>" : "";
    const card = t => {
      const s = stats(t), T = TRACKS[t];
      return '<button class="bro-tc ' + t + '" data-go="' + t + '"><span class="bro-tc-top"><span class="bro-logo ' + t + '" aria-hidden="true">' + (t === "py" ? "🐍" : "C++") + "</span>"
        + '<span class="bro-tc-n"><b>' + T.name + (t === "py" ? ' <span class="bro-badge">' + L("начни с него", "start here") + "</span>" : "") + "</b><small>" + lessons(s.n) + " · " + s.chs + " " + L(pl(s.chs, "глава", "главы", "глав"), "chapters") + "</small></span>"
        + '<span class="bro-tc-r">' + ring(s.pct) + "</span></span>"
        + '<span class="bro-tc-d">' + E(L(T.ru, T.en)) + '</span><span class="bro-tc-f">' + (s.d ? s.d + " " + L("из", "of") + " " + s.n + " · " : "") + E(L(T.book, "Russian lessons")) + ' <i>›</i></span></button>';
    };
    return '<div class="bro-hero"><span class="bro-kick">' + L("Курс с нуля", "From-zero course") + "</span>"
      + "<h1>" + L("Учимся программировать", "Learn to code") + "</h1>"
      + "<p>" + L("Два языка — Python и C++. Каждый урок: объяснение простыми словами, пример, который можно «запустить», пара вопросов и задачка. 15–20 минут.",
        "Two languages, Python and C++. Each lesson: a plain explanation, a runnable example, a couple of questions and a task.") + "</p>" + go1 + "</div>"
      + (en() ? '<p class="bro-ru">' + "The lessons themselves are in Russian." + "</p>" : "") + ask
      + '<div class="bro-tracks">' + ORDER.map(card).join("") + "</div>"
      + '<section class="bro-how"><h3>' + L("Как учиться, чтобы получилось", "How to make it stick") + "</h3><ul>"
      + "<li><b>" + L("Каждый день понемногу.", "A little every day.") + "</b> " + L("20 минут ежедневно дают больше, чем три часа в выходной.", "20 minutes daily beats three hours on Sunday.") + "</li>"
      + "<li><b>" + L("Сначала угадай вывод,", "Guess the output first,") + "</b> " + L("потом жми «Запустить». Так учишься читать код, а не только смотреть на него.", "then press Run. That's how you learn to read code.") + "</li>"
      + "<li><b>" + L("Набирай руками.", "Type it yourself.") + "</b> " + L("Скопировать — не то же самое: пальцы запоминают синтаксис.", "Copying isn't the same: your fingers learn the syntax.") + "</li>"
      + "<li><b>" + L("Ошибка — это подсказка.", "An error is a hint.") + "</b> " + L("Читай сообщение снизу вверх: там написано, что сломалось и в какой строке.", "Read it bottom-up: it says what broke and where.") + "</li></ul>"
      + '<div class="bro-links"><span>' + L("Где запускать код:", "Where to run code:") + "</span>"
      + '<a href="https://www.programiz.com/python-programming/online-compiler/" target="_blank" rel="noopener">Python ' + L("онлайн", "online") + " ↗</a>"
      + '<a href="https://www.onlinegdb.com/online_c++_compiler" target="_blank" rel="noopener">C++ ' + L("онлайн", "online") + " ↗</a>"
      + '<a href="https://pythontutor.com/" target="_blank" rel="noopener">' + L("По шагам", "Step by step") + " ↗</a></div></section>"
      + '<label class="bro-pin"><input type="checkbox" id="broPin"' + (pinned() ? " checked" : "") + "><span>" + (native() ? L("Открывать приложение сразу в этом разделе", "Open the app in this section") : L("Открывать сайт сразу в этом разделе", "Open the site in this section")) + "</span></label>"
      + '<p class="bro-src">📖 ' + L("Порядок тем — по двум книгам: Р. Сузи «Язык программирования Python» и «C++ Language Tutorial» (cplusplus.com). Тексты и примеры свои, на современных версиях языков; уроки с пометкой «сверх книги» — то, чего в книгах нет, но без чего сейчас не пишут. Вывод каждого примера проверен запуском.",
        "Topic order follows two books; the texts and examples are original and use current language versions.") + "</p>";
  }

  /* ---------- курс: главы и путь уроков ---------- */
  function track(t, from) {
    const s = stats(t), T = TRACKS[t], X = idx();
    const nx = s.next && X.byId[s.next];
    let n = 0;
    const chs = X.T[t].map((ch, ci) => {
      const ids = ch.ls.map(l => l.id), d = ids.filter(id => P.d[id]).length;
      return '<section class="bro-ch' + (d === ids.length ? " full" : "") + '"><header><span class="bro-ch-k">' + L("Глава", "Chapter") + " " + (ci + 1) + "</span>"
        + "<b>" + E(ch.t) + "</b><small>" + E(ch.s) + '</small><span class="bro-ch-c">' + d + "/" + ids.length + "</span></header><ol class=\"bro-path\">"
        + ch.ls.map(l => { n++; const st = P.d[l.id] ? "done" : l.id === s.next ? "next" : "";
          return '<li><button class="bro-l ' + st + (l.id === from ? " from" : "") + '" data-go="' + l.id + '"><span class="bro-dot">' + (st === "done" ? "✓" : n) + "</span>"
            + '<span class="bro-lt"><b>' + E(l.t) + "</b><small>" + E(l.s) + "</small></span>" + (l.x ? '<span class="bro-x" title="' + L("этого урока нет в книге", "not in the book") + '">' + L("сверх книги", "extra") + "</span>" : "") + "</button></li>"; }).join("")
        + "</ol>" + (ch.book ? '<footer class="bro-book">📖 ' + L("В книге", "In the book") + ": " + E(ch.book) + "</footer>" : "") + "</section>";
    }).join("");
    return '<div class="bro-top"><button class="bro-back" data-go="home">‹ ' + L("Все курсы", "All courses") + "</button></div>"
      + '<div class="bro-thead ' + t + '"><span class="bro-logo ' + t + '" aria-hidden="true">' + (t === "py" ? "🐍" : "C++") + '</span><div class="bro-th-t"><h2>' + T.name + "</h2><small>"
      + s.d + " " + L("из", "of") + " " + lessons(s.n) + (s.qa ? " · " + L("с первого раза верно", "first-try right") + " " + Math.round(s.qok / s.qa * 100) + "%" : "") + "</small></div>"
      + '<span class="bro-tc-r">' + ring(s.pct, 1) + "</span></div>"
      + (s.d === s.n && s.n ? '<div class="bro-win">🎉 <b>' + L("Курс пройден!", "Course complete!") + "</b> " + (t === "py" ? L("Дальше — C++ или свой маленький проект: бот, игра, парсер.", "Next: C++ or a small project.") : L("Теперь ты знаешь, как устроены программы изнутри. Дальше — свой проект.", "Next: your own project.")) + "</div>" : "")
      + (nx ? '<button class="btn primary bro-cta" data-go="' + s.next + '"><span>' + (s.d ? L("Продолжить", "Continue") : L("Начать", "Start")) + "</span><small>" + E(nx.l.t) + "</small></button>" : "")
      + chs
      + (s.d ? '<button class="bro-reset" data-reset="' + t + '">↻ ' + L("Сбросить прогресс курса", "Reset course progress") + "</button>" : "");
  }

  /* ---------- урок ---------- */
  function example(e, i, t, id) {
    const frag = isFrag(e.c, t), comp = e.err === "compile";
    const out = e.run === false ? "" : '<div class="bro-out" hidden><span class="bro-out-h">' + (comp ? L("Компилятор", "Compiler") : L("Вывод программы", "Program output")) + "</span>"
      + (comp ? '<pre class="bro-err">✗ ' + L("Не скомпилируется — программа даже не соберётся. Почему — в подписи к примеру.", "Won't compile — see the caption for why.") + "</pre>"
        : (e.out ? "<pre>" + E(e.out) + "</pre>" : !e.err ? '<pre class="bro-none">' + L("(программа ничего не вывела)", "(no output)") + "</pre>" : "")
          + (e.inp ? '<span class="bro-err-n">' + L("Здесь показано только то, что напечатала программа. То, что ты вводишь с клавиатуры, в терминале тоже видно — между строками вывода, сразу после вопроса.", "Only what the program printed is shown; in a terminal your typed input appears between these lines.") + "</span>" : "")
          + (e.err ? '<pre class="bro-err">✗ ' + E(e.err) + '</pre><span class="bro-err-n">' + L("Программа упала — так и задумано: смотри, на какой строке и почему.", "The program crashed on purpose — see where and why.")
            + (t === "py" ? " " + L("Текст ошибки — из Python 3.14, в других версиях слова могут чуть отличаться.", "Message text is from Python 3.14.") : "") + "</span>" : "")) + "</div>";
    return '<figure class="bro-ex" data-ex="' + i + '"><figcaption><span class="bro-cap"><span>' + (i < 0 ? L("Решение", "Solution") : L("Пример", "Example") + " " + (i + 1)) + (e.n ? " · " + E(e.n) : "") + "</span>"
      + (frag ? '<span class="bro-frag">' + L("фрагмент · внутри main()", "fragment · inside main()") + "</span>" : "") + "</span>"
      + '<button class="bro-copy" data-copy="' + id + ":" + i + '" aria-label="' + L("Скопировать код", "Copy code") + '" title="' + L("Скопировать код", "Copy code") + '">⧉</button></figcaption>'
      + '<div class="bro-cb"><pre class="code bro-code" style="--n:' + cols(e.c) + '">' + hl(e.c, t) + "</pre></div>"
      + (e.inp ? '<div class="bro-inp"><span>⌨ ' + L("Ввод с клавиатуры", "Keyboard input") + "</span><pre>" + E(e.inp.replace(/\n$/, "")) + "</pre></div>" : "")
      + '<div class="bro-run-row">' + (e.run === false ? '<span class="bro-norun">' + L("Здесь не запустить — попробуй у себя", "Can't run here — try it yourself") + "</span>"
        : '<button class="bro-run" data-run="' + i + '">▶ ' + (comp ? L("Собрать", "Build") : L("Запустить", "Run")) + "</button>")
      + (tutorOk(e, t) ? '<a class="bro-tutor" href="' + E(tutorUrl(e)) + '" target="_blank" rel="noopener">👣 ' + L("по шагам", "step by step") + " ↗</a>" : "") + "</div>" + out + "</figure>";
  }
  function order(id, i, n) {   /* перемешиваем варианты, но одинаково при каждом показе: место не прыгает */
    return Array.from({ length: n }, (_, k) => k).sort((a, b) => hash(id + i + "." + a) - hash(id + i + "." + b));
  }
  function question(q, i, t, id) {
    return '<div class="bro-q" data-q="' + i + '"><div class="bro-qq"><span class="bro-qn">' + (i + 1) + "</span>" + md(q.q, t) + "</div>"
      + '<div class="bro-opts">' + order(id, i, q.o.length).map(k => '<button class="bro-o" data-k="' + k + '">' + mdi(q.o[k]) + "</button>").join("") + "</div>"
      + '<div class="bro-qe" hidden>' + md(q.e, t) + "</div></div>";
  }
  function lesson(id) {
    const X = idx(), b = X.byId[id], l = b.l, t = b.tr, f = X.flat[t], k = b.n, ch = b.ch;
    const prev = f[k - 1], next = f[k + 1], done = !!P.d[id];
    const segs = ch.ls.map(x => '<i class="bro-seg' + (P.d[x.id] ? " done" : "") + (x.id === id ? " cur" : "") + '"></i>').join("");
    const task = l.task ? '<section class="bro-task"><h3>✍️ ' + L("Попробуй сам", "Try it yourself") + "</h3>" + md(l.task.t, t)
      + "<details><summary>" + L("Подсказка", "Hint") + "</summary>" + md(l.task.hint, t) + "</details>"
      + "<details><summary>" + L("Показать решение", "Show solution") + "</summary>" + example({ c: l.task.sol, out: l.task.out, inp: l.task.inp, run: l.task.run, err: l.task.err }, -1, t, id) + "</details></section>" : "";
    return '<div class="bro-top"><button class="bro-back" data-go="' + t + '">‹ ' + TRACKS[t].name + '</button><span class="bro-pos">' + L("Урок", "Lesson") + " " + (k + 1) + " " + L("из", "of") + " " + f.length + "</span></div>"
      + '<div class="bro-segs" aria-hidden="true">' + segs + "</div>"
      + '<article class="bro-les ' + t + '"><span class="bro-chn">' + E(ch.t) + "</span><h2>" + E(l.t) + "</h2>"
      + '<p class="bro-sub">' + E(l.s) + (l.x ? ' <span class="bro-x">' + L("сверх книги", "extra") + "</span>" : "") + (done ? ' <span class="bro-ok">✓ ' + L("пройден", "done") + "</span>" : "") + "</p>"
      + '<div class="bro-text">' + md(l.p, t) + "</div>"
      + l.ex.map((e, i) => example(e, i, t, id)).join("")
      + '<div class="bro-tip"><b>💡 ' + L("Запомни", "Remember") + "</b>" + md(l.tip, t) + "</div>"
      + '<div class="bro-bug"><b>⚠️ ' + L("Частая ошибка", "Common mistake") + "</b>" + md(l.bug, t) + "</div>"
      + '<section class="bro-quiz"><h3>' + L("Проверь себя", "Check yourself") + "</h3>" + l.q.map((q, i) => question(q, i, t, id)).join("") + "</section>"
      + task + "</article>"
      + '<div class="bro-fin">' + (done
        ? (next ? '<button class="btn primary bro-cta" data-go="' + next + '"><span>' + L("Дальше", "Next") + " ›</span><small>" + E(X.byId[next].l.t) + "</small></button>" : '<button class="btn primary bro-cta" data-go="' + t + '"><span>' + L("К списку уроков", "Back to lessons") + "</span></button>")
          + '<button class="bro-undo" data-undo="' + id + '">' + L("снять отметку «пройден»", "mark as not done") + "</button>"
        : '<button class="btn primary bro-cta" data-done="' + id + '"><span>✓ ' + (next ? L("Урок пройден — дальше", "Done — next") : L("Завершить курс", "Finish the course")) + "</span>" + (next ? "<small>" + E(X.byId[next].l.t) + "</small>" : "") + "</button>")
      + '<div class="bro-pn">' + (prev ? '<button class="btn" data-go="' + prev + '">‹ ' + L("Назад", "Back") + "</button>" : "") + '<button class="btn" data-go="' + t + '">' + L("Все уроки", "All lessons") + "</button></div></div>";
  }

  /* ---------- отрисовка ---------- */
  function draw() {
    const w = wrap(); if (!w) return;
    if (!ORDER.every(has)) {
      w.innerHTML = '<div class="bro-load">' + L("Загружаю уроки…", "Loading lessons…") + "</div>";
      need().then(draw, e => { w.innerHTML = '<div class="bro-load bad">' + L("Уроки не загрузились (" + E(e.message) + "). Проверь интернет и открой раздел ещё раз.", "Lessons failed to load. Check the connection and retry.") + "</div>"; });
      return;
    }
    idx();
    const r = parse();
    if (r.want) { try { history.replaceState(null, "", "#bro"); } catch (e) {} return draw(); }   /* урок переименован или ссылка битая */
    const from = r.v === "track" && P.last && I.byId[P.last] && I.byId[P.last].tr === r.tr ? P.last : null;
    if (r.v === "lesson" && P.last !== r.id) { P.last = r.id; save(); }
    w.innerHTML = r.v === "lesson" ? lesson(r.id) : r.v === "track" ? track(r.tr, from) : home();
    w.dataset.v = r.v;
    const row = from && w.querySelector(".bro-l.from");
    if (row && row.scrollIntoView) row.scrollIntoView({ block: "center" }); else w.scrollTop = 0;
    if (typeof trDeep === "function" && en()) { try { trDeep(w); } catch (e) {} }
  }

  function copyText(text, btn) {
    const ok = () => { btn.classList.add("ok"); btn.textContent = "✓"; setTimeout(() => { btn.classList.remove("ok"); btn.textContent = "⧉"; }, 1300); };
    const old = () => { const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} ta.remove(); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, old); else old();
  }

  function click(e) {
    const t = e.target.closest("button,input,a"); if (!t || !t.closest("#broWrap")) return;
    if (t.tagName === "A") return;
    if (t.id === "broPin") { setPin(t.checked); return; }
    const X = idx(), r = parse();
    if (t.dataset.go) return go(t.dataset.go);
    if (t.dataset.pin != null) { setPin(t.dataset.pin === "1"); P.asked = 1; save(); draw(); return; }
    if (t.dataset.done) {
      const id = t.dataset.done, b = X.byId[id], nx = X.flat[b.tr][b.n + 1];
      P.d[id] = 1; save();
      if (typeof toast === "function") { try { toast("✓ " + L("Урок засчитан", "Lesson done")); } catch (er) {} }
      return go(nx || b.tr);
    }
    if (t.dataset.undo) { delete P.d[t.dataset.undo]; save(); return draw(); }
    if (t.dataset.reset) {
      const tr = t.dataset.reset;
      /* подтверждение вторым нажатием: системных окон в приложении нет (их сторожит гейт) */
      if (!t.classList.contains("sure")) { t.classList.add("sure"); t.textContent = L("Точно сбросить? Нажми ещё раз", "Sure? Tap again"); setTimeout(() => { if (t.isConnected) { t.classList.remove("sure"); t.textContent = "↻ " + L("Сбросить прогресс курса", "Reset course progress"); } }, 4000); return; }
      X.flat[tr].forEach(id => { delete P.d[id]; delete P.q[id]; }); if (P.last && X.byId[P.last] && X.byId[P.last].tr === tr) P.last = null; save(); return draw();
    }
    if (t.dataset.copy) {
      const [id, i] = t.dataset.copy.split(":"), b = X.byId[id], l = b.l;
      const c = +i < 0 ? l.task.sol : l.ex[+i].c; return copyText(asProgram(c, b.tr), t);
    }
    if (t.dataset.run != null) {
      const out = t.closest(".bro-ex").querySelector(".bro-out"); if (!out) return;
      out.hidden = false; out.classList.remove("show"); void out.offsetWidth; out.classList.add("show");
      if (!/↻/.test(t.textContent)) t.textContent = "↻ " + L("Ещё раз", "Again");
      return;
    }
    if (t.classList.contains("bro-o")) {
      const box = t.closest(".bro-q"); if (box.classList.contains("answered")) return;
      const k = +t.dataset.k, i = +box.dataset.q, id = r.id;
      box.classList.add("answered");
      box.querySelectorAll(".bro-o").forEach(o => { o.disabled = true; const kk = +o.dataset.k; o.classList.add(kk === 0 ? "ok" : kk === k ? "no" : "dim"); });
      const ex = box.querySelector(".bro-qe"); ex.hidden = false; ex.insertAdjacentHTML("afterbegin", '<b class="' + (k === 0 ? "y" : "n") + '">' + (k === 0 ? "✓ " + L("Верно", "Right") : "✗ " + L("Не совсем", "Not quite")) + "</b>");
      if (id) { const q = P.q[id] || (P.q[id] = []); if (q[i] == null) { q[i] = k === 0 ? 1 : 0; save(); } }
      if (typeof jdHaptic === "function") { try { jdHaptic(k === 0 ? "good" : "bad"); } catch (er) {} }
    }
  }

  /* ---------- связь с сайтом ---------- */
  window.broUI = function () {
    document.body.classList.add("bro-on");                                  /* кнопка роадмапа Java здесь не нужна */
    P = load();                                                             /* прогресс могли восстановить из бэкапа — берём свежий */
    if (!ROUTE.test(location.hash)) { try { history.replaceState(null, "", "#bro"); } catch (e) {} }
    draw();
  };
  /* ушли в другой раздел — убираем #bro из адреса, иначе перезагрузка вернёт сюда */
  window.broLeave = function () { document.body.classList.remove("bro-on"); if (ROUTE.test(location.hash)) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} } };
  /* «Назад» телефона: урок → курс → оба курса; на главной раздела отдаём управление приложению */
  window.broBack = function () {
    if (typeof mode === "undefined" || mode !== "bro") return false;
    const r = parse();
    if (r.v === "lesson") { go(r.tr); return true; }
    if (r.v === "track") { go("home"); return true; }
    return false;
  };
  window.broPinned = pinned;

  addEventListener("hashchange", () => {
    if (!ROUTE.test(location.hash) || typeof setMode !== "function") return;
    if (typeof mode !== "undefined" && mode === "bro") draw(); else setMode("bro");
  });
  document.addEventListener("click", click);

  /* старт: по ссылке #bro… или если раздел сделан стартовым. В приложении стартовый экран выбирает app-native-late.js. */
  function boot() {
    if (native() || typeof setMode !== "function") return;
    arrived = ROUTE.test(location.hash);
    if (!arrived && !pinned()) return;
    document.querySelectorAll(".onb").forEach(x => x.remove());          /* приветствие тренажёра Java здесь не к месту */
    setMode("bro");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else setTimeout(boot, 0);

  /* ---------- стили: токены сайта, в приложении они уже переопределены в тон ---------- */
  const css = document.createElement("style"); css.id = "broCss";
  css.textContent = `
#viewBro .terms-wrap{display:block;overflow-y:auto;overscroll-behavior:contain;padding-bottom:48px;--py:#ffd43b;--cpp:#5fb0ff}
#viewBro .bro-load{padding:48px 8px;text-align:center;color:var(--mut)} #viewBro .bro-load.bad{color:var(--bad)}
#viewBro h1,#viewBro h2,#viewBro h3{margin:0;letter-spacing:-.3px}
.bro-hero{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:22px;padding:24px 22px 22px;margin-bottom:14px;
  background:radial-gradient(420px 220px at 0% 0%,rgba(255,212,59,.16),transparent 70%),radial-gradient(460px 240px at 100% 100%,rgba(95,176,255,.18),transparent 70%),var(--panel)}
.bro-kick{display:inline-block;font:700 11px var(--sans);letter-spacing:.8px;text-transform:uppercase;color:var(--py);background:rgba(255,212,59,.12);border:1px solid rgba(255,212,59,.28);border-radius:99px;padding:4px 10px}
.bro-hero h1{margin:12px 0 8px;font-size:clamp(26px,6vw,36px);line-height:1.12;background:linear-gradient(90deg,#fff 10%,#ffe9a3 50%,#bfe0ff 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.bro-hero p{margin:0 0 16px;color:var(--read);font-size:calc(15px * var(--ts));line-height:1.6;max-width:56ch}
#viewBro .bro-cta{width:100%;flex-direction:column;align-items:flex-start;gap:2px;padding:13px 18px;text-align:left;min-height:54px}
#viewBro .bro-cta span{font-size:15px} #viewBro .bro-cta small{font:600 12.5px var(--sans);opacity:.75;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bro-all{margin:0;font-weight:600}
.bro-ru{margin:0 0 12px;color:var(--warn);font-size:13px}
.bro-ask{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:space-between;border:1px solid rgba(110,168,254,.35);background:rgba(110,168,254,.08);border-radius:16px;padding:14px 16px;margin-bottom:14px}
.bro-ask b{display:block;margin-bottom:2px} .bro-ask span{color:var(--mut);font-size:13px} .bro-ask-b{display:flex;gap:8px}
.bro-ask .btn{padding:0 18px;min-height:44px} .bro-ask .btn.ghost{background:transparent}
.bro-tracks{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:12px;margin-bottom:14px}
.bro-tc{position:relative;display:flex;flex-direction:column;gap:10px;text-align:left;font:inherit;color:inherit;cursor:pointer;border:1px solid var(--line);border-radius:18px;padding:16px;background:var(--panel);transition:border-color .15s,transform .15s}
.bro-tc.py{background:linear-gradient(160deg,rgba(255,212,59,.09),transparent 55%),var(--panel)} .bro-tc.cpp{background:linear-gradient(160deg,rgba(95,176,255,.10),transparent 55%),var(--panel)}
.bro-tc:hover{border-color:rgba(255,255,255,.22)} .bro-tc:active{transform:scale(.985)}
.bro-tc-top{display:flex;align-items:center;gap:12px}
.bro-logo{flex:none;display:grid;place-items:center;width:46px;height:46px;border-radius:14px;font:800 16px var(--mono);letter-spacing:-1px}
.bro-logo.py{background:rgba(255,212,59,.14);font-size:24px} .bro-logo.cpp{background:rgba(95,176,255,.16);color:var(--cpp)}
.bro-tc-n{flex:1;min-width:0;display:flex;flex-direction:column} .bro-tc-n b{font-size:19px} .bro-tc-n small{color:var(--mut);font-size:12.5px}
.bro-tc-r{position:relative;flex:none;width:52px;height:52px} .bro-tc-r .bro-pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:750 13px var(--sans);font-variant-numeric:tabular-nums}
.bro-tc-r .bro-pct small{font-size:9px;opacity:.7}
.bro-ring{width:100%;height:100%;transform:rotate(-90deg)} .bro-ring circle{fill:none;stroke-width:4} .bro-ring .bg{stroke:rgba(255,255,255,.08)}
.bro-ring .fg{stroke:var(--good);stroke-linecap:round;transition:stroke-dasharray .5s var(--ease,ease)}
.bro-badge{display:inline-block;vertical-align:3px;margin-left:6px;font:700 10.5px var(--sans);letter-spacing:0;color:#0a0b12;background:var(--py);border-radius:99px;padding:3px 8px}
.bro-tc-d{color:var(--read);font-size:13.5px;line-height:1.5} .bro-tc-f{color:var(--mut);font-size:12px;display:flex;justify-content:space-between;gap:8px}
.bro-tc-f i{font-style:normal;font-size:18px;line-height:1;color:var(--txt)}
.bro-how{border:1px solid var(--line);border-radius:18px;padding:16px 18px;background:var(--panel);margin-bottom:12px}
.bro-how h3{font-size:16px;margin-bottom:8px} .bro-how ul{margin:0;padding-left:18px;color:var(--read);font-size:calc(14px * var(--ts));line-height:1.6} .bro-how li{margin:4px 0}
.bro-links{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px;font-size:13px;color:var(--mut)}
.bro-links a{display:inline-flex;align-items:center;min-height:44px;color:var(--txt);text-decoration:none;border:1px solid var(--line);border-radius:99px;padding:0 14px;background:var(--panel-2)} .bro-links a:hover{border-color:var(--acc)}
.bro-pin{display:flex;gap:10px;align-items:center;min-height:44px;padding:0 4px;color:var(--mut);font-size:13.5px;cursor:pointer} .bro-pin input{width:18px;height:18px;accent-color:var(--acc)}
.bro-src{color:var(--mut);font-size:12px;line-height:1.55;margin:8px 4px 0}
.bro-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:2px 0 12px}
.bro-back{font:650 14px var(--sans);color:var(--acc);background:none;border:0;padding:0 8px 0 2px;min-height:44px;min-width:44px;cursor:pointer}
.bro-pos{color:var(--mut);font-size:12.5px;font-variant-numeric:tabular-nums}
.bro-thead{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:18px;padding:14px 16px;margin-bottom:12px;background:var(--panel)}
.bro-thead.py{background:linear-gradient(160deg,rgba(255,212,59,.09),transparent 60%),var(--panel)} .bro-thead.cpp{background:linear-gradient(160deg,rgba(95,176,255,.1),transparent 60%),var(--panel)}
.bro-th-t{flex:1;min-width:0} .bro-th-t h2{font-size:22px} .bro-th-t small{color:var(--mut);font-size:12.5px}
.bro-win{border:1px solid rgba(70,214,160,.4);background:rgba(70,214,160,.1);border-radius:14px;padding:12px 14px;margin-bottom:12px;font-size:14px;line-height:1.5}
#viewBro .bro-thead + .btn.primary,#viewBro .bro-win + .btn.primary{margin-bottom:14px}
.bro-ch{border:1px solid var(--line);border-radius:18px;background:var(--panel);margin:12px 0;overflow:hidden}
.bro-ch header{display:grid;grid-template-columns:1fr auto;column-gap:10px;padding:14px 16px 6px}
.bro-ch-k{grid-column:1/-1;font:700 11px var(--sans);letter-spacing:.7px;text-transform:uppercase;color:var(--mut)}
.bro-ch header b{font-size:17px} .bro-ch header small{grid-column:1;color:var(--mut);font-size:12.5px}
.bro-ch-c{grid-column:2;grid-row:2/4;align-self:center;font:700 13px var(--sans);color:var(--mut);font-variant-numeric:tabular-nums}
.bro-ch.full .bro-ch-c{color:var(--good)}
.bro-path{list-style:none;margin:0;padding:4px 8px 8px}
.bro-path li{position:relative}
.bro-path li+li::before{content:"";position:absolute;left:23px;top:-10px;height:20px;width:2px;background:var(--line)}
.bro-l{width:100%;display:flex;align-items:center;gap:12px;text-align:left;font:inherit;color:inherit;background:none;border:0;border-radius:12px;padding:9px 8px;cursor:pointer}
.bro-l:hover{background:rgba(255,255,255,.035)} .bro-l.from{background:rgba(110,168,254,.08)}
.bro-dot{position:relative;z-index:1;flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;font:700 12.5px var(--sans);color:var(--mut);background:var(--panel);border:1.5px solid var(--line);font-variant-numeric:tabular-nums}
.bro-l.done .bro-dot{background:var(--good);border-color:var(--good);color:#06130d;font-size:14px}
.bro-l.next .bro-dot{border:2px solid var(--acc);color:var(--txt);box-shadow:0 0 0 4px rgba(110,168,254,.16);animation:broPulse 2.4s ease-in-out infinite}
@keyframes broPulse{50%{box-shadow:0 0 0 7px rgba(110,168,254,.06)}}
.bro-lt{flex:1;min-width:0;display:flex;flex-direction:column} .bro-lt b{font-size:calc(15px * var(--ts));font-weight:650}
.bro-lt small{color:var(--mut);font-size:12.5px;line-height:1.4}
.bro-l.done .bro-lt b{color:var(--read)}
.bro-x{flex:none;font:700 10.5px var(--sans);color:var(--cyan);border:1px solid rgba(84,230,200,.35);border-radius:99px;padding:2px 7px;white-space:nowrap}
.bro-book{border-top:1px solid var(--line-2);padding:10px 16px;color:var(--mut);font-size:12.5px}
.bro-reset{display:block;margin:18px auto 0;background:none;border:0;color:var(--mut);font-size:12.5px;cursor:pointer;padding:0 12px;min-height:44px} .bro-reset.sure{color:var(--bad)}
.bro-segs{display:flex;gap:4px;margin:-4px 0 16px}
.bro-seg{flex:1;height:6px;border-radius:99px;background:rgba(255,255,255,.1)}
.bro-seg.done{background:var(--good)} .bro-seg.cur{background:var(--acc);box-shadow:0 0 0 2px rgba(110,168,254,.25)}
.bro-les .bro-chn{font:700 11px var(--sans);letter-spacing:.7px;text-transform:uppercase;color:var(--mut)}
.bro-les h2{font-size:clamp(23px,5.4vw,30px);line-height:1.15;margin:6px 0 4px}
.bro-sub{margin:0 0 16px;color:var(--mut);font-size:14px;display:flex;flex-wrap:wrap;gap:6px 8px;align-items:center}
.bro-ok{font:700 11px var(--sans);color:var(--good)}
.bro-text{color:var(--read);font-size:calc(15.5px * var(--ts));line-height:1.7}
.bro-text p,.bro-tip p,.bro-bug p,.bro-qe p,.bro-task p,.bro-qq p{margin:0 0 10px} .bro-text ul{margin:0 0 12px;padding-left:20px} .bro-text li{margin:3px 0}
#viewBro code{-webkit-box-decoration-break:clone;box-decoration-break:clone;font:.88em var(--mono);background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.06);border-radius:6px;padding:1px 5px;color:#e8ecf4;overflow-wrap:anywhere}
/* 44 символа строки кода (предел verify-bro.js) влезают в ширину экрана: моно-знак ≈ 0.6em, поля по краям ≈ 72px */
#viewBro pre.bro-code{margin:0;border:0;border-radius:0;font-size:clamp(10.6px, calc((100vw - 72px) / 26.6), calc(12.8px * var(--ts)));line-height:1.6;padding:13px 15px;background:#0a0c12;white-space:pre;overflow-x:auto}
.bro-fence{container-type:inline-size;margin:4px 0 12px} #viewBro .bro-fence pre.bro-code{border:1px solid var(--line);border-radius:12px;font-size:clamp(10.2px, calc((100cqw - 28px) / (var(--n, 44) * .63)), calc(13px * var(--ts)))}
.bro-ex{margin:16px 0;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:var(--panel)}
.bro-ex figcaption{display:flex;align-items:center;gap:8px;padding:4px 4px 4px 14px;min-height:44px;font:650 12.5px var(--sans);color:var(--mut);border-bottom:1px solid var(--line-2)}
.bro-cap{flex:1;min-width:0;display:flex;flex-wrap:wrap;gap:2px 10px;padding:6px 0} .bro-frag{color:var(--warn);font-weight:600}
.bro-cb{position:relative;container-type:inline-size}
#viewBro .bro-cb pre.bro-code{font-size:clamp(10.2px, calc((100cqw - 28px) / (var(--n, 44) * .63)), calc(13px * var(--ts)))}
.bro-copy{flex:none;width:44px;height:44px;border-radius:10px;border:0;background:none;color:var(--mut);font-size:17px;cursor:pointer} .bro-copy:hover{color:var(--txt);background:rgba(255,255,255,.05)}
.bro-copy.ok{color:var(--good)}
.bro-inp{border-top:1px solid var(--line-2);padding:8px 14px;display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.bro-inp span{font:650 12px var(--sans);color:var(--mut)} .bro-inp pre{margin:0;font:12.5px var(--mono);color:var(--warn);white-space:pre-wrap}
.bro-run-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:10px 12px;border-top:1px solid var(--line-2)}
.bro-run{font:700 13.5px var(--sans);color:var(--good);background:rgba(70,214,160,.1);border:1px solid rgba(70,214,160,.35);border-radius:99px;padding:8px 18px;cursor:pointer;min-height:44px}
.bro-run:active{transform:scale(.97)}
.bro-norun{color:var(--mut);font-size:12.5px}
.bro-tutor{display:inline-flex;align-items:center;min-height:44px;padding:0 4px;font-size:12.5px;color:var(--mut);text-decoration:none;margin-left:auto} .bro-tutor:hover{color:var(--acc)}
.bro-out{border-top:1px dashed var(--line);background:#05070b;padding:10px 14px 12px}
.bro-out.show{animation:broUp .32s var(--ease,ease) both}
@keyframes broUp{from{opacity:.35;transform:translateY(-4px)}to{opacity:1;transform:none}}
.bro-out-h{display:block;font:700 10.5px var(--sans);letter-spacing:.7px;text-transform:uppercase;color:var(--mut);margin-bottom:6px}
.bro-out pre{margin:0;font:calc(12.8px * var(--ts))/1.6 var(--mono);color:#dff5ea;white-space:pre-wrap;overflow-wrap:anywhere}
.bro-out pre.bro-err{color:var(--bad);margin-top:4px} .bro-out pre.bro-none{color:var(--mut);font-style:italic}
.bro-err-n{display:block;margin-top:6px;color:var(--mut);font-size:12.5px}
.bro-tip,.bro-bug{margin:16px 0;padding:12px 14px;border-radius:14px;font-size:calc(14.5px * var(--ts));line-height:1.6;color:var(--read)}
.bro-tip{background:linear-gradient(90deg,rgba(110,168,254,.13),rgba(110,168,254,.03));border-left:3px solid var(--acc)}
.bro-bug{background:linear-gradient(90deg,rgba(255,207,110,.13),rgba(255,207,110,.03));border-left:3px solid var(--warn)}
.bro-tip>b,.bro-bug>b{display:block;margin-bottom:4px;font-size:13px} .bro-tip>b{color:var(--acc)} .bro-bug>b{color:var(--warn)}
.bro-tip p:last-child,.bro-bug p:last-child{margin-bottom:0}
.bro-quiz,.bro-task{margin:22px 0;border:1px solid var(--line);border-radius:18px;padding:16px;background:var(--panel)}
.bro-quiz h3,.bro-task h3{font-size:17px;margin-bottom:12px}
.bro-q+.bro-q{margin-top:18px;padding-top:16px;border-top:1px solid var(--line-2)}
/* номер — слева от первой строки, а код вопроса под ним во всю ширину: так 44 символа влезают и на 360px */
.bro-qq{font-size:calc(15px * var(--ts));line-height:1.55;margin-bottom:10px} .bro-qq::after{content:"";display:block;clear:both}
.bro-qn{float:left;margin:0 10px 2px 0;display:grid;place-items:center;width:24px;height:24px;border-radius:8px;background:rgba(255,255,255,.07);font:700 12px var(--sans);color:var(--mut)}
.bro-opts{display:flex;flex-direction:column;gap:8px}
.bro-o{text-align:left;font:500 calc(14.5px * var(--ts))/1.45 var(--sans);color:var(--txt);background:var(--panel-2);border:1px solid var(--line);border-radius:12px;padding:12px 14px;cursor:pointer;min-height:46px;transition:border-color .15s,background .15s}
.bro-o:hover:not(:disabled){border-color:rgba(255,255,255,.25)} .bro-o:disabled{cursor:default}
.bro-o.ok{border-color:var(--good);background:rgba(70,214,160,.12)} .bro-o.no{border-color:var(--bad);background:rgba(255,122,133,.12)} .bro-o.dim{opacity:.55}
.bro-qe{margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.04);font-size:calc(14px * var(--ts));line-height:1.55;color:var(--read)}
.bro-qe>b{display:block;margin-bottom:4px} .bro-qe>b.y{color:var(--good)} .bro-qe>b.n{color:var(--bad)} .bro-qe p:last-child{margin-bottom:0}
.bro-task{border-style:dashed} .bro-task>p{color:var(--read);font-size:calc(15px * var(--ts));line-height:1.6}
.bro-task details{margin-top:10px;border:1px solid var(--line);border-radius:12px;background:var(--panel-2)}
.bro-task summary{cursor:pointer;padding:12px 14px;min-height:44px;box-sizing:border-box;font:650 14px var(--sans);list-style:none} .bro-task summary::-webkit-details-marker{display:none}
.bro-task summary::before{content:"▸ ";color:var(--mut)} .bro-task details[open] summary::before{content:"▾ "}
.bro-task details>p,.bro-task details>ul{margin:0;padding:0 14px 12px;color:var(--read);font-size:14px}
.bro-task details .bro-ex{margin:0 10px 10px}
.bro-fin{margin:22px 0 8px;display:flex;flex-direction:column;gap:10px}
.bro-undo{align-self:center;background:none;border:0;color:var(--mut);font-size:12.5px;cursor:pointer;padding:0 12px;min-height:44px}
.bro-pn{display:flex;gap:10px} .bro-pn .btn{flex:1}
@media (max-width:520px){ .bro-hero{padding:20px 16px 18px;border-radius:18px} .bro-quiz,.bro-task{padding:14px}
  .bro-task details{margin-left:-15px;margin-right:-15px;border-radius:0;border-left:0;border-right:0} .bro-task details .bro-ex{margin:0;border-radius:0;border-left:0;border-right:0} }
@media (prefers-reduced-motion:reduce){ .bro-l.next .bro-dot,.bro-out.show{animation:none} }
html.native-app #viewBro .terms-wrap{padding-bottom:calc(40px + env(safe-area-inset-bottom))}
body.bro-on #rmFab{display:none!important}
`;
  document.head.appendChild(css);
})();

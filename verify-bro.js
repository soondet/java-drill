/* Проверка раздела «Python и C++» (bro-py.js, bro-cpp.js): форма уроков и настоящий запуск кода.
 *
 * Урок обещает «вот код — вот что он выведет». Если вывод в данных выдуман, новичок
 * запомнит неправду и не поймёт, почему у него на компьютере по-другому. Поэтому каждый
 * пример и каждое решение задачки запускаются: Python — интерпретатором, C++ — clang++
 * в режиме C++20, вывод сравнивается с тем, что написано в уроке.
 *
 * В гейт (check.js) не включена — как и verify-java.js: нужны python3 и компилятор.
 * Запускать руками после любой правки уроков:
 *
 *     node verify-bro.js                    — оба трека
 *     node verify-bro.js часть.js …         — отдельные файлы (так проверяются черновики глав)
 *
 * Python берётся из BRO_PY, иначе /opt/homebrew/bin/python3, иначе python3 из PATH.
 * Для урока про NumPy нужен Python, где он установлен (BRO_PY=…/venv/bin/python).
 *
 * Пример: {n, c, out, inp, err, run}. err у Python — последняя строка трассировки
 * («ZeroDivisionError: division by zero»), у C++ — "compile" (пример намеренно не
 * собирается). run:false — код не запускается (сеть, окно, неопределённое поведение).
 * C++ без int main оборачивается в main с ходовыми заголовками — в уроке это «фрагмент». */
const fs = require("fs"), os = require("os"), path = require("path"), { spawn, spawnSync } = require("child_process");

const files = process.argv.slice(2).length ? process.argv.slice(2) : ["bro-py.js", "bro-cpp.js"].map(f => path.join(__dirname, f));
global.window = {};
for (const f of files) require(path.resolve(f));
const CH = window.BRO_CH || [];

const PY = process.env.BRO_PY || (fs.existsSync("/opt/homebrew/bin/python3") ? "/opt/homebrew/bin/python3" : "python3");
const CXX = process.env.BRO_CXX || "clang++";
const pv = spawnSync(PY, ["--version"], { encoding: "utf8" }), cv = spawnSync(CXX, ["--version"], { encoding: "utf8" });
if (pv.error || cv.error) { console.error("нужны " + PY + " и " + CXX); process.exit(2); }
console.log("  " + (pv.stdout || pv.stderr).trim() + " · " + (cv.stdout || "").split("\n")[0]);

const bad = [], warn = [];
const B = (id, msg) => bad.push(id + ": " + msg);
const LINE_MAX = 48;
const ids = new Set();

/* ---- форма ---- */
const str = (v, min, max) => typeof v === "string" && v.trim().length >= min && v.length <= max;
const words = s => (s.match(/[\p{L}\d]+/gu) || []).length;
let qn = 0, longest = 0, pickShort = 0, pickLong = 0;
for (const ch of CH) {
  const cid = ch.id || "?";
  if (!/^(py|cpp)-[a-z0-9-]+$/.test(cid)) B(cid, "id главы не вида py-…/cpp-…");
  if (!["py", "cpp"].includes(ch.track) || !cid.startsWith(ch.track + "-")) B(cid, "track не совпадает с префиксом id");
  if (ids.has(cid)) B(cid, "id повторяется"); ids.add(cid);
  if (!str(ch.t, 3, 40)) B(cid, "название главы 3–40 символов");
  if (!str(ch.s, 3, 80)) B(cid, "подпись главы 3–80 символов");
  if (!Array.isArray(ch.ls) || !ch.ls.length) { B(cid, "нет уроков"); continue; }
  for (const l of ch.ls) {
    const id = l.id || "?";
    if (!/^(py|cpp)-[a-z0-9-]+$/.test(id) || !id.startsWith(ch.track + "-")) B(id, "id урока не вида " + ch.track + "-…");
    if (ids.has(id)) B(id, "id повторяется"); ids.add(id);
    if (!str(l.t, 3, 34)) B(id, "название 3–34 символа");
    if (!str(l.s, 3, 64)) B(id, "подпись 3–64 символа");
    if (!str(l.p, 80, 4000)) B(id, "нет объяснения p");
    else { const w = words(l.p); if (w < 60 || w > 340) B(id, "объяснение " + w + " слов, нужно 60–340"); }
    if (/`[^`\n]*$/m.test((l.p || "").replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, ""))) B(id, "в p непарный бэктик");
    if (!str(l.tip, 10, 400)) B(id, "нет tip (💡 запомни)");
    if (!str(l.bug, 10, 500)) B(id, "нет bug (⚠️ частая ошибка)");
    if (!Array.isArray(l.ex) || l.ex.length < 1 || l.ex.length > 4) B(id, "примеров ex должно быть 1–4");
    if (!Array.isArray(l.q) || l.q.length < 2 || l.q.length > 4) B(id, "вопросов q должно быть 2–4");
    (l.q || []).forEach((q, i) => {
      qn++;
      if (!str(q.q, 8, 600)) B(id, "вопрос " + (i + 1) + " пустой");
      if (!Array.isArray(q.o) || q.o.length < 3 || q.o.length > 4) { B(id, "вопрос " + (i + 1) + ": вариантов 3–4"); return; }
      if (new Set(q.o.map(o => String(o).trim())).size !== q.o.length) B(id, "вопрос " + (i + 1) + ": варианты повторяются");
      if (q.o.some(o => typeof o !== "string" || !o.trim())) B(id, "вопрос " + (i + 1) + ": пустой вариант");
      if (!str(q.e, 8, 500)) B(id, "вопрос " + (i + 1) + ": нет пояснения e");
      const L = q.o.map(o => String(o).length), mx = Math.max(...L.slice(1));
      if (L[0] > mx) longest++;
      /* «выбирай самый короткий / длинный»: при ничьей — наугад среди равных */
      const lo = Math.min(...L), hi = Math.max(...L);
      if (L[0] === lo) pickShort += 1 / L.filter(x => x === lo).length;
      if (L[0] === hi) pickLong += 1 / L.filter(x => x === hi).length;
    });
    const t = l.task;
    if (!t || !str(t.t, 10, 600) || !str(t.hint, 5, 400) || !str(t.sol, 5, 3000)) B(id, "задачка task: нужны t, hint, sol");
  }
}
const pct = qn ? Math.round(longest / qn * 100) : 0;
if (pct > 35) B("викторина", "верный вариант самый длинный в " + pct + "% вопросов (потолок 35%) — уравняй длину неверных");
const ps = qn ? Math.round(pickShort / qn * 100) : 0, pg = qn ? Math.round(pickLong / qn * 100) : 0;
if (ps > 35 || pg > 35) B("викторина", "по длине угадывается: «самый короткий» " + ps + "%, «самый длинный» " + pg + "% (потолок 35%, наугад ~25%)");

/* ---- код ---- */
const PRE = ["iostream", "string", "vector", "array", "map", "set", "unordered_map", "unordered_set", "algorithm", "numeric",
  "memory", "sstream", "cmath", "iomanip", "utility", "optional", "functional", "cstring", "climits", "limits", "stdexcept"]
  .map(h => "#include <" + h + ">").join("\n");
const jobs = [];
for (const ch of CH) for (const l of ch.ls || []) {
  const lang = ch.track;
  (l.ex || []).forEach((e, i) => jobs.push({ id: l.id + " · пример " + (i + 1), lang, c: e.c, out: e.out, inp: e.inp, err: e.err, run: e.run, warn: e.warn }));
  if (l.task && l.task.sol) jobs.push({ id: l.id + " · решение", lang, c: l.task.sol, out: l.task.out, inp: l.task.inp, err: l.task.err, run: l.task.run, warn: l.task.warn });
}
for (const j of jobs) {
  if (typeof j.c !== "string" || !j.c.trim()) { B(j.id, "пустой код"); continue; }
  if (/\t/.test(j.c)) B(j.id, "табуляция в коде — только пробелы");
  const long = j.c.split("\n").filter(s => s.length > LINE_MAX);
  if (long.length) B(j.id, "строка длиннее " + LINE_MAX + " — не влезет в телефон: «" + long[0].slice(0, 60) + "»");
  if (j.run !== false && j.err == null && typeof j.out !== "string") B(j.id, "нет out (или run:false)");
}

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "jd-bro-"));
/* у каждого запуска своя папка: примеры с файлами (todo.txt, mymod.py) идут параллельно и не должны видеть чужие */
const run = (cmd, args, opt) => new Promise(res => {
  const p = spawn(cmd, args, { cwd: opt.cwd || dir, env: Object.assign({}, process.env, opt.env || {}) });
  let out = "", err = ""; const tm = setTimeout(() => { p.kill("SIGKILL"); err += "\n[таймаут]"; }, opt.timeout || 15000);
  p.stdout.on("data", d => out += d); p.stderr.on("data", d => err += d);
  p.on("close", code => { clearTimeout(tm); res({ code, out: out.replace(/\r/g, ""), err: err.replace(/\r/g, "") }); });
  p.on("error", e => { clearTimeout(tm); res({ code: -1, out: "", err: String(e) }); });
  if (opt.inp != null) p.stdin.end(opt.inp); else p.stdin.end();
});
const norm = s => String(s == null ? "" : s).replace(/\n+$/, "");
const lastLine = s => (s.trim().split("\n").filter(Boolean).pop() || "").trim();

/* урок про NumPy: без него в выбранном Python сразу говорим, как запустить, а не падаем трассировкой на каждом примере */
const hasNumpy = spawnSync(PY, ["-c", "import numpy"]).status === 0;
async function one(j, n) {
  if (j.run === false || typeof j.c !== "string") return;
  if (j.lang === "py" && /^\s*(import numpy|from numpy)/m.test(j.c) && !hasNumpy) return B(j.id, "в " + PY + " нет NumPy — запусти с BRO_PY=<python, где есть numpy>");
  const cwd = fs.mkdtempSync(path.join(dir, "j" + n + "-"));
  if (j.lang === "py") {
    const f = path.join(cwd, "main.py"); fs.writeFileSync(f, j.c);
    for (const seed of ["1", "2"]) {
      /* второй прогон — с нуля: файлы, созданные первым, не должны подыграть */
      fs.readdirSync(cwd).filter(x => x !== "main.py").forEach(x => fs.rmSync(path.join(cwd, x), { recursive: true, force: true }));
      const r = await run(PY, ["-X", "utf8", f], { cwd, inp: j.inp, env: { PYTHONHASHSEED: seed, PYTHONIOENCODING: "utf-8" } });
      if (j.err) {
        if (r.code === 0) return B(j.id, "ждали ошибку «" + j.err + "», а код отработал");
        if (lastLine(r.err) !== j.err) return B(j.id, "ошибка не та\n     в данных: " + j.err + "\n     на деле:  " + lastLine(r.err));
      } else if (r.code !== 0) return B(j.id, "упал: " + lastLine(r.err));
      if (norm(r.out) !== norm(j.out)) return B(j.id, "вывод не совпал (PYTHONHASHSEED=" + seed + ")\n     в данных: " + JSON.stringify(norm(j.out)) + "\n     на деле:  " + JSON.stringify(norm(r.out)));
    }
    return;
  }
  const full = /\bint\s+main\s*\(/.test(j.c);
  const src = full ? j.c : PRE + "\nint main() {\n" + j.c + "\n}\n";
  const f = path.join(cwd, "main.cpp"), exe = path.join(cwd, "main");
  fs.writeFileSync(f, src);
  const cc = await run(CXX, ["-std=c++20", "-Wall", "-Wextra", "-fno-color-diagnostics", "-o", exe, f], { timeout: 60000 });
  const msg = (cc.err.split("\n").find(s => /error:|warning:/.test(s)) || "").replace(f + ":", "");
  if (j.err === "compile") { if (cc.code === 0) B(j.id, "ждали ошибку компиляции, а собралось"); return; }
  if (cc.code !== 0) return B(j.id, "не собирается: " + msg);
  if (/warning:/.test(cc.err) && !j.warn) B(j.id, "предупреждение компилятора: " + msg);
  const r = await run(exe, [], { cwd, inp: j.inp });
  if (j.err) { if (r.code === 0) B(j.id, "ждали падение «" + j.err + "», а отработал"); return; }
  if (r.code !== 0) return B(j.id, "код возврата " + r.code + " " + r.err.trim().slice(0, 120));
  if (norm(r.out) !== norm(j.out)) B(j.id, "вывод не совпал\n     в данных: " + JSON.stringify(norm(j.out)) + "\n     на деле:  " + JSON.stringify(norm(r.out)));
}

(async () => {
  try {
    let next = 0; const N = Math.max(2, Math.min(8, os.cpus().length));
    await Promise.all(Array.from({ length: N }, async () => { while (next < jobs.length) { const k = next++; await one(jobs[k], k); } }));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
  const lessons = CH.reduce((a, c) => a + (c.ls || []).length, 0), ran = jobs.filter(j => j.run !== false).length;
  console.log("  глав " + CH.length + ", уроков " + lessons + ", вопросов " + qn + " (по длине угадывается: короткий " + ps + "%, длинный " + pg + "%), запусков " + ran + " из " + jobs.length);
  warn.forEach(w => console.log("  ⚠ " + w));
  if (!bad.length) { console.log("  ✓ всё сходится"); process.exit(0); }
  bad.forEach(b => console.log("  ✗ " + b));
  console.log("  ошибок: " + bad.length);
  process.exit(1);
})();

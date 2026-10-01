/* Проверка SQL-задач игры «Что выведет код» настоящим Postgres.
 *
 * Задачи с lang:"sql" в wp-new.js прогоняются через psql, вывод сравнивается с ответом.
 * Формат вывода — psql -Atq: столбцы через |, NULL пустой, служебных строк нет.
 *
 * База нужна локальная, строго на 127.0.0.1 — наружу ничего не открываем:
 *
 *     docker run -d --name jd-pg -p 127.0.0.1:55432:5432 \
 *       -e POSTGRES_PASSWORD=jd postgres:16-alpine
 *     node verify-sql.js
 *     docker rm -f jd-pg
 *
 * Хост, порт, пользователь и пароль берутся из PGHOST/PGPORT/PGUSER/PGPASSWORD.
 * В гейт не включена намеренно: на раннере CI базы нет. Запускать руками после
 * любой правки SQL-задач. */
const fs = require("fs"), os = require("os"), path = require("path"), { spawnSync } = require("child_process");
global.window = {}; require(path.join(__dirname, "wp-new.js"));
const W = (window.WP || []).filter(x => x.lang === "sql");
const env = Object.assign({}, process.env, { PGHOST: process.env.PGHOST || "127.0.0.1", PGPORT: process.env.PGPORT || "55432", PGUSER: process.env.PGUSER || "postgres", PGPASSWORD: process.env.PGPASSWORD || "jd" });
const ping = spawnSync("psql", ["-Atq", "-c", "select version()"], { encoding: "utf8", env });
if (ping.status !== 0) { console.error("psql не подключился: " + (ping.stderr || "").trim().split("\n")[0] + "\nподними базу командой из шапки файла"); process.exit(2); }
console.log("  " + ping.stdout.trim().split(",")[0]);
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "jd-sql-")), bad = [];
try {
  for (const x of W) {
    const f = path.join(dir, x.id + ".sql"); fs.writeFileSync(f, x.code);
    const r = spawnSync("psql", ["-Atq", "-v", "ON_ERROR_STOP=1", "-f", f], { encoding: "utf8", env });
    const out = (r.stdout || "").replace(/\n+$/, ""), want = String(x.out).replace(/\n+$/, "");
    if (out === want) continue;
    bad.push({ id: x.id, n: x.n, want, out, err: (r.stderr || "").trim().split("\n")[0] });
  }
} finally { fs.rmSync(dir, { recursive: true, force: true }); }
console.log("  сошлось: " + (W.length - bad.length) + " из " + W.length);
bad.forEach(b => console.log("\n  ✗ " + b.id + " (" + b.n + ")\n     в данных: " + JSON.stringify(b.want) + "\n     на деле:  " + JSON.stringify(b.out) + (b.err ? "\n     stderr:   " + b.err.slice(0, 200) : "")));
process.exit(bad.length ? 1 : 0);

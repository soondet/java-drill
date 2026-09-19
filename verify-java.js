/* Проверка игры «Что выведет код» настоящей Java.
 *
 * Каждый сниппет из wp-new.js запускается, вывод сравнивается с ответом в данных.
 * Зачем: в «Найди баг» нашлась задача, которая врала про собственный код — список
 * [a,b,c], в for-each удаляем b, «верный» ответ ConcurrentModificationException,
 * а на деле исключения нет (удаление предпоследнего: hasNext() видит cursor == size).
 * Глазами такое не ловится, запуском — за минуту.
 *
 * В гейт (check.js) не включена намеренно: ей нужна JDK, а сниппеты используют
 * свежие возможности языка — на раннере CI версия другая. Запускать руками после
 * любой правки wp-new.js:
 *
 *     node verify-java.js
 *
 * Java берётся из JAVA_HOME, иначе из PATH. Обёртка минимальная, чтобы проверять
 * задачу, а не обёртку: сниппет целиком становится телом класса с именем задачи
 * (T19 создаёт new T19()), импорты уезжают наверх, pr() добавляется, если не
 * объявлен, а «main() {» превращается в обычный public static void main.
 */
const fs = require("fs"), os = require("os"), path = require("path"), { spawnSync } = require("child_process");
global.window = {}; require(path.join(__dirname, "wp-new.js"));
const W = window.WP || [];
const JAVA = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, "bin", "java") : "java";
const ver = spawnSync(JAVA, ["-version"], { encoding: "utf8" });
if (ver.error) { console.error("java не найдена — задай JAVA_HOME или добавь java в PATH"); process.exit(2); }
console.log("  " + (ver.stderr || ver.stdout).split("\n")[0]);

const wrap = x => {
  const lines = x.code.split("\n");
  const imp = lines.filter(l => /^\s*import\s/.test(l)), rest = lines.filter(l => !/^\s*import\s/.test(l)).join("\n");
  let body = rest.replace(/(^|[\n}]\s*)main\(\)\s*\{/, (m, p) => p + (p.trim() === "}" ? "\n" : "") + "public static void main(String[] args) throws Exception {");
  if (!/void\s+pr\s*\(/.test(body)) body = "static void pr(Object o){ System.out.println(o); }\n" + body;
  return imp.join("\n") + "\npublic class " + x.id + " {\n" + body + "\n}\n";
};

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "jd-wp-"));
const bad = [];
try {
  for (const x of W) {
    const f = path.join(dir, x.id + ".java"); fs.writeFileSync(f, wrap(x));
    const r = spawnSync(JAVA, ["-Dstdout.encoding=UTF-8", "-Dstderr.encoding=UTF-8", f], { encoding: "utf8", timeout: 60000 });
    const out = (r.stdout || "").replace(/\r/g, "").replace(/\n+$/, ""), want = String(x.out).replace(/\n+$/, "");
    if (out === want) continue;
    const err = (r.stderr || "").split("\n").filter(l => /error:|Exception|Error/.test(l)).slice(0, 2).join(" | ").replace(new RegExp(dir + "/?", "g"), "");
    bad.push({ id: x.id, t: x.t, want, out, err });
  }
} finally { fs.rmSync(dir, { recursive: true, force: true }); }

console.log("  сошлось: " + (W.length - bad.length) + " из " + W.length);
bad.forEach(b => console.log("\n  ✗ " + b.id + " (" + b.t + ")\n     в данных: " + JSON.stringify(b.want) + "\n     на деле:  " + JSON.stringify(b.out) + (b.err ? "\n     stderr:   " + b.err.slice(0, 200) : "")));
process.exit(bad.length ? 1 : 0);

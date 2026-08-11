/* Объяснения на пальцах — по подгруппам (g). */
window.EXPLAINERS = [
 {
  "id": "type-erasure",
  "t": "Java",
  "g": "Дженерики и типы",
  "title": "Type erasure",
  "frames": [
   {
    "cap": "В коде List<String> и List<Integer> — два разных типа.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">List&lt;String&gt;</div><div class=\"fp-box good fp-pulse-g\">List&lt;Integer&gt;</div></div>"
   },
   {
    "cap": "Компилятор вырезает параметр типа в угловых скобках.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">List&lt;<span class=\"fp-blink\" style=\"color:var(--bad)\">String</span>&gt;</div><div class=\"fp-box good\">List&lt;<span class=\"fp-blink\" style=\"color:var(--bad)\">Integer</span>&gt;</div></div><div class=\"fp-arrow\">↓</div><span class=\"fp-tag\">javac ✂️ erasure</span></div>"
   },
   {
    "cap": "В байткоде оба превратились в один сырой List.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver dead\">List&lt;String&gt;</div><div class=\"fp-ver dead\">List&lt;Integer&gt;</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big mut fp-pulse-a\">List</div></div>"
   },
   {
    "cap": "Внутри лежат просто Object — точного типа уже нет.",
    "html": "<div class=\"fp-lane\"><span class=\"name\">List</span><div class=\"fp-token\">Object</div><div class=\"fp-token\">Object</div><div class=\"fp-token\">Object</div></div>"
   },
   {
    "cap": "Типа T в рантайме нет, поэтому компилятор запрещает new T[].",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">new T[10]</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">✗</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div></div></div>"
   },
   {
    "cap": "instanceof не видит <String>: проверять нечего, код не скомпилится.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">🔎 instanceof</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\" style=\"color:var(--mut)\">List&lt;<span style=\"text-decoration:line-through\">String</span>&gt;</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad fp-pulse-r\">✗ не скомпилится</div></div>"
   }
  ]
 },
 {
  "id": "generics-pecs",
  "t": "Java",
  "g": "Дженерики и типы",
  "title": "PECS: extends vs super",
  "frames": [
   {
    "cap": "Два вопроса к коллекции: что из неё ЧИТАТЬ и что в неё КЛАСТЬ?",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">🔎 reader</div><div class=\"fp-tag\">читать?</div></div><div class=\"fp-box big acc\">List&lt;? ? T&gt;</div><div class=\"fp-col\"><div class=\"fp-token\">✍️ writer</div><div class=\"fp-tag\">класть?</div></div></div>"
   },
   {
    "cap": "Producer Extends: список ОТДАЁТ элементы — берём как T, читать можно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-g\">List&lt;? extends Number&gt;</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token fp-float\">🔎 get()</div><div class=\"fp-box good\" style=\"border-color:var(--good)\">Number ✓</div></div></div>"
   },
   {
    "cap": "В extends-список класть нельзя: точный тип неизвестен, add отвергнут.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">List&lt;? extends Number&gt;</div><div class=\"fp-arrow\">↑</div><div class=\"fp-row\"><div class=\"fp-token fp-pulse-r\">✍️ add(1.0)</div><div class=\"fp-box bad fp-blink\" style=\"color:var(--bad)\">✗ compile</div></div></div>"
   },
   {
    "cap": "Consumer Super: список ПРИНИМАЕТ T — класть можно безопасно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-float\">✍️ add(Integer)</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-g\">List&lt;? super Integer&gt;</div><div class=\"fp-box good\" style=\"border-color:var(--good)\">кладём ✓</div></div>"
   },
   {
    "cap": "Из super-списка читаем только как Object: точный тип неизвестен.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">List&lt;? super Integer&gt;</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token fp-float\">🔎 get()</div><div class=\"fp-box mut\">Object 🤷</div><div class=\"fp-box bad\" style=\"color:var(--bad)\">Integer ✗</div></div></div>"
   },
   {
    "cap": "Правило PECS: отдаёт — extends, принимает — super.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🔎 читаешь</span><div class=\"fp-token fp-pulse-g\" style=\"border-color:var(--good)\">extends</div></div><div class=\"fp-lane\"><span class=\"name\">✍️ кладёшь</span><div class=\"fp-token fp-pulse-a\" style=\"border-color:var(--acc)\">super</div></div><div class=\"fp-box big\">P-E-C-S</div></div>"
   }
  ]
 },
 {
  "id": "bounded-type",
  "t": "Java",
  "g": "Дженерики и типы",
  "title": "Bounded type <T extends Number>",
  "frames": [
   {
    "cap": "<T extends Number> — T это тип-параметр, ограниченный сверху Number.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc fp-pulse-a\">&lt;T extends Number&gt;</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">T = тип в границах Number</div></div>"
   },
   {
    "cap": "Подходят только Number и его наследники.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-float\">Number</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-token good\">Integer ✓</div><div class=\"fp-token good\">Double ✓</div><div class=\"fp-token good\">Long ✓</div></div></div>"
   },
   {
    "cap": "String не наследует Number — компилятор не пропустит.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token bad fp-blink\">String</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">🔒 не Number ✗</div></div>"
   },
   {
    "cap": "Граница Number даёт доступ к его методам: doubleValue().",
    "html": "<div class=\"fp-col\"><div class=\"fp-token acc\">T value</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">value.doubleValue()</div><div class=\"fp-arrow\">↓</div><div class=\"fp-val\">42.0</div></div>"
   },
   {
    "cap": "После компиляции T стирается до Number — до верхней границы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">T</div><div class=\"fp-arrow\">↓ стирание</div><div class=\"fp-box big mut fp-pulse-a\">Number</div></div>"
   }
  ]
 },
 {
  "id": "string-pool",
  "t": "Java",
  "g": "Строки и числа",
  "title": "String pool vs new String",
  "frames": [
   {
    "cap": "Литерал \"hi\" попадает в общий пул строк внутри кучи.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">✍️ String a = \"hi\"</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-a\">🗄 String Pool</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell on\">hi</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div>"
   },
   {
    "cap": "Второй такой же литерал берёт готовый объект из пула — не создаёт новый.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">a = \"hi\"</div><div class=\"fp-box mut\">b = \"hi\"</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↘</div><div class=\"fp-arrow\">↙</div></div><div class=\"fp-cell on fp-pulse-g\">🗄 один \"hi\"</div></div>"
   },
   {
    "cap": "new String(\"hi\") создаёт ещё один объект в куче, отдельно от пула.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">✍️ String c = new String(\"hi\")</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box acc\">🗄 пул: hi</div><div class=\"fp-box bad fp-pulse-r\">🆕 куча: hi</div></div></div>"
   },
   {
    "cap": "a и b смотрят на один объект в пуле, c — на свой в куче.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">a 🔑</div><div class=\"fp-box mut\">b 🔑</div><div class=\"fp-box bad\">c 🔑</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↘</div><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-cell on\">пул hi</div><div class=\"fp-cell bad\">new hi</div></div></div>"
   },
   {
    "cap": "== сравнивает ссылки: a==b — true, a==c — false.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">a==b</span><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">✓ true</div></div><div class=\"fp-row\"><span class=\"fp-tag\">a==c</span><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">✗ false</div></div></div>"
   },
   {
    "cap": "equals смотрит на текст, а не на ссылку — сравнивай строки им.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">==</span><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">🔑 ссылки</div></div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">equals</span><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">✓ текст</div></div></div>"
   }
  ]
 },
 {
  "id": "integer-cache",
  "t": "Java",
  "g": "Строки и числа",
  "title": "Integer cache (-128..127)",
  "frames": [
   {
    "cap": "Автобоксинг int → Integer идёт через Integer.valueOf().",
    "html": "<div class=\"fp-col\"><div class=\"fp-val fp-pulse-a\">42</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-a\">Integer.valueOf(42)</div></div>"
   },
   {
    "cap": "Значения -128..127 заранее лежат в кеше как готовые объекты.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">-128</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div><span class=\"fp-tag\">127</span></div><div class=\"fp-box good\">🔑 кеш Integer</div></div>"
   },
   {
    "cap": "127 берётся из кеша дважды — обе ссылки на один объект.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-float\">a=127</div><div class=\"fp-token fp-float\">b=127</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-box good fp-pulse-g\">🔑 один объект</div></div>"
   },
   {
    "cap": "a==b сравнивает ссылки на один объект → true.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">a</div><div class=\"fp-box big\">==</div><div class=\"fp-box acc\">b</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">✓ true</div></div>"
   },
   {
    "cap": "128 вне кеша — каждый раз создаётся НОВЫЙ объект в куче.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-float\">x=128</div><div class=\"fp-token fp-float\">y=128</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">obj #1</div><div class=\"fp-box bad fp-pulse-r\">obj #2</div></div></div>"
   },
   {
    "cap": "x==y → false (разные ссылки), а equals → true. Сравнивай через equals.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">x</div><div class=\"fp-box big\">==</div><div class=\"fp-box bad\">y</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">✗ false</div></div><div class=\"fp-row\"><div class=\"fp-box good\">x</div><div class=\"fp-box big\">equals</div><div class=\"fp-box good\">y</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">✓ true</div></div></div>"
   }
  ]
 },
 {
  "id": "float-precision",
  "t": "Java",
  "g": "Строки и числа",
  "title": "Почему 0.1+0.2 ≠ 0.3",
  "frames": [
   {
    "cap": "Компьютер знает только степени 1/2: половинки, четвертинки и так далее.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">1/2</div><div class=\"fp-box good\">1/4</div><div class=\"fp-box good\">1/8</div><div class=\"fp-box good\">1/16</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big acc fp-pulse-a\">всё число = сумма этих кусочков</div></div>"
   },
   {
    "cap": "В двоичном 0.1 — бесконечная дробь, последний бит обрезается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">0.1</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad fp-blink\"></div></div><div class=\"fp-box bad\">хвост не влезает ✗ → обрезаем</div></div>"
   },
   {
    "cap": "Так double хранит не 0.1, а самое близкое — чуть-чуть не то.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-tag\">хотели</div><div class=\"fp-box good\">0.1</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-tag\">лежит в памяти</div><div class=\"fp-box bad fp-pulse-r\">0.1000000000000000055…</div></div></div>"
   },
   {
    "cap": "Складываем два неточных числа — ошибки накапливаются, а не гасятся.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">0.1+ε</div><div class=\"fp-box mut\">+</div><div class=\"fp-box bad\">0.2+ε</div><div class=\"fp-arrow fp-pulse-r\">→</div><div class=\"fp-box big bad fp-pulse-r\">0.30000000000000004</div></div>"
   },
   {
    "cap": "Сравнение с 0.3 проваливается: хвостик не совпал.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">0.30000000000000004</div><div class=\"fp-box mut\">==</div><div class=\"fp-box good\">0.3</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big bad fp-blink\">false ✗</div></div>"
   },
   {
    "cap": "Для денег берём BigDecimal со строкой — он считает в десятичных, точно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver dead\">double 0.1+0.2 🗑</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">BigDecimal(\"0.1\")</div><div class=\"fp-box mut\">+</div><div class=\"fp-box good fp-pulse-g\">BigDecimal(\"0.2\")</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big good fp-pulse-g\">0.3 ✓</div></div>"
   }
  ]
 },
 {
  "id": "equals-hashcode",
  "t": "Java",
  "g": "Контракты языка",
  "title": "equals и hashCode",
  "frames": [
   {
    "cap": "HashMap кладёт объект в бакет — адрес считает hashCode.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">🔑 key=\"Аман\"</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc\">hashCode() = 42</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div>"
   },
   {
    "cap": "Положили ключ в бакет №2 и запомнили его там.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">put</span><div class=\"fp-token\">🔑\"Аман\"</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell mut\">0</div><div class=\"fp-cell mut\">1</div><div class=\"fp-cell good\">2 🔑</div><div class=\"fp-cell mut\">3</div><div class=\"fp-cell mut\">4</div><div class=\"fp-cell mut\">5</div></div></div>"
   },
   {
    "cap": "Тем же ключом: hashCode честный, ведёт в бакет №2 — нашли.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">🔎 key=\"Аман\" → hash 42</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell mut\">0</div><div class=\"fp-cell mut\">1</div><div class=\"fp-cell good fp-pulse-g\">2 🔑</div><div class=\"fp-cell mut\">3</div><div class=\"fp-cell mut\">4</div><div class=\"fp-cell mut\">5</div></div><div class=\"fp-box good\">equals() ✓ это он</div></div>"
   },
   {
    "cap": "Сломан контракт: равные ключи дают разный hashCode.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">🔑 put \"Аман\"</div><div class=\"fp-box acc\">hash = 42</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good\">бакет 2</div></div><div class=\"fp-col\"><div class=\"fp-token\">🔎 get \"Аман\"</div><div class=\"fp-box bad fp-pulse-r\">hash = 99</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">бакет 5</div></div></div>"
   },
   {
    "cap": "В чужом бакете equals даже не зовётся — мимо.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\" style=\"color:var(--bad)\">🔎 ищу в бакете 5</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell mut\">0</div><div class=\"fp-cell mut\">1</div><div class=\"fp-cell dead\">2 🗑</div><div class=\"fp-cell mut\">3</div><div class=\"fp-cell mut\">4</div><div class=\"fp-cell bad fp-pulse-r\">5 пусто</div></div><div class=\"fp-box bad\">equals() не вызван ✗</div></div>"
   },
   {
    "cap": "Итог: равные объекты обязаны иметь равный hashCode.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">a.equals(b) ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">a.hashCode()=b.hashCode()</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-ver\">get вернёт значение ✓</div><div class=\"fp-ver dead\">иначе get() = null, объект потерян</div></div>"
   }
  ]
 },
 {
  "id": "comparable-comparator",
  "t": "Java",
  "g": "Контракты языка",
  "title": "Comparable vs Comparator",
  "frames": [
   {
    "cap": "Класс User знает один свой родной порядок — сравнивает сам себя.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc fp-pulse-a\">class User implements Comparable</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good\">compareTo(other) → по age</div></div>"
   },
   {
    "cap": "Comparable — встроенный в класс естественный порядок, он один.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">User 25</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">User 31</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">User 40</div><span class=\"fp-tag\">🔑 по age</span></div>"
   },
   {
    "cap": "А что если надо сортировать ещё по имени и по балансу?",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad fp-blink\">class User</div><div class=\"fp-row\"><div class=\"fp-token\">по имени?</div><div class=\"fp-token\">по балансу?</div><div class=\"fp-token\">по дате?</div></div><div class=\"fp-box bad\">✗ внутри только один compareTo</div></div>"
   },
   {
    "cap": "Comparator — внешний объект-порядок, сам класс трогать не надо.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">class User</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box acc fp-float\">Comparator byName</div><div class=\"fp-box acc fp-float\">Comparator byBalance</div><div class=\"fp-box acc fp-float\">Comparator byDate</div></div></div>"
   },
   {
    "cap": "Каждый Comparator даёт свой порядок — сколько надо, столько и заводим.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">byName</span><div class=\"fp-box good\">Ann</div><div class=\"fp-box good\">Bob</div><div class=\"fp-box good\">Eve</div></div><div class=\"fp-row\"><span class=\"fp-tag\">byBalance</span><div class=\"fp-box acc\">120</div><div class=\"fp-box acc\">300</div><div class=\"fp-box acc\">900</div></div></div>"
   },
   {
    "cap": "Итог: Comparable — один родной порядок внутри; Comparator — много снаружи.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big good\">Comparable<br>🔑 один, внутри</div><div class=\"fp-conn\"></div><div class=\"fp-box big acc fp-pulse-a\">Comparator<br>много, снаружи</div></div>"
   }
  ]
 },
 {
  "id": "optional-usage",
  "t": "Java",
  "g": "Контракты языка",
  "title": "Optional: зачем",
  "frames": [
   {
    "cap": "Метод вернул null — а ты не знал, и зовёшь .getName() прямо на пустоте.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token\">findUser(42)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad big fp-blink\">null</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">↓ .getName()</div><div class=\"fp-box bad fp-pulse-r\">✗ NPE</div></div>"
   },
   {
    "cap": "Тип User молчит: внутри может быть юзер, а может null — узнаешь только в рантайме.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut big\">User</div><div class=\"fp-arrow\">↓ что внутри?</div><div class=\"fp-row\"><div class=\"fp-box good\">📦 user</div><div class=\"fp-box mut\">или</div><div class=\"fp-box bad fp-blink\">null</div></div></div>"
   },
   {
    "cap": "Optional<User> в типе честно говорит: значения может и не быть.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big fp-pulse-a\">Optional&lt;User&gt;</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">📦 ✓ есть</div><div class=\"fp-box mut\">📭 пусто</div></div></div>"
   },
   {
    "cap": "map достаёт имя если оно есть, orElse даёт запасное — без if и без NPE.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">Optional&lt;User&gt;</div><div class=\"fp-arrow\">↓ .map(User::getName)</div><div class=\"fp-box good fp-pulse-g\">Optional&lt;String&gt;</div><div class=\"fp-arrow\">↓ .orElse(&quot;гость&quot;)</div><div class=\"fp-box good big\">✓ String</div></div>"
   },
   {
    "cap": "Optional — для возвращаемого значения метода. Не для полей и параметров.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box good\">↩ return</div><div class=\"fp-box good fp-pulse-g\">✓ Optional</div></div><div class=\"fp-conn\"></div><div class=\"fp-col\"><div class=\"fp-box mut\">field ✗</div><div class=\"fp-box mut\">param ✗</div></div></div>"
   }
  ]
 },
 {
  "id": "checked-unchecked",
  "t": "Java",
  "g": "Контракты языка",
  "title": "Checked vs unchecked",
  "frames": [
   {
    "cap": "Throwable делится на checked и unchecked (RuntimeException и Error).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">Throwable</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">Exception (checked)</div><div class=\"fp-box bad fp-pulse-r\">RuntimeException</div><div class=\"fp-box bad mut\">Error</div></div></div>"
   },
   {
    "cap": "Checked — ожидаемый сбой снаружи: файл, сеть, БД могут отвалиться.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">✍️ код</div><div class=\"fp-arrow\">→</div><div class=\"fp-token fp-travel\">📨 IO/сеть</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">✗ упало</div></div>"
   },
   {
    "cap": "Компилятор не пустит: либо try-catch, либо throws — обязан обработать.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">readFile() throws IOException</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🔒 try-catch</div><div class=\"fp-box good\">или throws ↑</div></div><div class=\"fp-box bad\">⏸ иначе — не компилируется</div></div>"
   },
   {
    "cap": "Unchecked — баги программиста: null, выход за индекс, целочисленное /0.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">null.length</div><div class=\"fp-box bad fp-pulse-r\">arr[99]</div><div class=\"fp-box bad fp-pulse-r\">5 / 0</div></div>"
   },
   {
    "cap": "Их ловить не обязан — компилятор молчит, чини баг в коде.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">getName().trim()</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box mut\">компилятор</div><div class=\"fp-token fp-float\">😴 молчит</div></div><div class=\"fp-box bad fp-blink\">💥 NPE в рантайме</div></div>"
   },
   {
    "cap": "Снаружи сломалось → лови. Сам напортачил → исправь код.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">Checked</div><div class=\"fp-box mut\">🔒 обработай</div></div><div class=\"fp-conn\"></div><div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">Unchecked</div><div class=\"fp-box mut\">🛠 почини баг</div></div></div>"
   }
  ]
 },
 {
  "id": "try-with-resources",
  "t": "Java",
  "g": "Контракты языка",
  "title": "try-with-resources",
  "frames": [
   {
    "cap": "Открыли ресурсы: файл, потом сокет — каждый надо закрыть.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">try ( ... )</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">📄 file</div><div class=\"fp-box good fp-pulse-g\">🔌 socket</div></div></div>"
   },
   {
    "cap": "Внутри try бахнуло исключение — обычный код прерывается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">try { работаем... }</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad big fp-pulse-r\">💥 Exception</div></div>"
   },
   {
    "cap": "try-with-resources сам закрывает всё в ОБРАТНОМ порядке.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">📄 file</div><div class=\"fp-box mut\">🔌 socket</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">🔌 close ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📄 close ✓</div></div></div>"
   },
   {
    "cap": "Если и close() бросил — главную не теряем, второе клеим как suppressed.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad big fp-pulse-r\">💥 главная ошибка</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\" style=\"border-color:var(--bad)\">+ suppressed: ✗ close()</div></div>"
   },
   {
    "cap": "А вручную в finally про close легко забыть — ресурс течёт.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">finally { ... }</div><div class=\"fp-row\"><div class=\"fp-box good\">🔌 close ✓</div><div class=\"fp-box bad fp-blink\">📄 забыли ✗</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">🗑 утечка</div></div>"
   },
   {
    "cap": "Вывод: try-with-resources надёжнее ручного finally.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box good big fp-pulse-g\">try (res)</div><div class=\"fp-box good\">авто-close ✓</div></div><div class=\"fp-arrow\">vs</div><div class=\"fp-col\"><div class=\"fp-box bad big\">finally</div><div class=\"fp-box bad\">забыл ✗</div></div></div>"
   }
  ]
 },
 {
  "id": "record-immutable",
  "t": "Java",
  "g": "Контракты языка",
  "title": "record: неизменяемость",
  "frames": [
   {
    "cap": "Старый класс: тонна шаблона ради простой пары полей.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad\">class Point</div><div class=\"fp-row\"><div class=\"fp-box mut\">конструктор</div><div class=\"fp-box mut\">getX()</div><div class=\"fp-box mut\">getY()</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">equals()</div><div class=\"fp-box mut\">hashCode()</div><div class=\"fp-box mut\">toString()</div></div><div class=\"fp-tag\">~50 строк ✗</div></div>"
   },
   {
    "cap": "record — одна строка, и компилятор пишет всё за тебя.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big fp-pulse-a\">record Point(int x, int y)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">конструктор ✓</div><div class=\"fp-box good\">x() y() ✓</div></div><div class=\"fp-row\"><div class=\"fp-box good\">equals ✓</div><div class=\"fp-box good\">hashCode ✓</div><div class=\"fp-box good\">toString ✓</div></div></div>"
   },
   {
    "cap": "Все поля record — final, заданы раз в конструкторе.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">Point</div><div class=\"fp-row\"><div class=\"fp-box good\">🔒 x = 1</div><div class=\"fp-box good\">🔒 y = 2</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token\">p.x = 5</div><div class=\"fp-box bad fp-blink\">✗ не скомпилится</div></div></div>"
   },
   {
    "cap": "Хочешь другое значение — новый объект, старый цел.",
    "html": "<div class=\"fp-col\"><div class=\"fp-ver\">Point(1, 2)</div><div class=\"fp-arrow\">↓ new Point(5, 2)</div><div class=\"fp-row\"><div class=\"fp-ver\">Point(1, 2)</div><div class=\"fp-token fp-float\" style=\"border-color:var(--good)\">Point(5, 2)</div></div><div class=\"fp-tag\">оригинал не тронут ✓</div></div>"
   },
   {
    "cap": "Immutable значение безопасно читать из многих потоков.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-pulse-g\">🔒 Point(1, 2)</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-box good\">🔎 читает</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-box good\">🔎 читает</div></div></div><div class=\"fp-tag\">без 🔒 lock ✓</div></div>"
   },
   {
    "cap": "Итог: record идеален для DTO и value-объектов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big\">record</div><div class=\"fp-row\"><div class=\"fp-box good\">меньше кода</div><div class=\"fp-box good\">🔒 immutable</div></div><div class=\"fp-row\"><div class=\"fp-token good\">DTO</div><div class=\"fp-token good\">value</div><div class=\"fp-token good\">ключ Map</div></div></div>"
   }
  ]
 },
 {
  "id": "stack-heap",
  "t": "JVM",
  "g": "Память",
  "title": "Стек и куча",
  "frames": [
   {
    "cap": "У каждого метода свой кадр в стеке — стек растёт вверх.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag\">СТЕК</span><div class=\"fp-stack\"><div class=\"fp-slot fp-pulse-a\">makeCat()</div><div class=\"fp-slot\">main()</div></div><div class=\"fp-arrow\">↑</div></div>"
   },
   {
    "cap": "Локальный примитив лежит прямо в кадре — само число.",
    "html": "<div class=\"fp-row\"><span class=\"fp-tag\">СТЕК</span><div class=\"fp-stack\"><div class=\"fp-slot acc\"><div class=\"fp-row\"><span class=\"name\">int x</span><div class=\"fp-val\">5</div></div></div><div class=\"fp-slot\">main()</div></div></div>"
   },
   {
    "cap": "Сам объект new Cat живёт в куче — большой общей памяти.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag\">КУЧА</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell acc fp-pulse-g\">🧱 Cat</div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "В кадре не объект, а ССЫЛКА — стрелка из стека в кучу.",
    "html": "<div class=\"fp-row\"><div class=\"fp-stack\"><div class=\"fp-slot acc\"><span class=\"name\">cat 🔗</span></div><div class=\"fp-slot\">main()</div></div><div class=\"fp-arrow fp-pulse-a\">→</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(2,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell acc fp-float\">🧱 Cat</div></div></div>"
   },
   {
    "cap": "Метод вернулся — его кадр снят, ссылка из стека пропала.",
    "html": "<div class=\"fp-row\"><div class=\"fp-stack\"><div class=\"fp-slot\">main()</div></div><div class=\"fp-arrow mut fp-blink\">→</div><div class=\"fp-box mut\" style=\"border-color:var(--bad)\">🧱 Cat ✗</div></div>"
   },
   {
    "cap": "На объект никто не указывает — он недостижим, его уберёт GC 🗑.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag\">КУЧА</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell dead fp-pulse-r\">🗑</div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div></div><div class=\"fp-token good fp-travel\">GC ✓</div></div>"
   }
  ]
 },
 {
  "id": "metaspace",
  "t": "JVM",
  "g": "Память",
  "title": "Metaspace",
  "frames": [
   {
    "cap": "Куча хранит объекты приложения — это привычная on-heap память.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big\">Heap</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div><div class=\"fp-box mut\">🧱 объекты</div></div>"
   },
   {
    "cap": "Metaspace — отдельная нативная память JVM, она НЕ часть кучи.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc\">Heap</div><div class=\"fp-box mut\">объекты</div></div><div class=\"fp-box mut\">| граница |</div><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">Metaspace</div><div class=\"fp-box mut\">native RAM</div></div></div>"
   },
   {
    "cap": "Каждый загруженный класс кладёт в metaspace свои метаданные.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">Metaspace</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box acc\">User meta</div><div class=\"fp-box acc\">Order meta</div><div class=\"fp-box acc\">Svc meta</div></div></div>"
   },
   {
    "cap": "OOM Metaspace — это не OOM heap: переполнилась другая, нативная зона.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc\">Heap</div><div class=\"fp-bar\"><span style=\"width:40%\"></span></div><div class=\"fp-box good\">✓ ok</div></div><div class=\"fp-box mut\">≠</div><div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">Metaspace</div><div class=\"fp-bar\"><span style=\"width:100%;background:var(--bad)\"></span></div><div class=\"fp-box bad fp-blink\">✗ OOM</div></div></div>"
   },
   {
    "cap": "Утечка metaspace = бесконтрольный рост классов и загрузчиков.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node bad\">CL1</div><div class=\"fp-node bad\">CL2</div><div class=\"fp-node bad fp-pulse-r\">CL3</div><div class=\"fp-node bad fp-blink\">CL4…</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid fp-pulse-r\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div></div></div>"
   }
  ]
 },
 {
  "id": "reference-types",
  "t": "JVM",
  "g": "Память",
  "title": "Strong / Soft / Weak ссылки",
  "frames": [
   {
    "cap": "Объект жив, пока на него есть ссылка из стека — GC его не трогает.",
    "html": "<div class=\"fp-row\"><div class=\"fp-stack\"><div class=\"fp-slot\">main()</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box big acc fp-pulse-g\">Object</div></div>"
   },
   {
    "cap": "Strong: обычная ссылка держит крепко — GC проходит мимо, объект остаётся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">strong</span><div class=\"fp-conn\"></div><div class=\"fp-box acc fp-pulse-g\">Object ✓</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-token\">🗑 GC: не собираю</div></div>"
   },
   {
    "cap": "Soft: живёт, пока памяти хватает — кеши; собирается лишь под нехватку.",
    "html": "<div class=\"fp-col\"><div class=\"fp-bar\"><span style=\"width:92%\"></span></div><div class=\"fp-row\"><span class=\"fp-tag\">soft</span><div class=\"fp-conn\"></div><div class=\"fp-box bad fp-blink\">Cache ✗</div></div><div class=\"fp-token fp-float\" style=\"color:var(--bad)\">⏳ память кончилась → собрал</div></div>"
   },
   {
    "cap": "Weak: при ближайшем GC объект сметается — так чистит себя WeakHashMap.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">weak</span><div class=\"fp-conn\"></div><div class=\"fp-box mut\">🔑 key</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell dead fp-pulse-r\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead fp-pulse-r\"></div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "Phantom: объект уже собран, сам недоступен; ссылка лишь сигналит прибраться после.",
    "html": "<div class=\"fp-col\"><div class=\"fp-ver dead\">Object (get()=null)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><span class=\"fp-tag\">phantom</span><div class=\"fp-conn\"></div><div class=\"fp-token fp-pulse-a\">🗑 cleanup ✓</div></div></div>"
   },
   {
    "cap": "Чем слабее ссылка — тем слабее держит: от «не отдам» до «уборка после смерти».",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">strong<br>не отдам</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">soft<br>под нехватку</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">weak<br>ближайший GC</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">phantom<br>уборка после</div></div>"
   }
  ]
 },
 {
  "id": "string-intern",
  "t": "JVM",
  "g": "Память",
  "title": "String.intern()",
  "frames": [
   {
    "cap": "Три одинаковых \"Astana\" — три разных объекта в куче, память впустую.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">📦 \"Astana\" @1</div><div class=\"fp-box mut\">📦 \"Astana\" @2</div><div class=\"fp-box mut\">📦 \"Astana\" @3</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "Есть один общий шкаф — пул строк, где живёт каноничная копия.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">String Pool</div><div class=\"fp-box acc big fp-pulse-a\">🔑 \"Astana\"</div><div class=\"fp-row\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div></div></div>"
   },
   {
    "cap": "s.intern() ничего не меняет в куче — он ВОЗВРАЩАЕТ каноничную ссылку из пула.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token fp-travel\">📦 \"Astana\" @2 .intern()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">🔑 пул</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">↩ канон @0</div></div>"
   },
   {
    "cap": "Память освободится, только если переменные смотрят на канон, а старые объекты брошены.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">s1=</div><div class=\"fp-box mut\">s2=</div><div class=\"fp-box mut\">s3=</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">🔑 @0</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-ver dead\">@1 🗑</div><div class=\"fp-ver dead\">@2 🗑</div><div class=\"fp-ver dead\">@3 🗑</div><div class=\"fp-tag\" style=\"color:var(--mut)\">→ GC</div></div></div>"
   },
   {
    "cap": "Бонус: после intern() одинаковые строки равны по == , не только equals.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">a.intern()</div><div class=\"fp-box acc fp-pulse-a\">==</div><div class=\"fp-box good\">b.intern()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big\">✓ true</div></div>"
   },
   {
    "cap": "Не интернируй всё подряд: пул-хеш забьётся, lookup тормозит, GC под нагрузкой.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\" style=\"color:var(--bad)\">пул переполнен</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div></div><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">🗑 GC под нагрузкой</div><div class=\"fp-bar\"><span style=\"width:95%\"></span></div></div></div>"
   }
  ]
 },
 {
  "id": "gc-stw",
  "t": "JVM",
  "g": "Сборка мусора",
  "title": "Stop-the-world",
  "frames": [
   {
    "cap": "Программа работает, потоки крутятся, а в куче копится мусор 🗑.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token\">работа</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token\">работа</div></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "Куча заполнилась — JVM решает: пора звать сборщик мусора (GC).",
    "html": "<div class=\"fp-col\"><div class=\"fp-bar\"><span style=\"width:95%\"></span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad big fp-pulse-r\">куча почти полна</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-a\">🚛 запускаем GC</div></div>"
   },
   {
    "cap": "⏸ Stop-the-world: ВСЕ потоки замирают на время сборки.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad big fp-blink\">⏸ STOP THE WORLD</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token mut\">⏸ заморожен</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token mut\">⏸ заморожен</div></div></div></div>"
   },
   {
    "cap": "Потоки стоят, и пока они стоят — GC проходит по куче и убирает мёртвых.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token mut\">⏸ стоит</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token mut\">⏸ стоит</div></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-spin\">🚛 GC чистит</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell dead fp-pulse-r\">🗑</div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead fp-pulse-r\">🗑</div><div class=\"fp-cell dead fp-pulse-r\">🗑</div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "Мусор убран, куча свободна — потоки оживают и бегут дальше ✓.",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\"></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token good fp-pulse-g\">✓ бежит</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token good fp-pulse-g\">✓ бежит</div></div></div></div>"
   },
   {
    "cap": "Не зови System.gc() вручную — спровоцируешь лишнюю STW-паузу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad big\" style=\"color:var(--bad)\">✗ System.gc()</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad fp-pulse-r\">⏸ лишняя пауза для всех</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">✓ доверь решение JVM</div></div>"
   }
  ]
 },
 {
  "id": "gc-generational",
  "t": "JVM",
  "g": "Сборка мусора",
  "title": "Young и Old поколения",
  "frames": [
   {
    "cap": "Новые объекты рождаются в Young, в зоне Eden.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big acc fp-pulse-a\">YOUNG (Eden)</div><div class=\"fp-box big mut\">OLD</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div></div></div>"
   },
   {
    "cap": "Большинство объектов умирает молодыми — Eden забивается мусором.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">YOUNG (Eden)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell dead\">🗑</div><div class=\"fp-cell dead\">🗑</div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\">🗑</div><div class=\"fp-cell dead\">🗑</div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "Minor GC быстрый: копирует лишь немногих живых, мёртвых не трогает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">🗑 minor GC ⏳ быстрый</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell good fp-pulse-g\">✓</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell good fp-pulse-g\">✓</div></div></div>"
   },
   {
    "cap": "Выжившие едут в Survivor и стареют там за несколько чисток.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">EDEN</div><div class=\"fp-token fp-travel\">✓ выживший</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">SURVIVOR</div><div class=\"fp-conn\"></div><span class=\"fp-tag\">возраст++</span></div>"
   },
   {
    "cap": "Пережил порог чисток — повышается в Old как долгожитель.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">SURVIVOR</div><div class=\"fp-token fp-travel\">✓ старый</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good fp-pulse-g\">OLD</div></div>"
   },
   {
    "cap": "Old растёт медленно: major GC редкий, но тяжёлый и долгий.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">OLD</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big bad fp-pulse-r\">⏸ major GC — редкий, но тяжёлый</div></div>"
   }
  ]
 },
 {
  "id": "g1-regions",
  "t": "JVM",
  "g": "Сборка мусора",
  "title": "G1: регионы",
  "frames": [
   {
    "cap": "Старый GC видит кучу одной большой плитой — чистит всю целиком.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad fp-pulse-r\">⏸ ВСЯ КУЧА</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">долгая пауза на всё разом</div></div>"
   },
   {
    "cap": "G1 режет ту же кучу на много мелких равных регионов.",
    "html": "<div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div></div>"
   },
   {
    "cap": "В каждом регионе свой процент мусора — G1 их метит при сканировании.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">R1</span><div class=\"fp-bar\"><span style=\"width:90%\"></span></div><span class=\"fp-token\">🗑 90%</span></div><div class=\"fp-row\"><span class=\"fp-tag\">R2</span><div class=\"fp-bar\"><span style=\"width:20%\"></span></div><span class=\"fp-token\">20%</span></div><div class=\"fp-row\"><span class=\"fp-tag\">R3</span><div class=\"fp-bar\"><span style=\"width:75%\"></span></div><span class=\"fp-token\">🗑 75%</span></div></div>"
   },
   {
    "cap": "Garbage First: первыми берём самые мусорные регионы — макс выгода.",
    "html": "<div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell bad fp-pulse-r\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell bad fp-pulse-r\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad fp-pulse-r\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad fp-pulse-r\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad fp-pulse-r\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad fp-pulse-r\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div></div>"
   },
   {
    "cap": "G1 чистит ровно столько регионов, сколько влезает в целевую паузу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-val\">200</div><span class=\"fp-tag\">мс цель ⏳</span></div><div class=\"fp-row\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-box mut fp-pulse-a\">⏸ бюджет исчерпан</div></div></div>"
   },
   {
    "cap": "Куча огромная, а паузы маленькие и предсказуемые — G1 держит их ровно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">🗑 куча 64 GB</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">✓ 195мс</div><div class=\"fp-box good fp-pulse-g\">✓ 202мс</div><div class=\"fp-box good fp-pulse-g\">✓ 198мс</div></div></div>"
   }
  ]
 },
 {
  "id": "gc-roots",
  "t": "JVM",
  "g": "Сборка мусора",
  "title": "GC roots и достижимость",
  "frames": [
   {
    "cap": "Корни GC: кадры стека потока, ссылки из static-полей, JNI — старт обхода.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">roots</span><div class=\"fp-stack\"><div class=\"fp-slot\">🧵 main()</div><div class=\"fp-slot\">a()</div></div></div><div class=\"fp-box acc fp-pulse-a\">static refs</div><div class=\"fp-box acc fp-pulse-a\">JNI</div></div>"
   },
   {
    "cap": "От корней GC идёт по ссылкам и метит всё достижимое; что не задето — серое.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-g\">root</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">A ✓</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">B ✓</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">C ✓</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">🗑 Z</div></div></div>"
   },
   {
    "cap": "Кадр a() снят со стека — последняя ссылка на B оборвалась.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">🧵 main()</div><div class=\"fp-slot dead fp-blink\">a()</div></div></div><div class=\"fp-arrow\" style=\"color:var(--bad)\">→</div><div class=\"fp-node good\">A ✓</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">✗</div><div class=\"fp-node bad fp-pulse-r\">B</div></div>"
   },
   {
    "cap": "B и C ссылаются друг на друга, но от корня их нет — оба мусор (не счётчик!).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">root</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">A ✓</div></div><div class=\"fp-row\"><span class=\"fp-tag\">🗑</span><div class=\"fp-node bad\">B</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">→</div><div class=\"fp-node bad\">C</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">→</div><div class=\"fp-node bad\">B</div></div></div>"
   },
   {
    "cap": "Достижимое живёт, недостижимое освобождено — неважно, сколько ссылок внутри.",
    "html": "<div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell dead fp-pulse-r\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell dead\"></div></div>"
   }
  ]
 },
 {
  "id": "mem-leak",
  "t": "JVM",
  "g": "Сборка мусора",
  "title": "Утечка памяти при GC",
  "frames": [
   {
    "cap": "Куча: GC удаляет только недостижимое — до чего не дойти от GC Root.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">GC Root</div><div class=\"fp-arrow\">→</div><div class=\"fp-box on fp-pulse-g\">объект 🔗</div><div class=\"fp-box bad fp-blink\">🗑 без ссылки</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell dead fp-blink\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead fp-blink\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead fp-blink\"></div></div></div>"
   },
   {
    "cap": "static-поле само GC Root: всё, что оно держит, навсегда достижимо.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good big\">GC Root: static cache</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token\">🔗 o1</div><div class=\"fp-token\">🔗 o2</div><div class=\"fp-token\">🔗 o3</div><div class=\"fp-token\">🔗 o4</div></div></div>"
   },
   {
    "cap": "add() есть, remove() нет — коллекция пухнет, ссылки держат всё.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">static cache.add(...) ✗ remove</div><div class=\"fp-bar\"><span style=\"width:85%\"></span></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on fp-pulse-r\"></div><div class=\"fp-cell on fp-pulse-r\"></div></div></div>"
   },
   {
    "cap": "Объекты живые, но не нужны — GC бессилен, куча ползёт вверх.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">🗑 GC</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big fp-pulse-r\" style=\"color:var(--bad)\">✗ нечего убрать</div></div><div class=\"fp-val fp-pulse-r\" style=\"color:var(--bad)\">98%</div><div class=\"fp-bar\"><span style=\"width:98%\"></span></div></div>"
   },
   {
    "cap": "Те же грабли: live-объект держит ссылку, а отписаться забыли.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">live publisher</div><div class=\"fp-row\"><div class=\"fp-token bad fp-pulse-r\">🔗 listener</div><div class=\"fp-token bad fp-pulse-r\">🔗 callback</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">unregister() забыли → утечка</div></div>"
   },
   {
    "cap": "ThreadLocal: пул-поток вечен, value не очищен — висит до remove().",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 пул-поток (вечный)</span><div class=\"fp-token bad fp-pulse-r\">value 🔗</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">нет threadLocal.remove() → утечка</div></div>"
   }
  ]
 },
 {
  "id": "race",
  "t": "Concurrency",
  "g": "Основы",
  "title": "Race condition",
  "frames": [
   {
    "cap": "Счётчик в общей памяти равен 5 — ждём, что станет 7.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">counter (память)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-val fp-pulse-a\">5</div><div class=\"fp-row\"><span class=\"fp-tag\">🧵 A</span><span class=\"fp-tag\">🧵 B</span></div></div>"
   },
   {
    "cap": "Без замка оба потока читают одно и то же значение 5.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc fp-pulse-a\">память = 5</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 A</span><div class=\"fp-token\">🔎 прочёл 5</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 B</span><div class=\"fp-token\">🔎 прочёл 5</div></div></div></div>"
   },
   {
    "cap": "Каждый поток у себя локально считает 5+1=6.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 A</span><div class=\"fp-box good fp-pulse-g\">5+1=6</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 B</span><div class=\"fp-box good fp-pulse-g\">5+1=6</div></div></div>"
   },
   {
    "cap": "Оба пишут 6 поверх — второй затирает первого.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 A</span><div class=\"fp-token\">✍️ 6</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 B</span><div class=\"fp-token\">✍️ 6</div></div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-val fp-pulse-r\">6</div></div>"
   },
   {
    "cap": "Итог 6, а ждали 7 — одно увеличение потерялось.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box mut\">ждали</div><div class=\"fp-val good\">7</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">получили</div><div class=\"fp-val bad\">6</div></div><div class=\"fp-token\" style=\"color:var(--bad)\">🗑 +1 потерян</div></div>"
   }
  ]
 },
 {
  "id": "deadlock",
  "t": "Concurrency",
  "g": "Основы",
  "title": "Deadlock",
  "frames": [
   {
    "cap": "Два замка и два потока, и каждому нужны оба замка.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 A</span></div><div class=\"fp-box mut\">🔒 lock1</div><div class=\"fp-box mut\">🔒 lock2</div><div class=\"fp-lane\"><span class=\"name\">🧵 B</span></div></div><div class=\"fp-row\"><div class=\"fp-token\">нужны оба</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">lock1 + lock2</div><div class=\"fp-arrow\">←</div><div class=\"fp-token\">нужны оба</div></div></div>"
   },
   {
    "cap": "A берёт lock1, B берёт lock2 — пока всё хорошо.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 A</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">🔒 lock1</div></div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🔒 lock2</div><div class=\"fp-arrow\">←</div><div class=\"fp-lane\"><span class=\"name\">🧵 B</span></div></div></div>"
   },
   {
    "cap": "Теперь A ждёт lock2, а его держит B.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 A ⏳</span></div><div class=\"fp-box good\">🔒 lock1</div><div class=\"fp-arrow fp-blink\" style=\"color:var(--bad)\">→</div><div class=\"fp-box bad fp-pulse-r\">🔒 lock2</div><div class=\"fp-lane\"><span class=\"name\">🧵 B</span></div></div>"
   },
   {
    "cap": "А B ждёт lock1 — а его держит A. Круг замкнулся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">🔒 lock1</div><div class=\"fp-arrow fp-blink\" style=\"color:var(--bad)\">←</div><div class=\"fp-lane\"><span class=\"name\">🧵 B ⏳</span></div></div><div class=\"fp-row\"><div class=\"fp-box good\">🧵 A</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">→</div><div class=\"fp-box bad fp-pulse-r\">🔒 lock2</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">→</div><div class=\"fp-box good\">🧵 B</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">↺</div></div></div>"
   },
   {
    "cap": "Оба стоят навечно: deadlock, никто не отпустит первым.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad big fp-pulse-r\">🧵 A ⏸</div><div class=\"fp-box dead\">💀 deadlock</div><div class=\"fp-box bad big fp-pulse-r\">🧵 B ⏸</div></div>"
   },
   {
    "cap": "Лечение: брать локи в одном порядке или tryLock с таймаутом.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">🔒 lock1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🔒 lock2</div></div><div class=\"fp-box good fp-pulse-g\">✓ один порядок</div></div><div class=\"fp-box mut\">или</div><div class=\"fp-box acc fp-pulse-a\">⏳ tryLock(timeout)</div></div>"
   }
  ]
 },
 {
  "id": "atomicity-visibility",
  "t": "Concurrency",
  "g": "Основы",
  "title": "Атомарность ≠ видимость",
  "frames": [
   {
    "cap": "Два потока работают с одним полем в памяти.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token\">✍️ пишет</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token\">🔎 читает</div></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big acc\">count</div></div>"
   },
   {
    "cap": "Видимость: T2 видит свежее значение, а не своё кэшированное старьё.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-box acc fp-pulse-a\">count=120</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">🧵 T2 без видимости</span><div class=\"fp-ver dead\">count=0</div><div class=\"fp-box bad\">видит старое ✗</div></div></div>"
   },
   {
    "cap": "Атомарность: count++ это три шага, между ними можно встрять.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">count++</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box mut\">🔎 read</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-token bad fp-blink\">🧵 T2 встрял</div><div class=\"fp-box acc fp-pulse-r\">➕ +1</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">✍️ write</div></div></div>"
   },
   {
    "cap": "volatile даёт видимость, но два потока теряют один инкремент.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-box good\">видит ✓</div><div class=\"fp-token\">read 120</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-box good\">видит ✓</div><div class=\"fp-token\">read 120</div></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big bad fp-pulse-r\">count=121 ✗ (ждали 122)</div></div>"
   },
   {
    "cap": "synchronized/Atomic: lock делает операцию неделимой, второй ждёт.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-box acc fp-pulse-g\">🔒 lock · count++</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-box mut fp-blink\">⏸ ждёт</div></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big good\">count=122 ✓</div></div>"
   },
   {
    "cap": "Итог: volatile = видимость, synchronized/Atomic = видимость + атомарность.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box big mut\" style=\"border-color:var(--acc)\">volatile</div><div class=\"fp-box good\">видимость ✓</div><div class=\"fp-box bad\">атомарность ✗</div></div><div class=\"fp-col\"><div class=\"fp-box big acc fp-pulse-g\">synchronized / Atomic</div><div class=\"fp-box good\">видимость ✓</div><div class=\"fp-box good\">атомарность ✓</div></div></div>"
   }
  ]
 },
 {
  "id": "synchronized-monitor",
  "t": "Concurrency",
  "g": "Основы",
  "title": "synchronized и монитор",
  "frames": [
   {
    "cap": "У каждого объекта есть свой монитор — встроенный замок.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc fp-pulse-a\">🧱 object</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good\">🔒 monitor (lock) — свободен</div></div>"
   },
   {
    "cap": "Поток входит в synchronized и захватывает замок.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token fp-travel\">🔑 →</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big bad fp-pulse-r\">🔒 monitor занят T1</div></div>"
   },
   {
    "cap": "Пока T1 держит замок — остальные потоки ждут.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad\">🔒 держит 🧵 T1</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-box mut fp-blink\">⏳ ждёт</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T3</span><div class=\"fp-box mut fp-blink\">⏳ ждёт</div></div></div></div>"
   },
   {
    "cap": "Один внутри блока — это и есть взаимное исключение.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad big\" style=\"border-color:var(--bad)\">🔒</div><div class=\"fp-box good fp-pulse-g\">🧵 T1 внутри ✓</div><div class=\"fp-box mut\">🧵 T2 ✗</div><div class=\"fp-box mut\">🧵 T3 ✗</div></div>"
   },
   {
    "cap": "На выходе замок отпускается — ждущий поток входит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">🔓 T1 вышел, lock свободен</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token fp-travel\">🔑 захватил →</div></div></div>"
   },
   {
    "cap": "unlock→lock даёт видимость: кто взял lock, видит свежее x.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">было</span><div class=\"fp-ver dead\">x=0</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\">после unlock→lock</span><div class=\"fp-ver good fp-pulse-g\">x=120 👁 видит тот, кто взял lock</div></div></div>"
   }
  ]
 },
 {
  "id": "volatile",
  "t": "Concurrency",
  "g": "Модель памяти",
  "title": "volatile: видимость",
  "frames": [
   {
    "cap": "Поток A пишет flag=true, но значение пока остаётся у него.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 A ✍️</span><div class=\"fp-box acc fp-pulse-a\">flag=true</div><div class=\"fp-tag\">локально</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">общая память<br>flag=false</div></div>"
   },
   {
    "cap": "B читает старое false и крутится в while-цикле вечно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 B 🔎</span><div class=\"fp-box bad fp-pulse-r\">while(!flag){}</div><div class=\"fp-token\">видит false ✗</div></div><div class=\"fp-bar\"><span style=\"width:100%;background:var(--bad)\"></span></div></div>"
   },
   {
    "cap": "Без volatile нет happens-before: JIT держит flag в регистре B.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">A пишет<br>true</div><div class=\"fp-conn\" style=\"border-color:var(--bad)\"></div><div class=\"fp-box bad fp-blink\">⏸ нет гарантии<br>видимости</div><div class=\"fp-conn\" style=\"border-color:var(--bad)\"></div><div class=\"fp-box mut\">регистр B<br>false</div></div>"
   },
   {
    "cap": "volatile: запись и чтение идут прямо в общую память.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">🧵 A ✍️ true</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">volatile flag<br>true</div><div class=\"fp-arrow\">←</div><div class=\"fp-box good\">🧵 B 🔎</div></div><div class=\"fp-token fp-travel\">📨 свежее true</div></div>"
   },
   {
    "cap": "Теперь B видит true сразу и выходит из цикла.",
    "html": "<div class=\"fp-lane\"><span class=\"name\">🧵 B 🔎</span><div class=\"fp-box good fp-pulse-g\">flag==true ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">выход ✓</div></div>"
   },
   {
    "cap": "Но volatile не спасает i++: read и write — два шага, гонка.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">🧵 A: read i=5</div><div class=\"fp-box acc\">🧵 B: read i=5</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box bad\">A пишет 6</div><div class=\"fp-box bad fp-pulse-r\">B пишет 6 ✗</div></div><div class=\"fp-val\" style=\"color:var(--bad)\">6</div></div>"
   }
  ]
 },
 {
  "id": "happens-before",
  "t": "Concurrency",
  "g": "Модель памяти",
  "title": "happens-before",
  "frames": [
   {
    "cap": "Два потока пишут в общую память — кто что увидит, не гарантировано.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1 ✍️</span><div class=\"fp-box acc\">x = 42</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2 🔎</span><div class=\"fp-box bad fp-blink\">x = ?</div></div></div>"
   },
   {
    "cap": "happens-before — это стрелка: если A→B, то всё из A видно в B.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">A: x = 42</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">B: читаю x</div></div>"
   },
   {
    "cap": "unlock happens-before lock ТОГО ЖE замка m — данные доезжают.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-box acc\">x = 42</div><div class=\"fp-box mut\">🔒 unlock m</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-box mut\">🔒 lock m</div><div class=\"fp-box good\">x = 42 ✓</div></div></div>"
   },
   {
    "cap": "volatile write happens-before volatile read того же поля.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">✍️ T1</span><div class=\"fp-box acc\">data=42</div><div class=\"fp-box acc fp-pulse-a\">flag=true</div></div><div class=\"fp-token fp-travel\">📨 volatile</div><div class=\"fp-lane\"><span class=\"name\">🔎 T2</span><div class=\"fp-box good fp-pulse-g\">flag=true</div><div class=\"fp-box good\">data=42 ✓</div></div></div>"
   },
   {
    "cap": "Thread.start happens-before первого действия нового потока.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 main</span><div class=\"fp-box acc\">config готов</div><div class=\"fp-box mut\">start()</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">🧵 new</span><div class=\"fp-box good fp-pulse-g\">видит config ✓</div></div></div>"
   },
   {
    "cap": "Нет стрелки happens-before — нет гарантии: можно увидеть старое значение.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">A: x = 42</div><div class=\"fp-arrow fp-blink\" style=\"color:var(--bad)\">✗</div><div class=\"fp-box bad fp-pulse-r\">B: x = 0 ?!</div></div>"
   }
  ]
 },
 {
  "id": "double-checked-locking",
  "t": "Concurrency",
  "g": "Модель памяти",
  "title": "Double-checked locking",
  "frames": [
   {
    "cap": "Один синглтон на всех. Два потока разом видят: его ещё нет (null).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big mut\">INSTANCE = null</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token fp-pulse-a\">🔎 пусто?</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token fp-pulse-a\">🔎 пусто?</div></div></div></div>"
   },
   {
    "cap": "Первая проверка БЕЗ лока: если уже есть — мгновенно отдаём, без тормозов.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">if (INSTANCE == null)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">не null? ✓ отдать сразу</div></div>"
   },
   {
    "cap": "INSTANCE пуст — берём 🔒 lock. Внутрь пройдёт один поток, второй ждёт.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token good fp-pulse-g\">🔒 вошёл</div></div><div class=\"fp-lane\" style=\"border-color:var(--bad)\"><span class=\"name\">🧵 T2</span><div class=\"fp-token bad fp-blink\">⏸ ждёт лок</div></div></div>"
   },
   {
    "cap": "Под локом — ВТОРАЯ проверка: вдруг кто уже создал. Если нет — строим объект.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">🔒 if (INSTANCE == null)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-g\">new Singleton()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good\">INSTANCE ✓</div></div></div>"
   },
   {
    "cap": "Без volatile первая проверка T2 видит ссылку, но поля ещё пусты — мусор 🗑.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad\">поле БЕЗ volatile</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box mut\">ссылка есть</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div></div><div class=\"fp-box bad fp-pulse-r\">🗑 поля пусты</div></div></div>"
   },
   {
    "cap": "volatile запрещает переупорядочивание: поля готовы ДО публикации ссылки ✓.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good big fp-pulse-g\">volatile INSTANCE 🔑</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">ссылка ✓</div><div class=\"fp-token good\">🧵 T2 видит целый</div></div></div>"
   }
  ]
 },
 {
  "id": "thread-pool",
  "t": "Concurrency",
  "g": "Потоки",
  "title": "Пул потоков",
  "frames": [
   {
    "cap": "Прилетела куча работы — 1000 задач, и все хотят выполниться.",
    "html": "<div class=\"fp-col\"><div class=\"fp-val fp-pulse-a\">1000</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(10,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div><div class=\"fp-box mut\">📨 задач: 1000</div></div>"
   },
   {
    "cap": "Сделать 1000 потоков — каждый ест память, ЦП тонет в переключениях.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">🧵</span><span class=\"fp-tag\">🧵</span><span class=\"fp-tag\">🧵</span><span class=\"fp-tag\">🧵</span><span class=\"fp-tag\">🧵</span><span class=\"fp-tag\">🧵</span><span class=\"fp-tag\">🧵</span><span class=\"fp-tag\">🧵</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad big fp-pulse-r\">RAM почти full</div><div class=\"fp-bar\"><span style=\"width:97%\"></span></div><div class=\"fp-box bad fp-blink\">✗ переключения съели ЦП</div></div>"
   },
   {
    "cap": "Решение: пул из N потоков — берём всего 4 рабочих 🧵.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big\">Thread Pool · N=4</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T3</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T4</span></div></div><div class=\"fp-box good\">✓ RAM спокойна</div><div class=\"fp-bar\"><span style=\"width:18%\"></span></div></div>"
   },
   {
    "cap": "Лишние задачи не теряются — ждут своей очереди в буфере.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">📨</div><div class=\"fp-token\">📨</div><div class=\"fp-token\">📨</div><div class=\"fp-token fp-travel\">📨</div></div><div class=\"fp-box mut\">⏳ очередь</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T3</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T4</span></div></div></div>"
   },
   {
    "cap": "Поток освободился — берёт следующую задачу из очереди и переиспользуется.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">📨</div><div class=\"fp-token fp-travel\">📨 next</div></div><div class=\"fp-box mut\">⏳ очередь короче</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1 ✓</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2 ✓</span></div><div class=\"fp-lane fp-pulse-g\" style=\"border-color:var(--good)\"><span class=\"name\">🧵 T3 ← взял</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T4 ✓</span></div></div></div>"
   },
   {
    "cap": "Итог: 4 потока съели 1000 задач, нагрузка под контролем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-val fp-pulse-g\">1000 ✓</div><div class=\"fp-row\"><div class=\"fp-box mut\">потоков: <strong style=\"color:var(--good)\">4</strong></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big\">стабильно</div></div><div class=\"fp-bar\"><span style=\"width:35%\"></span></div><div class=\"fp-box good fp-pulse-g\">✓ память и ЦП в норме</div></div>"
   }
  ]
 },
 {
  "id": "vthreads",
  "t": "Concurrency",
  "g": "Потоки",
  "title": "Виртуальные потоки (Java 21)",
  "frames": [
   {
    "cap": "Обычные потоки тяжёлые: ОС держит мало штук, на блокировке IO они спят.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 OS-поток</span><div class=\"fp-box big mut\">⏸ ждёт IO</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 OS-поток</span><div class=\"fp-box big mut\">⏸ ждёт IO</div></div><div class=\"fp-row\"><div class=\"fp-val\">~1000</div><div class=\"fp-box bad\">потолок ✗</div></div></div>"
   },
   {
    "cap": "Виртуальные потоки дешёвые: их можно завести миллионами.",
    "html": "<div class=\"fp-col\"><div class=\"fp-val fp-pulse-a\">1 000 000</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell acc\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell acc\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell acc\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell acc\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell acc\"></div></div><div class=\"fp-box good\">🧵 virtual — почти бесплатны</div></div>"
   },
   {
    "cap": "Миллионы виртуальных едут поверх горстки carrier'ов (реальных OS-потоков).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">VT1</span><span class=\"fp-tag\">VT2</span><span class=\"fp-tag\">VT3</span><span class=\"fp-tag\">VT4</span><span class=\"fp-tag\">…M</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">C1</div><div class=\"fp-node acc fp-pulse-a\">C2</div><div class=\"fp-node acc fp-pulse-a\">C3</div></div><div class=\"fp-box mut\">carrier = реальный OS-поток (их мало)</div></div>"
   },
   {
    "cap": "На блокировке IO виртуальный отцепляется от carrier'а — место освобождается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node mut\">C1</div><div class=\"fp-conn\"></div><div class=\"fp-token fp-float\" style=\"border-color:var(--bad)\">🧵 VT1 ⏸ IO</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">отцеплен</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-node acc fp-pulse-g\">C1 свободен ✓</div></div>"
   },
   {
    "cap": "Свободный carrier тут же берёт другой готовый виртуальный поток.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">🧵 VT9 готов</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node good fp-pulse-g\">C1 ▶ VT9</div><div class=\"fp-row\"><div class=\"fp-box mut\">VT1 ⏳ ждёт IO (отцеплен)</div><div class=\"fp-box good\">carrier не простаивает ✓</div></div></div>"
   },
   {
    "cap": "Итог: масштаб реактивщины, а код — простой блокирующий.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box good big fp-pulse-g\">✓ блокирующий код</div><div class=\"fp-stack\"><div class=\"fp-slot\">read()</div><div class=\"fp-slot\">call()</div><div class=\"fp-slot\">main()</div></div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-val fp-pulse-a\">1M</div><div class=\"fp-bar\"><span style=\"width:95%\"></span></div><div class=\"fp-box acc\">масштаб реактивщины</div></div></div>"
   }
  ]
 },
 {
  "id": "threadlocal-leak",
  "t": "Concurrency",
  "g": "Потоки",
  "title": "ThreadLocal в пуле",
  "frames": [
   {
    "cap": "Пул держит мало потоков и гоняет их по кругу между запросами.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">🏊 Пул потоков</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span></div></div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">📨 запрос A</div><div class=\"fp-token fp-travel\">📨 запрос B</div></div></div>"
   },
   {
    "cap": "Запрос Алисы сел на T1 и положил свой userId в ThreadLocal.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token\">📨 запрос Алисы</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\" style=\"border-color:var(--acc)\"><span class=\"name\">🧵 T1</span><div class=\"fp-box acc fp-pulse-a\">🔑 user=Алиса</div></div></div>"
   },
   {
    "cap": "Запрос закончился, но remove() не вызвали — значение осталось висеть.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">запрос Алисы ✓ готов</div><div class=\"fp-box bad\">remove() ✗ забыли</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\" style=\"border-color:var(--bad)\"><span class=\"name\">🧵 T1</span><div class=\"fp-box bad fp-blink\">🔑 user=Алиса (висит)</div></div></div>"
   },
   {
    "cap": "Тот же T1 берёт запрос Боба — и читает чужой userId Алисы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">📨 запрос Боба</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\" style=\"border-color:var(--bad)\"><span class=\"name\">🧵 T1</span><div class=\"fp-box bad fp-pulse-r\">🔑 user=Алиса</div></div><div class=\"fp-box bad\">Боб видит данные Алисы ✗</div></div>"
   },
   {
    "cap": "Лечится так: всегда чистим ThreadLocal в finally через remove().",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">try { set(user) … }</div><div class=\"fp-slot\">finally { tl.remove() 🗑 }</div></div><div class=\"fp-box good\">🗑 remove() в finally</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">🧵 T1</span><div class=\"fp-box good fp-pulse-g\">пусто ✓ чисто</div></div></div>"
   }
  ]
 },
 {
  "id": "concurrenthashmap",
  "t": "Concurrency",
  "g": "Потоки",
  "title": "ConcurrentHashMap",
  "frames": [
   {
    "cap": "Мапа — шкафчик с ячейками-бакетами, ключи разложены по ним.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">🔑 ключи</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div></div></div>"
   },
   {
    "cap": "synchronized-мапа: один 🔒 на ВСю мапу — потоки ждут в очереди.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 t1</span><span class=\"fp-tag\" style=\"color:var(--good)\">пишет ✓</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 t2</span><span class=\"fp-tag\" style=\"color:var(--bad)\">⏳ ждёт</span></div><div class=\"fp-lane\"><span class=\"name\">🧵 t3</span><span class=\"fp-tag\" style=\"color:var(--bad)\">⏳ ждёт</span></div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad big fp-pulse-r\">🔒 ВСЯ МАПА</div></div>"
   },
   {
    "cap": "Очередь из одного: даже разные ячейки трогать одновременно нельзя.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token mut\">🧵 t2 ⏸</div><div class=\"fp-token mut\">🧵 t3 ⏸</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid fp-pulse-r\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div></div></div>"
   },
   {
    "cap": "ConcurrentHashMap: в пустой бакет кладём через CAS, без всякого 🔒.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token good\">🧵 t1</div><div class=\"fp-token good\">🧵 t2</div><div class=\"fp-token good\">🧵 t3</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell good fp-pulse-g\"><span>CAS</span></div><div class=\"fp-cell\"></div><div class=\"fp-cell good fp-pulse-g\"><span>CAS</span></div><div class=\"fp-cell\"></div><div class=\"fp-cell good fp-pulse-g\"><span>CAS</span></div></div></div>"
   },
   {
    "cap": "Разные бакеты → потоки пишут параллельно, никакой общей очереди.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🧵 t1 ✓</div><div class=\"fp-box good fp-pulse-g\">🧵 t2 ✓</div><div class=\"fp-box good fp-pulse-g\">🧵 t3 ✓</div></div><div class=\"fp-bar\"><span style=\"width:95%\"></span></div></div>"
   },
   {
    "cap": "🔒 берётся только при коллизии — на head-узел бакета, остальное свободно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">🔒 коллизия в бакете</div><div class=\"fp-box good\">✓ остальное free</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell bad fp-pulse-r\"><span>🔒</span></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell good fp-pulse-g\"></div></div></div>"
   }
  ]
 },
 {
  "id": "di-lifecycle",
  "t": "Spring",
  "g": "DI и контейнер",
  "title": "Жизненный цикл бина",
  "frames": [
   {
    "cap": "Контейнер берёт чертёж-класс и лепит из него объект-бин.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">📋 класс</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">🫘 new()</div><div class=\"fp-box\" style=\"border-color:var(--line)\">контейнер</div></div>"
   },
   {
    "cap": "Внутрь бина контейнер вставляет нужные ему зависимости.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big\">🫘 бин</div><div class=\"fp-arrow\">↑</div><div class=\"fp-row\"><div class=\"fp-token fp-float\">🔑 repo</div><div class=\"fp-token fp-float\">🔑 service</div></div></div>"
   },
   {
    "cap": "BeanPostProcessor оборачивает @PostConstruct — донастройка перед работой.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">🫘 бин</div><div class=\"fp-arrow\">→</div><div class=\"fp-box fp-pulse-a\" style=\"border-color:var(--acc)\">⚙️ PostProcessor</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\" style=\"border-color:var(--good)\">@PostConstruct</div></div>"
   },
   {
    "cap": "Бин готов — лежит в контейнере и обслуживает запросы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good big fp-pulse-g\">✓ 🫘 готов</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token\">📨 запрос</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">ответ</div></div></div>"
   },
   {
    "cap": "При остановке контекста срабатывает @PreDestroy и бин уничтожается.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">⏸ stop</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">@PreDestroy</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver dead\">🗑 🫘 бин</div></div>"
   },
   {
    "cap": "Spring собирает бины на старте, Quarkus — заранее на сборке.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">Spring</span><div class=\"fp-bar\"><span style=\"width:90%\"></span></div><div class=\"fp-box mut\">🚀 старт</div></div><div class=\"fp-row\"><span class=\"fp-tag\">Quarkus</span><div class=\"fp-bar\"><span style=\"width:25%\"></span></div><div class=\"fp-box good\">🔨 сборка</div></div></div>"
   }
  ]
 },
 {
  "id": "cglib-config",
  "t": "Spring",
  "g": "DI и контейнер",
  "title": "@Configuration под CGLIB",
  "frames": [
   {
    "cap": "Spring не берёт @Configuration как есть — он оборачивает его в CGLIB-прокси.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big\">@Configuration AppConfig</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">🔒 CGLIB-прокси (подкласс)</div></div>"
   },
   {
    "cap": "Внутри @Bean foo() напрямую вызывает другой @Bean bar().",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">@Bean foo()</div><div class=\"fp-lane\"><span class=\"name\">внутри</span><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">@Bean bar()</div></div></div>"
   },
   {
    "cap": "Без прокси каждый вызов bar() лепил бы новый объект — дубли.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad\">наивно: new при каждом вызове</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token bad\">bar #1</div><div class=\"fp-token bad\">bar #2</div><div class=\"fp-token bad\">bar #3 🗑</div></div></div>"
   },
   {
    "cap": "Прокси перехватывает bar(): первый раз создаёт и кладёт в контейнер.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">🔒 прокси перехватил bar()</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">контейнер</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell good on\">bar</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div></div>"
   },
   {
    "cap": "Дальше каждый вызов bar() отдаёт готовый бин из контейнера — без new.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">2-й вызов bar()</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">контейнер</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell good on fp-pulse-g\">bar</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div></div>"
   },
   {
    "cap": "Любой вызывающий внутри конфига получает ОДИН и тот же синглтон.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token good\">foo()→bar</div><div class=\"fp-token good\">qux()→bar</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good big fp-pulse-g\">🔑 один bar (singleton)</div></div>"
   }
  ]
 },
 {
  "id": "circular-dep",
  "t": "Spring",
  "g": "DI и контейнер",
  "title": "Циклическая зависимость",
  "frames": [
   {
    "cap": "Бин A хочет B, а бин B хочет A — петля.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-node acc fp-pulse-a\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-tag\">нужен B</div></div><div class=\"fp-box big mut\">🔁</div><div class=\"fp-col\"><div class=\"fp-node acc fp-pulse-a\">B</div><div class=\"fp-arrow\">→</div><div class=\"fp-tag\">нужен A</div></div></div>"
   },
   {
    "cap": "Field/setter: Spring создаёт A и кладёт раннюю ссылку в кеш.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">✍️ new A() — поля ещё пустые</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><span class=\"fp-tag\">кеш</span><div class=\"fp-box acc fp-pulse-a\">🔑 ранняя ссылка A</div></div></div>"
   },
   {
    "cap": "Создаём B — он берёт раннюю ссылку на A из кеша.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">B готов</div><div class=\"fp-arrow\">→</div><div class=\"fp-token fp-travel\">🔑 ранний A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">A в кеше</div></div>"
   },
   {
    "cap": "B вставился в A — оба собраны, петля разорвана ✓.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-node good fp-pulse-g\">A</div><div class=\"fp-tag\">держит B</div></div><div class=\"fp-conn\"></div><div class=\"fp-box big good\">✓</div><div class=\"fp-conn\"></div><div class=\"fp-col\"><div class=\"fp-node good fp-pulse-g\">B</div><div class=\"fp-tag\">держит A</div></div></div>"
   },
   {
    "cap": "Constructor-инъекция: A нельзя создать без B и наоборот.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">new A(B?)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">нет B</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">new B(A?)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">нет A</div></div>"
   },
   {
    "cap": "Замкнутый круг конструкторов → Spring падает с ошибкой ✗.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad fp-pulse-r fp-blink\">✗ BeanCurrentlyInCreationException</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-node bad\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node bad\">B</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">🔁 неразрешимый цикл</div></div></div>"
   }
  ]
 },
 {
  "id": "bean-scopes",
  "t": "Spring",
  "g": "DI и контейнер",
  "title": "singleton vs prototype",
  "frames": [
   {
    "cap": "Singleton: контейнер создаёт объект один раз и раздаёт всем одну ссылку.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc fp-pulse-a\">🔑 Bean #1 (singleton)</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">клиент A</div><div class=\"fp-box mut\">клиент B</div><div class=\"fp-box mut\">клиент C</div></div></div>"
   },
   {
    "cap": "Prototype: новый объект на каждый запрос из контейнера.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">🏭 prototype</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-box good fp-float\">obj #1</div><div class=\"fp-box good fp-float\">obj #2</div><div class=\"fp-box good fp-float\">obj #3</div></div></div>"
   },
   {
    "cap": "Ловушка: singleton просит prototype один раз при сборке и хранит ту же ссылку.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc fp-pulse-a\">singleton</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">prototype obj #1 🔒</div></div>"
   },
   {
    "cap": "Зовёшь снова и снова — а внутри всё та же одна копия.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">call 1</span><span class=\"fp-tag\">call 2</span><span class=\"fp-tag\">call 3</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box bad\">obj #1</div><div class=\"fp-box bad\">obj #1</div><div class=\"fp-box bad\">obj #1</div></div><div class=\"fp-box mut fp-blink\">де-факто синглтон ✗</div></div>"
   },
   {
    "cap": "Фикс: scoped-proxy или Provider дёргает контейнер на каждый вызов.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\">singleton</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">🪞 proxy / Provider</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-token fp-travel\">obj #1</div><div class=\"fp-token fp-travel\">obj #2</div><div class=\"fp-token fp-travel\">obj #3</div></div></div>"
   },
   {
    "cap": "Итог: настроил правильно — снова новый объект на каждый вызов ✓.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">get()</span><span class=\"fp-tag\">get()</span><span class=\"fp-tag\">get()</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">obj #1 ✓</div><div class=\"fp-box good fp-pulse-g\">obj #2 ✓</div><div class=\"fp-box good fp-pulse-g\">obj #3 ✓</div></div></div>"
   }
  ]
 },
 {
  "id": "proxy-self",
  "t": "Spring",
  "g": "AOP и прокси",
  "title": "Self-invocation",
  "frames": [
   {
    "cap": "Прокси оборачивает бин снаружи, как чехол — все идут через него.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc big fp-pulse-a\">🔒 PROXY<div class=\"fp-row\" style=\"margin-top:8px\"><div class=\"fp-box good\">myBean</div></div></div></div>"
   },
   {
    "cap": "Внешний вызов идёт через прокси → @Transactional срабатывает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">📨 call methodA()</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-g\">🔒 PROXY ✓ открыл транзакцию</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good\">myBean.methodA()</div></div>"
   },
   {
    "cap": "Внутри methodA вызывает this.methodB() — мимо прокси, напрямую.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">🔒 PROXY</div><div class=\"fp-box good\">methodA()<div class=\"fp-row\" style=\"margin-top:8px\"><div class=\"fp-token fp-pulse-r\">this.methodB()</div></div></div><div class=\"fp-arrow\" style=\"color:var(--bad)\">↩</div><div class=\"fp-box bad\">methodB() тут же, рядом</div></div>"
   },
   {
    "cap": "this — это сам бин, а не прокси: чехол обходим стороной.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">🔒 PROXY</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">✗</div><div class=\"fp-col\"><div class=\"fp-box good\">methodA()</div><div class=\"fp-arrow\" style=\"color:var(--good)\">↓</div><div class=\"fp-box good\">methodB()</div></div></div>"
   },
   {
    "cap": "Advice на methodB не сработал → @Transactional молча игнор.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-blink\">methodB() @Transactional ✗</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div></div></div>"
   },
   {
    "cap": "Лечим: вызов через сосед-бин или self-инъекцию прокси.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">methodA()</div><div class=\"fp-arrow\" style=\"color:var(--good)\">↓</div><div class=\"fp-token fp-travel\" style=\"border-color:var(--good)\">self.methodB()</div><div class=\"fp-arrow\" style=\"color:var(--good)\">↓</div><div class=\"fp-box acc fp-pulse-g\">🔒 PROXY ✓ снова в игре</div></div>"
   }
  ]
 },
 {
  "id": "jdk-vs-cglib",
  "t": "Spring",
  "g": "AOP и прокси",
  "title": "JDK proxy vs CGLIB",
  "frames": [
   {
    "cap": "Spring не отдаёт твой бин напрямую — он подсовывает прокси-обёртку.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc fp-pulse-a\">🫘 Bean</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good fp-float\">🎭 Proxy</div></div>"
   },
   {
    "cap": "Есть интерфейс — JDK-прокси реализует тот же интерфейс и оборачивает бин.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">interface PayService</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">🎭 JDK Proxy implements PayService</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">PayServiceImpl</div></div></div>"
   },
   {
    "cap": "Нет интерфейса — CGLIB генерит подкласс твоего класса.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big\">class Report</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good big fp-pulse-g\">🎭 extends Report (CGLIB)</div></div>"
   },
   {
    "cap": "Подкласс переопределяет метод, перехватывает вызов и зовёт super.",
    "html": "<div class=\"fp-stack\"><div class=\"fp-slot good\">Report$$CGLIB.save() ✓ перехват</div><div class=\"fp-slot mut\">super.save()</div></div>"
   },
   {
    "cap": "А final наследовать нельзя — на final-классе/методе CGLIB падает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad big\">🔒 final class Report</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">↓</div><div class=\"fp-box bad fp-pulse-r fp-blink\">✗ CGLIB не может</div></div>"
   },
   {
    "cap": "Итог: интерфейс → JDK, класс → CGLIB, final → никак.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag\">interface</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🎭 JDK</div></div><div class=\"fp-row\"><div class=\"fp-tag\">class</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">🎭 CGLIB</div></div><div class=\"fp-row\"><div class=\"fp-tag\">🔒 final</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">✗</div></div></div>"
   }
  ]
 },
 {
  "id": "aop-common",
  "t": "Spring",
  "g": "AOP и прокси",
  "title": "Одна прокси-механика",
  "frames": [
   {
    "cap": "Спринг не вызывает твой бин напрямую — он прячет его за прокси.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token fp-float\">📨 вызов</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc big fp-pulse-a\">PROXY</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">твой бин</div></div>"
   },
   {
    "cap": "Прокси — общая обёртка: тут живут @Transactional @Async @Cacheable @PreAuthorize.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big fp-pulse-a\">PROXY</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box mut\">🔒 @Transactional</div><div class=\"fp-box mut\">🧵 @Async</div><div class=\"fp-box mut\">🔑 @Cacheable</div><div class=\"fp-box mut\">✓ @PreAuthorize</div></div></div>"
   },
   {
    "cap": "Внешний вызов идёт через прокси — обёртка срабатывает, всё ок.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">📨</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-g\" style=\"border-color:var(--good)\">PROXY ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">method()</div></div>"
   },
   {
    "cap": "Но this.method() — внутренний вызов мимо прокси: обёртка не сработала.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">PROXY ⏸</div><div class=\"fp-conn\"></div><div class=\"fp-col\"><div class=\"fp-box good\">a()</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">↓ this.b()</div><div class=\"fp-box bad fp-pulse-r\">b() ✗ без обёртки</div></div></div>"
   },
   {
    "cap": "И final тоже убивает прокси — наследовать/обернуть нельзя.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-blink\" style=\"color:var(--bad)\">final method() ✗</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">PROXY обернуть не смог 🗑</div></div>"
   },
   {
    "cap": "Итог: одна прокси на все 4 — лечи self-invocation и убирай final.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big fp-pulse-a\">1 PROXY</div><div class=\"fp-row\"><div class=\"fp-box good\">🔒</div><div class=\"fp-box good\">🧵</div><div class=\"fp-box good\">🔑</div><div class=\"fp-box good\">✓</div></div><div class=\"fp-row\"><div class=\"fp-tag\" style=\"border-color:var(--bad)\">self-invocation</div><div class=\"fp-tag\" style=\"border-color:var(--bad)\">final</div></div></div>"
   }
  ]
 },
 {
  "id": "tx-rollback",
  "t": "Spring",
  "g": "Транзакции",
  "title": "Правила отката @Transactional",
  "frames": [
   {
    "cap": "Три записи идут внутри одной транзакции метода.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">@Transactional</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">✍️ A</div><div class=\"fp-box good\">✍️ B</div><div class=\"fp-box mut\">✍️ C ⏳</div></div></div>"
   },
   {
    "cap": "Вылетел RuntimeException — Spring откатывает всё, в БД пусто.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad big fp-pulse-r\">💥 RuntimeException</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box bad\">✗ A</div><div class=\"fp-box bad\">✗ B</div><div class=\"fp-box bad\">✗ C</div></div><div class=\"fp-tag\" style=\"border-color:var(--bad);color:var(--bad)\">ROLLBACK</div></div>"
   },
   {
    "cap": "Вылетел checked Exception — по умолчанию Spring делает КОММИТ.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big fp-pulse-a\" style=\"border-color:var(--acc)\">⚠️ checked Exception</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">✓ A</div><div class=\"fp-box good\">✓ B</div><div class=\"fp-box mut\">⏳ C не дошли</div></div><div class=\"fp-tag\" style=\"border-color:var(--good);color:var(--good)\">COMMIT</div></div>"
   },
   {
    "cap": "Итог: что записали до исключения — осталось в БД. Частичные данные.",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(3,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell dead\"></div></div><div class=\"fp-row\"><div class=\"fp-box good\">A ✓ в БД</div><div class=\"fp-box good\">B ✓ в БД</div><div class=\"fp-box mut\">C нет</div></div></div>"
   },
   {
    "cap": "Лечение: rollbackFor=Exception.class — откат на ЛЮБОМ Exception.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag fp-pulse-g\" style=\"border-color:var(--good);color:var(--good)\">@Transactional</div><div class=\"fp-tag\" style=\"border-color:var(--good);color:var(--good)\">rollbackFor=Exception.class</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box\" style=\"border-color:var(--acc)\">⚠️ checked Exception</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box bad\">✗ A</div><div class=\"fp-box bad\">✗ B</div><div class=\"fp-box bad\">✗ C</div></div><div class=\"fp-tag\" style=\"border-color:var(--bad);color:var(--bad)\">ROLLBACK</div></div>"
   }
  ]
 },
 {
  "id": "requires-new",
  "t": "Spring",
  "g": "Транзакции",
  "title": "REQUIRES_NEW",
  "frames": [
   {
    "cap": "Внешняя транзакция открыта и записала A (пока не закоммичено).",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">TX-внешняя · conn-1</span><div class=\"fp-box acc fp-pulse-a\">🔓 открыта</div></div><div class=\"fp-row\"><div class=\"fp-ver\" style=\"color:var(--mut)\">A: pending ⏳</div></div></div>"
   },
   {
    "cap": "REQUIRES_NEW ставит внешнюю на паузу и берёт новое соединение.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">TX-внешняя · conn-1</span><div class=\"fp-box mut fp-blink\">⏸ suspend</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">TX-внутренняя · conn-2</span><div class=\"fp-box good fp-pulse-g\">🔓 новая</div></div></div>"
   },
   {
    "cap": "Внутренняя пишет B и коммитится сама — B становится durable.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">TX-внутренняя · conn-2</span><div class=\"fp-row\"><div class=\"fp-ver\">B: записано</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">✓ COMMIT</div></div></div></div>"
   },
   {
    "cap": "Внешняя возобновляется на conn-1, но падает с ошибкой.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">TX-внешняя · conn-1</span><div class=\"fp-box acc\">▶ resume</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">✗ ошибка</div></div>"
   },
   {
    "cap": "Откат внешней убирает A; B уже закоммичена и остаётся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">ROLLBACK внешней</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-ver dead\">🗑 A: откат</div><div class=\"fp-ver\" style=\"border-color:var(--good)\">✓ B: durable</div></div></div>"
   }
  ]
 },
 {
  "id": "tx-threadlocal",
  "t": "Spring",
  "g": "Транзакции",
  "title": "Транзакция живёт на потоке",
  "frames": [
   {
    "cap": "Открыли транзакцию — Spring кладёт её соединение в ThreadLocal потока.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 thread-1</span><div class=\"fp-box acc fp-pulse-a\">🔒 TX + Connection</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">ThreadLocal: thread-1 → этот Connection</div></div>"
   },
   {
    "cap": "Весь код в этом потоке видит ОДНУ транзакцию — берёт её из ThreadLocal.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">🔒 TX</div><div class=\"fp-arrow\">↓</div><div class=\"fp-stack\"><div class=\"fp-slot\">service()</div><div class=\"fp-slot\">repoA.save()</div><div class=\"fp-slot\">repoB.save()</div></div><div class=\"fp-token\" style=\"border-color:var(--good);color:var(--good)\">✓ та же TX</div></div>"
   },
   {
    "cap": "Один поток — одна транзакция: все операции уйдут в общий commit.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 thread-1</span><div class=\"fp-token\">save A</div><div class=\"fp-token\">save B</div><div class=\"fp-token\">save C</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">✓ COMMIT — всё разом</div></div>"
   },
   {
    "cap": "Запустил @Async — это ДРУГОЙ поток, у него свой пустой ThreadLocal.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 thread-1</span><div class=\"fp-box acc\">🔒 TX</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-token fp-travel\">📨 @Async</div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">🧵 thread-2</span><div class=\"fp-box bad\">ThreadLocal пуст</div></div></div>"
   },
   {
    "cap": "parallelStream дробит работу по потокам — транзакция туда НЕ доедет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">🔒 TX (thread-1)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 t-1</span><div class=\"fp-box good\">TX ✓</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 t-2</span><div class=\"fp-box bad fp-blink\">TX ✗</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 t-3</span><div class=\"fp-box bad fp-blink\">TX ✗</div></div></div></div>"
   },
   {
    "cap": "Итог: TX привязана к потоку; ушёл в другой поток — она не передалась.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">🧵 + 🔒 TX</div><div class=\"fp-token\" style=\"border-color:var(--good);color:var(--good)\">✓ один поток = одна TX</div></div><div class=\"fp-conn\"></div><div class=\"fp-col\"><div class=\"fp-box bad\">🧵 другой поток</div><div class=\"fp-token\" style=\"border-color:var(--bad);color:var(--bad)\">✗ TX не передалась</div></div></div>"
   }
  ]
 },
 {
  "id": "n-plus-1",
  "t": "Spring",
  "g": "Data / JPA",
  "title": "N+1 запросов",
  "frames": [
   {
    "cap": "Берём список заказов — это ровно ОДИН SQL-запрос в базу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big fp-pulse-a\">SELECT * FROM orders</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box\">order 1</div><div class=\"fp-box\">order 2</div><div class=\"fp-box\">order 3</div><div class=\"fp-box mut\">…</div><div class=\"fp-box\">order N</div></div><div class=\"fp-tag\">1 запрос</div></div>"
   },
   {
    "cap": "У каждого заказа есть ленивый client — пока он не тронут.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box\">order 1</div><div class=\"fp-box mut\">client ⏳</div></div><div class=\"fp-col\"><div class=\"fp-box\">order 2</div><div class=\"fp-box mut\">client ⏳</div></div><div class=\"fp-col\"><div class=\"fp-box\">order 3</div><div class=\"fp-box mut\">client ⏳</div></div></div>"
   },
   {
    "cap": "Трогаем client заказа — летит отдельный запрос по его id.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box\">order 1 → client</div><div class=\"fp-token fp-travel\">🔎 SELECT client WHERE id=o1.client_id</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad fp-pulse-r\">+1 запрос в базу</div></div>"
   },
   {
    "cap": "На N заказов — N запросов по клиентам, плюс первый: итого N+1.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-cell acc\"></div><span class=\"fp-tag\">1 × orders</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div></div><span class=\"fp-tag\" style=\"color:var(--bad)\">N × client</span><div class=\"fp-val\" style=\"color:var(--bad)\">N+1</div></div>"
   },
   {
    "cap": "Лечим: JOIN FETCH или @EntityGraph — один запрос с join.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-val\" style=\"color:var(--bad)\">N+1</div><div class=\"fp-arrow\">→</div><div class=\"fp-val\" style=\"color:var(--good)\">1</div></div><div class=\"fp-box good big fp-pulse-g\">SELECT o JOIN FETCH o.client</div><div class=\"fp-tag\">@EntityGraph</div></div>"
   },
   {
    "cap": "Заказы и клиенты приходят вместе за один поход в базу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">orders ⨝ clients</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">o1 ✓ client</div><div class=\"fp-box good\">o2 ✓ client</div><div class=\"fp-box good\">o3 ✓ client</div><div class=\"fp-box good\">oN ✓ client</div></div><div class=\"fp-val\" style=\"color:var(--good)\">1</div></div>"
   }
  ]
 },
 {
  "id": "lazy-init",
  "t": "Spring",
  "g": "Data / JPA",
  "title": "LazyInitializationException",
  "frames": [
   {
    "cap": "Entity Order, а внутри список items помечен LAZY — не грузится сразу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">Order #7</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box mut\">items <span class=\"fp-tag\">LAZY</span></div><div class=\"fp-box mut fp-blink\">⏳ ещё не загружен</div></div></div>"
   },
   {
    "cap": "В транзакции persistence context открыт — ленивую связь можно догрузить.",
    "html": "<div class=\"fp-lane\"><span class=\"name\">@Transactional</span><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🔓 context открыт</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">order.getItems() ✓</div></div></div>"
   },
   {
    "cap": "Метод вернул Order наружу — транзакция закрылась, context умер.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">@Transactional</span><div class=\"fp-box good\">return order</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">🔒 context закрыт ✗</div></div>"
   },
   {
    "cap": "Снаружи трогаем lazy-список — грузить уже нечем → исключение.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">Controller / View</div><div class=\"fp-arrow\">↓</div><div class=\"fp-token fp-travel\">order.getItems()</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big bad fp-pulse-r\">💥 LazyInitializationException</div></div>"
   },
   {
    "cap": "Лечим: грузим нужное ещё в транзакции — JOIN FETCH или сразу в DTO.",
    "html": "<div class=\"fp-lane\"><span class=\"name\">@Transactional</span><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">JOIN FETCH items</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📦 OrderDTO с items</div></div></div>"
   },
   {
    "cap": "Наружу отдаём готовый DTO — лениться нечему, исключения нет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-float\">📦 OrderDTO</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">Controller / View</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">items уже тут ✓</div></div>"
   }
  ]
 },
 {
  "id": "osiv",
  "t": "Spring",
  "g": "Data / JPA",
  "title": "Open Session In View",
  "frames": [
   {
    "cap": "Запрос: сервис достал заказ, но позиции — lazy, ещё не загружены.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">📨 GET /order/7</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box acc\">Order 7</div><div class=\"fp-box mut\">items ⏳ lazy</div></div></div>"
   },
   {
    "cap": "Без OSIV: сессия закрылась, вьюха трогает lazy и падает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🔒 session закрыта</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad fp-pulse-r\">view: order.items ✗ LazyInitException</div></div>"
   },
   {
    "cap": "OSIV держит persistence context открытым до конца ответа.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">controller</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">service</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">view</span></div><div class=\"fp-box good big fp-pulse-g\">🔓 session открыта весь путь</div></div>"
   },
   {
    "cap": "Теперь lazy во вьюхе тихо догружается — ошибки нет, дефолт on.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">view: order.items ✓</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token\" style=\"border-color:var(--good)\">item A</div><div class=\"fp-token\" style=\"border-color:var(--good)\">item B</div><div class=\"fp-token fp-blink\" style=\"border-color:var(--good)\">item C ↺</div></div></div>"
   },
   {
    "cap": "Цена 1: соединение из пула занято до конца рендера.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">🔒 DB connection занят</div><div class=\"fp-bar\"><span style=\"width:88%\"></span></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div></div></div>"
   },
   {
    "cap": "Цена 2: каждый item во вьюхе — свой SELECT, скрытый N+1.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">item A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">SELECT</div></div><div class=\"fp-row\"><div class=\"fp-token\">item B</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">SELECT</div></div><div class=\"fp-row\"><div class=\"fp-token\">item C</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">SELECT</div></div><div class=\"fp-val\">N+1</div></div>"
   }
  ]
 },
 {
  "id": "dirty-checking",
  "t": "Spring",
  "g": "Data / JPA",
  "title": "Dirty checking",
  "frames": [
   {
    "cap": "Грузим строку: Hibernate отдаёт managed-объект и прячет копию-снапшот.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">managed</span><div class=\"fp-box acc fp-pulse-a\">user.name = Ali</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\">snapshot</span><div class=\"fp-box mut\">📸 name = Ali</div></div></div>"
   },
   {
    "cap": "Меняешь поле в памяти — просто сеттер, save() не зовёшь, БД ещё не тронута.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">✍️ user.setName(\"Bek\")</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">name = Bek</div><div class=\"fp-box mut\">📸 name = Ali</div></div></div>"
   },
   {
    "cap": "На flush Hibernate сравнивает объект со снапшотом поле за полем.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Bek</div><div class=\"fp-box big fp-blink\" style=\"color:var(--bad)\">≠</div><div class=\"fp-box mut\">📸 Ali</div></div>"
   },
   {
    "cap": "Разошлось — Hibernate сам строит UPDATE, ты его не писал.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">DIRTY ✗</div><div class=\"fp-arrow\">↓</div><div class=\"fp-token fp-travel\">UPDATE users SET name=Bek</div></div>"
   },
   {
    "cap": "Случайно тронул managed-объект — словил незапланированный UPDATE в БД.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">⚠ случайный сеттер</span><div class=\"fp-token\">user.status = X</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell bad fp-pulse-r\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div><div class=\"fp-box bad\">внезапный UPDATE 💥</div></div>"
   },
   {
    "cap": "Итог: dirty checking = автосейв managed-строк, save() не нужен.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">managed</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good\">📸 diff</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">auto UPDATE ✓</div></div>"
   }
  ]
 },
 {
  "id": "autoconfig",
  "t": "Spring",
  "g": "Boot и конфиг",
  "title": "Автоконфигурация",
  "frames": [
   {
    "cap": "Кидаешь стартер — он транзитивно тащит JAR и список авто-конфигов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">📦 spring-boot-starter-data-jpa</div><div class=\"fp-arrow\">↓</div><div class=\"fp-stack\"><div class=\"fp-slot\">DataSourceAutoConfiguration</div><div class=\"fp-slot\">HibernateJpaAutoConfiguration</div><div class=\"fp-slot\">JacksonAutoConfiguration</div></div></div>"
   },
   {
    "cap": "Каждый авто-конфиг — класс-конфиг под охраной двух условий.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc big fp-pulse-a\">DataSource<br/>AutoConfig</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\">@ConditionalOnClass</span><span class=\"fp-tag\">@ConditionalOnMissingBean</span></div></div>"
   },
   {
    "cap": "Условие №1: класс на classpath? Нет драйвера — конфиг спит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">🔎 DataSource.class на classpath</div><div class=\"fp-token good\">✓</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-g\">конфиг включается</div></div>"
   },
   {
    "cap": "Условие №2: ты сам определил бин? Тогда авто-бин не лезет.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">✍️ твой @Bean<br/>DataSource</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\" style=\"color:var(--bad)\">🗑 авто-бин<br/>✗ пропущен</div></div>"
   },
   {
    "cap": "Оба условия выполнены — Boot создаёт бин сам.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">classpath ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">своего бина нет ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc big fp-pulse-g\">авто-DataSource</div></div>"
   },
   {
    "cap": "Хочешь по-своему — кидаешь свой бин, и Boot уступает место.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">classpath</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">твой бин</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">авто</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good big fp-pulse-g\">✓ приложение готово</div></div>"
   }
  ]
 },
 {
  "id": "filter-chain",
  "t": "Spring",
  "g": "Security",
  "title": "Цепочка фильтров Security",
  "frames": [
   {
    "cap": "Перед контроллером стоит цепочка фильтров — стена с проверками.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token fp-travel\">📨 запрос</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big acc fp-pulse-a\">🔒 цепочка фильтров</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">контроллер</div></div>"
   },
   {
    "cap": "Фильтр 1: аутентификация — кто ты? Проверяем логин и пароль.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">📨 запрос 🔑</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">🔒 фильтр 1</span><div class=\"fp-box acc fp-pulse-a\">аутентификация</div><div class=\"fp-box good\">✓ это ты</div></div></div>"
   },
   {
    "cap": "Фильтр 2: личность кладётся в контекст — система знает, кто пришёл.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token good fp-float\">👤 личность</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">🗂 фильтр 2</span><div class=\"fp-box good fp-pulse-g\">контекст</div><div class=\"fp-tag\">кто=Иван</div></div></div>"
   },
   {
    "cap": "Фильтр 3: авторизация — а можно ли тебе сюда? Проверяем права.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">👤 Иван · роль USER</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">🛡 фильтр 3</span><div class=\"fp-box acc fp-pulse-a\">авторизация</div><div class=\"fp-box good\">✓ доступ есть</div></div></div>"
   },
   {
    "cap": "Прошёл все три — запрос доходит до контроллера.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">🔒✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🗂✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🛡✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good fp-pulse-g\">контроллер 🎯</div></div>"
   },
   {
    "cap": "Не прошёл проверку — стоп, до контроллера не дойдёт.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token fp-travel\" style=\"border-color:var(--bad)\">📨 чужой</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big bad fp-pulse-r\">🛡 ✗ стоп</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">→</div><div class=\"fp-box mut fp-blink\">контроллер 🚫</div></div>"
   }
  ]
 },
 {
  "id": "jwt-validate",
  "t": "Spring",
  "g": "Security",
  "title": "Валидация JWT",
  "frames": [
   {
    "cap": "Keycloak подписывает токен своим приватным ключом — ставит печать.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node acc fp-pulse-a\">Keycloak</div><div class=\"fp-arrow\">↓</div><div class=\"fp-token fp-float\">🔑 JWT · 🔒 подпись</div></div>"
   },
   {
    "cap": "Сервис один раз качает публичный ключ из JWKS и кладёт в кэш.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node mut\">JWKS</div><div class=\"fp-conn\"></div><div class=\"fp-token fp-travel\">🔑 public key</div><div class=\"fp-conn\"></div><div class=\"fp-box acc fp-pulse-g\">кэш ключа</div></div>"
   },
   {
    "cap": "Клиент шлёт запрос с токеном — сервис проверяет всё локально.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">запрос</span><div class=\"fp-token fp-travel\">🔑 JWT</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big acc\">🔎 сервис</div></div>"
   },
   {
    "cap": "Сверяем подпись ключом и поля exp/iss/aud — локально, без сети.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🔒 подпись ✓</div><div class=\"fp-box good\">exp ✓</div><div class=\"fp-box good\">iss ✓</div><div class=\"fp-box good\">aud ✓</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">Keycloak — не дёргаем</div></div>"
   },
   {
    "cap": "Просрочен или подделан — сразу 401, дальше не пускаем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-ver dead\">🔑 JWT · exp прошёл</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad fp-pulse-r\">✗ 401 отказ</div></div>"
   },
   {
    "cap": "Токен валиден — достаём роли из payload и пускаем дальше.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">✓ валиден</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><span class=\"fp-tag\">ROLE_USER</span><span class=\"fp-tag\">ADMIN</span><span class=\"fp-tag\">TRADER</span></div></div>"
   }
  ]
 },
 {
  "id": "btree-leftmost",
  "t": "DB",
  "g": "Индексы",
  "title": "Leftmost prefix",
  "frames": [
   {
    "cap": "Индекс по двум полям: сначала сортирует по client_id, потом по date.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">🔑 client_id</span><div class=\"fp-arrow\">→</div><span class=\"fp-tag\">date</span></div><div class=\"fp-lane\"><span class=\"name\">индекс</span><div class=\"fp-token\">1·03</div><div class=\"fp-token\">1·07</div><div class=\"fp-token\">2·02</div><div class=\"fp-token\">2·09</div><div class=\"fp-token\">3·05</div></div></div>"
   },
   {
    "cap": "Главный — client_id: одинаковые лежат рядом, плотными группами.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">1·03</div><div class=\"fp-box mut\">1·07</div><div class=\"fp-box acc\">2·02</div><div class=\"fp-box acc\">2·09</div><div class=\"fp-box mut\">3·05</div></div>"
   },
   {
    "cap": "WHERE client_id=2 → строки соседи, индекс прыгает прямо в группу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\" style=\"border-color:var(--good)\">🔎 client_id = 2</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell\"></div></div><span class=\"fp-tag\" style=\"color:var(--good)\">✓ быстро</span></div>"
   },
   {
    "cap": "А по date общего порядка нет — внутри индекса они идут вперемешку.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">1·<b style=\"color:var(--bad)\">03</b></div><div class=\"fp-box mut\">1·<b style=\"color:var(--bad)\">07</b></div><div class=\"fp-box mut\">2·02</div><div class=\"fp-box mut\">2·09</div><div class=\"fp-box mut\">3·<b style=\"color:var(--bad)\">05</b></div></div>"
   },
   {
    "cap": "WHERE date=07 → совпадение не на краю, индекс не наводится на него.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\" style=\"border-color:var(--bad)\">🔎 date = 07</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell bad fp-blink\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div><span class=\"fp-tag\" style=\"color:var(--bad)\">✗ сканируем всё</span></div>"
   },
   {
    "cap": "Правило: индекс читается слева — без первого поля он не работает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--good)\">client_id ✓</span><div class=\"fp-conn\"></div><span class=\"fp-tag\" style=\"color:var(--good)\">+ date ✓</span></div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--bad)\">🗑 только date</span><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">✗ индекс мимо</div></div></div>"
   }
  ]
 },
 {
  "id": "covering-index",
  "t": "DB",
  "g": "Индексы",
  "title": "Covering index",
  "frames": [
   {
    "cap": "Запрос просит только две колонки: name и city.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">SELECT name, city</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token\">🔑 name</div><div class=\"fp-token\">city</div></div></div>"
   },
   {
    "cap": "Обычный индекс хранит только ключ и адрес строки.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">INDEX</span><div class=\"fp-box good\">🔑 name</div><div class=\"fp-box mut\">→ ptr</div></div><div class=\"fp-lane\"><span class=\"name\">TABLE</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(3,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div></div>"
   },
   {
    "cap": "Ключ нашёлся, но city в индексе нет — прыжок в таблицу.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">🔑 name ✓</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box bad fp-pulse-r\">📄 строка<br>city здесь</div></div>"
   },
   {
    "cap": "Такой прыжок за каждой строкой — лишняя работа.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">🔑</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">📄</div></div><div class=\"fp-row\"><div class=\"fp-box good\">🔑</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">📄</div></div><div class=\"fp-bar\"><span style=\"width:90%;background:var(--bad)\"></span></div></div>"
   },
   {
    "cap": "Covering index кладёт city внутрь себя — всё рядом.",
    "html": "<div class=\"fp-lane\"><span class=\"name\">COVERING INDEX</span><div class=\"fp-box acc fp-pulse-g\">🔑 name + city</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">📄 таблица</div></div>"
   },
   {
    "cap": "Ответ берётся прямо из индекса — index-only scan, без таблицы.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-g\">🔑 name + city ✓</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">✗→</div><div class=\"fp-box mut\" style=\"opacity:.4\">📄 таблица</div></div>"
   }
  ]
 },
 {
  "id": "keyset-pagination",
  "t": "DB",
  "g": "Индексы",
  "title": "Keyset vs OFFSET",
  "frames": [
   {
    "cap": "Нужна страница: 20 строк, но глубоко — после 100000-й.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">🔎 нужны строки 100001..100020</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(12,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good fp-pulse-g\"></div></div></div>"
   },
   {
    "cap": "OFFSET 100000 читает все 100000 строк и ВЫБРАСЫВАЕТ их.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad\">OFFSET 100000 LIMIT 20</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid fp-pulse-r\" style=\"grid-template-columns:repeat(12,1fr)\"><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell good\"></div></div><div class=\"fp-token\">🗑 100000 прочитано впустую</div></div>"
   },
   {
    "cap": "Чем глубже листаешь — тем больше строк OFFSET читает зря.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">стр.10</span><div class=\"fp-bar\"><span style=\"width:10%;background:var(--bad)\"></span></div></div><div class=\"fp-row\"><span class=\"fp-tag\">стр.500</span><div class=\"fp-bar\"><span style=\"width:50%;background:var(--bad)\"></span></div></div><div class=\"fp-row\"><span class=\"fp-tag\">стр.5000</span><div class=\"fp-bar fp-pulse-r\"><span style=\"width:98%;background:var(--bad)\"></span></div></div><div class=\"fp-val\" style=\"color:var(--bad)\">⏳ растёт</div></div>"
   },
   {
    "cap": "Keyset помнит последний 🔑 id и прыгает по индексу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">WHERE id &gt; last_id LIMIT 20</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token\">🔑 last_id=100000</div><div class=\"fp-token fp-travel\" style=\"border-color:var(--good)\">→ прыжок</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(12,1fr)\"><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell mut\"></div><div class=\"fp-cell good fp-pulse-g\"></div></div></div>"
   },
   {
    "cap": "Индекс спускается к нужному id — хвост не читается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\" style=\"border-color:var(--good)\">🔎 ищем id &gt; 100000</div><div class=\"fp-stack\"><div class=\"fp-slot mut\">B-tree корень</div><div class=\"fp-slot mut\">ветка</div><div class=\"fp-slot good fp-pulse-g\">🔑 лист: id=100001</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good\">✓ сразу 20 строк</div></div>"
   },
   {
    "cap": "Keyset: цена та же на 1-й и на 5000-й странице.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box bad\">OFFSET</div><div class=\"fp-bar\"><span style=\"width:100%;background:var(--bad)\"></span></div><div class=\"fp-token\">🗑 глубже = дольше</div></div><div class=\"fp-col\"><div class=\"fp-box good\">KEYSET 🔑</div><div class=\"fp-bar fp-pulse-g\"><span style=\"width:12%;background:var(--good)\"></span></div><div class=\"fp-token\" style=\"border-color:var(--good)\">✓ всегда быстро</div></div></div>"
   }
  ]
 },
 {
  "id": "index-not-used",
  "t": "DB",
  "g": "Индексы",
  "title": "Почему индекс не используется",
  "frames": [
   {
    "cap": "Запрос вернёт почти всю таблицу — подходящих строк куча.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">WHERE active = true</div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div></div></div>"
   },
   {
    "cap": "Через индекс — это куча случайных прыжков к строкам на диске.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">🔑 индекс</div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">прыжок</div><div class=\"fp-arrow\">→</div><div class=\"fp-cell good\"></div></div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">прыжок</div><div class=\"fp-arrow\">→</div><div class=\"fp-cell good\"></div></div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">прыжок</div><div class=\"fp-arrow\">→</div><div class=\"fp-cell good\"></div></div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">прыжок</div><div class=\"fp-arrow\">→</div><div class=\"fp-cell good\"></div></div></div>"
   },
   {
    "cap": "Seq scan читает всё подряд одним ровным проходом — без прыжков.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">📖 seq scan</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">диск</span><div class=\"fp-token fp-travel\">→→→ читаем подряд →→→</div></div><div class=\"fp-bar\"><span style=\"width:100%;background:var(--good)\"></span></div></div>"
   },
   {
    "cap": "Планировщик считает стоимость по статистике: прыжки дороже прохода.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc\">🔑 индекс</div><div class=\"fp-val\" style=\"color:var(--bad)\">980</div><div class=\"fp-bar\"><span style=\"width:95%;background:var(--bad)\"></span></div></div><div class=\"fp-box big fp-pulse-a\">vs</div><div class=\"fp-col\"><div class=\"fp-box good\">📖 seq</div><div class=\"fp-val\" style=\"color:var(--good)\">220</div><div class=\"fp-bar\"><span style=\"width:30%;background:var(--good)\"></span></div></div></div>"
   },
   {
    "cap": "Дешевле — значит выбран: full scan тут не баг, а осознанный план.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">🔑 индекс ✗</div><div class=\"fp-box good fp-pulse-g\">📖 seq scan ✓</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big good fp-pulse-g\">Seq Scan выбран осознанно</div></div>"
   }
  ]
 },
 {
  "id": "isolation-levels",
  "t": "DB",
  "g": "Транзакции и блокировки",
  "title": "Уровни изоляции",
  "frames": [
   {
    "cap": "Один счёт читают два запроса транзакции T1 — между ними кто-то правит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token\">🔎 read 1</div><div class=\"fp-token\">🔎 read 2</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token fp-pulse-r\">✍️ UPDATE+COMMIT</div></div></div>"
   },
   {
    "cap": "READ COMMITTED: первый раз 100, после чужого коммита уже видишь 120.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">read 1</span><div class=\"fp-val\">100</div></div><div class=\"fp-arrow fp-pulse-r\">→</div><div class=\"fp-col\"><div class=\"fp-token fp-travel\" style=\"color:var(--bad)\">✍️ →120</div></div><div class=\"fp-arrow fp-pulse-r\">→</div><div class=\"fp-col\"><span class=\"fp-tag\">read 2</span><div class=\"fp-val\" style=\"color:var(--bad)\">120</div></div></div>"
   },
   {
    "cap": "REPEATABLE READ: T1 берёт снапшот старта — оба чтения дают 100.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">read 1</span><div class=\"fp-val good\" style=\"color:var(--good)\">100</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box mut\">📸 снапшот заморожен</div><div class=\"fp-token\" style=\"color:var(--mut)\">✍️ 120 рядом</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\">read 2</span><div class=\"fp-val good\" style=\"color:var(--good)\">100</div></div></div>"
   },
   {
    "cap": "Версии строки: снапшот T1 держит старую 100, новая 120 живёт отдельно.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag\">balance</span><div class=\"fp-row\"><div class=\"fp-ver fp-pulse-g\">v1 = 100</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver\">v2 = 120</div></div><div class=\"fp-token\">🔎 T1 видит только v1</div></div>"
   },
   {
    "cap": "SERIALIZABLE: итог как будто T1, потом T2 — иначе одну откатят.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">порядок</span><div class=\"fp-node good\">T1</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">потом T2</div></div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-box good fp-pulse-g\">✓ результат как у последовательного выполнения</div></div>"
   },
   {
    "cap": "Итог: выше уровень — меньше аномалий, но дороже параллелизм.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">RC 🔎 видит чужие коммиты</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box acc\">RR 📸 снапшот стабилен</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🔒 SER по очереди, 0 аномалий</div></div></div>"
   }
  ]
 },
 {
  "id": "write-skew",
  "t": "DB",
  "g": "Транзакции и блокировки",
  "title": "Write skew",
  "frames": [
   {
    "cap": "Инвариант: на смене всегда ≥ 1 врач. Сейчас двое — всё ок.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good big fp-pulse-g\">🧑‍⚕️ Алиса<br>на смене</div><div class=\"fp-box good big fp-pulse-g\">🧑‍⚕️ Боб<br>на смене</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc\">врачей ≥ 1 ✓</div></div>"
   },
   {
    "cap": "Обе хотят уйти. Каждая читает count = 2 и решает: можно.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">✍️ T1 Алиса</span><div class=\"fp-token\">🔎 count = 2</div><div class=\"fp-box good\">2 ≥ 1 ✓</div></div><div class=\"fp-lane\"><span class=\"name\">✍️ T2 Боб</span><div class=\"fp-token\">🔎 count = 2</div><div class=\"fp-box good\">2 ≥ 1 ✓</div></div></div>"
   },
   {
    "cap": "Каждая видит снимок ДО чужого UPDATE — поэтому соседа не учла.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">T1</div><div class=\"fp-conn\"></div><div class=\"fp-box mut big\">снимок: count = 2</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">T2</div></div><div class=\"fp-token fp-blink\">⏳ читают одно и то же, не видят чужой UPDATE</div></div>"
   },
   {
    "cap": "Каждая UPDATE снимает СВОЕГО врача — разные строки, конфликта нет.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">T1</span><div class=\"fp-token\">UPDATE Алиса → off</div><div class=\"fp-ver dead\">🧑‍⚕️ Алиса</div><div class=\"fp-box good\">COMMIT ✓</div></div><div class=\"fp-lane\"><span class=\"name\">T2</span><div class=\"fp-token\">UPDATE Боб → off</div><div class=\"fp-ver dead\">🧑‍⚕️ Боб</div><div class=\"fp-box good\">COMMIT ✓</div></div></div>"
   },
   {
    "cap": "Итог: 0 врачей. Инвариант сломан — это и есть write skew.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">🗑 Алиса off</div><div class=\"fp-box bad fp-pulse-r\">🗑 Боб off</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-val\" style=\"color:var(--bad)\">0</div><div class=\"fp-box bad fp-blink\">✗ правило «≥ 1» нарушено</div></div>"
   },
   {
    "cap": "Snapshot пропускает обе. Только Serializable откатит одну.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">Snapshot</span><div class=\"fp-box bad\">обе прошли → 0 ✗</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">Serializable</span><div class=\"fp-row\"><div class=\"fp-box good\">T1 ✓</div><div class=\"fp-box bad\">🔒 T2 abort</div></div><div class=\"fp-box good fp-pulse-g\">остался 1 ✓</div></div></div>"
   }
  ]
 },
 {
  "id": "lost-update",
  "t": "DB",
  "g": "Транзакции и блокировки",
  "title": "Lost update",
  "frames": [
   {
    "cap": "Два потока читают один и тот же баланс = 100.",
    "html": "<div class=\"fp-col\"><div class=\"fp-val\">100</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token fp-pulse-a\">🔎 read 100</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token fp-pulse-a\">🔎 read 100</div></div></div></div>"
   },
   {
    "cap": "Оба считают от одного и того же старого 100 — независимо.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-box good\">100 + 10</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good\">= 110</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-box bad\">100 − 5</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">= 95</div></div></div>"
   },
   {
    "cap": "T1 пишет 110, потом T2 пишет 95 — поверх.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-token good fp-travel\">✍️ 110</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token bad fp-travel\">✍️ 95</div></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-val fp-pulse-r\">95</div></div>"
   },
   {
    "cap": "+10 от T1 просто исчез — это и есть lost update.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver dead\">110 от T1 🗑</div><div class=\"fp-ver\" style=\"border-color:var(--bad)\">95 в базе</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad big fp-blink\">✗ потеряли +10</div></div>"
   },
   {
    "cap": "Лекарство: к строке цепляем version и читаем её тоже.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">balance 100</div><div class=\"fp-box mut\">🔑 version=7</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token\">T1 видит v=7</div><div class=\"fp-token\">T2 видит v=7</div></div></div>"
   },
   {
    "cap": "T1 пишет с v=7→8; у T2 version уже не 7 → откат и повтор.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🧵 T1</span><div class=\"fp-ver\" style=\"border-color:var(--good)\">110 ✓ v=8</div></div><div class=\"fp-lane\"><span class=\"name\">🧵 T2</span><div class=\"fp-token bad fp-pulse-r\">v≠7 ✗</div><div class=\"fp-arrow\">↓</div><div class=\"fp-token acc fp-spin\">⏳ retry</div></div></div></div>"
   }
  ]
 },
 {
  "id": "mvcc",
  "t": "DB",
  "g": "Транзакции и блокировки",
  "title": "MVCC",
  "frames": [
   {
    "cap": "Версия 1 строки: баланс=100. На неё смотрит читатель.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver fp-pulse-a\">🔑 id=7 · v1 · 100</div></div><div class=\"fp-arrow\">↑</div><div class=\"fp-token\">🔎 reader</div></div>"
   },
   {
    "cap": "Писатель делает UPDATE → 120, не трогая старую версию.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token fp-float\">✍️ writer</div><div class=\"fp-arrow\">↓</div><div class=\"fp-ver\">🔑 id=7 · v1 · 100</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-ver good fp-pulse-g\">🔑 id=7 · v2 · 120</div></div>"
   },
   {
    "cap": "Читатель держит снапшот v1=100, а рядом уже живёт новая v2=120.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver fp-pulse-a\">v1 · 100</div><div class=\"fp-ver good\">v2 · 120</div></div><div class=\"fp-row\"><span class=\"fp-tag\">snapshot</span><div class=\"fp-arrow\">↑</div><div class=\"fp-token\">🔎 reader</div></div></div>"
   },
   {
    "cap": "Читатель видит свой снапшот v1=100, писатель уже на v2=120.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">🔎 reader</div><div class=\"fp-arrow\">↓</div><div class=\"fp-ver fp-pulse-a\">v1 · 100</div></div><div class=\"fp-box mut\">⏸ не мешают</div><div class=\"fp-col\"><div class=\"fp-token\">✍️ writer</div><div class=\"fp-arrow\">↓</div><div class=\"fp-ver good fp-pulse-g\">v2 · 120</div></div></div>"
   },
   {
    "cap": "Никто не блокирует никого: чтение и запись идут параллельно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🔎 reader</span><div class=\"fp-token good\">✓ читает v1</div></div><div class=\"fp-lane\"><span class=\"name\">✍️ writer</span><div class=\"fp-token good\">✓ пишет v2</div></div><div class=\"fp-box good fp-pulse-g\">🔓 0 locks</div></div>"
   },
   {
    "cap": "Цена MVCC: старые версии копятся как мёртвые — их чистит VACUUM.",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div></div><div class=\"fp-row\"><div class=\"fp-ver dead fp-blink\">🗑 v1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">VACUUM</div></div></div>"
   }
  ]
 },
 {
  "id": "optimistic-pessimistic",
  "t": "DB",
  "g": "Транзакции и блокировки",
  "title": "Оптимистичная vs пессимистичная",
  "frames": [
   {
    "cap": "Две транзакции метят в одну строку — кто-то должен уступить.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">T1 🔎</div><div class=\"fp-box acc fp-pulse-a\">T2 🔎</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-ver\">🔑 row id=7 · qty=10</div></div>"
   },
   {
    "cap": "Оптимистично: никто не блокирует, у строки есть version.",
    "html": "<div class=\"fp-col\"><div class=\"fp-ver\">🔑 id=7 · qty=10 · <span class=\"fp-tag\">v1</span></div><div class=\"fp-row\"><div class=\"fp-box good\">T1 🔎 видит v1</div><div class=\"fp-box good\">T2 🔎 видит v1</div></div></div>"
   },
   {
    "cap": "При коммите БД сверяет version: у T1 совпало — пишет v2.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">T1 ✓ v1==v1</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-ver\">🔑 id=7 · qty=9 · <span class=\"fp-tag\">v2</span></div></div>"
   },
   {
    "cap": "T2 коммитит с v1, а там уже v2 — конфликт, повтор с новой версией.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">T2 ✗ v1 ≠ v2</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">🔁 retry</div><div class=\"fp-box mut\">читает v2 заново</div></div></div>"
   },
   {
    "cap": "Пессимистично: SELECT FOR UPDATE сразу вешает 🔒, остальные ждут.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">T1 🔒 FOR UPDATE</div><div class=\"fp-arrow\">↓</div><div class=\"fp-ver\">🔑 id=7 · qty=10 🔒</div><div class=\"fp-row\"><div class=\"fp-box mut\">T2 ⏳ ждёт</div><div class=\"fp-box mut\">T3 ⏳ ждёт</div></div></div>"
   },
   {
    "cap": "Мало конфликтов — оптимистичная; дерутся часто — пессимистичная.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good\">оптимистичная ✓<div class=\"fp-bar\"><span style=\"width:15%\"></span></div>мало конфликтов</div><div class=\"fp-box bad\">пессимистичная 🔒<div class=\"fp-bar\"><span style=\"width:85%\"></span></div>много конфликтов</div></div>"
   }
  ]
 },
 {
  "id": "vacuum-bloat",
  "t": "DB",
  "g": "PostgreSQL и типы",
  "title": "VACUUM и bloat",
  "frames": [
   {
    "cap": "MVCC: UPDATE создаёт новую версию строки, старая остаётся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">id=7</span><div class=\"fp-ver\">v1: balance=100</div></div><div class=\"fp-arrow\">↓ UPDATE</div><div class=\"fp-row\"><div class=\"fp-ver dead\">v1: balance=100</div><div class=\"fp-ver fp-pulse-g\">v2: balance=200</div></div></div>"
   },
   {
    "cap": "DELETE не стирает строку — лишь метит версию мёртвой.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver\">id=7</div><div class=\"fp-ver\">id=8</div><div class=\"fp-ver\">id=9</div></div><div class=\"fp-arrow\">↓ DELETE id=8</div><div class=\"fp-row\"><div class=\"fp-ver\">id=7</div><div class=\"fp-ver dead fp-blink\">🗑 id=8</div><div class=\"fp-ver\">id=9</div></div></div>"
   },
   {
    "cap": "Мёртвые версии копятся в страницах — таблица не ужимается сама.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"name\">heap</span></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div></div></div>"
   },
   {
    "cap": "Bloat: живых строк мало, а файл на диске пухнет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">живых</span><div class=\"fp-val good\">8</div><span class=\"fp-tag\">файл</span><div class=\"fp-val bad fp-pulse-r\">120GB</div></div><div class=\"fp-bar fp-pulse-r\"><span style=\"width:92%\"></span></div></div>"
   },
   {
    "cap": "VACUUM проходит и метит мёртвые слоты как свободные внутри таблицы.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-travel\">🧹 VACUUM</div><div class=\"fp-arrow\">→</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell good fp-pulse-g\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div></div></div>"
   },
   {
    "cap": "Файл тот же размер, но слоты переиспользуются под новые строки.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">файл</span><div class=\"fp-val mut\">120GB</div><span class=\"fp-tag\">свободно внутри</span><div class=\"fp-val good fp-pulse-g\">✓</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on fp-pulse-g\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on fp-pulse-g\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell good\"></div></div></div>"
   }
  ]
 },
 {
  "id": "numeric-money",
  "t": "DB",
  "g": "PostgreSQL и типы",
  "title": "Деньги: NUMERIC не FLOAT",
  "frames": [
   {
    "cap": "0.1 в десятичке простая, а в двоичке — бесконечная дробь.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good big\">0.1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad big fp-pulse-r\">0.000110011001…</div></div><div class=\"fp-row\"><span class=\"fp-tag\">десятичка</span><span class=\"fp-tag\" style=\"color:var(--bad)\">двоичка ∞</span></div></div>"
   },
   {
    "cap": "Float хранит лишь обрезок дроби — точное 0.1 не помещается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell bad fp-blink\"></div><div class=\"fp-cell bad fp-blink\"></div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">0.1 ≈ 0.1000000000000000055</div></div>"
   },
   {
    "cap": "0.1 + 0.2 даёт не 0.3 — крошка ошибки уже видна.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">0.1</div><div class=\"fp-box\">+</div><div class=\"fp-box mut\">0.2</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad big fp-pulse-r\">0.30000000000000004 ✗</div></div>"
   },
   {
    "cap": "Тысяча сложений в double копит хвост — ровно 100.00 не выходит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">+0.1</div><div class=\"fp-token\">+0.1</div><div class=\"fp-token\">+0.1</div><div class=\"fp-token\">…×1000</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-bar\"><span style=\"width:88%\"></span></div><div class=\"fp-row\"><div class=\"fp-box bad big fp-blink\">99.9999999999986 ✗</div></div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--bad)\">≠ 100.00</span></div></div>"
   },
   {
    "cap": "NUMERIC и BigDecimal считают по десятичке — копейка точная.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"name\">double</span><div class=\"fp-box bad fp-pulse-r\">double 🗑</div><div class=\"fp-ver dead\">99.99…04 ✗</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"name\">money</span><div class=\"fp-box good fp-pulse-g\">NUMERIC</div><div class=\"fp-box good\">BigDecimal</div><div class=\"fp-box good big\">100.00 ✓</div></div></div>"
   },
   {
    "cap": "Правило: деньги — только NUMERIC в БД и BigDecimal в Java.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">FLOAT 🗑</div><div class=\"fp-box bad\">double 🗑</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-node good fp-pulse-g\">NUMERIC</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">BigDecimal</div></div><div class=\"fp-box good big\">🔑 деньги = точность</div></div>"
   }
  ]
 },
 {
  "id": "select-star",
  "t": "DB",
  "g": "PostgreSQL и типы",
  "title": "Вред SELECT *",
  "frames": [
   {
    "cap": "Нужно 2 поля, а SELECT * тянет ВСЕ — лишний груз.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-pulse-r\">SELECT *</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">id</div><div class=\"fp-box good\">name</div><div class=\"fp-box bad fp-blink\">bio</div><div class=\"fp-box bad fp-blink\">avatar</div><div class=\"fp-box bad fp-blink\">log</div></div></div>"
   },
   {
    "cap": "Лишние колонки забивают сеть и память сервера.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">нужно</span><div class=\"fp-bar\"><span style=\"width:20%\"></span></div><div class=\"fp-val\" style=\"color:var(--good)\">2 КБ</div></div><div class=\"fp-arrow\">vs</div><div class=\"fp-col\"><span class=\"fp-tag\">SELECT *</span><div class=\"fp-bar\"><span style=\"width:95%;background:var(--bad)\"></span></div><div class=\"fp-val\" style=\"color:var(--bad)\">90 КБ</div></div></div>"
   },
   {
    "cap": "Запрос двух полей читается прямо из индекса — таблицу не трогаем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token good\">SELECT id, name</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-g\">🔎 covering-index (id,name)</div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--good)\">✓ ответ готов</span></div></div>"
   },
   {
    "cap": "SELECT * требует bio — индекса мало, лезем в таблицу: лишний поход.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token bad\">SELECT *</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc\">🔎 index (id,name)</div><div class=\"fp-arrow fp-pulse-r\">↓ нет bio</div><div class=\"fp-box bad fp-pulse-r\">🗑 heap: иди в таблицу</div></div>"
   },
   {
    "cap": "SELECT * молча тянет новый столбец — маппинг по номеру колонки ломается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-ver\">было: id · name · age</div><div class=\"fp-row\"><span class=\"fp-tag\">код берёт</span><span class=\"fp-tag\" style=\"color:var(--good)\">🔑 поле №3 = age</span></div><div class=\"fp-arrow fp-pulse-r\">↓ ADD COLUMN status</div><div class=\"fp-ver\">стало: id · name · age · status</div><div class=\"fp-box bad fp-blink\">✗ * вернул лишний столбец → маппинг по № врёт</div></div>"
   },
   {
    "cap": "Перечисляй нужные колонки — быстро, стабильно, индекс работает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token good fp-pulse-g\">SELECT id, name</div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--good)\">✓ меньше трафик</span><span class=\"fp-tag\" style=\"color:var(--good)\">✓ covering-index</span></div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--good)\">✓ не боится схемы</span></div></div>"
   }
  ]
 },
 {
  "id": "eav",
  "t": "DB",
  "g": "PostgreSQL и типы",
  "title": "EAV-антипаттерн",
  "frames": [
   {
    "cap": "Нормально: атрибуты — это колонки со своими типами.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">id 🔑</div><div class=\"fp-box good\">name TEXT</div><div class=\"fp-box good\">price INT</div><div class=\"fp-box good\">active BOOL</div></div><div class=\"fp-token\">row 1 · «Книга» · 500 · ✓</div></div>"
   },
   {
    "cap": "EAV: всё ломаем в одну таблицу ключ-значение строками.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">entity</div><div class=\"fp-box mut\">attribute</div><div class=\"fp-box mut\">value (TEXT)</div></div><div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-box\">name</div><div class=\"fp-box bad\">«Книга»</div></div><div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-box\">price</div><div class=\"fp-box bad fp-pulse-r\">«500»</div></div><div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-box\">active</div><div class=\"fp-box bad\">«true»</div></div></div>"
   },
   {
    "cap": "Всё стало строкой: типы, NOT NULL и проверки потеряны.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag\">price INT</div><div class=\"fp-arrow\">→</div><div class=\"fp-tag\" style=\"color:var(--bad)\">TEXT</div></div><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">«пятьсот» ✗</div><div class=\"fp-box bad\">«-5» ✗</div><div class=\"fp-box bad\">NULL ✗</div></div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--bad)\">нет типа</span><span class=\"fp-tag\" style=\"color:var(--bad)\">нет CHECK</span><span class=\"fp-tag\" style=\"color:var(--bad)\">нет FK</span></div></div>"
   },
   {
    "cap": "Один товар — это уже не строка, а куча джойнов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">собрать товар #1</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-node bad\">JOIN name</div><div class=\"fp-conn\"></div><div class=\"fp-node bad\">JOIN price</div><div class=\"fp-conn\"></div><div class=\"fp-node bad\">JOIN active</div></div><div class=\"fp-bar\"><span style=\"width:90%\"></span></div><span class=\"fp-tag\" style=\"color:var(--bad)\">⏳ N атрибутов = N джойнов</span></div>"
   },
   {
    "cap": "JSONB: гибкость без потери одной строки и индексов.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\" style=\"color:var(--bad)\">EAV</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(3,1fr)\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div></div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\" style=\"color:var(--good)\">JSONB</span><div class=\"fp-box good fp-pulse-g\">{name,price,active}</div><span class=\"fp-tag\" style=\"color:var(--good)\">✓ 1 строка · GIN-индекс</span></div></div>"
   }
  ]
 },
 {
  "id": "kpart",
  "t": "Distributed",
  "g": "Kafka",
  "title": "Партиции и ключ",
  "frames": [
   {
    "cap": "Топик — это не одна труба, а несколько партиций рядом.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">📨 Топик: orders</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">P0</span></div><div class=\"fp-lane\"><span class=\"name\">P1</span></div><div class=\"fp-lane\"><span class=\"name\">P2</span></div></div></div>"
   },
   {
    "cap": "Есть ключ → его хешируют, число делят, выпадает одна партиция.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">🔑 key=client-7</div><div class=\"fp-arrow\">↓</div><div class=\"fp-val fp-pulse-a\">hash % 3 = 1</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box mut\">P0</div><div class=\"fp-box acc fp-pulse-a\">P1</div><div class=\"fp-box mut\">P2</div></div></div>"
   },
   {
    "cap": "Один ключ всегда летит в ту же партицию — все его сообщения вместе.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">🔑c7 #1</div><div class=\"fp-token\">🔑c7 #2</div><div class=\"fp-token\">🔑c7 #3</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">P1</span><span class=\"fp-token good\">#1</span><span class=\"fp-token good\">#2</span><span class=\"fp-token good\">#3</span></div></div>"
   },
   {
    "cap": "Внутри партиции порядок строгий — читаем 1,2,3 как записали.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">P1 ✍️</span><span class=\"fp-token good\">1</span><span class=\"fp-token good\">2</span><span class=\"fp-token good\">3</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">🔎 1</div><div class=\"fp-box good\">2</div><div class=\"fp-box good\">3</div><div class=\"fp-box good fp-pulse-g\">✓ порядок</div></div></div>"
   },
   {
    "cap": "Без ключа сообщения расходятся по партициям — общего порядка нет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">📨 key=null</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">P0</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">P1</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">P2</div></div><div class=\"fp-ver dead\">общий порядок между P0/P1/P2</div></div>"
   },
   {
    "cap": "Итог: порядок гарантирован только внутри партиции, не во всём топике.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good big fp-pulse-g\">🔑 ключ → 1 партиция → ✓ порядок</div><div class=\"fp-box bad big\">🌐 весь топик → ✗ порядка нет</div></div>"
   }
  ]
 },
 {
  "id": "acks",
  "t": "Distributed",
  "g": "Kafka",
  "title": "acks=all",
  "frames": [
   {
    "cap": "Продюсер шлёт сообщение лидеру партиции.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">✍️ 📨 order-7</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node acc fp-pulse-a\">Лидер</div></div>"
   },
   {
    "cap": "У партиции есть лидер и две in-sync реплики-копии.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node acc\">Лидер</div><div class=\"fp-conn\"></div><div class=\"fp-row\"><div class=\"fp-node good\">ISR-реплика 1</div><div class=\"fp-node good\">ISR-реплика 2</div></div></div>"
   },
   {
    "cap": "acks=all: лидер копирует запись во все in-sync реплики.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node acc\">Лидер 📨</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-node good fp-pulse-g\">📨 ✓</div><div class=\"fp-node good fp-pulse-g\">📨 ✓</div></div></div>"
   },
   {
    "cap": "Все ISR подтвердили — только тогда лидер шлёт ack.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node good\">✓</div><div class=\"fp-node good\">✓</div></div><div class=\"fp-arrow\">↑</div><div class=\"fp-node acc\">Лидер</div><div class=\"fp-arrow\">↑</div><div class=\"fp-token fp-pulse-g\" style=\"color:var(--good)\">✓ ack</div></div>"
   },
   {
    "cap": "Лидер упал — реплика с данными становится новым лидером.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node bad fp-blink\">🗑 Лидер ✗</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">📨 новый Лидер</div><div class=\"fp-node good\">📨 ✓</div></div></div>"
   },
   {
    "cap": "acks=1 быстрее, но лидер умрёт до копии — потеря.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-tag\">acks=all</div><div class=\"fp-box good\">надёжно</div><span class=\"name\">скорость</span><div class=\"fp-bar\"><span style=\"width:55%\"></span></div></div><div class=\"fp-col\"><div class=\"fp-tag\">acks=1</div><div class=\"fp-box bad\">риск 🗑</div><span class=\"name\">скорость</span><div class=\"fp-bar\"><span style=\"width:95%\"></span></div></div></div>"
   }
  ]
 },
 {
  "id": "rebalance",
  "t": "Distributed",
  "g": "Kafka",
  "title": "Rebalance группы",
  "frames": [
   {
    "cap": "Топик разбит на партиции — это полоски с сообщениями.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">P0</span><span class=\"fp-token\">📨</span><span class=\"fp-token\">📨</span><span class=\"fp-token\">📨</span></div><div class=\"fp-lane\"><span class=\"name\">P1</span><span class=\"fp-token\">📨</span><span class=\"fp-token\">📨</span></div><div class=\"fp-lane\"><span class=\"name\">P2</span><span class=\"fp-token\">📨</span><span class=\"fp-token\">📨</span><span class=\"fp-token\">📨</span></div></div>"
   },
   {
    "cap": "Группа делит партиции: внутри группы 1 партиция → 1 консьюмер.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">P0</span><span class=\"fp-token\">📨</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-node good\">C1</div></div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">P1</span><span class=\"fp-token\">📨</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-node good\">C2</div></div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">P2</span><span class=\"fp-token\">📨</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-node good\">C3</div></div></div>"
   },
   {
    "cap": "Добавили C4 или один консьюмер упал — состав группы изменился.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node good\">C1</div><div class=\"fp-node good\">C2</div><div class=\"fp-node bad fp-blink\">C3 ✗</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-token fp-pulse-r\">🔔 состав группы поменялся</div></div>"
   },
   {
    "cap": "Идёт rebalance: на это время обработка в группе замирает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad fp-pulse-r\">⏸ REBALANCE</div><div class=\"fp-row\"><div class=\"fp-node mut\">C1 ⏸</div><div class=\"fp-node mut\">C2 ⏸</div><div class=\"fp-node mut\">C4 ⏸</div></div><div class=\"fp-bar\"><span style=\"width:50%\"></span></div></div>"
   },
   {
    "cap": "Партиции переназначаются на новый состав, обработка идёт дальше.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">P0</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-node good fp-pulse-g\">C1</div></div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">P1</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-node good fp-pulse-g\">C2</div></div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">P2</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-node good fp-pulse-g\">C4</div></div></div>"
   },
   {
    "cap": "Частые ребалансы = частые паузы, лаг растёт — это боль.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">⏸</div><div class=\"fp-box good\">✓</div><div class=\"fp-box bad fp-blink\">⏸</div><div class=\"fp-box good\">✓</div><div class=\"fp-box bad fp-blink\">⏸</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"color:var(--bad)\">⏳ лаг</span><div class=\"fp-val\" style=\"color:var(--bad)\">120</div></div></div>"
   }
  ]
 },
 {
  "id": "consumer-offset",
  "t": "Distributed",
  "g": "Kafka",
  "title": "Offset и коммит",
  "frames": [
   {
    "cap": "Партиция — лента записей, у каждой свой offset; читаю с committed=2.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">P1</span><div class=\"fp-token mut\">0</div><div class=\"fp-token mut\">1</div><div class=\"fp-token acc fp-pulse-a\">2</div><div class=\"fp-token\">3</div><div class=\"fp-token\">4</div></div><div class=\"fp-arrow\">↑</div><div class=\"fp-box acc fp-pulse-a\">🔎 читаю с offset=2</div></div>"
   },
   {
    "cap": "Беру запись на текущем offset и обрабатываю её.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">P1</span><div class=\"fp-token mut\">0</div><div class=\"fp-token mut\">1</div><div class=\"fp-token acc fp-pulse-a\">2</div><div class=\"fp-token\">3</div><div class=\"fp-token\">4</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc\">🔎 обрабатываю запись 2 ⏳</div></div>"
   },
   {
    "cap": "Обработал — и ТОЛЬКО потом коммичу: committed уходит на 3.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">✓ запись 2 обработана</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">✍️ commit offset=3</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><span class=\"fp-tag\">committed</span><div class=\"fp-val\" style=\"color:var(--good)\">3</div></div></div>"
   },
   {
    "cap": "Упал ДО коммита — committed так и остался 2.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">🔎 обработал 2… ✗ упал</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">↓</div><div class=\"fp-ver dead\">✍️ commit offset=3</div><div class=\"fp-row\"><span class=\"fp-tag\">committed</span><div class=\"fp-val\" style=\"color:var(--bad)\">2</div></div></div>"
   },
   {
    "cap": "После рестарта читаю с committed=2 — запись 2 обработается дважды.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">🔎 рестарт, читаю с 2</div><div class=\"fp-arrow\">↑</div><div class=\"fp-lane\"><span class=\"name\">P1</span><div class=\"fp-token mut\">0</div><div class=\"fp-token mut\">1</div><div class=\"fp-token bad fp-blink\">2 🔁</div><div class=\"fp-token\">3</div><div class=\"fp-token\">4</div></div><div class=\"fp-box bad\">⚠️ дубль записи 2</div></div>"
   },
   {
    "cap": "Правило: коммить ПОСЛЕ обработки — дубль лучше, чем потеря.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token bad\">✍️</div><div class=\"fp-arrow\">→</div><div class=\"fp-token bad\">🔎</div></div><div class=\"fp-box bad fp-pulse-r\">упал → 🗑 потеря</div></div><div class=\"fp-arrow\">vs</div><div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token good\">🔎</div><div class=\"fp-arrow\">→</div><div class=\"fp-token good\">✍️</div></div><div class=\"fp-box good fp-pulse-g\">упал → 🔁 дубль ✓</div></div></div>"
   }
  ]
 },
 {
  "id": "log-compaction",
  "t": "Distributed",
  "g": "Kafka",
  "title": "Log compaction",
  "frames": [
   {
    "cap": "Обычный топик — лента: все версии ключа лежат подряд.",
    "html": "<div class=\"fp-lane\"><span class=\"name\">лог</span><div class=\"fp-row\"><div class=\"fp-ver\">🔑A=1</div><div class=\"fp-ver\">🔑B=7</div><div class=\"fp-ver\">🔑A=2</div><div class=\"fp-ver\">🔑A=3</div><div class=\"fp-ver\">🔑B=9</div></div></div>"
   },
   {
    "cap": "Один ключ перезаписывается снова и снова — старьё копится.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">📨 🔑A=3</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-ver\">🔑A=1</div><div class=\"fp-ver\">🔑A=2</div><div class=\"fp-ver fp-pulse-a\">🔑A=3</div></div></div>"
   },
   {
    "cap": "Уборщик идёт по логу и помечает устаревшие версии ключа.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-spin\">🗑</div><div class=\"fp-arrow\">→</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "Старые версии каждого ключа выкидываются — остаётся последняя.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver dead\">🔑A=1</div><div class=\"fp-ver dead\">🔑A=2</div><div class=\"fp-ver dead\">🔑B=7</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-ver fp-pulse-g\" style=\"border-color:var(--good)\">🔑A=3</div><div class=\"fp-ver fp-pulse-g\" style=\"border-color:var(--good)\">🔑B=9</div></div></div>"
   },
   {
    "cap": "Итог: топик хранит последнее значение на ключ — снапшот key→value.",
    "html": "<div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">compacted</span><div class=\"fp-row\"><div class=\"fp-token good\">🔑A → 3</div><div class=\"fp-token good\">🔑B → 9</div></div></div>"
   },
   {
    "cap": "Не лента событий, а живая таблица состояния «сейчас».",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut big\">лента<br>событий</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">🔎 таблица<br>key→value</div></div>"
   }
  ]
 },
 {
  "id": "outbox",
  "t": "Distributed",
  "g": "Паттерны",
  "title": "Transactional outbox",
  "frames": [
   {
    "cap": "БД и Kafka — две разные системы; одной транзакцией их не охватить.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc big fp-pulse-a\">🗄 БД</div><div class=\"fp-box mut\">✍️ writer</div><div class=\"fp-box acc big fp-pulse-a\">📨 Kafka</div></div>"
   },
   {
    "cap": "БД записалась, а отправка в Kafka упала — событие потеряно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">🗄 БД ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">📨 Kafka ✗</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-token bad\" style=\"color:var(--bad)\">🗑 событие потеряно</div></div>"
   },
   {
    "cap": "Пишем данные И событие в outbox в ОДНОЙ транзакции БД.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-g\" style=\"border-color:var(--good)\">🔒 одна транзакция</div><div class=\"fp-row\"><div class=\"fp-box good\">🗄 orders</div><div class=\"fp-box good\">📥 outbox</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good big\">✓ commit вместе</div></div>"
   },
   {
    "cap": "Релэй читает неотправленные строки outbox и шлёт их в Kafka.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">outbox</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell\"></div></div></div><div class=\"fp-row\"><div class=\"fp-box mut\">🔎 релэй</div><div class=\"fp-token fp-travel\">📨</div><div class=\"fp-node acc fp-pulse-a\">Kafka</div></div></div>"
   },
   {
    "cap": "Отправил — помечает строку done; при сбое повтор, доставка at-least-once.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">📨 evt-1 ✓</div><div class=\"fp-box good\">📨 evt-2 ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\" style=\"border-color:var(--good)\">✓ done</div></div>"
   },
   {
    "cap": "Итог: БД и Kafka согласованы без распределённой транзакции.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node good\">🗄 БД</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">📥 outbox</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">📨 Kafka</div></div>"
   }
  ]
 },
 {
  "id": "idempotent-receiver",
  "t": "Distributed",
  "g": "Паттерны",
  "title": "Идемпотентный получатель",
  "frames": [
   {
    "cap": "Брокер шлёт «спиши 120₸» — режим at-least-once: гарантия «хотя бы раз».",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">📨 broker</div><div class=\"fp-conn\"></div><div class=\"fp-token fp-travel\">пиши -120₸</div><div class=\"fp-conn\"></div><div class=\"fp-node\">🧵 consumer</div></div>"
   },
   {
    "cap": "Ack потерялся — брокер не уверен и шлёт то же сообщение второй раз.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">📨 broker</div><div class=\"fp-token fp-travel\">-120₸ #1</div><div class=\"fp-node\">🧵</div></div><div class=\"fp-row\"><span class=\"fp-tag\">ack ✗</span><div class=\"fp-box bad fp-blink\">потерян</div></div><div class=\"fp-row\"><div class=\"fp-node acc\">📨 broker</div><div class=\"fp-token fp-travel fp-pulse-r\">-120₸ #1</div><div class=\"fp-node\">🧵</div></div></div>"
   },
   {
    "cap": "Наивный консьюмер спишет дважды — со счёта улетает 240₸. Беда.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">-120</div><div class=\"fp-token\">-120</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-val\" style=\"color:var(--bad)\">-240</div><div class=\"fp-box bad fp-pulse-r\">двойное списание ✗</div></div>"
   },
   {
    "cap": "Решение: у каждой операции свой ключ идемпотентности — уникальный 🔑.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-float\">🔑 op-77</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">сумма -120₸</div></div><div class=\"fp-row\"><div class=\"fp-token fp-float\">🔑 op-78</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">сумма -50₸</div></div></div>"
   },
   {
    "cap": "Консьюмер хранит обработанные ключи — пришёл новый, проверяет «уже было?».",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">🔑 op-77</div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">🔎 store обработанных</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell good\">75</div><div class=\"fp-cell good\">76</div><div class=\"fp-cell good fp-pulse-g\">77</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div></div>"
   },
   {
    "cap": "Ключа нет → списать 120₸. Ключ есть → молча игнор, баланс цел.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\" style=\"border-color:var(--good)\">🔑 new</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good fp-pulse-g\">✓ списал -120</div></div><div class=\"fp-box mut\">vs</div><div class=\"fp-col\"><div class=\"fp-token\" style=\"border-color:var(--bad)\">🔑 op-77 дубль</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut fp-blink\">⏸ игнор, ✓ уже было</div></div></div>"
   }
  ]
 },
 {
  "id": "exactly-once",
  "t": "Distributed",
  "g": "Паттерны",
  "title": "Exactly-once = идемпотентность",
  "frames": [
   {
    "cap": "Сеть капризна — продюсер шлёт сообщение и ждёт ack, который может потеряться.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">✍️ P</div><div class=\"fp-conn\"></div><div class=\"fp-token fp-travel\">📨 msg</div><div class=\"fp-conn\"></div><div class=\"fp-node\">📥 broker</div></div>"
   },
   {
    "cap": "Ack потерялся — продюсер не уверен и шлёт повтор, в логе два дубля.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">✍️ P</div><div class=\"fp-arrow\">→</div><div class=\"fp-token fp-blink\" style=\"color:var(--bad)\">✗ ack?</div></div><div class=\"fp-lane\"><span class=\"name\">log</span><div class=\"fp-token\">📨 msg</div><div class=\"fp-token\" style=\"border-color:var(--bad)\">📨 msg dup</div></div></div>"
   },
   {
    "cap": "Идемпотентный продюсер даёт seq — брокер режет дубль по номеру.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">🔑 seq=5</div><div class=\"fp-arrow\">→</div><div class=\"fp-token fp-travel\" style=\"border-color:var(--bad)\">🔑 seq=5 dup</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-lane\"><span class=\"name\">broker</span><div class=\"fp-token good\">✓ seq=5</div><div class=\"fp-token\" style=\"color:var(--mut)\">🗑 dup</div></div></div>"
   },
   {
    "cap": "Транзакция: запись в лог и сдвиг offset коммитятся вместе или никак.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">🔒 begin tx</div><div class=\"fp-row\"><div class=\"fp-box good\">✓ write msg</div><div class=\"fp-box good\">✓ commit offset</div></div><div class=\"fp-box good\">✓ commit tx</div></div>"
   },
   {
    "cap": "Идемпотентный консьюмер помнит обработанные id — повтор пропускает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">📨 id=42</div><div class=\"fp-arrow\">→</div><div class=\"fp-node good\">🔎 C</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-grid fp-pulse-g\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell on\">42</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div><div class=\"fp-token fp-blink\" style=\"color:var(--mut)\">🗑 повтор id=42 → skip</div></div>"
   },
   {
    "cap": "Повтор не меняет результат — это и есть «ровно один раз».",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">✍️ idemp producer</div><div class=\"fp-box acc\">🔒 transactions</div><div class=\"fp-box acc\">🔎 idemp consumer</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-val fp-pulse-g\">1</div><div class=\"fp-box good big\">✓ exactly-once = идемпотентность</div></div>"
   }
  ]
 },
 {
  "id": "dead-letter",
  "t": "Distributed",
  "g": "Паттерны",
  "title": "Dead Letter Queue",
  "frames": [
   {
    "cap": "Сообщение прилетает консьюмеру на обработку.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">📨 order-42</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node acc fp-pulse-a\">🧵 consumer</div></div>"
   },
   {
    "cap": "Обработка падает — пробуем снова, ретрай за ретраем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node bad fp-pulse-r\">🧵 consumer ✗</div><div class=\"fp-row\"><span class=\"fp-tag\">try 1</span><span class=\"fp-tag\">try 2</span><span class=\"fp-tag\">try 3</span></div><div class=\"fp-row\"><div class=\"fp-box bad\">✗</div><div class=\"fp-box bad\">✗</div><div class=\"fp-box bad\">✗</div></div></div>"
   },
   {
    "cap": "Без выхода один битый месседж стопорит партицию.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">P0</span><div class=\"fp-token bad fp-blink\">📨 order-42 🔁</div><div class=\"fp-token mut\">📨 43 ⏳</div><div class=\"fp-token mut\">📨 44 ⏳</div></div><div class=\"fp-box bad fp-pulse-r\">⏸ поток застрял</div></div>"
   },
   {
    "cap": "После N ретраев не зацикливаемся — уводим месседж в DLQ.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-val\">3</div><div class=\"fp-box mut\">ретраи израсходованы</div></div><div class=\"fp-row\"><div class=\"fp-node bad\">🧵 consumer</div><div class=\"fp-arrow\">→</div><div class=\"fp-node\" style=\"border-color:var(--bad)\">🗑 DLQ</div></div><div class=\"fp-token bad fp-travel\">📨 order-42 →</div></div>"
   },
   {
    "cap": "Партиция освобождена и едет дальше без затыков.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">P0</span><div class=\"fp-token good fp-pulse-g\">📨 43 ✓</div><div class=\"fp-token good\">📨 44 ✓</div><div class=\"fp-token good\">📨 45 ✓</div></div><div class=\"fp-box good fp-pulse-g\">🧵 поток летит ✓</div></div>"
   },
   {
    "cap": "Битые лежат в DLQ — разберём их потом отдельно и вручную.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node\" style=\"border-color:var(--bad)\">🗑 DLQ-топик</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div><div class=\"fp-row\"><div class=\"fp-token\">🔎 reader</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">разбор позже</div></div></div>"
   }
  ]
 },
 {
  "id": "cap",
  "t": "Distributed",
  "g": "Теория",
  "title": "CAP при разрыве сети",
  "frames": [
   {
    "cap": "Два узла держат одно значение, связь жива — оба согласны.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node good\">N1<div class=\"fp-token good\">x=5</div></div><div class=\"fp-conn fp-pulse-g\" style=\"border-color:var(--good)\"></div><div class=\"fp-node good\">N2<div class=\"fp-token good\">x=5</div></div></div>"
   },
   {
    "cap": "Связь рвётся: partition случится — это неизбежно, не выбор.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">N1<div class=\"fp-token\">x=5</div></div><div class=\"fp-box big bad fp-blink\" style=\"border-color:var(--bad)\">✂ разрыв</div><div class=\"fp-node acc\">N2<div class=\"fp-token\">x=5</div></div></div>"
   },
   {
    "cap": "Писатель меняет N1 на 9 — но N2 за стеной не узнал.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">✍️ x=9</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node acc\">N1<div class=\"fp-token good\">x=9</div></div></div><div class=\"fp-box big bad fp-blink\" style=\"border-color:var(--bad)\">✗</div><div class=\"fp-node mut\">N2<div class=\"fp-token bad\">x=5</div></div></div></div>"
   },
   {
    "cap": "AP: N2 отвечает быстро, но устаревшим значением.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">🔎 read x?</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node good fp-pulse-g\">N2<div class=\"fp-token bad\">x=5 ⏳старое</div></div><div class=\"fp-box mut\">доступно ✓, согласовано ✗</div></div>"
   },
   {
    "cap": "CP: N2 отказывает в ответе, чтобы не врать значением.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-travel\">🔎 read x?</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node bad fp-pulse-r\">N2<div class=\"fp-token\">🔒 ✗ error</div></div><div class=\"fp-box mut\">согласовано ✓, доступно ✗</div></div>"
   },
   {
    "cap": "При разрыве выбор только AP или CP — CA в распределёнке невозможен.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big good\" style=\"border-color:var(--good)\">AP<div class=\"fp-token\">старое, но ответ</div></div><div class=\"fp-box big acc\" style=\"border-color:var(--acc)\">CP<div class=\"fp-token\">отказ, но правда</div></div><div class=\"fp-box big bad fp-blink\" style=\"border-color:var(--bad)\">CA 🗑<div class=\"fp-token\">невозможно</div></div></div>"
   }
  ]
 },
 {
  "id": "eventual-consistency",
  "t": "Distributed",
  "g": "Теория",
  "title": "Eventual consistency",
  "frames": [
   {
    "cap": "Запись пришла в один узел: тут уже 120, у соседей ещё старое 100.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">✍️ set X=120</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-node good fp-pulse-g\">120</div><div class=\"fp-node mut\">100</div><div class=\"fp-node mut\">100</div></div></div>"
   },
   {
    "cap": "Реплики разошлись: один ушёл вперёд, копии ещё в пути.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node good fp-pulse-g\">120</div><div class=\"fp-node mut\">100</div><div class=\"fp-node mut\">100</div></div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">📨 X=120</div><div class=\"fp-token fp-travel\">📨 X=120</div></div></div>"
   },
   {
    "cap": "Читатель попал на отстающий узел — увидел старое 100.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node good\">120</div><div class=\"fp-node bad fp-pulse-r\">100</div><div class=\"fp-node mut\">100</div></div><div class=\"fp-arrow\">↑</div><div class=\"fp-token\">🔎 reader → 100 ✗</div></div>"
   },
   {
    "cap": "Новых записей нет — узлы догоняют, бар сходимости растёт.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node good\">120</div><div class=\"fp-node acc fp-pulse-a\">120</div><div class=\"fp-node mut\">100</div></div><div class=\"fp-bar\"><span style=\"width:66%\"></span></div></div>"
   },
   {
    "cap": "Прошло время — все узлы сошлись к одному значению 120 ✓.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node good fp-pulse-g\">120</div><div class=\"fp-node good fp-pulse-g\">120</div><div class=\"fp-node good fp-pulse-g\">120</div></div><div class=\"fp-token\">🔎 reader → 120 ✓</div></div>"
   },
   {
    "cap": "Цена сходимости — доступность: отвечаем всегда, иногда устаревшим.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box good big\">✓ всегда отвечаем</div><div class=\"fp-tag\">availability</div></div><div class=\"fp-arrow\">⇄</div><div class=\"fp-col\"><div class=\"fp-box bad\">✗ иногда старое</div><div class=\"fp-tag\">stale read</div></div></div>"
   }
  ]
 },
 {
  "id": "idempotency-key",
  "t": "Distributed",
  "g": "Теория",
  "title": "Idempotency key",
  "frames": [
   {
    "cap": "Клиент шлёт операцию и вешает на неё уникальный ключ.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">👤 клиент</div><div class=\"fp-arrow\">↓</div><div class=\"fp-token fp-travel\">📨 оплата 100₸ 🔑 key=ab12</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box\">🖥 сервер</div></div>"
   },
   {
    "cap": "Сервер выполняет и сохраняет ключ вместе с результатом.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token\">🔑 key=ab12</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc fp-pulse-a\">🖥 выполняю...</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><span class=\"fp-tag\">ab12</span><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓ результат: оплачено</div></div></div>"
   },
   {
    "cap": "Запоминаем: ключ ab12 уже обработан, лежит в журнале.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">🗒 журнал ключей</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell on good\">ab12</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div>"
   },
   {
    "cap": "Ответ потерялся — клиент шлёт тот же ключ снова.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">👤 клиент</div><div class=\"fp-box bad fp-blink\">⏳ ответ потерян ✗</div><div class=\"fp-arrow\">↓</div><div class=\"fp-token fp-travel\">📨 повтор 🔑 key=ab12</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box\">🖥 сервер</div></div>"
   },
   {
    "cap": "Сервер видит ab12 в журнале — не платит второй раз.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token\">🔑 key=ab12</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">✗ не выполняю</div><span class=\"fp-tag\" style=\"border-color:var(--good)\">ab12 уже есть</span></div></div>"
   },
   {
    "cap": "Возвращаем прошлый результат — деньги списаны ровно один раз.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box\">🖥 сервер</div><div class=\"fp-arrow\">↓</div><div class=\"fp-token fp-travel\" style=\"border-color:var(--good)\">✓ оплачено (старый ответ)</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-val\" style=\"color:var(--good)\">1</div><div class=\"fp-box good\">списание ровно раз</div></div></div>"
   }
  ]
 },
 {
  "id": "hashmap-internals",
  "t": "Java",
  "g": "Коллекции",
  "title": "HashMap под капотом",
  "frames": [
   {
    "cap": "Ключ: hashCode() даёт хеш, его перемешивают и берут младшие биты → номер бакета.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">🔑 \"cat\"</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">hashCode()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut fp-pulse-a\">h^(h&gt;&gt;&gt;16)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">&amp;(n-1)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good\">бакет №3</div></div>"
   },
   {
    "cap": "Таблица — ряд бакетов. Ключ лёг в ячейку по вычисленному номеру.",
    "html": "<div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell on fp-pulse-g\">🔑</div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div>"
   },
   {
    "cap": "Два ключа в один бакет → цепочка. Нужный находим сверкой equals.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">бакет №3</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">🔑cat</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-g\">🔑dog</div><div class=\"fp-token good\">🔎 equals ✓</div></div>"
   },
   {
    "cap": "size превысил порог 0.75×ёмкости → resize: бакетов вдвое, всё перехешим.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-bar\"><span style=\"width:80%\"></span></div><span class=\"fp-tag\">0.75</span></div><div class=\"fp-row\"><div class=\"fp-box bad\">8 бакетов</div><div class=\"fp-arrow fp-pulse-a\">→</div><div class=\"fp-box good big\">16 бакетов</div><div class=\"fp-token mut\">🔁 перехеш</div></div></div>"
   },
   {
    "cap": "Цепочка достигла 8 при таблице ≥64 → treeify в дерево, поиск O(log n).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">таблица ≥64</span><span class=\"fp-tag\">длина 8</span></div><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">цепочка</span><div class=\"fp-node mut\">●</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">●</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">●</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">●</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">●</div></div><div class=\"fp-arrow fp-pulse-g\">→</div><div class=\"fp-box good big fp-pulse-g\">🌳 дерево O(log n)</div></div></div>"
   }
  ]
 },
 {
  "id": "arraylist-linkedlist",
  "t": "Java",
  "g": "Коллекции",
  "title": "ArrayList vs LinkedList",
  "frames": [
   {
    "cap": "Две коллекции хранят одно и то же по-разному.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">ArrayList</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(5,1fr)\"><div class=\"fp-cell on\">A</div><div class=\"fp-cell on\">B</div><div class=\"fp-cell on\">C</div><div class=\"fp-cell on\">D</div><div class=\"fp-cell on\">E</div></div></div><div class=\"fp-col\"><span class=\"fp-tag\">LinkedList</span><div class=\"fp-row\"><div class=\"fp-node acc\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">B</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">C</div></div></div></div>"
   },
   {
    "cap": "Доступ по индексу: массив прыгает сразу, узлы идут пешком.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">ArrayList</span><div class=\"fp-token\">🔍 [3]</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">прыг! O(1)</div></div><div class=\"fp-row\"><span class=\"fp-tag\">LinkedList</span><div class=\"fp-node mut\">0</div><div class=\"fp-arrow\">→</div><div class=\"fp-node mut\">1</div><div class=\"fp-arrow\">→</div><div class=\"fp-node mut\">2</div><div class=\"fp-arrow\">→</div><div class=\"fp-node bad fp-pulse-r\">3 O(n)</div></div></div>"
   },
   {
    "cap": "Вставка в середину массива двигает весь хвост вправо.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag\">ArrayList</span><div class=\"fp-row\"><div class=\"fp-cell on\">A</div><div class=\"fp-cell acc fp-pulse-a\">★</div><div class=\"fp-cell on fp-travel\">B</div><div class=\"fp-cell on fp-travel\">C</div><div class=\"fp-cell on fp-travel\">D</div><div class=\"fp-cell\"></div></div><div class=\"fp-box bad\">сдвиг хвоста O(n)</div></div>"
   },
   {
    "cap": "LinkedList: итератор уже на месте — перецепить ссылки.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag\">LinkedList</span><div class=\"fp-row\"><div class=\"fp-node acc\">A</div><div class=\"fp-conn\" style=\"border-color:var(--good)\"></div><div class=\"fp-node good fp-pulse-g\">★ нов</div><div class=\"fp-conn\" style=\"border-color:var(--good)\"></div><div class=\"fp-node acc\">B</div></div><div class=\"fp-box good\">перецепить ссылки O(1)</div></div>"
   },
   {
    "cap": "Массив лежит подряд в кэше — узлы разбросаны по памяти.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">массив</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div></div><div class=\"fp-token\">📦 кэш-локально</div></div><div class=\"fp-row\"><span class=\"fp-tag\">узлы</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell acc\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell acc\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell acc\"></div></div><div class=\"fp-token\">🔍 промахи</div></div></div>"
   },
   {
    "cap": "Итог: бери ArrayList, он почти всегда быстрее.",
    "html": "<div class=\"fp-row\"><div class=\"fp-ver\"><span class=\"name\">ArrayList</span><div class=\"fp-bar\"><span style=\"width:92%\"></span></div><div class=\"fp-box good\">✓ по умолчанию</div></div><div class=\"fp-ver dead\"><span class=\"name\">LinkedList</span><div class=\"fp-bar\"><span style=\"width:30%\"></span></div><div class=\"fp-box mut\">редкий случай</div></div></div>"
   }
  ]
 },
 {
  "id": "failfast-iter",
  "t": "Java",
  "g": "Коллекции",
  "title": "Fail-fast итератор",
  "frames": [
   {
    "cap": "list.modCount = 3. Итератор сохраняет снимок expectedModCount = 3.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">📦 list</span><div class=\"fp-token\">A</div><div class=\"fp-token\">B</div><div class=\"fp-token\">C</div></div><div class=\"fp-row\"><div class=\"fp-box\">modCount <span class=\"fp-tag\">3</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">🔎 expectedModCount <span class=\"fp-tag\">3</span></div></div></div>"
   },
   {
    "cap": "Идём через итератор: курсор на A, снимок expected = 3.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🔎 обход</span><div class=\"fp-token acc fp-pulse-a\">A</div><div class=\"fp-token\">B</div><div class=\"fp-token\">C</div></div><div class=\"fp-box acc\">expectedModCount <span class=\"fp-tag\">3</span></div></div>"
   },
   {
    "cap": "list.remove(B) мимо итератора: modCount стал 4, снимок остался 3.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">📦 list</span><div class=\"fp-token\">A</div><div class=\"fp-token bad fp-blink\">🗑 B</div><div class=\"fp-token\">C</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">modCount <span class=\"fp-tag\">4</span></div><div class=\"fp-arrow\">↔</div><div class=\"fp-box mut\">🔎 expected <span class=\"fp-tag\">3</span></div></div></div>"
   },
   {
    "cap": "next() сверяет снимок: expected 3 ≠ modCount 4 → разошлись.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut big\">expected = 3</div><div class=\"fp-box bad\">✗</div><div class=\"fp-box bad big\">modCount = 4</div></div>"
   },
   {
    "cap": "Расхождение → next() бросает ConcurrentModificationException.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">next()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad big fp-pulse-r\">💥 CME</div></div>"
   },
   {
    "cap": "Правильно: удалять через it.remove() или removeIf() — снимок обновляется.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">🗑 list.remove ✗</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">✓ it.remove() / removeIf</div></div>"
   }
  ]
 },
 {
  "id": "srp-godclass",
  "t": "Design",
  "g": "SOLID",
  "title": "SRP и God Class",
  "frames": [
   {
    "cap": "Один класс делает ВСЁ: заказ, комиссия, письма, БД.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big bad fp-pulse-r\">OrderService</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-token\">📦 заказ</div><div class=\"fp-token\">🔑 комиссия</div><div class=\"fp-token\">📨 письма</div><div class=\"fp-token\">✍️ запись в БД</div></div></div>"
   },
   {
    "cap": "4 дела = 4 причины менять один класс.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">логика заказа</span><div class=\"fp-node bad\">OrderService</div></div><div class=\"fp-lane\"><span class=\"name\">меняем тариф</span><div class=\"fp-node bad\">OrderService</div></div><div class=\"fp-lane\"><span class=\"name\">меняем шаблон письма</span><div class=\"fp-node bad\">OrderService</div></div><div class=\"fp-lane\"><span class=\"name\">меняем схему БД</span><div class=\"fp-node bad\">OrderService</div></div></div>"
   },
   {
    "cap": "Правишь письма — а ломается расчёт заказа.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">✍️ правка писем</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big bad fp-blink\">God Class</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">✗ сломался заказ</div></div>"
   },
   {
    "cap": "SRP: режем на use-case — у каждого одна ответственность.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big bad\">God Class</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box good\">CreateOrder</div><div class=\"fp-box good\">CalcFee</div><div class=\"fp-box good\">Notify</div><div class=\"fp-box good\">SaveOrder</div></div></div>"
   },
   {
    "cap": "У каждого класса — ровно одна причина для изменения.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">тариф</span><div class=\"fp-node good\">CalcFee</div></div><div class=\"fp-lane\"><span class=\"name\">шаблон письма</span><div class=\"fp-node good\">Notify</div></div><div class=\"fp-lane\"><span class=\"name\">схема БД</span><div class=\"fp-node good\">SaveOrder</div></div></div>"
   },
   {
    "cap": "Меняешь письма — остальное цело. Каждый за своё.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">✍️ правка писем</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">Notify ✓</div><div class=\"fp-box mut\">CalcFee ✓</div><div class=\"fp-box mut\">CreateOrder ✓</div><div class=\"fp-box mut\">SaveOrder ✓</div></div></div>"
   }
  ]
 },
 {
  "id": "ocp-switch",
  "t": "Design",
  "g": "SOLID",
  "title": "OCP без растущего switch",
  "frames": [
   {
    "cap": "Один switch по типу — пока 2 типа, всё мирно.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">📦 тип</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">switch(type)<div class=\"fp-row\"><span class=\"fp-token\">PDF ✓</span><span class=\"fp-token\">XLS ✓</span></div></div></div>"
   },
   {
    "cap": "Новый тип → лезем в тот же switch, правим рабочий код.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">switch(type)<div class=\"fp-row\"><span class=\"fp-token\">PDF</span><span class=\"fp-token\">XLS</span><span class=\"fp-token acc fp-blink\">+CSV</span></div></div><span class=\"fp-tag\" style=\"border-color:var(--bad)\">✍️ трогаем старое</span></div>"
   },
   {
    "cap": "Каждый новый тип раздувает switch — растёт и риск.",
    "html": "<div class=\"fp-row\"><div class=\"fp-ver\">2 типа</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver\">4</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver\" style=\"border-color:var(--bad)\">8 ✗</div><div class=\"fp-bar\"><span style=\"width:90%;background:var(--bad)\"></span></div></div>"
   },
   {
    "cap": "OCP: один интерфейс, каждый тип — свой класс.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">interface Exporter</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box good\">PDF</div><div class=\"fp-box good\">XLS</div><div class=\"fp-box good\">CSV</div></div></div>"
   },
   {
    "cap": "Новый формат = новый класс. Старое не трогаем 🔒.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">PDF 🔒</div><div class=\"fp-box mut\">XLS 🔒</div><div class=\"fp-box mut\">CSV 🔒</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">JSON ✓ новый</div></div>"
   },
   {
    "cap": "Открыт для расширения, закрыт для правок — это OCP.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">расширяем</span><div class=\"fp-box good fp-float\">+класс</div></div><div class=\"fp-row\"><span class=\"fp-tag\">не правим</span><div class=\"fp-box mut\">ядро 🔒</div></div></div>"
   }
  ]
 },
 {
  "id": "lsp-rect",
  "t": "Design",
  "g": "SOLID",
  "title": "LSP: Square vs Rectangle",
  "frames": [
   {
    "cap": "Контракт прямоугольника: ширину и высоту меняем НЕЗАВИСИМО.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc big\">Rectangle</div><div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">setWidth</span><div class=\"fp-token\">5</div></div><div class=\"fp-lane\"><span class=\"name\">setHeight</span><div class=\"fp-token\">4</div></div></div></div>"
   },
   {
    "cap": "Ждём площадь: 5 × 4 = 20. Так обещано в контракте.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">w=5</div><div class=\"fp-token\">h=4</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">5 × 4</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">✓ 20</div></div>"
   },
   {
    "cap": "Square наследует Rectangle, но сторона у него ОДНА на двоих.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Rectangle</div><div class=\"fp-arrow\">↑</div><div class=\"fp-box mut\">Square</div><div class=\"fp-token\">🔒 w = h</div></div>"
   },
   {
    "cap": "setHeight(4) тянет за собой width → 4. Стороны связаны!",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">setWidth 5</span><div class=\"fp-token\">w=5</div><div class=\"fp-arrow\">→</div><div class=\"fp-token bad\">h=5</div></div><div class=\"fp-lane\"><span class=\"name\">setHeight 4</span><div class=\"fp-token\">h=4</div><div class=\"fp-arrow\">→</div><div class=\"fp-token bad fp-pulse-r\">w=4</div></div></div>"
   },
   {
    "cap": "Тот же код ждёт 20 — а Square считает 4 × 4 = 16.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">ждём</span><div class=\"fp-token\">5 × 4</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓ 20</div></div><div class=\"fp-row\"><span class=\"fp-tag\">Square</span><div class=\"fp-token\">4 × 4</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad big fp-pulse-r\">✗ 16</div></div></div>"
   },
   {
    "cap": "LSP: наследник должен заменять родителя. Square — не может.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Rectangle</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓ 20</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">Square вместо неё</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">✗ 16</div></div></div>"
   }
  ]
 },
 {
  "id": "dip-hexagon",
  "t": "Design",
  "g": "SOLID",
  "title": "DIP и гексагон",
  "frames": [
   {
    "cap": "Плохо: домен сам лезет в JDBC. Меняешь деталь — ломаешь домен.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big bad\">Домен</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">JDBC деталь 🔒</div></div>"
   },
   {
    "cap": "DIP: ставим между ними ПОРТ — интерфейс-абстракцию.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big good\">Домен</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">Порт (интерфейс)</div></div>"
   },
   {
    "cap": "Обе стороны зависят от порта: оба указывают НА абстракцию.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big good\">Домен</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big acc fp-pulse-a\">Порт</div><div class=\"fp-arrow\">←</div><div class=\"fp-box mut\">JDBC адаптер</div></div>"
   },
   {
    "cap": "Адаптер реализует порт (стрелка вверх к абстракции).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big good\">Домен</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">Порт</div></div><div class=\"fp-arrow\">↑</div><div class=\"fp-box mut\">Адаптер JDBC ✍️</div></div>"
   },
   {
    "cap": "Меняем JDBC на REST: домен и порт не трогаем, только адаптер.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">Домен</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">Порт</div></div><div class=\"fp-arrow\">↑</div><div class=\"fp-row\"><div class=\"fp-ver dead\">JDBC ✗</div><div class=\"fp-token\">→</div><div class=\"fp-ver fp-pulse-g\">REST ✓</div></div></div>"
   },
   {
    "cap": "Гексагон: ядро в центре, адаптеры по краям зависят от портов.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">REST</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">Порт</div><div class=\"fp-arrow\">←</div><div class=\"fp-box big good fp-float\">⬡ Ядро</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">Порт</div><div class=\"fp-arrow\">←</div><div class=\"fp-box mut\">MinIO</div></div>"
   }
  ]
 },
 {
  "id": "strategy",
  "t": "Design",
  "g": "Паттерны",
  "title": "Strategy",
  "frames": [
   {
    "cap": "Беда: switch по типу тарифа — каждый новый тариф лезет внутрь.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad big\">switch(тариф)</div><div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-lane\"><span class=\"name\">case A</span> считаю так</div><div class=\"fp-lane\"><span class=\"name\">case B</span> считаю эдак</div><div class=\"fp-lane bad fp-blink\"><span class=\"name\">case C?</span> снова лезем внутрь ✗</div></div></div>"
   },
   {
    "cap": "Идея: один интерфейс «посчитай цену» — общий разъём для всех.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc big fp-pulse-a\">🔌 Strategy<br>calc(x)</div><div class=\"fp-arrow\">←</div><div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-box good\">тариф A</div><div class=\"fp-box good\">тариф B</div></div></div>"
   },
   {
    "cap": "Контекст не знает деталей — держит ссылку на стратегию.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">Контекст</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">📦 strategy</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">🔌 calc(x)</div></div>"
   },
   {
    "cap": "Подставили тариф A — контекст зовёт его, не зная какой это.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">Контекст</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">тариф A</div></div><div class=\"fp-row\"><div class=\"fp-token mut\">тариф B</div><span class=\"fp-tag\">не вызван</span></div></div>"
   },
   {
    "cap": "Меняем поведение в рантайме — просто кладём другую стратегию.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">Контекст</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-ver dead\">тариф A</div><div class=\"fp-ver fp-pulse-g\">тариф B ✓</div></div></div>"
   },
   {
    "cap": "Новый тариф C — добавили класс рядом, старый код не трогаем.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-node acc\">Контекст</div><div class=\"fp-box mut\">🔌 calc(x)</div><span class=\"fp-tag\">без правок</span></div><div class=\"fp-arrow\">←</div><div class=\"fp-col\" style=\"gap:4px\"><div class=\"fp-box mut\">A</div><div class=\"fp-box mut\">B</div><div class=\"fp-box good big fp-pulse-g\">C 🆕</div></div></div>"
   }
  ]
 },
 {
  "id": "factory",
  "t": "Design",
  "g": "Паттерны",
  "title": "Factory",
  "frames": [
   {
    "cap": "Без фабрики: клиент сам делает new под каждый тип — связан со всей конкретикой.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box bad\">клиент</div><div class=\"fp-token\">🔒 знает всё</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box bad\">new PdfDoc()</div><div class=\"fp-box bad\">new WordDoc()</div><div class=\"fp-box bad\">new XlsDoc()</div></div></div>"
   },
   {
    "cap": "Ставим фабрику посередине: клиент зовёт create(type) вместо new.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">клиент</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver dead\">new PdfDoc()</div></div><div class=\"fp-row\"><div class=\"fp-box\">клиент</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc big fp-pulse-a\">📦 factory.create(type)</div></div></div>"
   },
   {
    "cap": "Внутри фабрики — выбор класса по типу. Это её работа, не клиента.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token\">type = \"pdf\"</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box acc\">factory</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box mut\">Word</div><div class=\"fp-box good fp-pulse-g\">✓ Pdf</div><div class=\"fp-box mut\">Xls</div></div></div>"
   },
   {
    "cap": "Клиент получает готовый объект и не знает, какой это класс.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">factory</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-float\">Document ? какой класс</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">клиент: .save()</div></div>"
   },
   {
    "cap": "Меняем реализацию внутри фабрики — клиент не трогаем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-ver dead\">Pdf v1</div><div class=\"fp-arrow\">↓</div><div class=\"fp-ver good fp-pulse-g\">PdfFast v2</div><div class=\"fp-lane\"><span class=\"name\">клиент</span><div class=\"fp-token\">код не изменился ✓</div></div></div>"
   },
   {
    "cap": "В тесте фабрика отдаёт заглушку — легко проверять клиента.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box\">тест</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">factory</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">🔍 FakeDoc</div></div>"
   }
  ]
 },
 {
  "id": "builder",
  "t": "Design",
  "g": "Паттерны",
  "title": "Builder",
  "frames": [
   {
    "cap": "Объект с кучей полей: имя, возраст, город, телефон, email.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">📦 User</div><div class=\"fp-row\"><div class=\"fp-token\">name</div><div class=\"fp-token\">age</div><div class=\"fp-token\">city</div><div class=\"fp-token\">phone</div><div class=\"fp-token\">email</div></div></div>"
   },
   {
    "cap": "Телескоп: куча конструкторов под разные наборы полей.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad\">User(name)</div><div class=\"fp-box bad\">User(name, age)</div><div class=\"fp-box bad\">User(name, age, city)</div><div class=\"fp-box bad fp-pulse-r\">User(name, age, city, phone, email)</div></div>"
   },
   {
    "cap": "Какой вызвать и что куда — не разберёшь.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">new User(\"Аят\", 30, \"\", null, \"a@b\")</div><div class=\"fp-row\"><span class=\"fp-tag\">?</span><span class=\"fp-tag\">?</span><span class=\"fp-tag\">?</span></div></div>"
   },
   {
    "cap": "Builder: собираем по шагам, каждое поле подписано.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">.name(\"Аят\")</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">.age(30)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">.email(\"a@b\")</div></div>"
   },
   {
    "cap": "Нужные поля задал, остальные — по умолчанию.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">сборка</span><div class=\"fp-bar\"><span style=\"width:60%\"></span></div></div><div class=\"fp-row\"><div class=\"fp-token good\">✓ name</div><div class=\"fp-token good\">✓ age</div><div class=\"fp-token mut\">city: default</div></div></div>"
   },
   {
    "cap": ".build() → готовый неизменяемый объект, менять нельзя.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">.build()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good fp-pulse-g\">🔒 User ✓</div></div>"
   }
  ]
 },
 {
  "id": "singleton-enum",
  "t": "Design",
  "g": "Паттерны",
  "title": "Singleton: enum vs DCL",
  "frames": [
   {
    "cap": "Синглтон — один объект на всех. Главная боль: создать его безопасно.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">🧵 поток</div><div class=\"fp-token\">🧵 поток</div><div class=\"fp-token\">🧵 поток</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big acc fp-pulse-a\">📦 INSTANCE</div></div>"
   },
   {
    "cap": "DCL без volatile: поток 2 видит ссылку, но поля внутри ещё пустые.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">🧵 поток 1</span><div class=\"fp-box acc\">new ...</div><div class=\"fp-token\">✍️ строит поля</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\">🧵 поток 2</span><div class=\"fp-box bad fp-blink\">📦 ссылка есть</div><div class=\"fp-box bad\">⚠ поля пусты</div></div></div>"
   },
   {
    "cap": "Причина: JVM/CPU переставляют шаги — ссылка раньше, чем готов объект.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">шаги</span><div class=\"fp-box mut\">1 выдать память</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">3 присвоить ссылку</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">2 заполнить поля</div></div><div class=\"fp-box bad\">✗ порядок 1-3-2: ссылка на недостроенный объект</div></div>"
   },
   {
    "cap": "Лечим: поле volatile. Снаружи виден только полностью готовый объект.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">🔒 volatile INSTANCE</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">1 память</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">2 поля</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">3 ссылка ✓</div></div>"
   },
   {
    "cap": "enum-синглтон: один INSTANCE, потокобезопасен из коробки, без volatile.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">enum { INSTANCE }</div><div class=\"fp-row\"><div class=\"fp-box good\">✓ 1 экземпляр</div><div class=\"fp-box good\">✓ thread-safe</div><div class=\"fp-box good\">✓ против 🔍 рефлексии</div><div class=\"fp-box good\">✓ против 📦 сериализации</div></div></div>"
   },
   {
    "cap": "Итог: DCL рабочий, но хрупкий. enum — самый надёжный путь.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">DCL</span><div class=\"fp-ver\">+volatile, +lock, легко забыть</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\">enum</span><div class=\"fp-ver fp-pulse-g\" style=\"border-color:var(--good)\">🔑 проще и надёжнее</div></div></div>"
   }
  ]
 },
 {
  "id": "cacheaside",
  "t": "Infra",
  "g": "Кэш",
  "title": "Cache-aside",
  "frames": [
   {
    "cap": "Кэш стоит СБОКУ: запрос идёт к БД, кэш — ответвление.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">🔎 запрос</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">app</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big\">🗄 БД</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">&nbsp;</div><div class=\"fp-box mut\">↕</div><div class=\"fp-box good\">📦 кэш</div></div></div>"
   },
   {
    "cap": "Сначала смотрим в кэш. Есть ключ?",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">app</div><div class=\"fp-token\">🔑 ключ</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">🔍 кэш?</div></div>"
   },
   {
    "cap": "Hit: ключ в кэше → отдаём сразу, БД не трогаем.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">✓ кэш</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">app</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">⚡ ответ</div><div class=\"fp-box mut\">🗄 БД ⏸</div></div>"
   },
   {
    "cap": "Miss: пусто → читаем БД, кладём в кэш с TTL, отдаём.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">✗ кэш</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">app</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big acc fp-pulse-a\">🗄 БД</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-box good\">📦 кэш <span class=\"fp-tag\">TTL ⏳</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">⚡ ответ</div></div></div>"
   },
   {
    "cap": "TTL истёк → запись «протухает» сама.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">📦 ключ <span class=\"fp-tag\">TTL</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">⏳ ...</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">🗑 пусто</div></div>"
   },
   {
    "cap": "Запись в БД → старый ключ инвалидируем (удаляем).",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">✍️ write</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">app</div><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-arrow\">→</div></div></div><div class=\"fp-col\"><div class=\"fp-box big acc\">🗄 БД</div><div class=\"fp-box bad fp-pulse-r\">🗑 ключ</div></div></div>"
   }
  ]
 },
 {
  "id": "cache-eviction",
  "t": "Infra",
  "g": "Кэш",
  "title": "Eviction: TTL и LRU",
  "frames": [
   {
    "cap": "Кэш — полка с ячейками. Память заполнилась под завязку.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">КЭШ</span><div class=\"fp-bar\"><span style=\"width:100%\"></span></div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "Пришёл новый ключ, а места нет. Надо кого-то выкинуть (eviction).",
    "html": "<div class=\"fp-row\"><div class=\"fp-token fp-float\">🔑 новый</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">кэш полный 📦</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">🗑 надо выгнать</div></div>"
   },
   {
    "cap": "TTL: у ключа таймер. Время вышло ⏳ → ключ протух, выкидываем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">TTL</span><div class=\"fp-box good\">🔑 A ⏳60s</div><div class=\"fp-box good\">🔑 B ⏳30s</div><div class=\"fp-box bad fp-blink\">🔑 C ⏳0s</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div></div><div class=\"fp-box bad\">🗑 C протух — удалён</div></div>"
   },
   {
    "cap": "LRU: гонит того, кого дольше всех не трогали (Least Recently Used).",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag\">LRU · давность доступа</span><div class=\"fp-lane\"><span class=\"name\">часто 🔥</span><div class=\"fp-box good\">D сейчас</div><div class=\"fp-box mut\">E минуту назад</div><div class=\"fp-box bad fp-pulse-r\">F час назад 🗑</div></div></div>"
   },
   {
    "cap": "Выгнали лишнее → освободили ячейки → новый ключ влез.",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(6,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell dead\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div><div class=\"fp-row\"><div class=\"fp-token fp-pulse-g\">🔑 новый ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">влез в свободную</div></div></div>"
   },
   {
    "cap": "Главный датчик — hit rate. Высокий = кэш помогает, не выгоняем нужное.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">HIT RATE</span><div class=\"fp-val\">92%</div><div class=\"fp-box good fp-pulse-g\">✓ кэш работает</div></div><div class=\"fp-bar\"><span style=\"width:92%\"></span></div><div class=\"fp-row\"><span class=\"fp-tag\">мало?</span><div class=\"fp-box bad\">✗ часто промах — лезем в БД 🔎</div></div></div>"
   }
  ]
 },
 {
  "id": "cache-stampede",
  "t": "Infra",
  "g": "Кэш",
  "title": "Cache stampede",
  "frames": [
   {
    "cap": "Горячий ключ в кэше: все читают его, БД отдыхает.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">🔎</div><div class=\"fp-token\">🔎</div><div class=\"fp-token\">🔎</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">🔑 кэш<br>HOT</div><div class=\"fp-arrow\" style=\"opacity:.25\">→</div><div class=\"fp-box mut\">😴 БД</div></div>"
   },
   {
    "cap": "TTL вышел → ключ протух, в кэше пусто.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">⏳ TTL</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad big fp-blink\">🗑 ключ<br>протух</div></div>"
   },
   {
    "cap": "Давка: пачка разом промахивается и одновременно бьёт в БД → пик.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-pulse-r\">🔎</div><div class=\"fp-token fp-pulse-r\">🔎</div><div class=\"fp-token fp-pulse-r\">🔎</div><div class=\"fp-token fp-pulse-r\">🔎</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad\">✗ кэш пусто</div><div class=\"fp-arrow\">↓</div><div class=\"fp-box bad big fp-pulse-r\">📦 БД<br>пересчёт ×4</div><div class=\"fp-bar\"><span style=\"width:96%;background:var(--bad)\"></span></div></div>"
   },
   {
    "cap": "Лечение 1: single-flight лок — один считает, остальные ждут.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc\">🔎🔒 держит</div><div class=\"fp-box mut\">⏸ ждёт</div><div class=\"fp-box mut\">⏸ ждёт</div><div class=\"fp-box mut\">⏸ ждёт</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc big fp-pulse-a\">📦 БД<br>×1 ✓</div></div>"
   },
   {
    "cap": "Лечение 2: ранний refresh до TTL + джиттер — не протухают разом.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">refresh</span><div class=\"fp-box good\">✍️ обновили<br>до TTL</div></div><div class=\"fp-row\"><span class=\"fp-tag\">джиттер</span><div class=\"fp-ver good\">TTL 58s</div><div class=\"fp-ver good\">TTL 63s</div><div class=\"fp-ver good\">TTL 67s</div></div></div>"
   },
   {
    "cap": "Итог: лок + джиттер → БД спокойна, пика нет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">🔎</div><div class=\"fp-token\">🔎</div><div class=\"fp-token\">🔎</div><div class=\"fp-token\">🔎</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box good big fp-pulse-g\">📦 БД ✓<br>спокойна</div><div class=\"fp-bar\"><span style=\"width:15%;background:var(--good)\"></span></div></div>"
   }
  ]
 },
 {
  "id": "rabbit-vs-kafka",
  "t": "Infra",
  "g": "Очереди и поиск",
  "title": "RabbitMQ vs Kafka",
  "frames": [
   {
    "cap": "RabbitMQ: продюсер шлёт сообщение в exchange, тот кладёт в очередь.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">✍️ продюсер</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">📨 exchange</div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">очередь</span><div class=\"fp-token\">📨</div><div class=\"fp-token\">📨</div></div></div>"
   },
   {
    "cap": "Консьюмер подтвердил приём — сообщение удалено из очереди.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">очередь</span><div class=\"fp-token\">📨</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">🧵 консьюмер ✓</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">🗑 удалено</div></div>"
   },
   {
    "cap": "Kafka — это лог: сообщения лежат подряд по offset и хранятся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">лог</span><div class=\"fp-token\">0</div><div class=\"fp-token\">1</div><div class=\"fp-token\">2</div><div class=\"fp-token\">3</div><div class=\"fp-token acc\">4</div></div><div class=\"fp-row\"><span class=\"fp-tag\">offset</span><div class=\"fp-box mut\">📦 retention</div></div></div>"
   },
   {
    "cap": "Каждый консьюмер читает со своей позиции — у всех свой offset.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">лог</span><div class=\"fp-token\">0</div><div class=\"fp-token good\">1</div><div class=\"fp-token\">2</div><div class=\"fp-token acc\">3</div><div class=\"fp-token\">4</div></div><div class=\"fp-row\"><div class=\"fp-box good\">🧵 A → offset 1</div><div class=\"fp-box acc\">🧵 B → offset 3</div></div></div>"
   },
   {
    "cap": "Сообщения на месте — консьюмер мотает offset назад и перечитывает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">лог</span><div class=\"fp-token good\">0</div><div class=\"fp-token good\">1</div><div class=\"fp-token good\">2</div><div class=\"fp-token\">3</div></div><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a fp-travel\">⏮ offset назад</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">🔁 перечитал</div></div></div>"
   },
   {
    "cap": "Итог: Rabbit доставил и забыл. Kafka хранит лог и даёт перечитать.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">RabbitMQ</span><div class=\"fp-box bad\">📨→🗑 один раз</div></div><div class=\"fp-conn\"></div><div class=\"fp-col\"><span class=\"fp-tag\">Kafka</span><div class=\"fp-box good\">📦 лог · 🔁 много раз</div></div></div>"
   }
  ]
 },
 {
  "id": "inverted-index",
  "t": "Infra",
  "g": "Очереди и поиск",
  "title": "Инвертированный индекс",
  "frames": [
   {
    "cap": "Прямой индекс: документ хранит свой список слов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">📄 doc1</span><div class=\"fp-token\">кот</div><div class=\"fp-token\">спит</div></div><div class=\"fp-lane\"><span class=\"name\">📄 doc2</span><div class=\"fp-token\">пёс</div><div class=\"fp-token\">бежит</div></div><div class=\"fp-lane\"><span class=\"name\">📄 doc3</span><div class=\"fp-token\">кот</div><div class=\"fp-token\">бежит</div></div></div>"
   },
   {
    "cap": "Ищем «кот» — но перебрать надо ВСЕ документы. Медленно.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token acc\">🔎 кот</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">doc1?</div><div class=\"fp-box bad\">doc2?</div><div class=\"fp-box bad\">doc3?</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">⏳</div></div>"
   },
   {
    "cap": "Переворачиваем: ключом становится слово, а не документ.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-lane mut\"><span class=\"name\">📄 doc1</span><div class=\"fp-token\">кот</div></div><div class=\"fp-lane mut\"><span class=\"name\">📄 doc3</span><div class=\"fp-token\">кот</div></div></div><div class=\"fp-arrow fp-pulse-a fp-spin\">↻</div><div class=\"fp-lane\" style=\"border-color:var(--acc)\"><span class=\"name\">🔑 кот</span><div class=\"fp-token good\">doc1</div><div class=\"fp-token good\">doc3</div></div></div>"
   },
   {
    "cap": "Инвертированный индекс: каждое слово знает свои документы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🔑 кот</span><div class=\"fp-token good\">doc1</div><div class=\"fp-token good\">doc3</div></div><div class=\"fp-lane\"><span class=\"name\">🔑 бежит</span><div class=\"fp-token good\">doc2</div><div class=\"fp-token good\">doc3</div></div><div class=\"fp-lane\"><span class=\"name\">🔑 спит</span><div class=\"fp-token good\">doc1</div></div></div>"
   },
   {
    "cap": "Поиск «кот» — сразу готовый список. Мгновенно.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token acc\">🔎 кот</div><div class=\"fp-arrow fp-pulse-g\">→</div><div class=\"fp-box good big fp-pulse-g\">[doc1, doc3]</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓ ⚡</div></div>"
   },
   {
    "cap": "Так и работает полнотекстовый поиск в Elasticsearch.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token acc\">🔎 запрос</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node acc fp-pulse-a\">Elasticsearch</div><div class=\"fp-conn\"></div><div class=\"fp-box big good\">🔑 инвертированный индекс</div></div>"
   }
  ]
 },
 {
  "id": "docker-image-container",
  "t": "Infra",
  "g": "Контейнеры",
  "title": "Образ vs контейнер",
  "frames": [
   {
    "cap": "Образ — стопка read-only слоёв. Менять их нельзя.",
    "html": "<div class=\"fp-stack\"><div class=\"fp-slot mut\">🔒 app.jar</div><div class=\"fp-slot mut\">🔒 JDK 21</div><div class=\"fp-slot mut\">🔒 base OS</div></div>"
   },
   {
    "cap": "Запуск: сверху ложится тонкий writable-слой → контейнер.",
    "html": "<div class=\"fp-row\"><div class=\"fp-stack\"><div class=\"fp-slot acc fp-pulse-a\">✍️ writable</div><div class=\"fp-slot mut\">🔒 app.jar</div><div class=\"fp-slot mut\">🔒 JDK 21</div><div class=\"fp-slot mut\">🔒 base OS</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">📦 контейнер</div></div>"
   },
   {
    "cap": "Запись идёт в свой слой; образ нетронут — copy-on-write.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">✍️ запись</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-g\">writable ✓</div></div><div class=\"fp-row\"><div class=\"fp-token\">✍️ запись</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">🔒 образ ✗</div></div></div>"
   },
   {
    "cap": "Из ОДНОГО образа — много контейнеров. Слои общие.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">📦 c1<br>✍️</div><div class=\"fp-box good\">📦 c2<br>✍️</div><div class=\"fp-box good\">📦 c3<br>✍️</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box mut\">🔒 общий образ (read-only слои)</div></div>"
   },
   {
    "cap": "Сборка кэширует слои: изменился app.jar → выше пересборка.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">app.jar</span><span class=\"fp-token acc fp-pulse-a\">🔨 пересборка</span></div><div class=\"fp-lane\"><span class=\"name\">JDK 21</span><span class=\"fp-token good\">✓ кэш</span></div><div class=\"fp-lane\"><span class=\"name\">base OS</span><span class=\"fp-token good\">✓ кэш</span></div></div>"
   }
  ]
 },
 {
  "id": "k8s-pod",
  "t": "Infra",
  "g": "Контейнеры",
  "title": "Что такое pod",
  "frames": [
   {
    "cap": "Контейнер — один упакованный процесс (приложение).",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\">📦 контейнер<br>app</div></div>"
   },
   {
    "cap": "Pod — обёртка над контейнерами, живёт на ОДНОМ узле.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good\">pod<div class=\"fp-row\"><div class=\"fp-box acc\">📦 app</div></div></div><div class=\"fp-arrow\">↓</div><span class=\"fp-tag\">🖥 узел / node</span></div>"
   },
   {
    "cap": "Контейнеры пода делят сеть (один IP) и тома.",
    "html": "<div class=\"fp-box big good\">pod<div class=\"fp-row\"><div class=\"fp-box acc\">📦 app</div><div class=\"fp-box mut\">📦 sidecar</div></div><div class=\"fp-row\"><div class=\"fp-token\">🌐 один IP</div><div class=\"fp-token\">📦 общий том</div></div></div>"
   },
   {
    "cap": "Обычно: 1 главный контейнер + sidecar (логи, прокси).",
    "html": "<div class=\"fp-box big good\">pod<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">📦 app<br>главный</div><div class=\"fp-box mut\">📦 sidecar<br>логи/прокси</div></div></div>"
   },
   {
    "cap": "Масштабируем — копируем под целиком (реплики).",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">pod #1<div class=\"fp-row\"><div class=\"fp-token\">📦 app</div><div class=\"fp-token\">📦 sc</div></div></div><div class=\"fp-box good fp-pulse-g\">pod #2<div class=\"fp-row\"><div class=\"fp-token\">📦 app</div><div class=\"fp-token\">📦 sc</div></div></div><div class=\"fp-box good fp-pulse-g\">pod #3<div class=\"fp-row\"><div class=\"fp-token\">📦 app</div><div class=\"fp-token\">📦 sc</div></div></div></div>"
   },
   {
    "cap": "Итог: pod — единица масштабирования, не контейнер.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">✗ отдельный контейнер</div></div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-box big good fp-pulse-g\">✓ pod = единица реплики</div></div></div>"
   }
  ]
 },
 {
  "id": "k8s-probes",
  "t": "Infra",
  "g": "Контейнеры",
  "title": "Liveness vs readiness",
  "frames": [
   {
    "cap": "Под живёт. У него два датчика: «жив ли?» и «готов ли брать трафик?».",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">📦 Pod</div><div class=\"fp-row\"><div class=\"fp-box good\">🔎 liveness</div><div class=\"fp-box acc\">🔎 readiness</div></div></div>"
   },
   {
    "cap": "Прогрев: liveness=✓ (жив), readiness=✗ (ещё не готов).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc fp-pulse-a\">📦 прогрев ⏳</div><div class=\"fp-row\"><div class=\"fp-box good\">liveness ✓</div><div class=\"fp-box bad\">readiness ✗</div></div><div class=\"fp-bar\"><span style=\"width:40%\"></span></div></div>"
   },
   {
    "cap": "readiness=✗ → балансир не шлёт трафик, но под НЕ убивают.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">балансир 📨</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">✗</div><div class=\"fp-box big mut\">📦 readiness ✗</div></div>"
   },
   {
    "cap": "Прогрелся: readiness=✓ → трафик пошёл, под в работе.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">балансир 📨</div><div class=\"fp-arrow fp-pulse-g\" style=\"color:var(--good)\">→</div><div class=\"fp-box big good fp-pulse-g\">📦 readiness ✓</div></div>"
   },
   {
    "cap": "liveness ✗ → kubelet перезапускает контейнер в том же поде.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big bad fp-blink\">📦 liveness ✗</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">kubelet ⏳</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good fp-pulse-g\">📦 тот же под ✓</div></div>"
   },
   {
    "cap": "Итог: liveness=рестарт; readiness=пускать/не пускать трафик.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box bad\">liveness ✗</div><div class=\"fp-token\">🔁 рестарт контейнера</div></div><div class=\"fp-col\"><div class=\"fp-box mut\">readiness ✗</div><div class=\"fp-token\">⏸ нет трафика</div></div></div>"
   }
  ]
 },
 {
  "id": "git-rebase",
  "t": "Git",
  "g": "Git",
  "title": "rebase vs merge",
  "frames": [
   {
    "cap": "feature ответвилась от main на коммите C2",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🌿 main</span><div class=\"fp-row\"><div class=\"fp-node\">C1</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">C2</div></div></div><div class=\"fp-row\" style=\"padding-left:120px\"><div class=\"fp-arrow\">↓</div></div><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">🌿 feature</span><div class=\"fp-row\"><div class=\"fp-node good\">F1</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">F2</div></div></div></div>"
   },
   {
    "cap": "пока ты пилил feature, main ушла вперёд: C3, C4",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🌿 main</span><div class=\"fp-row\"><div class=\"fp-node\">C1</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">C2</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">C3</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">C4</div></div></div><div class=\"fp-row\" style=\"padding-left:120px\"><div class=\"fp-arrow\">↓</div></div><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">🌿 feature</span><div class=\"fp-row\"><div class=\"fp-node good\">F1</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">F2</div></div></div></div>"
   },
   {
    "cap": "merge: новый коммит M связывает C4 и F2, история ветвится",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🌿 main</span><div class=\"fp-row\"><div class=\"fp-node\">C2</div><div class=\"fp-conn\"></div><div class=\"fp-node\">C3</div><div class=\"fp-conn\"></div><div class=\"fp-node\">C4</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">M</div></div></div><div class=\"fp-row\" style=\"padding-left:60px\"><div class=\"fp-arrow\">↓</div><span class=\"fp-tag\">от C2</span><div style=\"flex:1\"></div><div class=\"fp-arrow\">↑</div><span class=\"fp-tag\">в M из F2</span></div><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">🌿 feature</span><div class=\"fp-row\"><div class=\"fp-node good\">F1</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">F2</div></div></div></div>"
   },
   {
    "cap": "rebase: F1,F2 переписаны ПОВЕРХ C4 как F1', F2' с новыми хешами",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🌿 main</span><div class=\"fp-row\"><div class=\"fp-node\">C2</div><div class=\"fp-conn\"></div><div class=\"fp-node\">C3</div><div class=\"fp-conn\"></div><div class=\"fp-node\">C4</div></div></div><div class=\"fp-row\"><div class=\"fp-node mut dead\">F1</div><div class=\"fp-conn\"></div><div class=\"fp-node mut dead\">F2</div><div class=\"fp-token mut\">старые хеши ✗</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><span class=\"fp-tag\">переносим поверх C4</span></div><div class=\"fp-row\"><div class=\"fp-node good fp-travel\">F1'</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-travel\">F2'</div><div class=\"fp-token good\">новые хеши ✓</div></div></div>"
   },
   {
    "cap": "итог: merge ветвится и честен, rebase даёт прямую линию",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\"><div class=\"fp-row\"><div class=\"fp-node\">C4</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">M</div></div><div class=\"fp-row\" style=\"padding-left:0\"><div class=\"fp-conn\"></div><div class=\"fp-node good\">F2</div></div><span class=\"fp-tag\">merge: 🌿 развилка</span></div><div class=\"fp-box acc\"><div class=\"fp-row\"><div class=\"fp-node\">C4</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">F1'</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">F2'</div></div><span class=\"fp-tag\">rebase: прямая линия</span></div></div>"
   },
   {
    "cap": "правило: НЕ rebase общей ветки — у других сломаются хеши 🔒",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\" style=\"border-color:var(--bad)\"><span class=\"name\">🌿 общая main</span><div class=\"fp-row\"><div class=\"fp-node\">C3</div><div class=\"fp-conn\"></div><div class=\"fp-node\">C4</div><div class=\"fp-token bad fp-blink\">rebase 🔒 ✗</div></div></div><div class=\"fp-row\"><div class=\"fp-node mut dead\">C3</div><div class=\"fp-arrow\">→</div><div class=\"fp-node bad\">C3'</div><div class=\"fp-token bad\">хеши уехали, у коллег конфликт</div></div><div class=\"fp-box good\"><span class=\"fp-tag\">rebase ✓ только своя локальная ветка</span></div></div>"
   }
  ]
 },
 {
  "id": "git-cherrypick",
  "t": "Git",
  "g": "Git",
  "title": "cherry-pick",
  "frames": [
   {
    "cap": "Две ветки. В feature есть нужный коммит C, X и Y нам не нужны",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🌿 main</span><div class=\"fp-row\"><div class=\"fp-ver\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver\">B</div></div></div><div class=\"fp-lane\"><span class=\"name\">🌿 feature</span><div class=\"fp-row\"><div class=\"fp-ver mut\">X</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver good fp-pulse-g\">C</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver mut\">Y</div></div></div></div>"
   },
   {
    "cap": "Нужен только C. Merge притащил бы X и Y тоже — а мы не хотим",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver good fp-pulse-g\">✓ C</div><span class=\"fp-tag\">берём</span></div><div class=\"fp-row\"><div class=\"fp-ver dead\">✗ X</div><div class=\"fp-ver dead\">✗ Y</div><span class=\"fp-tag\">мимо</span></div></div>"
   },
   {
    "cap": "cherry-pick C: копируем ТОЛЬКО C в текущую ветку main",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">🌿 feature</span><div class=\"fp-ver good\">C</div></div><div class=\"fp-arrow fp-pulse-a\">→</div><div class=\"fp-box acc big fp-float\">🍒</div><div class=\"fp-arrow fp-pulse-a\">→</div><div class=\"fp-lane\"><span class=\"name\">🌿 main 🔎</span><div class=\"fp-row\"><div class=\"fp-ver mut\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver mut\">B</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver acc fp-pulse-a\">+</div></div></div></div>"
   },
   {
    "cap": "В main лёг новый коммит C' (новый хеш). Оригинал C в feature на месте",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🌿 main</span><div class=\"fp-row\"><div class=\"fp-ver\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver\">B</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver good fp-pulse-g\">C'</div><span class=\"fp-token\">🍒 копия</span></div></div><div class=\"fp-lane\"><span class=\"name\">🌿 feature</span><div class=\"fp-row\"><div class=\"fp-ver mut\">X</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver good\">C</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver mut\">Y</div></div></div></div>"
   },
   {
    "cap": "Итог: только C переехал копией в main. X и Y остались в feature",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🌿 main</span><div class=\"fp-row\"><div class=\"fp-ver\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver\">B</div><div class=\"fp-arrow\">→</div><div class=\"fp-ver good\">C'</div><span class=\"fp-tag\">✓</span></div></div><div class=\"fp-lane\"><span class=\"name\">🌿 feature</span><div class=\"fp-row\"><div class=\"fp-ver dead\">X</div><div class=\"fp-ver good\">C</div><div class=\"fp-ver dead\">Y</div><span class=\"fp-token\">🗑 не тащили</span></div></div></div>"
   }
  ]
 },
 {
  "id": "git-bisect",
  "t": "Git",
  "g": "Git",
  "title": "git bisect",
  "frames": [
   {
    "cap": "Ряд коммитов: слева всё работало, справа сломалось. Где первый плохой?",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver good\">c1 ✓</div><div class=\"fp-ver\">c2</div><div class=\"fp-ver\">c3</div><div class=\"fp-ver\">c4</div><div class=\"fp-ver\">c5</div><div class=\"fp-ver\">c6</div><div class=\"fp-ver bad\">c7 ✗</div></div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">good</span><span class=\"fp-tag\" style=\"border-color:var(--bad)\">bad</span></div></div>"
   },
   {
    "cap": "Bisect чекаутит СЕРЕДИНУ и спрашивает: тут уже сломано?",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver good\">c1 ✓</div><div class=\"fp-ver\">c2</div><div class=\"fp-ver\">c3</div><div class=\"fp-ver acc fp-pulse-a\">c4 🔍</div><div class=\"fp-ver\">c5</div><div class=\"fp-ver\">c6</div><div class=\"fp-ver bad\">c7 ✗</div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↑</div><span class=\"fp-token\">checkout середины</span></div></div>"
   },
   {
    "cap": "Середина РАБОТАЕТ → баг правее. Левую половину выкидываем, чекаутим c6.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver dead\">c1</div><div class=\"fp-ver dead\">c2</div><div class=\"fp-ver dead\">c3</div><div class=\"fp-ver good\">c4 ✓</div><div class=\"fp-ver\">c5</div><div class=\"fp-ver acc fp-pulse-a\">c6 🔍</div><div class=\"fp-ver bad\">c7 ✗</div></div><div class=\"fp-row\"><span class=\"fp-token\">✓ работает</span><div class=\"fp-arrow\">→</div><span class=\"fp-tag\" style=\"border-color:var(--bad)\">ищем правее</span></div></div>"
   },
   {
    "cap": "c6 СЛОМАН → баг между c4 и c6. Остаётся проверить c5.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver good\">c4 ✓</div><div class=\"fp-ver acc fp-pulse-a\">c5 🔍</div><div class=\"fp-ver bad\">c6 ✗</div><div class=\"fp-ver dead\">c7</div></div><div class=\"fp-row\"><span class=\"fp-token\">✗ сломано</span><div class=\"fp-arrow\">←</div><span class=\"fp-tag\" style=\"border-color:var(--good)\">ищем левее</span></div></div>"
   },
   {
    "cap": "Каждый шаг отбрасывает половину — зона поиска тает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div></div>"
   },
   {
    "cap": "1000 коммитов — всего ~10 проверок: log2(n) шагов до виноватого.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-val\">1000</div><span class=\"fp-token\">коммитов</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-row\"><div class=\"fp-val acc\">~10</div><span class=\"fp-token\">проверок</span></div><div class=\"fp-row\"><div class=\"fp-ver bad fp-pulse-r\">🔍 c5 ✗</div><span class=\"fp-tag\" style=\"border-color:var(--bad)\">первый bad</span></div></div>"
   }
  ]
 },
 {
  "id": "cicd-pipeline",
  "t": "DevOps",
  "g": "CI/CD и деплой",
  "title": "CI/CD pipeline",
  "frames": [
   {
    "cap": "Ты пушишь код в репо — это нажимает кнопку «старт» пайплайна.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">🌿 push<br>в репо</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big\">⚙️ пайплайн<br>стартовал</div></div>"
   },
   {
    "cap": "Пайплайн — конвейер из трёх этапов по очереди.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box\">📦 build<br>собрать</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">🔎 test<br>проверить</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">🚀 deploy<br>выкатить</div></div>"
   },
   {
    "cap": "Между test и deploy стоит гейт — пропускает только зелёных.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box\">🔎 test</div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\"><span class=\"name\">🔒 гейт</span><div class=\"fp-token good\">✓ green</div><div class=\"fp-token bad\">✗ red</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">🚀 deploy</div></div>"
   },
   {
    "cap": "Зелёные тесты — гейт открыт, едем на прод.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🔎 ✓ green</div><div class=\"fp-arrow\" style=\"border-color:var(--good)\">→</div><div class=\"fp-box good\">🚀 deploy<br>на прод</div></div>"
   },
   {
    "cap": "Красные тесты — стоп: мерж и деплой заблокированы.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">🔎 ✗ red</div><div class=\"fp-arrow\" style=\"border-color:var(--bad)\">→</div><div class=\"fp-box bad\">🔒⏸ deploy<br>заблокирован</div></div>"
   },
   {
    "cap": "Развилка из одной точки: зелёный → прод, красный → чинить.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box\">🔎 test</div><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-arrow\" style=\"border-color:var(--good)\">↓</div><div class=\"fp-box good\">🚀 prod</div></div><div class=\"fp-col\"><div class=\"fp-arrow\" style=\"border-color:var(--bad)\">↓</div><div class=\"fp-box bad\">✍️ фикс</div></div></div></div>"
   }
  ]
 },
 {
  "id": "deploy-strategies",
  "t": "DevOps",
  "g": "CI/CD и деплой",
  "title": "Blue-green vs Canary",
  "frames": [
   {
    "cap": "Две стратегии выката новой версии. Цель — обновить без боли.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box big acc\">🔵 Blue-green</div><span class=\"fp-tag\">разом</span></div><div class=\"fp-col\"><div class=\"fp-box big good\">🐤 Canary</div><span class=\"fp-tag\">по чуть-чуть</span></div></div>"
   },
   {
    "cap": "Blue-green: весь трафик на синем (v1). Зелёный (v2) уже готов, но пустой.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">трафик 100%</div><div class=\"fp-arrow\">→</div><div class=\"fp-lane\" style=\"border-color:var(--acc)\"><span class=\"name\">🔵 blue v1</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell on acc\"></div><div class=\"fp-cell on acc\"></div><div class=\"fp-cell on acc\"></div><div class=\"fp-cell on acc\"></div></div></div><div class=\"fp-lane\" style=\"border-color:var(--mut)\"><span class=\"name\">🟢 green v2</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div></div>"
   },
   {
    "cap": "Переключили рубильник разом: весь трафик ушёл на зелёный v2.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">трафик 100%</div><div class=\"fp-arrow fp-pulse-g\">→</div><div class=\"fp-lane\" style=\"border-color:var(--mut)\"><span class=\"name\">🔵 blue v1</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div><div class=\"fp-cell\"></div></div></div><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">🟢 green v2</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell on good\"></div><div class=\"fp-cell on good\"></div><div class=\"fp-cell on good\"></div><div class=\"fp-cell on good\"></div></div></div></div>"
   },
   {
    "cap": "Сломалось? Откат мгновенный — вернули рубильник на синий v1. ✓",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">трафик 100%</div><div class=\"fp-arrow fp-pulse-a\">→</div><div class=\"fp-lane\" style=\"border-color:var(--acc)\"><span class=\"name\">🔵 blue v1 ✓</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell on acc\"></div><div class=\"fp-cell on acc\"></div><div class=\"fp-cell on acc\"></div><div class=\"fp-cell on acc\"></div></div></div><div class=\"fp-lane\" style=\"border-color:var(--bad)\"><span class=\"name\">🟢 green v2 ✗</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div><div class=\"fp-cell bad\"></div></div></div></div>"
   },
   {
    "cap": "Canary: пускаем 5% на v2, остальное на v1. Смотрим метрики 🔎",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag\">v1 95%</span><div class=\"fp-bar\"><span style=\"width:95%\"></span></div></div><div class=\"fp-row\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">🐤 v2 5%</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(20,1fr)\"><div class=\"fp-cell on good fp-pulse-g\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div><div class=\"fp-cell on\"></div></div></div><div class=\"fp-token\" style=\"border-color:var(--good)\">🔎 метрики ок</div></div>"
   },
   {
    "cap": "Метрики ок — расширяем v2: 5% видим, потом плавно до 50% и 100%. ✓",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">5%</span><div class=\"fp-bar\"><span style=\"width:5%\"></span></div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">50%</span><div class=\"fp-bar\"><span style=\"width:50%\"></span></div></div><div class=\"fp-arrow fp-pulse-g\">→</div><div class=\"fp-col\"><span class=\"fp-tag\" style=\"border-color:var(--good)\">100% ✓</span><div class=\"fp-bar\"><span style=\"width:100%\"></span></div></div></div>"
   }
  ]
 },
 {
  "id": "serverless",
  "t": "DevOps",
  "g": "CI/CD и деплой",
  "title": "Serverless / FaaS",
  "frames": [
   {
    "cap": "Обычный сервер крутится 24/7 — платишь даже когда никого нет",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">сервер 24/7</span><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on fp-pulse-a\"></div><div class=\"fp-cell on fp-pulse-a\"></div></div></div><div class=\"fp-box bad\">💸 платишь всегда</div></div>"
   },
   {
    "cap": "Serverless в простое: функция спит, оплата ноль",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">⏸ спит</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\"><div class=\"fp-val\">0</div>оплата</div></div>"
   },
   {
    "cap": "Приходит событие — HTTP-запрос или сообщение из очереди",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">📨 HTTP</div><div class=\"fp-token\">📦 очередь</div></div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-lane\"><span class=\"name\">функция</span><div class=\"fp-node acc fp-pulse-a\">⚡</div></div></div>"
   },
   {
    "cap": "Провайдер поднимает функцию по требованию — она отрабатывает",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\" style=\"border-color:var(--good)\"><span class=\"name\">провайдер</span><div class=\"fp-stack\"><div class=\"fp-slot fp-pulse-g\">handler()</div></div></div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-box good\">✓ ответ готов</div></div>"
   },
   {
    "cap": "Отработала — гаснет. Платишь только за этот один вызов",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">🗑 погасла</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\"><span class=\"fp-tag\">счёт</span> 1 вызов</div></div>"
   },
   {
    "cap": "Минус: первый старт «с нуля» медленный — это cold start",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">⏳ cold start</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\"><div class=\"fp-slot fp-spin\">🌀</div></div></div><div class=\"fp-row\"><div class=\"fp-box good\">🔥 warm</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">✓ быстро</div></div></div>"
   }
  ]
 },
 {
  "id": "soa-msa",
  "t": "DevOps",
  "g": "Архитектура",
  "title": "SOA vs микросервисы",
  "frames": [
   {
    "cap": "Две архитектуры. Разберём, чем отличаются на пальцах.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\">SOA</div><div class=\"fp-box big good\">MSA</div></div>"
   },
   {
    "cap": "SOA: сервисы говорят через общую шину ESB и часто делят одну БД.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">A</div><div class=\"fp-box acc\">B</div><div class=\"fp-box acc\">C</div></div><div class=\"fp-lane fp-pulse-a\"><span class=\"name\">ESB шина 📨</span></div><div class=\"fp-arrow\">↓</div><div class=\"fp-box big mut\">📦 общая БД</div></div>"
   },
   {
    "cap": "MSA: мелкие сервисы, у каждого своя БД.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box good\">A</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">📦</div><span class=\"fp-tag\">своя БД</span></div><div class=\"fp-col\"><div class=\"fp-box good\">B</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">📦</div><span class=\"fp-tag\">своя БД</span></div><div class=\"fp-col\"><div class=\"fp-box good\">C</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">📦</div><span class=\"fp-tag\">своя БД</span></div></div>"
   },
   {
    "cap": "Связь напрямую по сети, без центральной шины.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node good\">A</div><div class=\"fp-arrow fp-pulse-g\">→</div><div class=\"fp-node good\">B</div><div class=\"fp-arrow fp-pulse-g\">→</div><div class=\"fp-node good\">C</div></div>"
   },
   {
    "cap": "Деплой раздельный: обновляешь B — A и C живут дальше.",
    "html": "<div class=\"fp-row\"><div class=\"fp-ver\">A ✓</div><div class=\"fp-ver fp-blink\" style=\"border-color:var(--acc)\">B ⏳</div><div class=\"fp-ver\">C ✓</div></div>"
   },
   {
    "cap": "Суть: SOA — общее ядро, MSA — про независимость кусочков.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc\">SOA</div><span class=\"fp-tag\">общая БД + ESB</span></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">MSA</div><span class=\"fp-tag\">независимость</span></div></div>"
   }
  ]
 },
 {
  "id": "tls-handshake",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "TLS handshake",
  "frames": [
   {
    "cap": "Клиент стучится к серверу: «Привет, давай шифроваться»",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\">🧑 Клиент</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">Привет 🔒?</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big\">🖥 Сервер</div></div>"
   },
   {
    "cap": "Сервер шлёт свой паспорт — сертификат с печатью CA",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big\">🖥 Сервер</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-float\">📦 Сертификат<br>✍️ печать CA</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big acc\">🧑 Клиент</div></div>"
   },
   {
    "cap": "Клиент проверяет печать у CA — паспорт настоящий ✓",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">📦 Сертификат</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc fp-spin\">🔎</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">🏛 CA</div></div><div class=\"fp-box good big fp-pulse-g\">✓ Печать верна</div></div>"
   },
   {
    "cap": "Пара ключей: открытый виден всем, закрытый — только у сервера",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc\">🔑 открытый</div><span class=\"fp-tag\">всем виден</span></div><div class=\"fp-conn\"></div><div class=\"fp-col\"><div class=\"fp-box bad\">🔑 закрытый 🤫</div><span class=\"fp-tag\">только сервер</span></div></div>"
   },
   {
    "cap": "Обмениваются открыто — и каждый САМ выводит один и тот же секрет",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big\">🧑</div><div class=\"fp-token fp-float\">🔓 моя часть</div><div class=\"fp-conn\"></div><div class=\"fp-token fp-float\">🔓 моя часть</div><div class=\"fp-box big\">🖥</div></div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🧮→🔑 секрет</div><div class=\"fp-arrow\">=</div><div class=\"fp-box good fp-pulse-g\">🔑 секрет←🧮</div></div></div>"
   },
   {
    "cap": "Один общий быстрый симметричный ключ — туннель зашифрован",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big good\">🧑 🔑</div><div class=\"fp-lane fp-pulse-g\"><span class=\"name\">🔒 один общий 🔑 трафик</span></div><div class=\"fp-box big good\">🔑 🖥</div></div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div></div>"
   }
  ]
 },
 {
  "id": "reverse-proxy-lb",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "Reverse proxy и балансировка",
  "frames": [
   {
    "cap": "Толпа клиентов лезет в кучу серверов — каша, никто не знает куда",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">🧵</div><div class=\"fp-token\">🧵</div><div class=\"fp-token\">🧵</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box mut\">app1</div><div class=\"fp-box mut\">app2</div><div class=\"fp-box mut\">app3</div></div></div>"
   },
   {
    "cap": "Ставим один вход — nginx. Все идут к нему, а он уже раздаёт",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token\">🧵</div><div class=\"fp-token\">🧵</div><div class=\"fp-token\">🧵</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc big fp-pulse-a\">nginx</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box\">app1</div><div class=\"fp-box\">app2</div><div class=\"fp-box\">app3</div></div></div>"
   },
   {
    "cap": "На входе nginx сам делает TLS 🔒, отдаёт статику 📦 и держит кэш",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc big\">nginx</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">🔒 TLS</span></div><div class=\"fp-lane\"><span class=\"name\">📦 статика</span></div><div class=\"fp-lane\"><span class=\"name\">⏳ кэш</span></div></div></div>"
   },
   {
    "cap": "Запросы льются ровно: каждому инстансу своя доля — балансировка",
    "html": "<div class=\"fp-col\"><div class=\"fp-node acc\">nginx</div><div class=\"fp-row\"><div class=\"fp-conn\"></div><div class=\"fp-conn\"></div><div class=\"fp-conn\"></div></div><div class=\"fp-row\"><div class=\"fp-box good\">app1 <div class=\"fp-bar\"><span style=\"width:33%\"></span></div></div><div class=\"fp-box good\">app2 <div class=\"fp-bar\"><span style=\"width:33%\"></span></div></div><div class=\"fp-box good\">app3 <div class=\"fp-bar\"><span style=\"width:33%\"></span></div></div></div></div>"
   },
   {
    "cap": "Health-check 🔎 стучит к каждому: жив ли? Все ответили ✓",
    "html": "<div class=\"fp-col\"><div class=\"fp-node acc\">nginx 🔎</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-box good\">app1 ✓</div><div class=\"fp-box good\">app2 ✓</div><div class=\"fp-box good\">app3 ✓</div></div></div>"
   },
   {
    "cap": "app2 упал ✗ — nginx убирает его из ротации, льёт в живые",
    "html": "<div class=\"fp-col\"><div class=\"fp-node acc\">nginx 🔎</div><div class=\"fp-row\"><div class=\"fp-arrow\">↓</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">✗</div><div class=\"fp-arrow\">↓</div></div><div class=\"fp-row\"><div class=\"fp-box good\">app1 ✓ <div class=\"fp-bar\"><span style=\"width:50%\"></span></div></div><div class=\"fp-ver dead\">app2 ✗</div><div class=\"fp-box good\">app3 ✓ <div class=\"fp-bar\"><span style=\"width:50%\"></span></div></div></div></div>"
   }
  ]
 },
 {
  "id": "rest-soap-graphql-grpc",
  "t": "Web",
  "g": "Форматы",
  "title": "REST / SOAP / GraphQL / gRPC",
  "frames": [
   {
    "cap": "Четыре способа сервисам говорить друг с другом — по-разному",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">svc A</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-node acc fp-pulse-a\" style=\"animation-delay:.6s\">svc B</div></div><div class=\"fp-arrow\">на каком языке говорить?</div><div class=\"fp-row\"><div class=\"fp-col pr-fade\"><div class=\"fp-box acc\">REST</div><div class=\"fp-tag\">ресурсы</div></div><div class=\"fp-col pr-fade\" style=\"animation-delay:.2s\"><div class=\"fp-box warn\">SOAP</div><div class=\"fp-tag\">XML-контракт</div></div><div class=\"fp-col pr-fade\" style=\"animation-delay:.4s\"><div class=\"fp-box good\">GraphQL</div><div class=\"fp-tag\">выбор полей</div></div><div class=\"fp-col pr-fade\" style=\"animation-delay:.6s\"><div class=\"fp-box big\" style=\"color:var(--cyan)\">gRPC</div><div class=\"fp-tag\">бинарный</div></div></div></div>"
   },
   {
    "cap": "REST: адрес = ресурс, глаголы HTTP, ответ JSON — просто",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag good pr-fade\">GET</div><div class=\"fp-tag acc pr-fade\" style=\"animation-delay:.15s\">POST</div><div class=\"fp-tag warn pr-fade\" style=\"animation-delay:.3s\">PUT</div><div class=\"fp-tag bad pr-fade\" style=\"animation-delay:.45s\">DELETE</div></div><div class=\"fp-row\"><div class=\"fp-node acc\">client</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-token acc\">GET /users/7</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-node acc fp-pulse-a\">API</div></div><div class=\"fp-arrow\">адрес = ресурс, глагол = действие</div><div class=\"fp-box good pr-glow\">200 OK &middot; { \"name\": \"Ali\" }</div></div>"
   },
   {
    "cap": "SOAP: строгий контракт WSDL и тяжёлый XML-конверт",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node warn fp-pulse-a\">WSDL</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">строгий контракт: типы и операции</div></div><div class=\"fp-arrow\">каждый вызов заворачиваем &darr;</div><div class=\"fp-stack\"><div class=\"fp-slot pr-fade\">&lt;Envelope&gt;</div><div class=\"fp-slot pr-fade\" style=\"animation-delay:.25s\">&lt;Header&gt;</div><div class=\"fp-slot acc pr-fade\" style=\"animation-delay:.5s\">&lt;Body&gt; данные &lt;/Body&gt;</div><div class=\"fp-slot pr-fade\" style=\"animation-delay:.75s\">&lt;/Envelope&gt;</div></div><div class=\"fp-tag warn\">обёртки весят больше, чем данные</div></div>"
   },
   {
    "cap": "GraphQL: один вход, клиент сам выбирает нужные поля 🔎",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token good pr-fade\">✓ name</div><div class=\"fp-token good pr-fade\" style=\"animation-delay:.2s\">✓ email</div><div class=\"fp-token mut pr-fade\" style=\"animation-delay:.4s\">✗ phone</div></div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-node good fp-pulse-g\">/graphql</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-box good pr-glow\">ровно 2 поля</div></div><div class=\"fp-row\"><div class=\"fp-tag\">один endpoint</div><div class=\"fp-tag good\">нет over-fetching</div></div></div>"
   },
   {
    "cap": "gRPC: бинарный protobuf по HTTP/2 — быстро между сервисами ⚡",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">svc A</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-token pr-fade\" style=\"color:var(--cyan)\">0101</div><div class=\"fp-token pr-fade\" style=\"animation-delay:.2s;color:var(--cyan)\">proto</div><div class=\"fp-token pr-fade\" style=\"animation-delay:.4s;color:var(--cyan)\">1101</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-node acc fp-pulse-a\" style=\"animation-delay:.5s\">svc B</div></div><div class=\"fp-row\"><div class=\"fp-tag acc\">HTTP/2</div><div class=\"fp-tag good\">бинарный protobuf</div><div class=\"fp-tag good\">streaming</div><div class=\"fp-tag\">.proto = контракт</div></div></div>"
   },
   {
    "cap": "Скорость: gRPC быстрее всех, SOAP тяжелее всех",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane pr-fade\"><span class=\"name\">SOAP</span><div class=\"fp-bar\"><span style=\"width:35%;background:var(--bad)\"></span></div></div><div class=\"fp-lane pr-fade\" style=\"animation-delay:.2s\"><span class=\"name\">REST</span><div class=\"fp-bar\"><span style=\"width:60%\"></span></div></div><div class=\"fp-lane pr-fade\" style=\"animation-delay:.4s\"><span class=\"name\">GraphQL</span><div class=\"fp-bar\"><span style=\"width:65%\"></span></div></div><div class=\"fp-lane pr-fade\" style=\"animation-delay:.6s\"><span class=\"name\">gRPC</span><div class=\"fp-bar\"><span class=\"fp-pulse-g\" style=\"width:95%;background:var(--good)\"></span></div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">SOAP: тяжёлый конверт</div><div class=\"fp-tag good\">gRPC: бинарь + HTTP/2</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-binary-search",
  "t": "Algorithms",
  "g": "Поиск",
  "title": "Бинарный поиск",
  "frames": [
   {
    "cap": "Дано: отсортированный массив, ищем число 7 — линейно пришлось бы пройти всё.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-box\">3</div><div class=\"fp-box\">5</div><div class=\"fp-box\">7</div><div class=\"fp-box\">9</div><div class=\"fp-box\">11</div><div class=\"fp-box\">13</div></div><div class=\"fp-tag\">ищем 7</div></div>"
   },
   {
    "cap": "Ставим границы lo и hi на концы и бьём точно в середину.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">1</div><div class=\"fp-box\">3</div><div class=\"fp-box\">5</div><div class=\"fp-box acc fp-pulse-a\">7</div><div class=\"fp-box\">9</div><div class=\"fp-box\">11</div><div class=\"fp-box bad\">13</div></div><div class=\"fp-row\"><div class=\"fp-tag\">lo</div><div class=\"fp-tag\">mid</div><div class=\"fp-tag\">hi</div></div></div>"
   },
   {
    "cap": "В середине стоит 7 — но покажем сам принцип: будь там 9, цель меньше, режем правую половину.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-box\">3</div><div class=\"fp-box\">5</div><div class=\"fp-box acc\">9?</div><div class=\"fp-box bad\">11</div><div class=\"fp-box bad\">13</div></div><div class=\"fp-tag\">mid&gt;7 → выкидываем правую</div></div>"
   },
   {
    "cap": "Один шаг — и половина массива испарилась, кандидатов вдвое меньше.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">1</div><div class=\"fp-box good\">3</div><div class=\"fp-box good\">5</div><div class=\"fp-box acc fp-pulse-a\">7</div><div class=\"fp-ver dead\">9</div><div class=\"fp-ver dead\">11</div><div class=\"fp-ver dead\">13</div></div><div class=\"fp-tag\">осталось искать тут</div></div>"
   },
   {
    "cap": "Каждое деление пополам — это лесенка вниз: 1млн элементов = всего ~20 шагов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">шаг1</div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div></div><div class=\"fp-row\"><div class=\"fp-lane name\">шаг2</div><div class=\"fp-bar\"><span style=\"width:50%\"></span></div></div><div class=\"fp-row\"><div class=\"fp-lane name\">шаг3</div><div class=\"fp-bar\"><span style=\"width:25%\"></span></div></div><div class=\"fp-row\"><div class=\"fp-lane name\">шаг4</div><div class=\"fp-bar\"><span style=\"width:12%\"></span></div></div></div>"
   },
   {
    "cap": "Итог: нашли 7 за пару сравнений вместо прохода всего массива — это и есть O(log n).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">7 найдено</div><div class=\"fp-row\"><div class=\"fp-tag\">O(log n)</div><div class=\"fp-tag\">нужна сортировка</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-bfs",
  "t": "Algorithms",
  "g": "Графы",
  "title": "BFS — обход в ширину",
  "frames": [
   {
    "cap": "Граф вершин, стартуем из A — хотим обойти всех по «расстоянию в рёбрах».",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">A</div></div><div class=\"fp-row\"><div class=\"fp-node\">B</div><div class=\"fp-node\">C</div></div><div class=\"fp-row\"><div class=\"fp-node\">D</div><div class=\"fp-node\">E</div></div></div>"
   },
   {
    "cap": "Кладём A в очередь и помечаем посещённым — очередь это наш «список ожидания».",
    "html": "<div class=\"fp-col\"><div class=\"fp-node good fp-pulse-g\">A</div><div class=\"fp-row\"><div class=\"fp-lane name\">queue</div><div class=\"fp-token\">A</div></div></div>"
   },
   {
    "cap": "Достаём A, в очередь падают все его прямые соседи — это первое кольцо.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node mut\">A</div><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">B</div><div class=\"fp-node acc fp-pulse-a\">C</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">queue</div><div class=\"fp-token\">B</div><div class=\"fp-token\">C</div></div></div>"
   },
   {
    "cap": "Берём B, потом C — добавляем их соседей D и E: пошло второе кольцо.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node good\">B</div><div class=\"fp-node good\">C</div><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">D</div><div class=\"fp-node acc fp-pulse-a\">E</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">queue</div><div class=\"fp-token\">D</div><div class=\"fp-token\">E</div></div></div>"
   },
   {
    "cap": "Волна расходится строго по уровням: расстояние = номер кольца.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">dist 0</div><div class=\"fp-node good\">A</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">dist 1</div><div class=\"fp-node good\">B</div><div class=\"fp-node good\">C</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">dist 2</div><div class=\"fp-node good\">D</div><div class=\"fp-node good\">E</div></div></div>"
   },
   {
    "cap": "Итог: BFS даёт кратчайший путь по числу рёбер в невзвешенном графе за O(V+E).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">кратчайший путь по рёбрам</div><div class=\"fp-row\"><div class=\"fp-tag\">очередь FIFO</div><div class=\"fp-tag\">O(V+E)</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-dfs",
  "t": "Algorithms",
  "g": "Графы",
  "title": "DFS — обход в глубину",
  "frames": [
   {
    "cap": "Тот же граф, но теперь не расходимся кольцами, а ныряем по одной ветке вглубь.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node acc\">A</div><div class=\"fp-conn\"></div><div class=\"fp-row\"><div class=\"fp-node\">B</div><div class=\"fp-node\">C</div></div><div class=\"fp-row\"><div class=\"fp-node\">D</div></div></div>"
   },
   {
    "cap": "Из A идём в B, из B сразу в D — пока есть глубина, не сворачиваем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node good\">A</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node good\">B</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node acc fp-pulse-a\">D</div><div class=\"fp-row\"><div class=\"fp-lane name\">stack</div><div class=\"fp-token\">A</div><div class=\"fp-token\">B</div><div class=\"fp-token\">D</div></div></div>"
   },
   {
    "cap": "D — тупик. Снимаем его со стека и пячемся назад к развилке B.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node good\">A</div><div class=\"fp-node good\">B</div><div class=\"fp-ver dead\">D</div><div class=\"fp-row\"><div class=\"fp-lane name\">stack</div><div class=\"fp-token\">A</div><div class=\"fp-token\">B</div></div><div class=\"fp-tag\">backtrack ←</div></div>"
   },
   {
    "cap": "У B соседей больше нет — откат ещё глубже, к A, и пробуем непройденного C.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node good\">A</div><div class=\"fp-arrow\">↓</div><div class=\"fp-node acc fp-pulse-a\">C</div><div class=\"fp-row\"><div class=\"fp-lane name\">stack</div><div class=\"fp-token\">A</div><div class=\"fp-token\">C</div></div></div>"
   },
   {
    "cap": "Стек растёт при нырке и сжимается при откате — в Java это и есть call stack рекурсии.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">dfs(A)</div><div class=\"fp-slot\">dfs(B)</div><div class=\"fp-slot fp-blink\">dfs(D)</div></div><div class=\"fp-tag bad\">глубоко → StackOverflowError</div></div>"
   },
   {
    "cap": "Итог: DFS обходит вглубь-с-откатом, база для циклов и топосорта, за O(V+E).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">вглубь до упора, потом откат</div><div class=\"fp-row\"><div class=\"fp-tag\">стек LIFO</div><div class=\"fp-tag\">O(V+E)</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-hash-collision",
  "t": "Algorithms",
  "g": "Хеш-таблицы",
  "title": "Хеш-коллизии и цепочки",
  "frames": [
   {
    "cap": "Ключ превращаем в число хешем, берём остаток по числу корзин — это индекс.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">\"cat\"</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">hash</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">% 4</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">3</div></div></div>"
   },
   {
    "cap": "Каждый ключ падает прямо в свою корзину — доступ за один шаг, O(1).",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell\">0</div><div class=\"fp-cell on\">1·cat</div><div class=\"fp-cell\">2</div><div class=\"fp-cell on\">3·dog</div></div><div class=\"fp-tag good\">прямое попадание</div></div>"
   },
   {
    "cap": "Беда: новый ключ \"owl\" дал тот же индекс 1, что и \"cat\" — коллизия.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">\"owl\"</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">% 4 = 1</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell\">0</div><div class=\"fp-cell bad fp-blink\">1·?</div><div class=\"fp-cell\">2</div><div class=\"fp-cell on\">3</div></div></div>"
   },
   {
    "cap": "Не перезаписываем — вешаем \"owl\" в цепочку к \"cat\" в той же корзине.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">bucket 1</div><div class=\"fp-token\">cat</div><div class=\"fp-conn\"></div><div class=\"fp-token\">owl</div></div><div class=\"fp-tag\">связный список</div></div>"
   },
   {
    "cap": "Если все ключи сольются в одну корзину — поиск идёт по списку, O(1) превращается в O(n).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">bucket 1</div><div class=\"fp-token\">a</div><div class=\"fp-token\">b</div><div class=\"fp-token\">c</div><div class=\"fp-token\">d</div><div class=\"fp-token bad fp-pulse-r\">e</div></div><div class=\"fp-tag bad\">деградация O(n)</div></div>"
   },
   {
    "cap": "Спасение: при load factor 0.75 таблица растёт и перехеширует — цепочки снова короткие.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-bar\"><span style=\"width:75%\"></span></div><div class=\"fp-tag\">0.75</div></div><div class=\"fp-arrow\">↓ resize</div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell on\">0</div><div class=\"fp-cell\">1</div><div class=\"fp-cell on\">2</div><div class=\"fp-cell\">3</div><div class=\"fp-cell on\">4</div><div class=\"fp-cell\">5</div><div class=\"fp-cell on\">6</div><div class=\"fp-cell\">7</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-dijkstra",
  "t": "Algorithms",
  "g": "Графы",
  "title": "Дейкстра — кратчайший путь",
  "frames": [
   {
    "cap": "Взвешенный граф: цифры на рёбрах — стоимость. Ищем кратчайший путь из A.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc\">A</div><div class=\"fp-tag\">2</div><div class=\"fp-node\">B</div></div><div class=\"fp-row\"><div class=\"fp-tag\">5</div><div class=\"fp-tag\">1</div></div><div class=\"fp-row\"><div class=\"fp-node\">C</div></div></div>"
   },
   {
    "cap": "Старт A=0, до остальных бесконечность — пока ничего не знаем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">A</div><div class=\"fp-val\">0</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">B</div><div class=\"fp-val\">∞</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">C</div><div class=\"fp-val\">∞</div></div></div>"
   },
   {
    "cap": "Берём ближайшую вершину A и релаксируем соседей: B=2, C=5.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node good\">A</div><div class=\"fp-row\"><div class=\"fp-lane name\">B</div><div class=\"fp-val acc fp-pulse-a\">2</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">C</div><div class=\"fp-val acc fp-pulse-a\">5</div></div></div>"
   },
   {
    "cap": "Очередь выдаёт минимум — B(2). Через B до C всего 2+1=3, это меньше 5: обновляем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-node good\">B</div><div class=\"fp-row\"><div class=\"fp-lane name\">C было</div><div class=\"fp-ver dead\">5</div><div class=\"fp-arrow\">→</div><div class=\"fp-val good fp-pulse-g\">3</div></div><div class=\"fp-tag\">релаксация 2+1</div></div>"
   },
   {
    "cap": "Закрытую вершину больше не трогаем — её число окончательно минимально.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">A</div><div class=\"fp-val good\">0</div><div class=\"fp-tag good\">закрыт</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">B</div><div class=\"fp-val good\">2</div><div class=\"fp-tag good\">закрыт</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">C</div><div class=\"fp-val good\">3</div><div class=\"fp-tag good\">закрыт</div></div></div>"
   },
   {
    "cap": "Итог: жадность по куче даёт кратчайшие пути, но отрицательное ребро её ломает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">кратчайшие пути из A</div><div class=\"fp-row\"><div class=\"fp-tag\">O((V+E)logV)</div><div class=\"fp-tag bad\">нет отриц. рёбер</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-sliding-window",
  "t": "Algorithms",
  "g": "Приёмы",
  "title": "Скользящее окно",
  "frames": [
   {
    "cap": "Задача: максимальная сумма подряд идущих 3 чисел. Наивно — пересчитывать каждое окно с нуля.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">2</div><div class=\"fp-box\">1</div><div class=\"fp-box\">5</div><div class=\"fp-box\">1</div><div class=\"fp-box\">3</div><div class=\"fp-box\">2</div></div><div class=\"fp-tag\">k = 3</div></div>"
   },
   {
    "cap": "Первое окно [2,1,5], считаем сумму один раз = 8.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">2</div><div class=\"fp-box acc\">1</div><div class=\"fp-box acc\">5</div><div class=\"fp-box mut\">1</div><div class=\"fp-box mut\">3</div><div class=\"fp-box mut\">2</div></div><div class=\"fp-val good fp-pulse-g\">сумма 8</div></div>"
   },
   {
    "cap": "Сдвигаем окно вправо: НЕ пересчитываем — вычли уехавшую 2, прибавили въехавшую 1.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">−2</div><div class=\"fp-box acc\">1</div><div class=\"fp-box acc\">5</div><div class=\"fp-box good\">+1</div><div class=\"fp-box mut\">3</div><div class=\"fp-box mut\">2</div></div><div class=\"fp-val acc fp-pulse-a\">8−2+1 = 7</div></div>"
   },
   {
    "cap": "Ещё сдвиг: уехала 1, въехала 3 — одно сложение и одно вычитание вместо трёх.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">2</div><div class=\"fp-box bad\">−1</div><div class=\"fp-box acc\">5</div><div class=\"fp-box acc\">1</div><div class=\"fp-box good\">+3</div><div class=\"fp-box mut\">2</div></div><div class=\"fp-val acc fp-pulse-a\">7−1+3 = 9</div></div>"
   },
   {
    "cap": "Окно едет по массиву как вагон — каждый шаг стоит O(1), а не O(k).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-travel\">[ окно ]</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">·</div><div class=\"fp-box mut\">·</div><div class=\"fp-box mut\">·</div><div class=\"fp-box mut\">·</div><div class=\"fp-box mut\">·</div><div class=\"fp-box mut\">·</div></div></div>"
   },
   {
    "cap": "Итог: один проход вместо вложенного перебора — O(n) вместо O(n·k).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">max = 9 за один проход</div><div class=\"fp-row\"><div class=\"fp-tag bad\">было O(n·k)</div><div class=\"fp-tag good\">стало O(n)</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-two-pointers",
  "t": "Algorithms",
  "g": "Приёмы",
  "title": "Два указателя",
  "frames": [
   {
    "cap": "Отсортированный массив, ищем пару с суммой 10. Наивно — перебрать все пары, O(n²).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">1</div><div class=\"fp-box\">3</div><div class=\"fp-box\">4</div><div class=\"fp-box\">6</div><div class=\"fp-box\">8</div><div class=\"fp-box\">9</div></div><div class=\"fp-tag\">target = 10</div></div>"
   },
   {
    "cap": "Ставим L на начало, R на конец и складываем края: 1+9=10.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">1</div><div class=\"fp-box\">3</div><div class=\"fp-box\">4</div><div class=\"fp-box\">6</div><div class=\"fp-box\">8</div><div class=\"fp-box acc fp-pulse-a\">9</div></div><div class=\"fp-row\"><div class=\"fp-tag\">L</div><div class=\"fp-tag\">R</div></div></div>"
   },
   {
    "cap": "Покажем принцип на другой цели: если сумма МАЛА — двигаем левый вправо, добираем больше.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">1</div><div class=\"fp-box acc fp-pulse-a\">3</div><div class=\"fp-box\">4</div><div class=\"fp-box\">6</div><div class=\"fp-box\">8</div><div class=\"fp-box acc\">9</div></div><div class=\"fp-tag\">сумма мала → L++</div></div>"
   },
   {
    "cap": "Если сумма ВЕЛИКА — двигаем правый влево, сбавляем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">1</div><div class=\"fp-box acc fp-pulse-a\">3</div><div class=\"fp-box\">4</div><div class=\"fp-box\">6</div><div class=\"fp-box acc fp-pulse-a\">8</div><div class=\"fp-box bad\">9</div></div><div class=\"fp-tag\">сумма велика → R--</div></div>"
   },
   {
    "cap": "Указатели идут навстречу — каждый шаг сдвигает ровно один из них, всего ≤ n движений.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag\">L →</div><div class=\"fp-box mut\">···</div><div class=\"fp-tag\">← R</div></div><div class=\"fp-conn\"></div><div class=\"fp-tag good\">встретятся в центре</div></div>"
   },
   {
    "cap": "Итог: за один проход нашли пару — O(n) вместо O(n²), но нужен отсортированный массив.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">пара 1 + 9 = 10</div><div class=\"fp-row\"><div class=\"fp-tag good\">O(n)</div><div class=\"fp-tag\">нужна сортировка</div></div></div>"
   }
  ]
 },
 {
  "id": "alf-lru-cache",
  "t": "Algorithms",
  "g": "Структуры данных",
  "title": "LRU-кэш за O(1)",
  "frames": [
   {
    "cap": "Кэш на 3 элемента: голова — самый свежий, хвост — кандидат на вылет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag good\">голова</div><div class=\"fp-token\">A</div><div class=\"fp-conn\"></div><div class=\"fp-token\">B</div><div class=\"fp-conn\"></div><div class=\"fp-token\">C</div><div class=\"fp-tag bad\">хвост</div></div></div>"
   },
   {
    "cap": "Две структуры вместе: HashMap находит узел за O(1), список двигает его за O(1).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">map</div><div class=\"fp-box\">A→•</div><div class=\"fp-box\">B→•</div><div class=\"fp-box\">C→•</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">list</div><div class=\"fp-token\">A</div><div class=\"fp-token\">B</div><div class=\"fp-token\">C</div></div></div>"
   },
   {
    "cap": "get(C): находим C через map, выдёргиваем из середины и переставляем в голову.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token acc fp-pulse-a\">C</div><div class=\"fp-arrow\">→</div><div class=\"fp-tag good\">в голову</div></div><div class=\"fp-row\"><div class=\"fp-token good\">C</div><div class=\"fp-conn\"></div><div class=\"fp-token\">A</div><div class=\"fp-conn\"></div><div class=\"fp-token\">B</div></div></div>"
   },
   {
    "cap": "put(D) при полном кэше: новый узел встаёт в голову.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token good fp-pulse-g\">D</div><div class=\"fp-conn\"></div><div class=\"fp-token\">C</div><div class=\"fp-conn\"></div><div class=\"fp-token\">A</div><div class=\"fp-conn\"></div><div class=\"fp-token bad\">B</div></div><div class=\"fp-tag\">размер 4 &gt; 3</div></div>"
   },
   {
    "cap": "Превышен лимит — выбрасываем хвост B (к нему давно не обращались) и из списка, и из map.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token good\">D</div><div class=\"fp-conn\"></div><div class=\"fp-token\">C</div><div class=\"fp-conn\"></div><div class=\"fp-token\">A</div><div class=\"fp-ver dead fp-blink\">B</div></div><div class=\"fp-tag bad\">эвикция LRU</div></div>"
   },
   {
    "cap": "Итог: и get, и put за O(1); в Java это LinkedHashMap(accessOrder=true) + removeEldestEntry.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">get / put = O(1)</div><div class=\"fp-row\"><div class=\"fp-tag\">HashMap</div><div class=\"fp-tag\">двусвязный список</div></div></div>"
   }
  ]
 },
 {
  "id": "apf-outbox",
  "t": "Архитектура",
  "g": "Надёжный обмен сообщениями",
  "title": "Transactional Outbox",
  "frames": [
   {
    "cap": "Сервису надо разом сохранить заказ в БД и отправить событие в Kafka — но это две разные системы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big\">Сервис</div></div><div class=\"fp-row\"><div class=\"fp-arrow\"></div><div class=\"fp-arrow\"></div></div><div class=\"fp-row\"><div class=\"fp-box acc\">БД</div><div class=\"fp-box acc\">Kafka</div></div></div>"
   },
   {
    "cap": "Запись в БД прошла, а сразу после процесс упал — событие в Kafka не ушло. Системы рассинхронились.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big bad fp-blink\">упал тут</div></div><div class=\"fp-row\"><div class=\"fp-box good\">БД: заказ</div><div class=\"fp-box bad\">Kafka: пусто</div></div></div>"
   },
   {
    "cap": "Идея: в ОДНОЙ транзакции БД пишем и заказ, и строку в таблицу outbox — атомарно, либо оба.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">ОДНА транзакция</div><div class=\"fp-row\"><div class=\"fp-box good\">orders: заказ</div><div class=\"fp-box good\">outbox: event</div></div><div class=\"fp-tag\">COMMIT — или откат обоих</div></div>"
   },
   {
    "cap": "Отдельный процесс-relay периодически читает новые строки outbox.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">outbox</div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">event</div></div><div class=\"fp-box big\">Relay (poller)</div></div>"
   },
   {
    "cap": "Relay публикует событие в Kafka и помечает строку как отправленную.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">Relay</div><div class=\"fp-arrow\"></div><div class=\"fp-box acc fp-pulse-g\">Kafka</div><div class=\"fp-tag\">outbox.sent = true</div></div>"
   },
   {
    "cap": "Итог: ни одно событие не теряется. Цена — at-least-once, поэтому потребитель обязан быть идемпотентным.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">БД</div><div class=\"fp-conn\"></div><div class=\"fp-box good\">Kafka</div></div><div class=\"fp-box big good\">всегда согласованы</div><div class=\"fp-tag\">consumer = идемпотентный</div></div>"
   }
  ]
 },
 {
  "id": "apf-circuit-breaker",
  "t": "Архитектура",
  "g": "Устойчивость",
  "title": "Circuit Breaker",
  "frames": [
   {
    "cap": "Сервис A зовёт B. B начал отвечать ошибками, но A упрямо шлёт каждый запрос и ждёт таймаута.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad fp-blink\">B (падает)</div></div><div class=\"fp-tag\">каждый вызов висит до таймаута</div></div>"
   },
   {
    "cap": "Состояние CLOSED: запросы проходят, breaker молча считает долю ошибок.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good\">CLOSED</div><div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-arrow\"></div><div class=\"fp-node\">CB</div><div class=\"fp-arrow\"></div><div class=\"fp-box\">B</div></div><div class=\"fp-bar\"><span style=\"width:30%\"></span></div></div>"
   },
   {
    "cap": "Ошибки перевалили порог — breaker размыкается в OPEN.",
    "html": "<div class=\"fp-col\"><div class=\"fp-bar\"><span style=\"width:85%\"></span></div><div class=\"fp-box big bad fp-pulse-r\">OPEN</div><div class=\"fp-tag\">порог ошибок превышен</div></div>"
   },
   {
    "cap": "В OPEN запросы отклоняются МГНОВЕННО — fail-fast. B перестают дёргать, он отдыхает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-node acc\">CB ✕</div><div class=\"fp-box mut\">B отдыхает</div></div><div class=\"fp-tag\">отказ за 1мс, без ожидания</div></div>"
   },
   {
    "cap": "Через таймаут — HALF-OPEN: пускаем один пробный запрос проверить, ожил ли B.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">HALF-OPEN</div><div class=\"fp-row\"><div class=\"fp-box\">A</div><div class=\"fp-token fp-travel\">проба</div><div class=\"fp-box\">B?</div></div></div>"
   },
   {
    "cap": "Проба успешна — возвращаемся в CLOSED. Провал — снова OPEN. Так цепь сама себя лечит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">CLOSED</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad\">OPEN</div><div class=\"fp-arrow\"></div><div class=\"fp-box acc\">HALF</div></div><div class=\"fp-tag\">цикл самовосстановления</div></div>"
   }
  ]
 },
 {
  "id": "apf-bulkhead",
  "t": "Архитектура",
  "g": "Устойчивость",
  "title": "Bulkhead (переборки)",
  "frames": [
   {
    "cap": "Сервис ходит в три downstream через ОДИН общий пул потоков.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">Общий пул потоков</div><div class=\"fp-row\"><div class=\"fp-box acc\">A</div><div class=\"fp-box acc\">B</div><div class=\"fp-box acc\">C</div></div></div>"
   },
   {
    "cap": "Downstream C затормозил. Потоки копятся на ожидании ответа от C.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">A ок</div><div class=\"fp-box\">B ок</div><div class=\"fp-box bad fp-blink\">C тормозит</div></div><div class=\"fp-bar bad\"><span style=\"width:90%\"></span></div></div>"
   },
   {
    "cap": "Пул выбран целиком на ожидании C. Здоровым A и B потоков не осталось — сервис лёг весь.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad fp-pulse-r\">пул забит ожиданием C</div><div class=\"fp-row\"><div class=\"fp-box bad\">A ждёт</div><div class=\"fp-box bad\">B ждёт</div></div></div>"
   },
   {
    "cap": "Bulkhead: разбиваем общий пул на отдельные отсеки — по пулу на каждый downstream.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">пул A</div><div class=\"fp-box acc\">пул B</div><div class=\"fp-box acc\">пул C</div></div><div class=\"fp-tag\">ресурсы изолированы</div></div>"
   },
   {
    "cap": "Теперь C топит только СВОЙ отсек. Пулы A и B нетронуты.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">пул A</div><div class=\"fp-box good\">пул B</div><div class=\"fp-box bad fp-pulse-r\">пул C полон</div></div></div>"
   },
   {
    "cap": "Итог: сбой локализован в одном отсеке, остальные функции сервиса живут.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good\">сервис жив</div><div class=\"fp-row\"><div class=\"fp-box good\">A работает</div><div class=\"fp-box good\">B работает</div><div class=\"fp-box mut\">C деградировал</div></div></div>"
   }
  ]
 },
 {
  "id": "apf-saga-orch",
  "t": "Архитектура",
  "g": "Распределённые транзакции",
  "title": "Сага-оркестрация и компенсации",
  "frames": [
   {
    "cap": "Заказ требует трёх шагов в трёх сервисах. Общей транзакции на все БД нет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Оплата</div><div class=\"fp-box acc\">Склад</div><div class=\"fp-box acc\">Доставка</div></div><div class=\"fp-tag\">3 БД, общего commit нет</div></div>"
   },
   {
    "cap": "Оркестратор по очереди командует шагами и помнит, где мы сейчас.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">Оркестратор</div><div class=\"fp-row\"><div class=\"fp-arrow\"></div></div><div class=\"fp-box good\">1. Оплата ✓</div></div>"
   },
   {
    "cap": "Шаг 2 прошёл, идём на третий — резерв на складе сделан.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">Оркестратор</div><div class=\"fp-row\"><div class=\"fp-box good\">1. Оплата ✓</div><div class=\"fp-box good\">2. Склад ✓</div><div class=\"fp-box acc fp-pulse-a\">3. Доставка…</div></div></div>"
   },
   {
    "cap": "Шаг 3 упал: нет курьеров. Сага не может завершиться вперёд.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">1 ✓</div><div class=\"fp-box good\">2 ✓</div><div class=\"fp-box bad fp-blink\">3 ✗</div></div></div>"
   },
   {
    "cap": "Оркестратор идёт НАЗАД и запускает компенсации в обратном порядке.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad\">компенсация</div><div class=\"fp-row\"><div class=\"fp-box mut\">снять резерв</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">вернуть деньги</div></div></div>"
   },
   {
    "cap": "Итог: система пришла в согласованное состояние без распределённой транзакции — через компенсации.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">Оплата: возврат</div><div class=\"fp-box good\">Склад: свободно</div></div><div class=\"fp-box big good\">консистентно</div></div>"
   }
  ]
 },
 {
  "id": "apf-event-sourcing",
  "t": "Архитектура",
  "g": "Данные и состояние",
  "title": "Event Sourcing",
  "frames": [
   {
    "cap": "Обычный подход: в БД лежит только текущий баланс, история перезаписана.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">account</div><div class=\"fp-row\"><div class=\"fp-token dead pr-fade\">100</div><div class=\"fp-arrow mut\">&rarr;</div><div class=\"fp-token dead pr-fade\" style=\"animation-delay:.3s\">300</div><div class=\"fp-arrow mut\">&rarr;</div><div class=\"fp-box good fp-pulse-g\">balance = 150</div></div><div class=\"fp-row\"><div class=\"fp-tag bad fp-blink\">UPDATE затёр историю</div><div class=\"fp-val mut\">как пришли — неизвестно</div></div></div>"
   },
   {
    "cap": "Event Sourcing: вместо цифры храним неизменяемую ленту событий.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot good pr-rise\">+100 открыт</div><div class=\"fp-slot good pr-rise\" style=\"animation-delay:.25s\">+200 пополнение</div><div class=\"fp-slot warn pr-rise\" style=\"animation-delay:.5s\">-150 покупка</div><div class=\"fp-slot mut fp-blink\">append &darr;</div></div><div class=\"fp-row\"><div class=\"fp-tag acc fp-pulse-a\">append-only журнал</div><div class=\"fp-val mut\">события неизменяемы</div></div></div>"
   },
   {
    "cap": "Текущее состояние получаем, прокатывая (replay) события слева направо.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">0</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-box pr-fade\" style=\"animation-delay:.2s\">100</div><div class=\"fp-conn fp-travel\" style=\"animation-delay:.2s\"></div><div class=\"fp-box pr-fade\" style=\"animation-delay:.4s\">300</div><div class=\"fp-conn fp-travel\" style=\"animation-delay:.4s\"></div><div class=\"fp-box good fp-pulse-g\">150</div></div><div class=\"fp-row\"><div class=\"fp-tag\">+100</div><div class=\"fp-tag\">+200</div><div class=\"fp-tag warn\">-150</div><div class=\"fp-tag acc\">replay &rarr;</div></div></div>"
   },
   {
    "cap": "Бонус: можно остановиться на любом событии и узнать состояние в прошлом.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot pr-fade\">+100</div><div class=\"fp-slot acc fp-pulse-a\">+200 &larr; стоп здесь = 300</div><div class=\"fp-slot dead\">-150 ещё не применяем</div></div><div class=\"fp-row\"><div class=\"fp-tag acc pr-glow\">time-travel</div><div class=\"fp-val mut\">состояние на любой момент</div></div></div>"
   },
   {
    "cap": "Длинную историю прокатывать дорого — периодически делаем снапшот и стартуем с него.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token dead pr-fade\">+100</div><div class=\"fp-token dead pr-fade\" style=\"animation-delay:.15s\">+200</div><div class=\"fp-token dead pr-fade\" style=\"animation-delay:.3s\">&middot;&middot;&middot;&times;1000</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box acc fp-pulse-a\">snapshot = 300</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">snapshot 300</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-box warn\">-150</div><div class=\"fp-conn fp-travel\" style=\"animation-delay:.3s\"></div><div class=\"fp-box good fp-pulse-g\">150</div></div><div class=\"fp-tag good\">replay только хвоста</div></div>"
   },
   {
    "cap": "Итог: журнал — источник правды, аудит и проекции бесплатны; платим за replay и эволюцию схемы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good pr-glow\">журнал = source of truth</div><div class=\"fp-row\"><div class=\"fp-tag good pr-rise\">+аудит</div><div class=\"fp-tag good pr-rise\" style=\"animation-delay:.2s\">+time-travel</div><div class=\"fp-tag good pr-rise\" style=\"animation-delay:.4s\">+проекции</div></div><div class=\"fp-row\"><div class=\"fp-tag bad pr-rise\" style=\"animation-delay:.6s\">−цена replay</div><div class=\"fp-tag bad pr-rise\" style=\"animation-delay:.8s\">−versioning схемы</div></div></div>"
   }
  ]
 },
 {
  "id": "apf-cqrs",
  "t": "Архитектура",
  "g": "Данные и состояние",
  "title": "CQRS: разделение чтения и записи",
  "frames": [
   {
    "cap": "Одна модель обслуживает и запись, и чтение — компромисс, неудобный обоим.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">запись</div><div class=\"fp-arrow\"></div><div class=\"fp-box big acc\">одна модель</div><div class=\"fp-arrow\"></div><div class=\"fp-box\">чтение</div></div></div>"
   },
   {
    "cap": "CQRS разрезает её надвое: отдельная модель на команды, отдельная — на запросы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Command model</div><div class=\"fp-box good\">Query model</div></div><div class=\"fp-tag\">два пути</div></div>"
   },
   {
    "cap": "Команда идёт в write-model: проверяет инварианты, меняет состояние.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box\">Command</div><div class=\"fp-arrow\"></div><div class=\"fp-box big acc\">Write-model (агрегат)</div><div class=\"fp-tag\">нормализована</div></div>"
   },
   {
    "cap": "Изменение публикует событие — оно обновляет read-model (проекцию).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">Write</div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">event</div></div><div class=\"fp-box big good\">Read-model (проекция)</div></div>"
   },
   {
    "cap": "Запросы бьют только в read-model: денормализована под экран, быстрые SELECT без джойнов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box\">Query</div><div class=\"fp-arrow\"></div><div class=\"fp-box big good fp-pulse-g\">Read-model</div><div class=\"fp-tag\">плоская, быстрая</div></div>"
   },
   {
    "cap": "Итог: каждая сторона масштабируется отдельно. Цена — лаг и eventual-консистентность read-model.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">write ↑масштаб</div><div class=\"fp-box good\">read ↑масштаб</div></div><div class=\"fp-tag\">read отстаёт на доли секунды</div></div>"
   }
  ]
 },
 {
  "id": "apf-token-bucket",
  "t": "Архитектура",
  "g": "Управление нагрузкой",
  "title": "Rate limiting: Token Bucket",
  "frames": [
   {
    "cap": "Нужно ограничить запросы к API, но не рубить честные всплески нагрузки.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">r</div><div class=\"fp-token\">r</div><div class=\"fp-token\">r</div></div><div class=\"fp-arrow\"></div><div class=\"fp-box big acc\">API</div></div>"
   },
   {
    "cap": "Заводим ведро: токены капают в него с постоянной скоростью r/сек.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token fp-float\">+1/сек</div><div class=\"fp-box big acc\">ведро (ёмкость N)</div><div class=\"fp-stack\"><div class=\"fp-slot good\">●</div><div class=\"fp-slot good\">●</div><div class=\"fp-slot good\">●</div></div></div>"
   },
   {
    "cap": "Пришёл запрос — забирает один токен из ведра и проходит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">запрос</div><div class=\"fp-token fp-travel\">●</div><div class=\"fp-box good\">прошёл</div></div><div class=\"fp-tag\">в ведре было 3 → стало 2</div></div>"
   },
   {
    "cap": "Накопленные токены позволяют пропустить всплеск — сразу пачку, до N штук.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">burst до N</div><div class=\"fp-row\"><div class=\"fp-box good\">●</div><div class=\"fp-box good\">●</div><div class=\"fp-box good\">●</div></div></div>"
   },
   {
    "cap": "Ведро опустело — токенов нет, лишние запросы отклоняются (429).",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad\">ведро пустое</div><div class=\"fp-row\"><div class=\"fp-box\">запрос</div><div class=\"fp-box bad fp-blink\">429</div></div></div>"
   },
   {
    "cap": "Итог: средний rate держит скорость долива, всплеск — ёмкость ведра. Leaky bucket же выдаёт строго ровный поток.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">Token: rate + burst</div><div class=\"fp-box mut\">Leaky: ровный поток</div></div></div>"
   }
  ]
 },
 {
  "id": "apf-strangler",
  "t": "Архитектура",
  "g": "Миграция легаси",
  "title": "Strangler Fig",
  "frames": [
   {
    "cap": "Есть большая легаси-система. Переписать всё разом и выкатить «взрывом» — слишком рискованно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad fp-pulse-r\">Легаси-монолит</div><div class=\"fp-row\"><div class=\"fp-box mut pr-fade\">A</div><div class=\"fp-box mut pr-fade\" style=\"animation-delay:.25s\">B</div><div class=\"fp-box mut pr-fade\" style=\"animation-delay:.5s\">C</div></div><div class=\"fp-row\"><div class=\"fp-tag warn pr-blink\">rewrite «взрывом»</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-tag bad\">риск &uarr;</div></div></div>"
   },
   {
    "cap": "Ставим фасад-прокси перед легаси: весь трафик теперь идёт через него.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">клиенты</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-box big acc pr-glow\">Фасад / прокси</div><div class=\"fp-conn fp-travel\" style=\"animation-delay:.5s\"></div><div class=\"fp-box mut\">Легаси (A B C)</div></div><div class=\"fp-tag pr-fade\">100% трафика идёт через одну точку</div></div>"
   },
   {
    "cap": "Переписываем ОДИН кусок A в новый сервис и переключаем на нём роут.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc pr-glow\">Фасад</div><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-arrow fp-pulse-g\">&darr;</div><div class=\"fp-box good fp-pulse-g\">new A</div><div class=\"fp-tag good pr-fade\">роут переключён</div></div><div class=\"fp-col\"><div class=\"fp-arrow mut\">&darr;</div><div class=\"fp-box mut\">Легаси B C</div><div class=\"fp-tag mut pr-fade\" style=\"animation-delay:.3s\">пока живёт</div></div></div></div>"
   },
   {
    "cap": "Дальше уезжает B. Легаси постепенно теряет нагрузку — фикус оплетает дерево.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc pr-glow\">Фасад</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">new A</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.4s\">new B</div><div class=\"fp-box mut pr-fade\">Легаси C</div></div><div class=\"fp-lane\"><span class=\"name\">трафик легаси</span><div class=\"fp-bar\"><span style=\"width:33%;background:var(--bad)\"></span></div><div class=\"fp-val\">&darr; 33%</div></div></div>"
   },
   {
    "cap": "Последний маршрут C переехал — на легаси не идёт ни одного запроса.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc pr-glow\">Фасад</div><div class=\"fp-row\"><div class=\"fp-box good pr-rise\">A</div><div class=\"fp-box good pr-rise\" style=\"animation-delay:.2s\">B</div><div class=\"fp-box good pr-rise\" style=\"animation-delay:.4s\">C</div></div><div class=\"fp-lane\"><span class=\"name\">трафик легаси</span><div class=\"fp-bar\"><span style=\"width:2%\"></span></div><div class=\"fp-val\">0 req/s</div></div><div class=\"fp-ver dead fp-blink\">Легаси: 0 трафика</div></div>"
   },
   {
    "cap": "Итог: легаси отключаем. Миграция шла без freeze, откат на каждом шаге — вернуть роут назад.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good pr-glow\">новая система</div><div class=\"fp-row\"><div class=\"fp-box dead pr-fade\">легаси &times;</div></div><div class=\"fp-row\"><div class=\"fp-tag good pr-fade\" style=\"animation-delay:.2s\">без freeze</div><div class=\"fp-tag acc pr-fade\" style=\"animation-delay:.4s\">откат = вернуть роут</div><div class=\"fp-tag pr-fade\" style=\"animation-delay:.6s\">риск размазан по шагам</div></div></div>"
   }
  ]
 },
 {
  "id": "apf-sharding",
  "t": "Архитектура",
  "g": "Масштабирование данных",
  "title": "Шардинг по ключу",
  "frames": [
   {
    "cap": "Один узел БД перестал тянуть объём и нагрузку — упёрлись в потолок.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big bad fp-pulse-r\">единственная БД</div><div class=\"fp-bar bad\"><span style=\"width:98%\"></span></div></div>"
   },
   {
    "cap": "Режем данные горизонтально на шарды: каждый узел держит свой кусок строк.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">шард 0</div><div class=\"fp-box acc\">шард 1</div><div class=\"fp-box acc\">шард 2</div></div></div>"
   },
   {
    "cap": "Выбираем shard key (user_id) и функцию: hash(key) % 3 = номер шарда.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box\">user_id=42</div><div class=\"fp-arrow\"></div><div class=\"fp-box acc\">hash % 3 = 0</div></div>"
   },
   {
    "cap": "Запрос по этому ключу едет сразу на свой шард — остальные не трогаются.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-travel\">42</div><div class=\"fp-box good fp-pulse-g\">шард 0</div><div class=\"fp-box mut\">шард 1</div><div class=\"fp-box mut\">шард 2</div></div></div>"
   },
   {
    "cap": "Грабли: запрос БЕЗ shard key не знает куда — бьёт веером по ВСЕМ шардам.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad\">where email=…</div><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">0</div><div class=\"fp-box bad fp-blink\">1</div><div class=\"fp-box bad fp-blink\">2</div></div><div class=\"fp-tag\">scatter-gather по всем</div></div>"
   },
   {
    "cap": "Итог: запросы по ключу масштабируются линейно. Цена — выбор ключа критичен, ребаланс болезнен (спасает consistent hashing).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">×N пропускная</div><div class=\"fp-box mut\">−кросс-шард запросы</div></div></div>"
   }
  ]
 },
 {
  "id": "apf-scatter-gather",
  "t": "Архитектура",
  "g": "Интеграция",
  "title": "Scatter-Gather",
  "frames": [
   {
    "cap": "Надо собрать лучшую цену из трёх поставщиков. Спрашивать по очереди — медленно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">агрегатор</div><div class=\"fp-row\"><div class=\"fp-box mut\">P1</div><div class=\"fp-box mut\">P2</div><div class=\"fp-box mut\">P3</div></div></div>"
   },
   {
    "cap": "Scatter: рассылаем один запрос всем троим ПАРАЛЛЕЛЬНО.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">scatter →</div><div class=\"fp-row\"><div class=\"fp-token fp-travel\">?</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.15s\">?</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.3s\">?</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">P1</div><div class=\"fp-box acc\">P2</div><div class=\"fp-box acc\">P3</div></div></div>"
   },
   {
    "cap": "Включаем общий таймер дедлайна: ждать самого медленного вечно нельзя.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc fp-spin\">таймаут 300мс</div><div class=\"fp-bar\"><span style=\"width:40%\"></span></div></div>"
   },
   {
    "cap": "P1 и P2 ответили вовремя, P3 завис и не уложился в дедлайн.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">P1 ✓</div><div class=\"fp-box good\">P2 ✓</div><div class=\"fp-box bad fp-blink\">P3 опоздал</div></div></div>"
   },
   {
    "cap": "Gather: опоздавшего отбрасываем, собираем пришедшие ответы и агрегируем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">P1</div><div class=\"fp-box good\">P2</div><div class=\"fp-arrow\"></div><div class=\"fp-box big acc\">min цена</div></div><div class=\"fp-ver dead\">P3 отброшен</div></div>"
   },
   {
    "cap": "Итог: общее время ≈ медленного В ПРЕДЕЛАХ таймаута, а не сумма. Решаем заранее: хватит ли частичного ответа.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good\">ответ за ≤ таймаут</div><div class=\"fp-tag\">частичный результат допустим</div></div>"
   }
  ]
 },
 {
  "id": "dof-container-vs-vm",
  "t": "DevOps",
  "g": "Архитектура",
  "title": "Контейнер vs виртуальная машина",
  "frames": [
   {
    "cap": "Задача: на одном сервере поднять три изолированных приложения, чтобы они не мешали друг другу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-float\">App A</div><div class=\"fp-box acc fp-float\" style=\"animation-delay:.5s\">App B</div><div class=\"fp-box acc fp-float\" style=\"animation-delay:1s\">App C</div></div><div class=\"fp-token fp-blink\" style=\"color:var(--warn);border-color:var(--warn)\">мешают друг другу: порты &middot; библиотеки &middot; ресурсы</div><div class=\"fp-arrow\">&darr;</div><div class=\"fp-tag\" style=\"color:var(--acc);border-color:var(--acc)\">нужна изоляция</div><div class=\"fp-box big fp-pulse-a\">1 физический сервер</div></div>"
   },
   {
    "cap": "Путь VM: гипервизор даёт каждому приложению СВОЮ полную гостевую ОС с собственным ядром — изоляция железная, но тяжёлая.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-tag\">VM 1</div><div class=\"fp-box acc\">App A</div><div class=\"fp-box bad fp-pulse-r\">Guest OS + ядро</div></div><div class=\"fp-col\"><div class=\"fp-tag\">VM 2</div><div class=\"fp-box acc\">App B</div><div class=\"fp-box bad fp-pulse-r\" style=\"animation-delay:.55s\">Guest OS + ядро</div></div><div class=\"fp-col\"><div class=\"fp-tag\">VM 3</div><div class=\"fp-box acc\">App C</div><div class=\"fp-box bad fp-pulse-r\" style=\"animation-delay:1.1s\">Guest OS + ядро</div></div></div><div class=\"fp-slot fp-pulse-a\">Гипервизор — нарезает железо на VM</div><div class=\"fp-box big\">Железо + хост-ядро</div><div class=\"fp-row\"><div class=\"fp-tag\" style=\"color:var(--good);border-color:var(--good)\">изоляция железная</div><div class=\"fp-tag fp-blink\" style=\"color:var(--bad);border-color:var(--bad)\">&times;3 полных ОС</div></div></div>"
   },
   {
    "cap": "Три копии целой ОС — это гигабайты на диске и минуты на старт каждой машины.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token pr-fade\" style=\"color:var(--bad);border-color:var(--bad)\">Guest OS &times;1</div><div class=\"fp-token pr-fade\" style=\"color:var(--bad);border-color:var(--bad);animation-delay:.8s\">Guest OS &times;2</div><div class=\"fp-token pr-fade\" style=\"color:var(--bad);border-color:var(--bad);animation-delay:1.6s\">Guest OS &times;3</div></div><div class=\"fp-lane\"><span class=\"name\">диск</span><div class=\"fp-bar\"><span style=\"width:90%\"></span></div><div class=\"fp-tag fp-blink\" style=\"color:var(--bad);border-color:var(--bad)\">~ГБ</div></div><div class=\"fp-lane\"><span class=\"name\">старт</span><div class=\"fp-bar\"><span style=\"width:85%\"></span></div><div class=\"fp-tag fp-blink\" style=\"color:var(--bad);border-color:var(--bad);animation-delay:.7s\">~минуты</div></div><div class=\"fp-row\"><div class=\"fp-token pr-fade\">BIOS</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token pr-fade\" style=\"animation-delay:.6s\">ядро</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token pr-fade\" style=\"animation-delay:1.2s\">init</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token pr-fade\" style=\"animation-delay:1.8s\">app</div></div></div>"
   },
   {
    "cap": "Путь контейнера: все приложения делят ОДНО ядро хоста, а изоляцию даёт само ядро через namespaces и cgroups.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">App A</div><div class=\"fp-arrow pr-fade\">&darr;</div></div><div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\" style=\"animation-delay:.55s\">App B</div><div class=\"fp-arrow pr-fade\" style=\"animation-delay:.55s\">&darr;</div></div><div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\" style=\"animation-delay:1.1s\">App C</div><div class=\"fp-arrow pr-fade\" style=\"animation-delay:1.1s\">&darr;</div></div></div><div class=\"fp-row\"><div class=\"fp-token\" style=\"color:var(--good);border-color:var(--good)\">namespaces = своя видимость</div><div class=\"fp-token\" style=\"color:var(--good);border-color:var(--good)\">cgroups = свои лимиты CPU/RAM</div></div><div class=\"fp-box big fp-pulse-g\">ОДНО общее ядро хоста</div><div class=\"fp-token mut\">гостевых ОС нет — границы рисует само ядро</div></div>"
   },
   {
    "cap": "Без гостевой ОС внутри контейнер весит мегабайты и стартует за секунды.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">диск</span><div class=\"fp-bar\"><span style=\"width:12%\"></span></div><div class=\"fp-tag\" style=\"color:var(--good);border-color:var(--good)\">~МБ</div></div><div class=\"fp-lane\"><span class=\"name\">старт</span><div class=\"fp-bar\"><span style=\"width:8%\"></span></div><div class=\"fp-tag\" style=\"color:var(--good);border-color:var(--good)\">~секунды</div></div><div class=\"fp-row\"><div class=\"fp-slot\">docker run</div><div class=\"fp-token pr-flow\" style=\"color:var(--good);border-color:var(--good)\">CT</div><div class=\"fp-slot\" style=\"color:var(--good);border-color:var(--good)\">работает</div></div><div class=\"fp-token mut fp-blink\">внутри только app + библиотеки, без своей ОС</div></div>"
   },
   {
    "cap": "Итог: VM изолирует целым вторым ядром (надёжно, тяжело), контейнер — границами в общем ядре (быстро, легче). В проде их часто складывают вместе.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">VM: своё ядро</div><div class=\"fp-row\"><div class=\"fp-tag\" style=\"color:var(--bad);border-color:var(--bad)\">тяжело</div><div class=\"fp-tag\" style=\"color:var(--good);border-color:var(--good)\">надёжно</div></div></div><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.85s\">CT: общее ядро</div><div class=\"fp-row\"><div class=\"fp-tag\" style=\"color:var(--good);border-color:var(--good)\">легко</div><div class=\"fp-tag\" style=\"color:var(--good);border-color:var(--good)\">быстро</div></div></div></div><div class=\"fp-arrow\">&darr;</div><div class=\"fp-tag fp-blink\" style=\"color:var(--acc);border-color:var(--acc)\">комбо в проде</div><div class=\"fp-col\" style=\"border:1.5px solid var(--bad);border-radius:14px;padding:12px 18px;gap:8px\"><div class=\"fp-tag\" style=\"color:var(--bad);border-color:var(--bad)\">VM (своё ядро)</div><div class=\"fp-row\"><div class=\"fp-token fp-pulse-g\" style=\"color:var(--good);border-color:var(--good)\">CT A</div><div class=\"fp-token fp-pulse-g\" style=\"color:var(--good);border-color:var(--good);animation-delay:.45s\">CT B</div><div class=\"fp-token fp-pulse-g\" style=\"color:var(--good);border-color:var(--good);animation-delay:.9s\">CT C</div></div></div></div>"
   }
  ]
 },
 {
  "id": "dof-k8s-pod-deploy-svc",
  "t": "DevOps",
  "g": "Архитектура",
  "title": "Kubernetes: Pod, Deployment, Service",
  "frames": [
   {
    "cap": "Pod — наименьшая единица: контейнер(ы) с одним общим IP. Но Pod смертен — упал, и его IP исчез навсегда.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big\">Pod<div class=\"fp-tag\">IP 10.0.0.7</div></div><div class=\"fp-arrow\">падает</div><div class=\"fp-box bad\">Pod мёртв, IP 10.0.0.7 пропал</div></div>"
   },
   {
    "cap": "Чтобы не следить за этим руками, заводим Deployment: декларация «хочу ровно 3 реплики этого Pod».",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">Deployment: replicas = 3</div><div class=\"fp-arrow\">создаёт</div><div class=\"fp-row\"><div class=\"fp-box acc\">Pod</div><div class=\"fp-box acc\">Pod</div><div class=\"fp-box acc\">Pod</div></div></div>"
   },
   {
    "cap": "Контроллер постоянно сравнивает желаемое с фактическим. Упал один под — он сам поднимает новый. Это self-healing.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big\">Желаю: 3 | Вижу: 2</div><div class=\"fp-row\"><div class=\"fp-box acc\">Pod</div><div class=\"fp-box bad\">упал</div><div class=\"fp-box acc\">Pod</div></div><div class=\"fp-arrow\">контроллер чинит разницу</div><div class=\"fp-row\"><div class=\"fp-box acc\">Pod</div><div class=\"fp-box good fp-pulse-g\">Pod (новый)</div><div class=\"fp-box acc\">Pod</div></div></div>"
   },
   {
    "cap": "Но новый под получил ДРУГОЙ IP. Если клиент ходил на старый IP напрямую — он теперь стучится в пустоту.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">Клиент помнит IP 10.0.0.7</div><div class=\"fp-arrow\">а под теперь 10.0.0.9</div><div class=\"fp-box bad\">connection refused</div></div>"
   },
   {
    "cap": "Решение — Service: один стабильный virtual IP и DNS-имя, за которым по label-селектору прячутся живые поды.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good\">Service (стабильный VIP + DNS)</div><div class=\"fp-arrow\">selector: app=web</div><div class=\"fp-row\"><div class=\"fp-box acc\">Pod</div><div class=\"fp-box acc\">Pod</div><div class=\"fp-box acc\">Pod</div></div></div>"
   },
   {
    "cap": "Итог: клиент всегда зовёт неизменный Service, тот балансирует на живые поды. Поды переезжают и мрут — клиент не замечает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">Клиент</div><div class=\"fp-arrow\">всегда → Service</div><div class=\"fp-box good big\">Service (адрес не меняется)</div><div class=\"fp-row\"><div class=\"fp-box acc\">Pod</div><div class=\"fp-box bad\">упал</div><div class=\"fp-box good fp-pulse-g\">Pod новый</div></div></div>"
   }
  ]
 },
 {
  "id": "dof-docker-layer-cache",
  "t": "DevOps",
  "g": "CI/CD и деплой",
  "title": "Кэш слоёв Docker: порядок в Dockerfile",
  "frames": [
   {
    "cap": "Образ — это стопка слоёв, по слою на инструкцию Dockerfile. Docker кэширует каждый слой.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">FROM jdk</div><div class=\"fp-slot\">COPY pom.xml</div><div class=\"fp-slot\">RUN download deps</div><div class=\"fp-slot\">COPY src</div><div class=\"fp-slot\">RUN build</div></div></div>"
   },
   {
    "cap": "Антипаттерн: копируем ВЕСЬ проект первой строкой, а тяжёлую загрузку зависимостей ставим после неё.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">FROM jdk</div><div class=\"fp-slot bad\">COPY . . (весь проект)</div><div class=\"fp-slot\">RUN download deps (долго)</div><div class=\"fp-slot\">RUN build</div></div></div>"
   },
   {
    "cap": "Меняем одну строку кода. Это меняет вход слоя COPY . . — и кэш этого слоя инвалидируется.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">правка одной строки в src</div><div class=\"fp-arrow\">меняет вход слоя</div><div class=\"fp-stack\"><div class=\"fp-slot good\">FROM (кэш)</div><div class=\"fp-slot bad fp-blink\">COPY . . — изменился</div></div></div>"
   },
   {
    "cap": "Каскад: всё ниже изменённого слоя пересобирается. Значит тяжёлая загрузка зависимостей качается ЗАНОВО на каждый коммит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot good\">FROM (кэш)</div><div class=\"fp-slot bad\">COPY . . — changed</div><div class=\"fp-slot bad fp-pulse-r\">download deps — ЗАНОВО</div><div class=\"fp-slot bad\">build — заново</div></div><div class=\"fp-tag bad\">каждый билд медленный</div></div>"
   },
   {
    "cap": "Фикс: сначала COPY только pom.xml и скачать зависимости (редко меняется), и лишь ПОТОМ COPY src.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">FROM jdk</div><div class=\"fp-slot good\">COPY pom.xml</div><div class=\"fp-slot good\">RUN download deps</div><div class=\"fp-slot acc\">COPY src</div><div class=\"fp-slot acc\">RUN build</div></div></div>"
   },
   {
    "cap": "Теперь правка кода трогает только верхние слои. Зависимости остаются в кэше — билд быстрый.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box mut\">правка в src</div><div class=\"fp-stack\"><div class=\"fp-slot good\">FROM (кэш)</div><div class=\"fp-slot good\">COPY pom.xml (кэш)</div><div class=\"fp-slot good fp-pulse-g\">deps (КЭШ, не качаем)</div><div class=\"fp-slot acc\">COPY src — только это</div><div class=\"fp-slot acc\">build</div></div></div>"
   }
  ]
 },
 {
  "id": "dof-prometheus-pull",
  "t": "DevOps",
  "g": "CI/CD и деплой",
  "title": "Prometheus: pull, а не push",
  "frames": [
   {
    "cap": "Push-модель: каждый сервис сам шлёт метрики в коллектор. При тысячах сервисов коллектор легко завалить.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">svc</div><div class=\"fp-node acc fp-pulse-a\" style=\"animation-delay:.15s\">svc</div><div class=\"fp-node acc fp-pulse-a\" style=\"animation-delay:.3s\">svc</div><div class=\"fp-node acc fp-pulse-a\" style=\"animation-delay:.45s\">svc</div><div class=\"fp-node acc fp-pulse-a\" style=\"animation-delay:.6s\">svc</div></div><div class=\"fp-row\"><div class=\"fp-token warn pr-flow\">push &darr;</div><div class=\"fp-token warn pr-flow\" style=\"animation-delay:.2s\">push &darr;</div><div class=\"fp-token warn pr-flow\" style=\"animation-delay:.4s\">push &darr;</div><div class=\"fp-token warn pr-flow\" style=\"animation-delay:.6s\">push &darr;</div><div class=\"fp-token warn pr-flow\" style=\"animation-delay:.8s\">push &darr;</div></div><div class=\"fp-box bad big fp-pulse-r\">Коллектор перегружен</div><div class=\"fp-tag mut\">тысячи сервисов &times; push = шквал в одну точку</div></div>"
   },
   {
    "cap": "Pull-модель Prometheus: сервис просто держит endpoint /metrics с текущими значениями и никуда сам ничего не шлёт.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big pr-glow\">Сервис</div><div class=\"fp-box good fp-pulse-g\">GET /metrics &rarr; текущие значения</div><div class=\"fp-row\"><div class=\"fp-val good pr-fade\">requests_total 1024</div><div class=\"fp-val good pr-fade\" style=\"animation-delay:.3s\">heap_bytes 512M</div><div class=\"fp-val good pr-fade\" style=\"animation-delay:.6s\">latency_ms 12</div></div><div class=\"fp-row\"><div class=\"fp-tag dead\">push &times;</div><div class=\"fp-tag mut\">сам никуда не шлёт — просто отвечает</div></div></div>"
   },
   {
    "cap": "Prometheus по списку targets сам ходит и забирает (scrape) метрики раз в N секунд.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc pr-glow\">Prometheus</div><div class=\"fp-arrow fp-travel\">scrape каждые 15s &darr;</div><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token acc pr-flow\">GET</div><div class=\"fp-box acc fp-pulse-a\">/metrics</div></div><div class=\"fp-col\"><div class=\"fp-token acc pr-flow\" style=\"animation-delay:.3s\">GET</div><div class=\"fp-box acc fp-pulse-a\" style=\"animation-delay:.3s\">/metrics</div></div><div class=\"fp-col\"><div class=\"fp-token acc pr-flow\" style=\"animation-delay:.6s\">GET</div><div class=\"fp-box acc fp-pulse-a\" style=\"animation-delay:.6s\">/metrics</div></div></div><div class=\"fp-tag mut\">сам обходит список targets раз в N секунд</div></div>"
   },
   {
    "cap": "Бонус: сам факт успешного опроса даёт метрику up. Кабинет пуст — Prometheus сразу видит up=0.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc pr-pulse\">Prometheus</div><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-arrow fp-travel\">scrape &darr;</div><div class=\"fp-node good fp-pulse-g\">scrape ok</div><div class=\"fp-val good\">up = 1</div></div><div class=\"fp-col\"><div class=\"fp-arrow fp-travel\" style=\"animation-delay:.5s\">scrape &darr;</div><div class=\"fp-node dead pr-fade\">кабинет пуст</div><div class=\"fp-val bad fp-blink\">up = 0</div></div></div><div class=\"fp-tag mut\">сам факт опроса = бесплатный health-check</div></div>"
   },
   {
    "cap": "Проблема: короткоживущий cron-job может умереть РАНЬШЕ, чем Prometheus придёт его опросить. Метрика теряется.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">job</span><div class=\"fp-token acc pr-rise\">старт</div><div class=\"fp-token good fp-pulse-g\" style=\"animation-delay:.4s\">отработал 2s</div><div class=\"fp-token dead pr-fade\" style=\"animation-delay:.8s\">умер &times;</div></div><div class=\"fp-lane\"><span class=\"name\">prometheus</span><div class=\"fp-token mut\">ждёт интервал&hellip;</div><div class=\"fp-token warn fp-travel\" style=\"animation-delay:1.2s\">scrape через 15s &rarr;</div></div><div class=\"fp-box bad fp-blink\">пришёл — endpoint мёртв, метрик нет</div><div class=\"fp-tag bad\">результат job потерян</div></div>"
   },
   {
    "cap": "Решение — Pushgateway: job пушит метрику туда перед смертью, а Prometheus привычно пуллит её оттуда. Мостик push→pull.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc pr-fade\">batch job</div><div class=\"fp-tag mut\">умирает</div></div><div class=\"fp-col\"><div class=\"fp-arrow fp-travel\">push &rarr;</div><div class=\"fp-tag warn\">перед смертью</div></div><div class=\"fp-col\"><div class=\"fp-box good big pr-glow\">Pushgateway</div><div class=\"fp-token warn pr-bob\">метрика хранится</div></div><div class=\"fp-col\"><div class=\"fp-arrow fp-travel\" style=\"animation-delay:1s\">scrape &rarr;</div><div class=\"fp-tag mut\">привычный pull</div></div><div class=\"fp-box big acc pr-pulse\">Prometheus</div></div><div class=\"fp-tag good\">мостик push &rarr; pull</div></div>"
   }
  ]
 },
 {
  "id": "dof-graceful-shutdown",
  "t": "DevOps",
  "g": "CI/CD и деплой",
  "title": "Graceful shutdown пода: SIGTERM, preStop, SIGKILL",
  "frames": [
   {
    "cap": "Под работает и обслуживает живые запросы. Приходит команда его удалить — например, при rolling update.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc pr-bob\">клиенты</div><div class=\"fp-conn\"></div><div class=\"fp-token acc fp-travel\">req</div><div class=\"fp-conn\"></div><div class=\"fp-box acc big fp-pulse-a\">Pod</div></div><div class=\"fp-tag\" style=\"color:var(--good);border-color:var(--good)\">обрабатывает живые запросы</div><div class=\"fp-arrow pr-fade\">&darr;</div><div class=\"fp-box fp-pulse-r\" style=\"color:var(--warn);border-color:var(--warn)\">kubectl delete / rolling update</div><div class=\"fp-token pr-blink\" style=\"color:var(--mut)\">старт завершения...</div></div>"
   },
   {
    "cap": "Шаг 1: под убирают из endpoints Service — он перестаёт получать НОВЫЙ трафик. Но старые запросы ещё в полёте.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc big fp-pulse-a\">Service</div><div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-conn\"></div><div class=\"fp-token acc fp-travel\">req</div><div class=\"fp-box good fp-pulse-g\">Pod</div></div><div class=\"fp-row\"><div class=\"fp-conn\"></div><div class=\"fp-token acc fp-travel\" style=\"animation-delay:.9s\">req</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.9s\">Pod</div></div><div class=\"fp-row\"><div class=\"fp-ver dead\">endpoint</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">&times;</div><div class=\"fp-box bad fp-pulse-r\">Pod (убран)</div></div></div></div><div class=\"fp-row\"><div class=\"fp-tag\">новый трафик сюда больше не идёт</div><div class=\"fp-token pr-fade\" style=\"color:var(--warn);border-color:var(--warn)\">старые запросы ещё в полёте</div></div></div>"
   },
   {
    "cap": "Шаг 2: выполняется preStop hook (если задан) — обычно короткий sleep, чтобы балансировщик реально успел перестать слать трафик.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc big fp-pulse-a\"><span class=\"fp-spin\">&#8987;</span> preStop: sleep 5s</div><div class=\"fp-lane\"><span class=\"name\">LB догоняет</span><div class=\"fp-token acc pr-fade\">req</div><div class=\"fp-token acc pr-fade\" style=\"animation-delay:.5s\">req</div><div class=\"fp-ver dead\">req</div><div class=\"fp-ver dead\">req</div></div><div class=\"fp-arrow fp-blink\">&darr;</div><div class=\"fp-box good big fp-pulse-g\">трафик действительно остановлен</div></div>"
   },
   {
    "cap": "Шаг 3: контейнеру шлют SIGTERM — «доделай текущие запросы и завершись». Приложение ОБЯЗАНО его поймать.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-travel\" style=\"color:var(--warn);border-color:var(--warn)\">SIGTERM</div><div class=\"fp-conn\"></div><div class=\"fp-box acc big fp-pulse-a\">App</div></div><div class=\"fp-stack\"><div class=\"fp-slot pr-fade\" style=\"color:var(--good)\">&rarr; дослать текущие ответы</div><div class=\"fp-slot pr-fade\" style=\"color:var(--good);animation-delay:.6s\">&rarr; закрыть соединения с БД</div><div class=\"fp-slot pr-fade\" style=\"color:var(--bad);animation-delay:1.2s\">&times; не принимать новое</div></div><div class=\"fp-tag fp-pulse-g\" style=\"color:var(--good);border-color:var(--good)\">корректное завершение</div></div>"
   },
   {
    "cap": "Тикает terminationGracePeriodSeconds (по умолчанию 30s). Успел завершиться внутри окна — отлично, ни один запрос не порван.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">grace 30s</span><div class=\"fp-bar\"><span style=\"width:60%\"></span></div><div class=\"fp-val pr-scale\">18s</div></div><div class=\"fp-row\"><div class=\"fp-cell good pr-fade\"></div><div class=\"fp-cell good pr-fade\" style=\"animation-delay:.3s\"></div><div class=\"fp-cell good pr-fade\" style=\"animation-delay:.6s\"></div><div class=\"fp-cell good pr-fade\" style=\"animation-delay:.9s\"></div><div class=\"fp-tag\">in-flight запросы досланы</div></div><div class=\"fp-arrow fp-blink\">&darr;</div><div class=\"fp-box good big fp-pulse-g\">App завершился сам &rarr; exit 0</div></div>"
   },
   {
    "cap": "Если приложение НЕ слушает SIGTERM или зависло — по истечении окна прилетает SIGKILL, процесс убивают мгновенно, недоделанные запросы рвутся (5xx).",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">grace истёк</span><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-val fp-blink\">0s</div></div><div class=\"fp-row\"><div class=\"fp-token fp-travel\" style=\"color:var(--bad);border-color:var(--bad)\">SIGKILL</div><div class=\"fp-conn\"></div><div class=\"fp-box bad big fp-pulse-r\">процесс убит мгновенно</div></div><div class=\"fp-row\"><div class=\"fp-ver dead\">req A</div><div class=\"fp-ver dead\">req B</div><div class=\"fp-arrow\" style=\"color:var(--bad)\">&rarr;</div><div class=\"fp-token pr-blink\" style=\"color:var(--bad);border-color:var(--bad)\">5xx</div><div class=\"fp-token pr-blink\" style=\"color:var(--bad);border-color:var(--bad);animation-delay:.4s\">5xx</div><div class=\"fp-token pr-blink\" style=\"color:var(--bad);border-color:var(--bad);animation-delay:.8s\">5xx</div></div></div>"
   }
  ]
 },
 {
  "id": "dsf-observer",
  "t": "Design",
  "g": "Паттерны",
  "title": "Observer",
  "frames": [
   {
    "cap": "Проблема: данные изменились, и три разных места должны узнать — но субъект не должен зависеть от каждого из них.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">Заказ изменился</div><div class=\"fp-arrow\">?</div><div class=\"fp-row\"><div class=\"fp-box mut\">Email</div><div class=\"fp-box mut\">Лог</div><div class=\"fp-box mut\">UI</div></div></div>"
   },
   {
    "cap": "Решение: вводим интерфейс Observer. Все реагирующие реализуют один update().",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">Observer.update()</div><div class=\"fp-arrow\">↑</div><div class=\"fp-row\"><div class=\"fp-box good\">Email</div><div class=\"fp-box good\">Лог</div><div class=\"fp-box good\">UI</div></div></div>"
   },
   {
    "cap": "Подписка: каждый зовёт subscribe(), субъект складывает их в список — поимённо не зная классов.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\">Subject<br>список: [ ]</div><div class=\"fp-arrow\">←</div><div class=\"fp-col\"><div class=\"fp-token\">subscribe Email</div><div class=\"fp-token\">subscribe Лог</div><div class=\"fp-token\">subscribe UI</div></div></div>"
   },
   {
    "cap": "Событие: состояние поменялось — субъект проходит по списку и шлёт update() каждому.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc fp-pulse-a\">Subject<br>changed!</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">Email ✓</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.3s\">Лог ✓</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.6s\">UI ✓</div></div></div>"
   },
   {
    "cap": "Расширение: добавили SMS — просто subscribe(). Код субъекта не изменился ни на строку (OCP).",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\">Subject<br>(не тронут)</div><div class=\"fp-arrow\">←</div><div class=\"fp-box good fp-float\">+ subscribe SMS</div></div>"
   },
   {
    "cap": "Итог: один-ко-многим без жёсткой связи. Субъект знает лишь интерфейс — слушателей добавляй и убирай на лету.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good\">Subject → интерфейс Observer</div><div class=\"fp-arrow\">↓</div><div class=\"fp-row\"><div class=\"fp-tag\">Email</div><div class=\"fp-tag\">Лог</div><div class=\"fp-tag\">UI</div><div class=\"fp-tag\">SMS</div></div></div>"
   }
  ]
 },
 {
  "id": "dsf-decorator",
  "t": "Design",
  "g": "Паттерны",
  "title": "Decorator",
  "frames": [
   {
    "cap": "Проблема: нужны комбинации фич (буфер, сжатие, шифр). Наследованием это N×M классов — комбинаторный взрыв.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-ver dead\">BufStream</div><div class=\"fp-ver dead\">GzipStream</div></div><div class=\"fp-row\"><div class=\"fp-ver dead\">BufGzip</div><div class=\"fp-ver dead\">GzipEncr</div><div class=\"fp-ver dead\">BufGzipEncr…</div></div></div>"
   },
   {
    "cap": "Идея: базовый объект и декоратор реализуют ОДИН интерфейс Stream. Декоратор держит ссылку на вложенный.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">interface Stream.write()</div><div class=\"fp-arrow\">↑</div><div class=\"fp-row\"><div class=\"fp-box good\">FileStream</div><div class=\"fp-box mut\">Decorator → inner</div></div></div>"
   },
   {
    "cap": "Сборка: оборачиваем ядро слоями. Снаружи это всё ещё Stream — клиент не видит разницы.",
    "html": "<div class=\"fp-stack\"><div class=\"fp-slot acc\">Encrypt</div><div class=\"fp-slot acc\">Gzip</div><div class=\"fp-slot acc\">Buffer</div><div class=\"fp-slot good\">FileStream (ядро)</div></div>"
   },
   {
    "cap": "Вызов write() идёт сквозь слои: каждый делает своё «до», передаёт ниже — до ядра.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">write()</div><div class=\"fp-arrow fp-travel\">↓ Encrypt</div><div class=\"fp-arrow\">↓ Gzip</div><div class=\"fp-arrow\">↓ Buffer</div><div class=\"fp-box good\">→ диск</div></div>"
   },
   {
    "cap": "Гибкость: меняем порядок или убираем слой в рантайме. Никаких новых классов — просто другая сборка обёрток.",
    "html": "<div class=\"fp-row\"><div class=\"fp-stack\"><div class=\"fp-slot acc\">Gzip</div><div class=\"fp-slot good\">File</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-stack\"><div class=\"fp-slot acc\">Buffer</div><div class=\"fp-slot acc\">Gzip</div><div class=\"fp-slot good\">File</div></div></div>"
   },
   {
    "cap": "Итог: поведение собирается слоями динамически вместо застывшей иерархии подклассов. Так и устроен java.io.",
    "html": "<div class=\"fp-box big good\">new Buffered(new Gzip(new FileStream(f)))</div>"
   }
  ]
 },
 {
  "id": "dsf-state",
  "t": "Design",
  "g": "Паттерны",
  "title": "State",
  "frames": [
   {
    "cap": "Боль: статус заказа размазан по if/switch в каждом методе. Новый статус — правки в десятке мест.",
    "html": "<div class=\"fp-box big bad fp-pulse-r\">if NEW … else if PAID … else if SHIPPED …<br>(в pay(), ship(), cancel() — везде)</div>"
   },
   {
    "cap": "Идея: каждое состояние — свой класс с одним интерфейсом State. Поведение живёт ВНУТРИ состояния.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">interface State: pay() ship() cancel()</div><div class=\"fp-arrow\">↑</div><div class=\"fp-row\"><div class=\"fp-box good\">New</div><div class=\"fp-box good\">Paid</div><div class=\"fp-box good\">Shipped</div></div></div>"
   },
   {
    "cap": "Контекст (Order) держит ссылку на текущий State и делегирует ему вызов — сам не ветвится.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big mut\">Order.pay()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">state.pay()</div></div>"
   },
   {
    "cap": "Переход: New.pay() сам выполняет логику и подменяет состояние контекста на Paid.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-a\">New</div><div class=\"fp-arrow fp-travel\">— pay() →</div><div class=\"fp-node fp-pulse-g\">Paid</div></div>"
   },
   {
    "cap": "Машина состояний: переходы явные и проверяемые. Из Shipped уже не вызвать pay() — это другое состояние.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">New</div><div class=\"fp-conn\">→</div><div class=\"fp-node acc\">Paid</div><div class=\"fp-conn\">→</div><div class=\"fp-node good\">Shipped</div><div class=\"fp-conn\">→</div><div class=\"fp-node bad\">Cancelled</div></div>"
   },
   {
    "cap": "Итог: новое состояние = новый класс, а не правка switch'ей. Логика переходов собрана и видна как карта.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">+ Refunded (новый класс)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good\">остальное не тронуто</div></div>"
   }
  ]
 },
 {
  "id": "dsf-aggregate-by-id",
  "t": "Design",
  "g": "Паттерны",
  "title": "Аггрегат по ID",
  "frames": [
   {
    "cap": "Соблазн: Order держит ссылку на живой объект Client. Удобно — order.getClient().getName().",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\">Order</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big mut\">Client (весь объект)</div></div>"
   },
   {
    "cap": "Беда: меняя заказ, я случайно правлю и клиента — одна транзакция трогает ДВА аггрегата сразу.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">tx: order.save()</div><div class=\"fp-arrow\">+</div><div class=\"fp-box bad fp-pulse-r\">client.name=…</div></div>"
   },
   {
    "cap": "Два замка в одной транзакции = конфликты и дедлоки под нагрузкой. Границы согласованности слиплись.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">🔒 Order</div><div class=\"fp-box bad fp-blink\">🔒 Client</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">deadlock</div></div>"
   },
   {
    "cap": "Лечение: Order хранит только clientId — голый идентификатор, а не объект.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big good\">Order<br>clientId = 42</div><div class=\"fp-conn\">- - -</div><div class=\"fp-box mut\">Client #42</div></div>"
   },
   {
    "cap": "Теперь каждая транзакция запирает РОВНО один аггрегат. Заказы и клиенты не мешают друг другу.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">🔒 Order (tx A)</div><div class=\"fp-box good fp-pulse-g\">🔒 Client (tx B)</div></div>"
   },
   {
    "cap": "Между аггрегатами — согласованность через события, а не один гигантский коммит. Границы целы.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">Order saved</div><div class=\"fp-arrow fp-travel\">— event →</div><div class=\"fp-box acc\">Client реагирует</div></div>"
   }
  ]
 },
 {
  "id": "gitf-three-areas",
  "t": "Git",
  "g": "Git",
  "title": "Три зоны и staging",
  "frames": [
   {
    "cap": "Файл живёт сразу в трёх состояниях: на диске, в index и в последнем коммите.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">Working</div><div class=\"fp-lane name\">Index</div><div class=\"fp-lane name\">Repo</div></div><div class=\"fp-row\"><div class=\"fp-box\">file v1</div><div class=\"fp-box\">file v1</div><div class=\"fp-box\">file v1</div></div>"
   },
   {
    "cap": "Ты редактируешь файл — меняется только рабочая папка, index и коммит ещё старые.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">file v2</div><div class=\"fp-box mut\">file v1</div><div class=\"fp-box mut\">file v1</div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">not staged</div></div>"
   },
   {
    "cap": "git add копирует текущую версию в index — это и есть «подготовка к коммиту».",
    "html": "<div class=\"fp-row\"><div class=\"fp-box\">file v2</div><div class=\"fp-arrow fp-pulse-g\">add →</div><div class=\"fp-box good fp-pulse-g\">file v2</div><div class=\"fp-box mut\">file v1</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">staged</div></div>"
   },
   {
    "cap": "Правишь файл СНОВА после add — в index всё ещё v2, на диске уже v3.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">file v3</div><div class=\"fp-box good\">file v2</div><div class=\"fp-box mut\">file v1</div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">not staged</div><div class=\"fp-tag good\">staged</div></div>"
   },
   {
    "cap": "git commit замораживает то, что в index (v2). Свежая v3 осталась за бортом.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">file v3</div><div class=\"fp-box\">file v2</div><div class=\"fp-arrow fp-pulse-g\">commit →</div><div class=\"fp-box good fp-pulse-g\">file v2</div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">v3 ещё not staged</div></div>"
   },
   {
    "cap": "Вывод: коммитится снимок из index, а не «что на диске». Изменил после add — добавь ещё раз.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good\">commit = снимок INDEX</div><div class=\"fp-row\"><div class=\"fp-tag\">add = зафиксировать содержимое сейчас</div></div></div>"
   }
  ]
 },
 {
  "id": "gitf-reset-revert",
  "t": "Git",
  "g": "Git",
  "title": "reset vs revert",
  "frames": [
   {
    "cap": "История: ветка main указывает на C, позади B и A. Хотим убрать C.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node\">B</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">C</div></div><div class=\"fp-row\"><div class=\"fp-tag acc\">main → C</div></div>"
   },
   {
    "cap": "reset --hard B двигает указатель main назад на B. Коммит C отвязан.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">B</div><div class=\"fp-conn\"></div><div class=\"fp-node dead\">C</div></div><div class=\"fp-row\"><div class=\"fp-tag acc\">main → B</div><div class=\"fp-tag bad\">C потерян из ветки</div></div>"
   },
   {
    "cap": "Так история стала короче — как будто C никогда не было. Опасно на общей ветке.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">B</div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">история переписана</div></div>"
   },
   {
    "cap": "Теперь альтернатива — revert C. Указатель НЕ двигаем назад.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node\">B</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">C</div></div><div class=\"fp-row\"><div class=\"fp-tag acc\">main → C</div></div>"
   },
   {
    "cap": "revert создаёт НОВЫЙ коммит C' с обратными изменениями — история растёт вперёд.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node\">B</div><div class=\"fp-conn\"></div><div class=\"fp-node\">C</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">C'</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">C' отменяет C, C цел</div></div>"
   },
   {
    "cap": "Итог: reset = двигаю указатель (переписываю), revert = добавляю анти-коммит (безопасно для общей ветки).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">reset ← назад</div><div class=\"fp-box good\">revert → вперёд</div></div><div class=\"fp-box big mut\">запушено → только revert</div></div>"
   }
  ]
 },
 {
  "id": "gitf-fetch-pull",
  "t": "Git",
  "g": "Git",
  "title": "fetch vs pull и fast-forward",
  "frames": [
   {
    "cap": "Локально main на C. На сервере появились D, E, которых у тебя ещё нет.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">local</div><div class=\"fp-node\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node acc\">C</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">origin</div><div class=\"fp-node\">A</div><div class=\"fp-conn\"></div><div class=\"fp-node\">C</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">D</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">E</div></div>"
   },
   {
    "cap": "git fetch скачивает D, E в origin/main. Твоя рабочая main стоит на месте.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">main</div><div class=\"fp-node acc\">C</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">origin/main</div><div class=\"fp-node\">C</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">D</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">E</div></div>"
   },
   {
    "cap": "Ты НЕ делал своих коммитов — ветка просто отстала. Это случай fast-forward.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">C</div><div class=\"fp-arrow fp-travel\">→ →</div><div class=\"fp-node good\">E</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">прямая линия, merge не нужен</div></div>"
   },
   {
    "cap": "pull тут просто двигает указатель main вперёд на E — fast-forward, без merge-коммита.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">C</div><div class=\"fp-conn\"></div><div class=\"fp-node\">D</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">E</div></div><div class=\"fp-row\"><div class=\"fp-tag acc\">main → E</div></div>"
   },
   {
    "cap": "А если ты ТОЖЕ коммитил (X) — ветки разошлись. Обычный pull сольёт их merge-коммитом M.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">C</div><div class=\"fp-conn\"></div><div class=\"fp-node bad\">X</div><div class=\"fp-conn\"></div><div class=\"fp-node\">M</div></div><div class=\"fp-row\"><div class=\"fp-node\">C</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">E</div><div class=\"fp-conn\"></div><div class=\"fp-node\">M</div></div>"
   },
   {
    "cap": "pull --rebase кладёт твой X ПОВЕРХ E — линейная история без merge-узла.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node\">C</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">D</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">E</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-pulse-a\">X'</div></div><div class=\"fp-box big good\">линейно, без M</div></div>"
   }
  ]
 },
 {
  "id": "gitf-detached-reflog",
  "t": "Git",
  "g": "Git",
  "title": "detached HEAD и спасение через reflog",
  "frames": [
   {
    "cap": "Норма: HEAD держится за ветку main, а main указывает на коммит C.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">HEAD</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">main</div><div class=\"fp-arrow\">→</div><div class=\"fp-node\">C</div></div>"
   },
   {
    "cap": "git checkout <хеш B> — HEAD отрывается от ветки и тычет прямо в коммит. Detached.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">HEAD</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">B</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">main</div><div class=\"fp-arrow\">→</div><div class=\"fp-node\">C</div></div>"
   },
   {
    "cap": "Делаешь коммит W — он висит на HEAD, но ни одна ветка на него не указывает.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">B</div><div class=\"fp-conn\"></div><div class=\"fp-node acc fp-float\">W</div><div class=\"fp-box bad\">← HEAD</div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">W без ветки</div></div>"
   },
   {
    "cap": "Переключаешься на main — теперь на W не указывает ничто. Считай, потерян.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">HEAD</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">main</div><div class=\"fp-arrow\">→</div><div class=\"fp-node\">C</div></div><div class=\"fp-row\"><div class=\"fp-node dead fp-blink\">W</div><div class=\"fp-tag bad\">кандидат на GC</div></div>"
   },
   {
    "cap": "Но reflog помнит КАЖДЫЙ шаг HEAD — там есть хеш W.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">reflog:</div></div><div class=\"fp-row\"><div class=\"fp-token\">HEAD@{2} W</div></div><div class=\"fp-row\"><div class=\"fp-token\">HEAD@{1} checkout main</div></div></div>"
   },
   {
    "cap": "git branch save <хеш W> привязывает коммит к ветке — спасён.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">save</div><div class=\"fp-arrow fp-pulse-g\">→</div><div class=\"fp-node good fp-pulse-g\">W</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">W снова в истории</div></div>"
   }
  ]
 },
 {
  "id": "gitf-merge-conflict",
  "t": "Git",
  "g": "Git",
  "title": "Чтение merge-конфликта",
  "frames": [
   {
    "cap": "Ветка main и ветка feature изменили одну и ту же строку №3 по-разному.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">main</div><div class=\"fp-box acc\">price = 100</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">feature</div><div class=\"fp-box good\">price = 200</div></div>"
   },
   {
    "cap": "git merge feature — Git не знает, чья строка верная, и объявляет конфликт.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">100</div><div class=\"fp-box big bad fp-pulse-r\">CONFLICT</div><div class=\"fp-box good\">200</div></div>"
   },
   {
    "cap": "В файл он вставляет обе версии между маркерами — твоя сверху, чужая снизу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad\">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</div><div class=\"fp-box acc\">price = 100</div><div class=\"fp-box mut\">=======</div><div class=\"fp-box good\">price = 200</div><div class=\"fp-box bad\">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</div></div>"
   },
   {
    "cap": "Ты вручную пишешь итоговую строку и удаляешь ВСЕ три маркера.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big good fp-pulse-g\">price = 200</div><div class=\"fp-row\"><div class=\"fp-tag good\">маркеры удалены</div></div></div>"
   },
   {
    "cap": "git add <файл> помечает конфликт как решённый.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box\">resolved file</div><div class=\"fp-arrow fp-pulse-g\">add →</div><div class=\"fp-box good\">staged</div></div>"
   },
   {
    "cap": "git commit завершает merge — появляется merge-коммит M, история сходится.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">main</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">M</div><div class=\"fp-conn\"></div><div class=\"fp-node good\">feature</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">слияние завершено</div></div>"
   }
  ]
 },
 {
  "id": "inf2f-kafka-consumer-group",
  "t": "Infra",
  "g": "Очереди и поиск",
  "title": "Consumer group: дележ партиций",
  "frames": [
   {
    "cap": "Топик разбит на партиции — это независимые упорядоченные ленты сообщений.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">Топик orders</div><div class=\"fp-row\"><div class=\"fp-lane name\" data-name=\"P0\"><div class=\"fp-token\">m1</div><div class=\"fp-token\">m2</div></div></div><div class=\"fp-row\"><div class=\"fp-lane name\" data-name=\"P1\"><div class=\"fp-token\">m3</div><div class=\"fp-token\">m4</div></div></div><div class=\"fp-row\"><div class=\"fp-lane name\" data-name=\"P2\"><div class=\"fp-token\">m5</div><div class=\"fp-token\">m6</div></div></div></div>"
   },
   {
    "cap": "Внутри одной группы каждая партиция закрепляется ровно за одним консьюмером — порядок не ломается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">group=A · 3 консьюмера = 3 партиции</div><div class=\"fp-row\"><div class=\"fp-box mut\">P0</div><div class=\"fp-conn\"></div><div class=\"fp-box acc fp-pulse-a\">C1</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">P1</div><div class=\"fp-conn\"></div><div class=\"fp-box acc fp-pulse-a\" style=\"animation-delay:.3s\">C2</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">P2</div><div class=\"fp-conn\"></div><div class=\"fp-box acc fp-pulse-a\" style=\"animation-delay:.6s\">C3</div></div></div>"
   },
   {
    "cap": "Добавили 4-го консьюмера — а партиций всего 3, поэтому лишний просто стоит без работы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">4 консьюмера > 3 партиций</div><div class=\"fp-row\"><div class=\"fp-box mut\">P0</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">C1</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">P1</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">C2</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">P2</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">C3</div></div><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">C4 простаивает</div></div></div>"
   },
   {
    "cap": "Убрали консьюмера — Kafka запускает rebalance и перевешивает его партицию на оставшихся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag fp-pulse-r\">rebalance</div><div class=\"fp-row\"><div class=\"fp-box mut\">P0</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">C1</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">C2 упал</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">P1</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-box good fp-pulse-g\">C3 теперь P1+P2</div></div></div>"
   },
   {
    "cap": "А вот ДРУГАЯ группа читает тот же топик параллельно — со своим offset, независимо от первой.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big mut\">Топик orders</div></div><div class=\"fp-row\"><div class=\"fp-conn\"></div><div class=\"fp-conn\"></div></div><div class=\"fp-row\"><div class=\"fp-box acc\">group=A (биллинг)</div><div class=\"fp-box acc\">group=B (аналитика)</div></div></div>"
   },
   {
    "cap": "Итог: партиция = единица параллелизма. Хочешь больше консьюмеров — заранее закладывай больше партиций.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">консьюм. = парт.</div><div class=\"fp-tag\">баланс</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">консьюм. &gt; парт.</div><div class=\"fp-tag\">лишние спят</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">консьюм. &lt; парт.</div><div class=\"fp-tag\">кто-то тянет 2+</div></div></div>"
   }
  ]
 },
 {
  "id": "inf2f-docker-layer-cache",
  "t": "Infra",
  "g": "Контейнеры",
  "title": "Слои образа и кэш сборки",
  "frames": [
   {
    "cap": "Образ — это стопка слоев: каждая инструкция Dockerfile дописывает один слой сверху.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">FROM jdk</div><div class=\"fp-slot\">COPY . .</div><div class=\"fp-slot\">RUN mvn install</div><div class=\"fp-slot\">CMD java -jar</div></div></div>"
   },
   {
    "cap": "Первая сборка: все слои строятся и попадают в кэш. Зависимости тянутся из сети один раз.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">build #1</div><div class=\"fp-stack\"><div class=\"fp-slot\">FROM jdk · build</div><div class=\"fp-slot\">COPY . . · build</div><div class=\"fp-slot\">mvn install · качает deps</div></div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-tag\">3 мин</div></div>"
   },
   {
    "cap": "Поменяли ОДНУ строчку кода. Слой COPY . . включает весь проект — значит он инвалидируется.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag fp-pulse-r\">правка 1 строки кода</div><div class=\"fp-stack\"><div class=\"fp-slot\">FROM jdk</div><div class=\"fp-slot\">COPY . . — изменился!</div></div><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">слой инвалидирован</div></div></div>"
   },
   {
    "cap": "А раз изменился слой COPY, все слои НИЖЕ него тоже пересобираются — mvn снова качает всё.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">FROM jdk — из кэша</div><div class=\"fp-slot\">COPY . . — заново</div><div class=\"fp-slot\">mvn install — снова качает!</div></div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-tag\">опять 3 мин на каждый чих</div></div>"
   },
   {
    "cap": "Фикс: сначала COPY pom.xml и скачать зависимости отдельным слоем, и лишь потом COPY src.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">COPY pom.xml</div><div class=\"fp-slot\">mvn go-offline · deps</div><div class=\"fp-slot\">COPY src</div><div class=\"fp-slot\">mvn package</div></div><div class=\"fp-tag\">deps выше кода</div></div>"
   },
   {
    "cap": "Теперь правка кода трогает только нижние дешевые слои — деп-слой берется из кэша. Секунды.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot\">COPY pom.xml — кэш</div><div class=\"fp-slot\">deps — кэш</div><div class=\"fp-slot\">COPY src — заново</div></div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">deps из кэша</div></div><div class=\"fp-bar\"><span style=\"width:15%\"></span></div><div class=\"fp-tag\">20 сек</div></div>"
   }
  ]
 },
 {
  "id": "inf2f-nginx-sticky-session",
  "t": "Infra",
  "g": "Контейнеры",
  "title": "Балансировка и липкие сессии",
  "frames": [
   {
    "cap": "Один nginx, за ним несколько одинаковых бэкендов. Кто получит запрос?",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box big acc\">nginx upstream</div></div><div class=\"fp-row\"><div class=\"fp-conn\"></div><div class=\"fp-conn\"></div><div class=\"fp-conn\"></div></div><div class=\"fp-row\"><div class=\"fp-box mut\">backend-1</div><div class=\"fp-box mut\">backend-2</div><div class=\"fp-box mut\">backend-3</div></div></div>"
   },
   {
    "cap": "Round-robin: запросы идут по кругу — 1, 2, 3, 1, 2, 3. Нагрузка ровная.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-travel\">req</div><div class=\"fp-box acc\">nginx</div></div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">b1</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.3s\">b2</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.6s\">b3</div></div></div>"
   },
   {
    "cap": "Юзер логинится — сессия легла в ПАМЯТЬ backend-1. Только там она и существует.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">login</div><div class=\"fp-conn\"></div><div class=\"fp-box good fp-pulse-g\">backend-1</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">session=u42</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">b2: пусто</div><div class=\"fp-box mut\">b3: пусто</div></div></div>"
   },
   {
    "cap": "Следующий запрос round-robin шлет на backend-2 — а там сессии нет. Юзера разлогинило.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">req u42</div><div class=\"fp-conn fp-travel\"></div><div class=\"fp-box bad fp-blink\">backend-2</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">session не найдена</div></div><div class=\"fp-tag\">401 — кто ты?</div></div>"
   },
   {
    "cap": "Костыль — ip_hash/sticky: привязать клиента к одному бэкенду. Работает, но узел упал — сессии нет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">ip_hash</div><div class=\"fp-row\"><div class=\"fp-token\">u42</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">всегда backend-1</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">b1 упал → сессия потеряна</div></div></div>"
   },
   {
    "cap": "Правильно — вынести сессию в общий Redis. Бэкенды становятся stateless, round-robin безопасен.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">b1</div><div class=\"fp-box good\">b2</div><div class=\"fp-box good\">b3</div></div><div class=\"fp-row\"><div class=\"fp-conn\"></div><div class=\"fp-conn\"></div><div class=\"fp-conn\"></div></div><div class=\"fp-row\"><div class=\"fp-box big acc fp-pulse-a\">Redis: session=u42</div></div></div>"
   }
  ]
 },
 {
  "id": "inf2f-hpa-autoscale",
  "t": "Infra",
  "g": "Контейнеры",
  "title": "HPA: автомасштабирование по CPU",
  "frames": [
   {
    "cap": "HPA — это контур обратной связи: измерить нагрузку, сравнить с целью, поправить число подов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">метрика CPU</div><div class=\"fp-arrow\"></div><div class=\"fp-box big acc fp-pulse-a\">HPA</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">число подов</div></div><div class=\"fp-tag\">цель: 50% CPU</div></div>"
   },
   {
    "cap": "Чтобы посчитать %, HPA берет потребление как долю от resources.requests пода.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">requests.cpu = 200m</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">сейчас 100m</div><div class=\"fp-tag\">= 50%</div></div><div class=\"fp-bar\"><span style=\"width:50%\"></span></div></div>"
   },
   {
    "cap": "Нагрузка выросла: 2 пода тянут по 100% при цели 50%. По формуле нужно вдвое больше.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag fp-pulse-r\">CPU 100% при 2 подах</div><div class=\"fp-row\"><div class=\"fp-box bad\">pod1 100%</div><div class=\"fp-box bad\">pod2 100%</div></div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">2 × (100/50) = 4 пода</div></div></div>"
   },
   {
    "cap": "HPA доводит реплики до 4 — нагрузка на каждый под падает к цели 50%. Контур замкнулся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">pod1</div><div class=\"fp-box good\">pod2</div><div class=\"fp-box good fp-float\">pod3</div><div class=\"fp-box good fp-float\" style=\"animation-delay:.3s\">pod4</div></div><div class=\"fp-bar\"><span style=\"width:50%\"></span></div><div class=\"fp-tag\">~50% — стабильно</div></div>"
   },
   {
    "cap": "Главная ловушка: у пода НЕ задан requests.cpu. У HPA нет базы для процента — метрика unknown.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">requests.cpu: не задан</div></div><div class=\"fp-row\"><div class=\"fp-box big bad fp-blink\">HPA: targets &lt;unknown&gt;</div></div><div class=\"fp-tag\">масштабирования нет</div></div>"
   },
   {
    "cap": "Вторая причина простоя — нет metrics-server. Нет метрик — HPA слеп. Чек-лист: requests + metrics-server.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">requests.cpu задан</div></div><div class=\"fp-row\"><div class=\"fp-box good\">metrics-server установлен</div></div><div class=\"fp-row\"><div class=\"fp-box big good fp-pulse-g\">HPA масштабирует</div></div></div>"
   }
  ]
 },
 {
  "id": "qkf-build-time-di",
  "t": "Quarkus",
  "g": "Старт и DI",
  "title": "Build-time DI (ARC): почему старт за миллисекунды",
  "frames": [
   {
    "cap": "В обычном Spring при КАЖДОМ старте контейнер заново сканирует classpath и через рефлексию собирает граф бинов.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">старт приложения</div><div class=\"fp-row\"><div class=\"fp-box mut\">classpath</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-spin\">скан + рефлексия</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">граф бинов</div></div><div class=\"fp-val bad\">это секунды, каждый раз</div></div>"
   },
   {
    "cap": "Quarkus переносит весь этот анализ на этап СБОРКИ — там, где время не жалко.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">этап build (mvn package)</div><div class=\"fp-row\"><div class=\"fp-box mut\">classpath</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">ARC анализирует</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">сгенерён байткод</div></div><div class=\"fp-val\">граф бинов посчитан заранее</div></div>"
   },
   {
    "cap": "Результат сборки — не «инструкция как собирать», а готовый код, который прямо создаёт нужные объекты.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">@Inject Repo</div><div class=\"fp-conn\">…</div><div class=\"fp-box good big\">new Repo()<br/>new Service(repo)</div></div><div class=\"fp-val good\">никакого сканирования в рантайме</div></div>"
   },
   {
    "cap": "При старте контейнеру остаётся лишь выполнить готовый план — без рефлексии и поиска.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">старт</div><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">выполнить план</div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good\">готов к запросам</div></div><div class=\"fp-row\"><div class=\"fp-bar\"><span style=\"width:6%\"></span></div></div><div class=\"fp-val good\">миллисекунды</div></div>"
   },
   {
    "cap": "Побочный приз: если бина нет или он неоднозначен — это видно на компиляции, а не падает в проде.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">нет бина PaymentPort</div></div><div class=\"fp-arrow\">↑</div><div class=\"fp-box acc\">ошибка на build-time</div><div class=\"fp-val good\">а не NPE на проде в 3 ночи</div></div>"
   }
  ]
 },
 {
  "id": "qkf-native-closed-world",
  "t": "Quarkus",
  "g": "Native",
  "title": "Native AOT и closed-world: как GraalVM делает .exe",
  "frames": [
   {
    "cap": "В JVM-режиме рядом с кодом всегда едет целая JVM, которая на лету компилирует и грузит классы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">ваш код</div><div class=\"fp-arrow\">+</div><div class=\"fp-box mut big\">JVM (JIT, загрузчик классов)</div></div><div class=\"fp-val mut\">гибко, но тяжело и медленно стартует</div></div>"
   },
   {
    "cap": "Native собирает всё заранее (AOT): GraalVM анализирует достижимость каждого куска кода.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">build: native-image</div><div class=\"fp-row\"><div class=\"fp-box\">весь код</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-spin\">анализ reachability</div></div><div class=\"fp-grid\" style=\"grid-template-columns:repeat(4,1fr)\"><div class=\"fp-cell on\">main</div><div class=\"fp-cell on\">service</div><div class=\"fp-cell dead\">unused</div><div class=\"fp-cell on\">repo</div></div></div>"
   },
   {
    "cap": "Closed-world: что недостижимо — вырезается. В бинарь попадает только живой код.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">main</div><div class=\"fp-box good\">service</div><div class=\"fp-box dead\">unused (вырезан)</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box big good\">единый бинарь</div></div>"
   },
   {
    "cap": "Проблема: рефлексия решает класс по строке в рантайме — статически такой путь не виден, класс могут выкинуть.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">Class.forName(\"Foo\")</div><div class=\"fp-conn\">?</div><div class=\"fp-box dead fp-blink\">Foo вырезан</div></div><div class=\"fp-val bad\">ClassNotFound в рантайме</div></div>"
   },
   {
    "cap": "Решение — заранее сказать GraalVM «оставь это»: @RegisterForReflection и reflection-config.json.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag\">@RegisterForReflection</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">Foo сохранён в бинаре</div></div><div class=\"fp-val good\">путь рефлексии теперь работает</div></div>"
   },
   {
    "cap": "Итог: сборка долгая и прожорливая, зато бинарь стартует мгновенно и ест мало памяти.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">build: медленно, много RAM</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big fp-pulse-g\">старт ~10мс, мало RSS</div></div></div>"
   }
  ]
 },
 {
  "id": "qkf-client-proxy",
  "t": "Quarkus",
  "g": "Старт и DI",
  "title": "Клиентский прокси у @ApplicationScoped",
  "frames": [
   {
    "cap": "Сервис A зависит от бина B со scope @ApplicationScoped и хочет его при инъекции.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">Service A</div><div class=\"fp-arrow\">@Inject</div><div class=\"fp-box acc\">B @ApplicationScoped</div></div></div>"
   },
   {
    "cap": "Проблема: на момент инъекции реальный B может быть ещё не создан (ленивость, циклы, scope).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">Service A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box dead fp-blink\">B ещё нет</div></div><div class=\"fp-val bad\">инжектить «сейчас» нельзя</div></div>"
   },
   {
    "cap": "Quarkus вместо самого B подсовывает прокси — обёртку того же типа B.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">Service A</div><div class=\"fp-arrow\">держит</div><div class=\"fp-box acc fp-float\">proxy: B</div></div><div class=\"fp-val\">тип тот же, A ничего не замечает</div></div>"
   },
   {
    "cap": "Когда A впервые вызывает метод — прокси находит реальный контекстный экземпляр B.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">A.b.doIt()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">proxy</div><div class=\"fp-arrow fp-travel\">delegate</div><div class=\"fp-box good fp-pulse-g\">реальный B</div></div></div>"
   },
   {
    "cap": "Вызов делегируется реальному B и возвращает результат — A работает как обычно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">B выполнил</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">proxy</div><div class=\"fp-arrow\">→</div><div class=\"fp-box\">A получил ответ</div></div><div class=\"fp-val good\">ленивость + корректный scope</div></div>"
   },
   {
    "cap": "Нюанс: для @Singleton и @Dependent прокси нет — туда инжектится прямой экземпляр.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">@ApplicationScoped → proxy</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">@Singleton / @Dependent → прямой инстанс</div></div></div>"
   }
  ]
 },
 {
  "id": "qkf-mutiny-uni-multi",
  "t": "Quarkus",
  "g": "Reactive",
  "title": "Mutiny: Uni (один) vs Multi (поток) и backpressure",
  "frames": [
   {
    "cap": "Uni обещает ровно один результат в будущем — как ожидание одной посылки.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Uni&lt;User&gt;</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box good\">1 элемент</div></div><div class=\"fp-val\">0 или 1 (или ошибка)</div></div>"
   },
   {
    "cap": "Multi — это поток: элементы приходят во времени, их может быть много.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Multi&lt;Row&gt;</div><div class=\"fp-arrow\">→</div><div class=\"fp-token fp-travel\">●</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.4s\">●</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.8s\">●</div></div><div class=\"fp-val\">0..N во времени</div></div>"
   },
   {
    "cap": "Mutiny ленив: без subscribe не происходит НИЧЕГО — это просто рецепт.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">Uni/Multi описан</div><div class=\"fp-conn\">…</div><div class=\"fp-box dead\">не выполняется</div></div><div class=\"fp-arrow\">↓ subscribe()</div><div class=\"fp-box good fp-pulse-g\">пошло выполнение</div></div>"
   },
   {
    "cap": "Backpressure: подписчик сам просит порцию через request(n) — источник не шлёт больше.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">источник</div><div class=\"fp-arrow\">←</div><div class=\"fp-tag\">request(2)</div><div class=\"fp-arrow\">←</div><div class=\"fp-box acc\">подписчик</div></div><div class=\"fp-row\"><div class=\"fp-token\">●</div><div class=\"fp-token\">●</div><div class=\"fp-val\">ровно 2, не больше</div></div></div>"
   },
   {
    "cap": "Если источник быстрее, а спрос игнорировать — буфер растёт до переполнения и OOM.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">быстрый источник</div><div class=\"fp-arrow\">→</div><div class=\"fp-stack\"><div class=\"fp-slot\">●</div><div class=\"fp-slot\">●</div><div class=\"fp-slot\">●</div><div class=\"fp-slot\">●</div></div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">медленный потребитель</div></div><div class=\"fp-val bad\">переполнение → OOM</div></div>"
   },
   {
    "cap": "Поэтому выбирают стратегию перегрузки: буферизовать с лимитом, дропать или брать только последний.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">buffer(N)</div><div class=\"fp-box acc\">drop</div><div class=\"fp-box acc\">latest</div></div><div class=\"fp-val good\">осознанный контроль потока</div></div>"
   }
  ]
 },
 {
  "id": "qkf-event-loop-blocking",
  "t": "Quarkus",
  "g": "Reactive",
  "title": "Event-loop vs @Blocking: на каком потоке бежит endpoint",
  "frames": [
   {
    "cap": "Запросы обслуживает маленький пул event-loop потоков — их примерно по числу ядер.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane name\">event-loop</div><div class=\"fp-row\"><div class=\"fp-node acc fp-spin\">L1</div><div class=\"fp-node acc fp-spin\">L2</div></div><div class=\"fp-val\">их мало — они должны крутиться без остановки</div></div>"
   },
   {
    "cap": "Реактивный endpoint (возвращает Uni) не ждёт — отдаёт задачу и тут же берёт следующий запрос.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">req</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc fp-spin\">L1</div><div class=\"fp-arrow fp-travel\">Uni</div><div class=\"fp-box good\">не блокирует</div></div><div class=\"fp-val good\">L1 свободен для следующих</div></div>"
   },
   {
    "cap": "Беда: синхронный JDBC-вызов на event-loop ЗАМОРАЖИВАЕТ поток — и все ждут.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node bad fp-blink\">L1 завис на JDBC</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">req2 ждёт</div><div class=\"fp-box mut\">req3 ждёт</div></div><div class=\"fp-val bad\">сервер встал</div></div>"
   },
   {
    "cap": "Решение — @Blocking: запрос уносят на отдельный worker-пул, где ждать можно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag\">@Blocking</div><div class=\"fp-arrow\">→</div><div class=\"fp-lane name\">worker pool</div></div><div class=\"fp-row\"><div class=\"fp-node\">W1</div><div class=\"fp-node\">W2</div><div class=\"fp-node\">W3</div></div></div>"
   },
   {
    "cap": "Event-loop сразу освобождается, а блокирующая работа спокойно ждёт на воркере.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node acc fp-spin\">L1 свободен</div><div class=\"fp-arrow fp-travel\">отдал</div><div class=\"fp-node good fp-pulse-g\">W1 ждёт JDBC</div></div><div class=\"fp-val good\">стойка не стоит</div></div>"
   },
   {
    "cap": "Правило: вернул Uni/Multi → event-loop; синхронно блокируешь → @Blocking на worker.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Uni/Multi → event-loop</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">blocking код → @Blocking → worker</div></div></div>"
   }
  ]
 },
 {
  "id": "qkf-kafka-incoming-outgoing",
  "t": "Quarkus",
  "g": "Messaging",
  "title": "Kafka через @Incoming / @Outgoing (Reactive Messaging)",
  "frames": [
   {
    "cap": "В конфиге канал привязан к Kafka-топику — это имя «трубы», с которым работает код.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">topic: orders-in</div><div class=\"fp-arrow\">↔</div><div class=\"fp-box acc\">channel \"orders\"</div></div><div class=\"fp-val\">связь задаётся в application.properties</div></div>"
   },
   {
    "cap": "@Incoming подписывает метод на канал: каждое сообщение из топика въезжает аргументом.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">Kafka orders-in</div><div class=\"fp-arrow fp-travel\">●</div><div class=\"fp-tag\">@Incoming(\"orders\")</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">process(order)</div></div></div>"
   },
   {
    "cap": "@Outgoing отправляет то, что метод вернул, в свой канал — и дальше в другой топик.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">return result</div><div class=\"fp-tag\">@Outgoing(\"out\")</div><div class=\"fp-arrow fp-travel\">●</div><div class=\"fp-box\">Kafka orders-out</div></div></div>"
   },
   {
    "cap": "Метод с обеими аннотациями — процессор: взял из одного топика, преобразовал, отдал в другой.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">orders-in</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">@Incoming + @Outgoing<br/>transform()</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">orders-out</div></div></div>"
   },
   {
    "cap": "Message<T> несёт payload + метаданные + ack/nack для подтверждения обработки.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Message&lt;T&gt;</div><div class=\"fp-arrow\">=</div><div class=\"fp-box\">payload</div><div class=\"fp-box mut\">metadata</div><div class=\"fp-box good\">ack()/nack()</div></div><div class=\"fp-val\">голый T → ack автоматом</div></div>"
   },
   {
    "cap": "Итог: код описывает только логику; связку топик-сериализатор держит конфиг.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">код: бизнес-логика</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">конфиг: канал ↔ топик ↔ (де)сериализатор</div></div></div>"
   }
  ]
 },
 {
  "id": "qkf-dev-live-reload",
  "t": "Quarkus",
  "g": "Dev-опыт",
  "title": "Dev mode и live reload: когда происходит перекомпиляция",
  "frames": [
   {
    "cap": "Запускаешь quarkus dev — приложение живёт и ждёт запросов, ничего не молотя вхолостую.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">quarkus dev</div><div class=\"fp-box good big fp-float\">app живёт, ждёт</div><div class=\"fp-val mut\">никакого фонового перемалывания</div></div>"
   },
   {
    "cap": "Ты правишь код и сохраняешь файл — но сам по себе сейв ещё ничего не пересобирает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-blink\">Service.java изменён</div></div><div class=\"fp-val mut\">сохранение ≠ перекомпиляция</div></div>"
   },
   {
    "cap": "Триггер — следующий входящий запрос: вот тут Quarkus и просыпается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">HTTP запрос</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box acc fp-pulse-a\">Quarkus dev</div></div><div class=\"fp-val\">проверка перед обработкой</div></div>"
   },
   {
    "cap": "Quarkus сравнивает исходники с прошлым разом: есть дельта — пересобирает только её.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">было</div><div class=\"fp-arrow\">vs</div><div class=\"fp-box acc fp-blink\">стало (diff)</div></div><div class=\"fp-row\"><div class=\"fp-box good\">инкрементальная пересборка дельты</div></div></div>"
   },
   {
    "cap": "Изменённые классы горячо подменяются через dev-ClassLoader — без полного рестарта JVM.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box dead\">старый класс</div><div class=\"fp-arrow fp-travel\">swap</div><div class=\"fp-box good fp-pulse-g\">новый класс</div></div><div class=\"fp-val good\">JVM не перезапускалась</div></div>"
   },
   {
    "cap": "Запрос обслуживается уже новым кодом; параллельно continuous testing перегоняет затронутые тесты.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">ответ от нового кода</div></div><div class=\"fp-row\"><div class=\"fp-tag\">continuous testing</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">перепрогон затронутых тестов</div></div></div>"
   }
  ]
 },
 {
  "id": "qkf-config-ordering",
  "t": "Quarkus",
  "g": "Конфигурация",
  "title": "Источники конфигурации: кто кого перебивает",
  "frames": [
   {
    "cap": "Одно свойство db.url может быть задано сразу в нескольких местах — кто победит?",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">в .properties</div><div class=\"fp-box mut\">в ENV</div><div class=\"fp-box mut\">в -D</div></div><div class=\"fp-val\">db.url задан трижды</div></div>"
   },
   {
    "cap": "У каждого источника есть приоритет (ordinal): выше ordinal — главнее источник.",
    "html": "<div class=\"fp-col\"><div class=\"fp-stack\"><div class=\"fp-slot acc\">sys props (-D) — высший</div><div class=\"fp-slot acc\">ENV</div><div class=\"fp-slot\">.env</div><div class=\"fp-slot\">application.properties</div><div class=\"fp-slot mut\">дефолты в коде — низший</div></div></div>"
   },
   {
    "cap": "ENV перекрывает файл: значение из переменной окружения ложится поверх properties.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">file: db.url=local</div></div><div class=\"fp-arrow\">↑ перекрыт</div><div class=\"fp-box good fp-pulse-g\">ENV: db.url=prod</div></div>"
   },
   {
    "cap": "Имя для ENV получают по правилу: точки и дефисы → подчёркивания, всё в верхний регистр.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">quarkus.datasource.username</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">QUARKUS_DATASOURCE_USERNAME</div></div></div>"
   },
   {
    "cap": "Профиль добавляет ещё измерение: значение с %dev/%test/%prod берётся только для активного профиля.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">%dev → localhost</div><div class=\"fp-box good fp-pulse-g\">%prod → cluster</div><div class=\"fp-box mut\">%test → h2</div></div><div class=\"fp-val\">активен один</div></div>"
   },
   {
    "cap": "SmallRye Config разрешает всё это в одно итоговое значение — его и инжектит @ConfigProperty.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">SmallRye Config</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good big\">итоговое db.url</div></div><div class=\"fp-val\">@ConfigProperty получает разрешённое</div></div>"
   }
  ]
 },
 {
  "id": "tef-test-pyramid",
  "t": "Testing",
  "g": "Стратегия",
  "title": "Пирамида тестов",
  "frames": [
   {
    "cap": "Тесты бывают разной «цены»: unit дёшев и быстр, e2e дорог и медленен.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">unit</div><div class=\"fp-tag good\">быстрый · дешёвый</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">integration</div><div class=\"fp-tag\">средний</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">e2e</div><div class=\"fp-tag bad\">медленный · дорогой</div></div></div>"
   },
   {
    "cap": "Здоровая пропорция: широкое основание из unit, узкий шпиль из e2e.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\" style=\"width:60px\">e2e</div></div><div class=\"fp-row\"><div class=\"fp-box acc\" style=\"width:140px\">integration</div></div><div class=\"fp-row\"><div class=\"fp-box good\" style=\"width:240px\">unit · unit · unit · unit</div></div></div>"
   },
   {
    "cap": "Снизу гоняем сотни unit-тестов — они отлавливают логику за миллисекунды.",
    "html": "<div class=\"fp-col\"><div class=\"fp-grid\" style=\"grid-template-columns:repeat(8,1fr)\"><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good\"></div><div class=\"fp-cell good fp-pulse-g\"></div></div><div class=\"fp-tag good\">200 шт · &lt;1с всего</div></div>"
   },
   {
    "cap": "Выше — горстка e2e: каждый поднимает всё приложение и ползёт секундами.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">e2e #1</div><div class=\"fp-bar\"><span style=\"width:90%\"></span></div></div><div class=\"fp-tag bad\">3 шт · ~30с</div></div>"
   },
   {
    "cap": "Перевернёшь пропорцию — получишь «мороженое»: сборка медленная и вечно красная.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\" style=\"width:240px\">e2e · e2e · e2e · e2e</div></div><div class=\"fp-row\"><div class=\"fp-box acc\" style=\"width:140px\">integration</div></div><div class=\"fp-row\"><div class=\"fp-box mut\" style=\"width:60px\">unit</div></div><div class=\"fp-tag bad fp-blink\">CI 40 мин · flaky</div></div>"
   },
   {
    "cap": "Итог: правильная форма даёт быстрый и стабильный фидбек на каждый коммит.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\" style=\"width:60px\">e2e</div></div><div class=\"fp-row\"><div class=\"fp-box acc\" style=\"width:140px\">integration</div></div><div class=\"fp-row\"><div class=\"fp-box good\" style=\"width:240px\">unit</div></div><div class=\"fp-tag good fp-pulse-g\">commit → зелёный за секунды</div></div>"
   }
  ]
 },
 {
  "id": "tef-tdd-cycle",
  "t": "Testing",
  "g": "Процесс",
  "title": "Цикл TDD (red-green-refactor)",
  "frames": [
   {
    "cap": "Шаг 1 — Red: пишешь тест на поведение, которого ещё нет в коде.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">тест: 2+2==4</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">кода нет</div></div><div class=\"fp-tag bad fp-blink\">RED — падает</div></div>"
   },
   {
    "cap": "Красный обязателен: он доказывает, что тест реально проверяет, а не врёт «зелёным».",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node bad fp-pulse-r\">RED</div></div><div class=\"fp-tag mut\">если сразу зелёный — тест пустой</div></div>"
   },
   {
    "cap": "Шаг 2 — Green: пишешь минимум кода, чтобы тест прошёл. Красота пока не важна.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">тест: 2+2==4</div><div class=\"fp-arrow\"></div><div class=\"fp-box good\">return a+b;</div></div><div class=\"fp-tag good fp-pulse-g\">GREEN — прошёл</div></div>"
   },
   {
    "cap": "Шаг 3 — Refactor: чистишь код, а зелёный тест ловит тебя, если что-то сломал.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">грязный код</div><div class=\"fp-arrow\"></div><div class=\"fp-box good\">чистый код</div></div><div class=\"fp-tag good\">тест всё ещё GREEN — сетка безопасности</div></div>"
   },
   {
    "cap": "Три шага замыкаются в кольцо и крутятся по одной мелкой фиче.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node bad\">RED</div><div class=\"fp-arrow\"></div><div class=\"fp-node good\">GREEN</div><div class=\"fp-arrow\"></div><div class=\"fp-node acc\">REFACTOR</div></div><div class=\"fp-row\"><div class=\"fp-tag fp-spin\">↺ повтор</div></div></div>"
   },
   {
    "cap": "Итог: код рождается уже покрытым тестами, а API получается удобным «изнутри».",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good big fp-pulse-g\">фича + тест на неё</div></div><div class=\"fp-tag good\">покрытие ≈ 100% по построению</div></div>"
   }
  ]
 },
 {
  "id": "tef-verify-vs-assert",
  "t": "Testing",
  "g": "Mockito",
  "title": "verify() vs assert: состояние и взаимодействие",
  "frames": [
   {
    "cap": "Сервис делает две вещи: считает результат и дёргает зависимость (репозиторий).",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Service</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">repo.save()</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">Service</div><div class=\"fp-arrow\"></div><div class=\"fp-box good\">return 4</div></div></div>"
   },
   {
    "cap": "assert проверяет ВОЗВРАТ — то, что лежит в результате после вызова.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">result = 4</div><div class=\"fp-conn\"></div><div class=\"fp-tag good fp-pulse-g\">assertThat(result)==4</div></div></div>"
   },
   {
    "cap": "Но у void-метода возврата НЕТ — assert проверять нечего.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">notify()</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad\">void · нет результата</div></div><div class=\"fp-tag bad fp-blink\">assert бессилен</div></div>"
   },
   {
    "cap": "verify смотрит в журнал вызовов мока: был ли вызов, сколько раз, с чем.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">mock repo</div><div class=\"fp-conn\"></div><div class=\"fp-box mut\">журнал: save(order) ×1</div></div><div class=\"fp-tag good fp-pulse-g\">verify(repo).save(order)</div></div>"
   },
   {
    "cap": "times(n) и never() задают точное число вызовов — это и есть смысл verify.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag good\">verify(m, times(2)).send()</div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">verify(m, never()).delete()</div></div></div>"
   },
   {
    "cap": "Итог: assert — про состояние результата, verify — про факт общения с зависимостью.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">assert → ЧТО получилось</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">verify → ЧТО ты вызвал</div></div></div>"
   }
  ]
 },
 {
  "id": "tef-testcontainers",
  "t": "Testing",
  "g": "Интеграционные",
  "title": "Testcontainers: реальная БД в Docker на время теста",
  "frames": [
   {
    "cap": "In-memory H2 быстр, но это ПОДДЕЛКА Postgres — другой диалект SQL.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">тест на H2</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad\">прод Postgres</div></div><div class=\"fp-tag bad fp-blink\">jsonb / ON CONFLICT — сюрприз!</div></div>"
   },
   {
    "cap": "Testcontainers поднимает НАСТОЯЩИЙ Postgres в Docker — тот же, что на проде.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">Docker: postgres:16</div></div><div class=\"fp-tag good\">тот же образ, что в проде</div></div>"
   },
   {
    "cap": "При старте теста контейнер запускается и отдаёт СЛУЧАЙНЫЙ порт — нет конфликтов на CI.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">@BeforeAll</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">container.start()</div><div class=\"fp-arrow\"></div><div class=\"fp-box good\">:54321 (рандом)</div></div></div>"
   },
   {
    "cap": "Тест подключается к живой базе и гоняет реальные SQL-запросы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">тест</div><div class=\"fp-conn\"></div><div class=\"fp-token fp-travel\"></div><div class=\"fp-conn\"></div><div class=\"fp-box good\">Postgres</div></div><div class=\"fp-tag good\">настоящий диалект</div></div>"
   },
   {
    "cap": "После теста контейнер уничтожается вместе со всеми данными — следующий старт чист.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">@AfterAll</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad fp-blink\">container.stop() · ✗</div></div><div class=\"fp-tag good\">чистое состояние гарантировано</div></div>"
   },
   {
    "cap": "Итог: достоверность как на проде ценой секунд — это уровень integration, не unit.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">достоверность прода</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">старт ~секунды</div></div><div class=\"fp-tag acc\">середина пирамиды</div></div>"
   }
  ]
 },
 {
  "id": "tef-test-pollution",
  "t": "Testing",
  "g": "Надёжность",
  "title": "Test pollution: тест-сосед, который ломает других",
  "frames": [
   {
    "cap": "Два теста делят общее статическое состояние — например список users.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">testA</div><div class=\"fp-box acc\">testB</div></div><div class=\"fp-row\"><div class=\"fp-box mut big\">static List users [пусто]</div></div></div>"
   },
   {
    "cap": "testA добавляет запись и НЕ убирает за собой — состояние осталось грязным.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">testA</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">users.add(u)</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">static List users [ u ]</div></div></div>"
   },
   {
    "cap": "testB ожидал пустой список, но получил чужую запись — и падает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">testB: ждёт size==0</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad fp-blink\">видит size==1 ✗</div></div></div>"
   },
   {
    "cap": "Коварство: поменяй порядок запуска — и красным станет уже другой тест.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag good\">A→B: B падает</div><div class=\"fp-tag bad\">B→A: A падает</div></div><div class=\"fp-tag bad fp-blink\">плавающий баг от порядка</div></div>"
   },
   {
    "cap": "Лечение — изоляция: @BeforeEach пересоздаёт чистое состояние перед каждым тестом.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">@BeforeEach</div><div class=\"fp-arrow\"></div><div class=\"fp-box good\">users = new List()</div></div><div class=\"fp-tag good\">+ откат транзакции / @DirtiesContext</div></div>"
   },
   {
    "cap": "Итог: каждый тест стартует с чистого листа — порядок больше не влияет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">testA ✓</div><div class=\"fp-box good fp-pulse-g\">testB ✓</div></div><div class=\"fp-tag good\">любой порядок → зелёный</div></div>"
   }
  ]
 },
 {
  "id": "tef-mutation-testing",
  "t": "Testing",
  "g": "Качество",
  "title": "Мутационное тестирование (PIT)",
  "frames": [
   {
    "cap": "Покрытие говорит «строка выполнена» — но выполнена ≠ проверена.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">coverage 100%</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad\">а assert'ов нет?</div></div><div class=\"fp-tag bad fp-blink\">зелёно, но пусто</div></div>"
   },
   {
    "cap": "PIT берёт рабочий код и вносит диверсию — например меняет > на >=.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">if (a &gt; b)</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad fp-pulse-r\">if (a &gt;= b)</div></div><div class=\"fp-tag acc\">мутант внедрён</div></div>"
   },
   {
    "cap": "Для каждого мутанта PIT прогоняет ТВОИ тесты против изменённого кода.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">мутант</div><div class=\"fp-arrow\"></div><div class=\"fp-box acc\">твои тесты</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">?</div></div></div>"
   },
   {
    "cap": "Тест покраснел — мутант УБИТ: значит тесты реально стерегут это место.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">мутант</div><div class=\"fp-arrow\"></div><div class=\"fp-box good fp-pulse-g\">тест RED ✓</div></div><div class=\"fp-tag good\">KILLED — охрана работает</div></div>"
   },
   {
    "cap": "Все тесты зелёные при диверсии — мутант ВЫЖИЛ: тут дыра, assert чего-то не проверяет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">мутант</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad fp-blink\">тест GREEN ✗</div></div><div class=\"fp-tag bad\">SURVIVED — дыра в тестах</div></div>"
   },
   {
    "cap": "Итог: mutation score меряет силу тестов, а выжившие мутанты — список «допиши assert».",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-bar\"><span style=\"width:78%\"></span></div><div class=\"fp-tag good\">score 78%</div></div><div class=\"fp-tag acc\">выжившие → где усилить тесты</div></div>"
   }
  ]
 },
 {
  "id": "tef-clock-injection",
  "t": "Testing",
  "g": "Тестопригодность",
  "title": "Управляемое время: Clock вместо LocalDate.now()",
  "frames": [
   {
    "cap": "Сервис зовёт LocalDate.now() напрямую — он намертво привязан к системным часам.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Service</div><div class=\"fp-arrow\"></div><div class=\"fp-box bad\">LocalDate.now()</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut fp-spin\">часы ОС</div></div></div>"
   },
   {
    "cap": "Тест «конец месяца» зелёный только 30-го, а «вчера» зависит от дня прогона.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">19-го: ✓</div><div class=\"fp-box bad fp-blink\">31-го: ✗</div></div><div class=\"fp-tag bad\">недетерминированно</div></div>"
   },
   {
    "cap": "Решение — Clock как зависимость: сервис спрашивает время у порта, а не у ОС.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Service</div><div class=\"fp-arrow\"></div><div class=\"fp-box good\">Clock</div></div><div class=\"fp-tag good\">now(clock) вместо now()</div></div>"
   },
   {
    "cap": "В проде в порт подставляем системные часы — поведение прежнее.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">PROD</div><div class=\"fp-arrow\"></div><div class=\"fp-box mut\">Clock.systemDefaultZone()</div></div></div>"
   },
   {
    "cap": "В тесте подставляем Clock.fixed — время замораживается на нужном моменте.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">TEST</div><div class=\"fp-arrow\"></div><div class=\"fp-box acc fp-pulse-a\">Clock.fixed(31 дек 23:59)</div></div><div class=\"fp-tag good\">время = вход теста</div></div>"
   },
   {
    "cap": "Итог: любой пограничный день проверяем детерминированно в любой день прогона.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">29 фев ✓</div><div class=\"fp-box good\">конец мес ✓</div><div class=\"fp-box good\">полночь ✓</div></div><div class=\"fp-tag good fp-pulse-g\">стабильно круглый год</div></div>"
   }
  ]
 },
 {
  "id": "wbf-cors-preflight",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "CORS preflight (OPTIONS)",
  "frames": [
   {
    "cap": "Страница с домена shop.com хочет дернуть API на api.bank.com — другой origin. Браузер настораживается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">JS @ shop.com</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">api.bank.com</div></div><div class=\"fp-tag fp-blink\">другой origin — подозрительно</div></div>"
   },
   {
    "cap": "Запрос «сложный»: метод PUT и Content-Type application/json. Браузер не пускает его сразу.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">PUT</div><div class=\"fp-box bad\">Content-Type: json</div></div><div class=\"fp-row\"><div class=\"fp-box\">JS</div><div class=\"fp-conn\">⛔ стоп</div><div class=\"fp-box mut\">сервер</div></div></div>"
   },
   {
    "cap": "Сначала браузер сам шлёт разведчика — OPTIONS, спрашивая «мне можно PUT и этот заголовок?».",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">браузер</div><div class=\"fp-arrow fp-travel\">OPTIONS →</div><div class=\"fp-box mut\">сервер</div></div><div class=\"fp-row\"><div class=\"fp-tag\">Origin: shop.com</div><div class=\"fp-tag\">Request-Method: PUT</div></div></div>"
   },
   {
    "cap": "Сервер отвечает разрешением: этот origin можно, метод PUT можно, и помни это 600 секунд.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">сервер</div><div class=\"fp-arrow fp-travel\">← 204</div><div class=\"fp-box good fp-pulse-g\">браузер</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">Allow-Origin: shop.com</div><div class=\"fp-tag good\">Allow-Methods: PUT</div><div class=\"fp-tag\">Max-Age: 600</div></div></div>"
   },
   {
    "cap": "Разрешение получено — только теперь уходит настоящий PUT, и браузер отдаёт ответ скрипту.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">JS</div><div class=\"fp-arrow fp-travel\">PUT (реальный) →</div><div class=\"fp-box good\">сервер</div></div><div class=\"fp-arrow\">↓ 200 OK</div><div class=\"fp-tag good fp-pulse-g\">ответ виден скрипту</div></div>"
   },
   {
    "cap": "Итог: preflight — это «можно?» от браузера. CORS защищает не сервер, а пользователя в браузере.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">1. OPTIONS «можно?»</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">2. разрешено</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">3. реальный запрос</div></div><div class=\"fp-tag mut\">curl и бэкенд CORS не видят</div></div>"
   }
  ]
 },
 {
  "id": "wbf-oauth-pkce",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "OAuth2 Authorization Code + PKCE",
  "frames": [
   {
    "cap": "SPA хочет токен, но хранить client_secret в браузере нельзя — его украдут из кода страницы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box big acc\">SPA в браузере</div><div class=\"fp-tag bad fp-blink\">секрет хранить негде</div></div>"
   },
   {
    "cap": "Клиент загадывает случайный verifier и считает его хэш — challenge. Наружу пойдёт только хэш.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">verifier (тайна)</div><div class=\"fp-arrow\">SHA256 →</div><div class=\"fp-box\">challenge (хэш)</div></div><div class=\"fp-tag mut\">verifier остаётся дома</div></div>"
   },
   {
    "cap": "Юзера ведут на auth-сервер логиниться, передавая только challenge. Сервер его запоминает.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">SPA</div><div class=\"fp-arrow fp-travel\">/authorize + challenge →</div><div class=\"fp-box acc\">Auth-сервер</div></div><div class=\"fp-lane name\">сервер запомнил challenge</div></div>"
   },
   {
    "cap": "После логина назад через redirect прилетает короткий code. Сам по себе он бесполезен.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">Auth-сервер</div><div class=\"fp-arrow fp-travel\">← redirect ?code=abc</div><div class=\"fp-box\">SPA</div></div><div class=\"fp-tag mut\">code без verifier — мусор</div></div>"
   },
   {
    "cap": "Клиент меняет code на токен, прикладывая исходный verifier. Сервер проверяет: SHA256(verifier)==challenge.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">SPA</div><div class=\"fp-arrow fp-travel\">code + verifier →</div><div class=\"fp-box acc fp-pulse-a\">Auth-сервер</div></div><div class=\"fp-tag good\">хэш совпал ✓</div></div>"
   },
   {
    "cap": "Итог: токен выдан. Перехвативший code не знает verifier — обмен у него провалится.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">access_token</div><div class=\"fp-box good\">refresh_token</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">вор: code без verifier</div><div class=\"fp-conn\">⛔</div></div></div>"
   }
  ]
 },
 {
  "id": "wbf-http-caching-etag",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "HTTP-кэш: ETag и 304",
  "frames": [
   {
    "cap": "Клиент первый раз просит /profile. Тело едет целиком — это дорого по трафику.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">клиент</div><div class=\"fp-arrow fp-travel\">GET /profile →</div><div class=\"fp-box mut\">сервер</div></div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div></div>"
   },
   {
    "cap": "Ответ приходит с отпечатком ETag «v1» и сроком свежести. Клиент кладёт это в кэш.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">сервер</div><div class=\"fp-arrow fp-travel\">← 200 + тело</div><div class=\"fp-box good\">клиент</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">ETag: v1</div><div class=\"fp-tag\">max-age: 60</div></div></div>"
   },
   {
    "cap": "Пока ответ свеж по max-age, повторный запрос вообще не уходит в сеть — берём из кэша.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">кэш</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">страница</div></div><div class=\"fp-tag mut\">сети ноль</div></div>"
   },
   {
    "cap": "Свежесть истекла — клиент не качает заново, а спрашивает: «у тебя всё ещё v1?».",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">клиент</div><div class=\"fp-arrow fp-travel\">GET + If-None-Match: v1 →</div><div class=\"fp-box mut\">сервер</div></div></div>"
   },
   {
    "cap": "Ничего не менялось — сервер шлёт пустой 304. Тела нет, клиент переиспользует старую копию.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">сервер</div><div class=\"fp-arrow fp-travel\">← 304</div><div class=\"fp-box good fp-pulse-g\">клиент</div></div><div class=\"fp-bar\"><span style=\"width:4%\"></span></div><div class=\"fp-tag good\">трафик почти ноль</div></div>"
   },
   {
    "cap": "Если данные изменились — приходит 200 с новым телом и новым ETag «v2». Цикл повторяется.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">If-None-Match: v1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">200 + ETag: v2</div></div><div class=\"fp-tag\">Cache-Control = свежесть · ETag = ревалидация</div></div>"
   }
  ]
 },
 {
  "id": "wbf-websocket-upgrade",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "WebSocket: апгрейд и full-duplex",
  "frames": [
   {
    "cap": "Обычный HTTP: каждое сообщение — новый запрос-ответ. Для живых пушей это поллинг и задержки.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">клиент</div><div class=\"fp-arrow\">запрос →</div><div class=\"fp-box mut\">сервер</div></div><div class=\"fp-tag bad fp-blink\">опять спрашивать... опять...</div></div>"
   },
   {
    "cap": "Клиент шлёт обычный HTTP-запрос, но с просьбой сменить протокол: Upgrade: websocket.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">клиент</div><div class=\"fp-arrow fp-travel\">GET + Upgrade →</div><div class=\"fp-box mut\">сервер</div></div><div class=\"fp-tag\">Sec-WebSocket-Key</div></div>"
   },
   {
    "cap": "Сервер согласен: отвечает 101 Switching Protocols. То же TCP-соединение, но теперь это WebSocket.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">сервер</div><div class=\"fp-arrow fp-travel\">← 101</div><div class=\"fp-box good fp-pulse-g\">клиент</div></div><div class=\"fp-tag good\">канал открыт, не закрывается</div></div>"
   },
   {
    "cap": "Теперь обмен идёт кадрами. Сервер может слать сам, не дожидаясь запроса — поллинг не нужен.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">сервер</div><div class=\"fp-token fp-travel\">frame</div><div class=\"fp-box good\">клиент</div></div><div class=\"fp-tag\">push без вопроса</div></div>"
   },
   {
    "cap": "Full-duplex: оба пишут одновременно по одной линии, независимо друг от друга.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">клиент</div><div class=\"fp-arrow fp-travel\">→ frame</div><div class=\"fp-box acc\">сервер</div></div><div class=\"fp-row\"><div class=\"fp-box good\">клиент</div><div class=\"fp-arrow fp-travel\">← frame</div><div class=\"fp-box good\">сервер</div></div></div>"
   },
   {
    "cap": "Итог: один коннект — живой двусторонний поток. Плата: stateful-соединение, реконнекты, wss за TLS.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">1 TCP</div><div class=\"fp-conn\">⇄</div><div class=\"fp-box good\">full-duplex</div></div><div class=\"fp-row\"><div class=\"fp-tag bad\">stateful</div><div class=\"fp-tag bad\">реконнект</div><div class=\"fp-tag\">wss://</div></div></div>"
   }
  ]
 },
 {
  "id": "wbf-idempotency-key",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "Idempotency-Key на сервере",
  "frames": [
   {
    "cap": "POST /payments не идемпотентен. Если ответ потерялся, клиент ретраит — и боится списать дважды.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">клиент</div><div class=\"fp-arrow fp-travel\">POST /payments →</div><div class=\"fp-box mut\">сервер</div></div><div class=\"fp-tag bad fp-blink\">ответ потерялся в сети</div></div>"
   },
   {
    "cap": "Решение: клиент кладёт уникальный ключ на эту операцию и шлёт его в заголовке.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">клиент</div><div class=\"fp-arrow fp-travel\">POST + Idempotency-Key: K1 →</div><div class=\"fp-box mut\">сервер</div></div></div>"
   },
   {
    "cap": "Сервер атомарно вставляет K1 в таблицу. Вставка прошла — ключ новый, можно выполнять.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">K1</div><div class=\"fp-arrow\">INSERT →</div><div class=\"fp-box good fp-pulse-g\">уникальный индекс ✓</div></div><div class=\"fp-tag good\">первый раз</div></div>"
   },
   {
    "cap": "Сервер списывает деньги и сохраняет ответ рядом с ключом K1 — на будущее.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">списано 1 раз</div><div class=\"fp-arrow\">→</div><div class=\"fp-lane name\">K1 → 200 {paid}</div></div></div>"
   },
   {
    "cap": "Прилетает ретрай с тем же K1. Вставка падает на конфликте — операция НЕ повторяется.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">K1 снова</div><div class=\"fp-arrow\">INSERT →</div><div class=\"fp-box bad fp-pulse-r\">CONFLICT</div></div><div class=\"fp-tag mut\">второго списания нет</div></div>"
   },
   {
    "cap": "Итог: сервер отдаёт сохранённый ответ. Деньги списаны один раз. Принять заголовок мало — нужен дедуп.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">K1 → 200 {paid}</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box good fp-pulse-g\">тот же ответ</div></div><div class=\"fp-tag\">+ TTL чтобы таблица не пухла</div></div>"
   }
  ]
 },
 {
  "id": "bldf-mvn-lifecycle",
  "t": "Build",
  "g": "Сборка",
  "title": "Lifecycle-конвейер",
  "frames": [
   {
    "cap": "Lifecycle — это упорядоченная цепочка фаз, а не набор кнопок.",
    "html": "<div class='fp-row'><div class='fp-node'>validate</div><div class='fp-conn'></div><div class='fp-node'>compile</div><div class='fp-conn'></div><div class='fp-node'>test</div><div class='fp-conn'></div><div class='fp-node'>package</div><div class='fp-conn'></div><div class='fp-node'>verify</div><div class='fp-conn'></div><div class='fp-node'>install</div></div>"
   },
   {
    "cap": "Сама фаза пустая — работу делают goals плагинов, привязанные к ней.",
    "html": "<div class='fp-row'><div class='fp-col'><div class='fp-node acc'>compile</div><div class='fp-arrow'></div><div class='fp-box mut'>compiler:compile</div></div><div class='fp-col'><div class='fp-node acc'>test</div><div class='fp-arrow'></div><div class='fp-box mut'>surefire:test</div></div><div class='fp-col'><div class='fp-node acc'>package</div><div class='fp-arrow'></div><div class='fp-box mut'>jar:jar</div></div></div>"
   },
   {
    "cap": "Вызов mvn package запускает ВСЕ фазы до package включительно.",
    "html": "<div class='fp-row'><div class='fp-token'>mvn package</div><div class='fp-arrow'></div><div class='fp-node good fp-pulse-g'>validate</div><div class='fp-conn'></div><div class='fp-node good fp-pulse-g' style='animation-delay:.15s'>compile</div><div class='fp-conn'></div><div class='fp-node good fp-pulse-g' style='animation-delay:.3s'>test</div><div class='fp-conn'></div><div class='fp-node acc fp-pulse-a' style='animation-delay:.45s'>package</div></div>"
   },
   {
    "cap": "Фазы после цели не выполняются — install и deploy остаются нетронутыми.",
    "html": "<div class='fp-row'><div class='fp-node good'>package</div><div class='fp-conn'></div><div class='fp-node mut'>verify</div><div class='fp-conn'></div><div class='fp-node mut'>install</div><div class='fp-conn'></div><div class='fp-node mut'>deploy</div><div class='fp-box bad' style='margin-left:12px'>не дошло</div></div>"
   },
   {
    "cap": "Три независимых lifecycle: фазы clean и site не лежат в default.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-lane name'>clean</div><div class='fp-node acc'>pre-clean</div><div class='fp-conn'></div><div class='fp-node acc'>clean</div></div><div class='fp-row'><div class='fp-lane name'>default</div><div class='fp-node good'>compile</div><div class='fp-conn'></div><div class='fp-node good'>package</div></div><div class='fp-row'><div class='fp-lane name'>site</div><div class='fp-node mut'>site</div><div class='fp-conn'></div><div class='fp-node mut'>deploy</div></div></div>"
   }
  ]
 },
 {
  "id": "bldf-nearest-wins",
  "t": "Build",
  "g": "Сборка",
  "title": "Nearest-wins",
  "frames": [
   {
    "cap": "Одна и та же библиотека приходит транзитивно по двум путям с разными версиями.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-node acc'>my-app</div></div><div class='fp-row'><div class='fp-node'>A</div><div class='fp-conn'></div><div class='fp-box mut'>lib 2.0</div></div><div class='fp-row'><div class='fp-node'>B</div><div class='fp-conn'></div><div class='fp-node'>C</div><div class='fp-conn'></div><div class='fp-box mut'>lib 1.0</div></div></div>"
   },
   {
    "cap": "Maven меряет не номер версии, а глубину пути до корня.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-box mut'>lib 2.0</div><div class='fp-arrow'></div><div class='fp-val'>глубина 2</div></div><div class='fp-row'><div class='fp-box mut'>lib 1.0</div><div class='fp-arrow'></div><div class='fp-val'>глубина 3</div></div></div>"
   },
   {
    "cap": "Побеждает ближайшая — 1.0 проигрывает, хотя номер ниже.",
    "html": "<div class='fp-row'><div class='fp-box good fp-pulse-g'>lib 2.0<br>глубина 2</div><div class='fp-arrow'></div><div class='fp-token'>WIN</div><div class='fp-box bad' style='margin-left:16px'>lib 1.0<br>глубина 3</div></div>"
   },
   {
    "cap": "При равной глубине правит порядок объявления — first-declared.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-lane name'>pom</div><div class='fp-node acc fp-pulse-a'>X → lib 1.5</div><div class='fp-token'>1-й</div></div><div class='fp-row'><div class='fp-lane name'>pom</div><div class='fp-node mut'>Y → lib 1.8</div><div class='fp-val'>2-й</div></div></div>"
   },
   {
    "cap": "Тихо приехавшая старая версия рушит рантайм методом, которого в ней нет.",
    "html": "<div class='fp-row'><div class='fp-box good'>код зовёт<br>lib 2.0 API</div><div class='fp-arrow'></div><div class='fp-box mut'>в classpath<br>lib 1.0</div><div class='fp-arrow'></div><div class='fp-box bad fp-blink'>NoSuchMethodError</div></div>"
   },
   {
    "cap": "Фикс — прибить версию явно в своём pom или через dependencyManagement.",
    "html": "<div class='fp-row'><div class='fp-box acc'>&lt;dependencyManagement&gt;<br>lib 2.0</div><div class='fp-arrow'></div><div class='fp-node good fp-pulse-g'>my-app</div><div class='fp-arrow'></div><div class='fp-box good'>везде lib 2.0</div></div>"
   }
  ]
 },
 {
  "id": "bldf-bom-align",
  "t": "Build",
  "g": "Сборка",
  "title": "BOM-выравнивание",
  "frames": [
   {
    "cap": "Без BOM версии одного семействa расползаются и конфликтуют.",
    "html": "<div class='fp-row'><div class='fp-box bad'>jackson-core 2.12</div><div class='fp-box bad'>jackson-databind 2.15</div><div class='fp-box bad'>jackson-annotations 2.13</div></div>"
   },
   {
    "cap": "BOM — это pom-артефакт со списком согласованных версий.",
    "html": "<div class='fp-col'><div class='fp-box acc'>jackson-bom 2.15</div><div class='fp-arrow'></div><div class='fp-grid'><div class='fp-cell'>core 2.15</div><div class='fp-cell'>databind 2.15</div><div class='fp-cell'>annotations 2.15</div></div></div>"
   },
   {
    "cap": "Импортируешь BOM в dependencyManagement через scope=import.",
    "html": "<div class='fp-row'><div class='fp-box mut'>&lt;dependencyManagement&gt;<br>jackson-bom<br>scope=import</div><div class='fp-arrow'></div><div class='fp-node acc fp-pulse-a'>pom проекта</div></div>"
   },
   {
    "cap": "В dependencies версию больше не пишешь — её подставит BOM.",
    "html": "<div class='fp-row'><div class='fp-box good'>&lt;dependency&gt;<br>jackson-databind<br><span class='fp-val'>без version</span></div><div class='fp-arrow'></div><div class='fp-token'>2.15</div></div>"
   },
   {
    "cap": "Управляемая версия перекрывает даже транзитивный nearest-wins.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-node'>транзитив → databind 2.12</div></div><div class='fp-row'><div class='fp-box acc fp-pulse-a'>BOM управляет</div><div class='fp-arrow'></div><div class='fp-box good fp-pulse-g'>2.15</div></div></div>"
   },
   {
    "cap": "Итог: одна строка импорта — и всё семейство выровнено по одной версии.",
    "html": "<div class='fp-row'><div class='fp-node good'>core 2.15</div><div class='fp-conn'></div><div class='fp-node good'>databind 2.15</div><div class='fp-conn'></div><div class='fp-node good'>annotations 2.15</div></div>"
   }
  ]
 },
 {
  "id": "bldf-multi-module-reactor",
  "t": "Build",
  "g": "Сборка",
  "title": "Multi-module reactor",
  "frames": [
   {
    "cap": "Родительский pom с packaging=pom только агрегирует список модулей.",
    "html": "<div class='fp-col'><div class='fp-node acc'>parent (pom)</div><div class='fp-arrow'></div><div class='fp-row'><div class='fp-box mut'>model</div><div class='fp-box mut'>core</div><div class='fp-box mut'>api</div><div class='fp-box mut'>bootstrap</div></div></div>"
   },
   {
    "cap": "Reactor читает межмодульные зависимости, а не порядок в списке.",
    "html": "<div class='fp-row'><div class='fp-node'>bootstrap</div><div class='fp-arrow'></div><div class='fp-node'>core</div><div class='fp-arrow'></div><div class='fp-node'>model</div></div>"
   },
   {
    "cap": "Топологическая сортировка: зависимость собирается раньше зависимого.",
    "html": "<div class='fp-row'><div class='fp-node good fp-pulse-g'>model</div><div class='fp-conn'></div><div class='fp-node good fp-pulse-g' style='animation-delay:.2s'>core</div><div class='fp-conn'></div><div class='fp-node good fp-pulse-g' style='animation-delay:.4s'>api</div><div class='fp-conn'></div><div class='fp-node acc fp-pulse-a' style='animation-delay:.6s'>bootstrap</div></div>"
   },
   {
    "cap": "install кладёт модуль в .m2, чтобы следующий нашёл его как артефакт.",
    "html": "<div class='fp-row'><div class='fp-node good'>model</div><div class='fp-arrow'></div><div class='fp-box acc'>~/.m2 repo</div><div class='fp-arrow'></div><div class='fp-node'>core берёт model</div></div>"
   },
   {
    "cap": "Флаг -pl core -am соберёт core и всё, от чего он зависит.",
    "html": "<div class='fp-row'><div class='fp-token'>-pl core -am</div><div class='fp-arrow'></div><div class='fp-node good'>model</div><div class='fp-conn'></div><div class='fp-node good'>core</div><div class='fp-box mut' style='margin-left:12px'>api пропущен</div></div>"
   },
   {
    "cap": "Флаг -T строит независимые ветки графа параллельно.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-token'>mvn -T 4</div></div><div class='fp-row'><div class='fp-box good fp-pulse-g'>api</div><div class='fp-box good fp-pulse-g' style='animation-delay:.1s'>spi</div><div class='fp-val'>параллельно</div></div></div>"
   }
  ]
 },
 {
  "id": "bldf-impl-vs-api",
  "t": "Build",
  "g": "Сборка",
  "title": "implementation vs api",
  "frames": [
   {
    "cap": "Модуль lib зависит от guava — вопрос: видит ли её потребитель app.",
    "html": "<div class='fp-row'><div class='fp-node acc'>app</div><div class='fp-arrow'></div><div class='fp-node'>lib</div><div class='fp-arrow'></div><div class='fp-box mut'>guava</div></div>"
   },
   {
    "cap": "api: guava протекает в compile-classpath потребителя — стеклянная дверь.",
    "html": "<div class='fp-row'><div class='fp-box acc'>lib<br>api(guava)</div><div class='fp-arrow'></div><div class='fp-box bad fp-pulse-r'>app видит guava</div></div>"
   },
   {
    "cap": "implementation: guava спрятана, в classpath потребителя её нет — глухая дверь.",
    "html": "<div class='fp-row'><div class='fp-box good'>lib<br>implementation(guava)</div><div class='fp-arrow'></div><div class='fp-box mut'>app НЕ видит guava</div></div>"
   },
   {
    "cap": "Решает критерий: тип библиотеки торчит в публичной сигнатуре?",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-box bad'>public Cache get()</div><div class='fp-arrow'></div><div class='fp-token'>api</div></div><div class='fp-row'><div class='fp-box good'>private Cache c;</div><div class='fp-arrow'></div><div class='fp-token'>implementation</div></div></div>"
   },
   {
    "cap": "implementation режет связность: меняешь внутреннюю либу — app не пересобирается.",
    "html": "<div class='fp-row'><div class='fp-node mut'>guava bump</div><div class='fp-arrow'></div><div class='fp-node good fp-pulse-g'>lib пересобран</div><div class='fp-box mut' style='margin-left:12px'>app не тронут</div></div>"
   },
   {
    "cap": "В Maven аналог: транзитивный compile протекает, provided/runtime сужают.",
    "html": "<div class='fp-row'><div class='fp-box bad'>compile<br>протекает</div><div class='fp-box good'>provided<br>не транзитивен</div><div class='fp-box good'>runtime<br>только рантайм</div></div>"
   }
  ]
 },
 {
  "id": "bldf-deptree-diag",
  "t": "Build",
  "g": "Сборка",
  "title": "dependency:tree",
  "frames": [
   {
    "cap": "В рантайме падает конфликт версий — на глаз в pom его не видно.",
    "html": "<div class='fp-row'><div class='fp-node acc'>app</div><div class='fp-arrow'></div><div class='fp-box bad fp-blink'>ClassNotFound?<br>версия?</div></div>"
   },
   {
    "cap": "mvn dependency:tree печатает полное дерево с путями зависимостей.",
    "html": "<div class='fp-col'><div class='fp-token'>mvn dependency:tree</div><div class='fp-row'><div class='fp-node'>app</div><div class='fp-conn'></div><div class='fp-node'>A</div><div class='fp-conn'></div><div class='fp-box mut'>lib 2.0</div></div><div class='fp-row'><div class='fp-lane name'>+--</div><div class='fp-node'>B</div><div class='fp-conn'></div><div class='fp-box mut'>lib 1.0</div></div></div>"
   },
   {
    "cap": "Флаг -Dverbose показывает отброшенные узлы с причиной omitted.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-box good'>lib 2.0 (selected)</div></div><div class='fp-row'><div class='fp-box mut fp-blink'>lib 1.0 — omitted for conflict with 2.0</div></div></div>"
   },
   {
    "cap": "Фильтр -Dincludes сужает огромное дерево до одной библиотеки.",
    "html": "<div class='fp-row'><div class='fp-token'>-Dincludes=com.google:guava</div><div class='fp-arrow'></div><div class='fp-box good'>только ветки с guava</div></div>"
   },
   {
    "cap": "Видно виновника пути — модуль B притащил старую транзитивку.",
    "html": "<div class='fp-row'><div class='fp-node'>app</div><div class='fp-arrow'></div><div class='fp-node bad fp-pulse-r'>B</div><div class='fp-arrow'></div><div class='fp-box bad'>lib 1.0</div></div>"
   },
   {
    "cap": "Чинят: exclusion на лишнем пути или прибивают версию в management.",
    "html": "<div class='fp-row'><div class='fp-box acc'>&lt;exclusion&gt; на B</div><div class='fp-val'>или</div><div class='fp-box acc'>dependencyManagement → 2.0</div><div class='fp-arrow'></div><div class='fp-node good fp-pulse-g'>конфликт снят</div></div>"
   }
  ]
 },
 {
  "id": "grpcf-call-types",
  "t": "Web",
  "g": "gRPC",
  "title": "4 типа вызовов",
  "frames": [
   {
    "cap": "Unary: одно сообщение туда, одно обратно — простейший случай.",
    "html": "<div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-token fp-travel'>req</div><div class='fp-arrow'>→</div><div class='fp-node acc'>Server</div></div><div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-arrow'>←</div><div class='fp-token fp-travel'>resp</div><div class='fp-node acc'>Server</div></div>"
   },
   {
    "cap": "Server streaming: один запрос порождает поток ответов.",
    "html": "<div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-token'>req</div><div class='fp-arrow'>→</div><div class='fp-node acc'>Server</div></div><div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-arrow'>←</div><div class='fp-token fp-travel' style='animation-delay:0s'>r1</div><div class='fp-token fp-travel' style='animation-delay:.2s'>r2</div><div class='fp-token fp-travel' style='animation-delay:.4s'>r3</div><div class='fp-node acc'>Server</div></div>"
   },
   {
    "cap": "Client streaming: поток запросов, в конце — один ответ.",
    "html": "<div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-token fp-travel' style='animation-delay:0s'>q1</div><div class='fp-token fp-travel' style='animation-delay:.2s'>q2</div><div class='fp-token fp-travel' style='animation-delay:.4s'>q3</div><div class='fp-arrow'>→</div><div class='fp-node acc'>Server</div></div><div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-arrow'>←</div><div class='fp-token'>sum</div><div class='fp-node acc'>Server</div></div>"
   },
   {
    "cap": "Bidirectional: два независимых потока в обе стороны.",
    "html": "<div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-token fp-travel' style='animation-delay:0s'>→a</div><div class='fp-token fp-travel' style='animation-delay:.3s'>→b</div><div class='fp-conn'></div><div class='fp-node acc'>Server</div></div><div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-token fp-travel' style='animation-delay:.15s'>x←</div><div class='fp-token fp-travel' style='animation-delay:.45s'>y←</div><div class='fp-conn'></div><div class='fp-node acc'>Server</div></div>"
   },
   {
    "cap": "В proto всё различие — ключевое слово stream перед типом.",
    "html": "<div class='fp-col'><div class='fp-box'>rpc Get(Req) returns (Resp)</div><div class='fp-box good'>rpc Sub(Req) returns (<b>stream</b> Resp)</div><div class='fp-box good'>rpc Up(<b>stream</b> Req) returns (Resp)</div><div class='fp-box good'>rpc Chat(<b>stream</b> Req) returns (<b>stream</b> Resp)</div></div>"
   },
   {
    "cap": "Итог: один транспорт HTTP/2, четыре формы диалога по числу stream-сторон.",
    "html": "<div class='fp-grid'><div class='fp-cell acc'>Unary<br>1→1</div><div class='fp-cell acc'>Server<br>1→N</div><div class='fp-cell acc'>Client<br>N→1</div><div class='fp-cell acc'>Bidi<br>N↔N</div></div>"
   }
  ]
 },
 {
  "id": "grpcf-field-numbers",
  "t": "Web",
  "g": "gRPC",
  "title": "Номера полей",
  "frames": [
   {
    "cap": "На проводе поле — это номер плюс wire-type, имя отсутствует.",
    "html": "<div class='fp-row'><div class='fp-box'>name = 1</div><div class='fp-arrow'>→</div><div class='fp-token acc'>tag:1</div><div class='fp-token'>len</div><div class='fp-token'>bytes</div></div><div class='fp-row'><div class='fp-box mut'>имя «name» в байты НЕ едет</div></div>"
   },
   {
    "cap": "Переименовать поле безопасно — номер тот же, провод не заметит.",
    "html": "<div class='fp-col'><div class='fp-box bad'>string name = 1</div><div class='fp-arrow'>↓ rename</div><div class='fp-box good'>string full_name = 1</div><div class='fp-row'><div class='fp-token acc'>wire: tag=1</div><div class='fp-token good'>совпало</div></div></div>"
   },
   {
    "cap": "Сменить номер — ломает: старые данные читаются как чужое поле.",
    "html": "<div class='fp-col'><div class='fp-box'>string name = 1</div><div class='fp-arrow'>↓ номер 1→7</div><div class='fp-box bad'>string name = 7</div><div class='fp-row'><div class='fp-token bad fp-blink'>tag=1 теперь unknown</div></div></div>"
   },
   {
    "cap": "Новое поле берёт новый номер — старый клиент молча его пропустит.",
    "html": "<div class='fp-stack'><div class='fp-slot acc'>id = 1</div><div class='fp-slot acc'>name = 2</div><div class='fp-slot good fp-pulse-g'>email = 3 (new)</div></div><div class='fp-box mut'>old reader: tag=3 → skip, не падает</div>"
   },
   {
    "cap": "Удалил поле — закрепи номер через reserved, чтобы не переиспользовали.",
    "html": "<div class='fp-col'><div class='fp-box bad'>удалили phone = 4</div><div class='fp-box good'><b>reserved</b> 4;</div><div class='fp-box good'><b>reserved</b> \"phone\";</div></div>"
   },
   {
    "cap": "Итог: номера 1-15 — горячим полям, эволюция держится на номерах.",
    "html": "<div class='fp-row'><div class='fp-lane name'>1-15</div><div class='fp-bar'><span style='width:25%'></span></div><div class='fp-val'>1 байт тега</div></div><div class='fp-row'><div class='fp-lane name'>16+</div><div class='fp-bar'><span style='width:50%'></span></div><div class='fp-val'>2 байта тега</div></div>"
   }
  ]
 },
 {
  "id": "grpcf-http2-mux",
  "t": "Web",
  "g": "gRPC",
  "title": "HTTP/2 мультиплекс",
  "frames": [
   {
    "cap": "HTTP/1.1: один запрос на соединение, очередь блокирует.",
    "html": "<div class='fp-row'><div class='fp-node acc'>conn</div><div class='fp-token'>req1</div><div class='fp-token mut'>req2 ждёт</div><div class='fp-token mut'>req3 ждёт</div></div>"
   },
   {
    "cap": "HTTP/2: одно соединение, много стримов параллельно.",
    "html": "<div class='fp-col'><div class='fp-row'><div class='fp-node acc'>1 TCP conn</div><div class='fp-conn'></div></div><div class='fp-row'><div class='fp-lane name'>stream 1</div><div class='fp-token acc fp-travel' style='animation-delay:0s'>f</div></div><div class='fp-row'><div class='fp-lane name'>stream 3</div><div class='fp-token good fp-travel' style='animation-delay:.2s'>f</div></div><div class='fp-row'><div class='fp-lane name'>stream 5</div><div class='fp-token acc fp-travel' style='animation-delay:.4s'>f</div></div></div>"
   },
   {
    "cap": "Кадры разных стримов чередуются в одном потоке — interleaving.",
    "html": "<div class='fp-row'><div class='fp-token acc'>s1</div><div class='fp-token good'>s3</div><div class='fp-token acc'>s1</div><div class='fp-token good'>s3</div><div class='fp-token acc'>s5</div><div class='fp-token good'>s1</div></div>"
   },
   {
    "cap": "Заголовки жмутся HPACK — не шлём одни и те же байты повторно.",
    "html": "<div class='fp-row'><div class='fp-box bad'>headers raw 400B</div><div class='fp-arrow'>→HPACK→</div><div class='fp-box good'>~20B</div></div>"
   },
   {
    "cap": "Поэтому держим один долгоживущий канал, а не коннект на запрос.",
    "html": "<div class='fp-col'><div class='fp-box good'>ManagedChannel (reuse)</div><div class='fp-row'><div class='fp-token acc'>RPC</div><div class='fp-token acc'>RPC</div><div class='fp-token acc'>RPC</div><div class='fp-conn'></div><div class='fp-node acc'>1 conn</div></div></div>"
   },
   {
    "cap": "Итог: app-level HOL ушёл, но TCP-HOL остаётся — это уже к QUIC.",
    "html": "<div class='fp-grid'><div class='fp-cell good'>app HOL<br>решён</div><div class='fp-cell bad'>TCP HOL<br>есть</div><div class='fp-cell acc'>QUIC<br>лечит TCP-HOL</div></div>"
   }
  ]
 },
 {
  "id": "grpcf-deadline-propagation",
  "t": "Web",
  "g": "gRPC",
  "title": "Deadline по цепочке",
  "frames": [
   {
    "cap": "Клиент задаёт абсолютный deadline, а не таймаут на каждый хоп.",
    "html": "<div class='fp-row'><div class='fp-node acc'>Client</div><div class='fp-token acc'>deadline = T+300ms</div><div class='fp-arrow'>→</div><div class='fp-node acc'>A</div></div>"
   },
   {
    "cap": "Каждый сервис считает остаток и передаёт урезанный срок ниже.",
    "html": "<div class='fp-row'><div class='fp-node acc'>A</div><div class='fp-bar'><span style='width:80%'></span></div><div class='fp-arrow'>→</div><div class='fp-node acc'>B</div><div class='fp-bar'><span style='width:55%'></span></div><div class='fp-arrow'>→</div><div class='fp-node acc'>C</div></div><div class='fp-row'><div class='fp-val'>240ms</div><div class='fp-val'>160ms</div><div class='fp-val'>остаток падает</div></div>"
   },
   {
    "cap": "Срок один на всю цепочку — нижний не работает дольше верхнего.",
    "html": "<div class='fp-stack'><div class='fp-slot acc' style='width:100%'>A: 300ms</div><div class='fp-slot acc' style='width:80%'>B: ≤240ms</div><div class='fp-slot acc' style='width:53%'>C: ≤160ms</div></div>"
   },
   {
    "cap": "Истёк deadline — статус DEADLINE_EXCEEDED, отмена идёт вниз.",
    "html": "<div class='fp-row'><div class='fp-node acc'>A</div><div class='fp-arrow'>→</div><div class='fp-node acc'>B</div><div class='fp-arrow'>→</div><div class='fp-box bad fp-blink'>C: DEADLINE_EXCEEDED</div></div><div class='fp-row'><div class='fp-token bad'>cancel</div><div class='fp-arrow'>↓</div><div class='fp-token bad'>cancel вниз</div></div>"
   },
   {
    "cap": "Без deadline медленный низ держит потоки во всей цепочке.",
    "html": "<div class='fp-col'><div class='fp-box bad'>no deadline → C завис</div><div class='fp-row'><div class='fp-node acc fp-pulse-r'>A wait</div><div class='fp-node acc fp-pulse-r'>B wait</div><div class='fp-node bad fp-spin'>C hang</div></div></div>"
   },
   {
    "cap": "Итог: ставь deadline на клиенте и пробрасывай входящий context.",
    "html": "<div class='fp-col'><div class='fp-box good'>set deadline @ client</div><div class='fp-box good'>pass incoming ctx → downstream</div><div class='fp-box bad'>не создавай fresh ctx «с нуля»</div></div>"
   }
  ]
 },
 {
  "id": "rxf-request-backpressure",
  "t": "Reactive",
  "g": "Поток",
  "title": "request(n) и backpressure",
  "frames": [
   {
    "cap": "Быстрый источник и медленный потребитель — без управления темпом это путь к переполнению.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Publisher<br>(быстрый)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">Subscriber<br>(медленный)</div></div>"
   },
   {
    "cap": "При подписке Subscriber получает Subscription — канал обратной связи к источнику.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Publisher</div><div class=\"fp-conn\"></div><div class=\"fp-box good\">Subscriber</div></div><div class=\"fp-row\" style=\"justify-content:center\"><div class=\"fp-box mut\">Subscription</div></div>"
   },
   {
    "cap": "Subscriber явно просит ровно столько, сколько готов обработать: request(3).",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Publisher</div><div class=\"fp-arrow\" style=\"transform:scaleX(-1)\">→</div><div class=\"fp-box good\">Subscriber<br><span class=\"fp-token\">request(3)</span></div></div>"
   },
   {
    "cap": "Publisher эмитит не больше запрошенного — три токена едут к потребителю.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Publisher</div><div class=\"fp-token fp-travel\">1</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.2s\">2</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.4s\">3</div><div class=\"fp-box good\">Subscriber</div></div>"
   },
   {
    "cap": "Обработал — снова просит. Темп всегда задаёт потребитель, а не источник.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Publisher</div><div class=\"fp-arrow\" style=\"transform:scaleX(-1)\">→</div><div class=\"fp-box good\">Subscriber<br><span class=\"fp-token fp-pulse-g\">request(3)</span></div></div>"
   },
   {
    "cap": "Итог: спрос ≥ предложение — нет переполнения. Контракт Reactive Streams соблюдён.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">demand</div><div class=\"fp-box mut\">≥</div><div class=\"fp-box good\">supply</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">stable</div></div>"
   }
  ]
 },
 {
  "id": "rxf-hot-vs-cold",
  "t": "Reactive",
  "g": "Поток",
  "title": "hot vs cold",
  "frames": [
   {
    "cap": "Cold: первый подписчик подключается — источник стартует ЛИЧНО для него с начала.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Cold src</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">Sub A</div></div><div class=\"fp-row\"><div class=\"fp-token\">1</div><div class=\"fp-token\">2</div><div class=\"fp-token\">3</div></div>"
   },
   {
    "cap": "Второй подписчик — и источник снова крутит с самого начала, отдельный прогон.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Cold src</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">Sub B</div></div><div class=\"fp-row\"><div class=\"fp-token\">1</div><div class=\"fp-token\">2</div><div class=\"fp-token\">3</div></div>"
   },
   {
    "cap": "Hot: источник эмитит сам по себе, поток идёт независимо от подписчиков.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">Hot src</div><div class=\"fp-token fp-travel\">a</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.3s\">b</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.6s\">c</div></div>"
   },
   {
    "cap": "Подписчик подключается в момент c — видит только текущее и далее, a и b пропущены.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">Hot src</div><div class=\"fp-token mut\">a</div><div class=\"fp-token mut\">b</div><div class=\"fp-token fp-pulse-a\">c</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">Sub</div></div>"
   },
   {
    "cap": "share()/publish() превращают cold в hot: один прогон делится между всеми.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Cold</div><div class=\"fp-box mut\">share()</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box good\">Sub A</div><div class=\"fp-box good\">Sub B</div></div></div>"
   },
   {
    "cap": "Итог: cold = воспроизводимый с нуля для каждого; hot = разделяемый «живой» эфир.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">cold:<br>per-sub, lazy</div><div class=\"fp-box bad\">hot:<br>shared, live</div></div>"
   }
  ]
 },
 {
  "id": "rxf-map-vs-flatmap",
  "t": "Reactive",
  "g": "Поток",
  "title": "map vs flatMap",
  "frames": [
   {
    "cap": "map: каждый элемент преобразуется 1→1, тип меняется, структура потока — нет.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-travel\">1</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.35s\">2</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.7s\">3</div><div class=\"fp-conn pr-flow\"></div><div class=\"fp-box acc fp-pulse-a big\">map x10</div><div class=\"fp-conn pr-flow\" style=\"animation-delay:.2s\"></div><div class=\"fp-token good pr-fade\">10</div><div class=\"fp-token good pr-fade\" style=\"animation-delay:.35s\">20</div><div class=\"fp-token good pr-fade\" style=\"animation-delay:.7s\">30</div></div><div class=\"fp-row\"><div class=\"fp-tag acc\">1 &rarr; 1</div><div class=\"fp-tag mut\">тип меняется</div><div class=\"fp-tag good\">структура потока — нет</div></div></div>"
   },
   {
    "cap": "А если функция возвращает не значение, а целый Publisher (REST, БД)?",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token fp-travel\">id</div><div class=\"fp-conn pr-flow\"></div><div class=\"fp-box acc fp-pulse-a\">map(id &rarr; call(id))</div><div class=\"fp-conn pr-flow\" style=\"animation-delay:.25s\"></div><div class=\"fp-box warn pr-glow\">call() &rarr; Mono&lt;User&gt;</div></div><div class=\"fp-row\"><div class=\"fp-tag mut\">REST / БД возвращают Publisher, не значение</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box bad fp-pulse-r\">Flux&lt;Mono&lt;User&gt;&gt; — вложено!</div></div></div>"
   },
   {
    "cap": "map оставит вложенный поток-в-потоке — его никто не развернёт, это баг.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane bad\"><span class=\"name\">Flux</span><div class=\"fp-box bad pr-blink\">[ Mono ]</div><div class=\"fp-box bad pr-blink\" style=\"animation-delay:.4s\">[ Mono ]</div><div class=\"fp-box bad pr-blink\" style=\"animation-delay:.8s\">[ Mono ]</div></div><div class=\"fp-row\"><div class=\"fp-tag dead\">subscribe не вызван</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box bad fp-pulse-r\">поток-в-потоке никто не развернёт — баг</div></div></div>"
   },
   {
    "cap": "flatMap: каждый элемент → внутренний Publisher, на него подписываемся.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-token fp-travel\">a</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.45s\">b</div></div><div class=\"fp-conn pr-flow\"></div><div class=\"fp-box acc fp-pulse-a big\">flatMap</div><div class=\"fp-conn pr-flow\" style=\"animation-delay:.3s\"></div><div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut pr-fade\">Pub(a)</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token good pr-fade\" style=\"animation-delay:.3s\">a1</div><div class=\"fp-token good pr-fade\" style=\"animation-delay:.6s\">a2</div></div><div class=\"fp-row\"><div class=\"fp-box mut pr-fade\" style=\"animation-delay:.2s\">Pub(b)</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token good pr-fade\" style=\"animation-delay:.8s\">b1</div></div></div></div><div class=\"fp-row\"><div class=\"fp-tag acc pr-pulse\">на каждый внутренний Publisher — subscribe()</div></div></div>"
   },
   {
    "cap": "Внутренние потоки сливаются в один плоский — но порядок не гарантирован.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">Pub(a)</span><div class=\"fp-token acc pr-fade\">a1</div><div class=\"fp-token acc pr-fade\" style=\"animation-delay:.6s\">a2</div></div><div class=\"fp-lane\"><span class=\"name\">Pub(b)</span><div class=\"fp-token warn pr-fade\" style=\"animation-delay:.3s\">b1</div></div></div><div class=\"fp-conn pr-flow\"></div><div class=\"fp-row\"><div class=\"fp-box mut fp-pulse-g\">merged</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token good fp-travel\">a1</div><div class=\"fp-token good fp-travel\" style=\"animation-delay:.25s\">b1</div><div class=\"fp-token good fp-travel\" style=\"animation-delay:.5s\">a2</div><div class=\"fp-tag warn pr-blink\">порядок не гарантирован</div></div></div>"
   },
   {
    "cap": "Итог: map — синхрон 1→1; flatMap — асинхрон 1→Publisher + слияние. Порядок → concatMap.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box acc pr-glow big\">map</div><div class=\"fp-tag mut\">T &rarr; R</div><div class=\"fp-tag good\">синхрон, 1 &rarr; 1</div></div><div class=\"fp-col\"><div class=\"fp-box good pr-glow big\" style=\"animation-delay:.3s\">flatMap</div><div class=\"fp-tag mut\">T &rarr; Pub&lt;R&gt;</div><div class=\"fp-tag warn\">async + слияние</div></div><div class=\"fp-col\"><div class=\"fp-box warn pr-glow big\" style=\"animation-delay:.6s\">concatMap</div><div class=\"fp-tag mut\">T &rarr; Pub&lt;R&gt;</div><div class=\"fp-tag good\">порядок сохранён</div></div></div><div class=\"fp-row\"><div class=\"fp-tag acc pr-pulse\">нужен порядок &rarr; concatMap</div></div></div>"
   }
  ]
 },
 {
  "id": "rxf-subscribeon-publishon",
  "t": "Reactive",
  "g": "Поток",
  "title": "subscribeOn vs publishOn",
  "frames": [
   {
    "cap": "Цепочка операторов. Вопрос: на каком потоке что выполняется?",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">source</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">map</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">filter</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">subscribe</div></div>"
   },
   {
    "cap": "subscribeOn(elastic): подписка и старт источника уходят на elastic — вся цепочка стартует там.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">elastic</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">source</div><div class=\"fp-box mut\">map</div><div class=\"fp-box mut\">filter</div></div>"
   },
   {
    "cap": "Позиция subscribeOn не важна — хоть в начале, хоть в конце, эффект один и тот же.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">source</div><div class=\"fp-box acc\">subscribeOn</div><div class=\"fp-box mut\">map</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">map</div><div class=\"fp-box acc\">subscribeOn</div><div class=\"fp-box mut\">=одно</div></div>"
   },
   {
    "cap": "publishOn(parallel): всё, что НИЖЕ точки вставки, переезжает на parallel.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">elastic</div><div class=\"fp-box mut\">source</div><div class=\"fp-box mut\">map</div></div><div class=\"fp-row\"><div class=\"fp-box acc fp-pulse-a\">publishOn</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">parallel</div><div class=\"fp-box good\">filter</div></div>"
   },
   {
    "cap": "Позиция publishOn важна: это граница. До неё один поток, после — другой.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">A</div><div class=\"fp-box mut\">op1</div><div class=\"fp-conn\"></div><div class=\"fp-box acc\">publishOn</div><div class=\"fp-conn\"></div><div class=\"fp-lane name\">B</div><div class=\"fp-box good\">op2</div></div>"
   },
   {
    "cap": "Итог: subscribeOn = где стартует источник (всё вверх); publishOn = смена потока для всего вниз.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">subscribeOn:<br>старт (↑ всё)</div><div class=\"fp-box good\">publishOn:<br>граница (↓ всё)</div></div>"
   }
  ]
 },
 {
  "id": "rxf-onerrorresume",
  "t": "Reactive",
  "g": "Поток",
  "title": "onErrorResume цепочка",
  "frames": [
   {
    "cap": "Поток идёт нормально, элементы текут вниз по цепочке операторов.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">src</div><div class=\"fp-token fp-travel\">1</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.2s\">2</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">sub</div></div>"
   },
   {
    "cap": "Внутри оператора падает исключение — рождается терминальный сигнал onError.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">src</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">map ✗<br>onError</div></div>"
   },
   {
    "cap": "Сигнал ошибки летит вниз, обрывая поток — onNext больше не будет.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">onError</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">filter</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">sub: fail</div></div>"
   },
   {
    "cap": "onErrorResume перехватывает сигнал ошибки до того, как он дойдёт до подписчика.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">onError</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">onErrorResume</div></div>"
   },
   {
    "cap": "Оператор подставляет запасной Publisher — поток продолжается из fallback.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">onErrorResume</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">fallback src</div><div class=\"fp-token good\">9</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">sub: ok</div></div>"
   },
   {
    "cap": "Итог: ошибка = сигнал вниз; onErrorResume ловит upstream-ошибку и даёт новый поток.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">error signal ↓</div><div class=\"fp-box acc\">catch</div><div class=\"fp-box good\">new Publisher</div></div>"
   }
  ]
 },
 {
  "id": "rxf-nothing-without-subscribe",
  "t": "Reactive",
  "g": "Поток",
  "title": "Ничего без subscribe",
  "frames": [
   {
    "cap": "Собрали цепочку операторов — выглядит как готовый рабочий конвейер.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">source</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">map</div><div class=\"fp-arrow\">→</div><div class=\"fp-box mut\">filter</div></div>"
   },
   {
    "cap": "Но это лишь описание (рецепт): ни один элемент ещё не эмитился.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">recipe</div><div class=\"fp-box mut\">0 events</div><div class=\"fp-box mut\">idle</div></div>"
   },
   {
    "cap": "Нет subscribe — нет вызовов: HTTP, БД, side-effects молчат. Тихий баг.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">REST —</div><div class=\"fp-box bad\">DB —</div><div class=\"fp-box bad\">log —</div></div>"
   },
   {
    "cap": "subscribe() запускает сигнал вверх по цепочке к источнику.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">source</div><div class=\"fp-arrow\" style=\"transform:scaleX(-1)\">→</div><div class=\"fp-box mut\">map</div><div class=\"fp-arrow\" style=\"transform:scaleX(-1)\">→</div><div class=\"fp-box good fp-pulse-g\">subscribe()</div></div>"
   },
   {
    "cap": "Теперь источник эмитит — элементы реально текут вниз, конвейер ожил.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">source</div><div class=\"fp-token fp-travel\">1</div><div class=\"fp-token fp-travel\" style=\"animation-delay:.2s\">2</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">sub</div></div>"
   },
   {
    "cap": "Итог: цепочка ленива. В WebFlux подписывается фреймворк; block() — синхронная подписка.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">build = lazy</div><div class=\"fp-box good\">subscribe = run</div></div>"
   }
  ]
 },
 {
  "id": "sdf-rate-limiter-token-bucket",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Rate limiter: token bucket",
  "frames": [
   {
    "cap": "Поток запросов бьёт в сервис без ограничения — нагрузка непредсказуема.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">req</div><div class=\"fp-box mut\">req</div><div class=\"fp-box mut\">req</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">сервис перегружен</div></div>"
   },
   {
    "cap": "Ставим ведро ёмкостью N жетонов перед сервисом.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">bucket: capacity = 5</div><div class=\"fp-row\"><div class=\"fp-token\">●</div><div class=\"fp-token\">●</div><div class=\"fp-token\">●</div><div class=\"fp-token\">●</div><div class=\"fp-token\">●</div></div></div>"
   },
   {
    "cap": "Жетоны капают с постоянной скоростью refill rate, переполнение отбрасывается.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">refill: +2 / сек</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box acc\">bucket [●●●]</div></div>"
   },
   {
    "cap": "Запрос берёт жетон — если есть, проходит к сервису.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">req</div><div class=\"fp-conn\">тратит ●</div><div class=\"fp-box acc\">bucket [●●]</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">200 OK</div></div>"
   },
   {
    "cap": "Ведро пусто — запрос отклоняется кодом 429.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">req</div><div class=\"fp-conn\">нет ●</div><div class=\"fp-box bad\">bucket [ ]</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-blink\">429</div></div>"
   },
   {
    "cap": "Итог: всплеск до capacity разрешён, средний RPS ограничен refill rate.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">burst</div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-val\">≤ capacity</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">средний</div><div class=\"fp-bar\"><span style=\"width:40%\"></span></div><div class=\"fp-val\">= refill</div></div></div>"
   }
  ]
 },
 {
  "id": "sdf-url-shortener",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Сокращатель ссылок",
  "frames": [
   {
    "cap": "Длинный URL неудобно делиться — нужен короткий вид.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">site.com/very/long/path?a=1&b=2</div><div class=\"fp-arrow\">⇒</div><div class=\"fp-box acc\">s.co/aB3xQ</div></div>"
   },
   {
    "cap": "На запись генерируем короткий ключ из счётчика через base62.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">counter = 1000000</div><div class=\"fp-arrow\">→ base62 →</div><div class=\"fp-box acc\">aB3xQ</div></div>"
   },
   {
    "cap": "Сохраняем пару ключ→URL в key-value хранилище.",
    "html": "<div class=\"fp-grid\"><div class=\"fp-cell\">key</div><div class=\"fp-cell\">long_url</div><div class=\"fp-cell acc\">aB3xQ</div><div class=\"fp-cell\">site.com/...</div></div>"
   },
   {
    "cap": "Чтение массовое: сначала смотрим в кэш.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">GET aB3xQ</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">Redis cache HIT</div></div>"
   },
   {
    "cap": "Промах кэша — идём в БД и прогреваем кэш.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">cache MISS</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">DB</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">set cache</div></div>"
   },
   {
    "cap": "Отдаём редирект 301 на оригинальный URL.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">s.co/aB3xQ</div><div class=\"fp-arrow\">301 →</div><div class=\"fp-box good fp-pulse-g\">site.com/...</div></div>"
   }
  ]
 },
 {
  "id": "sdf-feed-fanout",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Fan-out ленты",
  "frames": [
   {
    "cap": "Юзер публикует пост — надо доставить его в ленты подписчиков.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">автор</div><div class=\"fp-arrow\">post</div><div class=\"fp-box mut\">подписчики: A B C</div></div>"
   },
   {
    "cap": "Push: на запись копируем пост в ленту каждого подписчика.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">post</div><div class=\"fp-conn\">fan-out</div><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">лента A</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.2s\">лента B</div><div class=\"fp-box good fp-pulse-g\" style=\"animation-delay:.4s\">лента C</div></div></div>"
   },
   {
    "cap": "Зато чтение мгновенное — лента уже собрана.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">A</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">готовая лента: O(1)</div></div>"
   },
   {
    "cap": "Pull: лента собирается на чтение из постов авторов.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">A</div><div class=\"fp-arrow\">read</div><div class=\"fp-box mut\">merge постов авторов</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">тяжёлое чтение</div></div>"
   },
   {
    "cap": "Знаменитость с миллионами подписчиков ломает push на записи.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc fp-pulse-r\">star</div><div class=\"fp-conn\">10M fan-out</div><div class=\"fp-box bad fp-blink\">взрыв записи</div></div>"
   },
   {
    "cap": "Итог: гибрид — обычные через push, звёзды через pull, мерж на чтении.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">обычные</div><div class=\"fp-box good\">push</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">звёзды</div><div class=\"fp-box acc\">pull</div></div><div class=\"fp-box good\">read = push-лента + pull-звёзды</div></div>"
   }
  ]
 },
 {
  "id": "sdf-payment-ledger-double-entry",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Леджер double-entry",
  "frames": [
   {
    "cap": "Перевод 100 от Алисы к Бобу — нельзя потерять или удвоить деньги.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">Alice</div><div class=\"fp-arrow\">100</div><div class=\"fp-node acc\">Bob</div></div>"
   },
   {
    "cap": "Одна транзакция порождает две проводки: debit и credit.",
    "html": "<div class=\"fp-grid\"><div class=\"fp-cell\">account</div><div class=\"fp-cell\">debit</div><div class=\"fp-cell\">credit</div><div class=\"fp-cell acc\">Alice</div><div class=\"fp-cell\">100</div><div class=\"fp-cell\">—</div><div class=\"fp-cell acc\">Bob</div><div class=\"fp-cell\">—</div><div class=\"fp-cell\">100</div></div>"
   },
   {
    "cap": "Инвариант: сумма проводок транзакции всегда равна нулю.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad\">-100</div><div class=\"fp-box good\">+100</div><div class=\"fp-arrow\">=</div><div class=\"fp-box good fp-pulse-g\">0</div></div>"
   },
   {
    "cap": "Леджер append-only: записи только добавляются, не правятся.",
    "html": "<div class=\"fp-stack\"><div class=\"fp-slot\">tx1 -100/+100</div><div class=\"fp-slot\">tx2 -50/+50</div><div class=\"fp-slot acc fp-pulse-a\">tx3 -100/+100</div></div>"
   },
   {
    "cap": "Ошибку не удаляют — гасят обратной проводкой reversal.",
    "html": "<div class=\"fp-stack\"><div class=\"fp-slot bad\">tx5 -100/+100 (ошибка)</div><div class=\"fp-slot good fp-pulse-g\">tx6 +100/-100 (reversal)</div></div>"
   },
   {
    "cap": "Баланс счёта = свёртка всех его проводок.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">Σ проводок Bob</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">balance = +50</div></div>"
   }
  ]
 },
 {
  "id": "sdf-consistent-hashing-cache",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Консистентное хеширование",
  "frames": [
   {
    "cap": "Наивный hash % N: при смене N почти все ключи переезжают.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">N: 4 → 5</div><div class=\"fp-arrow\">⇒</div><div class=\"fp-box bad fp-blink\">~all keys remap</div></div>"
   },
   {
    "cap": "Кладём ноды на кольцо по их хешу.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">N1@10</div><div class=\"fp-node acc\">N2@40</div><div class=\"fp-node acc\">N3@80</div><div class=\"fp-conn\">кольцо 0..99</div></div>"
   },
   {
    "cap": "Ключ хешируется в ту же окружность и идёт к ближайшей ноде по часовой.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">key@25</div><div class=\"fp-arrow fp-travel\">→ cw →</div><div class=\"fp-node acc fp-pulse-a\">N2@40</div></div>"
   },
   {
    "cap": "Добавили ноду — переезжает только сегмент перед ней.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node good fp-pulse-g\">N4@30</div><div class=\"fp-conn\">забирает 10..30</div><div class=\"fp-box mut\">остальное на месте</div></div>"
   },
   {
    "cap": "Vnodes размазывают каждую ноду на много точек для равномерности.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">N1·a</div><div class=\"fp-node acc\">N1·b</div><div class=\"fp-node acc\">N1·c</div><div class=\"fp-val\">vnodes → ровная нагрузка</div></div>"
   },
   {
    "cap": "Итог: смена топологии двигает лишь ~1/N ключей.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">remap</div><div class=\"fp-bar\"><span style=\"width:15%\"></span></div><div class=\"fp-val good\">≈ 1/N</div></div>"
   }
  ]
 },
 {
  "id": "sdf-capacity-estimation",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Прикидка нагрузки",
  "frames": [
   {
    "cap": "Старт: 100 млн DAU, по 10 действий в день на юзера.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">DAU = 10^8</div><div class=\"fp-box acc\">× 10 действий</div><div class=\"fp-arrow\">=</div><div class=\"fp-box good\">10^9 / день</div></div>"
   },
   {
    "cap": "Средний QPS = действия в день / 86400 секунд.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">10^9 / 10^5 с</div><div class=\"fp-arrow\">≈</div><div class=\"fp-box good fp-pulse-g\">10 000 QPS</div></div>"
   },
   {
    "cap": "Пиковый QPS = средний × 2-3.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">avg</div><div class=\"fp-bar\"><span style=\"width:33%\"></span></div><div class=\"fp-lane name\">peak</div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-val\">≈ 30k QPS</div></div>"
   },
   {
    "cap": "Read/write обычно перекошен — это диктует кэш и реплики.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">read 100</div><div class=\"fp-box bad\">write 1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">кэш + реплики чтения</div></div>"
   },
   {
    "cap": "Хранилище = записей/день × размер × дни хранения.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">10^7 зап/день</div><div class=\"fp-box mut\">× 1 КБ</div><div class=\"fp-box mut\">× 365</div><div class=\"fp-arrow\">≈</div><div class=\"fp-box good\">~3.6 ТБ/год</div></div>"
   },
   {
    "cap": "Итог: учитываем репликацию ×3 и индексы — закладываем запас.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">3.6 ТБ</div><div class=\"fp-arrow\">× 3 репл.</div><div class=\"fp-box good fp-pulse-g\">~11 ТБ raw</div></div>"
   }
  ]
 },
 {
  "id": "sdf-replication-sync-async",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Репликация sync/async",
  "frames": [
   {
    "cap": "Клиент пишет в primary, есть реплика для надёжности.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node\">client</div><div class=\"fp-arrow\">write</div><div class=\"fp-node acc\">primary</div><div class=\"fp-conn\">repl</div><div class=\"fp-node\">replica</div></div>"
   },
   {
    "cap": "Sync: primary ждёт ack от реплики, только потом отвечает клиенту.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">primary</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-node\">replica</div><div class=\"fp-arrow\">ack →</div><div class=\"fp-box good fp-pulse-g\">OK клиенту</div></div>"
   },
   {
    "cap": "Sync надёжен: падение primary не теряет данные, но latency выше.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">0 потерь</div><div class=\"fp-lane name\">latency</div><div class=\"fp-bar\"><span style=\"width:90%\"></span></div></div>"
   },
   {
    "cap": "Async: primary отвечает сразу, реплика догоняет потом.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">primary</div><div class=\"fp-arrow\">OK сразу →</div><div class=\"fp-box good fp-pulse-g\">клиент</div><div class=\"fp-conn fp-blink\">repl потом</div><div class=\"fp-node mut\">replica</div></div>"
   },
   {
    "cap": "Async быстр, но падение primary теряет нереплицированный хвост.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">primary down</div><div class=\"fp-arrow\">⇒</div><div class=\"fp-box bad\">lag-хвост потерян</div></div>"
   },
   {
    "cap": "Итог: выбор по требованию durability против latency; semi-sync как компромисс.",
    "html": "<div class=\"fp-grid\"><div class=\"fp-cell\">режим</div><div class=\"fp-cell\">потери</div><div class=\"fp-cell\">latency</div><div class=\"fp-cell good\">sync</div><div class=\"fp-cell\">нет</div><div class=\"fp-cell\">высокая</div><div class=\"fp-cell bad\">async</div><div class=\"fp-cell\">хвост</div><div class=\"fp-cell\">низкая</div></div>"
   }
  ]
 },
 {
  "id": "sdf-sharding-by-key",
  "t": "System Design",
  "g": "Кейсы",
  "title": "Шардирование по ключу",
  "frames": [
   {
    "cap": "Одна БД не тянет объём данных и нагрузку.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">single DB</div><div class=\"fp-arrow\">⇒</div><div class=\"fp-box bad fp-blink\">упёрлись в потолок</div></div>"
   },
   {
    "cap": "Бьём данные на шарды, ключ определяет адрес.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">shard 0</div><div class=\"fp-node acc\">shard 1</div><div class=\"fp-node acc\">shard 2</div><div class=\"fp-conn\">shard key</div></div>"
   },
   {
    "cap": "Hash-based: shard = hash(key) % N — ровное распределение.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">user 42</div><div class=\"fp-arrow\">hash % 3</div><div class=\"fp-node acc fp-pulse-a\">shard 1</div></div>"
   },
   {
    "cap": "Range-based: по диапазонам ключа — удобны range-запросы.",
    "html": "<div class=\"fp-grid\"><div class=\"fp-cell\">диапазон</div><div class=\"fp-cell\">shard</div><div class=\"fp-cell\">A-H</div><div class=\"fp-cell acc\">0</div><div class=\"fp-cell\">I-P</div><div class=\"fp-cell acc\">1</div><div class=\"fp-cell\">Q-Z</div><div class=\"fp-cell acc\">2</div></div>"
   },
   {
    "cap": "Опасность hotspot: кривой ключ перегружает один шард.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane name\">shard 0</div><div class=\"fp-bar\"><span style=\"width:95%\"></span></div><div class=\"fp-lane name\">shard 1</div><div class=\"fp-bar\"><span style=\"width:20%\"></span></div></div>"
   },
   {
    "cap": "Итог: хороший ключ держит запрос в одном шарде; кросс-шард — дорого.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">1 запрос → 1 шард</div><div class=\"fp-arrow\">vs</div><div class=\"fp-box bad\">cross-shard join</div></div>"
   }
  ]
 },
 {
  "id": "cryptof-aes-symmetric",
  "t": "Crypto",
  "g": "Шифрование",
  "title": "Симметричное шифрование (AES)",
  "frames": [
   {
    "cap": "Открытый текст нужно передать так, чтобы перехватчик его не прочитал.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">«Перевести 100$»</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-r\">канал виден всем</div></div>"
   },
   {
    "cap": "У отправителя и получателя один общий секретный ключ.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">Алиса 🔑=K</div><div class=\"fp-conn\">один и тот же K</div><div class=\"fp-box acc\">Боб 🔑=K</div></div>"
   },
   {
    "cap": "AES ключом K превращает текст в нечитаемый шифр.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">текст</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">AES(K)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">9F2A...C1</div></div>"
   },
   {
    "cap": "По открытому каналу едет только шифр — перехватчику он бесполезен.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">9F2A...C1</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-conn\">перехватчик видит мусор</div><div class=\"fp-box bad\">??</div></div>"
   },
   {
    "cap": "Боб тем же ключом K расшифровывает обратно в исходный текст.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">9F2A...C1</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">AES⁻¹(K)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">«Перевести 100$»</div></div>"
   },
   {
    "cap": "Минус симметрии: один ключ на двоих — как его доставить безопасно?",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">шифрует трафик быстро</div><div class=\"fp-val\">+</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">обмен ключом K</div><div class=\"fp-val\">− проблема</div></div></div>"
   }
  ]
 },
 {
  "id": "cryptof-asymmetric-keys",
  "t": "Crypto",
  "g": "Шифрование",
  "title": "Асимметрия: открытый и закрытый ключ",
  "frames": [
   {
    "cap": "У владельца генерируется пара математически связанных ключей.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">keygen</div><div class=\"fp-arrow\">→</div><div class=\"fp-col\"><div class=\"fp-box good\">🔓 публичный</div><div class=\"fp-box bad\">🔒 приватный (секрет)</div></div></div>"
   },
   {
    "cap": "Публичный ключ можно раздавать всем без опаски.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">🔓 pub</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box mut\">Алиса</div><div class=\"fp-box mut\">мир</div><div class=\"fp-box mut\">Боб</div></div>"
   },
   {
    "cap": "Алиса шифрует сообщение публичным ключом Боба.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">привет</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-a\">enc(🔓pub)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">A7E0...</div></div>"
   },
   {
    "cap": "Перехватчик имеет публичный ключ, но расшифровать им НЕ может.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">A7E0...</div><div class=\"fp-conn\">+ 🔓pub</div><div class=\"fp-box bad fp-blink\">не выйдет</div></div>"
   },
   {
    "cap": "Только Боб своим приватным ключом раскрывает сообщение.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">A7E0...</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-a\">dec(🔒priv)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">привет</div></div>"
   },
   {
    "cap": "Минус: медленно — поэтому асимметрией шифруют только ключ для AES.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">AES</div><div class=\"fp-bar\"><span style=\"width:100%\"></span></div><div class=\"fp-val\">быстро</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">RSA</div><div class=\"fp-bar\"><span style=\"width:8%\"></span></div><div class=\"fp-val\">медленно</div></div></div>"
   }
  ]
 },
 {
  "id": "cryptof-digital-signature",
  "t": "Crypto",
  "g": "Шифрование",
  "title": "Цифровая подпись",
  "frames": [
   {
    "cap": "Есть документ, нужно доказать что его автор — именно Алиса.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">договор.pdf</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">а вдруг подделка?</div></div>"
   },
   {
    "cap": "Алиса считает хеш документа — короткий отпечаток.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">договор.pdf</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">hash</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">H</div></div>"
   },
   {
    "cap": "Хеш шифруется ПРИВАТНЫМ ключом Алисы — получается подпись.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token\">H</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad fp-pulse-a\">enc(🔒priv Алисы)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc\">sign</div></div>"
   },
   {
    "cap": "Боб расшифровывает подпись ПУБЛИЧНЫМ ключом Алисы → хеш H.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">sign</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-a\">dec(🔓pub Алисы)</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">H</div></div>"
   },
   {
    "cap": "Боб сам хеширует документ и сравнивает два хеша.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box mut\">документ</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">hash</div><div class=\"fp-arrow\">→</div><div class=\"fp-token\">H'</div></div><div class=\"fp-row\"><div class=\"fp-token\">H</div><div class=\"fp-conn\">H == H' ?</div><div class=\"fp-token\">H'</div></div></div>"
   },
   {
    "cap": "Совпало — автор подтверждён и текст не меняли. Не совпало — отказ.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">H = H' → ✓ подлинно</div><div class=\"fp-arrow\">/</div><div class=\"fp-box bad fp-blink\">H ≠ H' → ✗</div></div>"
   }
  ]
 },
 {
  "id": "cryptof-hash-salt-password",
  "t": "Crypto",
  "g": "Шифрование",
  "title": "Хеш + соль для паролей",
  "frames": [
   {
    "cap": "Хранить пароль в открытом виде нельзя — утечка базы = всё пропало.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box bad fp-pulse-r\">db: pass = «qwerty»</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">утечка → катастрофа</div></div>"
   },
   {
    "cap": "Хеш необратим: из отпечатка пароль не вытащить.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">qwerty</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">hash</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">65E0…</div><div class=\"fp-conn\">обратно нельзя</div></div>"
   },
   {
    "cap": "Голый хеш ломается радужной таблицей готовых хешей.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">65E0…</div><div class=\"fp-conn\">поиск в таблице</div><div class=\"fp-box bad fp-blink\">= qwerty</div></div>"
   },
   {
    "cap": "К паролю добавляем уникальную случайную соль и хешируем вместе.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">qwerty</div><div class=\"fp-val\">+</div><div class=\"fp-token\">🧂x9F</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">hash</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good\">A11B…</div></div>"
   },
   {
    "cap": "В базе: соль (открыто) + хеш. Радужные таблицы бесполезны.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-lane name\">user1</div><div class=\"fp-cell\">🧂x9F</div><div class=\"fp-cell\">A11B…</div></div><div class=\"fp-row\"><div class=\"fp-lane name\">user2</div><div class=\"fp-cell\">🧂c2D</div><div class=\"fp-cell\">77E4…</div></div></div>"
   },
   {
    "cap": "Проверка: тот же пароль + та же соль → хеш сходится. Алгоритм медленный.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">ввод + 🧂x9F</div><div class=\"fp-arrow\">→</div><div class=\"fp-box acc fp-pulse-a\">argon2 (медленно)</div><div class=\"fp-arrow\">→</div><div class=\"fp-box good fp-pulse-g\">= A11B… ✓</div></div>"
   }
  ]
 },
 {
  "id": "cryptof-tls-handshake",
  "t": "Crypto",
  "g": "Шифрование",
  "title": "TLS-хендшейк по шагам",
  "frames": [
   {
    "cap": "Клиент здоровается: список шифров + случайное число.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">client</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box mut\">ClientHello: шифры, rnd-C</div><div class=\"fp-arrow\">→</div><div class=\"fp-node acc\">server</div></div>"
   },
   {
    "cap": "Сервер выбирает шифр, отвечает Hello и шлёт свой сертификат.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">server</div><div class=\"fp-arrow fp-travel\">→</div><div class=\"fp-box good\">ServerHello: шифр, rnd-S</div><div class=\"fp-box acc\">📜 cert + 🔓pub</div></div>"
   },
   {
    "cap": "Клиент проверяет сертификат по цепочке до корневого CA.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">📜 cert</div><div class=\"fp-conn\">→ intermediate → root CA</div><div class=\"fp-box good fp-pulse-g\">доверяю</div></div>"
   },
   {
    "cap": "Стороны выводят общий сессионный ключ (обмен ключами DH).",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">client</div><div class=\"fp-conn\">DH-обмен</div><div class=\"fp-node acc\">server</div><div class=\"fp-arrow\">⇒</div><div class=\"fp-box good fp-pulse-a\">общий ключ K</div></div>"
   },
   {
    "cap": "Готово: дальше весь трафик шифруется быстрым AES на ключе K.",
    "html": "<div class=\"fp-row\"><div class=\"fp-node acc\">client</div><div class=\"fp-conn\">AES(K)</div><div class=\"fp-arrow fp-travel\">⇄</div><div class=\"fp-node acc\">server</div><div class=\"fp-box good fp-pulse-g\">🔒 защищено</div></div>"
   }
  ]
 },
 {
  "id": "cryptof-pki-cert-chain",
  "t": "Crypto",
  "g": "Шифрование",
  "title": "Цепочка сертификатов PKI",
  "frames": [
   {
    "cap": "Сайт показывает сертификат — но почему ему вообще верить?",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">📜 cert для bank.kz</div><div class=\"fp-arrow\">→</div><div class=\"fp-box bad\">кто поручится?</div></div>"
   },
   {
    "cap": "Сертификат сайта подписан промежуточным центром (intermediate CA).",
    "html": "<div class=\"fp-row\"><div class=\"fp-box acc\">📜 bank.kz</div><div class=\"fp-conn\">подписан 🔒</div><div class=\"fp-box good\">intermediate CA</div></div>"
   },
   {
    "cap": "Промежуточный центр, в свою очередь, подписан корневым CA.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good\">intermediate CA</div><div class=\"fp-conn\">подписан 🔒</div><div class=\"fp-box acc\">root CA</div></div>"
   },
   {
    "cap": "Корневой сертификат уже вшит в браузер и ОС — якорь доверия.",
    "html": "<div class=\"fp-stack\"><div class=\"fp-slot mut\">bank.kz</div><div class=\"fp-slot good\">intermediate</div><div class=\"fp-slot acc fp-pulse-g\">root CA (в браузере)</div></div>"
   },
   {
    "cap": "Браузер идёт по цепочке вверх, проверяя каждую подпись публичным ключом.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box mut\">bank.kz</div><div class=\"fp-arrow\">↑</div><div class=\"fp-box good\">interm ✓</div><div class=\"fp-arrow\">↑</div><div class=\"fp-box acc fp-pulse-a\">root ✓</div></div>"
   },
   {
    "cap": "Дошли до доверенного корня — сертификат принят. Любой разрыв → отказ.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">цепочка целая → 🔒 принято</div></div><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">звено отозвано/просрочено → ✗</div></div></div>"
   }
  ]
 },
 {
  "id": "fp-gc-roots",
  "t": "JVM",
  "g": "Сборка мусора",
  "title": "GC roots и достижимость",
  "frames": [
   {
    "cap": "Корни GC: локальные на стеке живых потоков, static-поля, JNI.",
    "html": "<div class=\"fp-col\">\n  <span class=\"fp-tag\">GC ROOTS — точки опоры</span>\n  <div class=\"fp-row\">\n    <div class=\"fp-box acc fp-pulse-a\">🧵 стек потока<br><span class=\"fp-tag\">локальные var</span></div>\n    <div class=\"fp-box acc fp-pulse-a\">📌 static-поля<br><span class=\"fp-tag\">класса</span></div>\n    <div class=\"fp-box acc fp-pulse-a\">🔌 JNI-ссылки<br><span class=\"fp-tag\">native</span></div>\n  </div>\n  <div class=\"fp-arrow\">↓</div>\n  <span class=\"fp-tag mut\">от них стартует обход кучи</span>\n</div>"
   },
   {
    "cap": "GC красит всё достижимое от корней по ссылкам — цепочка живая.",
    "html": "<div class=\"fp-col\">\n  <div class=\"fp-box acc fp-pulse-a\">🧵 root: локальная ссылка</div>\n  <div class=\"fp-arrow fp-pulse-g\">↓</div>\n  <div class=\"fp-row\">\n    <div class=\"fp-node good fp-pulse-g\">A</div>\n    <div class=\"fp-conn\"></div>\n    <div class=\"fp-node good fp-pulse-g\">B</div>\n    <div class=\"fp-conn\"></div>\n    <div class=\"fp-node good fp-pulse-g\">C</div>\n  </div>\n  <span class=\"fp-tag\" style=\"border-color:var(--good)\">✅ MARK — достижимо = живое</span>\n</div>"
   },
   {
    "cap": "Объекты без пути от корней не покрашены — это кандидаты в мусор.",
    "html": "<div class=\"fp-col\">\n  <div class=\"fp-row\">\n    <div class=\"fp-box acc\">🧵 root</div>\n    <div class=\"fp-arrow fp-pulse-g\">→</div>\n    <div class=\"fp-node good\">A</div>\n    <div class=\"fp-conn\"></div>\n    <div class=\"fp-node good\">B</div>\n  </div>\n  <span class=\"fp-tag mut\">— нет ребра от корней —</span>\n  <div class=\"fp-row\">\n    <div class=\"fp-node dead\">X</div>\n    <div class=\"fp-node dead\">Y</div>\n  </div>\n  <span class=\"fp-tag\" style=\"border-color:var(--bad)\">не покрашены → недостижимы</span>\n</div>"
   },
   {
    "cap": "Два объекта ссылаются друг на друга, но ни один не привязан к корню.",
    "html": "<div class=\"fp-col\">\n  <div class=\"fp-box acc\">🧵 root</div>\n  <div class=\"fp-arrow mut\">⤬ нет ссылки сюда</div>\n  <div class=\"fp-row\">\n    <div class=\"fp-node bad fp-pulse-r\">X</div>\n    <div class=\"fp-arrow bad\">⇄</div>\n    <div class=\"fp-node bad fp-pulse-r\">Y</div>\n  </div>\n  <span class=\"fp-tag\" style=\"border-color:var(--bad)\">🏝 остров: X↔Y держат друг друга, но не корни</span>\n</div>"
   },
   {
    "cap": "Sweep: остров недостижим от корней — собран, несмотря на взаимные ссылки.",
    "html": "<div class=\"fp-col\">\n  <div class=\"fp-row\">\n    <div class=\"fp-box bad\">подсчёт ссылок 🔢<br><span class=\"fp-tag\">счётчик X=1, Y=1 → не 0</span></div>\n    <div class=\"fp-arrow\">→</div>\n    <div class=\"fp-box bad fp-blink\">♾️ утечка цикла</div>\n  </div>\n  <div class=\"fp-arrow\">↓</div>\n  <div class=\"fp-row\">\n    <div class=\"fp-box good big fp-pulse-g\">mark-and-sweep 🧹</div>\n    <div class=\"fp-arrow\">→</div>\n    <div class=\"fp-row\">\n      <div class=\"fp-node dead\">X</div>\n      <div class=\"fp-node dead\">Y</div>\n    </div>\n    <div class=\"fp-arrow\">→</div>\n    <div class=\"fp-box good\">🗑️ собрано ✅</div>\n  </div>\n  <span class=\"fp-tag\" style=\"border-color:var(--good)\">достижимость от корней &gt; счётчик ссылок</span>\n</div>"
   }
  ]
 },
 {
  "id": "fp-write-barrier",
  "t": "JVM",
  "g": "Сборка мусора",
  "title": "Write barrier и card table",
  "frames": [
   {
    "cap": "Old-объект ссылается на young — minor GC обязан найти эту ссылку, иначе соберёт живой объект.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-tag\">OLD GEN</div><div class=\"fp-box big\" id=\"src\">A.field</div></div><div class=\"fp-arrow acc\">&rarr;</div><div class=\"fp-col\"><div class=\"fp-tag good\">YOUNG GEN</div><div class=\"fp-box good fp-pulse-g\">B (живой)</div></div></div>"
   },
   {
    "cap": "Без card table minor GC пришлось бы сканировать ВЕСЬ old — дорого на каждом цикле.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">OLD GEN</div><div class=\"fp-row\"><div class=\"fp-box bad fp-blink\">scan</div><div class=\"fp-box bad fp-blink\">scan</div><div class=\"fp-box bad fp-blink\">scan</div><div class=\"fp-box bad fp-blink\">scan</div></div><div class=\"fp-tag bad\">весь old &times; каждый minor GC</div></div>"
   },
   {
    "cap": "На запись a.field=b JIT вставляет write barrier: индекс карты = addr &gt;&gt; 9.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">A.field = B</div><div class=\"fp-arrow warn\">&darr; write barrier</div><div class=\"fp-box warn\">card = addr &gt;&gt; 9</div></div>"
   },
   {
    "cap": "Barrier помечает соответствующую карту грязной — 1 байт на регион ~512Б.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">CARD TABLE (1Б / 512Б)</div><div class=\"fp-row\"><div class=\"fp-cell\">clean</div><div class=\"fp-cell\">clean</div><div class=\"fp-cell bad fp-pulse-r\">DIRTY</div><div class=\"fp-cell\">clean</div></div></div>"
   },
   {
    "cap": "Minor GC сканирует только грязные карты old gen, ищет old&rarr;young, пропуская чистые.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">OLD GEN scan</div><div class=\"fp-row\"><div class=\"fp-box dead\">skip</div><div class=\"fp-box dead\">skip</div><div class=\"fp-box good fp-pulse-g\">scan A</div><div class=\"fp-box dead\">skip</div></div><div class=\"fp-arrow good\">&rarr;</div><div class=\"fp-box good\">found A&rarr;B</div></div>"
   },
   {
    "cap": "После GC карты сбрасываются в clean — журнал готов к следующему циклу записей.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag good\">CARD TABLE reset</div><div class=\"fp-row\"><div class=\"fp-cell good\">clean</div><div class=\"fp-cell good\">clean</div><div class=\"fp-cell good fp-pulse-g\">clean</div><div class=\"fp-cell good\">clean</div></div></div>"
   }
  ]
 },
 {
  "id": "fp-invokedynamic",
  "t": "JVM",
  "g": "Байткод и JIT",
  "title": "Лямбда → invokedynamic",
  "frames": [
   {
    "cap": "Исходник: лямбда передаётся как Predicate в filter.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">Predicate&lt;String&gt; p = s -&gt; s.isEmpty();</div><div class=\"fp-arrow\">&darr; javac</div></div>"
   },
   {
    "cap": "В байткоде НЕ анонимный класс, а слот invokedynamic + синтетический метод с телом.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box warn fp-pulse-a\">invokedynamic #0<br/><span class=\"fp-tag\">пустой слот</span></div><div class=\"fp-box dead\">lambda$0(String)<br/><span class=\"fp-tag\">synthetic</span></div></div>"
   },
   {
    "cap": "Первый вызов: слот пуст — JVM зовёт bootstrap LambdaMetafactory.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box warn fp-blink\">CallSite<br/><span class=\"fp-tag\">empty</span></div><div class=\"fp-arrow fp-pulse-a\">&rarr;</div><div class=\"fp-box acc fp-spin\">LambdaMetafactory<br/><span class=\"fp-tag\">bootstrap</span></div></div>"
   },
   {
    "cap": "Фабрика лениво штампует класс-реализацию Predicate в рантайме.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">LambdaMetafactory</div><div class=\"fp-arrow fp-pulse-g\">&darr; генерит</div><div class=\"fp-box good fp-pulse-g\">$$Lambda$1<br/><span class=\"fp-tag\">implements Predicate</span></div></div>"
   },
   {
    "cap": "Класс «впаян» в CallSite: слот теперь связан, тело лямбды доступно.",
    "html": "<div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">CallSite<br/><span class=\"fp-tag\">linked</span></div><div class=\"fp-conn\">&rarr;</div><div class=\"fp-box good\">$$Lambda$1.test()<br/>&rarr; lambda$0</div></div>"
   },
   {
    "cap": "Повторные вызовы идут напрямую — bootstrap больше не нужен.",
    "html": "<div class=\"fp-stack\"><div class=\"fp-row\"><div class=\"fp-box acc\">call #2</div><div class=\"fp-arrow good\">&rarr;</div><div class=\"fp-box good\">$$Lambda$1</div></div><div class=\"fp-row\"><div class=\"fp-box acc\">call #3</div><div class=\"fp-arrow good\">&rarr;</div><div class=\"fp-box good\">$$Lambda$1</div></div><div class=\"fp-box dead\">LambdaMetafactory &#10005; не зовётся</div></div>"
   }
  ]
 },
 {
  "id": "fp-classloader-leak",
  "t": "JVM",
  "g": "Память",
  "title": "Утечка ClassLoader при hot redeploy",
  "frames": [
   {
    "cap": "Старый webapp работает: его ClassLoader держит все классы, поток из пула трогает ThreadLocal приложения.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-tag\">v1 webapp</div><div class=\"fp-box acc\">ClassLoader#1</div><div class=\"fp-row\"><div class=\"fp-node acc\">App.class</div><div class=\"fp-node acc\">Ctx.class</div></div></div><div class=\"fp-arrow\">&larr;</div><div class=\"fp-col\"><div class=\"fp-tag\">пул потоков</div><div class=\"fp-box good\">Thread</div><div class=\"fp-slot\">ThreadLocal=Ctx</div></div></div>"
   },
   {
    "cap": "Деплоим v2: создаётся новый ClassLoader, старый должен быть собран GC.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-tag\">v1 (старый)</div><div class=\"fp-box dead\">ClassLoader#1</div><div class=\"fp-node dead\">App.class</div></div><div class=\"fp-arrow fp-pulse-a\">&rarr;</div><div class=\"fp-col\"><div class=\"fp-tag\">v2 (новый)</div><div class=\"fp-box good fp-pulse-g\">ClassLoader#2</div><div class=\"fp-node good\">App.class</div></div></div>"
   },
   {
    "cap": "Но поток жив: ThreadLocal всё ещё держит Ctx из v1 — verёвочка наружу не отпущена.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box dead\">ClassLoader#1</div><div class=\"fp-node warn\">Ctx.class</div></div><div class=\"fp-conn bad fp-blink\">&larr;&middot;&middot;&middot;</div><div class=\"fp-col\"><div class=\"fp-tag\">живой Thread</div><div class=\"fp-box good\">Thread</div><div class=\"fp-slot bad fp-pulse-r\">value = Ctx(v1)</div></div></div>"
   },
   {
    "cap": "Цепочка достижимости: Ctx тянет свой класс, класс тянет ВЕСЬ ClassLoader#1.",
    "html": "<div class=\"fp-row\"><div class=\"fp-token good\">Thread</div><div class=\"fp-arrow bad\">&rarr;</div><div class=\"fp-token warn\">Ctx</div><div class=\"fp-arrow bad\">&rarr;</div><div class=\"fp-token warn\">Ctx.class</div><div class=\"fp-arrow bad fp-pulse-r\">&rarr;</div><div class=\"fp-box bad big fp-pulse-r\">ClassLoader#1</div></div>"
   },
   {
    "cap": "ClassLoader#1 не умирает и удерживает ВСЕ свои классы в Metaspace — утечка целого графа.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">ClassLoader#1 (жив!)</div><div class=\"fp-grid\"><div class=\"fp-cell bad\">App.class</div><div class=\"fp-cell bad\">Ctx.class</div><div class=\"fp-cell bad\">Svc.class</div><div class=\"fp-cell bad\">Dao.class</div><div class=\"fp-cell bad\">Dto.class</div><div class=\"fp-cell bad\">&hellip;</div></div><div class=\"fp-tag bad\">Metaspace удержан</div></div>"
   },
   {
    "cap": "После N redeploy копии классов накапливаются → OutOfMemoryError: Metaspace.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-bar dead\">v1</div><div class=\"fp-bar dead\">v2</div><div class=\"fp-bar warn\">v3</div><div class=\"fp-bar bad\">v4</div><div class=\"fp-bar bad big fp-pulse-r\">v5</div></div><div class=\"fp-box bad big fp-blink\">OOM: Metaspace</div></div>"
   }
  ]
 },
 {
  "id": "fp-safe-publication",
  "t": "Concurrency",
  "g": "Модель памяти",
  "title": "Безопасная публикация объекта",
  "frames": [
   {
    "cap": "Поток A создаёт объект: записать ссылку — это три шага, и порядок (2) и (3) для других потоков не гарантирован.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">Thread A</span><div class=\"fp-row\"><div class=\"fp-token\">1) alloc</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token\">2) x=42</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token\">3) shared=ref</div></div></div><div class=\"fp-row\"><div class=\"fp-tag warn fp-blink\">порядок 2 и 3 НЕ гарантирован</div></div></div>"
   },
   {
    "cap": "Из-за переупорядочивания шаг (3) уезжает вперёд: ссылка опубликована, а поле x ещё дефолтное.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">Thread A</span><div class=\"fp-row\"><div class=\"fp-token\">1) alloc</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token acc fp-pulse-a\">3) shared=ref</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token warn\">2) x=42</div></div></div><div class=\"fp-row\"><div class=\"fp-box\">shared</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box bad\">Holder{ x=0 }</div></div></div>"
   },
   {
    "cap": "Поток B читает не-null ссылку, заходит внутрь — и видит x=0 вместо 42. Гонка на частичном объекте.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">Thread B</span><div class=\"fp-row\"><div class=\"fp-box\">shared &ne; null</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box bad fp-pulse-r\">читает x = 0</div></div></div><div class=\"fp-row\"><div class=\"fp-tag bad fp-blink\">недописанный объект &#10005;</div></div></div>"
   },
   {
    "cap": "Безопасная публикация: ставим барьер. final / volatile / synchronized / потокобезопасная коллекция запирают запись полей ДО выдачи ссылки.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">Thread A</span><div class=\"fp-row\"><div class=\"fp-token\">1) alloc</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token good\">2) x=42</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-bar acc big fp-pulse-a\">BARRIER</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token good\">3) shared=ref</div></div></div><div class=\"fp-row\"><div class=\"fp-tag good\">final</div><div class=\"fp-tag good\">volatile</div><div class=\"fp-tag good\">synchronized</div><div class=\"fp-tag good\">ConcurrentMap</div></div></div>"
   },
   {
    "cap": "Барьер строит happens-before: запись полей в A видна до выдачи ссылки, поэтому B видит объект целиком — x=42.",
    "html": "<div class=\"fp-grid\"><div class=\"fp-lane\"><span class=\"name\">Thread A</span><div class=\"fp-row\"><div class=\"fp-box good\">x=42</div><div class=\"fp-arrow good\">&rarr;</div><div class=\"fp-bar good\">release</div></div></div><div class=\"fp-conn good fp-pulse-g\">happens-before &rarr;</div><div class=\"fp-lane\"><span class=\"name\">Thread B</span><div class=\"fp-row\"><div class=\"fp-bar good\">acquire</div><div class=\"fp-arrow good\">&rarr;</div><div class=\"fp-box good fp-pulse-g\">видит x = 42</div></div></div></div>"
   }
  ]
 },
 {
  "id": "fp-tx-rollback-only",
  "t": "Spring",
  "g": "Транзакции",
  "title": "rollback-only: почему внешний коммит падает",
  "frames": [
   {
    "cap": "Внешний REQUIRED открыл одну физическую транзакцию.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc fp-pulse-a\">outer() @Transactional REQUIRED</div><div class=\"fp-arrow\">&darr; open</div><div class=\"fp-box good\">PHYSICAL TX &#9679; status: active</div></div>"
   },
   {
    "cap": "Внутренний REQUIRED не открывает свою — присоединяется к той же транзакции.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">outer()</div><div class=\"fp-arrow\">&darr; call inner()</div><div class=\"fp-box mut\">inner() @Transactional REQUIRED &middot; JOIN</div><div class=\"fp-arrow\">&darr; same tx</div><div class=\"fp-box good fp-pulse-g\">PHYSICAL TX &#9679; one &amp; shared</div></div>"
   },
   {
    "cap": "Внутренний бросает RuntimeException — он лишь участник, откатить сам не может.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">inner() &times; throw RuntimeException</div><div class=\"fp-arrow\">&darr; participant, not owner</div><div class=\"fp-box mut\">PHYSICAL TX &#9679; status: active</div></div>"
   },
   {
    "cap": "Интерсептор не откатывает — он ставит флаг rollback-only на общей транзакции.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box warn fp-pulse-a\">TxInterceptor &middot; setRollbackOnly()</div><div class=\"fp-arrow\">&darr; mark shared status</div><div class=\"fp-box bad fp-blink\">PHYSICAL TX &#9679; rollbackOnly = true</div></div>"
   },
   {
    "cap": "Внешний поймал и проглотил исключение — но флаг на транзакции остался.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><div class=\"fp-box good fp-pulse-g\">catch (e) &middot; swallowed &#10005;</div><div class=\"fp-tag mut\">stack: clean</div></div><div class=\"fp-col\"><div class=\"fp-box bad\">PHYSICAL TX</div><div class=\"fp-tag bad fp-blink\">rollbackOnly = true</div></div></div>"
   },
   {
    "cap": "outer пробует commit → флаг виден → откат и UnexpectedRollbackException.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">outer() &rarr; commit</div><div class=\"fp-arrow bad\">&darr; sees rollbackOnly</div><div class=\"fp-box bad fp-pulse-r\">ROLLBACK forced</div><div class=\"fp-arrow bad\">&darr;</div><div class=\"fp-box dead fp-blink\">UnexpectedRollbackException</div></div>"
   }
  ]
 },
 {
  "id": "fp-persistence-flush",
  "t": "Spring",
  "g": "Data / JPA",
  "title": "Dirty checking и flush",
  "frames": [
   {
    "cap": "Загружаем сущность: в контекст кладётся и объект, и snapshot его полей.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">DB</span><div class=\"fp-token good\">name=&quot;Ann&quot;</div></div><div class=\"fp-arrow\">&darr; find(id)</div><div class=\"fp-box acc big\">Persistence Context<div class=\"fp-row\"><div class=\"fp-node acc\">entity<div class=\"fp-val\">name=Ann</div></div><div class=\"fp-node\">snapshot<div class=\"fp-val\">name=Ann</div></div></div></div></div>"
   },
   {
    "cap": "Меняем поле сеттером — правится только объект, snapshot не трогается, save() не зовём.",
    "html": "<div class=\"fp-box acc big\">Persistence Context<div class=\"fp-row\"><div class=\"fp-node mut fp-pulse-a\">entity<div class=\"fp-val mut\">name=Bob</div></div><div class=\"fp-node\">snapshot<div class=\"fp-val\">name=Ann</div></div></div><div class=\"fp-tag warn\">setName(&quot;Bob&quot;) &middot; без save()</div></div>"
   },
   {
    "cap": "Наступает flush (запрос или commit) — запускается сравнение entity и snapshot.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag acc fp-blink\">flush() &middot; before query / on commit</div><div class=\"fp-row\"><div class=\"fp-node mut\">entity<div class=\"fp-val mut\">name=Bob</div></div><div class=\"fp-conn fp-pulse-a\">&asymp;?</div><div class=\"fp-node\">snapshot<div class=\"fp-val\">name=Ann</div></div></div></div>"
   },
   {
    "cap": "Dirty checking: поле name отличается — Hibernate помечает его как изменённое.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag acc\">dirty checking</div><div class=\"fp-row\"><div class=\"fp-val mut\">Bob</div><div class=\"fp-conn bad fp-pulse-r\">&#10005; diff</div><div class=\"fp-val\">Ann</div></div><div class=\"fp-tag bad fp-pulse-r\">name &rarr; DIRTY</div></div>"
   },
   {
    "cap": "Hibernate сам генерирует UPDATE по изменённым полям и шлёт его в БД.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box bad fp-pulse-r\">UPDATE user SET name=&apos;Bob&apos; WHERE id=?</div><div class=\"fp-arrow good\">&darr;</div><div class=\"fp-lane\"><span class=\"name\">DB</span><div class=\"fp-token good fp-pulse-g\">name=&quot;Bob&quot;</div></div></div>"
   },
   {
    "cap": "После flush snapshot обновляется и сравнивается с entity — изменений нет, лишних UPDATE не будет.",
    "html": "<div class=\"fp-box good big\">Persistence Context<div class=\"fp-row\"><div class=\"fp-node good\">entity<div class=\"fp-val good\">name=Bob</div></div><div class=\"fp-node good\">snapshot<div class=\"fp-val good\">name=Bob</div></div></div><div class=\"fp-tag good fp-pulse-g\">in sync &middot; no UPDATE</div></div>"
   }
  ]
 },
 {
  "id": "fp-gap-locks",
  "t": "DB",
  "g": "Транзакции и блокировки",
  "title": "Gap / next-key locks против фантомов",
  "frames": [
   {
    "cap": "Под REPEATABLE READ Tx1 запускает диапазонный SELECT ... FOR UPDATE по индексу id.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag mut\">REPEATABLE READ</span><div class=\"fp-lane\"><span class=\"name\">index id</span><div class=\"fp-token\">10</div><div class=\"fp-slot mut\"></div><div class=\"fp-token\">20</div><div class=\"fp-slot mut\"></div><div class=\"fp-token\">30</div></div><div class=\"fp-box acc fp-pulse-a\">Tx1: SELECT &middot; id BETWEEN 12 AND 25 &middot; FOR UPDATE</div></div>"
   },
   {
    "cap": "InnoDB запирает не только строку 20, но и пустые промежутки между записями — это gap-локи.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">index id</span><div class=\"fp-token\">10</div><div class=\"fp-slot warn fp-pulse-a\">gap (10,20)</div><div class=\"fp-token bad\">20 &#128274;</div><div class=\"fp-slot warn fp-pulse-a\">gap (20,30)</div><div class=\"fp-token\">30</div></div><span class=\"fp-tag warn\">gap-lock на промежутках, накрывающих 12..25</span></div>"
   },
   {
    "cap": "Строка плюс предшествующий ей gap образуют next-key lock — полуоткрытый интервал (10, 20].",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">index id</span><div class=\"fp-token\">10</div><div class=\"fp-slot bad fp-pulse-r\">gap</div><div class=\"fp-box bad big\">20 + предш. gap</div><div class=\"fp-slot bad fp-pulse-r\">gap</div><div class=\"fp-token\">30</div></div><span class=\"fp-tag bad\">next-key = строка + предшествующий gap = (10, 20]</span></div>"
   },
   {
    "cap": "Tx2 пробует INSERT id=15 в запертый промежуток (10,20) и встаёт в ожидание.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><span class=\"fp-tag acc\">Tx2</span><div class=\"fp-box acc\">INSERT id=15</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-slot bad fp-pulse-r\">gap (10,20) &#128274;</div></div><div class=\"fp-box warn fp-blink\">&#9203; WAITING (insert-intention конфликтует с gap)</div></div>"
   },
   {
    "cap": "Tx1 повторяет тот же SELECT — вставка 15 ещё висит, новых строк нет: фантом не появился.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag mut\">Tx1: повторный тот же SELECT</span><div class=\"fp-lane\"><span class=\"name\">результат</span><div class=\"fp-token good\">20</div><div class=\"fp-slot dead\">15?</div></div><div class=\"fp-box good fp-pulse-g\">фантома нет &#10003;</div></div>"
   },
   {
    "cap": "После COMMIT Tx1 локи сняты — ожидающий INSERT Tx2 наконец проходит, ключ 15 ложится в индекс.",
    "html": "<div class=\"fp-col\"><span class=\"fp-tag good\">Tx1 COMMIT &rarr; локи сняты</span><div class=\"fp-lane\"><span class=\"name\">index id</span><div class=\"fp-token\">10</div><div class=\"fp-token good fp-pulse-g\">15</div><div class=\"fp-token\">20</div><div class=\"fp-token\">30</div></div><div class=\"fp-box good\">Tx2 INSERT прошёл</div></div>"
   }
  ]
 },
 {
  "id": "fp-refresh-rotation",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "Refresh token rotation",
  "frames": [
   {
    "cap": "Логин: сервер выдаёт пару — короткий access и долгий refresh R1, семейство F1.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">client</span><div class=\"fp-token good\">access &middot; 5m</div><div class=\"fp-token acc\">refresh R1</div></div><div class=\"fp-conn\">&uarr; family F1</div><div class=\"fp-lane\"><span class=\"name\">server DB</span><div class=\"fp-slot good\">R1 &middot; active</div></div></div>"
   },
   {
    "cap": "Access протух — клиент шлёт R1 на /refresh за новой парой.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">client</span><div class=\"fp-token dead\">access &middot; expired</div><div class=\"fp-token acc fp-pulse-a\">refresh R1</div></div><div class=\"fp-arrow acc fp-pulse-a\">POST /refresh (R1) &rarr;</div><div class=\"fp-lane\"><span class=\"name\">server DB</span><div class=\"fp-slot good\">R1 &middot; active</div></div></div>"
   },
   {
    "cap": "Rotation: R1 гасится как used, выдаётся новый access и refresh R2 того же семейства.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">client</span><div class=\"fp-token good fp-pulse-g\">access &middot; 5m</div><div class=\"fp-token good fp-pulse-g\">refresh R2</div></div><div class=\"fp-arrow good\">&larr; new pair</div><div class=\"fp-lane\"><span class=\"name\">server DB</span><div class=\"fp-slot dead\">R1 &middot; used</div><div class=\"fp-slot good\">R2 &middot; active</div></div></div>"
   },
   {
    "cap": "Вор украл R1 раньше и теперь шлёт уже потраченный R1 повторно.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">attacker</span><div class=\"fp-token bad fp-pulse-r\">refresh R1</div></div><div class=\"fp-arrow bad fp-pulse-r\">POST /refresh (R1) &rarr;</div><div class=\"fp-lane\"><span class=\"name\">server DB</span><div class=\"fp-slot dead fp-blink\">R1 &middot; used &#10005;</div><div class=\"fp-slot good\">R2 &middot; active</div></div></div>"
   },
   {
    "cap": "Reuse потраченного R1 = сигнал кражи: сервер отзывает ВСЁ семейство F1.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag bad fp-pulse-r\">REUSE DETECTED &middot; family F1</div><div class=\"fp-lane\"><span class=\"name\">server DB</span><div class=\"fp-slot dead\">R1 &middot; revoked</div><div class=\"fp-slot dead fp-blink\">R2 &middot; revoked</div></div><div class=\"fp-row\"><div class=\"fp-box bad\">attacker &rarr; 401</div><div class=\"fp-box warn\">user &rarr; re-login</div></div></div>"
   }
  ]
 },
 {
  "id": "fp-optional-orelse",
  "t": "Java",
  "g": "Контракты языка",
  "title": "orElse vs orElseGet",
  "frames": [
   {
    "cap": "Optional не пуст — внутри лежит \"cached\", а дефолт берётся из дорогого запроса в БД.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">Optional</span><div class=\"fp-token good fp-pulse-g\">\"cached\"</div></div><div class=\"fp-row\"><span class=\"fp-tag\">дефолт</span><div class=\"fp-box warn\">loadFromDb() &middot; 200ms</div></div></div>"
   },
   {
    "cap": "orElse(loadFromDb()): аргумент — это значение, оно считается ДО вызова метода.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">opt.orElse( loadFromDb() )</div><div class=\"fp-arrow\">&darr;</div><span class=\"fp-tag\">сначала вычислить аргумент</span><div class=\"fp-box bad fp-pulse-r\">loadFromDb() &rarr; БД</div></div>"
   },
   {
    "cap": "Запрос в БД уже выполнился, хотя значение присутствует — результат просто выброшен.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box bad\">БД-запрос выполнен &#10005;</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-ver dead\">default отброшен</div></div><div class=\"fp-arrow\">&darr;</div><div class=\"fp-lane\"><span class=\"name\">вернулось</span><div class=\"fp-token good\">\"cached\"</div></div></div>"
   },
   {
    "cap": "orElseGet(() -> loadFromDb()): аргумент — лямбда, код передан невыполненным.",
    "html": "<div class=\"fp-col\"><div class=\"fp-box acc\">opt.orElseGet( () -&gt; loadFromDb() )</div><div class=\"fp-arrow\">&darr;</div><div class=\"fp-row\"><span class=\"fp-tag\">внутри лежит код</span><div class=\"fp-box mut\">&#955; loadFromDb()</div></div></div>"
   },
   {
    "cap": "Метод сначала проверяет isPresent(): значение есть — лямбда даже не запускается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">isPresent()?</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box good fp-pulse-g\">да</div></div><div class=\"fp-arrow\">&darr;</div><div class=\"fp-row\"><div class=\"fp-box mut\">&#955; loadFromDb()</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box good\">не вызвана &middot; БД чиста</div></div></div>"
   },
   {
    "cap": "Итог: orElse платит за дефолт всегда, orElseGet — только когда Optional пуст.",
    "html": "<div class=\"fp-row\"><div class=\"fp-col\"><span class=\"fp-tag\">orElse(x)</span><div class=\"fp-box bad\">eager</div><div class=\"fp-ver dead\">БД дёргается всегда</div></div><div class=\"fp-col\"><span class=\"fp-tag\">orElseGet(()-&gt;x)</span><div class=\"fp-box good fp-pulse-g\">lazy</div><div class=\"fp-ver\">БД только если пусто</div></div></div>"
   }
  ]
 },
 {
  "id": "fp-chm-internals",
  "t": "Java",
  "g": "Коллекции",
  "title": "ConcurrentHashMap внутри (Java 8+)",
  "frames": [
   {
    "cap": "Java 7 ушёл: вместо массива из 16 сегментов-замков теперь один общий массив Node[] table, замок — на уровне отдельного бакета.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag dead\">Java 7: Segment[16] extends ReentrantLock</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-tag good fp-pulse-g\">Java 8+: один Node[] table</div></div><div class=\"fp-lane\"><span class=\"name\">table</span><div class=\"fp-row\"><div class=\"fp-cell\">0 &#9679;</div><div class=\"fp-cell\">1 &#9679;</div><div class=\"fp-cell\">2 &#9679;</div><div class=\"fp-cell\">3 &#9679;</div><div class=\"fp-cell\">4 &#9679;</div><div class=\"fp-cell\">5 &#9679;</div></div></div><div class=\"fp-row\"><div class=\"fp-tag mut\">гранулярность блокировки = 1 бакет, а не 1/16 карты</div></div></div>"
   },
   {
    "cap": "put в пустой бакет: атомарный CAS кладёт Node без блокировки. Опоздал — повтор цикла.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token acc\">put(k,v)</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-token\">i = hash &amp; (n-1)</div></div><div class=\"fp-lane\"><span class=\"name\">table</span><div class=\"fp-row\"><div class=\"fp-cell\">0 &#9679;</div><div class=\"fp-cell acc fp-pulse-a\">3: null</div><div class=\"fp-cell\">4 &#9679;</div></div></div><div class=\"fp-row\"><div class=\"fp-bar acc big fp-pulse-a\">casTabAt(table, 3, null, Node)</div><div class=\"fp-arrow good\">&rarr;</div><div class=\"fp-box good\">Node(k,v) уложен</div></div><div class=\"fp-row\"><div class=\"fp-tag good\">без synchronized</div><div class=\"fp-tag warn\">CAS не прошёл &rarr; retry</div></div></div>"
   },
   {
    "cap": "Коллизия: бакет занят. Берём synchronized на ГОЛОВНОМ Node только этого бакета — остальные бакеты пишутся параллельно.",
    "html": "<div class=\"fp-grid\"><div class=\"fp-lane\"><span class=\"name\">bucket 3 (занят)</span><div class=\"fp-row\"><div class=\"fp-box mut fp-pulse-a\">&#128274; head Node</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-node\">N2</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-node\">N3</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-slot acc fp-blink\">+ new</div></div></div><div class=\"fp-lane\"><span class=\"name\">bucket 5 (другой)</span><div class=\"fp-row\"><div class=\"fp-box good fp-pulse-g\">пишется параллельно</div></div></div><div class=\"fp-row\"><div class=\"fp-tag good\">synchronized(head) &mdash; локан ОДИН бакет</div></div></div>"
   },
   {
    "cap": "Цепочка доросла до >=8 И table>=64 — список бакета перестраивается в красно-чёрное дерево TreeBin.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-tag warn\">len &ge; 8 (TREEIFY)</div><div class=\"fp-tag warn\">И table.length &ge; 64</div></div><div class=\"fp-lane\"><span class=\"name\">список</span><div class=\"fp-row\"><div class=\"fp-node\">N1</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-node\">N2</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-node\">..</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-node\">N8</div></div></div><div class=\"fp-row\"><div class=\"fp-arrow acc fp-pulse-a\">&rarr; treeify &rarr;</div><div class=\"fp-box good big fp-pulse-g\">TreeBin: red-black tree O(log n)</div></div><div class=\"fp-row\"><div class=\"fp-tag mut\">если table &lt; 64 &rarr; не дерево, а resize</div></div></div>"
   },
   {
    "cap": "size() приблизителен: не один счётчик, а baseCount + массив CounterCell[] (стиль LongAdder), сумму считают на лету.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box\">baseCount</div><div class=\"fp-cell acc\">CounterCell 0</div><div class=\"fp-cell acc\">CounterCell 1</div><div class=\"fp-cell acc\">CounterCell 2</div><div class=\"fp-cell acc\">CounterCell 3</div></div><div class=\"fp-lane\"><span class=\"name\">потоки бьют по своим ячейкам</span><div class=\"fp-row\"><div class=\"fp-token good fp-pulse-g\">T1 &rarr; cell0++</div><div class=\"fp-token good fp-pulse-g\">T2 &rarr; cell2++</div><div class=\"fp-token good fp-pulse-g\">T3 &rarr; cell3++</div></div></div><div class=\"fp-row\"><div class=\"fp-bar acc big fp-pulse-a\">size() = baseCount + sum(CounterCell[])</div></div><div class=\"fp-row\"><div class=\"fp-tag warn fp-blink\">значение оценочное под нагрузкой</div></div></div>"
   }
  ]
 },
 {
  "id": "fp-window-ranking",
  "t": "DB",
  "g": "PostgreSQL и типы",
  "title": "ROW_NUMBER / RANK / DENSE_RANK",
  "frames": [
   {
    "cap": "Дано: четыре результата, сортируем по убыванию score.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">ORDER BY score DESC</div><div class=\"fp-row\"><div class=\"fp-box big\"><span class=\"fp-val\">90</span></div><div class=\"fp-box big\"><span class=\"fp-val\">80</span></div><div class=\"fp-box big\"><span class=\"fp-val\">80</span></div><div class=\"fp-box big\"><span class=\"fp-val\">70</span></div></div><div class=\"fp-row\"><div class=\"fp-token warn\">две 80 = ничья</div></div></div>"
   },
   {
    "cap": "ROW_NUMBER: сквозные уникальные номера, ничья не учитывается.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag acc\">ROW_NUMBER()</div><div class=\"fp-grid\"><div class=\"fp-box\"><span class=\"fp-val\">90</span><span class=\"fp-ver acc fp-pulse-a\">1</span></div><div class=\"fp-box\"><span class=\"fp-val\">80</span><span class=\"fp-ver acc fp-pulse-a\">2</span></div><div class=\"fp-box\"><span class=\"fp-val\">80</span><span class=\"fp-ver acc fp-pulse-a\">3</span></div><div class=\"fp-box\"><span class=\"fp-val\">70</span><span class=\"fp-ver acc fp-pulse-a\">4</span></div></div><div class=\"fp-row\"><div class=\"fp-token acc\">1 &rarr; 2 &rarr; 3 &rarr; 4</div></div></div>"
   },
   {
    "cap": "RANK: обе 80 делят ранг 2, единица занята одной 90.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag good\">RANK()</div><div class=\"fp-grid\"><div class=\"fp-box good\"><span class=\"fp-val\">90</span><span class=\"fp-ver good\">1</span></div><div class=\"fp-box good fp-pulse-g\"><span class=\"fp-val\">80</span><span class=\"fp-ver good\">2</span></div><div class=\"fp-box good fp-pulse-g\"><span class=\"fp-val\">80</span><span class=\"fp-ver good\">2</span></div><div class=\"fp-box\"><span class=\"fp-val\">70</span><span class=\"fp-ver good\">4</span></div></div><div class=\"fp-row\"><div class=\"fp-token warn\">ничья на 2, не на 1</div></div></div>"
   },
   {
    "cap": "После пары 80 ранг 3 пропадает — RANK прыгает сразу на 4.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag good\">RANK() — пропуск</div><div class=\"fp-grid\"><div class=\"fp-box good\"><span class=\"fp-val\">90</span><span class=\"fp-ver good\">1</span></div><div class=\"fp-box good\"><span class=\"fp-val\">80</span><span class=\"fp-ver good\">2</span></div><div class=\"fp-box good\"><span class=\"fp-val\">80</span><span class=\"fp-ver good\">2</span></div><div class=\"fp-box bad fp-blink\"><span class=\"fp-val\">70</span><span class=\"fp-ver bad\">4</span></div></div><div class=\"fp-row\"><div class=\"fp-slot dead\">3</div><div class=\"fp-arrow bad\">&rarr;</div><div class=\"fp-token bad\">ранг 3 пропущен</div></div></div>"
   },
   {
    "cap": "DENSE_RANK: та же ничья на 2, но без пропуска — дальше 3.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag acc\">DENSE_RANK()</div><div class=\"fp-grid\"><div class=\"fp-box acc\"><span class=\"fp-val\">90</span><span class=\"fp-ver acc\">1</span></div><div class=\"fp-box acc\"><span class=\"fp-val\">80</span><span class=\"fp-ver acc\">2</span></div><div class=\"fp-box acc\"><span class=\"fp-val\">80</span><span class=\"fp-ver acc\">2</span></div><div class=\"fp-box acc fp-pulse-a\"><span class=\"fp-val\">70</span><span class=\"fp-ver acc\">3</span></div></div><div class=\"fp-row\"><div class=\"fp-token good\">без дыр: 1,2,2,3</div></div></div>"
   },
   {
    "cap": "Итог: одни данные — три разные нумерации при ничьей.",
    "html": "<div class=\"fp-col\"><div class=\"fp-tag\">90, 80, 80, 70</div><div class=\"fp-stack\"><div class=\"fp-lane acc\"><span class=\"name\">ROW_NUMBER</span><div class=\"fp-cell\">1</div><div class=\"fp-cell\">2</div><div class=\"fp-cell\">3</div><div class=\"fp-cell\">4</div></div><div class=\"fp-lane good\"><span class=\"name\">RANK</span><div class=\"fp-cell\">1</div><div class=\"fp-cell good\">2</div><div class=\"fp-cell good\">2</div><div class=\"fp-cell bad\">4</div></div><div class=\"fp-lane acc\"><span class=\"name\">DENSE_RANK</span><div class=\"fp-cell\">1</div><div class=\"fp-cell acc\">2</div><div class=\"fp-cell acc\">2</div><div class=\"fp-cell\">3</div></div></div></div>"
   }
  ]
 },
 {
  "id": "fp-kstream-ktable",
  "t": "Distributed",
  "g": "Kafka",
  "title": "KStream vs KTable",
  "frames": [
   {
    "cap": "KStream — append-only: две записи с ключом A это два разных события, оба живы.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">KStream (поток фактов)</span><div class=\"fp-row\"><div class=\"fp-token\">A&#9679;10</div><div class=\"fp-token\">B&#9679;7</div><div class=\"fp-token acc fp-pulse-a\">A&#9679;20</div></div></div><div class=\"fp-tag\">каждая запись независима</div></div>"
   },
   {
    "cap": "KTable — проекция по ключу: на ключ хранится только последнее значение (upsert).",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">KStream</span><div class=\"fp-row\"><div class=\"fp-token\">A&#9679;10</div><div class=\"fp-token\">B&#9679;7</div><div class=\"fp-token\">A&#9679;20</div></div></div><div class=\"fp-arrow fp-pulse-a\">&rarr;</div><div class=\"fp-lane\"><span class=\"name\">KTable (state)</span><div class=\"fp-col\"><div class=\"fp-cell\">A &rarr; <span class=\"fp-val good\">20</span></div><div class=\"fp-cell\">B &rarr; <span class=\"fp-val\">7</span></div></div></div></div>"
   },
   {
    "cap": "Новый upsert A->35 перезаписывает значение ключа A, прошлое 20 исчезает.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">KStream</span><div class=\"fp-token acc fp-pulse-a\">A&#9679;35</div></div><div class=\"fp-arrow fp-pulse-a\">&rarr;</div><div class=\"fp-lane\"><span class=\"name\">KTable</span><div class=\"fp-col\"><div class=\"fp-cell mut\">A &rarr; <span class=\"fp-val good big\">35</span> <span class=\"fp-ver dead\">было 20</span></div><div class=\"fp-cell\">B &rarr; <span class=\"fp-val\">7</span></div></div></div></div>"
   },
   {
    "cap": "Запись (A,null) это tombstone: ключ A удаляется из таблицы, это НЕ обнуление агрегата.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">KStream</span><div class=\"fp-token bad fp-pulse-r\">A&#9679;null</div></div><div class=\"fp-arrow bad fp-pulse-r\">&rarr;</div><div class=\"fp-lane\"><span class=\"name\">KTable</span><div class=\"fp-col\"><div class=\"fp-cell dead\">A &rarr; <span class=\"fp-tag bad\">tombstone</span></div><div class=\"fp-cell\">B &rarr; <span class=\"fp-val\">7</span></div></div></div></div>"
   },
   {
    "cap": "Под капотом KTable это compacted-топик: компакция вычищает старые версии и tombstone ключа.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane\"><span class=\"name\">changelog (до compaction)</span><div class=\"fp-row\"><div class=\"fp-token dead\">A&#9679;10</div><div class=\"fp-token\">B&#9679;7</div><div class=\"fp-token dead\">A&#9679;20</div><div class=\"fp-token dead\">A&#9679;35</div><div class=\"fp-token bad\">A&#9679;null</div></div></div><div class=\"fp-arrow fp-pulse-g\">&rarr;</div><div class=\"fp-lane\"><span class=\"name\">compacted</span><div class=\"fp-row\"><div class=\"fp-token good\">B&#9679;7</div><div class=\"fp-slot dead\">A вычищен</div></div></div></div>"
   },
   {
    "cap": "table.toStream() возвращает поток, и tombstone вылетает как value==null — фильтруй, иначе NPE.",
    "html": "<div class=\"fp-row\"><div class=\"fp-lane\"><span class=\"name\">KTable</span><div class=\"fp-col\"><div class=\"fp-cell\">B &rarr; <span class=\"fp-val\">7</span></div><div class=\"fp-cell bad\">A &rarr; null</div></div></div><div class=\"fp-arrow fp-pulse-a\">&rarr;</div><div class=\"fp-lane\"><span class=\"name\">toStream()</span><div class=\"fp-row\"><div class=\"fp-token good\">B&#9679;7</div><div class=\"fp-token bad warn fp-blink\">A&#9679;null</div></div></div><div class=\"fp-tag warn\">.filter(v != null)</div></div>"
   }
  ]
 },
 {
  "id": "fp-tcp-handshake",
  "t": "Web",
  "g": "Сеть и безопасность",
  "title": "TCP 3-way handshake",
  "frames": [
   {
    "cap": "Клиент шлёт SYN со своим начальным номером seq=x",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\"><span class=\"name\">Клиент</span>&#9679; CLOSED</div><div class=\"fp-col\"><span class=\"fp-tag\">SYN</span><div class=\"fp-arrow fp-pulse-a\">&rarr;</div><span class=\"fp-tag\">seq=x</span></div><div class=\"fp-box big\"><span class=\"name\">Сервер</span>&#9679; LISTEN</div></div>"
   },
   {
    "cap": "Сервер отвечает SYN-ACK: свой seq=y и ack=x+1",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big acc\"><span class=\"name\">Клиент</span>&#9679; SYN-SENT</div><div class=\"fp-col\"><span class=\"fp-tag\">SYN-ACK</span><div class=\"fp-arrow fp-pulse-a\">&larr;</div><span class=\"fp-tag good\">seq=y &middot; ack=x+1</span></div><div class=\"fp-box big acc\"><span class=\"name\">Сервер</span>&#9679; SYN-RCVD</div></div>"
   },
   {
    "cap": "SYN потребил один номер — потому сервер квитанцией ставит x+1",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-token\">SYN(seq=x)</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box good fp-pulse-g\">+1 номер &#9679;<br>хоть данных нет</div></div><div class=\"fp-row\"><span class=\"fp-tag good\">ack=x+1</span><span class=\"fp-tag\">«жду байт x+1»</span></div></div>"
   },
   {
    "cap": "Клиент шлёт ACK с ack=y+1 — третий и последний сегмент",
    "html": "<div class=\"fp-row\"><div class=\"fp-box big good\"><span class=\"name\">Клиент</span>&#9679; ESTABLISHED</div><div class=\"fp-col\"><span class=\"fp-tag\">ACK</span><div class=\"fp-arrow fp-pulse-g\">&rarr;</div><span class=\"fp-tag good\">ack=y+1</span></div><div class=\"fp-box big good\"><span class=\"name\">Сервер</span>&#9679; ESTABLISHED</div></div>"
   },
   {
    "cap": "Три сегмента прошли — соединение ESTABLISHED, данные идут следом",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box good\">&#9679; ESTABLISHED</div><div class=\"fp-conn\"></div><div class=\"fp-box good\">&#9679; ESTABLISHED</div></div><div class=\"fp-lane fp-pulse-g\"><span class=\"name\">данные &rarr;</span><div class=\"fp-bar\"><span style=\"width:100%\"></span></div></div></div>"
   },
   {
    "cap": "До первого байта — 1 RTT; TLS добавляет ещё RTT поверх",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-box acc\">TCP handshake</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-ver good\">1 RTT</div></div><div class=\"fp-row\"><div class=\"fp-box mut\">TLS поверх</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-ver warn\">+1 RTT (1.3)</div><div class=\"fp-ver warn\">+2 RTT (1.2)</div></div><span class=\"fp-tag\">холодный HTTPS = TCP + TLS до первого байта</span></div>"
   }
  ]
 },
 {
  "id": "fp-chain-responsibility",
  "t": "Design",
  "g": "Паттерны",
  "title": "Chain of Responsibility",
  "frames": [
   {
    "cap": "Запрос входит в начало цепочки хендлеров.",
    "html": "<div class=\"fp-col\"><div class=\"fp-token acc big fp-pulse-a\">Запрос</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-row\"><div class=\"fp-node acc\">Auth<br>фильтр</div><div class=\"fp-conn\"></div><div class=\"fp-node\">Authz<br>фильтр</div><div class=\"fp-conn\"></div><div class=\"fp-node\">App<br>хендлер</div></div></div>"
   },
   {
    "cap": "Auth не справился — передаёт дальше через next.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node mut\">Auth<br>пропустил</div><div class=\"fp-conn fp-pulse-a\"></div><div class=\"fp-node acc fp-pulse-a\">Authz<br>фильтр</div><div class=\"fp-conn\"></div><div class=\"fp-node\">App<br>хендлер</div></div><div class=\"fp-tag acc\">next.handle()</div></div>"
   },
   {
    "cap": "Authz тоже не финал — зовёт chain.doFilter() к следующему.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node mut\">Auth</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">Authz<br>пропустил</div><div class=\"fp-conn fp-pulse-a\"></div><div class=\"fp-node acc fp-pulse-a\">App<br>хендлер</div></div><div class=\"fp-tag acc\">chain.doFilter()</div></div>"
   },
   {
    "cap": "App-хендлер обрабатывает запрос — цепочка завершена.",
    "html": "<div class=\"fp-col\"><div class=\"fp-row\"><div class=\"fp-node mut\">Auth</div><div class=\"fp-conn\"></div><div class=\"fp-node mut\">Authz</div><div class=\"fp-conn\"></div><div class=\"fp-node good fp-pulse-g\">App<br>обработал</div></div><div class=\"fp-token good big\">Ответ &#9679;</div></div>"
   },
   {
    "cap": "Антипример: уровни логов — это порог, а не цепочка.",
    "html": "<div class=\"fp-col\"><div class=\"fp-lane bad\"><span class=\"name\">НЕ Chain of Responsibility</span><div class=\"fp-row\"><div class=\"fp-cell\">INFO=800</div><div class=\"fp-cell\">WARN=900</div><div class=\"fp-cell\">SEVERE=1000</div></div></div><div class=\"fp-row\"><div class=\"fp-box bad\">порог &ge; WARNING</div><div class=\"fp-arrow\">&rarr;</div><div class=\"fp-box warn\">if уровень &ge; порога</div></div><div class=\"fp-tag bad\">нет next.handle() — просто сравнение</div></div>"
   }
  ]
 },
 {
  "id": "fp-app-boot",
  "t": "JVM",
  "g": "сквозной поток",
  "title": "Жизнь Java-приложения: от `java -jar` до готовности",
  "frames": [
   {
    "cap": "Ещё на СБОРКЕ: javac компилирует .java в платформо-независимый байткод (.class) и упаковывает в .jar. В рантайме исходник уже не нужен.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">1. javac → байткод (сборка)</div><div class=\"fp-box \" style=\"width:100%\">2. java -jar → старт JVM</div><div class=\"fp-box \" style=\"width:100%\">3. загрузка классов</div><div class=\"fp-box \" style=\"width:100%\">4. интерпретация + JIT</div><div class=\"fp-box \" style=\"width:100%\">5. Spring/DI контекст</div><div class=\"fp-box \" style=\"width:100%\">6. готов к запросам</div></div>"
   },
   {
    "cap": "Запуск: JVM стартует, читает манифест jar, находит main(). Резервирует память под кучу (объекты) и стек (вызовы).",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. javac → байткод (сборка)</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">2. java -jar → старт JVM</div><div class=\"fp-box \" style=\"width:100%\">3. загрузка классов</div><div class=\"fp-box \" style=\"width:100%\">4. интерпретация + JIT</div><div class=\"fp-box \" style=\"width:100%\">5. Spring/DI контекст</div><div class=\"fp-box \" style=\"width:100%\">6. готов к запросам</div></div>"
   },
   {
    "cap": "ClassLoader по мере надобности грузит .class из jar в Metaspace, проверяет байткод и линкует. Классы грузятся лениво — при первом обращении.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. javac → байткод (сборка)</div><div class=\"fp-box good\" style=\"width:100%\">2. java -jar → старт JVM</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">3. загрузка классов</div><div class=\"fp-box \" style=\"width:100%\">4. интерпретация + JIT</div><div class=\"fp-box \" style=\"width:100%\">5. Spring/DI контекст</div><div class=\"fp-box \" style=\"width:100%\">6. готов к запросам</div></div>"
   },
   {
    "cap": "Сначала JVM интерпретирует байткод. Горячие (часто вызываемые) методы JIT компилирует в нативный код — дальше они летают. Вот почему прогрев важен.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. javac → байткод (сборка)</div><div class=\"fp-box good\" style=\"width:100%\">2. java -jar → старт JVM</div><div class=\"fp-box good\" style=\"width:100%\">3. загрузка классов</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">4. интерпретация + JIT</div><div class=\"fp-box \" style=\"width:100%\">5. Spring/DI контекст</div><div class=\"fp-box \" style=\"width:100%\">6. готов к запросам</div></div>"
   },
   {
    "cap": "Фреймворк поднимает контекст: сканирует бины, разрешает зависимости (DI), открывает пулы к БД, стартует веб-сервер.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. javac → байткод (сборка)</div><div class=\"fp-box good\" style=\"width:100%\">2. java -jar → старт JVM</div><div class=\"fp-box good\" style=\"width:100%\">3. загрузка классов</div><div class=\"fp-box good\" style=\"width:100%\">4. интерпретация + JIT</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">5. Spring/DI контекст</div><div class=\"fp-box \" style=\"width:100%\">6. готов к запросам</div></div>"
   },
   {
    "cap": "Приложение слушает порт и готово обслуживать. Readiness-проба отдаёт OK — балансировщик начинает пускать трафик.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. javac → байткод (сборка)</div><div class=\"fp-box good\" style=\"width:100%\">2. java -jar → старт JVM</div><div class=\"fp-box good\" style=\"width:100%\">3. загрузка классов</div><div class=\"fp-box good\" style=\"width:100%\">4. интерпретация + JIT</div><div class=\"fp-box good\" style=\"width:100%\">5. Spring/DI контекст</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">6. готов к запросам</div></div>"
   }
  ]
 },
 {
  "id": "fp-request-path",
  "t": "Web",
  "g": "сквозной поток",
  "title": "Путь HTTP-запроса через backend",
  "frames": [
   {
    "cap": "Запрос приходит на reverse proxy (nginx). Тот терминирует TLS (расшифровывает) и по правилам направляет на нужный сервис/инстанс.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">1. TLS + reverse proxy</div><div class=\"fp-box \" style=\"width:100%\">2. фильтры / security</div><div class=\"fp-box \" style=\"width:100%\">3. контроллер</div><div class=\"fp-box \" style=\"width:100%\">4. сервис (бизнес-логика)</div><div class=\"fp-box \" style=\"width:100%\">5. БД / кэш</div><div class=\"fp-box \" style=\"width:100%\">6. вызов другого сервиса</div><div class=\"fp-box \" style=\"width:100%\">7. сборка ответа</div></div>"
   },
   {
    "cap": "Внутри приложения — цепочка фильтров: аутентификация (кто ты по токену), авторизация (что можно), логирование, rate-limit.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. TLS + reverse proxy</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">2. фильтры / security</div><div class=\"fp-box \" style=\"width:100%\">3. контроллер</div><div class=\"fp-box \" style=\"width:100%\">4. сервис (бизнес-логика)</div><div class=\"fp-box \" style=\"width:100%\">5. БД / кэш</div><div class=\"fp-box \" style=\"width:100%\">6. вызов другого сервиса</div><div class=\"fp-box \" style=\"width:100%\">7. сборка ответа</div></div>"
   },
   {
    "cap": "Роутер по URL+методу находит контроллер. Тот валидирует вход, десериализует JSON в объект и зовёт бизнес-логику.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. TLS + reverse proxy</div><div class=\"fp-box good\" style=\"width:100%\">2. фильтры / security</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">3. контроллер</div><div class=\"fp-box \" style=\"width:100%\">4. сервис (бизнес-логика)</div><div class=\"fp-box \" style=\"width:100%\">5. БД / кэш</div><div class=\"fp-box \" style=\"width:100%\">6. вызов другого сервиса</div><div class=\"fp-box \" style=\"width:100%\">7. сборка ответа</div></div>"
   },
   {
    "cap": "Сервисный слой выполняет бизнес-правила. Обычно открывает транзакцию на время работы с данными.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. TLS + reverse proxy</div><div class=\"fp-box good\" style=\"width:100%\">2. фильтры / security</div><div class=\"fp-box good\" style=\"width:100%\">3. контроллер</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">4. сервис (бизнес-логика)</div><div class=\"fp-box \" style=\"width:100%\">5. БД / кэш</div><div class=\"fp-box \" style=\"width:100%\">6. вызов другого сервиса</div><div class=\"fp-box \" style=\"width:100%\">7. сборка ответа</div></div>"
   },
   {
    "cap": "Читает/пишет данные: сначала смотрит в кэш; промах — идёт в БД через пул соединений. По завершении транзакция коммитится.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. TLS + reverse proxy</div><div class=\"fp-box good\" style=\"width:100%\">2. фильтры / security</div><div class=\"fp-box good\" style=\"width:100%\">3. контроллер</div><div class=\"fp-box good\" style=\"width:100%\">4. сервис (бизнес-логика)</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">5. БД / кэш</div><div class=\"fp-box \" style=\"width:100%\">6. вызов другого сервиса</div><div class=\"fp-box \" style=\"width:100%\">7. сборка ответа</div></div>"
   },
   {
    "cap": "Нужны чужие данные — зовёт другой сервис (REST/gRPC) или шлёт событие в Kafka. С таймаутом и circuit breaker, чтобы не зависнуть.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. TLS + reverse proxy</div><div class=\"fp-box good\" style=\"width:100%\">2. фильтры / security</div><div class=\"fp-box good\" style=\"width:100%\">3. контроллер</div><div class=\"fp-box good\" style=\"width:100%\">4. сервис (бизнес-логика)</div><div class=\"fp-box good\" style=\"width:100%\">5. БД / кэш</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">6. вызов другого сервиса</div><div class=\"fp-box \" style=\"width:100%\">7. сборка ответа</div></div>"
   },
   {
    "cap": "Собирает результат, сериализует в JSON, ставит статус-код и возвращает через фильтры обратно клиенту.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. TLS + reverse proxy</div><div class=\"fp-box good\" style=\"width:100%\">2. фильтры / security</div><div class=\"fp-box good\" style=\"width:100%\">3. контроллер</div><div class=\"fp-box good\" style=\"width:100%\">4. сервис (бизнес-логика)</div><div class=\"fp-box good\" style=\"width:100%\">5. БД / кэш</div><div class=\"fp-box good\" style=\"width:100%\">6. вызов другого сервиса</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">7. сборка ответа</div></div>"
   }
  ]
 },
 {
  "id": "fp-kafka-path",
  "t": "Distributed",
  "g": "сквозной поток",
  "title": "Путь сообщения в Kafka: от producer до commit",
  "frames": [
   {
    "cap": "Producer формирует сообщение (key, value) и шлёт в топик. По хэшу ключа выбирается партиция — один ключ всегда в одну партицию, значит порядок сохраняется.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">1. producer шлёт (ключ→партиция)</div><div class=\"fp-box \" style=\"width:100%\">2. запись в лог партиции</div><div class=\"fp-box \" style=\"width:100%\">3. репликация (acks=all)</div><div class=\"fp-box \" style=\"width:100%\">4. consumer group читает</div><div class=\"fp-box \" style=\"width:100%\">5. обработка (идемпотентно)</div><div class=\"fp-box \" style=\"width:100%\">6. коммит offset</div></div>"
   },
   {
    "cap": "Брокер-лидер партиции дописывает сообщение в конец лога (append-only) и присваивает ему offset — порядковый номер.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. producer шлёт (ключ→партиция)</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">2. запись в лог партиции</div><div class=\"fp-box \" style=\"width:100%\">3. репликация (acks=all)</div><div class=\"fp-box \" style=\"width:100%\">4. consumer group читает</div><div class=\"fp-box \" style=\"width:100%\">5. обработка (идемпотентно)</div><div class=\"fp-box \" style=\"width:100%\">6. коммит offset</div></div>"
   },
   {
    "cap": "Реплики подтягивают запись. При acks=all producer ждёт подтверждения от всех in-sync реплик — гарантия, что сообщение не потеряется при падении лидера.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. producer шлёт (ключ→партиция)</div><div class=\"fp-box good\" style=\"width:100%\">2. запись в лог партиции</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">3. репликация (acks=all)</div><div class=\"fp-box \" style=\"width:100%\">4. consumer group читает</div><div class=\"fp-box \" style=\"width:100%\">5. обработка (идемпотентно)</div><div class=\"fp-box \" style=\"width:100%\">6. коммит offset</div></div>"
   },
   {
    "cap": "Consumer group подписан на топик; партиции поделены между консьюмерами (одна партиция — один консьюмер в группе). Каждый читает свои по offset.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. producer шлёт (ключ→партиция)</div><div class=\"fp-box good\" style=\"width:100%\">2. запись в лог партиции</div><div class=\"fp-box good\" style=\"width:100%\">3. репликация (acks=all)</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">4. consumer group читает</div><div class=\"fp-box \" style=\"width:100%\">5. обработка (идемпотентно)</div><div class=\"fp-box \" style=\"width:100%\">6. коммит offset</div></div>"
   },
   {
    "cap": "Консьюмер обрабатывает сообщение идемпотентно — на случай повтора. Тяжёлую работу дозируй, иначе таймаут → rebalance и повторная обработка.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. producer шлёт (ключ→партиция)</div><div class=\"fp-box good\" style=\"width:100%\">2. запись в лог партиции</div><div class=\"fp-box good\" style=\"width:100%\">3. репликация (acks=all)</div><div class=\"fp-box good\" style=\"width:100%\">4. consumer group читает</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">5. обработка (идемпотентно)</div><div class=\"fp-box \" style=\"width:100%\">6. коммит offset</div></div>"
   },
   {
    "cap": "После успешной обработки консьюмер коммитит offset — «досюда обработано». Упал до коммита → перечитает с последнего коммита (at-least-once).",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. producer шлёт (ключ→партиция)</div><div class=\"fp-box good\" style=\"width:100%\">2. запись в лог партиции</div><div class=\"fp-box good\" style=\"width:100%\">3. репликация (acks=all)</div><div class=\"fp-box good\" style=\"width:100%\">4. consumer group читает</div><div class=\"fp-box good\" style=\"width:100%\">5. обработка (идемпотентно)</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">6. коммит offset</div></div>"
   }
  ]
 },
 {
  "id": "fp-sql-path",
  "t": "DB",
  "g": "сквозной поток",
  "title": "Путь SQL-запроса внутри БД",
  "frames": [
   {
    "cap": "БД получает SQL-текст, парсит в дерево, проверяет синтаксис и что таблицы/колонки существуют.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">1. парсинг</div><div class=\"fp-box \" style=\"width:100%\">2. планировщик (индекс или скан)</div><div class=\"fp-box \" style=\"width:100%\">3. выполнение по плану</div><div class=\"fp-box \" style=\"width:100%\">4. буфер / диск</div><div class=\"fp-box \" style=\"width:100%\">5. MVCC-видимость</div><div class=\"fp-box \" style=\"width:100%\">6. результат</div></div>"
   },
   {
    "cap": "Оптимизатор строит план: использовать индекс или полный скан? какой порядок join? Оценивает стоимость по статистике таблиц.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. парсинг</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">2. планировщик (индекс или скан)</div><div class=\"fp-box \" style=\"width:100%\">3. выполнение по плану</div><div class=\"fp-box \" style=\"width:100%\">4. буфер / диск</div><div class=\"fp-box \" style=\"width:100%\">5. MVCC-видимость</div><div class=\"fp-box \" style=\"width:100%\">6. результат</div></div>"
   },
   {
    "cap": "Executor идёт по плану: обращается к индексу за адресами нужных строк, затем достаёт сами строки.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. парсинг</div><div class=\"fp-box good\" style=\"width:100%\">2. планировщик (индекс или скан)</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">3. выполнение по плану</div><div class=\"fp-box \" style=\"width:100%\">4. буфер / диск</div><div class=\"fp-box \" style=\"width:100%\">5. MVCC-видимость</div><div class=\"fp-box \" style=\"width:100%\">6. результат</div></div>"
   },
   {
    "cap": "Нужные страницы ищутся в буферном кэше (в RAM). Нет там — читаются с диска (медленно) и кэшируются на будущее.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. парсинг</div><div class=\"fp-box good\" style=\"width:100%\">2. планировщик (индекс или скан)</div><div class=\"fp-box good\" style=\"width:100%\">3. выполнение по плану</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">4. буфер / диск</div><div class=\"fp-box \" style=\"width:100%\">5. MVCC-видимость</div><div class=\"fp-box \" style=\"width:100%\">6. результат</div></div>"
   },
   {
    "cap": "Для каждой строки проверяется видимость по версии транзакции (MVCC) — чтобы читатель не увидел незакоммиченные чужие изменения.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. парсинг</div><div class=\"fp-box good\" style=\"width:100%\">2. планировщик (индекс или скан)</div><div class=\"fp-box good\" style=\"width:100%\">3. выполнение по плану</div><div class=\"fp-box good\" style=\"width:100%\">4. буфер / диск</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">5. MVCC-видимость</div><div class=\"fp-box \" style=\"width:100%\">6. результат</div></div>"
   },
   {
    "cap": "Отобранные строки собираются в результат и отдаются клиенту. Для записи — изменения становятся видны другим только после commit.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. парсинг</div><div class=\"fp-box good\" style=\"width:100%\">2. планировщик (индекс или скан)</div><div class=\"fp-box good\" style=\"width:100%\">3. выполнение по плану</div><div class=\"fp-box good\" style=\"width:100%\">4. буфер / диск</div><div class=\"fp-box good\" style=\"width:100%\">5. MVCC-видимость</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">6. результат</div></div>"
   }
  ]
 },
 {
  "id": "fp-deploy-k8s",
  "t": "DevOps",
  "g": "сквозной поток",
  "title": "Деплой в Kubernetes: от `kubectl apply` до трафика",
  "frames": [
   {
    "cap": "Ты применяешь манифест (Deployment). API-сервер сохраняет желаемое состояние в etcd: «хочу N реплик образа v2».",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">1. kubectl apply</div><div class=\"fp-box \" style=\"width:100%\">2. scheduler → узлы</div><div class=\"fp-box \" style=\"width:100%\">3. pull образа → контейнер</div><div class=\"fp-box \" style=\"width:100%\">4. старт + liveness</div><div class=\"fp-box \" style=\"width:100%\">5. readiness → в трафик</div><div class=\"fp-box \" style=\"width:100%\">6. rolling update / rollback</div></div>"
   },
   {
    "cap": "Планировщик подбирает узлы под новые поды с учётом ресурсов (CPU/память) и ограничений размещения.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. kubectl apply</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">2. scheduler → узлы</div><div class=\"fp-box \" style=\"width:100%\">3. pull образа → контейнер</div><div class=\"fp-box \" style=\"width:100%\">4. старт + liveness</div><div class=\"fp-box \" style=\"width:100%\">5. readiness → в трафик</div><div class=\"fp-box \" style=\"width:100%\">6. rolling update / rollback</div></div>"
   },
   {
    "cap": "На узле kubelet тянет Docker-образ из реестра (по слоям, кэшируя) и запускает контейнер.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. kubectl apply</div><div class=\"fp-box good\" style=\"width:100%\">2. scheduler → узлы</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">3. pull образа → контейнер</div><div class=\"fp-box \" style=\"width:100%\">4. старт + liveness</div><div class=\"fp-box \" style=\"width:100%\">5. readiness → в трафик</div><div class=\"fp-box \" style=\"width:100%\">6. rolling update / rollback</div></div>"
   },
   {
    "cap": "Контейнер стартует. Liveness-проба следит, что процесс жив; завис/упал — под перезапускается.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. kubectl apply</div><div class=\"fp-box good\" style=\"width:100%\">2. scheduler → узлы</div><div class=\"fp-box good\" style=\"width:100%\">3. pull образа → контейнер</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">4. старт + liveness</div><div class=\"fp-box \" style=\"width:100%\">5. readiness → в трафик</div><div class=\"fp-box \" style=\"width:100%\">6. rolling update / rollback</div></div>"
   },
   {
    "cap": "Readiness-проба ждёт, пока приложение реально готово (прогрелось, коннекты открыты). Только тогда под добавляется в Service — на него пускают трафик.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. kubectl apply</div><div class=\"fp-box good\" style=\"width:100%\">2. scheduler → узлы</div><div class=\"fp-box good\" style=\"width:100%\">3. pull образа → контейнер</div><div class=\"fp-box good\" style=\"width:100%\">4. старт + liveness</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">5. readiness → в трафик</div><div class=\"fp-box \" style=\"width:100%\">6. rolling update / rollback</div></div>"
   },
   {
    "cap": "Старые поды v1 гасятся по одному по мере готовности новых v2 — без простоя. Что-то не так — быстрый откат (rollback) к v1.",
    "html": "<div class=\"fp-col\" style=\"gap:5px;width:min(300px,100%)\"><div class=\"fp-box good\" style=\"width:100%\">1. kubectl apply</div><div class=\"fp-box good\" style=\"width:100%\">2. scheduler → узлы</div><div class=\"fp-box good\" style=\"width:100%\">3. pull образа → контейнер</div><div class=\"fp-box good\" style=\"width:100%\">4. старт + liveness</div><div class=\"fp-box good\" style=\"width:100%\">5. readiness → в трафик</div><div class=\"fp-box acc fp-pulse-a\" style=\"width:100%\">6. rolling update / rollback</div></div>"
   }
  ]
 }
];

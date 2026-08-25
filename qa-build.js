#!/usr/bin/env node
/* Комната для Наташи — поздравление в виде баг-репорта.
   node qa-build.js "пароль"
   Фото по желанию: qa-photo.jpg
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь ---- */
const NAME="Наташа";
const TICKET="NAT-1508";
/* t: -1 нервы (Blocker) · 1 спокойно (Trivial) · 2 отдушина (Not a bug) */
const TEAM=[
  {n:"Сундет",          t:-1, s:"автор этой страницы, между прочим"},
  {n:"Алмат",           t:-1},
  {n:"Дамир",           t:-1},
  {n:"Айгерим",         t:-1},
  {n:"Ермек",           t:-1},
  {n:"Адиль",           t:1},
  {n:"Айгерим старшая", t:1},
  {n:"Тамир",           t:1},
  {n:"Бага",            t:1},
  {n:"Мухит",           t:1},
  {n:"Арайлым",         t:1},
  {n:"Лаура",           t:2},
  {n:"Адиль младший",   t:2}
];
const TESTS=[
  "находит то, что никто не искал",
  "воспроизводит невоспроизводимое",
  "ломает нерушимое с первого клика",
  "выдерживает «у меня локально работает»",
  "дочитывает лог до конца",
  "отличает Blocker от «мне не нравится»",
  "пишет шаги так, что повторил даже я",
  "проверяет граничные значения",
  "не верит словам «точно починил»",
  "переоткрывает закрытое"
];
const CONSOLE_MSG=
  "  🎂  Ты открыла консоль. Конечно ты открыла консоль.\n\n"
 +"  Это вторая пасхалка, её найдут только такие как ты.\n"
 +"  Спасибо, что ловишь то, что мы не видим.\n\n"
 +"  С днём рождения, "+NAME+"!\n";
/* ------------------------ */

const PASS=process.argv[2];
/* Пароля по умолчанию больше нет. Раньше здесь стоял запасной вариант, и комнату
   один раз собрали без аргумента — на публичном сайте она открывалась словом,
   совпадающим с её же адресом. Лучше упасть, чем тихо выпустить незапертую дверь. */
if(!PASS||PASS.length<6){
  console.error("Нужен пароль от 6 символов:  node "+require("path").basename(__filename)+' "пароль"');
  process.exit(1);
}
const DIR=__dirname, ITER=200000, KEYLEN=32;
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");

function photo(){
  for(const ext of [".jpg",".jpeg",".png",".webp",".heic"]){
    const p=path.join(DIR,"qa-photo"+ext);
    if(!fs.existsSync(p))continue;
    const tmp=path.join(require("os").tmpdir(),"qa-photo.jpg");
    try{
      execFileSync("sips",["-s","format","jpeg","-s","formatOptions","62","-Z","560",p,"--out",tmp],{stdio:"ignore"});
      const b=fs.readFileSync(tmp); fs.unlinkSync(tmp);
      console.log("  · фото: "+path.basename(p)+" → "+Math.round(b.length/1024)+" КБ");
      return "data:image/jpeg;base64,"+b.toString("base64");
    }catch(e){ return null; }
  }
  console.log("  · фото нет — обойдёмся без него");
  return null;
}
const IMG=photo();

/* Фото коллег: qa-1.jpg … qa-13.jpg по порядку из списка TEAM.
   Кого нет — на карточке останется буква вместо лица. */
function teamPhoto(i){
  for(const ext of [".jpg",".jpeg",".png",".webp",".heic"]){
    const p=path.join(DIR,"qa-"+i+ext);
    if(!fs.existsSync(p))continue;
    const tmp=path.join(require("os").tmpdir(),"qa-t"+i+".jpg");
    try{
      execFileSync("sips",["-s","format","jpeg","-s","formatOptions","58","-Z","220",p,"--out",tmp],{stdio:"ignore"});
      const b=fs.readFileSync(tmp); fs.unlinkSync(tmp);
      return {d:"data:image/jpeg;base64,"+b.toString("base64"),kb:Math.round(b.length/1024)};
    }catch(e){ return null; }
  }
  return null;
}
let found=0,kb=0;
TEAM.forEach((p,idx)=>{ const im=teamPhoto(idx+1); if(im){ p.p=im.d; found++; kb+=im.kb; } });
console.log("  · фото коллег: "+found+" из "+TEAM.length+(found?" ("+kb+" КБ)":" — везде буквы"));

const testRows=TESTS.map(t=>'<div class="qa-t"><i>✓</i><span>'+esc(t)+"</span><b>PASS</b></div>").join("")
  +'<div class="qa-t qa-fail" id="qaFail"><i>✗</i><span>should_not_get_older</span><b>FAIL</b></div>';

const HTML=`
<div class="qa-tick">
  <div class="qa-top"><span class="qa-key">${esc(TICKET)}</span><span class="qa-st">Won't Fix</span></div>
  <h1>${esc(NAME)} стала на год старше</h1>
  <div class="qa-fields">
    <div><span>Severity</span><b>Blocker</b></div>
    <div><span>Priority</span><b>Highest</b></div>
    <div><span>Reporter</span><b>Календарь</b></div>
    <div><span>Assignee</span><b>Вселенная</b></div>
  </div>
  <h4>Steps to reproduce</h4>
  <ol><li>Взять ${esc(NAME)}у</li><li>Подождать 365 дней</li><li>Наблюдать</li></ol>
  <div class="qa-ea">
    <div><span>Expected</span><p>возраст остаётся прежним</p></div>
    <div><span>Actual</span><p>возраст +1, при этом всё остальное только лучше</p></div>
  </div>
  <div class="qa-res">Resolution: <b>Works as designed</b> ❤️<br>
    <i>воспроизводится стабильно, чинить отказываемся</i></div>
</div>

<div class="qa-run">
  <div class="qa-run-h">$ npm run test:${esc(NAME.toLowerCase())}</div>
  <div id="qaTests">${testRows}</div>
  <div class="qa-sum" id="qaSum" hidden>Tests: <b>10 passed</b>, <b class="r">1 failed</b>, 11 total</div>
  <div class="qa-trace" id="qaTrace" hidden>
<pre>AssertionError: expected age to stay the same, but it changed

    at Календарь.tick (время.js:365)
    at Вселенная.run (жизнь.js:1)
    at ${esc(NAME)}.живёт (лучше.js:∞)

  Ожидалось: без изменений
  Получено:  на год мудрее и на год ярче
</pre>
    <div class="qa-note">${IMG?'<img class="qa-ph" src="'+IMG+'" alt="'+esc(NAME)+'">':""}
      <p>Этот тест мы чинить не будем — пусть падает каждый год.<br>
      Спасибо, что ловишь то, чего не видим мы. С днём рождения! 🎂</p></div>
  </div>
</div>

<div class="qa-game" id="qaGame" data-team='${JSON.stringify(TEAM).replace(/'/g,"&#39;")}'></div>

<div class="qa-dip" id="qaDip" hidden>
  <div class="qa-dip-in">
    <div class="qa-dip-top">Республика QA · Комитет по качеству</div>
    <h2>ДИПЛОМ</h2>
    <div class="qa-dip-sub">с отличием</div>
    ${IMG?'<img class="qa-dip-ph" src="'+IMG+'" alt="'+esc(NAME)+'">':""}
    <p class="qa-dip-p">Настоящим удостоверяется, что</p>
    <div class="qa-dip-name">${esc(NAME)}</div>
    <p class="qa-dip-p">прошла путь от «а что будет, если нажать сюда»<br>
      до «я же говорила» — и заслужила диплом того самого цвета,<br>
      который видит чаще всех остальных.</p>
    <div class="qa-dip-spec">
      <div><span>Специальность</span><b>Обнаружение неочевидного</b></div>
      <div><span>Квалификация</span><b>Мастер воспроизведения</b></div>
    </div>
    <div class="qa-grades">
      <div><span>Внимание к деталям</span><b>отлично</b></div>
      <div><span>Здоровый скепсис</span><b>отлично</b></div>
      <div><span>Терпение к «у меня работает»</span><b>отлично</b></div>
      <div><span>Умение сломать нерушимое</span><b>отлично</b></div>
      <div><span>Оформление шагов</span><b>отлично</b></div>
    </div>
    <div class="qa-dip-avg">Средний балл <b>5.0</b> · регрессий не обнаружено</div>
    <div class="qa-dip-sign">
      <div><i>Ректор Вселенной</i><span>подпись неразборчива</span></div>
      <div class="qa-seal"><span>ПРОВЕРЕНО<br><b>QA</b><br>ДОПУЩЕНО</span></div>
      <div><i>Дата выдачи</i><span>${esc(TICKET)}</span></div>
    </div>
  </div>
</div>

<div id="qaConsole" hidden>${esc(CONSOLE_MSG)}</div>
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);
const out="window.QADATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")
  +"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"qa-data.js"),out);
console.log("✓ qa-data.js: "+Math.round(out.length/1024)+" КБ, команда "+TEAM.length+" человек, пароль «"+PASS+"»");

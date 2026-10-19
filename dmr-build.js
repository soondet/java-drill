#!/usr/bin/env node
/* Комната для Дамира — «Дамир. Фильм»: премьера, main.dart с hot reload, падел-матч,
   кинозал и титры.
   node dmr-build.js "пароль"
   Фото по желанию: dmr-photo.jpg (png/webp/heic тоже подойдут) — станет афишей.
   Видео от друзей по желанию: dmr-video-Имя.mp4 (mov/m4v тоже) — «бонусные материалы».
   Пережимаются ffmpeg в 720p H.264, чтобы играли на айфоне. Исходники в git не попадают.
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь ---- */
const NAME="Дамир";
const DATE="19.10";
const BRAND="Corneliani";
/* hot reload: каждое нажатие применяет одно пожелание, как коммит */
const WISHES=[
  {t:"feat(health):",  d:"здоровье без единого краша — весь год и на всех платформах"},
  {t:"feat(padel):",   d:"подача, после которой стекло аплодирует, а соперник просит реванш"},
  {t:"feat(release):", d:"App Store и Google Play принимают сборки с первого раза"},
  {t:"perf(life):",    d:"120 fps в будни и в выходные, без единого jank'а"},
  {t:"feat(cinema):",  d:"хорошее кино каждую неделю — с попкорном и без спойлеров"},
  {t:"chore(style):",  d:"гардероб обновлён до новой коллекции, всё идеально по фигуре"},
  {t:"feat(home):",    d:"дома тепло, смех и любовь — главный модуль, покрытие 100% 💍"},
  {t:"fix(time):",     d:"исправлен баг «времени не хватает на всё сразу»"}
];
/* --------------------------- */

const PASS=process.argv[2];
const BANNED=["dmr","birthday","hb","password","123456"];      /* имя разрешено: пароль в чате всё равно уходит открыто, как у Лауры */
if(!PASS||PASS.length<4||BANNED.includes(PASS.toLowerCase())){
  console.error("Нужен пароль: node "+path.basename(__filename)+' "пароль"\n(не короче 4 символов)');
  process.exit(1);
}
const DIR=__dirname, ITER=200000, KEYLEN=32;

function findFile(base,exts){ for(const ext of exts){ const p=path.join(DIR,base+ext); if(fs.existsSync(p))return p; } return null; }
function initials(name,c1,c2){
  const ch=(name.trim()[0]||"Д").toUpperCase();
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="400" height="600" fill="url(#g)"/>
    <text x="200" y="350" font-family="Inter,sans-serif" font-size="230" font-weight="800" fill="rgba(255,255,255,.92)" text-anchor="middle">${ch}</text></svg>`;
  return "data:image/svg+xml;base64,"+Buffer.from(svg).toString("base64");
}
function photo(base,name,c1,c2){
  const src=findFile(base,[".jpg",".jpeg",".png",".webp",".heic"]);
  if(!src){ console.log("  · "+base+": фото нет, ставлю заглушку"); return initials(name,c1,c2); }
  const tmp=path.join(require("os").tmpdir(),base+".jpg");
  try{
    execFileSync("sips",["-s","format","jpeg","-s","formatOptions","62","-Z","900",src,"--out",tmp],{stdio:"ignore"});
    let b=fs.readFileSync(tmp); fs.unlinkSync(tmp);
    const orig=fs.readFileSync(src), keepOrig=/\.jpe?g$/i.test(src)&&orig.length<=b.length; if(keepOrig)b=orig;
    console.log("  · "+base+": "+path.basename(src)+" → "+Math.round(b.length/1024)+" КБ");
    return "data:image/jpeg;base64,"+b.toString("base64");
  }catch(e){
    const b=fs.readFileSync(src); console.log("  · "+base+": без сжатия, "+Math.round(b.length/1024)+" КБ");
    return "data:image/"+(src.endsWith(".png")?"png":src.endsWith(".webp")?"webp":"jpeg")+";base64,"+b.toString("base64");
  }
}
/* Видео: только mp4 с H.264 и AAC — иначе айфон не покажет. 720p, crf 26, звук 96k. */
function videos(){
  const out=[]; let total=0;
  for(const f of fs.readdirSync(DIR)){
    const m=/^dmr-video-(.+)\.(mp4|mov|m4v|webm)$/i.exec(f); if(!m)continue;
    const src=path.join(DIR,f), tmp=path.join(require("os").tmpdir(),"dmr-"+m[1]+".mp4");
    try{
      execFileSync("ffmpeg",["-y","-i",src,"-vf","scale='min(1280,iw)':-2","-c:v","libx264","-preset","medium","-crf","26",
        "-pix_fmt","yuv420p","-movflags","+faststart","-c:a","aac","-b:a","96k","-ac","2",tmp],{stdio:"ignore"});
      const b=fs.readFileSync(tmp); fs.unlinkSync(tmp); total+=b.length;
      console.log("  · видео "+m[1]+": "+Math.round(b.length/1024/1024*10)/10+" МБ после пережатия");
      out.push({n:m[1],src:"data:video/mp4;base64,"+b.toString("base64")});
    }catch(e){ console.log("  · видео "+f+": ffmpeg не справился, пропускаю"); }
  }
  if(total>30*1024*1024)console.log("  ! видео в сумме "+Math.round(total/1024/1024)+" МБ — многовато для одной комнаты, подумай о нарезке");
  return out;
}

console.log("Материалы:");
const IMG=photo("dmr-photo",NAME,"#0175c2","#47c5fb");
const VIDEOS=videos();

const REVIEWS=[
  ["Обаяние, которое не помещается в кадр","кинокритики"],
  ["Костюм сидит так, что в "+BRAND+" спорят, кто кого украшает","модный обозреватель"],
  ["Живёт на 120 fps, ни одного подвисания","разработчики"],
  ["Подача такая, что стекло извиняется","падел-клуб"],
  ["Знакомится с кем угодно за пять минут. Женат — и это лучший поворот сюжета","зрители"],
  ["Hot reload в голове: правки видны сразу","команда"],
  ["Самый приятный человек в любом кадре","все, кто с ним работал"]
];
/* Кинозал: эмодзи → фильм, после ответа — версия с Дамиром */
const QUIZ=[
  {e:"🕴️🇬🇧🌿💰", a:"Джентльмены", w:["Kingsman","Большой куш","Карты, деньги, два ствола"],
   d:"Гай Ричи искал джентльмена в идеальном костюме. Мог бы сэкономить на кастинге: у Дамира "+BRAND+" уже в шкафу."},
  {e:"🌀💤🏙️🔝", a:"Начало", w:["Довод","Интерстеллар","Матрица"],
   d:"Сон внутри сна внутри сна? Дамир каждый день собирает виджет внутри виджета внутри виджета — и всё рендерится."},
  {e:"🕶️💊🐇", a:"Матрица", w:["Джон Уик","Бегущий по лезвию","Начало"],
   d:"Красная таблетка — iOS, синяя — Android. Дамир берёт обе: кодовая база всё равно одна."},
  {e:"🥊🧼🤫", a:"Бойцовский клуб", w:["Рокки","Джокер","Большой куш"],
   d:"Первое правило падел-клуба Дамира: всем рассказывать о падел-клубе. Второе правило: звать с собой."},
  {e:"🚀🌽⏳👨‍👧", a:"Интерстеллар", w:["Марсианин","Гравитация","Довод"],
   d:"Час на падел-корте как час на планете Миллер: снаружи прошло семь лет, а Дамир говорит «ещё сет»."},
  {e:"👠👜📰😈", a:"Дьявол носит Prada", w:["Великий Гэтсби","Красотка","Ла-Ла Ленд"],
   d:"Дьявол носит Prada, Дамир — "+BRAND+". Только дьяволом его никто не назовёт: самый приятный человек в комнате."},
  {e:"💻👍🎓💸", a:"Социальная сеть", w:["Стив Джобс","Хакеры","Волк с Уолл-стрит"],
   d:"Фейсбук начинали на PHP. Дамир бы сделал на Flutter — сразу под iOS, Android и веб, к вечеру."},
  {e:"💍🔫👫🏠", a:"Мистер и миссис Смит", w:["Джон Уик","Ла-Ла Ленд","Довод"],
   d:"Главная сцена этого фильма — команда из двоих против всего мира. Дамир свою команду уже собрал 💍"}
];
const CREDITS=[
  ["в главной роли","Дамир"],["стиль",BRAND],["корт","падел, стекло со всех сторон"],["фреймворк","Flutter"],
  ["обаяние","без дублёров и каскадёров"],["частота кадров","120 fps"],["саундтрек","смех друзей"],
  ["лучшая сцена","дома 💍"],["продюсер счастья","его жена"],["снято","с любовью — друзьями и коллегами"]
];
/* Happy Birthday для титров: [интервал от соль, длительность в долях, аккорд] */
const SONG=[[0,.75,"I"],[0,.25],[2,1],[0,1],[5,1],[4,2,"V"],
  [0,.75],[0,.25],[2,1],[0,1],[7,1],[5,2,"I"],
  [0,.75],[0,.25],[12,1],[9,1],[5,1,"IV"],[4,1,"I"],[2,2],
  [10,.75,"IV"],[10,.25],[9,1],[5,1,"I"],[7,1,"V"],[5,3,"I"]];

const att=o=>JSON.stringify(o).replace(/'/g,"&#39;");
const code=`<span class="k">class</span> <span class="t">Damir</span> <span class="k">extends</span> <span class="t">StatelessWidget</span> {
  <span class="t">Damir</span>({<span class="k">super</span>.key});

  <span class="k">final</span> style  = <span class="t">${BRAND}</span>.fullLook();
  <span class="k">final</span> sport  = <span class="t">Padel</span>(level: <span class="t">Level</span>.max);
  <span class="k">final</span> movies = <span class="t">Watchlist</span>.infinite();
  <span class="k">final</span> charm  = <span class="t">Charm</span>.unlimited; <span class="c">// знакомится с кем угодно</span>
<span class="dmr-ln" id="dmrHeartLn">  <span class="k">final</span> heart  = <span class="t">Heart</span>.taken;     <span class="c">// final: навсегда 💍</span></span>

  <span class="a">@override</span>
  <span class="t">Widget</span> build(<span class="t">BuildContext</span> context) =&gt;
      <span class="k">const</span> <span class="t">Birthday</span>(date: <span class="s">'${DATE}'</span>, mood: <span class="t">Mood</span>.best);
}`;

const HTML=`
<div class="dmr-hero">
  <div class="dmr-poster"><img src="${IMG}" alt="${NAME}"><span class="dmr-prem">ПРЕМЬЕРА · СЕГОДНЯ</span></div>
  <p class="dmr-pre">Damir Pictures × Flutter Studios представляют</p>
  <h1>С днём рождения, ${NAME}!</h1>
  <p class="dmr-sub">Фильм о человеке, у которого стиль, корт и код в одном кадре</p>
  <div class="dmr-rate"><span><b>10/10</b>зрители</span><span><b>100%</b>свежесть</span><span><b>120</b>fps обаяния</span><span><b>0</b>багов в стиле</span></div>
  <div class="tmr-tags"><span>💙 Flutter</span><span>🎾 падел</span><span>🎬 кино</span><span>🕴 ${BRAND}</span><span>🤝 душа компании</span></div>
</div>
<div class="tmr-ticker"><div class="tmr-ticker-in">${REVIEWS.concat(REVIEWS).map(r=>'<span>★★★★★ «'+r[0]+'» — '+r[1]+'</span>').join("")}</div></div>

<div class="tmr-card">
  <div class="tmr-h"><b>main.dart</b><span>жми hot reload · каждое нажатие применяет одно пожелание</span></div>
  <pre class="dmr-code">${code}</pre>
  <div class="dmr-bar" id="dmrReload" data-w='${att(WISHES)}'>
    <button type="button" class="sg-btn dmr-btn" id="dmrHot">⚡ Hot reload</button>
    <button type="button" class="sg-btn ghost" id="dmrHeart">✏️ damir.heart = …</button>
    <span class="dmr-note" id="dmrNote">применено 0 из ${WISHES.length}</span>
  </div>
  <pre class="dmr-con" id="dmrCon"><span class="i">Flutter run key commands.</span>
<span class="i">r Hot reload. 🔥🔥🔥</span>
<span class="i">A Dart VM Service on Birthday is available.</span>
</pre>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Падел: Дамир против Понедельника</b><span>гейм до 4 очков · при 40:40 золотое очко</span></div>
  <div class="dmr-padel">
    <div class="dmr-score"><span class="me">Дамир <b id="dmrS1">0</b></span><i>:</i><span><b id="dmrS2">0</b> Понедельник</span></div>
    <div class="dmr-court"><canvas id="dmrCourt"></canvas><div class="dmr-ov" id="dmrOv"></div></div>
  </div>
  <p class="tmr-note">Ракетка ходит за пальцем или мышкой, на клавиатуре — стрелки. Боковое стекло отбивает мяч, как на настоящем корте.</p>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Кинозал</b><span>угадай фильм по эмодзи · ${QUIZ.length} сеансов</span></div>
  <div id="dmrQuiz" data-q='${att(QUIZ)}'></div>
</div>

${VIDEOS.length?`<div class="tmr-card">
  <div class="tmr-h"><b>Бонусные материалы</b><span>поздравления</span></div>
  <div class="tmr-videos" id="tmrVideos"></div>
  <script type="application/json" id="tmrVideoData">${JSON.stringify(VIDEOS).replace(/<\//g,"<\\/")}</script>
</div>`:""}

<div class="dmr-credits" aria-label="Титры"><div class="dmr-roll">
  <h3>DAMIR</h3>
  ${CREDITS.map(c=>'<p>'+c[0]+'<b>'+c[1]+'</b></p>').join("")}
  <p class="dmr-fin">ни один виджет не пострадал</p>
</div></div>

<div class="tmr-close dmr-close">
  <p class="tmr-close-t">Рейтинг: 10 из 10 · пересматривать каждый год 🎬</p>
  <p>Дамир, с днём рождения! Ты из тех, с кем легко с первой минуты: на корте, на код-ревью, в очереди за попкорном. Пусть этот год соберётся без единой ошибки, релизы проходят ревью с первого раза, подача ложится точно в угол, а вечера с хорошим кино случаются чаще. Стиль у тебя уже есть, обаяние тоже — пусть всё остальное будет им под стать. И пусть дома всегда будет главное: тепло, смех и любовь.</p>
  <button type="button" class="sg-btn dmr-btn" id="dmrSong" data-song='${att(SONG)}'>▶ саундтрек: Happy Birthday</button>
  <p class="tmr-close-s">Конец первой части. Сиквел — ровно через год.</p>
</div>
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);
const out="window.DMRDATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")+"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"dmr-data.js"),out);
console.log("✓ dmr-data.js: "+Math.round(out.length/1024)+" КБ, имя «"+NAME+"», видео "+VIDEOS.length+", пароль «"+PASS+"»");

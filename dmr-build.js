#!/usr/bin/env node
/* Комната для Дамира — «Atelier Damir»: лукбук в духе сдержанной роскоши, мерки и ярлык,
   main.dart с hot reload, падел-матч, кинозал, титры и письмо.
   node dmr-build.js "пароль"
   Фото по желанию: dmr-photo.jpg (png/webp/heic тоже подойдут) — обложка;
   dmr-look-1.jpg, dmr-look-2.jpg … — лукбук «Look 01, 02…».
   Видео от друзей по желанию: dmr-video-Имя.mp4 (mov/m4v тоже) — «бонусные материалы».
   Пережимаются ffmpeg в 720p H.264, чтобы играли на айфоне. Исходники в git не попадают.
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь ---- */
const NAME="Дамир";
const DATE="19.10";
const BRAND="Corneli";
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
const IMG=photo("dmr-photo",NAME,"#2a2520","#5a4a35");
const VIDEOS=videos();
/* Лукбук: dmr-look-1.jpg, dmr-look-2.jpg … — по порядку имён, каждое станет «Look 01…» */
function looks(){
  return fs.readdirSync(DIR).filter(f=>/^dmr-look-.+\.(jpe?g|png|webp|heic)$/i.test(f))
    .sort((a,b)=>a.localeCompare(b,undefined,{numeric:true}))
    .map(f=>photo(f.replace(/\.[^.]+$/,""),NAME,"#2a2520","#5a4a35"));
}
const LOOKS=looks();

const REVIEWS=[
  ["Обаяние, которое не помещается в кадр","кинокритики"],
  ["Костюм сидит так, что в "+BRAND+" спорят, кто кого украшает","модный обозреватель"],
  ["Живёт на 120 fps, ни одного подвисания","разработчики"],
  ["Подача такая, что стекло извиняется","падел-клуб"],
  ["Знакомится с кем угодно за пять минут. Женат — и это лучший поворот сюжета","зрители"],
  ["Самый приятный человек в любом кадре","все, кто с ним работал"]
];
const MEAS=[
  ["Обаяние","без мерки"],["Стиль",BRAND+", по фигуре"],["Подача","точно в угол"],
  ["Кино","от Нолана до Ричи"],["Код","Flutter, 120 fps"],["Сердце","занято навсегда 💍"]
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
  ["в главной роли","Дамир"],["костюм",BRAND],["корт","падел, стекло со всех сторон"],["фреймворк","Flutter"],
  ["обаяние","без дублёров и каскадёров"],["саундтрек","смех друзей"],
  ["лучшая сцена","дома 💍"],["продюсер счастья","его жена"],["снято","с любовью — друзьями и коллегами"]
];
/* Happy Birthday для письма: [интервал от соль, длительность в долях, аккорд] */
const SONG=[[0,.75,"I"],[0,.25],[2,1],[0,1],[5,1],[4,2,"V"],
  [0,.75],[0,.25],[2,1],[0,1],[7,1],[5,2,"I"],
  [0,.75],[0,.25],[12,1],[9,1],[5,1,"IV"],[4,1,"I"],[2,2],
  [10,.75,"IV"],[10,.25],[9,1],[5,1,"I"],[7,1,"V"],[5,3,"I"]];
/* Значки ухода на ярлыке — свои контуры, не чужие картинки: стирка, отбеливание, глажка, химчистка, сушка */
const CARE=[
  '<svg viewBox="0 0 40 32"><path d="M4 8l4 20h24l4-20"/><path d="M4 8c4 3 8 3 12 0s8-3 12 0 6 3 8 0"/><text x="20" y="23">♥</text></svg>',
  '<svg viewBox="0 0 40 32"><path d="M20 4L37 28H3z"/></svg>',
  '<svg viewBox="0 0 40 32"><path d="M6 24h28c0-8-4-13-12-13H12l-4 5"/><path d="M6 24l2-8"/><circle cx="17" cy="19" r="1.2"/><circle cx="23" cy="19" r="1.2"/></svg>',
  '<svg viewBox="0 0 40 32"><circle cx="20" cy="16" r="12"/><text x="20" y="21">D</text></svg>',
  '<svg viewBox="0 0 40 32"><rect x="6" y="3" width="28" height="26" rx="3"/><circle cx="20" cy="16" r="8"/></svg>'
];

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
const N=(()=>{ let k=0; return ()=>["I","II","III","IV","V","VI","VII"][k++]; })();

const HTML=`
<header class="dm-cover">
  <div class="dm-top"><span>Atelier Damir</span><span>Осень · 2026</span><span>№ ${DATE}</span></div>
  <figure class="dm-ph"><div class="dm-ph-f"><img src="${IMG}" alt="${NAME}"></div><figcaption>Look ${DATE} — именинник</figcaption></figure>
  <p class="dm-kick">Buon compleanno</p>
  <h1>С днём рождения,<em>${NAME}</em></h1>
  <p class="dm-sub">Коллекция одного вечера: стиль, падел, кино и Flutter — сшито по мерке</p>
  <div class="dm-rule"><i></i><b>◆</b><i></i></div>
</header>
<div class="dm-ticker"><div class="dm-ticker-in">${REVIEWS.concat(REVIEWS).map(r=>'<span>«'+r[0]+'» <i>— '+r[1]+'</i></span>').join("")}</div></div>

<div class="dm-two">
  <section class="dm-card dm-meas">
    <h2><small>${N()}</small>Мерки</h2>
    <dl>${MEAS.map(m=>'<div><dt>'+m[0]+'</dt><dd>'+m[1]+'</dd></div>').join("")}</dl>
    <p class="dm-foot">сняты портным на глаз · погрешность ±0</p>
  </section>
  <section class="dm-tag" aria-label="Ярлык">
    <div class="dm-tag-in">
      <b class="dm-tag-m">D</b>
      <p class="dm-tag-b">DAMIR</p>
      <p class="dm-tag-s">сделано в Казахстане · по мерке</p>
      <hr>
      <p><span>состав</span>100% обаяние</p>
      <p><span>подкладка</span>доброта, хорошее настроение</p>
      <div class="dm-care">${CARE.join("")}</div>
      <p class="dm-tag-c">не стирать улыбку · гладить только комплиментами · хранить в хорошей компании · сердце не перешивать 💍</p>
      <p class="dm-tag-z">размер <b>XL</b> души</p>
    </div>
  </section>
</div>

${LOOKS.length?`<section class="dm-card">
  <h2><small>${N()}</small>Лукбук</h2>
  <div class="dm-look">${LOOKS.map((src,i)=>'<figure><img src="'+src+'" alt="Look '+String(i+1).padStart(2,"0")+'" loading="lazy"><figcaption>Look '+String(i+1).padStart(2,"0")+'</figcaption></figure>').join("")}</div>
</section>`:""}

<section class="dm-card">
  <h2><small>${N()}</small>Ателье · main.dart</h2>
  <p class="dm-lead">Hot reload: каждое нажатие пришивает одно пожелание. Без перезапуска, состояние сохраняется.</p>
  <pre class="dmr-code">${code}</pre>
  <div class="dmr-bar" id="dmrReload" data-w='${att(WISHES)}'>
    <button type="button" class="dm-btn" id="dmrHot">⚡ Hot reload</button>
    <button type="button" class="dm-btn ghost" id="dmrHeart">damir.heart = …</button>
    <span class="dmr-note" id="dmrNote">пришито 0 из ${WISHES.length}</span>
  </div>
  <pre class="dmr-con" id="dmrCon"><span class="i">Flutter run key commands.</span>
<span class="i">r Hot reload.</span>
<span class="i">A Dart VM Service on Birthday is available.</span>
</pre>
</section>

<section class="dm-card">
  <h2><small>${N()}</small>Падел</h2>
  <p class="dm-lead">Дамир против Понедельника. Гейм до четырёх очков, при 40:40 — золотое очко.</p>
  <div class="dmr-padel">
    <div class="dmr-score"><span class="me">Дамир <b id="dmrS1">0</b></span><i>·</i><span><b id="dmrS2">0</b> Понедельник</span></div>
    <div class="dmr-court"><canvas id="dmrCourt"></canvas><div class="dmr-ov" id="dmrOv"></div></div>
  </div>
  <p class="dm-note">Ракетка ходит за пальцем или мышкой, на клавиатуре — стрелки. Боковое стекло отбивает мяч, как на настоящем корте.</p>
</section>

<section class="dm-card">
  <h2><small>${N()}</small>Кинозал</h2>
  <p class="dm-lead">Угадай фильм по эмодзи — ${QUIZ.length} сеансов, у каждого есть версия с Дамиром.</p>
  <div id="dmrQuiz" data-q='${att(QUIZ)}'></div>
</section>

${VIDEOS.length?`<section class="dm-card">
  <h2><small>${N()}</small>Поздравления</h2>
  <div class="tmr-videos" id="tmrVideos"></div>
  <script type="application/json" id="tmrVideoData">${JSON.stringify(VIDEOS).replace(/<\//g,"<\\/")}</script>
</section>`:""}

<div class="dmr-credits" aria-label="Титры"><div class="dmr-roll">
  <h3>Damir</h3>
  ${CREDITS.map(c=>'<p>'+c[0]+'<b>'+c[1]+'</b></p>').join("")}
  <p class="dmr-fin">ни один виджет не пострадал</p>
</div></div>

<section class="dm-letter">
  <div class="dm-seal">D</div>
  <p class="dm-kick">Atelier Damir · ${DATE}.2026</p>
  <h3>Дорогой Дамир,</h3>
  <p>ты из тех редких людей, с кем легко с первой минуты — на корте, на код-ревью, в очереди за попкорном. Твой стиль — это внимание к деталям: в одежде, в коде и в людях.</p>
  <p>Пусть этот год сидит на тебе идеально: без единого краша, с релизами, которые проходят ревью с первого раза, с подачей точно в угол и с вечерами хорошего кино. И пусть дома всегда будет главное — тепло, смех и любовь.</p>
  <p class="dm-sign">С днём рождения!<span>друзья и коллеги</span></p>
  <button type="button" class="dm-btn dark" id="dmrSong" data-song='${att(SONG)}'>▶ Happy Birthday</button>
  <p class="dm-fine">Конец первой части. Сиквел — ровно через год.</p>
</section>
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);
const out="window.DMRDATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")+"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"dmr-data.js"),out);
console.log("✓ dmr-data.js: "+Math.round(out.length/1024)+" КБ, имя «"+NAME+"», видео "+VIDEOS.length+", пароль «"+PASS+"»");

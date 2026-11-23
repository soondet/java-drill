#!/usr/bin/env node
/* Комната для Багдагул — «World Tour»: концерт в её честь.
   Заставка — обращение в поддержку, которое решается и становится билетом (она в саппорте);
   афиша с фото, даты тура (Стамбул, концерты, квартира, машина), билет с корешком,
   сет-лист пожеланий, лайтстик в такт, бойз-бэнд на бис, письмо от команды.
   node bgl-build.js "пароль"
   Фото: bgl-photo.jpg (png/webp/heic тоже подойдут) — на афишу. Исходник в git не попадает.
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь ---- */
const NAME="Багдагул";
const DATE="23.11", DAY="23", MONTH="ноября", YEAR="2026";
const PHOTO_CAP="Стамбул";                    /* подпись на фото: «тур-стоп: …» */
const TOUR=[                                  /* даты тура: [где, что, статус] */
  ["Стамбул","тур-стоп у Босфора","отыграно ✓"],
  ["JONY","концерт","в зале ✓"],
  ["Enrique Iglesias","концерт","в зале ✓"],
  ["Sadraddin","концерт","в зале ✓"],
  ["Своя квартира","новоселье, своя сцена","есть ✓"],
  ["Своя машина","личный тур-бас","есть ✓"]
];
/* сет-лист: каждый трек — пожелание от команды. Только названия и отсылки, без чужих текстов песен */
const SET=[
  {t:"Новоселье",   by:"feat. Ключи",
   d:"Пусть в новой квартире всегда будет тепло и уютно, пахнет вкусным, а гости уходят только под утро — и только счастливыми."},
  {t:"Тур-бас",     by:"feat. Новая машина",
   d:"Ровной дороги, зелёной волны на каждом светофоре и свободного места у самого входа."},
  {t:"Hero",        by:"в духе Enrique Iglesias",
   d:"Энрике пел про героя, а герой нашей поддержки — ты: спокойно, вежливо и с первого ответа. Пусть этот год отвечает тебе тем же."},
  {t:"Комета",      by:"в духе JONY",
   d:"Пусть мечты сбываются со скоростью кометы, а в машине всегда играет любимое — на полную громкость."},
  {t:"Мурашки",     by:"в духе Sadraddin",
   d:"Побольше вечеров, когда весь зал поёт хором, а по коже бегут мурашки."},
  {t:"Тикет закрыт", by:"сингл поддержки",
   d:"Пусть обращения решаются с первого ответа, клиенты пишут «спасибо», а сложные кейсы обходят стороной."},
  {t:"Дорама",      by:"саундтрек",
   d:"Пусть жизнь будет как лучшая дорама: красивые виды, красивые люди рядом и счастливый финал у каждой серии."},
  {t:"Бис",         by:"финал",
   d:"Здоровья, сил и денег на все концерты мира — и чтобы билеты всегда были в первый ряд."}
];
/* --------------------------- */

const PASS=process.argv[2];
const BANNED=["bgl","birthday","hb","password","123456"];
if(!PASS||PASS.length<4||BANNED.includes(PASS.toLowerCase())){
  console.error("Нужен пароль: node "+path.basename(__filename)+' "пароль"\n(не короче 4 символов)');
  process.exit(1);
}
const DIR=__dirname, ITER=200000, KEYLEN=32;

function findFile(base,exts){ for(const ext of exts){ const p=path.join(DIR,base+ext); if(fs.existsSync(p))return p; } return null; }
function initials(name,c1,c2){
  const ch=(name.trim()[0]||"Б").toUpperCase();
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <text x="300" y="390" font-family="Inter,sans-serif" font-size="280" font-weight="800" fill="rgba(255,255,255,.92)" text-anchor="middle">${ch}</text></svg>`;
  return "data:image/svg+xml;base64,"+Buffer.from(svg).toString("base64");
}
function photo(base,name,c1,c2){
  const src=findFile(base,[".jpg",".jpeg",".png",".webp",".heic"]);
  if(!src){ console.log("  · "+base+": фото нет, ставлю заглушку"); return initials(name,c1,c2); }
  const tmp=path.join(require("os").tmpdir(),base+".jpg");
  try{
    execFileSync("sips",["-s","format","jpeg","-s","formatOptions","70","-Z","900",src,"--out",tmp],{stdio:"ignore"});
    let b=fs.readFileSync(tmp); fs.unlinkSync(tmp);
    const orig=fs.readFileSync(src), keepOrig=/\.jpe?g$/i.test(src)&&orig.length<=b.length; if(keepOrig)b=orig;
    console.log("  · "+base+": "+path.basename(src)+" → "+Math.round(b.length/1024)+" КБ");
    return "data:image/jpeg;base64,"+b.toString("base64");
  }catch(e){
    const b=fs.readFileSync(src); console.log("  · "+base+": без сжатия, "+Math.round(b.length/1024)+" КБ");
    return "data:image/"+(src.endsWith(".png")?"png":src.endsWith(".webp")?"webp":"jpeg")+";base64,"+b.toString("base64");
  }
}

console.log("Материалы:");
const IMG=photo("bgl-photo",NAME,"#3a1838","#7a2a5a");

/* Бойз-бэнд на бис: свои рисованные красавчики, у каждого буква имени.
   Глаза — улыбкой (^^), как у айдолов на фотосессиях; никаких чужих фото. */
const HAIR=["#1d1724","#d8d2e8","#ff8fc1","#2b3550","#e6c27a","#b9a8ff","#4a3226","#8fe3cf"];
const JACKET=["#ff5fa2","#2c2340","#ffd27a","#b9a8ff","#7fe3ff","#ff5fa2","#2c2340","#ffd27a"];
const SKIN=["#f6d7bd","#f1cfb0","#f7dcc6","#ecc7a6"];
/* объём — за лицом: обрамляет лицо и закрывает уши, по бокам — кончики прядей */
const VOL="M14.2 38C12.4 20 19 7.5 30.5 7.5C42 7.5 48.6 20 45.8 38L43.8 34.5L42.6 38.5L41 34L19 34L17.4 38.5L16.2 34.5Z";
/* чёлка — поверх лица, нижний край прядями с просветами */
const TOP="M18.2 30C18 18 24 13.5 30.5 13.5C37 13.5 42.5 18 42 30";
const FRINGE=[
  /* на пробор */
  {d:TOP+"L40.6 26L39.3 29L37.4 24.6L35.6 27.2L33.4 22.6L30.6 19.8L27.8 22.6L25.6 27.2L23.6 24.6L21.6 29L20.2 26Z", brow:28.4},
  /* прямая чёлка до бровей */
  {d:TOP+"L40.6 27L39.2 29.4L37.4 27L35.4 29.4L33.2 27L31 29.4L28.8 27L26.6 29.4L24.4 27L22.4 29.4L20.4 27Z", brow:0},
  /* косая */
  {d:TOP+"L41 24.5L39.6 27.6L37 23.2L35.2 26.4L32.2 22.4L29.6 25.8L26.8 22.6L24.2 27.4L22 24.6L20.2 29.4Z", brow:28.6},
  /* кок: лоб открыт */
  {d:"M18.4 27C18.5 15 24 11 31 11.5C38 12 42.5 16 41.8 27L40.6 22.8L38.6 20.6L34.5 19.4L30.5 19.6L26.5 20L22.6 21.4L20.4 23.6Z"
    +"M23.5 13.5C24.5 6.5 33 4.6 39.5 8.6C35.5 8.4 32.8 10 31.6 13.2Z", brow:24.6}
];
function member(letter,i){
  const hair=HAIR[i%8], jk=JACKET[i%8], sk=SKIN[i%4], fr=FRINGE[i%4], dark=jk==="#2c2340";
  const light=["#d8d2e8","#e6c27a","#8fe3cf","#ff8fc1","#b9a8ff"].includes(hair), browC=light?"#7a6656":hair;
  return `<figure class="bgl-m" style="--d:${i}" data-l="${letter}"><svg viewBox="0 0 60 90" aria-hidden="true">
<path d="M6 82C6 61 15 52.5 30 52.5C45 52.5 54 61 54 82Z" fill="${jk}"/>
<path d="M24.5 52.5L30 61L35.5 52.5Z" fill="${dark?"#ff5fa2":"#fff"}" opacity=".92"/>
<path d="M26.6 41H33.4V53.5C31.6 55 28.4 55 26.6 53.5Z" fill="${sk}"/>
<path d="${VOL}" fill="${hair}"/>
<path d="M18.8 29C18.8 20 23.7 16.5 30 16.5C36.3 16.5 41.2 20 41.2 29C41.2 37.5 36.3 44.2 30 45.2C23.7 44.2 18.8 37.5 18.8 29Z" fill="${sk}"/>
<path d="${fr.d}" fill="${hair}"/>
<path d="M23.5 15.8Q30.5 11.8 37.5 15.8" stroke="#fff" stroke-opacity=".3" stroke-width="1.3" fill="none" stroke-linecap="round"/>
${fr.brow?`<path d="M22.6 ${fr.brow}l4.4-.6M33 ${fr.brow-.6}l4.4.6" stroke="${browC}" stroke-width="1.1" stroke-linecap="round"/>`:""}
<path d="M22.9 32q2.2-2.2 4.4 0M32.7 32q2.2-2.2 4.4 0" stroke="#2a1e2c" stroke-width="1.25" fill="none" stroke-linecap="round"/>
<path d="M30.4 33.8l-.6 2.4h1" stroke="#c99a80" stroke-width=".75" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="23.8" cy="35.6" rx="2" ry="1" fill="#ff7aa8" opacity=".25"/><ellipse cx="36.2" cy="35.6" rx="2" ry="1" fill="#ff7aa8" opacity=".25"/>
<path d="M27.8 39.2q2.2 1.7 4.4 0" stroke="#b4546a" stroke-width="1.1" fill="none" stroke-linecap="round"/>
<rect x="13" y="61" width="34" height="27" rx="3.5" fill="#fff8fc" stroke="#ff5fa2" stroke-width="1.2"/>
<ellipse cx="13.6" cy="67" rx="2.8" ry="3" fill="${sk}"/><ellipse cx="46.4" cy="67" rx="2.8" ry="3" fill="${sk}"/>
<text x="30" y="81.5" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="800" fill="#1a1222">${letter}</text>
</svg></figure>`;
}
const LETTERS=[...NAME.toUpperCase()];

/* Happy Birthday для письма: [интервал от соль, длительность в долях, аккорд] — как у прошлых комнат */
const SONG=[[0,.75,"I"],[0,.25],[2,1],[0,1],[5,1],[4,2,"V"],
  [0,.75],[0,.25],[2,1],[0,1],[7,1],[5,2,"I"],
  [0,.75],[0,.25],[12,1],[9,1],[5,1,"IV"],[4,1,"I"],[2,2],
  [10,.75,"IV"],[10,.25],[9,1],[5,1,"I"],[7,1,"V"],[5,3,"I"]];
const att=o=>JSON.stringify(o).replace(/'/g,"&#39;");
const N=(()=>{ let k=0; return ()=>String(++k).padStart(2,"0"); })();

const HTML=`<span hidden data-bgl-name="${NAME}"></span>
<header class="bgl-poster">
  <div class="bgl-beams" aria-hidden="true"><i></i><i></i><i></i></div>
  <p class="bgl-pre">Команда представляет · live</p>
  <figure class="bgl-ph"><img src="${IMG}" alt="${NAME}"><figcaption>тур-стоп: ${PHOTO_CAP}</figcaption><span class="bgl-sold">sold out</span></figure>
  <h1 class="bgl-name">${NAME}</h1>
  <p class="bgl-tour">World Tour ${YEAR}</p>
  <div class="bgl-when"><b>${DAY}</b><span>${MONTH}<br>${YEAR}</span></div>
  <p class="bgl-hb">С днём рождения!</p>
</header>

<section class="bgl-card">
  <h2><small>${N()}</small>Даты тура</h2>
  <p class="bgl-lead">Год уже звучит как хит. Вот где тур успел отыграть:</p>
  <ol class="bgl-dates">
    ${TOUR.map(r=>'<li><div><span>'+r[0]+'</span><i>'+r[1]+'</i></div><b>'+r[2]+'</b></li>').join("\n    ")}
    <li class="now"><div><span>${DATE} · главный концерт года</span><i>день рождения</i></div><b>сегодня ★</b></li>
  </ol>
</section>

<section class="bgl-card">
  <h2><small>${N()}</small>Билет</h2>
  <p class="bgl-lead">Персональный, на весь год. Оторви корешок — и проходи.</p>
  <div class="bgl-tk-wrap">
    <div class="bgl-ticket" id="bglTicket">
      <div class="bgl-tk-main">
        <p class="bgl-tk-k">${NAME} · World Tour ${YEAR}</p>
        <h3>Вход на весь год</h3>
        <dl class="bgl-tk-grid">
          <div><dt>сектор</dt><dd>VIP</dd></div>
          <div><dt>ряд</dt><dd>первый</dd></div>
          <div><dt>место</dt><dd>в сердце команды</dd></div>
          <div><dt>действует</dt><dd>все 365 дней</dd></div>
          <div><dt>парковка</dt><dd>у входа, для новой машины</dd></div>
          <div><dt>дресс-код</dt><dd>как в Стамбуле</dd></div>
        </dl>
        <div class="bgl-bar" aria-hidden="true"></div>
        <span class="bgl-stamp">вход выполнен</span>
      </div>
      <div class="bgl-tk-stub"><span>admit one</span><b>№ 2311</b><span>корешок</span></div>
    </div>
  </div>
  <button type="button" class="bgl-btn" id="bglTear">✂ Оторвать корешок</button>
</section>

<section class="bgl-card">
  <h2><small>${N()}</small>Сет-лист</h2>
  <p class="bgl-lead">${SET.length} треков — ${SET.length} пожеланий от команды. Нажми на трек, чтобы его сыграть.</p>
  <div class="bgl-paper">
    <h3>${NAME} · ${DATE}</h3>
    <ol class="bgl-set" id="bglSet">
      ${SET.map((s,i)=>'<li class="bgl-tr"><button type="button" aria-expanded="false"><span class="n">'+(i+1)+'</span><span class="t"><b>'+s.t+'</b><i>'+s.by+'</i></span><span class="bgl-eq" aria-hidden="true"><s></s><s></s><s></s><s></s></span></button><p>'+s.d+'</p></li>').join("\n      ")}
    </ol>
  </div>
  <p class="bgl-set-n" id="bglSetN">сыграно 0 из ${SET.length}</p>
</section>

<section class="bgl-card">
  <h2><small>${N()}</small>Лайтстик</h2>
  <p class="bgl-lead">Зажги зал: жми на круг, когда золотое кольцо с ним совпадёт. 16 тактов — чем точнее, тем больше огней.</p>
  <div class="bgl-game">
    <div class="bgl-stage" id="bglStage">
      <span class="bgl-ring" id="bglRing"></span>
      <button type="button" class="bgl-pad" id="bglPad" aria-label="в такт"></button>
      <span class="bgl-hit" id="bglHit"></span>
    </div>
    <div class="bgl-crowd" id="bglCrowd" aria-hidden="true"></div>
    <div class="bgl-msg" id="bglMsg"></div>
    <button type="button" class="bgl-btn" id="bglGo">▶ Начать</button>
  </div>
</section>

<section class="bgl-card">
  <h2><small>${N()}</small>Бис</h2>
  <p class="bgl-lead">На бис выходит бойз-бэнд из ${LETTERS.length} красавчиков — дебют специально к ${DATE}. У каждого своя буква.</p>
  <div class="bgl-band" id="bglBand">${LETTERS.map(member).join("")}</div>
  <p class="bgl-chant" id="bglChantT" aria-live="polite"></p>
  <div class="bgl-center"><button type="button" class="bgl-btn" id="bglChant">♥ Фан-чант</button></div>
</section>

<section class="bgl-letter">
  <p class="bgl-k">World Tour ${YEAR} · ${DATE}</p>
  <h3>Дорогая ${NAME}!</h3>
  <p>С днём рождения! Ты — человек, к которому клиенты приходят с вопросом, а уходят с решением. И человек, с которым в команде спокойнее: рядом с тобой любой сложный день становится легче.</p>
  <p>Этот год у тебя уже звучит как хит: своя квартира, своя машина и концерты, на которые другие только собираются. Пусть следующий будет ещё громче — с новыми городами, первыми рядами, любимой музыкой на полную и людьми рядом, от которых по коже мурашки.</p>
  <p class="bgl-sign">С днём рождения!<span>твоя команда</span></p>
  <div class="bgl-center"><button type="button" class="bgl-btn" id="bglSong" data-song='${att(SONG)}'>▶ Happy Birthday</button></div>
  <p class="bgl-fine">Следующий концерт — ровно через год. Билеты уже раскуплены.</p>
</section>
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);
const out="window.BGLDATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")+"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"bgl-data.js"),out);
console.log("✓ bgl-data.js: "+Math.round(out.length/1024)+" КБ, имя «"+NAME+"», пароль «"+PASS+"»");

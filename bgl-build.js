#!/usr/bin/env node
/* Комната для Багдагул — «BAGDAGUL · WORLD TOUR 2026»: концерт из 9 сцен по одной.
   01 The Call — звонок из Universe Support Center, обращение решается;
   02 The Grand Reveal — сцена, свет, афиша с фото;  03 Her Story — события года с пожеланиями;
   04 The Golden Ticket — all access pass с отрывным корешком;  05 The Setlist — 8 вымышленных треков;
   06 Lightstick — игра в такт, три уровня;  07 Boy Band — 8 красавчиков скандируют имя;
   08 The Letter — письмо от команды;  09 Final Encore — финал и «Повторить концерт».
   Разметка, стили и всё личное — здесь и уходят в шифртекст; в index.html только поведение.
   node bgl-build.js "пароль"
   Фото: bgl-photo.jpg (png/webp/heic тоже подойдут). Исходник в git не попадает.
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь ---- */
const NAME="Багдагул", LAT="BAGDAGUL";
const DATE_RU="23 ноября 2026", DAY_EN="23 November", YEAR="2026";
const PHOTO_CAP="Istanbul";
/* Her Story: только то, что известно (концерты, Стамбул, квартира, машина, поддержка) — без выдуманных подробностей */
const STORY=[
  {t:"JONY",             c:"незабываемый концерт",                    col:"#ff4fa0", ic:"mic",
   w:"Пусть любимые песни звучат вживую как можно чаще — и каждый раз так же, как в тот вечер."},
  {t:"Enrique Iglesias", c:"международная музыкальная энергия",       col:"#b9a3ff", ic:"vinyl",
   w:"Больше больших сцен и вечеров, когда весь зал поёт одну песню вместе с тобой."},
  {t:"Sadraddin",        c:"особенная атмосфера",                     col:"#f3d38b", ic:"moon",
   w:"Пусть особенное настроение того концерта остаётся с тобой надолго — в плейлисте и в сердце."},
  {t:"Istanbul",         c:"путешествие и новые впечатления",         col:"#7fe3ff", ic:"bridge",
   w:"Новых городов, красивых видов на воду и дорог, которые ведут только к хорошему."},
  {t:"New home",         c:"собственная квартира",                    col:"#ffd27a", ic:"home",
   w:"Пусть дома всегда будет тепло, светло и уютно, а каждый вечер хочется возвращаться именно туда."},
  {t:"New car",          c:"новая машина",                            col:"#ff9bcb", ic:"car",
   w:"Ровных дорог, зелёной волны на светофорах и любимой музыки в салоне — на полную."},
  {t:"Support team",     c:"профессиональный рост и новые возможности", col:"#8fe3cf", ic:"headset",
   w:"Пусть работа приносит удовольствие, сложные кейсы решаются легко, а впереди будет много роста и новых возможностей."},
  {t:"November 23",      c:"главный концерт года",                    col:"#f3d38b", ic:"cake", last:1,
   w:"Пусть этот день будет полон тёплых слов, а год после него — поводов улыбаться."}
];
/* Сет-лист: вымышленные треки — названия придуманы для этого концерта, чужих песен и текстов нет */
const TRACKS=[
  {t:"Новоселье",                       by:"feat. Новые ключи", d:"3:24",
   w:"Пусть ключи от новой квартиры открывают только хорошие дни: гости, смех, вкусный ужин и тёплые вечера."},
  {t:"Тур-бас",                         by:"feat. Новая машина", d:"2:58",
   w:"Пусть каждая поездка будет лёгкой, парковка находится сразу, а дорога всегда ведёт к хорошим событиям."},
  {t:"Istanbul Memories",               by:"bonus track", d:"4:11",
   w:"Пусть впереди будет ещё много путешествий, после которых остаются самые красивые фото и воспоминания."},
  {t:"JONY — Good Vibes",               by:"live", d:"3:05",
   w:"Хорошего настроения без перерывов — как на любимом концерте, когда хочется, чтобы песня не заканчивалась."},
  {t:"Enrique Energy",                  by:"stadium version", d:"3:47",
   w:"Энергии на всё задуманное и смелости для новых планов — с размахом мирового тура."},
  {t:"Sadraddin — Special Night",       by:"live", d:"4:02",
   w:"Побольше особенных вечеров, когда всё складывается идеально и хочется запомнить каждую минуту."},
  {t:"Hero — For Bagdagul",             by:"dedication", d:"3:33",
   w:"Ты — герой для каждого, кому помогла в поддержке. Пусть этот год отвечает тебе такой же заботой."},
  {t:"Тикет закрыт — Счастье открыто",  by:"финал", d:"5:00",
   w:"Пусть все сложные вопросы закрываются сами собой, а счастье будет открытым тикетом без срока выполнения."}
];
const ROLES=["лидер","вокал","рэп","танцы","визуал","главный вокал","рэп-лайн","макне"];
const LETTER=[
  "пусть впереди будет ещё больше путешествий, концертов, счастливых моментов, новых достижений, собственного уюта и поводов улыбаться.",
  "Пусть новая квартира наполнится теплом, машина привозит только к хорошим событиям, а работа приносит удовольствие и возможности для роста.",
  "Желаем, чтобы в твоей жизни всегда находилось место для людей, с которыми легко, спокойно и весело.",
  "Ты заслуживаешь красивого года. И пусть он будет даже лучше, чем ты ожидаешь."
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
  const ch=(name.trim()[0]||"B").toUpperCase();
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
    execFileSync("sips",["-s","format","jpeg","-s","formatOptions","72","-Z","900",src,"--out",tmp],{stdio:"ignore"});
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

/* ---------- бойз-бэнд: свои рисованные персонажи, не реальные знаменитости ----------
   Объём волос — за лицом, чёлка прядями — поверх; у каждого свой аксессуар и роль. */
const HAIR=["#1d1724","#d8d2e8","#ff8fc1","#2b3550","#e6c27a","#b9a8ff","#4a3226","#8fe3cf"];
const JACKET=["#ff4fa0","#2c2340","#f3d38b","#b9a3ff","#7fe3ff","#ff4fa0","#2c2340","#f3d38b"];
const SKIN=["#f6d7bd","#f1cfb0","#f7dcc6","#ecc7a6"];
const VOL="M14.2 38C12.4 20 19 7.5 30.5 7.5C42 7.5 48.6 20 45.8 38L43.8 34.5L42.6 38.5L41 34L19 34L17.4 38.5L16.2 34.5Z";
const TOP="M18.2 30C18 18 24 13.5 30.5 13.5C37 13.5 42.5 18 42 30";
const FRINGE=[
  {d:TOP+"L40.6 26L39.3 29L37.4 24.6L35.6 27.2L33.4 22.6L30.6 19.8L27.8 22.6L25.6 27.2L23.6 24.6L21.6 29L20.2 26Z", brow:28.4},          /* на пробор */
  {d:TOP+"L40.6 27L39.2 29.4L37.4 27L35.4 29.4L33.2 27L31 29.4L28.8 27L26.6 29.4L24.4 27L22.4 29.4L20.4 27Z", brow:0},                    /* прямая чёлка */
  {d:TOP+"L41 24.5L39.6 27.6L37 23.2L35.2 26.4L32.2 22.4L29.6 25.8L26.8 22.6L24.2 27.4L22 24.6L20.2 29.4Z", brow:28.6},                   /* косая */
  {d:"M18.4 27C18.5 15 24 11 31 11.5C38 12 42.5 16 41.8 27L40.6 22.8L38.6 20.6L34.5 19.4L30.5 19.6L26.5 20L22.6 21.4L20.4 23.6Z"
    +"M23.5 13.5C24.5 6.5 33 4.6 39.5 8.6C35.5 8.4 32.8 10 31.6 13.2Z", brow:24.6}                                                        /* кок */
];
const FR_OF=[0,1,2,3,0,2,3,1];          /* у восьмого панама — под ней прямая чёлка */
const ACC=[
  /* 0 тёмные очки */ {face:'<path d="M21 30.2h7.6v2.2a2.6 2.6 0 0 1-2.6 2.6h-2.4a2.6 2.6 0 0 1-2.6-2.6zM31.4 30.2H39v2.2a2.6 2.6 0 0 1-2.6 2.6h-2.4a2.6 2.6 0 0 1-2.6-2.6z" fill="#15101c"/><path d="M28.6 31h2.8" stroke="#15101c" stroke-width="1"/><path d="M22.4 31.2l2.4 0" stroke="#fff" stroke-opacity=".35" stroke-width=".8"/>'},
  /* 1 наушники на шее */ {neck:'<path d="M20 50c0 5 4.5 8 10 8s10-3 10-8" stroke="#2a2236" stroke-width="2.6" fill="none"/><rect x="16.5" y="47" width="6" height="8" rx="2.5" fill="#ff4fa0"/><rect x="37.5" y="47" width="6" height="8" rx="2.5" fill="#ff4fa0"/>'},
  /* 2 серьга и чокер */ {face:'<circle cx="18.4" cy="38" r="1.4" fill="none" stroke="#f3d38b" stroke-width=".9"/>', neck:'<path d="M26.6 47.6q3.4 1.6 6.8 0" stroke="#15101c" stroke-width="1.6" fill="none"/>'},
  /* 3 микрофон-гарнитура */ {face:'<path d="M41.4 33q1 7.4-6.6 8.2" stroke="#2a2236" stroke-width="1" fill="none"/><circle cx="34.4" cy="41.2" r="1.3" fill="#2a2236"/>'},
  /* 4 круглые очки */ {face:'<circle cx="25.1" cy="31.6" r="3.3" fill="none" stroke="#c9a45a" stroke-width=".9"/><circle cx="34.9" cy="31.6" r="3.3" fill="none" stroke="#c9a45a" stroke-width=".9"/><path d="M28.4 31.3h3.2" stroke="#c9a45a" stroke-width=".8"/>'},
  /* 5 цепочка */ {neck:'<path d="M24.6 52.8q5.4 6.2 10.8 0" stroke="#f3d38b" stroke-width="1.1" fill="none" stroke-dasharray="1.5 .8"/>'},
  /* 6 кожанка */ {neck:'<path d="M24.5 52.5L20.5 61l9.5.6zM35.5 52.5L39.5 61l-9.5.6z" fill="#000" opacity=".35"/>'},
  /* 7 панама */ {top:'<path d="M17.5 19C18.4 10.5 24 7 30.5 7S42.6 10.5 43.5 19z" fill="#fff6ec"/><path d="M13.5 20Q30.5 15.2 47.5 20L46 22.6Q30.5 18.4 15 22.6z" fill="#e9dccb"/>'}
];
function member(letter,i){
  const hair=HAIR[i%8], jk=JACKET[i%8], sk=SKIN[i%4], fr=FRINGE[FR_OF[i]], a=ACC[i]||{}, dark=jk==="#2c2340";
  const light=["#d8d2e8","#e6c27a","#8fe3cf","#ff8fc1","#b9a8ff"].includes(hair), browC=light?"#7a6656":hair;
  return `<figure class="bgl-m2" style="--d:${i}" data-l="${letter}"><svg viewBox="0 0 60 90" aria-hidden="true">
<path d="M6 82C6 61 15 52.5 30 52.5C45 52.5 54 61 54 82Z" fill="${jk}"/>
<path d="M24.5 52.5L30 61L35.5 52.5Z" fill="${dark?"#ff4fa0":"#fff"}" opacity=".92"/>
<path d="M26.6 41H33.4V53.5C31.6 55 28.4 55 26.6 53.5Z" fill="${sk}"/>
${a.neck||""}
<path d="${VOL}" fill="${hair}"/>
<path d="M18.8 29C18.8 20 23.7 16.5 30 16.5C36.3 16.5 41.2 20 41.2 29C41.2 37.5 36.3 44.2 30 45.2C23.7 44.2 18.8 37.5 18.8 29Z" fill="${sk}"/>
<path d="${fr.d}" fill="${hair}"/>
<path d="M23.5 15.8Q30.5 11.8 37.5 15.8" stroke="#fff" stroke-opacity=".3" stroke-width="1.3" fill="none" stroke-linecap="round"/>
${a.top||""}
${fr.brow&&!a.top?`<path d="M22.6 ${fr.brow}l4.4-.6M33 ${fr.brow-.6}l4.4.6" stroke="${browC}" stroke-width="1.1" stroke-linecap="round"/>`:""}
<path d="M22.9 32q2.2-2.2 4.4 0M32.7 32q2.2-2.2 4.4 0" stroke="#2a1e2c" stroke-width="1.25" fill="none" stroke-linecap="round"/>
<path d="M30.4 33.8l-.6 2.4h1" stroke="#c99a80" stroke-width=".75" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="23.8" cy="35.6" rx="2" ry="1" fill="#ff7aa8" opacity=".25"/><ellipse cx="36.2" cy="35.6" rx="2" ry="1" fill="#ff7aa8" opacity=".25"/>
<path d="M27.8 39.2q2.2 1.7 4.4 0" stroke="#b4546a" stroke-width="1.1" fill="none" stroke-linecap="round"/>
${a.face||""}
<rect x="13" y="61" width="34" height="27" rx="3.5" fill="#fff8fc" stroke="#ff4fa0" stroke-width="1.2"/>
<ellipse cx="13.6" cy="67" rx="2.8" ry="3" fill="${sk}"/><ellipse cx="46.4" cy="67" rx="2.8" ry="3" fill="${sk}"/>
<text x="30" y="81.5" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" font-weight="800" fill="#1a1222">${letter}</text>
</svg><figcaption>${ROLES[i]||""}</figcaption></figure>`;
}
const LETTERS=[...NAME.toUpperCase()];

/* ---------- иконки событий: свои контуры, анимируются при открытии ---------- */
const S='fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
const ICON={
  mic:`<g class="ic-mic"><rect x="17" y="5" width="14" height="22" rx="7" ${S} stroke-width="2.4"/><path d="M20 12h8M20 17h8" ${S} stroke-width="1.3" opacity=".6"/><path d="M12 21a12 12 0 0 0 24 0M24 33v7M17 41h14" ${S} stroke-width="2.4"/></g>`,
  vinyl:`<g class="ic-spin"><circle cx="24" cy="24" r="18" ${S} stroke-width="2.4"/><circle cx="24" cy="24" r="12.5" ${S} stroke-width="1" opacity=".5"/><circle cx="24" cy="24" r="5" fill="currentColor"/><path d="M33 10.5a16 16 0 0 1 5.4 7.5" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>`,
  moon:`<path d="M29 7a17 17 0 1 0 12 29A14 14 0 0 1 29 7z" ${S} stroke-width="2.4"/><g class="ic-tw" fill="currentColor"><circle cx="38" cy="9" r="1.8"/><circle cx="43" cy="19" r="1.3"/><circle cx="33" cy="17" r="1.1"/></g>`,
  bridge:`<path d="M3 33h42M10 33V11M38 33V11M10 12q14 16 28 0M10 12Q5 23 3 33M38 12q5 11 7 21" ${S} stroke-width="2.2"/><path d="M17 20.5V33M24 24v9M31 20.5V33" ${S} stroke-width="1" opacity=".6"/><g class="ic-tw" fill="currentColor"><circle cx="10" cy="10" r="1.7"/><circle cx="38" cy="10" r="1.7"/><circle cx="24" cy="23" r="1.3"/></g><path d="M5 40q5-2 10 0t10 0 10 0 10 0" ${S} stroke-width="1.4" opacity=".5"/>`,
  home:`<path d="M6 22L24 7l18 15M11 19v21h26V19" ${S} stroke-width="2.4"/><rect class="ic-win" x="15.5" y="23" width="6.5" height="6.5" rx="1"/><rect class="ic-win" x="26" y="23" width="6.5" height="6.5" rx="1"/><path d="M21 40v-6.5h6V40" ${S} stroke-width="2"/>`,
  car:`<g class="ic-car"><path d="M5 31v-6l5-9h21l7 8 5 1.4V31" ${S} stroke-width="2.4"/><circle cx="14" cy="32" r="4" ${S} stroke-width="2.4"/><circle cx="35" cy="32" r="4" ${S} stroke-width="2.4"/><path d="M13.6 18l-2.4 6.4H22V18zM25 18v6.4h9.6L29.4 18z" fill="currentColor" opacity=".35"/><path class="ic-beam" d="M44 25.4l12-5v13z" fill="#ffe9b8" opacity=".0"/></g>`,
  headset:`<path d="M10 28v-4a14 14 0 0 1 28 0v4" ${S} stroke-width="2.4"/><rect x="7" y="26" width="7" height="11" rx="3" fill="currentColor"/><rect x="34" y="26" width="7" height="11" rx="3" fill="currentColor"/><path d="M37.5 37q0 5.5-8.5 6.4h-3" ${S} stroke-width="2"/><g class="ic-waves" ${S} stroke-width="1.6"><path d="M45 21.5q2.4 4.5 0 9"/><path d="M3 21.5q-2.4 4.5 0 9"/></g>`,
  cake:`<rect x="10" y="26" width="28" height="14" rx="3" ${S} stroke-width="2.4"/><path d="M10 32q4.6 3 9.3 0t9.4 0 9.3 0" ${S} stroke-width="1.6"/><path d="M24 26v-7" ${S} stroke-width="2.4"/><path class="ic-flame" d="M24 8.5c2.6 3 3 5.2 0 8.2-3-3-2.6-5.2 0-8.2z" fill="#ffd27a"/><path d="M6 40h36" ${S} stroke-width="2.4"/>`
};

/* Звезда-мишень: своя, без ручки; скругление углов — обводкой того же цвета */
const STAR='<svg viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="bglStarG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6dc"/><stop offset=".35" stop-color="#ffe9b8"/><stop offset=".65" stop-color="#f3d38b"/><stop offset="1" stop-color="#ff9bcb"/></linearGradient></defs>'
  +'<path d="M50 4L61.2 34.6 93.8 35.8 68.1 55.9 77 87.2 50 69 23 87.2 31.9 55.9 6.2 35.8 38.8 34.6Z" fill="url(#bglStarG)" stroke="url(#bglStarG)" stroke-width="7" stroke-linejoin="round"/>'
  +'<path d="M50 20l5 14" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg>';
/* Зрители: два ряда голов и плеч силуэтом, огни над ними раскладывает index.html */
const heads=(n,cy,r,sh,fill,seed)=>{ let o=""; for(let i=0;i<n;i++){ const cx=((i+.5)*(400/n)+((i*37+seed)%9-4)).toFixed(1);
  o+=`<circle cx="${cx}" cy="${cy}" r="${r}"/><ellipse cx="${cx}" cy="${(cy+r+sh*.55).toFixed(1)}" rx="${(r*1.9).toFixed(1)}" ry="${sh}"/>`; } return `<g fill="${fill}">${o}</g>`; };
const HEADS=`<svg class="bgl-heads" viewBox="0 0 400 90" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${heads(16,40,8,16,"#0e0b18",3)}${heads(11,58,11,22,"#050409",7)}</svg>`;

/* Happy Birthday: [интервал от соль, длительность в долях, аккорд] — как у прошлых комнат */
const SONG=[[0,.75,"I"],[0,.25],[2,1],[0,1],[5,1],[4,2,"V"],
  [0,.75],[0,.25],[2,1],[0,1],[7,1],[5,2,"I"],
  [0,.75],[0,.25],[12,1],[9,1],[5,1,"IV"],[4,1,"I"],[2,2],
  [10,.75,"IV"],[10,.25],[9,1],[5,1,"I"],[7,1,"V"],[5,3,"I"]];
const att=o=>JSON.stringify(o).replace(/'/g,"&#39;").replace(/"/g,"&quot;");
const q=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
const SERIAL="BGL-2311-"+YEAR+"-"+String(crypto.randomInt(1000,9999));
const rnd=(a,b)=>a+Math.random()*(b-a);
const BEAMS=[[8,-24,"rgba(243,211,139,.55)",7.5],[24,-12,"rgba(255,79,160,.5)",6.2],[40,-5,"rgba(139,92,255,.55)",8.4],
             [60,6,"rgba(139,92,255,.55)",7.8],[76,13,"rgba(255,79,160,.5)",6.6],[92,24,"rgba(243,211,139,.55)",8.8]];
const SPARKS=Array.from({length:26},()=>`<i style="--x:${rnd(2,98).toFixed(1)}%;--s:${rnd(2,5).toFixed(1)}px;--t:${rnd(6,11).toFixed(1)}s;--d:-${rnd(0,10).toFixed(1)}s"></i>`).join("");
const PHONE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>';

const CSS=`
.hb-wrap.bgl-room{--bg:#07060c;--vi:#8b5cff;--vi2:#b9a3ff;--gd:#f3d38b;--gd2:#ffe9b8;--pk:#ff4fa0;--pk2:#ff9bcb;--wh:#fff6ec;--mu:#a49cb8;--gb:rgba(255,255,255,.12);
  --disp:"Arial Narrow","sans-serif-condensed","Roboto Condensed",var(--sans);
  --lat:"Avenir Next Condensed","Arial Narrow","sans-serif-condensed","Roboto Condensed",var(--sans);
  --ser:Georgia,"Times New Roman",serif;
  overflow-x:hidden;background:var(--bg);color:var(--wh)}
.bgl-room .hb-in{max-width:none;padding:0}
.bgl-room .hb-canvas{z-index:3}
.bgl-room .hb-x{top:calc(10px + env(safe-area-inset-top));right:12px;background:rgba(7,6,12,.6);border-color:var(--gb);color:var(--wh)}
.bgl-room button{font-family:inherit;-webkit-tap-highlight-color:transparent}
.bgl-room button:focus-visible{outline:2px solid var(--gd);outline-offset:3px}

.bgl-top{position:fixed;z-index:6;top:0;left:0;right:0;display:flex;align-items:center;gap:10px;padding:calc(14px + env(safe-area-inset-top)) 60px 20px 16px;
  background:linear-gradient(180deg,rgba(7,6,12,.85),rgba(7,6,12,0));pointer-events:none}
.bgl-top-in{flex:1;min-width:0}
.bgl-prog{display:flex;gap:4px}
.bgl-prog i{position:relative;flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.16);overflow:hidden}
.bgl-prog i.done{background:linear-gradient(90deg,var(--gd),var(--gd2))}
.bgl-prog i.cur::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--pk),var(--gd));transform-origin:left;animation:bglGrow .8s cubic-bezier(.2,.7,.2,1) both}
@keyframes bglGrow{from{transform:scaleX(0)}}
.bgl-lbl{margin:8px 0 0;font:600 10px/1.2 var(--sans);letter-spacing:2.4px;text-transform:uppercase;color:var(--mu);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bgl-lbl b{color:var(--wh)}
.bgl-snd{pointer-events:auto;flex:none;display:grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1px solid var(--gb);background:rgba(7,6,12,.55);color:var(--wh);cursor:pointer}
.bgl-snd svg{width:18px;height:18px} .bgl-snd .x{display:none} .bgl-snd.off .x{display:inline} .bgl-snd.off .w{display:none}
.bgl-nav{position:fixed;z-index:6;left:0;right:0;bottom:0;display:flex;justify-content:center;align-items:center;gap:12px;padding:26px 16px calc(14px + env(safe-area-inset-bottom));
  background:linear-gradient(0deg,rgba(7,6,12,.95) 45%,rgba(7,6,12,0));pointer-events:none}
.bgl-nav[hidden]{display:none}
.bgl-nav button{pointer-events:auto}
.bgl-back{flex:none;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;border:1px solid var(--gb);background:rgba(255,255,255,.06);color:var(--wh);cursor:pointer;transition:opacity .2s}
.bgl-back svg{width:22px;height:22px} .bgl-back.off{opacity:0;pointer-events:none!important}
.bgl-next{flex:0 1 300px;min-width:0;height:52px;padding:0 22px;border:0;border-radius:999px;cursor:pointer;font:700 15px var(--sans);color:#170b12;
  background:linear-gradient(90deg,var(--gd2),var(--gd) 45%,var(--pk2));box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 12px 34px -12px rgba(255,79,160,.75);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bgl-next[hidden]{display:none}

.bgl-sc{position:relative;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;justify-content:center;
  padding:calc(72px + env(safe-area-inset-top)) 20px calc(112px + env(safe-area-inset-bottom));overflow:hidden;isolation:isolate;outline:none}
.bgl-sc[hidden]{display:none}
.bgl-sc.on{animation:bglScIn .75s cubic-bezier(.2,.7,.2,1) both}
.bgl-sc.leave{animation:bglScOut .26s ease both}
@keyframes bglScIn{from{opacity:0;transform:translateY(16px)}}
@keyframes bglScOut{to{opacity:0;transform:translateY(-10px)}}
.bgl-in{position:relative;z-index:2;width:100%;max-width:560px;margin:0 auto}
.bgl-kick{margin:0 0 8px;font:700 10.5px var(--sans);letter-spacing:4px;text-transform:uppercase;color:var(--pk2)}
.bgl-h{margin:0 0 12px;font:800 clamp(36px,10.5vw,68px)/.95 var(--lat);letter-spacing:.01em;text-transform:uppercase;color:var(--wh)}
.bgl-hint{margin:0 0 20px;font-size:14.5px;line-height:1.55;color:var(--mu)}
.bgl-count{margin:16px 0 0;text-align:center;font:600 12.5px var(--sans);letter-spacing:.5px;color:var(--mu)}
.bgl-center{text-align:center}
.bgl-fine{margin:16px 0 0;text-align:center;font-size:11.5px;line-height:1.5;color:rgba(164,156,184,.75)}
.bgl-cta{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 28px;border:0;border-radius:999px;cursor:pointer;
  font:800 13.5px var(--sans);letter-spacing:1.6px;text-transform:uppercase;color:#1a0d10;background:linear-gradient(90deg,var(--gd2),var(--gd) 45%,var(--pk2));
  box-shadow:inset 0 1px 0 rgba(255,255,255,.6),0 16px 40px -14px rgba(255,79,160,.8);transition:transform .12s}
.bgl-cta:active{transform:scale(.97)} .bgl-cta:disabled{opacity:.55;cursor:default}
.bgl-ghost{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:54px;padding:0 24px;border-radius:999px;border:1px solid rgba(243,211,139,.45);
  background:rgba(255,255,255,.04);color:var(--gd2);font:800 13px var(--sans);letter-spacing:1.6px;text-transform:uppercase;cursor:pointer}
@keyframes bglFade{from{opacity:0;transform:translateY(10px)}}
@keyframes bglUp{from{opacity:0;transform:translateY(24px) scale(.97)}}
@keyframes bglRise{from{opacity:0;transform:translateY(60%) scale(.9)}}
@keyframes bglTrack{from{opacity:0;letter-spacing:1.1em}}
@keyframes bglSwing{to{transform:rotate(calc(var(--r) * -1))}}
@keyframes bglRot{to{transform:rotate(360deg)}}
@keyframes bglTw{from{opacity:.2;transform:scale(.6)}}

/* 01 · звонок */
.bgl-call{background:radial-gradient(60% 40% at 50% 36%,rgba(139,92,255,.2),transparent 70%),#030207;text-align:center}
.bgl-ringui.out{animation:bglOut .38s ease forwards} @keyframes bglOut{to{opacity:0;transform:scale(.94)}}
.bgl-orb{position:relative;width:110px;height:110px;margin:0 auto 28px}
.bgl-orb span{position:absolute;inset:0;border-radius:50%;border:1.5px solid rgba(185,163,255,.55);animation:bglPulse 2.4s cubic-bezier(.2,.6,.3,1) infinite}
.bgl-orb span:nth-child(2){animation-delay:.8s} .bgl-orb span:nth-child(3){animation-delay:1.6s}
@keyframes bglPulse{from{transform:scale(1);opacity:.9}to{transform:scale(2.3);opacity:0}}
.bgl-orb svg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 0 22px rgba(139,92,255,.75))}
.bgl-call-k{margin:0;font:600 11px var(--sans);letter-spacing:4px;text-transform:uppercase;color:var(--mu)}
.bgl-call-t{margin:12px 0 8px;font:800 clamp(28px,8.6vw,48px)/1 var(--lat);letter-spacing:.04em;color:var(--wh)}
.bgl-call-s{margin:0;color:var(--mu);font-size:14.5px}
.bgl-call-btns{display:flex;justify-content:center;gap:clamp(40px,16vw,90px);margin-top:54px}
.bgl-cb{display:flex;flex-direction:column;align-items:center;gap:10px;font:600 12px var(--sans);color:var(--mu)}
.bgl-cb button{display:grid;place-items:center;width:70px;height:70px;border-radius:50%;border:0;cursor:pointer}
.bgl-cb svg{width:30px;height:30px;fill:#fff}
.bgl-dec{background:#ff3b5c} .bgl-dec svg{transform:rotate(135deg)}
.bgl-acc{background:#2fd27a;animation:bglBuzz 1.6s ease-in-out infinite}
@keyframes bglBuzz{0%,100%{transform:none;box-shadow:0 0 0 0 rgba(47,210,122,.55)}8%{transform:rotate(-12deg)}16%{transform:rotate(12deg)}24%{transform:rotate(-7deg)}32%{transform:none}70%{box-shadow:0 0 0 20px rgba(47,210,122,0)}}
.bgl-dec.shake{animation:bglShake .5s}
@keyframes bglShake{20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}
.bgl-call-note{min-height:22px;margin:20px 0 0;color:var(--gd);font-size:14px}
.bgl-desk{max-width:430px;margin:0 auto;padding:20px 20px 18px;border-radius:22px;text-align:left;border:1px solid var(--gb);
  background:linear-gradient(180deg,rgba(255,255,255,.085),rgba(255,255,255,.03));box-shadow:0 40px 80px -30px rgba(139,92,255,.5),inset 0 1px 0 rgba(255,255,255,.12);
  -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.bgl-desk.in{animation:bglUp .55s cubic-bezier(.2,.7,.2,1) both}
.bgl-desk-h{display:flex;align-items:center;gap:8px;padding-bottom:12px;margin-bottom:4px;border-bottom:1px solid var(--gb);font-size:11.5px;color:var(--mu)}
.bgl-desk-h b{flex:1;min-width:0;color:var(--wh);font:700 13px var(--sans)}
.bgl-desk-h .dot{flex:none;width:8px;height:8px;border-radius:50%;background:#2fd27a;box-shadow:0 0 10px #2fd27a}
.bgl-desk-f{margin:0} .bgl-desk-f div{display:flex;gap:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.bgl-desk-f dt{width:88px;flex:none;font-size:12px;color:var(--mu)} .bgl-desk-f dd{margin:0;min-width:0;font:600 14px var(--sans)}
.bgl-desk-f .max{color:var(--pk2);font-family:var(--lat);font-weight:800;letter-spacing:2.5px}
.bgl-steps{list-style:none;margin:14px 0 0;padding:0}
.bgl-steps li{display:flex;align-items:center;gap:10px;padding:6px 0;font:700 13px var(--lat);letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.3);transition:color .3s}
.bgl-steps li::before{content:"";flex:none;display:grid;place-items:center;width:17px;height:17px;border-radius:50%;border:1.5px solid rgba(255,255,255,.25);box-sizing:border-box;font:800 11px var(--sans);color:#07060c}
.bgl-steps li.run{color:var(--wh)} .bgl-steps li.run::before{border-color:var(--gd);border-right-color:transparent;animation:bglRot .7s linear infinite}
.bgl-steps li.done{color:var(--wh)} .bgl-steps li.done::before{content:"✓";border-color:#2fd27a;background:#2fd27a}
.bgl-steps li.done:last-child{color:#7df0b0}
.bgl-desk-bar{height:4px;margin-top:12px;border-radius:4px;background:rgba(255,255,255,.08);overflow:hidden}
.bgl-desk-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--vi),var(--pk),var(--gd));transition:width .8s cubic-bezier(.2,.7,.2,1)}
.bgl-desk-ok{margin-top:20px;text-align:center;animation:bglUp .5s ease both}
.bgl-desk-ok p{margin:0 0 18px;font:italic 400 19px/1.45 var(--ser);color:var(--gd2)}
.bgl-skip{display:block;margin:24px auto 0;padding:12px 16px;border:0;background:none;color:var(--mu);font:600 12.5px var(--sans);text-decoration:underline;text-underline-offset:3px;cursor:pointer}
.bgl-skip[hidden]{display:none}

/* 02 · открытие */
.bgl-rv{background:#05040a;text-align:center}
.bgl-rv-cam{position:absolute;inset:0;z-index:0;transform-origin:50% 40%}
.bgl-haze{position:absolute;inset:-10%;background:radial-gradient(40% 30% at 28% 30%,rgba(139,92,255,.38),transparent 70%),radial-gradient(40% 30% at 72% 34%,rgba(255,79,160,.32),transparent 70%),
  radial-gradient(60% 40% at 50% 88%,rgba(243,211,139,.18),transparent 70%);animation:bglDrift 14s ease-in-out infinite alternate}
@keyframes bglDrift{to{transform:translate3d(3%,-2%,0) scale(1.06)}}
.bgl-beams i{position:absolute;top:-8%;width:36%;height:112%;left:calc(var(--x) - 18%);transform-origin:50% 0;transform:rotate(var(--r));
  background:linear-gradient(180deg,var(--c),transparent 78%);clip-path:polygon(47% 0,53% 0,100% 100%,0 100%);mix-blend-mode:screen;opacity:.6;animation:bglSwing var(--t) ease-in-out infinite alternate}
.bgl-floor{position:absolute;left:-40%;right:-40%;bottom:-6%;height:46%;transform:perspective(420px) rotateX(62deg);transform-origin:50% 100%;opacity:.75;
  background:linear-gradient(rgba(255,79,160,.4) 1px,transparent 1px) 0 0/100% 34px,linear-gradient(90deg,rgba(139,92,255,.4) 1px,transparent 1px) 0 0/48px 100%;
  -webkit-mask:linear-gradient(0deg,#000 30%,transparent);mask:linear-gradient(0deg,#000 30%,transparent)}
.bgl-rv .bgl-in{max-width:980px;display:flex;flex-direction:column;align-items:center}
.bgl-led{position:relative;width:min(290px,68vw);margin:0 0 26px;padding:6px;border-radius:18px;
  background:linear-gradient(135deg,rgba(243,211,139,.7),rgba(255,79,160,.55),rgba(139,92,255,.7));box-shadow:0 0 70px -6px rgba(255,79,160,.6),0 30px 60px -20px #000}
.bgl-led img{display:block;width:100%;aspect-ratio:1;object-fit:cover;border-radius:13px}
.bgl-led::after{content:"";position:absolute;inset:6px;border-radius:13px;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.1) 0 1px,transparent 1px 3px)}
.bgl-led figcaption{position:absolute;z-index:1;left:16px;bottom:16px;padding:5px 11px;border-radius:999px;background:rgba(7,6,12,.72);font:700 10px var(--lat);letter-spacing:2.5px;text-transform:uppercase}
.bgl-big{margin:0;font:800 clamp(50px,15.5vw,150px)/.9 var(--lat);letter-spacing:.015em;white-space:nowrap}
.bgl-big span{display:inline-block;background:linear-gradient(180deg,#fff 28%,var(--gd2) 62%,var(--gd));-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 20px rgba(255,79,160,.45))}
.bgl-wt{margin:14px 0 0;padding-left:.5em;font:700 clamp(13px,3.7vw,21px) var(--lat);letter-spacing:.5em;text-transform:uppercase;color:var(--gd)}
.bgl-rv-row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px 14px;margin-top:22px;font:700 11px var(--lat);letter-spacing:3px;text-transform:uppercase}
.bgl-rv-row i{width:28px;height:1px;background:var(--gd)}
.bgl-rv-row span:last-child{padding:7px 13px;border:1px solid rgba(243,211,139,.55);border-radius:999px;color:var(--gd2);box-shadow:0 0 18px -6px var(--gd)}
.bgl-rv.play .bgl-rv-cam{animation:bglCam 3.4s cubic-bezier(.2,.6,.2,1) both}
@keyframes bglCam{from{transform:scale(1.35) translateY(6%);opacity:0}30%{opacity:1}}
.bgl-rv.play .bgl-beams i{animation:bglBeamOn .9s ease both,bglSwing var(--t) ease-in-out infinite alternate;animation-delay:calc(var(--k) * .18s),calc(var(--k) * .18s + .9s)}
@keyframes bglBeamOn{from{opacity:0}}
.bgl-rv.play .bgl-led{animation:bglLed 1s .9s cubic-bezier(.2,.7,.2,1) both}
@keyframes bglLed{from{clip-path:inset(49% 0 49% 0);filter:brightness(3)}60%{clip-path:inset(0);filter:brightness(1.5)}}
.bgl-rv.play .bgl-big span{animation:bglRise .8s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(1.5s + var(--i) * .07s)}
.bgl-rv.play .bgl-wt{animation:bglTrack 1s 2.2s cubic-bezier(.2,.7,.2,1) both}
.bgl-rv.play .bgl-rv-row{animation:bglFade .8s 2.6s ease both}

/* 03 · история */
.bgl-story{background:radial-gradient(80% 50% at 0% 0%,rgba(139,92,255,.22),transparent 60%),radial-gradient(70% 50% at 100% 100%,rgba(255,79,160,.15),transparent 60%),#08070e}
.bgl-tl{position:relative;list-style:none;margin:4px 0 0;padding:0}
.bgl-tl::before{content:"";position:absolute;left:30px;top:24px;bottom:24px;width:2px;background:linear-gradient(180deg,var(--vi),var(--pk),var(--gd));opacity:.5}
.bgl-ev{position:relative;margin:0 0 8px}
.bgl-ev button{display:flex;align-items:center;gap:14px;width:100%;min-height:68px;padding:3px 4px 3px 0;border:0;background:none;color:inherit;text-align:left;cursor:pointer}
.bgl-ev-ic{position:relative;flex:none;display:grid;place-items:center;width:62px;height:62px;border-radius:50%;border:1px solid var(--gb);
  background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.16),rgba(255,255,255,.03)),#100d18;box-shadow:0 0 0 5px #08070e;transition:box-shadow .4s,border-color .4s}
.bgl-ev-ic svg{width:34px;height:34px;color:var(--c);overflow:visible}
.bgl-ev-ic svg *{transform-box:fill-box;transform-origin:center}
.bgl-ev.open .bgl-ev-ic{border-color:var(--c);box-shadow:0 0 0 5px #08070e,0 0 28px -2px var(--c)}
.bgl-ev-t{flex:1;min-width:0}
.bgl-ev-t b{display:block;font:800 21px/1.05 var(--lat);letter-spacing:.03em;text-transform:uppercase}
.bgl-ev-t i{display:block;margin-top:4px;font-style:normal;font-size:13px;line-height:1.35;color:var(--mu)}
.bgl-ev.last .bgl-ev-t b{color:var(--gd)}
.bgl-ev-plus{position:relative;flex:none;width:30px;height:30px;border-radius:50%;border:1px solid var(--gb);transition:transform .35s,border-color .35s}
.bgl-ev-plus::before,.bgl-ev-plus::after{content:"";position:absolute;left:50%;top:50%;width:11px;height:1.5px;margin:-.75px 0 0 -5.5px;background:var(--wh)}
.bgl-ev-plus::after{transform:rotate(90deg)}
.bgl-ev.open .bgl-ev-plus{transform:rotate(45deg);border-color:var(--c)}
.bgl-ev-w{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.2,.7,.2,1)}
.bgl-ev-w>div{overflow:hidden;min-height:0}
.bgl-ev-w p{margin:4px 0 10px 76px;padding:12px 14px;border-radius:14px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.04);font-size:15px;line-height:1.6}
.bgl-ev.open .bgl-ev-w{grid-template-rows:1fr}
.bgl-ev.open .ic-mic{animation:bglWig .8s ease}
@keyframes bglWig{25%{transform:rotate(-12deg)}50%{transform:rotate(10deg)}75%{transform:rotate(-5deg)}}
.bgl-ev.open .ic-spin{animation:bglRot 2.4s linear infinite}
.bgl-ev.open .ic-tw circle{animation:bglTw .9s ease-in-out infinite alternate}
.bgl-ev.open .ic-tw circle:nth-child(2){animation-delay:.3s} .bgl-ev.open .ic-tw circle:nth-child(3){animation-delay:.6s}
.ic-win{fill:rgba(255,255,255,.14);transition:fill .5s} .bgl-ev.open .ic-win{fill:#ffd27a} .bgl-ev.open .ic-win+.ic-win{transition-delay:.3s}
.bgl-ev.open .ic-car{animation:bglDrive .8s cubic-bezier(.2,.7,.2,1)} @keyframes bglDrive{from{transform:translateX(-12px);opacity:.3}}
.ic-beam{transition:opacity .4s .3s} .bgl-ev.open .ic-beam{opacity:.9!important}
.bgl-ev.open .ic-waves path{animation:bglTw .7s ease-in-out infinite alternate}
.ic-flame{opacity:.35} .bgl-ev.open .ic-flame{opacity:1;animation:bglFlick .5s ease-in-out infinite alternate}
@keyframes bglFlick{to{transform:scale(.85,1.12) rotate(4deg)}}

/* 04 · билет */
.bgl-tk{background:radial-gradient(60% 45% at 50% 45%,rgba(243,211,139,.17),transparent 70%),#09080d;text-align:center}
.bgl-tk .bgl-h{font-size:clamp(32px,9.5vw,60px)}
.bgl-pass-wrap{position:relative;width:min(310px,84vw);margin:0 auto;perspective:900px}
.bgl-lanyard{position:relative;width:30px;height:58px;margin:6px auto -8px}
.bgl-lanyard::before{content:"";position:absolute;left:4px;right:4px;top:0;bottom:16px;border-radius:2px;-webkit-mask:linear-gradient(180deg,transparent,#000 55%);mask:linear-gradient(180deg,transparent,#000 55%);
  background:repeating-linear-gradient(180deg,var(--pk) 0 14px,#ff7cb8 14px 15px);box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}
.bgl-lanyard::after{content:"";position:absolute;left:50%;bottom:0;width:22px;height:22px;margin-left:-11px;border-radius:50%;border:3px solid #d6dae2;box-shadow:0 2px 4px rgba(0,0,0,.5)}
.bgl-pass{position:relative;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .25s ease-out;filter:drop-shadow(0 30px 36px rgba(0,0,0,.6))}
.bgl-pass-main{position:relative;overflow:hidden;padding:30px 22px 20px;border-radius:20px 20px 0 0;color:#2a1c0c;text-align:left;
  background:linear-gradient(135deg,#fbeec4 0%,#e2bf72 28%,#fff3d0 50%,#cfa557 72%,#f6e2a8 100%)}
.bgl-pass-main::before{content:"";position:absolute;z-index:2;top:12px;left:50%;width:46px;height:8px;margin-left:-23px;border-radius:5px;background:#09080d;box-shadow:inset 0 1px 2px rgba(0,0,0,.6)}
.bgl-holo{position:absolute;inset:0;pointer-events:none;mix-blend-mode:soft-light;opacity:.85;
  background:linear-gradient(115deg,transparent 32%,rgba(255,255,255,.95) 45%,transparent 58%) 0 0/260% 260% no-repeat,
    conic-gradient(from 0deg at 30% 40%,#ff9bcb,#b9a3ff,#7fe3ff,#b8ffd9,#ffe9a8,#ff9bcb);animation:bglHolo 4.5s ease-in-out infinite alternate}
@keyframes bglHolo{from{background-position:0% 0%,0 0}to{background-position:100% 100%,0 0}}
.bgl-pass-k{position:relative;margin:6px 0 10px;font:700 9.5px var(--lat);letter-spacing:3px;text-transform:uppercase;color:#7a5a24}
.bgl-pass-t{position:relative;margin:0 0 16px}
.bgl-pass-t span{display:block;font:800 40px/.95 var(--lat);letter-spacing:.02em}
.bgl-pass-t b{display:inline-block;margin-top:8px;padding:5px 10px;border-radius:6px;background:#2a1c0c;color:var(--gd2);font:800 11px var(--lat);letter-spacing:3px;text-transform:uppercase}
.bgl-pass-f{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:10px 14px;margin:0}
.bgl-pass-f div{min-width:0} .bgl-pass-f .w{grid-column:1/-1}
.bgl-pass-f dt{font:700 9px var(--lat);letter-spacing:2px;text-transform:uppercase;color:#8a6a34}
.bgl-pass-f dd{margin:2px 0 0;font:800 14.5px/1.25 var(--sans)}
.bgl-pass-ser{position:relative;margin:16px 0 0;font:700 10px var(--mono);letter-spacing:1.2px;color:#7a5a24}
.bgl-granted{position:absolute;z-index:2;right:12px;top:52px;padding:6px 10px;border:2px solid #1f8a52;border-radius:8px;background:rgba(255,255,255,.25);
  font:800 11px var(--lat);letter-spacing:2.5px;text-transform:uppercase;color:#1f8a52;transform:rotate(-14deg) scale(1.8);opacity:0;
  transition:opacity .3s .55s,transform .4s .55s cubic-bezier(.2,.8,.2,1.3)}
.bgl-pass.torn .bgl-granted{opacity:1;transform:rotate(-14deg) scale(1)}
.bgl-pass-stub{position:relative;display:flex;justify-content:space-between;align-items:center;width:100%;min-height:64px;padding:14px 22px 16px;border:0;border-radius:0 0 20px 20px;
  cursor:pointer;color:#2a1c0c;background:linear-gradient(135deg,#f3dc9c,#d6b064 50%,#f8e7b6);font:inherit}
.bgl-pass-stub::before{content:"";position:absolute;left:14px;right:14px;top:-4px;height:8px;background:radial-gradient(circle,#09080d 2.6px,transparent 3px) 0 50%/11px 8px repeat-x}
.bgl-pass-stub span{font:700 9px var(--lat);letter-spacing:2px;text-transform:uppercase;color:#7a5a24}
.bgl-pass-stub span:last-child{font-family:var(--sans);letter-spacing:1px}
.bgl-pass-stub b{font:800 21px var(--lat);letter-spacing:.05em}
.bgl-pass-stub:not(:disabled){animation:bglNudge 2.6s 1.2s ease-in-out infinite}
@keyframes bglNudge{0%,84%,100%{transform:none}88%{transform:translateY(3px) rotate(1deg)}92%{transform:translateY(-1px) rotate(-1deg)}}
.bgl-pass.torn .bgl-pass-stub{animation:bglTear 1.15s cubic-bezier(.5,0,.7,.4) forwards;pointer-events:none}
@keyframes bglTear{0%{transform:none}18%{transform:translate(4px,9px) rotate(5deg)}100%{transform:translate(70px,360px) rotate(40deg);opacity:0}}
.bgl-pass.torn .bgl-pass-main{border-radius:20px}
.bgl-tk .bgl-hint{margin:22px 0 0}

/* 05 · сет-лист */
.bgl-set{background:radial-gradient(70% 40% at 50% 0%,rgba(255,79,160,.17),transparent 70%),#07070d}
.bgl-np{position:relative;display:grid;grid-template-columns:78px 1fr;gap:16px;align-items:center;padding:16px;border-radius:20px;border:1px solid var(--gb);
  background:linear-gradient(135deg,rgba(139,92,255,.24),rgba(255,79,160,.14));box-shadow:0 30px 60px -30px rgba(139,92,255,.6)}
.bgl-np-art{display:flex;align-items:flex-end;justify-content:center;gap:4px;width:78px;height:78px;padding:16px 12px;border-radius:14px;box-sizing:border-box;
  background:radial-gradient(circle at 30% 25%,var(--pk),var(--vi) 60%,#2a1640);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}
.bgl-np-art i{width:7px;height:30%;border-radius:3px;background:rgba(255,255,255,.92)}
.bgl-np.playing .bgl-np-art i{animation:bglEq .9s ease-in-out infinite alternate}
.bgl-np.playing .bgl-np-art i:nth-child(2){animation-delay:-.4s} .bgl-np.playing .bgl-np-art i:nth-child(3){animation-delay:-.7s}
.bgl-np.playing .bgl-np-art i:nth-child(4){animation-delay:-.2s} .bgl-np.playing .bgl-np-art i:nth-child(5){animation-delay:-.55s}
@keyframes bglEq{from{height:18%}to{height:100%}}
.bgl-np-body{min-width:0}
.bgl-np-k{margin:0;font:700 10px var(--lat);letter-spacing:2.5px;text-transform:uppercase;color:var(--pk2)}
.bgl-np h3{margin:4px 0 2px;font:800 19px/1.15 var(--disp);overflow-wrap:anywhere}
.bgl-np-by{margin:0;font-size:12.5px;color:var(--mu)}
.bgl-np-bar{height:4px;margin-top:10px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}
.bgl-np-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--gd),var(--pk))}
.bgl-np-time{display:flex;justify-content:space-between;margin-top:5px;font:600 10.5px var(--mono);color:var(--mu)}
.bgl-trk{list-style:none;margin:14px 0 0;padding:0}
.bgl-trk li{border-bottom:1px solid rgba(255,255,255,.06)}
.bgl-trk button{display:flex;align-items:center;gap:14px;width:100%;min-height:60px;padding:10px 4px;border:0;background:none;color:inherit;text-align:left;cursor:pointer}
.bgl-trk .n{position:relative;flex:none;width:26px;font:700 13px var(--mono);color:var(--mu)}
.bgl-trk .t{flex:1;min-width:0} .bgl-trk .t b{display:block;font:700 15.5px/1.25 var(--sans)} .bgl-trk .t i{font-style:normal;font-size:12px;color:var(--mu)}
.bgl-trk .d{flex:none;font:600 12px var(--mono);color:var(--mu)}
.bgl-trk li.played .n{color:var(--gd)}
.bgl-trk li.now .t b{color:var(--pk2)}
.bgl-trk li.now .n{color:transparent}
.bgl-trk li.now .n::after{content:"";position:absolute;left:3px;top:50%;width:14px;height:13px;margin-top:-7px;
  background:linear-gradient(var(--pk2),var(--pk2)) 0 100%/3px 55% no-repeat,linear-gradient(var(--pk2),var(--pk2)) 5px 100%/3px 100% no-repeat,linear-gradient(var(--pk2),var(--pk2)) 10px 100%/3px 35% no-repeat}
.bgl-trk-w{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.2,.7,.2,1)}
.bgl-trk-w>div{overflow:hidden;min-height:0}
.bgl-trk-w p{margin:0 0 14px 40px;padding:12px 14px;border-left:2px solid var(--pk);border-radius:0 12px 12px 0;background:rgba(255,79,160,.08);font-size:14.5px;line-height:1.6}
.bgl-trk li.played .bgl-trk-w{grid-template-rows:1fr}

/* 06 · зажги зал: зрители с лайтстиками, на экране сцены разгорается имя; мишень — звезда */
.bgl-ls{background:#06050b;text-align:center}
.bgl-ls .bgl-hint{margin-bottom:14px}
.bgl-how{display:flex;justify-content:center;gap:10px;list-style:none;margin:0 auto 16px;padding:0;max-width:460px}
.bgl-how li{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;font:600 11.5px/1.3 var(--sans);color:var(--wh)}
.bgl-how i{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;font:800 12px var(--sans);font-style:normal;color:#170b12;background:linear-gradient(135deg,var(--gd2),var(--gd))}
.bgl-hall{--heat:0;position:relative;height:clamp(220px,58vw,320px);border-radius:22px;overflow:hidden;border:1px solid var(--gb);
  background:linear-gradient(180deg,#170e26,#08060d 78%);touch-action:manipulation;-webkit-user-select:none;user-select:none}
.bgl-hall::before{content:"";position:absolute;inset:0;background:radial-gradient(80% 70% at 50% 0%,rgba(255,79,160,.6),rgba(139,92,255,.22) 45%,transparent 75%);
  opacity:calc(.12 + var(--heat) * .88);transition:opacity .4s}
.bgl-hall.gold::before{background:radial-gradient(85% 75% at 50% 0%,rgba(243,211,139,.8),rgba(255,79,160,.22) 50%,transparent 80%);opacity:1}
.bgl-hall-scr{position:absolute;left:16%;right:16%;top:7%;height:19%;display:grid;place-items:center;border-radius:8px;border:1px solid rgba(243,211,139,.35);
  background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.01));box-shadow:0 0 calc(var(--heat) * 40px) rgba(255,79,160,.35)}
.bgl-hall-scr span{padding-left:.32em;font:800 clamp(14px,4.4vw,22px) var(--lat);letter-spacing:.32em;color:var(--gd2);
  opacity:calc(.14 + var(--heat) * .86);text-shadow:0 0 calc(var(--heat) * 18px) rgba(255,79,160,.9);transition:opacity .4s}
.bgl-hall.gold .bgl-hall-scr span{color:#fff;opacity:1;text-shadow:0 0 18px var(--gd),0 0 36px var(--pk)}
.bgl-crowd{position:absolute;inset:0}
.bgl-crowd i{position:absolute;left:var(--x);bottom:var(--y);width:calc(10px * var(--s));height:calc(10px * var(--s));margin-left:calc(-5px * var(--s));
  border-radius:50%;background:rgba(255,255,255,.12);transition:background .35s,box-shadow .35s}
.bgl-crowd i::after{content:"";position:absolute;left:50%;top:85%;width:1.5px;height:calc(9px * var(--s));margin-left:-.75px;background:rgba(255,255,255,.16)}
.bgl-crowd i.on{background:var(--c);box-shadow:0 0 calc(12px * var(--s)) var(--c)}
.bgl-crowd.wave i.on{animation:bglWave .7s var(--dl) ease-out}
@keyframes bglWave{40%{transform:translateY(-5px) scale(1.35)}}
.bgl-crowd.gold i{background:var(--gd);box-shadow:0 0 12px var(--gd);animation:bglGlow 1.6s var(--dl) ease-in-out infinite alternate}
@keyframes bglGlow{to{opacity:.55;transform:translateY(-3px)}}
.bgl-heads{position:absolute;left:0;bottom:0;width:100%;height:30%;pointer-events:none}
.bgl-lvl{position:absolute;z-index:2;left:0;right:0;top:40%;padding:0 10px;font:800 clamp(18px,5.6vw,30px) var(--disp);letter-spacing:.08em;text-transform:uppercase;
  text-shadow:0 0 20px rgba(255,79,160,.85);opacity:0;pointer-events:none}
.bgl-lvl small{display:block;margin-bottom:4px;font:700 11px var(--sans);letter-spacing:3px;color:var(--gd2)}
.bgl-lvl.show{animation:bglBanner 1.3s ease both}
@keyframes bglBanner{0%{opacity:0;transform:scale(1.25)}25%,75%{opacity:1;transform:none}100%{opacity:0;transform:scale(.96)}}
.bgl-ov{position:absolute;z-index:3;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:8px;padding:16px 16px 18px;
  background:linear-gradient(0deg,rgba(7,6,12,.92) 30%,rgba(7,6,12,.55) 70%,rgba(7,6,12,.25));transition:opacity .6s}
.bgl-ov.fin{background:linear-gradient(0deg,rgba(7,6,12,.72),rgba(7,6,12,0) 62%)} .bgl-ov.fin .bgl-ov-k{display:none}
.bgl-ov.hide{opacity:0;pointer-events:none}
.bgl-ov-k{margin:0;font:700 10.5px var(--sans);letter-spacing:3px;text-transform:uppercase;color:var(--pk2)}
.bgl-ov-t{margin:0;max-width:300px;font:700 16px/1.35 var(--sans);color:var(--wh)}
.bgl-ov-t.fin{font:italic 400 clamp(20px,5.6vw,30px)/1.25 var(--ser);color:var(--gd2);text-shadow:0 0 24px rgba(243,211,139,.7)}
.bgl-ov .bgl-cta{margin-top:6px}
.bgl-ov-res{margin:0;font:600 12px var(--sans);color:var(--mu)} .bgl-ov-res:empty{display:none}
.bgl-ls-hud{display:flex;justify-content:space-between;gap:10px;margin:10px 4px 0;font:700 11px var(--sans);letter-spacing:1.2px;text-transform:uppercase;color:var(--mu)}
.bgl-ls-pad{position:relative;height:140px;display:grid;place-items:center;touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;scroll-margin-bottom:110px}
.bgl-star{position:relative;width:96px;height:96px;padding:0;border:0;background:none;cursor:pointer;
  filter:drop-shadow(0 0 14px rgba(255,79,160,.55)) drop-shadow(0 0 28px rgba(243,211,139,.35))}
.bgl-star svg{display:block;width:100%;height:100%;overflow:visible}
.bgl-star.hit{animation:bglHitS .2s ease}
@keyframes bglHitS{50%{transform:scale(.86) rotate(-8deg)}}
.bgl-ls-ring{position:absolute;left:50%;top:50%;width:96px;height:96px;margin:-48px 0 0 -48px;border-radius:50%;border:3px solid var(--gd);box-sizing:border-box;
  opacity:0;pointer-events:none;box-shadow:0 0 14px rgba(243,211,139,.6);will-change:transform}
.bgl-ls-pad.demo .bgl-ls-ring{animation:bglDemo 1.8s cubic-bezier(.45,0,.55,1) infinite}
@keyframes bglDemo{0%{transform:scale(2.4);opacity:0}15%{opacity:.55}80%{transform:scale(1);opacity:1}100%{transform:scale(1);opacity:0}}
.bgl-ls-pad.demo .bgl-star{animation:bglDemoStar 1.8s ease-in-out infinite}
@keyframes bglDemoStar{0%,76%,100%{transform:none}84%{transform:scale(.88) rotate(-6deg)}}
.bgl-ls-hit{position:absolute;left:0;right:0;top:0;font:800 16px var(--disp);letter-spacing:.12em;text-transform:uppercase;color:var(--gd);opacity:0;pointer-events:none}
.bgl-ls-hit.show{animation:bglPop .6s ease forwards} .bgl-ls-hit.gd{color:var(--vi2)} .bgl-ls-hit.ms{color:#ff8a9a}
@keyframes bglPop{0%{opacity:0;transform:translateY(6px)}20%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-12px)}}

/* 07 · бойз-бэнд */
.bgl-band{background:radial-gradient(70% 45% at 50% 100%,rgba(139,92,255,.28),transparent 70%),#07060c;text-align:center}
.bgl-band .bgl-in{max-width:900px}
.bgl-band .bgl-center{margin-top:12px}
.bgl-spots{position:absolute;inset:0;z-index:0;pointer-events:none}
.bgl-spots i{position:absolute;top:-5%;width:40%;height:100%;left:calc(var(--x) - 20%);transform-origin:50% 0;transform:rotate(var(--r));
  background:linear-gradient(180deg,rgba(255,246,236,.26),transparent 80%);clip-path:polygon(46% 0,54% 0,100% 100%,0 100%);mix-blend-mode:screen;animation:bglSwing var(--t) ease-in-out infinite alternate}
.bgl-band2{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px;margin:8px auto 0}
.bgl-m2{position:relative;margin:0;animation:bglBob 1.8s ease-in-out infinite;animation-delay:calc(var(--d) * -.22s)}
.bgl-m2::before{content:"";position:absolute;left:-25%;right:-25%;top:-50%;bottom:20%;background:radial-gradient(50% 60% at 50% 100%,rgba(255,246,236,.24),transparent 70%);
  pointer-events:none;opacity:0;transition:opacity .4s}
.bgl-m2.lit::before{opacity:1}
.bgl-m2 svg{position:relative;display:block;width:100%;height:auto}
.bgl-m2 figcaption{position:relative;margin-top:6px;font:700 8.5px/1.25 var(--sans);letter-spacing:.8px;text-transform:uppercase;color:var(--mu)}
@keyframes bglBob{50%{transform:translateY(-4px)}}
.bgl-band.play .bgl-m2{animation:bglEnter .7s cubic-bezier(.2,.8,.2,1.15) both;animation-delay:calc(.3s + var(--d) * .22s)}
@keyframes bglEnter{from{opacity:0;transform:translateY(70px) scale(.85)}}
.bgl-m2.jump{animation:bglJump .55s cubic-bezier(.3,.7,.3,1)}
@keyframes bglJump{40%{transform:translateY(-22px) rotate(-3deg) scale(1.06)}}
.bgl-chant{min-height:36px;margin:18px 0 0;font:800 clamp(18px,5vw,26px) var(--disp);letter-spacing:.12em;color:var(--pk2)}
.bgl-chant.all{font-size:clamp(23px,7vw,42px);letter-spacing:.05em;color:var(--gd2);text-shadow:0 0 22px rgba(255,79,160,.75);animation:bglFade .5s ease both}
.bgl-chant small{display:block;margin-bottom:4px;font:700 10px var(--sans);letter-spacing:4px;text-transform:uppercase;color:var(--mu);text-shadow:none}

/* 08 · письмо */
.bgl-lt{background:radial-gradient(55% 40% at 50% 48%,rgba(243,211,139,.11),transparent 70%),#040306;text-align:center}
.bgl-env{position:relative;display:block;width:min(300px,80vw);aspect-ratio:3/2;margin:18px auto 0;padding:0;border:0;border-radius:10px;cursor:pointer;
  background:linear-gradient(160deg,#f6ead5,#e6d3b1);box-shadow:0 40px 70px -30px rgba(0,0,0,.9),0 0 70px -20px rgba(243,211,139,.45);perspective:600px}
.bgl-env[hidden]{display:none}
.bgl-env::before{content:"";position:absolute;inset:0;border-radius:10px;
  background:linear-gradient(33deg,transparent 49.6%,rgba(0,0,0,.07) 50%,transparent 50.6%),linear-gradient(-33deg,transparent 49.6%,rgba(0,0,0,.07) 50%,transparent 50.6%)}
.bgl-env-flap{position:absolute;z-index:2;left:0;right:0;top:0;height:58%;transform-origin:50% 0;clip-path:polygon(0 0,100% 0,50% 100%);
  background:linear-gradient(180deg,#efdfc0,#dfc89f);transition:transform .6s cubic-bezier(.5,0,.3,1)}
.bgl-env.open .bgl-env-flap{transform:rotateX(180deg)}
.bgl-env-seal{position:absolute;z-index:3;left:50%;top:58%;width:52px;height:52px;margin:-26px 0 0 -26px;border-radius:50%;display:grid;place-items:center;
  font:400 25px var(--ser);color:#f8e3c4;background:radial-gradient(circle at 35% 30%,#d0485f,#8a1f35 70%);box-shadow:0 6px 12px -4px rgba(0,0,0,.6),inset 0 0 0 4px rgba(0,0,0,.12);transition:opacity .3s}
.bgl-env.open .bgl-env-seal{opacity:0}
.bgl-env-to{position:absolute;left:0;right:0;bottom:14px;font:italic 400 15px var(--ser);color:#6b5434}
.bgl-env:not(.open){animation:bglFloat 3s ease-in-out infinite}
@keyframes bglFloat{50%{transform:translateY(-6px)}}
.bgl-env.open{animation:bglEnvGo .6s .3s ease both} @keyframes bglEnvGo{to{transform:translateY(30px) scale(.96);opacity:0}}
.bgl-letter2{position:relative;max-width:560px;margin:6px auto 0;padding:34px 26px 28px;border-radius:6px;text-align:left;color:#2c2118;
  background:linear-gradient(180deg,#fbf5ea,#f3e8d6);box-shadow:0 50px 90px -40px rgba(0,0,0,.95),0 0 80px -30px rgba(243,211,139,.5)}
.bgl-letter2[hidden]{display:none}
.bgl-letter2.in{animation:bglLetter .9s cubic-bezier(.2,.7,.2,1) both} @keyframes bglLetter{from{opacity:0;transform:translateY(40px) scale(.97)}}
.bgl-letter2::before{content:"";position:absolute;inset:10px;border:1px solid rgba(160,120,60,.3);border-radius:3px;pointer-events:none}
.bgl-l-k{margin:0 0 14px;font:700 10px var(--sans);letter-spacing:3px;text-transform:uppercase;color:#a07a3a}
.bgl-letter2 h3{margin:0 0 14px;font:italic 400 31px var(--ser)}
.bgl-letter2 p{margin:0 0 14px;font:400 17px/1.7 var(--ser)}
.bgl-letter2 .bgl-l-sign{margin:22px 0 0;text-align:right;font:italic 400 22px var(--ser)}
.bgl-l-sign span{display:block;margin-top:4px;font:700 10px var(--sans);font-style:normal;letter-spacing:2.5px;text-transform:uppercase;color:#8a7458}

/* 09 · финал */
.bgl-enc{background:radial-gradient(70% 55% at 50% 40%,rgba(243,211,139,.3),transparent 70%),radial-gradient(90% 60% at 50% 110%,rgba(255,79,160,.26),transparent 70%),#0a0710;text-align:center}
.bgl-enc .bgl-in{max-width:980px}
.bgl-rays{position:absolute;z-index:0;left:50%;top:40%;width:180vmax;height:180vmax;margin:-90vmax 0 0 -90vmax;
  background:repeating-conic-gradient(from 0deg,rgba(243,211,139,.14) 0 6deg,transparent 6deg 18deg);
  -webkit-mask:radial-gradient(circle,#000 8%,transparent 55%);mask:radial-gradient(circle,#000 8%,transparent 55%);animation:bglRot 70s linear infinite}
.bgl-sparks{position:absolute;inset:0;z-index:1;pointer-events:none}
.bgl-sparks i{position:absolute;bottom:-10px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;background:var(--gd2);box-shadow:0 0 8px var(--gd);opacity:0;
  animation:bglSpark var(--t) var(--d) linear infinite}
@keyframes bglSpark{10%{opacity:.9}100%{transform:translateY(-105vh);opacity:0}}
.bgl-hbd{margin:0}
.bgl-hbd span{display:block;padding-left:.3em;font:700 clamp(15px,4.4vw,26px) var(--lat);letter-spacing:.3em;text-transform:uppercase;color:var(--gd2)}
.bgl-hbd b{display:block;margin-top:8px;font:800 clamp(46px,14.5vw,140px)/.92 var(--lat);letter-spacing:.01em;
  background:linear-gradient(180deg,#fff 20%,var(--gd2) 55%,var(--gd) 80%,#c99a45);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 28px rgba(243,211,139,.55))}
.bgl-stage2{margin:16px 0 0;padding-left:.42em;font:700 clamp(12px,3.5vw,18px) var(--lat);letter-spacing:.42em;text-transform:uppercase}
.bgl-enc-t{max-width:440px;margin:26px auto 0;font:italic 400 18px/1.55 var(--ser)}
.bgl-enc-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:28px}
.bgl-enc.on .bgl-hbd b{animation:bglRise 1s .2s cubic-bezier(.2,.8,.2,1) both}
.bgl-enc.on .bgl-stage2{animation:bglTrack 1.1s .7s cubic-bezier(.2,.7,.2,1) both}
.bgl-enc.on .bgl-enc-t{animation:bglFade .9s 1.2s ease both}

@media(max-width:600px){.bgl-band2{grid-template-columns:repeat(4,minmax(0,1fr));max-width:330px;gap:12px 10px}}
@media(max-width:380px){.bgl-sc{padding-left:16px;padding-right:16px}.bgl-ev-w p{margin-left:0}.bgl-pass-t span{font-size:34px}.bgl-trk-w p{margin-left:0}}
@media(min-width:900px){.bgl-sc{padding-left:40px;padding-right:40px}}
@media(max-height:820px){.bgl-sc{padding-top:calc(62px + env(safe-area-inset-top));padding-bottom:calc(96px + env(safe-area-inset-bottom))}
  .bgl-h{font-size:clamp(30px,9vw,52px);margin-bottom:8px}.bgl-kick{margin-bottom:6px}.bgl-hint{font-size:13.5px;margin-bottom:14px}
  .bgl-hall{height:clamp(180px,27vh,260px)}.bgl-ls-hud{margin-top:8px}.bgl-ls-pad{height:112px}.bgl-how{margin-bottom:12px}.bgl-how li{font-size:11px}
  .bgl-star,.bgl-ls-ring{width:80px;height:80px}.bgl-ls-ring{margin:-40px 0 0 -40px}
  .bgl-lanyard{height:34px;margin-top:0}.bgl-pass-main{padding:24px 18px 14px}.bgl-pass-t{margin-bottom:12px}.bgl-pass-t span{font-size:34px}
  .bgl-pass-f{gap:7px 12px}.bgl-pass-ser{margin-top:10px}.bgl-pass-stub{min-height:54px;padding:10px 18px 12px}.bgl-tk .bgl-hint{margin-top:14px}
  .bgl-orb{width:92px;height:92px;margin-bottom:20px}.bgl-call-btns{margin-top:40px}.bgl-led{width:min(260px,62vw);margin-bottom:20px}}

@media(prefers-reduced-motion:reduce){.bgl-room *,.bgl-room *::before,.bgl-room *::after{animation:none!important;transition:none!important}
  .bgl-pass.torn .bgl-pass-stub{visibility:hidden}}
`;

const scene=(id,name,next,cls,inner,extra="")=>`<section class="bgl-sc ${cls}" data-sc="${id}" data-name="${name}"${next?` data-next="${next}"`:""} tabindex="-1" aria-label="${name}" hidden>${extra}<div class="bgl-in">${inner}</div></section>`;

const HTML=`<style>${CSS}</style><span hidden data-bgl-name="${NAME}"></span>
${scene("call","The Call","","bgl-call",`
  <div class="bgl-ringui" id="bglRingUI">
    <div class="bgl-orb"><span></span><span></span><span></span>
      <svg viewBox="0 0 110 110" aria-hidden="true"><defs><radialGradient id="bglOrbG" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#ff9bcb"/><stop offset=".65" stop-color="#8b5cff"/><stop offset="1" stop-color="#2a1640"/></radialGradient></defs>
        <circle cx="55" cy="55" r="30" fill="url(#bglOrbG)"/><ellipse cx="55" cy="57" rx="48" ry="11" fill="none" stroke="#f3d38b" stroke-width="2.2" transform="rotate(-16 55 57)" opacity=".9"/></svg></div>
    <p class="bgl-call-k">входящий вызов</p>
    <h2 class="bgl-call-t">Universe Support Center</h2>
    <p class="bgl-call-s">по поводу очень важного события</p>
    <div class="bgl-call-btns">
      <div class="bgl-cb"><button type="button" class="bgl-dec" id="bglDecline" aria-label="Отклонить">${PHONE}</button><span>Отклонить</span></div>
      <div class="bgl-cb"><button type="button" class="bgl-acc" id="bglAccept" aria-label="Принять">${PHONE}</button><span>Принять</span></div>
    </div>
    <p class="bgl-call-note" id="bglCallNote" aria-live="polite"></p>
  </div>
  <div class="bgl-desk" id="bglDesk" hidden>
    <div class="bgl-desk-h"><span class="dot"></span><b>Universe Support Center</b><span>обращение № 2311</span></div>
    <dl class="bgl-desk-f">
      <div><dt>От кого</dt><dd>Вселенная</dd></div>
      <div><dt>Получатель</dt><dd>${NAME}</dd></div>
      <div><dt>Тема</dt><dd>День рождения</dd></div>
      <div><dt>Приоритет</dt><dd class="max">MAXIMUM</dd></div>
    </dl>
    <ol class="bgl-steps" aria-live="polite"><li>Request received</li><li>Processing happiness</li><li>Approved</li><li>Resolved</li></ol>
    <div class="bgl-desk-bar"><i id="bglDeskBar"></i></div>
    <div class="bgl-desk-ok" id="bglDeskOk" hidden>
      <p>«Ваш запрос на самый счастливый год в жизни одобрен»</p>
      <button type="button" class="bgl-cta" id="bglGift">Открыть мой подарок</button>
    </div>
  </div>
  <button type="button" class="bgl-skip" id="bglCallSkip">пропустить</button>`)}

${scene("reveal","The Grand Reveal","Её история","bgl-rv",`
  <figure class="bgl-led"><img src="${IMG}" alt="${NAME} в Стамбуле"><figcaption>${PHOTO_CAP}</figcaption></figure>
  <h1 class="bgl-big" aria-label="${LAT}">${[...LAT].map((c,i)=>`<span style="--i:${i}" aria-hidden="true">${c}</span>`).join("")}</h1>
  <p class="bgl-wt">World Tour ${YEAR}</p>
  <div class="bgl-rv-row"><span>${DAY_EN}</span><i></i><span>The Main Event</span></div>`,
  `<div class="bgl-rv-cam" aria-hidden="true"><div class="bgl-haze"></div><div class="bgl-beams">${BEAMS.map((b,k)=>`<i style="--x:${b[0]}%;--r:${b[1]}deg;--c:${b[2]};--t:${b[3]}s;--k:${k}"></i>`).join("")}</div><div class="bgl-floor"></div></div>`)}

${scene("story","Her Story","К золотому билету","bgl-story",`
  <p class="bgl-kick">Scene 03</p><h2 class="bgl-h">Her Story</h2>
  <p class="bgl-hint">Год, который уже звучит как хит. Нажимай на события — у каждого своё пожелание.</p>
  <ol class="bgl-tl" id="bglTl">
    ${STORY.map(s=>`<li class="bgl-ev${s.last?" last":""}" style="--c:${s.col}"><button type="button" aria-expanded="false"><span class="bgl-ev-ic"><svg viewBox="0 0 48 48" aria-hidden="true">${ICON[s.ic]}</svg></span><span class="bgl-ev-t"><b>${s.t}</b><i>${s.c}</i></span><span class="bgl-ev-plus" aria-hidden="true"></span></button><div class="bgl-ev-w"><div><p>${s.w}</p></div></div></li>`).join("\n    ")}
  </ol>
  <p class="bgl-count" id="bglTlN">открыто 0 из ${STORY.length}</p>`)}

${scene("ticket","The Golden Ticket","К сет-листу","bgl-tk",`
  <p class="bgl-kick">Scene 04</p><h2 class="bgl-h">The Golden Ticket</h2>
  <div class="bgl-pass-wrap" id="bglPassWrap">
    <div class="bgl-lanyard" aria-hidden="true"></div>
    <div class="bgl-pass" id="bglPass">
      <div class="bgl-pass-main">
        <div class="bgl-holo" aria-hidden="true"></div>
        <p class="bgl-pass-k">World Tour ${YEAR} · Backstage</p>
        <h3 class="bgl-pass-t"><span>${LAT}</span><b>All Access Pass</b></h3>
        <dl class="bgl-pass-f">
          <div><dt>Sector</dt><dd>VIP</dd></div>
          <div><dt>Valid</dt><dd>All year</dd></div>
          <div class="w"><dt>Seat</dt><dd>в сердце команды</dd></div>
          <div><dt>Parking</dt><dd>Reserved</dd></div>
          <div><dt>Entry</dt><dd>Unlimited happiness</dd></div>
        </dl>
        <p class="bgl-pass-ser">SERIAL Nº ${SERIAL}</p>
        <span class="bgl-granted">Access granted</span>
      </div>
      <button type="button" class="bgl-pass-stub" id="bglStub" aria-label="Оторвать корешок"><span>Admit one</span><b>23 · 11</b><span>оторви ✂</span></button>
    </div>
  </div>
  <p class="bgl-hint" id="bglTkHint" aria-live="polite">Нажми на корешок внизу билета, чтобы оторвать его</p>`)}

${scene("setlist","The Setlist","К лайтстикам","bgl-set",`
  <p class="bgl-kick">Scene 05</p><h2 class="bgl-h">The Setlist</h2>
  <p class="bgl-hint">8 треков — 8 пожеланий от команды. Нажми на трек, чтобы его сыграть.</p>
  <div class="bgl-np" id="bglNp">
    <div class="bgl-np-art" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <div class="bgl-np-body"><p class="bgl-np-k" id="bglNpK">Выбери трек</p><h3 id="bglNpT">World Tour ${YEAR}</h3><p class="bgl-np-by" id="bglNpBy">концертная программа</p>
      <div class="bgl-np-bar"><i id="bglNpBar"></i></div><div class="bgl-np-time"><span id="bglNpCur">0:00</span><span id="bglNpDur">—</span></div></div>
  </div>
  <ol class="bgl-trk" id="bglTrk">
    ${TRACKS.map((t,i)=>`<li><button type="button" aria-expanded="false" data-n="${String(i+1).padStart(2,"0")}" data-t="${q(t.t)}" data-by="${q(t.by)}" data-d="${t.d}"><span class="n">${String(i+1).padStart(2,"0")}</span><span class="t"><b>${t.t}</b><i>${t.by}</i></span><span class="d">${t.d}</span></button><div class="bgl-trk-w"><div><p>${t.w}</p></div></div></li>`).join("\n    ")}
  </ol>
  <p class="bgl-count" id="bglTrkN">сыграно 0 из ${TRACKS.length}</p>
  <p class="bgl-fine">Треки вымышленные: названия придуманы для этого концерта.</p>`)}

${scene("light","Light up the hall","К бойз-бэнду","bgl-ls",`
  <p class="bgl-kick">Scene 06 · Lightstick</p><h2 class="bgl-h">Light up the hall</h2>
  <p class="bgl-hint">Это твой концерт, и зал хочет светиться для тебя. Помоги зрителям: жми на звезду в такт — с каждым попаданием загораются лайтстики, а на экране сцены разгорается твоё имя.</p>
  <ol class="bgl-how" aria-label="Как играть"><li><i>1</i>кольцо сжимается к звезде</li><li><i>2</i>жми, когда совпадёт</li><li><i>3</i>зал загорается</li></ol>
  <div class="bgl-hall" id="bglHall">
    <div class="bgl-hall-scr" aria-hidden="true"><span>${LAT}</span></div>
    <div class="bgl-crowd" id="bglCrowd" aria-hidden="true"></div>
    ${HEADS}
    <div class="bgl-lvl" id="bglLvl" aria-live="polite"></div>
    <div class="bgl-ov" id="bglOv">
      <p class="bgl-ov-k" id="bglOvK">Зал ждёт сигнала</p>
      <p class="bgl-ov-t" id="bglOvT">3 песни · проиграть нельзя</p>
      <button type="button" class="bgl-cta" id="bglGo">▶ Зажечь зал</button>
      <p class="bgl-ov-res" id="bglLsRes" aria-live="polite"></p>
    </div>
  </div>
  <div class="bgl-ls-hud"><span id="bglLvlName">3 песни · 30 тактов</span><span id="bglLit">огни 0%</span></div>
  <div class="bgl-ls-pad demo" id="bglPad"><span class="bgl-ls-ring" id="bglRing"></span><button type="button" class="bgl-star" id="bglStar" aria-label="Звезда: нажимать в такт">${STAR}</button><span class="bgl-ls-hit" id="bglHit"></span></div>`)}

${scene("band","The Boy Band","К письму","bgl-band",`
  <p class="bgl-kick">Scene 07 · Surprise guests</p><h2 class="bgl-h">The Boy Band</h2>
  <p class="bgl-hint">На сцену выходит бойз-бэнд из ${LETTERS.length} красавчиков. Дебют специально к 23.11 — у каждого своя буква.</p>
  <div class="bgl-band2" id="bglBand">${LETTERS.map(member).join("")}</div>
  <p class="bgl-chant" id="bglChantT" aria-live="polite"></p>
  <div class="bgl-center"><button type="button" class="bgl-cta" id="bglChant">♥ Фан-чант</button></div>`,
  `<div class="bgl-spots" aria-hidden="true"><i style="--x:18%;--r:-16deg;--t:6s"></i><i style="--x:50%;--r:6deg;--t:7.5s"></i><i style="--x:82%;--r:16deg;--t:6.8s"></i></div>`)}

${scene("letter","The Letter","На финальный бис","bgl-lt",`
  <p class="bgl-kick">Scene 08</p><h2 class="bgl-h">A letter for you</h2>
  <button type="button" class="bgl-env" id="bglEnv" aria-label="Открыть письмо"><span class="bgl-env-flap"></span><span class="bgl-env-seal">B</span><span class="bgl-env-to">Для ${NAME}</span></button>
  <p class="bgl-hint" id="bglEnvHint" style="margin-top:22px">Нажми на конверт</p>
  <article class="bgl-letter2" id="bglLetter" hidden>
    <p class="bgl-l-k">${DATE_RU}</p>
    <h3>${NAME},</h3>
    ${LETTER.map(p=>`<p>${p}</p>`).join("\n    ")}
    <p class="bgl-l-sign">С днём рождения!<span>Твоя команда</span></p>
  </article>`)}

${scene("encore","Final Encore","","bgl-enc",`
  <p class="bgl-kick">Final Encore</p>
  <h2 class="bgl-hbd"><span>Happy Birthday,</span><b>${LAT}!</b></h2>
  <p class="bgl-stage2">The world is your stage.</p>
  <p class="bgl-enc-t">До встречи на следующем концерте. Но пусть следующий год будет ещё громче, ярче и счастливее.</p>
  <div class="bgl-enc-btns"><button type="button" class="bgl-cta" id="bglSong" data-song="${att(SONG)}">▶ Happy Birthday</button><button type="button" class="bgl-ghost" id="bglReplay">↻ Повторить концерт</button></div>
  <p class="bgl-fine">с любовью — твоя команда</p>`,
  `<div class="bgl-rays" aria-hidden="true"></div><div class="bgl-sparks" aria-hidden="true">${SPARKS}</div>`)}
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);
const out="window.BGLDATA={v:2,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")+"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"bgl-data.js"),out);
console.log("✓ bgl-data.js: "+Math.round(out.length/1024)+" КБ, имя «"+NAME+"», сцен 9, пароль «"+PASS+"»");

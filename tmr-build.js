#!/usr/bin/env node
/* Комната для Тамира — «Биржа Тамира»: тикер TMR, который растёт всегда.
   node tmr-build.js "пароль"
   Фото по желанию: tmr-photo.jpg (png/webp/heic тоже подойдут).
   Видео от коллег по желанию: tmr-video-Имя.mp4 (mov/m4v тоже), каждое станет
   выступлением на «собрании акционеров». Пережимаются ffmpeg в 720p H.264, чтобы
   играли на айфоне и не раздували комнату. Исходники в git не попадают.
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь ---- */
const NAME="Тамир";
const BIRTH="";                              /* дд.мм — из цифр строится мелодия «Твоя дата»; пусто = только Happy Birthday */
const TICKER="TMR";
const ROLE="бизнес-аналитик";
/* стакан заявок: пожелания коллег. Заменить на настоящие, когда пришлют. */
const BIDS=[
  {n:"Команда",  w:"здоровья: ноги целые, спина прямая, рынок зелёный"},
  {n:"Разработка", w:"требований, которые понятны с первого чтения — как у тебя"},
  {n:"QA",       w:"чтобы баги находились в коде, а не в баскетболе"},
  {n:"Коллеги",  w:"шуток, за которые не стыдно, и мемов, за которые гордо"},
  {n:"Рынок",    w:"чтобы твои сделки закрывались так же, как раунды в CS — победой"}
];
/* --------------------------- */

const PASS=process.argv[2];
const BANNED=["tmr","tamir","тамир","birthday","hb","password","123456"];
if(!PASS||PASS.length<4||BANNED.includes(PASS.toLowerCase())){
  console.error("Нужен пароль: node "+path.basename(__filename)+' "пароль"\n(не короче 4 символов и не имя именинника)');
  process.exit(1);
}
const DIR=__dirname, ITER=200000, KEYLEN=32;

function findFile(base,exts){ for(const ext of exts){ const p=path.join(DIR,base+ext); if(fs.existsSync(p))return p; } return null; }
function initials(name,c1,c2){
  const ch=(name.trim()[0]||"T").toUpperCase();
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="560" viewBox="0 0 560 560">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="560" height="560" fill="url(#g)"/>
    <text x="280" y="335" font-family="Inter,sans-serif" font-size="230" font-weight="800" fill="rgba(255,255,255,.92)" text-anchor="middle">${ch}</text></svg>`;
  return "data:image/svg+xml;base64,"+Buffer.from(svg).toString("base64");
}
function photo(base,name,c1,c2){
  const src=findFile(base,[".jpg",".jpeg",".png",".webp",".heic"]);
  if(!src){ console.log("  · "+base+": фото нет, ставлю заглушку"); return initials(name,c1,c2); }
  const tmp=path.join(require("os").tmpdir(),base+".jpg");
  try{
    execFileSync("sips",["-s","format","jpeg","-s","formatOptions","62","-Z","720",src,"--out",tmp],{stdio:"ignore"});
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
    const m=/^tmr-video-(.+)\.(mp4|mov|m4v|webm)$/i.exec(f); if(!m)continue;
    const src=path.join(DIR,f), tmp=path.join(require("os").tmpdir(),"tmr-"+m[1]+".mp4");
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
const IMG=photo("tmr-photo",NAME,"#46d6a0","#6ea8fe");
const VIDEOS=videos();

/* Мелодии — как в комнате Лауры: Happy Birthday в полутонах от первой спетой ноты и,
   если дата известна, «Твоя дата» на мажорной пентатонике. */
function splitName(n){
  const v="аеёиоуыэюяaeiouy", s=String(n).trim();
  if(s.length<4)return [s,"…"];
  for(let i=Math.ceil(s.length/2);i<s.length-1;i++) if(v.includes(s[i].toLowerCase()))return [s.slice(0,i+1),s.slice(i+1)];
  for(let i=Math.ceil(s.length/2);i>0;i--) if(v.includes(s[i].toLowerCase()))return [s.slice(0,i+1),s.slice(i+1)];
  const m=Math.ceil(s.length/2); return [s.slice(0,m),s.slice(m)];
}
const [N1,N2]=NAME==="Тамир"?["Та","мир"]:splitName(NAME);   /* автоделение даёт «Тами-р», а поётся «Та-мир» */
const MEL=[
  [0,"Hap-py",0,[.5,.5],"I"],[2,"birth",0,[1],"I"],[0,"day",0,[1],"I"],[5,"to",0,[1],"I"],[4,"you",1,[2],"V"],
  [0,"Hap-py",0,[.5,.5],"V"],[2,"birth",0,[1],"V"],[0,"day",0,[1],"V"],[7,"to",0,[1],"V"],[5,"you",1,[2],"I"],
  [0,"Hap-py",0,[.5,.5],"I"],[12,"birth",0,[1],"I"],[9,"day",0,[1],"I"],[5,"dear",0,[1],"IV"],[4,N1,0,[.5],"I"],[2,N2,1,[1.5],"I"],
  [10,"Hap-py",0,[.5,.5],"IV"],[9,"birth",0,[1],"IV"],[5,"day",0,[1],"I"],[7,"to",0,[1],"V"],[5,"you",1,[2],"I"]
];
function dateMel(src){
  const d=String(src).replace(/\D/g,"").split("").map(Number); if(!d.length)return null;
  const LAD=[0,2,4,7,9,12,14,16,19,21], CH=["I","I","IV","IV","V","V","I","I"], out=[];
  d.forEach(x=>{ const iv=LAD[x], dur=x%2?.5:1, prev=out[out.length-1];
    if(prev&&prev[0]===iv){ prev[3].push(dur); prev[1]+="-"+x; return; }
    out.push([iv,String(x),0,[dur],CH[out.length%CH.length]]); });
  const base=out[0][0]; out.forEach((c,i)=>{ c[0]-=base; if((i+1)%4===0||i===out.length-1)c[2]=1; });
  return {id:"date",name:"Твоя дата",tonic:-(LAD[d[0]]),mel:out};
}
const SONGS=[{id:"hb",name:"Happy Birthday",tonic:-7,mel:MEL}];
const DM=BIRTH?dateMel(BIRTH):null; if(DM)SONGS.push(DM);

/* События на графике: позиция 0..1, значок, заголовок, что случилось с котировкой */
const EVENTS=[
  {at:.14,ico:"🎮",t:"Вечер в Counter-Strike",d:"Объём торгов ×3: команда играет вместе, раунд за раундом."},
  {at:.36,ico:"🏀",t:"Баскетбол: перелом ноги",d:"Приостановка торгов на шесть недель. Гэп вниз на один день — и рост круче прежнего: оптимизм не ломается.",dip:1},
  {at:.58,ico:"🎤",t:"Спел на корпоративе",d:"Котировка +15% за вечер. Karaoke Capital повышает рейтинг вокала до AAA."},
  {at:.76,ico:"🍺",t:"Дивиденды",d:"Выплата в пиве. Экс-дивидендная дата — четверг, чтобы в пятницу были все."},
  {at:.96,ico:"🎂",t:"IPO: день рождения",d:"Торги открыты. Заявки в стакане ниже — исполняются по одной."}
];
const NEWS=[
  "Аналитики: TMR не может упасть. Уточнение редакции: аналитик — сам Тамир.",
  "Рынок красный, Тамир зелёный. Регулятор запросил объяснения, получил мем.",
  "Инсайд: Тамир знает, куда пойдёт бумага. На вопрос «куда» ответил шуткой — и оказался прав.",
  "Баскетбольная федерация: нога сломана, дух — нет. Котировки отскочили в тот же день.",
  "Counter-Strike: раунд выигран одним смехом. Соперники подали жалобу на читы, читы — харизма.",
  "Требования от Тамира прочитаны с первого раза. Разработка в шоке, в хорошем смысле."
];
const STORIES=[
  ["Как команда",  "хочу, чтобы требования объяснял Тамир",         "чтобы разработка поняла с первого чтения",   "Done"],
  ["Как коллега",  "хочу услышать шутку до стендапа",               "чтобы день начался правильно",               "Done · ежедневно"],
  ["Как рынок",    "хочу упасть и расстроить Тамира",               "чтобы хоть раз",                              "Won't do · оптимист"],
  ["Как пятница",  "хочу пиво после закрытия торгов",               "чтобы неделя закрылась в плюс",               "In progress · каждую неделю"]
];
const RISKS=[
  ["Споёт",                    "высокая",  "положительное",  "не мешать"],
  ["Предложит пиво в пятницу", "100%",     "объединяющее",   "согласиться"],
  ["Уйдёт в CS до утра",       "средняя",  "на сон",          "рейд всей командой"],
  ["Снова баскетбол",          "низкая",   "на ногу",         "щитки, разминка, здравый смысл"]
];
/* Раунд: обезвредить подарок — пять проводов, каждый — вопрос про именинника. */
const WIRES=[
  {q:"Что Тамир сломал, играя в баскетбол?",  a:["ногу","руку","кольцо","режим сна"],           ok:0},
  {q:"Любимая игра Тамира",                   a:["шахматы","Counter-Strike","Dota","Excel"],      ok:1},
  {q:"Кем работает Тамир?",                   a:["трейдер","тренер по баскетболу","бизнес-аналитик","стендапер"], ok:2},
  {q:"Что делает Тамир, когда рынок падает?", a:["продаёт всё","плачет","звонит брокеру","шутит и докупает"], ok:3},
  {q:"Напиток закрытия недели",               a:["пиво","чай","смузи","эспрессо"],                ok:0}
];
const PRICES=BIDS.map((b,i)=>1000000+i*111111);

const HTML=`
<div class="tmr-hero">
  <div class="tmr-tk"><span class="tmr-sym">${TICKER}</span><span class="tmr-px" id="tmrPx">1 000 000 ₸</span><span class="tmr-chg">▲ +∞% · оптимизм</span></div>
  <h1>С днём рождения, ${NAME}!</h1>
  <p class="tmr-sub">Биржа Тамира · единственная бумага на рынке, которая растёт всегда</p>
</div>
<div class="tmr-ticker"><div class="tmr-ticker-in">${NEWS.concat(NEWS).map(n=>'<span>📰 '+n+'</span>').join("")}</div></div>

<div class="tmr-card">
  <div class="tmr-h"><b>Котировки ${TICKER}</b><span>год к году · тапни по значку события</span></div>
  <canvas class="tmr-chart" id="tmrChart" width="900" height="300" data-ev='${JSON.stringify(EVENTS).replace(/'/g,"&#39;")}'></canvas>
  <div class="tmr-ev" id="tmrEv">${EVENTS[EVENTS.length-1].ico} <b>${EVENTS[EVENTS.length-1].t}.</b> ${EVENTS[EVENTS.length-1].d}</div>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Стакан заявок</b><span>пожелания стоят бидами · исполни каждую</span></div>
  <div class="tmr-book" id="tmrBook">${BIDS.map((b,i)=>'<button type="button" class="tmr-bid" data-i="'+i+'"><span class="tmr-p">'+PRICES[i].toLocaleString("ru-RU")+' ₸</span><span class="tmr-w"><b>'+b.n+'</b>'+b.w+'</span><i>исполнить</i></button>').join("")}</div>
  <p class="tmr-note" id="tmrBookNote">исполнено 0 из ${BIDS.length}</p>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Купи на дне, продай на хае</b><span>30 секунд · TMR в реальном времени</span></div>
  <div id="tmrTrade"></div>
</div>

<div class="tmr-card tmr-round">
  <div class="tmr-h"><b>Раунд: обезвредь подарок</b><span>Counter-Strike · 40 секунд</span></div>
  <div id="tmrGame" data-w='${JSON.stringify(WIRES).replace(/'/g,"&#39;")}'></div>
</div>

<div class="sg-stage">
  <div class="tmr-h"><b>Спой ${TICKER}</b><span>микрофон меряет попадание в ноты</span></div>
  <canvas class="sg-eq" id="sgEq" width="640" height="112"></canvas>
  <div class="sg-tuner">
    <div class="sg-tgt" id="sgTgt">начни с любой удобной ноты</div>
    <div class="sg-scale"><span class="sg-zone"></span><i class="sg-needle" id="sgNeedle"></i></div>
    <div class="sg-dev" id="sgDev">микрофон выключен</div>
    <div class="sg-now" id="sgNote"></div>
  </div>
  <div class="sg-pick" id="sgPick"></div>
  <div class="sg-song" id="sgSong" data-songs='${JSON.stringify(SONGS).replace(/'/g,"&#39;")}'></div>
  <div class="sg-hold"><i id="sgHoldBar"></i></div>
  <div class="sg-res" id="sgRes" hidden></div>
  <div class="sg-acts">
    <button class="sg-btn" id="sgMic" type="button">🎤 включить микрофон</button>
    <button class="sg-btn ghost" id="sgPlay" type="button">🔊 послушать мелодию</button>
  </div>
  <div class="sg-styles" id="sgStyles"></div>
  <label class="sg-hp"><input type="checkbox" id="sgHp"> я в наушниках — подпевать под музыку</label>
  <div class="sg-hint" id="sgHint"></div>
</div>

${VIDEOS.length?`<div class="tmr-card">
  <div class="tmr-h"><b>Собрание акционеров</b><span>выступления</span></div>
  <div class="tmr-videos" id="tmrVideos"></div>
  <script type="application/json" id="tmrVideoData">${JSON.stringify(VIDEOS).replace(/<\//g,"<\\/")}</script>
</div>`:""}

<div class="sg-card">
  <div class="sg-ph"><img src="${IMG}" alt="${NAME}"></div>
  <p>Ты тот, у кого требования понятны, шутки вовремя, а котировка настроения не падает даже с гипсом на ноге. Пусть год торгуется в плюс по всем инструментам: здоровью, деньгам, песням и раундам. С днём рождения!</p>
</div>

<div class="sg-toast">
  <p class="sg-cheers">Статус: Listed · Котировки только вверх 📈</p>
  <p>Ожидаемый результат — счастливый год. Фактический совпал.</p>
</div>
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);
const out="window.TMRDATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")+"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"tmr-data.js"),out);
console.log("✓ tmr-data.js: "+Math.round(out.length/1024)+" КБ, имя «"+NAME+"», видео "+VIDEOS.length+", пароль «"+PASS+"»");

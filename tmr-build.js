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
/* Скины именинника — свои силуэты, не картинки Valve: репозиторий публичный.
   Редкость и износ — как в игре: r = mil / restricted / classified / covert / knife. */
const ICO={
  rifle:'<svg viewBox="0 0 120 48"><path d="M4 22h18l3-8h10l2 8h44l2-4h14l4 4h16v8H97l-3 6H62l-4 12h-9l2-12H36l-4 10h-9l1-10H4z"/></svg>',
  awp:'<svg viewBox="0 0 120 48"><path d="M2 27h30l4-9h8l1 9h36l6-3h18l4 3h9v6h-9l-4 3H87l-6-3H72l-6 12h-8l2-12H41l-3 10h-9l1-10H2z"/><circle cx="52" cy="12" r="5"/><path d="M47 12h-8v3h8zM57 12h8v3h-8z"/></svg>',
  knife:'<svg viewBox="0 0 120 48"><path d="M6 30c26-24 52-24 70-20l36 10-8 6c-14-2-28 2-40 4H40l-6 8H16z"/></svg>',
  gloves:'<svg viewBox="0 0 120 48"><path d="M30 44c-10-6-14-16-10-28l8-2 2 10 4-14 8-2 1 14 6-16 8 0-1 18 8-10 7 4-8 18c-6 8-22 12-33 8z"/><path d="M78 40l8-16 6 4-6 18c-8 4-14 2-8-6z"/></svg>',
  pistol:'<svg viewBox="0 0 120 48"><path d="M10 14h72l6 4h20v10h-20l-6 4H50l-4 14H30l2-14H10z"/></svg>'
};
const SKINS=[
  {r:"knife",     ico:"knife",  n:"★ Нож | Бизнес-требования", w:"Прямо с завода",          f:"0.003", s:"читается с первого раза"},
  {r:"knife",     ico:"gloves", n:"★ Перчатки | Пятничные",     w:"После полевых испытаний", f:"0.21",  s:"пиво держат крепко"},
  {r:"covert",    ico:"rifle",  n:"AK-47 | Оптимист",           w:"Прямо с завода",          f:"0.01",  s:"счётчик побед: 1 337"},
  {r:"classified",ico:"awp",    n:"AWP | Стакан заявок",         w:"Немного поношенное",      f:"0.09",  s:"один выстрел — одна сделка"},
  {r:"restricted",ico:"pistol", n:"P250 | Мем дня",              w:"Закалённое в чате",       f:"0.44",  s:"урон по серьёзности: критический"},
  {r:"mil",       em:"🎤",       n:"Микрофон | Корпоратив",       w:"Немного поношенное",      f:"0.12",  s:"рейтинг вокала AAA"},
  {r:"mil",       em:"🍺",       n:"Кружка | Пятница",            w:"Прямо с завода",          f:"0.02",  s:"дивиденды в натуре"},
  {r:"mil",       em:"🏀",       n:"Нога | Баскетбол",            w:"Закалённое в боях",       f:"0.87",  s:"восстановлена, работает штатно"}
];
const RAR={mil:"Армейское качество",restricted:"Запрещённое",classified:"Засекреченное",covert:"Тайное",knife:"★ Исключительное"};
const skinIco=x=>x.em?'<span class="tmr-em">'+x.em+'</span>':ICO[x.ico];
const skinCard=(x,i)=>'<div class="tmr-skin '+x.r+'" data-i="'+i+'"><div class="tmr-skin-i">'+skinIco(x)+'</div><b>'+x.n+'</b><span>'+RAR[x.r]+' · '+x.w+'</span><small>float '+x.f+' · '+x.s+'</small></div>';
const STEP=11111, LAST=1000000;
const BIDROWS=BIDS.map((b,i)=>({p:LAST-STEP*(i+1), v:[42,37,25,18,12][i]||10, n:b.n, w:b.w}));
const ASKS=[
  {p:LAST+STEP*1, v:3,  w:"Рынок продаёт: понедельники"},
  {p:LAST+STEP*2, v:8,  w:"Рынок продаёт: красные дни"},
  {p:LAST+STEP*3, v:0,  w:"Рынок продаёт: баги в требованиях — объём ноль, Тамир не покупает"},
  {p:LAST+STEP*4, v:15, w:"Рынок продаёт: ещё один баскетбол"}
];
const fmtP=v=>v.toLocaleString("ru-RU");
let acc=0; const bidDepth=BIDROWS.map(r=>acc+=r.v); const bidMax=acc;
acc=0; const askDepth=ASKS.map(r=>acc+=r.v); const askMax=Math.max(acc,1);

const HTML=`
<div class="tmr-hero">
  <div class="tmr-ph"><img src="${IMG}" alt="${NAME}"><span class="tmr-ph-tag">${TICKER}</span></div>
  <div class="tmr-tk"><span class="tmr-sym">${TICKER}</span><span class="tmr-px" id="tmrPx">1 000 000 ₸</span><span class="tmr-chg">▲ +∞% · оптимизм</span></div>
  <h1>С днём рождения, ${NAME}!</h1>
  <p class="tmr-sub">Биржа Тамира · единственная бумага на рынке, которая растёт всегда</p>
  <div class="tmr-tags"><span>📊 ${ROLE}</span><span>🎮 Counter-Strike</span><span>🎤 вокал</span><span>🍺 пятница</span><span>📈 торги</span><span>😂 мемы</span></div>
</div>
<div class="tmr-ticker"><div class="tmr-ticker-in">${NEWS.concat(NEWS).map(n=>'<span>📰 '+n+'</span>').join("")}</div></div>

<div class="tmr-card">
  <div class="tmr-h"><b>Котировки ${TICKER}</b><span>год к году · тапни по значку события</span></div>
  <canvas class="tmr-chart" id="tmrChart" width="900" height="300" data-ev='${JSON.stringify(EVENTS).replace(/'/g,"&#39;")}'></canvas>
  <div class="tmr-ev" id="tmrEv">${EVENTS[EVENTS.length-1].ico} <b>${EVENTS[EVENTS.length-1].t}.</b> ${EVENTS[EVENTS.length-1].d}</div>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Стакан ${TICKER}</b><span>биды — пожелания коллег · тапни по биду, чтобы исполнить</span></div>
  <div class="tmr-dom" id="tmrBook">
    <div class="tmr-dom-h"><span>объём</span><span>цена, ₸</span><span>заявка</span></div>
    ${ASKS.slice().reverse().map((r,k)=>{ const d=askDepth[ASKS.length-1-k]; return '<div class="tmr-row ask"><i style="width:'+Math.round(d/askMax*100)+'%"></i><span class="v">'+r.v+'</span><span class="p">'+fmtP(r.p)+'</span><span class="w">'+r.w+'</span></div>'; }).join("")}
    <div class="tmr-spread"><span>спред ${fmtP(STEP*2)} ₸</span><b>последняя ${fmtP(LAST)} ₸ ▲</b><span>${BIDROWS.length} бидов · ${ASKS.length} аска</span></div>
    ${BIDROWS.map((r,i)=>'<button type="button" class="tmr-row bid" data-i="'+i+'" data-p="'+r.p+'"><i style="width:'+Math.round(bidDepth[i]/bidMax*100)+'%"></i><span class="v">'+r.v+'</span><span class="p">'+fmtP(r.p)+'</span><span class="w"><b>'+r.n+'</b>'+r.w+'</span></button>').join("")}
  </div>
  <div class="tmr-tape"><div class="tmr-tape-h"><b>Лента сделок</b><span id="tmrBookNote">исполнено 0 из ${BIDROWS.length}</span></div><div id="tmrTape"><p class="tmr-note">пока пусто — исполни первый бид</p></div></div>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Купи на дне, продай на хае</b><span>30 секунд · TMR в реальном времени</span></div>
  <div id="tmrTrade"></div>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Инвентарь</b><span>скины именинника · редкость как в CS</span></div>
  <div class="tmr-inv">${SKINS.map(skinCard).join("")}</div>
</div>

<div class="tmr-card">
  <div class="tmr-h"><b>Кейс именинника</b><span>открой · на бирже Тамира выпадает только лучшее</span></div>
  <div class="tmr-case" id="tmrCase" data-skins='${JSON.stringify(SKINS.map(x=>({r:x.r,n:x.n,w:x.w,f:x.f,s:x.s,h:skinIco(x)}))).replace(/'/g,"&#39;")}'></div>
</div>

${VIDEOS.length?`<div class="tmr-card">
  <div class="tmr-h"><b>Собрание акционеров</b><span>выступления</span></div>
  <div class="tmr-videos" id="tmrVideos"></div>
  <script type="application/json" id="tmrVideoData">${JSON.stringify(VIDEOS).replace(/<\//g,"<\\/")}</script>
</div>`:""}

<div class="tmr-close">
  <p class="tmr-close-t">Статус: Listed · котировки только вверх 📈</p>
  <p>Ты весь год переводишь с человеческого на техническое и обратно, и с тобой требования читаются с первого раза, а рынок хоть раз в день, но улыбается. Котировка твоего настроения не падала даже с гипсом: баскетбол сломал ногу, оптимизм остался целым. Пусть год торгуется в плюс по всем инструментам: здоровью, деньгам и раундам. Пусть песни находят сцену, шутки — своих людей, а пятница наступает вовремя. Держи позицию: на этой бумаге просадок не бывает.</p>
  <p class="tmr-close-s">Ожидаемый результат — счастливый год. Фактический совпал.</p>
</div>
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);
const out="window.TMRDATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")+"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"tmr-data.js"),out);
console.log("✓ tmr-data.js: "+Math.round(out.length/1024)+" КБ, имя «"+NAME+"», видео "+VIDEOS.length+", пароль «"+PASS+"»");

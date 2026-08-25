#!/usr/bin/env node
/* Вторая секретная комната — для той, кто поёт.
   Содержимое шифруется своим паролем, отдельно от первой комнаты.

   node sing-build.js "пароль"
   Фото кладём рядом: sing-photo.jpg (или png/heic/webp).
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь, когда будут известны ---- */
const NAME="ИМЯ";
const BIRTH="27.08.1998";                    /* дата рождения: из неё делается личная мелодия */
const TITLE="С днём рождения!";
const TEXT="Голос — единственный инструмент, который всегда с собой: его не забудешь дома и не порвёшь струну. "
          +"Пусть он звучит, когда хочется, и пусть рядом всегда будут те, кто просит спеть ещё раз.";
/* --------------------------------------------- */

const PASS=process.argv[2];
/* Пароля по умолчанию больше нет. Раньше здесь стоял запасной вариант, и комнату
   один раз собрали без аргумента — на публичном сайте она открывалась словом,
   совпадающим с её же адресом. Лучше упасть, чем тихо выпустить незапертую дверь. */
if(!PASS||PASS.length<6){
  console.error("Нужен пароль от 6 символов:  node "+require("path").basename(__filename)+' "пароль"');
  process.exit(1);
}
const DIR=__dirname, ITER=200000, KEYLEN=32;

function findPhoto(base){
  for(const ext of [".jpg",".jpeg",".png",".webp",".heic"]){
    const p=path.join(DIR,base+ext); if(fs.existsSync(p))return p;
  }
  return null;
}
function initials(name,c1,c2){
  const ch=(name.trim()[0]||"♪").toUpperCase();
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="560" viewBox="0 0 560 560">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="560" height="560" fill="url(#g)"/>
    <text x="280" y="335" font-family="Inter,sans-serif" font-size="230" font-weight="800"
      fill="rgba(255,255,255,.92)" text-anchor="middle">${ch}</text></svg>`;
  return "data:image/svg+xml;base64,"+Buffer.from(svg).toString("base64");
}
function photo(base,name,c1,c2){
  const src=findPhoto(base);
  if(!src){ console.log("  · "+base+": фото нет, ставлю заглушку"); return initials(name,c1,c2); }
  const tmp=path.join(require("os").tmpdir(),base+".jpg");
  try{
    execFileSync("sips",["-s","format","jpeg","-s","formatOptions","62","-Z","720",src,"--out",tmp],{stdio:"ignore"});
    const b=fs.readFileSync(tmp); fs.unlinkSync(tmp);
    console.log("  · "+base+": "+path.basename(src)+" → "+Math.round(b.length/1024)+" КБ");
    return "data:image/jpeg;base64,"+b.toString("base64");
  }catch(e){
    const b=fs.readFileSync(src);
    console.log("  · "+base+": "+path.basename(src)+" без сжатия, "+Math.round(b.length/1024)+" КБ");
    const mime=src.endsWith(".png")?"image/png":src.endsWith(".webp")?"image/webp":"image/jpeg";
    return "data:"+mime+";base64,"+b.toString("base64");
  }
}

console.log("Фото:");
const IMG=photo("sing-photo",NAME,"#ff8fb1","#a98bff");

/* Мелодия Happy Birthday в полутонах от ПЕРВОЙ спетой ноты — значит петь можно
   в любой тональности. Повторы подряд склеены: две одинаковые ноты по высоте не
   отличить без разбора ритма, поэтому «Hap-py» — один шаг.
   [интервал, слог, конец строки?] */
function splitName(n){
  const v="аеёиоуыэюяaeiouy", s=String(n).trim();
  if(s.length<4)return [s,"…"];
  for(let i=Math.ceil(s.length/2);i<s.length-1;i++)
    if(v.includes(s[i].toLowerCase()))return [s.slice(0,i+1),s.slice(i+1)];
  for(let i=Math.ceil(s.length/2);i>0;i--)
    if(v.includes(s[i].toLowerCase()))return [s.slice(0,i+1),s.slice(i+1)];
  const m=Math.ceil(s.length/2); return [s.slice(0,m),s.slice(m)];
}
const [N1,N2]=splitName(NAME);
/* [интервал, слог, конец строки, длительности нот в долях, аккорд]
   Длительностей может быть несколько: «Hap-py» — это две ноты одной высоты.
   Засчитывается такой слог как один шаг (две одинаковые по высоте ноты
   не различить без разбора ритма), но играться должен по-настоящему.
   Интервалы считаются от ПЕРВОЙ ноты, tonic — сколько до тоники вниз. */
const MEL=[
  [0,"Hap-py",0,[.5,.5],"I"],[2,"birth",0,[1],"I"],[0,"day",0,[1],"I"],[5,"to",0,[1],"I"],[4,"you",1,[2],"V"],
  [0,"Hap-py",0,[.5,.5],"V"],[2,"birth",0,[1],"V"],[0,"day",0,[1],"V"],[7,"to",0,[1],"V"],[5,"you",1,[2],"I"],
  [0,"Hap-py",0,[.5,.5],"I"],[12,"birth",0,[1],"I"],[9,"day",0,[1],"I"],[5,"dear",0,[1],"IV"],[4,N1,0,[.5],"I"],[2,N2,1,[1.5],"I"],
  [10,"Hap-py",0,[.5,.5],"IV"],[9,"birth",0,[1],"IV"],[5,"day",0,[1],"I"],[7,"to",0,[1],"V"],[5,"you",1,[2],"I"]
];

/* Дата рождения как мелодия. Цифры кладём не на хроматику, а на мажорную
   пентатонику — в ней любая последовательность звучит без диссонанса,
   поэтому «случайного пиликанья» не выйдет ни при какой дате. */
function dateMel(src){
  const d=String(src).replace(/\D/g,"").split("").map(Number);
  if(!d.length)return null;
  const LAD=[0,2,4,7,9,12,14,16,19,21], CH=["I","I","IV","IV","V","V","I","I"];
  const out=[];
  d.forEach(x=>{
    const iv=LAD[x], dur=x%2?.5:1, prev=out[out.length-1];
    if(prev&&prev[0]===iv){ prev[3].push(dur); prev[1]+="-"+x; return; }  /* две одинаковые цифры — один шаг, две ноты */
    out.push([iv,String(x),0,[dur],CH[out.length%CH.length]]);
  });
  const base=out[0][0];
  out.forEach((c,i)=>{ c[0]-=base; if((i+1)%4===0||i===out.length-1)c[2]=1; });
  return {id:"date",name:"Твоя дата",tonic:-(LAD[d[0]]),mel:out};
}
const SONGS=[{id:"hb",name:"Happy Birthday",tonic:-7,mel:MEL}];
const DM=dateMel(BIRTH); if(DM)SONGS.push(DM);

const HTML=`
<div class="sg-hero">
  <div class="sg-em">🎤</div>
  <h1>${TITLE}</h1>
  <p class="sg-name">${NAME}</p>
</div>

<div class="sg-stage">
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
  <div class="sg-hint" id="sgHint">спеть Happy Birthday целиком — тональность подхватится с первой ноты</div>
</div>

<div class="sg-card">
  <div class="sg-ph"><img src="${IMG}" alt="${NAME}"></div>
  <p>${TEXT}</p>
</div>

<div class="sg-toast">
  <p class="sg-cheers">С праздником! 🎶</p>
</div>
`;

const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);

const out="window.SGDATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")
  +"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"sing-data.js"),out);
console.log("✓ sing-data.js: "+Math.round(out.length/1024)+" КБ, имя «"+NAME+"», пароль «"+PASS+"»");

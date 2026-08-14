#!/usr/bin/env node
/* Вторая секретная комната — для той, кто поёт.
   Содержимое шифруется своим паролем, отдельно от первой комнаты.

   node sing-build.js "пароль"
   Фото кладём рядом: sing-photo.jpg (или png/heic/webp).
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

/* ---- поменять здесь, когда будут известны ---- */
const NAME="ИМЯ";
const TITLE="С днём рождения!";
const TEXT="Голос — единственный инструмент, который всегда с собой: его не забудешь дома и не порвёшь струну. "
          +"Пусть он звучит, когда хочется, и пусть рядом всегда будут те, кто просит спеть ещё раз.";
/* --------------------------------------------- */

const PASS=process.argv[2]||"sing";
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

const HTML=`
<div class="sg-hero">
  <div class="sg-em">🎤</div>
  <h1>${TITLE}</h1>
  <p class="sg-name">${NAME}</p>
</div>

<div class="sg-stage">
  <canvas class="sg-eq" id="sgEq" width="640" height="150"></canvas>
  <div class="sg-read">
    <div class="sg-note" id="sgNote">—</div>
    <div class="sg-cents" id="sgCents">включи микрофон и спой</div>
  </div>
  <div class="sg-hold"><i id="sgHoldBar"></i></div>
  <button class="sg-btn" id="sgMic" type="button">🎤 включить микрофон</button>
  <div class="sg-hint" id="sgHint">задание: возьми любую ноту и удержи её три секунды</div>
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

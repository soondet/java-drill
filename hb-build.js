#!/usr/bin/env node
/* Секретная комната ко дню рождения.
   Собирает содержимое (фото + тексты) и шифрует его паролем — в репозиторий
   попадает только шифртекст, поэтому «секретно» здесь не на словах.

   node hb-build.js "пароль"
   Фото кладём рядом: hb-almat.jpg / hb-aigerim.jpg (любое из jpg/jpeg/png).
*/
const fs=require("fs"), path=require("path"), crypto=require("crypto"), {execFileSync}=require("child_process");

const PASS=process.argv[2]||"birthday";
const DIR=__dirname;
const ITER=200000, KEYLEN=32;

/* ---- фото: ужимаем через sips (есть в macOS из коробки), чтобы файл не распух ---- */
function findPhoto(base){
  for(const ext of [".jpg",".jpeg",".png",".webp",".heic"]){
    const p=path.join(DIR,base+ext); if(fs.existsSync(p))return p;
  }
  return null;
}
function initials(name,c1,c2){                       /* заглушка, пока фото нет */
  const ch=name.trim()[0]||"?";
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="560" viewBox="0 0 560 560">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <rect width="560" height="560" fill="url(#g)"/>
    <text x="280" y="330" font-family="Inter,sans-serif" font-size="230" font-weight="800"
      fill="rgba(255,255,255,.92)" text-anchor="middle">${ch}</text></svg>`;
  return "data:image/svg+xml;base64,"+Buffer.from(svg).toString("base64");
}
function photo(base,name,c1,c2){
  const src=findPhoto(base);
  if(!src){ console.log("  · "+base+": фото нет, ставлю заглушку с буквой"); return initials(name,c1,c2); }
  const tmp=path.join(require("os").tmpdir(),base+".jpg");
  try{
    execFileSync("sips",["-s","format","jpeg","-s","formatOptions","62","-Z","720",src,"--out",tmp],{stdio:"ignore"});
    const b=fs.readFileSync(tmp); fs.unlinkSync(tmp);
    console.log("  · "+base+": "+path.basename(src)+" → "+Math.round(b.length/1024)+" КБ");
    return "data:image/jpeg;base64,"+b.toString("base64");
  }catch(e){                                          /* нет sips — берём как есть */
    const b=fs.readFileSync(src);
    console.log("  · "+base+": "+path.basename(src)+" без сжатия, "+Math.round(b.length/1024)+" КБ");
    const mime=src.endsWith(".png")?"image/png":src.endsWith(".webp")?"image/webp":"image/jpeg";
    return "data:"+mime+";base64,"+b.toString("base64");
  }
}

console.log("Фото:");
const IMG_A=photo("hb-almat","Алмат","#6ea8fe","#54e6c8");
const IMG_G=photo("hb-aigerim","Айгерим","#a98bff","#ff8fb1");

/* ---- содержимое комнаты ---- */
const HTML=`
<div class="hb-hero">
  <div class="hb-em">🎂</div>
  <h1>С днём рождения!</h1>
  <p class="hb-names">Алмат <span>и</span> Айгерим</p>
</div>

<div class="hb-cake" id="hbCake" title="задуй свечи">
  <div class="hb-flames">
    <span class="hb-candle"><i></i></span><span class="hb-candle"><i></i></span>
    <span class="hb-candle"><i></i></span><span class="hb-candle"><i></i></span>
    <span class="hb-candle"><i></i></span>
  </div>
  <div class="hb-tiers"><div class="hb-t1"></div><div class="hb-t2"></div><div class="hb-t3"></div></div>
  <div class="hb-hint" id="hbHint">нажми на торт — задуй свечи</div>
</div>

<div class="hb-cards">
  <article class="hb-card">
    <div class="hb-ph"><img src="${IMG_A}" alt="Алмат"></div>
    <h2>Алмат</h2>
    <pre class="hb-code"><span class="k">public final class</span> Almat <span class="k">implements</span> Unbreakable {
    <span class="a">@Override</span>
    <span class="k">public void</span> <span class="m">restDay</span>() {
        <span class="k">throw new</span> UnsupportedOperationException();
    }
}</pre>
    <p>Человек, у которого дисциплина не в TODO, а уже в проде. Пусть железо гнётся,
       дедлайны двигаются, а ты — нет. Здоровья, силы и моря, как на той фотке.</p>
  </article>

  <article class="hb-card">
    <div class="hb-ph"><img src="${IMG_G}" alt="Айгерим"></div>
    <h2>Айгерим</h2>
    <pre class="hb-code"><span class="k">while</span> (alive) {
    code();
    music();
    <span class="k">if</span> (bugFound) coffee++;
}</pre>
    <p>Наушники надеты — значит, мир подождёт. Пусть баги ловятся с первого раза,
       плейлист не кончается, а всё задуманное собирается без единого warning.</p>
  </article>
</div>

<div class="hb-toast">
  <pre class="hb-code"><span class="a">@Test</span>
<span class="k">void</span> <span class="m">nextYear</span>() {
    assertThat(almat.happiness()).isGreaterThan(lastYear);
    assertThat(aigerim.happiness()).isGreaterThan(lastYear);
}
<span class="c">// ✅ 2 tests passed — 0 failures</span></pre>
  <p class="hb-cheers">За вас двоих! 🥂</p>
</div>
`;

/* ---- шифруем: PBKDF2-SHA256 → AES-256-GCM ---- */
const salt=crypto.randomBytes(16), iv=crypto.randomBytes(12);
const key=crypto.pbkdf2Sync(Buffer.from(PASS,"utf8"),salt,ITER,KEYLEN,"sha256");
const c=crypto.createCipheriv("aes-256-gcm",key,iv);
const ct=Buffer.concat([c.update(Buffer.from(HTML,"utf8")),c.final(),c.getAuthTag()]);

const out="window.HBDATA={v:1,it:"+ITER+",s:\""+salt.toString("base64")+"\",i:\""+iv.toString("base64")
  +"\",c:\""+ct.toString("base64")+"\"};\n";
fs.writeFileSync(path.join(DIR,"hb-data.js"),out);
console.log("✓ hb-data.js: "+Math.round(out.length/1024)+" КБ, пароль «"+PASS+"»");

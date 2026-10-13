/* Рисованные детские сценки к шагам «С нуля» — пилот на первых 10 шагах.
 * Сквозной персонаж — робот Бит. Всё рисуется кодом (SVG), без картинок-файлов:
 * весит копейки, одинаково на всех устройствах, работает офлайн.
 * Панель — viewBox 120×90. Текст внутри рисунка только цифры и знаки, слова —
 * в подписях под панелью (их переводим). Ключ — «тема|заголовок», как у ZKID.
 * Формат: { p:[svg-тело, …], l:[[ru,en], …], c:[ru,en] } */
(function(){
  const C={ink:"#2d3142",bot:"#6c8ef5",bot2:"#4f6fd8",face:"#e3ebff",ant:"#ff7a59",yel:"#ffc93c",red:"#ef5b5b",grn:"#4cb963",
    blue:"#5aa9e6",wood:"#c8925a",wood2:"#a8713f",grey:"#b8bfcc",paper:"#ffffff",sky:["#fff1d0","#e4f1ff","#e7f6e8","#fde4ec","#efe7ff"]};
  const S=(t,a)=>`<${t} ${Object.entries(a).map(([k,v])=>`${k}="${v}"`).join(" ")}/>`;
  const bg=k=>`<rect x="1" y="1" width="118" height="88" rx="10" fill="${C.sky[k%5]}"/><path d="M1 74 H119 V79 a10 10 0 0 1 -10 10 H11 a10 10 0 0 1 -10 -10 Z" fill="${["#f3dcae","#cfe2f7","#cbe8cd","#f6cad8","#ddd0fb"][k%5]}"/>`;
  const txt=(x,y,s,sz,col,w)=>`<text x="${x}" y="${y}" font-size="${sz||10}" font-weight="${w||800}" fill="${col||C.ink}" text-anchor="middle" font-family="ui-rounded,system-ui,sans-serif">${s}</text>`;
  /* Бит: x,y — центр ног на земле; s — масштаб. mood: smile|wow|think|sad; arms: down|up|reach|hold */
  function bot(x,y,s,o){ o=o||{}; const m=o.mood||"smile", a=o.arms||"down";
    const eyes = m==="wow" ? `<circle cx="-5" cy="-37" r="2.6" fill="${C.ink}"/><circle cx="5" cy="-37" r="2.6" fill="${C.ink}"/>`
      : m==="think" ? `<path d="M-7.5 -37 h5 M2.5 -37 h5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`
      : `<circle cx="-5" cy="-37" r="2" fill="${C.ink}"/><circle cx="5" cy="-37" r="2" fill="${C.ink}"/>`;
    const mouth = m==="wow" ? `<ellipse cx="0" cy="-31" rx="2.4" ry="2.8" fill="${C.ink}"/>`
      : m==="sad" ? `<path d="M-4 -30 q4 -4 8 0" stroke="${C.ink}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`
      : m==="think" ? `<path d="M-3 -31 h6" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/>`
      : `<path d="M-4 -32 q4 4 8 0" stroke="${C.ink}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    const arm=(side)=>{ const sx=side*11; let d;
      if(a==="up") d=`M${sx} -20 l${side*7} -11`;
      else if(a==="reach"&&side===1) d=`M${sx} -20 l10 -3`;
      else if(a==="hold") d=`M${sx} -20 l${-side*3} 7`;
      else d=`M${sx} -20 l${side*4} 9`;
      return `<path d="${d}" stroke="${C.bot2}" stroke-width="3.4" stroke-linecap="round"/>`; };
    return `<g transform="translate(${x} ${y}) scale(${s||1})">
      <ellipse cx="0" cy="0" rx="12" ry="2.6" fill="#000" opacity=".12"/>
      <path d="M-5 -8 v7 M5 -8 v7" stroke="${C.bot2}" stroke-width="3.4" stroke-linecap="round"/>
      ${arm(-1)}${arm(1)}
      <rect x="-11" y="-25" width="22" height="18" rx="5" fill="${C.bot}"/>
      <circle cx="0" cy="-16" r="3" fill="${C.yel}"/>
      <path d="M0 -49 v-6" stroke="${C.bot2}" stroke-width="2"/><circle cx="0" cy="-56.5" r="3" fill="${C.ant}"/>
      <rect x="-13" y="-49" width="26" height="22" rx="7" fill="${C.bot}"/>
      <rect x="-10" y="-45" width="20" height="15" rx="5" fill="${C.face}"/>
      ${eyes}${mouth}
      ${o.glasses?`<circle cx="-5" cy="-37" r="4" fill="none" stroke="${C.ink}" stroke-width="1.3"/><circle cx="5" cy="-37" r="4" fill="none" stroke="${C.ink}" stroke-width="1.3"/><path d="M-1 -37 h2" stroke="${C.ink}" stroke-width="1.3"/>`:""}
      ${o.hat?`<path d="M-11 -50 h22 v-3 q-2 -10 -11 -10 q-9 0 -11 10 z" fill="#fff" stroke="${C.grey}"/>`:""}
    </g>`; }
  const bulb=(x,y,on,r)=>{ r=r||9; return `<g transform="translate(${x} ${y})">
    ${on?`<circle r="${r*1.9}" fill="${C.yel}" opacity=".28"/>${[0,45,90,135,180,225,270,315].map(d=>`<path d="M0 ${-r*1.35} v${-r*.45}" stroke="${C.yel}" stroke-width="2" stroke-linecap="round" transform="rotate(${d})"/>`).join("")}`:""}
    <circle r="${r}" fill="${on?C.yel:"#8a90a0"}" stroke="${C.ink}" stroke-width="1.3"/>
    <rect x="${-r*.45}" y="${r*.8}" width="${r*.9}" height="${r*.55}" rx="1" fill="${C.grey}" stroke="${C.ink}" stroke-width="1"/>
    ${on?`<path d="M${-r*.35} ${-r*.1} q${r*.35} ${-r*.5} ${r*.7} 0" stroke="#fff" stroke-width="1.4" fill="none" opacity=".8"/>`:""}</g>`; };
  const sw=(x,y,on,s)=>{ s=s||1; return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-7" y="-11" width="14" height="22" rx="3.5" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>
    <rect x="-4" y="${on?-8:0}" width="8" height="8" rx="2" fill="${on?C.grn:C.grey}"/></g>`; };
  const card=(x,y,w,h,col,inner,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot||0})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="4" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.3"/>${inner||""}</g>`;
  const arrowR=(x1,y,x2,col)=>`<path d="M${x1} ${y} H${x2-4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x2-6} ${y-4} L${x2} ${y} L${x2-6} ${y+4}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const box=(x,y,w,h,lab,col)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${col||C.wood}" stroke="${C.wood2}" stroke-width="1.3"/>
    <path d="M${-w/2} ${-h+5} H${w/2}" stroke="${C.wood2}" stroke-width="1"/>${lab!=null?txt(0,-h/2+5,lab,9,"#fff"):""}</g>`;
  const paper=(x,y,lines,rot)=>card(x,y,30,38,"#fff",lines.map((l,i)=>txt(0,-10+i*9,l,7.5,C.ink,700)).join(""),rot);
  const chip=(x,y,face)=>`<g transform="translate(${x} ${y})">${[-9,-3,3,9].map(d=>`<path d="M${d} -17 v-4 M${d} 17 v4 M-17 ${d} h-4 M17 ${d} h4" stroke="${C.ink}" stroke-width="1.6"/>`).join("")}
    <rect x="-17" y="-17" width="34" height="34" rx="5" fill="#3b4256"/><rect x="-11" y="-11" width="22" height="22" rx="3" fill="#525b75"/>${face||""}</g>`;
  const spark=(x,y,col)=>`<path d="M${x} ${y-6} L${x+1.6} ${y-1.6} L${x+6} ${y} L${x+1.6} ${y+1.6} L${x} ${y+6} L${x-1.6} ${y+1.6} L${x-6} ${y} L${x-1.6} ${y-1.6} Z" fill="${col||C.yel}"/>`;
  const think=(x,y,inner)=>`<g transform="translate(${x} ${y})"><circle cx="-14" cy="14" r="2" fill="#fff" stroke="${C.ink}"/><circle cx="-9" cy="9" r="3" fill="#fff" stroke="${C.ink}"/>
    <rect x="-6" y="-12" width="34" height="20" rx="9" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>${inner||""}</g>`;

  /* ---- общие детали для остальных сцен ---- */
  const ok=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="8" fill="${C.grn}"/><path d="M-4 0 l3 3 l5 -6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const no=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="8" fill="${C.red}"/><path d="M-3.5 -3.5 l7 7 M3.5 -3.5 l-7 7" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></g>`;
  const db=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-14 -16 v28 a14 5 0 0 0 28 0 v-28" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.3"/><ellipse cx="0" cy="-16" rx="14" ry="5" fill="#cfe5fb" stroke="${C.ink}" stroke-width="1.3"/><path d="M-14 -6 a14 5 0 0 0 28 0 M-14 4 a14 5 0 0 0 28 0" fill="none" stroke="${C.ink}" stroke-width="1"/></g>`;
  const server=(x,y,s,lit)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-13" y="-22" width="26" height="44" rx="3" fill="#4a5168" stroke="${C.ink}" stroke-width="1.3"/>${[-14,-2,10].map((d,i)=>`<rect x="-9" y="${d}" width="18" height="8" rx="1.5" fill="#5f6884"/><circle cx="5" cy="${d+4}" r="1.6" fill="${lit===false?C.red:(i===1?C.yel:C.grn)}"/>`).join("")}</g>`;
  const cloud=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-18 8 a8 8 0 0 1 1 -16 a11 11 0 0 1 21 -3 a9 9 0 0 1 14 9 a7 7 0 0 1 -1 10 z" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.3"/></g>`;
  const env=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-13" y="-9" width="26" height="18" rx="2" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.3"/><path d="M-13 -9 l13 10 l13 -10" fill="none" stroke="${C.ink}" stroke-width="1.3"/></g>`;
  const lock=(x,y,s,open)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-6 -2 v-6 a6 6 0 0 1 12 0 ${open?"v-2":"v6"}" fill="none" stroke="${C.ink}" stroke-width="2.4"/><rect x="-9" y="-2" width="18" height="14" rx="3" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.3"/><circle cy="4" r="2" fill="${C.ink}"/></g>`;
  const key=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle cx="-8" r="5" fill="none" stroke="${col||C.yel}" stroke-width="3"/><path d="M-3 0 h13 M6 0 v4 M10 0 v4" stroke="${col||C.yel}" stroke-width="3" stroke-linecap="round"/></g>`;
  /* человечек: col — цвет кофты, mood как у Бита */
  const kid=(x,y,s,col,mood)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><ellipse rx="9" ry="2.2" fill="#000" opacity=".12"/><path d="M-4 -12 v11 M4 -12 v11" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/><rect x="-8" y="-28" width="16" height="18" rx="6" fill="${col||C.red}"/><circle cy="-36" r="8" fill="#f6d1b0"/><path d="M-8 -38 a8 8 0 0 1 16 0 q-8 -4 -16 0" fill="#5b3a29"/><circle cx="-3" cy="-36" r="1.2" fill="${C.ink}"/><circle cx="3" cy="-36" r="1.2" fill="${C.ink}"/>${mood==="sad"?`<path d="M-3 -31 q3 -2.5 6 0" stroke="${C.ink}" stroke-width="1.2" fill="none"/>`:mood==="wow"?`<circle cy="-31.5" r="1.6" fill="${C.ink}"/>`:`<path d="M-3 -32 q3 2.5 6 0" stroke="${C.ink}" stroke-width="1.2" fill="none"/>`}</g>`;
  const gear=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="10" fill="${col||C.grey}" stroke="${C.ink}" stroke-width="1.2"/>${[0,45,90,135,180,225,270,315].map(d=>`<rect x="-2.6" y="-14" width="5.2" height="5.5" fill="${col||C.grey}" stroke="${C.ink}" stroke-width="1" transform="rotate(${d})"/>`).join("")}<circle r="3.6" fill="#fff" stroke="${C.ink}"/></g>`;
  const clock=(x,y,s,h)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="10" fill="#fff" stroke="${C.ink}" stroke-width="1.4"/><path d="M0 0 v-6 M0 0 l${h==null?5:Math.round(6*Math.sin(h/12*6.283))} ${h==null?0:-Math.round(6*Math.cos(h/12*6.283))}" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/></g>`;
  const laptop=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-17" y="-24" width="34" height="22" rx="2.5" fill="#3b4256"/><rect x="-14" y="-21" width="28" height="16" rx="1" fill="#dfe9ff"/>${inner||""}<path d="M-21 -2 h42 l-3 4 h-36 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1"/></g>`;
  const phone=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-9" y="-16" width="18" height="32" rx="3.5" fill="#3b4256"/><rect x="-7" y="-12" width="14" height="23" rx="1.5" fill="#dfe9ff"/>${inner||""}</g>`;
  const coin=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="7" fill="${C.yel}" stroke="#c99a1e" stroke-width="1.5"/><text y="3" font-size="8" font-weight="900" text-anchor="middle" fill="#9a7310" font-family="system-ui">$</text></g>`;
  const mag=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="8" fill="#e8f4ff" stroke="${C.ink}" stroke-width="2"/><path d="M6 6 l8 8" stroke="${C.ink}" stroke-width="3.4" stroke-linecap="round"/></g>`;
  const bubble=(x,y,w,inner)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="-10" width="${w}" height="20" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M-4 10 l2 6 l5 -6" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M-3.5 9.2 h6" stroke="#fff" stroke-width="2"/>${inner||""}</g>`;
  const curve=(x1,y1,x2,y2,col,dash)=>{ const mx=(x1+x2)/2, my=Math.min(y1,y2)-14; return `<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" fill="none" stroke="${col||C.ink}" stroke-width="1.8" ${dash?'stroke-dasharray="3 2.5"':""} stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="2.2" fill="${col||C.ink}"/>`; };
  /* набор открыт другим файлам сцен (kid-svg-*.js): window.ZKKIT */
  window.ZKKIT={C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve};

  const K="Железо|", P="Процессор|", R="Программа|";
  const Z={};
  Z[K+"Всё, что умеет компьютер, — это включать и выключать ток"]={
    p:[ bg(0)+bulb(84,32,true,11)+sw(40,46,true,1.3)+`<path d="M49 46 C 62 46, 66 46, 76 42" stroke="${C.ink}" stroke-width="1.4" fill="none" stroke-dasharray="3 2"/>`+bot(26,82,.85,{arms:"reach",mood:"smile"}),
        bg(1)+bulb(84,32,false,11)+sw(40,46,false,1.3)+`<path d="M49 46 C 62 46, 66 46, 76 42" stroke="${C.grey}" stroke-width="1.4" fill="none" stroke-dasharray="3 2"/>`+bot(26,82,.85,{arms:"reach",mood:"think"}),
        bg(2)+[[0,1,0,1],[1,1,0,0],[1,0,1,1]].map((r,i)=>r.map((v,j)=>bulb(48+j*17,16+i*19,!!v,6)).join("")).join("")+bot(18,84,.7,{arms:"up",mood:"wow"}) ],
    l:[["щёлк — горит","click — on"],["щёлк — погасла","click — off"],["миллиард лампочек — узор","a billion bulbs — a pattern"]],
    c:["Я умею только зажигать и гасить. Зато миллиард раз и очень быстро!","I can only switch things on and off. But a billion of them, really fast!"] };
  Z[K+"Один переключатель — это бит, восемь — байт"]={
    p:[ bg(0)+sw(60,36,true,1.7)+txt(60,68,"1",14,C.grn)+txt(36,40,"0/1",10,C.ink),
        bg(1)+[1,0,0,1,0,0,0,1].map((v,i)=>sw(18+i*12,34,!!v,.75)).join("")+`<path d="M12 50 q48 14 96 0" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`+txt(60,68,"8",14,C.blue),
        bg(2)+card(80,34,32,36,"#fff",txt(0,7,"A",22,C.red))+txt(80,66,"256",11,C.ink)+bot(32,84,.75,{arms:"up",mood:"wow"}) ],
    l:[["один — это бит","one is a bit"],["восемь в ряд — байт","eight in a row — a byte"],["256 вариантов — хватит на букву","256 options — enough for a letter"]],
    c:["Один рычажок говорит «да» или «нет». Восемь вместе — уже целую букву.","One lever says yes or no. Eight together can spell a whole letter."] };
  Z[K+"Текст, картинки и звук — тоже числа"]={
    p:[ bg(0)+card(34,40,30,34,"#fff",txt(0,8,"A",22,C.red))+arrowR(54,40,72)+card(92,40,34,22,"#fff",txt(0,4,"1040",11,C.ink)),
        bg(1)+`<g transform="translate(30 40)"><rect x="-16" y="-16" width="32" height="32" fill="#c86bfa" stroke="${C.ink}" stroke-width="1.3"/>${[0,1,2,3].map(i=>`<path d="M${-16+i*8} -16 v32 M-16 ${-16+i*8} h32" stroke="#fff" stroke-width=".6" opacity=".7"/>`).join("")}</g>`+arrowR(52,40,64)+
          [["#ef5b5b","200"],["#4cb963","100"],["#5aa9e6","250"]].map((c,i)=>`<rect x="70" y="${22+i*13}" width="${12+i*4}" height="10" rx="2" fill="${c[0]}"/>`+txt(106,30+i*13,c[1],8)).join(""),
        bg(2)+`<path d="M10 44 q8 -22 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" stroke="${C.blue}" stroke-width="3" fill="none" stroke-linecap="round"/>`+[18,34,50,66,82,98].map((x,i)=>`<circle cx="${x}" cy="${i%2?55:33}" r="2.4" fill="${C.ink}"/>`).join("")+txt(60,68,"7 · 3 · 9 · 2 …",9) ],
    l:[["буква — это номер","a letter is a number"],["точка — три краски","a dot is three paints"],["звук — числа волны","sound is wave numbers"]],
    c:["Я храню не буквы и не звуки, а номера. Что они значат — договорились люди.","I keep numbers, not letters or sounds. People agreed what each number means."] };
  Z[P+"Процессор умеет до смешного мало"]={
    p:[ bg(0)+`<rect x="70" y="20" width="44" height="52" fill="${C.wood2}" rx="2"/><path d="M70 46 h44" stroke="${C.wood}" stroke-width="3"/>`+box(82,44,14,14,"2")+box(102,44,14,14,"5")+box(92,70,14,14,"3")+bot(36,82,.85,{arms:"reach"}),
        bg(1)+box(30,58,20,20,"2")+txt(52,52,"+",16)+box(74,58,20,20,"2")+txt(94,52,"=",14)+`<circle cx="108" cy="47" r="9" fill="${C.grn}"/>`+txt(108,51,"4",11,"#fff"),
        bg(2)+box(28,60,20,20,"4")+txt(52,54,"<",16)+box(74,60,20,20,"5")+`<path d="M86 34 q14 -18 26 4" stroke="${C.red}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M108 30 l4 8 l-8 -2" fill="${C.red}"/>`+txt(52,24,"?",14,C.blue) ],
    l:[["взять с полки","take from the shelf"],["сложить","add up"],["сравнить и прыгнуть","compare and jump"]],
    c:["Я знаю всего несколько команд. Игры и сайты — это миллиарды таких шажков.","I know only a few commands. Games and websites are billions of these little steps."] };
  Z[P+"Такт — это шаг сердца процессора"]={
    p:[ bg(0)+`<path d="M44 76 L60 18 L76 76 Z" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.5"/><path d="M60 68 L74 26" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/><circle cx="70" cy="38" r="4" fill="${C.red}"/>`+txt(92,32,"♪",14,C.ink),
        bg(1)+[0,1,2].map(i=>`<ellipse cx="${30+i*26}" cy="${70-i*2}" rx="5" ry="3" fill="${C.bot2}" opacity="${.35+i*.25}"/>`+txt(30+i*26,56-i*2,String(i+1),10,C.blue)).join("")+bot(98,82,.7,{mood:"smile"}),
        bg(2)+[0,1,2,3,4].map(i=>`<path d="M${16+i*20} 30 v26" stroke="${C.blue}" stroke-width="${3-i*.3}" opacity="${1-i*.15}" stroke-linecap="round"/>`).join("")+txt(60,72,"3 GHz",12,C.ink)+spark(104,22) ],
    l:[["тик — шаг","tick — a step"],["за шаг одно дело","one job per step"],["3 миллиарда в секунду","3 billion a second"]],
    c:["Каждый «тик» я успеваю сделать одно маленькое дело. Тиков — миллиарды в секунду.","On every tick I do one tiny job. And there are billions of ticks a second."] };
  Z[P+"Регистры — карманы, память — склад"]={
    p:[ bg(0)+bot(56,82,.95,{arms:"hold",mood:"smile"})+box(56,62,12,11,"7")+spark(84,30),
        bg(1)+`<rect x="56" y="54" width="54" height="5" rx="2" fill="${C.wood}"/><path d="M62 59 v15 M104 59 v15" stroke="${C.wood2}" stroke-width="3"/>`+box(72,54,12,11,"3")+box(90,54,12,11,"8")+bot(26,82,.8,{arms:"reach"}),
        bg(2)+`<path d="M70 70 V36 L92 22 L114 36 V70 Z" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/><rect x="85" y="50" width="14" height="20" fill="${C.wood2}"/>`+`<path d="M8 76 H66" stroke="${C.grey}" stroke-width="2" stroke-dasharray="4 3"/>`+bot(16,82,.6,{mood:"sad"})+`<circle cx="40" cy="30" r="10" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M40 30 v-6 M40 30 h5" stroke="${C.ink}" stroke-width="1.5" stroke-linecap="round"/>` ],
    l:[["в руках — регистр","in hand — register"],["на столе — кэш","on the desk — cache"],["склад далеко — память","far warehouse — memory"]],
    c:["Что в руках — беру сразу. Что на складе — иду долго. Поэтому нужное держу поближе.","What's in my hands I grab at once. The warehouse is a long walk, so I keep things close."] };
  Z[R+"Программа — это просто числа в памяти"]={
    p:[ bg(0)+`<rect x="8" y="58" width="104" height="5" rx="2" fill="${C.wood}"/>`+paper(34,40,["0101","1100","0011"])+box(84,58,24,20,"0110"),
        bg(1)+paper(42,40,["0101","1100","0011"])+`<path d="M18 30 h10" stroke="${C.red}" stroke-width="2.4" stroke-linecap="round"/><path d="M26 26 l4 4 l-4 4" fill="none" stroke="${C.red}" stroke-width="2"/>`+bot(90,82,.8,{mood:"think",glasses:true}),
        bg(2)+`<path d="M58 60 h34 a6 6 0 0 0 0 -0 v8 a10 10 0 0 1 -10 10 h-14 a10 10 0 0 1 -10 -10 z" fill="${C.ink}"/><path d="M92 63 h14" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>`+`<path d="M66 50 q3 -6 0 -12 M76 50 q3 -6 0 -12" stroke="${C.grey}" stroke-width="1.6" fill="none"/>`+bot(30,82,.85,{hat:true,arms:"reach"}) ],
    l:[["рецепт и продукты — цифры","recipe and food — digits"],["читаю строчку","read a line"],["делаю — и дальше","do it — then the next"]],
    c:["Рецепт и продукты лежат на одном столе, и оба записаны цифрами. Я читаю и делаю.","Recipe and food share one table, both written in digits. I read a line and do it."] };
  Z[R+"Код — это текст ДЛЯ ЧЕЛОВЕКА"]={
    p:[ bg(0)+paper(76,38,["int x =","2 + 2;"])+bot(30,82,.85,{mood:"smile"}),
        bg(1)+paper(38,38,["int x =","2 + 2;"])+chip(88,40,txt(0,5,"?",16,C.yel)),
        bg(2)+card(36,38,34,26,"#fff",txt(0,-2,"1011",8,C.ink,700)+txt(0,8,"0010",8,C.ink,700))+arrowR(56,38,68)+chip(92,40,`<path d="M-5 0 l4 4 l7 -8" stroke="${C.grn}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`) ],
    l:[["человеку понятно","clear to a human"],["машине — просто буквы","to the machine — just letters"],["ей нужны числа","it needs numbers"]],
    c:["Код пишут для людей. Машина понимает только числа, поэтому нужен переводчик.","Code is written for people. The machine only reads numbers, so it needs a translator."] };
  Z[R+"Компилятор — это переводчик"]={
    p:[ bg(0)+paper(30,38,["int x =","2 + 2"])+`<circle cx="44" cy="44" r="6" fill="none" stroke="${C.red}" stroke-width="2"/>`+bot(88,82,.85,{glasses:true,mood:"think"}),
        bg(1)+paper(30,38,["int x =","2 + 2;"])+`<path d="M18 56 l4 4 l8 -9" stroke="${C.grn}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`+arrowR(50,40,66)+bot(92,82,.8,{glasses:true,arms:"up"}),
        bg(2)+card(34,38,34,26,"#fff",txt(0,-2,"1011",8,C.ink,700)+txt(0,8,"0010",8,C.ink,700))+arrowR(54,38,66)+chip(90,40,`<path d="M-5 0 l4 4 l7 -8" stroke="${C.grn}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`) ],
    l:[["нашёл опечатку","found a typo"],["всё сошлось","all checks out"],["перевёл в числа","turned into numbers"]],
    c:["Переводчик ловит опечатки до запуска. А что программа глупая — не скажет.","The translator catches typos before running. Silly logic it won't notice."] };
  Z[R+"Как из текста получается работа: пять шагов"]={
    p:[ bg(0)+["x","=","2","+","2"].map((s,i)=>card(18+i*21,40+(i%2?8:-6),16,18,"#fff",txt(0,4,s,10),i%2?8:-8)).join(""),
        bg(1)+`<path d="M60 24 L36 48 M60 24 L84 48 M84 48 L70 70 M84 48 L98 70" stroke="${C.ink}" stroke-width="1.6"/>`+[[60,24,"="],[36,48,"x"],[84,48,"+"],[70,70,"2"],[98,70,"2"]].map(n=>`<circle cx="${n[0]}" cy="${n[1]}" r="9" fill="${C.grn}" stroke="${C.ink}" stroke-width="1.2"/>`+txt(n[0],n[1]+3.5,n[2],10,"#fff")).join(""),
        bg(2)+`<g transform="translate(44 42)"><circle r="16" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.3"/>${[0,45,90,135,180,225,270,315].map(d=>`<rect x="-3" y="-21" width="6" height="7" fill="${C.grey}" stroke="${C.ink}" transform="rotate(${d})"/>`).join("")}<circle r="5" fill="#fff" stroke="${C.ink}"/></g>`+arrowR(66,42,80)+`<circle cx="98" cy="42" r="12" fill="${C.grn}"/>`+txt(98,46,"4",12,"#fff") ],
    l:[["режем на слова","cut into words"],["строим дерево","build a tree"],["дерево работает","the tree runs"]],
    c:["Как ты читаешь: буквы, слова, смысл. Я делаю то же самое, только по правилам.","Like you read: letters, words, meaning. I do the same, just strictly by the rules."] };

  window.ZKSVG = Object.assign(window.ZKSVG||{}, Z);
  window.ZKSVG_KIT = { bot };   /* аватар для пузыря с репликой */
})();

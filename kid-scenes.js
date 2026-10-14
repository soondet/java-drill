/* Рисованные сценки к шагам «С нуля» с 11-го по последний (первые 10 — в kid-svg.js).
 * Вторая редакция: в каждой сценке робот Бит — главный герой и сам делает механизм шага
 * (минимум в двух панелях, это проверяет гейт). Набор деталей и позы Бита — window.ZKKIT
 * в kid-svg.js; ключ «тема|заголовок». Десять пачек по разделам, каждая просмотрена крупно. */

/* ---- пачка 0 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const G=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const arr=(x1,y1,x2,y2,col,dash)=>{ const a=Math.atan2(y2-y1,x2-x1),c=col||C.ink,h=5,p=d=>`${(x2-h*Math.cos(a+d)).toFixed(1)} ${(y2-h*Math.sin(a+d)).toFixed(1)}`;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="1.8" stroke-linecap="round" ${dash?'stroke-dasharray="3 2.5"':""}/><path d="M${p(.5)} L${x2} ${y2} L${p(-.5)}" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const line=(x1,y1,x2,y2,col,w,dash)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="${w||1.6}" stroke-linecap="round" ${dash?'stroke-dasharray="3 2.5"':""}/>`;
  const zone=(x,y,w,h,col,dash)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${col||"#fff"}" fill-opacity=".6" stroke="${C.ink}" stroke-width="1.1" ${dash?'stroke-dasharray="3 2"':""}/>`;
  const house=(x,y,s,col)=>G(x,y,s||1,`<path d="M-14 0 v-18 l14 -12 l14 12 v18 z" fill="${col||C.wood}" stroke="${C.ink}" stroke-width="1.3"/><rect x="-4" y="-11" width="8" height="11" fill="${C.wood2}"/><rect x="-11" y="-16" width="5" height="5" fill="#dfe9ff"/><rect x="6" y="-16" width="5" height="5" fill="#dfe9ff"/>`);
  const plate=(x,y,w,col,t)=>`<rect x="${x-w/2}" y="${y-9}" width="${w}" height="9" rx="4.5" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.2"/>`+(t?txt(x,y-2.2,t,6.5,C.ink,800):"");
  const sq=(x,y,s,col,dead)=>`<rect x="${x-s/2}" y="${y-s/2}" width="${s}" height="${s}" rx="2" fill="${dead?"#d9dde5":(col||C.yel)}" stroke="${dead?C.grey:C.ink}" stroke-width="1"/>`+(dead?`<path d="M${x-s/3} ${y-s/3} L${x+s/3} ${y+s/3} M${x+s/3} ${y-s/3} L${x-s/3} ${y+s/3}" stroke="${C.grey}" stroke-width="1.2"/>`:"");
  const truck=(x,y,s)=>G(x,y,s||1,`<rect x="-22" y="-20" width="28" height="14" rx="2" fill="${C.grn}" stroke="${C.ink}" stroke-width="1.2"/><path d="M6 -6 v-11 h8 l6 6 v5 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.2"/><circle cx="-14" cy="-5" r="4" fill="${C.ink}"/><circle cx="12" cy="-5" r="4" fill="${C.ink}"/>`+txt(-8,-10,"GC",7,"#fff"));
  const cal=(x,y,s,n)=>G(x,y,s||1,`<rect x="-9" y="-9" width="18" height="18" rx="2" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="-9" y="-9" width="18" height="5" rx="2" fill="${C.red}"/>`+(n!=null?txt(0,6,n,7):""));
  const bin=(x,y,s)=>G(x,y,s||1,`<path d="M-8 -16 h16 l-2 16 h-12 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-10" y="-19" width="20" height="3" rx="1" fill="${C.ink}"/>`);
  const chair=(x,y,s,col)=>G(x,y,s||1,`<path d="M-7 0 v-14 M7 0 v-14" stroke="${col}" stroke-width="3" stroke-linecap="round"/><rect x="-10" y="-17" width="20" height="4" rx="1.5" fill="${col}" stroke="${C.ink}" stroke-width=".8"/><rect x="-10" y="-34" width="4" height="19" rx="1.5" fill="${col}" stroke="${C.ink}" stroke-width=".8"/>`);
  const car=(x,y,s,col,wheels)=>G(x,y,s||1,`<path d="M-20 -6 v-8 q0 -3 3 -3 h6 l6 -7 h12 l6 7 h4 q3 0 3 3 v8 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-3" y="-22" width="8" height="5" fill="#dfe9ff"/>`+(wheels===false?"":`<circle cx="-11" cy="-5" r="5" fill="${C.ink}"/><circle cx="11" cy="-5" r="5" fill="${C.ink}"/><circle cx="-11" cy="-5" r="1.8" fill="${C.grey}"/><circle cx="11" cy="-5" r="1.8" fill="${C.grey}"/>`));
  const wheel=(x,y)=>`<circle cx="${x}" cy="${y}" r="5" fill="${C.ink}"/><circle cx="${x}" cy="${y}" r="1.8" fill="${C.grey}"/>`;
  const dog=(x,y,s,col)=>G(x,y,s||1,`<path d="M-9 0 v-8 M8 0 v-8" stroke="${C.wood2}" stroke-width="3" stroke-linecap="round"/><path d="M-13 -14 l-5 -5" stroke="${col||C.wood}" stroke-width="2.5" stroke-linecap="round"/><rect x="-13" y="-17" width="25" height="11" rx="5" fill="${col||C.wood}"/><circle cx="14" cy="-19" r="6" fill="${col||C.wood}"/><path d="M10 -24 l-1 7 l5 -3z" fill="${C.wood2}"/><circle cx="16" cy="-20" r="1" fill="${C.ink}"/><circle cx="20" cy="-18" r="1.4" fill="${C.ink}"/>`);
  const book=(x,y,col,t)=>`<g transform="translate(${x} ${y})"><rect x="-11" y="-14" width="22" height="28" rx="2" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-7" y="-9" width="14" height="10" rx="1" fill="#fff"/>${t?txt(0,-1.5,t,6.5):""}<path d="M-11 10 h22" stroke="#fff" stroke-width="1.5"/></g>`;
  const sign=(x,y,w,t,col,fade)=>`<g opacity="${fade?.45:1}"><rect x="${x-w/2}" y="${y-8}" width="${w}" height="16" rx="3" fill="${col||"#d9c3a0"}" stroke="${C.wood2}" stroke-width="1.3"/>${txt(x,y+3,t,8,C.ink)}</g>`;
  const lines=(x,y,w,n,col)=>Array.from({length:n},(_,i)=>`<path d="M${x} ${y+i*5} h${i===n-1?w*.6:w}" stroke="${col||C.grey}" stroke-width="2" stroke-linecap="round"/>`).join("");
  const sheet=(x,y,n,col,rot)=>card(x,y,24,30,"#fff",lines(-8,-9,16,n||4,col),rot);
  const shelf=(x,y,w,books)=>`<rect x="${x-w/2}" y="${y}" width="${w}" height="3" rx="1" fill="${C.wood2}"/>`+(books||[]).map((c,i)=>`<rect x="${x-w/2+3+i*7}" y="${y-14}" width="5.5" height="14" rx="1" fill="${c}" stroke="${C.ink}" stroke-width=".7"/>`).join("");
  const folder=(x,y,s,col)=>G(x,y,s||1,`<path d="M-12 -8 h8 l3 3 h13 v14 h-24 z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.2"/>`);
  const shield=(x,y,s,inner)=>G(x,y,s||1,`<path d="M0 -14 l12 4 v8 q0 10 -12 16 q-12 -6 -12 -16 v-8 z" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.3"/>${inner||""}`);
  const tick=(x,y,col)=>`<path d="M${x-5} ${y} l3.5 4 l7 -8" stroke="${col||C.grn}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const fridge=(x,y,s)=>G(x,y,s||1,`<rect x="-11" y="-44" width="22" height="44" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><path d="M-11 -28 h22" stroke="${C.ink}" stroke-width="1.1"/><path d="M7 -38 v6 M7 -22 v8" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`);
  const onion=(x,y)=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${C.yel}" stroke="${C.wood2}" stroke-width="1"/><path d="M${x} ${y-4.5} v-3" stroke="${C.grn}" stroke-width="1.6" stroke-linecap="round"/>`;
  const socket=(x,y,s)=>G(x,y,s||1,`<rect x="-11" y="-11" width="22" height="22" rx="5" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><circle r="7" fill="#eef0f5" stroke="${C.ink}" stroke-width="1"/><circle cx="-3" r="1.6" fill="${C.ink}"/><circle cx="3" r="1.6" fill="${C.ink}"/>`);
  const plug=(x,y)=>`<rect x="${x}" y="${y-5}" width="10" height="10" rx="2" fill="${C.ink}"/><path d="M${x} ${y-2} h-4 M${x} ${y+2} h-4" stroke="${C.grey}" stroke-width="1.6"/>`;
  const factory=(x,y,s)=>G(x,y,s||1,`<path d="M-16 0 v-16 l8 -6 v6 l8 -6 v6 l8 -6 v22 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="10" y="-30" width="5" height="30" fill="${C.wood2}" stroke="${C.ink}" stroke-width="1"/><circle cx="14" cy="-34" r="3" fill="#dfe3ea"/><circle cx="18" cy="-39" r="3.6" fill="#dfe3ea"/>`);
  const sun=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.yel}"/>`+[0,45,90,135,180,225,270,315].map(d=>`<path d="M${x} ${y-r-2} v-4" stroke="${C.yel}" stroke-width="2" stroke-linecap="round" transform="rotate(${d} ${x} ${y})"/>`).join("");
  const panel=(x,y)=>`<path d="M${x-12} ${y} l6 -14 h18 l-6 14 z" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.2"/><path d="M${x-9} ${y-7} h18 M${x-3} ${y-14} l-6 14 M${x+3} ${y-14} l-6 14" stroke="#fff" stroke-width=".8"/><path d="M${x} ${y} v6" stroke="${C.ink}" stroke-width="2"/>`;
  const atm=(x,y,s)=>G(x,y,s||1,`<rect x="-16" y="-50" width="32" height="50" rx="3" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.3"/><rect x="-11" y="-45" width="22" height="13" rx="1.5" fill="#dfe9ff"/>${[0,1,2].map(r=>[0,1,2].map(c=>`<rect x="${-10+c*7.5}" y="${-28+r*6}" width="5" height="4" rx="1" fill="#fff"/>`).join("")).join("")}<rect x="-9" y="-8" width="18" height="3" rx="1" fill="${C.ink}"/>`);
  const broom=(x,y,s)=>G(x,y,s||1,`<path d="M0 0 L10 -30" stroke="${C.wood2}" stroke-width="2.4" stroke-linecap="round"/><path d="M-6 2 L6 2 L3 -6 L-3 -6 Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>`);
  const flame=(x,y,s)=>G(x,y,s||1,`<path d="M0 0 q-8 -6 -2 -16 q1 6 5 7 q2 -6 -1 -12 q10 6 6 18 q-2 4 -8 3z" fill="${C.red}"/><path d="M1 -2 q-4 -3 -1 -8 q3 3 4 2 q1 4 -3 6z" fill="${C.yel}"/>`);
  const play=(x,y,col)=>`<circle cx="${x}" cy="${y}" r="10" fill="${col||C.grn}"/><path d="M${x-3} ${y-5} L${x+5} ${y} L${x-3} ${y+5} Z" fill="#fff"/>`;
  const tline=(x,y,w,reds)=>`<rect x="${x}" y="${y}" width="${w}" height="8" rx="4" fill="${C.grn}"/>`+reds.map(r=>`<rect x="${x+r[0]}" y="${y}" width="${r[1]}" height="8" fill="${C.red}"/>`).join("");
  const seesaw=(x,y,tilt)=>`<path d="M${x-8} ${y} L${x} ${y-12} L${x+8} ${y} Z" fill="${C.wood2}"/><g transform="rotate(${tilt} ${x} ${y-12})"><rect x="${x-44}" y="${y-15}" width="88" height="4" rx="2" fill="${C.wood}" stroke="${C.wood2}"/></g>`;
  const blueprint=(x,y,w,h)=>card(x,y,w,h,"#3f6fd0",`<g stroke="#fff" stroke-width="1.2" fill="none" opacity=".9"><path d="M-6 ${h/2-8} v-10 M6 ${h/2-8} v-10 M-8 ${h/2-18} h16 M-8 ${h/2-18} v-14"/></g>${[-1,0,1].map(i=>`<path d="M${-w/2+3} ${i*8} h${w-6}" stroke="#fff" stroke-width=".3" opacity=".5"/>`).join("")}`);

  /* ---- детали версии 2: Бит — главный герой каждой сценки ---- */
  const B=(x,s,o)=>{ o=Object.assign({},o||{}); if(o.arms==="carry"&&o.item) o.item=`<g transform="translate(0 -4)">${o.item}</g>`; return bot(x,82,s,o); };
  const sm=(inner,s)=>G(0,0,s||.6,inner);
  const note=(t,col,w)=>card(0,0,w||24,14,"#fff",txt(0,3.5,t,7.5,col||C.ink));
  const tag=(x,y,t,sz,col)=>txt(x,y,t,sz||8,col||C.ink);
  const rack=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="none" stroke="${col||C.wood2}" stroke-width="2.4"/><path d="M${x} ${y+h/2} h${w}" stroke="${col||C.wood2}" stroke-width="2.4"/>`;
  const table=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="4" rx="2" fill="${C.wood}"/><path d="M${x1+4} ${y+4} V82 M${x2-4} ${y+4} V82" stroke="${C.wood2}" stroke-width="3"/>`;
  const brush=(col)=>`<path d="M-10 4 L4 -4" stroke="${C.wood2}" stroke-width="2.6" stroke-linecap="round"/><path d="M3 -7 l7 -2 l2 5 l-6 3 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width=".8"/>`;
  const snail=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-12 0 h20 q4 0 4 -4 l3 -5" stroke="${C.grn}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="-3" cy="-7" r="7" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/><path d="M-3 -7 m-3 0 a3 3 0 1 0 3 -3" fill="none" stroke="${C.wood2}"/></g>`;
  const machine=(x,y,lab)=>`<rect x="${x-13}" y="${y-16}" width="26" height="26" rx="4" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.3"/>`+gear(x,y-3,.55,C.yel)+(lab?tag(x,y+20,lab,7.5):"");
  const room=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${col||"#fff"}" fill-opacity=".55" stroke="${C.wood2}" stroke-width="2.4"/>`;
  const mailbox=(x)=>`<path d="M${x} 82 V58" stroke="${C.ink}" stroke-width="3"/><rect x="${x-11}" y="${x?40:40}" width="22" height="18" rx="4" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.3"/><rect x="${x-7}" y="45" width="14" height="3" rx="1" fill="${C.ink}"/>`;
  const stove=(x,lab)=>`<rect x="${x-17}" y="62" width="34" height="20" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><rect x="${x-12}" y="67" width="24" height="11" rx="2" fill="#3b4256"/>`+(lab?tag(x,75,lab,6.5,"#fff"):"")+flame(x,62,.5)+`<path d="M${x-12} 44 h24 v4 a7 7 0 0 1 -7 7 h-10 a7 7 0 0 1 -7 -7 z" fill="${C.ink}"/><path d="M${x-4} 40 q2 -4 0 -8 M${x+4} 40 q2 -4 0 -8" stroke="${C.grey}" stroke-width="1.4" fill="none"/>`;
  const bag=(col)=>`<path d="M-6 -4 q6 -10 12 0" stroke="${C.ink}" stroke-width="1.6" fill="none"/><rect x="-9" y="-4" width="18" height="14" rx="3" fill="${col}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const web=(x,y)=>`<path d="M${x} ${y} l14 0 M${x} ${y} l0 14 M${x} ${y} l11 11 M${x+5} ${y} q3 3 0 5 q-3 0 -5 0 M${x+9} ${y} q4 6 0 9 q-5 2 -9 0" stroke="#8a90a0" stroke-width=".7" fill="none"/>`;
  const button=(x,col)=>`<rect x="${x-3}" y="62" width="6" height="20" fill="${C.grey}" stroke="${C.ink}"/><path d="M${x-11} 62 a11 8 0 0 1 22 0 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.3"/>`;
  const plaque=(t,w)=>`<rect x="${-(w||26)/2}" y="-8" width="${w||26}" height="16" rx="3" fill="#d9c3a0" stroke="${C.wood2}" stroke-width="1.3"/>`+txt(0,3,t,8);
  const rope=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1} Q${(x1+x2)/2} ${Math.max(y1,y2)+8} ${x2} ${y2}" stroke="${C.red}" stroke-width="1.3" fill="none"/>`;
  const wall=(x)=>`<rect x="${x-3}" y="12" width="6" height="70" fill="${C.wood2}"/>`;
  const regions=(x,y,dirt,hi,clean)=>[0,1,2].map(c=>[0,1].map(r=>{ const i=r*3+c, d=clean&&clean.includes(i)?0:dirt[i];
    return `<rect x="${x+c*17}" y="${y+r*20}" width="15" height="18" rx="2" fill="${i===hi?"#ffe0d6":"#fff"}" stroke="${i===hi?C.red:C.ink}" stroke-width="${i===hi?1.8:1}"/>`
      +Array.from({length:d},(_,k)=>`<circle cx="${x+c*17+3.5+(k%3)*4}" cy="${y+r*20+4+Math.floor(k/3)*4.5}" r="1.4" fill="#8a6a45"/>`).join(""); }).join("")).join("");
  const capbot=(x,s,o)=>B(x,s,Object.assign({hat:"cap"},o));
  const Z={};
  const J="Java: как исполняется|", M="Память|", GCg="Сборка мусора|", O="ОС|", V="Скорость|", F="Java: первая строка|", T="Java: типы|", B0="Java: объекты|", SO="SOLID|";
  const CAFE=card(0,0,26,15,"#fff",txt(0,3.5,"CAFE",7.5,C.blue));
  const code2=(a,b)=>sm(paper(0,0,[a,b]),.62);

  /* 10 */
  Z[J+"Java переводит дважды"]={
    p:[ bg(0)+B(26,.9,{mood:"think",glasses:true,arms:"hold",item:code2("x =","2+2")})+arrowR(46,50,54)+machine(68,58,"javac")+arrowR(82,50,90)+G(104,50,1,CAFE),
        bg(1)+B(34,.9,{mood:"happy",legs:"run",arms:"carry",item:G(0,6,1,CAFE)})+laptop(92,34,.6)+phone(78,70,.6)+server(104,68,.55)+G(92,12,.5,CAFE),
        bg(2)+txt(32,14,"JVM",8,C.red)+capbot(32,.9,{mood:"happy",arms:"point",item:sm(CAFE,.5)})+arrowR(64,58,70)+chip(92,52,txt(0,3,"1011",6,C.yel)) ],
    l:[["javac: текст → байткод","javac: text → bytecode"],["один байткод — всем","one bytecode for all"],["JVM: байткод → процессор","JVM: bytecode → CPU"]],
    c:["Перевожу дважды: javac — на общий байткод, а JVM на месте — на язык процессора.","Two translations: javac makes common bytecode, then the JVM turns it into CPU language."] };

  /* 11 */
  Z[J+"JIT: сначала медленно, потом быстро"]={
    p:[ bg(0)+B(34,.95,{mood:"sweat",glasses:true,arms:"hold",item:code2("iload","iadd")})+clock(92,26,1,2)+snail(92,76),
        bg(1)+[0,1,2].map(i=>card(84+i*4,48-i*5,26,16,"#fff",txt(0,3.5,"iadd",7),i*4-4)).join("")+flame(92,26,.9)+tag(92,74,"×1000",9,C.red)+B(34,.95,{mood:"think",arms:"point"}),
        bg(2)+B(40,.95,{mood:"happy",legs:"run",arms:"hold",item:sm(chip(0,0,txt(0,3,"101",7,C.yel)),.45)})+spark(96,24)+spark(84,40,C.red)+spark(106,50) ],
    l:[["сначала — по строчке","first, line by line"],["этот кусок — горячий!","this bit is hot!"],["скомпилировал — мчу!","compiled — I zoom!"]],
    c:["Сначала читаю байткод по строчке. Частые куски перевожу в машинный код — и разгоняюсь.","At first I read bytecode line by line. Hot bits I compile to machine code and speed up."] };

  /* 12 */
  const pl=(x,y,t,col)=>plate(x,y,36,col||"#fff",t);
  Z[M+"Стек: место для «прямо сейчас»"]={
    p:[ bg(0)+B(34,.9,{mood:"smile",arms:"carry",item:plate(0,5,34,C.yel,"a()")})+pl(88,82,"main"),
        bg(1)+pl(88,82,"main")+pl(88,73,"a()")+pl(88,64,"b()")+B(34,.9,{mood:"wow",arms:"carry",item:plate(0,5,34,C.grn,"c()")}),
        bg(2)+pl(88,82,"main")+pl(88,73,"a()")+pl(88,64,"b()")+B(36,.9,{mood:"happy",arms:"hold",item:plate(0,4,34,C.grn,"c()")})+spark(64,30) ],
    l:[["вызвал — кадр сверху","call — frame on top"],["кадр на кадре","frame on frame"],["вернулся — снял сам","return — lift it off"]],
    c:["Позвали метод — кладу тарелку сверху. Метод кончился — снимаю. Убирать ничего не надо.","A method call puts a plate on top. When it ends, I lift it off. No cleanup needed."] };

  /* 13 */
  Z[M+"Куча: место для «надолго»"]={
    p:[ bg(0)+rack(70,22,44,52)+box(82,48,14,12,"",C.wood)+box(102,74,14,12,"",C.wood)+B(36,.95,{mood:"smile",arms:"carry",item:box(0,8,20,15,"A")}),
        bg(1)+rack(70,22,44,52)+box(92,48,16,14,"A")+kid(18,82,.95,C.red)+rope(24,62,86,42)+B(52,.8,{mood:"happy",arms:"point"}),
        bg(2)+rack(70,14,44,30)+truck(96,82,1.1)+box(88,60,14,12,"A")+B(40,.95,{mood:"wow",arms:"wave"})+kid(12,82,.8,C.red) ],
    l:[["объект — в кучу","object goes to the heap"],["кто-то помнит — лежит","remembered — it stays"],["забыли — GC увёз","forgotten — GC takes it"]],
    c:["В куче вещи лежат долго, пока на них кто-то ссылается. Забыли все — приезжает GC.","Things in the heap stay while someone refers to them. Once all forget, GC takes them."] };

  /* 14 */
  const adr=sm(note("42",C.blue,22),.85);
  Z[M+"Ссылка — это просто адрес"]={
    p:[ bg(0)+B(30,.95,{mood:"think",arms:"hold",item:adr})+house(94,80,1.2)+tag(94,40,"42",9,C.blue)+curve(42,60,82,58,C.blue,true),
        bg(1)+B(24,.85,{mood:"smile",arms:"hold",item:adr})+kid(56,82,1,C.grn)+card(56,64,18,11,"#fff",txt(0,3,"42",7,C.blue))+house(98,80,1.1)+curve(66,62,86,60,C.blue,true),
        bg(2)+house(90,80,1.3,C.red)+tag(90,28,"42",10,C.blue)+B(46,.9,{mood:"happy",arms:"reach",item:brush(C.red)})+kid(110,82,.75,C.grn,"wow") ],
    l:[["в кармане — адрес","an address in my pocket"],["дал другу — один дом","shared it — one house"],["покрасил — видят оба","painted — both see it"]],
    c:["В переменной не сам дом, а его адрес. Дал адрес другу — мы оба ходим в один дом.","A variable holds an address, not the house. Share it, and we both visit the same house."] };

  /* 15 */
  const book15=sm(card(0,0,26,24,"#fff",txt(0,-2,"42",7,C.blue)+txt(0,8,"null",7,C.red)),.85);
  Z[M+"null — это адрес, которого нет"]={
    p:[ bg(0)+B(34,.95,{mood:"think",arms:"hold",item:book15})+think(78,26,txt(11,3,"?",12,C.red)),
        bg(1)+B(32,.9,{mood:"sweat",legs:"run",arms:"reach"})+`<path d="M76 80 v-28 l14 -12 l14 12 v28 z" fill="none" stroke="${C.grey}" stroke-width="1.6" stroke-dasharray="3 3"/>`+tag(90,66,"?",14,C.grey),
        bg(2)+B(38,.95,{mood:"wow",arms:"up"})+bubble(88,26,40,txt(0,3.5,"NPE!",10,C.red))+spark(104,52,C.red)+spark(76,60) ],
    l:[["в записи — null","the note says null"],["идти некуда","nowhere to go"],["NPE — честный крик","NPE — an honest shout"]],
    c:["null — пустая строчка вместо адреса. Пойти по ней нельзя, и я честно кричу: NPE!","null is an empty line instead of an address. I can't go there, so I shout: NPE!"] };

  /* 16 */
  const young=[[70,58],[84,62],[98,56],[76,72],[92,74],[106,70],[110,58]];
  Z[GCg+"Гипотеза поколений — почему GC вообще быстрый"]={
    p:[ bg(0)+cal(104,18,.9,"1")+young.map((q,i)=>sq(q[0],q[1],8,C.yel,i!==2)).join("")+broom(50,82,1)+B(34,.9,{mood:"happy",arms:"reach"}),
        bg(1)+rack(74,26,40,48)+sq(84,44,9,C.blue)+sq(102,44,9,C.blue)+sq(92,69,9,C.blue)+B(40,.95,{mood:"smile",legs:"run",arms:"carry",item:sq(0,4,10,C.yel)}),
        bg(2)+cal(104,18,.9,"365")+rack(64,30,50,44)+[70,80,90,100,108].map((x,i)=>sq(x,47,8,C.blue,i%2)+sq(x,71,8,C.blue,i%3===1)).join("")+broom(48,82,1)+B(32,.9,{mood:"sweat",arms:"reach"}) ],
    l:[["молодых — каждый день","young: every day"],["выжил — на старую полку","survivor — to old shelf"],["старых — раз в год","old: once a year"]],
    c:["Почти все объекты умирают молодыми. Молодых убираю часто и дёшево, старых — редко.","Most objects die young. I clean the young often and cheaply, the old rarely."] };

  /* 17 */
  const mess=(x,n)=>Array.from({length:n},(_,i)=>sq(x+(i%4)*8,78-Math.floor(i/4)*7,7,"#d9dde5")).join("");
  Z[GCg+"Пауза — вот что на самом деле важно"]={
    p:[ bg(0)+laptop(28,74,.8,`<rect x="-5" y="-17" width="3" height="9" fill="${C.red}"/><rect x="2" y="-17" width="3" height="9" fill="${C.red}"/>`)+kid(10,82,.8,C.red,"sad")+tag(60,18,"500ms",9,C.red)+mess(48,12)+broom(66,82,1)+B(96,.85,{mood:"sweat",arms:"reach",flip:true}),
        bg(1)+laptop(28,74,.8,`<path d="M-8 -12 h16 M-8 -8 h10" stroke="${C.grn}" stroke-width="2"/>`)+kid(10,82,.8,C.grn)+tag(60,18,"5ms",9,C.grn)+sq(76,78,7,"#d9dde5")+broom(70,82,1)+B(96,.85,{mood:"happy",arms:"reach",flip:true}),
        bg(2)+seesaw(60,82,-5)+box(22,66,18,12,"")+box(30,56,12,10,"")+clock(98,52,.9)+bot(60,70,.75,{mood:"think",arms:"up"}) ],
    l:[["долгая уборка — всё стоит","big clean — all frozen"],["по чуть-чуть — работаем","bit by bit — we work"],["скорость или паузы","speed or short pauses"]],
    c:["Меня судят по паузам: сколько мс программа стоит. Короче паузы — больше лишней работы.","I'm judged by pauses: how many ms the app stands still. Shorter pauses cost extra work."] };

  /* 18 */
  const dirt=[2,6,1,3,0,5];
  Z[GCg+"G1 — выбор по умолчанию"]={
    p:[ bg(0)+regions(62,26,dirt,-1)+B(30,.95,{mood:"think",arms:"point"}),
        bg(1)+regions(6,26,dirt,1)+broom(72,82,1)+B(92,.95,{mood:"sweat",arms:"reach",flip:true}),
        bg(2)+regions(62,26,dirt,-1,[1,5,3])+B(34,.95,{mood:"happy",arms:"hold",item:clock(0,0,.75,3)})+tag(34,14,"≤200ms",8,C.grn)+ok(108,16,.8) ],
    l:[["куча — много комнат","heap: many rooms"],["сначала самую грязную","dirtiest one first"],["уложился в паузу","fit into the pause"]],
    c:["Делю кучу на комнатки и убираю сначала самые грязные — сколько успею за паузу.","I split the heap into rooms and clean the dirtiest first, as much as fits in a pause."] };

  /* 19 */
  Z[GCg+"ZGC — когда паузы критичны"]={
    p:[ bg(0)+table(6,46,60)+laptop(26,60,.7)+kid(18,82,.8,C.grn)+spark(56,78,"#fff")+broom(74,82,1)+B(96,.9,{mood:"happy",arms:"reach",flip:true}),
        bg(1)+B(34,.95,{mood:"wow",arms:"hold",item:clock(0,0,.8,1)})+tag(86,44,"<1ms",16,C.grn)+spark(104,22),
        bg(2)+B(36,.9,{mood:"sweat",arms:"carry",item:box(0,8,26,16,"RAM",C.blue)})+chip(92,54,txt(0,3,"CPU",6,C.yel))+flame(92,30,.7) ],
    l:[["мою пол, пока ты работаешь","I mop while you work"],["пауза меньше 1 мс","pause under 1 ms"],["плата: память и CPU","price: memory and CPU"]],
    c:["Убираю параллельно с программой, паузы меньше миллисекунды. Плата — память и CPU.","I clean alongside the app, pauses under a millisecond. The price is memory and CPU."] };

  /* 20 */
  const pass=sm(card(0,0,30,24,"#fff",[0,1,2,3].map(i=>[0,1].map(j=>`<circle cx="${-9+i*6}" cy="${-5+j*9}" r="2.4" fill="${C.red}"/>`).join("")).join("")),.95);
  Z[GCg+"Два разных OutOfMemory"]={
    p:[ bg(0)+room(66,24,48,52)+tag(90,18,"heap",8)+[0,1,2].map(r=>[0,1,2].map(c=>box(76+c*14,74-r*16,13,15,"")).join("")).join("")+B(28,.9,{mood:"sweat",arms:"push",item:box(0,8,14,13,"")}),
        bg(1)+tag(60,14,"Metaspace",8)+B(34,.95,{mood:"dizzy",arms:"hold",item:pass})+[0,1,2].map(i=>card(86+i*10,36+i*14,12,10,"#fff",txt(0,3,"C",7,C.red),i*10-10)).join(""),
        bg(2)+B(28,.9,{mood:"think",arms:"point"})+card(78,30,32,16,"#fff",txt(0,3.5,"heap",7.5))+mag(104,28,.6)+card(78,60,32,16,"#fff",txt(0,3.5,"Meta",7.5))+gear(104,60,.6)+no(110,52,.5) ],
    l:[["кончилась куча","heap is full"],["кончилось место классам","no room for classes"],["и лечатся по-разному","different cures"]],
    c:["Два «нет места»: в куче под объекты и в Metaspace под классы. Причины ищу разные.","Two kinds of no room: heap for objects, Metaspace for classes. Different causes."] };

  /* 21 */
  Z[GCg+"Утечка в Java существует"]={
    p:[ bg(0)+rack(70,24,44,50)+tag(92,18,"static",7.5,C.red)+box(82,49,12,11,"")+box(100,49,12,11,"")+box(82,74,12,11,"")+B(36,.95,{mood:"happy",arms:"carry",item:box(0,8,18,14,"")}),
        bg(1)+truck(26,82,1)+no(26,46,.8)+rack(82,24,32,50)+box(92,49,10,10,"")+box(104,49,10,10,"")+box(92,74,10,10,"")+box(104,74,10,10,"")+rope(64,70,92,40)+rope(64,70,104,64)+B(62,.85,{mood:"smile",arms:"hold"}),
        bg(2)+rack(70,24,44,50)+tag(92,18,"static",7.5,C.red)+box(82,49,12,11,"")+box(100,49,12,11,"")+box(82,74,12,11,"")+box(100,74,12,11,"")+rope(92,22,82,38)+rope(92,22,100,38)+B(34,.95,{mood:"wow",arms:"reach",item:mag(4,0,.8)}) ],
    l:[["всё в static — навсегда","into static — forever"],["GC не может увезти","GC can't take it"],["heap dump: кто держит?","heap dump: who holds it?"]],
    c:["Пока я сам держу ссылку, GC считает вещь нужной. Heap dump покажет, кто держит.","While I hold a reference, GC thinks it's needed. A heap dump shows who holds it."] };

  /* 22 */
  const counter=`<rect x="70" y="56" width="46" height="26" rx="2" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/>`;
  Z[O+"Программа не трогает железо напрямую"]={
    p:[ bg(0)+db(98,60,1.1)+`<path d="M66 82 V34" stroke="${C.ink}" stroke-width="3"/><rect x="62" y="40" width="10" height="34" fill="none"/><path d="M60 48 h12 M60 62 h12" stroke="${C.red}" stroke-width="4"/>`+B(36,.95,{mood:"sad",arms:"reach"})+no(66,22,.8),
        bg(1)+kid(94,70,.95,C.blue)+counter+tag(94,20,"OS",9,C.blue)+B(36,.95,{mood:"think",arms:"reach",item:env(4,0,.65)}),
        bg(2)+kid(94,70,.95,C.blue)+counter+tag(94,20,"OS",9,C.blue)+db(108,46,.55)+ok(70,30,.7)+B(36,.95,{mood:"happy",arms:"hold",item:sm(sheet(0,0,3,C.blue),.7)}) ],
    l:[["к диску сам — нельзя","no direct disk access"],["пишу заявку ОС","I ask the OS"],["проверила и выдала","checked and handed over"]],
    c:["Я не лезу к диску сам — прошу ОС. Она проверит права и принесёт. Это системный вызов.","I don't touch the disk — I ask the OS. It checks rights and fetches. That's a system call."] };

  /* 23 */
  Z[O+"Процесс — это программа со своей памятью"]={
    p:[ bg(0)+laptop(60,76,.8,play(0,-13,C.grn).replace('r="10"','r="6"'))+B(26,.9,{mood:"smile",arms:"reach"})+house(98,80,1)+spark(98,30)+spark(112,50),
        bg(1)+room(3,24,55,58)+room(62,24,55,58)+B(30,.75,{mood:"happy",arms:"hold",item:box(0,8,14,13,"1")})+capbot(90,.75,{mood:"happy",arms:"hold",item:box(0,8,14,13,"2",C.grn)}),
        bg(2)+capbot(30,.9,{mood:"angry",arms:"push"})+wall(62)+lock(62,52,1.1)+B(94,.85,{mood:"happy",arms:"hold",item:box(0,8,14,13,"1")}) ],
    l:[["запуск — новый процесс","launch — a new process"],["у каждого своя память","each has its own memory"],["в чужую — нельзя","no entry to others"]],
    c:["Каждой программе ОС даёт свою комнату-память. В чужую комнату зайти нельзя.","The OS gives each program its own memory room. Nobody can enter someone else's."] };

  /* 24 */
  const doc=(t,col)=>card(60,52,24,16,"#fff",txt(0,3.5,t,8,col||C.ink));
  Z[O+"Поток — рабочий внутри процесса"]={
    p:[ bg(0)+table(40,80,60)+doc("x=1")+B(22,.85,{mood:"happy",arms:"wave"})+capbot(98,.85,{mood:"happy",flip:true}),
        bg(1)+table(40,80,60)+doc("x=1")+tag(26,18,"+1",9,C.blue)+tag(94,18,"+2",9,C.red)+B(28,.9,{mood:"sweat",arms:"reach"})+capbot(92,.9,{mood:"sweat",arms:"reach",flip:true}),
        bg(2)+table(40,80,60)+doc("x=3",C.red)+tag(60,30,"≠4",10,C.red)+B(22,.85,{mood:"sad"})+capbot(98,.85,{mood:"think",flip:true}) ],
    l:[["одна комната на всех","one room for all"],["двое правят одно","two edit one thing"],["одна правка пропала","one edit got lost"]],
    c:["Потоки живут в одной памяти. Если двое разом правят x, одна правка может пропасть.","Threads share one memory. If two change x at once, one change can get lost."] };

  /* 25 */
  Z[V+"Главное число в программировании: всё разное по скорости"]={
    p:[ bg(0)+B(40,1,{mood:"happy",arms:"hold",item:box(0,11,20,18,"7")})+tag(92,40,"1s",14,C.grn),
        bg(1)+table(66,112,56)+box(80,56,12,11,"7")+B(36,.95,{mood:"smile",arms:"reach"})+tag(92,30,"10s",13,C.blue),
        bg(2)+`<path d="M78 74 V40 L96 28 L114 40 V74 Z" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>`+tag(96,62,"5min",8,"#fff")+B(34,.9,{mood:"sad",legs:"run"})+`<path d="M52 80 H74" stroke="${C.grey}" stroke-width="2" stroke-dasharray="4 3"/>`,
        bg(3)+db(94,58,1.1)+[0,1,2].map(i=>cal(70+i*5,18+i*3,.8,"")).join("")+B(36,.95,{mood:"sleep",legs:"sit"}),
        bg(4)+cloud(92,24,1.1)+env(100,58,.8)+[0,1,2,3,4].map(i=>cal(64+i*5,40+i*2,.7,"")).join("")+B(34,1,{mood:"dizzy",legs:"sit"})+web(2,2) ],
    l:[["в руках — 1 секунда","in hand — 1 second"],["на столе — 10 секунд","on the desk — 10 seconds"],["в памяти — 5 минут","in RAM — 5 minutes"],["на диске — месяцы","on disk — months"],["по сети — годы","over network — years"]],
    c:["Если мой шаг — секунда, то память — минуты, диск — месяцы, а сеть — годы. Ждать дорого!","If my step is a second, RAM is minutes, disk is months and network is years. Waiting costs!"] };

  /* 26 */
  Z[V+"Отсюда взялись кэши, очереди и асинхронность"]={
    p:[ bg(0)+fridge(86,82,1)+house(112,60,.45)+B(42,.95,{mood:"happy",arms:"reach",item:onion(4,0)}),
        bg(1)+mailbox(22)+env(22,36,.5)+B(76,.95,{mood:"happy",legs:"run",arms:"carry",item:box(0,8,16,13,"")}),
        bg(2)+server(64,60,.7)+server(86,60,.7)+server(108,60,.7)+[64,86,108].map(x=>box(x,42,10,9,"")).join("")+B(26,.95,{mood:"happy",arms:"point"}) ],
    l:[["копия рядом — кэш","a copy nearby — cache"],["бросил и дальше — очередь","drop and go — a queue"],["раздал многим машинам","spread over machines"]],
    c:["Ждать дорого. Поэтому держу копию рядом, не стою в очереди и раздаю работу многим машинам.","Waiting is costly: I keep a copy near, don't stand in line and spread work over many machines."] };

  /* 27 */
  Z[F+"Что вообще нужно, чтобы запустить Java"]={
    p:[ bg(0)+`<rect x="52" y="12" width="64" height="66" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="60" y="28" width="50" height="44" rx="5" fill="#e4f1ff" stroke="${C.ink}" stroke-width="1.1"/><rect x="70" y="44" width="32" height="24" rx="4" fill="#ffe0d6" stroke="${C.ink}" stroke-width="1.1"/>`+tag(84,23,"JDK",8)+tag(85,39,"JRE",8)+tag(86,60,"JVM",8,C.red)+B(26,.9,{mood:"happy",hat:"chef",arms:"point"}),
        bg(1)+B(26,.9,{mood:"think",hat:"chef",arms:"hold",item:code2("int x","= 2;")})+arrowR(44,50,52)+machine(66,58,"javac")+arrowR(80,50,88)+G(102,50,1,CAFE),
        bg(2)+stove(90,"JVM")+B(52,.95,{mood:"happy",hat:"chef",arms:"reach"}) ],
    l:[["JDK ⊃ JRE ⊃ JVM","JDK ⊃ JRE ⊃ JVM"],["javac готовит байткод","javac makes bytecode"],["JVM — конфорка","the JVM is the burner"]],
    c:["Ставлю JDK — и есть всё: javac переводит, java запускает, а JVM исполняет байткод.","Install the JDK and you get it all: javac translates, java launches, the JVM runs bytecode."] };

  /* 28 */
  const envT=(t,col)=>env(0,0,.9)+txt(0,6,t,6.5,col);
  const post=(x,m)=>kid(x,82,1,C.blue,m)+tag(x,30,"JVM",8,C.blue);
  Z[F+"Минимальная программа и почему она такая"]={
    p:[ bg(0)+box(92,82,40,28,"class")+B(40,.95,{mood:"smile",arms:"reach",item:code2("main","{...}")}),
        bg(1)+post(94,"wow")+tag(94,18,"?",12,C.red)+B(36,.95,{mood:"sad",arms:"reach",item:envT("mian",C.red)}),
        bg(2)+post(94)+ok(94,16,.8)+B(36,.95,{mood:"happy",arms:"reach",item:envT("main",C.grn)}) ],
    l:[["код живёт в классе","code lives in a class"],["mian — не найдут","mian — not found"],["ровно main — принято","exactly main — accepted"]],
    c:["JVM ищет метод с именем main. Ошибёшься в имени — не запустит.","The JVM looks for a method named main. Misspell it and nothing runs."] };

  /* 29 */
  Z[F+"Что происходит при запуске, по шагам"]={
    p:[ bg(0)+B(28,.9,{mood:"think",arms:"hold",item:code2("Main",".java")})+arrowR(50,50,64)+G(92,50,1,card(0,0,44,16,"#fff",txt(0,3.5,"Main.class",6.5,C.blue))),
        bg(1)+tag(88,22,"java Main",8)+button(90,C.red)+B(64,.95,{mood:"wow",arms:"push"}),
        bg(2)+shelf(90,40,40,[C.red,C.blue,C.grn,C.yel])+shelf(90,70,40,[C.grn,C.red])+book(108,56,C.blue,"M")+B(40,.95,{mood:"think",arms:"reach",item:mag(4,0,.7)}),
        bg(3)+B(34,.95,{mood:"think",glasses:true,arms:"hold",item:sm(CAFE,.75)})+shield(90,46,1.3,tick(0,0,"#fff")),
        bg(4)+stove(90)+tag(90,20,"main()",9,C.red)+B(52,.95,{mood:"happy",hat:"chef",arms:"reach"}) ],
    l:[["javac: .java → .class","javac: .java → .class"],["java Main: старт JVM","java Main: JVM starts"],["нашла класс, загрузила","found and loaded it"],["проверила байткод","checked the bytecode"],["готово — зовём main","ready — call main"]],
    c:["javac делает .class. Потом JVM находит класс, грузит, проверяет, готовит и зовёт main.","javac makes a .class. Then the JVM finds, loads, checks and prepares it, and calls main."] };

  /* 30 */
  const ord=(x,y,t)=>card(x,y,30,14,"#fff",txt(0,3.5,t,6.5));
  Z[F+"Пакет — это фамилия класса"]={
    p:[ bg(0)+ord(92,26,"Order")+ord(92,46,"Order")+ord(92,66,"Order")+B(32,.95,{mood:"dizzy",arms:"hold",item:sm(env(0,0,1),.7)})+tag(60,22,"?",13,C.red),
        bg(1)+house(94,80,1.2,C.grn)+card(94,36,40,12,"#fff",txt(0,3,"com.acme",6.5,C.blue))+B(40,.95,{mood:"happy",arms:"reach",item:env(4,0,.6)}),
        bg(2)+folder(70,30,1.4)+tag(70,32,"com",6)+folder(84,50,1.4,C.blue)+tag(84,52,"acme",6)+folder(98,70,1.4,C.grn)+tag(98,72,"orders",5.5)+B(32,.9,{mood:"happy",arms:"carry",item:sm(sheet(0,0,3),.6)}) ],
    l:[["Order — их тысячи","thousands of Order"],["пакет — как фамилия","a package is a surname"],["пакет = папки","package = folders"]],
    c:["Класс Order не один в мире. Пакет — его фамилия с адресом, и лежит он в таких же папках.","There are many Order classes. A package is its surname, and it lives in matching folders."] };

  /* 31 */
  const shelves=(d)=>["A","B","C"].map((t,i)=>shelf(64+i*16,62,14,[C.red,C.blue])+tag(64+i*16,76,t,8)).join("")+(d?shelf(110,62,10,[C.grn])+tag(110,76,"D",8,C.grn):"");
  Z[F+"Classpath — где JVM ищет классы"]={
    p:[ bg(0)+shelves(false)+B(26,.9,{mood:"think",arms:"hold",item:sm(note("A B C",C.blue,30),.85)}),
        bg(1)+shelves(true)+tag(80,36,"?",14,C.red)+no(110,40,.6)+B(26,.9,{mood:"sad",arms:"hold",item:sm(note("A B C",C.blue,30),.85)}),
        bg(2)+shelves(true)+tag(110,30,"✓",12,C.grn)+B(28,.95,{mood:"happy",arms:"carry",item:book(0,4,C.grn,"")}) ],
    l:[["ищу только в classpath","only on the classpath"],["класс в шкафу D — «нет»","class in D — \"missing\""],["добавил D — нашёл","added D — found it"]],
    c:["Ищу классы только по classpath. Лежит класс в другом шкафу — для меня его нет.","I only search the classpath. If a class sits on another shelf, for me it doesn't exist."] };

  /* 32 */
  const scroll=(x)=>card(x,46,30,52,"#fff",lines(-10,-18,20,7,C.blue));
  Z[F+"Почему в Java всё такое многословное"]={
    p:[ bg(0)+scroll(90)+B(40,.95,{mood:"sweat",arms:"reach",item:`<path d="M-4 6 L8 -8" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>`}),
        bg(1)+scroll(60)+kid(96,82,1,C.grn)+B(24,.9,{mood:"smile",arms:"point"}),
        bg(2)+scroll(60)+cal(60,12,.9,"+3")+kid(96,82,1,C.grn)+ok(96,22,.8)+B(24,.9,{mood:"happy",arms:"wave"}) ],
    l:[["писать дольше","slower to write"],["читать легко","easy to read"],["через годы всё ясно","clear years later"]],
    c:["В Java всё явно: типы, доступ, ошибки. Писать дольше, зато через годы всем понятно.","Java spells it all out: types, access, errors. Slower to write, clear for years."] };

  /* 33 */
  Z[T+"Два сорта значений: примитивы и объекты"]={
    p:[ bg(0)+tag(80,36,"int",12,C.blue)+B(44,1.05,{mood:"happy",arms:"hold",item:box(0,9,16,15,"5",C.grn)}),
        bg(1)+house(96,80,1.2)+tag(96,40,"42",9,C.blue)+curve(42,60,84,58,C.blue,true)+B(30,1,{mood:"think",arms:"hold",item:adr}) ],
    l:[["int: число в руках","int: the number in hand"],["объект: в руках адрес","object: just its address"]],
    c:["Число держу прямо в руках. А объект лежит в куче — у меня только его адрес.","A number I hold in my hands. An object lives in the heap — I only hold its address."] };

  /* 34 */
  Z[T+"Автобоксинг — тихая подмена"]={
    p:[ bg(0)+card(88,40,18,18,"#fff",txt(0,4,"5",11,C.grn))+arr(78,40,64,40)+tag(88,66,"int",8)+B(40,.95,{mood:"smile",arms:"hold",item:box(0,10,26,20,"5")})+tag(40,16,"Integer",7.5),
        bg(1)+[[70,82],[86,82],[102,82],[78,68],[94,68],[86,54],[110,70]].map(q=>box(q[0],q[1],14,13,"5")).join("")+tag(88,30,"×1000",9,C.red)+B(34,.95,{mood:"sweat",arms:"carry",item:box(0,8,16,14,"5")}),
        bg(2)+box(80,82,24,18,"")+txt(80,76,"1000",7,"#fff")+box(106,82,24,18,"")+txt(106,76,"1000",7,"#fff")+tag(93,48,"==",11)+no(93,32,.8)+B(34,.95,{mood:"dizzy",arms:"point"}) ],
    l:[["int сам лёг в коробку","int boxed itself"],["в цикле — гора коробок","a loop: a box pile"],["== вдруг врёт","== suddenly lies"]],
    c:["Java сама кладёт int в коробку Integer. Удобно, но коробка — объект, а не число.","Java boxes an int into an Integer by itself. Handy, but a box is an object, not a number."] };

  /* 35 */
  const bk=(c)=>book(0,0,c||C.red,"Hi");
  Z[T+"== сравнивает адреса, equals сравнивает содержимое"]={
    p:[ bg(0)+book(96,56,C.red,"Hi")+tag(70,26,"==",11)+no(70,44,.8)+B(32,.95,{mood:"think",arms:"hold",item:sm(bk(),.8)}),
        bg(1)+book(96,56,C.red,"Hi")+tag(96,26,"equals",8)+ok(70,40,.8)+B(32,.95,{mood:"happy",glasses:true,arms:"reach",item:mag(4,0,.7)}),
        bg(2)+table(48,92,60)+book(70,46,C.red,"Hi")+tag(70,20,"==",11)+ok(86,20,.7)+B(24,.85,{mood:"happy",arms:"point"})+kid(106,82,.95,C.grn) ],
    l:[["==: та же книга? нет","==: the same book? no"],["equals: текст тот же? да","equals: same text? yes"],["одна книга — == да","one book — == is true"]],
    c:["== спрашивает: это та же самая книга? equals — одинаковый ли в книгах текст?","== asks: is it the very same book? equals asks: is the text the same?"] };

  /* 36 */
  Z[T+"Строки нельзя изменить"]={
    p:[ bg(0)+G(94,40,1.1,plaque("Hi"))+tag(94,62,"+!",9,C.red)+no(110,26,.6)+B(36,.95,{mood:"sweat",arms:"carry",item:plaque("Hi!",28)}),
        bg(1)+[[70,76,-10],[90,78,8],[108,74,-4],[80,64,14],[100,62,-12],[90,50,4]].map(q=>`<g transform="translate(${q[0]} ${q[1]}) rotate(${q[2]}) scale(.7)">${plaque("Hi")}</g>`).join("")+B(34,.95,{mood:"dizzy",arms:"up"}),
        bg(2)+card(90,44,40,30,"#fff",txt(0,-3,"SB",8,C.blue)+txt(0,9,"Hi!!!",9,C.grn))+B(36,.95,{mood:"happy",arms:"reach",item:`<path d="M-4 6 L8 -8" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/>`}) ],
    l:[["дописать нельзя — новая","can't edit — make new"],["в цикле — гора старых","a loop leaves a pile"],["StringBuilder дописывает","StringBuilder appends"]],
    c:["Строку не исправить — только сделать новую. Для склейки в цикле бери StringBuilder.","A string can't change — only a new one is made. Use StringBuilder to glue in a loop."] };

  /* 37 */
  const pool=(x)=>`<rect x="${x-20}" y="30" width="40" height="3" rx="1" fill="${C.wood2}"/><path d="M${x-16} 33 v6 M${x+16} 33 v6" stroke="${C.wood2}" stroke-width="2"/>`+G(x,22,.9,plaque("hi"));
  Z[T+"Пул строк: почему литералы ведут себя иначе"]={
    p:[ bg(0)+`<rect x="64" y="40" width="48" height="3" rx="1" fill="${C.wood2}"/>`+G(100,32,.8,plaque("hi"))+B(40,.95,{mood:"smile",arms:"carry",item:plaque("hi")}),
        bg(1)+pool(60)+B(22,.85,{mood:"happy",arms:"point"})+capbot(98,.85,{mood:"happy",flip:true,arms:"point"})+tag(60,60,"==",10)+ok(60,72,.6),
        bg(2)+pool(28)+factory(102,82,.8)+tag(102,48,"new",8,C.red)+capbot(64,.9,{mood:"think",arms:"carry",item:plaque("hi")})+tag(28,56,"==",10)+no(28,70,.7) ],
    l:[["литерал — на общую полку","literal to shared shelf"],["второй берёт тот же","the second reuses it"],["new — своя копия","new — its own copy"]],
    c:["Одинаковые литералы Java берёт с общей полки. А new String всегда делает свою копию.","Equal literals come from one shared shelf. new String always makes its own copy."] };

  /* 38 */
  Z[T+"null — не ноль и не пустота"]={
    p:[ bg(0)+B(56,1.05,{mood:"smile",arms:"hold",item:box(0,12,26,22,"0",C.grn)}),
        bg(1)+B(56,1.05,{mood:"smile",arms:"hold",item:box(0,12,26,22,'""',C.blue)}),
        bg(2)+tag(94,30,"null",10,C.red)+B(60,1.05,{mood:"think",arms:"hold"})+`<rect x="47" y="56" width="26" height="20" rx="2" fill="#fff" fill-opacity=".5" stroke="${C.ink}" stroke-width="1.4" stroke-dasharray="3 2"/>`,
        bg(3)+B(50,1.05,{mood:"dizzy",arms:"up"})+spark(88,30,C.red)+spark(100,50)+tag(94,72,"NPE",10,C.red) ],
    l:[["0 — это число","0 is a number"],["\"\" — пустая строка","\"\" — an empty string"],["null — нет ничего","null — nothing at all"],["тронул null — упал","touch null — crash"]],
    c:["0 — число, \"\" — пустая строка. А null — вообще нет объекта: тронешь — будет NPE.","0 is a number, \"\" is an empty string. null means no object at all: touch it — NPE."] };

  /* 39 */
  Z[B0+"Класс — чертёж, объект — изделие"]={
    p:[ bg(0)+B(40,1,{mood:"think",arms:"hold",item:blueprint(0,0,28,22)})+blueprint(92,40,34,30),
        bg(1)+machine(66,58,"new")+arrowR(80,66,90)+chair(104,82,1.1,C.red)+B(28,.9,{mood:"wow",arms:"push",item:sm(blueprint(0,0,26,20),.6)}),
        bg(2)+chair(68,82,.9,C.red)+chair(86,82,.9,C.grn)+chair(104,82,.9,"#c9d3e6")+B(36,.9,{mood:"happy",arms:"reach",item:brush(C.blue)}) ],
    l:[["класс — чертёж","a class is a blueprint"],["new — новое изделие","new makes a thing"],["у каждого свой цвет","each has its own colour"]],
    c:["Класс — чертёж стула. Объекты — сами стулья: чертёж один, а у каждого свой цвет.","A class is a chair blueprint. Objects are the chairs: one plan, each its own colour."] };

  /* 40 */
  Z[B0+"Конструктор — сборка изделия"]={
    p:[ bg(0)+car(84,72,1.1,C.red,false)+wheel(70,80)+wheel(104,80)+B(28,.95,{mood:"think",arms:"point"}),
        bg(1)+car(90,74,1.1,C.red,false)+`<path d="M58 82 V30 M54 30 h8" stroke="${C.ink}" stroke-width="3"/>`+no(58,22,.8)+B(32,.95,{mood:"angry",arms:"push"}),
        bg(2)+car(84,74,1.1,C.grn)+`<path d="M108 54 h10 M110 62 h8" stroke="${C.grey}" stroke-width="1.6" stroke-linecap="round"/>`+B(30,.95,{mood:"happy",arms:"wave"}) ],
    l:[["детали по отдельности","loose parts"],["без колёс — не выпущу","no wheels — can't leave"],["собран — поехал","assembled — off it goes"]],
    c:["Конструктор срабатывает при new и следит, чтобы объект вышел целым — не без колёс.","The constructor runs on new and makes sure the object leaves whole — wheels included."] };

  /* 41 */
  Z[B0+"Инкапсуляция — не «спрятать», а «не дать сломать»"]={
    p:[ bg(0)+atm(98,82,1)+kid(16,82,.95,C.red)+`<path d="M24 62 L38 52" stroke="${C.grey}" stroke-width="3" stroke-linecap="round"/>`+tag(98,46,"-100",6,C.red)+B(58,.9,{mood:"angry",arms:"push",flip:true}),
        bg(1)+atm(90,82,1.1,)+ok(90,30,.6)+B(40,.95,{mood:"think",arms:"reach"}),
        bg(2)+atm(90,82,1.1)+tag(90,44,"50",7,C.grn)+B(36,.95,{mood:"happy",arms:"hold",item:coin(0,0,1.3)}) ],
    l:[["в обход — не дам","no going around"],["только через кнопку","only through buttons"],["проверил — выдал","checked — paid out"]],
    c:["Мои деньги внутри снаружи не тронуть — только кнопками с проверкой. Так меня не сломать.","Nobody can poke my money directly — only buttons with checks. That's how I stay intact."] };

  /* 42 */
  Z[B0+"Наследование — «является», а не «содержит»"]={
    p:[ bg(0)+dog(86,82,1.4)+tag(80,24,"extends",8,C.grn)+ok(108,22,.6)+B(36,.95,{mood:"happy",arms:"reach"}),
        bg(1)+car(92,80,1.1,C.blue)+B(40,.95,{mood:"smile",arms:"carry",item:gear(0,0,.8)})+tag(92,40,"has",8,C.grn),
        bg(2)+gear(88,52,1.6)+wheel(76,78)+wheel(100,78)+tag(88,20,"extends",8,C.red)+B(34,.95,{mood:"dizzy",arms:"up"}) ],
    l:[["собака — животное","a dog is an animal"],["машина содержит мотор","a car has an engine"],["машина — не мотор!","a car is not an engine!"]],
    c:["extends — только если «является»: собака — животное. А мотор машина просто содержит.","Use extends only for is-a: a dog is an animal. A car just has an engine inside."] };

  /* 43 */
  const lamp=(on)=>bulb(0,-4,on,6)+`<path d="M0 2 v6" stroke="${C.ink}" stroke-width="2"/>`;
  Z[B0+"Интерфейс — контракт без исполнения"]={
    p:[ bg(0)+socket(96,50,1.2)+B(48,.95,{mood:"think",arms:"reach",item:plug(6,0)}),
        bg(1)+wall(80)+factory(104,82,.9)+`<path d="M98 66 H83" stroke="${C.ink}" stroke-width="1.4"/>`+socket(72,54,.9)+B(36,.95,{mood:"happy",arms:"hold",item:lamp(true)}),
        bg(2)+wall(80)+sun(104,22,6)+panel(102,62)+`<path d="M102 68 v6 H83" stroke="${C.ink}" stroke-width="1.4"/>`+socket(72,54,.9)+B(36,.95,{mood:"wow",arms:"hold",item:lamp(true)}) ],
    l:[["розетка — контракт","the socket is a contract"],["ток с ТЭЦ — горит","plant power — it glows"],["ток от солнца — тоже","solar power — glows too"]],
    c:["Интерфейс — как розетка: обещает, что вилка подойдёт. Откуда ток — тебе неважно.","An interface is like a socket: your plug will fit. Where the power comes from doesn't matter."] };

  /* 44 */
  const say=bubble(60,16,46,txt(0,3.5,"save(x)",8,C.blue));
  Z[B0+"Полиморфизм — одно слово, разное поведение"]={
    p:[ bg(0)+say+box(96,78,18,16,"x")+tag(96,46,"?",14,C.red)+B(36,.95,{mood:"think",arms:"point"}),
        bg(1)+say+db(96,56,1.1)+ok(110,32,.6)+B(40,.95,{mood:"happy",arms:"push",item:box(0,8,14,13,"x")}),
        bg(2)+say+cloud(88,54,1.1)+ok(110,32,.6)+B(40,.95,{mood:"wow",arms:"push",item:box(0,8,14,13,"x")}) ],
    l:[["одна команда save(x)","one command: save(x)"],["тут — в базу","here — into a database"],["там — в облако","there — into the cloud"]],
    c:["Я говорю save(x), а куда сохранится — решает сам объект, пока программа работает.","I say save(x), and the object itself decides where it goes while the program runs."] };

  /* 45 */
  Z[B0+"Композиция обычно лучше наследования"]={
    p:[ bg(0)+box(88,82,40,14,"",C.red)+box(78,68,16,12,"",C.blue)+box(98,68,16,12,"",C.grn)+box(88,56,16,12,"",C.yel)+B(36,.9,{mood:"think",arms:"reach"}),
        bg(1)+box(92,82,26,12,"",C.blue)+`<g transform="rotate(25 104 76)">${box(108,76,16,12,"",C.grn)}</g><g transform="rotate(-30 76 60)">${box(76,64,16,12,"",C.yel)}</g>`+spark(96,40,C.red)+B(36,.9,{mood:"dizzy",arms:"push"}),
        bg(2)+G(96,74,1.1,bag(C.red))+B(44,1,{mood:"happy",arms:"hold",item:G(0,4,1,bag(C.blue))}) ],
    l:[["потомки на родителе","children on a parent"],["тронул родителя — рухнуло","moved it — all fell"],["сумку легко сменить","a bag is easy to swap"]],
    c:["Наследование сшивает намертво. А деталь внутри объекта можно просто заменить другой.","Inheritance stitches things for good. A part inside an object you can simply swap."] };

  /* 46 */
  const wallbox=`<rect x="70" y="14" width="46" height="68" fill="#efe2cc" stroke="${C.wood2}" stroke-width="1.3"/>`;
  Z[SO+"Зачем принципы, если код и так работает"]={
    p:[ bg(0)+wallbox+socket(92,56,.8)+bulb(92,28,true,7)+B(38,.95,{mood:"smile",arms:"point"}),
        bg(1)+wallbox+`<path d="M78 30 l8 6 l-4 6 l10 4 M96 50 l8 -4 l2 10" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`+[0,1,2,3,4].map(i=>card(10+i*7,70+(i%2)*4,12,15,"#fff","",i*14-28)).join("")+B(56,.95,{mood:"sweat",arms:"reach"}),
        bg(2)+wallbox+`<rect x="74" y="44" width="34" height="8" fill="#fff" stroke="${C.ink}"/>`+socket(92,64,.8)+card(20,22,14,17,"#fff","")+ok(30,14,.6)+B(44,.95,{mood:"happy",arms:"reach"}) ],
    l:[["работает — и ладно?","it works — good enough?"],["правка — ломаю стену","a fix breaks the wall"],["правка — 1 файл","a fix — 1 file"]],
    c:["Код читают и правят годами. Хорошо, когда ради одной правки открываешь один файл.","Code is read and changed for years. Good code needs one file opened per change."] };

  /* 47 */
  const ic=[`<text y="3" font-size="8" font-weight="900" text-anchor="middle" fill="${C.red}">%</text>`,env(0,0,.35),db(0,1,.32)];
  const big=card(0,0,40,16,"#fff",ic.map((s,i)=>G(-12+i*12,0,1,s)).join(""));
  Z[SO+"S — одна причина для изменения"]={
    p:[ bg(0)+B(40,.95,{mood:"sweat",arms:"carry",item:big})+kid(98,82,.85,C.red)+kid(80,82,.85,C.grn),
        bg(1)+kid(14,82,.85,C.red)+kid(106,82,.85,C.grn)+kid(86,82,.8,C.blue)+rope(20,62,60,20)+rope(100,62,72,20)+G(60,22,1,big)+B(54,.9,{mood:"dizzy",arms:"up"}),
        bg(2)+[0,1,2].map(i=>card(70+i*18,30,14,14,"#fff",G(0,0,1,ic[i]))+kid(70+i*18,82,.75,[C.red,C.grn,C.blue][i])).join("")+B(26,.9,{mood:"happy",arms:"point"}) ],
    l:[["класс делает всё","one class does it all"],["три команды тянут","three teams pull at it"],["у каждой свой класс","each owns one class"]],
    c:["У класса одна причина меняться. Скидки, письма и база — три разных класса.","A class should have one reason to change. Discounts, mail, database — three classes."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 1 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const ln=(d,col,w,dash)=>`<path d="${d}" stroke="${col||C.ink}" stroke-width="${w||1.6}" fill="none" stroke-linecap="round" stroke-linejoin="round"${dash?' stroke-dasharray="3 2.5"':""}/>`;
  const rc=(x,y,w,h,f,r,op)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r==null?2:r}" fill="${f||"#fff"}" stroke="${C.ink}" stroke-width="1.2"${op?` opacity="${op}"`:""}/>`;
  const dot=(x,y,r,f,st)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${st?` stroke="${C.ink}" stroke-width="1.1"`:""}/>`;
  const mono=(x,y,s,sz,col,anc)=>`<text x="${x}" y="${y}" font-size="${sz||6.5}" font-weight="700" fill="${col||C.ink}" text-anchor="${anc||"start"}" font-family="ui-monospace,Menlo,monospace">${s}</text>`;
  /* карточка кода: центр x,y, ширина w, строки слева */
  const code=(x,y,w,lines,sz,cols)=>{ sz=sz||6; const lh=sz+3, h=lines.length*lh+7;
    return card(x,y,w,h,"#fff",lines.map((l,i)=>mono(-w/2+3.5,-h/2+4+sz+i*lh,l,sz,cols&&cols[i])).join("")); };
  const socket=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-11" y="-11" width="22" height="22" rx="5" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><circle cx="-4" r="2.2" fill="${C.ink}"/><circle cx="4" r="2.2" fill="${C.ink}"/></g>`;
  const wheel=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#3b4256"/><circle cx="${x}" cy="${y}" r="${r*.4}" fill="${C.grey}"/>`;
  const car=(x,y,s,r1,r2,col)=>{ r2=r2==null?r1:r2; const a=Math.atan2(r1-r2,34)*57.3, cy=-(r1+r2)/2-3;
    return `<g transform="translate(${x} ${y}) scale(${s||1})"><g transform="translate(0 ${cy}) rotate(${a.toFixed(1)})"><path d="M-28 4 v-10 q0 -4 4 -4 h8 l8 -9 h18 l8 9 h6 q4 0 4 4 v10 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-6 -11 l4 -6 h10 l4 6 z" fill="#dfe9ff"/></g>${wheel(-17,-r1,r1)}${wheel(17,-r2,r2)}</g>`; };
  const remote=(x,y,w,h,btn)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="6" fill="#3b4256" stroke="${C.ink}" stroke-width="1.2"/>${btn}</g>`;
  const door=(x,y,col)=>`<rect x="${x-13}" y="${y-50}" width="26" height="50" rx="2" fill="${col||C.wood}" stroke="${C.wood2}" stroke-width="1.5"/><circle cx="${x+8}" cy="${y-25}" r="2" fill="${C.yel}" stroke="${C.ink}" stroke-width=".8"/>`;
  const egg=(x,y,col)=>`<ellipse cx="${x}" cy="${y}" rx="3.4" ry="4.2" fill="${col||"#fff3df"}" stroke="${C.ink}" stroke-width="1"/>`;
  const tray=(cx,cy,cols,rows,cell,n,hi)=>{ const w=cols*cell, h=rows*cell; let s=`<rect x="${cx-w/2-2}" y="${cy-h/2-2}" width="${w+4}" height="${h+4}" rx="3" fill="#d9c7a8" stroke="${C.wood2}" stroke-width="1.3"/>`;
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){ const i=r*cols+c, ex=cx-w/2+cell/2+c*cell, ey=cy-h/2+cell/2+r*cell;
      s+=`<circle cx="${ex}" cy="${ey}" r="${cell*.38}" fill="#c4ae8a"/>`; if(i<n) s+=egg(ex,ey,i===hi?C.yel:null); } return s; };
  const plank=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="4" rx="1.5" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1"/>`;
  const coat=(x,y,col)=>`<path d="M${x} ${y} v3" stroke="${C.ink}" stroke-width="1.2"/><path d="M${x-7} ${y+9} l7 -6 l7 6 v18 h-14 z" fill="${col}" stroke="${C.ink}" stroke-width="1.1"/><path d="M${x} ${y+5} v22" stroke="${C.ink}" stroke-width=".8" opacity=".5"/>`;
  const ticket=(x,y,n,col)=>card(x,y,16,20,col||"#fff",`<circle cy="-6" r="1.6" fill="${C.ink}"/>`+txt(0,5,n,8));
  const clip=(x,y,rows)=>`<g transform="translate(${x} ${y})"><rect x="-15" y="-20" width="30" height="40" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><rect x="-6" y="-23" width="12" height="6" rx="2" fill="${C.grey}" stroke="${C.ink}"/>${rows.map((r,i)=>`<circle cx="-7" cy="${-9+i*10}" r="3.4" fill="${r}"/><path d="M-1 ${-9+i*10} h9" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`).join("")}</g>`;
  const cab=(x,y,n,col)=>`<rect x="${x-11}" y="${y-30}" width="22" height="30" rx="2" fill="${col||C.wood}" stroke="${C.wood2}" stroke-width="1.3"/><path d="M${x} ${y-28} v26" stroke="${C.wood2}"/>`+txt(x,y-34,n,8);
  const house=(x,y,col)=>`<path d="M${x-8} ${y} v-12 l8 -7 l8 7 v12 z" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.1"/><rect x="${x-2.5}" y="${y-7}" width="5" height="7" fill="${C.wood}"/>`;
  const cup=(x,y,col)=>`<path d="M${x-7} ${y-12} h14 l-2 12 h-10 z" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M${x+6} ${y-9} q5 0 4 4 q-1 3 -5 3" fill="none" stroke="${C.ink}" stroke-width="1.2"/><ellipse cx="${x}" cy="${y-11}" rx="6" ry="1.5" fill="${col||"#7a4a2a"}"/>`;
  const machine=(x,y,col)=>`<rect x="${x-17}" y="${y-50}" width="34" height="50" rx="4" fill="${col||C.grey}" stroke="${C.ink}" stroke-width="1.3"/><rect x="${x-11}" y="${y-44}" width="22" height="9" rx="2" fill="#dfe9ff" stroke="${C.ink}"/><rect x="${x-4}" y="${y-30}" width="8" height="6" fill="${C.ink}"/><rect x="${x-14}" y="${y-5}" width="28" height="3" fill="${C.ink}"/>`;
  const drill=(x,y,bit,len)=>`<g transform="translate(${x} ${y})"><rect x="-6" y="4" width="10" height="20" rx="3" fill="${C.ink}"/><rect x="-16" y="-8" width="30" height="16" rx="6" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.3"/><rect x="14" y="-5" width="7" height="10" rx="1.5" fill="${C.grey}" stroke="${C.ink}"/>${bit?`<path d="M21 0 h${len||14}" stroke="${bit}" stroke-width="3.2" stroke-linecap="round"/>`:""}</g>`;
  const apple=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="5.5" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1"/><path d="M0 -5 q1 -3 3 -4" stroke="${C.wood2}" stroke-width="1.4" fill="none"/><path d="M1 -6 q4 -3 6 0 q-3 2 -6 0" fill="${C.grn}"/></g>`;
  const pear=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M0 -9 q-3 0 -3 5 q-5 3 -4 8 q2 5 7 5 q5 0 7 -5 q1 -5 -4 -8 q0 -5 -3 -5 z" fill="#b7d65a" stroke="${C.ink}" stroke-width="1"/><path d="M0 -9 v-3" stroke="${C.wood2}" stroke-width="1.4"/></g>`;
  const crate=(x,y,w,h,inner)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" rx="2" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/><path d="M${x-w/2} ${y-h/2} h${w}" stroke="${C.wood2}"/>${inner||""}`;
  const scrib=(x,y,w,n,col)=>Array.from({length:n},(_,i)=>`<path d="M${x} ${y+i*5} q${w/6} -2 ${w/3} 0 t${w/3} 0 t${w/3*(i===n-1?.4:1)} 0" stroke="${col||C.grey}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`).join("");
  const tape=(x,y,w,rot)=>`<rect x="${x-w/2}" y="${y-4}" width="${w}" height="8" rx="1" fill="#d8d2c2" stroke="${C.ink}" stroke-width=".8" transform="rotate(${rot||0} ${x} ${y})" opacity=".95"/>`;
  const glass=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-5 -10 h10 q0 8 -5 9 q-5 -1 -5 -9 z M0 -1 v7 M-4 6 h8" fill="none" stroke="${col||C.red}" stroke-width="1.6" stroke-linecap="round"/></g>`;
  const drop=(x,y)=>`<path d="M${x} ${y-4} q3 4 0 6 q-3 -2 0 -6 z" fill="${C.blue}"/>`;
  const star=(x,y,r,col)=>{ let d=""; for(let i=0;i<10;i++){ const a=i*Math.PI/5-Math.PI/2, rr=i%2?r*.45:r; d+=(i?"L":"M")+(x+rr*Math.cos(a)).toFixed(1)+" "+(y+rr*Math.sin(a)).toFixed(1)+" "; } return `<path d="${d}Z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1"/>`; };
  const tri=(x,y,r,col)=>`<path d="M${x} ${y-r} L${x+r} ${y+r*.8} L${x-r} ${y+r*.8} Z" fill="${col}" stroke="${C.ink}" stroke-width="1.1"/>`;
  const sq=(x,y,r,col)=>`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" rx="1.5" fill="${col}" stroke="${C.ink}" stroke-width="1.1"/>`;
  const circ=(x,y,r,col)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" stroke="${C.ink}" stroke-width="1.1"/>`;
  const cardIcon=(x,y,col)=>`<rect x="${x-8}" y="${y-5.5}" width="16" height="11" rx="2" fill="${col||C.blue}" stroke="${C.ink}"/><path d="M${x-8} ${y-2} h16" stroke="${C.ink}" stroke-width="1.6"/>`;
  const wall=(x1,x2,y1,y2)=>`<rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" fill="#e3d6c2" stroke="${C.wood2}" stroke-width="1"/>`;
  const arrowD=(x,y1,y2,col)=>`<path d="M${x} ${y1} V${y2-4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x-4} ${y2-6} L${x} ${y2} L${x+4} ${y2-6}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arrowL=(x1,y,x2,col)=>`<path d="M${x1} ${y} H${x2+4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x2+6} ${y-4} L${x2} ${y} L${x2+6} ${y+4}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const smoke=(x,y)=>`<circle cx="${x}" cy="${y}" r="5" fill="${C.grey}" opacity=".8"/><circle cx="${x+6}" cy="${y-6}" r="6" fill="${C.grey}" opacity=".6"/><circle cx="${x+1}" cy="${y-13}" r="5" fill="${C.grey}" opacity=".45"/>`;

  /* ---- детали v2 ---- */
  const G=(s,inner)=>`<g transform="scale(${s})">${inner}</g>`;
  const at=(x,y,inner,s,r)=>`<g transform="translate(${x} ${y})${s?` scale(${s})`:""}${r?` rotate(${r})`:""}">${inner}</g>`;
  const plug=(s)=>`<g transform="scale(${s||1})"><path d="M-14 0 h-8" stroke="${C.ink}" stroke-width="2"/><rect x="-14" y="-6" width="12" height="12" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><path d="M-2 -3 h6 M-2 3 h6" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/></g>`;
  const umb=(col)=>`<path d="M-20 0 q20 -24 40 0 q-5 -4 -10 0 q-5 -4 -10 0 q-5 -4 -10 0 q-5 -4 -10 0 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 0 v14" stroke="${C.ink}" stroke-width="1.6"/>`;
  const dash=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${col||C.ink}" stroke-width="1.6" stroke-dasharray="4 3"/>`;
  const sticker=(inner,col)=>`<rect x="-9" y="-7" width="18" height="14" rx="3" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.1"/>${inner||""}`;
  const pencil=`<g transform="rotate(-35)"><rect x="-3" y="-14" width="6" height="22" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/><path d="M-3 8 l3 6 l3 -6 z" fill="#f6d1b0" stroke="${C.ink}" stroke-width="1"/></g>`;
  const rope=(d)=>`<path d="${d}" stroke="${C.red}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const shelf=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="4" rx="1.5" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1"/><path d="M${x1+3} ${y+4} v${82-y-4} M${x2-3} ${y+4} v${82-y-4}" stroke="${C.wood2}" stroke-width="2"/>`;
  const crack=(x,y)=>`<path d="M${x-4} ${y-6} l3 4 l-2 3 l4 4" stroke="${C.ink}" stroke-width="1" fill="none"/>`;
  const B=(x,s,o)=>{ o=o||{}; if(o.item&&o.arms==="carry") o=Object.assign({},o,{item:at(0,-4,o.item)}); else if(o.item&&o.arms==="hold") o=Object.assign({},o,{item:at(0,4,o.item)}); return bot(x,82,s,o); };
  const dark=`<rect x="1" y="1" width="118" height="88" rx="10" fill="#1d2233" opacity=".55"/>`;
  const cliff=`<rect x="56" y="1" width="58" height="88" fill="#b9a58c" stroke="${C.wood2}" stroke-width="1.3"/>`+[[64,20,C.red],[100,14,C.grn],[72,44,C.yel],[106,40,C.blue],[66,66,C.grn],[98,70,C.red],[86,30,"#c86bfa"]].map(h=>`<ellipse cx="${h[0]}" cy="${h[1]}" rx="3.4" ry="2.6" fill="${h[2]}" stroke="${C.ink}" stroke-width=".8"/>`).join("");
  const Z={};
  /* ===== SOLID ===== */
  Z["SOLID|O — расширяй, не переписывая"]={
    p:[ bg(0)+code(34,44,56,["if (cash) {…}","else if (card)","else if (qr)","else if (new)"],6,[0,0,0,C.red])+spark(14,74,C.red)+spark(60,16,C.red)+spark(68,70,C.red)+B(84,.9,{flip:true,arms:"reach",mood:"sweat"}),
        bg(1)+wall(80,116,8,74)+socket(98,40,1.3)+B(46,.95,{arms:"hold",mood:"think",item:laptop(0,10,.62)})+think(70,16,at(16,-2,plug(.55))),
        bg(2)+wall(80,116,8,74)+socket(98,52,1.2)+code(30,20,46,["if (cash) {…}"],6)+ok(56,12,.6)+laptop(18,82,.62,ok(0,-13,.45))+ln("M30 80 C46 86 52 70 64 64",C.ink,1.6)+B(60,.85,{arms:"push",mood:"happy",item:at(10,0,plug(.9))})+spark(108,24) ],
    l:[["лезу в if-else — искры","poking if-else — sparks"],["новый прибор в руках","a new device in hand"],["воткнул — старое цело","plugged in — old code safe"]],
    c:["Новую оплату я втыкаю, как прибор в розетку. Старый, рабочий код не трогаю.","I plug a new payment in like a device into a socket. The old working code stays untouched."] };

  Z["SOLID|L — потомок не должен удивлять"]={
    p:[ bg(0)+`<rect x="58" y="30" width="50" height="20" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.3"/>`+txt(83,25,"w = 5",7)+txt(114,43,"2",8)+txt(83,64,"10",12,C.grn)+B(28,.9,{arms:"point",mood:"smile"}),
        bg(1)+`<rect x="62" y="16" width="44" height="44" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.3"/>`+txt(84,12,"w = 5",7)+txt(84,72,"h: 2 → 5",7,C.red)+txt(84,43,"25",13,C.red)+B(28,.9,{arms:"up",mood:"dizzy"})+no(108,72,.7),
        bg(2)+car(80,82,.95,8,4,C.red)+B(26,.85,{arms:"push",mood:"sad",item:wheel(6,0,4)})+txt(80,26,"!",14,C.red),
        bg(3)+car(80,82,.95,8,8,C.red)+B(28,.85,{arms:"carry",mood:"happy",item:wheel(0,4,9)})+ok(104,22,.8) ],
    l:[["прямоугольник: 5×2 = 10","rectangle: 5×2 = 10"],["квадрат: вышло 25 ?!","square: got 25 ?!"],["запаска меньше — перекос","small spare — car tilts"],["тот же размер — едем","same size — off we go"]],
    c:["Потомок обязан вставать на место родителя без сюрпризов, как запаска того же размера.","A child must fit where its parent stood, no surprises — like a spare of the same size."] };

  Z["SOLID|I и D — не навязывай лишнее и завись от абстракций"]={
    p:[ bg(0)+remote(36,44,30,62,Array.from({length:40},(_,i)=>`<circle cx="${-10+(i%5)*5}" cy="${-25+Math.floor(i/5)*6.8}" r="1.8" fill="${["#ef5b5b","#ffc93c","#4cb963","#5aa9e6","#b8bfcc"][i%5]}"/>`).join(""))+txt(36,86,"40",8)+B(86,.9,{flip:true,arms:"reach",mood:"dizzy"}),
        bg(1)+laptop(94,52,.9,ok(0,-13,.6))+B(44,.95,{arms:"hold",mood:"happy",item:remote(0,-2,15,26,`<circle cy="-7" r="3" fill="${C.red}"/><circle cy="0" r="3" fill="${C.grn}"/><circle cy="7" r="3" fill="${C.blue}"/>`)})+txt(18,30,"3",12,C.grn),
        bg(2)+db(100,58,.85,C.blue)+ln("M64 62 H86",C.ink,4)+dot(86,62,3.4,C.grey,1)+dot(66,62,3.4,C.grey,1)+B(40,.9,{arms:"reach",mood:"sweat",item:gear(0,0,.6)})+no(98,18,.8),
        bg(3)+wall(76,82,8,74)+socket(88,40,1)+db(108,24,.5,C.blue)+db(108,62,.5,C.grn)+ln("M96 38 C100 34 100 30 101 28",C.ink,1.2)+ln("M96 42 C100 50 100 56 101 60",C.grey,1.2,1)+B(36,.9,{arms:"push",mood:"happy",item:at(14,-18,plug(.8))}) ],
    l:[["40 кнопок — голова кругом","40 buttons — dizzy"],["3 нужные кнопки","only 3 buttons you need"],["припаян к базе — не снять","soldered — stuck for good"],["через розетку — любую","via a socket — any one"]],
    c:["Дай мне пульт без лишних кнопок и розетку вместо пайки. Что воткнуть — подставит Spring.","Give me a remote with no extra buttons, and a socket, not solder. Spring plugs in the rest."] };

  /* ===== Паттерны ===== */
  Z["Паттерны|Паттерн — имя для решения, которое ты и так придумаешь"]={
    p:[ bg(0)+`<rect x="22" y="6" width="94" height="28" rx="9" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+scrib(28,13,82,3)+`<path d="M34 34 l-2 6 l7 -6" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+B(28,.85,{arms:"point",mood:"sweat"})+kid(96,82,.9,C.blue,"sad")+txt(110,48,"?",12,C.red),
        bg(1)+crate(90,82,36,20)+star(76,58,12,C.yel)+B(42,.9,{arms:"push",mood:"angry"})+no(108,18,.8),
        bg(2)+bubble(42,16,26,star(0,0,6,C.yel))+B(30,.9,{arms:"wave",mood:"happy"})+kid(94,82,.9,C.blue)+bulb(94,22,true,7) ],
    l:[["объяснять — долго","explaining takes ages"],["пихать везде — вред","forcing it in — harmful"],["одно слово — все поняли","one word — all get it"]],
    c:["Паттерн — просто имя для приёма. Сказал одно слово, и команда поняла замысел.","A pattern is just a name for a trick. Say one word and the team gets the idea."] };

  Z["Паттерны|Фабрика — создание спрятано"]={
    p:[ bg(0)+code(34,18,56,["new Coffee()"],6,[C.red])+code(30,40,52,["new Coffee()"],6,[C.red])+code(36,62,56,["new Coffee()"],6,[C.red])+txt(34,84,"×40",9,C.red)+B(90,.9,{arms:"carry",mood:"dizzy",item:`<g transform="translate(0 6)">${gear(-7,-4,.45)}${cup(7,6)}</g>`}),
        bg(1)+machine(84,78,C.grey)+bubble(30,14,22,cup(0,6))+B(38,.9,{arms:"push",mood:"think"})+cup(84,76),
        bg(2)+machine(90,78,C.grn)+spark(108,18)+B(40,.95,{arms:"hold",mood:"happy",item:at(0,4,cup(0,6),1.2)})+ok(16,24,.8) ],
    l:[["new по всему коду","new all over the code"],["жму «кофе» — и всё","press coffee — that's it"],["машину сменили — ок","new machine — still fine"]],
    c:["Я не собираю кофе сам, а прошу «кофе». Сменят машину — правка в одном месте.","I don't build the coffee, I ask for one. Swap the machine and only one spot changes."] };

  Z["Паттерны|Стратегия — поведение как параметр"]={
    p:[ bg(0)+code(38,40,66,["if (type == A) …","else if (B) …","else if (C) …","else if (D) …"],6,[0,0,0,C.red])+txt(38,74,"+1",11,C.red)+B(92,.85,{flip:true,arms:"reach",mood:"sweat"}),
        bg(1)+B(36,.95,{arms:"hold",mood:"think",item:at(-2,0,drill(0,0,C.grey,10),.7)})+[[C.red,72],[C.blue,88],[C.grn,104]].map(b=>`<path d="M${b[1]} 70 v-14" stroke="${b[0]}" stroke-width="3.6" stroke-linecap="round"/>`).join(""),
        bg(2)+wall(96,116,8,74)+`<circle cx="98" cy="58" r="3" fill="${C.ink}"/>`+B(38,.95,{arms:"reach",mood:"happy",item:at(8,4,drill(0,0,C.yel,16),.75)})+txt(80,30,"+",14,C.grn)+ok(16,22,.8) ],
    l:[["каждый способ — новый if","each way — one more if"],["дрель одна, насадок много","one drill, many bits"],["новая насадка — сверлю","new bit — drilling on"]],
    c:["Способ расчёта я получаю как насадку. Новый способ — новый класс, дрель не трогаю.","I get the calculation like a drill bit. New way, new class — the drill stays the same."] };

  Z["Паттерны|Декоратор — обёртка, добавляющая поведение"]={
    p:[ bg(0)+at(34,74,phone(0,0,.9)+crack(2,-2),1,-70)+B(84,.9,{flip:true,arms:"reach",mood:"sad"}),
        bg(1)+B(44,1,{arms:"hold",mood:"think",item:at(0,0,`<rect x="-11" y="-17" width="22" height="34" rx="5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/>`+phone(0,0,.85),.7)})+spark(86,30)+ok(94,56,.8),
        bg(2)+B(44,1.05,{arms:"hold",mood:"happy",item:at(0,0,`<rect x="-15" y="-22" width="30" height="42" rx="7" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.2"/>`+`<rect x="-11" y="-17" width="22" height="34" rx="5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/>`+phone(0,0,.85),.7)})+txt(88,30,"TX",11,C.ink)+txt(88,48,"log",9,C.blue)+spark(104,18) ],
    l:[["без защиты — трещина","no case — cracked"],["в чехле — тот же телефон","in a case — same phone"],["обёртка на обёртке","a wrap around a wrap"]],
    c:["Обёртка выглядит как сам объект, но добавляет своё. Так Spring вешает транзакции.","A wrapper looks like the object but adds something. That's how Spring adds transactions."] };

  Z["Паттерны|Синглтон — самый популярный и самый проблемный"]={
    p:[ bg(0)+door(96,74)+txt(96,16,"1",12,C.ink)+B(40,.95,{arms:"hold",mood:"smile",item:key(0,0,.9)})+spark(64,24),
        bg(1)+door(106,74)+lock(106,48,.55)+kid(16,82,.7,C.red,"sad")+kid(36,82,.7,C.grn,"sad")+B(70,.85,{mood:"sweat",arms:"down"})+clock(44,18,.9,4),
        bg(2)+door(104,74)+kid(16,82,.7,C.red,"wow")+B(56,.9,{arms:"up",mood:"dizzy"})+think(82,20,key(13,-2,.6)+txt(24,3,"?",10,C.red)),
        bg(3)+card(88,40,40,30,"#fff",txt(0,-2,"@Bean",8,C.grn)+txt(0,10,"×1",9,C.ink))+B(36,.9,{arms:"point",mood:"happy"})+ok(108,66,.7) ],
    l:[["один ключ на этаж","one key for the floor"],["все трогают одно сразу","everyone touches it at once"],["у кого ключ — не помнят","who has it — no one knows"],["в Spring бины уже одни","Spring beans: one already"]],
    c:["Один объект на всех — это глобальное состояние. В Spring бины и так одиночки, свой не пиши.","One object for everyone is global state. Spring beans are singletons already, don't write one."] };

  /* ===== Коллекции ===== */
  Z["Java: коллекции|Массив — жёсткая полка"]={
    p:[ bg(0)+tray(78,34,5,2,12,10,7)+txt(78,62,"[7]",11,C.blue)+B(28,.95,{arms:"point",mood:"happy"}),
        bg(1)+tray(82,44,5,2,12,10)+no(82,18,.8)+B(32,.95,{arms:"carry",mood:"sweat",item:at(0,0,egg(0,0,C.yel),2.2)})+txt(58,66,"11",10,C.red),
        bg(2)+tray(30,16,5,2,8,0)+tray(84,48,6,2,10,8)+curve(42,22,74,38,C.blue,true)+B(34,.85,{arms:"hold",mood:"think",item:at(0,0,egg(0,0,null),1.8)})+txt(104,74,"+1",10,C.grn) ],
    l:[["по номеру — мгновенно","by index — instantly"],["11-му места нет","no room for the 11th"],["новый ящик, перекладка","new tray and a move"]],
    c:["Массив — ящик на точное число мест. Хочешь больше — бери новый и перекладывай всё.","An array is a tray with fixed slots. Want more? Get a new one and move everything over."] };

  Z["Java: коллекции|List — полка, которая растёт сама"]={
    p:[ bg(0)+shelf(56,116,46)+[0,1,2,3].map(i=>box(64+i*14,46,12,12,String(i+1))).join("")+B(28,.9,{arms:"carry",mood:"sweat",item:box(0,7,16,14,"5",C.yel)})+txt(58,22,"?",12,C.red),
        bg(1)+plank(64,112,20)+[0,1,2,3].map(i=>box(70+i*12,20,10,10,null,"#e6d3b5")).join("")+shelf(54,116,58)+[0,1,2,3].map(i=>box(62+i*12,58,10,10)).join("")+B(28,.85,{arms:"carry",mood:"think",item:box(0,6,13,12)})+clock(46,16,.75,4),
        bg(2)+plank(4,116,14)+[["1",14],["2",28],["3",72],["4",86],["5",100]].map(b=>box(b[1],14,11,10,b[0])).join("")+arrowR(66,26,112,C.red)+B(50,.8,{arms:"carry",mood:"wow",item:box(0,7,14,12,"+",C.yel)}) ],
    l:[["полка полна","the shelf is full"],["сама переезжает больше","moves to a bigger one"],["вставка в середину — сдвиг","insert mid — tail shifts"]],
    c:["ArrayList сам переезжает на полку побольше. Удобно, но переезд и сдвиги стоят времени.","ArrayList moves itself to a bigger shelf. Handy, but moving and shifting take time."] };

  Z["Java: коллекции|Map — поиск по ключу, а не по номеру"]={
    p:[ bg(0)+ln("M4 10 H116",C.ink,2)+[C.red,C.blue,C.grn,C.yel,"#c86bfa",C.grey].map((c,i)=>coat(12+i*19,10,c)).join("")+B(44,.8,{arms:"reach",mood:"dizzy",item:mag(0,0,.8)})+clock(100,66,.8,5),
        bg(1)+`<rect x="44" y="54" width="74" height="7" rx="2" fill="${C.wood}" stroke="${C.wood2}"/>`+kid(20,82,.9,C.blue)+ticket(58,44,"17",C.yel)+B(92,.9,{flip:true,arms:"reach",mood:"think"}),
        bg(2)+ln("M6 14 H74",C.ink,2)+[["16",C.grn,20],["18",C.yel,64]].map(c=>coat(c[2],14,c[1])+txt(c[2],52,c[0],8)).join("")+`<path d="M42 14 v4" stroke="${C.ink}" stroke-width="1.2"/>`+txt(42,52,"17",8,C.red)+B(92,.9,{arms:"carry",mood:"happy",item:coat(0,-16,C.red)}) ],
    l:[["искать глазами — долго","searching by eye — slow"],["номерок 17","ticket 17"],["сразу с крючка 17","straight off hook 17"]],
    c:["Я не перебираю все вещи. Из ключа считаю, где лежит, и иду прямо туда.","I don't go through everything. I work out the spot from the key and go straight there."] };

  Z["Java: коллекции|Set — коллекция без повторов"]={
    p:[ bg(0)+B(36,.95,{arms:"hold",mood:"smile",item:at(0,0,clip(0,0,[C.red,C.blue,C.grn]),.65)})+kid(94,82,.85,C.yel)+txt(94,26,"+",14,C.grn),
        bg(1)+B(36,.95,{arms:"hold",mood:"think",item:at(0,0,clip(0,0,[C.red,C.blue,C.grn]),.65)})+kid(94,82,.85,C.red,"sad")+no(94,22,.9)+txt(66,40,"×2",10,C.red),
        bg(2)+clip(84,50,[C.red,C.blue,C.grn,C.yel])+B(38,.95,{arms:"reach",mood:"happy",item:mag(14,-4,.9)})+ok(104,18,.8) ],
    l:[["новый гость — вписал","new guest — added"],["второй раз — нельзя","twice — not allowed"],["есть ли? — сразу ответ","is it in? — instant answer"]],
    c:["В Set каждый записан один раз. Спроси «есть ли такой?» — HashSet ответит сразу.","In a Set everyone is listed once. Ask \"is this one here?\" and a HashSet answers at once."] };

  Z["Java: коллекции|Как выбрать: три вопроса"]={
    p:[ bg(0)+[["List",56],["Map",80],["Set",104]].map(c=>crate(c[1],82,20,16)+txt(c[1],58,c[0],7,C.blue)).join("")+B(24,.9,{arms:"point",mood:"think"})+txt(86,24,"?",16,C.red),
        bg(1)+txt(70,14,"List",9,C.blue)+[C.red,C.grn,C.yel].map((c,i)=>kid(56+i*22,82,.75,c)+txt(56+i*22,40,String(i),9)).join("")+B(22,.9,{arms:"point",mood:"smile"}),
        bg(2)+txt(60,14,"Map",9,C.blue)+ln("M78 20 H116",C.ink,2)+coat(98,20,C.red)+txt(98,56,"17",8,C.red)+B(36,.9,{arms:"reach",mood:"smile",item:ticket(10,0,"17",C.yel)}),
        bg(3)+txt(60,14,"Set",9,C.blue)+kid(96,82,.85,C.blue)+txt(96,26,"?",12)+B(38,.95,{arms:"hold",mood:"happy",item:at(0,0,clip(0,0,[C.red,C.blue]),.65)})+ok(66,26,.8) ],
    l:[["сначала — какая задача?","first — what's the job?"],["порядок, номер — List","order, index — List"],["поиск по ключу — Map","lookup by key — Map"],["было ли уже — Set","seen it yet? — Set"]],
    c:["Сначала пойми задачу: полка по номерам, гардероб или список гостей. Потом коллекция.","First get the task: numbered shelf, coat check or guest list. Then pick a collection."] };

  Z["Java: коллекции|Почему equals и hashCode всегда идут парой"]={
    p:[ bg(0)+cab(60,76,"1")+cab(82,76,"2",C.yel)+cab(104,76,"3")+B(30,.9,{arms:"carry",mood:"smile",item:card(0,0,16,14,"#fff",txt(0,4,"A",9,C.red))})+curve(42,20,82,38,C.blue,true),
        bg(1)+cab(16,76,"1")+cab(40,76,"2",C.yel)+cab(64,76,"3")+B(96,.9,{flip:true,arms:"reach",mood:"sad"})+mag(70,58,.7)+txt(64,30,"?",12,C.red),
        bg(2)+cab(84,76,"2",C.yel)+card(84,58,14,12,"#fff",txt(0,4,"A",8,C.red))+B(36,.95,{arms:"hold",mood:"happy",item:card(0,0,16,14,"#fff",txt(0,4,"A",9,C.red))})+txt(62,62,"=",12,C.grn)+ok(108,22,.8) ],
    l:[["hash → шкаф 2","hash → cabinet 2"],["ищу в шкафу 3 — пусто","cabinet 3 — empty"],["шкаф тот же, equals — да","same cabinet, equals — yes"]],
    c:["Я сначала по hashCode выбираю шкаф, потом в нём сверяю equals. Сломай одно — потеряю вещь.","I pick the cabinet by hashCode, then check equals inside. Break one and the thing is lost."] };

  /* ===== Сложность ===== */
  Z["Сложность|Считают не секунды, а рост"]={
    p:[ bg(0)+plank(56,112,40)+[0,1,2,3].map(i=>box(64+i*13,40,11,11)).join("")+txt(84,58,"n = 4",9)+B(30,.9,{legs:"run",arms:"reach",mood:"happy"})+clock(26,14,.7,2),
        bg(1)+plank(4,116,26)+Array.from({length:8},(_,i)=>box(11+i*14,26,12,12)).join("")+B(60,.9,{legs:"run",arms:"up",mood:"sweat"})+txt(20,50,"×2",10,C.grn)+txt(100,50,"×4",10,C.red),
        bg(2)+ln("M50 72 H116 M50 72 V10",C.ink,1.4)+ln("M50 64 H112",C.grn,2.2)+ln("M50 72 L112 36",C.blue,2.2)+ln("M50 72 Q90 70 100 12",C.red,2.2)+txt(102,60,"1",7,C.grn)+txt(108,32,"n",8,C.blue)+txt(90,14,"n²",8,C.red)+B(22,.9,{arms:"point",mood:"wow"}) ],
    l:[["маленькая полка — быстро","small shelf — fast"],["вдвое длиннее: ×2 и ×4","twice as long: ×2 vs ×4"],["смотрю на рост","I watch the growth"]],
    c:["Секунды зависят от машины. Я смотрю, что будет, если данных станет вдвое больше.","Seconds depend on the machine. I look at what happens when the data doubles."] };

  Z["Сложность|Почему квадрат убивает"]={
    p:[ bg(0)+[0,1,2,3,4].map(i=>ln(`M46 52 L94 ${16+i*13}`,C.grn,1.2)+dot(100,16+i*13,5,C.yel,1)).join("")+B(28,.9,{arms:"wave",mood:"happy"})+txt(112,86,"5",8),
        bg(1)+(()=>{ const P=[0,1,2,3,4].map(i=>[84+24*Math.sin(i*1.2566),42-24*Math.cos(i*1.2566)]); let s=""; for(let a=0;a<5;a++)for(let b=a+1;b<5;b++) s+=ln(`M${P[a][0].toFixed(1)} ${P[a][1].toFixed(1)} L${P[b][0].toFixed(1)} ${P[b][1].toFixed(1)}`,C.red,1.1); return s+P.map(p=>dot(p[0].toFixed(1),p[1].toFixed(1),5,C.yel,1)).join(""); })()+B(24,.9,{arms:"up",mood:"dizzy"})+txt(112,86,"10",8),
        bg(2)+txt(80,18,"10³ → 10⁶",9,C.grn)+txt(80,34,"10⁶ → 10¹²",9,C.red)+clock(66,58,.8,10)+clock(90,58,.8,2)+clock(108,40,.6,6)+B(30,.9,{legs:"sit",mood:"sleep"}) ],
    l:[["привет каждому — n","hi to each — n"],["каждый с каждым — n²","everyone meets all — n²"],["миллион — жду часами","a million — I wait hours"]],
    c:["Каждый с каждым — это n². На десятке незаметно, на миллионе программа просто висит.","Everyone with everyone is n². Fine for ten, but with a million the program just hangs."] };

  Z["Сложность|Вложенный цикл — не всегда квадрат"]={
    p:[ bg(0)+[0,1,2,3,4].map(i=>house(16+i*22,30,["#fff",C.yel,"#fff",C.yel,"#fff"][i])).join("")+arrowR(8,36,112,C.blue)+B(54,.85,{legs:"run",arms:"reach",mood:"smile"})+txt(108,56,"n",12,C.blue),
        bg(1)+`<path d="M10 74 V30 L60 8 L110 30 V74 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+cab(76,74,"1")+cab(100,74,"2")+B(50,.8,{arms:"reach",mood:"think"})+txt(60,24,"×2",10,C.grn),
        bg(2)+txt(82,22,"100 × 100",9,C.red)+ln("M60 19 H104",C.red,2)+card(82,48,50,18,"#fff",txt(0,4,"100 × 2",9,C.grn))+txt(82,72,"= 200",9,C.grn)+B(28,.95,{arms:"point",mood:"happy"}) ],
    l:[["обойти n домов","walk past n houses"],["в каждом — 2 шкафа","in each — 2 cupboards"],["это 2n, а не n²","that's 2n, not n²"]],
    c:["Я считаю не циклы, а сколько раз работает самое внутреннее. Два шкафа — это 2n.","I count how often the innermost part runs, not the loops. Two cupboards means 2n."] };

  Z["Сложность|Память тоже считается"]={
    p:[ bg(0)+B(28,.9,{arms:"point",mood:"sweat"})+bubble(40,14,18,txt(0,4,"?",10,C.blue))+kid(94,82,.85,C.grn)+bubble(92,16,30,txt(0,4,"5550",8))+txt(62,40,"×3",11,C.red),
        bg(1)+B(44,1,{arms:"hold",mood:"think",item:card(0,-2,24,28,"#fff",txt(0,-3,"5550",7)+ln("M-7 5 h14 M-7 9 h10",C.grey,1.2))})+at(76,44,pencil)+spark(96,20),
        bg(2)+ln("M84 22 V72 M70 72 h28 M62 26 H106",C.ink,2)+ln("M62 26 l-8 16 h16 z M106 26 l-8 16 h16 z",C.ink,1.2)+clock(62,36,.6,3)+card(106,36,12,12,C.yel,ln("M-3 -2 h6 M-3 2 h5",C.ink,1))+B(28,.95,{arms:"hold",mood:"happy",item:card(0,-6,16,20,C.yel,ln("M-6 -4 h12 M-6 1 h12 M-6 6 h8",C.ink,1))}) ],
    l:[["каждый раз спрашиваю","asking every time"],["записал в блокнот","wrote it in a notebook"],["скорость за память","speed for memory"]],
    c:["Записал — быстрее, но блокнот занимает место и может устареть. Бесплатно не бывает.","Writing it down is faster, but the notebook takes room and can go stale. Nothing is free."] };
  /* ===== Исключения ===== */
  Z["Java: исключения|Исключение — это не ошибка программиста, а сообщение"]={
    p:[ bg(0)+door(98,74)+lock(98,46,.6)+B(52,.9,{arms:"carry",mood:"sad",item:box(0,8,22,16,null)})+no(20,22,.8),
        bg(1)+box(84,82,22,16,null)+B(44,1,{arms:"hold",mood:"think",item:phone(0,-4,.7)})+bubble(72,18,22,txt(0,5,"!",12,C.red))+txt(18,30,"throw",7,C.red),
        bg(2)+B(28,.85,{arms:"reach",mood:"happy",item:box(4,7,16,13,null)})+B(94,.85,{flip:true,arms:"reach",mood:"smile",hat:"cap",glasses:true})+txt(28,14,"throw",7,C.red)+arrowR(44,12,74,C.red)+txt(94,14,"catch",7,C.grn) ],
    l:[["доставить не выходит","can't deliver it"],["не бросаю — звоню","don't dump it — I call"],["throw → тому, кто знает","throw → to who knows"]],
    c:["Не смог — не молчу и не вру «-1». Бросаю исключение, и решает тот, кто умеет.","Can't do it? I don't stay quiet or fake a -1. I throw, and someone who knows decides."] };

  Z["Java: исключения|Checked и unchecked — два разных разговора"]={
    p:[ bg(0)+B(40,1,{arms:"hold",mood:"sweat",item:phone(0,-4,.75,no(0,-1,.5))})+txt(88,30,"IOException",7,C.red)+`<path d="M80 50 v8 M86 46 v12 M92 42 v16 M98 38 v20" stroke="${C.grey}" stroke-width="3" stroke-linecap="round"/>`,
        bg(1)+B(32,.9,{arms:"carry",mood:"think",item:at(0,8,umb(C.blue))})+txt(32,10,"catch",7,C.blue)+B(92,.85,{flip:true,arms:"reach",glasses:true,hat:"crown",mood:"angry"})+txt(62,40,"!",14,C.red),
        bg(2)+laptop(92,60,.9)+`<path d="M92 62 C92 76 74 74 70 70" stroke="${C.ink}" stroke-width="1.6" fill="none"/>`+at(66,70,plug(.8),1,180)+txt(92,26,"NPE",9,C.red)+B(32,.9,{arms:"up",mood:"wow"}),
        bg(3)+wall(92,116,8,74)+socket(104,52,1.1)+laptop(18,82,.6,ok(0,-13,.45))+ln("M28 80 C46 86 54 70 60 64",C.ink,1.6)+B(56,.85,{arms:"push",mood:"happy",item:at(10,0,plug(.9))}) ],
    l:[["связь может пропасть","the line may drop"],["компилятор: обработай!","compiler: handle it!"],["вилку забыл — мой баг","forgot the plug — my bug"],["не ловлю — чиню","don't catch — fix it"]],
    c:["Checked — норма жизни, компилятор заставит подумать. Unchecked — мой баг, его чинят.","Checked is normal life, the compiler makes me plan. Unchecked is my bug — fix it."] };

  Z["Java: исключения|finally и try-with-resources"]={
    p:[ bg(0)+bulb(96,18,true,8)+`<rect x="58" y="62" width="58" height="5" rx="2" fill="${C.wood}"/><path d="M64 67 v15 M110 67 v15" stroke="${C.wood2}" stroke-width="3"/>`+laptop(86,62,.8)+B(40,.9,{legs:"sit",arms:"reach",mood:"smile"}),
        bg(1)+bulb(76,16,false,8)+sw(28,58,false,1)+door(104,74)+B(48,.9,{flip:true,legs:"run",arms:"reach",mood:"sweat"})+txt(28,30,"finally",7,C.blue),
        bg(2)+dash(4,4,112,72,C.blue)+txt(26,16,"try ( )",8,C.blue)+bulb(96,22,false,8)+spark(110,36,C.grn)+B(46,.95,{arms:"wave",mood:"happy"})+ok(96,58,.8) ],
    l:[["работаю — свет горит","working — light on"],["бегу — но гашу","running — still switch off"],["try ( ) гасит сам","try ( ) switches it off"]],
    c:["Что бы ни случилось, ресурс надо закрыть. try-with-resources сделает это сам.","Whatever happens, the resource must be closed. try-with-resources does it for me."] };

  Z["Java: исключения|Проглотить исключение — худшее, что можно сделать"]={
    p:[ bg(0)+`<rect x="58" y="26" width="56" height="34" rx="6" fill="#3b4256" stroke="${C.ink}" stroke-width="1.2"/>`+dot(76,43,7,"#ff9d2e")+txt(76,47,"!",10,"#fff")+dot(98,43,7,"#5f6884")+B(28,.9,{arms:"point",mood:"wow"}),
        bg(1)+`<rect x="58" y="26" width="56" height="34" rx="6" fill="#3b4256" stroke="${C.ink}" stroke-width="1.2"/>`+dot(98,43,7,"#5f6884")+tape(76,43,18,-20)+txt(86,74,"catch { }",7,C.ink)+B(42,.9,{arms:"reach",mood:"smile"}),
        bg(2)+car(80,82,.95,8,8,C.red)+smoke(96,36)+B(30,.9,{arms:"up",mood:"dizzy"})+txt(54,22,"?",14,C.red),
        bg(3)+`<rect x="58" y="22" width="56" height="34" rx="6" fill="#3b4256" stroke="${C.ink}" stroke-width="1.2"/>`+dot(76,39,7,"#ff9d2e")+txt(76,43,"!",10,"#fff")+card(88,70,44,14,"#fff",txt(0,3,"log.error(e)",6,C.ink))+B(30,.9,{arms:"hold",mood:"happy",item:at(0,0,tape(0,0,16,10))}) ],
    l:[["лампа: что-то не так","warning light is on"],["заклеил — едем дальше","taped over — driving on"],["встали — а почему?","stopped — but why?"],["обработай или упади","handle it or fail loud"]],
    c:["Пустой catch — изолента на лампочке. Поломка никуда не делась, просто её не видно.","An empty catch is tape over the warning light. The fault is still there, you just can't see it."] };

  /* ===== Современная Java ===== */
  Z["Java: современное|Дженерики — типы под контролем компилятора"]={
    p:[ bg(0)+crate(90,82,34,24)+txt(76,52,"&lt;",10)+apple(90,48,.9)+txt(104,52,"&gt;",10)+B(40,.95,{arms:"reach",mood:"smile",item:apple(4,0,1.4)}),
        bg(1)+crate(90,82,34,24)+txt(76,52,"&lt;",10)+apple(90,48,.9)+txt(104,52,"&gt;",10)+B(40,.95,{arms:"reach",mood:"wow",item:pear(4,0,1.2)})+no(78,20,.9)+txt(102,22,"javac",7,C.red),
        bg(2)+crate(92,82,34,24,apple(84,72,.8)+apple(98,72,.8))+txt(96,38,"(Apple)",7,C.grey)+ln("M78 36 H114",C.red,1.6)+B(42,.95,{arms:"hold",mood:"happy",item:apple(0,-2,1.5)})+ok(16,22,.8) ],
    l:[["ящик: только яблоки","crate: apples only"],["груша — стоп при сборке","a pear — stopped at build"],["достаю без проверки","take one — no casting"]],
    c:["Я пишу на ящике тип, и компилятор не даст положить грушу. Ошибка ловится до прода.","I write the type on the crate and the compiler won't let a pear in. Caught before prod."] };

  Z["Java: современное|Лямбда — функция как значение"]={
    p:[ bg(0)+B(50,.9,{arms:"carry",mood:"dizzy",item:`<g transform="translate(0 4)">${[0,1,2,3].map(i=>`<rect x="-16" y="${-6-i*4}" width="32" height="12" rx="1.5" fill="#fff" stroke="${C.ink}" stroke-width="1"/>`).join("")}</g>`})+code(92,52,38,["class","Helper","{ … 30 }"],5.5)+txt(16,30,"1",12,C.red),
        bg(1)+B(30,1,{arms:"reach",mood:"smile",item:card(14,-8,34,14,"#fff",mono(-14,2.5,"x -> x*2",5.5,C.blue))})+spark(84,26)+spark(96,46,C.blue),
        bg(2)+machine(96,78,C.grey)+box(96,76,12,10,"4",C.yel)+B(30,.9,{arms:"push",mood:"happy",item:card(18,-8,30,12,"#fff",mono(-13,2.5,"x -> x*2",5,C.blue))})+txt(72,20,"2",9)+arrowR(78,18,90,C.blue) ],
    l:[["класс ради одного дела","a class for one job"],["просто сказать, что делать","just say what to do"],["передал код — работает","hand over code — it runs"]],
    c:["Лямбда — это сам кусок кода, который можно передать. На этом держатся стримы.","A lambda is a piece of code you can pass around. Streams are built on it."] };

  Z["Java: современное|Stream — описываешь ЧТО, а не КАК"]={
    p:[ bg(0)+apple(30,16,1)+pear(48,10,1)+apple(70,14,1,C.grn)+txt(96,26,"i++",9,C.red)+txt(96,40,"i < n",8,C.red)+B(56,.9,{arms:"up",mood:"dizzy"}),
        bg(1)+`<rect x="54" y="58" width="62" height="5" rx="2" fill="${C.grey}" stroke="${C.ink}"/>`+apple(64,52,1)+apple(84,52,1)+apple(104,52,1)+apple(96,74,.9,C.grn)+txt(84,22,".filter",8,C.blue)+B(30,.9,{arms:"point",mood:"think"}),
        bg(2)+drop(64,22)+drop(74,16)+drop(56,30)+txt(94,22,".map",8,C.blue)+B(46,1,{arms:"hold",mood:"smile",item:apple(0,-4,1.5)})+drop(70,58),
        bg(3)+txt(86,22,".collect",8,C.blue)+B(46,1,{arms:"hold",mood:"happy",item:crate(0,10,26,14,apple(-6,-10,.8)+apple(6,-10,.8))})+ok(92,54,.8) ],
    l:[["счётчики, индексы — ой","counters, indexes — ouch"],["filter: только спелые","filter: ripe only"],["map: помыть","map: wash them"],["collect: в коробку","collect: into a box"]],
    c:["Говорю ЧТО: отбери, помой, сложи — без счётчиков. Но цикла стрим не всегда быстрее.","I say WHAT: pick, wash, pack — no counters. A stream isn't always faster than a loop."] };

  Z["Java: современное|Optional — честное «значения может не быть»"]={
    p:[ bg(0)+B(46,.9,{legs:"run",arms:"hold",mood:"dizzy",item:env(0,-2,.9)})+txt(86,40,"null",10,C.red)+txt(98,62,"NPE",9,C.red)+spark(104,24,C.red),
        bg(1)+B(44,1,{arms:"hold",mood:"think",item:env(0,-2,1)})+card(92,34,34,16,"#fff",txt(0,3,"Optional",6,C.blue))+txt(92,58,"?",14,C.blue),
        bg(2)+B(30,.95,{arms:"hold",mood:"happy",item:env(0,-2,.9)})+card(78,40,22,22,"#fff",apple(0,0,1))+card(104,40,22,22,"#fff",txt(0,3,"∅",10,C.grey))+ok(78,64,.6)+ok(104,64,.6) ],
    l:[["рванул — а там null","ripped it — null inside"],["на конверте: может пусто","note: may be empty"],["готов к обоим случаям","ready for both cases"]],
    c:["Optional честно говорит «может быть пусто». Я открываю осторожно, и NPE не случится.","Optional honestly says \"may be empty\". I open it carefully, and no NPE surprises me."] };

  Z["Java: современное|Record — класс, который только хранит данные"]={
    p:[ bg(0)+B(36,.95,{arms:"hold",mood:"sweat",item:`<rect x="-12" y="-14" width="24" height="30" rx="2" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>`+scrib(-9,-10,18,5)})+txt(88,40,"×30",12,C.red),
        bg(1)+B(26,1,{arms:"reach",mood:"happy",item:card(20,-10,50,14,"#fff",mono(-22,2.5,"record P(x, y)",5,C.blue))})+spark(84,22)+spark(100,42,C.grn)+txt(92,66,"1",13,C.grn),
        bg(2)+card(60,22,46,16,"#fff",mono(-20,2.5,"record P(x, y)",5,C.blue))+lock(88,22,.55)+B(26,.85,{arms:"reach",mood:"happy",glasses:true})+B(94,.85,{flip:true,arms:"reach",mood:"happy"}) ],
    l:[["30 строк руками","30 lines by hand"],["одна строка — всё само","one line — rest is free"],["заперт — делим смело","locked — safe to share"]],
    c:["Одна строка — и поля, конструктор, equals уже есть. Изменить нельзя, делить безопасно.","One line and the fields, constructor and equals exist. It can't change, so sharing is safe."] };

  /* ===== Java 17 → 21 ===== */
  Z["Java 17 → 21|var — вывод типа, а не динамика"]={
    p:[ bg(0)+code(70,16,96,["var a = new Apple();"],5.5)+B(40,1,{arms:"hold",mood:"happy",item:crate(0,8,26,14,apple(-6,-8,.8)+apple(6,-8,.8))})+ok(96,50,.8),
        bg(1)+code(70,16,90,["var x = load();"],5.5)+B(40,1,{arms:"hold",mood:"think",item:box(0,8,24,18,"?")})+txt(92,54,"?",16,C.red),
        bg(2)+box(88,80,30,24,null)+txt(88,48,"String",7,C.blue)+B(40,.95,{arms:"reach",mood:"wow",item:box(4,6,12,12,"5",C.yel)})+no(108,22,.8) ],
    l:[["тип виден справа — ок","type on the right — ok"],["закрытая коробка — ?","a closed box — ?"],["тип уже не поменять","the type stays fixed"]],
    c:["var — не динамика: тип я узнаю при сборке и навсегда. Только не прячь им смысл.","var isn't dynamic: I fix the type at build time, for good. Just don't hide meaning with it."] };

  Z["Java 17 → 21|Record — данные без церемоний"]={
    p:[ bg(0)+laptop(96,60,.95,txt(0,-10,"API",6,C.blue))+B(30,.95,{arms:"push",mood:"smile",item:card(22,-10,36,13,"#fff",mono(-16,2.5,"Order(1,5)",5,C.blue))}),
        bg(1)+card(64,22,44,16,"#fff",mono(-19,2.5,"Order(1,5)",6,C.blue))+lock(94,20,.55)+B(52,.95,{arms:"reach",mood:"wow",item:at(4,-4,pencil,.8)})+no(18,22,.8),
        bg(2)+card(30,18,40,14,"#fff",mono(-17,2.5,"Order(1,5)",6,C.blue))+card(90,18,40,14,"#fff",mono(-17,2.5,"Order(1,5)",6,C.blue))+txt(60,23,"=",14,C.grn)+B(30,.85,{arms:"up",mood:"happy"})+B(90,.85,{arms:"up",mood:"happy"})+ok(60,52,.8) ],
    l:[["ответ API — одной строкой","API reply in one line"],["поменять нельзя","can't be changed"],["одинаковые — равны","same data — equal"]],
    c:["Для ответа API пишу record одной строкой. Равенство даром, менять нельзя — потоки не дерутся.","For an API reply I write one-line records. Equality is free, no edits — threads can't clash."] };

  Z["Java 17 → 21|sealed — закрытый список наследников"]={
    p:[ bg(0)+`<rect x="56" y="54" width="62" height="8" rx="2" fill="${C.wood}" stroke="${C.wood2}"/>`+coin(66,46,1)+cardIcon(86,47,C.blue)+phone(106,40,.5)+txt(86,24,"3",14,C.ink)+B(30,.95,{arms:"point",mood:"smile"}),
        bg(1)+`<rect x="40" y="54" width="40" height="8" rx="2" fill="${C.wood}" stroke="${C.wood2}"/>`+kid(100,82,.85,C.grn,"wow")+star(82,38,7,"#c86bfa")+B(28,.95,{arms:"push",mood:"angry"})+no(60,24,.8),
        bg(2)+[[66,coin(0,0,.8)],[86,cardIcon(0,0,C.blue)],[106,phone(0,0,.4)]].map(c=>at(c[0],26,c[1])+ok(c[0],48,.55)).join("")+B(30,.95,{arms:"hold",mood:"happy",item:clip(0,0,[C.yel,C.blue,C.grn]).replace("translate(0 0)","translate(0 0) scale(.75)")}) ],
    l:[["ровно три формы оплаты","exactly three payments"],["четвёртой не бывает","there's no fourth"],["на каждую — инструкция","each has a handler"]],
    c:["sealed перечисляет всех наследников. Компилятор знает все варианты и проверит каждый.","sealed lists every subclass. The compiler knows all cases and checks each one is handled."] };

  Z["Java 17 → 21|Pattern matching вместо каскада instanceof"]={
    p:[ bg(0)+code(42,38,78,["if (x instanceof A)","else if (… B)","else if (… C)","  ((C) x).go()"],5.5,[0,0,0,C.red])+B(98,.9,{flip:true,arms:"up",mood:"dizzy"}),
        bg(1)+shelf(64,116,30)+tri(76,22,6,C.red)+sq(92,22,6,C.blue)+circ(106,22,6,C.grn)+shelf(64,116,56)+B(34,.95,{arms:"carry",mood:"think",item:box(0,8,18,14,null)+tri(0,-4,4,C.red)})+txt(90,74,"switch",7,C.blue),
        bg(2)+shelf(64,116,36)+tri(76,28,6,C.red)+sq(92,28,6,C.blue)+circ(106,28,6,C.grn)+B(34,.95,{arms:"carry",mood:"wow",item:box(0,8,18,14,null)+star(0,-3,5,C.yel)})+no(90,60,.9) ],
    l:[["каскад instanceof","an instanceof cascade"],["switch: ярлык → полка","switch: tag → shelf"],["нет полки — не соберётся","no shelf — won't compile"]],
    c:["switch по типам сам проверяет и приводит. Забыл вариант — компилятор не соберёт.","A type switch checks and casts in one go. Miss a case and the compiler won't build it."] };

  Z["Java 17 → 21|Текстовые блоки"]={
    p:[ bg(0)+code(60,16,96,["\"SELECT *\\n\" +","\"FROM t\\n\""],6,[C.red,C.red])+B(60,.85,{arms:"up",mood:"dizzy"})+txt(18,60,"+",14,C.red)+txt(102,60,"\\n",10,C.red),
        bg(1)+B(28,1,{arms:"reach",mood:"happy",item:card(18,-10,34,30,"#fff",mono(-14,-6,"\"\"\"",5.5,C.blue)+mono(-14,1,"SELECT *",5)+mono(-14,8,"FROM t",5)+mono(-14,14,"\"\"\"",5.5,C.blue))})+ok(100,16,.8)+spark(104,74) ],
    l:[["кавычки, \\n и плюсы","quotes, \\n and pluses"],["текст как он есть","text just as it is"]],
    c:["В тройных кавычках SQL и JSON читаются как есть, без \\n и склейки. Меньше опечаток.","Inside triple quotes SQL and JSON read as-is, with no \\n or gluing. Fewer typos."] };

  /* ===== Рефлексия ===== */
  Z["Рефлексия и аннотации|Что такое рефлексия"]={
    p:[ bg(0)+bulb(92,20,true,8)+sw(70,58,true,1)+code(32,14,52,["o.getId()"],5.5,[C.grn])+B(36,.95,{arms:"reach",mood:"smile"}),
        bg(1)+sw(96,46,false,1)+dark+B(44,.95,{arms:"reach",mood:"think"})+txt(80,26,"?",14,C.yel)+txt(100,74,"?",10,C.yel),
        bg(2)+machine(96,78,C.grey)+txt(96,40,"42",7,C.grn)+B(42,.95,{arms:"push",mood:"wow",item:card(20,-8,30,12,"#fff",mono(-13,2.5,"\"getId\"",5,C.red))})+txt(60,18,"invoke",7,C.blue) ],
    l:[["знаю, где выключатель","I know the switch"],["на ощупь: ты метод?","by touch: a method?"],["вызов по строке-имени","call by a string name"]],
    c:["Рефлексия — спросить класс на ходу, что в нём есть, и вызвать по имени. Без проверок.","Reflection asks a class at run time what it has and calls things by name. No checks."] };

  Z["Рефлексия и аннотации|Аннотация сама по себе не делает ничего"]={
    p:[ bg(0)+crate(90,82,32,26)+B(42,.95,{arms:"reach",mood:"think",item:at(8,0,sticker(glass(0,4,.8)))}),
        bg(1)+at(72,78,crate(0,0,32,26)+at(0,-17,sticker(glass(0,4,.8))),1,-25)+crack(60,62)+crack(84,70)+B(26,.85,{arms:"up",mood:"sad"})+txt(104,24,"?",12,C.red),
        bg(2)+B(46,.95,{arms:"carry",mood:"happy",hat:"helmet",glasses:true,item:crate(0,10,28,20)+at(0,-2,sticker(glass(0,4,.7)),.8)})+ok(96,40,.9)+spark(100,64) ],
    l:[["наклейка — просто метка","a sticker is just a tag"],["некому читать — разбито","no reader — it breaks"],["грузчик прочёл — бережёт","a mover reads it — careful"]],
    c:["Аннотация — наклейка. Работает её читатель: при старте он находит метку и действует.","An annotation is a sticker. The reader does the work: at startup it finds the tag and acts."] };

  Z["Рефлексия и аннотации|Так и работает Spring"]={
    p:[ bg(0)+[0,1,2].map(i=>box(72+i*16,82,14,14,null)).join("")+box(80,68,14,14,null)+box(96,68,14,14,null)+B(36,.95,{arms:"reach",mood:"think",item:mag(4,0,.8)}),
        bg(1)+box(88,82,30,24,null)+card(88,64,30,10,C.yel,mono(-13,2.5,"@Service",5,C.ink))+B(40,.95,{arms:"point",mood:"wow"}),
        bg(2)+B(28,1,{arms:"reach",mood:"think",item:card(16,-10,30,14,"#fff",mono(-12,2.5,"A(B b)",5.5,C.blue))})+box(94,82,18,18,"B",C.blue)+txt(94,46,"?",12,C.blue),
        bg(3)+box(46,82,22,22,"A",C.grn)+box(70,82,18,18,"B",C.blue)+ln("M57 72 H61",C.ink,2.4)+B(98,.9,{flip:true,arms:"up",mood:"happy"})+spark(26,24)+ok(58,36,.8) ],
    l:[["сканирую пакеты","scanning the packages"],["нашёл @Service","found @Service"],["A нужен B","A needs a B"],["создал и соединил","created and wired"]],
    c:["Никакой магии: Spring читает классы рефлексией, подбирает зависимости и создаёт объекты.","No magic: Spring reads classes by reflection, matches dependencies and builds objects."] };

  Z["Рефлексия и аннотации|Цена рефлексии"]={
    p:[ bg(0)+ln("M6 74 H114",C.grey,1,1)+B(84,.75,{legs:"run",mood:"happy"})+B(30,.75,{arms:"hold",mood:"sweat",item:mag(0,0,.7)})+txt(84,16,"1",11,C.grn)+txt(30,16,"×20",10,C.red),
        bg(1)+machine(96,78,C.grey)+txt(96,40,"!",9,C.red)+B(42,.95,{arms:"push",mood:"dizzy",item:card(20,-8,30,12,"#fff",mono(-13,2.5,"\"getld\"",5,C.red))})+no(96,16,.8),
        bg(2)+box(92,82,30,26,null,C.grey)+txt(92,74,"native",6.5,"#fff")+lock(92,44,.7)+B(40,.95,{arms:"hold",mood:"sweat",item:card(0,-2,26,26,"#fff",scrib(-9,-8,18,4))})+txt(70,24,"?",12,C.red),
        bg(3)+door(98,74)+lock(98,44,.55)+B(40,1,{arms:"reach",mood:"happy",hat:"helmet",item:key(6,0,.9)})+gear(18,22,.6) ],
    l:[["медленнее прямого вызова","slower than a direct call"],["опечатку не поймать","typos slip through"],["native — нужен список","native needs a list"],["отмычка — для библиотек","lockpicks: for libraries"]],
    c:["Рефлексия медленнее и без проверок. Это отмычка для библиотек, а не для своего кода.","Reflection is slower and unchecked. It's a lockpick for libraries, not for your own code."] };

  Z["Рефлексия и аннотации|Своя аннотация — это две части"]={
    p:[ bg(0)+door(94,74)+card(94,34,24,12,C.yel,mono(-10,2.5,"@Audit",5))+B(40,.95,{arms:"point",mood:"sad"})+txt(64,22,"?",12,C.red),
        bg(1)+door(94,74)+`<circle cx="94" cy="34" r="18" fill="${C.yel}" opacity=".35"/>`+card(94,34,24,12,C.yel,mono(-10,2.5,"@Audit",5))+B(30,.95,{arms:"reach",mood:"think",item:card(16,-10,32,12,"#fff",mono(-13,2.5,"RUNTIME",5,C.blue))}),
        bg(2)+door(98,74)+card(98,34,24,12,C.yel,mono(-10,2.5,"@Audit",5))+B(52,1,{arms:"reach",mood:"happy",glasses:true,item:mag(8,-8,.8)})+ok(18,24,.8)+spark(24,52) ],
    l:[["табличка — а читать некому","a sign nobody reads"],["RUNTIME — видна в работе","RUNTIME — seen at run"],["обработчик прочитал","a handler reads it"]],
    c:["Своя аннотация — это метка с RUNTIME плюс тот, кто её ищет. Без второго — пустая табличка.","Your annotation is a RUNTIME tag plus someone who looks for it. Without them, a blank sign."] };

  /* ===== Тесты ===== */
  Z["Тестирование|Тест — это не про поиск багов"]={
    p:[ bg(0)+cliff+B(30,.95,{arms:"up",mood:"sweat"})+txt(96,12,"?",12,C.red),
        bg(1)+cliff+dot(84,6,3,C.ink)+rope("M84 6 L84 32")+rope("M84 6 Q52 18 38 61")+bot(84,62,.8,{arms:"up",mood:"smile",hat:"helmet"})+B(24,.8,{arms:"point",mood:"think"}),
        bg(2)+cliff+dot(84,6,3,C.ink)+rope("M84 6 L84 32")+rope("M84 6 Q52 18 38 61")+bot(84,58,.8,{arms:"up",mood:"wow",hat:"helmet"})+`<path d="M72 30 v-8 M96 30 v-8 M76 26 v-8 M92 26 v-8" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`+`<ellipse cx="80" cy="80" rx="3.4" ry="2.6" fill="${C.yel}" stroke="${C.ink}" stroke-width=".8"/>`+ok(108,20,.8)+B(24,.8,{arms:"point",mood:"happy"}) ],
    l:[["без троса — страшно","no rope — too scary"],["с тросом — смелее","with a rope — bolder"],["сорвался — трос поймал","slipped — the rope caught"]],
    c:["Тест — страховочный трос: ловит момент, когда работавшее сломалось. С ним правлю смело.","A test is a safety rope: it catches the moment working code breaks. So I change things boldly."] };
  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 2 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const G=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s||1})">${inner}</g>`;
  const R=(x,y,w,h,f,r,sc)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r==null?3:r}" fill="${f}" stroke="${sc||C.ink}" stroke-width="1.2"/>`;
  const L=(d,col,w,dash)=>`<path d="${d}" stroke="${col||C.ink}" stroke-width="${w||1.8}" fill="none" stroke-linecap="round" stroke-linejoin="round"${dash?' stroke-dasharray="3 2.5"':""}/>`;
  const T=(x,y,s,sz,col)=>txt(x,y,s,sz||8,col||C.ink,800);
  /* Бит на земле: B(x, масштаб, настроение, руки, предмет, доп.опции) */
  const B=(x,s,mood,arms,item,o)=>bot(x,82,s,Object.assign({mood:mood||"smile",arms:arms||"down"},item?{item}:{},o||{}));
  const node=(x,y,col,lab,r)=>`<circle cx="${x}" cy="${y}" r="${r||6}" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>`+(lab!=null?txt(x,y+2.6,lab,7,"#fff"):"");
  const flag=(x,y,lab,col)=>L(`M${x} ${y} v-24`,C.ink,1.6)+`<path d="M${x} ${y-24} h${lab.length*4.6+6} l-3 4.5 l3 4.5 h-${lab.length*4.6+6} z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1"/>`+txt(x+lab.length*2.3+3,y-17,lab,6.5,"#fff");
  const bug=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-6 -3 l-4 -2 M-6 1 h-4 M-6 4 l-4 2 M6 -3 l4 -2 M6 1 h4 M6 4 l4 2 M-2 -7 l-2 -4 M2 -7 l2 -4" stroke="${C.ink}" stroke-width="1.3" stroke-linecap="round"/><ellipse rx="6.5" ry="7.5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 -7 v15" stroke="${C.ink}" stroke-width="1"/><circle cx="-3" cy="-1" r="1.3" fill="${C.ink}"/><circle cx="3" cy="3" r="1.3" fill="${C.ink}"/></g>`;
  const fake=s=>`<g opacity=".55" stroke-dasharray="3 2">${s}</g>`;
  const zap=(x,y,s,col)=>G(x,y,s,`<path d="M2 -12 L-6 2 H0 L-3 12 L7 -3 H1 Z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.1" stroke-linejoin="round"/>`);
  const pool=(x,y,n,used,gap)=>Array.from({length:n},(_,i)=>`<circle cx="${x+i*(gap||9)}" cy="${y}" r="3.4" fill="${i<used?C.red:C.grn}" stroke="${C.ink}" stroke-width="1"/>`).join("");
  const tx=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${col||C.yel}" fill-opacity=".22" stroke="${col||C.yel}" stroke-width="2"/>`;
  const wrap=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${col||"#c86bfa"}" fill-opacity=".12" stroke="${col||"#c86bfa"}" stroke-width="2" stroke-dasharray="4 3"/>`;
  const heart=(x,y,s,col)=>G(x,y,s,`<path d="M0 7 C-12 -2 -7 -11 0 -5 C7 -11 12 -2 0 7 Z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.1"/>`);
  const crate=(x,y,w,h,col,lab)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>${Array.from({length:Math.floor(w/6)-1},(_,i)=>`<path d="M${-w/2+6+i*6} ${-h+3} v${h-6}" stroke="#000" stroke-opacity=".18" stroke-width="1.4"/>`).join("")}${lab?txt(0,-h/2+3,lab,8,"#fff"):""}</g>`;
  const wheel=(x,y,s,col)=>G(x,y,s,[0,45,90,135].map(d=>`<path d="M0 -14 v28" stroke="${col||C.blue}" stroke-width="2.6" stroke-linecap="round" transform="rotate(${d})"/>`).join("")+`<circle r="9" fill="#fff" stroke="${col||C.blue}" stroke-width="3"/><circle r="2.6" fill="${col||C.blue}"/>`);
  const tyre=(x,y,s)=>G(x,y,s,`<circle r="9" fill="${C.ink}"/><circle r="4" fill="${C.grey}"/>`);
  const book=(x,y,s,col,inner)=>G(x,y,s,`<rect x="-10" y="-7" width="20" height="14" rx="1.5" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.1"/><rect x="-8" y="-5" width="16" height="10" fill="#fff"/><path d="M0 -5 v10" stroke="${C.ink}" stroke-width=".8"/>${inner||""}`);
  const pencil=(x,y,s,rot)=>`<g transform="translate(${x} ${y}) scale(${s||1}) rotate(${rot==null?-35:rot})"><rect x="-2" y="-11" width="4" height="16" fill="${C.yel}" stroke="${C.ink}" stroke-width=".9"/><path d="M-2 5 l2 4 l2 -4 z" fill="#f6d1b0" stroke="${C.ink}" stroke-width=".8"/><rect x="-2" y="-13" width="4" height="3" fill="${C.red}"/></g>`;
  const cam=(x,y,s)=>G(x,y,s,`<rect x="-9" y="-6" width="18" height="12" rx="2.5" fill="#3b4256"/><rect x="-5" y="-9" width="6" height="3" rx="1" fill="#3b4256"/><circle r="4" fill="#9fc7f0" stroke="#fff" stroke-width="1.4"/>`);
  const bell=(x,y,s,ring,col)=>G(x,y,s,`${ring?`<path d="M-15 -6 q-3 6 0 12 M15 -6 q3 6 0 12 M-19 -9 q-4 9 0 18 M19 -9 q4 9 0 18" stroke="${C.red}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`:""}<path d="M-10 6 q0 -16 10 -16 q10 0 10 16 h3 v3 h-26 v-3 z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.2"/><circle cy="11" r="2.4" fill="${C.ink}"/>`);
  const sack=(x,y,s,col)=>G(x,y,s,`<path d="M-8 -8 l-2 -4 h20 l-2 4 q8 6 6 16 q-1 4 -6 4 h-16 q-5 0 -6 -4 q-2 -10 6 -16 z" fill="${col||"#f3e2c0"}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-8 -8 h16" stroke="${C.ink}" stroke-width="1.2"/>`);
  const cal=(x,y,s,n)=>G(x,y,s,`<rect x="-12" y="-12" width="24" height="24" rx="2.5" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="-12" y="-12" width="24" height="7" rx="2" fill="${C.red}"/><path d="M-6 -15 v5 M6 -15 v5" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/>`+txt(0,9,n,11));
  const jar=(x,y,s,inner)=>G(x,y,s,`<rect x="-9" y="-10" width="18" height="21" rx="4" fill="#d9f0ff" stroke="${C.ink}" stroke-width="1.2"/><rect x="-10" y="-13" width="20" height="4" rx="1.5" fill="${C.red}" stroke="${C.ink}" stroke-width="1"/>${inner||""}`);
  const miniSrv=(x,y,s)=>server(x,y,s,true);
  const pot=(x,y,s,steam)=>G(x,y,s,`${steam?`<path d="M-5 -12 q3 -4 0 -8 M2 -12 q3 -4 0 -8" stroke="${C.grey}" stroke-width="1.4" fill="none"/>`:""}<path d="M-10 -9 h20 v10 q0 6 -6 6 h-8 q-6 0 -6 -6 z" fill="#8a90a0" stroke="${C.ink}" stroke-width="1.2"/><path d="M-13 -8 h3 M10 -8 h3" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`);
  const stove=(x,y,on,busy)=>`<g transform="translate(${x} ${y})"><rect x="-11" y="-14" width="22" height="14" rx="2" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><circle cx="6" cy="-7" r="2" fill="${on?C.red:C.grey}"/>${on?`<path d="M-8 -16 q2 -4 4 0 q2 -4 4 0" fill="${C.red}" opacity=".8"/>`:""}${busy?pot(0,-17,.7,true):""}</g>`;
  const cab=(x,y,w,h,col)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${col||C.wood}" stroke="${C.wood2}" stroke-width="1.4"/><path d="M0 ${-h} v${h} M${-w/2} ${-h/2} h${w}" stroke="${C.wood2}" stroke-width="1.2"/><circle cx="-3" cy="${-h*.75}" r="1.2" fill="${C.ink}"/><circle cx="3" cy="${-h*.75}" r="1.2" fill="${C.ink}"/><circle cx="-3" cy="${-h*.25}" r="1.2" fill="${C.ink}"/><circle cx="3" cy="${-h*.25}" r="1.2" fill="${C.ink}"/></g>`;
  const bin=(x,y,s)=>G(x,y,s,`<path d="M-11 -20 h22 l-2 20 h-18 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-13" y="-24" width="26" height="4" rx="1.5" fill="#8a90a0" stroke="${C.ink}" stroke-width="1"/><path d="M-5 -16 v12 M0 -16 v12 M5 -16 v12" stroke="${C.ink}" stroke-width=".8" opacity=".5"/>`);
  const shelf=(x,y,w)=>`<rect x="${x}" y="${y}" width="${w}" height="4" rx="1.5" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1"/>`;
  const train=(x,y,s)=>G(x,y,s,`<rect x="-24" y="-26" width="34" height="20" rx="3" fill="#4a5168" stroke="${C.ink}" stroke-width="1.2"/><rect x="8" y="-36" width="18" height="30" rx="3" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/><rect x="12" y="-32" width="10" height="9" rx="1.5" fill="#dfe9ff"/><rect x="-18" y="-36" width="7" height="10" fill="#4a5168" stroke="${C.ink}"/><path d="M-15 -40 q-4 -5 1 -9 q5 -4 1 -9" stroke="${C.grey}" stroke-width="3" fill="none" stroke-linecap="round"/>`+tyre(-14,-4,.75)+tyre(4,-4,.75)+tyre(19,-4,.75));
  const scoot=(x,y,s)=>G(x,y,s,`<path d="M-14 -3 h22 l6 -26 h5" stroke="${C.red}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="-14" cy="-1" r="4" fill="${C.ink}"/><circle cx="14" cy="-1" r="4" fill="${C.ink}"/>`);
  const press=(x,y,s)=>G(x,y,s,`<rect x="-18" y="-40" width="36" height="40" rx="3" fill="#4a5168" stroke="${C.ink}" stroke-width="1.2"/><circle cx="0" cy="-26" r="8" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-14" y="-10" width="28" height="5" fill="#fff" stroke="${C.ink}" stroke-width=".8"/>`+gear(12,-38,.45,C.yel));
  const post=(x,y,a,b)=>`<g transform="translate(${x} ${y})"><path d="M0 0 v-52" stroke="${C.wood2}" stroke-width="3"/><path d="M-2 -50 h24 l5 5 l-5 5 h-24 z" fill="${C.grn}" stroke="${C.ink}" stroke-width="1"/><path d="M2 -34 h-24 l-5 5 l5 5 h24 z" fill="${C.blue}" stroke="${C.ink}" stroke-width="1"/>${txt(11,-42,a,7,"#fff")}${txt(-11,-26,b,7,"#fff")}</g>`;
  const board=(x,y,w,h,inner)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" fill="#3f6b55" stroke="${C.wood2}" stroke-width="3"/>${inner||""}</g>`;
  const mess=(x,y,s)=>G(x,y,s,`<path d="M-8 -2 q4 -9 10 -4 q7 5 -2 9 q-9 3 -6 -5 q3 -7 9 -1 q4 5 -3 6" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);
  const balance=(x,y,tilt,l,r)=>`<g transform="translate(${x} ${y})"><path d="M0 0 v-34 M-8 0 h16" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/><g transform="rotate(${tilt||0} 0 -34)"><path d="M-26 -34 h52" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/><path d="M-26 -34 l-7 14 h14 z M26 -34 l-7 14 h14 z" fill="none" stroke="${C.ink}" stroke-width="1"/><path d="M-34 -20 h16 q-8 6 -16 0 M18 -20 h16 q-8 6 -16 0" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>${l||""}${r||""}</g></g>`;
  const note=(x,y,lab,col)=>`<g transform="translate(${x} ${y}) rotate(-6)"><rect x="-13" y="-9" width="26" height="18" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1"/>${txt(0,3,lab,7.5)}</g>`;
  const machine=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-20" y="-24" width="40" height="24" rx="2" fill="#7a8399" stroke="${C.ink}" stroke-width="1.2"/><rect x="-22" y="-28" width="44" height="5" rx="1.5" fill="${C.wood}" stroke="${C.wood2}"/>${gear(0,-12,.6,C.yel)}</g>`;
  const rail=(xs,y,cols)=>L(`M${xs[0]} ${y} H${xs[xs.length-1]}`,C.ink,1.8)+xs.map((x,i)=>node(x,y,(cols&&cols[i])||C.blue)).join("");
  const Z={};

  /* ===== Тестирование ===== */
  const tower=(x,yb,inv)=>{ const W=inv?[16,32,48]:[48,32,16], col=inv?[C.grn,C.yel,C.red]:[C.grn,C.yel,C.red], lab=inv?["1","10","100"]:["1000","100","1"];
    return W.map((w,i)=>`<rect x="${x-w/2}" y="${yb-(i+1)*13}" width="${w}" height="12" rx="2" fill="${col[i]}" stroke="${C.ink}" stroke-width="1.1"/>`+txt(x,yb-(i+1)*13+9,lab[i],7.5,C.ink)).join(""); };
  Z["Тестирование|Пирамида: много быстрых, мало медленных"]={
    p:[ bg(0)+`<g transform="rotate(9 84 78)">${tower(84,78,true)}</g>`+clock(58,20,.85,9)+T(58,40,"1h",9,C.red)+B(28,.9,"sweat","down",null,{legs:"sit"}),
        bg(1)+tower(84,78,false)+B(32,.95,"think","point"),
        bg(2)+B(40,1,"happy","carry",[0,1,2].map(i=>`<rect x="-10" y="${2-i*7}" width="20" height="6" rx="1.5" fill="${C.grn}" stroke="${C.ink}" stroke-width=".9"/>`).join("")+`<path d="M-4 -10 l3 3 l5 -6" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/>`)+ok(84,30,.9)+ok(104,44,.8)+ok(86,58,.7)+clock(104,18,.7,0)+T(104,70,"ms",9,C.grn) ],
    l:[["вверх ногами — ждём час","upside down — wait an hour"],["внизу — тысячи мелких","thousands small at base"],["тысяча за миг — ✓","a thousand in a blink — ✓"]],
    c:["Мелких проверок у меня тысячи — за миг. Длинных пара. Перевернёшь — все ждут час.","Thousands of tiny quick checks, only a couple of long ones. Flip it — everyone waits an hour."] };

  Z["Тестирование|Мок — подмена соседа"]={
    p:[ bg(3)+B(24,.9,"sweat","reach")+L("M48 62 C 62 70, 70 50, 82 56",C.ink,1.6,1)+db(96,58,.85)+cloud(70,26,.6)+clock(102,22,.75,8),
        bg(4)+B(46,1,"think","hold",fake(db(0,2,.55,C.grey)))+db(98,60,.6)+no(98,36,.8),
        bg(0)+B(30,.95,"happy","point")+fake(db(80,60,.85,C.grey))+bubble(82,22,26,T(0,3,"42",10,C.blue))+ok(108,62,.8) ],
    l:[["настоящие: медленно","real ones: slow"],["беру манекен базы","I grab a dummy database"],["отвечает заданным — ✓","answers as told — ✓"]],
    c:["Мне не нужна настоящая база, чтобы проверить свой код. Манекен ответит «42» — и сразу.","I don't need a real database to test my code. A dummy says \"42\" — instantly."] };

  Z["Тестирование|Перемокал — проверяешь моки, а не код"]={
    p:[ bg(1)+B(60,.9,"happy","up")+fake(db(18,56,.6,C.grey))+fake(cloud(100,26,.6,C.grey))+fake(env(100,60,.6,C.grey))+fake(gear(20,26,.8,C.grey))+ok(60,14,.8),
        bg(2)+B(30,.95,"dizzy","reach",mag(0,0,.9))+fake(gear(86,52,1.3,C.grey))+bug(86,52,.7)+no(104,20,.8),
        bg(3)+L("M30 14 V72",C.ink,1.2,1)+L("M90 14 V72",C.ink,1.2,1)+B(60,.95,"happy","hold",gear(0,0,.75,C.yel))+fake(db(15,56,.5,C.grey))+fake(cloud(105,34,.5,C.grey))+ok(76,20,.8) ],
    l:[["подменил всё — ✓","mocked it all — ✓"],["а мой код не проверен","yet my code is untested"],["заглушки только по краям","stubs only at the edges"]],
    c:["Если подменить всё, тест зелёный, а мой код не проверен. Подменяю только внешний мир.","If I fake everything, the test is green but my code is untested. Fake only the outside world."] };

  Z["Тестирование|Testcontainers: настоящая база в тесте"]={
    p:[ bg(4)+fake(db(26,56,.8,C.grey))+ok(26,26,.8)+bug(66,72,.6)+L("M46 72 h10",C.grey,1.4)+B(96,.9,"sweat","down"),
        bg(0)+B(44,.95,"think","carry",crate(0,10,30,20,C.blue)+db(0,1,.35))+T(92,40,"PG",11,C.blue)+L("M80 48 q12 8 24 0",C.blue,1.6),
        bg(1)+crate(24,80,34,30,C.blue)+db(24,62,.45)+B(58,.95,"happy","reach",mag(0,0,.9))+bug(86,62,.65)+no(104,24,.8) ],
    l:[["манекен пропустил баг","the dummy missed a bug"],["несу базу в контейнере","I carry a DB in a box"],["настоящая — поймала","the real one caught it"]],
    c:["Я поднимаю настоящую базу на время теста. Дольше, зато ловлю то, что манекен пропустит.","I start a real database just for the test. Slower, but it catches what a dummy misses."] };

  /* ===== Git ===== */
  Z["Git|Зачем система версий"]={
    p:[ bg(2)+card(22,28,22,14,"#fff",T(0,3,"v2",7),-12)+card(98,26,26,14,"#fff",T(0,3,"v2_1",7),10)+card(20,60,24,14,"#fff",T(0,3,"v2!!",7,C.red),8)+card(100,62,24,14,"#fff",T(0,3,"v3?",7,C.red),-8)+B(60,.95,"dizzy","up"),
        bg(3)+rail([16,40,64,88],16,[C.red,C.grn,C.red,C.grn])+B(36,.95,"think","hold",book(0,0,.75,C.blue))+kid(96,82,.8,C.grn),
        bg(4)+rail([16,40,64,88],16,[C.grey,C.grn,C.grey,C.grey])+`<circle cx="40" cy="16" r="10" fill="${C.grn}" opacity=".3"/>`+L("M88 26 Q64 38 44 26",C.red,1.8,1)+B(72,.95,"happy","down",null,{flip:true,legs:"run"}) ],
    l:[["архивы — каша","archives — a mess"],["журнал: кто и зачем","log: who and why"],["назад в любой момент","back to any moment"]],
    c:["Я храню не файлы, а историю: кто, что и зачем поменял. Могу вернуться в любой день.","I keep history, not files: who changed what and why. I can jump back to any day."] };

  Z["Git|Коммит — не сохранение, а точка в истории"]={
    p:[ bg(0)+B(56,1,"sad","hold",`<circle r="9" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>`+mess(0,0,.9))+clock(96,24,.8,4)+T(96,44,"24h",8),
        bg(1)+B(24,.9,"think","reach",cam(0,0,.9))+spark(56,48)+shelf(66,64,48)+box(76,64,12,12,"a")+box(92,64,12,12,"b")+box(106,64,12,12,"c")+L("M58 54 L68 40 M58 54 L114 40",C.yel,1,1),
        bg(2)+L("M14 61 H76",C.ink,1.8)+card(22,61,20,13,"#fff",T(0,3,"9c2",7))+card(48,61,20,13,"#fff",T(0,3,"4be",7))+card(76,61,24,14,"#fff",T(0,3,"a1f3",7,C.blue))+B(106,.9,"happy","reach",null,{flip:true}) ],
    l:[["всё за день — каша","a whole day — a mess"],["снимок ВСЕГО проекта","a snapshot of it ALL"],["одно дело — один коммит","one change — one commit"]],
    c:["Коммит — снимок всего проекта со своим номером. Одно законченное дело — один снимок.","A commit is a snapshot of the whole project with an id. One finished change — one snapshot."] };

  Z["Git|Ветка — это просто указатель"]={
    p:[ bg(3)+B(46,.95,"sweat","carry",[0,1,2].map(i=>`<rect x="-12" y="${-7-i*7}" width="24" height="7" rx="1" fill="${[C.red,C.blue,C.grn][i]}" stroke="${C.ink}" stroke-width=".9"/>`).join(""))+box(92,80,14,12)+box(108,80,14,12)+box(100,68,14,12)+no(100,30,.8),
        bg(4)+box(16,80,14,12,"1")+box(34,80,14,12,"2")+box(52,80,14,12,"3")+flag(52,68,"main",C.red)+B(92,.9,"think","hold",L("M0 8 v-18",C.ink,1.4)+`<path d="M0 -10 h10 l-3 3 l3 3 h-10 z" fill="${C.grn}" stroke="${C.ink}" stroke-width=".8"/>`),
        bg(0)+box(10,80,14,12,"1")+box(26,80,14,12,"2")+box(42,80,14,12,"3")+box(76,80,14,12,"4")+L("M49 74 H69",C.ink,1.4)+flag(42,68,"main",C.red)+flag(76,68,"feat",C.grn)+B(106,.9,"happy","reach",null,{flip:true}) ],
    l:[["копировать всё — тяжело","copying all — heavy"],["ветка — просто флажок","a branch is just a flag"],["флажок ушёл вперёд","the flag moved ahead"]],
    c:["Ветка — не копия проекта, а флажок на коммите. Воткнуть новый — мгновенно.","A branch isn't a copy of the project, just a flag on a commit. Planting one is instant."] };

  Z["Git|merge и rebase — два способа совместить"]={
    p:[ bg(1)+L("M40 52 L58 36 H108",C.red,2)+L("M40 52 L58 68 H90",C.grn,2)+node(40,52,C.grey)+node(64,36,C.red)+node(86,36,C.red)+node(64,68,C.grn)+node(86,68,C.grn)+B(18,.85,"think","point"),
        bg(2)+L("M40 52 L58 36 H86 L104 52",C.red,2)+L("M40 52 L58 68 H86 L104 52",C.grn,2)+node(40,52,C.grey)+node(64,36,C.red)+node(84,36,C.red)+node(64,68,C.grn)+node(84,68,C.grn)+node(104,52,C.yel,"M",7)+B(18,.85,"happy","point"),
        bg(3)+L("M36 52 H112",C.ink,2)+node(38,52,C.grey)+node(56,52,C.red)+node(74,52,C.red)+node(92,52,C.grn,"'")+node(110,52,C.grn,"'")+fake(node(64,72,C.grn)+node(84,72,C.grn))+B(18,.85,"wow","carry",node(0,6,C.grn,"'",7)) ],
    l:[["две линии разошлись","two lines split apart"],["merge: узелок слияния","merge: a joining knot"],["rebase: ряд, номера новые","rebase: one line, new ids"]],
    c:["merge связывает две линии узелком. rebase перевешивает мои бусины в конец — номера новые.","merge ties two lines with a knot. rebase moves my beads to the end — with new ids."] };

  Z["Git|Железное правило rebase"]={
    p:[ bg(4)+B(34,.95,"happy","reach",pencil(0,0,1))+paper(86,46,["a1","b2"],6)+L("M76 50 h18",C.red,1.6),
        bg(0)+B(28,.95,"think","hold",card(0,0,18,13,"#fff",T(0,3,"a1",7)))+kid(80,82,.8,C.red)+kid(104,82,.8,C.grn)+card(80,40,16,11,"#fff",T(0,3,"a1",6.5))+card(104,40,16,11,"#fff",T(0,3,"a1",6.5)),
        bg(1)+B(28,.95,"sweat","hold",card(0,0,18,13,"#fff",T(0,3,"b7",7,C.red)))+kid(80,82,.8,C.red,"sad")+kid(104,82,.8,C.grn,"sad")+card(80,40,16,11,"#fff",T(0,3,"a1",6.5))+card(104,40,16,11,"#fff",T(0,3,"a1",6.5))+T(56,40,"≠",16,C.red) ],
    l:[["своё — переписывай","your own — rewrite away"],["общее уже забрали","others already took it"],["переписал общее — хаос","rewrote shared — chaos"]],
    c:["Свой черновик переписываю сколько хочу. Что уже забрали другие — не трогаю.","I rewrite my own draft all I like. What others already took — I leave alone."] };

  /* ===== Spring: зачем ===== */
  Z["Spring: зачем|Что было до фреймворка"]={
    p:[ bg(2)+B(36,.95,"sweat","carry",gear(0,-3,.7,C.grey),{hat:"helmet"})+R(76,48,36,30,"#fff",3)+L("M80 56 h28 M80 64 h16",C.grey,1.6)+key(96,30,.7),
        bg(3)+L("M14 30 C40 60, 70 10, 106 46 M10 60 C40 30, 80 80, 110 30",C.ink,1.4)+lock(16,22,.8)+key(100,62,.7)+env(104,22,.6)+B(60,.95,"dizzy","up"),
        bg(4)+crate(22,80,26,22,C.wood)+crate(46,80,22,30,C.grey)+crate(32,58,20,16,C.wood)+B(88,.95,"think","hold",pot(0,4,.9,true)) ],
    l:[["сам создаю каждую деталь","I build every part"],["провода, замки, конфиг","wires, locks, config"],["сама задача — крошка","the task is a crumb"]],
    c:["Раньше я сам собирал всё: объекты, связи, соединения. На саму задачу сил не оставалось.","I used to build everything myself: objects, links, connections. No strength left for the task."] };

  Z["Spring: зачем|Инверсия управления: не ты создаёшь, а тебе дают"]={
    p:[ bg(0)+B(30,.95,"sweat","reach",key(0,0,.6,C.grey))+R(64,62,14,16,C.grey,3)+R(66,44,12,12,C.grey,3)+gear(98,64,.6,C.grey)+`<circle cx="90" cy="40" r="4" fill="${C.red}"/>`,
        bg(1)+B(30,.95,"think","point")+think(52,20,gear(12,-2,.45,C.yel))+crate(92,80,40,40,C.blue,"@"),
        bg(2)+crate(92,80,40,30,C.blue,"@")+bot(92,60,.55,{hat:"cap",arms:"up",mood:"happy"})+B(32,.95,"happy","wave") ],
    l:[["раньше: собирал сам","before: built it myself"],["теперь: «мне нужно…»","now: \"I need…\""],["контейнер дал готовое","the container hands it"]],
    c:["Я не собираю помощников сам. Говорю «мне нужен такой», и контейнер даёт готового.","I don't build my helpers. I say \"I need one like this\", and the container hands it over ready."] };

  Z["Spring: зачем|Внедрение зависимостей через конструктор"]={
    p:[ bg(3)+B(34,1,"think","hold",pot(0,6,.7),{hat:"chef"})+think(62,22,sack(11,-2,.5)),
        bg(4)+B(34,.95,"happy","reach",null,{hat:"chef"})+sack(64,62,.8)+kid(96,82,.85,C.grn),
        bg(0)+B(34,.95,"happy","reach",null,{hat:"chef"})+fake(sack(64,62,.8,C.grey))+ok(98,30,.9)+T(96,64,"test",8,C.blue) ],
    l:[["прошу в конструкторе","I ask in the constructor"],["откуда — не моё дело","where from — not my job"],["в тесте — заглушка","in a test — a stub"]],
    c:["Я прошу муку в конструкторе и не бегаю на мельницу. В тесте мне дадут игрушечную.","I ask for flour in my constructor and never run to the mill. A test hands me a toy one."] };

  Z["Spring: зачем|Бин — объект под управлением контейнера"]={
    p:[ bg(1)+machine(84,80)+B(40,.95,"smile","push")+T(84,30,"1",14,C.blue),
        bg(2)+machine(60,80)+B(26,.9,"happy","push")+bot(100,82,.85,{hat:"cap",flip:true,mood:"think"}),
        bg(3)+machine(56,80)+box(56,52,14,13,"7")+B(20,.9,"angry","point")+bot(98,82,.9,{hat:"cap",flip:true,arms:"reach",mood:"happy"}) ],
    l:[["контейнер создал один","the container made one"],["пользуются все по очереди","everyone takes turns"],["оставил своё — забрали","left it — someone took it"]],
    c:["Бин у всех один. Оставлю на нём своё — следующий заберёт как своё. Состояние не храню.","There's one bean for everyone. Leave my stuff on it and the next one takes it. I keep no state."] };

  Z["Spring: зачем|Контекст — место, где живут бины"]={
    p:[ bg(4)+B(28,.95,"think","reach",mag(0,0,.9))+card(84,28,22,16,"#fff",T(0,4,"@",11,C.blue))+card(106,50,18,14,C.grey)+card(84,66,22,16,"#fff",T(0,4,"@",11,C.blue)),
        bg(0)+box(88,80,22,18,"1")+B(42,.95,"sweat","carry",box(0,8,20,16,"2")),
        bg(1)+shelf(66,44,50)+shelf(66,74,50)+box(78,44,14,13,"1")+box(98,44,14,13,"2")+box(80,74,14,13,"3")+B(28,.95,"happy","reach",box(0,7,14,13,"4")),
        bg(2)+shelf(4,34,36)+box(13,34,12,12,"1")+box(31,34,12,12,"2")+B(58,.95,"happy","reach",key(0,0,.7))+kid(106,82,.85,C.red,"wow") ],
    l:[["ищу классы с @","find classes with @"],["сперва то, что нужно","first what's needed"],["кладу в контекст","into the context"],["раздаю ссылки","hand out references"]],
    c:["На старте я нахожу классы с @, собираю по порядку и кладу на полку. Потом раздаю.","At start I find @ classes, build them in order and shelve them. Then I hand them out."] };

  Z["Spring: зачем|Прокси: почему @Transactional вообще работает"]={
    p:[ bg(3)+wrap(52,22,64,62)+bot(26,82,.8,{hat:"cap",arms:"up"})+bubble(26,16,40,T(0,3.5,"BEGIN",9,C.grn))+B(86,.9,"think","down"),
        bg(4)+wrap(30,10,82,74)+B(70,1,"happy","hold",laptop(0,12,.55)),
        bg(0)+wrap(52,22,64,62)+bot(26,82,.8,{hat:"cap",arms:"up",mood:"happy"})+bubble(26,16,44,T(0,3.5,"COMMIT",9,C.grn))+B(86,.9,"happy","reach",null,{flip:true})+ok(108,14,.7) ],
    l:[["обёртка: BEGIN","wrapper: BEGIN"],["я просто работаю","I just do my work"],["обёртка: COMMIT","wrapper: COMMIT"]],
    c:["Снаружи меня зовут через обёртку: она открывает и закрывает транзакцию. Я про это не думаю.","Calls reach me via a wrapper that opens and closes the transaction. I never think about it."] };

  Z["Spring: зачем|Главная ловушка прокси"]={
    p:[ bg(4)+kid(12,82,.75,C.red)+bot(36,82,.7,{hat:"cap",arms:"hold",item:ok(0,0,.8)})+wrap(56,20,60,64)+B(88,.9,"happy","hold",laptop(0,12,.5)),
        bg(0)+bot(22,82,.75,{hat:"cap",mood:"sleep"})+`<path d="M44 20 V84" stroke="#c86bfa" stroke-width="2" stroke-dasharray="4 3"/>`+T(84,18,"this.b()",9,C.red)+B(84,.95,"wow","down",null,{flip:true,legs:"run"}),
        bg(1)+B(40,1,"wow","hold",card(0,0,20,16,"#fff",T(0,4,"?",10,C.red)))+book(92,58,1.1,C.blue)+no(92,30,.9) ],
    l:[["снаружи — через обёртку","outside — via the wrapper"],["this.b() мимо обёртки","this.b() skips the wrapper"],["ни ошибки, ни записи","no error, no record"]],
    c:["Если я зову свой метод через this, обёртку обхожу — и транзакции нет. Молча.","If I call my own method via this, I skip the wrapper — and no transaction. Silently."] };

  /* ===== Spring Boot ===== */
  Z["Spring Boot|Что болело до Boot"]={
    p:[ bg(2)+B(34,.95,"sweat","carry",tyre(0,0,1))+R(70,52,40,14,C.red,4)+tyre(80,70,.7)+tyre(102,70,.7),
        bg(3)+[0,1,2,3,4].map(i=>`<rect x="78" y="${70-i*10}" width="30" height="9" rx="1" fill="#fff" stroke="${C.ink}" stroke-width="1"/>`).join("")+card(60,70,14,10,C.blue)+B(30,.95,"dizzy","point"),
        bg(4)+cal(88,34,1,"3")+R(72,62,34,12,C.red,4)+tyre(80,78,.5)+B(32,.95,"sleep","down",null,{legs:"sit"}) ],
    l:[["собирай машину сам","build the car yourself"],["настроек больше кода","more config than code"],["старт — несколько дней","start takes days"]],
    c:["Раньше я собирал всё вручную: сервер, базу, защиту. Новый проект стартовал днями.","I used to wire it all by hand: server, database, security. A new project took days to start."] };

  Z["Spring Boot|Автоконфигурация: нашёл — настроил"]={
    p:[ bg(0)+crate(86,80,40,26,C.wood)+card(76,50,16,12,"#fff",T(0,3,"PG",7,C.blue))+card(96,50,18,12,"#fff",T(0,3,"web",6.5,C.grn))+B(34,.95,"think","reach",mag(0,0,.9)),
        bg(1)+B(32,.95,"wow","hold",card(0,0,16,12,"#fff",T(0,3,"PG",7,C.blue)))+db(92,62,.8)+pool(74,24,5,0)+spark(108,38),
        bg(2)+B(32,.95,"happy","hold",card(0,0,18,12,"#fff",T(0,3,"web",6.5,C.grn)))+server(90,56,1.1)+spark(108,28),
        bg(3)+B(30,.95,"happy","push")+sw(64,62,true,1.2)+fake(card(96,32,28,14,C.grey,T(0,3,"8080",7)))+card(96,60,28,14,"#fff",T(0,3,"9090",7,C.grn)) ],
    l:[["заглядываю в classpath","I peek into the classpath"],["есть драйвер — есть пул","driver found — pool up"],["есть web — есть сервер","web found — server up"],["твоя настройка главнее","your setting wins"]],
    c:["Я заглядываю в коробку: есть драйвер — подниму пул, есть web — сервер. Твоё — главнее.","I peek in the box: a driver — I start a pool, web — a server. Your settings still win."] };

  Z["Spring Boot|Стартеры: одна зависимость вместо двадцати"]={
    p:[ bg(4)+B(42,.95,"sweat","carry",[0,1,2,3,4].map(i=>`<rect x="${-9+(i%2)*3}" y="${4-i*5}" width="16" height="6" rx="1" fill="${[C.red,C.blue,C.grn,C.yel,C.wood][i]}" stroke="${C.ink}" stroke-width=".8"/>`).join(""))+box(86,80,12,10)+box(100,80,12,10)+box(93,70,12,10)+box(112,80,10,9)+T(96,36,"×20",10),
        bg(0)+B(34,.95,"dizzy","hold",box(0,7,16,14,"2.1"))+box(90,78,18,16,"3.0",C.blue)+no(70,40,.9),
        bg(1)+B(46,1,"happy","carry",box(0,8,26,18,"web",C.grn))+ok(96,40,.9)+spark(96,66) ],
    l:[["двадцать штук вручную","twenty picked by hand"],["версии не сходятся","versions don't match"],["одна: starter-web","just one: starter-web"]],
    c:["Вместо двадцати коробок несу одну — starter-web. Внутри всё нужное, и версии дружат.","Instead of twenty boxes I carry one — starter-web. Everything's inside, and versions match."] };

  Z["Spring Boot|Встроенный сервер и один jar"]={
    p:[ bg(2)+B(28,.95,"sweat","push")+box(62,74,18,14,"war")+server(98,52,1.4),
        bg(3)+fake(server(98,52,1.2))+no(98,20,.7)+B(48,1.1,"think","hold",jar(0,2,.9,miniSrv(0,3,.3))),
        bg(4)+crate(92,80,36,32,C.blue)+B(34,.95,"happy","reach",jar(0,0,.8,miniSrv(0,3,.3)))+T(70,18,"java -jar",9,C.blue)+spark(108,36) ],
    l:[["раньше: war в сервер","before: war into a server"],["сервер — внутри jar","the server is in the jar"],["java -jar — и в контейнер","java -jar — into a box"]],
    c:["Раньше я толкал war в большой сервер. Теперь сервер у меня в банке — запустил и работаю.","I used to push a war into a big server. Now the server's in my jar — start it and go."] };

  Z["Spring Boot|Конфигурация и профили"]={
    p:[ bg(0)+B(36,1,"smile","hold",card(0,0,18,12,"#fff",T(0,3,"yml",7,C.blue)),{hat:"chef"})+paper(90,44,["port:","8080"],4),
        bg(1)+B(26,.95,"think","point")+card(84,30,40,18,C.grn,T(0,4,"dev: 1",8,"#fff"))+card(84,62,40,18,C.red,T(0,4,"prod: 8",8,"#fff")),
        bg(2)+paper(88,44,["port:","8080"])+note(90,50,"9090")+B(36,.95,"happy","reach",null)+T(90,80,"ENV",8,C.blue) ],
    l:[["настройки — в yml","settings live in yml"],["dev и prod — разные числа","dev and prod differ"],["переменная среды главнее","an env var wins"]],
    c:["Рецепт один, а числа для дома и ресторана разные. А записка сверху перебивает рецепт.","One recipe, different numbers for home and restaurant. A note on top beats the recipe."] };

  Z["Spring Boot|Actuator: приложение рассказывает о себе"]={
    p:[ bg(3)+kid(18,82,.8,C.blue)+T(18,42,"k8s",8,C.blue)+bubble(46,20,40,T(0,3,"/health",7))+B(86,.95,"happy","hold",ok(0,0,.8)),
        bg(4)+B(32,1,"smile","hold",heart(0,0,.8))+card(88,46,40,30,"#fff",L("M-16 2 h8 l3 -8 l4 14 l3 -6 h14",C.red,1.6)),
        bg(0)+kid(18,82,.8,C.blue)+T(18,42,"k8s",8,C.blue)+bubble(46,20,40,T(0,3,"/health",7))+B(86,.95,"dizzy","down")+no(108,40,.8),
        bg(1)+L("M30 34 a30 30 0 0 1 60 0",C.grn,2.4)+`<path d="M86 28 l5 7 l4 -8" fill="${C.grn}"/>`+B(60,1,"happy","up")+spark(22,50)+spark(100,56) ],
    l:[["/health: живой?","/health: alive?"],["/metrics: пульс","/metrics: the pulse"],["молчу — плохо","silent — bad sign"],["перезапустили — живой","restarted — alive"]],
    c:["k8s всё время спрашивает, жив ли я. Замолчу — меня перезапустят. Само лечится.","k8s keeps asking if I'm alive. If I go silent, it restarts me. It heals itself."] };

  /* ===== Spring в работе ===== */
  Z["Spring в работе|Как приходит HTTP-запрос"]={
    p:[ bg(2)+kid(24,82,.95,C.red)+env(54,50,.8)+T(54,32,"GET",9,C.blue)+R(80,30,32,52,C.wood,3,C.wood2)+`<circle cx="86" cy="58" r="2" fill="${C.ink}"/>`,
        bg(3)+B(28,.95,"think","point")+post(86,80,"/a","/b"),
        bg(4)+B(36,.95,"smile","hold",box(0,7,16,14))+env(90,58,.9)+T(90,36,"{ }",11,C.blue)+L("M76 58 H58",C.ink,1.4,1),
        bg(0)+B(60,1.05,"happy","hold",gear(0,0,.6,C.yel),{hat:"chef"})+spark(22,30)+spark(98,30),
        bg(1)+B(30,.95,"happy","reach",env(0,0,.6))+T(56,34,"{ }",10,C.blue)+kid(98,82,.95,C.red,"wow") ],
    l:[["запрос пришёл","the request arrives"],["ищу метод по пути","find method by path"],["JSON → объект","JSON → object"],["мой код — середина","my code — the middle"],["объект → JSON","object → JSON"]],
    c:["Мне приносят уже распакованный заказ, я готовлю, а упакуют и отнесут без меня.","The order comes to me unpacked, I cook it, and someone else packs and delivers it."] };

  Z["Spring в работе|Три слоя и зачем они"]={
    p:[ bg(2)+bot(18,82,.6,{hat:"cap",arms:"hold",item:phone(0,0,.5)})+B(60,.9,"think","hold",gear(0,0,.55,C.yel))+bot(102,82,.6,{hat:"helmet",arms:"hold",item:db(0,0,.45)}),
        bg(3)+bot(18,82,.6,{hat:"cap",arms:"hold",item:phone(0,0,.5)})+B(60,.9,"happy","hold",gear(0,0,.55,C.yel))+bot(102,82,.6,{hat:"helmet",arms:"hold",item:db(0,0,.45,C.grn)})+spark(102,22),
        bg(4)+bot(18,82,.6,{hat:"cap",arms:"hold",item:laptop(0,10,.4)})+B(60,.9,"wow","hold",gear(0,0,.55,C.yel))+bot(102,82,.6,{hat:"helmet",arms:"hold",item:db(0,0,.45,C.grn)})+spark(18,22) ],
    l:[["вход, правила, склад","entry, rules, storage"],["сменили склад — я тот же","new store — same rules"],["новый вход — я тот же","new entry — same me"]],
    c:["Я знаю только правила. Сменят склад или окошко приёма — мне переучиваться не надо.","I only know the rules. Swap the store or the front desk — I don't have to relearn a thing."] };

  Z["Spring в работе|Spring Data: репозиторий без реализации"]={
    p:[ bg(3)+B(24,.9,"smile","reach",pencil(0,0,.9))+card(78,58,58,16,"#fff",T(0,3,"findByClientId",6.5,C.blue)),
        bg(4)+B(24,.9,"think","point",null,{glasses:true})+card(62,40,22,14,"#fff",T(0,3,"find",7,C.blue))+card(86,40,18,14,"#fff",T(0,3,"By",7,C.blue))+card(84,64,40,14,"#fff",T(0,3,"ClientId",7,C.red)),
        bg(0)+B(24,.9,"wow","up")+card(80,44,62,30,"#fff",T(0,-4,"SELECT *",7,C.blue)+T(0,8,"client_id = ?",6.5,C.ink))+spark(108,72),
        bg(1)+B(24,.9,"sweat","reach",pencil(0,0,.9))+paper(84,44,["@Query","JOIN…"],4) ],
    l:[["пишу только имя метода","I just name the method"],["разбираю имя на части","split the name to parts"],["запрос готов сам","the query writes itself"],["сложное — руками","complex — by hand"]],
    c:["Я называю метод, а Spring сам по имени пишет запрос. Хитрый запрос пишу руками.","I just name the method and Spring writes the query from it. Tricky ones I write by hand."] };

  Z["Spring в работе|Где начинается и кончается транзакция"]={
    p:[ bg(2)+tx(66,18,48,64)+T(90,32,"BEGIN",8,C.wood2)+B(36,.95,"smile","reach",key(0,0,.75)),
        bg(3)+tx(10,10,100,74)+B(56,.9,"happy","carry",box(0,10,16,10)+box(0,0,16,10))+db(96,62,.6),
        bg(4)+tx(8,18,48,64)+T(32,32,"COMMIT",7,C.wood2)+B(70,.95,"happy","reach",key(0,0,.75))+R(98,46,14,4,C.wood,1,C.wood2)+L("M104 50 v6",C.ink,1.2)+ok(104,24,.8),
        bg(0)+tx(6,16,60,68)+B(32,.9,"sleep","hold",key(0,0,.7),{legs:"sit"})+clock(56,26,.6,6)+kid(86,82,.75,C.red,"sad")+kid(106,82,.75,C.grn,"sad") ],
    l:[["вход в метод: BEGIN","method start: BEGIN"],["внутри — одно целое","inside — one unit"],["выход: COMMIT","exit: COMMIT"],["заснул с ключом — ждут","slept with the key — wait"]],
    c:["Вошёл в метод — взял ключ, вышел — вернул. Застряну в сети с ключом — другие ждут.","Enter the method — I take the key, exit — give it back. Stuck on the network — others wait."] };

  Z["Spring в работе|Три грабли, на которые наступают все"]={
    p:[ bg(1)+bot(18,82,.7,{hat:"cap",mood:"sleep"})+`<path d="M40 18 V84" stroke="#c86bfa" stroke-width="2" stroke-dasharray="4 3"/>`+T(80,18,"this",9,C.red)+B(80,.95,"wow","down",null,{flip:true,legs:"run"}),
        bg(2)+[0,1,2,3,4,5].map(i=>box(12+i*12,80,10,9)).join("")+T(40,52,"N+1",10,C.red)+B(96,.9,"sweat","hold",box(0,6,12,10),{legs:"run",flip:true}),
        bg(3)+B(30,.95,"dizzy","reach")+crate(84,80,34,26,C.wood)+lock(84,62,.9)+zap(62,40,1)+spark(104,36,C.red) ],
    l:[["this — мимо прокси","this — skips the proxy"],["N+1: по одной коробке","N+1: one box at a time"],["ленивое после закрытия","lazy after it's closed"]],
    c:["Три моих шишки: обошёл обёртку, носил по одной коробке, полез в закрытый ящик.","My three bumps: skipped the wrapper, carried one box at a time, reached into a closed crate."] };

  /* ===== Транзакции Spring ===== */
  Z["Транзакции Spring|Propagation: что будет, если транзакция уже есть"]={
    p:[ bg(4)+tx(8,14,104,70)+bot(90,82,.8,{hat:"cap",arms:"hold",item:card(0,0,14,16,"#fff")})+B(38,.95,"happy","hold",card(0,0,14,16,"#fff")),
        bg(0)+tx(6,10,66,74)+`<g opacity=".5">`+bot(30,82,.75,{hat:"cap",mood:"sleep"})+`</g>`+T(56,24,"||",11,C.wood2)+tx(76,24,40,60,C.grn)+B(96,.8,"think","hold",card(0,0,14,16,"#fff")),
        bg(1)+tx(6,10,66,74,C.red)+bot(30,82,.75,{hat:"cap",mood:"sad"})+L("M50 26 a8 8 0 1 0 8 -8",C.red,2)+tx(76,24,40,60,C.grn)+B(96,.8,"happy","hold",card(0,0,14,16,"#fff"))+ok(96,18,.7) ],
    l:[["REQUIRED: вхожу в общую","REQUIRED: join the one"],["NEW: открываю свою","NEW: open my own"],["общую откатили — моя цела","outer undone, mine kept"]],
    c:["REQUIRED — работаю в общем кабинете. REQUIRES_NEW — в своём: мои бумаги останутся.","REQUIRED — I work in the shared room. REQUIRES_NEW — in my own: my papers stay."] };

  Z["Транзакции Spring|Откат только на unchecked"]={
    p:[ bg(2)+cloud(80,56,.9,C.grey)+T(80,74,"Runtime",7)+bell(86,24,.9,true)+B(30,.95,"wow","point"),
        bg(3)+cloud(80,56,.9,"#c9efb0")+T(80,74,"Exception",7)+bell(86,24,.9,false)+ok(108,24,.6)+B(30,.95,"sweat","down"),
        bg(4)+bell(86,30,.9,true)+card(86,62,46,14,"#fff",T(0,3,"rollbackFor",6.5,C.blue))+B(30,.95,"happy","reach",key(0,0,.7)) ],
    l:[["Runtime — откат","Runtime — rollback"],["checked — тишина, коммит!","checked — silent commit!"],["rollbackFor — откат","rollbackFor — rollback"]],
    c:["Мой звонок звенит на дым, но не на газ. Нужен газ — подключаю его через rollbackFor.","My alarm rings for smoke, not for gas. For gas I wire it up with rollbackFor."] };

  Z["Транзакции Spring|readOnly — не просто подсказка"]={
    p:[ bg(0)+B(30,.95,"sweat","reach",mag(0,0,.9))+[[80,40],[102,40],[80,70],[102,70]].map(p=>box(p[0],p[1],14,12)+fake(`<rect x="${p[0]+4}" y="${p[1]-16}" width="10" height="9" fill="none" stroke="${C.ink}"/>`)).join(""),
        bg(1)+[[86,40],[104,40],[86,70],[104,70]].map(p=>box(p[0],p[1],14,12)).join("")+T(44,16,"readOnly",10,C.grn)+B(44,1,"happy","hold",ok(0,0,.8),{legs:"run"}),
        bg(2)+db(98,34,.7)+T(98,58,"…",10)+L("M86 46 Q80 56 76 60",C.grey,1.4,1)+db(66,66,.6,C.grn)+B(26,.95,"happy","hold",book(0,0,.8,C.grn)) ],
    l:[["слежу за каждым объектом","watching every object"],["readOnly: не слежу","readOnly: no watching"],["читаю с копии базы","I read from a replica"]],
    c:["С пометкой «только посмотреть» мне не надо следить за изменениями, и читать можно с копии.","Marked \"just looking\", I skip change tracking and can read from a copy."] };

  Z["Транзакции Spring|Границы держи узкими"]={
    p:[ bg(3)+tx(6,12,108,72)+db(96,62,.6)+clock(96,26,.7,7)+B(44,.95,"sweat","hold",env(0,0,.6)),
        bg(4)+pool(12,16,5,5)+B(28,.9,"sleep","hold",env(0,0,.5),{legs:"sit"})+kid(78,82,.8,C.red,"sad")+kid(100,82,.8,C.grn,"sad"),
        bg(0)+tx(6,26,62,58)+db(52,66,.55)+B(24,.9,"happy","reach")+env(94,44,.7)+L("M70 52 H82",C.ink,1.6)+pool(78,18,3,0) ],
    l:[["внутри и база, и письмо","DB and mail inside"],["соединения кончились","connections ran out"],["внутри — только база","only the DB inside"]],
    c:["В транзакции я только говорю с базой. Письмо отправлю потом, а соединение верну сразу.","In a transaction I only talk to the DB. Mail goes later; the connection goes back at once."] };

  /* ===== Quarkus ===== */
  Z["Quarkus|Зачем понадобился ещё один фреймворк"]={
    p:[ bg(1)+train(86,80,1)+clock(34,22,.7,4)+B(40,.95,"sweat","push"),
        bg(2)+[0,1,2].map(i=>kid(68+i*18,82,.65,[C.red,C.grn,C.blue][i])).join("")+fake(bot(46,82,.65,{mood:"sleep"}))+B(18,.8,"dizzy","up"),
        bg(3)+cloud(88,30,1.2)+T(88,34,"MB",9,C.blue)+coin(76,60)+coin(92,66)+B(34,.95,"sad","reach",coin(0,0,.9)) ],
    l:[["долго греется, ест память","slow start, lots of RAM"],["всплеск — копии не успели","spike — copies too slow"],["облако берёт за память","the cloud bills memory"]],
    c:["Я тяжёлый, как тепловоз: долго разгоняюсь и много ем. В облаке это дорого.","I'm heavy like a locomotive: slow to start and hungry. In the cloud that's costly."] };

  Z["Quarkus|Главная идея: работать на сборке, а не на старте"]={
    p:[ bg(4)+crate(86,80,34,16,C.wood)+R(70,48,20,14,C.wood,1,C.wood2)+paper(104,42,["1","2","3"],8)+clock(56,22,.6,9)+B(34,.95,"sweat","reach",key(0,0,.6,C.grey)),
        bg(0)+gear(92,40,1,C.grey)+gear(104,62,.6,C.yel)+cab(80,80,20,26)+B(36,.95,"happy","reach",key(0,0,.6,C.grey),{hat:"helmet"}),
        bg(1)+B(44,1,"happy","carry",cab(0,10,22,22))+T(96,36,"ms",11,C.grn)+spark(96,60) ],
    l:[["Spring: разбор на старте","Spring: work at startup"],["Quarkus: всё на сборке","Quarkus: work at build"],["дома — только поставить","at home — just place it"]],
    c:["Шкаф собирают на фабрике, а не у тебя дома. Мне на старте остаётся только поставить его.","The cabinet is built at the factory, not at home. At start I just set it in place."] };

  Z["Quarkus|Native image: программа без JVM"]={
    p:[ bg(2)+B(32,.95,"think","hold",card(0,0,16,18,"#fff",L("M-4 -4 h8 M-4 0 h8 M-4 4 h6",C.grey,1.2)),{glasses:true})+T(84,30,"JVM",11,C.blue)+L("M66 48 H102 M66 58 H96 M66 68 H100",C.grey,1.8),
        bg(3)+press(92,80,1)+T(92,20,"GraalVM",8,C.blue)+clock(54,22,.6,10)+B(34,.95,"sweat","push"),
        bg(4)+B(40,1,"happy","hold",book(0,0,.8,C.blue),{legs:"run"})+T(94,36,"ms",12,C.grn)+G(94,64,.6,chip(0,0,T(0,4,"↓",12,C.yel))),
        bg(0)+book(84,58,1.4,C.blue)+no(84,26,.8)+B(32,.95,"think","reach",pencil(0,0,.9)) ],
    l:[["JVM переводит с листа","the JVM reads aloud"],["GraalVM печатает книгу","GraalVM prints the book"],["старт за миллисекунды","starts in milliseconds"],["на ходу не поменять","no edits on the fly"]],
    c:["Я заранее печатаю книгу, а не читаю с листа. Быстро и легко, но текст уже не поменять.","I print the book ahead instead of reading aloud. Fast and light, but the text is fixed."] };

  Z["Quarkus|Почему рефлексия — враг native"]={
    p:[ bg(1)+bin(96,80,1)+B(46,.95,"happy","carry",box(0,8,18,14))+L("M64 26 Q84 20 92 48",C.ink,1.4,1),
        bg(2)+bin(104,80,1)+card(30,22,30,13,"#fff",T(0,3,"\"Foo\"",7,C.red))+B(40,.95,"think","reach",box(0,6,14,12,"Foo")),
        bg(3)+shelf(66,52,48)+fake(`<rect x="82" y="40" width="14" height="12" fill="none" stroke="${C.ink}"/>`)+zap(96,26,.9,C.red)+no(110,70,.7)+B(34,.95,"dizzy","reach"),
        bg(4)+shelf(66,52,48)+box(90,52,16,14,"Foo")+note(106,22,"✓",C.grn)+B(36,.95,"happy","point") ],
    l:[["ненужное — в мусор","unused — to the bin"],["класс по имени-строке","a class named in a string"],["в проде — пусто, падение","prod: empty, crash"],["регистрирую вручную","I register it by hand"]],
    c:["При сборке я выбрасываю, что не вызывают. Класс по строке не вижу — помечаю его вручную.","At build I toss what nobody calls. A class named in a string I can't see — I tag it by hand."] };

  Z["Quarkus|Когда что выбирать"]={
    p:[ bg(0)+shelf(52,36,62)+shelf(52,62,62)+[58,72,86,100].map((x,i)=>box(x,36,11,11,null,[C.red,C.blue,C.grn,C.yel][i])+box(x+4,62,11,11,null,[C.blue,C.yel,C.red,C.grn][i])).join("")+kid(80,82,.55,C.red)+kid(100,82,.55,C.grn)+B(24,.95,"happy","point"),
        bg(1)+scoot(56,82,1.2)+bot(54,74,.95,{mood:"happy",arms:"reach"})+T(100,30,"ms",11,C.grn),
        bg(2)+G(80,80,1.2,balance(0,0,-8,coin(-26,-24,.8)+coin(-26,-30,.8),kid(26,-21,.4,C.red)))+B(20,.95,"think","point") ],
    l:[["Boot: огромная экосистема","Boot: a huge ecosystem"],["Quarkus: быстрый и лёгкий","Quarkus: quick and light"],["взвесь счёт и найм","weigh bill vs hiring"]],
    c:["Не «что новее», а что дешевле у тебя: счёт за облако против людей и готовых решений.","Not \"what's newer\" but what's cheaper for you: the cloud bill versus people and ready answers."] };

  /* ===== Многопоточность ===== */
  Z["Многопоточность|Зачем вообще потоки"]={
    p:[ bg(3)+stove(84,80,true,true)+T(84,36,"DB…",8,C.grey)+B(36,.95,"sleep","down",null,{legs:"sit",hat:"chef"}),
        bg(4)+stove(74,48,false)+stove(102,48,false)+stove(74,78,true,true)+stove(102,78,false)+T(88,16,"CPU",9,C.blue)+B(30,.9,"think","point",null,{hat:"chef"}),
        bg(0)+stove(30,52,true,true)+stove(90,52,true,true)+B(52,.85,"happy","reach",null,{hat:"chef"})+bot(108,82,.7,{hat:"cap",arms:"reach",flip:true,mood:"happy"})+bot(14,82,.6,{hat:"cap",mood:"smile",arms:"hold",item:pot(0,4,.6)}) ],
    l:[["жду базу — CPU спит","waiting on DB — CPU idle"],["ядер много — я на одном","many cores, I use one"],["больше поваров — дело идёт","more cooks — work flows"]],
    c:["Пока суп варится, я стою без дела. Позову ещё поваров — займут паузу и все плиты.","While the soup boils I just stand there. More cooks fill the pause and every stove."] };

  Z["Многопоточность|Потоки делят память — отсюда все беды"]={
    p:[ bg(1)+board(32,34,40,28,T(0,4,"1",11,"#fff"))+board(90,34,40,28,T(0,4,"2",11,"#fff"))+L("M60 12 V84",C.ink,2)+B(30,.8,"smile","reach")+bot(90,82,.7,{hat:"cap",arms:"reach",mood:"smile"}),
        bg(2)+board(60,30,84,30,T(-18,4,"1",11,"#fff")+T(18,4,"2",11,"#fff"))+B(36,.85,"happy","up")+bot(86,82,.75,{hat:"cap",arms:"up",mood:"happy"}),
        bg(3)+board(60,30,84,30,mess(0,0,1.4)+T(0,-6,"?",9,C.yel))+B(36,.85,"dizzy","up")+bot(86,82,.75,{hat:"cap",arms:"up",mood:"angry"}) ],
    l:[["процессы: у каждого своя","processes: a board each"],["потоки: одна на всех","threads: one shared board"],["пишут в одно место — каша","same spot — a mess"]],
    c:["Мы с другом пишем на одной доске — быстро. Но если в одну клетку сразу — выйдет каша.","My friend and I write on one board — it's fast. Same spot at once — a mess."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 3 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const sm=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const line=(x1,y1,x2,y2,col,w,dash)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="${w||1.6}" stroke-linecap="round" ${dash?'stroke-dasharray="3 2.5"':""} fill="none"/>`;
  const arrowL=(x1,y,x2,col)=>line(x1,y,x2+4,y,col,2)+`<path d="M${x2+6} ${y-4} L${x2} ${y} L${x2+6} ${y+4}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const nb=(x,y,v,col,w,h)=>card(x,y,w||20,h||16,"#fff",txt(0,4.5,v,11,col||C.ink));
  const tag=(x,y,t,col,w)=>card(x,y,w||36,12,col||C.blue,txt(0,3,t,7,"#fff"));
  const bolt=(x,y,s)=>sm(x,y,s||1,`<path d="M2 -12 L-6 2 H0 L-3 12 L7 -3 H1 Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.1" stroke-linejoin="round"/>`);
  const slash=(x,y,r)=>line(x-r,y+r,x+r,y-r,C.red,2.6);
  const ball=(x,y,col)=>`<circle cx="${x}" cy="${y}" r="3.4" fill="${col||C.ant}" stroke="${C.ink}" stroke-width=".8"/>`;
  /* Бит и второй Бит (в красной кепке) */
  const B=(x,y,s,o)=>bot(x,y,s,o);
  const B2=(x,y,s,o)=>bot(x,y,s,Object.assign({hat:"cap"},o||{}));
  /* предмет в руке, нарисованный отдельно (для flip: цифры не зеркалятся) */
  const hand=(x,y,s,a,flip,inner)=>{ const m=a==="carry"?[0,-62]:a==="hold"?[0,-12]:[26,-22]; return sm(x+(flip?-1:1)*m[0]*s, y+m[1]*s, s, inner); };
  /* доска-мольберт с числом */
  const easel=(x,v,col,y)=>{ y=y||56; return line(x-9,y+10,x-13,80,C.wood2,2.4)+line(x+9,y+10,x+13,80,C.wood2,2.4)+card(x,y,30,24,"#2f5d50",txt(0,6,v,15,col||"#fff")); };
  /* мини-облачко с одним знаком */
  const qb=(x,y,v,col)=>`<circle cx="${x}" cy="${y}" r="8" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>`+txt(x,y+3.5,v,10,col||C.ink)+`<circle cx="${x-7}" cy="${y+10}" r="1.6" fill="#fff" stroke="${C.ink}" stroke-width=".8"/>`;
  /* дверь */
  const door=(x,y,h,col)=>{ h=h||50; return `<rect x="${x-12}" y="${y-h}" width="24" height="${h}" rx="2" fill="${col||C.wood}" stroke="${C.wood2}" stroke-width="1.4"/><circle cx="${x-7}" cy="${y-h/2}" r="1.6" fill="${C.ink}"/>`; };
  /* окошко-служба с вывеской */
  const booth=(x,lab,col)=>`<rect x="${x-22}" y="30" width="44" height="50" rx="2" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><path d="M${x-25} 30 h50 l-4 -8 h-42 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.1"/><rect x="${x-14}" y="40" width="28" height="18" rx="2" fill="#dfe9ff" stroke="${C.ink}"/><path d="M${x-22} 58 h44" stroke="${C.ink}" stroke-width="2"/>`+(lab?tag(x,16,lab,C.ink,40):"");
  /* стол */
  const desk=(x,w,top)=>{ top=top||60; return `<rect x="${x-w/2}" y="${top}" width="${w}" height="5" rx="2" fill="${C.wood}" stroke="${C.wood2}"/><path d="M${x-w/2+4} ${top+5} V80 M${x+w/2-4} ${top+5} V80" stroke="${C.wood2}" stroke-width="2.6"/>`; };
  /* тележка = поток ОС */
  const cart=(x,y,w)=>{ w=w||40; return `<rect x="${x-w/2}" y="${y-10}" width="${w}" height="6" rx="2" fill="#4a5168" stroke="${C.ink}" stroke-width="1.1"/><circle cx="${x-w/2+7}" cy="${y-2}" r="3.5" fill="${C.ink}"/><circle cx="${x+w/2-7}" cy="${y-2}" r="3.5" fill="${C.ink}"/>`+txt(x,y-5.4,"OS",5.5,"#fff"); };
  /* стеллаж с полками; locks: 0 — нет, 1 — один большой, 2 — по замку на полку */
  const rack=(x0,y0,w,locks)=>{ const h=48; let s=`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#f6e6d0" stroke="${C.wood2}" stroke-width="1.6"/>`;
    [1,2].forEach(i=>s+=line(x0,y0+i*h/3,x0+w,y0+i*h/3,C.wood2,1.6));
    for(let r=0;r<3;r++) for(let c=0;c<2;c++) s+=box(x0+w*(c+1)/3,y0+(r+1)*h/3,9,8,null,C.wood);
    if(locks===1) s+=lock(x0+w/2,y0+h/2-4,1.3);
    if(locks===2) for(let r=0;r<3;r++) s+=lock(x0+w-5,y0+r*h/3+7,.45);
    return s; };
  /* труба (цепочка операторов) */
  const pipe=(x1,x2,y,col)=>`<rect x="${x1}" y="${y-6}" width="${x2-x1}" height="12" rx="3" fill="${col||C.grey}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const joint=(x,y,lab,col)=>`<rect x="${x-12}" y="${y-9}" width="24" height="18" rx="2" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.1"/>`+(lab?txt(x,y+2.5,lab,6.5,"#fff"):"");
  /* стопка коробок */
  const stack=(x,y,n,w)=>{ w=w||14; let s=""; for(let i=0;i<n;i++) s+=box(x+(i%2?1.5:-1.5),y-i*10,w,10,null,C.wood); return s; };
  /* билетик/номерок */
  const ticket=(x,y,v,col)=>`<g transform="translate(${x} ${y})"><rect x="-8" y="-6" width="16" height="12" rx="2" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1"/>${txt(0,3,v,7)}</g>`;
  const shirt=(x,y,col)=>`<path d="M${x-10} ${y-8} l5 -4 h10 l5 4 l-3 4 l-3 -2 v12 h-8 v-12 l-3 2 z" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.1" stroke-linejoin="round"/>`;
  const flag=(col)=>`<path d="M0 6 V-14" stroke="${C.ink}" stroke-width="1.6"/><path d="M0 -14 h11 l-3 4 l3 4 h-11 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width=".8"/>`;
  /* турникет с числом мест */
  const gate=(x,v)=>`<rect x="${x-3}" y="44" width="6" height="36" rx="2" fill="${C.grey}" stroke="${C.ink}"/><path d="M${x} 56 h16" stroke="${C.red}" stroke-width="3" stroke-linecap="round"/>`+card(x,34,20,14,"#2f5d50",txt(0,4,v,9,"#fff"));
  /* машина */
  const car=(x,y,lab,col)=>`<path d="M${x-22} ${y-6} v-10 h10 l6 -9 h16 l6 9 h6 v10 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/><rect x="${x-9}" y="${y-23}" width="8" height="6" fill="#dfe9ff"/><rect x="${x+1}" y="${y-23}" width="8" height="6" fill="#dfe9ff"/><circle cx="${x-13}" cy="${y-5}" r="4.5" fill="${C.ink}"/><circle cx="${x+13}" cy="${y-5}" r="4.5" fill="${C.ink}"/>${lab?txt(x,y-9,lab,5.5,"#fff"):""}`;
  /* столик с меню */
  const table=(x,w)=>desk(x,w||26,62);
  const tray=`<ellipse cx="0" cy="0" rx="11" ry="2.6" fill="${C.grey}" stroke="${C.ink}"/><path d="M-5 -2 q5 -10 10 0" fill="#fff" stroke="${C.ink}"/>`;
  /* мини-дерево индекса */
  const mtree=(x,y,sc,hot)=>{ sc=sc||1; const n=(cx,cy,on)=>`<circle cx="${cx}" cy="${cy}" r="${4*sc}" fill="${on?C.yel:C.grn}" stroke="${C.ink}"/>`;
    return line(x,y,x-12*sc,y+14*sc,C.ink,1.2)+line(x,y,x+12*sc,y+14*sc,C.ink,1.2)+line(x+12*sc,y+14*sc,x+5*sc,y+28*sc,C.ink,1.2)+line(x+12*sc,y+14*sc,x+19*sc,y+28*sc,C.ink,1.2)
      +n(x,y,hot)+n(x-12*sc,y+14*sc)+n(x+12*sc,y+14*sc,hot)+n(x+5*sc,y+28*sc)+n(x+19*sc,y+28*sc,hot); };
  /* картотека-таблица */
  const grid=(x0,y0,hiR,hiC)=>{ const cw=18,rh=10,hd=["id","$","qty"],rows=[["1","50","2"],["2","90","1"],["3","20","5"]]; let s="";
    for(let c=0;c<3;c++) s+=`<rect x="${x0+c*cw}" y="${y0}" width="${cw}" height="${rh}" fill="${hiC===c?C.blue:"#8a93ad"}" stroke="${C.ink}" stroke-width="1"/>`+txt(x0+c*cw+cw/2,y0+7.5,hd[c],6.5,"#fff");
    rows.forEach((r,i)=>r.forEach((v,c)=>{ s+=`<rect x="${x0+c*cw}" y="${y0+(i+1)*rh}" width="${cw}" height="${rh}" fill="${hiR===i?C.yel:hiC===c?"#cfe5fb":"#fff"}" stroke="${C.ink}" stroke-width="1"/>`+txt(x0+c*cw+cw/2,y0+(i+1)*rh+7.5,v,6.5,C.ink,hiR===i||hiC===c?900:600); }));
    return s; };
  const crack=(x,y)=>`<path d="M${x} ${y} l3 5 l-3 4 l4 5" stroke="${C.red}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  const zz=(x,y)=>`<text x="${x}" y="${y}" font-size="9" font-weight="900" fill="${C.blue}" font-family="system-ui">z</text><text x="${x+6}" y="${y-6}" font-size="7" font-weight="900" fill="${C.blue}" font-family="system-ui">z</text>`;
  const web=(x,y)=>`<path d="M${x} ${y} l10 0 M${x} ${y} l0 10 M${x} ${y} l8 8 M${x+5} ${y} q1 4 -5 5 M${x+9} ${y} q1 8 -9 9" stroke="${C.grey}" stroke-width=".9" fill="none"/>`;
  const bin=(x)=>`<path d="M${x-8} 62 h16 l-2 18 h-12 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><path d="M${x-10} 62 h20" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`;
  const knife=`<path d="M-10 2 h8 v-4 h-8 z" fill="${C.wood2}"/><path d="M-2 -2 h14 q-2 6 -14 4 z" fill="#e8eef7" stroke="${C.ink}" stroke-width=".8"/>`;
  const plate=(x,y)=>`<ellipse cx="${x}" cy="${y}" rx="12" ry="3.6" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>`;
  const book=(x,y,w,h,col)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" rx="1.5" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.1"/><path d="M${x-w/2+3} ${y-h} v${h}" stroke="#fff" stroke-width="1" opacity=".7"/>`;
  const elephant=(x,y,s)=>sm(x,y,s||1,`<ellipse cx="0" cy="-12" rx="14" ry="10" fill="#7b9fd1" stroke="${C.ink}" stroke-width="1.1"/><circle cx="12" cy="-18" r="8" fill="#7b9fd1" stroke="${C.ink}" stroke-width="1.1"/><path d="M18 -16 q6 6 2 14" stroke="#7b9fd1" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="7" cy="-18" rx="4" ry="6" fill="#9cb8e0" stroke="${C.ink}" stroke-width=".8"/><circle cx="14" cy="-20" r="1.2" fill="${C.ink}"/><path d="M-9 -4 v6 M-2 -4 v6 M5 -4 v6" stroke="#7b9fd1" stroke-width="4" stroke-linecap="round"/>`);

  const Z={}, M="Многопоточность|", J="java.util.concurrent|", V="Virtual threads|", R="Реактивность|", D="Базы данных|", P="PostgreSQL|";

  /* 0 — гонка */
  Z[M+"Гонка: почему count++ теряет значения"]={
    p:[ bg(0)+easel(60,"5")+B(24,82,.85,{mood:"think",arms:"point"})+B2(96,82,.85,{flip:true,mood:"think",arms:"point"}),
        bg(1)+easel(60,"5")+B(24,82,.85,{mood:"smile",arms:"hold",item:nb(0,0,"6",C.blue)})+B2(96,82,.85,{flip:true,mood:"smile",arms:"hold"})+hand(96,82,.85,"hold",true,nb(0,0,"6",C.blue))+txt(24,22,"+1",10,C.grn)+txt(96,22,"+1",10,C.grn),
        bg(2)+easel(60,"6")+B(22,82,.85,{mood:"happy",arms:"reach"})+B2(98,82,.85,{flip:true,mood:"happy",arms:"reach"})+hand(22,82,.85,"reach",false,nb(0,0,"6",C.red))+hand(98,82,.85,"reach",true,nb(0,0,"6",C.grn)),
        bg(3)+easel(60,"6")+txt(60,34,"≠ 7",13,C.red)+B(24,82,.85,{mood:"wow",arms:"up"})+B2(96,82,.85,{flip:true,mood:"sweat"}) ],
    l:[["оба прочли 5","both read 5"],["оба прибавили 1","both add 1"],["оба записали 6","both write 6"],["было два +1, а стало 6","two +1s, and still 6"]],
    c:["count++ — это три шага. Мы с другом влезли между шагами, и одна единица пропала!","count++ is three steps. My friend and I squeezed in between, and one +1 vanished!"] };

  /* 1 — блокировка */
  Z[M+"Блокировка: пускаем по одному"]={
    p:[ bg(0)+door(78,80,54)+lock(68,54,.9)+B(32,82,.95,{mood:"think",arms:"reach",item:key(0,0,.8)}),
        bg(1)+`<rect x="4" y="12" width="112" height="62" rx="4" fill="#f6e6d0" opacity=".7"/>`+lock(100,26,.9)+easel(84,"7",C.yel)+B(38,82,1,{mood:"happy",arms:"hold",item:nb(0,0,"7",C.grn)})+ok(18,24,.8),
        bg(2)+door(104,80,54)+lock(100,54,.7)+B2(74,82,.85,{mood:"sweat"})+kid(52,82,.8,C.grn,"sad")+kid(32,82,.8,C.yel,"sad")+kid(12,82,.8,"#c86bfa","sad")+clock(40,20,1,4) ],
    l:[["у двери — с ключом","at the door with a key"],["внутри один: счёт 7","one inside: count is 7"],["остальные ждут","the rest wait in line"]],
    c:["Захожу с ключом — и я внутри один, счёт верный. Но остальные стоят в очереди и ждут.","I go in with the key and I'm alone inside: the count is right. But everyone else waits."] };

  /* 2 — видимость */
  Z[M+"Видимость: изменение может не дойти"]={
    p:[ bg(0)+card(60,18,26,16,"#2f5d50",txt(0,4.5,"0",11,"#fff"))+B(24,82,.85,{mood:"smile",arms:"hold",item:nb(0,0,"0")})+B2(96,82,.85,{flip:true,mood:"smile",arms:"hold"})+hand(96,82,.85,"hold",true,nb(0,0,"0")),
        bg(1)+card(60,18,26,16,"#2f5d50",txt(0,4.5,"0",11,"#fff"))+B(24,82,.85,{mood:"happy",arms:"hold",item:nb(0,0,"1",C.grn)})+spark(42,40)+B2(96,82,.85,{flip:true,mood:"think",arms:"hold"})+hand(96,82,.85,"hold",true,nb(0,0,"0",C.red))+txt(108,30,"?",14,C.red),
        bg(2)+easel(86,"1",C.yel)+tag(86,30,"volatile",C.blue,40)+B2(36,82,.95,{mood:"wow",arms:"point"})+ok(14,22,.8) ],
    l:[["у каждого своя копия","each has his own copy"],["я записал — он не видит","I wrote it — he can't see"],["volatile: смотри на доску","volatile: check the board"]],
    c:["Я поменял у себя 0 на 1, а друг смотрит в свою старую копию. volatile велит читать свежее.","I changed my 0 to 1, but my friend reads his old copy. volatile says: always read fresh."] };

  /* 3 — volatile ≠ атомарность */
  Z[M+"volatile ≠ атомарность"]={
    p:[ bg(0)+easel(60,"5")+tag(60,30,"volatile",C.blue,40)+B(22,82,.85,{mood:"wow",arms:"point"})+B2(98,82,.85,{flip:true,mood:"wow",arms:"point"}),
        bg(1)+easel(60,"6")+tag(60,30,"volatile",C.blue,40)+B(22,82,.85,{mood:"smile",arms:"reach"})+B2(98,82,.85,{flip:true,mood:"smile",arms:"reach"})+hand(22,82,.85,"reach",false,nb(0,0,"6",C.red))+hand(98,82,.85,"reach",true,nb(0,0,"6",C.grn)),
        bg(2)+easel(60,"6")+txt(60,34,"≠ 7",13,C.red)+B(22,82,.85,{mood:"dizzy",arms:"up"})+B2(98,82,.85,{flip:true,mood:"sad"}),
        bg(3)+easel(84,"7",C.yel)+tag(84,30,"Atomic",C.grn,36)+B(36,82,1,{mood:"happy",arms:"hold",item:nb(0,0,"+1",C.grn)}) ],
    l:[["оба видят свежее 5","both see a fresh 5"],["оба пишут 6","both write 6"],["единица всё равно пропала","a +1 is still lost"],["лечит Atomic","Atomic fixes it"]],
    c:["volatile даёт мне свежий взгляд, но не мешает нам обоим влезть в count++ разом.","volatile gives me a fresh look, but doesn't stop us both doing count++ at once."] };

  /* 4 — дедлок */
  const walls=`<rect x="1" y="8" width="118" height="5" fill="${C.grey}"/>`;
  Z[M+"Дедлок: оба ждут вечно"]={
    p:[ bg(0)+walls+B(28,82,.9,{mood:"smile",arms:"hold",item:box(0,8,18,16,"A",C.blue)})+B2(92,82,.9,{flip:true,mood:"smile",arms:"hold"})+hand(92,82,.9,"hold",true,box(0,8,18,16,"B",C.red)),
        bg(1)+walls+B(28,82,.9,{mood:"angry",arms:"hold",item:box(0,8,18,16,"A",C.blue)})+B2(92,82,.9,{flip:true,mood:"angry",arms:"hold"})+hand(92,82,.9,"hold",true,box(0,8,18,16,"B",C.red))+qb(50,22,"B",C.red)+qb(78,22,"A",C.blue),
        bg(2)+walls+B(28,82,.9,{mood:"sleep",legs:"sit",arms:"hold",item:box(0,8,18,16,"A",C.blue)})+B2(92,82,.9,{flip:true,mood:"sleep",legs:"sit",arms:"hold"})+hand(92,82,.9,"hold",true,box(0,8,18,16,"B",C.red))+clock(60,30,1,11)+web(2,13)+web(108,13) ],
    l:[["я взял A, он взял B","I take A, he takes B"],["мне нужен B, ему — A","I need B, he needs A"],["стоим вечно","stuck forever"]],
    c:["Я держу A и жду B, а друг держит B и ждёт A. Никто не уступит — и мы молча висим.","I hold A and wait for B, my friend holds B and waits for A. Nobody yields: we just hang."] };

  /* 5 — пул */
  Z[M+"Пул потоков вместо создания на каждый чих"]={
    p:[ bg(0)+B(26,82,.9,{mood:"sweat",arms:"reach",item:coin(0,0,1)})+kid(68,82,.75,C.grn)+kid(86,82,.75,C.yel)+kid(104,82,.75,"#c86bfa")+coin(60,22,.9)+coin(76,18,.9)+coin(92,22,.9),
        bg(1)+kid(78,82,.7,C.grn)+kid(94,82,.7,C.yel)+kid(110,82,.7,"#c86bfa")+box(78,50,12,9,null)+box(94,50,12,9,null)+box(110,50,12,9,null)+B(30,82,.95,{mood:"happy",arms:"hold",item:card(0,0,18,22,"#fff",line(-5,-5,5,-5)+line(-5,0,5,0)+line(-5,5,5,5))}),
        bg(2)+stack(92,80,6)+B(40,82,.9,{mood:"sweat",arms:"carry",item:stack(0,8,3)})+txt(92,14,"∞",14,C.red),
        bg(3)+stack(16,80,5)+stack(104,80,6)+stack(88,80,3)+txt(60,18,"OOM",12,C.red)+B(52,82,.95,{mood:"dizzy",arms:"up"}) ],
    l:[["новый на каждую — дорого","a new one each: costly"],["3 рабочих и список","3 workers and a list"],["список без края копится","the endless list grows"],["память кончилась","out of memory"]],
    c:["Не нанимаю рабочего под каждую мелочь, держу троих и список. Но список без края лопнет!","I don't hire per chore: I keep three workers and a list. But an endless list will burst!"] };

  /* 6 — ExecutorService */
  Z[J+"Не создавай потоки руками"]={
    p:[ bg(0)+kid(66,82,.7,C.grn)+kid(84,82,.7,C.yel)+kid(102,82,.7,"#c86bfa")+txt(66,40,"+1",8,C.red)+txt(84,40,"+1",8,C.red)+txt(102,40,"+1",8,C.red)+B(28,82,.9,{mood:"dizzy",arms:"up"})+txt(28,18,"?",13,C.red),
        bg(1)+booth(88,"Executor")+B(38,82,.95,{mood:"think",arms:"push",item:box(0,7,16,14,null)}),
        bg(2)+booth(80,"Executor")+kid(70,82,.62,C.grn)+kid(92,82,.62,C.yel)+box(70,54,10,8,null)+box(92,54,10,8,null)+B(26,82,.9,{mood:"happy",legs:"sit",arms:"wave"}) ],
    l:[["new Thread — сколько их?","new Thread — how many?"],["отдаю задачу в окошко","hand the task in"],["служба сама раздаст","the service shares it out"]],
    c:["Не нанимаю рабочего на каждую мелочь. Отдаю задачу в ExecutorService — он раздаст сам.","I don't hire a worker per chore. I hand tasks to ExecutorService and it shares them out."] };

  /* 7 — Future */
  Z[J+"Future — обещание результата"]={
    p:[ bg(0)+desk(92,40)+kid(96,58,.7,C.blue)+B(40,82,.95,{mood:"smile",arms:"reach",item:ticket(0,0,"#7")}),
        bg(1)+desk(92,40)+kid(96,58,.7,C.blue)+B(46,82,.95,{mood:"sleep",arms:"hold",item:ticket(0,0,"#7")})+clock(20,22,1,9)+txt(60,18,"get()",8,C.ink),
        bg(2)+B(46,82,.95,{mood:"happy",legs:"run",arms:"carry",item:box(0,8,18,14,null,C.grn)})+spark(100,56)+spark(14,30),
        bg(3)+desk(92,40)+kid(96,58,.7,C.blue)+B(42,82,.95,{mood:"wow",arms:"hold",item:shirt(0,0,C.blue)})+ok(14,22,.8)+txt(68,18,"get()",8,C.ink) ],
    l:[["submit — номерок","submit — a ticket"],["get() сразу — стою зря","instant get(): I just wait"],["а лучше — по делам","better: go do things"],["get() — забрал готовое","get() — pick it up"]],
    c:["Future — номерок из химчистки. Взял и ушёл по делам — правильно. Стою у стойки — зря.","Future is a laundry ticket. Take it and go do things. Stand at the counter — no point."] };

  /* 8 — CompletableFuture */
  Z[J+"CompletableFuture — цепочки без блокировок"]={
    p:[ bg(0)+door(92,80,56)+B(52,82,.95,{mood:"sad"})+clock(26,22,1,10)+zz(70,36),
        bg(1)+door(92,80,56)+card(92,40,18,18,"#fff",txt(0,-2,"then",5.5,C.ink)+txt(0,6,"→✓",7,C.grn))+B(52,82,.95,{mood:"think",arms:"point"}),
        bg(2)+door(100,80,56)+card(100,40,14,14,"#fff",txt(0,3,"→✓",6,C.grn))+kid(80,82,.8,C.yel)+box(80,58,12,10,null)+B(28,82,.9,{mood:"happy",arms:"hold",item:`<circle r="7" fill="${C.ant}" stroke="${C.ink}"/><path d="M-7 0 h14" stroke="#fff" stroke-width="1.4"/>`}) ],
    l:[["стою у двери — зря","waiting at the door: waste"],["оставляю записку","I leave a note"],["цепочка идёт сама","the chain runs itself"]],
    c:["Я не стою у двери, а оставляю записку: пришло — сделай это, потом то. А сам играю.","I don't wait by the door. I leave a note: when it comes, do this, then that. And I play."] };

  /* 9 — CAS */
  Z[J+"Atomic и CAS — быстрее лока"]={
    p:[ bg(0)+easel(84,"5")+B(34,82,.95,{mood:"think",arms:"hold",item:nb(0,0,"5")}),
        bg(1)+easel(78,"6",C.yel)+B2(108,82,.55,{flip:true,mood:"happy",arms:"up"})+B(34,82,.95,{mood:"wow",arms:"hold",item:nb(0,0,"5",C.red)})+txt(58,28,"≠",14,C.red)+`<path d="M14 24 a8 8 0 1 1 3 6" fill="none" stroke="${C.blue}" stroke-width="2"/>`,
        bg(2)+easel(84,"7",C.yel)+lock(108,22,.7,true)+B(34,82,.95,{mood:"happy",arms:"reach",item:nb(0,0,"7",C.grn)})+ok(14,22,.8) ],
    l:[["прочитал 5","I read 5"],["уже 6 — пробую заново","now 6: try again"],["6 на месте — пишу 7","still 6: write 7"]],
    c:["Пишу новое, только если старое не поменялось. Поменялось — читаю ещё раз. Без очереди!","I write only if the old value didn't change. If it did, I re-read and retry. No line!"] };

  /* 10 — ConcurrentHashMap */
  Z[J+"ConcurrentHashMap вместо synchronized"]={
    p:[ bg(0)+rack(66,22,46,0)+`<path d="M60 18 a26 26 0 1 1 -2 4" fill="none" stroke="${C.red}" stroke-width="2" stroke-dasharray="4 3"/>`+B(30,82,.9,{mood:"dizzy",arms:"up"}),
        bg(1)+rack(66,22,46,1)+B(48,82,.9,{mood:"smile",arms:"reach"})+B2(16,82,.8,{mood:"sad"})+clock(26,16,.8,3),
        bg(2)+rack(66,22,46,2)+B(48,82,.9,{mood:"happy",arms:"reach"})+B2(18,82,.8,{mood:"happy",arms:"up"}) ],
    l:[["HashMap может зациклиться","HashMap can loop forever"],["замок на весь склад","one lock for all"],["замок на полку","a lock per shelf"]],
    c:["Не запираю весь склад ради одной полки. У каждой свой замок — и друг не ждёт зря.","I don't lock the whole store for one shelf. Each has its own lock, so my friend never waits."] };

  /* 11 — защёлка и семафор */
  Z[J+"Дождаться и ограничить"]={
    p:[ bg(0)+card(86,24,20,16,"#2f5d50",txt(0,4.5,"3",11,"#fff"))+kid(72,82,.7,C.grn)+kid(90,82,.7,C.yel)+kid(108,82,.7,"#c86bfa","wow")+B(32,82,.95,{mood:"think",arms:"hold",item:flag(C.red)}),
        bg(1)+card(86,24,20,16,"#2f5d50",txt(0,4.5,"0",11,C.yel))+kid(72,82,.7,C.grn)+kid(90,82,.7,C.yel)+kid(108,82,.7,"#c86bfa")+B(32,82,.95,{mood:"happy",arms:"carry",item:flag(C.grn)})+spark(56,20),
        bg(2)+gate(66,"2")+kid(90,82,.7,C.grn)+kid(104,82,.7,C.yel)+B(30,82,.9,{mood:"angry",hat:"helmet",arms:"push"}),
        bg(3)+gate(66,"2")+kid(106,82,.7,C.yel)+kid(86,82,.7,C.blue)+arrowR(78,30,92,C.grn)+B(30,82,.9,{mood:"happy",hat:"helmet",arms:"wave"}) ],
    l:[["latch: жду троих","latch: waiting for 3"],["0 — старт!","0 — go!"],["семафор: не больше 2","semaphore: max 2"],["вышел один — зашёл один","one out, one in"]],
    c:["Защёлка ждёт, пока все N будут готовы. Семафор пускает не больше N сразу. Я слежу за обоими.","A latch waits until all N are ready. A semaphore lets in at most N at once. I run both."] };

  /* 12 — что выбрать */
  Z[J+"Что выбрать в реальности"]={
    p:[ bg(0)+easel(88,"+1",C.yel)+tag(88,30,"Atomic",C.grn,34)+B(36,82,.95,{mood:"think",arms:"hold",item:nb(0,0,"+1",C.grn)}),
        bg(1)+rack(70,22,44,2)+tag(92,15,"CHM",C.blue,26)+B(46,82,.9,{mood:"smile",arms:"reach"}),
        bg(2)+booth(88,"Executor")+B(38,82,.95,{mood:"smile",arms:"push",item:stack(0,10,2,14)}),
        bg(3)+tag(84,22,"CF",C.ant,22)+`<g fill="none" stroke="${C.ink}" stroke-width="2.4">${[64,78,92,106].map(x=>`<ellipse cx="${x}" cy="46" rx="8" ry="5"/>`).join("")}</g>`+B(30,82,.95,{mood:"happy",arms:"reach",item:`<ellipse cx="0" cy="0" rx="8" ry="5" fill="none" stroke="${C.ink}" stroke-width="2.4"/>`}) ],
    l:[["счётчик — Atomic","counter — Atomic"],["общая карта — CHM","shared map — CHM"],["пачка задач — Executor","task batch — Executor"],["цепочка вызовов — CF","call chain — CF"]],
    c:["Беру готовый инструмент под задачу. Свой synchronized — только если ничего не подошло.","I pick the ready tool for the job. Hand-made synchronized only if nothing else fits."] };

  /* 13 — проблема обычных потоков */
  Z[V+"Проблема, которую они решают"]={
    p:[ bg(0)+B(56,82,1,{mood:"sweat",arms:"carry",item:box(0,10,30,22,"1 MB",C.wood)}),
        bg(1)+db(104,58,.9)+B(78,82,.85,{mood:"sleep"})+kid(54,82,.7,C.grn,"sad")+kid(38,82,.7,C.yel,"sad")+kid(22,82,.7,"#c86bfa","sad")+txt(20,22,"×1000",9,C.red)+clock(54,20,.9,8),
        bg(2)+kid(70,82,.7,C.grn,"sad")+kid(86,82,.7,C.yel,"sad")+kid(102,82,.7,"#c86bfa","sad")+zz(84,30)+coin(62,22,.8)+coin(78,16,.8)+B(30,82,.95,{mood:"sad",arms:"reach",item:coin(0,0,1)}) ],
    l:[["поток ОС: 1 МБ стека","OS thread: 1 MB stack"],["тысяча стоит у базы","a thousand wait on the DB"],["платим за ожидание","paying for waiting"]],
    c:["Каждый поток — тяжёлый рюкзак. Тысяча таких почти всё время просто ждёт базу.","Each thread is a heavy backpack. A thousand of them mostly just wait for the DB."] };

  /* 14 — как устроены виртуальные */
  Z[V+"Как устроены"]={
    p:[ bg(0)+cart(50,84,44)+B(50,74,.9,{mood:"happy",arms:"up"})+arrowR(84,60,108,C.grey),
        bg(1)+db(104,58,.9)+B(78,82,.85,{mood:"sleep",arms:"hold",item:ticket(0,0,"#7")})+cart(28,84,40)+B2(28,74,.6,{mood:"happy",arms:"up"}),
        bg(2)+db(104,58,.9)+env(88,22,.8)+B(74,82,.9,{mood:"wow",arms:"reach",item:env(0,0,.7)})+cart(28,84,40)+arrowL(56,72,46,C.grn),
        bg(3)+cart(30,84,40)+cart(90,84,40)+B(30,74,.85,{mood:"happy",arms:"wave"})+B2(90,74,.85,{mood:"happy",arms:"up"})+txt(60,20,"100 000",10,C.blue) ],
    l:[["еду на потоке ОС","I ride an OS thread"],["жду базу — слез","waiting for DB: off I get"],["ответ пришёл — обратно","reply came: back on"],["несущих 2, лёгких 100 000","2 carriers, 100,000 light"]],
    c:["Пока жду ответ, я слезаю с тележки ОС, и на ней едет другой. А код у меня обычный.","While I wait for a reply, I hop off the OS cart and someone else rides. My code stays plain."] };

  /* 15 — synchronized прибивает */
  const chainP=(x,y)=>`<g fill="none" stroke="${C.ink}" stroke-width="1.6">${[0,1,2].map(i=>`<ellipse cx="${x}" cy="${y+i*5}" rx="2.4" ry="3.4"/>`).join("")}</g>`;
  Z[V+"synchronized убивает выигрыш"]={
    p:[ bg(0)+cart(46,84,44)+chainP(36,62)+chainP(56,62)+B(46,74,.9,{mood:"sad",arms:"down"})+tag(86,22,"synchronized",C.red,58),
        bg(1)+db(106,58,.8)+cart(48,84,44)+B(48,74,.9,{mood:"sleep"})+chainP(38,62)+chainP(58,62)+B2(84,82,.6,{mood:"sweat"})+clock(18,22,.9,7),
        bg(2)+cart(84,84,40)+B2(84,74,.8,{mood:"happy",arms:"up"})+B(32,82,.95,{mood:"happy",arms:"reach",item:key(0,0,.8)})+tag(60,14,"ReentrantLock",C.grn,62) ],
    l:[["до Java 24 — прибит","before Java 24 — pinned"],["жду базу и держу поток","waiting, holding the cart"],["ReentrantLock — слез","ReentrantLock: I hop off"]],
    c:["До Java 24 synchronized приковывал меня к тележке ОС, спасал ReentrantLock. Теперь цепи сняли.","Before Java 24 synchronized chained me to the cart; ReentrantLock helped. Now chains are off."] };

  /* 16 — пул не нужен */
  Z[V+"Пул виртуальных потоков не нужен"]={
    p:[ bg(0)+`<rect x="70" y="36" width="40" height="44" rx="3" fill="#8a93ad" stroke="${C.ink}" stroke-width="1.3"/>`+lock(90,56,1)+coin(80,28,.8)+coin(98,28,.8)+B(36,82,.95,{mood:"think",arms:"hold",item:ticket(0,0,"1")}),
        bg(1)+[[78,30],[96,22],[88,48],[106,44],[72,58],[100,66]].map((p,i)=>ticket(p[0],p[1],String(i+1),[C.yel,"#fff",C.grn,"#fff",C.yel,"#fff"][i])).join("")+B(36,82,.95,{mood:"happy",arms:"carry",item:stack(0,8,3,16)}),
        bg(2)+db(106,58,.8)+door(84,80,44)+card(84,24,16,12,"#2f5d50",txt(0,4,"10",8,"#fff"))+kid(14,82,.65,C.grn)+kid(28,82,.65,C.yel)+B(54,82,.9,{mood:"smile",hat:"helmet",arms:"push"}) ],
    l:[["пул — потому что дорого","pool: threads were costly"],["по потоку на задачу","a thread per task"],["ограничь дверь к базе","limit the door to the DB"]],
    c:["Виртуальные потоки дешёвые — создаю на каждую задачу. Ограничиваю не их, а дверь к базе.","Virtual threads are cheap: one per task. I limit the door to the DB, not the threads."] };

  /* 17 — где не помогут */
  Z[V+"Где они не помогут"]={
    p:[ bg(0)+db(100,58,.9)+ticket(80,26,"#1")+ticket(98,20,"#2")+ticket(114,26,"#3")+B(40,82,.95,{mood:"happy",legs:"sit",arms:"wave"}),
        bg(1)+gear(86,44,1.4)+B(54,82,.9,{mood:"sweat",arms:"push"})+kid(26,82,.65,C.grn,"sad")+kid(12,82,.65,C.yel,"sad")+txt(86,18,"CPU",8,C.ink),
        bg(2)+[[76,30],[100,30],[76,58],[100,58]].map(p=>sm(p[0],p[1],.5,chip(0,0,txt(0,4,"CPU",7,"#fff")))).join("")+B(36,82,.95,{mood:"happy",arms:"point"}) ],
    l:[["ждут — виртуальные помогут","waiting: virtual helps"],["считают — один станок","computing: one machine"],["пул = число ядер","pool = number of cores"]],
    c:["Если задача считает, а не ждёт, узкое место — ядра. Больше потоков ядер не добавит.","If a task computes instead of waiting, cores are the limit. More threads add no cores."] };

  /* 18 — ThreadLocal */
  Z[V+"ThreadLocal и утечки в пулах"]={
    p:[ bg(0)+desk(88,40)+B(44,82,.95,{mood:"smile",arms:"reach",item:card(0,0,16,20,"#fff",txt(0,3,"7",10,C.red))}),
        bg(1)+desk(88,40)+card(88,52,16,20,"#fff",txt(0,3,"7",10,C.red))+B(34,82,.9,{mood:"happy",flip:true,legs:"run"}),
        bg(2)+desk(88,40)+card(88,52,16,20,"#fff",txt(0,3,"7",10,C.red))+B2(48,82,.95,{mood:"wow",arms:"point"})+txt(88,30,"?",14,C.red),
        bg(3)+desk(90,32)+bin(40)+B(66,82,.95,{mood:"happy",flip:true,arms:"push"})+card(42,54,14,16,"#fff",txt(0,3,"7",9,C.red))+tag(70,16,"finally",C.grn,36) ],
    l:[["задача A кладёт 7","task A stores 7"],["ушла, 7 осталось","leaves, the 7 stays"],["задача B видит чужое","task B sees A's 7"],["finally: remove()","finally: remove()"]],
    c:["Поток в пуле идёт к следующей задаче со всем, что оставили на столе. Убираю в finally.","A pooled thread goes on to the next task with whatever was left. I clean up in finally."] };

  /* 19 — parallelStream */
  Z[V+"parallelStream и общий пул"]={
    p:[ bg(0)+car(84,80,"FJ",C.blue)+kid(110,82,.6,C.grn)+B(36,82,.95,{mood:"smile",arms:"point"}),
        bg(1)+db(104,58,.9)+car(72,80,"FJ",C.blue)+B2(72,56,.5,{mood:"happy"})+B(22,82,.9,{mood:"wow",arms:"reach"}),
        bg(2)+B(30,82,.95,{mood:"sweat",legs:"run"})+kid(62,82,.7,C.grn,"sad")+kid(80,82,.7,C.yel,"sad")+kid(98,82,.7,"#c86bfa","sad")+clock(84,20,1,6) ],
    l:[["одна машина на всех","one car for everyone"],["друг уехал в базу","my friend drove to the DB"],["все остальные пешком","everyone else walks"]],
    c:["parallelStream берёт одну общую машину на всё приложение. Друг на ней уехал — мы пешком.","parallelStream uses one shared car for the whole app. My friend took it, so we all walk."] };

  /* 20 — реактивность: проблема */
  Z[R+"Проблема, из которой она выросла"]={
    p:[ bg(0)+table(86)+kid(104,82,.75,C.grn)+card(86,52,14,18,C.red,txt(0,3,"≡",9,"#fff"))+B(54,82,.95,{mood:"sleep",arms:"hold",item:tray})+clock(20,22,.9,2),
        bg(1)+[24,60,96].map((x,i)=>table(x,20)+bot(x-6,82,.55,{mood:"sleep"})+kid(x+10,82,.5,[C.grn,C.yel,"#c86bfa"][i])).join("")+txt(60,18,"×1000",10,C.red),
        bg(2)+table(22,20)+table(98,20)+kid(14,82,.6,C.grn)+kid(108,82,.6,C.yel)+B(60,82,.95,{mood:"happy",legs:"run",arms:"carry",item:tray}) ],
    l:[["стою, пока гость читает","waiting while guests read"],["на 1000 столов 1000 ждут","1000 tables, 1000 waiting"],["я бегаю к трём","I serve three tables"]],
    c:["Пока гость читает меню, я не стою, а несу заказ другим. Так и поток в реактивности.","While a guest reads the menu, I don't wait: I serve others. That's a reactive thread."] };

  /* 21 — описываешь путь */
  Z[R+"Ты описываешь путь, а не выполняешь его"]={
    p:[ bg(0)+pipe(66,116,46)+joint(80,46,"map")+joint(103,46,"filter",C.grn)+B(30,82,.95,{mood:"think",arms:"reach",item:joint(0,0,"of()",C.ant)}),
        bg(1)+pipe(8,112,22)+joint(36,22,"map")+joint(84,22,"filter",C.grn)+B(50,82,.85,{mood:"wow",arms:"reach",item:mag(0,0,.8)})+txt(96,46,"…",14,C.grey),
        bg(2)+desk(86,40)+plate(86,58)+B(36,82,.95,{mood:"smile",hat:"chef",arms:"hold",item:card(0,0,18,22,"#fff",line(-5,-5,5,-5)+line(-5,0,5,0)+line(-5,5,3,5))})+txt(86,40,"?",13,C.red) ],
    l:[["собираю цепочку","I build a chain"],["по ней ничего не течёт","nothing flows yet"],["рецепт — ещё не ужин","a recipe isn't dinner"]],
    c:["Я пока только описал маршрут: взять, поменять, отсеять. Ехать по нему никто не начал.","So far I've only described the route: take, change, filter. Nobody is driving it yet."] };

  /* 22 — без подписки */
  const tap=(x,on)=>`<rect x="${x-3}" y="30" width="6" height="10" fill="${C.grey}" stroke="${C.ink}"/><path d="M${x-8} ${on?28:30} h16" stroke="${on?C.grn:C.red}" stroke-width="3.4" stroke-linecap="round"/>`;
  Z[R+"Без подписки не происходит ничего"]={
    p:[ bg(0)+pipe(8,112,22)+joint(36,22,"map")+joint(84,22,"filter",C.grn)+B(52,82,.85,{mood:"happy",arms:"up"})+spark(24,50)+spark(84,48),
        bg(1)+pipe(8,112,22)+joint(36,22,"map")+joint(84,22,"filter",C.grn)+B(52,82,.85,{mood:"sleep",legs:"sit"})+txt(100,50,"…",14,C.grey),
        bg(2)+pipe(8,112,22)+joint(36,22,"map")+joint(84,22,"filter",C.grn)+ball(16,22)+ball(60,22,C.yel)+ball(106,22,C.grn)+`<rect x="70" y="52" width="24" height="16" rx="3" fill="#fff" stroke="${C.ink}"/><circle cx="82" cy="60" r="5" fill="${C.grn}" stroke="${C.ink}"/>`+tag(82,42,"subscribe()",C.grn,48)+B(40,82,.85,{mood:"wow",arms:"push"}) ],
    l:[["цепочка собрана","the chain is built"],["тишина, и ошибок нет","silence, and no error"],["subscribe() — поехало","subscribe(): it runs"]],
    c:["Пока никто не подписался, цепочка спит. И молчит: ни ошибки, ни результата.","Until someone subscribes, the chain sleeps. And stays silent: no error, no result."] };

  /* 23 — обратное давление */
  Z[R+"Обратное давление: получатель задаёт темп"]={
    p:[ bg(0)+pipe(70,118,22)+[[66,34],[58,44],[72,46],[50,56],[66,58],[80,62],[42,66],[60,70],[76,72]].map((p,i)=>ball(p[0],p[1],[C.ant,C.yel,C.grn][i%3])).join("")+B(36,82,.9,{mood:"dizzy",arms:"up"}),
        bg(1)+pipe(70,118,22)+B(40,82,.95,{mood:"think",arms:"point"})+bubble(86,40,50,txt(0,3,"request(3)",7,C.ink)),
        bg(2)+pipe(70,118,22)+ball(78,36)+B(42,82,.95,{mood:"happy",arms:"hold",item:ball(-6,0,C.yel)+ball(6,0,C.grn)})+txt(84,64,"3",14,C.grn)+ok(104,60,.7) ],
    l:[["шлют быстрее, чем ем","sent faster than I eat"],["прошу: дай 3","I ask: give me 3"],["пришло ровно 3","exactly 3 arrive"]],
    c:["Не источник решает, сколько слать, а я: прошу три — получаю три, не больше.","The source doesn't decide how much to send. I do: I ask for three and get three."] };

  /* 24 — нельзя притормозить */
  const quote=(x,y,v)=>card(x,y,18,12,"#fff",txt(0,3,v,6.5,C.blue));
  const ticker=`<rect x="76" y="14" width="40" height="18" rx="3" fill="#2f5d50" stroke="${C.ink}"/>`+txt(96,26,"$ ↑↓",8,C.yel);
  Z[R+"Что делать, когда притормозить нельзя"]={
    p:[ bg(0)+ticker+quote(96,44,"101")+B(42,82,.9,{mood:"sweat",arms:"carry",item:stack(0,8,3,16)}),
        bg(1)+ticker+quote(96,44,"102")+quote(104,60,"103")+B(44,82,.9,{mood:"angry",arms:"push"})+txt(80,64,"✗",12,C.red),
        bg(2)+ticker+B(44,82,.95,{mood:"happy",arms:"hold",item:quote(0,0,"105")})+txt(96,52,"✓",14,C.grn),
        bg(3)+ticker+no(96,52,1)+B(44,82,.9,{mood:"dizzy",arms:"up"}) ],
    l:[["копить в буфер","keep in a buffer"],["выбросить новые","drop the new ones"],["только последнее","keep only the latest"],["упасть с ошибкой","fail with an error"]],
    c:["Котировки не притормозишь. Решаю, что важнее: сохранить всё или видеть самое свежее.","Quotes won't slow down. I choose what matters more: keep everything or see the latest."] };

  /* 25 — блокирующий вызов */
  Z[R+"Один блокирующий вызов роняет всё"]={
    p:[ bg(0)+B(32,80,.9,{mood:"happy",arms:"up"})+B2(88,80,.9,{mood:"happy",arms:"up"})+`<rect x="6" y="62" width="108" height="18" rx="2" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>`+env(32,58,.6)+env(88,58,.6),
        bg(1)+db(100,58,.9)+B(70,82,.9,{mood:"sleep",arms:"hold",item:ticket(0,0,"SQL")})+B2(24,82,.85,{mood:"sweat",arms:"up"})+clock(44,20,.9,5),
        bg(2)+db(104,58,.8)+B(80,82,.85,{mood:"sleep"})+B2(54,82,.85,{mood:"sleep"})+kid(28,82,.65,C.grn,"sad")+kid(12,82,.65,C.yel,"sad")+txt(40,20,"…",14,C.red) ],
    l:[["нас двое на всех","two of us serve all"],["я ушёл ждать базу","I went to wait on the DB"],["и встали все","and everyone stops"]],
    c:["Нас, рабочих рук, всего пара. Займи одного ожиданием базы — и сервис замолчит.","There are only two of us. Tie one up waiting on the DB and the service goes silent."] };

  /* 26 — что осталось */
  const washer=(x)=>`<rect x="${x-16}" y="38" width="32" height="42" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><circle cx="${x}" cy="62" r="10" fill="#cfe5fb" stroke="${C.ink}"/><path d="M${x-6} 60 q3 -4 6 0 t6 0" stroke="${C.blue}" fill="none"/>`+txt(x,48,"VT",7,C.blue);
  Z[R+"Что от неё осталось после виртуальных потоков"]={
    p:[ bg(0)+washer(92)+B(42,82,.95,{mood:"happy",legs:"sit",arms:"wave"}),
        bg(1)+pipe(56,96,30)+pipe(56,96,62)+`<path d="M96 30 L108 46 L96 62" fill="none" stroke="${C.grey}" stroke-width="8"/>`+ball(70,30)+ball(84,62,C.grn)+ball(112,46,C.yel)+B(30,82,.9,{mood:"think",arms:"point"}),
        bg(2)+pipe(74,116,61)+cloud(98,30,.9)+ball(88,61)+ball(104,61,C.grn)+B(42,82,.95,{mood:"happy",arms:"reach",item:`<circle r="8" fill="none" stroke="${C.red}" stroke-width="2.6"/><path d="M-8 0 h16 M0 -8 v16" stroke="${C.red}" stroke-width="2"/>`}) ],
    l:[["ожидание теперь дёшево","waiting is cheap now"],["слить, окна, повторы","merge, windows, retries"],["и обратное давление","plus backpressure"]],
    c:["Мыть посуду руками больше не надо. А слияния, окна и обратное давление всё ещё на мне.","No more washing up by hand. But merging, windows and backpressure are still my job."] };

  /* 27 — зачем база */
  Z[D+"Зачем база, если есть файлы"]={
    p:[ bg(0)+kid(72,82,.7,C.grn)+kid(90,82,.7,C.yel)+kid(108,82,.7,"#c86bfa")+B(36,82,.95,{mood:"dizzy",arms:"hold",item:book(0,8,18,16,C.red)}),
        bg(1)+db(96,62,1.1)+B(46,82,.95,{mood:"wow",arms:"reach",item:mag(0,0,.8)})+spark(96,22),
        bg(2)+db(96,62,1.1)+bolt(70,20,1.1)+B(38,82,.95,{mood:"happy",arms:"hold",item:box(0,8,18,14,null,C.wood)})+ok(16,22,.8) ],
    l:[["тетрадь — на всех одна","one notebook for all"],["база: нашёл сразу","DB: found it at once"],["сбой — и всё цело","a crash, and all is safe"]],
    c:["Тетрадь годится, пока я один. База пускает многих, ищет быстро и не ломается на сбое.","A notebook works while I'm alone. A DB lets many in, finds fast, and survives a crash."] };

  /* 28 — таблица */
  Z[D+"Таблица, строка, колонка"]={
    p:[ bg(0)+grid(62,20,-1,-1)+B(32,82,.9,{mood:"smile",arms:"point"}),
        bg(1)+grid(62,20,1,-1)+B(32,82,.9,{mood:"happy",arms:"carry",item:card(0,0,34,10,C.yel,txt(0,3,"2 · 90 · 1",6,C.ink))}),
        bg(2)+grid(62,20,-1,1)+B(32,82,.9,{mood:"think",arms:"point"})+line(88,62,88,70,C.blue,2),
        bg(3)+grid(62,20,-1,0)+key(76,66,.8)+B(32,82,.9,{mood:"wow",arms:"reach",item:nb(0,0,"#2",C.blue)}) ],
    l:[["таблица — картотека","a table is a card file"],["строка — одна карточка","a row is one card"],["колонка — одна графа","a column is one field"],["ключ — номер карточки","the key is its number"]],
    c:["Таблица — картотека, строка — карточка, колонка — графа, а ключ — номер карточки.","A table is a card file: a row is a card, a column is a field, the key is its number."] };

  /* 29 — SQL */
  Z[D+"SQL — ты говоришь ЧТО, а не КАК"]={
    p:[ bg(0)+car(94,80,"",C.yel)+`<circle cx="100" cy="60" r="3.2" fill="#f6d1b0"/><path d="M96.8 59 a3.2 3.2 0 0 1 6.4 0" fill="#5b3a29"/>`+B(28,82,.95,{mood:"smile",arms:"reach",item:card(0,0,30,14,"#fff",txt(0,3,"SELECT",6,C.blue))}),
        bg(1)+`<rect x="58" y="14" width="56" height="44" rx="3" fill="#fff" stroke="${C.ink}"/><path d="M64 52 L64 24 L108 24" stroke="${C.grey}" stroke-width="2.4" fill="none" stroke-dasharray="3 2"/><path d="M64 52 L86 38 L108 24" stroke="${C.grn}" stroke-width="2.6" fill="none"/><circle cx="64" cy="52" r="3" fill="${C.blue}"/><circle cx="108" cy="24" r="3" fill="${C.red}"/>`+B(30,82,.95,{mood:"think",arms:"point"}),
        bg(2)+car(86,80,"",C.yel)+B(40,82,.95,{mood:"happy",arms:"hold",item:box(0,8,18,14,null,C.grn)})+ok(108,22,.8) ],
    l:[["говорю, куда надо","I say where to go"],["маршрут выбирает он","the planner picks a route"],["приехал с результатом","I arrive with the result"]],
    c:["Я пишу, ЧТО хочу получить. Как достать — решает планировщик, как таксист маршрут.","I write WHAT I want. HOW to get it is the planner's call, like a cabbie picks the route."] };

  /* 30 — индекс */
  Z[D+"Индекс: почему без него миллион строк"]={
    p:[ bg(0)+stack(92,80,6,24)+txt(92,14,"1 000 000",8,C.red)+B(40,82,.95,{mood:"dizzy",arms:"hold",item:card(0,0,16,20,"#fff",line(-4,-4,4,-4)+line(-4,1,4,1))}),
        bg(1)+mtree(84,22,1.1,true)+B(34,82,.95,{mood:"think",arms:"point"}),
        bg(2)+mtree(92,20,.8,true)+txt(92,66,"4",14,C.grn)+B(40,82,.95,{mood:"happy",arms:"hold",item:card(0,0,16,20,C.yel,txt(0,3,"✓",9,C.grn))}) ],
    l:[["без индекса — всё подряд","no index: read it all"],["дерево режет лишнее","the tree skips the rest"],["4 шага вместо миллиона","4 steps, not a million"]],
    c:["Без индекса я листаю всю таблицу. С деревом каждый шаг отбрасывает почти всё.","Without an index I read the whole table. With a tree, each step drops almost everything."] };

  /* 31 — цена индекса */
  Z[D+"У индекса есть цена"]={
    p:[ bg(0)+book(90,80,30,40,C.blue)+B(40,82,.95,{mood:"happy",arms:"reach",item:card(0,0,14,18,"#fff",txt(0,3,"+",10,C.grn))}),
        bg(1)+[[72,18],[98,18],[72,48],[98,48]].map(p=>mtree(p[0],p[1],.5)).join("")+B(36,82,.95,{mood:"sweat",arms:"reach",item:card(0,0,12,14,"#fff",txt(0,3,"+",9,C.grn))})+txt(30,20,"×5",10,C.red),
        bg(2)+kid(94,82,.8,C.grn)+card(94,66,14,16,"#fff",txt(0,3,"»»",8,C.blue))+B(40,82,.95,{mood:"think",arms:"hold",item:card(0,0,14,16,"#fff",txt(0,3,"…",9))}) ],
    l:[["вставка — новая страница","an insert: a new page"],["и правка всех деревьев","and every tree updated"],["читать легко, писать тяжко","fast reads, slow writes"]],
    c:["Каждая вставка правит ещё и все деревья. Индексы ставлю под реальные запросы, не про запас.","Every insert also updates every tree. I add indexes for real queries, not just in case."] };

  /* 32 — транзакция */
  const acct=(x,v,col)=>`<rect x="${x-14}" y="50" width="28" height="30" rx="3" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>`+txt(x,69,v,9,"#fff");
  Z[D+"Транзакция: всё или ничего"]={
    p:[ bg(0)+acct(16,"100")+acct(104,"0",C.grn)+B(60,82,.85,{mood:"smile",arms:"carry",item:coin(0,0,1.2)}),
        bg(1)+acct(16,"0")+acct(104,"0",C.grn)+bolt(60,16,1.1)+coin(78,76,1)+B(54,82,.85,{mood:"dizzy",arms:"up"}),
        bg(2)+acct(16,"100")+acct(104,"0",C.grn)+B(60,82,.85,{mood:"think",flip:true,arms:"reach"})+coin(34,44,1)+`<path d="M58 22 a8 8 0 1 0 -6 13" fill="none" stroke="${C.blue}" stroke-width="2"/><path d="M48 33 l4 3 l1 -5" fill="none" stroke="${C.blue}" stroke-width="2"/>`,
        bg(3)+acct(16,"0")+acct(104,"100",C.grn)+B(60,82,.85,{mood:"happy",arms:"up"})+ok(60,16,.8) ],
    l:[["списать и зачислить","debit and credit"],["сбой посредине — пропажа","crash midway: money gone"],["транзакция: откат","transaction: roll back"],["или всё целиком","or all of it, done"]],
    c:["Либо монетка ушла и пришла, либо осталась на месте. Пропасть по дороге ей нельзя.","Either the coin left and arrived, or it stayed put. It can't vanish on the way."] };

  /* 33 — ACID */
  Z[D+"ACID простыми словами"]={
    p:[ bg(0)+txt(100,22,"A",14,C.blue)+stack(98,80,3,16)+B(44,82,.95,{mood:"happy",arms:"carry",item:box(0,8,18,14,null)}),
        bg(1)+txt(100,22,"C",14,C.blue)+B(40,82,.95,{mood:"angry",arms:"push",item:box(0,7,16,14,null,C.grey)+crack(-2,-7)})+no(96,52,.8),
        bg(2)+txt(60,18,"I",14,C.blue)+line(60,30,60,80,C.wood2,3)+B(30,82,.9,{mood:"smile",arms:"hold",item:box(0,8,16,14,null)})+B2(90,82,.9,{flip:true,mood:"smile",arms:"hold"})+hand(90,82,.9,"hold",true,box(0,8,16,14,null,C.red)),
        bg(3)+txt(100,22,"D",14,C.blue)+bolt(84,44,1)+B(40,82,.95,{mood:"happy",arms:"hold",item:card(0,0,16,20,"#fff",txt(0,3,"✓",9,C.grn))})+box(98,80,16,14,null) ],
    l:[["A: всё или ничего","A: all or nothing"],["C: брак не приму","C: no broken goods"],["I: соседи не мешают","I: others don't interfere"],["D: записано — навсегда","D: committed means kept"]],
    c:["Четыре обещания базы: целиком, по правилам, не мешая друг другу и без пропаж после «ок».","Four promises: all at once, by the rules, without stepping on others, kept after OK."] };

  /* 34 — изоляция */
  Z[D+"Изоляция: почему одинаковые запросы дают разное"]={
    p:[ bg(0)+easel(86,"5")+B(36,82,.95,{mood:"smile",arms:"point"}),
        bg(1)+easel(78,"7",C.yel)+B2(108,82,.55,{flip:true,arms:"up"})+B(36,82,.95,{mood:"think"})+txt(56,28,"?",14,C.red),
        bg(2)+easel(86,"7",C.yel)+B(36,82,.95,{mood:"wow",arms:"point"}),
        bg(3)+easel(86,"7",C.yel)+B(36,82,.95,{mood:"happy",arms:"hold",item:card(0,0,20,16,"#cfe5fb",txt(0,4,"5",10,C.ink))}) ],
    l:[["SELECT: вижу 5","SELECT: I see 5"],["сосед записал 7","a neighbor writes 7"],["вживую: уже 7","live view: now 7"],["по снимку: всё ещё 5","from a snapshot: still 5"]],
    c:["Тот же SELECT дал другое? Не баг: изоляция решает, смотрю я вживую или по снимку.","Same SELECT, different answer? Not a bug: isolation decides, live or from a snapshot."] };

  /* 35 — N+1 */
  const shop=(x)=>`<rect x="${x-18}" y="36" width="36" height="44" rx="2" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><path d="M${x-21} 36 h42 l-4 -8 h-34 z" fill="${C.grn}" stroke="${C.ink}"/><rect x="${x-6}" y="58" width="12" height="22" fill="${C.wood}"/>`+db(x,48,.4);
  Z[D+"N+1 — главный тормоз новичка"]={
    p:[ bg(0)+shop(94)+B(42,82,.95,{mood:"smile",arms:"hold",item:card(0,0,18,22,"#fff",txt(0,3,"100",7,C.blue))}),
        bg(1)+shop(98)+B(40,82,.85,{mood:"sweat",legs:"run",arms:"hold",item:card(0,0,12,12,"#fff",txt(0,3,"1",8))})+`<path d="M12 84 H78" stroke="${C.grey}" stroke-width="1.6" stroke-dasharray="3 3"/>`+txt(18,22,"×100",10,C.red),
        bg(2)+shop(98)+B(42,82,.95,{mood:"happy",arms:"carry",item:stack(0,8,2,18)})+txt(18,22,"2",14,C.grn)+ok(66,22,.7) ],
    l:[["1 запрос — 100 заказов","1 query, 100 orders"],["и по разу за клиентом","then 1 trip per customer"],["2 запроса вместо 101","2 queries, not 101"]],
    c:["Сто походов в магазин по одному вместо одного со списком. Локально незаметно, в проде — беда.","A hundred shop trips one by one instead of one with a list. Fine locally, a disaster in prod."] };

  /* 36 — PostgreSQL */
  const tool=`<rect x="-12" y="-4" width="24" height="8" rx="4" fill="${C.red}" stroke="${C.ink}"/><path d="M-8 -4 l-6 -10 M0 -4 v-12 M8 -4 l6 -10" stroke="#9aa3b5" stroke-width="2.4" stroke-linecap="round"/>`;
  Z[P+"Почему именно он"]={
    p:[ bg(0)+elephant(90,80,1.2)+B(38,82,.95,{mood:"think",arms:"hold",item:coin(0,0,1.1)})+txt(38,18,"0 $",10,C.grn),
        bg(1)+elephant(92,80,1)+txt(64,22,"JSON",7,C.blue)+window.ZKKIT.mag(92,18,.55)+txt(110,36,"+",12,C.grn)+B(36,82,.95,{mood:"wow",arms:"reach",item:tool}),
        bg(2)+elephant(92,80,1.2)+txt(92,26,"9/10",11,C.grn)+B(40,82,.95,{mood:"happy",arms:"wave"}) ],
    l:[["бесплатный и надёжный","free and reliable"],["JSON, поиск, расширения","JSON, search, extensions"],["хватит в 9 из 10","enough 9 times of 10"]],
    c:["Беру PostgreSQL, пока не доказано, что он не тянет. Обычно тянет.","I pick PostgreSQL until someone proves it can't cope. Usually it can."] };

  /* 37 — MVCC */
  const jour=(rows)=>`<rect x="66" y="16" width="48" height="58" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+rows.map((r,i)=>(r.x?line(70,30+i*14-3,110,30+i*14-3,C.grey,1.2):"")+txt(90,30+i*14,r.v,9,r.x?C.grey:(r.c||C.ink))).join("");
  Z[P+"MVCC: читатели не блокируют писателей"]={
    p:[ bg(0)+jour([{v:"x = 5"}])+B(34,82,.95,{mood:"smile",arms:"hold",item:card(0,0,16,14,"#fff",txt(0,4,"5",9))}),
        bg(1)+jour([{v:"x = 5"},{v:"x = 7",c:C.grn}])+B2(104,82,.65,{flip:true,mood:"happy",arms:"reach"})+B(34,82,.95,{mood:"happy",arms:"hold",item:card(0,0,16,14,"#fff",txt(0,4,"5",9))}),
        bg(2)+jour([{v:"x = 5",x:1},{v:"x = 7",c:C.grn}])+B(36,82,.95,{mood:"happy",arms:"reach",item:`<path d="M-2 -10 L4 8" stroke="${C.wood2}" stroke-width="2.4"/><path d="M0 6 l-4 8 h10 l-2 -8 z" fill="${C.yel}" stroke="${C.ink}"/>`}) ],
    l:[["читаю: 5","I read 5"],["рядом пишут 7 — не мешают","7 is written: no waiting"],["старую уберут потом","the old one goes later"]],
    c:["Я не стираю строку, а пишу новую рядом. Кто читал старую — спокойно дочитает.","I don't erase a row; I add a new one. Readers of the old one finish in peace."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 4 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const G=82, B=(x,s,o)=>bot(x,G,s,o);
  const row=(x,y,w,col,t,tc,h)=>{h=h||9;return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1"/>`+(t!=null?txt(x+w/2,y+h/2+2.5,t,7,tc||C.ink):"");};
  const cell=(x,y,t,col,tc)=>`<rect x="${x-6}" y="${y-6}" width="12" height="12" rx="2.5" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.1"/>`+(t!=null?txt(x,y+2.6,t,7,tc||C.ink):"");
  const lane=(x,y,vals,col,tc,step)=>vals.map((v,i)=>cell(x+i*(step||13),y,v,Array.isArray(col)?col[i]:col,Array.isArray(tc)?tc[i]:tc)).join("");
  const mark=(x,y,col)=>`<path d="M${x-4} ${y-10} h8 v10 l-4 -3 l-4 3 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width=".8"/>`;
  const frame=(x,y,w,h,col,solid)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="${col||C.bot2}" stroke-width="1.6"${solid?"":' stroke-dasharray="4 3"'}/>`;
  const ln=(x1,y1,x2,y2,col,dash,w)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="${w||1.6}"${dash?' stroke-dasharray="3 2.5"':""} stroke-linecap="round"/>`;
  const arr=(x1,y1,x2,y2,col,dash)=>{const a=Math.atan2(y2-y1,x2-x1),h=5,p=d=>[(x2-h*Math.cos(a+d)).toFixed(1),(y2-h*Math.sin(a+d)).toFixed(1)],A=p(.55),Bq=p(-.55);
    return ln(x1,y1,x2,y2,col,dash,1.8)+`<path d="M${A[0]} ${A[1]} L${x2} ${y2} L${Bq[0]} ${Bq[1]}" fill="none" stroke="${col||C.ink}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;};
  const ent=(x,y,t,col,tc)=>`<g transform="translate(${x} ${y})"><rect x="-13" y="-10" width="26" height="20" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="-13" y="-10" width="26" height="6" rx="3" fill="${col||C.blue}"/>${t!=null?txt(0,7,t,8,tc||C.ink):""}</g>`;
  const ghost=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-13" y="-10" width="26" height="20" rx="3" fill="#fff" fill-opacity=".4" stroke="${C.grey}" stroke-width="1.4" stroke-dasharray="3 2"/>${txt(0,5,"?",12,"#8a90a0")}</g>`;
  const bin=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-9 -16 h18 l-2 16 h-14 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-11" y="-19" width="22" height="3.5" rx="1.5" fill="#8a90a0" stroke="${C.ink}" stroke-width="1"/><path d="M-4 -12 v9 M0 -12 v9 M4 -12 v9" stroke="${C.ink}" stroke-width=".8" opacity=".5"/></g>`;
  const boom=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M0 -11 L3 -4 L10 -6 L5 0 L10 6 L3 4 L0 11 L-3 4 L-10 6 L-5 0 L-10 -6 L-3 -4 Z" fill="${C.red}" stroke="${C.ink}" stroke-width=".8"/>${txt(0,3,"!",8,"#fff")}</g>`;
  const tube=(x,y,n,w)=>{w=w||40;return `<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="-9" width="${w}" height="18" rx="9" fill="#eef3fb" stroke="${C.ink}" stroke-width="1.3"/>`+Array.from({length:n},(_,i)=>env(-w/2+10+i*10,0,.32)).join("")+`</g>`;};
  const pause=(x,y,col)=>`<rect x="${x-5}" y="${y-6}" width="3.5" height="12" rx="1" fill="${col||C.red}"/><rect x="${x+1.5}" y="${y-6}" width="3.5" height="12" rx="1" fill="${col||C.red}"/>`;
  const bars=(x,y,hs,col)=>hs.map((h,i)=>`<rect x="${x+i*8}" y="${y-h}" width="6" height="${h}" rx="1" fill="${Array.isArray(col)?col[i%col.length]:(col||C.blue)}"/>`).join("")+ln(x-2,y,x+hs.length*8,y,C.ink,false,1.2);
  const crown=(x,y)=>`<path d="M${x-7} ${y} l-1 -8 l4.5 4 l3.5 -6 l3.5 6 l4.5 -4 l-1 8 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>`;
  const dbt=(x,y,s,t,col,tc)=>db(x,y,s,col)+(t!=null?txt(x,y+5*(s||1),t,8,tc||"#fff"):"");
  const cab=(x,y,w,labs,cols)=>`<rect x="${x-w/2-4}" y="${y-4}" width="${w+8}" height="${labs.length*15+6}" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>`+labs.map((l,i)=>`<rect x="${x-w/2}" y="${y+i*15}" width="${w}" height="12" rx="2" fill="${(cols&&cols[i])||"#f3dcae"}" stroke="${C.wood2}" stroke-width="1"/><rect x="${x-4}" y="${y+i*15+8}" width="8" height="2" rx="1" fill="${C.wood2}"/>`+txt(x,y+i*15+7,l,7,C.ink)).join("");
  /* хлам: старая версия строки */
  const jbox=(x,y,w,h,t)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="#cdd1d9" stroke="#8a90a0" stroke-width="1.2"/>${t!=null?txt(0,-h/2+3,t,8,"#9aa1b0"):""}<path d="M${-w/2+3} ${-h+3} L${w/2-3} -3" stroke="${C.red}" stroke-width="1.3" opacity=".75"/></g>`;
  const broomI=`<path d="M-4 -4 L9 15" stroke="${C.wood2}" stroke-width="2.6" stroke-linecap="round"/><path d="M5 13 L14 13 L19 21 L1 21 Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>`;
  const kbox=(x,y,w,h,inner)=>`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+txt(x,y-h/2-3,"Kafka",7,C.bot2)+(inner||"");
  const zig=(x,y,col)=>`<path d="M${x-4} ${y-9} l6 6 l-5 2 l6 8" fill="none" stroke="${col||C.red}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const tag=(x,y,t,col)=>`<rect x="${x-7}" y="${y-7}" width="14" height="14" rx="7" fill="${col||C.blue}"/>`+txt(x,y+3,t,8,"#fff");
  const strike=(x1,x2,y)=>ln(x1,y,x2,y,C.red,false,1.8);
  const retry=(x,y,col)=>`<path d="M${x+6} ${y+5} a8 8 0 1 1 1 -9" fill="none" stroke="${col||C.blue}" stroke-width="2"/><path d="M${x+3} ${y-8} l4 4 l3 -5" fill="none" stroke="${col||C.blue}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const counter=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="${80-y}" rx="2" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/><rect x="${x1-2}" y="${y-3}" width="${x2-x1+4}" height="4" rx="2" fill="${C.wood2}"/>`;
  const tbl=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="4" rx="2" fill="${C.wood}"/><path d="M${x1+4} ${y+4} V80 M${x2-4} ${y+4} V80" stroke="${C.wood2}" stroke-width="2.6"/>`;
  const Z={};
  const PG="PostgreSQL|", HB="Hibernate и JPA|", DL="Данные под нагрузкой|", Q="Очереди|", KF="Kafka|", EV="События и интеграция|";

  /* ===== PostgreSQL ===== */
  Z[PG+"autovacuum и раздувание таблиц"]={
    p:[ bg(0)+jbox(92,80,22,18,"5")+B(40,.95,{mood:"smile",arms:"carry",item:box(0,8,22,16,"7")}),
        bg(1)+jbox(14,80,20,15)+jbox(14,65,18,13)+jbox(16,52,16,12)+jbox(100,80,22,15)+jbox(104,65,20,13)+jbox(98,52,16,12)+jbox(112,52,10,10)+txt(98,24,"×10",12,C.red)+B(58,.9,{mood:"dizzy",arms:"hold",item:box(0,7,14,12,"7")}),
        bg(2)+txt(60,16,"autovacuum",9,C.bot2)+jbox(72,80,14,12)+`<g transform="rotate(-20 88 50)">${jbox(88,56,12,10)}</g>`+bin(106,82)+B(36,.95,{mood:"happy",arms:"push",item:broomI}) ],
    l:[["новая версия, старая — тут","new version, old one stays"],["хлам занял всё место","junk takes all the room"],["autovacuum выметает","autovacuum sweeps it out"]],
    c:["Меняю строку — старая остаётся хламом. Не выметешь вовремя — таблица распухнет.","Each update leaves the old row as junk. Don't sweep in time and the table swells."] };

  Z[PG+"EXPLAIN ANALYZE — не гадать, а посмотреть"]={
    p:[ bg(0)+think(58,18,txt(11,3,"? ? ?",10,C.red))+clock(98,50,1.2,9)+B(40,.95,{mood:"sweat",arms:"hold",item:card(0,0,24,16,"#fff",txt(0,3,"SQL",8))}),
        bg(1)+card(86,38,52,42,"#fff",txt(0,-9,"Seq Scan",8,C.red)+txt(0,3,"1 000 000",8)+txt(0,15,"900 ms",9,C.red))+B(26,.9,{mood:"wow",arms:"reach",item:mag(0,0,.9)}),
        bg(2)+card(86,36,52,34,"#fff",txt(0,-4,"Index Scan",8,C.grn)+txt(0,10,"3 ms",10,C.grn))+spark(108,66)+ok(86,66,.9)+B(28,.95,{mood:"happy",arms:"point"}) ],
    l:[["гадаю, где тормозит","guessing what's slow"],["план: прочитан миллион","plan: a million rows read"],["индекс — и 3 мс","with an index — 3 ms"]],
    c:["Не гадаю, а смотрю: EXPLAIN ANALYZE показывает, что база реально делала и где ждала.","No guessing: EXPLAIN ANALYZE shows what the DB really did and where it waited."] };

  Z[PG+"Пул соединений обязателен"]={
    p:[ bg(0)+dbt(106,60,.8,null,C.red)+txt(54,16,"1000",11,C.red)+[10,24,38].map((x,i)=>ln(x+5,58,80,46,C.grey,false,1.2)+kid(x,82,.6,[C.red,C.grn,C.yel][i])).join("")+B(82,.9,{mood:"dizzy",arms:"up"}),
        bg(1)+kid(12,82,.55,C.red)+kid(26,82,.55,C.grn)+kid(40,82,.55,C.yel)+dbt(106,60,.75)+txt(70,16,"20",10,C.grn)+B(72,.95,{mood:"think",arms:"hold",item:`<rect x="-13" y="-11" width="26" height="22" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+key(0,-5,.5,C.grn)+key(0,1,.5,C.blue)+key(0,7,.5,C.red)}),
        bg(2)+kid(94,82,.75,C.grn)+kid(14,82,.6,C.red)+key(24,58,.55,C.blue)+B(52,.95,{mood:"happy",arms:"reach",item:key(0,0,.7,C.grn)}) ],
    l:[["каждому своё — база стонет","one each — the DB groans"],["пул держит пару десятков","the pool keeps a few dozen"],["вернул — взял следующий","returned — next one takes"]],
    c:["Соединение — дорогой процесс. Держу двадцать ключей и раздаю по очереди, а не тысячу.","A connection is a costly process. I keep twenty keys and hand them out in turn."] };

  /* ===== Hibernate ===== */
  Z[HB+"Что вообще делает ORM"]={
    p:[ bg(0)+dbt(100,56,1)+row(84,24,32,"#fff","7 · 25")+B(32,.95,{mood:"think",arms:"reach",item:row(-3,-5,28,"#fff","7 · 25")}),
        bg(1)+row(6,22,32,"#fff","7 · 25")+arr(24,34,40,48)+B(60,.95,{mood:"happy",arms:"hold",item:ent(0,0,"7",C.bot)})+spark(96,30)+spark(86,52,C.blue),
        bg(2)+dbt(102,58,.9)+txt(102,26,"?",16,C.red)+card(70,26,22,11,"#fff",txt(0,3,"SQL",7),-12)+card(78,44,22,11,"#fff",txt(0,3,"SQL",7),10)+B(34,.95,{mood:"sweat",arms:"carry",item:box(0,8,26,14,null)+card(-4,-8,18,9,"#fff",txt(0,3,"SQL",6),-8)}) ],
    l:[["беру строку из таблицы","take a row from the table"],["превращаю в объект","turn it into an object"],["SQL ушёл — но какой?","SQL went out — but which?"]],
    c:["Я превращаю строки в объекты и сам пишу SQL. Удобно, но какие запросы ушли — не видно.","I turn rows into objects and write SQL myself. Handy, but you can't see what queries go out."] };

  Z[HB+"Persistence context — кэш первого уровня"]={
    p:[ bg(0)+txt(60,16,"find(7)",9)+dbt(100,58,1)+curve(88,46,46,58,C.grey,true)+B(32,.9,{mood:"sweat",legs:"run",arms:"hold",item:ent(0,0,"7",C.bot)}),
        bg(1)+txt(60,16,"find(7)",9)+tbl(52,100,58)+ent(76,48,"7",C.bot)+dbt(110,40,.5,null,C.grey)+no(110,22,.6)+B(30,.95,{mood:"happy",arms:"reach"}),
        bg(2)+txt(60,14,"a == b",10,C.grn)+tag(16,36,"a",C.blue)+tag(104,36,"b",C.red)+arr(24,40,46,62,C.blue)+arr(96,40,74,62,C.red)+B(60,.9,{mood:"wow",arms:"hold",item:ent(0,0,"7",C.bot)}) ],
    l:[["первый раз — бегу в базу","first time — run to the DB"],["второй — со своего стола","second — off my own desk"],["это один и тот же объект","it's the very same object"]],
    c:["Внутри транзакции я помню, что уже загрузил. Спросишь второй раз — отдам тот же объект.","Inside a transaction I remember what I loaded. Ask again — you get the very same object."] };

  Z[HB+"Dirty checking — save() часто не нужен"]={
    p:[ bg(0)+frame(4,6,112,68)+txt(40,22,"5",13,"#8a90a0")+strike(34,46,18)+arrowR(50,18,66)+txt(78,22,"9",13,C.red)+B(60,.9,{mood:"think",arms:"hold",item:ent(0,0,"9",C.bot,C.red)}),
        bg(1)+card(88,36,44,40,"#fff",txt(0,-8,"COMMIT",7,C.bot2)+txt(0,8,"5 ≠ 9",10,C.red))+B(30,.95,{mood:"wow",glasses:true,arms:"reach",item:mag(0,0,.9)}),
        bg(2)+dbt(102,60,.9)+txt(96,18,"save()",8,"#8a90a0")+strike(82,110,15)+B(40,.95,{mood:"happy",arms:"carry",item:card(0,0,32,13,"#fff",txt(0,3,"UPDATE",7,C.grn))}) ],
    l:[["поменял поле","changed a field"],["на коммите замечаю","I notice it at commit"],["UPDATE — без save()","UPDATE — no save()"]],
    c:["Изменил поле — я сам замечу и запишу на коммите. Даже если ты менял его случайно!","Change a field and I'll notice and write it at commit. Even if you changed it by accident!"] };

  Z[HB+"Ленивая загрузка и её исключение"]={
    p:[ bg(0)+ghost(96,40)+ln(54,62,82,44,C.grey,true)+B(36,.95,{mood:"smile",arms:"hold",item:ent(0,0,"7",C.bot)}),
        bg(1)+`<rect x="80" y="14" width="34" height="62" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.6"/><circle cx="86" cy="48" r="2" fill="${C.wood2}"/>`+lock(97,46,1.1)+ghost(60,30)+B(36,.95,{mood:"think",arms:"hold",item:ent(0,0,"7",C.bot)}),
        bg(2)+ghost(80,60)+boom(80,36,1.4)+no(108,64,.8)+B(36,.95,{mood:"dizzy",arms:"reach"}) ],
    l:[["вместо связи — заглушка","a stub instead of a link"],["транзакция закрыта","the transaction is closed"],["тронул — исключение","touched it — exception"]],
    c:["Связь я гружу потом, по требованию. Тронешь её после закрытия транзакции — будет ошибка.","I load links later, on demand. Touch one after the transaction closes and it fails."] };

  Z[HB+"N+1 — главный убийца производительности"]={
    p:[ bg(0)+dbt(102,60,.9)+txt(70,20,"1",14,C.grn)+B(36,.95,{mood:"happy",arms:"carry",item:box(0,8,26,16,"100")}),
        bg(1)+[0,1,2,3,4].map(i=>`<path d="M30 ${56-i*2} Q66 ${20+i*7} 96 ${56-i*2}" fill="none" stroke="${C.red}" stroke-width="1.2" stroke-dasharray="3 2" opacity="${1-i*.13}"/>`).join("")+dbt(104,62,.8)+txt(60,14,"1 + 100",11,C.red)+B(46,.9,{mood:"sweat",legs:"run",arms:"hold",item:env(0,0,.45)}),
        bg(2)+card(86,20,50,13,"#fff",txt(0,3,"JOIN FETCH",7,C.grn))+dbt(102,62,.85)+ok(70,42,.8)+B(36,.95,{mood:"happy",arms:"carry",item:box(0,8,26,16,"100")}) ],
    l:[["заказы — одним заходом","orders in one trip"],["за клиентом — сто ходок","a trip per customer — 100"],["JOIN FETCH — всё сразу","JOIN FETCH — all at once"]],
    c:["Сто заказов, и за клиентом к каждому хожу отдельно — уже 101 запрос. Бери всё сразу.","100 orders, then a trip per customer — 101 queries. Fetch it all at once."] };

  Z[HB+"Detached: объект вне транзакции"]={
    p:[ bg(0)+frame(4,6,112,68)+ent(86,46,"1",C.bot)+B(36,.95,{mood:"smile",glasses:true,arms:"reach",item:mag(0,0,.8)}),
        bg(1)+frame(4,6,48,40,C.grey)+ent(86,36,"5",C.bot,C.red)+dbt(100,72,.5,"1")+no(76,60,.6)+B(28,.95,{mood:"sleep",legs:"sit"}),
        bg(2)+frame(56,6,60,68)+txt(86,18,"merge",8,C.grn)+dbt(94,60,.8,"5")+ok(108,32,.7)+B(28,.95,{mood:"happy",arms:"push",item:ent(4,0,"5",C.bot,C.red)}) ],
    l:[["в транзакции — слежу","in a tx — I'm watching"],["вне — сплю, правка мимо","outside — edits slip by"],["merge — снова под надзор","merge — watched again"]],
    c:["Закрылась транзакция — я больше не слежу за объектом. Правки в нём сами не сохранятся.","Once the transaction closes I stop watching the object. Its edits won't save by themselves."] };

  Z[HB+"Когда ORM мешает"]={
    p:[ bg(0)+arrowR(64,62,84)+dbt(102,62,.85)+ok(102,26,.8)+B(36,.95,{mood:"happy",arms:"hold",item:ent(0,0,"7",C.bot)}),
        bg(1)+gear(100,28,1)+clock(100,60,1,9)+`<path d="M30 40 q10 -16 20 0 t-6 16 q-18 6 -16 -10 t24 -6 q10 10 -6 18 t-14 -2" fill="none" stroke="${C.red}" stroke-width="1.6"/>`+B(46,.95,{mood:"dizzy",arms:"up"}),
        bg(2)+bars(78,66,[12,22,16,30],[C.blue,C.grn,C.yel,C.red])+spark(108,20)+B(32,.95,{mood:"happy",arms:"hold",item:card(0,-2,36,24,"#fff",txt(0,-3,"SELECT",6)+txt(0,6,"SUM()",6,C.blue))}) ],
    l:[["одна сущность — удобно","one entity — easy"],["отчёт через ORM — каша","a report via ORM — a mess"],["обычный SQL — и готово","plain SQL — done"]],
    c:["Для простых дел ORM отличный. Тяжёлый отчёт или массовую правку пишут обычным SQL.","ORM is great for simple things. Heavy reports and mass updates go in plain SQL."] };

  /* ===== Данные под нагрузкой ===== */
  Z[DL+"Репликация: читать с копий"]={
    p:[ bg(0)+crown(94,24)+dbt(94,52,1,"v2",C.bot2)+B(36,.95,{mood:"happy",arms:"carry",item:env(0,0,.7)}),
        bg(1)+crown(18,16)+dbt(18,38,.7,"v2",C.bot2)+dbt(102,64,.7,"v1")+ln(30,46,90,56,C.grey,true)+B(60,.9,{mood:"think",arms:"hold",item:clock(0,0,1,4)}),
        bg(2)+dbt(98,60,.9,"v1")+txt(30,18,"v2?",10,C.red)+B(34,.95,{mood:"sad",arms:"reach",item:mag(0,0,.8)}) ],
    l:[["пишу в мастер","write to the master"],["копия догоняет не сразу","the copy catches up later"],["прочитал с копии — старое","read a copy — it's stale"]],
    c:["Пишу в главную базу, а читаю с копий. Но копии отстают — можно увидеть старое.","I write to the main DB and read from copies. But copies lag, so you may see old data."] };

  Z[DL+"Свои свежие записи читай с мастера"]={
    p:[ bg(0)+dbt(98,60,.9,"v1")+think(50,16,txt(11,3,"v2?",9,C.red))+B(34,.95,{mood:"sad",arms:"reach"}),
        bg(1)+crown(96,28)+dbt(96,56,.95,"v2",C.bot2)+B(34,.95,{mood:"happy",arms:"reach",item:mag(0,0,.8)}),
        bg(2)+dbt(54,30,.5,"v2",C.bot2)+dbt(72,38,.6,"v1")+dbt(104,38,.6,"v1")+kid(72,82,.6,C.grn)+kid(104,82,.6,C.yel)+B(30,.9,{mood:"smile",arms:"point"}) ],
    l:[["сохранил, а там старое","saved, but sees old data"],["своё свежее — с мастера","own fresh data — master"],["остальное — с копий","the rest — from copies"]],
    c:["Что ты сам только что записал, читаю с мастера. Всё остальное — с копий.","What you just wrote yourself, I read from the master. Everything else comes from copies."] };

  Z[DL+"Шардинг: данные не влезли в одну машину"]={
    p:[ bg(0)+spark(96,24,C.red)+spark(24,30,C.red)+txt(98,60,"100%",10,C.red)+B(56,.85,{mood:"sweat",arms:"carry",item:db(0,-2,1,C.red)}),
        bg(1)+dbt(18,56,.8,"A–M")+dbt(102,56,.8,"N–Z",C.grn)+arr(46,62,34,56)+arr(74,62,86,56)+B(60,.9,{mood:"think",arms:"hold",item:card(0,0,22,12,"#fff",txt(0,3,"key",8))}),
        bg(2)+dbt(16,52,.75,"A–M")+dbt(104,52,.75,"N–Z",C.grn)+ln(30,40,48,46,C.red,true)+ln(72,46,90,40,C.red,true)+txt(60,14,"JOIN",9,C.red)+no(80,20,.7)+B(60,.9,{mood:"sad",arms:"up"}) ],
    l:[["одна машина не тянет","one machine can't cope"],["режу по ключу","split by key"],["JOIN между ними — нельзя","no JOIN across them"]],
    c:["Режу таблицу по ключу на разные машины. Но связать данные с двух машин уже не выйдет.","I cut the table by key across machines. But joining data from two machines won't work."] };

  Z[DL+"Партиционирование — не то же самое"]={
    p:[ bg(0)+cab(88,22,40,["08","09","10"])+B(32,.95,{mood:"think",arms:"point"}),
        bg(1)+cab(92,22,36,["08","09"],["#e7e0d0","#e7e0d0"])+`<rect x="74" y="52" width="36" height="12" rx="2" fill="${C.wood2}"/>`+B(30,.95,{mood:"happy",arms:"reach",item:row(-2,-6,30,C.grn,"10","#fff",12)}),
        bg(2)+bin(104,82)+txt(104,52,"DROP",7,C.red)+B(40,.95,{mood:"happy",arms:"push",item:`<g transform="rotate(14)">${row(-4,-6,26,"#e7e0d0","08",C.ink,12)}</g>`}) ],
    l:[["одна база, ящики-месяцы","one DB, monthly drawers"],["читаю только нужный","read just the one needed"],["старый — выбросить целиком","drop an old one whole"]],
    c:["Таблица одна, но по ящикам-месяцам. Свежее ищу в одном ящике, старое выкидываю целиком.","One table, split into month drawers. I search one drawer and throw old ones out whole."] };

  Z[DL+"Оптимистичная блокировка"]={
    p:[ bg(0)+row(42,8,36,"#fff","v1")+B(28,.85,{mood:"smile",arms:"hold",item:card(0,0,18,12,"#fff",txt(0,3,"v1",7))})+B(92,.85,{mood:"smile",hat:"cap",arms:"hold",item:card(0,0,18,12,"#fff",txt(0,3,"v1",7))}),
        bg(1)+row(42,8,36,C.grn,"v2","#fff")+arr(40,30,52,20,C.grn)+B(26,.85,{mood:"happy",hat:"cap",arms:"point"})+B(92,.85,{mood:"wow",arms:"hold",item:card(0,0,18,12,"#fff",txt(0,3,"v1",7))}),
        bg(2)+row(64,8,36,C.grn,"v2","#fff")+txt(82,34,"v1 ≠ v2",9,C.red)+no(82,52,.8)+retry(100,62)+B(36,.95,{mood:"think",arms:"hold",item:card(0,0,18,12,"#fff",txt(0,3,"v2",7,C.grn))}) ],
    l:[["оба взяли версию 1","both took version 1"],["другой успел — уже v2","the other got in — v2"],["у меня ошибка — повторю","I get an error — retry"]],
    c:["Никого не запираю. На записи сверяю версию: изменилась — значит, опоздал, повторяю.","I lock no one. On write I check the version: if it changed, I was late — so I retry."] };

  Z[DL+"Пессимистичная блокировка"]={
    p:[ bg(0)+row(56,16,48,"#fff","$ 100")+txt(80,44,"FOR UPDATE",7,C.red)+B(34,.95,{mood:"happy",arms:"carry",item:lock(0,0,1)}),
        bg(1)+row(6,10,40,"#fff","$ 100")+lock(54,18,.8)+clock(96,26,.8,3)+kid(76,82,.6,C.blue,"sad")+kid(94,82,.6,C.yel,"sad")+kid(110,82,.6,C.grn,"sad")+B(30,.9,{mood:"sweat",arms:"reach"}),
        bg(2)+row(6,10,40,C.grn,"$ 70","#fff")+kid(98,82,.7,C.blue)+ok(98,34,.7)+B(34,.95,{mood:"happy",arms:"reach",item:lock(0,0,1,true)}) ],
    l:[["запер строку","locked the row"],["остальные ждут","everyone else waits"],["отпустил — следующий","released — next one goes"]],
    c:["Запираю строку до конца транзакции. Кто хочет её менять — ждёт, а простое чтение идёт.","I lock the row until my transaction ends. Writers wait, but plain reads still go through."] };

  Z[DL+"Дедлок бывает и в базе"]={
    p:[ bg(0)+`<path d="M38 36 Q60 14 84 36" fill="none" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M84 46 Q60 26 38 46" fill="none" stroke="${C.blue}" stroke-width="1.6" stroke-dasharray="3 2"/>`+clock(60,62,.7,6)+B(24,.85,{mood:"angry",arms:"hold",item:box(0,6,14,12,"A")})+B(96,.85,{mood:"angry",hat:"cap",arms:"hold",flip:true})+box(96,78,14,12,"B"),
        bg(1)+box(100,80,14,12,"B")+B(76,.8,{mood:"dizzy",hat:"cap",legs:"sit"})+no(76,22,.7)+B(28,.9,{mood:"wow",arms:"hold",item:box(0,6,14,12,"A")}),
        bg(2)+txt(60,16,"A → B",12,C.grn)+B(32,.9,{mood:"happy",arms:"carry",item:box(0,8,16,14,"A")})+B(88,.85,{mood:"smile",hat:"cap",arms:"carry",item:box(0,8,16,14,"A")})+ok(110,40,.6) ],
    l:[["держат и ждут друг друга","each holds, each waits"],["база снимает одного","the DB kills one"],["один порядок — нет петли","one order — no loop"]],
    c:["Мы заперли строки крест-накрест и ждём вечно. База снимет одного. Лечится единым порядком.","We locked rows crosswise and wait forever. The DB kills one. Cure: one shared order."] };

  Z[DL+"Батчи вместо тысячи запросов"]={
    p:[ bg(0)+[0,1,2,3].map(i=>`<path d="M30 ${54-i*3} Q66 ${22+i*8} 96 ${54-i*3}" fill="none" stroke="${C.grey}" stroke-width="1.3" stroke-dasharray="3 2"/>`).join("")+dbt(104,62,.8)+txt(30,18,"×1000",10,C.red)+B(48,.9,{mood:"sweat",legs:"run",arms:"hold",item:env(0,0,.45)}),
        bg(1)+[0,1,2,3,4].map(i=>env(14+(i%2)*10,76-i*8,.42)).join("")+box(96,80,30,24,"1000")+B(56,.95,{mood:"think",arms:"reach",item:env(0,0,.45)}),
        bg(2)+dbt(102,60,.85)+txt(76,20,"×1",11,C.grn)+spark(110,24)+B(36,.95,{mood:"happy",arms:"carry",item:box(0,8,28,18,"1000")}) ],
    l:[["тысяча ходок","a thousand trips"],["складываю в одну пачку","packing into one batch"],["один заход — быстро","one trip — fast"]],
    c:["Каждый запрос — поход до базы и обратно. Сложу тысячу в пачку и схожу один раз.","Every query is a round trip to the DB. I pack a thousand into a batch and go once."] };

  Z[DL+"OLTP и OLAP — разные задачи"]={
    p:[ bg(0)+txt(60,14,"OLTP",9,C.blue)+counter(44,76,60)+coin(60,52,.7)+kid(98,82,.7,C.red)+B(26,.9,{mood:"happy",hat:"cap",arms:"reach",item:coin(0,0,.8)}),
        bg(1)+txt(88,14,"OLAP",9,C.blue)+[0,1,2].map(i=>`<rect x="${64+i*12}" y="22" width="9" height="34" rx="2" fill="${[C.blue,C.grn,C.yel][i]}" stroke="${C.ink}" stroke-width="1"/>`).join("")+bars(68,72,[6,12,9,16],C.bot)+B(32,.95,{mood:"think",glasses:true,arms:"point"}),
        bg(2)+counter(8,58,62)+paper(20,40,["1M","1M","1M"])+clock(76,24,.8,7)+kid(80,82,.55,C.red,"sad")+kid(96,82,.55,C.grn,"sad")+kid(112,82,.55,C.yel,"sad")+B(46,.75,{mood:"dizzy",hat:"cap",arms:"up"}) ],
    l:[["касса: по чеку, быстро","till: one receipt, fast"],["аналитика — по столбцам","analytics — by columns"],["отчёт на кассе — пробка","report on the till — jam"]],
    c:["Касса пробивает по одному чеку, аналитик считает миллионы строк. Им нужны разные базы.","The till rings one receipt at a time; analysts crunch millions of rows. Different DBs."] };

  Z[DL+"Когда вообще NoSQL"]={
    p:[ bg(0)+card(84,30,24,30,"#fff",txt(0,-4,"{ }",8,C.blue)+ln(-7,5,7,5,C.grey))+card(106,48,18,38,"#fff",txt(0,-10,"{ }",7,C.blue)+ln(-5,0,5,0,C.grey)+ln(-5,7,5,7,C.grey))+B(36,.95,{mood:"think",arms:"hold",item:card(0,0,26,18,"#fff",txt(0,3,"{ }",8,C.blue))}),
        bg(1)+box(96,72,30,28,"42",C.bot)+spark(110,24)+spark(80,30,C.yel)+B(30,.95,{mood:"happy",arms:"reach",item:key(0,0,.9)}),
        bg(2)+card(16,40,22,26,"#fff",txt(0,0,"{ }",8,C.blue))+card(104,40,22,26,"#fff",txt(0,0,"{ }",8,C.blue))+ln(28,34,48,40,C.red,true)+ln(72,40,92,34,C.red,true)+no(60,16,.8)+B(60,.9,{mood:"sad",arms:"up"}) ],
    l:[["форма плавает — документы","shape varies — documents"],["только по ключу — молния","key lookup — lightning"],["без связей — это цена","no joins — that's the cost"]],
    c:["NoSQL беру под задачу: форма плавает или нужен только ключ. Без связей — это плата.","I pick NoSQL for a reason: loose shape or key-only access. Losing joins is the price."] };

  /* ===== Очереди ===== */
  Z[Q+"Зачем не звать напрямую"]={
    p:[ bg(0)+server(98,50,1,false)+boom(98,18,.9)+boom(30,22,.7)+B(36,.95,{mood:"dizzy",arms:"push",item:env(0,0,.55)}),
        bg(1)+tube(86,46,2,48)+server(106,72,.4,false)+B(30,.95,{mood:"happy",arms:"reach",item:env(0,0,.55)}),
        bg(2)+tube(34,22,1,48)+arr(58,24,74,40,C.grn)+B(92,.95,{mood:"happy",hat:"cap",arms:"hold",item:env(0,0,.6)})+B(26,.75,{mood:"smile",arms:"wave"}) ],
    l:[["звал напрямую — упали оба","direct call — both fall"],["кинул в очередь — свободен","dropped it in — free to go"],["получатель встал — забрал","receiver's back — takes it"]],
    c:["Не звоню напрямую, а кладу письмо в очередь. Получатель прилёг — письмо подождёт.","I don't call directly, I drop a letter in the queue. If the receiver naps, it waits."] };

  Z[Q+"Что даёт и что забирает"]={
    p:[ bg(0)+[0,1,2,3,4,5].map(i=>env(12+(i%2)*12,18+i*9,.38)).join("")+tube(56,46,3,40)+B(96,.9,{mood:"happy",arms:"hold",item:env(0,0,.5)}),
        bg(1)+clock(86,30,1.3,10)+txt(86,58,"…",16,C.grey)+B(40,.95,{mood:"sad",legs:"sit"}),
        bg(2)+dbt(18,56,.75,"5")+dbt(102,56,.75,"4")+txt(60,16,"5 ≠ 4",10,C.red)+B(60,.9,{mood:"think",arms:"up"}) ],
    l:[["всплеск — очередь примет","a spike — queue absorbs it"],["ответа сразу нет","no answer right away"],["данные пока расходятся","data differ for a while"]],
    c:["Очередь гасит всплески и развязывает сервисы. Зато ответ не сразу, а данные то и дело разные.","A queue absorbs spikes and decouples services. But no instant reply, and data drifts a while."] };

  Z[Q+"Доставка «хотя бы один раз»"]={
    p:[ bg(0)+server(100,50,1)+ln(88,34,72,34,C.grn,true)+zig(64,34)+ln(56,34,48,34,C.grey,true)+B(30,.95,{mood:"sweat",arms:"reach",item:env(0,0,.5)}),
        bg(1)+server(100,46,.9)+env(88,78,.4)+env(108,78,.4)+txt(98,20,"#7 #7",8,C.red)+B(30,.95,{mood:"wow",arms:"reach",item:env(0,0,.5)}),
        bg(2)+card(20,30,34,22,"#fff",txt(0,-1,"= 1",9)+txt(0,8,"$$$",7,C.red))+card(100,30,34,22,"#fff",txt(0,-1,"≥ 1",9)+txt(0,8,"$",7,C.grn))+ok(100,56,.7)+B(60,.9,{mood:"think",arms:"up"}) ],
    l:[["ответ потерялся","the reply got lost"],["шлю ещё раз — дубль","I resend — a duplicate"],["«ровно раз» — дорого","exactly once costs a lot"]],
    c:["Сеть теряет ответы, и я шлю письмо ещё раз. Значит, дубли будут — получатель, готовься.","The network loses replies, so I resend the letter. Duplicates will come — be ready."] };

  Z[Q+"Идемпотентность — главное слово"]={
    p:[ bg(0)+env(14,24,.45)+env(14,42,.45)+txt(30,27,"#7",7)+txt(30,45,"#7",7)+coin(80,28,.8)+coin(92,36,.8)+kid(98,82,.7,C.red,"sad")+B(52,.9,{mood:"sweat",arms:"hold",item:coin(0,0,.9)}),
        bg(1)+env(100,30,.55)+txt(100,46,"#7",8)+no(100,64,.7)+B(40,.95,{mood:"think",glasses:true,arms:"hold",item:card(0,-2,28,30,"#fff7d6",txt(0,-6,"#6 ✓",7)+txt(0,6,"#7 ✓",7,C.grn))}),
        bg(2)+txt(70,22,"× 1",11,C.grn)+kid(98,82,.7,C.grn)+B(40,.95,{mood:"happy",arms:"reach",item:coin(0,0,.9)}) ],
    l:[["без проверки — дважды","no check — charged twice"],["#7 уже был — пропускаю","#7 seen — skip it"],["списал ровно раз","charged exactly once"]],
    c:["Перед делом смотрю в список: этот номер уже делал? Да — ничего не трогаю.","Before acting I check my list: done this ID already? Yes — I touch nothing."] };

  /* ===== Kafka ===== */
  Z[KF+"Это не очередь, это лог"]={
    p:[ bg(0)+tube(30,30,1,44)+`<circle cx="42" cy="30" r="4" fill="none" stroke="${C.grey}" stroke-width="1.2" stroke-dasharray="2 2"/>`+B(80,.95,{mood:"smile",arms:"hold",item:env(0,0,.55)}),
        bg(1)+lane(14,20,["0","1","2","3","4","5","6","7"],"#fff")+mark(40,13,C.red)+mark(92,13,C.blue)+B(40,.8,{mood:"smile",arms:"up"})+B(92,.8,{mood:"think",hat:"cap",arms:"up"}),
        bg(2)+lane(14,20,["0","1","2","3","4","5","6","7"],"#fff")+mark(14,13,C.red)+`<path d="M92 34 Q54 50 18 32" fill="none" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M18 32 l3 5 M18 32 l6 -1" stroke="${C.red}" stroke-width="1.6" stroke-linecap="round"/>`+B(62,.85,{mood:"happy",flip:true,legs:"run",arms:"up"}) ],
    l:[["в очереди — забрал и нет","queue: taken and gone"],["в Kafka — всё лежит","Kafka: it all stays"],["можно перечитать заново","you can read it again"]],
    c:["Kafka — не ящик, а журнал. Сообщения лежат, а я только двигаю свою закладку.","Kafka isn't a box, it's a log. Messages stay; I just move my own bookmark."] };

  Z[KF+"Партиции — единица параллелизма"]={
    p:[ bg(0)+[[24,"0",C.red,"#fde4ec",5],[44,"1",C.blue,"#e4f1ff",4],[64,"2",C.grn,"#e7f6e8",5]].map(r=>txt(60,r[0]+3,r[1],8,r[2])+lane(70,r[0],Array(r[4]).fill(" "),r[3],C.ink,10)).join("")+B(28,.95,{mood:"think",arms:"point"}),
        bg(1)+lane(18,14,["1","2","3"],C.red,"#fff",10)+lane(52,14,["1","2"],C.blue,"#fff",10)+lane(84,14,["1","2","3"],C.grn,"#fff",10)+B(28,.85,{mood:"happy",arms:"up"})+B(62,.65,{mood:"smile",hat:"cap",arms:"up"})+B(96,.65,{mood:"smile",hat:"helmet",arms:"up"}),
        bg(2)+[0,1,2].map(i=>cell(14+i*22,14,String(i),[C.red,C.blue,C.grn][i],"#fff")+B(14+i*22,.55,{arms:"up",mood:"smile",hat:["cap","helmet","crown"][i]})).join("")+B(96,.9,{mood:"sleep",legs:"sit"}) ],
    l:[["топик — три дорожки","a topic — three lanes"],["на дорожку — один читатель","one reader per lane"],["четвёртый — скучает","a fourth one idles"]],
    c:["Топик режется на партиции. Порядок — внутри одной, а читателей не больше, чем партиций.","A topic is cut into partitions. Order holds within one; readers max out at the count."] };

  Z[KF+"Ключ решает, куда попадёт сообщение"]={
    p:[ bg(0)+`<path d="M62 26 h20 l-6 14 l6 14 h-20 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>`+txt(72,44,"#",9)+arr(84,32,98,24,C.red)+arr(84,50,98,58,C.blue)+cell(108,22,"A",C.red,"#fff")+cell(108,60,"B",C.blue,"#fff")+B(24,.9,{mood:"smile",arms:"reach",item:cell(0,0,"A",C.red,"#fff")}),
        bg(1)+lane(30,20,["1","2","3","4"],C.red,"#fff",20)+arr(14,20,22,20,C.red)+B(60,.95,{mood:"happy",arms:"up"}),
        bg(2)+cell(20,14,"4",C.red,"#fff")+cell(92,14,"1",C.red,"#fff")+cell(14,40,"2",C.red,"#fff")+cell(106,36,"3",C.red,"#fff")+txt(98,64,"?",16,C.red)+B(60,.95,{mood:"dizzy",arms:"up"}) ],
    l:[["ключ выбирает дорожку","the key picks the lane"],["клиент — всё по порядку","one client — all in order"],["без ключа — вразброс","no key — scattered"]],
    c:["Одинаковый ключ — всегда одна партиция. Кладу id клиента в ключ, и его события не смешаются.","Same key, same partition. I put the customer id in the key, and their events keep order."] };

  Z[KF+"Consumer group и ребаланс"]={
    p:[ bg(0)+B(32,.9,{mood:"smile",arms:"carry",item:lane(-7,0,["0","1"],"#fff",C.ink,14)})+B(90,.9,{mood:"smile",hat:"cap",arms:"carry",item:lane(-7,0,["2","3"],"#fff",C.ink,14)}),
        bg(1)+pause(60,16)+cell(44,34,"0")+cell(76,30,"3")+cell(58,40,"1")+B(26,.85,{mood:"wow",arms:"up"})+B(70,.7,{mood:"think",hat:"cap"})+B(104,.65,{mood:"smile",hat:"helmet",legs:"run",flip:true}),
        bg(2)+[0,1,2,3,4,5,6,7].map(i=>env(80+(i%3)*12,76-Math.floor(i/3)*9,.38)).join("")+clock(98,24,.9,11)+arr(116,64,116,40,C.red)+B(40,.95,{mood:"sweat",arms:"push"}) ],
    l:[["каждой партиции — один","one reader per partition"],["новый — всё переезжает","a new one — all move"],["частые рестарты — хвост","many restarts — lag grows"]],
    c:["Партиции делим между собой. Пришёл новый — всё переезжает, и чтение на паузе.","We split the partitions among us. A new reader joins, they move, and reading pauses."] };

  Z[KF+"Offset — закладка, а не удаление"]={
    p:[ bg(0)+lane(14,20,["0","1","2","3","4","5","6","7"],["#e7f6e8","#e7f6e8","#e7f6e8","#e7f6e8","#fff","#fff","#fff","#fff"])+mark(66,13)+B(66,.85,{mood:"happy",arms:"up"}),
        bg(1)+lane(14,20,["0","1","2","3","4","5","6","7"],"#fff")+mark(66,13)+boom(26,50,1.1)+retry(40,62,C.grn)+B(66,.85,{mood:"sweat",arms:"up"}),
        bg(2)+lane(14,20,["0","1","2","3","4","5","6","7"],"#fff")+mark(27,13)+`<path d="M70 32 Q50 44 30 32" fill="none" stroke="${C.blue}" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M30 32 l2 5 M30 32 l6 0" stroke="${C.blue}" stroke-width="1.6" stroke-linecap="round"/>`+B(66,.85,{mood:"happy",flip:true,legs:"run",arms:"up"}) ],
    l:[["закладка на 4","bookmark at 4"],["упал, встал — с 4-го","crashed, up — from 4"],["отмотал назад — заново","rewound — replay"]],
    c:["Помню номер следующего к чтению. Упал — продолжу с него, захочу — отмотаю назад.","I remember the next offset to read. If I crash I resume there; if I want, I rewind."] };

  Z[KF+"Когда Kafka лишняя"]={
    p:[ bg(0)+txt(86,18,"Kafka",8,C.bot2)+server(70,52,.7)+server(88,52,.7)+server(106,52,.7)+B(28,.9,{mood:"sweat",arms:"push",item:env(0,0,.4)}),
        bg(1)+[0,1,2].map(i=>row(64,18+i*14,48,"#fff",null)+(i<2?ok(72,22.5+i*14,.45):clock(72,22.5+i*14,.45,2))+env(96,22.5+i*14,.3)).join("")+B(30,.95,{mood:"happy",arms:"point"}),
        bg(2)+lane(10,14,["","","","","","","",""],[C.red,C.blue,C.grn,C.yel,C.red,C.blue,C.grn,C.yel],"#fff",13)+lane(16,28,["","","","","","","",""],[C.blue,C.yel,C.red,C.grn,C.blue,C.yel,C.red,C.grn],"#fff",13)+B(60,.85,{mood:"wow",arms:"up"}) ],
    l:[["письмо через Kafka? тяжко","email via Kafka? heavy"],["таблица задач — проще","a task table is simpler"],["поток событий — вот Kafka","event streams — Kafka fits"]],
    c:["Kafka — для потока событий и перечитывания. Фоновое письмо проще сделать таблицей задач.","Kafka is for event streams and replay. A background email is simpler with a task table."] };

  /* ===== События и интеграция ===== */
  Z[EV+"Двойная запись всегда ломается"]={
    p:[ bg(0)+dbt(16,58,.75)+ok(16,26,.6)+kbox(102,50,24,26)+B(58,.9,{mood:"smile",arms:"carry",item:env(0,0,.6)}),
        bg(1)+dbt(16,58,.75)+ok(16,26,.6)+kbox(102,50,24,26,no(102,50,.7))+boom(60,20,1)+B(60,.85,{mood:"dizzy",legs:"sit"}),
        bg(2)+dbt(16,58,.75,null,C.grey)+no(16,26,.6)+kbox(102,50,24,26,env(102,50,.45))+B(60,.9,{mood:"sad",arms:"up"}) ],
    l:[["в базу есть, несу в Kafka","saved, carrying it on"],["упал — заказ без события","crash — order, no event"],["или событие без заказа","or an event, no order"]],
    c:["Пишу в базу и в Kafka по очереди. Упаду между ними — одно запишется, другое нет.","I write to the DB, then to Kafka. Crash in between and only one of them happens."] };

  Z[EV+"Outbox: событие как строка в той же транзакции"]={
    p:[ bg(0)+dbt(100,62,.9)+txt(100,22,"COMMIT",7,C.bot2)+B(40,.95,{mood:"happy",arms:"carry",item:`<rect x="-16" y="-9" width="32" height="18" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/>`+txt(-7,4,"7",9,"#fff")+env(7,0,.3)}),
        bg(1)+frame(52,6,62,30,C.grn,true)+ent(70,21,"7",C.bot)+env(98,21,.42)+frame(52,42,62,30,C.red,true)+no(83,57,.8)+B(26,.9,{mood:"think",arms:"point"}),
        bg(2)+dbt(14,60,.7)+kbox(104,50,22,24)+B(60,.9,{mood:"happy",legs:"run",arms:"hold",item:env(0,0,.5)}) ],
    l:[["заказ и событие — вместе","order and event together"],["либо оба, либо никого","both or neither"],["потом несу в Kafka","later I carry it to Kafka"]],
    c:["Событие кладу строкой в ту же транзакцию, что и заказ. Потом отдельно несу его в Kafka.","I put the event as a row in the same transaction as the order, then ship it to Kafka later."] };

  Z[EV+"CDC и Debezium: читаем журнал базы"]={
    p:[ bg(0)+dbt(16,58,.8)+lane(36,24,["1","2","3","4"],"#fff",C.ink,13)+B(90,.95,{mood:"think",glasses:true,arms:"reach",flip:true,item:mag(0,0,.8)}),
        bg(1)+dbt(14,60,.7)+kbox(104,50,22,24)+B(56,.9,{mood:"happy",glasses:true,legs:"run",arms:"carry",item:lane(-13,0,["1","2","3"],"#fff",C.ink,13)}),
        bg(2)+laptop(34,56,1.1,txt(0,-10,"{ }",8,C.blue))+ok(34,20,.8)+B(92,.95,{mood:"happy",glasses:true,flip:true,arms:"point"}) ],
    l:[["база и так пишет журнал","the DB logs changes anyway"],["читаю журнал — в Kafka","read log — ship to Kafka"],["код приложения не трогаем","app code stays untouched"]],
    c:["База и так ведёт журнал изменений. Я, Debezium, читаю его, как копия, и шлю события в Kafka.","The DB already logs changes. As Debezium I read it like a replica and send events to Kafka."] };

  Z[EV+"Outbox или CDC — что выбрать"]={
    p:[ bg(0)+env(94,34,.9)+coin(94,34,.55)+ok(94,62,.7)+B(36,.95,{mood:"sweat",arms:"hold",item:laptop(0,10,.75,txt(0,-10,"{ }",8,C.blue))}),
        bg(1)+row(64,18,46,"#fff","1 → 2")+env(87,56,.9)+txt(87,58,"1 → 2",7)+B(30,.95,{mood:"think",arms:"reach",item:mag(0,0,.8)}),
        bg(2)+row(60,14,22,"#fff","a")+arrowR(84,18,94)+row(94,14,20,"#fff","b")+env(78,52,.7)+no(98,52,.7)+B(32,.95,{mood:"dizzy",arms:"up"}) ],
    l:[["outbox: смысл, но код","outbox: meaning, but code"],["CDC: копия строки","CDC: a copy of a row"],["сменил колонку — сломалось","rename column — it breaks"]],
    c:["Outbox — события со смыслом, но нужен код. CDC — кода не надо, но события повторяют таблицы.","Outbox gives meaningful events but needs code. CDC needs none, but events mirror tables."] };

  Z[EV+"Event Sourcing: хранить события, а не состояние"]={
    p:[ bg(0)+card(88,40,38,30,"#fff",txt(0,5,"100",13))+txt(88,72,"?",14,C.red)+think(50,16,txt(11,3,"?",11,C.red))+B(32,.95,{mood:"think",arms:"down"}),
        bg(1)+[["+150",C.grn],["−70",C.red],["+20",C.grn]].map((e,i)=>card(30+i*30,18,26,15,"#fff",txt(0,3,e[0],8,e[1]))).join("")+txt(92,58,"= 100",11,C.blue)+B(36,.95,{mood:"happy",arms:"point"}),
        bg(2)+[["+150",C.grn],["−70",C.red],["+20","#9aa1b0"]].map((e,i)=>card(30+i*30,18,26,15,"#fff",txt(0,3,e[0],8,e[1]))).join("")+`<path d="M17 30 v4 h56 v-4" fill="none" stroke="${C.blue}" stroke-width="1.6"/>`+txt(94,58,"= 80",11,C.blue)+B(40,.95,{mood:"wow",arms:"hold",item:clock(0,0,1,4)}) ],
    l:[["только итог — откуда?","just a total — from where?"],["храню ленту событий","I keep a tape of events"],["итог на любой день","the total for any day"]],
    c:["Храню не итог, а все события по порядку. Сложу их — получу баланс на любой день.","I keep every event, not just the total. Add them up and get the balance for any day."] };

  Z[EV+"Чем платят за Event Sourcing"]={
    p:[ bg(0)+lane(54,16,["+","−","+","+"],"#fff",C.ink,12)+txt(104,19,"…1M",7,C.grey)+B(36,.95,{mood:"happy",arms:"hold",item:card(0,0,24,18,"#fff",txt(0,3,"100",8,C.blue))+`<rect x="-14" y="-11" width="28" height="22" rx="5" fill="none" stroke="${C.yel}" stroke-width="2.2"/>`}),
        bg(1)+card(80,22,26,15,"#fff",txt(0,3,"+50",8,C.grn))+no(100,14,.6)+ok(90,50,.7)+B(32,.95,{mood:"think",arms:"reach",item:card(8,0,22,15,"#fff",txt(0,3,"−50",8,C.red))}),
        bg(2)+env(18,32,.8)+txt(18,54,"v1",9)+env(102,32,.8,"#e4f1ff")+txt(102,54,"v2",9)+gear(60,14,.6)+B(60,.9,{mood:"dizzy",arms:"up"}) ],
    l:[["снимок вместо прокрутки","snapshot, not full replay"],["не стереть — дописать","can't erase — only append"],["новый формат — морока","new format — a whole job"]],
    c:["Миллион событий каждый раз не прокрутишь, ошибку не сотрёшь — только допишешь. Порог высокий.","You can't replay a million events each time or erase a mistake — only append. It's demanding."] };

  Z[EV+"CQRS: разделить чтение и запись"]={
    p:[ bg(0)+dbt(100,60,.85)+txt(100,22,"W",11,C.bot2)+B(38,.95,{mood:"think",hat:"chef",arms:"hold",item:card(0,-2,22,22,"#fff7d6",txt(0,-2,"✓",9,C.grn)+txt(0,8,"✓",9,C.grn))}),
        bg(1)+dbt(100,60,.85,null,C.grn)+txt(100,22,"R",11,C.grn)+spark(76,24)+B(36,.95,{mood:"happy",arms:"hold",item:phone(0,-2,.9,row(-6.5,-10,13,"#fff",null,null,5)+row(-6.5,-3,13,"#fff",null,null,5)+row(-6.5,4,13,"#fff",null,null,5))}),
        bg(2)+dbt(14,60,.7)+txt(14,24,"W",10,C.bot2)+dbt(106,60,.7,null,C.grn)+txt(106,24,"R",10,C.grn)+B(60,.9,{mood:"happy",legs:"run",arms:"hold",item:env(0,0,.5)}) ],
    l:[["запись: строгие правила","writes: strict rules"],["чтение: витрина под экран","reads: a view per screen"],["запись обновляет витрину","writes refresh the views"]],
    c:["Пишу по строгим правилам в одну модель, а читаю из готовых витрин под каждый экран.","I write by strict rules into one model, and read from ready-made views for each screen."] };

  Z[EV+"Saga: транзакция на несколько сервисов"]={
    p:[ bg(0)+[0,1,2].map(i=>server(18+i*42,30,.55)+ok(18+i*42,8,.5)).join("")+B(52,.85,{mood:"happy",legs:"run",arms:"hold",item:env(0,0,.45)}),
        bg(1)+server(18,30,.55)+ok(18,8,.5)+server(60,30,.55)+ok(60,8,.5)+server(102,30,.55,false)+boom(102,30,1)+B(70,.9,{mood:"wow",arms:"up"}),
        bg(2)+server(18,30,.55)+server(60,30,.55)+server(102,30,.55,false)+arr(90,30,74,30,C.blue)+arr(48,30,32,30,C.blue)+B(68,.9,{mood:"smile",flip:true,legs:"run",arms:"hold"})+coin(68,71,.75) ],
    l:[["каждый шаг — свой коммит","each step commits itself"],["третий шаг упал","step three fails"],["отменяю делом: возврат","undo by action: refund"]],
    c:["Общей транзакции нет: каждый шаг сохраняется сам. Сорвалось — делаю обратные шаги.","No shared transaction: each step saves itself. If one fails, I run the undo steps back."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 5 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const P=(d,c,w,x)=>`<path d="${d}" stroke="${c||C.ink}" stroke-width="${w||2}" fill="none" stroke-linecap="round" stroke-linejoin="round"${x?" "+x:""}/>`;
  const DASH='stroke-dasharray="3 3"';
  const F=(d,f)=>`<path d="${d}" fill="${f}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/>`;
  const R=(x,y,w,h,f,rx)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx==null?3:rx}" fill="${f||"#fff"}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const O=(x,y,r,f)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const G=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const fade=(inner,o)=>`<g opacity="${o||.35}">${inner}</g>`;
  const arrL=(x1,y,x2,col)=>`<path d="M${x1} ${y} H${x2+4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x2+6} ${y-4} L${x2} ${y} L${x2+6} ${y+4}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arrD=(x,y1,y2,col)=>`<path d="M${x} ${y1} V${y2-4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x-4} ${y2-6} L${x} ${y2} L${x+4} ${y2-6}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const gb=(x,s,o)=>bot(x,82,s,o);
  /* Бит лёжа: ноги в (x,y), голова влево */
  const lie=(x,y,s,o)=>`<g transform="translate(${x} ${y}) rotate(-90)">${bot(0,0,s,o)}</g>`;
  const house=(x,y,s,col)=>G(x,y,s||1,`<rect x="-15" y="-24" width="30" height="24" fill="#ffe6b0" stroke="${C.ink}" stroke-width="1.3"/><path d="M-19 -23 L0 -40 L19 -23 Z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.3" stroke-linejoin="round"/><rect x="-4" y="-12" width="8" height="12" fill="${C.wood}" stroke="${C.ink}" stroke-width="1"/>`);
  const fire=(x,y,s)=>G(x,y,s||1,`<path d="M0 0 c-8 0 -10 -8 -6 -14 c1 4 3 5 4 5 c-1 -6 2 -11 6 -13 c-1 5 6 8 6 15 c0 4 -4 7 -10 7z" fill="${C.red}"/><path d="M0 -1 c-4 0 -5 -4 -3 -7 c1 2 2 2 2 2 c0 -3 2 -5 3 -6 c0 3 3 4 3 7 c0 2 -2 4 -5 4z" fill="${C.yel}"/>`);
  const tag=(x,y,w,s,f,tc,sz)=>R(x-w/2,y-8,w,16,f||"#fff",6)+txt(x,y+3.5,s,sz||9,tc||C.ink);
  const sign=(lab,w,f,tc,sz)=>card(0,0,w||22,15,f||"#fff",txt(0,4,lab,sz||9,tc||C.ink));
  const bk=(lab,col)=>R(-8,-10,16,20,col||C.blue,2)+P("M-5 -10 v20","#fff",1.2)+txt(2,4,lab,7,"#fff");
  const bin=(x,y)=>G(x,y,1,`<path d="M-11 -24 h22 l-2.5 24 h-17 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>${P("M-13 -26 h26 M-4 -29 h8",C.ink,2)}${P("M-4 -19 v14 M4 -19 v14","#8a90a0",1.6)}`);
  const jar=(x,y,col,lab)=>`<rect x="${x-7}" y="${y-17}" width="14" height="17" rx="3" fill="${col}" stroke="${C.ink}" stroke-width="1.2"/><rect x="${x-8}" y="${y-20}" width="16" height="4" rx="1.5" fill="${C.wood}" stroke="${C.ink}" stroke-width="1"/>${lab!=null?txt(x,y-5,lab,7,"#fff"):""}`;
  const bucket=(x,y,n,s)=>G(x,y,s||1,`<path d="M-15 -24 L15 -24 L12 0 L-12 0 Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.3" stroke-linejoin="round"/>${[[-6,-6],[6,-6],[0,-15],[-7,-17],[7,-17]].slice(0,n).map(c=>coin(c[0],c[1],.7)).join("")}`);
  const siren=(x,y,on)=>G(x,y,1,`${on?P("M-16 -14 l-4 -3 M16 -14 l4 -3 M0 -22 v-5 M-12 -20 l-3 -4 M12 -20 l3 -4",C.red,2):""}<path d="M-10 0 v-8 a10 10 0 0 1 20 0 v8 z" fill="${on?C.red:C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-13" y="0" width="26" height="5" rx="1.5" fill="${C.ink}"/>`);
  const shp=(x,y,k,r)=>{ r=r||4; return k===0?`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.red}"/>`
    : k===1?`<path d="M${x} ${y-r} L${x+r} ${y+r*.8} L${x-r} ${y+r*.8} Z" fill="${C.grn}"/>`
    : `<rect x="${x-r*.85}" y="${y-r*.85}" width="${r*1.7}" height="${r*1.7}" fill="${C.blue}"/>`; };
  const doc=(x,y,n,ks,w,h)=>{ w=w||22; h=h||28; return card(x,y,w,h,"#fff",txt(0,-h/2+8,n,7,C.grey)+ks.map((k,i)=>shp((i-(ks.length-1)/2)*8,4,k,3.2)).join("")); };
  const stove=(x)=>R(x-14,58,28,24,C.grey,3)+O(x-6,58,0.1,"none")+R(x-10,50,20,8,C.ink,2)+P(`M${x-4} 46 q2 -4 0 -7 M${x+4} 46 q2 -4 0 -7`,C.grey,1.4);
  const counter=(x,w)=>R(x,62,w,20,C.wood,2)+P(`M${x} 67 h${w}`,C.wood2,1.4);
  const tray=(lab)=>P("M-10 0 h20",C.ink,2)+O(0,-5,5,lab||C.yel);
  const fridge=(x,inner)=>R(x-20,24,40,58,"#eef4fb",4)+P(`M${x-20} 42 h40`,C.ink,1.2)+P(`M${x+14} 30 v8 M${x+14} 48 v10`,C.grey,2)+(inner||"");
  const door=(x,lab,col)=>R(x-12,34,24,48,col||C.wood,2)+O(x+7,60,1.6,C.yel)+(lab?tag(x,26,lab.length>4?lab.length*4.6+8:30,lab,"#fff",C.ink,lab.length>4?7:8):"");
  const crowd=(xs,col,mood)=>xs.map((x,i)=>kid(x,82,.62,[C.red,C.grn,C.yel,C.blue,"#c86bfa"][(i+(col||0))%5],mood)).join("");
  const scissors=G(0,0,1,`<circle cx="-6" cy="-4" r="3" fill="none" stroke="${C.red}" stroke-width="1.8"/><circle cx="-6" cy="4" r="3" fill="none" stroke="${C.red}" stroke-width="1.8"/>${P("M-3 -3 L10 3 M-3 3 L10 -3",C.ink,1.6)}`);
  const knife=P("M-6 0 h6",C.wood2,3)+F("M0 -2 h14 l-3 4 h-11 z","#e8eef7");
  const pen=F("M-10 3 L8 -4 L10 -1 L-8 6 Z",C.yel)+P("M8 -4 L12 -6",C.ink,1.4);
  const ticket=(n,col)=>card(0,0,16,12,col||"#fff",txt(0,4,n,8));
  const pool=(x,y,cols)=>R(x,y-12,cols.length*9+6,24,"#fff",5)+cols.map((c,i)=>`<rect x="${x+5+i*9}" y="${y-7}" width="5" height="14" rx="2.5" fill="${c}" stroke="${C.ink}" stroke-width="1"/>`).join("");
  const elevator=(x,broken)=>R(x-16,20,32,62,broken?"#d9dce3":"#cfd8e6",2)+P(`M${x} 26 v56`,C.ink,1.2)+(broken?fire(x,40,.7):"")+O(x-22,52,3.5,broken?C.red:C.grn);
  const pile=(x,n)=>Array.from({length:n},(_,i)=>R(x-14+(i%2)*3,76-i*5,26,5,["#fff","#eaf2ff"][i%2],1)).join("");

  const Z={};
  const E="События и интеграция|", K="Кэш|", RD="Redis|", ES="Elasticsearch|", A="Архитектура|", N="Сеть|", API="API и REST|", FT="Отказоустойчивость|";

  /* 0 — 2PC */
  Z[E+"Почему не используют двухфазный коммит"]={
    p:[ bg(0)+kid(16,82,.85,C.red)+kid(104,82,.85,C.grn)+bubble(16,28,18,txt(0,4,"✓",11,C.grn))+bubble(104,28,18,txt(0,4,"✓",11,C.grn))+gb(60,.9,{hat:"crown",arms:"up",mood:"happy"})+bubble(60,13,20,txt(0,4,"?",12,C.blue)),
        bg(1)+kid(14,82,.8,C.red,"wow")+kid(106,82,.8,C.grn,"wow")+txt(14,36,"?",13,C.red)+txt(106,36,"?",13,C.red)+lie(84,70,.9,{mood:"dizzy",hat:"crown",arms:"up"})+spark(28,46,C.yel)+spark(40,38,C.yel),
        bg(2)+kid(22,82,.85,C.red,"sad")+lock(22,30,1)+kid(98,82,.85,C.grn,"sad")+lock(98,30,1)+clock(60,26,1.1,7)+lie(84,80,.75,{mood:"sleep"}),
        bg(3)+[30,60,90].map((x,i)=>`<circle cx="${x}" cy="18" r="9" fill="${i<2?C.grn:C.yel}" stroke="${C.ink}" stroke-width="1.2"/>`+txt(x,22,String(i+1),10,"#fff")).join("")+P("M40 18 h10 M70 18 h10",C.ink,1.6)+`<path d="M90 30 Q75 44 62 30" fill="none" stroke="${C.red}" stroke-width="1.8" stroke-dasharray="3 2"/>`+txt(76,46,"↩",11,C.red)+gb(40,.85,{arms:"point",mood:"happy"}) ],
    l:[["«готовы?» — «да!»","\"ready?\" — \"yes!\""],["главный упал","the boss fainted"],["все ждут под замком","everyone waits, locked"],["сага: шаг или откат","saga: step or undo"]],
    c:["Я спросил «готовы?» и упал — все застряли под замком. Поэтому беру сагу: шаг или откат.","I asked \"ready?\" and fainted, so everyone's stuck and locked. So I use a saga: step or undo."] };

  /* 1 — eventual consistency */
  Z[E+"Согласованность в конечном счёте"]={
    p:[ bg(0)+gb(28,.85,{arms:"hold",mood:"smile",item:sign("5",20,"#fff",C.grn,11)})+gb(92,.8,{arms:"hold",mood:"think",hat:"cap",item:sign("3",20,"#fff",C.red,11)})+txt(60,30,"≠",16,C.red),
        bg(1)+gb(50,.85,{legs:"run",arms:"hold",mood:"sweat",item:env(0,0,.7)})+txt(50,74,"",1)+card(50,14,18,12,"#fff",txt(0,4,"5",9,C.grn))+gb(100,.75,{mood:"think",hat:"cap",arms:"hold",item:sign("3",18,"#fff",C.red,10)})+clock(16,24,.9,2),
        bg(2)+gb(28,.85,{arms:"hold",mood:"happy",item:sign("5",20,"#fff",C.grn,11)})+gb(92,.8,{arms:"hold",mood:"happy",hat:"cap",item:sign("5",20,"#fff",C.grn,11)})+txt(60,30,"=",16,C.grn)+ok(60,48,.9) ],
    l:[["тут 5, а там 3","here 5, there 3"],["бегу с новостью","running with the news"],["сошлось","now they match"]],
    c:["Пока я бегу с новостью, у соседа старое. Потом сходится. Сколько ждать — решаем с бизнесом.","While I run with the news, my neighbour has old data. Then it matches. How long? Ask business."] };

  /* 2 — cache = stale ok */
  Z[K+"Кэш — это согласие на устаревшее"]={
    p:[ bg(0)+R(56,56,58,5,C.wood,2)+P("M62 61 v21 M108 61 v21",C.wood2,3)+G(96,46,1,bk("v1",C.blue))+gb(34,.95,{arms:"reach",mood:"happy",item:G(0,0,.9,bk("v1",C.blue))})+spark(60,24),
        bg(1)+house(92,82,1.05)+G(92,24,1,bk("v2",C.grn))+spark(106,16)+gb(30,.9,{arms:"hold",mood:"smile",item:bk("v1",C.blue)})+txt(64,40,"…",14,C.grey),
        bg(2)+gb(32,.9,{arms:"reach",mood:"sweat",item:bk("v1",C.blue)})+kid(92,82,.9,C.yel,"sad")+bubble(92,24,26,txt(0,4,"v2?",9,C.red)) ],
    l:[["копия рядом — быстро","a copy close by — fast"],["а вышло новое","but a new one is out"],["отдаю то, что есть","I hand out what I have"]],
    c:["Копия у меня на столе — даю мигом. Но она могла устареть. Если старое нельзя — кэш не нужен.","My copy is right on my desk — instant. But it may be old. If old is not OK, skip the cache."] };

  /* 3 — invalidation */
  Z[K+"Инвалидация — самая тяжёлая часть"]={
    p:[ bg(0)+R(64,48,50,5,C.wood,2)+P("M70 53 v29 M108 53 v29",C.wood2,3)+gb(40,.95,{arms:"carry",mood:"happy",item:G(0,0,1,bk("v1",C.blue))})+arrowR(58,30,76),
        bg(1)+clock(96,22,1,12)+txt(96,42,"0",9,C.red)+bin(98,82)+G(80,52,.9,bk("v1",C.blue))+gb(40,.95,{arms:"push",mood:"think"}),
        bg(2)+kid(100,82,.85,C.grn)+G(100,30,.9,bk("v2",C.grn))+gb(44,.95,{arms:"reach",mood:"happy",item:`<g opacity=".45">${bk("v1",C.blue)}</g>`+P("M-10 -12 L10 12 M10 -12 L-10 12",C.red,2.4)}),
        bg(3)+gb(36,.95,{arms:"hold",mood:"sweat",item:bk("v1",C.blue)})+phone(92,46,1.3,txt(0,4,"✗",14,C.red))+P("M76 24 l-5 -5 M80 20 l-2 -6",C.red,1.6) ],
    l:[["положить — легко","putting in is easy"],["срок вышел — в мусор","time's up — to the bin"],["записали — стёр копию","a write — copy erased"],["забыл — звоню мимо","forgot — wrong number"]],
    c:["Положить копию легко. Выкинуть вовремя трудно: по таймеру или стирать при каждой записи.","Putting a copy in is easy. Throwing it out on time is hard: by a timer or on every write."] };

  /* 4 — what to cache */
  Z[K+"Что кладут и чего не кладут"]={
    p:[ bg(0)+R(62,40,52,4,C.wood,2)+jar(74,40,C.grey,"S")+jar(96,40,C.yel)+gb(36,.95,{arms:"reach",mood:"happy",item:G(0,4,.8,jar(0,8,C.grey,"S"))})+txt(88,62,"×100",10,C.grn),
        bg(1)+gb(34,.95,{arms:"hold",mood:"think",item:R(-11,-9,22,18,C.grey,4)+txt(0,4,"1/365",6,C.ink)})+R(70,40,44,4,C.wood,2)+jar(80,40,C.grey,"S")+no(100,62,1.1),
        bg(2)+card(90,24,40,20,"#fff",txt(0,-2,"$ 101",8,C.grey)+txt(0,8,"$ 103",9,C.grn))+gb(36,.95,{arms:"reach",mood:"sweat",item:sign("101",22,"#fff",C.red,8)})+no(98,56,1),
        bg(3)+R(62,40,52,4,C.wood,2)+jar(74,40,C.grey,"S")+jar(96,40,C.yel)+gb(34,.95,{arms:"point",mood:"wow"})+card(88,60,40,18,"#fff",txt(0,4,"9 / 10 ✓",9,C.grn)) ],
    l:[["часто берут — на полку","used a lot — on the shelf"],["раз в год — не надо","once a year — no"],["нужно точно — нет","must be exact — no"],["как часто нахожу","how often I find it"]],
    c:["На полку — то, что берут часто и меняют редко. И считаю, как часто нахожу там нужное.","Shelve what's read often and changed rarely. And I count how often I find what I need."] };

  /* 5 — stampede */
  Z[K+"Одновременный промах кладёт базу"]={
    p:[ bg(0)+R(64,44,48,4,C.wood,2)+`<g opacity=".35">${jar(88,44,C.yel,"★")}</g>`+txt(88,30,"?",12,C.red)+clock(100,64,.9,8)+gb(36,.95,{arms:"up",mood:"wow"}),
        bg(1)+db(100,62,.95)+P("M86 30 l-4 -6 M100 26 v-6 M112 30 l4 -6",C.red,1.8)+crowd([58,68,78],0,"wow")+lie(48,74,.8,{mood:"dizzy"}),
        bg(2)+db(104,62,.85)+kid(80,82,.7,C.red)+arrowR(84,40,94,C.grn)+crowd([10,20],1)+gb(46,.9,{arms:"push",mood:"think"})+lock(46,18,.8),
        bg(3)+R(8,44,60,4,C.wood,2)+[[20,"8"],[38,"3"],[56,"6"]].map(a=>jar(a[0],44,C.yel)+clock(a[0],56,.55,+a[1])).join("")+gb(94,.95,{arms:"up",mood:"happy"}) ],
    l:[["популярный ключ протух","a hot key expired"],["сотня — разом в базу","a hundred hit the DB"],["идёт один, другие ждут","one goes, others wait"],["разные сроки","different timers"]],
    c:["Ключ протух — и сто запросов бегут в базу за одним. Пусть сходит один, а сроки разнесём.","A key expires and a hundred requests rush the DB for one thing. Let one go; spread the timers."] };

  /* 6 — redis not just cache */
  Z[RD+"Не только кэш"]={
    p:[ bg(0)+R(62,22,52,60,C.wood,3)+[[34,"1"],[50,"[ ]"],[66,"{ }"]].map(a=>R(66,a[0],44,13,"#f3d3a6",2)+txt(88,a[0]+10,a[1],8)).join("")+gb(34,.95,{arms:"reach",mood:"wow",item:G(4,0,1,R(-8,-6,16,12,"#f3d3a6",2))}),
        bg(1)+R(72,56,16,26,C.yel,1)+R(90,64,16,18,C.grey,1)+R(54,68,16,14,C.wood,1)+txt(80,68,"1",10)+txt(98,76,"2",9)+txt(62,78,"3",8,"#fff")+kid(80,56,.6,C.red,"wow")+gb(28,.9,{arms:"point",mood:"happy"}),
        bg(2)+door(96)+kid(72,82,.8,C.grn,"sad")+gb(32,.95,{arms:"hold",mood:"think",item:sign("5/5",24,"#fff",C.red,9)})+no(72,28,.8),
        bg(3)+P("M10 70 H110",C.grey,3)+[66,84,102].map(x=>box(x,70,14,12)).join("")+gb(32,.95,{arms:"carry",mood:"happy",item:box(0,8,16,14)})+key(92,40,1) ],
    l:[["ящики разной формы","drawers of many shapes"],["таблица лидеров","a leaderboard"],["лимит запросов","a rate limit"],["очереди и замки","queues and locks"]],
    c:["Я держу всё в памяти и умею ящики разной формы: счётчики, списки, очереди. Не только кэш.","I keep it all in memory, in drawers of many shapes: counters, lists, queues. Not just a cache."] };

  /* 7 — single thread */
  Z[RD+"Однопоточный — и это плюс"]={
    p:[ bg(0)+gb(32,.95,{mood:"happy",arms:"reach"})+counter(10,44)+R(60,58,8,6,C.red,1)+crowd([74,90,106],0)+ok(52,30,.8),
        bg(1)+gb(32,.95,{mood:"smile",arms:"reach",item:ticket("1")})+counter(10,44)+crowd([74,92],1)+card(74,32,14,10,"#fff",txt(0,4,"2",8))+card(92,32,14,10,"#fff",txt(0,4,"3",8)),
        bg(2)+gb(30,.95,{mood:"sweat",arms:"up"})+counter(10,44)+[0,1,2,3].map(i=>box(64+(i%2)*14,62-Math.floor(i/2)*12,14,12)).join("")+R(52,40,40,12,"#fff",3)+txt(72,49,"KEYS *",8,C.red)+crowd([100,112],2,"sad")+clock(104,22,.8,11) ],
    l:[["по одной — быстро","one at a time — fast"],["без драк и замков","no fights, no locks"],["одна тяжёлая — стоят все","one heavy job — all wait"]],
    c:["Я обслуживаю команды по одной, поэтому без драк. Но одна огромная команда задержит всех.","I serve commands one by one, so no fights. But one huge command makes everyone wait."] };

  /* 8 — TTL */
  Z[RD+"TTL — срок жизни ключа"]={
    p:[ bg(0)+fridge(92,jar(84,72,C.yel)+jar(100,72,C.red))+gb(36,.95,{arms:"reach",mood:"smile",item:G(0,6,1,jar(0,6,C.grn,"10"))}),
        bg(1)+fridge(92,jar(84,72,C.yel)+jar(100,72,C.red)+`<g opacity=".3">${jar(92,40,C.grn,"0")}</g>`)+spark(92,18)+gb(36,.95,{arms:"up",mood:"wow"}),
        bg(2)+fridge(92,"")+gb(40,.95,{arms:"point",mood:"sad"})+db(14,30,.55)+arrL(64,22,28,C.red)+txt(92,58,"0 0 0",9,C.red),
        bg(3)+fridge(92,jar(84,72,C.yel,"9")+jar(100,72,C.red,"4")+jar(92,40,C.grn,"7"))+gb(36,.95,{arms:"point",mood:"happy"}) ],
    l:[["ключу дали срок","the key gets a timer"],["срок вышел — исчез сам","time's up — it's gone"],["у всех один — пусто","same timer — all gone"],["разные сроки","different timers"]],
    c:["Я сам удаляю ключ, когда выходит срок. Дашь всем один срок — исчезнут разом и база охнет.","I delete a key myself when its time is up. Give all the same time and they vanish together."] };

  /* 9 — eviction */
  Z[RD+"Память кончается — что тогда"]={
    p:[ bg(0)+R(64,22,48,60,C.wood,3)+[0,1,2].map(r=>[0,1].map(c=>box(76+c*22,40+r*19,18,16)).join("")).join("")+gb(36,.95,{arms:"push",mood:"sweat",item:box(0,8,16,14)}),
        bg(1)+R(64,22,48,60,C.wood,3)+[0,1,2].map(r=>[0,1].map(c=>r===2&&c===1?"":box(76+c*22,40+r*19,18,16)).join("")).join("")+bin(26,82)+G(26,48,1,box(0,0,16,14,null,C.grey))+P("M20 40 l-3 -3 M33 38 l3 -3",C.grey,1.2)+gb(52,.9,{arms:"reach",mood:"think",flip:true}),
        bg(2)+R(74,22,40,60,C.wood,3)+[0,1,2].map(r=>[0,1].map(c=>box(84+c*20,40+r*19,16,16)).join("")).join("")+gb(46,.95,{arms:"hold",mood:"angry",item:no(0,0,1.2)})+kid(14,82,.75,C.yel,"sad")+G(14,38,1,box(0,0,12,10)) ],
    l:[["шкаф полон","the cupboard is full"],["выкинуть давно забытое","drop the long-unused"],["нет правила — отказ","no rule — writes refused"]],
    c:["Место кончилось: либо я выкидываю давно не нужное, либо отказываю в записи. Реши заранее.","Out of room: either I drop what's long unused, or I refuse writes. Decide in advance."] };

  /* 10 — distributed lock */
  Z[RD+"Распределённая блокировка и её опасность"]={
    p:[ bg(0)+door(92)+clock(92,16,.8,6)+txt(108,20,"30",8,C.ink)+gb(40,.95,{arms:"reach",mood:"happy",item:key(0,0,.9)}),
        bg(1)+R(8,20,104,62,"#f3e6cf",3)+R(56,52,40,6,C.wood,1)+gb(40,.9,{legs:"sit",mood:"sleep",arms:"down"})+clock(96,26,.8,12)+txt(96,46,"0",9,C.red),
        bg(2)+gb(32,.85,{mood:"sleep",legs:"sit"})+gb(86,.85,{hat:"cap",arms:"reach",mood:"smile",item:key(0,0,.8)})+txt(60,24,"2!",14,C.red),
        bg(3)+gb(28,.85,{arms:"hold",mood:"wow",item:box(0,6,14,12,"1")})+gb(92,.85,{hat:"cap",arms:"hold",mood:"smile",item:box(0,6,14,12,"1")})+card(60,28,26,16,"#fff",txt(0,4,"=1 ✓",9,C.grn)) ],
    l:[["взял ключ на 30 с","took the key for 30 s"],["завис — срок вышел","froze — time ran out"],["вошёл второй","a second one walks in"],["повтор не вредит","a repeat does no harm"]],
    c:["Ключ сам вернётся через срок. Завис я — войдёт второй. Поэтому повтор работы не должен вредить.","The key comes back by itself. If I freeze, a second one enters. So repeating must do no harm."] };

  /* 11 — LIKE */
  Z[ES+"Зачем, если есть LIKE"]={
    p:[ bg(0)+pile(88,9)+[0,1,2].map(i=>card(64+i*8,26-i*3,14,18,"#fff","",-20+i*14)).join("")+gb(36,.95,{arms:"up",mood:"sweat"})+clock(104,16,.8,4),
        bg(1)+card(90,30,40,18,"#fff",txt(0,4,"javva",10,C.red))+no(90,58,1)+gb(36,.95,{arms:"reach",mood:"sad",item:mag(0,0,.9)}),
        bg(2)+card(88,40,46,48,"#fff",txt(0,-12,"A … 5",8)+txt(0,0,"J … 88",9,C.grn)+txt(0,12,"Z … 12",8))+gb(36,.95,{arms:"point",mood:"happy"}) ],
    l:[["листаю всю книгу","leafing the whole book"],["опечатка — не нашёл","a typo — nothing found"],["указатель — сразу туда","the index — straight there"]],
    c:["LIKE листает всю книгу и не прощает опечаток. А я открываю указатель — и сразу на страницу.","LIKE leafs through the whole book and hates typos. I open the index and jump straight there."] };

  /* 12 — inverted index */
  Z[ES+"Инвертированный индекс"]={
    p:[ bg(0)+doc(68,40,"1",[0,2])+doc(90,44,"2",[1])+doc(108,48,"3",[0,1],18,26)+gb(30,.95,{arms:"carry",mood:"smile",item:G(0,-8,1,doc(0,0,"",[2,1],20,22))}),
        bg(1)+card(84,42,46,52,"#fff",[0,1,2].map(k=>shp(-12,-14+k*14,k,4)+txt(8,-10+k*14,["1,3","2,3","1"][k],9)).join(""))+gb(30,.95,{arms:"reach",mood:"think",item:pen}),
        bg(2)+bubble(96,16,20,shp(0,0,1,4))+kid(96,82,.8,C.red,"wow")+doc(64,38,"2",[1])+doc(64,70,"3",[0,1],18,24)+gb(26,.95,{arms:"point",mood:"happy"}) ],
    l:[["документы","the documents"],["слово → где встречается","word → where it is"],["нашёл сразу","found at once"]],
    c:["Я записываю, где встречается каждое слово. Спросили слово — сразу знаю страницы.","I note where each word appears. Ask me a word and I know the pages at once."] };

  /* 13 — text vs keyword */
  Z[ES+"text и keyword — разные типы"]={
    p:[ bg(0)+[0,1,2].map(k=>card(74+k*16,36+(k%2)*8,14,14,"#fff",shp(0,0,k,4),k*8-8)).join("")+P("M68 22 v40",C.grey,1.2,DASH)+gb(30,.95,{arms:"push",mood:"happy",item:scissors}),
        bg(1)+box(88,82,36,30)+R(72,58,32,14,C.yel,3)+txt(88,68,"ID-42",8)+gb(36,.95,{arms:"push",mood:"smile"}),
        bg(2)+R(70,40,40,16,C.yel,3)+[0,1,2].map(k=>shp(80+k*10,48,k,3.5)).join("")+gb(32,.95,{arms:"reach",mood:"sad",item:mag(0,0,.9)})+bubble(60,16,18,shp(0,0,1,4))+no(92,70,.9) ],
    l:[["text: режу на слова","text: cut into words"],["keyword: ярлык целиком","keyword: one whole label"],["не тот тип — не нашёл","wrong type — not found"]],
    c:["text я режу на слова и ищу по ним. keyword храню целиком — только точное совпадение.","I cut text into words and search them. keyword stays whole: only an exact match."] };

  /* 14 — near real time */
  Z[ES+"Почти реальное время"]={
    p:[ bg(0)+R(84,40,24,42,C.red,4)+R(88,46,16,4,C.ink,1)+gb(44,.95,{arms:"reach",mood:"smile",item:env(4,0,.6)}),
        bg(1)+gb(40,.95,{arms:"hold",mood:"sad",item:card(0,-4,30,22,"#fff",P("M-10 -5 h20 M-10 0 h14 M-10 5 h18",C.grey,1.2))})+clock(92,30,1,12)+txt(92,52,"0 s",9,C.red)+txt(74,24,"?",14,C.red),
        bg(2)+gb(40,.95,{arms:"hold",mood:"happy",item:card(0,-4,30,22,"#fff",P("M-10 -5 h20 M-10 0 h8",C.grey,1.2)+R(2,-2,10,8,C.yel,1))})+clock(92,30,1,1)+txt(92,52,"1 s",9,C.grn)+ok(74,22,.8) ],
    l:[["подал объявление","sent in my ad"],["ищу сразу — пусто","search now — empty"],["через секунду — есть","a second later — there"]],
    c:["Записал — найдут через секунду: указатель обновляется порциями. «Прямо сейчас» не обещаю.","Write now, find it a second later: I refresh the index in batches. Don't count on \"right now\"."] };

  /* 15 — not source of truth */
  Z[ES+"Не источник правды"]={
    p:[ bg(0)+R(66,26,46,56,C.wood,2)+[0,1].map(r=>[0,1,2,3,4].map(i=>R(70+i*8,32+r*24,6,20,[C.red,C.blue,C.grn,C.yel,"#c86bfa"][(i+r)%5],1)).join("")).join("")+gb(34,.95,{arms:"hold",mood:"smile",item:R(-9,-7,18,14,"#fff",2)+P("M-6 -2 h12 M-6 2 h12",C.grey,1)}),
        bg(1)+R(66,26,46,56,C.wood,2)+[0,1].map(r=>[0,1,2,3,4].map(i=>R(70+i*8,32+r*24,6,20,[C.red,C.blue,C.grn,C.yel,"#c86bfa"][(i+r)%5],1)).join("")).join("")+card(16,74,18,12,"#fff","")+fire(16,72,.8)+gb(44,.95,{arms:"reach",mood:"think",item:pen})+txt(42,16,"↻",14,C.grn),
        bg(2)+R(66,26,46,56,C.wood,2)+P("M70 50 h38 M70 74 h38",C.wood2,1.4)+txt(89,46,"?",16,C.red)+gb(34,.95,{arms:"hold",mood:"sad",item:R(-9,-7,18,14,"#fff",2)+P("M-6 -2 h12 M-6 2 h12",C.grey,1)}) ],
    l:[["книги — правда, тут копия","books are truth; a copy"],["каталог сгорел — соберу","catalogue burnt — rebuild"],["книг нет — беда","no books — disaster"]],
    c:["Правда в базе, у меня только каталог. Потеряли меня — соберут заново. Потеряли базу — беда.","Truth lives in the DB; I only hold the catalogue. Lose me: rebuilt. Lose the DB: disaster."] };

  /* 16 — monolith */
  Z[A+"Монолит — не ругательство"]={
    p:[ bg(0)+house(86,82,1.5)+db(86,74,.35)+gb(32,.95,{arms:"wave",mood:"happy"}),
        bg(1)+R(6,22,108,60,"#ffe6b0",3)+gb(30,.9,{arms:"push",mood:"happy"})+G(60,58,1,box(0,6,12,10))+spark(70,44)+gb(90,.85,{hat:"cap",arms:"hold",mood:"wow"}),
        bg(2)+house(60,82,1.6)+crowd([20,32,88,100],0,"sad")+gb(60,.75,{mood:"sweat",arms:"up"}) ],
    l:[["один дом, одна база","one house, one DB"],["вызов метода — мгновенно","a method call — instant"],["двадцать семей — тесно","twenty families — crowded"]],
    c:["Один дом, одна база, передал из рук в руки — и всё. Для команды до десяти человек это лучшее.","One house, one DB, hand to hand and done. For a team under ten, that's the best choice."] };

  /* 17 — microservices people */
  Z[A+"Микросервисы решают проблему ЛЮДЕЙ"]={
    p:[ bg(0)+stove(60)+gb(60,.9,{hat:"chef",mood:"dizzy",arms:"up"})+gb(26,.8,{hat:"chef",mood:"angry",arms:"push"})+gb(96,.8,{hat:"chef",mood:"sweat",arms:"up",flip:true}),
        bg(1)+stove(44)+stove(102)+gb(20,.8,{hat:"chef",mood:"happy",arms:"reach"})+gb(78,.8,{hat:"chef",mood:"smile",arms:"reach"})+P("M60 20 V82",C.ink,2),
        bg(2)+gb(30,.95,{hat:"chef",mood:"happy",arms:"hold",item:tray(C.red)})+clock(30,14,.7,3)+P("M60 20 V82",C.ink,2)+stove(102)+gb(80,.85,{hat:"chef",mood:"smile",arms:"reach"})+clock(80,14,.7,9) ],
    l:[["всем тесно на одной кухне","one kitchen is too crowded"],["у каждой команды своя","each team has its own"],["свой темп выкатки","each ships at its pace"]],
    c:["Сервисы делят не ради моды: двадцати поварам тесно на одной кухне. Своя кухня — свой темп.","Services aren't split for fashion: twenty cooks crowd one kitchen. Own kitchen, own pace."] };

  /* 18 — cost of split */
  Z[A+"Чем платят за разделение"]={
    p:[ bg(0)+R(6,22,108,60,"#ffe6b0",3)+gb(32,.9,{arms:"reach",mood:"happy",item:box(0,6,12,10)})+gb(88,.85,{hat:"cap",arms:"reach",mood:"smile",flip:true}),
        bg(1)+house(16,74,.8)+house(104,74,.8)+P("M28 78 H92",C.grey,4)+gb(56,.9,{legs:"run",arms:"hold",mood:"sweat",item:env(0,0,.7)})+txt(84,30,"?",14,C.red)+G(84,48,.6,`<g opacity=".4">${env(0,0,1)}</g>`),
        bg(2)+gb(36,.95,{arms:"reach",mood:"think",item:mag(0,0,.9)})+[66,78,90,102].map((x,i)=>`<ellipse cx="${x}" cy="${78-i*2}" rx="4" ry="2.5" fill="${C.bot2}" opacity="${.3+i*.2}"/>`).join("")+card(90,32,36,22,"#fff",P("M-14 -5 h10 M-8 0 h14 M-2 5 h12",C.blue,2.4)) ],
    l:[["был вызов метода","it was a method call"],["стал запрос по сети","now a network call"],["ищу по трейсам","debugging by traces"]],
    c:["Разделил — и вызов стал письмом: потеряется или опоздает. Сложность переехала, а не исчезла.","Split it and a call becomes a letter: lost or late. The complexity moved, it didn't vanish."] };

  /* 19 — where to cut */
  const cake=(x,w)=>R(x,64,w,12,"#e8b77a",1)+R(x,58,w,6,"#fff",1)+R(x,48,w,10,"#e8b77a",1)+R(x,44,w,4,"#f6a5c0",1);
  Z[A+"Где резать"]={
    p:[ bg(0)+R(58,76,56,4,C.grey,2)+cake(62,22)+cake(88,22)+gb(32,.95,{arms:"push",mood:"happy",item:knife}),
        bg(1)+R(64,58,46,6,"#fff",1)+R(64,70,46,10,"#e8b77a",1)+R(64,44,46,6,"#f6a5c0",1)+gb(32,.95,{arms:"hold",mood:"sweat",item:R(-12,-4,24,8,"#e8b77a",1)}),
        bg(2)+kid(94,82,.85,C.grn,"sad")+R(76,32,36,4,"#f6a5c0",1)+R(76,22,36,4,"#fff",1)+gb(36,.95,{arms:"push",mood:"dizzy",item:R(-12,-4,24,8,"#e8b77a",1)})+txt(94,16,"+",12,C.red) ],
    l:[["кусками: заказы, платежи","slices: orders, payments"],["слоями — катастрофа","by layers — a disaster"],["каждый собирает заново","each must rebuild it"]],
    c:["Режу как торт — кусками по делу: заказы, платежи. Не слоями, иначе любая правка трогает всех.","I cut it like a cake, by business: orders, payments. Not by layers, or every edit touches all."] };

  /* 20 — open a site */
  Z[N+"Что происходит, когда ты открываешь сайт"]={
    p:[ bg(0)+gb(34,.95,{arms:"hold",mood:"think",item:R(-11,-8,22,16,C.yel,2)+txt(0,4,"DNS",7)})+card(88,40,40,26,"#fff",txt(0,-3,"site.kz",8)+txt(0,8,"93.1.2.3",8,C.blue)),
        bg(1)+gb(30,.95,{arms:"reach",mood:"sweat",item:phone(0,0,.6)})+[0,1,2].map(i=>(i%2?arrL(96,30+i*14,62,C.blue):arrowR(62,30+i*14,96,C.blue))+txt(104,34+i*14,String(i+1),8)).join(""),
        bg(2)+gb(32,.95,{arms:"reach",mood:"smile",item:key(2,0,.8)})+lock(90,46,1.6)+spark(108,24),
        bg(3)+gb(32,.95,{arms:"reach",legs:"run",mood:"happy",item:env(0,0,.7)})+tag(90,36,30,"GET",C.yel)+arrowR(64,56,108),
        bg(4)+gb(36,.95,{arms:"carry",mood:"wow",item:box(0,8,32,16,"0101")})+server(94,56,1) ],
    l:[["имя → адрес","name → address"],["три пакета: связь","three packets: link"],["договорились о шифре","agreed on a cipher"],["наконец запрос","finally the request"],["в ответ — байты","bytes come back"]],
    c:["Узнать адрес, дозвониться, договориться о шифре — и только потом спросить. Первые шаги долгие.","Find the address, connect, agree on a cipher, then finally ask. The first steps take longest."] };

  /* 21 — client/server roles */
  Z[N+"Клиент и сервер — просто роли"]={
    p:[ bg(0)+kid(90,82,.9,C.red)+bubble(90,22,22,O(0,0,4,C.yel))+gb(38,.95,{arms:"hold",mood:"happy",item:tray(C.yel)}),
        bg(1)+R(74,20,40,62,"#eee4d6",3)+gb(94,.8,{hat:"chef",mood:"smile",arms:"hold",item:tray(C.red)})+gb(40,.95,{arms:"reach",mood:"think",item:card(0,0,14,16,"#fff",P("M-4 -3 h8 M-4 1 h8 M-4 5 h5",C.grey,1))}),
        bg(2)+kid(14,82,.75,C.red)+gb(60,.95,{arms:"up",mood:"wow"})+db(102,62,.85)+arrowR(24,30,42,C.grn)+arrowR(78,30,96,C.blue) ],
    l:[["для гостя я — сервер","to the guest I'm a server"],["для кухни — клиент","to the kitchen a client"],["роль — смотря откуда","the role depends on side"]],
    c:["Для гостя я сервер — жду заказ. Для кухни и базы я сам клиент — прошу. Роль зависит от стороны.","To a guest I'm a server: I wait. To the kitchen or DB, a client: I ask. It depends on the side."] };

  /* 22 — HTTP */
  Z[N+"HTTP: запрос, ответ и код"]={
    p:[ bg(0)+gb(34,.95,{arms:"reach",mood:"think",item:pen})+card(88,40,46,40,"#fff",txt(0,-8,"GET",9,C.blue)+txt(0,4,"/cat",9)+txt(0,14,"h: …",7,C.grey)),
        bg(1)+server(96,58,1)+gb(40,.95,{arms:"carry",mood:"happy",item:box(0,8,20,14)+O(8,-12,7,C.grn)+txt(8,-9,"200",5,"#fff")}),
        bg(2)+gb(28,.9,{arms:"hold",mood:"sweat",item:sign("404",22,"#fff",C.red,9)})+server(92,58,1,false)+fire(92,40,.9)+tag(92,20,26,"500",C.red,"#fff") ],
    l:[["метод, путь, заголовки","method, path, headers"],["ответ: код и тело","reply: code and body"],["4xx — ты, 5xx — сервер","4xx you, 5xx the server"]],
    c:["Я шлю метод и путь, мне отвечают кодом. 4xx — ошибся я, 5xx — у сервера пожар.","I send a method and a path, and get a code back. 4xx: my mistake. 5xx: the server is on fire."] };

  /* 23 — REST */
  Z[N+"REST — договорённость, а не технология"]={
    p:[ bg(0)+door(88,"/orders/42")+gb(40,.95,{arms:"point",mood:"smile"}),
        bg(1)+box(92,82,30,26,"42")+gb(42,.95,{arms:"reach",mood:"think",item:mag(0,0,.9)})+tag(92,30,26,"GET",C.blue,"#fff")+ok(108,50,.7),
        bg(2)+box(92,82,30,26,"5")+tag(80,30,24,"PUT",C.yel)+tag(104,30,24,"PUT",C.yel)+gb(40,.95,{arms:"push",mood:"happy"})+ok(108,46,.7) ],
    l:[["адрес — это вещь","an address is a thing"],["GET только смотрит","GET only looks"],["PUT дважды — то же","PUT twice — same result"]],
    c:["Адрес — вещь, метод — действие. GET только смотрит, PUT можно повторить. Все так договорились.","An address is a thing, a method an action. GET only looks; PUT is safe to repeat. All agreed."] };

  /* 24 — network slow */
  Z[N+"Сеть — самое медленное и самое ненадёжное"]={
    p:[ bg(0)+R(46,58,28,4,C.wood,2)+P("M50 62 v20 M70 62 v20",C.wood2,2.4)+gb(32,.9,{arms:"reach",mood:"happy",item:card(0,0,12,9,"#fff","")})+gb(88,.85,{hat:"cap",mood:"wow"})+spark(60,30),
        bg(1)+gb(24,.95,{arms:"reach",mood:"sweat",item:phone(0,0,.6)})+`<path d="M44 60 C 60 20, 80 90, 100 40" stroke="${C.ink}" stroke-width="1.4" fill="none" stroke-dasharray="3 2"/>`+house(104,40,.6)+clock(70,22,.9,10),
        bg(2)+gb(34,.95,{arms:"up",mood:"dizzy"})+env(84,26,.8)+env(100,32,.8)+txt(108,17,"×2",9,C.red)+`<g opacity=".35">${env(84,66,.8)}</g>`+txt(106,72,"?",14,C.red) ],
    l:[["соседу — мгновенно","to a neighbour — instant"],["по сети — в миллион раз","network — a million times"],["потеря, дубль, опоздание","lost, doubled, late"]],
    c:["Сказать соседу — мгновенно. Сеть в миллионы раз дольше и может потерять или задвоить письмо.","Next door is instant. The network is a million times slower and may lose or double a message."] };

  /* 25 — codes are a contract */
  Z[API+"Коды ответов — это контракт"]={
    p:[ bg(0)+tag(90,24,30,"4xx",C.yel)+card(90,54,30,32,"#fff",P("M-9 -8 h18 M-9 -2 h18 M-9 4 h10",C.grey,1.2))+gb(40,.95,{arms:"reach",mood:"think",item:pen}),
        bg(1)+siren(92,60,true)+tag(92,26,30,"5xx",C.red,"#fff")+gb(36,.95,{legs:"run",arms:"up",mood:"wow"}),
        bg(2)+siren(96,64,false)+gb(32,.95,{legs:"sit",mood:"sleep",arms:"hold",item:env(0,-4,.7)})+tag(70,26,30,"200",C.grn,"#fff")+fire(96,38,.8) ],
    l:[["4xx: чиню свой запрос","4xx: I fix my request"],["5xx: тревога и повтор","5xx: alarm and retry"],["200 с ошибкой — тишина","200 with error — silence"]],
    c:["По кодам настроены тревоги и повторы. Ответишь 200 с ошибкой внутри — я и не проснусь.","Alarms and retries watch the codes. Answer 200 with an error inside and I won't even wake up."] };

  /* 26 — idempotency */
  Z[API+"Идемпотентность методов"]={
    p:[ bg(0)+R(76,30,30,22,"#fff",4)+txt(91,45,"PAY",8,C.red)+gb(42,.95,{arms:"push",mood:"sad"})+coin(84,66)+coin(100,70)+txt(92,82,"−2",9,C.red),
        bg(1)+gb(38,.95,{arms:"reach",mood:"think",item:R(-10,-6,20,12,C.yel,3)+txt(0,4,"k7",8)})+R(76,30,30,22,"#fff",4)+txt(91,45,"PAY",8,C.red)+coin(92,68)+txt(92,82,"−1",9,C.grn),
        bg(2)+gb(30,.95,{arms:"hold",mood:"happy",item:card(0,-4,18,22,"#fff",txt(0,-2,"k7",7)+txt(0,7,"✓",8,C.grn))})+gb(92,.85,{hat:"cap",arms:"reach",mood:"smile",flip:true})+card(72,40,14,18,"#fff",txt(0,4,"✓",8,C.grn)) ],
    l:[["без ключа — дважды","no key — charged twice"],["с ключом k7","with key k7"],["повтор — прежний чек","repeat — the same receipt"]],
    c:["Нажал «оплатить» дважды? С тем же ключом второй запрос получит прежний чек, денег не спишут.","Pressed pay twice? With the same key the second request gets the old receipt, no new charge."] };

  /* 27 — versioning */
  const contract=(rows,x,y,extra)=>card(x,y,34,44,"#fff",txt(0,-14,"v1",8,C.blue)+rows.map((r,i)=>P(`M-11 ${-4+i*8} h${r}`,i===rows.length-1&&extra?extra:C.grey,1.6)).join(""));
  Z[API+"Версионирование: ломать нельзя"]={
    p:[ bg(0)+contract([22,18,22],60,40)+gb(24,.85,{arms:"point",mood:"happy"})+kid(98,82,.85,C.grn),
        bg(1)+contract([22,18,22,16],62,40,C.grn)+txt(86,58,"+",14,C.grn)+gb(24,.85,{arms:"reach",mood:"smile",item:pen})+kid(102,82,.8,C.grn),
        bg(2)+card(62,40,34,44,"#fff",txt(0,-14,"v1",8,C.blue)+P("M-11 -4 h22 M-11 12 h22",C.grey,1.6)+P("M-11 4 h18",C.red,1.6,DASH))+gb(24,.85,{arms:"down",mood:"sweat"})+kid(100,82,.8,C.grn,"sad")+no(100,26,.8),
        bg(3)+door(36,"v1",C.wood)+door(84,"v2",C.blue)+gb(60,.85,{arms:"wave",mood:"happy"}) ],
    l:[["договор v1","contract v1"],["добавил поле — норм","added a field — fine"],["убрал поле — сломал","removed a field — broken"],["ломаешь — это v2","breaking? make it v2"]],
    c:["Добавлять поле можно. Убрать или переименовать нельзя — старые клиенты сломаются. Для этого v2.","Adding a field is fine. Removing or renaming breaks old clients. That's what v2 is for."] };

  /* 28 — pagination */
  Z[API+"Пагинация: не отдавай всё"]={
    p:[ bg(0)+pile(30,13)+pile(58,11)+lie(112,78,.8,{mood:"dizzy"})+txt(56,14,"1 000 000",9,C.red),
        bg(1)+gb(36,.95,{arms:"carry",mood:"happy",item:[0,1,2,3].map(i=>R(-13+(i%2)*2,4-i*5,26,5,["#fff","#eaf2ff"][i%2],1)).join("")})+card(90,46,30,20,"#fff",txt(0,4,"20",11,C.grn))+kid(90,82,.6,C.red),
        bg(2)+card(86,38,40,48,"#fff",txt(0,-4,"20 ×2",8,C.red)+txt(0,8,"21",8)+txt(0,20,"22",8))+R(64,18,44,8,C.yel,2)+txt(86,25,"+1",7)+gb(34,.95,{arms:"point",mood:"sweat"}),
        bg(3)+card(86,40,40,48,"#fff",txt(0,-10,"43",8)+txt(0,2,"44",8)+txt(0,14,"45",8))+P("M100 12 v18 l-4 -4 l-4 4 v-18 z",C.red,1.4)+gb(34,.95,{arms:"reach",mood:"happy",item:sign("> 42",24,C.yel,C.ink,8)}) ],
    l:[["всё разом — завал","all at once — buried"],["по 20 штук","20 at a time"],["смещение съезжает","an offset slips"],["курсор «после 42»","cursor \"after 42\""]],
    c:["Не отдаю миллион строк разом — по 20. Закладка «после 42» не съедет, даже если добавят новых.","I don't hand out a million rows — 20 at a time. A bookmark \"after 42\" won't slip on inserts."] };

  /* 29 — validation */
  Z[API+"Валидация на границе"]={
    p:[ bg(0)+door(98)+kid(70,82,.85,C.red)+gb(32,.95,{arms:"reach",mood:"think",item:mag(0,0,.9),hat:"cap"}),
        bg(1)+R(6,22,108,60,"#efe7ff",3)+crowd([72,90,106],0)+txt(90,30,"♪",14,C.ink)+gb(34,.95,{arms:"wave",mood:"happy",legs:"sit"}),
        bg(2)+kid(96,82,.85,C.red,"sad")+gb(36,.95,{arms:"reach",mood:"smile",hat:"cap",item:card(12,0,26,30,"#fff",[0,1,2].map(i=>txt(-5,-6+i*9,"✗",7,C.red)+P(`M-1 ${-8+i*9} h9`,C.grey,1.2)).join(""))}) ],
    l:[["проверка на входе","checked at the door"],["внутри — уже доверяю","inside — I trust it"],["все ошибки списком","all errors in one list"]],
    c:["Проверяю всё на входе, а внутри уже доверяю. Ошибки отдаю списком, а не по одной.","I check everything at the door and trust it inside. I return all errors as one list."] };

  /* 30 — CORS */
  Z[API+"CORS — правило браузера, не защита"]={
    p:[ bg(0)+house(98,82,1.1)+laptop(60,64,.8,txt(0,-10,"a.kz",6))+gb(30,.95,{arms:"push",mood:"angry",hat:"cap",item:no(-2,0,.8)}),
        bg(1)+house(98,82,1.1)+tag(98,20,28,"a.kz ✓",C.grn,"#fff",7)+gb(46,.95,{arms:"wave",mood:"happy",hat:"cap"}),
        bg(2)+gb(30,.95,{arms:"up",mood:"wow",hat:"cap"})+house(100,82,1.1)+kid(72,82,.8,C.ink)+tag(72,26,28,"curl",C.ink,"#fff",8)+arrowR(80,60,92,C.red),
        bg(3)+tag(80,26,22,"*",C.red,"#fff",11)+txt(96,30,"+",11)+key(108,26,.6)+no(86,52,1.2)+gb(36,.95,{arms:"hold",mood:"sweat",hat:"cap",item:key(0,0,.8)}) ],
    l:[["браузер не дал прочитать","the browser blocks it"],["сервер разрешил — можно","server allowed — OK"],["curl идёт мимо меня","curl walks right past me"],["* с логином — нельзя","* with auth — never"]],
    c:["Я — правило браузера, берегу пользователя. curl ходит мимо меня, так что API защищай сам.","I'm a browser rule guarding the user. curl walks right past me, so guard your API yourself."] };

  /* 31 — rate limit */
  Z[API+"Ограничение частоты запросов"]={
    p:[ bg(0)+bucket(88,82,3,1.2)+gb(40,.95,{arms:"reach",mood:"smile",item:coin(0,0,.9)})+clock(88,18,.7,3),
        bg(1)+bucket(30,82,2,1)+gb(60,.85,{arms:"reach",mood:"happy",item:coin(0,0,.8)})+kid(100,82,.8,C.red),
        bg(2)+bucket(28,82,0,1)+gb(62,.95,{arms:"hold",mood:"think",item:sign("429",24,C.red,"#fff",9)})+kid(102,82,.75,C.grn,"sad")+clock(104,22,.7,6),
        bg(3)+bucket(60,40,3,.9)+gb(22,.75,{arms:"reach",mood:"smile"})+gb(60,.75,{arms:"up",mood:"happy"})+gb(98,.75,{arms:"reach",mood:"smile",flip:true}) ],
    l:[["ведро копит жетоны","the bucket fills tokens"],["запрос берёт жетон","a request takes a token"],["пусто — 429, позже","empty — 429, later"],["одно ведро на все поды","one bucket for all pods"]],
    c:["Я кладу жетоны в ведро ровно. Нет жетона — 429 и «приходи позже». Ведро одно на все поды.","I drop tokens in the bucket steadily. No token: 429, come later. One bucket for all pods."] };

  /* 32 — something is always broken */
  const city=(bad)=>[0,1,2,3,4].map(i=>house(66+(i%3)*20,i<3?44:76,.45,i===bad?C.grey:C.red)).join("")+(bad!=null?no(66+(bad%3)*20,bad<3?26:58,.5):"");
  Z[FT+"В распределённой системе всегда что-то сломано"]={
    p:[ bg(0)+city(1)+gb(28,.95,{arms:"hold",mood:"think",item:card(0,-2,22,16,"#fff",P("M-8 -3 h16 M-8 3 h10",C.grey,1.2))})+txt(28,16,"99%",9,C.red),
        bg(1)+R(60,70,54,6,C.grey,1)+[0,1,2].map(i=>R(64+i*16,60,12,8,i%2?"#fff":C.red,1)).join("")+P("M68 60 v14 M108 60 v14",C.ink,1.4)+gb(30,.95,{arms:"up",mood:"sweat",legs:"run"}),
        bg(2)+`<path d="M8 76 C 40 76, 40 30, 70 30 S 100 76, 114 76" stroke="${C.grn}" stroke-width="3" fill="none" stroke-dasharray="5 3"/>`+R(46,66,28,6,C.grey,1)+[0,1].map(i=>R(48+i*13,58,10,8,C.red,1)).join("")+gb(70,.8,{arms:"point",mood:"happy",legs:"run"}).replace("translate(70 82)","translate(70 50)") ],
    l:[["из десяти один лежит","one of ten is down"],["улица перекрыта","the road is closed"],["объезд готов","detour ready"]],
    c:["Из десяти сервисов что-то да сломано. Я не удивляюсь, а заранее знаю, где объезд.","With ten services, something is always broken. I'm not surprised: I know the detour in advance."] };

  /* 33 — no timeout */
  Z[FT+"Вызов без таймаута — бомба"]={
    p:[ bg(0)+gb(36,.95,{arms:"reach",mood:"sweat",item:phone(0,0,.6)})+txt(80,36,"♪ ♪ ♪",10,C.grey)+clock(96,62,1,5),
        bg(1)+[0,1,2,3].map(i=>box(80+(i%2)*18,82-Math.floor(i/2)*16,16,14)).join("")+box(88,50,16,14)+lie(60,78,.85,{mood:"dizzy",arms:"reach"})+G(64,58,.55,phone(0,0,1)),
        bg(2)+clock(90,26,.9,1)+txt(90,46,"2 s",9,C.red)+gb(36,.95,{arms:"push",mood:"happy",legs:"run",item:box(0,6,14,12)})+ok(100,66,.9) ],
    l:[["звоню — одни гудки","I call — just beeps"],["дела стоят — упал я","work piles up — I'm down"],["таймаут — и дальше","a timeout — move on"]],
    c:["Без таймаута слушаю гудки вечно, дела копятся, и падаю я, а не он. Таймаут — на каждый вызов.","No timeout: I hear beeps forever, work piles up, and I fall, not him. Time out every call."] };

  /* 34 — retries */
  Z[FT+"Ретраи чинят и убивают"]={
    p:[ bg(0)+elevator(90)+gb(34,.95,{arms:"reach",mood:"happy"})+txt(62,34,"1×",10,C.grn),
        bg(1)+elevator(98,true)+crowd([12,24],0,"wow")+gb(48,.9,{arms:"push",mood:"dizzy"})+txt(60,20,"×10",10,C.red),
        bg(2)+elevator(98)+gb(36,.95,{arms:"hold",mood:"think",item:sign("≤ 3",24,C.yel,C.ink,10)})+P("M56 30 l4 4 l7 -8",C.grn,2.4) ],
    l:[["сбой — нажал ещё раз","a blip — pressed again"],["все жмут — добили","all press — it's dead"],["только безопасно и ≤ 3","only safe ones, ≤ 3"]],
    c:["Повтор спасает от случайной ошибки. Но если все разом жмут по десять раз — лифт добьют.","A retry fixes a random blip. But if everyone presses ten times at once, the lift breaks."] };

  /* 35 — backoff + jitter */
  Z[FT+"Экспоненциальная задержка и разброс"]={
    p:[ bg(0)+door(100)+[1,2,4,8].map((n,i)=>clock(42+i*14,22+(i%2)*6,.35+i*.12,n)).join("")+gb(30,.95,{arms:"push",mood:"think"})+txt(66,50,"1 2 4 8",8,C.blue),
        bg(1)+door(100)+gb(36,.85,{arms:"push",mood:"sweat"})+crowd([58,70,82],0,"wow")+txt(70,26,"!!!",12,C.red),
        bg(2)+door(106)+R(42,20,16,16,"#fff",3)+[[-4,-4],[4,4],[0,0]].map(a=>`<circle cx="${50+a[0]}" cy="${28+a[1]}" r="1.6" fill="${C.ink}"/>`).join("")+gb(24,.85,{arms:"up",mood:"happy"})+kid(56,82,.62,C.grn)+fade(kid(72,82,.62,C.red),.6)+fade(kid(88,82,.62,C.yel),.3) ],
    l:[["пауза растёт вдвое","the pause doubles"],["без разброса — волна","no jitter — one big wave"],["с разбросом — ровно","with jitter — smooth"]],
    c:["Жду всё дольше: 100, 200, 400 мс. И бросаю кубик, чтобы все не постучали разом.","I wait longer each time: 100, 200, 400 ms. And I roll a die so we don't all knock at once."] };

  /* 36 — circuit breaker */
  const breaker=(x,on)=>R(x-14,26,28,40,"#eef1f6",3)+R(x-5,on?32:46,10,14,on?C.grn:C.red,2);
  Z[FT+"Circuit breaker: перестань стучаться"]={
    p:[ bg(0)+card(90,44,40,36,"#fff",txt(0,-4,"✗ ✗ ✗",10,C.red)+txt(0,10,"✗ ✗",10,C.red))+gb(36,.95,{arms:"reach",mood:"sweat",item:pen}),
        bg(1)+breaker(96,false)+gb(50,.9,{arms:"push",mood:"angry",flip:true})+kid(14,82,.7,C.grn,"sad")+no(14,40,.8),
        bg(2)+breaker(96,false)+clock(70,20,.8,3)+gb(40,.95,{arms:"reach",mood:"think",item:env(0,0,.6)})+txt(66,50,"1",10,C.blue),
        bg(3)+breaker(96,true)+ok(96,78,.8)+gb(40,.95,{arms:"up",mood:"happy"}) ],
    l:[["считаю ошибки","counting errors"],["порог — разомкнул","threshold — circuit open"],["пауза — одна проба","pause — one probe"],["прошла — замкнул","it passed — closed again"]],
    c:["Много ошибок — я размыкаюсь и сразу отвечаю отказом, не трачу потоки. Через паузу пробую раз.","Too many errors: I open and refuse at once, saving threads. After a pause I try just once."] };

  /* 37 — bulkhead */
  const hull=(inner)=>`<path d="M6 54 H114 L104 84 H16 Z" fill="${C.wood}" stroke="${C.ink}" stroke-width="1.3"/>`+(inner||"");
  const wet=(x1,x2)=>`<path d="M${x1} 62 H${x2} L${x2-(x2>100?5:0)} 82 H${x1+(x1<20?5:0)} Z" fill="${C.blue}" opacity=".75"/>`;
  const walls=P("M44 54 V84 M76 54 V84",C.wood2,3);
  const on=(x,s,o)=>bot(x,54,s,o);
  Z[FT+"Bulkhead: не дай одному соседу утопить всё"]={
    p:[ bg(1)+hull(wet(10,110))+P("M100 70 l4 -4 M104 74 l5 -2",C.ink,1.4)+on(34,.8,{arms:"up",mood:"dizzy"})+on(86,.75,{hat:"cap",mood:"sad"})+txt(60,20,"!!!",12,C.red),
        bg(0)+hull(walls)+on(30,.8,{arms:"carry",mood:"think",item:R(-14,-3,28,6,C.wood2,1)})+on(92,.75,{hat:"cap",mood:"smile",arms:"push"}),
        bg(2)+hull(walls+wet(78,110))+on(26,.8,{arms:"wave",mood:"happy"})+on(94,.75,{mood:"sad",hat:"cap"})+ok(56,30,.9) ],
    l:[["общий пул — тонут все","one pool — all sink"],["ставлю переборки","building bulkheads"],["тонет один отсек","only one sinks"]],
    c:["Каждому соседу — свой отсек потоков. Завис один — утонет только его отсек, а не весь корабль.","Each neighbour gets its own thread compartment. One hangs — only its compartment sinks."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 6 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* свои детали */
  const G=(x,y,s,inner,rot)=>`<g transform="translate(${x} ${y})${s&&s!==1?` scale(${s})`:""}${rot?` rotate(${rot})`:""}">${inner}</g>`;
  const door=(x,y,open)=>`<g transform="translate(${x} ${y})"><rect x="-11" y="-36" width="22" height="36" rx="1.5" fill="${open?"#3b4256":C.wood2}"/>${open?`<path d="M-9 -34 L-1 -31 V-3 L-9 0 Z" fill="${C.wood}" stroke="${C.wood2}"/>`:`<rect x="-9" y="-34" width="18" height="34" fill="${C.wood}" stroke="${C.wood2}"/><circle cx="5" cy="-16" r="1.5" fill="${C.ink}"/>`}</g>`;
  const ctr=(x,y,w,h,col,lab,op,rot)=>{ const n=Math.max(2,Math.floor(w/7)); let r=""; for(let i=1;i<n;i++) r+=`<path d="M${-w/2+i*w/n} ${-h+2} v${h-4}" stroke="#fff" stroke-width=".9" opacity=".45"/>`;
    return `<g transform="translate(${x} ${y})${rot?` rotate(${rot})`:""}" opacity="${op||1}"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>${r}${lab!=null?txt(0,-h/2+3.5,lab,8,"#fff"):""}</g>`; };
  const star=(x,y,r,col)=>{ let d=""; for(let i=0;i<10;i++){ const a=Math.PI/5*i-Math.PI/2, rr=i%2?r*.45:r; d+=(i?"L":"M")+(x+rr*Math.cos(a)).toFixed(1)+" "+(y+rr*Math.sin(a)).toFixed(1); } return `<path d="${d}Z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width=".7"/>`; };
  const moon=(x,y)=>`<path d="M${x} ${y-8} a8 8 0 1 0 8 10 a6.5 6.5 0 0 1 -8 -10 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>`;
  const zz=(x,y)=>txt(x,y,"z",7,C.bot2)+txt(x+6,y-6,"z",9,C.bot2)+txt(x+13,y-13,"z",11,C.bot2);
  const loopA=(x,y,r,col)=>`<path d="M${x+r} ${y} A${r} ${r} 0 1 1 ${x} ${y-r}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x-3} ${y-r-3.5} L${x+1.5} ${y-r} L${x-3} ${y-r+3.5}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const pass=(x,y,col,rot)=>card(x,y,20,14,col||"#fff",`<circle cx="-5" cy="0" r="3" fill="${C.bot}"/><path d="M0 -2.5 h6 M0 2 h5" stroke="${C.ink}" stroke-width="1.2" stroke-linecap="round"/>`,rot);
  const salt=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-6" y="-12" width="12" height="16" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M-6 -11 q6 -7 12 0" fill="${C.grey}" stroke="${C.ink}"/></g>`;
  const zone=(x1,y1,x2,y2,col)=>`<rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="7" fill="${col||"#fff"}" fill-opacity=".55" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="4 2.5"/>`;
  const dc=(x,y,col,lab,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-11" y="-30" width="22" height="30" rx="1.5" fill="${col||C.grey}" stroke="${C.ink}" stroke-width="1.2"/>${[-24,-17,-10].map(d=>`<rect x="-7" y="${d}" width="5" height="4" fill="#fff" opacity=".8"/><rect x="2" y="${d}" width="5" height="4" fill="#fff" opacity=".8"/>`).join("")}${lab?txt(0,-33,lab,8):""}</g>`;
  const bucket=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-14 -12 L-10 14 H10 L14 -12 Z" fill="${col||C.ant}" stroke="${C.ink}" stroke-width="1.3"/><ellipse cx="0" cy="-12" rx="14" ry="4" fill="#ffd2c4" stroke="${C.ink}" stroke-width="1.3"/></g>`;
  const chain=(x1,y1,x2,y2,w)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.ink}" stroke-width="${(w||2)+1.6}" stroke-linecap="round"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.grey}" stroke-width="${w||2}" stroke-dasharray="4 2"/>`;
  const cal=(x,y,lab)=>`<g transform="translate(${x} ${y})"><rect x="-11" y="-11" width="22" height="22" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="-11" y="-11" width="22" height="7" rx="3" fill="${C.red}"/>${txt(0,8,lab,9)}</g>`;
  const pencil=(x,y,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot==null?45:rot})"><rect x="-2.5" y="-14" width="5" height="18" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/><path d="M-2.5 4 L0 9 L2.5 4 Z" fill="${C.wood}" stroke="${C.ink}" stroke-width="1"/></g>`;
  const mpod=(x,y,col,op)=>`<g opacity="${op||1}"><rect x="${x-9}" y="${y-9}" width="18" height="18" rx="5" fill="${col||C.bot}" stroke="${C.ink}" stroke-width="1.1"/><rect x="${x-4.5}" y="${y-4.5}" width="9" height="9" rx="1.5" fill="#fff" opacity=".75"/></g>`;
  const web=(x,y)=>`<g transform="translate(${x} ${y})" stroke="${C.ink}" stroke-opacity=".55" stroke-width="1" fill="none"><path d="M0 0 L14 0 M0 0 L0 14 M0 0 L11 11"/><path d="M5 0 Q5 5 0 5 M10 0 Q10 10 0 10"/></g>`;
  const line=(x1,y1,x2,y2,col,dash,w)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="${w||1.6}" ${dash?'stroke-dasharray="3 2.5"':""} stroke-linecap="round"/>`;
  const fp=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><ellipse rx="7" ry="9" fill="#fff" stroke="${C.ink}" stroke-width="1"/><path d="M-4.5 5 q-1 -10 4.5 -10.5 q5.5 .5 4.5 10.5 M-2 6 q-1 -7.5 2 -7.5 q3 0 2 7.5 M0 6 v-4" stroke="${col||C.bot2}" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>`;
  const flame=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M0 0 q-9 -4 -5 -14 q1 5 4 5 q-2 -8 5 -14 q0 8 5 11 q4 6 -1 12 z" fill="${C.red}" stroke="${C.ink}" stroke-width=".8"/><path d="M1 -1 q-4 -3 -1 -8 q2 3 3 3 q2 3 -2 5z" fill="${C.yel}"/></g>`;
  const table=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="4" rx="1.5" fill="${C.wood}" stroke="${C.wood2}"/><path d="M${x1+4} ${y+4} V80 M${x2-4} ${y+4} V80" stroke="${C.wood2}" stroke-width="2.6"/>`;
  const chairI=(col)=>`<path d="M-4.5 0 v-11 h9 v11 M4.5 -11 v-12" stroke="${col||C.wood2}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="-5.5" y="-13" width="11" height="3" rx="1" fill="${col||C.wood}"/>`;
  const chair=(x,y,col,rot)=>`<g transform="translate(${x} ${y})${rot?` rotate(${rot})`:""}">${chairI(col)}</g>`;
  const car=(x,y,col,inner)=>`<g transform="translate(${x} ${y})"><path d="M-25 -5 v-11 q0 -3 3 -3 h8 l6 -8 h17 l6 8 h7 q3 0 3 3 v11 z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-12 -19 l4.5 -6 h6.5 v6 z M2 -19 v-6 h5.5 l4.5 6 z" fill="#dfe9ff"/>${inner||""}<circle cx="-14" cy="-5" r="5" fill="${C.ink}"/><circle cx="14" cy="-5" r="5" fill="${C.ink}"/><circle cx="-14" cy="-5" r="2" fill="${C.grey}"/><circle cx="14" cy="-5" r="2" fill="${C.grey}"/></g>`;
  const house=(x,y,s,col,inner)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-22" y="-4" width="44" height="6" fill="${C.grey}" stroke="${C.ink}" stroke-width="1"/><rect x="-18" y="-26" width="36" height="22" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-22 -26 L0 -42 L22 -26 z" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/>${inner||`<rect x="-4" y="-16" width="8" height="12" fill="${C.wood2}"/><rect x="-14" y="-21" width="7" height="6" fill="#cfe5fb" stroke="${C.ink}" stroke-width=".6"/><rect x="7" y="-21" width="7" height="6" fill="#cfe5fb" stroke="${C.ink}" stroke-width=".6"/>`}</g>`;
  const safe=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-15" y="-30" width="30" height="30" rx="3" fill="${col||"#7d8599"}" stroke="${C.ink}" stroke-width="1.3"/><rect x="-11" y="-26" width="22" height="22" rx="2" fill="none" stroke="#fff" stroke-opacity=".5"/><circle cx="0" cy="-15" r="6" fill="#fff" stroke="${C.ink}"/><path d="M0 -15 l3.5 -3" stroke="${C.ink}" stroke-width="1.4"/></g>`;
  const suit=(x,y,w,h,col)=>`<g transform="translate(${x} ${y})"><path d="M-5 ${-h} v-4 h10 v4" fill="none" stroke="${C.ink}" stroke-width="1.6"/><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="3" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2"/><path d="M${-w/2+4} ${-h} v${h} M${w/2-4} ${-h} v${h}" stroke="#000" stroke-opacity=".2" stroke-width="1.4"/></g>`;
  const pod=(s,inner)=>`<g transform="scale(${s||1})"><rect x="-17" y="-12" width="34" height="24" rx="6" fill="${C.face}" stroke="${C.bot2}" stroke-width="1.8" stroke-dasharray="4 2.5"/>${inner||`<rect x="-13" y="-7" width="11" height="12" rx="2" fill="${C.blue}" stroke="${C.ink}"/><rect x="2" y="-7" width="11" height="12" rx="2" fill="${C.grn}" stroke="${C.ink}"/><path d="M-2 0 h4" stroke="${C.ink}" stroke-width="2"/><path d="M-13 8 h26" stroke="${C.wood2}" stroke-width="2"/>`}</g>`;
  const stack=(w,cols,h)=>cols.map((c,i)=>`<rect x="${-w/2}" y="${-(h||6)*(i+1)}" width="${w}" height="${h||6}" rx="1.5" fill="${c}" stroke="${C.ink}" stroke-width="1"/>`).join("");
  const keyring=`<circle cx="0" cy="-6" r="5" fill="none" stroke="${C.grey}" stroke-width="2"/>`+G(-6,2,.7,key(0,0,1),70)+G(0,4,.7,key(0,0,1,C.grn),90)+G(6,2,.7,key(0,0,1,C.red),110);
  const meter=(x,y,val)=>card(x,y,30,18,"#3b4256",`<rect x="-12" y="-6" width="24" height="12" rx="2" fill="#163"/>`+txt(0,3.5,val,8,"#7dff9a"));
  const coins=(x,y,n)=>Array.from({length:n},(_,i)=>coin(x+(i%3)*9,y-Math.floor(i/3)*9,.75)).join("");
  const gears=(x,y,n)=>Array.from({length:n},(_,i)=>gear(x+i*13,y,.45)).join("");
  const pot=(s)=>`<g transform="scale(${s||1})"><path d="M-11 -8 h22 v9 a6 6 0 0 1 -6 6 h-10 a6 6 0 0 1 -6 -6 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-14 -8 h28" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M-4 -12 q2 -3 0 -6 M3 -12 q2 -3 0 -6" stroke="${C.grey}" stroke-width="1.2" fill="none"/></g>`;
  const bar=(x,y,w,h,col)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" rx="1.5" fill="${col}" stroke="${C.ink}" stroke-width="1"/>`;

  const blk=(x,y,w,h,lab,col)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${col||C.grey}" stroke="${C.ink}" stroke-width="1.1"/>${txt(0,-h/2+2.6,lab,7,"#fff")}</g>`;
  const stool=(x,y,s)=>`<rect x="${x-12*s}" y="${y-9*s}" width="${20*s}" height="${3*s}" rx="1" fill="${C.wood}" stroke="${C.wood2}"/><path d="M${x-10*s} ${y-6*s} V${y} M${x+6*s} ${y-6*s} V${y}" stroke="${C.wood2}" stroke-width="${2*s}"/>`;
  const Z={};
  const F="Отказоустойчивость|", B="Безопасность|", KC="Keycloak и OAuth2|", D="Docker|", K8="Kubernetes|", CL="Облако|", A="AWS|";

  /* ---------- Отказоустойчивость ---------- */
  const pg=(inner)=>phone(0,-4,1,`<rect x="-5.5" y="-10" width="11" height="5" rx="1" fill="${C.bot}"/>`+inner);
  Z[F+"Деградация лучше отказа"]={
    p:[ bg(0)+server(94,60,.85,false)+no(94,26,.9)+curve(84,40,62,50,C.red,true)+bot(38,82,1,{arms:"hold",mood:"sweat",item:pg(`<rect x="-5.5" y="-3" width="11" height="12" rx="1" fill="none" stroke="${C.red}" stroke-width="1" stroke-dasharray="2 1.5"/>`)}),
        bg(1)+bot(38,82,1,{arms:"hold",mood:"sad",item:phone(0,-4,1,txt(0,2,"500",4.6,C.red))})+kid(96,82,.95,C.blue,"sad")+no(70,24),
        bg(2)+bot(38,82,1,{arms:"hold",mood:"happy",item:pg(star(-2.6,-.5,2.4)+star(2.6,-.5,2.4)+star(-2.6,5.5,2.4)+star(2.6,5.5,2.4))})+kid(96,82,.95,C.blue,"smile")+ok(70,24)+spark(104,24) ],
    l:[["сломалась одна часть","one part broke"],["пустая страница — плохо","blank page — bad"],["покажу популярное","I show popular instead"]],
    c:["Одна часть сломалась — покажу запасное. Главное работает, а идеал подождёт.","One part broke — I show a fallback. The main thing keeps working; perfect can wait."] };

  Z[F+"Graceful shutdown"]={
    p:[ bg(0)+door(98,76,true)+bubble(70,18,46,txt(0,3,"SIGTERM",8,C.red))+bot(40,82,1,{arms:"hold",mood:"wow",item:env(0,-4,.9,C.yel)}),
        bg(1)+door(72,76,false)+no(72,30,.8)+kid(104,82,.9,C.red,"sad")+bot(42,82,1,{arms:"push",mood:"think"}),
        bg(2)+kid(96,82,.95,C.grn,"smile")+clock(18,18,.85,9)+bot(48,82,1,{arms:"reach",mood:"smile",item:box(0,7,16,14,"✓")}),
        bg(3)+door(98,76,false)+lock(98,44,.7)+moon(26,20)+ok(80,16,.8)+bot(48,82,1,{legs:"sit",mood:"sleep"}) ],
    l:[["пришёл SIGTERM","SIGTERM arrives"],["новых не пускаю","no new customers"],["доделываю начатое","finish what's started"],["всё закрыл — выхожу","all closed — I exit"]],
    c:["Сказали «стоп» — новых не беру, доделываю начатое и только потом выключаюсь.","Told to stop, I take no new work, finish what I started, and only then switch off."] };

  /* ---------- Безопасность ---------- */
  Z[B+"Никогда не доверяй тому, что пришло снаружи"]={
    p:[ bg(0)+laptop(88,70,1.25,`<rect x="-11" y="-18" width="16" height="5" rx="1" fill="#fff" stroke="${C.grey}" stroke-width=".7"/><path d="M8 -15.5 l2 2 l3 -4" stroke="${C.grn}" stroke-width="1.6" fill="none"/><rect x="-11" y="-11" width="22" height="4" rx="1" fill="${C.grn}"/>`)+bot(32,82,1,{arms:"point",mood:"happy"}),
        bg(1)+kid(22,82,.95,"#8a5cd6","smile")+env(52,52,1.1,"#fff")+txt(52,36,"id=9",9,C.red)+bot(90,82,1,{arms:"reach",flip:true,mood:"sweat"}),
        bg(2)+env(86,48,1.2,"#fff")+txt(86,30,"id=9",9,C.red)+no(102,62,.9)+bot(36,82,1,{arms:"reach",mood:"happy",glasses:true,item:mag(0,0,1)}) ],
    l:[["проверка в браузере","a check in the browser"],["запрос можно подделать","a request can be faked"],["проверяю сам на сервере","I check on the server"]],
    c:["Всё, что пришло снаружи, проверяю сам. Проверка в браузере — только для удобства.","I check everything from outside myself. Browser checks are only for convenience."] };

  Z[B+"SQL-инъекция: чужой текст стал командой"]={
    p:[ bg(0)+card(82,30,46,13,"#fff",txt(0,3.5,"WHERE n='",7.5))+txt(82,46,"+",11)+card(82,60,46,13,"#fde4ec",txt(0,3.5,"x'; DROP",7.5,C.red))+bot(30,82,1,{arms:"reach",mood:"smile"}),
        bg(1)+db(86,60,1.2)+flame(78,40,1)+flame(94,42,.8)+card(86,22,34,12,"#fde4ec",txt(0,3.5,"DROP",8,C.red))+bot(32,82,1,{arms:"up",mood:"dizzy"}),
        bg(2)+card(86,22,52,13,"#fff",txt(0,3.5,"WHERE n=?",7.5))+db(88,62,1)+ok(108,42,.8)+bot(36,82,.95,{arms:"carry",mood:"happy",item:box(0,6,26,16,"x';")}) ],
    l:[["склеил запрос из строк","glued the query strings"],["текст стал командой","text became a command"],["значение — параметром","the value as a parameter"]],
    c:["Склеишь запрос из строк — чужой текст выполнится. С параметром база их не спутает.","Glue strings into a query and outside text runs. With a parameter the DB can't mix them."] };

  Z[B+"Пароли не хранят"]={
    p:[ bg(0)+table(62,112,64)+card(86,56,32,14,"#fff",txt(0,3.5,"1234",8))+[[64,46],[68,52],[72,47]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="1.2" fill="${C.grey}"/>`).join("")+bot(30,82,1,{arms:"reach",mood:"think",item:G(0,0,1,salt(0,0),130)}),
        bg(1)+`<rect x="56" y="34" width="34" height="40" rx="4" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>`+gear(73,52,1)+card(64,24,22,11,"#fff",txt(0,3,"1234",6.5))+fp(100,66,1)+clock(104,22,.8,4)+bot(30,82,1,{arms:"push",mood:"sweat"}),
        bg(2)+kid(92,82,.95,C.ink,"sad")+bubble(92,20,30,fp(-6,0,.7)+txt(7,4,"?",11,C.red))+box(70,82,18,14,"",C.wood)+fp(70,74,.55)+bot(32,82,1,{arms:"point",mood:"happy"}) ],
    l:[["пароль + соль","password + salt"],["медленно и в одну сторону","slow and one-way only"],["украли — паролей нет","stolen — no passwords"]],
    c:["Храню не пароль, а отпечаток с солью. Считаю медленно, чтобы перебор был дорогим.","I keep a salted fingerprint, not the password, made slowly so guessing costs a lot."] };

  Z[B+"Аутентификация и авторизация — разное"]={
    p:[ bg(0)+ok(64,22)+bot(94,82,.85,{hat:"cap",flip:true,mood:"smile",arms:"point"})+bot(34,82,1,{arms:"reach",mood:"smile",item:pass(0,0)}),
        bg(1)+kid(98,82,.95,C.red,"sad")+no(76,20)+bot(46,82,.95,{arms:"carry",mood:"wow",item:box(0,6,22,16,"8",C.red)}),
        bg(2)+paper(94,42,["7 ✓","8 ✕"])+bot(38,82,.95,{arms:"carry",mood:"happy",item:box(0,6,22,16,"7")}) ],
    l:[["кто ты? — пропуск","who are you? — badge"],["отдали чужой заказ!","gave away someone's order!"],["проверяю, чей заказ","I check whose order it is"]],
    c:["Сначала узнаю, кто ты. Потом проверяю, твоё ли это. Пропуск — не ключ от всего.","First I learn who you are. Then I check it's yours. A badge isn't a key to everything."] };

  Z[B+"Секреты не лежат в коде"]={
    p:[ bg(0)+laptop(86,70,1.3,txt(0,-14,"pwd=",6)+txt(0,-7,"1234",6,C.red))+bot(30,82,1,{arms:"point",mood:"smile"}),
        bg(1)+[0,1,2].map(i=>card(78+i*7,58-i*12,30,20,"#fff",key(0,0,.7,i===2?C.grey:C.yel))).join("")+line(83,24,105,40,C.red,false,2)+bot(30,82,1,{arms:"push",mood:"sweat"}),
        bg(2)+safe(90,76,1.1)+txt(90,36,"$ENV",8,C.bot2)+bot(34,82,1,{arms:"reach",mood:"think",item:key(0,0,1)}),
        bg(3)+lock(90,54,1.8)+G(90,24,1,key(0,0,.8,C.grey)+line(-12,-6,12,6,C.red,false,2.2))+bot(34,82,1,{arms:"reach",mood:"happy",item:key(0,0,1,C.grn)}) ],
    l:[["пароль в коде","a password in code"],["удалил — в истории остался","deleted — still in history"],["секрет — из хранилища","the secret from a vault"],["утёк — меняю замок","leaked — I change the lock"]],
    c:["Пароль из кода не стереть: он навсегда в истории. Секреты держу отдельно, утёкший меняю.","A password in code stays in history forever. I keep secrets apart and replace any that leak."] };

  /* ---------- Keycloak ---------- */
  const gate=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-24" y="-48" width="6" height="48" fill="${C.grey}" stroke="${C.ink}"/><rect x="18" y="-48" width="6" height="48" fill="${C.grey}" stroke="${C.ink}"/><rect x="-27" y="-56" width="54" height="10" rx="3" fill="${C.bot2}" stroke="${C.ink}"/>${key(-2,-51,.6,"#fff")}</g>`;
  Z[KC+"Зачем отдельный сервер входа"]={
    p:[ bg(0)+door(16,76,false)+door(104,76,false)+card(16,22,16,16,"#fff",txt(0,4,"?",9,C.red))+card(104,22,16,16,"#fff",txt(0,4,"?",9,C.red))+pass(44,24,"#fff",-15)+pass(76,22,C.yel,12)+bot(60,82,.95,{arms:"up",mood:"dizzy"}),
        bg(1)+gate(88,76)+ok(88,52,.9)+bot(34,82,1,{arms:"reach",mood:"think",item:pass(0,0)}),
        bg(2)+[64,86,108].map(x=>G(x,76,.75,door(0,0,true))+ok(x,38,.6)).join("")+bot(28,82,.95,{legs:"run",arms:"reach",mood:"happy",item:pass(0,0)}) ],
    l:[["у каждой двери свой вход","a login at every door"],["одна проходная","one front gate"],["вошёл раз — пускают везде","one login — every door"]],
    c:["Пароли и роли хранит один сервер входа. Вошёл один раз — и пускают во все сервисы.","One login server keeps passwords and roles. Log in once — every service lets you in."] };

  Z[KC+"Realm, client, роли"]={
    p:[ bg(0)+zone(5,12,115,86,"#fff")+txt(84,28,"realm",9,C.bot2)+kid(88,80,.9,C.grn,"smile")+bot(40,80,.95,{arms:"wave",mood:"happy"}),
        bg(1)+door(86,76,false)+card(86,26,30,12,"#fff",txt(0,3.5,"client",7.5))+bot(40,82,1,{arms:"reach",mood:"think"}),
        bg(2)+bubble(88,28,40,star(-10,0,5)+txt(6,3.5,"role",8,C.bot2))+bot(40,82,1,{arms:"hold",mood:"happy",item:card(0,-4,24,16,"#fff",star(-5,0,4)+`<path d="M2 -2 h6 M2 2 h4" stroke="${C.ink}" stroke-width="1.2"/>`)}) ],
    l:[["realm — своё предприятие","realm — its own company"],["client — дверь-приложение","client — an app's door"],["роль — в моём пропуске","my role is on my badge"]],
    c:["Realm — завод со своими людьми. Client — дверь в нём. Роль написана в моём пропуске.","A realm is a factory with its own people. A client is a door. My role is on my badge."] };

  const acc=(col,op)=>card(0,0,20,14,col||"#cfe5fb",`<circle cx="-4" cy="0" r="4" fill="#fff" stroke="${C.ink}" stroke-width=".8"/><path d="M-4 0 v-2.5 M-4 0 h2" stroke="${C.ink}" stroke-width=".9"/><path d="M2 -2 h5 M2 2 h4" stroke="${C.ink}" stroke-width="1.1"/>`);
  Z[KC+"Access и refresh — зачем два токена"]={
    p:[ bg(0)+door(92,76,true)+clock(64,20,.8,1)+bot(36,82,1,{arms:"reach",mood:"smile",item:acc()}),
        bg(1)+kid(28,82,.95,C.ink,"smile")+`<g opacity=".45">${G(50,52,1.1,acc(C.grey))}</g>`+clock(52,24,.9,11)+bot(92,82,.95,{arms:"point",flip:true,mood:"think"}),
        bg(2)+G(88,40,1.1,acc())+spark(104,28)+arrowR(64,56,80)+bot(36,82,1,{arms:"hold",mood:"happy",item:card(0,-4,22,16,C.yel,star(0,0,4.5,"#fff"))}),
        bg(3)+card(86,46,26,18,C.yel,star(0,0,5,"#fff"))+no(100,34,.9)+bot(34,82,1,{arms:"point",mood:"happy",hat:"cap"}) ],
    l:[["access — на минуты","access — lives minutes"],["украли — скоро протухнет","stolen — expires soon"],["refresh даёт новый access","refresh mints new access"],["refresh можно отозвать","refresh can be revoked"]],
    c:["Короткий пропуск ношу везде — украдут, он быстро протухнет. Длинный только выдаёт новый.","I carry the short pass everywhere — if stolen it soon expires. The long one only mints new."] };

  const sig=`<path d="M-8 4 q3 -8 5 0 t5 0 t5 -3" stroke="${C.blue}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
  Z[KC+"Сервис не ходит в Keycloak на каждый запрос"]={
    p:[ bg(0)+server(100,60,.85)+curve(58,56,88,50,C.ink,true)+curve(56,46,88,40,C.ink,true)+txt(72,24,"×100",9,C.red)+bot(36,82,.95,{legs:"run",arms:"hold",mood:"sweat",item:card(0,-4,18,14,"#fff",sig)}),
        bg(1)+server(98,60,.85)+txt(98,26,"1×",10,C.grn)+bot(40,82,.95,{arms:"carry",mood:"think",item:key(0,0,1.3)}),
        bg(2)+card(76,46,28,32,"#fff",sig+`<path d="M-8 -8 h16 M-8 -3 h12" stroke="${C.grey}" stroke-width="1.2"/>`)+ok(90,30,.8)+server(108,66,.55)+zz(98,44)+bot(32,82,1,{arms:"reach",mood:"happy",glasses:true,item:mag(0,0,.9)}) ],
    l:[["бегать на каждый — долго","running each time — slow"],["ключ взял один раз","took the key once"],["подпись сверяю сам","I check signatures myself"]],
    c:["Ключ для проверки беру один раз, дальше сверяю подписи сам. Бегать каждый раз не нужно.","I fetch the check key once, then verify signatures myself. No running there every time."] };

  Z[KC+"Между сервисами — тоже токены"]={
    p:[ bg(0)+door(92,76,false)+lock(92,48,.8)+no(66,22,.8)+bot(38,82,1,{arms:"hold",hat:"helmet",mood:"sad",item:box(0,6,18,14,"")}),
        bg(1)+server(94,60,.85)+spark(76,28)+bot(38,82,1,{arms:"reach",hat:"helmet",mood:"think",item:pass(0,0)}),
        bg(2)+door(72,76,true)+ok(72,30,.7)+door(104,76,false)+lock(104,48,.65)+bot(30,82,.95,{arms:"reach",hat:"helmet",mood:"happy",item:pass(0,0)}) ],
    l:[["нет пропуска — не пустят","no badge — no entry"],["беру свой токен","I get my own token"],["свои права, не везде","own rights, not everywhere"]],
    c:["Мне, сервису, нужен свой пропуск — без всякого человека. И права свои: пускают не везде.","As a service I get my own pass, no human needed. And my own rights — not every door."] };

  /* ---------- Docker ---------- */
  Z[D+"Болезнь «у меня работает»"]={
    p:[ bg(0)+laptop(88,70,1.3,txt(0,-12,"Java 21",5.5)+`<path d="M-3 -8 l2.5 2.5 l5 -5" stroke="${C.grn}" stroke-width="1.6" fill="none"/>`)+ok(88,22)+bot(32,82,1,{arms:"point",mood:"happy"}),
        bg(1)+server(88,60,.95)+flame(88,40,1.1)+txt(88,16,"Java 17",8)+bot(32,82,1,{arms:"up",mood:"dizzy"}),
        bg(2)+laptop(20,46,.8)+server(104,48,.6)+txt(60,16,"21 ≠ 17",10,C.red)+bot(52,82,1,{arms:"reach",mood:"think",glasses:true,item:mag(0,0,.9)}) ],
    l:[["у меня работает","works on my machine"],["на сервере ломается","breaks on the server"],["ищу, чем отличаются","hunting the difference"]],
    c:["Код тот же, а машины разные: другая Java, другая база. Вот и ведёт себя по-разному.","Same code, different machines: another Java, another DB. So it all behaves differently."] };

  const bld=`<rect x="64" y="14" width="48" height="56" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+[0,1,2].map(i=>`<path d="M64 ${32+i*18-0} H112" stroke="${C.ink}" stroke-width="1"/>`).join("")+ctr(76,30,14,10,C.blue)+ctr(98,30,14,10,C.grn)+ctr(76,48,14,10,C.ant)+ctr(98,48,14,10,C.yel)+ctr(76,66,14,10,C.bot)+`<rect x="60" y="70" width="56" height="7" fill="${C.grey}" stroke="${C.ink}"/>`+txt(88,76.5,"kernel",6,C.ink);
  Z[D+"Контейнер — это не виртуалка"]={
    p:[ bg(0)+txt(96,34,"OS",12,C.red)+clock(98,58,.8,4)+bot(44,82,.85,{arms:"carry",mood:"sweat",item:house(0,6,.85,"#fff")}),
        bg(1)+bld+bot(28,82,.95,{arms:"point",mood:"think"}),
        bg(2)+ctr(100,74,26,30,C.blue)+line(88,52,72,52,C.grey)+line(88,60,76,60,C.grey)+txt(26,24,"ms",11,C.grn)+bot(52,82,1,{legs:"run",arms:"up",mood:"happy"}) ],
    l:[["VM — целый дом с ОС","a VM — a whole house + OS"],["контейнер — комната","a container — one room"],["старт за миллисекунды","starts in milliseconds"]],
    c:["Контейнер — комната за стенками, а не целый дом. Фундамент-ядро общее, старт мгновенный.","A container is a walled room, not a whole house. Shared kernel, so it starts instantly."] };

  const L3=[C.grey,C.blue,C.grn];
  Z[D+"Образ — слои, контейнер — образ плюс тонкий верх"]={
    p:[ bg(0)+G(92,76,1,stack(40,L3,10))+txt(92,72.5,"OS",7,"#fff")+txt(92,62.5,"lib",7,"#fff")+txt(92,52.5,"app",7,"#fff")+bot(38,82,.95,{arms:"carry",mood:"smile",item:G(0,6,1,stack(26,L3))}),
        bg(1)+G(88,76,1,stack(44,L3))+`<rect x="64" y="50" width="48" height="6" rx="1.5" fill="#fff" fill-opacity=".6" stroke="${C.ink}" stroke-dasharray="3 2"/><path d="M72 53 q4 -3 8 0 t8 0" stroke="${C.red}" stroke-width="1.3" fill="none"/>`+bot(30,82,1,{arms:"reach",mood:"think",item:pencil(0,0,30)}),
        bg(2)+G(84,76,1,stack(56,L3))+[64,84,104].map((x,i)=>`<rect x="${x-8}" y="${52-i%2*0}" width="16" height="6" rx="1.5" fill="#fff" fill-opacity=".7" stroke="${[C.red,C.bot2,C.ant][i]}" stroke-dasharray="3 2"/>`).join("")+txt(84,40,"3 × 1",10,C.bot2)+bot(28,82,.95,{arms:"point",mood:"wow"}) ],
    l:[["образ — стопка слоёв","image — a layer stack"],["пишу на тонком верхнем","I write on the thin top"],["3 контейнера — 1 образ","3 containers — 1 image"]],
    c:["Нижние слои общие и только для чтения. Каждый контейнер пишет на своём тонком верхнем.","Lower layers are shared and read-only. Each container writes only on its own thin top."] };

  Z[D+"Dockerfile: порядок строк решает"]={
    p:[ bg(0)+blk(88,80,34,12,"FROM",C.grey)+blk(88,68,34,12,"COPY",C.grn)+G(92,56,1,blk(0,0,34,12,"RUN",C.blue),12)+loopA(110,24,7,C.red)+clock(74,24,.7,8)+bot(32,82,.95,{arms:"reach",mood:"sweat",item:pencil(0,0,30)}),
        bg(1)+blk(88,80,34,12,"FROM",C.grey)+blk(88,56,34,12,"COPY",C.grn)+`<rect x="71" y="57" width="34" height="11" fill="none" stroke="${C.ink}" stroke-dasharray="3 2"/>`+bot(36,82,.95,{arms:"carry",mood:"think",item:blk(0,6,30,12,"RUN",C.blue)}),
        bg(2)+blk(92,80,34,12,"FROM",C.grey)+blk(92,68,34,12,"RUN",C.blue)+`<rect x="75" y="45" width="34" height="11" fill="none" stroke="${C.ink}" stroke-dasharray="3 2"/>`+spark(110,40)+clock(110,64,.6,1)+bot(26,82,.95,{arms:"reach",mood:"happy",item:blk(11,6,30,12,"COPY",C.grn)}) ],
    l:[["код ниже — всё заново","code low — redo it all"],["зависимости — пониже","dependencies go lower"],["правка — только верх","an edit — just the top"]],
    c:["Пересобирается всё после изменённой строки. Поэтому зависимости ставлю раньше кода.","Everything after the changed line gets rebuilt. So I install dependencies before the code."] };

  const wall=`<rect x="58" y="14" width="56" height="60" rx="2" fill="#fff" fill-opacity=".8" stroke="${C.ink}" stroke-width="1.2"/>`;
  Z[D+"Всё, что контейнер записал, умрёт вместе с ним"]={
    p:[ bg(0)+wall+txt(86,48,"x=5",13,C.ink)+bot(36,82,1,{arms:"reach",mood:"smile",item:pencil(0,0,30)}),
        bg(1)+wall+loopA(86,44,10,C.grey)+bot(36,82,1,{mood:"sad"}),
        bg(2)+safe(92,76,1.2)+txt(92,32,"volume",7.5,C.bot2)+bot(38,82,.95,{arms:"carry",mood:"happy",item:box(0,6,26,16,"x=5")}) ],
    l:[["записал на стене","wrote it on the wall"],["пересоздали — пусто","recreated — it's blank"],["важное — в томе","what matters — in a volume"]],
    c:["Что я записал внутри контейнера, пропадёт вместе с ним. Важное несу в том — он живёт отдельно.","What I write in a container dies with it. Important stuff goes in a volume that lives apart."] };

  const suitI=suit(0,10,30,18,C.red)+db(-6,-11,.45)+ctr(8,-6,10,12,C.blue);
  Z[D+"Один контейнер — один процесс"]={
    p:[ bg(0)+bot(56,82,.9,{arms:"carry",mood:"sweat",item:G(0,-4,1,suitI)}),
        bg(1)+suit(84,80,34,18,C.red)+G(76,52,1,db(0,0,.6),-30)+ctr(100,58,12,14,C.blue,null,1,20)+flame(92,62,.6)+bot(34,82,1,{arms:"reach",mood:"dizzy"}),
        bg(2)+db(98,64,.9)+ctr(74,80,14,14,C.blue,null,.6)+ctr(74,64,14,14,C.blue,null,.6)+bot(36,82,.95,{arms:"carry",mood:"happy",item:ctr(0,6,24,16,C.blue,"app")}) ],
    l:[["всё в одном чемодане","all in one suitcase"],["обновил одно — легло всё","update one — all go down"],["по отдельности — гибко","apart — flexible"]],
    c:["В одной коробке приложение и база мешают друг другу. Раздельно обновляю и множу по одному.","App and DB in one box get in each other's way. Apart, I update and scale each alone."] };

  /* ---------- Kubernetes ---------- */
  Z[K8+"Проблема, которую он решает"]={
    p:[ bg(0)+ctr(76,80,16,16,C.blue)+ctr(96,80,16,16,C.grn)+ctr(100,70,16,16,C.red,null,1,70)+txt(104,46,"!",14,C.red)+bot(34,82,.95,{legs:"run",arms:"reach",mood:"sweat"}),
        bg(1)+[[20,30,-20],[36,14,10],[86,14,-10],[102,30,25],[60,10,0]].map((p,i)=>ctr(p[0],p[1]+8,14,12,[C.blue,C.grn,C.ant,C.yel,C.bot][i],null,1,p[2])).join("")+txt(100,58,"×100",10,C.red)+bot(60,82,.95,{arms:"up",mood:"dizzy"}),
        bg(2)+[0,1,2].map(i=>ctr(70+i*18,56,14,14,C.blue)+ctr(70+i*18,78,14,14,C.grn)).join("")+txt(88,28,"k8s",10,C.bot2)+bot(30,82,.95,{arms:"point",mood:"happy",hat:"crown"}) ],
    l:[["упал — кто поднимет?","one fell — who restarts?"],["сотню руками — никак","a hundred by hand — no way"],["нужен дирижёр","a conductor is needed"]],
    c:["Запустить контейнер легко. А поднимать, раскладывать и обновлять сотню — нужен дирижёр.","Starting a container is easy. Restarting, placing and updating a hundred needs a conductor."] };

  const btn=(x,y)=>`<rect x="${x-10}" y="${y}" width="20" height="8" rx="2" fill="${C.grey}" stroke="${C.ink}"/><ellipse cx="${x}" cy="${y}" rx="7" ry="3.5" fill="${C.red}" stroke="${C.ink}"/>`;
  Z[K8+"Декларативность: описываешь цель, а не шаги"]={
    p:[ bg(0)+btn(68,60)+ctr(98,80,14,14,C.blue)+ctr(98,62,14,14,C.blue,null,.4)+txt(98,36,"?",14,C.red)+bot(36,82,1,{arms:"push",mood:"sweat"}),
        bg(1)+G(92,44,1,`<circle r="18" fill="#fff" stroke="${C.ink}" stroke-width="1.4"/>${txt(0,5,"3",16,C.bot2)}<path d="M0 -18 v5" stroke="${C.red}" stroke-width="2"/>`)+bot(36,82,1,{arms:"hold",mood:"think",item:card(0,-2,28,18,"#fff",txt(0,4,"×3",11))}),
        bg(2)+ctr(70,80,14,14,C.blue)+ctr(88,80,14,14,C.blue)+ctr(106,80,14,14,C.blue)+spark(106,54)+gear(88,34,.9)+loopA(88,34,16,C.grn)+bot(30,82,1,{legs:"sit",mood:"happy"}) ],
    l:[["командую руками — устал","command by hand — tired"],["пишу цель: 3 копии","I write the goal: 3"],["разницу добирает сам","it closes the gap itself"]],
    c:["Я не говорю «запусти». Пишу, сколько должно быть, а система сама держит это число.","I don't say 'start it'. I write how many there should be; the system keeps that number."] };

  Z[K8+"Под — минимальная единица, и это не контейнер"]={
    p:[ bg(0)+G(92,46,1.3,pod(1))+txt(92,26,"pod",9,C.bot2)+bot(36,82,1,{arms:"carry",mood:"smile",item:G(0,-2,1,pod(.7))}),
        bg(1)+server(104,62,.8)+G(70,58,.9,pod(1))+line(54,72,88,72,C.grey,true)+bot(30,82,.95,{arms:"push",mood:"think",hat:"cap"}),
        bg(2)+`<path d="M86 56 h26 l-3 24 h-20 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>`+G(99,52,.6,pod(1,`<rect x="-13" y="-7" width="26" height="12" rx="2" fill="${C.grey}" stroke="${C.ink}"/>`),25)+bot(38,82,1,{arms:"reach",mood:"happy",item:pod(.75)}) ],
    l:[["под — бригада контейнеров","a pod — a crew of boxes"],["k8s двигает целый под","k8s moves a whole pod"],["под — расходник","a pod is disposable"]],
    c:["Под — коробочка для контейнеров с общей сетью и диском. Старую выкинул — взял новую.","A pod is a little box of containers sharing net and disk. Toss the old one, take a new one."] };

  const chairs=(bad)=>[52,66,80,94,108].map((x,i)=>i===bad?chair(x,78,C.red,70):chair(x,80)).join("");
  Z[K8+"Deployment и самолечение"]={
    p:[ bg(0)+chairs(-1)+bot(26,82,.9,{arms:"hold",mood:"smile",item:card(0,-4,18,16,"#fff",txt(0,4.5,"5",12))}),
        bg(1)+chairs(2)+txt(84,34,"4/5",11,C.red)+bot(26,82,.9,{arms:"up",mood:"wow"}),
        bg(2)+[52,66,94,108].map(x=>chair(x,80)).join("")+`<rect x="73" y="66" width="14" height="14" rx="3" fill="none" stroke="${C.grn}" stroke-dasharray="3 2"/>`+txt(84,30,"5/5",11,C.grn)+bot(30,82,.9,{arms:"carry",mood:"happy",item:G(0,10,1,chairI())}) ],
    l:[["должно быть 5","there should be 5"],["один сломался — 4","one broke — now 4"],["новый принёс сам","brought a new one myself"]],
    c:["Deployment помнит, сколько подов нужно. Упал один — новый появится сам, чинить нечего.","A Deployment remembers how many pods it needs. One dies — a new one appears by itself."] };

  const desk=(x1,x2)=>`<rect x="${x1}" y="60" width="${x2-x1}" height="20" rx="2" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.2"/>`;
  Z[K8+"Service: стабильный адрес поверх нестабильных подов"]={
    p:[ bg(0)+card(88,42,40,48,"#fff",[["10.1",1],["10.7",1],["10.3",0]].map((r,i)=>txt(0,-10+i*13,r[0],8)+(r[1]?`<path d="M-14 ${-13+i*13} h28" stroke="${C.red}" stroke-width="1.6"/>`:txt(16,-10+i*13,"?",8,C.red))).join(""))+bot(34,82,1,{arms:"hold",mood:"sweat",item:phone(0,-4,.7)}),
        bg(1)+bot(46,82,1,{arms:"hold",mood:"think",item:phone(0,-6,.6)})+desk(16,78)+card(47,70,38,10,"#fff",txt(0,3.5,"my-svc",7,C.bot2))+bubble(96,30,30,txt(0,3.5,"1 №",8)),
        bg(2)+mpod(92,24,C.grn)+mpod(92,50,C.grn)+mpod(92,76,C.grey,.5)+no(106,70,.6)+curve(54,52,82,24,C.grn)+curve(54,56,82,50,C.grn)+bot(30,82,.95,{arms:"point",mood:"happy"}) ],
    l:[["адреса подов меняются","pod addresses change"],["Service — одно имя","Service — one name"],["шлю только к живым","I send only to live ones"]],
    c:["Поды меняют адреса, а имя Service постоянное. Я знаю, кто жив, и шлю звонки к ним.","Pods change addresses; a Service's name stays. I know who's alive and send calls there."] };

  Z[K8+"Пробы: liveness и readiness — не одно и то же"]={
    p:[ bg(0)+loopA(58,46,30,C.red)+txt(102,20,"×9",10,C.red)+bot(58,82,.9,{mood:"dizzy"}),
        bg(1)+card(36,12,40,10,"#fff",`<rect x="-18" y="-3" width="20" height="6" rx="2" fill="${C.yel}"/>`)+env(84,58,.8)+env(104,58,.8)+clock(94,30,.75,2)+txt(94,78,"readiness",7,C.bot2)+bot(36,82,1,{legs:"sit",mood:"think"}),
        bg(2)+`<g opacity=".45">${bot(26,82,.8,{mood:"sleep"})}</g>`+arrowR(44,50,62)+spark(104,26)+txt(26,22,"liveness",7,C.bot2)+bot(86,82,.95,{arms:"up",mood:"happy"}) ],
    l:[["перепутал — вечный рестарт","mixed up — restart loop"],["разогреваюсь — подождите","warming up — please wait"],["не дышу — перезапуск","not alive — restart"]],
    c:["Не готов — подожди без трафика. Не дышу — перезапусти. Перепутаешь — вечный рестарт.","Not ready — wait, no traffic. Not breathing — restart me. Mix them up — endless restarts."] };

  Z[K8+"requests и limits — почему убивают именно тебя"]={
    p:[ bg(0)+kid(78,66,.65,C.grn)+kid(100,66,.65,C.red)+table(66,112,58)+bot(32,82,1,{mood:"sad"}),
        bg(1)+door(100,76,true)+txt(64,22,"OOM",12,C.red)+bot(62,82,.95,{legs:"run",mood:"dizzy",arms:"up"}),
        bg(2)+line(8,14,112,14,C.red,true)+txt(96,24,"limit",7,C.red)+table(66,112,58)+card(90,52,26,10,"#fff",txt(0,3.5,"req",7.5,C.grn))+bot(48,82,1,{legs:"sit",mood:"happy"}) ],
    l:[["без брони — как повезёт","no booking — pure luck"],["мест нет — выгнали первым","no room — I'm out first"],["есть бронь и потолок","a booking and a ceiling"]],
    c:["requests — моя бронь, limits — мой потолок. Без них при нехватке памяти выгонят меня первым.","requests is my booking, limits my ceiling. Without them I'm evicted first when RAM runs out."] };

  /* ---------- Облако ---------- */
  Z[CL+"Облако — это чужие серверы плюс API и счётчик"]={
    p:[ bg(0)+gear(98,58,.9)+gear(108,40,.6)+bot(44,82,.85,{arms:"carry",mood:"sweat",item:server(0,-10,.6)}),
        bg(1)+cloud(86,24,1.3)+server(86,62,.65)+spark(104,46)+bot(34,82,1,{arms:"reach",mood:"wow",item:phone(0,0,.7,txt(0,2,"API",5,C.bot2))}),
        bg(2)+meter(72,24,"0.12")+bot(102,82,.75,{hat:"helmet",flip:true,arms:"reach",mood:"smile",item:gear(0,0,.5)})+bot(34,82,1,{arms:"reach",mood:"happy",item:coin(0,0)}) ],
    l:[["своя стойка — всё сам","own rack — do it all"],["сервер по API за секунды","servers by API in seconds"],["плачу по счётчику","I pay by the meter"]],
    c:["Облако — чужие серверы: беру по API за секунды, плачу по счётчику, рутину делают за меня.","The cloud is someone else's servers: get them by API, pay by the meter, chores done for me."] };

  const veg=`<circle cx="76" cy="58" r="5" fill="${C.red}" stroke="${C.ink}"/><circle cx="88" cy="58" r="5" fill="${C.grn}" stroke="${C.ink}"/><rect x="96" y="54" width="12" height="7" rx="3" fill="${C.ant}" stroke="${C.ink}"/>`;
  Z[CL+"IaaS, PaaS, SaaS — где проходит граница ответственности"]={
    p:[ bg(0)+table(62,114,63)+veg+gears(78,18,3)+coin(80,34,.7)+bot(34,82,1,{arms:"reach",hat:"chef",mood:"sweat",item:`<path d="M-2 4 l10 -10 l3 3 l-10 10 z" fill="${C.grey}" stroke="${C.ink}"/>`}),
        bg(1)+gears(84,18,1)+coins(78,36,2)+env(92,66,1)+bot(38,82,1,{arms:"hold",mood:"think",item:pot(.9)}),
        bg(2)+coins(80,22,3)+table(56,104,62)+G(80,58,1,pot(.8))+stool(34,82,1)+bot(34,82,1,{legs:"sit",mood:"happy"}) ],
    l:[["IaaS: готовлю сам","IaaS: I cook it myself"],["PaaS: привезли готовое","PaaS: food delivered"],["SaaS: сразу ресторан","SaaS: just a restaurant"]],
    c:["Шестерёнки — моя работа, монетки — цена. Чем выше уровень, тем работы меньше, а денег больше.","Gears are my work, coins the price. The higher the level, the less work and the more money."] };

  Z[CL+"Managed или своё — главный вопрос"]={
    p:[ bg(0)+db(86,60,1.2)+coin(108,30,.8)+bot(32,82,1,{arms:"point",mood:"happy"}),
        bg(4)+moon(104,18)+db(86,62,1.1)+flame(86,44,.9)+bot(36,82,1,{arms:"reach",mood:"sweat",item:gear(0,0,.6)}),
        bg(2)+db(72,62,1)+coins(64,22,3)+bot(104,82,.75,{hat:"helmet",flip:true,arms:"reach",mood:"smile",item:gear(0,0,.5)})+stool(30,82,.9)+bot(30,82,.9,{legs:"sit",mood:"sleep"}) ],
    l:[["своё — дешевле по счёту","own — cheaper on the bill"],["ночью чиню сам","at night I fix it myself"],["managed — дороже, но сплю","managed: pricier, I sleep"]],
    c:["Считаю не цену базы, а цену вместе с тем, кто будет чинить её ночью.","I count not just the database price, but also whoever will fix it at night."] };

  Z[CL+"Регионы и зоны доступности"]={
    p:[ bg(0)+dc(88,76,C.grey,"a",1.2)+flame(88,40,1)+bot(36,82,1,{mood:"sad"}),
        bg(1)+dc(76,76,C.grey,"a")+flame(76,46,.8)+dc(104,76,C.grey,"b")+ok(104,24,.7)+bot(34,82,.95,{arms:"carry",mood:"happy",item:box(0,6,20,16,"1")}),
        bg(2)+dc(104,76,C.grey,"",.8)+line(10,84,100,84,C.grey,true)+clock(76,22,.8,5)+bot(46,82,.95,{legs:"run",arms:"hold",mood:"think",item:box(0,4,16,12,"1")}) ],
    l:[["одна копия — сгорела","one copy — burned"],["две зоны — живём","two zones — still alive"],["другой регион — дольше","other region — slower"]],
    c:["Копия в соседней зоне спасёт от пожара в одном ЦОДе. В другом городе надёжнее, но дальше.","A copy in the next zone survives one burnt DC. Another city is safer, but farther away."] };

  const shelf=`<rect x="70" y="18" width="44" height="58" fill="${C.wood2}" rx="2"/><path d="M70 38 h44 M70 58 h44" stroke="${C.wood}" stroke-width="3"/>`+suit(80,36,12,12,C.blue)+suit(96,36,12,12,C.grn)+suit(80,56,12,12,C.yel)+suit(104,74,12,12,C.ant);
  Z[CL+"Объектное хранилище"]={
    p:[ bg(0)+db(86,64,1.1)+G(86,40,1,suit(0,0,30,20,C.red),-12)+bot(36,82,1,{arms:"push",mood:"sweat"}),
        bg(1)+shelf+txt(98,14,"S3",8)+bot(34,82,1,{arms:"reach",mood:"think",item:suit(0,6,14,12,C.red)}),
        bg(2)+db(88,64,1)+card(88,34,22,12,"#fff",txt(0,3.5,"#7",8))+bot(36,82,1,{arms:"hold",mood:"happy",item:card(0,-4,18,12,C.yel,txt(0,3.5,"#7",8))}) ],
    l:[["файлы в базе — тесно","files in the DB — cramped"],["сдаю в S3 по ключу","into S3 by key"],["в базе — только номерок","the DB keeps just a tag"]],
    c:["Файлы сдаю в хранилище по ключу, а в базе держу только номерок. Дёшево и места без конца.","I check files into storage by key and keep just the tag in the DB. Cheap and nearly endless."] };

  const tiny=(n,x0,y0,cols)=>Array.from({length:n},(_,i)=>ctr(x0+(i%cols)*9,y0+Math.floor(i/cols)*9,7,7,C.blue)).join("");
  Z[CL+"Автомасштабирование не лечит узкое место"]={
    p:[ bg(0)+tiny(5,10,20,5)+curve(30,26,84,48,C.grn,true)+db(98,62,1)+ok(98,26,.7)+bot(56,82,.9,{arms:"carry",mood:"smile",item:box(0,6,16,12,"")}),
        bg(1)+tiny(20,6,14,10)+curve(40,32,84,48,C.red,true)+curve(70,32,86,46,C.red,true)+db(98,62,1)+`<path d="M110 40 q3 5 0 7 q-3 -2 0 -7" fill="#7cc4ff" stroke="${C.ink}" stroke-width=".8"/>`+no(98,24,.7)+bot(56,82,.9,{arms:"up",mood:"dizzy"}),
        bg(2)+card(88,46,40,44,"#fff",bar(-8,18,10,10,C.grn)+bar(8,18,10,32,C.red)+txt(-8,-16,"app",6)+txt(8,-16,"db",6))+bot(32,82,1,{arms:"reach",mood:"think",glasses:true,item:mag(0,0,.9)}) ],
    l:[["5 копий — база держится","5 copies — the DB copes"],["20 копий — база тонет","20 copies — the DB drowns"],["метрики покажут узкое","metrics show the choke"]],
    c:["Добавлю копий, а база одна — ей станет только хуже. Масштабируют то, что упирается.","More copies, one database — it only gets worse. Scale what is actually the bottleneck."] };

  Z[CL+"IAM: роли вместо паролей в коде"]={
    p:[ bg(0)+laptop(92,70,1.1,key(0,-12,.7))+no(92,26,.8)+bot(36,82,1,{arms:"hold",mood:"sweat",item:keyring}),
        bg(1)+cloud(88,24,1.2)+key(86,56,1.1)+clock(108,58,.55,2)+curve(88,34,86,48,C.ink,true)+bot(34,82,1,{arms:"reach",mood:"think",item:pass(0,0)}),
        bg(2)+door(72,76,true)+ok(72,30,.7)+door(104,76,false)+lock(104,48,.65)+bot(30,82,.95,{arms:"reach",mood:"happy",item:key(0,0,.9)}) ],
    l:[["ключ в коде — нельзя","a key in code — no"],["роль → временный ключ","role → a temporary key"],["только нужная дверь","only the door I need"]],
    c:["Ключа в коде нет — облако даёт мне временный по роли. И открывает только то, что нужно.","No key in my code — the cloud gives me a temporary one by role, and only what I need."] };

  Z[CL+"За что реально приходит счёт"]={
    p:[ bg(0)+card(88,44,40,56,"#fff",bar(-8,20,8,6,C.grn)+bar(6,20,8,34,C.red)+txt(-8,-18,"VM",6)+txt(6,-18,"$",8,C.red))+bot(32,82,.95,{arms:"point",mood:"wow"}),
        bg(1)+door(104,76,true)+box(72,80,16,14,"")+coin(88,28,.7)+coin(96,40,.7)+bot(40,82,.95,{arms:"push",mood:"sweat"}),
        bg(2)+dc(18,76,C.grey,"a",.9)+dc(104,76,C.grey,"b",.9)+coin(60,16,.7)+coin(76,20,.7)+bot(60,82,.85,{arms:"carry",mood:"sweat",item:box(0,6,16,12,"")}),
        bg(3)+server(88,60,.9)+web(98,38)+sw(62,48,false,1)+bot(30,82,.95,{arms:"reach",mood:"happy"}) ],
    l:[["виртуалка — не главное","the VM isn't the big cost"],["дорог трафик наружу","outbound traffic costs"],["диски и межзоновый трафик","disk IO, cross-zone"],["забытое — выключаю","forgotten — switch it off"]],
    c:["Дорого не сама виртуалка, а трафик наружу, диски и то, что забыли выключить.","It's not the VM that costs most: it's outbound traffic, disks and things left running."] };

  const scales=(l,r,tilt)=>`<g transform="translate(86 40)"><path d="M0 0 v38 M-10 38 h20" stroke="${C.ink}" stroke-width="2"/><g transform="rotate(${tilt||0})"><path d="M-24 0 h48" stroke="${C.ink}" stroke-width="2"/><path d="M-24 0 l-6 14 h12 z M24 0 l-6 14 h12 z" fill="#fff" stroke="${C.ink}"/>${G(-24,8,1,l)}${G(24,8,1,r)}</g></g>`;
  Z[CL+"Vendor lock-in — где он настоящий"]={
    p:[ bg(0)+cloud(20,26,.8)+cloud(102,26,.8)+arrowR(80,62,100,C.grn)+bot(60,82,.9,{arms:"carry",mood:"happy",item:box(0,6,22,14,"S3")}),
        bg(1)+cloud(100,22,.9)+chain(98,32,78,64)+box(76,80,26,18,"IAM",C.blue)+bot(34,82,1,{arms:"push",mood:"sweat"}),
        bg(2)+scales(gear(0,-4,.45),lock(0,-6,.55),0)+bot(30,82,1,{arms:"point",mood:"think"}) ],
    l:[["VM, S3, Postgres — легко","VM, S3, Postgres — easy"],["очереди, IAM — на цепи","queues, IAM — chained"],["это размен, а не зло","a trade-off, not evil"]],
    c:["Простое переносится легко. Чем умнее сервис облака, тем крепче привязка — и это мой выбор.","Basic things move easily. The smarter the cloud service, the tighter the tie — my choice."] };

  Z[CL+"Если облачного опыта нет"]={
    p:[ bg(0)+car(88,82,C.red)+bubble(58,18,22,txt(0,4,"?",11,C.red))+bot(36,82,1,{arms:"reach",mood:"sweat"}),
        bg(1)+kid(96,82,1,C.grn,"smile")+bubble(64,20,40,txt(0,3.5,"k8s",8,C.bot2))+bot(34,82,1,{arms:"reach",mood:"smile",item:ctr(0,6,16,12,C.blue)}),
        bg(2)+card(84,36,48,34,"#fff",txt(-12,-4,"$",10,C.grn)+dc(10,4,C.grey,"",.45)+txt(0,12,"a · b · c",7))+kid(104,82,.8,C.grn,"smile")+ok(110,20,.7)+bot(30,82,.95,{arms:"point",mood:"happy"}) ],
    l:[["не изображаю опыт","I don't fake experience"],["говорю, с чем работал","I say what I've used"],["показываю, что понимаю","I show I get the models"]],
    c:["Не было облака — так и скажу. Расскажу, с чем работал, и покажу, что понимаю модели.","No cloud experience? I'll say so, tell what I've used, and show I understand the models."] };

  /* ---------- AWS ---------- */
  const folder=`<path d="M-14 -10 h10 l3 3 h15 v18 h-28 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.1"/>`;
  Z[A+"Как вообще устроен аккаунт"]={
    p:[ bg(0)+coin(84,30,1.1)+lock(104,40,1)+bot(36,82,1,{arms:"hold",mood:"smile",item:folder}),
        bg(1)+zone(44,16,116,80,"#fff")+txt(80,28,"eu-central-1",7,C.bot2)+dc(58,76,C.grey,"a",.8)+dc(80,76,C.grey,"b",.8)+dc(102,76,C.grey,"c",.8)+bot(22,82,.85,{arms:"point",mood:"think"}),
        bg(2)+dc(84,76,C.grey,"",1.2)+no(108,24,.8)+bot(42,82,1,{arms:"push",mood:"sweat"}) ],
    l:[["аккаунт — деньги и права","account — money & rights"],["регион, а в нём зоны","a region holds zones"],["ресурс живёт в регионе","resources stay in a region"]],
    c:["Аккаунт — граница денег и прав. В нём регионы, в регионах зоны. Ресурс сам не переедет.","An account bounds money and rights. Inside are regions, then zones. Resources don't move."] };

  Z[A+"IAM: роли, а не ключи"]={
    p:[ bg(0)+kid(94,82,.95,C.ink,"smile")+G(70,40,1,key(0,0,.9),-30)+bot(38,82,1,{arms:"hold",mood:"sad",item:keyring}),
        bg(1)+server(96,60,.85)+card(96,24,26,12,"#fff",txt(0,3.5,"SDK",7.5,C.bot2))+clock(70,26,.6,2)+bot(36,82,1,{arms:"reach",mood:"think",item:key(0,0,.9)}),
        bg(2)+bucket(86,62,1.2)+txt(86,34,"s3://a",7.5)+card(106,18,16,14,"#fff",txt(0,6,"*",13,C.red))+line(99,12,113,24,C.red,false,1.4)+bot(32,82,.95,{arms:"reach",mood:"happy",item:key(0,0,.9)}) ],
    l:[["ключи в кармане — украдут","keys in a pocket — stolen"],["SDK сам даёт временный","the SDK gives a temp one"],["права на один ресурс","rights on one resource"]],
    c:["Связку ключей от всего не ношу. У сервера роль, SDK сам берёт временный ключ к одной двери.","No key ring for everything. The server has a role; the SDK gets a temp key to one door."] };

  Z[A+"EC2 — просто виртуалка"]={
    p:[ bg(0)+car(88,82,C.yel,meter(0,-36,"$$$").replace("translate(0 -36)","translate(0 -36) scale(.7)"))+bot(32,82,.95,{arms:"reach",mood:"sweat",item:coin(0,0)}),
        bg(1)+car(90,82,C.yel)+coins(80,30,1)+bot(36,82,1,{arms:"hold",mood:"think",item:cal(0,-4,"12")}),
        bg(2)+car(90,82,C.grn)+line(64,64,72,64,C.grey)+line(62,70,70,70,C.grey)+clock(60,22,.85,2)+txt(76,26,"2",9,C.red)+bot(30,82,.95,{arms:"up",mood:"wow"}),
        bg(3)+box(76,80,14,12,"",C.wood)+box(92,80,14,12,"",C.wood)+box(108,80,14,12,"",C.wood)+ok(92,40,.8)+bot(38,82,.95,{arms:"carry",mood:"happy",item:env(0,-2,.8)}) ],
    l:[["on-demand: дорого, надёжно","on-demand: pricey, solid"],["reserved: дешевле за год","reserved: a year, cheaper"],["spot: дёшево, но высадят","spot: cheap, may drop you"],["spot — для очередей","spot — for queue workers"]],
    c:["Spot дешевле в разы, но его могут забрать за две минуты. Годится для работы, что переживёт это.","Spot is far cheaper but can be taken back in two minutes. Fine for work that survives it."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 7 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* свои детали */
  const b=(x,s,o,y)=>bot(x,y==null?82:y,s,o||{});
  const pill=(x,y,t,col,fg,sz)=>{ sz=sz||8; const w=String(t).length*sz*.62+8;
    return `<rect x="${(x-w/2).toFixed(1)}" y="${(y-sz*.8).toFixed(1)}" width="${w.toFixed(1)}" height="${(sz*1.6).toFixed(1)}" rx="${(sz*.8).toFixed(1)}" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.1"/>`+txt(x,(y+sz*.35).toFixed(1),t,sz,fg||C.ink); };
  const ar=(x1,y1,x2,y2,col,dash)=>{ const a=Math.atan2(y2-y1,x2-x1),h=5,c=col||C.ink;
    const p=(k)=>[(x2-h*Math.cos(a+k)).toFixed(1),(y2-h*Math.sin(a+k)).toFixed(1)]; const p1=p(-.55),p2=p(.55);
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="2" stroke-linecap="round" ${dash?'stroke-dasharray="3 2.5"':""}/><path d="M${p1[0]} ${p1[1]} L${x2} ${y2} L${p2[0]} ${p2[1]}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const R=(x,y,w,h,f,rx)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx==null?2:rx}" fill="${f}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const ln=(d,col,w,dash)=>`<path d="${d}" stroke="${col||C.ink}" stroke-width="${w||1.6}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${dash?'stroke-dasharray="3 2.5"':""}/>`;
  const G=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const bucket=(x,y,s,lab)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-15 -14 L-11 12 H11 L15 -14 Z" fill="${C.red}" stroke="${C.ink}" stroke-width="1.3"/><ellipse cx="0" cy="-14" rx="15" ry="4" fill="#f9b4b4" stroke="${C.ink}" stroke-width="1.3"/>${txt(0,4,lab||"S3",9,"#fff")}</g>`;
  const ctr=(x,y,s,col,lab)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-14" y="-9" width="28" height="18" rx="2" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>${[-8,-3,2,7].map(d=>`<path d="M${d} -6 v12" stroke="#fff" stroke-width="1.2" opacity=".55"/>`).join("")}${lab?txt(0,3.5,lab,8,"#fff"):""}</g>`;
  const scr=(x,y,w,h,inner)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>${inner||""}</g>`;
  const doc=(x,y,n,col,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot||0})"><rect x="-7" y="-9" width="14" height="18" rx="1.5" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>${Array.from({length:n||3}).map((_,i)=>`<path d="M-4 ${-5+i*4} h8" stroke="${col||C.grey}" stroke-width="1.4"/>`).join("")}</g>`;
  const bell=(x,y,s,on)=>`<g transform="translate(${x} ${y}) scale(${s||1})">${on?`<path d="M-13 -6 q-3 6 0 12 M13 -6 q3 6 0 12" stroke="${C.red}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`:""}<path d="M-8 6 q0 -16 8 -16 q8 0 8 16 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.3"/><path d="M-10 6 h20" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/><circle cy="9" r="2.2" fill="${C.ink}"/></g>`;
  const car=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-18 -4 v-6 q0 -3 3 -3 h5 l5 -7 h12 l6 7 h4 q3 0 3 3 v6 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2"/><circle cx="-10" cy="-3" r="4" fill="${C.ink}"/><circle cx="10" cy="-3" r="4" fill="${C.ink}"/></g>`;
  const shelf=(x,y,w)=>`<rect x="${x}" y="${y}" width="${w}" height="4" rx="1.5" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1"/>`;
  const cup=(x,y,steam,col)=>`<g transform="translate(${x} ${y})"><path d="M-8 -12 h16 v10 a8 8 0 0 1 -16 0 z" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.3"/><path d="M8 -9 q6 0 5 5 q-1 3 -5 3" fill="none" stroke="${C.ink}" stroke-width="1.3"/>${steam?`<path d="M-3 -15 q3 -4 0 -8 M3 -15 q3 -4 0 -8" stroke="${C.red}" stroke-width="1.5" fill="none"/>`:""}</g>`;
  const mega=`<path d="M-6 -3 L9 -10 V10 L-6 3 Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-11" y="-3.5" width="5" height="7" rx="1" fill="${C.red}" stroke="${C.ink}"/>`;
  const waves=(x,y,col)=>ln(`M${x} ${y-6} q4 6 0 12 M${x+5} ${y-10} q7 10 0 20`,col||C.ink,1.5);
  const hammer=`<path d="M-7 9 L5 -5" stroke="${C.wood2}" stroke-width="3.2" stroke-linecap="round"/><rect x="-2" y="-14" width="15" height="7" rx="1.5" fill="${C.grey}" stroke="${C.ink}" transform="rotate(-40 5 -10)"/>`;
  const wrench=`<path d="M-8 8 L5 -5" stroke="#8a90a0" stroke-width="3.6" stroke-linecap="round"/><circle cx="7" cy="-7" r="5.5" fill="#8a90a0" stroke="${C.ink}"/><path d="M7 -7 l5 -5" stroke="${C.sky[0]}" stroke-width="3.4"/>`;
  const camera=`<rect x="-11" y="-7" width="22" height="15" rx="3" fill="${C.ink}"/><rect x="-7" y="-10" width="7" height="3" rx="1" fill="${C.ink}"/><circle cy="0.5" r="5" fill="#9fc4ff" stroke="#fff" stroke-width="1.5"/>`;
  const safe=(x,y,s,rot)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-16" y="-18" width="32" height="34" rx="3" fill="#7d8597" stroke="${C.ink}" stroke-width="1.3"/><circle r="7" fill="#fff" stroke="${C.ink}"/><path d="M0 0 v-5" stroke="${C.ink}" stroke-width="1.6"/>${rot?`<path d="M-12 -24 a14 8 0 0 1 24 0" fill="none" stroke="${C.grn}" stroke-width="2"/><path d="M8 -28 l4 4 l-5 2" fill="none" stroke="${C.grn}" stroke-width="2"/>`:""}</g>`;
  const bin=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-10 -22 h20 l-2 22 h-16 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-12 -22 h24" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M-4 -17 v13 M4 -17 v13" stroke="#fff" stroke-width="1.2"/></g>`;
  const house=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-14 0 V-18 L0 -30 L14 -18 V0 Z" fill="${col||C.wood}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-4" y="-11" width="8" height="11" fill="${C.wood2}"/></g>`;
  const door=(x,y,col)=>`<rect x="${x-9}" y="${y-28}" width="18" height="28" rx="2" fill="${col||C.wood}" stroke="${C.ink}" stroke-width="1.2"/><circle cx="${x+5}" cy="${y-13}" r="1.4" fill="${C.ink}"/>`;
  const brick=(x,y,lab,col)=>`<rect x="${x-8}" y="${y-8}" width="16" height="8" rx="1" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1"/>`+(lab?txt(x,y-1.6,lab,6,"#fff"):"");
  const fire=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M0 0 q-10 -4 -6 -14 q2 5 5 4 q-3 -9 5 -16 q0 8 6 12 q4 -4 2 -8 q8 8 2 22 z" fill="${C.red}" stroke="${C.ink}" stroke-width="1"/><path d="M0 -2 q-4 -3 -2 -8 q2 3 4 2 q0 -4 3 -6 q3 6 -1 12 z" fill="${C.yel}"/></g>`;
  const tape=(x,y,w,marks)=>`<rect x="${x}" y="${y}" width="${w}" height="12" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>`+(marks||"");
  const bars=(x,base,vals,w,gap,cols)=>vals.map((v,i)=>`<rect x="${x+i*(w+gap)}" y="${base-v}" width="${w}" height="${v}" rx="1.5" fill="${Array.isArray(cols)?cols[i%cols.length]:cols}"/>`).join("");
  const book=`<path d="M0 -8 q-7 -3 -13 0 v16 q6 -3 13 0 q7 -3 13 0 v-16 q-6 -3 -13 0 z" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 -8 v16 M-10 -3 h7 M-10 1 h7 M3 -3 h7 M3 1 h7" stroke="${C.grey}" stroke-width="1.2"/>`;
  const scroll=`<rect x="-11" y="-6" width="22" height="40" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>${[0,1,2,3,4,5].map(i=>`<path d="M-7 ${-1+i*6} h${8+(i*5)%7}" stroke="${C.grey}" stroke-width="1.6"/>`).join("")}<rect x="-13" y="-9" width="26" height="5" rx="2.5" fill="${C.wood}" stroke="${C.ink}"/>`;
  const balloon=(r)=>`<circle cy="${-r}" r="${r}" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 0 v6" stroke="${C.ink}"/><path d="M${-r*.4} ${-r*1.4} q${r*.3} ${-r*.4} ${r*.7} ${-r*.2}" stroke="#fff" stroke-width="1.4" fill="none"/>`;
  const plank=(col,lab)=>`<rect x="-5" y="-15" width="10" height="30" rx="1.5" fill="${col}" stroke="${C.ink}" stroke-width="1.1"/>`+(lab?txt(0,3,lab,7,"#fff"):"");
  const col=(x,y,c,lab)=>`<rect x="${x-6}" y="${y-36}" width="12" height="36" fill="${c}" stroke="${C.ink}" stroke-width="1.1"/><rect x="${x-6}" y="${y-36}" width="12" height="8" fill="${C.ink}" opacity=".25"/>${lab?txt(x,y-30,lab,6,"#fff"):""}`;
  const brush=`<path d="M-8 8 L6 -6" stroke="${C.wood2}" stroke-width="2.6" stroke-linecap="round"/><path d="M5 -5 l4 -4 l3 3 l-4 4 z" fill="${C.red}" stroke="${C.ink}" stroke-width=".8"/>`;
  const stamp=`<rect x="-4" y="-12" width="8" height="10" rx="2" fill="${C.wood2}"/><rect x="-8" y="-3" width="16" height="6" rx="1.5" fill="${C.red}" stroke="${C.ink}"/>`;
  const easel=(x,y,inner)=>`<g transform="translate(${x} ${y})"><path d="M-12 30 L-4 -4 M12 30 L4 -4" stroke="${C.wood2}" stroke-width="2.4"/><rect x="-16" y="-20" width="32" height="26" rx="2" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>${inner||""}</g>`;
  const blackbox=`<rect x="-8" y="-7" width="16" height="14" rx="2" fill="#ff8c42" stroke="${C.ink}" stroke-width="1.2"/><circle cx="-3" cy="0" r="2" fill="${C.red}"/><path d="M1 -2 h5 M1 2 h5" stroke="${C.ink}" stroke-width="1.2"/>`;
  const steps=(x0,ys,w)=>`<path d="M${x0} 74 ${ys.map((y,i)=>`V${y} H${x0+(i+1)*w}`).join(" ")} V74 Z" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/>`;

  const Z={};
  const A="AWS|", D="Выкатка|", O="Наблюдаемость|", PG="Prometheus и Grafana|", PF="Профилирование|", L="Linux для бэкендера|", E="Что ещё встретишь|";

  /* ---------------- AWS ---------------- */
  Z[A+"S3 — объектное хранилище"]={
    p:[ bg(0)+shelf(68,40,48)+shelf(68,68,48)+box(80,40,13,12,"1")+box(100,40,13,12,"2")+box(80,68,13,12,"3")+key(103,60,.5)+
          b(32,.95,{arms:"reach",mood:"happy",item:box(0,8,16,14,"7")}),
        bg(1)+R(68,26,46,48,"#cfeaff",4)+box(91,70,18,16)+txt(106,38,"*",12,C.blue)+txt(76,38,"*",10,C.blue)+clock(104,16,.7,5)+coin(80,16,.7)+
          b(40,.95,{arms:"push",mood:"sweat"}),
        bg(2)+bucket(100,50,1.05)+kid(70,84,.85,C.grn,"wow")+curve(78,46,88,36,C.grn,true)+
          b(28,.95,{arms:"reach",mood:"happy",item:card(0,0,22,12,C.yel,txt(0,3,"URL",7))}) ],
    l:[["кладу по ключу","put it by a key"],["архив: ждать и платить","archive: wait and pay"],["клиенту — ссылку","the client gets a link"]],
    c:["Файл лежит по ключу. Архив дешёвый, но достать платно. Клиенту даю ссылку, а не ношу сам.","Files sit under a key. Archive is cheap, fetching costs. Clients get a link, I don't carry it."] };

  Z[A+"RDS: multi-AZ и реплики — разные вещи"]={
    p:[ bg(0)+ln("M60 12 V74",C.ink,1.2,true)+db(110,70,.4)+no(102,26,.7)+
          b(28,.85,{arms:"hold",mood:"smile",item:db(0,0,.5)})+b(86,.85,{legs:"sit",mood:"sleep",hat:"helmet"}),
        bg(1)+ln("M60 12 V74",C.ink,1.2,true)+spark(14,26,C.red)+spark(42,24,C.red)+
          b(28,.85,{arms:"down",mood:"dizzy"})+b(90,.85,{arms:"carry",mood:"wow",hat:"helmet",item:db(0,-10,.5)}),
        bg(2)+txt(24,22,"5",11,C.blue)+txt(74,22,"4",11,C.red)+clock(49,22,.65,3)+ar(40,52,56,52,C.blue,true)+kid(108,84,.6,C.yel,"smile")+
          b(24,.8,{arms:"hold",item:db(0,0,.5)})+b(74,.8,{arms:"point",mood:"smile",glasses:true}) ],
    l:[["запасной: читать нельзя","standby: no reading"],["авария — он встаёт","crash — standby steps in"],["реплика читает, отстаёт","a replica reads, lags"]],
    c:["Запасная база ждёт аварии и молчит. Реплика отвечает на чтение, но чуть отстаёт.","The standby just waits for a crash. A replica serves reads but lags a little behind."] };

  Z[A+"Где запускать контейнеры"]={
    p:[ bg(0)+cloud(90,40,1.5)+ctr(92,44,.6,C.blue)+coin(104,70,.7)+pill(90,18,"Fargate",C.yel,C.ink,6.5)+
          b(36,.95,{arms:"carry",mood:"happy",item:ctr(0,-6,.75,C.blue)}),
        bg(1)+`<g transform="translate(86 36)"><circle r="20" fill="#fff" stroke="${C.blue}" stroke-width="3"/>${[0,1,2,3,4,5,6].map(i=>`<path d="M0 0 L0 -20" stroke="${C.blue}" stroke-width="2.4" transform="rotate(${i*51.4})"/>`).join("")}<circle r="5" fill="${C.blue}"/></g>`+gear(106,68,.5)+gear(64,64,.45)+pill(86,66,"k8s",C.blue,"#fff",7)+txt(56,24,"?",13,C.red)+
          b(32,.95,{arms:"up",mood:"dizzy"}),
        bg(2)+coin(70,70,.8)+pill(70,52,"Fargate",C.yel,C.ink,6.5)+[0,1,2,3,4].map(i=>coin(102,72-i*8,.8)).join("")+pill(102,26,"k8s",C.blue,"#fff",6.5)+
          b(28,.95,{arms:"point",mood:"happy"}) ],
    l:[["отдал задачу облаку","hand the task to cloud"],["свой k8s — голова кругом","own k8s: head spins"],["одной команде — дешевле","cheaper for one team"]],
    c:["Fargate: отдал задачу и плачу за неё. Kubernetes мощнее, но без знатока не взлетит.","Fargate: hand over the task and pay for it. Kubernetes is stronger but needs an expert."] };

  Z[A+"Lambda и почему Java там болит"]={
    p:[ bg(0)+env(92,28,.8)+ar(92,40,92,52)+coin(92,62,.8)+
          b(40,.95,{legs:"sit",mood:"sleep"},80),
        bg(1)+clock(84,28,1.1,9)+txt(84,58,"3 s",12,C.red)+kid(108,84,.6,C.yel,"sad")+
          b(36,.95,{arms:"hold",mood:"sweat",item:cup(0,6,false,"#cfeaff")})+pill(58,20,"JVM",C.blue,"#fff",7),
        bg(2)+spark(62,22)+txt(88,42,"0.2 s",12,C.grn)+ok(88,62,.9)+
          b(36,.95,{arms:"hold",mood:"wow",item:G(0,6,.8,card(0,0,24,22,"#fff",cup(0,8,true)))}),
        bg(3)+txt(90,44,"0.05 s",11,C.grn)+spark(98,22)+ok(90,62,.8)+
          b(40,.95,{legs:"run",arms:"reach",mood:"happy",item:G(0,0,.45,chip(0,0,txt(0,4,"N",12,"#fff")))}) ],
    l:[["сплю, плачу за вызов","asleep, pay per call"],["Java греется секунды","Java warms up for secs"],["снимок тёплой JVM","snapshot of a warm JVM"],["или нативный образ","or a native image"]],
    c:["Пока зовут — плачу, нет — сплю. Java просыпается долго, поэтому берут снимок или натив.","I pay per call and sleep in between. Java wakes slowly, so use a snapshot or native image."] };

  Z[A+"SQS: очередь с тремя грабельками"]={
    p:[ bg(0)+[[24,30,"3"],[96,24,"1"],[18,60,"1"],[100,56,"2"]].map(e=>env(e[0],e[1],.6)+pill(e[0],e[1]-11,e[2],e[2]==="1"?C.red:C.blue,"#fff",7)).join("")+
          b(60,.95,{arms:"up",mood:"sweat"}),
        bg(1)+shelf(70,42,44)+R(80,26,20,14,"none",2).replace('stroke-width="1.2"','stroke-width="1.2" stroke-dasharray="3 2"')+clock(104,62,.8,1)+
          b(40,1,{arms:"hold",mood:"think",item:env(0,0,.6)}),
        bg(2)+clock(56,20,.8,12)+shelf(58,48,40)+env(78,40,.6)+
          b(26,.9,{arms:"hold",mood:"sweat",item:env(0,0,.55)})+b(102,.85,{arms:"reach",mood:"wow",hat:"cap",flip:true}),
        bg(3)+R(64,24,50,9,C.grn,3)+R(64,40,28,9,C.blue,3)+clock(108,52,.6,4)+ok(100,68,.7)+
          b(34,.95,{arms:"point",mood:"happy"}) ],
    l:[["вразнобой и бывает дважды","out of order, sometimes 2x"],["взял — другим не видно","taken — hidden from others"],["не успел — берёт второй","too slow — 2nd one takes"],["таймаут длиннее работы","timeout > work time"]],
    c:["Взял письмо — оно спрятано, пока часы тикают. Не успел — его возьмёт кто-то ещё.","I take a message and it hides while the clock runs. Too slow, and someone else grabs it."] };

  Z[A+"DLQ — куда падает то, что не обработалось"]={
    p:[ bg(0)+[76,92,108].map(x=>env(x,64,.5)).join("")+clock(92,30,.8,2)+`<path d="M42 52 a12 10 0 1 1 20 2" fill="none" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 2"/><path d="M58 50 l4 4 l2 -6" fill="none" stroke="${C.red}" stroke-width="2"/>`+txt(52,34,"x3",9,C.red)+
          b(28,.95,{arms:"push",mood:"sweat",item:env(0,0,.6,"#ffd6d6")}),
        bg(1)+box(94,76,32,24,"DLQ",C.grey)+ar(58,30,82,46,C.red,true)+
          b(36,.95,{arms:"carry",mood:"think",item:env(0,-6,.6,"#ffd6d6")}),
        bg(2)+R(54,66,62,4,C.grey,2)+[64,84,104].map(x=>env(x,58,.5)).join("")+ar(72,42,100,42,C.grn)+ok(86,24,.8)+
          b(30,.95,{arms:"up",mood:"happy"}),
        bg(3)+box(86,78,36,24,"DLQ",C.grey)+[0,1,2,3].map(i=>env(86+(i%2?4:-4),48-i*8,.5,"#ffd6d6")).join("")+bell(108,16,.6,true)+
          b(30,.95,{arms:"point",mood:"wow"}) ],
    l:[["кривое крутится, все ждут","bad one loops, all wait"],["после N — в свой ящик","after N — to its own box"],["очередь снова едет","the queue moves again"],["ящик растёт — тревога","box grows — alarm"]],
    c:["Кривое письмо после трёх попыток кладу в отдельный ящик. Если ящик растёт — что-то сломалось.","After three failed tries a bad message goes to its own box. If the box grows, something broke."] };

  Z[A+"SNS, EventBridge и MSK — что когда"]={
    p:[ bg(0)+waves(60,60)+kid(82,84,.55,C.red,"wow")+kid(96,84,.55,C.grn,"wow")+kid(110,84,.55,C.yel,"wow")+[82,96,110].map(x=>env(x,44,.38)).join("")+pill(28,16,"SNS",C.yel,C.ink,7)+
          b(28,.95,{arms:"reach",mood:"happy",item:mega}),
        bg(1)+box(96,44,22,16,null,C.red)+box(96,76,22,16,null,C.blue)+ar(60,56,82,36,C.red)+ar(60,62,82,68,C.blue)+env(14,74,.45,"#d6e8ff")+pill(40,16,"EB",C.yel,C.ink,7)+
          b(40,.95,{arms:"hold",mood:"think",item:env(0,0,.6,"#ffd6d6")}),
        bg(2)+[1,2,3,4,5].map((n,i)=>card(68+i*11,44,11,20,"#fff",txt(0,3,String(n),7.5))).join("")+curve(104,30,72,32,C.blue,true)+pill(92,72,"Kafka",C.blue,"#fff",7)+
          b(32,.95,{arms:"reach",mood:"happy",item:card(0,0,14,18,"#fff",txt(0,3,"1",8,C.blue))}) ],
    l:[["SNS: одно — всем","SNS: one to everyone"],["правила: кому что","rules: who gets what"],["Kafka: перечитать с 1","Kafka: replay from 1"]],
    c:["Выбираю по вопросу: нужно ли перечитывать историю? Да — Kafka. Нет — рассылка или правила.","I ask: do I need to replay history? Yes — Kafka. No — a broadcast or rules routing."] };

  Z[A+"Вход трафика: ALB, Route 53, CloudFront"]={
    p:[ bg(0)+paper(90,38,["DNS","→","1.2.3.4"])+ar(54,40,72,40)+pill(90,70,"R53",C.yel,C.ink,7)+
          b(30,.95,{arms:"hold",mood:"think",item:card(0,0,18,14,"#fff",txt(0,3,"?",9,C.blue))}),
        bg(1)+G(110,26,.4,server(0,0,1))+ln("M58 32 H100",C.grey,1.4,true)+house(84,76,1.1,C.yel)+lock(84,30,.6)+pill(84,56,"CDN",C.blue,"#fff",6)+
          b(40,.95,{legs:"run",arms:"reach",mood:"happy"}),
        bg(2)+door(84,74,C.wood)+door(106,74,C.blue)+pill(84,38,"/api",null,C.ink,6.5)+pill(106,38,"/img",null,C.ink,6.5)+kid(64,84,.6,C.red)+
          b(28,.95,{arms:"point",mood:"happy",hat:"cap"}) ],
    l:[["Route 53: имя → адрес","Route 53: name → address"],["копия рядом: CloudFront","copy nearby: CloudFront"],["ALB: по пути — в комнату","ALB: path → right room"]],
    c:["Справочная даёт адрес, копия ждёт рядом, а я у двери веду в нужную комнату.","The directory gives the address, a copy waits nearby, and I lead you to the right room."] };

  Z[A+"CloudWatch и неожиданный счёт"]={
    p:[ bg(0)+[0,1,2,3,4,5].map(i=>doc(88+(i%2?3:-3),70-i*9,3,null,i%2?6:-6)).join("")+
          b(36,.95,{arms:"carry",mood:"happy",item:doc(0,-4,3)+doc(3,-10,3,null,8)}),
        bg(1)+[0,1,2,3,4].map(i=>coin(94,72-i*8,.85)).join("")+coin(78,72,.85)+txt(78,50,"$",14,C.red)+
          b(36,.95,{arms:"hold",mood:"wow",item:card(0,10,18,24,"#fff",txt(0,-2,"$$",7,C.red)+txt(0,8,"$$$",7,C.red))}),
        bg(2)+bin(96,80,1.1)+doc(92,50,3,null,20)+doc(104,44,3,null,-15)+card(60,22,18,16,"#fff",txt(0,4,"7",9,C.blue))+
          b(32,.95,{arms:"reach",mood:"happy",item:doc(0,0,3)}) ],
    l:[["пишу всё подряд","I log everything"],["а за это — счёт","and here's the bill"],["храню неделю и главное","keep a week, key ones"]],
    c:["Каждая строчка лога и каждая метрика стоят денег. Храню неделю и меряю только главное.","Every log line and every metric costs money. I keep a week and measure only what matters."] };

  Z[A+"Секреты: Secrets Manager и Parameter Store"]={
    p:[ bg(0)+laptop(80,70,1.4)+`<rect x="72" y="42" width="16" height="13" fill="${C.yel}" transform="rotate(8 80 48)"/>`+txt(80,52,"***",7,C.ink)+no(106,20,.8)+
          b(28,.95,{arms:"point",mood:"sad"}),
        bg(1)+box(64,78,22,16,null,C.wood)+key(64,54,.5)+coin(64,38,.55)+safe(100,58,.85,true)+coin(92,82,.45)+coin(102,82,.45)+coin(112,82,.45)+
          b(24,.95,{arms:"point",mood:"think"}),
        bg(2)+safe(94,56,.9)+key(94,22,.6)+ar(78,30,86,26,C.grn)+
          b(30,.95,{arms:"reach",mood:"happy",item:card(8,0,22,14,C.blue,txt(0,3,"IAM",7,"#fff"))}) ],
    l:[["пароль на стикере — нет","no sticky-note password"],["сейф сам меняет пароль","the safe rotates passwords"],["показал роль — взял ключ","showed role, got the key"]],
    c:["Пароля в коде нет. На старте я показываю свою роль и забираю его из сейфа.","No password in the code. At start I show my role and take it from the safe."] };

  Z[A+"За что реально приходит счёт"]={
    p:[ bg(0)+server(84,50,1)+coin(108,26,.6)+
          b(32,.95,{arms:"point",mood:"smile"}),
        bg(1)+`<path d="M78 74 V26" stroke="${C.ink}" stroke-width="3"/><rect x="78" y="40" width="38" height="6" fill="${C.red}" stroke="${C.ink}"/><path d="M86 40 v6 M96 40 v6 M106 40 v6" stroke="#fff" stroke-width="3"/>`+pill(96,28,"NAT",C.yel,C.ink,7)+clock(108,64,.6,3)+txt(94,58,"GB",8)+
          b(32,.95,{arms:"reach",mood:"sweat",item:coin(0,0,.8)}),
        bg(2)+`<g opacity=".75">${db(78,62,.6,C.grey)}${db(104,62,.6,C.grey)}</g>`+ln("M66 46 l6 -4 M92 46 l6 -4 M70 40 l-4 -4",C.grey,1.2)+coin(90,26,.6)+coin(104,20,.6)+coin(116,30,.5)+
          b(30,.95,{arms:"reach",mood:"wow",item:mag(0,0,.8)}) ],
    l:[["сервер — не главное","servers aren't the bill"],["NAT: за час и гигабайт","NAT: per hour and per GB"],["забытые диски и снимки","forgotten disks, snapshots"]],
    c:["Разоряют не серверы, а мелочи: шлюз, трафик наружу и диски, про которые все забыли.","Servers aren't what ruins you: it's the gateway, outbound traffic and forgotten disks."] };

  Z[A+"Типовая связка для Java-сервиса"]={
    p:[ bg(0)+pill(76,24,"R53",C.yel,C.ink,7)+ar(88,24,96,24)+pill(108,24,"CDN",C.blue,"#fff",6)+house(98,76,.9,C.yel)+
          b(42,.95,{legs:"run",arms:"reach",mood:"happy",item:phone(0,0,.45)}),
        bg(1)+box(14,78,22,16,"ECR",C.wood)+pill(96,18,"ALB",C.blue,"#fff",7)+ctr(96,44,.6)+ctr(96,64,.6)+ar(72,36,82,42)+
          b(52,.9,{arms:"carry",mood:"smile",item:ctr(0,-6,.6)}),
        bg(2)+pill(28,16,"RDS",null,C.ink,7)+R(72,46,34,16,C.red,3)+txt(89,57,"Redis",7,"#fff")+spark(110,36)+ar(52,54,68,54)+
          b(28,.95,{arms:"hold",mood:"think",item:db(0,0,.5)}),
        bg(3)+R(60,36,20,18,C.blue,3)+`<path d="M70 54 V74" stroke="${C.ink}" stroke-width="2.4"/>`+txt(70,48,"SQS",6.5,"#fff")+bucket(100,62,.7)+lock(100,24,.6)+
          b(30,.95,{arms:"reach",mood:"happy",item:env(0,0,.55)}) ],
    l:[["адрес и копия рядом","address, nearby copy"],["образ из ECR — в ECS","image from ECR to ECS"],["база и кэш рядом","database plus cache"],["очередь, файлы, сейф","queue, files, secrets"]],
    c:["Скучная схема, где всё на своём месте. Именно её и ждут услышать на собеседовании.","A boring setup with everything in its place. That's exactly what interviewers expect."] };

  Z[A+"Что реально спросят Java-бэкендеру"]={
    p:[ bg(0)+kid(94,84,.95,C.blue,"sad")+txt(108,34,"z",9,C.blue)+
          b(32,.95,{arms:"hold",mood:"sweat",item:scroll}),
        bg(1)+kid(94,84,.95,C.blue)+bubble(92,22,30,env(-6,0,.35)+txt(8,4,"×2",8,C.red))+
          b(32,.95,{arms:"hold",mood:"think",item:env(0,0,.55)}),
        bg(2)+R(52,16,40,30,"#fff",3)+db(62,32,.35)+ar(70,30,82,30,C.blue)+ok(86,30,.5)+kid(106,84,.8,C.blue)+ok(106,38,.6)+
          b(26,.95,{arms:"point",mood:"happy"}) ],
    l:[["список названий — мимо","a list of names misses"],["а если придёт дважды?","what if it comes twice?"],["объясняю модель","I explain the model"]],
    c:["Не зубри названия. Покажи, что понимаешь, что сломается и почему. Не знаешь — так и скажи.","Don't memorize names. Show what breaks and why. If you don't know, say so honestly."] };

  /* ---------------- Выкатка ---------------- */
  Z[D+"Один артефакт на все среды"]={
    p:[ bg(0)+box(20,78,20,16,"v7")+ok(20,48,.6)+box(100,78,20,16,"v7",C.red)+txt(100,50,"?",14,C.red)+
          b(60,.95,{arms:"up",mood:"dizzy"}),
        bg(1)+gear(92,40,1.2)+spark(110,20)+pill(92,70,"1×",C.yel,C.ink,8)+
          b(40,1,{arms:"hold",mood:"think",item:box(0,8,18,16,"v7")}),
        bg(2)+steps(40,[70,62,54],26)+ok(53,62,.5)+ok(79,54,.5)+spark(16,24)+
          b(104,.75,{arms:"hold",mood:"happy",item:box(0,8,18,16,"v7")},54) ],
    l:[["пересобрал — уже не то","rebuilt — not the same"],["собрал один раз","built once"],["та же коробка — везде","same box everywhere"]],
    c:["На прод едет ровно та коробка, которую проверили. Пересобрал — значит, не проверял.","Prod gets exactly the box we tested. Rebuild it and you've tested nothing."] };

  Z[D+"Пайплайн: дешёвое впереди"]={
    p:[ bg(0)+server(66,48,.8)+db(82,62,.45)+pill(72,16,"5 min",C.red,"#fff",6.5)+R(98,46,16,28,C.yel,2)+no(106,34,.6)+
          b(26,.9,{legs:"sit",mood:"sad"},80),
        bg(1)+server(96,48,.8)+pill(96,16,"5 min",C.grey,C.ink,6.5)+ar(66,40,56,40)+
          b(32,.95,{arms:"carry",mood:"think",item:card(0,-6,22,14,C.yel,txt(0,3,"1 s",7))}),
        bg(2)+R(42,46,16,28,C.yel,2)+no(50,36,.7)+G(96,48,.8,server(0,0,1))+txt(108,24,"z",9,C.blue)+
          b(20,.85,{arms:"point",mood:"happy"}) ],
    l:[["ждал 5 минут — и упало","waited 5 min, then fail"],["быстрое ставлю вперёд","fast checks go first"],["упало рано — дёшево","failed early — cheap"]],
    c:["Сначала проверяю то, что быстро. Упадёт — узнаем за секунды, а не через пять минут.","I run the quick checks first. If it fails, we know in seconds, not after five minutes."] };

  Z[D+"Blue-green: откат за секунды"]={
    p:[ bg(1)+R(4,12,54,62,"#d6e8ff",6)+R(62,12,54,62,"#d3f0d6",6)+kid(48,84,.55,C.red)+
          b(24,.8,{arms:"wave",mood:"smile"})+b(84,.8,{arms:"reach",mood:"think",hat:"helmet",item:gear(0,0,.5,C.grn)}),
        bg(0)+R(70,12,46,62,"#d3f0d6",6)+sw(56,42,true,1.6)+kid(88,84,.55,C.red,"wow")+kid(104,84,.55,C.yel,"wow")+ar(72,24,90,24,C.grn)+
          b(30,.95,{arms:"reach",mood:"wow"}),
        bg(2)+R(70,12,46,62,"#d3f0d6",6)+no(94,30,.9)+sw(56,42,false,1.6)+curve(100,52,76,56,C.blue,true)+
          b(30,.95,{arms:"reach",mood:"happy"}) ],
    l:[["рядом готовлю второй","the second warms up"],["щёлк — люди там","click — users move over"],["плохо? щёлк обратно","bad? click back"]],
    c:["Новая версия уже прогрета рядом. Переключаю рубильник, а если что — щёлкаю обратно.","The new version is already warm next door. I flip the switch, and flip it back if needed."] };

  Z[D+"Миграции БД — то, что откат не спасёт"]={
    p:[ bg(3)+col(62,74,C.blue)+`<g transform="rotate(70 92 70)">${col(92,74,C.grey)}</g>`+G(104,34,.6,server(0,0,1,false))+no(104,14,.6)+
          b(28,.95,{arms:"up",mood:"dizzy"}),
        bg(0)+col(80,74,C.blue)+col(94,74,C.grey)+
          b(38,.95,{arms:"carry",mood:"think",item:`<g transform="translate(0 -6) rotate(90)">${plank(C.grn)}</g>`}),
        bg(1)+col(70,74,C.blue)+col(84,74,C.grey)+col(98,74,C.grn)+pill(98,22,"v2",C.grn,"#fff",8)+ar(98,30,98,36,C.grn)+
          b(30,.95,{arms:"point",mood:"smile"}),
        bg(2)+col(70,74,C.blue)+col(84,74,C.grn)+bin(108,80,1)+`<g transform="translate(102 48) rotate(-35)">${plank(C.grey)}</g>`+
          b(36,.95,{arms:"reach",mood:"happy"}) ],
    l:[["снёс колонку — v1 упал","dropped column: v1 dies"],["1) сначала добавь","1) add first"],["2) код на новую","2) switch the code"],["3) потом удали старую","3) then drop the old one"]],
    c:["Код откатить можно, данные — нет. Поэтому: добавь, переключись, и только потом удаляй.","Code rolls back, data doesn't. So: add, switch over, and only then delete."] };

  /* ---------------- Наблюдаемость ---------------- */
  Z[O+"Почему без неё ты слепой"]={
    p:[ bg(0)+server(86,50,1)+ok(108,22,.6)+
          b(36,.95,{arms:"hold",mood:"smile",item:doc(0,0,3)}),
        bg(1)+[[14,24],[30,30],[14,52],[92,24],[108,30],[106,56]].map(p=>G(p[0],p[1],.4,server(0,0,1))).join("")+doc(36,62,2,null,20)+doc(86,64,2,null,-15)+doc(76,16,2,null,30)+txt(60,16,"?",12,C.red)+
          b(60,.95,{arms:"up",mood:"dizzy"}),
        bg(2)+R(16,52,26,22,C.wood,2)+[[72,60],[90,52],[108,62],[84,72]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${i===2?C.red:C.grn}" stroke="${C.ink}"/>`).join("")+ln("M72 60 L90 52 L108 62 M90 52 L84 72",C.ink,1.2)+
          b(29,.75,{arms:"reach",mood:"wow",item:mag(0,0,.9)},52) ],
    l:[["один сервис — лог хватает","one app: a log is enough"],["сорок — ничего не видно","forty: you see nothing"],["вид сверху — нашёл","from above — found it"]],
    c:["Когда запрос бегает через семь сервисов, по одному логу причину не найти. Нужен вид сверху.","When a request runs through seven services, one log can't tell why. You need a view from above."] };

  Z[O+"Три разные вещи: логи, метрики, трейсы"]={
    p:[ bg(0)+paper(90,40,["12:01","12:02","!"])+
          b(34,.95,{arms:"hold",mood:"think",item:book}),
        bg(1)+scr(84,40,46,36,ln("M-18 10 L-8 2 L0 6 L8 -6 L18 -10",C.blue,2.2))+
          b(28,.95,{arms:"point",mood:"smile"}),
        bg(2)+ln("M54 60 Q66 30 80 44 T108 36",C.ink,1.5,true)+[[66,38,"5"],[86,46,"40"],[108,30,"3"]].map(p=>G(p[0],p[1]+6,.38,server(0,0,1))+txt(p[0],p[1]-6,p[2],8,p[2]==="40"?C.red:C.ink)).join("")+
          b(32,.9,{legs:"run",arms:"reach",mood:"happy",item:env(0,0,.5)}) ],
    l:[["лог: что случилось","log: what happened"],["метрика: число во времени","metric: a number over time"],["трейс: путь запроса","trace: a request's path"]],
    c:["Дневник, прибор и маршрут. По дневнику график не построишь, по графику путь не узнаешь.","Diary, gauge and route. A diary can't draw a graph, and a graph can't show the path."] };

  Z[O+"Сквозной идентификатор запроса"]={
    p:[ bg(0)+[[16,24,20],[96,20,-30],[108,50,10],[18,56,-15],[86,66,25],[40,16,40]].map(p=>doc(p[0],p[1],3,null,p[2])).join("")+txt(70,24,"?",12,C.red)+
          b(60,.95,{arms:"up",mood:"sad"}),
        bg(1)+box(66,78,22,16,"#42")+G(92,46,.5,server(0,0,1))+G(110,46,.5,server(0,0,1))+txt(92,28,"#42",7,C.red)+txt(110,28,"#42",7,C.red)+
          b(30,.95,{arms:"reach",mood:"think",item:stamp}),
        bg(2)+[0,1,2,3].map(i=>card(66+i*14,40,12,18,"#fff",txt(0,3,"42",6,C.red))).join("")+ok(87,66,.7)+
          b(26,.95,{arms:"reach",mood:"happy",item:mag(0,0,.8)}) ],
    l:[["без номера — каша","no number — a mess"],["один номер через всех","one number through all"],["по номеру — вся история","the number tells it all"]],
    c:["Каждый сервис пишет в лог один и тот же номер запроса. По нему вся история собирается.","Every service logs the same request number. With it the whole story comes together."] };

  Z[O+"Средняя задержка врёт"]={
    p:[ bg(0)+[0,1,2,3,4,5,6,7,8].map(i=>ok(14+(i%3)*16,22+Math.floor(i/3)*16,.6)).join("")+clock(74,24,.9,10)+
          b(94,.9,{legs:"sit",mood:"sad"},80),
        bg(1)+pill(84,30,"avg 100 ms",C.yel,C.ink,7)+ok(84,54,1)+
          b(30,.95,{arms:"point",mood:"think"}),
        bg(2)+bars(52,72,[8,7,9,8,7,8,9,7,8],4,1.5,C.grn)+`<rect x="102" y="20" width="8" height="52" rx="1.5" fill="${C.red}"/>`+pill(84,22,"p99",C.red,"#fff",7)+
          b(24,.9,{arms:"point",mood:"wow"}) ],
    l:[["девять быстро, один ждёт","nine fast, one waits"],["средняя: «всё хорошо»","average: \"all fine\""],["p90: десятому плохо","p90: every 10th suffers"]],
    c:["Средняя прячет беду. Смотрю p95 и p99 — они показывают, как живёт самый невезучий.","The average hides trouble. I look at p95 and p99 — they show the unluckiest user."] };

  /* ---------------- Prometheus и Grafana ---------------- */
  Z[PG+"Prometheus сам ходит и забирает"]={
    p:[ bg(0)+ln("M52 74 Q80 54 112 72",C.grey,1.4,true)+[[70,36],[90,30],[110,36]].map(p=>G(p[0],p[1],.5,server(0,0,1))).join("")+
          b(34,.9,{legs:"run",arms:"hold",mood:"happy",item:book}),
        bg(1)+server(88,46,1,false)+txt(108,24,"?",13,C.red)+
          b(40,.95,{arms:"reach",mood:"wow"}),
        bg(2)+[0,1,2,3,4,5].map(i=>G(66+(i%3)*20,30+Math.floor(i/3)*30,.42,server(0,0,1))).join("")+ok(30,18,.6)+
          b(30,.95,{arms:"hold",mood:"happy",item:book}) ],
    l:[["сам обхожу по кругу","I walk round myself"],["молчит — сразу видно","silent? seen at once"],["их сто — я не тону","a hundred — no flood"]],
    c:["Я сам каждые N секунд хожу и спрашиваю. Кто не ответил — тот, значит, упал.","Every N seconds I go round and ask. Whoever doesn't answer must be down."] };

  Z[PG+"Метрика — это имя и метки"]={
    p:[ bg(0)+[[64,78],[80,78],[96,78],[112,78],[72,64],[88,64],[104,64],[80,50],[96,50],[88,36]].map((p,i)=>box(p[0],p[1],15,13)+txt(p[0],p[1]-3,"id"+(i+1),5,"#fff")).join("")+
          b(30,.9,{arms:"up",mood:"dizzy"}),
        bg(1)+card(90,36,40,26,"#fff",txt(0,-3,"POST",8,C.blue)+txt(0,8,"500",8,C.red))+
          b(34,.95,{arms:"hold",mood:"think",item:box(0,8,22,14,"500")}),
        bg(2)+box(76,78,22,14,"200",C.grn)+box(76,64,22,14,"200",C.grn)+box(104,78,22,14,"500",C.red)+pill(76,40,"7",C.grn,"#fff",8)+pill(104,52,"1",C.red,"#fff",8)+
          b(30,.95,{arms:"point",mood:"happy"}) ],
    l:[["id в метке — склад лопнул","id in a label: it bursts"],["метка — короткий признак","a label is a short trait"],["по меткам режу и считаю","slice and count by label"]],
    c:["Метка — короткий признак: метод, код ответа. Положишь туда id клиента — рядов будут миллионы.","A label is a short trait: method, status. Put a user id there and you get millions of rows."] };

  Z[PG+"Grafana только рисует"]={
    p:[ bg(0)+R(40,58,24,5,C.grey,2)+easel(76,40,ln("M-12 2 L-4 -6 L4 -2 L12 -12",C.blue,2))+
          b(22,.75,{arms:"hold",mood:"smile",hat:"helmet",item:db(0,0,.5)})+b(104,.75,{arms:"point",mood:"happy",glasses:true,flip:true}),
        bg(1)+R(30,58,14,5,C.grey,2)+R(52,58,10,5,C.grey,2)+spark(48,56,C.red)+easel(76,40,txt(0,2,"?",12,C.red))+
          b(16,.75,{arms:"hold",hat:"helmet",item:db(0,0,.5)})+b(104,.75,{arms:"down",mood:"sad",glasses:true,flip:true}),
        bg(2)+R(50,58,32,5,C.grn,2)+easel(96,40,ln("M-12 2 L-4 -6 L4 -2 L12 -12",C.blue,2))+ok(96,14,.6)+
          b(30,.95,{arms:"reach",mood:"happy",hat:"helmet",item:wrench}) ],
    l:[["хранит один, рисует другой","one stores, one draws"],["пусто? труба оборвана","empty? the pipe is cut"],["чиню сбор — график ожил","fix collection — it draws"]],
    c:["Grafana — только стекло циферблата. Пустой график чиню там, где метрики собирают.","Grafana is just the glass on the gauge. An empty chart is fixed where metrics are collected."] };

  Z[PG+"Алерт — про симптом, а не про причину"]={
    p:[ bg(0)+bell(84,30,1.1,true)+pill(84,60,"CPU 90%",C.grey,C.ink,6.2)+
          b(30,.95,{arms:"up",mood:"angry"}),
        bg(1)+bell(70,24,.8,true)+kid(92,84,.6,C.red,"sad")+kid(108,84,.6,C.yel,"sad")+no(100,36,.6)+
          b(32,.95,{legs:"sit",mood:"sleep"},80),
        bg(2)+bell(90,26,1.1,true)+pill(90,56,"5xx > 5%",C.red,"#fff",7)+
          b(36,.95,{legs:"run",arms:"reach",mood:"wow"}) ],
    l:[["звенит зря — злюсь","rings for nothing"],["привык — проспал беду","got used, slept through"],["звоню, когда плохо людям","ring when users suffer"]],
    c:["Звоню, когда плохо людям, а не когда процессор вспотел. Иначе звонок перестанут слушать.","I ring when users suffer, not when the CPU sweats. Otherwise nobody listens anymore."] };

  /* ---------------- Профилирование ---------------- */
  Z[PF+"Сначала измерь, потом чини"]={
    p:[ bg(0)+R(70,14,44,60,"#f3dcae",2)+[[80,30],[100,24],[92,52],[106,62]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${C.ink}" opacity=".7"/>`).join("")+
          b(36,.95,{arms:"reach",mood:"sweat",item:hammer}),
        bg(1)+[[60,"#5aa9e6",8],[60,"#ef5b5b",50],[60,"#5aa9e6",6],[60,"#5aa9e6",4]].map((r,i)=>R(r[0],20+i*13,r[2],8,r[1],2)).join("")+txt(116,40,"!",11,C.red)+
          b(30,.95,{arms:"point",mood:"think"}),
        bg(2)+ln("M64 50 H116",C.grey,5)+R(84,44,12,12,C.grn,2)+ok(90,28,.7)+
          b(40,.95,{arms:"reach",mood:"happy",item:wrench}) ],
    l:[["долблю стены наугад","smashing walls at random"],["цифры: где время","numbers: where time goes"],["чиню одно — быстро","fix the one — fast"]],
    c:["Не гадаю, а меряю. Обычно всё время съедает одно место, а не то, что я подозревал.","I measure, not guess. Usually one spot eats all the time, and not the one I suspected."] };

  Z[PF+"Heap dump и поиск утечки"]={
    p:[ bg(0)+[[76,78],[92,78],[108,78],[84,66],[100,66],[92,54]].map(p=>box(p[0],p[1],14,12)).join("")+spark(70,30)+
          b(34,.95,{arms:"reach",mood:"think",item:camera}),
        bg(1)+box(70,78,14,12)+box(86,78,14,12)+[0,1,2,3,4].map(i=>box(106,78-i*12,14,12,null,C.red)).join("")+ar(106,16,106,8,C.red)+
          b(30,.95,{arms:"up",mood:"wow"}),
        bg(2)+pill(16,26,"static",C.yel,C.ink,6)+[0,1,2,3].map(i=>box(104,78-i*12,14,12,null,C.red)).join("")+`<path d="M24 32 Q50 70 96 60" stroke="${C.wood2}" stroke-width="2" fill="none"/>`+
          b(56,.9,{arms:"reach",mood:"happy",item:mag(0,0,.8)}) ],
    l:[["снимок всей кучи","a snapshot of the heap"],["кто растёт и растёт","what keeps on growing"],["кто держит ссылку","who holds the reference"]],
    c:["Снимок кучи покажет, что растёт и кто за это держится. Утечка — список без выхода.","A heap dump shows what grows and who holds on. A leak is a list that never shrinks."] };

  Z[PF+"JFR — чёрный ящик JVM"]={
    p:[ bg(0)+tape(70,56,46,[0,1,2,3].map(i=>`<circle cx="${76+i*11}" cy="62" r="2.5" fill="${[C.blue,C.grn,C.yel,C.blue][i]}"/>`).join(""))+
          b(44,.95,{legs:"run",arms:"hold",mood:"happy",item:blackbox}),
        bg(1)+spark(70,26,C.red)+spark(84,40,C.red)+spark(20,30,C.red)+G(92,70,1.2,blackbox)+ok(106,52,.6)+
          b(40,.95,{arms:"up",mood:"dizzy"}),
        bg(2)+tape(48,28,68,pill(60,34,"GC",C.grn,"#fff",6)+G(82,34,.35,lock(0,0,1))+G(102,34,.4,clock(0,0,1,3)))+
          b(26,.95,{arms:"point",mood:"wow"}) ],
    l:[["пишу всегда, почти даром","always on, nearly free"],["авария — ящик цел","crash — the box survives"],["разматываю — вот что было","replay: here's what was"]],
    c:["Самописец в JVM: пишет всё почти даром. После аварии разматываю запись и вижу, что было.","A flight recorder in the JVM: nearly free. After a crash I replay it and see what happened."] };

  Z[PF+"Флеймграф читается за минуту"]={
    p:[ bg(0)+[0,1,2].map(i=>doc(80+i*12,50+(i%2)*8,4,null,(i-1)*12)).join("")+doc(96,28,4,null,10)+
          b(32,.95,{arms:"hold",mood:"dizzy",item:scroll}),
        bg(1)+R(48,66,68,8,C.yel,1)+R(48,56,56,8,"#ffa94d",1)+R(48,46,52,8,C.red,1)+R(104,56,12,8,"#ffa94d",1)+R(48,36,14,8,"#ffa94d",1)+R(62,36,30,8,C.red,1)+
          b(22,.85,{arms:"point",mood:"wow"}),
        bg(2)+R(48,66,68,8,C.yel,1)+R(48,56,28,8,"#ffa94d",1)+R(76,56,40,8,"#ffa94d",1)+R(48,46,16,8,C.red,1)+R(80,46,22,8,"#ffa94d",1)+ok(100,28,.7)+
          b(22,.85,{arms:"up",mood:"happy"}) ],
    l:[["читать код — до ночи","reading code takes ages"],["широкое плато — виновник","the wide plateau is it"],["починил — плато сжалось","fixed — it shrank"]],
    c:["Ширина полоски — сколько времени ушло. Ищу самое широкое плато, и не надо читать код.","Bar width is time spent. I look for the widest plateau, no need to read the code."] };

  Z[PF+"Ищи по симптому, а не по коду"]={
    p:[ bg(0)+server(88,48,1,false)+txt(108,24,"?",13,C.blue)+
          b(34,.95,{arms:"point",mood:"think",hat:true}),
        bg(1)+pill(92,70,"GC",C.grn,"#fff",8)+
          b(36,.95,{arms:"carry",mood:"sweat",item:`<g transform="translate(0 6)">${balloon(14)}</g>`+txt(0,-8,"heap",6,"#fff")}),
        bg(2)+db(92,50,.9)+clock(68,22,.7,6)+pill(96,16,"CPU 5%",C.grn,"#fff",6.5)+
          b(40,.95,{legs:"sit",mood:"sleep"},80),
        bg(3)+fire(96,76,1.3)+pill(92,26,"CPU 100%",C.red,"#fff",6.5)+
          b(46,.95,{legs:"run",arms:"up",mood:"sweat"}) ],
    l:[["где болит?","where does it hurt?"],["память растёт — GC","memory grows — check GC"],["CPU спит — я жду","CPU idle — I'm waiting"],["CPU горит — считаю лишнее","CPU maxed — extra work"]],
    c:["Сначала спрашиваю, где болит: память, ожидание или процессор. Это сразу сужает поиск.","First I ask where it hurts: memory, waiting or CPU. That narrows the search at once."] };

  /* ---------------- Linux ---------------- */
  Z[L+"Логи: где они и как смотреть"]={
    p:[ bg(0)+[0,1,2,3,4,5].map(i=>R(70,66-i*9,40,8,"#fff",1)).join("")+pill(90,14,"365",C.grey,C.ink,7)+
          b(34,.95,{arms:"up",mood:"dizzy"}),
        bg(1)+ctr(28,30,.9,C.blue)+`<path d="M40 34 Q60 34 64 50 T100 62" stroke="${C.ink}" stroke-width="11" fill="none"/><path d="M40 34 Q60 34 64 50 T100 62" stroke="#fff" stroke-width="9" fill="none" stroke-dasharray="5 3"/>`+pill(28,14,"stdout",null,C.ink,6)+
          b(76,.95,{arms:"hold",mood:"happy",item:card(0,0,24,10,"#fff",ln("M-8 0 h16",C.grey,1.6))}),
        bg(2)+[0,1,2,3].map(i=>R(62,18+i*13,50,9,i===2?"#ffd6d6":"#fff",1)).join("")+pill(86,78,"grep",C.blue,"#fff",6)+
          b(28,.95,{arms:"reach",mood:"wow",item:mag(0,0,.9)}) ],
    l:[["архив за год — не то","a year's archive — no"],["живой хвост вывода","the live output tail"],["grep ловит строку","grep catches the line"]],
    c:["Смотрю не архив за год, а живую ленту: хвост лога, и поиском ловлю нужную строчку.","I don't read a year's archive, just the live feed: tail the log and grep for the line."] };

  Z[L+"Кто съел процессор и память"]={
    p:[ bg(0)+laptop(86,66,1.4)+fire(108,40,.6)+G(86,46,.7,clock(0,0,1,7))+
          b(30,.95,{arms:"reach",mood:"sweat"}),
        bg(1)+[[C.red,46,"java"],[C.blue,24,""],[C.blue,14,""],[C.blue,8,""]].map((r,i)=>R(60,20+i*13,r[1],9,r[0],2)+(r[2]?txt(60+r[1]/2,27+i*13,r[2],6.5,"#fff"):"")).join("")+
          b(28,.95,{arms:"point",mood:"wow"}),
        bg(2)+R(24,16,82,62,"#d6e8ff",4)+[30,42,54].map(y=>ln(`M28 ${y} h6`,C.blue,1.2)).join("")+
          b(62,.9,{arms:"reach",mood:"happy",item:mag(0,0,.8)}) ],
    l:[["всё тормозит","everything is slow"],["сортирую — вот обжора","sort it — there's the hog"],["в контейнере — изнутри","look from the inside"]],
    c:["Открываю живую таблицу, сортирую по памяти — и виден, какой цех тянет всё электричество.","I open the live table, sort by memory, and see which workshop eats all the power."] };

  Z[L+"Кто занял порт"]={
    p:[ bg(0)+R(70,74,44,4,"#fff",1)+txt(92,30,"8080",9)+car(92,72,1.05,C.red)+
          b(30,.95,{arms:"reach",mood:"sad",item:ctr(0,-6,.6)}),
        bg(1)+car(90,72,1.1,C.red)+card(90,40,30,14,"#fff",txt(0,3,"PID 42",7))+
          b(36,.95,{arms:"reach",mood:"think",item:mag(0,0,.8)}),
        bg(2)+txt(22,22,"8080",8,C.grey)+car(22,72,.7,C.red)+txt(94,22,"8081",9,C.grn)+R(74,74,40,4,"#fff",1)+ctr(94,66,.7)+ok(110,40,.6)+
          b(54,.9,{arms:"point",mood:"happy"}) ],
    l:[["8080 занят — не старт","8080 taken — won't start"],["чей процесс держит?","whose process holds it?"],["убрать или сменить порт","kill it or change port"]],
    c:["Не гадаю, почему не стартует: смотрю, кто стоит на месте 8080, и решаю, что делать.","I don't guess why it won't start: I check who's parked on 8080 and decide what to do."] };

  Z[L+"Место на диске кончается тихо"]={
    p:[ bg(0)+R(66,14,48,60,C.wood,2)+[0,1,2,3].map(i=>box(76+(i%2)*20,74-Math.floor(i/2)*28,16,24)).join("")+pill(90,8+4,"98%",C.red,"#fff",7)+
          b(40,.95,{arms:"push",mood:"sweat"}),
        bg(1)+[0,1,2,3,4].map(i=>doc(66+(i%2)*4,72-i*9,3,null,i%2?8:-8)).join("")+pill(68,14,"log",null,C.ink,6.5)+box(104,78,24,16,"img",C.blue)+box(104,62,24,16,"img",C.blue)+
          b(26,.9,{arms:"point",mood:"wow"}),
        bg(2)+R(64,14,50,60,"#fff",2)+[0,1,2,3,4,5,6].map(r=>[0,1,2,3,4,5,6,7].map(c=>`<rect x="${66+c*6}" y="${16+r*5}" width="5" height="4" fill="${C.yel}"/>`).join("")).join("")+txt(89,64,"50%",9,C.grn)+
          b(32,.95,{arms:"hold",mood:"dizzy",item:doc(0,0,2)}) ],
    l:[["диск почти полон","the disk is nearly full"],["кто разжирел: логи, образы","who grew: logs, images"],["место есть, ячеек нет","space left, no slots"]],
    c:["Чаще всего диск съедают логи и образы. Хуже: место есть, а ячейки под мелкие файлы кончились.","Logs and images usually eat the disk. Worse: there's space, but no slots for tiny files."] };

  Z[L+"Проверить связь и сертификат"]={
    p:[ bg(0)+server(94,46,.9)+curve(54,48,82,40,C.blue,true)+txt(70,22,"?",11,C.blue)+
          b(32,.95,{arms:"hold",mood:"think",item:phone(0,0,.6)}),
        bg(1)+[["DNS",10,C.blue],["TCP",10,C.blue],["TLS",10,C.blue],["app",10,C.blue]].map((r,i)=>txt(56,27+i*13,r[0],6.5)+R(66,20+i*13,r[1]+i*4,9,r[2],2)).join("")+clock(106,72,.6,2)+
          b(24,.85,{arms:"point",mood:"think"}),
        bg(2)+[["DNS",8,C.blue],["TCP",10,C.blue],["TLS",46,C.red],["app",12,C.blue]].map((r,i)=>txt(56,27+i*13,r[0],6.5)+R(66,20+i*13,r[1],9,r[2],2)).join("")+
          b(24,.85,{arms:"point",mood:"wow"}) ],
    l:[["звоню сам","I call it myself"],["время на каждом шаге","time at each step"],["вот где тормозит","there's the slow part"]],
    c:["Прежде чем читать код, звоню сам и засекаю: адрес, соединение, шифрование, ответ.","Before reading code I call it myself and time it: lookup, connect, TLS, response."] };

  /* ---------------- Что ещё встретишь ---------------- */
  Z[E+"Nginx — привратник перед приложением"]={
    p:[ bg(0)+kid(18,84,.7,C.red)+door(102,74,C.wood)+
          b(58,.95,{arms:"hold",mood:"smile",hat:"cap",item:lock(0,0,.7,true)}),
        bg(1)+shelf(4,36,30)+card(12,28,10,12,"#fff",`<circle r="3" fill="${C.yel}"/>`)+card(26,28,10,12,"#fff",`<circle r="3" fill="${C.grn}"/>`)+kid(98,84,.7,C.grn,"wow")+
          b(46,.95,{arms:"reach",mood:"happy",hat:"cap",item:card(0,0,14,16,"#fff",`<circle r="4" fill="${C.red}"/><path d="M-6 6 l4 -4 l3 3 l3 -3 l2 4" stroke="${C.grn}" fill="none"/>`)}),
        bg(2)+G(96,30,.6,server(0,0,1))+G(96,64,.6,server(0,0,1))+ar(56,52,82,32,C.blue)+ar(56,58,82,64,C.grn)+
          b(30,.95,{arms:"point",mood:"smile",hat:"cap"}),
        bg(3)+G(96,30,.6,server(0,0,1,false))+no(110,16,.6)+G(96,64,.6,server(0,0,1))+ar(56,58,82,64,C.grn)+ln("M56 50 L74 36",C.grey,1.6,true)+
          b(30,.95,{arms:"point",mood:"happy",hat:"cap"}) ],
    l:[["снимаю шифрование","TLS ends at the door"],["картинки отдаю сам","static: I serve it"],["делю между копиями","split across copies"],["упавший — мимо","the dead one is skipped"]],
    c:["Я стою у входа: снимаю шифрование, раздаю картинки, делю гостей и обхожу упавших.","I stand at the door: handle TLS, serve images, share out guests and skip the fallen."] };

  Z[E+"Maven и Gradle — сборка и зависимости"]={
    p:[ bg(0)+box(92,78,22,16,"1.2")+box(92,62,22,16,"3.0",C.blue)+txt(92,32,"↓",14,C.blue)+
          b(40,.95,{arms:"carry",mood:"happy",hat:"helmet",item:box(0,-6,20,12,"1.2")}),
        bg(1)+[0,1,2,3].map(r=>[0,1,2].map(c=>brick(66+c*16+(r%2?8:0),78-r*8,null,r%2?C.red:"#e07a5f")).join("")).join("")+ok(92,24,.7)+
          b(32,.95,{arms:"reach",mood:"smile",hat:"helmet",item:brick(0,4,null,C.red)}),
        bg(2)+box(16,78,22,16,"A",C.wood)+box(104,78,22,16,"B",C.wood)+brick(16,52,"C1",C.blue)+brick(104,52,"C2",C.grn)+
          b(60,.95,{arms:"up",mood:"think",hat:"helmet"}),
        bg(3)+[[78,78,0],[94,78,0],[86,64,25],[104,60,-30],[72,48,40]].map(p=>`<g transform="rotate(${p[2]} ${p[0]} ${p[1]})">${brick(p[0],p[1],null,C.red)}</g>`).join("")+spark(100,30,C.red)+
          b(34,.95,{arms:"up",mood:"dizzy",hat:"helmet"}) ],
    l:[["качаю нужные версии","fetch the right versions"],["собрал, проверил, упаковал","build, test, package"],["двум нужны разные C","two want different Cs"],["рухнуло уже в работе","it crashes at runtime"]],
    c:["Я качаю кирпичи и строю. Если двум нужны разные версии третьей — рухнет уже при запуске.","I fetch bricks and build. If two need different versions of a third, it breaks at run time."] };

  Z[E+"Flyway и Liquibase — миграции базы"]={
    p:[ bg(0)+db(18,46,.65,C.blue)+db(102,28,.55,C.grn)+db(102,66,.55,C.red)+txt(80,46,"?",12,C.red)+
          b(52,.95,{arms:"up",mood:"dizzy"},84),
        bg(1)+[1,2,3].map((n,i)=>card(78+i*14,34,12,16,"#fff",txt(0,3,"V"+n,6,C.blue))).join("")+shelf(70,44,48)+
          b(36,.95,{arms:"hold",mood:"think",item:card(0,0,14,16,"#fff",txt(0,3,"V4",6,C.blue))}),
        bg(2)+steps(54,[66,56,46],22)+txt(65,73,"1",8,"#fff")+txt(87,73,"2",8,"#fff")+txt(109,73,"3",8,"#fff")+db(66,56,.42)+pill(109,32,"V3",C.yel,C.ink,7)+
          b(28,.95,{arms:"push",mood:"happy"}) ],
    l:[["руками — три разных","by hand: three different"],["шаги по номерам","numbered steps"],["на старте догоняю базу","catch up on start"]],
    c:["Каждое изменение базы — скрипт с номером. На старте я догоняю базу до последнего.","Every database change is a numbered script. On start I bring the base up to the latest."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 8 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const B=(x,s,o)=>bot(x,82,s,o);
  const G=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s||1})">${inner}</g>`;
  const L=(x,y,w,col,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h||3.4}" rx="1.6" fill="${col||C.grey}"/>`;
  const R=(x,y,w,h,f,rx,st)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx==null?2:rx}" fill="${f||"#fff"}" stroke="${st||C.ink}" stroke-width="1.2"/>`;
  const P=(d,col,w,fill,dash)=>`<path d="${d}" stroke="${col||C.ink}" stroke-width="${w||1.6}" fill="${fill||"none"}" stroke-linecap="round" stroke-linejoin="round"${dash?' stroke-dasharray="3 2.5"':""}/>`;
  const bug=(x,y,s,op)=>`<g transform="translate(${x} ${y}) scale(${s||1})" opacity="${op==null?1:op}">${P("M-7 -2 l-5 -3 M-7 3 l-5 3 M7 -2 l5 -3 M7 3 l5 3 M-3 -7 l-3 -5 M3 -7 l3 -5",C.ink,1.4)}<ellipse rx="8" ry="7" fill="${C.red}" stroke="${C.ink}" stroke-width="1.1"/><path d="M0 -7 v14" stroke="${C.ink}" stroke-width="1"/><circle cx="-3.5" cy="-1" r="1.4" fill="${C.ink}"/><circle cx="3.5" cy="2.5" r="1.4" fill="${C.ink}"/></g>`;
  const rack=(x1,x2,ys)=>`<path d="M${x1} ${ys[0]-26} V80 M${x2} ${ys[0]-26} V80" stroke="${C.wood2}" stroke-width="3"/>`+ys.map(y=>`<rect x="${x1-2}" y="${y}" width="${x2-x1+4}" height="3.5" rx="1.5" fill="${C.wood2}"/>`).join("");
  const desk=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="4.5" rx="2" fill="${C.wood}" stroke="${C.wood2}"/>`+P(`M${x1+4} ${y+4} V80 M${x2-4} ${y+4} V80`,C.wood2,3);
  const door=(x,n,col)=>R(x-12,34,24,46,col||C.wood,2,C.wood2)+`<circle cx="${x+7}" cy="58" r="1.6" fill="${C.ink}"/>`+(n!=null?`<circle cx="${x}" cy="26" r="6.5" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>`+txt(x,29.3,n,9):"");
  const board=(x,y,w,h)=>R(x,y,w,h,"#fff",3)+P(`M${x+6} ${y+h} l-3 ${80-y-h} M${x+w-6} ${y+h} l3 ${80-y-h}`,C.grey,2);
  const sheet=(x,y,w,rows,gap)=>R(x,y,w,rows.length*(gap||8)+6,"#fff",3)+rows.map((r,i)=>L(x+4,y+5+i*(gap||8),r[0],r[1])).join("");
  const gift=(w,h,col)=>R(-w/2,-h/2,w,h,col,2)+`<rect x="-2" y="${-h/2}" width="4" height="${h}" fill="${C.yel}"/><rect x="${-w/2}" y="-2" width="${w}" height="4" fill="${C.yel}"/>`+P(`M0 ${-h/2} q-7 -7 -8 0 z M0 ${-h/2} q7 -7 8 0 z`,C.ink,1,C.yel);
  const ball=(x,y,t,col,r,ts)=>`<circle cx="${x}" cy="${y}" r="${r||7}" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.1"/>`+(t!=null?txt(x,y+(ts||7)*.36,t,ts||7,"#fff"):"");
  const bucket=(x,n,inner)=>(inner||"")+`<path d="M${x-13} 58 L${x-10} 80 H${x+10} L${x+13} 58 Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2" opacity=".92"/>`+txt(x,72,n,10,C.ink);
  const house=(x,w,h,col)=>`<path d="M${x-w/2} 80 V${80-h} L${x} ${80-h-w*.4} L${x+w/2} ${80-h} V80 Z" fill="${col||C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>`;
  const sign=(t,w,col,ts)=>card(0,0,w,16,col||"#fff",txt(0,ts?ts*.36:3.8,t,ts||10));
  const days=(x,y,n,col)=>Array.from({length:n},(_,i)=>R(x+i*15,y,13,13,col?col(i):"#fff",2.5)+txt(x+i*15+6.5,y+9.5,String(i+1),8)).join("");
  const book=(col)=>R(-9,-7,18,14,col||C.red,1.5)+`<path d="M0 -7 v14" stroke="#fff" stroke-width="1.2"/>`;
  const net=`<path d="M0 0 L12 -12" stroke="${C.wood2}" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="17" cy="-17" rx="7" ry="6" fill="#ffffff" fill-opacity=".5" stroke="${C.ink}" stroke-width="1.2"/>`;
  const probe=`<path d="M0 2 L8 -14" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/><circle cx="8.5" cy="-15" r="2.2" fill="${C.red}"/>`;
  const saw=`<path d="M-2 -3 h6 v6 h-6 z" fill="${C.wood}" stroke="${C.ink}"/><path d="M4 -2 h20 l-2 5 h-18 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1"/><path d="M6 3 l2 2 l2 -2 l2 2 l2 -2 l2 2 l2 -2 l2 2" stroke="${C.ink}" stroke-width=".8" fill="none"/>`;
  const knob=(x,y,a,col)=>`<g transform="translate(${x} ${y})"><circle r="5.5" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 0 L0 -4.5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" transform="rotate(${a||0})"/></g>`;
  const mach=(x,a1,a2,outT,outC)=>R(x-18,40,36,40,"#8fa3c9",4)+knob(x-8,52,a1)+knob(x+8,52,a2)+R(x-12,63,24,11,"#dfe9ff",2)+(outT!=null?txt(x,71.5,outT,9,outC||C.ink):"");
  const safe=(x)=>R(x-16,46,32,34,"#7d869c",3)+`<circle cx="${x}" cy="63" r="7" fill="#c3c9d6" stroke="${C.ink}" stroke-width="1.2"/>`+P(`M${x} 63 l4 -3`,C.ink,1.6);
  const brick=(x,y,w,t,col)=>R(x-w/2,y-9,w,9,col||C.red,1.5)+(t?txt(x,y-2.2,t,6.5,"#fff"):"");
  const blk=(x,y,w,col,t)=>R(x,y,w,12,col,2)+(t!=null?txt(x+w/2,y+8.5,t,7,"#fff"):"");
  const moon=(x,y)=>`<path d="M${x} ${y-7} a7 7 0 1 0 6 10 a6 6 0 0 1 -6 -10 z" fill="${C.yel}"/>`;
  const heart=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M0 6 C-10 -1 -6 -9 0 -4 C6 -9 10 -1 0 6 Z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1"/></g>`;
  const balance=(x,dy,lft,rgt)=>{ const e=[[x-28,34+dy],[x+28,34-dy]]; return P(`M${x} 80 V34 M${x-8} 80 h16`,C.wood2,3)+P(`M${e[0][0]} ${e[0][1]} L${e[1][0]} ${e[1][1]}`,C.ink,2.4)+`<circle cx="${x}" cy="34" r="2.5" fill="${C.ink}"/>`
    +e.map(([ex,ey],i)=>P(`M${ex} ${ey} l-9 16 M${ex} ${ey} l9 16`,C.ink,1)+G(ex,ey+11,1,i?rgt:lft)+P(`M${ex-11} ${ey+16} h22 q-2 6 -11 6 q-9 0 -11 -6 z`,C.ink,1.1,"#fff")).join(""); };
  const belt=(y)=>R(4,y,112,7,"#6f778c",3.5)+[12,30,48,66,84,102].map(cx=>`<circle cx="${cx}" cy="${y+3.5}" r="2.2" fill="#c3c9d6"/>`).join("");
  const Z={};

  /* ===== Что ещё встретишь ===== */
  Z["Что ещё встретишь|S3 и MinIO — файлы не в базе"]={
    p:[ bg(0)+db(84,56,1.5)+card(74,26,14,18,"#fff",txt(0,2.5,"JPG",5.5),-16)+card(94,22,14,18,"#fff",txt(0,2.5,"MP4",5.5),14)+card(85,18,14,18,"#fff",txt(0,2.5,"PDF",5.5),-4)+txt(112,34,"!",15,C.red)+txt(56,40,"!",11,C.red)
          +B(26,.9,{arms:"push",mood:"sweat",item:card(0,0,14,18,"#fff",txt(0,2.5,"PDF",5.5))}),
        bg(1)+rack(76,114,[44,68])+box(84,44,13,13,"")+box(100,44,13,13,"")+box(84,68,13,13,"")+B(38,.9,{arms:"carry",mood:"think",item:box(0,2,24,16,"PDF")})+P("M62 26 q8 -6 14 2",C.ink,1.4,"none",true),
        bg(2)+rack(6,40,[48])+box(14,48,11,11,"6")+box(30,48,11,11,"7")+`<rect x="23" y="34" width="14" height="16" rx="3" fill="none" stroke="${C.grn}" stroke-width="2" stroke-dasharray="3 2"/>`
          +db(100,62,.85)+card(100,36,22,11,"#fff",txt(0,3,"→7",7,C.blue))+B(64,.85,{arms:"reach",mood:"happy",item:card(0,0,18,11,"#fff",txt(0,3,"→7",7,C.blue))})+curve(32,32,95,30,C.blue,true) ],
    l:[["база пухнет от файлов","files bloat the DB"],["файлы — на полку","files go on the shelf"],["в базе — только ссылка","the DB keeps a link"]],
    c:["Тяжёлые файлы я ставлю на полку хранилища, а в базу пишу только их адрес.","I put heavy files on a storage shelf and write only their address into the database."] };

  Z["Что ещё встретишь|gRPC — когда REST дорог"]={
    p:[ bg(0)+server(104,58,.9)+B(42,.88,{arms:"carry",mood:"sweat",item:card(0,0,58,16,"#fff",txt(-24,4,"{",11)+L(-18,-4,16)+L(0,-4,14,C.blue)+L(-18,2,22)+L(6,2,10,C.blue)+txt(24,4,"}",11))})+txt(80,74,"JSON",8,C.red),
        bg(1)+B(26,.85,{arms:"reach",mood:"think",item:card(0,0,18,22,"#fff",txt(0,-4,"proto",5.5,C.blue)+L(-6,0,12)+L(-6,5,9))})+gear(70,48,1.1)+arrowR(84,48,94)+laptop(106,64,.55,txt(0,-10,"&lt;/&gt;",8,C.blue))+spark(70,24),
        bg(2)+server(104,58,.9)+B(52,.9,{arms:"hold",legs:"run",mood:"happy",item:card(0,0,22,12,C.yel,txt(0,3,"0101",7))})+txt(30,30,"HTTP/2",8,C.blue)+spark(104,24),
        bg(3)+kid(96,82,1.15,C.red,"sad")+laptop(96,73,.55,txt(0,-10,"?",9,C.red))+B(40,.9,{arms:"point",mood:"sweat",item:card(0,0,22,12,C.yel,txt(0,3,"0101",7))}) ],
    l:[["JSON — длинный","JSON is wordy"],["по схеме — готовый клиент","schema builds the client"],["коротко и быстро","short and fast"],["браузеру — сложно","hard for browsers"]],
    c:["Свои сервисы болтают коротким двоичным кодом по схеме. Браузеру без переводчика не понять.","My services chat in short binary by a shared schema. A browser can't follow without help."] };

  const tower=(cols)=>cols.map((c,i)=>`<rect x="${-14+(i%2?2:-1)}" y="${2-i*6}" width="28" height="5.4" rx="1.5" fill="${c}" stroke="${C.ink}" stroke-width=".8"/>`).join("");
  Z["Что ещё встретишь|Чего НЕ стоит учить впрок"]={
    p:[ bg(0)+B(48,.85,{arms:"carry",mood:"sweat",item:tower([C.red,C.blue,C.grn,C.yel,C.bot,C.red,C.grn])})+txt(94,40,"×20",14,C.red)+P("M30 22 l-6 -4 M66 20 l6 -4",C.grey,1.4),
        bg(1)+kid(98,82,1.1,C.blue,"wow")+mag(84,42,.8)+clock(102,16,.75,1)+[[16,78,C.red,20],[30,80,C.blue,-12],[66,79,C.grn,30],[76,81,C.yel,-6],[60,72,C.bot,10]].map(r=>`<rect x="${r[0]-10}" y="${r[1]-3}" width="20" height="5.4" rx="1.5" fill="${r[2]}" stroke="${C.ink}" stroke-width=".8" transform="rotate(${r[3]} ${r[0]} ${r[1]})"/>`).join("")+B(44,.85,{arms:"up",mood:"dizzy"}),
        bg(2)+[[74,36,C.blue,"1"],[92,46,C.grn,"2"],[110,40,C.yel,"3"]].map(t=>R(t[0]-7,80-t[1],14,t[1],t[2],2)+txt(t[0],80-t[1]+10,t[3],9,"#fff")).join("")+ok(92,22,.9)+B(34,.9,{arms:"point",mood:"happy"}) ],
    l:[["список из двадцати","a list of twenty"],["за минуту видно","spotted in a minute"],["три — но глубоко","three, but deep"]],
    c:["Лучше знать три инструмента до дна, чем двадцать по названию. Поверхностное видно сразу.","Better to know three tools deeply than twenty by name. Shallow knowledge shows at once."] };

  /* ===== Отладка ===== */
  const trace=(hl)=>R(66,8,48,72,"#fff",3)+[0,1,2,3,4,5,6].map(i=>{ const y=13+i*9.5, col=hl==="top"&&i===0?C.red:hl==="bot"&&i===6?C.blue:hl==="mid"&&i===5?C.grn:C.grey;
    return L(70,y-1.7,i===0?40:i===6?30:36-(i%3)*5,col,4)+(col!==C.grey?`<rect x="67.5" y="${y-5}" width="45" height="10" rx="3" fill="none" stroke="${col}" stroke-width="1.8"/>`:""); }).join("");
  Z["Отладка|Стектрейс читают снизу вверх и сверху вниз"]={
    p:[ bg(0)+trace("top")+no(58,12,.7)+B(30,.9,{arms:"point",mood:"wow"})+curve(55,58,66,15,C.red,true),
        bg(1)+trace("bot")+B(30,.9,{arms:"point",mood:"think"})+P("M55 60 Q62 72 66 72",C.blue,1.8,"none",true)+txt(52,34,"main",8,C.blue),
        bg(2)+trace("mid")+B(44,1.05,{arms:"reach",mood:"happy",item:mag(0,0,1)})+txt(30,24,"my.app",8,C.grn)+ok(16,40,.8) ],
    l:[["сверху — где упало","top: where it crashed"],["снизу — откуда пришло","bottom: where it began"],["первая своя строка","your first own line"]],
    c:["Чужие строки библиотек пропускаю. Ищу первую строку моего кода — причина обычно там.","I skip library lines and look for the first line of my own code. The cause is usually there."] };

  Z["Отладка|Caused by — вот настоящая причина"]={
    p:[ bg(0)+B(40,.95,{arms:"carry",mood:"sweat",item:gift(30,22,C.red)})+txt(88,40,"?",18,C.blue)+txt(88,64,"Ex",9,C.red),
        bg(1)+[[70,78,C.red,20],[84,80,C.red,-15],[100,77,C.blue,35],[64,72,C.red,-30]].map(r=>`<rect x="${r[0]-6}" y="${r[1]-3}" width="12" height="6" rx="1" fill="${r[2]}" stroke="${C.ink}" stroke-width=".8" transform="rotate(${r[3]} ${r[0]} ${r[1]})"/>`).join("")
          +B(40,.95,{arms:"reach",mood:"think",item:gift(18,14,C.blue)})+txt(96,40,"Caused by",7,C.ink)+P("M84 46 q6 8 0 14",C.grey,1.4),
        bg(2)+B(38,.95,{arms:"reach",mood:"wow",item:R(-8,-6,16,12,C.wood,1.5,C.wood2)})+bug(76,40,1)+spark(96,26,C.red)+txt(90,66,"Caused by",7,C.red)+P("M64 58 q4 -8 8 -10",C.ink,1.2) ],
    l:[["цепочка обёрток","a chain of wrappers"],["снимаю обёртки","unwrapping the layers"],["нижняя — причина","the lowest is the cause"]],
    c:["Ошибку по дороге наверх заворачивали в обёртки. Настоящая — в самом нижнем Caused by.","The error got wrapped on its way up. The real one is in the lowest Caused by."] };

  Z["Отладка|Сначала воспроизведи"]={
    p:[ bg(0)+bug(90,34,1,.3)+txt(104,60,"?",14,C.blue)+txt(76,58,"?",10,C.blue)+B(36,.9,{arms:"reach",mood:"sweat",item:net}),
        bg(1)+R(48,50,22,30,"#8fa3c9",3)+`<circle cx="48" cy="62" r="5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/>`+[78,94,110].map((x,i)=>bug(x,30,.55)+txt(x,48,String(i+1),8)).join("")+B(22,.85,{arms:"push",mood:"wow"}),
        bg(2)+B(40,1,{arms:"hold",mood:"happy",item:R(-9,-11,18,20,"#e8f4ff",3)+R(-10,-14,20,4,C.grey,1)+bug(0,0,.55)})+ok(88,34,1.2)+spark(104,58) ],
    l:[["«иногда падает»","\"fails sometimes\""],["по команде — каждый раз","on cue, every time"],["пойман — можно чинить","caught — now fix it"]],
    c:["Пока не умею вызвать баг по команде, я только гадаю. Повторил — значит, поймал.","Until I can trigger the bug on cue, I'm just guessing. Once I can repeat it, I've got it."] };

  const wire=(grey1,grey2,on)=>P("M6 26 H103",C.ink,2.4)+bulb(110,24,!!on,6)+(grey1?P(`M6 26 H${grey1}`,"#c9ced8",2.6):"")+(grey2?P(`M${grey2} 26 H103`,"#c9ced8",2.6):"");
  const probe2=`<path d="M0 2 L16 -46" stroke="${C.ink}" stroke-width="2.4" stroke-linecap="round"/><circle cx="16.3" cy="-47" r="2.4" fill="${C.red}"/>`;
  Z["Отладка|Метод половинного деления"]={
    p:[ bg(0)+wire()+txt(60,16,"?",11,C.blue)+B(28,.8,{arms:"reach",mood:"think",item:probe2}),
        bg(1)+wire(60)+ok(30,14,.65)+txt(84,18,"?",11,C.red)+B(40,.85,{arms:"point",mood:"smile"}),
        bg(2)+wire(60)+txt(74,18,"?",10,C.red)+ok(100,14,.6)+B(56,.8,{arms:"reach",mood:"think",item:probe2}),
        bg(3)+wire(60,90,true)+R(72,22,10,8,C.yel,1.5)+spark(77,14,C.red)+txt(24,46,"20",13,C.blue)+B(56,.9,{arms:"up",mood:"happy"}) ],
    l:[["проверь середину","check the middle"],["половину — долой","drop one half"],["и снова пополам","halve it again"],["нашёл за 20 шагов","found in 20 steps"]],
    c:["Не читаю всё подряд: смотрю середину и отбрасываю половину. Двадцать шагов — и баг найден.","I don't read it all: I check the middle and drop a half. Twenty steps and the bug is found."] };

  Z["Отладка|Как подступиться к чужому проекту"]={
    p:[ bg(0)+[[70,70,-12],[88,66,10],[104,72,-4],[80,52,20],[98,48,-15],[90,30,6],[110,30,25],[72,34,-20]].map(r=>card(r[0],r[1],14,18,"#fff",L(-4,-4,8)+L(-4,1,6),r[2])).join("")+B(34,.9,{arms:"hold",mood:"dizzy",item:card(0,0,14,18,"#fff",L(-4,-4,8)+L(-4,1,6))}),
        bg(1)+door(90,null,C.grn)+txt(90,26,"main()",9,C.ink)+spark(108,20)+B(40,.9,{arms:"point",mood:"wow"}),
        bg(2)+P("M14 80 C 40 66, 70 88, 100 74",C.ink,1.6,"none",true)+R(6,52,14,28,C.grn,2)+db(104,62,.8)+gear(36,24,.6)+server(78,30,.5)+B(58,.9,{arms:"hold",legs:"run",mood:"happy",item:env(0,0,.6)}) ],
    l:[["файлов — гора","a mountain of files"],["нашёл точку входа","found the entry point"],["один путь до базы","one path down to the DB"]],
    c:["Я не читаю файлы по алфавиту. Иду по одному запросу от входа до базы — и всё складывается.","I don't read files A to Z. I follow one request from the entry to the DB, and it clicks."] };

  /* ===== Оценка и решения ===== */
  Z["Оценка и решения|Почему оценки всегда врут"]={
    p:[ bg(0)+B(36,.9,{arms:"hold",mood:"smile",item:laptop(0,10,.6,txt(0,-10,"&lt;/&gt;",8,C.blue))})+think(70,26,txt(11,3,"2",12,C.grn))+days(64,58,2,()=> "#e3f6e5"),
        bg(1)+B(40,.8,{arms:"carry",mood:"sweat",item:box(0,2,26,13,"✓")+box(0,-11,26,13,"▶")+box(0,-24,26,13,"?")})+mag(88,52,1)+txt(96,26,"+",16,C.red),
        bg(2)+days(8,10,5,i=>i<2?"#e3f6e5":"#fff1c2")+server(98,58,.9)+ok(98,26,.7)+B(40,.9,{arms:"point",mood:"think"}) ],
    l:[["думаю: код — 2 дня","I think: code — 2 days"],["а ещё ревью, тесты, выкат","+ review, tests, deploy"],["до прода — 5 дней","to prod — 5 days"]],
    c:["Я считал только «написать код». А до прода ещё ревью, тесты, выкат и сюрпризы.","I counted only writing code. Getting to prod also takes review, tests, deploy and surprises."] };

  Z["Оценка и решения|Декомпозиция важнее точности"]={
    p:[ bg(0)+box(80,80,46,50,"?")+B(30,.9,{arms:"push",mood:"sweat"})+txt(80,22,"30?",10,C.red),
        bg(1)+[0,1,2,3].map(i=>box(73+i*12.5,80,11,40,"1")).join("")+B(26,.9,{arms:"reach",mood:"think",item:saw}),
        bg(2)+box(68,80,13,13,"")+ok(68,72,.55)+box(84,80,13,13,"")+ok(84,72,.55)+box(100,80,13,13,"!")+spark(100,56,C.red)+B(34,.9,{arms:"carry",mood:"happy",item:box(0,2,18,16,"1")}) ],
    l:[["большая — не оценить","too big to estimate"],["режем на куски","cut into pieces"],["видно ход и засады","see progress and traps"]],
    c:["Большую задачу одним числом не оценить. Режу на куски по дню — и вижу, где засада.","A big task can't get one number. I cut it into day-sized bits and spot the traps early."] };

  Z["Оценка и решения|Называй диапазон и риски"]={
    p:[ bg(0)+days(44,8,5,i=>i===3?"#ffd5d5":"#fff")+P("M91 10 l9 9 M100 10 l-9 9",C.red,2)+kid(98,82,1.05,C.blue,"sad")+B(36,.9,{arms:"hold",mood:"sad",item:sign("4",20)}),
        bg(1)+cloud(90,28,1.05)+txt(92,32,"API?",7,C.blue)+txt(92,58,"+2",13,C.red)+B(36,.9,{arms:"hold",mood:"think",item:sign("3–5",28)}),
        bg(2)+kid(96,82,1.1,C.grn,"smile")+ok(96,24,.8)+txt(66,30,"+2",10,C.red)+B(38,.9,{arms:"reach",mood:"happy",item:sign("3–5",28)}) ],
    l:[["точное число сорвалось","exact number — missed"],["диапазон и от чего зависит","range + what it depends on"],["бизнес спокоен","the business is fine"]],
    c:["Я говорю «три-пять дней, если API готов». Честный диапазон лучше сорванной точной даты.","I say \"3–5 days if the API is ready\". An honest range beats a missed exact date."] };

  Z["Оценка и решения|Сообщай о просрочке рано"]={
    p:[ bg(3)+days(30,8,5,i=>i===4?"#ffd5d5":"#fff")+kid(96,82,1.05,C.red,"sad")+B(46,.9,{arms:"hold",mood:"sad",item:phone(0,0,.55)}),
        bg(1)+days(30,8,5,i=>i===1?"#fff1c2":"#fff")+kid(98,82,1.05,C.blue,"wow")+bubble(62,32,18,txt(0,4,"!",11,C.red))+B(40,.9,{arms:"hold",legs:"run",mood:"sweat",item:phone(0,0,.55)}),
        bg(2)+days(30,6,5,()=> "#e3f6e5")+B(36,.8,{arms:"carry",mood:"happy",item:box(0,2,22,14,"✓")})+bot(86,82,.75,{arms:"carry",hat:"cap",mood:"smile",item:box(0,2,22,14,"")}) ],
    l:[["сказал в последний день","told on the last day"],["сказал на 2-й день","told on day 2"],["урезали, помогли — успели","scope cut, help — made it"]],
    c:["Сказал о задержке на второй день — всё можно поправить. В последний — уже поздно.","Say it on day two and it can still be fixed. Say it on the last day and it's too late."] };

  const post=(x,t,col)=>P(`M${x} 80 V44`,C.wood2,3)+R(x-14,24,28,22,col||"#fff",3)+txt(x,40,t,15,C.ink);
  Z["Оценка и решения|ADR: записывай, почему решили так"]={
    p:[ bg(0)+post(90,"B")+txt(110,24,"?",14,C.red)+clock(64,18,.75,9)+B(40,.9,{arms:"point",mood:"sweat"}),
        bg(1)+R(80,56,30,24,C.wood,3,C.wood2)+txt(95,72,"git",8,"#fff")+B(40,.9,{arms:"reach",mood:"think",item:card(0,0,20,24,"#fff",txt(0,-4,"A ✗",6,C.red)+txt(0,4,"B ✓",6,C.grn)+L(-6,7,12))})+P("M66 54 q10 -6 18 2",C.ink,1.3,"none",true),
        bg(2)+post(92,"B")+ok(108,22,.7)+bulb(60,22,true,6)+B(38,.9,{arms:"hold",mood:"happy",item:card(0,0,20,24,"#fff",txt(0,-4,"A ✗",6,C.red)+txt(0,4,"B ✓",6,C.grn)+L(-6,7,12))}) ],
    l:[["через год: почему B?","a year on: why B?"],["пишу полстраницы в репо","half a page in the repo"],["записка всё объяснила","the note explains it"]],
    c:["Я записываю, почему решили так. Через год это спасёт от споров и страха трогать код.","I write down why we chose this. A year later it saves us from arguments and fear of change."] };

  /* ===== Как устроен собес ===== */
  Z["Как устроен собес|Это не экзамен, а проверка совместимости"]={
    p:[ bg(0)+desk(10,62,62)+kid(96,82,1.1,C.grey,"sad")+txt(96,24,"100?",9,C.red)+B(36,.85,{arms:"hold",mood:"sweat",item:card(0,0,16,20,"#fff",txt(0,3,"?",9,C.red))}),
        bg(1)+kid(98,82,1.1,C.blue,"smile")+think(54,14,txt(11,3,"? → ",8,C.ink)+G(24,-2,.4,mag(0,0,1)))+B(36,.9,{arms:"reach",mood:"think",item:book(C.blue)}),
        bg(2)+gear(62,36,1.05,C.yel)+gear(80,52,.8,C.grey)+kid(102,82,1.05,C.grn,"smile")+B(32,.9,{arms:"reach",mood:"happy",item:gear(0,0,.5,C.blue)}) ],
    l:[["думал: экзамен","thought: an exam"],["«не знаю, но выяснил бы»","\"don't know, but I'd…\""],["с ним не страшно","safe to work with"]],
    c:["Ищут не самого умного, а того, кому можно доверить кусок системы.","They want not the smartest one, but someone they can trust with part of the system."] };

  Z["Как устроен собес|Обычно четыре этапа"]={
    p:[ bg(0)+door(98,"1")+kid(78,82,.95,C.red,"smile")+bubble(78,14,22,txt(0,4,"$ ?",8))+B(34,.85,{arms:"hold",mood:"smile",item:card(0,0,16,20,"#fff",L(-5,-5,10)+L(-5,0,8)+L(-5,5,10))}),
        bg(1)+door(104,"2")+board(52,12,40,30)+txt(72,26,"int",9,C.blue)+txt(72,37,"SQL",8,C.grn)+B(30,.85,{arms:"point",mood:"think"}),
        bg(2)+door(104,"3")+board(50,10,40,30)+R(56,16,12,8,C.blue,1.5)+R(74,16,12,8,C.grn,1.5)+R(65,28,12,8,C.yel,1.5)+B(30,.85,{arms:"hold",mood:"sweat",item:laptop(0,10,.55,txt(0,-10,"&lt;/&gt;",8,C.blue))}),
        bg(3)+door(104,"4")+kid(84,82,1,C.grn,"smile")+heart(62,26,1)+B(40,.9,{arms:"reach",mood:"happy"}) ],
    l:[["скрининг: опыт, деньги","screen: past and pay"],["техника: язык, база","tech: language, DB"],["дизайн или лайвкодинг","design or live coding"],["менеджер: команда","manager: team"]],
    c:["Четыре двери подряд: рекрутер, техника, дизайн или код, менеджер. За каждой смотрят своё.","Four doors in a row: recruiter, tech, design or code, manager. Each checks something else."] };

  Z["Как устроен собес|Скрининг: отсекают по формальному"]={
    p:[ bg(0)+kid(98,82,1.1,C.red,"smile")+card(80,22,16,20,"#fff",L(-5,-5,10,C.blue)+L(-5,0,8)+L(-5,5,10))+mag(80,46,.7)+B(36,.9,{arms:"reach",mood:"smile",item:card(0,0,16,20,"#fff",L(-5,-5,10,C.blue)+L(-5,0,8)+L(-5,5,10))}),
        bg(1)+kid(98,82,1.1,C.red,"smile")+bubble(96,20,24,txt(0,4,"$ ?",9))+think(46,12,txt(11,3,"100",9,C.grn))+B(36,.9,{arms:"hold",mood:"think",item:coin(0,0,1.2)}),
        bg(2)+kid(98,82,1.1,C.red,"smile")+ok(98,20,.8)+clock(66,20,.85,2)+txt(66,40,"2 min",7,C.blue)+B(36,.9,{arms:"wave",mood:"happy"}) ],
    l:[["опыт против вакансии","experience vs the job"],["вопрос про деньги","the money question"],["о себе — за 2 минуты","about you in 2 minutes"]],
    c:["Рекрутер знаний не проверяет: сверяет опыт, деньги и адекватность. Как билет на входе.","The recruiter doesn't test knowledge: just experience, pay and sense. Like a ticket check."] };

  Z["Как устроен собес|Техническая секция: как отвечать"]={
    p:[ bg(0)+kid(98,82,1.1,C.blue,"sad")+bubble(66,20,30,L(-11,-5,22)+L(-11,0,18))+B(36,.9,{arms:"hold",mood:"sweat",item:book(C.red)}),
        bg(1)+board(36,8,48,22)+txt(60,23,"v = 1",10,C.blue)+B(24,.8,{arms:"point",mood:"smile"})+bot(96,82,.8,{flip:true,mood:"wow",hat:"cap",arms:"up"})+ok(60,44,.7),
        bg(2)+R(46,52,28,28,"#fff",3)+txt(60,72,"1",14,C.red)+txt(60,44,"≠ 2",9,C.red)+txt(26,26,"+1",9,C.blue)+txt(94,26,"+1",9,C.blue)+B(24,.8,{arms:"push",mood:"wow"})+bot(96,82,.8,{flip:true,arms:"push",hat:"cap",mood:"sweat"}) ],
    l:[["определение — мало","a definition won't do"],["видимость — да","visibility — yes"],["атомарность — нет","atomicity — no"]],
    c:["Не пересказываю учебник: объясняю, как это работает и когда ломается. Это уровень сеньора.","I don't recite the textbook: I explain how it works and when it breaks. That's senior level."] };

  Z["Как устроен собес|System Design: ждут процесс, а не схему"]={
    p:[ bg(0)+kid(96,82,1.1,C.red,"smile")+bubble(60,18,22,txt(0,4,"?",11,C.blue))+B(36,.9,{arms:"point",mood:"think"}),
        bg(1)+board(56,10,54,32)+txt(83,24,"1M/day",8,C.ink)+txt(83,36,"≈ 12/s",8,C.blue)+B(32,.9,{arms:"point",mood:"think"}),
        bg(2)+board(56,10,54,32)+txt(83,24,"GET /x",8,C.grn)+txt(83,36,"POST /x",8,C.blue)+B(32,.9,{arms:"point",mood:"smile"}),
        bg(3)+db(94,62,.9)+B(46,.85,{arms:"carry",mood:"smile",item:db(0,0,.7,C.grn)})+txt(94,30,"?",12,C.blue),
        bg(4)+server(76,58,.85)+server(100,58,.85)+spark(112,24)+B(32,.85,{arms:"push",mood:"happy",item:G(0,0,.55,server(0,0,1))}) ],
    l:[["уточни требования","clarify requirements"],["нагрузка в числах","load in numbers"],["набросай API","sketch the API"],["выбери хранилище","pick the storage"],["узкие места и рост","bottlenecks and scale"]],
    c:["Сначала спрашиваю и считаю, потом рисую квадратики. Наоборот — красиво, но мимо.","First I ask and count, then I draw boxes. The other way round looks nice but misses."] };

  Z["Как устроен собес|Лайвкодинг: говори вслух"]={
    p:[ bg(0)+kid(98,82,1.1,C.blue,"sad")+think(80,16,txt(11,3,"?",11,C.red))+B(40,.9,{arms:"hold",mood:"think",item:laptop(0,10,.6,txt(0,-10,"...",8))}),
        bg(1)+kid(98,82,1.1,C.blue,"wow")+bubble(56,18,42,txt(0,4,"1 → 2 → 3",8,C.blue))+B(36,.9,{arms:"hold",mood:"smile",item:laptop(0,10,.6,txt(0,-10,"&lt;/&gt;",8,C.blue))}),
        bg(2)+kid(100,82,1.05,C.blue,"smile")+ok(100,22,.8)+board(42,10,40,32)+txt(62,22,"1 ✓",8,C.grn)+txt(62,30,"2 ✓",8,C.grn)+txt(62,38,"3 ✓",8,C.grn)+B(26,.85,{arms:"point",mood:"happy"}) ],
    l:[["молча — непонятно","silent — unclear"],["думаю вслух","thinking out loud"],["видно ход мысли","your reasoning shows"]],
    c:["Я проговариваю, что понял и почему так решаю. Им важен мой ход мысли, а не скорость.","I say what I understood and why I solve it this way. They care about my thinking, not speed."] };

  Z["Как устроен собес|Вопросы задавай ты"]={
    p:[ bg(0)+kid(98,82,1.1,C.red,"sad")+no(98,22,.8)+bubble(62,22,22,txt(0,4,"—",11))+B(38,.9,{arms:"hold",mood:"sad",item:card(0,0,16,20,"#fff","")}),
        bg(1)+kid(98,82,1.1,C.red,"wow")+bubble(66,16,40,G(-10,0,.45,gear(0,0,1))+txt(4,4,"?",9,C.blue)+G(14,0,.45,clock(0,0,1,3)))+B(36,.9,{arms:"hold",mood:"think",item:card(0,0,16,20,"#fff",txt(0,-3,"?",7,C.blue)+txt(0,6,"?",7,C.blue))}),
        bg(2)+house(94,36,30,C.wood)+R(88,58,12,22,C.wood2,1)+R(82,44,8,8,"#dfe9ff",1)+B(40,.95,{arms:"reach",mood:"happy",item:mag(0,0,1)}) ],
    l:[["«нет вопросов» — минус","\"no questions\" — bad"],["релизы, тесты, легаси?","releases, tests, legacy?"],["ты тоже выбираешь","you choose too"]],
    c:["Я тоже выбираю, где работать. Спрашиваю про релизы, тесты, легаси и кто принимает решения.","I'm choosing too. I ask about releases, tests, legacy and who makes the decisions."] };

  /* ===== На собесе ===== */
  Z["На собесе|Что происходит при запуске программы"]={
    p:[ bg(0)+R(70,46,40,34,"#8fa3c9",4)+txt(90,66,"javac",8,"#fff")+card(100,26,24,12,"#fff",txt(0,3.5,".class",7,C.blue))+B(28,.85,{arms:"reach",mood:"smile",item:card(0,0,24,12,"#fff",txt(0,3.5,".java",7,C.red))}),
        bg(1)+server(94,58,1)+txt(94,26,"JVM",9,C.blue)+R(58,56,12,24,"#8fa3c9",2)+`<circle cx="58" cy="63" r="4.5" fill="${C.grn}" stroke="${C.ink}"/>`+B(32,.85,{arms:"push",mood:"wow"}),
        bg(2)+card(84,42,30,20,"#fff",txt(0,3,".class",8,C.blue))+ok(104,26,.75)+B(40,1,{arms:"reach",mood:"think",item:mag(0,0,1)}),
        bg(3)+[56,76,96].map((x,i)=>`<ellipse cx="${x}" cy="76" rx="8" ry="3.5" fill="${C.grey}" stroke="${C.ink}"/>`+txt(x,66,String(i+1),9,C.blue)).join("")+B(34,.85,{legs:"run",arms:"down",mood:"smile"}),
        bg(4)+R(80,50,32,30,"#8fa3c9",4)+txt(96,70,"JIT",9,"#fff")+B(42,.85,{arms:"carry",mood:"sweat",item:box(0,2,20,14,"",C.red)+P("M-6 -8 q-2 -6 2 -9 M2 -8 q-2 -6 2 -9",C.yel,2)}),
        bg(0)+laptop(92,66,1.1,txt(0,-9,"42",11,C.grn))+chip(22,28,"")+B(52,.85,{arms:"point",mood:"happy"}) ],
    l:[["javac: байткод","javac: bytecode"],["java поднимает JVM","java starts the JVM"],["загрузчик проверил класс","loader checks the class"],["интерпретатор шагает","interpreter steps"],["горячее — в JIT","hot code goes to JIT"],["CPU и ОС — вывод","CPU and OS — output"]],
    c:["За словом «запустил» прячутся шесть этажей: от javac до вывода на экран.","Behind \"I ran it\" hide six floors: from javac all the way to the screen."] };

  Z["На собесе|Почему equals без hashCode ломает HashMap"]={
    p:[ bg(0)+bucket(74,"3")+bucket(104,"7")+curve(54,60,74,52,C.blue,true)+B(30,.85,{arms:"reach",mood:"smile",item:ball(0,0,"A",C.blue,7)}),
        bg(1)+bucket(18,"3",ball(18,54,"A",C.blue,6))+bucket(104,"7")+txt(104,46,"?",12,C.red)+B(62,.85,{arms:"reach",mood:"sweat",item:mag(0,0,.9)}),
        bg(2)+bucket(92,"3",ball(86,54,"A",C.blue,6)+ball(98,54,"A",C.grn,6))+txt(92,38,"=",14,C.grn)+ok(110,24,.75)+B(36,.9,{arms:"point",mood:"happy"}) ],
    l:[["кладу в корзину по хешу","put in bucket by hash"],["хеш другой — корзина пуста","other hash — empty bucket"],["хеш равный — нашёл","same hash — found"]],
    c:["Я ищу в два шага: сначала корзину по хешу, потом equals. Другой хеш — не та корзина.","I search in two steps: bucket by hash, then equals. A different hash means the wrong bucket."] };

  Z["На собесе|Чем отличается процесс от потока"]={
    p:[ bg(0)+house(30,46,22,"#f2d3a8")+house(90,46,22,"#cfe2f7")+P("M60 80 V60",C.wood2,3)+B(30,.75,{arms:"hold",mood:"smile",item:box(0,6,14,12,"1")})+bot(90,82,.75,{arms:"hold",hat:"cap",mood:"smile",item:box(0,6,14,12,"2")}),
        bg(1)+R(6,16,108,64,"#f6efe2",4,C.wood2)+desk(46,74,56)+box(60,56,14,12,"x")+B(28,.8,{arms:"reach",mood:"angry"})+bot(92,82,.8,{flip:true,arms:"reach",hat:"cap",mood:"angry"}),
        bg(2)+R(6,16,108,64,"#f6efe2",4,C.wood2)+desk(46,74,56)+box(60,56,14,12,"x")+lock(60,30,.8)+B(28,.8,{arms:"reach",mood:"happy",item:key(0,0,.7)})+bot(94,82,.8,{flip:true,hat:"cap",mood:"think"}) ],
    l:[["процесс — свой дом","process — own house"],["потоки — одна квартира","threads — one flat"],["общее — нужен замок","shared needs a lock"]],
    c:["Процесс живёт в своей квартире, потоки — в комнатах одной. Дешевле, но надо договариваться.","A process has its own flat, threads share rooms in one. Cheaper, but they must take turns."] };

  Z["На собесе|Как отвечать, когда не знаешь"]={
    p:[ bg(0)+kid(98,82,1.1,C.blue,"sad")+no(98,22,.8)+bubble(56,18,36,txt(0,4,"!!! #?",8,C.red))+B(38,.9,{arms:"wave",mood:"happy"}),
        bg(1)+`<circle cx="84" cy="42" r="24" fill="#fff" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="4 3"/><circle cx="84" cy="42" r="13" fill="#d9f2dc" stroke="${C.grn}" stroke-width="1.6"/>`+ok(84,42,.8)+txt(112,18,"?",12,C.red)+B(32,.9,{arms:"point",mood:"think"}),
        bg(2)+kid(100,82,1.05,C.blue,"smile")+ok(100,22,.8)+R(60,62,22,16,C.blue,1.5)+B(36,.9,{arms:"reach",mood:"happy",item:mag(0,0,.9)}) ],
    l:[["уверенная ерунда","confident nonsense"],["что знаю и где граница","what I know, where it ends"],["как бы выяснял","how I'd find out"]],
    c:["Не выдумываю. Говорю, что знаю, где граница и как бы выяснил. Это ценят больше.","I don't make things up. I say what I know, where it ends and how I'd find out."] };

  /* ===== Резюме и оффер ===== */
  const resume=(rows)=>card(0,0,18,24,"#fff",(rows||[[10,C.blue],[8],[10],[7]]).map((r,i)=>L(-6,-8+i*5,r[0],r[1])).join(""));
  Z["Резюме и оффер|Резюме читают 20 секунд"]={
    p:[ bg(0)+kid(98,82,1.1,C.red,"smile")+clock(98,16,.75,4)+txt(78,18,"20",9,C.red)+card(76,50,14,18,"#fff",L(-4,-4,8),-25)+card(80,40,14,18,"#fff",L(-4,-4,8),15)+B(36,.9,{arms:"hold",mood:"sweat",item:resume()}),
        bg(1)+R(84,56,22,24,C.grey,3)+card(94,44,16,20,"#fff",txt(0,-3,"Java",4.5)+txt(0,3,"SQL",4.5)+txt(0,9,"k8s",4.5),20)+B(40,.9,{arms:"reach",mood:"sad",item:card(0,0,16,20,"#fff",txt(0,-3,"Java",4.5)+txt(0,3,"SQL",4.5)+txt(0,9,"k8s",4.5))}),
        bg(2)+kid(100,82,1.1,C.red,"wow")+spark(100,20)+B(32,.95,{arms:"reach",mood:"happy",item:card(0,0,30,14,"#fff",txt(0,4,"40→3 s",8,C.grn))}) ],
    l:[["20 секунд на резюме","20 seconds per resume"],["список — мимо","a list — skipped"],["результат в числах","results in numbers"]],
    c:["«Ускорил с 40 до 3 секунд» скажет больше, чем список из десяти технологий.","\"Cut 40 seconds to 3\" says more than a list of ten technologies."] };

  Z["Резюме и оффер|Под каждую вакансию — своя версия"]={
    p:[ bg(0)+[66,86,106].map(x=>R(x-8,40,16,40,C.wood,2,C.wood2)+no(x,30,.55)).join("")+B(32,.85,{arms:"hold",mood:"sad",item:card(0,0,18,22,"#fff",L(-6,-6,12)+L(-6,0,10)+L(-6,6,12))}),
        bg(1)+R(70,12,40,58,"#fff",3)+L(74,20,30,C.grey)+L(74,30,26,C.grey)+L(74,40,30,C.grey)+txt(90,58,"Kafka",7,"#c9ced8")+P("M108 56 C 118 40, 118 22, 106 18",C.red,1.6,"none",true)+B(34,.9,{arms:"reach",mood:"think",item:card(0,0,26,10,C.yel,txt(0,3,"Kafka",7))}),
        bg(2)+door(100,null)+card(100,24,26,10,C.yel,txt(0,3,"Kafka",7))+ok(100,44,.7)+B(46,.95,{arms:"hold",mood:"happy",item:card(0,0,20,24,"#fff",`<rect x="-8" y="-10" width="16" height="6" rx="1.5" fill="${C.yel}"/>`+L(-6,-1,12)+L(-6,5,10))}) ],
    l:[["одно на всех — мимо","one for all — misses"],["нужное — наверх","the key stuff on top"],["совпало — позвали","it matches — invited"]],
    c:["Факты те же, но под вакансию с Kafka я ставлю Kafka в первые строчки.","Same facts, but for a Kafka job I put Kafka in the first lines."] };

  Z["Резюме и оффер|Про зарплату: называй вилку и первым не всегда"]={
    p:[ bg(0)+kid(98,82,1.1,C.red,"smile")+coin(98,18,1.1)+txt(70,28,"↑",14,C.grey)+no(76,40,.6)+B(36,.9,{arms:"hold",mood:"sad",item:sign("80",22)}),
        bg(1)+kid(100,82,1.1,C.red,"smile")+bubble(96,18,40,txt(0,4,"100–130",8,C.blue))+B(36,.9,{arms:"reach",mood:"think",item:mag(0,0,.9)}),
        bg(2)+kid(100,82,1.1,C.red,"wow")+ok(100,22,.8)+B(38,.95,{arms:"hold",mood:"happy",item:sign("120",26)}) ],
    l:[["занизил — не поднять","too low — can't raise"],["сперва узнал бюджет","first learn the budget"],["число, за которое пойду","a number I'd really take"]],
    c:["Цену называют один раз: скинуть можно, поднять — нет. Называю ту, за которую реально пойду.","You name a price once: you can drop it, not raise it. I name the one I'd really accept."] };

  Z["Резюме и оффер|Оффер — это не только оклад"]={
    p:[ bg(0)+txt(92,40,"+20%",14,C.grn)+spark(102,18)+B(40,.9,{arms:"carry",mood:"wow",item:coin(0,0,2)}),
        bg(4)+moon(102,16)+clock(78,18,.75,11)+bot(98,82,.8,{flip:true,arms:"point",hat:"cap",mood:"angry"})+B(40,.9,{arms:"hold",mood:"sweat",item:laptop(0,10,.6,"")}),
        bg(2)+balance(74,-6,coin(0,0,.8),clock(-4,0,.5,11)+heart(5,1,.55))+B(22,.85,{arms:"point",mood:"think"}) ],
    l:[["+20% к окладу","+20% salary"],["переработки и ругань","overtime and yelling"],["смотрю всё целиком","weigh the whole deal"]],
    c:["Плюс двадцать процентов не окупят токсичную команду и вечные переработки. Смотрю целиком.","Plus twenty percent won't pay for a toxic team and endless overtime. I weigh the whole deal."] };

  Z["Резюме и оффер|Отказ — это статистика, а не приговор"]={
    p:[ bg(3)+env(84,40,1.4)+no(96,30,.8)+B(40,.9,{arms:"hold",mood:"sad",item:env(0,0,.7)}),
        bg(1)+P("M8 8 Q60 18 112 8",C.ink,1.2)+[22,40,58,76,94].map((x,i)=>env(x,16,.5)+(i<4?no(x+5,21,.4):ok(x+5,21,.45))).join("")+B(30,.9,{arms:"point",mood:"think"})+txt(90,62,"5–10",10,C.blue),
        bg(2)+spark(84,22)+ok(92,40,1)+B(42,.95,{arms:"hold",mood:"happy",item:env(0,0,.7,"#e3f6e5")})+bubble(82,64,24,txt(0,4,"?",10,C.blue)) ],
    l:[["отказ — бывает","a no happens"],["5–10 собесов на оффер","5–10 talks per offer"],["спросил отзыв — дальше","asked why — moved on"]],
    c:["Отказ — не приговор, а обычная арифметика. Спрошу, что улучшить, и пойду дальше.","A no isn't a verdict, just arithmetic. I ask what to improve and move on."] };

  /* ===== Итог ===== */
  Z["Итог|Полная цепочка от буквы до экрана"]={
    p:[ bg(0)+txt(86,40,"A",22,C.red)+B(40,.9,{arms:"hold",mood:"smile",item:laptop(0,10,.6,txt(0,-9,"A",9,C.red))}),
        bg(1)+gear(86,46,1.1)+card(106,24,18,10,"#fff",txt(0,3,"0110",5.5))+B(34,.85,{arms:"reach",mood:"think",item:card(0,0,16,10,"#fff",txt(0,3,"A",7,C.red))}),
        bg(2)+server(96,58,.9)+txt(96,28,"JVM",8,C.blue)+B(46,.85,{arms:"carry",mood:"smile",item:card(0,0,26,12,"#fff",txt(0,3.5,"0110",8))}),
        bg(3)+chip(88,40,"")+B(36,.85,{arms:"reach",mood:"wow",item:sw(0,0,true,.6)})+[[104,70],[112,62]].map(p=>spark(p[0],p[1])).join(""),
        bg(4)+R(76,22,36,28,"#3b4256",3)+R(80,26,28,20,"#dfe9ff",1)+P("M94 50 v8 M84 58 h20",C.ink,2)+B(36,.85,{arms:"push",mood:"smile",item:card(0,0,16,12,"#fff",txt(0,3,"A",7,C.red))}),
        bg(0)+R(56,14,58,44,"#3b4256",4)+R(60,18,50,36,"#1f2333",1)+[0,1,2,3,4].map(r=>[0,1,2,3,4,5,6,7].map(c=>{ const on=[[0,1,1,1,1,1,0,0],[1,1,0,0,0,1,1,0],[1,1,1,1,1,1,1,0],[1,1,0,0,0,1,1,0],[1,1,0,0,0,1,1,0]][r][c]; return `<rect x="${65+c*5}" y="${21+r*6}" width="4.2" height="5" fill="${on?C.yel:"#2c3245"}"/>`; }).join("")).join("")+B(30,.9,{arms:"up",mood:"wow"}) ],
    l:[["ты пишешь текст","you type the text"],["компилятор: байткод","compiler: bytecode"],["JVM: машинный код","JVM: machine code"],["процессор щёлкает","the CPU switches"],["ОС отдаёт на экран","the OS sends it out"],["пиксели загорелись","pixels light up"]],
    c:["Ты пишешь наверху, а под тобой пять этажей. Когда тормозит — спускаешься и смотришь.","You write at the top, five floors below do the work. When it lags, you go down and look."] };

  Z["Итог|Зачем это всё знать"]={
    p:[ bg(0)+[[76,78,"GC",C.red,15],[96,80,"SQL",C.blue,-8],[86,66,"CPU",C.grn,25],[104,64,"TCP",C.bot,-20]].map(r=>card(r[0],r[1]-6,18,10,r[3],txt(0,3,r[2],6,"#fff"),r[4])).join("")+B(40,.85,{arms:"carry",mood:"dizzy",item:[0,1,2].map(i=>card((i-1)*3,-i*9,20,10,[C.yel,C.red,C.blue][i],txt(0,3,["GC","cache","JIT"][i],6,"#fff"),(i-1)*12)).join("")}),
        bg(1)+brick(84,80,56,"CPU",C.grey)+brick(84,71,56,"RAM",C.bot)+brick(84,62,40,"OS",C.grn)+B(30,.85,{arms:"carry",mood:"think",item:R(-14,-5,28,10,C.yel,1.5)+txt(0,2.5,"JVM",7,"#fff")}),
        bg(2)+brick(78,80,56,"CPU",C.grey)+brick(78,71,56,"RAM",C.bot)+brick(78,62,46,"OS",C.grn)+brick(78,53,36,"JVM",C.yel)+card(68,34,18,10,C.red,txt(0,3,"GC",6,"#fff"))+card(90,34,22,10,C.blue,txt(0,3,"cache",6,"#fff"))+bulb(110,16,true,5)+B(26,.85,{arms:"point",mood:"happy"}) ],
    l:[["зубрить правила","cramming rules"],["всё стоит на фундаменте","all sits on the base"],["понял — выводишь сам","get it — derive the rest"]],
    c:["Сборщик мусора, потоки, кэш — следствия фундамента. Поймёшь основу — остальное выведешь.","GC, threads and caches all follow from the basics. Grasp them and you'll derive the rest."] };

  /* ===== AI: нейрон и обучение ===== */
  Z["AI: нейрон и обучение|Модель — это функция с настраиваемыми числами"]={
    p:[ bg(0)+mach(84,0,0,"?",C.grey)+P("M66 50 h-6",C.ink,2)+B(32,.85,{arms:"reach",mood:"smile",item:ball(0,0,"3",C.blue,7,8)}),
        bg(1)+mach(84,40,-30,"5",C.red)+P("M102 22 V40",C.ink,1.4)+`<path d="M102 22 h10 l-3 4 l3 4 h-10 z" fill="${C.grn}"/>`+txt(108,47,"9",8,C.grn)+B(42,.9,{arms:"reach",mood:"sweat"}),
        bg(2)+mach(84,120,60,"9",C.grn)+ok(108,30,.8)+B(42,.9,{arms:"up",mood:"happy"}) ],
    l:[["число на входе","a number goes in"],["крутим ручки — мимо","turn knobs — still off"],["подобрали — верно","tuned — it's right"]],
    c:["Модель — пульт с ручками-числами. Учить — значит крутить их, пока выход не станет верным.","A model is a panel of number knobs. Training means turning them until the output is right."] };

  Z["AI: нейрон и обучение|Нейрон: взвешенная сумма и порог"]={
    p:[ bg(0)+card(86,28,44,14,"#fff",txt(0,4,"1 × 0.8",8,C.blue))+card(86,52,44,14,"#fff",txt(0,4,"0.5 × −0.2",7,C.red))+B(34,.9,{arms:"point",mood:"think"}),
        bg(1)+R(74,46,32,34,"#e8f4ff",5)+txt(90,66,"0.8",10,C.grn)+txt(80,26,"0.8 − 0.1 + 0.1",7,C.ink)+B(40,.9,{arms:"reach",mood:"smile",item:ball(0,0,"+",C.yel,6,9)}),
        bg(2)+R(70,40,12,40,C.grey,2)+P("M84 46 h26",C.grn,2.4)+ball(102,38,"0.8",C.grn,8,6)+P("M84 70 h26",C.red,2.4)+ball(102,62,"0",C.grey,7,8)+txt(60,60,"−3",9,C.red)+B(32,.85,{arms:"push",mood:"happy"}) ],
    l:[["вход × вес","input × weight"],["сложить и сдвиг","sum plus bias"],["минус — в ноль","negatives become 0"]],
    c:["Нейрон — это умножить, сложить и отрезать минус. Никакого мозга, просто арифметика.","A neuron just multiplies, adds and cuts off negatives. No brain, just arithmetic."] };

  const dots=(cx,cy)=>[[0,0],[5,-5],[-5,4],[4,5],[-4,-5]].map(d=>`<circle cx="${cx+d[0]}" cy="${cy+d[1]}" r="2.6" fill="${C.grn}"/>`).join("")+[0,45,90,135,180,225,270,315].map(a=>`<circle cx="${(cx+18*Math.cos(a*Math.PI/180)).toFixed(1)}" cy="${(cy+18*Math.sin(a*Math.PI/180)).toFixed(1)}" r="2.6" fill="${C.red}"/>`).join("");
  Z["AI: нейрон и обучение|Слои: почему сеть глубокая"]={
    p:[ bg(0)+dots(88,40)+P("M60 66 L116 14",C.ink,2,"none",true)+no(108,72,.6)+B(30,.85,{arms:"reach",mood:"sad",item:P("M0 0 L18 -16",C.wood2,3)}),
        bg(1)+belt(64)+[16,44].map(x=>R(x-3,57,6,7,C.yel,1)).join("")+R(70,54,14,10,C.grn,1.5)+box(104,64,14,14,"",C.blue)+bot(32,64,.8,{arms:"hold",mood:"think",item:R(-4,-3,8,6,C.yel,1)})+bot(88,64,.75,{arms:"hold",hat:"helmet",mood:"smile",item:R(-6,-4,12,8,C.grn,1.5)}),
        bg(2)+dots(88,42)+`<path d="M88 30 C 100 30 102 52 88 54 C 74 54 74 30 88 30 Z" fill="none" stroke="${C.blue}" stroke-width="2.2"/>`+ok(110,18,.6)+B(34,.9,{arms:"point",mood:"happy"}) ],
    l:[["один — прямая граница","one: a straight line"],["слои друг за другом","layers one after another"],["граница гнётся","the boundary bends"]],
    c:["Каждый слой собирает из простого сложное, как участок конвейера. Глубина — число слоёв.","Each layer builds complex from simple, like stations on a line. Depth is how many layers."] };

  const hill=`<path d="M1 52 C 30 52, 50 78, 80 80 S 112 78, 119 72 V89 H1 Z" fill="#cdbfa6" opacity=".75"/>`;
  const fog=`<rect x="1" y="1" width="118" height="88" rx="10" fill="#fff" opacity=".45"/>`;
  Z["AI: нейрон и обучение|Обучение: ошибка и шаг в сторону, где она меньше"]={
    p:[ bg(0)+ball(76,30,"5",C.red,9,9)+`<path d="M98 20 V60" stroke="${C.ink}" stroke-width="1.4"/><path d="M98 20 h12 l-3 4 l3 4 h-12 z" fill="${C.grn}"/>`+txt(104,72,"2",10,C.grn)+P("M86 30 h8",C.red,1.6,"none",true)+txt(88,46,"3",10,C.red)+B(36,.9,{arms:"point",mood:"sweat"}),
        bg(1)+fog+hill+bot(26,54,.75,{arms:"reach",mood:"think"})+P("M46 60 q6 2 9 8",C.ink,1.6,"none",true)+P("M52 66 l3 3 l1 -4",C.ink,1.6),
        bg(2)+hill+[[22,53],[34,57],[46,63],[56,69]].map(p=>`<ellipse cx="${p[0]}" cy="${p[1]}" rx="3" ry="1.4" fill="${C.ink}" opacity=".35"/>`).join("")+bot(70,78,.8,{legs:"run",mood:"smile"})+txt(96,22,"×10⁶",10,C.blue),
        bg(3)+hill+`<path d="M90 80 V56" stroke="${C.ink}" stroke-width="1.4"/><path d="M90 56 h12 l-3 4 l3 4 h-12 z" fill="${C.grn}"/>`+txt(100,48,"1.99",9,C.grn)+bot(68,80,.85,{arms:"up",mood:"happy"}) ],
    l:[["ошибка = разница","error = the gap"],["шаг вниз по уклону","step down the slope"],["и так миллионы раз","millions of times"],["50 шагов: 1.99","50 steps: 1.99"]],
    c:["Я щупаю уклон ошибки и делаю маленький шаг вниз. Миллионы повторов — вот и вся учёба.","I feel the slope of the error and step a little down. Millions of repeats — that's learning."] };

  const fc=(x,y,t,col,r)=>card(x,y,18,14,col||"#fff",txt(0,3.5,t,8,C.ink),r);
  Z["AI: нейрон и обучение|Зазубрил или понял: переобучение"]={
    p:[ bg(0)+fc(80,24,"1 ✓",null,-8)+fc(100,30,"2 ✓",null,8)+fc(90,48,"3 ✓",null,-4)+txt(92,72,"100%",10,C.grn)+B(36,.9,{arms:"hold",mood:"happy",item:fc(0,0,"1",null,0)}),
        bg(1)+fc(88,30,"4 ?","#fff1c2",6)+no(104,52,.8)+txt(88,72,"10%",10,C.red)+B(40,.9,{arms:"up",mood:"dizzy"}),
        bg(2)+safe(94)+fc(94,32,"4",null,-6)+B(42,.9,{arms:"reach",mood:"think",item:fc(0,0,"5",null,0)}) ],
    l:[["на знакомых — идеально","perfect on seen data"],["на новых — провал","fails on new data"],["часть данных — в сейф","some data goes in a safe"]],
    c:["Если на знакомых примерах ошибок всё меньше, а на отложенных больше — модель зубрит.","If errors drop on known examples but grow on held-out ones, the model is cramming."] };

  Z["AI: нейрон и обучение|Почему нужны видеокарты"]={
    p:[ bg(0)+R(62,18,30,30,"#fff",2)+[0,1,2].map(i=>P(`M62 ${28+i*10-10} h30`,C.grey,.8)+P(`M${72+i*10-10} 18 v30`,C.grey,.8)).join("")+txt(98,38,"×",12)+R(104,18,10,30,"#fff",2)+B(34,.9,{arms:"point",mood:"think"}),
        bg(1)+[0,1,2,3,4].map(i=>card(90,70-i*9,26,8,"#fff",txt(0,2.5,"a × b",5.5))).join("")+txt(90,20,"CPU",9,C.blue)+B(40,.9,{arms:"reach",mood:"sweat",glasses:true,item:card(0,0,20,8,"#fff",txt(0,2.5,"a × b",5.5))}),
        bg(2)+[0,1,2].map(r=>[0,1,2,3].map(c=>kid(64+c*14,38+r*20,.42,[C.red,C.blue,C.grn,C.yel][(r+c)%4],"smile")+txt(64+c*14,24+r*20,"×",5,C.ink)).join("")).join("")+txt(88,86,"GPU",8,C.grn)+B(28,.9,{arms:"up",mood:"wow"}) ],
    l:[["матрица × вектор","matrix × vector"],["CPU: по нескольку","CPU: a few at a time"],["GPU: тысячи сразу","GPU: thousands at once"]],
    c:["Слой — это тысячи одинаковых умножений. Видеокарта делает их разом, процессор — по очереди.","A layer is thousands of identical multiplications. A GPU does them all at once, a CPU in turn."] };

  /* ===== AI: слова в числа ===== */
  Z["AI: слова в числа|Токены: модель не видит слов"]={
    p:[ bg(0)+blk(66,62,44,C.grn,"512")+B(36,.9,{arms:"carry",mood:"smile",item:R(-20,-6,40,12,C.grn,2)})+P("M60 30 q10 -4 16 26",C.ink,1.2,"none",true),
        bg(1)+blk(70,62,14,C.blue,"17")+blk(86,62,18,C.red,"802")+blk(106,62,12,C.yel,"9")+P("M85 56 v-8 M105 56 v-8",C.red,1.6,"none",true)+B(30,.9,{arms:"reach",mood:"think",item:saw}),
        bg(2)+board(56,12,56,30)+txt(84,26,"17 · 802",9,C.blue)+txt(84,37,"· 9",9,C.blue)+B(34,.9,{arms:"point",mood:"think",glasses:true}),
        bg(3)+txt(66,24,"EN",7,C.blue)+blk(76,16,18,C.grn)+blk(96,16,18,C.grn)+txt(66,46,"RU",7,C.red)+[76,86,96,106].map((x,i)=>blk(x,38,9,[C.red,C.yel,C.blue,C.bot][i])).join("")+B(36,.85,{arms:"carry",mood:"sweat",item:R(-14,-4,9,8,C.red,1.5)+R(-4,-4,9,8,C.yel,1.5)+R(6,-4,9,8,C.blue,1.5)+R(-9,-12,9,8,C.bot,1.5)+R(1,-12,9,8,C.red,1.5)}) ],
    l:[["частое слово — 1 токен","common word — 1 token"],["редкое — на куски","rare word — in pieces"],["модель видит номера","the model sees numbers"],["русский режется мельче","RU splits into more"]],
    c:["Я вижу не буквы, а номера кусочков. Поэтому плохо считаю буквы в слове.","I see chunk numbers, not letters. That's why I'm bad at counting letters in a word."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 9 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const f=n=>Math.round(n*10)/10;
  const B=(x,s,o)=>bot(x,82,s,o);
  const H=it=>`<g transform="translate(0 6)">${it}</g>`;
  const g=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const ar=(x1,y1,x2,y2,col,w)=>{ const a=Math.atan2(y2-y1,x2-x1),h=5,c=col||C.ink,sw_=w||2;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${sw_}" stroke-linecap="round"/><path d="M${f(x2-h*Math.cos(a-.55))} ${f(y2-h*Math.sin(a-.55))} L${x2} ${y2} L${f(x2-h*Math.cos(a+.55))} ${f(y2-h*Math.sin(a+.55))}" fill="none" stroke="${c}" stroke-width="${sw_}" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const dash=(x1,y1,x2,y2,col,w)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="${w||1.6}" stroke-dasharray="3 2.5" stroke-linecap="round"/>`;
  const dot=(x,y,r,col,op)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col||C.ink}"${op!=null?` opacity="${op}"`:""}/>`;
  const R=(x,y,w,h,col,o)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${(o&&o.rx)!=null?o.rx:2}" fill="${col}"${o&&o.st?` stroke="${o.st}" stroke-width="${o.sw||1.2}"`:""}${o&&o.op!=null?` opacity="${o.op}"`:""}${o&&o.dash?` stroke-dasharray="3 2.5"`:""}/>`;
  const wc=(x,y,w,col,op,st)=>`<g${op!=null?` opacity="${op}"`:""}><rect x="${x-w/2}" y="${y-6}" width="${w}" height="12" rx="3" fill="${col||"#fff"}" stroke="${st||C.ink}" stroke-width="${st?2:1.1}"/><path d="M${x-w/2+3} ${y} h${w-6}" stroke="${col&&col!=="#fff"?"#fff":C.grey}" stroke-width="2" stroke-linecap="round"/></g>`;
  const doc=(x,y,w,h,n,col,rot)=>card(x,y,w,h,col||"#fff",Array.from({length:n},(_,i)=>`<path d="M${-w/2+4} ${-h/2+6+i*5} h${w-8-(i%3===2?6:0)}" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`).join(""),rot);
  const tc=(w,h,t,sz,col,fill)=>card(0,0,w,h,fill||"#fff",txt(0,f(sz*.36),t,sz,col||C.ink));
  const grid=(x,y,m,cs,col)=>m.map((r,i)=>r.map((v,j)=>`<rect x="${f(x+j*cs)}" y="${f(y+i*cs)}" width="${cs}" height="${cs}" fill="${col}" fill-opacity="${f(.08+v*.9)}" stroke="#fff" stroke-width="1"/>`).join("")).join("")+`<rect x="${x}" y="${y}" width="${f(cs*m[0].length)}" height="${f(cs*m.length)}" fill="#fff" fill-opacity="0" stroke="${C.ink}" stroke-width="1.2"/>`;
  const thermo=(x,y,lv)=>`<rect x="${x-3.5}" y="${y-38}" width="7" height="36" rx="3.5" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="${x-1.8}" y="${f(y-4-lv*32)}" width="3.6" height="${f(lv*32+4)}" fill="${C.red}"/><circle cx="${x}" cy="${y}" r="5.5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const crown=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-9 5 L-9 -5 L-4.5 0 L0 -8 L4.5 0 L9 -5 L9 5 Z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g>`;
  const banana=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-11 -5 Q0 13 11 -5 Q0 4 -11 -5 Z" fill="${C.yel}" stroke="#c99a1e" stroke-width="1.3" stroke-linejoin="round"/></g>`;
  const cat=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-8 -3 L-7 -13 L-2 -8 L2 -8 L7 -13 L8 -3 Q8 8 0 8 Q-8 8 -8 -3 Z" fill="#f2a65a" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/><circle cx="-3" cy="-1" r="1.2" fill="${C.ink}"/><circle cx="3" cy="-1" r="1.2" fill="${C.ink}"/><path d="M-1 2.5 h2 M-12 1 h6 M6 1 h6" stroke="${C.ink}" stroke-width=".9"/></g>`;
  const dog=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="8" fill="${C.wood}" stroke="${C.ink}" stroke-width="1.2"/><ellipse cx="-8" cy="-1" rx="3.2" ry="6" fill="${C.wood2}" stroke="${C.ink}" stroke-width="1"/><ellipse cx="8" cy="-1" rx="3.2" ry="6" fill="${C.wood2}" stroke="${C.ink}" stroke-width="1"/><circle cx="-3" cy="-2" r="1.2" fill="${C.ink}"/><circle cx="3" cy="-2" r="1.2" fill="${C.ink}"/><ellipse cy="3" rx="2" ry="1.4" fill="${C.ink}"/></g>`;
  const fish=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M7 0 L14 -6 L14 6 Z" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.1" stroke-linejoin="round"/><ellipse rx="9" ry="6" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.2"/><circle cx="-4" cy="-1.5" r="1.3" fill="${C.ink}"/></g>`;
  const door=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-9" y="-32" width="18" height="32" rx="2" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.5"/><rect x="-6" y="-28" width="12" height="10" rx="1" fill="none" stroke="${C.wood2}"/><circle cx="-5" cy="-14" r="1.6" fill="${C.ink}"/></g>`;
  const spring=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><ellipse cy="0" rx="16" ry="4" fill="${C.blue}" opacity=".5"/><path d="M0 -26 Q-7 -15 -7 -11 a7 7 0 0 0 14 0 Q7 -15 0 -26 Z" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-12 -2 q3 -3 6 0 t6 0 t6 0 t6 0" stroke="#fff" stroke-width="1.2" fill="none"/></g>`;
  const tree=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-2.5" y="-14" width="5" height="14" fill="${C.wood2}"/><circle cy="-22" r="11" fill="${C.grn}" stroke="${C.ink}" stroke-width="1.1"/></g>`;
  const books=(x,y,n,w)=>Array.from({length:n},(_,i)=>`<rect x="${x-(w||26)/2+(i%2?2:-2)}" y="${y-(i+1)*6}" width="${w||26}" height="6" rx="1.2" fill="${[C.red,C.blue,C.grn,C.yel,"#c86bfa"][i%5]}" stroke="${C.ink}" stroke-width=".9"/>`).join("");
  const scis=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-8 -4 L10 3 M-8 4 L10 -3" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><circle cx="-11" cy="-5" r="3.4" fill="#fff" stroke="${C.red}" stroke-width="2"/><circle cx="-11" cy="5" r="3.4" fill="#fff" stroke="${C.red}" stroke-width="2"/></g>`;
  const badge=(x,y,n,col)=>`<circle cx="${x}" cy="${y}" r="7" fill="${col||C.bot2}"/>`+txt(x,y+3.3,n,9,"#fff");
  const eiffel=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-7 0 L-1.5 -20 L-1 -26 L1 -26 L1.5 -20 L7 0 M-4.5 -8 H4.5 M-2.5 -15 H2.5" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-linejoin="round"/></g>`;
  const head=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="6" fill="#f6d1b0" stroke="${C.ink}" stroke-width=".8"/><path d="M-6 -1.5 a6 6 0 0 1 12 0 q-6 -3 -12 0" fill="${col||"#5b3a29"}"/></g>`;
  const bhead=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-7" y="-6" width="14" height="12" rx="4" fill="${C.bot}"/><rect x="-5" y="-4" width="10" height="8" rx="2.5" fill="${C.face}"/><circle cx="-2.2" cy="0" r="1" fill="${C.ink}"/><circle cx="2.2" cy="0" r="1" fill="${C.ink}"/></g>`;
  const loopArr=(x,y,r,col)=>`<path d="M${x+r} ${y} A${r} ${r} 0 1 1 ${x} ${y-r}" fill="none" stroke="${col||C.ink}" stroke-width="2.4" stroke-linecap="round"/><path d="M${x-5} ${y-r-4} L${x} ${y-r} L${x-5} ${y-r+4}" fill="none" stroke="${col||C.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const funnel=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-12 -12 H12 L3 0 V10 L-3 13 V0 Z" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g>`;
  const safe=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-15" y="-30" width="30" height="30" rx="3" fill="#7d8599" stroke="${C.ink}" stroke-width="1.3"/><circle cy="-15" r="7" fill="#fff" stroke="${C.ink}"/><path d="M0 -15 l4 -3" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/></g>`;
  const book=`<path d="M-12 -7 L0 -4 L12 -7 V7 L0 10 L-12 7 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/><path d="M0 -4 V10 M-9 -2 h6 M-9 2 h6 M3 -2 h6 M3 2 h6" stroke="${C.grey}" stroke-width="1.2"/>`;
  const sack=(inner)=>`<path d="M-13 -5 Q-17 13 0 13 Q17 13 13 -5 Q7 -9 0 -7 Q-7 -9 -13 -5 Z" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>${inner||""}`;
  const blk=(x,y,w)=>`<rect x="${x-w/2}" y="${y}" width="${w}" height="9" rx="2.5" fill="${C.bot}" stroke="${C.ink}" stroke-width="1"/><circle cx="${x-w/4}" cy="${y+4.5}" r="2" fill="${C.yel}"/><circle cx="${x+w/4}" cy="${y+4.5}" r="2" fill="#fff"/>`;
  const shelf=(x1,x2,y)=>`<rect x="${x1}" y="${y}" width="${x2-x1}" height="4" rx="2" fill="${C.wood}"/>`;
  const bars=(x,base,ws,list)=>list.map((b,i)=>R(x+i*ws,base-b[0],ws-3,b[0],b[1],{st:C.ink,sw:1})).join("");
  const folder=(w,h,inner)=>`<path d="M${-w/2} ${-h/2} h${w*.35} l3 3 h${w*.65-3} v${h-3} h${-w} z" fill="#ffe9a8" stroke="${C.ink}" stroke-width="1.2"/>${inner||""}`;
  const plug=(t)=>`<rect x="-12" y="-7" width="20" height="14" rx="3" fill="${C.bot2}" stroke="${C.ink}" stroke-width="1.1"/><path d="M8 -3 h5 M8 3 h5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>${t?txt(-2,2.5,t,6,"#fff"):""}`;

  const Z={};
  const G1="AI: слова в числа|", G2="AI: трансформер|", G3="AI: языковая модель|", G4="AI: RAG и агенты|", G5="AI: в проде на Java|";

  /* ===== слова в числа ===== */
  Z[G1+"Эмбеддинг: слово как точка в пространстве"]={
    p:[ bg(0)+cat(14,68,.9)+B(40,.95,{arms:"hold",mood:"dizzy",item:H(tc(24,12,"517",8))})+dog(92,40,1.3)+card(92,62,32,13,"#fff",txt(0,3.5,"40213",8))+txt(66,24,"?",18,C.red),
        bg(1)+B(26,.9,{arms:"reach",mood:"think",item:g(6,0,1,tc(22,12,"517",8))})+arrowR(66,62,76)+card(94,42,30,68,"#fff",["0.2","−1.3","0.8","0.1","…","0.5"].map((s,i)=>txt(0,-23+i*10,s,8)).join("")),
        bg(2)+`<rect x="52" y="8" width="62" height="64" rx="5" fill="#fff" opacity=".75" stroke="${C.ink}" stroke-width="1.2"/><path d="M52 30 H114 M52 52 H114 M73 8 V72 M94 8 V72" stroke="${C.grey}" stroke-width=".8" stroke-dasharray="2 2"/>`+`<ellipse cx="72" cy="24" rx="17" ry="11" fill="${C.grn}" opacity=".25"/>`+crown(66,24,.9,C.yel)+crown(80,26,.8,"#c86bfa")+banana(102,62,1)+B(24,.9,{arms:"point",mood:"happy"}) ],
    l:[["номер ничего не значит","a number means nothing"],["номер → сотни чисел","number → hundreds of nums"],["похожие — рядом на карте","similar sit close on a map"]],
    c:["Номер слова — просто ярлык. Вектор — адрес на карте смыслов: похожие слова живут рядом.","A word's number is just a tag. A vector is a spot on a meaning map: similar words live close."] };

  Z[G1+"Похожесть — это угол между векторами"]={
    p:[ bg(0)+B(42,.85,{arms:"point",mood:"sad",flip:true})+B(78,.85,{arms:"point",mood:"sweat"})+dash(18,60,4,56,C.red)+dash(102,60,116,56,C.blue)+txt(60,20,"−1",16,C.red),
        bg(1)+B(30,.85,{arms:"point",mood:"think"})+dash(54,60,72,55,C.blue)+B(92,.85,{arms:"up",mood:"think"})+dash(107,54,107,16,C.red)+txt(40,24,"0",16,C.ink),
        bg(2)+B(28,1.05,{arms:"point",mood:"happy"})+dash(57,55,66,52.6,C.blue)+B(84,.75,{arms:"point",mood:"happy"})+dash(105,63,116,60,C.red)+txt(96,26,"1",16,C.grn),
        bg(3)+B(26,.9,{arms:"carry",mood:"wow",item:crown(0,0,1.1,C.yel)})+dash(40,28,58,30,C.grn)+crown(66,30,.9,"#c86bfa")+txt(66,18,"0.99",9,C.grn)+dash(40,32,88,58,C.red)+banana(100,62,1)+txt(100,80,"0.16",9,C.red) ],
    l:[["смотрим врозь = −1","opposite ways = −1"],["поперёк = 0","at right angles = 0"],["в одну сторону = 1","same way = 1"],["король ↔ банан: далеко","king ↔ banana: far"]],
    c:["Неважно, чья рука длиннее, — важно, куда показывает. Меньше угол — ближе смысл.","Arm length doesn't matter, only where it points. Smaller angle means closer meaning."] };

  Z[G1+"Одно слово — разные векторы: смысл зависит от контекста"]={
    p:[ bg(0)+door(16,80,1.1)+spring(104,80,.85)+B(60,.95,{arms:"hold",mood:"dizzy",item:key(0,0,.8)})+txt(86,24,"?",16,C.red)+txt(34,24,"?",16,C.red),
        bg(1)+door(98,82,1.2)+B(50,.95,{arms:"reach",mood:"happy",item:key(0,0,.8)})+card(28,16,30,16,"#fff",`<path d="M-9 4 L7 -5" stroke="${C.wood2}" stroke-width="2.4" stroke-linecap="round"/><path d="M3 -6 L7 -5 L5 -1" fill="none" stroke="${C.wood2}" stroke-width="2"/>`)+txt(28,38,"A",11,C.wood2),
        bg(2)+tree(16,74,.9)+spring(88,82,1.1)+B(44,.95,{arms:"reach",mood:"happy",item:key(0,0,.8)})+card(98,16,30,16,"#fff",`<path d="M-9 -4 L7 5" stroke="${C.blue}" stroke-width="2.4" stroke-linecap="round"/><path d="M3 6 L7 5 L6 1" fill="none" stroke="${C.blue}" stroke-width="2"/>`)+txt(98,38,"B",11,C.blue) ],
    l:[["словарь: один вектор","dictionary: one vector"],["у двери — вектор A","by a door — vector A"],["у родника — вектор B","by a spring — vector B"]],
    c:["Я смотрю на соседей слова и пересчитываю его вектор. «Ключ» у двери и у родника — разные.","I look at a word's neighbours and recompute its vector. A door key and a spring differ."] };

  const P3=[[66,16],[80,12],[96,18],[110,12],[72,32],[88,30],[106,34],[68,48],[84,46],[100,52],[112,48]];
  Z[G1+"Векторная база: поиск ближайших точек"]={
    p:[ bg(0)+P3.map(p=>`<path d="M58 62 L${p[0]} ${p[1]}" stroke="${C.grey}" stroke-width="1"/>`).join("")+P3.map(p=>dot(p[0],p[1],2.8,C.bot2)).join("")+B(36,.9,{arms:"reach",mood:"sweat",item:spark(0,0,C.red)})+clock(18,18,.9,5),
        bg(1)+`<path d="M60 14 L76 22 L92 14 L106 26 L94 40 L78 38 L64 46 L80 56 L96 58 M76 22 L78 38 M92 14 L94 40 M106 26 L110 48 L96 58" stroke="${C.grey}" stroke-width="1.3" fill="none"/><path d="M60 14 L76 22 L78 38 L80 56" stroke="${C.grn}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`+[[60,14],[76,22],[92,14],[106,26],[94,40],[78,38],[64,46],[80,56],[96,58],[110,48]].map(p=>dot(p[0],p[1],2.8,C.bot2)).join("")+`<circle cx="80" cy="56" r="5.5" fill="none" stroke="${C.grn}" stroke-width="1.8"/>`+spark(88,66,C.red)+B(28,.9,{arms:"point",mood:"think"}),
        bg(2)+`<circle cx="22" cy="20" r="13" fill="#fff" opacity=".6" stroke="${C.grey}" stroke-dasharray="3 2.5"/><circle cx="100" cy="20" r="13" fill="#fff" opacity=".6" stroke="${C.grey}" stroke-dasharray="3 2.5"/>`+[[16,16],[26,24],[24,14],[94,16],[104,24],[106,14]].map(p=>dot(p[0],p[1],2.4,C.grey)).join("")+`<ellipse cx="60" cy="56" rx="36" ry="30" fill="${C.yel}" opacity=".35" stroke="${C.ink}" stroke-width="1.3"/>`+[[34,48],[86,46],[40,70],[82,70]].map(p=>dot(p[0],p[1],2.8,C.bot2)).join("")+B(60,.85,{arms:"hold",mood:"happy",item:spark(0,0,C.red)}),
        bg(3)+B(30,.9,{arms:"carry",mood:"happy",item:tc(40,13,"pgvector",7,C.bot2)})+db(90,52,1.3)+txt(90,20,"&lt;-&gt;",10,C.blue)+arrowR(52,44,70) ],
    l:[["мерить до всех — долго","measuring all — slow"],["HNSW: прыгаю к соседям","HNSW: hop to neighbours"],["IVF: смотрю один район","IVF: check one district"],["в Postgres: pgvector","in Postgres: pgvector"]],
    c:["Найти похожее — найти ближайшие точки. Не меряю до всех, а иду от района к району.","Similar means nearest points. I don't measure them all — I hop district by district."] };

  /* ===== трансформер ===== */
  const row8=(y,ops,skip)=>Array.from({length:8},(_,i)=>i===skip?"":wc(10+i*14,y,12,i===0?C.red:i===7?C.grn:"#fff",ops?ops[i]:null)).join("");
  Z[G2+"Проблема: далёкие слова связаны"]={
    p:[ bg(0)+row8(14,null,7)+`<path d="M10 24 V28 H98" fill="none" stroke="${C.ink}" stroke-width="1.3"/>`+txt(54,40,"10",11)+B(96,.9,{arms:"hold",mood:"think",item:wc(0,0,14,C.grn)})+txt(12,46,"?",14,C.red),
        bg(1)+row8(16,[.15,.2,.3,.6,1,1,1,1])+`<path d="M1 4 H52 V28 H1 Z M70 4 H119 V28 H70 Z" fill="${C.ink}" opacity=".55"/>`+B(60,.95,{arms:"up",mood:"dizzy"})+txt(22,48,"?",16,C.red),
        bg(2)+row8(14)+`<path d="M108 22 Q60 50 12 22" fill="none" stroke="${C.grn}" stroke-width="2.6" stroke-linecap="round"/><path d="M14 30 L12 22 L19 24" fill="none" stroke="${C.grn}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`+B(64,.9,{arms:"point",mood:"happy",flip:true}) ],
    l:[["связаны через 10 слов","linked 10 words apart"],["по слову — начало забыл","word by word — start lost"],["смотрю прямо на начало","look straight at the start"]],
    c:["«Подписан» — это про договор в самом начале. Читая по слову, старые модели его забывали.","“Signed” is about the contract at the very start. Reading word by word, old models forgot it."] };

  Z[G2+"Внимание: каждое слово смотрит на все остальные"]={
    p:[ bg(0)+[[14,C.red],[36,"#fff"],[58,"#fff"]].map(w=>wc(w[0],14,18,w[1])).join("")+[[14,4,C.red],[36,1,C.ink],[58,1.8,C.ink]].map(a=>`<path d="M84 28 Q${(84+a[0])/2} 46 ${a[0]} 21" fill="none" stroke="${a[2]}" stroke-width="${a[1]}" stroke-linecap="round"/>`).join("")+B(96,.9,{arms:"carry",mood:"think",item:wc(0,0,20,C.grn)}),
        bg(1)+grid(8,10,[[.9,.1,.2,.1],[.3,.7,.1,.2],[.1,.2,.8,.3],[.95,.05,.15,.1]],13,C.blue)+`<rect x="8" y="49" width="52" height="13" fill="none" stroke="${C.red}" stroke-width="2.2"/>`+B(92,.9,{arms:"point",mood:"think",flip:true}),
        bg(2)+R(6,12,24,8,C.red,{st:C.ink,sw:1})+R(6,24,4,8,C.blue,{st:C.ink,sw:1})+R(6,36,4,8,C.grey,{st:C.ink,sw:1})+txt(40,19,"0.8",7)+txt(22,31,"0.1",7)+txt(22,43,"0.1",7)+B(52,.95,{arms:"hold",mood:"happy",item:`<path d="M-12 -4 H12 Q11 9 0 9 Q-11 9 -12 -4 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M-10 -1 H10" stroke="${C.red}" stroke-width="3"/><path d="M-6 3 H6" stroke="${C.blue}" stroke-width="2"/>`})+arrowR(72,62,84)+R(88,52,10,20,C.red,{rx:0})+R(98,52,3,20,C.blue,{rx:0})+R(101,52,3,20,C.grey,{rx:0})+`<rect x="88" y="52" width="16" height="20" rx="2" fill="none" stroke="${C.ink}" stroke-width="1.2"/>`,
        bg(3)+B(60,.95,{arms:"carry",mood:"wow",item:g(0,-6,.6,chip(0,0,txt(0,3,"GPU",8,"#fff")))})+spark(22,24)+spark(98,22,C.ant)+spark(100,56,C.grn)+spark(20,58,C.blue) ],
    l:[["каждое смотрит на всех","each looks at all"],["таблица весов","a table of weights"],["смешиваю по весам","blend by the weights"],["всё разом на видеокарте","all at once on a GPU"]],
    c:["«Подписан» сильнее всех смотрит на «договор». Я смешиваю соседей по весам — так слово умнеет.","“Signed” looks hardest at “contract”. I blend neighbours by weight, and the word gets smarter."] };

  const xs5=[14,37,60,83,106];
  Z[G2+"Много голов: несколько вопросов сразу"]={
    p:[ bg(0)+xs5.map((x,i)=>wc(x,12,18,"#fff",null,i===0?C.red:i===2?C.blue:i===4?C.grn:null)).join("")+[[22,14,C.red,"cap"],[60,60,C.blue,"helmet"],[98,106,C.grn,"chef"]].map(h=>dash(h[0],36,h[1],20,h[2],1.8)+B(h[0],.75,{mood:"think",arms:"up",hat:h[3]})).join(""),
        bg(1)+[[20,C.red,"cap",[[.9,.1,.1],[.8,.2,.1],[.9,.1,.2]]],[60,C.blue,"helmet",[[.1,.2,.9],[.2,.1,.8],[.1,.9,.1]]],[100,C.grn,"chef",[[.2,.9,.1],[.1,.2,.9],[.9,.1,.1]]]].map(h=>B(h[0],.75,{arms:"hold",mood:"smile",hat:h[2],item:grid(-10,-6,h[3],6.6,h[1])})).join(""),
        bg(2)+[[18,C.red],[40,C.blue],[102,C.grn]].map((c,i)=>R(c[0]-7,62,14,10,c[1],{st:C.ink,sw:1})).join("")+B(60,1,{arms:"carry",mood:"happy",item:R(-21,-5,14,10,C.red,{rx:0})+R(-7,-5,14,10,C.blue,{rx:0})+R(7,-5,14,10,C.grn,{rx:0})+`<rect x="-21" y="-5" width="42" height="10" rx="2" fill="none" stroke="${C.ink}" stroke-width="1.3"/>`})+spark(94,16)+spark(26,22) ],
    l:[["своё у каждой головы","each head has its own view"],["у каждой своя таблица","each has its own table"],["склеиваю результаты","glue results together"]],
    c:["Одна голова ищет подлежащее, другая — время, третья — ещё что-то. Что искать, учатся сами.","One head finds the subject, another the tense, a third something else. They learn it alone."] };

  Z[G2+"Блок трансформера, повторённый десятки раз"]={
    p:[ bg(0)+wc(14,14,18)+wc(38,10,18)+wc(62,14,18)+[[14,20],[38,16],[62,20]].map(p=>`<path d="M${p[0]} ${p[1]+2} Q${(p[0]+36)/2} 40 36 52" fill="none" stroke="${C.blue}" stroke-width="1.4" stroke-dasharray="3 2.5"/>`).join("")+B(36,.9,{arms:"hold",mood:"think",item:wc(0,0,18,C.grn)})+arrowR(58,62,74)+gear(94,56,1.3,C.grey),
        bg(1)+Array.from({length:6},(_,i)=>blk(32,65-i*10,40)).join("")+txt(32,8,"⋮",10)+B(88,.9,{arms:"carry",mood:"sweat",item:blk(0,-4.5,30)})+txt(102,12,"×48",11,C.bot2),
        bg(2)+Array.from({length:5},(_,i)=>blk(30,64-i*10,34)).join("")+wc(18,78,14)+wc(42,78,14)+bulb(30,11,true,6)+B(86,.9,{arms:"point",mood:"happy",flip:true}) ],
    l:[["собрал от соседей, обдумал","gather, then digest"],["блоки стопкой, десятки","dozens stacked up"],["внизу слова, вверху смысл","words below, meaning above"]],
    c:["Каждый блок: собрать от соседей и переварить. Десятки кругов — от слов до смысла всего текста.","Each block gathers from neighbours, then digests. Dozens of rounds — from words to meaning."] };

  Z[G2+"Откуда модель знает порядок слов"]={
    p:[ bg(0)+cat(14,24,.9)+ar(26,24,38,24,C.ink,1.6)+fish(50,24,.9)+fish(14,54,.9)+ar(28,54,38,54,C.ink,1.6)+cat(50,54,.9)+txt(32,42,"≠",14,C.red)+B(94,.9,{arms:"point",mood:"wow",flip:true}),
        bg(1)+think(78,14,txt(11,2,"= ?",10,C.red))+B(44,.95,{arms:"hold",mood:"sad",item:g(0,4,1.4,sack(cat(-4,-1,.55)+fish(6,4,.45)))}),
        bg(2)+cat(76,58,1.2)+fish(104,62,1)+badge(108,48,"3",C.red)+B(36,.9,{arms:"reach",mood:"happy",item:`<circle r="7" fill="${C.red}"/>`+txt(0,3.3,"1",9,"#fff")}) ],
    l:[["другой порядок — смысл","order changes meaning"],["вниманию — один мешок","attention sees one bag"],["клею номер места","stick on a position"]],
    c:["Без меток места «кот съел рыбу» и «рыба съела кота» для меня одинаковы. Метка всё решает.","Without position marks, “cat ate fish” and “fish ate cat” look the same to me. Marks fix it."] };

  /* ===== языковая модель ===== */
  Z[G3+"Языковая модель предсказывает следующий токен"]={
    p:[ bg(0)+books(22,76,9,30)+books(50,76,6,24)+B(88,.9,{legs:"sit",arms:"hold",glasses:true,mood:"think",item:book}),
        bg(1)+wc(14,20,16)+wc(34,20,16)+wc(54,20,16)+`<rect x="68" y="11" width="26" height="18" rx="4" fill="#fff" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="3 2.5"/>`+txt(81,24,"?",13,C.red)+B(82,.9,{arms:"up",mood:"think"}),
        bg(2)+bars(56,72,12,[[46,C.grn],[14,C.grey],[9,C.grey],[6,C.grey],[4,C.grey]])+eiffel(60,22,.6)+txt(80,14,"0.9",9,C.grn)+B(24,.9,{arms:"point",mood:"happy"}) ],
    l:[["прочитал горы текста","read mountains of text"],["что дальше?","what comes next?"],["у каждого — вероятность","each gets a chance"]],
    c:["Я учусь одному: угадывать следующее слово. Грамматику и факты пришлось выучить заодно.","I learn one thing: guess the next word. Grammar and facts came along as a side effect."] };

  Z[G3+"Генерация по одному токену: почему медленно"]={
    p:[ bg(0)+shelf(48,118,40)+wc(58,33,16)+wc(76,33,16)+wc(94,33,16)+`<rect x="104" y="27" width="13" height="12" rx="3" fill="none" stroke="${C.grn}" stroke-width="1.6" stroke-dasharray="3 2"/>`+`<path d="M42 22 Q80 2 110 24" fill="none" stroke="${C.grn}" stroke-width="1.8" stroke-dasharray="3 2.5"/>`+B(28,.9,{arms:"carry",mood:"smile",item:wc(0,0,18,C.grn)}),
        bg(1)+[1,2,3,4,5].map(i=>Array.from({length:i},(_,j)=>R(6+j*9,6+i*11,7,7,j===i-1?C.grn:"#fff",{st:C.ink,sw:.9})).join("")).join("")+clock(70,18,.9,4)+txt(100,22,"×500",11,C.red)+B(88,.85,{arms:"hold",mood:"sweat",item:wc(0,0,14,C.grn)}),
        bg(2)+B(34,.9,{arms:"reach",mood:"happy",item:wc(0,0,16,C.grn)})+txt(72,30,"SSE",10,C.blue)+`<path d="M60 40 Q74 32 86 42" fill="none" stroke="${C.blue}" stroke-width="1.6" stroke-dasharray="3 2.5"/>`+kid(100,82,.95,C.red,"wow") ],
    l:[["слово — в конец текста","word goes to the end"],["500 слов — 500 кругов","500 tokens — 500 passes"],["первое — показываю сразу","first one shown at once"]],
    c:["Я пишу по одному слову и каждый раз перечитываю всё. Зато первое слово можно показать сразу.","I write one word at a time, rereading everything. But the first word can be shown right away."] };

  Z[G3+"Температура: случайность на выходе"]={
    p:[ bg(0)+thermo(10,70,.05)+bars(60,72,11,[[50,C.grn],[6,C.grey],[4,C.grey],[3,C.grey],[2,C.grey]])+B(34,.85,{arms:"point",mood:"think"}),
        bg(1)+thermo(10,70,.9)+bars(60,72,11,[[22,C.grn],[19,C.blue],[16,C.yel],[14,"#c86bfa"],[12,C.red]])+`<circle cx="100" cy="54" r="7" fill="none" stroke="${C.red}" stroke-width="1.8"/>`+txt(100,38,"?",13,C.red)+B(34,.85,{arms:"point",mood:"dizzy"}),
        bg(2)+thermo(10,70,.05)+laptop(26,46,.7,txt(0,-10,"{ }",8))+thermo(110,70,.9)+bulb(94,22,true,6)+B(60,.95,{arms:"hold",mood:"happy",item:`<circle r="8" fill="#fff" stroke="${C.ink}" stroke-width="1.4"/><path d="M0 0 L-5 -5" stroke="${C.red}" stroke-width="2.2" stroke-linecap="round"/>`}) ],
    l:[["0 — всегда самый вероятный","0 — always the top one"],["выше — смелее и чуднее","higher — bolder, weirder"],["код — низко, идеи — выше","code low, ideas higher"]],
    c:["Температура — ручка смелости. Для кода держу её у нуля, для мозгового штурма поднимаю.","Temperature is a boldness knob. Near zero for code, turned up for brainstorming."] };

  Z[G3+"Контекстное окно: память модели — это промпт"]={
    p:[ bg(0)+B(40,.95,{mood:"sad",arms:"up"})+think(74,18,txt(11,2,"?",13,C.red)),
        bg(1)+doc(96,22,20,22,3,"#e3e6ee")+doc(104,46,20,22,3,"#cfe5fb")+ar(84,32,66,50,C.ink,1.4)+B(42,.95,{arms:"hold",mood:"happy",item:folder(26,20)}),
        bg(2)+`<rect x="6" y="8" width="72" height="66" rx="5" fill="#fff" opacity=".45" stroke="${C.bot2}" stroke-width="2" stroke-dasharray="4 3"/>`+B(40,.9,{arms:"carry",mood:"sweat",item:doc(-3,-3,18,16,2,"#e3e6ee")+doc(3,3,18,16,2,"#ffe9a8")})+doc(100,56,20,24,3,"#cfe5fb",18)+no(100,26,.9),
        bg(3)+R(6,66,22,6,"#cfe5fb",{st:C.ink,sw:.9})+coin(17,56,.7)+[0,1].map(j=>R(34,66-j*7,22,6,"#cfe5fb",{st:C.ink,sw:.9})).join("")+coin(40,46,.7)+coin(50,46,.7)+B(88,.9,{arms:"carry",mood:"think",item:[0,1,2].map(j=>R(-11,4-j*6,22,6,"#cfe5fb",{st:C.ink,sw:.9})).join("")})+coin(62,24,.7)+coin(70,32,.7)+coin(62,38,.7) ],
    l:[["между вызовами пусто","nothing between calls"],["всё — в папке запроса","all in the request folder"],["не влезло — не видел","didn't fit — never seen"],["вся история — каждый раз","whole history every time"]],
    c:["У меня нет памяти. Я знаю только то, что лежит в папке этого запроса, — и за папку платят.","I have no memory. I only know what's in this request's folder — and you pay for the folder."] };

  Z[G3+"Галлюцинации: почему уверенно врёт"]={
    p:[ bg(0)+kid(20,82,.9,C.red)+bubble(26,22,22,txt(0,4,"?",12,C.red))+B(78,.95,{arms:"hold",mood:"think",item:`<path d="M-12 -7 L0 -4 L12 -7 V7 L0 10 L-12 7 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 -4 V10" stroke="${C.ink}"/>`+txt(-6,4,"∅",7,C.grey)}),
        bg(1)+B(40,.95,{arms:"carry",mood:"happy",item:g(0,-5,.7,paper(0,0,["http://","x.io/42"]))})+spark(76,22)+spark(88,40,C.ant)+txt(98,24,"!",16,C.red),
        bg(2)+paper(60,34,["http://","x.io/42"])+txt(60,64,"404",11,C.red)+kid(102,82,.9,C.blue,"wow")+mag(86,40,.9)+B(24,.9,{mood:"sweat",arms:"hold",item:no(0,0,.7)}),
        bg(3)+laptop(94,72,1,`<path d="M-5 -13 l3 3 l6 -6" stroke="${C.grn}" stroke-width="2" fill="none" stroke-linecap="round"/>`)+ok(94,24,1)+B(40,.95,{arms:"hold",mood:"happy",item:doc(0,0,18,22,3,"#ffe9a8")}) ],
    l:[["точного ответа нет","no real answer known"],["уверенно выдумал","made it up, confidently"],["а ссылки нет: 404","the link is a 404"],["источник + проверка кодом","source + code check"]],
    c:["Я не проверяю факты, а гладко продолжаю текст. Уверенность — не знание. Дай источник и проверь.","I don't check facts, I just continue text. Confidence isn't knowledge. Give sources, check me."] };

  Z[G3+"Как учат LLM: три этапа"]={
    p:[ bg(0)+badge(12,12,"1")+books(30,76,9,32)+books(56,76,6,24)+B(92,.9,{arms:"hold",mood:"dizzy",glasses:true,item:book})+coin(66,20,.8)+coin(80,14,.8),
        bg(1)+badge(12,12,"2")+kid(24,82,.9,C.grn)+card(48,30,20,18,"#fff",txt(0,5,"?",12,C.blue))+B(88,.9,{arms:"hold",mood:"smile",item:tc(18,16,"!",12,C.grn)}),
        bg(2)+badge(12,12,"3")+B(38,.9,{arms:"carry",mood:"happy",item:tc(22,18,"A",11)})+ok(54,20,.7)+card(84,50,22,18,"#fff",txt(0,4,"B",11))+no(96,40,.7)+kid(104,82,.8,C.blue) ],
    l:[["прочитал всё подряд","read everything"],["учусь отвечать","learn to answer"],["люди выбрали лучший","people pick the better"]],
    c:["Сначала я читал всё подряд, потом учился отвечать, потом люди показывали, какой ответ лучше.","First I read everything, then learned to answer, then people showed me which answer was better."] };

  Z[G3+"Системный промпт и роли"]={
    p:[ bg(0)+R(56,12,58,14,"#e3e6ee",{st:C.ink,sw:1.1,rx:5})+gear(66,19,.45)+R(56,34,58,14,"#cfe5fb",{st:C.ink,sw:1.1,rx:5})+head(66,41,.85)+R(56,56,58,14,"#cbe8cd",{st:C.ink,sw:1.1,rx:5})+bhead(66,63,.9)+[19,41,63].map(y=>`<path d="M76 ${y} h30" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`).join("")+B(26,.9,{arms:"point",mood:"think"}),
        bg(1)+B(40,.95,{arms:"carry",mood:"happy",hat:"cap",item:g(0,-8,1,card(0,0,28,26,"#e3e6ee",gear(-8,-6,.4)+`<path d="M-1 -6 h9" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`+ok(-8,6,.45)+no(4,6,.45)))})+ok(92,30,1)+kid(96,82,.85,C.blue),
        bg(2)+kid(22,82,.9,C.red)+bubble(26,22,30,txt(0,4,"!!!",11,C.red))+B(82,.95,{arms:"hold",mood:"sweat",hat:"cap",item:card(0,0,22,20,"#e3e6ee",`<path d="M-2 -10 l4 6 l-3 5 l4 6" fill="none" stroke="${C.red}" stroke-width="1.8"/>`)}) ],
    l:[["роли: система, ты, я","roles: system, user, AI"],["система — мои правила","system sets my rules"],["но это не гарантия","but it's no guarantee"]],
    c:["Системный промпт — мой инструктаж перед сменой. Я слушаюсь, но напористый может уговорить.","The system prompt is my pre-shift briefing. I try to obey, but a pushy user may talk me round."] };

  Z[G3+"Структурированный ответ и вызов инструмента"]={
    p:[ bg(0)+B(34,.95,{arms:"hold",mood:"sweat",item:card(0,0,24,22,"#fff",`<path d="M-8 -6 q3 -3 6 0 t6 0 M-8 0 q3 3 6 0 t7 0 M-8 6 q4 -2 8 0" stroke="${C.grey}" stroke-width="1.6" fill="none"/>`)})+server(90,50,1,false)+no(90,18,.8),
        bg(1)+B(34,.95,{arms:"hold",mood:"happy",item:card(0,0,24,22,"#fff",txt(-7,3,"{",9)+R(-3,-6,4,4,C.grn,{rx:1})+R(-3,1,4,4,C.grn,{rx:1})+`<path d="M3 -4 h5 M3 3 h5" stroke="${C.ink}" stroke-width="1.6"/>`)})+server(90,50,1)+ok(90,18,.8),
        bg(2)+bubble(60,16,84,txt(0,3,"getBalance(42)",8,C.blue))+B(26,.9,{arms:"point",mood:"think"})+laptop(94,74,1.1,`<path d="M-8 -14 h10 M-8 -9 h6" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/>`),
        bg(3)+laptop(20,74,.8)+ar(30,52,46,40)+db(56,40,.7)+ar(64,52,74,58,C.grn)+B(94,.9,{arms:"hold",mood:"wow",item:H(tc(22,13,"100",8,C.grn))}) ],
    l:[["рассказ — не разобрать","a story can't be parsed"],["JSON по схеме — ✓","schema JSON — ✓"],["я только прошу вызвать","I only ask for a call"],["код вызвал и вернул","your code calls, returns"]],
    c:["Я не умею сам нажимать кнопки. Я прошу: «вызови getBalance с 42» — а вызывает твой код.","I can't press buttons myself. I ask “call getBalance with 42”, and your code does the call."] };

  /* ===== RAG и агенты ===== */
  Z[G4+"RAG: положить знание в промпт, а не в модель"]={
    p:[ bg(0)+kid(22,82,.9,C.blue)+bubble(28,22,26,txt(0,4,"% ?",9,C.red))+B(82,.95,{mood:"sad"})+think(80,14,txt(11,2,"∅",10,C.grey)),
        bg(1)+doc(80,52,22,30,4)+doc(90,46,22,30,4)+doc(100,40,22,30,4,"#ffe9a8")+B(38,.95,{arms:"reach",mood:"think",item:mag(0,0,.9)}),
        bg(2)+B(38,.95,{arms:"hold",mood:"happy",item:doc(0,0,18,22,3,"#ffe9a8")})+bubble(74,20,26,txt(0,3,"[1]",9,C.blue))+kid(102,82,.85,C.blue),
        bg(3)+doc(96,58,22,28,4)+`<path d="M86 46 L106 70 M106 46 L86 70" stroke="${C.red}" stroke-width="2.4" stroke-linecap="round"/>`+B(42,.95,{arms:"carry",mood:"happy",item:doc(0,0,20,18,3,"#ffe9a8")})+spark(72,20) ],
    l:[["твоего я не знаю","I don't know your data"],["ищу нужные куски","find the right pieces"],["отвечаю по ним, с ссылкой","answer from them + link"],["сменил листок — и всё","swap the page — done"]],
    c:["Мне не надо зубрить твои тарифы. Положи нужную страницу рядом с вопросом — отвечу по ней.","No need to memorise your tariffs. Put the right page by the question — I'll answer from it."] };

  Z[G4+"Чанки: как режут документы"]={
    p:[ bg(0)+doc(60,42,24,66,11)+`<rect x="88" y="26" width="26" height="26" rx="4" fill="#fff" opacity=".6" stroke="${C.bot2}" stroke-width="2" stroke-dasharray="4 3"/>`+no(101,64,.8)+B(26,.9,{arms:"push",mood:"sweat"}),
        bg(1)+card(32,40,40,66,"#fff",[[-27,-22,-17],[-3,2,7],[17,22]].map(gr=>gr.map(y=>`<path d="M-15 ${y} h30" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`).join("")).join("")+`<path d="M-22 -10 h44 M-22 12 h44" stroke="${C.red}" stroke-width="1.4" stroke-dasharray="3 2.5"/>`)+B(84,.95,{arms:"reach",mood:"think",flip:true,item:g(0,-9,1,scis(0,0,1))}),
        bg(2)+doc(26,20,26,24,4)+doc(60,22,26,24,4)+doc(94,20,26,24,4)+`<rect x="39" y="10" width="8" height="22" fill="${C.yel}" opacity=".6"/><rect x="73" y="10" width="8" height="22" fill="${C.yel}" opacity=".6"/>`+B(60,.85,{arms:"up",mood:"happy"}),
        bg(3)+B(30,.9,{arms:"carry",mood:"happy",item:doc(0,0,22,18,3,"#ffe9a8")})+R(64,40,48,36,C.wood,{st:C.wood2,sw:1.3})+R(70,46,36,10,"#fff",{st:C.ink,sw:1})+txt(80,54,"v2",7,C.bot2)+lock(98,51,.45)+R(70,60,36,10,"#fff",{st:C.ink,sw:1})+txt(88,68,"#3",7,C.bot2)+arrowR(50,30,74) ],
    l:[["целиком не влезет","the whole doc won't fit"],["режу по абзацам","cut on paragraph lines"],["с нахлёстом на стыке","overlap at the seams"],["кусок + метки в индекс","chunk + tags to the index"]],
    c:["Режь по смыслу, а не по линейке, и чуть внахлёст. Плохая нарезка портит ответ раньше модели.","Cut by meaning, not by ruler, with a bit of overlap. Bad chunks ruin answers before the model."] };

  Z[G4+"Поиск, потом ответ: и почему нужен реранкинг"]={
    p:[ bg(0)+card(98,22,22,20,"#fff",txt(0,5,"?",12,C.blue))+mag(80,50,.9)+txt(104,74,"#42",9,C.wood2)+B(40,.95,{arms:"carry",mood:"sweat",item:[-2,-1,0,1,2].map(i=>doc(i*5,0,14,18,2,"#fff",i*8)).join("")})+txt(76,40,"×10",11),
        bg(1)+Array.from({length:8},(_,i)=>{const x=10+(i%4)*17,y=i<4?20:50,on=[1,4,6].includes(i);return doc(x,y,14,20,3,on?"#ffe9a8":"#fff")+(on?ok(x+6,y+9,.45):"");}).join("")+B(96,.9,{arms:"point",mood:"think",glasses:true,flip:true}),
        bg(2)+laptop(94,72,1.1)+B(38,.95,{arms:"reach",mood:"happy",item:[-1,0,1].map(i=>doc(i*5,0,14,18,2,"#ffe9a8",i*10)).join("")})+ok(94,22,.9) ],
    l:[["вектор + точный поиск: 10","vector + exact: 10 found"],["реранкинг оставил 3","rerank keeps the top 3"],["эти 3 — в промпт","those 3 go in the prompt"]],
    c:["Сначала быстро набираю десяток кандидатов, потом строгий эксперт оставляет три лучших.","First I quickly grab ten candidates, then a strict expert keeps the best three."] };

  Z[G4+"Дообучение или RAG: когда что"]={
    p:[ bg(0)+R(66,12,48,32,"#3f6b4f",{st:C.wood2,sw:2})+txt(82,32,"{ }",10,"#fff")+`<circle cx="100" cy="28" r="6" fill="none" stroke="#fff" stroke-width="1.4"/><path d="M97 29 q3 3 6 0" stroke="#fff" stroke-width="1.3" fill="none"/>`+B(36,.9,{arms:"hold",mood:"think",glasses:true,item:book}),
        bg(1)+[["10",0],["12",1],["9",2]].map(d=>card(16+d[1]*20,22,16,20,"#fff",`<rect x="-8" y="-10" width="16" height="5" fill="${C.red}"/>`+txt(0,6,d[0],7))).join("")+clock(20,52,.8,8)+B(86,.95,{arms:"up",mood:"dizzy"}),
        bg(2)+shelf(60,116,54)+card(90,44,22,18,"#fff",coin(-4,0,.6)+txt(5,3,"12",7))+B(36,.95,{arms:"reach",mood:"happy",item:ok(0,0,.7)}),
        bg(3)+`<path d="M6 76 H40 V58 H74 V40 H114 V76 Z" fill="#fff" opacity=".75" stroke="${C.ink}" stroke-width="1.2"/>`+badge(22,68,"1")+badge(66,68,"2")+badge(104,60,"3")+B(56,.8,{arms:"up",mood:"happy"}).replace("translate(56 82)","translate(56 58)") ],
    l:[["дообучение — манера","fine-tuning — manner"],["цены меняются каждый день","prices change daily"],["свежие факты — листок","fresh facts — a note"],["промпт → RAG → дообучение","prompt → RAG → tune"]],
    c:["Манере учат курсом. Сегодняшние цены — листок на столе. Сначала промпт, потом RAG, потом курс.","Manner takes a course. Today's prices take a note. Prompt first, then RAG, then the course."] };

  Z[G4+"Агент: цикл «подумал — вызвал — посмотрел»"]={
    p:[ bg(0)+paper(22,38,["?","→ ✓"])+B(70,.95,{mood:"think"})+think(80,14,gear(11,-2,.55)),
        bg(1)+B(30,.95,{arms:"reach",mood:"smile",item:phone(0,0,.6)})+arrowR(60,56,76)+server(96,52,1.1),
        bg(2)+server(16,52,.9)+card(46,30,24,16,"#fff",txt(0,4,"200",9,C.grn))+B(90,.95,{arms:"reach",mood:"wow",glasses:true,flip:true,item:mag(0,0,.8)}),
        bg(3)+loopArr(60,46,32,C.bot2)+B(60,.8,{mood:"think",legs:"run"})+txt(104,16,"≤10",11,C.red),
        bg(4)+[[18,db(0,1,.45)],[44,env(0,0,.55)],[70,mag(-2,-2,.5)]].map(t=>card(t[0],22,22,22,"#cbe8cd",t[1])).join("")+card(100,22,22,22,"#e3e6ee",lock(0,-2,.6))+B(48,.9,{arms:"up",mood:"happy"})+no(100,44,.6) ],
    l:[["подумал","think"],["позвонил инструменту","call a tool"],["посмотрел результат","look at the result"],["по кругу, но с лимитом","loop, with a step limit"],["звоню только по списку","only tools on my list"]],
    c:["Я думаю, зову инструмент, смотрю результат — и снова. Звонить могу только по выданному списку.","I think, call a tool, look at the result, repeat. I can only call what's on your list."] };

  Z[G4+"MCP: единый разъём для инструментов"]={
    p:[ bg(0)+db(104,20,.6)+server(104,46,.45)+mag(102,68,.6)+[[48,58,96,20,C.red],[48,58,96,46,C.blue],[48,58,94,66,C.grn],[48,62,96,22,C.yel],[48,62,94,44,"#c86bfa"],[48,62,94,68,C.ant]].map(l=>`<path d="M${l[0]} ${l[1]} C70 ${l[1]-30} 70 ${l[3]+30} ${l[2]} ${l[3]}" fill="none" stroke="${l[4]}" stroke-width="1.6"/>`).join("")+B(30,.95,{arms:"hold",mood:"dizzy"}),
        bg(1)+B(24,.9,{arms:"reach",mood:"happy",item:g(7,0,1,plug("MCP"))})+R(62,48,12,18,"#fff",{st:C.ink,rx:3})+`<path d="M74 57 H82 M82 26 V76 M82 26 H92 M82 51 H92 M82 76 H92" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`+db(102,28,.5)+server(102,52,.38)+mag(100,74,.5),
        bg(2)+server(96,50,1)+ar(82,38,64,46,C.ink,1.4)+B(36,.95,{arms:"hold",mood:"think",item:card(0,0,24,26,"#fff",db(-6,-6,.25)+`<path d="M-1 -7 h8" stroke="${C.grey}" stroke-width="2"/>`+env(-6,1,.28)+`<path d="M-1 1 h8" stroke="${C.grey}" stroke-width="2"/>`+mag(-7,7,.25)+`<path d="M-1 8 h8" stroke="${C.grey}" stroke-width="2"/>`)}),
        bg(3)+lock(70,46,1.1)+B(34,.9,{arms:"reach",mood:"think",item:plug("")})+kid(100,82,.9,C.grn)+key(100,22,.8) ],
    l:[["провод под каждого — каша","a cable each — a mess"],["один разъём для всех","one socket for all"],["сервер даёт список","the server lists tools"],["права проверяешь ты","you check the rights"]],
    c:["MCP — как USB: один разъём вместо кабеля под каждый прибор. А кому что можно — решаешь ты.","MCP is like USB: one socket instead of a cable per device. Who may do what is still up to you."] };

  const dots50=(x0,red)=>Array.from({length:50},(_,i)=>dot(x0+(i%10)*6.4,14+Math.floor(i/10)*7,2.6,red.includes(i)?C.red:C.grn)).join("");
  Z[G4+"Оценка: «вроде норм» — не метрика"]={
    p:[ bg(0)+ok(84,22,1.1)+ok(104,34,1.1)+ok(84,48,1.1)+B(44,.95,{arms:"up",mood:"happy"}),
        bg(1)+dots50(52,[3,7,11,14,18,22,25,29,31,36,38,41,44,47,48])+B(26,.9,{mood:"sad",arms:"down"}),
        bg(2)+dots50(52,[])+txt(80,62,"50/50",10,C.grn)+B(26,.9,{arms:"push",mood:"happy",item:sw(0,0,true,.8)}),
        bg(3)+B(30,.95,{arms:"hold",mood:"think",glasses:true,item:H(tc(26,14,"8/10",8,C.blue))})+card(88,30,40,18,"#fff",txt(0,4,"42 = 42",8,C.grn))+bhead(88,58,1.3)+ok(104,58,.7) ],
    l:[["на трёх примерах — ура","three examples — hooray"],["на пятидесяти — хуже","fifty — actually worse"],["набор на каждое изменение","full set on every change"],["судья-модель и сверка","judge model + exact match"]],
    c:["Три удачных примера — впечатление. Набор из пятидесяти на каждое изменение — уже факт.","Three good examples are a feeling. A fifty-case set run on every change is a fact."] };

  /* ===== в проде на Java ===== */
  Z[G5+"Вызов модели из Java"]={
    p:[ bg(0)+cloud(94,26,1)+ar(52,26,72,26)+txt(62,18,"POST",7,C.blue)+ar(80,50,62,58,C.grn)+txt(92,58,"{ }",10,C.grn)+B(34,.9,{arms:"carry",mood:"smile",item:env(0,0,.7)+key(14,4,.4)}),
        bg(1)+B(34,.9,{arms:"hold",mood:"think",item:gear(0,0,.6,C.yel)})+`<path d="M44 70 H66 M66 22 V70 M66 22 H82 M66 46 H82 M66 70 H82" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`+cloud(100,20,.55,"#ffe9a8")+cloud(100,46,.55,"#cfe5fb")+cloud(100,70,.55,"#f6cad8"),
        bg(2)+card(22,30,28,22,"#fff",txt(0,5,"{ }",12,C.grn))+arrowR(38,30,56)+B(78,.95,{arms:"hold",mood:"happy",item:H(card(0,0,30,20,"#fff",txt(0,-2,"record",7,C.bot2)+`<path d="M-10 4 h20" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`))}),
        bg(3)+card(70,46,22,28,"#fff",sw(0,0,true,.9))+cloud(100,22,.55,"#ffe9a8")+no(110,28,.5)+cloud(100,72,.55,"#cfe5fb")+ok(110,76,.5)+B(32,.9,{arms:"reach",mood:"happy"}) ],
    l:[["это просто HTTP","it's just HTTP"],["одна обёртка на всех","one wrapper for all"],["JSON → record","JSON → record"],["сменить — в конфиге","switch it in config"]],
    c:["Для Java я — просто HTTP-API. Обёртка вроде LangChain4j прячет поставщика: сменить — в конфиге.","To Java I'm just an HTTP API. A wrapper like LangChain4j hides the vendor: switch it in config."] };

  Z[G5+"Стриминг ответа до пользователя"]={
    p:[ bg(0)+kid(100,82,.9,C.red,"sad")+clock(98,16,.9,10)+txt(72,18,"10 s",10,C.red)+B(38,.9,{arms:"carry",mood:"sweat",item:box(0,10,30,22,null)}),
        bg(1)+[[62,52],[74,46]].map(p=>R(p[0],p[1],7,7,C.grn,{rx:1.5})).join("")+B(34,.9,{arms:"reach",mood:"happy",item:R(-4,-4,8,8,C.grn,{rx:1.5})})+kid(100,82,.9,C.red),
        bg(2)+R(6,10,108,14,"#fff",{st:C.ink,rx:7})+[30,50,70,90].map(x=>R(x,13.5,8,7,C.grn,{rx:2})).join("")+txt(70,40,"SSE",9,C.blue)+txt(70,54,"Flux",9,C.bot2)+txt(100,54,"Multi",9,C.bot2)+B(26,.9,{arms:"up",mood:"happy"}),
        bg(3)+sw(66,50,false,1.2)+`<path d="M98 76 V44 H114 V76" fill="none" stroke="${C.wood2}" stroke-width="2"/>`+no(106,30,.7)+B(34,.9,{arms:"reach",mood:"think"}) ],
    l:[["ждать всё — уйдут","wait for all — users leave"],["отдаю кусками сразу","hand over chunks at once"],["один долгий HTTP-ответ","one long HTTP response"],["ушёл — закрываю поток","user gone — close it"]],
    c:["Первые слова готовы через полсекунды — шлю их сразу. Только не забудь таймаут и закрытие.","First words are ready in half a second, so I send them at once. Don't forget timeout and close."] };

  Z[G5+"Токены — это деньги и время"]={
    p:[ bg(0)+chip(84,40)+coin(104,68,.8)+coin(64,68,.8)+B(32,.9,{arms:"carry",mood:"think",item:wc(0,0,18)})+arrowR(46,30,64),
        bg(1)+R(6,66,22,6,"#cfe5fb",{st:C.ink,sw:.9})+coin(17,56,.7)+[0,1].map(j=>R(34,66-j*7,22,6,"#cfe5fb",{st:C.ink,sw:.9})).join("")+coin(40,46,.7)+coin(50,46,.7)+B(88,.9,{arms:"carry",mood:"sweat",item:[0,1,2,3].map(j=>R(-11,4-j*6,22,6,j===3?"#ffe9a8":"#cfe5fb",{st:C.ink,sw:.9})).join("")})+txt(56,18,"×3",11,C.red),
        bg(2)+[0,1,2,3].map(j=>R(76,66-j*8,26,7,"#cfe5fb",{st:C.ink,sw:.9,op:j>1?.3:1})).join("")+lock(96,26,.9)+txt(76,18,"≤ 500",9,C.red)+B(36,.95,{arms:"reach",mood:"happy",item:scis(0,0,.9)}) ],
    l:[["вход и выход — платно","input and output cost"],["историю — каждый раз","history paid every time"],["обрезать, кэш, лимит","trim, cache, limit"]],
    c:["Каждое слово туда и обратно стоит денег, а старую историю оплачиваешь снова и снова.","Every word in and out costs money, and you pay for old history again and again."] };

  Z[G5+"Что нельзя отправлять в модель и prompt injection"]={
    p:[ bg(0)+cloud(96,28,.9)+arrowR(62,40,84)+B(34,.95,{arms:"hold",mood:"think",item:H(card(0,0,30,18,"#fff",head(-8,0,.6)+txt(5,3,"****",7)))}),
        bg(1)+card(30,40,30,40,"#fff",`<path d="M-10 -12 h20 M-10 -6 h20 M-10 0 h14" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`+card(4,11,16,12,"#ffd9d9",txt(0,4,"!",9,C.red),-8))+B(74,.95,{arms:"hold",mood:"dizzy",item:H(card(0,0,16,12,"#ffd9d9",txt(0,4,"!",9,C.red)))})+coin(108,24,.8)+ar(94,40,104,30,C.red,1.4),
        bg(2)+safe(20,80,1)+B(56,.9,{arms:"push",mood:"smile",flip:true})+kid(100,82,.9,C.grn)+key(100,22,.8)+no(20,36,.6) ],
    l:[["маскирую до отправки","mask before sending"],["в данных — чужая команда","a command hidden in data"],["ключа от сейфа у меня нет","I don't hold the safe key"]],
    c:["Я не отличаю данные от команд. Спасает не просьба, а то, что ключа от сейфа у меня нет.","I can't tell data from commands. Asking nicely won't help — not giving me the safe key will."] };

  Z[G5+"Модель — ненадёжная внешняя зависимость"]={
    p:[ bg(0)+cloud(26,26,.9)+txt(26,29,"429",8,C.red)+txt(56,20,"?",14,C.red)+B(82,.95,{mood:"sweat",arms:"hold",item:clock(0,0,.8,5)}),
        bg(1)+clock(14,18,.8,2)+loopArr(40,30,10,C.bot2)+txt(16,54,"×3",11,C.bot2)+sw(84,40,false,1.3)+B(60,.85,{arms:"reach",mood:"think"}).replace("translate(60 82)","translate(58 82)"),
        bg(2)+cloud(98,20,.6)+no(108,26,.5)+mag(100,54,.9)+B(40,.95,{arms:"carry",mood:"happy",item:box(-8,8,14,14,null)+box(8,8,14,14,null)}),
        bg(3)+funnel(78,38,1)+ar(86,52,104,62,C.grn)+ok(108,72,.6)+ar(90,30,106,22,C.red)+no(110,14,.6)+B(32,.9,{arms:"reach",mood:"happy",item:tc(20,16,"{ }",9)}) ],
    l:[["медленно, 429, падает","slow, 429, or down"],["таймаут, повтор, стоп","timeout, retry, breaker"],["план Б без модели","plan B without the model"],["ответ проверяет код","code checks the answer"]],
    c:["Я внешний сервис и могу молчать. Ставь таймаут и предохранитель, а ответ мой проверяй кодом.","I'm an outside service and may go silent. Use a timeout and a breaker; check my answer in code."] };

  Z[G5+"Где модель не нужна"]={
    p:[ bg(0)+card(84,30,52,20,"#fff",txt(0,4,"\\d{12}",10,C.bot2))+ok(84,56,.9)+B(30,.9,{arms:"point",mood:"wow"}),
        bg(1)+card(60,17,92,18,"#fff",txt(0,4,"1000 × 0.1% = 1",9))+coin(84,62,.9)+coin(100,62,.9)+B(40,.9,{legs:"sit",mood:"sleep"}),
        bg(2)+db(80,50,1)+funnel(80,20,.7,C.yel)+txt(56,16,"SQL",9,C.blue)+B(30,.9,{arms:"point",mood:"smile"}),
        bg(3)+B(34,.95,{arms:"hold",mood:"happy",glasses:true,item:env(0,0,.8)})+card(92,40,26,34,"#fff",[0,1,2].map(i=>`<path d="M-8 ${-9+i*9} l2 2 l3 -4" stroke="${C.grn}" stroke-width="1.6" fill="none"/><path d="M-1 ${-9+i*9} h8" stroke="${C.ink}" stroke-width="1.6"/>`).join(""))+arrowR(58,62,76) ],
    l:[["формат — регулярка","format — a regex"],["комиссия — формула","fee — a formula"],["фильтр — SQL","filter — SQL"],["живой текст — это ко мне","messy text — that's me"]],
    c:["Цифры на ценнике прочитаешь и сам. Зови меня, когда на входе живой текст, а не правило.","You can read a price tag yourself. Call me when the input is messy text, not a rule."] };

  Object.assign(window.ZKSVG, Z);
})();

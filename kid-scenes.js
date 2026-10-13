/* Рисованные сценки к шагам «С нуля» с 11-го по последний (первые 10 — в kid-svg.js).
 * Собраны из десяти пачек по разделам, каждая проверена листом предпросмотра.
 * Формат и набор деталей (window.ZKKIT) — в kid-svg.js; ключ «тема|заголовок». */

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

  const Z={};
  const J="Java: как исполняется|", M="Память|", GCg="Сборка мусора|", O="ОС|", V="Скорость|", F="Java: первая строка|", T="Java: типы|", B="Java: объекты|", SO="SOLID|";

  Z[J+"Java переводит дважды"]={
    p:[ bg(0)+paper(22,40,["int x","= 2;"])+arrowR(40,40,58)+txt(49,32,"javac",7)+card(86,40,40,30,"#fff",txt(0,-3,".class",8,C.blue)+txt(0,8,"CA FE",8,C.ink,700)),
        bg(1)+card(60,20,32,18,"#fff",txt(0,3,".class",8,C.blue))+arr(50,30,26,50)+arr(60,30,60,46)+arr(70,30,96,46)+laptop(24,78,.8)+phone(60,62,.75)+server(98,62,.65),
        bg(2)+card(18,40,26,22,"#fff",txt(0,3,".class",7,C.blue))+arrowR(32,40,42)+G(60,40,.8,chip(0,0,txt(0,3,"JVM",8,"#fff")))+arrowR(79,40,89)+card(104,40,26,22,"#fff",txt(0,-2,"1011",7,C.ink,700)+txt(0,7,"0010",7,C.ink,700)) ],
    l:[["javac: текст → байткод","javac: text → bytecode"],["байткод один для всех","one bytecode for all"],["JVM: байткод → процессор","JVM: bytecode → CPU"]],
    c:["Перевожу дважды: javac — на общий байткод, а JVM на месте — на язык процессора.","Two translations: javac makes common bytecode, then the JVM turns it into CPU language."] };

  Z[J+"JIT: сначала медленно, потом быстро"]={
    p:[ bg(3)+paper(32,40,["i++","x*2"])+clock(32,68,.7,4)+bot(88,82,.8,{mood:"think",glasses:true}),
        bg(4)+card(40,44,34,28,"#fff",txt(0,-1,"i++",10)+txt(0,10,"×1000",7,C.red))+flame(40,26,1)+bot(92,82,.8,{mood:"wow"}),
        bg(0)+card(20,38,26,20,"#fff",txt(0,3,"i++",9))+arrowR(34,38,46)+G(62,38,.7,chip(0,0,spark(0,0,C.yel)))+bot(100,82,.65,{arms:"up"})+line(78,62,86,62,C.blue,2)+line(76,68,88,68,C.blue,2) ],
    l:[["сначала — по строчке","first, line by line"],["этот кусок — горячий!","this bit is hot!"],["скомпилировал — мчит","compiled — now it zooms"]],
    c:["Сначала читаю байткод по строчке. Частые куски перевожу в машинный код — и разгоняюсь.","At first I read bytecode line by line. Hot bits I compile to machine code and speed up."] };

  Z[M+"Стек: место для «прямо сейчас»"]={
    p:[ bg(1)+plate(76,80,46,"#fff","main")+plate(76,46,46,C.yel,"a(): x=2")+arr(76,50,76,68)+bot(24,82,.7,{arms:"reach"}),
        bg(2)+plate(70,80,46,"#fff","main")+plate(70,71,46,C.yel,"a()")+plate(70,62,46,"#ffd7c9","b()")+bot(24,82,.7,{mood:"think"}),
        bg(3)+plate(70,80,46,"#fff","main")+plate(70,71,46,C.yel,"a()")+`<g opacity=".5">${plate(70,36,46,"#ffd7c9","b()")}</g>`+arr(70,58,70,42)+spark(102,24)+bot(24,82,.7,{arms:"up"}) ],
    l:[["вызвал — кадр сверху","call — frame on top"],["кадр на кадре","frame on frame"],["вернулся — кадр снят","return — frame removed"]],
    c:["Позвали метод — кладу тарелку сверху. Метод кончился — снимаю. Убирать ничего не надо.","A method call puts a plate on top. When it ends, I lift it off. No cleanup needed."] };

  Z[M+"Куча: место для «надолго»"]={
    p:[ bg(2)+zone(54,12,60,58)+box(72,62,14,12)+box(96,62,14,12)+box(84,40,14,12)+bot(22,82,.75,{arms:"hold"})+box(22,72,12,10,null,C.yel)+arr(36,50,52,50),
        bg(3)+zone(54,12,60,58)+box(72,62,14,12)+box(96,62,14,12)+box(84,40,14,12,null,C.yel)+kid(20,82,.85,C.red)+curve(26,52,80,34,C.red,true),
        bg(4)+zone(54,12,60,58,"#fff",true)+box(72,62,14,12)+box(96,62,14,12)+truck(40,82,.95)+box(32,63,12,10,null,C.yel) ],
    l:[["объект — в кучу","object goes to the heap"],["кто-то помнит — лежит","remembered — it stays"],["забыли — GC увёз","forgotten — GC takes it"]],
    c:["В куче вещи лежат долго, пока на них кто-то ссылается. Забыли все — приезжает GC.","Things in the heap stay while someone refers to them. Once all forget, GC takes them."] };

  Z[M+"Ссылка — это просто адрес"]={
    p:[ bg(3)+house(88,80,1.15,C.yel)+txt(88,42,"#42",9)+bot(30,82,.8,{arms:"hold"})+card(30,64,24,12,"#fff",txt(0,3,"#42",7)),
        bg(4)+house(60,80,1.1,C.yel)+kid(16,82,.8,C.red)+kid(104,82,.8,C.blue)+card(16,30,20,11,"#fff",txt(0,3,"#42",6.5))+card(104,30,20,11,"#fff",txt(0,3,"#42",6.5))+curve(26,30,48,48,C.ink,true)+curve(94,30,72,48,C.ink,true),
        bg(0)+house(60,80,1.1,C.red)+kid(16,82,.8,C.red,"wow")+kid(104,82,.8,C.blue,"wow")+spark(44,30,C.red)+spark(78,26,C.red)+txt(60,26,"!",12,C.red) ],
    l:[["в переменной — адрес","variable = an address"],["две копии — один дом","two copies — one house"],["перекрасил — видят оба","repainted — both see it"]],
    c:["В переменной не сам дом, а его адрес. Дал адрес другу — мы оба ходим в один дом.","A variable holds an address, not the house. Share it, and we both visit the same house."] };

  Z[M+"null — это адрес, которого нет"]={
    p:[ bg(1)+bot(30,82,.8,{arms:"hold"})+card(30,64,26,12,"#fff",txt(0,3,"null",7,C.red))+`<rect x="74" y="44" width="34" height="30" rx="3" fill="none" stroke="${C.grey}" stroke-width="1.6" stroke-dasharray="4 3"/>`+txt(91,64,"?",14,C.grey),
        bg(2)+bot(20,82,.7,{mood:"think"})+curve(34,48,98,56,C.grey,true)+txt(98,44,"?",18,C.red)+txt(66,70,"null",8,C.grey),
        bg(3)+bot(24,82,.7,{mood:"sad"})+no(76,32,1.6)+txt(76,62,"NullPointerException",5.8,C.red) ],
    l:[["в записи — null","the note says null"],["идти некуда","nowhere to go"],["NPE — честная ошибка","NPE — an honest error"]],
    c:["null — пустая строчка вместо адреса. Пойти по ней нельзя, и я честно кричу: NPE!","null is an empty line instead of an address. I can't go there, so I shout: NPE!"] };

  const young=(dead)=>[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1],[0,2],[1,2],[2,2]].map(([i,j],n)=>sq(19+i*13,28+j*14,10,C.yel,dead&&n!==2&&n!==7)).join("");
  Z[GCg+"Гипотеза поколений — почему GC вообще быстрый"]={
    p:[ bg(2)+zone(8,14,48,56)+young(true)+zone(64,14,48,56,"#efe7ff")+sq(80,52,10,C.blue)+sq(96,52,10,C.blue)+sq(88,38,10,C.blue),
        bg(3)+zone(8,14,48,56)+young(true)+zone(64,14,48,56,"#efe7ff")+sq(80,52,10,C.blue)+sq(96,52,10,C.blue)+sq(88,38,10,C.blue)+curve(45,30,82,24,C.grn)+curve(32,58,98,36,C.grn),
        bg(4)+zone(8,14,48,56)+zone(64,14,48,56,"#efe7ff")+clock(32,32,1,2)+txt(32,60,"×10",11,C.grn)+clock(88,32,1,10)+txt(88,60,"×1",11,C.red) ],
    l:[["молодые почти все умерли","most young ones died"],["живых — переносим","move the survivors"],["молодых чаще, старых реже","young often, old rarely"]],
    c:["Почти все объекты умирают молодыми. Молодых убираю часто и дёшево, старых — редко.","Most objects die young. I clean the young often and cheaply, the old rarely."] };

  Z[GCg+"Пауза — вот что на самом деле важно"]={
    p:[ bg(3)+laptop(56,62,1.3,`<path d="M-4 -17 v8 M3 -17 v8" stroke="${C.red}" stroke-width="2.6" stroke-linecap="round"/>`)+kid(16,82,.8,C.blue,"sad")+clock(100,22,.9,6)+txt(100,44,"200 ms",8,C.red),
        bg(4)+tline(14,28,92,[[40,26]])+tline(14,52,92,[[10,3],[30,3],[50,3],[70,3]])+no(110,32,.6)+ok(110,56,.6)+txt(60,22,"1 × 200 ms",7)+txt(60,72,"4 × 5 ms",7),
        bg(0)+seesaw(60,78,-8)+gear(26,48,.8)+clock(94,54,.8,3)+txt(60,24,"⇄",14) ],
    l:[["программа встала","the app froze"],["паузы по чуть-чуть","tiny pauses instead"],["скорость против пауз","throughput vs pauses"]],
    c:["Меня судят по паузам: сколько мс программа стоит. Короче паузы — больше лишней работы.","I'm judged by pauses: how many ms the app stands still. Shorter pauses cost extra work."] };

  const dirt=[[10,90,20,5],[40,15,80,30],[5,60,15,95]];
  const grid=(hi,done)=>dirt.map((r,j)=>r.map((v,i)=>{ const x=10+i*25,y=12+j*19,top=v>=80; const f=done&&top?"#d6f2da":`rgba(168,113,63,${(v/100*.8+.1).toFixed(2)})`;
    return `<rect x="${x}" y="${y}" width="22" height="16" rx="3" fill="${f}" stroke="${hi&&top?C.red:C.ink}" stroke-width="${hi&&top?2.2:1}"/>`+(done&&top?tick(x+11,y+8):txt(x+11,y+11,v+"%",6.5,v>50?"#fff":C.ink)); }).join("")).join("");
  Z[GCg+"G1 — выбор по умолчанию"]={
    p:[ bg(4)+grid(false,false),
        bg(0)+grid(true,false)+bot(108,82,.42,{glasses:true,mood:"think"}),
        bg(1)+grid(false,true)+clock(98,80-6,.55,2)+txt(70,82,"≤ 200 ms",7,C.grn) ],
    l:[["куча — много регионов","heap split into regions"],["сначала где мусора больше","dirtiest ones first"],["уложился в паузу","stayed within the pause"]],
    c:["Делю кучу на комнатки и убираю сначала самые грязные — сколько успею за паузу.","I split the heap into rooms and clean the dirtiest first, as much as fits in a pause."] };

  Z[GCg+"ZGC — когда паузы критичны"]={
    p:[ bg(4)+laptop(40,76,1,txt(0,-10,"✓",9,C.grn))+kid(14,82,.75,C.red)+bot(92,82,.75,{arms:"hold"})+broom(86,80,.8),
        bg(0)+tline(14,40,92,[[16,1],[38,1],[60,1],[82,1]])+txt(60,30,"< 1 ms",10,C.grn)+ok(60,62,1),
        bg(1)+db(36,50,1.2,C.blue)+txt(36,80,"+RAM",8)+gear(86,44,1.1)+txt(86,80,"+CPU",8) ],
    l:[["убираю, пока ты работаешь","I clean while you work"],["пауза меньше 1 мс","pause under 1 ms"],["плата: память и CPU","price: memory and CPU"]],
    c:["Убираю параллельно с программой, паузы меньше миллисекунды. Плата — память и CPU.","I clean alongside the app, pauses under a millisecond. The price is memory and CPU."] };

  Z[GCg+"Два разных OutOfMemory"]={
    p:[ bg(1)+zone(30,22,60,50)+box(44,72,14,12)+box(60,72,14,12)+box(76,72,14,12)+box(52,60,14,12)+box(68,60,14,12)+box(60,48,14,12)+box(60,36,14,12)+box(48,24,14,12)+box(72,24,14,12)+no(104,20,.9),
        bg(2)+zone(30,22,60,50,"#efe7ff")+[0,1,2,3,4,5].map(i=>card(42+(i%3)*18,34+Math.floor(i/3)*20,14,16,"#3f6fd0",txt(0,3,"{ }",6,"#fff"),(i%2?6:-6))).join("")+gear(16,62,.7)+arr(24,56,32,50)+no(104,20,.9)+txt(60,16,"Metaspace",7),
        bg(3)+mag(30,40,1.4)+box(30,70,14,10)+line(60,16,60,74,C.grey,1.4,true)+gear(90,42,1.2)+`<path d="M84 64 a8 8 0 1 0 12 0" fill="none" stroke="${C.grn}" stroke-width="2"/><path d="M94 60 l2 4 l-4 1" fill="none" stroke="${C.grn}" stroke-width="2"/>` ],
    l:[["кончилась куча","out of heap"],["кончилось место классам","out of class space"],["и лечатся по-разному","and the cures differ"]],
    c:["Два «нет места»: в куче под объекты и в Metaspace под классы. Причины ищу разные.","Two kinds of no room: heap for objects, Metaspace for classes. Different causes."] };

  Z[GCg+"Утечка в Java существует"]={
    p:[ bg(0)+card(22,30,30,16,C.blue,txt(0,3,"static",7,"#fff"))+[[72,40],[96,40],[72,64],[96,64]].map(([x,y])=>line(36,32,x-6,y-6,C.red,1.4)+box(x,y,14,12)).join(""),
        bg(1)+card(22,30,30,16,C.blue,txt(0,3,"static",7,"#fff"))+line(36,32,66,30,C.red,1.4)+line(36,34,66,50,C.red,1.4)+box(74,36,14,12)+box(74,56,14,12)+truck(94,82,.75)+no(102,34,.8),
        bg(2)+card(22,30,30,16,C.blue,txt(0,3,"static",7,"#fff"))+line(36,32,88,56,C.red,1.6)+box(96,64,14,12)+mag(30,52,1.3)+bot(62,82,.55,{glasses:true,mood:"think"}) ],
    l:[["static-список держит всё","a static list holds it all"],["GC не может увезти","GC can't take them"],["heap dump: кто держит?","heap dump: who holds it?"]],
    c:["Пока я сам держу ссылку, GC считает вещь нужной. Heap dump покажет, кто держит.","While I hold a reference, GC thinks it's needed. A heap dump shows who holds it."] };

  Z[O+"Программа не трогает железо напрямую"]={
    p:[ bg(2)+bot(26,82,.8,{arms:"reach"})+db(88,58,1,C.grey)+lock(88,26,.9)+no(58,34,.8),
        bg(3)+bot(22,82,.75,{arms:"reach"})+paper(52,44,["read()"])+server(94,58,1)+txt(94,28,"OS",9),
        bg(4)+server(30,58,1)+txt(30,28,"OS",9)+key(60,22,.8)+ok(84,22,.8)+box(62,74,14,12,null,C.yel)+arr(44,62,54,66)+bot(96,82,.75,{arms:"hold"}) ],
    l:[["к диску напрямую — нельзя","no direct access to disk"],["пишу заявку ОС","I ask the OS"],["проверила и выдала","checked and handed over"]],
    c:["Я не лезу к диску сам — прошу ОС. Она проверит права и принесёт. Это системный вызов.","I don't touch the disk — I ask the OS. It checks rights and fetches. That's a system call."] };

  Z[O+"Процесс — это программа со своей памятью"]={
    p:[ bg(3)+laptop(28,74,1,play(0,-13,C.grn).replace(/r="10"/,'r="6"'))+arrowR(50,56,64)+house(90,80,1.3,C.yel)+txt(90,36,"PID 7",7),
        bg(4)+house(30,80,1.3,C.yel)+house(90,80,1.3,C.blue)+box(30,58,10,8,null,C.red)+box(90,58,10,8,null,C.grn)+lock(30,34,.6)+lock(90,34,.6),
        bg(0)+house(86,80,1.3,C.blue)+lock(86,70,.7)+bot(34,82,.8,{arms:"reach",mood:"sad"})+no(60,30,1) ],
    l:[["запуск — новый процесс","launch — a new process"],["у каждого своя память","each has its own memory"],["в чужую — нельзя","no entry to others"]],
    c:["Каждой программе ОС даёт свою комнату-память. В чужую комнату зайти нельзя.","The OS gives each program its own memory room. Nobody can enter someone else's."] };

  const room=`<rect x="6" y="10" width="108" height="66" rx="6" fill="#fff" fill-opacity=".5" stroke="${C.ink}" stroke-width="1.1"/>`;
  Z[O+"Поток — рабочий внутри процесса"]={
    p:[ bg(1)+room+card(60,30,26,16,"#fff",txt(0,3,"x = 1",7))+kid(22,82,.75,C.red)+kid(60,82,.75,C.grn)+kid(98,82,.75,C.blue),
        bg(2)+room+card(60,30,26,16,"#fff",txt(0,3,"x = 1",7))+kid(30,82,.75,C.red,"wow")+kid(90,82,.75,C.blue,"wow")+arr(36,52,48,36)+arr(84,52,72,36)+txt(18,30,"+1",9,C.red)+txt(102,30,"+1",9,C.blue),
        bg(3)+room+card(60,30,30,16,"#fff",txt(0,3,"x = 2",8))+no(60,58,1)+txt(96,34,"≠ 3",9,C.red)+kid(20,82,.75,C.red,"sad") ],
    l:[["память у всех общая","shared memory for all"],["двое правят одно","two edit the same thing"],["одна правка пропала","one edit got lost"]],
    c:["Потоки живут в одной памяти. Если двое разом правят x, одна правка может пропасть.","Threads share one memory. If two change x at once, one change can get lost."] };

  Z[V+"Главное число в программировании: всё разное по скорости"]={
    p:[ bg(0)+G(60,38,.8,chip(0,0,spark(0,0)))+txt(60,70,"1",13,C.grn),
        bg(1)+`<rect x="40" y="46" width="50" height="4" rx="2" fill="${C.wood}"/><path d="M46 50 v20 M84 50 v20" stroke="${C.wood2}" stroke-width="3"/>`+box(65,46,14,12,null,C.yel)+bot(22,82,.6,{arms:"reach"})+txt(65,24,"10",13,C.grn),
        bg(2)+`<path d="M60 72 V40 L82 26 L104 40 V72 Z" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/><rect x="75" y="54" width="14" height="18" fill="${C.wood2}"/>`+line(14,76,56,76,C.grey,2,true)+bot(14,82,.5)+txt(34,30,"300",13,C.yel),
        bg(3)+db(36,50,1,C.grey)+cal(84,32,1.2,"30")+cal(84,60,1.2,"30"),
        bg(4)+cloud(32,30,1)+server(32,62,.6)+[0,1,2].map(i=>cal(72+i*14,40+i*8,1)).join("")+txt(86,22,"…",14) ],
    l:[["такт — 1 секунда","a tick — 1 second"],["кэш — 10 секунд","cache — 10 seconds"],["память — 5 минут","RAM — 5 minutes"],["диск — месяцы","disk — months"],["сеть — годы","network — years"]],
    c:["Если мой шаг — секунда, то память — минуты, диск — месяцы, а сеть — годы. Ждать дорого!","If my step is a second, RAM is minutes, disk is months and network is years. Waiting costs!"] };

  Z[V+"Отсюда взялись кэши, очереди и асинхронность"]={
    p:[ bg(2)+fridge(30,80,1)+bot(66,82,.75,{arms:"hold"})+onion(66,68)+house(106,60,.5,C.grey)+line(98,62,82,62,C.grey,1.4,true),
        bg(3)+[0,1,2].map(i=>env(22,30+i*14,.6)).join("")+box(46,72,22,26,null,C.red)+arr(30,50,40,52)+bot(90,82,.75,{arms:"reach"})+gear(106,40,.6),
        bg(4)+server(22,60,.7)+server(46,60,.7)+server(70,60,.7)+server(94,60,.7)+env(58,20,.7)+arr(50,22,24,38)+arr(66,22,92,38) ],
    l:[["копия рядом — кэш","a copy nearby — cache"],["кинул и дальше — очередь","drop and go — a queue"],["раздал многим машинам","spread over many machines"]],
    c:["Ждать дорого. Поэтому держу копию рядом, не стою в очереди и раздаю работу многим машинам.","Waiting is costly: I keep a copy near, don't stand in line and spread work over many machines."] };

  Z[F+"Что вообще нужно, чтобы запустить Java"]={
    p:[ bg(0)+zone(6,8,108,64,"#fff")+txt(20,20,"JDK",8)+txt(20,46,"javac",6.5,C.blue)+zone(38,18,72,48,C.yel)+txt(52,30,"JRE",8)+zone(60,30,46,32,C.bot)+txt(83,50,"JVM",9,"#fff"),
        bg(1)+paper(22,40,["Main",".java"])+arrowR(40,40,62)+txt(51,32,"javac",7)+card(88,40,36,26,"#fff",txt(0,3,".class",8,C.blue))+bot(60,82,.45,{arms:"up"}),
        bg(2)+card(20,36,30,22,"#fff",txt(0,3,".class",7,C.blue))+arrowR(36,36,46)+G(64,36,.8,chip(0,0,txt(0,3,"JVM",8,"#fff")))+play(102,36)+bot(64,84,.4,{arms:"up"}) ],
    l:[["JDK ⊃ JRE ⊃ JVM","JDK ⊃ JRE ⊃ JVM"],["javac собирает","javac compiles"],["JVM исполняет","the JVM runs it"]],
    c:["Ставлю JDK — и есть всё: javac переводит, java запускает, а JVM исполняет байткод.","Install the JDK and you get it all: javac translates, java launches, the JVM runs bytecode."] };

  const code=(x,y,w,ls,col)=>card(x,y,w,ls.length*10+8,"#fff",ls.map((l,i)=>txt(0,-ls.length*5+9+i*10,l,6.8,i===1?(col||C.blue):C.ink,700)).join(""));
  Z[F+"Минимальная программа и почему она такая"]={
    p:[ bg(0)+code(60,40,84,["class Main {","main(String[] a)","}"]),
        bg(1)+code(46,36,76,["class Main {","main(String[] a)","}"],C.grn)+mag(70,38,1.1)+ok(96,64,1)+bot(18,84,.45,{glasses:true,mood:"think"}),
        bg(2)+code(50,36,76,["class Main {","mian(String[] a)","}"],C.red)+no(96,64,1.1)+bot(20,84,.45,{mood:"sad"}) ],
    l:[["код живёт в классе","code lives in a class"],["JVM ищет ровно main","the JVM looks for main"],["иначе не запустится","otherwise it won't start"]],
    c:["JVM ищет в классе метод main с точной подписью. Ошибёшься в имени — не запустит.","The JVM looks for main with an exact signature. Get the name wrong and it won't start."] };

  Z[F+"Что происходит при запуске, по шагам"]={
    p:[ bg(0)+paper(30,40,["Main",".java"])+arrowR(48,40,66)+card(90,40,32,24,"#fff",txt(0,3,".class",8,C.blue)),
        bg(1)+laptop(40,72,1.2,txt(0,-10,"java Main",4.6,C.ink))+arrowR(66,50,78)+G(96,44,.65,chip(0,0,txt(0,3,"JVM",8,"#fff"))),
        bg(2)+shelf(40,40,52,[C.red,C.grn,C.blue,C.yel,C.red,C.grn])+shelf(40,66,52,[C.blue,C.yel,"#3f6fd0",C.grn,C.red,C.blue])+`<rect x="46.5" y="50" width="7" height="18" rx="1" fill="none" stroke="${C.red}" stroke-width="1.6"/>`+mag(92,40,1.2),
        bg(3)+shield(60,40,1.6,tick(0,0,"#fff"))+txt(60,76,".class",8,C.blue),
        bg(4)+gear(30,40,1)+arrowR(46,40,62)+play(82,40)+txt(82,64,"main",8)+bot(108,84,.4,{arms:"up"}) ],
    l:[["javac: .java → .class","javac: .java → .class"],["java Main: старт JVM","java Main: JVM starts"],["нашла класс и загрузила","found and loaded it"],["проверила байткод","checked the bytecode"],["инициализация, потом main","init, then main"]],
    c:["javac делает .class. Потом JVM находит класс, грузит, проверяет, готовит и зовёт main.","javac makes a .class. Then the JVM finds, loads, checks and prepares it, and calls main."] };

  Z[F+"Пакет — это фамилия класса"]={
    p:[ bg(1)+[0,1,2].map(i=>card(26+i*34,42,28,20,"#fff",txt(0,3,"Order",7))).join("")+txt(60,20,"?",14,C.red),
        bg(2)+card(60,26,96,18,"#fff",txt(0,3,"com.acme.orders.Order",6.8,C.ink)+``)+card(60,56,96,18,"#fff",txt(0,3,"com.shop.Order",6.8))+ok(108,26,.6)+ok(108,56,.6),
        bg(3)+folder(16,40,1)+txt(16,58,"com",6)+arrowR(30,42,40)+folder(52,40,1,C.yel)+txt(52,58,"acme",6)+arrowR(66,42,76)+folder(88,40,1)+txt(88,58,"orders",6)+card(88,72,40,10,"#fff",txt(0,2.5,"Order.java",6)) ],
    l:[["Order — их тысячи","thousands of Order"],["пакет — как фамилия","a package is a surname"],["пакет = папки","package = folders"]],
    c:["Класс Order не один в мире. Пакет — его фамилия с адресом, и лежит он в таких же папках.","There are many Order classes. A package is its surname, and it lives in matching folders."] };

  const shelves=(hl)=>[0,1,2,3].map(i=>shelf(16+i*28,60,24,[C.red,C.blue,C.grn])).join("")+(hl?`<rect x="2" y="38" width="84" height="30" rx="4" fill="none" stroke="${C.grn}" stroke-width="1.6" stroke-dasharray="4 3"/>`+txt(44,32,"classpath",6.5,C.grn):"");
  Z[F+"Classpath — где JVM ищет классы"]={
    p:[ bg(4)+shelves(true)+mag(74,20,.8),
        bg(0)+shelves(true)+`<rect x="98" y="44" width="7" height="16" rx="1" fill="${C.yel}" stroke="${C.red}" stroke-width="1.6"/>`+txt(101,36,"!",10,C.red),
        bg(1)+no(72,30,1.5)+txt(60,58,"ClassNotFoundException",5.4,C.red)+bot(22,84,.4,{mood:"sad"}) ],
    l:[["ищу только в classpath","only on the classpath"],["а класс лежит в другом","but the class is elsewhere"],["и класса «как бы нет»","so the class \"isn't there\""]],
    c:["Ищу классы только по classpath. Лежит класс в другом шкафу — для меня его нет.","I only search the classpath. If a class sits on another shelf, for me it doesn't exist."] };

  Z[F+"Почему в Java всё такое многословное"]={
    p:[ bg(2)+card(30,40,30,22,"#fff",txt(0,3,"x=f(y)",6.5))+card(84,40,40,50,"#fff",lines(-14,-18,28,7,C.blue))+clock(56,70,.6,8),
        bg(3)+card(60,30,40,40,"#fff",lines(-14,-12,28,6,C.blue))+kid(22,82,.7,C.red)+kid(98,82,.7,C.grn)+ok(60,62,.8),
        bg(4)+cal(20,22,1,"+3")+card(48,48,24,22,"#fff",txt(0,3,"x=f(y)",5.5))+txt(48,28,"?",11,C.red)+card(92,46,30,40,"#fff",lines(-10,-14,20,6,C.blue))+ok(92,74,.6) ],
    l:[["писать дольше","slower to write"],["читать легче","easier to read"],["через годы всё ясно","still clear years later"]],
    c:["В Java всё явно: типы, доступ, ошибки. Писать дольше, зато через годы всем понятно.","Java spells it all out: types, access, errors. Slower to write, clear for years."] };

  Z[T+"Два сорта значений: примитивы и объекты"]={
    p:[ bg(0)+bot(60,82,.95,{arms:"hold"})+box(60,70,14,13,"5",C.grn)+txt(60,18,"int",9,C.blue),
        bg(1)+bot(26,82,.8,{arms:"hold"})+card(26,68,24,11,"#fff",txt(0,3,"#42",6.5))+zone(64,14,50,58,"#fff",true)+house(89,64,1,C.yel)+curve(36,62,80,40,C.ink,true) ],
    l:[["int: значение в руках","int: the value in hand"],["объект: в руках адрес","object: an address in hand"]],
    c:["Число держу прямо в руках. А объект лежит в куче — у меня только его адрес.","A number I hold in my hands. An object lives in the heap — I only hold its address."] };

  const gift=(x,y,t)=>`<rect x="${x-9}" y="${y-18}" width="18" height="18" rx="2" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/><path d="M${x} ${y-18} v18 M${x-9} ${y-9} h18" stroke="${C.yel}" stroke-width="2.4"/><circle cx="${x}" cy="${y-20}" r="2.6" fill="${C.yel}"/>`+(t?txt(x,y-6,t,7,"#fff"):"");
  Z[T+"Автобоксинг — тихая подмена"]={
    p:[ bg(1)+`<circle cx="22" cy="44" r="10" fill="${C.grn}"/>`+txt(22,48,"5",10,"#fff")+txt(22,68,"int",7)+arrowR(36,44,64)+txt(50,36,"new",6.5,C.red)+gift(90,58,"5")+txt(90,72,"Integer",6.5),
        bg(2)+txt(28,22,"×1000",9,C.red)+[[60,72],[78,72],[96,72],[69,52],[87,52],[78,32],[42,72]].map(([x,y])=>gift(x,y)).join("")+bot(18,84,.45,{mood:"wow"}),
        bg(3)+txt(46,30,"127 == 127",8)+ok(98,27,.8)+txt(46,58,"1000 == 1000",8)+no(98,55,.8) ],
    l:[["int → Integer: упаковка","int → Integer: boxing"],["в цикле — гора коробок","a loop makes a box pile"],["== вдруг врёт","== suddenly lies"]],
    c:["Java сама кладёт int в коробку Integer. Удобно, но каждая коробка — новый объект.","Java quietly boxes int into Integer. Handy, but each box is a new object."] };

  Z[T+"== сравнивает адреса, equals сравнивает содержимое"]={
    p:[ bg(4)+book(32,46,C.red,"abc")+book(88,46,C.red,"abc")+txt(60,50,"==",11)+no(60,24,.9),
        bg(0)+book(32,46,C.red,"abc")+book(88,46,C.red,"abc")+txt(60,50,"equals",7.5,C.blue)+ok(60,24,.9)+mag(88,40,.7),
        bg(1)+book(60,30,C.red,"abc")+kid(18,82,.75,C.blue)+kid(102,82,.75,C.grn)+arr(26,52,46,38)+arr(94,52,74,38)+txt(60,66,"==",10)+ok(60,78,.6) ],
    l:[["==: та же книга? нет","==: the same book? no"],["equals: текст тот же? да","equals: same text? yes"],["один объект — == да","one object — == is true"]],
    c:["== спрашивает: это та же самая книга? equals — одинаковый ли в книгах текст?","== asks: is it the very same book? equals asks: is the text the same?"] };

  Z[T+"Строки нельзя изменить"]={
    p:[ bg(2)+sign(26,30,26,"\"ab\"")+txt(48,33,"+",10)+sign(66,30,20,"\"c\"")+arr(46,42,60,58)+sign(70,66,34,"\"abc\"")+txt(26,52,"✓",9,C.grey),
        bg(3)+[["a",20,24],["ab",54,22],["abc",90,28],["abcd",32,50],["abcde",80,54]].map(([t,x,y],i)=>sign(x,y,10+t.length*6,t,null,true)).join("")+bot(108,84,.4,{mood:"sad"})+txt(20,74,"×1000",7,C.red),
        bg(4)+card(60,36,92,22,"#fff",txt(0,3,"abcde…",9)+`<path d="M38 -6 v12" stroke="${C.red}" stroke-width="1.6"/>`)+txt(60,62,"StringBuilder",8,C.blue)+ok(104,62,.6) ],
    l:[["+ даёт новую табличку","+ makes a new sign"],["в цикле — гора старых","a loop leaves a pile"],["StringBuilder дописывает","StringBuilder appends"]],
    c:["Строку не исправить — только сделать новую. Для склейки в цикле бери StringBuilder.","A string can't change — only a new one is made. Use StringBuilder to glue in a loop."] };

  const pool=`<rect x="36" y="10" width="78" height="40" rx="6" fill="#fff" fill-opacity=".6" stroke="${C.ink}" stroke-width="1.1"/>`+`<rect x="40" y="38" width="70" height="3" rx="1" fill="${C.wood2}"/>`;
  Z[T+"Пул строк: почему литералы ведут себя иначе"]={
    p:[ bg(0)+pool+sign(75,28,28,"\"hi\"")+kid(18,82,.8,C.red)+arr(26,48,58,32),
        bg(1)+pool+sign(75,28,28,"\"hi\"")+kid(16,82,.8,C.red)+kid(40,82,.8,C.blue)+arr(22,48,60,34)+arr(44,48,66,36)+txt(84,64,"==",9)+ok(104,62,.7),
        bg(2)+pool+sign(75,28,28,"\"hi\"")+sign(80,66,28,"\"hi\"")+txt(48,68,"new",8,C.red)+kid(18,82,.8,C.red)+txt(80,82,"==",7)+no(104,80,.5) ],
    l:[["литерал — на общую полку","a literal goes to the pool"],["второй берёт тот же","the second one reuses it"],["new — своя копия","new — its own copy"]],
    c:["Одинаковые литералы Java берёт с общей полки. А new String всегда делает свою копию.","Equal literals come from one shared shelf. new String always makes its own copy."] };

  Z[T+"null — не ноль и не пустота"]={
    p:[ bg(1)+box(60,70,30,30,"0",C.grn)+txt(60,26,"int",9,C.blue),
        bg(2)+sign(60,50,40,"\"\"")+txt(60,26,"String",8,C.blue)+ok(92,40,.6),
        bg(3)+`<rect x="40" y="38" width="40" height="32" rx="3" fill="none" stroke="${C.grey}" stroke-width="1.6" stroke-dasharray="4 3"/>`+txt(60,26,"null",10,C.red),
        bg(4)+txt(60,24,"null.length()",8)+no(60,52,1.4)+txt(60,76,"NPE",9,C.red) ],
    l:[["0 — это число","0 is a number"],["\"\" — строка, просто пустая","\"\" — a string, just empty"],["null — нет ничего","null — nothing at all"],["тронул null — падение","touch null — crash"]],
    c:["0 — число, \"\" — пустая строка. А null — вообще нет объекта: тронешь — будет NPE.","0 is a number, \"\" is an empty string. null means no object at all: touch it — NPE."] };

  Z[B+"Класс — чертёж, объект — изделие"]={
    p:[ bg(2)+blueprint(60,40,56,50)+bot(102,84,.45,{glasses:true}),
        bg(3)+blueprint(26,40,34,34)+arrowR(46,40,66)+txt(56,32,"new",7,C.red)+chair(90,74,1.2,C.red),
        bg(4)+chair(26,74,1.1,C.red)+chair(60,74,1.1,C.grn)+chair(94,74,1.1,C.blue)+spark(66,44,C.yel)+`<path d="M86 50 l6 4" stroke="#fff" stroke-width="1.4"/>` ],
    l:[["класс — чертёж","a class is a blueprint"],["new — новое изделие","new makes a thing"],["у каждого свои значения","each has its own values"]],
    c:["Класс — чертёж стула. Объекты — сами стулья: чертёж один, а у каждого свой цвет.","A class is a chair blueprint. Objects are the chairs: one plan, each its own colour."] };

  Z[B+"Конструктор — сборка изделия"]={
    p:[ bg(0)+car(42,70,1.2,C.red,false)+wheel(92,72)+wheel(104,72)+txt(60,22,"new",9,C.red),
        bg(1)+`<path d="M86 76 V24 H112 V76" fill="none" stroke="${C.ink}" stroke-width="2"/>`+car(54,80,1.2,C.red,false)+no(99,38,1),
        bg(2)+car(52,82,1.2,C.red)+ok(100,30,1)+line(14,68,24,68,C.grey,2)+line(10,74,22,74,C.grey,2) ],
    l:[["детали по отдельности","loose parts"],["без колёс — не выпущу","no wheels — can't leave"],["собран — поехал","assembled — off it goes"]],
    c:["Конструктор срабатывает при new и следит, чтобы объект вышел целым — не без колёс.","The constructor runs on new and makes sure the object leaves whole — wheels included."] };

  Z[B+"Инкапсуляция — не «спрятать», а «не дать сломать»"]={
    p:[ bg(3)+atm(76,80,1)+kid(32,82,.9,C.red)+arr(44,52,60,52),
        bg(4)+atm(76,80,1)+card(30,30,32,16,"#fff",txt(0,3,"-100",8,C.red))+lock(76,30,.8)+arr(48,30,64,30,C.red)+no(30,60,.9),
        bg(0)+atm(46,80,1)+ok(46,20,.7)+coin(84,58,1.2)+coin(96,66,1)+arr(64,50,78,56) ],
    l:[["снаружи — только кнопки","outside — only buttons"],["в обход — нельзя","no going around"],["через проверку — можно","through the check — ok"]],
    c:["Мои деньги внутри снаружи не тронуть — только кнопками с проверкой. Так меня не сломать.","Nobody can poke my money directly — only buttons with checks. That's how I stay intact."] };

  Z[B+"Наследование — «является», а не «содержит»"]={
    p:[ bg(1)+card(60,20,44,16,"#fff",txt(0,3,"Animal",7))+arr(60,48,60,30)+dog(56,80,1.3)+ok(98,26,.8),
        bg(2)+car(60,78,1.8,C.blue)+`<circle cx="66" cy="48" r="11" fill="#fff" stroke="${C.ink}" stroke-dasharray="3 2"/>`+gear(66,48,.65)+ok(100,22,.8),
        bg(3)+car(30,80,1.1,C.blue)+txt(60,46,"extends",6.5,C.red)+arrowR(46,52,74)+gear(94,52,1)+no(60,22,1) ],
    l:[["собака — животное","a dog is an animal"],["машина содержит мотор","a car has an engine"],["машина — не мотор","a car is not an engine"]],
    c:["extends — только если «является»: собака — животное. А мотор машина просто содержит.","Use extends only for is-a: a dog is an animal. A car just has an engine inside."] };

  Z[B+"Интерфейс — контракт без исполнения"]={
    p:[ bg(4)+socket(60,40,1.4)+plug(84,40)+line(94,40,104,40)+bulb(108,22,false,6)+txt(72,22,"?",11,C.blue),
        bg(0)+factory(22,74,1)+`<path d="M40 70 C 46 56, 40 44, 50 40" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`+socket(60,40,1.4)+plug(80,40)+line(90,40,100,40)+bulb(104,24,true,7),
        bg(1)+sun(20,20,7)+panel(22,64)+`<path d="M22 70 C 34 70, 40 46, 50 40" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`+socket(60,40,1.4)+plug(80,40)+line(90,40,100,40)+bulb(104,24,true,7) ],
    l:[["розетка — контракт","the socket is a contract"],["ток с ТЭЦ — подходит","plant power — fits"],["ток от солнца — тоже","solar power — fits too"]],
    c:["Интерфейс — как розетка: обещает, что вилка подойдёт. Откуда ток — тебе неважно.","An interface is like a socket: your plug will fit. Where the power comes from doesn't matter."] };

  Z[B+"Полиморфизм — одно слово, разное поведение"]={
    p:[ bg(2)+bot(32,82,.85,{arms:"up"})+bubble(80,26,50,txt(0,3,"save(x)",8,C.blue))+txt(80,60,"?",14,C.grey),
        bg(3)+bubble(30,18,44,txt(0,3,"save(x)",7,C.blue))+arr(40,36,62,48)+db(82,56,1.1)+ok(106,30,.7),
        bg(4)+bubble(30,18,44,txt(0,3,"save(x)",7,C.blue))+arr(40,36,62,48)+cloud(86,52,1.2)+ok(106,26,.7) ],
    l:[["одна команда save(x)","one command: save(x)"],["тут — в базу","here — into a database"],["там — в облако","there — into the cloud"]],
    c:["Я говорю save(x), а куда сохранится — решает сам объект, пока программа работает.","I say save(x), and the object itself decides where it goes while the program runs."] };

  const tree=(pc,kids)=>box(60,30,26,18,null,pc)+[24,60,96].map((x,i)=>line(60,30,x,56,C.ink,1.4)+box(x,72,22,16,null,kids[i])).join("");
  Z[B+"Композиция обычно лучше наследования"]={
    p:[ bg(0)+tree(C.blue,[C.wood,C.wood,C.wood]),
        bg(1)+tree(C.red,[C.wood,C.wood,C.wood])+spark(76,16,C.red)+no(24,48,.6)+no(60,48,.6)+no(96,48,.6),
        bg(2)+bot(32,82,.85,{arms:"reach"})+gear(54,58,.6)+`<path d="M66 36 q14 -12 28 0" fill="none" stroke="${C.grn}" stroke-width="2"/><path d="M90 32 l4 4 l-5 2" fill="none" stroke="${C.grn}" stroke-width="2"/>`+key(98,58,1.1,C.blue)+ok(104,22,.7) ],
    l:[["потомки на родителе","children on one parent"],["сменил родителя — сломал","changed parent — broke all"],["деталь легко заменить","a part is easy to swap"]],
    c:["Наследование сшивает намертво. А деталь внутри объекта можно просто заменить другой.","Inheritance stitches things for good. A part inside an object you can simply swap."] };

  Z[SO+"Зачем принципы, если код и так работает"]={
    p:[ bg(3)+laptop(60,66,1.4,tick(0,-13))+kid(18,82,.75,C.grn)+txt(100,30,"?",12,C.blue),
        bg(4)+[0,1,2,3,4].map(i=>sheet(24+i*18,40,4,C.red,(i-2)*6)).join("")+bot(60,86,.4,{mood:"sad"})+txt(108,18,"×5",8,C.red),
        bg(0)+sheet(60,40,4,C.grn)+ok(88,22,.8)+bot(22,82,.75)+txt(60,72,"×1",9,C.grn) ],
    l:[["работает — и ладно?","it works — good enough?"],["правка — 5 файлов","one change — 5 files"],["правка — 1 файл","one change — 1 file"]],
    c:["Код читают и правят годами. Хорошо, когда ради одной правки открываешь один файл.","Code is read and changed for years. Good code needs one file opened per change."] };

  const big=`<rect x="34" y="18" width="52" height="40" rx="5" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+coin(46,38,.9)+env(62,38,.45)+db(76,40,.45);
  Z[SO+"S — одна причина для изменения"]={
    p:[ bg(1)+big+bot(60,86,.4),
        bg(2)+big+kid(14,82,.7,C.yel,"sad")+kid(60,82,.7,C.red,"sad")+kid(106,82,.7,C.blue,"sad")+arr(22,52,32,44,C.ink)+arr(98,52,88,44,C.ink)+spark(60,12,C.red),
        bg(3)+[[22,C.yel,coin(22,36,.9)],[60,C.red,env(60,36,.5)],[98,C.blue,db(98,38,.45)]].map(([x,c,ic])=>`<rect x="${x-14}" y="22" width="28" height="28" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+ic+kid(x,84,.6,c)).join("") ],
    l:[["класс делает всё","one class does it all"],["три команды — ссоры","three teams — conflicts"],["у каждого свой класс","each owns one class"]],
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

  const Z={};
  /* ===== SOLID ===== */
  Z["SOLID|O — расширяй, не переписывая"]={
    p:[ bg(0)+code(38,36,58,["if (cash) {…}","else if (card)","else if (qr)","else if (…)"],6,[0,0,0,C.red])+spark(14,62,C.red)+spark(62,60,C.red)+bot(96,82,.75,{mood:"sad",arms:"reach"}),
        bg(1)+wall(70,112,10,74)+socket(90,40,1.3)+bulb(30,30,true,9)+ln("M30 40 C30 64 70 66 84 46",C.ink,1.6)+bot(52,82,.62,{mood:"smile"}),
        bg(2)+wall(70,112,10,74)+socket(90,40,1.3)+bulb(26,24,true,7)+ln("M26 32 C26 50 70 56 85 44",C.ink,1.4)+laptop(36,72,.8)+ln("M50 72 C64 72 70 54 95 44",C.ink,1.4)+txt(54,60,"+",14,C.grn)+ok(100,20) ],
    l:[["правка if-else — риск","editing if-else — risky"],["розетка в стене","a socket in the wall"],["новый прибор — без ремонта","new device — no rewiring"]],
    c:["Новую оплату я втыкаю, как прибор в розетку. Старый, рабочий код не трогаю.","I plug a new payment in like a device into a socket. The old working code stays untouched."] };

  Z["SOLID|L — потомок не должен удивлять"]={
    p:[ bg(0)+car(42,82,1,8,8,C.red)+wheel(98,74,8)+txt(80,66,"=",12)+ok(98,46),
        bg(1)+car(56,82,1,8,4,C.red)+no(96,24)+txt(78,64,"!",14,C.red),
        bg(2)+`<rect x="20" y="34" width="50" height="20" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.3"/>`+txt(45,30,"w = 5",7)+txt(14,47,"2",8)+txt(96,48,"10",14,C.grn)+ok(96,24),
        bg(3)+`<rect x="22" y="16" width="44" height="44" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.3"/>`+txt(44,12,"w = 5",7)+txt(44,72,"h = 2 → 5 ?",7,C.red)+txt(96,48,"25",14,C.red)+no(96,24) ],
    l:[["запаска того же размера","spare of the same size"],["меньше — перекосило","smaller — the car tilts"],["прямоугольник: 5×2 = 10","rectangle: 5×2 = 10"],["квадрат: вышло 25","square: got 25"]],
    c:["Потомок обязан вставать на место родителя без сюрпризов, как запаска того же размера.","A child must fit where its parent stood, no surprises — like a spare of the same size."] };

  Z["SOLID|I и D — не навязывай лишнее и завись от абстракций"]={
    p:[ bg(0)+remote(36,44,30,60,Array.from({length:40},(_,i)=>`<circle cx="${-10+(i%5)*5}" cy="${-24+Math.floor(i/5)*6.6}" r="1.8" fill="${["#ef5b5b","#ffc93c","#4cb963","#5aa9e6","#b8bfcc"][i%5]}"/>`).join(""))+txt(36,86,"40",8)+bot(88,82,.75,{mood:"wow",arms:"down"})+txt(108,26,"?",14,C.red),
        bg(1)+remote(40,44,22,42,`<circle cy="-10" r="4.5" fill="${C.red}"/><circle cy="2" r="4.5" fill="${C.grn}"/><circle cy="14" r="4.5" fill="${C.blue}"/>`)+bot(86,82,.75,{mood:"smile",arms:"up"})+ok(64,20),
        bg(2)+gear(26,44,.9)+ln("M40 44 H76",C.ink,4)+dot(40,44,4,C.grey,1)+dot(76,44,4,C.grey,1)+db(94,48,.85,C.blue)+no(60,22),
        bg(3)+gear(20,44,.8)+ln("M32 44 H44",C.ink,2)+socket(54,44,1.1)+ln("M64 40 C72 40 74 28 84 26",C.ink,1.4)+db(96,30,.55,C.blue)+db(96,66,.55,C.grn)+ln("M64 48 C74 52 74 66 84 66",C.grey,1.4,1)+ok(54,72,.8) ],
    l:[["40 кнопок — путаница","40 buttons — confusing"],["3 нужные кнопки","only 3 buttons you need"],["припаян к базе намертво","soldered to one database"],["через розетку — любую","via a socket — any one"]],
    c:["Дай мне пульт без лишних кнопок и розетку вместо пайки. Что воткнуть — подставит Spring.","Give me a remote with no extra buttons, and a socket, not solder. Spring plugs in the rest."] };

  /* ===== Паттерны ===== */
  Z["Паттерны|Паттерн — имя для решения, которое ты и так придумаешь"]={
    p:[ bg(0)+`<rect x="8" y="8" width="104" height="30" rx="9" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+scrib(14,16,92,3)+`<path d="M26 38 l2 6 l5 -6" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+kid(28,82,.9,C.red)+kid(92,82,.9,C.blue,"sad")+txt(106,52,"?",12,C.red),
        bg(1)+bubble(30,26,26,star(0,0,6,C.yel))+kid(28,82,.9,C.red)+kid(92,82,.9,C.blue)+bulb(92,22,true,7),
        bg(2)+`<rect x="54" y="40" width="54" height="34" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/><circle cx="81" cy="57" r="9" fill="#7a5530"/>`+star(36,40,9,C.yel)+bot(24,82,.62,{arms:"reach",mood:"think"})+no(100,24) ],
    l:[["объяснять — долго","explaining takes ages"],["одно слово — все поняли","one word — all get it"],["пихать везде — вред","forcing it in — harmful"]],
    c:["Паттерн — просто имя для приёма. Сказал одно слово, и команда поняла замысел.","A pattern is just a name for a trick. Say one word and the team gets the idea."] };

  Z["Паттерны|Фабрика — создание спрятано"]={
    p:[ bg(0)+code(31,24,52,["new Coffee()"],6,[C.red])+code(84,42,52,["new Coffee()"],6,[C.red])+code(34,60,52,["new Coffee()"],6,[C.red])+txt(92,72,"×40",11,C.red),
        bg(1)+machine(80,74,C.grey)+cup(80,72)+kid(28,82,.9,C.blue)+bubble(36,22,22,cup(0,6))+arrowR(46,56,58),
        bg(2)+machine(80,74,C.grn)+cup(80,72)+kid(28,82,.9,C.blue)+ok(44,30)+spark(104,18) ],
    l:[["new по всему коду","new all over the code"],["заказал — получил","order it — get it"],["машину сменили — ок","new machine — still fine"]],
    c:["Я не собираю кофе сам, а прошу «кофе». Сменят машину — правка в одном месте.","I don't build the coffee, I ask for one. Swap the machine and only one spot changes."] };

  Z["Паттерны|Стратегия — поведение как параметр"]={
    p:[ bg(0)+code(40,40,64,["if (type == A) …","else if (B) …","else if (C) …","else if (D) …"],6,[0,0,0,C.red])+txt(40,74,"+1",11,C.red)+bot(98,82,.65,{mood:"sad"}),
        bg(1)+drill(40,34,C.grey,16)+[[24,C.red,"M"],[52,C.blue,""],[80,C.grn,""]].map((b,i)=>`<path d="M${24+i*28} 72 h18" stroke="${b[1]}" stroke-width="3.6" stroke-linecap="round"/>`).join(""),
        bg(2)+drill(34,40,C.yel,18)+`<path d="M82 66 h20" stroke="${C.yel}" stroke-width="3.6" stroke-linecap="round" stroke-dasharray="2 1.5"/>`+txt(92,58,"+",14,C.grn)+ok(98,20) ],
    l:[["каждый способ — новый if","each way — one more if"],["дрель одна, насадок много","one drill, many bits"],["насадка новая, дрель та же","new bit — same drill"]],
    c:["Способ расчёта я получаю как насадку. Новый способ — новый класс, дрель не трогаю.","I get the calculation like a drill bit. New way, new class — the drill stays the same."] };

  Z["Паттерны|Декоратор — обёртка, добавляющая поведение"]={
    p:[ bg(0)+phone(42,46,1.6)+bot(94,82,.7,{mood:"smile",arms:"reach"}),
        bg(1)+`<rect x="25" y="16" width="36" height="60" rx="8" fill="${C.red}" stroke="${C.ink}" stroke-width="1.3"/>`+phone(43,46,1.6)+ok(90,26)+bot(94,82,.55,{arms:"up"}),
        bg(2)+arrowR(6,46,26)+`<rect x="28" y="12" width="84" height="66" rx="10" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.3"/>`+txt(42,24,"TX",8)+`<rect x="40" y="28" width="66" height="44" rx="8" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.3"/>`+`<rect x="44" y="33" width="12" height="15" rx="1.5" fill="#fff" stroke="${C.ink}"/>`+ln("M47 38 h6 M47 42 h6",C.grey,1.2)+gear(84,52,.95) ],
    l:[["телефон как есть","the phone as it is"],["в чехле — тот же телефон","in a case — same phone"],["обёртка вокруг обёртки","a wrap around a wrap"]],
    c:["Обёртка выглядит как сам объект, но добавляет своё. Так Spring вешает транзакции.","A wrapper looks like the object but adds something. That's how Spring adds transactions."] };

  Z["Паттерны|Синглтон — самый популярный и самый проблемный"]={
    p:[ bg(0)+`<rect x="18" y="18" width="34" height="26" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/><circle cx="35" cy="26" r="2" fill="${C.ink}"/>`+`<g transform="rotate(90 35 34)">${key(35,34,.9)}</g>`+txt(35,58,"1",14,C.ink)+door(92,74),
        bg(1)+door(100,74)+lock(100,48,.6)+kid(22,82,.75,C.red,"sad")+kid(46,82,.75,C.grn,"sad")+kid(70,82,.75,C.blue,"sad")+clock(46,22,1),
        bg(2)+`<rect x="74" y="16" width="34" height="26" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/><circle cx="91" cy="24" r="2" fill="${C.ink}"/>`+txt(91,38,"?",10,"#fff")+kid(26,82,.8,C.red,"wow")+kid(56,82,.8,C.grn,"wow")+think(42,22,txt(11,2,"?",12,C.red)) ],
    l:[["один ключ на этаж","one key for the floor"],["один внутри — все ждут","one inside — all wait"],["у кого ключ — не помнят","who has it — no one knows"]],
    c:["Один объект на всех — это общая очередь. В Spring бины и так одиночки, свой не пиши.","One object for everyone means one queue. Spring beans are singletons anyway — skip your own."] };

  /* ===== Коллекции ===== */
  Z["Java: коллекции|Массив — жёсткая полка"]={
    p:[ bg(0)+tray(60,36,5,2,13,10,7)+txt(60,66,"[7]",11,C.blue)+spark(92,62),
        bg(1)+tray(54,40,5,2,13,10)+egg(104,22,C.yel)+txt(104,40,"11",9)+no(104,62),
        bg(2)+tray(32,23,5,2,10,10)+tray(64,62,6,2,11,11,10)+curve(40,30,58,52,C.blue,true)+curve(22,30,36,52,C.blue,true)+txt(104,30,"+1",11,C.grn) ],
    l:[["по номеру — мгновенно","by index — instantly"],["11-му места нет","no room for the 11th"],["новый ящик и перекладка","new tray and a move"]],
    c:["Массив — ящик на точное число мест. Хочешь больше — бери новый и перекладывай всё.","An array is a tray with fixed slots. Want more? Get a new one and move everything over."] };

  Z["Java: коллекции|List — полка, которая растёт сама"]={
    p:[ bg(0)+plank(8,66,52)+[0,1,2,3].map(i=>box(15+i*14,52,12,12,String(i+1))).join("")+box(96,40,12,12,"5",C.yel)+arrowL(86,46,72)+txt(96,18,"?",12,C.red),
        bg(1)+plank(8,58,30)+[0,1,2,3].map(i=>box(15+i*12,30,10,10)).join("")+plank(8,116,68)+[0,1,2,3].map(i=>box(15+i*13,68,11,11)).join("")+box(67,68,11,11,null,C.yel)+curve(30,32,40,56,C.blue,true)+clock(96,24,1,4),
        bg(2)+plank(4,116,58)+[["1",0],["2",0],["3",1],["4",1],["5",1]].map((b,i)=>box(12+i*14+(i>=2?14:0),58,12,12,b[0])).join("")+box(40,30,12,12,"+",C.yel)+ln("M40 34 v8",C.grn,2)+arrowR(70,72,110,C.red)+"" ],
    l:[["полка полна","the shelf is full"],["сам переезжает на большую","quiet move to a bigger one"],["вставка внутрь — сдвиг","insert mid — tail shifts"]],
    c:["ArrayList сам переезжает на полку побольше. Удобно, но переезд и сдвиги стоят времени.","ArrayList moves itself to a bigger shelf. Handy, but moving and shifting take time."] };

  Z["Java: коллекции|Map — поиск по ключу, а не по номеру"]={
    p:[ bg(0)+ln("M6 18 H114",C.ink,2)+[C.red,C.blue,C.grn,C.yel,"#c86bfa",C.grey].map((c,i)=>coat(14+i*18,18,c)).join("")+bot(46,84,.6,{mood:"sad"})+mag(70,64,.9)+clock(102,64,.9,5),
        bg(1)+`<rect x="54" y="52" width="62" height="8" rx="2" fill="${C.wood}" stroke="${C.wood2}"/>`+kid(28,82,.9,C.blue)+ticket(56,40,"17",C.yel)+bot(94,82,.62,{mood:"smile",arms:"reach"}),
        bg(2)+ln("M10 18 H110",C.ink,2)+[["16",C.grn],["17",C.red],["18",C.yel]].map((c,i)=>coat(26+i*34,18,c[1])+txt(26+i*34,56,c[0],8,i===1?C.red:C.ink)).join("")+bot(60,84,.42,{arms:"up"})+ok(98,70,.9) ],
    l:[["искать глазами — долго","searching by eye — slow"],["номерок 17","ticket 17"],["сразу к крючку 17","straight to hook 17"]],
    c:["Я не перебираю все вещи. Из ключа считаю, где лежит, и иду прямо туда.","I don't go through everything. I work out the spot from the key and go straight there."] };

  Z["Java: коллекции|Set — коллекция без повторов"]={
    p:[ bg(0)+clip(40,44,[C.red,C.blue,C.grn])+kid(88,82,.85,C.yel)+txt(88,24,"+",14,C.grn),
        bg(1)+clip(40,44,[C.red,C.blue,C.grn])+`<circle cx="33" cy="35" r="6" fill="none" stroke="${C.red}" stroke-width="1.8"/>`+kid(88,82,.85,C.red,"sad")+no(88,22),
        bg(2)+clip(36,44,[C.red,C.blue,C.grn])+mag(38,46,.9)+think(80,22,`<circle cx="7" r="4" fill="${C.blue}"/>`+txt(18,4,"?",10))+ok(92,62) ],
    l:[["новый гость — вписали","new guest — added"],["второй раз — нельзя","twice — not allowed"],["есть ли? — ответ сразу","is it in? — instant answer"]],
    c:["В Set каждый записан один раз. Спроси «есть ли такой?» — отвечу сразу. Порядок не храню.","A Set lists each one once. Ask \"is it in?\" and I answer at once. I don't keep order."] };

  Z["Java: коллекции|Как выбрать: три вопроса"]={
    p:[ bg(0)+bot(60,82,.95,{mood:"think",glasses:true})+txt(28,30,"?",18,C.blue)+txt(94,30,"?",18,C.blue),
        bg(1)+txt(60,18,"List",10,C.blue)+[C.red,C.grn,C.yel].map((c,i)=>kid(30+i*30,82,.75,c)+txt(30+i*30,40,String(i),9)).join(""),
        bg(2)+txt(60,18,"Map",10,C.blue)+ticket(32,52,"17",C.yel)+arrowR(46,52,66)+ln("M80 28 H108",C.ink,2)+coat(94,28,C.red),
        bg(3)+txt(60,18,"Set",10,C.blue)+clip(46,54,[C.red,C.blue])+txt(84,54,"?",14)+ok(98,40,.9) ],
    l:[["сначала — какая задача?","first — what's the job?"],["порядок, номер — List","order, index — List"],["поиск по ключу — Map","lookup by key — Map"],["было ли уже — Set","seen it yet? — Set"]],
    c:["Сначала пойми задачу: очередь, гардероб или список гостей. Потом бери коллекцию.","First get the job: a queue, a cloakroom, or a guest list. Then pick the collection."] };

  Z["Java: коллекции|Почему equals и hashCode всегда идут парой"]={
    p:[ bg(0)+cab(30,76,"1")+cab(60,76,"2",C.yel)+cab(90,76,"3")+card(60,16,16,14,"#fff",txt(0,4,"A",9,C.red))+ln("M60 24 v10",C.ink,1.6)+ok(76,22,.7),
        bg(1)+cab(30,76,"1")+cab(60,76,"2")+cab(90,76,"3",C.yel)+mag(84,54,.9)+txt(90,26,"?",12,C.red)+no(110,20,.7),
        bg(2)+cab(30,76,"1")+cab(60,76,"2",C.yel)+cab(90,76,"3")+card(48,22,14,12,"#fff",txt(0,4,"A",8,C.red))+txt(60,26,"=",10)+card(72,22,14,12,"#fff",txt(0,4,"A",8,C.red))+ok(100,20,.8) ],
    l:[["hash → шкаф 2","hash → cabinet 2"],["ищу в шкафу 3 — пусто","look in cabinet 3 — empty"],["шкаф тот же, equals — да","same cabinet, equals — yes"]],
    c:["Я сначала по hashCode выбираю шкаф, потом в нём сверяю equals. Сломай одно — потеряю вещь.","I pick the cabinet by hashCode, then check equals inside. Break one and the thing is lost."] };

  /* ===== Сложность ===== */
  Z["Сложность|Считают не секунды, а рост"]={
    p:[ bg(0)+plank(10,62,60)+[0,1,2,3].map(i=>box(17+i*13,60,11,11)).join("")+txt(36,32,"n = 4",9)+clock(90,40,1.2,2)+ok(90,66,.8),
        bg(1)+plank(4,116,46)+Array.from({length:8},(_,i)=>box(10+i*14,46,12,12)).join("")+txt(34,66,"O(n) ×2",8,C.grn)+txt(88,66,"O(n²) ×4",8,C.red),
        bg(2)+ln("M14 70 H112 M14 70 V10",C.ink,1.6)+ln("M14 62 H108",C.grn,2.4)+ln("M14 70 L108 30",C.blue,2.4)+ln("M14 70 Q70 68 88 10",C.red,2.4)+txt(98,58,"O(1)",7,C.grn)+txt(104,26,"O(n)",7,C.blue)+txt(74,14,"O(n²)",7,C.red) ],
    l:[["маленькая полка — быстро","small shelf — fast"],["вдвое длиннее: ×2 и ×4","twice as long: ×2 vs ×4"],["смотрим на рост","we watch the growth"]],
    c:["Секунды зависят от машины. Я смотрю, что будет, если данных станет вдвое больше.","Seconds depend on the machine. I look at what happens when the data doubles."] };

  Z["Сложность|Почему квадрат убивает"]={
    p:[ bg(0)+bot(22,82,.7,{arms:"up"})+[0,1,2,3,4].map(i=>ln(`M34 50 L90 ${16+i*13}`,C.grn,1.3)+dot(96,16+i*13,5,C.yel,1)).join("")+txt(60,84,"5",9),
        bg(1)+(()=>{ const P=[0,1,2,3,4].map(i=>[60+26*Math.sin(i*1.2566),42-26*Math.cos(i*1.2566)]); let s=""; for(let a=0;a<5;a++)for(let b=a+1;b<5;b++) s+=ln(`M${P[a][0].toFixed(1)} ${P[a][1].toFixed(1)} L${P[b][0].toFixed(1)} ${P[b][1].toFixed(1)}`,C.red,1.2); return s+P.map(p=>dot(p[0].toFixed(1),p[1].toFixed(1),5,C.yel,1)).join(""); })()+txt(60,84,"10",9),
        bg(2)+txt(42,26,"10³ → 10⁶",10,C.grn)+txt(42,48,"10⁶ → 10¹²",10,C.red)+clock(20,68,.85,10)+clock(42,68,.85,2)+clock(64,68,.85,6)+bot(98,82,.65,{mood:"sad"}) ],
    l:[["привет каждому — n","hi to each — n"],["каждый с каждым — n²","everyone meets all — n²"],["миллион — уже часы","a million — hours"]],
    c:["Каждый с каждым — это n². На десятке незаметно, на миллионе программа просто висит.","Everyone with everyone is n². Fine for ten, but with a million the program just hangs."] };

  Z["Сложность|Вложенный цикл — не всегда квадрат"]={
    p:[ bg(0)+[0,1,2,3,4].map(i=>house(14+i*20,52,["#fff",C.yel,"#fff",C.yel,"#fff"][i])).join("")+arrowR(10,64,110,C.blue)+bot(60,84,.32)+txt(60,22,"n",12,C.blue),
        bg(1)+`<path d="M24 74 V36 L60 12 L96 36 V74 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+cab(46,72,"1")+cab(74,72,"2")+txt(104,40,"×2",11,C.grn),
        bg(2)+txt(66,30,"100 × 2 = 200",10,C.grn)+ok(14,26,.8)+txt(60,58,"100 × 100",10,C.red)+ln("M30 54 H90",C.red,2)+bot(104,86,.35,{mood:"smile"}) ],
    l:[["обойти n домов","walk past n houses"],["в каждом — 2 шкафа","in each — 2 cupboards"],["это 2n, а не n²","that's 2n, not n²"]],
    c:["Я считаю не циклы, а сколько раз работает самое внутреннее. Два шкафа — это 2n.","I count how often the innermost part runs, not the loops. Two cupboards means 2n."] };

  Z["Сложность|Память тоже считается"]={
    p:[ bg(0)+bot(26,82,.7,{mood:"think"})+bubble(30,18,18,txt(0,4,"?",10,C.blue))+kid(92,82,.85,C.grn)+bubble(90,18,30,txt(0,4,"5550",8))+txt(60,58,"×3",11,C.red),
        bg(1)+card(76,44,34,40,"#fff",txt(0,-8,"5550",9)+ln("M-10 2 h20 M-10 9 h14",C.grey,1.3))+bot(28,82,.7,{glasses:true,arms:"reach"})+spark(104,16),
        bg(2)+ln("M60 20 V72 M44 72 h32 M22 30 H98",C.ink,2)+ln("M22 30 l-8 18 h16 z M98 30 l-8 18 h16 z",C.ink,1.2)+clock(22,44,.8,3)+card(98,42,14,14,C.yel,ln("M-4 -2 h8 M-4 2 h6",C.ink,1))+txt(60,86,"⇄",10) ],
    l:[["каждый раз спрашиваю","asking every time"],["записал — читаю","wrote it — just read"],["скорость за память","speed for memory"]],
    c:["Записал — быстрее, но блокнот занимает место и может устареть. Бесплатно не бывает.","Writing it down is faster, but the notebook takes room and can go stale. Nothing is free."] };

  /* ===== Исключения ===== */
  Z["Java: исключения|Исключение — это не ошибка программиста, а сообщение"]={
    p:[ bg(0)+door(92,74)+lock(92,42,.6)+kid(42,82,.9,C.yel,"sad")+box(42,73,15,11,null)+no(68,22,.8),
        bg(1)+kid(26,82,.85,C.yel)+phone(42,46,.7)+bubble(40,16,22,txt(0,5,"!",12,C.red))+curve(52,40,82,36,C.ink,true)+bot(94,82,.7,{arms:"hold",mood:"think"}),
        bg(2)+code(54,20,72,["catch (e) {…}"],6.5,[C.grn])+code(54,44,72,["process()"],6.5)+code(54,66,72,["deliver() throw"],6.5,[C.red])+ln("M91 64 Q116 42 92 24",C.red,1.8)+`<path d="M95 31 L91 25 L98 25" fill="none" stroke="${C.red}" stroke-width="1.8" stroke-linecap="round"/>`+ok(10,20,.6) ],
    l:[["доставить не выходит","can't deliver it"],["не бросает — звонит","doesn't dump it — calls"],["throw летит к catch","throw flies to catch"]],
    c:["Не смог — не молчу и не вру «-1». Бросаю исключение, и решает тот, кто умеет.","Can't do it? I don't stay quiet or fake a -1. I throw, and someone who knows decides."] };

  Z["Java: исключения|Checked и unchecked — два разных разговора"]={
    p:[ bg(0)+phone(44,46,1.4,`<path d="M-4 6 v2 M-1 3 v5 M2 0 v8 M5 -3 v11" stroke="${C.grey}" stroke-width="1.6"/><path d="M-5 -8 l10 10 M5 -8 l-10 10" stroke="${C.red}" stroke-width="1.6"/>`)+cloud(92,30,1)+txt(90,62,"IOException",6,C.blue),
        bg(1)+bot(34,82,.85,{glasses:true,arms:"reach",mood:"think"})+code(84,42,50,["try {","  read();","} catch …"],6.5,[0,0,C.grn])+txt(84,14,"!",14,C.red),
        bg(2)+socket(92,40,1.2)+`<g transform="translate(48 58)"><rect x="-8" y="-5" width="16" height="10" rx="2" fill="#fff" stroke="${C.ink}"/><path d="M8 -2 h5 M8 2 h5" stroke="${C.ink}" stroke-width="1.6"/></g>`+ln("M40 58 C20 58 18 30 22 22",C.ink,1.3)+bulb(22,18,false,6)+arrowR(64,50,80,C.grn)+txt(48,80,"NPE",8,C.red) ],
    l:[["связь может пропасть","the line may drop"],["компилятор: обработай!","compiler: handle it!"],["вилку забыл — вставь","forgot the plug — fix it"]],
    c:["Checked — норма жизни, компилятор заставит подумать. Unchecked — мой баг, его чинят.","Checked is normal life, the compiler makes me plan. Unchecked is my bug — fix it."] };

  Z["Java: исключения|finally и try-with-resources"]={
    p:[ bg(0)+bulb(60,18,true,8)+laptop(40,70,.9)+bot(88,82,.7,{arms:"reach"}),
        bg(1)+bulb(30,18,false,8)+sw(14,48,false,.9)+bot(36,82,.7,{arms:"reach",mood:"wow"})+arrowR(58,60,82,C.red)+spark(100,40,C.red)+spark(108,58,C.red),
        bg(2)+door(84,74)+bulb(30,18,false,8)+sw(44,48,false,.9)+txt(44,72,"try ( )",8,C.blue)+ok(104,22,.8) ],
    l:[["работаю — свет горит","working — light on"],["бегу — но гашу","running — still switch off"],["try ( ) гасит сам","try ( ) switches it off"]],
    c:["Что бы ни случилось, ресурс надо закрыть. try-with-resources сделает это сам.","Whatever happens, the resource must be closed. try-with-resources does it for me."] };

  Z["Java: исключения|Проглотить исключение — худшее, что можно сделать"]={
    p:[ bg(0)+`<rect x="14" y="16" width="92" height="46" rx="10" fill="#3b4256" stroke="${C.ink}" stroke-width="1.3"/>`+`<circle cx="40" cy="40" r="14" fill="none" stroke="${C.grey}" stroke-width="2"/>`+ln("M40 40 l8 -7",C.grey,2)+`<circle cx="84" cy="40" r="15" fill="${C.red}" opacity=".3"/><circle cx="84" cy="40" r="9" fill="${C.red}"/>`+txt(84,44,"!",11,"#fff")+txt(60,76,"Exception",7,C.red),
        bg(1)+`<rect x="14" y="16" width="92" height="46" rx="10" fill="#3b4256" stroke="${C.ink}" stroke-width="1.3"/>`+`<circle cx="40" cy="40" r="14" fill="none" stroke="${C.grey}" stroke-width="2"/>`+ln("M40 40 l8 -7",C.grey,2)+`<circle cx="84" cy="40" r="9" fill="${C.red}"/>`+tape(84,40,26,-20)+mono(60,76,"catch (e) { }",7,C.ink,"middle"),
        bg(2)+car(52,82,1.1,8,8,C.blue)+smoke(76,30)+bot(104,82,.55,{mood:"sad"})+txt(104,22,"?",12,C.red) ],
    l:[["лампа: что-то не так","warning light is on"],["заклеили — едем","taped over — driving on"],["встала — а почему?","stopped — but why?"]],
    c:["Пустой catch — изолента на лампочке. Поломка никуда не делась, просто её не видно.","An empty catch is tape over the warning light. The fault is still there, you just can't see it."] };

  /* ===== Современная Java ===== */
  Z["Java: современное|Дженерики — типы под контролем компилятора"]={
    p:[ bg(0)+crate(60,76,56,36,apple(60,48,1.3))+mono(60,24,"List&lt;Apple&gt;",8,C.blue,"middle"),
        bg(1)+pear(24,56,1.3)+arrowR(36,56,52)+bot(70,82,.75,{glasses:true,arms:"reach"})+paper(100,40,["✓","✗"])+no(48,24,.8),
        bg(2)+crate(36,76,44,30,apple(36,52,1.1))+apple(90,40,1.6)+curve(46,40,80,36,C.grn,true)+ok(100,66,.8) ],
    l:[["ящик: только яблоки","crate: apples only"],["груша — стоп при сборке","a pear — stopped at build"],["достаю без проверки","take one out — no checks"]],
    c:["Я пишу на ящике тип, и компилятор не даст положить грушу. Ошибка ловится до прода.","I write the type on the crate and the compiler won't let a pear in. Caught before prod."] };

  Z["Java: современное|Лямбда — функция как значение"]={
    p:[ bg(0)+card(36,44,46,64,"#fff",mono(-19,-22,"class D",6.5,C.blue)+scrib(-19,-14,38,7))+kid(90,82,.85,C.grn,"sad")+txt(90,22,"×2",10),
        bg(1)+bot(30,82,.8,{arms:"up"})+bubble(80,30,58,mono(0,3,"x -&gt; x * 2",8,C.blue,"middle")),
        bg(2)+card(20,24,32,14,"#fff",mono(0,3,"x-&gt;x*2",6,C.blue,"middle"))+curve(26,32,54,40,C.blue,true)+gear(60,50,1)+txt(22,60,"1 2 3",8)+arrowR(34,64,46)+arrowR(76,64,88)+txt(104,60,"2 4 6",8,C.grn) ],
    l:[["класс ради одного дела","a class for one job"],["просто сказать, что делать","just say what to do"],["код — как значение","code as a value"]],
    c:["Лямбда — это сам кусок кода, который можно передать. На этом держатся стримы.","A lambda is a piece of code you can pass around. Streams are built on it."] };

  Z["Java: современное|Stream — описываешь ЧТО, а не КАК"]={
    p:[ bg(0)+crate(60,76,64,26,"")+[[38,C.red],[50,C.grn],[62,C.red],[74,C.grn],[86,C.red],[44,C.red],[68,C.grn],[80,C.red]].map((a,i)=>apple(a[0],i<5?44:34,1,a[1])).join(""),
        bg(1)+`<path d="M30 30 H90 L68 54 V64 H52 V54 Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.3"/>`+apple(48,22,1,C.red)+apple(72,22,1,C.red)+apple(60,72,1,C.red)+apple(104,62,1,C.grn)+curve(88,30,104,54,C.red,true)+txt(18,30,"filter",7,C.blue),
        bg(2)+[0,1,2].map(i=>drop(46+i*14,22)+drop(52+i*14,32)).join("")+[0,1,2].map(i=>apple(44+i*16,56,1.2,C.red)+spark(50+i*16,46,"#fff")).join("")+txt(18,30,"map",7,C.blue),
        bg(3)+box(60,72,44,30,null)+[0,1,2].map(i=>apple(46+i*14,36,1,C.red)).join("")+ok(100,30)+txt(18,22,"collect",7,C.blue) ],
    l:[["ящик фруктов","a crate of fruit"],["filter: только спелые","filter: ripe only"],["map: помыть","map: wash them"],["collect: в коробку","collect: into a box"]],
    c:["Говорю ЧТО: отбери, помой, сложи — без счётчиков. Но цикла стрим не всегда быстрее.","I say WHAT: pick, wash, pack — no counters. A stream isn't always faster than a loop."] };

  Z["Java: современное|Optional — честное «значения может не быть»"]={
    p:[ bg(0)+env(34,40,1.3)+ln("M20 30 l6 4 l-4 4 l6 4",C.red,1.5)+txt(34,66,"null",9,C.red)+bot(88,82,.7,{mood:"sad"})+spark(70,30,C.red),
        bg(1)+env(40,42,1.4)+txt(40,48,"?",12,C.blue)+bot(90,82,.7,{glasses:true,arms:"reach"})+mag(74,52,.6),
        bg(2)+env(30,30,1)+card(30,22,16,14,C.yel,txt(0,4,"7",8))+ok(30,58,.8)+env(86,30,1)+txt(86,34,"∅",9,C.grey)+ok(86,58,.8)+txt(58,34,"/",12) ],
    l:[["рванул — а там null","ripped it — null inside"],["на конверте: может пусто","note: may be empty"],["проверил — оба случая","checked both cases"]],
    c:["Optional честно говорит «может быть пусто». Я открываю осторожно, и NPE не случится.","Optional honestly says \"may be empty\". I open it carefully, and no NPE surprises me."] };

  Z["Java: современное|Record — класс, который только хранит данные"]={
    p:[ bg(0)+card(40,46,48,70,"#fff",scrib(-20,-28,40,10))+txt(94,40,"30",14,C.red)+bot(96,84,.4,{mood:"sad"}),
        bg(1)+code(60,18,96,["record P(int x, int y)"],6.5,[C.blue])+arrowD(60,27,40)+[["equals",24],["hashCode",60],["toString",96]].map(c=>card(c[1],52,32,14,"#fff",mono(0,3,c[0],5.5,C.grn,"middle"))).join("")+spark(60,72),
        bg(2)+card(60,34,40,30,"#fff",txt(0,-4,"x = 1",7)+txt(0,6,"y = 2",7))+lock(76,46,.7)+kid(22,84,.75,C.red)+kid(100,84,.75,C.blue)+ok(60,70,.8) ],
    l:[["30 строк руками","30 lines by hand"],["одна строка — всё само","one line — rest is free"],["заполнил — запер","filled in — locked"]],
    c:["Одна строка — и поля, конструктор, equals уже есть. Изменить нельзя, делить безопасно.","One line and the fields, constructor and equals exist. It can't change, so sharing is safe."] };

  /* ===== Java 17 → 21 ===== */
  Z["Java 17 → 21|var — вывод типа, а не динамика"]={
    p:[ bg(0)+mono(60,18,"var a = new Apple();",6.5,C.blue,"middle")+crate(60,76,50,30,apple(48,52,1)+apple(60,52,1)+apple(72,52,1))+ok(104,40,.8),
        bg(1)+mono(60,18,"var x = load();",7,C.blue,"middle")+box(40,76,40,34,null)+bot(92,82,.7,{mood:"think"})+txt(40,58,"?",14,"#fff"),
        bg(2)+code(54,30,72,["var n = 5;"],7,[C.grn])+ok(104,30,.8)+code(54,58,72,["n = \"a\";"],7,[C.red])+no(104,58,.8) ],
    l:[["тип виден справа — ок","type is on the right — ok"],["закрытая коробка — ?","a closed box — ?"],["тип не меняется","the type never changes"]],
    c:["var — не динамика: тип я узнаю при сборке и навсегда. Только не прячь им смысл.","var isn't dynamic: I fix the type at build time, for good. Just don't hide meaning with it."] };

  Z["Java 17 → 21|Record — данные без церемоний"]={
    p:[ bg(0)+server(22,50,.9)+arrowR(36,46,62)+phone(88,46,1.5,`<rect x="-5" y="-6" width="10" height="10" rx="1.5" fill="${C.yel}" stroke="${C.ink}" stroke-width=".7"/>`)+txt(48,72,"DTO",8,C.blue),
        bg(1)+card(32,40,36,24,"#fff",mono(0,3,"P(1,2)",7,C.ink,"middle"))+txt(60,44,"=",14)+card(88,40,36,24,"#fff",mono(0,3,"P(1,2)",7,C.ink,"middle"))+ok(60,70),
        bg(2)+card(44,40,40,28,"#fff",txt(0,-3,"x = 1",7)+txt(0,8,"y = 2",7))+lock(60,50,.6)+mono(96,24,"x = 5",7,C.red,"middle")+no(96,44,.8)+bot(96,84,.4,{mood:"wow"}) ],
    l:[["ответ API — одной строкой","API reply in one line"],["одинаковые — равны","same data — equal"],["поменять нельзя","can't be changed"]],
    c:["Для ответа API пишу record одной строкой. Равенство даром, менять нельзя — потоки не дерутся.","For an API reply I write one-line records. Equality is free, no edits — threads can't clash."] };

  Z["Java 17 → 21|sealed — закрытый список наследников"]={
    p:[ bg(0)+`<rect x="10" y="20" width="100" height="40" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+coin(32,40,1.4)+cardIcon(60,40,C.blue)+phone(88,40,.7)+txt(60,74,"sealed",8,C.blue),
        bg(1)+`<rect x="10" y="20" width="74" height="40" rx="6" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+coin(28,40,1.1)+cardIcon(50,40,C.blue)+phone(70,40,.6)+star(102,40,9,"#c86bfa")+no(102,66,.8),
        bg(2)+[[coin(26,36,1.2)],[cardIcon(60,36,C.blue)],[phone(94,36,.6)]].map((a,i)=>a[0]+ok(26+i*34,66,.8)).join("") ],
    l:[["ровно три формы оплаты","exactly three payments"],["четвёртой не бывает","there's no fourth"],["на каждую — инструкция","each has a handler"]],
    c:["sealed перечисляет всех наследников. Компилятор знает все варианты и проверит каждый.","sealed lists every subclass. The compiler knows all cases and checks each one is handled."] };

  Z["Java 17 → 21|Pattern matching вместо каскада instanceof"]={
    p:[ bg(0)+code(46,42,82,["if (o instanceof A) {","  A a = (A) o; …","} else if (o inst…","  B b = (B) o; …"],5.8,[0,C.red,0,C.red])+bot(104,84,.42,{mood:"sad"}),
        bg(1)+circ(20,24,6,C.red)+sq(20,46,6,C.blue)+tri(20,68,6,C.grn)+ln("M30 24 L76 24 M30 46 L76 46 M30 68 L76 68",C.ink,1.3,1)+plank(80,112,28)+plank(80,112,50)+plank(80,112,72)+circ(96,21,5,C.red)+sq(96,43,5,C.blue)+tri(96,65,5,C.grn),
        bg(2)+star(24,44,10,C.yel)+arrowR(38,44,56)+plank(66,112,28)+plank(66,112,50)+plank(66,112,72)+circ(89,21,5,C.red)+sq(89,43,5,C.blue)+tri(89,65,5,C.grn)+no(50,72,.8) ],
    l:[["каскад instanceof","an instanceof cascade"],["switch: ярлык → полка","switch: tag → shelf"],["нет полки — не соберётся","no shelf — won't compile"]],
    c:["switch по типам сам проверяет и приводит. Забыл вариант — компилятор не соберёт.","A type switch checks and casts in one go. Miss a case and the compiler won't build it."] };

  Z["Java 17 → 21|Текстовые блоки"]={
    p:[ bg(0)+code(52,42,92,["\"SELECT *\\n\" +","\"FROM t\\n\" +","\"WHERE x = \\\"a\\\"\""],6.5)+`<circle cx="50" cy="32.5" r="5" fill="none" stroke="${C.red}" stroke-width="1.5"/><circle cx="54.5" cy="51.5" r="4.6" fill="none" stroke="${C.red}" stroke-width="1.5"/><circle cx="67" cy="51.5" r="4.6" fill="none" stroke="${C.red}" stroke-width="1.5"/>`+bot(108,86,.35,{mood:"sad"}),
        bg(1)+code(50,44,76,["\"\"\"","SELECT *","FROM t","WHERE x = \"a\"","\"\"\""],6.5,[C.blue,0,0,0,C.blue])+ok(104,30)+spark(104,58) ],
    l:[["кавычки, \\n и плюсы","quotes, \\n and pluses"],["текст как он есть","text just as it is"]],
    c:["В тройных кавычках SQL и JSON читаются как есть, без \\n и склейки. Меньше опечаток.","Inside triple quotes SQL and JSON read as-is, with no \\n or gluing. Fewer typos."] };

  /* ===== Рефлексия ===== */
  Z["Рефлексия и аннотации|Что такое рефлексия"]={
    p:[ bg(0)+sw(84,42,true,1.2)+bot(46,82,.8,{arms:"reach"})+bulb(84,14,true,6)+mono(46,14,"getId()",7,C.blue,"middle"),
        bg(1)+`<rect x="1" y="1" width="118" height="88" rx="10" fill="${C.ink}" opacity=".7"/>`+bot(56,82,.8,{arms:"reach",mood:"think"})+txt(90,34,"?",14,C.yel)+txt(22,30,"?",12,C.yel)+dot(96,52,3,C.grey),
        bg(2)+card(30,26,44,16,"#fff",mono(0,3,"\"getId\"",7,C.red,"middle"))+arrowD(30,35,48)+gear(30,62,.9)+arrowR(46,62,64)+txt(80,66,"7",14,C.grn)+bot(104,84,.38,{glasses:true,mood:"think"})+txt(104,48,"?",10,C.red) ],
    l:[["знаю, где выключатель","I know the switch"],["на ощупь: ты метод?","by touch: a method?"],["вызов по строке","call by a string name"]],
    c:["Рефлексия — спросить класс на ходу, что в нём есть, и вызвать по имени. Без проверок.","Reflection asks a class at run time what it has and calls things by name. No checks."] };

  Z["Рефлексия и аннотации|Аннотация сама по себе не делает ничего"]={
    p:[ bg(0)+box(60,76,46,38,null)+`<rect x="48" y="50" width="24" height="16" rx="2" fill="#fff" stroke="${C.red}" stroke-width="1.4"/>`+glass(60,62,.9)+txt(100,30,"@",14,C.red),
        bg(1)+bot(32,82,.8,{arms:"hold",glasses:true})+box(80,76,40,32,null)+`<rect x="70" y="54" width="20" height="14" rx="2" fill="#fff" stroke="${C.red}" stroke-width="1.4"/>`+glass(80,65,.8)+ok(104,22,.8),
        bg(2)+`<g transform="rotate(25 60 66)">${box(60,80,40,30,null)}</g>`+ln("M52 58 l6 8 l-4 6 l6 8",C.ink,1.5)+glass(84,72,.8)+no(100,22,.8)+txt(28,30,"?",14,C.red) ],
    l:[["наклейка — просто метка","a sticker is just a tag"],["грузчик прочитал — бережёт","a mover reads it — careful"],["нет грузчика — разбито","no mover — it breaks"]],
    c:["Аннотация — наклейка. Работает её читатель: при старте он находит метку и действует.","An annotation is a sticker. The reader does the work: at startup it finds the tag and acts."] };

  Z["Рефлексия и аннотации|Так и работает Spring"]={
    p:[ bg(0)+[[30,30,-10],[56,24,6],[80,34,-4],[42,54,8],[72,58,-8]].map(c=>card(c[0],c[1],22,16,"#fff",ln("M-6 -2 h12 M-6 3 h8",C.grey,1.2),c[2])).join("")+mag(98,58,1.1),
        bg(1)+card(34,30,44,16,"#fff",mono(0,3,"@Service",6.5,C.grn,"middle"))+card(86,30,44,16,"#fff",mono(0,3,"@Service",6.5,C.grn,"middle"))+card(34,60,30,14,"#fff",ln("M-6 -1 h12",C.grey,1.2),-6)+card(86,60,44,16,"#fff",mono(0,3,"@Component",6,C.grn,"middle"))+ok(60,82,.6),
        bg(2)+card(34,44,40,22,"#fff",mono(0,3,"A(B b)",7,C.ink,"middle"))+curve(54,44,84,44,C.blue,true)+card(94,44,20,22,"#fff",txt(0,4,"B",10,C.blue))+txt(60,74,"?",12,C.blue),
        bg(3)+gear(42,48,1,C.blue)+gear(67,52,1,C.yel)+txt(42,51,"A",7)+txt(67,55,"B",7)+ok(100,22,.8) ],
    l:[["сканирую пакеты","scanning the packages"],["нашёл @Service","found @Service"],["A нужен B","A needs a B"],["создал и соединил","created and wired"]],
    c:["Никакой магии: Spring читает классы рефлексией, подбирает зависимости и создаёт объекты.","No magic: Spring reads classes by reflection, matches dependencies and builds objects."] };

  Z["Рефлексия и аннотации|Цена рефлексии"]={
    p:[ bg(0)+mono(10,28,"a.getId()",7,C.grn)+arrowR(64,25,104,C.grn)+spark(110,25)+mono(10,56,"invoke(\"getId\")",7,C.red)+clock(100,64,1,8),
        bg(1)+bot(34,82,.8,{glasses:true,mood:"think"})+card(86,40,40,16,"#fff",mono(0,3,"\"getld\"",7,C.red,"middle"))+txt(86,20,"?",14,C.red),
        bg(2)+chip(44,44,txt(0,4,"✓",10,C.grn))+txt(44,82,"native",8,C.blue)+no(96,44),
        bg(3)+gear(30,46,1.2,C.blue)+key(30,72,.9,C.grey)+ok(30,20,.7)+door(90,76)+key(80,48,.8,C.grey)+no(104,20,.7) ],
    l:[["медленнее прямого вызова","slower than a direct call"],["опечатку не поймать","typos slip through"],["native — без списка нельзя","native needs registration"],["отмычка — для библиотек","lockpicks: for libraries"]],
    c:["Рефлексия медленнее и без проверок. Это отмычка для библиотек, а не для своего кода.","Reflection is slower and unchecked. It's a lockpick for libraries, not for your own code."] };

  Z["Рефлексия и аннотации|Своя аннотация — это две части"]={
    p:[ bg(0)+door(60,76)+card(60,30,28,12,"#fff",mono(0,3,"@Ping",6.5,C.blue,"middle"))+txt(94,40,"…",14,C.grey)+no(100,64,.7),
        bg(1)+mono(60,16,"@Retention(RUNTIME)",6.5,C.blue,"middle")+card(30,48,28,12,"#fff",mono(0,3,"@Ping",6.5,C.blue,"middle"))+arrowR(48,48,70)+card(90,48,28,12,"#fff",mono(0,3,"@Ping",6.5,C.blue,"middle"))+txt(90,72,"JVM",8)+ok(30,72,.6),
        bg(2)+door(32,76)+card(32,30,28,12,"#fff",mono(0,3,"@Ping",6.5,C.blue,"middle"))+bot(78,82,.75,{arms:"reach",glasses:true})+gear(104,30,.6,C.yel)+ok(104,60,.7) ],
    l:[["табличка без читателя","a sign nobody reads"],["RUNTIME — видна в работе","RUNTIME — seen at run"],["обработчик прочитал","a handler reads it"]],
    c:["Своя аннотация — это метка с RUNTIME плюс тот, кто её ищет. Без второго — пустая табличка.","Your annotation is a RUNTIME tag plus someone who looks for it. Without them, a blank sign."] };

  /* ===== Тесты ===== */
  Z["Тестирование|Тест — это не про поиск багов"]={
    p:[ bg(0)+`<rect x="62" y="4" width="54" height="72" fill="#d8c7ad" stroke="${C.wood2}"/>`+[[72,20],[98,30],[80,46],[104,58],[74,66]].map(h=>dot(h[0],h[1],2.8,C.red)).join("")+bot(34,82,.75,{mood:"sad"})+txt(34,16,"?",12,C.red),
        bg(1)+`<rect x="62" y="4" width="54" height="72" fill="#d8c7ad" stroke="${C.wood2}"/>`+[[72,20],[98,30],[80,46],[104,58],[74,66]].map(h=>dot(h[0],h[1],2.8,C.red)).join("")+dot(90,7,2.5,C.ink)+ln("M90 7 L84 40",C.yel,2)+bot(84,70,.55,{arms:"up",mood:"smile"}),
        bg(2)+`<rect x="62" y="4" width="54" height="72" fill="#d8c7ad" stroke="${C.wood2}"/>`+dot(90,7,2.5,C.ink)+ln("M90 7 L80 36",C.yel,2)+bot(78,62,.5,{arms:"up",mood:"wow"})+bulb(30,28,true,8)+`<circle cx="30" cy="28" r="9" fill="${C.red}" opacity=".5"/>`+ok(30,62,.9) ],
    l:[["без троса — страшно","no rope — too scary"],["с тросом — смелее","with a rope — bolder"],["сорвался — трос поймал","slipped — the rope caught"]],
    c:["Тест — страховочный трос: ловит момент, когда работавшее сломалось. С ним правлю смело.","A test is a safety rope: it catches the moment working code breaks. So I change things boldly."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 2 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const R=(x,y,w,h,f,r,sc)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r==null?3:r}" fill="${f}" stroke="${sc||C.ink}" stroke-width="1.2"/>`;
  const L=(d,col,w,dash)=>`<path d="${d}" stroke="${col||C.ink}" stroke-width="${w||1.8}" fill="none" stroke-linecap="round" stroke-linejoin="round"${dash?' stroke-dasharray="3 2.5"':""}/>`;
  const T=(x,y,s,sz,col)=>txt(x,y,s,sz||8,col||C.ink,800);
  const node=(x,y,col,lab,r)=>`<circle cx="${x}" cy="${y}" r="${r||6.5}" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>`+(lab!=null?txt(x,y+2.6,lab,7,"#fff"):"");
  const flag=(x,y,lab,col)=>L(`M${x} ${y} v-20`,C.ink,1.6)+`<path d="M${x} ${y-20} h${lab.length*4.6+6} l-3 4.5 l3 4.5 h-${lab.length*4.6+6} z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1"/>`+txt(x+lab.length*2.3+3,y-13,lab,6.5,"#fff");
  const bug=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-6 -3 l-4 -2 M-6 1 h-4 M-6 4 l-4 2 M6 -3 l4 -2 M6 1 h4 M6 4 l4 2 M-2 -7 l-2 -4 M2 -7 l2 -4" stroke="${C.ink}" stroke-width="1.3" stroke-linecap="round"/><ellipse rx="6.5" ry="7.5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 -7 v15" stroke="${C.ink}" stroke-width="1"/><circle cx="-3" cy="-1" r="1.3" fill="${C.ink}"/><circle cx="3" cy="3" r="1.3" fill="${C.ink}"/></g>`;
  const fake=s=>`<g opacity=".55" stroke-dasharray="3 2">${s}</g>`;
  const zap=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M2 -12 L-6 2 H0 L-3 12 L7 -3 H1 Z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.1" stroke-linejoin="round"/></g>`;
  const pool=(x,y,n,used,gap)=>Array.from({length:n},(_,i)=>`<circle cx="${x+i*(gap||9)}" cy="${y}" r="3.4" fill="${i<used?C.red:C.grn}" stroke="${C.ink}" stroke-width="1"/>`).join("");
  const tx=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${col||C.yel}" fill-opacity=".22" stroke="${col||C.yel}" stroke-width="2"/>`;
  const wrap=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${col||"#c86bfa"}" fill-opacity=".12" stroke="${col||"#c86bfa"}" stroke-width="2" stroke-dasharray="4 3"/>`;
  const heart=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M0 7 C-12 -2 -7 -11 0 -5 C7 -11 12 -2 0 7 Z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.1"/></g>`;
  const board=(x,y,w,h,inner)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" fill="#3f6b55" stroke="${C.wood2}" stroke-width="3"/>${inner||""}</g>`;
  const crate=(x,y,w,h,col,lab)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>${Array.from({length:Math.floor(w/6)-1},(_,i)=>`<path d="M${-w/2+6+i*6} ${-h+3} v${h-6}" stroke="#000" stroke-opacity=".18" stroke-width="1.4"/>`).join("")}${lab?txt(0,-h/2+3,lab,8,"#fff"):""}</g>`;
  const wheel=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})">${[0,45,90,135].map(d=>`<path d="M0 -14 v28" stroke="${C.blue}" stroke-width="2.6" stroke-linecap="round" transform="rotate(${d})"/>`).join("")}<circle r="9" fill="#fff" stroke="${C.blue}" stroke-width="3"/><circle r="2.6" fill="${C.blue}"/></g>`;
  const pyr=(x,y,col,inv)=>{ const rows=[[44,C.red,"1"],[30,C.yel,"10"],[16,C.grn,"1000"]]; const H=14;
    return rows.map((r,i)=>{ const yy=inv? y+i*H : y-(3-i)*H; const wTop=inv? (8+ (2-i)*0+ (i)*14):(8+i*14), wBot=wTop+14;
      const a=inv? wBot:wTop, b=inv? wTop:wBot;
      return `<path d="M${x-a/2} ${yy} H${x+a/2} L${x+b/2} ${yy+H} H${x-b/2} Z" fill="${r[1]}" stroke="${C.ink}" stroke-width="1.1"/>`+txt(x,yy+H/2+3,r[2],7,C.ink); }).join(""); };
  const spin=(x,y,col)=>L(`M${x-6} ${y} a6 6 0 1 1 3 5`,col||C.grn,2)+`<path d="M${x-9} ${y+1} l3 -4 l3 4" fill="${col||C.grn}"/>`;
  const Z={};

  /* ===== Тестирование ===== */
  Z["Тестирование|Пирамида: много быстрых, мало медленных"]={
    p:[ bg(0)+pyr(60,74)+bot(100,82,.6,{mood:"smile"}),
        bg(1)+R(10,22,46,22,"#fff",5)+T(33,31,"1000",8,C.grn)+clock(22,56,.7,1)+T(40,60,"ms",8)
              +R(66,22,46,22,"#fff",5)+T(89,31,"1",8,C.red)+clock(78,56,.7,9)+T(97,60,"min",8)+txt(33,40,"✓✓✓✓✓",7,C.grn),
        bg(2)+`<g transform="rotate(14 60 50)">`+pyr(60,24,null,true)+`</g>`+clock(24,30,.9,5)+T(24,50,"1h",9,C.red)+bot(96,82,.6,{mood:"sad"}) ],
    l:[["внизу тысячи быстрых","thousands fast at the base"],["миг против минут","a blink versus minutes"],["перевернул — сборка час","flip it — an hour build"]],
    c:["Мелких проверок у меня тысячи, они за миг. Длинных — пара. Наоборот — и все ждут час.","I run thousands of tiny quick checks and only a couple of long ones. Flip it — everyone waits."] };

  Z["Тестирование|Мок — подмена соседа"]={
    p:[ bg(3)+bot(22,82,.7,{mood:"sad",arms:"reach"})+db(64,48,.8)+cloud(98,30,.7)+L("M40 50 H50",C.ink,1.6,1)+L("M76 44 Q88 40 90 38",C.ink,1.6,1)+clock(98,62,.75,8),
        bg(4)+bot(22,82,.7,{arms:"reach"})+fake(db(66,48,.85,C.grey))+arrowR(84,26,100,C.ink)+T(110,30,"?",9)+T(66,68,"42",9,C.blue),
        bg(0)+bot(22,82,.7,{mood:"wow",arms:"up"})+fake(db(70,52,.85,C.grey))+bubble(70,20,26,T(0,3,"42",9,C.blue))+ok(104,56)+clock(104,30,.7,1) ],
    l:[["настоящие: медленно","real ones: slow"],["ставлю заглушку","I put in a stand-in"],["отвечает заданным — ✓","answers as told — ✓"]],
    c:["Мне не нужна настоящая база, чтобы проверить свой код. Манекен ответит «42» — и сразу.","I don't need a real database to test my code. A dummy says \"42\" — instantly."] };

  Z["Тестирование|Перемокал — проверяешь моки, а не код"]={
    p:[ bg(1)+fake(db(26,46,.6,C.grey))+fake(cloud(94,30,.6,C.grey))+fake(gear(60,44,1.1,C.grey))+fake(env(96,62,.6,C.grey))+ok(60,72,.9),
        bg(2)+fake(gear(44,44,1.3,C.grey))+mag(44,44,1.3)+gear(92,40,1,C.red)+bug(92,64,.8)+ok(16,22,.8),
        bg(3)+L("M30 14 V70",C.ink,1.4,1)+L("M90 14 V70",C.ink,1.4,1)+gear(60,40,1.2,C.yel)+fake(db(16,46,.55,C.grey))+fake(cloud(105,40,.55,C.grey))+ok(60,66,.9) ],
    l:[["подменил всё — ✓","mocked it all — ✓"],["а проверил заглушки","yet only stubs got tested"],["заглушки только по краям","stubs only at the edges"]],
    c:["Если подменить всё, тест зелёный, а мой код не проверен. Подменяю только внешний мир.","If I fake everything, the test is green but my code is untested. Fake only the outside world."] };

  Z["Тестирование|Testcontainers: настоящая база в тесте"]={
    p:[ bg(4)+fake(db(40,48,.85,C.grey))+bug(80,58,.8)+ok(96,28,.8)+L("M54 58 H70",C.red,1.4,1),
        bg(0)+crate(60,70,64,40,C.blue)+db(60,58,.7)+T(60,22,"SQL",9,C.blue),
        bg(1)+crate(46,70,56,40,C.blue)+db(46,58,.7)+bug(90,56,.8)+mag(90,56,1.2)+no(104,26,.8),
        bg(2)+`<rect x="30" y="30" width="56" height="40" rx="2" fill="none" stroke="${C.grey}" stroke-width="1.6" stroke-dasharray="4 3"/>`+ok(58,50,1.1)+bot(102,82,.55,{arms:"up"}) ],
    l:[["заглушка пропустила баг","the stub missed a bug"],["поднял базу в контейнере","real DB in a container"],["настоящая — поймала","the real one caught it"],["тест кончился — убрали","test over — removed"]],
    c:["Я поднимаю настоящую базу на время теста. Дольше, зато ловлю то, что манекен пропустит.","I start a real database just for the test. Slower, but it catches what a dummy misses."] };

  /* ===== Git ===== */
  Z["Git|Зачем система версий"]={
    p:[ bg(2)+kid(18,82,.8,C.red,"sad")+kid(102,82,.8,C.grn,"sad")+env(60,24,.7)+card(46,52,20,14,"#fff",T(0,3,"v2",6.5),-8)+card(74,52,22,14,"#fff",T(0,3,"v2!",6.5,C.red),8),
        bg(3)+L("M10 54 H110",C.ink,1.8)+[[24,C.red],[50,C.grn],[76,C.red],[100,C.grn]].map((n,i)=>node(n[0],54,C.blue,String(i+1))+`<circle cx="${n[0]}" cy="34" r="6" fill="#f6d1b0" stroke="${C.ink}" stroke-width=".8"/><rect x="${n[0]-6}" y="40" width="12" height="6" rx="3" fill="${n[1]}"/>`).join(""),
        bg(4)+L("M10 46 H110",C.ink,1.8)+[22,48,74,100].map((x,i)=>node(x,46,i===1?C.grn:C.grey,String(i+1))).join("")+L("M100 36 Q74 14 52 34",C.red,2)+`<path d="M50 28 l2 7 l6 -3" fill="none" stroke="${C.red}" stroke-width="2" stroke-linecap="round"/>`+bot(48,84,.42,{mood:"wow"}) ],
    l:[["архивы туда-сюда","archives back and forth"],["история: кто и когда","history: who and when"],["вернуться в любой миг","jump back anytime"]],
    c:["Я помню не файлы, а каждую правку: кто, что и зачем. Хочешь — вернёмся во вчера.","I remember every change, not just files: who, what and why. We can go back to yesterday."] };

  Z["Git|Коммит — не сохранение, а точка в истории"]={
    p:[ bg(0)+paper(22,40,["A"])+paper(48,44,["B"])+paper(74,40,["C"])+`<rect x="92" y="28" width="22" height="16" rx="3" fill="${C.ink}"/><circle cx="103" cy="36" r="5" fill="#dfe9ff"/>`+spark(98,22),
        bg(1)+[["a1f3",22],["7c2e",60],["9b04",98]].map(h=>card(h[1],40,30,22,"#fff",T(0,3,h[0],7.5,C.blue))).join("")+arrowR(38,40,44)+arrowR(76,40,82),
        bg(2)+card(30,36,36,24,"#fff",T(0,3,"+12 −3",7.5,C.grn))+ok(30,62,.9)+card(88,36,40,30,"#fff",T(0,-3,"+800",7.5,C.red)+T(0,8,"−500",7.5,C.red))+no(88,64,.9) ],
    l:[["снимок ВСЕГО проекта","a snapshot of it ALL"],["у каждого свой хэш","each gets its own hash"],["одно дело — один коммит","one change — one commit"]],
    c:["Коммит — как глава в книге: одно законченное дело. Не «всё, что наделал за день».","A commit is like a chapter: one finished change. Not \"everything I did today\"."] };

  Z["Git|Ветка — это просто указатель"]={
    p:[ bg(3)+L("M14 56 H106",C.ink,1.8)+[24,52,80].map((x,i)=>node(x,56,C.blue,String(i+1))).join("")+flag(80,46,"main",C.red),
        bg(4)+L("M14 56 H106",C.ink,1.8)+[24,52,80].map((x,i)=>node(x,56,C.blue,String(i+1))).join("")+flag(80,46,"main",C.red)+flag(86,72,"feat",C.grn).replace(/v-20/,"v-20")+spark(108,24),
        bg(0)+L("M14 46 H82 M80 46 Q90 66 100 66",C.ink,1.8)+[22,46,70].map((x,i)=>node(x,46,C.blue,String(i+1))).join("")+node(100,66,C.grn,"4")+flag(70,36,"main",C.red)+L("M100 58 v0",C.ink)+`<g transform="translate(0 0)">${flag(100,58,"feat",C.grn).replace(/v-20/,"v-14")}</g>` ],
    l:[["main — флажок на коммите","main — a flag on a commit"],["новая ветка — ещё флажок","new branch — one more flag"],["флажок ушёл вперёд","the flag moved ahead"]],
    c:["Ветка — это закладка, а не копия книги. Поставить новую — мгновенно, хоть сто штук.","A branch is a bookmark, not a copy of the book. Making one is instant — make a hundred."] };

  Z["Git|merge и rebase — два способа совместить"]={
    p:[ bg(1)+L("M10 36 H70 M34 36 Q46 62 60 62 H96",C.ink,1.8)+node(20,36,C.blue,"1")+node(46,36,C.blue,"2")+node(70,36,C.blue,"C")+node(70,62,C.grn,"A")+node(96,62,C.grn,"B"),
        bg(2)+L("M10 32 H104 M34 32 Q44 58 56 58 H82 Q96 58 104 32",C.ink,1.8)+node(20,32,C.blue,"1")+node(46,32,C.blue,"2")+node(72,32,C.blue,"C")+node(60,58,C.grn,"A")+node(84,58,C.grn,"B")+`<rect x="97" y="25" width="14" height="14" rx="2" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.2" transform="rotate(45 104 32)"/>`+T(104,35,"M",7)+T(60,78,"merge",8),
        bg(3)+L("M8 40 H112",C.ink,1.8)+node(16,40,C.blue,"1")+node(36,40,C.blue,"2")+node(56,40,C.blue,"C")+node(78,40,"#c86bfa","A'")+node(100,40,"#c86bfa","B'")+fake(node(78,62,C.grey,"A")+node(100,62,C.grey,"B"))+T(40,74,"rebase",8) ],
    l:[["две линии разошлись","two lines split apart"],["merge: узел слияния","merge: a join commit"],["rebase: в ряд, хэши новые","rebase: a line, new hashes"]],
    c:["merge сшивает линии узлом. rebase кладёт мои коммиты поверх свежих — хэши новые.","merge ties lines with a knot. rebase replays my commits on top — with new hashes."] };

  Z["Git|Железное правило rebase"]={
    p:[ bg(4)+laptop(70,62,1.2,L("M-10 -12 H10",C.grn,2)+node(-6,-12,"#c86bfa",null,3)+node(6,-12,"#c86bfa",null,3))+bot(24,82,.7,{arms:"reach"})+ok(104,24,.8),
        bg(0)+server(60,44,.8)+kid(20,82,.7,C.red)+kid(100,82,.7,C.grn)+curve(50,40,26,44,C.ink,1)+curve(70,40,94,44,C.ink,1),
        bg(1)+server(60,40,.75)+kid(18,82,.7,C.red,"sad")+kid(102,82,.7,C.grn,"sad")+L("M16 34 H34",C.blue,2)+L("M86 34 H104","#c86bfa",2)+T(25,26,"1-2-3",6.5)+T(95,26,"1-2'-3'",6.5,C.red)+no(60,76,.9) ],
    l:[["своё — переписывай","your own — rewrite away"],["общее уже забрали","others already pulled it"],["переписал общее — хаос","rewrote shared — chaos"]],
    c:["Свою ветку я переписываю сколько хочу. Общую, которую уже забрали, — никогда.","I rewrite my own branch as much as I like. A shared one others already pulled — never."] };

  /* ===== Spring: зачем ===== */
  Z["Spring: зачем|Что было до фреймворка"]={
    p:[ bg(2)+bot(28,82,.75,{mood:"sad",arms:"hold"})+gear(76,30,.8)+gear(96,48,.6,C.yel)+box(84,76,18,14)+box(104,76,14,10),
        bg(3)+bot(60,82,.8,{mood:"wow",arms:"up"})+db(20,42,.55)+paper(100,32,["port","url"],8)+lock(24,72,.8)+key(96,66,.7),
        bg(4)+R(14,20,92,18,C.grey,4)+R(14,46,26,18,C.grn,4)+gear(24,29,.5)+T(27,58,"✓",9,"#fff")+bot(84,84,.42,{mood:"think"}) ],
    l:[["сам создаю каждую деталь","I build every part myself"],["конфиг, соединения, замки","config, links, locks"],["задача — малая часть","the task is a small slice"]],
    c:["Раньше я сам собирал всё приложение: детали, провода, замки. На саму задачу не хватало сил.","I used to wire up the whole app myself: parts, links, locks. Little time left for the task."] };

  Z["Spring: зачем|Инверсия управления: не ты создаёшь, а тебе дают"]={
    p:[ bg(0)+bot(30,82,.8,{mood:"sad",arms:"reach"})+box(72,70,16,14)+gear(94,40,.7)+L("M60 30 l6 6 M63 33 l-6 6",C.wood2,3),
        bg(1)+bot(26,82,.8,{mood:"think"})+think(58,22,gear(11,-2,.42))+crate(92,74,34,30,C.grn),
        bg(2)+crate(30,74,34,30,C.grn)+arrowR(50,52,64)+bot(92,82,.8,{arms:"hold"})+gear(84,56,.38,C.yel)+gear(98,58,.32)+spark(108,22) ],
    l:[["раньше: собирал сам","before: built it myself"],["теперь: «мне нужно…»","now: \"I need…\""],["контейнер дал готовое","the container hands it"]],
    c:["Я больше не собираю объекты сам. Говорю, что нужно, — контейнер собирает и отдаёт мне.","I don't build objects anymore. I say what I need — the container builds it and hands it over."] };

  Z["Spring: зачем|Внедрение зависимостей через конструктор"]={
    p:[ bg(3)+bot(30,82,.8,{hat:true})+think(64,22,box(11,6,14,12,null,C.wood)),
        bg(4)+bot(28,82,.8,{hat:true,arms:"hold"})+box(28,62,14,12)+kid(96,82,.75,C.grn)+L("M84 54 H48",C.ink,1.6,1)+T(66,48,"?",9,C.grey),
        bg(0)+bot(28,82,.8,{hat:true,arms:"hold"})+fake(box(28,62,14,12,null,C.grey))+ok(80,40,1.1),
        bg(1)+bot(28,82,.8,{hat:true,arms:"hold"})+box(28,62,14,12,null,C.yel)+box(84,70,14,12,null,C.wood)+no(84,40,.7)+arrowR(70,52,52) ],
    l:[["прошу в конструкторе","I ask in the constructor"],["откуда — не моё дело","where from — not my job"],["в тесте — заглушка","in a test — a stub"],["сменили — код тот же","swapped — same code"]],
    c:["Я прошу нужное прямо при создании. Принесут настоящее или заглушку — мне всё равно.","I ask for what I need when I'm created. Real one or a stub — I don't care."] };

  Z["Spring: зачем|Бин — объект под управлением контейнера"]={
    p:[ bg(2)+crate(36,74,40,36,C.grn)+arrowR(58,52,72)+gear(92,46,1.1,C.yel)+T(92,72,"×1",9),
        bg(3)+gear(60,32,1.1,C.yel)+kid(22,82,.65,C.red)+kid(48,82,.65,C.grn)+kid(74,82,.65,C.blue)+kid(100,82,.65,"#c86bfa")+L("M22 50 L50 38 M48 50 L56 42 M74 50 L66 42 M100 50 L72 38",C.ink,1.1,1),
        bg(4)+gear(60,30,1.1,C.yel)+coin(60,30,.9)+kid(24,82,.75,C.red,"sad")+kid(96,82,.75,C.blue,"wow")+L("M30 46 Q44 30 52 32",C.red,1.6,1)+L("M68 32 Q80 30 90 46",C.blue,1.6,1)+no(24,24,.7) ],
    l:[["контейнер создал один","the container made one"],["все пользуются им","everyone shares it"],["оставил своё — забрали","left it there — taken"]],
    c:["Бин у меня один на всех. Положишь в его поле данные запроса — их увидит следующий.","There's one bean for everyone. Store request data in its field — the next caller sees it."] };

  Z["Spring: зачем|Контекст — место, где живут бины"]={
    p:[ bg(0)+card(22,36,20,24,"#fff",T(0,3,"@",9,C.grn))+card(48,36,20,24,"#fff")+card(74,36,20,24,"#fff",T(0,3,"@",9,C.grn))+card(100,36,20,24,"#fff",T(0,3,"@",9,C.grn))+mag(56,62,1.1),
        bg(1)+db(20,48,.55)+T(20,72,"1",9,C.blue)+arrowR(32,46,46)+box(58,58,18,16)+T(58,72,"2",9,C.blue)+arrowR(70,46,84)+gear(98,46,.8,C.yel)+T(98,72,"3",9,C.blue),
        bg(2)+`<rect x="22" y="22" width="76" height="52" rx="3" fill="${C.wood2}"/><path d="M22 48 h76" stroke="${C.wood}" stroke-width="3"/>`+db(40,40,.4)+box(60,46,14,14)+gear(82,36,.6,C.yel)+box(44,72,14,12)+gear(76,62,.5),
        bg(3)+`<rect x="8" y="22" width="40" height="52" rx="3" fill="${C.wood2}"/><path d="M8 48 h40" stroke="${C.wood}" stroke-width="3"/>`+gear(28,36,.6,C.yel)+box(28,72,14,12)+curve(42,34,74,42,C.blue,1)+kid(80,82,.75,C.grn)+gear(96,44,.4,C.yel) ],
    l:[["ищу классы с @","find classes with @"],["создаю: сперва нужное","create needs first"],["кладу в контекст","put them in the context"],["раздаю ссылки","hand out references"]],
    c:["На старте я нахожу помеченные классы, создаю их по порядку и складываю. Потом только раздаю.","At start I find marked classes, build them in order and store them. Then I just hand them out."] };

  Z["Spring: зачем|Прокси: почему @Transactional вообще работает"]={
    p:[ bg(4)+kid(14,82,.6,C.red)+arrowR(24,46,36)+wrap(38,20,76,56)+lock(48,48,.8,true)+T(76,30,"BEGIN",7,"#8a3fc0")+box(90,68,24,26,null,C.wood),
        bg(0)+wrap(14,18,96,58)+lock(26,48,.8,true)+box(70,68,40,36,null,C.wood)+gear(70,48,.8,C.yel)+spin(98,26),
        bg(1)+wrap(14,18,96,58)+lock(26,48,.8)+box(70,68,40,36,null,C.wood)+T(62,30,"COMMIT",7,"#8a3fc0")+ok(104,12,.8) ],
    l:[["обёртка: BEGIN","wrapper: BEGIN"],["твой метод работает","your method runs"],["обёртка: COMMIT","wrapper: COMMIT"]],
    c:["Наружу я отдаю не твой класс, а обёртку. Она открывает транзакцию и коммитит — ты не замечаешь.","I hand out a wrapper, not your class. It opens the transaction and commits — you never notice."] };

  Z["Spring: зачем|Главная ловушка прокси"]={
    p:[ bg(2)+arrowR(4,48,30)+wrap(30,18,84,58)+lock(40,48,.7)+box(64,64,22,22,"a",C.wood)+box(96,64,22,22,"b",C.wood)+ok(64,26,.7),
        bg(3)+wrap(6,18,108,58)+box(36,64,26,24,"a",C.wood)+box(86,64,26,24,"b",C.wood)+curve(44,38,80,38,C.red)+T(62,24,"this.b()",7,C.red)+lock(86,30,.6,true),
        bg(4)+paper(36,40,[" "," "," "],-4)+T(36,42,"?",14,C.grey)+bot(88,82,.8,{mood:"wow"}) ],
    l:[["снаружи — через обёртку","outside — via the wrapper"],["this.b() — мимо обёртки","this.b() — skips wrapper"],["ни ошибки, ни лога","no error, no log"]],
    c:["Вызвал свой же метод через this — обёртку обошёл. Транзакции нет, и никто об этом не скажет.","Call your own method via this — you bypass the wrapper. No transaction, and nobody tells you."] };

  /* ===== Spring Boot ===== */
  Z["Spring Boot|Что болело до Boot"]={
    p:[ bg(0)+server(24,48,.7)+db(56,58,.5)+lock(88,40,.9)+card(98,66,22,14,"#fff",T(0,3,"{ }",8))+gear(56,24,.6),
        bg(1)+[0,1,2,3,4].map(i=>card(36,68-i*10,40,9,"#fff",L("M-14 0 H14",C.grey,1.4))).join("")+card(88,64,30,14,"#fff",L("M-10 0 H10",C.blue,1.6))+T(36,16,">",9)+T(88,48,"code",7),
        bg(2)+clock(36,38,1.3,9)+T(36,64,"×3",10,C.red)+bot(88,82,.75,{mood:"sad"}) ],
    l:[["всё настраивай руками","set it all up by hand"],["настроек больше кода","more config than code"],["старт — несколько дней","start takes days"]],
    c:["Раньше сервер, пул, JSON и защиту настраивали руками. Новый проект стартовал днями.","Server, pool, JSON, security — all by hand. A new project took days to start."] };

  Z["Spring Boot|Автоконфигурация: нашёл — настроил"]={
    p:[ bg(3)+crate(44,74,56,34,C.wood)+box(32,66,14,14,null,C.blue)+box(54,66,14,14,null,C.grn)+mag(90,40,1.3)+T(44,30,"classpath",7),
        bg(4)+box(24,62,16,16,null,C.blue)+T(24,57,"SQL",6,"#fff")+arrowR(36,50,52)+db(76,46,.7)+pool(64,74,4,0,8),
        bg(0)+box(24,62,16,16,null,C.grn)+T(24,57,"web",6,"#fff")+arrowR(36,50,52)+server(80,46,.8),
        bg(1)+paper(36,40,["port","8080"],-4)+fake(paper(84,40,["port","9000"],4))+ok(36,70,.8)+no(84,70,.7) ],
    l:[["Boot смотрит в classpath","Boot checks the classpath"],["есть драйвер — есть пул","driver found — pool up"],["есть web — есть сервер","web found — server up"],["твоя настройка главнее","your setting wins"]],
    c:["Я заглядываю в зависимости: есть драйвер базы — подниму пул, есть веб — сервер. Твоё важнее.","I peek at the dependencies: a DB driver means a pool, web means a server. Yours wins."] };

  Z["Spring Boot|Стартеры: одна зависимость вместо двадцати"]={
    p:[ bg(1)+[0,1,2,3].map(r=>[0,1,2,3,4].map(c=>box(18+c*14,30+r*14,11,11,null,(r+c)%3===0?C.red:C.wood)).join("")).join("")+bot(98,82,.7,{mood:"sad"})+no(98,14,.7),
        bg(2)+crate(52,76,52,40,C.grn)+T(52,58,"starter",8,"#fff")+T(52,68,"web",8,"#fff")+bot(102,82,.65,{arms:"up"}),
        bg(3)+server(26,44,.6)+card(60,36,24,16,"#fff",T(0,3,"{ }",8))+ok(92,36,.8)+ok(60,62,.7)+ok(26,72,.7)+ok(92,62,.7) ],
    l:[["двадцать штук вручную","twenty picked by hand"],["одна: starter-web","just one: starter-web"],["внутри всё и совместимо","all inside, all matching"]],
    c:["Вместо двадцати подобранных вручную — одна коробка. Внутри всё нужное, и версии дружат.","Instead of twenty hand-picked pieces, one box. Everything inside, and the versions get along."] };

  Z["Spring Boot|Встроенный сервер и один jar"]={
    p:[ bg(4)+`<path d="M58 74 V30 L88 16 L118 30 V74 Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>`+`<rect x="80" y="50" width="16" height="24" fill="#4a5168"/>`+box(30,62,22,18,"war",C.wood)+arrowR(44,52,74),
        bg(0)+crate(60,76,60,46,C.wood)+server(50,52,.55)+gear(76,50,.6,C.yel)+T(60,24,"jar",9),
        bg(1)+laptop(36,60,1.3,T(0,-11,"java -jar",5.5,C.ink))+arrowR(64,40,80)+server(98,46,.7)+spark(110,20),
        bg(2)+crate(60,72,80,40,C.blue)+box(60,62,22,18,"jar",C.wood)+T(60,24,"k8s",9,C.blue) ],
    l:[["раньше: war в сервер","before: war into a server"],["Boot: сервер внутри jar","Boot: server in the jar"],["java -jar — и работает","java -jar — and it runs"],["легко в контейнер","fits a container"]],
    c:["Раньше программу клали внутрь сервера. Теперь сервер внутри программы — один файл, и поехали.","We used to put apps inside a server. Now the server is inside the app — one file, and go."] };

  Z["Spring Boot|Конфигурация и профили"]={
    p:[ bg(3)+card(60,42,56,46,"#fff",T(0,-12,"yml",8,C.blue)+T(0,2,"port: 8080",7)+T(0,14,"db: …",7)),
        bg(4)+card(32,42,40,40,"#fff",T(0,-8,"dev",8,C.grn)+db(0,12,.35))+card(88,42,40,40,"#fff",T(0,-8,"prod",8,C.red)+db(0,14,.6)),
        bg(0)+card(46,46,50,30,"#fff",T(0,3,"port: 8080",7)+L("M-20 0 H20",C.red,1.6))+card(76,24,52,18,C.yel,T(0,3,"PORT=9090",7))+ok(100,62,.8)+crate(24,80,16,10,C.blue) ],
    l:[["настройки в yml","settings live in yml"],["dev и prod — разные числа","dev and prod differ"],["env-переменная главнее","an env var beats the file"]],
    c:["Настройки одни, а числа для dev и prod разные. Переменная окружения перебивает файл.","One list of settings, different numbers for dev and prod. An env variable beats the file."] };

  Z["Spring Boot|Actuator: приложение рассказывает о себе"]={
    p:[ bg(1)+server(36,46,.85)+heart(80,36,1.3)+T(82,64,"UP",10,C.grn)+T(82,76,"/health",7),
        bg(2)+server(32,46,.85)+`<path d="M60 44 h10 l4 -10 l6 20 l4 -10 h16" stroke="${C.red}" stroke-width="2" fill="none" stroke-linejoin="round"/>`+T(84,70,"/metrics",7)+T(84,22,"CPU 40%",7),
        bg(3)+wheel(24,36,1)+bubble(68,22,30,T(0,3,"/health",6.5))+server(96,54,.6)+T(66,74,"UP?",9,C.blue),
        bg(4)+server(30,46,.8,false)+T(30,78,"DOWN",8,C.red)+wheel(70,30,.8)+spin(70,60,C.grn)+server(102,54,.55)+T(102,80,"UP",7,C.grn) ],
    l:[["/health: живо?","/health: alive?"],["/metrics: пульс","/metrics: the pulse"],["k8s спрашивает сам","k8s keeps asking"],["упало — перезапуск","down — restart"]],
    c:["Я сам говорю, жив ли и готов ли работать. Кластер спрашивает и, если что, перезапускает.","I tell whether I'm alive and ready. The cluster keeps asking and restarts me if needed."] };

  /* ===== Spring в работе ===== */
  Z["Spring в работе|Как приходит HTTP-запрос"]={
    p:[ bg(0)+env(28,40,1)+T(28,62,"POST",8,C.blue)+arrowR(46,40,66)+server(88,44,.8),
        bg(1)+T(40,28,"/orders",8,C.blue)+mag(40,48,1.2)+[0,1,2].map(i=>card(94,24+i*18,30,13,i===1?C.yel:"#fff",T(0,3,["/users","/orders","/pay"][i],6))).join(""),
        bg(2)+card(28,42,32,26,"#fff",T(0,3,"{ }",11,C.blue))+arrowR(48,42,70)+box(92,56,24,22,null,C.wood),
        bg(3)+bot(60,82,.85,{arms:"hold"})+box(60,64,14,12,null,C.wood)+spark(92,26)+spark(28,30,C.grn),
        bg(4)+box(28,58,24,22,null,C.wood)+arrowR(46,46,66)+card(90,44,32,26,"#fff",T(0,3,"{ }",11,C.grn))+T(90,70,"200",8,C.grn) ],
    l:[["запрос пришёл","the request arrives"],["ищу метод по пути","find method by path"],["JSON → объект","JSON → object"],["твой код — середина","your code — the middle"],["объект → JSON","object → JSON"]],
    c:["Принять, найти метод, разобрать JSON, упаковать ответ — это я. Ты пишешь только середину.","Receive, route, parse JSON, pack the reply — that's my job. You write only the middle."] };

  Z["Spring в работе|Три слоя и зачем они"]={
    p:[ bg(1)+R(24,10,72,20,"#fff",4)+T(60,23,"HTTP",8,C.blue)+R(24,34,72,20,"#fff",4)+gear(60,44,.5,C.yel)+R(24,58,72,22,"#fff",4)+db(60,72,.32),
        bg(2)+R(24,10,72,20,"#fff",4)+T(60,23,"HTTP",8,C.blue)+R(24,34,72,20,"#fff",4)+gear(60,44,.5,C.yel)+R(24,58,72,22,C.yel,4)+db(60,72,.32,C.grn)+ok(108,44,.7),
        bg(3)+R(24,10,72,20,C.yel,4)+T(60,23,"Kafka",8,"#8a3fc0")+R(24,34,72,20,"#fff",4)+gear(60,44,.5,C.yel)+R(24,58,72,22,"#fff",4)+db(60,72,.32)+ok(108,44,.7) ],
    l:[["вход, правила, база","entry, rules, storage"],["новая база — правила те же","new DB — same rules"],["новый вход — логика та же","new entry — same logic"]],
    c:["Каждый этаж знает своё. Сменили базу или протокол — бизнес-правила в середине не трогаем.","Each floor knows its own job. Swap the DB or the protocol — the rules in the middle stay put."] };

  Z["Spring в работе|Spring Data: репозиторий без реализации"]={
    p:[ bg(4)+card(60,36,96,22,"#fff",T(0,3,"findByClientId(id)",7.5,C.blue))+bot(60,86,.5,{mood:"smile"}),
        bg(0)+card(22,36,26,16,C.yel,T(0,3,"find",7))+card(48,36,22,16,"#fff",T(0,3,"By",7))+card(88,36,46,16,C.grn,T(0,3,"ClientId",7,"#fff"))+mag(60,64,1.1),
        bg(1)+card(46,30,84,30,"#fff",T(0,-3,"SELECT …",7,C.blue)+T(0,8,"client_id = ?",7,C.blue))+arrowR(46,58,66)+db(86,62,.55)+spark(18,62),
        bg(2)+paper(44,40,["SQL","JOIN","GROUP"],-3)+bot(94,82,.75,{glasses:true,mood:"think",arms:"reach"}) ],
    l:[["пишу только имя метода","I just name the method"],["Spring читает имя","Spring reads the name"],["сам строит запрос","builds the query itself"],["сложное — руками","complex — by hand"]],
    c:["Пишешь «найди по клиенту» в имени метода — запрос я соберу сам. Хитрое пиши руками.","Name the method \"find by client\" and I write the query myself. Tricky ones — write by hand."] };

  Z["Spring в работе|Где начинается и кончается транзакция"]={
    p:[ bg(2)+arrowR(6,46,24)+tx(26,16,88,60)+T(70,30,"BEGIN",8,C.wood2)+key(54,58,.9)+pool(80,58,3,1,9),
        bg(3)+tx(8,16,104,60)+box(28,66,16,16,"1")+box(60,66,16,16,"2")+box(92,66,16,16,"3")+T(60,32,"= 1",10),
        bg(4)+tx(6,16,88,60)+T(48,30,"COMMIT",8,C.wood2)+ok(48,54,1)+arrowR(96,46,116)+key(100,72,.6),
        bg(0)+tx(6,12,70,64)+cloud(40,36,.7)+clock(40,60,.7,8)+pool(86,26,3,3,10)+kid(96,82,.6,C.red,"sad") ],
    l:[["вход в метод: BEGIN","method start: BEGIN"],["внутри — одно целое","inside — one unit"],["выход: COMMIT","exit: COMMIT"],["долгий вызов держит пул","a slow call holds the pool"]],
    c:["Вошёл в метод — взял соединение, вышел — отдал. Ждёшь сеть внутри — соединение стоит без дела.","Enter the method — take a connection; leave — give it back. Waiting on the network wastes it."] };

  Z["Spring в работе|Три грабли, на которые наступают все"]={
    p:[ bg(3)+wrap(8,20,104,52)+box(36,62,22,22,"a",C.wood)+box(84,62,22,22,"b",C.wood)+curve(44,38,78,38,C.red)+T(60,82,"this",8,C.red),
        bg(4)+db(20,48,.6)+[0,1,2,3,4].map(i=>L(`M36 ${46} L${98} ${18+i*13}`,i?C.red:C.blue,1.3)+box(106,22+i*13,10,9,null,i?C.red:C.blue)).join("")+T(22,80,"N+1",9,C.red),
        bg(0)+lock(28,40,1.3)+box(68,66,26,24,"?",C.wood)+zap(96,32,1.2,C.red)+T(96,62,"!",12,C.red) ],
    l:[["self-call мимо прокси","self-call skips proxy"],["N+1: по одному","N+1: one by one"],["ленивое после закрытия","lazy after close"]],
    c:["Все три — от того, что я делаю много незаметно. Не знаешь мои границы — получаешь сюрприз.","All three come from me doing lots quietly. Don't know where I stop — you get a surprise."] };

  /* ===== Транзакции Spring ===== */
  Z["Транзакции Spring|Propagation: что будет, если транзакция уже есть"]={
    p:[ bg(4)+tx(10,14,100,62)+box(36,62,22,20,"A",C.wood)+box(84,62,22,20,"B",C.wood)+T(60,28,"REQUIRED",7,C.wood2),
        bg(0)+tx(6,14,46,62,C.grey)+box(29,62,22,20,"A",C.wood)+T(29,30,"||",10,C.grey)+tx(62,14,52,62,C.grn)+box(88,62,22,20,"B",C.wood)+T(88,30,"NEW",8,C.grn),
        bg(1)+tx(6,14,46,62,C.red)+box(29,62,22,20,"A",C.grey)+no(29,28,.8)+tx(62,14,52,62,C.grn)+box(88,62,22,20,"B",C.wood)+ok(88,28,.8) ],
    l:[["REQUIRED: в общую","REQUIRED: join the one"],["NEW: пауза, своя","NEW: pause, open own"],["общая откат — своя цела","outer undone, inner kept"]],
    c:["REQUIRED — в общую транзакцию. REQUIRES_NEW — своя: она уцелеет, даже если общая откатится.","REQUIRED joins the outer one. REQUIRES_NEW opens its own — it survives an outer rollback."] };

  Z["Транзакции Spring|Откат только на unchecked"]={
    p:[ bg(2)+zap(22,34,1.2,C.red)+T(22,60,"Runtime",7,C.red)+L("M90 28 a12 12 0 1 0 6 10",C.blue,2.2)+`<path d="M86 24 l4 4 l5 -3" fill="none" stroke="${C.blue}" stroke-width="2"/>`+db(90,58,.5)+ok(60,42,.8),
        bg(3)+zap(22,34,1.2,C.yel)+T(22,60,"checked",7,C.wood2)+arrowR(38,40,58)+db(86,48,.6)+T(86,78,"COMMIT",7,C.red)+no(108,24,.7),
        bg(4)+card(54,26,96,16,C.yel,T(0,3,"rollbackFor = Exception",6.5))+zap(22,58,1,C.yel)+arrowR(36,58,60)+db(86,60,.5)+ok(108,72,.6) ],
    l:[["Runtime — откат","Runtime — rollback"],["checked — коммит!","checked — commit!"],["rollbackFor — откат","rollbackFor — rollback"]],
    c:["Откатываю только на RuntimeException. Проверяемое — коммичу, пока не укажешь rollbackFor.","I roll back only on RuntimeException. A checked one commits unless you set rollbackFor."] };

  Z["Транзакции Spring|readOnly — не просто подсказка"]={
    p:[ bg(0)+[0,1,2].map(i=>box(22+i*20,70,14,14)+fake(box(22+i*20,48,14,14,null,C.grey))).join("")+mag(96,44,1.3)+clock(96,72,.6,8),
        bg(1)+card(60,24,84,16,C.yel,T(0,3,"readOnly = true",7))+[0,1,2].map(i=>box(26+i*20,72,14,14)).join("")+spark(96,56)+clock(96,72,.55,1),
        bg(2)+db(30,54,.75)+db(90,54,.65,C.grn)+T(30,82,"main",7)+T(90,82,"replica",7)+curve(60,26,88,34,C.grn)+env(54,22,.5) ],
    l:[["следит за каждым объектом","watches every object"],["readOnly: не следит","readOnly: no watching"],["чтение — на реплику","reads go to a replica"]],
    c:["Пометил «только читаю» — я не слежу за изменениями и могу отправить запрос на копию базы.","Mark it \"just reading\" — I stop tracking changes and can send the query to a DB copy."] };

  Z["Транзакции Spring|Границы держи узкими"]={
    p:[ bg(3)+tx(6,14,108,58)+db(22,48,.5)+env(56,44,.7)+cloud(94,46,.6)+clock(60,80,.5,9),
        bg(4)+pool(18,18,5,5,10)+T(18,34,"0",8,C.red)+[0,1,2].map(i=>kid(30+i*24,82,.6,[C.red,C.grn,C.blue][i],"sad")).join("")+clock(100,52,.8,10),
        bg(0)+tx(6,14,34,58)+db(23,48,.5)+env(64,44,.7)+cloud(98,46,.6)+pool(60,80,5,1,10).replace(/cy="80"/g,'cy="78"') ],
    l:[["внутри и база, и письмо","DB and mail inside"],["под нагрузкой пул пуст","under load: pool empty"],["внутри только база","only the DB inside"]],
    c:["Пока письмо и сеть внутри транзакции, соединение занято. Обрамляй только работу с базой.","While mail and network sit inside the transaction, the connection is busy. Wrap only DB work."] };

  /* ===== Quarkus ===== */
  Z["Quarkus|Зачем понадобился ещё один фреймворк"]={
    p:[ bg(1)+crate(46,76,56,46,C.wood)+T(46,48,"300 MB",8,"#fff")+clock(98,36,.9,10)+T(98,62,"5 s",8,C.red),
        bg(2)+L("M10 70 L40 66 L50 22 L60 66 L110 68",C.red,2.2)+[0,1,2].map(i=>server(78+i*14,50,.4,i>0?false:undefined)).join("")+clock(24,32,.6,10),
        bg(3)+[0,1,2,3].map(i=>coin(30+i*6,70-i*7,1)).join("")+coin(52,70,1)+coin(58,63,1)+cloud(86,34,.8)+bot(92,82,.55,{mood:"sad"}) ],
    l:[["старт секунды, сотни МБ","slow start, lots of RAM"],["всплеск — копии не успели","spike — copies too slow"],["облако берёт за память","the cloud bills memory"]],
    c:["Я долго разгоняюсь и ем много памяти. В облаке под всплеск это медленно и дорого.","I start slowly and eat lots of memory. In the cloud that makes spikes slow and costly."] };

  Z["Quarkus|Главная идея: работать на сборке, а не на старте"]={
    p:[ bg(4)+[0,1,2].map(i=>card(20+i*18,34,14,18,"#fff",T(0,3,"@",7,C.grn))).join("")+mag(46,62,1)+bot(96,82,.7,{mood:"think"})+clock(96,14,.55,7),
        bg(0)+gear(28,36,1,C.yel)+gear(46,52,.7)+arrowR(62,46,76)+box(96,68,30,26,"✓",C.wood),
        bg(1)+box(30,68,30,26,"✓",C.wood)+arrowR(50,50,66)+bot(92,82,.75,{arms:"up",mood:"wow"})+spark(110,22) ],
    l:[["Spring: разбор на старте","Spring: work at startup"],["Quarkus: всё на сборке","Quarkus: work at build"],["старт — почти мгновенно","start — almost instant"]],
    c:["Что Spring выясняет при запуске, Quarkus делает заранее, на сборке. На старте — только открыть.","What Spring works out at launch, Quarkus does at build. Startup just opens the box."] };

  Z["Quarkus|Native image: программа без JVM"]={
    p:[ bg(2)+box(18,58,20,18,"jar",C.wood)+arrowR(30,48,42)+bot(60,82,.6,{glasses:true,mood:"think"})+T(60,20,"JVM",8,C.blue)+arrowR(76,48,88)+chip(104,48,T(0,3,"CPU",6,"#fff")).replace("translate(104 48)","translate(104 48) scale(.6)"),
        bg(3)+box(18,58,20,18,"jar",C.wood)+arrowR(30,48,44)+gear(60,48,.9,C.yel)+T(60,24,"GraalVM",7)+arrowR(76,48,90)+card(104,48,24,22,"#fff",T(0,-2,"0101",6)+T(0,7,"1100",6)),
        bg(4)+clock(26,34,.8,1)+T(26,58,"ms",9,C.grn)+R(56,54,10,20,C.grn,1)+R(72,24,10,50,C.grey,1)+T(61,50,"↓",8,C.grn)+spark(100,40),
        bg(0)+clock(30,36,1,10)+T(30,62,"min",8,C.red)+paper(86,40,["Class","✓","✓"]) ],
    l:[["обычно: через JVM","usually: via the JVM"],["GraalVM → машинный код","GraalVM → machine code"],["старт мс, памяти мало","ms start, low memory"],["цена: долгая сборка","price: a slow build"]],
    c:["Меня сразу переводят в машинный код: запуск — миг. Но сборка долгая, а динамику объяви заранее.","Straight to machine code: instant start. But slow builds, and dynamic bits declared upfront."] };

  Z["Quarkus|Почему рефлексия — враг native"]={
    p:[ bg(1)+node(16,44,C.blue,"M")+L("M23 40 L40 26 M23 48 L40 62",C.ink,1.6)+box(48,34,16,14,"A",C.wood)+box(48,70,16,14,"B",C.wood)+box(82,52,16,14,"C",C.grey)+arrowR(92,46,104)+`<path d="M104 54 h12 l-2 22 h-8 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.1"/>`,
        bg(2)+card(60,30,92,18,"#fff",T(0,3,"forName(\"C\")",7.5,C.red))+bot(28,84,.6,{mood:"think"})+T(80,64,"?",16,C.grey),
        bg(3)+server(36,46,.85,false)+zap(70,30,1.2,C.red)+T(90,60,"C?",12,C.red)+no(92,26,.8),
        bg(4)+paper(32,40,["C","D"])+ok(32,72,.7)+box(80,62,22,20,"C",C.wood)+ok(98,36,.7) ],
    l:[["лишнее — в мусор","unused — to the bin"],["а тут класс по строке","but a class by a string"],["в проде — падение","crash in prod"],["регистрируем вручную","register it by hand"]],
    c:["Сборщик выкидывает всё, что не зовут явно. Класс по имени-строке он не видит — впиши его сам.","The build drops anything not called directly. It can't see a class named in a string — list it."] };

  Z["Quarkus|Когда что выбирать"]={
    p:[ bg(0)+[0,1,2].map(r=>[0,1,2,3].map(c=>box(20+c*16,40+r*16,12,12,null,[C.wood,C.blue,C.grn][(r+c)%3])).join("")).join("")+kid(96,82,.6,C.red)+kid(108,82,.5,C.grn),
        bg(1)+cloud(60,26,.9)+[0,1,2,3,4].map(i=>box(20+i*20,72,12,12,null,C.yel)).join("")+spark(104,18),
        bg(2)+L("M60 22 V70 M28 30 H92",C.ink,2)+`<path d="M50 74 h20 l-4 -6 h-12 z" fill="${C.wood}"/>`+coin(22,46,1)+coin(32,46,1)+kid(94,52,.45,C.red)+`<path d="M14 36 h28 l-4 16 h-20 z M80 36 h28 l-4 16 h-20 z" fill="none" stroke="${C.ink}" stroke-width="1"/>` ],
    l:[["Boot: огромная экосистема","Boot: a huge ecosystem"],["Quarkus: старт и память","Quarkus: start and RAM"],["взвесь счёт и найм","weigh bill vs hiring"]],
    c:["Не «что моднее», а что дешевле тебе: счёт за облако против людей, которых сможешь нанять.","Not \"what's newer\" but what costs you less: the cloud bill versus who you can hire."] };

  /* ===== Многопоточность ===== */
  Z["Многопоточность|Зачем вообще потоки"]={
    p:[ bg(3)+bot(24,82,.7,{mood:"think"})+db(64,52,.55)+clock(64,20,.6,8)+chip(100,52,T(0,4,"z",9,C.grey)).replace("translate(100 52)","translate(100 52) scale(.55)"),
        bg(4)+bot(24,82,.65,{mood:"think"})+db(54,52,.5)+bot(92,82,.65,{arms:"reach"})+gear(106,46,.55,C.yel),
        bg(0)+chip(36,42,[0,1].map(r=>[0,1].map(c=>`<rect x="${-9+c*10}" y="${-9+r*10}" width="8" height="8" rx="1" fill="${r+c===0?C.yel:"#6c7590"}"/>`).join("")).join(""))+arrowR(58,42,70)+chip(90,42,[0,1].map(r=>[0,1].map(c=>`<rect x="${-9+c*10}" y="${-9+r*10}" width="8" height="8" rx="1" fill="${C.yel}"/>`).join("")).join("")) ],
    l:[["жду базу — CPU спит","waiting DB — CPU idle"],["второй поток работает","a 2nd thread works"],["ядер много — нужно больше","many cores, need more"]],
    c:["Пока я жду базу, процессор скучает. Второй поток займёт паузу, а ядер у меня много.","While I wait for the DB, the CPU is bored. A second thread fills the gap — I have many cores."] };

  Z["Многопоточность|Потоки делят память — отсюда все беды"]={
    p:[ bg(1)+board(30,34,40,26,T(0,4,"x=1",8,"#fff"))+board(90,34,40,26,T(0,4,"x=5",8,"#fff"))+L("M60 14 V76",C.ink,1.6,1)+bot(30,84,.45)+bot(90,84,.45),
        bg(2)+board(60,30,80,30,T(0,4,"x=1",9,"#fff"))+bot(30,84,.5,{arms:"up"})+bot(90,84,.5,{arms:"up"})+spark(60,58),
        bg(3)+board(60,30,80,30,T(-14,4,"x=1",9,"#fff")+T(12,0,"2",11,C.yel)+T(26,4,"?",9,C.red))+bot(30,84,.5,{arms:"up",mood:"wow"})+bot(90,84,.5,{arms:"up",mood:"wow"})+no(60,60,.8) ],
    l:[["процессы: у каждого своя","processes: one board each"],["потоки: одна на всех","threads: one shared board"],["пишут вместе — каша","both write — a mess"]],
    c:["У потоков одна доска на всех: передать — мгновенно. Но двое пишут в одно место — каша.","Threads share one board: passing data is instant. But two writing one spot make a mess."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 3 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* свои детали */
  const nb=(x,y,v,col,w)=>card(x,y,w||22,18,"#fff",txt(0,4.5,v,12,col||C.ink));
  const tag=(x,y,t,col,w)=>card(x,y,w||40,13,col||C.blue,txt(0,3,t,7,"#fff"));
  const sm=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
  const bolt=(x,y,s)=>sm(x,y,s||1,`<path d="M2 -12 L-6 2 H0 L-3 12 L7 -3 H1 Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.1" stroke-linejoin="round"/>`);
  const line=(x1,y1,x2,y2,col,w,dash)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="${w||1.6}" stroke-linecap="round" ${dash?'stroke-dasharray="3 2.5"':""} fill="none"/>`;
  const arrowD=(x,y1,y2,col)=>line(x,y1,x,y2-1,col,2)+`<path d="M${x-4} ${y2-6} L${x} ${y2} L${x+4} ${y2-6}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arrowL=(x1,y,x2,col)=>line(x1,y,x2+4,y,col,2)+`<path d="M${x2+6} ${y-4} L${x2} ${y} L${x2+6} ${y+4}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* платформа-тележка = поток ОС */
  const cart=(x,y,w)=>{ w=w||44; return `<rect x="${x-w/2}" y="${y-10}" width="${w}" height="6" rx="2" fill="#4a5168" stroke="${C.ink}" stroke-width="1.1"/><circle cx="${x-w/2+7}" cy="${y-2}" r="3.5" fill="${C.ink}"/><circle cx="${x+w/2-7}" cy="${y-2}" r="3.5" fill="${C.ink}"/>`+txt(x,y-5.3,"OS",5,"#fff"); };
  /* стеллаж: x0,y0 — левый верх, cols столбцов, на полках коробки */
  const rack=(x0,y0,w,cols)=>{ const h=52,cw=w/cols; let s=`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#f6e6d0" stroke="${C.wood2}" stroke-width="1.6"/>`;
    [1,2].forEach(i=>s+=line(x0,y0+i*h/3,x0+w,y0+i*h/3,C.wood2,1.6));
    for(let c=1;c<cols;c++) s+=line(x0+c*cw,y0,x0+c*cw,y0+h,C.wood2,1.2);
    for(let r=0;r<3;r++) for(let c=0;c<cols;c++) s+=box(x0+c*cw+cw/2,y0+(r+1)*h/3,Math.min(10,cw-6),8,null,C.wood);
    return s; };
  /* таблица-картотека */
  const grid=(x0,y0,hiR,hiC)=>{ const cw=24,rh=12,hd=["id","sum","qty"],rows=[["1","50","2"],["2","90","1"],["3","20","5"]]; let s="";
    for(let c=0;c<3;c++){ s+=`<rect x="${x0+c*cw}" y="${y0}" width="${cw}" height="${rh}" fill="${hiC===c?C.blue:"#8a93ad"}" stroke="${C.ink}" stroke-width="1"/>`+txt(x0+c*cw+cw/2,y0+8.5,hd[c],7,"#fff"); }
    rows.forEach((r,i)=>r.forEach((v,c)=>{ const on=hiR===i||hiC===c; s+=`<rect x="${x0+c*cw}" y="${y0+(i+1)*rh}" width="${cw}" height="${rh}" fill="${hiR===i?C.yel:hiC===c?"#cfe5fb":"#fff"}" stroke="${C.ink}" stroke-width="1"/>`+txt(x0+c*cw+cw/2,y0+(i+1)*rh+8.5,v,7,C.ink,on?900:600); }));
    return s; };
  /* мини-дерево индекса */
  const mtree=(x,y,col)=>line(x,y,x-7,y+10,C.ink,1.2)+line(x,y,x+7,y+10,C.ink,1.2)+`<circle cx="${x}" cy="${y}" r="3.4" fill="${col||C.grn}" stroke="${C.ink}"/><circle cx="${x-7}" cy="${y+10}" r="3" fill="${col||C.grn}" stroke="${C.ink}"/><circle cx="${x+7}" cy="${y+10}" r="3" fill="${col||C.grn}" stroke="${C.ink}"/>`;
  const tableT=(x,y,w)=>{ w=w||28; return `<rect x="${x-w/2}" y="${y-20}" width="${w}" height="4" rx="1.5" fill="${C.wood}" stroke="${C.wood2}"/><path d="M${x-w/2+4} ${y-16} V${y} M${x+w/2-4} ${y-16} V${y}" stroke="${C.wood2}" stroke-width="2.4"/>`; };
  const car=(x,y,lab)=>`<path d="M${x-22} ${y-6} v-10 h10 l6 -9 h16 l6 9 h6 v10 z" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/><rect x="${x-9}" y="${y-23}" width="8" height="6" fill="#dfe9ff"/><rect x="${x+1}" y="${y-23}" width="8" height="6" fill="#dfe9ff"/><circle cx="${x-13}" cy="${y-5}" r="4.5" fill="${C.ink}"/><circle cx="${x+13}" cy="${y-5}" r="4.5" fill="${C.ink}"/>${lab?txt(x,y-9,lab,5.5,"#fff"):""}`;
  const ball=(x,y,col)=>`<circle cx="${x}" cy="${y}" r="3.4" fill="${col||C.ant}" stroke="${C.ink}" stroke-width=".8"/>`;
  const slash=(x,y,r)=>line(x-r,y+r,x+r,y-r,C.red,2.6);
  const kidbox=(x,y,s,col,lab,mood)=>kid(x,y,s,col,mood)+box(x,y-9*s,14*s+4,12*s+2,lab,C.wood);

  const Z={}, M="Многопоточность|", J="java.util.concurrent|", V="Virtual threads|", R="Реактивность|", D="Базы данных|", P="PostgreSQL|";

  /* 124 */
  const mini=(x,v,col)=>card(x,32,v.length>2?26:18,14,"#fff",txt(0,4,v,8,col||C.ink));
  Z[M+"Гонка: почему count++ теряет значения"]={
    p:[ bg(0)+nb(60,22,"5",C.ink,28)+kid(26,82,.9,C.red)+kid(94,82,.9,C.grn)+mini(26,"5")+mini(94,"5")+line(46,24,34,28,C.grey,1.4,1)+line(74,24,86,28,C.grey,1.4,1),
        bg(1)+nb(60,22,"5",C.ink,28)+kid(26,82,.9,C.red)+kid(94,82,.9,C.grn)+mini(26,"5+1",C.blue)+mini(94,"5+1",C.blue),
        bg(2)+nb(60,22,"6",C.ink,28)+kid(26,82,.9,C.red)+kid(94,82,.9,C.grn)+mini(26,"6",C.red)+mini(94,"6",C.grn)+curve(26,25,46,24,C.red)+curve(94,25,74,24,C.grn),
        bg(3)+nb(60,22,"6",C.ink,28)+no(84,14,.8)+txt(60,54,"6 ≠ 7",13,C.red)+kid(98,82,.85,C.grn,"wow")+bot(22,84,.6,{mood:"sad"}) ],
    l:[["оба прочли 5","both read 5"],["оба прибавили 1","both add 1"],["оба записали 6","both write 6"],["один +1 пропал","one +1 is lost"]],
    c:["count++ — это три шага. Двое влезли между шагами, и одна единица пропала.","count++ is three steps. Two threads squeezed in between, and one +1 vanished."] };

  /* 125 */
  const booth=(x0,w)=>`<rect x="${x0}" y="22" width="${w}" height="56" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`;
  Z[M+"Блокировка: пускаем по одному"]={
    p:[ bg(0)+booth(64,48)+nb(88,34,"5",C.ink,20)+kid(88,80,.75,C.red)+lock(64,50,.9)+kid(20,82,.75,C.grn)+kid(42,82,.75,C.yel),
        bg(1)+booth(64,48)+nb(88,34,"7",C.grn,20)+ok(108,22,.6)+kid(88,80,.75,C.grn)+lock(64,50,.9)+kid(38,82,.75,C.red)+arrowL(30,52,12,C.red)+kid(14,82,.6,C.yel),
        bg(2)+booth(90,26)+lock(90,50,.8)+kid(103,80,.55,C.red)+[14,30,46,62,78].map((x,i)=>kid(x,82,.6,[C.grn,C.yel,C.blue,"#c86bfa",C.ant][i],"sad")).join("")+clock(46,24,1.1,4) ],
    l:[["внутри только один","only one inside"],["счёт верный: 7","count is right: 7"],["остальные ждут","the rest wait"]],
    c:["Замок пускает по одному: ошибок нет, но очередь растёт. Правильность стоит скорости.","The lock lets one in at a time: no mistakes, but the line grows. Safety costs speed."] };

  /* 126 */
  Z[M+"Видимость: изменение может не дойти"]={
    p:[ bg(0)+chip(30,30)+chip(90,30)+line(30,52,30,57)+line(90,52,90,57)+nb(30,66,"0")+nb(90,66,"0"),
        bg(1)+chip(30,30,txt(0,4,"1",11,C.yel))+chip(90,30)+line(30,52,30,57)+line(90,52,90,57)+nb(30,66,"1",C.grn)+spark(46,58)+nb(90,66,"0",C.red)+txt(110,62,"?",14,C.red),
        bg(2)+chip(26,30,txt(0,4,"1",11,C.yel))+chip(94,30)+`<rect x="56" y="12" width="8" height="62" rx="2" fill="${C.yel}" stroke="${C.ink}"/>`+line(26,52,26,57)+line(94,52,94,57)+nb(26,66,"1",C.grn)+nb(94,66,"1",C.grn)+ok(112,58,.6)+tag(60,82,"volatile",C.blue,44) ],
    l:[["у каждого ядра своя копия","each core has its own copy"],["записал — сосед не видит","wrote — neighbor can't see"],["volatile: читай свежее","volatile: read fresh"]],
    c:["Я записал 1 у себя, а сосед всё видит 0 в своей копии. volatile велит читать свежее.","I wrote 1 in my copy, but my neighbor still sees 0 in his. volatile says: read it fresh."] };

  /* 127 */
  const vb=v=>card(60,22,44,26,"#fff",txt(0,-3,"volatile",7,C.blue)+txt(0,9,v,11));
  Z[M+"volatile ≠ атомарность"]={
    p:[ bg(0)+vb("5")+kid(22,82,.9,C.red)+kid(98,82,.9,C.grn)+mini(22,"5")+mini(98,"5")+ok(30,24,.5)+ok(106,24,.5),
        bg(1)+vb("5")+kid(22,82,.9,C.red)+kid(98,82,.9,C.grn)+mini(22,"6",C.red)+mini(98,"6",C.grn)+curve(22,25,38,26,C.red)+curve(98,25,82,26,C.grn),
        bg(2)+vb("6")+no(88,12,.7)+txt(60,56,"6 ≠ 7",13,C.red)+kid(98,82,.85,C.grn,"sad")+kid(22,82,.85,C.red,"sad"),
        bg(3)+tag(42,24,"AtomicInteger",C.grn,60)+arrowR(74,24,86)+nb(100,24,"7",C.grn)+ok(110,12,.55)+bot(60,84,.65,{arms:"up"}) ],
    l:[["оба видят свежее 5","both see a fresh 5"],["оба пишут 6","both write 6"],["единица всё равно пропала","a +1 is still lost"],["лечит Atomic","Atomic fixes it"]],
    c:["volatile даёт свежий взгляд, но не мешает двоим одновременно влезть в count++.","volatile gives a fresh look, but doesn't stop two threads doing count++ at once."] };

  /* 128 */
  Z[M+"Дедлок: оба ждут вечно"]={
    p:[ bg(0)+kidbox(30,82,.9,C.red,"A")+kidbox(90,82,.9,C.grn,"B")+lock(30,26,.8)+lock(90,26,.8),
        bg(1)+kidbox(30,82,.9,C.red,"A")+kidbox(90,82,.9,C.grn,"B")+bubble(30,22,22,txt(0,4,"B",11,C.grn))+bubble(90,22,22,txt(0,4,"A",11,C.red))+curve(40,56,80,56,C.red,1)+curve(80,62,40,62,C.grn,1),
        bg(2)+kidbox(30,82,.9,C.red,"A","sad")+kidbox(90,82,.9,C.grn,"B","sad")+clock(60,24,1.2,11)+txt(60,54,"∞",16,C.red) ],
    l:[["взяли A и B","one takes A, one takes B"],["каждый ждёт чужое","each waits for the other"],["стоят вечно","stuck forever"]],
    c:["Каждый держит своё и ждёт чужое. Никто не падает и не уступает — всё молча висит.","Each holds his own and waits for the other's. Nobody crashes, nobody yields: it just hangs."] };

  /* 129 */
  const cols=[C.red,C.grn,C.yel,C.blue,"#c86bfa",C.ant];
  Z[M+"Пул потоков вместо создания на каждый чих"]={
    p:[ bg(0)+[14,34,54,74,94].map((x,i)=>kid(x+4,82,.55,cols[i])+coin(x+4,48,.8)).join("")+txt(60,24,"×1000",13,C.red),
        bg(1)+`<rect x="6" y="62" width="58" height="5" rx="2" fill="${C.grey}" stroke="${C.ink}"/>`+[14,28,42,56].map((x,i)=>box(x,62,11,10,String(i+1))).join("")+arrowR(56,40,72)+[80,96,112].map((x,i)=>kid(x,82,.6,cols[i])).join(""),
        bg(2)+[0,1,2,3,4].map(r=>[0,1,2,3,4,5].slice(0,6-r).map(c=>box(18+c*12+r*6,76-r*11,11,10,null)).join("")).join("")+bot(104,84,.6,{mood:"wow",arms:"up"}),
        bg(3)+server(36,48,1,false)+txt(84,36,"OOM",14,C.red)+no(84,58,1.1) ],
    l:[["поток на задачу — дорого","a thread per task: costly"],["3 рабочих и очередь","3 workers and a queue"],["очередь без края копится","an unbounded queue grows"],["память кончилась","out of memory"]],
    c:["Держу пару рабочих и список дел. Но если список бесконечный — память лопнет.","I keep a few workers and a to-do list. But if the list has no limit, memory bursts."] };

  /* 130 */
  Z[J+"Не создавай потоки руками"]={
    p:[ bg(0)+tag(60,16,"new Thread()",C.red,60)+kid(18,82,.7,C.red)+kid(42,80,.5,C.grn)+kid(68,82,.85,C.yel)+kid(100,82,.6,C.blue)+txt(42,46,"?",14,C.red)+txt(98,48,"?",14,C.red),
        bg(1)+bot(22,84,.7,{arms:"reach"})+env(46,46,.55)+env(58,32,.55)+box(92,76,48,30,"Executor",C.blue),
        bg(2)+box(28,76,44,30,"Executor",C.blue)+arrowR(52,60,64)+[74,92,110].map((x,i)=>kid(x,82,.62,cols[i])+gear(x,42,.45)).join("") ],
    l:[["new Thread — сколько их?","new Thread — how many?"],["отдаю задачи сервису","hand tasks to a service"],["он сам решает, кому","it picks who does them"]],
    c:["Не нанимаю рабочего на каждую мелочь. Отдаю задачи в ExecutorService — он раздаст сам.","I don't hire a worker per chore. I hand tasks to ExecutorService and it shares them out."] };

  /* 131 */
  const counter=`<rect x="62" y="52" width="52" height="6" rx="2" fill="${C.wood}" stroke="${C.wood2}"/><path d="M68 58 V74 M108 58 V74" stroke="${C.wood2}" stroke-width="3"/>`;
  const tick=(x,y)=>card(x,y,18,12,C.yel,txt(0,3,"#7",7));
  Z[J+"Future — обещание результата"]={
    p:[ bg(0)+counter+gear(96,38,.9)+bot(32,84,.75,{arms:"reach"})+tick(54,40)+txt(60,16,"submit",9,C.blue),
        bg(1)+bot(28,84,.75,{arms:"hold"})+tick(28,58)+laptop(88,74,1,txt(0,-10,"{ }",8,C.blue))+gear(100,22,.6)+spark(70,20),
        bg(2)+counter+box(92,52,22,16,"✓",C.grn)+bot(34,84,.75,{arms:"reach"})+tick(54,40)+tag(60,16,"get()",C.grn,30),
        bg(3)+counter+gear(96,38,.9)+bot(36,84,.75,{mood:"sad",arms:"reach"})+tick(56,40)+tag(30,16,"get()",C.red,30)+clock(84,16,.9,7) ],
    l:[["submit — получил номерок","submit — got a ticket"],["пока делаю другое","doing other things"],["get() — забрал готовое","get() — pick up result"],["get() сразу — стою зря","instant get(): I just wait"]],
    c:["Future — номерок из химчистки. Взял и ушёл по делам. Встал у стойки — зря запускал.","Future is a laundry ticket. Take it and go do things. Stand at the counter — why bother?"] };

  /* 132 */
  Z[J+"CompletableFuture — цепочки без блокировок"]={
    p:[ bg(0)+card(52,34,70,40,"#fff",txt(0,-8,"supplyAsync",7,C.blue)+txt(0,3,".thenApply",7,C.ink)+txt(0,14,".thenAccept",7,C.ink))+bot(104,84,.6,{arms:"reach",mood:"think"}),
        bg(1)+gear(24,24,.8)+gear(24,60,.8)+`<path d="M38 24 Q56 24 66 42 M38 60 Q56 60 66 44" stroke="${C.ink}" stroke-width="1.8" fill="none"/>`+arrowR(68,43,84)+ok(98,43,1.2)+txt(52,46,"+",12,C.blue),
        bg(2)+nb(20,28,"1",C.blue,18)+arrowR(30,28,42)+nb(52,28,"2",C.blue,18)+arrowR(62,28,74)+nb(84,28,"3",C.blue,18)+ok(106,28,.8)+bot(60,84,.7,{arms:"up"}) ],
    l:[["пишу, что делать потом","write what to do next"],["две задачи разом","two tasks at once"],["цепочка идёт сама","the chain runs itself"]],
    c:["Я не стою у двери, а оставляю инструкцию: пришло — сделай это, потом то.","I don't wait by the door. I leave a note: when it arrives, do this, then that."] };

  /* 133 */
  Z[J+"Atomic и CAS — быстрее лока"]={
    p:[ bg(0)+nb(92,30,"5",C.ink,26)+bot(32,84,.8,{mood:"think"})+think(42,16,txt(11,2,"5",10)),
        bg(1)+nb(92,30,"6",C.grn,26)+ok(108,18,.6)+bot(32,84,.8,{arms:"reach"})+txt(56,18,"5? → 6",9,C.blue),
        bg(2)+nb(92,30,"6",C.ink,26)+kid(108,82,.6,C.grn)+bot(32,84,.8,{mood:"wow"})+txt(54,18,"5?",10,C.red)+no(54,40,.8)+`<path d="M44 56 a8 8 0 1 0 6 -10" stroke="${C.blue}" stroke-width="2" fill="none"/><path d="M47 43 l4 3 l-4 3" fill="none" stroke="${C.blue}" stroke-width="2"/>`,
        bg(3)+nb(92,30,"7",C.grn,26)+ok(108,18,.6)+bot(32,84,.8,{arms:"up"})+txt(58,18,"6? → 7",9,C.blue)+lock(70,60,.9)+slash(70,58,9) ],
    l:[["прочитал 5","read 5"],["всё ещё 5? пишу 6","still 5? write 6"],["уже не 5 — заново","not 5 anymore: retry"],["без замка и очереди","no lock, no queue"]],
    c:["Пишу новое, только если старое не поменялось. Поменялось — пробую ещё раз, без очереди.","I write only if the old value didn't change. If it did, I retry. No waiting in line."] };

  /* 134 */
  Z[J+"ConcurrentHashMap вместо synchronized"]={
    p:[ bg(0)+txt(36,14,"HashMap",8,C.ink)+rack(12,20,48,2)+`<path d="M78 30 a14 14 0 1 1 -2 22" stroke="${C.red}" stroke-width="2.4" fill="none" stroke-dasharray="4 3"/><path d="M72 49 l5 4 l1 -6" fill="none" stroke="${C.red}" stroke-width="2.2"/>`+no(104,64,.8),
        bg(1)+rack(52,20,56,3)+lock(80,44,1.6)+kid(16,82,.62,C.grn,"sad")+kid(34,82,.62,C.yel,"sad"),
        bg(2)+txt(60,14,"ConcurrentHashMap",7,C.blue)+rack(18,20,84,3)+[32,60,88].map((x,i)=>lock(x,26,.5)+kid(x,82,.55,cols[i])).join("") ],
    l:[["HashMap может зациклиться","HashMap can loop forever"],["замок на весь склад","one lock on everything"],["замок на полку","a lock per shelf"]],
    c:["Не запираю весь склад ради одной полки. Каждый работает у своей — и никто не ждёт зря.","I don't lock the whole store for one shelf. Each works at his own, and nobody waits."] };

  /* 135 */
  const gate=`<rect x="56" y="34" width="6" height="42" rx="2" fill="${C.grey}" stroke="${C.ink}"/><path d="M59 50 H40" stroke="${C.red}" stroke-width="3" stroke-linecap="round"/>`;
  Z[J+"Дождаться и ограничить"]={
    p:[ bg(0)+nb(60,20,"3",C.blue,26)+[24,60,96].map((x,i)=>kid(x,82,.7,cols[i])+gear(x,44,.42)).join(""),
        bg(1)+nb(60,20,"0",C.grn,26)+ok(78,12,.5)+bot(60,84,.65,{arms:"up",mood:"wow"})+kid(22,82,.7,cols[0])+kid(98,82,.7,cols[1])+spark(84,40),
        bg(2)+txt(60,22,"2/2",12,C.red)+gate+kid(84,82,.62,C.red)+kid(104,82,.62,C.grn)+kid(14,82,.62,C.yel,"sad")+kid(32,82,.62,C.blue,"sad"),
        bg(3)+txt(60,22,"2/2",12,C.ink)+`<rect x="56" y="34" width="6" height="42" rx="2" fill="${C.grey}" stroke="${C.ink}"/>`+kid(76,82,.62,C.yel)+kid(96,82,.62,C.grn)+kid(112,82,.5,C.red)+arrowR(100,40,118,C.red)+arrowR(36,46,52,C.yel)+kid(18,82,.62,C.blue,"sad") ],
    l:[["latch: ждём 3 задачи","latch: wait for 3 tasks"],["0 — можно дальше","0 — go on"],["семафор: не больше 2","semaphore: max 2"],["вышел один — зашёл один","one out, one in"]],
    c:["Защёлка ждёт, пока все N закончат. Семафор пускает не больше N сразу.","A latch waits until all N finish. A semaphore lets in no more than N at once."] };

  /* 136 */
  Z[J+"Что выбрать в реальности"]={
    p:[ bg(0)+nb(60,26,"+1",C.grn,30)+arrowD(60,40,54)+tag(60,64,"Atomic",C.blue,50),
        bg(1)+rack(38,8,44,3)+arrowD(60,62,70)+tag(60,80,"ConcurrentHashMap",C.blue,84),
        bg(2)+box(46,40,12,10)+box(60,40,12,10)+box(74,40,12,10)+box(53,30,12,10)+box(67,30,12,10)+arrowD(60,44,54)+tag(60,64,"ExecutorService",C.blue,76),
        bg(3)+[30,60,90].map(x=>`<circle cx="${x}" cy="28" r="7" fill="${C.ant}" stroke="${C.ink}"/>`).join("")+arrowR(37,28,53)+arrowR(67,28,83)+arrowD(60,40,54)+tag(60,64,"CompletableFuture",C.blue,84) ],
    l:[["счётчик — Atomic","counter — Atomic"],["общая карта — CHM","shared map — CHM"],["пачка задач — Executor","batch of tasks — Executor"],["цепочка вызовов — CF","call chain — CF"]],
    c:["Беру готовый инструмент под задачу. Свой synchronized — только если ничего не подошло.","I pick the ready tool for the job. Hand-made synchronized only if nothing else fits."] };

  /* 137 */
  Z[V+"Проблема, которую они решают"]={
    p:[ bg(0)+kid(38,82,.95,C.red)+box(64,76,24,30,"1MB",C.wood2)+tag(38,20,"OS",C.ink,24),
        bg(1)+db(102,56,.9)+[12,28,44,60,76].map((x,i)=>kid(x,82,.55,cols[i],"sad")).join("")+clock(60,22,1,9)+txt(26,26,"×1000",10,C.red),
        bg(2)+chip(36,38,txt(0,4,"0%",8,"#fff"))+coin(82,64,1.1)+coin(98,64,1.1)+coin(90,52,1.1)+arrowR(84,30,112,C.red)+txt(36,72,"zzz",8,C.grey) ],
    l:[["поток ОС: 1 МБ стека","OS thread: 1 MB stack"],["тысяча стоит у базы","a thousand wait on the DB"],["платим за ожидание","paying for waiting"]],
    c:["Тысяча потоков почти всё время просто ждут базу. А память и зарплату едят все.","A thousand threads mostly just wait for the DB. Yet every one eats memory and wages."] };

  /* 138 */
  Z[V+"Как устроены"]={
    p:[ bg(0)+cart(70,82,50)+kid(70,72,.7,C.red)+arrowR(14,60,38,C.grey)+db(108,54,.6),
        bg(1)+db(22,56,.8)+kid(48,82,.6,C.red)+env(48,40,.5)+cart(92,82,44)+kid(92,72,.7,C.grn),
        bg(2)+db(22,56,.8)+curve(32,46,74,30,C.blue,1)+env(78,26,.5)+cart(92,82,44)+kid(92,72,.7,C.red)+kid(52,82,.6,C.grn),
        bg(3)+cart(32,82,40)+cart(88,82,40)+kid(32,72,.55,C.red)+kid(88,72,.55,C.grn)+[14,30,46,62,78,94,110].map((x,i)=>kid(x,40,.35,cols[i%6])).join("")+txt(60,16,"100 000",10,C.blue) ],
    l:[["сел на поток ОС","rides an OS thread"],["ждёт базу — слез","waits for DB: steps off"],["ответ пришёл — вернулся","reply came: back on"],["несущих 2, лёгких 100 000","2 carriers, 100,000 light"]],
    c:["Пока жду ответ, я слезаю с потока ОС, и его берёт другой. Код при этом обычный.","While I wait for a reply, I step off the OS thread and another uses it. Code stays plain."] };

  /* 139 */
  const chain=(x,y)=>`<path d="M${x-4} ${y} q-4 6 0 12 M${x+4} ${y} q4 6 0 12" stroke="${C.ink}" stroke-width="1.6" fill="none" stroke-dasharray="2 1.5"/>`;
  Z[V+"synchronized убивает выигрыш"]={
    p:[ bg(0)+tag(60,14,"synchronized",C.red,62)+cart(60,82,50)+kid(60,72,.7,C.red)+chain(60,62)+lock(78,52,.8),
        bg(1)+db(102,46,.7)+clock(102,16,.75,3)+cart(64,82,44)+kid(64,72,.7,C.red,"sad")+lock(80,52,.7)+kid(12,82,.55,C.grn,"sad")+kid(28,82,.55,C.yel,"sad"),
        bg(2)+tag(60,14,"ReentrantLock",C.grn,62)+db(104,56,.7)+kid(84,82,.6,C.red)+env(84,40,.45)+cart(36,82,44)+kid(36,72,.7,C.grn)+ok(60,34,.7) ],
    l:[["synchronized — прибит","synchronized: pinned"],["ждёт базу и держит поток","waits on DB, holds thread"],["ReentrantLock — отпустил","ReentrantLock: let go"]],
    c:["В synchronized я прибит к потоку ОС и не могу слезть, пока жду. ReentrantLock это лечит.","Inside synchronized I'm pinned to the OS thread while waiting. ReentrantLock fixes that."] };

  /* 140 */
  Z[V+"Пул виртуальных потоков не нужен"]={
    p:[ bg(0)+`<rect x="22" y="38" width="76" height="40" rx="4" fill="none" stroke="${C.wood2}" stroke-width="2" stroke-dasharray="4 3"/>`+[40,60,80].map((x,i)=>kid(x,76,.62,cols[i])+coin(x,28,.9)).join(""),
        bg(1)+[12,31,50,69,88,107].map((x,i)=>kid(x,82,.5,cols[i])+env(x,46,.4)).join("")+txt(60,20,"1 = 1",12,C.blue),
        bg(2)+db(104,56,.8)+`<rect x="80" y="30" width="5" height="46" rx="2" fill="${C.grey}" stroke="${C.ink}"/>`+txt(82,22,"10",10,C.red)+kid(94,82,.45,C.grn)+[12,26,40,54,68].map((x,i)=>kid(x,82,.5,cols[i])).join("") ],
    l:[["пул — потому что дорого","pool: threads were costly"],["по потоку на задачу","one thread per task"],["ограничь вход в базу","limit access to the DB"]],
    c:["Виртуальные потоки дешёвые — создаю на каждую задачу. Ограничиваю не их, а двери к базе.","Virtual threads are cheap: one per task. I limit the doors to the DB, not the threads."] };

  /* 141 */
  const mchip=(x,y)=>sm(x,y,.5,chip(0,0,txt(0,6,"%",14,"#fff")));
  Z[V+"Где они не помогут"]={
    p:[ bg(0)+db(98,56,.9)+[16,32,48,64].map((x,i)=>kid(x,82,.5,cols[i])).join("")+clock(40,30,.8,2)+ok(98,18,.8),
        bg(1)+chip(60,34,txt(0,4,"100%",7,"#fff"))+[12,28,92,108].map((x,i)=>kid(x,82,.5,cols[i],"sad")).join("")+no(60,66,.7),
        bg(2)+[21,47,73,99].map((x,i)=>mchip(x,28)+kid(x,82,.5,cols[i])).join("")+txt(60,56,"4 = 4",10,C.grn) ],
    l:[["ждут — вирт. помогут","waiting: virtual helps"],["считают — упёрлись в ядра","computing: cores are full"],["пул = число ядер","pool = number of cores"]],
    c:["Если задача считает, а не ждёт, узкое место — ядра. Больше потоков ядер не добавит.","If a task computes instead of waiting, cores are the limit. More threads add no cores."] };

  /* 142 */
  const pocket=(x,y,v,col)=>card(x,y,12,10,col||C.yel,txt(0,3,v,7));
  Z[V+"ThreadLocal и утечки в пулах"]={
    p:[ bg(0)+kid(44,82,1,C.blue)+pocket(44,64,"7")+tag(90,30,"A",C.grn,20)+curve(84,38,52,62,C.grn),
        bg(1)+`<rect x="18" y="30" width="54" height="48" rx="4" fill="none" stroke="${C.wood2}" stroke-width="2" stroke-dasharray="4 3"/>`+kid(44,76,.85,C.blue)+pocket(44,62,"7")+tag(98,28,"B",C.ant,20)+arrowL(96,44,76,C.ant),
        bg(2)+kid(36,82,1,C.blue)+pocket(36,64,"7")+tag(36,14,"B",C.ant,20)+bubble(84,30,28,txt(0,4,"7",11,C.red))+no(104,56,.8),
        bg(3)+tag(56,14,"finally",C.grn,40)+kid(32,82,1,C.blue)+pocket(78,44,"7")+`<path d="M70 58 h18 l-2 18 h-14 z" fill="${C.grey}" stroke="${C.ink}"/>`+curve(40,62,76,48,C.grey,1)+ok(104,60,.7) ],
    l:[["задача A кладёт 7","task A stores 7"],["поток вернулся в пул","thread goes back to pool"],["задача B видит чужое 7","task B sees A's 7"],["finally: remove()","finally: remove()"]],
    c:["Поток в пуле переходит к следующей задаче со всем, что в карманах. Чисти в finally.","A pooled thread moves to the next task with full pockets. Empty them in finally."] };

  /* 143 */
  Z[V+"parallelStream и общий пул"]={
    p:[ bg(0)+car(64,80,"ForkJoin")+kid(14,82,.6,C.grn)+kid(30,82,.6,C.yel)+kid(104,82,.6,C.blue)+tag(64,20,"parallelStream()",C.blue,74),
        bg(1)+db(100,54,.8)+car(62,80,"ForkJoin")+clock(62,30,1,8)+txt(100,20,"I/O",9,C.red),
        bg(2)+[18,42,66,90].map((x,i)=>kid(x,82,.65,cols[i],"sad")).join("")+no(102,26,.9)+`<path d="M20 32 h56" stroke="${C.grey}" stroke-width="2" stroke-dasharray="4 3"/>` ],
    l:[["один общий пул на всех","one shared pool for all"],["кто-то ушёл в базу","someone blocks on I/O"],["все остальные стоят","everyone else is stuck"]],
    c:["parallelStream берёт общий пул на всё приложение. Заблокировал его — встали все.","parallelStream uses one pool for the whole app. Block it, and everyone stops."] };

  /* 144 */
  Z[R+"Проблема, из которой она выросла"]={
    p:[ bg(0)+kid(86,82,.75,C.grn)+tableT(86,82,34)+card(86,46,12,14,C.yel,"",8)+bot(34,84,.7,{arms:"hold"})+clock(56,20,.9,5),
        bg(1)+txt(60,22,"×1000",12,C.red)+[16,44,72,100].map(x=>tableT(x,82,16)+bot(x+12,84,.42,{mood:"think"})).join("")+clock(96,40,.6,5)+clock(40,40,.6,5),
        bg(2)+[18,60,102].map(x=>tableT(x,78,24)+`<circle cx="${x}" cy="56" r="4" fill="#fff" stroke="${C.ink}"/>`).join("")+bot(40,84,.62,{arms:"hold"})+curve(46,30,80,46,C.blue,1)+ok(18,36,.6)+ok(102,36,.6) ],
    l:[["ждёт у столика","waits at one table"],["на 1000 столов 1000 ждут","1000 tables, 1000 waiting"],["один на три столика","one for three tables"]],
    c:["Пока гость читает меню, хороший официант успевает к другим. Так и поток в реактивности.","While a guest reads the menu, a good waiter serves others. That's a reactive thread."] };

  /* 145 */
  const chainOps=(col)=>tag(20,36,"from",col,28)+arrowR(35,36,45)+tag(60,36,"map",col,28)+arrowR(75,36,85)+tag(100,36,"filter",col,30);
  Z[R+"Ты описываешь путь, а не выполняешь его"]={
    p:[ bg(0)+chainOps(C.blue)+bot(60,84,.6,{arms:"reach"}),
        bg(1)+chainOps(C.grey)+ball(10,60)+ball(18,60)+ball(26,60)+txt(70,64,"0",14,C.grey)+bot(100,84,.6,{mood:"think"}),
        bg(2)+paper(30,38,["map","filter"])+txt(60,44,"≠",18,C.red)+`<ellipse cx="90" cy="48" rx="16" ry="5" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+bot(90,84,.5,{hat:true,mood:"think"}) ],
    l:[["собрал цепочку","built a chain"],["по ней ничего не течёт","nothing flows yet"],["рецепт — ещё не ужин","a recipe isn't dinner"]],
    c:["Я пока только описал маршрут: взять, поменять, отсеять. Ехать по нему никто не начал.","So far I've only described the route: take, change, filter. No one is driving it yet."] };

  /* 146 */
  const pipe=`<rect x="22" y="40" width="80" height="8" rx="3" fill="${C.grey}" stroke="${C.ink}"/>`;
  Z[R+"Без подписки не происходит ничего"]={
    p:[ bg(0)+box(14,52,16,16,null)+pipe+tag(46,30,"map",C.blue,26)+tag(80,30,"filter",C.blue,30)+bot(100,84,.55,{mood:"smile"}),
        bg(1)+box(14,52,16,16,null)+pipe+`<rect x="98" y="54" width="18" height="12" fill="#fff" stroke="${C.ink}"/>`+txt(60,24,"?",16,C.blue)+bot(40,84,.55,{mood:"think"}),
        bg(2)+tag(60,16,"subscribe()",C.grn,56)+box(14,52,16,16,null)+pipe+ball(40,44)+ball(60,44)+ball(80,44)+ok(108,44,.8)+bot(60,84,.55,{arms:"up"}) ],
    l:[["цепочка собрана","the chain is built"],["тишина, и ошибок нет","silence, and no error"],["subscribe() — поехало","subscribe(): it runs"]],
    c:["Пока никто не подписался, цепочка спит. И молчит: ни ошибки, ни результата.","Until someone subscribes, the chain sleeps. And stays silent: no error, no result."] };

  /* 147 */
  Z[R+"Обратное давление: получатель задаёт темп"]={
    p:[ bg(0)+cloud(26,22,1)+[[34,36],[44,44],[52,52],[60,60],[40,48],[50,40]].map(p=>ball(p[0],p[1])).join("")+[66,74,82,104,112,70].map((x,i)=>ball(x,i<5?78:72)).join("")+kid(92,82,.8,C.yel,"wow"),
        bg(1)+cloud(26,22,1)+kid(88,82,.8,C.yel)+bubble(88,24,22,txt(0,4,"3",11,C.blue))+arrowL(70,40,46,C.blue),
        bg(2)+cloud(26,22,1)+ball(48,54)+ball(58,54)+ball(68,54)+kid(92,82,.8,C.yel)+ok(92,26,.8) ],
    l:[["шлют быстрее, чем ем","sent faster than I eat"],["прошу: дай 3","I ask: give me 3"],["пришло ровно 3","exactly 3 arrive"]],
    c:["Не источник решает, сколько слать, а я: прошу три — получаю три, не больше.","The source doesn't decide how much to send. I do: I ask for three and get three."] };

  /* 148 */
  const stream=[["7",14],["8",30],["9",46]].map(a=>card(a[1],24,13,12,"#fff",txt(0,3.5,a[0],7))).join("")+arrowR(56,24,68);
  Z[R+"Что делать, когда притормозить нельзя"]={
    p:[ bg(0)+stream+`<rect x="74" y="16" width="30" height="58" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+[0,1,2,3,4,5,6,7].map(i=>`<rect x="78" y="${66-i*6.4}" width="22" height="5" rx="1" fill="${i>5?C.red:C.blue}"/>`).join("")+txt(28,58,"!",18,C.red),
        bg(1)+stream+card(84,24,16,14,"#fff",txt(0,4,"7",8))+ok(84,42,.55)+card(100,46,13,12,"#fff",txt(0,3.5,"9",7),25)+card(88,54,13,12,"#fff",txt(0,3.5,"8",7),-20)+`<path d="M82 62 h22 l-2 14 h-18 z" fill="${C.grey}" stroke="${C.ink}"/>`,
        bg(2)+stream+card(90,40,30,30,"#fff",txt(0,7,"9",18,C.grn))+card(28,58,14,12,"#eee",txt(0,3.5,"7",7,C.grey))+card(44,58,14,12,"#eee",txt(0,3.5,"8",7,C.grey)),
        bg(3)+stream+no(90,42,1.6)+txt(90,72,"!",14,C.red) ],
    l:[["копить в буфер","keep in a buffer"],["выбросить новые","drop the new ones"],["только последнее","keep only the latest"],["упасть с ошибкой","fail with an error"]],
    c:["Котировки не притормозишь. Решаю, что важнее: всё сохранить или видеть самое свежее.","Quotes won't slow down. I choose what matters more: keep everything or see the latest."] };

  /* 149 */
  Z[R+"Один блокирующий вызов роняет всё"]={
    p:[ bg(0)+kid(42,82,.75,C.red)+kid(78,82,.75,C.grn)+env(18,30,.5)+env(60,22,.5)+env(102,30,.5)+ok(60,46,.6),
        bg(1)+db(102,52,.8)+tag(102,14,"sleep",C.red,30)+kid(80,82,.65,C.grn,"sad")+kid(30,82,.75,C.red)+env(14,30,.5)+env(30,22,.5)+env(46,30,.5),
        bg(2)+[0,1,2,3,4].map(i=>env(22,70-i*10,.55)).join("")+kid(56,82,.65,C.red,"sad")+kid(76,82,.65,C.grn,"sad")+server(104,48,.8,false) ],
    l:[["пара обработчиков на всех","few handlers serve all"],["один ушёл ждать базу","one blocks on the DB"],["и встали все","and everyone stops"]],
    c:["У меня всего пара рабочих рук. Займи одну ожиданием базы — и сервис перестанет отвечать.","I have only a few hands. Tie one up waiting on the DB and the service goes silent."] };

  /* 150 */
  Z[R+"Что от неё осталось после виртуальных потоков"]={
    p:[ bg(0)+db(100,56,.8)+[14,30,46,62,78].map((x,i)=>kid(x,82,.45,cols[i])).join("")+coin(46,30,.7)+ok(64,30,.7),
        bg(1)+`<path d="M8 26 Q20 26 28 38 M8 50 Q20 50 28 40 M28 39 H36" stroke="${C.blue}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`+
          `<rect x="46" y="28" width="28" height="22" rx="4" fill="none" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="3 2"/>`+ball(53,39)+ball(60,39)+ball(67,39)+
          `<path d="M96 30 a9 9 0 1 0 9 9" stroke="${C.grn}" stroke-width="2.4" fill="none"/><path d="M101 25 l-5 5 l6 3" fill="none" stroke="${C.grn}" stroke-width="2.2"/>`,
        bg(2)+box(18,60,20,26,null,C.wood)+line(28,48,54,48,C.grey,4)+ball(46,48)+kid(90,82,.8,C.blue)+bubble(90,24,22,txt(0,4,"3",11,C.blue)) ],
    l:[["ожидание теперь дёшево","waiting is cheap now"],["слить, окна, повторы","merge, windows, retries"],["и обратное давление","plus backpressure"]],
    c:["Потоки теперь экономят виртуальные. А слияния, окна и обратное давление — всё ещё тут.","Virtual threads now save the threads. Merging, windows and backpressure still live here."] };

  /* 151 */
  Z[D+"Зачем база, если есть файлы"]={
    p:[ bg(0)+db(60,56,1.1)+kid(18,82,.6,C.red)+kid(34,82,.6,C.grn)+kid(86,82,.6,C.yel)+kid(102,82,.6,C.blue)+ok(60,16,.8),
        bg(1)+db(30,56,1)+mag(70,40,1.3)+card(100,20,22,14,"#fff",txt(0,4,"42",9,C.grn))+spark(108,44),
        bg(2)+bulb(24,28,false,9)+bolt(48,32,1.3)+db(88,58,1)+ok(88,22,.8) ],
    l:[["многие сразу","many at once"],["найти, не читая всё","find without reading all"],["сбой — без половинок","crash — no half-changes"]],
    c:["Тетрадь годится, пока я один. База пускает многих, ищет быстро и не ломается на сбое.","A notebook works while I'm alone. A DB lets many in, finds fast, and survives a crash."] };

  /* 152 */
  Z[D+"Таблица, строка, колонка"]={
    p:[ bg(0)+grid(24,16),
        bg(1)+grid(24,16,1),
        bg(2)+grid(24,16,null,1),
        bg(3)+grid(30,22,null,0)+key(42,12,.9,C.yel) ],
    l:[["таблица = заказы","table = orders"],["строка — один заказ","row — one order"],["колонка — свойство","column — one property"],["ключ — номер карточки","key — the card's number"]],
    c:["Таблица — картотека, строка — карточка, колонка — графа, а ключ — номер карточки.","A table is a card file: a row is a card, a column is a field, the key is its number."] };

  /* 153 */
  Z[D+"SQL — ты говоришь ЧТО, а не КАК"]={
    p:[ bg(0)+bot(26,84,.75,{arms:"reach"})+card(78,36,56,28,"#fff",txt(0,-3,"SELECT *",7,C.blue)+txt(0,8,"WHERE id=7",7)),
        bg(1)+bot(20,84,.7,{glasses:true,mood:"think"})+`<path d="M40 40 H104" stroke="${C.grn}" stroke-width="3" stroke-linecap="round"/><path d="M40 56 q8 -12 16 0 t16 0 t16 0 t16 0" stroke="${C.grey}" stroke-width="2" fill="none" stroke-dasharray="3 2"/>`+ok(108,40,.6)+txt(72,30,"?",10,C.blue),
        bg(2)+nb(80,32,"7",C.grn,26)+ok(98,18,.6)+bot(34,84,.75,{arms:"up"}) ],
    l:[["говорю, что нужно","I say what I want"],["планировщик выбирает путь","planner picks the route"],["готово","done"]],
    c:["Я пишу, ЧТО хочу получить. Как достать — решает планировщик, как таксист маршрут.","I write WHAT I want. HOW to get it is the planner's call, like a cabbie picks the route."] };

  /* 154 */
  const nd=(x,y,on)=>`<circle cx="${x}" cy="${y}" r="6" fill="${on?C.grn:"#fff"}" stroke="${C.ink}" stroke-width="1.2"/>`;
  Z[D+"Индекс: почему без него миллион строк"]={
    p:[ bg(0)+txt(60,18,"1 000 000",11,C.red)+[0,1,2,3,4,5,6,7].map(i=>card(12+i*13.7,40,10,14,"#fff","")).join("")+mag(70,44,.9)+bot(100,84,.55,{mood:"sad"}),
        bg(1)+line(60,16,30,38)+line(60,16,60,38)+line(60,16,90,38)+line(90,38,78,60)+line(90,38,90,60)+line(90,38,102,60)+line(90,38,90,60,C.grn,3)+line(60,16,90,38,C.grn,3)+
          nd(60,16,1)+nd(30,38)+nd(60,38)+nd(90,38,1)+nd(78,60)+nd(90,60,1)+nd(102,60),
        bg(2)+txt(32,50,"4",28,C.grn)+txt(86,42,"1 000 000",10,C.grey)+line(62,38,110,38,C.red,2)+ok(32,16,.8) ],
    l:[["без индекса — всё подряд","no index: read it all"],["дерево режет лишнее","the tree skips the rest"],["4 шага вместо миллиона","4 steps, not a million"]],
    c:["Без индекса я листаю всю таблицу. С деревом каждый шаг отбрасывает почти всё.","Without an index I read the whole table. With a tree, each step drops almost everything."] };

  /* 155 */
  Z[D+"У индекса есть цена"]={
    p:[ bg(0)+card(30,40,32,14,C.grn,txt(0,4,"+1",9,"#fff"))+arrowR(50,40,70)+mtree(88,30),
        bg(1)+card(60,44,26,14,C.grn,txt(0,4,"+1",9,"#fff"))+[[20,12],[60,8],[100,12],[22,58],[98,58]].map(p=>mtree(p[0],p[1],C.yel)).join("")+txt(60,24,"×5",9,C.red),
        bg(2)+`<path d="M60 74 V30" stroke="${C.wood2}" stroke-width="3"/><path d="M24 22 L96 38" stroke="${C.wood2}" stroke-width="3" stroke-linecap="round"/>`+
          `<path d="M14 22 h20 l-4 8 h-12 z" fill="${C.grey}" stroke="${C.ink}"/><path d="M86 38 h20 l-4 8 h-12 z" fill="${C.grey}" stroke="${C.ink}"/>`+tag(24,10,"SELECT",C.grn,34)+tag(96,58,"INSERT",C.red,34)+clock(96,22,.6,6) ],
    l:[["вставка правит и дерево","insert updates the tree"],["5 индексов — 5 правок","5 indexes, 5 updates"],["читать легко, писать тяжко","fast reads, slow writes"]],
    c:["Каждая вставка правит ещё и все деревья. Индексы ставлю под реальные запросы, не про запас.","Every insert also updates every tree. I add indexes for real queries, not just in case."] };

  /* 156 */
  const acct=(x,lab,v,col)=>txt(x,18,lab,9,C.blue)+nb(x,34,v,col,30);
  Z[D+"Транзакция: всё или ничего"]={
    p:[ bg(0)+acct(22,"A","100")+acct(98,"B","0")+coin(60,52,1.2)+arrowR(30,66,90,C.grn),
        bg(1)+acct(22,"A","0",C.red)+acct(98,"B","0",C.red)+bolt(60,32,1.2)+coin(60,62,1.1)+txt(72,60,"?",11,C.red)+no(60,14,.6),
        bg(2)+acct(22,"A","100",C.grn)+acct(98,"B","0")+curve(80,58,30,52,C.blue)+tag(60,72,"ROLLBACK",C.blue,50),
        bg(3)+acct(22,"A","0")+acct(98,"B","100",C.grn)+ok(60,34,.9)+tag(60,62,"COMMIT",C.grn,44) ],
    l:[["списать и зачислить","debit and credit"],["сбой посредине — пропажа","crash midway: money gone"],["транзакция: откат","transaction: roll back"],["или всё целиком","or all of it, done"]],
    c:["Либо деньги ушли и пришли, либо остались на месте. Пропасть по дороге им нельзя.","Either the money left and arrived, or it stayed put. It can't vanish on the way."] };

  /* 157 */
  const L=(s)=>`<circle cx="16" cy="16" r="10" fill="${C.blue}"/>`+txt(16,20.5,s,13,"#fff");
  Z[D+"ACID простыми словами"]={
    p:[ bg(0)+L("A")+card(52,42,26,16,"#fff",txt(0,4,"−100",8,C.red))+card(82,42,26,16,"#fff",txt(0,4,"+100",8,C.grn))+`<rect x="36" y="36" width="62" height="12" fill="none" stroke="${C.yel}" stroke-width="3" rx="3"/>`+ok(67,66,.8),
        bg(1)+L("C")+card(66,26,40,16,"#fff",txt(0,4,"≥ 0",9,C.blue))+card(66,56,26,16,"#fff",txt(0,4,"−5",9,C.red))+no(92,56,.8),
        bg(2)+L("I")+`<rect x="58" y="22" width="5" height="56" fill="${C.wood2}"/>`+kid(36,82,.75,C.red)+kid(86,82,.75,C.grn)+mini(36,"5")+mini(86,"9"),
        bg(3)+L("D")+bolt(46,34,1.3)+db(84,58,1)+ok(84,22,.8) ],
    l:[["всё или ничего","all or nothing"],["правила не нарушить","rules always hold"],["соседи не мешают","others don't interfere"],["записано — навсегда","committed means kept"]],
    c:["Четыре обещания базы: целиком, по правилам, не мешая друг другу и без пропаж после «ок».","Four promises: all at once, by the rules, without stepping on others, kept after OK."] };

  /* 158 */
  Z[D+"Изоляция: почему одинаковые запросы дают разное"]={
    p:[ bg(0)+nb(84,30,"5",C.ink,30)+bot(30,84,.75)+tag(30,14,"SELECT",C.blue,36),
        bg(1)+nb(84,30,"7",C.grn,30)+kid(84,82,.8,C.grn)+tag(30,14,"COMMIT",C.grn,36)+spark(104,20),
        bg(2)+nb(84,30,"7",C.grn,30)+bot(30,84,.75,{mood:"wow"})+txt(84,58,"5 → 7",10,C.ink),
        bg(3)+nb(100,18,"7",C.grey,22)+card(72,46,32,30,"#fff",`<rect x="-12" y="-11" width="24" height="18" fill="#cfe5fb"/>`+txt(0,4,"5",12,C.blue))+bot(30,84,.75,{arms:"reach"}) ],
    l:[["SELECT: вижу 5","SELECT: I see 5"],["сосед записал 7","a neighbor writes 7"],["вживую: уже 7","live view: now 7"],["по снимку: всё ещё 5","from snapshot: still 5"]],
    c:["Тот же SELECT дал другое? Не баг: изоляция решает, смотрю вживую или по снимку.","Same SELECT, different answer? Not a bug: isolation decides, live or from a snapshot."] };

  /* 159 */
  Z[D+"N+1 — главный тормоз новичка"]={
    p:[ bg(0)+db(24,56,.9)+arrowR(42,44,62)+[0,1,2,3].map(i=>card(84+i*2,52-i*4,26,16,"#fff","")).join("")+txt(90,46,"100",9,C.blue),
        bg(1)+db(20,56,.9)+[0,1,2,3].map(i=>curve(36,40+i*3,84,46+i*3,C.grey,1)).join("")+bot(96,84,.65,{mood:"sad"})+txt(60,16,"×100",11,C.red),
        bg(2)+db(24,56,.9)+paper(74,40,["IN (…)"])+arrowL(54,40,42,C.grn)+ok(100,22,.8)+txt(100,66,"2",14,C.grn) ],
    l:[["1 запрос — 100 заказов","1 query, 100 orders"],["и по разу за клиентом","then 1 per customer"],["2 запроса вместо 101","2 queries, not 101"]],
    c:["Сто походов в базу по одному вместо одного со списком. Локально незаметно, в проде — беда.","A hundred DB trips one by one instead of one with a list. Fine locally, a disaster in prod."] };

  /* 160 */
  Z[P+"Почему именно он"]={
    p:[ bg(0)+db(38,58,1.1)+txt(38,52,"PG",9,"#fff")+coin(86,38,1.6)+slash(86,38,12)+txt(86,68,"0",12,C.grn),
        bg(1)+db(28,58,1)+txt(28,52,"PG",9,"#fff")+tag(84,18,"JSON",C.blue,32)+mag(76,44,.8)+gear(102,56,.6),
        bg(2)+[0,1,2,3,4,5,6,7,8,9].map(i=>{ const x=16+(i%5)*22, y=i<5?28:54; return i===9?`<circle cx="${x}" cy="${y}" r="8" fill="${C.grey}"/>`:ok(x,y,1); }).join("") ],
    l:[["бесплатный и надёжный","free and reliable"],["JSON, поиск, расширения","JSON, search, extensions"],["хватит в 9 из 10","enough 9 times of 10"]],
    c:["Беру PostgreSQL, пока не доказано, что он не тянет. Обычно тянет.","I pick PostgreSQL until someone proves it can't cope. Usually it can."] };

  /* 161 */
  const ver=(x,y,v,val,col,faded)=>card(x,y,44,16,faded?"#f0f0f0":"#fff",txt(-10,4,v,7,faded?C.grey:C.blue)+txt(10,4,val,9,faded?C.grey:(col||C.ink)));
  Z[P+"MVCC: читатели не блокируют писателей"]={
    p:[ bg(0)+ver(72,30,"v1","5")+kid(24,82,.85,C.blue)+curve(30,46,50,32,C.blue,1),
        bg(1)+ver(64,22,"v1","5")+ver(64,48,"v2","7",C.grn)+kid(18,82,.8,C.blue)+kid(104,82,.8,C.grn)+curve(24,46,42,24,C.blue,1)+curve(104,46,86,50,C.grn)+ok(60,70,.6),
        bg(2)+`<g opacity=".45">${ver(64,22,"v1","5",null,true)}</g>`+ver(64,48,"v2","7",C.grn)+bot(100,84,.6) ],
    l:[["читатель видит 5","a reader sees 5"],["UPDATE пишет новую версию","UPDATE adds a new version"],["старую уберут потом","old one is cleaned later"]],
    c:["Я не стираю строку, а пишу новую рядом. Кто читал старую — спокойно дочитает.","I don't erase a row; I add a new one. Readers of the old one finish in peace."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 4 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const row=(x,y,w,col,t,tc,h)=>{h=h||9;return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1"/>`+(t!=null?txt(x+w/2,y+h/2+2.5,t,7,tc||C.ink):"");};
  const dead=(x,y,w,t,h)=>{h=h||9;return row(x,y,w,"#dfe2e8",t,"#9aa1b0",h)+`<path d="M${x+3} ${y+h/2} H${x+w-3}" stroke="${C.red}" stroke-width="1.4" stroke-linecap="round"/>`;};
  const cell=(x,y,t,col,tc)=>`<rect x="${x-6}" y="${y-6}" width="12" height="12" rx="2.5" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.1"/>`+(t!=null?txt(x,y+2.6,t,7,tc||C.ink):"");
  const lane=(x,y,vals,col,tc,step)=>vals.map((v,i)=>cell(x+i*(step||13),y,v,Array.isArray(col)?col[i]:col,Array.isArray(tc)?tc[i]:tc)).join("");
  const mark=(x,y,col)=>`<path d="M${x-4} ${y-10} h8 v10 l-4 -3 l-4 3 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width=".8"/>`;
  const frame=(x,y,w,h,col,solid)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="${col||C.bot2}" stroke-width="1.6"${solid?"":' stroke-dasharray="4 3"'}/>`;
  const ln=(x1,y1,x2,y2,col,dash,w)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="${w||1.6}"${dash?' stroke-dasharray="3 2.5"':""} stroke-linecap="round"/>`;
  const arr=(x1,y1,x2,y2,col,dash)=>{const a=Math.atan2(y2-y1,x2-x1),h=5,p=d=>[(x2-h*Math.cos(a+d)).toFixed(1),(y2-h*Math.sin(a+d)).toFixed(1)],A=p(.55),B=p(-.55);
    return ln(x1,y1,x2,y2,col,dash,1.8)+`<path d="M${A[0]} ${A[1]} L${x2} ${y2} L${B[0]} ${B[1]}" fill="none" stroke="${col||C.ink}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`;};
  const ent=(x,y,t,col,tc)=>`<g transform="translate(${x} ${y})"><rect x="-13" y="-10" width="26" height="20" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="-13" y="-10" width="26" height="6" rx="3" fill="${col||C.blue}"/>${t!=null?txt(0,7,t,8,tc||C.ink):""}</g>`;
  const ghost=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-13" y="-10" width="26" height="20" rx="3" fill="#fff" fill-opacity=".4" stroke="${C.grey}" stroke-width="1.4" stroke-dasharray="3 2"/>${txt(0,5,"?",12,"#8a90a0")}</g>`;
  const bin=(x,y)=>`<g transform="translate(${x} ${y})"><path d="M-9 -16 h18 l-2 16 h-14 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-11" y="-19" width="22" height="3.5" rx="1.5" fill="#8a90a0" stroke="${C.ink}" stroke-width="1"/><path d="M-4 -12 v9 M0 -12 v9 M4 -12 v9" stroke="${C.ink}" stroke-width=".8" opacity=".5"/></g>`;
  const broom=(x,y)=>`<path d="M${x-14} ${y-20} L${x} ${y-6}" stroke="${C.wood2}" stroke-width="2.6" stroke-linecap="round"/><path d="M${x-3} ${y-9} L${x+3} ${y-3} L${x+9} ${y} L${x-6} ${y} Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>`;
  const boom=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M0 -11 L3 -4 L10 -6 L5 0 L10 6 L3 4 L0 11 L-3 4 L-10 6 L-5 0 L-10 -6 L-3 -4 Z" fill="${C.red}" stroke="${C.ink}" stroke-width=".8"/>${txt(0,3,"!",8,"#fff")}</g>`;
  const tube=(x,y,n,w)=>{w=w||40;return `<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="-9" width="${w}" height="18" rx="9" fill="#eef3fb" stroke="${C.ink}" stroke-width="1.3"/>`+Array.from({length:n},(_,i)=>env(-w/2+10+i*10,0,.32)).join("")+`</g>`;};
  const pause=(x,y,col)=>`<rect x="${x-5}" y="${y-6}" width="3.5" height="12" rx="1" fill="${col||C.red}"/><rect x="${x+1.5}" y="${y-6}" width="3.5" height="12" rx="1" fill="${col||C.red}"/>`;
  const bars=(x,y,hs,col)=>hs.map((h,i)=>`<rect x="${x+i*8}" y="${y-h}" width="6" height="${h}" rx="1" fill="${Array.isArray(col)?col[i%col.length]:(col||C.blue)}"/>`).join("")+ln(x-2,y,x+hs.length*8,y,C.ink,false,1.2);
  const crown=(x,y)=>`<path d="M${x-7} ${y} l-1 -8 l4.5 4 l3.5 -6 l3.5 6 l4.5 -4 l-1 8 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>`;
  const dbt=(x,y,s,t,col,tc)=>db(x,y,s,col)+(t!=null?txt(x,y+5*(s||1),t,8,tc||"#fff"):"");
  const cab=(x,y,w,labs,cols)=>`<rect x="${x-w/2-4}" y="${y-4}" width="${w+8}" height="${labs.length*15+6}" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>`+labs.map((l,i)=>`<rect x="${x-w/2}" y="${y+i*15}" width="${w}" height="12" rx="2" fill="${(cols&&cols[i])||"#f3dcae"}" stroke="${C.wood2}" stroke-width="1"/><rect x="${x-4}" y="${y+i*15+8}" width="8" height="2" rx="1" fill="${C.wood2}"/>`+txt(x,y+i*15+7,l,7,C.ink)).join("");
  const Z={};
  const PG="PostgreSQL|", HB="Hibernate и JPA|", DL="Данные под нагрузкой|", Q="Очереди|", KF="Kafka|", EV="События и интеграция|";

  /* ===== PostgreSQL ===== */
  Z[PG+"autovacuum и раздувание таблиц"]={
    p:[ bg(0)+row(6,40,28,"#fff","5")+txt(46,34,"UPDATE",7)+arrowR(36,44,58)+dead(62,30,30,"5")+row(62,44,30,C.grn,"7","#fff")+bot(106,82,.55,{mood:"think"}),
        bg(1)+dbt(28,48,1.2,"1M")+[0,1,2,3,4,5,6].map(i=>dead(54,64-i*8,34,null,7)).join("")+txt(104,46,"×10",10,C.red),
        bg(2)+bot(28,82,.8,{arms:"reach",mood:"smile"})+broom(60,80)+dead(66,70,18,null,7)+dead(76,61,16,null,7)+bin(104,82)+dbt(96,34,.7,"1M") ],
    l:[["старая строка остаётся","the old row stays behind"],["мусор раздувает таблицу","junk bloats the table"],["autovacuum выметает","autovacuum sweeps it out"]],
    c:["Меняю строку — старая остаётся мусором. Не успею вымести — таблица распухнет.","Each update leaves the old row as junk. If I don't sweep in time, the table swells."] };

  Z[PG+"EXPLAIN ANALYZE — не гадать, а посмотреть"]={
    p:[ bg(0)+paper(32,38,["SQL","…","?"])+bot(84,82,.8,{mood:"think"})+think(86,14,txt(11,3,"?",13,C.red)),
        bg(1)+card(52,40,74,42,"#fff",txt(0,-9,"Seq Scan",9,C.red)+txt(0,3,"1 000 000",8)+txt(0,15,"900 ms",9,C.red))+mag(100,70,1.1),
        bg(2)+card(50,36,70,34,"#fff",txt(0,-4,"Index Scan",9,C.grn)+txt(0,10,"3 ms",9,C.grn))+ok(96,60,1.2)+bot(24,84,.5,{arms:"up"}) ],
    l:[["гадаю, где тормозит","guessing what's slow"],["план: прочитан миллион","plan: a million rows read"],["индекс — и 3 мс","with an index — 3 ms"]],
    c:["Не гадаю, а смотрю: EXPLAIN ANALYZE показывает, что база реально делала и где ждала.","No guessing: EXPLAIN ANALYZE shows what the DB really did and where it waited."] };

  Z[PG+"Пул соединений обязателен"]={
    p:[ bg(0)+[12,28,44,60].map((x,i)=>ln(x,54,84,48,C.grey,false,1.4)+kid(x,82,.6,[C.red,C.grn,C.yel,C.blue][i])).join("")+dbt(98,48,1.1,null,C.red)+txt(90,22,"1000",9,C.red)+spark(112,20,C.red),
        bg(1)+kid(12,82,.55,C.red)+kid(26,82,.55,C.grn)+kid(40,82,.55,C.yel)+`<rect x="50" y="34" width="28" height="30" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+key(64,42,.6,C.grn)+key(64,50,.6,C.blue)+key(64,58,.6,C.red)+ln(78,48,90,48,C.ink,false,2)+dbt(102,48,.9)+txt(64,26,"20",9,C.grn),
        bg(2)+`<rect x="46" y="38" width="28" height="30" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+key(60,46,.6,C.grn)+key(60,56,.6,C.blue)+kid(18,82,.7,C.red)+curve(26,52,48,46,C.red)+kid(102,82,.7,C.grn)+key(92,58,.6,C.red)+arr(76,48,92,52,C.grn) ],
    l:[["каждому своё — база стонет","one each — the DB groans"],["пул держит пару десятков","the pool keeps a few dozen"],["вернул — взял следующий","returned — next one takes"]],
    c:["Соединение — дорогой процесс. Держу двадцать и раздаю по очереди, а не тысячу.","A connection is a costly process. I keep twenty and hand them out in turn."] };

  /* ===== Hibernate ===== */
  Z[HB+"Что вообще делает ORM"]={
    p:[ bg(0)+row(6,30,40,"#fff","7 · 25")+row(6,41,40,"#fff","8 · 31")+arr(52,36,72,36)+arr(72,48,52,48)+ent(92,42,"7",C.bot)+txt(60,72,"↔",14,C.blue),
        bg(1)+bot(20,84,.55)+ent(20,28,"7",C.bot)+arrowR(36,40,50)+gear(64,44,1.1)+arrowR(78,44,88)+card(102,30,26,14,"#fff",txt(0,3,"SQL",8))+card(102,52,26,14,"#fff",txt(0,3,"SQL",8)),
        bg(2)+box(46,76,46,30,null)+card(30,30,22,12,"#fff",txt(0,3,"SQL",7),-14)+card(50,20,22,12,"#fff",txt(0,3,"SQL",7),6)+card(68,32,22,12,"#fff",txt(0,3,"SQL",7),14)+arr(72,62,86,62,C.ink,true)+dbt(102,60,.85)+txt(104,26,"?",16,C.red) ],
    l:[["строка ↔ объект","row ↔ object"],["SQL пишет сам","writes SQL for you"],["что ушло в базу — скрыто","what hits the DB is hidden"]],
    c:["Я превращаю строки в объекты и сам пишу SQL. Удобно, но какие запросы ушли — не видно.","I turn rows into objects and write SQL myself. Handy, but you can't see what queries go out."] };

  Z[HB+"Persistence context — кэш первого уровня"]={
    p:[ bg(0)+bot(20,82,.8,{glasses:true})+txt(58,28,"find(7)",8)+arr(38,36,82,36)+dbt(100,48,.9)+arr(82,56,40,56,C.blue)+ent(60,68,"7",C.bot),
        bg(1)+bot(20,82,.8,{glasses:true,arms:"reach"})+card(56,48,32,36,"#fff7d6",ent(0,-4,"7",C.bot)+txt(0,14,"✓",9,C.grn))+txt(56,22,"find(7)",8)+ln(74,48,92,48,C.grey,true)+dbt(104,50,.7,null,C.grey)+no(86,36,.8),
        bg(2)+ent(84,44,"7",C.bot)+txt(22,28,"a",13,C.blue)+txt(22,66,"b",13,C.red)+arr(30,26,68,38,C.blue)+arr(30,62,68,50,C.red)+txt(84,72,"a == b",9,C.grn) ],
    l:[["первый раз — из базы","first time — from the DB"],["второй раз — из памяти","second time — from memory"],["это один и тот же объект","it's the very same object"]],
    c:["Внутри транзакции я помню, что уже загрузил. Спросишь второй раз — отдам тот же объект.","Inside a transaction I remember what I loaded. Ask again — you get the very same object."] };

  Z[HB+"Dirty checking — save() часто не нужен"]={
    p:[ bg(0)+frame(6,14,108,48)+ent(32,38,"5",C.bot)+arrowR(50,38,68)+ent(86,38,"9",C.bot,C.red)+bot(60,84,.42,{arms:"reach"}),
        bg(1)+txt(26,30,"5 ≠ 9",9)+mag(26,50,1)+card(64,26,40,14,"#fff",txt(0,3,"UPDATE",8,C.grn))+arr(42,46,84,46)+dbt(100,52,.85)+txt(28,74,"save()",8,"#8a90a0")+ln(12,71,44,71,C.red,false,1.6),
        bg(2)+kid(18,82,.7,C.red,"wow")+ent(50,38,"0",C.bot,C.red)+spark(38,26,C.yel)+arr(66,44,84,48)+dbt(100,52,.85,"0")+ok(110,28,.8) ],
    l:[["поменял поле","changed a field"],["на коммите — UPDATE сам","commit sends UPDATE itself"],["случайно — тоже в базу","by accident — saved too"]],
    c:["Изменил поле — я сам замечу и запишу на коммите. Даже если ты менял случайно.","Change a field and I'll notice and write it at commit. Even if it was by accident."] };

  Z[HB+"Ленивая загрузка и её исключение"]={
    p:[ bg(0)+ent(30,40,"7",C.bot)+ln(44,40,70,40,C.grey,true)+ghost(86,40)+bot(60,84,.42,{mood:"smile"}),
        bg(1)+bot(20,82,.8,{arms:"reach"})+ent(48,60,"7",C.bot)+`<rect x="68" y="18" width="34" height="56" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.6"/><path d="M68 30 h34 M68 62 h34" stroke="${C.wood2}" stroke-width="1"/>`+lock(85,46,1.2),
        bg(2)+bot(30,82,.8,{arms:"reach",mood:"sad"})+ghost(72,52)+boom(86,30,1.2)+no(106,58,.9) ],
    l:[["вместо связи — заглушка","a stub instead of a link"],["транзакция закрыта","the transaction is closed"],["тронул — исключение","touched it — exception"]],
    c:["Связь я гружу потом, по требованию. Тронешь её после закрытия транзакции — будет ошибка.","I load links later, on demand. Touch one after the transaction closes and it fails."] };

  Z[HB+"N+1 — главный убийца производительности"]={
    p:[ bg(0)+bot(14,82,.65,{arms:"reach"})+[0,1,2,3].map(i=>card(38,70-i*3,20,10,"#fff","")).join("")+txt(38,63,"100",7)+arr(42,40,80,40)+dbt(98,48,.9)+txt(60,30,"1",13,C.grn),
        bg(1)+bot(16,82,.65,{mood:"sad"})+[0,1,2,3,4].map(i=>`<path d="M30 ${48-i*2} Q60 ${18+i*9} 86 ${48-i*2}" fill="none" stroke="${C.red}" stroke-width="1.3" stroke-dasharray="3 2" opacity="${1-i*.12}"/>`).join("")+dbt(100,52,.85)+txt(58,80,"1 + 100",11,C.red),
        bg(2)+bot(22,82,.8,{arms:"reach"})+card(60,28,52,14,"#fff",txt(0,3,"JOIN FETCH",8,C.grn))+arr(42,50,82,50)+dbt(100,52,.85)+txt(60,68,"1",13,C.grn)+ok(104,22,.8) ],
    l:[["заказы — одним запросом","orders in one query"],["+ по запросу на каждый","+ one query per order"],["JOIN FETCH — один заход","JOIN FETCH — one trip"]],
    c:["Сто заказов, и за клиентом к каждому хожу отдельно — уже 101 запрос. Бери всё сразу.","100 orders, then a trip per customer — 101 queries. Fetch it all at once."] };

  Z[HB+"Detached: объект вне транзакции"]={
    p:[ bg(0)+frame(8,10,74,62)+ent(44,40,"1",C.bot)+bot(98,82,.7,{glasses:true})+mag(70,56,.8),
        bg(1)+frame(8,10,46,40,C.grey)+ent(78,30,"5",C.bot,C.red)+bot(30,82,.6,{mood:"think"})+arr(78,44,92,60,C.grey,true)+no(80,58,.7)+dbt(102,66,.6,"1"),
        bg(2)+frame(36,10,76,54)+ent(16,36,"5",C.bot,C.red)+arr(30,36,52,36,C.grn)+txt(40,26,"merge",7,C.grn)+dbt(90,40,.8,"5")+ok(70,52,.8) ],
    l:[["в транзакции — на виду","in a tx — I'm watching it"],["вне — правки теряются","outside — edits are lost"],["merge — снова под надзор","merge — watched again"]],
    c:["Закрылась транзакция — я больше не слежу за объектом. Правки в нём сами не сохранятся.","Once the transaction closes I stop watching the object. Its edits won't save by themselves."] };

  Z[HB+"Когда ORM мешает"]={
    p:[ bg(0)+ent(30,40,"7",C.bot)+arrowR(46,40,72)+dbt(92,46,.9)+ok(30,64,.9),
        bg(1)+gear(26,36,1)+`<path d="M38 38 q8 -14 14 0 t10 6 q6 -18 -4 -10 t14 8 q4 10 -8 4 t20 -4" fill="none" stroke="${C.red}" stroke-width="1.6"/>`+bars(78,64,[12,22,16,28],C.grey)+clock(26,64,.8,9)+bot(60,84,.42,{mood:"sad"}),
        bg(2)+paper(30,38,["SELECT","SUM()","GROUP"])+arrowR(50,40,66)+bars(74,60,[12,22,16,28],[C.blue,C.grn,C.yel,C.red])+ok(104,24,.8) ],
    l:[["одна сущность — удобно","one entity — easy"],["отчёт через ORM — каша","a report via ORM — a mess"],["обычный SQL — и готово","plain SQL — done"]],
    c:["Для простых дел ORM отличный. Тяжёлый отчёт или массовую правку пишут обычным SQL.","ORM is great for simple things. Heavy reports and mass updates go in plain SQL."] };

  /* ===== Данные под нагрузкой ===== */
  Z[DL+"Репликация: читать с копий"]={
    p:[ bg(0)+env(14,26,.45)+arr(24,30,44,36)+crown(60,16)+dbt(60,36,.9,"v2",C.bot2)+arr(48,52,30,62,C.grey)+arr(72,52,90,62,C.grey)+dbt(24,72,.6)+dbt(96,72,.6),
        bg(1)+crown(60,16)+dbt(60,36,.9,"v2",C.bot2)+dbt(22,70,.7,"v1")+dbt(98,70,.7,"v1")+clock(60,68,.9,4)+ln(48,52,32,58,C.grey,true)+ln(72,52,88,58,C.grey,true),
        bg(2)+kid(24,82,.75,C.grn,"sad")+txt(24,36,"?",12,C.red)+dbt(86,52,.9,"v1")+arr(70,52,40,52,C.blue) ],
    l:[["пишу в мастер","write to the master"],["копии догоняют не сразу","copies catch up later"],["прочитал с копии — старое","read a copy — it's stale"]],
    c:["Пишу в главную базу, а читаю с копий. Но копии отстают — можно увидеть старое.","I write to the main DB and read from copies. But copies lag, so you may see old data."] };

  Z[DL+"Свои свежие записи читай с мастера"]={
    p:[ bg(0)+kid(16,82,.7,C.red,"sad")+crown(66,14)+dbt(66,34,.75,"v2",C.bot2)+arr(26,44,50,34,C.ink)+dbt(96,66,.7,"v1")+arr(80,64,28,58,C.red,true),
        bg(1)+kid(20,82,.7,C.red)+crown(80,20)+dbt(80,44,.9,"v2",C.bot2)+arr(62,46,32,52,C.grn)+ok(46,30,.8),
        bg(2)+crown(30,14)+dbt(30,34,.7,"v2",C.bot2)+dbt(88,40,.7,"v1")+kid(70,84,.55,C.yel)+kid(88,84,.55,C.blue)+kid(106,84,.55,C.grn)+ln(88,54,88,62,C.grey,false,1.4) ],
    l:[["сохранил, а там старое","saved, but sees old data"],["своё свежее — с мастера","own fresh data — master"],["остальное — с копий","the rest — from copies"]],
    c:["Что ты сам только что записал, читаю с мастера. Всё остальное — с копий.","What you just wrote yourself, I read from the master. Everything else comes from copies."] };

  Z[DL+"Шардинг: данные не влезли в одну машину"]={
    p:[ bg(0)+dbt(54,44,1.5,"100%",C.red)+spark(90,22,C.red)+spark(18,28,C.red)+bot(98,82,.6,{mood:"sad",arms:"reach"}),
        bg(1)+card(60,18,36,14,"#fff",txt(0,3,"key",8))+arr(52,26,32,40)+arr(68,26,88,40)+dbt(30,58,.9,"A–M")+dbt(90,58,.9,"N–Z",C.grn),
        bg(2)+dbt(22,46,.8,"A–M")+dbt(98,46,.8,"N–Z",C.grn)+ln(36,44,84,44,C.red,true)+no(60,44,1)+txt(60,24,"JOIN",9,C.red)+bot(60,84,.42,{mood:"sad"}) ],
    l:[["одна машина не тянет","one machine can't cope"],["режем по ключу","split by key"],["JOIN между ними — нельзя","no JOIN across them"]],
    c:["Режу таблицу по ключу на разные машины. Но связать данные с двух машин уже не выйдет.","I cut the table by key across machines. But joining data from two machines won't work."] };

  Z[DL+"Партиционирование — не то же самое"]={
    p:[ bg(0)+cab(60,20,46,["08","09","10"])+dbt(102,30,.5)+bot(18,82,.55),
        bg(1)+cab(44,20,40,["08","09"],["#e7e0d0","#e7e0d0"])+`<rect x="62" y="50" width="40" height="12" rx="2" fill="${C.grn}" stroke="${C.ink}" stroke-width="1"/>`+txt(82,59,"10",7,"#fff")+mag(96,30,1),
        bg(2)+cab(34,22,36,["09","10"])+`<g transform="rotate(18 92 40)"><rect x="76" y="34" width="32" height="12" rx="2" fill="#f3dcae" stroke="${C.wood2}"/></g>`+txt(92,44,"08",7)+bin(96,82)+txt(64,72,"DROP",7,C.red) ],
    l:[["одна база, ящики-месяцы","one DB, monthly drawers"],["читаю только нужный","read just the one needed"],["старый — выбросить целиком","drop an old one whole"]],
    c:["Таблица одна, но по ящикам-месяцам. Свежее ищу в одном ящике, старое выкидываю целиком.","One table, split into month drawers. I search one drawer and throw old ones out whole."] };

  Z[DL+"Оптимистичная блокировка"]={
    p:[ bg(0)+row(42,16,36,"#fff","v1")+kid(22,82,.7,C.red)+kid(98,82,.7,C.blue)+card(22,44,18,12,"#fff",txt(0,3,"v1",7))+card(98,44,18,12,"#fff",txt(0,3,"v1",7))+ln(48,26,28,36,C.grey,true)+ln(72,26,92,36,C.grey,true),
        bg(1)+row(42,16,36,C.grn,"v2","#fff")+kid(22,82,.7,C.red)+arr(30,40,48,28,C.grn)+ok(60,44,.9)+kid(98,82,.7,C.blue),
        bg(2)+row(42,16,36,C.grn,"v2","#fff")+kid(98,82,.7,C.blue,"sad")+card(80,38,24,12,"#fff",txt(0,3,"v1",7,C.red))+no(56,40,.9)+txt(56,62,"v1 ≠ v2",8,C.red)+`<path d="M30 56 a10 10 0 1 1 6 -14" fill="none" stroke="${C.blue}" stroke-width="1.8"/><path d="M33 40 l4 2 l-1 4" fill="none" stroke="${C.blue}" stroke-width="1.8"/>` ],
    l:[["оба взяли версию 1","both took version 1"],["первый записал — v2","first one wrote — v2"],["второй — ошибка, повтор","second fails, retries"]],
    c:["Никого не запираю. На записи сверяю версию: изменилась — значит, опоздал, повтори.","I lock no one. On write I check the version: if it changed, you were late — retry."] };

  Z[DL+"Пессимистичная блокировка"]={
    p:[ bg(0)+row(36,24,48,"#fff","$ 100")+lock(92,30,.9)+kid(18,82,.75,C.red)+card(72,52,52,12,"#fff",txt(0,3,"FOR UPDATE",7,C.red)),
        bg(1)+row(36,16,48,"#fff","$ 100")+lock(92,22,.9)+kid(30,82,.7,C.red)+kid(70,82,.65,C.blue,"sad")+kid(96,82,.65,C.yel,"sad")+clock(84,44,.8,3),
        bg(2)+row(36,16,48,C.grn,"$ 70","#fff")+lock(92,22,.9,true)+kid(64,82,.7,C.blue)+arr(64,40,64,30,C.grn)+ok(100,52,.8)+kid(20,82,.6,C.red) ],
    l:[["запер строку","locked the row"],["остальные ждут","everyone else waits"],["отпустил — следующий","released — next one goes"]],
    c:["Запираю строку до конца транзакции. Никто не перепишет, но все остальные ждут.","I lock the row until the transaction ends. No one overwrites it, but everyone else waits."] };

  Z[DL+"Дедлок бывает и в базе"]={
    p:[ bg(0)+row(8,18,28,"#fff","A")+lock(42,24,.6)+row(84,18,28,"#fff","B")+lock(78,24,.6)+kid(22,82,.7,C.red)+kid(98,82,.7,C.blue)+arr(30,42,86,32,C.red,true)+arr(90,42,34,32,C.blue,true)+clock(60,64,.7,6),
        bg(1)+kid(20,82,.7,C.red)+kid(100,82,.7,C.blue,"sad")+no(100,30,.9)+bot(60,82,.75,{arms:"up",hat:true})+ok(20,30,.8),
        bg(2)+kid(18,82,.7,C.red)+kid(102,82,.7,C.blue)+txt(60,30,"A → B",11,C.grn)+txt(60,50,"A → B",11,C.grn)+ok(60,68,.9) ],
    l:[["держат и ждут друг друга","each holds, each waits"],["база снимает одного","the DB kills one"],["один порядок — нет петли","one order — no loop"]],
    c:["Двое заперли строки крест-накрест и ждут вечно. База убьёт одного. Лечи единым порядком.","Two locked rows crosswise and wait forever. The DB kills one. Cure: one shared order."] };

  Z[DL+"Батчи вместо тысячи запросов"]={
    p:[ bg(0)+bot(18,82,.65,{arms:"reach",mood:"sad"})+env(32,64,.4)+[0,1,2,3].map(i=>`<path d="M32 ${54-i*3} Q60 ${22+i*8} 88 ${54-i*3}" fill="none" stroke="${C.grey}" stroke-width="1.3" stroke-dasharray="3 2"/>`).join("")+dbt(102,56,.75)+txt(60,80,"×1000",10,C.red)+clock(60,16,.6,8),
        bg(1)+[0,1,2,3,4,5].map(i=>env(18+(i%3)*14,26+Math.floor(i/3)*14,.45)).join("")+arrowR(56,40,72)+box(94,64,32,30,"1000")+bot(60,84,.4,{arms:"up"}),
        bg(2)+bot(14,82,.6,{arms:"reach"})+box(44,74,22,18,"1000")+arr(58,48,84,48,C.grn)+dbt(102,56,.75)+txt(70,34,"×1",10,C.grn)+spark(110,26) ],
    l:[["тысяча ходок","a thousand trips"],["сложил в одну пачку","packed into one batch"],["один заход — быстро","one trip — fast"]],
    c:["Каждый запрос — поход до базы и обратно. Сложи тысячу в пачку и сходи один раз.","Every query is a round trip to the DB. Pack a thousand into a batch and go once."] };

  Z[DL+"OLTP и OLAP — разные задачи"]={
    p:[ bg(0)+kid(18,82,.7,C.red)+coin(34,52,.8)+arr(44,46,72,46)+dbt(92,50,.9,"+1")+txt(92,20,"OLTP",8,C.blue),
        bg(1)+[0,1,2].map(i=>`<rect x="${14+i*14}" y="20" width="10" height="54" rx="2" fill="${[C.blue,C.grn,C.yel][i]}" stroke="${C.ink}" stroke-width="1"/>`+[0,1,2,3,4].map(j=>`<path d="M${14+i*14} ${30+j*10} h10" stroke="#fff" stroke-width="1"/>`).join("")).join("")+arrowR(58,46,70)+bars(76,70,[14,26,20,36],C.bot)+txt(96,20,"OLAP",8,C.blue),
        bg(2)+dbt(36,44,1,null,C.red)+spark(54,22,C.red)+bars(14,74,[8,16,12],C.grey)+kid(70,82,.55,C.red,"sad")+kid(86,82,.55,C.grn,"sad")+kid(102,82,.55,C.yel,"sad")+clock(90,30,.8,7) ],
    l:[["касса: по строчке, быстро","till: row by row, fast"],["аналитика — по столбцам","analytics — by columns"],["отчёт на кассе — пробка","report on the till — jam"]],
    c:["Касса пробивает по одному чеку, аналитик считает миллионы строк. Им нужны разные базы.","The till rings one receipt at a time; analysts crunch millions of rows. Different DBs."] };

  Z[DL+"Когда вообще NoSQL"]={
    p:[ bg(0)+card(26,40,30,40,"#fff",txt(0,-8,"{ }",9,C.blue)+ln(-9,0,9,0,C.grey)+ln(-9,7,5,7,C.grey))+card(64,40,30,30,"#fff",txt(0,-4,"{ }",9,C.blue)+ln(-9,5,9,5,C.grey))+card(100,40,26,46,"#fff",txt(0,-12,"{ }",9,C.blue)+ln(-8,-2,8,-2,C.grey)+ln(-8,5,6,5,C.grey)+ln(-8,12,8,12,C.grey)),
        bg(1)+key(26,42,1.2,C.yel)+arrowR(44,42,66)+box(90,58,30,30,"42",C.bot)+spark(108,22)+spark(70,24,C.yel),
        bg(2)+card(26,38,28,32,"#fff",txt(0,0,"{ }",9,C.blue))+card(94,38,28,32,"#fff",txt(0,0,"{ }",9,C.blue))+ln(42,38,78,38,C.red,true)+no(60,38,.9)+coin(60,66,1)+bot(18,86,.35,{mood:"think"}) ],
    l:[["форма плавает — документы","shape varies — documents"],["только по ключу — молния","key lookup — lightning"],["без связей — это цена","no joins — that's the cost"]],
    c:["NoSQL берут под задачу: форма плавает или нужен только ключ. Без схемы и джойнов — это плата.","Pick NoSQL for a reason: loose shape or key-only access. Losing schema and joins is a cost."] };

  /* ===== Очереди ===== */
  Z[Q+"Зачем не звать напрямую"]={
    p:[ bg(0)+server(28,44,1)+arr(44,40,80,40)+server(96,44,1,false)+no(96,18,.7)+boom(28,14,.7)+bot(60,84,.4,{mood:"sad"}),
        bg(1)+server(16,44,.9)+env(16,72,.4)+arr(30,40,40,40)+tube(64,40,3,44)+server(106,44,.9,false)+ok(16,14,.7),
        bg(2)+tube(42,40,1,44)+arr(66,40,82,40,C.grn)+server(100,44,.9)+env(100,74,.4)+ok(100,16,.7) ],
    l:[["звал напрямую — упали оба","direct call — both fall"],["кинул в очередь — свободен","dropped it in — free to go"],["получатель встал — забрал","receiver's back — takes it"]],
    c:["Не звоню напрямую, а кладу письмо в очередь. Получатель прилёг — письмо подождёт.","I don't call directly, I drop a letter in the queue. If the receiver naps, it waits."] };

  Z[Q+"Что даёт и что забирает"]={
    p:[ bg(0)+[0,1,2,3,4].map(i=>env(14+(i%2)*14,22+i*10,.4)).join("")+arr(40,44,48,44)+tube(70,44,3,36)+arr(90,44,98,44,C.grn)+server(108,50,.55),
        bg(1)+kid(24,82,.75,C.blue,"sad")+clock(24,24,.9,10)+txt(58,44,"…",16,C.grey)+server(96,50,.8),
        bg(2)+dbt(26,46,.8,"5")+dbt(94,46,.8,"4")+txt(60,48,"≠",16,C.red)+clock(60,72,.7,2) ],
    l:[["всплеск — очередь примет","a spike — queue absorbs it"],["ответа сразу нет","no answer right away"],["данные пока расходятся","data differ for a while"]],
    c:["Очередь гасит всплески и развязывает сервисы. Зато ответ не сразу, а данные то и дело разные.","A queue absorbs spikes and decouples services. But no instant reply, and data drifts a while."] };

  Z[Q+"Доставка «хотя бы один раз»"]={
    p:[ bg(0)+server(16,44,.9)+arr(30,32,88,32)+env(58,22,.45)+server(104,44,.9)+ln(88,56,64,56,C.grn,true)+`<path d="M56 46 l6 6 l-5 2 l6 7" fill="none" stroke="${C.red}" stroke-width="2"/>`+ln(52,56,32,56,C.grey,true),
        bg(1)+server(16,44,.9)+arr(30,36,84,36)+env(56,26,.45)+server(102,40,.85)+env(88,78,.4)+env(106,78,.4)+txt(88,70,"#7",7)+txt(106,70,"#7",7),
        bg(2)+card(30,36,38,26,"#fff",txt(0,-2,"= 1",10)+txt(0,9,"$$$",7,C.red))+card(88,36,38,26,"#fff",txt(0,-2,"≥ 1",10)+txt(0,9,"$",7,C.grn))+[0,1,2].map(i=>coin(18+i*12,68,.8)).join("")+coin(88,68,.8)+ok(106,64,.6) ],
    l:[["ответ потерялся","the reply got lost"],["прислали ещё раз — дубль","sent again — a duplicate"],["«ровно раз» — дорого","exactly once costs a lot"]],
    c:["Сеть теряет ответы, и письмо пришлют ещё раз. Значит, дубли будут — готовься к ним.","The network loses replies, so a letter gets resent. Duplicates will come — be ready."] };

  Z[Q+"Идемпотентность — главное слово"]={
    p:[ bg(0)+env(18,26,.5)+env(18,46,.5)+txt(34,28,"#7",7)+txt(34,48,"#7",7)+arr(44,36,58,36)+coin(76,30,.9)+coin(90,40,.9)+kid(104,82,.6,C.red,"sad"),
        bg(1)+env(18,36,.5)+txt(18,52,"#7",8)+bot(54,82,.7,{glasses:true,mood:"think"})+card(96,36,30,42,"#fff7d6",txt(0,-10,"#5 ✓",7)+txt(0,1,"#6 ✓",7)+txt(0,12,"#7 ✓",7,C.grn)),
        bg(2)+coin(46,40,1.2)+txt(66,44,"× 1",10,C.grn)+kid(96,82,.7,C.grn)+ok(26,40,1) ],
    l:[["без проверки — дважды","no check — charged twice"],["#7 уже был — пропускаю","#7 seen — skip it"],["списали ровно раз","charged exactly once"]],
    c:["Перед делом смотрю в список: этот номер уже делал? Да — ничего не трогаю.","Before acting I check my list: done this ID already? Yes — I touch nothing."] };

  /* ===== Kafka ===== */
  Z[KF+"Это не очередь, это лог"]={
    p:[ bg(0)+tube(40,36,2,44)+`<circle cx="52" cy="36" r="4" fill="none" stroke="${C.grey}" stroke-width="1.2" stroke-dasharray="2 2"/>`+spark(52,20,C.grey)+arr(66,36,86,36,C.grey)+bot(100,82,.6,{arms:"hold"})+env(100,72,.4),
        bg(1)+lane(14,30,["0","1","2","3","4","5","6","7"],"#fff",C.ink)+mark(53,23,C.red)+mark(92,23,C.blue)+bot(53,82,.5)+bot(92,82,.5,{mood:"think"}),
        bg(2)+lane(14,40,["0","1","2","3","4","5","6","7"],"#fff",C.ink)+mark(14,33,C.red)+`<path d="M92 28 Q54 4 18 24" fill="none" stroke="${C.red}" stroke-width="1.8" stroke-dasharray="3 2"/><path d="M18 24 l2 -6 M18 24 l6 -1" stroke="${C.red}" stroke-width="1.8" stroke-linecap="round"/>`+bot(60,84,.45,{arms:"up"}) ],
    l:[["в очереди — забрал и нет","queue: taken and gone"],["в Kafka — всё лежит","Kafka: it all stays"],["можно перечитать заново","you can read it again"]],
    c:["Kafka — не ящик, а журнал. Сообщения лежат, а читатель только двигает свою закладку.","Kafka isn't a box, it's a log. Messages stay; each reader just moves its bookmark."] };

  Z[KF+"Партиции — единица параллелизма"]={
    p:[ bg(0)+txt(12,23,"0",8,C.red)+lane(26,20,[" "," "," "," "," "],"#fde4ec")+txt(12,41,"1",8,C.blue)+lane(26,38,[" "," "," "," "],"#e4f1ff")+txt(12,59,"2",8,C.grn)+lane(26,56,[" "," "," "," "," "," "],"#e7f6e8"),
        bg(1)+lane(18,24,["1","2","3"],C.red,"#fff")+arr(58,24,72,24,C.grn)+ok(84,24,.7)+lane(18,52,["1","3","2"],[C.red,C.blue,C.red],"#fff")+txt(84,56,"?",14,C.red),
        bg(2)+[0,1,2].map(i=>cell(18+i*14,18,String(i),[C.red,C.blue,C.grn][i],"#fff")+ln(18+i*14,26,20+i*28,46,C.grey,false,1.2)+bot(20+i*28,82,.48)).join("")+bot(104,82,.48,{mood:"sad"})+txt(104,40,"zZ",8,C.grey) ],
    l:[["топик — три дорожки","a topic — three lanes"],["порядок — внутри дорожки","order — within a lane"],["лишний читатель скучает","an extra reader idles"]],
    c:["Топик режется на партиции. Порядок — только внутри одной, читателей не больше, чем партиций.","A topic is cut into partitions. Order holds within one; readers max out at the partition count."] };

  Z[KF+"Ключ решает, куда попадёт сообщение"]={
    p:[ bg(0)+cell(16,30,"A",C.red,"#fff")+cell(16,50,"B",C.blue,"#fff")+arr(26,30,44,40)+arr(26,50,44,42)+`<path d="M46 26 h20 l-6 14 l6 14 h-20 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>`+txt(56,44,"#",9)+arr(68,32,84,24,C.red)+arr(68,50,84,58,C.blue)+lane(94,22,["A"],C.red,"#fff")+lane(94,60,["B"],C.blue,"#fff")+txt(110,25,"0",7)+txt(110,63,"2",7),
        bg(1)+lane(16,40,["1","2","3","4"],C.red,"#fff",16)+arr(76,40,92,40,C.grn)+ok(104,40,.8)+kid(60,84,.45,C.red),
        bg(2)+lane(20,20,["1","4"],C.red,"#fff",24)+lane(32,40,["2"],C.red,"#fff")+lane(20,60,["3"],C.red,"#fff")+txt(96,46,"?",18,C.red)+ln(8,30,70,30,C.grey,true)+ln(8,50,70,50,C.grey,true) ],
    l:[["ключ выбирает дорожку","the key picks the lane"],["клиент — всё по порядку","one client — all in order"],["без ключа — вразброс","no key — scattered"]],
    c:["Одинаковый ключ — всегда одна партиция. Положи id клиента в ключ, и его события не смешаются.","Same key, same partition. Put the customer id in the key and their events keep order."] };

  Z[KF+"Consumer group и ребаланс"]={
    p:[ bg(0)+[0,1,2,3].map(i=>cell(14,16+i*14,String(i),"#fff")+ln(20,16+i*14,i<2?44:82,46,i<2?C.red:C.blue,false,1.2)).join("")+bot(44,82,.6)+bot(84,82,.6,{mood:"smile"}),
        bg(1)+[0,1,2,3].map(i=>cell(14,16+i*14,String(i),"#fff")+ln(20,16+i*14,40+i*16,30,C.grey,true,1.2)).join("")+pause(60,20)+bot(36,82,.5,{mood:"think"})+bot(64,82,.5,{mood:"think"})+bot(94,82,.5,{mood:"wow",arms:"up"}),
        bg(2)+[0,1,2,3,4,5,6,7].map(i=>env(26+(i%4)*10,74-Math.floor(i/4)*10-(i%2)*2,.36)).join("")+env(44,46,.36)+env(34,36,.36)+arr(70,60,70,28,C.red)+clock(96,38,.9,11)+bot(96,84,.4,{mood:"sad"}) ],
    l:[["каждой партиции — один","one reader per partition"],["новый — всё переезжает","a new one — all move"],["частые рестарты — хвост","many restarts — lag grows"]],
    c:["Партиции делятся между читателями. Пришёл новый — всё переезжает, и чтение на паузе.","Partitions are split among readers. A new one joins, they move, and reading pauses."] };

  Z[KF+"Offset — закладка, а не удаление"]={
    p:[ bg(0)+lane(14,30,["0","1","2","3","4","5","6","7"],["#e7f6e8","#e7f6e8","#e7f6e8","#e7f6e8","#fff","#fff","#fff","#fff"])+mark(66,23)+bot(66,84,.55,{arms:"up"}),
        bg(1)+lane(14,24,["0","1","2","3","4","5","6","7"],"#fff")+mark(66,17)+bot(30,82,.5,{mood:"sad"})+boom(30,40,.6)+arrowR(46,62,72)+bot(90,82,.5,{arms:"reach"})+arr(84,48,70,34,C.grn),
        bg(2)+lane(14,36,["0","1","2","3","4","5","6","7"],"#fff")+mark(27,29)+`<path d="M66 50 Q46 66 28 48" fill="none" stroke="${C.blue}" stroke-width="1.8" stroke-dasharray="3 2"/><path d="M28 48 l1 6 M28 48 l6 1" stroke="${C.blue}" stroke-width="1.8" stroke-linecap="round"/>`+bot(96,84,.5,{arms:"reach"}) ],
    l:[["закладка на 4","bookmark at 4"],["упал, встал — с 4-го","crashed, up — from 4"],["отмотал назад — заново","rewound — replay"]],
    c:["Помню номер последнего прочитанного. Упал — продолжу с него, захочу — отмотаю назад.","I remember the last offset I read. Crash — I resume there; or I rewind to replay."] };

  Z[KF+"Когда Kafka лишняя"]={
    p:[ bg(0)+server(62,48,.75)+server(84,48,.75)+server(106,48,.75)+txt(84,22,"Kafka",8)+env(20,48,.6)+arrowR(34,48,50)+bot(24,84,.4,{mood:"think"}),
        bg(1)+row(18,18,58,"#fff",null)+ok(26,22.5,.45)+row(18,30,58,"#fff",null)+ok(26,34.5,.45)+row(18,42,58,"#fff",null)+clock(26,46.5,.45,2)+env(52,46.5,.3)+`<path d="M92 34 a10 10 0 1 1 -8 -8" fill="none" stroke="${C.blue}" stroke-width="2"/><path d="M82 21 l3 5 l-5 2" fill="none" stroke="${C.blue}" stroke-width="2"/>`+bot(60,84,.4)+env(52,22.5,.3)+env(52,34.5,.3),
        bg(2)+lane(10,30,["","","","","","","",""],[C.red,C.blue,C.grn,C.yel,C.red,C.blue,C.grn,C.yel],"#fff",13.5)+lane(10,46,["","","","","","","",""],[C.blue,C.yel,C.red,C.grn,C.blue,C.yel,C.red,C.grn],"#fff",13.5)+bot(30,84,.45,{arms:"up"})+bot(90,84,.45,{arms:"up"})+ok(60,68,.8) ],
    l:[["письмо через Kafka? тяжко","email via Kafka? heavy"],["таблица задач — проще","a task table is simpler"],["поток событий — вот Kafka","event streams — Kafka fits"]],
    c:["Kafka — для потока событий и перечитывания. Фоновое письмо проще сделать таблицей задач.","Kafka is for event streams and replay. A background email is simpler with a task table."] };

  /* ===== События и интеграция ===== */
  Z[EV+"Двойная запись всегда ломается"]={
    p:[ bg(0)+bot(16,82,.6,{arms:"reach"})+arr(30,40,46,40)+dbt(62,44,.75)+ok(62,16,.6)+arr(78,40,90,40)+txt(104,44,"Kafka",7)+ok(104,22,.6),
        bg(1)+dbt(28,46,.8)+ent(28,48,"7",C.bot)+ok(28,16,.6)+boom(60,40,1)+`<rect x="84" y="28" width="30" height="24" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="3 2"/>`+txt(99,24,"Kafka",7)+no(99,40,.7),
        bg(2)+dbt(28,46,.8,null,C.grey)+no(28,16,.6)+boom(60,40,1)+`<rect x="84" y="28" width="30" height="24" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+env(99,40,.5)+txt(99,24,"Kafka",7)+ok(99,64,.6) ],
    l:[["база, потом Kafka","the DB, then Kafka"],["упал — заказ без события","crash — order, no event"],["или событие без заказа","or an event, no order"]],
    c:["Пишу в базу и в Kafka по очереди. Упаду между ними — одно запишется, другое нет.","I write to the DB, then to Kafka. Crash in between and only one of them happens."] };

  Z[EV+"Outbox: событие как строка в той же транзакции"]={
    p:[ bg(0)+frame(10,12,64,60)+row(18,24,48,"#fff","7")+row(18,46,48,"#fff",null)+env(42,50.5,.3)+txt(42,67,"COMMIT",6,C.bot2)+dbt(98,48,.8),
        bg(1)+frame(8,12,48,46,C.grn)+row(14,22,36,C.grn,"7","#fff")+row(14,38,36,C.grn,null)+env(32,42.5,.3)+ok(32,68,.8)+frame(64,12,48,46,C.red)+row(70,22,36,"#dfe2e8",null)+row(70,38,36,"#dfe2e8",null)+no(88,68,.8),
        bg(2)+dbt(20,46,.8)+row(8,64,26,"#fff",null)+env(21,68.5,.28)+bot(58,82,.7,{arms:"hold"})+env(58,71,.4)+arr(74,44,90,44)+txt(104,48,"Kafka",7) ],
    l:[["заказ и событие — вместе","order and event together"],["либо оба, либо никого","both or neither"],["курьер везёт в Kafka","a relay ships to Kafka"]],
    c:["Событие кладу строкой в ту же транзакцию, что и заказ. Потом курьер отвезёт его в Kafka.","I put the event as a row in the same transaction as the order. A relay ships it to Kafka later."] };

  Z[EV+"CDC и Debezium: читаем журнал базы"]={
    p:[ bg(0)+dbt(22,44,.9)+lane(46,44,["1","2","3","4"],"#fff",C.ink,13)+arrowR(98,44,106)+dbt(112,64,.4),
        bg(1)+dbt(18,44,.8)+lane(38,44,["1","2","3","4"],"#fff",C.ink,13)+bot(98,82,.75,{glasses:true,arms:"reach"})+mag(78,56,.7),
        bg(2)+laptop(24,46,.9,txt(0,-10,"{ }",8,C.blue))+ok(24,64,.7)+bot(58,82,.6,{glasses:true})+arr(72,40,84,40)+lane(96,30,["",""],[C.red,C.blue],"#fff",12)+txt(102,52,"Kafka",7) ],
    l:[["база и так пишет журнал","the DB logs changes anyway"],["Debezium читает журнал","Debezium reads the log"],["код приложения не трогаем","app code stays untouched"]],
    c:["База и так ведёт журнал изменений. Debezium читает его, как копия, и шлёт события в Kafka.","The DB already keeps a change log. Debezium reads it like a replica and sends events to Kafka."] };

  Z[EV+"Outbox или CDC — что выбрать"]={
    p:[ bg(0)+laptop(26,46,.85,txt(0,-10,"{ }",8,C.blue))+arrowR(48,40,62)+env(82,40,.9)+coin(82,40,.6)+ok(104,22,.6)+bot(82,84,.35),
        bg(1)+row(10,26,46,"#fff","1 → 2")+arrowR(60,30,74)+env(94,30,.9)+txt(94,56,"1 → 2",8)+dbt(32,62,.55),
        bg(2)+row(10,22,44,"#fff","a")+arr(58,26,70,26,C.red)+row(74,22,36,"#fff","b")+kid(90,82,.65,C.blue,"sad")+no(60,56,.9)+env(34,58,.6) ],
    l:[["outbox: смысл, но код","outbox: meaning, but code"],["CDC: копия строки","CDC: a copy of a row"],["сменил колонку — сломалось","rename column — it breaks"]],
    c:["Outbox — события со смыслом, но нужен код. CDC — кода не надо, но события повторяют таблицы.","Outbox gives meaningful events but needs code. CDC needs none, but events mirror tables."] };

  Z[EV+"Event Sourcing: хранить события, а не состояние"]={
    p:[ bg(0)+card(46,40,40,30,"#fff",txt(0,4,"100",13))+txt(90,46,"?",18,C.red)+bot(96,84,.4,{mood:"think"}),
        bg(1)+[["+150",C.grn],["−70",C.red],["+20",C.grn]].map((e,i)=>card(20+i*28,30,24,16,"#fff",txt(0,3,e[0],8,e[1]))).join("")+arrowR(92,30,104)+txt(60,64,"= 100",12,C.blue),
        bg(2)+[["+150",C.grn],["−70",C.red],["+20",C.grn]].map((e,i)=>card(20+i*28,24,24,16,"#fff",txt(0,3,e[0],8,e[1]))).join("")+`<path d="M20 38 v4 h28 v-4" fill="none" stroke="${C.blue}" stroke-width="1.6"/>`+txt(34,56,"80",12,C.blue)+clock(92,58,1,4) ],
    l:[["только итог — откуда?","just a total — from where?"],["лента всех событий","a tape of all events"],["итог на любой момент","the total at any moment"]],
    c:["Храню не итог, а все события по порядку. Сложу их — получу баланс на любой день.","I keep every event, not just the total. Add them up and get the balance for any day."] };

  Z[EV+"Чем платят за Event Sourcing"]={
    p:[ bg(0)+card(22,36,26,26,"#fff",txt(0,4,"100",9,C.blue))+`<rect x="9" y="23" width="26" height="26" rx="4" fill="none" stroke="${C.yel}" stroke-width="2.4"/>`+lane(48,36,["+","−","+"],"#fff",C.ink,13)+txt(98,40,"…1M",8,C.grey)+clock(98,64,.7,5)+ok(22,64,.7),
        bg(1)+card(30,30,26,16,"#fff",txt(0,3,"+50",8,C.grn))+`<rect x="22" y="44" width="16" height="8" rx="2" fill="#f6cad8" stroke="${C.ink}" stroke-width="1"/>`+no(46,58,.7)+arrowR(52,30,68)+card(86,30,26,16,"#fff",txt(0,3,"−50",8,C.red))+ok(86,54,.8),
        bg(2)+env(26,36,.9)+txt(26,56,"v1",9)+gear(60,40,.9)+env(94,36,.9,"#e4f1ff")+txt(94,56,"v2",9)+bot(60,84,.4,{mood:"think"}) ],
    l:[["снимок вместо прокрутки","snapshot, not full replay"],["не стереть — дописать","can't erase — only append"],["новый формат — морока","new format — a whole job"]],
    c:["Миллион событий каждый раз не прокрутишь, ошибку не сотрёшь — только допишешь. Порог высокий.","You can't replay a million events each time or erase a mistake — only append. It's demanding."] };

  Z[EV+"CQRS: разделить чтение и запись"]={
    p:[ bg(0)+env(16,40,.6)+arr(28,40,40,40)+bot(56,82,.75,{hat:true,arms:"reach"})+card(56,22,22,18,"#fff7d6",txt(0,-1,"✓",8,C.grn)+txt(0,6,"✓",8,C.grn))+arr(76,50,88,50)+dbt(104,52,.7),
        bg(1)+dbt(18,48,.7,null,C.grn)+arrowR(34,46,52)+phone(84,46,1.3,row(-6.5,-11,13,"#fff",null,null,5)+row(-6.5,-4,13,"#fff",null,null,5)+row(-6.5,3,13,"#fff",null,null,5))+spark(104,22),
        bg(2)+dbt(20,40,.7)+arr(34,40,52,40)+env(64,40,.5)+arr(74,40,90,40)+dbt(104,40,.7,null,C.grn)+txt(20,72,"W",9)+txt(104,72,"R",9) ],
    l:[["запись: правила","writes: the rules"],["чтение: витрина под экран","reads: a view per screen"],["запись обновляет витрину","writes refresh the views"]],
    c:["Пишу по строгим правилам в одну модель, а читаю из готовых витрин под каждый экран.","I write by strict rules into one model, and read from ready-made views for each screen."] };

  Z[EV+"Saga: транзакция на несколько сервисов"]={
    p:[ bg(0)+[0,1,2].map(i=>server(20+i*40,50,.75)+(i<2?arr(32+i*40,50,48+i*40,50):"")+ok(20+i*40,22,.6)).join(""),
        bg(1)+server(20,50,.75)+ok(20,22,.6)+arr(32,50,48,50)+server(60,50,.75)+ok(60,22,.6)+arr(72,50,88,50)+server(100,50,.75,false)+no(100,22,.6)+boom(100,70,.6),
        bg(2)+server(20,50,.75)+server(60,50,.75)+server(100,50,.75,false)+arr(88,50,72,50,C.blue)+arr(48,50,32,50,C.blue)+coin(20,74,.8)+box(60,84,14,12,null)+txt(20,22,"↩",10,C.blue)+txt(60,22,"↩",10,C.blue) ],
    l:[["каждый шаг — свой коммит","each step commits itself"],["шаг посередине упал","a middle step failed"],["отменяем делом: возврат","undo by action: refund"]],
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
  const head=(x,y,ang,col)=>`<path d="M-6 -4 L0 0 L-6 4" transform="translate(${x} ${y}) rotate(${ang})" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const thr=(x,y,col)=>`<rect x="${x-2.5}" y="${y-8}" width="5" height="16" rx="2.5" fill="${col}" stroke="${C.ink}" stroke-width="1"/>`;
  const house=(x,y,s,nodoor)=>G(x,y,s||1,`<rect x="-15" y="-24" width="30" height="24" fill="#ffe6b0" stroke="${C.ink}" stroke-width="1.3"/><path d="M-19 -23 L0 -40 L19 -23 Z" fill="${C.red}" stroke="${C.ink}" stroke-width="1.3" stroke-linejoin="round"/>${nodoor?"":`<rect x="-4" y="-12" width="8" height="12" fill="${C.wood}" stroke="${C.ink}" stroke-width="1"/>`}`);
  const fire=(x,y,s)=>G(x,y,s||1,`<path d="M0 0 c-8 0 -10 -8 -6 -14 c1 4 3 5 4 5 c-1 -6 2 -11 6 -13 c-1 5 6 8 6 15 c0 4 -4 7 -10 7z" fill="${C.red}"/><path d="M0 -1 c-4 0 -5 -4 -3 -7 c1 2 2 2 2 2 c0 -3 2 -5 3 -6 c0 3 3 4 3 7 c0 2 -2 4 -5 4z" fill="${C.yel}"/>`);
  const zz=(x,y)=>txt(x,y,"z",8,C.blue)+txt(x+6,y-6,"Z",10,C.blue);
  const tag=(x,y,w,s,f,tc,sz)=>R(x-w/2,y-8,w,16,f||"#fff",6)+txt(x,y+3.5,s,sz||9,tc||C.ink);
  const shp=(x,y,k,r)=>{ r=r||4; return k===0?`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.red}"/>`
    : k===1?`<path d="M${x} ${y-r} L${x+r} ${y+r*.8} L${x-r} ${y+r*.8} Z" fill="${C.grn}"/>`
    : `<rect x="${x-r*.85}" y="${y-r*.85}" width="${r*1.7}" height="${r*1.7}" fill="${C.blue}"/>`; };
  const bin=(x,y)=>G(x,y,1,`<path d="M-11 -24 h22 l-2.5 24 h-17 z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.2"/>${P("M-13 -26 h26 M-4 -29 h8",C.ink,2)}${P("M-4 -19 v14 M4 -19 v14","#8a90a0",1.6)}`);
  const jar=(x,y,col)=>`<rect x="${x-9}" y="${y-22}" width="18" height="22" rx="4" fill="${col}" stroke="${C.ink}" stroke-width="1.2"/><rect x="${x-10}" y="${y-26}" width="20" height="5" rx="1.5" fill="${C.wood}" stroke="${C.ink}" stroke-width="1"/>`;
  const bucket=(x,y,n,s)=>G(x,y,s||1,`<path d="M-17 -28 L17 -28 L13 0 L-13 0 Z" fill="${C.grey}" stroke="${C.ink}" stroke-width="1.3" stroke-linejoin="round"/>${P("M-17 -28 Q0 -46 17 -28",C.ink,1.4)}${[[-6,-6],[6,-6],[0,-15],[-8,-17],[8,-17]].slice(0,n).map(c=>coin(c[0],c[1],.75)).join("")}`);
  const siren=(x,y,on)=>G(x,y,1,`${on?P("M-16 -14 l-4 -3 M16 -14 l4 -3 M0 -22 v-5 M-12 -20 l-3 -4 M12 -20 l3 -4",C.red,2):""}<path d="M-10 0 v-8 a10 10 0 0 1 20 0 v8 z" fill="${on?C.red:C.grey}" stroke="${C.ink}" stroke-width="1.2"/><rect x="-13" y="0" width="26" height="5" rx="1.5" fill="${C.ink}"/>`);
  const doc=(x,y,n,ks,w,h)=>{ w=w||24; h=h||32; return card(x,y,w,h,"#fff",txt(0,-h/2+9,n,8,C.grey)+ks.map((k,i)=>shp((i-(ks.length-1)/2)*10,4,k,4)).join("")); };
  const book=(x,y)=>`<path d="M${x-40} ${y} Q${x-20} ${y-8} ${x} ${y} V${y-34} Q${x-20} ${y-42} ${x-40} ${y-34} Z" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M${x} ${y} Q${x+20} ${y-8} ${x+40} ${y} V${y-34} Q${x+20} ${y-42} ${x} ${y-34} Z" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+[0,1,2].map(i=>P(`M${x-34} ${y-24+i*8} Q${x-20} ${y-30+i*8} ${x-6} ${y-24+i*8} M${x+6} ${y-24+i*8} Q${x+20} ${y-30+i*8} ${x+34} ${y-24+i*8}`,C.grey,1.2)).join("");
  const slice=(x,w,dy)=>{ dy=dy||0; return R(x,60+dy,w,14,"#e8b77a",1)+R(x,53+dy,w,7,"#fff",1)+R(x,43+dy,w,10,"#e8b77a",1)+R(x,39+dy,w,5,"#f6a5c0",1); };
  const stove=(x,y)=>R(x-18,y-24,36,24,C.grey,3)+`<circle cx="${x-8}" cy="${y-24}" r="1" fill="none"/>`+R(x-12,y-34,24,10,C.ink,3)+P(`M${x-6} ${y-38} q2 -4 0 -7 M${x+4} ${y-38} q2 -4 0 -7`,C.grey,1.4);
  const shelfFull=()=>R(10,44,72,4,C.wood,1)+R(10,74,72,0.1,C.wood,0)+[22,46,70].map(x=>box(x,44,18,18)+box(x,72,18,18)).join("");
  const pool=(x,y,cols)=>R(x,y-14,cols.length*10+8,28,"#fff",5)+cols.map((c,i)=>thr(x+9+i*10,y,c)).join("");
  const step=(x,y,n,col)=>`<circle cx="${x}" cy="${y}" r="10" fill="${col}" stroke="${C.ink}" stroke-width="1.2"/>`+txt(x,y+4,n,11,"#fff");

  const Z={};
  const E="События и интеграция|", K="Кэш|", RD="Redis|", ES="Elasticsearch|", A="Архитектура|", N="Сеть|", API="API и REST|", FT="Отказоустойчивость|";

  Z[E+"Почему не используют двухфазный коммит"]={
    p:[ bg(0)+db(18,62,.7)+db(102,62,.7)+ok(18,34,.8)+ok(102,34,.8)+bot(60,82,.72,{arms:"up"})+bubble(60,16,22,txt(0,4,"?",12,C.blue)),
        bg(1)+db(18,62,.7)+db(102,62,.7)+txt(18,38,"?",14,C.red)+txt(102,38,"?",14,C.red)+`<g transform="translate(80 72) rotate(-90)">${bot(0,0,.6,{mood:"sad"})}</g>`+no(60,28,.9),
        bg(2)+db(30,62,.8)+db(90,62,.8)+lock(30,28,1.1)+lock(90,28,1.1)+clock(60,46,.9,4),
        bg(3)+step(22,34,"1",C.grn)+arrowR(33,34,48)+step(60,34,"2",C.grn)+arrowR(71,34,86)+step(98,34,"!",C.red)+P("M98 48 Q60 76 26 50",C.red,2,DASH)+head(25,49,-140,C.red) ],
    l:[["«готовы?» — «да!»","\"ready?\" — \"yes!\""],["координатор упал","the coordinator fell"],["все ждут под замком","everyone waits, locked"],["сага: шаг или откат","saga: step or undo"]],
    c:["Главный спросил «готовы?» и упал — все застряли под замком. Поэтому я беру сагу.","The boss asked \"ready?\" and fell, so everyone is stuck and locked. That's why I use a saga."] };

  Z[E+"Согласованность в конечном счёте"]={
    p:[ bg(0)+db(28,60,.85)+db(92,60,.85)+card(28,24,22,18,"#fff",txt(0,4,"5",12,C.grn))+card(92,24,22,18,"#fff",txt(0,4,"3",12,C.red))+txt(60,52,"≠",18,C.red),
        bg(1)+db(28,60,.85)+db(92,60,.85)+card(28,24,22,18,"#fff",txt(0,4,"5",12,C.grn))+card(92,24,22,18,"#fff",txt(0,4,"3",12,C.red))+env(60,24,.7)+arrowR(44,42,76)+clock(60,62,.8,2),
        bg(2)+db(28,60,.85)+db(92,60,.85)+card(28,24,22,18,"#fff",txt(0,4,"5",12,C.grn))+card(92,24,22,18,"#fff",txt(0,4,"5",12,C.grn))+txt(60,52,"=",18,C.grn)+ok(60,24,.9) ],
    l:[["тут 5, а там 3","here 5, there 3"],["изменение в пути","the change is on its way"],["сошлось","now they match"]],
    c:["Сервисы на время расходятся, а потом сходятся. Сколько можно ждать — решаем с бизнесом.","Services drift apart for a while, then match again. How long is OK, we agree with the business."] };

  Z[K+"Кэш — это согласие на устаревшее"]={
    p:[ bg(0)+bot(30,82,.75,{arms:"reach"})+card(56,60,20,14,"#fff",txt(0,3.5,"v1",8))+db(98,58,.75)+card(98,26,20,14,"#fff",txt(0,3.5,"v1",8))+P("M86 30 Q70 34 62 50",C.ink,1.4,DASH)+spark(60,26),
        bg(1)+bot(30,82,.75,{arms:"reach",mood:"think"})+card(56,60,20,14,"#fff",txt(0,3.5,"v1",8))+db(98,58,.75)+card(98,26,20,14,"#e7f6e8",txt(0,3.5,"v2",8,C.grn))+spark(112,14,C.grn),
        bg(2)+bot(28,82,.75,{arms:"reach"})+card(58,56,20,14,"#fff",txt(0,3.5,"v1",8))+kid(96,82,.85,C.red,"smile")+txt(58,40,"?",13,C.red)+fade(db(100,30,.45),.5)+fade(card(100,14,16,10,"#fff",txt(0,3,"v2",6,C.grn)),.7) ],
    l:[["копия рядом — быстро","a copy close by — fast"],["в базе уже новое","the DB has a new one"],["отдаю то, что есть","I hand out what I have"]],
    c:["Кэш — я соглашаюсь отдать, может, старое, зато быстро. Если старое нельзя — кэш не подходит.","A cache means I agree to serve maybe-old data, but fast. If old data is not OK, no cache."] };

  Z[K+"Инвалидация — самая тяжёлая часть"]={
    p:[ bg(0)+bot(30,82,.75,{arms:"reach"})+box(84,76,34,26,null)+card(84,28,20,14,"#fff",txt(0,3.5,"v1",8))+arrD(84,38,48)+ok(108,22,.8),
        bg(1)+card(30,44,22,16,"#fff",txt(0,4,"v1",9))+clock(30,20,.8,0)+txt(30,66,"TTL",9,C.blue)+arrowR(46,44,70)+bin(90,72),
        bg(2)+kid(18,82,.75,C.grn)+db(52,60,.75)+card(52,26,20,14,"#e7f6e8",txt(0,3.5,"v2",8,C.grn))+arrowR(68,46,84)+card(100,46,22,16,"#fff",txt(0,4,"v1",9))+P("M91 39 L109 53 M109 39 L91 53",C.red,2.4),
        bg(3)+db(20,60,.7)+card(20,28,20,14,"#e7f6e8",txt(0,3.5,"v2",8,C.grn))+arrowR(34,34,54)+card(68,34,22,14,"#e7f6e8",txt(0,3.5,"v2",8,C.grn))+P("M34 60 H54",C.grey,1.6,DASH)+card(68,60,22,14,"#fff",txt(0,3.5,"v1",8))+txt(88,66,"!",16,C.red)+bot(106,82,.5,{mood:"sad"}) ],
    l:[["положить — легко","putting in is easy"],["вышел срок — в мусор","time's up — to the bin"],["записал — стёр копию","a write clears the copy"],["забыл место — старьё","missed a spot — stale"]],
    c:["Положить копию легко. Трудно вовремя выкинуть: по таймеру или стирать при каждой записи.","Putting a copy in is easy. Throwing it out on time is hard: by a timer or on every write."] };

  Z[K+"Что кладут и чего не кладут"]={
    p:[ bg(0)+R(12,64,62,4,C.wood,1)+jar(30,64,"#fff")+jar(56,64,C.yel)+txt(94,50,"×1000",11,C.grn)+ok(94,26,.9),
        bg(1)+R(12,64,62,4,C.wood,1)+jar(42,64,"#e2e4ea")+P("M30 36 q3 -3 6 0 M48 32 q3 -3 6 0 M36 52 h10",C.grey,1.2)+txt(94,50,"×1",12,C.red)+no(94,26,.9),
        bg(2)+coin(32,44,1.7)+clock(64,44,1.3,6)+txt(64,72,"!",14,C.red)+no(98,44,.9),
        bg(3)+R(26,28,20,46,C.grn,2)+txt(36,22,"90%",10,C.grn)+R(74,64,20,10,C.red,2)+txt(84,58,"10%",10,C.red)+ok(36,82,.7)+no(84,82,.7) ],
    l:[["читают часто — на полку","read often — on the shelf"],["почти не читают — нет","hardly read — no"],["нужно точно — нет","must be exact — no"],["доля попаданий","the hit rate"]],
    c:["На полку — то, что берут часто и меняют редко. И смотри, как часто я там нахожу нужное.","Shelve what is read often and changed rarely. And watch how often I find things there."] };

  Z[K+"Одновременный промах кладёт базу"]={
    p:[ bg(0)+key(46,44,1.5)+spark(30,26)+clock(88,40,1.3,0)+txt(88,70,"0",12,C.red),
        bg(1)+kid(12,82,.6,C.red,"wow")+kid(26,84,.6,C.grn,"wow")+kid(40,82,.6,C.yel,"wow")+txt(26,30,"×100",10,C.red)+arrowR(48,48,76)+arrowR(48,62,76)+db(96,58,.85)+spark(82,28,C.red)+spark(112,30,C.red),
        bg(2)+kid(14,82,.6,C.grn)+kid(30,84,.6,C.yel)+kid(56,82,.7,C.red)+lock(56,34,.9)+arrowR(66,58,82)+db(100,58,.75),
        bg(3)+key(28,22,.8)+clock(62,22,.8,2)+key(28,46,.8)+clock(62,46,.8,5)+key(28,68,.8)+clock(62,68,.8,9)+ok(98,46,1) ],
    l:[["популярный ключ протух","a hot key expired"],["сотня — разом в базу","a hundred hit the DB"],["идёт один, другие ждут","one goes, others wait"],["разные сроки — нет толпы","spread timers — no crowd"]],
    c:["Ключ протух — и сто запросов бегут в базу за одним и тем же. Пусть сходит один.","A key expires and a hundred requests run to the DB for the same thing. Let just one go."] };

  Z[RD+"Не только кэш"]={
    p:[ bg(0)+R(28,14,64,60,C.wood,3)+[0,1,2].map(i=>R(34,19+i*18,52,15,"#f3dcae",2)).join("")+txt(60,30,"\"a\"",9)+txt(60,48,"[1, 2, 3]",9)+txt(60,66,"{x, y}",9),
        bg(1)+R(48,48,24,26,C.yel,2)+R(24,58,24,16,C.grey,2)+R(72,64,24,10,C.wood,2)+txt(60,66,"1",11,"#fff")+txt(36,70,"2",10,"#fff")+kid(60,48,.55,C.red,"wow")+kid(36,58,.55,C.grn)+kid(84,64,.55,C.blue),
        bg(2)+card(30,30,36,22,"#fff",txt(0,5,"3/5",12))+R(84,20,26,54,C.wood,2)+`<circle cx="104" cy="50" r="2" fill="${C.ink}"/>`+kid(62,82,.75,C.grn),
        bg(3)+env(20,32,.6)+env(40,32,.6)+env(60,32,.6)+arrowR(74,32,96)+box(106,46,14,14)+lock(60,62,1.2) ],
    l:[["строки, списки, множества","strings, lists, sets"],["таблица лидеров","a leaderboard"],["лимит запросов","a rate limit"],["очереди и блокировки","queues and locks"]],
    c:["Я держу всё в памяти и умею ящики разной формы: счётчики, списки, очереди. Не только кэш.","I keep it all in memory, in drawers of many shapes: counters, lists, queues. Not just a cache."] };

  Z[RD+"Однопоточный — и это плюс"]={
    p:[ bg(0)+bot(96,82,.8)+R(70,60,46,14,C.wood,2)+box(80,60,10,9,"1")+kid(14,82,.6,C.grn)+kid(32,82,.6,C.yel)+kid(50,82,.6,C.red)+spark(64,24),
        bg(1)+card(60,30,82,22,"#fff",txt(0,4,"5 +1 +1 = 7",11))+kid(16,82,.65,C.grn)+kid(104,82,.65,C.yel)+ok(60,62,.9),
        bg(2)+box(24,74,22,14)+box(24,60,22,14)+box(24,46,22,14)+box(24,32,22,14)+txt(26,14,"KEYS *",8,C.red)+clock(56,30,.9,7)+bot(96,82,.8,{mood:"sad"})+R(70,60,46,14,C.wood,2) ],
    l:[["по одной — быстро","one at a time — fast"],["без драк и замков","no fights, no locks"],["одна тяжёлая — стоят все","one heavy job — all wait"]],
    c:["Я делаю команды по одной, поэтому без драк. Но одна огромная команда задержит всех.","I run commands one by one, so no fights. But one huge command makes everyone wait."] };

  Z[RD+"TTL — срок жизни ключа"]={
    p:[ bg(0)+key(40,40,1.6)+clock(88,38,1.4,8)+txt(60,70,"TTL = 60s",10,C.blue),
        bg(1)+fade(key(40,40,1.6,C.grey),.4)+spark(26,22,C.grey)+spark(58,58,C.grey)+clock(88,38,1.4,0)+txt(88,70,"0",12,C.red),
        bg(2)+[18,46,74,102].map(x=>clock(x,20,.8,0)).join("")+P("M18 32 L50 50 M46 32 L56 48 M74 32 L64 48 M102 32 L70 50",C.red,1.8)+db(60,66,.65)+spark(84,58,C.red)+spark(36,58,C.red) ],
    l:[["ключу дали срок","the key gets a timer"],["срок вышел — исчез сам","time's up — it's gone"],["у всех один срок — разом","same timer — all at once"]],
    c:["Я сам удаляю ключ, когда выходит срок. Дашь всем один срок — исчезнут разом и база охнет.","I delete a key myself when its time is up. Give all the same time and they vanish together."] };

  Z[RD+"Память кончается — что тогда"]={
    p:[ bg(0)+shelfFull()+box(102,40,16,16,"?",C.yel),
        bg(1)+shelfFull()+box(22,44,18,18,null,C.yel)+fade(box(102,30,14,14,null,C.grey),.8)+arrD(102,34,44)+bin(102,74)+ok(22,14,.7),
        bg(2)+shelfFull()+box(102,40,16,16,null,C.yel)+no(102,14,.7)+txt(102,62,"OOM",9,C.red) ],
    l:[["память полна","memory is full"],["выкинуть давно забытое","drop the long-unused"],["нет правила — отказ","no rule — writes refused"]],
    c:["Место кончилось: либо я выкидываю давно не нужное, либо отказываю в записи. Реши заранее.","Out of room: either I drop what's long unused, or I refuse writes. Decide in advance."] };

  Z[RD+"Распределённая блокировка и её опасность"]={
    p:[ bg(0)+bot(32,82,.75,{arms:"reach"})+key(58,62,.8)+R(80,44,32,30,C.red,4)+txt(96,63,"30s",10,"#fff")+clock(96,26,.85,6),
        bg(1)+bot(36,82,.75,{mood:"think"})+zz(54,30)+clock(94,40,1.2,0)+txt(94,68,"0s",11,C.red),
        bg(2)+bot(22,82,.7,{arms:"reach"})+kid(98,82,.8,C.grn,"wow")+box(60,76,26,22,"#42")+key(42,40,.7)+key(84,40,.7)+txt(60,34,"!",18,C.red),
        bg(3)+box(30,74,26,22,"#42")+ok(30,36,.9)+txt(60,60,"=",18,C.grn)+box(90,74,26,22,"#42")+ok(90,36,.9) ],
    l:[["взял ключ на 30 с","took the key for 30 s"],["завис — срок вышел","froze — time ran out"],["работают двое","now two are working"],["повтор не вредит","a repeat does no harm"]],
    c:["Ключ сам вернётся через срок. Завис я — войдёт второй. Поэтому повтор работы не должен вредить.","The key comes back by itself. If I freeze, a second one enters. So repeating must do no harm."] };

  Z[ES+"Зачем, если есть LIKE"]={
    p:[ bg(0)+book(60,64)+P("M60 30 Q74 14 92 22",C.grey,1.4,DASH)+clock(106,16,.7,3)+txt(60,84,"LIKE '%…%'",8,C.blue),
        bg(1)+card(32,36,30,18,"#fff",txt(0,4,"abd",10))+txt(60,40,"≠",16,C.red)+card(88,36,30,18,"#fff",txt(0,4,"abc",10))+no(60,64,.9),
        bg(2)+R(18,24,40,48,C.blue,3)+P("M24 24 v48",C.ink,1.2)+R(56,30,8,10,C.yel,1)+paper(88,44,["a · 5","b · 12","c · 88"])+spark(108,16) ],
    l:[["листаю всю книгу","leafing the whole book"],["опечатка — не нашёл","a typo — nothing found"],["указатель — сразу туда","the index — straight there"]],
    c:["LIKE листает всю книгу и не прощает опечаток. Поиск открывает указатель — и сразу на страницу.","LIKE leafs through the whole book and hates typos. Search opens the index and jumps there."] };

  Z[ES+"Инвертированный индекс"]={
    p:[ bg(0)+doc(22,42,"1",[0,1])+doc(60,42,"2",[2])+doc(98,42,"3",[0,2]),
        bg(1)+R(10,12,100,62,"#fff",4)+[[0,"1, 3"],[1,"1"],[2,"2, 3"]].map((r,i)=>shp(26,26+i*20,r[0],5)+txt(46,30+i*20,"→",11)+txt(80,30+i*20,r[1],11)).join(""),
        bg(2)+mag(28,40,1.4)+shp(28,40,0,5)+arrowR(48,40,62)+doc(78,40,"1",[0,1],20,26)+doc(102,40,"3",[0,2],20,26)+ok(90,68,.8) ],
    l:[["документы","the documents"],["слово → где встречается","word → where it appears"],["нашёл сразу","found at once"]],
    c:["Я записываю, где встречается каждое слово. Спросили слово — сразу знаю страницы.","I note where each word appears. Ask me a word and I know the pages at once."] };

  Z[ES+"text и keyword — разные типы"]={
    p:[ bg(0)+txt(60,16,"text",10,C.blue)+[34,60,86].map((x,i)=>card(x,38,18,18,"#fff",shp(0,0,i,5),i===1?0:(i?6:-6))).join("")+mag(46,62,.8)+shp(46,62,1,3.5)+ok(80,62,.8),
        bg(1)+txt(60,16,"keyword",10,C.blue)+card(60,38,58,18,"#fff",[0,1,2].map(k=>shp((k-1)*14,0,k,5)).join(""))+mag(30,64,.8)+[0,1,2].map(k=>shp(50+k*10,64,k,3.5)).join("")+ok(96,64,.8),
        bg(2)+txt(60,16,"keyword",10,C.blue)+card(60,38,58,18,"#fff",[0,1,2].map(k=>shp((k-1)*14,0,k,5)).join(""))+mag(38,64,.8)+shp(38,64,1,3.5)+no(78,64,.8) ],
    l:[["text: режу на слова","text: cut into words"],["keyword: целиком, точно","keyword: whole, exact"],["не тот тип — не нашёл","wrong type — not found"]],
    c:["text я режу на слова и ищу по ним. keyword храню целиком — только точное совпадение.","I cut text into words and search them. keyword stays whole: only an exact match."] };

  Z[ES+"Почти реальное время"]={
    p:[ bg(0)+bot(28,82,.75,{arms:"reach"})+card(56,58,14,18,"#fff",P("M-4 -4 h8 M-4 0 h8 M-4 4 h6",C.grey,1.2))+arrowR(66,58,74)+box(94,74,32,32,null,C.blue)+mag(94,58,.7)+txt(94,24,"t = 0",9),
        bg(1)+mag(30,40,1.4)+arrowR(48,44,72)+box(94,74,32,32,null,C.blue)+no(94,24,.9)+txt(30,72,"t = 0.1s",9),
        bg(2)+mag(30,40,1.4)+arrowR(48,44,72)+box(94,74,32,32,null,C.blue)+card(94,56,14,18,"#fff",P("M-4 -4 h8 M-4 0 h8 M-4 4 h6",C.grey,1.2))+ok(94,24,.9)+txt(30,72,"t = 1s",9) ],
    l:[["записал","wrote it"],["ищу сразу — пусто","search now — empty"],["через секунду — есть","a second later — there"]],
    c:["Записал — найдут через секунду: указатель обновляется порциями. «Прямо сейчас» не обещаю.","Write now, find it a second later: I refresh the index in batches. Don't count on \"right now\"."] };

  Z[ES+"Не источник правды"]={
    p:[ bg(0)+db(28,58,.9)+spark(28,22)+arrowR(46,44,72)+card(92,44,28,34,"#fff",mag(0,-2,.8)),
        bg(1)+db(28,58,.9)+txt(60,32,"↻",16,C.grn)+arrowR(46,44,72,C.grn)+card(92,44,28,34,"#fff",mag(0,-2,.8))+ok(108,18,.8),
        bg(2)+fade(db(28,58,.9),.25)+no(28,30,.9)+card(78,40,28,34,"#fff",mag(0,-2,.8))+P("M66 28 l8 8 l-4 6 l10 8",C.red,2)+bot(104,82,.55,{mood:"sad"}) ],
    l:[["правда в базе, тут копия","truth in the DB, copy here"],["индекс пропал — пересобрал","index lost — rebuilt"],["одна копия — всё пропало","only copy — all lost"]],
    c:["Правда живёт в базе, у меня только копия. Потеряли меня — пересоберут. Потеряли базу — беда.","The truth lives in the DB; I hold a copy. Lose me and I'm rebuilt. Lose the DB and it's gone."] };

  Z[A+"Монолит — не ругательство"]={
    p:[ bg(0)+house(44,74,1.3)+db(98,58,.8)+P("M66 60 H82",C.ink,1.6),
        bg(1)+house(60,74,1.6,true)+gear(52,52,.5)+gear(67,52,.5,C.yel)+txt(60,32,"1 ns",8,"#fff")+spark(100,22),
        bg(2)+house(60,74,1.1)+kid(18,82,.65,C.grn)+kid(32,84,.65,C.yel)+kid(88,84,.65,C.blue)+kid(104,82,.65,C.red) ],
    l:[["один дом, одна база","one house, one DB"],["вызов метода — мгновенно","a method call — instant"],["маленькой команде удобно","great for a small team"]],
    c:["Один дом, одна база, вызов метода вместо сети. Для команды до десяти человек — самое удобное.","One house, one DB, a method call instead of the network. For a team under ten, the easiest."] };

  Z[A+"Микросервисы решают проблему ЛЮДЕЙ"]={
    p:[ bg(0)+stove(60,74)+kid(16,82,.6,C.red,"sad")+kid(30,84,.6,C.grn,"sad")+kid(90,84,.6,C.yel,"sad")+kid(104,82,.6,C.blue,"sad")+txt(60,22,"!",16,C.red),
        bg(1)+house(18,74,.8)+house(58,74,.8)+house(98,74,.8)+kid(32,82,.5,C.red)+kid(72,82,.5,C.grn)+kid(112,82,.5,C.yel),
        bg(2)+box(22,74,24,20,"v3",C.blue)+box(60,74,24,20,"v7",C.grn)+box(98,74,24,20,"v2",C.red)+clock(22,34,.9,2)+clock(60,34,.9,6)+clock(98,34,.9,10) ],
    l:[["всем тесно на одной кухне","one kitchen is too crowded"],["у каждой команды своя","each team has its own"],["свой темп выкатки","each ships at its own pace"]],
    c:["Сервисы делят не ради моды: двадцати поварам тесно на одной кухне. Своя кухня — свой темп.","Services aren't split for fashion: twenty cooks crowd one kitchen. Own kitchen, own pace."] };

  Z[A+"Чем платят за разделение"]={
    p:[ bg(0)+house(60,74,1.6,true)+gear(52,52,.5)+gear(67,52,.5,C.yel)+ok(102,20,.8),
        bg(1)+house(18,74,.8)+house(102,74,.8)+P("M30 68 H90",C.grey,3,'stroke-dasharray="5 4"')+env(52,36,.75)+no(66,26,.6)+clock(60,56,.7,8),
        bg(2)+db(30,58,.8)+db(90,58,.8)+P("M24 34 Q60 8 96 34",C.ink,1.8,DASH)+no(60,40,.9),
        bg(3)+server(22,44,.7)+server(60,44,.7)+server(98,44,.7)+P("M22 66 Q41 80 60 66 Q79 80 98 66",C.blue,1.8,DASH)+mag(100,14,.7) ],
    l:[["был вызов метода","it was a method call"],["стал запрос по сети","now a network call"],["общей транзакции нет","no shared transaction"],["ищем по трейсам","debugging by traces"]],
    c:["Разделил — и вызов стал письмом: потеряется или опоздает. Сложность переехала, а не исчезла.","Split it and a call becomes a letter: lost or late. The complexity moved, it didn't vanish."] };

  Z[A+"Где резать"]={
    p:[ bg(0)+slice(14,24)+slice(46,24)+slice(78,24)+coin(26,24,1.1)+box(58,30,14,12)+env(90,24,.55),
        bg(1)+slice(16,80,-16)+`<g>${R(16,60,80,14,"#e8b77a",1)+R(16,53,80,7,"#fff",1)}</g>`+no(108,22,.8),
        bg(2)+R(16,30,80,10,"#e8b77a",1)+R(16,26,80,5,"#f6a5c0",1)+R(16,60,80,14,"#e8b77a",1)+R(16,53,80,7,"#fff",1)+P("M56 18 V80",C.red,2.4)+txt(106,40,"!",16,C.red)+txt(106,70,"!",16,C.red) ],
    l:[["кусками: заказы, платежи","slices: orders, payments"],["слоями — катастрофа","by layers — a disaster"],["правка трогает оба","one edit touches both"]],
    c:["Режь как торт — кусками по делу: заказы, платежи. Не слоями, иначе любая правка трогает всех.","Cut it like a cake, by business: orders, payments. Not by layers, or every edit touches all."] };

  Z[N+"Что происходит, когда ты открываешь сайт"]={
    p:[ bg(0)+R(14,26,34,44,C.red,3)+P("M20 26 v44",C.ink,1.2)+txt(31,52,"DNS",8,"#fff")+txt(84,34,"a.kz",11)+arrD(84,40,54)+txt(84,66,"10.0.0.7",10,C.blue),
        bg(1)+laptop(22,72,.8)+server(98,48,.7)+arrowR(40,28,84)+arrL(84,42,40)+arrowR(40,56,84)+txt(60,22,"1",7,C.grey)+txt(60,38,"2",7,C.grey)+txt(60,52,"3",7,C.grey),
        bg(2)+laptop(22,72,.8)+server(98,48,.7)+P("M40 44 H48 M72 44 H84",C.ink,1.6,DASH)+lock(60,42,1.3)+txt(60,72,"TLS",9,C.blue),
        bg(3)+laptop(22,72,.8)+server(98,48,.7)+env(60,28,.7)+arrowR(40,44,84)+txt(60,60,"GET /",10,C.blue),
        bg(4)+laptop(22,72,.8)+server(98,48,.7)+card(60,26,28,16,"#fff",txt(0,4,"200",10,C.grn))+arrL(84,44,40,C.grn)+txt(60,60,"0101…",9,C.grey) ],
    l:[["DNS: имя → адрес","DNS: name → address"],["три пакета: связь есть","three packets: connected"],["договорились о шифре","agreed on a cipher"],["наконец сам запрос","finally, the request"],["в ответ — байты","bytes come back"]],
    c:["Узнать адрес, дозвониться, договориться о шифре — и только потом спросить. Первые шаги долгие.","Find the address, connect, agree on a cipher, then finally ask. The first steps take longest."] };

  Z[N+"Клиент и сервер — просто роли"]={
    p:[ bg(0)+laptop(22,72,.8)+arrowR(40,46,80)+server(98,48,.7)+txt(98,18,"…",12,C.grey),
        bg(1)+laptop(18,72,.7)+arrowR(34,46,46)+server(60,48,.7)+arrowR(74,46,86,C.blue)+db(102,56,.65)+`<circle cx="60" cy="48" r="20" fill="none" stroke="${C.blue}" stroke-width="1.6" stroke-dasharray="3 3"/>`,
        bg(2)+kid(18,82,.8,C.red)+bot(60,82,.8,{arms:"hold"})+R(50,56,20,4,C.grey,1)+stove(100,74)+arrowR(28,38,44)+arrowR(74,38,90) ],
    l:[["сервер ждёт, клиент шлёт","server waits, client asks"],["а к базе он — клиент","to the DB it's a client"],["роль — смотря откуда","the role depends on side"]],
    c:["Сервер ждёт запросы, клиент их шлёт. Мой сервис — сервер для тебя и клиент для базы.","A server waits, a client asks. My service is a server to you and a client to the DB."] };

  Z[N+"HTTP: запрос, ответ и код"]={
    p:[ bg(0)+card(34,42,44,46,"#fff",txt(0,-11,"GET",11,C.blue)+txt(0,3,"/orders",8)+txt(0,16,"h: …",8,C.grey))+arrowR(60,42,80)+server(100,48,.7),
        bg(1)+server(22,48,.7)+arrowR(38,42,56)+card(86,42,40,42,"#fff",txt(0,-6,"200",13,C.grn)+txt(0,12,"{ … }",9))+ok(86,80,.7),
        bg(2)+O(30,22,12,"#fff")+txt(30,26,"404",8,C.ant)+kid(30,82,.7,C.blue,"sad")+O(90,22,12,"#fff")+txt(90,26,"500",8,C.red)+server(86,60,.6,false)+fire(104,74,.7) ],
    l:[["метод, путь, заголовки","method, path, headers"],["ответ: код и тело","reply: code and body"],["4xx — ты, 5xx — сервер","4xx you, 5xx the server"]],
    c:["Ты шлёшь метод и путь, я отвечаю кодом. 4xx — ошибся ты, 5xx — сломался я.","You send a method and a path, I answer with a code. 4xx: your mistake. 5xx: I broke."] };

  Z[N+"REST — договорённость, а не технология"]={
    p:[ bg(0)+tag(60,22,68,"/orders/42",C.yel)+box(60,74,40,32,"42"),
        bg(1)+mag(26,36,1.1)+txt(26,62,"GET ×3",9,C.blue)+arrowR(44,44,62)+box(86,74,34,30,"42")+ok(86,26,.8),
        bg(2)+card(28,26,40,16,"#fff",txt(0,4,"PUT 5",9,C.blue))+card(28,50,40,16,"#fff",txt(0,4,"PUT 5",9,C.blue))+arrowR(52,38,68)+box(90,74,30,30,"5")+ok(90,24,.8) ],
    l:[["адрес — это вещь","an address is a thing"],["GET ничего не меняет","GET changes nothing"],["PUT дважды — то же","PUT twice — same result"]],
    c:["Адрес — это вещь, метод — действие. GET ничего не меняет, PUT можно повторить без вреда.","An address is a thing, a method is an action. GET changes nothing; PUT is safe to repeat."] };

  Z[N+"Сеть — самое медленное и самое ненадёжное"]={
    p:[ bg(0)+bot(36,82,.7)+kid(84,82,.8,C.grn)+bubble(60,22,30,txt(0,4,"1 ns",9))+spark(100,20),
        bg(1)+laptop(16,74,.6)+P("M28 62 C44 20 60 90 76 40 S96 30 98 40",C.grey,2.4,'stroke-dasharray="5 4"')+server(106,54,.5)+clock(52,22,.8,9)+txt(60,84,"×1 000 000",8,C.red),
        bg(2)+env(22,22,.6)+no(42,22,.6)+env(22,46,.6)+txt(44,50,"×2",11,C.red)+env(22,68,.6)+clock(44,68,.6,9)+bot(90,82,.7,{mood:"think"}) ],
    l:[["соседу — мгновенно","to a neighbour — instant"],["по сети — в миллион раз","network — a million times"],["потеря, дубль, опоздание","lost, doubled, late"]],
    c:["Сказать соседу — мгновенно. Сеть в миллионы раз дольше и может потерять или задвоить письмо.","Next door is instant. The network is a million times slower and may lose or double a message."] };

  Z[API+"Коды ответов — это контракт"]={
    p:[ bg(0)+card(28,36,32,20,"#fff",txt(0,4,"400",11,C.ant))+arrowR(48,36,66)+kid(88,82,.8,C.blue,"think")+card(104,48,14,18,"#fff",P("M-4 -4 h8 M-4 0 h8",C.grey,1.2)+P("M-5 5 l8 -6",C.red,1.6)),
        bg(1)+card(26,36,32,20,"#fff",txt(0,4,"500",11,C.red))+siren(70,44,true)+P("M98 28 a10 10 0 1 1 -8 -4",C.blue,2)+head(91,24,-150,C.blue)+txt(96,62,"↻",11,C.blue),
        bg(2)+card(36,42,48,34,"#fff",txt(0,-4,"200",12,C.grn)+txt(0,10,"{error}",8,C.red))+siren(96,30,false)+bot(96,84,.5,{mood:"think"}) ],
    l:[["4xx: чини запрос","4xx: fix your request"],["5xx: тревога и повтор","5xx: alarm and retry"],["200 с ошибкой — тишина","200 with error — silence"]],
    c:["По кодам настроены тревоги и повторы. Ответишь 200 с ошибкой внутри — автоматика не заметит.","Alarms and retries watch the codes. Send 200 with an error inside and automation won't notice."] };

  Z[API+"Идемпотентность методов"]={
    p:[ bg(0)+R(12,32,36,20,C.grn,8)+txt(30,46,"POST",9,"#fff")+txt(30,68,"×2",12,C.red)+arrowR(52,42,68)+coin(84,36,1.1)+coin(100,48,1.1)+no(92,72,.7),
        bg(1)+R(12,26,36,20,C.grn,8)+txt(30,40,"POST",9,"#fff")+key(24,60,.6)+txt(42,62,"7f",8)+arrowR(52,42,68)+coin(86,40,1.2)+ok(86,68,.8),
        bg(2)+R(12,26,36,20,C.grn,8)+txt(30,40,"POST",9,"#fff")+key(24,60,.6)+txt(42,62,"7f",8)+arrowR(52,42,68)+card(88,40,24,30,"#fff",txt(0,-4,"7f",8)+P("M-6 4 h12 M-6 9 h8",C.grey,1.2))+txt(88,72,"=",14,C.grn) ],
    l:[["без ключа — дважды","no key — charged twice"],["с ключом — списал раз","with a key — charged once"],["повтор — прежний ответ","repeat — same old answer"]],
    c:["Нажал «оплатить» дважды? С тем же ключом второй запрос получит прежний ответ, денег не спишут.","Pressed pay twice? With the same key, the second request gets the old answer, no new charge."] };

  const ctr=(rows)=>card(34,42,36,46,"#fff",txt(0,-15,"{ }",8,C.grey)+rows.map((r,i)=>txt(0,-4+i*10,r[0],10,r[1]||C.ink)).join(""));
  Z[API+"Версионирование: ломать нельзя"]={
    p:[ bg(0)+ctr([["a"],["b"]])+arrowR(56,42,72)+phone(92,46,1.1,ok(0,0,.6)),
        bg(1)+ctr([["a"],["b"],["c",C.grn]])+arrowR(56,42,72)+phone(92,46,1.1,ok(0,0,.6)),
        bg(2)+ctr([["a"],["b",C.red]])+P("M27 45 H41",C.red,2)+arrowR(56,42,72)+phone(92,46,1.1,no(0,0,.6)),
        bg(3)+tag(30,24,32,"/v1",C.yel)+tag(90,24,32,"/v2",C.yel)+phone(30,60,.8,ok(0,0,.55))+phone(90,60,.8,ok(0,0,.55)) ],
    l:[["контракт v1","contract v1"],["добавил поле — норм","added a field — fine"],["убрал поле — сломал","removed a field — broken"],["ломаешь — это v2","breaking? make it v2"]],
    c:["Добавлять поле можно. Удалять и переименовывать нельзя: старые клиенты сломаются. Для этого v2.","Adding a field is fine. Removing or renaming breaks old clients. That's what v2 is for."] };

  const pile=(x,n)=>Array.from({length:n},(_,i)=>R(x,68-i*6,36,5,"#fff",1)).join("");
  const lst=(x,a,bad)=>a.map((v,i)=>card(x,24+i*20,26,16,v===bad?"#fde4ec":"#fff",txt(0,4,String(v),9,v===bad?C.red:C.ink))).join("");
  Z[API+"Пагинация: не отдавай всё"]={
    p:[ bg(0)+pile(12,10)+txt(30,10,"GET",7,C.blue)+db(70,58,.7)+spark(70,30,C.red)+phone(102,52,.8,no(0,0,.55)),
        bg(1)+tag(60,16,62,"limit=20",C.yel,C.ink,8)+pile(20,3)+txt(38,44,"20",11,C.grn)+phone(92,54,.8,ok(0,0,.55)),
        bg(2)+txt(28,12,"p1",7,C.grey)+txt(92,12,"p2",7,C.grey)+lst(28,[1,2,3])+lst(92,[3,4,5],3)+txt(60,40,"+1",11,C.grn)+arrowR(48,48,74),
        bg(3)+tag(60,14,62,"after=42",C.yel,C.ink,8)+[43,44,45].map((v,i)=>card(48,34+i*16,30,13,"#fff",txt(0,4,String(v),9))).join("")+ok(96,50,.9) ],
    l:[["всё разом — всем плохо","all at once — hurts all"],["по 20 штук","20 at a time"],["смещение съезжает","an offset slips"],["курсор держится","a cursor holds steady"]],
    c:["Не отдавай миллион строк разом — отдавай по 20. Курсор «после 42» не съедет от новых строк.","Don't return a million rows; return 20 at a time. A cursor \"after 42\" won't slip on inserts."] };

  Z[API+"Валидация на границе"]={
    p:[ bg(0)+card(30,36,38,18,"#fff",txt(0,4,"x = -5",9))+no(30,60,.8)+R(58,18,6,56,C.red,2)+P("M58 30 h6 M58 46 h6 M58 62 h6","#fff",2)+bot(92,82,.75,{glasses:true}),
        bg(1)+card(30,30,34,16,"#fff",txt(0,4,"x = 5",9))+ok(30,52,.8)+R(58,18,6,56,C.grn,2)+bot(92,82,.75,{mood:"smile"})+gear(92,20,.5),
        bg(2)+card(38,42,48,56,"#fff",["a","b","c"].map((s,i)=>txt(-10,-12+i*14,s,10)+no(10,-15+i*14,.5)).join(""))+bot(94,82,.7,{arms:"up"}) ],
    l:[["проверка на входе","checked at the door"],["внутри — уже доверяю","inside — I trust it"],["все ошибки списком","all errors in one list"]],
    c:["Проверяю всё на входе, а внутри уже доверяю. Ошибки отдаю списком, а не по одной.","I check everything at the door and trust it inside. I return all errors as one list."] };

  Z[API+"CORS — правило браузера, не защита"]={
    p:[ bg(0)+laptop(24,72,.9,txt(0,-11,"a.kz",6))+server(98,48,.7)+tag(98,14,30,"b.kz","#fff",C.ink,7)+arrowR(44,30,84)+arrL(84,46,62,C.red)+no(52,46,.7),
        bg(1)+laptop(24,72,.9,txt(0,-11,"a.kz",6))+server(98,48,.7)+tag(98,14,36,"a.kz ✓","#e7f6e8",C.grn,7)+arrowR(44,30,84)+arrL(84,46,44,C.grn),
        bg(2)+R(8,30,42,28,C.ink,3)+txt(29,48,"$ curl",8,C.grn)+arrowR(52,44,84)+server(98,48,.7)+ok(68,26,.7),
        bg(3)+txt(26,56,"*",34,C.red)+txt(50,48,"+",14)+lock(74,42,1.4)+no(104,62,.8) ],
    l:[["браузер не дал прочитать","the browser blocks it"],["сервер разрешил — можно","server allowed — OK"],["curl ходит свободно","curl walks right in"],["* с логином — нельзя","* with auth — never"]],
    c:["CORS — правило браузера, оно бережёт пользователя. curl ходит к тебе свободно, защищай API сам.","CORS is a browser rule that protects the user. curl walks right in, so guard your API yourself."] };

  Z[API+"Ограничение частоты запросов"]={
    p:[ bg(0)+R(40,10,30,7,C.grey,2)+R(64,10,6,14,C.grey,2)+coin(67,32,.8)+P("M67 42 v4",C.yel,2)+bucket(56,74,2)+clock(98,34,.9,3),
        bg(1)+bucket(40,74,3)+coin(66,34,.9)+curve(44,46,64,34,C.ink,true)+kid(96,82,.75,C.grn)+ok(96,22,.7),
        bg(2)+bucket(32,74,0)+card(88,24,38,18,"#fff",txt(0,5,"429",12,C.red))+txt(88,44,"Retry-After",7,C.grey)+kid(88,82,.6,C.blue,"sad"),
        bg(3)+bucket(60,40,3,.8)+[18,46,74,102].map(x=>P(`M${x} 58 L60 42`,C.grey,1.2)+server(x,68,.4)).join("")+ok(104,20,.7) ],
    l:[["ведро копит жетоны","the bucket fills tokens"],["запрос берёт жетон","a request takes a token"],["пусто — 429, позже","empty — 429, later"],["одно ведро на все поды","one bucket for all pods"]],
    c:["Ведро ровно копит жетоны. Нет жетона — 429 и «приходи позже». Ведро одно на все поды.","The bucket fills tokens at a steady rate. No token: 429, come later. One bucket for all pods."] };

  Z[FT+"В распределённой системе всегда что-то сломано"]={
    p:[ bg(0)+[0,1,2,3,4,5,6,7,8,9].map(i=>server(20+(i%5)*20,30+Math.floor(i/5)*30,.38,i===6?false:undefined)).join("")+spark(48,44,C.red),
        bg(1)+txt(60,34,"0.999¹⁰",15)+txt(60,58,"≈ 99%",15,C.red),
        bg(2)+R(6,58,108,12,C.grey,2)+R(54,52,10,22,C.red,2)+P("M54 58 h10 M54 66 h10","#fff",2)+P("M26 62 Q60 14 94 62",C.grn,2.2,DASH)+head(94,62,62,C.grn)+ok(104,24,.8) ],
    l:[["из десяти один лежит","one of ten is down"],["всё живо лишь в 99%","all up only 99% of time"],["план на этот случай","a plan for that case"]],
    c:["Из десяти сервисов что-то да сломано. Мне важно не удивиться, а знать, что делать тогда.","With ten services, something is always broken. What matters is knowing what to do then."] };

  Z[FT+"Вызов без таймаута — бомба"]={
    p:[ bg(0)+bot(24,82,.75,{arms:"reach"})+P("M44 58 H82",C.ink,1.6,DASH)+server(98,48,.7,false)+zz(104,18)+clock(62,32,.8,9)+txt(62,50,"∞",12),
        bg(1)+pool(10,40,[C.red,C.red,C.red,C.red,C.red])+txt(38,66,"0 / 5",9,C.red)+bot(92,82,.75,{mood:"sad"})+spark(110,22,C.red),
        bg(2)+bot(24,82,.75)+P("M42 58 H58",C.ink,1.8)+P("M68 58 H84",C.grey,1.6,DASH)+server(100,48,.6,false)+clock(62,30,.8,2)+txt(62,48,"2s",9,C.blue)+ok(40,20,.7) ],
    l:[["сосед завис, я жду","neighbour hung, I wait"],["потоки кончились — упал я","threads gone — I'm down"],["таймаут — и дальше","a timeout — move on"]],
    c:["Без таймаута я жду зависшего соседа вечно и падаю сам. Таймаут нужен на каждом вызове.","Without a timeout I wait for a hung neighbour forever and fall myself. Time out every call."] };

  Z[FT+"Ретраи чинят и убивают"]={
    p:[ bg(0)+env(22,46,.65)+no(22,28,.6)+txt(42,50,"↻",12,C.blue)+env(60,46,.65)+arrowR(72,46,86)+server(102,50,.6)+ok(102,20,.7),
        bg(1)+kid(12,82,.55,C.red)+kid(26,84,.55,C.grn)+kid(40,82,.55,C.yel)+arrowR(46,40,80)+arrowR(46,50,80)+arrowR(46,60,80)+txt(62,30,"×3",10,C.red)+server(98,54,.65,false)+fire(98,38,.7),
        bg(2)+txt(32,28,"GET",10,C.blue)+ok(62,24,.8)+txt(32,50,"POST",10,C.blue)+no(62,46,.8)+txt(32,72,"↻ ≤ 3",10)+bot(98,82,.6,{glasses:true}) ],
    l:[["разовый сбой — повторил","one-off blip — retried"],["все повторяют — добили","all retry — it's dead"],["только безопасно и ≤ 3","only safe ones, ≤ 3"]],
    c:["Повтор спасает от случайной ошибки. Но если все разом повторяют — добьют упавшего соседа.","A retry fixes a random blip. But if everyone retries at once, they finish off the neighbour."] };

  Z[FT+"Экспоненциальная задержка и разброс"]={
    p:[ bg(0)+[[8,"100"],[16,"200"],[32,"400"],[64,"800"]].map((r,i)=>`<rect x="12" y="${16+i*15}" width="${r[0]}" height="9" rx="3" fill="${C.blue}"/>`+txt(16+r[0]+16,24+i*15,r[1],9)).join("")+clock(102,20,.7,4),
        bg(1)+P("M10 70 H112",C.ink,1.4)+[16,28,40,52,76,88,100].map(x=>`<rect x="${x}" y="66" width="8" height="4" fill="${C.grey}"/>`).join("")+`<rect x="62" y="22" width="10" height="48" rx="2" fill="${C.red}"/>`+txt(67,16,"1000",8,C.red)+server(100,40,.4,false),
        bg(2)+P("M10 70 H112",C.ink,1.4)+[12,16,10,14,18,12,15,11,16,13].map((h,i)=>`<rect x="${14+i*9.6}" y="${70-h}" width="7" height="${h}" rx="1.5" fill="${C.grn}"/>`).join("")+ok(60,30,.9) ],
    l:[["пауза растёт вдвое","the pause doubles"],["без разброса — волна","no jitter — one big wave"],["с разбросом — ровно","with jitter — smooth"]],
    c:["Жду всё дольше: 100, 200, 400 мс. И добавляю случайность, чтобы все не постучали разом.","I wait longer each time: 100, 200, 400 ms. Plus randomness, so not everyone knocks at once."] };

  Z[FT+"Circuit breaker: перестань стучаться"]={
    p:[ bg(0)+bot(16,82,.55)+arrowR(28,44,46)+sw(56,44,true,1.2)+arrowR(66,44,86)+server(102,50,.55,false)+txt(56,18,"3/5",10,C.red),
        bg(1)+bot(16,82,.55,{mood:"wow"})+arrowR(28,38,46)+arrL(46,52,28,C.red)+sw(56,44,false,1.2)+fade(server(102,50,.55,false),.5)+txt(56,18,"5/5",10,C.red),
        bg(2)+bot(16,82,.55,{mood:"think"})+sw(56,44,false,1.2)+P("M66 44 H86",C.ink,1.6,DASH)+server(102,50,.55,false)+clock(56,18,.7,3)+txt(76,36,"1",8,C.grey),
        bg(3)+bot(16,82,.55)+arrowR(28,44,46)+sw(56,44,true,1.2)+arrowR(66,44,86)+server(102,50,.55)+ok(56,18,.7) ],
    l:[["считаю ошибки","counting errors"],["порог — разомкнул","threshold — circuit open"],["пауза — одна проба","pause — one probe"],["прошла — замкнул","it passed — closed again"]],
    c:["Много ошибок — я размыкаюсь и сразу отвечаю отказом, не трачу потоки. Через паузу пробую раз.","Too many errors: I open and refuse at once, saving threads. After a pause I try once."] };

  Z[FT+"Bulkhead: не дай одному соседу утопить всё"]={
    p:[ bg(0)+pool(8,36,[C.red,C.red,C.red,C.red,C.red])+arrowR(64,36,84)+server(100,40,.55,false)+zz(106,14)+fade(db(36,72,.45),.6)+no(60,66,.6),
        bg(1)+F("M8 38 H112 L98 66 H22 Z","#fff")+`<path d="M44 52 H76 V66 H44 Z" fill="${C.blue}" opacity=".7"/>`+P("M44 38 V66 M76 38 V66",C.ink,2)+R(56,22,4,16,C.wood,1)+P("M4 72 q8 -4 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0",C.blue,1.6),
        bg(2)+pool(8,26,[C.red,C.red,C.red])+arrowR(50,26,76)+server(92,28,.45,false)+pool(8,58,[C.grn,C.grn,C.grn])+arrowR(50,58,76)+server(92,60,.45)+ok(110,60,.55) ],
    l:[["общий пул — тонут все","one pool — all sink"],["переборки в корабле","a ship's bulkheads"],["свой пул — тонет один","own pool — only one sinks"]],
    c:["Каждому соседу — свой отсек потоков. Завис один — утонет только его отсек, а не всё.","Each neighbour gets its own thread compartment. One hangs — only its compartment sinks."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 6 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* свои детали */
  const tk=(x,y,lab,col,w,fs)=>card(x,y,w||28,14,col||"#fff",txt(0,3.3,lab,fs||7.5));
  const arrowL=(x1,y,x2,col)=>`<path d="M${x1} ${y} H${x2+4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x2+6} ${y-4} L${x2} ${y} L${x2+6} ${y+4}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arrowD=(x,y1,y2,col)=>`<path d="M${x} ${y1} V${y2-3}" stroke="${col||C.ink}" stroke-width="1.6" stroke-linecap="round"/><path d="M${x-3} ${y2-5} L${x} ${y2} L${x+3} ${y2-5}" fill="none" stroke="${col||C.ink}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const door=(x,y,open)=>`<g transform="translate(${x} ${y})"><rect x="-11" y="-36" width="22" height="36" rx="1.5" fill="${open?"#3b4256":C.wood2}"/>${open?`<path d="M-9 -34 L-1 -31 V-3 L-9 0 Z" fill="${C.wood}" stroke="${C.wood2}"/>`:`<rect x="-9" y="-34" width="18" height="34" fill="${C.wood}" stroke="${C.wood2}"/><circle cx="5" cy="-16" r="1.5" fill="${C.ink}"/>`}</g>`;
  const ctr=(x,y,w,h,col,lab,op)=>{ const n=Math.max(2,Math.floor(w/7)); let r=""; for(let i=1;i<n;i++) r+=`<path d="M${-w/2+i*w/n} ${-h+2} v${h-4}" stroke="#fff" stroke-width=".9" opacity=".45"/>`;
    return `<g transform="translate(${x} ${y})" opacity="${op||1}"><rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" rx="2" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>${r}${lab!=null?txt(0,-h/2+3.5,lab,9,"#fff"):""}</g>`; };
  const lay=(x,y,w,h,col,lab,dash)=>`<rect x="${x-w/2}" y="${y}" width="${w}" height="${h}" rx="2" fill="${col}" stroke="${C.ink}" stroke-width="1.1" ${dash?'stroke-dasharray="3 2"':""}/>${lab?txt(x,y+h/2+3,lab,7.5,"#fff"):""}`;
  const star=(x,y,r,col)=>{ let d=""; for(let i=0;i<10;i++){ const a=Math.PI/5*i-Math.PI/2, rr=i%2?r*.45:r; d+=(i?"L":"M")+(x+rr*Math.cos(a)).toFixed(1)+" "+(y+rr*Math.sin(a)).toFixed(1); } return `<path d="${d}Z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width=".7"/>`; };
  const moon=(x,y)=>`<path d="M${x} ${y-8} a8 8 0 1 0 8 10 a6.5 6.5 0 0 1 -8 -10 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/>`;
  const zz=(x,y)=>txt(x,y,"z",7,C.bot2)+txt(x+6,y-6,"z",9,C.bot2)+txt(x+13,y-13,"z",11,C.bot2);
  const loopA=(x,y,r,col)=>`<path d="M${x+r} ${y} A${r} ${r} 0 1 1 ${x} ${y-r}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x-3} ${y-r-3.5} L${x+1.5} ${y-r} L${x-3} ${y-r+3.5}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const pass=(x,y,col,rot)=>card(x,y,20,14,col||"#fff",`<circle cx="-5" cy="0" r="3" fill="${C.bot}"/><path d="M0 -2.5 h6 M0 2 h5" stroke="${C.ink}" stroke-width="1.2" stroke-linecap="round"/>`,rot);
  const bar=(x,y,w,h,col)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" rx="1.5" fill="${col}" stroke="${C.ink}" stroke-width="1"/>`;
  const salt=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-6" y="-12" width="12" height="16" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><path d="M-6 -11 q6 -7 12 0" fill="${C.grey}" stroke="${C.ink}"/>${[[-2,8],[1.5,11],[3,7],[-1,14],[2,16]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="1" fill="${C.grey}"/>`).join("")}</g>`;
  const zone=(x1,y1,x2,y2,col)=>`<rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="7" fill="${col||"#fff"}" fill-opacity=".55" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="4 2.5"/>`;
  const dc=(x,y,col,lab)=>`<g transform="translate(${x} ${y})"><rect x="-10" y="-28" width="20" height="28" rx="1.5" fill="${col||C.grey}" stroke="${C.ink}" stroke-width="1.2"/>${[-22,-15,-8].map(d=>`<rect x="-6" y="${d}" width="4" height="4" fill="#fff" opacity=".8"/><rect x="2" y="${d}" width="4" height="4" fill="#fff" opacity=".8"/>`).join("")}${lab?txt(0,-31,lab,8):""}</g>`;
  const bucket=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-14 -12 L-10 14 H10 L14 -12 Z" fill="${col||C.ant}" stroke="${C.ink}" stroke-width="1.3"/><ellipse cx="0" cy="-12" rx="14" ry="4" fill="#ffd2c4" stroke="${C.ink}" stroke-width="1.3"/></g>`;
  const chain=(x1,y1,x2,y2,w)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.ink}" stroke-width="${(w||2)+1.6}" stroke-linecap="round"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke="${C.grey}" stroke-width="${w||2}" stroke-dasharray="4 2" />`;
  const cal=(x,y,lab)=>`<g transform="translate(${x} ${y})"><rect x="-13" y="-13" width="26" height="26" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="-13" y="-13" width="26" height="8" rx="3" fill="${C.red}"/>${txt(0,8,lab,10)}</g>`;
  const pencil=(x,y)=>`<g transform="translate(${x} ${y}) rotate(45)"><rect x="-2.5" y="-14" width="5" height="18" fill="${C.yel}" stroke="${C.ink}" stroke-width="1"/><path d="M-2.5 4 L0 9 L2.5 4 Z" fill="${C.wood}" stroke="${C.ink}" stroke-width="1"/></g>`;
  const mpod=(x,y,col,op)=>`<g opacity="${op||1}"><rect x="${x-9}" y="${y-9}" width="18" height="18" rx="5" fill="${col||C.bot}" stroke="${C.ink}" stroke-width="1.1"/><rect x="${x-4.5}" y="${y-4.5}" width="9" height="9" rx="1.5" fill="#fff" opacity=".75"/></g>`;
  const podBox=(x1,y1,x2,y2)=>`<rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="8" fill="${C.face}" stroke="${C.bot2}" stroke-width="1.8" stroke-dasharray="5 3"/>`;
  const web=(x,y)=>`<g transform="translate(${x} ${y})" stroke="${C.ink}" stroke-opacity=".55" stroke-width="1" fill="none"><path d="M0 0 L14 0 M0 0 L0 14 M0 0 L11 11"/><path d="M5 0 Q5 5 0 5 M10 0 Q10 10 0 10"/></g>`;
  const yml=(x,y,a,b)=>card(x,y,42,30,"#fff",txt(0,-3,a,7.5,C.ink,700)+txt(0,8,b,9,C.ink,800));
  const line=(x1,y1,x2,y2,col,dash)=>`<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${col||C.ink}" stroke-width="1.6" ${dash?'stroke-dasharray="3 2.5"':""} stroke-linecap="round"/>`;

  const Z={};
  const F="Отказоустойчивость|", B="Безопасность|", KC="Keycloak и OAuth2|", D="Docker|", K8="Kubernetes|", CL="Облако|", A="AWS|";

  Z[F+"Деградация лучше отказа"]={
    p:[ bg(0)+phone(34,48,1.5,`<rect x="-5.5" y="-10" width="11" height="5" rx="1" fill="${C.bot}"/><rect x="-5.5" y="-3" width="11" height="12" rx="1" fill="none" stroke="${C.grey}" stroke-width=".8" stroke-dasharray="2 1.5"/>`)+server(90,54,.9,false)+no(90,22),
        bg(1)+phone(36,48,1.5,txt(0,2,"500",5,C.red))+no(60,18)+kid(92,82,.95,C.blue,"sad"),
        bg(2)+phone(36,48,1.5,`<rect x="-5.5" y="-10" width="11" height="5" rx="1" fill="${C.bot}"/>`+star(-2.5,-1,2.3)+star(2.5,-1,2.3)+star(-2.5,5,2.3)+star(2.5,5,2.3))+ok(60,18)+kid(92,82,.95,C.blue,"smile") ],
    l:[["сломалась одна часть","one part broke"],["пустая страница — плохо","blank page — bad"],["покажем популярное","show popular instead"]],
    c:["Одна часть сломалась — покажу запасное. Главное пусть работает, а идеал подождёт.","One part broke — I show a fallback. The main thing keeps working; perfect can wait."] };

  Z[F+"Graceful shutdown"]={
    p:[ bg(0)+server(24,54,.85)+env(62,26,1,C.yel)+txt(62,48,"SIGTERM",8.5,C.red)+bot(98,82,.7,{mood:"wow"}),
        bg(1)+bot(26,82,.75,{arms:"up"})+door(62,74,false)+no(62,26,.9)+kid(98,82,.85,C.red,"sad"),
        bg(2)+bot(28,82,.8,{arms:"reach"})+env(52,52,.5)+kid(72,82,.8,C.yel,"smile")+ok(72,28,.8)+kid(102,82,.8,C.grn,"smile")+clock(100,20,.8,9),
        bg(3)+server(32,54,.85,false)+ok(64,24)+bot(94,82,.75,{arms:"up",mood:"smile"}) ],
    l:[["пришёл SIGTERM","SIGTERM arrives"],["новых не пускаем","no new requests"],["доделываем начатое","finish the current ones"],["закрыл всё — выход","closed all — exit"]],
    c:["Сказали «стоп» — новых не беру, доделываю начатое и только потом выключаюсь.","Told to stop, I take no new work, finish what I started, and only then switch off."] };

  Z[B+"Никогда не доверяй тому, что пришло снаружи"]={
    p:[ bg(0)+kid(20,82,.9,C.yel,"smile")+laptop(70,64,1.3,ok(0,-13,.65)),
        bg(1)+kid(16,82,.85,C.red,"smile")+laptop(56,74,.8,ok(0,-13,.6))+curve(26,44,96,46,C.red,true)+tk(60,22,"id=1",C.yel,30)+server(104,62,.6),
        bg(2)+server(24,54,.85)+tk(60,44,"id=1",C.yel,30)+no(60,26)+bot(96,82,.8,{glasses:true,mood:"think"}) ],
    l:[["проверка в браузере","check in the browser"],["запрос можно подделать","requests can be faked"],["сервер проверяет сам","the server checks itself"]],
    c:["Всё, что пришло снаружи, проверяю сам. Проверка в браузере — только для удобства.","I check everything from outside myself. Browser checks are only for convenience."] };

  Z[B+"SQL-инъекция: чужой текст стал командой"]={
    p:[ bg(0)+tk(40,22,"name = '",'#fff',50,8)+txt(40,42,"+",14)+tk(40,58,"'; DROP",C.red,50,8)+kid(98,82,.85,C.red,"smile"),
        bg(1)+db(40,54,1.3,C.red)+spark(20,26,C.red)+spark(62,22,C.red)+txt(40,22,"DROP",10,C.red)+bot(94,82,.8,{mood:"wow"}),
        bg(2)+tk(34,20,"name = ?",'#fff',46,8)+curve(34,56,34,28,C.grn,true)+tk(34,62,"'; DROP",C.yel,46,8)+db(92,52,1.1)+ok(92,20) ],
    l:[["склеил запрос из строк","glued the query strings"],["текст стал командой","text became a command"],["значение — параметром","value as a parameter"]],
    c:["Склеишь запрос из строк — чужой текст выполнится. С параметром база не спутает их.","Glue strings into a query and outside text runs. With a parameter the DB can't mix them."] };

  Z[B+"Пароли не хранят"]={
    p:[ bg(0)+tk(32,42,"qwerty",'#fff',40,8)+txt(64,46,"+",14)+salt(92,44),
        bg(1)+gear(44,44,1.6)+arrowR(72,44,88)+tk(104,44,"9f3a",'#fff',26)+clock(18,18,.8,2),
        bg(2)+db(28,54,1.1)+tk(28,24,"9f3a",'#fff',28)+arrowR(50,44,66)+tk(94,44,"qwerty",'#eee',38,8)+no(94,26),
        bg(3)+kid(28,82,.9,"#5b5f6e","sad")+db(76,56,1)+txt(76,26,"?",16,C.red) ],
    l:[["пароль + соль","password + salt"],["медленно и в одну сторону","slow and one-way"],["в базе — отпечаток","the DB keeps a print"],["украли — паролей нет","stolen — no passwords"]],
    c:["Храню не пароль, а отпечаток с солью. Обратно его не развернуть, даже если украдут.","I keep a salted fingerprint, not the password. It can't be turned back, even if stolen."] };

  Z[B+"Аутентификация и авторизация — разное"]={
    p:[ bg(0)+kid(24,82,.9,C.blue,"smile")+pass(48,52,C.yel,-10)+ok(70,22)+bot(96,82,.8,{glasses:true}),
        bg(1)+door(32,74,true)+ok(32,28)+kid(60,82,.75,C.blue,"smile")+door(88,74,false)+no(88,28),
        bg(2)+box(30,72,30,26,"#7")+no(30,30)+txt(62,52,"≠",16,C.red)+tk(94,24,"#5",C.yel,22)+kid(94,82,.8,C.blue,"wow") ],
    l:[["кто ты? — пропуск","who are you? — badge"],["куда тебе можно","where you may go"],["чужой заказ — нельзя","not yours — denied"]],
    c:["Сначала узнаю, кто ты. Потом проверю, твоё ли это. Пропуск — не ключ от всего.","First I learn who you are. Then I check it's yours. A badge isn't a key to all."] };

  Z[B+"Секреты не лежат в коде"]={
    p:[ bg(0)+paper(38,40,["{ }","pass=","1234"])+key(66,24,.8,C.red)+bot(96,82,.75,{mood:"smile"}),
        bg(1)+line(14,64,106,64,C.grey)+[22,60,98].map((x,i)=>card(x,32,26,30,"#fff",(i<2?key(0,0,.6,C.red):txt(0,4,"{ }",8))+`<circle cy="30" r="2.5" fill="${C.ink}"/>`)).join("")+mag(34,48,.85),
        bg(2)+lock(28,48,1.6)+curve(42,40,84,40,C.grn,true)+key(62,24,.8)+server(94,54,.8),
        bg(3)+key(34,44,1.3,C.red)+no(34,24)+arrowR(54,44,70)+key(94,44,1.3,C.grn)+ok(94,24) ],
    l:[["пароль в коде","a password in code"],["удалил — в истории остался","deleted — still in history"],["секреты — из хранилища","secrets from a vault"],["утёк — меняю","leaked — rotate it"]],
    c:["Пароль из кода не стереть: он навсегда в истории. Секреты держу отдельно, утёкший меняю.","A password in code stays in history forever. Keep secrets apart; replace any that leak."] };

  Z[KC+"Зачем отдельный сервер входа"]={
    p:[ bg(0)+[22,60,98].map(x=>server(x,56,.7)+lock(x,26,.75)).join(""),
        bg(1)+lock(24,46,1.7)+[20,46,70].map(y=>curve(42,46,90,y,C.ink,true)+server(100,y,.42)).join(""),
        bg(2)+kid(18,82,.85,C.blue,"smile")+key(18,30,.7)+[54,80,106].map(x=>server(x,58,.55)+ok(x,32,.75)).join("") ],
    l:[["у каждого свой вход","each with its own login"],["одна проходная","one front gate"],["вошёл раз — пускают везде","one login — every door"]],
    c:["Пароли и роли хранит один сервер входа. Вошёл один раз — и пускают во все сервисы.","One login server keeps passwords and roles. Log in once — every service lets you in."] };

  Z[KC+"Realm, client, роли"]={
    p:[ bg(0)+zone(5,12,63,72,C.face)+kid(22,72,.8,C.red)+kid(46,72,.8,C.yel)+zone(68,12,115,72,"#e7f6e8")+kid(92,72,.8,C.grn),
        bg(1)+laptop(40,62,1.3,lock(0,-13,.55))+bot(94,82,.8,{arms:"reach"}),
        bg(2)+card(52,42,70,40,"#fff",`<rect x="-35" y="-20" width="70" height="9" rx="4" fill="${C.bot}"/>`+txt(0,4,"role: admin",8)+txt(0,14,"role: user",8))+kid(104,82,.75,C.blue,"smile") ],
    l:[["realm — своё пространство","realm — its own space"],["client — кто просит вход","client — app asking login"],["роли попадают в токен","roles go into the token"]],
    c:["Realm — завод со своими людьми. Client — дверь в нём. Роль написана в твоём пропуске.","A realm is a factory with its own people. A client is a door. Your role is on your badge."] };

  Z[KC+"Access и refresh — зачем два токена"]={
    p:[ bg(0)+tk(28,26,"access",C.yel,36)+clock(28,52,.9,1)+[30,46,62].map(y=>arrowR(52,y,80,C.grey)).join("")+server(98,50,.8),
        bg(1)+kid(26,82,.85,"#5b5f6e","smile")+`<g opacity=".45">${tk(64,46,"access",C.yel,36)}</g>`+no(78,36)+clock(98,22,.9,5),
        bg(2)+lock(26,58,1.4)+tk(26,26,"refresh",C.blue,38)+arrowR(50,44,66)+tk(92,44,"access",C.yel,36)+spark(106,24),
        bg(3)+tk(44,40,"refresh",C.blue,42)+no(66,30)+bot(98,82,.75,{arms:"reach"}) ],
    l:[["access — на минуты","access — lives minutes"],["украли — скоро протухнет","stolen — expires soon"],["refresh даёт новый access","refresh mints new access"],["refresh можно отозвать","refresh can be revoked"]],
    c:["Короткий пропуск ношу везде — он быстро протухнет. Длинный нужен, чтобы выдать новый.","I carry the short pass everywhere — it soon expires. The long one just gets a new one."] };

  Z[KC+"Сервис не ходит в Keycloak на каждый запрос"]={
    p:[ bg(0)+server(22,54,.85)+lock(22,20,.7)+curve(38,40,84,40,C.ink,true)+key(62,24,.9)+txt(62,52,"1×",11,C.blue)+bot(98,82,.75,{arms:"hold"}),
        bg(1)+bot(30,82,.85,{glasses:true,mood:"think"})+[22,44,66].map(y=>tk(76,y,"JWT",C.yel,26)+ok(102,y,.7)).join(""),
        bg(2)+server(32,54,.9)+zz(48,26)+clock(92,30,1)+txt(92,58,"1 µs",10,C.grn) ],
    l:[["ключ беру один раз","fetch the key once"],["подпись сверяю сам","I check signatures myself"],["сервер входа отдыхает","the login server rests"]],
    c:["Ключ для проверки беру один раз, дальше сверяю подписи сам. Звонить каждый раз не нужно.","I fetch the check key once, then verify signatures myself. No call needed every time."] };

  Z[KC+"Между сервисами — тоже токены"]={
    p:[ bg(0)+server(20,54,.7)+server(100,54,.7)+lock(100,22,.8)+key(58,24,.8)+arrowR(34,36,84)+arrowL(84,60,36)+tk(60,66,"JWT",C.yel,26),
        bg(1)+server(22,54,.7)+tk(60,30,"JWT",C.yel,26)+arrowR(36,48,84)+server(98,54,.7)+ok(98,22),
        bg(2)+bot(22,82,.8,{arms:"reach"})+pass(42,60,C.yel,-12)+db(70,52,.9)+ok(70,22,.8)+lock(102,50,1.2)+no(102,28,.8) ],
    l:[["сервис просит свой токен","service asks for a token"],["идёт к соседу с токеном","calls a neighbor with it"],["у машины свои права","machines get own rights"]],
    c:["У сервиса свой пропуск, безо всякого человека. И права свои — пускают не везде.","A service has its own pass, no human needed. And its own rights — not everywhere."] };

  Z[D+"Болезнь «у меня работает»"]={
    p:[ bg(0)+laptop(42,62,1.4,txt(0,-14,"Java 21",5)+txt(0,-8,"PG 16",5))+ok(42,18)+kid(96,82,.9,C.blue,"smile"),
        bg(1)+server(34,54,.95)+tk(84,30,"Java 17",'#fff',36)+no(84,54)+kid(104,82,.6,C.blue,"sad"),
        bg(2)+tk(26,24,"21",C.grn,24,9)+txt(60,28,"≠",16,C.red)+tk(94,24,"17",C.red,24,9)+bot(60,84,.75,{mood:"think",glasses:true})+txt(96,58,"?",16,C.blue) ],
    l:[["у меня работает","works on my machine"],["на сервере ломается","breaks on the server"],["ищем, чем отличаются","hunting the difference"]],
    c:["Код тот же, а машины разные: другая Java, другая база. И ведёт себя всё по-разному.","Same code, different machines: another Java, another DB. So it all behaves differently."] };

  Z[D+"Контейнер — это не виртуалка"]={
    p:[ bg(0)+lay(60,62,104,10,C.ink,"HW")+[33,87].map(x=>zone(x-25,14,x+25,60,"#fff")+lay(x,46,44,11,C.red,"OS")+lay(x,33,44,11,C.wood,"JDK")+lay(x,20,44,11,C.blue,"JAR")).join(""),
        bg(1)+lay(60,62,104,10,C.ink,"HW")+lay(60,50,104,11,C.grn,"Linux")+[28,60,92].map(x=>ctr(x,48,26,20,C.blue)).join(""),
        bg(2)+ctr(30,46,30,20,C.blue)+clock(30,60,.9,1)+txt(30,18,"ms",11,C.grn)+zone(62,18,110,46,"#fff")+lay(86,33,40,10,C.red,"OS")+clock(86,58,.9,8)+txt(86,14,"min",10,C.red) ],
    l:[["VM — своя ОС у каждой","each VM has its own OS"],["контейнеры — одно ядро","containers share a kernel"],["старт за миллисекунды","starts in milliseconds"]],
    c:["Контейнер — процесс за стенками, а не целый компьютер. Ядро общее, поэтому старт мгновенный.","A container is a walled-off process, not a whole PC. Shared kernel, so it starts instantly."] };

  Z[D+"Образ — слои, контейнер — образ плюс тонкий верх"]={
    p:[ bg(0)+lay(46,58,60,12,C.ink,"OS")+lay(46,45,60,12,C.red,"JDK")+lay(46,32,60,12,C.blue,"JAR")+lock(98,46,1.3),
        bg(1)+lay(46,58,60,12,C.ink,"OS")+lay(46,45,60,12,C.red,"JDK")+lay(46,32,60,12,C.blue,"JAR")+lay(46,24,60,7,C.yel,null,true)+pencil(84,20),
        bg(2)+lay(60,60,104,10,C.ink,"OS")+lay(60,49,104,10,C.red,"JDK")+lay(60,38,104,10,C.blue,"JAR")+[26,60,94].map(x=>lay(x,30,28,6,C.yel,null,true)+spark(x,18,C.yel)).join("") ],
    l:[["образ — стопка слоёв","image — a layer stack"],["сверху тонкий писчий слой","plus a thin writable top"],["3 контейнера — 1 образ","3 containers — 1 image"]],
    c:["Нижние слои общие и только для чтения. Каждый контейнер пишет лишь на своём тонком верхнем.","Lower layers are shared and read-only. Each container writes only on its own thin top."] };

  Z[D+"Dockerfile: порядок строк решает"]={
    p:[ bg(0)+lay(40,60,56,11,C.ink,"1")+lay(40,48,56,11,C.blue,"2")+lay(40,36,56,11,C.red,"3")+lay(40,24,56,11,C.red,"4")+pencil(78,46)+ok(84,66,.7)+loopA(96,26,9,C.red),
        bg(1)+lay(36,60,56,11,C.ink,"FROM")+lay(36,48,56,11,C.wood,"src")+lay(36,36,56,11,C.red,"RUN mvn")+pencil(72,50)+loopA(98,46,8,C.red)+clock(104,22,.8,7)+txt(96,72,"5 min",8,C.red),
        bg(2)+lay(36,60,56,11,C.ink,"FROM")+lay(36,48,56,11,C.grn,"RUN mvn")+lay(36,36,56,11,C.wood,"src")+pencil(72,38)+ok(84,58,.75)+clock(104,22,.8,1)+txt(98,72,"5 s",9,C.grn) ],
    l:[["правка — пересборка выше","edit — rebuild above it"],["код ниже — всё заново","code first — rebuild all"],["зависимости ниже кода","deps below the code"]],
    c:["Пересобирается всё выше изменённой строки. Поэтому зависимости ставлю раньше кода.","Everything above a changed line is rebuilt. So I install deps before copying code."] };

  Z[D+"Всё, что контейнер записал, умрёт вместе с ним"]={
    p:[ bg(0)+ctr(42,72,56,40,C.blue)+card(42,50,24,22,"#fff",txt(0,-2,"a=1",7)+txt(0,7,"b=2",7))+bot(100,82,.65,{arms:"reach"}),
        bg(1)+ctr(26,70,34,30,C.grey,null,.5)+no(26,44)+arrowR(48,55,66)+ctr(90,70,34,30,C.blue)+txt(90,60,"?",14,"#fff"),
        bg(2)+ctr(28,70,36,30,C.blue)+`<path d="M46 60 H76" stroke="${C.ink}" stroke-width="3"/>`+db(92,54,1.1,C.yel)+card(92,24,22,14,"#fff",txt(0,3,"a=1",7))+ok(60,34,.8) ],
    l:[["контейнер записал файл","the container wrote a file"],["пересоздал — пусто","recreated — it's empty"],["данные — в отдельном томе","data lives in a volume"]],
    c:["Что контейнер записал внутри, пропадёт вместе с ним. Важное кладу в том — он живёт отдельно.","Whatever a container writes inside dies with it. Important data goes in a separate volume."] };

  Z[D+"Один контейнер — один процесс"]={
    p:[ bg(0)+ctr(58,74,80,50,C.blue)+gear(40,50,.9)+db(76,54,.7,C.yel),
        bg(1)+ctr(58,74,80,50,C.grey)+gear(40,50,.9,C.grn)+txt(40,36,"v2",8,C.ink)+db(76,54,.7,C.yel)+no(76,22,.8),
        bg(2)+[18,42,66].map(x=>ctr(x,72,20,22,C.blue)+gear(x,61,.45)).join("")+ctr(100,72,24,30,C.yel)+db(100,58,.5)+ok(42,30,.8)+ok(100,30,.8) ],
    l:[["приложение и база вместе","app and DB in one box"],["обновил — легло всё","update one — all go down"],["раздельно — гибко","apart — flexible"]],
    c:["В одной коробке приложение и база мешают друг другу. Раздельно обновляю и множу по одному.","App and DB in one box get in each other's way. Apart, I update and scale each alone."] };

  Z[K8+"Проблема, которую он решает"]={
    p:[ bg(0)+ctr(28,72,24,22,C.blue)+ctr(60,72,24,22,C.red)+no(60,36)+ctr(92,72,24,22,C.blue)+txt(60,18,"?",14,C.blue),
        bg(1)+[24,60,96].map(x=>server(x,60,.55)).join("")+[[30,22],[56,16],[88,24]].map(p=>ctr(p[0],p[1]+6,16,11,C.blue)).join("")+txt(110,20,"?",12,C.red),
        bg(2)+ctr(26,62,30,24,C.grey,"v1")+arrowR(46,50,72)+ctr(94,62,30,24,C.grn,"v2")+kid(60,84,.55,C.yel,"smile"),
        bg(3)+[0,1,2,3,4,5].map(i=>[0,1,2].map(j=>ctr(52+i*11,24+j*14,9,9,j===1&&i===2?C.red:C.blue)).join("")).join("")+bot(22,82,.7,{mood:"sad",arms:"up"})+txt(86,66,"×100",9) ],
    l:[["упал — кто поднимет?","one died — who restarts?"],["разложить по машинам","spread across machines"],["сменить версию без простоя","swap versions, no downtime"],["руками на сотне — никак","by hand ×100 — no way"]],
    c:["Запустить контейнер легко. А поднимать, раскладывать и обновлять сотню — нужен дирижёр.","Starting a container is easy. Restarting, placing and updating a hundred needs a conductor."] };

  Z[K8+"Декларативность: описываешь цель, а не шаги"]={
    p:[ bg(0)+yml(36,40,"replicas","= 3")+bot(92,82,.8,{arms:"reach"}),
        bg(1)+ctr(24,70,22,24,C.blue)+ctr(52,70,22,24,C.blue)+`<rect x="69" y="46" width="22" height="24" rx="2" fill="none" stroke="${C.red}" stroke-width="1.4" stroke-dasharray="3 2"/>`+txt(80,62,"?",12,C.red)+txt(40,22,"2 ≠ 3",11,C.red)+loopA(100,26,8,C.blue),
        bg(2)+ctr(24,70,22,24,C.blue)+ctr(52,70,22,24,C.blue)+ctr(80,70,22,24,C.grn)+spark(98,44)+txt(46,22,"3 = 3",11,C.grn)+ok(96,20,.8) ],
    l:[["пишу цель: 3 копии","I write the goal: 3"],["сверка: есть 2, надо 3","check: have 2, want 3"],["разницу убрал сам","the gap closed itself"]],
    c:["Я не говорю «запусти». Пишу, сколько должно быть, а система сама держит это число.","I don't say 'start it'. I write how many there should be; the system keeps that number."] };

  Z[K8+"Под — минимальная единица, и это не контейнер"]={
    p:[ bg(0)+podBox(14,14,106,72)+ctr(40,52,30,28,C.blue)+ctr(80,52,30,28,C.wood)+line(40,52,40,62)+line(80,52,80,62)+line(40,62,80,62)+db(60,64,.35,C.yel),
        bg(1)+bot(26,82,.85,{arms:"up",hat:true})+podBox(54,22,108,64)+ctr(70,56,18,22,C.blue)+ctr(92,56,18,22,C.wood)+curve(36,26,54,30,C.ink,true),
        bg(2)+`<g opacity=".4">${podBox(8,26,48,66)+ctr(28,60,22,22,C.blue)}</g>`+no(28,20)+arrowR(54,46,68)+podBox(72,26,112,66)+ctr(92,60,22,22,C.blue)+spark(106,20) ],
    l:[["под — обёртка контейнеров","a pod wraps containers"],["k8s двигает поды","k8s moves whole pods"],["под — расходник","pods are disposable"]],
    c:["Под — коробочка для контейнеров с общей сетью и диском. Её легко выкинуть и сделать новую.","A pod is a little box of containers sharing net and disk. Easy to toss and make a new one."] };

  Z[K8+"Deployment и самолечение"]={
    p:[ bg(0)+yml(26,40,"replicas","= 5")+[[62,30],[84,30],[106,30],[73,54],[95,54]].map(p=>mpod(p[0],p[1])).join(""),
        bg(1)+[[30,30],[56,30],[82,30],[43,56],[69,56]].map((p,i)=>mpod(p[0],p[1],i===2?C.red:C.bot)).join("")+no(94,22,.8)+txt(102,62,"4",14,C.red),
        bg(2)+[[30,30],[56,30],[43,56],[69,56]].map(p=>mpod(p[0],p[1])).join("")+mpod(82,30,C.grn)+spark(96,18)+txt(102,62,"5",14,C.grn) ],
    l:[["должно быть 5","there should be 5"],["один упал — осталось 4","one died — now 4"],["новый поднялся сам","a new one, all by itself"]],
    c:["Deployment помнит, сколько подов нужно. Упал один — новый появится сам, чинить нечего.","A Deployment remembers how many pods it needs. One dies — a new one appears by itself."] };

  Z[K8+"Service: стабильный адрес поверх нестабильных подов"]={
    p:[ bg(0)+`<g opacity=".45">${mpod(28,40)}</g>`+no(28,40,.7)+tk(28,62,"10.0.0.5",'#eee',38,7)+arrowR(50,40,70)+mpod(92,40,C.grn)+tk(92,62,"10.0.0.9",'#fff',38,7),
        bg(1)+kid(16,82,.75,C.yel,"smile")+tk(48,46,"svc",C.yel,26,8)+[22,46,70].map(y=>line(62,46,90,y)+mpod(100,y)).join(""),
        bg(2)+kid(16,82,.75,C.yel,"smile")+tk(48,46,"svc",C.yel,26,8)+line(62,46,90,22)+mpod(100,22)+`<g opacity=".4">${mpod(100,46,C.red)}</g>`+no(100,46,.6)+line(62,46,90,70)+mpod(100,70) ],
    l:[["у подов адреса меняются","pod addresses change"],["Service — одно имя","Service — one name"],["шлёт только к живым","sends only to live ones"]],
    c:["Поды меняют адреса, а имя Service постоянное. Он сам знает, кто жив, и шлёт к ним.","Pods change addresses; a Service's name stays. It knows who's alive and sends there."] };

  Z[K8+"Пробы: liveness и readiness — не одно и то же"]={
    p:[ bg(0)+bot(32,82,.85,{mood:"think"})+clock(58,22,.8,4)+env(100,44,.7)+arrowL(90,44,76,C.grey)+no(70,44,.7),
        bg(1)+bot(26,82,.7,{mood:"sad"})+no(26,20)+arrowR(46,50,72)+bot(94,82,.7,{arms:"up"})+spark(110,22),
        bg(2)+loopA(60,52,24,C.red)+bot(60,82,.6,{mood:"wow"})+clock(102,22,.8,2)+no(18,24,.8) ],
    l:[["не готов — без трафика","not ready — no traffic"],["не жив — перезапуск","not alive — restart"],["перепутал — вечный рестарт","mixed up — restart loop"]],
    c:["Не готов — подожду без трафика. Не дышит — перезапущу. Перепутать — вечный рестарт.","Not ready — I wait, no traffic. Not alive — restart. Mix them up — endless restarts."] };

  Z[K8+"requests и limits — почему убивают именно тебя"]={
    p:[ bg(0)+`<rect x="10" y="30" width="100" height="22" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><rect x="12" y="32" width="40" height="18" rx="3" fill="${C.grn}"/>`+txt(32,45,"512Mi",8,"#fff")+mpod(32,66)+ok(90,66,.8),
        bg(1)+`<rect x="10" y="30" width="100" height="22" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><rect x="12" y="32" width="56" height="18" rx="3" fill="${C.blue}"/>`+`<path d="M80 22 V60" stroke="${C.red}" stroke-width="2.2" stroke-dasharray="3 2"/>`+txt(80,18,"1Gi",9,C.red)+mpod(40,66),
        bg(2)+`<rect x="10" y="22" width="100" height="22" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><rect x="12" y="24" width="96" height="18" rx="3" fill="${C.red}"/>`+txt(60,37,"100%",8,"#fff")+mpod(30,62,C.bot)+mpod(52,62,C.bot)+arrowR(70,62,90)+mpod(104,62,C.grey)+txt(104,80,"OOM",7,C.red) ],
    l:[["requests — бронь места","requests — a reservation"],["limits — потолок","limits — the ceiling"],["без них выгонят первым","none set — evicted first"]],
    c:["requests — моя бронь, limits — мой потолок. Без них при нехватке памяти выгонят меня первым.","requests is my booking, limits my ceiling. Without them I'm evicted first when RAM runs out."] };

  Z[CL+"Облако — это чужие серверы плюс API и счётчик"]={
    p:[ bg(0)+laptop(26,62,1.1,txt(0,-10,"API",7,C.blue))+arrowR(48,44,68)+cloud(92,26,1)+server(92,58,.55)+spark(110,46),
        bg(1)+`<circle cx="44" cy="44" r="22" fill="#fff" stroke="${C.ink}" stroke-width="1.4"/><path d="M44 44 L58 32" stroke="${C.red}" stroke-width="2.4" stroke-linecap="round"/>`+txt(44,60,"$/h",8)+coin(90,30)+coin(98,48)+coin(86,64),
        bg(2)+bot(30,82,.8,{hat:true,arms:"hold"})+db(76,52,.9)+gear(104,30,.7)+ok(76,22,.8) ],
    l:[["сервер по API за секунды","servers by API in seconds"],["плата по счётчику","pay by the meter"],["рутину делает провайдер","the provider does chores"]],
    c:["Облако — чужие серверы: беру по API за секунды, плачу по счётчику, рутину делают за меня.","The cloud is someone else's servers: get them by API, pay by the meter, chores done for me."] };

  Z[CL+"IaaS, PaaS, SaaS — где проходит граница ответственности"]={
    p:[ bg(0)+txt(60,14,"IaaS",9,C.blue)+server(28,56,.85)+gear(62,38,.55)+gear(82,38,.55)+gear(102,38,.55)+coin(82,62,.9),
        bg(1)+txt(60,14,"PaaS",9,C.blue)+db(28,52,1)+gear(72,38,.55)+gear(92,38,.55)+coin(72,62,.9)+coin(92,62,.9),
        bg(2)+txt(60,14,"SaaS",9,C.blue)+phone(28,48,1.3,env(0,0,.35))+gear(82,38,.55)+coin(64,62,.9)+coin(82,62,.9)+coin(100,62,.9) ],
    l:[["IaaS: машина, дальше сам","IaaS: a VM, rest is yours"],["PaaS: готовый сервис","PaaS: a running service"],["SaaS: готовый продукт","SaaS: a finished product"]],
    c:["Шестерёнки — моя работа, монетки — цена. Чем выше уровень, тем работы меньше, а денег больше.","Gears are my work, coins are the price. The higher the level, the less work and more money."] };

  Z[CL+"Managed или своё — главный вопрос"]={
    p:[ bg(0)+ctr(34,72,40,34,C.blue)+db(34,58,.6)+coin(76,26)+bot(98,82,.65,{mood:"smile"}),
        bg(1)+moon(16,20)+server(40,54,.9,false)+clock(68,20,.8,3)+bot(94,82,.75,{mood:"sad",arms:"reach"}),
        bg(2)+cloud(32,26,.9)+db(32,58,.8)+ok(54,40,.7)+coin(70,22,.7)+coin(84,22,.7)+coin(98,22,.7)+bot(88,82,.6,{mood:"think"})+zz(98,56) ],
    l:[["своё: дёшево по счёту","own: cheap on the bill"],["а чинить ночью — тебе","but night fixes are yours"],["managed: дороже, спокойно","managed: costs more, calm"]],
    c:["Считай не цену базы, а цену вместе с людьми, которые будут чинить её ночью.","Count not just the database price, but also the people who'll fix it at night."] };

  Z[CL+"Регионы и зоны доступности"]={
    p:[ bg(0)+zone(6,12,114,72)+dc(28,68,C.blue,"a")+dc(60,68,C.blue,"b")+dc(92,68,C.blue,"c"),
        bg(1)+zone(6,12,114,72)+dc(28,68,C.blue)+dc(60,68,C.red)+no(60,24,.7)+dc(92,68,C.blue)+ok(28,24,.7)+ok(92,24,.7),
        bg(2)+dc(20,66,C.blue)+dc(100,66,C.blue)+curve(30,40,90,40,C.ink,true)+clock(60,52,.8,4)+txt(60,74,"+50 ms",8,C.red) ],
    l:[["зоны — отдельные ЦОДы","zones — separate DCs"],["упал один ЦОД — живём","one DC down — still up"],["другой город — дольше","other region — slower"]],
    c:["Копии в соседних ЦОДах спасут от пожара в одном. В другом городе надёжнее, но дальше ехать.","Copies in nearby data centers survive one fire. Another city is safer, but farther away."] };

  Z[CL+"Объектное хранилище"]={
    p:[ bg(0)+paper(24,40,["PDF"])+arrowR(44,40,62)+bucket(88,52,1.3)+tk(88,18,"a/7.pdf",'#fff',38,7),
        bg(1)+bucket(28,52,1.2)+curve(46,40,82,42,C.blue,true)+tk(60,18,"https://…",'#fff',44,7)+kid(98,82,.85,C.yel,"smile"),
        bg(2)+db(26,52,1)+tk(26,22,"url",C.yel,22)+curve(42,40,80,40,C.ink,true)+bucket(94,52,1.2)+ok(94,22,.8) ],
    l:[["кладу файл по ключу","put a file by key"],["отдаю по ссылке","fetch it by link"],["в базе — только ссылка","the DB keeps just a link"]],
    c:["Файлы кладу в хранилище по ключу, а в базе держу только ссылку. Дёшево и места без конца.","I put files in storage by key and keep just the link in the DB. Cheap and nearly endless."] };

  Z[CL+"Автомасштабирование не лечит узкое место"]={
    p:[ bg(0)+[16,38,60,82,104].map(x=>server(x,24,.4)+line(x,34,60,52,C.grey)).join("")+db(60,64,.8)+ok(92,62,.8),
        bg(1)+[0,1,2,3,4,5,6,7,8,9].map(i=>server(12+i*10.5,18,.25)+server(12+i*10.5,34,.25)).join("")+db(60,64,.8,C.red)+spark(36,60,C.red)+spark(84,60,C.red)+txt(98,72,"20",9,C.red),
        bg(2)+`<path d="M14 66 H106" stroke="${C.ink}" stroke-width="1.4"/>`+bar(34,66,18,14,C.grn)+server(34,38,.45)+bar(74,66,18,38,C.red)+db(74,16,.4)+mag(100,30,.8) ],
    l:[["5 копий — база держит","5 copies — the DB copes"],["20 копий — база тонет","20 copies — the DB drowns"],["метрики покажут, где узко","metrics show the choke"]],
    c:["Добавлю копий, а база одна — ей станет только хуже. Масштабируют то, что упирается.","More copies, one database — it only gets worse. Scale what is actually the bottleneck."] };

  Z[CL+"IAM: роли вместо паролей в коде"]={
    p:[ bg(0)+paper(36,40,["{ }","key=","AKIA…"])+key(68,26,.8,C.red)+no(92,42),
        bg(1)+bot(22,82,.8,{arms:"reach"})+pass(42,60,C.yel,-12)+cloud(88,26,.9)+arrowL(80,46,52,C.ink)+key(92,58,.8)+clock(108,46,.6,2),
        bg(2)+bot(20,82,.75,{arms:"reach"})+lock(52,48,1.1,true)+ok(52,24,.7)+lock(80,48,1.1)+lock(106,48,1.1) ],
    l:[["ключ в коде — нельзя","a key in code — no"],["роль → временный ключ","role → a temporary key"],["только нужные права","only the rights needed"]],
    c:["Ключа в коде нет — облако даёт мне временный по роли. И открывает только то, что нужно.","No key in my code — the cloud gives me a temporary one by role, and only what I need."] };

  Z[CL+"За что реально приходит счёт"]={
    p:[ bg(0)+server(38,54,.9)+coin(80,46),
        bg(1)+server(22,54,.7)+arrowR(36,40,70,C.red)+cloud(92,40,.8)+coin(70,64)+coin(86,64)+coin(102,64),
        bg(2)+db(26,52,1,C.grey)+arrowR(44,36,58,C.red)+arrowL(58,48,44,C.red)+dc(78,68,C.blue)+dc(104,68,C.blue)+arrowR(84,30,100,C.red)+coin(91,16,.8),
        bg(3)+server(40,54,.9,false)+web(27,32)+clock(84,24,.8,11)+coin(84,48,.8)+coin(92,60,.8)+coin(80,70,.8) ],
    l:[["виртуалка — не главное","the VM isn't the big cost"],["трафик наружу","outbound traffic"],["диски и межзоновый трафик","disk IO, cross-zone"],["забытые ресурсы","forgotten resources"]],
    c:["Дорого не сама виртуалка, а трафик наружу, диски и то, что забыли выключить.","It's not the VM that costs most: it's outbound traffic, disks and things left running."] };

  Z[CL+"Vendor lock-in — где он настоящий"]={
    p:[ bg(0)+cloud(24,24,.8)+cloud(96,24,.8)+server(36,62,.5)+bucket(60,64,.6)+db(84,64,.6)+arrowR(30,82,90,C.grn)+ok(60,34,.7),
        bg(1)+cloud(30,30,1.1)+chain(42,40,74,56)+env(84,60,.8)+chain(46,32,88,28)+txt(98,32,"λ",14,C.ink)+chain(30,40,30,56)+lock(30,64,.8),
        bg(2)+[0,1,2].map(i=>bar(26+i*34,74,26,16+i*18,[C.grn,C.yel,C.red][i])+chain(26+i*34,58-i*18,26+i*34,18,1+i*1.4)).join("") ],
    l:[["VM, S3, Postgres — легко","VM, S3, Postgres — easy"],["очереди, IAM — привязка","queues, IAM — lock-in"],["выше уровень — крепче","higher level — tighter"]],
    c:["Простое переносится легко. Чем умнее сервис облака, тем крепче привязка — и это выбор.","Basic things move easily. The smarter the cloud service, the tighter the tie — a choice."] };

  Z[CL+"Если облачного опыта нет"]={
    p:[ bg(0)+kid(26,82,.9,C.blue,"smile")+bubble(72,26,44,txt(0,3.5,"AWS ✓",8))+no(100,52),
        bg(1)+kid(26,82,.9,C.blue,"smile")+bubble(78,26,64,txt(0,3.5,"k8s · Docker",7.5))+ok(74,52),
        bg(2)+kid(22,82,.85,C.blue,"think")+think(46,24,db(5,-2,.35)+coin(19,-2,.7))+bot(96,82,.75,{mood:"smile"})+ok(96,16,.7) ],
    l:[["не изображай опыт","don't fake experience"],["скажи, с чем работал","say what you've used"],["покажи, что понимаешь","show you get the models"]],
    c:["Не было облака — так и скажи. Расскажи, с чем работал, и покажи, что понимаешь модели.","No cloud experience? Say so. Tell what you've used and show you understand the models."] };

  Z[A+"Как вообще устроен аккаунт"]={
    p:[ bg(0)+`<rect x="14" y="14" width="92" height="58" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="2"/>`+coin(42,44,1.4)+lock(78,44,1.4),
        bg(1)+`<rect x="6" y="8" width="108" height="66" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="1.6"/>`+zone(12,24,108,68,C.face)+txt(60,20,"eu-central-1",7.5,C.blue)+["a","b","c"].map((z,i)=>dc(32+i*28,64,C.blue,z)).join(""),
        bg(2)+zone(6,16,54,70,C.face)+zone(66,16,114,70,"#e7f6e8")+db(30,48,.8)+curve(44,36,84,38,C.red,true)+no(90,46) ],
    l:[["аккаунт — деньги и права","account — money & rights"],["регионы, а в них зоны","regions hold zones"],["ресурс живёт в регионе","resources stay in a region"]],
    c:["Аккаунт — граница денег и прав. В нём регионы, в регионах зоны. Ресурс сам не переедет.","An account bounds money and rights. Inside are regions, then zones. Resources don't move."] };

  Z[A+"IAM: роли, а не ключи"]={
    p:[ bg(0)+`<circle cx="40" cy="30" r="9" fill="none" stroke="${C.ink}" stroke-width="2"/>`+[30,100,170,240,310].map(d=>`<g transform="translate(40 32) rotate(${d})">${key(19,0,.6)}</g>`).join("")+txt(40,39,"*",14,C.red)+no(92,40,1.2),
        bg(1)+server(24,54,.8)+pass(24,24,C.yel)+gear(62,40,.8)+txt(62,64,"SDK",8,C.blue)+arrowR(76,40,90)+key(104,40,.7)+clock(104,62,.6,1),
        bg(2)+tk(60,16,"s3:GetObject",'#fff',62,7.5)+bucket(34,56,1)+ok(34,30,.7)+bucket(88,56,1,C.grey)+no(88,30,.7) ],
    l:[["ключи от всего — плохо","keys to all — bad"],["SDK сам берёт креды","the SDK fetches creds"],["права на один ресурс","rights on one resource"]],
    c:["Связку ключей от всего не ношу. У сервера роль, SDK сам берёт временный ключ к одной двери.","No key ring for everything. The server has a role; the SDK gets a temp key to one door."] };

  Z[A+"EC2 — просто виртуалка"]={
    p:[ bg(0)+server(34,54,.9)+coin(76,28)+coin(92,28)+coin(108,28)+ok(90,56),
        bg(1)+cal(36,42,"12")+coin(80,42)+coin(98,42),
        bg(2)+`<g opacity=".45">${server(34,54,.9)}</g>`+no(34,22)+coin(76,28)+clock(92,56,1,2)+txt(92,78,"2 min",7.5,C.red),
        bg(3)+[14,30,46].map(x=>env(x,44,.55)).join("")+arrowR(58,44,72)+`<g opacity=".4">${server(86,54,.6)}</g>`+no(86,24,.7)+server(108,54,.6)+ok(108,24,.7) ],
    l:[["on-demand: дорого, надёжно","on-demand: pricey, solid"],["reserved: дешевле за год","reserved: a year, cheaper"],["spot: копейки, но заберут","spot: cheap, can vanish"],["spot — для очередей","spot — for queue workers"]],
    c:["Spot дешевле в разы, но его могут забрать за две минуты. Годится тем, кто переживёт смерть.","Spot is far cheaper but can be taken back in two minutes. Fine for work that survives it."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 7 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* свои детали */
  const pill=(x,y,t,col,fg,sz)=>{ sz=sz||8; const w=String(t).length*sz*.62+8;
    return `<rect x="${(x-w/2).toFixed(1)}" y="${(y-sz*.8).toFixed(1)}" width="${w.toFixed(1)}" height="${(sz*1.6).toFixed(1)}" rx="${(sz*.8).toFixed(1)}" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.1"/>`+txt(x,(y+sz*.35).toFixed(1),t,sz,fg||C.ink); };
  const ar=(x1,y1,x2,y2,col,dash)=>{ const a=Math.atan2(y2-y1,x2-x1),h=5,c=col||C.ink;
    const p=(k)=>[(x2-h*Math.cos(a+k)).toFixed(1),(y2-h*Math.sin(a+k)).toFixed(1)]; const p1=p(-.55),p2=p(.55);
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="2" stroke-linecap="round" ${dash?'stroke-dasharray="3 2.5"':""}/><path d="M${p1[0]} ${p1[1]} L${x2} ${y2} L${p2[0]} ${p2[1]}" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const zone=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${col||"none"}" stroke="${C.ink}" stroke-width="1.1" stroke-dasharray="4 3" opacity=".75"/>`;
  const R=(x,y,w,h,f,rx)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx==null?2:rx}" fill="${f}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const ln=(d,col,w,dash)=>`<path d="${d}" stroke="${col||C.ink}" stroke-width="${w||1.6}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${dash?'stroke-dasharray="3 2.5"':""}/>`;
  const bars=(x,base,vals,w,gap,cols)=>vals.map((v,i)=>`<rect x="${x+i*(w+gap)}" y="${base-v}" width="${w}" height="${v}" rx="1.5" fill="${Array.isArray(cols)?cols[i%cols.length]:cols}"/>`).join("");
  const bucket=(x,y,s,lab)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-15 -14 L-11 12 H11 L15 -14 Z" fill="${C.red}" stroke="${C.ink}" stroke-width="1.3"/><ellipse cx="0" cy="-14" rx="15" ry="4" fill="#f9b4b4" stroke="${C.ink}" stroke-width="1.3"/>${txt(0,4,lab||"S3",9,"#fff")}</g>`;
  const ctr=(x,y,s,col,lab)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-14" y="-9" width="28" height="18" rx="2" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2"/>${[-8,-3,2,7].map(d=>`<path d="M${d} -6 v12" stroke="#fff" stroke-width="1.2" opacity=".55"/>`).join("")}${lab?txt(0,3.5,lab,8,"#fff"):""}</g>`;
  const ice=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#cfeaff" stroke="${C.blue}" stroke-width="1.3" opacity=".9"/>`+txt(x+w-6,y+9,"*",10,C.blue);
  const scr=(x,y,w,h,inner)=>`<g transform="translate(${x} ${y})"><rect x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>${inner||""}</g>`;
  const doc=(x,y,n,col)=>`<g transform="translate(${x} ${y})"><rect x="-7" y="-9" width="14" height="18" rx="1.5" fill="#fff" stroke="${C.ink}" stroke-width="1.1"/>${Array.from({length:n||3}).map((_,i)=>`<path d="M-4 ${-5+i*4} h8" stroke="${col||C.grey}" stroke-width="1.4"/>`).join("")}</g>`;
  const bell=(x,y,s,on)=>`<g transform="translate(${x} ${y}) scale(${s||1})">${on?`<path d="M-13 -6 q-3 6 0 12 M13 -6 q3 6 0 12" stroke="${C.red}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`:""}<path d="M-8 6 q0 -16 8 -16 q8 0 8 16 z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.3"/><path d="M-10 6 h20" stroke="${C.ink}" stroke-width="1.8" stroke-linecap="round"/><circle cy="9" r="2.2" fill="${C.ink}"/></g>`;
  const car=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-18 -4 v-6 q0 -3 3 -3 h5 l5 -7 h12 l6 7 h4 q3 0 3 3 v6 z" fill="${col||C.red}" stroke="${C.ink}" stroke-width="1.2"/><circle cx="-10" cy="-3" r="4" fill="${C.ink}"/><circle cx="10" cy="-3" r="4" fill="${C.ink}"/></g>`;
  const shelf=(x,y,w)=>`<rect x="${x}" y="${y}" width="${w}" height="4" rx="1.5" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1"/>`;
  const cup=(x,y,steam)=>`<g transform="translate(${x} ${y})"><path d="M-8 -12 h16 v10 a8 8 0 0 1 -16 0 z" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><path d="M8 -9 q6 0 5 5 q-1 3 -5 3" fill="none" stroke="${C.ink}" stroke-width="1.3"/>${steam?`<path d="M-3 -15 q3 -4 0 -8 M3 -15 q3 -4 0 -8" stroke="${C.grey}" stroke-width="1.5" fill="none"/>`:""}</g>`;

  const Z={};
  const A="AWS|", D="Выкатка|", O="Наблюдаемость|", PG="Prometheus и Grafana|", PF="Профилирование|", L="Linux для бэкендера|", E="Что ещё встретишь|";

  /* ---------------- AWS ---------------- */
  Z[A+"S3 — объектное хранилище"]={
    p:[ bg(0)+bot(26,82,.8,{arms:"hold"})+box(26,68,14,12)+key(26,50,.55)+arrowR(42,50,58)+
          shelf(64,34,50)+shelf(64,62,50)+box(76,34,14,13,"1")+box(96,34,14,13,"2")+box(86,62,14,13,"7"),
        bg(1)+zone(8,14,48,58,"#fff6d6")+box(32,62,22,20)+coin(20,26,.8)+coin(32,26,.8)+coin(44,26,.8)+
          zone(64,14,48,58,"#e8f6ff")+box(88,62,22,20)+ice(74,38,28,26)+coin(88,26,.8),
        bg(2)+ice(70,40,30,32)+box(85,68,18,16)+bot(30,82,.8,{arms:"reach",mood:"sad"})+clock(72,20,.9,5)+coin(98,20,.8)+txt(108,23,"+",11,C.red),
        bg(3)+bucket(24,48,1.1)+server(62,38,.7)+no(72,24,.8)+kid(100,82,.9,C.grn)+phone(86,56,.6)+curve(40,40,82,46,C.grn,true)+pill(60,70,"URL",C.yel,C.ink,7.5) ],
    l:[["кладу по ключу","put it by a key"],["лёд хранить дешевле","cold storage costs less"],["достать — ждать и платить","fetching: wait and pay"],["ссылка прямо клиенту","a link straight to client"]],
    c:["Файл лежит по ключу. Архив дешёвый, но достать платно. Клиенту даю ссылку, а не ношу сам.","Files sit under a key. Archive is cheap, fetching costs. Clients get a link, I don't carry it."] };

  Z[A+"RDS: multi-AZ и реплики — разные вещи"]={
    p:[ bg(0)+zone(6,14,48,58)+zone(66,14,48,58)+db(30,48,.9)+db(90,48,.9,C.grey)+ar(46,40,74,40,C.blue,true)+kid(64,84,.55,C.red)+no(102,24,.7),
        bg(1)+zone(6,14,48,58)+zone(66,14,48,58)+db(30,48,.9,C.grey)+no(30,48,1)+db(90,48,.9)+ok(104,24,.8)+spark(76,24),
        bg(2)+db(26,48,.9)+ar(42,40,62,40,C.blue)+db(84,48,.9,"#9bc7f0")+kid(66,84,.5,C.red)+kid(84,84,.5,C.grn)+kid(102,84,.5,C.yel)+ok(104,22,.7),
        bg(3)+db(26,46,.9)+txt(26,48,"5",12,"#fff")+db(90,46,.9,"#9bc7f0")+txt(90,48,"4",12,"#fff")+clock(58,30,1,3)+ar(44,54,72,54,C.ink,true) ],
    l:[["запасной: читать нельзя","standby: no reading"],["авария — он встаёт","crash — standby steps in"],["реплика — для чтения","replica is for reads"],["но чуть отстаёт","but lags a bit"]],
    c:["Запасная база ждёт аварии и молчит. Реплика отвечает на чтение, но чуть отстаёт.","The standby just waits for a crash. A replica serves reads but lags a little behind."] };

  Z[A+"Где запускать контейнеры"]={
    p:[ bg(0)+cloud(60,30,1.4)+ctr(60,30,.7,C.blue)+coin(96,52,.8)+bot(28,82,.8,{mood:"smile",arms:"up"})+pill(96,68,"Fargate",C.yel,C.ink,7),
        bg(1)+`<g transform="translate(70 36)"><circle r="20" fill="#fff" stroke="${C.blue}" stroke-width="3"/>${[0,1,2,3,4,5,6].map(i=>`<path d="M0 0 L0 -20" stroke="${C.blue}" stroke-width="2.4" transform="rotate(${i*51.4})"/>`).join("")}<circle r="5" fill="${C.blue}"/></g>`+gear(102,62,.6)+gear(40,22,.5)+kid(24,82,.9,C.ink,"wow")+pill(70,66,"k8s",C.blue,"#fff",7.5),
        bg(2)+ctr(30,56,.9,C.blue)+coin(30,30,.9)+txt(60,46,"<",18,C.ink)+ctr(92,62,.8,C.blue)+kid(80,40,.45,C.ink)+coin(98,26,.8)+coin(108,34,.8)+coin(98,40,.8) ],
    l:[["серверы не мои","the servers aren't mine"],["свой k8s — нужен мастер","own k8s needs an expert"],["одной команде — дешевле","cheaper for one team"]],
    c:["Fargate: отдал задачу и плачу за неё. Kubernetes мощнее, но без знатока не взлетит.","Fargate: hand over the task and pay for it. Kubernetes is stronger but needs an expert."] };

  Z[A+"Lambda и почему Java там болит"]={
    p:[ bg(0)+bot(36,82,.8,{mood:"think"})+txt(52,28,"z",10,C.blue)+txt(58,20,"z",12,C.blue)+env(92,36,.8)+ar(92,50,92,60)+coin(92,68,.8),
        bg(1)+cup(36,64,false)+txt(36,32,"JVM",9)+ice(20,40,32,12)+clock(80,34,1.1,9)+txt(80,62,"3 s",13,C.red)+kid(108,82,.55,C.yel,"sad"),
        bg(2)+cup(30,60,true)+ar(46,46,62,46)+card(82,44,30,28,"#fff",cup(0,8,true))+spark(102,26)+txt(82,74,"0.2 s",10,C.grn),
        bg(3)+chip(40,40,txt(0,3,"Graal",6.5,"#fff"))+ar(62,40,78,40)+txt(96,44,"0.05 s",10,C.grn)+spark(96,24)+ok(96,62,.8) ],
    l:[["спит, плачу за вызов","asleep, pay per call"],["Java долго греется","Java warms up slowly"],["снимок тёплой JVM","snapshot of a warm JVM"],["или нативный образ","or a native image"]],
    c:["Пока зовут — плачу, нет — сплю. Java просыпается долго, поэтому берут снимок или натив.","I pay per call and sleep in between. Java wakes slowly, so use a snapshot or native image."] };

  Z[A+"SQS: очередь с тремя грабельками"]={
    p:[ bg(0)+[["3",C.blue],["1",C.blue],["1",C.red],["2",C.blue]].map((e,i)=>env(18+i*24,40+(i%2?8:-4),.7,"#fff")+pill(18+i*24,24+(i%2?8:-4),e[0],e[1],"#fff",8)).join("")+txt(90,72,"!",14,C.red)+spark(30,66,C.yel)+spark(66,66,C.yel),
        bg(1)+[1,2,3].map((n,i)=>env(22+i*26,44,.7)+pill(22+i*26,28,String(n),C.grn,"#fff",8)).join("")+ok(102,40,.8)+clock(102,64,.7,2)+coin(84,64,.7),
        bg(2)+bot(30,82,.8,{arms:"hold"})+env(30,62,.55)+`<g opacity=".35">${env(84,40,.8)}</g>`+ln("M70 28 h28 v24 h-28 z",C.ink,1.2,true)+clock(102,66,.75,4),
        bg(3)+bot(24,82,.7,{arms:"hold",mood:"sad"})+env(24,65,.5)+clock(56,22,.8,11)+env(66,48,.7)+ar(76,48,92,48,C.red)+kid(104,82,.75,C.grn,"wow")+no(56,62,.7) ],
    l:[["быстро, но вразнобой","fast but out of order"],["FIFO: по порядку, дороже","FIFO: in order, pricier"],["взял — скрыто от других","taken — hidden from others"],["не успел — берёт второй","too slow — 2nd one takes"]],
    c:["Взял письмо — оно спрятано, пока часы тикают. Не успел — его возьмёт кто-то ещё.","I take a message and it hides while the clock runs. Too slow, and someone else grabs it."] };

  Z[A+"DLQ — куда падает то, что не обработалось"]={
    p:[ bg(0)+env(52,40,.9,"#ffd6d6")+`<path d="M52 18 a22 22 0 1 1 -21 26" fill="none" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 2"/>`+txt(90,24,"1 2 3",9,C.red)+bot(96,82,.6,{mood:"sad"}),
        bg(1)+env(22,40,.8,"#ffd6d6")+ar(38,42,66,58,C.red)+box(86,74,30,22,"DLQ",C.grey)+txt(22,24,"x3",9,C.red),
        bg(2)+[0,1,2,3].map(i=>env(18+i*22,42,.6)).join("")+ar(96,42,110,42,C.grn)+ok(100,22,.7)+bot(60,82,.5,{mood:"smile"}),
        bg(3)+box(36,74,34,24,"DLQ",C.grey)+bars(70,70,[6,12,22,34],7,3,C.red)+bell(98,18,.7,true) ],
    l:[["битое крутится снова","the broken one loops"],["после N — в отдельный ящик","after N — to its own box"],["очередь снова идёт","the queue moves again"],["ящик растёт — тревога","box grows — alarm"]],
    c:["Кривое письмо после трёх попыток кладу в отдельный ящик. Если ящик растёт — что-то сломалось.","After three failed tries a bad message goes to its own box. If the box grows, something broke."] };

  Z[A+"SNS, EventBridge и MSK — что когда"]={
    p:[ bg(0)+env(22,40,.8)+ar(38,40,72,22)+ar(38,40,72,42)+ar(38,40,72,62)+kid(88,30,.5,C.red)+kid(88,52,.5,C.grn)+kid(88,74,.5,C.yel)+pill(22,62,"SNS",C.yel,C.ink,7),
        bg(1)+env(18,26,.6,"#ffd6d6")+env(18,52,.6,"#d6e8ff")+gear(56,40,.9)+ar(68,34,92,22,C.red)+ar(68,46,92,60,C.blue)+box(104,30,14,12,null,C.red)+box(104,68,14,12,null,C.blue),
        bg(2)+`<rect x="8" y="30" width="104" height="18" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+[1,2,3,4,5,6].map(i=>txt(8+i*16-8,43,String(i),9,C.ink)+(i<6?`<path d="M${8+i*16} 30 v18" stroke="${C.grey}"/>`:"")).join("")+curve(98,54,22,56,C.blue,true)+pill(60,70,"Kafka",C.blue,"#fff",7.5),
        bg(3)+[0,1,2,3,4,5].map(i=>`<circle cx="${12+i*9}" cy="${40+(i%2?4:-4)}" r="3" fill="${C.blue}"/>`).join("")+ar(64,40,74,40)+scr(96,40,36,30,ln("M-14 8 L-6 0 L0 4 L8 -8 L14 -4",C.grn,2))+pill(36,66,"Kinesis",C.yel,C.ink,7) ],
    l:[["одно — всем подписчикам","one to all subscribers"],["по правилам — кому надо","by rules — to who needs"],["лог: можно перечитать","a log you can replay"],["поток для графиков","a stream for charts"]],
    c:["Выбираю по вопросу: нужно ли перечитывать историю? Да — Kafka. Нет — рассылка или правила.","I ask: do I need to replay history? Yes — Kafka. No — a broadcast or rules routing."] };

  Z[A+"Вход трафика: ALB, Route 53, CloudFront"]={
    p:[ bg(0)+phone(24,44,1,txt(0,4,"?",11,C.blue))+ar(38,40,58,40)+paper(80,40,["DNS","→","1.2.3.4"])+pill(80,70,"R53",C.yel,C.ink,7),
        bg(1)+server(18,42,.7)+[[54,24],[90,30],[62,60],[100,62]].map(p=>cloud(p[0],p[1],.6)).join("")+lock(62,58,.5)+kid(100,84,.45,C.grn)+pill(24,72,"CDN",C.yel,C.ink,7),
        bg(2)+pill(22,40,"ALB",C.blue,"#fff",8)+ar(36,38,62,22)+ar(36,42,62,60)+pill(48,18,"/api",null,C.ink,6.5)+pill(48,66,"/img",null,C.ink,6.5)+server(88,24,.55)+server(88,62,.55),
        bg(3)+pill(24,40,"NLB",C.blue,"#fff",8)+`<path d="M58 22 L48 44 H60 L52 66 L76 36 H64 L72 22 Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.2"/>`+server(96,42,.7)+pill(96,72,"IP",null,C.ink,7) ],
    l:[["DNS: имя → адрес","DNS: name → address"],["копии рядом с людьми","copies near the people"],["ALB: по пути — в нужный","ALB: by path to the right"],["NLB: просто и быстро","NLB: simple and fast"]],
    c:["Сначала узнаём адрес, потом берём копию поближе, а у двери вахтёр ведёт в нужную комнату.","First find the address, then a nearby copy, then a guard sends you to the right room."] };

  Z[A+"CloudWatch и неожиданный счёт"]={
    p:[ bg(0)+[0,1,2,3,4].map(i=>doc(20+i*4,62-i*8,3)).join("")+[0,1,2,3,4,5,6].map(i=>doc(56+(i%3)*4,64-i*6,3)).join("")+coin(96,30,1)+coin(102,44,1)+coin(94,58,1)+bot(110,82,.45,{mood:"wow"}),
        bg(1)+scr(40,36,48,32,ln("M-18 10 L-8 0 L0 4 L10 -10 L18 -6",C.blue,2))+[0,1,2,3].map(i=>coin(26+i*10,66,.7)).join("")+txt(90,40,"×",14)+txt(104,40,"N",12)+bot(96,82,.5,{mood:"sad"}),
        bg(2)+[0,1].map(i=>doc(24+i*6,56-i*6,3)).join("")+clock(30,24,.8,7)+txt(52,28,"7",10)+scr(84,42,40,28,ln("M-14 6 L-4 -2 L6 2 L14 -8",C.grn,2))+ok(104,64,.8)+bot(56,84,.55,{arms:"up"}) ],
    l:[["логов гора — счёт гора","heaps of logs, big bill"],["каждая метрика платная","each metric is paid"],["хранить мало и недолго","keep less, for less long"]],
    c:["Каждая строчка лога и каждая метрика стоят денег. Храню неделю и меряю только главное.","Every log line and every metric costs money. I keep a week and measure only what matters."] };

  Z[A+"Секреты: Secrets Manager и Parameter Store"]={
    p:[ bg(0)+laptop(46,62,1.4)+`<rect x="58" y="22" width="18" height="16" fill="${C.yel}" transform="rotate(8 67 30)"/>`+txt(67,33,"***",8,C.ink)+no(92,24,.9)+bot(100,84,.5,{mood:"sad"}),
        bg(1)+box(32,66,30,22,null,C.wood)+key(32,52,.6)+coin(32,22,.7)+`<g transform="translate(86 46)"><rect x="-17" y="-20" width="34" height="38" rx="3" fill="#7d8597" stroke="${C.ink}" stroke-width="1.3"/><circle r="7" fill="#fff" stroke="${C.ink}"/><path d="M0 0 v-5" stroke="${C.ink}" stroke-width="1.6"/></g>`+curve(70,22,100,22,C.grn)+coin(78,78,.6)+coin(88,78,.6)+coin(98,78,.6),
        bg(2)+bot(28,82,.8,{arms:"reach"})+pill(28,28,"IAM",C.blue,"#fff",7)+ar(44,58,68,58)+`<g transform="translate(88 50)"><rect x="-15" y="-18" width="30" height="34" rx="3" fill="#7d8597" stroke="${C.ink}" stroke-width="1.3"/><circle r="6" fill="#fff" stroke="${C.ink}"/></g>`+key(86,24,.6) ],
    l:[["пароль на стикере — нет","no sticky-note password"],["сейф дороже, но меняет сам","safe costs more, rotates"],["беру по своей роли","I fetch it by my role"]],
    c:["Пароля в коде нет. На старте я показываю свою роль и забираю его из сейфа.","No password in the code. At start I show my role and take it from the safe."] };

  Z[A+"За что реально приходит счёт"]={
    p:[ bg(0)+server(40,46,.9)+coin(76,46,.9)+txt(96,50,"$",12,C.grn)+bot(96,84,.45,{mood:"smile"}),
        bg(1)+`<path d="M18 74 V30 h30 V74" fill="none" stroke="${C.ink}" stroke-width="2.4"/><path d="M18 30 q15 -14 30 0" fill="none" stroke="${C.ink}" stroke-width="2.4"/>`+pill(33,52,"NAT",C.yel,C.ink,7)+clock(70,26,.8,3)+txt(88,30,"+",12,C.red)+coin(70,56,.7)+coin(82,56,.7)+coin(94,56,.7)+txt(104,60,"GB",7),
        bg(2)+cloud(92,26,1)+server(26,46,.7)+ar(40,40,74,30,C.red)+ar(40,52,74,58,C.red)+zone(70,46,40,24)+coin(58,26,.6)+coin(58,64,.6),
        bg(3)+[0,1,2].map(i=>`<g opacity=".7">${db(26+i*30,60,.6,C.grey)}</g>`).join("")+ln("M14 30 l6 -4 M44 28 l6 -4 M74 30 l6 -4",C.grey,1.4)+coin(40,22,.7)+coin(70,20,.7)+coin(100,22,.7) ],
    l:[["сервер — не главное","servers aren't the bill"],["NAT: за час и за гигабайт","NAT: per hour and per GB"],["трафик наружу и меж зон","egress and cross-zone"],["забытые диски и снимки","forgotten disks, snapshots"]],
    c:["Разоряют не серверы, а мелочи: шлюз, трафик наружу и диски, про которые все забыли.","Servers aren't what ruins you: it's the gateway, outbound traffic and forgotten disks."] };

  Z[A+"Типовая связка для Java-сервиса"]={
    p:[ bg(0)+phone(16,44,.8,txt(0,4,"?",9,C.blue))+ar(26,44,38,44)+pill(52,44,"R53",C.yel,C.ink,7)+ar(64,44,76,44)+pill(94,44,"CDN",C.yel,C.ink,7),
        bg(1)+pill(22,40,"ALB",C.blue,"#fff",7.5)+ar(36,40,52,40)+ctr(78,30,.8,C.blue)+ctr(78,52,.8,C.blue)+pill(78,72,"ECS",C.yel,C.ink,7),
        bg(2)+box(30,64,26,20,"ECR",C.wood)+ar(46,50,62,50)+ctr(88,50,.9,C.blue,"java")+spark(104,28),
        bg(3)+ctr(22,44,.7,C.blue)+ar(34,44,52,36)+ar(34,44,52,58)+db(70,38,.65)+pill(96,34,"RDS",null,C.ink,7)+`<rect x="58" y="54" width="24" height="14" rx="3" fill="${C.red}" stroke="${C.ink}" stroke-width="1.1"/>`+txt(70,64,"Redis",7,"#fff")+ok(100,62,.6),
        bg(4)+ctr(22,44,.7,C.blue)+ar(34,40,52,28)+ar(34,48,52,62)+env(70,26,.6)+pill(98,26,"SQS",C.yel,C.ink,7)+bucket(72,64,.65)+pill(100,64,"S3",null,C.ink,7),
        bg(0)+ctr(60,44,.8,C.blue)+lock(26,40,.8)+pill(26,62,"SM",C.yel,C.ink,7)+scr(96,40,30,24,ln("M-10 6 L-2 -2 L4 2 L10 -6",C.grn,2))+pill(96,66,"CW",C.yel,C.ink,7)+ar(38,42,48,42)+ar(74,42,80,42) ],
    l:[["адрес и копии рядом","address, nearby copies"],["балансёр и контейнеры","balancer and containers"],["образ берём из ECR","image comes from ECR"],["база и кэш","database and cache"],["фон — SQS, файлы — S3","jobs: SQS, files: S3"],["пароли и логи","passwords and logs"]],
    c:["Скучная схема, где всё на своём месте. Именно её и ждут услышать на собеседовании.","A boring setup with everything in its place. That's exactly what interviewers expect."] };

  Z[A+"Что реально спросят Java-бэкендеру"]={
    p:[ bg(0)+paper(36,40,["S3","SQS","RDS"])+no(58,22,.8)+kid(92,82,.9,C.ink,"sad")+bubble(94,22,22,txt(0,4,"?",11,C.red)),
        bg(1)+kid(24,82,.9,C.ink)+bubble(30,24,34,txt(0,4,"SQS ×2 ?",7.5,C.ink))+bot(92,82,.8,{mood:"think",glasses:true})+think(92,14,txt(11,2,"id ✓",8,C.grn)),
        bg(2)+bot(30,82,.8,{mood:"smile",arms:"reach"})+scr(84,38,44,36,pill(-10,-6,"A",C.blue,"#fff",7)+pill(12,8,"B",C.grn,"#fff",7)+ar(-4,-2,6,6))+ok(104,68,.7) ],
    l:[["список названий — мимо","a list of names misses"],["спросят про решения","they ask about decisions"],["не знаешь — объясни модель","don't know? explain it"]],
    c:["Не зубри названия. Покажи, что понимаешь, что сломается и почему. Не знаешь — так и скажи.","Don't memorize names. Show what breaks and why. If you don't know, say so honestly."] };

  /* ---------------- Выкатка ---------------- */
  Z[D+"Один артефакт на все среды"]={
    p:[ bg(0)+gear(32,40,1.2)+ar(50,40,66,40)+box(88,58,30,26,"v1.4",C.wood)+spark(104,22),
        bg(1)+[["test",22],["stage",60],["prod",98]].map(e=>shelf(e[1]-16,56,32)+box(e[1],56,22,18,"v1.4",C.wood)+txt(e[1],76,e[0],7.5,C.ink)).join("")+ok(60,20,.8),
        bg(2)+box(28,56,24,20,"v1.4",C.wood)+ok(28,24,.7)+ar(46,46,62,46,C.red,true)+box(88,56,24,20,"v1.4'",C.wood2)+no(88,24,.7)+txt(60,72,"≠",16,C.red) ],
    l:[["собрали один раз","built once"],["этот же едет везде","same box goes everywhere"],["пересобрал — не то","rebuilt is not the same"]],
    c:["На прод едет ровно та коробка, которую проверили. Пересобрал — значит, не проверял.","Prod gets exactly the box we tested. Rebuild it and you've tested nothing."] };

  Z[D+"Пайплайн: дешёвое впереди"]={
    p:[ bg(0)+pill(18,40,"1s",C.grn,"#fff",7.5)+ar(28,40,38,40)+pill(50,40,"10s",C.grn,"#fff",7.5)+ar(62,40,72,40)+db(94,42,.65)+env(110,24,.4)+txt(94,70,"5 min",8,C.red),
        bg(1)+pill(18,40,"1s",C.red,"#fff",7.5)+no(18,22,.7)+`<g opacity=".3">${pill(50,40,"10s",C.grey,"#fff",7.5)+db(94,42,.65,C.grey)}</g>`+bot(60,84,.55,{mood:"smile"})+coin(100,66,.6),
        bg(2)+`<g opacity=".9">${db(22,42,.65)}</g>`+txt(22,70,"5 min",8,C.red)+ar(40,40,58,40)+pill(76,40,"1s",C.red,"#fff",7.5)+no(76,22,.7)+bot(104,84,.5,{mood:"sad"})+clock(100,22,.6,10) ],
    l:[["быстрое — вперёд","fast checks first"],["упало рано — дёшево","failed early — cheap"],["наоборот — ждали зря","reversed: wasted waiting"]],
    c:["Сначала проверяю то, что быстро. Упадёт — узнаем за секунды, а не через пять минут.","I run the quick checks first. If it fails, we know in seconds, not after five minutes."] };

  Z[D+"Blue-green: откат за секунды"]={
    p:[ bg(0)+server(30,44,.9)+`<rect x="18" y="22" width="24" height="44" rx="3" fill="${C.blue}" opacity=".25"/>`+server(90,44,.9)+`<rect x="78" y="22" width="24" height="44" rx="3" fill="${C.grn}" opacity=".25"/>`+kid(30,84,.4,C.red)+gear(104,20,.5)+ar(10,78,22,78),
        bg(1)+server(22,44,.8)+server(98,44,.8)+sw(60,40,true,1.4)+ar(66,40,84,40,C.grn)+kid(98,84,.4,C.red)+ok(60,68,.7),
        bg(2)+server(22,44,.8)+server(98,44,.8,false)+no(98,22,.6)+sw(60,40,false,1.4)+ar(54,40,36,40,C.blue)+kid(22,84,.4,C.red)+clock(60,70,.6,1) ],
    l:[["рядом готовим второй","the second warms up"],["щёлк — люди там","click — users move over"],["плохо? щёлк обратно","bad? click back"]],
    c:["Новая версия уже прогрета рядом. Переключаю рубильник, а если что — щёлкаю обратно.","The new version is already warm next door. I flip the switch, and flip it back if needed."] };

  Z[D+"Миграции БД — то, что откат не спасёт"]={
    p:[ bg(0)+R(14,22,44,40,"#fff")+ln("M14 34 h44 M36 22 v40",C.ink,1)+`<rect x="36" y="22" width="22" height="40" fill="${C.red}" opacity=".3"/>`+no(47,42,.7)+pill(88,30,"v1",C.blue,"#fff",8)+no(88,58,.9),
        bg(1)+R(10,22,60,40,"#fff")+ln("M10 34 h60 M30 22 v40 M50 22 v40",C.ink,1)+`<rect x="50" y="22" width="20" height="40" fill="${C.grn}" opacity=".35"/>`+txt(60,32,"+",10,C.grn)+pill(96,30,"v1",C.blue,"#fff",8)+ok(96,56,.8),
        bg(2)+R(10,22,60,40,"#fff")+ln("M10 34 h60 M30 22 v40 M50 22 v40",C.ink,1)+`<rect x="50" y="22" width="20" height="40" fill="${C.grn}" opacity=".35"/>`+pill(96,30,"v2",C.grn,"#fff",8)+ar(86,44,66,48,C.grn)+ok(100,62,.7),
        bg(3)+R(20,22,40,40,"#fff")+ln("M20 34 h40 M40 22 v40",C.ink,1)+`<rect x="40" y="22" width="20" height="40" fill="${C.grn}" opacity=".35"/>`+pill(92,30,"v2",C.grn,"#fff",8)+ok(92,56,.9)+spark(64,18) ],
    l:[["снёс колонку — v1 упал","dropped column: v1 dies"],["1) сначала добавь","1) add first"],["2) код на новую","2) switch the code"],["3) потом удали старую","3) then drop the old one"]],
    c:["Код откатить можно, данные — нет. Поэтому: добавь, переключись, и только потом удаляй.","Code rolls back, data doesn't. So: add, switch over, and only then delete."] };

  /* ---------------- Наблюдаемость ---------------- */
  Z[O+"Почему без неё ты слепой"]={
    p:[ bg(0)+server(34,44,.9)+ar(50,44,66,44)+doc(84,42,4)+bot(100,84,.5,{mood:"smile"})+ok(84,20,.6),
        bg(1)+[[16,20],[40,30],[64,18],[88,28],[106,46],[22,52],[50,58],[80,56],[100,22]].map(p=>`<rect x="${p[0]-5}" y="${p[1]-5}" width="10" height="10" rx="2" fill="#4a5168"/>`).join("")+ln("M16 20 L40 30 L22 52 L50 58 L64 18 L80 56 L106 46",C.red,1.4,true)+bot(60,86,.4,{mood:"wow"})+txt(76,74,"?",12,C.red),
        bg(2)+[[20,30],[44,30],[68,30],[92,30]].map((p,i)=>`<rect x="${p[0]-6}" y="${p[1]-6}" width="12" height="12" rx="2" fill="${i===2?C.red:C.grn}"/>`).join("")+ln("M26 30 h12 M50 30 h12 M74 30 h12",C.ink,1.4)+mag(68,30,1.1)+bot(30,84,.5,{glasses:true,mood:"smile"}) ],
    l:[["один сервис — лог хватает","one app: a log is enough"],["сорок — ничего не понять","forty: you see nothing"],["вид сверху — нашёл","from above — found it"]],
    c:["Когда запрос бегает через семь сервисов, по одному логу причину не найти. Нужен вид сверху.","When a request runs through seven services, one log can't tell why. You need a view from above."] };

  Z[O+"Три разные вещи: логи, метрики, трейсы"]={
    p:[ bg(0)+paper(40,40,["12:01","ERR","12:02"])+bot(90,82,.7,{mood:"think",glasses:true}),
        bg(1)+scr(60,40,84,50,ln("M-36 14 L-22 6 L-10 10 L2 -6 L14 0 L26 -14 L36 -8",C.blue,2.2)+ln("M-38 20 h76 M-38 20 v-40",C.ink,1)),
        bg(2)+[["A",0,80,C.blue],["B",10,40,C.grn],["C",22,20,C.red]].map((r,i)=>txt(14,30+i*14,r[0],8)+`<rect x="${22+r[1]}" y="${23+i*14}" width="${r[2]}" height="9" rx="2" fill="${r[3]}"/>`).join("")+txt(60,74,"120 ms",9) ],
    l:[["лог: что случилось","log: what happened"],["метрика: число во времени","metric: a number over time"],["трейс: путь одного запроса","trace: one request's path"]],
    c:["Дневник, прибор и маршрут. По дневнику график не построишь, по графику путь не узнаешь.","Diary, gauge and route. A diary can't draw a graph, and a graph can't show the path."] };

  Z[O+"Сквозной идентификатор запроса"]={
    p:[ bg(0)+[22,60,98].map((x,i)=>server(x,36,.6)+pill(x,64,"#42",C.yel,C.ink,7.5)).join("")+ar(32,30,48,30,C.ink)+ar(70,30,86,30,C.ink),
        bg(1)+[[24,24],[56,34],[90,22],[30,58],[70,60],[100,50]].map((p,i)=>doc(p[0],p[1],3)).join("")+txt(60,48,"?",18,C.red)+bot(96,86,.4,{mood:"sad"}),
        bg(2)+mag(22,32,1)+pill(22,58,"#42",C.yel,C.ink,7.5)+[0,1,2].map(i=>doc(62+i*20,34+i*10,3)+pill(62+i*20,52+i*10,"#42",C.yel,C.ink,6)).join("")+ln("M62 44 L82 54 L102 64",C.grn,1.4,true) ],
    l:[["один номер через всех","one number through all"],["без него — каша","without it — a mess"],["нашёл по номеру всё","found it all by number"]],
    c:["Каждый сервис пишет в лог один и тот же номер запроса. По нему вся история собирается.","Every service logs the same request number. With it the whole story comes together."] };

  Z[O+"Средняя задержка врёт"]={
    p:[ bg(0)+bars(14,72,[8,8,8,8,8,8,8,8,8,52],7,3,[C.grn,C.grn,C.grn,C.grn,C.grn,C.grn,C.grn,C.grn,C.grn,C.red])+txt(30,30,"20 ms",8,C.grn)+txt(92,16,"1 s",8,C.red),
        bg(1)+bars(14,72,[8,8,8,8,8,8,8,8,8,52],7,3,C.grey)+ln("M10 60 H112",C.blue,2.2,true)+pill(40,42,"avg 100",C.blue,"#fff",7.5)+ok(80,40,.7),
        bg(2)+bars(14,72,[8,8,8,8,8,8,8,8,8,52],7,3,C.grey)+ln("M10 22 H112",C.red,2.2,true)+pill(44,14,"p99 1000",C.red,"#fff",7.5)+kid(60,72,.55,C.yel,"sad") ],
    l:[["девять быстрых, один нет","nine fast, one slow"],["средняя: «всё хорошо»","average: all fine"],["p99: десятому плохо","p99: 1 in 10 suffers"]],
    c:["Средняя прячет беду. Смотрю p95 и p99 — они показывают, как живёт самый невезучий.","The average hides trouble. I look at p95 and p99 — they show the unluckiest user."] };

  /* ---------------- Prometheus и Grafana ---------------- */
  Z[PG+"Prometheus сам ходит и забирает"]={
    p:[ bg(0)+bot(26,82,.8,{arms:"hold",glasses:true})+doc(26,64,3)+ar(44,40,64,30,C.ink,true)+server(84,30,.55)+server(104,48,.55)+clock(60,64,.6,3),
        bg(1)+server(36,44,.8)+server(84,44,.8,false)+no(84,16,.7)+bot(60,86,.4,{mood:"wow"})+txt(100,70,"!",14,C.red),
        bg(2)+[[18,22],[18,40],[18,58],[42,22],[42,58]].map(p=>server(p[0],p[1],.3)).join("")+ar(54,40,72,40,C.grn)+bot(92,82,.65,{mood:"smile"})+ok(108,22,.6) ],
    l:[["сам обхожу по кругу","I walk round myself"],["молчит — сразу видно","silent? seen at once"],["сколько их — не тону","many apps, no flood"]],
    c:["Я сам каждые N секунд хожу и спрашиваю. Кто не ответил — тот, значит, упал.","Every N seconds I go round and ask. Whoever doesn't answer must be down."] };

  Z[PG+"Метрика — это имя и метки"]={
    p:[ bg(0)+box(40,70,46,36,null,C.wood)+pill(40,24,"http_requests",C.yel,C.ink,6.5)+pill(80,44,"POST",null,C.ink,7)+pill(88,60,"500",C.red,"#fff",7),
        bg(1)+bars(22,68,[40,10,4],18,8,[C.grn,C.yel,C.red])+txt(31,78,"200",7)+txt(57,78,"404",7)+txt(83,78,"500",7)+mag(98,24,.7),
        bg(2)+[0,1,2,3,4,5].map(i=>[0,1,2,3].map(j=>`<rect x="${10+i*10}" y="${16+j*14}" width="8" height="10" rx="1" fill="${C.wood}" stroke="${C.wood2}" stroke-width=".6"/>`).join("")).join("")+pill(36,74,"user_id",C.red,"#fff",7)+bot(92,82,.7,{mood:"wow"})+txt(104,22,"10⁶",9,C.red) ],
    l:[["имя и пара ярлыков","a name and a few labels"],["по меткам режут","labels let you slice"],["метка = id — склад лопнул","label = id: storage bursts"]],
    c:["Метка — короткий признак: метод, код ответа. Положишь туда id клиента — рядов будут миллионы.","A label is a short trait: method, status. Put a user id there and you get millions of rows."] };

  Z[PG+"Grafana только рисует"]={
    p:[ bg(0)+db(30,48,1)+pill(30,72,"Prom",C.red,"#fff",7)+ar(48,40,66,40,C.blue,true)+scr(92,40,40,30,ln("M-14 8 L-4 -2 L4 4 L14 -8",C.grn,2))+txt(54,32,"?",10,C.blue),
        bg(1)+server(18,44,.6)+ln("M28 44 h12",C.ink,2)+ln("M46 44 h10",C.ink,2)+no(43,30,.6)+db(70,48,.7)+scr(102,40,26,24,"")+bot(102,84,.45,{mood:"sad"}),
        bg(2)+server(18,44,.6)+ar(28,44,56,44,C.grn)+db(70,48,.7)+scr(102,40,26,24,ln("M-9 6 L-3 -2 L3 2 L9 -6",C.grn,2))+ok(70,20,.6) ],
    l:[["хранит один, рисует другой","one stores, one draws"],["пусто? труба оборвана","empty? the pipe is cut"],["чиним сбор — график жив","fix collection — it draws"]],
    c:["Grafana — только стекло циферблата. Пустой график чиню там, где метрики собирают.","Grafana is just the glass on the gauge. An empty chart is fixed where metrics are collected."] };

  Z[PG+"Алерт — про симптом, а не про причину"]={
    p:[ bg(0)+scr(36,36,52,34,ln("M-22 10 L-10 8 L0 6 L8 -10 L22 -12",C.red,2)+ln("M-24 -2 h48",C.ink,1,true))+txt(64,28,"5%",8,C.red)+bell(92,30,.9,true)+kid(92,82,.6,C.yel,"sad"),
        bg(1)+pill(34,32,"CPU 90%",C.yel,C.ink,8)+bell(86,30,.9,true)+kid(34,82,.6,C.grn)+kid(56,82,.6,C.red)+ok(104,64,.7),
        bg(2)+[[20,20],[44,30],[68,18]].map(p=>bell(p[0],p[1],.6,true)).join("")+bot(96,82,.75,{mood:"think"})+`<path d="M86 42 q10 -10 20 0" stroke="${C.ink}" stroke-width="3" fill="none"/>`+bell(36,60,.8,true)+no(52,52,.6) ],
    l:[["ошибки у людей — звоним","users hit errors — ring"],["процессор занят — норм","busy CPU can be fine"],["звенит зря — не слышат","false alarms get ignored"]],
    c:["Звоню, когда плохо людям, а не когда процессор вспотел. Иначе звонок перестанут слушать.","I ring when users suffer, not when the CPU sweats. Otherwise nobody listens anymore."] };

  /* ---------------- Профилирование ---------------- */
  Z[PF+"Сначала измерь, потом чини"]={
    p:[ bg(0)+R(56,16,56,58,"#e7d6c3")+ln("M70 30 l6 6 M88 50 l6 -6 M74 62 l8 2",C.wood2,2)+txt(66,48,"?",12,C.red)+txt(100,30,"?",12,C.red)+bot(30,82,.8,{mood:"sad",arms:"up"}),
        bg(1)+[["a",80,C.red],["b",8,C.grey],["c",6,C.grey],["d",4,C.grey]].map((r,i)=>txt(14,24+i*14,r[0],8)+`<rect x="22" y="${17+i*14}" width="${r[1]}" height="9" rx="2" fill="${r[2]}"/>`).join("")+txt(70,82,"80% · 2%",8),
        bg(2)+gear(34,40,1)+ar(52,40,68,40)+clock(90,40,1.1,1)+ok(104,64,.7)+txt(34,70,"a",10,C.red) ],
    l:[["долбить наугад","smashing at random"],["цифры: где время","numbers: where time goes"],["чиню главное — быстро","fix the big one — fast"]],
    c:["Не гадаю, а меряю. Обычно всё время съедает одно место, а не то, что я подозревал.","I measure, not guess. Usually one spot eats all the time, and not the one I suspected."] };

  Z[PF+"Heap dump и поиск утечки"]={
    p:[ bg(0)+[0,1,2,3,4,5].map(i=>`<circle cx="${20+(i%3)*14}" cy="${46+Math.floor(i/3)*14}" r="5" fill="${[C.blue,C.grn,C.yel][i%3]}" stroke="${C.ink}"/>`).join("")+`<rect x="70" y="24" width="36" height="28" rx="4" fill="${C.ink}"/><circle cx="88" cy="38" r="8" fill="#9fb4d8" stroke="#fff" stroke-width="2"/>`+spark(108,20),
        bg(1)+[0,1,2,3,4].map(i=>`<rect x="${70}" y="${66-i*10}" width="28" height="8" rx="2" fill="${C.yel}" stroke="${C.ink}"/>`).join("")+ar(54,70,54,24,C.red)+bars(14,70,[6,10],10,4,C.grey)+txt(84,14,"List",8),
        bg(2)+pill(16,24,"root",C.ink,"#fff",7)+ar(28,30,40,44)+`<circle cx="46" cy="50" r="6" fill="${C.blue}" stroke="${C.ink}"/>`+ar(52,52,66,56)+R(70,48,26,20,C.yel)+txt(83,62,"∞",11)+mag(46,50,1.2) ],
    l:[["снимок всей кучи","a snapshot of the heap"],["кто растёт и растёт","what keeps on growing"],["кто держит ссылку","who holds the reference"]],
    c:["Снимок кучи покажет, что растёт и кто за это держится. Утечка — список без выхода.","A heap dump shows what grows and who holds on. A leak is a list that never shrinks."] };

  Z[PF+"JFR — чёрный ящик JVM"]={
    p:[ bg(0)+server(40,44,.9)+`<rect x="70" y="40" width="28" height="22" rx="3" fill="${C.ant}" stroke="${C.ink}" stroke-width="1.3"/>`+`<circle cx="92" cy="45" r="2" fill="${C.red}"/>`+txt(84,56,"JFR",7,"#fff")+ok(84,22,.6),
        bg(1)+`<rect x="8" y="34" width="104" height="16" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+[["GC",C.yel],["sync",C.red],["alloc",C.blue],["GC",C.yel],["io",C.grn]].map((e,i)=>pill(20+i*20,42,e[0],e[1],C.ink,6)).join("")+bot(60,84,.4,{mood:"smile"}),
        bg(2)+`<rect x="8" y="22" width="104" height="16" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`+bars(14,36,[3,4,3,12,3,4,3],9,5,[C.grey,C.grey,C.grey,C.red,C.grey,C.grey,C.grey])+mag(62,30,1)+bot(30,84,.6,{glasses:true,mood:"think"}) ],
    l:[["пишет всегда, почти даром","always on, nearly free"],["все события на ленту","all events on the tape"],["после аварии — смотрим","after a crash — replay"]],
    c:["Самописец в JVM: пишет всё почти даром. После аварии разматываю запись и вижу, что было.","A flight recorder in the JVM: nearly free. After a crash I replay it and see what happened."] };

  Z[PF+"Флеймграф читается за минуту"]={
    p:[ bg(0)+[[10,100,C.red],[10,60,"#ff9b6b"],[72,38,C.ant],[10,44,C.yel],[72,20,C.yel],[12,20,"#ffe08a"]].map((r,i)=>`<rect x="${r[0]}" y="${64-Math.min(i,3)*12-(i>3?12:0)}" width="${r[1]}" height="10" rx="1.5" fill="${r[2]}" stroke="${C.ink}" stroke-width=".7"/>`).join(""),
        bg(1)+`<rect x="10" y="62" width="100" height="10" rx="1.5" fill="${C.red}"/><rect x="10" y="50" width="70" height="10" rx="1.5" fill="#ff9b6b"/><rect x="10" y="38" width="64" height="10" rx="1.5" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.6"/><rect x="82" y="50" width="20" height="10" rx="1.5" fill="${C.ant}"/>`+ln("M10 32 h64",C.blue,2)+txt(42,28,"60%",8,C.blue)+mag(96,26,.8),
        bg(2)+`<rect x="10" y="62" width="100" height="10" rx="1.5" fill="${C.red}"/><rect x="10" y="50" width="30" height="10" rx="1.5" fill="#ff9b6b"/><rect x="10" y="38" width="22" height="10" rx="1.5" fill="${C.yel}"/><rect x="44" y="50" width="20" height="10" rx="1.5" fill="${C.ant}"/>`+clock(88,30,1,1)+ok(104,40,.6) ],
    l:[["полоски — вызовы","bars are calls"],["широкое плато — виновник","the wide plateau is it"],["починил — плато сжалось","fixed — it shrank"]],
    c:["Ширина полоски — сколько времени ушло. Ищу самое широкое плато, и не надо читать код.","Bar width is time spent. I look for the widest plateau, no need to read the code."] };

  Z[PF+"Ищи по симптому, а не по коду"]={
    p:[ bg(0)+bars(14,70,[10,18,28,40],8,3,C.red)+ar(60,40,74,40)+pill(94,32,"GC",C.yel,C.ink,8)+pill(94,52,"alloc",C.yel,C.ink,7),
        bg(1)+pill(26,26,"CPU 5%",C.grn,"#fff",7.5)+clock(26,54,1,7)+ar(44,44,58,44)+db(82,38,.55)+lock(104,40,.6)+cloud(84,68,.5),
        bg(2)+pill(30,26,"CPU 100%",C.red,"#fff",7.5)+gear(30,56,1,C.red)+`<path d="M18 42 q2 -6 0 -10 M42 42 q2 -6 0 -10" stroke="${C.red}" stroke-width="1.5" fill="none"/>`+ar(50,50,66,50)+bot(90,82,.7,{mood:"think",glasses:true})+txt(108,30,"∑",12) ],
    l:[["память растёт — GC","memory grows — check GC"],["процессор спит — ждёшь","CPU idle — you're waiting"],["процессор горит — считаешь","CPU maxed — computing"]],
    c:["Сначала спрашиваю, где болит: память, ожидание или процессор. Это сразу сужает поиск.","First I ask where it hurts: memory, waiting or CPU. That narrows the search at once."] };

  /* ---------------- Linux ---------------- */
  Z[L+"Логи: где они и как смотреть"]={
    p:[ bg(0)+ctr(26,40,1,C.blue)+ar(44,40,60,40)+pill(82,30,"stdout",C.yel,C.ink,7)+pill(82,54,"kubectl logs",null,C.ink,6),
        bg(1)+server(26,44,.8)+ar(40,44,52,44)+pill(84,44,"journalctl -f",null,C.ink,6.5)+bot(90,84,.4,{mood:"smile"}),
        bg(2)+`<rect x="10" y="18" width="70" height="52" rx="3" fill="#2d3142"/>`+[0,1,2,3].map(i=>`<path d="M16 ${28+i*11} h${40+(i%2)*12}" stroke="${i===2?C.red:C.grn}" stroke-width="3"/>`).join("")+ar(45,76,45,66,C.grn)+mag(96,42,1)+pill(96,70,"grep",C.yel,C.ink,7) ],
    l:[["контейнер пишет в вывод","container writes to stdout"],["на машине — журнал","on a host — the journal"],["живой хвост и поиск","live tail and search"]],
    c:["Смотрю не архив за год, а живую ленту: хвост лога, и поиском ловлю нужную строчку.","I don't read a year's archive, just the live feed: tail the log and grep for the line."] };

  Z[L+"Кто съел процессор и память"]={
    p:[ bg(0)+`<rect x="10" y="16" width="100" height="56" rx="3" fill="#2d3142"/>`+["java","nginx","cron"].map((n,i)=>txt(30,32+i*14,n,8,"#fff",700)+`<rect x="54" y="${25+i*14}" width="${[44,12,6][i]}" height="8" rx="2" fill="${[C.red,C.grn,C.grn][i]}"/>`).join(""),
        bg(1)+pill(30,22,"top",C.yel,C.ink,8)+ar(46,22,62,22)+bars(18,70,[8,12,40,6],12,6,[C.grey,C.grey,C.red,C.grey])+mag(66,34,.8)+bot(100,82,.6,{mood:"wow"}),
        bg(2)+zone(8,12,104,62)+[[20,24],[40,24],[60,24],[80,24],[100,24]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="${C.grey}"/>`).join("")+ctr(60,52,1.2,C.blue)+`<circle cx="60" cy="52" r="4" fill="${C.red}"/>`+mag(92,56,.8) ],
    l:[["живая картина процессов","a live list of processes"],["сортирую — вот виновник","sort it — there's the hog"],["контейнер — смотри изнутри","look from inside"]],
    c:["Открываю живую таблицу, сортирую по памяти — и виден, какой цех тянет всё электричество.","I open the live table, sort by memory, and see which workshop eats all the power."] };

  Z[L+"Кто занял порт"]={
    p:[ bg(0)+`<rect x="54" y="60" width="50" height="14" fill="#fff" opacity=".6"/>`+txt(79,71,"8080",9)+car(79,60,1,C.red)+bot(24,82,.8,{mood:"sad"})+no(46,26,.7),
        bg(1)+car(70,62,1,C.red)+mag(48,40,1.2)+pill(84,26,"PID 1234",C.yel,C.ink,7.5),
        bg(2)+`<rect x="10" y="60" width="44" height="14" fill="#fff" opacity=".6"/>`+txt(32,71,"8080",9)+car(32,60,.9,C.blue)+ok(32,24,.7)+txt(60,46,"/",12,C.grey)+`<rect x="66" y="60" width="44" height="14" fill="#fff" opacity=".6"/>`+txt(88,71,"8081",9)+car(88,60,.9,C.blue)+ok(88,24,.7) ],
    l:[["8080 занят — не старт","8080 taken — won't start"],["чей процесс держит?","whose process holds it?"],["убить или сменить порт","kill it or change port"]],
    c:["Не гадаю, почему не стартует: смотрю, кто стоит на месте 8080, и решаю, что делать.","I don't guess why it won't start: I check who's parked on 8080 and decide what to do."] };

  Z[L+"Место на диске кончается тихо"]={
    p:[ bg(0)+R(14,30,92,18,"#fff",4)+`<rect x="14" y="30" width="88" height="18" rx="4" fill="${C.red}"/>`+txt(60,43,"98%",10,"#fff")+pill(60,62,"df -h",C.yel,C.ink,8),
        bg(1)+box(30,70,34,40,".log",C.wood)+box(78,70,30,30,"docker",C.blue)+box(106,70,12,8,null,C.grey)+pill(60,16,"du -sh *",C.yel,C.ink,7),
        bg(2)+[0,1,2,3,4].map(j=>[0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${12+i*7}" y="${18+j*11}" width="5" height="8" fill="#fff" stroke="${C.ink}" stroke-width=".5"/>`).join("")).join("")+pill(96,30,"inode",C.red,"#fff",7)+txt(96,54,"0",12,C.red)+txt(96,70,"40%",8,C.grn) ],
    l:[["диск почти полон","the disk is nearly full"],["кто разжирел: логи, образы","who grew: logs, images"],["место есть, полок нет","space left, no slots"]],
    c:["Чаще всего диск съедают логи и образы. Хуже: место есть, а ячейки под мелкие файлы кончились.","Logs and images usually eat the disk. Worse: there's space, but no slots for tiny files."] };

  Z[L+"Проверить связь и сертификат"]={
    p:[ bg(0)+laptop(32,60,1.2,txt(0,-10,"curl -v",6.5,C.ink))+ar(54,40,76,40,C.ink,true)+server(96,44,.8),
        bg(1)+[["DNS",4,C.blue],["TCP",8,C.grn],["TLS",14,C.yel],["HTTP",50,C.red]].map((r,i)=>txt(18,26+i*13,r[0],7)+`<rect x="${34+[0,4,12,26][i]}" y="${19+i*13}" width="${r[1]}" height="9" rx="2" fill="${r[2]}"/>`).join(""),
        bg(2)+`<rect x="60" y="58" width="50" height="9" rx="2" fill="${C.red}"/>`+mag(84,40,1)+txt(84,78,"800 ms",8,C.red)+bot(28,82,.7,{mood:"think",glasses:true}) ],
    l:[["звоню сам","I call it myself"],["время на каждом шаге","time at each step"],["вот где тормозит","there's the slow part"]],
    c:["Прежде чем читать код, звоню сам и засекаю: адрес, соединение, шифрование, ответ.","Before reading code I call it myself and time it: lookup, connect, TLS, response."] };

  /* ---------------- Что ещё встретишь ---------------- */
  Z[E+"Nginx — привратник перед приложением"]={
    p:[ bg(0)+kid(22,82,.7,C.red)+ar(36,52,52,52)+bot(66,82,.8,{arms:"reach",hat:false})+lock(66,22,.7)+server(104,44,.6),
        bg(1)+bot(26,82,.8,{arms:"reach"})+card(50,50,18,14,"#fff",`<path d="M-7 5 L-2 -1 L2 3 L4 1 L7 5 Z" fill="${C.grn}"/><circle cx="4" cy="-3" r="1.6" fill="${C.yel}"/>`)+ar(60,52,72,52,C.grn)+kid(84,82,.7,C.red)+`<g opacity=".35">${server(108,44,.5)}</g>`,
        bg(2)+bot(22,82,.7,{arms:"up"})+ar(36,40,64,24)+ar(36,44,64,44)+ar(36,48,64,66)+server(84,24,.4)+server(84,44,.4)+server(84,66,.4),
        bg(3)+bot(22,82,.7,{mood:"think"})+server(76,24,.4)+server(76,48,.4,false)+no(96,48,.6)+ar(36,36,60,26,C.grn)+ln("M36 46 L58 48",C.grey,2,true) ],
    l:[["шифрование на входе","TLS at the door"],["картинки отдаю сам","static: I serve it myself"],["делю между копиями","split across copies"],["упавший — из очереди","the dead one is skipped"]],
    c:["Я стою у входа: снимаю шифрование, раздаю картинки, делю гостей и обхожу упавших.","I stand at the door: handle TLS, serve images, share out guests and skip the fallen."] };

  Z[E+"Maven и Gradle — сборка и зависимости"]={
    p:[ bg(0)+cloud(28,28,1)+ar(40,40,58,52)+box(74,70,16,14,"1.2",C.wood)+box(94,70,16,14,"3.0",C.wood)+box(84,56,16,14,"2.1",C.wood),
        bg(1)+gear(18,40,.7)+ar(30,40,40,40)+ok(50,40,.7)+ar(60,40,70,40)+box(92,56,30,26,"jar",C.wood)+spark(108,22),
        bg(2)+box(24,66,20,16,"A",C.blue)+box(96,66,20,16,"B",C.grn)+ar(32,48,52,30)+ar(88,48,68,30)+pill(44,20,"C 1.0",C.yel,C.ink,7)+pill(78,20,"C 2.0",C.red,"#fff",7)+txt(60,50,"?",14,C.red),
        bg(3)+box(36,70,30,26,"jar",C.wood)+ok(36,30,.7)+ar(56,50,72,50)+bot(94,82,.75,{mood:"sad"})+spark(108,30,C.red)+txt(92,18,"!",12,C.red) ],
    l:[["качаю нужные версии","fetch the right versions"],["собрал, проверил, упаковал","build, test, package"],["двум нужны разные C","two want different Cs"],["упало уже в работе","it crashes at runtime"]],
    c:["Я качаю кирпичи и строю. Если двум нужны разные версии третьей — рухнет уже при запуске.","I fetch bricks and build. If two need different versions of a third, it breaks at run time."] };

  Z[E+"Flyway и Liquibase — миграции базы"]={
    p:[ bg(0)+["V1","V2","V3"].map((v,i)=>paper(24+i*36,40,[v,"SQL"],i*3-3)).join(""),
        bg(1)+db(24,46,.9)+txt(24,48,"V1",9,"#fff")+ar(42,40,58,40)+pill(76,28,"V2",C.yel,C.ink,7.5)+pill(76,48,"V3",C.yel,C.ink,7.5)+db(100,46,.7)+txt(100,48,"V3",8,"#fff")+ok(100,18,.6),
        bg(2)+[["V1",C.blue],["V3",C.grn],["V2",C.red]].map((e,i)=>db(22+i*38,48,.7,e[1])+txt(22+i*38,50,e[0],8,"#fff")).join("")+txt(60,20,"≠",14,C.red)+no(98,20,.6) ],
    l:[["шаги по номерам","numbered steps"],["на старте догоняю базу","catch up on start"],["руками — три разных","by hand: three different"]],
    c:["Каждое изменение базы — скрипт с номером. На старте я догоняю базу до последнего.","Every database change is a numbered script. On start I bring the base up to the latest."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 8 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* свои детали */
  const L=(x,y,w,col,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h||3.4}" rx="1.6" fill="${col||C.grey}"/>`;
  const arrowD=(x,y1,y2,col)=>`<path d="M${x} ${y1} V${y2-4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x-4} ${y2-6} L${x} ${y2} L${x+4} ${y2-6}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arrowU=(x,y1,y2,col)=>`<path d="M${x} ${y1} V${y2+4}" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x-4} ${y2+6} L${x} ${y2} L${x+4} ${y2+6}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const bug=(x,y,s,op)=>`<g transform="translate(${x} ${y}) scale(${s||1})" opacity="${op==null?1:op}"><path d="M-9 -3 l-5 -3 M-9 3 l-5 3 M9 -3 l5 -3 M9 3 l5 3 M-10 0 h-5 M10 0 h5 M-3 -8 l-3 -5 M3 -8 l3 -5" stroke="${C.ink}" stroke-width="1.5" stroke-linecap="round"/><ellipse rx="10" ry="8" fill="${C.red}" stroke="${C.ink}" stroke-width="1.3"/><path d="M0 -8 v16" stroke="${C.ink}" stroke-width="1.2"/><circle cx="-4" cy="-1" r="1.8" fill="${C.ink}"/><circle cx="4" cy="3" r="1.8" fill="${C.ink}"/></g>`;
  const node=(x,y,r,col,t,ts)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col||C.grn}" stroke="${C.ink}" stroke-width="1.2"/>`+(t!=null?txt(x,y+(ts||8)*.36,t,ts||8,"#fff"):"");
  const days=(x,y,n,col)=>Array.from({length:n},(_,i)=>`<rect x="${x+i*15}" y="${y}" width="13" height="13" rx="2.5" fill="${col?col(i):"#fff"}" stroke="${C.ink}" stroke-width="1.1"/>`+txt(x+i*15+6.5,y+9.5,String(i+1),8,C.ink)).join("");
  const house=(x,y,w,h,col)=>`<path d="M${x-w/2} ${y} V${y-h} L${x} ${y-h-w*.38} L${x+w/2} ${y-h} V${y} Z" fill="${col||C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>`;
  const shelf=(x,y,w)=>`<rect x="${x}" y="${y}" width="${w}" height="4" rx="1.5" fill="${C.wood2}"/>`;
  const doc=(x,y,w,h,rows,col)=>card(x,y,w,h,"#fff",rows.map((r,i)=>L(-w/2+4,-h/2+5+i*6,r[0],r[1]||C.grey)).join(""))+(col?"":"");
  const knob=(x,y,a,col)=>`<g transform="translate(${x} ${y})"><circle r="6" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.2"/><path d="M0 0 L0 -5" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" transform="rotate(${a})"/></g>`;
  const Z={};

  Z["Что ещё встретишь|S3 и MinIO — файлы не в базе"]={
    p:[ bg(0)+db(46,54,1.6)+paper(30,26,["PDF"],-14)+paper(56,22,["JPG"],10)+card(40,42,16,12,"#fff",txt(0,3,"PNG",6))+txt(80,28,"!",16,C.red)+bot(96,82,.7,{mood:"wow"}),
        bg(1)+shelf(52,38,62)+shelf(52,64,62)+box(66,38,14,14,"")+box(84,38,14,14,"")+box(102,38,14,14,"")+box(66,64,14,14,"")+box(84,64,14,14,"")+box(102,64,14,14,"")+txt(66,32,"PDF",5.5,"#fff")+txt(84,32,"JPG",5.5,"#fff")+txt(102,58,"PDF",5.5,"#fff")+bot(24,82,.75,{arms:"reach",mood:"smile"}),
        bg(2)+db(26,56,1.1)+card(26,24,28,12,"#fff",txt(0,3,"/a.pdf",6.5,C.blue))+shelf(66,50,46)+box(78,50,14,14,"")+box(100,50,14,14,"")+`<rect x="69" y="34" width="18" height="18" rx="3" fill="none" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 2"/>`+curve(41,24,78,32,C.blue,true)+ok(100,22) ],
    l:[["база пухнет от файлов","files bloat the DB"],["файлы — на полку","files go on the shelf"],["в базе — только ссылка","the DB keeps a link"]],
    c:["Тяжёлые файлы я ставлю на полку хранилища, а в базу пишу только их адрес.","I put heavy files on a storage shelf and write only their address into the database."] };

  Z["Что ещё встретишь|gRPC — когда REST дорог"]={
    p:[ bg(0)+server(18,50,.9)+server(102,50,.9)+card(60,40,46,40,"#fff",txt(0,-8,"{ \"id\":",7,C.ink,700)+txt(0,2,"\"name\":",7,C.ink,700)+txt(0,12,"… }",7,C.ink,700))+txt(60,72,"JSON",9,C.red),
        bg(1)+paper(24,40,[".proto","id = 1","int32"])+arrowR(42,40,54)+gear(68,40,1)+arrowR(82,40,94)+laptop(106,56,.55,txt(0,-10,"&lt;/&gt;",7,C.blue)),
        bg(2)+server(18,50,.9)+server(102,50,.9)+card(60,40,30,16,C.yel,txt(0,4,"0110",8,C.ink))+arrowR(34,58,86,C.grn)+txt(60,72,"HTTP/2",9,C.blue)+spark(60,22),
        bg(3)+laptop(40,64,1.1,txt(0,-10,"0110?",8,C.red))+bot(92,82,.75,{mood:"think"})+txt(92,18,"?",14,C.red) ],
    l:[["JSON — длинный","JSON is wordy"],["по схеме — готовый клиент","schema builds the client"],["коротко и быстро","short and fast"],["браузеру — сложно","hard for browsers"]],
    c:["Свои сервисы болтают коротким двоичным кодом по схеме. Браузеру без переводчика не понять.","My services chat in short binary by a shared schema. A browser can't follow without help."] };

  Z["Что ещё встретишь|Чего НЕ стоит учить впрок"]={
    p:[ bg(0)+card(42,40,40,62,"#fff",Array.from({length:10},(_,i)=>L(-15+(i%2)*15,-26+Math.floor(i/2)*0,0)).join("")+Array.from({length:20},(_,i)=>L(i%2?2:-16,-26+Math.floor(i/2)*5.2,14,[C.blue,C.red,C.grn,C.yel,C.bot][i%5],3)).join(""))+txt(42,84,"20",9,C.ink)+kid(92,82,1,C.grn,"smile"),
        bg(1)+kid(30,82,1,C.blue,"smile")+bubble(30,18,22,txt(0,4,"?",11,C.blue))+kid(88,82,1,C.grn,"sad")+clock(60,34,1,1)+txt(60,56,"1 min",8,C.red),
        bg(2)+[30,50,70,90].map((x,i)=>i<3?`<rect x="${x-7}" y="${74-46}" width="14" height="46" rx="2" fill="${[C.blue,C.grn,C.yel][i]}" stroke="${C.ink}" stroke-width="1.2"/>`:"").join("")+[86,94,102,110].map(x=>`<rect x="${x-3}" y="68" width="6" height="6" rx="1" fill="${C.grey}" stroke="${C.ink}" stroke-width=".8"/>`).join("")+ok(50,16)+txt(98,62,"20",8,C.grey)+txt(50,86,"3",9,C.ink) ],
    l:[["список из двадцати","a list of twenty"],["за минуту видно","spotted in a minute"],["три — но глубоко","three, but deep"]],
    c:["Лучше знать три инструмента до дна, чем двадцать по названию. Поверхностное видно сразу.","Better to know three tools deeply than twenty by name. Shallow knowledge shows at once."] };

  const trace=(hl)=>card(48,42,62,66,"#fff",[0,1,2,3,4,5,6,7].map(i=>{ const col= hl==="top"&&i===0?C.red : hl==="bot"&&i===7?C.blue : hl==="mid"&&i===4?C.grn : C.grey; return L(-26+(i?4:0),-28+i*7.4,i?44:50,col,4); }).join(""));
  Z["Отладка|Стектрейс читают снизу вверх и сверху вниз"]={
    p:[ bg(0)+trace("top")+no(90,18,.9)+`<path d="M82 18 H80" stroke="${C.red}" stroke-width="2"/>`+bot(100,82,.6,{mood:"wow"}),
        bg(1)+trace("bot")+arrowU(88,66,40,C.blue)+txt(100,72,"main",8,C.blue),
        bg(2)+trace("mid")+mag(90,49,1)+txt(102,32,"my.",8,C.grn)+ok(104,72,.8) ],
    l:[["сверху — где упало","top: where it crashed"],["снизу — откуда пришло","bottom: where it began"],["первая своя строка","your first own line"]],
    c:["Чужие строки библиотек пропускаю. Ищу первую строку моего кода — причина обычно там.","I skip library lines and look for the first line of my own code. The cause is usually there."] };

  Z["Отладка|Caused by — вот настоящая причина"]={
    p:[ bg(0)+card(42,16,58,12,"#fff",txt(0,3.5,"Exception",7,C.ink))+arrowD(42,23,33)+card(42,39,58,12,"#fff",txt(0,3.5,"Caused by",7,C.ink))+arrowD(42,46,56)+card(42,62,58,12,"#ffe1e1",txt(0,3.5,"Caused by",7,C.red))+bot(100,82,.6,{mood:"think"}),
        bg(1)+`<rect x="22" y="22" width="56" height="50" rx="4" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/><rect x="32" y="32" width="36" height="34" rx="3" fill="#e2b27e" stroke="${C.wood2}" stroke-width="1.4"/><rect x="41" y="41" width="18" height="18" rx="2" fill="#f3d2a8" stroke="${C.wood2}" stroke-width="1.4"/>`+spark(50,50,C.red)+bot(100,82,.7,{arms:"reach",mood:"wow"}),
        bg(2)+card(40,18,52,10,"#fff",L(-22,-1.5,30))+card(40,32,52,10,"#fff",L(-22,-1.5,34))+card(40,52,58,18,"#ffe1e1",txt(0,4,"Caused by",8,C.red))+`<rect x="9" y="41" width="62" height="22" rx="6" fill="none" stroke="${C.red}" stroke-width="2"/>`+mag(88,40,1)+ok(98,70) ],
    l:[["цепочка обёрток","a chain of wrappers"],["снимаю обёртки","unwrapping the layers"],["нижняя — причина","the lowest is the cause"]],
    c:["Ошибку по дороге наверх заворачивали в обёртки. Настоящая — в самом нижнем Caused by.","The error got wrapped on its way up. The real one is in the lowest Caused by."] };

  Z["Отладка|Сначала воспроизведи"]={
    p:[ bg(0)+bug(76,36,1,.35)+txt(96,24,"?",14,C.blue)+txt(58,22,"?",11,C.blue)+bot(32,82,.8,{mood:"think"}),
        bg(1)+sw(20,44,true,1.5)+[50,74,98].map((x,i)=>bug(x,44,.75)+txt(x,66,String(i+1),9,C.ink)).join("")+arrowR(32,30,104,C.grn),
        bg(2)+`<path d="M44 74 V30 a4 4 0 0 1 4 -4 h24 a4 4 0 0 1 4 4 V74 Z" fill="#e8f4ff" stroke="${C.ink}" stroke-width="1.4" opacity=".9"/><rect x="42" y="20" width="36" height="7" rx="2" fill="${C.grey}" stroke="${C.ink}"/>`+bug(60,52,1)+bot(98,82,.7,{arms:"up",mood:"smile"})+ok(20,30) ],
    l:[["«иногда падает»","\"fails sometimes\""],["по команде — каждый раз","on cue, every time"],["пойман — можно чинить","caught — now fix it"]],
    c:["Пока не умею вызвать баг по команде, я только гадаю. Повторил — значит, поймал.","Until I can trigger the bug on cue, I'm just guessing. Once I can repeat it, I've got it."] };

  const seg=(lo,hi,bad,mid)=>Array.from({length:16},(_,i)=>`<rect x="${8+i*6.6}" y="40" width="5.6" height="14" rx="1.2" fill="${i<lo||i>=hi?"#d9dde5":(i===bad&&hi-lo===1?C.red:C.blue)}" stroke="${C.ink}" stroke-width=".6"/>`).join("")+(mid!=null?`<path d="M${8+mid*6.6-0.5} 32 v28" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 2"/>`:"");
  Z["Отладка|Метод половинного деления"]={
    p:[ bg(0)+seg(0,16,11,8)+mag(60,22,.9)+txt(60,72,"?",12,C.red),
        bg(1)+seg(8,16,11,12)+txt(34,30,"✓",12,C.grn)+txt(90,72,"½",12,C.ink),
        bg(2)+seg(8,12,11,10)+txt(70,72,"¼",12,C.ink),
        bg(3)+seg(11,12,11)+spark(84,28,C.red)+txt(60,72,"10⁶ → 20",10,C.ink)+bug(84,28,.5) ],
    l:[["проверь середину","check the middle"],["половину — долой","drop one half"],["и снова пополам","halve it again"],["нашёл за 20 шагов","found in 20 steps"]],
    c:["Не читаю всё подряд: смотрю середину и отбрасываю половину. Двадцать шагов — и баг найден.","I don't read it all: I check the middle and drop a half. Twenty steps and the bug is found."] };

  Z["Отладка|Как подступиться к чужому проекту"]={
    p:[ bg(0)+Array.from({length:12},(_,i)=>card(46+(i%4)*14-14,22+Math.floor(i/4)*18,11,14,"#fff",L(-3.5,-3,7)+L(-3.5,1,7),(i%3-1)*6)).join("")+bot(100,82,.7,{mood:"wow"})+txt(100,16,"?!",11,C.red),
        bg(1)+`<rect x="58" y="22" width="30" height="52" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.5"/><circle cx="82" cy="50" r="2.4" fill="${C.yel}"/>`+card(73,14,34,11,"#fff",txt(0,3.5,"main()",7,C.blue))+bot(28,82,.8,{arms:"reach",mood:"smile"}),
        bg(2)+laptop(18,46,.6,txt(0,-10,"GET",6,C.blue))+server(60,44,.7)+db(102,46,.8)+curve(26,30,52,26,C.grn,true)+curve(68,26,92,28,C.grn,true)+ok(60,74,.8) ],
    l:[["файлов — гора","a mountain of files"],["нашёл точку входа","found the entry point"],["один путь до базы","one path down to the DB"]],
    c:["Я не читаю файлы по алфавиту. Иду по одному запросу от входа до базы — и всё складывается.","I don't read files A to Z. I follow one request from the entry to the DB, and it clicks."] };

  Z["Оценка и решения|Почему оценки всегда врут"]={
    p:[ bg(0)+think(58,26,txt(11,-1,"&lt;/&gt;",7,C.blue)+txt(11,6,"2d",8,C.ink))+bot(34,82,.85,{mood:"think"}),
        bg(1)+laptop(18,48,.55,"")+arrowR(30,40,40)+mag(52,38,.8)+arrowR(64,40,74)+ok(84,40,1)+arrowR(93,40,101)+server(110,40,.4)+txt(60,70,"+ + +",10,C.red),
        bg(2)+days(23,22,5,i=>i<2?C.grn:"#ffd6a3")+txt(60,56,"2d → 5d",11,C.red)+cloud(98,66,.6)+txt(98,70,"?",9,C.blue)+bot(22,82,.5,{mood:"sad"}) ],
    l:[["думаю: код — 2 дня","I think: code — 2 days"],["а ещё ревью, тесты, выкат","+ review, tests, deploy"],["до прода — 5 дней","to prod — 5 days"]],
    c:["Я считал только «написать код». А до прода ещё ревью, тесты, выкат и сюрпризы.","I counted only writing code. Getting to prod also takes review, tests, deploy and surprises."] };

  Z["Оценка и решения|Декомпозиция важнее точности"]={
    p:[ bg(0)+box(70,74,56,50,"")+txt(70,58,"?",24,"#fff")+bot(22,82,.75,{mood:"sad"}),
        bg(1)+[["1",22],["1",44],["2",66],["1",88]].map(b=>box(b[1],62,18,18,b[0])).join("")+`<path d="M12 70 H100" stroke="${C.ink}" stroke-dasharray="3 3" stroke-width="1.2"/>`+txt(108,72,"✂",12,C.ink),
        bg(2)+[22,44,66,88].map((x,i)=>box(x,62,18,18,["1","1","2","1"][i])+(i<2?ok(x,30,.75):i===2?txt(x,34,"!",14,C.red):"")).join("")+arrowR(14,74,100,C.grn) ],
    l:[["большая — не оценить","too big to estimate"],["режем на куски","cut into pieces"],["видно ход и засады","see progress and traps"]],
    c:["Большую задачу одним числом не оценить. Режу на куски по дню — и вижу, где засада.","A big task can't get one number. I cut it into day-sized bits and spot the traps early."] };

  Z["Оценка и решения|Называй диапазон и риски"]={
    p:[ bg(0)+bubble(40,18,22,txt(0,4,"4d",9,C.ink))+days(18,42,5,i=>i===3?"#ffd6a3":"#fff")+txt(106,52,"→7",10,C.red)+no(104,70,.8)+kid(36,86,.6,C.red,"sad"),
        bg(1)+bot(18,82,.6,{mood:"smile"})+curve(32,48,74,22,C.grn)+curve(32,50,74,60,C.red,true)+card(92,22,28,14,"#fff",txt(0,4,"3–5d",8,C.grn))+server(76,62,.45,false)+card(98,62,22,14,"#fff",txt(0,4,"+2",9,C.red))+txt(92,40,"API ✓",6.5,C.grn)+txt(98,80,"API ✗",6.5,C.red),
        bg(2)+kid(40,82,1,C.red,"smile")+bot(86,82,.8,{mood:"smile",arms:"up"})+ok(62,22) ],
    l:[["точное число сорвалось","exact number — missed"],["диапазон и от чего зависит","range + what it depends on"],["бизнес спокоен","the business is fine"]],
    c:["Я говорю «три-пять дней, если API готов». Честный диапазон лучше сорванной точной даты.","I say \"3–5 days if the API is ready\". An honest range beats a missed exact date."] };

  Z["Оценка и решения|Сообщай о просрочке рано"]={
    p:[ bg(0)+days(23,10,5,i=>i===1?C.yel:"#fff")+bot(38,82,.7,{mood:"wow",arms:"up"})+bubble(64,42,16,txt(0,4,"!",11,C.red))+kid(92,82,.9,C.blue,"smile"),
        bg(1)+box(32,74,20,20,"½")+bot(64,82,.65,{arms:"hold"})+kid(96,82,.9,C.blue,"smile")+ok(64,18)+`<rect x="22" y="28" width="20" height="20" rx="2" fill="none" stroke="${C.grey}" stroke-width="1.4" stroke-dasharray="3 2"/>`,
        bg(2)+days(23,10,5,i=>i===4?C.red:"#fff")+bot(40,82,.7,{mood:"sad"})+kid(86,82,.9,C.blue,"sad")+no(62,40) ],
    l:[["сказал на 2-й день","told on day 2"],["урезали, помогли — успели","scope cut, help — made it"],["сказал в последний день","told on the last day"]],
    c:["Сказал о задержке на второй день — всё можно поправить. В последний — уже поздно.","Say it on day two and it can still be fixed. Say it on the last day and it's too late."] };

  Z["Оценка и решения|ADR: записывай, почему решили так"]={
    p:[ bg(0)+card(30,34,28,28,"#fff",txt(0,6,"A",16,C.grey))+card(70,34,28,28,"#fff",txt(0,6,"B",16,C.blue))+ok(84,20,.8)+bot(104,82,.6,{mood:"think"})+txt(50,70,"?",12,C.ink),
        bg(1)+paper(42,40,["ADR-7","A / B","→ B"])+`<path d="M78 72 V40 h14 l4 4 h16 V72 Z" fill="${C.yel}" stroke="${C.ink}" stroke-width="1.2"/>`+arrowR(60,40,80)+txt(95,60,"git",8,C.ink),
        bg(2)+txt(60,18,"+1y",11,C.blue)+paper(60,44,["ADR-7","A / B","→ B"])+kid(22,84,.85,C.grn,"wow")+bot(100,82,.65,{mood:"smile"})+ok(82,28,.7) ],
    l:[["выбрали B — почему?","picked B — why?"],["полстраницы в репо","half a page in the repo"],["через год всё ясно","clear a year later"]],
    c:["Я записываю, почему решили так. Через год это спасёт от споров и страха трогать код.","I write down why we chose this. A year later it saves us from arguments and fear of change."] };

  Z["Как устроен собес|Это не экзамен, а проверка совместимости"]={
    p:[ bg(0)+paper(40,40,["1 ✓","2 ✓","3 ✓"])+txt(40,72,"5/5",10,C.grey)+no(64,22,.9)+kid(94,82,.9,C.blue,"think"),
        bg(1)+kid(24,82,.9,C.red,"smile")+`<rect x="34" y="28" width="52" height="9" rx="3" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.3"/>`+bot(60,82,.7,{arms:"up",mood:"smile"})+kid(96,82,.9,C.blue,"smile"),
        bg(2)+bot(30,82,.8,{mood:"think"})+bubble(70,22,50,txt(0,4,"? → 1·2·3",8,C.ink))+ok(100,56) ],
    l:[["не экзамен","not an exam"],["с ним не страшно","safe to work with"],["«не знаю, но выяснил бы»","\"don't know, but I'd…\""]],
    c:["Ищут не самого умного, а того, кому можно доверить кусок системы.","They want not the smartest one, but someone they can trust with part of the system."] };

  Z["Как устроен собес|Обычно четыре этапа"]={
    p:[ bg(0)+phone(40,46,1.1,txt(0,4,"30'",7,C.ink))+coin(72,32)+coin(80,40)+kid(96,84,.8,C.red,"smile")+txt(14,20,"1",11,C.blue),
        bg(1)+chip(46,40,txt(0,4,"JVM",7,C.yel))+db(88,52,.8)+txt(14,20,"2",11,C.blue)+bot(18,82,.45,{mood:"think"}),
        bg(2)+[[30,30],[80,30],[55,62]].map(p=>`<rect x="${p[0]-12}" y="${p[1]-8}" width="24" height="16" rx="3" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`).join("")+`<path d="M42 30 H68 M34 38 L48 54 M76 38 L62 54" stroke="${C.ink}" stroke-width="1.4"/>`+txt(14,20,"3",11,C.blue)+txt(98,72,"&lt;/&gt;",8,C.ink),
        bg(3)+kid(34,82,1,C.grn,"smile")+kid(70,84,.7,C.blue,"smile")+kid(90,84,.7,C.red,"smile")+txt(14,20,"4",11,C.blue)+ok(80,24,.8) ],
    l:[["скрининг: опыт, деньги","screen: past and pay"],["техника: язык, база","tech: language, DB"],["дизайн или лайвкодинг","design or live coding"],["менеджер: команда","manager: team"]],
    c:["Четыре двери подряд: рекрутер, техника, дизайн или код, менеджер. За каждой смотрят своё.","Four doors in a row: recruiter, tech, design or code, manager. Each checks something else."] };

  Z["Как устроен собес|Скрининг: отсекают по формальному"]={
    p:[ bg(0)+doc(30,36,26,32,[[18,C.blue],[14],[16],[12]])+txt(60,40,"=",14,C.ink)+doc(90,36,26,32,[[18,C.red],[14],[16],[12]])+kid(60,86,.6,C.grn,"think"),
        bg(1)+kid(28,82,1,C.grn,"smile")+bubble(52,20,22,txt(0,4,"$?",9,C.ink))+[0,1,2].map(i=>coin(86,64-i*7,1)).join("")+bot(104,82,.45,{mood:"smile"}),
        bg(2)+clock(28,32,1.2,2)+txt(28,56,"2 min",8,C.ink)+bot(70,82,.75,{mood:"smile",arms:"up"})+bubble(96,22,24,txt(0,4,"…",10,C.ink)) ],
    l:[["опыт против вакансии","experience vs the job"],["вопрос про деньги","the money question"],["о себе — за 2 минуты","about you in 2 minutes"]],
    c:["Рекрутер знаний не проверяет: сверяет опыт, деньги и адекватность. Как билет на входе.","The recruiter doesn't test knowledge: just experience, pay and sense. Like a ticket check."] };

  Z["Как устроен собес|Техническая секция: как отвечать"]={
    p:[ bg(0)+card(36,40,44,40,"#fff",txt(0,-6,"volatile",7.5,C.blue)+L(-16,2,32)+L(-16,9,24))+bot(86,82,.7,{mood:"think"})+txt(60,74,"zzz",8,C.grey),
        bg(1)+box(60,58,24,22,"x=1")+kid(20,82,.85,C.red,"smile")+kid(100,82,.85,C.blue,"smile")+curve(26,40,48,44,C.grn,true)+curve(94,40,72,44,C.grn,true)+ok(60,22),
        bg(2)+card(28,30,30,14,"#fff",txt(0,4,"x++",8,C.ink))+card(28,56,30,14,"#fff",txt(0,4,"x++",8,C.ink))+arrowR(46,43,64)+box(84,56,26,24,"1")+txt(84,22,"≠ 2",10,C.red)+no(106,70,.75) ],
    l:[["определение — мало","a definition won't do"],["видимость — да","visibility — yes"],["атомарность — нет","atomicity — no"]],
    c:["Не пересказываю учебник: объясняю, как это работает и когда ломается. Это уровень сеньора.","I don't recite the textbook: I explain how it works and when it breaks. That's senior level."] };

  Z["Как устроен собес|System Design: ждут процесс, а не схему"]={
    p:[ bg(0)+bot(30,82,.8,{mood:"think"})+bubble(58,20,22,txt(0,4,"?",11,C.blue))+kid(94,82,.9,C.blue,"smile"),
        bg(1)+card(60,30,62,16,"#fff",txt(0,4,"10k rps",9,C.blue))+card(60,56,62,16,"#fff",txt(0,4,"1 TB",9,C.blue))+txt(14,20,"≈",11,C.ink),
        bg(2)+card(60,24,74,13,"#fff",txt(0,4,"GET /api",7.5,C.grn))+card(60,42,74,13,"#fff",txt(0,4,"POST /api",7.5,C.blue))+card(60,60,74,13,"#fff",txt(0,4,"GET /api/1",7.5,C.grn)),
        bg(3)+db(34,48,1)+db(86,48,1,C.grn)+ok(86,18,.8)+no(34,18,.8)+txt(60,72,"?",11,C.ink),
        bg(4)+server(26,50,.8,false)+arrowR(44,46,62)+server(78,50,.7)+server(102,50,.7)+txt(26,82,"!",10,C.red) ],
    l:[["уточни требования","clarify requirements"],["нагрузка в числах","load in numbers"],["набросай API","sketch the API"],["выбери хранилище","pick the storage"],["узкие места и рост","bottlenecks and scale"]],
    c:["Сначала спрашиваю и считаю, потом рисую квадратики. Наоборот — красиво, но мимо.","First I ask and count, then I draw boxes. The other way round looks nice but misses."] };

  Z["Как устроен собес|Лайвкодинг: говори вслух"]={
    p:[ bg(0)+bot(24,82,.7,{mood:"think"})+laptop(60,74,.8,txt(0,-10,"…",8,C.ink))+kid(98,82,.9,C.blue,"think")+txt(98,20,"?",13,C.red)+txt(24,18,"…",10,C.grey),
        bg(1)+bot(24,82,.7,{mood:"smile"})+laptop(60,74,.8,txt(0,-10,"for",6,C.blue))+bubble(48,18,52,txt(0,4,"O(n), sort?",7.5,C.ink))+kid(96,82,.9,C.blue,"smile"),
        bg(2)+think(62,24,txt(11,2,"1→2→3",7,C.ink))+kid(40,82,1,C.blue,"smile")+ok(94,58) ],
    l:[["молча — непонятно","silent — unclear"],["думаю вслух","thinking out loud"],["видно ход мысли","your reasoning shows"]],
    c:["Я проговариваю, что понял и почему так решаю. Им важен мой ход мысли, а не скорость.","I say what I understood and why I solve it this way. They care about my thinking, not speed."] };

  Z["Как устроен собес|Вопросы задавай ты"]={
    p:[ bg(0)+kid(26,82,1,C.blue,"smile")+bubble(40,18,20,txt(0,4,"?",11,C.blue))+bot(90,82,.75,{mood:"sad"})+bubble(90,18,20,txt(0,4,"—",11,C.ink))+no(64,46,.8),
        bg(1)+bot(24,82,.75,{mood:"think"})+bubble(70,16,50,txt(-12,4,"?",10,C.blue)+txt(10,4,"CI",8,C.ink))+server(58,56,.5)+ok(80,48,.8)+box(104,72,16,14,"")+`<path d="M98 60 l12 8 M110 60 l-12 8" stroke="${C.grey}" stroke-width=".8"/>`,
        bg(2)+bot(28,82,.75,{mood:"smile"})+`<path d="M60 26 V70 M44 30 H76" stroke="${C.ink}" stroke-width="2"/><path d="M38 30 l-6 14 h12 Z M82 30 l-6 14 h12 Z" fill="${C.yel}" stroke="${C.ink}"/>`+kid(96,82,.9,C.blue,"smile")+txt(60,84,"⇄",10,C.ink) ],
    l:[["«нет вопросов» — минус","\"no questions\" — bad"],["релизы, тесты, легаси?","releases, tests, legacy?"],["ты тоже выбираешь","you choose too"]],
    c:["Я тоже выбираю, где работать. Спрашиваю про релизы, тесты, легаси и кто принимает решения.","I'm choosing too. I ask about releases, tests, legacy and who makes the decisions."] };

  Z["На собесе|Что происходит при запуске программы"]={
    p:[ bg(0)+paper(24,40,[".java","int x"])+arrowR(42,40,62)+txt(52,30,"javac",6.5,C.blue)+card(88,40,34,26,"#fff",txt(0,-2,"CA FE",8,C.ink)+txt(0,8,".class",6.5,C.blue)),
        bg(1)+txt(24,40,"java",10,C.blue)+arrowR(36,37,52)+`<rect x="58" y="16" width="52" height="46" rx="6" fill="${C.bot}" stroke="${C.ink}" stroke-width="1.3"/>`+txt(84,44,"JVM",12,"#fff")+bot(24,82,.45,{arms:"up"}),
        bg(2)+card(30,36,34,24,"#fff",txt(0,4,"CA FE",7.5,C.ink))+mag(52,54,.8)+bot(88,82,.75,{glasses:true,mood:"think"})+ok(36,70,.8),
        bg(3)+card(40,40,50,46,"#fff",[0,1,2,3,4].map(i=>L(-20,-17+i*8,36,i===2?C.blue:C.grey)).join(""))+arrowR(2,39,14,C.red)+bot(94,82,.7,{arms:"reach"}),
        bg(4)+`<path d="M30 60 q-10 -18 4 -30 q0 12 8 14 q4 -8 0 -16 q14 10 6 32 Z" fill="#ff7a59"/>`+arrowR(50,46,66)+chip(90,44,txt(0,4,"JIT",8,C.yel))+spark(110,20),
        bg(0)+chip(28,40,txt(0,4,"CPU",7,C.yel))+arrowR(50,40,64)+laptop(92,62,1.2,txt(0,-9,"42",9,C.grn))+txt(92,24,"OS",8,C.ink) ],
    l:[["javac: байткод","javac: bytecode"],["java поднимает JVM","java starts the JVM"],["загрузчик проверил класс","loader checks the class"],["интерпретатор шагает","interpreter steps"],["горячее — в JIT","hot code goes to JIT"],["CPU и ОС — вывод","CPU and OS — output"]],
    c:["За словом «запустил» прячутся шесть этажей: от javac до вывода на экран.","Behind \"I ran it\" hide six floors: from javac all the way to the screen."] };

  const buckets=(full,look)=>[0,1,2,3].map(i=>`<path d="M${12+i*27} 50 h22 l-3 22 h-16 Z" fill="${look===i?"#fff3c4":"#fff"}" stroke="${C.ink}" stroke-width="1.3"/>`+txt(23+i*27,84,String(i),8,C.ink)+(full===i?`<circle cx="${23+i*27}" cy="62" r="6" fill="${C.blue}" stroke="${C.ink}"/>`:"")).join("");
  Z["На собесе|Почему equals без hashCode ломает HashMap"]={
    p:[ bg(0)+buckets(1)+`<circle cx="50" cy="20" r="7" fill="${C.blue}" stroke="${C.ink}"/>`+txt(76,24,"h=1",8,C.blue)+curve(50,28,50,48,C.blue,true),
        bg(1)+buckets(1,3)+`<circle cx="104" cy="20" r="7" fill="${C.blue}" stroke="${C.ink}"/>`+txt(80,24,"h=3",8,C.red)+curve(104,28,104,48,C.red,true)+txt(62,24,"=",10,C.ink),
        bg(2)+buckets(1,3)+mag(104,40,.9)+card(40,24,46,14,"#fff",txt(0,4,"equals()",7.5,C.ink))+`<path d="M18 23 H62" stroke="${C.red}" stroke-width="1.6"/>`+no(80,24,.7) ],
    l:[["кладу по hashCode","stored by hashCode"],["равный, но хеш другой","equal, but other hash"],["equals даже не позвали","equals never even runs"]],
    c:["Я ищу в два шага: сначала корзину по хешу, потом equals. Другой хеш — не та корзина.","I search in two steps: bucket by hash, then equals. A different hash means the wrong bucket."] };

  Z["На собесе|Чем отличается процесс от потока"]={
    p:[ bg(0)+house(32,74,40,30,C.wood)+house(88,74,40,30,"#e2b27e")+box(32,72,12,11,"")+box(88,72,12,11,"")+kid(24,74,.55,C.red,"smile")+kid(80,74,.55,C.blue,"smile")+coin(60,24)+coin(66,30),
        bg(1)+house(60,74,72,34,C.wood)+box(60,72,14,12,"")+kid(36,74,.6,C.red,"smile")+kid(82,74,.6,C.blue,"smile")+kid(96,74,.5,C.grn,"smile")+coin(60,16,.8),
        bg(2)+box(60,72,18,16,"")+lock(60,40,1.2)+kid(28,82,.9,C.red,"think")+kid(92,82,.9,C.blue,"think") ],
    l:[["процесс — свой дом","process — own house"],["потоки — одна квартира","threads — one flat"],["общее — нужен замок","shared needs a lock"]],
    c:["Процесс живёт в своей квартире, потоки — в комнатах одной. Дешевле, но надо договариваться.","A process has its own flat, threads share rooms in one. Cheaper, but they must take turns."] };

  Z["На собесе|Как отвечать, когда не знаешь"]={
    p:[ bg(0)+bot(30,82,.8,{mood:"wow",arms:"up"})+bubble(66,20,40,txt(0,4,"∑ ≈ ?! %",8,C.ink))+kid(96,82,.9,C.blue,"sad")+no(70,50,.8),
        bg(1)+`<rect x="12" y="16" width="56" height="54" rx="6" fill="${C.grn}" opacity=".35"/><rect x="68" y="16" width="40" height="54" rx="6" fill="${C.grey}" opacity=".35"/><path d="M68 14 V72" stroke="${C.ink}" stroke-width="2" stroke-dasharray="4 3"/>`+txt(40,48,"✓",18,C.grn)+txt(88,48,"?",18,C.ink),
        bg(2)+bot(22,82,.7,{mood:"smile",glasses:true})+[1,2,3].map((n,i)=>node(54+i*22,40,8,C.blue,String(n),9)).join("")+mag(66,64,.7)+ok(106,64,.8) ],
    l:[["уверенная ерунда","confident nonsense"],["что знаю и где граница","what I know, where it ends"],["как бы выяснял","how I'd find out"]],
    c:["Не выдумываю. Говорю, что знаю, где граница и как бы выяснил. Это ценят больше.","I don't make things up. I say what I know, where it ends and how I'd find out."] };

  Z["Резюме и оффер|Резюме читают 20 секунд"]={
    p:[ bg(0)+clock(88,26,1.2,4)+txt(88,50,"20 s",9,C.red)+doc(46,40,30,40,[[20,C.ink],[14],[18],[12],[16]])+kid(24,84,.8,C.grn,"think"),
        bg(1)+card(48,42,48,52,"#fff",["Java","Spring","Docker","Kafka"].map((t,i)=>txt(0,-14+i*10,t,7,C.grey,700)).join(""))+kid(98,82,.9,C.grn,"sad")+txt(98,22,"zzz",8,C.grey),
        bg(2)+card(46,40,62,36,"#fff",txt(0,-2,"40 s → 3 s",9,C.grn)+L(-22,8,44))+kid(98,82,.9,C.grn,"wow")+ok(48,72,.8) ],
    l:[["20 секунд на резюме","20 seconds per resume"],["список — мимо","a list — skipped"],["результат в числах","results in numbers"]],
    c:["«Ускорил с 40 до 3 секунд» скажет больше, чем список из десяти технологий.","\"Cut 40 seconds to 3\" says more than a list of ten technologies."] };

  Z["Резюме и оффер|Под каждую вакансию — своя версия"]={
    p:[ bg(0)+doc(22,40,22,30,[[14],[10],[12],[8]])+[30,50,70].map((y,i)=>env(76,y-8,.7)+no(102,y-8,.6)).join("")+curve(34,36,62,20,C.grey,true),
        bg(1)+card(28,40,36,48,"#fff",L(-13,-16,26)+L(-13,-8,20)+L(-13,0,24)+txt(0,15,"Kafka",7,C.grey))+arrowR(50,40,66)+card(90,40,36,48,"#fff",txt(0,-11,"Kafka",7.5,C.blue)+L(-13,-2,26)+L(-13,6,20)+L(-13,14,24))+arrowU(114,66,20,C.blue),
        bg(2)+card(34,38,34,42,"#fff",txt(0,-8,"Kafka",7.5,C.blue)+L(-12,0,24)+L(-12,7,18))+txt(60,42,"=",12,C.ink)+card(86,38,30,30,"#fff",txt(0,4,"Kafka",7,C.blue))+ok(60,70,.8)+kid(108,84,.5,C.grn,"smile") ],
    l:[["одно на всех — мимо","one for all — misses"],["нужное — наверх","the key stuff on top"],["совпало — позвали","it matches — invited"]],
    c:["Факты те же, но под вакансию с Kafka я ставлю Kafka в первые строчки.","Same facts, but for a Kafka job I put Kafka in the first lines."] };

  Z["Резюме и оффер|Про зарплату: называй вилку и первым не всегда"]={
    p:[ bg(0)+bot(26,82,.8,{mood:"smile"})+bubble(72,22,52,txt(0,4,"300–400",9,C.ink))+[0,1,2].map(i=>coin(78+i*10,62)).join(""),
        bg(1)+card(40,50,30,16,"#fff",txt(0,4,"200",9,C.red))+arrowU(76,62,22,C.grey)+`<path d="M66 40 H86" stroke="${C.red}" stroke-width="3"/>`+no(100,30,.8)+bot(104,82,.45,{mood:"sad"}),
        bg(2)+card(44,36,40,18,"#fff",txt(0,4,"350",10,C.grn))+ok(76,36)+bot(96,82,.7,{mood:"smile",arms:"up"})+coin(30,64)+coin(44,64)+coin(58,64) ],
    l:[["называю вилку","I name a range"],["занизил — не поднять","too low — can't raise"],["число, за которое пойду","a number I'd really take"]],
    c:["Цену называют один раз: скинуть можно, поднять — нет. Называю ту, за которую реально пойду.","You name a price once: you can drop it, not raise it. I name the one I'd really accept."] };

  Z["Резюме и оффер|Оффер — это не только оклад"]={
    p:[ bg(0)+[0,1,2,3].map(i=>coin(44,66-i*8,1.2)).join("")+txt(44,22,"+20%",11,C.grn)+kid(92,82,.9,C.red,"wow"),
        bg(1)+clock(28,30,1.1,11)+txt(28,52,"22:00",7,C.red)+cloud(94,22,.8,"#8a90a0")+`<path d="M90 32 l-4 8 h5 l-4 8" stroke="${C.yel}" stroke-width="2" fill="none"/>`+kid(70,82,.85,C.red,"sad"),
        bg(2)+[[30,24],[90,24],[30,58],[90,58]].map(p=>`<rect x="${p[0]-18}" y="${p[1]-14}" width="36" height="28" rx="5" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/>`).join("")+coin(28,24,1.1)+clock(88,24,.9,5)+laptop(30,70,.55)+txt(88,63,"%",12,C.blue)+[[44,12],[104,12],[44,46],[104,46]].map(p=>ok(p[0],p[1],.5)).join("") ],
    l:[["+20% к окладу","+20% salary"],["переработки и ругань","overtime and yelling"],["смотрю всё целиком","weigh the whole deal"]],
    c:["Плюс двадцать процентов не окупят токсичную команду и вечные переработки. Смотрю целиком.","Plus twenty percent won't pay for a toxic team and endless overtime. I weigh the whole deal."] };

  Z["Резюме и оффер|Отказ — это статистика, а не приговор"]={
    p:[ bg(0)+[0,1,2,3,4,5,6].map(i=>(i<6?no(14+i*15.5,36,.75):ok(14+i*15.5,36,.85))).join("")+txt(60,64,"5–10 → 1",10,C.ink),
        bg(1)+kid(28,82,.9,C.blue,"smile")+ok(28,20,.7)+lock(70,40,1.3)+bot(104,82,.55,{mood:"think"}),
        bg(2)+bot(26,82,.8,{mood:"smile"})+bubble(58,22,20,txt(0,4,"?",11,C.blue))+arrowR(56,64,104,C.grn)+spark(104,40) ],
    l:[["5–10 собесов на оффер","5–10 talks per offer"],["взяли другого, закрыли","took another, closed it"],["спросил отзыв — дальше","asked why — moved on"]],
    c:["Отказ — не приговор, а обычная арифметика. Спрошу, что улучшить, и пойду дальше.","A no isn't a verdict, just arithmetic. I ask what to improve and move on."] };

  Z["Итог|Полная цепочка от буквы до экрана"]={
    p:[ bg(0)+`<rect x="16" y="50" width="88" height="22" rx="4" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/>`+Array.from({length:14},(_,i)=>`<rect x="${20+(i%7)*12}" y="${54+Math.floor(i/7)*8}" width="9" height="6" rx="1.5" fill="${C.grey}"/>`).join("")+card(60,26,50,18,"#fff",txt(0,4,"x = 2",9,C.ink)),
        bg(1)+card(32,40,36,24,"#fff",txt(0,4,"x = 2",8,C.ink))+arrowR(52,40,66)+card(90,40,36,24,"#fff",txt(0,4,"CA FE",8,C.blue))+txt(59,30,"javac",6,C.blue),
        bg(2)+`<rect x="12" y="24" width="40" height="32" rx="6" fill="${C.bot}"/>`+txt(32,44,"JVM",9,"#fff")+arrowR(56,40,70)+card(94,40,36,24,"#fff",txt(0,4,"1011",9,C.ink)),
        bg(3)+chip(36,40,"")+[0,1,2].map(i=>sw(78+i*14,40,i!==1,.8)).join("")+spark(60,18),
        bg(4)+laptop(60,66,1.6,txt(0,-10,"OS",7,C.blue)),
        bg(0)+Array.from({length:30},(_,i)=>`<rect x="${21+(i%6)*13}" y="${14+Math.floor(i/6)*11}" width="11" height="9" rx="1.5" fill="${[3,8,13,14,15,19,25].includes(i)?C.yel:"#3b4256"}"/>`).join("") ],
    l:[["ты пишешь текст","you type the text"],["компилятор: байткод","compiler: bytecode"],["JVM: машинный код","JVM: machine code"],["процессор щёлкает","the CPU switches"],["ОС отдаёт на экран","the OS sends it out"],["пиксели загорелись","pixels light up"]],
    c:["Ты пишешь наверху, а под тобой пять этажей. Когда тормозит — спускаешься и смотришь.","You write at the top, five floors below do the work. When it lags, you go down and look."] };

  Z["Итог|Зачем это всё знать"]={
    p:[ bg(0)+[0,1,2,3,4].map(i=>card(36+i*3,58-i*9,34,12,"#fff",L(-12,-1.5,24),i%2?4:-4)).join("")+kid(92,82,.9,C.grn,"sad")+txt(92,20,"zzz",8,C.grey),
        bg(1)+[["GC",34],["DB",60],["⇄",86]].map(b=>box(b[1],44,22,16,b[0],C.blue)).join("")+`<rect x="18" y="46" width="84" height="26" rx="3" fill="${C.wood2}" stroke="${C.ink}" stroke-width="1.2"/>`+txt(42,63,"CPU",9,"#fff")+txt(78,63,"RAM",9,"#fff"),
        bg(2)+bulb(36,28,true,10)+bot(36,82,.65,{mood:"smile",arms:"up"})+card(84,58,34,18,"#fff",txt(0,4,"? → ✓",9,C.grn))+arrowU(84,46,24,C.grn) ],
    l:[["зубрить правила","cramming rules"],["всё стоит на фундаменте","all sits on the base"],["понял — выводишь сам","get it — derive the rest"]],
    c:["Сборщик мусора, потоки, кэш — следствия фундамента. Поймёшь основу — остальное выведешь.","GC, threads and caches all follow from the basics. Grasp them and you'll derive the rest."] };

  Z["AI: нейрон и обучение|Модель — это функция с настраиваемыми числами"]={
    p:[ bg(0)+txt(16,44,"2",14,C.blue)+arrowR(24,40,36)+`<rect x="40" y="22" width="44" height="36" rx="6" fill="#4a5168" stroke="${C.ink}" stroke-width="1.3"/>`+knob(52,40,-60)+knob(72,40,30)+arrowR(88,40,100)+txt(108,44,"?",14,C.red),
        bg(1)+txt(16,30,"2",11,C.blue)+txt(16,56,"1",11,C.blue)+txt(42,30,"×0.8",8,C.ink)+txt(42,56,"×1.5",8,C.ink)+`<path d="M58 28 L74 40 M58 54 L74 42" stroke="${C.ink}" stroke-width="1.4"/>`+node(80,41,8,C.yel,"+",10)+arrowR(90,41,100)+txt(110,45,"3.1",9,C.ink),
        bg(2)+`<rect x="44" y="14" width="44" height="30" rx="6" fill="#4a5168" stroke="${C.ink}" stroke-width="1.3"/>`+knob(56,29,40)+knob(76,29,-20)+bot(26,82,.7,{arms:"reach"})+txt(98,62,"4 = 4",9,C.grn)+ok(98,34,.8) ],
    l:[["число на входе","a number goes in"],["умножить и сложить","multiply and add"],["крутим ручки — обучение","turn knobs — training"]],
    c:["Модель — пульт с ручками-числами. Учить — значит крутить их, пока выход не станет верным.","A model is a panel of number knobs. Training means turning them until the output is right."] };

  Z["AI: нейрон и обучение|Нейрон: взвешенная сумма и порог"]={
    p:[ bg(0)+node(18,28,8,C.blue,"1",8)+node(18,58,8,C.blue,".5",7)+`<path d="M26 28 L76 42 M26 58 L76 46" stroke="${C.ink}" stroke-width="1.6"/>`+txt(50,28,"×0.8",8,C.grn)+txt(50,66,"×−0.2",8,C.red)+node(88,44,12,C.yel,"",8),
        bg(1)+txt(60,26,"0.8 − 0.1",10,C.ink)+txt(60,46,"+ 0.1",10,C.blue)+`<path d="M30 54 H90" stroke="${C.ink}" stroke-width="1.6"/>`+txt(60,70,"= 0.8",11,C.grn),
        bg(2)+`<path d="M14 58 H100 M56 18 V68" stroke="${C.grey}" stroke-width="1.2"/><path d="M14 58 H56 L96 20" stroke="${C.red}" stroke-width="3" fill="none" stroke-linecap="round"/>`+txt(30,72,"−→0",8,C.ink)+`<circle cx="76" cy="39" r="3.4" fill="${C.grn}" stroke="${C.ink}"/>`+txt(92,46,"0.8",8,C.grn) ],
    l:[["вход × вес","input × weight"],["сложить и сдвиг","sum plus bias"],["минус — в ноль","negatives become 0"]],
    c:["Нейрон — это умножить, сложить и отрезать минус. Никакого мозга, просто арифметика.","A neuron just multiplies, adds and cuts off negatives. No brain, just arithmetic."] };

  const dots=(f)=>[[20,22],[34,30],[28,48],[46,20],[16,62],[40,64],[60,40],[74,24],[88,34],[70,60],[96,58],[100,22],[54,62],[84,48]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.4" fill="${f(p)?C.grn:C.red}" stroke="${C.ink}" stroke-width=".8"/>`).join("");
  const inside=p=>Math.hypot(p[0]-62,p[1]-44)<24;
  Z["AI: нейрон и обучение|Слои: почему сеть глубокая"]={
    p:[ bg(0)+dots(inside)+`<path d="M14 70 L108 14" stroke="${C.ink}" stroke-width="2" stroke-dasharray="4 3"/>`+no(104,70,.7),
        bg(1)+(()=>{ const A=[[16,30],[16,54]],B=[[48,20],[48,42],[48,64]],Cc=[[78,30],[78,54]],D=[[104,42]]; let s=""; [[A,B],[B,Cc],[Cc,D]].forEach(([u,v])=>u.forEach(a=>v.forEach(b=>s+=`<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${C.grey}" stroke-width="1"/>`))); return s+A.concat(B,Cc,D).map(p=>node(p[0],p[1],6,p[0]<20?C.blue:p[0]>100?C.yel:C.grn)).join(""); })(),
        bg(2)+dots(inside)+`<circle cx="62" cy="44" r="24" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="4 3"/>`+ok(106,70,.7) ],
    l:[["один — прямая граница","one: a straight line"],["слои друг за другом","layers one after another"],["граница гнётся","the boundary bends"]],
    c:["Каждый слой собирает из простого сложное, как участок конвейера. Глубина — число слоёв.","Each layer builds complex from simple, like stations on a line. Depth is how many layers."] };

  const hill=`<path d="M10 20 Q60 110 110 20" stroke="${C.ink}" stroke-width="2" fill="none"/>`;
  Z["AI: нейрон и обучение|Обучение: ошибка и шаг в сторону, где она меньше"]={
    p:[ bg(0)+`<rect x="20" y="54" width="20" height="18" fill="${C.blue}"/><rect x="70" y="30" width="20" height="42" fill="${C.grn}"/>`+txt(30,48,"1.2",9,C.blue)+txt(80,24,"2.0",9,C.grn)+`<path d="M44 54 H100" stroke="${C.red}" stroke-width="1.4" stroke-dasharray="3 2"/>`+arrowU(100,54,32,C.red)+txt(108,48,"0.8",7,C.red),
        bg(1)+hill+`<circle cx="28" cy="44" r="5" fill="${C.red}" stroke="${C.ink}"/>`+`<path d="M34 50 l10 10" stroke="${C.red}" stroke-width="2" stroke-linecap="round"/><path d="M40 61 l5 0 l0 -5" stroke="${C.red}" stroke-width="2" fill="none"/>`,
        bg(2)+hill+[[24,40],[34,52],[44,59],[52,63],[58,64.5]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${2+i*.5}" fill="${C.red}" opacity="${.3+i*.17}"/>`).join("")+txt(96,74,"×10⁶",8,C.ink),
        bg(3)+txt(60,30,"w: 0 → 1.99",11,C.ink)+txt(60,52,"50 ×",10,C.blue)+ok(60,70,.8) ],
    l:[["ошибка = разница","error = the gap"],["шаг вниз по уклону","step down the slope"],["и так миллионы раз","millions of times"],["50 шагов: 1.99","50 steps: 1.99"]],
    c:["Я щупаю уклон ошибки и делаю маленький шаг вниз. Миллионы повторов — вот и вся учёба.","I feel the slope of the error and step a little down. Millions of repeats — that's learning."] };

  Z["AI: нейрон и обучение|Зазубрил или понял: переобучение"]={
    p:[ bg(0)+[0,1,2,3].map(i=>card(18+i*14,46,11,16,"#fff",L(-3.5,-2,7,C.blue))).join("")+`<rect x="76" y="30" width="34" height="34" rx="3" fill="#5f6884" stroke="${C.ink}" stroke-width="1.3"/>`+lock(93,47,.9)+txt(39,72,"80%",8,C.ink)+txt(93,76,"20%",8,C.ink),
        bg(1)+[0,1,2].map(i=>card(28,22+i*18,22,14,"#fff",L(-7,-2,14,C.blue))+ok(48,22+i*18,.6)).join("")+kid(90,82,.95,C.grn,"smile"),
        bg(2)+`<path d="M14 72 H108 M14 72 V14" stroke="${C.ink}" stroke-width="1.3"/><path d="M16 22 Q50 50 106 64" stroke="${C.blue}" stroke-width="2.4" fill="none"/><path d="M16 30 Q44 64 60 54 T106 18" stroke="${C.red}" stroke-width="2.4" fill="none"/>`+no(96,32,.7) ],
    l:[["часть данных — в сейф","some data goes in a safe"],["на знакомых — идеально","perfect on seen data"],["на новых — провал","fails on new data"]],
    c:["Если на знакомых примерах ошибок всё меньше, а на отложенных больше — модель зубрит.","If errors drop on known examples but grow on held-out ones, the model is cramming."] };

  Z["AI: нейрон и обучение|Почему нужны видеокарты"]={
    p:[ bg(0)+Array.from({length:16},(_,i)=>`<rect x="${14+(i%4)*11}" y="${20+Math.floor(i/4)*11}" width="9" height="9" rx="1.5" fill="${C.blue}" opacity="${.5+(i%3)*.2}"/>`).join("")+txt(70,46,"×",14,C.ink)+Array.from({length:4},(_,i)=>`<rect x="84" y="${20+i*11}" width="9" height="9" rx="1.5" fill="${C.grn}"/>`).join(""),
        bg(1)+chip(36,38,txt(0,4,"CPU",7,C.yel))+[0,1,2,3].map(i=>`<rect x="${70+i*10}" y="30" width="8" height="8" rx="1.5" fill="${i<1?C.grn:"#d9dde5"}" stroke="${C.ink}" stroke-width=".6"/>`).join("")+clock(90,60,.9,8),
        bg(2)+`<rect x="12" y="14" width="96" height="58" rx="5" fill="#3b4256"/>`+Array.from({length:60},(_,i)=>`<rect x="${16+(i%12)*7.6}" y="${18+Math.floor(i/12)*10.6}" width="6" height="8" rx="1" fill="${C.grn}"/>`).join("")+txt(60,84,"GPU",8,C.ink) ],
    l:[["матрица × вектор","matrix × vector"],["CPU: по нескольку","CPU: a few at a time"],["GPU: тысячи сразу","GPU: thousands at once"]],
    c:["Слой — это тысячи одинаковых умножений. Видеокарта делает их разом, процессор — по очереди.","A layer is thousands of identical multiplications. A GPU does them all at once, a CPU in turn."] };

  const brick=(x,y,w,col,n)=>`<rect x="${x}" y="${y}" width="${w}" height="16" rx="3" fill="${col}" stroke="${C.ink}" stroke-width="1.2"/>`+(n!=null?txt(x+w/2,y+28,n,7.5,C.ink):"");
  Z["AI: слова в числа|Токены: модель не видит слов"]={
    p:[ bg(0)+brick(36,30,48,C.grn,"512")+bot(100,82,.5,{mood:"smile"}),
        bg(1)+brick(10,30,22,C.yel,"17")+brick(36,30,44,C.blue,"3021")+brick(84,30,26,C.red,"88"),
        bg(2)+chip(28,40,txt(0,4,"#",9,C.yel))+arrowR(52,40,66)+card(90,40,44,30,"#fff",txt(0,-2,"512 17",8,C.ink)+txt(0,9,"3021 88",8,C.ink)),
        bg(3)+txt(14,30,"EN",8,C.ink)+brick(24,18,40,C.grn)+brick(66,18,40,C.grn)+txt(14,60,"RU",8,C.ink)+[0,1,2,3,4].map(i=>brick(24+i*17,48,15,C.yel)).join("")+txt(60,84,"2 &lt; 5",8,C.red) ],
    l:[["частое слово — 1 токен","common word — 1 token"],["редкое — на куски","rare word — in pieces"],["модель видит номера","the model sees numbers"],["русский режется мельче","RU splits into more"]],
    c:["Я вижу не буквы, а номера кусочков. Поэтому плохо считаю буквы в слове.","I see chunk numbers, not letters. That's why I'm bad at counting letters in a word."] };

  Object.assign(window.ZKSVG, Z);
})();

/* ---- пачка 9 ---- */
(function(){ const {C,S,bg,txt,bot,bulb,sw,card,arrowR,box,paper,chip,spark,think,ok,no,db,server,cloud,env,lock,key,kid,gear,clock,laptop,phone,coin,mag,bubble,curve}=window.ZKKIT;
  /* ---- свои детали ---- */
  const f=n=>Math.round(n*10)/10;
  const ar=(x1,y1,x2,y2,col,w)=>{ const a=Math.atan2(y2-y1,x2-x1),h=5,c=col||C.ink,sw_=w||2;
    return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${sw_}" stroke-linecap="round"/><path d="M${f(x2-h*Math.cos(a-.55))} ${f(y2-h*Math.sin(a-.55))} L${x2} ${y2} L${f(x2-h*Math.cos(a+.55))} ${f(y2-h*Math.sin(a+.55))}" fill="none" stroke="${c}" stroke-width="${sw_}" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const vec=(x,y,deg,len,col,w)=>ar(x,y,f(x+len*Math.cos(deg*Math.PI/180)),f(y-len*Math.sin(deg*Math.PI/180)),col,w);
  const dot=(x,y,r,col,op)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col||C.ink}"${op!=null?` opacity="${op}"`:""}/>`;
  const R=(x,y,w,h,col,o)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${(o&&o.rx)!=null?o.rx:2}" fill="${col}"${o&&o.st?` stroke="${o.st}" stroke-width="${o.sw||1.2}"`:""}${o&&o.op!=null?` opacity="${o.op}"`:""}${o&&o.dash?` stroke-dasharray="3 2.5"`:""}/>`;
  /* слово-карточка без букв: полоска внутри */
  const wc=(x,y,w,col,op)=>`<g${op!=null?` opacity="${op}"`:""}><rect x="${x-w/2}" y="${y-6}" width="${w}" height="12" rx="3" fill="${col||"#fff"}" stroke="${C.ink}" stroke-width="1.1"/><path d="M${x-w/2+3} ${y} h${w-6}" stroke="${col&&col!=="#fff"?"#fff":C.grey}" stroke-width="2" stroke-linecap="round"/></g>`;
  /* лист с серыми строчками */
  const doc=(x,y,w,h,n,col,rot)=>card(x,y,w,h,col||"#fff",Array.from({length:n},(_,i)=>`<path d="M${-w/2+4} ${-h/2+6+i*5} h${w-8-(i%3===2?6:0)}" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`).join(""),rot);
  /* сетка весов: m — строки чисел 0..1 */
  const grid=(x,y,m,cs,col)=>m.map((r,i)=>r.map((v,j)=>`<rect x="${x+j*cs}" y="${y+i*cs}" width="${cs}" height="${cs}" fill="${col}" fill-opacity="${f(.08+v*.9)}" stroke="#fff" stroke-width="1"/>`).join("")).join("")+`<rect x="${x}" y="${y}" width="${cs*m[0].length}" height="${cs*m.length}" fill="none" stroke="${C.ink}" stroke-width="1.2"/>`;
  const thermo=(x,y,lv)=>`<rect x="${x-3.5}" y="${y-38}" width="7" height="36" rx="3.5" fill="#fff" stroke="${C.ink}" stroke-width="1.2"/><rect x="${x-1.8}" y="${f(y-4-lv*32)}" width="3.6" height="${f(lv*32+4)}" fill="${C.red}"/><circle cx="${x}" cy="${y}" r="5.5" fill="${C.red}" stroke="${C.ink}" stroke-width="1.2"/>`;
  const crown=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-9 5 L-9 -5 L-4.5 0 L0 -8 L4.5 0 L9 -5 L9 5 Z" fill="${col||C.yel}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g>`;
  const banana=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-11 -5 Q0 13 11 -5 Q0 4 -11 -5 Z" fill="${C.yel}" stroke="#c99a1e" stroke-width="1.3" stroke-linejoin="round"/></g>`;
  const cat=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-8 -3 L-7 -13 L-2 -8 L2 -8 L7 -13 L8 -3 Q8 8 0 8 Q-8 8 -8 -3 Z" fill="#f2a65a" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/><circle cx="-3" cy="-1" r="1.2" fill="${C.ink}"/><circle cx="3" cy="-1" r="1.2" fill="${C.ink}"/><path d="M-1 2.5 h2 M-12 1 h6 M6 1 h6" stroke="${C.ink}" stroke-width=".9"/></g>`;
  const dog=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="8" fill="${C.wood}" stroke="${C.ink}" stroke-width="1.2"/><ellipse cx="-8" cy="-1" rx="3.2" ry="6" fill="${C.wood2}" stroke="${C.ink}" stroke-width="1"/><ellipse cx="8" cy="-1" rx="3.2" ry="6" fill="${C.wood2}" stroke="${C.ink}" stroke-width="1"/><circle cx="-3" cy="-2" r="1.2" fill="${C.ink}"/><circle cx="3" cy="-2" r="1.2" fill="${C.ink}"/><ellipse cy="3" rx="2" ry="1.4" fill="${C.ink}"/></g>`;
  const fish=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M7 0 L14 -6 L14 6 Z" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.1" stroke-linejoin="round"/><ellipse rx="9" ry="6" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.2"/><circle cx="-4" cy="-1.5" r="1.3" fill="${C.ink}"/></g>`;
  const door=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-9" y="-32" width="18" height="32" rx="2" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.5"/><rect x="-6" y="-28" width="12" height="10" rx="1" fill="none" stroke="${C.wood2}"/><circle cx="5" cy="-14" r="1.6" fill="${C.ink}"/></g>`;
  const spring=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><ellipse cy="0" rx="16" ry="4" fill="${C.blue}" opacity=".5"/><path d="M0 -26 Q-7 -15 -7 -11 a7 7 0 0 0 14 0 Q7 -15 0 -26 Z" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.2"/><path d="M-12 -2 q3 -3 6 0 t6 0 t6 0 t6 0" stroke="#fff" stroke-width="1.2" fill="none"/></g>`;
  const books=(x,y,n,w)=>Array.from({length:n},(_,i)=>`<rect x="${x-(w||26)/2+(i%2?2:-2)}" y="${y-(i+1)*6}" width="${w||26}" height="6" rx="1.2" fill="${[C.red,C.blue,C.grn,C.yel,"#c86bfa"][i%5]}" stroke="${C.ink}" stroke-width=".9"/>`).join("");
  const scis=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-8 -4 L10 3 M-8 4 L10 -3" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/><circle cx="-11" cy="-5" r="3.4" fill="#fff" stroke="${C.red}" stroke-width="2"/><circle cx="-11" cy="5" r="3.4" fill="#fff" stroke="${C.red}" stroke-width="2"/></g>`;
  const badge=(x,y,n,col)=>`<circle cx="${x}" cy="${y}" r="7" fill="${col||C.bot2}"/>`+txt(x,y+3.3,n,9,"#fff");
  const eiffel=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-7 0 L-1.5 -20 L-1 -26 L1 -26 L1.5 -20 L7 0 M-4.5 -8 H4.5 M-2.5 -15 H2.5" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-linejoin="round"/></g>`;
  const head=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><circle r="6" fill="#f6d1b0" stroke="${C.ink}" stroke-width=".8"/><path d="M-6 -1.5 a6 6 0 0 1 12 0 q-6 -3 -12 0" fill="${col||"#5b3a29"}"/></g>`;
  const bhead=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-7" y="-6" width="14" height="12" rx="4" fill="${C.bot}"/><rect x="-5" y="-4" width="10" height="8" rx="2.5" fill="${C.face}"/><circle cx="-2.2" cy="0" r="1" fill="${C.ink}"/><circle cx="2.2" cy="0" r="1" fill="${C.ink}"/></g>`;
  const loopArr=(x,y,r,col)=>`<path d="M${x+r} ${y} A${r} ${r} 0 1 1 ${x} ${y-r}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round"/><path d="M${x-5} ${y-r-4} L${x} ${y-r} L${x-5} ${y-r+4}" fill="none" stroke="${col||C.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const funnel=(x,y,s,col)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><path d="M-12 -12 H12 L3 0 V10 L-3 13 V0 Z" fill="${col||C.blue}" stroke="${C.ink}" stroke-width="1.2" stroke-linejoin="round"/></g>`;
  const safe=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><rect x="-15" y="-30" width="30" height="30" rx="3" fill="#7d8599" stroke="${C.ink}" stroke-width="1.3"/><circle cy="-15" r="7" fill="#fff" stroke="${C.ink}"/><path d="M0 -15 l4 -3" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/></g>`;

  /* точки для векторной базы: три кластера */
  const PA=[[22,24],[34,20],[27,36],[39,31]], PB=[[80,20],[95,17],[88,32],[102,28]], PC=[[48,58],[60,66],[74,61],[55,47],[71,49]], Q=[63,57];
  const pts=(col)=>PA.concat(PB,PC).map(p=>dot(p[0],p[1],2.6,col||C.bot2)).join("");
  const qstar=spark(Q[0],Q[1],C.red);

  const Z={};
  const G1="AI: слова в числа|", G2="AI: трансформер|", G3="AI: языковая модель|", G4="AI: RAG и агенты|", G5="AI: в проде на Java|";

  /* ===== слова в числа ===== */
  Z[G1+"Эмбеддинг: слово как точка в пространстве"]={
    p:[ bg(0)+cat(28,30,1.3)+card(28,56,28,14,"#fff",txt(0,4,"517",9))+dog(88,30,1.3)+card(88,56,36,14,"#fff",txt(0,4,"40213",9))+txt(58,46,"?",18,C.red),
        bg(1)+card(20,40,26,16,"#fff",txt(0,4,"517",9))+arrowR(36,40,50)+card(66,40,28,60,"#fff",["0.2","−1.3","0.8","…","0.5"].map((s,i)=>txt(0,-19+i*10,s,8)).join(""))+bot(102,82,.6,{mood:"wow"}),
        bg(2)+`<path d="M12 70 H112 M12 70 V8" stroke="${C.grey}" stroke-width="1.4"/>`+`<ellipse cx="38" cy="26" rx="20" ry="13" fill="#fff" opacity=".7" stroke="${C.grn}" stroke-dasharray="3 2.5"/>`+crown(30,26,1,C.yel)+crown(47,28,.9,"#c86bfa")+banana(96,58,1.2)+`<path d="M58 34 L86 54" stroke="${C.ink}" stroke-width="1.4" stroke-dasharray="3 2.5"/>` ],
    l:[["номер ничего не значит","a number means nothing"],["номер → сотни чисел","number → hundreds of nums"],["похожие — рядом","similar ones sit close"]],
    c:["Номер слова — просто ярлык. Вектор — адрес на карте смыслов: похожие слова живут рядом.","A word's number is just a tag. A vector is a spot on a meaning map: similar words live close."] };

  Z[G1+"Похожесть — это угол между векторами"]={
    p:[ bg(0)+vec(22,64,38,76,C.blue,2.6)+vec(22,64,38,40,C.red,2.6)+dot(22,64,2.5)+txt(98,62,"= 1",14,C.grn),
        bg(1)+vec(26,64,0,62,C.blue,2.6)+vec(26,64,90,48,C.red,2.6)+`<path d="M34 64 V56 H26" fill="none" stroke="${C.ink}" stroke-width="1.2"/>`+dot(26,64,2.5)+txt(92,36,"= 0",14,C.ink),
        bg(2)+vec(60,46,0,46,C.blue,2.6)+vec(60,46,180,40,C.red,2.6)+dot(60,46,2.6)+txt(60,26,"= −1",14,C.red),
        bg(3)+vec(12,66,44,40,"#c86bfa",2.2)+vec(12,66,60,38,"#d9a400",2.2)+crown(46,30,.7,"#c86bfa")+crown(30,24,.7,C.yel)+txt(28,12,"0.99",9,C.grn)+
          `<path d="M60 8 V70" stroke="${C.grey}" stroke-dasharray="3 2.5"/>`+vec(68,66,82,36,"#d9a400",2.2)+vec(68,66,12,38,C.wood2,2.2)+crown(73,22,.7,C.yel)+banana(106,50,.8)+txt(98,24,"0.16",9,C.red) ],
    l:[["в одну сторону = 1","same way = 1"],["поперёк = 0","at right angles = 0"],["навстречу = −1","opposite = −1"],["король и банан — далеко","king vs banana — far"]],
    c:["Длина стрелки не важна — важно, куда она смотрит. Чем меньше угол, тем ближе смысл.","Arrow length doesn't matter, only where it points. Smaller angle means closer meaning."] };

  Z[G1+"Одно слово — разные векторы: смысл зависит от контекста"]={
    p:[ bg(0)+door(18,70,1)+key(62,14,1)+spring(102,70,.9)+ar(28,46,44,42,C.grey)+ar(92,46,76,42,C.grey)+card(60,40,30,14,"#fff",txt(0,4,"0.3 0.7",8))+no(60,60,.9),
        bg(1)+door(20,70,1)+key(56,48,1.1)+`<path d="M52 40 Q38 22 26 34" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="3 2.5"/>`+vec(84,66,62,40,C.wood2,2.8)+txt(108,26,"A",14,C.wood2),
        bg(2)+spring(24,70,1)+key(58,48,1.1)+`<path d="M54 40 Q40 20 28 38" fill="none" stroke="${C.ink}" stroke-width="1.5" stroke-dasharray="3 2.5"/>`+vec(80,62,15,30,C.blue,2.8)+txt(104,40,"B",14,C.blue) ],
    l:[["словарь: один вектор","dictionary: one vector"],["рядом дверь — вектор A","near a door — vector A"],["рядом родник — вектор B","near a spring — vector B"]],
    c:["Я смотрю на соседей слова и пересчитываю его вектор. Ключ у двери и ключ у родника — разные.","I look at a word's neighbours and recompute its vector. A door key and a spring are different."] };

  Z[G1+"Векторная база: поиск ближайших точек"]={
    p:[ bg(0)+PA.concat(PB,PC).map(p=>`<path d="M${Q[0]} ${Q[1]} L${p[0]} ${p[1]}" stroke="${C.grey}" stroke-width="1"/>`).join("")+pts()+qstar+clock(104,64,.8,4),
        bg(1)+[[0,1],[1,3],[3,2],[3,11],[1,4],[4,6],[6,7],[5,6],[11,8],[11,12],[12,10],[8,9],[9,10],[2,8]].map(e=>{const a=PA.concat(PB,PC)[e[0]],b=PA.concat(PB,PC)[e[1]];return `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${C.grey}" stroke-width="1.2"/>`;}).join("")+
          `<path d="M22 24 L39 31 L55 47" fill="none" stroke="${C.grn}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`+pts()+qstar+`<circle cx="55" cy="47" r="5" fill="none" stroke="${C.grn}" stroke-width="1.6"/>`,
        bg(2)+`<circle cx="30" cy="28" r="15" fill="#fff" opacity=".5" stroke="${C.grey}" stroke-dasharray="3 2.5"/><circle cx="91" cy="24" r="16" fill="#fff" opacity=".5" stroke="${C.grey}" stroke-dasharray="3 2.5"/><circle cx="61" cy="56" r="17" fill="${C.yel}" opacity=".45" stroke="${C.ink}" stroke-width="1.3"/>`+pts()+qstar,
        bg(3)+db(30,48,1.2)+txt(82,30,"pgvector",9)+txt(82,48,"&lt;-&gt;",12,C.blue)+txt(82,64,"HNSW",9,C.grn) ],
    l:[["мерить до всех — долго","measuring all — slow"],["HNSW: прыжки к соседям","HNSW: hop to neighbours"],["IVF: один кластер","IVF: just one cluster"],["в Postgres: pgvector","in Postgres: pgvector"]],
    c:["Найти похожее — найти ближайшие точки. Не меряю до всех — иду по карте от района к району.","Similar means nearest points. Not to measure them all, I walk the map district by district."] };

  /* ===== трансформер ===== */
  const row8=(y,ops)=>Array.from({length:8},(_,i)=>wc(12+i*13.7,y,11,i===0?C.red:i===7?C.grn:"#fff",ops?ops[i]:null)).join("");
  Z[G2+"Проблема: далёкие слова связаны"]={
    p:[ bg(0)+row8(36)+`<path d="M12 50 V56 H108 V50" fill="none" stroke="${C.ink}" stroke-width="1.4"/>`+txt(60,68,"10",11),
        bg(1)+row8(28,[.15,.25,.4,1,1,1,1,1])+`<path d="M1 18 H52 V38 H1 Z M68 18 H119 V38 H68 Z" fill="${C.ink}" opacity=".55"/>`+bot(56,84,.62,{mood:"think",glasses:true})+txt(84,58,"?",16,C.red),
        bg(2)+row8(52)+`<path d="M108 45 Q60 -2 12 45" fill="none" stroke="${C.grn}" stroke-width="2.4" stroke-linecap="round"/><path d="M13 37 L12 45 L19 42" fill="none" stroke="${C.grn}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`+ok(60,68,.8) ],
    l:[["связаны через 10 слов","linked 10 words apart"],["по слову — начало забыто","word by word — start lost"],["нужен прямой взгляд","need a direct look"]],
    c:["«Подписан» — это про договор в самом начале. Читая по слову, старые модели его забывали.","“Signed” refers to the contract at the very start. Reading word by word, old models forgot it."] };

  const xs5=[16,38,60,82,104];
  Z[G2+"Внимание: каждое слово смотрит на все остальные"]={
    p:[ bg(0)+[[16,3.6,C.red],[38,.8,C.ink],[60,1.4,C.ink],[82,.6,C.ink]].map(a=>`<path d="M104 56 Q${(104+a[0])/2} ${56-(104-a[0])*.45} ${a[0]} 56" fill="none" stroke="${a[2]}" stroke-width="${a[1]}" stroke-linecap="round"/>`).join("")+xs5.map((x,i)=>wc(x,62,18,i===4?C.grn:i===0?C.red:"#fff")).join(""),
        bg(1)+grid(16,12,[[.9,.1,.2,.1],[.3,.7,.1,.2],[.1,.2,.8,.3],[.95,.05,.15,.1]],13,C.blue)+`<rect x="16" y="51" width="52" height="13" fill="none" stroke="${C.red}" stroke-width="2"/>`+bot(96,82,.65,{mood:"think",arms:"reach"}),
        bg(2)+[["0.8",C.red],["0.1",C.blue],["0.1",C.grey]].map((r,i)=>txt(14,26+i*16,r[0],8)+R(26,19+i*16,30,9,r[1],{st:C.ink,sw:1}) ).join("")+arrowR(62,40,78)+R(84,35,22,10,C.red,{rx:0})+R(106,35,3,10,C.blue,{rx:0})+R(109,35,3,10,C.grey,{rx:0})+`<rect x="84" y="35" width="28" height="10" rx="2" fill="none" stroke="${C.ink}" stroke-width="1.2"/>`,
        bg(3)+chip(60,40,txt(0,3,"GPU",7,"#fff"))+spark(22,22)+spark(100,24,C.ant)+spark(98,62,C.grn)+spark(20,60,C.blue) ],
    l:[["каждое смотрит на всех","each looks at all"],["таблица весов","a table of weights"],["новый вектор — смесь","new vector is a blend"],["всё разом на видеокарте","all at once on a GPU"]],
    c:["«Подписан» сильнее всех смотрит на «договор». Я смешиваю соседей по весам — так слово умнеет.","“Signed” looks hardest at “contract”. I blend neighbours by weight, and the word gets smarter."] };

  Z[G2+"Много голов: несколько вопросов сразу"]={
    p:[ bg(0)+xs5.map(x=>wc(x,14,18)).join("")+[[22,16,C.red],[60,82,C.blue],[98,38,C.grn]].map(h=>`<path d="M${h[0]} 46 L${h[1]} 21" stroke="${h[2]}" stroke-width="2" stroke-linecap="round"/>`+bot(h[0],84,.55,{mood:"think"})+dot(h[0],50,3,h[2])).join(""),
        bg(1)+grid(6,26,[[.9,.1,.1],[.8,.2,.1],[.9,.1,.2]],10,C.red)+grid(45,26,[[.1,.2,.9],[.2,.1,.8],[.1,.9,.1]],10,C.blue)+grid(84,26,[[.2,.9,.1],[.1,.2,.9],[.9,.1,.1]],10,C.grn),
        bg(2)+[C.red,C.blue,C.grn].map((c,i)=>R(10,20+i*16,26,9,c,{st:C.ink,sw:1})+ar(40,24+i*16,58,40,C.ink,1.4)).join("")+R(64,35,14,10,C.red,{rx:0})+R(78,35,14,10,C.blue,{rx:0})+R(92,35,14,10,C.grn,{rx:0})+`<rect x="64" y="35" width="42" height="10" rx="2" fill="none" stroke="${C.ink}" stroke-width="1.2"/>` ],
    l:[["у каждой головы свой взор","each head has its own view"],["у каждой своя таблица","each has its own table"],["результаты склеили","results glued together"]],
    c:["Одна голова ищет подлежащее, другая — время, третья — ещё что-то. Что искать, они выучили сами.","One head finds the subject, another the tense, a third something else. They learned that alone."] };

  const blk=(x,y,w)=>`<rect x="${x-w/2}" y="${y}" width="${w}" height="9" rx="2.5" fill="${C.bot}" stroke="${C.ink}" stroke-width="1"/><circle cx="${x-w/4}" cy="${y+4.5}" r="2" fill="${C.yel}"/><circle cx="${x+w/4}" cy="${y+4.5}" r="2" fill="#fff"/>`;
  Z[G2+"Блок трансформера, повторённый десятки раз"]={
    p:[ bg(0)+`<rect x="8" y="14" width="104" height="54" rx="8" fill="#fff" stroke="${C.bot2}" stroke-width="2"/>`+[[22,28],[42,24],[26,52],[46,54]].map((a,i,A)=>A.slice(i+1).map(b=>`<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${C.blue}" stroke-width="1.3"/>`).join("")).join("")+[[22,28],[42,24],[26,52],[46,54]].map(p=>dot(p[0],p[1],4,C.blue)).join("")+txt(62,45,"+",16)+gear(90,41,1.1,C.grey),
        bg(1)+Array.from({length:6},(_,i)=>blk(44,64-i*10,44)).join("")+txt(44,10,"⋮",10)+txt(80,30,"×48",12,C.bot2)+bot(98,82,.55,{mood:"wow"}),
        bg(2)+Array.from({length:6},(_,i)=>blk(40,64-i*10,30)).join("")+wc(84,68,16)+wc(104,68,16)+ar(94,58,94,30,C.ink,1.6)+bulb(94,18,true,7) ],
    l:[["внимание + маленькая сеть","attention + small network"],["блоки стопкой, десятки","dozens stacked up"],["внизу слова, вверху смысл","words below, meaning above"]],
    c:["Каждый блок: собрать от соседей и переварить. Десятки кругов — от букв до смысла всего текста.","Each block gathers from neighbours, then digests. Dozens of rounds — from letters to meaning."] };

  Z[G2+"Откуда модель знает порядок слов"]={
    p:[ bg(0)+cat(20,26,1)+ar(34,26,48,26,C.ink,1.6)+fish(60,26,1)+fish(18,58,1)+ar(34,58,48,58,C.ink,1.6)+cat(62,58,1)+txt(98,48,"≠",22,C.red),
        bg(1)+cat(16,24,.7)+fish(34,24,.7)+fish(16,52,.7)+cat(34,52,.7)+ar(48,26,66,36)+ar(48,52,66,44)+`<path d="M76 62 Q74 34 86 30 h12 Q112 34 110 62 Z" fill="${C.wood}" stroke="${C.wood2}" stroke-width="1.4"/>`+cat(86,50,.7)+fish(100,44,.6)+txt(93,22,"=",14),
        bg(2)+cat(24,30,1.1)+badge(36,16,"1",C.red)+fish(84,30,1.1)+badge(98,16,"3",C.red)+R(10,52,28,9,"#f2a65a",{st:C.ink,sw:1})+txt(46,60,"+",12)+R(54,52,10,9,C.red,{st:C.ink,sw:1})+txt(72,60,"=",12)+R(80,52,28,9,"#f2a65a",{st:C.ink,sw:1})+R(102,52,6,9,C.red,{rx:0}) ],
    l:[["разный порядок — смысл","order changes meaning"],["вниманию — один мешок","attention sees one bag"],["к вектору — номер места","add the position"]],
    c:["Без меток места «кот съел рыбу» и «рыба съела кота» для меня одинаковы. Метка всё решает.","Without position marks, “cat ate fish” and “fish ate cat” look the same to me. Marks fix it."] };

  /* ===== языковая модель ===== */
  Z[G3+"Языковая модель предсказывает следующий токен"]={
    p:[ bg(0)+books(30,74,8,34)+books(64,74,5,26)+bot(98,82,.75,{glasses:true,mood:"think"}),
        bg(1)+wc(18,40,18)+wc(40,40,18)+wc(62,40,18)+`<rect x="75" y="31" width="30" height="18" rx="4" fill="#fff" stroke="${C.red}" stroke-width="1.6" stroke-dasharray="3 2.5"/>`+txt(90,44,"?",13,C.red),
        bg(2)+[[46,C.grn],[12,C.grey],[8,C.grey],[5,C.grey],[3,C.grey]].map((b,i)=>R(14+i*20,70-b[0],14,b[0],b[1],{st:C.ink,sw:1})).join("")+eiffel(21,22,.75)+txt(21,8,"0.9",8,C.grn)+txt(80,40,"…",12) ],
    l:[["прочитала горы текста","read mountains of text"],["что дальше?","what comes next?"],["вероятность каждого","a chance for each"]],
    c:["Я учусь одному: угадывать следующее слово. Грамматику и факты пришлось выучить заодно.","I learn one thing: guess the next word. Grammar and facts came along as a side effect."] };

  Z[G3+"Генерация по одному токену: почему медленно"]={
    p:[ bg(0)+chip(28,34)+wc(60,66,14)+wc(76,66,14)+wc(92,66,14)+wc(108,66,13,C.grn)+`<path d="M50 30 Q96 22 106 56" fill="none" stroke="${C.grn}" stroke-width="2" stroke-linecap="round"/><path d="M101 52 L106 58 L109 51" fill="none" stroke="${C.grn}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`+`<path d="M52 66 H30 V58" fill="none" stroke="${C.ink}" stroke-width="1.6" stroke-dasharray="3 2.5"/><path d="M26 62 L30 57 L34 62" fill="none" stroke="${C.ink}" stroke-width="1.6"/>`,
        bg(1)+[1,2,3,4,5].map(i=>Array.from({length:i},(_,j)=>R(10+j*9,8+i*11,7,7,j===i-1?C.grn:"#fff",{st:C.ink,sw:.9})).join("")).join("")+clock(92,30,1.3,4)+txt(92,60,"×500",13,C.red),
        bg(2)+laptop(54,72,1.6,`<path d="M-11 -17 h9 M0 -17 h7 M-11 -12 h12" stroke="${C.ink}" stroke-width="1.6" stroke-linecap="round"/><rect x="3" y="-14" width="1.6" height="4" fill="${C.red}"/>`)+txt(54,18,"SSE",10,C.blue)+kid(104,82,.8,C.red) ],
    l:[["токен — в конец текста","token goes to the end"],["500 токенов — 500 кругов","500 tokens — 500 passes"],["первое слово — сразу","first word shows at once"]],
    c:["Я пишу по одному слову и каждый раз перечитываю всё. Зато первое слово можно показать сразу.","I write one word at a time, rereading everything. But the first word can be shown right away."] };

  Z[G3+"Температура: случайность на выходе"]={
    p:[ bg(0)+thermo(16,64,.08)+[[52,C.grn],[6,C.grey],[4,C.grey],[3,C.grey],[2,C.grey]].map((b,i)=>R(34+i*16,70-b[0],12,b[0],b[1],{st:C.ink,sw:1})).join("")+txt(40,12,"0",10),
        bg(1)+thermo(16,64,.9)+[[22,C.grn],[19,C.blue],[16,C.yel],[14,"#c86bfa"],[12,C.red]].map((b,i)=>R(34+i*16,70-b[0],12,b[0],b[1],{st:C.ink,sw:1})).join("")+txt(70,26,"?",14,C.red),
        bg(2)+thermo(12,64,.08)+laptop(36,68,.9,txt(0,-10,"{ }",8))+`<path d="M60 10 V70" stroke="${C.grey}" stroke-dasharray="3 2.5"/>`+thermo(72,64,.9)+bulb(92,34,true,7)+bulb(108,54,true,5) ],
    l:[["0 — всегда самый вероятный","0 — always the top one"],["выше — смелее и чуднее","higher — bolder, weirder"],["код — низко, идеи — выше","code low, ideas higher"]],
    c:["Температура — ручка смелости. Для кода держу её у нуля, для мозгового штурма поднимаю.","Temperature is a boldness knob. Near zero for code, turned up for brainstorming."] };

  const sheets=(x,y,cols)=>cols.map((c,i)=>doc(x+i*4,y+i*4,24,30,4,c)).join("");
  Z[G3+"Контекстное окно: память модели — это промпт"]={
    p:[ bg(0)+bot(36,82,.85,{mood:"think"})+think(70,26,txt(11,1,"?",13,C.red)),
        bg(1)+sheets(22,34,[C.grey,"#cfe5fb","#ffe9a8"])+arrowR(48,40,62)+bot(90,82,.8,{glasses:true}),
        bg(2)+`<rect x="8" y="10" width="64" height="60" rx="4" fill="#fff" opacity=".6" stroke="${C.bot2}" stroke-width="2"/>`+sheets(24,30,[C.grey,"#cfe5fb"])+doc(56,40,18,26,3,"#ffe9a8")+doc(96,40,22,30,4,"#ffe9a8")+no(96,64,.8),
        bg(3)+[1,2,3].map(n=>Array.from({length:n},(_,j)=>R(14+(n-1)*36-6,62-j*8,24,7,["#cfe5fb",C.grey,"#ffe9a8"][j],{st:C.ink,sw:.9})).join("")+Array.from({length:n},(_,j)=>coin(14+(n-1)*36+6-j*9+ (n-1)*4,22,.7)).join("")).join("") ],
    l:[["между вызовами пусто","nothing between calls"],["всё в запросе","it's all in the request"],["не влезло — не видела","didn't fit — never seen"],["вся история — каждый раз","whole history every time"]],
    c:["У меня нет памяти. Я знаю только то, что лежит в папке этого запроса, — и за папку платят.","I have no memory. I only know what's in this request's folder — and you pay for the folder."] };

  Z[G3+"Галлюцинации: почему уверенно врёт"]={
    p:[ bg(0)+kid(24,82,.85,C.red)+bubble(28,22,20,txt(0,4,"?",12,C.red))+`<path d="M70 40 L86 36 L102 40 V64 L86 60 L70 64 Z" fill="#fff" stroke="${C.ink}" stroke-width="1.3"/><path d="M86 36 V60" stroke="${C.ink}"/>`+txt(86,30,"∅",12,C.grey),
        bg(1)+bot(32,82,.85,{arms:"up",mood:"smile"})+paper(86,38,["http://","x.io/42"])+txt(62,22,"!",14,C.red),
        bg(2)+paper(44,38,["http://","x.io/42"])+mag(76,46,1.1)+txt(96,26,"404",11,C.red)+no(98,62,.9),
        bg(3)+doc(20,36,22,30,4,"#ffe9a8")+txt(40,40,"+",14)+laptop(64,58,.9,`<path d="M-5 -13 l3 3 l6 -6" stroke="${C.grn}" stroke-width="2" fill="none" stroke-linecap="round"/>`)+ok(102,40,1.1) ],
    l:[["точного ответа не было","there was no real answer"],["уверенно выдумала","made it up, confidently"],["а ссылки нет","the link doesn't exist"],["лечат данными и проверкой","fix: data + code checks"]],
    c:["Я не проверяю факты, а продолжаю текст гладко. Уверенность — не знание. Дай источник и проверь.","I don't check facts, I just continue text. Confidence isn't knowledge. Give sources, check me."] };

  Z[G3+"Как учат LLM: три этапа"]={
    p:[ bg(0)+badge(12,12,"1")+books(32,74,9,32)+bot(82,82,.75,{glasses:true})+coin(98,20)+coin(108,30)+coin(88,30),
        bg(1)+badge(12,12,"2")+card(34,40,30,26,"#fff",txt(0,6,"?",16,C.blue))+arrowR(54,40,68)+card(88,40,30,26,"#fff",txt(0,6,"!",16,C.grn))+ok(100,24,.7),
        bg(2)+badge(12,12,"3")+card(28,34,26,24,"#fff",txt(0,5,"A",13))+card(92,34,26,24,"#fff",txt(0,5,"B",13))+ok(28,56,.8)+no(92,56,.8)+kid(60,84,.8,C.grn) ],
    l:[["прочитать всё","read everything"],["вопрос → хороший ответ","question → good answer"],["люди выбирают лучшее","people pick the better one"]],
    c:["Сначала я читала всё подряд, потом училась отвечать, потом люди показывали, какой ответ лучше.","First I read everything, then learned to answer, then people showed me which answer was better."] };

  Z[G3+"Системный промпт и роли"]={
    p:[ bg(0)+gear(14,20,.6)+R(26,13,86,14,"#e3e6ee",{st:C.ink,sw:1.1,rx:5})+head(106,44,.9)+R(36,37,62,14,"#cfe5fb",{st:C.ink,sw:1.1,rx:5})+bhead(14,66,1)+R(26,59,70,14,"#cbe8cd",{st:C.ink,sw:1.1,rx:5}),
        bg(1)+card(36,40,42,52,"#e3e6ee",gear(-12,-16,.5)+`<path d="M-2 -16 h14" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`+ok(-11,0,.55)+`<path d="M-2 0 h14" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`+no(-11,15,.55)+`<path d="M-2 15 h14" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`)+bot(90,82,.8,{glasses:true}),
        bg(2)+card(60,22,26,26,"#e3e6ee",`<path d="M-4 -13 l5 8 l-4 6 l5 8 l-3 4" fill="none" stroke="${C.red}" stroke-width="2"/>`)+kid(24,82,.85,C.red,"wow")+bubble(26,28,26,txt(0,4,"!!!",10,C.red))+bot(92,82,.75,{mood:"sad"}) ],
    l:[["роли: система, ты, ответы","roles: system, user, AI"],["система задаёт правила","system sets the rules"],["но это не гарантия","but it's no guarantee"]],
    c:["Системный промпт — мой инструктаж перед сменой. Я слушаюсь, но напористый может уговорить.","The system prompt is my pre-shift briefing. I try to obey, but a pushy user may talk me round."] };

  Z[G3+"Структурированный ответ и вызов инструмента"]={
    p:[ bg(0)+card(28,40,32,40,"#fff",`<path d="M-11 -12 q4 -4 8 0 t8 0 t6 -2 M-11 -3 q4 4 8 0 t8 0 M-11 6 q5 -3 10 0 t10 1" stroke="${C.grey}" stroke-width="2" fill="none"/>`)+no(28,66,.7)+arrowR(48,40,62)+card(88,40,34,40,"#fff",txt(0,-8,"{",11)+[0,1].map(i=>R(-10,-3+i*9,6,6,C.grn,{rx:1})+`<path d="M0 ${i*9} h10" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>`).join("")+txt(0,18,"}",11))+ok(88,66,.7),
        bg(1)+bubble(60,20,78,txt(0,3,"getBalance(42)",8,C.blue))+bot(28,82,.75,{arms:"reach"})+laptop(92,72,1.1)+arrowR(46,56,72),
        bg(2)+laptop(24,70,.9)+ar(42,50,58,40)+db(74,40,.8)+ar(88,46,98,56,C.grn)+card(100,24,22,14,"#fff",txt(0,4,"100",8,C.grn))+bot(104,84,.45,{arms:"up"}) ],
    l:[["не рассказ, а JSON","JSON, not a story"],["модель только просит","the model only asks"],["код вызвал и вернул","your code calls, returns"]],
    c:["Я не умею сама нажимать кнопки. Я прошу: «вызови getBalance с 42» — а вызывает твой код.","I can't press buttons myself. I ask “call getBalance with 42”, and your code does the call."] };

  /* ===== RAG и агенты ===== */
  Z[G4+"RAG: положить знание в промпт, а не в модель"]={
    p:[ bg(0)+kid(24,82,.85,C.blue)+bubble(26,24,22,txt(0,4,"%?",9,C.red))+bot(86,82,.8,{mood:"sad"})+think(96,16,txt(11,1,"∅",10,C.grey)),
        bg(1)+doc(24,46,22,30,4)+doc(30,42,22,30,4)+doc(36,38,22,30,4)+mag(42,44,.9)+ar(56,40,72,32)+doc(86,26,20,22,3,"#ffe9a8")+doc(98,48,20,22,3,"#ffe9a8"),
        bg(2)+card(18,26,18,16,"#fff",txt(0,5,"?",11,C.blue))+doc(16,54,18,22,3,"#ffe9a8")+doc(30,56,18,22,3,"#ffe9a8")+arrowR(46,44,60)+bot(82,82,.75,{arms:"up"})+bubble(100,18,24,txt(0,3,"[1]",8,C.blue)),
        bg(3)+doc(30,38,26,34,5)+`<path d="M18 24 L42 52 M42 24 L18 52" stroke="${C.red}" stroke-width="2.4" stroke-linecap="round"/>`+arrowR(50,38,66)+doc(88,38,26,34,5,"#ffe9a8")+ok(100,58,.8) ],
    l:[["модель не знает твоего","the model lacks your data"],["нашли нужные куски","found the right pieces"],["ответ по ним, с источником","answer from them + source"],["сменил документ — и всё","swap the doc — done"]],
    c:["Мне не надо зубрить твои тарифы. Положи нужную страницу рядом с вопросом — отвечу по ней.","No need to memorise your tariffs. Put the right page by the question — I'll answer from it."] };

  Z[G4+"Чанки: как режут документы"]={
    p:[ bg(0)+doc(26,40,30,64,11)+`<rect x="62" y="22" width="40" height="34" rx="4" fill="#fff" opacity=".6" stroke="${C.bot2}" stroke-width="2" stroke-dasharray="4 3"/>`+ar(44,40,58,40)+no(82,66,.8),
        bg(1)+card(40,40,40,66,"#fff",[[-27,-17,-12],[-3,2,7],[17,22]].map(g=>g.map(y=>`<path d="M-15 ${y} h30" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`).join("")).join("")+`<path d="M-22 -8 h44 M-22 12 h44" stroke="${C.red}" stroke-width="1.4" stroke-dasharray="3 2.5"/>`)+scis(84,32,1.1)+scis(84,52,1.1),
        bg(2)+doc(30,36,30,36,5)+doc(60,44,30,36,5)+doc(90,36,30,36,5)+`<rect x="45" y="28" width="15" height="16" fill="${C.yel}" opacity=".55"/><rect x="75" y="30" width="15" height="14" fill="${C.yel}" opacity=".55"/>`,
        bg(3)+doc(22,40,24,32,4,"#ffe9a8")+arrowR(38,40,50)+R(56,22,52,9,C.blue,{st:C.ink,sw:1})+card(66,48,22,13,"#fff",txt(0,4,"v2",8))+lock(96,46,.8)+card(66,64,22,11,"#fff",txt(0,3.5,"#3",8)) ],
    l:[["целиком не влезет","the whole doc won't fit"],["режем по абзацам","cut on paragraph lines"],["с нахлёстом на стыке","overlap at the seams"],["вектор + метаданные","vector + metadata"]],
    c:["Режь по смыслу, а не по линейке, и чуть внахлёст. Плохая нарезка портит ответ раньше модели.","Cut by meaning, not by ruler, with a bit of overlap. Bad chunks ruin answers before the model."] };

  const tenCards=(hl)=>Array.from({length:10},(_,i)=>{const x=14+(i%5)*23,y=i<5?20:48;const on=hl&&hl.includes(i);return doc(x,y,16,20,3,on?"#ffe9a8":"#fff",(i%3-1)*5)+(hl&&!on?`<rect x="${x-9}" y="${y-11}" width="18" height="22" fill="${C.sky[1]}" opacity=".6"/>`:"");}).join("");
  Z[G4+"Поиск, потом ответ: и почему нужен реранкинг"]={
    p:[ bg(0)+card(16,42,20,18,"#fff",txt(0,5,"?",12,C.blue))+ar(28,36,46,24)+ar(28,48,46,60)+mag(56,22,.7)+txt(58,64,"#42",10,C.wood2)+ar(70,26,86,38)+ar(74,58,86,46)+txt(102,46,"×10",11),
        bg(1)+tenCards([1,5,8])+[1,5,8].map(i=>ok(14+(i%5)*23+7,(i<5?20:48)+9,.5)).join("")+bot(60,86,.32,{glasses:true}),
        bg(2)+[0,1,2].map(i=>doc(14+i*12,46+(i-1)*4,16,20,3,"#ffe9a8",(i-1)*8)).join("")+arrowR(42,44,56)+bot(82,82,.75,{arms:"up"})+ok(106,30,.9) ],
    l:[["вектор + точный поиск","vector + exact search"],["реранкинг оставил 3","rerank keeps the top 3"],["их — в промпт","those go in the prompt"]],
    c:["Сначала быстро набираю десяток кандидатов, потом строгий эксперт оставляет три лучших.","First I quickly grab ten candidates, then a strict expert keeps the best three."] };

  Z[G4+"Дообучение или RAG: когда что"]={
    p:[ bg(0)+gear(30,36,1.4,C.grey)+ar(50,42,64,52)+bot(88,82,.8,{hat:true,mood:"smile"}),
        bg(1)+[["10",0],["12",1],["9",2]].map(d=>card(22+d[1]*22,30,18,22,"#fff",`<rect x="-9" y="-11" width="18" height="6" fill="${C.red}"/>`+txt(0,7,d[0],8))).join("")+gear(92,30,1,C.grey)+clock(92,58,.8,8)+no(108,16,.8),
        bg(2)+`<rect x="10" y="60" width="64" height="5" rx="2" fill="${C.wood}"/>`+card(40,44,26,26,"#fff",coin(0,-3,.8)+txt(0,10,"12",8))+bot(96,82,.8,{arms:"reach"})+ok(68,24,.8),
        bg(3)+`<path d="M8 72 H40 V56 H72 V40 H104 V72 Z" fill="#fff" opacity=".7" stroke="${C.ink}" stroke-width="1.2"/>`+doc(24,58,14,18,3)+mag(56,40,.8)+gear(88,26,.8)+badge(24,82-4,"1")+badge(56,82-4,"2")+badge(88,82-4,"3") ],
    l:[["дообучение — манера","fine-tuning — manner"],["факты меняются каждый день","facts change daily"],["свежие факты — листок","fresh facts — a note"],["промпт → RAG → дообучение","prompt → RAG → tune"]],
    c:["Учить манере — курс. Сегодняшние цены — листок на столе. Сначала промпт, потом RAG, потом курс.","Manner takes a course. Today's prices take a note. Prompt first, then RAG, then the course."] };

  Z[G4+"Агент: цикл «подумал — вызвал — посмотрел»"]={
    p:[ bg(0)+paper(22,38,["?","→ ✓"])+bot(70,82,.8,{mood:"think"})+think(92,18,gear(11,-2,.55)),
        bg(1)+bot(30,82,.8,{arms:"reach"})+arrowR(46,50,72)+server(94,46,1),
        bg(2)+server(22,46,1)+card(56,38,24,16,"#fff",txt(0,4,"200",9,C.grn))+arrowR(42,38,46)+mag(78,30,.8)+bot(96,82,.7,{glasses:true}),
        bg(3)+loopArr(48,44,24,C.bot2)+bot(48,72,.5)+txt(98,30,"≤10",11,C.red)+ok(98,56,1),
        bg(4)+[[db,18,"#cbe8cd"],[env,46,"#cbe8cd"],[mag,74,"#cbe8cd"]].map(t=>card(t[1],34,24,26,t[2],t[0]===db?db(0,1,.5):t[0]===env?env(0,0,.6):mag(-2,-2,.55))).join("")+card(102,34,24,26,"#e3e6ee",lock(0,-2,.7))+bot(46,84,.42)+bot(80,84,.42,{mood:"think"}) ],
    l:[["подумал","think"],["вызвал инструмент","call a tool"],["посмотрел на результат","look at the result"],["по кругу, но с лимитом","loop, with a step limit"],["власть — в инструментах","power is in the tools"]],
    c:["Я думаю, зову инструмент, смотрю результат — и снова. Звонить могу только по выданному списку.","I think, call a tool, look at the result, repeat. I can only call what's on your list."] };

  Z[G4+"MCP: единый разъём для инструментов"]={
    p:[ bg(0)+bhead(14,24,1.2)+bhead(14,58,1.2)+db(104,22,.6)+server(104,46,.5)+mag(100,66,.6)+[[22,24,104,18,C.red],[22,24,94,46,C.blue],[22,24,96,62,C.grn],[22,58,94,22,C.yel],[22,58,94,46,"#c86bfa"],[22,58,94,62,C.ant]].map(l=>`<path d="M${l[0]} ${l[1]} C60 ${l[1]} 60 ${l[3]} ${l[2]} ${l[3]}" fill="none" stroke="${l[4]}" stroke-width="1.6"/>`).join(""),
        bg(1)+bhead(14,20,1.1)+bhead(14,40,1.1)+bhead(14,60,1.1)+[20,40,60].map(y=>`<path d="M22 ${y} L46 40" stroke="${C.ink}" stroke-width="1.6"/>`).join("")+R(46,26,30,28,C.bot2,{st:C.ink,rx:5})+txt(61,44,"MCP",8,"#fff")+`<path d="M76 40 H88" stroke="${C.ink}" stroke-width="1.6"/>`+db(102,22,.5)+server(102,44,.4)+mag(100,64,.5)+`<path d="M88 22 V64 M88 22 H94 M88 44 H96 M88 62 H94" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`,
        bg(2)+R(30,10,60,60,"#fff",{st:C.ink,rx:5})+txt(60,22,"[ ]",9,C.bot2)+db(42,38,.4)+`<path d="M54 36 h26" stroke="${C.grey}" stroke-width="2.4" stroke-linecap="round"/>`+env(42,50,.45)+`<path d="M54 50 h22" stroke="${C.grey}" stroke-width="2.4" stroke-linecap="round"/>`+mag(41,61,.4)+`<path d="M54 62 h24" stroke="${C.grey}" stroke-width="2.4" stroke-linecap="round"/>`,
        bg(3)+R(14,26,30,28,C.bot2,{st:C.ink,rx:5})+txt(29,44,"MCP",8,"#fff")+lock(62,42,1.1)+kid(98,82,.85,C.grn)+key(98,28,.8) ],
    l:[["у каждого свой провод","a cable for each pair"],["один разъём для всех","one socket for all"],["сервер даёт список","the server lists tools"],["права — проверяешь ты","you check the rights"]],
    c:["MCP — как USB: один разъём вместо кабеля под каждый прибор. А кому что можно — решаешь ты.","MCP is like USB: one socket instead of a cable per device. Who may do what is still up to you."] };

  const dots50=(red)=>Array.from({length:50},(_,i)=>dot(14+(i%10)*10,16+Math.floor(i/10)*10,3.4,red.includes(i)?C.red:C.grn)).join("");
  Z[G4+"Оценка: «вроде норм» — не метрика"]={
    p:[ bg(0)+ok(24,26,1.1)+ok(46,22,1.1)+ok(68,26,1.1)+bot(46,84,.62,{arms:"up"})+kid(98,82,.8,C.blue),
        bg(1)+dots50([3,7,11,14,18,22,25,29,31,36,38,41,44,47,48])+bot(102,84,.42,{mood:"sad"}),
        bg(2)+dots50([])+txt(100,72,"50/50",8,C.grn)+gear(18,72,.5)+ar(26,72,48,72,C.ink,1.4),
        bg(3)+bot(28,82,.75,{glasses:true,mood:"think"})+card(76,26,34,18,"#fff",txt(0,4,"8/10",9,C.blue))+card(76,56,34,18,"#fff",txt(0,4,"42 = 42",8,C.grn)) ],
    l:[["на трёх примерах — ура","three examples — hooray"],["на пятидесяти — хуже","fifty — actually worse"],["набор на каждое изменение","full set on every change"],["судья-модель и сверка","judge model + exact match"]],
    c:["Три удачных примера — впечатление. Набор из пятидесяти на каждое изменение — уже факт.","Three good examples are a feeling. A fifty-case set run on every change is a fact."] };

  /* ===== в проде на Java ===== */
  Z[G5+"Вызов модели из Java"]={
    p:[ bg(0)+laptop(24,64,.9,txt(0,-9,"Java",6))+ar(42,40,72,30)+txt(56,26,"POST",7,C.blue)+cloud(94,30,1)+key(52,52,.6)+ar(78,54,46,54,C.grn)+txt(64,66,"{ }",9,C.grn),
        bg(1)+laptop(18,64,.8)+arrowR(34,46,44)+R(46,30,30,32,C.bot2,{st:C.ink,rx:5})+gear(61,46,.7,C.yel)+cloud(102,20,.55,"#ffe9a8")+cloud(102,46,.55,"#cfe5fb")+cloud(102,70,.55,"#f6cad8")+`<path d="M76 46 H84 M84 22 V70 M84 22 H92 M84 46 H92 M84 70 H92" stroke="${C.ink}" stroke-width="1.4" fill="none"/>`,
        bg(2)+card(28,40,32,32,"#fff",txt(0,5,"{ }",14,C.grn))+arrowR(48,40,62)+card(88,40,42,32,"#fff",txt(0,-3,"record",8,C.bot2)+`<path d="M-14 5 h28 M-14 11 h20" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`),
        bg(3)+paper(30,40,["A","B"])+`<path d="M22 31 h16" stroke="${C.red}" stroke-width="2"/>`+ok(46,49,.6)+arrowR(52,40,66)+cloud(80,28,.6,"#ffe9a8")+cloud(96,56,.6,"#cfe5fb")+no(80,28,.5)+ok(96,56,.6) ],
    l:[["это просто HTTP","it's just HTTP"],["одна обёртка на всех","one wrapper for all"],["JSON → record","JSON → record"],["сменить — в конфиге","switch it in config"]],
    c:["Для Java я — просто HTTP-API. Обёртка вроде LangChain4j прячет поставщика: сменить — в конфиге.","To Java I'm just an HTTP API. A wrapper like LangChain4j hides the vendor: switch it in config."] };

  Z[G5+"Стриминг ответа до пользователя"]={
    p:[ bg(0)+kid(30,82,.9,C.red,"sad")+clock(78,34,1.6,10)+txt(78,66,"10 s",10,C.red),
        bg(1)+cloud(18,28,.7)+server(56,48,.8)+laptop(98,70,.9)+[[30,40],[38,46],[70,50],[80,54]].map(p=>R(p[0],p[1]-3,6,6,C.grn,{rx:1})).join("")+`<path d="M24 36 L46 46 M68 50 L86 56" stroke="${C.ink}" stroke-width="1.2" stroke-dasharray="3 2.5"/>`,
        bg(2)+R(8,30,104,16,"#fff",{st:C.ink,rx:8})+[22,40,58,76].map(x=>R(x,34,10,8,C.grn,{rx:2})).join("")+arrowR(92,38,108)+txt(30,64,"SSE",9,C.blue)+txt(64,64,"Flux",9,C.bot2)+txt(96,64,"Multi",9,C.bot2),
        bg(3)+server(22,46,.8)+sw(50,44,false,1)+clock(76,24,.8,6)+kid(104,82,.8,C.red)+ar(92,58,116,58,C.grey,1.4)+no(76,52,.8) ],
    l:[["ждать всё — уйдут","wait for all — users leave"],["куски потоком","chunks as a stream"],["один долгий ответ","one long HTTP response"],["ушёл — закрой поток","user gone — close it"]],
    c:["Первые слова готовы через полсекунды — шлю их сразу. Только не забудь таймаут и закрытие.","First words are ready in half a second, so I send them at once. Don't forget timeout and close."] };

  Z[G5+"Токены — это деньги и время"]={
    p:[ bg(0)+wc(16,40,16)+wc(16,56,16)+arrowR(28,48,40)+chip(62,46)+arrowR(84,48,96)+wc(108,48,14,C.grn)+coin(16,20,.8)+coin(108,26,.8),
        bg(1)+[1,2,3].map(n=>Array.from({length:n+1},(_,j)=>R(10+(n-1)*38,64-j*8,24,7,j===n?"#ffe9a8":"#cfe5fb",{st:C.ink,sw:.9})).join("")+Array.from({length:n},(_,j)=>coin(22+(n-1)*38+(j-(n-1)/2)*9,22,.65)).join("")+txt(22+(n-1)*38,14,"×"+n,8,C.red)).join(""),
        bg(2)+[0,1,2,3].map(j=>R(10,64-j*8,24,7,"#cfe5fb",{st:C.ink,sw:.9,op:j>1?.3:1})).join("")+scis(24,36,1)+lock(62,52,1)+txt(98,40,"≤ 500",10,C.red)+clock(98,62,.8,0) ],
    l:[["вход и выход — платно","input and output cost"],["история — на каждом шаге","history paid every time"],["обрезать, кэш, лимит","trim, cache, limit"]],
    c:["Каждое слово туда и обратно стоит денег, а старую историю оплачиваешь снова и снова.","Every word in and out costs money, and you pay for old history again and again."] };

  Z[G5+"Что нельзя отправлять в модель и prompt injection"]={
    p:[ bg(0)+card(28,40,40,28,"#fff",head(-10,-2,.9)+txt(8,-1,"****",8)+`<path d="M-2 7 h16" stroke="${C.grey}" stroke-width="2" stroke-linecap="round"/>`)+arrowR(52,40,72)+cloud(96,40,.9)+ok(28,64,.7),
        bg(1)+doc(26,40,30,40,6)+card(32,52,16,12,"#ffd9d9",txt(0,4,"!",9,C.red),-8)+arrowR(46,40,58)+bot(80,82,.75,{mood:"wow"})+coin(106,30,.8)+ar(96,40,104,34,C.red,1.4),
        bg(2)+safe(24,72,1)+bot(56,82,.5,{mood:"sad"})+no(56,24,.6)+kid(94,82,.8,C.grn)+key(94,28,.8)+ok(110,46,.6) ],
    l:[["маскируй до отправки","mask before sending"],["в данных — чужая команда","a command hidden in data"],["ключ от сейфа — не модели","no safe key for the model"]],
    c:["Я не отличаю данные от команд. Спасает не просьба, а то, что ключа от сейфа у меня нет.","I can't tell data from commands. Asking nicely won't help — not giving me the safe key will."] };

  Z[G5+"Модель — ненадёжная внешняя зависимость"]={
    p:[ bg(0)+cloud(30,28,.9)+txt(30,31,"429",8,C.red)+clock(84,26,.9,5)+server(60,58,.6,false),
        bg(1)+clock(20,36,.9,2)+loopArr(60,36,12,C.bot2)+txt(60,64,"×3",10,C.bot2)+sw(100,36,false,1.1)+txt(100,64,"!",11,C.red),
        bg(2)+cloud(24,22,.6)+no(36,28,.55)+mag(30,50,1)+txt(60,54,"+",14,C.ink)+box(84,70,16,14,null)+box(102,70,16,14,null)+box(93,56,16,14,null),
        bg(3)+card(22,40,28,24,"#fff",txt(0,5,"{ }",11,C.ink))+arrowR(38,40,50)+funnel(64,38,1)+ar(78,30,94,22,C.grn)+ar(78,50,94,58,C.red)+ok(104,20,.7)+no(104,60,.7) ],
    l:[["медленно, 429, падает","slow, 429, or down"],["таймаут, повтор, стоп","timeout, retry, breaker"],["план Б без модели","plan B without the model"],["ответ проверяет код","code checks the answer"]],
    c:["Я внешний сервис и могу молчать. Ставь таймаут и предохранитель, а ответ мой проверяй кодом.","I'm an outside service and may go silent. Use a timeout and a breaker; check my answer in code."] };

  Z[G5+"Где модель не нужна"]={
    p:[ bg(0)+card(42,34,58,20,"#fff",txt(0,4,"\\d{12}",10,C.bot2))+ok(86,34,.9)+bot(60,84,.5,{mood:"smile"}),
        bg(1)+card(60,36,92,22,"#fff",txt(0,4,"1000 × 0.1% = 1",9))+coin(40,62,.9)+coin(60,62,.9)+coin(80,62,.9),
        bg(2)+db(30,46,1)+funnel(74,30,.9,C.yel)+txt(74,62,"SQL",10,C.blue)+ar(46,42,58,36),
        bg(3)+env(22,40,1.1)+`<path d="M12 56 q4 -3 8 0 t8 0 t6 0" stroke="${C.grey}" stroke-width="1.6" fill="none"/>`+arrowR(40,40,52)+bot(72,82,.62,{glasses:true})+card(104,40,22,30,"#fff",[0,1,2].map(i=>`<path d="M-7 ${-8+i*8} l2 2 l3 -4" stroke="${C.grn}" stroke-width="1.6" fill="none"/><path d="M0 ${-8+i*8} h6" stroke="${C.ink}" stroke-width="1.6"/>`).join("")) ],
    l:[["формат — регулярка","format — a regex"],["комиссия — формула","fee — a formula"],["фильтр — SQL","filter — SQL"],["свободный текст — модель","free text — the model"]],
    c:["Цифры на ценнике прочитаешь и сам. Зови меня, когда на входе живой текст, а не правило.","You can read a price tag yourself. Call me when the input is messy text, not a rule."] };

  Object.assign(window.ZKSVG, Z);
})();

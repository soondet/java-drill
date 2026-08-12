/* Мини-схемы к шагам «С нуля». Ключ = точный t шага. window.ZVIZ. */
window.ZVIZ = {
"Один переключатель — это бит, восемь — байт":
 `<div class="fp-row">${[0,1,0,1,1,0,1,0].map((b,i)=>`<div class="fp-cell ${b?'good fp-pulse-g':'mut'}" style="animation-delay:${i*.12}s">${b}</div>`).join("")}</div>
  <div class="fp-row"><span class="fp-tag">8 бит = 1 байт</span><span class="fp-tag">256 значений</span></div>`,
"Процессор умеет до смешного мало":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box acc fp-blink">взять</div><div class="fp-arrow">→</div>
  <div class="fp-box acc fp-blink" style="animation-delay:.3s">сложить</div><div class="fp-arrow">→</div>
  <div class="fp-box acc fp-blink" style="animation-delay:.6s">сравнить</div><div class="fp-arrow">→</div>
  <div class="fp-box acc fp-blink" style="animation-delay:.9s">прыгнуть</div></div>
  <div class="fp-row"><span class="fp-tag">и так миллиарды раз в секунду</span></div></div>`,
"Регистры — карманы, память — склад":
 `<div class="fp-col">
  <div class="fp-row"><div class="fp-box good" style="min-width:70px">регистр</div><div class="fp-val">1 такт</div></div>
  <div class="fp-row"><div class="fp-box acc" style="min-width:90px">кэш</div><div class="fp-val">~10 тактов</div></div>
  <div class="fp-row"><div class="fp-box mut" style="min-width:120px">оперативка</div><div class="fp-val">~200 тактов</div></div>
  <div class="fp-row"><div class="fp-box bad" style="min-width:170px">диск</div><div class="fp-val">миллионы</div></div></div>`,
"Java переводит дважды":
 `<div class="fp-row"><div class="fp-box mut">Main.java</div><div class="fp-arrow fp-blink">javac</div>
  <div class="fp-box acc fp-pulse-a">байткод</div><div class="fp-arrow fp-blink" style="animation-delay:.5s">JVM</div>
  <div class="fp-box good fp-pulse-g">машинный код</div></div>`,
"JIT: сначала медленно, потом быстро":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">вызовов</span>
  <div class="fp-bar" style="width:30px"></div><div class="fp-box mut">интерпретация</div></div>
  <div class="fp-row"><span class="fp-tag">1000+</span>
  <div class="fp-bar good" style="width:120px"></div><div class="fp-box good fp-pulse-g">скомпилирован</div></div></div>`,
"Стек: место для «прямо сейчас»":
 `<div class="fp-stack"><div class="fp-slot acc fp-pulse-a">main()</div>
  <div class="fp-slot acc" style="animation-delay:.2s">service()</div>
  <div class="fp-slot acc" style="animation-delay:.4s">repo()</div></div>
  <div class="fp-row"><span class="fp-tag">кладём и берём только сверху</span></div>`,
"Ссылка — это просто адрес":
 `<div class="fp-row"><div class="fp-col"><div class="fp-box mut">a</div><div class="fp-box mut">b</div></div>
  <div class="fp-conn"></div><div class="fp-box big acc fp-pulse-a">объект<br><span class="fp-tag">в куче</span></div></div>
  <div class="fp-row"><span class="fp-tag">две ссылки — один объект</span></div>`,
"null — это адрес, которого нет":
 `<div class="fp-row"><div class="fp-box mut">ref</div><div class="fp-arrow bad fp-blink">→</div>
  <div class="fp-box bad fp-pulse-r">∅ ничего</div></div>
  <div class="fp-row"><span class="fp-tag bad">NullPointerException</span></div>`,
"Гипотеза поколений — почему GC вообще быстрый":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">Eden</span>
  ${[1,1,1,1,1,1].map((_,i)=>`<div class="fp-token ${i<5?'bad':'good'} fp-float" style="animation-delay:${i*.15}s"></div>`).join("")}</div>
  <div class="fp-row"><span class="fp-tag">Old</span><div class="fp-token good"></div></div>
  <div class="fp-row"><span class="fp-tag">почти все умирают молодыми</span></div></div>`,
"Гонка: почему count++ теряет значения":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box acc">T1: read 5</div><div class="fp-box acc">+1</div><div class="fp-box acc">write 6</div></div>
  <div class="fp-row"><div class="fp-box acc">T2: read 5</div><div class="fp-box acc">+1</div><div class="fp-box bad fp-pulse-r">write 6</div></div>
  <div class="fp-row"><span class="fp-tag bad">ожидали 7, получили 6</span></div></div>`,
"Дедлок: оба ждут вечно":
 `<div class="fp-row"><div class="fp-col"><div class="fp-box acc">T1</div><span class="fp-tag">держит A</span></div>
  <div class="fp-col"><div class="fp-arrow bad fp-blink">→ ждёт B</div><div class="fp-arrow bad fp-blink" style="animation-delay:.5s">← ждёт A</div></div>
  <div class="fp-col"><div class="fp-box acc">T2</div><span class="fp-tag">держит B</span></div></div>
  <div class="fp-row"><span class="fp-tag bad">круг ожидания</span></div>`,
"Пул потоков вместо создания на каждый чих":
 `<div class="fp-row"><div class="fp-lane">${[1,2,3,4,5].map((_,i)=>`<div class="fp-token acc fp-travel" style="animation-delay:${i*.4}s"></div>`).join("")}</div>
  <div class="fp-col"><div class="fp-box good">worker 1</div><div class="fp-box good">worker 2</div><div class="fp-box good">worker 3</div></div></div>
  <div class="fp-row"><span class="fp-tag">очередь задач · фиксированные рабочие</span></div>`,
"Как устроены":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">виртуальные</span>
  ${[1,2,3,4,5,6,7,8].map((_,i)=>`<div class="fp-token acc fp-float" style="animation-delay:${i*.1}s"></div>`).join("")}</div>
  <div class="fp-row"><span class="fp-tag">несущие</span><div class="fp-box good">OS 1</div><div class="fp-box good">OS 2</div></div>
  <div class="fp-row"><span class="fp-tag">ждёшь — снимаешься с несущего</span></div></div>`,
"Индекс: почему без него миллион строк":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">скан</span>
  ${Array(9).fill(0).map((_,i)=>`<div class="fp-cell ${i===8?'good fp-pulse-g':'bad'}" style="animation-delay:${i*.08}s"></div>`).join("")}</div>
  <div class="fp-row"><span class="fp-tag">индекс</span><div class="fp-box acc fp-blink">корень</div><div class="fp-arrow">→</div>
  <div class="fp-box acc fp-blink" style="animation-delay:.3s">ветка</div><div class="fp-arrow">→</div>
  <div class="fp-box good fp-pulse-g">строка</div></div></div>`,
"Транзакция: всё или ничего":
 `<div class="fp-row"><div class="fp-box acc">списать</div><div class="fp-conn"></div><div class="fp-box acc">зачислить</div></div>
  <div class="fp-row"><span class="fp-tag good">обе</span><span class="fp-tag bad">или ни одной</span></div>`,
"Репликация: читать с копий":
 `<div class="fp-row"><div class="fp-box big acc fp-pulse-a">мастер<br><span class="fp-tag">запись</span></div>
  <div class="fp-conn"></div><div class="fp-col"><div class="fp-box good">реплика 1</div><div class="fp-box mut fp-blink">реплика 2<br><span class="fp-tag">лаг</span></div></div></div>`,
"Кэш — это согласие на устаревшее":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box acc">запрос</div><div class="fp-arrow">→</div>
  <div class="fp-box good fp-pulse-g">кэш<br><span class="fp-tag">hit</span></div></div>
  <div class="fp-row"><div class="fp-box acc">запрос</div><div class="fp-arrow">→</div><div class="fp-box mut">кэш<br><span class="fp-tag">miss</span></div>
  <div class="fp-arrow">→</div><div class="fp-box bad">база</div></div></div>`,
"Это не очередь, это лог":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">партиция</span>
  ${Array(6).fill(0).map((_,i)=>`<div class="fp-cell acc" style="animation-delay:${i*.1}s">${i}</div>`).join("")}</div>
  <div class="fp-row"><span class="fp-tag">A читает</span><div class="fp-box good fp-blink">offset 4</div>
  <span class="fp-tag">B читает</span><div class="fp-box good fp-blink" style="animation-delay:.5s">offset 1</div></div>
  <div class="fp-row"><span class="fp-tag">сообщения остаются на месте</span></div></div>`,
"Двойная запись всегда ломается":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box good">база ✓</div><div class="fp-arrow bad fp-blink">💥</div><div class="fp-box mut">Kafka ✗</div></div>
  <div class="fp-row"><span class="fp-tag bad">заказ есть, события нет</span></div></div>`,
"Outbox: событие как строка в той же транзакции":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box acc">orders</div><div class="fp-box acc">outbox</div>
  <span class="fp-tag good">одна транзакция</span></div>
  <div class="fp-row"><div class="fp-box mut">публикатор</div><div class="fp-arrow fp-blink">→</div><div class="fp-box good fp-pulse-g">Kafka</div></div></div>`,
"Вызов без таймаута — бомба":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box acc">твой сервис</div><div class="fp-arrow bad fp-blink">→ ждёт…</div>
  <div class="fp-box mut">сосед завис</div></div>
  <div class="fp-row">${Array(5).fill(0).map((_,i)=>`<div class="fp-token bad fp-pulse-r" style="animation-delay:${i*.2}s"></div>`).join("")}
  <span class="fp-tag bad">пул потоков кончился</span></div></div>`,
"Circuit breaker: перестань стучаться":
 `<div class="fp-row"><div class="fp-box good fp-pulse-g">CLOSED<br><span class="fp-tag">пропускает</span></div>
  <div class="fp-arrow">→</div><div class="fp-box bad fp-pulse-r">OPEN<br><span class="fp-tag">отбивает</span></div>
  <div class="fp-arrow">→</div><div class="fp-box acc fp-blink">HALF<br><span class="fp-tag">проба</span></div></div>`,
"Экспоненциальная задержка и разброс":
 `<div class="fp-row"><div class="fp-bar acc" style="width:14px"></div><div class="fp-bar acc" style="width:28px"></div>
  <div class="fp-bar acc" style="width:56px"></div><div class="fp-bar acc" style="width:110px"></div></div>
  <div class="fp-row"><span class="fp-tag">100 · 200 · 400 · 800 мс + разброс</span></div>`,
"Контейнер — это не виртуалка":
 `<div class="fp-row"><div class="fp-col"><div class="fp-box mut">ВМ</div><div class="fp-box mut">своя ОС</div><div class="fp-box mut">ядро</div>
  <span class="fp-tag bad">секунды</span></div>
  <div class="fp-col"><div class="fp-box acc fp-pulse-a">контейнер</div><div class="fp-box good">общее ядро</div>
  <span class="fp-tag good">миллисекунды</span></div></div>`,
"Декларативность: описываешь цель, а не шаги":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">хочу</span><div class="fp-box acc">3 реплики</div></div>
  <div class="fp-row"><span class="fp-tag">есть</span><div class="fp-token good"></div><div class="fp-token good"></div>
  <div class="fp-token bad fp-pulse-r">💥</div></div>
  <div class="fp-row"><span class="fp-tag good">контроллер поднимет третью сам</span></div></div>`,
"Средняя задержка врёт":
 `<div class="fp-col"><div class="fp-row">${[8,9,8,9,8,9,8,9,120].map((v,i)=>`<div class="fp-bar ${v>50?'bad fp-pulse-r':'good'}" style="width:${Math.min(v,60)}px"></div>`).join("")}</div>
  <div class="fp-row"><span class="fp-tag">среднее 20 мс</span><span class="fp-tag bad">p99 = 120 мс</span></div></div>`,
"Флеймграф читается за минуту":
 `<div class="fp-col"><div class="fp-row"><div class="fp-bar acc" style="width:190px">main</div></div>
  <div class="fp-row"><div class="fp-bar acc" style="width:60px">parse</div><div class="fp-bar bad fp-pulse-r" style="width:120px">query</div></div>
  <div class="fp-row"><span class="fp-tag bad">широкое плато — вот где время</span></div></div>`,
"Считают не секунды, а рост":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">O(1)</span><div class="fp-bar good" style="width:14px"></div></div>
  <div class="fp-row"><span class="fp-tag">O(log n)</span><div class="fp-bar good" style="width:38px"></div></div>
  <div class="fp-row"><span class="fp-tag">O(n)</span><div class="fp-bar acc" style="width:90px"></div></div>
  <div class="fp-row"><span class="fp-tag">O(n²)</span><div class="fp-bar bad fp-pulse-r" style="width:180px"></div></div></div>`,
"Пирамида: много быстрых, мало медленных":
 `<div class="fp-col" style="align-items:center">
  <div class="fp-bar bad" style="width:50px">e2e</div>
  <div class="fp-bar acc" style="width:110px">интеграционные</div>
  <div class="fp-bar good" style="width:190px">юнит</div></div>`,
"merge и rebase — два способа совместить":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">merge</span><div class="fp-node acc"></div><div class="fp-node acc"></div>
  <div class="fp-node good fp-pulse-g">M</div></div>
  <div class="fp-row"><span class="fp-tag">rebase</span><div class="fp-node acc"></div><div class="fp-node acc"></div>
  <div class="fp-node acc"></div><span class="fp-tag">линейно, новые хэши</span></div></div>`,
"Инверсия управления: не ты создаёшь, а тебе дают":
 `<div class="fp-row"><div class="fp-box big acc fp-pulse-a">контейнер</div><div class="fp-conn"></div>
  <div class="fp-col"><div class="fp-box good">OrderService</div><div class="fp-box good">OrderRepo</div></div></div>
  <div class="fp-row"><span class="fp-tag">граф зависимостей собран за тебя</span></div>`,
"Прокси: почему @Transactional вообще работает":
 `<div class="fp-row"><div class="fp-box mut">вызов</div><div class="fp-arrow">→</div>
  <div class="fp-box acc fp-pulse-a">прокси<br><span class="fp-tag">begin/commit</span></div><div class="fp-arrow">→</div>
  <div class="fp-box good">твой бин</div></div>`,
"Главная ловушка прокси":
 `<div class="fp-row"><div class="fp-box mut">this.method()</div><div class="fp-arrow bad fp-blink">↷ мимо</div>
  <div class="fp-box mut" style="opacity:.35">прокси</div><div class="fp-box good">бин</div></div>
  <div class="fp-row"><span class="fp-tag bad">транзакции нет, ошибки тоже нет</span></div>`,
"N+1 — главный убийца производительности":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box acc">1 запрос: заказы</div></div>
  <div class="fp-row">${Array(7).fill(0).map((_,i)=>`<div class="fp-token bad fp-pulse-r" style="animation-delay:${i*.12}s"></div>`).join("")}
  <span class="fp-tag bad">+N запросов за клиентами</span></div></div>`,
"Ограничение частоты запросов":
 `<div class="fp-col"><div class="fp-row"><span class="fp-tag">ведро</span>
  ${[1,1,1,0,0].map((f,i)=>`<div class="fp-token ${f?'good':'mut'}" style="animation-delay:${i*.1}s"></div>`).join("")}</div>
  <div class="fp-row"><div class="fp-box good">прошёл</div><div class="fp-box good">прошёл</div><div class="fp-box bad fp-pulse-r">429</div></div></div>`,
"Идемпотентность методов":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box acc">POST</div><div class="fp-arrow">→</div><div class="fp-box bad">2 списания</div></div>
  <div class="fp-row"><div class="fp-box acc">POST + ключ</div><div class="fp-arrow">→</div><div class="fp-box good fp-pulse-g">1 списание</div></div></div>`,
"Managed или своё — главный вопрос":
 `<div class="fp-row"><div class="fp-col"><div class="fp-box mut">своё</div><span class="fp-tag">дешевле по счёту</span>
  <span class="fp-tag bad">бэкапы, патчи, дежурство</span></div>
  <div class="fp-col"><div class="fp-box acc">managed</div><span class="fp-tag bad">дороже</span>
  <span class="fp-tag good">рутина на провайдере</span></div></div>`,
"Автомасштабирование не лечит узкое место":
 `<div class="fp-row">${Array(6).fill(0).map((_,i)=>`<div class="fp-box good" style="min-width:26px">i</div>`).join("")}
  <div class="fp-arrow bad fp-blink">→</div><div class="fp-box bad fp-pulse-r">одна база</div></div>
  <div class="fp-row"><span class="fp-tag bad">очередь переехала, а не исчезла</span></div>`,
"Что происходит, когда ты открываешь сайт":
 `<div class="fp-col"><div class="fp-row"><div class="fp-box mut fp-blink">DNS</div><div class="fp-arrow">→</div>
  <div class="fp-box mut fp-blink" style="animation-delay:.3s">TCP</div><div class="fp-arrow">→</div>
  <div class="fp-box mut fp-blink" style="animation-delay:.6s">TLS</div><div class="fp-arrow">→</div>
  <div class="fp-box good fp-pulse-g" style="animation-delay:.9s">данные</div></div>
  <div class="fp-row"><span class="fp-tag">полезное — в самом конце</span></div></div>`
};

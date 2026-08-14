#!/bin/bash
# Двойной клик → собирает java-drill.html и присылает его тебе в телегу.
# Токен бота и chat_id лежат в ~/.jd-telegram — вне репозитория, в гит не попадут.

cd "$(dirname "$0")" || exit 1
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
CFG="$HOME/.jd-telegram"

say(){ printf "%s\n" "$1"; }
die(){ say ""; say "❌ $1"; say ""; read -n 1 -s -r -p "Enter — закрыть"; exit 1; }

command -v node >/dev/null || die "node не найден. Поставь его или поправь PATH в этом файле."

# ---- первый запуск: заводим бота ----
if [ ! -f "$CFG" ]; then
  say "🤖 Первый запуск — настроим бота (один раз, потом не спросит)"
  say ""
  say "  1. Открой в телеге @BotFather"
  say "  2. Отправь /newbot, придумай имя"
  say "  3. Он пришлёт токен вида 1234567890:AAH...  — скопируй его"
  say ""
  read -r -p "Вставь токен: " TOKEN
  [ -n "$TOKEN" ] || die "Пустой токен"

  OK=$(curl -s --max-time 20 "https://api.telegram.org/bot$TOKEN/getMe" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("ok",False))' 2>/dev/null)
  [ "$OK" = "True" ] || die "Телега не приняла токен. Проверь, что скопировал целиком."

  say ""
  say "✅ Бот на связи. Теперь напиши ему в телеге любое сообщение (например «привет»)"
  say "   — иначе он не имеет права тебе писать первым."
  say ""
  read -n 1 -s -r -p "Написал? Нажми любую клавишу"
  say ""

  CHAT=""
  for i in 1 2 3 4 5; do
    CHAT=$(curl -s --max-time 20 "https://api.telegram.org/bot$TOKEN/getUpdates" \
      | python3 -c 'import sys,json
d=json.load(sys.stdin).get("result",[])
ids=[u["message"]["chat"]["id"] for u in d if "message" in u]
print(ids[-1] if ids else "")' 2>/dev/null)
    [ -n "$CHAT" ] && break
    say "   ждём сообщение… ($i/5)"
    sleep 3
  done
  [ -n "$CHAT" ] || die "Не вижу твоего сообщения боту. Напиши ему что-нибудь и запусти файл заново."

  printf 'TOKEN=%s\nCHAT=%s\n' "$TOKEN" "$CHAT" > "$CFG"
  chmod 600 "$CFG"
  say "✅ Записал в ~/.jd-telegram — больше не спросит"
  say ""
fi

# shellcheck source=/dev/null
. "$CFG"
[ -n "$TOKEN" ] && [ -n "$CHAT" ] || die "Файл ~/.jd-telegram битый. Удали его и запусти заново."

# ---- собираем ----
say "🔨 Собираю…"
node build.js || die "Сборка упала"
[ -f java-drill.html ] || die "java-drill.html не появился"

KB=$(( $(stat -f%z java-drill.html) / 1024 ))
CAP="java-drill.html · ${KB} КБ · $(date '+%d.%m %H:%M')"

# ---- отправляем ----
say "📤 Отправляю в телегу…"
RESP=$(curl -s --max-time 300 \
  -F "chat_id=$CHAT" \
  -F "caption=$CAP" \
  -F "document=@java-drill.html" \
  "https://api.telegram.org/bot$TOKEN/sendDocument")

if printf "%s" "$RESP" | grep -q '"ok":true'; then
  say ""
  say "✅ Улетело: $CAP"
  say ""
  say "На телефоне: открой файл из чата → «Открыть в…» → браузер."
else
  ERR=$(printf "%s" "$RESP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("description","непонятный ответ"))' 2>/dev/null)
  die "Телега отказала: $ERR"
fi

say ""
read -n 1 -s -r -p "Enter — закрыть"

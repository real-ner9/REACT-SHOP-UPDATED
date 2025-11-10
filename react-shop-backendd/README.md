# React Shop Backend — MVP

Минимальный NestJS‑проект, который делает только одно: читает переменные окружения и устанавливает подключение к PostgreSQL через TypeORM. Никаких контроллеров, Swagger, миграций или бизнес‑логики.

## Что нужно

- Node.js 20+
- npm 10+
- PostgreSQL 15+ (можно в Docker)

## Как запустить

1. **Поднять Postgres.** Самый быстрый вариант — Docker:
   ```bash
   docker run --name shop-postgres \
     -e POSTGRES_USER=shop \
     -e POSTGRES_PASSWORD=pass \
     -e POSTGRES_DB=shop \
     -p 5432:5432 -d postgres:16
   ```
2. **Установить зависимости:**
   ```bash
   cd react-shop-backendd
   npm install
   ```
3. **Настроить окружение:**
   ```bash
   cp .env.example .env
   # при необходимости поменяй значения DATABASE_*
   ```
4. **Запустить сервер (создаст таблицы, если включен `TYPEORM_SYNCHRONIZE`):**
   ```bash
   npm run start:dev
   ```

Сервер слушает `http://localhost:3000` и держит соединение с базой. На этом этапе можно использовать любую утилиту (`psql`, TablePlus и т.д.), чтобы работать напрямую с базой.

## Скрипты npm

- `npm run start` — обычный запуск
- `npm run start:dev` — запуск с live reload
- `npm run start:prod` — запуск собранного кода
- `npm run build` — сборка в `dist`

## Переменные окружения

См. `.env.example`. Основные параметры:

| Переменная | Назначение |
| ---------- | ---------- |
| `PORT` | порт HTTP‑сервера |
| `DATABASE_HOST/PORT/NAME/USER/PASSWORD/SCHEMA` | подключение к Postgres |
| `DATABASE_SSL`, `DATABASE_SSL_REJECT_UNAUTHORIZED` | SSL‑режим (оставь `false` локально) |
| `TYPEORM_SYNCHRONIZE` | временно держи `true`, чтобы TypeORM сам создавал таблицы |
| `TYPEORM_LOGGING` | включает SQL‑логи в консоль |

Когда появятся настоящие сущности/миграции — выключай `TYPEORM_SYNCHRONIZE` и добавляй нужные инструменты. Пока это чистое MVP.***

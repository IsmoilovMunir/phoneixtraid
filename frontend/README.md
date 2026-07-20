# Феникс Трейдинг — Корпоративный сайт

Корпоративный сайт компании «Феникс Трейдинг» — центр международной торговли стран БРИКС+.

## Стек

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** — вёрстка и адаптив
- **Zod + Server Actions** — валидация и обработка форм
- **Nodemailer** — отправка email
- **SSG / ISR** — статическая генерация + инкрементальная ревалидация

## Быстрый старт

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Сайт будет доступен на [http://localhost:3000](http://localhost:3000).

## Страницы

| Маршрут | Тип рендеринга |
|---------|----------------|
| `/` | SSG |
| `/o-kompanii` | SSG |
| `/napravleniya` | SSG |
| `/strany-briks` | ISR (1 час) |
| `/produktsiya` | ISR (1 час) |
| `/produktsiya/[slug]` | ISR (1 час) |
| `/partneram` | SSG |
| `/novosti` | ISR (1 час) |
| `/novosti/[slug]` | ISR (1 час) |
| `/kontakty` | SSG |

## ISR — ревалидация по вебхуку

```bash
curl -X POST https://phoenix-trading.ru/api/revalidate \
  -H "x-revalidate-secret: YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/novosti"}'
```

## Деплой на VPS (Node.js + PM2 + nginx)

### 1. Сборка

```bash
npm run build
```

### 2. PM2

```bash
npm install -g pm2
pm2 start npm --name "phoenix-trading" -- start
pm2 save
pm2 startup
```

### 3. nginx

```nginx
server {
    listen 80;
    server_name phoenix-trading.ru www.phoenix-trading.ru;
    return 301 https://phoenix-trading.ru$request_uri;
}

server {
    listen 443 ssl http2;
    server_name phoenix-trading.ru;

    ssl_certificate     /etc/letsencrypt/live/phoenix-trading.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/phoenix-trading.ru/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. SSL (Let's Encrypt)

```bash
sudo certbot --nginx -d phoenix-trading.ru -d www.phoenix-trading.ru
```

## SEO — подключение поисковых систем

### Яндекс.Вебмастер

1. Перейдите на [webmaster.yandex.ru](https://webmaster.yandex.ru)
2. Добавьте сайт `https://phoenix-trading.ru`
3. Подтвердите права одним из способов:
   - HTML-файл в `/public/`
   - Meta-тег в `layout.tsx`
   - DNS-запись
4. Отправьте sitemap: `https://phoenix-trading.ru/sitemap.xml`
5. Настройте регион: **Москва**
6. Включите индексирование

### Google Search Console

1. Перейдите на [search.google.com/search-console](https://search.google.com/search-console)
2. Добавьте ресурс `https://phoenix-trading.ru`
3. Подтвердите права (HTML-тег или DNS)
4. Отправьте sitemap: `https://phoenix-trading.ru/sitemap.xml`
5. Запросите индексирование ключевых страниц

### Яндекс.Метрика

1. Создайте счётчик на [metrika.yandex.ru](https://metrika.yandex.ru)
2. Скопируйте ID в `.env.local`:
   ```
   NEXT_PUBLIC_YM_ID=12345678
   ```
3. Пересоберите и задеплойте сайт

### Google Analytics 4

1. Создайте ресурс GA4 на [analytics.google.com](https://analytics.google.com)
2. Скопируйте Measurement ID:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Пересоберите и задеплойте

> Аналитика загружается только после согласия пользователя через cookie-баннер (152-ФЗ).

### Яндекс.Бизнес / Google Business Profile

Заполните карточку организации:
- **Название:** Феникс Трейдинг
- **Адрес:** 105005, г. Москва, Товарищеский пер., 8 стр. 1
- **Телефон:** +7 (495) 123-45-67
- **Сайт:** https://phoenix-trading.ru
- **Категория:** Торговая компания / Оптовая торговля

## Формы и email

Настройте SMTP в `.env.local`:

```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=noreply@phoenix-trading.ru
SMTP_PASS=app-password
SMTP_FROM="Феникс Трейдинг <noreply@phoenix-trading.ru>"
```

Без SMTP формы работают в режиме симуляции (лог в консоль).

## Структура проекта

```
src/
├── app/                  # App Router pages
├── components/
│   ├── analytics/        # Метрика, GA4, cookie-баннер
│   ├── forms/            # Формы с Server Actions
│   ├── home/             # Секции главной страницы
│   ├── layout/           # Header, Footer, Container
│   ├── seo/              # JSON-LD
│   └── ui/               # UI-компоненты
├── data/                 # Контент (products, news, countries)
├── lib/                  # Config, SEO, actions, email
└── types/                # TypeScript types
```

## Проверка Core Web Vitals

После деплоя проверьте в [PageSpeed Insights](https://pagespeed.web.dev/):
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

# Flora Dictionary

Full-stack dictionary application built for the Flora Energia technical assessment.

## Stack

**Backend**
- Node.js 20 + Express 4 + TypeScript 5
- Prisma ORM + PostgreSQL 16
- Redis 7 (cache com headers `x-cache` / `x-response-time`)
- JWT em HttpOnly cookies (SameSite=Strict)
- Helmet + CORS + Rate Limiting

**Frontend**
- Next.js 15 (App Router + Turbopack)
- React 18 + TypeScript 5
- TailwindCSS 3
- Redux Toolkit (auth state)
- TanStack Query v5 (server state)
- Context API (tema dark/light)
- React Hook Form + Zod
- Atomic Design (atoms → molecules → organisms → templates → pages)

**Infra**
- Docker + Docker Compose
- Free Dictionary API (proxy com cache Redis)

## Pré-requisitos

- Node.js ≥ 20
- Docker & Docker Compose (opção 1)
- PostgreSQL 16 + Redis 7 locais (opção 2)

## Como rodar

### Opção 1 — Docker (recomendado)

> Requer Docker Desktop rodando.

```bash
git clone https://github.com/camilasrody/word-explorer-flora.git
cd word-explorer-flora

cp backend/.env.example backend/.env
```

Edite `backend/.env` e preencha `JWT_SECRET` com qualquer string de 32+ caracteres. Depois:

```bash
docker compose up -d --build

docker compose exec backend npx prisma migrate deploy
docker compose exec backend npm run db:seed
```

Acesse: http://localhost:3000

Para parar:

```bash
docker compose down
```

### Opção 2 — Manual (sem Docker)

Requer PostgreSQL 16 e Redis 7 instalados e rodando localmente.

**Backend**

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

**Frontend** (em outro terminal)

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Acesse: http://localhost:3000

## Variáveis de ambiente

### Backend (`backend/.env`)

| Variável | Descrição | Padrão |
|---|---|---|
| `DATABASE_URL` | Connection string PostgreSQL | - |
| `REDIS_URL` | Connection string Redis | - |
| `JWT_SECRET` | Segredo JWT (≥ 32 chars) | - |
| `JWT_EXPIRES_IN` | Expiração do token | `7d` |
| `CORS_ORIGIN` | Origem permitida (CORS) | `http://localhost:3000` |
| `BCRYPT_ROUNDS` | Rounds do bcrypt | `12` |
| `PORT` | Porta do servidor | `3001` |

### Frontend (`frontend/.env.local`)

| Variável | Descrição | Padrão |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API | `http://localhost:3001/api` |

## API Endpoints

```
GET    /                            → {"message": "English Dictionary"}

POST   /api/auth/signup             → {id, name, token: "Bearer ..."}
POST   /api/auth/signin             → {id, name, token: "Bearer ..."}
POST   /api/auth/signout

GET    /api/entries/en?page=1&limit=20&search=   (cache Redis)
GET    /api/entries/en/:word        (auth + proxy Free Dictionary API + cache Redis)
POST   /api/entries/en/:word/favorite            (auth)
DELETE /api/entries/en/:word/unfavorite          (auth)

GET    /api/user/me
GET    /api/user/me/history
DELETE /api/user/me/history
GET    /api/user/me/favorites
```

## Segurança

- JWT em **HttpOnly + Secure + SameSite=Strict** (mitigação XSS e CSRF)
- **CSP** via `helmet` no backend e `next.config.ts` no frontend
- Rate limiting: 20 req/15min em auth, 200 req/min geral
- Validação de input com **Zod** em todas as rotas
- Queries parametrizadas via **Prisma** (sem SQL injection)
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`
- Body size limitado a 10kb

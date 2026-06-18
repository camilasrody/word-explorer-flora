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
- Docker & Docker Compose
- (ou) PostgreSQL 16 + Redis 7 locais

## Instalação com Docker

```bash
git clone <repo-url> flora-dictionary
cd flora-dictionary

# Subir todos os serviços
docker compose up -d

# Executar migrations e importar palavras
docker compose exec backend npx prisma migrate deploy
docker compose exec backend npm run db:seed
```

Acesse: http://localhost:3000

## Instalação manual

### Backend

```bash
cd backend
cp .env.example .env
# Editar .env com suas credenciais

npm install
npx prisma migrate dev
npm run db:seed      # importa palavras do dwyl/english-words (words_alpha.txt)
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Editar NEXT_PUBLIC_API_URL se necessário

npm install
npm run dev
```

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

## Importação de palavras

Faça o download do arquivo `words_alpha.txt` do repositório [dwyl/english-words](https://github.com/dwyl/english-words) e coloque em `backend/scripts/words_alpha.txt`, depois execute:

```bash
cd backend
npm run db:seed
```

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

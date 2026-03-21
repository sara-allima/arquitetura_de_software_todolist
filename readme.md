# Kanban

Monorepo com backend em Fastify + TypeScript e frontend em Next.js, usando npm workspaces.

```
/
├── package.json          → raiz do monorepo (workspaces)
├── biome.json            → config compartilhada de linting
├── tsconfig.base.json    → config base compartilhada do TypeScript
├── packages/
│   └── types/            → @kanban/types (tipos compartilhados)
├── server/               → API com Fastify + TypeScript
└── frontend/             → App com Next.js
```

---

## Requisitos

- Node.js
- npm >= 7 (workspaces)

---

## Instalação

Na raiz do projeto, um único comando instala as dependências de todos os workspaces:

```bash
npm install
```

---

## Workspaces

### @kanban/types

Pacote de tipos TypeScript compartilhados entre o backend e o frontend.

---

### Server (Backend)

API REST com Fastify + TypeScript + Zod.

#### Scripts (da raiz)

| Script | Descrição |
|---|---|
| `npm run dev:server` | Inicia o servidor em modo watch com `tsx` |
| `npm run build:server` | Compila o TypeScript para `dist/` |
| `npm run start:server` | Inicia o servidor compilado |

#### Scripts (dentro de `server/`)

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor em modo watch com `tsx` |
| `npm run build` | Compila o TypeScript para `dist/` |
| `npm run start` | Inicia o servidor compilado |

#### Variáveis de ambiente

Crie um arquivo `.env` dentro de `server/` baseado no `.env.example`:

```bash
cp server/.env.example server/.env
```

---

### Frontend

App com Next.js.

#### Scripts (da raiz)

| Script | Descrição |
|---|---|
| `npm run dev:web` | Inicia o frontend em modo desenvolvimento |
| `npm run build:web` | Gera o build de produção |

---
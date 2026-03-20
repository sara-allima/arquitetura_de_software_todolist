# Kanban

Monorepo com backend em Fastify + TypeScript e frontend em Next.js.

```
/
├── backend/   → API com Fastify + TypeScript
└── frontend/  → App com Next.js
```

---

## Requisitos

- Node.js
- npm (ou yarn / pnpm)

---

## Backend

### Instalação

```bash
cd backend
npm install
```

### Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor em modo watch com `tsx` (sem compilar) |
| `npm run build` | Compila o TypeScript para `dist/` |
| `npm run start` | Inicia o servidor compilado |
---

## Frontend

### Instalação

```bash
cd frontend
npm install
```
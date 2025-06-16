# GAMO API

API REST para o backend do GAMO — plataforma de cadastro, ranqueamento e negociação de coleções de videogames.

---

## 📁 Estrutura de Pastas

```
prisma/ # Migrations e esquema do Prisma
public/ # Arquivos estáticos (uploads de imagens)
src/
   core/ # Configurações essenciais (banco de dados, etc.)
      db.ts
   generated/ # Código gerado automaticamente
   infra/ # Integrações com serviços externos
      cloudinary.ts # Armazenamento de imagens
      email.ts # Envio de e-mails
      firebase.ts # Notificações Firebase
   middleware/ # Middlewares Express
      auth.middleware.ts
      firebase.middleware.ts
      validate.middleware.ts
   modules/ # Funcionalidades organizadas por módulo
      auth/  # Autenticação
         __tests__ # Testes do modulo
         auth.controller.ts
         auth.routes.ts
         auth.schema.ts
         auth.service.ts
      ... # outros modulos
   shared/ # Utilitários e código compartilhado
   test/ # test.setup
   types/ # Tipos globais TypeScript
   app.ts # Configuração do Express
   index.ts # Ponto de entrada da aplicação
```

---

## ⚙️ Tecnologias e Dependências

- **Node.js + TypeScript**
- **Express** (v5)
- **Prisma** ORM (PostgreSQL)
- **Zod** para validação de schemas
- **JWT** (`jsonwebtoken`) para autenticação
- **bcryptjs** para hashing de senhas
- **Multer** + **Cloudinary** para upload e armazenamento de imagens
- **Nodemailer** (Mailtrap) para envio de e-mails em sandbox
- **Firebase Admin** para notificações (se aplicável)

### Dev Dependencies

- **pnpm** como gerenciador de pacotes
- **ESLint** + **Prettier** para linting e formatação
- **Vitest** para testes (substituto do Jest)
- **Supertest** para testes de integração HTTP
- **ts-node-dev** para desenvolvimento com hot-reload
- **Husky** + **lint-staged** para pré-commit hooks

---

## 🚀 Scripts (via pnpm)

```jsonc
{
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",

  "prisma:studio": "prisma studio",
  "prisma:migrate:dev": "prisma migrate dev",
  "prisma:generate": "prisma generate",
  "prisma:reset": "prisma migrate reset --force",

  "lint": "eslint . --ext .ts,.js --fix",
  "format": "prettier --write .",
  "test": "vitest",
  "test:watch": "vitest watch",
  "test:coverage": "vitest run --coverage",
}
```

---

## 📋 Variáveis de Ambiente

```dotenv
DATABASE_URL=
JWT_SECRET=
FIREBASE_SERVICE_ACCOUNT=
PORT=
SMTP_HOST=
SMTP_PORT=2525
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
FRONTEND_URL=
SENDINBLUE_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🔧 Configuração Inicial

1. **Instalar dependências**

   ```bash
   pnpm install
   ```

2. **Gerar client do Prisma**

   ```bash
   pnpm prisma:generate
   ```

3. **Rodar migrations** (dev)

   ```bash
   pnpm prisma:resume
   ```

4. **Seed de dados**

   ```bash
   pnpm seed
   ```

5. **Iniciar em desenvolvimento**

   ```bash
   pnpm dev
   ```

---

## 🤝 Contribuições

Contribuições são bem-vindas! Abra issues ou pull requests para melhorias.

---

_Desenvolvido com ❤️ por Mateus Arantes_

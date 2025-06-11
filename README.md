# GAMO API

API REST para o backend do GAMO — plataforma de cadastro, ranqueamento e negociação de coleções de videogames.

---

## 📁 Estrutura de Pastas

```
prisma/           # Migrations e esquema do Prisma
public/           # Arquivos estáticos (e.g. uploads de imagens)
src/
  controllers/    # Lógica de roteadores HTTP
  dtos/           # Tipos de entrada/saída (Data Transfer Objects)
  lib/            # Configurações compartilhadas (ex.: instância do Prisma)
  middleware/     # Middlewares Express (validação, autenticação)
  repositories/   # Acesso direto ao banco via Prisma
  routes/         # Definição de rotas e agrupamento de controllers
  services/       # Regras de negócio e composição de repositórios
  utils/          # Funções utilitárias e classes de erro
  validators/     # Schemas Zod para validação de requests
src/index.ts     # Ponto de entrada da aplicação

tests/            # Suíte de testes (unit e integration)
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
- **ESLint** + **Prettier** + **lint-staged** + **Husky** para lint e formatação
- **Jest** + **Supertest** (`ts-jest`) para testes
- **ts-node-dev** para desenvolvimento com recarga automática

---

## 🚀 Scripts (via pnpm)

```jsonc
{
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts", // Inicia em modo desenvolvimento
  "build": "tsc", // Compila TypeScript
  "migrate": "prisma migrate deploy", // Aplica migrations em production
  "seed": "pnpm prisma:generate && ts-node-dev prisma/seed.ts", // Popula dados iniciais
  "start": "pnpm migrate && pnpm seed && node dist/index.js", // Executa migrations, seed e inicia build

  "prisma:studio": "prisma studio", // UI do Prisma
  "prisma:migrate:dev": "prisma migrate dev", // Cria nova migration em dev
  "prisma:generate": "prisma generate", // Gera client do Prisma
  "prisma:format": "prisma format", // Formata schema.prisma
  "prisma:reset": "prisma migrate reset --force", // Reseta banco e reaplica migrations

  "lint": "eslint . --ext .ts,.js", // Executa ESLint
  "test": "jest --runInBand", // Roda testes
  "test:watch": "jest --watch", // Modo watch para testes
  "test:coverage": "jest --coverage", // Relatório de cobertura
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

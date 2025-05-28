# GAMO API

**GAMO API** é o serviço de backend do projeto GAMO, uma plataforma para colecionadores de videogames onde os usuários podem cadastrar suas coleções de consoles, jogos e acessórios, além de classificar, comprar e vender itens.

---

## 📋 Funcionalidades Principais

- **Autenticação** via JWT (login, signup e login social via Firebase/Goolge).
- **Gerenciamento de coleção**: adicionar, listar, editar e remover consoles, jogos e acessórios.
- **Internacionalização**: suporte aos idiomas português (pt) e inglês (en) para nomes e descrições.
- **Perfis e autorizações**: papéis de usuário (NORMAL, ADMIN, SUPER_ADMIN).
- **Estrutura modular** (routes → controllers → services → repositories).
- **Testes automatizados** com Jest e Supertest.

---

## 🛠 Tecnologias Utilizadas

| Camada              | Ferramenta              |
| ------------------- | ----------------------- |
| Linguagem           | TypeScript              |
| Framework HTTP      | Express.js              |
| ORM                 | Prisma (PostgreSQL)     |
| Validação           | Zod                     |
| Auth (JWT)          | jsonwebtoken + bcrypt   |
| Auth Social         | Firebase Admin SDK      |
| Internacionalização | next-intl (no frontend) |
| Testes              | Jest, Supertest         |
| Contêinerização     | Docker                  |

---

## 🚀 Estrutura do Projeto

```plaintext
gamo-api/
├── prisma/                # Migrations e schema do Prisma
│   ├── migrations/        # Histórico de alterações do banco
│   └── schema.prisma      # Definição do modelo de dados
├── src/
│   ├── controllers/       # Controllers (tratam req/res)
│   ├── middleware/        # Middlewares (auth, validate, errorHandler)
│   ├── repositories/      # Abstração de acesso ao Prisma
│   ├── routes/            # Definição de rotas HTTP
│   ├── services/          # Lógica de negócio
│   ├── utils/             # Helpers genéricos
│   └── index.ts           # Entry point (configuração Express)
├── dist/                  # Build JS (gerado pelo tsc)
│   └── prisma/seed.js     # Seed compilado
├── Dockerfile             # Configuração multi-stage para deploy
├── docker-compose.yml     # (opcional) Compose para dev local
├── package.json           # Scripts e dependências
├── tsconfig.json          # Configuração do TypeScript
└── .env.example           # Variáveis de ambiente de exemplo
```

---

## 🔧 Pré-requisitos (Local)

- **Node.js** v16+ e npm ou yarn
- **Docker** e **Docker Compose** (opcional para dev local)
- **Git**

### Setup local

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/gamo-api.git
   cd gamo-api
   ```

2. Instale dependências:

   ```bash
   npm install
   ```

3. Copie e ajuste o arquivo de ambiente:

   ```bash
   cp .env.example .env
   ```

   Preencha em `.env`:

   ```dotenv
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gamo_dev?schema=public
   JWT_SECRET=sua_chave_super_secreta
   FIREBASE_SERVICE_ACCOUNT=<chave_base64_do_firebase>
   PORT=3000
   ```

4. (Opcional) Inicie o Postgres local com Docker Compose:

   ```bash
   docker compose up -d
   ```

5. Gere e aplique migrações + seed:

   ```bash
   npm run build
   npm run migrate
   npm run seed
   ```

6. Inicie em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

7. Acesse `http://localhost:3000/health` para verificar.

---

## ⚙️ Scripts Úteis

| Script                  | Descrição                                         |
| ----------------------- | ------------------------------------------------- |
| `npm run dev`           | Inicia o servidor em modo dev (hot reload)        |
| `npm run build`         | Compila TypeScript em `dist/`                     |
| `npm run migrate`       | Aplica as migrations (prisma migrate deploy)      |
| `npm run seed`          | Popula dados iniciais (dist/prisma/seed.js)       |
| `npm start`             | Executa `migrate` → `seed` → `node dist/index.js` |
| `npm run test`          | Roda testes com Jest                              |
| `npm run prisma:studio` | Abre Prisma Studio                                |

---

## 📦 Deploy em Produção (Railway)

1. **Configurar variáveis de ambiente** no dashboard do Railway:

   - `DATABASE_URL` (string de conexão Postgres)
   - `JWT_SECRET` (mesmo valor do frontend)
   - `FIREBASE_SERVICE_ACCOUNT` (JSON base64)
   - `PORT=8080`

2. **Conectar o repositório GitHub** ao serviço Railway e habilitar deploy automático.
3. **Start Command** no Railway: `npm start`
4. **Build** e **deploy** usarão o `Dockerfile` multi-stage:

   - **Builder**: instala dependências, gera Prisma Client, compila TS
   - **Runner**: copia artefatos, aplica migrations/seed, inicia o servidor

5. Após o deploy, verifique nos logs:

   ```
   > npm run migrate
   > npm run seed
   > node dist/index.js
   Server rodando em 0.0.0.0:8080
   ```

6. Acesse `https://<seu-projeto>.up.railway.app/health` para validar.

---

## 📚 Endpoints Principais

### Autenticação

- **GET** `/health` → ping simples

- **POST** `/api/auth/signup`
  Body: `{ name, email, password }` → retorna `{ token }`

- **POST** `/api/auth/login`
  Body: `{ email, password }` → retorna `{ token }`

- **POST** `/api/auth/social/google`
  Header: `Authorization: Bearer <ID_TOKEN_GOOGLE>` → retorna `{ token }`

### Coleção do Usuário (token JWT obrigatório)

- **GET** `/api/user/consoles` → lista consoles
- **POST** `/api/user/consoles` → adiciona console à coleção

  Body exemplo:

  ```json
  {
    "consoleId": 1,
    "variantSlug": "slim",
    "skinSlug": "midnight-black",
    "customSkin": "Camo Green",
    "note": "Comprado em 2024",
    "photoUrl": "https://..."
  }
  ```

---

## 🤝 Contribuições

Contribuições são bem-vindas! Abra issues ou pull requests para melhorias.

---

_Desenvolvido com ❤️ por Mateus Arantes_

# GAMO API

**GAMO API** é o serviço backend do projeto GAMO, uma plataforma para colecionadores de videogames onde os usuários podem cadastrar suas coleções de consoles, jogos e acessórios, classificar, comprar e vender itens.

## 📋 Funcionalidades Principais

* **Autenticação** via JWT (login e signup).
* **Gerenciamento de coleção**: adicionar, listar, editar e remover consoles personalizados.
* **Internacionalização**: suporte a inglês (en) e português (pt) para títulos, descrições e nomes.
* **Estrutura modular**: divisão clara em rotas, controllers, services, repositories e middlewares.
* **Testes automatizados** com Jest e Supertest.

## 🛠 Tecnologias Utilizadas

| Camada                | Ferramenta/Core               |
| --------------------- | ----------------------------- |
| **Linguagem**         | TypeScript                    |
| **Framework HTTP**    | Express.js                    |
| **ORM**               | Prisma (PostgreSQL)           |
| **Validação**         | Zod                           |
| **Autenticação**      | JSON Web Token (JWT) + bcrypt |
| **Ambiente**          | Node.js                       |
| **Testes**            | Jest, Supertest               |
| **Lint & Formatação** | (opcional) ESLint, Prettier   |

## 🚀 Estrutura do Projeto

```plaintext
gamo-api/
├─ prisma/                # Migrations e schema do Prisma
│  ├─ migrations/         # Histórico de alterações do banco
│  ├─ schema.prisma       # Modelos e relações
│  └─ seed.ts             # Popula dados iniciais
└─ src/
   ├─ db.ts               # Instancia o PrismaClient
   ├─ index.ts            # Entrypoint: configura Express e monta routers
   ├─ middleware/         # Middlewares (auth, validate, errorHandler)
   ├─ controllers/        # Controllers (req/res)
   ├─ services/           # Lógica de negócio (unit-testável)
   ├─ repositories/       # Abstração do Prisma Client
   ├─ routes/             # Mapeamento de URLs para controllers
   ├─ validators/         # Schemas Zod para validação de input
   └─ utils/              # Helpers genéricos (ex: geração de JWT)
tests/                    # Testes unitários e de integração
```

## 🔧 Pré-requisitos

* **Node.js** (v16 ou superior)
* **npm** ou **yarn**
* **Docker** e **Docker Compose** (para facilitar o setup do PostgreSQL)
* **Git** (para versionamento)

## ⚙️ Configuração em uma Máquina Nova

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/gamo-api.git
   cd gamo-api
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure variáveis de ambiente**

   * Crie um arquivo `.env` na raiz:

     ```dotenv
     DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gamo_dev?schema=public
     JWT_SECRET=sua_chave_super_secreta
     ```

4. **Inicie o banco de dados com Docker Compose**

   ```bash
   docker compose up -d
   ```

5. **Execute as migrations e gere o client Prisma**

   ```bash
   npm run prisma:migrate:dev
   npm run prisma:generate
   ```

6. **Popule dados iniciais (seed)**

   ```bash
   npm run prisma:seed
   ```

7. **Execute em modo desenvolvimento**

   ```bash
   npm run dev
   ```

> O servidor ficará disponível em `http://localhost:3000`.

## 🎯 Comandos Úteis

| Script                       | Descrição                                           |
| ---------------------------- | --------------------------------------------------- |
| `npm run dev`                | Inicia o servidor em modo dev com reload automático |
| `npm run build`              | Compila TypeScript para JavaScript em `dist/`       |
| `npm start`                  | Executa o build compilado                           |
| `npm run test`               | Executa todos os testes                             |
| `npm run test:watch`         | Testes em modo watch                                |
| `npm run test:coverage`      | Gera relatório de cobertura                         |
| `npm run prisma:studio`      | Abre o Prisma Studio                                |
| `npm run prisma:migrate:dev` | Cria/aplica novas migrations                        |
| `npm run prisma:generate`    | Gera o Prisma Client                                |
| `npm run prisma:seed`        | Roda o script de seed                               |
| `npm run prisma:reset`       | Reseta o banco e reaplica todas as migrations       |

## 📚 Documentação de Endpoints

### Auth

* **POST** `/api/auth/signup` – Cria usuário e retorna token JWT

  * Body:

    ```json
    { "name": "Nome", "email": "email@example.com", "password": "senha123" }
    ```

* **POST** `/api/auth/login` – Autentica e retorna token JWT

  * Body:

    ```json
    { "email": "email@example.com", "password": "senha123" }
    ```

### User Consoles

> (requere `Authorization: Bearer <token>`)

* **GET** `/api/user/consoles` – Lista consoles da coleção do usuário

* **POST** `/api/user/consoles` – Adiciona console à coleção

  * Body:

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

## 🤝 Contribuições

Contribuições são bem-vindas! Abra issues ou pull requests para sugerir melhorias ou corrigir bugs.

---

*Desenvolvido com ❤️ por Mateus*

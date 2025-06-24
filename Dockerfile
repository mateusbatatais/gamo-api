# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:21-bookworm-slim AS builder

# Instala dependências essenciais
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Instala versão específica do PNPM
ARG PNPM_VERSION=8.15.9 # ALTERE PARA SUA VERSÃO
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Copia arquivos de configuração
COPY package.json pnpm-lock.yaml .npmrc .pnpmfile.cjs ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia o resto da aplicação
COPY . .

# Gera cliente Prisma
RUN npx prisma generate

# Build da aplicação
RUN pnpm run build

# --------------------------
# Stage 2: Runner
# --------------------------
FROM node:21-bookworm-slim AS runner

# Instala dependências essenciais
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Instala versão específica do PNPM
ARG PNPM_VERSION=10.11.1 # MESMA VERSÃO DO BUILDER
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Copia arquivos necessários
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Configura ambiente
ENV NODE_ENV=production
EXPOSE 8080

# Comando de inicialização
#CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]

# Comando reset migration
CMD ["sh", "-c", "npx prisma migrate reset --force && npm run seed:prod && node dist/index.js"]
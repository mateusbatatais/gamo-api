# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:23-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

# Configuração PNPM para permitir scripts
COPY .npmrc ./

# Cache de dependências
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Aprova scripts necessários
RUN pnpm approve-builds @prisma/client prisma @prisma/engines

# Copia o resto do código
COPY . .

# Build da aplicação
RUN pnpm run build

# Limpeza de dependências de desenvolvimento
RUN pnpm prune --prod


# --------------------------
# Stage 2: Runner
# --------------------------
FROM node:23-alpine AS runner

RUN npm install -g pnpm
WORKDIR /app

# Copia apenas o necessário
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Configurações de produção
ENV NODE_ENV=production
EXPOSE 8080

# Comando de inicialização
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/prisma/seeds/main.js && node dist/index.js"]
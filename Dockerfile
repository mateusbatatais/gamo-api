# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:21-bookworm-slim AS builder

# Instala dependências essenciais
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Instala versão específica do PNPM
ARG PNPM_VERSION=8.15.9
RUN npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

# Copia arquivos de configuração
COPY package.json pnpm-lock.yaml .npmrc .pnpmfile.cjs ./

# Instala dependências
RUN pnpm install --force

# Copia o resto da aplicação
COPY . .

# Regenera o cliente Prisma
RUN npx prisma generate

# Compila o TypeScript para JavaScript
RUN pnpm run build

# Verifique o conteúdo da pasta dist no estágio de construção
RUN ls -R /app/dist 

# --------------------------
# Stage 2: Runner
# --------------------------
FROM node:21-bookworm-slim AS runner

# Instala dependências essenciais
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Instala versão específica do PNPM
RUN npm install -g pnpm

WORKDIR /app

# Copia arquivos necessários da etapa anterior
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Configura ambiente
ENV NODE_ENV=production
EXPOSE 8080

# Comando de inicialização
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/index.js"]

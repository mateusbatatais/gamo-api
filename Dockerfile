# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:23-alpine AS builder

# 1) Instala o pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# 3) Copia package.json e pnpm-lock.yaml para cache de dependências
COPY package.json pnpm-lock.yaml ./

# 4) Garante instalação de devDependencies
ENV NODE_ENV=development

# 5) Instala todas as dependências conforme o lockfile
RUN pnpm install --frozen-lockfile

# 6) Copia o restante do código-fonte
COPY . .

# 7) Gera o Prisma Client (se você usa Prisma)
RUN npx prisma generate

# 8) Compila o TypeScript
RUN pnpm run build


# --------------------------
# Stage 2: Runner
# --------------------------
FROM node:23-alpine AS runner

RUN npm install -g pnpm
WORKDIR /app

# 1) Copia apenas os artefatos do builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# 2) Define ambiente de produção
ENV NODE_ENV=production
EXPOSE 8080

# 3) Inicia a aplicação
CMD ["pnpm", "start"]

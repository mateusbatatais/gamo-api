# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:23-alpine AS builder

# 1) Instala o pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# 2) Copia package.json e pnpm-lock.yaml para cache de dependências
COPY package.json pnpm-lock.yaml ./

# 3) Garante instalação de devDependencies
ENV NODE_ENV=development

# 4) Instala todas as dependências conforme o lockfile
RUN pnpm install --frozen-lockfile

# 5) Copia o restante do código-fonte
COPY . .

# 6) Gera o Prisma Client (se você usa Prisma)
RUN npx prisma generate

# 7) Compila o TypeScript
RUN pnpm run build

# 8) Copia a pasta infra para dentro de dist (AGORA DEPOIS DO BUILD)
RUN mkdir -p dist/infra && cp -r src/infra/* dist/infra

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

ENV NODE_ENV=production
EXPOSE 8080

# 2) Inicia a aplicação
CMD ["pnpm", "start"]
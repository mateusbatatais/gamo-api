# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:23-alpine AS builder

# 1) Instala o pnpm globalmente
RUN npm install -g pnpm

# 2) Define o diretório de trabalho
WORKDIR /app

# 3) Copia package.json e pnpm-lock.yaml para cache de dependências
COPY package.json pnpm-lock.yaml ./

# 4) Instala dependências de dev e prod conforme o lockfile
RUN pnpm install --frozen-lockfile

# 5) Copia todo o código-fonte para dentro do container
COPY . .

# 6) Gera o Prisma Client (caso você esteja usando Prisma)
RUN npx prisma generate

# 7) Compila o TypeScript (gera a pasta /dist)
RUN pnpm run build

# --------------------------
# Stage 2: Runner
# --------------------------
FROM node:23-alpine AS runner

# 1) Instala o pnpm (não é estritamente obrigatório para rodar, 
#    mas garante consistência se você quiser usar pnpm em produção)
RUN npm install -g pnpm

# 2) Define o diretório de trabalho
WORKDIR /app

# 3) Copia apenas os artefatos necessários do build
#    Não há mais package-lock.json, usamos pnpm-lock.yaml caso precise de referência.
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

#    Copia node_modules já instalados no builder
COPY --from=builder /app/node_modules ./node_modules

#    Se você usa Prisma e precisa da pasta prisma (com schema e migrations)
COPY --from=builder /app/prisma ./prisma

#    Copia a pasta compilada de código (dist)
COPY --from=builder /app/dist ./dist

# 4) Define que este é um ambiente de produção
ENV NODE_ENV=production

# 5) Expõe a porta na qual sua API irá escutar
EXPOSE 8080

# 6) Comando para iniciar a aplicação
#    Aqui supondo que seu script "start" no package.json faça:
#      "start": "npm run migrate && node dist/index.js"
#    Se você usasse pnpm run start, bastaria trocar.
CMD ["pnpm", "start"]

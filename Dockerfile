# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:23-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# 1) Copia package.json e package-lock.json para cache de dependências
COPY package.json package-lock.json ./

# 2) Instala dependências (incluindo dev)
RUN npm install

# 3) Copia todo o código
COPY . .

# 4) Gera o Prisma Client
RUN npx prisma generate

# 5) Compila o TypeScript
RUN npm run build

# --------------------------
# Stage 2: Runner
# --------------------------
FROM node:23-alpine AS runner

WORKDIR /app

# 1) Copia os artefatos do builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# 2) Define ambiente de produção e expõe porta
ENV NODE_ENV=production
EXPOSE 3001

# 3) Start: aplica migrations e inicia o servidor
CMD ["npm", "start"]

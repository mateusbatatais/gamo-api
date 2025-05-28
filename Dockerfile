# --------------------------
# Etapa 1: Builder
# --------------------------
FROM node:23-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários para instalação das dependências
COPY package.json package-lock.json ./

# Instala as dependências (inclusive dev)
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila o TypeScript
RUN npm run build

# --------------------------
# Etapa 2: Runner
# --------------------------
FROM node:23-alpine AS runner

# Diretório de trabalho
WORKDIR /app

# Copia os artefatos da etapa de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Define a variável de ambiente
ENV NODE_ENV=production
EXPOSE 3001

# Aplica migrations no ambiente de produção e inicia o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]

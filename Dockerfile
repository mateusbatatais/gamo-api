# --- Stage 1: Builder ---
FROM node:18-alpine AS builder

WORKDIR /app

# 1) Copia apenas package.json e package-lock.json para aproveitar cache
COPY package.json package-lock.json ./

# 2) Instala dependências de produção e desenvolvimento
RUN npm install

# 3) Copia o restante dos arquivos
COPY . .

# 4) Gera o Prisma Client
RUN npx prisma generate

# 5) Aplica migrations num ambiente que já conhece o client
RUN npx prisma migrate deploy

# 6) Compila o código TypeScript
RUN npm run build

# --- Stage 2: Runner (menor) ---
FROM node:18-alpine AS runner

WORKDIR /app

# 1) Copia só o necessário para rodar
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma      
COPY --from=builder /app/dist ./dist           

ENV NODE_ENV=production

# 2) Expõe a porta (se necessário)
EXPOSE 3001

# 3) Comando final
CMD ["node", "dist/index.js"]

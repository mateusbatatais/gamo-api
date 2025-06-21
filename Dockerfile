# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:23-alpine AS builder

# Instala ferramentas úteis para debug
RUN apk add --no-cache bash tree

# Configura logs verbosos
ENV NPM_CONFIG_LOGLEVEL=verbose
ENV PNPM_DEBUG=true

RUN npm install -g pnpm
WORKDIR /app

# Cache de dependências
COPY package.json pnpm-lock.yaml ./

# 1. Instala com logs detalhados
RUN pnpm install --frozen-lockfile --reporter append-only | tee pnpm-install.log

# 2. Verifica estrutura de arquivos
RUN tree -L 3 node_modules > tree.log
RUN find node_modules/.bin -type f -ls > bin-files.log

# 3. Tenta executar scripts manualmente
RUN node node_modules/prisma/scripts/postinstall.js || echo "Postinstall falhou"

# 4. Gera cliente Prisma manualmente
RUN npx prisma generate || echo "Prisma generate falhou"

# Copia o resto do código
COPY . .

# 5. Build com logs detalhados
RUN pnpm run build | tee build.log

# 6. Limpeza com verificação
RUN pnpm prune --prod && pnpm store status > store-status.log


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
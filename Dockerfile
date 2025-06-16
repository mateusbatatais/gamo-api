# --------------------------
# Stage 1: Builder
# --------------------------
FROM node:23-alpine AS builder

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN pnpm run build

# Copia TODOS os arquivos necessários para dist
RUN find src -type f -name "*.ts" -o -name "*.js" -o -name "*.json" | while read f; do \
    mkdir -p "dist/$(dirname "$f")"; \
    cp "$f" "dist/$(dirname "$f")"; \
    done

# --------------------------
# Stage 2: Runner
# --------------------------
FROM node:23-alpine AS runner

RUN npm install -g pnpm
WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 8080

CMD ["pnpm", "start"]
# ---- Base de dependencias ----
FROM node:20-alpine AS deps
WORKDIR /app

# Habilitar corepack para usar pnpm
RUN corepack enable

# Copiar manifiestos primero para cacheo de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias con pnpm
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable

# Copiar node_modules resueltas y el código fuente
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construir el proyecto en modo servidor standalone
RUN pnpm build

# ---- Runtime ----
FROM node:20-alpine AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
WORKDIR /app

# Copiar build, node_modules de producción y la carpeta public
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Usar usuario no root
RUN addgroup -g 1001 -S appgroup && adduser -S appuser -u 1001 -G appgroup \
  && chown -R appuser:appgroup /app
USER appuser

# Puerto por defecto del servidor Astro
ENV PORT=4321
EXPOSE 4321

# Ejecutar servidor Node del adapter
CMD ["node", "dist/server/entry.mjs"]

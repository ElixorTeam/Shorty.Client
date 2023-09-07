# Stage 1
FROM node:20-alpine as base

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable

# Stage 2
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --prefer-offline --frozen-lockfile

# Stage 3
FROM base AS build

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build && pnpm prune --prod

# Stage 4
FROM base AS runner

ENV NODE_ENV=production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]

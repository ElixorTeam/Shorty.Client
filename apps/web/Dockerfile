FROM oven/bun:alpine as deps

WORKDIR /app
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile

FROM node:20-alpine as build

WORKDIR /app

COPY . .
COPY --from=deps /app .
RUN npm run build

FROM node:20-alpine as run

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]

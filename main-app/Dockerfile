FROM node:20-alpine as base

WORKDIR /app

FROM base AS build

COPY . .
RUN apk add --no-cache libc6-compat

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm fetch && pnpm i -r --offline --no-optional
RUN pnpm run build && pnpm prune

FROM base AS runner

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE $PORT
USER nextjs

CMD ["node", "server.js"]

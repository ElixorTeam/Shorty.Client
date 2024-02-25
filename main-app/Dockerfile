# Stage 1
FROM node:20-alpine as base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 2
FROM base AS build

COPY . .
RUN pnpm fetch && pnpm i -r --offline --no-optional
RUN pnpm run build && pnpm prune

# Stage 3
FROM base AS runner

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE $PORT

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

CMD ["node", "server.js"]

FROM oven/bun:1.2-alpine AS base

ARG APP_NAME=web
RUN apk update && apk add --no-cache libc6-compat

FROM base AS build

WORKDIR /app
RUN bun add -g turbo@2
COPY . .
RUN turbo prune ${APP_NAME} --docker

FROM base AS install

WORKDIR /app
COPY --from=build /app/out/json/ .
COPY --from=build /app/out/bun.lock .
RUN bun install --frozen-lockfile
COPY --from=build /app/out/full/ .
RUN bun run turbo build --filter=${APP_NAME}

FROM base AS run

WORKDIR /app

RUN addgroup --system --gid 1002 nodejs
RUN adduser --system --uid 1002 nextjs
USER nextjs

COPY --from=install --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=install --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static

ENV APP_MAIN_FILE=apps/${APP_NAME}/server.js

CMD node ${APP_MAIN_FILE}

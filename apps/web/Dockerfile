FROM node:22-alpine AS base

ARG APP_NAME=web
RUN apk update && apk add --no-cache libc6-compat

FROM base AS build

WORKDIR /app
RUN yarn global add turbo@^2
COPY . .
RUN turbo prune ${APP_NAME} --docker

FROM base AS install

WORKDIR /app
COPY --from=build /app/out/json/ .
COPY --from=build /app/out/yarn.lock .
RUN yarn install --frozen-lockfile
COPY --from=build /app/out/full/ .
RUN yarn turbo build --filter=${APP_NAME}

FROM base AS run

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=install --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=install --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static

ENV APP_MAIN_FILE=apps/${APP_NAME}/server.js

CMD node ${APP_MAIN_FILE}

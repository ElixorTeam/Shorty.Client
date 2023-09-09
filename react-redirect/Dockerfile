# Stage 1
FROM node:20-lts as base

WORKDIR /app
RUN npm i -g pnpm

# Stage 2
FROM base as deps

COPY pnpm-lock.yaml package.json ./
COPY . /app
RUN pnpm i

# Stage 3
FROM base as builder

COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build && pnpm prune --prod

# Stage 4
FROM base as runner

ENV NODE_ENV=production
EXPOSE 3031

COPY --from=build /app/build ./
CMD ["pnpm", "preview"]

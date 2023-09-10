# Stage 1
FROM node:20-alpine as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Stage 2
FROM base as builder

COPY . .
RUN pnpm fetch && pnpm i -r --offline
RUN pnpm build && pnpm prune

# Stage 3
FROM base as runner

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
RUN pnpm i -g serve

EXPOSE 3031
CMD ["serve", "-s", "dist", "-l", "3031"]

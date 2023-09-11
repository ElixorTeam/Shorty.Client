# Stage 1
FROM node:20-slim as base

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
EXPOSE 3031
RUN pnpm i -g serve

COPY env.sh .
RUN chmod +x env.sh && rm dist/env.js
CMD ["/bin/bash", "-c", "./env.sh dist/env.js;serve -s dist -l 3031"]

FROM node:19-alpine

WORKDIR /shorty
COPY package.json ./
RUN npm i -g pnpm
RUN pnpm i

COPY . .
CMD ["pnpm", "dev", "--host"]

# Stage 1
FROM node:20-alpine
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build
EXPOSE 3031
CMD ["npm", "run", "start"]

# Stage 1
#FROM node:20-alpine AS deps
#WORKDIR /app
#COPY package.json ./
#RUN npm install

# Stage 2
#FROM node:20-alpine
#WORKDIR /app
#COPY --from=deps /app/node_modules ./node_modules
#COPY . .
#RUN NODE_ENV=production npm run build && npm prune --production
#CMD ["npm", "start"]

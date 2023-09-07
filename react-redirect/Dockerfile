# Stage 1
FROM node:20-alpine
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build
EXPOSE 3031
CMD ["npm", "run", "start"]

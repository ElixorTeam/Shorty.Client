FROM node:19-alpine
WORKDIR /app
COPY . /app
RUN npm i
EXPOSE 3031
CMD ["npm", "run", "dev", "--host"]

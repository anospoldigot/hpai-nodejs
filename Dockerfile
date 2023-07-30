FROM node:16

workdir /app

COPY package*.json ./

RUN yarn install --silent

COPY . ./

EXPOSE 3000

CMD ["nodemon", "server.js"]



FROM node:16

workdir /app

COPY package*.json ./

RUN yarn install --silent

COPY . ./
RUN yarn global add nodemon

EXPOSE 3000

CMD ["nodemon", "server.js"]



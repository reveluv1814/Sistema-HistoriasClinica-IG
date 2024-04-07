FROM node:lts-alpine3.19

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run migrations:run

CMD [ "npm","run","dev" ]
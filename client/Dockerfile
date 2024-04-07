FROM node:lts-alpine3.19

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm","run","dev" ]
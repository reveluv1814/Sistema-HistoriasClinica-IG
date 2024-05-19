FROM node:lts-alpine3.19 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN mkdir -p server/public/imagenes/arbolGene
RUN mkdir -p server/public/imagenes/doctores
RUN mkdir -p server/public/imagenes/laboratoristas
RUN mkdir -p server/public/imagenes/pacientes
RUN mkdir -p server/public/imagenes/personal
CMD [ "sh", "-c", "npm run migrations:run && npm run dev" ]
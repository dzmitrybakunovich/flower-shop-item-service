FROM node:16.13.2

WORKDIR /project

COPY package.json package-lock.json /project/

RUN npm install --silent

COPY . /project/

EXPOSE 8080
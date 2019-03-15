FROM node:lts-alpine

WORKDIR /usr/app

COPY ./ ./

RUN npm install --silent

CMD [ "node", "src/index.js" ]

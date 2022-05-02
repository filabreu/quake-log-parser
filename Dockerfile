FROM node:16

ENV APP /app

RUN mkdir $APP
COPY . $APP

WORKDIR $APP

RUN npm install

CMD node $APP/src/index.js

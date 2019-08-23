FROM node:8-jessie

RUN npm install --global \
  yarn

ADD . /root/d20md

WORKDIR /root/d20md

RUN yarn install

CMD NODE_ENV=production node ./server.js

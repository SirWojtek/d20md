FROM node:8-jessie

ADD . /root/d20md

WORKDIR /root/d20md

RUN yarn install

ENV NODE_ENV=production

CMD yarn deploy_backend && node ./server.js

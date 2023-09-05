FROM node:18-alpine as dev

WORKDIR /opt/fds

RUN npm install -g @angular/cli

COPY package*.json ./
# https://docs.npmjs.com/cli/v9/commands/npm-ci
RUN npm ci

CMD ["npm", "run", "dev"]

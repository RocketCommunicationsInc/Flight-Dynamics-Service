FROM node:18-alpine

WORKDIR /opt/fds

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

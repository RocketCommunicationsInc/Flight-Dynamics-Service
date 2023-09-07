FROM node:18-bullseye-slim as base

WORKDIR /opt/fds

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "run", "dev"]

## used in docker desktop Dev Environments
FROM base as dev-environment

# install git in container with certs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF
# add vscode user
RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

## build stage
FROM base as build

WORKDIR /opt/fds

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /opt/fds/dist/flight-dynamics/ /usr/share/nginx/html

EXPOSE 80

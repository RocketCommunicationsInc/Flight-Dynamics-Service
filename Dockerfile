FROM node:18-bullseye-slim as base

WORKDIR /opt/fds

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

FROM base as dev-environment

# install git in container
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

CMD ["ng", "serve", "--host", "0.0.0.0"]

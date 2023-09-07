# base stage
FROM node:18-bullseye-slim as base
WORKDIR /opt/fds
RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "run", "dev"]

# dev stage used in docker desktop Dev Environments
FROM base as dev-environment
### install git in container with certs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
apt-get install -y --reinstall ca-certificates
EOF
### add vscode user
RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
### install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
EXPOSE 4200
CMD ["npm", "run", "dev"]

# build stage example with nginx
FROM base as build
WORKDIR /opt/fds
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /opt/fds/dist/flight-dynamics/ /usr/share/nginx/html
EXPOSE 80

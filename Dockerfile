FROM node:20.9.0-alpine

RUN apk add --update supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /app/server

COPY ./server/package*.json ./

RUN npm install

COPY ./server .

# Unzip the icons
RUN unzip library/icons/lucide/vectordb/index.zip

COPY ./webapps-starters /app/webapp
WORKDIR /app/webapp/react/shadcn
RUN npm i

WORKDIR /app/webapp/react/nextui
RUN npm i

WORKDIR /app/webapp/react/flowbite
RUN npm i

WORKDIR /app/server
# Expose port 3000 for the server
EXPOSE 3000
ENV HOSTNAME 0.0.0.0

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
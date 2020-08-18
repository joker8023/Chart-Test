FROM node:12.18.2 as builder

WORKDIR /source
COPY . ./
RUN yarn
RUN yarn build
RUN  apt-get update && apt-get install nginx -y 
CMD cat deploy/$VIINETCFG.conf > /etc/nginx/conf.d/nginx.conf && service nginx start && node server.js

# base img
FROM node:14-alpine

# create workdir, copy, and configure
RUN mkdir app
COPY . /app
WORKDIR /app/

# install deps
RUN npm install

# start server
CMD npm run cli start

EXPOSE 5001
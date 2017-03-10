FROM node:6.7.0

MAINTAINER Jon Brennecke <jpbrennecke@gmail.com>

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY . /usr/src/api/

ENV NODE_ENV production

RUN npm install

# install maven
RUN apt-get update && apt-get install -y maven

# get maven dependencies (liquibase and mysql jdbc)
RUN mvn clean dependency:copy-dependencies

EXPOSE 3002

CMD ["sh", "./docker-start.sh"]

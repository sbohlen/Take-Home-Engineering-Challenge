FROM docker.io/sbohlen/takehomechallenge-database-only:latest

# Switch to root user for access to apt-get install
USER root

# Install node/npm
RUN apt-get -y update  && \
        apt-get install -y curl && \
        curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
        apt-get install -y nodejs && \
        apt-get install -y dos2unix

# Create app directory
RUN mkdir /app
WORKDIR /app

# copy transpiled app source
COPY ./dist/ /app

# fix any straggler line-endings
RUN find /app * | xargs dos2unix

# copy the package.json to app directory
COPY package.json /app

# Install app dependencies
RUN npm install

FROM mcr.microsoft.com/mssql/server:2019-latest

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


# Create app directory
RUN mkdir /app/sql

# copy sql scripts
COPY ./sql/ /app/sql

# fix any straggler line-endings
RUN find /app * | xargs dos2unix

# copy import data
COPY ./data /app/data

# copy the package.json to app directory
COPY package.json /app

# Install app dependencies
RUN npm install

# Grant permissions for the database build script to be executable
RUN chmod +x /app/sql/build_and_populate_database.sh

# copy the entrypoint script into the root of the container
COPY ./build/entrypoint.sh /

# Grant permissions for the entrypoint script to be executable
RUN chmod +x /entrypoint.sh

# Switch back to mssql user and run the entrypoint script
USER mssql
ENTRYPOINT /bin/bash ./entrypoint.sh

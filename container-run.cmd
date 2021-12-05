rem docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password123!" -e "SQL_SERVER_NAME=localhost" -e "SQL_DATABASE_NAME=takehomechallenge" -e "SQL_USERNAME=sa" -e "SQL_PASSWORD=Password123!" -p 1433:1433 -d test-container:latest
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password123!" -e "SQL_SERVER_NAME=localhost" -e "SQL_DATABASE_NAME=takehomechallenge" -e "SQL_USERNAME=sa" -e "SQL_PASSWORD=Password123!" -it --entrypoint /bin/bash -p 1433:1433 test-container:latest



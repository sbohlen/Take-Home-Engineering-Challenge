#!/bin/bash

#start SQL Server, start the script to create the DB and import the data
/opt/mssql/bin/sqlservr & /app/sql/build_and_populate_database.sh

#!/bin/bash

# run the setup script to create the DB and the schema in the DB
#do this in a loop because the timing for when the SQL instance is ready is indeterminate

for i in {1..50};
do
    /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d master -i /app/sql/create_database.sql
    if [ $? -eq 0 ]
    then
        echo "create_database.sql completed"
        break
    else
        echo "SQL Server startup not yet complete..."
        sleep 1
    fi
done

# create the tripdata tables
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d takehomechallenge -i /app/sql/create_tripdata_tables.sql

# import the data from the CSV files into the tripdata tables
/opt/mssql-tools/bin/bcp takehomechallenge.dbo.green_tripdata in "/app/data/green_tripdata.csv" -c -t',' -S localhost -U sa -P Password123!
/opt/mssql-tools/bin/bcp takehomechallenge.dbo.yellow_tripdata in "/app/data/yellow_tripdata.csv" -c -t',' -S localhost -U sa -P Password123!
/opt/mssql-tools/bin/bcp takehomechallenge.dbo.fhv_tripdata in "/app/data/fhv_tripdata.csv" -c -t',' -S localhost -U sa -P Password123!
/opt/mssql-tools/bin/bcp takehomechallenge.dbo.taxi_zone_lookup in "/app/data/taxi_zone_lookup.csv" -c -t',' -S localhost -U sa -P Password123!

# create the borough lookup table
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d takehomechallenge -i /app/sql/create_borough_lookup_table.sql

# populate the borough lookup table
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d takehomechallenge -i /app/sql/build_borough_lookup_table.sql

# update all the borough IDs in the trip data tables
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d takehomechallenge -i /app/sql/update_tripdata_tables_with_borough_ids.sql

# create and populate the tripmetrics tables
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d takehomechallenge -i /app/sql/build_green_tripmetrics_table.sql
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d takehomechallenge -i /app/sql/build_yellow_tripmetrics_table.sql
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Password123! -d takehomechallenge -i /app/sql/build_fhv_tripmetrics_table.sql


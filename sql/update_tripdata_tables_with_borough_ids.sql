update green_tripdata 
set
	PUBoroughID = (select blu.id from borough_lookup blu inner join taxi_zone_lookup tlz on blu.borough = tlz.Borough where tlz.LocationID = PULocationID),
	DOBoroughID = (select blu.id from borough_lookup blu inner join taxi_zone_lookup tlz on blu.borough = tlz.Borough where tlz.LocationID = DOLocationID)

update yellow_tripdata 
set
	PUBoroughID = (select blu.id from borough_lookup blu inner join taxi_zone_lookup tlz on blu.borough = tlz.Borough where tlz.LocationID = PULocationID),
	DOBoroughID = (select blu.id from borough_lookup blu inner join taxi_zone_lookup tlz on blu.borough = tlz.Borough where tlz.LocationID = DOLocationID)

update fhv_tripdata 
set
	PUBoroughID = (select blu.id from borough_lookup blu inner join taxi_zone_lookup tlz on blu.borough = tlz.Borough where tlz.LocationID = PULocationID),
	DOBoroughID = (select blu.id from borough_lookup blu inner join taxi_zone_lookup tlz on blu.borough = tlz.Borough where tlz.LocationID = DOLocationID)

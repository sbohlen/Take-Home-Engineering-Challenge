select td.PUBoroughID, td.DOBoroughID,

--subselect to resolve the origin borough based on id of pick-up zone
(select blu.Borough from borough_lookup blu where blu.id = td.PUBoroughID) as origin,

--subselect to resolve the destintation borough based on id of drop-off zone
(select blu.Borough from borough_lookup blu where blu.id = td.DOBoroughID) as destination,

--extract the 0-23 hour value from the pick-up date/time
DATEPART(HOUR, td.pickup_datetime) as tripHour,

--calculate the AVG for all trips having the same hour
(select top 1 AVG(DATEDIFF(minute, td.pickup_datetime, td.dropoff_datetime)) as answer
   	from fhv_tripdata tdtimes
	where
	DATEPART(HOUR, tdtimes.pickup_datetime) = DATEPART(HOUR, td.pickup_datetime)
	and tdtimes.PUBoroughID = td.PUBoroughID
	and tdtimes.DOBoroughID = td.DOBoroughID
	order by answer desc
    ) as averageDuration,

--calculate the MIN for all trips having the same hour
(select top 1 MIN(DATEDIFF(minute, td.pickup_datetime, td.dropoff_datetime)) as answer
   	from fhv_tripdata tdtimes
	where
	DATEPART(HOUR, tdtimes.pickup_datetime) = DATEPART(HOUR, td.pickup_datetime)
	and tdtimes.PUBoroughID = td.PUBoroughID
	and tdtimes.DOBoroughID = td.DOBoroughID
	order by answer desc
    ) as minimumDuration,

--calculate the MAX for all trips having the same hour
(select top 1 MAX(DATEDIFF(minute, td.pickup_datetime, td.dropoff_datetime)) as answer
   	from fhv_tripdata tdtimes
	where
	DATEPART(HOUR, tdtimes.pickup_datetime) = DATEPART(HOUR, td.pickup_datetime)
	and tdtimes.PUBoroughID = td.PUBoroughID
	and tdtimes.DOBoroughID = td.DOBoroughID
	order by answer desc
    ) as maximumDuration

into fhv_tripmetrics

from fhv_tripdata td

--exclude the unresolvable "zone id zero" entries (dirty data!)
where td.PULocationID != 0 and td.DOLocationID !=0

group by DATEPART(HOUR, td.pickup_datetime), td.PUBoroughID, td.DOBoroughID

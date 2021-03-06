USE [takehomechallenge]
GO
/****** Object:  Table [dbo].[fhv_tripdata]    Script Date: 12/4/2021 9:11:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fhv_tripdata](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[dispatching_base_num] [varchar](15) NULL,
	[pickup_datetime] [datetime] NULL,
	[dropoff_datetime] [datetime] NULL,
	[PULocationID] [smallint] NULL,
	[DOLocationID] [smallint] NULL,
	[SR_Flag] [varchar](max) NULL,
	[Affiliated_base_number] [varchar](15) NULL,
	[PUBoroughID] [int] NULL,
	[DOBoroughID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[green_tripdata]    Script Date: 12/4/2021 9:11:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[green_tripdata](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[VendorID] [smallint] NULL,
	[lpep_pickup_datetime] [datetime] NULL,
	[lpep_dropoff_datetime] [datetime] NULL,
	[store_and_fwd_flag] [varchar](1) NULL,
	[RatecodeID] [smallint] NULL,
	[PULocationID] [smallint] NULL,
	[DOLocationID] [smallint] NULL,
	[passenger_count] [smallint] NULL,
	[trip_distance] [real] NULL,
	[fare_amount] [real] NULL,
	[extra] [real] NULL,
	[mta_tax] [real] NULL,
	[tip_amount] [real] NULL,
	[tolls_amount] [real] NULL,
	[ehail_fee] [varchar](max) NULL,
	[improvement_surcharge] [real] NULL,
	[total_amount] [real] NULL,
	[payment_type] [smallint] NULL,
	[trip_type] [smallint] NULL,
	[congestion_surcharge] [real] NULL,
	[PUBoroughID] [int] NULL,
	[DOBoroughID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[taxi_zone_lookup]    Script Date: 12/4/2021 9:11:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[taxi_zone_lookup](
	[LocationID] [smallint] NULL,
	[Borough] [varchar](13) NULL,
	[Zone] [varchar](45) NULL,
	[service_zone] [varchar](11) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[yellow_tripdata]    Script Date: 12/4/2021 9:11:34 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[yellow_tripdata](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[VendorID] [smallint] NULL,
	[tpep_pickup_datetime] [datetime] NULL,
	[tpep_dropoff_datetime] [datetime] NULL,
	[passenger_count] [smallint] NULL,
	[trip_distance] [real] NULL,
	[RatecodeID] [smallint] NULL,
	[store_and_fwd_flag] [varchar](1) NULL,
	[PULocationID] [smallint] NULL,
	[DOLocationID] [smallint] NULL,
	[payment_type] [smallint] NULL,
	[fare_amount] [real] NULL,
	[extra] [real] NULL,
	[mta_tax] [real] NULL,
	[tip_amount] [real] NULL,
	[tolls_amount] [real] NULL,
	[improvement_surcharge] [real] NULL,
	[total_amount] [real] NULL,
	[congestion_surcharge] [real] NULL,
	[PUBoroughID] [int] NULL,
	[DOBoroughID] [int] NULL
) ON [PRIMARY]
GO

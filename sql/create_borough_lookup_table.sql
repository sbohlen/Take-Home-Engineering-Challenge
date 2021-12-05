USE [takehomechallenge]
GO
/****** Object:  Table [dbo].[borough_lookup]    Script Date: 12/5/2021 10:19:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[borough_lookup](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Borough] [nchar](255) NULL
) ON [PRIMARY]
GO

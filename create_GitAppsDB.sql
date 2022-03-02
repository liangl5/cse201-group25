/*
	The GitApps database is created at line 25 (Dropped if exists above)
	Tables are created starting at line 31: (Admins, Accounts, Stocks, MarketData, Picks, Nuggets, YrData).
	
	Stored procedure: spGetYrData is created at line 114, uses a function to calculate 52 week high, low and range for each stock 
	Stored procedure: spFindStock is created at line 275, finds the stockID number for a given ticker
	A view is created for YrData called vwYrData at line 241.
	The trigger Tr_NewData is created on line 293, which runs spGetYrData any time new data is inserted into MarketData
	Data for MarketData is inserted starting at line 305, so that it is after the trigger is created.
	Indexes are created starting at line 6626, below all the inserts.

*/


USE master
GO

----------------------------------------------------------- Creating Tables


/****** Object:  Database StoryTrading     ******/
IF DB_ID('GitApps') IS NOT NULL
	DROP DATABASE GitApps
GO  -- run the commented out part if you want to run this sql page again

CREATE DATABASE GitApps
GO 

USE GitApps
GO 

/****** Object:  Table Admins  ******/   
CREATE TABLE Admins(
	AdminID 		int 	IDENTITY(1,1) 	PRIMARY KEY		NOT NULL,
	AdminName 		nvarchar(30) 		NOT NULL,
	AdminPassword 	nvarchar(30) 		NOT NULL,
	Token		 	nvarchar(30) 		NOT NULL
)
GO

/****** Object:  Table Moderators  ******/   
CREATE TABLE Moderators(
	ModeratorID 		int 	IDENTITY(1,1) 	PRIMARY KEY		NOT NULL,
	ModeratorName 		nvarchar(30) 		NOT NULL,
	ModeratorPassword 	nvarchar(30) 		NOT NULL,
	Token		 		nvarchar(30) 		NOT NULL
)
GO

/****** Object:  Table Accounts  ******/   
CREATE TABLE Accounts(
	AccountID 		int 	IDENTITY(1,1)	PRIMARY KEY 	NOT NULL,
	UserName 		nvarchar(30) 		NOT NULL,
	UserPassword 	nvarchar(30) 		NOT NULL,
	DateCreated 	DATE 				NOT NULL,
	UserBio 		nVARCHAR(255) 		NULL
)
GO



/****** Object:  Table Apps  ******/   
CREATE TABLE Apps(
	AppID 				int 	IDENTITY(1,1)	PRIMARY KEY 	NOT NULL,
	AppName 			nvarchar(10) 			NOT NULL,
	CompanyName 		nVARCHAR(60) 		NOT NULL,
	Category 			nvarchar(30) 		NULL,
	AppDescription 		nVARCHAR(255) 		NULL
)
GO

/****** Object:  Table Comments  ******/   
CREATE TABLE Comments(
	CommentID	 			int 	IDENTITY(1,1)	PRIMARY KEY 	NOT NULL,
	AccountID			INT					NOT NULL			REFERENCES Accounts(AccountID),
	AppID				INT					NOT NULL			REFERENCES Apps(AppID),
	CommentDate		 	DATE 				NOT NULL,
	LikeCount			INT					NULL,
	DislikeCount		INT					NULL,
	--PickPoll			INT					NULL,
	Details 			nVARCHAR(255) 		NULL
	--EndDate			 	DATE 				NULL
)
GO





------------------------------------------------ Create a stored procedure
Create Procedure spGetYrData
--Alter  Procedure spGetYrData
AS


--Delete old data
DELETE   FROM [StoryTrading].[dbo].[YrData]
FROM [StoryTrading].[dbo].[YrData] t



-- save 52week metrics into YrData table
exec spGetYrData
GO


--------------------------------------------------- Inserting to Tables

SET IDENTITY_INSERT Admins ON
	INSERT INTO Admins(AdminID, AdminName, AdminPassword, Token) VALUES 
		(1, 'Ben Rabizideh', 'Admin1', 'SampleToken1'),
		(2, 'Rob Mock', 'Admin2', 'SampleToken2'),
		(3, 'Stephen Zigmond', 'Admin3', 'SampleToken3')
SET IDENTITY_INSERT Admins OFF
GO

SET IDENTITY_INSERT Accounts ON
	INSERT INTO Accounts(AccountID, UserName, UserPassword, DateCreated, UserBio) VALUES
		(1, 'Sal_Vulcano', 'impracticalJ0k3rs', '5-4-2021', 'Sal forgot to buy the dip, making him tonights biggest loser'),
		(2, 'Elon_Musk', 'DogeToTheMoon', '5-4-2021', 'CEO and technoking of Tesla'),
		(3, 'RoaringKitty', 'BoughtTheDip', '5-4-2021', 'I like the stock'),
		(4, 'Peter_Schiff', 'buyMYgold$', '5-4-2021', 'Predicted 15 of the last 5 recessions'),
		(5, 'JimCramerOfficial', 'Password', '5-4-2021', 'Host of Mad Money and anchor on CNBC'),
		(6, 'WarrenBuffet', 'Password', '5-4-2021', 'Boomer who does not even use email, has no idea how idea how this account exists'),
		(7, 'Chamath', 'SPCEtoSpace', '5-4-2021', 'Founder of Social Capital and early executive at Facebook')
SET IDENTITY_INSERT Accounts OFF
GO

SET IDENTITY_INSERT Stocks ON
	INSERT INTO Stocks(StockID, Ticker, CompanyName, Sector, StockDescription) VALUES
		(1, 'TSLA', 'Tesla Inc', 'Electric Vehicles', 'Maker of luxury electric vehicles'),
		(2, 'AAPL', 'Apple Inc', 'Technology', 'Business consists of tech products and services'),
		(3, 'NKLA', 'Nikola Corporation', 'Electric Vehicles', 'They rolled a truck down a hill'),
		(4, 'VTSI', 'VirTra Inc', 'Security', 'Makes police training simulators'),
		(5, 'INVE', 'Identiv Inc', 'Security', 'Personal security devices and locks'),
		(6, 'UBER', 'Uber Technologies', 'Technology', 'Peer-to-peer ridesharing and food delivery platform')
SET IDENTITY_INSERT Stocks OFF
GO

SET IDENTITY_INSERT Nuggets ON
	INSERT INTO Nuggets(NuggetID, AccountID, StockID, NuggetDate, DateWhenPosted, Ticker, NuggetDescription) VALUES
		(1, 2, 1, '1-4-2021', '5-4-2021', 'TSLA', 'I announced that Tesla had bought $1.5 billion in Bitcoin'),
		(2, 5, 2, '4-28-2021', '5-4-2021', 'AAPL', 'Apple reported very strong earnings, showing its growth potential'),
		(3, 4, 3, '9-9-2020', '5-4-2021', 'NKLA', 'Hindenburg research posted their findings that Nikola is a FRAUD!')
SET IDENTITY_INSERT Nuggets OFF
GO

-- Ongoing picks, no current end dates
SET IDENTITY_INSERT Picks ON
	INSERT INTO Picks(PickID, AccountID, StockID, PickDate, PillarScore, PickPoll) VALUES
		(1, 1, 2, '3-14-2020', 19, 29),
		(2, 4, 2, '4-29-2020', 18, 23),
		(3, 5, 3, '7-20-2020', 15, 13),
		(4, 7, 1, '2-3-2020', 14, 36)
SET IDENTITY_INSERT Picks OFF
GO

/*  -- Sample values for MarketData, decided to use a seperate file with thousands of values instead
--SET IDENTITY_INSERT MarketData ON
	INSERT INTO MarketData(IDDate, StockID, MarketDate, PxOpen, PxHigh, PxLow, PxClose, TradingVolume) VALUES
		('1-5-3-2021' , 1, '5-3-2021',   703.79, 706.00, 680.50, 684.9, 26989200),
		('1-4-30-2021', 1, '4-30-2021',  667.59, 715.47, 666.14, 709.44, 40686400),
		('1-4-29-2021', 1, '4-29-2021',  699.51, 702.25, 668.50, 667.00, 28845400)
--SET IDENTITY_INSERT MarketData OFF */

--SELECT * FROM MarketData

/*
SET IDENTITY_INSERT MarketData ON
	BULK INSERT MarketData
	FROM 'C:\temp\customers.txt'
     WITH (
          FIRSTROW = 2,
          FIELDTERMINATOR = ',',
          ROWTERMINATOR = '\n',
          --TABLOCK
     )
SET IDENTITY_INSERT MarketData OFF
GO */





CREATE VIEW vwYrData (StockID, IDDate, MarketDate, Pxclose, MaxPrice, MinPrice, dd_52_wk, range_52wk)
--ALTER VIEW vwYrData (StockID, IDDate, MarketDate, Pxclose, MaxPrice, MinPrice, dd_52_wk, range_52wk)
AS 

  SELECT c.StockID
      ,c.IDDate
      ,c.MarketDate
	,c.pxclose
	,x.MaxPrice ,x.MinPrice
	,CAST((1-(c.pxclose / x.Maxprice ))*100 AS Decimal (5,2)) AS 'dd_52wk'
	,CAST((c.pxclose - x.MinPrice) / (x.MaxPrice - x.MinPrice)*100 AS DECIMAL(5,2)) AS 'range_52wk'

FROM MarketData c

outer apply
(
    SELECT MaxPrice = max(pxclose)
	      ,MinPrice = min(pxclose)
    FROM MarketData c2
    WHERE c2.[MarketDate] <= c.[MarketDate]
        AND c2.[MarketDate] >= dateadd(day, -255, c.[MarketDate])
		AND c.StockID = c2.StockID
        
) x
WHERE c.pxclose IS NOT NULL
AND x.MaxPrice IS NOT NULL
AND x.MinPrice IS NOT NULL
AND c.pxclose > 0
AND x.MinPrice > 0 
AND x.MaxPrice > x.MinPrice
GO



CREATE PROCEDURE spFindStock @ticker NVARCHAR(6) 
--ALTER PROCEDURE spFindStock @ticker NVARCHAR(6) 
AS 
	--Ticker's Min and Max Dates and StockID
	DECLARE @DIFF INT
	SELECT s.Ticker, m.StockID AS Stock, Count(*) AS 'Days', MIN([MarketDate]) AS MIN, MAX ([MarketDate]) AS MAX
	FROM MarketData m
	JOIN Stocks s ON m.StockID = s.StockID
	WHERE s.Ticker = @ticker
	GROUP BY s.StockID, m.StockID, s.Ticker
	ORDER BY 4 DESC, 1 ASC

EXEC spFindStock @ticker = 'UBER'
GO

----------------------------------------------------------- Creating Triggers


CREATE TRIGGER Tr_NewData ON MarketData
AFTER INSERT
AS
BEGIN
  -- updates YrData table
     exec spGetYrData
END
GO

----------------------------------------------------------------------------



----------------------------------------------------------- Creating Indexes

/****** Object:  Index IX_Accounts_UserName  ******/
CREATE NONCLUSTERED INDEX IX_Admins_AdminName ON Admins(
	AdminName ASC
) 
GO

/****** Object:  Index IX_Accounts_UserName  ******/
CREATE NONCLUSTERED INDEX IX_Accounts_UserName ON Accounts(
	UserName ASC
) 
GO

/****** Object:  IX_Accounts_DateCreated  ******/
CREATE NONCLUSTERED INDEX IX_Accounts_DateCreated ON Accounts(
	DateCreated ASC
) 
GO

/****** Object:  IX_Picks_AccountID  ******/
CREATE NONCLUSTERED INDEX IX_Picks_AccountID ON Picks(
	AccountID ASC
) 
GO

/****** Object:  IX_Picks_StockID  ******/
CREATE NONCLUSTERED INDEX IX_Picks_StockID ON Picks(
	StockID ASC
) 
GO

/****** Object:  IX_Nuggets_AccountID  ******/
CREATE NONCLUSTERED INDEX IX_Nuggets_AccountID ON Nuggets(
	AccountID ASC
) 
GO

/****** Object:  IX_Nuggets_StockID  ******/
CREATE NONCLUSTERED INDEX IX_Nuggets_StockID ON Nuggets(
	StockID ASC
) 
GO

/****** Object:  IX_Stocks_Ticker  ******/
CREATE NONCLUSTERED INDEX IX_Stocks_Ticker ON Stocks(
	Ticker ASC
) 
GO

/****** Object:  IX_MarketData_StockID  ******/
CREATE NONCLUSTERED INDEX IX_MarketData_StockID ON MarketData(
	StockID ASC
) 
GO




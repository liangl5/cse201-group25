/*
	The GitApps database is created at line 20 (Dropped if exists above)
	Tables are created starting at line 27: (Admins, Moderators, Accounts, Apps, Comments).
	Dummy data is inserted starting at line 99

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
	Details 			nVARCHAR(255) 		NULL
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
		(1, 'Hane Kaiser', 'Admin1', 'SampleToken1'),
		(2, 'Luke Liang', 'Admin2', 'SampleToken2'),
		(3, 'Stephen Zigmond', 'Admin3', 'SampleToken3'),
		(4, 'Cole Winkart', 'Admin4', 'SampleToken4')
SET IDENTITY_INSERT Admins OFF
GO

SET IDENTITY_INSERT Moderators ON
	INSERT INTO Moderators(ModeratorID, ModeratorName, ModeratorPassword, Token) VALUES 
		(1, 'Discord Mod', 'Admin1', 'SampleToken1'),
		(2, 'Reddit Mod', 'Admin2', 'SampleToken2'),
		(3, 'Normal Person', 'Admin3', 'SampleToken3'),
		(4, 'Gregory Bahamas', 'Admin4', 'SampleToken4')
SET IDENTITY_INSERT Moderators OFF
GO

SET IDENTITY_INSERT Accounts ON
	INSERT INTO Accounts(AccountID, UserName, UserPassword, DateCreated, UserBio) VALUES
		(1, 'Sal_Vulcano', 'impracticalJ0k3rs', '3-2-2022', 'Sal forgot to delete his comment, making him tonights biggest loser'),
		(2, 'Elon_Musk', 'Gamer', '3-2-2022', 'CEO of Tesla and SpaceX'),
		(3, 'John Wick', 'iWantMyDog', '3-2-2022', 'I just want to make things even'),
		(4, 'Will Smith', 'iAmLegend', '3-2-2022', 'From West Philadelphia, born and raised')
SET IDENTITY_INSERT Accounts OFF
GO

SET IDENTITY_INSERT Apps ON
	INSERT INTO Apps(AppID, AppName, CompanyName, Category, AppDescription) VALUES
		(1, 'Uber', 'Uber Technologies', 'Travel', 'Peer-to-peer ridesharing and food delivery platform'),
		(2, 'Trivago', 'Trivago Inc', 'Travel', 'Hotel: Trivago'),
		(3, 'Raid Shadow Legends', 'Gamers International', 'Games', 'Bet you never saw one of our ads'),
		(4, 'Minecraft', 'Mojang', 'Games', 'The best mining game')
SET IDENTITY_INSERT Apps OFF
GO

SET IDENTITY_INSERT Comments ON
	INSERT INTO Comments(CommentID, AccountID, AppID, CommentDate, LikeCount, DislikeCount, Details) VALUES
		(1, 2, 1, '3-2-2022', 20, 3, 'I almost got kidnapped while using this app, kinda sketch'),
		(2, 1, 2, '3-2-2022', 4, 18, 'Trivago has quick service'),
		(3, 4, 3, '3-2-2022', 200, 0, 'Good app'),
		(3, 1, 4, '3-2-2022', 30, 2, '10/10, would recommend again')
SET IDENTITY_INSERT Comments OFF
GO


----------------------------------------------------------------------------



----------------------------------------------------------- Creating Indexes

/****** Object:  Index IX_Accounts_UserName  ******/
CREATE NONCLUSTERED INDEX IX_Admins_AdminName ON Admins(
	AdminName ASC
) 
GO

/****** Object:  Index IX_Accounts_UserName  ******/
CREATE NONCLUSTERED INDEX IX_Moderators_ModName ON Moderators(
	ModeratorName ASC
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
CREATE NONCLUSTERED INDEX IX_Comments_AccountID ON Comments(
	AccountID ASC
) 
GO

/****** Object:  IX_Picks_StockID  ******/
CREATE NONCLUSTERED INDEX IX_Comments_AppID ON Comments(
	AppID ASC
) 
GO


/****** Object:  IX_Stocks_Ticker  ******/
CREATE NONCLUSTERED INDEX IX_Apps_Names ON Apps(
	AppName ASC
) 
GO



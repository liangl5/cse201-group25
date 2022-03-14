/*
	The GitApps database is created at line 20 (Dropped if exists above)
	Tables are created starting at line 27: (Admins, Moderators, Accounts, Apps, Comments).
	Dummy data is inserted starting at line 99

*/


----------------------------------------------------------- Creating Tables
DROP TABLE IF EXISTS Admins;
DROP TABLE IF EXISTS Moderators;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Apps;
DROP TABLE IF EXISTS Comments;

/****** Object:  Table Admins  ******/   
CREATE TABLE Admins(
	AdminID 		int 	IDENTITY(1,1) 	PRIMARY KEY		NOT NULL,
	AdminName 		nvarchar(30) 		NOT NULL,
	AdminPassword 	nvarchar(30) 		NOT NULL,
	Token		 	nvarchar(30) 		NOT NULL
);

/****** Object:  Table Moderators  ******/   
CREATE TABLE Moderators(
	ModeratorID 		int 	IDENTITY(1,1) 	PRIMARY KEY		NOT NULL,
	ModeratorName 		nvarchar(30) 		NOT NULL,
	ModeratorPassword 	nvarchar(30) 		NOT NULL,
	Token		 		nvarchar(30) 		NOT NULL
);

/****** Object:  Table Accounts  ******/   
CREATE TABLE Accounts(
	AccountID 		int 	IDENTITY(1,1)	PRIMARY KEY 	NOT NULL,
	UserName 		nvarchar(30) 		NOT NULL,
	UserPassword 	nvarchar(30) 		NOT NULL,
	DateCreated 	DATE 				NOT NULL,
	UserBio 		nVARCHAR(255) 		NULL
);



/****** Object:  Table Apps  ******/   
CREATE TABLE Apps(
	AppID 				int 	IDENTITY(1,1)	PRIMARY KEY 	NOT NULL,
	AppName 			nvarchar(10) 			NOT NULL,
	CompanyName 		nVARCHAR(60) 		NOT NULL,
	Category 			nvarchar(30) 		NULL,
	AppDescription 		nVARCHAR(255) 		NULL
);

/****** Object:  Table Comments  ******/   
CREATE TABLE Comments(
	CommentID	 			int 	IDENTITY(1,1)	PRIMARY KEY 	NOT NULL,
	AccountID			INT					NOT NULL			REFERENCES Accounts(AccountID),
	AppID				INT					NOT NULL			REFERENCES Apps(AppID),
	CommentDate		 	DATE 				NOT NULL,
	LikeCount			INT					NULL,
	DislikeCount		INT					NULL,
	Details 			nVARCHAR(255) 		NULL
);


--------------------------------------------------- Inserting to Tables
INSERT INTO Admins(AdminID, AdminName, AdminPassword, Token) VALUES 
	(1, 'Hane Kaiser', 'Admin1', 'SampleToken1'),
   	(2, 'Luke Liang', 'Admin2', 'SampleToken2'),
   	(3, 'Stephen Zigmond', 'Admin3', 'SampleToken3'),
   	(4, 'Cole Winkart', 'Admin4', 'SampleToken4');

INSERT INTO Moderators(ModeratorID, ModeratorName, ModeratorPassword, Token) VALUES 
	(1, 'Discord Mod', 'Admin1', 'SampleToken1'),
	(2, 'Reddit Mod', 'Admin2', 'SampleToken2'),
	(3, 'Normal Person', 'Admin3', 'SampleToken3'),
	(4, 'Gregory Bahamas', 'Admin4', 'SampleToken4');

INSERT INTO Accounts(AccountID, UserName, UserPassword, DateCreated, UserBio) VALUES
	(1, 'Sal_Vulcano', 'impracticalJ0k3rs', '3-2-2022', 'Sal forgot to delete his comment, making him tonights biggest loser'),
	(2, 'Elon_Musk', 'Gamer', '3-2-2022', 'CEO of Tesla and SpaceX'),
	(3, 'John Wick', 'iWantMyDog', '3-2-2022', 'I just want to make things even'),
	(4, 'Will Smith', 'iAmLegend', '3-2-2022', 'From West Philadelphia, born and raised');

INSERT INTO Apps(AppID, AppName, CompanyName, Category, AppDescription) VALUES
	(1, 'Uber', 'Uber Technologies', 'Travel', 'Peer-to-peer ridesharing and food delivery platform'),
	(2, 'Trivago', 'Trivago Inc', 'Travel', 'Hotel: Trivago'),
	(3, 'Raid Shadow Legends', 'Gamers International', 'Games', 'Bet you never saw one of our ads'),
	(4, 'Minecraft', 'Mojang', 'Games', 'The best mining game');

INSERT INTO Comments(CommentID, AccountID, AppID, CommentDate, LikeCount, DislikeCount, Details) VALUES
	(1, 2, 1, '3-2-2022', 20, 3, 'I almost got kidnapped while using this app, kinda sketch'),
	(2, 1, 2, '3-2-2022', 4, 18, 'Trivago has quick service'),
	(3, 4, 3, '3-2-2022', 200, 0, 'Good app'),
	(4, 1, 4, '3-2-2022', 30, 2, '10/10, would recommend again');


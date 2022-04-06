DROP DATABASE IF EXISTS GitApps;
CREATE DATABASE GitApps;

USE GitApps;

/*DROP TABLE IF EXISTS Admins;*/
DROP TABLE IF EXISTS Moderators;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Apps;
DROP TABLE IF EXISTS Comments;


/****** Object:  Table Admins  ******/   
/*CREATE TABLE Admins(
	AdminID 		int  PRIMARY KEY   NOT NULL,
	AdminName 		nvarchar(30) 		NOT NULL,
	AdminPassword 	nvarchar(30) 		NOT NULL,
	Token		 	nvarchar(30) 		NOT NULL
);*/

/****** Object:  Table Moderators  ******/   
/*
CREATE TABLE Moderators(
	ModeratorID 		int	PRIMARY KEY		NOT NULL AUTO_INCREMENT,
	ModeratorName 		nvarchar(30) 		NOT NULL,
	ModeratorPassword 	nvarchar(30) 		NOT NULL,
	Token		 		nvarchar(30) 		NOT NULL
); */


/*   Maybe want to play around with Admins and Moderators to re-incorporate the two tables, currently only accounts for simplicity */
/****** Object:  Table Accounts  ******/   
CREATE TABLE Accounts(
	AccountID 		int 	PRIMARY KEY 	NOT NULL AUTO_INCREMENT,
	UserName 		nvarchar(30) 		NOT NULL,
	UserEmail		nvarchar(30)		NOT NULL,
	UserPassword 	nvarchar(512) 		NOT NULL,
	DateCreated 	DATE 				NOT NULL,
	UserBio 		nVARCHAR(255) 		NULL,
	isAdmin			BOOLEAN 			DEFAULT false,
	isModerator 	BOOLEAN				DEFAULT false
);



/****** Object:  Table Apps  ******/   
CREATE TABLE Apps(
	AppID 				int 	PRIMARY KEY 	NOT NULL AUTO_INCREMENT,
	AppName 			nvarchar(30) 			NOT NULL,
	CompanyName 		nVARCHAR(60) 		NOT NULL,
	Category 			nvarchar(30) 		NULL,
	AppDescription 		nVARCHAR(255) 		NULL
);

/****** Object:  Table Comments  ******/   
CREATE TABLE Comments(
	CommentID	 			int 	PRIMARY KEY 	NOT NULL AUTO_INCREMENT,
	AccountID			INT					NOT NULL			REFERENCES Accounts(AccountID),
	AppID				INT					NOT NULL			REFERENCES Apps(AppID),
	CommentDate		 	DATE 				NOT NULL,
	LikeCount			INT					NULL,
	DislikeCount		INT					NULL,
	Details 			nVARCHAR(255) 		NULL
);

/*
INSERT INTO Admins(AdminID, AdminName, AdminPassword, Token) VALUES 
	(1, 'Hane Kaiser', 'Admin1', 'SampleToken1'),
   	(2, 'Luke Liang', 'Admin2', 'SampleToken2'),
   	(3, 'Stephen Zigmond', 'Admin3', 'SampleToken3'),
   	(4, 'Cole Winkart', 'Admin4', 'SampleToken4');*/
 
INSERT INTO Accounts(UserName, UserEmail, UserPassword, DateCreated, UserBio) VALUES
	('Sal_Vulcano', "sal@gmail.com", 	SHA2('impracticalJ0k3rs', 512), 	'2022-3-2', 'Sal forgot to delete his comment, making him tonights biggest loser'),
	('Elon_Musk', "elongate@gmail.com", 	SHA2('Gamer', 512), 				'2022-3-2', 'CEO of Tesla and SpaceX'),
	('John_Wick', "wickydog@gmail.com", 	SHA2('iWantMyDog', 512), 			'2022-3-2', 'I just want to make things even'),
	('Will_Smith', "gijane@yahoo.com", 	SHA2('iAmLegend', 512), 			'2022-3-2', 'From West Philadelphia, born and raised');

INSERT INTO Accounts(UserName, UserEmail, UserPassword, DateCreated, UserBio, isAdmin) VALUES
	('kaiser', 'kaiserht@miamioh.edu', 	SHA2('admin', 512), '2022-1-3', "Temp", true),
   	('liang', 'liangl5@miamioh.edu', 	SHA2('admin', 512), '2022-1-3', "Temp", true),
   	('zigmond', 'zigmonsg@miamioh.ed', 	SHA2('admin', 512), '2022-1-3', "Temp", true),
   	('winkhart', 'winkhaca@miamioh.edu', SHA2('admin', 512), '2022-1-3', "Temp", true);

INSERT INTO Accounts(UserName, UserEmail, UserPassword, DateCreated, UserBio, isModerator) VALUES
	('greg', 'greg@miamioh.edu', 	SHA2('mod', 512), '2022-2-5', "Temp", true),
   	('ted', 'ted@miamioh.edu', 		SHA2('mod', 512), '2022-2-5', "Temp", true),
   	('fred', 'fred@miamioh.ed', 	SHA2('mod', 512), '2022-2-5', "Temp", true),
   	('jeb', 'jeb@miamioh.edu', 		SHA2('mod', 512), '2022-2-5', "Temp", true);

INSERT INTO Apps(AppName, CompanyName, Category, AppDescription) VALUES
	('Uber', 'Uber Technologies', 'Travel', 'Peer-to-peer ridesharing and food delivery platform'),
	('Trivago', 'Trivago Inc', 'Travel', 'Hotel: Trivago'),
	('Raid Shadow Legends', 'Gamers International', 'Games', 'Bet you never saw one of our ads'),
	('Minecraft', 'Mojang', 'Games', 'The best mining game');

INSERT INTO Comments(AccountID, AppID, CommentDate, LikeCount, DislikeCount, Details) VALUES
	(2, 1, '2022-3-2', 20, 3, 'I almost got kidnapped while using this app, kinda sketch'),
	(1, 2, '2022-3-2', 4, 18, 'Trivago has quick service'),
	(4, 3, '2022-3-2', 200, 0, 'Good app'),
	(1, 4, '2022-3-2', 30, 2, '10/10, would recommend again');

/*UPDATE Accounts SET UserPassword = SHA2(UserPassword)*/
# Group 25
Overall Documentation (Restricted Access)
https://docs.google.com/document/d/1MGYXpsvGxI9g_1bSOe9LQZuhvUkG2LuvX6B0Sh2f-5Y/edit?usp=sharing

Technical Document (Public)
https://docs.google.com/document/d/15rOYIVEzDALziPNeEGgh890LhyOyoE7Aqu9RoEerz6U/edit?usp=sharing

Installation Instructions (Public)
https://docs.google.com/document/d/1_LciKn3coQOPdeYMs_GHF_Wnphq2L6QRZFNRs8l2Esw/edit?usp=sharing

# The Team:
   - Hane Kaiser
   - Luke Liang
   - Cole Winkhart
   - Steve Zigmond

# Database
   GitApps database was made in Microsoft SQL and contains tables for Admins, Moderators, Accounts, Apps, and Comments.
   Each of the tables contain unique identifiers (i.e. ModeratorID, AppID, CommentID, etc) so that we can easily keep track of information stored in the tables.
   The Admins, Moderators, and Accounts tables contain a name/username and passwords as fields so that admins, moderators, and normal users can login.
   The Comments table references AppID (the specific app being commented about) and AccountID (which account/user is posting the comment) for organization.

# Webpage
   Webpage was created using HTML, CSS, and JS. The webpage provides a graphical interface for the user to navigate through GitApps.    The webpage allows the user to login/create an account, search through the app library, filter the apps shown, and provide comments and ratings for the apps.

# Server
   The server is created using NodeJS and sends the HTML files to the client so they are viewable but keeps the database server-sided so there are no security breaches. The client only ever sees the files shown in the "public" folder.

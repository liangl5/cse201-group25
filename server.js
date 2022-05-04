// Author : Luke Liang
// End Date : 5/3/2022

// Purpose : Creates a server in NodeJS that supports POST and GET requests from the client to connect to the retive information or edit the database.


// LIBRARY USAGE - can be found using CTRL + F

// NodeJS - the entire file needs to be run with the command line node server.js

// mysql - everytime a connection to the database is used
// locations - lines 53, 88, 120, 158, 183, etc.

// path - used to connect two strings together with a path operand, definitely not needed (as got kind of ignored)
// locations - line 39

// express - used to host the server with a server name and port number
// locations - lines 38, 41, 

// multer - used to download images onto the server uploaded from the client
// locations - lines 336, 345

// body-parser - used by the server to handle information to it by the post request
// locations - lines 150, 151

// fs - used to handle file systems by the server (i.e. downloading images and removing them)
// locations - lines 257, 383



// import statments
var mysql = require('mysql');
var path = require('path');
var express = require('express');
var multer = require('multer');
const fs = require('fs');

var app = express();
var htmlPath = path.join(__dirname, 'public');

app.use(express.static(htmlPath));

// sets up server at host and port
var server = app.listen(8000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
});


// querys the database to get app data
app.get('/loadEverything',function(req,res) {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	  
		con.query("USE GitApps;", ()=>{});
	  
		con.query("SELECT * FROM Apps WHERE Display = 1;", function (err, result, fields) {
			if (err) throw err;

			con.query("SELECT * FROM Comments", function(com_err, com_result, com_fields) {
				if(com_err) throw com_err;

				con.query("SELECT * FROM Apps WHERE Display = 0", function(pending_err, pending_results, pending_fields) {
					if(pending_err) throw pending_err;

					var dataToSendToClient = {'apps': result, 'comments' : com_result, "pendingapps":pending_results};
					// convert whatever we want to send (preferably should be an object) to JSON
					var JSONdata = JSON.stringify(dataToSendToClient);
					console.log(JSONdata);

					res.send(JSONdata);
				});
			});
			
		});
	});		  
});

app.get('/loadApps',function(req,res) {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	  
		con.query("USE GitApps;", ()=>{});
	  
		con.query("SELECT * FROM Apps WHERE Display = 1;", function (err, result, fields) {
			if (err) throw err;


			con.query("SELECT * FROM Apps WHERE Display = 0", function(pending_err, pending_results, pending_fields) {
				if(pending_err) throw pending_err;
				var dataToSendToClient = {'apps': result, "pendingapps":pending_results};
				// convert whatever we want to send (preferably should be an object) to JSON
				var JSONdata = JSON.stringify(dataToSendToClient);

				console.log(JSONdata);
				res.send(JSONdata);
			});

			
		});
	});		  
});

app.get('/loadComments',function(req,res) {
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	  
		con.query("USE GitApps;", ()=>{});

		con.query("SELECT * FROM Comments", function(com_err, com_result, com_fields) {
			if(com_err) throw com_err;

			var dataToSendToClient = {'comments' : com_result};
			// convert whatever we want to send (preferably should be an object) to JSON
			var JSONdata = JSON.stringify(dataToSendToClient);
			console.log(JSONdata);

			res.send(JSONdata);
		});

	});		  
});



var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/login', function (req, res) {
	var email = req.body.email
	var password = req.body.password
	console.log(email, password)

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});

	con.connect(function(err) {
		if (err) throw err;
	  
		con.query("USE GitApps;", ()=>{});
	  
		con.query("SELECT UserName, isAdmin, isModerator FROM Accounts WHERE UserEmail = '"+email+"' && UserPassword = SHA2('" + password + "', 512);", function (err, result, fields) {
			if (err) throw err;
			console.log(result)
			res.send(JSON.stringify(result))
		});
	});	
})


app.post('/addComment', function(req, res) {
	var appID = req.body.appID
	var username = req.body.userName
	var text = req.body.comment

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});


	con.connect(function(err) {
		if (err) throw err;
	  
		con.query("USE GitApps;", ()=>{});
	  

			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			today = yyyy+'-'+mm+'-'+dd;

			con.query("INSERT INTO Comments(UserName, AppID, CommentDate, Details) VALUES ('" + username + "', " + appID + ", '" + today + "', '" + text + "');", (err, results)=>{
				if (err) throw err;
				res.send(JSON.stringify({"error": 0, "message": "Comment Added"}));
			});

	});	
});


app.post('/removeComment', function(req, res) {
	var AppID = req.body.AppID
	var CommentID = req.body.CommentID

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});


	con.connect(function(err) {
		if (err) throw err;
	  
		con.query("USE GitApps;", ()=>{});

			con.query("DELETE FROM Comments WHERE AppID='" + AppID + "' AND CommentID='" + CommentID + "';", (err, results)=>{
				if (err) throw err;
				res.send(JSON.stringify({"error": 0, "message": "Comment Removed"}));
			});

	});	
});


app.post('/rejectApp', function(req, res) {
	var AppID = req.body.AppID

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});

	con.connect(function(err) {
		if (err) throw err;
		con.query("USE GitApps;", ()=>{});

			con.query("SELECT AppName FROM Apps WHERE AppID='" + AppID + "';", (err1, results1)=>{
				if (err1) throw err1;
				var appName = results1[0]["AppName"].toLowerCase().replace(/ /g,"_");


				con.query("DELETE FROM Apps WHERE AppID='" + AppID + "';", (err, results)=>{
					if (err) throw err;

					fs.unlink("./public/imgs/" + appName + ".png", function (err) {
						if (err) throw err;
						// if no error, file has been deleted successfully
						console.log('File deleted!');
					});
					res.send(JSON.stringify({"error": 0, "message": "Deleted App Removed"}));
				});

			});
	});	
});

app.post('/approveApp', function(req, res) {
	var AppID = req.body.AppID

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});

	con.connect(function(err) {
		if (err) throw err;
		con.query("USE GitApps;", ()=>{});

			con.query("UPDATE Apps SET Display=1 WHERE AppID='" + AppID + "';", (err, results)=>{
				if (err) throw err;
				res.send(JSON.stringify({"error": 0, "message": "Accepted App"}));
			});

	});	
});




app.post('/createAccount', function(req, res) {

	var username = req.body.username
	var email = req.body.email
	var password = req.body.password
	console.log(username, email, password)

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});

	con.connect(function(err) {
		if (err) throw err;
	  
		con.query("USE GitApps;", ()=>{});
	  
		// first query to make sure username and email are not already in use
		con.query("SELECT COUNT(*) from Accounts WHERE UserEmail = '"+email+"' || UserName = '" + username + "';", function (err, result, fields) {
			if (err) throw err;
			if (result[0]["COUNT(*)"] > 0) {
				res.send(JSON.stringify({"error": 1, "message": "Username or email already in use"}));
			} else {

				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
				var yyyy = today.getFullYear();
				today = yyyy+'-'+mm+'-'+dd;

				console.log("INSERT INTO Accounts(UserName, UserEmail, UserPassword, DateCreated, UserBio) VALUES ('"+username +"','" + email + "',SHA2('" + password + "', 512),'" + today + "','Bio');")
				con.query("INSERT INTO Accounts(UserName, UserEmail, UserPassword, DateCreated, UserBio) VALUES ('"+username +"','" + email + "',SHA2('" + password + "', 512),'" + today + "','Bio');", ()=>{
					if (err) throw err;
					res.send(JSON.stringify({"error": 0, "message": "Account Created"}));
				});
				
			}
		});
	});	
})


var Storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/imgs");
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}
});

var upload = multer({
	storage: Storage
}).array("imgUploader", 1); //Field name and max count

app.post("/upload", function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			console.log(err);
			return res.end("Something went wrong!");
			
		}
		return res.end(JSON.stringify({"error":0, "message":"File successfully uploaded", "filename":req.files[0].originalname}));
	});
});


app.post('/addApp', function(req, res) {
	// data = {"name": name, "company": company, "category": category, "description": description}
	var name = req.body.name
	var company = req.body.company;
	var category = req.body.category;
	var description = req.body.description;

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "password"
	});


	con.connect(function(err) {
		if (err) throw err;
	  
		con.query("USE GitApps;", ()=>{});
	  
			con.query("INSERT INTO Apps(AppName, CompanyName, Category, AppDescription) VALUES ('" + name + "', '" + company + "', '" + category + "', '" + description + "');", (err, results)=>{
				if (err) throw err;

				fs.rename('./public/imgs/' + req.body.filename, './public/imgs/' + name.toLowerCase().replace(/ /g,"_") + ".png", ()=>{
					console.log("successful image upload");
				});

				//const path = __dirname + '/public/imgs/' + name.toLowerCase().replace(/ /g,"_"); + ".png"
				//Image.mv()
				res.send(JSON.stringify({"error": 0, "message": "App Added"}));
			});

	});	
});
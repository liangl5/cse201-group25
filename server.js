var mysql = require('mysql');
var path = require('path');
var express = require('express');
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

			con.query("SELECT * FROM Comments", function(com_err, com_result, com_fields) {
				if(com_err) throw com_err;

				var dataToSendToClient = {'apps': result, 'comments' : com_result};
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


var formidable = require('formidable');

app.post('/addApp', function(req, res) {
	// data = {"name": name, "company": company, "category": category, "description": description}
	var name = req.body.name
	var company = req.body.company;
	var category = req.body.category;
	var description = req.body.description;
	
	var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      res.write('File uploaded');
      res.end();
    });


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

				//const path = __dirname + '/public/imgs/' + name.toLowerCase().replace(/ /g,"_"); + ".png"
				//Image.mv()
				res.send(JSON.stringify({"error": 0, "message": "App Added"}));
			});

	});	
});
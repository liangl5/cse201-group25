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
	  
		con.query("SELECT * FROM Apps;", function (err, result, fields) {
			if (err) throw err;

			var dataToSendToClient = {'apps': result};
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
	  
		con.query("SELECT AccountID, isAdmin FROM Accounts WHERE UserEmail = '"+email+"' && UserPassword = SHA2('" + password + "', 512);", function (err, result, fields) {
			if (err) throw err;
			console.log(result)
			res.send(JSON.stringify(result))
		});
	});	
})
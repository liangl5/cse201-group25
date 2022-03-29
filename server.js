var mysql = require('mysql');
var path = require('path');
var express = require('express');
var app = express();

var htmlPath = path.join(__dirname, 'public');

app.use(express.static(htmlPath));

var server = app.listen(8000, function () {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://'+host+':'+port+'/');
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


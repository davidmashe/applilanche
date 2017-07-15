const queries = require('../sql/queries.js');

const createController = (app,client) => {

	app.get("/app_records/all",(req,res) => {
		console.log(queries.getAllApplicationRecords);
		var query = client.query(queries.getAllApplicationRecords);
		query.on("row", (row, result) => { 
			result.addRow(row); 
		});
		query.on("end", (result) => { 
			res.send(result.rows); 
		});	
	});

	// end point to support Google OAuth flow
	app.get("/oauthcallback",(req,res) => {
		console.log("req.query:",req.query);

		// get req.query.code

		//do some OAuth shit with code (probably store token)

		// render index.html and start the app!
		res.sendFile("main.html");
	});

	app.get("/test-send-html",(req,res) => {

		res.sendFile("public/test.html",
			{root:"/home/david/applilanche"});
	});

	app.post("/emails",(req,res) => {
		console.log("received request at /emails");
		console.log("body is:",JSON.stringify(req.body));

		res.send("you sent: " + JSON.stringify(req.body));
	});
}

module.exports = createController
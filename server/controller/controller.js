const queries = require('../sql/queries.js');

const createController = (app,client) => {

	console.log("using queries object:");
	console.log(queries);

	const fireQuery = (query,callback) => {
		console.log("firing query");
		var query = client.query(query);
		query.on("row", (row, result) => {
			console.log("got a row",row); 
			result.addRow(row); 
		});
		query.on("end", (result) => { 
			console.log("inside 'end', result:",result);
			callback(result.rows); 
		});	
	}

	app.get("/test",(req,res) => {
		res.send("/test working");
	});

	app.get("/app_records/all",(req,res) => {
		console.log(queries.getAllApplicationRecords);
		//fireQuery(queries.getAllApplicationRecords,res.send);
		var query = client.query(queries.getAllApplicationRecords);
		query.on("row", (row, result) => {
			console.log("got a row",row); 
			result.addRow(row); 
		});
		query.on("end", (result) => { 
			console.log("inside 'end', result:",result);
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
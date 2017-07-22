const queries = require('../sql/queries.js');

const createController = (app,client) => {

	app.get("/app_records/all",(req,res) => {

		var query = client.query(queries.getAllApplicationRecords());
		query.on("row", (row, result) => { 
			result.addRow(row); 
		});
		query.on("end", (result) => { 
			res.send(result.rows); 
		});	
	});

	// end point to support Google OAuth flow

	app.get("/test-send-html",(req,res) => {

		res.sendFile("public/test.html",
			{root:"/home/david/applilanche"});
	});

	app.post("/emails/submit",(req,res) => {
		console.log("received request at /emails");
		console.log("body is:",req.body);
		console.log("body string is:",JSON.stringify(req.body));

		const newDataArray = [];

		const keys = Object.keys(req.body);

		keys.map((key) => {
			var intKey;
			try {
				intKey = parseInt(key);
			} catch (e) {
				return undefined;
			}
			newDataArray[intKey] = JSON.parse(req.body[key]);	
		});

		if (!newDataArray) {
			res.send({status:"error"});
			return;
		}

		const email = newDataArray[0][0];
		const entity = newDataArray[0][1];
		const position = newDataArray[0][2];
		const coverLetter = newDataArray[0][3];
		const note = (newDataArray[0].length > 4) ? newDataArray[0][4] : '';

		console.log(position,email,entity,coverLetter,note);

		try {
			// send email here
			console.log("*** send email goes here ***");
		} catch (e) {
			res.send({errorMessage:e});
			return;	
		}

		const insertQuery = queries.insertApplication(
			position,email,entity,coverLetter,note);

		console.log(insertQuery);

		var query = client.query(insertQuery);
		query.on("row", (row, result) => { 
			result.addRow(row); 
		});
		query.on("end", (result) => { 
			res.send(result.rows); 
		});
	});
}

module.exports = createController
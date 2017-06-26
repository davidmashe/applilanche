const createController = (app,db) => {

	app.get("/test",(req,res) => {
		res.send("/test working");
	});

	app.get("/emails",(req,res) => {
		res.send("breh");
	});

	// end point to support Google OAuth flow
	app.get("oauthcallback",(req,res) => {
		console.log("req.query:",req.query);

		// get req.query.code

		//do some OAuth shit with code (probably store token)

		// render index.html and start the app!
		res.sendFile("main.html");
	});

	app.post("/emails",(req,res) => {
		console.log("received request at /emails");
		console.log("body is:",JSON.stringify(req.body));

		res.send("you sent: " + JSON.stringify(req.body));
	});
}

module.exports = createController
const createController = (app,db) => {

	app.get("/test",(req,res) => {
		res.send("/test working");
	});

	app.get("/emails",(req,res) => {
		res.send("breh");
	});

	app.post("/emails",(req,res) => {
		console.log("received request at /emails");
		console.log("body is:",JSON.stringify(req.body));

		res.send("you sent: " + JSON.stringify(req.body));
	});
}

module.exports = createController
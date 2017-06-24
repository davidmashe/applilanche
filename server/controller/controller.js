const createController = (app,dbConnection) => {

	app.get("/test",(req,res) => {
		res.send("/test working");
	});

	app.get("/emails",(req,res) => {
		res.send("breh");
	});

	app.post("/emails",(req,res) => {
		res.send("you sent: " + JSON.stringify(req.body));
	});
}

module.exports = createController
const createController = (app,dbConnection) => {

	app.get("/test",(req,res) => {
		res.send("/test working");
	});

	app.get("/emails/:data",(req,res) => {
		res.send("you sent: " + JSON.stringify(req.params.data));
	});
}

module.exports = createController
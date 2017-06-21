const createController = (app,dbConnection) => {

	app.get("/test",(req,res) => {
		res.send("/test working");
	});
}

module.exports = createController
var express = require('express');
var app = express();

const PORT = 3000;
const USE_POSTGRES = (process.env.STORE_LOCAL) ? false : true;
const GMAIL_API_KEY = process.env.GMAIL_API_KEY;

const createController = require('./controller/controller.js');

createController(app,null);

app.use(express.static('public'));

app.listen(PORT,() => {
	console.log("Applilanche running on",PORT);
	(GMAIL_API_KEY) 
		? console.log("gmail API key present") 
			: console.log("gmail API key not detected!");
});
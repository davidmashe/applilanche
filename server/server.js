var express = require('express');
var app = express();
const bodyParser = require('body-parser');

const PORT = 3000;
const USE_POSTGRES = (process.env.STORE_LOCAL === 'true') ? false : true;
const GMAIL_API_KEY = process.env.GMAIL_API_KEY;

const db;

if (USE_POSTGRES) {
	// make db connection here
}

const createController = require('./controller/controller.js');

createController(app,db);

app.use(express.static('public'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT,() => {
	console.log("Applilanche running on",PORT);
	(GMAIL_API_KEY) 
		? console.log("gmail API key present") 
			: console.log("gmail API key not detected!");
});
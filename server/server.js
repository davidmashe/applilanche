var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const createController = require('./controller/controller.js');
const { authorize /* ,storeToken, getNewToken */ 
	} = require('./google_oauth/googleOAuth.js');

const PORT = 3000;
const USE_POSTGRES = (process.env.STORE_LOCAL === 'true') ? false : true;
const GMAIL_API_KEY = process.env.GMAIL_API_KEY;

fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  authorize(JSON.parse(content), listLabels);
});

const db;

if (USE_POSTGRES) {
	// make db connection here
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

createController(app,db);

app.listen(PORT,() => {
	console.log("Applilanche running on",PORT);
	(GMAIL_API_KEY) 
		? console.log("gmail API key present") 
			: console.log("gmail API key not detected!");
});
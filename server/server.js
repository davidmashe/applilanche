var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var pg = require("pg");
const conString = require('./sql/connectionString.js');
const client = new pg.Client(conString);
client.connect();

const createController = require('./controller/controller.js');
// const authorize // ,storeToken, getNewToken 
// = require('./google_oauth/googleOAuth.js').authorize;

const PORT = process.env.PORT || 3000;

// fs.readFile('client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Gmail API.
//   authorize(JSON.parse(content), listLabels);
// });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

createController(app,client);

app.listen(PORT,() => {
	console.log("Applilanche running on",PORT);
});
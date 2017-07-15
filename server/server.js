var express = require('express');
var app = express();
const bodyParser = require('body-parser');

var pg = require("pg");
var conString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(conString);
client.connect();

const createController = require('./controller/controller.js');
// const authorize // ,storeToken, getNewToken 
// = require('./google_oauth/googleOAuth.js').authorize;

const PORT = 3000;
const USE_POSTGRES = (process.env.STORE_LOCAL === 'true') ? false : true;
const GMAIL_API_KEY = process.env.GMAIL_API_KEY;

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

// app.get('/breh',(req,res)=>{
//   var query = client.query("select * from application_record;");
//   query.on("row", (row, result) => { result.addRow(row); } );
//   query.on("end", (result) => { res.send(result.rows); } );
// });

app.listen(PORT,() => {
	console.log("Applilanche running on",PORT);
	console.log("db client present:",!!client);
	(GMAIL_API_KEY) 
		? console.log("gmail API key present") 
			: console.log("gmail API key not detected!");
});
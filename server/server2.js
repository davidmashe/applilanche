const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conString = require('./sql/connectionString.js');
const createController = require('./controller/controller.js');
const fs = require('fs');
const path = require("path");
const queries = require('./sql/queries.js');
const env = require('../env.js');
const google = require('googleapis');
const googleAuth = require('google-auth-library');

console.log("USING OAUTH:",USE_OAUTH);
console.log("USING POSTGRES:",USE_POSTGRES);

const pg = require("pg");
var client = new pg.Client(conString);

if (USE_POSTGRES) {
  client.connect();
}

const ROOT_DIR = {root:"/home/david/applilanche"};
const PORT = process.env.PORT || 3000;
const USE_POSTGRES = (env.USE_POSTGRES === "true" || env.USE_POSTGRES === true);
const USE_OAUTH = (env.USE_OAUTH === "true" || env.USE_OAUTH === true);

// BEGIN OAUTH CODE

var authObject = null;

// are these needed?
var file = 'index.html';
var authUrl = '';

const oAuthPackage = require('./oauth/oAuthValues.js');
const SCOPES = oAuthPackage.SCOPES; 
const CLIENT_SECRET_KEY = oAuthPackage.CLIENT_SECRET_KEY;
const CLIENT_SECRET_FILE_NAME = oAuthPackage.CLIENT_SECRET_FILE_NAME;

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/applilanche/.credentials/';
//var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';
var TOKEN_PATH = TOKEN_DIR + 'gmail-auth.json';

if (USE_OAUTH) {

  fs.readFile(CLIENT_SECRET_FILE_NAME, function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      console.log('You will need to have signed up for a GMAIL API key via google:');
      console.log('https://developers.google.com/gmail/api/quickstart/nodejs#step_4_run_the_sample');
      return;
    }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
    authorize(JSON.parse(content), handleGoodAuth);
  }); 
}

// END OAUTH CODE

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: false }));

createController(app,client,USE_POSTGRES,USE_OAUTH);

app.get("/oauthcallback",(req,res) => {

  const code = req.query.code;

  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    oauth2Client.credentials = token;
    storeToken(token);
    res.redirect("/");
  });
});

app.get("/auth_url",function(req,res) {
	const response = {url:authUrl};
	res.send(JSON.stringify(response));
});

app.listen(PORT,() => {
	console.log("Applilanche running on",PORT);
});



// begin function definitions

function authorize(credentials, callback) {
  var clientSecret = credentials[CLIENT_SECRET_KEY].client_secret;
  var clientId = credentials[CLIENT_SECRET_KEY].client_id;
  var redirectUrl = credentials[CLIENT_SECRET_KEY].redirect_uris[0];
  var auth = new googleAuth();
  oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      console.log("token not found, retrieving new token");
      getNewToken(oauth2Client, callback);
    } else if(JSON.parse(token).expiry_date < new Date().getTime()) {
      console.log("token expired, retrieving new token");
      getNewToken(oauth2Client, callback);
    } else {
      console.log("token found, not expired");
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

function getNewToken(oauth2Client, callback) {
  authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Applilanche will seek OAuth permissions when it loads');
}

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

function handleGoodAuth(auth) {
	authObject = auth;
	authURL = '';

  listLabels(auth);
}

function listLabels(auth) {
  var gmail = google.gmail('v1');
  gmail.users.labels.list({
    auth: auth,
    userId: 'me',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var labels = response.labels;
    if (labels.length == 0) {
      console.log('No labels found.');
    } else {
      console.log('Inbox Labels:');
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        console.log('- %s', label.name);
      }
    }
  });
}

// end function definitions
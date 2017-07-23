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
const oAuthUtility = require('./oauth/oAuthUtility.js');
const makeEmail = oAuthUtility.makeEmail;

const pg = require("pg");
var client = new pg.Client(conString);
client.connect();

// if (USE_POSTGRES) {
  
// }

const ROOT_DIR = {root:"/home/david/applilanche"};
const PORT = process.env.PORT || 3000;
const USE_POSTGRES = (env.USE_POSTGRES === "true" || env.USE_POSTGRES === true);
const USE_OAUTH = (env.USE_OAUTH === "true" || env.USE_OAUTH === true);

console.log("USING OAUTH:",USE_OAUTH);
console.log("USING POSTGRES:",USE_POSTGRES);

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
    //res.redirect("/");
    res.sendFile(path.resolve("public/oauth_callback.html"));
  });
});

app.get("/auth_url",function(req,res) {
	const response = {url:authUrl};
	res.send(JSON.stringify(response));
});

app.post("/emails/submit",(req,res) => {

  if (!USE_POSTGRES) {
    const errorMessage = {error:"postgres not connected"};
    res.send(JSON.stringify(errorMessage));
    return;
  }

  const newDataArray = [];

  const keys = Object.keys(req.body);

  keys.map((key) => {
    var intKey;
    try {
      intKey = parseInt(key);
    } catch (e) {
      return undefined;
    }
    newDataArray[intKey] = JSON.parse(req.body[key]); 
  });

  if (!newDataArray) {
    res.send({status:"error"});
    return;
  }

  const email = newDataArray[0][0];
  const entity = newDataArray[0][1];
  const position = newDataArray[0][2];
  const coverLetter = newDataArray[0][3];
  const note = (newDataArray[0].length > 4) ? newDataArray[0][4] : '';

  //console.log(position,email,entity,coverLetter,note);

  var fromEmail = "davidmashe@gmail.com";
  var toEmail = "davidmashe@gmail.com";
  var subject = "from the cloud";
  var message = "CLOOOOOUUUUUUD!";

  var gmail = google.gmail('v1');

  var raw = makeEmail(toEmail,fromEmail,subject,message);

  gmail.users.messages.send({
    auth: authObject,
    userId: 'me',
    resource: {
      raw: raw
    }
  }, function(err, response) {
    if (err) {
      console.log("error in callback:");
      console.log(err);
      res.send(JSON.stringify({error:err}));
    } else {
      console.log("response:");
      console.log(response);

      const insertQuery = queries.insertApplication(
        position,email,entity,coverLetter,note);

      console.log("insert query:",insertQuery);

      var query = client.query(insertQuery);
      query.on("row", (row, result) => { 
        result.addRow(row); 
      });
      query.on("end", (result) => { 
        console.log("result after insert:");
        console.log(result);
        res.send(result.rows); 
      });
    }
  }); // close send email function

});

app.listen(PORT,() => {
	console.log("Applilanche running on",PORT);
});



// -- begin function definitions

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
  authUrl = '';
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

// function sendEmail(auth) {

//   console.log(auth);
//   console.log(JSON.stringify(auth));

//   var fromEmail = "davidmashe@gmail.com";
//   var toEmail = "davidmashe@gmail.com";
//   var subject = "from the cloud";
//   var message = "CLOUD!";

//   var gmail = google.gmail('v1');

//   var raw = makeEmail(toEmail,fromEmail,subject,message);

//   gmail.users.messages.send({
//     auth: auth,
//     userId: 'me',
//     resource: {
//         raw: raw
//     }
//   }, function(err, response) {
//     if (err) {
//       console.log("error in callback:");
//       console.log(err);
//     } else {
//       console.log("response:");
//       console.log(response);
//     }
//   });
   
// }

// --- end function definitions
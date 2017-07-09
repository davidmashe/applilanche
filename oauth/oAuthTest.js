/*
This code is copied almost verbatim from google's guide to OAuth in Node here:

https://developers.google.com/gmail/api/quickstart/nodejs#step_4_run_the_sample

Thanks to google for making OAuth so easy!
*/

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var oauth2Client;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
const oAuthPackage = require('./oAuthValues.js');
const SCOPES = oAuthPackage.SCOPES; 
const CLIENT_SECRET_KEY = oAuthPackage.CLIENT_SECRET_KEY;
const CLIENT_SECRET_FILE_NAME = oAuthPackage.CLIENT_SECRET_FILE_NAME;

const makeEmail = require('./oAuthUtility.js');
const request = require('request');

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + 'applilanche/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile(CLIENT_SECRET_FILE_NAME, function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    console.log('You will need to have signed up for a GMAIL API key via google:');
    console.log('https://developers.google.com/gmail/api/quickstart/nodejs#step_4_run_the_sample');
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  //authorize(JSON.parse(content), listMessages);
  authorize(JSON.parse(content), sendEmail);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials[CLIENT_SECRET_KEY].client_secret;
  var clientId = credentials[CLIENT_SECRET_KEY].client_id;
  var redirectUrl = credentials[CLIENT_SECRET_KEY].redirect_uris[0];
  var auth = new googleAuth();
  oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  // var rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
  // rl.question('Enter the code from that page here: ', function(code) {
  //   rl.close();
  //   oauth2Client.getToken(code, function(err, token) {
  //     if (err) {
  //       console.log('Error while trying to retrieve access token', err);
  //       return;
  //     }
  //     oauth2Client.credentials = token;
  //     storeToken(token);
  //     callback(oauth2Client);
  //   });
  // });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
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

function confirmTokens(auth) {
  console.log("Applilanche is authorized via OAuth to use the Gmail API!");
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
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
      console.log('Labels:');
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        console.log('- %s', label.name);
      }
    }
  });
}

function listMessages(auth) {

  var firstMessage;

  var gmail = google.gmail('v1');

  gmail.users.messages.list({
    auth: auth,
    userId: 'me'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    // console.log("response:");
    // console.log(response);

    var messages = response.messages;
    if (messages.length == 0) {
      console.log('No messages found.');
      return;
    } 

    console.log('messages:');
    var message = messages[0];

    var argObject = {
      auth: auth,
      userId: 'me',
      id: message.id
    };

    gmail.users.messages.get(argObject,function(err,res){
      console.log("message:");
      console.log(res);
    });
  });  
}

function sendEmail(auth) {

  console.log(auth);
  console.log(JSON.stringify(auth));

  var fromEmail = "davidmashe@gmail.com";
  // var toEmail = "davidmashe@gmail.com";
  var toEmail = "dashe@proclivitysystems.com";
  var subject = "from eve";
  var message = "HENLO! (rickroll)";

  var gmail = google.gmail('v1');

  var raw = makeEmail(toEmail,fromEmail,subject,message);

  // gmail.users.messages.send({
  //   auth: auth,
  //   userId: 'me',
  //   resource: {
  //       raw: raw
  //   }
  // }, function(err, response) {
  //   if (err) {
  //     console.log("error in callback:");
  //     console.log(err);
  //   } else {
  //     console.log("response:");
  //     console.log(response);
  //   }
  // });

  const token = auth.credentials.access_token;  

  request({
      method: "POST",
      uri: "https://www.googleapis.com/gmail/v1/users/me/messages/send",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "raw": raw
      })
    },
    function(err, response, body) {
      if(err){
        console.log(err); // Failure
      } else {
        console.log(body); // Success!
      }
    });    
}
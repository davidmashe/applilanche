//const CLIENT_SECRET_KEY = "web"; 
const CLIENT_SECRET_KEY = "installed"; // might need line above

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send'];

// const CLIENT_SECRET_FILE_NAME = 'client_secret.json'; 
const CLIENT_SECRET_FILE_NAME = 'client_id.json';// might need line above

const exportObject = {};
exportObject.SCOPES = SCOPES;
exportObject.CLIENT_SECRET_KEY = CLIENT_SECRET_KEY;
exportObject.CLIENT_SECRET_FILE_NAME = CLIENT_SECRET_FILE_NAME;

module.exports = exportObject
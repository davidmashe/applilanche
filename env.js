// best pactice is to set environment variables
// but as a backup this file can be used to set app-wide variables

var USE_POSTGRES;
var USE_OAUTH;
const MY_EMAIL = "your_email_goes_here@gmail.com"; // you must have a gmail address!
const WEBPAGE_URL = "http://you.github.io";
const RESUME_URL = "http://whereyouhostyourresume.com";

if (process.env.USE_POSTGRES === "true") {
	USE_POSTGRES = true;
} else {
	USE_POSTGRES = false; // modify here
}

if (process.env.USE_OAUTH === "true") {
	USE_OAUTH = true;
} else {
	USE_OAUTH = false; // modify here
}

const env = {
	USE_POSTGRES : USE_POSTGRES,
	USE_OAUTH : USE_OAUTH,
	MY_EMAIL : (process.env.MY_EMAIL)
		? process.env.MY_EMAIL
			: MY_EMAIL,
	WEBPAGE_URL : (process.env.WEBPAGE_URL)
		? process.env.WEBPAGE_URL
			: WEBPAGE_URL,			
	RESUME_URL : (process.env.RESUME_URL)
		? process.env.RESUME_URL
			: RESUME_URL		
}

console.log(env);
//module.exports = env
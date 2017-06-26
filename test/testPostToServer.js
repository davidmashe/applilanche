const request = require('request');

var options = {
    url: 'http://localhost:3000/emails',
    body: "{\"dude\":\"whatever\"}",
    headers : {
    	"Content-type" : "application/x-www-form-urlencoded"
    }
};

var callback = (error,response,body) => {
	console.log(body);
} 

request.get("http://localhost:3000/emails",callback);

request.post(options,callback);
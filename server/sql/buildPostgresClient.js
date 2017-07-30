const USE_POSTGRES = require('../../env.js').USE_POSTGRES;
const conString = require('./connectionString.js');
const pg = require("pg");

var toExport = null;

if (USE_POSTGRES){
	var client = new pg.Client(conString);
	client.connect(); 

	toExport = client;	
} else {
	toExport = {};
}

module.exports = toExport

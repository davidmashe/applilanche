var pg = require("pg");
var conString = "pg://postgres:postgres@localhost:5432/postgres";
var client = new pg.Client(conString);

var queries = {
  getApplicationRecords: "select * from application_record;"
};

client.connect();


const fireQuery = (query,callback) => {
	var query = client.query(query);
	query.on("row", (row, result) => { 
		result.addRow(row); 
	});
	query.on("end", (result) => { 
		callback(result.rows); 
	});	
}

const printResult = (result) => {
	console.log(result);
	//client.disconnect();
	process.exit();
};

fireQuery(queries.getApplicationRecords,printResult);

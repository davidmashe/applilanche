const client = require('./testPostgresModesSupport.js');
const USE_POSTGRES = require('../env.js').USE_POSTGRES;

if (USE_POSTGRES) {
	var query = client.query("select * from temp_record;");
    query.on("row", (row, result) => { 
      result.addRow(row); 
    });
    query.on("end", (result) => { 
      console.log("result after insert:");
      console.log(result.rows);
    });
} else {
	console.log("no postgres!");
}

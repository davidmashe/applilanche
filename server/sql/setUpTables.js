const pg = require('pg');
const fs = require('fs');

const createTablesString = fs.readFileSync('set_up_tables.sql');

console.log(createTablesString); 

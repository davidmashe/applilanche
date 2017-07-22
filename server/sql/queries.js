const queries = {
	getAllApplicationRecords: () => { return "select * from application_record;"},
	getAllDestinationEmails : (input) => {
		return `select * from application_record where email = '${input}';`
	},
	insertApplication : (position,entity,email,coverLetter,note) => {
		return `INSERT INTO application_record VALUES (nextval('ar_seq'),'${position}','${entity}','${email}',now(),'${coverLetter}','${note}');`;
	}
};

module.exports = queries
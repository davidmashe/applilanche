const queries = {
	getAllApplicationRecords: "select * from application_record;",
	getAlljobEntities: "select * from job_entity;",
	getAllPositions: "select * from position;",
	getAllDestinationEmails : (input) => {
		return `select * from application_record where email = ${input};`
	},
	insertApplication : (position,entity,email,coverLetter,note) => {
		return `INSERT INTO application_record VALUES (nextval('ar_seq'),'${position}','${entity}','${email}',now(),'${coverLetter}','${note}');`;
	}
};

module.exports = queries
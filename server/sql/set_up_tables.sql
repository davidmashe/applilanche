DROP TABLE IF EXISTS job_entity;
DROP TABLE IF EXISTS destination_email;
DROP TABLE IF EXISTS position;
DROP TABLE IF EXISTS application_record;

-- company or other entity that might have a 'position'
CREATE TABLE job_entity (
	id int PRIMARY KEY,
	name varchar(200) NOT NULL,
	notes varchar(400)
);

CREATE TABLE destination_email (
	id int PRIMARY KEY,
	email_address varchar(200),
	notes varchar(400)
);

-- keeps track of jobs / opportunities for which an application might be sent
CREATE TABLE position ( 
	id int PRIMARY KEY,
	send_email_id int CONSTRAINT send_email_id_fk REFERENCES "destination_email" ("id"),
	entity_id int CONSTRAINT company_id_fk REFERENCES "job_entity" ("id"),
	notes varchar(500)
);

-- keeps track of past applications
CREATE TABLE application_record ( 
	id int PRIMARY KEY,
	position_id int CONSTRAINT position_fk REFERENCES "position" ("id"),
	date_sent timestamp NOT NULL,
	notes varchar(200)
);
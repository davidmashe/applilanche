DROP TABLE IF EXISTS application_record;
DROP SEQUENCE IF EXISTS ar_seq;

CREATE TABLE application_record ( 
	id int PRIMARY KEY,
	position varchar(200) NOT NULL,
	entity varchar(200) NOT NULL,
	email varchar(200) NOT NULL,
	date_sent timestamp NOT NULL,
	cover_letter varchar(200) NOT NULL,
	notes varchar(200)
);

CREATE SEQUENCE ar_seq;
const USE_POSTGRES = "true";
const USE_OUATH = "true";

// const USE_POSTGRES = false;
// const USE_OUATH = false;

const env = {
	USE_POSTGRES : (process.env.USE_POSTGRES) 
		? process.env.USE_POSTGRES 
			: USE_POSTGRES,
	USE_OAUTH : (process.env.USE_OUATH) 
		? process.env.USE_OUATH 
			: USE_OUATH,
}

module.exports = env
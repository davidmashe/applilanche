const RESUME_URL = require('env.js').RESUME_URL;

const coverLetterGenerator = {};

coverLetterGenerator.default = (company,position,webpageURL) => {
	const beginning = `I just read about the ${position} position at ${company}. I hope you'll consider me!`;
	const body = "\nThis application was sent by software I helped to build. Specifically, it was generated via an open-source project to which I contriubute: \n\nwww.github.com/davidmashe/applilanche";
	const end = "\n\nBuilding quality software to automate processes and bring value to everyday life is a passion of mine. If you'd like to know more about me, just head here:\n\n";

	const footer = (RESUME_URL) 
		? `\n\nresume: ${RESUME_URL}\n`
			:'';

	return beginning + body + end + webpageURL + footer;
}

module.exports = coverLetterGenerator
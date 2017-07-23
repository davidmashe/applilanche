If it's a numbers game, then use software!

Applilanche is a node-based local webapp to automate job applications for you.

To use applilanche, clone this repo and then follow the setup instructions.

REQUIRED INSTALLS:

-Node.js

CONDITIONALLY REQUIRED:

-Gmail account & gmail developer key (to apply via email)
-Python (to apply via webscraping - not yet built)
-PostgreSQL (to keep track of where you have applied already)

SETUP INSTRUCTIONS:

-Clone the repo

-`cd applilanche`

-`npm install`

-`npm start`

Applilanche automatically looks for Postgres and a gmail OAuth token file.

To disable these, look at env.js

DEVELOPMENT ROADMAP:

-Get Python webscrapers built

-Turn webscraper into automated cron job

-Make UI less of an eyesore

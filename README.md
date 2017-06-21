If it's a numbers game, then use software!

Applilanche is a node-based local webapp to automate job applications for you.

To use applilanche, clone this repo and then follow the setup instructions.

REQUIREMENTS:

-Node.js

OPTIONAL BUT RECOMMENDED:

-Local postgres database

SETUP INSTRUCTIONS:

-Clone the repo

-`cd applilanche`

-`npm install`

-Get a gmail API key

-set your gmail API key to an environment variable: GMAIL_API_KEY

-set your gmail address to GMAIL_ADRESS

-to run applilanche: inside the aplilanche directory `npm run dev`

-if you want Applilanche to store its data in a local file instead of postgres, set an environment variable STORE_LOCAL to "true". This is not a smart long term option, but can get you started if you are not used to setting up postgres locally.

DEVELOPMENT ROADMAP:

-Get Applilanche working as a local webapp
/*
copied from:
https://stackoverflow.com/questions/34546142/gmail-api-for-sending-mails-in-node-js#34563593
*/

const Base64 = require('js-base64').Base64;

function makeEmail(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    //console.log(str);

    //var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    //return encodedMail;
    
    return Base64.encodeURI(str);
}

const utilityModule = {
    makeEmail:makeEmail
};

module.exports = utilityModule
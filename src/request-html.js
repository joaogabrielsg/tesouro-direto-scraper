const request = require('request');

const requestHTML = (url, callback) => {
    request(url, (error, response, html) => {
        if (!error) {
            callback(null, html);
        } else {
            callback(error);
        }
    });
};

module.exports = requestHTML;
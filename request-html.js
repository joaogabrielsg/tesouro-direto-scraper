const request = require('request');
const express = require('express');
const app = express();

const requestHTML = (url, callback) => {
    app.get('/', (req, res) => {
        request(url, (error, response, html) => {
            if(!error){
                callback(null, html);
            }else{
                callback(error);
            }
        });
    });
};

app.listen(8080, () => console.log('Example app listening on port 8080!'));

module.exports = requestHTML;
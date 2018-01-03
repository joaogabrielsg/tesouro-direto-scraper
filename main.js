const express = require('express');
const app = express();

const request = require('request');
const cheerio = require('cheerio');

const url = 'http://www.tesouro.fazenda.gov.br/tesouro-direto-precos-e-taxas-dos-titulos';

app.get('/', (req, res) => {
    request(url, (error, response, html) => {
        if(!error){
            var $ = cheerio.load(html);

            $('td.listing').each(function(index, element) {
                console.log($(this).text());
            })
        }
    })
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
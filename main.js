const express = require('express');
const app = express();

const request = require('request');

const url = 'http://www.tesouro.fazenda.gov.br/tesouro-direto-precos-e-taxas-dos-titulos';

app.get('/', (req, res) => {
    request(url, (error, response, html) => {
        res.send(html);
    })
});

app.listen(8080, () => console.log('Example app listening on port 3000!'));
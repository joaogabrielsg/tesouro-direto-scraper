const requestHTML = require('./request-html.js');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'http://www.tesouro.fazenda.gov.br/tesouro-direto-precos-e-taxas-dos-titulos';
let result = {};
let rescue = {};
let investmentOptions = [];

requestHTML(url, (error, html) => {
    if (!error) {

        var $ = cheerio.load(html);
        $('table.tabelaPrecoseTaxas').each(function (index, element) {

            if ($(this).attr('class') === 'tabelaPrecoseTaxas sanfonado') {

                var type = '';
                var title = [];
                let investment = {};

                $(this).children().children().each(function (index, element) {
                    switch ($(this).attr('class')) {

                        case 'tabelaTitulo':
                            $(this).children().each(function (index, element) {
                                title.push($(this).children().children().text());
                            });
                            break;

                        case 'tituloprefixado':
                            if (type !== '') {
                                rescue[type] = investmentOptions;
                                investmentOptions = [];
                            }
                            type = $(this).children().children().text();
                            break;

                        case 'camposTesouroDireto':
                            $(this).children().each(function (index, element) {
                                investment[title[index]] = $(this).text();
                            });

                            var copy = Object.assign({}, investment);
                            investmentOptions = investmentOptions.concat(copy);
                            break;

                        default:
                            console.log('Classe de elemento invalida, revisar as classes dos coponentes usadas no site do Tesouro Direto');
                            break;
                    }
                });
                rescue[type] = investmentOptions;

                result['Titulos disponiveis para resgate Resgate'] = rescue;

                fs.writeFile('resultado.json', JSON.stringify(result, null, 4), function (err) {
                    console.log('JSON escrito com sucesso! O arquivo está na raiz do projeto.')
                });
            }
            else {
            }
        });

    } else {
        console.log(error);
    }
});
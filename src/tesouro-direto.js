const requestHTML = require('./request-html.js');
const cheerio = require('cheerio');

const url = 'http://www.tesouro.fazenda.gov.br/tesouro-direto-precos-e-taxas-dos-titulos';


const tesouroDireto = {

    requestData : (callback) => {

        let result = {};

        requestHTML(url, (error, html) => {
            if (!error) {

                var $ = cheerio.load(html);
                $('table.tabelaPrecoseTaxas').each(function (index, element) {

                    if ($(this).attr('class') === 'tabelaPrecoseTaxas sanfonado') {

                        var type = '';
                        var title = [];
                        let redeem = {};
                        let rescueOption = {};
                        let rescueOptions = [];

                        $(this).children().children().each(function (index, element) {
                            switch ($(this).attr('class')) {

                                case 'tabelaTitulo':
                                    $(this).children().each(function (index, element) {
                                        title.push($(this).children().children().text());
                                    });
                                    break;

                                case 'tituloprefixado':
                                    if (type !== '') {
                                        redeem[type] = rescueOptions;
                                        rescueOptions = [];
                                    }
                                    type = $(this).children().children().text();
                                    break;

                                case 'camposTesouroDireto':
                                    $(this).children().each(function (index, element) {
                                        rescueOption[title[index]] = $(this).text();
                                    });

                                    var copy = Object.assign({}, rescueOption);
                                    rescueOptions = rescueOptions.concat(copy);
                                    break;

                                default:
                                    console.log('Classe de elemento dos resgates invalida, revisar as classes dos coponentes usadas no site do Tesouro Direto');
                                    break;
                            }
                        });
                        redeem[type] = rescueOptions;

                        result['Titulos disponiveis para resgate'] = redeem;

                    } else {

                        var type = '';
                        var title = [];
                        let invest = {};
                        let investmentOption = {};
                        let investmentOptions = [];

                        $(this).children().children().each(function (index, element) {
                            switch ($(this).attr('class')) {

                                case 'tabelaTitulo':
                                    $(this).children().each(function (index, element) {
                                        title.push($(this).children().children().text());
                                    });
                                    break;

                                case 'tituloprefixado':
                                    if (type !== '') {
                                        invest[type] = investmentOptions;
                                        investmentOptions = [];
                                    }
                                    type = $(this).children().children().text();
                                    break;

                                case 'camposTesouroDireto ':
                                    $(this).children().each(function (index, element) {
                                        investmentOption[title[index]] = $(this).text();
                                    });

                                    var copy = Object.assign({}, investmentOption);
                                    investmentOptions = investmentOptions.concat(copy);
                                    break;

                                default:
                                    console.log('Classe de elemento dos investimentos invalida, revisar as classes dos coponentes usadas no site do Tesouro Direto');
                                    break;
                            }
                        });
                        invest[type] = investmentOptions;

                        result['Titulos disponiveis para investimento'] = invest;
                    }
                });

                callback(null, result);

            } else {
                callback(error);
            }
        });
    }
};

module.exports = tesouroDireto;

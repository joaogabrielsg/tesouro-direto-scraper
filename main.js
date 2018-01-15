const tesouroDireto = require('./src/tesouro-direto.js');
const fs = require('fs');

//Example of using the tesouro-direto module.
tesouroDireto.requestData((error, result) => {
    if(!error){
        fs.writeFile('resultado.json', JSON.stringify(result, null, 4), function (err) {
            console.log('JSON escrito com sucesso! O arquivo está na raiz do projeto.')
        });
    }else {
        console.log(error);
    }
});
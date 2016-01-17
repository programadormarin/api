/**
 * Efetua checagem da transação sempre que um carrinho é criado
 *
 * @author Thiago Paes
 * @package pagseguro
 * @licence GPL V3
 */
'use strict';

var pagseguro = require(__dirname + '/../modules/pagseguro');

var router = function(req, res, done) {
    res.app.on('carrinho:adiciona', function(carrinho) {
        pagseguro.checaTransacao(carrinho);
    });

    done();
};

module.exports = router;
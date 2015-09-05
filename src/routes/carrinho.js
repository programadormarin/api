'use strict';

var router          = require('express').Router();
var paginate        = require('express-paginate');
var CarrinhoModel   = require(__dirname + '/../models/carrinho');

router.get('/:usuario', function (req, res) {
    CarrinhoModel.paginate(
        {
            site    : req.headers.site,
            usuario : req.params.usuario
        },
        {
            page: req.query.page,
            limit: req.query.limit,
            populate: ['items.produto', 'site', 'usuario'],
            sortBy: {
                cadastro: -1
            }
        },
        function (err, data, pageCount, itemCount) {
            if (err) {
                return res.status(500).json({
                    object      : 'error',
                    has_more    : false,
                    data        : err,
                    itemCount   : 1,
                    pageCount   : 1
                });
            }

            res.status(200).json({
                object      : 'list',
                has_more    : paginate.hasNextPages(req)(pageCount),
                data        : data,
                itemCount   : itemCount,
                pageCount   : pageCount
            });
        }
    );
});

router.get('/:id/:usuario', function (req, res) {
    CarrinhoModel.findOne({
            _id     : req.params.id,
            site    : req.headers.site,
            usuario : req.params.usuario
        })
        .populate(['items.produto', 'site', 'usuario'])
        .exec(function (err, data) {
            if (err) {
                return res.status(500).json({
                    object      : 'error',
                    has_more    : false,
                    data        : err,
                    itemCount   : 1,
                    pageCount   : 1
                });
            }

            res.status(200).json({
                object      : 'object',
                has_more    : false,
                data        : data,
                itemCount   : 1,
                pageCount   : 1
            });
        });
});

router.post('/:usuario', function (req, res) {
    var carrinho = new CarrinhoModel({
        titulo  : (req.body.titulo ? req.body.titulo : 'Sem título'),
        cadastro: (new Date),
        site    : req.headers.site,
        usuario : req.params.usuario
    });

    carrinho.items.push({
            produto     : req.body.produto,
            quantidade  : req.body.quantidade
        });

    carrinho.save(function (err, data) {
        if (err) {
            return res.status(500).json({
                object      : 'error',
                has_more    : false,
                data        : err,
                itemCount   : 1,
                pageCount   : 1
            });
        }

        res.status(201).json({
            object      : 'object',
            has_more    : false,
            data        : data,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

router.put('/:id/:usuario', function (req, res) {
    CarrinhoModel.findOne({
            _id     : req.params.id,
            site    : req.headers.site,
            usuario : req.params.usuario
        })
        .populate(['items.produto', 'site', 'usuario'])
        .exec(function (err, data) {
            if (req.body.produto && req.body.quantidade) {
                var exists = false;

                data.items.forEach(function(item) {
                    if (item.produto._id.toString() == req.body.produto) {
                        item.quantidade += req.body.quantidade;

                        exists = true;
                    }
                });

                if (exists === false) {
                    data.items.push({
                        produto: req.body.produto,
                        quantidade: req.body.quantidade
                    });
                }
            }

            if (req.body.status) {
                data.status = req.body.status;
            }

            if (req.body.token) {
                data.token = req.body.token;
            }

            data.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        object      : 'error',
                        has_more    : false,
                        data        : err,
                        itemCount   : 1,
                        pageCount   : 1
                    });
                }

                res.status(204).json({
                    object      : 'object',
                    has_more    : false,
                    data        : result,
                    itemCount   : 1,
                    pageCount   : 1
                });
            });
        });
});

router.delete('/:id/:usuario', function (req, res) {
    CarrinhoModel.remove({
        _id     : req.params.id,
        site    : req.headers.site,
        usuario : req.params.usuario
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                object      : 'error',
                has_more    : false,
                data        : err,
                itemCount   : 1,
                pageCount   : 1
            });
        }

        res.status(204).json({
            object      : 'object',
            has_more    : false,
            data        : data,
            itemCount   : 1,
            pageCount   : 1
        });
    });
});

module.exports = router;

/**
 * Equipe
 *
 * @author Thiago Paes
 * @package equipe
 * @licence GPL V3
 */
'use strict';

var paginate            = require('express-paginate');
var EquipeModel         = require(__dirname + '/../models/equipe');
var EquipeController    = {
    /**
     * Lista os membros da equipe
     *
     * @param req
     * @param res
     * @param done
     */
    lista: function (req, res, done) {
        EquipeModel.paginate(
            {
                site: req.headers.site
            },
            {
                page: req.query.page,
                limit: req.query.limit,
                sort: {cadastro : 'desc'}
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    var pageCount = data.pages;
                    var itemCount = data.total;

                    res.status(200).json({
                        object: 'list',
                        has_more: paginate.hasNextPages(req)(pageCount),
                        data: data.docs,
                        itemCount: itemCount,
                        pageCount: pageCount
                    });
                }

                done(err, data);
            }
        );
    },

    /**
     * Visualiza um membro da equipe
     *
     * @param req
     * @param res
     * @param done
     */
    abre: function (req, res, done) {
        EquipeModel.findOne({
            _id: req.params.id,
            site: req.headers.site
        })
            .exec(function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(200).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            });
    },

    /**
     * Adiciona um membro na equipe
     * @param req
     * @param res
     * @param done
     */
    adiciona: function (req, res, done) {
        var membro = new EquipeModel({
            nome: req.body.nome,
            cargo: req.body.cargo,
            email: req.body.email,
            imagem: req.body.imagem,
            site: req.headers.site
        });

        membro.save(function (err, data) {
            if (err) {
                res.status(500).json({
                    object: 'error',
                    has_more: false,
                    data: err.message,
                    itemCount: 1,
                    pageCount: 1
                });
            } else {
                res.status(201).json({
                    object: 'object',
                    has_more: false,
                    data: data,
                    itemCount: 1,
                    pageCount: 1
                });
            }

            done(err, data);
        });
    },

    /**
     * Atualiza os dados de um membro
     *
     * @param req
     * @param res
     * @param done
     */
    atualiza: function (req, res, done) {
        EquipeModel.update(
            {
                _id: req.params.id,
                site: req.headers.site
            },
            {
                nome: req.body.nome,
                cargo: req.body.cargo,
                email: req.body.email,
                imagem: req.body.imagem,
                site: req.headers.site
            },
            function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(204).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            }
        );
    },

    /**
     * Remove um membro da equipe
     *
     * @param req
     * @param res
     * @param done
     */
    apaga: function (req, res, done) {
        EquipeModel.remove(
            {
                _id: req.params.id,
                site: req.headers.site
            }, function (err, data) {
                if (err) {
                    res.status(500).json({
                        object: 'error',
                        has_more: false,
                        data: err.message,
                        itemCount: 1,
                        pageCount: 1
                    });
                } else {
                    res.status(204).json({
                        object: 'object',
                        has_more: false,
                        data: data,
                        itemCount: 1,
                        pageCount: 1
                    });
                }

                done(err, data);
            }
        );
    }
};

module.exports = EquipeController;

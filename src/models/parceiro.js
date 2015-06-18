'use strict';

var pagination  = require('mongoose-paginate');
var random = require('mongoose-simple-random');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var ParceiroSchema = new Schema({
    nome: {
        type: String
    },
    imagem: {
        type: Object
    },
    url: {
        type: String
    },
    atuacao: {
        type: String
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

ParceiroSchema.plugin(random);
ParceiroSchema.plugin(pagination);

var Parceiro = mongoose.model('Parceiro', ParceiroSchema);

exports.Parceiro = Parceiro;

exports.list = function(req, res, callback) {
    Parceiro
        .find({
            site: req.headers.authentication
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.get = function(req, res, callback) {
    var id = req.params.id;

    Parceiro
        .findOne({
            _id: id,
            site: req.headers.authentication
        })
        .exec(function(err, data) {
            callback(err, data);
        });
};

exports.create = function(req, res, callback) {
    var data = req.body;

    var dados = {
        nome: data.nome,
        imagem: JSON.parse(data.imagem),
        url: data.url,
        atuacao: data.atuacao,
        cadastro: data.cadastro,
        site: req.headers.authentication
    };

    var parceiro = new Parceiro(dados);
        parceiro.save(function(err, data) {
            callback(err, data);
        });
};

exports.update = function(req, res, callback) {
    var id = req.params.id;
    var data = req.body;
    var dados = {
        nome: data.nome,
        url: data.url,
        atuacao: data.atuacao,
        cadastro: data.cadastro,
        site: req.headers.authentication
    };

    if (data.imagem) {
        dados.imagem = JSON.parse(data.imagem);
    }

    Parceiro.update({
        _id: id,
        site: req.headers.authentication
    }, dados, function(err, data) {
        callback(err, data);
    });
};

exports.delete = function(req, res, callback) {
    var id = req.params.id;

    Parceiro.remove({
        _id: id,
        site: req.headers.authentication
    }, function(err, data) {
        callback(err, data);
    });
};
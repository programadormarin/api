'use strict';

var Parceiro = require('../../src/controllers/parceiro');
var Site = require('mongoose').Types.ObjectId;
var sinon = require('sinon');
var assert = require('assert');
var request = require('request');
var response = {
    content: null,
    statusCode: 0,

    json: function(content){
        this.content = content;

        return this;
    },
    status: function(status) {
        this.statusCode = status;

        return this;
    }
};

describe('Parceiro Controller', function () {
    it('#lista() deve retornar um array', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Parceiro.lista(request, response, function() {
            assert.equal(response.content.object, 'list');
            assert.equal(response.statusCode, 200);
        });
    });

    it('#abre() deve retornar um objeto', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Parceiro.abre(request, response, function() {
            assert.equal(response.content.object, 'object');
            assert.equal(response.statusCode, 200);
        });
    });

    it('#adiciona() deve retornar um array', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site()
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Parceiro.adiciona(request, response, function() {
            assert.equal(response.content.object, 'object');
            assert.equal(response.statusCode, 201);
        });
    });

    it('#atualiza() deve retornar um objeto', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site(),
            id: 1
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Parceiro.atualiza(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });

    it('#apaga() deve retornar um objeto', function () {
        request.headers = {
            site: new Site()
        };

        request.params = {
            usuario: new Site(),
            id: 1
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Parceiro.apaga(request, response, function() {
            assert.equal(response.content.object, 'error');
            assert.equal(response.statusCode, 500);
        });
    });
});
'use strict';

var Login = require('../../src/controllers/login');
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

describe('Login Controller', function () {
    before(function() {
        this.skip();
    });

    it('#adiciona() deve retornar um array', function () {
        request.headers = {
            site: new Site()
        };

        request.body = {
            email   : 'foo@bar.bar',
            password: 'foobar'
        };

        request.query = {
            page: 1,
            limit: 1
        };

        Login.adiciona(request, response, function() {
            assert.equal(response.content.object, 'object');
            assert.equal(response.statusCode, 201);
        });
    });
});
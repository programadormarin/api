/**
 * Parceiro Model
 *
 * @author Thiago Paes
 * @package parceiro
 * @licence GPL V3
 */
'use strict';

var mongoose        = require('mongoose');
var ParceiroSchema  = new mongoose.Schema({
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
})
    .plugin(require('mongoose-paginate'))
    .set('toJSON', {
        transform: function(doc, ret, options) {
            delete ret.site;

            return ret;
        }
    });

module.exports = mongoose.model('Parceiro', ParceiroSchema);

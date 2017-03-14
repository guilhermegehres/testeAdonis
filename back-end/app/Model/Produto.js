'use strict'

const Lucid = use('Lucid')

class Produto extends Lucid {
    static get table () {
        return 'produtos'
    }
    static get deleteTimestamp () {
        return null
    }

}

module.exports = Produto

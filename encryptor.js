'use strict'

var encryptor = require('simple-encryptor')('my private encryption key')

module.exports = {

	encrypt: function(unencrypted) {
		return unencrypted ? encryptor.encrypt(unencrypted) : unencrypted
	},

	decrypt: function(encrypted) {
		return encryptor.decrypt(encrypted);
	}

}
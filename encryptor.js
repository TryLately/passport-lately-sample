'use strict'

var encryptor = require('simple-encryptor')('my private encryption key')

module.exports = {

	encrypt: function(unencrypted) {
		return unencrypted // encryptor.encrypt(unencrypted);
	},

	decrypt: function(encrypted) {
		return encrypted //encryptor.decrypt(encrypted);
	}

}
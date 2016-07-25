const bcrypt = require('bcrypt');

module.exports = {
  /* Promise wrappers of the bcrypt callback-based interface */

  genSalt: function genSalt() {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        resolve(salt);
      });
    });
  },

  hash: function hash(pass, salt) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  },

  compare: function compare(pass, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(pass, hash, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }
};

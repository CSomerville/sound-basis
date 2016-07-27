const { join } = require('path');
const passport = require('passport');

module.exports = {
  adminIndex: (req, res) => {
    return res.sendFile(join(__dirname, '/../views/admin-index.html'));
  },

  loginIndex: (req, res) => {
    return res.sendFile(join(__dirname, '/../views/admin-login.html'));
  }
}



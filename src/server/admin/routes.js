const express = require('express');
const controllers = require('./controllers');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const { isAuthenticated } = require('../passport-config');

module.exports = function returnsAdminRouter(passport) {

  const admin = express.Router();
  admin.use(flash());
  admin.use(bodyParser.urlencoded({ extended: true }));
  
  admin.get('/login', controllers.loginIndex);
  admin.post('/login', passport.authenticate(
      'local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
      }
    )
  );
  admin.get('/logout', controllers.loginDestroy);
  admin.get('/*', isAuthenticated, controllers.adminIndex);


  return admin;
}

const express = require('express');
const controllers = require('./controllers');
const flash = require('express-flash');
const bodyParser = require('body-parser');


module.exports = function returnsAdminRouter(passport) {
  const admin = express.Router();
  admin.use(flash());
  admin.use(bodyParser.urlencoded({ extended: true }));
  
  admin.get('/', controllers.adminIndex);
  admin.get('/login', controllers.loginIndex);
  admin.post('/login', passport.authenticate(
      'local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
        failureFlash: true
      }
    )
  );

  return admin;
}

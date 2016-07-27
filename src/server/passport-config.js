const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const queries = require('../db/queries');

passport.serializeUser((user, done) =>
  done(null, user.id)
);

passport.deserializeUser((id, done) =>
  queries.adminById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
);
console.log('in here');
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => 
  
  queries.adminLogin({
    email: email,
    password: password
  })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      return done(null, false, { msg: 'whatever' });
    })
));

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/admin/login');
  }
};

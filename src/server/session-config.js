const session = require('express-session');
const pgSession = require('connect-pg-simple');

if (!process.env.DEV_DATABASE_URL) throw new Error('set DEV_DATABASE_URL env variable');
if (!process.env.SESSION_SECRET) throw new Error('set SESSION_SECRET env variable');

module.exports = {
  store: new (pgSession(session))({
    conString: process.env.DEV_DATABASE_URL
  }),
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 10 },
  resave: false,
  saveUninitialized: false
};

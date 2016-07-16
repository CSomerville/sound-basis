const pgp = require('pg-promise')();

const db = (function() {
  switch(process.env.NODE_ENV) {
    case 'development':
      return pgp(process.env.DEV_DATABASE_URL);
    case 'test':
      console.log('in here');
      return pgp(process.env.TEST_DATABASE_URL);
    case 'production':
      return pgp(process.env.PROD_DATABASE_URL);
    default:
      throw new Error("Set NODE_ENV to 'development', 'test', or 'production'");
  }
})();

const connection = {
  pgp: pgp,
  db: db
};

module.exports = connection;



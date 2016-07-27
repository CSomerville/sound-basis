const schema = require('./schema');
const seed = require('./seed/seed');
const connection = require('./connection');
const exec = require('child_process').exec;
const path = require('path');

connection.db.task(t =>
  schema.runDelete(t)
    .then(schema.runCreate(t)
  ))
  .then(() => seed());

/* connect-pg-simple session table */
setUpSession();


function setUpSession() {

  const connString = (function() {
    switch(process.env.NODE_ENV) {
      case 'development':
        return process.env.DEV_DATABASE_URL;
      case 'test':
        return process.env.TEST_DATABASE_URL;
      case 'production':
        return process.env.PROD_DATABASE_URL;
      default:
        throw new Error("Set NODE_ENV to 'development', 'test', or 'production'");
    }
  })();

  const sessionSchema = path.join(__dirname, '../../node_modules/connect-pg-simple/table.sql');

  exec(`psql ${connString} < ${sessionSchema}`);
}



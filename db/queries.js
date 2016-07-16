const connection = require('./connection');

const queries = {};
module.exports = queries;

queries.pageAll = () =>
  connection.db.task(t =>
    t.batch([
      t.any(`SELECT * FROM pages;`),
      t.any(`SELECT * FROM sub_pages;`),
      t.any(`SELECT * FROM items;`)
    ])
  );

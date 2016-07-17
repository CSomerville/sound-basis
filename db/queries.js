const assert = require('assert');
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

queries.pageAllActive = () => 
  connection.db.task(t =>
    t.batch([
      t.any(`SELECT * FROM pages WHERE active = true`),
      t.any(`SELECT * FROM sub_pages WHERE active = true`),
      t.any(`SELECT * FROM items WHERE active = true`)
    ])
  );

queries.pageCreate = newPage => {
  return connection.db.task(t =>
    t.none(`
      INSERT INTO pages
      (id, name, active, has_sub_pages, position)
      VALUES ($1, $2, $3, $4, $5);
    `, [newPage.id, newPage.name, newPage.active, newPage.hasSubPages, newPage.position])
  );
}

queries.pageUpdate = (id, toUpdate) => {
  const whiteListed = {
    name: 'string',
    has_sub_pages: 'boolean',
    active: 'boolean',
    position: 'number'
  };

  const keys = [];
  const values = [];

  for (key in toUpdate) {
    assert(key in whiteListed,
      `queries.pageUpdate does not have ${key} in whiteListed`);
    assert.equal(typeof toUpdate[key], whiteListed[key],
      `${key} must be ${whiteListed[key]}`);

    keys.push(`${key}=$${keys.length + 1}`);
    values.push(toUpdate[key]);
  }

  values.push(id);

  const str = `
    UPDATE pages SET ${keys.join(', ')}
    , updated_at = NOW()
    WHERE id = $${keys.length + 1};
  `;

  return connection.db.task(t => 
    t.none(str, values)
  )
}

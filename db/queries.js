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

queries.pageDelete = id =>
  connection.db.task(t =>
    t.none(`DELETE FROM pages WHERE id = $1`, id)
  );


queries.subPageCreate = newSubPage => 
  connection.db.task(t =>
    t.none(`
      INSERT INTO sub_pages
      (id, page_id, name, active, position, photo_url)
      VALUES
      ($1, $2, $3, $4, $5, $6);
    `, [
      newSubPage.id, newSubPage.page_id, newSubPage.name, newSubPage.active,
      newSubPage.position, newSubPage.photo_url
    ])
  );

queries.subPageUpdate = (id, toUpdate) => {
  const whiteListed = {
    page_id: 'string',
    name: 'string',
    active: 'boolean',
    position: 'number',
    photo_url: 'string'
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
    UPDATE sub_pages SET ${keys.join(', ')}
    , updated_at = NOW()
    WHERE id = $${keys.length + 1};
  `;

  return connection.db.task(t => 
    t.none(str, values)
  );
}

queries.subPageDelete = id =>
  connection.db.task(t =>
    t.batch([
      t.none(`DELETE FROM sub_pages WHERE id = $1`, id),
      t.none(`DELETE FROM items WHERE parent_id = $1`, id)
    ])
  );

queries.itemCreate = newItem => 
  connection.db.task(t =>
    t.none(`
      INSERT INTO items
      (id, parent_id, active, item_type, photo_url, content, position)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7);
    `, [
      newItem.id, newItem.parent_id, newItem.active, newItem.item_type, newItem.photo_url,
      newItem.content, newItem.position
    ])
  );



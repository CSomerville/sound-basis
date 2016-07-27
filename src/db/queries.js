const assert = require('assert');
const connection = require('./connection');
const { compare } = require('./bcrypt-promisifications');

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
  );
}

queries.pageDelete = id =>
  connection.db.task(t =>
    t.batch([
      t.none(`DELETE FROM pages WHERE id = $1`, id),
      t.any(`
        DELETE FROM items
        WHERE id IN (
          SELECT items.id FROM sub_pages
          INNER JOIN items
          ON items.parent_id = sub_pages.id
          WHERE sub_pages.page_id = $1
        );
        DELETE FROM sub_pages WHERE page_id = $1;
       `, id)

    ])
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
      `queries.subPageUpdate does not have ${key} in whiteListed`);
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

queries.itemUpdate = (id, toUpdate) => {
  const whiteListed = {
    parent_id: 'string',
    name: 'string',
    active: 'boolean',
    position: 'number',
    photo_url: 'string',
    item_type: 'string',
    content: 'string'
  };

  const keys = [];
  const values = [];

  for (key in toUpdate) {
    assert(key in whiteListed,
      `queries.itemUpdate does not have ${key} in whiteListed`);
    assert.equal(typeof toUpdate[key], whiteListed[key],
      `${key} must be ${whiteListed[key]}`);

    keys.push(`${key}=$${keys.length + 1}`);
    values.push(toUpdate[key]);
  }

  values.push(id);

  const str = `
    UPDATE items SET ${keys.join(', ')}
    , updated_at = NOW()
    WHERE id = $${keys.length + 1};
  `;

  return connection.db.task(t => 
    t.none(str, values)
  );
}

queries.itemDelete = id =>
  connection.db.task(t =>
    t.none(`DELETE FROM items WHERE id = $1`, id)
  );

queries.adminLogin = admin => {
  let final;
  return connection.db.task(t =>
    t.one(`SELECT * FROM admins WHERE email = $1`, admin.email)
  )
    .then(data => {
      final = {
        id: data.id,
        username: data.username
      };
      return compare(admin.password, data.password)
    })
    .then(res => {
      if (res) {
        return final;
      } else {
        throw new Error('password does not match.');
      }
    });
} 

queries.adminById = id =>
  connection.db.task(t =>
    t.one(`SELECT username, id FROM admins WHERE id = $1`, id)
  );

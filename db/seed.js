const uuid = require('node-uuid');
const faker = require('faker');
const connection = require('./connection');
const randomImages = require('./random-images');

/* PAGES */

const pageInsertStr = `
  INSERT INTO pages
  (id, name, has_sub_pages, active, position, created_at)
  VALUES
  ($1, $2, $3, $4, $5, $6);
`;

const pageData = Array(4).fill(1).map((el, i) => [
  uuid.v4(),
  faker.lorem.word(),
  (i % 3 == 0) ? false : true,
  (i % 2 == 0) ? true : false,
  i,
  faker.date.between(new Date('Jan 1 2016'), new Date('Mar 30 2016'))
]);


/* SUB PAGES */

const subPageInsertStr = `
  INSERT INTO sub_pages
  (id, page_id, name, active, photo_url, position, created_at)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7);
`;

const subPageData = Array(10).fill(1).map((el, i) => [
  uuid.v4(),
  pageData[Math.min(Math.floor(i/3), 2)][0],
  faker.lorem.word(),
  (i % 3 == 0) ? false : true,
  randomImages(),
  (i == 9) ? 3 : i % 3,
  faker.date.between(pageData[Math.min(Math.floor(i/3), 2)][5], new Date('April 30 2016'))
]);


/* ITEMS */

const itemInsertStr = `
  INSERT INTO items
  (id, parent_id, active, item_type, content, photo_url, position, created_at)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8);
`;

const itemData = Array(30).fill(1).map((el, i) => [
  uuid.v4(),
  (i < 20) ? subPageData[i%2][0] : pageData[3][0],
  (i % 4 == 0) ? false : true,
  (i % 3 == 0) ? 'image' : 'text',
  faker.lorem.sentence(),
  randomImages(),
  (i < 20) ? i%2 : i - 20,
  faker.date.between(((i < 20) ? subPageData[i%2][6] : pageData[3][5]), new Date('May 30 2016'))
]);
  

const runInserts = t =>
  t.batch(pageData.map(el =>
    t.none(pageInsertStr, el)
  ).concat(subPageData.map(el =>
    t.none(subPageInsertStr, el)
  )).concat(itemData.map(el =>
    t.none(itemInsertStr, el)
  )));


module.exports = () =>
  connection.db.task(runInserts)
    .then(() => {
      console.log('db seeded');
      connection.pgp.end();
    })
    .catch(err => {
      console.log(err);
      connection.pgp.end();
    });





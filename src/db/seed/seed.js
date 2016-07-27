const uuid = require('node-uuid');
const faker = require('faker');
const connection = require('../connection');
const randomImages = require('./random-images');
const statements = require('./statements');
const { genSalt, hash } = require('../bcrypt-promisifications');


/* ADMIN */

const adminId = '707286cb-e30a-41d8-95ef-070a97af1016';

const adminData = [[
  adminId,
  'CSomerville',
  'colby.somerville@gmail.com',
  ',KObp_@Kg.`6sKp(tZcd'
]];


/* PAGES */

const pageData = Array(4).fill(1).map((el, i) => [
  uuid.v4(),
  faker.lorem.word(),
  ((i+1) % 4 == 0) ? false : true,
  (i % 2 == 0) ? true : false,
  i,
  faker.date.between(new Date('Jan 1 2016'), new Date('Mar 30 2016'))
]);


/* SUB PAGES */

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
  t.batch(adminData.map(admin =>
    genSalt()
      .then(salt => hash(admin[3], salt))
      .then(pass =>
        t.none(statements.adminInsertStr, [...admin.slice(0, 3), pass, ...admin.slice(4)])
      )
  ).concat(pageData.map(el =>
    t.none(statements.pageInsertStr, el)
  )).concat(subPageData.map(el =>
    t.none(statements.subPageInsertStr, el)
  )).concat(itemData.map(el =>
    t.none(statements.itemInsertStr, el)
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





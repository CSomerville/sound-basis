const connection = require('../connection');
const statements = require('./statements');
const uuid = require('node-uuid');
const { genSalt, hash } = require('../bcrypt-promisifications');

const adminId = '707286cb-e30a-41d8-95ef-070a97af1016';

const pageIds = [
  'cec16e9c-db72-407a-926c-7901e0ab5c8e',
  '6385b812-3f2d-4572-8684-6d19c01cea3b'
];

const subPageIds = [
  '8b184605-e90a-4e20-85ad-fb0f9f0dcc44',
  '78d4eab8-2d83-4841-9591-1a80720891d8'
];

const itemIds = [
  '83bd4d28-3631-457c-a60f-bb8446a2dff5',
  'e1d39512-d747-406c-9006-0d694724a765',
  '6c6a8ca8-c915-43a2-a29e-55963ef6b0f6',
  '5b9e593a-845e-456a-a8ac-cad0bf35dde7',
  '2b5e5086-3bb9-413c-b4a1-5e2f871f1d76',
  '71c3db75-8e0e-401a-8a50-1207d8f0e92d'
];

/* PAGE DATA */

const pageData = [[
  pageIds[0],
  'English Elm',
  true,
  true,
  0,
  new Date('May 17, 2016')
],[
  pageIds[1],
  'American Elm',
  false,
  false,
  1,
  new Date('May 21, 2016')
]];

/* SUB PAGE DATA */

const subPageData = [[
  subPageIds[0],
  pageIds[0],
  'lil trunk',
  true,
  '',
  0,
  new Date('June 1, 2016')
],[
  subPageIds[1],
  pageIds[0],
  'nice branch',
  true,
  '',
  1,
  new Date('June 2, 2016')
]];

/* ITEM DATA */

const itemData = [[
  itemIds[0],
  pageIds[1],
  true,
  'image',
  '',
  '',
  0,
  new Date('June 4, 2016')
],[
  itemIds[1],
  pageIds[1],
  false,
  'prose',
  'mmmm-sure this is a thing',
  '',
  1,
  new Date('June 5, 2016')
],[
  itemIds[2],
  subPageIds[0],
  true,
  'image',
  '',
  '',
  0,
  new Date('July 1, 2016')
],[
  itemIds[3],
  subPageIds[0],
  true,
  'prose',
  'we got ourselves a whole app',
  '',
  1,
  new Date('July 2, 2016')
],[
  itemIds[4],
  subPageIds[1],
  false,
  'image',
  '',
  '',
  0,
  new Date('July 3, 2016')
],[
  itemIds[5],
  subPageIds[1],
  false,
  'prose',
  'unh-hunh her',
  '',
  1,
  new Date('July 5, 2016')
]];

const adminData = [[
  adminId,
  'CSomerville',
  'colby.somerville@gmail.com',
  ',KObp_@Kg.`6sKp(tZcd'
]];

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

const testSeed = () => 
  connection.db.task(runInserts)
    .then(() => connection.pgp.end())
    .catch(err => {
      console.log(err);
      connection.pgp.end();
    });




module.exports = {
  seedData: {
    pageData: pageData,
    subPageData: subPageData,
    itemData: itemData
  },
  seed: runInserts
};


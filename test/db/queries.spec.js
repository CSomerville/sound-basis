const uuid = require('node-uuid');
const chai = require('chai');
const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');
const connection = require('../../src/db/connection');
const schema = require('../../src/db/schema');
const testSeed = require('../../src/db/seed/test-seed');
const queries = require('../../src/db/queries');

chai.use(chaiAsPromised);

describe('queries', () => {
  beforeEach(done => 
    connection.db.task(t =>
      schema.runDelete(t)
        .then(() => schema.runCreate(t))
        .then(() => testSeed.seed(t))
    )
    .then(() => done())
    .catch(err => done(err))
  );

  describe('pageAll', () => {
    it('should retrieve all data (including inactive)', done => {

      queries.pageAll()
        .then(data => {
          expect(data.length).to.equal(3);
          expect(data[0].length).to.equal(2);
          expect(data[0][0].id).to.equal(testSeed.seedData.pageData[0][0]);
          expect(data[2][0].id).to.equal(testSeed.seedData.itemData[0][0]);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe('pageAllActive', () => {
    it('should retrieve all active data', done => {

      const isActive = row => row.active === true; 

      queries.pageAllActive()
        .then(data => {
          expect(data[0].every(isActive)).to.equal(true);
          expect(data[1].every(isActive)).to.equal(true);
          expect(data[2].every(isActive)).to.equal(true);
          done();
        })
        .catch(err => done(err)); 
    });
  });

  describe('pageCreate', () => {
    it('should add row to page table', done => {
      
      const newPage = {
        id: uuid.v4(),
        name: 'Oak',
        hasSubPages: true,
        active: false,
        position: 2
      };

      queries.pageCreate(newPage)
        .then(() =>
          connection.db.task(t =>
            t.one(`SELECT * FROM pages WHERE id = $1`, newPage.id)
          )
        )
        .then(data => {
          expect(data.id).to.equal(newPage.id);
          expect(data.name).to.equal(newPage.name);
          expect(data.has_sub_pages).to.equal(newPage.hasSubPages)
          expect(data.active).to.equal(newPage.active);
          expect(data.position).to.equal(newPage.position);
          expect(data.created_at).to.exist;
          expect(data.updated_at).to.be.null;
          done();
        })
        .catch(err => done(err));
    });

    it('should throw without good input', done => {

      const badInput = {};

      queries.pageCreate(badInput)
        .then(() => {
          expect('in here').to.be.null;
          done();
        })
        .catch(err => {
          expect(err.message).to.equal('null value in column "id" violates not-null constraint');
          done();
        });
    });
  });
  describe('pageUpdate', () => {
    it('should use key value pairs to update columns', done => {
      const seedId = 'cec16e9c-db72-407a-926c-7901e0ab5c8e'
      const toUpdate = {
        name: 'Laurel Oak',
        active: true,
      };
      
      queries.pageUpdate(seedId, toUpdate)
        .then(() =>
          connection.db.task(t =>
            t.one(`SELECT * FROM pages WHERE id = $1`, seedId)
          )
        )
        .then(data => {
          expect(data.name).to.equal(toUpdate.name);
          expect(data.active).to.equal(toUpdate.active);
          expect(data.updated_at).to.exist;
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('pageDelete', () => {
    it('should delete page by id', done => {
      const seedId = 'cec16e9c-db72-407a-926c-7901e0ab5c8e'

      queries.pageDelete(seedId)
        .then(() =>
          connection.db.task(t =>
            t.batch([
              t.any(`SELECT * FROM pages;`),
              t.any(`SELECT * FROM sub_pages;`),
              t.any(`SELECT * FROM items;`)
            ])
          )
        )
        .then(data => {
          expect(data[0].length).to.equal(1);
          expect(data[0].every(el => el.id !== seedId)).to.be.true;
          expect(data[1].length).to.equal(0);
          expect(data[1].every(el => el.page_id !== seedId)).to.be.true;
          expect(data[2].length).to.equal(2);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('subPageCreate', () => {
    it('should create new sub page row', done => {
      
      const newSubPage = {
        id: uuid.v4(),
        page_id: 'cec16e9c-db72-407a-926c-7901e0ab5c8e',
        name: 'bifurcation',
        active: false,
        position: 2,
        photo_url: '',
      };

      queries.subPageCreate(newSubPage)
        .then(() =>
          connection.db.task(t =>
            t.one(`SELECT * FROM sub_pages WHERE id = $1`, newSubPage.id)
          )
        )
        .then(data => {
          expect(data.id).to.equal(newSubPage.id);
          expect(data.page_id).to.equal(newSubPage.page_id);
          expect(data.name).to.equal(newSubPage.name);
          expect(data.position).to.equal(newSubPage.position);
          expect(data.active).to.equal(newSubPage.active);
          expect(data.created_at).to.exist;
          expect(data.updated_at).to.be.null;
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('subPageUpdate', () => {
    it('should use key value pairs to update columns', done => {
      const seedId = '8b184605-e90a-4e20-85ad-fb0f9f0dcc44';
      const toUpdate = {
        name: 'Laurel Oak',
        active: true,
        photo_url: 'blarg'
      };
      
      queries.subPageUpdate(seedId, toUpdate)
        .then(() =>
          connection.db.task(t =>
            t.one(`SELECT * FROM sub_pages WHERE id = $1`, seedId)
          )
        )
        .then(data => {
          expect(data.name).to.equal(toUpdate.name);
          expect(data.active).to.equal(toUpdate.active);
          expect(data.updated_at).to.exist;
          expect(data.photo_url).to.equal(toUpdate.photo_url);
          done();
        })
        .catch(err => done(err));
    });
  });
  
  describe('subPageDelete', () => {
    it('should delete sub_page and children (items)', done => {
      const id = '8b184605-e90a-4e20-85ad-fb0f9f0dcc44';

      queries.subPageDelete(id)
        .then(() =>
          connection.db.task(t =>
            t.batch([
              t.any(`SELECT * FROM sub_pages;`),
              t.any(`SELECT * FROM items;`)
            ])
          )
        )
        .then(data => {
          expect(data[0].length).to.equal(1);
          expect(data[1].length).to.equal(4);
          expect(data[0].every(el => el.id !== id)).to.be.true;
          expect(data[1].every(el => el.parent_id !== id)).to.be.true;
          done();
        })
        .catch(err => done(err));
    });
  });
  
  describe('itemCreate', () => {
    it('should create new item row', done => {
      
      const newItem = {
        id: uuid.v4(),
        parent_id: '8b184605-e90a-4e20-85ad-fb0f9f0dcc44',
        active: true,
        item_type: 'image',
        photo_url: 'blarg',
        content: 'this is a thing',
        position: 3
      };

      queries.itemCreate(newItem)
        .then(() =>
          connection.db.task(t =>
            t.one(`SELECT * FROM items WHERE id = $1`, newItem.id)
          )
        )
        .then(data => {
          expect(data.id).to.equal(newItem.id);
          expect(data.parent_id).to.equal(newItem.parent_id);
          expect(data.active).to.equal(newItem.active);
          expect(data.item_type).to.equal(newItem.item_type);
          expect(data.photo_url).to.equal(newItem.photo_url);
          expect(data.content).to.equal(newItem.content);
          expect(data.position).to.equal(newItem.position);
          expect(data.created_at).to.exist;
          expect(data.updated_at).to.be.null;
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('itemUpdate', () => {
    it('should use key value pairs to update rows', done => {

      const id = '83bd4d28-3631-457c-a60f-bb8446a2dff5';
      const toUpdate = {
        position: 2,
        content: 'squirrel food'
      };

      queries.itemUpdate(id, toUpdate)
        .then(() => 
          connection.db.task(t =>
            t.one('SELECT * FROM items WHERE id = $1', id)
          )
        )
        .then(data => {
          expect(data.position).to.equal(toUpdate.position);
          expect(data.content).to.equal(toUpdate.content);
          expect(data.id).to.equal(id);
          expect(data.updated_at).to.exist;
          expect(data.item_type).to.equal('image');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('itemDelete', () => {
    it('should delete item by id', done => {

      const id = '83bd4d28-3631-457c-a60f-bb8446a2dff5';

      queries.itemDelete(id)
        .then(() =>
          connection.db.task(t =>
            t.any(`SELECT * FROM items;`)
          )
        )
        .then(data => {
          expect(data.length).to.equal(5);
          expect(data.every(el => el.id !== id)).to.be.true;
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('adminLogin', () => {
    it('should compare password and return id, username', done => {
      const admin = {
        email: 'colby.somerville@gmail.com',
        password: ',KObp_@Kg.`6sKp(tZcd'
      };
      const expected = {
        id: '707286cb-e30a-41d8-95ef-070a97af1016',
        username: 'CSomerville'
      };

      queries.adminLogin(admin)
        .then(data => {
          expect(data).to.deep.equal(expected);
          done();
        })
        .catch(err => done(err));
    });

    it('should throw if password does not match', done => {
      const admin = {
        email: 'colby.somerville@gmail.com',
        password: ',KObp_@Kg.`6sKp(tZc'
      };


      return expect(queries.adminLogin(admin))
        .to.eventually.be.rejectedWith(Error, "password does not match.")
        .notify(done);

    }); 
  });
});


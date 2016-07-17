const uuid = require('node-uuid');
const expect = require('chai').expect;
const connection = require('../../db/connection');
const schema = require('../../db/schema');
const testSeed = require('../../db/seed/test-seed');
const queries = require('../../db/queries');

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
});


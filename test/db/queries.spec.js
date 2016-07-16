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
});


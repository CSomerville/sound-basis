const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
require('sinon-as-promised');
const sinonChai = require('sinon-chai');
const uuid = require('node-uuid');
const returnsControllers = require('../../../src/server/api/controllers');

chai.use(sinonChai);

describe('apiControllers', () => {
  describe('pagesIndex', () => {
    it('should respond 200 ok with pages, subPages, items', done => {
      const pages = [{
        id: uuid.v4(),
        name: 'Elm'
      }, {
        id: uuid.v4(),
        name: 'Oak'
      }];

      const subPages = [{
        id: uuid.v4(),
        name: 'a sub page'
      }];

      const items = [];
      const queries = {
        pagesAll: sinon.stub().resolves([
          pages, subPages, items
        ])
      };

      const expected = {
        pages: pages,
        subPages: subPages,
        items: items
      };

      const res = {
        send: function() {}
      };
      const req = {};
      const sendSpy = sinon.spy(res, 'send'); 

      const controllers = returnsControllers(queries);
      controllers.pagesIndex(req, res);

      setTimeout(() => {
        expect(queries.pagesAll).to.have.been.calledOnce;
        expect(queries.pagesAll).to.have.been.calledWith();
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(expected);
        done();
      }, 0);
    });

    it('should respond 500 on db error', done => {
      const queries = {
        pagesAll: sinon.stub().rejects(new Error('syntax error you goon'))
      };

      const res = {
        send: function() {}
      };
      const req = {};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.pagesIndex(req, res);

      setTimeout(() => {
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(500);
        done();
      }, 0);
    });
  });
});

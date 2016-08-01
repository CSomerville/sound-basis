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
        pageAll: sinon.stub().resolves([
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
        expect(queries.pageAll).to.have.been.calledOnce;
        expect(queries.pageAll).to.have.been.calledWith();
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(expected);
        done();
      }, 0);
    });

    it('should respond 500 on db error', done => {
      const queries = {
        pageAll: sinon.stub().rejects(new Error('syntax error you goon'))
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

  describe('pagesCreate', () => {
    it('should send 200 on success', done => {
      const queries = {
        pageCreate: sinon.stub().resolves()
      };
      
      const req = {
        body: {
          newPage: {
            id: uuid.v4(),
            name: 'Linden',
            position: 0,
            has_sub_pages: false
          }
        }
      };
      const res = {
        send: function() {}
      };

      const sendSpy = sinon.spy(res, 'send');
      const controllers = returnsControllers(queries);
      controllers.pagesCreate(req, res);

      setTimeout(() => {
        expect(queries.pageCreate).to.have.been.calledOnce;
        expect(queries.pageCreate).to.have.been.calledWith(req.body.newPage);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });

    it('should validate for presence of id, name, position, has_sub_pages on req.body.newPage', () => {
      const badReq1 = {
        body: {
          newPage: {
            name: 'Linden',
            position: 0,
            has_sub_pages: false
          }
        }
      };
      const reqNoNewPage = { body: {} };

      const res = {
        send: function() {}
      };
      const sendSpy = sinon.spy(res, 'send');
      const controllers = returnsControllers({});
      
      controllers.pagesCreate(badReq1, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);

      sendSpy.reset();
      controllers.pagesCreate(reqNoNewPage, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);
    });

    it('should respond 500 on db error', done => {
      const queries = {
        pageCreate: sinon.stub().rejects(new Error('syntax error you goon'))
      };

      const res = {
        send: function() {}
      };
      const req = {
        body: {
          newPage: {
            id: uuid.v4(),
            name: 'Linden',
            position: 0,
            has_sub_pages: false
          }
        }
      };
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.pagesCreate(req, res);

      setTimeout(() => {
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(500);
        done();
      }, 0);
    });
  });
  
  describe('pagesUpdate', () => {
    it('should call query with args and response 200 on success', done => {
      const queries = {
        pageUpdate: sinon.stub().resolves()
      };

      const req = {
        params: {
          id: uuid.v4()
        },
        body: {
          toUpdate: {
            name: 'lil branch',
            position: 2
          }
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.pagesUpdate(req, res);

      setTimeout(() => {
        expect(queries.pageUpdate).to.have.been.calledOnce;
        expect(queries.pageUpdate).to.have.been.calledWith(req.params.id, req.body.toUpdate);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });
  });

  describe('pagesDestroy', () => {
    it('should call query with req.params.id and respond 200 on success', done => {
      const queries = {
        pageDestroy: sinon.stub().resolves()
      };

      const req = {
        params: {
          id: uuid.v4()
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.pagesDestroy(req, res);

      setTimeout(() => {
        expect(queries.pageDestroy).to.have.been.calledOnce;
        expect(queries.pageDestroy).to.have.been.calledWith(req.params.id);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });

    it('should respond 400 if req.params.id is not present', () => {
      const req1 = {
        params: {}
      };
      const req2 = {
        params: {
          id: 'abe3',
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers({});
      controllers.pagesDestroy(req1, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);

      sendSpy.reset();
      controllers.pagesDestroy(req2, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);

    });
  });

  describe('subPagesCreate', () => {
    it('should send 200 on success', done => {
      const queries = {
        subPageCreate: sinon.stub().resolves()
      };

      const req = {
        body: {
          newSubPage: {
            id: uuid.v4(),
            page_id: uuid.v4(),
            name: 'big twig',
            active: true,
            photo_url: '',
            position: 2
          }
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.subPagesCreate(req, res);

      setTimeout(() => {
        expect(queries.subPageCreate).to.have.been.calledOnce;
        expect(queries.subPageCreate).to.have.been.calledWith(req.body.newSubPage);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });

    it('should send 500 on failure', done => {
      const queries = {
        subPageCreate: sinon.stub().rejects(new Error('db doesn\'t work'))
      };

      const req = {
        body: {
          newSubPage: {
            id: uuid.v4(),
            page_id: uuid.v4(),
            name: 'big twig',
            active: true,
            photo_url: '',
            position: 2
          }
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.subPagesCreate(req, res);

      setTimeout(() => {
        expect(queries.subPageCreate).to.have.been.calledOnce;
        expect(queries.subPageCreate).to.have.been.calledWith(req.body.newSubPage);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(500);
        done();
      }, 0);
    });

    it('should return status 400 on bad req.body.newSubPage', () => {
      const badReq1 = {
        body: {}
      };
      const badReq2 = {
        body: {
          newSubPage: {
            id: uuid.v4(),
            page_id: uuid.v4(),
            name: 'big twig',
            active: true,
            photo_url: '',
          }
        }
      };
      const badReq3 = {
        body: {
          newSubPage: {
            id: 'aef12',
            page_id: uuid.v4(),
            name: 'big twig',
            active: true,
            photo_url: '',
            position: 2
          }
        }
      };
      
      const res = { send: function() {} };
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers({});
      controllers.subPagesCreate(badReq1, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);
      sendSpy.reset();

      controllers.subPagesCreate(badReq2, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);
      sendSpy.reset();

      controllers.subPagesCreate(badReq3, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);
    });
  });

  describe('subPagesUpdate', () => {
    it('should call query with args and response 200 on success', done => {
      const queries = {
        subPageUpdate: sinon.stub().resolves()
      };

      const req = {
        params: {
          id: uuid.v4()
        },
        body: {
          toUpdate: {
            name: 'lil branch',
            position: 2
          }
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.subPagesUpdate(req, res);

      setTimeout(() => {
        expect(queries.subPageUpdate).to.have.been.calledOnce;
        expect(queries.subPageUpdate).to.have.been.calledWith(req.params.id, req.body.toUpdate);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });
  });

  describe('subPagesDestroy', () => {
    it('should call query with req.params.id and respond 200 on success', done => {
      const queries = {
        subPageDestroy: sinon.stub().resolves()
      };

      const req = {
        params: {
          id: uuid.v4()
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.subPagesDestroy(req, res);

      setTimeout(() => {
        expect(queries.subPageDestroy).to.have.been.calledOnce;
        expect(queries.subPageDestroy).to.have.been.calledWith(req.params.id);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });

    it('should respond 400 if req.params.id is not present', () => {
      const req1 = {
        params: {}
      };
      const req2 = {
        params: {
          id: 'abe3',
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers({});
      controllers.subPagesDestroy(req1, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);

      sendSpy.reset();
      controllers.subPagesDestroy(req2, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);

    });
  });
 
  describe('itemsCreate', () => {
    it('should send 200 on success', done => {
      const queries = {
        itemCreate: sinon.stub().resolves()
      };

      const req = {
        body: {
          newItem: {
            id: uuid.v4(),
            parent_id: uuid.v4(),
            name: 'leaf',
            active: true,
            photo_url: '',
            item_type: 'prose',
            content: 'Leafy life',
            position: 2
          }
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.itemsCreate(req, res);

      setTimeout(() => {
        expect(queries.itemCreate).to.have.been.calledOnce;
        expect(queries.itemCreate).to.have.been.calledWith(req.body.newItem);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });

    it('should send 500 on failure', done => {
      const queries = {
        itemCreate: sinon.stub().rejects(new Error('db doesn\'t work'))
      };

      const req = {
        body: {
          newItem: {
            id: uuid.v4(),
            parent_id: uuid.v4(),
            item_type: 'prose',
            active: true,
            photo_url: '',
            content: 'Leafy life',
            position: 2
          }
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.itemsCreate(req, res);

      setTimeout(() => {
        expect(queries.itemCreate).to.have.been.calledOnce;
        expect(queries.itemCreate).to.have.been.calledWith(req.body.newItem);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(500);
        done();
      }, 0);
    });

    it('should validate req.body.newItem and send 400 on bad input', () => {
      const badReq1 = {
        body: {}
      };

      const badReq2 = {
        body: {
          newItem: {
            id: 'ae124',
            parent_id: uuid.v4(),
            item_type: 'prose',
            active: true,
            photo_url: '',
            content: 'Leafy life',
            position: 2
          }
        }
      };

      const badReq3 = {
        body: {
          newItem: {
            id: uuid.v4(),
            page_id: uuid.v4(),
            item_type: 'prose',
            photo_url: '',
            position: 2
          }
        }
      };
      
      const res = { send: function() {} };
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers({});
      controllers.itemsCreate(badReq1, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);
      sendSpy.reset();

      controllers.itemsCreate(badReq2, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);
      sendSpy.reset();

      controllers.itemsCreate(badReq3, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);
    });
  });

  describe('itemsUpdate', () => {
    it('should call query with args and response 200 on success', done => {
      const queries = {
        itemUpdate: sinon.stub().resolves()
      };

      const req = {
        params: {
          id: uuid.v4()
        },
        body: {
          toUpdate: {
            content: 'lil branch',
            position: 2
          }
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.itemsUpdate(req, res);

      setTimeout(() => {
        expect(queries.itemUpdate).to.have.been.calledOnce;
        expect(queries.itemUpdate).to.have.been.calledWith(req.params.id, req.body.toUpdate);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });
  });

  describe('itemsDestroy', () => {
    it('should call query with req.params.id and respond 200 on success', done => {
      const queries = {
        itemDestroy: sinon.stub().resolves()
      };

      const req = {
        params: {
          id: uuid.v4()
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers(queries);
      controllers.itemsDestroy(req, res);

      setTimeout(() => {
        expect(queries.itemDestroy).to.have.been.calledOnce;
        expect(queries.itemDestroy).to.have.been.calledWith(req.params.id);
        expect(sendSpy).to.have.been.calledOnce;
        expect(sendSpy).to.have.been.calledWith(200);
        done();
      }, 0);
    });

    it('should respond 400 if req.params.id is not present', () => {
      const req1 = {
        params: {}
      };
      const req2 = {
        params: {
          id: 'abe3',
        }
      };

      const res = { send: function() {}};
      const sendSpy = sinon.spy(res, 'send');

      const controllers = returnsControllers({});
      controllers.itemsDestroy(req1, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);

      sendSpy.reset();
      controllers.itemsDestroy(req2, res);

      expect(sendSpy).to.have.been.calledOnce;
      expect(sendSpy).to.have.been.calledWith(400);

    });
  });
});

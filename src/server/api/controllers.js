const assert = require('assert');
const validator = require('validator');

module.exports = queries => ({
  
  pagesIndex: function pagesIndex(req, res) {
    queries.pageAll()
      .then(data =>
        res.send({
          pages: data[0],
          subPages: data[1],
          items: data[2]
        })
      )
      .catch(err => {
        res.send(500);
      }); 
  },

  pagesCreate: function pagesCreate(req, res) {
    const badInput = !req.body.newPage || 
      typeof req.body.newPage.id !== 'string' ||
      typeof req.body.newPage.name !== 'string' || 
      typeof req.body.newPage.position !== 'number' ||
      typeof req.body.newPage.has_sub_pages !== 'boolean';

    if (badInput) return res.send(400);

    queries.pageCreate(req.body.newPage)
      .then(() => res.send(200))
      .catch(err => {
        res.send(500);
      });
  },

  pagesUpdate: function pagesUpdate(req, res) {
    queries.pageUpdate(req.params.id, req.body.toUpdate)
      .then(() => res.send(200))
      .catch(err => res.send(500)); 
  },

  pagesDestroy: function pagesDestroy(req, res) {
    const badInput = !req.params.id ||
      !validator.isUUID(req.params.id);

    if(badInput) return res.send(400);

    queries.pageDestroy(req.params.id)
      .then(() => res.send(200))
      .catch(err => res.send(500));
  },

  subPagesCreate: function subPagesCreate(req, res) {
    const badInput = !req.body.newSubPage ||
      typeof req.body.newSubPage.id !== 'string' ||
      !validator.isUUID(req.body.newSubPage.id) ||
      typeof req.body.newSubPage.page_id !== 'string' ||
      !validator.isUUID(req.body.newSubPage.page_id) ||
      typeof req.body.newSubPage.name !== 'string' ||
      typeof req.body.newSubPage.active !== 'boolean' ||
      typeof req.body.newSubPage.position !== 'number' ||
      typeof req.body.newSubPage.photo_url !== 'string';

    if (badInput) return res.send(400);

    queries.subPageCreate(req.body.newSubPage)
      .then(() => res.send(200))
      .catch(err => res.send(500));
  },

  subPagesUpdate: function subPagesUpdate(req, res) {
    queries.subPageUpdate(req.params.id, req.body.toUpdate)
      .then(() => res.send(200))
      .catch(err => res.send(500));
  },

  subPagesDestroy: function subPagesDestroy(req, res) {
    const badInput = !req.params.id ||
      !validator.isUUID(req.params.id);

    if (badInput) return res.send(400);

    queries.subPageDestroy(req.params.id)
      .then(() => res.send(200))
      .catch(err => res.send(500));
  },

  itemsCreate: function itemsCreate(req, res) {

    const { newItem } = req.body;
    const badInput = !newItem ||
      typeof newItem.id !== 'string' ||
      !validator.isUUID(newItem.id) ||
      typeof newItem.parent_id !== 'string' ||
      !validator.isUUID(newItem.parent_id) ||
      typeof newItem.active !== 'boolean' ||
      (newItem.item_type !== 'prose' && newItem.item_type !== 'image') ||
      typeof newItem.position !== 'number' ||
      typeof newItem.content !== 'string' ||
      typeof newItem.photo_url !== 'string';

    if (badInput) return res.send(400);

    queries.itemCreate(req.body.newItem)
      .then(() => res.send(200))
      .catch(err => res.send(500));
  },

  itemsUpdate: function itemsUpdate(req, res) {
    queries.itemUpdate(req.params.id, req.body.toUpdate)
      .then(() => res.send(200))
      .catch(err => res.send(500));
  },

  itemsDestroy: function itemsDestroy(req, res) {
    const badInput = !req.params.id ||
      !validator.isUUID(req.params.id);

    if (badInput) return res.send(400);

    queries.itemDestroy(req.params.id)
      .then(() => res.send(200))
      .catch(err => res.send(500));
  },

  pagesLockedUpdate: function pagesLockedUpdate(req, res) {

    queries.arePagesLocked()
      .then(data => {
        if (!data[0] || 
          data[0].locked_by === req.session.passport.user ||
          new Date() - data[0].locked_at > 1000 * 60 * 5) {
          console.log('this is happenining');
          queries.lockPages(req.session.passport.user)
            .then(() => res.send(200))
            .catch(err => { console.log(err); res.send(500) });

        } else {
          res.status(401).send({ message: 'another admin is editing the pages now.' });      
        }
      })
      .catch(err => { console.log(err) ; res.send(500) });
  }
});

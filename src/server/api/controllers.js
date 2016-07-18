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
  }
});

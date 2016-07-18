
module.exports = queries => ({
  
  pagesIndex: function pagesIndex(req, res) {
    queries.pagesAll()
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
  }
});

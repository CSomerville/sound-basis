const fs = require('fs');

module.exports = {
  adminIndex: (req, res) => {
    fs.readFile(__dirname + '/../../../bundle/admin-index.html', 'utf8', (err, data) =>
      res.send(data)
    );
  },

  publicIndex: (req, res) => {
    res.send('hello');
  }
}

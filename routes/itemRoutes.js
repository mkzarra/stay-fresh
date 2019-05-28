const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Item = mongoose.model('items');

module.exports = app => {
  app.get('/api/items', (req, res) => {
    console.log(req.body);
  });

  app.post('/api/items');
}
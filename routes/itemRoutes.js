const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Item = mongoose.model('items');

module.exports = app => {
  app.get('/api/items', (req, res) => {
    console.log(req.body);
  });

  app.post('/api/items', async (req, res) => {
    const { itemName, category, storage, datePurchased, expiration } = req.body.item;
    console.log(`Item Routes:\nitemName: ${itemName}\ncategory: ${category}\nstorage: ${storage}\ndatePurchased: ${datePurchased}\nexpiration: ${expiration}`);
    const item = new Item({ itemName, category, storage, datePurchased, expiration });
    try {
      await item.save();
    }
    catch(error) {
      console.log("Error creating new item:\n" + error);
      res.status(422).send(error);
    }
  });
}
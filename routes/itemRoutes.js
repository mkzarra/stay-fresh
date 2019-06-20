const mongoose = require('mongoose');

const Item = mongoose.model('items');

module.exports = app => {
  app.get('/api/items', async (req, res) => {
    try {
      const items = await Item.find();
      console.log(items);
      res.status(200).json({ items });
    }
    catch(error) {
      console.log(error);
      res.status(422).send(error);
    }
  });

  app.post('/api/items', async (req, res) => {
    const { itemName, category, storage, datePurchased, expiration } = req.body.item;
    console.log(`Item Routes:\nitemName: ${itemName}\ncategory: ${category}\nstorage: ${storage}\ndatePurchased: ${datePurchased}\nexpiration: ${expiration}`);
    const item = new Item({ itemName, category, storage, datePurchased, expiration });
    try {
      await item.save();
      res.status(200).json({ item });
    }
    catch(error) {
      console.log("Error creating new item:\n" + error);
      res.status(422).send(error);
    }
  });
}
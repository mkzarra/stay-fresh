const mongoose = require('mongoose');

const cache = require('../services/cache');

const Item = mongoose.model('items');

module.exports = app => {
  app.get('/api/items', async (req, res) => {
    try {
      const items = await Item.find();
      for (let item of items) {
        cache[item._id] = { ...item }
      }
      console.log("\n\nitemRoutes - cache:\n", cache);
      res.status(200).json({ items });
    }
    catch(error) {
      console.log(error);
      res.status(422).send(error);
    }
  });

  app.post('/api/items', async (req, res) => {
    const { itemName, category, storage } = req.body.item;
    console.log(`Item Routes:\nitemName: ${itemName}\ncategory: ${category}\nstorage: ${storage}`);
    const item = new Item({ itemName, category, storage });
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
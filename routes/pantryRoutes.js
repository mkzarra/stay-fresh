const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Pantry = mongoose.model('pantries');

module.exports = app => {
  app.get('/api/pantry', requireLogin, async (req, res) => {
    try {
      const pantry = await Pantry.find({ _user: req.user._id });
      
      res.status(200).json({ pantry });
    }
    catch(error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.get('/api/pantry/:id', requireLogin, async (req, res) => {
    try {
      const pantry = await Pantry.findById(req.params.id);
      
      res.status(200).json(({ pantry }));
    }
    catch(error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.post('/api/pantry', requireLogin, async (req, res) => {
    const { _user , _item, itemName, category, storage, datePurchased, expiration } = req.body;
    const pantry = await new Pantry({ _user, _item, itemName, category, storage, datePurchased, expiration });
    console.log("\n\nPost Item To Pantry Request Body:\n" + JSON.stringify(pantry));
    try {
      await pantry.save();
      res.sendStatus(201);
    }
    catch(error) {
      console.log("\nError creating new pantry:\n" + error);
      res.status(422).send(error);
    }
  });

  app.delete('/api/pantry/:id', requireLogin, async (req, res) => {
    try {
      const pantry = await Pantry.findById(req.params.id);
      const pantryList = await Pantry.find({ _user: req.user_id });
      pantry.remove();

      res.status(204).send(pantryList);
    }
    catch(error) {
      console.log("\nError deleting pantry:\n" + error);
      res.status(404).send(error);
    }
  });

  app.patch('/api/pantry/:id', requireLogin, async (req, res) => {
    try {
      const pantry = await Pantry.findById(req.params.id);
      const updatedItem = await pantry.update(req.body.pantryItem);
      res.status(200).json({ updatedItem });
    } catch (error) {
      console.log("\nError updating pantry:\n" + error);
      res.status(500).send(error);
    }
  });
}
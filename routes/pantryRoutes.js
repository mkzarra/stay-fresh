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
    console.log("\n\nDELETE PANTRY req.params:\n" + JSON.stringify(req.params));
    try {
      const pantry = await Pantry.findById(req.params.id);
      pantry.remove();
      res.sendStatus(204);
    }
    catch(error) {
      console.log("\nError deleting pantry:\n" + error);
      res.status(404).send(error);
    }
  });

  app.patch('/api/pantry/:id', requireLogin, async (req, res) => {
    const { expiration, datePurchased } = req.body;
    console.log("\n\nUPDATE PANTRY req.params:\n" + JSON.stringify(req.params));
    try {
      const pantry = await Pantry.findById(req.params.id);
      pantry.update({ expiration, datePurchased });
      res.sendStatus(204);
    } catch (error) {
      console.log("\nError updating pantry:\n" + error);
      res.status(500).send(error);
    }
  });
}
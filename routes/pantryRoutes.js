const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Pantry = mongoose.model('pantries');

module.exports = app => {
  app.get('/api/pantry', requireLogin, async (req, res) => {
    try {
      const pantry = await Pantry.find({ _user: req.user._id });
      console.log("\n\nPantry items associated with user:\n" + pantry);
      res.status(200).json({ pantry });
    }
    catch(error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.get('/api/pantry/:id', requireLogin, async (req, res) => {
    console.log("\n\nGet Pantry Item Request Body:\n" + JSON.stringify(req.params));
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
    const { _user , _item } = req.body;
    const pantry = new Pantry({ _user, _item });
    console.log("\n\nPost Item To Pantry Request Body:\n" + JSON.stringify(pantry));
    try {
      await pantry.save();
    }
    catch(error) {
      console.log("\nError creating new pantry:\n" + error);
      res.status(422).send(error);
    }
  });

  app.delete('/api/pantry/:id', requireLogin, async (req, res) => {
    console.log("\n\nDELETE PANTRY req.params:\n" + JSON.stringify(req.params));
    try {
      const pantry = await Pantry.findById(req.params.id)
      pantry.remove();
    }
    catch(error) {
      console.log("\nError deleting pantry:\n" + error);
      res.status(500).send(error);
    }
  });
}
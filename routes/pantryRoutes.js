const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const warningTemplate = require('../services/templates/warningEmail');
const cache = require('../services/cache');

const Pantry = mongoose.model('pantries');

module.exports = app => {
  app.get('/api/pantry', requireLogin, async (req, res) => {
    try {
      const pantry = await Pantry.find({ _user: req.user._id });
      // backend cache?
      const items = pantry.map(p => {
        const item = cache[p._item];
        return { ...p, ...item}
      });
      console.log("\n\nPantry items associated with user:\n" + pantry);

      console.log("\n\nitems:\n", items, "\n\ncache:\n", cache, "\n\n");
      const mailer = new Mailer(req.user, "");
      console.log(mailer);
      // mailer.send();
      res.status(200).json({ pantry });
    }
    catch(error) {
      console.log(error);
      res.status(500).send(error);
    }
  });

  app.get('/api/pantry/:id', requireLogin, async (req, res) => {
    console.log("\n\nGet Pantry Item Request Body:\n" + JSON.stringify(req.params));
    const { itemName, _id, expiration } = req.body;
    const email = { itemName, _id, expiration, _user: req.user.id }
    // const mailer = new Mailer(email, warningTemplate(email));
    // console.log(mailer);
    // mailer.send()
    /* mailer needs pantry item first. must give pantry id of
    expiring item and all data associated with pantry id. */
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
    const { _user , _item, datePurchased, expiration } = req.body;
    const pantry = new Pantry({ _user, _item, datePurchased, expiration });
    console.log("\n\nPost Item To Pantry Request Body:\n" + JSON.stringify(pantry));
    try {
      await pantry.save();
      res.sendStatus(200);
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
      res.sendStatus(200);
    }
    catch(error) {
      console.log("\nError deleting pantry:\n" + error);
      res.status(404).send(error);
    }
  });
}
const mongoose = require('mongoose');
const Email = mongoose.model('emails');

const Mailer = require('../services/Mailer');

module.exports = app => {
  app.post('/api/emails', async (req, res) => {
    const { title, subject, body, recipient } = req.body;
    const email = await new Email({ title, subject, body, recipient });
    try {
      await email.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
}
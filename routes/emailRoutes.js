const mongoose = require('mongoose');
const Email = mongoose.model('emails');

const Mailer = require('../services/Mailer');

module.exports = app => {
  app.post('/api/emails', async (req, res) => {
    const { title, subject, body, recipient } = req.body;
    try {
      const email = await new Email({ title, subject, body, recipient });

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
}
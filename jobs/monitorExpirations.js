const cron = require('node-cron');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const Pantry = mongoose.model('pantries');

const Mailer = require('../services/Mailer');
const pantryTemplate = require('../services/templates/pantryEmail');

const monitorExpiration = cron.schedule('* * * * Sunday', function() {
  // make a query to Pantry and User collections pass the data to the mailer.
  const mailer = new Mailer(user, pantryItems.map(item => pantryTemplate(item)));
  console.log('\n\nMailer in cron job:\n', mailer);
  mailer.send();
}, {
  scheduled: true,
  timezone: "America/New_York"
});

module.exports = {
  monitorExpiration
}
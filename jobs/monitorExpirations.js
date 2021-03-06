const cron = require('node-cron');
const mongoose = require('mongoose');

const User = mongoose.model('users');

const Mailer = require('../services/Mailer');
const pantryTemplate = require('../services/templates/pantryEmail');

const monitorExpiration = cron.schedule('0 0 * * Friday', function() {

  User.aggregate([{
    $lookup: {
      from: "pantries",
      localField: '_id',
      foreignField: '_user',
      as: 'pantries'
    }
  }],
  function(error, data) {
    if (error) return error;

    for (let user of data) {
      if (user.pantries.length > 0) {
        const mailer = new Mailer(user, user.pantries.map(item => pantryTemplate(item)));
        mailer.send();
      }
    }
  });
});

module.exports = {
  monitorExpiration
}
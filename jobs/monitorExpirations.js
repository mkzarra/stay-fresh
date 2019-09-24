const cron = require('node-cron');
const Mailer = require('../services/Mailer');
const pantryTemplate = require('../services/templates/pantryEmail');

const monitorExpiration = cron.schedule('* * * * Sunday', (user, pantryItems) => {

  //const shelfLife = pantryItem.expiration - pantryItem.datePurchased;
  //const expProximity = pantryItem.expiration - new Date(Date.now());
  const mailer = new Mailer(user, pantryItems.map(item => pantryTemplate(item)));
  const d = new Date();
  console.log('onTick:', d);
  console.log('\n\nMailer in cron job:\n', mailer);
  mailer.send();
  // // Daily
  // if (expProximity < 60000) console.log("expired");
  
  // // only warn 1 day before exp
  // if (shelfLife < (3600000 * 24 * 3) && expProximity < 3600000 * 28) {
  //   console.log("expires in one day");
  // }
  
  // Daily
  // if (expProximity < (3600000 * 24 * 3) && shelfLife <= (3600000 * 24 * 7)) {
  //   console.log("Expires in 3 days");
  // }
  
  // // Weekly
  // if (shelfLife > (3600000 * 24 * 7) && expProximity <= (3600000 * 24 * 7)) {
  //   console.log("Will expire this week on" + pantryItem.expiration);
  // }

}, {
  scheduled: true,
  timezone: "America/New_York"
});

module.exports = {
  monitorExpiration
}

/*
  // Every Sunday //--> list of items set to expire this week.

  // Every First of Month //--> List of items to expire this month.
*/
const cron = require('node-cron');
const Mailer = require('../services/Mailer');

const monitorExpiration = cron.schedule('* 1 * * *', (pantryItem, email) => {

  //const shelfLife = pantryItem.expiration - pantryItem.datePurchased;
  //const expProximity = pantryItem.expiration - new Date(Date.now());
  const mailer = new Mailer("", "");
  console.log(mailer)
  mailer.send()
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

});

module.exports = {
  monitorExpiration
}

/*
  // Every Sunday //--> list of items set to expire this week.

  // Every First of Month //--> List of items to expire this month.
*/
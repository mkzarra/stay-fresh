const translateDate = require('../translateDate');
const templateMain = require('./templateMain');

const pantryEmail = pantry => (`
  <div style="text-align: 'center'">
    <h3><strong>${pantry.itemName}</strong></h3>
    <p>Category: ${pantry.category}</p>
    <p>Storage: ${pantry.storage}</p>
    <p>Purchased On: ${translateDate(pantry.datePurchased)}</p>
    <p>Expiration: ${translateDate(pantry.expiration)}</p>
  </div>
`);

module.exports = templateMain(pantryEmail);
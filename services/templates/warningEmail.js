const keys = require("../../config/keys");
const translateDate = require('../translateDate');

module.exports = pantry => (`
  <div style="text-align: center;">
    <h3>Your ${pantry.itemName} is about to expire!</h3>
    <p>Use this before it expires on ${translateDate(pantry.expiration)}.</p>
    <p>Need a little inspiration</p>
    <p>
      <a href="google.com/search?q=${pantry.itemName.split(' ').map(i => i.trim()).join("+")}+recipes">
        Click here to find a recipe!
      </a>
    </p>
    <p><a href="${keys.redirectDomain}">Manage your inventory and Stay Fresh!</a></p>
  </div>
`);
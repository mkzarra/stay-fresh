const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const translateDate = require('./translateDate');

class Mailer extends helper.Mail {
  constructor(user, content) {
    super();

    sgMail.setApiKey(keys.sendGridKey);
    this.user = user;
    this.content = content;
    // this.items = this.formatContent(this.content).bind(this);
  }

  // formatContent(items) {
  //   return items.map(item => {
  //     `<div style="{text-align: 'center'}">
  //       <h3><strong>${item.itemName}</strong></h3>
  //       <p>Storage: ${item.storage}</p>
  //       <p>Category: ${item.storage}</p>
  //       <p>Purchased on: ${translateDate(item.datePurchaced)}</p>
  //       <p>Expiration: ${translateDate(item.expiration)}</p>
  //     </div>`
  //   });
  // }

  async send() {

    sgMail.send({
      to: this.user.email,
      from: 'mkzarra@gmail.com',
      subject: "My very cool email.",
      html: `
      <p> WOWO! </p>
      <div>
        ${this.content}
      </div>
      `
    });
  
  }
}

module.exports = Mailer;
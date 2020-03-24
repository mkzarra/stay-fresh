const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor(user, content) {
    super();

    sgMail.setApiKey(keys.sendGridKey);
    this.user = user;
    this.content = content;
  }

  async send() {

    sgMail.send({
      to: this.user.email,
      from: 'mkzarra@gmail.com',
      subject: "Stay Fresh - inventory update",
      html: `      
      <div>
        ${this.content}
      </div>
      `
    });
  
  }
}

module.exports = Mailer;
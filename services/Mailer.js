const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // TODO: require full pantry item and user email
  constructor(user, content) {
    super();

    sgMail.setApiKey(keys.sendGridKey);
    this.user = user;
  }


  async send() {

    sgMail.send({
      to: this.user.email,
      from: 'mkzarra@gmail.com',
      subject: "My very cool email.",
      html: "<p> WOWO! </p>",
    });
  
  }
}

module.exports = Mailer;
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // TODO: require full pantry item and user email
  constructor(user, content) {
    super();

    sgMail.setApiKey(keys.sendGridKey);
  }

  formatAddresses(user) {
    return helper.Email(user.email);
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  add_user() {
    const personalize = new helper.Personalization();

    personalize.addTo(this.user);
    this.addPersonalization(personalize);
  }

  async send() {

    sgMail.send({
      to: 'mkzarra@gmail.com',
      from: 'mkzarra@gmail.com',
      subject: "My very cool email.",
      html: "<p> WOWO! </p>",
    });
  
  }
}

module.exports = Mailer;
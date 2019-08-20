const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  // TODO: require full pantry item and user email
  constructor(user, content) {
    super();

    sgMail.setApiKey(keys.sendGridKey);
//    this.sgApi = sendgrid(keys.sendGridKey);
    //this.from_email = new helper.Email('no-reply@stayfresh.com');
    //this._id = pantryItem._id;
    //this.body = new helper.Content('text/html', content);
    //this.email = this.formatAddresses(this.user);
    //this.user = user;

    // //this.addContent(this.body);
    // this.addClickTracking();
    // this.add_user();
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

    let msg = {
      to: 'mkzarra@gmail.com',
      from: 'mkzarra@gmail.com',
      subject: "My very cool email.",
      html: "<p> WOWO! </p>",
    };
    sgMail.send(msg);
  //   const request = this.sgApi.emptyRequest({
  //     method: 'POST',
  //     path: '/v3/mail/send',
  //     body: this.toJSON()
  //   });

  //   const response = await this.sgApi.API(request);
  //   return response;
  // }
}
}

module.exports = Mailer;
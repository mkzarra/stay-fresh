const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ _id, _user }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@stayfresh.com');
    this._id = _id;
    this.body = new helper.Content('text/html', content);
    this._user = this.formatAddresses(_user);

    this.addContent(this.body);
    this.addClickTracking();
    this.add_user();
  }

  formatAddresses(_user) {
    return helper.Email(_user.email);
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  add_user() {
    const personalize = new helper.Personalization();

    personalize.addTo(this._user);
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
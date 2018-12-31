const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor(email, content) {
    super();


    this.sendGridApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@yelpcamp.com');
    this.subject = "YelpCamp Verification";
    this.body = new helper.Content('text/html', content);
    this.recipient = {
      email: email
    };

    this.addContent(this.body);
    this.addRecipients();
  }

  addRecipients() {
    var personalize = new helper.Personalization();
    personalize.addTo(this.recipient);
    this.addPersonalization(personalize);
  }



  async send() {
    const request = this.sendGridApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sendGridApi.API(request);
    return response;
  }

}

module.exports = Mailer;

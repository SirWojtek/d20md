const env = require('../environment/environment');

const aws = require('aws-sdk');
aws.config.loadFromPath('./aws/config-email.json');

const ses = new aws.SES();

const sender = 'd20.monster.designer@gmail.com'

function getValidationTemplate(to, code) {
  return `
Hello ${to}!

Your d20 monster designer account is almost ready to use.
Click on the the link to activate it: ${env.host}/activate/${code}.

Cheers,
d20md team
  `;
}

function getRecoveryTemplate(code) {
  return `
Hello,

We email you according to your reset password request.
To finish that process, please follow the link: ${env.host}/change-password/${code}.
If you did not require the password reset, please ignore this email.

Cheers,
d20md Team
  `;
}

module.exports = {
  sendVerificationEmail: function (to, code) {
    return new Promise((resolve, reject) => {
      ses.sendEmail({
        Source: sender,
        Destination: { ToAddresses: [ to ] },
        Message: {
          Subject: {
            Data: 'Welcome to d20 monster designer!'
          },
          Body: {
            Text: {
              Data: getValidationTemplate(to, code),
            }
          }
        }
      },
      (err, data) => {
        if (err) { reject(err); }
        resolve(data);
      });
    });
  },
  sendRecoveryEmail: function (to, code) {
    return new Promise((resolve, reject) => {
      ses.sendEmail({
        Source: sender,
        Destination: { ToAddresses: [ to ] },
        Message: {
          Subject: {
            Data: 'd20 monster designer password recovery request'
          },
          Body: {
            Text: {
              Data: getRecoveryTemplate(code),
            }
          }
        }
      },
      (err, data) => {
        if (err) { reject(err); }
        resolve(data);
      });
    });
  }
}


const request = require('request-promise');
const url = 'https://www.google.com/recaptcha/api/siteverify';
const secret = process.env.RECAPTCHA_SECRET;

module.exports = {
  checkRecaptcha: (recaptchaCode) => {
    if (!secret && process.env.NODE_ENV === 'production') {
      throw Error('Recaptcha secret not found for production environment');
    }
    else if (!secret) {
      return Promise.resolve(null);
    }

    const options =  {
      method: 'POST',
      url: url,
      form: {
        secret: secret,
        response: recaptchaCode,
      },
    };

    return request(options)
    .then(res => {
      const json = JSON.parse(res);
      if (!json.success) {
        throw new Error('Recaptcha verification failed');
      }
    });
  }
}

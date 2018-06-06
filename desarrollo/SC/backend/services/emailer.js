const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { keys } = require('../config/keys');

const smtpTransport = nodemailer.createTransport({
  service: 'SendGrid', //pasar a config
  auth: {
    user: keys.sendGridUser,
    pass: keys.sendGridPass
  }
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));


exports.sendVerification = (options, callback) => {
  const { email, token, host, name } = options;
  
  // mover el host a config
  const data = {
    from: 'no-reply@chasqui.com', //pasar a config
    to: email,
    subject: 'Account Verification Token',
    template: 'verify-email',
    context: {
      url: `http://http://206.189.175.34:5000/confirmation/${token}`,
      name
    }
  };

  smtpTransport.sendMail(data, (err, info) => {
    callback(err, info);
  });
}

exports.sendForgot = (options, callback) => {
  const { email, token, host, name } = options;

  // mover el host a config
  const data = {
    from: 'no-reply@chasqui.com', //pasar a config
    to: email,
    subject: 'Password help has arrived!',
    template: 'forgot-password-email',
    context: {
      url: `http://${host}/confirmation/${token}`,
      name
    }
  };

  smtpTransport.sendMail(data, (err, info) => {
    callback(err, info);
  });
}

exports.sendReset = (options, callback) => {
  const { email, name } = options;
  const data = {
    from: 'no-reply@chasqui.com', //pasar a config
    to: email,
    subject: 'Password Reset Confirmation',
    template: 'reset-password-email',
    context: {
      name
    }
  };

  smtpTransport.sendMail(data, (err, info) => {
    callback(err, info);
  });
}

const nodemailer = require('nodemailer');
const { keys } = require('../config/keys');

exports.sendVerification = (options, callback) => {
  const { email, token, host } = options;
  // mover el host a config
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: keys.sendGridUser,
      pass: keys.sendGridPass
    }
  });

  const emailOptions = {
    from: 'no-reply@chasqui.com',
    to: email,
    subject: 'Account Verification Token',
    text: `Hello
          
          Please verify your account by clicking the link:
          http://${host}/confirmation/${token}.
          `
  }

  transporter.sendMail(emailOptions, (err, info) => {
    callback(err, info);
  })

}

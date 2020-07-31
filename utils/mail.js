const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const emailTemplate = ({ name, email, subject, body }) => `
  <div>
    <h2>I'm ${name} and my email is ${email}</h2>
    <h4>${subject}</h4>
    <p>${body}</p>
  </div>
`;

exports.transport = transport;
exports.emailTemplate = emailTemplate;

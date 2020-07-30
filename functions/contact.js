const { transport, emailTemplate } = require('../utils/mail');
exports.handler = async (event, _context, callback) => {
  console.log(emailTemplate(event.body));
  try {
    const res = await transport.sendMail(emailTemplate(event.body));
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ sent: true }),
    });
  } catch (err) {
    callback(err, null);
  }
};

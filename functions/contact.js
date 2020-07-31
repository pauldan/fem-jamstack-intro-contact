const { transport, emailTemplate } = require('../utils/mail');
exports.handler = async (event, _context, callback) => {
  const email = JSON.parse(event.body);
  console.log(emailTemplate(email));
  try {
    const res = await transport.sendMail({
      from: 'contact@form.abc',
      to: 'email@form.abc',
      subject: email.subject,
      html: emailTemplate(body),
    });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ sent: true }),
    });
  } catch (err) {
    callback(err, null);
  }
};

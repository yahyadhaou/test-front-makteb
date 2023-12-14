const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  port: 587,
  host: 'smtp.gmail.com',
  auth: {
    user: 'yahya.dhaou75@gmail.com',
    pass: 'Ya.12.dh',
  },
  secure: true,
});

const sendIt = (req, res) => {
  const mailData = {
    from: 'demo@demo.com',
    to: 'yahya.dhaou75@gmail.com',
    subject: `Message from: ${req.body.name} - Number: ${req.body.tel}`,
    text: req.body.message,
  };

  console.log(mailData);

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error sending email');
    } else {
      console.log(info);
      res.status(200).send('Email sent successfully');
    }
  });
};

module.exports = sendIt;
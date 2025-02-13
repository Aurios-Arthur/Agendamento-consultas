const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "167fa6c6aa7f49",
      pass: "9e41481d600ec0"
    }
  });

const sendEmail = (to, subject, text) => {
    console.log('Preparando para enviar e-mail para:', to);
    
    const mailOptions = {
        from: 'nao-responder@clinica.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar e-mail:', error);
        } else {
            console.log('E-mail enviado:', info.response);
        }
    });
};

module.exports = sendEmail;
function sendEmail(email,subject,body,callback){
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mostionsoftpvtltd@gmail.com',
          pass: 'motionsoft2021'
        }
      });
    
      var mailOptions = {
        from: 'mostionsoftpvtltd@gmail.com',
        to: email,
        subject: subject,
        html:body
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        callback(error,info)
      });
}
module.exports = {
    sendEmail:sendEmail
}
function function1(){
    const cryptoJs = require('crypto-js')

    const password = 'test'
    
    console.log(`encrypt password: ${cryptoJs.SHA1(password)}`)
}

function function2(){
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
        to: 'akash9753@gmail.com',
        subject: 'congratulation',
        text: 'That was easy!'
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
function2()
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'molecularplayground@gmail.com',
        pass: 'ihearttim497'
    }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Molecular Playground <molecularplayground@gmail.com>', // sender address
    to: 'molecularplayground@gmail.com', // list of receivers
    subject: 'Message From Molecular Playground', // Subject line
    text: "This is an autogenerated email from Molecular Playground that has been sent in error. Please disregard.", // plaintext body
    html: "<p>This is an autogenerated email from Molecular Playground that has been sent in error. Please disregard.</p>" // html body
};


// PUT: send the email!
router.put('/validate', function(req, res, next) {
  mailOptions.text = "Hi there!\nWe're so glad you've joined.  Follow the link below to verify your account.\nThanks!\nThe Molecular Playground Team";
  mailOptions.html = "<p>Hi there!</p><p>We so glad you've joined. Follow the link below to verify your account.</p><p>Thanks!</p><p>The Molecular Playground Team</p>";
  mailOptions.subject = 'Welcome to Molecular Playground!';
  if (req.body.email) {
    mailOptions.to = req.body.email;
  }
  if (req.body.link) {
    mailOptions.text += "\n Your link: " + req.body.link;
    mailOptions.html += "<p> Your link: " + req.body.link + "</p>";
  }
  console.log(req.body);
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } 
    else {
      console.log('Message sent: ' + info.response);
    }
  });
});


router.put('/general', function(req, res, next) {
  if (req.body.email) {
    mailOptions.to = req.body.email;
  }
  if(req.body.subject) mailOptions.subject = req.body.subject;
  if(req.body.text) {
    mailOptions.text = req.body.text;
  }
  if(req.body.html) mailOptions.html = req.body.html;
  console.log(req.body);
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } 
    else {
      console.log('Message sent: ' + info.response);
    }
  });
});




module.exports = router;
const nodemailer = require("nodemailer");
const xoauth2 = require('xoauth2');
var handlebars = require('handlebars');
var fs = require('fs');


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "",
    clientId: "",
    clientSecret: "",
    refreshToken: "",
    accessToken: ""
  }
});

// Event details
var ename = "Smart Technology for Industry 4.0";
var edate = "Tuesday, 10 September 2019";

//Receiver details
var pointv = 8;
var emails=["email2", "email2"]
var names=["nama1", "nama2"];
var nos =["no1", "no2"];

var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};


// iterator
var i=0;

readHTMLFile(__dirname + '/resources/views/pages/MailPoint.html', function(err, html) {
  var template = handlebars.compile(html);
  var replacements = {
    event_name: ename,
    event_date: edate,
    point_value: pointv,
    username: names[i],
    point_no: nos[i]
  };
  var htmlToSend = template(replacements);
  var mailOptions = {
    from: 'noreply',
    to: emails[i],
    subject: `Thank you, ${names[i]}`,
    html: htmlToSend
  }
  transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error');
    } else {
        console.log('Email Sent');
    }
  });
});



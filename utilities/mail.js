var nodemailer = require('nodemailer')

var mailer = {
    send : (pack, callback) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'oshan_shrestha@outlook.com',
                pass: process.env.MAIL_PASS || "Constructible"
            },
            tls:{
              rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: 'oshan_shrestha@outlook.com',
            to: pack.email,
            subject: `Email Confirmation : KU Connect`,
            html: setMessage(pack)
        };
        transporter.sendMail(mailOptions, function(error, info){
            callback(error, info)
        })
    },
    resetPassword: (pack, callback) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'oshan_shrestha@outlook.com',
                pass: process.env.MAIL_PASS || "Constructible"
            },
            tls:{
              rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: 'oshan_shrestha@outlook.com',
            to: pack.email,
            subject: `Email Confirmation : KU Connect`,
            html: createMessage(pack)
        };
        transporter.sendMail(mailOptions, function(error, info){
            callback(error, info)
        })
    }
};

var setMessage = (pack) => {
    return `<html><head><link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"><style>p, span {font-family: "Open Sans", sans-serif;}</style></head>
            <body><p>Hello, ${pack.name}!</p>Your confirmation code is:<br/><span style="font-weight: 900">${pack.emailPin}</span></body></html>`
}
var createMessage = pack => {
    return `<html><head><link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"><style>p, span {font-family: "Open Sans", sans-serif;}</style></head>
            <body><p>Hello, ${pack.name}!</p>Your new pin is:<br/><span style="font-weight: 900">${pack.resetPin}</span></body></html>`
}
module.exports = mailer
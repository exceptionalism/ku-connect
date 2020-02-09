var nodemailer = require('nodemailer')

var mailer = {
    send : (pack, callback) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'kuconnection@outlook.com',
                pass: process.env.MAIL_PASS || "Connection2020"
            },
            tls:{
              rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: 'kuconnection@outlook.com',
            to: pack.email,
            subject: `KU Connect : Email Confirmation`,
            html: setMessage(pack)
        };
        transporter.sendMail(mailOptions, function(error, info){
            callback(error)
        })
    },
    resetPassword: (pack, callback) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'kuconnection@outlook.com',
                pass: process.env.MAIL_PASS || "Connection2020"
            },
            tls:{
              rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: 'kuconnection@outlook.com',
            to: pack.email,
            subject: `KU Connect : Password Reset`,
            html: createMessage(pack)
        };
        transporter.sendMail(mailOptions, function(error, info){
            callback(error)
        })
    },
    accountRegistered: (pack, callback) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'kuconnection@outlook.com',
                pass: process.env.MAIL_PASS || "Connection2020"
            },
            tls:{
              rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: 'kuconnection@outlook.com',
            to: pack.email,
            subject: `KU Connect : Account created successfully`,
            html: registeredMessage(pack)
        };
        transporter.sendMail(mailOptions, function(error, info){
            callback(error)
        })
    }
};

var setMessage = (pack) => {
    return `<html>
            <head>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                <style>p, span {font-family: "Open Sans", sans-serif;}</style>
            </head>
            <body>
                <div class="container">
                    <p>Hello, ${pack.name}!</p>
                    Your confirmation code is:<br/><span style="font-weight: 900">${pack.emailPin}</span>
                </div>
            </body>
            </html>`
}
var createMessage = pack => {
    return `<html>
            <head>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                <style>p, span {font-family: "Open Sans", sans-serif;}</style>
            </head>
            <body>
                <div class="container">
                    <p>Hello, ${pack.name}!</p>
                    Your new pin is:<br/><span style="font-weight: 900">${pack.resetPin}</span>
                </div>
            </body>
            </html>`
}
var registeredMessage = pack => {
    return `<html>
            <head>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                <style>p, span {font-family: "Open Sans", sans-serif;}</style>
            </head>
            <body>
                <div class="container">
                    <p>Hello, ${pack.name}!</p>
                    Your KU-Connect account has been created with following credentials.
                    <pre>
                        <ul>
                            <li><b>Identity Code:</b> ${pack.code}</li>
                            <li><b>Pin:</b> ${pack.pass}</li>
                        </ul>
                    </pre>
                    <p>Please, keep this information safe.</p>
                </div>
            </body>
            </html>`
}
module.exports = mailer
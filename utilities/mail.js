var nodemailer = require('nodemailer')

var mailer = {
    confirmEmail: (pack, callback) => {
        send(pack, `KU Connect : Email Confirmation`, setMessage, callback)
    },
    resetPassword: (pack, callback) => {
        send(pack, `KU Connect : Password Reset`, createMessage, callback)
        // var transporter = nodemailer.createTransport({
        //     host: 'smtp.office365.com',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'kuconnection@outlook.com',
        //         pass: process.env.MAIL_PASS || "Connection2020"
        //     },
        //     tls:{
        //       rejectUnauthorized: false
        //     }
        // });
        // var mailOptions = {
        //     from: 'kuconnection@outlook.com',
        //     to: pack.email,
        //     subject: `KU Connect : Password Reset`,
        //     html: createMessage(pack)
        // };
        // transporter.sendMail(mailOptions, function(error, info){
        //     callback(error)
        // })
    },
    accountRegistered: (pack, callback) => {        
        send(pack, `KU Connect : Account created successfully`, registeredMessage, callback)
        // var transporter = nodemailer.createTransport({
        //     host: 'smtp.office365.com',
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: 'kuconnection@outlook.com',
        //         pass: process.env.MAIL_PASS || "Connection2020"
        //     },
        //     tls:{
        //       rejectUnauthorized: false
        //     }
        // });
        // var mailOptions = {
        //     from: 'kuconnection@outlook.com',
        //     to: pack.email,
        //     subject: `KU Connect : Account created successfully`,
        //     html: registeredMessage(pack)
        // };
        // transporter.sendMail(mailOptions, function(error, info){
        //     callback(error)
        // })
    }
};
const send = (pack, subject, message, callback) => {
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
        subject: subject,
        html: message(pack)
    };
    transporter.sendMail(mailOptions, function(error, info){
        callback(error)
    })
}
const messageHeader = `<html>
<head>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <style>p, span {font-family: "Open Sans", sans-serif;}</style>
</head>
<body>
    <div class="container">`;
const messageFooter = `</div>
</body>
</html>`

var setMessage = (pack) => {
    return `${messageHeader}
                <p>Hello, ${pack.name}!</p>
                Your confirmation code is:<br/><span style="font-weight: 900">${pack.emailPin}</span>
            ${messageFooter}`
}
var createMessage = pack => {
    return `${messageHeader}
                <p>Hello, ${pack.name}!</p>
                Your new pin is:<br/><span style="font-weight: 900">${pack.resetPin}</span>
            ${messageFooter}`
}
var registeredMessage = pack => {
    return `${messageHeader}
                <p>Hello, ${pack.name}!</p>
                Your KU-Connect account has been created with following credentials.
                <pre>
                    <ul>
                        <li><b>Identity Code:</b> ${pack.code}</li>
                        <li><b>Pin:</b> ${pack.pass}</li>
                    </ul>
                </pre>
                <p>Please, keep this information safe.</p>
            ${messageFooter}`
}
module.exports = mailer
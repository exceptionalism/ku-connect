const md5 = require('md5')

const hash = code => md5(code);
const generateToken = pass => md5(md5(pass));
const generatePin = () => Math.floor((Math.random() + 1)*1000);
const getNewToken = (code, pass) => {
    return {
        "expiration": Date.now() + 1000 * 3600 * 24 * 30,
        "ticket": generateToken(Date.now() + code + pass)
    }
}
const generateResetPin = () => {
    return parseInt((Math.floor((Math.random() + 1)*1000)*Date.now()).toString().substr((Math.random+1)*10, 4))
}

module.exports = {
    hash, generateToken, generatePin, getNewToken, generateResetPin
}
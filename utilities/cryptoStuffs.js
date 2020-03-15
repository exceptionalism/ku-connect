const crypto = require('crypto')

const hash = code => {
    console.log(`Code: ${code}`)
    let has = crypto.pbkdf2Sync(code.toString(), 'secretSaltIng215%#', 1, 32, 'sha512')
    return has.toString('hex')
}
const generateToken = pass => hash(hash(pass));
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
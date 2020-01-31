const User = require('../models/User')

module.exports = checkLoggedIn = async (req, res, next) => {
    const { token } = req.body
    if (!token)
        res.json({"token": "Token is required."})
    else if (Date.now() > token.expiration)
        res.json({"token": "Session has expired."})
    else {
        let user = await User.findOne({ token })
        if (!user)
            res.json({"token": "Token does not exist."})
        else {
            res.locals.user = user
            next();
        }
    }
}
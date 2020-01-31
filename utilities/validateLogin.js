module.exports = checkForLogin = (req, res, next) => {
    const { code, pass } = req.body
    let errorMessage = {}
    if (!pass)
        errorMessage.pass = "Password is required."
    if (!code)
        errorMessage.code = "Student Identity code is required."
    if (errorMessage.code || errorMessage.pass)
        res.json(errorMessage)
    else
        next()
}
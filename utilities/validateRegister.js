module.exports = checkForRegistration = (req, res, next) => {
    const { name, email, code } = req.body
    console.log(name, email, code)
    let errorMessage = {}
    if (!name)
        errorMessage.name = "Name is required."
    if (!email)
        errorMessage.email = "Email is required."
    if (!code)
        errorMessage.code = "Student Identity code is required."
    if (errorMessage.name || errorMessage.email || errorMessage.code)
        res.json(errorMessage)
    else
        next()
}
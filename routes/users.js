const express =  require("express")
const User = require('../models/User')
const AppSettings = require('../models/Settings')
const mailer = require('../utilities/mail')
const checkForLogin = require('../utilities/validateLogin')
const checkForRegister = require('../utilities/validateRegister')
const checkLoggedIn = require('../utilities/validateLoggedIn')

const router = express.Router()

const { hash, generatePin, getNewToken, generateResetPin } = require('../utilities/cryptoStuffs')


router.post('/create', checkForRegister, async (req, res) => {
    const { name, email, code } = req.body
    try {
        let user = await User.findOne({ code })
        if (!user) {
            user = await User.findOne({email})
            if (!user) {
                let joinYear = 20 + code.substr(6, 2)

                let d = new Date()
                let currentYear = d.getFullYear() - joinYear + (d.getMonth() <= 6 ? 0 : 1)

                let faculty = code.substr(4, 2)

                let pass = 0000
                let check = false
                while (!check) {
                    pass = generatePin()
                    console.log("Checking pass")
                    let flag = await User.findOne({ pass })
                    check = flag ? false : true;
                }
                
                let password = hash(pass)
                
                let token = getNewToken(code, pass)
                
                let emailPin = generatePin()+generatePin() || 00000

                user = new User({
                    name,
                    email,
                    code,
                    faculty,
                    joinYear,
                    currentYear,
                    token,
                    password,
                    emailPin,
                    emailConfirmed: false
                })
                await user.save()

                mailer.send({email, name, emailPin}, (error, info) => {
                    console.log(error, info)
                })

                res.status(201).json({user, pass})
            } else {
                res.json({"Error": "Email already exists."})
            }
        } else {
            res.status(409).json({
                "Error": "Code already registered."
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send(`Error. ${err.message}`)
    }
})

router.post('/signin', checkForLogin, async (req, res) => {
    const { code, pass } = req.body
    try {
        let user = await User.findOne({ code })

        if (!user) {
            res.status(409).json({
                "Error": "username not registered to the database."
            })
        } else {
            if (user.password === hash(parseInt(pass))) {
                user.token = getNewToken(code, pass)
                token = user.token
                user = new User(
                    user
                )
                await user.save();
                res.status(200).json({
                    success: "Authorized",
                    token
                })
            } else {
                res.status(400).json({
                    error: "Password did not match."
                })
            }
        }
    } catch (err) {
        res.status(500).send(`Error. ${err.message}`)
    }
})


router.post('/signout', checkLoggedIn, async (req, res) => {
    const { token } = req.body
    let user = res.locals.user
    user.token = {
        expiration: 0,
        ticket: ""
    }
    user = new User(
        user
    )
    await user.save();
    res.status(200).json({
        success: "signed out"
    })
})

router.post('/confirm-email', checkLoggedIn, async (req, res) => {
    const { emailPin } = req.body
    let user = res.locals.user
    if (user.emailPin == emailPin) {
        user.emailConfirmed = true
        user = new User(user)
        try {
            await user.save()
            res.status(200).json({error: null})
        } catch (err) {
            res.json({error: err.message})
        }
    }
})

router.post('/resend-confirmation-email', checkLoggedIn, async (req, res) => {
    let { email, name, emailPin } = res.locals.user
    mailer.send({email, name, emailPin}, (error, info) => {
        console.log(error, info)
    })
    res.status(200).json({error: null})
})

router.patch('/email', checkLoggedIn, async (req, res) => {
    let { email } = req.body
    let dummyUser = await User.findOne({ email })
    if (!dummyUser) {
        let user = res.locals.user
        user.email = email
        if (user.emailConfirmed) {
            user.emailPin = generatePin()+generatePin() || 00000
        }
        try {
            user = new User(user)
            await user.save()
            mailer.send({
                email: email,
                name: user.name,
                emailPin: user.emailPin
            }, (error, info) => {
                console.log(error, info)
            })
            res.status(200).json({error: null})
        } catch (err) {
            res.json({error: err.message})
        }
    } else {
        res.json({error: "Cannot update email because provided email already exists."})
    }
})

router.patch('/reset-password', checkLoggedIn, async (req, res) => {
    let newPin = generateResetPin()
    console.log(newPin)
    let user = res.locals.user
    mailer.resetPassword({
        email: user.email,
        name: user.name,
        resetPin: newPin
    }, (error, info) => {
        console.log(error, info)
    })
    try {
    let password = hash(newPin)
    let doc = await User.findByIdAndUpdate(user, {password})
    console.log("Updated: ", doc)
    if (doc)
        res.status(200).json({"Error": null})
    else
        res.status(501).json({"Error": "Error updating database."})
    } catch (e) {
        res.status(500).json({"Error": e.message})
    }
})
router.patch('/sync-settings', checkLoggedIn, async (req, res) => {
    const { notification = true, timer = 10 } = req.body
    let user = res.locals.user
    let doc = await AppSettings.findOne({user})
    if (doc) {
        try {
            let updatedDoc = await AppSettings.findOneAndUpdate({user: user._id}, {notification, timer})
            if (updatedDoc)
                res.json({"Error": null})
            else
                res.json({"Error": "Error updating database."})
        } catch (e) {
            res.json({"Error": e.message})
        }
    } else {
        let newDoc = new AppSettings({
            user: user._id,
            notification, timer
        })
        let savedDoc = await newDoc.save()
        if (savedDoc)
            res.json({"Error": null})
        else
            res.json({"Error": "Error updating database."})
    }
})
router.post('/get-settings', checkLoggedIn, async (req, res) => {
    let user = res.locals.user
    try {
        let settings = await AppSettings.findOne({ user })
        if (settings)
            res.json({
                Error: null,
                data: {
                    notification: settings.notification,
                    timer: settings.timer
                }
            })
        else
            res.json({
                Error: "Remote setting data does not exist."
            })
    } catch (e) {
        res.json({
            Error: e.message
        })
        console.log(e.message)
    }
})


module.exports = router
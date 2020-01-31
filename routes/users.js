const express =  require("express")
const md5 = require('md5')
const User = require('../models/User')
const mailer = require('../utilities/mail')
const checkForLogin = require('../utilities/validateLogin')
const checkForRegister = require('../utilities/validateRegister')
const checkLoggedIn = require('../utilities/validateLoggedIn')

const router = express.Router()

const hash = code => md5(code);
const generateToken = pass => md5(md5(pass));
const generatePin = () => Math.floor((Math.random() + 1)*1000);
const getNewToken = (code, pass) => {
    return {
        "expiration": Date.now() + 1000 * 3600 * 24 * 30,
        "ticket": generateToken(Date.now() + code + pass)
    }
}


router.post('/create', checkForRegister, async (req, res) => {
    const { name, email, code } = req.body
    try {
        let user = await User.findOne({ code })
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

module.exports = router
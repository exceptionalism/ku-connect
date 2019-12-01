const express =  require("express")
const md5 = require('md5')
const User = require('../models/User')

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



router.post('/create', async (req, res) => {
    const { name, code } = req.body
    console.log("username: ", name)
    console.log("code: ", code)

    if (name.length > 0 && code.length > 0) {
        try {
            console.log("Checking user")
            let user = await User.findOne({ code })

            if (user) {
                res.status(409).json({
                    "Error": "Code already registered."
                })
            } else {
                let joinYear = 20 + code.substr(6, 2)
                let currentYear = (new Date()).getFullYear() - joinYear + 1
                let faculty = code.substr(4, 2)
                let pass = 0000
                let check = false
                while (!check) {
                    pass = generatePin()
                    console.log("Checking pass")
                    let flag = await User.findOne({ pass })
                    check = flag ? false : true;
                }
                console.log("Pass creation succedded")
                let password = hash(pass)
                let token = getNewToken(code, pass)
                console.log("password: ", password)
                user = new User({
                    name,
                    code,
                    faculty,
                    joinYear,
                    currentYear,
                    token,
                    password
                })
                await user.save()
                console.log("User created.")
                res.status(201).json({user, pass})
            }
        } catch (err) {
            console.error(err.message)
            res.status(500).send(`Error. ${err.message}`)
        }
    } else {
        res.status(400).send("Error. Required data empty.")
    }
})

router.post('/signin', async (req, res) => {
    const { code, pass } = req.body
    console.log("code: ", code)
    console.log("pass: ", pass)

    if (code.length > 0 && pass.length > 0) {
        try {
            console.log("Checking user")
            let user = await User.findOne({ code })

            if (!user) {
                res.status(409).json({
                    "Error": "username not registered to the database."
                })
            } else {
                console.log("User's:", hash(parseInt(pass)))
                console.log("Registered:", user.password)
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
            console.error(err.message)
            res.status(500).send(`Error. ${err.message}`)
        }
    } else {
        res.status(400).send("Error. Required data empty.")
    }
})


router.post('/signout', async (req, res) => {
    const { token } = req.body

    let user = await User.findOne({ token })

    if (user) {
        if (user.token.expiration >= Date.now()) {
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
        } else {
            req.status(409).json({
                error: "session has already expired"
            })
        }
    } else {
        res.status(404).json({
            error: "session not found"
        })
    }
})



module.exports = router
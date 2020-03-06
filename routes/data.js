const express = require('express')
const User = require('../models/User')
const Routine = require('../models/Routine')

const checkLoggedIn = require('../utilities/validateLoggedIn')

const AppSettings = require('../models/Settings')

const router = express.Router()

router.post('/get', async (req, res) => {
    const { token } = req.body

    if (token) {
        let user = await User.findOne({ token })

        if (user) {
            if (user.token.expiration >= Date.now()) {
                let facSem = ""
                facSem = (user.faculty + user.currentYear).toString();
                console.log("facSem: ", facSem)
                let routineAll = Routine.find()
                routineAll.exec((err, docs) => {
                    if (err) throw err;
                    res.status(200).json( docs )
                })
            } else {
                res.status(501).json({
                    error: "session has already expired"
                })
            }
        } else{
            res.status(404).json({
                error: "token has expired or does not exist"
            })
        }
    } else {
        res.status(400).json({
            error: "token required"
        })
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
const express = require('express')
const User = require('../models/User')
const Routine = require('../models/Routine')


const router = express.Router()

router.post('/getData', async (req, res) => {
    const { token } = req.body

    if (token) {
        let user = await User.findOne({ token })

        if (user) {
            if (user.token.expiration >= Date.now()) {
                let facSem = user.faculty + user.currentYear
                console.log("facSem: ", facSem)
                let routineAll = await Routine.findOne({ facSem })
                res.status(200).json({ routineAll })
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

module.exports = router
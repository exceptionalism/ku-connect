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
                let facSem = ""
                facSem = (user.faculty + user.currentYear).toString();
                console.log("facSem: ", facSem)
                // let routine = new Routine({
                //     weekDay: 2,
                //     time: 900,
                //     subject: "Microelectronics",
                //     sCode: "EEEG211",
                //     lecturer: "Santosh Parajuli",
                //     classroom: "9 404",
                //     facSem
                // })
                // await routine.save()
                let routineAll = await Routine.find({ sCode: "EEEG211" })
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
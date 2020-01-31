const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    name: String,
    code: String,
    faculty: String,
    joinYear: Number,
    currentYear: Number,
    currentSemester: Number,
    token: {
        expiration: Number,
        ticket: String
    },
    password: String,
    email: String,
    emailPin: Number,
    emailConfirmed: Boolean
})

module.exports = mongoose.model('user', urlSchema)
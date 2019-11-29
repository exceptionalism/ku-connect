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
    password: String
})

module.exports = mongoose.model('user', urlSchema)
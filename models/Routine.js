const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    weekDay: Number,
    time: Number,
    subject: String,
    sCode: String,
    lecturer: String,
    classroom: String,
    facSem: String,
    duration: Number
})
 
module.exports = mongoose.model('routines', urlSchema)
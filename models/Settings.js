const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.ObjectId

const settingsSchema = new mongoose.Schema({
    user: ObjectId,
    notification: Boolean,
    timer: Number
})

module.exports = mongoose.model('appSettings', settingsSchema)
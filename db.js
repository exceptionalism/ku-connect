const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoUri')

const connectDB = async () => {
    try {
        await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true
            })
            console.log('MongoDB connected.')
    } catch (err) {
        console.error("ERROR: ", err.message)
        process.exit(1)
    }
}

module.exports = connectDB
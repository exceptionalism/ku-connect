const express = require("express")
const connectDB = require("./db")
const config = require('config')

const app = express()

// connectDB()

app.use(express.json({extended: false}))


app.use('/', require('./routes/index'))
app.use('/api/user', require('./routes/users'))
app.use('/api/data', require('./routes/data'))

app.get('/', (req, res)=> res.send("Thank you for accessing this API."))

app.listen(process.env.PORT ? process.env.PORT : config.get('PORT'), () => console.log("Server running at ", config.get('PORT')))

app.get('/api/', (req, res) => {
    res.send("Yayyy")
})
const express = require("express")
const connectDB = require("./db")
const config = require('config')

const app = express()

const port = process.env.PORT ? process.env.PORT : config.get('PORT')

connectDB()

app.use(express.json({extended: false}))


app.use('/', require('./routes/index'))
app.use('/api/user', require('./routes/users'))
app.use('/api/data', require('./routes/data'))

app.get('/', (req, res)=> res.send("Thank you for accessing this API."))

app.listen(port, () => console.log("Server running at ", `http://localhost:${port}`))

app.get('/api/', (req, res) => {
    res.send("Yayyy")
})
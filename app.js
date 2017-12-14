const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const user = require('./routes/user')
const _event = require('./routes/event')
const auth = require('./routes/auth')
const app = express()

mongoose.Promise = require('bluebird');

 const uri = `mongodb://admin:admin@ds125565.mlab.com:25565/mongo`

mongoose.connect(uri, { useMongoClient: true }, (err, db) => {
    if (err) {
        console.error(err)
        return
    }
    console.log("Connected correctly to server");

    app.use((req, res, next) => {
        console.log(new Date().toLocaleString(), req.method, req.path)
        next()
    })

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
        res.setHeader('Access-Control-Allow-Credentials', true)
        next()
    })

    app.use(bodyParser.json())

    app.use('/user', user)
    app.use('/auth',auth)
    app.use('/event',_event)
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
})
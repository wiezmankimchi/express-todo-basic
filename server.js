//todo-app/server.js
/* jslint node: true */
'use strict'



// import the config file
const config = require('./config')

// bring all required module
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const todoRoutes = require('./app/routes/todoRoutes.js')
const userRoutes = require('./app/routes/userRoutes.js')

const morgan = require('morgan')



// console.log(`PORT: ${config.APP_PORT}`)
// console.log(`DB: ${config.DB}`)

// connect to DB
mongoose.connect(config.DB,{ useNewUrlParser: true })


// define app
const app = express()
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// use morgan to log during dev
app.use(morgan('dev'))

// start server on APP_PORT
console.log(`server is ready on port ${config.APP_PORT}`)
app.listen(config.APP_PORT)


app.use('/api',todoRoutes)
app.use('/user', userRoutes)
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Pass to next layer of middleware
    next()
})


app.get('/', function (req, res, next) {
    res.res.sendFile('./public/index.html')
})

app.get('/about',function(req, res, next) {
    res.res.sendFile('./public/about.html')
})





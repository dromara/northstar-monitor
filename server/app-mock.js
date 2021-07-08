var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var compression = require('compression')
var createMockService = require('./mock')

var app = express()

app.use(compression())
app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

console.log('使用Mock API')
createMockService(app)

module.exports = app

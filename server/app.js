var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var compression = require('compression')
const { createProxyMiddleware } = require('http-proxy-middleware')

var indexRouter = require('./routes/index')

var app = express()

app.use(compression())
app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('../dist'))

app.use('/', indexRouter)

app.use(
  createProxyMiddleware('/northstar', {
    target: 'http://127.0.0.1:8888/', // target host
    changeOrigin: true // needed for virtual hosted sites
  })
)

app.use(
  createProxyMiddleware('/socket.io', {
    target: 'http://127.0.0.1:51888/', // target host
    ws: true // proxy websockets
  })
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.writeHead(301, { Location: '/' })
  res.end()
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

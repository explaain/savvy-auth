var express = require('express')
var cors = require('cors')
var http = require('http')
var bodyParser = require('body-parser')
var session = require('express-session')

const importer = require('./app/extract/extract')
const googleDriveToken = require('./app/auth/googleDriveToken')

var app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  secret: 'savvysavvy',
  resave: true,
  saveUninitialized: true,
}))

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('index')
})
app.get('/add/confluence', function(req, res) {
  req.session.userID = req.query.userID
  req.session.accessToken = req.query.accessToken
  req.session.organisationID = req.query.organisationID
  req.session.redirectURL = req.query.redirectURL
  res.render('add-confluence')
})

app.post('/save/confluence', function(req, res) {
  importer.getFiles('confluence', req.body)
  var origin
  if (req.session.redirectURL) {
    origin = req.session.redirectURL
    req.session.destroy()
    res.redirect(origin)
  } else if (req.session.organisationID) {
    origin = req.session.organisationID
    res.redirect('https://' + origin + '.heysavvy.com')
  } else {
    res.redirect('/add/confluence')
  }
})

app.get('/add/google-drive', function(req, res) {
  req.session.userID = req.query.userID
  req.session.accessToken = req.query.accessToken
  req.session.organisationID = req.query.organisationID
  req.session.redirectURL = req.query.redirectURL
  res.redirect(googleDriveToken.getCode())
})

app.get('/save/google-drive', function(req, res) {
  var code = req.query.code
  googleDriveToken.exchangeToken(code)
  .then(token => {
    importer.getFiles('googleDrive', JSON.parse(token))
    var origin
    if (req.session.redirectURL) {
      origin = req.session.redirectURL
      req.session.destroy()
      res.redirect(origin)
    } else if (req.session.organisationID) {
      origin = req.session.organisationID
      res.redirect('https://' + origin + '.heysavvy.com')
    } else {
      res.redirect('/')
    }
  })
})

var port = process.env.PORT || '3000'
app.set('port', port)

var server = http.createServer(app)

console.log(`Listening at http://localhost:${port} xx`)
server.listen(port)

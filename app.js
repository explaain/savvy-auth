var express = require('express')
var cors = require('cors')
var http = require('http')
var bodyParser = require('body-parser')
var session = require('express-session')

const cardParser = require('./app/parse/parseCards')
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
  // save req.body to firebase
  importer.getFiles('confluence', req.body)
  .then(files => {
    cardParser.parseCards(files)
  })
  res.redirect('/return-home')
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
    // save JSON.parse(token) to firebase
    importer.getFiles('googleDrive', JSON.parse(token))
    .then(files => {
      cardParser.parseCards(files)
    })
    res.redirect('/return-home')
  })
})

app.get('/return-home', function(req, res) {
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

app.get('/testsuccess', function(req, res) {
  res.render('test-success')
})

var port = process.env.PORT || '3000'
app.set('port', port)

var server = http.createServer(app)

console.log(`Listening at http://localhost:${port} xx`)
server.listen(port)

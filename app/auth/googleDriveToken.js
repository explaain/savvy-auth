var GoogleAuth = require('google-auth-library')
var fs = require('fs')
var dotenv = require('dotenv')

dotenv.load()

// needs firebase function like getCredentials() or environment variables
var clientSecret = process.env.G_CLIENT_SECRET
var clientId = process.env.G_CLIENT_ID
var baseUrl = process.env.BASE_URL
var redirectUrl = process.env.G_REDIRECT_URL || baseUrl + '/save/google-drive'

function getCode() {
  var auth = new GoogleAuth()
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
    prompt: 'consent'
  })
  return authUrl
}

function exchangeToken(code) {
  return new Promise(function(resolve, reject) {
    var auth = new GoogleAuth()
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        reject(err)
      }
      oauth2Client.credentials = token
      // needs firebase function like saveToken(source, token), saving to local json temporarily
      fs.writeFile('spec/tempCredentials/driveToken.json', JSON.stringify(token), function(err) {
        if (err) {
          console.log('Failed to write file')
        }
        resolve(JSON.stringify(token))
      })
    })
  })
}

exports.getCode = getCode
exports.exchangeToken = exchangeToken

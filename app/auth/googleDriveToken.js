var GoogleAuth = require('google-auth-library')
var fs = require('fs')

// needs firebase function like getCredentials() or environment variables
var clientSecret = 'lGE5esfXpdB6y7KkVNUezfas'
var clientId = '704974264220-r3j760e70qgsea3r143apoc4o6nt5ha2.apps.googleusercontent.com'
var redirectUrl = ['http://localhost:3000/authorisations/gdrive-token']

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
      fs.writeFile('app/tempCredentials/driveToken.json', JSON.stringify(token), function(err) {
        if (err) {
          console.log('Failed to write file')
        }
        console.log('Token stored to firebase:' + token.token_type)
        resolve(token)
      })
    })
  })
}

exports.getCode = getCode
exports.exchangeToken = exchangeToken

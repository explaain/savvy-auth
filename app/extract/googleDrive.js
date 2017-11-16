var google = require('googleapis')
var GoogleAuth = require('google-auth-library')

var dotenv = require('dotenv')

dotenv.load()

// needs firebase function like getCredentials() or environment variables
var clientSecret = process.env.G_CLIENT_SECRET
var clientId = process.env.G_CLIENT_ID
var baseUrl = process.env.BASE_URL
var redirectUrl = process.env.G_REDIRECT_URL || baseUrl + '/save/google-drive'

const Extract = {
  getFiles(token) {
    return new Promise(function(resolve, reject) {
      var auth
      authorize(token)
      .then(authClient => {
        auth = authClient
        return getFileList(auth)
      }).then(files => {
        // saveFileToFirebase('googleDrive', file.id, file.name)
        const promises = files.filter(file => file.mimeType === 'application/vnd.google-apps.document')
        .map(file => getFileContents(auth, file))
        return Promise.all(promises)
      }).then(fileContents => {
        resolve(fileContents)
      }).catch(err => {
        reject(err)
      })
    })
  },
}

function authorize(token) {
  return new Promise(function(resolve, reject) {
    var auth = new GoogleAuth()
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
    oauth2Client.credentials = token
    resolve(oauth2Client)
  })
}

function getFileList(auth) {
  return new Promise(function(resolve, reject) {
    var service = google.drive('v3')
    service.files.list({
      auth: auth,
      fields: 'nextPageToken, files(id, name, mimeType)'
    }, function(err, response) {
      if (err) {
        reject(err)
      }
      var files = response.files
      resolve(files)
    })
  })
}

function getFileContents(auth, file) {
  return new Promise(function(resolve, reject) {
    var service = google.drive('v3')
    service.files.export({
      auth: auth,
      fileId: file.id,
      mimeType: 'text/plain'
    }, function(err, response) {
      if (err) {
        reject(err)
      }
      file.contentFormat = 'plaintext'
      file.contents = response
      resolve(file)
    })
  })
}

module.exports = Extract

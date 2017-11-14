var google = require('googleapis')
var GoogleAuth = require('google-auth-library')

// needs firebase function like getCredentials() or environment variables
var clientSecret = 'lGE5esfXpdB6y7KkVNUezfas'
var clientId = '704974264220-r3j760e70qgsea3r143apoc4o6nt5ha2.apps.googleusercontent.com'
var redirectUrl = ['http://localhost:3000/authorisations/gdrive-token']

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
      }).then(fileContentses => {
        resolve(fileContentses)
      }).catch(e => {
        console.log(e)
        reject(e)
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
        console.log('The API returned an error: ' + err)
        // needs some error trap here for failed access
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
        console.log('The API returned an error: ' + err)
        // needs some error trap here for failed access
        reject(err)
      }
      var content = response
      resolve(content)
    })
  })
}

module.exports = Extract

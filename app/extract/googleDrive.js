var google = require('googleapis')
var GoogleAuth = require('google-auth-library')

// needs firebase function like getCredentials() or environment variables
var clientSecret = 'lGE5esfXpdB6y7KkVNUezfas'
var clientId = '704974264220-r3j760e70qgsea3r143apoc4o6nt5ha2.apps.googleusercontent.com'
var redirectUrl = ['http://localhost:3000/authorisations/gdrive-token']

const Extract = {
  getFiles(token) {
    const self = this
    return new Promise(function(resolve, reject) {
      self.getFileList(token)
      .then(files => {
        console.log(files.map(file => file.name))
        const promises = files.map(file => self.getFileContents(file.id))
        return Promise.all(promises)
      }).then(fileContentses => {
        console.log(fileContentses)
        resolve(fileContentses)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  },
  getFileList(token) {
    return new Promise(function(resolve, reject) {
      authorize(token)
      .then(importFiles)
      .then(files => {
        resolve(files)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  },
  getFileContents(fileID) { // Singular file
    return new Promise(function(resolve, reject) {
      console.log(fileID)
      resolve('abc ' + fileID)
    })
  }
}

function authorize(token) {
  return new Promise(function(resolve, reject) {
    var auth = new GoogleAuth()
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)
    oauth2Client.credentials = token
    resolve(oauth2Client)
  })
}

function importFiles(auth) {
  return new Promise(function(resolve, reject) {
    var service = google.drive('v3')
    service.files.list({
      auth: auth,
      fields: 'nextPageToken, files(id, name)'
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

// function getEachFile(fileList)

module.exports = Extract

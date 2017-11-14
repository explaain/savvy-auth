var google = require('googleapis')
var GoogleAuth = require('google-auth-library')

// needs firebase function like getCredentials() or environment variables
var clientSecret = 'lGE5esfXpdB6y7KkVNUezfas'
var clientId = '704974264220-r3j760e70qgsea3r143apoc4o6nt5ha2.apps.googleusercontent.com'
var redirectUrl = ['http://localhost:3000/authorisations/gdrive-token']

const Extract = {
  getFileList(token) {
    var fileList = getSourceFiles(token)
    this.getFileNames(fileList)
  },
  getFileNames(fileList) {
    fileList.forEach(function(file) {
      this.getFileContents(file)
    })
  },
  getFileContents(file) { // Singular file
    console.log(file.name)
  }
}

function getSourceFiles(token) {
  return new Promise(function(resolve, reject) {
    authorize(token)
    .then(importFiles)
    .then(files => {
      resolve(files)
    })
  })
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

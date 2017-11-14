var fs = require('fs')
var Confluence = require('../auth/confluenceApi')

var updateSourceFiles = function() {
  fs.readFile('app/tempCredentials/confluenceToken.json', function(err, content) {
    if (err) {
      // This would be if unable to retrieve from firebase, n/a
      console.log('Error loading client secret file: ' + err)
      return
    }
    var confluence = new Confluence(JSON.parse(content))
    confluence.getSiteContent('savvyfolder', function(err, data) {
      if (err) {
        return { error: 'Failed to get content' }
      }
      var files = data.results
      if (files.length === 0) {
        console.log('No files found.')
      } else {
        console.log('Importing Confluence files ...')
        for (var i = 0; i < files.length; i++) {
          var file = files[i]
          // here would be a function like createAndUpdateCards(file)
          console.log('Imported file: ', file.title)
        }
      }
      console.log(files.length + ' Confluence files imported')
    })
  })
}

var saveConfluenceDetails = function(details) {
  fs.writeFile('app/tempCredentials/confluenceToken.json', JSON.stringify(details), function(err) {
    if (err) {
      return { error: 'Failed to write file' }
    }
    console.log('Token stored to firebase: confluence')
  })
}

exports.updateSourceFiles = updateSourceFiles
exports.saveConfluenceDetails = saveConfluenceDetails

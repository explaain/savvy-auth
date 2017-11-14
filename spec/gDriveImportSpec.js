var fs = require('fs')
var importer = require('../app/extract/googleDrive.js');

describe('File List', function() {

  it('Retrieve files', function(done) {
    readGoogleToken()
    .then(token => {
      importer.getFileList(token)
      .then(files => {
        console.log(files)
        expect(files.length).toEqual(3)
        done()
      }).catch(e => {
        console.log(e)
      })
    })
  })
})

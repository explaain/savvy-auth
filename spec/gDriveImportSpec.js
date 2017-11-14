var importer = require('../app/extract/googleDrive.js');

describe('Files from Google Drive', function() {

  it('Retrieve file contents', function(done) {
    readGoogleToken()
    .then(token => {
      return importer.getFiles(token)
    }).then(files => {
      expect(files.length).toEqual(2)
      done()
    }).catch(e => {
      console.log(e)
    })
  })
})

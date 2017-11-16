var importer = require('../app/extract/extract.js');

describe('Files via extractor', function() {

  it('Retrieve file contents from confluence', function(done) {
    readConfluenceToken()
    .then(token => {
      return importer.getFiles('confluence', token)
    }).then(files => {
      expect(files.length).toEqual(5)
      done()
    }).catch(e => {
      console.log('Err: ' + e)
    })
  })

  it('Retrieve file contents from google', function(done) {
    readGoogleToken()
    .then(token => {
      return importer.getFiles('googleDrive', token)
    }).then(files => {
      expect(files.length).toEqual(2)
      done()
    }).catch(e => {
      console.log('Err: ' + e)
    })
  })
})

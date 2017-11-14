var fs = require('fs')
var importer = require('../app/extract/confluence.js');

describe('Files from Confluence', function() {

  it('Retrieve file contents', function(done) {
    readConfluenceToken()
    .then(token => {
      return importer.getFiles(token)
    }).then(files => {
      console.log(files[1])
      expect(files.length).toEqual(5)
      done()
    }).catch(e => {
      console.log('Err: ' + e)
    })
  })
})

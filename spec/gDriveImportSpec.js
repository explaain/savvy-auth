var fs = require('fs')
var importer = require('../app/controller/gdriveImport.js')

describe('Google Drive Importer', function() {

  it('get new code', function() {
    var code = importer.getCode().substring(0, 42)
    expect(code).toEqual('https://accounts.google.com/o/oauth2/auth?')
  })

  it('Retrieve files', function(done) {
    importer.updateSourceFiles()
    .then(files => {
      expect(files.length).toEqual(3)
      done()
    }).catch(e => {
      console.log(e)
    })
  })
})

process.env.NODE_ENV = 'test'

describe('Google Drive Importer', function() {
  var importer = require('../app/gdriveImport.js');

  it('get new code', function(){
    var code = importer.getCode().substring(0,42);
    expect(code).toEqual('https://accounts.google.com/o/oauth2/auth?')
  })
})

var auth = require('../app/auth/googleDriveToken.js')

describe('Google Drive Token Retrieve', function() {

  it('get new code', function() {
    var url = auth.getCode().substring(0, 42)
    expect(url).toEqual('https://accounts.google.com/o/oauth2/auth?')
  })

})

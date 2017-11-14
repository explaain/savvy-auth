const Browser = require('zombie')
var app = require('../app.js')
var expect = require('chai').expect
var assert = require('assert')

describe('authorisations', function() {
  const browser = new Browser()

  it('sees confluence auth page',function(done){
    browser.visit('http://localhost:3000/authorisations/add-confluence?orgId=savvy-dev').then(function(){
      browser
      .fill('name', 'admin')
      .fill('password', 'gg3n3r1cp455w0rd')
      .fill('baseURL', 'https://savvy-development.atlassian.net')
      .pressButton('Submit').then(function() {
        assert.ok(browser.success)
      }).then(done, done)
    })
  })
})

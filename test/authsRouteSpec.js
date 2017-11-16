const Browser = require('zombie')
var app = require('../app.js')
var chai = require('chai')
var expect = chai.expect
var assert = require('assert')
Browser.localhost('localhost', 3000)

describe('adding drives', function() {
  const browser = new Browser()

  it('returns to correct URL via confluence',function(done){
    browser.visit('http://localhost:3000/add/confluence?redirectURL=/testsuccess')
    .then(function(){
      browser
      .fill('username', 'admin')
      .fill('password', 'g3n3r1cp455w0rd')
      .fill('baseUrl', 'https://savvy-development.atlassian.net')
      .pressButton('Submit').then(function() {
        assert.ok(browser.success)
        browser.assert.text('h1', 'Confluence Added Successfully')
        done()
      })
    })
  })
})

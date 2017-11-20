const organisationID = 'testingOrg'
const source = {
  organisationID: organisationID,
  platform: 'googleDrive',
  name: 'googleDrive_123',
  token: 'token'
}
const content =   [
  { id: '1015815',
    name: 'File Tests',
    content: '<p>paragraph</p><p>paragraph</p><p>paragraph</p>',
    contentFormat: 'html'
  },
  { id: '1015820',
    name: 'Testing Uploads',
    content: '<p>paragraph</p><p>paragraph</p>',
    contentFormat: 'html'
  }
]
const cardParser = require('../app/parse/parseCards.js');

describe('Parse cards from content', function() {

  it('Store Files', function(done){
    cardParser.saveFileHeaders(organisationID, source, content)
    .then(fileIDs => {
      expect(fileIDs.length).toEqual(2)
      done()
    }).catch(e => {
      console.log(e)
    })
  })

  it('Parse Cards', function(done){
    cardParser.parseCards(organisationID, source, content)
    .then(cards => {
      expect(cards.length).toEqual(5)
      done()
    }).catch(e => {
      console.log(e)
    })
  })

  // @TODO: Need more tests here

})

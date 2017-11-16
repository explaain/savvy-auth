var content =   [{ id: '1015815',
    name: 'File Tests',
    content: '<p>paragraph</p><p>paragraph</p><p>paragraph</p>',
    contentFormat: 'html' },
  { id: '1015820',
    name: 'Testing Uploads',
    content: '<p>paragraph</p><p>paragraph</p>',
    contentFormat: 'html' }
  ]

var cardParser = require('../app/parse/parseCards.js');

describe('Parse cards from content', function() {

  it('Parses card headers', function(){
    var files = cardParser.parseCards(content)
      expect(files.length).toEqual(2)
      expect(files[1].name).toEqual('Testing Uploads')
  })

})

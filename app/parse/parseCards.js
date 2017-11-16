
function parseCards(contents) {
  var headers = getFileHeaders(contents)
  contents.forEach(function(file) {
    // do something with card contents - parseContent(file.contentFormat, file.contents)
  })
  return headers
}

function getFileHeaders(contents) {
  var files = contents.map(file => {
    return {
      id: file.id,
      name: file.name,
    }
  })
  // do something to save headers to firebase
  return files
}

exports.parseCards = parseCards

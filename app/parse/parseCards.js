const axios = require('axios')

const saveFilesUrl = 'https://us-central1-savvy-96d8b.cloudfunctions.net/saveFiles'

function parseCards(organisationID, source, contents) {
  saveFileHeaders(organisationID, source, contents)
  contents.forEach(function(file) {
    // do something with card contents - parseContent(file.contentFormat, file.contents)
  })
}

function saveFileHeaders(organisationID, source, contents) {
  var files = contents.map(file => {
    return {
      id: file.id,
      name: file.name,
      format: file.contentFormat,
      source: source
    }
  })
  axios.post(saveFilesUrl, {
    organisationID: organisationID,
    files: files
  })
}

exports.parseCards = parseCards

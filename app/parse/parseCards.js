const axios = require('axios')

const saveFilesUrl = 'https://us-central1-savvy-96d8b.cloudfunctions.net/saveFiles'
const saveCardUrl = 'https://us-central1-savvy-96d8b.cloudfunctions.net/saveCard'

const parseCards = (organisationID, source, contents) => new Promise((resolve, reject) => {
  saveFileHeaders(organisationID, source, contents)
  var cards = []
  contents.forEach(function(file) {
    cards = cards.concat(parseContent(file.contentFormat, file.content, { id: file.id, name: file.name }))
  })
  const promises = cards.map(card => axios.post(saveCardUrl, {
    organisationID: organisationID,
    userID: 'bob_marley',
    content: card.content,
    meta: {
      extractedFrom: card.extractedFrom
    }
  }))
  Promise.all(promises)
  .then(results => {
    const data = results.map(result => result.data)
    resolve(data)
  })
})

const saveFileHeaders = (organisationID, source, contents) => new Promise((resolve, reject) => {
  const files = contents.map(file => {
    return {
      id: file.id,
      name: file.name,
      format: file.contentFormat,
      source: source.name
    }
  })
  axios.post(saveFilesUrl, {
    organisationID: organisationID,
    files: files
  }).then(res => {
    resolve(res.data)
  }).catch(e => {
    console.log(e)
    reject(e)
  })
})

const parseContent = (format, body, meta) => {
  const cards = []
  var split = []
  switch (format) {
    case 'plain':
      split = body.split(/(\r\n\r\n\r\n|\n\n\n|\r\r\r)/gm)
      break
    case 'html':
      split = body.match(/<p>.*?<\/p>/g)
      break
  }
  split.forEach(function(chunk) {
    chunk = chunk.trim()
    if (chunk.length) {
      cards.push({
        content: {
          description: chunk
        },
        extractedFrom: {
          title: meta.name,
          id: meta.id
          // url: meta.webContentLink // Could be webViewLink?
        }
      })
    }
  })
  return cards
}

exports.parseCards = parseCards
exports.saveFileHeaders = saveFileHeaders

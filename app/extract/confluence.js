var request = require('superagent')

const Extract = {
  getFiles(token) {
    return new Promise(function(resolve, reject) {
      getSiteContent(token)
      .then(data => {
        var files = data.body.results.map(file => file.body.storage.value)
        return files
      }).then(fileContents => {
        console.log(fileContents)
        resolve(fileContents)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  }
}

function getSiteContent(token) {
  return new Promise(function(resolve, reject) {
    request
    .get(token.baseUrl + '/wiki/rest/api/content?expand=body.storage')
    .auth(token.username, token.password)
    .then(data => {
      resolve(data)
    }).catch(e => {
      console.log(e)
      reject(e)
    })
  })
}

module.exports = Extract

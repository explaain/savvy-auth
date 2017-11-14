var request = require('superagent')

const Extract = {
  getFiles(token) {
    return new Promise(function(resolve, reject) {
      getSiteContent(token, 'savvyfolder')
      .then(data => {
        var files = data.body.results
        resolve(files)
      }).catch(e => {
        console.log(e)
        reject(e)
      })
    })
  }
}

function getSiteContent(token, space) {
  return new Promise(function(resolve, reject) {
    request
    .get(token.baseUrl + '/wiki/rest/api/content')
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

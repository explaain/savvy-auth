var googleDrive = require('./googleDrive.js')
var confluence = require('./confluence.js')

const Extract = {
  getFiles(platform, token, queryData) {
    return new Promise(function(resolve, reject) {
      if (platform === 'confluence') {
        confluence.getFiles(token)
        .then(files => {
          resolve(files)
        }).catch(e => {
          reject(e)
        })
      } else if (platform === 'googleDrive') {
        googleDrive.getFiles(token)
        .then(files => {
          resolve(files)
        }).catch(e => {
          reject(e)
        })
      } else {
        reject(new Error('unknown platform / missing'))
      }
    })
  }
}

module.exports = Extract

var googleDrive = require('./googleDrive.js')
var confluence = require('./confluence.js')

const Extract = {
  getFiles(platform, token, queryData) {
    switch (platform) {
      case 'confluence':
        return confluence.getFiles(token)
      case 'googleDrive':
        return googleDrive.getFiles(token)
      default:
        return new Promise(function(resolve, reject) {
          reject(new Error('unknown platform / missing'))
        })
    }
  }
}

module.exports = Extract

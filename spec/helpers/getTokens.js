var fs = require('fs')

readGoogleToken = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('spec/tempCredentials/driveToken.json', function processClientSecrets(err, content) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(JSON.parse(content))
      }
    })
  });
}

readConfluenceToken = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('spec/tempCredentials/confluenceToken.json', function(err, content) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve(JSON.parse(content))
      }
    })
  });
}

exports.readGoogleToken = readGoogleToken
exports.readConfluenceToken = readConfluenceToken

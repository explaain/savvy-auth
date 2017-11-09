var fs = require('fs')

readToken = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('app/controller/driveToken.json', function processClientSecrets(err, content) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        console.log(JSON.parse(content))
        resolve(JSON.parse(content))
      }
    })
  });
}

var fs = require('fs')

readToken = function() {
  fs.readFile('app/controller/driveToken.json', function processClientSecrets(err, content) {
    if (err) { console.log(err) }
    console.log(JSON.parse(content))
    return JSON.parse(content)
  })
}

import googleDrive from './googleDrive.js'
import confluence from './confluence.js'

const Extract = {
  getFiles(platform, token, queryData) {
    // @TODO

    var promise
    switch (platform) {
      case 'googleDrive':
        promise = googleDrive.getFiles()
        break
      case 'confluence':
        promise = confluence.getFiles()
        break
      default:
    }
    promise.then()
  }
}

export default Extract

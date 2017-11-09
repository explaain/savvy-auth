

describe('Google Drive Importer', function() {
  var importer = require('../app/gdriveImport.js');
  var token = {
    "access_token":"ya29.Glv_BPPHNhC0Jx2mL5oxa3rHZ2stNvv-LHaR848j74FUtCSFoAA_7leOrdIxSrOZmXeF327xjigAI53jHAlOwacLDlxbuLoOliZBOfcOSXczlIgWrpl2AWEuYVBN",
    "refresh_token":"1/IA2O109_pQkv-g-uhdp-s_UTOipRmiw0AJsNEKsUojo",
    "token_type":"Bearer","expiry_date":1510242691600
  }

  it('get new code', function(done){
    var code = importer.getCode().substring(0,42);
    expect(code).toEqual('https://accounts.google.com/o/oauth2/auth?')
    done();
  })

  // it('accesses drive', function(done){
  //   importer.updateSourceFiles(token, function(err, result){
  //     console.log(result)
  //     done();
  //   });
  // })

})

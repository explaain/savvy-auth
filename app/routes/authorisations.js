var express = require('express')
var router = express.Router()
var importer = require('../extract/extract')
var app = express()

app.set('view engine', 'html')

router.get('/add-confluence', function(req, res) {
  console.log('x')
  res.sendFile(root + '/views/add-confluence.html')
})

module.exports = router

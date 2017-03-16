var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/send', function (req, res, next) {
  var helper = require('sendgrid').mail
  var from_email = new helper.Email('jeremiah@somemadeupdomain.co')
  var to_email = new helper.Email('jeremiah.alexander@generalassemb.ly')
  var subject = 'Hello There from the GA!'
  var content = new helper.Content('text/plain', 'Hello, Email!')
  var mail = new helper.Mail(from_email, subject, to_email, content)

  console.log("API KEY found: ", !!process.env.SENDGRID_API_KEY)
  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  })

  sg.API(request, function (error, response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
    res.render('index', { title: 'Sent Mail' })
  })
})

module.exports = router

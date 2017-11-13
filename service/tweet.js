var Twit = require('twit')

console.log("loaded")

var T = new Twit({
  consumer_key:         process.env.CONSUMERKEY,
  consumer_secret:      process.env.CONSUMERSECRET,
  access_token:         process.env.ACCESSTOKEN,
  access_token_secret:  process.env.ACCESSTOKENSECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

module.exports = T


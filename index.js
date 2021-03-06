const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const T = require('./service/tweet.js')
const path = require('path')

app.use( express.static( path.join( __dirname, 'public' ) ) )

app.get('/getUserTweets', (req, res) => {
  let defaultParamName =  req.query.user_tweet_name || 'FauxMotivation'
  let defaultParamLength =  1 // might have the option for multiple tweet
  T.get('statuses/user_timeline', { screen_name: defaultParamName, count: defaultParamLength },  function (err, data, response) {
    res.send(data)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
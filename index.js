const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const T = require('./app/tweet.js')
const path = require('path')

app.use( express.static( path.join( __dirname, 'public' ) ) )


app.get('/getUserTweets', (req, res) => {
  T.get('statuses/user_timeline', { screen_name: 'FauxMotivation', count: 2 },  function (err, data, response) {
    res.send(data)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const express = require('express')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const music = require('./music')

var corsOptions = {
  origin: '*'
}

app.use(cors(corsOptions))

app.get('/next', function (req, res) {
  console.log('Try to get next')

  music.updateDecadeUp()

  return music.getMusic()
    .then(result => {
      console.log('Here is the result', result.song.mp3)

      return res.json(result.song)
    })
    .catch(error => console.log('Error', error))
})

http.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})

music.start()

exports.http = http

// require('./gpio')
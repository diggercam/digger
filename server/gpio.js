const { http } = require('./server')
const Promise = require('bluebird')
const io = require('socket.io')(http)
const Gpio = require('onoff').Gpio
const Bt2RotateRight = new Gpio(06, 'in', 'both')
const Bt2RotateLeft = new Gpio(05, 'in', 'both')
const Bt1RotateRight = new Gpio(26, 'in', 'both')
const Bt1RotateLeft = new Gpio(19, 'in', 'both')
const music = require('./music')
const _ = require('lodash')

console.log('GPIO started')

const events = []

process.on('SIGINT', function () {

  console.log('got signal SIGINT')
  Bt1RotateRight.unexport();
  Bt1RotateLeft.unexport();
  Bt2RotateRight.unexport();
  Bt2RotateLeft.unexport();
})




io.on('connection', function(socket){
  console.log('a user connected')
  /**
   * Result from radioo
   *
   * @param  {object} result
   */
  function pushNewMusic(result) {
    const context = music.getContext()
    const message = {
      context,
      song: result.song
    }
    socket.emit('message', message)
  }

  // get default music when connecting
  music.getMusic()
    .then(pushNewMusic)

  function decadeUp(err, value) {
    console.log('Try to update the decade Up')
    if (err) throw err

    return updateDecadeUp()
      .then(pushNewMusic)
      .catch(error => console.log('Error', error))
  }

  function decadeDown(err, value) {
    console.log('Try to update the decade Down')
    if (err) throw err

    return updateDecadeDown()
      .then(pushNewMusic)
      .catch(error => console.log('Error', error))
  }

  function countryUp(err, value) {
    console.log('Try to update the Country Up')
    if (err) throw err

    return updateCountryUp()
      .then(pushNewMusic)
      .catch(error => console.log('Error', error))
  }

  function countryDown(err, value) {
    console.log('Try to update the Country Down')
    if (err) throw err

    return updateCountryDown()
      .then(pushNewMusic)
      .catch(error => console.log('Error', error))
  }


  const countryUpDebounced = _.throttle(countryUp, 1500, { trailing: false })
  const countryDownDebounced = _.throttle(countryDown, 1500, { trailing: false })
  const decadeUpDebounced = _.throttle(decadeUp, 1500, { trailing: false })
  const decadeDownDebounced = _.throttle(decadeDown, 1500, { trailing: false })

  Bt2RotateRight.watch(countryUpDebounced)
  Bt2RotateLeft.watch(countryDownDebounced)

  Bt1RotateRight.watch(decadeUpDebounced)
  Bt1RotateLeft.watch(decadeDownDebounced)

})

function updateCountryUp() {
  return Promise.try(() => music.updateCountryUp())
    .then(music.getMusic)
}

function updateCountryDown() {
  return Promise.try(() => music.updateCountryDown())
    .then(music.getMusic)
}

function updateDecadeUp() {
  return Promise.try(() => music.updateDecadeUp())
    .then(music.getMusic)
}

function updateDecadeDown() {
  return Promise.try(() => music.updateDecadeDown())
    .then(music.getMusic)
}

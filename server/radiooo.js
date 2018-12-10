module.exports = {
  getMusic,
  getCountriesByDecade
}

global.Promise = require('bluebird')
const axios = require('axios')
const { get } = require('lodash/fp')
const baseUrl = 'http://radiooooo.com'
const headers = {
  'Origin': baseUrl,
  'Accept-Encoding': 'gzip, deflate' ,
  'Accept-Language': 'en-US,en;q=0.9',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
  'Content-Type': 'application/json',
  'Accept': '*/*',
  'Referer': 'http://radiooooo.com/',
  'Cookie': 'JSESSIONID=0EDE2A8AB3D4D6E017CDE49E9597BE5F; _ga=GA1.2.136324695.1513114479; _gid=GA1.2.1790407698.1513114479; _gat=1',
  'Connection': 'keep-alive',
}

function buildData(decade,  country) {
  return {
    decade,
    country,
    moods: ["SLOW", "FAST"]
  }
}

function getMusic({ decade, country }) {
  console.log('Get music with context', { decade, country })

  return axios({
    method: 'post',
    url: `${baseUrl}/api/playlist/next`,
    data: buildData(decade, country),
    headers
  }).get('data')
}

function getCountriesByDecade(decade) {
  return axios.get(`${baseUrl}/api/playlist/countriesByTempos/${decade}?moods=SLOW^%^2CFAST`)
    .then(get(['data', decade]))
    // .tap(re => console.log('result', re))
}
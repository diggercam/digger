import axios from 'axios'

const makeRequest = () => {
  return axios({
    method: 'get',
    url: 'http://localhost:4000/next'
  })
}

export default makeRequest
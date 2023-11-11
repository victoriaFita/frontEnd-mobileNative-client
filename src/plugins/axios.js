import axios from 'axios'

const api = axios.create({
  baseURL: 'https://victoriafit.2.sg-1.fl0.io/'
})

export default api

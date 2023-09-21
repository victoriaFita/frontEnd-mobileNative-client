import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.140.116:19003/'
})

export default api

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.188.116:19003/'
})

export default api

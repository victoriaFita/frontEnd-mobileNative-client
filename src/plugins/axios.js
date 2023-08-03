import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.4.231:19000/'
})

export default api

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://191.52.55.223:19003/'
})

export default api

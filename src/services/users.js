import api from '../plugins/axios'

class UserService {
  async getAllUsers() {
    const response = await api.get('/users/')
    return response.data
  }
  async saveUser(user) {
    const response = await api.post('/users/', user)
    return response.data
  }
  async deleteUser(user) {
    const response = await api.delete(`/users/${user.id}/`)
    return response.data
  }
}

export default new UserService()

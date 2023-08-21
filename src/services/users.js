import api from '../plugins/axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  async login(email, password) {
    const response = await api.post('/api/login/', { email, password });
    console.log(response.data)
    if (response.data && response.data?.user && response.data?.user?.id) {
      await AsyncStorage.setItem('accessToken', response.data.access);
      await AsyncStorage.setItem('userId', String(response.data.user.id));
    }
    return response.data;
  }
  
  async getUserInfo() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const response = await api.get('/users/', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  }

  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    console.log('User data:', response.data);
    return response.data;
  }
  
  
}

export default new UserService()

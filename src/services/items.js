import api from '../plugins/axios'

class ItemService {
  async getAllItems() {
    const response = await api.get('/items/');
    return response.data;
  }

  async saveItem(item) {
    const response = await api.post('/items/', item);
    return response.data;
  }

  async deleteItem(item) {
    const response = await api.delete(`/items/${item.id}/`);
    return response.data;
  }
}

export default new ItemService();

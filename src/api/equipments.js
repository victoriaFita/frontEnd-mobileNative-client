import axios from 'axios';
export default class EquipmentsApi {
  async getAllEquipments() {
    const { data } = await axios.get('/equipments/');
    return data;
  }
  async addEquipments(equipment) {
    const { data } = await axios.post('/equipments/', equipment);
    return data;
  }
  async updateEquipments(equipment) {
    const { data } = await axios.put(`/equipments/${equipment.id}/`, equipment);
    return data;
  }
  async deleteEquipments(id) {
    const { data } = await axios.delete(`/equipments/${id}/`);
    return data;
  }
}

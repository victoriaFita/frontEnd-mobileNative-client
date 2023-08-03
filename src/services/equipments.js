import api from '../plugins/axios'

class EquipmentService {
  async getAllEquipments() {
    const response = await api.get('/equipments/')
    return response.data
  }
  async saveEquipment(equipment) {
    const response = await api.post('/equipments/', equipment)
    return response.data
  }
  async deleteEquipment(equipment) {
    const response = await api.delete(`/equipments/${equipment.id}/`)
    return response.data
  }
}

export default new EquipmentService()

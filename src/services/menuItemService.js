import api from '@/services/api'

export default {
  // 2.B.1 create a service file to handle API calls related to menu items
  async getMenuItems() {
    try {
      const response = await api.get('/menuItem')
      if (response.data.isSuccess) {
        return response.data.result
      } else {
        throw new Error('Failed to fetch menu items')
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
      throw error
    }
  },

  // CREATE a new menu item
  async createMenuItem(data) {
    try {
      const response = await api.post('/menuItem', data)
      if (response.data.isSuccess) {
        return response.data.result
      } else {
        throw new Error('Failed to create menu item')
      }
    } catch (error) {
      console.error('Error creating menu item:', error)
      throw error
    }
  },

  // Get Item by ID
  async getMenuItemById(id) {
    try {
      const response = await api.get(`/menuItem/${id}`)
      if (response.data.isSuccess) {
        return response.data.result
      } else {
        throw new Error('Failed to fetch menu item')
      }
    } catch (error) {
      console.error('Error fetching menu item:', error)
      throw error
    }
  },
}

import api from '@/services/api'

export default {
  // 2.B.1 create a service file to handle API calls related to orders
  async getOrders(userId = null) {
    try {
      const response = await api.get('/orderHeader', {
        params: {
          userId: userId, // Include order details in the response
        },
      })

      if (response.data.isSuccess) {
        return response.data.result
      } else {
        throw new Error('Failed to fetch orders')
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  },

  // CREATE a new order
  async createOrder(orderData) {
    try {
      const response = await api.post('/orderHeader', {
        pickUpName: orderData.pickUpName,
        pickUpPhoneNumber: orderData.pickUpPhoneNumber,
        pickUpEmail: orderData.pickUpEmail,
        applicationUserId: orderData.applicationUserId,
        orderTotal: orderData.orderTotal,
        totalItem: orderData.totalItem,
        orderDetailsDTO: orderData.orderDetailsDTO,
      })
      if (response.data.isSuccess) {
        return response.data.result
      } else {
        throw new Error('Failed to create order')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  },

  // Get Order by ID
  async getOrderById(id) {
    try {
      const response = await api.get(`/orderHeader/${id}`)
      if (response.data.isSuccess) {
        return response.data.result
      } else {
        throw new Error('Failed to fetch order')
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      throw error
    }
  },

  // UPDATE an existing order
  async updateOrder(id, orderData) {
    try {
      const response = await api.put(`/orderHeader?id=${id}`, {
        orderHeaderId: id,
        pickUpName: orderData.pickUpName,
        pickUpPhoneNumber: orderData.pickUpPhoneNumber,
        pickUpEmail: orderData.pickUpEmail,
        status: orderData.status,
      })
      if (response.data.isSuccess) {
        return response.data.result
      } else {
        throw new Error('Failed to update order')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      throw error
    }
  },
}

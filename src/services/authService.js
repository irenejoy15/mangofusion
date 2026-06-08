import api from '@/services/api'

export default {
  async signUp(userData) {
    try {
      const response = await api.post('/auth/register', {
        name: userData.name,
        email: userData.email,
        role: userData.role,
        password: userData.password,
      })
      if (response.data.isSuccess) {
        return {
          success: true,
          message: 'Registration successful!',
        }
      } else {
        throw new Error('Failed to sign up')
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred during sign up.')
    }
  },
}

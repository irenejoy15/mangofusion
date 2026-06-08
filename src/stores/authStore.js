import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import authService from '@/services/authService'
import router from '@/router/routes'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useSwal } from '@/composables/swal'
import cookies from 'js-cookie'

export const useAuthStore = defineStore(
  'authStore',
  () => {
    //State
    const user = reactive({
      id: '',
      name: '',
      email: '',
      role: '',
      password: '',
      isLoggedIn: false,
    })

    const isAuthenticated = ref(false)
    // GETTER
    const getUserInfo = computed(() => {
      return isAuthenticated.value ? user : null
    })

    function decodeToken(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return {
          email: payload.email,
          role: payload.role,
          name: payload.name,
          id: payload.id,
        }
      } catch (error) {
        console.error('Error decoding token:', error)
        return null
      }
    }

    function initialize() {
      try {
        const token = cookies.get('token_mango')
        if (token) {
          const userData = decodeToken(token)
          if (userData) {
            Object.assign(user, userData)
            isAuthenticated.value = true
          } else {
            clearAuthData()
          }
        } else {
          clearAuthData()
        }
      } catch (err) {
        console.error('Error during initialization:', err)
        clearAuthData()
      }
    }

    // ACTIONS
    const { showSuccess, showError } = useSwal()
    async function signUp(userData) {
      try {
        await authService.signUp(userData)
        showSuccess('Registration successful')
        router.push({ name: APP_ROUTE_NAMES.SIGN_IN })
        return {
          success: true,
          message: 'Registration successful',
        }
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.errorMessages?.join('--') || 'Registeration Failed',
        }
      }
    }

    async function signIn(formObj) {
      try {
        const { token, user: userData } = await authService.signIn(formObj)
        Object.assign(user, userData)
        isAuthenticated.value = true

        cookies.set('token_mango', token, { expires: 1 }) // Store token in cookie for 1 day

        showSuccess('Login successful')
        router.push({ name: APP_ROUTE_NAMES.HOME })
      } catch (err) {
        return {
          success: false,
          message: err.response?.data?.errorMessages?.join('--') || 'Login Failed',
        }
      }
    }

    function clearAuthData() {
      Object.assign(user, {
        id: '',
        name: '',
        email: '',
        role: '',
      })
      isAuthenticated.value = false
      cookies.remove('token_mango')
    }

    return {
      user,
      isAuthenticated,
      getUserInfo,
      signUp,
      signIn,
      initialize,
    }
  },
  {
    persist: true, // Enable persistence for the app store
  },
)

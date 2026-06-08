import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue'
import authService from '@/services/authService'
import router from '@/router/routes'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useSwal } from '@/composables/swal'
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

    return {
      user,
      isAuthenticated,
      getUserInfo,
      signUp,
    }
  },
  {
    persist: true, // Enable persistence for the app store
  },
)

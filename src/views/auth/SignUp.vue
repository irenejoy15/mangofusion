<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Sign Up</h2>

            <form @submit.prevent="onSignSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input type="text" class="form-control" id="name" v-model="formObj.name" />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="formObj.email" />
              </div>

              <div class="mb-3">
                <label for="role" class="form-label">Role</label>
                <select class="form-select" id="role" v-model="formObj.role">
                  <option v-for="role in ROLES" :key="role">{{ role }}</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="formObj.password"
                />
              </div>

              <div class="alert alert-danger" v-if="errorList.length > 0" role="alert">
                <span class="d-block" v-for="(error, index) in errorList" :key="index">{{
                  error
                }}</span>
              </div>

              <button type="submit" class="btn btn-secondary w-100" :disabled="loading">
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sign Up
              </button>
            </form>

            <div class="text-center mt-3">
              <router-link :to="{ name: APP_ROUTE_NAMES.SIGN_IN }">
                Already have an account? Login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ROLES } from '@/constants/constants'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const errorList = ref([])
const isLoading = ref(false)
const formObj = reactive({
  name: '',
  email: '',
  role: 'Customer',
  password: '',
})

const onSignSubmit = async () => {
  errorList.value.length = 0 // Clear previous errors
  isLoading.value = true

  if (formObj.name === undefined || formObj.name.length === 0) {
    errorList.value.push('Name is required.')
  }

  if (formObj.email === undefined || formObj.email.length === 0) {
    errorList.value.push('Email is required.')
  }

  if (formObj.password === undefined || formObj.password.length === 0) {
    errorList.value.push('Password is required.')
  }

  if (errorList.value.length > 0) {
    isLoading.value = false
    return
  }

  try {
    const response = await authStore.signUp(formObj)

    // Optionally, you can redirect the user to the sign-in page after successful sign-up
    if (response.success) {
    } else {
      // SPLIT ERROR MESSAGE IF IT CONTAINS '--' AND DISPLAY EACH PART IN A NEW LINE
      if (response.message !== undefined) {
        const errorMessages = response.message.split('--')
        errorMessages.forEach((msg) => {
          errorList.value.push(msg)
        })
      }
    }
  } catch (error) {
    console.log('Sign up error:', error)
    errorList.value.push(error.message || 'An error occurred during sign up. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>

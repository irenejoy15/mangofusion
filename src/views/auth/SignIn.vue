<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Sign In</h2>
            <form @submit.prevent="onSignInSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="formObj.email" />
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

              <button type="submit" class="btn btn-success w-100">Login</button>
            </form>

            <div class="text-center mt-3">
              <router-link :to="{ name: APP_ROUTE_NAMES.SIGN_UP }">
                Don't have an account? Sign up
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

const errorList = ref([])
const isLoading = ref(false)
const formObj = reactive({
  email: '',
  password: '',
})

const onSignInSubmit = async () => {
  errorList.value.length = 0 // Clear previous errors
  isLoading.value = true

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
  } catch (error) {
    errorList.value.push(error.message || 'An error occurred during sign in. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>

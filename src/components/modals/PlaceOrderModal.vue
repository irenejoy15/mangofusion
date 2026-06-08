<template>
  <div
    v-if="isOpen"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-black bg-opacity-50"
    style="z-index: 1050"
  >
    <div
      class="bg-body p-4 rounded-4 shadow-lg mx-3 overflow-auto"
      style="max-width: 500px; width: 100%; max-height: 90vh"
    >
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold m-0">Complete Your Order</h4>
        <button class="btn" @click="closeModal"><i class="bi bi-x-circle"></i></button>
      </div>

      <div v-if="errorList.length > 0" class="alert alert-danger" role="alert">
        <span class="d-block" v-for="(error, index) in errorList" :key="index">{{ error }}</span>
      </div>

      <form>
        <div class="mb-3">
          <label for="pickupName" class="form-label">Name</label>
          <input type="text" class="form-control" id="pickupName" v-model="orderData.pickUpName" />
        </div>

        <div class="mb-3">
          <label for="pickupPhoneNumber" class="form-label">Phone Number</label>
          <input
            type="tel"
            class="form-control"
            id="pickupPhoneNumber"
            v-model="orderData.pickUpPhoneNumber"
          />
        </div>

        <div class="mb-4">
          <label for="pickupEmail" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="pickupEmail"
            v-model="orderData.pickUpEmail"
          />
        </div>

        <div class="bg-body-tertiary rounded-3 p-3 mb-4">
          <h5 class="fw-bold mb-3">Order Summary</h5>
          <div
            v-if="cartStore.cartItems && cartStore.cartItems.length > 0"
            class="text-center text-body-secondary py-5"
          >
            <div
              class="d-flex justify-content-between align-items-center mb-2"
              v-for="item in cartStore.cartItems"
              :key="item.id"
            >
              <span class="fw-medium">{{ item.name }}</span>
              <div class="d-flex align-items-center gap-3">
                <span class="text-body-secondary">{{ item.quantity }} x</span>
                <span class="fw-medium">$ {{ item.price }}</span>
              </div>
            </div>
            <div class="border-top pt-3 mt-3">
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold">Total</span>
                <span class="fw-bold fs-5"
                  >$
                  {{
                    cartStore.cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-secondary px-4" @click="closeModal">
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-success px-4"
            :disabled="isSubmitting || !cartStore.cartItems || cartStore.cartItems.length === 0"
          >
            <span v-if="isSubmitting" class="d-flex align-items-center gap-2">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Processing...
            </span>
            <span v-else>Place Order</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const isSubmitting = ref(false)
const errorList = reactive([])
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}

const orderData = reactive({
  pickUpName: '',
  pickUpPhoneNumber: '',
  pickUpEmail: '',
  applicationUserId: '',
  orderTotal: 1,
  totalItem: 1,
  orderDetailsDTO: [],
})
</script>

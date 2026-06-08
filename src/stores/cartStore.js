import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref([])

    const cartCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotal = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })

    function addToCart(menuItem, quantity = 1) {
      const existingItem = cartItems.value.find((item) => item.id === menuItem.id)
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cartItems.value.push({
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: quantity,
          image: menuItem.image,
        })
      }
    }

    function removeFromCart(menuItemId) {
      const index = cartItems.value.findIndex((item) => item.id === menuItemId)
      if (index !== -1) {
        cartItems.value.splice(index, 1)
      }
    }

    function updateQuantity(menuItemId, quantity) {
      const item = cartItems.value.find((item) => item.id === menuItemId)
      if (item) {
        if (quantity <= 0) {
          removeFromCart(menuItemId)
        } else {
          item.quantity = quantity
        }
      }
    }

    function clearCart() {
      cartItems.value = []
    }

    return {
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
    }
  },
  {
    persist: true, // Enable persistence
  },
)

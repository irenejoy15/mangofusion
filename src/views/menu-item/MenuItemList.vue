<template>
  <!-- 2.B.3 Menu Item List Component -->
  <div class="container px-3">
    <div v-if="loading" class="d-flex justify-content-center align-items-center vh-100">
      <div class="spinner-grow text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <div>
        <div
          class="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3"
        >
          <div>
            <h2 class="h5 text-success">Menu Items</h2>
            <p class="mb-0 text-muted small">Manage your restaurant's offerings</p>
          </div>
          <button
            class="btn btn-success btn-sm gap-2 rounded-1 px-4 py-2"
            @click="router.push({ name: APP_ROUTE_NAMES.CREATE_MENU_ITEM })"
          >
            <i class="bi bi-plus-square"></i> &nbsp;
            <span>Add Item</span>
          </button>
        </div>
        <div class="card-body p-3">
          <div class="table-responsive">
            <MenuItemTable @menuItemDeleted="handleMenuItemDeleted" :menuItems="menuItems" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 2.B.2 create the service file to handle API calls related to menu items -->
<script setup>
import menuItemService from '@/services/menuItemService'
import { reactive, ref, onMounted } from 'vue'
import MenuItemTable from './MenuItemTable.vue'
// 2.B.4 import the route names constant to use in navigation if needed
import { useRouter } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useSwal } from '@/composables/swal'

const { showError, showConfirmation, showSuccess } = useSwal()

// RECEIVE EMIT FROM CHILD COMPONENT TO UPDATE THE LIST AFTER DELETION
const handleMenuItemDeleted = async (deletedId) => {
  try {
    const confirmResult = await showConfirmation('Are you sure you want to delete this menu item?')
    if (confirmResult.isConfirmed) {
      loading.value = true
      await menuItemService.deleteMenuItem(deletedId)
      showSuccess('Menu item deleted successfully.')
      fetchMenuItems() // Refresh the list after deletion
    }
  } catch (error) {
    showError('Failed to delete menu item. Please try again.')
  } finally {
    loading.value = false
  }
}

const menuItems = reactive([])
const loading = ref(false)
// 2.B.4 import the route names constant to use in navigation if needed
const router = useRouter()

const fetchMenuItems = async () => {
  // RESET THE LIST BEFORE FETCHING NEW DATA
  menuItems.length = 0
  loading.value = true
  try {
    var result = await menuItemService.getMenuItems()
    menuItems.push(...result)
  } catch (error) {
  } finally {
    loading.value = false
  }
}
onMounted(fetchMenuItems)
</script>

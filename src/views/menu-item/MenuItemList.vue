<template>Menu Item List</template>

<!-- 2.B.2 create the service file to handle API calls related to menu items -->
<script setup>
import menuItemService from '@/services/menuItemService'
import { reactive, ref, onMounted } from 'vue'
const menuItems = reactive([])
const loading = ref(false)

const fetchMenuItems = async () => {
  loading.value = true
  try {
    var result = await menuItemService.getMenuItems()
    menuItems.push(...result)
    console.log('Fetched menu items:', menuItems.value)
  } catch (error) {
    console.error('Error fetching menu items:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchMenuItems)
</script>

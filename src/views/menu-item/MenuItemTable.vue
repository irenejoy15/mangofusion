<template>
  <table class="table table-hover align-middle mb-0">
    <thead>
      <tr>
        <th class="ps-3 small text-muted">Item</th>
        <th class="small text-muted">Category</th>
        <th class="small text-muted">Price</th>
        <th class="small text-muted">Tag</th>
        <th class="pe-3 text-end small text-muted">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="menuItem in menuItems" :key="menuItem.id">
        <MenuItem :menuItem="menuItem" />
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
})
</script>

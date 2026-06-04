<template>
  <td class="ps-3">
    <div class="d-flex align-items-center">
      <img
        :src="CONFIG_IMG_URL + menuItem.image"
        alt="Item"
        class="rounded object-fit-cover me-2"
        style="width: 50px; height: 50px"
      />
      <div>
        <div class="fw-semibold small">{{ menuItem.name }}</div>
      </div>
    </div>
  </td>
  <td>
    <span class="badge bg-success bg-opacity-10 text-success small">
      {{ menuItem.category }}
    </span>
  </td>
  <td class="fw-semibold small">{{ menuItem.price.toFixed(2) }}</td>
  <td>
    <span class="badge bg-info bg-opacity-10 text-info small">
      {{ menuItem.specialTag }}
    </span>
  </td>
  <td class="pe-3 text-end">
    <div class="d-flex gap-2 justify-content-end">
      <button class="btn btn-sm btn-outline-success">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-sm btn-outline-danger">
        <i class="bi bi-trash3-fill"></i>
      </button>
    </div>
  </td>
</template>

<script setup>
import { CONFIG_IMG_URL } from '@/constants/config'
defineProps({
  menuItem: {
    type: Object,
    required: true,
  },
})
</script>

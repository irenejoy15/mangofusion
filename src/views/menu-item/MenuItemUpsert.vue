<template>
  <div class="d-flex justify-content-center align-items-center" v-if="loading">
    <div class="spinner-grow text-success" style="width: 2.5rem; height: 2.5rem" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div class="container" v-else>
    <div class="mx-auto">
      <div class="mb-4 border-bottom d-flex justify-content-between align-items-center py-3">
        <h3 class="fw-semibold text-success">Add Menu</h3>
        <div class="d-flex gap-3">
          <button
            type="submit"
            form="menuForm"
            class="btn btn-success btn-sm gap-2 rounded-1 px-4 py-2"
            :disabled="isProcessing"
          >
            <span class="spinner-border spinner-border-sm me-2" v-if="isProcessing"></span>
            {{ menuItemIdForUpdate > 0 ? 'Update' : 'Create' }} ITEM
          </button>

          <button
            type="button"
            class="btn btn-outline border btn-sm gap-2 rounded-1 px-4 py-2"
            :disabled="loading"
            @click="router.push({ name: APP_ROUTE_NAMES.MENU_ITEM_LIST })"
          >
            Cancel
          </button>
        </div>
      </div>
      <div class="alert alert-danger pb-0" v-if="errorList.length > 0">
        Please fix the following errors:
        <ul>
          <li v-for="error in errorList" :key="error">{{ error }}</li>
        </ul>
      </div>
      <form
        enctype="multipart/form-data"
        class="needs-validation"
        id="menuForm"
        @submit="onFormSubmit"
      >
        <div class="row g-4">
          <div class="col-lg-7">
            <div class="d-flex flex-column g-12">
              <div class="mb-3">
                <label for="name" class="form-label">Item Name</label>
                <input
                  id="name"
                  type="text"
                  v-model="menuItemObj.name"
                  class="form-control"
                  placeholder="Enter item name"
                />
              </div>

              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  id="description"
                  v-model="menuItemObj.description"
                  class="form-control"
                  placeholder="Describe the menu item..."
                  rows="3"
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="specialTag" class="form-label">Special Tag (Optional)</label>
                <input
                  id="specialTag"
                  type="text"
                  v-model="menuItemObj.specialTag"
                  class="form-control"
                  placeholder="e.g., Chef's Special"
                />
              </div>

              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <select id="category" class="form-select" v-model="menuItemObj.category">
                  <option value="" disabled selected>--Select category--</option>
                  <option v-for="category in CATEGORIES" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input
                  id="price"
                  type="number"
                  v-model="menuItemObj.price"
                  class="form-control"
                  placeholder="Enter price"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-5">
            <div>
              <img
                v-if="menuItemIdForUpdate > 0 || newUploadImage_base64 != ''"
                :src="
                  newUploadImage_base64 != ''
                    ? newUploadImage_base64
                    : CONFIG_IMG_URL + menuItemObj.image
                "
                class="img-fluid w-100 mb-3 rounded"
                style="aspect-ratio: 1/1; object-fit: cover"
              />
              <div class="mb-3">
                <label for="image" class="form-label">Item Image</label>
                <input
                  id="image"
                  type="file"
                  class="form-control"
                  accept="image/*"
                  @change="handleFileChange"
                />
                <div class="form-text">Leave empty to keep existing image</div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { CATEGORIES } from '@/constants/constants'
import menuItemService from '@/services/menuItemService'
import { CONFIG_IMG_URL } from '@/constants/config'

const loading = ref(false)
const isProcessing = ref(false)
const errorList = reactive([])
const newUploadImage = ref(null)
const newUploadImage_base64 = ref('')

const router = useRouter()
const route = useRoute()
// FOR EDITING, THIS WILL BE POPULATED WITH EXISTING DATA
const menuItemIdForUpdate = route.params.id

const menuItemObj = reactive({
  name: '',
  description: '',
  price: 0,
  category: '',
  specialTag: '',
  image: '',
})

const formData = new FormData()

// FOR EDITING, FETCH EXISTING DATA AND POPULATE THE FORM
// SAME NG ON ONIT
onMounted(async () => {
  if (!menuItemIdForUpdate) return
  loading.value = true
  try {
    const result = await menuItemService.getMenuItemById(menuItemIdForUpdate)
    Object.assign(menuItemObj, result)
  } catch (error) {
    console.error('Error fetching menu item data:', error)
    errorList.push('An error occurred while loading the menu item data. Please try again.')
  } finally {
    loading.value = false
  }
})

const handleFileChange = (event) => {
  isProcessing.value = true
  const file = event.target.files[0]
  newUploadImage.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      newUploadImage_base64.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
  isProcessing.value = false
}

const onFormSubmit = async (event) => {
  isProcessing.value = true
  console.log(newUploadImage.value)
  event.preventDefault()
  errorList.length = 0
  // Basic validation
  if (menuItemObj.name.length < 3) errorList.push('NAME IS AT LEAST 3 CHARACTERS.')
  if (menuItemObj.description.length < 4) errorList.push('DESCRIPTION IS AT LEAST 10 CHARACTERS.')
  if (menuItemObj.price <= 0) errorList.push('PRICE MUST BE GREATER THAN 0.')
  if (menuItemObj.category === '') errorList.push('CATEGORY IS REQUIRED.')
  if (newUploadImage.value) {
    formData.append('File', newUploadImage.value)
  } else {
    // FOR UPDATE, IMAGE IS OPTIONAL. FOR CREATE, IMAGE IS REQUIRED
    if (menuItemIdForUpdate == 0) {
      errorList.push('IMAGE IS REQUIRED.')
    }
  }
  if (!errorList.length) {
    Object.entries(menuItemObj).forEach(([key, value]) => {
      formData.append(key, value)
    })
    console.log('Form data prepared for submission:', Array.from(formData.entries()))

    if (menuItemIdForUpdate == 0) {
      // TODO: Call API to create menu item with formData
      menuItemService
        .createMenuItem(formData)
        .then((response) => {
          console.log('Menu item created successfully:', response.data)
          router.push({ name: APP_ROUTE_NAMES.MENU_ITEM_LIST })
        })
        .catch((error) => {
          console.error('Error creating menu item:', error)
          isProcessing.value = false
          errorList.push('An error occurred while creating the menu item. Please try again.')
        })
    } else {
      // TODO: Call API to update menu item with formData and menuItemIdForUpdate
      menuItemService
        .updateMenuItem(menuItemIdForUpdate, formData)
        .then((response) => {
          router.push({ name: APP_ROUTE_NAMES.MENU_ITEM_LIST })
        })
        .catch((error) => {
          console.error('Error updating menu item:', error)
          isProcessing.value = false
          errorList.push('An error occurred while updating the menu item. Please try again.')
        })
    }
  }
  isProcessing.value = false
}
</script>

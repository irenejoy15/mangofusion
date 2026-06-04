<template>
  <!-- 1st Put header and Footer -->
  <div class="d-flex flex-column min-vh-100 container-md">
    <Header />
    <main class="flex-grow-1 mx-lg-auto w-100">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<!-- Restructure  -->
<script setup>
import Header from './components/layouts/Header.vue'
import Footer from './components/layouts/Footer.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

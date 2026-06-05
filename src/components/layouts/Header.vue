<template>
  <nav class="navbar navbar-expand-md rounded-3 bg-success bg-opacity-10 text-success">
    <router-link class="navbar-brand" :to="{ name: APP_ROUTE_NAMES.HOME }">
      <img src="@/assets/logo.png" height="28px" alt="logo" class="logo" />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.HOME }">Home </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: APP_ROUTE_NAMES.ORDER_LIST }"
            >Order List
          </router-link>
        </li>
        <div class="dropdown">
          <a
            class="btn dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            ADMIN
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <router-link class="dropdown-item" :to="{ name: APP_ROUTE_NAMES.MANAGE_ORDER_ADMIN }"
                >ORDER ADMIN</router-link
              >
            </li>
            <li>
              <router-link class="dropdown-item" :to="{ name: APP_ROUTE_NAMES.MENU_ITEM_LIST }"
                >MENU ITEM LIST</router-link
              >
            </li>
          </ul>
        </div>
      </ul>
      <ul class="navbar-nav ms-auto align-items-center small">
        <li class="nav-item px-1">
          <router-link :to="{ name: APP_ROUTE_NAMES.CART }">
            <i class="bi bi-cart"></i>
            <span class="badge badge-pill bg-danger">{{ cartStore.cartCount }}</span>
          </router-link>
        </li>
        <li class="nav-item mx-1">
          <router-link :to="{ name: APP_ROUTE_NAMES.SIGN_UP }">SIGN UP</router-link>
        </li>
        <li class="nav-item mx-1">
          <router-link>LOG OUT</router-link>
        </li>
      </ul>
    </div>
    <div class="dropdown">
      <a
        class="btn dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-laptop"></i>
      </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li>
          <button class="dropdown-item" @click="themeStore.setTheme('light')">
            <i class="bi bi-sun"></i> LIGHT
          </button>
        </li>
        <li>
          <button class="dropdown-item" @click="themeStore.setTheme('dark')">
            <i class="bi bi-moon"></i> DARK
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { APP_ROUTE_NAMES } from '@/constants/routeNames.js'
import { useThemeStore } from '@/stores/themeStore.js'
import { useCartStore } from '@/stores/cartStore.js'
const themeStore = useThemeStore()
const cartStore = useCartStore()
</script>

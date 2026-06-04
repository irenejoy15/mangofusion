import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref('dark') // Default theme

    const setTheme = (newTheme) => {
      theme.value = newTheme
      document.documentElement.setAttribute('data-bs-theme', newTheme)
    }

    return {
      theme,
      setTheme,
    }
  },
  //2.3 Enable persistence for the theme store
  {
    persist: true, // Enable persistence
  },
)

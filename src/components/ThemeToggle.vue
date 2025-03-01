<script setup lang="ts">
import {useThemeStore} from '../stores';

const themeStore = useThemeStore();
</script>

<template>
  <button
    @click="themeStore.toggleTheme"
    class="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors duration-200"
  >
    <span v-if="themeStore.isDark" class="text-white">🌙</span>
    <span v-else class="text-gray-900">🌞</span>
  </button>
</template>

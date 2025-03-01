<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';
import ThemeToggle from './ThemeToggle.vue';

const isVisible = ref(true);
let lastScrollY = 0;

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isVisible.value = currentScrollY < lastScrollY || currentScrollY < 5;
  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="flex justify-between dark:bg-transparent items-center w-full mb-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Галерея фото</h1>
    <ThemeToggle />
  </div>
</template>

<style scoped></style>

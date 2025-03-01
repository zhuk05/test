<script setup lang="ts">
import {onMounted} from 'vue';
import PhotoTable from './components/PhotoTable/PhotoTable.vue';
import SearchFilter from './components/SearchFilter.vue';
import Header from './components/Header.vue';
import {usePhotoStore} from './stores';

const photoStore = usePhotoStore();

onMounted(() => {
  photoStore.fetchPhotos();
});
</script>

<template>
  <div class="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <div class="container mx-auto px-4 py-8 relative">
      <Header />
      <SearchFilter />
      <PhotoTable />
    </div>
  </div>
</template>

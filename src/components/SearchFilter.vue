<script setup lang="ts">
import {ref} from 'vue';
import {usePhotoStore} from '../stores';

const photoStore = usePhotoStore();
const albumInput = ref('');

const handleSearch = () => {
  photoStore.filterAlbumIds = albumInput.value
    .split(' ')
    .map(id => parseInt(id.trim()))
    .filter(id => !isNaN(id));
  photoStore.fetchPhotos();
};
</script>

<template>
  <div class="mb-6">
    <div class="flex gap-4">
      <input
        type="text"
        v-model="albumInput"
        @keydown.enter="handleSearch"
        placeholder="Введите ID альбома (напр. 1 2 3)"
        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      <button
        @click="handleSearch"
        :disabled="photoStore.loading"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <template v-if="photoStore.loading">
          <svg
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Загрузка...
        </template>
        <template v-else> Поиск</template>
      </button>
    </div>
  </div>
</template>

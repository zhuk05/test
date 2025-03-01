<script setup lang="ts">
import type {Photo} from '../../../stores/PhotoStore/types';

defineProps<{photo: Photo}>();
</script>

<template>
  <tr class="border-t border-neutral-900 dark:border-gray-700">
    <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ photo.id }}</td>
    <td class="px-4 py-2 text-gray-900 dark:text-gray-200">{{ photo.albumId }}</td>
    <td class="px-4 py-2 text-gray-900 dark:text-gray-200">
      <div class="max-w-[180px] truncate" :title="photo.title">{{ photo.title }}</div>
    </td>
    <td class="px-4 py-2 text-gray-900 dark:text-gray-200">
      <div class="max-w-[180px] truncate" :title="photo.url">{{ photo.url }}</div>
    </td>
    <td class="px-4 py-2 text-gray-900 dark:text-gray-200">
      <div :title="photo.thumbnailUrl">
        <img :src="photo.thumbnailUrl" alt="Thumbnail" class="w-16 h-16" />
      </div>
    </td>
  </tr>
</template>

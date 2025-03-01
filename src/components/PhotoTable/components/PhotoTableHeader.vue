<script setup lang="ts">
defineProps<{
  currentSort: string;
  currentOrder: 'asc' | 'desc';
}>();

const emit = defineEmits<{
  (e: 'sort', column: 'id' | 'albumId' | 'title' | 'url' | 'thumbnailUrl'): void;
}>();

const columns = [
  {key: 'id', label: 'ID'},
  {key: 'albumId', label: 'Альбом'},
  {key: 'title', label: 'Название'},
  {key: 'url', label: 'Ссылка'},
  {key: 'thumbnailUrl', label: 'Превью'},
] as const;
</script>

<template>
  <thead class="sticky top-0 bg-gray-200 dark:bg-gray-800">
    <tr>
      <th
        v-for="col in columns"
        :key="col.key"
        @click="emit('sort', col.key)"
        class="min-w-[70px] px-4 py-2 cursor-pointer text-left text-gray-700 dark:text-gray-200"
      >
        <span class="flex gap-2">
          {{ col.label }}
          <span v-if="currentSort === col.key" class="inline-block">
            {{ currentOrder === 'asc' ? '↑' : '↓' }}
          </span>
        </span>
      </th>
    </tr>
  </thead>
</template>

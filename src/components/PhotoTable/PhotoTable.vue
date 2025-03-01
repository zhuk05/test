<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import {usePhotoStore} from '../../stores';
import TableHeader from './components/PhotoTableHeader.vue';
import TableRow from './components/PhotoTableRow.vue';
import Skeleton from './components/PhotoTableSkeleton.vue';

const photoStore = usePhotoStore();
const tableContainer = ref<HTMLElement | null>(null);
const sortBy = ref<'id' | 'albumId' | 'title' | 'url' | 'thumbnailUrl'>('id');
const sortOrder = ref<'asc' | 'desc'>('asc');

const sortedPhotos = computed(() => {
  return [...photoStore.visiblePhotos].sort((a, b) => {
    const modifier = sortOrder.value === 'asc' ? 1 : -1;
    const valueA = a[sortBy.value];
    const valueB = b[sortBy.value];

    if (sortBy.value === 'id' || sortBy.value === 'albumId') {
      return (Number(valueA) - Number(valueB)) * modifier;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB) * modifier;
    }

    return valueA > valueB ? modifier : -modifier;
  });
});

const handleScroll = (e: Event) => {
  const element = e.target as HTMLElement;
  const isNearBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 50;

  if (isNearBottom && !photoStore.loading && photoStore.hasMore) {
    photoStore.loadMore();
  }
};

const handleSort = (column: 'id' | 'albumId' | 'title' | 'url' | 'thumbnailUrl') => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
};

onMounted(() => {
  if (tableContainer.value) {
    tableContainer.value.addEventListener('scroll', handleScroll);
  }
  photoStore.fetchPhotos();
});
</script>

<template>
  <div
    ref="tableContainer"
    class="max-w-[600px] max-h-[600px] mx-auto overflow-auto border rounded-lg border-neutral-900 dark:border-gray-700 table-container"
  >
    <table class="w-full">
      <TableHeader @sort="handleSort" :current-sort="sortBy" :current-order="sortOrder" />
      <tbody>
        <template v-if="photoStore.loading">
          <Skeleton />
        </template>
        <template v-else>
          <TableRow v-for="photo in sortedPhotos" :key="photo.id" :photo="photo" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: #71717bff;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>

import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import type {Photo} from './types';

export const usePhotoStore = defineStore('photoStore', () => {
  const photos = ref<Photo[]>([]);
  const loading = ref(false);
  const currentPage = ref(1);
  const itemsPerPage = ref(30);
  const hasMore = ref(true);
  const filterAlbumIds = ref<number[]>([]);

  const visiblePhotos = computed(() => {
    if (filterAlbumIds.value.length === 0) {
      return photos.value;
    }
    return photos.value.filter(photo => filterAlbumIds.value.includes(photo.albumId));
  });

  async function fetchPhotos() {
    loading.value = true;
    photos.value = [];
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${currentPage.value}&limit=${itemsPerPage.value}`
      );
      const data = await response.json();
      photos.value = data.map((item: any, index: number) => ({
        id: item.id,
        albumId: Math.floor(index / 10) + 1,
        title: `Photo ${item.author}`,
        url: item.url,
        thumbnailUrl: `https://picsum.photos/id/${item.id}/150/150`,
      }));
      hasMore.value = data.length === itemsPerPage.value;
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      loading.value = false;
    }
  }

  async function loadMore() {
    if (loading.value || !hasMore.value) return;

    loading.value = true;
    currentPage.value++;

    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${currentPage.value}&limit=${itemsPerPage.value}`
      );
      const data = await response.json();
      const newPhotos = data.map((item: any, index: number) => ({
        id: item.id,
        albumId: Math.floor(index / 10) + 1,
        title: `Photo ${item.author}`,
        url: item.url,
        thumbnailUrl: `https://picsum.photos/id/${item.id}/150/150`,
      }));

      photos.value = [...photos.value, ...newPhotos];
      hasMore.value = data.length === itemsPerPage.value;
    } catch (error) {
      console.error('Error loading more photos:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    photos,
    loading,
    visiblePhotos,
    filterAlbumIds,
    hasMore,
    fetchPhotos,
    loadMore,
  };
});

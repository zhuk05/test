<script setup lang="ts"></script>

<template>
  <tr v-for="i in 10" :key="i" class="animate-pulse">
    <td colspan="5" class="px-4 py-2">
      <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
    </td>
  </tr>
</template>

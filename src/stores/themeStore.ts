import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useThemeStore = defineStore('themeStore', () => {
  const isDark = ref(false);

  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
    console.log(localStorage.getItem('theme'), isDark.value);
  }

  function toggleTheme() {
    isDark.value = !isDark.value;
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
    console.log(localStorage.getItem('theme'), isDark.value);
  }

  return {
    isDark,
    toggleTheme,
  };
});

import vue from 'eslint-plugin-vue';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      vue,
      '@typescript-eslint': typescript,
      prettier,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: {
          ts: parser,
          js: parser,
          '<template>': parser,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': ['error', {endOfLine: 'auto', bracketSpacing: false}],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
];

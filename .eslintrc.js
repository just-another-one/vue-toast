const path = require('path');

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'eslint-comments', 'import', 'promise', 'unicorn', 'prettier'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',

    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',

    'plugin:prettier-vue/recommended',
    // "prettier",
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
      },
    },
    'prettier-vue': {
      SFCBlocks: {
        template: false,
        script: true,
        style: true,
      },
    },
  },
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'always',
      },
    ],
    'vue/multi-word-component-names': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'camelCase',
        ignore: ['\\.vue$'],
      },
    ],
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        allowList: {
          props: true,
          Props: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // disable prettier
        'prettier/prettier': 'off',
      },
    },
  ],
};

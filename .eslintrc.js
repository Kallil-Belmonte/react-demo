module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/standard',
  ],
  rules: {
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-useless-catch': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
};

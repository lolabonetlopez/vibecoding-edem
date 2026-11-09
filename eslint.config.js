const browser = { document: 'readonly', window: 'readonly' };
const node = { module: 'writable', require: 'readonly', __dirname: 'readonly' };

module.exports = [
  { ignores: ['node_modules/', 'test-results/', 'playwright-report/'] },
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: { ...browser, ...node } },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'eqeqeq': 'error',
      'prefer-const': 'error',
    },
  },
];

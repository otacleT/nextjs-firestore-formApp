module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {project: './tsconfig.json'},
  plugins: ['sort-keys-custom-order', 'simple-import-sort'],
  rules: {
    'no-console': ['error', {allow: ['warn', 'info', 'error']}],
    'no-undef': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys-custom-order/object-keys': ['error', {orderedKeys: ['id', 'name', 'title']}],
    'sort-keys-custom-order/type-keys': ['error', {orderedKeys: ['id', 'name', 'title']}],
    // @typescript-eslint
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/consistent-type-imports': ['warn', {prefer: 'type-imports'}],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

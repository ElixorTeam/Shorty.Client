module.exports = {
  root: true,
  plugins: ['import'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
    'next',
    'prettier',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.js', 'vite.config.ts', 'next.config.js'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'import/no-unresolved': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}

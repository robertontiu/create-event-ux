const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['*.js'],
  rules: {
    // 'react/display-name': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': ['error'],
    // '@typescript-eslint/no-non-null-assertion': ['error'], // ! operator
    // '@typescript-eslint/no-explicit-any': 0, // cast to any (useful in many cases)
    '@typescript-eslint/no-unused-vars': ['error'],
    // '@typescript-eslint/no-namespace': 0, // declare statements (node module type overrides)
    // '@typescript-eslint/no-empty-interface': 0, // type overrides
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false, // While generally we can use Record<string, never> this cannot be composed with other types (e.g. zustand data + actions)
        },
      },
    ],
    '@next/next/no-img-element': 0,
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/hook-use-state': 'error',
    'react/prefer-stateless-function': 'error',
    'react/self-closing-comp': 'error',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-handler-names': 'error',
    'react/jsx-max-depth': ['error', { max: 8 }],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/function-component-definition': 0, // Arrow functions do not play nicely with typescript generics :(
  },
}

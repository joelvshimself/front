import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: '@babel/eslint-parser',  // 👈 Añade el parser de Babel
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react']
        }
      },
      globals: globals.browser
    },
    plugins: {
      react
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn'
    }
  }
];

import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    },
    plugins: {
      react,  // ✅ Importado y usado como objeto
    },
    settings: {
      react: {
        version: 'detect'  // Detecta automáticamente la versión de React
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

module.exports = {
  env: {
    browser: true, 
    commonjs: true, 
    es6: true, 
    jest: true, 
    node: true 
  },
  extends: [],

  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018, 
    sourceType: 'module' 
  },
  plugins: [],
  root: true, 
  rules: {},
  settings: {
    react: {
      version: 'detect'
    }
  }
}
  
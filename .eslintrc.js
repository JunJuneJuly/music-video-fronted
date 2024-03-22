/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description .eslintrc.js
 */

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', '@vue/prettier'],
  rules: {
    'no-undef': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'prettier/prettier': 'off',
    'prefer-template': 'error',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/no-reserved-component-names': 'off',
    'vue/no-v-html': 'off',
    'no-unused-vars': 'off',
    'vue/no-useless-template-attributes': 'off',
    'use-isnan': 'off',
    // 多字组件名称
    'vue/multi-word-component-names': 'off',
    // Vue组件排序
    // Vue属性排序
    'vue/attributes-order':'off',
    'vue/component-definition-name-casing':'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}

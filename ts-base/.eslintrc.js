module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended", 
    "prettier/@typescript-eslint", // 样式规范以 prettier 为准
    "plugin:prettier/recommended" // 样式规范以 prettier 为准
  ],
  rules: {
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "curly": "error",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};

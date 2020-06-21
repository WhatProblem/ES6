module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
  // extends: ["prettier", "plugin:prettier/recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "curly": "error"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
    // ecmaVersion: 2018,
    // sourceType: 'module'
  },
  plugins: [
    "typescript"
  ]
};



// module.exports = {
//   root: true,
//   parser: '@typescript-eslint/parser',
//   plugins: [
//     '@typescript-eslint',
//   ],
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//   ],
// };


// module.exports = {
//   root: true,
//   // parser: '@typescript-eslint/parser',
//   env: {
//     browser: true,
//     es6: true,
//     node: true
//   },
//   parserOptions: {
//     ecmaVersion: 2018,
//     sourceType: 'module'
//   },
//   plugins: [
//     '@typescript-eslint',
//   ],
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'prettier/@typescript-eslint',
//   ],
//   rules: {
//     "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
//     "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
//     "no-dupe-keys": "error",
//     "no-duplicate-case": "error",
//     "no-empty": ["error", { "allowEmptyCatch": true }],
//     "no-ex-assign": "error",
//     "no-extra-boolean-cast": "error",
//     "no-extra-semi": "error",
//     "curly": "error"
//   },
// };
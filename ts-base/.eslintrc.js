module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-semi": "error",
    "curly": "error"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};

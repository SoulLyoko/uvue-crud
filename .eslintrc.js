module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    uni: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {}
};

import pluginQuery from '@tanstack/eslint-plugin-query'

module.exports = {
  plugins: {
    '@tanstack/query': pluginQuery,
  },
  root: true,
  extends: [
    "airbnb-typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],

}

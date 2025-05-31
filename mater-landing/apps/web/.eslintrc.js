module.exports = {
  extends: ["next/core-web-vitals", "../../packages/eslint-config/index.js"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
} 
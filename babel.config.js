module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["module:@preact/signals-react-transform"]],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  };
};

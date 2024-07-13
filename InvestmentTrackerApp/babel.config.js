module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', ["@react-native/babel-preset", { "useTransformReactJSXExperimental": true }]],
    plugins: ['react-native-reanimated/plugin', ["@babel/plugin-proposal-decorators", { "legacy": true }]],
  };
};

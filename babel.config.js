module.exports = function (api) {
  api.cache(true); // Enables Babel caching for faster builds

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind", // Enables NativeWind's JSX transformations
        },
      ],
      "nativewind/babel", // Adds Babel support for NativeWind
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"], // Root directory for module resolution
          alias: {
            "@": "./", // Alias for easier imports
          },
        },
      ],
      "react-native-reanimated/plugin", // Must be the last plugin
    ],
  };
};

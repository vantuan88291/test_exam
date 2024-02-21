module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@asset": "./app/assets/index.ts",
            "@components": "./app/components/index.ts",
            "@navigation": "./app/navigation/index.ts",
            "@redux": "./app/redux/index.ts",
            "@screens": "./app/screens/index.ts",
            "@themes": "./app/themes/index.ts",
            "@utils": "./app/utils/index.ts",
          },
        },
      ],
    ],
  };
};

import "dotenv/config";

export default {
  name: "Catsie",
  slug: "catsie",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  extra: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.dhatguy.catsie",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};

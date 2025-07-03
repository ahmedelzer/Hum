export default {
  expo: {
    name: "HUM-App",
    slug: "HUM-App",
    version: "1.0.0",
    orientation: "portrait",
    platforms: ["ios", "android", "web"],
    icon: "./assets/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: "AIzaSyBnbW28h-CIL5EjCvEKwekTIc46WmIFk6Y",
      },
      bundleIdentifier: "com.HumApp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: "AIzaSyBnbW28h-CIL5EjCvEKwekTIc46WmIFk6Y",
        },
      },
      permissions: [
        "android.permission.RECORD_AUDIO",
        "android.permission.INTERNET",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
      ],
      package: "com.HumApp",
      manifest: {
        application: {
          "android:supportsRtl": true,
        },
      },
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png",
    },
    plugins: [
      // [
      // "expo-image-picker",//that for takes media from device
      // {
      //   photosPermission:
      //     "The app accesses your photos to let you share them with your friends.",
      // },
      // ],
      // 👇 Add your RTL plugin here
      // "./plugins/withRtlSupport",
    ],
    platforms: ["ios", "android", "web"],
    extra: {
      eas: {
        projectId: "e70421d7-bd0c-4677-90b5-2f8d26945831",
      },
    },
    experiments: {
      typedRoutes: true,
    },
  },
};

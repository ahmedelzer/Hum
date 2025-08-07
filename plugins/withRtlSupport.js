// const { withMainActivity } = require("@expo/config-plugins");
//!use it when run prebuild
// module.exports = function withRtlSupport(config) {
//   return withMainActivity(config, (config) => {
//     if (config.modResults.language === "java") {
//       throw new Error(
//         "MainActivity is in Java — this plugin only supports Kotlin (MainActivity.kt)."
//       );
//     }

//     const activity = config.modResults;
//     let src = activity.contents;

//     // Add import if missing
//     if (!src.includes("com.facebook.react.modules.i18nmanager.I18nUtil")) {
//       src = src.replace(
//         /package .*?\n/,
//         (match) =>
//           `${match}import com.facebook.react.modules.i18nmanager.I18nUtil\n`
//       );
//     }

//     // Add the RTL lines in onCreate()
//     src = src.replace(
//       /super\.onCreate\(.*?\)\n/,
//       (match) =>
//         `${match}    I18nUtil.getInstance().allowRTL(this, true)\n    I18nUtil.getInstance().forceRTL(this, true)\n`
//     );

//     activity.contents = src;
//     return config;
//   });
// };

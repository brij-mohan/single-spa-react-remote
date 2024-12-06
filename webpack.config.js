const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app",
    projectName: "react-remote",
    webpackConfigEnv,
    argv,
    // This is the new option that preserves backwards compatibility
    outputSystemJS: true,
  });

  return merge(defaultConfig, {
    externals: ["@app/utility"],
    // modify the webpack config however you'd like to by adding to this object
  });
};

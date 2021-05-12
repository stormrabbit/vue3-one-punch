module.exports = {
  publicPath: "./", 
  outputDir: "dist",
  assetsDir: "assets",
  devServer: {
    host: "0.0.0.0",
    port: 8903, //自己设置的端口号
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
  },
  // 以下是pwa配置
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
  },
};

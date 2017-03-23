const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = function () {
  return {
    devtool: "cheap-module-source-map",
    target: "web",
    entry: [
      path.resolve(__dirname, "src/index")
    ],
    output: {
      path: path.resolve(__dirname, "/dist"),
      publicPath: "/rad2/",
      filename: "bundle.js",
      sourceMapFilename: "bundle.map"
    },
    resolve: {
      extensions: [".js", ".json"],
      modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "src"),
          use: ["babel-loader"]
        },
        {
          test: /\.json$/,
          use: "json-loader"
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.scss$/,
          use: ["css-loader", "sass-loader"]
        },
        {
          test: /\.less$/,
          use: ["css-loader", "less-loader"]
        },
        {
          test: /\.html$/,
          use: "raw-loader",
          exclude: [path.resolve(__dirname, "src/index.html")]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: "file-loader"
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          use: "file-loader"
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {from: "src/assets/icons", to: "assets/icons"},
        {from: "src/assets/fonts", to: "assets/fonts"},
        {from: "src/assets/images", to: "assets/images"},
        {from: "src/index.html", to: "./"},
        {from: "src/assets/webconfigs/web.config", to: "./"}
      ]),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    node: {
      global: true,
      crypto: "empty",
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
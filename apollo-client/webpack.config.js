const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const webpack = require("webpack");
const path = require("path");

const outputPath = path.resolve(__dirname, "dist");

// Webpack 基于 Node 构建的，所以支持所有 Node API 语法
// 向外导出配置信息，export default {} 是向外导出模 API，此处不支持
module.exports = {
  mode: "production",

  // 设置 sourcemaps 为 eval 模式，将模块封装到 eval 包裹起来
  devtool: "eval",

  // 我们应用的入口, 在 `src` 目录
  entry: "index.tsx",

  // 配置 devServer 的输出目录和 publicPath
  output: {
    publicPath: "/",
    path: outputPath,
    filename: "[name].bundle.[hash:5].js"
  },

  // 配置 devServer
  devServer: {
    port: 3006,
    historyApiFallback: true,
    inline: true
  },

  // 定义能够被打包的文件后缀名, 告诉 Webpack 加载 TypeScript 文件
  resolve: {
    // 首先寻找模块中的 .ts(x) 文件, 然后是 .js 文件
    extensions: [".ts", ".tsx", ".js"],

    // 在模块中添加 src, 当你导入文件时，可以将 src 作为相关路径
    modules: ["src", "node_modules"]
  },

  module: {
    rules: [
      // .ts(x) 文件应该首先经过 Typescript loader 的处理, 然后是 babel 的处理
      {
        test: /\.tsx?$/,
        loader: ["ts-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              //表示低于50000字节（50K）的图片会以 base64编码存入bundle中
              limit: 50000,
              // 打包时输出文件的位置  它应该是 上文中的output中的path 和 这里的值的连接
              // outputPath: `${outputPath}/asset/images`,
              // filename: "[name].[hash:5].[ext]",
              // 浏览器中的加载路径
              pulbicPath: path.resolve(__dirname, "src")
            }
          }
        ],
        include: path.resolve(__dirname, "src")
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/index.html")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

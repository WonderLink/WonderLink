const webpack = require('webpack')

// vue.config.js 常用配置
module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 如果你不需要生产环境的source map，可以将其设置为false以加速生产环境构建，默认为true
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    // proxy: 'http://213.59.119.5:8080', // 设置代理
		proxy: 'http://localhost:8080', // 设置代理
	//proxy: 'http://localhost:4000', //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器
	//proxy: { //如果你想要更多的代理控制行为，也可以使用一个 path: options 成对的对象。
	//   '/api': {
	//     target: '<url>',
	//     ws: true,
	//     changeOrigin: true
	//   },
	//   '/foo': {
	//     target: '<other_url>'
	//   }
	// },
    before: app => {}
  },
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
        })
    ]
  }
}
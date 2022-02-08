module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: './',
  devServer: {
    port: 8088,
    proxy: {
      '/ajax': {
        target: 'http://m.maoyan.com',
        // ws: true,
        changeOrigin: true
      }
    //   '/foo': {
    //     target: '<other_url>'
    //   }
    }
  }
}

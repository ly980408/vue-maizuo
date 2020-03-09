module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  assetsDir: './',
  devServer: {
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

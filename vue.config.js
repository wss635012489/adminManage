const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@v': '@/views',
        '@img':'@/assets/img',
        '@t':'@/types',
        '@a':'@/http'
      }
    }
  }
})

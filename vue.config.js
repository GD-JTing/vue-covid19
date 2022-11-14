const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            // 代理的顺序：从前往后匹配的，先匹配到哪个就用哪个
            '/apis': {
                target: 'http://apis.juhe.cn',
                changeOrigin: true,
                pathRewrite: {
                    "^/apis": ""
                }
            },
            '/api': {
                target: 'http://iwenwiki.com',
                changeOrigin: true,
            }
        }
    }
})
//测试环境
const webpack                   = require('webpack')
const config                    = require('./webpack.base.config')
const path                      = require("path");
const CleanPlugin               = require('clean-webpack-plugin');


config.output.path=path.resolve(__dirname, '../dist/production');
config.output.filename = 'js/[name].[hash].js',
config.output.chunkFilename = "js/[name].[hash].js"

//打包api 替换
config.module.rules=(config.module.rules || []).concat([
    {
        // index.html script脚本引入
        test: path.resolve(__dirname, '../src/index.html'),
        loader: 'webpack-dll-loader',
        exclude: "/node_modules/",
        options:{
            publicPath:'/libs/',
            manifest:path.resolve(__dirname, '../dist/production/libs/libs-manifest.json')
        }
    },
    {
        test: path.resolve(__dirname, '../src/assets/common/js/configs.js'),
        loader: 'string-replace-loader',
        exclude: "/node_modules/",
        query: {
            multiple: [
                { search: /123456/, replace: '987654321' },
            ]
        }
    },
])

config.optimization={
    splitChunks: {
        chunks: "all",
        minSize: 30000,
        minChunks: 1,
        cacheGroups: {
            commons: {
                name: "commons",
                chunks: "all",
                minChunks: 2
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                name: 'vendors',
                priority: 10,
                enforce: true
            },
            styles: {
                name: 'styles',
                test: /\.(scss|css)$/,
                chunks: 'all',
                minChunks: 1,
                reuseExistingChunk: true,
                enforce: true
            }
        }
    },
    runtimeChunk: {
        name: 'manifest'
    }
}

config.plugins = (config.plugins || []).concat([
    new CleanPlugin(path.resolve(__dirname, '../dist/production')),

    // 增加DllReferencePlugin配置
    new webpack.DllReferencePlugin({
        context:path.join(__dirname, '../dist/production/libs'), 
        manifest: require("../dist/production/libs/libs-manifest.json")
    }),
])


module.exports = config






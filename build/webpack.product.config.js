//测试环境
const webpack                   = require('webpack')
const config                    = require('./webpack.base.config')
const path                      = require("path");
const CleanPlugin               = require('clean-webpack-plugin');
const SpeedMeasurePlugin        = require("speed-measure-webpack-plugin")
const smp                       = new SpeedMeasurePlugin()


config.output.path=path.resolve(__dirname, '../dist/production');
config.output.filename = 'js/[name].[hash].js',
config.output.chunkFilename = "js/[name].[hash].js"

//打包api 替换
config.module.rules=(config.module.rules || []).concat([
    {
        test: path.resolve(__dirname, '../src/index.html'),
        loader: 'webpack-dll-loader',
        exclude: "/node_modules/",
        options:{
            publicPath:'/libs/',
            manifest:path.resolve(__dirname, '../dist/production/libs/libs-manifest.json')
        }
    },
    {
        test: path.resolve(__dirname, '../src/assets/common/js/config.js'),
        loader: 'string-replace-loader',
        exclude: "/node_modules/",
        query: {
            multiple: [
                { search: /123456/, replace: '987654321' },
            ]
        }
    },
    {
        test: /router\.js$/,
        loader: 'vue-router-lazy-replace-loader',
        exclude: "/node_modules/",
        options: {
            version: 'v1'
        }
    }
])

config.optimization={
    splitChunks: {
        chunks: "all",
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: 10,
                enforce: true,
                chunks: "initial",
            },
            styles: {
                name: 'styles',
                test: /\.(scss|css)$/,
                minChunks: 2,
                priority: 20,
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


module.exports = smp.wrap(config)






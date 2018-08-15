//测试环境
const webpack               	= require('webpack')
const config                	= require('./webpack.base.config')
const path                  	= require("path");
const CleanPlugin           	= require('clean-webpack-plugin')
const SpeedMeasurePlugin        = require("speed-measure-webpack-plugin")
const smp                       = new SpeedMeasurePlugin()
const CleanWebpackPlugin        = require('clean-webpack-plugin')


config.output.path=path.resolve(__dirname, '../dist/test');

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
        test: path.resolve(__dirname, '../src/assets/common/js/configs.js'),
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

config.devtool = 'inline-source-map';

config.plugins = (config.plugins || []).concat([
    new CleanWebpackPlugin(['test/js'], {
        root: path.resolve(__dirname, '../dist'),
        verbose: true,
        dry: false,
    }),
])

module.exports = smp.wrap(config)






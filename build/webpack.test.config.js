//测试环境
const webpack               	= require('webpack')
const config                	= require('./webpack.base.config')
const path                  	= require("path");
const CleanPlugin           	= require('clean-webpack-plugin');


config.output.path=path.resolve(__dirname, '../dist/test');

//打包api 替换
config.module.rules=(config.module.rules || []).concat([
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

config.devtool = 'inline-source-map';

config.plugins = (config.plugins || []).concat([
  	new CleanPlugin(path.resolve(__dirname, '../dist/test')),
])


module.exports = config






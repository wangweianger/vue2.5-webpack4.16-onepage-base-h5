/* author:zane
** time:2018-08-08
*/
const webpack               = require('webpack')
const path                  = require("path")
const HtmlWebpackPlugin     = require('html-webpack-plugin')
const VueLoaderPlugin       = require('vue-loader/lib/plugin')

module.exports = {
    mode:'development',
    devtool: 'inline-source-map',
    entry:{
        main:[
            'babel-polyfill',
            path.resolve(__dirname, '../src/main.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: "[name].js"
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test:/\.css$/, 
                use:[ 'vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader","css-loader","sass-loader"]
            },
            {
                test: /\.sass$/,
                use: [
                'vue-style-loader',
                'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            },
            {
            　　test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
        　　 },
            {
            　　test: /\.(xlsx|xls)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=8192&name=files/[name].[ext]'
        　　 },
        ],
        noParse: function(content) {
            return /jquery|lodash/.test(content);
        }
    },
    performance: {
      hints: false
    },
    resolve:{
        extensions: ['.js', '.vue', '.json'],
        alias:{
            vue$:'vue/dist/vue.runtime.common.js',
            components: path.resolve(__dirname, '../src/components'),
            commonvue: path.resolve(__dirname, '../src/commonvue'),
            pages: path.resolve(__dirname, '../src/pages'),
        },
    },
    optimization:{
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
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title:'首页',
            template:path.resolve(__dirname, '../src/index.html'),
            inject: true,
            hash: true,
            cache: true,
            chunks: ['manifest','vendors','main'],
            chunksSortMode: 'manual',
            favicon:path.resolve(__dirname, '../favicon.ico'),
        }),
    ]
}



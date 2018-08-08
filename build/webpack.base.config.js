/* author:zane
** time:2018-08-08*/
const webpack               = require('webpack')
const path                  = require("path")
const HtmlWebpackPlugin     = require('html-webpack-plugin')
const VueLoaderPlugin       = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")
const ParallelUglifyPlugin  = require('webpack-parallel-uglify-plugin')
const ProgressBarPlugin     = require('progress-bar-webpack-plugin')
const chalk                 = require('chalk')
const isDev                 = !!(process.env.NODE_ENV != 'production')

// 多线程
const HappyPack             = require('happypack');
const os                    = require('os');
const happyThreadPool       = HappyPack.ThreadPool({ size: os.cpus().length });

// 生产环境使用
const pluginsConfigs =isDev?[]:[
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[contenthash:12].css'
    }),
    new ParallelUglifyPlugin({
        uglifyES: {
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin({
        format: chalk.blue.bold("build  ") + chalk.cyan("[:bar]") + chalk.green.bold(':percent') + ' (' + chalk.magenta(":elapsed") + ' seconds) ',
        clear: false
    }),
]

module.exports = {
    mode:isDev?'development':'production',
    devtool: isDev?'inline-source-map':false,
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
                use:{ loader:'vue-loader' },
            },
            {
                test: /\.js$/,
                exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
                use: ['happypack/loader?id=js'],
            },
            {
                test:/\.css$/, 
                exclude:/node_modules/,
                use:isDev?['vue-style-loader', 'css-loader']:[ MiniCssExtractPlugin.loader,'vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude:/node_modules/,
                use: ["vue-style-loader","css-loader","sass-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude:/node_modules/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            },
            {
            　　 test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                exclude:/node_modules/,
            　　 loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
        　　 },
            {
            　　 test: /\.(xlsx|xls)(\?.*$|$)/,
                exclude:/node_modules/,
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
    plugins:[
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader',
                options: {
                    presets: [ 'env' ],
                }
            }],
        }),
        ...pluginsConfigs,
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title:'首页',
            template:path.resolve(__dirname, '../src/index.html'),
            inject: true,
            hash: true,
            cache: true,
            // chunks: 'all',
            // chunksSortMode: 'manual',
            favicon:path.resolve(__dirname, '../favicon.ico'),
        }),
    ]
}



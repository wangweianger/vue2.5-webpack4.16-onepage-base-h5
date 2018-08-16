/* 
* @author:wangwei
* @time:2018-08-08
*/
const webpack               = require('webpack')
const path                  = require("path")
const fs                    = require('fs')
const HtmlWebpackPlugin     = require('html-webpack-plugin')
const VueLoaderPlugin       = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")
const ParallelUglifyPlugin  = require('webpack-parallel-uglify-plugin')
const ProgressBarPlugin     = require('progress-bar-webpack-plugin')
const chalk                 = require('chalk')
const isDev                 = !!(process.env.NODE_ENV != 'production')

// 生产环境使用
const pluginsConfigs =isDev?[]:[
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[contenthash:12].css'
    }),
    new ParallelUglifyPlugin({
        uglifyES: {
            compress: {
                warnings: false,  
                drop_console: true,  
                collapse_vars: true,  
                reduce_vars: true,  
            },
            output: {
                beautify: false, 
                comments: false, 
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

// 读取写好的 loading 态的 html 和 css
const loading = {
    html: fs.readFileSync(path.join(__dirname, '../src/loading.html'))
}


module.exports = {
    mode:isDev?'development':'production',
    devtool: isDev?'inline-source-map':false,
    entry:{
        main:[
            // 'babel-polyfill',
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
                exclude:/node_modules/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                use:[{loader: 'babel-loader',options: { presets: [ 'env' ] }}],
            },
            {
                test:/\.css$/, 
                use:isDev?['vue-style-loader', 'css-loader']:[ MiniCssExtractPlugin.loader,'vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude:/node_modules/,
                use: ["vue-style-loader","css-loader","sass-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]',
            },
            {
            　　 test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
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
        new VueLoaderPlugin(),
        ...pluginsConfigs,
        
        new HtmlWebpackPlugin({
            title:'首页',
            template:path.resolve(__dirname, '../src/index.html'),
            inject: true,
            hash: true,
            cache: true,
            // chunks: 'all',
            // chunksSortMode: 'manual',
            favicon:path.resolve(__dirname, '../favicon.ico'),
            loading: loading
        }),
    ]
}



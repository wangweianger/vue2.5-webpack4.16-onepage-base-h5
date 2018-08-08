const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const buildDir = process.env.BUILD_TYPE == 'build'?'production':'test'
const distpath = `../dist/${buildDir}/libs`

module.exports = {
    mode:'production',
    devtool: false,
    entry: {
        vendor: [
            'vue',
            'vuex',
            'vue-router',
            'accounting',
        ]
    },
    output: {
        path: path.join(__dirname, distpath), // 打包后文件输出的位置
        filename: '[name]_[hash].js',
        library: '[name]_[hash]' 
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["vue-style-loader","css-loader","sass-loader"]
            },
            {
                test:/\.css$/, 
                use:[ 'vue-style-loader', 'css-loader']
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
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
            },
            {
            　　test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            　　loader: 'url-loader?importLoaders=1&limit=1000&name=fonts/[name].[ext]'
        　　 },
        ]
    },
    //自动补全识别后缀
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$:'vue/dist/vue.runtime.common.js',
            components: path.resolve(__dirname, '../src/components'),
            commonvue: path.resolve(__dirname, '../src/commonvue'),
            pages: path.resolve(__dirname, '../src/pages'),
        },
    },
    plugins: [
        // 清除上一次生成的文件
        new CleanWebpackPlugin([`${buildDir}/libs`], {
            root: path.resolve(__dirname, '../dist'),
            verbose: true, 
            dry: false,
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, distpath, '[name]-manifest.json'),
            name: '[name]_[hash]', 
            context:path.join(__dirname, distpath), 
        }),
        
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
};







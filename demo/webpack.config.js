var JadePluginsPath = './../node_modules/';

var webpack = require( JadePluginsPath + 'webpack'),
    path = require( JadePluginsPath + 'path'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
    aliasConfig = require('./../config/alias.config');

console.log("*******************xxMod Components Alias Config*******************Start");
console.log(aliasConfig());
console.log("*********************************************************************End");

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        path: './dist',
        publicPath: 'dist/',
        filename: '[name].js'
    },
    module:
{        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader","css-loader!sass-loader")
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'file?name=[name].[ext]?[hash]'
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new ExtractTextPlugin("./../main.css", {
            allChunks: true
        })
        // new webpack.ProvidePlugin({
        //     "$": "jquery",
        //     "jQuery": "jquery",
        //     "window.jQuery": "jquery"
        // }),
    ],
    resolve: {
        // root: '此处不宜用绝对路径;欲用别名，切记路径;JeffJade[03-25]',
        alias: aliasConfig()
    },
    //添加了此项，则表明从外部引入，内部不会打包合并进去
    externals: {
        jquery: 'window.jQuery'
    },
    devtool: 'source-map'
}

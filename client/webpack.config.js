const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const path = require('path');

const isProd = false;

module.exports = {        
    mode: isProd ? 'production' : 'development',
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'havatar.js',
        library: 'avatar',
        clean: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "css/*" },
                { from: "art/*" },
                { from: "avatars/*/*" },
            ],
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Webpack Example App',
            header: 'Webpack Example Title',
            metaDesc: 'Webpack Example Description',
            template: './index.html',
            filename: 'index.html',
            inject: 'body'
        }),

    ],   
    entry: './src/index.js'
   
    // clear the webpack project folder before building


};
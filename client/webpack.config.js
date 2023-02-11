const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const path = require('path');

module.exports = {

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "css/*" },
                { from: "avatars/aj/*" },
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
    //devtool: "inline-source-map",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'avatar',
        clean: true
    },
    // clear the webpack project folder before building

    
    devServer: {
        open: true
    }
};
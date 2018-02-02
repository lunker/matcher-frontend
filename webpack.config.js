const webpack=require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: [
        __dirname + '/index.js'
    ], // -- webpack을 수행할 bundle 대상 js file 들

    output : {
        path: __dirname + '/public/',
        filename : 'bundle.js'
    }, // entry에 지정된 파일들을 bundling한 결과물 처리

    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 10000,
        contentBase: __dirname + '/public/'
    },

    plugins: [

    ],

    module: {
      loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                cacheDirectory: true,
                presets: ['es2015', 'react']
            }
          },
          {
            test: /\.css/,
            include: /node_modules/,
            loader: 'css-loader'
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000'
          }
      ] // end loader
    }
};

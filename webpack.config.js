const webpack=require('webpack');

module.exports = {
    entry: [
        __dirname + '/src/main/resources/static/App.js',
        __dirname + '/src/main/resources/static/layout/Header.js',
        __dirname + '/src/main/resources/static/layout/body.js',
        __dirname + '/src/main/resources/static/layout/footer.js'


    ], // -- webpack을 수행할 bundle 대상 js file 들

    output : {
        path: __dirname + '/src/main/resources/dist',
        filename : 'bundle.js'
    }, // entry에 지정된 파일들을 bundling한 결과물 처리

    devServer: {
        inline: true,
        port: 10000,
        contentBase: __dirname + '/src/main/resources/templates',
        historyApiFallback: true
    },

    plugins: [
        new webpack.NamedModulesPlugin() //브라우저에서 HMR 에러발생시 module name 표시
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
            }
        ]
    }
};

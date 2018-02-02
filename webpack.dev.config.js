const webpack=require('webpack');

module.exports = {
    entry: [
        './index.js'
        // 'webpack-dev-server/client?http://0.0.0.0:3001',
        // 'webpack/hot/only-dev-server'
    ], // -- webpack을 수행할 bundle 대상 js file 들
    output : {
        path: __dirname + '/public/',
        filename : 'bundle.js'
    }, // entry에 지정된 파일들을 bundling한 결과물 처리
    devServer: {
        // hot: true,
        inline: true,
        port: 3001,
        contentBase: __dirname + '/public/',
        historyApiFallback: true,
        proxy: {
            // "**": "http://localhost:3000"
            "**": {
                target: `http://localhost:3000`,
                bypass: function (req) { // ,res, proxyOptions
                    if (/(.*)(\.hot-update\.js|json)$/.test(req.url)) {
                        return `/js${req.url}`;
                    }
                    return false; // 이 외는 (bypass 하지 않는다 === proxy 한다.)
                }
            }
        }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin() //브라우저에서 HMR 에러발생시 module name 표시
    ],
    resolveLoader: {
        moduleExtensions: ['-loader']
    },

    module: {
        loaders: [
            {
              test: /.js$/,
              loader: 'babel',
              exclude: /node_modules/,
              query: {
                  cacheDirectory: true,
                  presets: ['es2015', 'react'],
                  plugins: ["react-hot-loader/babel"]
              }
            }
        ]
    }
};

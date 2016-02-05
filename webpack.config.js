var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

console.log("Building for "+process.env.NODE_ENV);

var config = {
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'public', 'dist'),
        filename: "bundle.js"
    },
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['stage-0', 'es2015', 'react']
                }
            },
            // {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
            {test: /\.scss$/, loaders: ['style', 'css', 'sass']},
            {test: /\.less$/, loaders: ['style', 'css', 'less']},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            },
            {
                test: /\.gif/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            },
            {
                test: /\.jpg/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            },
            {
                test: /\.png/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            },
            {
                test: require.resolve("react"),
                loader: "expose?React"
            }
        ]
    },
    //devServer: {
    //    contentBase: "./",
    //    inline: true,
    //    colors: true,
    //    historyApiFallback: true
    //},
    postcss: [ 
      autoprefixer({ browsers: ['last 2 versions'] }) 
    ],
    plugins: [
        new ExtractTextPlugin('bundle.css', { allChunks: true })
        //, new webpack.NoErrorsPlugin()
    ]
};

module.exports = config;

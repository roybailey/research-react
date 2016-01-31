var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

console.log("Building for "+process.env.NODE_ENV);

function getEntrySources(sources) {
    //if (process.env.NODE_ENV !== 'production') {
       // sources.push('webpack-dev-server/client?http://localhost:3030');
       sources.push('webpack/hot/only-dev-server');
    //}
    // sources.push('webpack-dev-server');
    return sources;
}

var config = {
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    // entry: {
    //    ResearchReact: getEntrySources([
    //        'babel-polyfill',
    //        './src/app/App.js'
    //    ])
    // },
    entry: [
        'babel-polyfill',
        'webpack/hot/only-dev-server',
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
    devServer: {
        contentBase: "./",
        //noInfo: true, //  --no-info option
        inline: true,
        colors: true,
        hot: true,
        historyApiFallback: true
    },
    postcss: [ 
      autoprefixer({ browsers: ['last 2 versions'] }) 
    ],
    plugins: [
        new ExtractTextPlugin('simple.css', { allChunks: true }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            ReactDOM: 'react-dom',
            React: 'react'
        })
    ]
};


/*
 * If bundling for production, optimize output
if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
    config.plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({comments: false}),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify('production')}
        })
    ];
}
 */

module.exports = config;

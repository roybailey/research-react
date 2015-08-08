var webpack = require('webpack');

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}

module.exports = {
    entry: {
        ResearchReact: getEntrySources([
            './src/main/js/ResearchReact.jsx'
        ])
    },
    output: {
        //publicPath: 'http://localhost:8080/',
        filename: 'public/[name].js'
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['react-hot', 'jsx', 'babel'], exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            { test: /\.less$/, loaders: ['style', 'css', 'less'] }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.jsx', '.json']
    }
};

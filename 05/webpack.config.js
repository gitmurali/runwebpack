var path = require('path'),
    webpack = require("webpack");

function fromRootDir(matchPath) {
    return new RegExp(process.cwd() + matchPath);
}

module.exports = {
    cache: true,
    debug: true,
    devtool: 'eval',
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, "build"),
        filename: 'build.min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    }

};

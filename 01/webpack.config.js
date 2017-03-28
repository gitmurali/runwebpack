/**
 * Created by mprasanth on 26/03/2017.
 */
var path = require("path");

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    }
};

// run webpack from here to generate bundle.js
// run webpack -w flag to watch changes for js changes
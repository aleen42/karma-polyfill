const fs = require('fs');
const webpack = require('webpack');
const config = require('./webpack.config');

// clean the dist folder
fs.existsSync('dist') && fs.rmdirSync('dist', {recursive : true});

// build all versions
webpack(config).run(webpackCallback);

function log(msg) {
    log.logged ? console.log('') : (log.logged = true); // add blank line
    console.log(msg);
}

function webpackCallback(err, stats) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    log(stats.toString({
        colors : true,
    }));
}

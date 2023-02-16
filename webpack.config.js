/*
 *                                                               _
 *   _____  _                           ____  _                 |_|
 *  |  _  |/ \   ____  ____ __ ___     / ___\/ \   __   _  ____  _
 *  | |_| || |  / __ \/ __ \\ '_  \ _ / /    | |___\ \ | |/ __ \| |
 *  |  _  || |__. ___/. ___/| | | ||_|\ \___ |  _  | |_| |. ___/| |
 *  |_/ \_|\___/\____|\____||_| |_|    \____/|_| |_|_____|\____||_|
 *
 *  ===============================================================
 *             More than a coder, More than a designer
 *  ===============================================================
 *
 *  - Author: aleen42
 *  - Description: webpack configurations for bundling code
 *  - Create Time: Jan 19th, 2022
 *  - Update Time: Feb 16th, 2023
 *
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const ES3HarmonyPlugin = require('./build/ES3HarmonyPlugin');

// noinspection WebpackConfigHighlighting
module.exports = {
    mode   : 'production',
    target : ['web', 'es5'],
    output : {
        path : path.resolve(__dirname, 'dist'),
    },

    module : {
        rules : [{
            test    : /\.js$/,
            include : [
                {not : /node_modules/},
                /node_modules[\\/]((socket|engine)\.io-(client|parser))[\\/]/,
            ],
            use     : [{
                loader  : 'babel-loader',
                options : {
                    presets : [
                        ['@babel/env', {
                            forceAllTransforms : true,
                            loose              : true,
                            modules            : false, // ES6 modules should be processed only by webpack

                            // naming anonymous functions is problematic
                            // REF: https://github.com/babel/babel/issues/1087#issuecomment-373375175
                            exclude : ['@babel/plugin-transform-function-name'],
                        }],
                    ],
                },
            }, {loader : require.resolve('./build/stripDebugLoader.js')}],
        }, {
            test    : /\.js$/,
            include : [
                {not : /node_modules/},
                /node_modules[\\/]core-js[\\/]/,
            ],
            use     : require.resolve('./build/stripWebAPILoader.js'),
        }],
    },

    entry : {
        'index.min'              : ['./lib/index'],
        'jasmine.min'            : ['./lib/jasmine'],
        'socket.io.polyfill.min' : ['./lib/socket.io'],
    },

    optimization : {
        minimizer : [new TerserPlugin({terserOptions : {ie8 : true}})],
    },

    plugins : [new ES3HarmonyPlugin()],
};

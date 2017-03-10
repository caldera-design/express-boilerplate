'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const compact = require('lodash/compact');

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !isProduction;

module.exports = {
    target: 'node',
    entry: {
        tests: './tests/index',
        main: './src/index'
    },
    externals: nodeModules,
    context: __dirname,
    devtool: isProduction ? 'cheap-module-source-map' : 'inline-source-map',
    node: {
        __filename: true,
        __dirname: true
    },
    output: {
        path: './target',
        filename: 'bundle.[name].js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        alias: {
            api: path.join(__dirname, 'src')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.mustache$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: compact([
        isProduction && new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        }),
        isDev && new webpack.BannerPlugin('require("source-map-support").install();', {
            raw: true,
            entryOnly: false
        })
    ])
};

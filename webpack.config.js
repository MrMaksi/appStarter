var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcssImport = require('postcss-smart-import');

var env = process.env.NODE_ENV || 'development';
var appPath = path.join(__dirname, './app');
var wwwPath = path.join(__dirname, './www');

var config = {
    entry: path.join(appPath, 'index.js'),
    output: {
        path: path.join(wwwPath),
        filename: 'bundle.[hash].js'
    },
    devServer: {
        port: '9001',
        contentBase: 'www',
        historyApiFallback: true,
        compress: true,
        inline: true,
        watchContentBase: true,
        filename: 'bundle.js',
        hot: true,
        stats: {colors: true},
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        }
    },
    module: {
        rules: [
            {
                test: /.*\.html$/,
                exclude: /index\.html/,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['ie >= 9', 'last 5 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            hash: 'sha512',
                            digest: 'hex',
                            name: '[hash].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            optipng: {
                                optimizationLevel: 4
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devtool: 'eval',
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(appPath, 'assets/img'),
                to: path.join('assets', 'img')
            }
        ]),
        new ExtractTextPlugin({
            filename: 'index.[contenthash].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(appPath, 'index.html'),
            inject: 'head',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                unsafe: true,
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};

module.exports = config;
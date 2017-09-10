const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
let clientConfig, serverConfig;

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`;

            return externals
        }, {})
}

clientConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: './client',
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'superagent'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['transform-runtime', 'add-module-exports'],
                cacheDirectory: true
            }
        }, {
            test: /\.(scss|css)$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
        }, {
            test: /\.(png|jpg|gif|webp|bmp|woff|woff2|svg|ttf|eot)($|\?)/i,
            loader: 'url-loader?limit=8000'// 限制大小小于5k
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'html?minimize=false'
        }]
    },
    postcss: [autoprefixer({browsers: ['> 5%']})],
    resolve: {extensions: ['', '.js', '.jsx','.json', '.scss','.less','.css']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].[chunkhash:8].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            filename: '../../views/prod/index.html',
            template: './views/tpl/index.tpl.html',
            chunksSortMode: 'none'
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css', {allChunks: true})
    ]
}

serverConfig = {
    context: path.resolve(__dirname, '..'),
    entry: {server: './server/server.prod'},
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                plugins: ['add-module-exports'],
                cacheDirectory: true
            }
        }, {
            test: /\.(scss|css)$/,
            exclude: /node_modules/,
            loaders: [
                'css',
                'sass'
            ]
        }, {
            test: /\.(png|jpg|gif|webp|bmp|woff|woff2|svg|ttf|eot)($|\?)/i,
            loader: 'url-loader?limit=8000'// 限制大小小于5k
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    externals: getExternals(),
    resolve: {extensions: ['', '.js', '.json', '.scss']},
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    ]
}

module.exports = [clientConfig, serverConfig]

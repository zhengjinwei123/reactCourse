const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: [
            './client',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ],
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
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
                    plugins: ['transform-runtime', 'add-module-exports'],
                    cacheDirectory: true
                }
            }, {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.html$/,
                loader: 'html?minimize=false'
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loaders: ['style', 'css?localIdentName=[name]__[local]__[hash:base64:8]', 'postcss', 'less']
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style', 'css?localIdentName=[name]__[local]__[hash:base64:8]', 'postcss']
            }, {
                test: /\.(png|jpg|gif|webp|bmp|woff|woff2|svg|ttf|eot)($|\?)/i,
                loader: 'url-loader?limit=8000'// 限制大小小于5k
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html?minimize=false'}
        ]
    },
    postcss: [
        require('autoprefixer') //调用autoprefixer插件，例如 display: flex
    ],
    resolve: {extensions: ['', '.js', '.json', '.scss', '.jsx']},
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            filename: '../views/dev/index.html',
            template: './views/tpl/index.tpl.html'
        }),
        new ProgressBarPlugin({summary: false})
    ]
}

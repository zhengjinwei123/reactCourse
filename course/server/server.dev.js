// Provide custom regenerator runtime and core-js
require('babel-polyfill');

// Node babel source map support
require('source-map-support').install();

// Javascript require hook
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
});

// Css require hook
require('css-modules-require-hook')({
    extensions: ['.scss','.css'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
});

//png|jpg|gif|webp|bmp|woff|woff2|svg|ttf|eot
// Image require hook
require('asset-require-hook')({
    name: '/[hash].[ext]',
    extensions: ['jpg', 'png', 'gif', 'webp','bmp','woff','woff2','svg','ttf','eot'],
    limit: 8000
});

const app = require('./app.js'),
    settings  = require("./settings");
    convert = require('koa-convert'),
    webpack = require('webpack'),
    serve = require('koa-static'),
    fs = require('fs'),
    path = require('path'),
    devMiddleware = require('koa-webpack-dev-middleware'),
    hotMiddleware = require('koa-webpack-hot-middleware'),
    views = require('koa-views'),
    router = require('./routes'),
    clientRoute = require('./middlewares/clientRoute'),
    response = require("./middlewares/response"),
    jsonResponse = require("./middlewares/jsonResponse"),
    config = require('../build/webpack.dev.config'),
    port = process.env.port || settings.port,
    mongooseUtil = require("./utils/mongoose/db");
    compiler = webpack(config);

    // let Trunkify = require("thunkify-wrap");


mongooseUtil.set(settings.mongodb.host, settings.mongodb.port, settings.mongodb.db, null, path.join(__dirname,"./models/schemas/"));
// Webpack hook event to write html file into `/views/dev` from `/views/tpl` due to server render
compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets;
    let file, data;

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key);
            data = assets[key].source();
            fs.writeFileSync(file, data)
        }
    });
    callback()
});

app.use(views(path.resolve(__dirname, '../views/dev'), {map: {html: 'ejs'}}));
app.use(response);
app.use(jsonResponse);
app.use(clientRoute);
app.use(router.routes());
app.use(router.allowedMethods());
console.log(`\n==> server  Listening on port ${port}. Open up http://${settings.host}:${port}/ in your browser.\n`);
app.use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
})));

app.use(serve(path.join(__dirname,'../client/statics/')));
app.use(convert(hotMiddleware(compiler)));
app.listen(port,settings.host);

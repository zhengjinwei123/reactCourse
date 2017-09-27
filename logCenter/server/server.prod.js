require('babel-polyfill');

// Node babel source map support
require('source-map-support').install();

// Javascript require hook
require('babel-register')({
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['add-module-exports']
});

let Koa = require('koa'),
    json = require('koa-json'),
    bodyParser = require('koa-bodyparser'),
    logger = require('koa-logger'),
    session = require('koa-session'),
    compress = require('koa-compress'),
    convert = require('koa-convert'),
    path = require('path'),
    router = require('./routes'),
    Settings = require('./settings'),
    response = require('./middlewares/response'),
    jsonResponse = require('./middlewares/jsonResponse'),
    port = process.env.port || Settings.listen.port,
    mongooseUtil = require("./utils/mongoose/db");

global.rootPath = path.resolve(__dirname, "../");

const app = new Koa();
app.keys = ['this is a fucking secret'];
app.use(convert(session(app)));
app.use(compress());
app.use(bodyParser());
app.use(json());
app.use(logger());


let schemaList = [
    require("./models/schemas/user")
];
mongooseUtil.set(Settings.mongodb.host, Settings.mongodb.port, Settings.mongodb.db, null, global.rootPath + "/server/models/schemas", schemaList);

app.use(response);
app.use(jsonResponse);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, Settings.host);
console.log(`\n==> server Listening on port ${port}.\n`);






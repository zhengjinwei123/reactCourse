import 'babel-polyfill'
import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import app from './app'
import router from './routes'
import clientRoute from './middlewares/clientRoute'
import Settings from './settings';
import response from './middlewares/response'


const port = process.env.port || Settings.port;
import mongooseUtil from "./utils/mongoose/db";

let schemaList = [
    require("./models/schemas/user")
];

mongooseUtil.set(Settings.mongodb.host, Settings.mongodb.port, Settings.mongodb.db, null, path.resolve(__dirname,"../server/models/schemas"),schemaList);


app.use(views(path.resolve(__dirname, '../views/prod'), {map: {html: 'ejs'}}));
app.use(serve(path.resolve(__dirname, '../dist/client')));
app.use(response);
app.use(clientRoute);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port,Settings.host);
console.log(`\n==> server Listening on port ${port}. Open up http://${Settings.host}:${port}/ in your browser.\n`);




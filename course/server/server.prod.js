import 'babel-polyfill'
import serve from 'koa-static'
import path from 'path'
import views from 'koa-views'
import app from './app'
import router from './routes'
import clientRoute from './middlewares/clientRoute'
import Settings from './settings';

const port = process.env.port || Settings.port;
let mongooseUtil = require("./utils/mongoose/db");
mongooseUtil.set(settings.mongodb.host, settings.mongodb.port, settings.mongodb.db, null, path.join(__dirname,"./models/schemas/"));


app.use(views(path.resolve(__dirname, '../views/prod'), {map: {html: 'ejs'}}));
app.use(serve(path.resolve(__dirname, '../dist/client')));
app.use(clientRoute);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);
console.log(`\n==> server Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);

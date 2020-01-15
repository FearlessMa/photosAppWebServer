import * as Koa from 'koa';
import koaBodyparser = require('koa-bodyparser');
import logger from './middleware/logger';
import { getFile, getFileName } from './utils';
import * as Router from 'koa-router';
import { urlMap, serverConfig } from './config/urlMap';
import * as session from 'koa-session';
import { config, keys } from './session';
import * as menuInit from './sql/menuClass';
import * as cors from 'koa2-cors';


menuInit.menuUtils.queryMenus('p_menus', '');
const app = new Koa();
const router: Router = new Router();
const a: any = app;
app.keys = keys;
app.use(session(config, a))
app.use(koaBodyparser());
app.use(logger());

app.use(cors({
  origin: function (ctx) {
    console.log('cors ctx: ', ctx);
    // if (ctx.url === '/upload/photos') {
    //     return "*"; // 允许来自所有域名请求
    //   }
    //   return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    return "*"; // 允许来自所有域名请求
  },
}))



//获取router下的所有文件路径
const rootPath = __dirname;
const routerPath: string = rootPath + serverConfig.routerPath;
const routerFileNames: Array<string> = getFile(routerPath);
//设置koa路由
routerFileNames.forEach((path: string) => {
  let fileName: string = getFileName(path);
  let requestUrl: string = urlMap[fileName];
  if (requestUrl) {
    let module = require(routerPath + '/' + path).default;
    router.use(requestUrl, module.routes(), module.allowedMethods());
  }
})

app.use(router.routes());

app.listen(serverConfig.port, (): void => {
  console.log('server is running', 'http://127.0.0.1:' + serverConfig.port);
});



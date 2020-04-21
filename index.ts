import * as Koa from 'koa';
// import koaBodyparser = require('koa-bodyparser');
import logger from './middleware/logger';
import verifyState from './middleware/verifyState';
import { getFile, getFileName } from './utils';
import * as Router from 'koa-router';
import { urlMap, serverConfig } from './config/urlMap';
import * as session from 'koa-session';
import { config, keys } from './session';
import * as menuInit from './sql/menuClass';
import * as cors from 'koa2-cors';
import * as koaStatic from 'koa-static';
import * as path from 'path'

const koaBody = require('koa-body');

menuInit.menuUtils.queryMenus('p_menus', '');
const app = new Koa();
const router: Router = new Router();
const a: any = app;
app.keys = keys;
app.use(session(config, a))
// app.use(koaBodyparser());
app.use(koaBody({
  multipart: true, // 支持文件上传
  encoding: 'utf-8',
  formidable: {
    // uploadDir: path.join(__dirname, 'static/upload/'), // 设置文件上传目录
    hash: 'md5',
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 200 * 1024 * 1024, // 文件上传大小
    onFileBegin: (name, file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
    onError: (err) => {
      console.log('err: ', err);
    },
  },
  jsonStrict: false,
  patchNode: true
}));
app.use(logger());
app.use(verifyState());
app.use(koaStatic(path.join(__dirname, '/')))

app.use(cors({
  origin: function (ctx) {
    return ctx.request.header.origin; // 允许来自所有域名请求
  },
  maxAge: 86400,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
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



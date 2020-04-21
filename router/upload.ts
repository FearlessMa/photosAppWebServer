import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as fs from 'fs';
import * as path from 'path';
import { uuid, isDir } from '../utils';
import * as moment from 'moment';

const now = moment().format('YYYY-MM-DD HH:mm:ss');
const home: Router = new Router();

const optionsFn = async (ctx: Koa.Context, next) => {
  console.log('ctx: optionsFn');
  ctx.status = 200;
  await next();
}

interface ctxFile {
  request: {
    files: { file: any, uploadFile: any },
    [name: string]: any,
  }
  [name: string]: any,

}

const upload = async (ctx: ctxFile, next) => {
  const { uploadFile } = ctx.request.body;
  const files = ctx.request.files;
  let file = files.file || files.uploadFile;

  if (!files || !file) {
    ctx.body = { code: 400, message: '上传失败' }
    await next();
    return;
  }
  // TODO 校验身份
  const fileName = file.name;
  const uid = ctx.cookies.get('uid');
  const userNameSpace = uid ? 'u' + uid : '';
  // 可度流
  const readerStream = fs.createReadStream(file.path);
  const staticDir = '/static/upload/' + userNameSpace + '/';
  const writerPath = path.join(__dirname, '..' + staticDir)
  // 后缀名
  const ext = fileName.substr(fileName.indexOf('.') + 1, fileName.length);
  const uuidFileName = uuid() + '.' + ext;
  // 是否存在文件夹
  if (!isDir(writerPath)) {
    fs.mkdirSync(writerPath)
  }
  // 可泻流
  const writerStream = fs.createWriteStream(writerPath + uuidFileName);
  // 管道传入
  readerStream.pipe(writerStream);

  const fileMsg = {
    filePath: staticDir + uuidFileName,
    fileName: file.name,
    fileType: file.type,
    uuidFileName,
    ext,
    uid,
    staticDir,
    size: file.size,
    hash: file.hash,
    uploadFile,
    uploadTime: now
  }
  ctx.status = 200;
  ctx.body = {
    code: 200,
    fileMsg
  };
  await next();
}




home.get('/', optionsFn as any);
home.post('/', upload as any);
home.options('/', optionsFn as any);

export default home;
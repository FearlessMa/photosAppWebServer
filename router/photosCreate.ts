import * as Koa from 'koa';
import * as Router from 'koa-router';
import { connectSql, querySQLCreator, insertSQLCreator } from "../sql"
import * as moment from "moment"

const now = moment().format('YYYY-MM-DD HH:mm:ss');

const photosDir: Router = new Router();
const fn = async (ctx: Koa.Context, next) => {
  const body = ctx.request.body;
  const uid = ctx.cookies.get('uid');
  console.log('ctx: ', ctx);
  const { uploadType, uploadMsg, uploadName, uploadDescription } = body;
  let errs = null;
  let insertRes = null;
  let resData = {
    code: 200,
    data: {
      body,
      uploadName,
      uploadMsg,
      uploadType,
      insertRes
    },
    errs,
    message: 'success'
  }


  if (uploadType && uploadType === 'dir') {
    try {
      const { res } = await createPhotosDirectory({ uploadMsg, uploadName, uploadDescription, uid })
      console.log('res: ', res);
      insertRes = res;
    } catch (err) {
      errs = err
    }
  } else {
    uploadPhotosIntoAlbum({ uploadMsg, uploadName })
  }
  if (errs) {
    resData = {
      ...resData,
      code: 400,
      errs,
      message: '失败'
    }
  }
  ctx.status = 200;
  ctx.body = resData;
  await next();
}
photosDir.get('/', fn as any);
photosDir.post('/', fn as any);

export default photosDir;


const createPhotosDirectory = async ({ uploadMsg, uploadName, uid,uploadDescription = '暂无' }) => {
  const { filePath, uploadTime } = uploadMsg;
  const insertSql = insertSQLCreator(
    'p_photo_album', `user_id,name,description,cover,update_time,create_time`,
    `(${uid},'${uploadName}','${uploadDescription}','${filePath || ''}','${uploadTime || now}','${now}')`
  )
  return await connectSql(insertSql)
}
const uploadPhotosIntoAlbum = ({ uploadMsg, uploadName }) => {

}
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { querySQLCreator } from '../sql/sqlUtils';
import { connectSql } from '../sql';

const photoAlbum: Router = new Router();
const fn = async (ctx: Koa.Context, next) => {
  const SQLSelectAlbum = querySQLCreator('p_photo_album', 'order by id desc');
  const { res }: any = await connectSql(SQLSelectAlbum)
  ctx.status = 200;
  ctx.body = { code: 200, data: res };

  await next();
}
photoAlbum.get('/', fn as any);
photoAlbum.post('/', fn as any);

export default photoAlbum;
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { querySQLCreator } from '../sql/sqlUtils';
import { connectSql } from '../sql';

const photoAlbumDetail: Router = new Router();
const fn = async (ctx: Koa.Context, next) => {
  const { albumId } = ctx.request.body;
  console.log('albumId: ', albumId);
  const uid = ctx.cookies.get('uid');
  const SQLSelectPhoto = querySQLCreator('p_photo', `where user_id=${uid} and album_id=${albumId}`);
  const { res }: any = await connectSql(SQLSelectPhoto)
  ctx.status = 200;
  ctx.body = { code: 200, SQLSelectPhoto, res, albumId };

  await next();
}
photoAlbumDetail.get('/', fn as any);
photoAlbumDetail.post('/', fn as any);

export default photoAlbumDetail;
import * as Koa from 'koa';
import * as Router from 'koa-router';

const userInfo: Router = new Router();
const fn = async (ctx: Koa.Context, next) => {
  const sid = ctx.cookies.get('sid');
  // const uid = ctx.cookies.get('uid');
  const session = ctx.session;
  let data = {
    code: 200,
    userInfo: null
  };
  try {
    data.userInfo = { ...JSON.parse(session.data[0].sessionValue), sid }
  } catch (e) {
    data.code = 404;
  }
  ctx.status = 200;
  ctx.body = data;

  await next();
}
userInfo.get('/', fn as any);

export default userInfo;
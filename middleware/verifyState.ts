import * as Koa from 'koa';
import { sessionIncludesData } from '../utils';

interface INext {
  (): Promise<any>
}

export default function (): Koa.Middleware {
  return async (ctx: Koa.Context, next: INext): Promise<any> => {
    // 验证是否登录超时
    if(ctx.path.includes('/static')){
      await next();
    }else if (ctx.path !== '/user/login') {
      const sid = ctx.cookies.get('sid');
      const uid = ctx.cookies.get('uid');
      const session = ctx.session;
      if (!sid || !sessionIncludesData(session.data, uid, sid)) {
        ctx.code = 200;
        ctx.body = { code: 401, msg: "未登录或登录超时" }
      } else {
        await next();
      }
    } else {
      await next();
    }
  }
}
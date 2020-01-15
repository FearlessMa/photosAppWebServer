import * as Router from 'koa-router';
import * as Koa from 'koa';
import * as SQl from '../sql';
import { querySQLCreator } from '../sql/sqlUtils';
import { sessionIncludesData } from '../utils';
const page: Router = new Router();

const errData = {
  code: 0,
  data: null,
  message: '账号或密码错误！'
}

page.post('/', async (ctx: any, next: any) => {
  const data = {
    code: 200,
    sqlRes: {},
    data: {
    },
    message: '成功'
  }
  const { userName, password } = ctx.request.body;

  //获取数据库中查找session的返回结果
  // const login = ctx.session.res || false;
  console.log('ctx.session:11234 ', ctx.session);
  const sessionKey = ctx.cookies.get('sid');
  const uid = ctx.cookies.get('uid');
  console.log('sessionKey: cookieSid111', sessionKey);
  let isLogin = false;
  if (sessionKey && uid) {
    const session = ctx.session;
    console.log('session: ', session);
    // session.data.forEach(item => {
    //   console.log('item: ', item);
    //   if (!item) return;
    //   const sessionValue = JSON.parse(item.sessionValue);
    //   if (sessionValue.uid == uid && item.sessionKey == sessionKey) {
    //     isLogin = true;
    //   }
    // })
    isLogin = sessionIncludesData(session.data, uid, sessionKey,userName);
    console.log('isLogin: ', isLogin);
  }
  if (isLogin) {
    ctx.body = { ...data, message: '已经登录过了', data: { userName, uid: ctx.session.uid }, session: ctx.session, ctx, sessionKey, };
  } else {
    if (!userName || !password) {
      ctx.body = errData;
    } else {
      const sqlUser = querySQLCreator('p_user', `where username = '${userName}' and password='${password}'`)
      const { res } = await SQl.querySQL(sqlUser)
      // console.log('res:111 ', res);
      if (res.length && res[0].id) {
        const userRole = res[0].role;
        const uid = res[0].id;
        // const sqlRole = `select * from p_roles where role = '${userRole}'`;
        // const roleRes = await SQl.querySQL(sqlRole);
        // console.log('roleRes: ', roleRes);
        // data.sqlRes = { user: res, roles: roleRes };
        // data.data.menu = JSON.parse(roleRes.res[0].menus);
        //存入数据库的数据 userName ： userName
        const userInfo = {
          userName,
          userRole,
          uid
        }
        ctx.session = userInfo;
        ctx.cookies.set('uid', uid);
        ctx.body = { ...data, session: ctx.session, data: { userName, uid } };
      } else {
        ctx.body = errData;
      }
    }
  }
  await next();
})
page.get('/123/', async (ctx: any, next: any) => {
  // console.log('ctx: ', ctx);
  const data = {
    code: 200,
    sqlRes: {},
    data: {
      menu: []
    },
    message: '成功'
  }
  ctx.body = data;
  await next();
})

export default page;
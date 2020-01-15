import * as Router from 'koa-router';
import * as Koa from 'koa';
import * as menuInit from '../sql/menuClass';
import { sessionIncludesData } from '../utils'
const page: Router = new Router();
const roleMenu = {
  0: 'adminMenus',
  1: 'normalUsersMenus'
}
const data = {
  code: 200,
  data: [
    {
      name: "1",
      icon: 'user',
      children: []
    },
    {
      name: "2",
      icon: 'user',
      children: []
    },
    {
      name: "3",
      icon: 'user',
      children: []
    },
  ],
  message: '成功'
}

page.post('/', async (ctx: any, next: any) => {
  ctx.body = data;
  await next();
})
page.get('/', async (ctx: any, next: any) => {
  let data = {
    code: 200,
    data: [],
    msg: 'success'
  }
  const session = ctx.session;
  console.log('session:menu ', session);
  const sessionKey = ctx.cookies.get('sid');
  const uid = ctx.cookies.get('uid');
  const equals = sessionIncludesData(session.data, uid, sessionKey);
  if (equals) {
    const role = JSON.parse(session.data[0].sessionValue).userRole;
    data.data = menuInit.menuUtils._menu[roleMenu[role]]
  }
  ctx.body = data;
  await next();
})

export default page;
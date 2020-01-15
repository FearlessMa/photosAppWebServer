import * as Router from 'koa-router';
import { config } from '../session';
const page: Router = new Router();

const resData = {
    code: 200,
    data: {},
    msg: 'success',
}

page.post('/', async (ctx: any, next) => {
    const session = ctx.session;
    console.log('session: ', session);
    const sessionKey = ctx.cookies.get('sid');
    console.log('sessionKey: ', sessionKey);
    if(sessionKey){
        const res = await config.store.destroy(sessionKey);
        console.log('res:logout ', res);
    }
    ctx.body = { ...resData, session };

    await next();
})

export default page;
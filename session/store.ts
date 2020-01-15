import session = require("koa-session");
const storage = {

}

// export const store: session.stores = {
//   get(key, maxAge) {
//     console.log('storage', storage)

//     return storage[key];
//   },
//   set(key, sess, maxAge) {
//     storage[key] = sess;
//   },
//   destroy(key) {
//     delete storage[key];
//   }
// }

// session store 的抽象类
abstract class ISStore {
  abstract get(K): any
  abstract set(k, v): void
  abstract destroy(k): any

}
/**
 *  koa-session Store
 *
 * @export 
 * @class SessionStore 
 * @implements {ISStore}
 */
export class SessionStore implements ISStore {
  /**
   *Creates an instance of SessionStore.
   * @param {*} connect 链接数据库方法
   * @param {*} query 查询sql 
   * @param {*} deleteStr 删除sql
   * @param {*} insert 插入sql
   * @memberof SessionStore
   */
  private connect?: any;
  private query?: string;
  private insert?: string;
  private deleteStr?: string;
  constructor({ connect, query = '', deleteStr = '', insert = '' }) {
    this.connect = connect
    this.query = query;
    this.insert = insert;
    this.deleteStr = deleteStr
  }
  async get(k) {
    console.log('k:get ', k);
    const { res } = await this.connect(`select * from p_session where sessionKey=${JSON.stringify(k)}`)
    console.log('res: get', res);
    return { data: res};
  }
  async set(k, v) {
    console.log('k: ', k);
    console.log('v: ', v);
    if (!k) throw new Error("sessionKey is undefined");
    const getSessionRes = await this.get(k);
    console.log('getSessionRes: ', getSessionRes);
    if (getSessionRes.data.length) {
      const res = await this.connect(`update  p_session set sessionValue=${"'" + JSON.stringify(v) + "'"} where sessionKey=${"'" + k + "'"}`)
      console.log('res: update', res);
    } else {
      const res = await this.connect(`insert into p_session (sessionKey, sessionValue) values (${"'" + k + "'"},${"'" + JSON.stringify(v) + "'"})`)
      console.log('res:insert ', res);
    }
  }
  async destroy(k) {
    const res = await this.connect(`delete from p_session where sessionKey=${JSON.stringify(k)}`);
    return res;
  }
}

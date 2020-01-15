import { SessionStore } from './store';
import { querySQL } from '../sql';
import { querySQLCreator, insertSQLCreator, deleteSQLCreator } from '../sql/sqlUtils';

const sStore = new SessionStore({ connect: querySQL, query: '', insert: '', deleteStr: '' });
export const keys = ['abcdef'];          // 作为cookies签名时的秘钥

export const config = {
  key: 'sid',                        // cookie的键名
  maxAge: 60000*30,                       // 过期时间
  overwrite: false,                        // 是否覆盖cookie
  httpOnly: false,                         // 是否JS无法获取cookie
  signed: false,                           // 是否生成cookie的签名，防止浏览器暴力篡改
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  // encode: (json) => JSON.stringify(json+'12345'), // 自定义cookie编码函数
  // decode: (str) => JSON.parse(str),        // 自定义cookie解码函数
  rolling: false,
  // / **（布尔值）强制在每个响应上设置会话标识符cookie。到期重置为原始的maxAge，重置到期倒数。（默认值为false）* / 
  renew: true,
  // / **（布尔值）在会话即将过期时更新会话，因此我们始终可以使用户保持登录状态。（默认值为false）* /
  store: sStore,
  // store
};



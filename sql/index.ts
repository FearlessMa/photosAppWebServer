
import * as mysql from 'mysql';
import {
  querySQLCreator,
  insertSQLCreator,
  deleteSQLCreator,
  updateSQLCreator
} from './sqlUtils';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'photosApp'
});

/**
 * 操作数据库
 *
 * @param {*} sqlStr sql语句
 * @returns promise
 */
const connectSql: ConnectSql = (sqlStr) => {
  // console.log('sqlStr: ', sqlStr);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('err: ', err);
        reject(err);
      }
      connection.query(sqlStr, (err, res, fileds) => {
        // console.log('fileds: ', fileds);
        // console.log('res: connectSql', res);

        if (err) {
          console.log('err: ', err);
          reject(err);
        } else {
          resolve({ res })
        }
        connection.release();
      })
    })
  })
}

// const test = async () => {
//   const res = await query("select * from p_user where username = 'admin' and password= '123456'")
//   console.log('res: ', res);
// }
// test()

interface Connect {
  connectSql: (sqlStr: string) => Promise<{ res: any }>
}
type ConnectSql = (sqlStr: string) => Promise<{ res: any }>
export {
  connectSql,
  querySQLCreator,
  insertSQLCreator,
  deleteSQLCreator,
  updateSQLCreator
  // querySQL: query,
  // connectSql: query
}

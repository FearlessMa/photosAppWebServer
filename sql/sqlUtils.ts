
/**
 * 查询数据
 *
 * @param {*} tableName 表名
 * @param {*} selectCondition 条件语句  例 where name='a' 
 * @param {string} [selectParams='*'] 查询属性
 * @returns sql语句
 */
const querySQLCreator = (tableName: string, selectCondition: string = "", selectParams: string = '*'): string => {
  return `select ${selectParams} from ${tableName} ${selectCondition}`
}
/**
 * 插入数据
 *
 * @param {*} tableName 表名 
 * @param {*} insertKey 插入的key值
 * @param {*} insertValues 插入的值
 * @returns 插入语句
 */
const insertSQLCreator = (tableName: string, insertKey: string, insertValues: string): string => {
  return `insert into ${tableName} (${insertKey}) values ${insertValues};`
}
/**
 * 删除数据
 *
 * @param {*} tableName 表名
 * @param {*} selectCondition 条件语句 
 * @returns 删除语句
 */
const deleteSQLCreator = (tableName: string, selectCondition: string): string => {
  return `delete from ${tableName} ${selectCondition}`
}
/**
 * 修改数据
 *
 * @param {string} tableName 表名
 * @param {string} condition 条件语句
 * @returns {string} sql修改语句
 */
const updateSQLCreator = (tableName: string, condition: string): string => {
  // UPDATE students SET name='大牛', score=66 WHERE id=1;
  return `update ${tableName} set ${condition}`
}

export {
  querySQLCreator,
  insertSQLCreator,
  deleteSQLCreator,
  updateSQLCreator
}
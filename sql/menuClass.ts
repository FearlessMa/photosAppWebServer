import * as SQL from './index';
import { querySQLCreator, insertSQLCreator, deleteSQLCreator, updateSQLCreator } from './sqlUtils';
interface IMenu {
    name: string,
    parent_id: number,
    [name: string]: any
}
/**
 * 菜单查找 增删改查操作后更新内存中菜单数据 
 *
 * @class MenuUtils
 */
class MenuUtils {
    public _menu = null;
    constructor(menu = {}) {
        this._menu = menu;
    }
    // 获取menus
    queryMenus = async (tableName: string, selectCondition: string, selectParams?: string) => {
        const queryStr = querySQLCreator(tableName, selectCondition, selectParams);
        // console.log('queryStr: ', queryStr);
        const { res }: any = await SQL.connectSql(queryStr)
        // console.log('res: ', res);
        if (res.length) {
            this._menu.adminMenus = this.formatTreeMenus(res);
            this._menu.normalUsersMenus = this.formatTreeMenus(res.filter(item => item.role == 1))
        }
        const updateAdmin = updateSQLCreator('p_roles', `menus='${JSON.stringify(res)}' where role=0 `);
        const updateNormalUsers = updateSQLCreator('p_roles', `menus='${JSON.stringify(this._menu.normalUsersMenus)}' where role=1 `);
        const updateAdminRes = await SQL.connectSql(updateAdmin);
        // console.log('updateAdminRes: ', updateAdminRes);
        const updateNormalUsersRes = await SQL.connectSql(updateNormalUsers);
        // console.log('updateNormalUsersRes: ', updateNormalUsersRes);

    }

    insertMenus = async (tableName: string, insertKey: string, insertValue: string) => {
        const insertStr = insertSQLCreator(tableName, insertKey, insertValue);
        // console.log('insertStr: ', insertStr);
    }
    deleteMenus = () => { }
    updateMenus = () => { }

    /**
     * 生成tree结构menuList
     * @param {IMenu[]} menuList
     * @memberof MenuUtils
     * @return {IMenu[]} menuList
     */
    formatTreeMenus = (menuList: IMenu[]) => {
        const levelOneMenus: IMenu[] = [];
        const otherMenus: IMenu[] = [];
        menuList.forEach((menu: IMenu) => {
            if (menu.parent_id) {
                otherMenus.push(menu)
            } else {
                levelOneMenus.push(menu)
            }
        })
        const list = this.formatMenus(otherMenus, otherMenus);
        return this.formatMenus(levelOneMenus, list)
    }

    formatMenus = (list: IMenu[], otherList: IMenu[]): IMenu[] => {
        return list.map((menu: IMenu) => {
            otherList.forEach((item: IMenu) => {
                if (menu.m_id == item.parent_id) {
                    if (Array.isArray(menu.children)) {
                        menu.children.push(item)
                    } else {
                        menu.children = [item]
                    }
                }
            })
            return menu;
        })
    }
}

export const menuUtils = new MenuUtils();
// console.log('menuUtils: ', menuUtils);


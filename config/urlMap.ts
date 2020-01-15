
interface IUrlMap {
  [name: string]: string
}
const serverConfig = {
  port: 9000,
  routerPath: '/router',
};
const urlMap: IUrlMap = {
  home: '/',
  getMenuList: '/getMenuList',
  login:'/user/login',
  logout:'/user/logout',
  upload:'/upload/photos',
}

export {
  urlMap,
  serverConfig
}
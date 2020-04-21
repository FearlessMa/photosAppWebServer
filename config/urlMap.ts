
interface IUrlMap {
  [name: string]: string
}
const serverConfig = {
  port: 9000,
  routerPath: '/router',
  static:'/static'
};
const urlMap: IUrlMap = {
  home: '/',
  menu: '/menu',
  login: '/user/login',
  logout: '/user/logout',
  upload: '/upload/photos',
  userInfo: '/userInfo',
  photoAlbum: '/photo/album',
  photoAlbumDetail: '/photo/album/detail',
  photosCreate:'/photos/create'
}

export {
  urlMap,
  serverConfig
}
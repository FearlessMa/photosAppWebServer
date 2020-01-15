# mock使用说明

* 使用mock在webpackDevServer中已设置proxy,在api文件中增加'/mockApi'使用mock

```js
  //api文件中开启mock
  {
    soundWaveSensorList: '/mockApi/xx', 
  }
  // webpackDevServer中的设置proxy
  '/mockApi': {
      target: "http://localhost:9000",
      pathRewrite: { '^/mockApi': '' }
  },

```

* 在mock的config的urlMap中增加请求url的映射

```js
  getMenuList: '/getMenuList',
```

* 在mock的route文件夹中创建对于的mock文件，文件名要与 urlMap中的key值相同如 getMenuList.js

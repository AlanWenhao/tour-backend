# tour-backend

[中文文档](https://github.com/AlanWenhao/tour-backend/blob/master/README-zh.md)
## how to start
```
1.change config.js to match you local mySql database connection setting and rename it to `config.js` 

2.install the dependences
$ npm install

3.create tables, make sure that you've set the database which in config.js
$ npm run create

4.start node application
$ npm run start` or just `npm start
```

## response data code
- success
    - 200
- error
    - 400 客户端参数有错误
    - 401 token认证错误
    - 500 服务端错误

## mockup
[Koa2-blog](https://github.com/wclimb/Koa2-blog)  


import * as path from 'path'
import * as Koa from 'koa'
import * as views from 'koa-views'
import * as koaStatic from 'koa-static'
import * as bodyParser from 'koa-bodyparser'
import * as koaLogger from 'koa-logger'
import * as session from 'koa-session-minimal'
import MysqlStore = require('koa-mysql-session')

import { config } from './../config';
import routers from './routers/index'

const app = new Koa()

// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../static')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)

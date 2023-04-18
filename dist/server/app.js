"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Koa = require("koa");
const views = require("koa-views");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const koaLogger = require("koa-logger");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");
const config_1 = require("./../config");
const index_1 = require("./routers/index");
const app = new Koa();
// session存储配置
const sessionMysqlConfig = {
    user: config_1.config.database.USERNAME,
    password: config_1.config.database.PASSWORD,
    database: config_1.config.database.DATABASE,
    host: config_1.config.database.HOST,
};
// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}));
// 配置控制台日志中间件
app.use(koaLogger());
// 配置ctx.body解析中间件
app.use(bodyParser());
// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './../static')));
// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));
// 初始化路由中间件
app.use(index_1.default.routes()).use(index_1.default.allowedMethods());
// 监听启动端口
app.listen(config_1.config.port);
console.log(`the server is start at port ${config_1.config.port}`);

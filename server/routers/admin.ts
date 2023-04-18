/**
 * 管理员用户子路由
 */

import koaRouter = require('koa-router');
const router = new koaRouter()
import admin from './../controllers/admin'

module.exports = router.get( '/', admin.indexPage )
/**
 * 工作台子路由
 */

import * as Router from 'koa-router'
const router = new Router()
const controller = require('./../controllers/work')


const routers = router
  .get('/', controller.indexPage)


module.exports = routers
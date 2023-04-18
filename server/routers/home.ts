/**
 * 主页子路由
 */
import * as Router from 'koa-router'
const router = new Router()
import index from '../controllers/index'

export default router
  .get('/', index)

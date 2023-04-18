/**
 * 整合所有子路由
 */

import * as Router from 'koa-router'
const router = new Router()

import home from './home'
import api from './api'
import admin from './admin'
import work from './work'
import error from './error'

router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/work', work.routes(), work.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())

export default router



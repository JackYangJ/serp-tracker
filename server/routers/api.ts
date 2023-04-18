/**
 * restful api 子路由
 */

import * as Router from 'koa-router'
const router = new Router()
import userInfoController from './../controllers/user-info'

const routers = router
  .get('/user/getUserInfo.json', userInfoController.getLoginUserInfo)
  .post('/user/signIn.json', userInfoController.signIn)
  .post('/user/signUp.json', userInfoController.signUp)
 
  
module.exports = routers

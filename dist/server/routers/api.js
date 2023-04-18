"use strict";
/**
 * restful api 子路由
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
const user_info_1 = require("./../controllers/user-info");
const routers = router
    .get('/user/getUserInfo.json', user_info_1.default.getLoginUserInfo)
    .post('/user/signIn.json', user_info_1.default.signIn)
    .post('/user/signUp.json', user_info_1.default.signUp);
module.exports = routers;

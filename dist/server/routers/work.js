"use strict";
/**
 * 工作台子路由
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
const controller = require('./../controllers/work');
const routers = router
    .get('/', controller.indexPage);
module.exports = routers;

"use strict";
/**
 * 管理员用户子路由
 */
Object.defineProperty(exports, "__esModule", { value: true });
const koaRouter = require("koa-router");
const router = new koaRouter();
const admin_1 = require("./../controllers/admin");
module.exports = router.get('/', admin_1.default.indexPage);

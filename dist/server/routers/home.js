"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 主页子路由
 */
const Router = require("koa-router");
const router = new Router();
const index_1 = require("../controllers/index");
exports.default = router
    .get('/', index_1.default);

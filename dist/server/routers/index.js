"use strict";
/**
 * 整合所有子路由
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
const home_1 = require("./home");
const api_1 = require("./api");
const admin_1 = require("./admin");
const work_1 = require("./work");
const error_1 = require("./error");
router.use('/', home_1.default.routes(), home_1.default.allowedMethods());
router.use('/api', api_1.default.routes(), api_1.default.allowedMethods());
router.use('/admin', admin_1.default.routes(), admin_1.default.allowedMethods());
router.use('/work', work_1.default.routes(), work_1.default.allowedMethods());
router.use('/error', error_1.default.routes(), error_1.default.allowedMethods());
exports.default = router;

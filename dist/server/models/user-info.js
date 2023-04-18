"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_util_1 = require("./../utils/db-util");
const user = {
    /**
     * 数据库创建用户
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    async create(model) {
        const result = await db_util_1.default.insertData('user_info', model);
        return result;
    },
    /**
     * 查找一个存在用户的数据
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getExistOne(options) {
        const _sql = `
    SELECT * from user_info
      where email="${options.email}" or name="${options.name}"
      limit 1`;
        let result = await db_util_1.default.query(_sql, []);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        }
        else {
            result = null;
        }
        return result;
    },
    /**
     * 根据用户名和密码查找用户
     * @param  {object} options 用户名密码对象
     * @return {object|null}         查找结果
     */
    async getOneByUserNameAndPassword(options) {
        const _sql = `
    SELECT * from user_info
      where password="${options.password}" and name="${options.name}"
      limit 1`;
        let result = await db_util_1.default.query(_sql, []);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        }
        else {
            result = null;
        }
        return result;
    },
    /**
     * 根据用户名查找用户信息
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getUserInfoByUserName(userName) {
        let result = await db_util_1.default.selectWhere(['id', 'email', 'name', 'detail_info', 'create_time', 'modified_time', 'modified_time'], 'user_info', `userName=${userName}`);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        }
        else {
            result = null;
        }
        return result;
    },
};
exports.default = user;

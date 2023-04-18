"use strict";
/**
 * 用户业务操作
 */
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("validator");
const user_info_1 = require("./../models/user-info");
const user_1 = require("./../codes/user");
const user = {
    /**
     * 创建用户
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    async create(user) {
        const result = await user_info_1.default.create(user);
        return result;
    },
    /**
     * 查找存在用户信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    async getExistOne(formData) {
        const resultData = await user_info_1.default.getExistOne({
            'email': formData.email,
            'name': formData.userName,
            'password': ''
        });
        return resultData;
    },
    /**
     * 登录业务操作
     * @param  {object} formData 登录表单信息
     * @return {object}          登录业务操作结果
     */
    async signIn(formData) {
        const resultData = await user_info_1.default.getOneByUserNameAndPassword({
            'password': formData.password,
            'name': formData.userName,
            'email': ''
        });
        return resultData;
    },
    /**
     * 根据用户名查找用户业务操作
     * @param  {string} userName 用户名
     * @return {object|null}     查找结果
     */
    async getUserInfoByUserName(userName) {
        const resultData = await user_info_1.default.getUserInfoByUserName(userName) || {};
        const userInfo = {
            // id: resultData.id,
            email: resultData.email,
            userName: resultData.name,
            detailInfo: resultData.detail_info,
            createTime: resultData.create_time
        };
        return userInfo;
    },
    /**
     * 检验用户注册数据
     * @param  {object} userInfo 用户注册数据
     * @return {object}          校验结果
     */
    validatorSignUp(userInfo) {
        const result = {
            success: false,
            message: '',
        };
        if (/[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false) {
            result.message = user_1.default.ERROR_USER_NAME;
            return result;
        }
        if (!validator_1.default.isEmail(userInfo.email)) {
            result.message = user_1.default.ERROR_EMAIL;
            return result;
        }
        if (!/[\w+]{6,16}/.test(userInfo.password)) {
            result.message = user_1.default.ERROR_PASSWORD;
            return result;
        }
        if (userInfo.password !== userInfo.confirmPassword) {
            result.message = user_1.default.ERROR_PASSWORD_CONFORM;
            return result;
        }
        result.success = true;
        return result;
    }
};
exports.default = user;

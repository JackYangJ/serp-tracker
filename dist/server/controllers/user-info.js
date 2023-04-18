"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.getLoginUserInfo = exports.signUp = exports.signIn = void 0;
const user_info_1 = require("./../services/user-info");
const user_1 = require("./../codes/user");
/**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
async function signIn(ctx) {
    const formData = ctx.request.body;
    const result = {
        success: false,
        message: '',
        data: {},
        code: ''
    };
    const userResult = await user_info_1.default.signIn(formData);
    if (userResult) {
        if (formData.userName === userResult.name) {
            result.success = true;
        }
        else {
            result.message = user_1.default.FAIL_USER_NAME_OR_PASSWORD_ERROR;
            result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR';
        }
    }
    else {
        result.code = 'FAIL_USER_NO_EXIST',
            result.message = user_1.default.FAIL_USER_NO_EXIST;
    }
    if (formData.source === 'form' && result.success === true) {
        const session = ctx.session;
        session.isLogin = true;
        session.userName = userResult.name;
        session.userId = userResult.id;
        ctx.redirect('/work');
    }
    else {
        ctx.body = result;
    }
}
exports.signIn = signIn;
/**
 * 注册操作
 * @param   {obejct} ctx 上下文对象
 */
async function signUp(ctx) {
    const formData = ctx.request.body;
    let result = {
        success: false,
        message: '',
        data: {}
    };
    const validateResult = user_info_1.default.validatorSignUp(formData);
    if (validateResult.success === false) {
        result = validateResult;
        ctx.body = result;
        return;
    }
    const existOne = await user_info_1.default.getExistOne(formData);
    console.log(existOne);
    if (existOne) {
        if (existOne.name === formData.userName) {
            result.message = user_1.default.FAIL_USER_NAME_IS_EXIST;
            ctx.body = result;
            return;
        }
        if (existOne.email === formData.email) {
            result.message = user_1.default.FAIL_EMAIL_IS_EXIST;
            ctx.body = result;
            return;
        }
    }
    const userResult = await user_info_1.default.create({
        email: formData.email,
        password: formData.password,
        name: formData.userName,
        create_time: new Date().getTime(),
        level: 1,
    });
    console.log(userResult);
    if (userResult && userResult.insertId * 1 > 0) {
        result.success = true;
    }
    else {
        result.message = user_1.default.ERROR_SYS;
    }
    ctx.body = result;
}
exports.signUp = signUp;
/**
 * 获取用户信息
 * @param    {obejct} ctx 上下文对象
 */
async function getLoginUserInfo(ctx) {
    const session = ctx.session;
    const isLogin = session.isLogin;
    const userName = session.userName;
    console.log('session=', session);
    const result = {
        success: false,
        message: '',
        data: null,
    };
    if (isLogin === true && userName) {
        const userInfo = await user_info_1.default.getUserInfoByUserName(userName);
        if (userInfo) {
            result.data = userInfo;
            result.success = true;
        }
        else {
            result.message = user_1.default.FAIL_USER_NO_LOGIN;
        }
    }
    else {
        // TODO
    }
    ctx.body = result;
}
exports.getLoginUserInfo = getLoginUserInfo;
/**
 * 校验用户是否登录
 * @param  {obejct} ctx 上下文对象
 */
function validateLogin(ctx) {
    const result = {
        success: false,
        message: user_1.default.FAIL_USER_NO_LOGIN,
        data: null,
        code: 'FAIL_USER_NO_LOGIN',
    };
    const session = ctx.session;
    if (session && session.isLogin === true) {
        result.success = true;
        result.message = '';
        result.code = '';
    }
    return result;
}
exports.validateLogin = validateLogin;

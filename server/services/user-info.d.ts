/**
 * 用户业务操作
 */
declare const validator: any;
declare const userModel: any;
declare const userCode: any;
declare const user: {
    /**
     * 创建用户
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    create(user: any): Promise<any>;
    /**
     * 查找存在用户信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    getExistOne(formData: any): Promise<any>;
    /**
     * 登录业务操作
     * @param  {object} formData 登录表单信息
     * @return {object}          登录业务操作结果
     */
    signIn(formData: any): Promise<any>;
    /**
     * 根据用户名查找用户业务操作
     * @param  {string} userName 用户名
     * @return {object|null}     查找结果
     */
    getUserInfoByUserName(userName: any): Promise<{
        email: any;
        userName: any;
        detailInfo: any;
        createTime: any;
    }>;
    /**
     * 检验用户注册数据
     * @param  {object} userInfo 用户注册数据
     * @return {object}          校验结果
     */
    validatorSignUp(userInfo: any): {
        success: boolean;
        message: string;
    };
};

/**
 * 用户业务操作
 */
interface loginInfo {
    email?: string;
    name?: string;
    password?: string;
}
interface formData {
    email: string;
    userName: string;
    password: string;
}
declare const user: {
    /**
     * 创建用户
     * @param  {object} user 用户信息
     * @return {object}      创建结果
     */
    create(user: []): Promise<unknown>;
    /**
     * 查找存在用户信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    getExistOne(formData: formData): Promise<loginInfo> | null;
    /**
     * 登录业务操作
     * @param  {object} formData 登录表单信息
     * @return {object}          登录业务操作结果
     */
    signIn(formData: formData): Promise<unknown>;
    /**
     * 根据用户名查找用户业务操作
     * @param  {string} userName 用户名
     * @return {object|null}     查找结果
     */
    getUserInfoByUserName(userName: string): Promise<{
        email: string | undefined;
        userName: string | undefined;
        detailInfo: string | undefined;
        createTime: string | undefined;
    }>;
    /**
     * 检验用户注册数据
     * @param  {object} userInfo 用户注册数据
     * @return {object}          校验结果
     */
    validatorSignUp(userInfo: {
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }): {
        success: boolean;
        message: string;
    };
};
export default user;

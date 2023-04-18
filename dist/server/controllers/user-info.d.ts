/**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
export declare function signIn(ctx: any): Promise<void>;
/**
 * 注册操作
 * @param   {obejct} ctx 上下文对象
 */
export declare function signUp(ctx: any): Promise<void>;
/**
 * 获取用户信息
 * @param    {obejct} ctx 上下文对象
 */
export declare function getLoginUserInfo(ctx: any): Promise<void>;
/**
 * 校验用户是否登录
 * @param  {obejct} ctx 上下文对象
 */
export declare function validateLogin(ctx: any): {
    success: boolean;
    message: string;
    data: null;
    code: string;
};

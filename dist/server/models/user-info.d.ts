declare const user: {
    /**
     * 数据库创建用户
     * @param  {object} model 用户数据模型
     * @return {object}       mysql执行结果
     */
    create(model: []): Promise<unknown>;
    /**
     * 查找一个存在用户的数据
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    getExistOne(options: User): Promise<unknown>;
    /**
     * 根据用户名和密码查找用户
     * @param  {object} options 用户名密码对象
     * @return {object|null}         查找结果
     */
    getOneByUserNameAndPassword(options: User): Promise<unknown>;
    /**
     * 根据用户名查找用户信息
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    getUserInfoByUserName(userName: string): Promise<unknown>;
};
export default user;

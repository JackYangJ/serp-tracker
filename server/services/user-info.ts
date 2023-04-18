/**
 * 用户业务操作
 */

import validator from 'validator'
import userModel from './../models/user-info'
import userCode from './../codes/user'

interface loginInfo {
  email?: string,
  name?: string,
  password?: string
}

interface formData {
  email: string,
  userName: string,
  password: string
}

interface userInfor {
  email?: string,
  name?: string,
  password?: string,
  detail_info?: string,
  create_time?: string
}

const user = {

  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create( user: [] ) {
    const result = await userModel.create(user)
    return result
  },

  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne( formData: formData ): Promise<loginInfo> | null{
    const resultData: (Promise<loginInfo> | null) = await userModel.getExistOne({
      'email': formData.email,
      'name': formData.userName,
      'password': ''
    })
    return resultData
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn( formData: formData ) {
    const resultData = await userModel.getOneByUserNameAndPassword({
      'password': formData.password,
      'name': formData.userName, 
      'email': ''
    })
    return resultData
  },


  /**
   * 根据用户名查找用户业务操作
   * @param  {string} userName 用户名
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName: string ) {
    
    const resultData: userInfor = await userModel.getUserInfoByUserName( userName ) || {}
    const userInfo = {
      // id: resultData.id,
      email: resultData.email,
      userName: resultData.name,
      detailInfo: resultData.detail_info,
      createTime: resultData.create_time
    }
    return userInfo
  },


  /**
   * 检验用户注册数据
   * @param  {object} userInfo 用户注册数据
   * @return {object}          校验结果
   */
  validatorSignUp( userInfo: {userName: string, email: string, password: string, confirmPassword: string} ) {
    const result = {
      success: false,
      message: '',
    }

    if ( /[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false ) {
      result.message = userCode.ERROR_USER_NAME
      return result
    }
    if ( !validator.isEmail( userInfo.email ) ) {
      result.message = userCode.ERROR_EMAIL
      return result
    }
    if ( !/[\w+]{6,16}/.test( userInfo.password )  ) {
      result.message = userCode.ERROR_PASSWORD
      return result
    }
    if ( userInfo.password !== userInfo.confirmPassword ) {
      result.message = userCode.ERROR_PASSWORD_CONFORM
      return result
    }

    result.success = true

    return result
  }

}

export default user

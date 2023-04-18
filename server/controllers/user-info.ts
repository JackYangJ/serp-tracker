import userInfoService from './../services/user-info'
import userCode from './../codes/user'

interface result {
  success: boolean,
  message: string
  data?: object
}

/**
   * 登录操作
   * @param  {obejct} ctx 上下文对象
   */
export async function signIn( ctx: any ) {
  const formData = ctx.request.body
  const result = {
    success: false,
    message: '',
    data: {},
    code: ''
  }

  const userResult = await userInfoService.signIn( formData )

  if ( userResult ) {
    if ( formData.userName === userResult.name ) {
      result.success = true
    } else {
      result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
      result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
    }
  } else {
    result.code = 'FAIL_USER_NO_EXIST',
    result.message = userCode.FAIL_USER_NO_EXIST
  }

  if ( formData.source === 'form' && result.success === true ) {
    const session = ctx.session
    session.isLogin = true
    session.userName = userResult.name
    session.userId = userResult.id

    ctx.redirect('/work')
  } else {
    ctx.body = result
  }
}

/**
 * 注册操作
 * @param   {obejct} ctx 上下文对象
 */
export async function signUp( ctx: any ) {
  const formData = ctx.request.body
  let result: result = {
    success: false,
    message: '',
    data: {}
  }

  const validateResult: validateResult = userInfoService.validatorSignUp( formData )

  if ( validateResult.success === false ) {
    result = validateResult
    ctx.body = result
    return
  }

  const existOne  = await userInfoService.getExistOne(formData)
  console.log( existOne )

  if ( existOne  ) {
    if ( existOne .name === formData.userName ) {
      result.message = userCode.FAIL_USER_NAME_IS_EXIST
      ctx.body = result
      return
    }
    if ( existOne .email === formData.email ) {
      result.message = userCode.FAIL_EMAIL_IS_EXIST
      ctx.body = result
      return
    }
  }


  const userResult = await userInfoService.create({
    email: formData.email,
    password: formData.password,
    name: formData.userName,
    create_time: new Date().getTime(),
    level: 1,
  })

  console.log( userResult )

  if ( userResult && userResult.insertId * 1 > 0) {
    result.success = true
  } else {
    result.message = userCode.ERROR_SYS
  }

  ctx.body = result
}

/**
 * 获取用户信息
 * @param    {obejct} ctx 上下文对象
 */
export async function getLoginUserInfo( ctx: any ) {
  const session = ctx.session
  const isLogin = session.isLogin
  const userName = session.userName

  console.log( 'session=', session )

  const result = {
    success: false,
    message: '',
    data: null,
  }
  if ( isLogin === true && userName ) {
    const userInfo = await userInfoService.getUserInfoByUserName( userName )
    if ( userInfo ) {
      result.data = userInfo
      result.success = true
    } else {
      result.message = userCode.FAIL_USER_NO_LOGIN
    }
  } else {
    // TODO
  }

  ctx.body = result
}

/**
 * 校验用户是否登录
 * @param  {obejct} ctx 上下文对象
 */
export function validateLogin( ctx: any ) {
  const result = {
    success: false,
    message: userCode.FAIL_USER_NO_LOGIN,
    data: null,
    code: 'FAIL_USER_NO_LOGIN',
  } 
  const session = ctx.session
  if( session && session.isLogin === true  ) {
    result.success = true
    result.message = ''
    result.code = ''
  }
  return result
}
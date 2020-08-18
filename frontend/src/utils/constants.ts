export const TOAST_DURATION = 0.9;
export const sizeBase = 16;
export const COUNTDOWN = 60;

export const RES_MSG = new Map([
  [ 'UNKNOWN_ERROR', '服务器升级中，请稍候再试' ],
  [ 'BAD_REQUEST', '错误请求' ],
  [ 'NOT_FONUND', '请求不存在' ],
  [ 'METHOD_NOT_ALLOWED', '请求方法不允许' ],
  [ 'MISSING_SIGNATURE_PARAMETER', '缺少签名参数' ],
  [ 'ILLEGAL_TIMESTAMP', '时间戳非法' ],
  [ 'ILLEGAL_SIGNATURE', '签名非法' ],
  [ 'USER_DOES_NOT_EXIST', 'Account does not exist' ], // 用户不存在
  [ 'EMAIL_DOES_NOT_EXISTS', 'Email does not exist' ], // 邮箱不存在
  [ 'ACCOUNT_DOES_NOT_EXIST', 'Account does not exist' ], // 账号不存在
  [ 'UPDATE_PASSWORD_FAIL', '输入的原密码不正确' ],
  [ 'OLD_PASSWORD_AND_NEW_PASSWORD_CANNOT_BE_THE_SAME', 'The new password cannot be the same as the old one.' ], // 新密码不能和旧密码一致
  [ 'ILLEGAL_CODE', 'Code is incorrect' ], // code 不正确
  [ 'INCORRECT_PASSWORD', 'Password is incorrect' ], // 密码不正确'
  [ 'PHONE_ALREADY_EXISTS', '手机号已经被其他账号绑定' ],
  [ 'CAPTCHA_FAILED', '极验验证失败' ],
  [ 'CAPTCHA_CINFIG_FAILED', '极验获取信息失败' ],
  [ 'PARAMETER_CHECK_ERROR', '参数校验错误' ],
]);

//正则验证
export const REG = {
  SPECIAL_CHARACTER: /[`~!#$%^&*()_+=<>?:"{}|,;'\\[\]~！#￥￥%……&*（）={}|《》？：“”【】、；‘’。]/, // 限制各种特殊字符
  EMAIL: /^[\w-.]+@([\w-]+\.)+[a-zA-Z]+$/, // 通用邮箱验证
  ACTIVITY_KEY: /^A[a-zA-Z0-9]+$/, // 通用邮箱验证
  MSG_CODE: /^[0-9]{6}$/, // 6位数字 - 短信验证码
  PASSWORD: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9~!@#%^&*_+`\-=\]:";'<>?,./]{8,16}$/, // 英文和数字8-16位（英文数字都要有，忽略大小写),不可含有标点符号，至少一个大写字母
};

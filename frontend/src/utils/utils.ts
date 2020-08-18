import { REG } from './constants';

/**
 * @description 验证邮箱
 * @param {string} str 待验证的字符串
 * @return {boolean} true 为真，false 为假
 */
export const isEmail = (str = ''): boolean => REG.EMAIL.test(str);

/**
 * @description 验证 特殊字符串
 * @param {string} str 待验证的字符串
 * @returns {boolean} true 为真，false 为假
 */
export const isValidSpecial = (str = ''): boolean => REG.SPECIAL_CHARACTER.test(str);


export const getQuery = (url:string):{[key: string]: string}=> {
    const params:{[key: string]: string} = {};
    if (url.indexOf("?") !== -1) {
      url = url.substr(1);
       
    }
    const  strs = url.split("&");
    for(let i = 0; i < strs.length; i ++) {
     params[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    return params;
 };

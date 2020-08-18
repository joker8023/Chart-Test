import { message } from 'antd';
import { RES_MSG, TOAST_DURATION } from '../utils/constants';
import axios from 'axios';
import Moment from 'moment';


const Request = axios.create({
  timeout: 10 * 1000,
});

// 拦截请求
Request.interceptors.request.use(
  async config => {
    config.params &&
      Object.keys(config.params).forEach(key => {
        if (config.params[key] === '' || config.params[key] === undefined) {
          delete config.params[key];
          if (config.method === 'get' && config.params[key] === null) {
            delete config.params[key];
          }
        }
        if (
          config.params[key] !== '' &&
          config.params[key] !== undefined &&
          config.params[key] !== null
        ) {
          if (config.params[key].constructor === Moment().constructor) {
            config.params[key] = Moment(config.params[key]).format(
              'YYYY-MM-DD',
            );
          }
        }
      });
    return config;
  },
  err => Promise.reject(err),
);

Request.interceptors.response.use(
  respose => {
    const res = respose.data;
    if (!res) {
      message.error(RES_MSG.get('UNKNOWN_ERROR'), TOAST_DURATION);
    } else {
      if (res.sys_status === 'SUCCESS' || res.sys_status === 'WAITING') {
        return res;
      } else if (res.sys_status === 'SYSTEM_ERROR') {
        // history.push('/error/500');
      } else if (res.message) {
        const messages = RES_MSG.has(res.message)
          ? RES_MSG.get(res.message)
          : RES_MSG.get('UNKNOWN_ERROR');
        message.error(messages, TOAST_DURATION);
      }
    }
    return;
  },
  err => Promise.reject(err),
);

export default Request;

import { Base64 } from 'js-base64';
import { sha256 } from 'js-sha256';

/**
 *  secret值，生成签名用
 * @param uuid   uuid
 * @param timestamp  时间戳
 */
export const GenSecret = (uuid: string, timestamp: number): string => {
  // 首先拼接DEVICE-UUID，IMESTAMP，然后base64再做 sha256 加密，secret为 sha256 后的十六进制摘要
  const secretString = uuid + timestamp;
  const secretBase64 = Base64.encode(secretString);
  return sha256(secretBase64);
};

/**
 *  生成签名
 * @param uuid uuid
 */
export const Gensignature = (uuid: string, timestamp: number): string => {
  // 首先对 DEVICE-UUID、secret和TIMESTAMP以及请求参数 进行排序后拼接在一起 然后做 sha256 加密，SIGNATURE为 sha256 后的十六进制摘要
  const secret = GenSecret(uuid, timestamp);
  const joinString = [timestamp, uuid, secret].sort().join('');
  return sha256(joinString);
};

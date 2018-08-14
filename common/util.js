/**
 * @author  zxw@163.com
 * @date    2017/11/22
 * @description  提供一些基础工具函数
 */

const request = require('request');
const jwt = require('jwt-simple');
const logger = require('../common/logger');
const config = require('../config');


/**
 * 根据req.query返回一段拼接好的字符串
 *
 * @参数对象           object (req.query)
 * @callback         string (?isnew=1&accountid=2&orgid=&token=xxx)
 *
 */
exports.getQuery = function (query) {
	let keyArray = [];
	let valueArray = [];
	for (let key in query) {
		keyArray.push(key);
		valueArray.push(query[key]);
	}
	let str = "?";
	for (let i = 0; i < keyArray.length; i++) {
		if (i !== 0){
			str += "&";
		}
		str += keyArray[i] + "=" + valueArray[i]
	}
	return str;
};


/**
 * 验证token是否过期 已作废
 *
 * [callback]-remainingTime   -1 已过期，0 无法判断，>0时为token剩余时间
 * [callback]-decoded         token解析出的值
 *
 */
exports.verifyToken = function (token, callback) {
	let decoded, remainingTime = 0;
	if (token) {
		try {
			// token加密密钥
			// tokenKey: "7259d3dd091c07ede6f2b88f9604cf8fb25a545a"
			decoded = jwt.decode(token, config.tokenKey, 'HS256');
			// logger.info(decoded);
			// logger.info(decoded.exp + " - " + Math.floor(Date.now()/1000));
			if (decoded.exp) {
				let beforeSec = 0; // 提前180秒
				if(!config.debug){
					beforeSec = 180;
				}
				remainingTime = Number(decoded.exp)-beforeSec-Math.floor(Date.now()/1000);
				// if(Number(remainingTime)>0){
				// } else {
				//  remainingTime = -1;
				// }
			}
		} catch (error){
			remainingTime = -9999;
		}
	}
	callback(remainingTime, decoded);
};

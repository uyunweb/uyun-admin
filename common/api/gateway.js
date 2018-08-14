/***
 * Api 入口
 *
 * */

const logger = require('../logger');
const apiConfig = require('../../config/api');

let apiObj = {};
for(let i=0; i<apiConfig.site_gateway.length; i++){
	let item = apiConfig.site_gateway[i];
	try {
		// apiObj = Object.assign(apiObj, require('../'+apiConfig.savePath+item));
		apiObj[item] = require('./'+apiConfig.apiVersion+"/"+item);
	} catch (error) {
		logger.warn("--> 这个Api文档有错，请检查", apiConfig.apiVersion, item);
		logger.error(error);
	}
}
logger.info("NODE START-UP :::::: CALL Gateways", apiConfig.site_gateway);

module.exports = apiObj;
/***
 * 封装 request
 *
 */

const request = require('request');
const config = require('../config');
const logger = require('../common/logger');
const utils = require('./proxy.utils');

/**
 * 代理请求
 *
 * @obj - 请求对象
 *      obj.type
 *      obj.url
 *      obj.query
 *      obj.form
 *      obj.body
 * @callback(error, data) - 回调请求返回的json对象
 *      error - String，正确请求时返回null
 *      data - Object，无论请求是否成功都会返回，(包含一个status属性)
 *
 */
exports.request = function (obj, callback) {
	
	// 组装参数
	let requestParameter = utils.makeProxyRequestParameter(obj);
	
	// 定义出错信息
	let errorMessage = "";
	
	// 强制检查 Request Parameters
	if (!requestParameter || typeof requestParameter !== "object") {
		errorMessage = "Proxy request parameter error !";
		return callback(errorMessage, {
			status: 1,
			message: errorMessage,
			errorData: requestParameter
		});
	}
	
	// 强制检查 Request Type
	if (!requestParameter.type) {
		errorMessage = "Proxy request type is not find !";
		return callback(errorMessage, {
			status: 2,
			message: errorMessage,
			errorData: requestParameter.type
		});
	} else if(requestParameter.type !== "get" && requestParameter.type !== "post" && requestParameter.type !== "delete" && requestParameter.type !== "put" && requestParameter.type !== "patch") {
		errorMessage = "Proxy request nonsupport type !";
		return callback(errorMessage, {
			status: 3,
			message: errorMessage,
			errorData: requestParameter.type
		});
	}
	
	// 强制检查 Url
	if (!requestParameter.url || typeof requestParameter.url !== "string") {
		errorMessage = "Proxy request url is not find !";
		return callback(errorMessage, {
			status: 4,
			message: errorMessage,
			errorData: requestParameter.url
		});
	}
	
	// 如果是Get请求，强制删除Body参数
	if(requestParameter.type==="get" && requestParameter.body){
		delete requestParameter.body;
	}
	
	if(requestParameter.isMock){
		logger.info("===>> Request start by", "[MOCK]", requestParameter.url, requestParameter.form.url, requestParameter.form.v_id, requestParameter.form.swagger_id);
	} else {
		logger.info("===>> Request start", "["+requestParameter.type.toUpperCase()+"]", requestParameter.url);
	}
	let t = new Date();

	// todo delete
	if(obj.sessionid){
		let j = request.jar();
		let cookie = request.cookie('sessionid="'+obj.sessionid+'"');
		j.setCookie(cookie, requestParameter.url);
		requestParameter.jar = j;
	}


	request[requestParameter.type](requestParameter, function (error, response, body) {
		let requestTime = new Date() - t;
		let backObject = utils.makeProxyRequestReturnObject(error, response, body, requestParameter);
		backObject.requestLog = {
			requestId: backObject.requestId,
			requestUrl: requestParameter.url,
			requestTime: requestTime
		};
		if(backObject.status === 0){
			callback(null, backObject);
		} else {
			callback(backObject.message ? backObject.message : backObject.status, backObject);
		}
		if(error){
			// 异常返回
			logger.error("===>> request back error", requestParameter.type, requestParameter.url, requestTime+"ms");
			logger.error(error);
		} else {
			// 正常返回，不管请求的结果是否符合预期，都输出日志
			utils.consoleProxyRequestLoggers(error, response, body, backObject, requestParameter, requestTime, backObject.requestId);
		}
	});
};

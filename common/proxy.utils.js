/***
 * 封装 request
 *
 */

const request = require('request');
const config = require('../config');
const logger = require('../common/logger');
if(config.nodeRavenUrl) var Raven = require('raven').config(config.nodeRavenUrl).install();

/***
 * 根据request规范返回proxy请求所需要的参数
 *
 * [callback] - 返回一个Object
 *
 * */
exports.makeProxyRequestParameter = function (obj) {
	
	// 判断参数的有效性
	if (typeof obj !== "object" || !obj.url) {
		return false;
	}

	// 判断是否Mock数据
	let isMock;
	if(obj.token){
		isMock = (config.mock.open && !obj.token.gateway) || obj.token.mock;
	} else {
		isMock = config.mock.open;
	}
	if( isMock ){
		return {
			isMock: true,
			type: "post",
			url: config.mock.url,
			form: {
				url: obj.url,
				v_id: config.mock.v_id,
				swagger_id: obj.swaggerId,
				data: obj.data
			},
			headers: config.mock.headers
		};
	}
	
	// Type
	if (!obj.type) obj.type = "get";
	
	// Url
	let host;
	let url = encodeURI(obj.url);
	if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
		host = "";
	} else if (obj.token.host) {
		host = obj.token.host;
	} else {
		host = config.servers.host;
	}
	// 删除Host配置中可能存在的多余的/
	if (host && host.substr(host.length - 1, 1) === "/" && url.substr(0, 1) === "/") {
		url = url.substr(1);
	}
	url = host+url;
	
	// Headers
	let headers = obj.headers;
	if (typeof obj.token === "object" && typeof obj.token.headers === "object") {
		headers = obj.token.headers;
		if (!headers["Content-Type"]) {
			headers["Content-Type"] = "application/json";
		}
	} else if (!headers || typeof headers !== "object") {
		if (config.servers.headers) {
			headers = config.servers.headers;
		} else {
			headers = {};
		}
	}
	if (typeof obj.token === "string") {
		// 传了自定义的token
		headers['Token'] = obj.token;
	} else if (typeof obj.token === "object" && obj.token.token) {
		// 以对象的方式传了自定义的token
		headers['Token'] = obj.token.token;
	}
	if (typeof obj.token === "object" && obj.token.roleCode) {
		// 传了roleCode-only sxw.js
		headers['Role-Code'] = obj.token.roleCode;
	}
	// 删除Token为NULL
	if (headers['Token'] === "NULL") {
		delete headers['Token'];
	}
	
	// Json
	let isJson;
	if (typeof obj.token === "object" && typeof obj.token.json !== "undefined") {
		isJson = !!obj.token.json;
	} else if (typeof obj.json === "undefined") {
		// 未设置
		if (typeof config.servers.json !== "undefined") {
			isJson = config.servers.json;
		} else {
			isJson = null;
		}
	} else {
		// 强制转为布尔值
		isJson = !!obj.json;
	}
	
	// Timeout
	let timeout = obj.timeout;
	if (typeof obj.token === "object" && typeof obj.token.timeout !== "undefined") {
		timeout = Number(obj.token.timeout);
	} else if (typeof obj.timeout === "undefined") {
		// 未设置
		if (typeof config.servers.timeout !== "undefined") {
			timeout = config.servers.timeout;
		} else {
			timeout = null;
		}
	} else {
		// 强制转为数字
		timeout = Number(timeout);
	}
	
	// Query
	if(typeof(obj.query)==="object"){
		for(let prop in obj.query){
			// 强制删除为空字符串的参数
			if(obj.query[prop]==="") delete obj.query[prop];
		}
	}
	
	// Body
	if(typeof(obj.body)==="object"){
		for(let prop in obj.body){
			// 强制删除为空字符串的参数
			if(obj.body[prop]==="") delete obj.body[prop];
		}
	}
	
	// Form
	if(typeof(obj.form)==="object"){
		for(let prop in obj.form){
			// 强制删除为空字符串的参数
			if(obj.form[prop]==="") delete obj.form[prop];
		}
	}
	
	// 返回一个对象
	return {
		type: obj.type,
		url: url,
		qs: obj.query,
		body: obj.body,
		form: obj.form,
		headers: headers,
		json: isJson,
		timeout: timeout,
		swaggerId: obj.swaggerId
	};
};


/***
 * 代理request请求返回的结果
 *
 * [callback] - 返回一个Object，供前端使用，根据status标记状态
 *
 * */
exports.makeProxyRequestReturnObject = function (error, response, body, requestParameter) {
	// 所有返回都用一个request-id来标识
	let requestId = (response && response.headers["request-id"]) ? response.headers["request-id"] : (Number(new Date())+""+(100000+Math.floor(Math.random() * 100000)));

	if (error) {
		// 错误
		return {
			status: -1,
			message: "Proxy request back fail :: Error !",
			requestId: requestId,
			error: error,
			requestParameter: requestParameter,
			data: body
		};
	} else if (requestParameter.json && typeof body !== "object") {
		// 返回不是对象
		if (typeof body === "undefined") {
			return {
				status: -2,
				message: "Proxy request back error :: Undefined !",
				requestId: requestId,
				requestParameter: requestParameter,
				data: body
			};
		} else if (body === "") {
			return {
				status: -3,
				message: "Proxy request back error :: Empty string !",
				requestId: requestId,
				requestParameter: requestParameter,
				data: body
			};
		} else {
			return {
				status: -4,
				message: "Proxy request back error :: Not a json !",
				requestId: requestId,
				requestParameter: requestParameter,
				data: body
			};
		}
	} else {
		
		// mock时强制转一次json格式
		let isMock = requestParameter.isMock;
		if(isMock && typeof body !== "object"){
			try {
				body = JSON.parse(body);
				if(body.data && typeof body.data !== "object"){
					body.data = JSON.parse(body.data);
				}
			} catch (error){
				logger.debug("将mock数据返回的结果转为json时出错！");
			}
		}
		
		// 正常返回
		return {
			status: 0,
			message: typeof body === "object" ? "Proxy request back success !" : "proxy request success success , but is not a json type !",
			requestId: requestId,
			data: body
		};
	}
};


/***
 * 打印请求的日志
 *
 * */
exports.consoleProxyRequestLoggers = function (error, response, body, backObject, requestParameter, requestTime, requestId) {

	// ~~ 打印日志
	// 判断非正常返回
	// todo:后面需要加一些规则
	if(backObject.status!==0 || (typeof backObject.data === "object" && backObject.data.code===500)){
		// throw new Error("Request back may be error");
		logger.warn("Request back may be error", "\n",
			"[request-id]", requestId, "\n",
			"[request-type]", requestParameter.type.toUpperCase(), "\n",
			"[request-time]", requestTime+"ms", "\n",
			"[request-parameter]", JSON.stringify(requestParameter, null, "\t"), "\n",
			"[request-back]", JSON.stringify((typeof backObject.data === "object" && backObject.data.code===500) ? body : backObject, null, "\t"));
		if(Raven){
			Raven.captureMessage("Request back may be error", {
				level: 'warning',
				extra: {
					requestParameter,
					requestBack: backObject
				}
			});
		}
	} else {
		logger.info("<<=== Request back", "\n",
			"[request-id]", requestId, "\n",
			"[request-type]", requestParameter.type.toUpperCase(), "\n",
			"[request-time]", requestTime+"ms", "\n",
			// "[request-url]", requestParameter.url, "\n",
			config.loggerLevel === "DEBUG" ? (
				"[request-parameter] "+JSON.stringify(requestParameter, null, "\t")+"\n"+
				" [request-back] "+JSON.stringify(body, null, "\t")
			) : (
				"[request-parameter] "+JSON.stringify(requestParameter)+"\n"+
				" [request-back-body.code|message] "+body.code+" | "+body.message
			));
	}

	// ~~ 保存接口调用记录
	if (config.mock.apiSave) {
		// apiSaves 开始post请求
		let t = new Date();
		let isMock = requestParameter.isMock;
		request.post({
			url: config.mock.saveApiHost,
			form: {
				s_id: requestId,
				user: requestParameter.headers && requestParameter.headers.Token ? requestParameter.headers.Token : 1,
				site: config.name,
				requests: requestParameter.type.toUpperCase(),
				server_type: isMock ? "mock" : "gateway",
				url: requestParameter.url,
				swagger_id: requestParameter.swaggerId,
				parameters: JSON.stringify(requestParameter),
				back_data: JSON.stringify(body),
				send_time: requestTime,
				project_id: config.mock.p_id,
				version_id: config.mock.v_id
			},
			headers: config.mock.headers
		}, function (error, response, body) {
			let rTime = new Date() - t;
			if (error) {
				logger.debug("apiSave error", error);
			} else {
				logger.debug("apiSave success", rTime, "ms");
			}
		});
	}
};




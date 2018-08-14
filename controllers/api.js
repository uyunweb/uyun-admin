/**
 * @@@ 公共模块
 * @author  zxw@163.com
 * @date    2017/11/22
 * @description  以接口服务的方式提供服务
 */

"use strict";

const request = require('request');
const crypto = require('crypto');
const moment = require('moment');
const fs = require('fs');
const eventproxy = require('eventproxy');
const YAML = require('yamljs');
const multiparty = require('multiparty');
const ALY = require('aliyun-sdk');

const logger = require('../common/logger');
const config = require('../config');
const gatewayApis = require('../common/api/gateway');
const nodeApis = require('../common/api/node');
const proxy = require('../common/proxy');
const authModel = require('../common/auth');
const apiConfig = require('../config/api');

// 健康检查
exports.helloWord = function (req, res, next) {
	res.send({
		code: 200,
		message: "Say Hello！"
	});
};

/**
 * Node代理请求
 * proxyRequest
 *
 * */
exports.proxyRequest = function (req, res, next) {
	logger.debug("--> Node proxy_request start");
	proxy.request(req.body, (error, data)=> {
		// Debug模式下在Response Headers中加入RequestLogs
		if(data.requestLog && data.requestLog.requestId){
			// 返回request-id 和 request-time
			res.header('request-id', data.requestLog.requestId);
			if(data.requestLog.requestTime) res.header('request-time', data.requestLog.requestTime);
			if(config.env !== "production"){
				// 非生产环境，返回request-url 和 request-history
				if(data.requestLog.requestUrl) res.header('request-url', data.requestLog.requestUrl);
				if(data.requestLog.requestId) res.header('request-history', config.mock.host+"/looks/api/detail?s_id="+data.requestLog.requestId);
			}
		}
		if(error){
			logger.warn("--> Node proxy_request back error");
			logger.info(error);
			// 错误也返回
			return res.send({
				code: -1,
				message: "请求异常",
				error: error,
				errorData: data
			});
		} else {
			res.send(data.data ? data.data : data);
		}
	});
};

/**
 * Node端代理Gateway接口
 *
 * */
exports.node = function (req, res, next) {
	logger.debug(req.params[0]);
	logger.debug(req.query);
	
	// 检查方法是否存在
	if(!nodeApis[req.params[0]]){
		return res.send({
			code: 1,
			message: "找不到这个Api ::"+req.params[0]
		});
	}
	
	// 获取TOKEN
	let obj = req.query;
	let auth_token = obj.TOKEN;
	if(!auth_token){
		// **没有传token时，从cookie中获取token
		auth_token = req.cookies[config.cookie.authKey];
	}
	// TODO 不验证token
	if(!auth_token){
		// **取不到token时，传NULL
		auth_token = "NULL";
	}
	obj.TOKEN = auth_token;
	if(!obj.TOKEN){
		return res.send(config.failCode.tokenNull);
	}
	
	nodeApis[req.params[0]](req.query, function (error, data) {
		if(error){
			logger.debug("--> nodeServices back", error, data);
			// 请求异常
			return res.send({
				code: -1,
				message: "请求异常",
				error: error,
				data: data
			});
		} else {
			logger.debug("--> nodeServices back success");
			// 正常返回
			return res.send(data.data ? data.data : data);
		}
	});
};

/**
 * Node端代理Gateway接口
 *
 * */
exports.gateway = function (req, res, next) {
	
	// 从路径参数取gateway信息
	let gatewayName = req.params.name;
	let gatewaySwaggerId = req.params.id;
	
	// 从cookie取user信息
	let userTokenByCookie = req.cookies[config.cookie.authKey];
	let userIdByCookie = req.cookies[config.cookie.authKey+"_"+config.name+"_user_id"];
	let userRoleCodeByCookie = req.cookies[config.cookie.authKey+"_"+config.name+"_role_code"];
	
	// 从body取user的认证信息
	let userIdByBody = req.body.auth_user_id;
	let userRoleCodeByBody = req.body.auth_role_code;
	
	// 输出日志
	logger.info("Controllers api.gateway beginning", "["+gatewayName+"]", "["+gatewaySwaggerId+"]");
	logger.debug(JSON.stringify({ gatewayName, gatewaySwaggerId, userTokenByCookie, userIdByCookie, userRoleCodeByCookie, userIdByBody, userRoleCodeByBody}, null, "\t"));
	
	// req.body.auth_role_code
	// 对比cookies中的role_code和当前用户的role_code是否相同，同时存在且不相同时则认为账号信息异常
	// todo
	if(userRoleCodeByCookie && userRoleCodeByBody && (userRoleCodeByCookie !== userRoleCodeByBody)){
		return res.send({
			code: 3104,
			message: "账号信息异常，请重新登录"
		});
	}
	
	// 检查方法是否存在
	if(!gatewayName || !gatewaySwaggerId || !gatewayApis[gatewayName]|| !gatewayApis[gatewayName][gatewaySwaggerId]){
		return res.send({
			code: 1,
			message: "找不到这个Api ::"+gatewaySwaggerId
		});
	}

	// 获取TOKEN
	let obj = req.body;
	// ** 优先从obj取参
	let auth_token = obj.TOKEN;
	// ** 没有传参时，从Cookie中获取
	if(!auth_token){
		auth_token = userTokenByCookie;
	}
	// ** 都取不到时，传NULL
	if(!auth_token){
		auth_token = "NULL";
	}
	// todo 支持对象
	obj.TOKEN = {};
	obj.TOKEN.token = auth_token;
	// ** todo 取不到，并且需要强验证时报500
	if(!obj.TOKEN.token){
		return res.send(config.failCode.tokenNull);
	}
	// 添加前端参数 headers
	if(typeof obj.HEADERS === "object"){
		obj.TOKEN.headers = obj.HEADERS;
	}
	// 添加前端参数 host
	if(obj.HOST){
		obj.TOKEN.host = obj.HOST;
	}
	// 添加前端参数 json
	if(typeof obj.JSON !== "undefined"){
		obj.TOKEN.json = obj.JSON;
	}
	// 添加前端参数 timeout
	if(typeof obj.TIMEOUT !== "undefined"){
		obj.TOKEN.timeout = obj.TIMEOUT;
	}
	// 添加前端参数 mock
	if(typeof obj.MOCK !== "undefined"){
		obj.TOKEN.mock = obj.MOCK;
	}
	// 添加前端参数 gateway
	if(typeof obj.GATEWAY !== "undefined"){
		obj.TOKEN.gateway = obj.GATEWAY;
	}
	// 添加前端参数 roleCode
	if(userRoleCodeByBody){
		obj.TOKEN.roleCode = userRoleCodeByBody;
	}

	// debug-test
	if(req.cookies[config.cookie.authKey+"_api_save"]==="true"){
		obj.apiSave = true;
	}

	// 正式请求
	gatewayApis[gatewayName][gatewaySwaggerId](obj, function (error, data) {
		// THE SAME
		// Debug模式下在Response Headers中加入RequestLogs
		if(data.requestLog && data.requestLog.requestId){
			// 返回request-id 和 request-time
			res.header('request-id', data.requestLog.requestId);
			if(data.requestLog.requestTime) res.header('request-time', data.requestLog.requestTime);
			if(config.env !== "production"){
				// 非生产环境，返回request-url 和 request-history
				if(data.requestLog.requestUrl) res.header('request-url', data.requestLog.requestUrl);
				if(data.requestLog.requestId) res.header('request-history', config.mock.host+"/looks/api/detail?s_id="+data.requestLog.requestId);
			}
		}
		if(error){
			// 请求异常
			return res.send({
				code: -1,
				message: "请求异常",
				error: error,
				errorData: data
			});
		} else {
			data = data.data || data;

			// Need Refresh Token
			if (config.servers.isAutoRefreshToken && data.code && data.code===8502) {
				// Token过期 刷新Token
				logger.info("*** 请求", "["+gatewayName+"]", "["+gatewaySwaggerId+"]", "时Token过期，开始刷新Token", data.code, data.message);
				authModel.refreshToken(req, res, next, function(err, tokenData){
					let newToken =tokenData.token;
					if(err || !tokenData){
						logger.warn("*** Token刷新失败", newToken);
						logger.error(err);
						data = data.data || data;
						
						// 生学堂H5添加一个Code供前端调用
						if(config.isSxt) data.refreshTokenCode = 8502201;
						
						// 不做异常处理，还是正常返回
						data.requestErrorData = {
							code: -2,
							message: "Token过期，并且刷新失败",
							error: err,
							errorData: newToken
						};
						return res.send(data);
					} else {
						// Token刷新成功
						logger.info("*** Token刷新成功::", newToken);
						// 使用newToken请求数据
						obj.TOKEN = newToken;
						
						// 递归重新请求本次访问
						gatewayApis[gatewayName][gatewaySwaggerId](obj, function (error, data) {
							// THE SAME
							// Debug模式下在Response Headers中加入RequestLogs
							if(data.requestLog && data.requestLog.requestId){
								// 返回request-id 和 request-time
								res.header('request-id', data.requestLog.requestId);
								if(data.requestLog.requestTime) res.header('request-time', data.requestLog.requestTime);
								if(config.env !== "production"){
									// 非生产环境，返回request-url 和 request-history
									if(data.requestLog.requestUrl) res.header('request-url', data.requestLog.requestUrl);
									if(data.requestLog.requestId) res.header('request-history', config.mock.host+"/looks/api/detail?s_id="+data.requestLog.requestId);
								}
							}
							if (error) {
								// 请求异常
								return res.send({
									code: -1,
									message: "请求异常",
									error: error,
									errorData: data
								});
							} else {
								data = data.data || data;
								
								// 生学堂H5添加一个Code供前端调用
								if(config.isSxt) data.refreshTokenCode = 8502200;
								
								// 正常返回
								return res.send(data);
							}
						});
					}
				});
			} else {
				// 正常返回
				return res.send(data);
			}
		}
	});
};

// 更新gatewayApi 新增
exports.updateApis = function (req, res, next) {
	
	var ep = new eventproxy();
	ep.fail(next);
	
	if(req.query.gateway_name){
		// 只导一个微服务Api
		let url = apiConfig.host+"/build/"+apiConfig.v_id+"_"+req.query.gateway_name+".js";
		let savePath = apiConfig.savePath+apiConfig.apiVersion+"/"+req.query.gateway_name+".js";
		exports.makeApiFunctions(url, savePath, function(error, data){
			if(error){
				res.send({
					status: -1,
					message: "微服务Api导入失败",
					data: error
				});
			} else {
				res.send({
					status: 0,
					message: "微服务Api已导入",
					data: data
				});
			}
		});
	} else {
		// 导入所有
		ep.after('get_file', apiConfig.gateways.length, function (list) {
			res.send({
				status: 0,
				message: "微服务Api已全部导入",
				data: list
			});
		});
		for(let i=0; i<apiConfig.gateways.length; i++){
			// 每次写入一个微服务Api
			let url = apiConfig.host+"/build/"+apiConfig.v_id+"_"+apiConfig.gateways[i]+".js";
			let savePath = apiConfig.savePath+apiConfig.gateways[i]+".js";
			exports.makeApiFunctions(url, savePath, function(error, data){
				ep.emit('get_file', data);
			});
		}
	}
};

// 内部模块 -- 异步队列读微服务Api文件
exports.makeApiFunctions = function (url, savePath, callback) {
	logger.debug("--> makeApiFunctions 微服务Api的Url::", url);
	logger.debug("--> makeApiFunctions 本地保存路径::", savePath);
	request.get({
		url: url
	}, function (error, response, body) {
		if(error || !body){
			callback("文件读取失败", error);
		} else if(!body) {
			callback("文件读取错误", body);
		} else {
			fs.writeFile(savePath, body, function(err){
				if(err){
					callback("文件写入失败", err);
				} else {
					callback(null, url);
				}
			});
		}
	});
};

// 内部模块 -- 写入本地apifile
exports.writeServersApi = function (req, res, next) {

	var url = config.mock.serversApiFileUrl;
	logger.debug(url);
	if(!url){
		res.send({
			status: 4,
			message: "文件读取地址配置错误，请重新配置",
			url: url
		});
		return false;
	}
	request.get({
		url: url
	}, function (error, response, body) {
		// logger.debug(body);
		if(error){
			res.send({
				status: -1,
				message: "文件读取失败",
				url: url,
				data: error
			})
		} else if(body==="") {
			res.send({
				status: 2,
				message: "文件读取为空",
				url: url,
				data: ""
			})
		} else if(!body) {
			res.send({
				status: 1,
				message: "文件读取失败",
				url: url,
				data: "undefined"
			})
		} else {
			let saveFileUrl;
			if(req.query.vue==1){
				saveFileUrl = 'src/service/ApiList.js';
			} else {
				saveFileUrl = 'models/serversApi.js';
			}
			fs.writeFile(saveFileUrl, body, function(err){
				if(err){
					res.send({
						status: 3,
						message: "文件写入失败",
						url: url,
						data: err
					})
				} else {
					res.send({
						status: 0,
						url: url,
						message: saveFileUrl+" 更新成功"
					})
				}
			});
		}
	});

	// apiList
	var url2 = config.mock.serversApiFileListUrl;
	request.get({
		url: url2
	}, function (error, response, body) {
		let saveFileUrl = 'models/serversApiList.js';
		if(req.query.vue==1){
			fs.writeFile(saveFileUrl, body, function(err){
			});
		}
	});

};

// logs
exports.logs = function (req, res, next) {
	let token;
	token = req.cookies[config.cookie.authKey];
	if(token) {
		res.redirect(config.mock.host+"/looks/api?p_id="+config.mock.p_id+"&token="+token);
	} else {
		res.redirect(config.mock.host+"/looks/api?p_id="+config.mock.p_id);
	}
};

// get_oss_policy
exports.getPolicy = function (req, res, next) {
	let userTokenByCookie = req.cookies[config.cookie.authKey];
	if(!userTokenByCookie){
		return res.send({
			code: -1,
			message: "Not found token"
		});
	}

	// 提供阿里云账号短期访问权限管理
	gatewayApis["passport"]["AliyunOssAuthApi_getSts"]({
		TOKEN: userTokenByCookie
	}, function (error, data) {
		data = data.data;
		if(error || !data || data.code!==200 || !data.data){
			res.send({
				code: 2,
				message: "获取阿里云访问权限错误",
				error: error,
				data: data
			});
		} else {
			data = data.data;

			// test data
			// data.accessKeyId = 'hh8VeIaK3yI5xHfA';
			// data.accessKeySecret = 'VM9l16oZ8eiURXc1GPBXBnmRH6jlTC';
			// const host = 'http://jiuhu-sxjy-firstbucket.oss-cn-hangzhou.aliyuncs.com';

			let ossType = req.query.type || config.oss.type || "res";

			// 自己生成
			// const dirPath = data.bucket+"/"+ossType+"/"+moment(new Date()).format('YYYYMMDD')+"/";
			const dirPath = ossType+"/"+moment(new Date()).format('YYYYMMDD')+"/";
			const OSSAccessKeyId = data.accessKeyId;
			const secret = data.accessKeySecret;
			const host = "http://"+data.bucket+"."+data.endpoint;
			let end = new Date().getTime() + 3600000;
			let expiration = new Date(end).toISOString();
			let policyString = {
				expiration,
				conditions: [
					['content-length-range', 0, 1048576000],
					['starts-with', '$key', dirPath]
				]
			};
			policyString = JSON.stringify(policyString);
			const policy = new Buffer(policyString).toString('base64');
			const signature = crypto.createHmac('sha1', secret).update(policy).digest('base64');

			return res.send({
				accessid: OSSAccessKeyId,
				host: host,
				policy: policy,
				signature: signature,
				expire: end,
				dir: dirPath,
				sts_token: data.securityToken,
				data: data
			});
		}
	});
};


exports.ossUpload = function (req, res, next) {
// logger.warn("ossStream");
	// logger.debug(ossStream);

	logger.debug("--> 开始使用Node上传图片");
	let userTokenByCookie = req.cookies[config.cookie.authKey];
	if(!userTokenByCookie){
		return res.send({
			code: -1,
			message: "Not found token"
		});
	}

	// 提供阿里云账号短期访问权限管理
	gatewayApis["passport"]["AliyunOssAuthApi_getSts"]({
		TOKEN: userTokenByCookie
	}, function (error, data) {
		data = data.data;
		if(error || !data || data.code!==200 || !data.data){
			res.send({
				code: 2,
				message: "获取阿里云访问权限错误",
				error: error,
				data: data
			});
		} else {
			data = data.data;
			// config.oss.OSSAccessKeyId = 'hh8VeIaK3yI5xHfA';
			let accessKeyId = data.accessKeyId;
			// config.oss.secret = 'VM9l16oZ8eiURXc1GPBXBnmRH6jlTC';
			let secretAccessKey = data.accessKeySecret;
			let stsToken = data.securityToken;
			logger.debug("--> 获取阿里云OSS临时账号成功", {accessKeyId,secretAccessKey,stsToken});
			const ossStream = require('aliyun-oss-upload-stream')(new ALY.OSS({
				accessKeyId: accessKeyId,
				secretAccessKey: secretAccessKey,
				stsToken: stsToken,
				securityToken: stsToken,
				endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
				apiVersion: '2013-10-15'
			}));

			let dirPath = config.oss.type+"/"+moment(new Date()).format('YYYYMMDD')+"/";
			// let dirPath = config.oss.ueditorPath+moment(new Date()).format('YYYYMM')+"/";
			let expiration = String(new Date().getTime()) + String(Math.floor(Math.random()*9999999));
			let suffix = "";

			let upload = ossStream.upload({
				// Bucket: 'jiuhu-sxjy-firstbucket',
				Bucket: data.bucket,
				Key: dirPath+expiration+'.jpg'
			});

			upload.on('error', function (error) {
				logger.error('--> upload error:', error);
			});

			// 上传文件的过程中，会触发part事件，回调函数参数为当前分片的信息
			upload.on('part', function (part) {
				logger.debug('--> upload part:', part);
				// { ETag: '"D4EF7EB351DB1354CCD0141E1C1E527C"', PartNumber: 1 }
			});

			// 上传成功后触发该事件，回调函数参数为完整的 Object
			upload.on('uploaded', function (details) {
				logger.debug('--> upload success:', details);

				res.setHeader('Content-Type', 'text/html');
				res.send({
					"state": "SUCCESS",
					"url": (config.oss && config.oss.resource) ? config.oss.resource + details.Key : "http://resource.test.sxw.cn/" + details.Key,
					"title": "aliyunOss.name",
					"original": "o_filename"
				});
			});

			// 可选配置
			upload.minPartSize(1048576); // 1M，表示每块part大小至少大于1M

			logger.debug('--> upload start ');
			let form = new multiparty.Form();

			//设置编辑
			form.encoding = 'utf-8';
			//设置文件存储路径
			// form.uploadDir = config.uploadDir;
			//设置单文件大小限制 最大只能上传5M的图片
			form.maxFilesSize = 5*1024*1024;
			// 设置所有文件的大小总和
			// form.maxFields = 1000*2*1024*1024;

			form.parse(req, function(error, fields, files) {
				// logger.debug('--> upload parse 解析文件back');
				// logger.debug(error);
				// logger.debug(fields);
				if(error || !files.upfile[0].path){
					return res.send({
						"state": "FALSE",
						"error": error,
						"message": "文件上传失败，可能超出大小限制！"
					});
				}
				let filePath = files.upfile[0].path;
				let pathSuffix;
				try {
					pathSuffix = filePath.split(".")[filePath.split(".").length-1];
				} catch (error){
					pathSuffix = ".jpg";
				}
				if(pathSuffix) suffix = pathSuffix;

				let read = fs.createReadStream(files.upfile[0].path);
				read.pipe(upload);
			});
		}
	});


	// data.accessKeyId = 'hh8VeIaK3yI5xHfA';
	// data.accessKeySecret = 'VM9l16oZ8eiURXc1GPBXBnmRH6jlTC';
	// const host = 'http://jiuhu-sxjy-firstbucket.oss-cn-hangzhou.aliyuncs.com';


};


// 访问出错页面
exports.fail = function (req, res, next) {
	// 错误码
	let errorCode = config.failCode;
	res.render('fail', {
		title: "对不起，访问出错了！",
		// config: config,
		query: req.query,
		errorCode: errorCode
	});
};


exports.debugPage = function (req, res, next) {
	res.render("debug", {
		cookies: {
			auth_token: req.cookies[config.cookie.authKey],
			refresh_token: req.cookies[config.cookie.authKey+"_refresh"]
		},
		title: "晓我成长管控平台-生学教育"
	});
};

exports.debugGetToken = function (req, res, next) {
	// 获取我的token，用来线上测试
	// 从session中获取用户信息
	res.send({
		status: 0,
		message: "ok",
		cookies: req.cookies
	});
};


exports.debugGetConfig = function (req, res, next) {
	if(config.env === "production"){
		return res.send({
			status: -1,
			message: "No authority"
		});
	}

	if(!req.query.env){
		return res.send({
			status: -2,
			message: "Env name is not found"
		});
	}

	try {
		let getConfig = require('../config/config.'+req.query.env);
		if(req.query.json){
			return res.send(getConfig);
		} else {
			return res.render('yaml', {
				title: "Get config success",
				data: getConfig,
				yaml: YAML.stringify(getConfig)
			});
		}
	} catch(error) {
		return res.send({
			status: -3,
			message: "Some error happen",
			error
		});
	}
};

// 已过期 未授权 未开通
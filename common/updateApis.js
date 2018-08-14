/***
 * 遍历vue文件，更新Api调用历史记录
 *
 * */


const fs = require('fs');
const path = require('path');
const request = require('request');
const colors = require('colors');
const eventproxy = require('eventproxy');

process.env.NODE_ENV = "development";
const logger = require('./logger');
const config = require('../config');
const apiConfig = require('../config/api');

const processArgv = require('minimist')(process.argv.slice(2));

// 删除数组指定的某个元素
Array.prototype.remove = function(val) {
	let index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};


// 初始化全局变量
let updateApis = [];
for(let key in processArgv){
	logger.info("--> 初始化全局变量", key, ":", processArgv[key]);
	if(key === "G"){
		updateApis = processArgv[key].split(",");
	} else if(key === "_"){
		updateApis = processArgv[key];
	}
}
// 默认同步
let isAsync = false;
if(updateApis.find(x => x==="async-")){
	updateApis.remove('async-');
	isAsync = true;
}
if(updateApis.length===0){
	updateApis = apiConfig.site_gateway;
}
if(updateApis.find(x => x==="all-")){
	updateApis = apiConfig.gateways;
}
if(!updateApis || updateApis.length===0){
	logger.info("--> 任务中止::".bgRed, "微服务名称不能为空", updateApis);
}
let ep2 = new eventproxy();
ep2.fail((error, data) => {
	return logger.error(("-->").bgRed, "任务中止::", data);
});
logger.info("--> 任务开始::".bgMagenta, updateApis);

// -> start 根据所选的gateway_name，挨个导入swagger
ep2.after('making_api', updateApis.length, function (data) {
	lastStep(data);
});

function makingOneApi(id, callback) {
	if(callback){
		logger.info("--> 开始同步导入微服务::::".magenta, id);
	} else {
		logger.info("--> 开始异步导入微服务::::".magenta, id);
	}
	
	let ep = new eventproxy();
	ep.fail((error, data) => {
		if(callback){
			callback(null, {ok: false, id, error, data});
		} else {
			ep2.emit('making_api', {ok: false, id, error, data});
		}
	});

	
	// -> step 1 根据p_id，v_id，gateway_name获取g_id
	logger.info(("-> ["+id+"] step 1").cyan, "开始根据gateway_name获取g_id");
	ajaxGetGroupByGatewayName(id, ep.done('get_g_id'));
	
	// -> step 2 根据p_id，v_id，g_id导入swagger
	let g_id;
	ep.all('get_g_id', function (data) {
		logger.info(("-> ["+id+"] step 2").cyan, "获取g_id成功", data.id, "开始导入swagger");
		g_id = data.id;
		ajaxSwaggerImport(g_id, data.swagger_url, ep.done('swagger_import'));
	});
	
	// -> step 3 返回导入状态，成功后就显示日志，并调用本地接口，导出swagger
	ep.all('swagger_import', function (data) {
		logger.info(("-> ["+id+"] step 3-1").cyan, "导入swagger成功", "正在同步swagger导入记录，请稍候..");
		setTimeout(() => {
			logger.info(("-> ["+id+"] step 3-2").cyan, "swagger导入记录同步成功::", (config.mock.host+"/build/"+data+".txt").green);
			ajaxGetGroupByGatewayName(id, function(error, data2){
				if(data2) {
					let arr = data2.swagger_history;
					let history = arr.find(x => x.file_name === data);
					if(history){
						let logs = id+"微服务，共扫描接口 "+history.count_all+ " 个，";
						logs += "忽略 "+history.count_cancel+ " 个，";
						logs += "创建 "+history.count_create+ " 个，";
						logs += "更新 "+history.count_update+ " 个，";
						logs += "失败 "+history.count_fail+ " 个，";
						logger.info(("-> ["+id+"] step 3-3").cyan, "导入详情::", logs.yellow);
					}
				}
				ajaxGetGatewayApisFile(g_id, ep.done('get_apis_file'));
			});
		}, 6000);
	});
	
	// -> step 4 更新该微服务接口完成情况
	ep.all('get_apis_file', function (data) {
		logger.info(("-> ["+id+"] step 4").cyan, "导出swagger成功，已导出", data.length, "个接口，正在更新接口完成情况..");
		ajaxReloadApisHistory(id, g_id, ep.done('reload_apis_history'));
	});
	
	// -> step 5 在服务端生成新的apiFile
	ep.all('reload_apis_history', function (data) {
		logger.info(("-> ["+id+"] step 5").cyan, "已成功更新 "+data.length+" 个接口的完成情况，正在服务端生成新的apiFile..");
		ajaxGetServersApiFile(ep.done('making_servers_apis_file'));
	});
	
	// -> step 6 调用本地接口，导出swagger
	ep.all('making_servers_apis_file', function (data) {
		logger.info(("-> ["+id+"] step 6").cyan, "生成新的Api文档成功，正在同步apiFile到本地..");
		ajaxDownloadApisFile(id, ep.done('download_apis_file'));
	});
	
	// -> step 7 更新swagger完成状态
	ep.all('download_apis_file', function (data) {
		logger.info(("-> ["+id+"] step 7").cyan, "Api文档参考地址::", (config.mock.host+"/api/list?p_id="+config.mock.p_id+"&v_id="+config.mock.v_id+"&g_id="+g_id).green);
		logger.info(("--< 导入微服务成功:::: step over").magenta, id, "同步apiFile到本地成功");
		if(callback){
			callback(null, {ok: true, data});
		} else {
			ep2.emit('making_api', {ok: true, data});
		}
	});
}

// start
if(isAsync){
	// 异步
	for (let i=0; i<updateApis.length; i++){
		setTimeout(function() {
			makingOneApi(updateApis[i]);
		}, 100*i);
	}
} else {
	// 同步 递归调用
	let len = updateApis.length;
	let arr = [];
	executeFunc(0, len, arr, function(arr){
		lastStep(arr);
	});
}

// 最终输出
function lastStep(data){
	let ok = 0;
	for(let item of data){
		if(item.ok){
			ok++;
		} else {
			logger.error(("--> ["+item.id+"] error::").red, item);
		}
	}
	if(ok === data.length){
		logger.info(("--> 任务结束::").bgGreen, "已经成功同步所有 "+data.length+" 个微服务Api到本地！");
	} else {
		logger.info(("--> 任务结束::").bgGreen, "共同步 "+data.length+" 个apiFile到本地，", "其中失败 "+(data.length-ok)+" 个！");
	}
}

// 递归函数
function executeFunc(count, sum, arr, callback){
	if(count === sum){
		if(callback){
			callback(arr);
		}
		return false;
	}else{
		makingOneApi(updateApis[count], function(error, data){
			arr.push(data);
			count++;
			executeFunc(count, sum, arr, callback);
		});
	}
}

// 获取g_id
function ajaxGetGroupByGatewayName(gateway_name, callback){
	request.post({
		url: config.mock.host+"/api/auto/getGroupByGatewayName",
		form: {
			p_id: config.mock.p_id,
			v_id: config.mock.v_id,
			gateway_name: gateway_name
		},
		headers: config.mock.headers,
		json: true
	}, function (error, response, body) {
		if(error || typeof body !== "object" || typeof body.status === "undefined"){
			callback("ajaxGetGroupByGatewayName error", {error, body});
		} else if(body.status===0 && body.data && body.data.id) {
			callback(null, body.data);
		} else {
			callback("ajaxGetGroupByGatewayName null", body);
		}
	});
}

// 导入swagger
function ajaxSwaggerImport(g_id, swagger_url, callback){
	request.post({
		url: config.mock.host+"/api/auto/swaggerImport",
		form: {
			p_id: config.mock.p_id,
			v_id: config.mock.v_id,
			g_id: g_id,
			must: 0,
			swagger_url: swagger_url,
			user_id: "ryhjF16Zf",
			user_name: "_auto"
		},
		headers: config.mock.headers,
		json: true
	}, function (error, response, body) {
		if(error || typeof body !== "object" || typeof body.status === "undefined"){
			callback("ajaxSwaggerImport error", {error, body});
		} else if((body.status===0 || body.status==="0") && body.data) {
			callback(null, body.data);
		} else {
			callback("ajaxSwaggerImport null", body);
		}
	});
}

// 导出swagger
function ajaxGetGatewayApisFile(g_id, callback){
	request.post({
		url: config.mock.host+"/api/auto/getGatewayApisFile",
		form: {
			p_id: config.mock.p_id,
			v_id: config.mock.v_id,
			g_id: g_id
		},
		headers: config.mock.headers,
		json: true
	}, function (error, response, body) {
		if(error || typeof body !== "object" || typeof body.status === "undefined"){
			callback("ajaxGetGatewayApisFile error", {error, body});
		} else if((body.status===0 || body.status==="0") && body.data) {
			callback(null, body.data);
		} else {
			callback("ajaxGetGatewayApisFile null", body);
		}
	});
}

// 更新接口完成情况
function ajaxReloadApisHistory(id, g_id, callback){
	request.post({
		url: config.mock.host+"/api/auto/runApiCompleteState",
		form: {
			g_id: g_id
		},
		headers: config.mock.headers,
		json: true
	}, function (error, response, body) {
		if(error || typeof body !== "object" || typeof body.status === "undefined"){
			callback("ajaxReloadApisHistory error", {error, body});
		} else if((body.status===0 || body.status==="0") && body.data) {
			callback(null, body.data);
		} else {
			callback("ajaxReloadApisHistory null", body);
		}
	});
}

// 在服务端生成新的apiFile
function ajaxGetServersApiFile(callback){
	callback(null, null);
	// request.post({
	// 	url: config.mock.host+"/api/auto/runApiCompleteState",
	// 	form: {
	// 		g_id: g_id
	// 	},
	// 	headers: config.mock.headers,
	// 	json: true
	// }, function (error, response, body) {
	// 	if(error || typeof body !== "object" || typeof body.status === "undefined"){
	// 		callback("ajaxReloadApisHistory error", {error, body});
	// 	} else if((body.status===0 || body.status==="0") && body.data) {
	// 		callback(null, body.data);
	// 	} else {
	// 		callback("ajaxReloadApisHistory null", body);
	// 	}
	// });
}

// 下载Apis file到本地
function ajaxDownloadApisFile(id, callback){
	// 导一个微服务Api
	let url = apiConfig.host+"/build/"+apiConfig.v_id+"_"+id+".js";
	let savePath = apiConfig.savePath+apiConfig.apiVersion+"/"+id+".js";
	exports.makeApiFunctions(id, url, savePath, function(error, data){
		if(error){
			callback("ajaxDownloadApisFile error", {error, data});
		} else {
			callback(null, data);
		}
	});
}


// 内部模块 -- 异步队列读微服务Api文件
exports.makeApiFunctions = function (id, url, savePath, callback) {
	logger.info(("-> ["+id+"] step 6 makeApiFunctions").cyan, "微服务Api的Url::", url.green);
	logger.info(("-> ["+id+"] step 6 makeApiFunctions").cyan, "本地保存路径::", savePath);
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












// text colors
// black
// red
// green
// yellow
// blue
// magenta
// cyan
// white
// gray
// grey

// background colors
// bgBlack
// bgRed
// bgGreen
// bgYellow
// bgBlue
// bgMagenta
// bgCyan
// bgWhite
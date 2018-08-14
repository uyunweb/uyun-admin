/***
 * 遍历vue文件，更新Api调用历史记录
 *
 * */


const fs = require('fs');
const path = require('path');
const request = require('request');
const colors = require('colors');

process.env.NODE_ENV = "development";
const logger = require('./logger');
const config = require('../config');
const apiConfig = require('../config/api');

const processArgv = require('minimist')(process.argv.slice(2));

// 解析需要遍历的文件夹
const filePath = path.resolve('./src');

// 初始化全局变量
let Argvs = [];
for(let key in processArgv){
	logger.info("--> 初始化全局变量", key, ":", processArgv[key]);
	if(key === "G"){
		Argvs = processArgv[key].split(",");
	} else if(key === "_"){
		Argvs = processArgv[key];
	}
}
// 默认同步
let isLogs = false;
if(Argvs.find(x => x==="logs")){
	isLogs = true;
}

//调用文件遍历方法
logger.info("--> 任务开始::".bgMagenta);
logger.info(("-> step 1").cyan, "开始遍历文件，请稍候..", filePath);
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
let allFiles = [];
let vueFiles = [];
function fileDisplay(filePath){
	//根据文件路径读取文件，返回文件列表
	fs.readdir(filePath,function(err,files){
		if(err){
			logger.warn(err);
		}else{
			//遍历读取到的文件列表
			files.forEach(function(filename){
				//获取当前文件的绝对路径
				var filedir = path.join(filePath,filename);
				//根据文件路径获取文件信息，返回一个fs.Stats对象
				fs.stat(filedir,function(eror,stats){
					if(eror){
						logger.warn(("-> step 1").cyan, "获取文件错误", filedir, error);
					}else{
						var isFile = stats.isFile();//是文件
						var isDir = stats.isDirectory();//是文件夹
						if(isFile){
							allFiles.push(filedir);
							if(filedir.endsWith(".vue")){
								vueFiles.push(filedir);
							}
						}
						if(isDir){
							fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
						}
					}
				});
			});
		}
	});
}

let gatewayFunctions = [];
setTimeout(function() {
	logger.warn(("-> step 1").cyan, "已轮循完所有文件", allFiles.length+"个");
	logger.warn(("-> step 1").cyan, "已筛选出Vue文件", vueFiles.length+"个");
	// logger.info(vueFiles.join(","));
	logger.warn(("-> step 2").cyan, "开始扫描$ajax.gateway");
	
	for(let i=0; i<vueFiles.length; i++){
		let item = vueFiles[i];
		fs.readFile(item, function(error, data) {
			if (error) {
				logger.error(error);
			} else {
				data += "";
				// var regtxt = "/co[\\s\\S]*?le/g";
				var regtxt = '/\\$ajax.gateway\\(\\"\\/[\\s\\S]*?\\"/g';
				// var regtxt = "/$ajax.gateway([\\s\\S]*?,/g";
				var URL_REG = eval(regtxt);
				// logger.info("--> URL_REG", URL_REG);
				var urlIndex = 0;
				var post_url = data.replace(URL_REG, function(data){
					// logger.info(urlIndex);
					// logger.info(data);
					
					data = data.replace(/\$ajax.gateway\("\/|"/g, "");
					data = data.split("/");
					if(data.length===2 && apiConfig.site_gateway.findIndex(name => name === data[0])!==-1){
						data[2] = item.split("\\")[item.split("\\").length-2]+"/"+item.split("\\")[item.split("\\").length-1];
						gatewayFunctions.push(data.join("-"));
					}
					urlIndex++;
				});
			}
		});
	}
}, 2000);

setTimeout(function(){
	logger.info(("-> step 2").cyan, "已从所有Vue文件中查找出gateway请求", gatewayFunctions.length+"个");
	// logger.info(gatewayFunctions.join(","));
	if(!gatewayFunctions || gatewayFunctions.length===0){
		return logger.error(("--> 任务结束::").bgMagenta, "没有查找出可供更新的gateway请求");
	}
	
	logger.info(("-> step 3").cyan, "开始post请求", config.mock.host+"/api/updateHistory");
	if(isLogs) logger.info(("-> step 3").cyan, gatewayFunctions);
	// 开始post请求
	request.post({
		url: config.mock.host+"/api/updateHistory",
		form: {
			v_id: config.mock.v_id,
			site: config.name,
			gateways: gatewayFunctions.join("|")
		},
		headers: config.mock.headers,
		json: true
	}, function (error, response, body) {
		if(body.status===0 && body.data){
			if(isLogs) logger.info(("-> step 3").cyan, "请求返回成功", body);
			let ok = 0;
			let notReload = 0;
			let failReload = 0;
			let errReload = 0;
			for(let item of body.data){
				if(item.ok ===1){
					ok++;
				} else if(item.ok ===-2){
					notReload++;
				} else if(item.ok ===-1 && !item.error && !item.data) {
					failReload++;
				} else {
					errReload++;
				}
			}
			return logger.info(("--> 任务结束::").bgGreen, "共更新数据", body.data.length, "个，其中：成功", ok, "个，忽略", notReload, "个，没有找到的Api", failReload, "个，失败", errReload, "个。");
		} else {
			if(isLogs) logger.warn(("-> step 3").cyan, "请求返回失败", body);
			return logger.info(("--> 任务结束::").bgRed, "返回失败", body);
		}
	});
}, 4000);

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
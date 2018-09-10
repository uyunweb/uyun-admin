const path = require('path');
const request = require('request');
const apiConfig = require('./api');
const consts = require('../common/consts');

let siteConfig;

if(process.env.NODE_ENV === "development"){
	console.info("NODE START-UP :::::: 开发模式，不走配置中心，调用config.development.js");
	siteConfig = require('./config.development');
} else if(process.env.NODE_ENV === "beta") {
	siteConfig = require('./config.beta');
} else {
	siteConfig = require('./config.prod');
}

// 覆盖lookapi配置，目的是减少复用，线上可以灵活的决定是否保存api
if(siteConfig.lookapi){
	if(siteConfig.lookapi.host) apiConfig.host = siteConfig.lookapi.host;
	if(siteConfig.lookapi.p_id) apiConfig.p_id = siteConfig.lookapi.p_id;
	if(siteConfig.lookapi.v_id) apiConfig.v_id = siteConfig.lookapi.v_id;
	apiConfig.apiSave = siteConfig.lookapi.apiSave;
}

// 输出最终的config
console.info("NODE START-UP :::::: Config is", JSON.stringify(siteConfig));

module.exports = {
	// 项目名称
	name: "uyun.net.account",
	// 描述
	description: "内容管理平台",
	// 版本号
	version: siteConfig.version,
	// env
	env: process.env.NODE_ENV || "development",

	// 域名
	host: siteConfig.host,
	// 根目录
	dir: siteConfig.dir,
	// 程序运行的端口
	port: siteConfig.port,

	// 如果认证失败返回的页面链接
	loginUrl: siteConfig.loginUrl,

	// connect-history-api-fallback配置
	rewrites : [
		{
			from: /^\/$/,
			to: '/web'
		}, {
			from: /^\/web\/page\/.*$/,
			to: '/web'
		}, {
			from: /^\/web\/page.*$/,
			to: '/web'
		},  {
			from: /^.*$/,
			to: function(context) {
				return context.parsedUrl.pathname;
			}
		}
	],

	// 是否开启debug模式
	debug: siteConfig.debug,
	// 日志等级
	loggerLevel: siteConfig.loggerLevel,
	loggerUrl: siteConfig.loggerUrl,
	// 是否打开静态资源加载日志
	requestLogger: siteConfig.requestLogger,
	// raven配置
	ravenNode: siteConfig.ravenNode,
	raven: siteConfig.raven,
	// monitorClientUrl
	monitorClientHost: siteConfig.monitorClientHost,
	// 是否开启前端缓存
	useCache: siteConfig.useCache,
	// 是否启用渲染前白屏loading
	useHtmlLoading: siteConfig.useHtmlLoading,

	// 后端服务器配置
	servers: siteConfig.servers,

	// oss配置
	oss: siteConfig.oss,

	// webpackServer 为 true 时，用于本地调试， 为 false 时，用于线上编绎环境，此时需要使用"npm run dev"启动webpack服务器
	webpackServer: siteConfig.webpackServer,
	// dns地址，前端地址都从这儿来
	build: siteConfig.build || {},

	// mock设置 为 true 时，从mock服务器取数据，为 false 时从servers取数据
	mock: {
		open: apiConfig.mock,
		host: apiConfig.host,
		url: apiConfig.host+"/mock/url/",
		userId: apiConfig.mockUser,
		headers: {
			'X-Custom-Header': 'Bumbaway atuna',
			'Content-Type': 'application/json'
		},
		saveApiHost: apiConfig.host+"/looks/writeApi/",
		serversApiFileUrl: apiConfig.host+"/build/"+apiConfig.v_id+".js",
		serversApiFileListUrl: apiConfig.host+"/build/"+apiConfig.v_id+"_apilist.js",
		apiSave: apiConfig.apiSave,
		p_id: apiConfig.p_id,
		v_id: apiConfig.v_id
	},

	// cookie配置
	cookie: siteConfig.cookie,

	// 认证错误Message
	failCode: consts.failCode

};

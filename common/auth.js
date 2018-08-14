/**
 * @@@ 公共模块
 * 权限验证
 */

const eventproxy = require('eventproxy');
const config = require('../config');
const logger = require('./logger');
const gatewayApi = require('./api/gateway');
const util = require('./util');


/**
 * 访问验证-每个访问都会验证
 */
exports.authApp = function (req, res, next) {

	// logger.info("--> A new request coming, IP: " + req.ip.split(":").pop() + " PATH: " + req.path);

	// 传入query
	res.locals.query = req.query;
	res.locals.config = {
		env: config.env,
		name: config.name,
		version: config.version,
		host: config.host,
		isSxt: config.isSxt,
		loginUrl: config.loginUrl,
		dir: config.dir,
		port: config.port,
		resource: config.oss ? config.oss.resource : null,
		dns: config.build.dns_host || config.dir || '',
		useCache: config.useCache,
		useHtmlLoading: config.useHtmlLoading,
		webpackServer: config.webpackServer,
		cookie: config.cookie,
		raven: config.vueRavenUrl,
		monitorClientHost: config.monitorClientHost,
		levelOptions: config.levelOptions,
		roleOptions: config.roleOptions
	};
	next();
};


const logger = require('./logger');
const config = require('../config');
const ignore = /^\/(public|agent)/;

exports = module.exports = function (req, res, next) {
	// Assets do not out log.
	if (ignore.test(req.url)) {
		next();
		return;
	}

	let t = new Date();
	let requestLogger;
	let startSub = 0;
	if(config.dir) startSub = config.dir.length;
	let testUrl = req.url.substr(startSub, 5);
	if(config.requestLogger){
		// 打印所有日志
		requestLogger = true;
	} else if (config.debug) {
		// 只打印非静态资源的日志
		requestLogger = !(testUrl==="/css/" || testUrl==="/scri" || testUrl==="/img/" || testUrl==="/imag" || testUrl==="/dist");
	} else {
		// 不打印日志
		requestLogger = false;
	}

	if(testUrl==="/dist"){
		res.setHeader("Cache-Control", "max-age=60");
	}

	// 屏蔽静态资源日志记录
	if(requestLogger){
		logger.debug(
			'=> Node request coming :: ' +
			req.method +
			" PATH: " +
			req.url +
			" IP: " +
			req.ip.split(":").pop() +
			" TIME: " +
			t.toISOString());
	}



	res.on('finish', function () {
		let duration = ((new Date()) - t);
		if(requestLogger){
			logger.debug(
				'<= Node request completed :: ' +
				req.method +
				" PATH: " +
				req.url +
				" " +
				res.statusCode +
				" IP: " +
				req.ip.split(":").pop() +
				" " +
				('(' + duration + 'ms)').green);
		}
	});
	next();
};

/**
 * @@@ 公共模块
 * 日志处理
 */


const config = require('../config');
const mydebug = require("debug")("mydebug:logger.info");
const log4js = require('log4js');
try {
	log4js.configure({
		appenders: [
			{
				// 控制台输出
				type: 'console'
			},
			{
				// 文件输出
				type: 'file',
				filename: config.loggerUrl,
				category: 'cheese'
			}
		]
	});
} catch (error){
	console.info("--> log4js.configure 出错，请排查！有可能是日志存储目录不能访问！");
	console.error(error);
}

const logger = log4js.getLogger('cheese');
// logger.setLevel(config.debug && env !== 'test' ? 'DEBUG' : 'ERROR')

if(config.loggerLevel){
	logger.setLevel(config.loggerLevel);
} else {
	logger.setLevel('DEBUG');
}

module.exports = logger;


// 跟踪，调试，信息，警告，错误的，致命的
// logger.trace("Cache set common express");
// logger.debug("Cache set common express", ("zxw").greenBG);
// logger.info("Cache set common express");
// logger.warn("Cache set common express");
// logger.error("Cache set common express");
// logger.fatal("Cache set common express");
//
// var t = new Date();
// for(var i=0; i<1000; i++){
//  // do something
// }
// var duration = (new Date() - t);
// logger.info("Render view", "view", ("(" + duration + "ms)").green);

/* npm install colors */

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

// styles
// reset
// bold
// dim
// italic
// underline
// inverse
// hidden
// strikethrough

// extras
// rainbow
// zebra
// america
// trap
// random


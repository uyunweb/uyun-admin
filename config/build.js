/**
 * Created by zxw on 2017/9/19.
 */

let processPop = process.argv[process.argv.length-1];
let nodeConfig = require("../config/config.development");

module.exports = {
	
	// dev 端口
	port: 8188,
	host: nodeConfig.host,
	dir: nodeConfig.dir,
	
	// 启用代码检查的目录，不检查时可设为空数组
	eslintPath: ['src/pages', 'src/router', 'src/components', 'src/config', 'src/service', 'src/entry'],

	// 生成map文件配置，不想生成map文件时可以设为false
	devSourceMapFile: "#cheap-module-eval-source-map",
	// prodSourceMapFile: "#cheap-module-source-map",
	prodSourceMapFile: false,
	
	// 是否删除debugger
	drop_debugger: true,
	// 是否删除console.*
	drop_console: nodeConfig.build.drop_console,

	// build_host
	build_host: nodeConfig.build.dns_host,
	
	// 启动npm rn dev时是否自动在浏览器中打开项目
	isOpenBrowser: true,
	// 如果打开时的url
	openUrl: nodeConfig.host+':'+nodeConfig.port+nodeConfig.dir
};

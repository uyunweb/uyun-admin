/**
 */

// 获取node端的配置文件
let node_config = JSON.parse(document.querySelector("#js_backConfig").value);

let config = {
	serviceHost: node_config.dir+"/api/gateway",
	errorPageUrl: node_config.dir+"/api/fail"
};

// node端的配置权限最高
config = mergeConfig(config, node_config);
// console.time('timeForLoad');
console.info("--> config merge result ::",config);
// console.info("== TIME > vue config", Number(new Date()));
export default config;


/*
 * 覆盖base_config中的配置，初始化不同环境的配置
 *
 * @param base_config : object   基础配置列表
 * @param top_config  : object   高权限的配置项
 * @return            : object   返回base_config的引用
 * */
function mergeConfig(base_config, top_config) {
	let config_item = Object.keys(top_config);
	for (let i = 0; i < config_item.length; i++) {
		base_config[config_item[i]] = top_config[config_item[i]];
	}
	return base_config;
}

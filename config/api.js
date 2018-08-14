const path = require('path');

module.exports = {

	// api来源地址
	host: "http://uyun.net:3220",
	// 栏目和版本id
	p_id: "BJlrJJ@dSQ",
	v_id: "ry@r1yZdSm",
	// 是否mock数据
	mock: false,
	mockUser: false,
	apiSave: true,
	// 所有微服务的名称(用来更新api文档)
	gateways: ['apis'],
	// 这个项目要调用的微服务名称
	site_gateway: ['apis'],
	// 保存本地的目录
	savePath: "common/api/",
	// Api的版本目录
	apiVersion: "v.1.0"
};

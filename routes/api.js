/**
 * @@@ 公共模块
 * @author  zxw@163.com
 * @date    2017/11/22
 * @description  以接口服务的方式向vue前端提供服务
 */

const express = require('express');
const router = express.Router();

const config = require('../config');
const logger = require('../common/logger');
const api = require('../controllers/api');

// 健康检查
router.get('/', api.helloWord);

// 代理请求
router.post('/request', api.proxyRequest);
// gateway
router.post('/gateway/:name/:id', api.gateway);
// node
router.get('/node/*', api.node);

// 用户认证失败页面
router.get('/fail', api.fail);

// aliyunOss服务
router.get('/oss/getPolicy', api.getPolicy);
router.post('/oss/upload', api.ossUpload);

// debug
router.get('/debug', api.debugPage);
// getToken
router.get('/debug/get_token', api.debugGetToken);
// getConfig
router.get('/debug/get_config', api.debugGetConfig);

// debug
if(config.debug){
	// lookapi - logs
	router.get('/debug/logs', api.logs);  // logs
	// 方便本地调试，支持get请求
	router.get('/gateway/:name/:id', api.gateway);
	// api servers 导出
	router.get('/writeServersApi', api.writeServersApi);
	router.get('/updateApis', api.updateApis);
}

module.exports = router;
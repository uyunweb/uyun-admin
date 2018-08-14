/* eslint-disable no-undef */
/**
 * @description  by routes/site.js
 */

const request = require('request');
const config = require('../config');
const logger = require('../common/logger');
const util = require('../common/util');

// 首页
exports.index = function (req, res, next) {
	let renderName = "module/app/index";
	if(!config.webpackServer.open){
		renderName += "_build";
	}
	res.render(renderName, {
		title: "内容管理平台"
	});
};

// Test组件
exports.demo = function (req, res, next) {
	logger.info("exports.demo --> Test");
	let renderName = "module/demo/index";
	if(!config.webpackServer.open){
		renderName += "_build";
	}
	res.render(renderName, {
		title: "内容管理平台-Test组件"
	});
};

// webpack热更新代理，用于端口跨域
exports.webpackHotReload = function(req,res){
	request.get({
		url: config.webpackServer.host+"/"+req.params.id,
		// url: "http://127.0.0.1:8588/dist/"+req.params.id,
		json: true
	}, function (error, response, body) {
		if(!error){
			res.send(body);
		} else {
			res.send({
				"message": "刷新失败"
			});
		}
	});
};

// 浏览器升级提示
exports.forie = function(req,res){
	res.render('forie', {
		title: "浏览器升级提示"
	});
};

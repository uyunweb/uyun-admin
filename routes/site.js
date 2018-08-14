/**
 * @author  zxw@163.com
 * @date    2017/8/21
 * @description  基本路由，包括项目主页、浏览器升级提示、404、500、403等页面
 */


const express = require('express');
const request = require('request');

const config = require('../config');
const site = require('../controllers/site');
const logger = require('../common/logger');

const router = express.Router();

// 兼容旧地址
router.get('/', site.index);

// Test组件
router.get('/demo', site.demo);

// 浏览器升级提示
router.get('/forie', site.forie);

// 仅开发环境
if(config.debug && config.webpackServer.open){
	router.get('/dist/:id', site.webpackHotReload);  // dist热更新
}

module.exports = router;

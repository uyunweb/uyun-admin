/**
 * @@@ 公共模块
 * 代理请求
 */


'use strict';

const logger = require('../common/logger');
const proxy = require('./proxy');


// GET
exports.GET = function(obj, callback){
	obj.type = "get";
	proxy.request(obj, callback);
};

// POST
exports.POST = function(obj, callback){
	obj.type = "post";
	proxy.request(obj, callback);
};

// DELETE
exports.DELETE = function(obj, callback){
	obj.type = "delete";
	proxy.request(obj, callback);
};

// PUT
exports.PUT = function(obj, callback){
	obj.type = "put";
	proxy.request(obj, callback);
};

// PATCH
exports.PATCH = function(obj, callback){
	obj.type = "patch";
	proxy.request(obj, callback);
};

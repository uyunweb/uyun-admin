/**
 * Created by ThinkPad on 2017/12/8.
 */
import Cookies from "js-cookie";
import md5 from 'js-md5';
import config from "../../config";
import appStore from "../../store";
import Api from "../api";
import '../../static/js/aes.js';

const Auths = {
	getToMeta(to) {
		console.log(to);

		// 获取to.meta中的userRoleCode参数，可能多维设置
		let toMeta = {};
		let matchedArray = [];
		for(let i=0; i<to.matched.length; i++){
			matchedArray.push(to.matched[i].meta);
		}
		for(let i=0; i<matchedArray.length; i++){
			// toMeta可叠加设置，子路由会覆盖父路由。
			toMeta = Object.assign(toMeta, matchedArray[i]);
		}
		return toMeta;
	},
	failCode(code, type, msg) {
		// 认证失败时的回调
		let url = config.errorPageUrl;
		if(!code){
			url += "?code="+3000;
		} else {
			url += "?code="+code;
		}
		if(typeof msg === "undefined" && typeof type !== "undefined"){
			if(typeof type !== "number"){
				msg = type;
				type = undefined;
			}
		}
		if(typeof type !== "undefined"){
			url += "&type="+type;
		}
		if(typeof msg !== "undefined"){
			url += "&msg="+msg;
		}
		return window.location.href=encodeURI(url);
	},
	removeHtmlLoading() {
		// 清除HtmlLoading效果
		let htmlLoadingDiv = document.getElementById("js_html_loading");
		if(htmlLoadingDiv){
			htmlLoadingDiv.parentNode.removeChild(htmlLoadingDiv);
		}
	},
	ajaxGetUserInfoByToken(token, callback) {
		// 获取用户信息
		Api.gateway("/apis/getUserInfo", {
			id: "﻿5b6293346e001018b0409c37".trim()
		}, (data) => {
			if(data.code===200){
				data = data.data;
				callback(null, data);
			} else {
				callback("获取userInfo失败", data);
			}
		});
	},
	logout() {
		// 退出登录
		Cookies.remove(config.cookie.authKey, { domain: config.cookie.domain });

		if(config.loginUrl){
			return window.location.href = config.loginUrl;
		} else {
			return window.location.href = "/";
		}
	}
};

export default Auths;

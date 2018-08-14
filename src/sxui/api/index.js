// 引入ajax库
import axios from "axios";
// 引入config
import config from "../../config";
import appStore from "../../store";
import Auth from "../auth";
/**
 * 从gateway获取数据
 *
 */
function getGatewayData(functionName, parameter, callback, allowCancel, type) {
	// 带上vuex的认证参数，暂时用于服务器端较验
	if (appStore.state.user && appStore.state.user.info) {
		parameter.auth_user_id = appStore.state.user.info.id;
	}
	if (appStore.state.user && appStore.state.user.role) {
		parameter.auth_role_code = appStore.state.user.role.code;
	}

	// 判断当前请求是否需要loading状态
	if (parameter.isLoading) {
		// loading状态 +1
		try {
			appStore.commit('reqAjax');
		} catch (error) {
			console.warn('vuex中未配置对应reqAjax mutations ');
		}
	}

	// 判断当前请求是否启用公共异常处理
	if (parameter.isErrorCallback) {
		appStore.commit('startAjax');
	}

	// 开始请求
	let axiosType = "post";
	let axiosUrl = config.serviceHost + functionName;
	if(type === "node"){
		// 目前仅支持get请求
		axiosType = "get";
		axiosUrl = config.dir + "/api/node" + functionName;
	}
	return axios[axiosType](axiosUrl, parameter, {
		cancelToken: new axios.CancelToken(function executor(c) {
			// executor 函数接收一个 cancel 函数作为参数
			allowCancel.cancel = c;
		})
	}).then(data => {
		try {
			// 收到响应 了loading状态 -1
			if (parameter.isLoading) {
				// loading状态 +1
				appStore.commit('resAjax');
			}

			if (!data.data) {
				// 返回为空
				return callback({
					code: 3101,
					message: "返回为空"
				});
			} else if (typeof data.data !== "object") {
				// 返回的不是一个json格式对象
				return callback({
					code: 3102,
					message: "返回的不是一个对象",
					data: data.data
				});
			} else {
				data = data.data;

				/***
				 * Step 1 处理约定错误 todo
				 * */

				if (data.code === 3104) {
					// * 账号信息异常，可能需要强制退出重新登录
					return Auth.failCode(data.code, -1);
				}

				if (!config.isSxt && (data.code === 8500 || data.code === 8501 || data.code === 8503 || data.code === 8504 || data.code === 8505)) {
					// * Token错误或无效的格式，此时应退出登录
					return Auth.failCode(data.code, -4);
				} else if (!config.isSxt && data.code === 8502) {
					// * Token已过期，需要调用接口刷新
					// 如果在config中配置了isAutoRefreshToken，Node中间层会强制刷新一次token，如果刷新失败，才会到此方法
					return Auth.failCode(data.code, -4);
				}

				/***
				 * Step 2 处理回调 todo
				 * */
				if (parameter.isErrorCallback) {
					// * 自定义错误回调处理，暂用于成绩分析
					if (data.code === 200) {
						// 只有200时才，正常返回
						callback(data.data);
					} else {
						// 否则调用抛错机制
						appStore.commit('errAjax', data);
					}
				} else if (config.isSxt) {

					// * 生学堂环境，特殊处理
					if(data.refreshTokenCode) {
						// 处理完毕，正常返回
						Auth.handleSxtRefreshTokenCode(data.refreshTokenCode, () => callback(data));
					} else if (data.code === 200) {
						// 只有200时才，正常返回
						callback(data);
					} else {
						// 否则调用抛错机制
						appStore.commit('errorCode', data);
					}
				} else {
					// * 正常返回
					callback(data);
				}
			}
		} catch	(callbackError) {
			console.warn("--> 回调函数错误:");
			console.warn(callbackError);
		}
	}).catch(function (error) {
		// 请求失败 loading状态 -1 防止 loading层锁死
		if (parameter.isLoading) {
			// loading状态 -1
			try {
				appStore.commit('resAjax');
			} catch (error) {
				console.warn('vuex中未配置对应reqAjax mutations ');
			}
		}
		if (axios.isCancel(error)) {
			console.log('Request canceled，请求被取消', error);
		} else {
			callback(error);
			console.warn("--> 请求错误:");
			console.error(error);
		}
	});
}

// 初始化
let Api = {
	gateway: function (apiName, parameter, allowCancel, callback) {
		let argumentsL = arguments.length;
		if (argumentsL === 2) {
			parameter = {};
			allowCancel = {};
			callback = arguments[1];
		} else if (argumentsL === 3) {
			allowCancel = {};
			parameter = arguments[1];
			callback = arguments[2];
		}
		return getGatewayData(apiName, parameter, callback, allowCancel);
	},
	node: function (apiName, parameter, allowCancel, callback) {
		// THE SAME
		let argumentsL = arguments.length;
		if (argumentsL === 2) {
			parameter = {};
			allowCancel = {};
			callback = arguments[1];
		} else if (argumentsL === 3) {
			allowCancel = {};
			parameter = arguments[1];
			callback = arguments[2];
		}
		return getGatewayData(apiName, parameter, callback, allowCancel, "node");
	}
};
export default Api;
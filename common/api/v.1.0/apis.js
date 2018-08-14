/**!
 * 优云任务 1.0 v1.0
 * 接口数量 41
 * http://uyun.net:3220/api/list?p_id=BJlrJJ@dSQ&v_id=ry@r1yZdSm&g_id=HkecbyW_S7
 *
 * 2018-08-14 16:44:50 (c) sxApi Foundation, Inc.
 *
 **/ 
var servers = require('../../servers');



/** 
 * Created by deleteOrder
 *
 * 删除订单
 *
 * @id 	订单id-
 */
exports.deleteOrder = function (data, callback) {
	servers.DELETE({
		url: "/api/order/delete",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "deleteOrder",
		query: {
			id: data.id
		}
	}, callback);
};
/** End deleteOrder */



/** 
 * Created by updateTaskVip
 *
 * 修改任务（商家/普通用户）  (Todo)
 *
 * @updateTaskVip 	undefined-Body
 */
exports.updateTaskVip = function (data, callback) {
	servers.POST({
		url: "/api/task/update/vip",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "updateTaskVip",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End updateTaskVip */



/** 
 * Created by createTask
 *
 * 创建一个任务
 *
 * @createTask 	undefined-Body
 */
exports.createTask = function (data, callback) {
	servers.POST({
		url: "/api/task/created",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "createTask",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End createTask */



/** 
 * Created by deleteTask
 *
 * 删除某个任务
 *
 * @id 	任务id-
 */
exports.deleteTask = function (data, callback) {
	servers.DELETE({
		url: "/api/task/delete",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "deleteTask",
		query: {
			id: data.id
		}
	}, callback);
};
/** End deleteTask */



/** 
 * Created by receiveTask
 *
 * 领取一个任务
 *
 * @submitTask 	任务id-Body
 */
exports.receiveTask = function (data, callback) {
	servers.POST({
		url: "/api/order/receive_task",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "receiveTask",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End receiveTask */



/** 
 * Created by getQiniuToken
 *
 * 获取七牛云上传文件的Token
 *
 */
exports.getQiniuToken = function (data, callback) {
	servers.GET({
		url: "/api/upload/qn/get_token",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getQiniuToken"
	}, callback);
};
/** End getQiniuToken */



/** 
 * Created by removeAccount
 *
 * 删除某个账号
 *
 * @id 	用户id-
 */
exports.removeAccount = function (data, callback) {
	servers.DELETE({
		url: "/api/auth/remove_account",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "removeAccount",
		query: {
			id: data.id
		}
	}, callback);
};
/** End removeAccount */



/** 
 * Created by authLogout
 *
 * 注销用户
 *
 * @token 	undefined-String
 */
exports.authLogout = function (data, callback) {
	servers.GET({
		url: "/api/auth/logout",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "authLogout",
		query: {
		}
	}, callback);
};
/** End authLogout */



/** 
 * Created by helloWorld
 *
 * 查询某个任务下的报名详情 (Todo)
 *
 */
exports.helloWorld = function (data, callback) {
	servers.GET({
		url: "/api/task/receive_detail",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "helloWorld"
	}, callback);
};
/** End helloWorld */



/** 
 * Created by getOrderList
 *
 * 根据条件查询订单列表
 *
 */
exports.getOrderList = function (data, callback) {
	servers.GET({
		url: "/api/order/get/list",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getOrderList"
	}, callback);
};
/** End getOrderList */



/** 
 * Created by getMyOrders
 *
 * 查找我的所有订单
 *
 * @token 	undefined-
 */
exports.getMyOrders = function (data, callback) {
	servers.GET({
		url: "/api/order/get/my",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getMyOrders",
		query: {
		}
	}, callback);
};
/** End getMyOrders */



/** 
 * Created by loginByWeiXin
 *
 * 微信用户登录
 *
 * @Login 	undefined-Body
 */
exports.loginByWeiXin = function (data, callback) {
	servers.POST({
		url: "/api/auth/login/by_weixin",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "loginByWeiXin",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End loginByWeiXin */



/** 
 * Created by getTaskList
 *
 * 获取任务列表，默认返回10条
 *
 */
exports.getTaskList = function (data, callback) {
	servers.GET({
		url: "/api/task/list",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getTaskList"
	}, callback);
};
/** End getTaskList */



/** 
 * Created by getMyReleaseTask
 *
 * 获取我发布的所有任务
 *
 */
exports.getMyReleaseTask = function (data, callback) {
	servers.GET({
		url: "/api/user/my/release_task",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getMyReleaseTask"
	}, callback);
};
/** End getMyReleaseTask */



/** 
 * Created by signUpMobile
 *
 * 手机号码注册账号（非必要）
 *
 * @signUpMobile 	undefined-Body
 */
exports.signUpMobile = function (data, callback) {
	servers.POST({
		url: "/api/auth/sign_up_mobile",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "signUpMobile",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End signUpMobile */



/** 
 * Created by weixinPushMessage
 *
 * 推送模板消息 (Todo)
 *
 * @weixinPushMessage 	undefined-Body
 */
exports.weixinPushMessage = function (data, callback) {
	servers.POST({
		url: "/api/wx_service/push_message",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "weixinPushMessage",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End weixinPushMessage */



/** 
 * Created by weixinPushMessage2
 *
 * 生成一个微信支付订单 (暂不开发)
 *
 */
exports.weixinPushMessage2 = function (data, callback) {
	servers.POST({
		url: "/api/wx_service/create_wx_order",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "weixinPushMessage2"
	}, callback);
};
/** End weixinPushMessage2 */



/** 
 * Created by getTaskDetailById
 *
 * 获取任务详情
 *
 * @id 	undefined-
 */
exports.getTaskDetailById = function (data, callback) {
	servers.GET({
		url: "/api/task/detail/"+data.id,
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getTaskDetailById",
		query: {
		}
	}, callback);
};
/** End getTaskDetailById */



/** 
 * Created by submitOrder
 *
 * 提交（完成）一个任务
 *
 * @submitOrder 	undefined-Body
 */
exports.submitOrder = function (data, callback) {
	servers.POST({
		url: "/api/order/submit_order",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "submitOrder",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End submitOrder */



/** 
 * Created by getMyTask
 *
 * 获取我参加的所有任务 (Todo)
 *
 */
exports.getMyTask = function (data, callback) {
	servers.GET({
		url: "/api/user/get/my/task",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getMyTask"
	}, callback);
};
/** End getMyTask */



/** 
 * Created by helloWorld
 *
 * 忘记密码时更新密码（非必要） (Todo)
 *
 * @forgetPassword 	undefined-Body
 */
exports.helloWorld = function (data, callback) {
	servers.POST({
		url: "/api/auth/forget_password",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "helloWorld",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End helloWorld */



/** 
 * Created by updateTaskInspect
 *
 * 审核任务（管理员）
 *
 * @updateTaskInspect 	undefined-Body
 */
exports.updateTaskInspect = function (data, callback) {
	servers.POST({
		url: "/api/task/update/inspect",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "updateTaskInspect",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End updateTaskInspect */



/** 
 * Created by getUserInfo
 *
 * 获取用户详情信息
 *
 * @id 	undefined-
 * @weixin_openid 	undefined-
 */
exports.getUserInfo = function (data, callback) {
	servers.GET({
		url: "/api/user/detail",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getUserInfo",
		query: {
			id: data.id,
			weixin_openid: data.weixin_openid
		}
	}, callback);
};
/** End getUserInfo */



/** 
 * Created by getHomepageBanner
 *
 * 获取小程序首页banner (Todo)
 *
 */
exports.getHomepageBanner = function (data, callback) {
	servers.GET({
		url: "/api/web/homepage/get_banner",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getHomepageBanner"
	}, callback);
};
/** End getHomepageBanner */



/** 
 * Created by cancelOrder
 *
 * 取消某个订单 （Todo）
 *
 * @id 	订单id-
 */
exports.cancelOrder = function (data, callback) {
	servers.GET({
		url: "/api/order/cancel",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "cancelOrder",
		query: {
			id: data.id
		}
	}, callback);
};
/** End cancelOrder */



/** 
 * Created by updateUserInfo
 *
 * 更新用户信息 (Todo)
 *
 * @openid 	undefined-
 */
exports.updateUserInfo = function (data, callback) {
	servers.POST({
		url: "/api/user/update",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "updateUserInfo",
		query: {
		}
	}, callback);
};
/** End updateUserInfo */



/** 
 * Created by getOrderDetail
 *
 * 根据id查询一个订单的详情
 *
 * @id 	undefined-
 */
exports.getOrderDetail = function (data, callback) {
	servers.GET({
		url: "/api/order/get/detail",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getOrderDetail",
		query: {
			id: data.id
		}
	}, callback);
};
/** End getOrderDetail */



/** 
 * Created by getMyCollects
 *
 * 获取我收藏的任务 (Todo)
 *
 */
exports.getMyCollects = function (data, callback) {
	servers.GET({
		url: "/api/user/get_my_collects",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getMyCollects"
	}, callback);
};
/** End getMyCollects */



/** 
 * Created by signUpSystemUser
 *
 * 创建系统用户
 *
 * @signUpSystem 	undefined-Body
 */
exports.signUpSystemUser = function (data, callback) {
	servers.POST({
		url: "/api/auth/sign_up_system",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "signUpSystemUser",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End signUpSystemUser */



/** 
 * Created by getUserList
 *
 * 获取用户列表 for test
 *
 * @type 	undefined-
 */
exports.getUserList = function (data, callback) {
	servers.GET({
		url: "/api/user/list",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getUserList",
		query: {
			type: data.type
		}
	}, callback);
};
/** End getUserList */



/** 
 * Created by updateTaskEdit
 *
 * 修改任务（管理员）
 *
 * @updateTaskEdit 	undefined-Body
 */
exports.updateTaskEdit = function (data, callback) {
	servers.POST({
		url: "/api/task/update/edit",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "updateTaskEdit",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End updateTaskEdit */



/** 
 * Created by weixinPaymentToUser
 *
 * 向某个微信用户发红包 (Todo)
 *
 * @weixinPaymentToUser 	undefined-Body
 */
exports.weixinPaymentToUser = function (data, callback) {
	servers.POST({
		url: "/api/wx_service/payment_to_user",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "weixinPaymentToUser",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End weixinPaymentToUser */



/** 
 * Created by getTasksByUser
 *
 * 根据用户Id查询该用户创建的所有任务
 *
 * @id 	undefined-
 */
exports.getTasksByUser = function (data, callback) {
	servers.GET({
		url: "/api/task/get/by_user",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getTasksByUser",
		query: {
			id: data.id
		}
	}, callback);
};
/** End getTasksByUser */



/** 
 * Created by checkOrder
 *
 * 审核一个任务订单
 *
 * @checkOrder 	undefined-Body
 */
exports.checkOrder = function (data, callback) {
	servers.POST({
		url: "/api/order/check_order",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "checkOrder",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End checkOrder */



/** 
 * Created by weixinPaymentToUser2
 *
 * 客服自动回复 (待确定方案)
 *
 */
exports.weixinPaymentToUser2 = function (data, callback) {
	servers.POST({
		url: "/api/wx_service/reply_message",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "weixinPaymentToUser2"
	}, callback);
};
/** End weixinPaymentToUser2 */



/** 
 * Created by getOssDetail
 *
 * 查找某个订单任务的附件
 *
 * @id 	oss_id-
 */
exports.getOssDetail = function (data, callback) {
	servers.GET({
		url: "/api/order/get_oss/"+data.id,
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getOssDetail",
		query: {
		}
	}, callback);
};
/** End getOssDetail */



/** 
 * Created by createdHomepageBanner
 *
 * 添加小程序首页Banner (Todo)
 *
 */
exports.createdHomepageBanner = function (data, callback) {
	servers.POST({
		url: "/api/web/homepage/created_banner",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "createdHomepageBanner"
	}, callback);
};
/** End createdHomepageBanner */



/** 
 * Created by bindMobile
 *
 * 绑定手机号码 (Todo)
 *
 * @bindMobile 	undefined-Body
 */
exports.bindMobile = function (data, callback) {
	servers.POST({
		url: "/api/auth/bind_mobile",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "bindMobile",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End bindMobile */



/** 
 * Created by helloWorld2
 *
 * 根据订单id查询该订单对应的任务信息 (Todo)
 *
 */
exports.helloWorld2 = function (data, callback) {
	servers.GET({
		url: "/api/task/get_by_order",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "helloWorld2"
	}, callback);
};
/** End helloWorld2 */



/** 
 * Created by helloWorld
 *
 * 发送一条验证码短信（朱星卫）(Todo)
 *
 * @sendAuthCode 	undefined-Body
 */
exports.helloWorld = function (data, callback) {
	servers.POST({
		url: "/api/auth/send_auth_code",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "helloWorld",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End helloWorld */



/** 
 * Created by authLogin
 *
 * 通用登录
 *
 * @Login 	undefined-Body
 */
exports.authLogin = function (data, callback) {
	servers.POST({
		url: "/api/auth/login",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "authLogin",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End authLogin */



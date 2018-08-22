/**!
 * 优云任务 1.0 v1.0
 * 接口数量 44
 * http://uyun.net:3220/api/list?p_id=BJlrJJ@dSQ&v_id=ry@r1yZdSm&g_id=HkecbyW_S7
 *
 * 2018-08-21 11:56:26 (c) sxApi Foundation, Inc.
 *
 **/ 
var servers = require('../../servers');



/** 
 * Created by updateTaskVip
 *
 * 修改任务（商家/普通用户）  (Todo) Admin
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
 * Created by getTaskReceiveDetail
 *
 * 查询某个任务的报名情况 User
 *
 * @id 	undefined-
 */
exports.getTaskReceiveDetail = function (data, callback) {
	servers.GET({
		url: "/api/task/get/receive_detail",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getTaskReceiveDetail",
		query: {
			id: data.id
		}
	}, callback);
};
/** End getTaskReceiveDetail */



/** 
 * Created by removeAccount
 *
 * 删除某个账号 Admin
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
 * Created by getOrderDetail
 *
 * 根据id查询一个订单的详情 Admin & User
 *
 * @id 	undefined-
 * @full 	不传时返回基础数据 =1时返回所有关联数据-
 */
exports.getOrderDetail = function (data, callback) {
	servers.GET({
		url: "/api/order/get/detail",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getOrderDetail",
		query: {
			id: data.id,
			full: data.full
		}
	}, callback);
};
/** End getOrderDetail */



/** 
 * Created by wechatPaymentToUser
 *
 * 向某个微信用户发红包 (Todo) Admin内部
 *
 * @wechatPaymentToUser 	undefined-Body
 */
exports.wechatPaymentToUser = function (data, callback) {
	servers.POST({
		url: "/api/wechat/payment_to_user",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "wechatPaymentToUser",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End wechatPaymentToUser */



/** 
 * Created by wechatPushMessage2
 *
 * 生成一个微信支付订单 (暂不开发) Admin内部
 *
 */
exports.wechatPushMessage2 = function (data, callback) {
	servers.POST({
		url: "/api/wechat/create_wx_order",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "wechatPushMessage2"
	}, callback);
};
/** End wechatPushMessage2 */



/** 
 * Created by signUpSystemUser
 *
 * 创建系统用户 Admin
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
 * Created by getOrderList
 *
 * 根据条件查询订单列表 Admin
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
 * Created by submitOrder
 *
 * 提交订单（完成任务） User
 *
 * @submitOrder 	undefined-Body
 */
exports.submitOrder = function (data, callback) {
	servers.POST({
		url: "/api/order/submit",
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
 * Created by helloWorld
 *
 * 忘记密码时更新密码（非必要） (Todo) User
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
 * Created by getMyWater
 *
 * 获取我的财务流水信息
 *
 */
exports.getMyWater = function (data, callback) {
	servers.GET({
		url: "/api/user/get/my/water",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getMyWater"
	}, callback);
};
/** End getMyWater */



/** 
 * Created by getTaskDetail
 *
 * 获取任务详情 Admin & User
 *
 * @id 	undefined-
 */
exports.getTaskDetail = function (data, callback) {
	servers.GET({
		url: "/api/task/detail",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getTaskDetail",
		query: {
			id: data.id
		}
	}, callback);
};
/** End getTaskDetail */



/** 
 * Created by updateTaskInspect
 *
 * 审核任务（管理员） Admin
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
 * Created by wechatPaymentToUser2
 *
 * 客服自动回复 (待确定方案) Admin内部
 *
 */
exports.wechatPaymentToUser2 = function (data, callback) {
	servers.POST({
		url: "/api/wechat/reply_message",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "wechatPaymentToUser2"
	}, callback);
};
/** End wechatPaymentToUser2 */



/** 
 * Created by getMyOrder
 *
 * 查找我的所有订单 User
 *
 */
exports.getMyOrder = function (data, callback) {
	servers.GET({
		url: "/api/user/get/my/order",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getMyOrder"
	}, callback);
};
/** End getMyOrder */



/** 
 * Created by authLogin
 *
 * 通用登录 Admin
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



/** 
 * Created by updateTaskEdit
 *
 * 修改任务（管理员） Admin
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
 * Created by cancelOrder
 *
 * 取消某个订单 User
 *
 * @cancelOrder 	undefined-Body
 */
exports.cancelOrder = function (data, callback) {
	servers.POST({
		url: "/api/order/cancel",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "cancelOrder",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End cancelOrder */



/** 
 * Created by deleteOrder
 *
 * 删除订单 Admin & User
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
 * Created by signUpMobile
 *
 * 手机号码注册账号（非必要）User
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
 * Created by authLogout
 *
 * 注销用户 Admin & User
 *
 */
exports.authLogout = function (data, callback) {
	servers.GET({
		url: "/api/auth/logout",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "authLogout"
	}, callback);
};
/** End authLogout */



/** 
 * Created by getTaskReceiveUser
 *
 * 查询某个任务的报名订单详情 Admin & User
 *
 * @id 	undefined-
 * @type 	undefined-
 */
exports.getTaskReceiveUser = function (data, callback) {
	servers.GET({
		url: "/api/task/get/receive_user",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getTaskReceiveUser",
		query: {
			id: data.id,
			type: data.type
		}
	}, callback);
};
/** End getTaskReceiveUser */



/** 
 * Created by deleteTask
 *
 * 删除某个任务 Admin
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
 * Created by checkOrder
 *
 * 审核一个任务订单 Admin
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
 * Created by createTask
 *
 * 创建一个任务 Admin
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
 * Created by getOssDetail
 *
 * 查找某个订单任务的附件 Admin & User
 *
 * @id 	oss_id-
 */
exports.getOssDetail = function (data, callback) {
	servers.GET({
		url: "/api/order/get/oss",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getOssDetail",
		query: {
			id: data.id
		}
	}, callback);
};
/** End getOssDetail */



/** 
 * Created by wechatGetSessionKey
 *
 * 根据授权获取到的code，换取小程序的session key和openid（以及有条件下的unionid） User
 *
 * @code 	undefined-
 */
exports.wechatGetSessionKey = function (data, callback) {
	servers.POST({
		url: "/api/wechat/get_session_key",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "wechatGetSessionKey",
		query: {
			code: data.code
		}
	}, callback);
};
/** End wechatGetSessionKey */



/** 
 * Created by wechatPushMessage
 *
 * 推送模板消息 (Todo) Admin内部
 *
 * @wechatPushMessage 	undefined-Body
 */
exports.wechatPushMessage = function (data, callback) {
	servers.POST({
		url: "/api/wechat/push_message",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "wechatPushMessage",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End wechatPushMessage */



/** 
 * Created by sendAuthCode
 *
 * 发送一条验证码短信(Todo)
 *
 * @sendAuthCode 	undefined-Body
 */
exports.sendAuthCode = function (data, callback) {
	servers.POST({
		url: "/api/auth/send_auth_code",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "sendAuthCode",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End sendAuthCode */



/** 
 * Created by createOrder
 *
 * 创建订单（领取任务） User
 *
 * @createOrder 	undefined-Body
 */
exports.createOrder = function (data, callback) {
	servers.POST({
		url: "/api/order/create",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "createOrder",
		body: data.body,
		query: {
		}
	}, callback);
};
/** End createOrder */



/** 
 * Created by getTaskList
 *
 * 获取任务列表，默认返回10条 Admin && User
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
 * Created by getTasksByUser
 *
 * 根据用户Id查询该用户创建的所有任务 Admin
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
 * Created by getMyInfo
 *
 * 获取我的基本信息
 *
 */
exports.getMyInfo = function (data, callback) {
	servers.GET({
		url: "/api/user/get/my/info",
		token: !data.TOKEN?"":data.TOKEN,
		mock: !data.mock?false:data.mock,
		swaggerId: "getMyInfo"
	}, callback);
};
/** End getMyInfo */



/** 
 * Created by getMyReleaseTask
 *
 * 获取我发布的所有任务 (Todo)
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
 * Created by getQiniuToken
 *
 * 获取七牛云上传文件的Token User
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
 * Created by loginByWeiXin
 *
 * 微信用户登录 User
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
 * Created by bindMobile
 *
 * 绑定手机号码 (Todo) User
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



/**
 * 保存一些跨项目的常量配置
 *
 */

exports.failCode = {
	// node端错误 3100开头
	"3100": "未知错误。",
	"3101": "返回为空。",
	"3102": "返回的不是一个对象。",
	"3104": "账号信息异常。",
	
	// java端错误 3200开头或自定义
	"8500": "TOKEN NOT FOUND。",
	"8501": "TOKEN未知错误。",
	// TOKEN已过期 分两种情况：1是token过期，2是refreshToken过期
	"8502": "TOKEN已过期，请重新登录。",
	"8503": "TOKEN签名错误或包含非法字符。",
	"8504": "不支持的TOKEN格式。",
	"8505": "无效的TOKEN格式。",
	
	// vue权限错误 3000开头
	"3000": "未知错误",
	"3001": "未获取到Token，请登录！",
	"3002": "用户信息获取失败，请稍后再试！",
	"3003": "该角色无权限访问",
	"3004": "账号信息异常",

	// 其它
	"400": "请求错误",
	"500": "后台错误"
};

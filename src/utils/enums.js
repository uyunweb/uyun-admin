/***
 * 枚举
 * */

const enums = {
	// 任务状态
	taskStatus: [{
		value: 0,
		label: "待审核"
	}, {
		value: 1,
		label: "审核成功"
	}, {
		value: 2,
		label: "审核失败"
	}, {
		value: 3,
		label: "已下架"
	}, {
		value: 4,
		label: "已完成"
	}, {
		value: 5,
		label: "已结束"
	}],
	taskStatusFull: [{
		value: -1,
		label: "-全部任务-"
	}],

	// 任务分类
	taskType: [{
		value: 0,
		label: "普通任务"
	}, {
		value: 1,
		label: "微信任务"
	}, {
		value: 2,
		label: "下载任务"
	}],
	taskTypeFull: [{
		value: -1,
		label: "-所有分类-"
	}],

	// 任务审核方式
	taskSubmitType: [{
		value: 0,
		label: "管理员审核"
	}, {
		value: 1,
		label: "自己审核"
	}, {
		value: 2,
		label: "无须审核"
	}, {
		value: 3,
		label: "自动审核"
	}],
	taskSubmitTypeFull: [{
		value: -1,
		label: "-所有审核方式-"
	}],

	// 任务审核方式
	taskIsHotType: [{
		value: 0,
		label: "否"
	}, {
		value: 1,
		label: "精选任务"
	}],

	// 规定任务完成时间
	taskSubmitTime: [{
		value: 1800,
		label: "0.5 小时内"
	}, {
		value: 3600,
		label: "1 小时内"
	}, {
		value: 3600*2,
		label: "2 小时内"
	}, {
		value: 3600*5,
		label: "5 小时内"
	}, {
		value: 3600*12,
		label: "12 小时内"
	}, {
		value: 3600*24,
		label: "1 天内"
	}, {
		value: 3600*24*2,
		label: "2 天内"
	}, {
		value: 3600*24*3,
		label: "3 天内"
	}],

	// 任务引导类型
	taskStepListType: [{
		value: 0,
		label: "无附件"
	}, {
		value: 1,
		label: "图片"
	}, {
		value: 2,
		label: "二维码"
	}, {
		value: 3,
		label: "超链接"
	}],

	// 任务标签
	taskTags: [{
		value: "tags1",
		label: "tags1"
	}, {
		value: "tags2",
		label: "tags2"
	}, {
		value: "tags3",
		label: "tags3"
	}, {
		value: "tags4",
		label: "tags4"
	}],

	// 任务是否需要支付赏金
	taskIsPaymentType: [{
		value: 0,
		label: "未知"
	}, {
		value: 1,
		label: "无须支付"
	}, {
		value: 2,
		label: "等待支付"
	}, {
		value: 3,
		label: "支付成功"
	}, {
		value: 4,
		label: "已退款"
	}],
	taskIsPaymentTypeFull: [{
		value: -1,
		label: "-所有支付状态-"
	}],

	// 管理员用户类型
	adminUserType: [{
		value: 0,
		label: "普通用户"
	}, {
		value: 1,
		label: "超级管理员"
	}, {
		value: 2,
		label: "内容发布员"
	}, {
		value: 3,
		label: "内容审核员"
	}],

	// 订单类型
	orderType: [{
		value: 0,
		label: "无效订单"
	}, {
		value: 1,
		label: "进行中"
	}, {
		value: 2,
		label: "待审核"
	}, {
		value: 3,
		label: "已完成"
	}, {
		value: 4,
		label: "审核失败"
	}, {
		value: 5,
		label: "重新提交资料"
	}, {
		value: 6,
		label: "已失效"
	}, {
		value: 7,
		label: "已取消"
	}],
	orderTypeFull: [{
		value: -1,
		label: "-全部订单-"
	}],

	// 流水类型
	waterType: [{
		value: 0,
		label: "未成功"
	}, {
		value: 1,
		label: "收入"
	}, {
		value: 2,
		label: "支出"
	}, {
		value: 3,
		label: "付款"
	}],
	waterTypeFull: [{
		value: -1,
		label: "-全部流水-"
	}],

	// 流水类型
	waterCountType: [{
		value: 0,
		label: "未知"
	}, {
		value: 11,
		label: "任务奖励"
	}, {
		value: 12,
		label: "系统充值"
	}, {
		value: 13,
		label: "签到奖励"
	}, {
		value: 14,
		label: "活动中奖"
	}, {
		value: 21,
		label: "用户提现"
	}, {
		value: 22,
		label: "系统扣除"
	}, {
		value: 23,
		label: "兑换消费"
	}, {
		value: 31,
		label: "任务支出"
	}],
	waterCountTypeFull: [{
		value: -1,
		label: "-所有流水类型-"
	}],

	// 是否删除
	deletedType:[{
		value: -1,
		label: '-正常状态-'
	}, {
		value: 1,
		label: '已删除'
	}]
};

for(let key in enums){
	if(Array.isArray(enums[key]) && Array.isArray(enums[key+"Full"])){
		enums[key+"Full"] = [...enums[key+"Full"], ...enums[key]];
	}
}

export default enums;
/**
 * @author  yuanchaoxi<ycx@sxw.cn>
 * @date    2017/9/7
 * @description  vue.filter文件
 */



import Vue from 'vue';

//管道符
Vue.filter('percent', function (val) {
	let result = '';
	if (val === "/") {
		result = "/";
	} else {
		result = (Math.round(val * 10000) / 100 ||0)+ '%';
	}
	return result;
});
Vue.filter('toFixed', function (val,num) {
	if (typeof val === 'number') {
		if(typeof num === 'number'){
			return val.toFixed(num);
		}
		return val.toFixed(2);
	}
	return val;
});
Vue.filter('orderType', function (type) {
	if(type===0){
		return "无效订单";
	} else if(type===1){
		return "进行中";
	} else if(type===2){
		return "待审核";
	} else if(type===3){
		return "已完成";
	} else if(type===4){
		return "失败";
	} else if(type===5){
		return "重新提交资料";
	} else if(type===6){
		return "已失效";
	} else if(type===7){
		return "已取消";
	} else {
		return "未知订单";
	}
});
Vue.filter('time', function (val) {
	let hour=parseInt(val/3600);
	let minute=parseInt((val%3600)/60);
	let sec=(val%3600)%60
	return (hour>0?hour+'小时':'')+(hour>0||minute>0?minute+'分钟':'')+sec+'秒';
});
Vue.filter('matchingValue', function (val, arr) {
	// 匹配
	let back = null;
	for(let item of arr){
		if(item.value === val){
			back = item.label;
			break;
		}
	}
	return back;
});

Vue.filter('date', function (val,str) {
	//日期格式化
	let format=function(val,fmt){
		var o = {
			"M+": val.getMonth() + 1, //月份
			"d+": val.getDate(), //日
			"H+": val.getHours(), //小时
			"m+": val.getMinutes(), //分
			"s+": val.getSeconds(), //秒
			"q+": Math.floor((val.getMonth() + 3) / 3), //季度
			"S": val.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (val.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
	if(val&&val.indexOf('T')>-1){
		return format(new Date(val),str?str:"yyyy-MM-dd HH:mm:ss");
	}else{
		return val;
	}
});

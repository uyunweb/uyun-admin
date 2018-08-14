// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
if(typeof htmlStartTime !== "undefined") console.info("--> [VUE COMING] 共耗时 ", new Date() - htmlStartTime, Number(new Date()));import 'babel-polyfill';

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';

import App from './App.vue';
import router from '../../router';
import sxtStore from "../../store";

// 自适应Js
// import "../../utils/response";
// 全局filter
import "../../utils/vue.filter";

// 引入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入样式
import '../../static/css/default.styl';

// 引入config
import config from "../../config";
// 引入错误上报模块
// import Raven from 'raven-js';
// import RavenVue from 'raven-js/plugins/vue';

// 引入vconsole
setTimeout(()=>{
	if(config.vconsole){
		//require("vconsole");
	}
},0);


// 使用插件
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

// 引入api方法
import Api from '../../sxui/api';
Vue.prototype.$ajax = Api;

// 配置raven
// Raven.config(config.raven).addPlugin(RavenVue, Vue).install();
// window.onerror = document.onerror = function (e) {
//  Raven.captureException(e);
// };

// 初始化应用
new Vue({
	el: '#app',
	router,
	store:sxtStore,
	template: '<App/>',
	components: {App}
});

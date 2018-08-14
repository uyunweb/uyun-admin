/**
 * @author  yuanchaoxi<ycx@sxw.cn>
 * @date    2017/8/30
 * @description  index文件
 */


import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 初始化store
const sxtStore = new Vuex.Store({
	state: {
		// 用户信息，全局使用
		user: ""
	},

	mutations: {
		// 提交commit修改userInfo
		setUserInfo(state, userInfo){
			state.user = userInfo;
		},

		//面包屑
		breadListStateAdd(state,obj){
			if(typeof(obj)=="object") state.breadListState.push(obj);
			if(typeof(obj)=="string"){
				state.breadListState.push({name:obj,path:''});
			}
		},

		breadListStateRemove(state,num){
			state.breadListState=state.breadListState.slice(0,num);
		},

		breadListStateReset(state){
			let routeList = vm.$route.matched;
			let breadList = [];
			routeList.map(function (item, index, input) {
				let breadNumber = typeof(item.meta.breadNumber) != "undefined" ? item.meta.breadNumber : 0;
				breadList[breadNumber] = {name: item.name, path: item.path};
			});
			state.breadListState = breadList;
		},

		breadListStateModify(state,obj){
			if(typeof(obj)=="object") state.breadListState=obj;
		},

		controlNav(state,title) {
			if(title){
				state.isShowNav = false;
				state.title = title;
			}else{
				state.isShowNav = true;
			}
		}
	}
});


export default sxtStore;
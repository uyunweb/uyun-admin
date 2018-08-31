/**
 * Created by ThinkPad on 2017/12/8.
 */
import Auth from './index';
import config from "../../config";
import appStore from "../../store/index";
import Cookies from "js-cookie";

const Auths = {
	router(to, from, next) {

		let t = new Date();

		console.info("==> [1] router beforeEach 进入路由::", to, Number(new Date()));

		/***
		 * 第1步 进入路由，获取to.meta.userRoleCode
		 *
		 * */
		let toMeta = Auth.getToMeta(to);
		console.info("==> 获取Meta参数::", toMeta);

		// 销毁htmlLoading
		if(config.useHtmlLoading) Auth.removeHtmlLoading();

		if(toMeta.mustLogin){
			if (appStore.state.user && appStore.state.user.id) {
				console.log("--> 用户已登录：%s", appStore.state.user);
				next();
			} else {
				console.warn("--> 用户未登录，开始进入登录流程");

				// 获取cookie
				let token = Cookies.get(config.cookie.authKey);
				if(!token){
					console.warn("--> 未获取到token，请重新登录。");
					return Auth.failCode(3001, -5);
				} else {
					Auth.ajaxGetUserInfoByToken(token, function(error, userInfo){
						if(error || !userInfo || !userInfo.id){
							console.warn("--> ajaxGetUserInfoByToken fail");
							console.info(error);
							console.info(userInfo);
							return Auth.failCode(3002);
						} else {
							console.info("--> ajaxGetUserInfoByToken success");
							appStore.state.user = userInfo;
							next();
						}
					});
				}
			}
		} else {
			next();
		}
	}
};

export default Auths;
import Vue from 'vue';
import Router from 'vue-router';

// @共用 - 404
import NotFoundComponent from '../pages/404.vue';
// 空白路由
import EmptyRouter from '../pages/emptyRouter.vue';

// 路由入口
import PagesIndex from '../pages';

// 登录页面
import login from '../pages/login';

// 任务管理
import task_list from '../pages/edit/task/list';
import task_detail from '../pages/edit/task/detail';
import create_task from '../pages/edit/task/create';

// 订单管理
import order_list from '../pages/action/order/list';
import order_detail from '../pages/action/order/detail';
// 查看流水
import water_list from '../pages/action/water/list';
// 查看审核资料
import oss_list from '../pages/action/oss/list';

// 用户管理
import user_list from '../pages/user/account/list';
import user_detail from '../pages/user/account/detail';



//用户管理
import admin_list from '../pages/system/admin/list';
import create_admin from '../pages/system/admin/create';
import update_admin from '../pages/system/admin/update';


Vue.use(Router);


let router = new Router({
	mode: 'history',
	base: '/web/page',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {x: 0, y: 0};
		}
	},
	routes: [{
		path: '/login',
		component: login
	}, {
		// 路由首页
		path: '/',
		component: PagesIndex,
		meta: {
			mustLogin: true
		},
		children: [{
			path: '/edit',
			component: EmptyRouter,
			meta: {
				name: '内容管理',
				breadNumber: 0,
			},
			children: [{
				path: 'task',
				component: EmptyRouter,
				meta: {
					name: '任务管理',
					breadNumber: 1,
				},
				children: [{
					path: 'list',
					alias: '/',
					component: task_list,
					meta: {
						name: '任务列表',
						breadNumber: 1,
					}
				}, {
					path: 'detail',
					component: task_detail,
					meta: {
						name: '任务详情',
						breadNumber: 1,
					}
				}, {
					path: 'create',
					component: create_task,
					meta: {
						name: '创建任务',
						breadNumber: 1,
					}
				}]
			}, {
				path: 'homepage',
				component: task_list,
				meta: {
					name: '首页Banner',
					breadNumber: 1,
				}
			}],
		}, {
			path: '/action',
			component: EmptyRouter,
			meta: {
				name: '运营管理',
				breadNumber: 0,
			},
			children: [{
				path: 'order',
				component: EmptyRouter,
				meta: {
					name: '订单管理',
					breadNumber: 1,
				},
				children: [{
					path: 'list',
					alias: '/',
					component: order_list,
					meta: {
						name: '订单列表',
						breadNumber: 1,
					}
				}, {
					path: 'detail',
					component: order_detail,
					meta: {
						name: '订单详情',
						breadNumber: 1,
					}
				}]
			}, {
				path: 'water',
				component: EmptyRouter,
				meta: {
					name: '提现列表',
					breadNumber: 1,
				},
				children: [{
					path: 'list',
					alias: '/',
					component: water_list,
					meta: {
						name: '流水列表',
						breadNumber: 1,
					}
				}]
			}, {
				path: 'oss',
				component: EmptyRouter,
				meta: {
					name: '资料管理',
					breadNumber: 1,
				},
				children: [{
					path: 'list',
					alias: '/',
					component: oss_list,
					meta: {
						name: '提交资料列表',
						breadNumber: 1,
					}
				}]
			}]
		}, {
			path: '/user',
			component: EmptyRouter,
			meta: {
				name: '用户管理',
				breadNumber: 0,
			},
			children: [{
				path: 'account',
				component: EmptyRouter,
				meta: {
					name: '注册用户',
					breadNumber: 1,
				},
				children: [{
					path: 'list',
					alias: '/',
					component: user_list,
					meta: {
						name: '用户列表',
						breadNumber: 1,
					}
				}, {
					path: 'detail',
					component: user_detail,
					meta: {
						name: '用户详情',
						breadNumber: 1,
					}
				}]
			}]
		}, {
			path: '/system',
			component: EmptyRouter,
			meta: {
				name: '系统管理',
				breadNumber: 0,
			},
			children: [{
				path: 'admin',
				component: EmptyRouter,
				meta: {
					name: '管理员设置',
					breadNumber: 1,
				},
				children: [{
					path: 'list',
					alias: '/',
					component: admin_list,
					meta: {
						name: '管理员列表',
						breadNumber: 1,
					}
				}, {
					path: 'create',
					component: create_admin,
					meta: {
						name: '添加管理员',
						breadNumber: 1,
					}
				}, {
					path: 'update',
					component: update_admin,
					meta: {
						name: '编辑管理员',
						breadNumber: 1,
					}
				}]
			}]
		}]
	}, {
		path: '*',
		component: NotFoundComponent
	}]
});


/**
 * router认证
 */
import sxwAuth from '../sxui/auth/uyun';

router.beforeEach((to, from, next) => {
	sxwAuth.router(to, from, next);
});

router.afterEach((to, from) => {
});

export default router;

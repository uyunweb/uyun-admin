<template>
	<nav class="aside-nav">
		<router-link class="logo" to="/">
			<img src="../static/images/logo.png" alt="生学教育智慧云平台" width="120">
		</router-link>
		<div class="aside-content">
			<div class="user" v-if="user">
				<div class="user-info">
					<div class="avatar">
						<img src="../static/images/avatar.svg" alt="头像" width="48" height="48">
					</div>
					<div class="role">欢迎您， {{user.real_name}}</div>
				</div>
				<div class="links l-table">
					<div class="l-cell">
						<router-link
							title="个人中心"
							to="/profile_center"
							class="link"
							:class="{'active': currentPage === '/profile_center'}">
							<i class="icons icons-user"></i>
						</router-link>
					</div>
					<div class="l-cell">
						<span class="separation">|</span>
					</div>
					<div class="l-cell">
						<router-link
							title="账号管理"
							to="/account_management"
							class="link"
							:class="{'active': currentPage === '/account_management'}">
							<i class="icons icons-setting"></i>
						</router-link>
					</div>
					<div class="l-cell">
						<span class="separation">|</span>
					</div>
					<div class="l-cell">
						<a href="#"
							title="退出登录"
							class="link"
							@click="signOut">
							<i class="icons icons-logout" ></i>
						</a>
					</div>
				</div>
			</div>
			<el-menu
				class="menu"
				:default-active="currentPage"
				router
				unique-opened>
				<template>
					<el-submenu
						index="edit"
						class="with-sub-menu">
						<template slot="title">
							<a class="menu-item">
								<i class="icons icons-column"></i>
								<span>内容管理</span>
							</a>
						</template>
						<el-menu-item index="/edit/task" class="sub-menu-item">任务列表</el-menu-item>
						<el-menu-item index="/edit/homepage" class="sub-menu-item">首页Banner</el-menu-item>
					</el-submenu>
					<el-submenu
						index="action"
						class="with-sub-menu">
						<template slot="title">
							<a class="menu-item">
								<i class="icons icons-column"></i>
								<span>运营管理</span>
							</a>
						</template>
						<el-menu-item index="/action/order" class="sub-menu-item">报名管理</el-menu-item>
						<el-menu-item index="/action/water" class="sub-menu-item">提现管理</el-menu-item>
					</el-submenu>
					<el-submenu
						index="propertys"
						class="with-sub-menu">
						<template slot="title" class="menu-item">
							<a class="menu-item">
								<i class="icons icons-money"></i>
								<span>用户管理</span>
							</a>
						</template>
						<el-menu-item index="/property/appaccess" class="sub-menu-item">注册用户</el-menu-item>
					</el-submenu>
					<el-submenu
						index="system"
						class="with-sub-menu">
						<template slot="title" class="menu-item">
							<a class="menu-item">
								<i class="icons icons-money"></i>
								<span>系统管理</span>
							</a>
						</template>
						<el-menu-item index="/system/admin" class="sub-menu-item">系统管理员</el-menu-item>
						<el-menu-item index="/property/appaccess" class="sub-menu-item">修改密码</el-menu-item>
					</el-submenu>
				</template>
			</el-menu>
		</div>
	</nav>
</template>

<script>
	import Auth from '../sxui/auth';
	import Utils from '../utils/utils';
	import { mapState } from 'vuex';
	export default {
		name: 'asideNavs',

		data() {
			return {
				currentPage: '/',
			};
		},

		computed: {
			...mapState({
				user: state => state.user
			}),

			isFinanceOnly() {
				return (this.userType === 'admin5' || this.userType === 'admin6');
			},
		},

		created() {
			this.currentRouterChange();
		},

		watch: {
			'$route': 'currentRouterChange',
		},

		methods: {
			currentRouterChange() {
				let routePath = this.$route.path;
				console.info('路由发生变化 -> ' + routePath);
				if (this.$route.path === '/') {
					console.info("=== /");
					this.$router.push({ path: '/edit/task' });
				} else {
					let current = routePath.split('/');
					console.info(current);
					if (current[2]) {
						this.currentPage = '/' + current[1] +  '/' + current[2];
						// this.currentPage = routePath;
					} else {
						this.currentPage = routePath;
					}
					console.info(this.currentPage);
				}
			},

			signOut() {
				// 退出登录
				Auth.logout();
				//clear LocalStorage
				Utils.clearLocalStorage();
			}
		}
	};
</script>

<style lang="stylus" scoped>
</style>
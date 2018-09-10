<template>
	<div class="login_box">
		<h2>uyun-admin-login</h2>
		<div v-if="isLogin" class="form_loading">
			给力登录中 ...
		</div>
		<div v-else class="form_box">
			<div class="_item">
				<span class="el_icon"><i class="el-icon-message"></i></span>
				<input type="text" v-model="form.account" placeholder="用户名">
			</div>
			<div class="_item">
				<span class="el_icon"><i class="el-icon-view"></i></span>
				<input type="password" v-model="form.password" placeholder="密码">
			</div>
			<div class="_btn">
				<a href="javascript:void(0)" @click="onLogin">登录</a>
			</div>
		</div>
	</div>
</template>
<script>
import Cookies from "js-cookie";
import md5 from 'js-md5';
import config from "../config";

export default {
	data() {
		return {
			isLogin: true,
			form: {
				account: "account",
				password: ""
			}
		};
	},
	created() {
		if(this.$route.query.logout){
			// 强制退出登录
			console.log("--> 强制退出登录：%s", this.$route.query.logout);
			Cookies.remove(config.cookie.authKey);
		} else if(Cookies.get(config.cookie.authKey)){
			// 已登录用户
			console.log("--> 已登录用户：%s", Cookies.get(config.cookie.authKey));
			this.$router.push("/edit/task/list");
		}
		this.isLogin = false;
	},
	methods: {
		onLogin() {
			// 通用登录
			this.$ajax.gateway("/apis/authLogin", {
				body: {
					account: this.form.account,
					password: md5(this.form.password),
					account_type: 2
				}
			}, (data) => {
				if(data.code===200){
					data = data.data;
					Cookies.set(config.cookie.authKey,  data.token, { domain: config.cookie.domain });
					this.$router.push("/edit/task/list");
				} else {
					console.warn(data);
					this.$message.error(data.message || '登录失败');
				}
			});
		}
	}
};
</script>
<style lang="stylus" scoped>
.login_box {
	width: 400px;
	height: 300px;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -150px;
	margin-left: -200px;
	background: #fff;
	border-radius: 12px;
	box-shadow 0 0 12px #eee;
	h2 {
		text-align: center;
		padding 20px 0 10px;
		line-height 40px;
		font-weight 100;
		font-size 26px;
		color #999;
	}
	.form_loading {
		padding 90px 0;
		text-align center;
		color #ccc;
		font-size 13px;
		font-weight 100;
	}
	.form_box {
		padding 0 60px;
		._item {
			line-height 30px;
			padding 15px 30px;
			height 30px;
			border-bottom 1px solid #eee;
			font-size 30px;
			.el_icon {
				color #aaa
				font-size 16px
				margin-right 30px
				position relative
				top 3px
			}
		}
		._btn {
			padding-top 30px;
			a {
				display block
				width 100%
				line-height 50px;
				text-align center
				color #fff
				background #00a0e9
			}
		}
	}
}
</style>

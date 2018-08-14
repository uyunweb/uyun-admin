<template>
	<div class="my_404">
		<template v-if="loading">
			<!--后面补充动画效果-->
		</template>
		<template v-else>
			<!--后面补充404效果-->
			<p>404</p>
		</template>
	</div>
</template>
<script>
export default {
	data() {
		return {
			loading: true
		};
	},
	created() {
		if(this.$route.path==="/web/"){
			// 首页 page
			console.info("--> 404 未找到/web/路由，强制跳到根目录:: /");
			this.$router.push({path: '/'});
		} else {
			this.loading = false;
		}
	}
};
</script>
<style>
	.my_404 {
		position: fixed;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 100;
		top: 0;
		left: 0;
	}
	.my_404 p {
		line-height: 60px;
		width: 100%;
		text-align: center;
		position: absolute;
		top: 50%;
		left: 0;
		margin-top: -30px;
	}
</style>

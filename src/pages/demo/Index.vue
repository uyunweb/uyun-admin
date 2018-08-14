<template>
	<div>
		<div class="tab-page">
			<a href="#" class="tab-label is-active">区域访问统计</a>
			<a href="#" class="tab-label">应用开通统计</a>
		</div>
		<tab />
		<tab class="tab-panel" />
		<div class="panel panel-small">
			<div class="panel-header">
				<div class="operations">
					<a href="#" class="operation">
						<i class="icons icons-import"></i>
						<span>导入</span>
					</a>
					<a href="#" class="operation">
						<i class="icons icons-export"></i>
						<span>导出</span>
					</a>
				</div>
				<h2 class="panel-title">icons in a less space panel</h2>
			</div>
			<div class="panel-content">
				<i class="icons icons-add"></i>
				<i class="icons icons-admin"></i>
				<i class="icons icons-allow"></i>
				<i class="icons icons-not-allow"></i>
				<i class="icons icons-calendar"></i>
				<i class="icons icons-chart"></i>
				<i class="icons icons-close"></i>
				<i class="icons icons-column"></i>
				<i class="icons icons-content"></i>
				<i class="icons icons-delete"></i>
				<i class="icons icons-edit"></i>
				<i class="icons icons-export"></i>
				<i class="icons icons-forbid"></i>
				<i class="icons icons-import"></i>
				<i class="icons icons-logout"></i>
				<i class="icons icons-money"></i>
				<i class="icons icons-pay"></i>
				<i class="icons icons-plus"></i>
				<i class="icons icons-off"></i>
				<i class="icons icons-search"></i>
				<i class="icons icons-setting"></i>
				<i class="icons icons-system"></i>
				<i class="icons icons-user"></i>
				<i class="icons icons-spread"></i>
				<i class="icons icons-fold"></i>
				<i class="icons icons-export-single"></i>
				<i class="icons icons-import-single"></i>
				<i class="icons icons-refresh"></i>
				<i class="icons icons-setting-only"></i>
				<i class="icons icons-histogram"></i>
				<i class="icons icons-comment"></i>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">文件上传插件</h2>
			</div>
			<div class="panel-content">
				<router-link to="/upload">upload-demo</router-link>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">echarts 图表组件</h2>
			</div>
			<div class="panel-content">
				<router-link to="/echarts">echarts-demo</router-link>
			</div>
		</div>
	</div>


</template>

<script>
	import Tab from './tab';

	export default {
		name: 'IndexTest',
		data() {
			return {};
		},
		components: {
			Tab,
		},

		created() {
		},

		methods: {}
	};
</script>

<style lang="stylus" scoped>
	.tab
		margin-bottom 20px
	.icons
		display inline-block
		margin 0 20px 10px 0
		font-size 20px !important
</style>
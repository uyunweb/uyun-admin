<template>
	<nav class="aside-nav">
		<router-link class="logo" to="/">
			<img src="../../sxui/static/img/logo.png" alt="SXUI" width="120" height="38">
		</router-link>
		<div class="aside-content">
			<el-menu
				class="menu"
				:default-active="currentPage"
				router
				unique-opened>
				<!--自定义的测试页面-->
				<el-menu-item index="/" class="menu-item">
					<i class="icons icons-star"></i>
					<span>guide</span>
				</el-menu-item>
				<el-menu-item index="/layout" class="menu-item">
					<i class="icons icons-star"></i>
					<span>基本布局</span>
				</el-menu-item>
				<el-submenu index="2" class="with-sub-menu">
					<template slot="title" class="menu-item">
						<a class="menu-item">
							<i class="icons icons-star"></i>
							<span>element组件</span>
						</a>
					</template>
					<el-menu-item index="/buttons" class="sub-menu-item">按钮</el-menu-item>
					<el-menu-item index="/dialog" class="sub-menu-item">Dialog</el-menu-item>
					<el-menu-item index="/table" class="sub-menu-item">表格</el-menu-item>
					<el-menu-item index="/form" class="sub-menu-item">表单元素</el-menu-item>
				</el-submenu>
				<el-submenu index="3" class="with-sub-menu">
					<template slot="title" class="menu-item">
						<a class="menu-item">
							<i class="icons icons-star"></i>
							<span>自定义组件</span>
						</a>
					</template>
					<el-menu-item index="/selector" class="sub-menu-item">地区选择</el-menu-item>
					<el-menu-item index="/cascader" class="sub-menu-item">级联选择器</el-menu-item>
					<el-menu-item index="/breadcrumb" class="sub-menu-item">面包屑</el-menu-item>
					<el-menu-item index="/tree" class="sub-menu-item">树形结构</el-menu-item>
					<el-menu-item index="/topicCard" class="sub-menu-item">话题标签</el-menu-item>
				</el-submenu>
				<!--调用sxui公共组件库-->
				<sxui-components-nav></sxui-components-nav>
			</el-menu>
		</div>
	</nav>
</template>

<script>
	import SxuiComponentsNav from "../../sxui/commondemo/componentsNav.vue";
	
	export default {
		name: 'nav',
		components: { SxuiComponentsNav },
		data() {
			return {
				currentPage: '/'
			};
		},
		computed: {
		},
		created() {
			this.currentRouterChange();
		},
		watch: {
			'$route': 'currentRouterChange'
		},
		methods: {
			currentRouterChange() {
				this.currentPage = this.$route.path;
			},
		}
	};
</script>

<style lang="stylus" scoped>
</style>
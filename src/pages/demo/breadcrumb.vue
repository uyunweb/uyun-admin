<template>
	<div class="panel">
		<div class="panel-header">
			<h2 class="panel-title">面包屑</h2>
		</div>
		<div class="panel-content">
			<breadcrumb></breadcrumb>
			<div style="padding: 20px 0;">
				<h5>调用方法：</h5>
				<ul style="padding-left: 65px;">
					<li>* import Breadcrumb from '../../components/Breadcrumb.vue';</li>
					<li>* < breadcrumb></ breadcrumb></li>
				</ul>
			</div>
			<div style="padding: 40px 0;">
				* 请同时修改router中</br>
					routes: [{</br>
						path: '/',</br>
						component: DemoIndex,</br>
						meta:{name: '首页',breadNumber:0} // 重要：为页面层级。即面包屑的index</br>
					}</br>
			</div>
			<div style="padding: 40px 0;">
				* 如果要更改面包屑，使用：</br>
				*this.$store.commit('breadListStateAdd', obj ) </br>
				if(typeof(obj)=="object") state.breadListState.push(obj);</br>
				if(typeof(obj)=="string") state.breadListState.push({name:obj,path:''});</br>
				*this.$store.commit('breadListStateReset') 重置为默认</br>
				*this.$store.commit('breadListStateModify',obj) 直接替换整个面包屑</br>
				*this.$store.state.breadListState 获取面包屑</br>
				obj的一般格式为{name:'',path:''}
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../../components/Breadcrumb.vue';

	export default{
		props: [],
		components: {Breadcrumb},
		data(){
			return {};
		},
		created() {
		},
		mounted() {
		},
		watch: {},
		methods: {}
	};
</script>
<style>
</style>
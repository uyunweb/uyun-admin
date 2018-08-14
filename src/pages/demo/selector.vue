<template>
	<div class="panel">
		<div class="panel-header">
			<h2 class="panel-title">地区选择组件</h2>
		</div>
		<div class="panel-content">
			<div style="padding: 40px 0;">
				<div>
					<region-selector :screens="'省市区身份'"></region-selector>
				</div>
				<div style="padding: 20px 0;">
					<h5>描述：</h5>
					<ul style="padding-left: 65px;">
						<li>此组件着重于地区间的关联关系</li>
						<li>* 参数可能：regionId:'',
							provinceId:'',
							cityId:'',
							countyId:'',
							schoolId:'',
							phaseId:'',
							gradeId:'',
							classId:'',
							type:'',（身份）</li>
					</ul>
				</div>
				<div style="padding: 20px 0;">
					<h5>调用方法：</h5>
					<ul style="padding-left: 65px;">
						<li>* import RegionSelector from '../../components/regionSelector';</li>
						<li>* < region-selector :screens="'省市区身份'"  v-model="regionFactor" @reload=""></ region-selector ></li>
					</ul>
				</div>
				<ul style="padding: 10px 0;">
					<li>* 上例中screens为外部参数控制显示的维度。类型为String。将要显示的维度直接写入即可，总共包括：省市区校段级班身份</li>
					<li>* 所有参数将会在regionFactor中传回，例如regionId直接取regionFactor.regionId，需要在外部定义参数regionFactor:{},</li>
					<li>* @reload=""为参数变化时的回调方法</li>
					<li>* 样式须要在外部自定义,整个组件包含在div class="regionSelector"里</li>
					<li>* 组件内部暂无接口调用！目前功能无法实现</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import RegionSelector from '../../components/regionSelector.vue';

	export default{
		components: {RegionSelector},
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
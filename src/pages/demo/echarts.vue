<template>
	
	<div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">echarts 图表组件</h2>
			</div>
			<div class="panel-content">
				<div style="padding: 20px 0;">
					<h5>调用方法：</h5>
					<ul style="padding-left: 65px;">
						<li>* import Echart from '../../components/echarts/Chart';</li>
						<li>* < echart :options="echartOptions"></ echart ></li>
					</ul>
				</div>
				<div style="padding: 20px 0;">
					<h5>参数说明：</h5>
					<ul style="padding-left: 65px;">
						<li>* type: "bar", // bar柱状图 line折线图 radar雷达图</li>
						<li>* width: "auto", // 图表宽度，默认100%</li>
						<li>* height: 500, // 图表高度，默认500px</li>
						<li>* legend_show: false, // 是否显示图例组件，默认不显示</li>
						<li>* legend_top: "", // legend距top的距离</li>
						<li>* legend_right: 50, // legend距right的距离</li>
						<li>* legend_hidden: [], // 不显示图例组件的seriesData.name(legend_show为true时有效，默认空)</li>
						<li>* dataZoom: [], // dataZoom(x轴滚动条缩放)</li>
						<li>* dataZoom_show: false, // 是否zoom横向缩放，默认不显示</li>
						<li>* dataZoom_lock: false, // 是否锁定滚动区域，默认不锁定</li>
						<li>* itemStyle_show: true, </li>
						<li>* barMaxWidth: "80px", // 柱状图的宽度</li>
						<li>* itemStyle_min: 0,</li>
						<li>* xRotate: 0, // x轴文字的旋转度数</li>
						<li>* xAxisData: [],</li>
						<li>* seriesData: [],</li>
						<li>* options: {}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">柱状图 示例</h2>
			</div>
			<div class="panel-content">
				<div style="padding: 20px 0;">
					<echart :options="echartOptions"></echart>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">折线图 示例</h2>
			</div>
			<div class="panel-content">
				<div style="padding: 20px 0;">
					<echart :options="echartOptions2"></echart>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">雷达图 示例</h2>
			</div>
			<div class="panel-content">
				<div style="padding: 20px 0;">
					<echart :options="echartOptions3"></echart>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">progress示例</h2>
			</div>
			<div class="panel-content">
				<div style="padding: 20px 0;">
					<progres :value="25" :values="100" title="考试次数统计" color="#5444a0" link="/demo/upload"></progres>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import Echart from '../../sxui/components/echarts/';
	import Progres from '../../sxui/components/echarts/progress';
	
	export default {
		data() {
			return {
				echartOptions: {},
				echartOptions2: {},
				echartOptions3: {}
			};
		},
		components: {
			Echart, Progres
		},
		watch: {
		},
		created() {
			this.echartOptions = {
				height: 500,
				dataZoom_show: true,
				legend_show: true,
				xRotate: 30,
				barMaxWidth: "40px",
				options: {
					yAxis: [{
						"type": "value",
						"name": "人数"
					}],
					grid: {
						"top": 100,
						"left": 60,
						"right": 50,
						"bottom": 140
					},
					tooltip: {
						"show": true
					}
				},
				xAxisData: ["三台中学", "丰谷中学", "绵阳中学", "盐亭中学"],
				seriesData: [{
					"name": "A",
					"type": "bar",
					"data": [1942, 212, 2394, 1352]
				}, {
					"name": "B",
					"type": "bar",
					"data": [2368, 260, 2914, 1644]
				}, {
					"name": "C",
					"type": "bar",
					"data": [2390, 263, 2941, 1659]
				}, {
					"name": "D",
					"type": "bar",
					"data": [2390, 263, 2941, 1659]
				}]
			};
			
			this.echartOptions2 = {
				"height": 500,
				"xRotate": 30,
				"dataZoom_show": true,
				"legend_show": true,
				"xAxisData": [
					"0620高2015级不分科考试-比例设置",
					"0706一个学科的市级考试",
					"高2015级考试"
				],
				"seriesData": [
					{
						"name": "全市排名",
						"type": "line",
						"areaStyle": {
							"normal": {
								"shadowColor": "rgba(0, 0, 0, 0.5)",
								"shadowBlur": 20,
								"opacity": 0
							}
						},
						"itemStyle": {
							"normal": {
								"borderWidth": 6
							}
						},
						"data": [
							13,
							2156,
							183
						]
					},
					{
						"name": "区县排名",
						"type": "line",
						"areaStyle": {
							"normal": {
								"shadowColor": "rgba(0, 0, 0, 0.5)",
								"shadowBlur": 20,
								"opacity": 0
							}
						},
						"itemStyle": {
							"normal": {
								"borderWidth": 6
							}
						},
						"data": [
							6,
							855,
							78
						]
					},
					{
						"name": "全校排名",
						"type": "line",
						"areaStyle": {
							"normal": {
								"shadowColor": "rgba(0, 0, 0, 0.5)",
								"shadowBlur": 20,
								"opacity": 0
							}
						},
						"itemStyle": {
							"normal": {
								"borderWidth": 6
							}
						},
						"data": [
							6,
							855,
							78
						]
					},
					{
						"name": "全班排名",
						"type": "line",
						"areaStyle": {
							"normal": {
								"shadowColor": "rgba(0, 0, 0, 0.5)",
								"shadowBlur": 20,
								"opacity": 0
							}
						},
						"itemStyle": {
							"normal": {
								"borderWidth": 6
							}
						},
						"data": [
							1,
							29,
							1
						]
					}
				],
				"grid": {
					"bottom": 150
				},
				"options": {
					"yAxis": [
						{
							"type": "value",
							"inverse": true,
							"name": "排名"
						}
					]
				},
				"loadingChart": false
			};
			
			this.echartOptions3 = {
				"height": 400,
				"options": {
					"radar": {
						"indicator": [
							{
								"name": "总分",
								"max": 1
							},
							{
								"name": "语文",
								"max": 1
							},
							{
								"name": "数学",
								"max": 1
							},
							{
								"name": "英语",
								"max": 1
							},
							{
								"name": "物理",
								"max": 1
							},
							{
								"name": "化学",
								"max": 1
							},
							{
								"name": "生物",
								"max": 1
							},
							{
								"name": "政治",
								"max": 1
							},
							{
								"name": "历史",
								"max": 1
							},
							{
								"name": "地理",
								"max": 1
							}
						]
					},
					"series": [
						{
							"name": "学科对比",
							"type": "radar",
							"data": [
								{
									"value": [
										0.9977,
										0.6503,
										0.7671,
										0.9813,
										0.7198,
										0.9345,
										0.504,
										0.8917,
										0.8764,
										0.3543
									],
									"name": "翟尔雪(高2015级46班)",
									"areaStyle": {
										"normal": {
											"opacity": 0.3
										}
									}
								}
							],
							"tooltip": {}
						}
					]
				},
				"loadingChart": false
			};
		},
		methods: {
		}
	};
</script>

<style lang="stylus" scoped>
</style>
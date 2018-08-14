<template>
	<div class="sxui_demo">
		<h2>级联选择器</h2>
		<hr class="line">
		<div>选择完第一个之后才能选择下一个</div>
		<cascader :selectors="selectors"></cascader>
		<hr>
		<h3>html代码片段</h3>
		<div>
			<highlight-code lang="javascript">
				&lt;cascader :selectors="selectors">&lt;/cascader>
				//入参格式：
				selectors:[{
					value:'',
					placeholder:'',
					options:[{
						value:'',
						label:'',
					}]
				}]
			</highlight-code>
		</div>
		<h3>列表说明</h3>
		<ul>
			<li>* 原则：选择完第一个之后才能选择下一个</li>
			<li>* 因为数据一次性传入，并没有加入loading</li>
		</ul>
	</div>
</template>

<script>
	import Cascader from '../../components/cascader.vue';
	export default{
		props: [],
		components: {Cascader},
		data(){
			return {
				selectors:[{
					value:'',
					placeholder:'省',
					options:[{
						value:'001',
						label:'四川',
					}]
				},{
					value:'',
					placeholder:'市',
					options:[{
						value:'002311',
						label:'成都',
					}]
				},{
					value:'',
					placeholder:'区',
					options:[{
						value:'1234',
						label:'高新区',
					}]
				}]
			};
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
<!--
	@author  yuanlong<yl@sxw.cn>
	@date    2017/9/27
	@description  element form组件的二次开发
-->

<template>
	<div>
		<el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>

		<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
			<el-table :data="gridData">
				<el-table-column property="date" label="日期" width="150"></el-table-column>
				<el-table-column property="name" label="姓名" width="200"></el-table-column>
				<el-table-column property="address" label="地址"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogTableVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<describe></describe>
	</div>
</template>

<script>

	import Describe from './describe.vue';

	export default {
		name: 'Dialog',
		data() {
			return {
				gridData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				dialogTableVisible: false
			};
		},
		components: {
			Describe
		},

		created() {
		},

		methods: {}
	};
</script>

<style lang="stylus" scoped>
</style>
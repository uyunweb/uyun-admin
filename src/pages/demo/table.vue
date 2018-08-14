<!--
	@author  yuanlong<yl@sxw.cn>
	@date    2017/9/27
	@description  element form组件的二次开发
-->

<template>
	<div class="panel">
		<div class="panel-header">
			<h2 class="panel-title">{{reserver(name)}}</h2>
		</div>
		<div class="panel-content">
			<el-table
				:data="tableData"
				height="200"
				border>
				<el-table-column
					fixed
					prop="date"
					width="150"
					label="日期">
				</el-table-column>
				<el-table-column
					prop="name"
					label="姓名">
				</el-table-column>
				<el-table-column
					prop="province"
					label="省份">
				</el-table-column>
				<el-table-column
					prop="city"
					label="市区">
				</el-table-column>
				<el-table-column
					prop="address"
					label="地址"
					width="300">
				</el-table-column>
				<el-table-column
					prop="address"
					label="地址"
					width="300">
				</el-table-column>
				<el-table-column
					prop="address"
					label="地址"
					width="300">
				</el-table-column>
				<el-table-column
					prop="zip"
					width="100"
					label="邮编">
				</el-table-column>
			</el-table>
			<div class="block">
				<span class="demonstration">完整功能</span>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
				</el-pagination>
			</div>
			<describe></describe>
		</div>
	</div>
</template>

<script>

	import Describe from './describe.vue';

	export default {
		name: 'TableDemo',
		data() {
			return {
				name: 'table',
				tableData: [{
					date: '2016-05-03',
					name: '王小虎1',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-02',
					name: '王小虎2',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-08',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-06',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-07',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}],
				currentPage: 2
			};
		},
		components: {
			Describe
		},

		created() {
			//this.tableData = [];
		},

		methods: {
			reserver(name) {
				console.log(1);
				return name + '1';
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		}
	};
</script>

<style lang="stylus" scoped>
	h2{
		font-size :0.3rem;
	}
</style>
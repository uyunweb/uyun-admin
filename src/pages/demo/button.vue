<!--
	@author  yuanlong<yl@sxw.cn>
	@date    2017/9/27
	@description  element form组件的二次开发
-->

<template>
	<div class="panel">
		<div class="panel-header">
			<h2 class="panel-title">ButtonDemo</h2>
		</div>
		<div class="panel-content">
			
			<div style="margin: 20px 0">
				<el-button type="primary" size="large" @click="delPeriod">大型按钮</el-button>
				<el-button type="primary">正常按钮</el-button>
				<el-button type="primary" size="small">小型按钮</el-button>
				<el-button type="primary" :disabled="true" @click="clickme">禁用正常按钮</el-button>
				<el-button size="small">取消</el-button>
			</div>
	
			<div>
				<el-button>默认按钮</el-button>
				<el-button type="primary">主要按钮</el-button>
				<el-button type="success">成功按钮</el-button>
				<el-button type="info">信息按钮</el-button>
				<el-button type="warning">警告按钮</el-button>
				<el-button type="danger">危险按钮</el-button>
			</div>
			
			<div style="margin: 20px 0">
				<el-button plain>朴素按钮</el-button>
				<el-button type="primary" plain>主要按钮</el-button>
				<el-button type="success" plain>成功按钮</el-button>
				<el-button type="info" plain>信息按钮</el-button>
				<el-button type="warning" plain>警告按钮</el-button>
				<el-button type="danger" plain>危险按钮</el-button>
			</div>
			
			<div>
				<el-button round>圆形按钮</el-button>
				<el-button type="primary" round>主要按钮</el-button>
				<el-button type="success" round>成功按钮</el-button>
				<el-button type="info" round>信息按钮</el-button>
				<el-button type="warning" round>警告按钮</el-button>
				<el-button type="danger" round>危险按钮</el-button>
			</div>
			
		</div>
		<describe></describe>
	</div>
</template>

<script>

	import Describe from './describe.vue';

	export default {
		name: 'ButtonDemo',
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			};
		},
		components: {
			Describe
		},

		created() {
		},

		methods: {
			clickme() {
				console.log(111);
			},
			onSubmit() {
				console.log('submit!');
			},
			delPeriod() {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	};
</script>

<style lang="stylus" scoped>
</style>
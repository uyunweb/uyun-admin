<template>
	<div class="panel">
		<div class="panel-content">
			<div class="select-search">
				<el-select
					v-model="selected.submit_type"
					size="small"
					placeholder="---请选择账号类型--"
					@change="">
					<el-option
						v-for="item in enums.taskSubmitTypeFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 10px;" plain>搜索</el-button>
				<router-link to="/system/admin/create">
					<el-button class="_right" type="success" icon="el-icon-search" size="small" plain>添加管理员</el-button>
				</router-link>
			</div>

			<div class="report-list">
				<el-table class="topic-table" :data="tableData" border v-loading="loading" style="min-height: 400px;">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column prop="id" label="ID"></el-table-column>
					<el-table-column prop="login_name" label="登录名"></el-table-column>
					<el-table-column prop="type" label="账号类型"></el-table-column>
					<el-table-column prop="admin_level" label="账号权限"></el-table-column>
					<el-table-column prop="sign_type" label="注册来源"></el-table-column>
					<el-table-column label="创建时间" min-width="160">
						<template slot-scope="scope">
							{{scope.row.create_at | date}}
						</template>
					</el-table-column>
					<el-table-column label="状态">正常</el-table-column>
					<el-table-column label="操作" min-width="300px">
						<template slot-scope="scope">
							<el-button @click="onClickEditAdminAccount(scope.row.id)" type="success" icon="el-icon-edit" size="mini" plain>修改密码</el-button>
							<el-button @click="onClickDeleteAdminAccount(scope)" type="warning" icon="el-icon-delete" size="mini" plain>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import enums from '../../../utils/enums';

	export default {
		components: { },
		data() {
			return {
				enums: enums,
				selected: {
					submit_type: -1 ,
				},
				loading:false,
				tableData:[]
			};
		},
		created() {
			this.ajaxGetAdminAccountList();
		},
		methods: {
			ajaxGetAdminAccountList() {
				this.loading = true;
				// 获取用户列表 for test
				this.$ajax.gateway("/apis/getUserList", (data) => {
					this.loading = false;
					if(data.code===200){
						data = data.data;
						// do something
						console.info(data);
						this.tableData = data;
					} else {
						console.warn(data);
					}
				});
			},
			onClickEditAdminAccount(id) {
				this.$router.push({path: "/system/admin/update", query:{id}});
			},
			onClickDeleteAdminAccount(scope) {
				let id = scope.row.id;
				let index = scope.$index;
				this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除某个账号
					this.$ajax.gateway("/apis/removeAccount", {
						id
					}, (data) => {
						if(data.code===200){
							data = data.data;
							console.info(data);
							this.$message.success("删除成功");
							this.tableData.splice(index, 1);
						} else {
							console.warn(data);
							this.$message.warning(data.message || "删除失败");
						}
					});

					// // 删除某个任务
					// this.$ajax.gateway("/apis/deleteTask", {
					// 	id: scope.row.id
					// }, (data) => {
					// 	if(data.code===200){
					// 		data = data.data;
					// 		console.info(data);
					// 		this.$message.success("删除成功");
					// 		this.tableData.splice(scope.$index, 1);
					// 	} else {
					// 		console.warn(data);
					// 		this.$message.warning(data.message || "删除失败");
					// 	}
					// });
				});
			},
		},
	};
</script>

<style lang="stylus" scoped>
	.report-footer
		padding 20px 0 10px
		.el-pagination
			text-align right

	.select-search
		margin-bottom 15px
		.el-select
			width 120px
		.el-date-editor.el-input, .el-date-editor.el-input__inner
			width 140px
		._right
			float right

	.task_status_0
		color #409EFF
	.task_status_1
		color #333
	.task_status_2
		color #f56c6c
	.task_status_3
		color #f56c6c
	.task_status_4
		color #999
</style>

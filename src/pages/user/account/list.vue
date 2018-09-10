<template>
	<div class="panel">
		<div class="panel-content">
			<div class="select-search" style="padding-bottom: 15px;">
				<el-select
					v-model="selected.type"
					size="small"
					placeholder="---请选择用户类型---"
					@change="ajaxGetAdminAccountList">
					<el-option
						v-for="item in enums.userTypeFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>

			<div class="report-list">
				<el-table class="topic-table" :data="tableData" border v-loading="loading" style="min-height: 400px;">
					<el-table-column type="index" width="50"></el-table-column>
					<!--<el-table-column prop="id" label="ID" width="200"></el-table-column>-->
					<el-table-column label="昵称">
						<template slot-scope="scope">
							<router-link :to='{path: "/user/oss/detail", query: {id:scope.row.id}}'>
								<img v-if="scope.row.avatar_url" :src="scope.row.avatar_url" class="user-face-min" />
								{{scope.row.nick_name || scope.row.user_id}}
							</router-link>
						</template>
					</el-table-column>
					<el-table-column prop="province" label="所在省份"></el-table-column>
					<el-table-column prop="type" label="账号类型"></el-table-column>
					<el-table-column prop="sign_type" label="注册来源"></el-table-column>
					<el-table-column prop="mobile" label="手机号码" width="100"></el-table-column>
					<el-table-column prop="wallet_cash" label="余额"></el-table-column>
					<!--<el-table-column label="推广Id"></el-table-column>-->
					<el-table-column label="创建时间" min-width="160">
						<template slot-scope="scope">
							{{scope.row.created_at | date}}
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="120px">
						<template slot-scope="scope">
							<router-link :to='{path: "/user/oss/detail", query: {id:scope.row.id}}'>
								<el-button type="success" icon="el-icon-edit" size="mini" plain>查看</el-button>
							</router-link>

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
					type: -1
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
				this.$ajax.gateway("/apis/getUserList", {
					type: this.selected.type
				}, (data) => {
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
				this.$router.push({path: "/system/oss/update", query:{id}});
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

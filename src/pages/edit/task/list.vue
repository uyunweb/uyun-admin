<template>
	<div class="panel">
		<div class="panel-content">
			<div class="select-search">
				<el-select
					v-model="selected.status"
					size="small"
					placeholder="---请选择任务状态---"
					@change="ajaxGetTaskList">
					<el-option
						v-for="item in enums.taskStatusFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select
					v-model="selected.type"
					size="small"
					placeholder="---请选择任务分类---"
					@change="ajaxGetTaskList">
					<el-option
						v-for="item in enums.taskTypeFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<!--<el-select-->
					<!--v-model="selected.submit_type"-->
					<!--size="small"-->
					<!--placeholder="-&#45;&#45;请选择审核方式&#45;&#45;"-->
					<!--@change="">-->
					<!--<el-option-->
						<!--v-for="item in enums.taskSubmitTypeFull"-->
						<!--:key="item.value"-->
						<!--:label="item.label"-->
						<!--:value="item.value">-->
					<!--</el-option>-->
				<!--</el-select>-->
				<el-input
					v-model="selected.key_word"
					size="small"
					placeholder="请输入task_id、task_name、user_id、user_name"
					class="width-300"
					@change="">
				</el-input>
				<el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 10px;">搜索</el-button>
				<router-link to="/edit/task/create">
					<el-button class="_right" type="success" icon="el-icon-search" size="small" plain>创建任务</el-button>
				</router-link>
			</div>

			<div class="report-list">
				<el-table class="topic-table" :data="tableData" border v-loading="loading" style="min-height: 400px;">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column label="任务名称" min-width="200">
						<template slot-scope="scope">
							<a :href="'#/?id='+scope.row.id">{{scope.row.title}}</a>
						</template>
					</el-table-column>
					<el-table-column label="分类">
						<template slot-scope="scope">
							{{scope.row.type | matchingValue(enums.taskType)}}
						</template>
					</el-table-column>
					<el-table-column prop="price" label="任务奖励"></el-table-column>
					<el-table-column label="任务次数">
						<template slot-scope="scope">
							{{scope.row.task_complete_num}}/{{scope.row.task_receive_num}}/{{scope.row.task_num}}
						</template>
					</el-table-column>
					<el-table-column label="创建者" min-width="80">
						<template slot-scope="scope">
							<template v-if="scope.row.user_login_name">{{scope.row.user_login_name}}</template>
							<template v-else>
								<router-link :to='{path: "/user/order/detail", query: {id:scope.row.user_id}}'>
									<img v-if="scope.row.user_avatar_url" :src="scope.row.user_avatar_url" class="user-face-min" />
									{{scope.row.user_nick_name || scope.row.user_id}}
								</router-link>
							</template>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" min-width="140">
						<template slot-scope="scope">
							{{scope.row.created_at | date}}
						</template>
					</el-table-column>
					<el-table-column label="精选">
						<template slot-scope="scope">
							{{scope.row.is_hot}}
						</template>
					</el-table-column>
					<el-table-column label="公开">
						<template slot-scope="scope">
							{{scope.row.is_open}}
						</template>
					</el-table-column>
					<el-table-column label="任务状态">
						<template slot-scope="scope">
							<font :class="'task_status_'+scope.row.status">
								{{scope.row.status | matchingValue(enums.taskStatus)}}
							</font>
						</template>
					</el-table-column>
					<el-table-column label="支付状态">
						<template slot-scope="scope">
							<font :class="'payment_status_'+scope.row.is_payment">
								{{scope.row.is_payment | matchingValue(enums.taskIsPaymentType)}}
							</font>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="300px">
						<template slot-scope="scope">
							<!--<el-button icon="el-icon-search" size="mini" plain>预览</el-button>-->
							<el-button @click="onClickEditTask(scope.row)" type="success" icon="el-icon-edit" size="mini" plain>编辑</el-button>
							<template v-if="scope.row.status===0">
								<el-button v-if="!(scope.row.is_payment===2 || scope.row.is_payment===4)" @click="onClickInspectTask(scope)" type="primary" icon="el-icon-bell" size="mini" plain>审核</el-button>
							</template>
							<template v-else-if="scope.row.status===1">
								<el-button @click="onClickInspectTask(scope)" icon="el-icon-download" size="mini" plain>下架</el-button>
							</template>
							<template v-else>
								<el-button @click="onClickInspectTask(scope)" icon="el-icon-time" size="mini" plain>回滚</el-button>
							</template>
							<el-button @click="onClickDeleteTask(scope)" type="warning" icon="el-icon-delete" size="mini" plain>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="report-footer">
				<el-pagination
					v-show="page.total"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.page"
					:page-sizes="page.sizes"
					:page-size.sync="page.size"
					layout="total, sizes, prev, pager, next, jumper"
					:total="page.total">
				</el-pagination>
			</div>

			<el-dialog title="审核任务" width="40%" :visible.sync="inspectDialogVisible">
				<el-form :model="inspect_form" label-width="100px">
					<el-form-item label="状态">
						<el-select v-model="inspect_form.status" placeholder="请选择" class="width-200-important">
							<el-option
								v-for="item in enums.taskStatus"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="备注">
						<el-input type="textarea" v-model="inspect_form.desc" placeholder="审核为失败或下架状态时不能为空。"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="inspectDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="onClickInspectTaskSubmit">确 定</el-button>
				</div>
			</el-dialog>
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
					status: -1 ,
					type: -1 ,
					submit_type: -1 ,
					key_word: ""
				},
				inspectDialogVisible: false,
				inspect_form: {},
				page:  {
					page: 1,
					size: 10,
					sizes: [10, 3, 20, 30, 50, 100],
					total: 0
				},
				loading:false,
				tableData:[]
			};
		},
		created() {
			this.ajaxGetTaskList();
		},
		methods: {
			ajaxGetTaskList() {
				this.loading = true;
				// 获取任务列表，默认返回10条 Admin && User
				this.$ajax.gateway("/apis/getTaskList", {
					status: this.selected.status,
					type: this.selected.type,
					page: this.page.page,
					size: this.page.size
				}, (data) => {
					this.loading = false;
					if(data.code===200){
						console.info(data);
						this.page.total = data.dataCount;
						this.tableData = data.data;
					} else {
						console.warn(data);
					}
				});
			},
			handleSizeChange(val) {
				console.log("-> pageSize 改变时会触发");
				console.log(`每页 ${val} 条`);
				this.page.page=1;
				this.page.size=val;
				this.ajaxGetTaskList();
			},
			handleCurrentChange(val){
				console.log("-> currentPage 改变时会触发");
				console.log(`当前页: ${val}`);
				this.page.page=val;
				this.ajaxGetTaskList();
			},
			print(){

			},
			onClickEditTask(item) {
				this.$router.push({path: "/edit/task/detail", query:{id: item.id}});
			},
			onClickInspectTask(score) {
				let item = score.row;
				if(item.status === 0){
					this.inspect_form = {
						index: score.$index,
						id: item.id,
						status: 1,
						desc: undefined
					};
				} else if(item.status === 1) {
					this.inspect_form = {
						index: score.$index,
						id: item.id,
						status: 3,
						desc: undefined
					};
				} else {
					this.inspect_form = {
						index: score.$index,
						id: item.id,
						status: 0,
						desc: undefined
					};
				}
				this.inspectDialogVisible = true;
			},
			onClickInspectTaskSubmit() {
				if(!this.inspect_form.id) {
					return this.$message.error("未找到任务Id");
				}
				if((this.inspect_form.status === 2 || this.inspect_form.status === 3) && !this.inspect_form.desc) {
					return this.$message.error("备注不能为空");
				}

				this.inspectDialogVisible = false;

				// 修改（审核）一个任务
				this.$ajax.gateway("/apis/updateTaskInspect", {
					body: {
						id: this.inspect_form.id,
						task: {
							status: this.inspect_form.status,
							status_desc: this.inspect_form.desc
						}
					}
				}, (data) => {
					if(data.code===200){
						data = data.data;
						// do something
						console.info(data);
						this.$message.success("审核成功");
						this.tableData[this.inspect_form.index].status = this.inspect_form.status;
					} else {
						this.$message.warning(data.message || "审核失败");
						console.warn(data);
					}
				});
			},
			onClickDeleteTask(scope) {
				this.$confirm('此操作将删除该任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除某个任务
					this.$ajax.gateway("/apis/deleteTask", {
						id: scope.row.id
					}, (data) => {
						if(data.code===200){
							data = data.data;
							console.info(data);
							this.$message.success("删除成功");
							this.tableData.splice(scope.$index, 1);
						} else {
							console.warn(data);
							this.$message.warning(data.message || "删除失败");
						}
					});
				});
			}
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

	.payment_status_0
		color #999
	.payment_status_1
		color #999
	.payment_status_2
		color #f56c6c
	.payment_status_3
		color #67c23a
	.payment_status_4
		color #999


</style>

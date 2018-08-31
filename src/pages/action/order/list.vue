<template>
	<div class="panel">
		<div class="panel-content">
			<div class="select-search">
				<el-select
					v-model="selected.type"
					size="small"
					placeholder="---请选择订单状态---"
					@change="ajaxGetOrderList">
					<el-option
						v-for="item in enums.orderTypeFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select
					v-model="selected.deleted"
					size="small"
					placeholder="---请选择---"
					@change="ajaxGetOrderList">
					<el-option
						v-for="item in enums.deletedType"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-date-picker
					v-model="selected.startDate"
					type="date"
					size="small"
					placeholder="开始日期"
					value-format="yyyy-MM-ddTHH:mm:ss"
					@change="">
				</el-date-picker>
				<span> — </span>
				<el-date-picker
					v-model="selected.endDate"
					type="date"
					size="small"
					placeholder="结束日期"
					value-format="yyyy-MM-ddTHH:mm:ss"
					@change="">
				</el-date-picker>
				<el-input
					v-model="selected.key_word"
					size="small"
					placeholder="请输入task_id、task_name、user_id、user_name"
					class="width-300"
					@change="">
				</el-input>
				<el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 10px;">搜索</el-button>
			</div>

			<div class="report-list">
				<el-table class="topic-table" :data="tableData" border v-loading="loading" >
					<el-table-column type="index" width="50"></el-table-column>
					<!--<el-table-column prop="_id" label="订单编号" width="200"></el-table-column>-->
					<el-table-column label="任务名称" width="200">
						<template slot-scope="scope">
							{{scope.row.task_title || scope.row.task_id}}
							<!--<router-link :to='{path: "/edit/task/detail", query: {id:scope.row.task_id}}'>-->
							<!--</router-link>-->
						</template>
					</el-table-column>
					<el-table-column label="奖励">
						<template slot-scope="scope">
							<font color="orange">{{scope.row.task_price}} 元</font>
						</template>
					</el-table-column>
					<el-table-column label="用户">
						<template slot-scope="scope">
							<router-link :to='{path: "/user/order/detail", query: {id:scope.row.user_id}}'>
								<img :src="scope.row.user_avatar_url" class="user-face-min" style="position: relative; top: 6px;" />
								{{scope.row.user_nick_name || scope.row.user_id}}
							</router-link>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="150">
						<template slot-scope="scope">
							{{scope.row.create_at | date}}
						</template>
					</el-table-column>
					<el-table-column label="资料">
						<template slot-scope="scope">
							<font class="oss_type_1" v-if="scope.row.oss_id" :title="scope.row.oss_id">
								已提交
							</font>
							<font class="oss_type_2" v-else>
								未提交
							</font>
						</template>
					</el-table-column>
					<el-table-column label="订单状态">
						<template slot-scope="scope">
							<font :class="'order_type_'+scope.row.type">
								{{scope.row.type | matchingValue(enums.orderType)}}
							</font>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="300px">
						<template slot-scope="scope">
							<template v-if="scope.row.type===2">
								<el-button @click="onClickInspectOrder(scope)" type="primary" icon="el-icon-bell" size="mini" plain>审核</el-button>
							</template>
							<template v-if="!scope.row.deleted">
								<el-button @click="onClickDeleteOrder(scope)" type="warning" icon="el-icon-delete" size="mini" plain>删除</el-button>
							</template>
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
		</div>

		<el-dialog title="审核订单" width="40%" :visible.sync="inspectDialogVisible">
			<el-form :model="inspect_form" label-width="100px">
				<div v-if="inspect_oss">
					<el-form-item label="提交文字">
						<p>{{inspect_oss.text}}</p>
					</el-form-item>
					<el-form-item label="提交截图" style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: -20px;">
						<p style="padding-top: 10px;">
							<a v-for="item of inspect_oss.pic_list" target="_blank" :href="item">
								<img :src="item+'!face'" style="width: 80px;">
							</a>
						</p>
					</el-form-item>
				</div>
				<div v-else style="padding: 50px; color: #999; text-align: center;">
					审核资料读取中..
				</div>


				<el-form-item label="状态">
					<el-select v-model="inspect_form.type" placeholder="请选择" class="width-200-important">
						<el-option
							v-for="item in enums.orderType"
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
</template>

<script>
	import enums from '../../../utils/enums';

	export default {
		components: { },
		data() {
			return {
				enums: enums,
				selected: {
					type: -1 ,
					deleted: -1,
					key_word: ""
				},
				inspectDialogVisible: false,
				inspect_form: {},
				inspect_oss: null,
				page: {
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
			this.ajaxGetOrderList();
		},
		methods: {
			ajaxGetOrderList() {
				this.loading = true;
				// 根据条件查询订单列表 Admin
				this.$ajax.gateway("/apis/getOrderList", {
					type: this.selected.type,
					deleted: this.selected.deleted,
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
				this.ajaxGetOrderList();
			},
			handleCurrentChange(val){
				console.log("-> currentPage 改变时会触发");
				console.log(`当前页: ${val}`);
				this.page.page=val;
				this.ajaxGetOrderList();
			},
			onClickInspectOrder(score) {
				let item = score.row;
				this.inspect_form = {
					index: score.$index,
					id: item.id,
					type: item.type,
					desc: null
				};
				this.inspectDialogVisible = true;
				if(item.oss_id){
					this.ajaxGetOssDetail(item.oss_id);
				}
			},
			onClickInspectTaskSubmit() {
				this.inspectDialogVisible = false;
				// 审核一个任务订单 Admin
				this.$ajax.gateway("/apis/checkOrder", {
					body: {
						order_id: this.inspect_form.id,
						type: this.inspect_form.type,
						fail_cause: this.inspect_form.desc
					}
				}, (data) => {
					if(data.code===200){
						data = data.data;
						// do something
						console.info(data);
						this.$message.success("审核成功");
						this.tableData[this.inspect_form.index].type = this.inspect_form.type;
					} else {
						this.$message.warning(data.message || "审核失败");
						console.warn(data);
					}
				});

			},
			onClickDeleteOrder(scope) {
				this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 删除订单 Admin & User
					this.$ajax.gateway("/apis/deleteOrder", {
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
			},
			ajaxGetOssDetail(id) {
				this.inspect_oss = null;
				// 查找某个订单任务的附件 Admin & User
				this.$ajax.gateway("/apis/getOssDetail", { id }, (data) => {
					if(data.code===200){
						data = data.data;
						this.inspect_oss = data;
						// do something
						console.info(data);
						console.info(this.inspect_form);
					} else {
						console.warn(data);
					}
				});
			}
		},
	};
</script>

<style lang="stylus" scoped>
	.select-search
		margin-bottom 15px
		.el-select
			width 120px
		.el-date-editor.el-input, .el-date-editor.el-input__inner
			width 140px
		._right
			float right

	// 蓝 #409eff
	// 绿 #67c23a
	// 橙 #e6a23c
	// 红 #f56c6c
	// 黑 #333
	// 灰 #ccc

	.oss_type_1
		color #67c23a
	.oss_type_2
		color #ccc

	.order_type_0
		color #ccc
	.order_type_1
		color #333
	.order_type_2
		color #f56c6c
	.order_type_3
		color #67c23a
	.order_type_4
		color #ccc
	.order_type_5
		color #ccc
	.order_type_6
		color #ccc
	.order_type_7
		color #ccc
</style>

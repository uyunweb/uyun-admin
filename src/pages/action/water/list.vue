<template>
	<div class="panel">
		<div class="panel-content">
			<div class="select-search">
				<el-select
					v-model="selected.type"
					size="small"
					placeholder="---请选择流水类型---"
					@change="ajaxGetWaterList">
					<el-option
						v-for="item in enums.waterTypeFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select
					v-model="selected.count_type"
					size="small"
					placeholder="---请选择---"
					@change="ajaxGetWaterList">
					<el-option
						v-for="item in enums.waterCountTypeFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-select
					v-model="selected.deleted"
					size="small"
					placeholder="---请选择---"
					@change="ajaxGetWaterList">
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
					v-model="selected.user_id"
					size="small"
					placeholder="请输入user_id"
					class="width-300"
					@change="">
				</el-input>
				<el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 10px;">搜索</el-button>
			</div>

			<div class="report-list">
				<el-table class="topic-table" :data="tableData" border v-loading="loading" >
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column label="分类" width="60">
						<template slot-scope="scope">
							{{scope.row.type | matchingValue(enums.waterType)}}
						</template>
					</el-table-column>
					<el-table-column label="流水类型" width="100">
						<template slot-scope="scope">
							{{scope.row.count_type | matchingValue(enums.waterCountType)}}
						</template>
					</el-table-column>
					<el-table-column label="金额">
						<template slot-scope="scope">
							<font color="green" v-if="scope.row.count>0">+{{scope.row.count}} 元</font>
							<font color="orange" v-else>{{scope.row.count}} 元</font>
						</template>
					</el-table-column>
					<el-table-column label="当前余额">
						<template slot-scope="scope">
							{{scope.row.current_cash}} 元
						</template>
					</el-table-column>
					<el-table-column label="描述">
						<template slot-scope="scope">
							{{scope.row.count_desc}}
						</template>
					</el-table-column>
					<el-table-column label="用户Id" width="100">
						<template slot-scope="scope">
							{{scope.row.user_id}}
						</template>
					</el-table-column>
					<el-table-column label="订单Id" width="100">
						<template slot-scope="scope">
							{{scope.row.order_id}}
						</template>
					</el-table-column>
					<el-table-column label="任务Id" width="100">
						<template slot-scope="scope">
							{{scope.row.task_id}}
						</template>
					</el-table-column>
					<el-table-column label="任务名称" width="100">
						<template slot-scope="scope">
							{{scope.row.task_title}}
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="150">
						<template slot-scope="scope">
							{{scope.row.created_at | date}}
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="300px">
						<template slot-scope="scope">
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
					count_type: -1,
					deleted: -1,
					user_id: ""
				},
				page: {
					page: 1,
					size: 10,
					sizes: [10, 20, 30, 50, 100],
					total: 0
				},
				loading:false,
				tableData:[]
			};
		},
		created() {
			this.ajaxGetWaterList();
		},
		methods: {
			ajaxGetWaterList() {
				this.loading = true;
				// 根据条件查询订单列表 Admin
				this.$ajax.gateway("/apis/getWaterList", {
					type: this.selected.type,
					count_type: this.selected.count_type,
					user_id: this.selected.user_id,
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
				this.ajaxGetWaterList();
			},
			handleCurrentChange(val){
				console.log("-> currentPage 改变时会触发");
				console.log(`当前页: ${val}`);
				this.page.page=val;
				this.ajaxGetWaterList();
			},
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

	.water_type_0
		color #ccc
	.water_type_1
		color #f56c6c
	.water_type_2
		color #67c23a
	.water_type_3
		color red
</style>

<template>
	<div class="panel">
		<div class="panel-content">
			<div class="select-search" style="padding-bottom: 15px;">
				<el-select
					v-model="selected.type"
					size="small"
					placeholder="---所有类型---"
					@change="ajaxGetOssList">
					<el-option
						v-for="item in enums.ossTypeFull"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>

			<div class="report-list">
				<el-table class="topic-table" :data="tableData" border v-loading="loading" style="min-height: 400px;">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column prop="_id" label="_id" width="200"></el-table-column>
					<el-table-column prop="task_id" label="task_id" width="200"></el-table-column>
					<el-table-column prop="order_id" label="order_id" width="200"></el-table-column>
					<el-table-column prop="user_id" label="user_id" width="200"></el-table-column>
					<el-table-column label="文字">
						<template slot-scope="scope">
							{{scope.row.text}}
						</template>
					</el-table-column>
					<el-table-column label="图片">
						<template slot-scope="scope">
							<a v-for="item of scope.row.pic_list" target="_blank" :href="item">
								<img :src="item+'!face'" class="oss-image-min">
							</a>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" min-width="160">
						<template slot-scope="scope">
							{{scope.row.created_at | date}}
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
			this.ajaxGetOssList();
		},
		methods: {
			ajaxGetOssList() {
				this.loading = true;
				// 获取用户列表 for test
				this.$ajax.gateway("/apis/getOssList", (data) => {
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

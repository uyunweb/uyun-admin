<template>
	<div class="panel">
		<div class="panel-content">
			<div class="select-search">
				<el-select
					v-model="selected.grade"
					placeholder="---订单分类---"
					@change="">
					<el-option
						v-for="item in subjectList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>

				<el-date-picker
					v-model="selected.startDate"
					type="date"
					placeholder="开始日期"
					value-format="yyyy-MM-ddTHH:mm:ss"
					@change="">
				</el-date-picker>
				<span> — </span>
				<el-date-picker
					v-model="selected.endDate"
					type="date"
					placeholder="结束日期"
					value-format="yyyy-MM-ddTHH:mm:ss"
					@change="">
				</el-date-picker>
				<el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
			</div>

			<div class="report-list">
				<el-table class="topic-table" :data="tableData" border v-loading="loading" >
					<el-table-column prop="_id" label="订单编号"></el-table-column>
					<el-table-column label="订单状态">
						<template slot-scope="scope">
							{{scope.row.type | orderType}}
						</template>
					</el-table-column>
					<el-table-column label="任务名称">
						<template slot-scope="scope">
							<router-link :to='{path: "/edit/task/detail", query: {id:scope.row.task_id}}'>
								{{scope.row.task_title || scope.row.task_id}}
							</router-link>
						</template>
					</el-table-column>
					<el-table-column label="任务奖励">
						<template slot-scope="scope">
							<font color="orange">{{scope.row.task_price}} 元</font>
						</template>
					</el-table-column>
					<el-table-column label="领取用户">
						<template slot-scope="scope">
							<router-link :to='{path: "/user/order/detail", query: {id:scope.row.user_id}}'>
								{{scope.row.user_nick_name || scope.row.user_id}}
							</router-link>
						</template>
					</el-table-column>
					<el-table-column label="领取时间">
						<template slot-scope="scope">
							{{scope.row.create_at | date}}
						</template>
					</el-table-column>
					<el-table-column label="提交资料">
						<template slot-scope="scope">
							<template v-if="scope.row.oss_id">
								<a :href="'/?id='+scope.row.oss_id">已提交</a>
							</template>
							<template v-else>
								未提交
							</template>
						</template>
					</el-table-column>
					<el-table-column label="操作" min-width="300px">
						<template slot-scope="scope">
							<router-link :to='{path: "/action/order/detail", query: {id:scope.row._id}}'>
								<el-button type="primary" icon="el-icon-search" size="small">审核</el-button>
							</router-link>
							<el-button type="danger" icon="el-icon-search" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="report-footer">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.page"
					:page-sizes="[10, 20, 30, 50]"
					:page-size="page.size"
					layout="total, sizes, prev, pager, next, jumper"
					:total="page.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		components: { },
		data() {
			return {
				selected: {
					grade:'' ,    //选择的学段
					region:'',    //学区
					school:'',    //学校
					class:'',    //班级
					subject:'',   //科目
					startDate:'',  //开始时间
					endDate:'',  //开始时间
				},
				gradeList:[],    // 学段选择列表
				regionList:[],    // 学区选择列表
				schoolList:[],    // 学校选择列表
				classList:[],    // 班级选择列表
				subjectList:[],    // 科目选择列表
				page: {
					page:1,
					size:10,
					total:100
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
				// 获取订单列表，默认返回10条
				this.$ajax.gateway("/apis/getOrderList", (data) => {
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
			handleSizeChange() {

			},
			handleCurrentChange(){

			},
			print(){

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
</style>

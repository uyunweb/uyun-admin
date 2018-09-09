<template>
	<div class="panel">
		<div class="panel-header">
			<h2 class="panel-title">订单详情</h2>
			<a  class="operation float-right" @click.prevent="$router.go(-1)">
				<i class="icons icons-back"></i>
				<span>返回</span>
			</a>
		</div>
		<div class="panel-content" v-if="order">
			<el-form ref="form" :model="form" label-width="160px">
				<el-form-item label="订单编号：">{{order._id}} &nbsp</el-form-item>
				<el-form-item label="订单状态：">{{order.type}} &nbsp</el-form-item>
				<el-form-item label="任务Id：">{{order.task_id}} &nbsp</el-form-item>
				<el-form-item label="任务名称：">{{order.task_title}} &nbsp</el-form-item>
				<el-form-item label="任务奖励：">{{order.task_price}} 元 &nbsp</el-form-item>
				<el-form-item label="任务截止时间：">{{order.end_time | date}} &nbsp</el-form-item>
				<el-form-item label="用户Id：">{{order.user_id}} &nbsp</el-form-item>
				<el-form-item label="用户昵称：">{{order.user_nike_name}} &nbsp</el-form-item>
				<el-form-item label="创建时间：">{{order.created_at | date}} &nbsp</el-form-item>
				<el-form-item label="任务提交：">{{order.oss_id}} &nbsp</el-form-item>
			</el-form>
			<div v-if="oss">
				<el-form ref="form" :model="form" label-width="160px">
					<el-form-item label="提交时间：">{{oss.created_at | date}} &nbsp</el-form-item>
					<el-form-item label="提交文本：">{{oss.text}} &nbsp</el-form-item>
					<el-form-item label="提交截图：">
						<p v-for="item of oss.pic_list"><img :src="item" style="height: 200px;"></img></p>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>


	export default {
		name: 'FormDemo',
		data() {
			return {
				form: {},
				order: "",
				oss: ""
			};
		},
		components: {
		},

		created() {
			this.ajaxGetOrderDetail(this.$route.query.id);
		},

		methods: {
			ajaxGetOrderDetail(id) {
				// 根据id查询一个订单的详情
				this.$ajax.gateway("/apis/getOrderDetail", {
					id
				}, (data) => {
					if(data.code===200){
						data = data.data;
						console.info(data);
						this.order = data;
						if(data.oss_id){
							this.ajaxGetOssDetail(data.oss_id);
						}
					} else {
						console.warn(data);
					}
				});
			},
			ajaxGetOssDetail(id) {
				// 查找某个订单任务的附件
				this.$ajax.gateway("/apis/getOssDetail", {
					id
				}, (data) => {
					if(data.code===200){
						data = data.data;
						console.info(data);
						this.oss = data;
					} else {
						console.warn(data);
					}
				});

			}
		}
	};
</script>

<style lang="stylus" scoped>
</style>
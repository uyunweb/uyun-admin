<template>
	<div class="panel">
		<panel-header title="编辑任务"></panel-header>
		<div class="panel-content">
			<el-form ref="form" :model="form" label-width="160px">
				<!--form-->
				<task-form :form="form"></task-form>

				<!--submit-->
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即保存</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import TaskMixins from './mixins/form';

	import PanelHeader from '../../../components/PanelHeader.vue';
	import TaskForm from './components/form.vue';

	export default {
		name: 'createTask',
		data() {
			return {
			};
		},
		components: {
			PanelHeader,
			TaskForm
		},
		mixins: [TaskMixins],

		created() {
			this.ajaxGetTaskDetail(this.$route.query.id);
		},

		methods: {
			ajaxGetTaskDetail(id) {
				// 获取任务详情
				this.$ajax.gateway("/apis/getTaskDetailById", {
					id
				}, (data) => {
					if(data.code===200){
						data = data.data;
						// 默认添加一个步骤
						if(data.step_list.length===0){
							data.step_list.push(this.defaultStepObject);
						}
						this.form = data;
						console.info(data);
					} else {
						console.warn(data);
					}
				});
			},
			onSubmit() {
				console.log('submit!');
				console.log(this.form);

				// 验证
				let isValidateError = this.validateTaskData(this.form);
				if(isValidateError){
					return this.$message.warning(isValidateError);
				}

				// 修改（更新）一个任务
				this.$ajax.gateway("/apis/updateTaskEdit", {
					body: {
						id: this.form._id,
						task: this.form
					}
				}, (data) => {
					if(data.code===200){
						data = data.data;
						// do something
						console.info(data);
						this.$message.success('恭喜，修改任务成功！');
						setTimeout(() => {
							this.$router.go(-1);
						}, 1500);
					} else if(data.code === "invalid_param"){
						console.warn(data);
						this.$message.error("验证错误："+JSON.stringify(data.errors));
					} else {
						console.warn(data);
						this.$message.error(data.message);
					}
				});


			}
		}
	};
</script>

<style lang="stylus" scoped>
</style>
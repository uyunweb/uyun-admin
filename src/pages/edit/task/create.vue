<template>
	<div class="panel">
		<panel-header title="创建任务"></panel-header>
		<div class="panel-content">
			<el-form ref="form" :model="form" label-width="160px">
				<!--form-->
				<task-form :form="form"></task-form>

				<!--submit-->
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
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
			this.form = {
				type: 1,
				end_time: new Date(),
				price: 1,
				task_num: 200,
				submit_type: 0,
				submit_time: 3600,
				step_list: [this.defaultStepObject]
			};
		},

		methods: {
			onSubmit() {
				console.log('submit!');
				console.log(this.form);

				// 验证
				let isValidateError = this.validateTaskData(this.form);
				if(isValidateError){
					return this.$message.warning(isValidateError);
				}

				// 创建一个任务
				this.$ajax.gateway("/apis/createTask", {
					body: this.form
				}, (data) => {
					if(data.code===200){
						data = data.data;
						// do something
						console.info(data);
						this.$message.success('恭喜，创建任务成功！');
						setTimeout(() => {
							this.$router.go(-1);
						}, 1500);
					} else if(data.code === "invalid_param" || !data.success){
						console.warn(data);
						this.$message.error("验证错误："+JSON.stringify(data.error_msg));
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
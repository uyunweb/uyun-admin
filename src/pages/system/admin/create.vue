<template>
	<div class="panel">
		<panel-header title="创建管理员"></panel-header>
		<div class="panel-content">
			<el-form ref="form" :model="form" label-width="160px">
				<!--form-->
				<admin-form :form="form"></admin-form>

				<!--submit-->
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button @click="goBack">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import PanelHeader from '../../../components/PanelHeader.vue';
	import AdminForm from './components/form.vue';

	export default {
		name: 'createTask',
		data() {
			return {
				form: {
					admin_level: 0,
					real: {}
				}
			};
		},
		components: {
			PanelHeader,
			AdminForm
		},

		created() {
		},

		methods: {
			goBack() {
				this.$router.go(-1);
			},
			onSubmit() {
				console.log('submit!');
				if(!this.form.password){
					// do warning
				} else {
					this.form.password = md5(this.form.password);
				}
				console.log(this.form);

				// 创建系统用户
				this.$ajax.gateway("/apis/signUpSystemUser", {
					body: this.form
				}, (data) => {
					if(data.code===200){
						data = data.data;
						// do something
						console.info(data);
						this.$message.success('恭喜，创建管理员成功！');
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
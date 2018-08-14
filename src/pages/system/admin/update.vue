<template>
	<div class="panel">
		<panel-header title="编辑管理员"></panel-header>
		<div class="panel-content">
			<el-form ref="form" :model="form" label-width="160px">
				<!--form-->
				<admin-form :form="form"></admin-form>

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
	import PanelHeader from '../../../components/PanelHeader.vue';
	import AdminForm from './components/form.vue';

	export default {
		name: 'createTask',
		data() {
			return {
				form : {
					real: {}
				}
			};
		},
		components: {
			PanelHeader,
			AdminForm
		},

		created() {
			this.ajaxGetUserDetail(this.$route.query.id);
		},

		methods: {
			onSubmit() {
				console.log('submit!');
				console.log(this.form);
			},
			ajaxGetUserDetail(id) {
				// 获取用户信息
				this.$ajax.gateway("/apis/getUserInfo", {
					id
				}, (data) => {
					if(data.code===200){
						data = data.data;
						// do something
						console.info(data);
						if(!data.real) {
							data.real = {
								name: ""
							};
						}
						this.form = data;
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
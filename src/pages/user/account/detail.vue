<template>
	<div class="panel">
		<panel-header title="用户详情"></panel-header>
		<div class="panel-content">
			<el-form ref="form" :model="form" label-width="160px">
				<el-form-item label="用户Id：">{{form.id}}</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import PanelHeader from '../../../components/PanelHeader.vue';
	import enums from '../../../utils/enums';

	export default {
		components: {
			PanelHeader,
		},
		data() {
			return {
				enums: enums,
				form: {}
			};
		},
		created() {
			this.ajaxGetUserDetail(this.$route.query.id);
		},
		methods: {
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
			},
		},
	};
</script>

<style lang="stylus" scoped>
</style>

<template>
	<div>
		<el-form-item label="账号">
			<el-input type="text" v-model="form.login_name" class="width-half" placeholder="不能为空，限制输入6~20"></el-input>
		</el-form-item>
		<el-form-item label="密码">
			<el-input type="text" v-model="form.password" class="width-half" placeholder="不能为空，限制输入6~20"></el-input>
		</el-form-item>
		<el-form-item label="真实姓名">
			<el-input type="text" v-model="form.real.name" class="width-half" placeholder="不能为空，限制输入6~20"></el-input>
		</el-form-item>
		<el-form-item label="Email">
			<el-input type="text" v-model="form.email" class="width-half" placeholder="不能为空，限制输入6~20"></el-input>
		</el-form-item>
		<el-form-item label="手机号码">
			<el-input type="text" v-model="form.mobile" class="width-half" placeholder="不能为空，限制输入6~20"></el-input>
		</el-form-item>
		<el-form-item label="账号类型">
			<el-select v-model="form.admin_level" placeholder="请选择账号类型" class="width-200-important">
				<el-option
					v-for="item in enums.adminUserType"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
	</div>
</template>

<script>
	import Enums from '../../../../utils/enums';

	export default {
		props: {
			form: {
				type: Object,
				deafult: {
					real: {}
				}
			}
		},
		name: 'adminForm',
		data() {
			return {
				enums: Enums,
			};
		},
		components: {
		},

		created() {
			console.log(":--> created");
			console.log(this.form);
		},

		methods: {
		}
	};
</script>

<style lang="stylus" scoped>
</style>
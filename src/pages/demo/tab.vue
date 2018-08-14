<template>
	<el-tabs
		class="tab"
		v-model="activeName"
		@tab-click="handleClick">
		<el-tab-pane label="区域访问统计" name="first">区域访问统计</el-tab-pane>
		<el-tab-pane label="应用开通统计" name="second">应用开通统计</el-tab-pane>
	</el-tabs>
</template>
<script>
	export default {
		data() {
			return {
				activeName: 'first'
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	};
</script>
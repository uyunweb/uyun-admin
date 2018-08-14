<template>
	<div id="app" class="page-container">
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		name: 'app',

		created() {
			window.vm = this;
		},
	};
</script>
<style lang="stylus" scoped>
</style>
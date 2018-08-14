<template>
	<div class="panel-header">
		<h2 class="panel-title">{{title}}</h2>
		<a  class="operation float-right" @click.prevent="$router.go(-1)">
			<i class="icons icons-back"></i>
			<span>返回</span>
		</a>
	</div>
</template>

<script>
	export default {
		props: {
			title: String
		},

		data(){
			return {
			};
		},

		computed: {
		},

		methods: {
		}
	};
</script>
<style>
</style>
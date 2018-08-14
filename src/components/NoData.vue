<template>
	<div class="noData">
		{{ noDataText }}
	</div>
</template>

<script>
	export default{
		name: 'noData',
		props: {
			noDataText: {
				type: String,
				default: '暂无数据!'
			}
		},
		data(){
			return {

			};
		}
	};

</script>

<style lang="stylus" scoped>
	.noData
		text-align center
		line-height 100px
		background #fff

</style>
/**
* Created by yuanlong on 2017/12/13.
*/
<template>
	<div class="sxui_demo">
		<ul>
			<li v-for="(item,index) in iconList"
				:key="index">
				<i :class="['icons', item]"></i>
				<p>{{item}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				iconList: ["icons-add", "icons-oss", "icons-allow", "icons-calendar", "icons-chart", "icons-close",
					"icons-column", "icons-comment", "icons-content", "icons-delete", "icons-drop-down", "icons-edit",
					"icons-export-single", "icons-export", "icons-fold", "icons-forbid", "icons-histogram",
					"icons-import-single", "icons-import","icons-logout", "icons-money", "icons-not-allow", "icons-off",
					"icons-pay", "icons-plus", "icons-refresh", "icons-search", "icons-setting-only", "icons-setting",
					"icons-spread", "icons-system", "icons-user"]
			};
		},
		components: {},
		created() {

		},
		methods: {}
	};
</script>
<style lang="stylus" scoped>
	ul
		overflow hidden
		border-top 1px solid #ddd
	li
		float left
		text-align center
		width 12.6%
		border-right 1px solid #ddd
		border-bottom 1px solid #ddd
		height 62px
		&:nth-child(6n+1)
			border-left 1px solid #ddd
		i
			display block
			line-height 30px
			height 30px
</style> 
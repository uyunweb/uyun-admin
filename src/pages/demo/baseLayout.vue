<template>
	<div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">等宽等高 多列布局</h2>
			</div>
			<div class="panel-content">
				<p>使用table布局方式，默认顶部对齐，'align-middle'可居中对齐；默认无间距，'spacing'增加间距</p>
			</div>
			<div class="l-table spacing align-middle">
				<div class="l-cell">
					<div>
						content 1<br>
						content 1<br>
						content 1<br>
					</div>
				</div>
				<div class="l-cell">
					<div>
						content 2<br>
						content 2<br>
					</div>
				</div>
				<div class="l-cell">
					<div>content 3</div>
				</div>
				<div class="l-cell">
					<div>content 4</div>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">等宽不等高 多列布局</h2>
			</div>
			<div class="panel-content">
				<p>使用float布局方式，默认无间距，'spacing'增加间距</p>
			</div>
			<div class="l-table l-equant-4 spacing">
				<div class="l-cell">
					<div>
						content 1<br>
						content 1<br>
						content 1<br>
					</div>
				</div>
				<div class="l-cell">
					<div>content 2</div>
				</div>
				<div class="l-cell">
					<div>content 3</div>
				</div>
				<div class="l-cell">
					<div>content 4</div>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">单个侧边栏布局</h2>
			</div>
			<div class="panel-content">
				<p>使用float布局方式，默认无间距，'spacing'增加间距</p>
			</div>
			<div class="l-table l-aside-1 spacing">
				<aside class="l-cell aside">
					<div>aside</div>
				</aside>
				<div class="l-cell">
					<div>
						content<br>
						content<br>
						content<br>
					</div>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">两个侧边栏布局</h2>
			</div>
			<div class="panel-content">
				<p>使用float布局方式，默认无间距，'spacing'增加间距</p>
			</div>
			<div class="l-table l-aside-2 spacing">
				<aside class="l-cell aside">
					<div>aside1</div>
				</aside>
				<aside class="l-cell aside">
					<div>aside2</div>
				</aside>
				<div class="l-cell">
					<div>
						content<br>
						content<br>
						content<br>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		components: {},

		created() {
		},

		methods: {}
	};
</script>

<style lang="stylus">
	//当前页独有样式
	.panel
		padding	1px 0 //在这里 防止margin 叠加
		.l-cell
			& > div
				background #ddd
</style>
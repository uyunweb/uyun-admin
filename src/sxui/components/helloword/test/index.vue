<template>
	<div class="sxui_demo">
		<h2>大标题   </h2>
		<h3>小标题</h3>
		<p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容 </p>
		<p>这个内容下面有个横线</p>
		<hr class="line">
		<div>div中可以放任何内容，下面有条粗的横线用来隔开区域</div>
		
		<hr>
		<h3>html代码片段</h3>
		<div>
			<highlight-code lang="html" :code='`
				<!--html必须用转义符-->
				&lt;a href="#"&gt;超链接有木有&lt;a&gt;
				
				<!--也可用这种方式\`xxx\`-->
				<progres
					:value="25"
					:values="100"
					title="考试次数统计"
					color="#5444a0"
					link="http://baidu.com">
				</progres>
			`'></highlight-code>
		</div>
		<h3>js代码片段</h3>
		<div>
			<highlight-code lang="javascript">
				// 通过点击事件触发
				onClickUpFileDialog() {
					this.$store.commit("startUpFileDialog", data => {
						// 上传成功后回调
						console.info(data, data.status);
					});
				}
			</highlight-code>
		</div>
		<h3>列表说明</h3>
		<ul>
			<li>* 原则1：用户界面应该是基于用户的心里模型，而不是基于工程实现模型</li>
			<li>* 原则2：培养用户使用情景的思维方式做设计</li>
			<li>* 原则3：尽量少的让用户输入，输入时尽量多给出参考</li>
			<li>* 原则4：全局导航需要一直存在，最好还能预览其他模块的动态</li>
			<li>* 原则5：提供非模态的反馈，不打断任务流</li>
		</ul>
	</div>
</template>

<script>

	export default {
		data() {
			return {
			};
		}
	};
</script>

<style lang="stylus" scoped>
</style>
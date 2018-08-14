<template>
	<el-col :span="8">
		<el-card :body-style="{ padding: '0px' }">
			<el-row>
				<div class="clearfix">
					<div class="time">{{ topic.date }}</div>
					<el-button type="text" class="textButton">查看评论</el-button>
					<el-button type="text" class="textButton">{{topic.fixTop?'取消置顶':'置顶'}}</el-button>
				</div>
			</el-row>
			<el-row>
				<el-col :span="4">曝光：</el-col>
				<el-col :span="4">浏览：</el-col>
				<el-col :span="4">点赞：</el-col>
				<el-col :span="4">评论：</el-col>
				<el-col :span="4">转发：</el-col>
				<el-col :span="4">二跳：</el-col>
			</el-row>
			<el-row>
				<h3 class="title" :title="topic.title">{{topic.title}}</h3>
				<img :src="topic.picUrl" class="image">
			</el-row>
			<el-row class="buttonRow">
				<div class="buttonDiv">
					<a class="button">信息按钮</a>
					<a class="button">信息按钮</a>
				</div>
			</el-row>
		</el-card>
	</el-col>
</template>

<script>
	export default{
		props: [],
		components: {},
		data(){
			return {
				currentDate: new Date(),
				topic:{
					date: '2017-7-15',
					fixTop: true,
					title: '特别特别长的话题标题啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
					picUrl: '',
				},
			};
		},
		created() {
		},
		mounted() {
		},
		watch: {},
		methods: {}
	};
</script>
<style scoped="scoped">
	.time {
		padding: 0 7px;
		text-align: center;
		font-size: 13px;
		color: #999;
		float: left;
	}

	/*.bottom {*/
		/*margin-top: 13px;*/
		/*line-height: 12px;*/
	/*}*/

	.el-row{
		border: 1px solid #e5e5e5;
		margin: -1px;
		padding: 10px;
	}

	.textButton {
		padding: 0 7px;
		font-size: 13px;
		text-align: center;
		float: right;
		line-height: normal;
	}
	.title{
		white-space:nowrap;
		overflow:hidden;
		text-overflow: ellipsis;
	}
	.image {
		width: 100%;
		display: block;
	}
	.buttonDiv{
		height: 40px;
		width: 100%;
		display: block;
	}
	.buttonRow{
		padding: 0;
	}
	.button{
		width: 50%;
		color: #7a7a7a;
		border: 1px solid #dfe2e6;
		text-align: center;
		line-height: 17px;
		padding: 12px 0;
		display: inline-block;
		margin-right: -3px;
		margin-left: -2px;
		background-color: #F2F2F2;
	}

	/*.clearfix:before,*/
	/*.clearfix:after {*/
		/*display: table;*/
		/*content: "";*/
	/*}*/

	/*.clearfix:after {*/
		/*clear: both*/
	/*}*/
</style>
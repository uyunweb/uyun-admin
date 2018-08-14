<template>
	<div class="select-search">
		<el-select
			v-model="selected.grade"
			placeholder="---请选择班级---"
			@change="">
			<el-option
				v-for="item in subjectList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<el-select
			v-model="selected.grade"
			placeholder="---请选择科目---"
			@change="">
			<el-option
				v-for="item in gradeList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>

		<el-date-picker
			v-model="selected.startDate"
			type="date"
			placeholder="开始日期"
			value-format="yyyy-MM-ddTHH:mm:ss"
			@change="">
		</el-date-picker>
		<span> — </span>
		<el-date-picker
			v-model="selected.endDate"
			type="date"
			placeholder="结束日期"
			value-format="yyyy-MM-ddTHH:mm:ss"
			@change="">
		</el-date-picker>
		<el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
		<el-button class="_right" type="success" icon="el-icon-search" size="small">创建任务</el-button>
	</div>
</template>

<script>
	/**
	 * 课堂评测 - 评测报告 头部 选择框搜索组件
	 * 
	 */
	export default {
		data() {
			return {
				selected: {
					grade:'' ,    //选择的学段
					region:'',    //学区
					school:'',    //学校
					class:'',    //班级
					subject:'',   //科目
					startDate:'',  //开始时间
					endDate:'',  //开始时间
				},
				gradeList:[],    // 学段选择列表  
				regionList:[],    // 学区选择列表  
				schoolList:[],    // 学校选择列表  
				classList:[],    // 班级选择列表  
				subjectList:[],    // 科目选择列表  
			};
		},
	};
</script>

<style lang="stylus" scoped>
	.select-search
		margin-bottom 15px
		.el-select
			width 120px
		.el-date-editor.el-input, .el-date-editor.el-input__inner
			width 140px
		._right
			float right
</style>

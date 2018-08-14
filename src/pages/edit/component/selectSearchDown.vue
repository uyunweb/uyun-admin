<template>
	<div class="select-search">
		<el-select
			v-model="selected.grade"
			placeholder="---请选择学段---"
			@change="">
			<el-option
				v-for="item in gradeList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<el-select
			v-model="selected.grade"
			placeholder="---请选择学区---"
			@change="">
			<el-option
				v-for="item in regionList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<el-select
			v-model="selected.grade"
			placeholder="---请选择学校---"
			@change="">
			<el-option
				v-for="item in schoolList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<el-select
			v-model="selected.grade"
			placeholder="---请选择年级---"
			@change="">
			<el-option
				v-for="item in yearList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
		<el-input
			placeholder="请输入班级名称"
			v-model="selected.search"
			size="small"
			clearable>
			</el-input>

		<el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
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
					year:'',    //年级
					search:'',   //科目
				},
				gradeList:[],    // 学段选择列表  
				regionList:[],    // 学区选择列表  
				schoolList:[],    // 学校选择列表  
				classList:[],    // 班级选择列表  
				subjectList:[],    // 科目选择列表  
				termList:[],    // 学期选择列表  
				yearList:[],    // 年级选择列表  
			};
		},
	};
</script>

<style lang="stylus" scoped>
	.select-search
		margin-bottom 15px
		.el-input
			width 160px
			height 30px
		.el-select
			width 120px
		.el-date-editor.el-input, .el-date-editor.el-input__inner
			width 140px
			height 30px
		.el-button--primary
			height 30px
			width 80px
			float right 
</style>

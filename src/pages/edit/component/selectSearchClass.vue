<template>
	<div class="select-search">
		<el-select
			v-model="selected.term"
			placeholder="---请选择学期---"
			@change="">
			<el-option
				v-for="item in termList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
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
			@change="">
			<el-option
				v-for="item in termList"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>

		<el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
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
				},
				gradeList:[],    // 学段选择列表  
				regionList:[],    // 学区选择列表  
				schoolList:[],    // 学校选择列表  
				classList:[],    // 班级选择列表  
				subjectList:[],    // 科目选择列表  
				termList:[],    // 学期选择列表  
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
		.el-button--primary
			height 30px
			width 80px
			float right 
</style>

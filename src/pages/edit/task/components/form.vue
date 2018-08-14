<template>
	<el-tabs v-model="activeName">

		<!--FIRST CONTENT-->
		<el-tab-pane label="基础信息" name="first">
			<el-form-item label="任务名称">
				<el-input type="text" v-model="form.title" class="width-half" placeholder="不能为空，限制输入6~20"></el-input>
			</el-form-item>
			<el-form-item label="任务分类">
				<el-select v-model="form.type" placeholder="请选择活动区域" class="width-200-important">
					<el-option
						v-for="item in enums.taskType"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="任务标签">
				<el-select
					v-model="form.tags_list"
					multiple
					filterable
					allow-create
					default-first-option
					class="width-half-important"
					placeholder="请选择任务标签">
					<el-option
						v-for="item in enums.taskTags"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="缩略图">
				<el-upload
					action="http://upload-z2.qiniup.com"
					:show-file-list="isShowFileList"
					:file-list="fileList"
					:on-success="handleAvatarSuccess"
					:on-error="handleError"
					:before-upload="beforeAvatarUpload"
					:data="postData">
					<el-input placeholder="只能上传jpg/png文件，且不超过500kb" v-model="form.cover" class="width-500" disabled>
						<el-button slot="append" icon="el-icon-search" type="primary">点击上传</el-button>
					</el-input>
					<div v-if="form.cover" class="el-upload__tip el-upload__tip_img" @click.stop="1"><img @click.stop="onClickUploadImg(form.cover)" :src="form.cover+'!face'"></div>
					<div v-else class="el-upload__tip el-upload__tip_img el-upload__tip_img_default" @click.stop="1"><img src="../../../../static/images/default.png"></div>
				</el-upload>
			</el-form-item>
			<el-form-item label="任务描述">
				<el-input type="textarea" v-model="form.desc" placeholder="不能为空，最多500个字"></el-input>
			</el-form-item>
		</el-tab-pane>

		<!--SECOND CONTENT-->
		<el-tab-pane label="奖励设置" name="second">
			<el-form-item label="现金奖励">
				<el-input-number v-model="form.price" :precision="2" :step="0.1" :max="100" controls-position="right" class="width-200-important"></el-input-number>
				元
			</el-form-item>
			<el-form-item label="任务次数">
				<el-input-number v-model="form.task_num" :step="100" :max="1000" controls-position="right" class="width-200-important"></el-input-number>
			</el-form-item>
			<el-form-item label="完成时间">
				<el-select v-model="form.submit_time" placeholder="请选择任务完成时间" class="width-200-important">
					<el-option
						v-for="item in enums.taskSubmitTime"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				超出时间未提交任务会被自动释放。
			</el-form-item>
			<el-form-item label="结束时间">
				<el-date-picker
					v-model="form.end_time"
					type="datetime"
					default-time="23:59:59"
					placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="其它奖励">
				<el-input type="text" v-model="form.other_reward" class="width-half" placeholder="最多20字符，可以为空	"></el-input>
			</el-form-item>
			<el-form-item label="完成标准">
				<el-input type="textarea" v-model="form.submit_tips" placeholder="可以为空"></el-input>
			</el-form-item>
		</el-tab-pane>

		<!--THIRD CONTENT-->
		<el-tab-pane label="任务引导" name="third">
			<div class="task_step" v-if="form.step_list">
				<el-steps direction="vertical" :active="form.step_list.length">
					<el-step v-for="(item, index) of form.step_list" :key="index">
						<div slot="title" class="_title">
							<el-input type="text" size="mini" class="width-500" v-model="item.title" :placeholder="'步骤'+(index+1)"></el-input>
						</div>
						<div slot="description" class="_item">
							<div class="_desc">
								<el-input type="textarea" v-model="item.desc" placeholder="描述，可以为空，最多500个字"></el-input>
							</div>
							<!-- type=0 无附件 -->
							<template v-if="item.type === 0">
							</template>
							<!-- type=1 图片 -->
							<template v-else-if="item.type === 1">
								<el-upload
									multiple
									action="http://upload-z2.qiniup.com"
									list-type="picture-card"
									:file-list="item.img_list"
									:on-preview="handlePictureCardPreview"
									:on-remove="handleRemove"
									:data="postData">
									<i class="el-icon-plus"></i>
								</el-upload>
							</template>
							<!-- type=2 二维码 -->
							<template v-else-if="item.type === 2">
								<el-upload
									action="http://upload-z2.qiniup.com"
									list-type="picture-card"
									:file-list="item.﻿﻿code_list"
									:on-preview="handlePictureCardPreview"
									:on-remove="handleRemove"
									:data="postData">
									<i class="el-icon-plus"></i>
								</el-upload>
							</template>
							<!-- type=3 超链接 -->
							<template v-else-if="item.type === 3">
								<div class="_links" v-for="(subItem, subIndex) of item.link_list">
									<el-input type="text" v-model="item.link_list[subIndex]" placeholder="链接地址"></el-input>
								</div>
							</template>
							<div class="add_step">
								<el-tooltip
									content="添加新步骤"
									placement="top">
									<el-button
										@click="onClickAddStep(index)"
										size="mini"
										icon="el-icon-plus"
										circle>
									</el-button>
								</el-tooltip>
								<el-tooltip
									:content="item.type===1 ? '删除图片' : '添加图片'"
									placement="top">
									<el-button
										v-if="!item.type || item.type===1"
										@click="onClickAddImage(index, item.type)"
										:type="item.type === 1 ? 'danger' : ''"
										size="mini"
										icon="el-icon-picture-outline"
										:plain="item.type === 1"
										circle>
									</el-button>
								</el-tooltip>
								<el-tooltip
									:content="item.type===2 ? '删除二维码' : '添加二维码'"
									placement="top">
									<el-button
										v-if="!item.type || item.type===2"
										@click="onClickAddCode(index, item.type)"
										:type="item.type === 2 ? 'danger' : ''"
										size="mini"
										icon="el-icon-menu"
										:plain="item.type === 2"
										circle>
									</el-button>
								</el-tooltip>
								<el-tooltip
									:content="item.type===3 ? '删除链接' : '添加链接'"
									placement="top">
									<el-button
										v-if="!item.type || item.type===3"
										@click="onClickAddLink(index, item.type)"
										:type="item.type === 3 ? 'danger' : ''"
										size="mini"
										icon="el-icon-search"
										:plain="item.type === 3"
										circle>
									</el-button>
								</el-tooltip>
								<el-tooltip
									content="删除此步骤"
									placement="top">
									<el-button
										@click="onClickRemoveStep(index)"
										size="mini"
										icon="el-icon-delete"
										circle>
									</el-button>
								</el-tooltip>
							</div>
						</div>
					</el-step>
				</el-steps>
			</div>
		</el-tab-pane>

		<!--FOURTH CONTENT-->
		<el-tab-pane label="审核要求" name="fourth">
			<el-form-item label="审核方式">
				<el-select v-model="form.submit_type" placeholder="请选择任务审核方式" class="width-200-important">
					<el-option
						v-for="item in enums.taskSubmitType"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="审核示例文字">
				<el-input type="textarea" v-model="form.submit_text_example" placeholder="允许为空，最多500个字"></el-input>
			</el-form-item>
			<el-form-item label="审核示例图片">
				<el-upload
					multiple
					action="http://upload-z2.qiniup.com"
					list-type="picture-card"
					:file-list="form.submit_img_example_list"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:data="postData">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
		</el-tab-pane>

		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</el-tabs>
</template>

<script>
	import Enums from '../../../../utils/enums';

	export default {
		props: {
			form: {
				type: Object,
				deafult: {}
			}
		},
		name: 'taskForm',
		data() {
			return {
				enums: Enums,
				activeName: "first",
				defaultStepObject: {
					type: 0,
					title: "",
					desc: ""
				},
				fileList: [],
				isShowFileList: false,
				dialogImageUrl: '',
				dialogVisible: false,
				postData: {
					token: ''
				}
			};
		},
		components: {
		},

		created() {
			this.ajaxGetUploadToken();
		},

		methods: {
			ajaxGetUploadToken() {
				// 获取七牛云上传文件的Token
				this.$ajax.gateway("/apis/getQiniuToken", (data) => {
					if(data.code===200){
						data = data.data;
						console.info(data);
						this.postData.token = data;
					} else {
						console.warn(data);
					}
				});
			},
			handleAvatarSuccess(res, file) {   //上传成功后在图片框显示图片
				this.form.cover ='http://pc254qwlj.bkt.clouddn.com/'+ res.key;
				setTimeout(() => {
					this.isShowFileList = false;
					this.fileList = [];
				}, 500);
			},
			handleError(res) {   //显示错误
				console.log(res);
			},
			beforeAvatarUpload(file) {    //在图片提交前进行验证
				const isJPG = file.type === 'image/jpeg' || 'image/jpg';
				const isPNG = file.type === 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				let back = true;
				if (!isJPG&&!isPNG) {
					back = false;
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt2M) {
					back = false;
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				if (!this.postData.token){
					back = false;
					this.$message.error('未正确获取到上传token，请稍后再试。');
				}
				if (back) {
					this.isShowFileList = true;
				}
				return back;
			},
			onClickUploadImg(url) {
				this.dialogImageUrl = url;
				this.dialogVisible = true;
				console.log("onClickUploadImg");
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			onClickAddStep(index) {
				console.info(index);
				// this.form.step_list.push(this.defaultStepObject);
				this.form.step_list.splice(index+1, 0, {
					type: 0,
					title: "",
					desc: ""
				});
			},
			onClickRemoveStep(index) {
				console.info(index);
				if(this.form.step_list.length<=0) return false;
				this.$confirm('确定删除该步骤吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.form.step_list.splice(index, 1);
				});
			},
			onClickAddImage(index, currentType) {
				console.info(index, currentType);
				if(currentType===1){
					this.$confirm('此操作将删除该步骤中的图片, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.form.step_list[index].type=0;
					});
				} else {
					this.form.step_list[index].type=1;
				}
			},
			onClickAddCode(index, currentType) {
				console.info(index, currentType);
				if(currentType===2){
					this.$confirm('此操作将删除该步骤中的二维码, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.form.step_list[index].type=0;
					});
				} else {
					this.form.step_list[index].type=2;
				}
			},
			onClickAddLink(index, currentType) {
				console.info(index, currentType);
				if(currentType===3){
					this.$confirm('此操作将删除该步骤中的链接, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						delete this.form.step_list[index].link_list;
						this.form.step_list[index].type=0;
					});
				} else {
					this.form.step_list[index].type=3;
					this.form.step_list[index].link_list=[""];
				}
			}
		}
	};
</script>

<style lang="stylus" scoped>
.task_step {
	padding-left 130px
	padding-bottom 30px
	._title {
		position relative
	}
	._item {
		min-height 40px
		padding-bottom 20px
		._desc {
			font-size 14px
			color #888
			padding 10px 0 20px
		}
		.add_step {
			padding 0 0 30px
		}
		._links {
			padding 0 0 15px
		}
	}
}
</style>
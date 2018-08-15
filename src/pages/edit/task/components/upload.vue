<template>
	<div>
		<el-upload
			action="http://upload-z2.qiniup.com"
			list-type="picture-card"
			:file-list="fileList"
			:on-success="handleSuccess"
			:on-remove="handleRemove"
			:on-preview="handlePreview"
			:data="postData">
			<i class="el-icon-plus"></i>
		</el-upload>

		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			fileList: null,
			onSuccess: Function,
			onRemove: Function,
			index: null
		},
		data() {
			return {
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
			// todo
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

			handlePreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleSuccess(raw, file, fileList) {
				console.log("-> handleSuccess");
				console.log(raw, file, fileList, this.index);
				this.onSuccess(this.makingFileList(fileList), this.index);
			},
			handleRemove(file, fileList) {
				console.log("-> handleRemove");
				console.log(file, fileList, this.index);
				this.onRemove(this.makingFileList(fileList), this.index);
			},

			// 从fileList中获取图片链接
			makingFileList(fileList) {
				let arr = [];
				for(let item of fileList){
					let url;
					if (item.response) {
						url = 'http://pc254qwlj.bkt.clouddn.com/'+item.response.key;
					} else {
						url = item.url || null;
					}
					arr.push({
						uid: item.uid,
						status: item.status,
						url: url,
						title: "",
						name: ""
					});
				}
				return arr;
			}
		}
	};
</script>

<style lang="stylus" scoped>
</style>
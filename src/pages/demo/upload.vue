<template>

	<div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">直接选择文件上传</h2>
			</div>
			<div class="panel-content">
				<div style="padding: 40px 0;">
					<div>
						<p>
							<a href="javascript:void(0)" @click="onClickUpFileDialog" style="color: green; text-decoration: underline;">
								点击弹出窗口上传
							</a>
						</p>
						<p v-if="url_1">
							已成功上传文件：<a :href="url_1">{{url_1}}</a>
						</p>
					</div>
					<ul style="padding: 10px 0;">
						<li>* 点击的按钮样式可完全自定义</li>
						<li>* 每次只能同时上传一个文件</li>
						<li>* 点击后将弹出一个不可关闭的层，用来显示上传进度</li>
						<li>* 未上传完成时可选择取消关闭弹框</li>
						<li>* 上传完成后会自动关闭弹框，并回调上传成功的url</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">默认样式选择文件上传</h2>
			</div>
			<div class="panel-content">
				<ul style="padding: 10px 0;">
						<li>*示例
							<pre>
								<panel-upfile
									:value.sync="url_1"
									file-type=".xlsx"
									file-size="1024"
									:on-upfile-success="onUpimageSuccess"
									:on-upfile-delete="onUpimageDelete">
								</panel-upfile>
							</pre>
						</li>
						<li>* value.sync 绑定的值</li>
						<li>* file-type 限制上传文件类型， 用逗号隔开，不传时默认可以上传.jpg,.jpeg,.gif,.png,.dbf,.xlsx,.xls</li>
						<li>* file-size 限制上传文件大小， 单位kb，不传时默认最多可以上传100mb</li>
						<li>* on-upfile-success 成功回调</li>
						<li>* on-upfile-delete 失败回调</li>
						<li>* 点击按钮的样式和上传成功后的样式都不可修改</li>
						<li>* 点击上传后显示上传进度</li>
						<li>* 上传中时可以取消</li>
						<li>* 只能上传一个文件，完成后只有删除上传的文件才能继续上传</li>
						<li>* 上传成功后会在onUpfileSuccess直接回调</li>
						<li>* 上传失败的异常统一处理</li>
					</ul>
			</div>
			<div class="panel-content">
				<div style="padding: 10px 0;">
					<el-form label-width="240px">
						<el-form-item label="默认样式">
							<div style="width: 500px; padding: 10px 30px;">
								<panel-upfile :value.sync="url_1"></panel-upfile>
							</div>
						</el-form-item>
						<el-form-item label="限制xls格式，并且大小不超过1mb">
							<div style="width: 500px; padding: 10px 30px;">
								<panel-upfile :value.sync="url_3" file-type=".xls" file-size="1024"></panel-upfile>
							</div>
						</el-form-item>
						<el-form-item label="已上传了文件，并且有回调事件">
							<div style="width: 500px; padding: 10px 30px;">
								<panel-upfile :value.sync="url_2" :on-upfile-success="onUpfileSuccess" :on-upfile-delete="onUpfileDelete"></panel-upfile>
							</div>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<div class="panel">
			<div class="panel-header">
				<h2 class="panel-title">上传图片</h2>
			</div>
			<div class="panel-content">
				<div style="padding: 10px 0;">
					<ul style="padding: 10px 0;">
						<li>*示例
							<pre>
								<panel-upimage
									:value.sync="img_1"
									temp="sub"
									file-type="jpg,gif,png,jpeg"
									file-size="100"
									desc-text="（图片建议大小：900px×500px）"
									:on-upfile-success="onUpimageSuccess"
									:on-upfile-delete="onUpimageDelete">
								</panel-upimage>
							</pre>
						</li>
						<li>* value.sync 绑定的值</li>
						<li>* temp 样式，目前只支持默认和sub，默认不用传参</li>
						<li>* file-type 限制上传文件类型， 用逗号隔开，不传时默认可以上传.jpg,.jpeg,.gif,.png,.dbf,.xlsx,.xls</li>
						<li>* file-size 限制上传文件大小， 单位kb，不传时默认最多可以上传100mb</li>
						<li>* desc-text 提示文字，仅默认样式有效</li>
						<li>* on-upfile-success 成功回调</li>
						<li>* on-upfile-delete 失败回调</li>
						<li>* 上传成功后可以直接ajax访问oss服务获取图片的其它属性或操作，<a href="https://help.aliyun.com/document_detail/44975.html?spm=5176.doc44976.6.967.8Odgka">参考文档</a>。</li>
					</ul>
				</div>
			</div>
			<div class="panel-content">
				<el-form label-width="120px">
					<el-form-item label="默认样式">
						<panel-upimage :value.sync="img_1" desc-text="（图片建议大小：900px×500px）"></panel-upimage>
					</el-form-item>
					<el-form-item label="sub样式">
						<panel-upimage temp="sub" file-type=".jpg,.jpeg" file-size="100" :value.sync="img_3"></panel-upimage>限制图片格式为jpg，大小为100k
					</el-form-item>
					<el-form-item label="包含回调事件">
						<panel-upimage :value.sync="img_2" :on-upfile-success="onUpimageSuccess" :on-upfile-delete="onUpimageDelete"></panel-upimage>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onConsoleUpImage">立即创建</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import PanelUpfile from '../../sxui/components/element-upfile/PanelUpfile';
	import PanelUpimage from '../../sxui/components/element-upfile/PanelUpimage';

	export default {
		data() {
			return {
				url_1: "",
				url_2: "http://jiuhu-sxjy-firstbucket.oss-cn-hangzhou.aliyuncs.com/xwcz-web/uploads/201710/GktaHeRXrG2N1509349888.xls",
				url_3: "",
				img_1: "",
				img_2: "http://jiuhu-sxjy-firstbucket.oss-cn-hangzhou.aliyuncs.com/xwcz-web/uploads/201710/QDta3RSRWcKA1509343953.jpg",
				img_3: "http://jiuhu-sxjy-firstbucket.oss-cn-hangzhou.aliyuncs.com/xwcz-web/uploads/201710/QDta3RSRWcKA1509343953.jpg"
			};
		},

		components: {
			PanelUpfile, PanelUpimage
		},

		created() {
		},

		watch: {},

		methods: {
			onConsoleUpImage() {
				console.info("url_1", this.url_1);
				console.info("url_2", this.url_2);
				console.info("img_1", this.img_1);
				console.info("img_2", this.img_2);
			},
			onClickUpFileDialog() {
				this.url_1 = "";
				this.$store.commit("startUpFileDialog", data => {
					if(data.status==0){
						console.info("onClickUpFileDialog success", data);
						data = data.data;
						this.url_1 = data.host + data.fileName;
					} else if(data.status===1||data.status===2||data.status===3) {
						console.info("onClickUpFileDialog fail", data);
						this.$alert(data.message);
					} else if (data.message){
						console.info("onClickUpFileDialog error", data);
						this.$alert(data.message);
					} else {
						console.info("onClickUpFileDialog error", data);
						this.$alert("文件服务暂时不能访问，请稍后再试！");
					}
				});
			},
			onUpfileSuccess(data) {
				// 文件上传成功后回调
				console.info("onUpfileSuccess 文件上传成功后回调");
				console.info(data);
			},
			onUpfileDelete() {
				// 上传文件被删除时回调
				console.info("onUpfileDelete 上传文件被删除了");
			},
			onUpimageSuccess(data) {
				// 图片上传成功后回调
				console.info("onUpimageSuccess 图片上传成功后回调");
				console.info(data);
			},
			onUpimageDelete() {
				// 上传图片被删除时回调
				console.info("onUpimageDelete 上传图片被删除了");
			}
		}
	};
</script>

<style lang="stylus" scoped>
</style>
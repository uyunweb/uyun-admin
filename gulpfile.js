/**
 * Created by zxw on 2017/11/27.
 */
const gulp = require("gulp");
const path = require('path');

//引入组件
const iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	notify = require('gulp-notify'),
	del = require('del'),
	runSequence = require('run-sequence'),
	watch = require('gulp-watch'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	zip = require('gulp-zip'),
	tar = require('gulp-tar'),
	gzip = require('gulp-gzip'),
	unzip = require('gulp-unzip');

gulp.task('default', ['zip']);
gulp.task('myzip', ['zip']);
// gulp.task('default2', ['script']);

//将svg转换成iconfont
let fontName = 'iconfont';
let runTimestamp = Math.round(Date.now()/1000);
gulp.task('svg2icon', function(){
	return gulp.src(['./src/static/svg/*.svg'], {base: 'src'})
		.pipe(iconfontCss({
			fontName: fontName,
			path: './src/static/template/_icons.css',
			targetPath: '../css/_icons.styl',
			fontPath: '../fonts/',
			cssClass: 'icons'
		}))
		.pipe(iconfont({
			fontName: fontName, // required
			prependUnicode: false, // recommended option
			formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
			timestamp: runTimestamp, // recommended to get consistent builds when watching files
			normalize:true,
			fontHeight: 1024
		}))
		.pipe(gulp.dest('./src/static/fonts'))
		.pipe(notify({message: 'svg2icon done!'}));
});

//clean
gulp.task('clean', function () {
	return del([
		'./src/static/fonts/'
	]);
});

//watching file change
gulp.task('watch', function() {
	gulp.watch('src/static/svg/*.svg', ['svg2icon']);
});

//开发环境
gulp.task('iconfont', function(){
	runSequence(
		['clean'],
		['svg2icon', 'watch']
	);
});

// 打包给运维
gulp.task('zip',() => {
	return gulp.src(["**/*.*", "Dockerfile", "!node_modules/**/*.*", "!build/**/*.*", "!logs/**/*.*", "!src/**/*.*", "!gulpfile.js", "!README.md", "!app.zip"])
		.pipe(zip('app.zip'))
		.pipe(gulp.dest('./'));
});
gulp.task('unzip', function(){
	return gulp.src("app.zip")
		.pipe(unzip())
		.pipe(gulp.dest('./'));
});
gulp.task('tar',() => {
	return gulp.src("./tarfile/**")
		.pipe(tar('app.tar'))
		.pipe(gzip())
		.pipe(gulp.dest('./target/'));
});

// 打包当前目录下sx.node代码，生成node_code.zip，并保存到sx.node目录下
gulp.task('zip_node_code',() => {
	return gulp.src(["**/*.*", "!**/node_modules/**/*.*", "!dist/**/*.*", "!src/**/*.*", "!public/**/*.*", "!views/**/*.*", "!config/**/*.*", "!controllers/site.js", "!routes/site.js", "!git.lock", "!*.conf", "!app.json", "!app.dev.test.json", "!*.zip", "!Dockerfile"])
		.pipe(zip('node_code.zip'))
		.pipe(gulp.dest('../sx.node/'));
});

// 解压sx.node目录下的node_code.zip，并同步到当前目录
gulp.task('del_node_code',() => {
	return del([
		'./build/**/*',
		'./common/**/*'
	]);
});
gulp.task('unzip_node_code_zip',() => {
	setTimeout(() => {
		return gulp.src(path.join(__dirname, '../sx.node/node_code.zip'))
			.pipe(unzip())
			.pipe(gulp.dest('./'));
	}, 1000);
});
gulp.task('unzip_node_code', ['del_node_code', 'unzip_node_code_zip']);


// 打包当前目录下sxui.vue代码，生成vue_code.zip，并保存到sx.node目录下
gulp.task('zip_vue_code',() => {
	return gulp.src(["src/sxui/**/*.*"])
		.pipe(zip('vue_code.zip'))
		.pipe(gulp.dest('../sx.node/'));
});

// 解压sx.node目录下的vue_code.zip，并同步到当前目录
gulp.task('del_src_sxui',() => {
	return del([
		'./src/sxui/**/*'
	]);
});
gulp.task('unzip_vue_code_zip',() => {
	setTimeout(() => {
		return gulp.src(path.join(__dirname, '../sx.node/vue_code.zip'))
			.pipe(unzip())
			.pipe(gulp.dest('./src/sxui/'));
	}, 1000);
});
gulp.task('unzip_vue_code', ['del_src_sxui', 'unzip_vue_code_zip']);


// 压缩JS
gulp.task('script', ()=> {
	gulp.src('./src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./src'));
});


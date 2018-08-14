<template>
	<div>
		<div class="float-right" v-if="userType === 'admin5' || userType === 'admin6'">
			<el-dropdown @command="onDropdown">
					<span class="el-dropdown-link">
						{{user.role.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item v-for="item in user.roles"
									  :key="item.code"
									  :command="item.code"
									  :disabled="item.code===user.role.code">
						{{item.name}}
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<el-breadcrumb separator="/">
			<div class="float-left">当前所在位置：&nbsp;</div>
			<template v-for="(item,index) in breadList" v-if="breadList.length>0">
				<el-breadcrumb-item :to="item.path&&item.path!='/'?item.path:''" :key="item.path">{{item.name}}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script>
	import Auth from '../sxui/auth';
	import { mapState } from 'vuex';
	export default{
		data(){
			return {
				user: this.$store.state.user,
				breadList:[{name:'',path:''}],
			};
		},
		computed: {
			...mapState({
				userType: state => state.user.type,
			}),
		},
		mounted() {
			this.loadFromRoute();
		},
		watch: {
			$route () {
				this.loadFromRoute();
			},
			'$store.state.breadListState' (){
				this.breadList=this.$store.state.breadListState;
			},
		},
		methods: {
			onDropdown(code) {
				// 切换角色
				if(code && code!==this.user.role.code){
					Auth.switchRole(code);
				}
			},
			/*getBreadcrumb(isreload) {
				let breadNumber= typeof(this.$route.meta.breadNumber)!="undefined"?this.$route.meta.breadNumber:1;//面包屑位置索引放到meta里预设好，首页索引为0，一级默认为1
				let breadLength=this.$store.state.breadListState.length;//目前breadList集合数组个数
				let curName=this.$route.name;
				let curPath=this.$route.fullPath;
				let newBread={name:curName,path:curPath};
				if(breadNumber===0||breadNumber===1){//点击首页或者一级
					this.$store.commit('breadListStateRemove',1);//初始化，只有首页面包屑按钮
					if(breadNumber===1){//点击一级菜单
						this.$store.commit('breadListStateAdd',newBread);//当前页面添加到breadList集合
					}
				}else{
					if(!isreload){
						this.$store.commit('breadListStateModify','');
						if(breadLength<=breadNumber){//breadList集合个数等于或者小于目前层级breadNumber
							this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadList集合
							console.log('breadListStateAdd把当前路由添加到breadList集合');
						}else{
							this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
							console.log('breadListStateRemove');
						}
					}else{//刷新，state.breadListState被初始化，从缓存取值；
						this.$store.state.breadListState=JSON.parse(sessionStorage.getItem('breadListStorage'));
					}
				}
				this.breadList=this.$store.state.breadListState;
				sessionStorage.setItem('breadListStorage',JSON.stringify(this.breadList));
			},*/
			loadFromRoute(){
				let routeList=this.$route.matched;
				let breadList=[];
				routeList.map(function (item,index,input) {
					let breadNumber= typeof(item.meta.breadNumber)!="undefined"?item.meta.breadNumber:0;
					breadList[breadNumber]={name:item.meta.name,path:item.path};
				});
				this.$store.commit('breadListStateModify',breadList);
				this.breadList=breadList;
			},
		}
	};
</script>
<style scoped="scoped">
	.el-breadcrumb__item{
		float: none;
	}

</style>
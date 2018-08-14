<template>
	<div class="page-container">
		<div class="page-aside">
			<aside-navs />
		</div>
		<div class="page-content">
			<breadcrumb />
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>
	</div>
</template>
<script>
import AsideNavs from '../components/AsideNav';
import Breadcrumb from '../components/Breadcrumb';
export default {
	name: 'app',
	components: {
		AsideNavs,
		Breadcrumb
	},
	beforeCreate() {
		// console.info("--> beforeCreate");
		// console.info(this.$route.path);
		// if (this.$store.state.user && this.$store.state.user.id) {
		// 	this.$router.push({ path: '/edit' });
		// } else {
		// 	this.$router.push({ path: '/login' });
		// }
	},
	created() {
		console.info("== TIME > index created", Number(new Date()));
		// console.timeEnd('timeForLoad');
	},
	methods: {
	}
};
</script>
<style lang="stylus" scoped>
</style>
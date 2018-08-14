export default {
	methods: {
		hasAuthority(authorityCode) {
			return true;
			// if (this.$store.state.user.menuCode instanceof Array && this.$store.state.user.menuCode.length) {
			// 	return this.$store.state.user.menuCode.includes(authorityCode);
			// } else {
			// 	return false;
			// }
		},
	}
};

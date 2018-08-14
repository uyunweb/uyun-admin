import Utils from '../../utils/utils';
import Consts from '../../utils/const';
export default {
	data() {
		return {
			gridLoading: false,
			maxHeight: Consts.MAX_HEIGHT,
			//分页
			pageSizes: [50, 100, 150, 200],
			totalCount: 0,
			pagination: {
				page: 1,
				size: 50,
				sort: '',
				sortProperties: [],
			},
		};
	},

	computed: {
		paginationHeight: function () {
			return this.totalCount > this.pagination.size ? 52 : 0;
		},
	},

	mounted() {
		window.addEventListener('resize', this.resizeTable);
	},

	updated() {
		this.initTableSize();
	},

	beforeDestroy() {
		window.removeEventListener('resize', this.resizeTable);
	},

	methods: {
		getGridSize(tableEl) {
			if (!tableEl) {
				return;
			}
			this.$nextTick(function () {
				let tabelPos = Utils.getElementPosition(tableEl),
					windowPos = Utils.getElementPosition(document.body);
				if (tabelPos) {
					let max = windowPos.height - tabelPos.top - this.paginationHeight - 50;//50 for space in bottom
					this.maxHeight = max > Consts.MAX_HEIGHT ? max : Consts.MAX_HEIGHT;
				}
			});
		},

		initTableSize() {
			if (!this.gridLoading) {
				this.resizeTable();
				this.initTableSize = function() {};
			}
		}
	},

	watch: {
		paginationHeight() {
			this.resizeTable();
		}
	}
};


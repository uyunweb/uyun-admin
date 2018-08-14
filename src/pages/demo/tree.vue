<template>
	<div class="panel">
		<div class="panel-header">
			<h2 class="panel-title">树形结构</h2>
		</div>
		<div class="panel-content">
			<h4>默认为单选树形结构, 可以通过配置options属性:</h4>
			<div class="padding-bottom">
				<p class="text-indent">showSearch: boolean; 搜索树节点，默认为false,不开启搜索功能</p>
				<p class="text-indent">multiple: boolean; 多选，默认为false，单选的树结构</p>
				<p class="text-indent">halfCheck: boolean; 该属性表示所选树结构的半选状态；
					当multiple为true（即设置为多选说结构时），该属性才生效；
					默认是false，为全选逻辑;</p>
				<p class="text-indent">editable: boolean; 默认为false，不可编辑；设置为true时，
					叶子节点可进行编辑、删除操作。</p>
			</div>
			<div class="l-table l-equant-2 spacing">
				<div class="l-cell">
					<h4>1、默认为单选树形结构</h4>
					<tree
						ref="tree0"
						v-model="treeVals0"
						:tree-data="treeData0"
						:options="options0"
						@on-checked-change="handleCheckedChange0" />
				</div>
				<div class="l-cell">
					<h4>2、可编辑的单选树形结构：editable: true</h4>
					<tree
						ref="tree3"
						v-model="treeVals3"
						:tree-data="treeData3"
						:options="options3"
						@on-checked-change="handleCheckedChange3"
						@on-edit-node="editNode"
						@on-delete-node="deleteNode" />
				</div>
			</div>
			<div class="l-table l-equant-2 spacing">
				<div class="l-cell">
					<h4>3、多选树形结构，半选逻辑：multiple: true, halfCheck: true,</h4>
					<tree
						ref="tree1"
						v-model="treeVals1"
						:tree-data="treeData1"
						:options="options1"
						@on-checked-change="handleCheckedChange1" />
				</div>
				<div class="l-cell">
					<h4>4、多选树形结构，全选逻辑，开启搜索：multiple: true, showSearch: true,</h4>
					<tree
						ref="tree2"
						v-model="treeVals2"
						:tree-data="treeData2"
						:options="options2"
						@on-checked-change="handleCheckedChange2" />
				</div>
			</div>
			<div class="l-table l-equant-2 spacing">
				<div class="l-cell">
					<h4>5、多选树形结构，半选逻辑：multiple: true, halfCheck: true,</h4>
					<tree-selector
						placeholder="请选择..."
						v-model="treeVals4"
						:tree-data="treeData4"
						:options="options4">
					</tree-selector>
				</div>
				<div class="l-cell">
					<tree-selector
						placeholder="全部"
						v-model="treeVals5"
						:tree-data="treeData5"
						:options="options5">
					</tree-selector>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Tree from '../../sxui/components/tree/tree';
	import TreeSelector from '../../sxui/components/tree/treeSelector';
	export default {
		name: 'treeDemo',
		components: {
			Tree,
			TreeSelector
		},

		created() {
		},

		data() {
			return {
				treeVals0: 'item333',
				treeVals1: ['item0', 'item1'],
				treeVals2: '',
				treeVals3: '',
				treeVals4: '',
				treeVals5: [],
				options0: {
				},
				options1: {
					showSearch: false,
					multiple: true,
					halfCheck: true,
				},
				options2: {
					showSearch: true,
					multiple: true,
				},
				options3: {
					editable: true,
				},
				options4: {
				},
				options5: {
					showSearch: false,
					multiple: true,
					halfCheck: true,
				},
				treeData0: [{
					id: 'item0',
					label: '根节点1',
					children: [{
						id: 'item1',
						label: '一级子节点1111',
					},{
						id: 'item2',
						label: '一级子节点2'
					},{
						id: 'item3',
						label: '一级子节点3',
						children: [{
							id: 'item31',
							label: '二级子节点1',
						},{
							id: 'item32',
							label: '二级子节点2'
						},{
							id: 'item33',
							label: '二级子节点3',
							children:[{
								id: 'item331',
								label: '三级子节点1',
							},{
								id: 'item332',
								label: '三级子节点2'
							},{
								id: 'item333',
								label: '三级子节点3'
							}]
						}]
					},{
						id:'item4',
						label:'一级子节点4'
					},{
						id:'item5',
						label:'一级子节点5'
					}]
				}],
				treeData1: [{
					id: 'item0',
					label: '根节点1',
					children: [{
						id: 'item1',
						label: '一级子节点1111',
					},{
						id: 'item2',
						label: '一级子节点2'
					},{
						id: 'item3',
						label: '一级子节点3',
						children: [{
							id: 'item31',
							label: '二级子节点1',
						},{
							id: 'item32',
							label: '二级子节点2'
						},{
							id: 'item33',
							label: '二级子节点3',
							children:[{
								id: 'item331',
								label: '三级子节点1',
							},{
								id: 'item332',
								label: '三级子节点2'
							},{
								id: 'item333',
								label: '三级子节点3'
							}]
						},{
							id: 'item34',
							label: '二级子节点4'
						}]
					},{
						id:'item4',
						label:'一级子节点4'
					},{
						id:'item5',
						label:'一级子节点5'
					}]
				},{
					id: 'root0',
					label: '根节点2',
					children: [{
						id: 'root1',
						label: '一级子节点1111',
					},{
						id: 'root2',
						label: '一级子节点2'
					}],
				}],
				treeData2: [{
					id: 'item0',
					label: '根节点1',
					// checked: true,
					children: [{
						id: 'item1',
						label: '一级子节点1111',
					},{
						id: 'item2',
						label: '一级子节点2'
					},{
						id: 'item3',
						label: '一级子节点3',
						children: [{
							id: 'item31',
							label: '二级子节点1',
						},{
							id: 'item32',
							label: '二级子节点2'
						},{
							id: 'item33',
							label: '二级子节点3',
							children:[{
								id: 'item331',
								label: '三级子节点1',
							},{
								id: 'item332',
								label: '三级子节点2'
							},{
								id: 'item333',
								label: '三级子节点3'
							}]
						}]
					},{
						id:'item4',
						label:'一级子节点4'
					},{
						id:'item5',
						label:'一级子节点5'
					}]
				}],
				treeData3: [{
					id: 'item0',
					label: '根节点1',
					children: [{
						id: 'item1',
						label: '一级子节点1111',
					},{
						id: 'item2',
						label: '一级子节点2'
					},{
						id: 'item3',
						label: '一级子节点3',
						children: [{
							id: 'item31',
							label: '二级子节点1',
						},{
							id: 'item32',
							label: '二级子节点2'
						},{
							id: 'item33',
							label: '二级子节点3',
							children:[{
								id: 'item331',
								label: '三级子节点1',
							},{
								id: 'item332',
								label: '三级子节点2'
							},{
								id: 'item333',
								label: '三级子节点3'
							}]
						}]
					},{
						id:'item4',
						label:'一级子节点4'
					},{
						id:'item5',
						label:'一级子节点5'
					}]
				}],
				treeData4: [{
					id: 'item0',
					label: '根节点1',
					children: [{
						id: 'item1',
						label: '一级子节点1111',
					},{
						id: 'item2',
						label: '一级子节点2'
					},{
						id: 'item3',
						label: '一级子节点3',
						children: [{
							id: 'item31',
							label: '二级子节点1',
						},{
							id: 'item32',
							label: '二级子节点2'
						},{
							id: 'item33',
							label: '二级子节点3',
							children:[{
								id: 'item331',
								label: '三级子节点1',
							},{
								id: 'item332',
								label: '三级子节点2'
							},{
								id: 'item333',
								label: '三级子节点3'
							}]
						}]
					},{
						id:'item4',
						label:'一级子节点4'
					},{
						id:'item5',
						label:'一级子节点5'
					}]
				}],
				treeData5: [{
					id: 'item0',
					label: '根节点1',
					children: [{
						id: 'item1',
						label: '一级子节点1111',
					},{
						id: 'item2',
						label: '一级子节点2'
					},{
						id: 'item3',
						label: '一级子节点3',
						children: [{
							id: 'item31',
							label: '二级子节点1',
						},{
							id: 'item32',
							label: '二级子节点2'
						},{
							id: 'item33',
							label: '二级子节点3',
							children:[{
								id: 'item331',
								label: '三级子节点1',
							},{
								id: 'item332',
								label: '三级子节点2'
							},{
								id: 'item333',
								label: '三级子节点3'
							}]
						}]
					},{
						id:'item4',
						label:'一级子节点4'
					},{
						id:'item5',
						label:'一级子节点5'
					}]
				}],
			};
		},

		methods: {
			handleCheckedChange0(node) {
				console.log(this.treeVals0);
			},
			handleCheckedChange1(node) {
				console.log(this.treeVals1);
			},
			handleCheckedChange2(node) {
				console.log(this.treeVals2);
			},
			handleCheckedChange3(node) {
				console.log(this.treeVals3);
			},

			editNode(node) {
				alert('editNode: ' +  node.id);
			},

			deleteNode(node) {
				alert('deleted node: '+ node.id);
			},
		}
	};
</script>

<style lang="stylus" scoped>
	p, h4
		padding-bottom 1em;
	.padding-bottom
		padding-bottom 30px
	.text-indent
		padding-left 2em
</style>
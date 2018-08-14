/**
 * Created by yuanlong on 2018/2/1.
 */

export default {
	data() {
		return {
			form: {},
			defaultStepObject: {
				type: 0,
				title: "",
				desc: ""
			}
		};
	},
	created() {

	},
	methods: {
		validateTaskData(form) {
			let isValidateError = false;

			let stepList = form.step_list;
			if(!Array.isArray(stepList) || stepList.length<=0){
				isValidateError = "任务引导步骤不能为空";
			}
			for(let i=0; i<stepList.length; i++){
				let item = stepList[i];
				if(!item.title){
					isValidateError = `任务引导步骤${i+1} 标题不能为空`;
					break;
				}
				if(!item.desc){
					isValidateError = `任务引导步骤${i+1} 描述不能为空`;
					break;
				}
			}
			return isValidateError;
		}
	}
};
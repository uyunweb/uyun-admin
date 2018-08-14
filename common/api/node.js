/**
 * @@@ NodeService
 */

"use strict";

const eventproxy = require('eventproxy');
const config = require('../../config/index');
const logger = require('../logger');
const gatewayApi = require('./gateway');

let nodeServices = {
	"exam/get_user_info": function (query, callback) {
		// todo 目的是合并取userInfo
	},
	"exam/get_exam_analysis": function (query, callback) {
		logger.debug("exam/get_exam_analysis：coming");
		logger.debug(query);
		
		// TODO 未优化
		let examId = query.id;
		if(!examId){
			return callback("exam_id不能为空", query);
		}
		
		gatewayApi["exam"]["ExamQueryApi_getAnalysisInfo"]({
			TOKEN: query.TOKEN,
			body: {
				examId: examId,
				isNeedClass: true, //是否需要班级列表
				isNeedClassLevel: true, //是否需要班级层次和学部信息
				isNeedSchoolGroup: true //是否需要学校分类
			}
		}, function(error, data){
			if(error || data.status !== 0 || !data.data || data.data.code !== 200 || !data.data.data){
				return callback("获取考试详情失败", { error, data });
			} else if(data.data.code===200) {
				let examData = data.data.data;
				let timeNumber;
				try {
					timeNumber = Number(examData.startTime.split(" ")[0].replace(/-/g,""));
					if( timeNumber<20170829 ){
						examData.isShowKnowledgePoint = false;
					} else {
						examData.isShowKnowledgePoint = true;
					}
				} catch(error) {
					examData.isShowKnowledgePoint = true;
				}
				
				if(examData.courseDetailDTOs && examData.courseDetailDTOs.length>0){
					let newOptions = examData.courseDetailDTOs.slice(0);
					newOptions.unshift({
						id: 0,
						platformClassId: 0,
						name: "全部",
						artCategory: 0,
						type: 0
					});
					examData.courseDetailDTOsFull = newOptions;
				}
				for(let i=0; i<examData.classDTOs.length; i++){
					let itemClassName = examData.classDTOs[i].className;
					examData.classDTOs[i].classNameFull = itemClassName;
					examData.classDTOs[i].className = itemClassName.split("级")[1];
				}
				if(examData.classDTOs && examData.classDTOs.length>0){
					let newOptions = examData.classDTOs.slice(0);
					newOptions.unshift({
						// artCategory: newOptions[0].artCategory,
						artCategory: 0,
						className: "全部",
						id: 0,
						platformClassId: 0,
						classGroupId: 0
					});
					examData.classDTOsFull = newOptions;
				}
				if(examData.classParts && examData.classParts.length>0){
					let newOptions = examData.classParts.slice(0);
					newOptions.unshift({
						id: 0,
						name: "全部"
					});
					examData.classPartsFull = newOptions;
				}
				if(examData.classLevels && examData.classLevels.length>0){
					let newOptions = examData.classLevels.slice(0);
					newOptions.unshift({
						branch: 0,
						id: 0,
						name: "全部"
					});
					examData.classLevelsFull = newOptions;
				}
				if(examData.schoolGroups && examData.schoolGroups.length>0){
					let newOptions = examData.schoolGroups.slice(0);
					newOptions.unshift({
						branch: 0,
						id: 0,
						name: "全部"
					});
					examData.schoolGroupsFull = newOptions;
				}
				data.data.data = examData;
				
				return callback(null, data);
			} else {
				return callback("获取考试详情失败", { data });
			}
		});
	}
};

module.exports = nodeServices;

const Utils = {
	// 无跳转下载文件
	downloadFile(url) {
		if (window.iframe == undefined) {
			let iframe = document.createElement('iframe');
			window.iframe = iframe;
			document.body.appendChild(window.iframe);
		}
		window.iframe.src = url;
		window.iframe.style.display = 'none';
	},

	// 获取元素相对文档左上角(0,0)的位置
	getElementPosition(element) {
		try {
			let position = element.getBoundingClientRect();
			let offsetY = document.documentElement.clientTop;
			let offsetX = document.documentElement.clientLeft;
			return {
				top: position.top - offsetY + window.pageYOffset,
				bottom: position.bottom - offsetY + window.pageYOffset,
				left: position.left - offsetX + window.pageXOffset,
				right: position.right - offsetX + window.pageXOffset,
				width: position.width,
				height: position.height,
			};
		} catch (e) {
			console.error(e);
		}
	},

	//本地存储
	setLocalStorageVals(key, vals) {
		window.localStorage.setItem(key, JSON.stringify(vals));
	},
	getLocalStorageVals(key) {
		let vals = '';
		if (!window.localStorage) {
			alert('请开启LocalStorage');
			return vals;
		}
		let valString = window.localStorage.getItem(key);
		if (valString !== null && valString !== undefined) {
			try {
				vals = JSON.parse(valString);
				return vals;
			} catch(e) {
				return valString;
			}
		} else {
			return vals;
		}
	},
	clearLocalStorageVals(key) {
		window.localStorage.removeItem(key);
	},
	clearLocalStorage() {
		if (window.localStorage) {
			window.localStorage.clear();
		}
	},

	//较验
	checkFormValsChange(originVals, newVals) {
		for (let prop in originVals) {
			if (originVals[prop] !==  newVals[prop]) {
				return true;
			}
		}
		return false;
	},

	checkPhoneNumber(rule, value, callback) {
		if (value && !(/^1[345789]\d{9}$/.test(value))) {
			callback(new Error('手机号格式不正确'));
		} else {
			callback();
		}
	},

	checkIDNumber(rule, value, callback) {
		if (value && !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
			callback(new Error('身份证号格式不正确'));
		} else {
			callback();
		}
	},

	checkURL(rule, value, callback) {
		let reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/gi;
		if (value && !(reg.test(value))) {
			callback(new Error('URL格式不正确'));
		} else {
			callback();
		}
	},

	checkCode(rule, value, callback) {
		if (value && !(/^[A-Z\d]+$/.test(value))) {
			callback(new Error('请输入大写的英文字母和数字'));
		} else {
			callback();
		}
	},

	checkAccount(rule, value, callback) {
		if (value && !(/^[A-Za-z\d]+$/.test(value))) {
			callback(new Error('请输入英文字母和数字'));
		} else {
			callback();
		}
	},

	checkClassTotal(rule, value, callback) {
		if (!value) {
			return callback(new Error('请输入创建班级的数量'));
		} else {
			value = parseInt(value);
			if (!Number.isInteger(value)) {
				callback(new Error('请输入1-20的数字'));
			} else {
				if (value < 1 || value > 20) {
					callback(new Error('请输入1-20的数字'));
				} else {
					callback();
				}
			}
		}
	},

	checkClassIndex(rule, value, callback) {
		if (!value) {
			return callback(new Error('请输起始班级序号'));
		} else {
			value = parseInt(value);
			if (!Number.isInteger(value)) {
				callback(new Error('请输入1-200的数字'));
			} else {
				if (value < 1 || value > 200) {
					callback(new Error('请输入1-200的数字'));
				} else {
					callback();
				}
			}
		}
	},
};

export default Utils;

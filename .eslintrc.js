// http://eslint.org/docs/user-guide/configuring
module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"spread": true,
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"ecmaVersion": 7,
		"sourceType": "module"
	},
	"plugins": [
		'html'
	],
	"globals": {
		"Raven": true,
		"vm": true,
		"require": true,
		"window": true,
		"htmlStartTime": true,
		"_hmt":true
	},
	'rules': {
		// 缩进
		"indent": [2, "tab"],
		// 分号
		"semi": [2, "always"],
		// console
		"no-console": "off",
		// 字符串用双引号
		"quotes": 0,
		// 禁用换行字符编码
		"linebreak-style": 0,
		// 禁用变量声明但未使用的提示
		"no-unused-vars": 0
	}
};

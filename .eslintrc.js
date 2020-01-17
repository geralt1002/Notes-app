module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: ['standard'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		semi: [0, 'never'],
		'space-before-function-paren': ['error', 'never']
	}
};
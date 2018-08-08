// 模块路由设置
module.exports = [{
	path: '/',
	name: 'home',
	meta: {
		title: '首页',
	},
	component: resolve => require(['./home.vue'], resolve)
}, ]
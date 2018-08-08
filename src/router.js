//router.js 路由集合

//默认首页路由
const route = []


//合并路由
var routes = route.concat(
		require('pages/home/router'),
	);

module.exports = routes;